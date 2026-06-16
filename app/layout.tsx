import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import Script from "next/script";
import "./globals.css";

// Corpo: Inter, legibilidade, modernidade
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

// Display/títulos: Playfair Display como substituto temporário de PP Editorial New
// TODO: substituir por PP Editorial New (fonte comercial) quando licença for adquirida
// Arquivo deve ir em /public/fonts/ e ser carregado via next/font/local
const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-display-serif",
  display: "swap",
  weight: ["400", "500", "700"],
  style: ["normal", "italic"],
});

const SITE_URL = "https://coraleventos.com.br";
const OG_DEFAULT = "/og/home.jpg";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Espaço Coral | Espaço para Eventos em Batatais, SP",
    template: "%s | Espaço Coral, Batatais, SP",
  },
  description:
    "Espaço premium para casamentos, festas de 15 anos e eventos corporativos em Batatais, SP. 12.000 m², capacidade para 320 convidados, cerimônia ao ar livre.",
  keywords: [
    "espaço para eventos Batatais",
    "salão de festas Batatais",
    "espaço para casamento Batatais",
    "festa de 15 anos Batatais",
    "salão de festas perto de Ribeirão Preto",
    "Espaço Coral",
  ],
  applicationName: "Espaço Coral",
  authors: [{ name: "Espaço Coral" }],
  creator: "Espaço Coral",
  publisher: "Espaço Coral",
  category: "Espaço de eventos",
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: SITE_URL,
    siteName: "Espaço Coral",
    title: "Espaço Coral | Espaço para Eventos em Batatais, SP",
    description:
      "Espaço premium para casamentos, festas de 15 anos e eventos em Batatais, SP. 12.000 m², capacidade para 320 convidados.",
    images: [
      {
        url: OG_DEFAULT,
        width: 1200,
        height: 630,
        alt: "Espaço Coral, espaço para eventos premium em Batatais, SP",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Espaço Coral | Espaço para Eventos em Batatais, SP",
    description:
      "Espaço premium para casamentos, festas de 15 anos e eventos em Batatais, SP.",
    images: [OG_DEFAULT],
  },
  alternates: {
    canonical: SITE_URL,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${inter.variable} ${playfairDisplay.variable}`}
    >
      <head>
        {/* Google Tag Manager */}
        <Script id="gtm-head" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','GTM-NR95XJ6B');`}
        </Script>
      </head>
      <body className="antialiased font-sans bg-background text-foreground">
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-NR95XJ6B"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>

        {/* Sentinel para detecção de scroll do header via IntersectionObserver */}
        <div
          id="header-scroll-sentinel"
          aria-hidden="true"
          className="pointer-events-none absolute left-0 top-[50px] h-px w-px overflow-hidden"
        />

        {children}
      </body>
    </html>
  );
}
