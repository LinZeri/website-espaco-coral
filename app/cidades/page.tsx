import type { Metadata } from "next";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { WhatsAppButton } from "@/components/layout/whatsapp-button";
import { PageHero } from "@/components/sections/page-hero";
import { JsonLd } from "@/components/seo/json-ld";
import { cidadesHubSchema } from "@/lib/schema";

const CtaSection = dynamic(() =>
  import("@/components/sections/cta-section").then((m) => m.CtaSection)
);

export const metadata: Metadata = {
  title: "Cidades Atendidas: Ribeirão Preto e Franca",
  description:
    "O Espaço Coral, em Batatais, SP, recebe casamentos, festas de 15 anos e eventos corporativos de Ribeirão Preto, Franca, Sertãozinho, Brodowski e região.",
  alternates: { canonical: "https://coraleventos.com.br/cidades" },
  openGraph: {
    title: "Cidades Atendidas pelo Espaço Coral | Batatais, SP",
    description:
      "Estrutura premium em Batatais para casamentos e eventos de toda a região: Ribeirão Preto, Franca, Sertãozinho, Brodowski e mais.",
    url: "https://coraleventos.com.br/cidades",
    images: [
      {
        url: "/images/scenes/fachada/fachada-entardecer.webp",
        width: 1200,
        height: 630,
        alt: "Fachada do Espaço Coral em Batatais SP ao entardecer",
      },
    ],
  },
};

const CITIES = [
  {
    name: "Ribeirão Preto",
    href: "/cidades/ribeirao-preto",
    distance: "70 km · ~50 min pela Anhanguera (SP-330)",
    description:
      "Para noivas e famílias de Ribeirão Preto que buscam área verde, cerimônia ao céu aberto e estrutura completa fora da capital regional.",
    imageSrc: "/images/scenes/cerimonia/cerimonia-arco.webp",
    imageAlt:
      "Cerimônia ao ar livre com arco floral no Espaço Coral, opção para noivas de Ribeirão Preto",
  },
  {
    name: "Franca",
    href: "/cidades/franca",
    distance: "95 km · ~1h15 pela SP-345",
    description:
      "Para famílias de Franca que querem celebrar em grande estilo, com salão climatizado para 320 convidados e ambientes sem aperto.",
    imageSrc: "/images/scenes/salao/salao-panoramica.webp",
    imageAlt:
      "Vista panorâmica do salão do Espaço Coral, espaço para eventos que atende Franca, SP",
  },
];

const OTHER_CITIES = ["Sertãozinho", "Brodowski", "Altinópolis", "Cravinhos"];

const SCHEMA = cidadesHubSchema(
  CITIES.map((city) => ({ name: city.name, url: city.href }))
);

export default function CidadesPage() {
  return (
    <>
      <JsonLd data={SCHEMA} />
      <Header />
      <main>
        <PageHero
          title="Cidades atendidas"
          subtitle="Batatais, no centro da região de Ribeirão Preto e Franca"
          imageSrc="/images/scenes/fachada/fachada-entardecer.webp"
          imageAlt="Fachada do Espaço Coral em Batatais ao entardecer, espaço para eventos da região"
        />

        {/* Intro */}
        <section className="bg-background px-6 py-20 md:px-12 md:py-28 lg:px-20 lg:py-32">
          <div className="mx-auto max-w-3xl">
            <p className="mb-6 text-xs uppercase tracking-widest text-muted-foreground">
              Batatais, SP · Interior de São Paulo
            </p>
            <h2 className="font-display mb-8 text-4xl font-normal tracking-tight text-foreground md:text-5xl">
              Um espaço em Batatais, convidados da região inteira
            </h2>
            <p className="text-lg leading-relaxed text-muted-foreground md:text-xl">
              O Espaço Coral fica em Batatais, próximo a uma das principais
              avenidas da cidade e com acesso direto pelas rodovias que ligam
              Ribeirão Preto, Franca e as cidades vizinhas. Os 12.000 m² de
              estrutura, com cerimônia ao céu aberto e salão climatizado para
              320 convidados, recebem eventos de toda a região.
            </p>
          </div>
        </section>

        {/* Cards de cidades */}
        <section className="bg-background px-6 pb-20 md:px-12 md:pb-28 lg:px-20 lg:pb-32">
          <div className="mx-auto max-w-6xl">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              {CITIES.map((city) => (
                <Link
                  key={city.href}
                  href={city.href}
                  className="group block overflow-hidden rounded-2xl border border-border bg-secondary/20 transition-colors hover:border-gold"
                >
                  <div className="relative aspect-[16/9] overflow-hidden">
                    <Image
                      src={city.imageSrc}
                      alt={city.imageAlt}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-8">
                    <p className="mb-3 text-xs uppercase tracking-widest text-gold">
                      {city.distance}
                    </p>
                    <h3 className="font-display mb-4 text-3xl font-normal tracking-tight text-foreground">
                      {city.name}
                    </h3>
                    <p className="mb-6 text-base leading-relaxed text-muted-foreground">
                      {city.description}
                    </p>
                    <span className="inline-flex items-center gap-2 text-sm font-medium text-foreground transition-colors group-hover:text-gold">
                      Ver página de {city.name}
                      <ArrowRight size={16} />
                    </span>
                  </div>
                </Link>
              ))}
            </div>

            <p className="mt-12 text-base leading-relaxed text-muted-foreground">
              Também recebemos com frequência eventos de{" "}
              {OTHER_CITIES.join(", ")} e de outras cidades do interior de São
              Paulo. Se a sua cidade não está na lista, fale com a gente pelo
              WhatsApp: a logística até Batatais costuma ser mais simples do que
              parece.
            </p>
          </div>
        </section>

        <CtaSection />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
