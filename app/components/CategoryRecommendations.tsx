import { Card, CardHeader, CardTitle, CardContent } from "~/components/ui";

interface Category {
  id: string;
  name: string;
  icon: string;
  description: string;
  href: string;
  color: string;
}

interface CategoryRecommendationsProps {
  currentCategory?: string;
}

const CATEGORIES: Category[] = [
  {
    id: "matematica",
    name: "Matemática",
    icon: "🧮",
    description: "Cálculos matemáticos essenciais para estudos e dia a dia",
    href: "/calculadoras/matematica",
    color: "text-primary-blue-dark",
  },
  {
    id: "financas",
    name: "Finanças",
    icon: "💰",
    description: "Planejamento financeiro e cálculos de investimentos",
    href: "/calculadoras/financas",
    color: "text-growth-green",
  },
  {
    id: "saude",
    name: "Saúde",
    icon: "🏥",
    description: "Monitoramento de indicadores de saúde e bem-estar",
    href: "/calculadoras/saude",
    color: "text-system-error-dark",
  },
  {
    id: "trabalhista",
    name: "Trabalhista",
    icon: "⚖️",
    description: "Direitos trabalhistas e cálculos de rescisão",
    href: "/calculadoras/trabalhista",
    color: "text-system-warning",
  },
];

export function CategoryRecommendations({ currentCategory }: CategoryRecommendationsProps) {
  const recommendedCategories = CATEGORIES.filter((category) => category.id !== currentCategory);

  return (
    <Card className="border border-neutral-surface-variant bg-gradient-to-r from-neutral-surface/30 to-background-dark-secondary duration-300">
      <CardHeader>
        <CardTitle as="h2" className="text-center text-xl font-bold text-text-primary">
          🔍 Explore Outras Categorias
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {recommendedCategories.map((category) => (
            <a
              key={category.id}
              href={category.href}
              className="bg-background group block rounded-lg border border-neutral-surface-variant p-4 transition-all duration-300 hover:border-primary-blue/30 hover:bg-background-dark-secondary hover:shadow-md"
            >
              <div className="space-y-3 text-center">
                <div className="text-4xl transition-transform duration-300 group-hover:scale-110">
                  {category.icon}
                </div>
                <h3
                  className={`font-semibold ${category.color} transition-colors group-hover:text-primary-blue-dark`}
                >
                  {category.name}
                </h3>
                <p className="text-sm text-text-secondary transition-colors group-hover:text-text-primary">
                  {category.description}
                </p>
              </div>
            </a>
          ))}
        </div>

        <div className="mt-6 text-center">
          <p className="text-sm text-text-secondary">
            💡 <strong>Dica:</strong> Combine calculadoras de diferentes categorias para análises
            mais completas!
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
