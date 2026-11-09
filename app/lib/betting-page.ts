import type { MetaDescriptor } from "@remix-run/node";
import { APP_NAME, APP_URL } from "~/lib/constants";
import type { CalculatorSEOData } from "~/lib/calculator-seo";
import { buildCalculatorMeta } from "~/lib/page-meta";
import { generateFAQStructuredData } from "~/lib/structured-data";

export interface FAQEntry {
  question: string;
  answer: string;
}

interface BettingPageMetaOptions {
  seo: CalculatorSEOData;
  /** Nome da ferramenta no JSON-LD (WebApplication) */
  appName: string;
  /** Rótulo da página no breadcrumb */
  breadcrumbName: string;
  ogTitle: string;
  twitterTitle: string;
  imageAlt: string;
  featureList: string[];
  faq: FAQEntry[];
}

/**
 * Meta tags (via buildCalculatorMeta) e JSON-LD (WebApplication, BreadcrumbList e FAQPage)
 * padrão das páginas de calculadoras de apostas.
 */
export function buildBettingPageMeta({
  seo,
  appName,
  breadcrumbName,
  ogTitle,
  twitterTitle,
  imageAlt,
  featureList,
  faq,
}: BettingPageMetaOptions): MetaDescriptor[] {
  const url = seo.canonicalUrl;

  return [
    ...buildCalculatorMeta(seo.id, { ogTitle, twitterTitle, imageAlt }),
    {
      "script:ld+json": {
        "@context": "https://schema.org",
        "@type": "WebApplication",
        name: appName,
        url,
        description: seo.description,
        applicationCategory: "FinanceApplication",
        operatingSystem: "Web",
        inLanguage: "pt-BR",
        isAccessibleForFree: true,
        offers: { "@type": "Offer", price: "0", priceCurrency: "BRL" },
        featureList,
        publisher: { "@type": "Organization", name: APP_NAME, url: APP_URL },
      },
    },
    {
      "script:ld+json": {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Início", item: `${APP_URL}/` },
          {
            "@type": "ListItem",
            position: 2,
            name: "Calculadoras",
            item: `${APP_URL}/calculadoras`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: "Apostas",
            item: `${APP_URL}/calculadoras/apostas`,
          },
          { "@type": "ListItem", position: 4, name: breadcrumbName, item: url },
        ],
      },
    },
    { "script:ld+json": generateFAQStructuredData(faq) },
  ];
}

const FAQ_BORDER_COLORS = [
  "primary-blue",
  "growth-green",
  "system-info",
  "system-warning",
  "growth-green",
  "system-error-dark",
  "system-warning",
  "primary-blue",
] as const;

/** Aplica as cores de borda do componente FAQ em rodízio. */
export function withFaqColors(faq: FAQEntry[]) {
  return faq.map((item, index) => ({
    ...item,
    borderColor: FAQ_BORDER_COLORS[index % FAQ_BORDER_COLORS.length],
  }));
}
