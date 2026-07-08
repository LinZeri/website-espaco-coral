/**
 * Fonte única das fotos da galeria (/galeria).
 * Consumida pelo grid (components/sections/gallery-grid.tsx) e pelo
 * schema ImageGallery (lib/schema.ts), para que a lista visível e o
 * JSON-LD nunca divirjam.
 */

export type GalleryImage = {
  src: string;
  alt: string;
  category: "casamentos" | "espacos" | "detalhes";
};

export const GALLERY_IMAGES: GalleryImage[] = [
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
