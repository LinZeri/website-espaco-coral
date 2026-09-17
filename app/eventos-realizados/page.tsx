import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { WhatsAppButton } from "@/components/layout/whatsapp-button";
import { PageHero } from "@/components/sections/page-hero";
import { JsonLd } from "@/components/seo/json-ld";
import { CaseStudyCard } from "@/components/case-study/case-study-card";
import { eventosRealizadosHubSchema } from "@/lib/schema";
import { SITE_URL } from "@/lib/seo-config";
import { getAllCaseStudySummaries } from "@/lib/case-studies";

const CtaSection = dynamic(() =>
  import("@/components/sections/cta-section").then((m) => m.CtaSection)
);

export const metadata: Metadata = {
  title: "Eventos Realizados: Casamentos e Festas Reais em Batatais",
  description:
    "Estudos de caso de casamentos, festas de 15 anos e eventos reais realizados no Espaço Coral, em Batatais, SP. Relatos, fotos e bastidores de celebrações de verdade.",
  keywords: [
    "eventos realizados Espaço Coral",
    "casamento real Batatais",
    "festa de 15 anos Batatais",
    "casos reais espaço de eventos interior SP",
  ],
  alternates: { canonical: `${SITE_URL}/eventos-realizados` },
  openGraph: {
    title: "Eventos Realizados no Espaço Coral",
    description:
      "Casamentos, festas de 15 anos e eventos reais realizados no Espaço Coral, em Batatais, SP.",
    url: `${SITE_URL}/eventos-realizados`,
    images: [
      {
        url: "/og/home.jpg",
        width: 1200,
        height: 630,
        alt: "Eventos realizados no Espaço Coral em Batatais, SP",
      },
    ],
  },
};

export default function EventosRealizadosPage() {
  const cases = getAllCaseStudySummaries({ includeDrafts: false });

  const schema = eventosRealizadosHubSchema(
    cases.map((item) => ({
      url: `/eventos-realizados/${item.slug}`,
      headline: item.title,
      datePublished: item.publishDate,
    }))
  );

  return (
    <>
      <JsonLd data={schema} />
      <Header />
      <main>
        <PageHero
          title="Eventos realizados"
          subtitle="Celebrações de verdade no Espaço Coral"
          imageSrc="/images/scenes/salao/espaco-coral-salao-principal-01.webp"
          imageAlt="Salão principal do Espaço Coral decorado para um evento em Batatais"
        />

        {/* Intro */}
        <section className="bg-background px-6 py-20 md:px-12 md:py-24 lg:px-20">
          <div className="mx-auto max-w-3xl">
            <p className="mb-6 text-xs uppercase tracking-widest text-muted-foreground">
              Casos reais · Espaço Coral
            </p>
            <p className="text-xl leading-relaxed text-foreground md:text-2xl md:leading-relaxed">
              Cada celebração deixa uma história. Reunimos aqui os bastidores de
              eventos reais realizados no espaço, com relatos, fotos e os detalhes
              que fizeram o dia acontecer, para você imaginar o seu.
            </p>
          </div>
        </section>

        {/* Grid de cases */}
        <section className="bg-background px-6 pb-20 md:px-12 md:pb-28 lg:px-20 lg:pb-32">
          <div className="mx-auto max-w-6xl">
            {cases.length === 0 ? (
              <div className="border border-dashed border-border bg-secondary/30 p-12 text-center">
                <p className="text-base text-muted-foreground">
                  Em breve, os bastidores dos eventos realizados no Espaço Coral.
                </p>
                <p className="mt-2 text-sm text-muted-foreground/70">
                  Enquanto isso, fale com a nossa equipe pelo WhatsApp para
                  planejar o seu evento.
                </p>
              </div>
            ) : (
              <ul className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                {cases.map((item) => (
                  <li key={item.slug}>
                    <CaseStudyCard item={item} />
                  </li>
                ))}
              </ul>
            )}
          </div>
        </section>

        <CtaSection />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
