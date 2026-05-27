import Image from "next/image";

export function TestimonialsSection() {
  return (
    <section id="depoimentos" className="bg-background">
      {/* Large Quote */}
      <div className="px-6 py-24 md:px-12 md:py-32 lg:px-20 lg:py-40">
        <p className="mx-auto max-w-5xl text-2xl leading-relaxed text-foreground md:text-3xl lg:text-[2.5rem] lg:leading-snug">
          &ldquo;O Espaço Coral transformou nosso casamento num sonho. Cada detalhe,
          cada ambiente, cada momento: tudo foi simplesmente perfeito. Nunca
          vamos esquecer.&rdquo;
        </p>
        <p className="mt-8 text-sm text-muted-foreground">Fernanda &amp; Lucas</p>
      </div>

      {/* Full-width image */}
      <div className="relative aspect-[16/9] w-full">
        <Image
          src="/images/scenes/salao/salao-panoramica.webp"
          alt="Vista panorâmica do salão do Espaço Coral"
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
      </div>
    </section>
  );
}
