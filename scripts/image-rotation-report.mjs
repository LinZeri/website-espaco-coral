import { readFileSync, existsSync, readdirSync } from 'fs';
import { join, sep, posix } from 'path';
import { fileURLToPath } from 'url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const ROOT = join(__dirname, '..');
const IMAGES_DIR = join(ROOT, 'public', 'images');
const USAGE_FILE = join(ROOT, 'data', 'images-usage.json');

function toPosix(p) {
  return p.split(sep).join(posix.sep);
}

function categoryOf(imgPath) {
  const parts = imgPath.replace(/^\/images\//, '').split('/');
  if (parts[0] === 'scenes') return `scenes/${parts[1]}`;
  if (parts[0] === 'events') return `events/${parts[1]}`;
  return parts[0];
}

function bar(used, total, width = 10) {
  if (total === 0) return '[' + '░'.repeat(width) + ']';
  const filled = Math.round((used / total) * width);
  return '[' + '█'.repeat(filled) + '░'.repeat(width - filled) + ']';
}

function healthLabel(used, total) {
  if (total === 0) return '(categoria vazia, popular)';
  const pct = used / total;
  if (pct === 0) return '(nenhuma usada ainda)';
  if (pct < 0.5) return '(saudavel)';
  if (pct < 0.7) return '(atencao)';
  if (pct < 1.0) return '(esgotando)';
  return '(ESGOTADA, adicione fotos)';
}

function daysSince(dateStr) {
  if (!dateStr) return Infinity;
  const then = new Date(dateStr).getTime();
  const now = Date.now();
  return Math.floor((now - then) / (1000 * 60 * 60 * 24));
}

function main() {
  if (!existsSync(USAGE_FILE)) {
    console.error(`Arquivo nao encontrado: ${USAGE_FILE}`);
    console.error('Rode primeiro: node scripts/scan-image-usage.mjs');
    process.exit(1);
  }

  const usage = JSON.parse(readFileSync(USAGE_FILE, 'utf-8'));

  const byCategory = new Map();
  for (const [imgPath, data] of Object.entries(usage)) {
    const cat = categoryOf(imgPath);
    if (!byCategory.has(cat)) byCategory.set(cat, { used: 0, total: 0, images: [] });
    const entry = byCategory.get(cat);
    entry.total++;
    if (data.totalUses > 0) entry.used++;
    entry.images.push({ path: imgPath, ...data });
  }

  console.log('\n=== Saude do banco de imagens ===\n');

  const sortedCategories = [...byCategory.keys()].sort();
  const maxCatLen = Math.max(...sortedCategories.map(c => c.length));

  for (const cat of sortedCategories) {
    const { used, total } = byCategory.get(cat);
    const padded = cat.padEnd(maxCatLen + 2);
    console.log(`${padded}${bar(used, total)} ${used}/${total} usadas  ${healthLabel(used, total)}`);
  }

  const allUsed = Object.entries(usage)
    .filter(([, d]) => d.totalUses > 0)
    .sort((a, b) => b[1].totalUses - a[1].totalUses);

  console.log('\nFotos mais usadas:');
  for (const [path, data] of allUsed.slice(0, 5)) {
    console.log(`  ${data.totalUses}x  ${path}`);
  }

  const stale = Object.entries(usage)
    .filter(([, d]) => d.totalUses > 0 && daysSince(d.lastUsedAt) >= 90)
    .sort((a, b) => daysSince(b[1].lastUsedAt) - daysSince(a[1].lastUsedAt));

  if (stale.length > 0) {
    console.log('\nFotos nao usadas ha 90+ dias (candidatas a swap):');
    for (const [path, data] of stale.slice(0, 10)) {
      console.log(`  ${daysSince(data.lastUsedAt)}d  ${path}`);
    }
  }

  const overused = Object.entries(usage).filter(([, d]) => d.totalUses >= 3);
  if (overused.length > 0) {
    console.log('\nFotos com 3+ usos (considere diversificar):');
    for (const [path, data] of overused) {
      console.log(`  ${data.totalUses}x  ${path}`);
    }
  }

  console.log('');
}

main();
