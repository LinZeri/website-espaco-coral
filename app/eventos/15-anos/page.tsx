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

const TestimonialsSection = dynamic(() =>
  import("@/components/sections/testimonials-section").then(
    (m) => m.TestimonialsSection
  )
);
const CtaSection = dynamic(() =>
  import("@/components/sections/cta-section").then((m) => m.CtaSection)
);

export const metadata: Metadata = {
  title: "Festa de 15 Anos em Batatais, SP",
  description:
    "Festa de 15 anos no Espaço Coral em Batatais: sala privativa da debutante, espaço kids, 320 convidados, 12.000 m². Atendemos famílias de Ribeirão Preto e região.",
  keywords: [
    "festa de 15 anos Batatais",
    "salão para festa de 15 anos Batatais",
    "espaço para debutante Batatais",
    "festa 15 anos perto de Ribeirão Preto",
  ],
  alternates: { canonical: "https://coraleventos.com.br/eventos/15-anos" },
  openGraph: {
    title: "Festa de 15 Anos em Batatais, SP | Espaço Coral",
    description:
      "Sala privativa da debutante, espaço kids com monitora, 320 convidados em Batatais, SP.",
    url: "https://coraleventos.com.br/eventos/15-anos",
    images: [
      {
        url: "/og/15-anos.jpg",
        width: 1200,
        height: 630,
        alt: "Salão decorado para festa de 15 anos no Espaço Coral em Batatais, SP",
      },
    ],
  },
};

const WHATSAPP_URL =
  "https://wa.me/5516991294178?text=Ol%C3%A1!%20Gostaria%20de%20verificar%20disponibilidade%20para%20uma%20festa%20de%2015%20anos.";

const faqItems: FaqItem[] = [
  {
    question: "Qual é a capacidade do salão para festa de 15 anos?",
    answer:
      "O salão climatizado do Espaço Coral acomoda até 320 convidados sentados, com mesas, cadeiras, mesa de bolo e aparadores inclusos. Para festas mais íntimas, o ambiente pode ser configurado para grupos menores sem perder a sensação de proximidade entre os convidados e a debutante.",
  },
  {
    question: "Há sala privativa para a debutante se preparar?",
    answer:
      "Sim. A sala privativa conta com cadeira de maquiagem, banheiro próprio e chuveiro, permitindo que a aniversariante se prepare com calma, longe da agitação dos preparativos finais. É também o espaço onde família, fotógrafo e equipe de beleza se reúnem antes da entrada.",
  },
  {
    question: "O Espaço Coral oferece o buffet ou apenas o local?",
    answer:
      "O Espaço Coral é o local físico: você contrata o buffet, a decoração, o DJ ou banda, o cerimonial e a fotografia com fornecedores da sua escolha. Essa flexibilidade permite montar a festa exatamente no estilo que a debutante imaginou, sem pacotes fechados ou listas obrigatórias.",
  },
  {
    question: "Existe espaço kids? Tem monitora durante a festa?",
    answer:
      "Sim. O espaço kids é uma área dedicada às crianças, supervisionada por uma monitora profissional durante o evento. É um diferencial valorizado em festas de 15 anos, em que a presença de irmãos menores, primos e filhos de convidados é comum. Os pais aproveitam a festa com tranquilidade.",
  },
  {
    question: "É possível fazer entrada ou cerimônia ao ar livre?",
    answer:
      "Sim. O Espaço Coral conta com área verde para cerimônia ou entrada ao céu aberto, ideal para o ritual da valsa, troca de sapatinho ou abertura simbólica da festa. Em caso de chuva, a entrada migra naturalmente para o salão climatizado, sem necessidade de tendas extras.",
  },
  {
    question: "Como funciona o estacionamento e a logística para os convidados?",
    answer:
      "O estacionamento próprio comporta 40 carros, com orientadores de vagas durante todo o evento. Banheiros masculino, feminino e PCD com camareira garantem conforto na alta circulação. Banheiros separados para o staff dos fornecedores mantêm a logística do evento organizada e discreta.",
  },
  {
    question: "Posso usar fornecedores próprios: DJ, decoração, fotógrafo?",
    answer:
      "Sim. O Espaço Coral trabalha sem listas obrigatórias de fornecedores. A família pode contratar profissionais de confiança ou pedir indicações à nossa equipe, que conhece bem os parceiros que atendem regularmente festas de 15 anos no espaço, uma orientação útil para quem está começando o planejamento.",
  },
  {
    question: "Com quanta antecedência preciso reservar a data?",
    answer:
      "Os sábados de abril a outubro costumam ser reservados com 8 a 12 meses de antecedência. Para datas em outros períodos ou em sextas-feiras, janelas mais curtas ainda têm disponibilidade. Recomendamos consultar pelo WhatsApp assim que a data for definida em família.",
  },
];

const SCHEMA = servicePageSchema(
  {
    name: "Festas de 15 Anos no Espaço Coral",
    description:
      "Espaço para festas de debutantes em Batatais, SP. Sala privativa, espaço kids com monitora, capacidade para 320 convidados.",
    serviceType: "Espaço para festa de 15 anos",
    url: "https://coraleventos.com.br/eventos/15-anos",
    image: "/images/gallery/salao-decorado.webp",
  },
  [
    { name: "Início", url: "/" },
    { name: "Eventos", url: "/eventos" },
    { name: "Festas de 15 Anos", url: "/eventos/15-anos" },
  ],
  faqItems
);

export default function QuinzeAnosPage() {
  return (
    <>
      <JsonLd data={SCHEMA} />
      <Header />
      <main>
        <PageHero
          title="Festas de 15 Anos em Batatais"
          subtitle="Um momento único merece um espaço único"
          imageSrc="/images/gallery/salao-decorado.webp"
          imageAlt="Salão do Espaço Coral decorado para festa de 15 anos em Batatais SP"
        />

        {/* Intro */}
        <section className="bg-background px-6 py-20 md:px-12 md:py-28 lg:px-20 lg:py-32">
          <div className="mx-auto max-w-3xl">
            <p className="mb-6 text-xs uppercase tracking-widest text-muted-foreground">
              Festas de 15 Anos · Batatais, SP
            </p>
            <p className="text-2xl leading-relaxed text-foreground md:text-3xl lg:text-[2rem] lg:leading-snug">
              A festa de 15 anos é um dos momentos mais marcantes na vida de
              uma família. No Espaço Coral, cada detalhe é pensado para que a
              debutante e seus convidados vivam uma noite verdadeiramente
              inesquecível, em um ambiente sofisticado e acolhedor em
              Batatais, SP.
            </p>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground md:text-lg">
              Reunimos em um único espaço a estrutura completa que famílias
              buscam para esse marco: salão climatizado para até 320 convidados,
              sala privativa para a debutante, área verde para entrada ao ar
              livre e espaço kids com monitora, tudo no mesmo terreno, sem
              improviso e sem custos extras com aluguéis paralelos.
            </p>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground md:text-lg">
              Atendemos famílias de Batatais, Ribeirão Preto, Franca e
              cidades vizinhas, com a estrutura física e a equipe de apoio
              prontas para receber tanto festas íntimas para a família mais
              próxima quanto celebrações com toda a turma do colégio
              presente. Cada festa é planejada com a debutante e a família
              em primeiro lugar.
            </p>
          </div>
        </section>

        {/* Diferenciais */}
        <section className="bg-secondary/40 px-6 py-20 md:px-12 md:py-28 lg:px-20 lg:py-32">
          <div className="mx-auto max-w-4xl">
            <div className="mb-12 text-center">
              <p className="mb-4 text-xs uppercase tracking-widest text-gold">
                Diferenciais
              </p>
              <h2 className="font-display mb-6 text-4xl font-normal tracking-tight text-foreground md:text-5xl">
                Por que famílias escolhem o Espaço Coral
              </h2>
              <p className="mx-auto max-w-2xl text-base leading-relaxed text-muted-foreground">
                A combinação de sala privativa para a debutante, espaço kids
                com monitora e capacidade para 320 convidados resolve, de uma
                vez, as três principais preocupações de quem organiza a festa
                de 15 anos.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              {[
                {
                  label: "Sala da debutante",
                  title: "Espaço só dela",
                  text: "Cadeira de maquiagem, banheiro e chuveiro privativos para a aniversariante chegar impecável e tranquila à grande entrada.",
                },
                {
                  label: "Espaço kids",
                  title: "Crianças cuidadas",
                  text: "Área dedicada com monitora profissional durante toda a festa. Pais aproveitam a celebração; os pequenos brincam em segurança.",
                },
                {
                  label: "320 convidados",
                  title: "Estrutura completa",
                  text: "Salão climatizado, mesas, cadeiras, cervejeiras, sistema de som e banheiros com camareira, tudo incluso no espaço.",
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

        {/* Sala da Debutante */}
        <section className="bg-background px-6 py-20 md:px-12 md:py-28 lg:px-20 lg:py-32">
          <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2 md:gap-16 lg:gap-24">
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl">
              <Image
                src="/images/spaces/entrada-decorada.webp"
                alt="Entrada decorada do Espaço Coral para festa de 15 anos"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
            <div>
              <p className="mb-4 text-xs uppercase tracking-widest text-gold">
                Exclusividade
              </p>
              <h2 className="font-display mb-6 text-4xl font-normal tracking-tight text-foreground md:text-5xl">
                Sala Privativa para a Debutante
              </h2>
              <p className="mb-4 text-base leading-relaxed text-muted-foreground">
                A protagonista da noite merece um espaço só dela. O Espaço
                Coral dispõe de uma sala privativa completa, com cadeira de
                maquiagem, banheiro exclusivo e chuveiro, tudo para que a
                debutante se prepare com calma, conforto e toda a emoção do
                momento.
              </p>
              <p className="mb-4 text-base leading-relaxed text-muted-foreground">
                Enquanto a família finaliza os preparativos no salão, a
                aniversariante tem seu próprio espaço de bastidores, longe da
                agitação, para chegar impecável à sua grande entrada e fazer
                aquela última checagem do vestido com calma.
              </p>
              <p className="text-base leading-relaxed text-muted-foreground">
                Mãe, irmãs, madrinhas, fotógrafo e equipe de beleza usam o
                ambiente como base nos preparativos. É o ponto natural para os
                retratos íntimos antes da entrada principal, e para aquela
                respiração que toda debutante precisa antes da valsa.
              </p>
            </div>
          </div>
        </section>

        {/* Espaço Kids */}
        <section className="bg-secondary/30 px-6 py-20 md:px-12 md:py-28 lg:px-20 lg:py-32">
          <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2 md:gap-16 lg:gap-24">
            <div className="order-2 md:order-1">
              <p className="mb-4 text-xs uppercase tracking-widest text-gold">
                Cuidado com todos
              </p>
              <h2 className="font-display mb-6 text-4xl font-normal tracking-tight text-foreground md:text-5xl">
                Espaço Kids com Monitora
              </h2>
              <p className="mb-4 text-base leading-relaxed text-muted-foreground">
                As crianças também merecem se divertir. O Espaço Coral conta
                com uma área kids dedicada, supervisionada por uma monitora
                profissional durante todo o evento. Os pais aproveitam a festa
                com tranquilidade enquanto os pequenos se divertem em segurança.
              </p>
              <p className="text-base leading-relaxed text-muted-foreground">
                Esse diferencial é especialmente valorizado em festas de 15
                anos, onde a presença de crianças da família é comum: irmãos
                menores, primos, filhos de convidados. O conforto da turma
                infantil resolve uma das principais preocupações dos pais e
                amplia o tempo que a família consegue aproveitar a celebração
                inteira.
              </p>
            </div>
            <div className="relative order-1 aspect-[4/5] overflow-hidden rounded-2xl md:order-2">
              <Image
                src="/images/spaces/fachada-entardecer.webp"
                alt="Fachada do Espaço Coral ao entardecer"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </div>
        </section>

        {/* Estrutura */}
        <section className="bg-background px-6 py-20 md:px-12 md:py-28 lg:px-20 lg:py-32">
          <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2 md:gap-16 lg:gap-24">
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl">
              <Image
                src="/images/spaces/salao-mesa.webp"
                alt="Salão do Espaço Coral montado para festa"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
            <div>
              <p className="mb-4 text-xs uppercase tracking-widest text-gold">
                Estrutura completa
              </p>
              <h2 className="font-display mb-6 text-4xl font-normal tracking-tight text-foreground md:text-5xl">
                Tudo Pensado para a Festa Perfeita
              </h2>
              <p className="mb-6 text-base leading-relaxed text-muted-foreground">
                O Espaço Coral reúne a estrutura completa que uma festa de 15
                anos exige, itens que muitas vezes precisam ser alugados
                separadamente em outros espaços, aqui já estão inclusos:
              </p>
              <ul className="space-y-3 text-sm text-muted-foreground">
                {[
                  "Salão climatizado com capacidade para 320 convidados",
                  "Mesas, cadeiras, mesa de bolo e aparadores inclusos",
                  "8 cervejeiras e cozinha completa",
                  "Sistema de som ambiente e TVs",
                  "Cerimônia ou entrada ao céu aberto (se desejado)",
                  "Estacionamento para 40 carros com orientadores",
                  "Banheiros com camareira durante o evento",
                  "Espaço kids com monitora inclusa",
                  "Gerador de energia",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Decoração e personalização */}
        <section className="bg-background px-6 py-20 md:px-12 md:py-28 lg:px-20 lg:py-32">
          <div className="mx-auto max-w-3xl">
            <p className="mb-4 text-xs uppercase tracking-widest text-gold">
              Decoração
            </p>
            <h2 className="font-display mb-6 text-4xl font-normal tracking-tight text-foreground md:text-5xl">
              Um cenário que se adapta ao tema da festa
            </h2>
            <p className="mb-4 text-base leading-relaxed text-muted-foreground">
              O Espaço Coral foi pensado com paleta neutra e arquitetura
              elegante para servir como tela em branco para qualquer
              decoração. Festas com tema clássico, contemporâneo, boho,
              minimalista, vintage ou totalmente personalizado se encaixam
              naturalmente, sem que o espaço dispute atenção com a proposta
              decorativa escolhida pela debutante.
            </p>
            <p className="text-base leading-relaxed text-muted-foreground">
              A iluminação interna é regulável e a estrutura permite que
              decoradores instalem painéis de fundo, arcos florais, lustres
              suspensos, projeções e elementos cênicos sem dificuldade. A
              equipe do espaço acompanha a montagem para garantir que tudo
              esteja em ordem antes da entrada da debutante e dos primeiros
              convidados.
            </p>
          </div>
        </section>

        {/* Fornecedores */}
        <section className="bg-secondary/40 px-6 py-20 md:px-12 md:py-28 lg:px-20 lg:py-32">
          <div className="mx-auto max-w-3xl">
            <p className="mb-4 text-xs uppercase tracking-widest text-gold">
              Fornecedores
            </p>
            <h2 className="font-display mb-6 text-4xl font-normal tracking-tight text-foreground md:text-5xl">
              Liberdade para montar a festa que a debutante quer
            </h2>
            <p className="mb-4 text-base leading-relaxed text-muted-foreground">
              O Espaço Coral é o local: buffet, decoração, DJ ou banda,
              cerimonial e fotografia ficam por conta da família, com a
              liberdade de escolher os profissionais que melhor se encaixem
              no estilo da festa. Sem listas obrigatórias, sem pacotes fechados.
            </p>
            <p className="text-base leading-relaxed text-muted-foreground">
              Se a família já tem fornecedores de confiança, todos são
              bem-vindos. Se ainda está montando a equipe, nossa equipe pode
              indicar profissionais que atendem regularmente festas de 15
              anos no espaço, fotógrafos, cerimonialistas, decoradores e DJs
              já familiarizados com a planta e a logística do local.
            </p>
          </div>
        </section>

        {/* Roteiro da noite */}
        <section className="bg-background px-6 py-20 md:px-12 md:py-28 lg:px-20 lg:py-32">
          <div className="mx-auto max-w-3xl">
            <p className="mb-4 text-xs uppercase tracking-widest text-gold">
              Roteiro
            </p>
            <h2 className="font-display mb-6 text-4xl font-normal tracking-tight text-foreground md:text-5xl">
              Uma noite construída em camadas
            </h2>
            <p className="mb-8 text-base leading-relaxed text-muted-foreground">
              Famílias que organizam festas de 15 anos costumam construir a
              noite em torno de momentos-chave. O Espaço Coral acomoda esse
              roteiro com naturalidade, e cada ambiente tem um papel:
            </p>
            <ol className="space-y-6 text-base leading-relaxed text-muted-foreground">
              <li className="flex gap-4">
                <span className="font-display shrink-0 text-2xl text-gold">01</span>
                <span>
                  <strong className="text-foreground">Recepção dos convidados.</strong>{" "}
                  Coquetel de boas-vindas no hall ou na área externa, enquanto
                  a debutante finaliza os preparativos na sala privativa.
                </span>
              </li>
              <li className="flex gap-4">
                <span className="font-display shrink-0 text-2xl text-gold">02</span>
                <span>
                  <strong className="text-foreground">Entrada e valsa.</strong>{" "}
                  Entrada principal no salão ou ao ar livre, seguida da
                  valsa, o momento mais aguardado da família.
                </span>
              </li>
              <li className="flex gap-4">
                <span className="font-display shrink-0 text-2xl text-gold">03</span>
                <span>
                  <strong className="text-foreground">Jantar e homenagens.</strong>{" "}
                  Jantar servido no salão climatizado, com discursos e
                  homenagens projetadas nas TVs do espaço.
                </span>
              </li>
              <li className="flex gap-4">
                <span className="font-display shrink-0 text-2xl text-gold">04</span>
                <span>
                  <strong className="text-foreground">Festa.</strong>{" "}
                  Pista de dança liberada, bar reforçado pelas 8 cervejeiras
                  e equipe de apoio cuidando dos detalhes, enquanto o
                  espaço kids segue funcionando para as crianças.
                </span>
              </li>
            </ol>
          </div>
        </section>

        {/* CTA intermediário */}
        <section className="bg-foreground px-6 py-20 md:px-12 md:py-28 lg:px-20 lg:py-32">
          <div className="mx-auto max-w-3xl text-center">
            <div className="gold-divider mx-auto mb-10 w-16 opacity-50" />
            <h2 className="font-display mb-6 text-4xl font-normal tracking-tight text-white md:text-5xl">
              Reserve a data da sua festa de 15 anos
            </h2>
            <p className="mx-auto mb-10 max-w-xl text-base leading-relaxed text-white/60">
              As datas mais desejadas se esgotam com antecedência. Entre em
              contato agora pelo WhatsApp e verifique a disponibilidade para o
              dia especial da sua filha.
            </p>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-gold px-8 py-4 text-sm font-medium tracking-wide text-white transition-colors duration-200 hover:bg-gold-dark"
            >
              <MessageCircle size={16} />
              Verificar disponibilidade
            </a>
          </div>
        </section>

        <FaqSection
          eyebrow="Perguntas frequentes · 15 Anos"
          title="Tudo que sua família precisa saber"
          intro="Reunimos as dúvidas mais frequentes de famílias que estão organizando a festa de 15 anos. Para qualquer pergunta adicional, fale com nossa equipe pelo WhatsApp."
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
