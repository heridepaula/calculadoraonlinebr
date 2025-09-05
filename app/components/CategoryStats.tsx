interface CategoryStatsProps {
  category: "financas" | "saude" | "matematica" | "trabalhista" | "ferramentas" | "astrologia" | "datas";
  stats: Array<{
    icon: string;
    number: string;
    label: string;
    description?: string;
  }>;
}

const CATEGORY_COLORS = {
  financas: {
    bg: "from-finance-gold/20 to-finance-gold/10",
    text: "text-finance-gold-dark",
    accent: "bg-finance-gold/30",
  },
  saude: {
    bg: "from-health-red/20 to-health-red/10", 
    text: "text-health-red-dark",
    accent: "bg-health-red/30",
  },
  matematica: {
    bg: "from-math-purple/20 to-math-purple/10",
    text: "text-math-purple-dark", 
    accent: "bg-math-purple/30",
  },
  trabalhista: {
    bg: "from-primary-blue/20 to-primary-blue/10",
    text: "text-primary-blue-dark",
    accent: "bg-primary-blue/30",
  },
  ferramentas: {
    bg: "from-system-info/20 to-system-info/10",
    text: "text-system-info-dark",
    accent: "bg-system-info/30",
  },
  astrologia: {
    bg: "from-math-purple/20 to-math-purple/10",
    text: "text-math-purple-dark",
    accent: "bg-math-purple/30",
  },
  datas: {
    bg: "from-system-info/20 to-system-info/10",
    text: "text-system-info-dark",
    accent: "bg-system-info/30",
  },
} as const;

export default function CategoryStats({ category, stats }: CategoryStatsProps) {
  const colors = CATEGORY_COLORS[category];
  
  return (
    <section className="bg-surface-dark/30 py-12">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <div
              key={index}
              className={`group rounded-2xl bg-gradient-to-br ${colors.bg} p-6 text-center backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:shadow-xl`}
              style={{
                animationDelay: `${index * 0.1}s`
              }}
            >
              {/* Icon */}
              <div className={`mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl ${colors.accent} transition-transform duration-300 group-hover:scale-110`}>
                <span className="text-2xl">{stat.icon}</span>
              </div>
              
              {/* Number */}
              <div className={`text-3xl font-bold ${colors.text} tabular-nums`}>
                {stat.number}
              </div>
              
              {/* Label */}
              <div className="mt-2 text-sm font-semibold text-text-primary">
                {stat.label}
              </div>
              
              {/* Description (optional) */}
              {stat.description && (
                <div className="mt-2 text-xs text-text-secondary opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {stat.description}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}