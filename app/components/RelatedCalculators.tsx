import { Card, CardHeader, CardTitle, CardContent } from "~/components/ui";

interface RelatedCalculator {
  id: string;
  title: string;
  description: string;
  href: string;
  bgColor: string;
  textColor: string;
  borderColor: string;
  buttonColor: string;
  buttonHoverColor: string;
}

interface RelatedCalculatorsProps {
  category?: "trabalhista" | "financas" | "saude" | "matematica" | "ferramentas" | "astrologia" | "datas" | "loterias";
  currentCalculatorId?: string;
  customCalculators?: RelatedCalculator[];
}

const DEFAULT_CALCULATORS: Record<string, RelatedCalculator[]> = {
  trabalhista: [
    {
      id: "rescisao",
      title: "⚖️ Calculadora Rescisão Trabalhista",
      description:
        "Calcule todos os valores de demissão: FGTS, aviso prévio, férias e 13º salário.",
      href: "/calculadoras/trabalhista/rescisao",
      bgColor: "bg-primary-blue-light",
      textColor: "text-primary-blue-dark",
      borderColor: "border-primary-blue/20",
      buttonColor: "bg-primary-blue",
      buttonHoverColor: "hover:bg-primary-blue-dark",
    },
    {
      id: "aposentadoria",
      title: "🏛️ Calculadora Aposentadoria INSS",
      description: "Simule 5 modalidades de aposentadoria e planeje sua previdência.",
      href: "/calculadoras/trabalhista/aposentadoria",
      bgColor: "bg-growth-green-soft",
      textColor: "text-growth-green",
      borderColor: "border-growth-green/20",
      buttonColor: "bg-growth-green",
      buttonHoverColor: "hover:bg-growth-green-dark",
    },
    {
      id: "auxilio-doenca",
      title: "🏥 Calculadora Auxílio-Doença",
      description: "Calcule benefício por incapacidade com verificação de carência e isenções.",
      href: "/calculadoras/trabalhista/auxilio-doenca",
      bgColor: "bg-system-info/10",
      textColor: "text-system-info",
      borderColor: "border-system-info/20",
      buttonColor: "bg-system-info",
      buttonHoverColor: "hover:bg-system-info-dark",
    },
    {
      id: "salario-liquido",
      title: "💰 Calculadora Salário Líquido",
      description: "Calcule seu salário líquido com INSS e IRRF 2025. CLT, PJ e dependentes.",
      href: "/calculadoras/trabalhista/salario-liquido",
      bgColor: "bg-system-success/10",
      textColor: "text-system-success",
      borderColor: "border-system-success/20",
      buttonColor: "bg-system-success",
      buttonHoverColor: "hover:bg-system-success-dark",
    },
  ],
  financas: [
    {
      id: "juros-compostos",
      title: "📈 Calculadora Juros Compostos",
      description: "Simule investimentos com aportes mensais e visualize o crescimento.",
      href: "/calculadoras/financas/juros-compostos",
      bgColor: "bg-growth-green-soft",
      textColor: "text-growth-green",
      borderColor: "border-growth-green/20",
      buttonColor: "bg-growth-green",
      buttonHoverColor: "hover:bg-growth-green-dark",
    },
    {
      id: "primeiro-milhao",
      title: "🎯 Calculadora Primeiro Milhão",
      description: "Descubra como chegar ao primeiro milhão com planejamento.",
      href: "/calculadoras/financas/primeiro-milhao",
      bgColor: "bg-system-warning/10",
      textColor: "text-system-warning",
      borderColor: "border-system-warning/20",
      buttonColor: "bg-system-warning",
      buttonHoverColor: "hover:bg-system-warning-dark",
    },
    {
      id: "tesouro-direto",
      title: "🏛️ Calculadora Tesouro Direto",
      description: "Simule investimentos em títulos públicos com cupons e impostos.",
      href: "/calculadoras/financas/tesouro-direto",
      bgColor: "bg-primary-blue-light",
      textColor: "text-primary-blue-dark",
      borderColor: "border-primary-blue/20",
      buttonColor: "bg-primary-blue",
      buttonHoverColor: "hover:bg-primary-blue-dark",
    },
  ],
  saude: [
    {
      id: "imc",
      title: "⚖️ Calculadora de IMC",
      description: "Calcule seu Índice de Massa Corporal com classificações da OMS.",
      href: "/calculadoras/saude/imc",
      bgColor: "bg-primary-blue-light",
      textColor: "text-primary-blue-dark",
      borderColor: "border-primary-blue/20",
      buttonColor: "bg-primary-blue",
      buttonHoverColor: "hover:bg-primary-blue-dark",
    },
    {
      id: "gordura-corporal",
      title: "🏃 Calculadora Gordura Corporal",
      description: "Métodos científicos para análise da composição corporal.",
      href: "/calculadoras/saude/gordura-corporal",
      bgColor: "bg-growth-green-soft",
      textColor: "text-growth-green",
      borderColor: "border-growth-green/20",
      buttonColor: "bg-growth-green",
      buttonHoverColor: "hover:bg-growth-green-dark",
    },
    {
      id: "hidratacao",
      title: "💧 Calculadora de Hidratação",
      description: "Calcule sua necessidade diária de água personalizada.",
      href: "/calculadoras/saude/hidratacao",
      bgColor: "bg-system-info/10",
      textColor: "text-system-info",
      borderColor: "border-system-info/20",
      buttonColor: "bg-system-info",
      buttonHoverColor: "hover:bg-system-info-dark",
    },
  ],
  matematica: [
    {
      id: "porcentagem",
      title: "📊 Calculadora de Porcentagem",
      description: "Calcule porcentagens, aumentos e descontos rapidamente.",
      href: "/calculadoras/matematica/porcentagem",
      bgColor: "bg-primary-blue-light",
      textColor: "text-primary-blue-dark",
      borderColor: "border-primary-blue/20",
      buttonColor: "bg-primary-blue",
      buttonHoverColor: "hover:bg-primary-blue-dark",
    },
    {
      id: "regra-de-tres",
      title: "🔢 Calculadora Regra de Três",
      description: "Resolva regra de três simples e inversa com explicações.",
      href: "/calculadoras/matematica/regra-de-tres",
      bgColor: "bg-growth-green-soft",
      textColor: "text-growth-green",
      borderColor: "border-growth-green/20",
      buttonColor: "bg-growth-green",
      buttonHoverColor: "hover:bg-growth-green-dark",
    },
    {
      id: "fracoes",
      title: "🔤 Calculadora de Frações",
      description: "Some, subtraia, multiplique e divida frações facilmente.",
      href: "/calculadoras/matematica/fracoes",
      bgColor: "bg-system-warning/10",
      textColor: "text-system-warning",
      borderColor: "border-system-warning/20",
      buttonColor: "bg-system-warning",
      buttonHoverColor: "hover:bg-system-warning-dark",
    },
  ],
  ferramentas: [
    {
      id: "diferenca-entre-datas",
      title: "📅 Calculadora Diferença entre Datas",
      description: "Calcule idade, dias úteis e intervalos entre datas.",
      href: "/calculadoras/ferramentas/diferenca-entre-datas",
      bgColor: "bg-system-info/10",
      textColor: "text-system-info",
      borderColor: "border-system-info/20",
      buttonColor: "bg-system-info",
      buttonHoverColor: "hover:bg-system-info-dark",
    },
  ],
  astrologia: [
    {
      id: "mapa-astral",
      title: "🌌 Calculadora de Mapa Astral",
      description: "Descubra seu mapa astral completo com posições planetárias detalhadas.",
      href: "/calculadoras/astrologia/mapa-astral",
      bgColor: "bg-math-purple/10",
      textColor: "text-math-purple",
      borderColor: "border-math-purple/20",
      buttonColor: "bg-math-purple",
      buttonHoverColor: "hover:bg-math-purple-dark",
    },
    {
      id: "compatibilidade-signos",
      title: "💕 Compatibilidade de Signos",
      description: "Analise a compatibilidade astrológica entre diferentes signos do zodíaco.",
      href: "/calculadoras/astrologia/compatibilidade-signos",
      bgColor: "bg-health-red/10",
      textColor: "text-health-red",
      borderColor: "border-health-red/20",
      buttonColor: "bg-health-red",
      buttonHoverColor: "hover:bg-health-red-dark",
    },
    {
      id: "numerologia",
      title: "🔢 Calculadora de Numerologia",
      description: "Explore os números da sua vida e descubra seus significados ocultos.",
      href: "/calculadoras/astrologia/numerologia",
      bgColor: "bg-finance-gold/10",
      textColor: "text-finance-gold",
      borderColor: "border-finance-gold/20",
      buttonColor: "bg-finance-gold",
      buttonHoverColor: "hover:bg-finance-gold-dark",
    },
  ],
  datas: [
    {
      id: "diferenca-entre-datas",
      title: "📅 Diferença entre Datas",
      description: "Calcule períodos, intervalos e diferenças entre duas datas.",
      href: "/calculadoras/datas/diferenca-entre-datas",
      bgColor: "bg-system-info/10",
      textColor: "text-system-info",
      borderColor: "border-system-info/20",
      buttonColor: "bg-system-info",
      buttonHoverColor: "hover:bg-system-info-dark",
    },
    {
      id: "idade-exata",
      title: "🎂 Calculadora de Idade",
      description: "Descubra sua idade em anos, meses, dias, horas e minutos.",
      href: "/calculadoras/datas/idade-exata",
      bgColor: "bg-primary-blue/10",
      textColor: "text-primary-blue",
      borderColor: "border-primary-blue/20",
      buttonColor: "bg-primary-blue",
      buttonHoverColor: "hover:bg-primary-blue-dark",
    },
    {
      id: "dias-uteis",
      title: "💼 Dias Úteis",
      description: "Calcule períodos de trabalho excluindo fins de semana e feriados.",
      href: "/calculadoras/datas/dias-uteis",
      bgColor: "bg-system-success/10",
      textColor: "text-system-success",
      borderColor: "border-system-success/20",
      buttonColor: "bg-system-success",
      buttonHoverColor: "hover:bg-system-success-dark",
    },
  ],
  loterias: [
    {
      id: "gerador-mega-sena",
      title: "🍀 Gerador Mega-Sena",
      description: "Gere números aleatórios para jogos da Mega-Sena com estatísticas.",
      href: "/calculadoras/loterias/gerador-mega-sena",
      bgColor: "bg-finance-gold/10",
      textColor: "text-finance-gold",
      borderColor: "border-finance-gold/20",
      buttonColor: "bg-finance-gold",
      buttonHoverColor: "hover:bg-finance-gold-dark",
    },
    {
      id: "gerador-lotofacil",
      title: "🍀 Gerador Lotofácil",
      description: "Gere números para Lotofácil com estratégias inteligentes.",
      href: "/calculadoras/loterias/gerador-lotofacil",
      bgColor: "bg-system-success/10",
      textColor: "text-system-success",
      borderColor: "border-system-success/20",
      buttonColor: "bg-system-success",
      buttonHoverColor: "hover:bg-system-success-dark",
    },
    {
      id: "gerador-quina",
      title: "🎲 Gerador Quina",
      description: "Gere números para Quina com análise de frequência.",
      href: "/calculadoras/loterias/gerador-quina",
      bgColor: "bg-primary-blue/10",
      textColor: "text-primary-blue",
      borderColor: "border-primary-blue/20",
      buttonColor: "bg-primary-blue",
      buttonHoverColor: "hover:bg-primary-blue-dark",
    },
  ],
};

export function RelatedCalculators({
  category = "trabalhista",
  currentCalculatorId,
  customCalculators,
}: RelatedCalculatorsProps) {
  // Use calculadoras customizadas ou padrão da categoria
  const calculators =
    customCalculators || DEFAULT_CALCULATORS[category] || DEFAULT_CALCULATORS.trabalhista;

  // Filtra a calculadora atual se especificada
  const filteredCalculators = currentCalculatorId
    ? calculators.filter((calc) => calc.id !== currentCalculatorId)
    : calculators;

  // Limita a 3 calculadoras para layout otimizado
  const displayCalculators = filteredCalculators.slice(0, 3);

  const getCategoryTitle = (cat: string) => {
    const titles: Record<string, string> = {
      trabalhista: "🔗 Calculadoras Trabalhistas Relacionadas",
      financas: "🔗 Calculadoras Financeiras Relacionadas",
      saude: "🔗 Calculadoras de Saúde Relacionadas",
      matematica: "🔗 Calculadoras Matemáticas Relacionadas",
      ferramentas: "🔗 Ferramentas Relacionadas",
      astrologia: "🔗 Calculadoras de Astrologia Relacionadas",
      datas: "🔗 Calculadoras de Datas Relacionadas",
      loterias: "🔗 Geradores de Loterias Relacionados",
    };
    return titles[cat] || "🔗 Calculadoras Relacionadas";
  };

  const getCategoryTip = (cat: string) => {
    const tips: Record<string, string> = {
      trabalhista:
        "Use essas calculadoras para um planejamento trabalhista e previdenciário completo",
      financas: "Combine essas ferramentas para otimizar seu planejamento financeiro",
      saude: "Monitore sua saúde com essas calculadoras especializadas",
      matematica: "Resolva problemas matemáticos com facilidade usando essas ferramentas",
      ferramentas: "Simplifique seu dia a dia com essas ferramentas práticas",
      astrologia: "Explore diferentes aspectos da astrologia para um autoconhecimento mais profundo",
      datas: "Organize seu tempo e planeje eventos com essas calculadoras temporais",
      loterias: "Teste sua sorte com diferentes tipos de jogos e estratégias inteligentes",
    };
    return tips[cat] || "Explore outras calculadoras úteis para suas necessidades";
  };

  return (
    <Card className="border-l-4 border-primary-blue bg-primary-blue-light/50 backdrop-blur-sm">
      <CardHeader className="pb-3 sm:pb-4">
        <CardTitle as="h2" className="text-lg sm:text-xl font-bold text-primary-blue-dark">
          {getCategoryTitle(category)}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 gap-3 sm:gap-4 md:grid-cols-2 lg:grid-cols-3">
          {displayCalculators.map((calculator) => (
            <a
              key={calculator.id}
              href={calculator.href}
              className={`group block ${calculator.bgColor} rounded-xl border p-4 sm:p-5 ${calculator.borderColor} transition-all duration-300 hover:border-primary-blue hover:shadow-lg hover:scale-[1.02] hover:-translate-y-1`}
            >
              <div className="flex flex-col h-full">
                <div className="flex-1 mb-3">
                  <h3
                    className={`font-semibold ${calculator.textColor} mb-2 text-sm sm:text-base leading-tight line-clamp-2`}
                  >
                    {calculator.title}
                  </h3>
                  <p className="text-xs sm:text-sm leading-relaxed text-text-secondary-dark line-clamp-3">
                    {calculator.description}
                  </p>
                </div>
                <div className="mt-auto">
                  <div
                    className={`inline-flex items-center gap-1.5 text-xs sm:text-sm ${calculator.buttonColor} ${calculator.buttonHoverColor} rounded-lg px-3 py-2 text-white transition-all duration-300 group-hover:shadow-md font-medium min-h-[36px]`}
                  >
                    <span>Acessar</span>
                    <svg
                      className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-0.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M13 7l5 5m0 0l-5 5m5-5H6"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </a>
          ))}
        </div>

        <div className="mt-5 sm:mt-6 rounded-xl border border-primary-blue/30 bg-gradient-to-r from-white/80 to-primary-blue-light/20 p-3 sm:p-4 backdrop-blur-sm">
          <p className="text-center text-xs sm:text-sm text-primary-blue-dark">
            💡 <strong>Dica:</strong> {getCategoryTip(category)}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

export default RelatedCalculators;
