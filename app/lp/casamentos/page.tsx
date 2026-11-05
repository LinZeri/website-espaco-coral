import type { Metadata } from "next";
import Image from "next/image";
import { Star } from "lucide-react";
import { LpWhatsAppCta } from "@/components/lp/whatsapp-cta";
import { TESTIMONIALS } from "@/data/testimonials";
import { REVIEWS } from "@/lib/seo-config";

/**
 * LP de campanha: Casamentos (Google Ads).
 * URL: /lp/casamentos. NOINDEX obrigatório (ver app/lp/layout.tsx).
 * Copy usa só fatos de docs/business-context.md. Nunca exibir preços.
 */
export const metadata: Metadata = {
  title: "Casamento em Batatais, SP | Espaço Coral",
  description:
    "Cerimônia ao céu aberto, salão envidraçado climatizado e sala privativa da noiva para até 320 convidados em Batatais, SP. Consulte a disponibilidade da sua data.",
  robots: {
    index: false,
    follow: false,
    googleBot: { index: false, follow: false },
  },
};

const LP = "casamentos";
const MSG =
  "Olá! Vi o anúncio do Espaço Coral e gostaria de verificar a disponibilidade de data para o meu casamento.";

const PRIMARY_BTN =
  "inline-flex items-center justify-center gap-2 bg-gold px-8 py-4 text-sm font-medium tracking-wide text-foreground transition-colors duration-200 hover:bg-gold-light";

const DIFERENCIAIS = [
  {
    label: "Ao ar livre",
    title: "Cerimônia ao céu aberto",
    text: "Área verde dedicada para o sim, no mesmo terreno da festa. Seus convidados não precisam se deslocar entre cerimônia e recepção.",
  },
  {
    label: "Salão",
    title: "Panorâmico e envidraçado",
    text: "Salão principal todo de vidro e climatizado, com mesas e cadeiras para até 320 convidados sentados.",
  },
  {
    label: "Exclusividade",
    title: "Sala privativa da noiva",
    text: "Cadeira de maquiagem, banheiro e chuveiro exclusivos, para se preparar com calma até a hora da entrada.",
  },
  {
    label: "Tranquilidade",
    title: "Estrutura completa",
    text: "Estacionamento com orientadores, espaço kids com monitora, camareira nos banheiros e gerador de energia.",
  },
];

const FOTOS = [
  {
    src: "/images/events/casamento-nathalia-e-lin/26-noiva-e-pai-na-entrada.webp",
    alt: "Noiva entrando com o pai na cerimônia ao ar livre do Espaço Coral",
  },
  {
    src: "/images/events/casamento-nathalia-e-lin/29-noivos-durante-a-cerimonia.webp",
    alt: "Noivos durante a cerimônia ao céu aberto no Espaço Coral",
  },
  {
    src: "/images/events/casamento-nathalia-e-lin/09-noiva-sala-da-noiva.webp",
    alt: "Noiva se preparando na sala privativa do Espaço Coral",
  },
  {
    src: "/images/hero/espaco-coral-hero-salao-panoramico-01.webp",
    alt: "Mesa de bolo de casamento decorada com flores no salão do Espaço Coral",
  },
  {
    src: "/images/events/casamento-nathalia-e-lin/36-decoracao-entrada-do-salao.webp",
    alt: "Decoração na entrada do salão em casamento no Espaço Coral",
  },
  {
    src: "/images/events/casamento-nathalia-e-lin/33-casal-destaque-2.webp",
    alt: "Casal de noivos em foto no Espaço Coral, Batatais SP",
  },
];

const PASSOS = [
  {
    n: "01",
    title: "Envie sua data",
    text: "Mande pelo WhatsApp a data que você imagina e o número estimado de convidados.",
  },
  {
    n: "02",
    title: "Visite o espaço",
    text: "Agende uma visita sem compromisso e conheça cada ambiente pessoalmente.",
  },
  {
    n: "03",
    title: "Reserve a data",
    text: "Gostou? Formalizamos a reserva e seguimos juntos no planejamento.",
  },
];

// Depoimentos reais do Google, só os que têm foto do cliente.
const DEPOIMENTOS = TESTIMONIALS.filter((t) => t.photo).slice(0, 3);

function Stars({ size = 16 }: { size?: number }) {
  return (
    <div className="flex gap-1" role="img" aria-label="5 de 5 estrelas">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} size={size} className="fill-gold text-gold" aria-hidden="true" />
      ))}
    </div>
  );
}

export default function LpCasamentosPage() {
  return (
    <main>
      {/* Hero */}
      <section className="relative flex min-h-[100svh] items-end overflow-hidden">
        <Image
          src="/images/events/casamento-nathalia-e-lin/21-decoracao-cerimonia-ar-livre.webp"
          alt="Corredor florido da cerimônia de casamento ao ar livre no Espaço Coral em Batatais, SP"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/30" />
        <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-16 pt-32 md:pb-24 lg:px-10">
          <p className="mb-5 text-xs uppercase tracking-[0.25em] text-gold-light">
            Casamentos · Batatais, SP
          </p>
          <h1 className="font-display max-w-3xl text-4xl font-normal leading-[1.1] tracking-tight text-white md:text-6xl lg:text-7xl">
            O cenário do seu sim, do céu aberto à última dança.
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-white/80 md:text-lg">
            12.000 m² com cerimônia ao ar livre, salão envidraçado climatizado e
            sala privativa da noiva, para até 320 convidados. Pertinho de
            Ribeirão Preto e Franca.
          </p>
          <div className="mt-10 flex flex-col gap-5 sm:flex-row sm:items-center">
            <LpWhatsAppCta lp={LP} position="hero" message={MSG} className={PRIMARY_BTN}>
              Consultar disponibilidade da data
            </LpWhatsAppCta>
            <div className="flex items-center gap-3 text-sm text-white/80">
              <Stars />
              <span>
                {REVIEWS.ratingValue.toLocaleString("pt-BR", { minimumFractionDigits: 1 })} no
                Google · {REVIEWS.reviewCount} avaliações
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Diferenciais */}
      <section className="bg-background px-6 py-20 md:px-12 md:py-28">
        <div className="mx-auto max-w-6xl">
          <h2 className="font-display mx-auto mb-14 max-w-2xl text-center text-3xl font-normal tracking-tight text-foreground md:text-5xl">
            Cerimônia e festa no mesmo lugar
          </h2>
          <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {DIFERENCIAIS.map((item) => (
              <div key={item.title} className="border-l-2 border-gold pl-6">
                <p className="mb-2 text-xs uppercase tracking-wider text-gold-text">
                  {item.label}
                </p>
                <h3 className="font-display mb-3 text-2xl font-normal tracking-tight text-foreground">
                  {item.title}
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Fotos */}
      <section className="bg-cream px-4 py-16 md:px-8 md:py-24">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-3 md:grid-cols-3 md:gap-4">
          {FOTOS.map((foto) => (
            <div key={foto.src} className="relative aspect-[4/5] overflow-hidden rounded-xl">
              <Image
                src={foto.src}
                alt={foto.alt}
                fill
                sizes="(max-width: 768px) 50vw, 33vw"
                className="object-cover"
              />
            </div>
          ))}
        </div>
        <div className="mt-12 text-center">
          <LpWhatsAppCta lp={LP} position="fotos" message={MSG} className={PRIMARY_BTN}>
            Quero conhecer o espaço
          </LpWhatsAppCta>
        </div>
      </section>

      {/* Depoimentos */}
      {DEPOIMENTOS.length > 0 && (
        <section className="bg-background px-6 py-20 md:px-12 md:py-28">
          <div className="mx-auto max-w-6xl">
            <div className="mb-14 flex flex-col items-center text-center">
              <Stars size={20} />
              <h2 className="font-display mt-5 text-3xl font-normal tracking-tight text-foreground md:text-5xl">
                Nota {REVIEWS.ratingValue.toLocaleString("pt-BR", { minimumFractionDigits: 1 })} em{" "}
                {REVIEWS.reviewCount} avaliações no Google
              </h2>
            </div>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              {DEPOIMENTOS.map((t) => (
                <figure key={t.name} className="flex flex-col bg-cream p-6">
                  {t.photo && (
                    <div className="relative mb-5 aspect-[4/3] overflow-hidden rounded-lg">
                      <Image
                        src={t.photo}
                        alt={`Evento de ${t.name} no Espaço Coral`}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover"
                      />
                    </div>
                  )}
                  <Stars size={14} />
                  <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-foreground/80">
                    “{t.text}”
                  </blockquote>
                  <figcaption className="mt-5 text-sm font-medium text-foreground">
                    {t.name}
                    {t.eventType && (
                      <span className="font-normal text-muted-foreground"> · {t.eventType}</span>
                    )}
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Como funciona */}
      <section className="bg-secondary/40 px-6 py-20 md:px-12 md:py-28">
        <div className="mx-auto max-w-5xl">
          <h2 className="font-display mb-14 text-center text-3xl font-normal tracking-tight text-foreground md:text-5xl">
            Como reservar a sua data
          </h2>
          <ol className="grid grid-cols-1 gap-10 md:grid-cols-3">
            {PASSOS.map((p) => (
              <li key={p.n}>
                <span className="font-display text-3xl text-gold-text">{p.n}</span>
                <h3 className="font-display mt-3 text-2xl font-normal text-foreground">{p.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* CTA final */}
      <section className="bg-sand px-6 py-24 text-center md:px-12">
        <div className="mx-auto max-w-3xl">
          <div className="gold-divider mx-auto mb-10 w-16 opacity-60" />
          <h2 className="font-display text-4xl font-normal tracking-tight text-foreground md:text-6xl">
            Sua data ainda está livre?
          </h2>
          <p className="mx-auto mt-6 max-w-lg text-base leading-relaxed text-foreground/70">
            Fale com a nossa equipe pelo WhatsApp, consulte a disponibilidade e
            agende uma visita sem compromisso. Rua Matheus Marinelli, 18, Jardim
            Elena, Batatais, SP.
          </p>
          <div className="mt-10">
            <LpWhatsAppCta lp={LP} position="final" message={MSG} className={PRIMARY_BTN}>
              Consultar disponibilidade pelo WhatsApp
            </LpWhatsAppCta>
          </div>
        </div>
      </section>

      {/* Botão flutuante (mobile em barra, desktop em pílula) */}
      <LpWhatsAppCta
        lp={LP}
        position="flutuante"
        message={MSG}
        ariaLabel="Consultar disponibilidade pelo WhatsApp"
        className="fixed inset-x-4 bottom-4 z-50 flex items-center justify-center gap-2 bg-[#25D366] px-5 py-4 text-sm font-medium text-white shadow-lg transition-colors hover:bg-[#20ba5a] md:inset-x-auto md:right-6 md:bottom-6"
      >
        Consultar data no WhatsApp
      </LpWhatsAppCta>
    </main>
  );
}
