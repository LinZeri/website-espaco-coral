import { Star } from "lucide-react";
import { FadeImage } from "@/components/fade-image";
import { TESTIMONIALS } from "@/data/testimonials";
import { REVIEWS, SOCIAL } from "@/lib/seo-config";

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`${rating} de 5 estrelas`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={16}
          className={
            i < rating ? "fill-gold text-gold" : "fill-border text-border"
          }
          aria-hidden="true"
        />
      ))}
    </div>
  );
}

export function TestimonialsSection() {
  return (
    <section id="depoimentos" className="bg-secondary/40">
      <div className="px-6 py-20 md:px-12 md:py-28 lg:px-20 lg:py-32">
        {/* Cabeçalho */}
        <div className="mx-auto max-w-2xl text-center">
          <p className="mb-4 text-xs uppercase tracking-widest text-muted-foreground">
            Avaliações reais
          </p>
          <h2 className="text-3xl font-medium tracking-tight text-foreground md:text-4xl lg:text-5xl">
            Nota máxima de quem
            <br />
            celebrou no Espaço Coral
          </h2>

          {/* Agregado do Google */}
          <a
            href={SOCIAL.googleMaps}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex items-center gap-3 rounded-full border border-border bg-background px-5 py-2.5 text-sm shadow-sm transition-colors hover:border-gold"
          >
            <span className="text-base font-semibold text-foreground">
              {REVIEWS.ratingValue.toLocaleString("pt-BR", {
                minimumFractionDigits: 1,
              })}
            </span>
            <Stars rating={REVIEWS.ratingValue} />
            <span className="text-muted-foreground">
              {REVIEWS.reviewCount} avaliações no Google
            </span>
          </a>
        </div>

        {/* Mural de depoimentos (masonry) */}
        <div className="mx-auto mt-14 max-w-6xl gap-5 [column-fill:_balance] sm:columns-2 lg:columns-3">
          {TESTIMONIALS.map((t) => (
            <figure
              key={t.name}
              className="mb-5 break-inside-avoid overflow-hidden rounded-2xl border border-border bg-background shadow-sm"
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden">
                <FadeImage
                  src={t.photo ?? t.fallbackImage}
                  alt={`Foto do evento de ${t.name} no Espaço Coral em Batatais SP`}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover"
                />
              </div>

              <div className="p-6">
                <Stars rating={t.rating} />
                <blockquote className="mt-4 text-[0.95rem] leading-relaxed text-foreground">
                  {t.text}
                </blockquote>
                <figcaption className="mt-5 flex items-center justify-between border-t border-border pt-4">
                  <div>
                    <p className="text-sm font-semibold text-foreground">
                      {t.name}
                    </p>
                    {t.eventType && (
                      <p className="text-xs text-muted-foreground">
                        {t.eventType}
                        {t.date ? ` · ${t.date}` : ""}
                      </p>
                    )}
                    {!t.eventType && t.date && (
                      <p className="text-xs text-muted-foreground">{t.date}</p>
                    )}
                  </div>
                  <span className="shrink-0 text-xs text-muted-foreground">
                    via Google
                  </span>
                </figcaption>
              </div>
            </figure>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <a
            href={SOCIAL.googleMaps}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-gold transition-colors hover:text-gold-dark"
          >
            Ver todas as avaliações no Google →
          </a>
        </div>
      </div>
    </section>
  );
}
