import type { Metadata } from "next";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { MessageCircle } from "lucide-react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { WhatsAppButton } from "@/components/layout/whatsapp-button";
import { PageHero } from "@/components/sections/page-hero";
import { FaqSection, type FaqItem } from "@/components/sections/faq-section";
import { JsonLd } from "@/components/seo/json-ld";
import { servicePageSchema } from "@/lib/schema";

const TestimonialsSection = dynamic(() =>
  import("@/components/sections/testimonials-section").then(
    (m) => m.TestimonialsSection
  )
);
const CtaSection = dynamic(() =>
  import("@/components/sections/cta-section").then((m) => m.CtaSection)
);

export const metadata: Metadata = {
  title: "Espaço para Casamento em Batatais, SP",
  description:
    "Casamento no Espaço Coral em Batatais: cerimônia ao céu aberto, sala privativa da noiva, 320 convidados, 12.000 m². Atendemos noivas de Ribeirão Preto, Franca e região.",
  keywords: [
    "espaço para casamento Batatais",
    "casamento ao ar livre Batatais",
    "salão de casamento Batatais",
    "casamento perto de Ribeirão Preto",
    "cerimônia ao ar livre Batatais",
  ],
  alternates: { canonical: "https://coraleventos.com.br/eventos/casamentos" },
  openGraph: {
    title: "Espaço para Casamento em Batatais, SP | Espaço Coral",
    description:
      "Cerimônia ao céu aberto, sala privativa da noiva, 320 convidados, 12.000 m² em Batatais, SP.",
    url: "https://coraleventos.com.br/eventos/casamentos",
    images: [
      {
        url: "/og/casamentos.jpg",
        width: 1200,
        height: 630,
        alt: "Cerimônia de casamento ao ar livre no Espaço Coral em Batatais, SP",
      },
    ],
  },
};

const WHATSAPP_URL =
  "https://wa.me/5516991294178?text=Ol%C3%A1!%20Gostaria%20de%20verificar%20disponibilidade%20para%20meu%20casamento.";

const faqItems: FaqItem[] = [
  {
    question: "Qual é a capacidade do Espaço Coral para casamentos?",
    answer:
      "O salão climatizado acomoda até 320 convidados sentados, com mesas, cadeiras e aparadores inclusos no espaço. Para celebrações mais íntimas, a área pode ser configurada para grupos menores sem perder a sensação de aconchego, mantendo o palco principal e a pista de dança em proporção adequada ao número de convidados.",
  },
  {
    question: "O Espaço Coral oferece buffet ou apenas o local?",
    answer:
      "O Espaço Coral é o local: você contrata o buffet, o cerimonial, a decoração, a banda ou DJ e a fotografia com os fornecedores da sua escolha. Essa liberdade é proposital: cada casamento tem um perfil, e os noivos podem montar a equipe ideal para o estilo da festa, sem pacotes obrigatórios.",
  },
  {
    question: "É possível fazer cerimônia ao ar livre no espaço?",
    answer:
      "Sim. O Espaço Coral conta com uma área verde exclusiva para cerimônias ao céu aberto, com paisagismo cuidado e estrutura para receber arco floral, cadeiras dos convidados e tapete. Em caso de chuva, a recepção climatizada serve como plano B integrado, sem necessidade de tendas externas.",
  },
  {
    question: "Como funciona a sala privativa da noiva?",
    answer:
      "A sala da noiva é um ambiente exclusivo dentro do espaço, com cadeira de maquiagem profissional, banheiro próprio e chuveiro. A noiva chega antes da cerimônia, finaliza os preparativos com a equipe de beleza e tem privacidade total até o momento da entrada, sem cruzar com convidados ou fornecedores.",
  },
  {
    question: "O Espaço Coral tem estacionamento para os convidados?",
    answer:
      "Sim. O estacionamento próprio comporta 40 carros e conta com orientadores de vagas durante o evento, garantindo fluxo organizado na chegada e na saída. Para casamentos com lista grande de convidados, sua equipe pode orientar uso de transporte compartilhado ou estacionamentos próximos como apoio.",
  },
  {
    question: "Com quanta antecedência preciso reservar a data?",
    answer:
      "Sábados de maio a outubro costumam ser reservadas com 12 a 18 meses de antecedência. Para datas em outros meses ou em dias de semana, janelas de 6 a 9 meses ainda têm boa disponibilidade. Recomendamos verificar a data desejada pelo WhatsApp assim que a decisão for tomada.",
  },
  {
    question: "Qual é o tempo de uso incluso e como funcionam montagem e desmontagem?",
    answer:
      "O Espaço Coral é alugado por evento, com janela de horas suficiente para a celebração completa: cerimônia, recepção e festa. Os fornecedores têm acesso para montagem no dia do evento e desmontagem na manhã seguinte, conforme combinado no contrato. Detalhes específicos de cronograma são alinhados na visita.",
  },
  {
    question: "Posso visitar o Espaço Coral antes de fechar a reserva?",
    answer:
      "Sim, e recomendamos fortemente. A visita guiada permite conhecer a área de cerimônia ao ar livre, o salão climatizado, a sala da noiva, a cozinha e os demais ambientes, além de conversar com nossa equipe sobre o seu evento. Agende pelo WhatsApp (16) 99129-4178 e marque o melhor horário.",
  },
];

const SCHEMA = servicePageSchema(
  {
    name: "Casamentos no Espaço Coral",
    description:
      "Cerimônia ao céu aberto, sala privativa da noiva e estrutura para até 320 convidados em Batatais, SP.",
    serviceType: "Espaço para casamento",
    url: "https://coraleventos.com.br/eventos/casamentos",
    image: "/images/scenes/casamentos/casamento-arco-floral.webp",
  },
  [
    { name: "Início", url: "/" },
    { name: "Eventos", url: "/eventos" },
    { name: "Casamentos", url: "/eventos/casamentos" },
  ],
  faqItems
);

export default function CasamentosPage() {
  return (
    <>
      <JsonLd data={SCHEMA} />
      <Header />
      <main>
        <PageHero
          title="Casamentos em Batatais"
          subtitle="O cenário perfeito para o grande dia"
          imageSrc="/images/scenes/casamentos/casamento-arco-floral.webp"
          imageAlt="Cerimônia de casamento com arco floral no Espaço Coral em Batatais SP"
        />

        {/* Intro */}
        <section className="bg-background px-6 py-20 md:px-12 md:py-28 lg:px-20 lg:py-32">
          <div className="mx-auto max-w-3xl">
            <p className="mb-6 text-xs uppercase tracking-widest text-muted-foreground">
              Casamentos · Batatais, SP
            </p>
            <p className="text-2xl leading-relaxed text-foreground md:text-3xl lg:text-[2rem] lg:leading-snug">
              O Espaço Coral nasceu para receber o momento mais importante da
              sua vida com a elegância e o cuidado que ele merece. Em Batatais,
              a apenas minutos de Ribeirão Preto, o espaço reúne 12.000 m² de
              estrutura premium, ambientes únicos e uma equipe dedicada a cada
              detalhe do seu grande dia.
            </p>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground md:text-lg">
              Nossa proposta é direta: oferecer uma estrutura completa, sofisticada
              e acolhedora, para que noivos, famílias e fornecedores possam se
              concentrar no que realmente importa, que é celebrar. Cada ambiente
              foi pensado para somar à narrativa do casamento, da chegada dos
              convidados ao último brinde da noite.
            </p>
          </div>
        </section>

        {/* Por que casar no Espaço Coral */}
        <section className="bg-secondary/40 px-6 py-20 md:px-12 md:py-28 lg:px-20 lg:py-32">
          <div className="mx-auto max-w-4xl">
            <div className="mb-12 text-center">
              <p className="mb-4 text-xs uppercase tracking-widest text-gold">
                Diferenciais
              </p>
              <h2 className="font-display mb-6 text-4xl font-normal tracking-tight text-foreground md:text-5xl">
                Por que noivas escolhem o Espaço Coral
              </h2>
              <p className="mx-auto max-w-2xl text-base leading-relaxed text-muted-foreground">
                A combinação de estrutura premium, atendimento próximo e
                liberdade para personalizar cada detalhe coloca o Espaço Coral
                entre as opções mais buscadas para casamentos no interior de
                São Paulo.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              {[
                {
                  label: "Cerimônia + recepção",
                  title: "Tudo no mesmo lugar",
                  text: "Cerimônia ao ar livre e recepção climatizada no mesmo terreno. Sem deslocamento entre venues, sem estresse logístico para os convidados.",
                },
                {
                  label: "Sala da noiva",
                  title: "Privacidade do início ao fim",
                  text: "Ambiente exclusivo com cadeira de maquiagem, banheiro e chuveiro, para que a noiva se prepare e respire com calma antes da entrada.",
                },
                {
                  label: "320 convidados",
                  title: "Capacidade premium",
                  text: "Salão climatizado para até 320 convidados sentados, com mesas, cadeiras, mesa de bolo e aparadores inclusos.",
                },
              ].map((item) => (
                <div key={item.title} className="border-l-2 border-gold pl-6">
                  <p className="mb-2 text-xs uppercase tracking-wider text-gold">
                    {item.label}
                  </p>
                  <h3 className="font-display mb-3 text-2xl font-normal tracking-tight text-foreground">
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

        {/* Cerimônia ao Céu Aberto */}
        <section className="bg-background px-6 py-20 md:px-12 md:py-28 lg:px-20 lg:py-32">
          <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2 md:gap-16 lg:gap-24">
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl">
              <Image
                src="/images/scenes/cerimonia/cerimonia-arco.webp"
                alt="Cerimônia ao ar livre com arco floral no Espaço Coral"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
            <div>
              <p className="mb-4 text-xs uppercase tracking-widest text-gold">
                Ao Ar Livre
              </p>
              <h2 className="font-display mb-6 text-4xl font-normal tracking-tight text-foreground md:text-5xl">
                Cerimônia ao Céu Aberto
              </h2>
              <p className="mb-4 text-base leading-relaxed text-muted-foreground">
                Imagine trocar alianças sob o céu aberto, rodeados de área verde
                e de todos que você ama. O Espaço Coral conta com uma área
                exclusiva para cerimônias ao ar livre, com paisagismo cuidado e
                estrutura completa para tornar esse momento inesquecível.
              </p>
              <p className="mb-4 text-base leading-relaxed text-muted-foreground">
                O ambiente comporta cerimônias de diferentes estilos, do
                clássico religioso ao símbolo civil contemporâneo, com
                decoração personalizada pelos fornecedores escolhidos pelos
                noivos. A iluminação natural durante o entardecer cria um cenário
                naturalmente deslumbrante para as fotos que durarão para sempre.
              </p>
              <p className="text-base leading-relaxed text-muted-foreground">
                E em caso de chuva inesperada, a recepção climatizada
                funciona como plano B integrado: a celebração simplesmente
                migra para dentro, sem necessidade de tendas externas ou
                logística de última hora.
              </p>
            </div>
          </div>
        </section>

        {/* Sala da Noiva */}
        <section className="bg-secondary/30 px-6 py-20 md:px-12 md:py-28 lg:px-20 lg:py-32">
          <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2 md:gap-16 lg:gap-24">
            <div className="order-2 md:order-1">
              <p className="mb-4 text-xs uppercase tracking-widest text-gold">
                Exclusividade
              </p>
              <h2 className="font-display mb-6 text-4xl font-normal tracking-tight text-foreground md:text-5xl">
                Sala Privativa da Noiva
              </h2>
              <p className="mb-4 text-base leading-relaxed text-muted-foreground">
                A noiva merece um espaço só seu. O Espaço Coral dispõe de uma
                sala privativa completa, com cadeira de maquiagem profissional,
                banheiro e chuveiro exclusivos, tudo para que você chegue ao
                altar radiante e tranquila.
              </p>
              <p className="mb-4 text-base leading-relaxed text-muted-foreground">
                A sala garante privacidade e conforto nos momentos que antecedem
                a cerimônia. É o seu espaço para respirar, finalizar os últimos
                detalhes da maquiagem com a equipe de beleza e viver a emoção
                do grande dia com toda a calma que ele merece, sem cruzar com
                convidados ou fornecedores no corredor.
              </p>
              <p className="text-base leading-relaxed text-muted-foreground">
                Mães, madrinhas e fotógrafos também usam a sala como base nos
                preparativos: é o ponto de encontro natural para os retratos
                mais íntimos antes da cerimônia.
              </p>
            </div>
            <div className="relative order-1 aspect-[4/5] overflow-hidden rounded-2xl md:order-2">
              <Image
                src="/images/scenes/casamentos/noiva-escada.webp"
                alt="Noiva na escada do Espaço Coral em Batatais"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </div>
        </section>

        {/* Estrutura completa */}
        <section className="bg-background px-6 py-20 md:px-12 md:py-28 lg:px-20 lg:py-32">
          <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2 md:gap-16 lg:gap-24">
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl">
              <Image
                src="/images/scenes/salao/salao-mesa.webp"
                alt="Salão de festas do Espaço Coral montado para casamento"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
            <div>
              <p className="mb-4 text-xs uppercase tracking-widest text-gold">
                Estrutura
              </p>
              <h2 className="font-display mb-6 text-4xl font-normal tracking-tight text-foreground md:text-5xl">
                Tudo que o Dia Perfeito Precisa
              </h2>
              <p className="mb-6 text-base leading-relaxed text-muted-foreground">
                Para receber até 320 convidados com conforto e sofisticação, o
                Espaço Coral oferece uma estrutura física completa: itens que
                em outros espaços precisam ser alugados separadamente, aqui
                já fazem parte da reserva:
              </p>
              <ul className="space-y-3 text-sm text-muted-foreground">
                {[
                  "Salão climatizado para até 320 convidados",
                  "Mesas, cadeiras, mesa de bolo e aparadores inclusos",
                  "Sistema de som ambiente profissional e TVs",
                  "8 cervejeiras e cozinha completa",
                  "Estacionamento para 40 carros com orientadores",
                  "Banheiros masculino, feminino e PCD com camareira",
                  "Banheiros separados para o staff do evento",
                  "Espaço kids com monitora",
                  "Gerador de energia",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
                    {item}
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-base leading-relaxed text-muted-foreground">
                Esse pacote estrutural reduz substancialmente o número de
                fornecedores que os noivos precisam coordenar, eliminando
                surpresas no orçamento.
              </p>
            </div>
          </div>
        </section>

        {/* Formatos de cerimônia e momento do dia */}
        <section className="bg-secondary/40 px-6 py-20 md:px-12 md:py-28 lg:px-20 lg:py-32">
          <div className="mx-auto max-w-4xl">
            <div className="mb-12">
              <p className="mb-4 text-xs uppercase tracking-widest text-gold">
                Formatos
              </p>
              <h2 className="font-display mb-6 text-4xl font-normal tracking-tight text-foreground md:text-5xl">
                Cerimônia religiosa, civil ou simbólica: você escolhe
              </h2>
              <p className="text-base leading-relaxed text-muted-foreground">
                A área de cerimônia ao ar livre comporta diferentes formatos
                de ritual. Casamentos religiosos com celebrante convidado,
                casamentos civis com juiz de paz, cerimônias simbólicas
                conduzidas por amigos ou familiares. Todos cabem no espaço,
                com a mesma estrutura de base e total liberdade para a
                decoração. Cerimônias bilíngues, casamentos LGBTQIA+ e
                celebrações com elementos de diferentes tradições culturais
                também são bem-vindas.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {[
                {
                  title: "Final de tarde",
                  text: "O entardecer em Batatais oferece luz dourada natural, cenário ideal para fotos espontâneas e cerimônias contadas com a luz do sol.",
                },
                {
                  title: "Pôr do sol",
                  text: "Entrada da noiva no horário do pôr do sol, com luz lateral suave. A recepção começa já no salão climatizado, com transição fluida.",
                },
                {
                  title: "Noite",
                  text: "Cerimônia ao ar livre com iluminação cênica e velas, ou direto no salão climatizado para casamentos mais longos e festivos.",
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

        {/* Localização */}
        <section className="bg-background px-6 py-20 md:px-12 md:py-28 lg:px-20 lg:py-32">
          <div className="mx-auto max-w-3xl">
            <p className="mb-4 text-xs uppercase tracking-widest text-gold">
              Localização
            </p>
            <h2 className="font-display mb-6 text-4xl font-normal tracking-tight text-foreground md:text-5xl">
              Entre Batatais, Ribeirão Preto e Franca
            </h2>
            <p className="mb-4 text-base leading-relaxed text-muted-foreground">
              O Espaço Coral fica em Batatais, no Jardim Elena, com acesso fácil
              a partir das principais cidades da macro-região. Para{" "}
              <Link
                href="/cidades/ribeirao-preto"
                className="text-foreground underline decoration-gold/40 underline-offset-4 transition-colors hover:decoration-gold"
              >
                noivas e famílias de Ribeirão Preto
              </Link>
              , é a alternativa premium fora da capital regional, com a vantagem
              de oferecer mais espaço, mais natureza e a tranquilidade de uma
              cidade do interior.
            </p>
            <p className="text-base leading-relaxed text-muted-foreground">
              Para convidados vindos de{" "}
              <Link
                href="/cidades/franca"
                className="text-foreground underline decoration-gold/40 underline-offset-4 transition-colors hover:decoration-gold"
              >
                Franca
              </Link>
              , São Joaquim da Barra, Altinópolis, Brodowski e demais municípios
              da região, o acesso por rodovia é direto. A localização também facilita o trabalho
              de fornecedores de Ribeirão Preto que prestam serviço regularmente
              em casamentos no Espaço Coral, sem custo adicional de deslocamento
              expressivo.
            </p>
          </div>
        </section>

        {/* Fornecedores */}
        <section className="bg-sand px-6 py-20 md:px-12 md:py-28 lg:px-20 lg:py-32">
          <div className="mx-auto max-w-3xl text-center">
            <div className="gold-divider mx-auto mb-10 w-16 opacity-50" />
            <p className="mb-4 text-xs uppercase tracking-widest text-gold-dark">
              Flexibilidade
            </p>
            <h2 className="font-display mb-6 text-4xl font-normal tracking-tight text-foreground md:text-5xl">
              Seu Casamento, Seu Estilo
            </h2>
            <p className="mx-auto mb-4 max-w-xl text-base leading-relaxed text-foreground/60">
              O Espaço Coral é o palco: você escolhe os fornecedores. Buffet,
              decoração, cerimonial, DJ, banda e fotografia: a liberdade é toda
              sua para criar o casamento exatamente como imaginou.
            </p>
            <p className="mx-auto max-w-xl text-base leading-relaxed text-foreground/60">
              Trabalhamos sem listas obrigatórias. Se você já tem fornecedores
              de confiança, eles são bem-vindos. Se ainda está montando a
              equipe, nossa equipe pode indicar profissionais que conhecem bem
              o espaço.
            </p>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-10 inline-flex items-center gap-2 bg-gold px-8 py-4 text-sm font-medium tracking-wide text-foreground transition-colors duration-200 hover:bg-gold-light"
            >
              <MessageCircle size={16} />
              Verificar disponibilidade
            </a>
          </div>
        </section>

        {/* Visita guiada */}
        <section className="bg-background px-6 py-20 md:px-12 md:py-28 lg:px-20 lg:py-32">
          <div className="mx-auto max-w-3xl">
            <p className="mb-4 text-xs uppercase tracking-widest text-gold">
              A visita
            </p>
            <h2 className="font-display mb-6 text-4xl font-normal tracking-tight text-foreground md:text-5xl">
              O que esperar de uma visita guiada
            </h2>
            <p className="mb-4 text-base leading-relaxed text-muted-foreground">
              A visita guiada ao Espaço Coral é o momento em que o casamento
              começa a tomar forma na cabeça dos noivos. Mais do que conhecer
              o espaço fisicamente, é a oportunidade de ver como o cenário
              dialoga com o estilo de festa que vocês imaginam, desde a
              entrada da noiva até a posição do bar e da pista de dança.
            </p>
            <p className="mb-4 text-base leading-relaxed text-muted-foreground">
              Durante a visita, nossa equipe percorre com vocês cada ambiente:
              a área externa de cerimônia, o salão climatizado em diferentes
              configurações de mesa, a sala privativa da noiva, a cozinha,
              os banheiros com camareira e o estacionamento. Conversamos
              sobre cronograma do evento, layouts possíveis, quais
              fornecedores costumam atender bem o espaço e o que está incluso
              versus o que precisa ser contratado separado.
            </p>
            <p className="text-base leading-relaxed text-muted-foreground">
              A visita é sem compromisso e leva cerca de 60 minutos. Quando
              possível, recomendamos visitar no mesmo período do dia em que
              você imagina o casamento. Visitas no entardecer, por exemplo,
              ajudam a perceber a luz natural disponível para as fotos e o
              clima do espaço naquele momento específico.
            </p>
          </div>
        </section>

        {/* Como reservar */}
        <section className="bg-secondary/40 px-6 py-20 md:px-12 md:py-28 lg:px-20 lg:py-32">
          <div className="mx-auto max-w-3xl">
            <p className="mb-4 text-xs uppercase tracking-widest text-gold">
              Próximos passos
            </p>
            <h2 className="font-display mb-8 text-4xl font-normal tracking-tight text-foreground md:text-5xl">
              Como reservar a sua data
            </h2>
            <ol className="space-y-6 text-base leading-relaxed text-muted-foreground">
              <li className="flex gap-4">
                <span className="font-display shrink-0 text-2xl text-gold">01</span>
                <span>
                  <strong className="text-foreground">Consulte a data pelo WhatsApp.</strong>{" "}
                  Envie a data desejada e o número estimado de convidados.
                  Nossa equipe responde com a disponibilidade no mesmo dia útil.
                </span>
              </li>
              <li className="flex gap-4">
                <span className="font-display shrink-0 text-2xl text-gold">02</span>
                <span>
                  <strong className="text-foreground">Agende uma visita guiada.</strong>{" "}
                  Conheça pessoalmente a área de cerimônia ao ar livre, o salão
                  climatizado, a sala da noiva e os demais ambientes. A visita é
                  sem compromisso.
                </span>
              </li>
              <li className="flex gap-4">
                <span className="font-display shrink-0 text-2xl text-gold">03</span>
                <span>
                  <strong className="text-foreground">Reserve a data com contrato.</strong>{" "}
                  Após a visita, formalizamos a reserva e seguimos com o suporte
                  para o planejamento, incluindo orientações sobre fornecedores
                  e cronograma do evento.
                </span>
              </li>
            </ol>
          </div>
        </section>

        <FaqSection
          eyebrow="Perguntas frequentes · Casamentos"
          title="Tudo que você precisa saber"
          intro="Reunimos as dúvidas mais comuns de noivos que estão considerando o Espaço Coral. Para qualquer pergunta adicional, fale com nossa equipe pelo WhatsApp."
          items={faqItems}
        />

        <TestimonialsSection />
        <CtaSection />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
