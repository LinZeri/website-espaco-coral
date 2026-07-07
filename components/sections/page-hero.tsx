import Image from "next/image";
import { cn } from "@/lib/utils";

interface PageHeroProps {
  title: string;
  subtitle?: string;
  imageSrc: string;
  imageAlt: string;
  /** Override do estilo do subtítulo (ex: reforçar contraste sobre a foto). */
  subtitleClassName?: string;
  /** Override do estilo do título (ex: sombra para legibilidade). */
  titleClassName?: string;
}

export function PageHero({
  title,
  subtitle,
  imageSrc,
  imageAlt,
  subtitleClassName,
  titleClassName,
}: PageHeroProps) {
  return (
    <section className="relative h-[65vh] min-h-[500px] overflow-hidden">
      <Image
        src={imageSrc}
        alt={imageAlt}
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-foreground/65" />
      <div className="absolute inset-0 flex flex-col justify-end px-6 pb-16 md:px-12 md:pb-20 lg:px-20 lg:pb-24">
        {subtitle && (
          <p
            className={cn(
              "mb-4 text-xs uppercase tracking-widest text-gold",
              subtitleClassName
            )}
          >
            {subtitle}
          </p>
        )}
        <h1
          className={cn(
            "font-display max-w-3xl text-5xl font-normal tracking-tighter text-white md:text-7xl lg:text-8xl",
            titleClassName
          )}
        >
          {title}
        </h1>
      </div>
    </section>
  );
}
