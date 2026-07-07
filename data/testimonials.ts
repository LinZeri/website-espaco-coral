/**
 * Depoimentos reais de clientes, transcritos do Google Business Profile.
 * Curadoria estática (sem API): 100% SSG, performance máxima, controle total.
 *
 * Como atualizar:
 * - Para adicionar um novo review, copie o texto e o nome reais do Google.
 * - `photo`: caminho de uma foto do casal/evento em /images/testimonials/.
 *   O cliente fornece essa foto. Quando ausente, o card usa `fallbackImage`
 *   (uma cena do espaço), conforme combinado.
 * - `rating`: nota em estrelas (todos os reviews reais são 5).
 */

export type Testimonial = {
  /** Nome do autor exatamente como aparece no Google. */
  name: string;
  /** Texto integral da avaliação. */
  text: string;
  /** Nota de 1 a 5. */
  rating: number;
  /** Rótulo de data para exibição (ex: "Nov 2025"). Aproximado. */
  date?: string;
  /** Tipo de evento, quando conhecido (ex: "Casamento"). */
  eventType?: string;
  /** Local Guide do Google (selo de credibilidade). */
  localGuide?: boolean;
  /** Foto fornecida pelo cliente para este depoimento. Sobrepõe o fallback. */
  photo?: string;
  /** Cena do espaço usada quando não há `photo`. */
  fallbackImage: string;
};

export const TESTIMONIALS: Testimonial[] = [
  {
    name: "Daiana Alves",
    text: "Agradecemos de coração o trabalho simplesmente perfeito de vocês. Espaço maravilhoso, trabalho impecável. Obrigada por fazerem nossa noite ser especial e por realizar nosso sonho de uma forma tão bela. Vocês são realizadores de sonhos e desempenham esse papel muitíssimo bem. A dedicação, a organização e o empenho de vocês em cada detalhe é único e insubstituível. Não poderíamos estar mais realizados e felizes com tudo! Se pudéssemos voltar no tempo para mudar alguma coisa, não mudaríamos absolutamente nada.",
    rating: 5,
    date: "Abr 2025",
    eventType: "Casamento",
    photo: "/images/testimonials/espaco-coral-depoimento-daiana-alves.webp",
    fallbackImage: "/images/scenes/casamentos/espaco-coral-casamento-noivos-01.webp",
  },
  {
    name: "Caroline Ferreira Rosa",
    text: "Desde o contato inicial, passando pela realização da festa e pós-evento, o atendimento da equipe do Espaço Coral foi perfeito. O espaço atendeu perfeitamente nosso evento de 120 pessoas, com elegância e aconchego. Contratamos o pacote com buffet e também ficamos super satisfeitos. Um agradecimento especial ao Lin e à Rita, que nos auxiliaram com toda a preparação, e à equipe de garçons que, durante o evento, foi extremamente gentil com nossos convidados! Nos sentimos em casa!",
    rating: 5,
    date: "Nov 2025",
    eventType: "Evento para 120 convidados",
    localGuide: true,
    // photo: "/images/testimonials/caroline-ferreira-rosa.webp",
    fallbackImage: "/images/scenes/casamentos/espaco-coral-casamento-recepcao-01.webp",
  },
  {
    name: "Wanderson Bagio",
    text: "Lugar excelente, com atendimento diferenciado pelos proprietários. Ficamos muito felizes de ter escolhido este espaço para nosso evento.",
    rating: 5,
    date: "Nov 2025",
    photo: "/images/testimonials/espaco-coral-depoimento-wanderson-bagio.webp",
    fallbackImage: "/images/scenes/casamentos/espaco-coral-casamento-decoracao-floral-01.webp",
  },
  {
    name: "Cássio Pupin",
    text: "Espaço maravilhoso, contando com uma equipe nota 1000!!",
    rating: 5,
    date: "Ago 2025",
    eventType: "Casamento",
    photo: "/images/testimonials/espaco-coral-depoimento-cassio-pupin.webp",
    fallbackImage: "/images/scenes/salao/espaco-coral-salao-decoracao-completa-15.webp",
  },
];
