import sharp from 'sharp';
import { readdirSync, statSync, writeFileSync } from 'fs';
import { join, extname, relative } from 'path';
import { fileURLToPath } from 'url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const ROOT = join(__dirname, '..');
const PHOTOS_DIR = join(ROOT, '_references', 'Photos');
const OUT_JSON = join(ROOT, '_references', 'catalog.json');
const OUT_CSV = join(ROOT, '_references', 'catalog.csv');

const IMAGE_EXTS = new Set(['.jpg', '.jpeg', '.png', '.webp', '.JPG', '.JPEG', '.PNG', '.WEBP']);

function walkDir(dir) {
  const entries = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const fullPath = join(dir, entry.name);
    if (entry.isDirectory()) {
      entries.push(...walkDir(fullPath));
    } else if (IMAGE_EXTS.has(extname(entry.name))) {
      entries.push(fullPath);
    }
  }
  return entries;
}

function topFolder(filePath) {
  const rel = relative(PHOTOS_DIR, filePath);
  return rel.split(/[\\/]/)[0];
}

function orientation(width, height) {
  if (width > height * 1.1) return 'landscape';
  if (height > width * 1.1) return 'portrait';
  return 'square';
}

console.log(`Varrendo ${PHOTOS_DIR}...\n`);
const files = walkDir(PHOTOS_DIR);
console.log(`${files.length} imagens encontradas. Lendo metadados...\n`);

const entries = [];
let errors = 0;

for (let i = 0; i < files.length; i++) {
  const filePath = files[i];
  const relPath = relative(ROOT, filePath).replace(/\\/g, '/');

  if ((i + 1) % 100 === 0) {
    process.stdout.write(`  ${i + 1}/${files.length}...\r`);
  }

  try {
    const stat = statSync(filePath);
    const meta = await sharp(filePath).metadata();

    entries.push({
      id: String(i + 1).padStart(4, '0'),
      source_path: relPath,
      source_folder: topFolder(filePath),
      filename: filePath.split(/[\\/]/).pop(),
      size_mb: +(stat.size / 1024 / 1024).toFixed(2),
      width: meta.width ?? 0,
      height: meta.height ?? 0,
      orientation: orientation(meta.width ?? 0, meta.height ?? 0),
    });
  } catch (err) {
    errors++;
    entries.push({
      id: String(i + 1).padStart(4, '0'),
      source_path: relPath,
      source_folder: topFolder(filePath),
      filename: filePath.split(/[\\/]/).pop(),
      size_mb: 0,
      width: 0,
      height: 0,
      orientation: 'unknown',
      error: err.message,
    });
  }
}

console.log(`\n\nConcluído: ${entries.length} fotos | ${errors} erros\n`);

// Resumo por pasta
const byFolder = {};
for (const e of entries) {
  byFolder[e.source_folder] = (byFolder[e.source_folder] ?? 0) + 1;
}
console.log('Resumo por pasta:');
for (const [folder, count] of Object.entries(byFolder)) {
  console.log(`  ${folder}: ${count} fotos`);
}

// JSON
writeFileSync(OUT_JSON, JSON.stringify(entries, null, 2), 'utf-8');
console.log(`\nJSON salvo em: ${OUT_JSON}`);

// CSV
const csvHeader = 'id,source_folder,filename,size_mb,width,height,orientation,source_path';
const csvRows = entries.map(e =>
  [e.id, `"${e.source_folder}"`, `"${e.filename}"`, e.size_mb, e.width, e.height, e.orientation, `"${e.source_path}"`].join(',')
);
writeFileSync(OUT_CSV, [csvHeader, ...csvRows].join('\n'), 'utf-8');
console.log(`CSV salvo em: ${OUT_CSV}`);
