"use client";

import Image from "next/image";
import { ChevronDown } from "lucide-react";
import { useEffect, useRef } from "react";

const word = "CORAL";

const sideImages = [
  {
    src: "/images/hero/espaco-coral-hero-cerimonia-ao-ar-livre-01.webp",
    alt: "Cerimônia de casamento ao ar livre no jardim do Espaço Coral em Batatais SP",
    position: "left",
    span: 1,
  },
  {
    src: "/images/hero/espaco-coral-hero-decoracao-luxo-01.webp",
    alt: "Decoração de luxo para casamento no salão do Espaço Coral em Batatais",
    position: "left",
    span: 1,
  },
  {
    src: "/images/hero/espaco-coral-hero-espaco-elegante-01.webp",
    alt: "Ambiente elegante do Espaço Coral para festas e eventos em Batatais SP",
    position: "right",
    span: 1,
  },
  {
    src: "/images/hero/espaco-coral-hero-salao-sofas-cerejeiras-02.webp",
    alt: "Salão do Espaço Coral com sofás e cerejeiras decorativas em Batatais SP",
    position: "right",
    span: 1,
  },
];

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const rightColRef = useRef<HTMLDivElement>(null);
  const centerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const sideWrappersRef = useRef<NodeListOf<HTMLDivElement> | null>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    if (sectionRef.current) {
      sideWrappersRef.current = sectionRef.current.querySelectorAll<HTMLDivElement>(".side-img-wrapper");
    }
    const updateTransforms = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const scrollableHeight = window.innerHeight * 2;
      const scrolled = -rect.top;
      const progress = Math.max(0, Math.min(1, scrolled / scrollableHeight));

      const textOpacity = Math.max(0, 1 - progress / 0.2);
      const imageProgress = Math.max(0, Math.min(1, (progress - 0.2) / 0.8));

      const centerWidth = 100 - imageProgress * 58;
      const centerHeight = 100 - imageProgress * 30;
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
        leftColRef.current.style.height = `${centerHeight}%`;
        leftColRef.current.style.gap = `${gap}px`;
        leftColRef.current.style.transform = `translateX(${sideTranslateLeft}%)`;
        leftColRef.current.style.opacity = String(sideOpacity);
      }
      if (rightColRef.current) {
        rightColRef.current.style.width = `${sideWidth}%`;
        rightColRef.current.style.height = `${centerHeight}%`;
        rightColRef.current.style.gap = `${gap}px`;
        rightColRef.current.style.transform = `translateX(${sideTranslateRight}%)`;
        rightColRef.current.style.opacity = String(sideOpacity);
      }
      if (centerRef.current) {
        centerRef.current.style.width = `${centerWidth}%`;
        centerRef.current.style.height = `${centerHeight}%`;
        centerRef.current.style.borderRadius = `${borderRadius}px`;
      }
      if (textRef.current) {
        textRef.current.style.opacity = String(textOpacity);
      }

      // Apply borderRadius to side image wrappers
      if (sideWrappersRef.current) {
        sideWrappersRef.current.forEach((el) => {
          el.style.borderRadius = `${borderRadius}px`;
        });
      }
    };

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
  }, []);

  return (
    <section ref={sectionRef} className="relative bg-background">
      <div className="sticky top-0 h-screen overflow-hidden">
        <div className="flex h-full w-full items-center justify-center">
          <div
            ref={wrapperRef}
            className="relative flex h-full w-full items-center justify-center"
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
                    className="relative overflow-hidden will-change-transform side-img-wrapper"
                    style={{ flex: img.span }}
                  >
                    <Image
                      src={img.src}
                      alt={img.alt}
                      fill
                      sizes="(max-width: 768px) 0vw, 22vw"
                      className="object-cover"
                    />
                  </div>
                ))}
            </div>

            {/* Main Hero Image */}
            <div
              ref={centerRef}
              className="relative overflow-hidden will-change-transform"
              style={{ width: "100%", height: "100%", flex: "0 0 auto" }}
            >
              <Image
                src="/images/hero/espaco-coral-hero-salao-recepcao-mesas-01.webp"
                alt="Salão do Espaço Coral montado para recepção de casamento com mesas postas e arranjos florais em Batatais SP"
                fill
                priority
                sizes="100vw"
                className="object-cover"
              />

              {/* Overlay Text */}
              <div
                ref={textRef}
                className="absolute inset-0 flex items-end overflow-hidden"
              >
                <h1 className="flex w-full items-end whitespace-nowrap text-[22vw] font-medium leading-[0.8] tracking-tighter text-white">
                  {word.split("").map((letter, index) => (
                    <span
                      key={index}
                      className="inline-block animate-[slideUp_0.8s_ease-out_forwards] opacity-0"
                      style={{
                        animationDelay: `${index * 0.08}s`,
                        transition: "all 1.5s",
                        transitionTimingFunction: "cubic-bezier(0.86, 0, 0.07, 1)",
                      }}
                    >
                      {letter}
                    </span>
                  ))}
                  <ChevronDown
                    aria-hidden="true"
                    strokeWidth={2.5}
                    className="ml-[0.04em] mb-[0.04em] h-[0.58em] w-[0.58em] animate-scroll-hint self-end"
                  />
                </h1>
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
                    className="relative overflow-hidden will-change-transform side-img-wrapper"
                    style={{ flex: img.span }}
                  >
                    <Image
                      src={img.src}
                      alt={img.alt}
                      fill
                      sizes="(max-width: 768px) 0vw, 22vw"
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

      {/* Tagline */}
      <div className="px-6 pt-32 pb-28 md:pt-48 md:px-12 md:pb-36 lg:px-20 lg:pt-56 lg:pb-44">
        <p className="mx-auto max-w-2xl text-center text-2xl leading-relaxed text-muted-foreground md:text-3xl lg:text-[2.5rem] lg:leading-snug">
          12.000 m² de estrutura premium
          <br />
          para momentos inesquecíveis.
        </p>
      </div>
    </section>
  );
}
