// Build script: copies the static site into dist/ for production hosting.
import { cp, mkdir, rm } from "node:fs/promises";
import { fileURLToPath } from "node:url";

const ROOT = fileURLToPath(new URL(".", import.meta.url));
const DIST = new URL("./dist/", import.meta.url);

const ENTRIES = ["index.html", "style.css", "assets", "projects", "server.js", "package.json"];
const ASSETS = ["JOSHUA_ROMERO_RESUME.pdf", "review-hunter.jpg", "sourcing-system.jpg", "resale-helper-shopname.jpg", "resale-helper-zip.jpg"];

await rm(DIST, { recursive: true, force: true });
await mkdir(DIST, { recursive: true });

for (const entry of ENTRIES) {
  await cp(new URL(`./${entry}`, import.meta.url), new URL(`./${entry}`, DIST), { recursive: true });
}
for (const asset of ASSETS) {
  await cp(new URL(`./${asset}`, import.meta.url), new URL(`./${asset}`, DIST));
}

console.log("Built dist/ —", [...ENTRIES, ...ASSETS].length, "entries copied.");