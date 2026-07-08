import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo-config";

// Sem a diretiva `host`: não é padrão (só o Yandex a reconhecia) e o host
// canônico já é garantido pelos redirects 308 e pelos canonicals.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/lp/", "/proposta/", "/api/", "/_next/"],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
