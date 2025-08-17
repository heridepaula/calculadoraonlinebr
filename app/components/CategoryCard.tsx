import { Link } from "@remix-run/react";
import { Card, CardContent } from "~/components/ui";
import type { Category } from "~/types";

interface CategoryCardProps {
  category: Category;
}

const getCategoryColors = (categoryId: string) => {
  switch (categoryId) {
    case "saude":
      return {
        bgGradient: "from-transparent via-transparent to-health-red-light/20",
        iconBg: "bg-health-red",
        iconBgHover: "group-hover:bg-health-red-dark",
        accentText: "text-health-red-dark",
        buttonGradient: "from-health-red-dark to-health-red",
        buttonHover: "hover:shadow-health-red-dark/25",
        badgeBg: "bg-health-red-dark/20",
        badgeText: "text-health-red-dark",
      };
    case "financas":
      return {
        bgGradient: "from-transparent via-transparent to-finance-gold-light/20",
        iconBg: "bg-finance-gold",
        iconBgHover: "group-hover:bg-finance-gold-dark",
        accentText: "text-finance-gold-dark",
        buttonGradient: "from-finance-gold-dark to-finance-gold",
        buttonHover: "hover:shadow-finance-gold-dark/25",
        badgeBg: "bg-finance-gold-dark/20",
        badgeText: "text-finance-gold-dark",
      };
    case "matematica":
      return {
        bgGradient: "from-transparent via-transparent to-math-purple-light/20",
        iconBg: "bg-math-purple",
        iconBgHover: "group-hover:bg-math-purple-dark",
        accentText: "text-math-purple-dark",
        buttonGradient: "from-math-purple-dark to-math-purple",
        buttonHover: "hover:shadow-math-purple-dark/25",
        badgeBg: "bg-math-purple-dark/20",
        badgeText: "text-math-purple-dark",
      };
    default:
      return {
        bgGradient: "from-transparent via-transparent to-primary-blue-dark/10",
        iconBg: "bg-primary-blue-light",
        iconBgHover: "group-hover:bg-primary-blue-dark",
        accentText: "text-primary-blue-dark",
        buttonGradient: "from-primary-blue-dark to-primary-blue",
        buttonHover: "hover:shadow-primary-blue-dark/25",
        badgeBg: "bg-primary-blue-dark/20",
        badgeText: "text-primary-blue-dark",
      };
  }
};

export function CategoryCard({ category }: CategoryCardProps) {
  const colors = getCategoryColors(category.id);

  return (
    <Card className="group relative overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl">
      {/* Background Pattern */}
      <div className={`absolute inset-0 bg-gradient-to-br ${colors.bgGradient}`}></div>

      <CardContent className="relative p-6">
        {/* Header Section */}
        <div className="mb-4 flex items-center space-x-4">
          <div
            className={`flex h-16 w-16 items-center justify-center rounded-2xl ${colors.iconBg} transition-all duration-300 ${colors.iconBgHover} group-hover:rotate-6 group-hover:scale-110`}
          >
            <span
              className="text-3xl transition-all duration-300 group-hover:scale-110"
              role="img"
              aria-label={category.name}
            >
              {category.icon}
            </span>
          </div>
          <div>
            <h2 className="text-xl font-bold text-text-primary-dark">{category.name}</h2>
            <p className={`text-xs font-medium ${colors.accentText} uppercase tracking-wider`}>
              Categoria
            </p>
          </div>
        </div>

        {/* Description */}
        <p className="mb-6 text-sm leading-relaxed text-text-secondary-dark">
          {category.description}
        </p>

        {/* Prominent Call-to-Action Button */}
        <Link to={category.path} className="block w-full">
          <div
            className={`group/btn relative overflow-hidden rounded-xl bg-gradient-to-r ${colors.buttonGradient} p-4 text-center shadow-lg transition-all duration-300 hover:shadow-xl ${colors.buttonHover} hover:-translate-y-1 hover:scale-[1.02] active:scale-[0.98]`}
          >
            {/* Button background animation */}
            <div
              className={`absolute inset-0 bg-gradient-to-r ${colors.buttonGradient} opacity-0 transition-opacity duration-300 group-hover/btn:opacity-100`}
            ></div>

            <div className="relative flex items-center justify-center space-x-2">
              <span className="font-bold text-white">Explorar Calculadoras</span>
              <svg
                className="h-5 w-5 text-white transition-transform duration-300 group-hover/btn:translate-x-1 group-hover/btn:scale-110"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </div>
          </div>
        </Link>

        {/* Feature Badges */}
        <div className="mt-4 flex justify-center space-x-2">
          <span className="inline-flex items-center rounded-full bg-system-success/20 px-2 py-1 text-xs font-medium text-system-success">
            ✓ Gratuito
          </span>
          <span
            className={`inline-flex items-center rounded-full ${colors.badgeBg} px-2 py-1 text-xs font-medium ${colors.badgeText}`}
          >
            ⚡ Rápido
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
