import { Link } from "@remix-run/react";

interface QuickAccessCardProps {
  title: string;
  description: string;
  icon: string;
  href: string;
  category: "financas" | "saude" | "matematica" | "trabalhista" | "ferramentas" | "astrologia";
  isPopular?: boolean;
  complexity?: "basic" | "intermediate" | "advanced";
}

const CATEGORY_STYLES = {
  financas: {
    gradient: "from-finance-gold/10 to-finance-gold/5",
    border: "border-finance-gold/20",
    iconBg: "bg-finance-gold",
    textAccent: "text-finance-gold-dark",
    hoverShadow: "hover:shadow-finance-gold/25",
  },
  saude: {
    gradient: "from-health-red/10 to-health-red/5",
    border: "border-health-red/20", 
    iconBg: "bg-health-red",
    textAccent: "text-health-red-dark",
    hoverShadow: "hover:shadow-health-red/25",
  },
  matematica: {
    gradient: "from-math-purple/10 to-math-purple/5",
    border: "border-math-purple/20",
    iconBg: "bg-math-purple", 
    textAccent: "text-math-purple-dark",
    hoverShadow: "hover:shadow-math-purple/25",
  },
  trabalhista: {
    gradient: "from-primary-blue/10 to-primary-blue/5", 
    border: "border-primary-blue/20",
    iconBg: "bg-primary-blue",
    textAccent: "text-primary-blue-dark",
    hoverShadow: "hover:shadow-primary-blue/25",
  },
  ferramentas: {
    gradient: "from-system-info/10 to-system-info/5",
    border: "border-system-info/20",
    iconBg: "bg-system-info",
    textAccent: "text-system-info-dark",
    hoverShadow: "hover:shadow-system-info/25",
  },
  astrologia: {
    gradient: "from-math-purple/10 to-math-purple/5",
    border: "border-math-purple/20",
    iconBg: "bg-math-purple",
    textAccent: "text-math-purple-dark",
    hoverShadow: "hover:shadow-math-purple/25",
  },
} as const;

const COMPLEXITY_COLORS = {
  basic: "bg-system-success text-system-success-dark",
  intermediate: "bg-system-warning text-system-warning-dark", 
  advanced: "bg-system-error text-system-error-dark",
} as const;

export default function QuickAccessCard({
  title,
  description,
  icon,
  href,
  category,
  isPopular = false,
  complexity,
}: QuickAccessCardProps) {
  const styles = CATEGORY_STYLES[category];
  
  return (
    <Link
      to={href}
      className={`group relative block rounded-xl bg-gradient-to-br ${styles.gradient} border ${styles.border} p-6 transition-all duration-300 hover:scale-105 ${styles.hoverShadow} hover:shadow-xl`}
    >
      {/* Popular Badge */}
      {isPopular && (
        <div className="absolute -top-3 -right-3 rounded-full bg-system-success px-3 py-1 text-xs font-semibold text-white shadow-lg">
          ⭐ Popular
        </div>
      )}
      
      {/* Complexity Badge */}
      {complexity && (
        <div className={`absolute top-3 left-3 rounded-full px-2 py-1 text-xs font-medium ${COMPLEXITY_COLORS[complexity]}`}>
          {complexity === 'basic' && '●'}
          {complexity === 'intermediate' && '●●'}
          {complexity === 'advanced' && '●●●'}
        </div>
      )}
      
      <div className="flex items-start space-x-4">
        {/* Icon */}
        <div className={`flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl ${styles.iconBg} text-white transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3`}>
          <span className="text-xl">{icon}</span>
        </div>
        
        <div className="flex-1 min-w-0">
          {/* Title */}
          <h3 className="text-lg font-bold text-text-primary group-hover:text-opacity-80 transition-colors duration-300">
            {title}
          </h3>
          
          {/* Description */}
          <p className="mt-2 text-sm text-text-secondary line-clamp-3 group-hover:text-opacity-80">
            {description}
          </p>
          
          {/* Call to action */}
          <div className={`mt-3 flex items-center text-sm font-semibold ${styles.textAccent} group-hover:translate-x-1 transition-transform duration-300`}>
            Usar calculadora
            <svg className="ml-1 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </div>
    </Link>
  );
}