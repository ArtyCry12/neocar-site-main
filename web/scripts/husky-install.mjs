import { spawnSync } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const webDir = path.join(__dirname, "..");
const neoCarRoot = path.dirname(webDir);
/** Relative path from the git worktree root → hooks dir (posix for git config). */
const hooksRel = path.posix.join(
  path.basename(neoCarRoot),
  path.basename(webDir),
  ".husky",
);

const gitTop = spawnSync("git", ["rev-parse", "--show-toplevel"], {
  encoding: "utf8",
  shell: process.platform === "win32",
});

if (gitTop.status !== 0) {
  console.warn("[husky-install] Skipped: not inside a git repository.");
  process.exit(0);
}

const cwd = gitTop.stdout.trim();
const cfg = spawnSync("git", ["config", "core.hooksPath", hooksRel], {
  cwd,
  stdio: "inherit",
  shell: process.platform === "win32",
});

process.exit(cfg.status ?? 0);
