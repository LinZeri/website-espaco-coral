import type { Metadata } from "next";
import dynamic from "next/dynamic";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { WhatsAppButton } from "@/components/layout/whatsapp-button";
import { PageHero } from "@/components/sections/page-hero";
import { FadeImage } from "@/components/fade-image";
import { Reveal } from "@/components/reveal";
import { JsonLd } from "@/components/seo/json-ld";
import { mobiliarioSchema } from "@/lib/schema";

const CtaSection = dynamic(() =>
  import("@/components/sections/cta-section").then((m) => m.CtaSection)
);

export const metadata: Metadata = {
  title: "Mobiliário Incluso: Mesas e Cadeiras",
  description:
    "Conheça o mobiliário incluso no Espaço Coral: 320 cadeiras Versalles, mesas Venezza, Roma, Paris e Dior, balcões, cozinha industrial completa e lounge na varanda.",
  alternates: { canonical: "https://coraleventos.com.br/estrutura/mobiliario" },
  openGraph: {
    title: "Mobiliário Incluso no Espaço Coral, Batatais, SP",
    description:
      "Mesas, cadeiras Versalles, balcões, cozinha industrial e lounge na varanda. Veja todo o mobiliário disponível para o seu evento.",
    url: "https://coraleventos.com.br/estrutura/mobiliario",
    images: [
      {
        url: "/og/estrutura.jpg",
        width: 1200,
        height: 630,
        alt: "Salão do Espaço Coral montado com mesas e cadeiras em Batatais, SP",
      },
    ],
  },
};

const inventario = [
  {
    categoria: "Salão",
    itens: [
      "3 balcões Marrocos (1,60 × 0,50 m)",
      "15 banquetas Marrocos",
      "320 cadeiras Versalles",
      "30 mesas Venezza redondas (1,60 m de diâmetro)",
      "2 mesas Roma (3,3 × 1,0 m)",
      "1 mesa Paris (4,60 × 1,20 m)",
      "1 mesa Dior (1,60 × 0,80 m)",
      "1 mesa Espanha (2,0 × 0,80 m)",
      "1 buffet fixo em granito",
    ],
  },
  {
    categoria: "Cozinha e bar",
    itens: [
      "8 cervejeiras",
      "1 forno industrial",
      "1 fogão industrial",
      "1 geladeira",
      "1 freezer",
      "1 mesa de inox de 2 m",
      "1 chapa industrial",
    ],
  },
  {
    categoria: "Varanda",
    itens: ["3 sofás Rami", "6 poltronas Rami", "3 mesas de centro Rami"],
  },
];

export default function MobiliarioPage() {
  return (
    <>
      <JsonLd data={mobiliarioSchema()} />
      <Header />
      <main>
        <PageHero
          title="Mobiliário"
          subtitle="Incluso na estrutura"
          imageSrc="/images/scenes/salao/espaco-coral-salao-cerejeiras-panoramico-13.webp"
          imageAlt="Salão do Espaço Coral montado com mesas redondas e cadeiras Versalles em Batatais SP"
        />

        {/* Intro */}
        <section className="bg-background px-6 py-20 md:px-12 md:py-28 lg:px-20 lg:py-32">
          <Reveal className="mx-auto max-w-3xl">
            <Link
              href="/estrutura"
              className="mb-8 inline-flex items-center gap-1 text-xs uppercase tracking-widest text-muted-foreground transition-colors hover:text-gold-dark"
            >
              <ChevronLeft size={14} />
              Voltar para a estrutura
            </Link>
            <p className="mb-6 text-xs uppercase tracking-widest text-muted-foreground">
              Tudo incluso
            </p>
            <h2 className="font-display mb-8 text-4xl font-normal tracking-tight text-foreground md:text-5xl">
              O mobiliário do seu evento já está aqui
            </h2>
            <p className="text-base leading-relaxed text-muted-foreground">
              Mesas, cadeiras, balcões, cozinha industrial completa e lounge na
              varanda fazem parte da estrutura do Espaço Coral, disponíveis para o
              seu evento sem custo adicional. Você economiza com locação e ganha
              tempo no planejamento.
            </p>
          </Reveal>
        </section>

        {/* Inventário */}
        <section className="bg-foreground px-6 pb-20 pt-4 md:px-12 md:pb-28 lg:px-20 lg:pb-32">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {inventario.map((grupo, i) => (
              <Reveal
                key={grupo.categoria}
                delay={i * 90}
                className="border border-white/10 p-6"
              >
                <p className="mb-4 text-xs uppercase tracking-widest text-gold">
                  {grupo.categoria}
                </p>
                <ul className="space-y-2">
                  {grupo.itens.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-3 text-sm text-white/70"
                    >
                      <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-gold" />
                      {item}
                    </li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Imagem + texto */}
        <section className="bg-background px-6 py-20 md:px-12 md:py-28 lg:px-20 lg:py-32">
          <Reveal className="grid grid-cols-1 items-center gap-12 md:grid-cols-2 md:gap-16 lg:gap-24">
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
              <FadeImage
                src="/images/scenes/terraco/espaco-coral-terraco-02.webp"
                alt="Lounge com sofás e poltronas Rami na varanda do Espaço Coral em Batatais"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
            <div>
              <p className="mb-4 text-xs uppercase tracking-widest text-gold">
                Conforto em cada ambiente
              </p>
              <h2 className="font-display mb-6 text-4xl font-normal tracking-tight text-foreground md:text-5xl">
                Da pista ao lounge da varanda
              </h2>
              <p className="text-base leading-relaxed text-muted-foreground">
                Além das mesas e cadeiras do salão, a varanda conta com um lounge
                de sofás e poltronas Rami, perfeito para os momentos de descanso e
                conversa durante a festa. Agende uma visita pelo WhatsApp e conheça
                cada detalhe pessoalmente.
              </p>
            </div>
          </Reveal>
        </section>

        <CtaSection />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
