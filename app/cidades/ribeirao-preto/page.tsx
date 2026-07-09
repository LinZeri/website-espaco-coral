import type { Metadata } from "next";
import dynamic from "next/dynamic";
import Image from "next/image";
import { MessageCircle } from "lucide-react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { WhatsAppButton } from "@/components/layout/whatsapp-button";
import { PageHero } from "@/components/sections/page-hero";
import { JsonLd } from "@/components/seo/json-ld";
import { cityPageSchema, type FaqItem } from "@/lib/schema";
import { CONTACT } from "@/lib/seo-config";

const TestimonialsSection = dynamic(() =>
  import("@/components/sections/testimonials-section").then(
    (m) => m.TestimonialsSection
  )
);
const CtaSection = dynamic(() =>
  import("@/components/sections/cta-section").then((m) => m.CtaSection)
);

export const metadata: Metadata = {
  title: "Espaço para Casamentos e Eventos perto de Ribeirão Preto",
  description:
    "A 70 km de Ribeirão Preto, o Espaço Coral é a escolha de noivas e famílias que buscam estrutura premium fora da capital regional. Cerimônia ao ar livre, 320 convidados.",
  keywords: [
    "espaço para casamento perto de Ribeirão Preto",
    "salão de festas próximo a Ribeirão Preto",
    "casamento interior SP perto de Ribeirão Preto",
    "espaço para eventos Ribeirão Preto",
  ],
  alternates: {
    canonical: "https://coraleventos.com.br/cidades/ribeirao-preto",
  },
  openGraph: {
    title:
      "Espaço para Casamentos e Eventos perto de Ribeirão Preto | Espaço Coral",
    description:
      "A 70 km de Ribeirão Preto, em Batatais: estrutura premium, cerimônia ao céu aberto e capacidade para 320 convidados.",
    url: "https://coraleventos.com.br/cidades/ribeirao-preto",
    images: [
      {
        url: "/og/ribeirao-preto.jpg",
        width: 1200,
        height: 630,
        alt: "Espaço Coral em Batatais, espaço para eventos a 70 km de Ribeirão Preto",
      },
    ],
  },
};

const FAQS: FaqItem[] = [
  {
    question: "A que distância fica o Espaço Coral de Ribeirão Preto?",
    answer:
      "O Espaço Coral fica em Batatais, a aproximadamente 70 km do centro de Ribeirão Preto. O trajeto leva cerca de 50 minutos pela Rodovia Anhanguera (SP-330), com saída direta para Batatais.",
  },
  {
    question: "Vale a pena fazer um casamento fora de Ribeirão Preto?",
    answer:
      "Para muitas noivas, sim. Em Batatais, é possível encontrar um espaço com 12.000 m² de área, cerimônia ao céu aberto e sala privativa da noiva, uma combinação difícil de obter na capital regional sem extrapolar o orçamento. A viagem curta mantém os convidados próximos sem perder o caráter de destino diferenciado.",
  },
  {
    question:
      "Há hospedagem em Batatais para convidados que vêm de Ribeirão Preto?",
    answer:
      "Sim. Batatais conta com hotéis e pousadas no centro e próximos ao espaço, suficientes para acomodar convidados que preferem não voltar a Ribeirão Preto na mesma noite. Podemos indicar opções no atendimento.",
  },
  {
    question: "O Espaço Coral aceita fornecedores de Ribeirão Preto?",
    answer:
      "Sim. O Espaço Coral é um espaço livre: buffet, decoração, cerimonial, DJ, banda e fotografia ficam por conta do casal. Fornecedores de Ribeirão Preto são bem-vindos e a estrutura interna (cozinha completa, 8 cervejeiras, banheiros para staff) facilita a operação.",
  },
  {
    question: "Quantos convidados o espaço comporta?",
    answer:
      "Até 320 convidados, em salão climatizado, com mesas, cadeiras, mesa de bolo e aparadores inclusos. O estacionamento orientado para 40 carros e o gerador de energia garantem operação tranquila mesmo em eventos grandes.",
  },
];

const SCHEMA = cityPageSchema(
  "/cidades/ribeirao-preto",
  FAQS,
  [
    { name: "Início", url: "/" },
    { name: "Cidades atendidas", url: "/cidades" },
    { name: "Ribeirão Preto", url: "/cidades/ribeirao-preto" },
  ]
);

const WHATSAPP_URL =
  "https://wa.me/5516991294178?text=Ol%C3%A1!%20Estou%20em%20Ribeir%C3%A3o%20Preto%20e%20gostaria%20de%20conhecer%20o%20Espa%C3%A7o%20Coral.";

export default function RibeiraoPretoPage() {
  return (
    <>
      <JsonLd data={SCHEMA} />
      <Header />
      <main>
        <PageHero
          title="Espaço para Eventos para Ribeirão Preto"
          subtitle="Espaço Coral, a 70 km, em Batatais"
          imageSrc="/images/scenes/fachada/fachada-entardecer.webp"
          imageAlt="Fachada do Espaço Coral em Batatais ao entardecer, espaço para eventos a 70 km de Ribeirão Preto"
        />

        {/* Intro: distância e tempo */}
        <section className="bg-background px-6 py-20 md:px-12 md:py-28 lg:px-20 lg:py-32">
          <div className="mx-auto max-w-3xl">
            <p className="mb-6 text-xs uppercase tracking-widest text-muted-foreground">
              Ribeirão Preto · 70 km · ~50 min
            </p>
            <h2 className="font-display mb-8 text-4xl font-normal tracking-tight text-foreground md:text-5xl">
              A 70 km de Ribeirão Preto, em Batatais
            </h2>
            <p className="text-lg leading-relaxed text-muted-foreground md:text-xl">
              O Espaço Coral fica a cerca de 50 minutos do centro de Ribeirão
              Preto pela Rodovia Anhanguera (SP-330). É perto o suficiente para
              os convidados chegarem com tranquilidade, e distante o bastante
              para entregar o cenário, o silêncio e a área verde que dificilmente
              cabem em um espaço dentro da capital regional.
            </p>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground">
              Em Batatais, o casal recebe uma estrutura completa em 12.000 m²:
              cerimônia ao céu aberto, salão climatizado para 320 convidados e
              sala privativa da noiva, sem precisar abrir mão da proximidade
              com Ribeirão Preto.
            </p>
          </div>
        </section>

        {/* Por que escolher */}
        <section className="bg-background px-6 pb-20 md:px-12 md:pb-28 lg:px-20 lg:pb-32">
          <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2 md:gap-16 lg:gap-24">
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl">
              <Image
                src="/images/scenes/cerimonia/cerimonia-arco.webp"
                alt="Cerimônia ao ar livre com arco floral no Espaço Coral, opção para noivas de Ribeirão Preto"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
            <div>
              <p className="mb-4 text-xs uppercase tracking-widest text-gold">
                Diferencial
              </p>
              <h2 className="font-display mb-6 text-4xl font-normal tracking-tight text-foreground md:text-5xl">
                Por que noivas de Ribeirão Preto escolhem o Espaço Coral
              </h2>
              <p className="mb-4 text-base leading-relaxed text-muted-foreground">
                A oferta de espaços para casamento em Ribeirão Preto é grande,
                mas pouco do que existe na cidade entrega área verde com
                cerimônia ao céu aberto, sala privativa da noiva com chuveiro e
                12.000 m² de terreno em um único endereço. O Espaço Coral foi
                projetado exatamente para preencher esse espaço.
              </p>
              <p className="text-base leading-relaxed text-muted-foreground">
                O resultado é um casamento com cara de destino: fotos
                inesquecíveis, espaço para circular, ambientes separados para
                cerimônia e festa, sem custo logístico de um destination wedding
                de verdade. Para muitas noivas de Ribeirão Preto, é o equilíbrio
                certo entre exclusividade e praticidade.
              </p>
            </div>
          </div>
        </section>

        {/* Logística */}
        <section className="bg-secondary/30 px-6 py-20 md:px-12 md:py-28 lg:px-20 lg:py-32">
          <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2 md:gap-16 lg:gap-24">
            <div className="order-2 md:order-1">
              <p className="mb-4 text-xs uppercase tracking-widest text-gold">
                Logística
              </p>
              <h2 className="font-display mb-6 text-4xl font-normal tracking-tight text-foreground md:text-5xl">
                Como chegar e onde se hospedar
              </h2>
              <p className="mb-4 text-base leading-relaxed text-muted-foreground">
                A Anhanguera é uma rodovia de duplicação contínua, com pedágios
                eletrônicos e iluminação no trecho próximo a Batatais. Saindo de
                Ribeirão Preto, são cerca de 50 minutos em ritmo confortável até
                o Espaço Coral, com acesso direto pela cidade.
              </p>
              <p className="mb-4 text-base leading-relaxed text-muted-foreground">
                Para os convidados que preferem não voltar na mesma noite,
                Batatais tem hotéis e pousadas no centro e nas imediações do
                espaço, opções suficientes para acomodar grupos familiares e
                amigos próximos. Indicamos as alternativas durante o atendimento.
              </p>
              <p className="text-base leading-relaxed text-muted-foreground">
                No próprio espaço, o estacionamento orientado para 40 carros e o
                gerador de energia próprio garantem que a noite transcorra sem
                imprevistos, mesmo em eventos com grande circulação.
              </p>
            </div>
            <div className="relative order-1 aspect-[4/5] overflow-hidden rounded-2xl md:order-2">
              <Image
                src="/images/scenes/fachada/fachada-noite.webp"
                alt="Fachada iluminada do Espaço Coral à noite em Batatais"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="bg-background px-6 py-20 md:px-12 md:py-28 lg:px-20 lg:py-32">
          <div className="mx-auto max-w-3xl">
            <p className="mb-4 text-xs uppercase tracking-widest text-gold">
              Perguntas frequentes
            </p>
            <h2 className="font-display mb-12 text-4xl font-normal tracking-tight text-foreground md:text-5xl">
              Dúvidas comuns de noivas de Ribeirão Preto
            </h2>
            <div className="space-y-10">
              {FAQS.map((faq) => (
                <div key={faq.question}>
                  <h3 className="mb-3 text-xl font-medium text-foreground md:text-2xl">
                    {faq.question}
                  </h3>
                  <p className="text-base leading-relaxed text-muted-foreground">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA WhatsApp dedicado */}
        <section className="bg-sand px-6 py-20 md:px-12 md:py-28 lg:px-20 lg:py-32">
          <div className="mx-auto max-w-3xl text-center">
            <div className="gold-divider mx-auto mb-10 w-16 opacity-50" />
            <p className="mb-4 text-xs uppercase tracking-widest text-gold-dark">
              Próximo passo
            </p>
            <h2 className="font-display mb-6 text-4xl font-normal tracking-tight text-foreground md:text-5xl">
              Vamos conversar sobre o seu evento
            </h2>
            <p className="mx-auto max-w-xl text-base leading-relaxed text-foreground/60">
              Conte para a gente a data, o tipo de festa e o número aproximado
              de convidados. Em pouco tempo, você sabe se a data está livre e
              recebe o orçamento detalhado pelo WhatsApp {CONTACT.phoneDisplay}.
            </p>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-10 inline-flex items-center gap-2 bg-gold px-8 py-4 text-sm font-medium tracking-wide text-foreground transition-colors duration-200 hover:bg-gold-light"
            >
              <MessageCircle size={16} />
              Falar pelo WhatsApp
            </a>
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
