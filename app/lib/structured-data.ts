import { APP_URL, CALCULATORS, CATEGORIES } from "~/lib/constants";

export interface StructuredDataConfig {
  website: {
    name: string;
    description: string;
    url: string;
    author: string;
    logo: string;
    sameAs: string[];
  };
  calculators: typeof CALCULATORS;
  categories: typeof CATEGORIES;
}

const STRUCTURED_DATA_CONFIG: StructuredDataConfig = {
  website: {
    name: "CalculadoraOnlineBR",
    description:
      "Calculadoras online gratuitas para facilitar seu dia a dia - saúde, finanças e matemática",
    url: APP_URL,
    author: "CalculadoraOnlineBR",
    logo: `${APP_URL}/android-chrome-512x512.webp`,
    sameAs: [
      "https://facebook.com/calculadoraonlinebr",
      "https://twitter.com/calculadorabr",
      "https://instagram.com/calculadoraonlinebr",
    ],
  },
  calculators: CALCULATORS,
  categories: CATEGORIES,
};

export function generateWebsiteStructuredData() {
  const config = STRUCTURED_DATA_CONFIG.website;

  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: config.name,
    description: config.description,
    url: config.url,
    author: {
      "@type": "Organization",
      name: config.author,
    },
    publisher: {
      "@type": "Organization",
      name: config.author,
      logo: {
        "@type": "ImageObject",
        url: config.logo,
      },
    },
    sameAs: config.sameAs,
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${config.url}/search?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
    mainEntity: {
      "@type": "ItemList",
      name: "Calculadoras Online Gratuitas",
      description: "Lista completa de calculadoras online para saúde, finanças e matemática",
      numberOfItems: CALCULATORS.length,
      itemListElement: CALCULATORS.map((calc, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "SoftwareApplication",
          name: calc.name,
          description: calc.description,
          url: `${config.url}${calc.path}`,
          applicationCategory: getApplicationCategory(calc.category),
          operatingSystem: "Web Browser",
          offers: {
            "@type": "Offer",
            price: "0",
            priceCurrency: "BRL",
            availability: "https://schema.org/InStock",
          },
        },
      })),
    },
  };
}

export function generateCalculatorStructuredData(calculatorId: string) {
  const calculator = CALCULATORS.find((calc) => calc.id === calculatorId);
  if (!calculator) return null;

  const config = STRUCTURED_DATA_CONFIG.website;

  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: calculator.name,
    description: calculator.description,
    url: `${config.url}${calculator.path}`,
    applicationCategory: getApplicationCategory(calculator.category),
    operatingSystem: "Web Browser",
    browserRequirements: "Requires JavaScript",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "BRL",
      availability: "https://schema.org/InStock",
      validFrom: "2024-01-01",
    },
    author: {
      "@type": "Organization",
      name: config.author,
      url: config.url,
    },
    publisher: {
      "@type": "Organization",
      name: config.author,
      logo: {
        "@type": "ImageObject",
        url: config.logo,
      },
    },
    featureList: getCalculatorFeatures(calculator.category),
    screenshot: `${config.url}/screenshots/${calculator.id}.png`,
    applicationSubCategory: getCategoryName(calculator.category),
    isAccessibleForFree: true,
    availableLanguage: "pt-BR",
  };
}

export function generateCategoryStructuredData(categoryId: string) {
  const category = CATEGORIES.find((cat) => cat.id === categoryId);
  if (!category) return null;

  const categoryCalculators = CALCULATORS.filter((calc) => calc.category === categoryId);
  const config = STRUCTURED_DATA_CONFIG.website;

  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: `Calculadoras de ${category.name}`,
    description: category.description,
    url: `${config.url}${category.path}`,
    author: {
      "@type": "Organization",
      name: config.author,
    },
    mainEntity: {
      "@type": "ItemList",
      name: `Calculadoras de ${category.name}`,
      description: category.description,
      numberOfItems: categoryCalculators.length,
      itemListElement: categoryCalculators.map((calc, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "SoftwareApplication",
          name: calc.name,
          description: calc.description,
          url: `${config.url}${calc.path}`,
          applicationCategory: getApplicationCategory(calc.category),
        },
      })),
    },
  };
}

function getApplicationCategory(category: string): string {
  const categories = {
    saude: "HealthApplication",
    financas: "FinanceApplication",
    matematica: "EducationalApplication",
    apostas: "FinanceApplication",
  };
  return categories[category as keyof typeof categories] || "UtilitiesApplication";
}

function getCategoryName(category: string): string {
  const names = {
    saude: "Calculadoras de Saúde",
    financas: "Calculadoras Financeiras",
    matematica: "Calculadoras Matemáticas",
  };
  return names[category as keyof typeof names] || "Calculadoras";
}

function getCalculatorFeatures(category: string): string[] {
  const features = {
    saude: [
      "Cálculos confiáveis de saúde",
      "Interface intuitiva",
      "Resultados instantâneos",
      "Métodos cientificamente validados",
      "Gratuito e sem cadastro",
    ],
    financas: [
      "Simulações financeiras completas",
      "Cálculo de impostos automático",
      "Comparação de investimentos",
      "Gráficos e tabelas detalhadas",
      "Indexadores econômicos atualizados",
    ],
    matematica: [
      "Resolução passo a passo",
      "Fórmulas explicadas",
      "Múltiplos métodos de cálculo",
      "Visualizações gráficas",
      "Aplicações práticas",
    ],
  };
  return (
    features[category as keyof typeof features] || [
      "Cálculos confiáveis",
      "Interface amigável",
      "Gratuito",
    ]
  );
}

export type CategoryPageId =
  | "saude"
  | "financas"
  | "matematica"
  | "trabalhista"
  | "ferramentas"
  | "astrologia"
  | "datas"
  | "loterias"
  | "apostas";

/**
 * Gera o grafo JSON-LD para uma página de categoria.
 * Substitui scripts inline em datas/astrologia/loterias com um @graph
 * contendo WebSite (com SearchAction), CollectionPage (com ItemList de
 * SoftwareApplications registradas) e BreadcrumbList.
 */
export function generateCategoryPageGraph(categoryId: CategoryPageId): object | null {
  const category = CATEGORIES.find((c) => c.id === categoryId);
  if (!category) return null;

  const config = STRUCTURED_DATA_CONFIG.website;
  const url = `${APP_URL}${category.path}`;
  const categoryCalculators = CALCULATORS.filter((calc) => calc.category === categoryId);

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${APP_URL}/#website`,
        url: `${APP_URL}/`,
        name: config.name,
        description: config.description,
        inLanguage: "pt-BR",
        potentialAction: {
          "@type": "SearchAction",
          target: `${APP_URL}/search?q={search_term_string}`,
          "query-input": "required name=search_term_string",
        },
      },
      {
        "@type": "CollectionPage",
        "@id": `${url}#webpage`,
        url,
        name: `Calculadoras de ${category.name}`,
        description: category.description,
        inLanguage: "pt-BR",
        isPartOf: { "@id": `${APP_URL}/#website` },
        breadcrumb: { "@id": `${url}#breadcrumb` },
        mainEntity: {
          "@type": "ItemList",
          name: `Calculadoras de ${category.name}`,
          description: category.description,
          numberOfItems: categoryCalculators.length,
          itemListElement: categoryCalculators.map((calc) => ({
            "@type": "SoftwareApplication",
            name: calc.name,
            description: calc.description,
            url: `${APP_URL}${calc.path}`,
            applicationCategory: getApplicationCategory(calc.category),
            operatingSystem: "Web",
            isAccessibleForFree: true,
          })),
        },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${url}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Início", item: `${APP_URL}/` },
          {
            "@type": "ListItem",
            position: 2,
            name: "Calculadoras",
            item: `${APP_URL}/calculadoras`,
          },
          { "@type": "ListItem", position: 3, name: category.name, item: url },
        ],
      },
    ],
  };
}

export function generateBreadcrumbStructuredData(
  breadcrumbs: Array<{ name: string; url: string }>
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: breadcrumbs.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "WebPage",
        "@id": crumb.url,
        name: crumb.name,
        url: crumb.url,
      },
    })),
  };
}

export function generateFAQStructuredData(faqs: Array<{ question: string; answer: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export default STRUCTURED_DATA_CONFIG;
