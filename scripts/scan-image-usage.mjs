import { readdirSync, statSync, readFileSync, writeFileSync, existsSync, mkdirSync } from 'fs';
import { join, relative, sep, posix } from 'path';
import { fileURLToPath } from 'url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const ROOT = join(__dirname, '..');
const IMAGES_DIR = join(ROOT, 'public', 'images');
const DATA_DIR = join(ROOT, 'data');
const USAGE_FILE = join(DATA_DIR, 'images-usage.json');

const SCAN_ROOTS = ['app', 'components', 'content', 'lib'];
const SCAN_EXTS = /\.(tsx|ts|jsx|js|mdx|md|json)$/i;
const IMAGE_PATH_REGEX = /\/images\/[a-zA-Z0-9_\-/.]+\.(?:webp|svg|jpg|jpeg|png)/g;

const TODAY = new Date().toISOString().slice(0, 10);

function toPosix(p) {
  return p.split(sep).join(posix.sep);
}

function* walk(dir) {
  if (!existsSync(dir)) return;
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === 'node_modules' || entry.name === '.next' || entry.name === '_references') continue;
      yield* walk(full);
    } else if (entry.isFile() && SCAN_EXTS.test(entry.name)) {
      yield full;
    }
  }
}

function detectUsageType(filePath, line) {
  if (/coverImage:/.test(line)) return 'coverImage';
  if (/ogImage:/.test(line)) return 'ogImage';
  if (/imageSrc=/.test(line)) return 'imageSrc';
  if (/!\[.*\]\(/.test(line)) return 'mdx-inline';
  if (/url:/.test(line)) return 'schema';
  return 'inline';
}

function loadExistingUsage() {
  if (existsSync(USAGE_FILE)) {
    try {
      return JSON.parse(readFileSync(USAGE_FILE, 'utf-8'));
    } catch {
      return {};
    }
  }
  return {};
}

function listAllImages() {
  const all = new Set();
  function walkImages(dir) {
    if (!existsSync(dir)) return;
    for (const entry of readdirSync(dir, { withFileTypes: true })) {
      const full = join(dir, entry.name);
      if (entry.isDirectory()) walkImages(full);
      else if (entry.isFile() && /\.(webp|svg|jpg|jpeg|png)$/i.test(entry.name)) {
        const rel = '/images/' + toPosix(relative(IMAGES_DIR, full));
        all.add(rel);
      }
    }
  }
  walkImages(IMAGES_DIR);
  return all;
}

function main() {
  console.log('=== scan-image-usage ===\n');

  const existing = loadExistingUsage();
  const allImages = listAllImages();
  const usageMap = new Map();

  for (const img of allImages) {
    usageMap.set(img, { usedIn: [], firstUsedAt: null, lastUsedAt: null, totalUses: 0 });
  }

  for (const file of walk(ROOT)) {
    const relPath = toPosix(relative(ROOT, file));
    if (!SCAN_ROOTS.some(r => relPath.startsWith(r + '/'))) continue;

    const content = readFileSync(file, 'utf-8');
    const lines = content.split('\n');

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      const matches = line.match(IMAGE_PATH_REGEX);
      if (!matches) continue;

      for (const imgPath of matches) {
        if (!usageMap.has(imgPath)) {
          usageMap.set(imgPath, { usedIn: [], firstUsedAt: null, lastUsedAt: null, totalUses: 0 });
        }
        const entry = usageMap.get(imgPath);
        const usage = { path: relPath, line: i + 1, as: detectUsageType(file, line) };
        if (!entry.usedIn.some(u => u.path === usage.path && u.line === usage.line)) {
          entry.usedIn.push(usage);
        }
      }
    }
  }

  const output = {};
  for (const [imgPath, entry] of usageMap.entries()) {
    const prior = existing[imgPath] || {};
    const totalUses = entry.usedIn.length;
    const firstUsedAt = totalUses > 0 ? (prior.firstUsedAt || TODAY) : null;
    const lastUsedAt = totalUses > 0 ? TODAY : (prior.lastUsedAt || null);

    output[imgPath] = {
      usedIn: entry.usedIn,
      firstUsedAt,
      lastUsedAt,
      totalUses,
      ...(prior.linkedTo ? { linkedTo: prior.linkedTo } : {}),
      ...(prior.linkedFrom ? { linkedFrom: prior.linkedFrom } : {}),
    };
  }

  const sortedKeys = Object.keys(output).sort();
  const sortedOutput = {};
  for (const k of sortedKeys) sortedOutput[k] = output[k];

  mkdirSync(DATA_DIR, { recursive: true });
  writeFileSync(USAGE_FILE, JSON.stringify(sortedOutput, null, 2), 'utf-8');

  const totalImages = sortedKeys.length;
  const used = sortedKeys.filter(k => output[k].totalUses > 0).length;
  const unused = totalImages - used;
  const broken = [...usageMap.entries()].filter(([k, v]) => v.totalUses > 0 && !allImages.has(k)).map(([k]) => k);

  console.log(`  Imagens catalogadas: ${totalImages}`);
  console.log(`  Em uso:              ${used}`);
  console.log(`  Sem uso:             ${unused}`);
  console.log(`  Refs quebradas:      ${broken.length}`);

  if (broken.length > 0) {
    console.log(`\n  ATENCAO - paths referenciados que NAO existem em /public/images/:`);
    for (const b of broken) console.log(`    - ${b}`);
    process.exit(1);
  }

  console.log(`\nGravado em data/images-usage.json`);
}

main();
