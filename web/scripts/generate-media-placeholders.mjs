import { spawnSync } from "node:child_process";
import { mkdirSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

let ffmpegPath;
try {
  ffmpegPath = (await import("ffmpeg-static")).default;
} catch {
  console.error(
    "[generate-media] Install devDependency ffmpeg-static, then re-run: npm.cmd run generate:media",
  );
  process.exit(1);
}

if (!ffmpegPath) {
  console.error("[generate-media] ffmpeg-static binary path is empty.");
  process.exit(1);
}

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const pub = path.join(root, "public", "media");

function run(args) {
  const res = spawnSync(ffmpegPath, args, {
    stdio: "inherit",
    shell: process.platform === "win32",
  });
  if (res.status !== 0) process.exit(res.status ?? 1);
}

mkdirSync(path.join(pub, "hero"), { recursive: true });
mkdirSync(path.join(pub, "slider"), { recursive: true });
mkdirSync(path.join(pub, "video"), { recursive: true });

const logo = path.join(pub, "neocar-logo.png");
run([
  "-y",
  "-f",
  "lavfi",
  "-i",
  "color=c=#dc2626:s=180x180",
  "-frames:v",
  "1",
  "-update",
  "1",
  logo,
]);

const heroSpecs = [
  ["marquee-1.jpg", "1280", "960", "#18181b"],
  ["marquee-2.jpg", "1280", "960", "#27272a"],
  ["marquee-3.jpg", "1280", "960", "#3f0f1f"],
  ["marquee-4.jpg", "1280", "960", "#1c1917"],
  ["marquee-5.jpg", "1280", "960", "#422006"],
];

for (const [name, w, h, col] of heroSpecs) {
  const out = path.join(pub, "hero", name);
  run([
    "-y",
    "-f",
    "lavfi",
    "-i",
    `color=c=${col}:s=${w}x${h}`,
    "-frames:v",
    "1",
    "-update",
    "1",
    "-q:v",
    "3",
    out,
  ]);
}

const sliderSpecs = [
  ["slide-1.jpg", "1600", "900", "#0f172a"],
  ["slide-2.jpg", "1600", "900", "#1e293b"],
  ["slide-3.jpg", "1600", "900", "#334155"],
];

for (const [name, w, h, col] of sliderSpecs) {
  const out = path.join(pub, "slider", name);
  run([
    "-y",
    "-f",
    "lavfi",
    "-i",
    `color=c=${col}:s=${w}x${h}`,
    "-frames:v",
    "1",
    "-update",
    "1",
    "-q:v",
    "3",
    out,
  ]);
}

const delivery = path.join(pub, "video", "delivery.mp4");
const inspection = path.join(pub, "video", "inspection.mp4");

function encodeMp4(outFile, color, seconds = "6") {
  run([
    "-y",
    "-f",
    "lavfi",
    "-i",
    `color=c=${color}:s=1280x720:r=24`,
    "-t",
    seconds,
    "-c:v",
    "libx264",
    "-pix_fmt",
    "yuv420p",
    "-movflags",
    "+faststart",
    "-an",
    "-preset",
    "slow",
    "-crf",
    "28",
    outFile,
  ]);
}

encodeMp4(delivery, "#27272a");
encodeMp4(inspection, "#18181b");

console.log("[generate-media] Done:", pub);
