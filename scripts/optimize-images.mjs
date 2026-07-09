import sharp from 'sharp';
import { readdirSync, statSync, unlinkSync, existsSync } from 'fs';
import { join, basename, relative, sep, posix } from 'path';
import { fileURLToPath } from 'url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const ROOT = join(__dirname, '..');
const IMAGES_DIR = join(ROOT, 'public', 'images');

const RAW_EXTENSIONS = /\.(jpg|jpeg|png|heic|heif|tif|tiff)$/i;
const WEBP_EXTENSION = /\.webp$/i;
const RAW_NAME_PATTERN = /^(IMG_|DSC_|DSCN|DSCF|P\d{7}|MVI_|GOPR|_MG_)/i;

const rules = [
  { match: /^hero\//,                  width: 2048, quality: 76 },
  { match: /^events\/[^/]+\/cover\./,  width: 2048, quality: 76 },
  { match: /^events\//,                width: 1920, quality: 76 },
  { match: /^scenes\//,                width: 2048, quality: 76 },
  { match: /^testimonials\//,          width: 1280, quality: 76 },
];

const stats = { converted: 0, resized: 0, skipped: 0, errors: 0, rawNames: [] };

function toPosix(p) {
  return p.split(sep).join(posix.sep);
}

function getRule(relPath) {
  return rules.find(r => r.match.test(relPath));
}

function* walk(dir) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      yield* walk(full);
    } else if (entry.isFile()) {
      yield full;
    }
  }
}

async function processFile(absPath) {
  const relPath = toPosix(relative(IMAGES_DIR, absPath));
  const rule = getRule(relPath);
  if (!rule) return;

  const name = basename(absPath);
  const isRaw = RAW_EXTENSIONS.test(name);
  const isWebp = WEBP_EXTENSION.test(name);

  if (!isRaw && !isWebp) return;

  if (isRaw && RAW_NAME_PATTERN.test(name)) {
    stats.rawNames.push(relPath);
  }

  if (isRaw) {
    const outputName = name.replace(RAW_EXTENSIONS, '.webp');
    const outputPath = join(absPath, '..', outputName);
    const beforeSize = statSync(absPath).size;

    try {
      await sharp(absPath)
        .resize({ width: rule.width, withoutEnlargement: true })
        .webp({ quality: rule.quality })
        .toFile(outputPath);

      const afterSize = statSync(outputPath).size;
      const pct = Math.round((1 - afterSize / beforeSize) * 100);
      console.log(`  [OK]  ${relPath} → ${outputName}  ${(beforeSize/1024/1024).toFixed(1)}MB → ${(afterSize/1024).toFixed(0)}KB  (-${pct}%)`);

      unlinkSync(absPath);
      stats.converted++;
    } catch (err) {
      console.error(`  [ERR] ${relPath}: ${err.message}`);
      if (/heif|heic/i.test(name) && /unsupported|libheif/i.test(err.message)) {
        console.error(`        HEIC/HEIF requer build do sharp com libheif. Converta para JPG antes ou use ferramenta externa.`);
      }
      stats.errors++;
    }
    return;
  }

  if (isWebp) {
    const meta = await sharp(absPath).metadata();
    if (meta.width && meta.width > rule.width + 50) {
      const beforeSize = statSync(absPath).size;
      const tmpPath = absPath + '.tmp';
      try {
        await sharp(absPath)
          .resize({ width: rule.width, withoutEnlargement: true })
          .webp({ quality: rule.quality })
          .toFile(tmpPath);
        unlinkSync(absPath);
        await import('fs').then(({ renameSync }) => renameSync(tmpPath, absPath));

        const afterSize = statSync(absPath).size;
        const pct = Math.round((1 - afterSize / beforeSize) * 100);
        console.log(`  [RSZ] ${relPath}  ${meta.width}px → ${rule.width}px  ${(beforeSize/1024).toFixed(0)}KB → ${(afterSize/1024).toFixed(0)}KB  (-${pct}%)`);
        stats.resized++;
      } catch (err) {
        console.error(`  [ERR] ${relPath}: ${err.message}`);
        try { unlinkSync(tmpPath); } catch {}
        stats.errors++;
      }
    } else {
      stats.skipped++;
    }
  }
}

async function main() {
  if (!existsSync(IMAGES_DIR)) {
    console.error(`Diretorio nao encontrado: ${IMAGES_DIR}`);
    process.exit(1);
  }

  console.log('=== optimize-images: scanner recursivo ===\n');

  for (const file of walk(IMAGES_DIR)) {
    await processFile(file);
  }

  console.log(`
========================================
Concluido
  Convertidos:  ${stats.converted}
  Redimensiona: ${stats.resized}
  Ja otimizados: ${stats.skipped}
  Erros:        ${stats.errors}
========================================`);

  if (stats.rawNames.length > 0) {
    console.log(`\n${stats.rawNames.length} arquivos com nome bruto (IMG_/DSC_/etc) foram processados mas mantiveram o nome original.`);
    console.log('Renomeie-os para slugs SEO-friendly antes do deploy:');
    for (const n of stats.rawNames) console.log(`  - ${n}`);
  }
}

main();
