import bundleAnalyzer from "@next/bundle-analyzer";

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    // Importa só os ícones usados em vez do barrel completo do lucide-react.
    optimizePackageImports: ["lucide-react"],
  },
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 31536000, // 1 ano
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          // CSP fica de fora por ora: exige nonce/unsafe-inline por causa do
          // GTM e Meta Pixel. Implementar depois em Report-Only.
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
    ];
  },
  async redirects() {
    return [
      // URLs indexadas no WordPress antigo (ver Google Search Console em
      // _references/Google Search Console do Wordpress antigo/)
      {
        source: "/fotos",
        destination: "/galeria",
        permanent: true,
      },
      {
        source: "/author/linzeripgmail-com",
        destination: "/",
        permanent: true,
      },
      {
        source: "/uncategorized/descubra-o-melhor-salao-e-espaco-para-festas-e-eventos-em-batatais-sp",
        destination: "/",
        permanent: true,
      },
      {
        source: "/uncategorized/salao-e-espaco-de-festas-e-eventos-em-batatais-sp-celebre-em-grande-estilo",
        destination: "/",
        permanent: true,
      },
      {
        source: "/uncategorized/descubra-o-melhor-salao-e-espaco-de-festas-em-batatais-sp",
        destination: "/",
        permanent: true,
      },
    ];
  },
};

export default withBundleAnalyzer(nextConfig);
