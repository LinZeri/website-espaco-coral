"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

type GalleryImage = {
  src: string;
  alt: string;
  category: "casamentos" | "espacos" | "detalhes";
};

const images: GalleryImage[] = [
  { src: "/images/scenes/casamentos/casamento-arco-floral.webp", alt: "Cerimônia de casamento com arco floral no Espaço Coral", category: "casamentos" },
  { src: "/images/scenes/casamentos/casamento-confetti.webp", alt: "Chuva de confetti na cerimônia de casamento", category: "casamentos" },
  { src: "/images/scenes/casamentos/casamento-veu.webp", alt: "Noiva com véu durante cerimônia no Espaço Coral", category: "casamentos" },
  { src: "/images/scenes/casamentos/cerimonia-entrada-noiva.webp", alt: "Entrada da noiva na cerimônia", category: "casamentos" },
  { src: "/images/scenes/casamentos/noiva-escada.webp", alt: "Noiva na escada do Espaço Coral", category: "casamentos" },
  { src: "/images/scenes/casamentos/salao-decorado.webp", alt: "Salão do Espaço Coral decorado para evento", category: "espacos" },
  { src: "/images/scenes/casamentos/mesa-bolo-flores.webp", alt: "Mesa de bolo com arranjos florais", category: "detalhes" },
  { src: "/images/scenes/casamentos/mesa-branca-dourada.webp", alt: "Mesa posta com detalhes brancos e dourados", category: "detalhes" },
  { src: "/images/scenes/salao/salao-panoramica.webp", alt: "Vista panorâmica do salão do Espaço Coral", category: "espacos" },
  { src: "/images/scenes/salao/salao-mesa-flores.webp", alt: "Salão decorado com flores para casamento", category: "espacos" },
  { src: "/images/scenes/cerimonia/cerimonia-arco.webp", alt: "Área de cerimônia ao ar livre com arco floral", category: "casamentos" },
  { src: "/images/scenes/cerimonia/cerimonia-palmeiras.webp", alt: "Cerimônia ao ar livre entre palmeiras", category: "casamentos" },
  { src: "/images/scenes/entrada/entrada-decorada.webp", alt: "Entrada do Espaço Coral decorada", category: "espacos" },
  { src: "/images/scenes/terraco/terraco-noite.webp", alt: "Varanda panorâmica do Espaço Coral à noite", category: "espacos" },
  { src: "/images/scenes/fachada/fachada-entardecer.webp", alt: "Fachada do Espaço Coral ao entardecer", category: "espacos" },
  { src: "/images/scenes/fachada/fachada-noite.webp", alt: "Fachada iluminada do Espaço Coral à noite", category: "espacos" },
];

const categories = [
  { id: "todos", label: "Todos" },
  { id: "casamentos", label: "Casamentos" },
  { id: "espacos", label: "Espaços" },
  { id: "detalhes", label: "Detalhes" },
] as const;

type Category = (typeof categories)[number]["id"];

export function GalleryGrid() {
  const [activeCategory, setActiveCategory] = useState<Category>("todos");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filtered =
    activeCategory === "todos"
      ? images
      : images.filter((img) => img.category === activeCategory);

  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = useCallback(() => setLightboxIndex(null), []);

  const prev = useCallback(() => {
    setLightboxIndex((i) =>
      i === null ? null : (i - 1 + filtered.length) % filtered.length
    );
  }, [filtered.length]);

  const next = useCallback(() => {
    setLightboxIndex((i) =>
      i === null ? null : (i + 1) % filtered.length
    );
  }, [filtered.length]);

  useEffect(() => {
    if (lightboxIndex === null) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [lightboxIndex, closeLightbox, prev, next]);

  useEffect(() => {
    document.body.style.overflow = lightboxIndex !== null ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [lightboxIndex]);

  return (
    <>
      {/* Filters */}
      <div className="border-b border-border px-6 py-8 md:px-12 lg:px-20">
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setActiveCategory(cat.id)}
              className={`px-5 py-2 text-sm tracking-wide transition-colors duration-200 ${
                activeCategory === cat.id
                  ? "bg-foreground text-white"
                  : "border border-border text-muted-foreground hover:border-foreground hover:text-foreground"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="px-6 py-12 md:px-12 md:py-16 lg:px-20 lg:py-20">
        <div className="columns-2 gap-4 md:columns-3 lg:columns-4">
          {filtered.map((img, index) => (
            <button
              key={img.src}
              type="button"
              onClick={() => openLightbox(index)}
              className="group relative mb-4 block w-full overflow-hidden rounded-lg"
            >
              <Image
                src={img.src}
                alt={img.alt}
                width={600}
                height={400}
                sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                className="w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-foreground/0 transition-colors duration-300 group-hover:bg-foreground/20" />
            </button>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-foreground/95"
          onClick={closeLightbox}
        >
          <button
            type="button"
            onClick={closeLightbox}
            className="absolute right-4 top-4 z-10 p-2 text-white/70 transition-colors hover:text-white md:right-8 md:top-8"
            aria-label="Fechar"
          >
            <X size={28} />
          </button>

          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); prev(); }}
            className="absolute left-4 z-10 p-2 text-white/70 transition-colors hover:text-white md:left-8"
            aria-label="Anterior"
          >
            <ChevronLeft size={36} />
          </button>

          <div
            className="relative max-h-[85vh] max-w-[90vw]"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={filtered[lightboxIndex].src}
              alt={filtered[lightboxIndex].alt}
              width={1200}
              height={800}
              sizes="90vw"
              className="max-h-[85vh] w-auto rounded-lg object-contain"
            />
          </div>

          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); next(); }}
            className="absolute right-4 z-10 p-2 text-white/70 transition-colors hover:text-white md:right-8"
            aria-label="Próxima"
          >
            <ChevronRight size={36} />
          </button>

          <p className="absolute bottom-4 left-1/2 -translate-x-1/2 text-xs text-white/40">
            {lightboxIndex + 1} / {filtered.length}
          </p>
        </div>
      )}
    </>
  );
}
