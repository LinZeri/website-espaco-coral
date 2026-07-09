// regen-hires: regenera in place cada webp de public/images/** a partir do
// bruto original de alta resolucao em _references/Photos/**, a 2048px / q76.
// Mantem o MESMO nome de arquivo -> zero mudanca de referencia no codigo.
//
// Correspondencia hibrida bruto->webp:
//   1) via manifesto (_references/selection.json + selection.scenes.json)
//   2) via hash perceptual (dHash 64-bit) + aspect ratio para o restante
//
// Uso:
//   node scripts/regen-hires.mjs --dry-run   (so relatorio, nao escreve)
//   node scripts/regen-hires.mjs             (regenera de verdade)
import sharp from "sharp";
import { readdirSync, statSync, existsSync, readFileSync, renameSync, unlinkSync } from "fs";
import { join, sep, posix, basename } from "path";
import { fileURLToPath } from "url";

const __dirname = fileURLToPath(new URL(".", import.meta.url));
const ROOT = join(__dirname, "..");
const IMAGES_DIR = join(ROOT, "public", "images");
const PHOTOS_DIR = join(ROOT, "_references", "Photos");

const DRY = process.argv.includes("--dry-run");
const TARGET_WIDTH = 2048;
const QUALITY = 76;
const SIG = 16; // assinatura NxN grayscale (16x16 = 256 dims)
const MAE_THRESHOLD = 9; // erro medio absoluto (0-255) max para match confiante
const AR_TOL = 0.04; // tolerancia relativa de aspect ratio
const CONCURRENCY = 8;

const RAW_EXT = /\.(jpe?g|png|tiff?)$/i; // heic/heif fora (sharp Windows)
const WEBP_EXT = /\.webp$/i;

function toPosix(p) {
  return p.split(sep).join(posix.sep);
}

function walk(dir, filter) {
  const out = [];
  if (!existsSync(dir)) return out;
  for (const e of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, e.name);
    if (e.isDirectory()) out.push(...walk(full, filter));
    else if (filter(e.name)) out.push(full);
  }
  return out;
}

async function mapPool(items, n, fn) {
  const res = new Array(items.length);
  let idx = 0;
  async function worker() {
    while (idx < items.length) {
      const i = idx++;
      try {
        res[i] = await fn(items[i], i);
      } catch (e) {
        res[i] = { __err: e.message };
      }
    }
  }
  await Promise.all(Array.from({ length: Math.min(n, items.length) }, worker));
  return res;
}

// assinatura: downsample SIGxSIG grayscale (vetor de bytes) + metadata.
// Como o webp e um downscale exato do bruto, o MAE do verdadeiro fica ~0-5;
// fotos diferentes ficam bem acima -> discrimina colisoes que o dHash sofria.
async function sigAndMeta(file) {
  const meta = await sharp(file).metadata();
  const data = await sharp(file).resize(SIG, SIG, { fit: "fill" }).greyscale().raw().toBuffer();
  return { sig: data, w: meta.width || 0, h: meta.height || 0 };
}

// erro medio absoluto entre duas assinaturas, invariante a brilho global
// (subtrai a media de cada uma antes de comparar).
function mae(a, b) {
  const n = a.length;
  let ma = 0, mb = 0;
  for (let i = 0; i < n; i++) { ma += a[i]; mb += b[i]; }
  ma /= n; mb /= n;
  let s = 0;
  for (let i = 0; i < n; i++) s += Math.abs((a[i] - ma) - (b[i] - mb));
  return s / n;
}

// ---- 1) mapa de manifesto: webp absoluto -> bruto absoluto ----
function loadManifest(p) {
  if (!existsSync(p)) return [];
  try {
    return JSON.parse(readFileSync(p, "utf-8"));
  } catch {
    return [];
  }
}
const manifestEntries = [
  ...loadManifest(join(ROOT, "_references", "selection.json")),
  ...loadManifest(join(ROOT, "_references", "selection.scenes.json")),
];
const webpToRaw = new Map();
for (const e of manifestEntries) {
  if (!e || !e.destination_folder || !e.output_name || !e.source_path) continue;
  const webpAbs = join(IMAGES_DIR, ...e.destination_folder.split("/"), e.output_name);
  const rawAbs = join(ROOT, ...e.source_path.split("/"));
  webpToRaw.set(toPosix(webpAbs), rawAbs);
}

async function main() {
  console.log(`=== regen-hires ${DRY ? "(DRY-RUN)" : "(ESCREVENDO)"} | alvo ${TARGET_WIDTH}px q${QUALITY} ===\n`);

  const allWebp = walk(IMAGES_DIR, (n) => WEBP_EXT.test(n));
  console.log(`webp publicos: ${allWebp.length}`);

  // separa: cobertos por manifesto (bruto existe) vs precisam de hash
  const viaManifest = []; // { webp, raw }
  const needHash = []; // webp
  for (const webp of allWebp) {
    const raw = webpToRaw.get(toPosix(webp));
    if (raw && existsSync(raw) && RAW_EXT.test(raw)) viaManifest.push({ webp, raw });
    else needHash.push(webp);
  }
  console.log(`  via manifesto: ${viaManifest.length}`);
  console.log(`  precisam de hash: ${needHash.length}\n`);

  // ---- 2) hash dos brutos (so se necessario) ----
  const matchedByHash = []; // { webp, raw, dist }
  const unmatched = []; // { webp, reason, best }
  if (needHash.length) {
    const rawFiles = walk(PHOTOS_DIR, (n) => RAW_EXT.test(n));
    console.log(`brutos candidatos: ${rawFiles.length} (indexando assinaturas, aguarde)...`);
    const rawIdxRaw = await mapPool(rawFiles, CONCURRENCY, async (f) => {
      const { sig, w, h } = await sigAndMeta(f);
      return { path: f, sig, w, h, ar: h ? w / h : 0 };
    });
    const rawIdx = rawIdxRaw.filter((r) => r && !r.__err && r.ar > 0);
    console.log(`  indexados: ${rawIdx.length}\n`);

    const webpMetaRaw = await mapPool(needHash, CONCURRENCY, async (f) => {
      const { sig, w, h } = await sigAndMeta(f);
      return { path: f, sig, w, h, ar: h ? w / h : 0 };
    });

    for (const wm of webpMetaRaw) {
      if (!wm || wm.__err || !wm.ar) {
        unmatched.push({ webp: wm?.path, reason: "erro ao ler webp" });
        continue;
      }
      let best = null;
      for (const r of rawIdx) {
        if (Math.abs(r.ar - wm.ar) / wm.ar > AR_TOL) continue; // pre-filtro AR
        const d = mae(wm.sig, r.sig);
        if (!best || d < best.dist) best = { raw: r.path, dist: d, rawW: r.w };
      }
      if (best && best.dist <= MAE_THRESHOLD && Math.min(TARGET_WIDTH, best.rawW) > wm.w) {
        matchedByHash.push({ webp: wm.path, raw: best.raw, dist: best.dist });
      } else {
        unmatched.push({
          webp: wm.path,
          reason: best ? `melhor MAE=${best.dist.toFixed(1)} (>${MAE_THRESHOLD}) ou sem ganho` : "sem candidato no AR",
          best: best ? toPosix(best.raw).split("/_references/")[1] : null,
        });
      }
    }
  }

  // ---- relatorio ----
  const rel = (p) => toPosix(p).replace(toPosix(ROOT) + "/", "");
  console.log(`--- MATCH via assinatura (${matchedByHash.length}), ordenado por MAE desc (piores primeiro) ---`);
  for (const m of matchedByHash.sort((a, b) => b.dist - a.dist)) {
    console.log(`  MAE=${m.dist.toFixed(1).padStart(4)}  ${rel(m.webp)}  <=  ${rel(m.raw)}`);
  }
  console.log(`\n--- NAO-CASADOS (${unmatched.length}) ---`);
  for (const u of unmatched) {
    console.log(`  ${rel(u.webp)}  [${u.reason}]${u.best ? "  ~melhor: " + u.best : ""}`);
  }

  const toRegen = [...viaManifest, ...matchedByHash.map((m) => ({ webp: m.webp, raw: m.raw }))];
  console.log(`\n=== TOTAL a regenerar: ${toRegen.length} (manifesto ${viaManifest.length} + hash ${matchedByHash.length}) | nao-casados ${unmatched.length} ===`);

  if (DRY) {
    console.log("\n[DRY-RUN] nada foi escrito. Rode sem --dry-run para aplicar.");
    return;
  }

  // ---- regeneracao ----
  let ok = 0, skip = 0, err = 0;
  await mapPool(toRegen, CONCURRENCY, async ({ webp, raw }) => {
    try {
      const meta = await sharp(raw).metadata();
      const width = Math.min(TARGET_WIDTH, meta.width || TARGET_WIDTH);
      const tmp = webp + ".tmp";
      await sharp(raw).resize({ width, withoutEnlargement: true }).webp({ quality: QUALITY }).toFile(tmp);
      renameSync(tmp, webp);
      ok++;
    } catch (e) {
      err++;
      console.error(`  [ERR] ${rel(webp)}: ${e.message}`);
      try { unlinkSync(webp + ".tmp"); } catch {}
    }
  });
  console.log(`\nRegenerados: ${ok} | Erros: ${err} | Skip: ${skip}`);
  console.log("Rode: npm run build  para validar; e confira uma amostra visualmente.");
}

main();
