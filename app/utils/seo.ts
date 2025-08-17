import type { SEOData } from "~/types";
import {
  generateWebsiteStructuredData,
  generateCalculatorStructuredData,
  generateCategoryStructuredData,
  generateBreadcrumbStructuredData,
  generateFAQStructuredData,
} from "~/lib/structured-data";

export function generateStructuredData(
  type: "website" | "calculator" | "category" | "breadcrumb" | "faq",
  data: any
) {
  switch (type) {
    case "website":
      return generateWebsiteStructuredData();

    case "calculator":
      return generateCalculatorStructuredData(data.calculatorId);

    case "category":
      return generateCategoryStructuredData(data.categoryId);

    case "breadcrumb":
      return generateBreadcrumbStructuredData(data.breadcrumbs);

    case "faq":
      return generateFAQStructuredData(data.faqs);

    default:
      return null;
  }
}

export function generateSEOTags(seoData: SEOData): Array<Record<string, string>> {
  const tags: Array<Record<string, string>> = [
    { title: seoData.title },
    { name: "description", content: seoData.description },
  ];

  if (seoData.keywords) {
    tags.push({ name: "keywords", content: seoData.keywords });
  }

  if (seoData.canonicalUrl) {
    tags.push({ rel: "canonical", href: seoData.canonicalUrl });
  }

  // Open Graph tags
  tags.push(
    { property: "og:title", content: seoData.ogTitle || seoData.title },
    { property: "og:description", content: seoData.ogDescription || seoData.description },
    { property: "og:type", content: "website" }
  );

  if (seoData.ogImage) {
    tags.push({ property: "og:image", content: seoData.ogImage });
  }

  // Twitter Card tags
  tags.push(
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: seoData.ogTitle || seoData.title },
    { name: "twitter:description", content: seoData.ogDescription || seoData.description }
  );

  if (seoData.ogImage) {
    tags.push({ name: "twitter:image", content: seoData.ogImage });
  }

  // Technical SEO tags
  tags.push(
    { name: "viewport", content: "width=device-width,initial-scale=1" },
    { name: "robots", content: "index,follow" },
    { name: "googlebot", content: "index,follow" },
    { "http-equiv": "X-UA-Compatible", content: "IE=edge" },
    { name: "format-detection", content: "telephone=no" }
  );

  return tags;
}
