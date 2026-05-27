import type { Metadata } from "next";
import dynamic from "next/dynamic";
import Image from "next/image";
import { MessageCircle } from "lucide-react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { WhatsAppButton } from "@/components/layout/whatsapp-button";
import { PageHero } from "@/components/sections/page-hero";
import { FaqSection, type FaqItem } from "@/components/sections/faq-section";
import { JsonLd } from "@/components/seo/json-ld";
import { servicePageSchema } from "@/lib/schema";

const CtaSection = dynamic(() =>
  import("@/components/sections/cta-section").then((m) => m.CtaSection)
);

export const metadata: Metadata = {
  title: "Espaço para Eventos Corporativos em Batatais, SP",
  description:
    "Espaço para eventos corporativos em Batatais: confraternizações, formaturas, premiações e lançamentos com estrutura completa para até 320 pessoas. Privacidade total.",
  keywords: [
    "espaço para eventos corporativos Batatais",
    "confraternização empresa Batatais",
    "espaço para eventos corporativos interior SP",
    "formatura Batatais",
    "evento corporativo perto de Ribeirão Preto",
  ],
  alternates: { canonical: "https://coraleventos.com.br/eventos/corporativo" },
  openGraph: {
    title: "Espaço para Eventos Corporativos em Batatais, SP | Espaço Coral",
    description:
      "Confraternizações, formaturas e premiações com estrutura para 320 pessoas em Batatais, SP.",
    url: "https://coraleventos.com.br/eventos/corporativo",
    images: [
      {
        url: "/og/corporativo.jpg",
        width: 1200,
        height: 630,
        alt: "Salão do Espaço Coral montado para evento corporativo em Batatais, SP",
      },
    ],
  },
};

const WHATSAPP_URL =
  "https://wa.me/5516991294178?text=Ol%C3%A1!%20Gostaria%20de%20solicitar%20uma%20proposta%20para%20evento%20corporativo.";

const features = [
  {
    label: "Capacidade",
    value: "até 320 pessoas",
  },
  {
    label: "Climatização",
    value: "Ambiente interno climatizado",
  },
  {
    label: "Audiovisual",
    value: "TVs e sistema de som profissional",
  },
  {
    label: "Estacionamento",
    value: "40 vagas com orientadores",
  },
  {
    label: "Infraestrutura",
    value: "Cozinha completa e 8 cervejeiras",
  },
  {
    label: "Energia",
    value: "Gerador de backup",
  },
];

const faqItems: FaqItem[] = [
  {
    question: "Qual é a capacidade máxima do espaço para eventos corporativos?",
    answer:
      "O salão climatizado acomoda até 320 pessoas em formato de jantar ou recepção. Para palestras e formatos de auditório, a capacidade pode ser ajustada conforme o layout escolhido. A área externa de 12.000 m² permite ainda integração com coquetéis ou ativações ao ar livre.",
  },
  {
    question: "É possível ter exclusividade do espaço para a empresa?",
    answer:
      "Sim. Cada evento corporativo é realizado com exclusividade total: o Espaço Coral não compartilha ambientes com outros grupos durante a sua reserva. Isso garante a privacidade necessária para confraternizações, lançamentos, reuniões executivas ou eventos com clientes estratégicos.",
  },
  {
    question: "O espaço atende formaturas, confraternizações e jantares de gala?",
    answer:
      "Sim. O Espaço Coral recebe formaturas, confraternizações de fim de ano, jantares de premiação, lançamentos de produto, kick-offs e reuniões de equipe ampliadas. A flexibilidade de layout do salão se adapta a cada formato, de mesas redondas para jantar a auditório para palestras.",
  },
  {
    question: "Há estrutura audiovisual para palestras e apresentações?",
    answer:
      "O espaço conta com sistema de som ambiente profissional e TVs instaladas. Para projeções, telões, microfones extras, palco ou tradução simultânea, o ideal é que sua empresa contrate a empresa de audiovisual de preferência ou use nossas indicações. A infraestrutura elétrica do espaço suporta sem dificuldades.",
  },
  {
    question: "Como funciona o estacionamento para colaboradores e convidados?",
    answer:
      "O estacionamento próprio comporta 40 carros com orientadores de vagas durante todo o evento. Para eventos com público maior, sua equipe pode coordenar transporte fretado ou orientar uso de estacionamentos próximos. Banheiros separados para o staff dos fornecedores mantêm a logística organizada.",
  },
  {
    question: "Há espaço de apoio (camarim, sala VIP, sala de espera)?",
    answer:
      "Sim. A sala privativa do espaço, usada como sala da noiva em casamentos, funciona perfeitamente como camarim, sala VIP para palestrantes ou área de apoio executivo em eventos corporativos. Conta com banheiro próprio e chuveiro, garantindo conforto e privacidade.",
  },
  {
    question: "O Espaço Coral oferece buffet ou apenas o local?",
    answer:
      "O Espaço Coral é o local: a empresa contrata o buffet, a decoração, o cerimonial e os demais fornecedores. Essa flexibilidade permite alinhar o evento ao padrão da empresa, ao orçamento aprovado e às restrições alimentares dos participantes. Podemos indicar buffets que atendem regularmente eventos corporativos no espaço.",
  },
  {
    question: "Com quanta antecedência preciso reservar a data?",
    answer:
      "Para confraternizações de fim de ano (novembro a dezembro), recomendamos reservar com 4 a 6 meses de antecedência, dada a alta procura no período. Para outros formatos e épocas, janelas de 30 a 90 dias normalmente têm boa disponibilidade. Solicite uma proposta pelo WhatsApp para verificar a data desejada.",
  },
];

const SCHEMA = servicePageSchema(
  {
    name: "Eventos Corporativos no Espaço Coral",
    description:
      "Espaço para confraternizações, formaturas, premiações e lançamentos em Batatais, SP. Capacidade para 320 pessoas, estrutura completa e privacidade total.",
    serviceType: "Espaço para evento corporativo",
    url: "https://coraleventos.com.br/eventos/corporativo",
    image: "/images/scenes/salao/salao-panoramica.webp",
  },
  [
    { name: "Início", url: "/" },
    { name: "Eventos", url: "/eventos" },
    { name: "Corporativo", url: "/eventos/corporativo" },
  ],
  faqItems
);

export default function CorporativoPage() {
  return (
    <>
      <JsonLd data={SCHEMA} />
      <Header />
      <main>
        <PageHero
          title="Eventos Corporativos em Batatais"
          subtitle="Estrutura profissional para sua empresa"
          imageSrc="/images/scenes/salao/salao-panoramica.webp"
          imageAlt="Salão panorâmico do Espaço Coral para eventos corporativos em Batatais SP"
        />

        {/* Intro */}
        <section className="bg-background px-6 py-20 md:px-12 md:py-28 lg:px-20 lg:py-32">
          <div className="mx-auto max-w-3xl">
            <p className="mb-6 text-xs uppercase tracking-widest text-muted-foreground">
              Eventos Corporativos · Batatais, SP
            </p>
            <p className="text-2xl leading-relaxed text-foreground md:text-3xl lg:text-[2rem] lg:leading-snug">
              O Espaço Coral oferece a estrutura completa que eventos
              corporativos exigem. Confraternizações, formaturas, reuniões de
              alto nível, lançamentos de produto. Tudo com a sofisticação,
              logística e privacidade que a sua empresa merece.
            </p>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground md:text-lg">
              Atendemos empresas de Batatais, Ribeirão Preto, Franca e demais
              cidades da macro-região. O espaço foi pensado para receber
              eventos com 30 a 320 participantes, com flexibilidade de layout
              e infraestrutura para diferentes formatos, do jantar de gala à
              palestra com plateia.
            </p>
          </div>
        </section>

        {/* Formatos atendidos */}
        <section className="bg-secondary/40 px-6 py-20 md:px-12 md:py-28 lg:px-20 lg:py-32">
          <div className="mx-auto max-w-4xl">
            <div className="mb-12 text-center">
              <p className="mb-4 text-xs uppercase tracking-widest text-gold">
                Formatos atendidos
              </p>
              <h2 className="font-display mb-6 text-4xl font-normal tracking-tight text-foreground md:text-5xl">
                Eventos corporativos no Espaço Coral
              </h2>
              <p className="mx-auto max-w-2xl text-base leading-relaxed text-muted-foreground">
                A flexibilidade de layout do salão e a área externa permitem
                acomodar formatos distintos de evento, com a mesma exigência
                de qualidade e privacidade.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {[
                {
                  title: "Confraternização anual",
                  text: "Jantares de fim de ano, premiações internas, eventos de reconhecimento, com clima descontraído e estrutura premium.",
                },
                {
                  title: "Formatura",
                  text: "Cerimônias e jantares de formatura para turmas universitárias e técnicas, com sala de apoio para a comissão organizadora.",
                },
                {
                  title: "Lançamento de produto",
                  text: "Apresentações com clientes, parceiros e imprensa em um ambiente exclusivo, com privacidade total durante o evento.",
                },
                {
                  title: "Convenção de vendas",
                  text: "Eventos de equipe ampliada, kick-offs comerciais, treinamentos e workshops, com flexibilidade para painéis e palestras.",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="border-l-2 border-gold bg-background p-6"
                >
                  <h3 className="font-display mb-3 text-xl font-normal tracking-tight text-foreground">
                    {item.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {item.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Estrutura Profissional */}
        <section className="bg-background px-6 py-20 md:px-12 md:py-28 lg:px-20 lg:py-32">
          <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2 md:gap-16 lg:gap-24">
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl">
              <Image
                src="/images/scenes/salao/salao-mesa.webp"
                alt="Salão do Espaço Coral montado para evento corporativo"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
            <div>
              <p className="mb-4 text-xs uppercase tracking-widest text-gold">
                Infraestrutura
              </p>
              <h2 className="font-display mb-6 text-4xl font-normal tracking-tight text-foreground md:text-5xl">
                Estrutura para Eventos Profissionais
              </h2>
              <p className="mb-6 text-base leading-relaxed text-muted-foreground">
                Com 12.000 m² de área total, o Espaço Coral acomoda desde
                confraternizações íntimas até grandes eventos corporativos com
                capacidade para 320 pessoas. O salão climatizado, aliado ao
                sistema de som ambiente e TVs, garante conforto e
                profissionalismo em qualquer formato de evento.
              </p>
              <div className="grid grid-cols-2 gap-4">
                {features.map((f) => (
                  <div key={f.label} className="border-l-2 border-gold pl-4">
                    <p className="text-xs uppercase tracking-wider text-gold">
                      {f.label}
                    </p>
                    <p className="mt-1 text-sm text-foreground">{f.value}</p>
                  </div>
                ))}
              </div>
              <p className="mt-6 text-base leading-relaxed text-muted-foreground">
                A cozinha industrial e as 8 cervejeiras suportam a operação
                de buffets de qualquer porte. O gerador de energia próprio
                garante que apresentações, projeções e iluminação cênica não
                sejam interrompidos por eventuais quedas na rede.
              </p>
            </div>
          </div>
        </section>

        {/* Privacidade e Logística */}
        <section className="bg-secondary/30 px-6 py-20 md:px-12 md:py-28 lg:px-20 lg:py-32">
          <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2 md:gap-16 lg:gap-24">
            <div className="order-2 md:order-1">
              <p className="mb-4 text-xs uppercase tracking-widest text-gold">
                Exclusividade
              </p>
              <h2 className="font-display mb-6 text-4xl font-normal tracking-tight text-foreground md:text-5xl">
                Privacidade e Logística Impecável
              </h2>
              <p className="mb-4 text-base leading-relaxed text-muted-foreground">
                Cada evento é realizado com exclusividade: o espaço é todo seu
                durante a realização do seu evento. Não há compartilhamento de
                ambientes com outros grupos, garantindo a privacidade e o foco
                que eventos corporativos exigem, especialmente em lançamentos
                e reuniões com clientes ou parceiros estratégicos.
              </p>
              <p className="text-base leading-relaxed text-muted-foreground">
                O estacionamento com capacidade para 40 carros e orientadores
                de vagas, aliado à localização estratégica em Batatais, facilita
                o acesso para equipes vindas de Ribeirão Preto, Franca e região.
                Banheiros separados para o staff dos fornecedores e uma sala
                privativa de apoio (utilizável como camarim ou sala VIP)
                completam a logística do evento.
              </p>
            </div>
            <div className="relative order-1 aspect-[4/5] overflow-hidden rounded-2xl md:order-2">
              <Image
                src="/images/scenes/fachada/fachada-noite.webp"
                alt="Fachada iluminada do Espaço Coral à noite"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </div>
        </section>

        {/* Empresas que escolhem o Espaço Coral */}
        <section className="bg-background px-6 py-20 md:px-12 md:py-28 lg:px-20 lg:py-32">
          <div className="mx-auto max-w-3xl">
            <p className="mb-4 text-xs uppercase tracking-widest text-gold">
              Setores atendidos
            </p>
            <h2 className="font-display mb-6 text-4xl font-normal tracking-tight text-foreground md:text-5xl">
              Empresas que realizam eventos no Espaço Coral
            </h2>
            <p className="mb-4 text-base leading-relaxed text-muted-foreground">
              A região de Batatais e Ribeirão Preto concentra setores
              estratégicos da economia paulista: agronegócio, indústria
              sucroenergética, saúde, varejo e serviços profissionais. O
              Espaço Coral atende empresas desses segmentos em formatos
              diversos, com a flexibilidade de adaptar a estrutura ao
              porte e ao protocolo de cada evento.
            </p>
            <p className="mb-4 text-base leading-relaxed text-muted-foreground">
              Confraternizações de safra, eventos de relacionamento com
              produtores, jantares de premiação interna, lançamentos de
              produto para distribuidores, reuniões executivas com clientes
              estratégicos, formaturas técnicas e convenções regionais de
              vendas são alguns dos formatos recorrentes no espaço.
            </p>
            <p className="text-base leading-relaxed text-muted-foreground">
              A privacidade total e a estrutura discreta tornam o local
              especialmente adequado para eventos de empresas que precisam
              proteger informações estratégicas, pré-lançamentos
              confidenciais ou conversas com clientes-chave que exigem
              ambiente reservado.
            </p>
          </div>
        </section>

        {/* Localização regional */}
        <section className="bg-background px-6 py-20 md:px-12 md:py-28 lg:px-20 lg:py-32">
          <div className="mx-auto max-w-3xl">
            <p className="mb-4 text-xs uppercase tracking-widest text-gold">
              Localização e acesso
            </p>
            <h2 className="font-display mb-6 text-4xl font-normal tracking-tight text-foreground md:text-5xl">
              Atendendo a macro-região de Ribeirão Preto
            </h2>
            <p className="mb-4 text-base leading-relaxed text-muted-foreground">
              O Espaço Coral fica em Batatais, com acesso direto pelas
              principais rodovias da região. Para empresas sediadas em
              Ribeirão Preto, Franca, São Joaquim da Barra, Altinópolis,
              Brodowski e cidades próximas, o deslocamento é compatível com
              eventos de meio período ou noite, sem necessidade de
              hospedagem para a maioria dos colaboradores.
            </p>
            <p className="text-base leading-relaxed text-muted-foreground">
              A localização ainda funciona como ponto neutro para empresas
              com unidades distribuídas pela região, evitando que uma
              cidade-sede concentre toda a logística do evento. Para
              participantes vindos de outras capitais, Batatais oferece
              opções de hospedagem nas redes hoteleiras locais e em pousadas
              boutique a poucos minutos do espaço.
            </p>
          </div>
        </section>

        {/* Processo de proposta */}
        <section className="bg-secondary/40 px-6 py-20 md:px-12 md:py-28 lg:px-20 lg:py-32">
          <div className="mx-auto max-w-3xl">
            <p className="mb-4 text-xs uppercase tracking-widest text-gold">
              Próximos passos
            </p>
            <h2 className="font-display mb-8 text-4xl font-normal tracking-tight text-foreground md:text-5xl">
              Como funciona uma proposta corporativa
            </h2>
            <ol className="space-y-6 text-base leading-relaxed text-muted-foreground">
              <li className="flex gap-4">
                <span className="font-display shrink-0 text-2xl text-gold">01</span>
                <span>
                  <strong className="text-foreground">Briefing inicial pelo WhatsApp.</strong>{" "}
                  Envie a data desejada, número estimado de participantes,
                  formato do evento (jantar, palestra, lançamento) e qualquer
                  necessidade específica de audiovisual ou layout.
                </span>
              </li>
              <li className="flex gap-4">
                <span className="font-display shrink-0 text-2xl text-gold">02</span>
                <span>
                  <strong className="text-foreground">Proposta personalizada.</strong>{" "}
                  Nossa equipe retorna com a proposta: escopo, condições e
                  indicações de fornecedores parceiros (buffet, audiovisual,
                  decoração) compatíveis com o briefing da empresa.
                </span>
              </li>
              <li className="flex gap-4">
                <span className="font-display shrink-0 text-2xl text-gold">03</span>
                <span>
                  <strong className="text-foreground">Visita técnica.</strong>{" "}
                  Visita guiada com responsáveis da empresa e, se quiser, com
                  a empresa de eventos contratada para alinhar layout,
                  cronograma e logística no próprio espaço.
                </span>
              </li>
              <li className="flex gap-4">
                <span className="font-display shrink-0 text-2xl text-gold">04</span>
                <span>
                  <strong className="text-foreground">Reserva e contrato.</strong>{" "}
                  Formalização da reserva via contrato, com nota fiscal e
                  documentação compatível com os requisitos de compras
                  corporativas.
                </span>
              </li>
            </ol>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-foreground px-6 py-20 md:px-12 md:py-28 lg:px-20 lg:py-32">
          <div className="mx-auto max-w-3xl text-center">
            <div className="gold-divider mx-auto mb-10 w-16 opacity-50" />
            <h2 className="font-display mb-6 text-4xl font-normal tracking-tight text-white md:text-5xl">
              Solicite uma proposta para seu evento
            </h2>
            <p className="mx-auto mb-10 max-w-xl text-base leading-relaxed text-white/60">
              Entre em contato pelo WhatsApp para discutir o formato do seu
              evento, verificar disponibilidade e receber uma proposta
              personalizada.
            </p>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-gold px-8 py-4 text-sm font-medium tracking-wide text-white transition-colors duration-200 hover:bg-gold-dark"
            >
              <MessageCircle size={16} />
              Solicitar proposta
            </a>
          </div>
        </section>

        <FaqSection
          eyebrow="Perguntas frequentes · Corporativo"
          title="Tudo que sua empresa precisa saber"
          intro="Reunimos as dúvidas mais comuns de empresas que estão planejando eventos no Espaço Coral. Para qualquer pergunta adicional, fale com nossa equipe pelo WhatsApp."
          items={faqItems}
        />

        <CtaSection />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
