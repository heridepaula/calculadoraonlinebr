import { ReactNode } from "react";

interface CategoryHeroProps {
  category: "financas" | "saude" | "matematica" | "trabalhista" | "ferramentas" | "astrologia" | "datas";
  title: string;
  subtitle: string;
  description: string;
  badge: {
    icon: string;
    text: string;
  };
  trustIndicators: Array<{
    color: string;
    text: string;
  }>;
  children?: ReactNode;
}

const CATEGORY_STYLES = {
  financas: {
    gradient: "from-finance-gold/5 via-surface to-surface-dark",
    radial: "from-finance-gold/10",
    badgeRing: "ring-finance-gold/20",
    badgeBg: "bg-finance-gold/10",
    badgeText: "text-finance-gold-dark",
    textGradient: "from-finance-gold-dark via-finance-gold to-finance-gold-light",
    highlightColor: "text-finance-gold-dark",
  },
  saude: {
    gradient: "from-health-red/5 via-surface to-surface-dark", 
    radial: "from-health-red/10",
    badgeRing: "ring-health-red/20",
    badgeBg: "bg-health-red/10",
    badgeText: "text-health-red-dark",
    textGradient: "from-health-red-dark via-health-red to-health-red-light",
    highlightColor: "text-health-red-dark",
  },
  matematica: {
    gradient: "from-math-purple/5 via-surface to-surface-dark",
    radial: "from-math-purple/10", 
    badgeRing: "ring-math-purple/20",
    badgeBg: "bg-math-purple/10",
    badgeText: "text-math-purple-dark",
    textGradient: "from-math-purple-dark via-math-purple to-math-purple-light",
    highlightColor: "text-math-purple-dark",
  },
  trabalhista: {
    gradient: "from-primary-blue/5 via-surface to-surface-dark",
    radial: "from-primary-blue/10",
    badgeRing: "ring-primary-blue/20", 
    badgeBg: "bg-primary-blue/10",
    badgeText: "text-primary-blue-dark",
    textGradient: "from-primary-blue-dark via-primary-blue to-primary-blue-light",
    highlightColor: "text-primary-blue-dark",
  },
  ferramentas: {
    gradient: "from-system-info/5 via-surface to-surface-dark",
    radial: "from-system-info/10",
    badgeRing: "ring-system-info/20",
    badgeBg: "bg-system-info/10",
    badgeText: "text-system-info-dark",
    textGradient: "from-system-info-dark via-system-info to-system-info-light",
    highlightColor: "text-system-info-dark",
  },
  astrologia: {
    gradient: "from-math-purple/5 via-surface to-surface-dark",
    radial: "from-math-purple/10",
    badgeRing: "ring-math-purple/20",
    badgeBg: "bg-math-purple/10",
    badgeText: "text-math-purple-dark",
    textGradient: "from-math-purple-dark via-math-purple to-math-purple-light",
    highlightColor: "text-math-purple-dark",
  },
  datas: {
    gradient: "from-primary-blue/5 via-surface to-surface-dark",
    radial: "from-primary-blue/10",
    badgeRing: "ring-primary-blue/20",
    badgeBg: "bg-primary-blue/10",
    badgeText: "text-primary-blue-dark",
    textGradient: "from-primary-blue-dark via-primary-blue to-primary-blue-light",
    highlightColor: "text-primary-blue-dark",
  },
} as const;

function getSubtitleColor(category: "financas" | "saude" | "matematica" | "trabalhista" | "ferramentas" | "astrologia" | "datas"): string {
  switch (category) {
    case "financas":
      return "text-finance-gold";
    case "saude":
      return "text-health-red";
    case "matematica":
      return "text-math-purple";
    case "trabalhista":
      return "text-primary-blue";
    case "ferramentas":
      return "text-system-info";
    case "astrologia":
      return "text-math-purple";
    case "datas":
      return "text-primary-blue";
    default:
      return "text-primary-blue";
  }
}

export default function CategoryHero({
  category,
  title,
  subtitle,
  description,
  badge,
  trustIndicators,
  children
}: CategoryHeroProps) {
  const styles = CATEGORY_STYLES[category];
  
  return (
    <section className={`relative overflow-hidden bg-gradient-to-br ${styles.gradient}`}>
      <div className={`absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] ${styles.radial} via-transparent to-transparent`}></div>
      
      <div className="relative mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="text-center">
          {/* Badge */}
          <div className={`mb-8 inline-flex items-center rounded-full ${styles.badgeBg} px-4 py-2 text-sm font-medium ${styles.badgeText} ring-1 ring-inset ${styles.badgeRing} transform hover:scale-105 transition-transform duration-300`}>
            <span className="mr-2">{badge.icon}</span>
            {badge.text}
          </div>
          
          {/* Title */}
          <h1 className="mx-auto max-w-4xl text-4xl font-bold tracking-tight text-text-primary sm:text-5xl lg:text-6xl">
            {title}{" "}
            <span className={`block font-extrabold ${getSubtitleColor(category)} drop-shadow-md`}>
              {subtitle}
            </span>
          </h1>
          
          {/* Description */}
          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-text-secondary-dark sm:text-xl">
            {description.split(' ').map((word, index) => {
              if (word.includes('**')) {
                const cleanWord = word.replace(/\*\*/g, '');
                return (
                  <strong key={index} className={`${styles.highlightColor}`}>
                    {cleanWord}{' '}
                  </strong>
                );
              }
              return word + ' ';
            })}
          </p>
          
          {/* Trust Indicators */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4 text-sm text-text-secondary">
            {trustIndicators.map((indicator, index) => (
              <div key={index} className="flex items-center gap-2 animate-fade-in" style={{animationDelay: `${index * 0.1}s`}}>
                <div className={`h-2 w-2 rounded-full ${indicator.color} animate-pulse`}></div>
                <span className="font-medium">{indicator.text}</span>
              </div>
            ))}
          </div>

          {/* Children (CTA buttons, etc) */}
          {children && (
            <div className="mt-8">
              {children}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}