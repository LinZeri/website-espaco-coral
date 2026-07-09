/**
 * Fonte única das fotos da galeria (/galeria).
 * Consumida pelo grid (components/sections/gallery-grid.tsx) e pelo
 * schema ImageGallery (lib/schema.ts), para que a lista visível e o
 * JSON-LD nunca divirjam.
 *
 * Curadoria prioriza fotos que NÃO aparecem na home (nomes espaco-coral-*),
 * para que quem chega pela galeria veja material inédito. As 4 primeiras
 * entradas recebem priority no grid (LCP): manter fotos fortes e horizontais.
 * As categorias são intercaladas de propósito para o filtro "Todos" não
 * ficar em blocos monótonos.
 */

export type GalleryImage = {
  src: string;
  alt: string;
  category: "casamentos" | "15-anos" | "espacos" | "detalhes";
};

export const GALLERY_IMAGES: GalleryImage[] = [
  // --- 4 primeiras: LCP (priority no grid), fotos fortes e horizontais ---
  { src: "/images/scenes/salao/espaco-coral-salao-principal-01.webp", alt: "Vista panorâmica do salão principal do Espaço Coral decorado para evento", category: "espacos" },
  { src: "/images/scenes/casamentos/espaco-coral-casamento-cerimonia-01.webp", alt: "Cerimônia de casamento no Espaço Coral em Batatais", category: "casamentos" },
  { src: "/images/scenes/quinze-anos/espaco-coral-quinze-anos-01.webp", alt: "Festa de 15 anos no salão do Espaço Coral", category: "15-anos" },
  { src: "/images/scenes/decoracao/mesa-de-bolo-e-doces/espaco-coral-decoracao-mesa-de-bolo-e-doces-01.webp", alt: "Mesa de bolo e doces decorada para festa no Espaço Coral", category: "detalhes" },

  // --- restante intercalado (casamentos / 15-anos / espaços / detalhes) ---
  { src: "/images/scenes/casamentos/espaco-coral-casamento-noivos-01.webp", alt: "Noivos celebrando o casamento no Espaço Coral", category: "casamentos" },
  { src: "/images/scenes/quinze-anos/espaco-coral-quinze-anos-02.webp", alt: "Debutante durante a festa de 15 anos no Espaço Coral", category: "15-anos" },
  { src: "/images/scenes/salao/espaco-coral-salao-cerejeiras-panoramico-13.webp", alt: "Salão do Espaço Coral com cerejeiras e vista panorâmica", category: "espacos" },
  { src: "/images/scenes/decoracao/decoracao-flores/espaco-coral-decoracao-decoracao-flores-01.webp", alt: "Arranjos de flores na decoração de evento do Espaço Coral", category: "detalhes" },

  { src: "/images/scenes/casamentos/espaco-coral-casamento-cerimonia-02.webp", alt: "Cerimônia de casamento com convidados no Espaço Coral", category: "casamentos" },
  { src: "/images/scenes/quinze-anos/espaco-coral-quinze-anos-03.webp", alt: "Decoração da festa de 15 anos no Espaço Coral", category: "15-anos" },
  { src: "/images/scenes/terraco/espaco-coral-terraco-01.webp", alt: "Terraço do Espaço Coral com vista para a área externa", category: "espacos" },
  { src: "/images/scenes/decoracao/decoracao-mesas/espaco-coral-decoracao-decoracao-mesas-01.webp", alt: "Mesas de convidados decoradas para evento no Espaço Coral", category: "detalhes" },

  { src: "/images/scenes/casamentos/espaco-coral-casamento-noiva-espelho-02.webp", alt: "Noiva se arrumando diante do espelho no Espaço Coral", category: "casamentos" },
  { src: "/images/scenes/quinze-anos/espaco-coral-quinze-anos-05.webp", alt: "Retrato da debutante na festa de 15 anos do Espaço Coral", category: "15-anos" },
  { src: "/images/scenes/entrada/espaco-coral-foyer-mesa-champanhe-10.webp", alt: "Foyer do Espaço Coral com mesa de champanhe na recepção", category: "espacos" },
  { src: "/images/scenes/decoracao/espaco-instagramavel/espaco-coral-decoracao-espaco-instagramavel-01.webp", alt: "Espaço instagramável decorado no Espaço Coral", category: "detalhes" },

  { src: "/images/scenes/casamentos/espaco-coral-casamento-noivos-02.webp", alt: "Casal de noivos na recepção do casamento no Espaço Coral", category: "casamentos" },
  { src: "/images/scenes/quinze-anos/espaco-coral-quinze-anos-07.webp", alt: "Momento da valsa na festa de 15 anos no Espaço Coral", category: "15-anos" },
  { src: "/images/scenes/salao/espaco-coral-salao-bar-arvore-12.webp", alt: "Bar do salão do Espaço Coral ao lado da árvore central", category: "espacos" },
  { src: "/images/scenes/decoracao-instagramavel/espaco-coral-decoracao-neon-all-you-need-is-love-15.webp", alt: "Painel neon All You Need Is Love na decoração do Espaço Coral", category: "detalhes" },

  { src: "/images/scenes/casamentos/espaco-coral-casamento-noiva-neon-costas-03.webp", alt: "Noiva diante de painel neon no Espaço Coral", category: "casamentos" },
  { src: "/images/scenes/quinze-anos/espaco-coral-quinze-anos-09.webp", alt: "Convidados na pista durante a festa de 15 anos no Espaço Coral", category: "15-anos" },
  { src: "/images/scenes/ambientes/marquise/espaco-coral-ambientes-marquise-01.webp", alt: "Marquise de entrada do Espaço Coral", category: "espacos" },
  { src: "/images/scenes/decoracao/mesa-de-bolo-e-doces/espaco-coral-decoracao-mesa-de-bolo-e-doces-05.webp", alt: "Mesa de doces finos decorada para festa no Espaço Coral", category: "detalhes" },

  { src: "/images/scenes/casamentos/espaco-coral-casamento-cerimonia-03.webp", alt: "Altar da cerimônia de casamento no Espaço Coral", category: "casamentos" },
  { src: "/images/scenes/quinze-anos/espaco-coral-quinze-anos-11.webp", alt: "Detalhes da decoração da festa de 15 anos no Espaço Coral", category: "15-anos" },
  { src: "/images/scenes/terraco/espaco-coral-terraco-03.webp", alt: "Área externa do terraço do Espaço Coral", category: "espacos" },
  { src: "/images/scenes/decoracao/decoracao-flores/espaco-coral-decoracao-decoracao-flores-03.webp", alt: "Composição floral na decoração de evento no Espaço Coral", category: "detalhes" },

  { src: "/images/scenes/casamentos/espaco-coral-casamento-noivos-03.webp", alt: "Noivos durante a festa de casamento no Espaço Coral", category: "casamentos" },
  { src: "/images/scenes/quinze-anos/espaco-coral-quinze-anos-13.webp", alt: "Salão montado para a festa de 15 anos no Espaço Coral", category: "15-anos" },
  { src: "/images/scenes/salao/espaco-coral-salao-palco-banda-14.webp", alt: "Palco para banda no salão do Espaço Coral", category: "espacos" },
  { src: "/images/scenes/decoracao-instagramavel/espaco-coral-decoracao-painel-musgo-neon-escada-18.webp", alt: "Painel de musgo com neon na escada do Espaço Coral", category: "detalhes" },

  { src: "/images/scenes/casamentos/espaco-coral-casamento-noiva-01.webp", alt: "Noiva no dia do casamento no Espaço Coral", category: "casamentos" },
  { src: "/images/scenes/quinze-anos/espaco-coral-quinze-anos-15.webp", alt: "Festa de debutante iluminada no Espaço Coral", category: "15-anos" },
  { src: "/images/scenes/ambientes/varanda/espaco-coral-ambientes-varanda-01.webp", alt: "Varanda do Espaço Coral com vista para a área verde", category: "espacos" },
  { src: "/images/scenes/decoracao/decoracao-mesas/espaco-coral-decoracao-decoracao-mesas-05.webp", alt: "Mesa posta com arranjos para evento no Espaço Coral", category: "detalhes" },

  { src: "/images/scenes/casamentos/espaco-coral-casamento-brinde-01.webp", alt: "Brinde dos noivos na recepção do casamento no Espaço Coral", category: "casamentos" },
  { src: "/images/scenes/quinze-anos/espaco-coral-quinze-anos-17.webp", alt: "Retrato da aniversariante de 15 anos no Espaço Coral", category: "15-anos" },
  { src: "/images/scenes/entrada/espaco-coral-entrada-01.webp", alt: "Entrada do Espaço Coral decorada para recepção", category: "espacos" },
  { src: "/images/scenes/decoracao-instagramavel/espaco-coral-decoracao-leao-flores-17.webp", alt: "Escultura de leão com flores na decoração do Espaço Coral", category: "detalhes" },

  { src: "/images/scenes/casamentos/espaco-coral-casamento-recepcao-01.webp", alt: "Recepção de casamento no salão do Espaço Coral", category: "casamentos" },
  { src: "/images/scenes/quinze-anos/espaco-coral-quinze-anos-19.webp", alt: "Convidados celebrando os 15 anos no Espaço Coral", category: "15-anos" },
  { src: "/images/scenes/ambientes/area-verde/espaco-coral-ambientes-area-verde-01.webp", alt: "Área verde ao redor do Espaço Coral", category: "espacos" },
  { src: "/images/scenes/decoracao/decoracao-mesas/espaco-coral-decoracao-decoracao-mesas-10.webp", alt: "Mesa de convidados com louça e velas no Espaço Coral", category: "detalhes" },

  { src: "/images/scenes/casamentos/espaco-coral-casamento-cortejo-noivo-mae-05.webp", alt: "Cortejo do noivo com a mãe na cerimônia do Espaço Coral", category: "casamentos" },
  { src: "/images/scenes/quinze-anos/espaco-coral-quinze-anos-21.webp", alt: "Decoração em tons suaves na festa de 15 anos no Espaço Coral", category: "15-anos" },
  { src: "/images/scenes/salao/espaco-coral-salao-principal-03.webp", alt: "Salão principal do Espaço Coral montado para festa", category: "espacos" },
  { src: "/images/scenes/bar-de-drinks/espaco-coral-bar-de-drinks-01.webp", alt: "Bar de drinks montado para evento no Espaço Coral", category: "detalhes" },

  { src: "/images/scenes/casamentos/espaco-coral-casamento-recepcao-02.webp", alt: "Convidados na recepção de casamento no Espaço Coral", category: "casamentos" },
  { src: "/images/scenes/quinze-anos/espaco-coral-quinze-anos-23.webp", alt: "Pista de dança na festa de 15 anos no Espaço Coral", category: "15-anos" },
  { src: "/images/scenes/ambientes/gramado/espaco-coral-ambientes-gramado-01.webp", alt: "Gramado externo do Espaço Coral", category: "espacos" },
  { src: "/images/scenes/buffet/espaco-coral-buffet-01.webp", alt: "Serviço de buffet durante evento no Espaço Coral", category: "detalhes" },

  { src: "/images/scenes/casamentos/espaco-coral-casamento-entrada-01.webp", alt: "Entrada dos noivos na festa de casamento no Espaço Coral", category: "casamentos" },
  { src: "/images/scenes/quinze-anos/espaco-coral-quinze-anos-25.webp", alt: "Momento da festa de 15 anos no salão do Espaço Coral", category: "15-anos" },
  { src: "/images/scenes/inauguracao/espaco-coral-inauguracao-salao-01.webp", alt: "Salão do Espaço Coral durante evento", category: "espacos" },
  { src: "/images/scenes/decoracao/mesa-de-bem-casados/espaco-coral-decoracao-mesa-de-bem-casados-01.webp", alt: "Mesa de bem-casados decorada para casamento no Espaço Coral", category: "detalhes" },

  { src: "/images/scenes/pessoas/noiva/espaco-coral-pessoas-noiva-01.webp", alt: "Retrato da noiva no dia do casamento no Espaço Coral", category: "casamentos" },
  { src: "/images/scenes/quinze-anos/espaco-coral-quinze-anos-27.webp", alt: "Aniversariante de 15 anos com os convidados no Espaço Coral", category: "15-anos" },

  { src: "/images/scenes/casamentos/espaco-coral-casamento-noivos-04.webp", alt: "Noivos na pista de dança do casamento no Espaço Coral", category: "casamentos" },
  { src: "/images/scenes/quinze-anos/espaco-coral-quinze-anos-29.webp", alt: "Detalhe da mesa da festa de 15 anos no Espaço Coral", category: "15-anos" },

  { src: "/images/scenes/pessoas/casal/espaco-coral-pessoas-casal-01.webp", alt: "Casal registrando o momento no Espaço Coral", category: "casamentos" },
  { src: "/images/scenes/quinze-anos/espaco-coral-quinze-anos-31.webp", alt: "Ambiente da festa de 15 anos no Espaço Coral", category: "15-anos" },

  { src: "/images/scenes/pessoas/padrinhos/espaco-coral-pessoas-padrinhos-01.webp", alt: "Padrinhos durante a cerimônia de casamento no Espaço Coral", category: "casamentos" },
  { src: "/images/scenes/quinze-anos/espaco-coral-quinze-anos-33.webp", alt: "Festa de 15 anos comemorada no Espaço Coral", category: "15-anos" },

  { src: "/images/scenes/cerimonia/espaco-coral-cerimonia-corredor-flores-07.webp", alt: "Corredor da cerimônia decorado com flores no Espaço Coral", category: "casamentos" },
  { src: "/images/scenes/cerimonia/espaco-coral-cerimonia-palmeiras-panoramica-08.webp", alt: "Cerimônia ao ar livre entre palmeiras no Espaço Coral", category: "casamentos" },
];
