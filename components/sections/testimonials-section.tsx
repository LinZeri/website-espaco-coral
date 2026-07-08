"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { FadeImage } from "@/components/fade-image";
import { TESTIMONIALS } from "@/data/testimonials";
import { REVIEWS, SOCIAL } from "@/lib/seo-config";

function Stars({
  rating,
  size = 16,
  className = "",
}: {
  rating: number;
  size?: number;
  className?: string;
}) {
  return (
    <div
      role="img"
      className={`flex justify-center gap-1 ${className}`}
      aria-label={`${rating} de 5 estrelas`}
    >
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={size}
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
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const scrollToIndex = useCallback((index: number) => {
    const track = trackRef.current;
    if (!track) return;
    const slide = track.children[index] as HTMLElement | undefined;
    slide?.scrollIntoView({ behavior: "smooth", inline: "start", block: "nearest" });
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    let rafId: number | null = null;
    const handleScroll = () => {
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        const index = Math.round(track.scrollLeft / track.clientWidth);
        setActiveIndex((prev) => (prev === index ? prev : index));
      });
    };

    track.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      track.removeEventListener("scroll", handleScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

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

        {/* Carrossel de depoimentos */}
        <div className="mx-auto mt-14 max-w-2xl">
          <div
            ref={trackRef}
            className="no-scrollbar flex snap-x snap-mandatory overflow-x-auto scroll-smooth"
          >
            {TESTIMONIALS.map((t) => (
              <figure
                key={t.name}
                className="w-full shrink-0 snap-start overflow-hidden rounded-2xl border border-border bg-background shadow-sm"
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden">
                  <FadeImage
                    src={t.photo ?? t.fallbackImage}
                    alt={`Foto do evento de ${t.name} no Espaço Coral em Batatais SP`}
                    fill
                    quality={60}
                    sizes="(max-width: 768px) 100vw, 42rem"
                    className="object-cover"
                  />
                </div>

                <div className="p-8 text-center md:p-10">
                  <Stars rating={t.rating} size={22} />
                  <figcaption className="mt-4">
                    <p className="text-base font-semibold text-foreground">
                      {t.name}
                    </p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      {[t.eventType, t.date, "via Google"]
                        .filter(Boolean)
                        .join(" · ")}
                    </p>
                  </figcaption>
                  <blockquote className="mt-6 text-[0.95rem] leading-relaxed text-foreground">
                    {t.text}
                  </blockquote>
                </div>
              </figure>
            ))}
          </div>

          {/* Navegação */}
          <div className="mt-6 flex items-center justify-center gap-4">
            <button
              type="button"
              onClick={() => scrollToIndex(Math.max(0, activeIndex - 1))}
              disabled={activeIndex === 0}
              aria-label="Depoimento anterior"
              className="rounded-full border border-border bg-background p-2 text-foreground shadow-sm transition-colors hover:border-gold disabled:cursor-not-allowed disabled:opacity-30"
            >
              <ChevronLeft size={18} />
            </button>

            <div className="flex items-center gap-2">
              {TESTIMONIALS.map((t, i) => (
                <button
                  key={t.name}
                  type="button"
                  onClick={() => scrollToIndex(i)}
                  aria-label={`Ir para depoimento de ${t.name}`}
                  className="flex h-6 min-w-6 items-center justify-center"
                >
                  <span
                    aria-hidden="true"
                    className={`h-2 rounded-full transition-all ${
                      i === activeIndex ? "w-6 bg-gold" : "w-2 bg-muted-foreground"
                    }`}
                  />
                </button>
              ))}
            </div>

            <button
              type="button"
              onClick={() =>
                scrollToIndex(Math.min(TESTIMONIALS.length - 1, activeIndex + 1))
              }
              disabled={activeIndex === TESTIMONIALS.length - 1}
              aria-label="Próximo depoimento"
              className="rounded-full border border-border bg-background p-2 text-foreground shadow-sm transition-colors hover:border-gold disabled:cursor-not-allowed disabled:opacity-30"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <a
            href={SOCIAL.googleMaps}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-gold-text transition-colors hover:text-foreground"
          >
            Ver todas as avaliações no Google →
          </a>
        </div>
      </div>
    </section>
  );
}
