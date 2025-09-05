import type { LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";

// Mapeamento de signos para normalização
const signMapping: Record<string, string> = {
  'aries': 'aries',
  'áries': 'aries',
  'touro': 'touro',
  'taurus': 'touro',
  'gemeos': 'gemeos',
  'gêmeos': 'gemeos',
  'gemini': 'gemeos',
  'cancer': 'cancer',
  'câncer': 'cancer',
  'leao': 'leao',
  'leão': 'leao',
  'leo': 'leao',
  'virgem': 'virgem',
  'virgo': 'virgem',
  'libra': 'libra',
  'escorpiao': 'escorpiao',
  'escorpião': 'escorpiao',
  'scorpio': 'escorpiao',
  'sagitario': 'sagitario',
  'sagitário': 'sagitario',
  'sagittarius': 'sagitario',
  'capricornio': 'capricornio',
  'capricórnio': 'capricornio',
  'capricorn': 'capricornio',
  'aquario': 'aquario',
  'aquário': 'aquario',
  'aquarius': 'aquario',
  'peixes': 'peixes',
  'pisces': 'peixes'
};

// Dados completos dos signos
const signosData = {
  aries: {
    nome: "Áries",
    simbolo: "♈",
    elemento: "Fogo",
    planeta_regente: "Marte",
    periodo: "21 de março a 19 de abril",
    descricao_geral: "Áries é o primeiro signo do zodíaco e representa o início de tudo. São pessoas dinâmicas, corajosas e pioneiras, sempre prontas para novos desafios. Possuem uma energia natural de liderança e não tem medo de tomar iniciativas.",
    personalidade: {
      caracteristicas_principais: [
        "Liderança natural e iniciativa",
        "Coragem para enfrentar desafios",
        "Energia e entusiasmo contagiantes",
        "Independência e autonomia",
        "Honestidade e franqueza",
        "Competitividade saudável",
        "Otimismo e confiança",
        "Rapidez nas decisões"
      ],
      pontos_fortes: [
        "Pioneirismo em projetos",
        "Capacidade de motivar outros",
        "Determinação inabalável",
        "Autenticidade genuína",
        "Espírito aventureiro",
        "Proteção aos que ama"
      ],
      desafios: [
        "Impaciência excessiva",
        "Impulsividade nas decisões",
        "Tendência à agressividade",
        "Dificuldade em aceitar críticas",
        "Egoísmo ocasional",
        "Falta de persistência em projetos longos"
      ]
    },
    vida_amorosa: {
      estilo_romantico: [
        "Paixão intensa e avassaladora",
        "Romantismo direto e sincero",
        "Gosta de conquistar e ser conquistado",
        "Expressão física do amor",
        "Lealdade absoluta quando comprometido"
      ],
      compatibilidades: [
        "Leão - Conexão fogosa e apaixonada",
        "Sagitário - Aventura e liberdade compartilhadas",
        "Gêmeos - Estímulo intelectual mútuo",
        "Aquário - Independência respeitada"
      ],
      desafios_amorosos: [
        "Ciúme possessivo",
        "Pressa em relacionamentos",
        "Dificuldade com rotina amorosa",
        "Necessidade de espaço pessoal"
      ]
    },
    vida_profissional: {
      talentos_profissionais: [
        "Liderança de equipes",
        "Inovação e criatividade",
        "Tomada de decisões rápidas",
        "Motivação de pessoas",
        "Resolução de problemas",
        "Empreendedorismo"
      ],
      carreiras_ideais: [
        "Empresário/Empreendedor",
        "Gerente/Diretor",
        "Atleta profissional",
        "Militar/Policial",
        "Vendedor/Representante",
        "Cirurgião",
        "Advogado",
        "Jornalista",
        "Chef de cozinha",
        "Personal trainer"
      ],
      ambiente_trabalho_ideal: [
        "Dinâmico e desafiador",
        "Com autonomia para decisões",
        "Ambiente competitivo",
        "Projetos inovadores",
        "Equipe motivada"
      ]
    },
    saude_bem_estar: {
      pontos_atencao: [
        "Cabeça e enxaquecas",
        "Pressão arterial",
        "Acidentes por impulsividade",
        "Estresse e tensão muscular"
      ],
      atividades_recomendadas: [
        "Esportes competitivos",
        "Artes marciais",
        "Corrida e atletismo",
        "Atividades ao ar livre",
        "Exercícios de alta intensidade"
      ]
    },
    dicas_desenvolvimento: [
      "Pratique a paciência em situações importantes",
      "Aprenda a ouvir antes de falar",
      "Desenvolva persistência em projetos longos",
      "Canalize a energia competitiva positivamente",
      "Busque equilibrio entre ação e reflexão"
    ]
  },
  touro: {
    nome: "Touro",
    simbolo: "♉",
    elemento: "Terra",
    planeta_regente: "Vênus",
    periodo: "20 de abril a 20 de maio",
    descricao_geral: "Touro é conhecido pela estabilidade, persistência e amor pela beleza. São pessoas práticas, confiáveis e que valorizam o conforto e a segurança. Possuem uma conexão especial com a natureza e os prazeres sensoriais da vida.",
    personalidade: {
      caracteristicas_principais: [
        "Estabilidade e confiabilidade",
        "Persistência e determinação",
        "Amor pela beleza e conforto",
        "Paciência excepcional",
        "Senso prático aguçado",
        "Lealdade inabalável",
        "Conexão com a natureza",
        "Apreciação dos prazeres da vida"
      ],
      pontos_fortes: [
        "Construção de relacionamentos duradouros",
        "Capacidade de economizar e investir",
        "Habilidades artísticas naturais",
        "Força de vontade impressionante",
        "Senso estético refinado",
        "Proteção da família"
      ],
      desafios: [
        "Resistência excessiva a mudanças",
        "Teimosia e inflexibilidade",
        "Materialismo exagerado",
        "Lentidão para tomar decisões",
        "Tendência ao ciúme possessivo",
        "Dificuldade em perdoar"
      ]
    },
    vida_amorosa: {
      estilo_romantico: [
        "Amor estável e duradouro",
        "Demonstrações físicas de carinho",
        "Romantismo através de presentes",
        "Construção de um lar aconchegante",
        "Fidelidade absoluta"
      ],
      compatibilidades: [
        "Virgem - Praticidade e organização compartilhadas",
        "Capricórnio - Objetivos materiais similares",
        "Câncer - Amor pelo lar e família",
        "Peixes - Complemento emocional e artístico"
      ],
      desafios_amorosos: [
        "Ciúme possessivo extremo",
        "Resistência a mudanças na relação",
        "Expectativas materialistas",
        "Dificuldade em expressar emoções verbalmente"
      ]
    },
    vida_profissional: {
      talentos_profissionais: [
        "Gestão financeira",
        "Trabalho com as mãos",
        "Senso estético e design",
        "Persistência em projetos longos",
        "Construção de relacionamentos sólidos",
        "Organização e método"
      ],
      carreiras_ideais: [
        "Banqueiro/Consultor financeiro",
        "Arquiteto/Designer",
        "Chef/Confeiteiro",
        "Fazendeiro/Jardineiro",
        "Joalheiro/Artesão",
        "Cantor/Músico",
        "Corretor de imóveis",
        "Massagista/Terapeuta",
        "Contador",
        "Construtor civil"
      ],
      ambiente_trabalho_ideal: [
        "Estável e previsível",
        "Confortável e bem equipado",
        "Com segurança financeira",
        "Ambiente natural ou artístico",
        "Equipe confiável"
      ]
    },
    saude_bem_estar: {
      pontos_atencao: [
        "Pescoço e garganta",
        "Problemas de tireoide",
        "Ganho de peso",
        "Problemas circulatórios"
      ],
      atividades_recomendadas: [
        "Caminhadas na natureza",
        "Yoga e tai chi",
        "Dança e expressão corporal",
        "Jardinagem",
        "Massagens relaxantes"
      ]
    },
    dicas_desenvolvimento: [
      "Pratique a flexibilidade em situações de mudança",
      "Desenvolva a comunicação emocional",
      "Equilibre materialismo com espiritualidade",
      "Aprenda a perdoar e deixar ir",
      "Cultive a paciência com os tempos dos outros"
    ]
  },
  gemeos: {
    nome: "Gêmeos",
    simbolo: "♊",
    elemento: "Ar",
    planeta_regente: "Mercúrio",
    periodo: "21 de maio a 20 de junho",
    descricao_geral: "Gêmeos é o signo da comunicação, versatilidade e curiosidade intelectual. São pessoas adaptáveis, inteligentes e sociais, sempre em busca de novas informações e experiências. Possuem uma mente ágil e facilidade para se conectar com diferentes tipos de pessoas.",
    personalidade: {
      caracteristicas_principais: [
        "Comunicação excepcional",
        "Versatilidade e adaptabilidade",
        "Curiosidade intelectual infinita",
        "Sociabilidade natural",
        "Agilidade mental impressionante",
        "Facilidade para aprender",
        "Senso de humor apurado",
        "Energia jovem e dinâmica"
      ],
      pontos_fortes: [
        "Capacidade de networking",
        "Habilidade com idiomas",
        "Facilidade para ensinar",
        "Adaptação a novos ambientes",
        "Criatividade na comunicação",
        "Resolução rápida de problemas"
      ],
      desafios: [
        "Dispersão e falta de foco",
        "Superficialidade em relacionamentos",
        "Ansiedade e nervosismo",
        "Inconstância em compromissos",
        "Tendência à fofoca",
        "Dificuldade em tomar decisões definitivas"
      ]
    },
    vida_amorosa: {
      estilo_romantico: [
        "Conquista através da conversa",
        "Necessidade de estímulo intelectual",
        "Variedade e novidade na relação",
        "Comunicação constante",
        "Flerte natural e charmoso"
      ],
      compatibilidades: [
        "Libra - Harmonia intelectual e social",
        "Aquário - Liberdade e inovação compartilhadas",
        "Áries - Energia e aventura mútuaas",
        "Leão - Diversão e criatividade em comum"
      ],
      desafios_amorosos: [
        "Dificuldade com compromissos sérios",
        "Necessidade constante de novidade",
        "Comunicação excessiva pode cansar",
        "Evitar profundidade emocional"
      ]
    },
    vida_profissional: {
      talentos_profissionais: [
        "Comunicação e oratória",
        "Escrita e redação",
        "Vendas e negociação",
        "Ensino e treinamento",
        "Tradução e interpretação",
        "Networking profissional"
      ],
      carreiras_ideais: [
        "Jornalista/Repórter",
        "Professor/Educador",
        "Vendedor/Representante comercial",
        "Tradutor/Intérprete",
        "Escritor/Autor",
        "Publicitário/Marketeiro",
        "Locutor/Apresentador",
        "Guia turístico",
        "Bibliotecário",
        "Consultor de comunicação"
      ],
      ambiente_trabalho_ideal: [
        "Dinâmico e variado",
        "Com interação social constante",
        "Acesso a informações atualizadas",
        "Flexibilidade de horários",
        "Projetos diferentes e desafiadores"
      ]
    },
    saude_bem_estar: {
      pontos_atencao: [
        "Sistema nervoso e ansiedade",
        "Problemas respiratórios",
        "Tensão nos ombros e braços",
        "Insônia por mente agitada"
      ],
      atividades_recomendadas: [
        "Exercícios de respiração",
        "Meditação mindfulness",
        "Esportes de coordenação",
        "Leitura e escrita",
        "Jogos mentais e quebra-cabeças"
      ]
    },
    dicas_desenvolvimento: [
      "Pratique a concentração em uma tarefa por vez",
      "Desenvolva relacionamentos mais profundos",
      "Aprenda técnicas de relaxamento mental",
      "Cultive a paciência com processos lentos",
      "Equilibre informação com sabedoria"
    ]
  },
  cancer: {
    nome: "Câncer",
    simbolo: "♋",
    elemento: "Água",
    planeta_regente: "Lua",
    periodo: "21 de junho a 22 de julho",
    descricao_geral: "Câncer é o signo do cuidado, proteção e intuição. São pessoas emotivas, empáticas e familiares, com forte conexão com o lar e as tradições. Possuem uma sensibilidade especial para compreender as emoções dos outros e oferecer apoio.",
    personalidade: {
      caracteristicas_principais: [
        "Empatia e sensibilidade profunda",
        "Instinto protetor desenvolvido",
        "Intuição aguçada",
        "Amor pela família e tradições",
        "Memória emocional excepcional",
        "Capacidade de cuidar dos outros",
        "Imaginação rica e criativa",
        "Lealdade incondicional"
      ],
      pontos_fortes: [
        "Habilidade para nutrir e cuidar",
        "Compreensão emocional profunda",
        "Criação de ambientes acolhedores",
        "Memória excepcional para detalhes",
        "Intuição para necessidades alheias",
        "Fidelidade em relacionamentos"
      ],
      desafios: [
        "Mudanças de humor frequentes",
        "Tendência à melancolia",
        "Super proteção excessiva",
        "Dificuldade em perdoar mágoas",
        "Apego exagerado ao passado",
        "Sensibilidade extrema a críticas"
      ]
    },
    vida_amorosa: {
      estilo_romantico: [
        "Amor maternal/paternal profundo",
        "Criação de um lar aconchegante",
        "Demonstrações de carinho através do cuidado",
        "Romantismo tradicional e nostálgico",
        "Proteção emocional do parceiro"
      ],
      compatibilidades: [
        "Escorpião - Profundidade emocional compartilhada",
        "Peixes - Sintonia espiritual e intuitiva",
        "Touro - Estabilidade e construção do lar",
        "Virgem - Cuidado mútuo e dedicação"
      ],
      desafios_amorosos: [
        "Ciúme e possessividade",
        "Expectativas emocionais altas",
        "Dificuldade em lidar com rejeição",
        "Tendência a se fechar emocionalmente"
      ]
    },
    vida_profissional: {
      talentos_profissionais: [
        "Cuidado e assistência a pessoas",
        "Criação de ambientes acolhedores",
        "Gestão de recursos familiares",
        "Preservação de tradições",
        "Trabalho em equipe colaborativo",
        "Intuição para necessidades do mercado"
      ],
      carreiras_ideais: [
        "Enfermeiro/Cuidador",
        "Professor/Educador infantil",
        "Psicólogo/Terapeuta",
        "Chef/Nutricionista",
        "Assistente social",
        "Museólogo/Historiador",
        "Decorador/Designer de interiores",
        "Veterinário",
        "Hoteleiro/Recepcionista",
        "Conselheiro familiar"
      ],
      ambiente_trabalho_ideal: [
        "Acolhedor e familiar",
        "Com propósito humanitário",
        "Estável e seguro",
        "Equipe unida e colaborativa",
        "Flexibilidade para questões familiares"
      ]
    },
    saude_bem_estar: {
      pontos_atencao: [
        "Sistema digestivo e estômago",
        "Problemas emocionais e depressão",
        "Retenção de líquidos",
        "Seios e sistema reprodutivo"
      ],
      atividades_recomendadas: [
        "Natação e atividades aquáticas",
        "Yoga restaurativa",
        "Caminhadas na praia ou lago",
        "Meditação e relaxamento",
        "Atividades em família"
      ]
    },
    dicas_desenvolvimento: [
      "Aprenda a colocar limites saudáveis",
      "Desenvolva independência emocional",
      "Pratique o perdão e o deixar ir",
      "Equilibre cuidar dos outros com autocuidado",
      "Cultive confiança em sua intuição"
    ]
  },
  leao: {
    nome: "Leão",
    simbolo: "♌",
    elemento: "Fogo",
    planeta_regente: "Sol",
    periodo: "23 de julho a 22 de agosto",
    descricao_geral: "Leão é o signo da expressividade, criatividade e liderança natural. São pessoas magnéticas, generosas e orgulhosas, que brilham naturalmente em qualquer ambiente. Possuem um coração nobre e adoram ser admirados e reconhecidos.",
    personalidade: {
      caracteristicas_principais: [
        "Carisma e magnetismo natural",
        "Generosidade e nobreza de caráter",
        "Criatividade e expressão artística",
        "Liderança inspiradora",
        "Autoconfiança e orgulho",
        "Lealdade real aos amigos",
        "Dramaticidade natural",
        "Otimismo contagiante"
      ],
      pontos_fortes: [
        "Capacidade de inspirar outros",
        "Talentos artísticos naturais",
        "Generosidade sem limites",
        "Coragem para assumir riscos",
        "Habilidade para entreter",
        "Liderança carismática"
      ],
      desafios: [
        "Ego inflado e arrogância",
        "Necessidade excessiva de atenção",
        "Dificuldade em aceitar críticas",
        "Tendência ao drama desnecessário",
        "Orgulho que impede pedidos de ajuda",
        "Expectativas altas demais dos outros"
      ]
    },
    vida_amorosa: {
      estilo_romantico: [
        "Romance grandioso e teatral",
        "Demonstrações públicas de afeto",
        "Presentes luxuosos e gestos marcantes",
        "Paixão intensa e fiel",
        "Transformação do parceiro em sua plateia especial"
      ],
      compatibilidades: [
        "Áries - Paixão e aventura compartilhadas",
        "Sagitário - Otimismo e liberdade mútuos",
        "Gêmeos - Diversão e estimulação intelectual",
        "Libra - Amor pela beleza e harmonia"
      ],
      desafios_amorosos: [
        "Ciúme do sucesso do parceiro",
        "Necessidade de ser sempre o centro",
        "Orgulho que dificulta pedidos de desculpa",
        "Expectativas românticas muito altas"
      ]
    },
    vida_profissional: {
      talentos_profissionais: [
        "Liderança e motivação de equipes",
        "Performance e apresentação",
        "Criatividade e inovação",
        "Vendas e persuasão",
        "Organização de eventos",
        "Inspiração e coaching"
      ],
      carreiras_ideais: [
        "Ator/Atriz",
        "Diretor/Produtor",
        "CEO/Presidente",
        "Vendedor de luxo",
        "Organizador de eventos",
        "Professor/Palestrante",
        "Estilista/Designer",
        "Artista/Performer",
        "Político",
        "Coach/Mentor"
      ],
      ambiente_trabalho_ideal: [
        "Visibilidade e reconhecimento",
        "Criativo e inspirador",
        "Posição de liderança",
        "Ambiente luxuoso ou artístico",
        "Oportunidades de brilhar"
      ]
    },
    saude_bem_estar: {
      pontos_atencao: [
        "Coração e sistema cardiovascular",
        "Coluna e postura",
        "Stress por excesso de responsabilidade",
        "Problemas relacionados ao ego ferido"
      ],
      atividades_recomendadas: [
        "Dança e performance",
        "Exercícios cardiovasculares",
        "Teatro e expressão artística",
        "Esportes em equipe",
        "Atividades ao sol"
      ]
    },
    dicas_desenvolvimento: [
      "Pratique a humildade sem perder a autoestima",
      "Aprenda a dividir os holofotes",
      "Desenvolva a escuta ativa",
      "Cultive a generosidade sem esperar reconhecimento",
      "Equilibre confiança com receptividade a feedback"
    ]
  },
  virgem: {
    nome: "Virgem",
    simbolo: "♍",
    elemento: "Terra",
    planeta_regente: "Mercúrio",
    periodo: "23 de agosto a 22 de setembro",
    descricao_geral: "Virgem é o signo da perfeição, serviço e análise detalhada. São pessoas meticulosas, práticas e dedicadas, sempre buscando a excelência em tudo que fazem. Possuem uma mente analítica aguçada e desejo genuíno de ajudar os outros.",
    personalidade: {
      caracteristicas_principais: [
        "Perfecionismo e atenção aos detalhes",
        "Praticidade e eficiência",
        "Desejo de servir e ajudar",
        "Organização impecável",
        "Análise crítica apurada",
        "Modéstia e humildade",
        "Inteligência prática",
        "Senso de responsabilidade"
      ],
      pontos_fortes: [
        "Capacidade analítica excepcional",
        "Organização e método",
        "Confiabilidade total",
        "Habilidade para resolver problemas",
        "Dedicação ao trabalho",
        "Senso de justiça"
      ],
      desafios: [
        "Perfeccionismo paralisante",
        "Excesso de críticas a si e outros",
        "Preocupação excessiva com detalhes",
        "Dificuldade em relaxar",
        "Tendência ao pessimismo",
        "Ansiedade por controle"
      ]
    },
    vida_amorosa: {
      estilo_romantico: [
        "Amor demonstrado através do serviço",
        "Atenção cuidadosa às necessidades do parceiro",
        "Romance construído gradualmente",
        "Fidelidade e comprometimento absolutos",
        "Cuidado prático com bem-estar do amado"
      ],
      compatibilidades: [
        "Touro - Praticidade e estabilidade compartilhadas",
        "Capricórnio - Objetivos e métodos similares",
        "Câncer - Cuidado mútuo e dedicação",
        "Escorpião - Profundidade e lealdade"
      ],
      desafios_amorosos: [
        "Críticas excessivas ao parceiro",
        "Dificuldade em expressar emoções",
        "Expectativas perfeccionistas",
        "Tendência a 'consertar' o outro"
      ]
    },
    vida_profissional: {
      talentos_profissionais: [
        "Análise e pesquisa detalhada",
        "Organização e sistemização",
        "Qualidade e controle",
        "Serviço ao cliente",
        "Solução de problemas complexos",
        "Eficiência operacional"
      ],
      carreiras_ideais: [
        "Médico/Enfermeiro",
        "Contador/Auditor",
        "Analista/Pesquisador",
        "Editor/Revisor",
        "Nutricionista/Dietista",
        "Bibliotecário",
        "Administrador",
        "Programador/Analista de sistemas",
        "Veterinário",
        "Consultor de qualidade"
      ],
      ambiente_trabalho_ideal: [
        "Organizado e sistemático",
        "Com padrões de qualidade altos",
        "Oportunidades de aperfeiçoamento",
        "Ambiente de serviço",
        "Ferramentas adequadas para o trabalho"
      ]
    },
    saude_bem_estar: {
      pontos_atencao: [
        "Sistema digestivo e intestinal",
        "Ansiedade e stress",
        "Tensão muscular por excesso de trabalho",
        "Problemas de pele por stress"
      ],
      atividades_recomendadas: [
        "Yoga e pilates",
        "Caminhadas organizadas",
        "Jardinagem e trabalho manual",
        "Meditação mindfulness",
        "Atividades de artesanato"
      ]
    },
    dicas_desenvolvimento: [
      "Pratique a aceitação da imperfeição",
      "Aprenda a delegar e confiar nos outros",
      "Desenvolva a expressão emocional",
      "Cultive o olhar para o todo, não só detalhes",
      "Equilibre crítica com elogios"
    ]
  },
  libra: {
    nome: "Libra",
    simbolo: "♎",
    elemento: "Ar",
    planeta_regente: "Vênus",
    periodo: "23 de setembro a 22 de outubro",
    descricao_geral: "Libra é o signo do equilíbrio, harmonia e relacionamentos. São pessoas diplomáticas, charmosas e com forte senso estético. Buscam constantemente a justiça e a paz, evitando conflitos e promovendo a cooperação entre as pessoas.",
    personalidade: {
      caracteristicas_principais: [
        "Busca constante por equilíbrio",
        "Diplomacia e tato social",
        "Senso estético refinado",
        "Charme e elegância naturais",
        "Senso de justiça apurado",
        "Necessidade de harmonia",
        "Habilidades sociais excepcionais",
        "Romantismo idealista"
      ],
      pontos_fortes: [
        "Mediação de conflitos",
        "Criação de ambientes harmoniosos",
        "Relacionamentos equilibrados",
        "Senso artístico natural",
        "Cooperação e parceria",
        "Elegância e refinamento"
      ],
      desafios: [
        "Indecisão crônica",
        "Evitar conflitos necessários",
        "Dependência da aprovação alheia",
        "Superficialidade em relacionamentos",
        "Dificuldade em dizer 'não'",
        "Procrastinação por busca da perfeição"
      ]
    },
    vida_amorosa: {
      estilo_romantico: [
        "Romance idealizado e cinematográfico",
        "Busca pela alma gêmea perfeita",
        "Relacionamento como parceria igualitária",
        "Ambiente romântico e estético",
        "Harmonia e ausência de conflitos"
      ],
      compatibilidades: [
        "Gêmeos - Conexão intelectual e social",
        "Aquário - Ideais compartilhados e liberdade",
        "Leão - Admiração mútua e glamour",
        "Sagitário - Aventura romântica e crescimento"
      ],
      desafios_amorosos: [
        "Idealização excessiva do parceiro",
        "Evitar discussões importantes",
        "Indecisão em compromissos sérios",
        "Necessidade constante de validação"
      ]
    },
    vida_profissional: {
      talentos_profissionais: [
        "Mediação e negociação",
        "Design e estética",
        "Relacionamento com clientes",
        "Trabalho em equipe",
        "Assessoria e consultoria",
        "Criação de ambientes harmoniosos"
      ],
      carreiras_ideais: [
        "Advogado/Mediador",
        "Designer/Decorador",
        "Diplomata/Embaixador",
        "Consultor de moda/beleza",
        "Psicólogo/Conselheiro",
        "Artista/Curador",
        "Wedding planner",
        "Relações públicas",
        "Juiz/Árbitro",
        "Consultor de relacionamentos"
      ],
      ambiente_trabalho_ideal: [
        "Harmonioso e esteticamente agradável",
        "Baseado em parcerias",
        "Com oportunidades de mediação",
        "Ambiente colaborativo",
        "Flexibilidade para equilíbrio pessoal"
      ]
    },
    saude_bem_estar: {
      pontos_atencao: [
        "Rins e sistema urinário",
        "Lombar e região das cadeiras",
        "Diabetes por consumo de doces",
        "Stress por conflitos não resolvidos"
      ],
      atividades_recomendadas: [
        "Dança de salão e ballet",
        "Atividades em dupla",
        "Artes visuais e manuais",
        "Spas e tratamentos de beleza",
        "Exercícios equilibrados como yoga"
      ]
    },
    dicas_desenvolvimento: [
      "Pratique tomar decisões mais rapidamente",
      "Aprenda a enfrentar conflitos construtivos",
      "Desenvolva autenticidade além do charme",
      "Cultive independência emocional",
      "Equilibre dar e receber em relacionamentos"
    ]
  },
  escorpiao: {
    nome: "Escorpião",
    simbolo: "♏",
    elemento: "Água",
    planeta_regente: "Plutão/Marte",
    periodo: "23 de outubro a 21 de novembro",
    descricao_geral: "Escorpião é o signo da intensidade, transformação e mistério. São pessoas profundas, investigativas e poderosas, com uma capacidade única de regeneração e renovação. Possuem uma força emocional impressionante e magnetismo natural.",
    personalidade: {
      caracteristicas_principais: [
        "Intensidade emocional profunda",
        "Magnetismo e presença marcante",
        "Intuição psíquica desenvolvida",
        "Capacidade de transformação",
        "Lealdade extrema",
        "Investigação e busca pela verdade",
        "Força de vontade inabalável",
        "Mistério e reserva natural"
      ],
      pontos_fortes: [
        "Capacidade de renovação total",
        "Intuição para motivações ocultas",
        "Lealdade incondicional aos escolhidos",
        "Força em situações de crise",
        "Habilidade investigativa",
        "Intensidade que inspira ou transforma"
      ],
      desafios: [
        "Tendência à obsessão",
        "Ciúme e possessividade extremos",
        "Dificuldade em perdoar",
        "Secretismo excessivo",
        "Vingança e rancor",
        "Necessidade de controle absoluto"
      ]
    },
    vida_amorosa: {
      estilo_romantico: [
        "Paixão avassaladora e total",
        "Fusão emocional e espiritual profunda",
        "Lealdade até a morte",
        "Intimidade sem reservas",
        "Transformação mútua através do amor"
      ],
      compatibilidades: [
        "Câncer - Profundidade emocional compartilhada",
        "Peixes - Sintonia espiritual e intuitiva",
        "Virgem - Complemento terreno e leal",
        "Capricórnio - Força e determinação mútuaas"
      ],
      desafios_amorosos: [
        "Ciúme destrutivo e possessividade",
        "Intensidade que pode assustar",
        "Dificuldade em perdoar traições",
        "Necessidade de controle total do parceiro"
      ]
    },
    vida_profissional: {
      talentos_profissionais: [
        "Investigação e pesquisa profunda",
        "Transformação e renovação",
        "Psicologia e motivação humana",
        "Gestão de crises",
        "Trabalho com recursos ocultos",
        "Liderança em situações extremas"
      ],
      carreiras_ideais: [
        "Psicólogo/Psiquiatra",
        "Detetive/Investigador",
        "Cirurgião/Médico intensivista",
        "Consultor financeiro",
        "Pesquisador científico",
        "Terapeuta sexual",
        "Advogado criminalista",
        "Místico/Ocultista",
        "Gestor de crise",
        "Transformação organizacional"
      ],
      ambiente_trabalho_ideal: [
        "Desafiador e transformador",
        "Com profundidade e propósito",
        "Autonomia para investigar",
        "Ambiente de confiança",
        "Oportunidades de liderança em crise"
      ]
    },
    saude_bem_estar: {
      pontos_atencao: [
        "Órgãos reprodutivos e sexuais",
        "Sistema excretor e desintoxicação",
        "Problemas psicossomáticos",
        "Tendência a vícios e obsessões"
      ],
      atividades_recomendadas: [
        "Artes marciais e defesa pessoal",
        "Terapias profundas e transformadoras",
        "Exercícios intensos",
        "Meditação e práticas espirituais",
        "Atividades aquáticas profundas"
      ]
    },
    dicas_desenvolvimento: [
      "Pratique o perdão como forma de libertação",
      "Aprenda a confiar e abrir mão do controle",
      "Desenvolva transparência em relacionamentos",
      "Canalize intensidade para transformação positiva",
      "Cultive desapego e renovação constante"
    ]
  },
  sagitario: {
    nome: "Sagitário",
    simbolo: "♐",
    elemento: "Fogo",
    planeta_regente: "Júpiter",
    periodo: "22 de novembro a 21 de dezembro",
    descricao_geral: "Sagitário é o signo da aventura, filosofia e expansão. São pessoas otimistas, independentes e aventureiras, sempre em busca de novos horizontes e conhecimentos. Possuem uma visão ampla da vida e desejo de liberdade.",
    personalidade: {
      caracteristicas_principais: [
        "Otimismo contagiante",
        "Sede de aventura e exploração",
        "Filosofia e busca por significado",
        "Independência e liberdade",
        "Honestidade direta e franca",
        "Generosidade natural",
        "Visão ampla e futuro",
        "Entusiasmo por aprender"
      ],
      pontos_fortes: [
        "Capacidade de inspirar e motivar",
        "Visão de futuro e possibilidades",
        "Adaptabilidade a culturas diferentes",
        "Honestidade refrescante",
        "Otimismo em situações difíceis",
        "Generosidade sem limites"
      ],
      desafios: [
        "Falta de tato e diplomacia",
        "Dificuldade com compromissos",
        "Impaciência com detalhes",
        "Tendência à exagerar",
        "Superficialidade em relacionamentos",
        "Inconstância em projetos"
      ]
    },
    vida_amorosa: {
      estilo_romantico: [
        "Relacionamento como aventura compartilhada",
        "Necessidade de crescimento mútuo",
        "Liberdade dentro do compromisso",
        "Romance em viagens e explorações",
        "Parceiro como companheiro de jornada"
      ],
      compatibilidades: [
        "Áries - Aventura e energia compartilhadas",
        "Leão - Otimismo e grandiosidade mútuaas",
        "Libra - Crescimento intelectual e social",
        "Aquário - Liberdade e visão de futuro"
      ],
      desafios_amorosos: [
        "Medo de compromissos que limitem liberdade",
        "Honestidade brutal que pode ferir",
        "Necessidade constante de novidade",
        "Dificuldade com rotina doméstica"
      ]
    },
    vida_profissional: {
      talentos_profissionais: [
        "Ensino e compartilhamento de conhecimento",
        "Exploração e descoberta",
        "Comunicação inspiradora",
        "Trabalho internacional",
        "Filosofia e espiritualidade",
        "Liderança visionária"
      ],
      carreiras_ideais: [
        "Professor universitário/Filósofo",
        "Guia turístico/Explorador",
        "Piloto/Comissário de bordo",
        "Escritor/Jornalista de viagem",
        "Missionário/Ativista",
        "Tradutor/Intérprete",
        "Consultor internacional",
        "Palestrante motivacional",
        "Antropólogo/Arqueólogo",
        "Corretor de câmbio"
      ],
      ambiente_trabalho_ideal: [
        "Internacional ou multicultural",
        "Com oportunidades de viagem",
        "Liberdade e autonomia",
        "Crescimento e aprendizado contínuo",
        "Propósito maior e significado"
      ]
    },
    saude_bem_estar: {
      pontos_atencao: [
        "Quadris e coxas",
        "Fígado por excesso",
        "Tendência a acidentes por imprudência",
        "Problemas por estilo de vida excessivo"
      ],
      atividades_recomendadas: [
        "Esportes ao ar livre",
        "Hipismo e tiro com arco",
        "Caminhadas e trekking",
        "Viagens ativas e aventureira",
        "Esportes radicais com segurança"
      ]
    },
    dicas_desenvolvimento: [
      "Pratique a diplomacia sem perder honestidade",
      "Aprenda a valorizar o presente e detalhes",
      "Desenvolva profundidade em relacionamentos",
      "Cultive paciência com processos lentos",
      "Equilibre liberdade com responsabilidade"
    ]
  },
  capricornio: {
    nome: "Capricórnio",
    simbolo: "♑",
    elemento: "Terra",
    planeta_regente: "Saturno",
    periodo: "22 de dezembro a 20 de janeiro",
    descricao_geral: "Capricórnio é o signo da ambição, disciplina e realização. São pessoas determinadas, responsáveis e práticas, com uma capacidade impressionante para construir e alcançar objetivos de longo prazo. Possuem maturidade natural e senso de autoridade.",
    personalidade: {
      caracteristicas_principais: [
        "Ambição e determinação férrea",
        "Disciplina e autocontrole",
        "Responsabilidade e confiabilidade",
        "Praticidade e realismo",
        "Paciência para objetivos longos",
        "Autoridade natural",
        "Tradição e valores sólidos",
        "Maturidade precoce"
      ],
      pontos_fortes: [
        "Construção de carreiras sólidas",
        "Liderança responsável",
        "Planejamento de longo prazo",
        "Resistência a pressões",
        "Capacidade de economizar e investir",
        "Confiabilidade absoluta"
      ],
      desafios: [
        "Excesso de rigidez e controle",
        "Pessimismo e melancolia",
        "Dificuldade em relaxar",
        "Tendência ao workaholic",
        "Resistência a mudanças",
        "Falta de espontaneidade"
      ]
    },
    vida_amorosa: {
      estilo_romantico: [
        "Relacionamento como construção sólida",
        "Compromisso sério e duradouro",
        "Demonstração de amor através da providência",
        "Construção de patrimônio conjunto",
        "Amor que cresce com o tempo"
      ],
      compatibilidades: [
        "Touro - Estabilidade e valores compartilhados",
        "Virgem - Praticidade e objetivos comuns",
        "Escorpião - Determinação e lealdade",
        "Peixes - Complemento emocional e suavidade"
      ],
      desafios_amorosos: [
        "Dificuldade em expressar emoções",
        "Priorização do trabalho sobre relacionamento",
        "Expectativas muito rígidas",
        "Falta de espontaneidade romântica"
      ]
    },
    vida_profissional: {
      talentos_profissionais: [
        "Gestão e administração",
        "Planejamento estratégico",
        "Construção de estruturas sólidas",
        "Liderança hierárquica",
        "Gestão financeira",
        "Autoridade e disciplina"
      ],
      carreiras_ideais: [
        "CEO/Diretor executivo",
        "Engenheiro civil/Arquiteto",
        "Administrador/Gerente",
        "Banqueiro/Investidor",
        "Juiz/Magistrado",
        "Contador/Auditor",
        "Político/Servidor público",
        "Construtor/Empreiteiro",
        "Consultor empresarial",
        "Professor universitário"
      ],
      ambiente_trabalho_ideal: [
        "Estruturado e hierárquico",
        "Com objetivos claros de crescimento",
        "Reconhecimento por mérito",
        "Ambiente tradicional e respeitado",
        "Oportunidades de liderança"
      ]
    },
    saude_bem_estar: {
      pontos_atencao: [
        "Joelhos e articulações",
        "Problemas ósseos e dentários",
        "Depressão e melancolia",
        "Problemas de pele por stress"
      ],
      atividades_recomendadas: [
        "Montanhismo e escalada",
        "Exercícios de fortalecimento",
        "Yoga e alongamento",
        "Atividades estruturadas e disciplinadas",
        "Massagens terapêuticas"
      ]
    },
    dicas_desenvolvimento: [
      "Pratique flexibilidade sem perder objetivos",
      "Aprenda a celebrar conquistas pequenas",
      "Desenvolva expressão emocional genuína",
      "Cultive momentos de lazer e diversão",
      "Equilibre ambição com bem-estar pessoal"
    ]
  },
  aquario: {
    nome: "Aquário",
    simbolo: "♒",
    elemento: "Ar",
    planeta_regente: "Urano/Saturno",
    periodo: "21 de janeiro a 19 de fevereiro",
    descricao_geral: "Aquário é o signo da inovação, originalidade e humanitarismo. São pessoas visionárias, independentes e revolucionárias, sempre à frente do seu tempo. Possuem uma mente brilhante e desejo genuíno de contribuir para um mundo melhor.",
    personalidade: {
      caracteristicas_principais: [
        "Originalidade e inovação",
        "Visão futurística e progressista",
        "Independência extrema",
        "Humanitarismo e altruísmo",
        "Mente brilhante e inventiva",
        "Rebeldia contra convenções",
        "Amizade sincera e leal",
        "Desapego emocional saudável"
      ],
      pontos_fortes: [
        "Capacidade de inovação",
        "Visão ampla de possibilidades futuras",
        "Amizades duradouras e genuínas",
        "Contribuição para causas sociais",
        "Liberdade de preconceitos",
        "Originalidade em soluções"
      ],
      desafios: [
        "Distanciamento emocional excessivo",
        "Rebeldia sem causa clara",
        "Dificuldade com intimidade",
        "Teimosia disfarçada de originalidade",
        "Frieza em relacionamentos próximos",
        "Impaciência com convenções necessárias"
      ]
    },
    vida_amorosa: {
      estilo_romantico: [
        "Relacionamento baseado em amizade profunda",
        "Necessidade absoluta de liberdade",
        "Amor intelectual e mental",
        "Parceiro como companheiro de ideais",
        "Romance não-convencional e único"
      ],
      compatibilidades: [
        "Gêmeos - Conexão mental e liberdade",
        "Libra - Ideais humanitários compartilhados",
        "Sagitário - Visão de futuro e aventura",
        "Áries - Independência e originalidade"
      ],
      desafios_amorosos: [
        "Dificuldade com intimidade emocional",
        "Necessidade extrema de espaço",
        "Frieza em momentos que precisam calor",
        "Intelectualização de sentimentos"
      ]
    },
    vida_profissional: {
      talentos_profissionais: [
        "Inovação e tecnologia",
        "Visão de tendências futuras",
        "Trabalho humanitário",
        "Pesquisa e desenvolvimento",
        "Reformas e revoluções",
        "Networking e conexões"
      ],
      carreiras_ideais: [
        "Cientista/Pesquisador",
        "Desenvolvedor de tecnologia",
        "Ativista social/ONG",
        "Inventor/Designer",
        "Astrólogo/Futurista",
        "Consultor em inovação",
        "Piloto/Astronauta",
        "Reformador social",
        "Terapeuta alternativo",
        "Consultor de tendências"
      ],
      ambiente_trabalho_ideal: [
        "Inovador e vanguardista",
        "Com liberdade e flexibilidade",
        "Causas humanitárias e sociais",
        "Equipe diversificada e original",
        "Oportunidade de revolucionar"
      ]
    },
    saude_bem_estar: {
      pontos_atencao: [
        "Circulação e varizes",
        "Sistema nervoso e ansiedade",
        "Tornozelos e panturrilhas",
        "Problemas por excesso de tecnologia"
      ],
      atividades_recomendadas: [
        "Exercícios aquáticos excêntricos",
        "Atividades em grupo diferentes",
        "Tecnologia aplicada ao fitness",
        "Práticas alternativas e inovadoras",
        "Esportes de equipe não convencionais"
      ]
    },
    dicas_desenvolvimento: [
      "Pratique intimidade emocional gradualmente",
      "Aprenda a valorizar tradições úteis",
      "Desenvolva paciência com ritmos diferentes",
      "Cultive relacionamentos próximos e calorosos",
      "Equilibre originalidade com praticidade"
    ]
  },
  peixes: {
    nome: "Peixes",
    simbolo: "♓",
    elemento: "Água",
    planeta_regente: "Netuno/Júpiter",
    periodo: "20 de fevereiro a 20 de março",
    descricao_geral: "Peixes é o signo da compaixão, intuição e espiritualidade. São pessoas empáticas, sonhadoras e sensíveis, com uma conexão especial com o mundo emocional e espiritual. Possuem uma capacidade única de compreender e curar os outros.",
    personalidade: {
      caracteristicas_principais: [
        "Empatia profunda e compaixão",
        "Intuição psíquica desenvolvida",
        "Imaginação rica e criativa",
        "Sensibilidade emocional extrema",
        "Espiritualidade natural",
        "Adaptabilidade como a água",
        "Talento artístico inato",
        "Capacidade de cura e regeneração"
      ],
      pontos_fortes: [
        "Compreensão emocional profunda",
        "Talentos artísticos e criativos",
        "Capacidade de cura e consolo",
        "Intuição para necessidades alheias",
        "Flexibilidade e adaptação",
        "Conexão espiritual natural"
      ],
      desafios: [
        "Tendência ao escapismo",
        "Dificuldade com limites pessoais",
        "Sensibilidade excessiva",
        "Confusão entre fantasia e realidade",
        "Tendência à vitimização",
        "Dificuldade em tomar decisões práticas"
      ]
    },
    vida_amorosa: {
      estilo_romantico: [
        "Amor romântico e idealizado",
        "Fusão emocional total com o parceiro",
        "Romance como conto de fadas",
        "Sacrifício e devoção absoluta",
        "Amor incondicional e perdão"
      ],
      compatibilidades: [
        "Câncer - Sintonia emocional profunda",
        "Escorpião - Intensidade e transformação",
        "Touro - Estabilidade que tranquiliza",
        "Capricórnio - Estrutura que protege"
      ],
      desafios_amorosos: [
        "Idealização excessiva do parceiro",
        "Tendência a se perder no relacionamento",
        "Dificuldade em colocar limites",
        "Sensibilidade que pode afastar"
      ]
    },
    vida_profissional: {
      talentos_profissionais: [
        "Arte e criatividade",
        "Cura e terapia",
        "Intuição e orientação",
        "Trabalho espiritual",
        "Inspiração e motivação",
        "Adaptabilidade a ambientes"
      ],
      carreiras_ideais: [
        "Artista/Músico",
        "Psicólogo/Terapeuta",
        "Enfermeiro/Cuidador",
        "Fotógrafo/Cinegrafista",
        "Místico/Orientador espiritual",
        "Veterinário",
        "Professor de artes",
        "Dançarino/Ator",
        "Psiquiatra",
        "Trabalhador social"
      ],
      ambiente_trabalho_ideal: [
        "Criativo e inspirador",
        "Com propósito de cura ou ajuda",
        "Flexível e compreensivo",
        "Ambiente harmônico",
        "Oportunidade de expressão artística"
      ]
    },
    saude_bem_estar: {
      pontos_atencao: [
        "Pés e sistema linfático",
        "Tendência a vícios e escapismo",
        "Sistema imunológico sensível",
        "Problemas psicossomáticos"
      ],
      atividades_recomendadas: [
        "Natação e atividades aquáticas",
        "Dança e expressão corporal",
        "Meditação e práticas espirituais",
        "Artes terapêuticas",
        "Caminhadas na praia ou perto d'água"
      ]
    },
    dicas_desenvolvimento: [
      "Pratique limites saudáveis com outros",
      "Aprenda a distinguir intuição de imaginação",
      "Desenvolva praticidade sem perder sensibilidade",
      "Cultive relacionamentos que te fortaleçam",
      "Equilibre doação com autocuidado"
    ]
  }
};

function normalizeSignName(sign: string): string {
  const normalized = sign.toLowerCase().trim();
  return signMapping[normalized] || normalized;
}

export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const signo = url.searchParams.get("signo");

  if (!signo) {
    return json(
      { error: "Parâmetro 'signo' é obrigatório" },
      { status: 400 }
    );
  }

  try {
    // Normalizar nome do signo
    const normalizedSigno = normalizeSignName(signo);
    
    // Buscar dados do signo
    const signoData = signosData[normalizedSigno as keyof typeof signosData];
    
    if (!signoData) {
      return json(
        { 
          error: "Signo não encontrado",
          available_signs: Object.keys(signosData).map(key => signosData[key as keyof typeof signosData].nome)
        },
        { status: 404 }
      );
    }

    return json({
      success: true,
      data: signoData
    });
    
  } catch (error) {
    console.error("Erro ao carregar descrição do signo:", error);
    
    return json(
      { error: "Erro interno do servidor ao carregar descrição do signo" },
      { status: 500 }
    );
  }
}