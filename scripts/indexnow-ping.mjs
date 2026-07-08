/**
 * Ping IndexNow: notifica Bing (e demais buscadores que consomem o protocolo)
 * sobre as URLs do sitemap após um deploy com conteúdo novo ou alterado.
 *
 * Uso:
 *   npm run indexnow:ping             -> envia todas as URLs do sitemap live
 *   npm run indexnow:ping -- <url...> -> envia apenas as URLs passadas
 *
 * A chave é validada pelo buscador via GET em /<key>.txt (arquivo em public/).
 * Rodar após o deploy em produção, nunca antes (o sitemap live é a fonte).
 */

const HOST = "coraleventos.com.br";
const SITE_URL = `https://${HOST}`;
const KEY = "c1ca4cef4a7f452fa01c9bce10d68b8f";
const ENDPOINT = "https://api.indexnow.org/indexnow";

async function getSitemapUrls() {
  const res = await fetch(`${SITE_URL}/sitemap.xml`);
  if (!res.ok) {
    throw new Error(`Falha ao baixar sitemap: HTTP ${res.status}`);
  }
  const xml = await res.text();
  return [...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map((m) => m[1]);
}

async function main() {
  const args = process.argv.slice(2);
  const urlList = args.length > 0 ? args : await getSitemapUrls();

  if (urlList.length === 0) {
    console.error("Nenhuma URL para enviar.");
    process.exit(1);
  }

  const res = await fetch(ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify({
      host: HOST,
      key: KEY,
      keyLocation: `${SITE_URL}/${KEY}.txt`,
      urlList,
    }),
  });

  // 200 = processado; 202 = aceito, chave será validada depois.
  console.log(`IndexNow: HTTP ${res.status} para ${urlList.length} URL(s).`);
  if (res.status !== 200 && res.status !== 202) {
    console.error(await res.text());
    process.exit(1);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
