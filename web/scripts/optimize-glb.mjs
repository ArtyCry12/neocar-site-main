import { spawnSync } from "node:child_process";
import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const modelsDir = path.join(root, "public", "models");

const candidates = ["forklift.full.glb", "forklift.glb"]
  .map((name) => path.join(modelsDir, name))
  .filter((p) => existsSync(p));

const input = candidates[0];
const output = path.join(modelsDir, "forklift.opt.glb");

if (!input) {
  console.error(
    "[optimize-glb] Missing input model. Place forklift.glb or forklift.full.glb in public/models/",
  );
  process.exit(1);
}

const result = spawnSync(
  "npx.cmd",
  [
    "@gltf-transform/cli",
    "optimize",
    input,
    output,
    "--texture-compress",
    "webp",
    "--texture-size",
    "1024",
  ],
  { stdio: "inherit", shell: true, cwd: root },
);

process.exit(result.status ?? 1);
