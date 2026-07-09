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

function GoogleLogo({ size = 18 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      aria-hidden="true"
      className="shrink-0"
    >
      <path
        fill="#4285F4"
        d="M45.12 24.5c0-1.56-.14-3.06-.4-4.5H24v8.51h11.84c-.51 2.75-2.06 5.08-4.39 6.64v5.52h7.11c4.16-3.83 6.56-9.47 6.56-16.17z"
      />
      <path
        fill="#34A853"
        d="M24 46c5.94 0 10.92-1.97 14.56-5.33l-7.11-5.52c-1.97 1.32-4.49 2.1-7.45 2.1-5.73 0-10.58-3.87-12.31-9.07H4.34v5.7C7.96 41.07 15.4 46 24 46z"
      />
      <path
        fill="#FBBC05"
        d="M11.69 28.18c-.44-1.32-.69-2.73-.69-4.18s.25-2.86.69-4.18v-5.7H4.34C2.85 17.09 2 20.45 2 24s.85 6.91 2.34 9.88l7.35-5.7z"
      />
      <path
        fill="#EA4335"
        d="M24 10.75c3.23 0 6.13 1.11 8.41 3.29l6.31-6.31C34.91 4.18 29.93 2 24 2 15.4 2 7.96 6.93 4.34 14.12l7.35 5.7c1.73-5.2 6.58-9.07 12.31-9.07z"
      />
    </svg>
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
    <section id="depoimentos" className="bg-cream">
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
            className="mt-8 inline-flex items-center gap-2.5 rounded-full border border-border bg-background px-5 py-2.5 text-sm shadow-sm transition-colors hover:border-gold"
          >
            <GoogleLogo size={20} />
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
          <div className="relative">
            <div
              ref={trackRef}
              className="no-scrollbar flex snap-x snap-mandatory overflow-x-auto scroll-smooth"
            >
              {TESTIMONIALS.map((t) => (
                <figure
                  key={t.name}
                  className="flex w-full shrink-0 snap-start flex-col overflow-hidden rounded-2xl border border-border bg-background shadow-sm"
                >
                  <div className="relative aspect-[3/2] w-full overflow-hidden">
                    <FadeImage
                      src={t.photo ?? t.fallbackImage}
                      alt={`Foto do evento de ${t.name} no Espaço Coral em Batatais SP`}
                      fill
                      quality={75}
                      sizes="(max-width: 768px) 100vw, 42rem"
                      className="object-cover"
                    />
                  </div>

                  <div className="flex flex-1 flex-col justify-center px-8 py-10 text-center md:px-12">
                    <span
                      aria-hidden="true"
                      className="mb-2 font-serif text-6xl leading-none text-gold/25"
                    >
                      &ldquo;
                    </span>
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

            {/* Setas: flanqueiam o card, alto contraste sobre a foto */}
            <button
              type="button"
              onClick={() => scrollToIndex(Math.max(0, activeIndex - 1))}
              disabled={activeIndex === 0}
              aria-label="Depoimento anterior"
              className="absolute left-2 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-foreground text-background shadow-lg transition-opacity hover:bg-gold disabled:pointer-events-none disabled:opacity-0 md:-left-5"
            >
              <ChevronLeft size={22} />
            </button>
            <button
              type="button"
              onClick={() =>
                scrollToIndex(Math.min(TESTIMONIALS.length - 1, activeIndex + 1))
              }
              disabled={activeIndex === TESTIMONIALS.length - 1}
              aria-label="Próximo depoimento"
              className="absolute right-2 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-foreground text-background shadow-lg transition-opacity hover:bg-gold disabled:pointer-events-none disabled:opacity-0 md:-right-5"
            >
              <ChevronRight size={22} />
            </button>
          </div>

          {/* Dots */}
          <div className="mt-6 flex items-center justify-center gap-2">
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
                    i === activeIndex ? "w-6 bg-gold" : "w-2.5 bg-foreground/25"
                  }`}
                />
              </button>
            ))}
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
