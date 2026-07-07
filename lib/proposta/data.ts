/**
 * Dados das propostas comerciais privadas (buffet e decoração).
 *
 * Estas páginas vivem sob /proposta/* e são material de fechamento para
 * clientes específicos: NÃO são indexáveis (noindex via app/proposta/layout.tsx),
 * ficam fora do sitemap e não têm link na navegação pública.
 *
 * Conteúdo e fotos migrados do site WordPress antigo (menus set/2025).
 * Fotos originais convertidas para WebP em /public/images/proposta/.
 * Sem preços: CTA sempre para o WhatsApp, conforme regra do projeto.
 */

export interface ProposalGroup {
  /** Subtítulo opcional do grupo dentro de um bloco (ex: "Carnes"). */
  subtitle?: string;
  items: string[];
}

export interface ProposalImage {
  src: string;
  alt: string;
  /** Dimensões reais do arquivo (evita distorção, sem crop). */
  w: number;
  h: number;
}

export interface ProposalBlock {
  /** Nome da seção, exibido como título (ex: "Ilha de Degustação"). */
  eyebrow: string;
  /** Observação curta, ex: "Escolher 2 opções", "Todos inclusos". */
  note?: string;
  groups: ProposalGroup[];
  /** Foto opcional ao lado do bloco (fotos originais do site WordPress). */
  image?: ProposalImage;
}

export interface ProposalConditions {
  criancas: string[];
  pagamento: string[];
}

export interface ProposalData {
  slug: string;
  name: string;
  /** Linha de apoio acima do título (ex: "A partir de 80 convidados"). */
  tagline?: string;
  intro: string;
  heroImage: string;
  heroAlt: string;
  /** Texto pré-preenchido da mensagem de WhatsApp. */
  whatsappText: string;
  blocks: ProposalBlock[];
  conditions?: ProposalConditions;
  /** Alinhamento vertical da foto em relação ao texto do bloco (desktop). */
  imageAlign?: "start" | "center";
}

const SHARED_CONDITIONS: ProposalConditions = {
  criancas: [
    "Até 6 anos: cortesia, não pagam",
    "De 7 a 8 anos: 50% do valor",
    "A partir de 9 anos: valor integral",
  ],
  pagamento: [
    "30% na assinatura do contrato",
    "30% até 30 dias antes do evento",
    "40% restantes até 10 dias antes do evento",
  ],
};

const IMG = {
  roll: {
    src: "/images/proposta/buffet/roll-bufala-pesto.webp",
    alt: "Roll de mussarela de búfala com pesto de tomate seco e rúcula no Espaço Coral em Batatais SP",
    w: 600,
    h: 291,
  },
  buffetCoral: {
    src: "/images/proposta/buffet/buffet-coral.webp",
    alt: "Buffet montado no Espaço Coral em Batatais SP",
    w: 527,
    h: 500,
  },
  cerveja: {
    src: "/images/proposta/buffet/cerveja-gelada.webp",
    alt: "Cerveja gelada servida no Espaço Coral em Batatais SP",
    w: 500,
    h: 575,
  },
  cafe: {
    src: "/images/proposta/buffet/cafe-buffet.webp",
    alt: "Mesa de café e doces do buffet do Espaço Coral em Batatais SP",
    w: 680,
    h: 400,
  },
  terrine: {
    src: "/images/proposta/buffet/terrine-pistache.webp",
    alt: "Terrine de gorgonzola com pistache e frutas secas no Espaço Coral em Batatais SP",
    w: 500,
    h: 575,
  },
} as const;

const SERVICOS_BUFFET: ProposalBlock = {
  eyebrow: "Serviços do buffet",
  note: "Inclusos",
  groups: [
    {
      subtitle: "Equipe",
      items: ["Maître", "Garçons", "Cozinheiras", "Copeiras", "Ajudantes"],
    },
    {
      subtitle: "Montagem e utensílios",
      items: [
        "Montagem da mesa do buffet",
        "Louças, taças, pratos e talheres",
        "Guardanapos de tecido branco para cada convidado",
        "Rechauds para manter os pratos aquecidos",
      ],
    },
  ],
};

const selecaoCoral: ProposalData = {
  slug: "selecao-coral",
  name: "Seleção Coral",
  tagline: "A partir de 80 convidados",
  intro:
    "Um cardápio completo e elegante, do receptivo ao cantinho do café, pensado para receber seus convidados com requinte do começo ao fim da festa.",
  heroImage: "/images/proposta/buffet/hero-selecao.webp",
  heroAlt: "Buffet do menu Seleção Coral no Espaço Coral em Batatais SP",
  whatsappText:
    "Olá! Gostaria de saber mais sobre o menu Seleção Coral do Espaço Coral.",
  blocks: [
    {
      eyebrow: "Receptivo",
      note: "Cortesia",
      groups: [
        {
          items: [
            "Água mineral",
            "Mix de castanhas",
            "Chá gelado com limão e gengibre",
            "Chá gelado com frutas vermelhas",
          ],
        },
      ],
    },
    {
      eyebrow: "Cerimônia no espaço",
      note: "Cortesia",
      groups: [{ items: ["Cerimônia realizada no local, com serviço cortesia"] }],
    },
    {
      eyebrow: "Ilha de degustação",
      image: IMG.roll,
      groups: [
        {
          subtitle: "Pães finos e castanhas",
          items: [
            "Mix de castanhas, damasco e ameixa seca",
            "Pães finos, grissinis e pão italiano",
            "Lascas de polvilho",
          ],
        },
        {
          subtitle: "Queijos finos e terrines",
          items: [
            "Queijo brie em crosta de fillo com mel e castanhas",
            "Roll de búfala ao pesto de tomate seco e rúcula",
            "Terrine de gorgonzola com pistache e frutas secas",
            "Parmesão com chutney de abacaxi",
            "Provolone",
            "Queijo gouda",
          ],
        },
        {
          subtitle: "Saladas e antepastos",
          items: ["Salada marroquina", "Caponata siciliana"],
        },
        {
          subtitle: "Seleção de charcutaria",
          items: ["Salame italiano", "Lombinho canadense", "Peito de peru"],
        },
        {
          subtitle: "Entradas especiais",
          items: [
            "Creme de catupiry com geléia de pimenta",
            "Tortelone de bacalhau",
            "Ostras de damasco com cream cheese e lâminas de amêndoas",
          ],
        },
      ],
    },
    {
      eyebrow: "Quiches",
      note: "Escolher 1 opção",
      groups: [
        { items: ["Lorraine", "Alho-poró", "Queijo brie com lascas de damasco"] },
      ],
    },
    {
      eyebrow: "Petit menu",
      note: "Escolher 2 opções",
      groups: [
        {
          items: [
            "Bacalhau dos deuses",
            "Gratin com carne de sol",
            "Polentinha cremosa com ragu de costela",
            "Fricassê de frango",
            "Casquinha de siri",
          ],
        },
      ],
    },
    {
      eyebrow: "Coquetel volante",
      note: "Escolher 2 opções",
      image: IMG.buffetCoral,
      groups: [
        {
          items: [
            "Supremo de camarão ao molho golf",
            "Fagotini de bacalhau com caramelo balsâmico",
            "Tortelone de vinagrete de pera e crispy de presunto parma",
            "Kafta no pau de canela com dip de iogurte",
            "Trouxinhas de carpaccio com tomate seco e castanhas",
            "Dadinho de tapioca com geléia de pimenta",
          ],
        },
      ],
    },
    {
      eyebrow: "Jantar",
      groups: [
        { subtitle: "Peixes", items: ["Filé de saint peter ao bechamel"] },
        {
          subtitle: "Carnes (escolher 1)",
          items: [
            "Escalope de mignon ao molho demi-glace e funghi",
            "Escalope de mignon ao molho provoleta",
          ],
        },
        {
          subtitle: "Massas (escolher 1)",
          items: [
            "Sofioli quatro queijos ao molho sugo ou al limone",
            "Ravioli de queijo pecorino com castanhas ao molho al limone ou sugo",
          ],
        },
        {
          subtitle: "Side dish (escolher 1)",
          items: ["Batatas sauté com azeite e ervas", "Suflê de alho-poró"],
        },
        {
          subtitle: "Acompanhamentos",
          items: ["Arroz com amêndoas", "Arroz branco"],
        },
      ],
    },
    {
      eyebrow: "Lanchinho da madrugada",
      note: "Volante · Escolher 1 opção",
      groups: [
        {
          items: [
            "Mini hot dog",
            "Caldinho de feijão",
            "Coxinha gourmet",
            "Mini hambúrguer gourmet",
          ],
        },
      ],
    },
    {
      eyebrow: "Final feliz",
      note: "Escolher 1 opção",
      groups: [
        {
          items: [
            "Sorvete de queijo com calda de goiabada",
            "Sorvete de creme com calda de banana",
            "Cocada cremosa",
            "Panna cotta de frutas vermelhas",
            "Cheesecake de morango",
          ],
        },
      ],
    },
    {
      eyebrow: "Closing service · Cantinho do café",
      groups: [
        {
          items: ["Café expresso", "Chás variados", "Licores artesanais", "Petit fours"],
        },
      ],
    },
    {
      eyebrow: "Pacote de bebidas",
      note: "Todos inclusos",
      image: IMG.cerveja,
      groups: [
        {
          subtitle: "Cervejas",
          items: ["Antarctica", "Brahma", "Skol", "Original", "Sem álcool"],
        },
        {
          subtitle: "Sucos naturais",
          items: ["Laranja", "Abacaxi com hortelã"],
        },
        {
          subtitle: "Refrigerantes",
          items: ["Guaraná Antarctica", "Coca-Cola (normal e zero)"],
        },
        { subtitle: "Água", items: ["Com e sem gás"] },
      ],
    },
    SERVICOS_BUFFET,
  ],
  conditions: SHARED_CONDITIONS,
};

const grandCoral: ProposalData = {
  slug: "grand-coral",
  name: "Grand Coral",
  tagline: "A partir de 80 convidados",
  intro:
    "Nosso cardápio mais completo. Uma seleção ampliada de queijos, entradas, jantares e finalizações para uma experiência gastronômica de alto padrão.",
  heroImage: "/images/proposta/buffet/hero-grand.webp",
  heroAlt: "Buffet do menu Grand Coral no Espaço Coral em Batatais SP",
  whatsappText:
    "Olá! Gostaria de saber mais sobre o menu Grand Coral do Espaço Coral.",
  blocks: [
    {
      eyebrow: "Receptivo",
      note: "Cortesia",
      groups: [
        {
          items: [
            "Água mineral",
            "Mix de castanhas",
            "Chá gelado com limão e gengibre",
            "Chá gelado com frutas vermelhas",
          ],
        },
      ],
    },
    {
      eyebrow: "Cerimônia no espaço",
      note: "Cortesia",
      groups: [{ items: ["Cerimônia realizada no local, com serviço cortesia"] }],
    },
    {
      eyebrow: "Ilha de degustação",
      image: IMG.terrine,
      groups: [
        {
          subtitle: "Pães finos e castanhas",
          items: [
            "Mix de castanhas, damasco e ameixa seca",
            "Pães finos, grissinis e pão italiano",
            "Lascas de polvilho",
          ],
        },
        {
          subtitle: "Queijos finos e terrines",
          items: [
            "Brie en crost de fillo com mel e castanhas",
            "Roll de búfala ao pesto de tomate seco e rúcula",
            "Terrine de gorgonzola com pistache e frutas secas",
            "Parmesão com chutney de abacaxi",
            "Emmental",
            "Gruyère com favo de mel",
            "Burrata ao pesto",
            "Queijo raclette derretido",
          ],
        },
        {
          subtitle: "Saladas e antepastos",
          items: ["Salada de bacalhau com grão de bico", "Caponata siciliana"],
        },
        {
          subtitle: "Seleção de charcutaria",
          items: ["Salame italiano", "Presunto parma", "Copa lombo"],
        },
        {
          subtitle: "Entradas especiais",
          items: [
            "Creme de catupiry com geléia de pimenta",
            "Charutinho de tâmara com cream cheese e lâminas de morango",
            "Tortelone de bacalhau com cebola caramelizada",
            "Ostras de damasco com cream cheese e lâminas de amêndoas",
          ],
        },
      ],
    },
    {
      eyebrow: "Quiches",
      note: "Escolher 1 opção",
      groups: [
        { items: ["Lorraine", "Alho-poró", "Queijo brie com lascas de damasco"] },
      ],
    },
    {
      eyebrow: "Petit menu",
      note: "Escolher 2 opções",
      groups: [
        {
          items: [
            "Bobó de camarão",
            "Bacalhau dos deuses",
            "Bacalhau nas natas",
            "Filetinho de mignon ao molho demi-glace",
            "Filetinho de mignon ao molho de gorgonzola",
            "Gratin com carne de sol",
            "Polentinha cremosa com ragu de cordeiro",
            "Fricassê de frango",
            "Risoto de queijo",
            "Risoto de limão siciliano",
            "Risoto de alho-poró",
            "Risoto de palmito",
          ],
        },
      ],
    },
    {
      eyebrow: "Coquetel volante",
      note: "Escolher 4 opções",
      image: IMG.roll,
      groups: [
        {
          items: [
            "Supremo de camarão ao molho golf",
            "Fagotini de bacalhau com caramelo balsâmico",
            "Tortelone de vinagrete de pera e crispy de presunto parma",
            "Kafta no pau de canela com dip de iogurte",
            "Trouxinhas de carpaccio com tomate seco e castanhas",
            "Dadinho de tapioca com geléia de pimenta",
            "Quibe gourmet com coalhada seca",
            "Caponata na lasca de polvilho",
            "Stick caprese ao pesto de manjericão",
          ],
        },
      ],
    },
    {
      eyebrow: "Jantar",
      groups: [
        {
          subtitle: "Peixes (escolher 1)",
          items: [
            "Filé de saint peter ao bechamel",
            "Filé de saint peter ao molho rosê",
            "Abadejo ao bechamel",
            "Abadejo ao molho de alho-poró",
          ],
        },
        {
          subtitle: "Carnes (escolher 1)",
          items: [
            "Medalhão de mignon ao molho demi-glace e funghi",
            "Escalope de mignon ao molho de queijo gorgonzola",
            "Filet mignon recheado com tomate seco e mozzarela de búfala",
            "Pernil de cordeiro ao vinho do porto e peras caramelizadas",
          ],
        },
        {
          subtitle: "Massas (escolher 1)",
          items: [
            "Ravioli de queijo pecorino com castanhas ao molho al limone",
            "Ravioli de queijo pecorino com castanhas ao molho sugo",
            "Sofioli quatro queijos ao molho sugo",
            "Sofioli quatro queijos ao molho al limone",
          ],
        },
        {
          subtitle: "Side dish (escolher 1)",
          items: ["Batatas sauté com azeite e ervas", "Ratatouille"],
        },
        {
          subtitle: "Acompanhamentos",
          items: ["Arroz com amêndoas", "Arroz branco"],
        },
      ],
    },
    {
      eyebrow: "Lanchinho da madrugada",
      note: "Volante · Escolher 1 opção",
      groups: [
        {
          items: [
            "Mini hot dog",
            "Caldinho de feijão",
            "Coxinha gourmet",
            "Mini hambúrguer gourmet",
          ],
        },
      ],
    },
    {
      eyebrow: "Final feliz",
      note: "Escolher 1 opção",
      groups: [
        {
          items: [
            "Sorvete de queijo com calda de goiabada",
            "Sorvete de creme com calda de banana",
            "Cocada cremosa",
            "Panna cotta de frutas vermelhas",
            "Cheesecake de morango",
          ],
        },
      ],
    },
    {
      eyebrow: "Closing service · Cantinho do café",
      groups: [
        {
          items: ["Café expresso", "Chás variados", "Licores artesanais", "Petit fours"],
        },
      ],
    },
    {
      eyebrow: "Pacote de bebidas",
      note: "Todos inclusos",
      image: IMG.cerveja,
      groups: [
        {
          subtitle: "Cervejas",
          items: ["Antarctica", "Brahma", "Skol ou Original", "Sem álcool"],
        },
        {
          subtitle: "Sucos naturais",
          items: ["Laranja", "Abacaxi com hortelã"],
        },
        {
          subtitle: "Refrigerantes",
          items: ["Guaraná Antarctica (normal e zero)", "Coca-Cola (normal e zero)"],
        },
        { subtitle: "Água", items: ["Com e sem gás"] },
      ],
    },
    {
      eyebrow: "Serviços do buffet",
      note: "Inclusos",
      groups: [
        {
          subtitle: "Equipe",
          items: [
            "Maître",
            "Garçons",
            "Cozinheiras",
            "Copeiras",
            "Ajudantes",
            "Garçom especial para noivos, debutantes ou aniversariante",
          ],
        },
        {
          subtitle: "Montagem e utensílios",
          items: [
            "Montagem da mesa do buffet",
            "Louças, taças, pratos, talheres e vidros",
            "Guardanapos de tecido branco para cada convidado",
            "Rechauds para manter os pratos aquecidos",
          ],
        },
      ],
    },
  ],
  conditions: SHARED_CONDITIONS,
};

const botequimCoral: ProposalData = {
  slug: "botequim-coral",
  name: "Botequim Coral",
  tagline: "A partir de 80 convidados",
  intro:
    "Uma proposta descontraída e farta, com a alma do boteco. Tortas, finger foods, pastéis, massas e o clássico cantinho do boteco para uma festa cheia de sabor.",
  heroImage: "/images/proposta/buffet/hero-botequim.webp",
  heroAlt: "Buffet do menu Botequim Coral no Espaço Coral em Batatais SP",
  whatsappText:
    "Olá! Gostaria de saber mais sobre o menu Botequim Coral do Espaço Coral.",
  blocks: [
    {
      eyebrow: "Ilha de degustação",
      groups: [
        {
          subtitle: "Tortas e quiches (escolher 4)",
          items: [
            "Torta de frango com catupiry",
            "Torta de palmito com tomate seco e ameixa",
            "Torta de legumes",
            "Quiche de alho-poró",
            "Quiche quatro queijos com requeijão",
            "Quiche de palmito com cream cheese",
            "Acompanha bruschetta, pão sírio e queijinhos prensados",
          ],
        },
        {
          subtitle: "Patês e terrines (escolher 3)",
          items: [
            "Patê de frango",
            "Patê de palmito",
            "Patê de tomate seco",
            "Terrine caprese",
            "Terrine de bacon com ricota e cream cheese",
          ],
        },
      ],
    },
    {
      eyebrow: "Saladas",
      note: "Todas inclusas",
      groups: [
        {
          items: [
            "Escabeche de girelo com pimentão e orégano",
            "Caponata na casquinha",
            "Quibe cru com hortelã e limão",
            "Salada crocante na taça com kani e tortilhas",
            "Salada Dakota",
          ],
        },
      ],
    },
    {
      eyebrow: "Cantinho do boteco",
      note: "Todas inclusas",
      image: IMG.cerveja,
      groups: [
        {
          items: [
            "Torresminho",
            "Batata palha",
            "Salame italiano",
            "Dados de mussarela",
            "Ovo de codorna",
            "Lombinho canadense",
            "Peito de peru",
            "Presunto em cubos",
            "Mix de amendoins",
            "Azeitonas verdes e pretas",
            "Seleção de pães",
          ],
        },
      ],
    },
    {
      eyebrow: "Finger foods",
      note: "Escolher 6 opções",
      groups: [
        {
          items: [
            "Quiche de alho-poró",
            "Quiche de palmito",
            "Bolinho de bacalhau",
            "Bolinha de queijo",
            "Bolinha primavera",
            "Bolinho de carne seca",
            "Coxinha de frango",
            "Isca de frango",
            "Quibe",
            "Pastel de queijo mineiro",
            "Pastel de carne",
            "Pastel de frango com catupiry",
            "Pastel de pizza",
            "Pastel de carne seca",
            "Mix de pastéis",
            "Empada de frango",
            "Esfiha de carne",
            "Esfiha de frango com catupiry",
          ],
        },
      ],
    },
    {
      eyebrow: "Degustação de massas",
      note: "Escolher 2 opções",
      groups: [
        {
          items: [
            "Escondidinho de carne seca com mandioca",
            "Rondelli quatro queijos ao molho branco",
            "Caneloni de presunto e mussarela ao molho sugo",
          ],
        },
      ],
    },
    {
      eyebrow: "Jantar",
      note: "Todos inclusos",
      groups: [
        {
          items: [
            "Alcatra ao molho madeira",
            "Filé de frango grelhado ao molho branco",
            "Farofa à califórnia",
            "Abacaxi à moda do chef",
            "Batata sauté com queijo parmesão",
            "Arroz branco",
          ],
        },
      ],
    },
    {
      eyebrow: "Cantinho do café",
      image: IMG.cafe,
      groups: [{ items: ["Café", "Bolachinhas"] }],
    },
    {
      eyebrow: "Pacote de bebidas",
      note: "Todos inclusos",
      groups: [
        {
          subtitle: "Cervejas",
          items: ["Antarctica", "Brahma", "Skol ou Original", "Sem álcool"],
        },
        { subtitle: "Sucos naturais", items: ["Laranja"] },
        {
          subtitle: "Refrigerantes",
          items: ["Guaraná Antarctica (normal e zero)", "Coca-Cola (normal e zero)"],
        },
        { subtitle: "Água", items: ["Com e sem gás"] },
      ],
    },
    SERVICOS_BUFFET,
  ],
  conditions: SHARED_CONDITIONS,
};

const coralElegance: ProposalData = {
  slug: "coral-elegance",
  name: "Coral Elegance",
  tagline: "Decoração",
  intro:
    "Um projeto de decoração personalizado, do altar à mesa do bolo. Arranjos florais, ambientação do salão e consultoria completa para transformar cada espaço da sua festa.",
  heroImage: "/images/proposta/decoracao/hero-coral-elegance.webp",
  heroAlt:
    "Decoração de cerimônia ao ar livre no gramado do Espaço Coral em Batatais SP",
  imageAlign: "center",
  whatsappText:
    "Olá! Gostaria de saber mais sobre a decoração Coral Elegance do Espaço Coral.",
  blocks: [
    {
      eyebrow: "Mesa do bolo",
      image: {
        src: "/images/proposta/decoracao/bolo-mesa.webp",
        alt: "Bolo de casamento na mesa decorada do Espaço Coral em Batatais SP",
        w: 400,
        h: 671,
      },
      groups: [
        {
          items: [
            "4 arranjos florais de grande porte em vasos ou ânforas",
            "4 arranjos florais de pequeno porte",
            "15 suportes para doces",
            "20 m² de carpete para a mesa do bolo",
            "Mesa de 4,6 m em madeira nobre",
          ],
        },
      ],
    },
    {
      eyebrow: "Mesas dos convidados",
      image: {
        src: "/images/proposta/decoracao/arranjo-alto-mesas.webp",
        alt: "Arranjo alto de flores para as mesas dos convidados no Espaço Coral",
        w: 500,
        h: 923,
      },
      groups: [
        {
          items: [
            "18 arranjos florais (altos, baixos ou suspensos)",
            "2 arranjos florais para a mesa de família",
          ],
        },
      ],
    },
    {
      eyebrow: "Salão interno",
      image: {
        src: "/images/proposta/decoracao/arranjo-aereo.webp",
        alt: "Jardim aéreo com arranjo floral suspenso em festa de casamento no Espaço Coral em Batatais",
        w: 500,
        h: 911,
      },
      groups: [
        {
          items: [
            "1 arranjo grande para o buffet",
            "4 árvores francesas",
            "Almofadas nas cores da festa",
            "1 jardim aéreo ou 4 estruturas suspensas",
          ],
        },
      ],
    },
    {
      eyebrow: "Armários, bistrôs e toilettes",
      image: {
        src: "/images/proposta/decoracao/vasos-pequenos.webp",
        alt: "Vasos pequenos complementando a decoração da festa no Espaço Coral",
        w: 500,
        h: 786,
      },
      groups: [
        {
          items: [
            "20 arranjos pequenos em vasinhos delicados",
            "Canela em pau para as cubas dos lavabos",
          ],
        },
      ],
    },
    {
      eyebrow: "Cerimônia",
      image: {
        src: "/images/proposta/decoracao/altar-cerimonia-gramado.webp",
        alt: "Altar de cerimônia no gramado do Espaço Coral em Batatais SP",
        w: 800,
        h: 967,
      },
      groups: [
        {
          items: [
            "2 arranjos para o altar",
            "Canteiro contínuo de flores ou composição de vasos e cestarias",
          ],
        },
      ],
    },
    {
      eyebrow: "Consultoria e projeto",
      image: {
        src: "/images/proposta/decoracao/arranjo-vaso-dourado.webp",
        alt: "Arranjo floral alto com vaso dourado para casamentos no Espaço Coral em Batatais",
        w: 500,
        h: 901,
      },
      groups: [
        {
          items: [
            "Layout elaborado por decorador profissional",
            "Distribuição de mesas e mobiliário",
            "Definição de ambientação e estilo",
            "Supervisão completa da montagem",
          ],
        },
      ],
    },
    {
      eyebrow: "Orientações sobre a decoração",
      image: {
        src: "/images/proposta/decoracao/arvore-francesa.webp",
        alt: "Árvore francesa decorando a pista de dança de casamento no Espaço Coral em Batatais",
        w: 612,
        h: 1148,
      },
      groups: [
        {
          items: [
            "Cores, formatos e modelos podem ser ajustados sem custo adicional.",
          ],
        },
        {
          subtitle: "Flores",
          items: [
            "Rosas, mini-rosas, alstroemérias, lisianthus, boca de leão e lírios",
          ],
        },
        {
          subtitle: "Folhagens",
          items: ["Pittosporo, fotínia, rusco, cheflera e aspargo míster"],
        },
      ],
    },
  ],
};

export const PROPOSALS: Record<string, ProposalData> = {
  "selecao-coral": selecaoCoral,
  "grand-coral": grandCoral,
  "botequim-coral": botequimCoral,
  "coral-elegance": coralElegance,
};
