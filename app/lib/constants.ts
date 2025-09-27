export const APP_NAME = "CalculadoraOnlineBR";
export const APP_DESCRIPTION = "Calculadoras online gratuitas para facilitar seu dia a dia";
export const APP_URL = "https://www.calculadoraonlinebr.com.br";
export const APP_AUTHOR = "CalculadoraOnlineBR";

export const CATEGORIES = [
  {
    id: "saude",
    name: "Saúde",
    description: "Calculadoras para cuidar da sua saúde e bem-estar",
    icon: "🏥",
    path: "/calculadoras/saude",
  },
  {
    id: "financas",
    name: "Finanças",
    description: "Calculadoras para planejamento financeiro e investimentos",
    icon: "💰",
    path: "/calculadoras/financas",
  },
  {
    id: "matematica",
    name: "Matemática",
    description: "Calculadoras para operações matemáticas do dia a dia",
    icon: "🔢",
    path: "/calculadoras/matematica",
  },
  {
    id: "trabalhista",
    name: "Trabalhista",
    description: "Calculadoras para direitos trabalhistas, aposentadoria e previdência",
    icon: "⚖️",
    path: "/calculadoras/trabalhista",
  },
  {
    id: "ferramentas",
    name: "Ferramentas",
    description: "Ferramentas úteis para conversões, datas e cálculos do dia a dia",
    icon: "🔧",
    path: "/calculadoras/ferramentas",
  },
  {
    id: "astrologia",
    name: "Astrologia",
    description: "Calculadoras astrológicas para autoconhecimento e orientação",
    icon: "🌟",
    path: "/calculadoras/astrologia",
  },
  {
    id: "datas",
    name: "Datas",
    description: "Calculadoras e ferramentas para trabalhar com datas e tempo",
    icon: "📅",
    path: "/calculadoras/datas",
  },
  {
    id: "loterias",
    name: "Loterias",
    description: "Geradores de jogos para Mega-Sena, Lotofácil, Quina e mais loterias",
    icon: "🎰",
    path: "/calculadoras/loterias",
  },
];

export const CALCULATORS = [
  {
    id: "imc",
    name: "Calculadora de IMC",
    description: "Calcule seu Índice de Massa Corporal",
    category: "saude",
    path: "/calculadoras/saude/imc",
  },
  {
    id: "gordura-corporal",
    name: "Calculadora de Gordura Corporal",
    description: "Calcule seu percentual de gordura corporal com métodos científicos",
    category: "saude",
    path: "/calculadoras/saude/gordura-corporal",
  },
  {
    id: "ciclo-menstrual",
    name: "Calculadora de Ciclo Menstrual",
    description: "Calcule seu período fértil e acompanhe seu ciclo",
    category: "saude",
    path: "/calculadoras/saude/ciclo-menstrual",
  },
  {
    id: "desenvolvimento-infantil",
    name: "Calculadora de Desenvolvimento Infantil",
    description: "Acompanhe o desenvolvimento do seu bebê com marcos personalizados",
    category: "saude",
    path: "/calculadoras/saude/desenvolvimento-infantil",
  },
  {
    id: "hidratacao",
    name: "Calculadora de Hidratação e Balanço Hídrico",
    description:
      "Calcule sua necessidade diária de água personalizada com base em atividade física, clima e características individuais",
    category: "saude",
    path: "/calculadoras/saude/hidratacao",
  },
  {
    id: "peso-gravidez",
    name: "Calculadora de Peso na Gravidez",
    description: "Monitore ganho peso gestacional segundo OMS com análise trimestral personalizada",
    category: "saude",
    path: "/calculadoras/saude/peso-gravidez",
  },
  {
    id: "primeiro-milhao",
    name: "Calculadora do Primeiro Milhão",
    description: "Descubra quanto tempo para chegar ao seu primeiro milhão",
    category: "financas",
    path: "/calculadoras/financas/primeiro-milhao",
  },
  {
    id: "juros-compostos",
    name: "Calculadora de Juros Compostos",
    description: "Simule investimentos com aportes mensais e visualizações",
    category: "financas",
    path: "/calculadoras/financas/juros-compostos",
  },
  {
    id: "juros-simples",
    name: "Calculadora de Juros Simples",
    description:
      "Calcule juros simples com 4 modos diferentes - ideal para empréstimos de curto prazo",
    category: "financas",
    path: "/calculadoras/financas/juros-simples",
  },
  {
    id: "lci-lca",
    name: "Calculadora LCI e LCA",
    description:
      "Simule investimentos em LCI e LCA com vantagens fiscais - compare com CDB e Poupança",
    category: "financas",
    path: "/calculadoras/financas/lci-lca",
  },
  {
    id: "preco-medio",
    name: "Calculadora de Preço Médio",
    description:
      "Calcule o preço médio de ações e investimentos - controle ganhos/perdas com múltiplos métodos",
    category: "financas",
    path: "/calculadoras/financas/preco-medio",
  },
  {
    id: "cdb",
    name: "Calculadora de CDB",
    description:
      "Simule investimentos em CDB com tributação completa - compare com LCI/LCA e Poupança",
    category: "financas",
    path: "/calculadoras/financas/cdb",
  },
  {
    id: "financiamento-imobiliario",
    name: "Calculadora de Financiamento Imobiliário",
    description:
      "Simule financiamentos imobiliários com sistemas SAC e PRICE - análise completa de affordability e amortização",
    category: "financas",
    path: "/calculadoras/financas/financiamento-imobiliario",
  },
  {
    id: "emprestimo-consignado",
    name: "Calculadora de Empréstimo Consignado",
    description:
      "Simule empréstimos consignados com análise de margem e comparação com outras modalidades - para CLT, servidores e aposentados",
    category: "financas",
    path: "/calculadoras/financas/emprestimo-consignado",
  },
  {
    id: "consorcio",
    name: "Calculadora de Consórcio",
    description:
      "Simule consórcios de veículos, imóveis e motos. Compare com financiamento, calcule taxas e veja todas as vantagens com guia completo 2025",
    category: "financas",
    path: "/calculadoras/financas/consorcio",
  },
  {
    id: "renda-fixa-comparativa",
    name: "Calculadora Comparativa de Renda Fixa",
    description:
      "Compare CDB, LCI, LCA, Tesouro Direto e Poupança lado a lado. Ranking automático, taxas reais 2025 e análise completa de rendimentos",
    category: "financas",
    path: "/calculadoras/financas/renda-fixa-comparativa",
  },
  {
    id: "porcentagem",
    name: "Calculadora de Porcentagem",
    description: "Calcule porcentagens de forma rápida",
    category: "matematica",
    path: "/calculadoras/matematica/porcentagem",
  },
  {
    id: "regra-de-tres",
    name: "Calculadora de Regra de Três",
    description:
      "Resolva regra de três simples e inversa com explicações passo a passo - para estudos e aplicações práticas do dia a dia",
    category: "matematica",
    path: "/calculadoras/matematica/regra-de-tres",
  },
  {
    id: "equacao-segundo-grau",
    name: "Calculadora de Equação do 2º Grau (Bhaskara)",
    description:
      "Resolva equações quadráticas usando a fórmula de Bhaskara com resolução passo a passo, análise do discriminante e propriedades da parábola",
    category: "matematica",
    path: "/calculadoras/matematica/equacao-segundo-grau",
  },
  {
    id: "mmc-mdc",
    name: "Calculadora de MMC e MDC",
    description:
      "Calcule o Mínimo Múltiplo Comum e Máximo Divisor Comum com decomposição em fatores primos, métodos passo a passo e aplicações práticas",
    category: "matematica",
    path: "/calculadoras/matematica/mmc-mdc",
  },
  {
    id: "area-perimetro",
    name: "Calculadora de Área e Perímetro",
    description:
      "Calcule área e perímetro de formas geométricas com explicações passo a passo, fórmulas detalhadas e aplicações práticas para arquitetura, engenharia e construção",
    category: "matematica",
    path: "/calculadoras/matematica/area-perimetro",
  },
  {
    id: "volume",
    name: "Calculadora de Volume",
    description:
      "Calcule volume e área superficial de sólidos 3D como cubo, esfera, cilindro, cone e pirâmide com fórmulas passo a passo e aplicações práticas para engenharia e arquitetura",
    category: "matematica",
    path: "/calculadoras/matematica/volume",
  },
  {
    id: "teorema-pitagoras",
    name: "Calculadora do Teorema de Pitágoras",
    description:
      "Calcule hipotenusa, catetos e ângulos em triângulos retângulos com o Teorema de Pitágoras. Verificação de triângulos, trigonometria e triângulos famosos com explicações passo a passo",
    category: "matematica",
    path: "/calculadoras/matematica/teorema-pitagoras",
  },
  {
    id: "fracoes",
    name: "Calculadora de Frações",
    description:
      "Some, subtraia, multiplique e divida frações com explicações passo a passo. Converta decimais em frações, simplifique automaticamente e aprenda com métodos educativos detalhados",
    category: "matematica",
    path: "/calculadoras/matematica/fracoes",
  },
  {
    id: "moda",
    name: "Calculadora de Moda Estatística",
    description:
      "Calcule a moda de números com análise completa de frequência. Identifique amodal, bimodal, multimodal com explicações passo a passo e tabela de frequências detalhada",
    category: "matematica",
    path: "/calculadoras/matematica/moda",
  },
  {
    id: "media",
    name: "Calculadora de Média Estatística",
    description:
      "Calcule média aritmética, geométrica e harmônica com análise completa. Análise de medidas de tendência central com desvio padrão, variância e estatísticas detalhadas",
    category: "matematica",
    path: "/calculadoras/matematica/media",
  },
  {
    id: "desvio-padrao",
    name: "Calculadora de Desvio Padrão",
    description:
      "Calcule desvio padrão e variância populacional ou amostral com explicações passo a passo. Analise medidas de dispersão estatística com interpretação detalhada dos resultados",
    category: "matematica",
    path: "/calculadoras/matematica/desvio-padrao",
  },
  {
    id: "calculadora-cientifica",
    name: "Calculadora Científica",
    description:
      "Calculadora científica completa com funções trigonométricas, logarítmicas, exponenciais e estatísticas. Interface profissional para estudantes e profissionais",
    category: "matematica",
    path: "/calculadoras/matematica/calculadora-cientifica",
  },
  {
    id: "sistemas-equacoes-lineares",
    name: "Sistemas de Equações Lineares",
    description:
      "Resolva sistemas de equações lineares 2x2 e 3x3 com métodos de eliminação de Gauss e regra de Cramer. Solução passo a passo para álgebra linear",
    category: "matematica",
    path: "/calculadoras/matematica/sistemas-equacoes-lineares",
  },
  {
    id: "inequacoes",
    name: "Inequações de 1º e 2º Grau",
    description:
      "Resolva inequações de primeiro e segundo grau com análise de sinais e intervalos de solução. Calculadora com explicação passo a passo e múltiplos operadores",
    category: "matematica",
    path: "/calculadoras/matematica/inequacoes",
  },
  {
    id: "simplificador-funcoes-algebricas",
    name: "Simplificador de Expressões Algébricas",
    description:
      "Simplifique expressões algébricas com fatoração automática e redução de termos semelhantes. Calculadora com explicação passo a passo e suporte a múltiplas variáveis",
    category: "matematica",
    path: "/calculadoras/matematica/simplificador-funcoes-algebricas",
  },
  {
    id: "fibonacci",
    name: "Calculadora de Fibonacci",
    description:
      "Explore a sequência de Fibonacci e suas propriedades matemáticas. Calcule termos específicos, visualize a sequência e descubra a proporção áurea presente na natureza",
    category: "matematica",
    path: "/calculadoras/matematica/fibonacci",
  },
  {
    id: "tesouro-direto",
    name: "Calculadora do Tesouro Direto",
    description:
      "Simule investimentos em títulos públicos com cálculo completo de cupons semestrais, impostos e indexadores. Tesouro Selic, Prefixado, IPCA+ com aportes mensais e comparações detalhadas",
    category: "financas",
    path: "/calculadoras/financas/tesouro-direto",
  },
  {
    id: "antecipacao-parcelas-nubank",
    name: "Calculadora Antecipação Parcelas Nubank",
    description:
      "Calcule os descontos da antecipação de parcelas do Nubank. Descubra quanto você economiza antecipando suas parcelas com análise detalhada por número de parcelas",
    category: "financas",
    path: "/calculadoras/financas/antecipacao-parcelas-nubank",
  },
  {
    id: "rescisao-trabalhista",
    name: "Calculadora de Rescisão Trabalhista",
    description:
      "Calcule todos os valores de uma rescisão trabalhista. Simule demissão sem justa causa, com justa causa, pedido de demissão e acordo mútuo. Inclui FGTS, seguro desemprego e todos os direitos trabalhistas",
    category: "trabalhista",
    path: "/calculadoras/trabalhista/rescisao",
  },
  {
    id: "aposentadoria",
    name: "Calculadora de Aposentadoria",
    description:
      "Planeje sua aposentadoria com simulações completas do INSS e previdência privada. Calcule benefícios, contribuições, tempo para aposentar e estratégias de acumulação com cenários personalizados",
    category: "trabalhista",
    path: "/calculadoras/trabalhista/aposentadoria",
  },
  {
    id: "auxilio-doenca",
    name: "Calculadora de Auxílio-Doença",
    description:
      "Calcule o valor do auxílio-doença INSS. Verifica carência automaticamente, aplica isenções para doenças graves e acidentes, e calcula o benefício conforme a legislação 2025",
    category: "trabalhista",
    path: "/calculadoras/trabalhista/auxilio-doenca",
  },
  {
    id: "salario-liquido",
    name: "Calculadora de Salário Líquido",
    description:
      "Calcule seu salário líquido usando as tabelas de INSS e IRRF 2025. Suporte a CLT, PJ, dependentes e horas extras com cálculo em tempo real",
    category: "trabalhista",
    path: "/calculadoras/trabalhista/salario-liquido",
  },
  {
    id: "ferias-decimo-terceiro",
    name: "Calculadora de Férias e 13º Salário",
    description:
      "Calcule férias e décimo terceiro salário com tabelas oficiais 2025. Inclui INSS, IRRF, abono pecuniário, adiantamentos e todas as regras da CLT",
    category: "trabalhista",
    path: "/calculadoras/trabalhista/ferias-decimo-terceiro",
  },
  {
    id: "horas-extras",
    name: "Calculadora de Horas Extras CLT",
    description:
      "Calcule horas extras conforme CLT Art. 59: adicional 50% dia útil, 100% domingo/feriado, 20% noturno. Base legal garantida",
    category: "trabalhista",
    path: "/calculadoras/trabalhista/horas-extras",
  },
  {
    id: "diferenca-entre-datas",
    name: "Calculadora de Diferença entre Datas",
    description:
      "Calcule a diferença entre duas datas em anos, meses, dias, horas e minutos. Inclui contagem de dias úteis, feriados e idade",
    category: "datas",
    path: "/calculadoras/datas/diferenca-entre-datas",
  },
  {
    id: "contagem-regressiva",
    name: "Calculadora de Contagem Regressiva",
    description: "Contador regressivo personalizado para eventos especiais com anos, meses, dias, horas, minutos e segundos",
    category: "datas",
    path: "/calculadoras/datas/contagem-regressiva",
  },
  {
    id: "operacao-datas",
    name: "Calculadora de Operações entre Datas",
    description: "Some ou subtraia anos, meses e dias de qualquer data. Descubra datas futuras e passadas com precisão",
    category: "datas",
    path: "/calculadoras/datas/operacao-datas",
  },
  {
    id: "idade-exata",
    name: "Calculadora de Idade Exata",
    description: "Calcule sua idade em anos, meses e dias com contador em tempo real. Descubra quantos dias você viveu e quando será seu próximo aniversário",
    category: "datas",
    path: "/calculadoras/datas/idade-exata",
  },
  {
    id: "dias-uteis",
    name: "Calculadora de Dias Úteis",
    description: "Calcule dias úteis entre datas considerando feriados nacionais brasileiros, Carnaval, Páscoa e emendas. Algoritmo preciso com calendário 2025",
    category: "datas",
    path: "/calculadoras/datas/dias-uteis",
  },
  {
    id: "gerador-cpf",
    name: "Gerador de CPF",
    description:
      "Gere CPFs válidos para testes e desenvolvimento com opção de formatação. Cópia automática para área de transferência, algoritmo da Receita Federal",
    category: "ferramentas",
    path: "/calculadoras/ferramentas/gerador-cpf",
  },
  {
    id: "gerador-cnpj",
    name: "Gerador de CNPJ",
    description:
      "Gere CNPJs válidos para testes e desenvolvimento com opção de formatação. Cópia automática para área de transferência, algoritmo da Receita Federal",
    category: "ferramentas",
    path: "/calculadoras/ferramentas/gerador-cnpj",
  },
  {
    id: "validar-cpf",
    name: "Validador de CPF",
    description:
      "Valide CPFs com ou sem pontuação usando algoritmo oficial da Receita Federal. Validação instantânea e precisa para verificar se CPF é válido",
    category: "ferramentas",
    path: "/calculadoras/ferramentas/validar-cpf",
  },
  {
    id: "validar-cnpj",
    name: "Validador de CNPJ",
    description:
      "Valide CNPJs com ou sem pontuação usando algoritmo oficial da Receita Federal. Validação instantânea e precisa para verificar se CNPJ é válido",
    category: "ferramentas",
    path: "/calculadoras/ferramentas/validar-cnpj",
  },
  {
    id: "contador-caracteres",
    name: "Contador de Caracteres",
    description:
      "Conte caracteres, letras, palavras, frases com análise detalhada. Veja frequência de cada letra, estatísticas avançadas e opções de filtro personalizáveis",
    category: "ferramentas",
    path: "/calculadoras/ferramentas/contador-caracteres",
  },
  {
    id: "gerador-cartao-credito",
    name: "Gerador de Cartão de Crédito",
    description:
      "Gere números de cartão de crédito válidos para testes e desenvolvimento. Suporte para Visa, Mastercard, American Express e outras bandeiras com algoritmo de Luhn",
    category: "ferramentas",
    path: "/calculadoras/ferramentas/gerador-cartao-credito",
  },
  {
    id: "gerador-uuid-guid",
    name: "Gerador de UUID/GUID",
    description:
      "Gere UUIDs/GUIDs únicos com múltiplos formatos (JS, SQL, MongoDB, Python, Base64). Tipos v1, v4, v5, geração em lote até 1000, export e copy to clipboard",
    category: "ferramentas",
    path: "/calculadoras/ferramentas/gerador-uuid-guid",
  },
  {
    id: "sorteador-online",
    name: "Sorteador Online",
    description:
      "Sorteie nomes, objetos, animais ou qualquer lista com animação e suspense. Sem limite de caracteres, aleatoriedade garantida e histórico de sorteios",
    category: "ferramentas",
    path: "/calculadoras/ferramentas/sorteador-online",
  },
  {
    id: "gerador-senha-segura",
    name: "Gerador de Senhas Seguras",
    description:
      "Gere senhas seguras personalizáveis com controle de tamanho, caracteres especiais, números e letras. Análise de força da senha e cópia automática para segurança digital",
    category: "ferramentas",
    path: "/calculadoras/ferramentas/gerador-senha-segura",
  },
  {
    id: "clicks-por-segundo",
    name: "Teste CPS - Clicks Por Segundo",
    description:
      "Teste sua velocidade de clique com análise avançada de padrões, anti-cheat com IA, rankings e classificações. Ferramenta gamificada para medir CPS com técnicas profissionais",
    category: "ferramentas",
    path: "/calculadoras/ferramentas/clicks-por-segundo",
  },
  {
    id: "carro-eletrico-combustao",
    name: "Calculadora: Carro Elétrico vs Combustão",
    description:
      "Compare custos completos entre carros elétricos e combustão com análise de payback inteligente, economia por perfil de uso, equivalência em litros e impacto ambiental",
    category: "ferramentas",
    path: "/calculadoras/ferramentas/carro-eletrico-combustao",
  },
  {
    id: "economia-energia-eletrica",
    name: "Calculadora de Economia de Energia Elétrica",
    description:
      "Analise o consumo energético por ambiente, compare lâmpadas LED, simule energia solar e identifique vampirismo energético. Economize até 50% na conta de luz",
    category: "ferramentas",
    path: "/calculadoras/ferramentas/economia-energia-eletrica",
  },
  {
    id: "ascendente-astrologico",
    name: "Calculadora de Ascendente Astrológico",
    description:
      "Descubra seu signo ascendente usando data, hora e local de nascimento. Entenda como você se apresenta ao mundo através da astrologia natal",
    category: "astrologia",
    path: "/calculadoras/astrologia/ascendente",
  },
  {
    id: "signo",
    name: "Descubra Seu Signo",
    description:
      "Descubra seu signo zodiacal baseado na data de nascimento. Conheça as características do seu signo solar na astrologia",
    category: "astrologia",
    path: "/calculadoras/astrologia/signo",
  },
  {
    id: "compatibilidade-signos",
    name: "Compatibilidade de Signos",
    description:
      "Teste a compatibilidade astrológica entre dois signos. Análise completa para amor, amizade e trabalho com dicas personalizadas",
    category: "astrologia",
    path: "/calculadoras/astrologia/compatibilidade-signos",
  },
  {
    id: "numerologia",
    name: "Calculadora de Numerologia",
    description:
      "Descubra seus números da vida, personalidade, destino e alma. Interpretações detalhadas baseadas em nome completo e data de nascimento",
    category: "astrologia",
    path: "/calculadoras/astrologia/numerologia",
  },
  {
    id: "gerador-megasena",
    name: "Gerador de Mega-Sena",
    description: "Gere números aleatórios para jogos da Mega-Sena com estatísticas e análises",
    category: "loterias",
    path: "/calculadoras/loterias/gerador-megasena",
  },
  {
    id: "gerador-lotofacil",
    name: "Gerador de Lotofácil",
    description: "Gere números aleatórios para jogos da Lotofácil com estratégias inteligentes",
    category: "loterias",
    path: "/calculadoras/loterias/gerador-lotofacil",
  },
  {
    id: "gerador-quina",
    name: "Gerador de Quina",
    description: "Gere números aleatórios para jogos da Quina com análise de frequência",
    category: "loterias",
    path: "/calculadoras/loterias/gerador-quina",
  },
];

export const BREAKPOINTS = {
  xs: "320px",
  sm: "640px",
  md: "768px",
  lg: "1024px",
  xl: "1280px",
} as const;
