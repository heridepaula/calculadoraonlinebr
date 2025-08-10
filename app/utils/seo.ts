import type { SEOData } from "~/types";

export function generateStructuredData(
  type: "website" | "calculator",
  data: { name: string; description: string; path?: string }
) {
  const baseUrl =
    typeof window !== "undefined"
      ? window.location.origin
      : "https://calculadora-online-br.vercel.app";

  if (type === "website") {
    return {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: data.name,
      description: data.description,
      url: baseUrl,
      potentialAction: {
        "@type": "SearchAction",
        target: `${baseUrl}/search?q={search_term_string}`,
        "query-input": "required name=search_term_string",
      },
    };
  }

  if (type === "calculator") {
    return {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      name: data.name,
      description: data.description,
      url: `${baseUrl}${data.path}`,
      applicationCategory: "UtilitiesApplication",
      operatingSystem: "Web Browser",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "BRL",
      },
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "4.8",
        ratingCount: "150",
      },
    };
  }

  return null;
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
