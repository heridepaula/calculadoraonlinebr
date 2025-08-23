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
    <Card className="group relative overflow-hidden transition-all duration-300 hover:scale-[1.01] hover:shadow-2xl border-0">
      {/* Background Pattern */}
      <div className={`absolute inset-0 bg-gradient-to-br ${colors.bgGradient}`}></div>
      
      {/* Subtle accent border */}
      <div className={`absolute inset-0 rounded-lg border-2 ${colors.iconBg}/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>

      <CardContent className="relative p-4 sm:p-5 lg:p-6 h-full flex flex-col">
        {/* Header Section - Improved Mobile Layout */}
        <div className="mb-3 sm:mb-4 flex items-start gap-3 sm:gap-4">
          <div
            className={`flex h-12 w-12 sm:h-14 sm:w-14 lg:h-16 lg:w-16 items-center justify-center rounded-xl sm:rounded-2xl ${colors.iconBg} transition-all duration-300 ${colors.iconBgHover} group-hover:rotate-3 group-hover:scale-105 flex-shrink-0`}
          >
            <span
              className="text-xl sm:text-2xl lg:text-3xl transition-all duration-300 group-hover:scale-105"
              role="img"
              aria-label={category.name}
            >
              {category.icon}
            </span>
          </div>
          <div className="min-w-0 flex-1">
            <h2 className="text-lg sm:text-xl font-bold text-text-primary-dark leading-tight">{category.name}</h2>
            <p className={`text-xs font-medium ${colors.accentText} uppercase tracking-wider mt-0.5`}>
              Categoria
            </p>
          </div>
        </div>

        {/* Description - Better Typography */}
        <p className="mb-4 sm:mb-5 lg:mb-6 text-sm sm:text-base leading-relaxed text-text-secondary-dark flex-grow">
          {category.description}
        </p>

        {/* Prominent Call-to-Action Button - Enhanced Mobile UX */}
        <Link to={category.path} className="block w-full">
          <div
            className={`group/btn relative overflow-hidden rounded-xl bg-gradient-to-r ${colors.buttonGradient} p-3 sm:p-4 text-center shadow-lg transition-all duration-300 hover:shadow-xl ${colors.buttonHover} hover:-translate-y-0.5 hover:scale-[1.01] active:scale-[0.99] min-h-[48px] flex items-center justify-center`}
          >
            {/* Enhanced button background animation */}
            <div
              className={`absolute inset-0 bg-gradient-to-r ${colors.buttonGradient} opacity-0 transition-opacity duration-300 group-hover/btn:opacity-20`}
            ></div>

            <div className="relative flex items-center justify-center gap-2">
              <span className="font-bold text-white text-sm sm:text-base">Explorar Calculadoras</span>
              <svg
                className="h-4 w-4 sm:h-5 sm:w-5 text-white transition-transform duration-300 group-hover/btn:translate-x-1 group-hover/btn:scale-110"
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
        </Link>

        {/* Feature Badges - Responsive Layout */}
        <div className="mt-3 sm:mt-4 flex flex-wrap justify-center gap-2">
          <span className="inline-flex items-center rounded-full bg-system-success/20 px-2.5 py-1 text-xs font-medium text-system-success">
            ✓ Gratuito
          </span>
          <span
            className={`inline-flex items-center rounded-full ${colors.badgeBg} px-2.5 py-1 text-xs font-medium ${colors.badgeText}`}
          >
            ⚡ Rápido
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
