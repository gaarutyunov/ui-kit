/* Generate the per-component `.d.ts` declarations from the JSDoc.

   The kit ships as buildless ES modules; TypeScript is a dev-only tool used
   purely to emit type declarations next to each component
   (`tsc --allowJs --declaration --emitDeclarationOnly`, configured in
   tsconfig.json). The hand-written entries — index.d.ts (DOM augmentation +
   re-exports), global.d.ts and react.d.ts — are NOT generated and live at the
   src/ root, so this script only clears the generated ones under
   src/components/ and src/core/ before re-emitting. Clearing first keeps the
   run idempotent: once a `.d.ts` exists, `import "./x.js"` resolves to it, and
   tsc refuses to overwrite a file it is also consuming as input.

   Because tsconfig.json's `include` covers the .js sources only, those
   hand-written roots were never type-checked by anything: react.d.ts shipped
   six JSX entries whose attribute interfaces had never been declared, and only
   a consumer compiling with skipLibCheck:false ever saw it. So generation is
   now followed by a check pass over them — tsconfig.check.json, which is also
   runnable on its own as `npm run types:check`. */
import { readdir, rm } from "node:fs/promises";
import { execFileSync } from "node:child_process";
import { resolve, dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");

async function* walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) yield* walk(full);
    else if (entry.name.endsWith(".d.ts")) yield full;
  }
}

// Remove previously generated declarations (component + core only).
for (const base of ["src/components", "src/core"]) {
  for await (const file of walk(resolve(root, base))) {
    await rm(file);
  }
}

// Emit fresh declarations from the JSDoc.
execFileSync("npx", ["tsc", "-p", "tsconfig.json"], { cwd: root, stdio: "inherit" });
console.log("Generated component declarations from JSDoc.");

// Type-check the hand-written .d.ts roots, which the generation run never sees.
execFileSync("npx", ["tsc", "-p", "tsconfig.check.json"], { cwd: root, stdio: "inherit" });
console.log("Checked hand-written declaration entries.");
