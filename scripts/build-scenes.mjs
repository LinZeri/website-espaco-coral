// build-scenes: gera o banco public/images/scenes/ espelhando 1:1 a taxonomia
// curada em _references/Photos/scenes/ (a pasta de origem define a categoria).
// Para cada categoria, converte as fotos para WebP (1080px, q60), nomeia em
// sequencia SEO (espaco-coral-<categoria>-NN.webp) e aplica alt por categoria.
// Workflow: jogue fotos novas em _references/Photos/scenes/<grupo>/<sub>/ e rode
//   npm run images:build-scenes  &&  npm run images:scan
// HEIC nao e suportado pelo sharp no Windows: converta para JPG antes.
import sharp from "sharp";
import { readdirSync, statSync, mkdirSync, writeFileSync, existsSync } from "fs";
import { join, extname } from "path";
import { fileURLToPath } from "url";

const __dirname = fileURLToPath(new URL(".", import.meta.url));
const ROOT = join(__dirname, "..");
const SRC = join(ROOT, "_references", "Photos", "scenes");
const OUT = join(ROOT, "public", "images", "scenes");
const MANIFEST = join(ROOT, "_references", "selection.scenes.json");

const IMG = new Set([".jpg", ".jpeg", ".png", ".webp", ".tif", ".tiff"]);
const WIDTH = 1080;
const QUALITY = 60;

function slug(s) {
  return s
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

// alt template por categoria (slug nested). fallback generico no fim.
const ALT = {
  "pessoas/casal": "Casal de noivos no Espaço Coral em Batatais SP",
  "pessoas/noiva": "Noiva no Espaço Coral em Batatais SP",
  "pessoas/noivo": "Noivo no Espaço Coral em Batatais SP",
  "pessoas/dia-da-noiva": "Preparativos da noiva no Espaço Coral em Batatais SP",
  "pessoas/dia-do-noivo": "Preparativos do noivo no Espaço Coral em Batatais SP",
  "pessoas/padrinhos": "Padrinhos no casamento no Espaço Coral em Batatais SP",
  "pessoas/pajens": "Pajens no casamento no Espaço Coral em Batatais SP",
  "pessoas/convidados": "Convidados no Espaço Coral em Batatais SP",
  "pessoas/pessoas-dancando": "Convidados dançando na festa no Espaço Coral em Batatais SP",
  "decoracao/mesa-de-bolo-e-doces": "Mesa de bolo e doces decorada no Espaço Coral em Batatais SP",
  "decoracao/decoracao-mesas": "Mesa posta decorada para casamento no Espaço Coral em Batatais SP",
  "decoracao/decoracao-flores": "Arranjo floral de casamento no Espaço Coral em Batatais SP",
  "decoracao/cerimonia-ar-livre": "Decoração de cerimônia ao ar livre no Espaço Coral em Batatais SP",
  "decoracao/espaco-instagramavel": "Espaço instagramável decorado no Espaço Coral em Batatais SP",
  "decoracao/mesa-de-bem-casados": "Mesa de bem-casados no Espaço Coral em Batatais SP",
  "decoracao/mesa-de-pais": "Mesa dos pais no casamento no Espaço Coral em Batatais SP",
  "decoracao/pista-de-danca": "Pista de dança decorada no Espaço Coral em Batatais SP",
  "atracoes/animadores": "Animadores da festa no Espaço Coral em Batatais SP",
  "atracoes/banda": "Banda ao vivo no Espaço Coral em Batatais SP",
  "atracoes/orquestra": "Orquestra na cerimônia no Espaço Coral em Batatais SP",
  "atracoes/maquina-pelucias": "Máquina de pelúcias na festa no Espaço Coral em Batatais SP",
  "atracoes/massagem": "Estação de massagem para convidados no Espaço Coral em Batatais SP",
  "atracoes/telao-led": "Telão de LED no evento no Espaço Coral em Batatais SP",
  "atracoes/album-fotos-polaroid": "Álbum de fotos instantâneas na festa no Espaço Coral em Batatais SP",
  "atracoes/receptivo-espumante": "Recepção com espumante no Espaço Coral em Batatais SP",
  "atracoes/brincadeiras/danca-da-cordinha": "Brincadeira da dança da cordinha na festa no Espaço Coral em Batatais SP",
  "atracoes/brincadeiras/jogando-buque": "Noiva jogando o buquê na festa no Espaço Coral em Batatais SP",
  "atracoes/brincadeiras/jogando-whiskie": "Brincadeira de jogar whisky na festa no Espaço Coral em Batatais SP",
  "atracoes/brincadeiras/quebrando-pratos": "Brincadeira de quebrar pratos na festa no Espaço Coral em Batatais SP",
  "ambientes/area-verde": "Área verde do Espaço Coral em Batatais SP",
  "ambientes/entrada-salao": "Entrada do salão do Espaço Coral em Batatais SP",
  "ambientes/gramado": "Gramado para cerimônia ao ar livre no Espaço Coral em Batatais SP",
  "ambientes/marquise": "Marquise do Espaço Coral em Batatais SP",
  "ambientes/salao": "Salão do Espaço Coral em Batatais SP",
  "ambientes/varanda": "Varanda do Espaço Coral em Batatais SP",
  "ambientes/espaco-kids": "Espaço kids para crianças no Espaço Coral em Batatais SP",
  "quinze-anos": "Festa de 15 anos no Espaço Coral em Batatais SP",
  "bancos-gerais/corporativo": "Evento corporativo no Espaço Coral em Batatais SP",
  "bar-de-drinks": "Bar de drinks no Espaço Coral em Batatais SP",
  "buffet": "Buffet servido no Espaço Coral em Batatais SP",
  "buque-noiva": "Buquê da noiva no Espaço Coral em Batatais SP",
  "vestido-noiva": "Vestido de noiva no Espaço Coral em Batatais SP",
};

// agrupa arquivos por categoria (caminho relativo de pasta)
function walk(dir, relParts = []) {
  const groups = {};
  for (const e of readdirSync(dir, { withFileTypes: true })) {
    if (e.isDirectory()) {
      Object.assign(groups, walk(join(dir, e.name), [...relParts, e.name]));
    } else if (IMG.has(extname(e.name).toLowerCase())) {
      const key = relParts.join("/"); // ex: "Pessoas/casal"
      (groups[key] ??= []).push(join(dir, e.name));
    }
  }
  return groups;
}

const groups = walk(SRC);

// Fontes extras: pastas fora de scenes/ (ex: galerias de eventos) que devem
// entrar no banco como categorias de cena reutilizaveis.
const EXTRA = [
  { src: join(ROOT, "_references", "Photos", "events", "15 Anos da Mel Bagio"), cat: "quinze-anos" },
];
for (const { src, cat } of EXTRA) {
  if (!existsSync(src)) continue;
  const files = readdirSync(src, { withFileTypes: true })
    .filter((e) => e.isFile() && IMG.has(extname(e.name).toLowerCase()))
    .map((e) => join(src, e.name));
  if (files.length) groups[cat] = (groups[cat] ?? []).concat(files);
}

const manifest = [];
const stats = { ok: 0, err: 0, bytesIn: 0, bytesOut: 0 };
const perCat = [];

for (const rawKey of Object.keys(groups).sort()) {
  const slugKey = rawKey.split("/").map(slug).join("/"); // pessoas/casal
  const fileBase = slugKey.split("/").join("-"); // pessoas-casal
  const alt = ALT[slugKey] ?? "Casamento e eventos no Espaço Coral em Batatais SP";
  const destFolder = join(OUT, ...slugKey.split("/"));
  mkdirSync(destFolder, { recursive: true });

  const files = groups[rawKey].sort((a, b) => a.localeCompare(b, "pt"));
  let n = 0;
  for (const src of files) {
    n++;
    const outName = `espaco-coral-${fileBase}-${String(n).padStart(2, "0")}.webp`;
    const dest = join(destFolder, outName);
    try {
      const before = statSync(src).size;
      await sharp(src)
        .resize({ width: WIDTH, withoutEnlargement: true })
        .webp({ quality: QUALITY })
        .toFile(dest);
      const after = statSync(dest).size;
      stats.ok++;
      stats.bytesIn += before;
      stats.bytesOut += after;
      manifest.push({
        source_path: src.replace(ROOT + "\\", "").replace(/\\/g, "/"),
        destination_folder: `scenes/${slugKey}`,
        output_name: outName,
        alt_text: alt,
      });
    } catch (err) {
      stats.err++;
      console.error(`  [ERR] ${src}: ${err.message}`);
    }
  }
  perCat.push(`  scenes/${slugKey}: ${n}`);
}

writeFileSync(MANIFEST, JSON.stringify(manifest, null, 2), "utf-8");

console.log("=== build-scenes (espelho da taxonomia _references/Photos/scenes) ===\n");
console.log(perCat.join("\n"));
console.log(`\nConvertidas: ${stats.ok} | Erros: ${stats.err}`);
console.log(`Tamanho: ${(stats.bytesIn / 1024 / 1024).toFixed(0)}MB -> ${(stats.bytesOut / 1024 / 1024).toFixed(1)}MB`);
console.log(`Manifesto: ${MANIFEST}`);
