/* Build the standalone distributable bundles into dist/.
   - ga-ui-kit.min.js : IIFE for a classic <script> tag (registers every <ga-*>
     on load, also exposes window.GaUIKit)
   - ga-ui-kit.esm.js : ESM bundle for <script type="module"> / imports
   - ga-ui-kit.css    : the design tokens (optional global theme)

   Uses esbuild via npx so the project stays dependency-free. */
import { execFileSync } from "node:child_process";
import { mkdirSync, copyFileSync, statSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const dist = resolve(root, "dist");
const ESBUILD = "esbuild@0.24.2";
const banner = "/*! GA UI Kit — https://github.com/gaarutyunov/ui-kit — MIT */";

mkdirSync(dist, { recursive: true });

const esbuild = (args) =>
  execFileSync("npx", ["--yes", ESBUILD, "src/index.js", "--bundle", "--minify", `--banner:js=${banner}`, ...args],
    { cwd: root, stdio: "inherit" });

// Classic <script> bundle — self-registers all components, exposes window.GaUIKit.
esbuild(["--format=iife", "--global-name=GaUIKit", "--outfile=dist/ga-ui-kit.min.js"]);
// ES module bundle.
esbuild(["--format=esm", "--outfile=dist/ga-ui-kit.esm.js"]);
// Theme tokens as a standalone stylesheet.
copyFileSync(resolve(root, "src/tokens/tokens.css"), resolve(dist, "ga-ui-kit.css"));

console.log("\nBundles:");
for (const f of ["ga-ui-kit.min.js", "ga-ui-kit.esm.js", "ga-ui-kit.css"]) {
  console.log(`  dist/${f}  ${(statSync(resolve(dist, f)).size / 1024).toFixed(1)} KB`);
}
