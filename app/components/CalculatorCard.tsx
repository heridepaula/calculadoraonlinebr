import { Link } from "@remix-run/react";
import { Card, CardContent } from "~/components/ui";
import type { Calculator } from "~/types";

interface CalculatorCardProps {
  calculator: Calculator;
  category: "saude" | "financas" | "matematica" | "trabalhista" | "ferramentas" | "astrologia" | "datas";
}

// Mapa de ícones específicos para cada calculadora
const getCalculatorIcon = (calculatorId: string): string => {
  const iconMap: Record<string, string> = {
    // Saúde
    "imc": "⚖️",
    "gordura-corporal": "📊",
    "ciclo-menstrual": "🌸",
    "desenvolvimento-infantil": "👶",
    "hidratacao": "💧",
    
    // Finanças
    "primeiro-milhao": "🎯",
    "juros-compostos": "📈",
    "juros-simples": "📊",
    "lci-lca": "🏛️",
    "preco-medio": "📋",
    "cdb": "💰",
    "financiamento-imobiliario": "🏠",
    "emprestimo-consignado": "💳",
    "consorcio": "🤝",
    "renda-fixa-comparativa": "⚖️",
    "tesouro-direto": "🏛️",
    
    // Matemática
    "porcentagem": "📊",
    "regra-de-tres": "🔄",
    "equacao-segundo-grau": "🔬",
    "mmc-mdc": "🔢",
    "area-perimetro": "📐",
    "volume": "📦",
    "fracoes": "🧮",
    "teorema-pitagoras": "📏",
    
    // Trabalhista
    "rescisao": "📋",
    "ferias": "🏖️",
    "13-salario": "💰",
    "auxilio-desemprego": "🤝",
    "aposentadoria": "👴",
    "pensao-morte": "👥",
    
    // Ferramentas
    "gerador-cpf": "🆔",
    
    // Datas
    "diferenca-entre-datas": "📅",
    "contagem-regressiva": "⏰",
    "operacao-datas": "➕➖",
    "idade-exata": "🎂",
    "dias-uteis": "📊",
    
    // Astrologia
    "ascendente-astrologico": "🌅",
    "signo": "♈",
    "compatibilidade-signos": "💞",
  };
  
  return iconMap[calculatorId] || "🧮";
};

// Função para obter tags específicas baseadas na calculadora
const getCalculatorTags = (calculatorId: string): { primary: string; secondary: string } => {
  const tagMap: Record<string, { primary: string; secondary: string }> = {
    // Saúde
    "imc": { primary: "📊 Análise", secondary: "🎯 Confiável" },
    "gordura-corporal": { primary: "🔬 Científico", secondary: "📈 Detalhado" },
    "ciclo-menstrual": { primary: "🌸 Feminino", secondary: "📅 Ciclos" },
    "desenvolvimento-infantil": { primary: "👶 Bebês", secondary: "📈 Marcos" },
    "hidratacao": { primary: "💧 Personalizado", secondary: "⏱️ Diário" },
    
    // Finanças
    "primeiro-milhao": { primary: "🎯 Meta", secondary: "⏱️ Prazo" },
    "juros-compostos": { primary: "📈 Crescimento", secondary: "💰 Aportes" },
    "juros-simples": { primary: "📊 Básico", secondary: "⏱️ Rápido" },
    "lci-lca": { primary: "🏛️ Isento IR", secondary: "📈 Renda Fixa" },
    "preco-medio": { primary: "📋 Ações", secondary: "💰 Controle" },
    "cdb": { primary: "💰 CDB", secondary: "📊 Tributação" },
    "financiamento-imobiliario": { primary: "🏠 Casa Própria", secondary: "📋 Completo" },
    "emprestimo-consignado": { primary: "💳 Consignado", secondary: "📊 Margem" },
    "consorcio": { primary: "🤝 Consórcio", secondary: "🚗 Veículos" },
    "renda-fixa-comparativa": { primary: "⚖️ Comparar", secondary: "🏆 Ranking" },
    "tesouro-direto": { primary: "🏛️ Tesouro", secondary: "📊 Completa" },
    
    // Matemática
    "porcentagem": { primary: "📊 Percentual", secondary: "⚡ Rápido" },
    "regra-de-tres": { primary: "🔄 Proporção", secondary: "📚 Passo a Passo" },
    "equacao-segundo-grau": { primary: "🔬 Bhaskara", secondary: "📊 Gráfico" },
    "mmc-mdc": { primary: "🔢 Fatores", secondary: "📚 Educativo" },
    "area-perimetro": { primary: "📐 Geometria", secondary: "📏 Medidas" },
    "volume": { primary: "📦 3D", secondary: "🔬 Fórmulas" },
    "fracoes": { primary: "🧮 Frações", secondary: "📚 Passo a Passo" },
    "teorema-pitagoras": { primary: "📏 Pitágoras", secondary: "📐 Triângulos" },
    
    // Trabalhista
    "rescisao-trabalhista": { primary: "📋 Rescisão", secondary: "💰 Direitos" },
    "aposentadoria": { primary: "👴 INSS", secondary: "📊 Planejamento" },
    "ferias": { primary: "🏖️ Férias", secondary: "💰 1/3" },
    "13-salario": { primary: "💰 13º", secondary: "📅 Proporcional" },
    "auxilio-desemprego": { primary: "🤝 Seguro", secondary: "📊 Parcelas" },
    "pensao-morte": { primary: "👥 Pensão", secondary: "💰 Benefício" },
    
    // Ferramentas
    "gerador-cpf": { primary: "🆔 Válidos", secondary: "⚡ Instantâneo" },
    
    // Datas
    "diferenca-entre-datas": { primary: "📅 Intervalos", secondary: "⚡ Rápida" },
    "contagem-regressiva": { primary: "⏰ Tempo Real", secondary: "🎉 Eventos" },
    "operacao-datas": { primary: "🧮 Operações", secondary: "➕➖ Somar/Subtrair" },
    "idade-exata": { primary: "🎂 Idade Exata", secondary: "⏱️ Contador Tempo Real" },
    "dias-uteis": { primary: "📊 Dias Úteis", secondary: "🇧🇷 Feriados Brasil" },
    
    // Astrologia
    "ascendente-astrologico": { primary: "🌅 Ascendente", secondary: "🌍 Localização" },
    "signo": { primary: "♈ Zodíaco", secondary: "🌟 Personalidade" },
    "compatibilidade-signos": { primary: "💞 Amor", secondary: "👥 Amizade" },
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
    <Card className={`group relative overflow-hidden transition-all duration-300 hover:scale-[1.02] ${colors.cardBg} border-2 ${colors.borderColor} ${colors.shadow} hover:shadow-xl h-full flex flex-col`}>
      {/* Gradient Background Overlay */}
      <div className={`absolute inset-0 bg-gradient-to-br ${colors.bgGradient} opacity-50`} />
      
      <CardContent className="relative p-6 flex flex-col h-full">
        {/* Header with Specific Calculator Icon */}
        <div className="mb-4 flex items-start space-x-4">
          {/* Large Calculator-Specific Icon */}
          <div className={`flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-2xl ${colors.iconBg} shadow-lg transition-all duration-300 group-hover:scale-110 group-hover:rotate-3`}>
            <span className="text-2xl">{calculatorIcon}</span>
          </div>
          
          {/* Calculator Info */}
          <div className="flex-1 min-w-0">
            {/* Title - More prominent */}
            <h3 className={`text-xl font-bold leading-tight ${colors.titleColor} mb-2 line-clamp-2`}>
              {calculator.name.replace('Calculadora de ', '').replace('Calculadora ', '')}
            </h3>
            
            {/* Description - Better readability */}
            <p className={`text-sm leading-relaxed ${colors.descriptionColor} mb-3 line-clamp-3`}>
              {calculator.description}
            </p>
            
            {/* Specific Feature Tags */}
            <div className="flex flex-wrap gap-2">
              <span className="inline-flex items-center rounded-full bg-gray-700 px-3 py-1 text-xs font-medium text-gray-200">
                {tags.primary}
              </span>
              <span className="inline-flex items-center rounded-full bg-gray-700 px-3 py-1 text-xs font-medium text-gray-200">
                {tags.secondary}
              </span>
            </div>
          </div>
        </div>

        {/* Spacer para empurrar o botão e footer para baixo */}
        <div className="flex-1"></div>

        {/* Enhanced CTA Button */}
        <div className="mt-6">
          <Link to={calculator.path} className="block w-full group/btn">
            <button className={`w-full ${colors.buttonBg} ${colors.buttonText} px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1 active:scale-[0.98] flex items-center justify-center gap-2`}>
              <span>Usar Calculadora</span>
              <svg className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </button>
          </Link>
        </div>

        {/* Footer with Category and Status */}
        <div className="mt-4 flex items-center justify-between pt-3 border-t border-gray-600">
          <span className={`inline-flex items-center rounded-full ${colors.categoryBadgeBg} px-3 py-1 text-xs font-medium ${colors.categoryBadgeText}`}>
            {colors.categoryIcon} {colors.categoryName}
          </span>
          
          <div className="flex items-center gap-1">
            <div className="h-2 w-2 rounded-full bg-system-success animate-pulse"></div>
            <span className="text-xs font-medium text-system-success">
              Gratuito
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
