import type { Metadata } from "next";
import dynamic from "next/dynamic";
import Image from "next/image";
import { MessageCircle, MapPin, Star } from "lucide-react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { WhatsAppButton } from "@/components/layout/whatsapp-button";
import { PageHero } from "@/components/sections/page-hero";
import { JsonLd } from "@/components/seo/json-ld";
import { sobreSchema } from "@/lib/schema";

const TestimonialsSection = dynamic(() =>
  import("@/components/sections/testimonials-section").then(
    (m) => m.TestimonialsSection
  )
);
const CtaSection = dynamic(() =>
  import("@/components/sections/cta-section").then((m) => m.CtaSection)
);

export const metadata: Metadata = {
  title: "Sobre o Espaço de Eventos em Batatais, SP",
  description:
    "Conheça o Espaço Coral, espaço de eventos premium em Batatais, SP. 12.000 m², capacidade para 320 convidados, 40 avaliações 5 estrelas no Google. Inaugurado em 2024.",
  keywords: [
    "sobre Espaço Coral",
    "espaço de eventos Batatais",
    "história Espaço Coral",
    "espaço para casamento Batatais",
    "salão de festas premium Batatais",
  ],
  alternates: { canonical: "https://coraleventos.com.br/sobre" },
  openGraph: {
    title: "Sobre o Espaço Coral | Espaço de Eventos em Batatais, SP",
    description:
      "12.000 m² de estrutura premium em Batatais, SP. Inaugurado em 2024 e referência local em casamentos, 15 anos e eventos corporativos com 40 avaliações 5 estrelas.",
    url: "https://coraleventos.com.br/sobre",
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

const WHATSAPP_URL =
  "https://wa.me/5516991294178?text=Ol%C3%A1!%20Gostaria%20de%20conhecer%20o%20Espa%C3%A7o%20Coral.";

const pillars = [
  {
    title: "Estrutura própria",
    description:
      "Os 12.000 m² do Espaço Coral foram pensados desde a concepção para receber celebrações de alto padrão. Salão climatizado, área para cerimônia ao céu aberto, sala privativa da homenageada, espaço kids com monitora e estacionamento orientado para 40 carros.",
  },
  {
    title: "Liberdade de fornecedores",
    description:
      "Não somos buffet. O espaço é o palco: você contrata buffet, decoração, cerimonial, DJ ou banda e fotografia com quem quiser. Essa flexibilidade permite que cada evento tenha a identidade exata da família ou da empresa que o realiza.",
  },
  {
    title: "Atendimento dedicado",
    description:
      "Cada evento é acompanhado por uma equipe própria: orientadores de estacionamento, camareira nos banheiros durante toda a festa e monitora exclusiva no espaço kids. O foco é garantir que anfitriões e convidados aproveitem o evento sem se preocupar com a operação.",
  },
];

export default function SobrePage() {
  return (
    <>
      <JsonLd data={sobreSchema()} />
      <Header />
      <main>
        <PageHero
          title="Sobre o Espaço Coral"
          subtitle="Quem somos · Batatais, SP"
          imageSrc="/images/scenes/fachada/fachada-entardecer.webp"
          imageAlt="Fachada do Espaço Coral ao entardecer em Batatais SP"
        />

        {/* Quem somos */}
        <section className="bg-background px-6 py-20 md:px-12 md:py-28 lg:px-20 lg:py-32">
          <div className="mx-auto max-w-3xl">
            <p className="mb-6 text-xs uppercase tracking-widest text-muted-foreground">
              Quem somos
            </p>
            <h2 className="font-display mb-8 text-4xl font-normal tracking-tight text-foreground md:text-5xl">
              Um espaço pensado para celebrações inesquecíveis
            </h2>
            <p className="mb-6 text-xl leading-relaxed text-foreground md:text-2xl md:leading-relaxed">
              O <strong>Espaço Coral</strong> é um espaço para festas e eventos
              de alto padrão, localizado na <strong>Rua Matheus Marinelli, 18,
              Jardim Elena, Batatais, SP</strong>, a poucos minutos de Ribeirão
              Preto e Franca.
            </p>
            <p className="mb-6 text-base leading-relaxed text-muted-foreground">
              Inaugurado em <strong>outubro de 2024</strong>, o espaço nasceu de
              um propósito claro: oferecer uma estrutura que estivesse à altura
              dos momentos mais importantes da vida das famílias da nossa região.
              Cada metro quadrado, cada ambiente e cada serviço foi planejado
              para que casamentos, festas de 15 anos e eventos corporativos
              aconteçam com sofisticação, conforto e tranquilidade.
            </p>
            <p className="text-base leading-relaxed text-muted-foreground">
              Em pouco tempo de operação, o Espaço Coral se consolidou como uma
              das principais opções de celebração no interior de São Paulo,
              hoje com <strong>40 avaliações no Google e nota máxima de 5
              estrelas</strong>, conquistadas casamento após casamento, festa
              após festa.
            </p>
          </div>
        </section>

        {/* Stats / Trust signals */}
        <section className="bg-secondary/30 px-6 py-16 md:px-12 lg:px-20">
          <div className="mx-auto max-w-5xl">
            <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
              <div className="text-center">
                <p className="font-display text-4xl text-foreground md:text-5xl">
                  12.000
                </p>
                <p className="mt-2 text-xs uppercase tracking-widest text-muted-foreground">
                  m² de área total
                </p>
              </div>
              <div className="text-center">
                <p className="font-display text-4xl text-foreground md:text-5xl">
                  320
                </p>
                <p className="mt-2 text-xs uppercase tracking-widest text-muted-foreground">
                  Convidados sentados
                </p>
              </div>
              <div className="text-center">
                <p className="font-display text-4xl text-foreground md:text-5xl">
                  40
                </p>
                <p className="mt-2 text-xs uppercase tracking-widest text-muted-foreground">
                  Avaliações Google
                </p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center gap-1 font-display text-4xl text-foreground md:text-5xl">
                  5
                  <Star size={28} className="fill-gold text-gold md:size-10" />
                </div>
                <p className="mt-2 text-xs uppercase tracking-widest text-muted-foreground">
                  Nota média
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Pilares / Diferenciais */}
        <section className="bg-background px-6 py-20 md:px-12 md:py-28 lg:px-20 lg:py-32">
          <div className="mx-auto max-w-5xl">
            <div className="mb-16 max-w-2xl">
              <p className="mb-4 text-xs uppercase tracking-widest text-gold">
                Nossos pilares
              </p>
              <h2 className="font-display text-4xl font-normal tracking-tight text-foreground md:text-5xl">
                O que nos diferencia
              </h2>
            </div>

            <div className="grid grid-cols-1 gap-12 md:grid-cols-3 md:gap-10">
              {pillars.map((pillar, idx) => (
                <div key={pillar.title} className="flex flex-col">
                  <p className="font-display text-3xl text-gold">
                    {String(idx + 1).padStart(2, "0")}
                  </p>
                  <div className="gold-divider mb-6 mt-2 w-10 opacity-50" />
                  <h3 className="mb-4 text-lg font-semibold text-foreground">
                    {pillar.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {pillar.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Localização e área de atuação */}
        <section className="bg-foreground px-6 py-20 md:px-12 md:py-28 lg:px-20 lg:py-32">
          <div className="mx-auto grid max-w-5xl grid-cols-1 items-center gap-12 md:grid-cols-2 md:gap-16 lg:gap-24">
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl">
              <Image
                src="/images/scenes/fachada/fachada-noite.webp"
                alt="Fachada do Espaço Coral à noite em Batatais SP"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
            <div>
              <p className="mb-4 text-xs uppercase tracking-widest text-gold">
                Localização
              </p>
              <h2 className="font-display mb-6 text-4xl font-normal tracking-tight text-white md:text-5xl">
                No coração do interior paulista
              </h2>
              <p className="mb-4 text-base leading-relaxed text-white/70">
                Estamos em <strong className="text-white">Batatais, São
                Paulo</strong>, em uma localização privilegiada, próxima a uma
                das principais avenidas da cidade, com fácil acesso pela rodovia
                e estacionamento próprio para os convidados.
              </p>
              <p className="mb-8 text-base leading-relaxed text-white/70">
                Atendemos famílias e empresas de Batatais, Ribeirão Preto,
                Franca, Sertãozinho, Brodowski, Altinópolis, Cravinhos e demais
                municípios do interior de São Paulo que buscam um espaço
                premium fora dos grandes centros.
              </p>
              <div className="flex flex-col items-start gap-4 sm:flex-row">
                <a
                  href="https://maps.app.goo.gl/RRvRvYMonqZWbR1v8"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 border border-white/20 px-6 py-3 text-sm font-medium tracking-wide text-white/80 transition-colors hover:border-white/40 hover:text-white"
                >
                  <MapPin size={16} />
                  Ver no Google Maps
                </a>
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-gold px-6 py-3 text-sm font-medium tracking-wide text-foreground transition-colors hover:bg-gold-light"
                >
                  <MessageCircle size={16} />
                  Agendar visita
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Compromisso */}
        <section className="bg-background px-6 py-20 md:px-12 md:py-28 lg:px-20 lg:py-32">
          <div className="mx-auto max-w-3xl text-center">
            <div className="gold-divider mx-auto mb-10 w-16 opacity-50" />
            <p className="mb-4 text-xs uppercase tracking-widest text-gold">
              Nosso compromisso
            </p>
            <h2 className="font-display mb-6 text-3xl font-normal tracking-tight text-foreground md:text-4xl">
              Cada evento é único, e nós tratamos cada um como tal
            </h2>
            <p className="text-base leading-relaxed text-muted-foreground md:text-lg md:leading-relaxed">
              Receber bem é nossa razão de existir. Por isso, mantemos uma
              equipe dedicada à manutenção do espaço, ao atendimento aos
              clientes e à operação de cada evento. Quando você nos visita pela
              primeira vez, conversa diretamente com quem cuidará da sua festa
              do início ao fim.
            </p>
          </div>
        </section>

        <TestimonialsSection />
        <CtaSection />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
