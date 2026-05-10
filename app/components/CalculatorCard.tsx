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
    | "loterias";
}

// Mapa de Ã­cones especÃ­ficos para cada calculadora
const getCalculatorIcon = (calculatorId: string): string => {
  const iconMap: Record<string, string> = {
    // SaÃºde
    imc: "âš–ï¸",
    "gordura-corporal": "ðŸ“Š",
    "ciclo-menstrual": "ðŸŒ¸",
    "desenvolvimento-infantil": "ðŸ‘¶",
    hidratacao: "ðŸ’§",

    // FinanÃ§as
    "primeiro-milhao": "ðŸŽ¯",
    "juros-compostos": "ðŸ“ˆ",
    "juros-simples": "ðŸ“Š",
    "lci-lca": "ðŸ›ï¸",
    "preco-medio": "ðŸ“‹",
    cdb: "ðŸ’°",
    "financiamento-imobiliario": "ðŸ ",
    "emprestimo-consignado": "ðŸ’³",
    consorcio: "ðŸ¤",
    "renda-fixa-comparativa": "âš–ï¸",
    "tesouro-direto": "ðŸ›ï¸",

    // MatemÃ¡tica
    porcentagem: "ðŸ“Š",
    "regra-de-tres": "ðŸ”„",
    "equacao-segundo-grau": "ðŸ”¬",
    "mmc-mdc": "ðŸ”¢",
    "area-perimetro": "ðŸ“",
    volume: "ðŸ“¦",
    fracoes: "ðŸ§®",
    "teorema-pitagoras": "ðŸ“",

    // Trabalhista
    rescisao: "ðŸ“‹",
    ferias: "ðŸ–ï¸",
    "13-salario": "ðŸ’°",
    "auxilio-desemprego": "ðŸ¤",
    aposentadoria: "ðŸ‘´",
    "pensao-morte": "ðŸ‘¥",

    // Ferramentas
    "gerador-cpf": "ðŸ†”",
    "gerador-cnpj": "ðŸ¢",
    "validar-cpf": "âœ…",
    "validar-cnpj": "âœ…",
    "contador-caracteres": "ðŸ“",
    "gerador-cartao-credito": "ðŸ’³",
    "gerador-uuid-guid": "ðŸ”—",

    // Datas
    "diferenca-entre-datas": "ðŸ“…",
    "contagem-regressiva": "â°",
    "operacao-datas": "âž•âž–",
    "idade-exata": "ðŸŽ‚",
    "dias-uteis": "ðŸ“Š",

    // Astrologia
    "ascendente-astrologico": "ðŸŒ…",
    signo: "â™ˆ",
    "compatibilidade-signos": "ðŸ’ž",
    // Loterias
    "gerador-mega-sena": "🎯",
    "gerador-lotofacil": "🍀",
    "gerador-quina": "🎲",  };

  return iconMap[calculatorId] || "ðŸ§®";
};

// FunÃ§Ã£o para obter tags especÃ­ficas baseadas na calculadora
const getCalculatorTags = (calculatorId: string): { primary: string; secondary: string } => {
  const tagMap: Record<string, { primary: string; secondary: string }> = {
    // SaÃºde
    imc: { primary: "ðŸ“Š AnÃ¡lise", secondary: "ðŸŽ¯ ConfiÃ¡vel" },
    "gordura-corporal": { primary: "ðŸ”¬ CientÃ­fico", secondary: "ðŸ“ˆ Detalhado" },
    "ciclo-menstrual": { primary: "ðŸŒ¸ Feminino", secondary: "ðŸ“… Ciclos" },
    "desenvolvimento-infantil": { primary: "ðŸ‘¶ BebÃªs", secondary: "ðŸ“ˆ Marcos" },
    hidratacao: { primary: "ðŸ’§ Personalizado", secondary: "â±ï¸ DiÃ¡rio" },

    // FinanÃ§as
    "primeiro-milhao": { primary: "ðŸŽ¯ Meta", secondary: "â±ï¸ Prazo" },
    "juros-compostos": { primary: "ðŸ“ˆ Crescimento", secondary: "ðŸ’° Aportes" },
    "juros-simples": { primary: "ðŸ“Š BÃ¡sico", secondary: "â±ï¸ RÃ¡pido" },
    "lci-lca": { primary: "ðŸ›ï¸ Isento IR", secondary: "ðŸ“ˆ Renda Fixa" },
    "preco-medio": { primary: "ðŸ“‹ AÃ§Ãµes", secondary: "ðŸ’° Controle" },
    cdb: { primary: "ðŸ’° CDB", secondary: "ðŸ“Š TributaÃ§Ã£o" },
    "financiamento-imobiliario": { primary: "ðŸ  Casa PrÃ³pria", secondary: "ðŸ“‹ Completo" },
    "emprestimo-consignado": { primary: "ðŸ’³ Consignado", secondary: "ðŸ“Š Margem" },
    consorcio: { primary: "ðŸ¤ ConsÃ³rcio", secondary: "ðŸš— VeÃ­culos" },
    "renda-fixa-comparativa": { primary: "âš–ï¸ Comparar", secondary: "ðŸ† Ranking" },
    "tesouro-direto": { primary: "ðŸ›ï¸ Tesouro", secondary: "ðŸ“Š Completa" },

    // MatemÃ¡tica
    porcentagem: { primary: "ðŸ“Š Percentual", secondary: "âš¡ RÃ¡pido" },
    "regra-de-tres": { primary: "ðŸ”„ ProporÃ§Ã£o", secondary: "ðŸ“š Passo a Passo" },
    "equacao-segundo-grau": { primary: "ðŸ”¬ Bhaskara", secondary: "ðŸ“Š GrÃ¡fico" },
    "mmc-mdc": { primary: "ðŸ”¢ Fatores", secondary: "ðŸ“š Educativo" },
    "area-perimetro": { primary: "ðŸ“ Geometria", secondary: "ðŸ“ Medidas" },
    volume: { primary: "ðŸ“¦ 3D", secondary: "ðŸ”¬ FÃ³rmulas" },
    fracoes: { primary: "ðŸ§® FraÃ§Ãµes", secondary: "ðŸ“š Passo a Passo" },
    "teorema-pitagoras": { primary: "ðŸ“ PitÃ¡goras", secondary: "ðŸ“ TriÃ¢ngulos" },

    // Trabalhista
    "rescisao-trabalhista": { primary: "ðŸ“‹ RescisÃ£o", secondary: "ðŸ’° Direitos" },
    aposentadoria: { primary: "ðŸ‘´ INSS", secondary: "ðŸ“Š Planejamento" },
    ferias: { primary: "ðŸ–ï¸ FÃ©rias", secondary: "ðŸ’° 1/3" },
    "13-salario": { primary: "ðŸ’° 13Âº", secondary: "ðŸ“… Proporcional" },
    "auxilio-desemprego": { primary: "ðŸ¤ Seguro", secondary: "ðŸ“Š Parcelas" },
    "pensao-morte": { primary: "ðŸ‘¥ PensÃ£o", secondary: "ðŸ’° BenefÃ­cio" },

    // Ferramentas
    "gerador-cpf": { primary: "ðŸ†” CPF VÃ¡lido", secondary: "âš¡ InstantÃ¢neo" },
    "gerador-cnpj": { primary: "ðŸ¢ CNPJ VÃ¡lido", secondary: "âš¡ InstantÃ¢neo" },
    "validar-cpf": { primary: "âœ… ValidaÃ§Ã£o", secondary: "ðŸ” VerificaÃ§Ã£o" },
    "validar-cnpj": { primary: "âœ… ValidaÃ§Ã£o", secondary: "ðŸ” VerificaÃ§Ã£o" },
    "contador-caracteres": { primary: "ðŸ“ AnÃ¡lise", secondary: "ðŸ“Š EstatÃ­sticas" },
    "gerador-cartao-credito": { primary: "ðŸ’³ CartÃµes", secondary: "ðŸ§ª Teste" },
    "gerador-uuid-guid": { primary: "ðŸ”— UUID/GUID", secondary: "ðŸŒ MÃºltiplos Formatos" },

    // Datas
    "diferenca-entre-datas": { primary: "ðŸ“… Intervalos", secondary: "âš¡ RÃ¡pida" },
    "contagem-regressiva": { primary: "â° Tempo Real", secondary: "ðŸŽ‰ Eventos" },
    "operacao-datas": { primary: "ðŸ§® OperaÃ§Ãµes", secondary: "âž•âž– Somar/Subtrair" },
    "idade-exata": { primary: "ðŸŽ‚ Idade Exata", secondary: "â±ï¸ Contador Tempo Real" },
    "dias-uteis": { primary: "ðŸ“Š Dias Ãšteis", secondary: "ðŸ‡§ðŸ‡· Feriados Brasil" },

    // Astrologia
    "ascendente-astrologico": { primary: "ðŸŒ… Ascendente", secondary: "ðŸŒ LocalizaÃ§Ã£o" },
    signo: { primary: "â™ˆ ZodÃ­aco", secondary: "ðŸŒŸ Personalidade" },
    "compatibilidade-signos": { primary: "ðŸ’ž Amor", secondary: "ðŸ‘¥ Amizade" },
    // Loterias
    "gerador-mega-sena": { primary: "🎯 6 Numeros", secondary: "🍀 Mega-Sena" },
    "gerador-lotofacil": { primary: "🍀 15 Numeros", secondary: "🎯 Loteria" },
    "gerador-quina": { primary: "🎲 5 Numeros", secondary: "💰 Quina" },  };

  return tagMap[calculatorId] || { primary: "âš¡ RÃ¡pido", secondary: "ðŸŽ¯ ConfiÃ¡vel" };
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
        categoryIcon: "ðŸ¥",
        categoryName: "SaÃºde",
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
        categoryIcon: "ðŸ’°",
        categoryName: "FinanÃ§as",
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
      };    case "matematica":
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
        categoryIcon: "ðŸ”¢",
        categoryName: "MatemÃ¡tica",
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
        categoryIcon: "âš–ï¸",
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
        categoryIcon: "ðŸ”§",
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
        categoryIcon: "ðŸŒŸ",
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
        categoryIcon: "ðŸ“…",
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
        categoryIcon: "ðŸ§®",
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

        {/* Spacer para empurrar o botÃ£o e footer para baixo */}
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






