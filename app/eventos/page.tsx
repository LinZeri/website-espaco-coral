import type { Metadata } from "next";
import dynamic from "next/dynamic";
import Link from "next/link";
import Image from "next/image";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { WhatsAppButton } from "@/components/layout/whatsapp-button";
import { PageHero } from "@/components/sections/page-hero";
import { JsonLd } from "@/components/seo/json-ld";
import { eventosHubSchema } from "@/lib/schema";

const StatsSection = dynamic(() =>
  import("@/components/sections/stats-section").then((m) => m.StatsSection)
);
const TestimonialsSection = dynamic(() =>
  import("@/components/sections/testimonials-section").then(
    (m) => m.TestimonialsSection
  )
);
const CtaSection = dynamic(() =>
  import("@/components/sections/cta-section").then((m) => m.CtaSection)
);

export const metadata: Metadata = {
  title: "Casamentos, 15 Anos e Eventos Corporativos em Batatais",
  description:
    "Casamentos, festas de 15 anos, eventos corporativos e celebrações familiares em Batatais, SP. Conheça os tipos de eventos no Espaço Coral.",
  alternates: { canonical: "https://coraleventos.com.br/eventos" },
  openGraph: {
    title: "Tipos de Eventos no Espaço Coral em Batatais, SP",
    description:
      "Casamentos, 15 anos, eventos corporativos e celebrações em 12.000 m² em Batatais, SP.",
    url: "https://coraleventos.com.br/eventos",
    images: [
      {
        url: "/og/eventos.jpg",
        width: 1200,
        height: 630,
        alt: "Salão do Espaço Coral decorado com flores em Batatais, SP",
      },
    ],
  },
};

const SCHEMA = eventosHubSchema([
  { name: "Casamentos", url: "/eventos/casamentos" },
  { name: "Festas de 15 Anos", url: "/eventos/15-anos" },
  { name: "Eventos Corporativos", url: "/eventos/corporativo" },
]);

const eventTypes = [
  {
    title: "Casamentos",
    subtitle: "O cenário perfeito para o dia mais importante",
    image: "/images/scenes/casamentos/casamento-arco-floral.webp",
    alt: "Cerimônia de casamento com arco floral no Espaço Coral em Batatais",
    href: "/eventos/casamentos",
  },
  {
    title: "Festas de 15 Anos",
    subtitle: "Exclusividade e encanto para a debutante",
    image: "/images/scenes/casamentos/salao-decorado.webp",
    alt: "Salão decorado para festa de 15 anos no Espaço Coral",
    href: "/eventos/15-anos",
  },
  {
    title: "Eventos Corporativos",
    subtitle: "Estrutura profissional para sua empresa",
    image: "/images/scenes/salao/salao-panoramica.webp",
    alt: "Salão panorâmico do Espaço Coral para eventos corporativos em Batatais",
    href: "/eventos/corporativo",
  },
];

export default function EventosPage() {
  return (
    <>
      <JsonLd data={SCHEMA} />
      <Header />
      <main>
        <PageHero
          title="Eventos"
          subtitle="Espaço Coral em Batatais, SP"
          imageSrc="/images/scenes/salao/salao-mesa-flores.webp"
          imageAlt="Salão do Espaço Coral decorado com flores para evento em Batatais"
        />

        {/* Intro */}
        <section className="bg-background px-6 py-20 md:px-12 md:py-28 lg:px-20 lg:py-32">
          <div className="mx-auto max-w-2xl text-center">
            <p className="mb-6 text-xs uppercase tracking-widest text-muted-foreground">
              Batatais, São Paulo
            </p>
            <p className="text-2xl leading-relaxed text-foreground md:text-3xl">
              Do casamento dos sonhos à confraternização corporativa, o Espaço
              Coral oferece estrutura completa e ambientes sofisticados para cada
              ocasião especial.
            </p>
          </div>
        </section>

        {/* Event Type Cards */}
        <section className="bg-background px-6 pb-24 md:px-12 md:pb-32 lg:px-20 lg:pb-40">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {eventTypes.map((event) => (
              <Link key={event.href} href={event.href} className="group">
                <div className="relative mb-6 aspect-[3/4] overflow-hidden rounded-2xl">
                  <Image
                    src={event.image}
                    alt={event.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-foreground/20 transition-colors duration-300 group-hover:bg-foreground/10" />
                </div>
                <p className="mb-2 text-xs uppercase tracking-widest text-muted-foreground">
                  {event.subtitle}
                </p>
                <h2 className="font-display text-2xl font-normal text-foreground transition-colors duration-200 group-hover:text-gold">
                  {event.title}{" "}
                  <span className="opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                    →
                  </span>
                </h2>
              </Link>
            ))}
          </div>
        </section>

        <StatsSection />
        <TestimonialsSection />
        <CtaSection />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
