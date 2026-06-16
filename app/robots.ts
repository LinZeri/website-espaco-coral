import type { MetadataRoute } from "next";

const SITE_URL = "https://coraleventos.com.br";

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
    host: SITE_URL,
  };
}
