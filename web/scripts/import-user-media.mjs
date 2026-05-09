import { spawnSync } from "node:child_process";
import { existsSync, mkdirSync, readdirSync, statSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

let ffmpegPath;
try {
  ffmpegPath = (await import("ffmpeg-static")).default;
} catch {
  console.error(
    "[import-media] Install devDependency ffmpeg-static, then re-run: npm.cmd run import:media",
  );
  process.exit(1);
}

if (!ffmpegPath) {
  console.error("[import-media] ffmpeg-static binary path is empty.");
  process.exit(1);
}

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const webRoot = path.join(__dirname, "..");
const neoCarRoot = path.dirname(webRoot);

const LOGO_SRC =
  "C:/Users/Asus/.cursor/projects/c-Users-Asus-cursor-neo-car-site2/assets/" +
  "c__Users_Asus_AppData_Roaming_Cursor_User_workspaceStorage_" +
  "ca177ecfc2f9784c3dc7dd738e78bf4f_images_" +
  "neocar_logo_transparent-0dafd00d-78f6-4b67-af25-7ab3b5e1c4ed.png";

function workspaceStorageImageDirs() {
  const wsRoot =
    "C:/Users/Asus/AppData/Roaming/Cursor/User/workspaceStorage";
  const out = [];
  if (!existsSync(wsRoot)) return out;
  for (const ent of readdirSync(wsRoot, { withFileTypes: true })) {
    if (!ent.isDirectory()) continue;
    const imagesDir = path.join(wsRoot, ent.name, "images");
    if (existsSync(imagesDir)) out.push(imagesDir);
  }
  return out;
}

const CURSOR_IMAGE_DIRS = workspaceStorageImageDirs();

/** Repo / project asset folders (recursive search). */
const SEARCH_ROOTS = [
  path.join(neoCarRoot, "assets"),
  path.join(
    path.dirname(neoCarRoot),
    "projects",
    "c-Users-Asus-cursor-neo-car-site2",
    "assets",
  ),
  "C:/Users/Asus/.cursor/projects/c-Users-Asus-cursor-neo-car-site2/assets",
];

const DOWNLOADS = "C:/Users/Asus/Downloads";

const pub = path.join(webRoot, "public", "media");

const SKIP_DIRS = new Set([
  "node_modules",
  ".git",
  ".next",
  "out",
  "build",
  "coverage",
]);

function runFfmpeg(args) {
  const res = spawnSync(ffmpegPath, args, {
    stdio: "inherit",
    shell: process.platform === "win32",
  });
  if (res.status !== 0) process.exit(res.status ?? 1);
}

function walkFindFile(root, substring, maxDepth = 8) {
  if (!existsSync(root)) return null;
  const stack = [{ dir: root, depth: 0 }];
  while (stack.length > 0) {
    const { dir, depth } = stack.pop();
    let entries;
    try {
      entries = readdirSync(dir, { withFileTypes: true });
    } catch {
      continue;
    }
    for (const ent of entries) {
      const full = path.join(dir, ent.name);
      if (ent.isDirectory()) {
        if (SKIP_DIRS.has(ent.name) || depth >= maxDepth) continue;
        stack.push({ dir: full, depth: depth + 1 });
      } else if (ent.name.includes(substring)) {
        return full;
      }
    }
  }
  return null;
}

function findInFlatDir(dir, substring) {
  if (!existsSync(dir)) return null;
  const hit = readdirSync(dir).find((n) => n.includes(substring));
  return hit ? path.join(dir, hit) : null;
}

function resolveAsset(substring) {
  for (const dir of CURSOR_IMAGE_DIRS) {
    const hit = findInFlatDir(dir, substring);
    if (hit) return hit;
  }
  for (const root of SEARCH_ROOTS) {
    const hit = walkFindFile(root, substring);
    if (hit) return hit;
  }
  return null;
}

function assertExists(p, label) {
  if (!p || !existsSync(p)) {
    console.error(`[import-media] Missing ${label}:`, p ?? "(not found)");
    process.exit(1);
  }
}

function ensureDirs() {
  mkdirSync(path.join(pub, "hero"), { recursive: true });
  mkdirSync(path.join(pub, "slider"), { recursive: true });
  mkdirSync(path.join(pub, "video"), { recursive: true });
}

function toJpgCover(input, outFile, w, h) {
  const vf = `scale=${w}:${h}:force_original_aspect_ratio=increase,crop=${w}:${h}`;
  runFfmpeg(["-y", "-i", input, "-vf", vf, "-q:v", "3", outFile]);
}

/** Transparent padded square PNG for logos (180 / 512). */
function toLogoSquarePng(input, outFile, size) {
  const vf = `scale=${size}:${size}:force_original_aspect_ratio=decrease,pad=${size}:${size}:(ow-iw)/2:(oh-ih)/2:color=0x00000000`;
  runFfmpeg(["-y", "-i", input, "-vf", vf, "-frames:v", "1", outFile]);
}

function remuxVideo(input, outFile) {
  runFfmpeg([
    "-y",
    "-i",
    input,
    "-c:v",
    "libx264",
    "-crf",
    "28",
    "-preset",
    "slow",
    "-movflags",
    "+faststart",
    "-an",
    "-vf",
    "scale=-2:720",
    outFile,
  ]);
}

ensureDirs();

let logoSrc = LOGO_SRC;
if (!existsSync(logoSrc)) {
  logoSrc = resolveAsset("neocar_logo_transparent");
}
assertExists(logoSrc, "official transparent logo (LOGO_SRC or search)");

toLogoSquarePng(logoSrc, path.join(pub, "neocar-logo.png"), 180);
console.log("[import-media] Logo → public/media/neocar-logo.png (180×180)");

toLogoSquarePng(logoSrc, path.join(pub, "neocar-logo-512.png"), 512);
console.log("[import-media] Logo → public/media/neocar-logo-512.png (512×512)");

const heroMap = [
  ["photo_6336807762729308880_y", "marquee-1.jpg"],
  ["photo_6336807762729308881_y", "marquee-2.jpg"],
  ["photo_6336807762729308882_y", "marquee-3.jpg"],
  ["photo_6336807762729308883_y", "marquee-4.jpg"],
  ["photo_6336807762729308884_y", "marquee-5.jpg"],
];

for (const [needle, name] of heroMap) {
  const src = resolveAsset(needle);
  assertExists(src, `hero asset (${needle})`);
  const out = path.join(pub, "hero", name);
  toJpgCover(src, out, 1280, 960);
  console.log("[import-media] Hero →", path.relative(webRoot, out));
}

const sliderMap = [
  ["photo_6339059562542993206_y", "slide-1.jpg"],
  ["photo_6339059562542993207_y", "slide-2.jpg"],
  ["photo_6339059562542993208_y", "slide-3.jpg"],
];

for (const [needle, name] of sliderMap) {
  const src = resolveAsset(needle);
  assertExists(src, `slider asset (${needle})`);
  const out = path.join(pub, "slider", name);
  toJpgCover(src, out, 1600, 900);
  console.log("[import-media] Slider →", path.relative(webRoot, out));
}

const deliverySrc = path.join(DOWNLOADS, "document_6339059562083000674.mp4");
const inspectionSrc = path.join(DOWNLOADS, "document_6339059562083000675.mp4");

assertExists(deliverySrc, "delivery mp4 in Downloads");
assertExists(inspectionSrc, "inspection mp4 in Downloads");

remuxVideo(deliverySrc, path.join(pub, "video", "delivery.mp4"));
remuxVideo(inspectionSrc, path.join(pub, "video", "inspection.mp4"));

for (const rel of ["video/delivery.mp4", "video/inspection.mp4"]) {
  const p = path.join(pub, rel);
  const bytes = statSync(p).size;
  const mb = bytes / (1024 * 1024);
  console.log(
    `[import-media] ${rel}: ${bytes} bytes (${mb.toFixed(2)} MB)${
      mb >= 4 ? " — WARNING: exceeds 4 MB target" : ""
    }`,
  );
}

console.log("[import-media] Done.");
