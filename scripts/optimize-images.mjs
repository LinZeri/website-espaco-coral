import sharp from 'sharp';
import { readdirSync, statSync, unlinkSync } from 'fs';
import { join, basename, dirname } from 'path';

const config = {
  hero:    { width: 1280, quality: 60 },
  gallery: { width: 1080, quality: 60 },
  spaces:  { width: 1080, quality: 60 },
};

const imagesDir = new URL('../public/images', import.meta.url).pathname;

async function processFolder(folder, { width, quality }) {
  const files = readdirSync(folder).filter(f => /\.(jpg|jpeg)$/i.test(f));
  for (const file of files) {
    const input = join(folder, file);
    const output = join(folder, basename(file).replace(/\.(jpg|jpeg)$/i, '.webp'));
    const before = statSync(input).size;

    await sharp(input)
      .resize({ width, withoutEnlargement: true })
      .webp({ quality })
      .toFile(output);

    const after = statSync(output).size;
    const pct = Math.round((1 - after / before) * 100);
    console.log(`${file} → ${basename(output)}  ${(before/1024/1024).toFixed(1)}MB → ${(after/1024).toFixed(0)}KB  (-${pct}%)`);
  }
}

for (const [subfolder, cfg] of Object.entries(config)) {
  const dir = join(imagesDir, subfolder);
  console.log(`\n=== ${subfolder} (max ${cfg.width}px, q${cfg.quality}) ===`);
  await processFolder(dir, cfg);
}

console.log('\nDone.');
