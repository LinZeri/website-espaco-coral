import sharp from 'sharp';
import { readFileSync, existsSync, mkdirSync, statSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const ROOT = join(__dirname, '..');
const SELECTION_FILE = join(ROOT, '_references', 'selection.json');
const OUT_DIR = join(ROOT, 'public', 'images');
const ALT_TEXTS_FILE = join(ROOT, '_references', 'alt-texts.json');

const FORCE = process.argv.includes('--force');

// Quality/width config per top-level destination folder
const FOLDER_CONFIG = {
  hero:       { width: 1280, quality: 60 },
  spaces:     { width: 1080, quality: 60 },
  gallery:    { width: 1080, quality: 60 },
  atracoes:   { width: 1080, quality: 65 },
  decoracao:  { width: 1080, quality: 65 },
};

function getConfig(destinationFolder) {
  const top = destinationFolder.split('/')[0];
  return FOLDER_CONFIG[top] ?? { width: 1080, quality: 60 };
}

if (!existsSync(SELECTION_FILE)) {
  console.error(`Arquivo não encontrado: ${SELECTION_FILE}`);
  console.error('Execute primeiro: npm run catalog  →  depois crie _references/selection.json');
  process.exit(1);
}

const selection = JSON.parse(readFileSync(SELECTION_FILE, 'utf-8'));
console.log(`\nProcessando ${selection.length} fotos selecionadas...\n`);

const altTextsMap = {};
const stats = { ok: 0, skipped: 0, errors: 0 };

for (const item of selection) {
  const { source_path, destination_folder, output_name, alt_text } = item;

  // Files created on macOS use NFD (decomposed) Unicode while our paths use NFC.
  // Normalize only the filename segment to NFD to match the filesystem encoding.
  const parts = source_path.split('/');
  const filenameNFD = parts[parts.length - 1].normalize('NFD');
  const sourceFull = join(ROOT, ...parts.slice(0, -1), filenameNFD);

  const destFolder = join(OUT_DIR, ...destination_folder.split('/'));
  const destFull = join(destFolder, output_name);

  if (!existsSync(sourceFull)) {
    console.warn(`  [SKIP] Origem não encontrada: ${source_path}`);
    stats.skipped++;
    continue;
  }

  if (existsSync(destFull) && !FORCE) {
    console.log(`  [SKIP] Já existe (use --force para sobrescrever): ${output_name}`);
    stats.skipped++;
    altTextsMap[`public/images/${destination_folder}/${output_name}`] = alt_text;
    continue;
  }

  mkdirSync(destFolder, { recursive: true });

  const cfg = getConfig(destination_folder);
  const beforeSize = statSync(sourceFull).size;

  try {
    await sharp(sourceFull)
      .resize({ width: cfg.width, withoutEnlargement: true })
      .webp({ quality: cfg.quality })
      .toFile(destFull);

    const afterSize = statSync(destFull).size;
    const pct = Math.round((1 - afterSize / beforeSize) * 100);
    const beforeMB = (beforeSize / 1024 / 1024).toFixed(1);
    const afterKB = (afterSize / 1024).toFixed(0);

    console.log(`  [OK] ${output_name}  ${beforeMB}MB → ${afterKB}KB  (-${pct}%)`);
    altTextsMap[`public/images/${destination_folder}/${output_name}`] = alt_text;
    stats.ok++;
  } catch (err) {
    console.error(`  [ERRO] ${output_name}: ${err.message}`);
    stats.errors++;
  }
}

// Save alt-texts registry
writeFileSync(ALT_TEXTS_FILE, JSON.stringify(altTextsMap, null, 2), 'utf-8');

console.log(`
========================================
Concluído
  Processadas: ${stats.ok}
  Ignoradas:   ${stats.skipped}
  Erros:       ${stats.errors}
  Alt texts:   ${ALT_TEXTS_FILE}
========================================
`);
