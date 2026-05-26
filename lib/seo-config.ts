/**
 * Constantes centralizadas de SEO/NAP/redes sociais.
 * Fonte única de verdade: qualquer alteração de endereço, telefone ou redes
 * propaga para schema, metadata, footer e contato.
 */

export const SITE_URL = "https://coraleventos.com.br";

export const BUSINESS = {
  name: "Espaço Coral",
  legalName: "Espaço Coral Eventos",
  description:
    "Espaço premium para casamentos, festas de 15 anos e eventos corporativos em Batatais, SP. 12.000 m² de estrutura, capacidade para 320 convidados, cerimônia ao céu aberto e sala privativa.",
  shortDescription:
    "Espaço premium para festas e eventos em Batatais, SP. 12.000 m², 320 convidados.",
  founded: "2024", // ano de inauguração, confirmar com cliente
  priceRange: "$$$",
  currenciesAccepted: "BRL",
  paymentAccepted: ["Pix", "Cartão", "Transferência bancária"],
} as const;

export const ADDRESS = {
  streetAddress: "Rua Matheus Marinelli, 18",
  addressLocality: "Batatais",
  addressRegion: "SP",
  postalCode: "14300-111",
  addressCountry: "BR",
  neighborhood: "Jardim Elena",
} as const;

/**
 * Coordenadas aproximadas: verificar com Google Maps antes de produção
 * para garantir precisão (rua Matheus Marinelli, 18, Jardim Elena, Batatais).
 * Atual: centro de Batatais como aproximação.
 */
export const GEO = {
  latitude: -20.8911,
  longitude: -47.5856,
} as const;

export const CONTACT = {
  phone: "+5516991294178",
  phoneDisplay: "(16) 99129-4178",
  whatsappNumber: "5516991294178",
  whatsappUrl:
    "https://wa.me/5516991294178?text=Ol%C3%A1!%20Gostaria%20de%20saber%20mais%20sobre%20o%20Espa%C3%A7o%20Coral.",
} as const;

export const SOCIAL = {
  instagram: "https://www.instagram.com/espaco.coral",
  facebook: "https://www.facebook.com/EspacoCoralEventos",
  googleMaps: "https://maps.app.goo.gl/zhbZpzoYTjqZHc967",
} as const;

/**
 * Avaliações agregadas do Google Business Profile.
 * Atualizar manualmente quando volume crescer significativamente.
 */
export const REVIEWS = {
  ratingValue: 5,
  reviewCount: 36,
  bestRating: 5,
  worstRating: 1,
} as const;

export const VENUE = {
  totalAreaSqm: 12000,
  maxAttendeeCapacity: 320,
  parkingCapacity: 40,
  amenities: [
    "Estacionamento orientado para 40 carros",
    "Climatização no ambiente interno",
    "Sistema de som ambiente",
    "TVs",
    "Banheiros masculino, feminino e PCD com camareira",
    "Sala privativa para a homenageada com chuveiro",
    "Mesas e cadeiras para até 320 convidados",
    "Mesa de bolo e aparadores decorativos",
    "Espaço para cerimônia ao céu aberto com área verde",
    "Cozinha completa equipada",
    "8 cervejeiras industriais",
    "Espaço kids com monitora profissional",
    "Gerador de energia",
    "Banheiros separados para o staff do evento",
  ],
} as const;

/**
 * Horário de atendimento via WhatsApp.
 * TODO: confirmar horário real com cliente (open-questions.md).
 */
export const OPENING_HOURS = [
  "Mo-Sa 09:00-18:00",
] as const;

export const AREAS_SERVED = [
  "Batatais",
  "Ribeirão Preto",
  "Franca",
  "Sertãozinho",
  "Brodowski",
  "Altinópolis",
  "Cravinhos",
  "Interior de São Paulo",
] as const;
