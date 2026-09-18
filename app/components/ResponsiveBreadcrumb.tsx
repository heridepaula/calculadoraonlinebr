import { Link } from "@remix-run/react";

interface BreadcrumbItem {
  label: string;
  href?: string;
  isLast?: boolean;
}

interface ResponsiveBreadcrumbProps {
  items: BreadcrumbItem[];
}

const categoryMap: Record<string, string> = {
  'astrologia': 'Astrologia',
  'datas': 'Datas',
  'financas': 'Finanças', 
  'matematica': 'Matemática',
  'saude': 'Saúde',
  'trabalhista': 'Trabalhista',
  'ferramentas': 'Ferramentas',
  'loterias': 'Loterias',
  'apostas': 'Apostas',
};

export function ResponsiveBreadcrumb({ items }: ResponsiveBreadcrumbProps) {
  return (
    <div className="border-border-primary bg-surface-light border-b px-3 sm:px-6 py-3 sm:py-4">
      <div className="mx-auto max-w-7xl">
        <nav aria-label="Navegação estrutural" className="flex items-center">
          {/* Mobile: Show only current page with home icon */}
          <div className="flex items-center sm:hidden">
            <Link 
              to="/" 
              className="flex h-8 w-8 items-center justify-center rounded-lg text-text-secondary hover:bg-surface-dark/10 hover:text-text-primary transition-colors duration-200"
              aria-label="Página inicial"
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
            </Link>
            <svg className="mx-2 h-3 w-3 text-text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <span className="text-sm font-medium text-text-primary truncate">
              {items[items.length - 1]?.label}
            </span>
          </div>

          {/* Desktop: Show full breadcrumb */}
          <ol className="hidden sm:flex items-center space-x-1 md:space-x-2 text-sm">
            {items.map((item, index) => (
              <li key={index} className="flex items-center">
                {item.href && !item.isLast ? (
                  <Link
                    to={item.href}
                    className="flex items-center px-2 py-1.5 rounded-md text-text-secondary hover:text-text-primary hover:bg-surface-dark/5 transition-colors duration-200 min-h-[36px]"
                  >
                    <span className="truncate max-w-[100px] lg:max-w-[200px]">
                      {item.label}
                    </span>
                  </Link>
                ) : (
                  <span className="flex items-center px-2 py-1.5 min-h-[36px]">
                    <span className={`truncate max-w-[120px] lg:max-w-[250px] ${
                      item.isLast 
                        ? "font-medium text-text-primary" 
                        : "text-text-secondary"
                    }`}>
                      {item.label}
                    </span>
                  </span>
                )}
                
                {!item.isLast && (
                  <svg className="mx-1 md:mx-2 h-4 w-4 text-text-secondary flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                )}
              </li>
            ))}
          </ol>
        </nav>
      </div>
    </div>
  );
}

// Helper function to create breadcrumb items for category pages
export function createCategoryBreadcrumb(category: string): BreadcrumbItem[] {
  return [
    { label: "Início", href: "/" },
    { label: "Calculadoras", href: "/calculadoras" },
    { label: categoryMap[category] || category, isLast: true }
  ];
}

// Helper function to create breadcrumb items for calculator pages  
export function createCalculatorBreadcrumb(
  category: string, 
  calculatorName: string,
  calculatorPath?: string
): BreadcrumbItem[] {
  return [
    { label: "Início", href: "/" },
    { label: "Calculadoras", href: "/calculadoras" },
    { label: categoryMap[category] || category, href: `/calculadoras/${category}` },
    { label: calculatorName, href: calculatorPath, isLast: true }
  ];
}