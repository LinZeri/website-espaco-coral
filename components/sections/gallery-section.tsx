"use client";

import Image from "next/image";
import { useEffect, useRef, useCallback } from "react";

export function GallerySection() {
  const galleryRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);

  const images = [
    { src: "/images/scenes/casamentos/casamento-confetti.webp", alt: "Casal com chuva de confetti na cerimônia" },
    { src: "/images/scenes/casamentos/casamento-veu.webp", alt: "Noiva com véu ao vento no Espaço Coral" },
    { src: "/images/scenes/casamentos/casamento-arco-floral.webp", alt: "Arco floral para cerimônia de casamento" },
    { src: "/images/scenes/casamentos/mesa-branca-dourada.webp", alt: "Mesa de festa branca e dourada" },
    { src: "/images/scenes/casamentos/noiva-escada.webp", alt: "Noiva na escada do Espaço Coral" },
    { src: "/images/scenes/casamentos/salao-decorado.webp", alt: "Salão do Espaço Coral decorado" },
    { src: "/images/scenes/casamentos/cerimonia-entrada-noiva.webp", alt: "Entrada da noiva na cerimônia" },
    { src: "/images/scenes/casamentos/mesa-bolo-flores.webp", alt: "Mesa de bolo com flores" },
  ];

  useEffect(() => {
    const calculateHeight = () => {
      if (!containerRef.current || !galleryRef.current) return;
      const containerWidth = containerRef.current.scrollWidth;
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;
      const totalHeight = viewportHeight + (containerWidth - viewportWidth);
      galleryRef.current.style.height = `${totalHeight}px`;
    };
    const timer = setTimeout(calculateHeight, 100);
    window.addEventListener("resize", calculateHeight);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", calculateHeight);
    };
  }, []);

  const updateTransform = useCallback(() => {
    if (!galleryRef.current || !containerRef.current) return;
    const rect = galleryRef.current.getBoundingClientRect();
    const containerWidth = containerRef.current.scrollWidth;
    const viewportWidth = window.innerWidth;
    const totalScrollDistance = containerWidth - viewportWidth;
    const scrolled = Math.max(0, -rect.top);
    const progress = Math.min(1, scrolled / totalScrollDistance);
    const newTranslateX = progress * -totalScrollDistance;
    containerRef.current.style.transform = `translate3d(${newTranslateX}px, 0, 0)`;
    containerRef.current.style.webkitTransform = `translate3d(${newTranslateX}px, 0, 0)`;
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(updateTransform);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    updateTransform();
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [updateTransform]);

  return (
    <section
      id="galeria"
      ref={galleryRef}
      className="relative bg-background"
      style={{ height: "100vh" }}
    >
      <div className="sticky top-0 h-screen overflow-hidden">
        <div className="flex h-full items-center">
          <div
            ref={containerRef}
            className="flex gap-6 px-6"
            style={{
              transform: "translate3d(0, 0, 0)",
              WebkitTransform: "translate3d(0, 0, 0)",
              backfaceVisibility: "hidden",
              WebkitBackfaceVisibility: "hidden",
              perspective: 1000,
              WebkitPerspective: 1000,
              touchAction: "pan-y",
            }}
          >
            {images.map((image, index) => (
              <div
                key={index}
                className="relative h-[70vh] w-[85vw] flex-shrink-0 overflow-hidden rounded-2xl md:w-[60vw] lg:w-[45vw]"
                style={{
                  transform: "translateZ(0)",
                  WebkitTransform: "translateZ(0)",
                }}
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  quality={60}
                  className="object-cover"
                  sizes="(max-width: 768px) 85vw, (max-width: 1024px) 60vw, 45vw"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
