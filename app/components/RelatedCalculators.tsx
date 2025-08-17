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
  category?: "trabalhista" | "financas" | "saude" | "matematica";
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
    };
    return tips[cat] || "Explore outras calculadoras úteis para suas necessidades";
  };

  return (
    <Card className="border-l-4 border-primary-blue bg-primary-blue-light">
      <CardHeader>
        <CardTitle as="h2" className="text-xl font-bold text-primary-blue-dark">
          {getCategoryTitle(category)}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {displayCalculators.map((calculator) => (
            <a
              key={calculator.id}
              href={calculator.href}
              className={`block ${calculator.bgColor} rounded-lg border p-4 ${calculator.borderColor} transition-all hover:border-primary-blue hover:shadow-md`}
            >
              <div className="flex items-start gap-3">
                <div className="flex-1">
                  <h3
                    className={`font-semibold ${calculator.textColor} mb-2 text-sm leading-tight`}
                  >
                    {calculator.title}
                  </h3>
                  <p className="mb-3 text-xs leading-relaxed text-text-secondary">
                    {calculator.description}
                  </p>
                  <span
                    className={`text-xs ${calculator.buttonColor} ${calculator.buttonHoverColor} inline-block rounded px-3 py-1 text-white transition-colors`}
                  >
                    Acessar →
                  </span>
                </div>
              </div>
            </a>
          ))}
        </div>

        <div className="mt-4 rounded-lg border border-primary-blue/30 bg-white p-3">
          <p className="text-center text-xs text-primary-blue-dark">
            💡 <strong>Dica:</strong> {getCategoryTip(category)}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

export default RelatedCalculators;
