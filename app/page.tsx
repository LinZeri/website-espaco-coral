import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { WhatsAppButton } from "@/components/layout/whatsapp-button";
import { HeroSection } from "@/components/sections/hero-section";
import { PhilosophySection } from "@/components/sections/philosophy-section";
import { JsonLd } from "@/components/seo/json-ld";
import { homeSchema } from "@/lib/schema";

// Seções below-fold: carregam o JS apenas quando necessário (SSG-compatível)
const EventsSection = dynamic(() =>
  import("@/components/sections/events-section").then((m) => m.EventsSection)
);
const TechnologySection = dynamic(() =>
  import("@/components/sections/technology-section").then((m) => m.TechnologySection)
);
const GallerySection = dynamic(() =>
  import("@/components/sections/gallery-section").then((m) => m.GallerySection)
);
const StatsSection = dynamic(() =>
  import("@/components/sections/stats-section").then((m) => m.StatsSection)
);
const TestimonialsSection = dynamic(() =>
  import("@/components/sections/testimonials-section").then((m) => m.TestimonialsSection)
);
const CtaSection = dynamic(() =>
  import("@/components/sections/cta-section").then((m) => m.CtaSection)
);

export const metadata: Metadata = {
  title: {
    absolute: "Espaço Coral | Espaço para Casamentos e Eventos em Batatais, SP",
  },
  description:
    "Espaço premium para casamentos, festas de 15 anos e eventos corporativos em Batatais, SP. 12.000 m², capacidade para 320 convidados, cerimônia ao céu aberto.",
  alternates: { canonical: "https://coraleventos.com.br" },
  openGraph: {
    title: "Espaço Coral | Espaço para Casamentos e Eventos em Batatais, SP",
    description:
      "Espaço premium para casamentos, festas de 15 anos e eventos em Batatais, SP. 12.000 m², 320 convidados, cerimônia ao ar livre.",
    url: "https://coraleventos.com.br",
    images: [
      {
        url: "/og/home.jpg",
        width: 1200,
        height: 630,
        alt: "Espaço Coral, espaço para eventos premium em Batatais, SP",
      },
    ],
  },
};

export default function HomePage() {
  return (
    <>
      <JsonLd data={homeSchema()} />
      <Header />
      <main>
        <HeroSection />
        <PhilosophySection />
        <EventsSection />
        <TechnologySection />
        <GallerySection />
        <StatsSection />
        <TestimonialsSection />
        <CtaSection />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
