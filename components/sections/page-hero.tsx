import Image from "next/image";
import { cn } from "@/lib/utils";

interface PageHeroProps {
  title: string;
  subtitle?: string;
  imageSrc: string;
  imageAlt: string;
  /** Override do estilo do subtítulo (ex: reforçar contraste). */
  subtitleClassName?: string;
  /** Override do estilo do título. */
  titleClassName?: string;
}

/**
 * Header padrão das páginas internas (não a home): foto colada a um painel bege
 * com o título, sem sobreposição de texto sobre a foto (contraste alto, editorial).
 * Desktop: foto à esquerda + painel à direita. Mobile: foto compacta em cima + painel embaixo.
 * Uma edição aqui propaga para todas as páginas que usam <PageHero />.
 */
export function PageHero({
  title,
  subtitle,
  imageSrc,
  imageAlt,
  subtitleClassName,
  titleClassName,
}: PageHeroProps) {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2">
      {/* Foto */}
      <div className="relative aspect-[16/10] md:aspect-auto md:min-h-[420px]">
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          priority
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover"
        />
      </div>

      {/* Painel de texto (colado à foto) */}
      <div className="flex flex-col justify-center bg-sand px-6 py-10 md:px-12 md:py-16 lg:px-16">
        {subtitle && (
          <p
            className={cn(
              "mb-4 text-xs font-semibold uppercase tracking-widest text-gold-dark",
              subtitleClassName
            )}
          >
            {subtitle}
          </p>
        )}
        <h1
          className={cn(
            "font-display max-w-xl text-4xl font-normal leading-tight tracking-tight text-foreground md:text-5xl",
            titleClassName
          )}
        >
          {title}
        </h1>
      </div>
    </section>
  );
}
