import type { MetaDescriptor } from "@remix-run/node";
import { APP_NAME, APP_URL } from "~/lib/constants";
import type { CalculatorSEOData } from "~/lib/calculator-seo";
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
 * Meta tags e JSON-LD (WebApplication, BreadcrumbList e FAQPage) padrão das páginas de
 * calculadoras de apostas. O canonical usa `tagName: "link"`, sem o qual o Remix gera um
 * <meta rel="canonical"> inválido.
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
  // Imagem gerada por `npm run og:pages` (public/og/<id>.jpg)
  const ogImage = seo.ogImage ?? `${APP_URL}/og/${seo.id}.jpg`;

  return [
    { title: seo.title },
    { name: "description", content: seo.description },
    { name: "keywords", content: seo.keywords },
    {
      name: "robots",
      content: "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1",
    },
    { name: "author", content: APP_NAME },
    { property: "og:title", content: ogTitle },
    { property: "og:description", content: seo.description },
    { property: "og:type", content: "website" },
    { property: "og:url", content: url },
    { property: "og:image", content: ogImage },
    { property: "og:image:width", content: "1200" },
    { property: "og:image:height", content: "630" },
    { property: "og:image:alt", content: imageAlt },
    { property: "og:site_name", content: APP_NAME },
    { property: "og:locale", content: "pt_BR" },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: twitterTitle },
    { name: "twitter:description", content: seo.description },
    { name: "twitter:image", content: ogImage },
    { tagName: "link", rel: "canonical", href: url },
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
