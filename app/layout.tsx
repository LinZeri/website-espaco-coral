import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import Script from "next/script";
import { SITE_URL } from "@/lib/seo-config";
import { GA4_MEASUREMENT_ID, trackingBootstrap } from "@/lib/analytics";
import { AnalyticsListener } from "@/components/analytics/analytics-listener";
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
// Todo uso de font-display no site é peso 400 normal (sem itálico):
// carregar só essa variante evita 5 arquivos de fonte desnecessários.
const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-display-serif",
  display: "swap",
  weight: ["400"],
  style: ["normal"],
});

const OG_DEFAULT = "/og/home.jpg";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Espaço Coral | Espaço para Eventos em Batatais, SP",
    template: "%s | Espaço Coral",
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
        {/* Rastreamento sem GTM: GA4 + Google Ads (gtag) e Meta Pixel.
            IDs e eventos em lib/analytics.ts. As filas gtag/fbq nascem no
            bootstrap; as bibliotecas carregam depois sem perder eventos. */}
        <Script id="tracking-bootstrap" strategy="afterInteractive">
          {trackingBootstrap()}
        </Script>
        <Script
          id="gtag-js"
          strategy="afterInteractive"
          src={`https://www.googletagmanager.com/gtag/js?id=${GA4_MEASUREMENT_ID}`}
        />
        <Script
          id="meta-pixel-js"
          strategy="lazyOnload"
          src="https://connect.facebook.net/en_US/fbevents.js"
        />
      </head>
      <body className="antialiased font-sans bg-background text-foreground">
        <AnalyticsListener />

        {/* Sem <noscript> do Pixel: o Next pré-carrega a imagem mesmo com JS
            ativo, e isso contava um PageView duplicado em toda visita. */}

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
