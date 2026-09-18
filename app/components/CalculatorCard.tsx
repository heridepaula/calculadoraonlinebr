import { Link } from "@remix-run/react";
import { Card, CardContent } from "~/components/ui";
import type { Calculator } from "~/types";

interface CalculatorCardProps {
  calculator: Calculator;
  category:
    | "saude"
    | "financas"
    | "matematica"
    | "trabalhista"
    | "ferramentas"
    | "astrologia"
    | "datas"
    | "loterias"
    | "apostas";
}

// Mapa de ícones específicos para cada calculadora
const getCalculatorIcon = (calculatorId: string): string => {
  const iconMap: Record<string, string> = {
    // Saúde
    imc: "⚖️",
    "gordura-corporal": "📊",
    "ciclo-menstrual": "🌸",
    "desenvolvimento-infantil": "👶",
    hidratacao: "💧",

    // Finanças
    "primeiro-milhao": "🎯",
    "juros-compostos": "📈",
    "juros-simples": "📊",
    "lci-lca": "🏛️",
    "preco-medio": "📋",
    cdb: "💰",
    "financiamento-imobiliario": "🏠",
    "emprestimo-consignado": "💳",
    consorcio: "🤝",
    "renda-fixa-comparativa": "⚖️",
    "tesouro-direto": "🏛️",

    // Matemática
    porcentagem: "📊",
    "regra-de-tres": "🔄",
    "equacao-segundo-grau": "🔬",
    "mmc-mdc": "🔢",
    "area-perimetro": "📐",
    volume: "📦",
    fracoes: "🧮",
    "teorema-pitagoras": "📐",

    // Trabalhista
    rescisao: "📋",
    ferias: "🏖️",
    "13-salario": "💰",
    "auxilio-desemprego": "🤝",
    aposentadoria: "👴",
    "pensao-morte": "👥",

    // Ferramentas
    "gerador-cpf": "🆔",
    "gerador-cnpj": "🏢",
    "validar-cpf": "✅",
    "validar-cnpj": "✅",
    "contador-caracteres": "📝",
    "gerador-cartao-credito": "💳",
    "gerador-uuid-guid": "🔗",

    // Datas
    "diferenca-entre-datas": "📅",
    "contagem-regressiva": "⏰",
    "operacao-datas": "➕➖",
    "idade-exata": "🎂",
    "dias-uteis": "📊",

    // Astrologia
    "ascendente-astrologico": "🌅",
    signo: "♈",
    "compatibilidade-signos": "💞",
    // Loterias
    "gerador-mega-sena": "🎯",
    "gerador-lotofacil": "🍀",
    "gerador-quina": "🎲",
    // Apostas
    "criterio-de-kelly": "⚽",
    "valor-esperado": "📈",
    surebet: "⚖️",
  };

  return iconMap[calculatorId] || "🧮";
};

// Função para obter tags específicas baseadas na calculadora
const getCalculatorTags = (calculatorId: string): { primary: string; secondary: string } => {
  const tagMap: Record<string, { primary: string; secondary: string }> = {
    // Saúde
    imc: { primary: "📊 Análise", secondary: "🎯 Confiável" },
    "gordura-corporal": { primary: "🔬 Científico", secondary: "📈 Detalhado" },
    "ciclo-menstrual": { primary: "🌸 Feminino", secondary: "📅 Ciclos" },
    "desenvolvimento-infantil": { primary: "👶 Bebês", secondary: "📈 Marcos" },
    hidratacao: { primary: "💧 Personalizado", secondary: "⏱️ Diário" },

    // Finanças
    "primeiro-milhao": { primary: "🎯 Meta", secondary: "⏱️ Prazo" },
    "juros-compostos": { primary: "📈 Crescimento", secondary: "💰 Aportes" },
    "juros-simples": { primary: "📊 Básico", secondary: "⏱️ Rápido" },
    "lci-lca": { primary: "🏛️ Isento IR", secondary: "📈 Renda Fixa" },
    "preco-medio": { primary: "📋 Ações", secondary: "💰 Controle" },
    cdb: { primary: "💰 CDB", secondary: "📊 Tributação" },
    "financiamento-imobiliario": { primary: "🏠 Casa Própria", secondary: "📋 Completo" },
    "emprestimo-consignado": { primary: "💳 Consignado", secondary: "📊 Margem" },
    consorcio: { primary: "🤝 Consórcio", secondary: "🚗 Veículos" },
    "renda-fixa-comparativa": { primary: "⚖️ Comparar", secondary: "🏆 Ranking" },
    "tesouro-direto": { primary: "🏛️ Tesouro", secondary: "📊 Completa" },

    // Matemática
    porcentagem: { primary: "📊 Percentual", secondary: "⚡ Rápido" },
    "regra-de-tres": { primary: "🔄 Proporção", secondary: "📚 Passo a Passo" },
    "equacao-segundo-grau": { primary: "🔬 Bhaskara", secondary: "📊 Gráfico" },
    "mmc-mdc": { primary: "🔢 Fatores", secondary: "📚 Educativo" },
    "area-perimetro": { primary: "📐 Geometria", secondary: "📏 Medidas" },
    volume: { primary: "📦 3D", secondary: "🔬 Fórmulas" },
    fracoes: { primary: "🧮 Frações", secondary: "📚 Passo a Passo" },
    "teorema-pitagoras": { primary: "📐 Pitágoras", secondary: "📏 Triângulos" },

    // Trabalhista
    "rescisao-trabalhista": { primary: "📋 Rescisão", secondary: "💰 Direitos" },
    aposentadoria: { primary: "👴 INSS", secondary: "📊 Planejamento" },
    ferias: { primary: "🏖️ Férias", secondary: "💰 1/3" },
    "13-salario": { primary: "💰 13º", secondary: "📅 Proporcional" },
    "auxilio-desemprego": { primary: "🤝 Seguro", secondary: "📊 Parcelas" },
    "pensao-morte": { primary: "👥 Pensão", secondary: "💰 Benefício" },

    // Ferramentas
    "gerador-cpf": { primary: "🆔 CPF Válido", secondary: "⚡ Instantâneo" },
    "gerador-cnpj": { primary: "🏢 CNPJ Válido", secondary: "⚡ Instantâneo" },
    "validar-cpf": { primary: "✅ Validação", secondary: "🔍 Verificação" },
    "validar-cnpj": { primary: "✅ Validação", secondary: "🔍 Verificação" },
    "contador-caracteres": { primary: "📝 Análise", secondary: "📊 Estatísticas" },
    "gerador-cartao-credito": { primary: "💳 Cartões", secondary: "🧪 Teste" },
    "gerador-uuid-guid": { primary: "🔗 UUID/GUID", secondary: "🌐 Múltiplos Formatos" },

    // Datas
    "diferenca-entre-datas": { primary: "📅 Intervalos", secondary: "⚡ Rápida" },
    "contagem-regressiva": { primary: "⏰ Tempo Real", secondary: "🎉 Eventos" },
    "operacao-datas": { primary: "🧮 Operações", secondary: "➕➖ Somar/Subtrair" },
    "idade-exata": { primary: "🎂 Idade Exata", secondary: "⏱️ Contador Tempo Real" },
    "dias-uteis": { primary: "📊 Dias Úteis", secondary: "🇧🇷 Feriados Brasil" },

    // Astrologia
    "ascendente-astrologico": { primary: "🌅 Ascendente", secondary: "🌍 Localização" },
    signo: { primary: "♈ Zodíaco", secondary: "🌟 Personalidade" },
    "compatibilidade-signos": { primary: "💞 Amor", secondary: "👥 Amizade" },
    // Loterias
    "gerador-mega-sena": { primary: "🎯 6 Números", secondary: "🍀 Mega-Sena" },
    "gerador-lotofacil": { primary: "🍀 15 Números", secondary: "🎯 Loteria" },
    "gerador-quina": { primary: "🎲 5 Números", secondary: "💰 Quina" },
    // Apostas
    "criterio-de-kelly": { primary: "📐 Stake Ideal", secondary: "⚽ Gestão de Banca" },
    "valor-esperado": { primary: "📈 EV+ ou EV-", secondary: "📊 Gráficos" },
    surebet: { primary: "💰 Lucro Garantido", secondary: "⚖️ 2 e 3 Vias" },
  };

  return tagMap[calculatorId] || { primary: "⚡ Rápido", secondary: "🎯 Confiável" };
};

const getCategoryColors = (category: string) => {
  switch (category) {
    case "saude":
      return {
        bgGradient: "from-health-red/20 via-health-red/15 to-health-red/5",
        cardBg: "bg-gray-800",
        borderColor: "border-health-red/30 hover:border-health-red/50",
        iconBg: "bg-health-red",
        iconColor: "text-white",
        titleColor: "text-white",
        descriptionColor: "text-gray-300",
        buttonBg: "bg-health-red hover:bg-health-red-dark",
        buttonText: "text-white",
        categoryBadgeBg: "bg-health-red/20",
        categoryBadgeText: "text-health-red-light",
        categoryIcon: "🏥",
        categoryName: "Saúde",
        shadow: "hover:shadow-health-red/20",
      };
    case "financas":
      return {
        bgGradient: "from-finance-gold/20 via-finance-gold/15 to-finance-gold/5",
        cardBg: "bg-gray-800",
        borderColor: "border-finance-gold/30 hover:border-finance-gold/50",
        iconBg: "bg-finance-gold",
        iconColor: "text-white",
        titleColor: "text-white",
        descriptionColor: "text-gray-300",
        buttonBg: "bg-finance-gold hover:bg-finance-gold-dark",
        buttonText: "text-white",
        categoryBadgeBg: "bg-finance-gold/20",
        categoryBadgeText: "text-finance-gold-light",
        categoryIcon: "💰",
        categoryName: "Finanças",
        shadow: "hover:shadow-finance-gold/20",
      };
    case "loterias":
      return {
        bgGradient: "from-finance-gold/20 via-finance-gold/15 to-finance-gold/5",
        cardBg: "bg-gray-800",
        borderColor: "border-finance-gold/30 hover:border-finance-gold/50",
        iconBg: "bg-finance-gold",
        iconColor: "text-white",
        titleColor: "text-white",
        descriptionColor: "text-gray-300",
        buttonBg: "bg-finance-gold hover:bg-finance-gold-dark",
        buttonText: "text-white",
        categoryBadgeBg: "bg-finance-gold/20",
        categoryBadgeText: "text-finance-gold-light",
        categoryIcon: "🎰",
        categoryName: "Loterias",
        shadow: "hover:shadow-finance-gold/20",
      };
    case "apostas":
      return {
        bgGradient: "from-growth-green/20 via-growth-green/15 to-growth-green/5",
        cardBg: "bg-gray-800",
        borderColor: "border-growth-green/30 hover:border-growth-green/50",
        iconBg: "bg-growth-green-soft",
        iconColor: "text-white",
        titleColor: "text-white",
        descriptionColor: "text-gray-300",
        buttonBg: "bg-growth-green hover:bg-growth-green-dark",
        buttonText: "text-gray-900",
        categoryBadgeBg: "bg-growth-green/20",
        categoryBadgeText: "text-growth-green",
        categoryIcon: "⚽",
        categoryName: "Apostas",
        shadow: "hover:shadow-growth-green/20",
      };
    case "matematica":
      return {
        bgGradient: "from-math-purple/20 via-math-purple/15 to-math-purple/5",
        cardBg: "bg-gray-800",
        borderColor: "border-math-purple/30 hover:border-math-purple/50",
        iconBg: "bg-math-purple",
        iconColor: "text-white",
        titleColor: "text-white",
        descriptionColor: "text-gray-300",
        buttonBg: "bg-math-purple hover:bg-math-purple-dark",
        buttonText: "text-white",
        categoryBadgeBg: "bg-math-purple/20",
        categoryBadgeText: "text-math-purple-light",
        categoryIcon: "🔢",
        categoryName: "Matemática",
        shadow: "hover:shadow-math-purple/20",
      };
    case "trabalhista":
      return {
        bgGradient: "from-system-info/20 via-system-info/15 to-system-info/5",
        cardBg: "bg-gray-800",
        borderColor: "border-system-info/30 hover:border-system-info/50",
        iconBg: "bg-system-info",
        iconColor: "text-white",
        titleColor: "text-white",
        descriptionColor: "text-gray-300",
        buttonBg: "bg-system-info hover:bg-system-info-dark",
        buttonText: "text-white",
        categoryBadgeBg: "bg-system-info/20",
        categoryBadgeText: "text-system-info-light",
        categoryIcon: "⚖️",
        categoryName: "Trabalhista",
        shadow: "hover:shadow-system-info/20",
      };
    case "ferramentas":
      return {
        bgGradient: "from-system-success/20 via-system-success/15 to-system-success/5",
        cardBg: "bg-gray-800",
        borderColor: "border-system-success/30 hover:border-system-success/50",
        iconBg: "bg-system-success",
        iconColor: "text-white",
        titleColor: "text-white",
        descriptionColor: "text-gray-300",
        buttonBg: "bg-system-success hover:bg-system-success-dark",
        buttonText: "text-white",
        categoryBadgeBg: "bg-system-success/20",
        categoryBadgeText: "text-system-success-light",
        categoryIcon: "🔧",
        categoryName: "Ferramentas",
        shadow: "hover:shadow-system-success/20",
      };
    case "astrologia":
      return {
        bgGradient: "from-purple-500/20 via-purple-500/15 to-purple-500/5",
        cardBg: "bg-gray-800",
        borderColor: "border-purple-500/30 hover:border-purple-500/50",
        iconBg: "bg-purple-500",
        iconColor: "text-white",
        titleColor: "text-white",
        descriptionColor: "text-gray-300",
        buttonBg: "bg-purple-500 hover:bg-purple-600",
        buttonText: "text-white",
        categoryBadgeBg: "bg-purple-500/20",
        categoryBadgeText: "text-purple-300",
        categoryIcon: "🌟",
        categoryName: "Astrologia",
        shadow: "hover:shadow-purple-500/20",
      };
    case "datas":
      return {
        bgGradient: "from-blue-500/20 via-blue-500/15 to-blue-500/5",
        cardBg: "bg-gray-800",
        borderColor: "border-blue-500/30 hover:border-blue-500/50",
        iconBg: "bg-blue-500",
        iconColor: "text-white",
        titleColor: "text-white",
        descriptionColor: "text-gray-300",
        buttonBg: "bg-blue-500 hover:bg-blue-600",
        buttonText: "text-white",
        categoryBadgeBg: "bg-blue-500/20",
        categoryBadgeText: "text-blue-300",
        categoryIcon: "📅",
        categoryName: "Datas",
        shadow: "hover:shadow-blue-500/20",
      };
    default:
      return {
        bgGradient: "from-primary-blue/20 via-primary-blue/15 to-primary-blue/5",
        cardBg: "bg-gray-800",
        borderColor: "border-primary-blue/30 hover:border-primary-blue/50",
        iconBg: "bg-primary-blue",
        iconColor: "text-white",
        titleColor: "text-white",
        descriptionColor: "text-gray-300",
        buttonBg: "bg-primary-blue hover:bg-primary-blue-dark",
        buttonText: "text-white",
        categoryBadgeBg: "bg-primary-blue/20",
        categoryBadgeText: "text-primary-blue-light",
        categoryIcon: "🧮",
        categoryName: "Geral",
        shadow: "hover:shadow-primary-blue/20",
      };
  }
};

export function CalculatorCard({ calculator, category }: CalculatorCardProps) {
  const colors = getCategoryColors(category);
  const calculatorIcon = getCalculatorIcon(calculator.id);
  const tags = getCalculatorTags(calculator.id);

  return (
    <Card
      className={`group relative overflow-hidden transition-all duration-300 hover:scale-[1.01] ${colors.cardBg} border ${colors.borderColor} ${colors.shadow} flex h-full flex-col hover:shadow-lg`}
    >
      {/* Gradient Background Overlay */}
      <div className={`absolute inset-0 bg-gradient-to-br ${colors.bgGradient} opacity-40`} />

      <CardContent className="relative flex h-full flex-col p-3 sm:p-4 lg:p-5">
        {/* Header with Specific Calculator Icon */}
        <div className="mb-3 flex items-start space-x-3">
          {/* Smaller Calculator-Specific Icon */}
          <div
            className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg sm:h-12 sm:w-12 ${colors.iconBg} shadow-md transition-all duration-300 group-hover:scale-105`}
          >
            <span className="text-lg sm:text-xl">{calculatorIcon}</span>
          </div>

          {/* Calculator Info */}
          <div className="min-w-0 flex-1">
            {/* Title - Most prominent */}
            <h3
              className={`text-base font-bold leading-tight sm:text-lg lg:text-xl ${colors.titleColor} mb-1 line-clamp-2 sm:mb-2`}
            >
              {calculator.name.replace("Calculadora de ", "").replace("Calculadora ", "")}
            </h3>

            {/* Description - Subtle */}
            <p
              className={`text-xs leading-snug sm:text-sm ${colors.descriptionColor} mb-2 line-clamp-2 opacity-80 sm:line-clamp-3`}
            >
              {calculator.description}
            </p>
          </div>
        </div>

        {/* Specific Feature Tags */}
        <div className="mb-3 flex flex-wrap gap-1">
          <span className="inline-flex items-center rounded-md bg-gray-700/60 px-2 py-0.5 text-xs font-medium text-gray-300">
            {tags.primary}
          </span>
          <span className="inline-flex items-center rounded-md bg-gray-700/60 px-2 py-0.5 text-xs font-medium text-gray-300">
            {tags.secondary}
          </span>
        </div>

        {/* Spacer para empurrar o botão e footer para baixo */}
        <div className="flex-1"></div>

        {/* Compact CTA Button */}
        <div className="mt-2">
          <Link to={calculator.path} className="group/btn block w-full">
            <button
              className={`w-full ${colors.buttonBg} ${colors.buttonText} flex items-center justify-center gap-1.5 rounded-lg px-3 py-2 text-xs font-medium transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md active:scale-[0.98] sm:px-4 sm:py-2.5 sm:text-sm`}
            >
              <span>Acessar</span>
              <svg
                className="h-3 w-3 transition-transform duration-300 group-hover/btn:translate-x-0.5 sm:h-4 sm:w-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </button>
          </Link>
        </div>

        {/* Footer with Category and Status */}
        <div className="mt-2 flex items-center justify-between border-t border-gray-600/50 pt-2 sm:mt-3">
          <span
            className={`inline-flex items-center rounded-md ${colors.categoryBadgeBg} px-2 py-0.5 text-xs font-medium ${colors.categoryBadgeText}`}
          >
            {colors.categoryIcon} {colors.categoryName}
          </span>

          <div className="flex items-center gap-1">
            <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-system-success"></div>
            <span className="text-xs font-medium text-system-success">Gratuito</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
