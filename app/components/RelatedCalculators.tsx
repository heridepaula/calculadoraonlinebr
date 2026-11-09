import { Link, useLocation } from "@remix-run/react";
import { Card, CardHeader, CardTitle, CardContent } from "~/components/ui";
import { CALCULATORS } from "~/lib/constants";

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

type CategoryId =
  | "trabalhista"
  | "financas"
  | "saude"
  | "matematica"
  | "ferramentas"
  | "astrologia"
  | "datas"
  | "loterias"
  | "apostas";

interface RelatedCalculatorsProps {
  category?: CategoryId;
  /** Opcional: a calculadora atual também é detectada pela URL. */
  currentCalculatorId?: string;
  /** Lista manual; quando passada, substitui a seleção automática. */
  customCalculators?: RelatedCalculator[];
}

/** Quantos cards exibir: 6 links internos por página (eram 3, e só de uma lista fixa). */
const MAX_ITEMS = 6;

type CardStyle = Pick<
  RelatedCalculator,
  "bgColor" | "textColor" | "borderColor" | "buttonColor" | "buttonHoverColor"
>;

// Classes completas e literais para o Tailwind encontrá-las no build
const CATEGORY_STYLES: Record<CategoryId, CardStyle> = {
  trabalhista: {
    bgColor: "bg-primary-blue-light",
    textColor: "text-primary-blue-dark",
    borderColor: "border-primary-blue/20",
    buttonColor: "bg-primary-blue",
    buttonHoverColor: "hover:bg-primary-blue-dark",
  },
  financas: {
    bgColor: "bg-growth-green-soft",
    textColor: "text-growth-green",
    borderColor: "border-growth-green/20",
    buttonColor: "bg-growth-green",
    buttonHoverColor: "hover:bg-growth-green-dark",
  },
  saude: {
    bgColor: "bg-primary-blue-light",
    textColor: "text-primary-blue-dark",
    borderColor: "border-primary-blue/20",
    buttonColor: "bg-primary-blue",
    buttonHoverColor: "hover:bg-primary-blue-dark",
  },
  matematica: {
    bgColor: "bg-primary-blue-light",
    textColor: "text-primary-blue-dark",
    borderColor: "border-primary-blue/20",
    buttonColor: "bg-primary-blue",
    buttonHoverColor: "hover:bg-primary-blue-dark",
  },
  ferramentas: {
    bgColor: "bg-system-info/10",
    textColor: "text-system-info",
    borderColor: "border-system-info/20",
    buttonColor: "bg-system-info",
    buttonHoverColor: "hover:bg-system-info-dark",
  },
  astrologia: {
    bgColor: "bg-math-purple/10",
    textColor: "text-math-purple",
    borderColor: "border-math-purple/20",
    buttonColor: "bg-math-purple",
    buttonHoverColor: "hover:brightness-110",
  },
  datas: {
    bgColor: "bg-system-info/10",
    textColor: "text-system-info",
    borderColor: "border-system-info/20",
    buttonColor: "bg-system-info",
    buttonHoverColor: "hover:bg-system-info-dark",
  },
  loterias: {
    bgColor: "bg-finance-gold/10",
    textColor: "text-finance-gold",
    borderColor: "border-finance-gold/20",
    buttonColor: "bg-finance-gold",
    buttonHoverColor: "hover:bg-finance-gold-dark",
  },
  apostas: {
    bgColor: "bg-primary-blue/10",
    textColor: "text-primary-blue",
    borderColor: "border-primary-blue/20",
    buttonColor: "bg-primary-blue",
    buttonHoverColor: "hover:bg-primary-blue-dark",
  },
};

/**
 * Ligações entre categorias quando o tema é claramente vizinho. Entram antes das
 * calculadoras da mesma categoria.
 */
const CROSS_LINKS: Record<string, string[]> = {
  porcentagem: ["juros-simples"],
  "juros-simples": ["porcentagem"],
  "regra-de-tres": ["conversor-unidades"],
  "conversor-unidades": ["regra-de-tres"],
  "salario-liquido": ["emprestimo-consignado"],
  "emprestimo-consignado": ["salario-liquido"],
  aposentadoria: ["primeiro-milhao"],
  "primeiro-milhao": ["aposentadoria"],
  "ferias-decimo-terceiro": ["dias-uteis", "decimo-terceiro"],
  "decimo-terceiro": ["salario-liquido", "ferias-decimo-terceiro"],
  "dias-uteis": ["ferias-decimo-terceiro"],
  "idade-exata": ["signo"],
  signo: ["idade-exata"],
  "sorteador-online": ["gerador-mega-sena"],
  "gerador-mega-sena": ["sorteador-online"],
  "gerador-lotofacil": ["sorteador-online"],
  "gerador-quina": ["sorteador-online"],
};

type Calculator = (typeof CALCULATORS)[number];

const toCard = (calc: Calculator): RelatedCalculator => ({
  id: calc.id,
  title: calc.name,
  description: calc.description,
  href: calc.path,
  ...CATEGORY_STYLES[calc.category as CategoryId],
});

/**
 * Seleção automática: links entre categorias da calculadora atual e, em seguida, as
 * próximas calculadoras da mesma categoria (em rodízio a partir da atual), para que
 * cada calculadora receba links das vizinhas e nenhuma fique sem link interno.
 */
function pickRelated(category: CategoryId, current: Calculator | undefined): RelatedCalculator[] {
  const sameCategory = CALCULATORS.filter((c) => c.category === category);
  const start = current ? sameCategory.findIndex((c) => c.id === current.id) + 1 : 0;
  const rotated = [...sameCategory.slice(start), ...sameCategory.slice(0, start)];

  const cross = (current ? CROSS_LINKS[current.id] ?? [] : [])
    .map((id) => CALCULATORS.find((c) => c.id === id))
    .filter((c): c is Calculator => Boolean(c));

  const seen = new Set<string>(current ? [current.id] : []);
  const picked: RelatedCalculator[] = [];
  for (const calc of [...cross, ...rotated]) {
    if (seen.has(calc.id)) continue;
    seen.add(calc.id);
    picked.push(toCard(calc));
    if (picked.length === MAX_ITEMS) break;
  }
  return picked;
}

const CATEGORY_TITLES: Record<string, string> = {
  trabalhista: "🔗 Calculadoras Trabalhistas Relacionadas",
  financas: "🔗 Calculadoras Financeiras Relacionadas",
  saude: "🔗 Calculadoras de Saúde Relacionadas",
  matematica: "🔗 Calculadoras Matemáticas Relacionadas",
  ferramentas: "🔗 Ferramentas Relacionadas",
  astrologia: "🔗 Calculadoras de Astrologia Relacionadas",
  datas: "🔗 Calculadoras de Datas Relacionadas",
  loterias: "🔗 Geradores de Loterias Relacionados",
  apostas: "🔗 Calculadoras de Apostas Relacionadas",
};

const CATEGORY_TIPS: Record<string, string> = {
  trabalhista: "Use essas calculadoras para um planejamento trabalhista e previdenciário completo",
  financas: "Combine essas ferramentas para otimizar seu planejamento financeiro",
  saude: "Monitore sua saúde com essas calculadoras especializadas",
  matematica: "Resolva problemas matemáticos com facilidade usando essas ferramentas",
  ferramentas: "Simplifique seu dia a dia com essas ferramentas práticas",
  astrologia: "Explore diferentes aspectos da astrologia para um autoconhecimento mais profundo",
  datas: "Organize seu tempo e planeje eventos com essas calculadoras temporais",
  loterias: "Teste sua sorte com diferentes tipos de jogos e estratégias inteligentes",
  apostas: "Combine matemática e gestão de risco para apostar com responsabilidade",
};

export function RelatedCalculators({
  category = "trabalhista",
  currentCalculatorId,
  customCalculators,
}: RelatedCalculatorsProps) {
  const { pathname } = useLocation();
  const current =
    CALCULATORS.find((c) => c.path === pathname) ??
    CALCULATORS.find((c) => c.id === currentCalculatorId);
  // A categoria real da calculadora prevalece sobre a prop
  const activeCategory = (current?.category as CategoryId | undefined) ?? category;

  const displayCalculators = customCalculators
    ? customCalculators
        .filter((calc) => calc.href !== pathname && calc.id !== currentCalculatorId)
        .slice(0, MAX_ITEMS)
    : pickRelated(activeCategory, current);

  if (displayCalculators.length === 0) return null;

  return (
    <Card className="border-l-4 border-primary-blue bg-primary-blue-light/50 backdrop-blur-sm">
      <CardHeader className="pb-3 sm:pb-4">
        <CardTitle as="h2" className="text-lg sm:text-xl font-bold text-primary-blue-dark">
          {CATEGORY_TITLES[activeCategory] ??"🔗 Calculadoras Relacionadas"}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 gap-3 sm:gap-4 md:grid-cols-2 lg:grid-cols-3">
          {displayCalculators.map((calculator) => (
            <Link
              key={calculator.id}
              to={calculator.href}
              prefetch="intent"
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
                    className={`inline-flex items-center gap-1.5 text-xs sm:text-sm ${calculator.buttonColor} ${calculator.buttonHoverColor} rounded-lg px-3 py-2 text-gray-900 transition-all duration-300 group-hover:shadow-md font-medium min-h-[36px]`}
                  >
                    <span>Acessar</span>
                    <svg
                      className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-0.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                      aria-hidden="true"
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
            </Link>
          ))}
        </div>

        <div className="mt-5 sm:mt-6 rounded-xl border border-primary-blue/30 bg-primary-blue/10 p-3 sm:p-4">
          <p className="mb-0 text-center text-xs sm:text-sm text-primary-blue-dark">
            💡 <strong>Dica:</strong> {CATEGORY_TIPS[activeCategory] ?? "Explore outras calculadoras úteis para suas necessidades"}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

export default RelatedCalculators;
