import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo-config";

// Sem a diretiva `host`: não é padrão (só o Yandex a reconhecia) e o host
// canônico já é garantido pelos redirects 308 e pelos canonicals.
//
// `/_next/` NÃO entra no disallow: é onde ficam as imagens otimizadas
// (`/_next/image`) e o CSS/JS da página. Bloquear a pasta impede o Googlebot
// de buscar as fotos do site (ficam fora do Google Imagens) e de renderizar
// a página com CSS/JS. Ver auditoria SEO de 16/09/2026.
//
// `/proposta/` também não entra: já tem `noindex,nofollow` no próprio layout
// (app/proposta/layout.tsx). Bloquear via robots.txt impediria o Google de
// sequer ler essa meta tag, então a URL pode ficar indexada sem conteúdo.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/lp/", "/api/"],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
