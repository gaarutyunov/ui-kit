/* Assemble the static docs site into dist/.
   No dependencies, no bundling — just copy the files the site needs. The site
   is plain ES modules with relative paths, so it runs from dist/ at any base. */
import { cp, rm, mkdir } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const dist = resolve(root, "dist");

const ITEMS = ["index.html", "site", "src"];

await rm(dist, { recursive: true, force: true });
await mkdir(dist, { recursive: true });
for (const item of ITEMS) {
  await cp(resolve(root, item), resolve(dist, item), { recursive: true });
}
console.log(`Built docs site -> ${dist} (${ITEMS.join(", ")})`);
