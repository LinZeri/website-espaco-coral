"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

const word = "CORAL";

const sideImages = [
  {
    src: "/images/scenes/fachada/fachada-entardecer.webp",
    alt: "Fachada do Espaço Coral ao entardecer",
    position: "left",
    span: 1,
  },
  {
    src: "/images/scenes/salao/salao-panoramica.webp",
    alt: "Vista panorâmica do salão do Espaço Coral",
    position: "left",
    span: 1,
  },
  {
    src: "/images/hero/hero-top-right.webp",
    alt: "Noiva na fachada de vidro do Espaço Coral",
    position: "right",
    span: 1,
  },
  {
    src: "/images/hero/hero-bottom-right.webp",
    alt: "Noivos com chuva de pétalas na cerimônia ao ar livre",
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

  useEffect(() => {
    const handleScroll = () => {
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
      const sideTranslateY = -(imageProgress * 15);

      if (wrapperRef.current) {
        wrapperRef.current.style.gap = `${gap}px`;
        wrapperRef.current.style.padding = `${imageProgress * 16}px`;
        wrapperRef.current.style.paddingBottom = `${60 + imageProgress * 40}px`;
      }
      if (leftColRef.current) {
        leftColRef.current.style.width = `${sideWidth}%`;
        leftColRef.current.style.gap = `${gap}px`;
        leftColRef.current.style.transform = `translateX(${sideTranslateLeft}%) translateY(${sideTranslateY}%)`;
        leftColRef.current.style.opacity = String(sideOpacity);
      }
      if (rightColRef.current) {
        rightColRef.current.style.width = `${sideWidth}%`;
        rightColRef.current.style.gap = `${gap}px`;
        rightColRef.current.style.transform = `translateX(${sideTranslateRight}%) translateY(${sideTranslateY}%)`;
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
      const sideImgWrappers = sectionRef.current.querySelectorAll<HTMLDivElement>(".side-img-wrapper");
      sideImgWrappers.forEach((el) => {
        el.style.borderRadius = `${borderRadius}px`;
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section ref={sectionRef} className="relative bg-background">
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
                    className="relative overflow-hidden will-change-transform side-img-wrapper"
                    style={{ flex: img.span }}
                  >
                    <Image
                      src={img.src}
                      alt={img.alt}
                      fill
                      priority
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
                src="/images/hero/hero-main.webp"
                alt="Vista panorâmica do salão do Espaço Coral decorado para casamento em Batatais SP"
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
                <h1 className="w-full text-[22vw] font-medium leading-[0.8] tracking-tighter text-white">
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
                      priority
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
