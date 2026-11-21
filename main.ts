// The World in One Day — 21 November 2026.
// Copies the entry image (entry.png, in this repository) to the output
// directory as entry.png. Deterministic: the output is a byte-for-byte
// copy of the bundled image, so two runs always produce identical bytes.
// No network, no randomness, no timestamps in the output.

import { copyFileSync, existsSync, mkdirSync, statSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const repoDir = dirname(fileURLToPath(import.meta.url));
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";

const source = join(repoDir, "entry.png");
if (!existsSync(source)) {
  throw new Error(`entry.png not found next to main.ts (${source})`);
}

mkdirSync(outDir, { recursive: true });
const target = join(outDir, "entry.png");
copyFileSync(source, target);
console.log(
  `Wrote ${target} (${statSync(target).size} bytes) — the world news of 21 November 2026.`,
);
