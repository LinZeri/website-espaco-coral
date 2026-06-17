import sharp from "sharp";
import { readdirSync, mkdirSync, statSync } from "fs";
import { join, basename } from "path";
import { fileURLToPath } from "url";

const here = fileURLToPath(new URL(".", import.meta.url));
const root = join(here, "..");
const cats = ["buffet", "decoracao"];

for (const cat of cats) {
  const srcDir = join(here, cat);
  const outDir = join(root, "public", "images", "proposta", cat);
  mkdirSync(outDir, { recursive: true });

  for (const file of readdirSync(srcDir)) {
    if (!/\.(jpg|jpeg|png)$/i.test(file)) continue;
    const src = join(srcDir, file);
    const outName = basename(file).replace(/\.(jpg|jpeg|png)$/i, ".webp");
    const out = join(outDir, outName);
    const meta = await sharp(src).metadata();
    await sharp(src)
      .resize({ width: 1080, withoutEnlargement: true })
      .webp({ quality: 70 })
      .toFile(out);
    const kb = Math.round(statSync(out).size / 1024);
    console.log(
      `  ${cat}/${outName}  ${meta.width}x${meta.height}px  ${kb}KB`
    );
  }
}
console.log("done");
