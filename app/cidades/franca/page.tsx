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
  title: "Espaço para Casamentos e Eventos perto de Franca, SP | Espaço Coral",
  description:
    "A 95 km de Franca, o Espaço Coral oferece estrutura premium para casamentos e eventos em Batatais: 12.000 m², cerimônia ao céu aberto, 320 convidados.",
  keywords: [
    "espaço para casamento perto de Franca",
    "salão de festas próximo a Franca SP",
    "casamento interior SP Franca",
    "espaço para eventos Franca",
  ],
  alternates: {
    canonical: "https://coraleventos.com.br/cidades/franca",
  },
  openGraph: {
    title:
      "Espaço para Casamentos e Eventos perto de Franca, SP | Espaço Coral",
    description:
      "A 95 km de Franca, em Batatais: estrutura premium, cerimônia ao céu aberto e capacidade para 320 convidados.",
    url: "https://coraleventos.com.br/cidades/franca",
    images: [
      {
        url: "/og/franca.jpg",
        width: 1200,
        height: 630,
        alt: "Espaço Coral em Batatais, espaço para eventos a 95 km de Franca, SP",
      },
    ],
  },
};

const FAQS: FaqItem[] = [
  {
    question: "Qual é a distância entre Franca e o Espaço Coral?",
    answer:
      "São cerca de 95 km até Batatais. O percurso mais comum é pela Rodovia Cândido Portinari (SP-345), com tempo médio de 1h15min em ritmo confortável. Boa parte do trajeto é em pista dupla, e o trecho final dá acesso direto a Batatais.",
  },
  {
    question:
      "Por que famílias de Franca buscam espaços de eventos em Batatais?",
    answer:
      "Batatais oferece a combinação de proximidade geográfica e um perfil de espaço diferente: o Espaço Coral entrega 12.000 m² com cerimônia ao céu aberto, área verde e sala privativa da noiva, uma estrutura pensada para receber sem aperto, em um endereço a pouco mais de uma hora do centro de Franca.",
  },
  {
    question: "Há boas opções de hospedagem em Batatais para os convidados?",
    answer:
      "Sim. Batatais conta com hotéis e pousadas que atendem grupos familiares e amigos próximos vindos de Franca. Para eventos noturnos, hospedar pelo menos parte dos convidados na cidade evita a viagem de volta na madrugada e prolonga a celebração.",
  },
  {
    question: "Posso contratar fornecedores de Franca para o evento?",
    answer:
      "Sim. O Espaço Coral é livre: buffet, decoração, cerimonial, DJ e fotografia ficam por conta do casal ou da família. A estrutura interna do espaço (cozinha completa, 8 cervejeiras, banheiros para staff e acesso de carga) facilita a operação para fornecedores que vêm de Franca ou de qualquer cidade da região.",
  },
  {
    question: "O Espaço Coral atende eventos corporativos vindos de Franca?",
    answer:
      "Sim. Além de casamentos e festas de 15 anos, o espaço recebe confraternizações, lançamentos e eventos corporativos. A capacidade de 320 pessoas, o estacionamento orientado para 40 carros e o gerador de energia próprio dão suporte a eventos empresariais de médio porte.",
  },
];

const SCHEMA = cityPageSchema(
  "/cidades/franca",
  FAQS,
  [
    { name: "Início", url: "/" },
    { name: "Cidades atendidas", url: "/" },
    { name: "Franca", url: "/cidades/franca" },
  ]
);

const WHATSAPP_URL =
  "https://wa.me/5516991294178?text=Ol%C3%A1!%20Estou%20em%20Franca%20e%20gostaria%20de%20conhecer%20o%20Espa%C3%A7o%20Coral.";

export default function FrancaPage() {
  return (
    <>
      <JsonLd data={SCHEMA} />
      <Header />
      <main>
        <PageHero
          title="Espaço para Eventos para Franca"
          subtitle="Espaço Coral, a 95 km, em Batatais"
          imageSrc="/images/spaces/fachada-noite.webp"
          imageAlt="Fachada do Espaço Coral à noite em Batatais, espaço para eventos a 95 km de Franca"
        />

        {/* Intro: distância e tempo */}
        <section className="bg-background px-6 py-20 md:px-12 md:py-28 lg:px-20 lg:py-32">
          <div className="mx-auto max-w-3xl">
            <p className="mb-6 text-xs uppercase tracking-widest text-muted-foreground">
              Franca · 95 km · ~1h15min
            </p>
            <h2 className="font-display mb-8 text-4xl font-normal tracking-tight text-foreground md:text-5xl">
              A 95 km de Franca, em Batatais
            </h2>
            <p className="text-lg leading-relaxed text-muted-foreground md:text-xl">
              Para quem mora em Franca e procura um endereço diferenciado para
              casar, comemorar 15 anos ou reunir a família, Batatais aparece
              como a opção natural a oeste, pouco mais de uma hora pela
              Rodovia Cândido Portinari (SP-345), trajeto em boa parte
              duplicado e tranquilo.
            </p>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground">
              Em vez de adaptar a celebração a um espaço urbano apertado, o
              Espaço Coral oferece 12.000 m² de área, cerimônia ao céu aberto e
              salão climatizado para até 320 convidados, tudo em um único
              endereço, ao alcance fácil de quem está vindo de Franca.
            </p>
          </div>
        </section>

        {/* Por que escolher */}
        <section className="bg-background px-6 pb-20 md:px-12 md:pb-28 lg:px-20 lg:pb-32">
          <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2 md:gap-16 lg:gap-24">
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl">
              <Image
                src="/images/spaces/cerimonia-palmeiras.webp"
                alt="Cerimônia ao ar livre entre palmeiras no Espaço Coral, opção de espaço próximo a Franca"
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
                Um endereço pensado para celebrações sem aperto
              </h2>
              <p className="mb-4 text-base leading-relaxed text-muted-foreground">
                O perfil de quem vem de Franca costuma ser claro: a família é
                grande, a lista de convidados é longa e o evento precisa de
                ambientes que comportem todo mundo confortavelmente, do almoço
                ao cair da noite. O Espaço Coral foi planejado para esse
                cenário.
              </p>
              <p className="text-base leading-relaxed text-muted-foreground">
                A divisão entre área externa (cerimônia ao céu aberto, paisagismo
                cuidado) e o salão climatizado interno permite que cada
                momento aconteça no espaço certo. A sala privativa da noiva, o
                espaço kids com monitora e os ambientes técnicos completam a
                estrutura para quem espera receber bem em todos os detalhes.
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
                A rota de Franca a Batatais
              </h2>
              <p className="mb-4 text-base leading-relaxed text-muted-foreground">
                A Cândido Portinari (SP-345) é a rota mais usada de Franca em
                direção a Batatais. O trajeto totaliza cerca de 95 km, com
                tempo médio de 1h15min, distância confortável tanto para
                convidados que voltam para casa na mesma noite quanto para
                quem prefere se hospedar e prolongar a celebração.
              </p>
              <p className="mb-4 text-base leading-relaxed text-muted-foreground">
                Em Batatais, hotéis e pousadas no centro e nos arredores do
                espaço acomodam grupos familiares vindos de Franca. Indicamos
                opções no atendimento, conforme o número de convidados que
                pretendem dormir na cidade.
              </p>
              <p className="text-base leading-relaxed text-muted-foreground">
                Já no espaço, o estacionamento orientado para 40 carros, o
                gerador de energia próprio e o espaço kids com monitora
                profissional fazem a diferença em eventos com perfil familiar
                e ninguém precisa se preocupar com logística depois que o
                evento começa.
              </p>
            </div>
            <div className="relative order-1 aspect-[4/5] overflow-hidden rounded-2xl md:order-2">
              <Image
                src="/images/spaces/salao-panoramica.webp"
                alt="Vista panorâmica do salão de eventos do Espaço Coral em Batatais"
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
              Dúvidas comuns de quem está em Franca
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
        <section className="bg-foreground px-6 py-20 md:px-12 md:py-28 lg:px-20 lg:py-32">
          <div className="mx-auto max-w-3xl text-center">
            <div className="gold-divider mx-auto mb-10 w-16 opacity-50" />
            <p className="mb-4 text-xs uppercase tracking-widest text-gold">
              Próximo passo
            </p>
            <h2 className="font-display mb-6 text-4xl font-normal tracking-tight text-white md:text-5xl">
              Vamos conversar sobre a sua festa
            </h2>
            <p className="mx-auto max-w-xl text-base leading-relaxed text-white/60">
              Conte para a gente a data, o tipo de evento e o número aproximado
              de convidados. Em pouco tempo, você sabe se a data está livre e
              recebe o orçamento detalhado pelo WhatsApp {CONTACT.phoneDisplay}.
            </p>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-10 inline-flex items-center gap-2 bg-gold px-8 py-4 text-sm font-medium tracking-wide text-white transition-colors duration-200 hover:bg-gold-dark"
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
