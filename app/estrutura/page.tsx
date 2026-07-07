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
import { estruturaSchema } from "@/lib/schema";

const StatsSection = dynamic(() =>
  import("@/components/sections/stats-section").then((m) => m.StatsSection)
);
const CtaSection = dynamic(() =>
  import("@/components/sections/cta-section").then((m) => m.CtaSection)
);

export const metadata: Metadata = {
  title: "Estrutura: 12.000 m² em Batatais, SP",
  description:
    "Conheça a estrutura do Espaço Coral: 12.000 m², 320 convidados, cerimônia ao ar livre, sala da noiva, espaço kids, climatização, gerador, estacionamento orientado.",
  alternates: { canonical: "https://coraleventos.com.br/estrutura" },
  openGraph: {
    title: "Estrutura do Espaço Coral: 12.000 m² em Batatais, SP",
    description:
      "Salão climatizado, cerimônia ao céu aberto, sala privativa, espaço kids e muito mais em 12.000 m² em Batatais.",
    url: "https://coraleventos.com.br/estrutura",
    images: [
      {
        url: "/og/estrutura.jpg",
        width: 1200,
        height: 630,
        alt: "Vista panorâmica do salão do Espaço Coral em Batatais, SP",
      },
    ],
  },
};

const ambientes = [
  {
    title: "Salão Principal",
    description:
      "Ambiente climatizado com capacidade para até 320 convidados sentados. Iluminação profissional, sistema de som ambiente e TVs para tornar seu evento impecável.",
    image: "/images/scenes/salao/salao-mesa.webp",
    alt: "Salão principal do Espaço Coral montado para evento",
  },
  {
    title: "Cerimônia ao Céu Aberto",
    description:
      "Área verde exclusiva para cerimônias ao ar livre. O cenário natural, aliado à iluminação e ao espaço generoso, cria o pano de fundo perfeito para o momento mais emocionante da festa.",
    image: "/images/scenes/cerimonia/cerimonia-arco.webp",
    alt: "Área de cerimônia ao ar livre com arco floral no Espaço Coral",
  },
  {
    title: "Sala Privativa",
    description:
      "Espaço exclusivo para a homenageada, noiva ou debutante. Conta com cadeira de maquiagem profissional, banheiro e chuveiro privativos para que ela se prepare com total conforto e privacidade.",
    image: "/images/scenes/entrada/entrada-decorada.webp",
    alt: "Entrada decorada do Espaço Coral",
  },
  {
    title: "Espaço Kids",
    description:
      "Área dedicada ao entretenimento infantil, supervisionada por uma monitora profissional durante todo o evento. Os pais aproveitam a festa com tranquilidade enquanto os pequenos se divertem com segurança.",
    image: "/images/scenes/cerimonia/cerimonia-palmeiras.webp",
    alt: "Área verde do Espaço Coral entre palmeiras",
  },
  {
    title: "Varanda Panorâmica",
    description:
      "Espaço ao ar livre elevado com vista para o jardim e a área de eventos. Ideal para momentos de descanso e conversas durante a festa.",
    image: "/images/scenes/terraco/terraco-noite.webp",
    alt: "Varanda panorâmica do Espaço Coral à noite",
  },
  {
    title: "Estacionamento",
    description:
      "Estacionamento com capacidade para 40 veículos, com orientadores de vagas durante todo o evento. Acesso fácil e sem estresse para seus convidados.",
    image: "/images/scenes/fachada/fachada-dia.webp",
    alt: "Fachada e estacionamento do Espaço Coral durante o dia",
  },
];

const equipamentos = [
  { categoria: "Mobiliário", itens: ["Mesas para até 320 convidados", "Cadeiras para todos os convidados", "Mesa de bolo exclusiva", "Vários aparadores decorativos"] },
  { categoria: "Alimentação & Bebidas", itens: ["Cozinha completa equipada", "8 cervejeiras industriais", "Área de buffet"] },
  { categoria: "Tecnologia", itens: ["Sistema de som ambiente profissional", "Múltiplas TVs no salão", "Iluminação controlável", "Gerador de energia (backup)"] },
  { categoria: "Conforto", itens: ["Climatização no ambiente interno", "Banheiros masculino, feminino e PCD", "Camareira nos banheiros durante o evento", "Banheiros separados para o staff"] },
  { categoria: "Serviços Inclusos", itens: ["Orientadores de estacionamento", "Monitora no espaço kids", "Camareira durante todo o evento"] },
];

export default function EstruturaPage() {
  return (
    <>
      <JsonLd data={estruturaSchema()} />
      <Header />
      <main>
        <PageHero
          title="Nossa Estrutura"
          subtitle="12.000 m² para o seu evento"
          imageSrc="/images/scenes/salao/salao-panoramica.webp"
          imageAlt="Vista panorâmica do salão do Espaço Coral em Batatais SP"
        />

        <StatsSection />

        {/* Intro */}
        <section className="bg-background px-6 py-20 md:px-12 md:py-28 lg:px-20 lg:py-32">
          <div className="mx-auto max-w-3xl text-center">
            <p className="mb-6 text-xs uppercase tracking-widest text-muted-foreground">
              Batatais, São Paulo
            </p>
            <p className="text-2xl leading-relaxed text-foreground md:text-3xl">
              Com 12.000 m² de área total e capacidade para 320 convidados, o
              Espaço Coral foi projetado para que cada evento seja realizado com
              o mais alto padrão, da estrutura física ao serviço oferecido.
            </p>
          </div>
        </section>

        {/* Ambientes */}
        <section className="bg-background px-6 pb-20 md:px-12 md:pb-28 lg:px-20 lg:pb-32">
          <div className="mb-16 border-t border-border pt-16">
            <p className="text-xs uppercase tracking-widest text-muted-foreground">
              Ambientes
            </p>
            <h2 className="font-display mt-4 text-4xl font-normal tracking-tight text-foreground md:text-5xl">
              Conheça os Espaços
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {ambientes.map((ambiente) => (
              <div key={ambiente.title} className="group">
                <div className="relative mb-5 aspect-[4/3] overflow-hidden rounded-2xl">
                  <Image
                    src={ambiente.image}
                    alt={ambiente.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <h3 className="mb-3 text-lg font-semibold text-foreground">
                  {ambiente.title}
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {ambiente.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Mobiliário e Equipamentos */}
        <section className="bg-foreground px-6 py-20 md:px-12 md:py-28 lg:px-20 lg:py-32">
          <div className="mb-16">
            <p className="text-xs uppercase tracking-widest text-gold">
              Inclusos no espaço
            </p>
            <h2 className="font-display mt-4 text-4xl font-normal tracking-tight text-white md:text-5xl">
              Mobiliário e Equipamentos
            </h2>
            <p className="mt-4 max-w-xl text-base text-white/60">
              Tudo que está listado abaixo faz parte da estrutura do Espaço Coral
              disponível para o seu evento sem custo adicional.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {equipamentos.map((grupo) => (
              <div key={grupo.categoria} className="border border-white/10 p-6">
                <p className="mb-4 text-xs uppercase tracking-widest text-gold">
                  {grupo.categoria}
                </p>
                <ul className="space-y-2">
                  {grupo.itens.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm text-white/70">
                      <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-gold" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-12">
            <Link
              href="/estrutura/mobiliario"
              className="inline-flex items-center gap-2 border border-white/20 px-8 py-4 text-sm font-medium tracking-wide text-white transition-colors duration-200 hover:border-gold hover:text-gold"
            >
              Ver mobiliário completo
              <ArrowRight size={16} />
            </Link>
          </div>
        </section>

        {/* Imagem final + texto */}
        <section className="bg-background px-6 py-20 md:px-12 md:py-28 lg:px-20 lg:py-32">
          <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2 md:gap-16 lg:gap-24">
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
              <Image
                src="/images/scenes/salao/salao-mesa-flores.webp"
                alt="Salão do Espaço Coral decorado com flores para casamento em Batatais"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
            <div>
              <p className="mb-4 text-xs uppercase tracking-widest text-gold">
                Venha conhecer
              </p>
              <h2 className="font-display mb-6 text-4xl font-normal tracking-tight text-foreground md:text-5xl">
                Agende uma visita sem compromisso
              </h2>
              <p className="text-base leading-relaxed text-muted-foreground">
                Nenhuma foto faz jus à experiência de visitar o Espaço Coral
                pessoalmente. Entre em contato pelo WhatsApp para agendar seu horário
                de visita. Será um prazer mostrar cada detalhe do nosso espaço.
              </p>
            </div>
          </div>
        </section>

        <CtaSection />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
