/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 31536000, // 1 ano
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

export default nextConfig;
