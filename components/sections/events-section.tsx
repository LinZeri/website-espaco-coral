"use client";

import { FadeImage } from "@/components/fade-image";

const diferenciais = [
  {
    title: "Salão de Festas",
    description: "Elegância",
    image: "/images/scenes/salao/salao-mesa.webp",
    alt: "Salão de festas do Espaço Coral",
  },
  {
    title: "Cerimônia ao Ar Livre",
    description: "Natureza",
    image: "/images/scenes/cerimonia/cerimonia-palmeiras.webp",
    alt: "Área de cerimônia ao ar livre com palmeiras",
  },
  {
    title: "Varanda Panôramica",
    description: "Conforto",
    image: "/images/scenes/terraco/terraco-noite.webp",
    alt: "Terraço panorâmico do Espaço Coral à noite",
  },
  {
    title: "Estacionamento Amplo",
    description: "Praticidade",
    image: "/images/scenes/fachada/fachada-dia.webp",
    alt: "Fachada e estacionamento do Espaço Coral",
  },
  {
    title: "Luxo em cada detalhe",
    description: "Alto Padrão",
    image: "/images/scenes/fachada/fachada-noite.webp",
    alt: "Vista noturna da fachada do Espaço Coral",
  },
  {
    title: "Equipe Dedicada",
    description: "Excelência",
    image: "/images/scenes/entrada/entrada-decorada.webp",
    alt: "Entrada decorada do Espaço Coral",
  },
];

export function EventsSection() {
  return (
    <section id="diferenciais" className="bg-background">
      {/* Section Title */}
      <div className="px-6 py-20 text-center md:px-12 md:py-28 lg:px-20 lg:py-32 lg:pb-20">
        <h2 className="text-3xl font-medium tracking-tight text-foreground md:text-4xl lg:text-5xl">
          Estrutura completa.
          <br />
          Experiência inesquecível.
        </h2>
        <p className="mx-auto mt-6 max-w-md text-sm text-muted-foreground">
          Diferenciais do Espaço Coral
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 gap-4 px-6 pb-20 md:grid-cols-3 md:px-12 lg:px-20">
        {diferenciais.map((item) => (
          <div key={item.title} className="group">
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
              <FadeImage
                src={item.image}
                alt={item.alt}
                fill
                quality={75}
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="py-6">
              <p className="mb-2 text-xs uppercase tracking-widest text-muted-foreground">
                {item.description}
              </p>
              <h3 className="text-foreground text-xl font-semibold">{item.title}</h3>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
