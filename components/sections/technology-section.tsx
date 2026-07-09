"use client";

import Image from "next/image";
import { useEffect, useRef, useCallback } from "react";

function ScrollRevealText({ text }: { text: string }) {
  const containerRef = useRef<HTMLParagraphElement>(null);
  const wordRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const rafRef = useRef<number | null>(null);

  const words = text.split(" ");

  useEffect(() => {
    const updateWords = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const startOffset = windowHeight * 0.9;
      const endOffset = windowHeight * 0.1;
      const totalDistance = startOffset - endOffset;
      const currentPosition = startOffset - rect.top;
      const progress = Math.max(0, Math.min(1, currentPosition / totalDistance));

      wordRefs.current.forEach((el, index) => {
        if (!el) return;
        const wordProgress = index / words.length;
        // Cor "apagada" precisa passar contraste AA sobre fundo branco
        // (era #e4e4e7, ~1.1:1; muted-foreground #737373 dá 4.7:1).
        el.style.color =
          progress > wordProgress ? "var(--foreground)" : "var(--muted-foreground)";
      });
    };
    const handleScroll = () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(updateWords);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    updateWords();
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [words.length]);

  return (
    <p
      ref={containerRef}
      className="text-3xl font-semibold leading-snug md:text-4xl lg:text-5xl"
    >
      {words.map((word, index) => (
        <span
          key={index}
          ref={(el) => { wordRefs.current[index] = el; }}
          className="transition-colors duration-150"
          style={{ color: "var(--muted-foreground)" }}
        >
          {word}
          {index < words.length - 1 ? " " : ""}
        </span>
      ))}
    </p>
  );
}

const sideImages = [
  {
    src: "/images/scenes/cerimonia/cerimonia-arco.webp",
    alt: "Cerimônia ao ar livre com arco floral",
    position: "left",
    span: 1,
  },
  {
    src: "/images/scenes/entrada/entrada-decorada.webp",
    alt: "Entrada decorada do Espaço Coral",
    position: "left",
    span: 1,
  },
  {
    src: "/images/scenes/terraco/terraco-noite.webp",
    alt: "Terraço panorâmico do Espaço Coral à noite",
    position: "right",
    span: 1,
  },
  {
    src: "/images/scenes/cerimonia/cerimonia-palmeiras.webp",
    alt: "Cerimônia ao ar livre entre palmeiras",
    position: "right",
    span: 1,
  },
];

const descriptionText =
  "Vivemos cada detalhe do seu evento. O Espaço Coral reúne estrutura impecável, ambientes versáteis e uma equipe dedicada para que você se preocupe apenas em aproveitar cada momento inesquecível.";

const titleLines = ["O Espaço.", "Perfeito.", "Para Você."];

export function TechnologySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const rightColRef = useRef<HTMLDivElement>(null);
  const centerRef = useRef<HTMLDivElement>(null);
  const titleWordsRef = useRef<(HTMLSpanElement | null)[]>([]);
  const sideWrappersRef = useRef<NodeListOf<HTMLDivElement> | null>(null);
  const rafRef = useRef<number | null>(null);

  const updateTransforms = useCallback(() => {
    if (!sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    const scrollableHeight = window.innerHeight * 2;
    const scrolled = -rect.top;
    const scrollProgress = Math.max(0, Math.min(1, scrolled / scrollableHeight));

    const imageProgress = Math.max(0, Math.min(1, (scrollProgress - 0.2) / 0.8));

    const centerWidth = 100 - imageProgress * 58;
    const sideWidth = imageProgress * 22;
    const sideOpacity = imageProgress;
    const sideTranslateLeft = -100 + imageProgress * 100;
    const sideTranslateRight = 100 - imageProgress * 100;
    const borderRadius = imageProgress * 24;
    const gap = imageProgress * 16;

    if (wrapperRef.current) {
      wrapperRef.current.style.gap = `${gap}px`;
      wrapperRef.current.style.padding = `${imageProgress * 16}px`;
    }
    if (leftColRef.current) {
      leftColRef.current.style.width = `${sideWidth}%`;
      leftColRef.current.style.gap = `${gap}px`;
      leftColRef.current.style.transform = `translateX(${sideTranslateLeft}%)`;
      leftColRef.current.style.opacity = String(sideOpacity);
    }
    if (rightColRef.current) {
      rightColRef.current.style.width = `${sideWidth}%`;
      rightColRef.current.style.gap = `${gap}px`;
      rightColRef.current.style.transform = `translateX(${sideTranslateRight}%)`;
      rightColRef.current.style.opacity = String(sideOpacity);
    }
    if (centerRef.current) {
      centerRef.current.style.width = `${centerWidth}%`;
      centerRef.current.style.borderRadius = `${borderRadius}px`;
    }

    // Title word fade
    titleLines.forEach((_, index) => {
      const el = titleWordsRef.current[index];
      if (!el) return;
      const wordFadeStart = index * 0.07;
      const wordFadeEnd = wordFadeStart + 0.07;
      const wordProgress = Math.max(0, Math.min(1, (scrollProgress - wordFadeStart) / (wordFadeEnd - wordFadeStart)));
      el.style.opacity = String(1 - wordProgress);
      el.style.transform = `translateY(${wordProgress * -12}px)`;
    });

    // Side image border radius
    if (sideWrappersRef.current) {
      sideWrappersRef.current.forEach((el) => { el.style.borderRadius = `${borderRadius}px`; });
    }
  }, []);

  useEffect(() => {
    if (sectionRef.current) {
      sideWrappersRef.current = sectionRef.current.querySelectorAll<HTMLDivElement>(".tech-side-img");
    }
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
    <section ref={sectionRef} className="relative bg-foreground">
      <div className="sticky top-0 h-screen overflow-hidden">
        <div className="flex h-full w-full items-center justify-center">
          <div
            ref={wrapperRef}
            className="relative flex h-full w-full items-stretch justify-center"
          >
            {/* Left Column */}
            <div
              ref={leftColRef}
              className="flex flex-col will-change-transform"
              style={{ width: "0%", opacity: 0 }}
            >
              {sideImages
                .filter((img) => img.position === "left")
                .map((img, idx) => (
                  <div
                    key={idx}
                    className="relative overflow-hidden will-change-transform tech-side-img"
                    style={{ flex: img.span }}
                  >
                    <Image
                      src={img.src}
                      alt={img.alt}
                      fill
                      quality={70}
                      sizes="(max-width: 768px) 28vw, 22vw"
                      className="object-cover"
                    />
                  </div>
                ))}
            </div>

            {/* Center Image */}
            <div
              ref={centerRef}
              className="relative overflow-hidden will-change-transform"
              style={{ width: "100%", height: "100%", flex: "0 0 auto" }}
            >
              <Image
                src="/images/scenes/salao/salao-mesa-flores.webp"
                alt="Salão do Espaço Coral decorado com flores"
                fill
                quality={60}
                sizes="100vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-foreground/40" />

              <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
                <h2 className="max-w-3xl font-medium leading-tight tracking-tight text-white md:text-5xl lg:text-7xl text-5xl">
                  {titleLines.map((line, index) => (
                    <span
                      key={index}
                      ref={(el) => { titleWordsRef.current[index] = el; }}
                      className="inline-block"
                      style={{ marginRight: index < 2 ? "0.3em" : "0" }}
                    >
                      {line}
                      {index === 1 && <br />}
                    </span>
                  ))}
                </h2>
              </div>
            </div>

            {/* Right Column */}
            <div
              ref={rightColRef}
              className="flex flex-col will-change-transform"
              style={{ width: "0%", opacity: 0 }}
            >
              {sideImages
                .filter((img) => img.position === "right")
                .map((img, idx) => (
                  <div
                    key={idx}
                    className="relative overflow-hidden will-change-transform tech-side-img"
                    style={{ flex: img.span }}
                  >
                    <Image
                      src={img.src}
                      alt={img.alt}
                      fill
                      quality={70}
                      sizes="(max-width: 768px) 28vw, 22vw"
                      className="object-cover"
                    />
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>

      {/* Scroll space */}
      <div className="h-[200vh]" />

      {/* ScrollRevealText */}
      <div className="relative overflow-hidden bg-background px-6 py-24 md:px-12 md:py-32 lg:px-20 lg:py-40">
        <div className="relative z-10 mx-auto max-w-4xl">
          <ScrollRevealText text={descriptionText} />
        </div>
      </div>
    </section>
  );
}
