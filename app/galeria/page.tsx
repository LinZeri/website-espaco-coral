import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { WhatsAppButton } from "@/components/layout/whatsapp-button";
import { PageHero } from "@/components/sections/page-hero";
import { JsonLd } from "@/components/seo/json-ld";
import { galeriaSchema } from "@/lib/schema";

const GalleryGrid = dynamic(() =>
  import("@/components/sections/gallery-grid").then((m) => m.GalleryGrid)
);
const CtaSection = dynamic(() =>
  import("@/components/sections/cta-section").then((m) => m.CtaSection)
);

export const metadata: Metadata = {
  title: "Galeria de Eventos Realizados em Batatais",
  description:
    "Fotos de casamentos, festas de 15 anos e eventos realizados no Espaço Coral em Batatais, SP. Veja ambientes, decorações e momentos reais do espaço.",
  alternates: { canonical: "https://coraleventos.com.br/galeria" },
  openGraph: {
    title: "Galeria do Espaço Coral em Batatais, SP",
    description:
      "Casamentos, festas de 15 anos e eventos no Espaço Coral em Batatais, SP.",
    url: "https://coraleventos.com.br/galeria",
    images: [
      {
        url: "/og/galeria.jpg",
        width: 1200,
        height: 630,
        alt: "Galeria de eventos realizados no Espaço Coral em Batatais, SP",
      },
    ],
  },
};

export default function GaleriaPage() {
  return (
    <>
      <JsonLd data={galeriaSchema()} />
      <Header />
      <main>
        <PageHero
          title="Galeria"
          subtitle="Momentos que ficam para sempre"
          imageSrc="/images/scenes/casamentos/casamento-arco-floral.webp"
          imageAlt="Casamento no Espaço Coral em Batatais SP"
        />
        <section className="bg-background">
          <GalleryGrid />
        </section>
        <CtaSection />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
