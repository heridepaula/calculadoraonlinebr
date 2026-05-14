import type { LoaderFunctionArgs } from "@remix-run/node";
import { APP_URL, CATEGORIES, CALCULATORS } from "~/lib/constants";
import { CALCULATOR_SEO_DATA } from "~/lib/calculator-seo";

interface SitemapURL {
  loc: string;
  lastmod: string;
  changefreq: string;
  priority: number;
}

function buildSitemapURLs(): SitemapURL[] {
  const lastmod = new Date().toISOString().split("T")[0];
  const urls: SitemapURL[] = [];

  urls.push({ loc: APP_URL, lastmod, changefreq: "weekly", priority: 1.0 });
  urls.push({ loc: `${APP_URL}/calculadoras`, lastmod, changefreq: "weekly", priority: 0.9 });

  for (const cat of CATEGORIES) {
    urls.push({
      loc: `${APP_URL}${cat.path}`,
      lastmod,
      changefreq: "weekly",
      priority: 0.9,
    });
  }

  for (const calc of CALCULATORS) {
    const seo = CALCULATOR_SEO_DATA[calc.id];
    urls.push({
      loc: `${APP_URL}${calc.path}`,
      lastmod,
      changefreq: seo?.changeFreq ?? "monthly",
      priority: seo?.priority ?? 0.7,
    });
  }

  for (const path of ["/sobre", "/privacidade", "/termos-de-uso"]) {
    urls.push({ loc: `${APP_URL}${path}`, lastmod, changefreq: "yearly", priority: 0.3 });
  }

  return urls;
}

function renderSitemapXML(urls: SitemapURL[]): string {
  const items = urls
    .map(
      (u) => `  <url>
    <loc>${u.loc}</loc>
    <lastmod>${u.lastmod}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority.toFixed(1)}</priority>
  </url>`,
    )
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${items}
</urlset>`;
}

export const loader = ({ request: _request }: LoaderFunctionArgs) => {
  const urls = buildSitemapURLs();
  const xml = renderSitemapXML(urls);

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
};
