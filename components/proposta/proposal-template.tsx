import { MessageCircle } from "lucide-react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { WhatsAppButton } from "@/components/layout/whatsapp-button";
import { PageHero } from "@/components/sections/page-hero";
import { FadeImage } from "@/components/fade-image";
import { Reveal } from "@/components/reveal";
import { cn } from "@/lib/utils";
import type { ProposalBlock, ProposalData } from "@/lib/proposta/data";

const WHATSAPP_BASE = "https://wa.me/5516991294178?text=";

/**
 * Template de página de proposta privada (buffet / decoração).
 *
 * Renderiza hero + introdução + blocos de itens (com foto opcional ao lado,
 * alternando os lados) + condições comerciais + CTA de WhatsApp.
 * Animações de entrada via <Reveal> (scroll) e <FadeImage> (load).
 *
 * Sem schema e sem SEO: estas páginas são noindex (app/proposta/layout.tsx)
 * e ficam fora do sitemap.
 */
export function ProposalTemplate({ data }: { data: ProposalData }) {
  const whatsappUrl = `${WHATSAPP_BASE}${encodeURIComponent(data.whatsappText)}`;

  return (
    <>
      <Header />
      <main>
        <PageHero
          title={data.name}
          subtitle={data.tagline}
          imageSrc={data.heroImage}
          imageAlt={data.heroAlt}
          subtitleClassName="text-sm font-bold text-white [text-shadow:0_2px_10px_rgba(0,0,0,0.75)]"
          titleClassName="[text-shadow:0_3px_18px_rgba(0,0,0,0.55)]"
        />

        {/* Introdução */}
        <section className="bg-background px-6 py-20 md:px-12 md:py-28 lg:px-20 lg:py-32">
          <Reveal className="mx-auto max-w-3xl text-center">
            <p className="mb-6 text-xs uppercase tracking-widest text-muted-foreground">
              Proposta Espaço Coral
            </p>
            <p className="text-2xl leading-relaxed text-foreground md:text-3xl">
              {data.intro}
            </p>
          </Reveal>
        </section>

        {/* Blocos do cardápio / decoração */}
        <section className="bg-background px-6 pb-20 md:px-12 md:pb-28 lg:px-20 lg:pb-32">
          <div className="mx-auto max-w-5xl space-y-12 md:space-y-16">
            {data.blocks.map((block, i) => (
              <ProposalBlockView
                key={block.eyebrow}
                block={block}
                index={i}
                align={data.imageAlign ?? "start"}
              />
            ))}
          </div>
        </section>

        {/* Condições comerciais */}
        {data.conditions && (
          <section className="bg-sand px-6 py-20 md:px-12 md:py-28 lg:px-20 lg:py-32">
            <Reveal className="mx-auto max-w-3xl">
              <p className="text-xs uppercase tracking-widest text-gold-dark">
                Condições
              </p>
              <h2 className="font-display mt-4 text-4xl font-normal tracking-tight text-foreground md:text-5xl">
                Condições comerciais
              </h2>

              <div className="mt-12 grid grid-cols-1 gap-10 md:grid-cols-2">
                <div className="border border-foreground/15 p-6">
                  <p className="mb-4 text-xs uppercase tracking-widest text-gold-dark">
                    Crianças
                  </p>
                  <ul className="space-y-2">
                    {data.conditions.criancas.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-3 text-sm text-foreground/70"
                      >
                        <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-gold" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="border border-foreground/15 p-6">
                  <p className="mb-4 text-xs uppercase tracking-widest text-gold-dark">
                    Formas de pagamento
                  </p>
                  <ul className="space-y-2">
                    {data.conditions.pagamento.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-3 text-sm text-foreground/70"
                      >
                        <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-gold" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Reveal>
          </section>
        )}

        {/* CTA WhatsApp */}
        <section className="bg-background px-6 py-20 md:px-12 md:py-28 lg:px-20 lg:py-32">
          <Reveal className="mx-auto max-w-2xl text-center">
            <div className="gold-divider mx-auto mb-10 w-16 opacity-50" />
            <h2 className="font-display mb-6 text-4xl font-normal tracking-tighter text-foreground md:text-5xl">
              Vamos fechar a sua data?
            </h2>
            <p className="mx-auto mb-10 max-w-lg text-base leading-relaxed text-muted-foreground">
              Fale com a nossa equipe pelo WhatsApp para tirar dúvidas, ajustar
              detalhes e garantir o seu evento no Espaço Coral.
            </p>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-gold px-8 py-4 text-sm font-medium tracking-wide text-foreground transition-colors duration-200 hover:bg-gold-light"
            >
              <MessageCircle size={16} />
              Falar pelo WhatsApp
            </a>
          </Reveal>
        </section>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}

function BlockBody({ block }: { block: ProposalBlock }) {
  return (
    <>
      <div>
        <h2 className="font-display text-2xl font-normal tracking-tight text-foreground md:text-3xl">
          {block.eyebrow}
        </h2>
        {block.note && (
          <p className="mt-1.5 text-sm font-semibold text-gold-dark">
            {block.note}
          </p>
        )}
      </div>

      <div className="mt-6 space-y-6">
        {block.groups.map((group, i) => (
          <div key={group.subtitle ?? i}>
            {group.subtitle && (
              <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-foreground/80">
                {group.subtitle}
              </p>
            )}
            <ul className="space-y-2">
              {group.items.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 text-base leading-relaxed text-muted-foreground"
                >
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </>
  );
}

function ProposalBlockView({
  block,
  index,
  align,
}: {
  block: ProposalBlock;
  index: number;
  align: "start" | "center";
}) {
  // Sem foto: bloco de texto em coluna de leitura.
  if (!block.image) {
    return (
      <Reveal className="border-t border-border pt-10">
        <div className="max-w-3xl">
          <BlockBody block={block} />
        </div>
      </Reveal>
    );
  }

  // Com foto: layout em 2 colunas, alternando o lado da imagem.
  const imageRight = index % 2 === 1;

  return (
    <Reveal className="border-t border-border pt-10">
      <div
        className={cn(
          "grid grid-cols-1 items-start gap-8 md:grid-cols-2 md:gap-12 lg:gap-16",
          align === "center" && "md:items-center"
        )}
      >
        <div className={imageRight ? "md:order-2" : "md:order-1"}>
          <FadeImage
            src={block.image.src}
            alt={block.image.alt}
            width={block.image.w}
            height={block.image.h}
            sizes="(max-width: 768px) 100vw, 40vw"
            className="mx-auto w-full max-w-md rounded-2xl object-cover md:mx-0"
          />
        </div>
        <div className={imageRight ? "md:order-1" : "md:order-2"}>
          <BlockBody block={block} />
        </div>
      </div>
    </Reveal>
  );
}
