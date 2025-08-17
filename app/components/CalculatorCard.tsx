import { Link } from "@remix-run/react";
import { Card, CardContent } from "~/components/ui";
import type { Calculator } from "~/types";

interface CalculatorCardProps {
  calculator: Calculator;
  category: "saude" | "financas" | "matematica";
}

const getCategoryColors = (category: string) => {
  switch (category) {
    case "saude":
      return {
        bgGradient: "from-[#7F1D1D] to-[#450A0A]",
        iconBg: "bg-health-red",
        iconColor: "text-white",
        decorativeMain: "bg-health-red/20 group-hover:bg-health-red/30",
        decorativeSecondary: "bg-health-red-light/15",
        buttonGradient: "from-health-red-dark to-health-red",
        buttonShadow: "hover:shadow-health-red/30",
        categoryBadgeBg: "bg-health-red/25",
        categoryBadgeText: "text-white",
        secondBadgeBg: "bg-white/20",
        secondBadgeText: "text-white",
        categoryIcon: "🏥",
        categoryName: "Saúde",
      };
    case "financas":
      return {
        bgGradient: "from-[#92400E] to-[#451A03]",
        iconBg: "bg-finance-gold",
        iconColor: "text-white",
        decorativeMain: "bg-finance-gold/20 group-hover:bg-finance-gold/30",
        decorativeSecondary: "bg-finance-gold-light/15",
        buttonGradient: "from-finance-gold-dark to-finance-gold",
        buttonShadow: "hover:shadow-finance-gold/30",
        categoryBadgeBg: "bg-finance-gold/25",
        categoryBadgeText: "text-white",
        secondBadgeBg: "bg-white/20",
        secondBadgeText: "text-white",
        categoryIcon: "💰",
        categoryName: "Finanças",
      };
    case "matematica":
      return {
        bgGradient: "from-[#581C87] to-[#3B0764]",
        iconBg: "bg-math-purple",
        iconColor: "text-white",
        decorativeMain: "bg-math-purple/20 group-hover:bg-math-purple/30",
        decorativeSecondary: "bg-math-purple-light/15",
        buttonGradient: "from-math-purple-dark to-math-purple",
        buttonShadow: "hover:shadow-math-purple/30",
        categoryBadgeBg: "bg-math-purple/25",
        categoryBadgeText: "text-white",
        secondBadgeBg: "bg-white/20",
        secondBadgeText: "text-white",
        categoryIcon: "🔢",
        categoryName: "Matemática",
      };
    default:
      return {
        bgGradient: "from-[#1E3A8A] to-[#1E40AF]",
        iconBg: "bg-primary-blue",
        iconColor: "text-white",
        decorativeMain: "bg-primary-blue/20 group-hover:bg-primary-blue/30",
        decorativeSecondary: "bg-primary-blue-light/15",
        buttonGradient: "from-primary-blue-dark to-primary-blue",
        buttonShadow: "hover:shadow-primary-blue/30",
        categoryBadgeBg: "bg-primary-blue/25",
        categoryBadgeText: "text-white",
        secondBadgeBg: "bg-white/20",
        secondBadgeText: "text-white",
        categoryIcon: "🧮",
        categoryName: "Calculadora",
      };
  }
};

const getCategoryIcon = (category: string) => {
  switch (category) {
    case "saude":
      return (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
        />
      );
    case "financas":
      return (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      );
    case "matematica":
      return (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
        />
      );
    default:
      return (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
        />
      );
  }
};

const getSecondBadgeContent = (category: string) => {
  switch (category) {
    case "saude":
      return "⚡ Rápido";
    case "financas":
      return "📈 Precisão";
    case "matematica":
      return "🧮 Preciso";
    default:
      return "⚡ Rápido";
  }
};

export function CalculatorCard({ calculator, category }: CalculatorCardProps) {
  const colors = getCategoryColors(category);

  return (
    <Card
      className={`group relative overflow-hidden bg-gradient-to-br ${colors.bgGradient} transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl`}
    >
      {/* Decorative Elements */}
      <div
        className={`absolute -right-4 -top-4 h-24 w-24 rounded-full ${colors.decorativeMain} transition-all duration-300 group-hover:scale-125`}
      ></div>
      <div
        className={`absolute -bottom-2 -left-2 h-16 w-16 rounded-full ${colors.decorativeSecondary} transition-all duration-300 group-hover:scale-110`}
      ></div>

      <CardContent className="relative p-6">
        {/* Header Section */}
        <div className="mb-6 flex items-start space-x-4">
          <div
            className={`flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl ${colors.iconBg} shadow-md transition-all duration-300 group-hover:rotate-6 group-hover:scale-110 group-hover:shadow-lg`}
          >
            <svg
              className={`h-6 w-6 ${colors.iconColor}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {getCategoryIcon(category)}
            </svg>
          </div>
          <div className="flex-1">
            <h2 className="mb-2 text-xl font-bold leading-tight text-white">{calculator.name}</h2>
            <p className="text-sm leading-relaxed text-white/90">{calculator.description}</p>
          </div>
        </div>

        {/* Call-to-Action Button - Smaller */}
        <div className="mt-4">
          <Link to={calculator.path} className="block w-full">
            <div
              className={`group/btn relative overflow-hidden rounded-xl bg-gradient-to-r ${colors.buttonGradient} p-3 shadow-lg transition-all duration-300 hover:shadow-xl ${colors.buttonShadow} hover:-translate-y-1 hover:scale-[1.02] active:scale-[0.98]`}
            >
              {/* Button Shine Effect */}
              <div className="absolute inset-0 -translate-x-full transform bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 transition-all duration-500 group-hover/btn:translate-x-full group-hover/btn:opacity-100"></div>

              {/* Button Content */}
              <div className="relative flex items-center justify-center space-x-2">
                <span className="text-sm font-bold text-white">Usar Calculadora</span>
                <svg
                  className="h-4 w-4 text-white transition-transform duration-300 group-hover/btn:translate-x-1"
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
        </div>

        {/* Status Badges */}
        <div className="mt-4 flex items-center justify-between">
          <span
            className={`inline-flex items-center rounded-full ${colors.categoryBadgeBg} px-3 py-1 text-xs font-medium ${colors.categoryBadgeText}`}
          >
            {colors.categoryIcon} {colors.categoryName}
          </span>
          <div className="flex space-x-2">
            <span className="inline-flex items-center rounded-full bg-system-success/20 px-2 py-1 text-xs font-medium text-system-success">
              ✓ Gratuito
            </span>
            <span
              className={`inline-flex items-center rounded-full ${colors.secondBadgeBg} px-2 py-1 text-xs font-medium ${colors.secondBadgeText}`}
            >
              {getSecondBadgeContent(category)}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
