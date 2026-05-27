"use client";

import Image from "next/image";
import { useEffect, useRef, useCallback } from "react";

export function PhilosophySection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const leftImgRef = useRef<HTMLDivElement>(null);
  const rightImgRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);

  const updateTransforms = useCallback(() => {
    if (!sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    const sectionHeight = sectionRef.current.offsetHeight;
    const scrollableRange = sectionHeight - windowHeight;
    const scrolled = -rect.top;
    const progress = Math.max(0, Math.min(1, scrolled / scrollableRange));

    const tx = (1 - progress) * 100;

    if (leftImgRef.current) {
      leftImgRef.current.style.transform = `translate3d(${-tx}%, 0, 0)`;
    }
    if (rightImgRef.current) {
      rightImgRef.current.style.transform = `translate3d(${tx}%, 0, 0)`;
    }
    if (titleRef.current) {
      titleRef.current.style.opacity = String(1 - progress);
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(updateTransforms);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    updateTransforms();
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [updateTransforms]);

  return (
    <section id="ambientes" className="bg-background">
      <div ref={sectionRef} className="relative" style={{ height: "200vh" }}>
        <div className="sticky top-0 h-screen flex items-center justify-center">
          <div className="relative w-full">
            {/* Title - fades as images approach */}
            <div
              ref={titleRef}
              className="absolute inset-0 flex items-center justify-center pointer-events-none z-0"
            >
              <h2 className="text-[12vw] font-medium leading-[0.95] tracking-tighter text-foreground md:text-[10vw] lg:text-[8vw] text-center px-6">
                Casamentos & Eventos.
              </h2>
            </div>

            {/* Image Grid */}
            <div className="relative z-10 grid grid-cols-1 gap-4 px-6 md:grid-cols-2 md:px-12 lg:px-20">
              {/* Left image - slides from left */}
              <div
                ref={leftImgRef}
                className="relative aspect-[4/3] overflow-hidden rounded-2xl will-change-transform"
                style={{
                  transform: "translate3d(-100%, 0, 0)",
                  backfaceVisibility: "hidden",
                  WebkitBackfaceVisibility: "hidden",
                }}
              >
                <Image
                  src="/images/scenes/casamentos/salao-decorado.webp"
                  alt="Salão do Espaço Coral decorado para casamento"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>

              {/* Right image - slides from right */}
              <div
                ref={rightImgRef}
                className="relative aspect-[4/3] overflow-hidden rounded-2xl will-change-transform"
                style={{
                  transform: "translate3d(100%, 0, 0)",
                  backfaceVisibility: "hidden",
                  WebkitBackfaceVisibility: "hidden",
                }}
              >
                <Image
                  src="/images/scenes/cerimonia/cerimonia-arco.webp"
                  alt="Cerimônia ao ar livre com arco floral no Espaço Coral"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Description */}
      <div className="px-6 py-20 md:px-12 md:py-28 lg:px-20 lg:py-36 lg:pb-14">
        <div className="text-center">
          <p className="text-xs uppercase tracking-widest text-muted-foreground">
            Batatais, São Paulo
          </p>
          <p className="mt-8 leading-relaxed text-muted-foreground text-3xl text-center">
            Do casamento dos sonhos à festa de 15 anos perfeita, o Espaço Coral
            oferece ambientes sofisticados e uma equipe dedicada para cada detalhe
            do seu evento.
          </p>
        </div>
      </div>
    </section>
  );
}
