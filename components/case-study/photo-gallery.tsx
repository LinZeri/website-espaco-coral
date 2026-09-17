import Image from "next/image";
import type { CaseStudyPhoto } from "@/lib/case-studies";

interface PhotoGalleryProps {
  photos: CaseStudyPhoto[];
  /** Rótulo curto acima do título da seção. */
  eyebrow?: string;
  title?: string;
}

/**
 * Galeria de fotos de um evento real. Grid responsivo com next/image,
 * sem filtro de categoria (mais leve que o gallery-grid da /galeria, que é
 * acoplado a GALLERY_IMAGES). As 3 primeiras fotos recebem `priority` por
 * ficarem próximas do above-the-fold em telas médias.
 *
 * Lightbox fica como melhoria futura: hoje o foco é peso mínimo e SSG puro.
 */
export function PhotoGallery({
  photos,
  eyebrow = "Galeria do evento",
  title = "O dia em imagens",
}: PhotoGalleryProps) {
  if (photos.length === 0) return null;

  return (
    <section className="bg-background px-6 py-20 md:px-12 md:py-24 lg:px-20">
      <div className="mx-auto max-w-6xl">
        <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-gold-text">
          {eyebrow}
        </p>
        <h2 className="font-display mb-10 text-3xl font-normal leading-tight tracking-tight text-foreground md:text-4xl">
          {title}
        </h2>

        <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4">
          {photos.map((photo, i) => (
            <figure
              key={photo.src}
              className="relative aspect-[4/5] overflow-hidden rounded-md bg-secondary"
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                sizes="(max-width: 768px) 50vw, 33vw"
                priority={i < 3}
                className="object-cover transition-transform duration-700 hover:scale-105"
              />
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
