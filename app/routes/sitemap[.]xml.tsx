import type { LoaderFunctionArgs } from "@remix-run/node";
import { APP_URL, CATEGORIES, CALCULATORS } from "~/lib/constants";
import { CALCULATOR_SEO_DATA } from "~/lib/calculator-seo";
// Datas reais da última alteração de cada página, geradas por `npm run sitemap:lastmod`.
// O Google ignora lastmod que muda a cada requisição; sem data conhecida, a tag é omitida.
import LASTMOD from "~/data/sitemap-lastmod.json";

const lastmodOf = (path: string): string | undefined =>
  (LASTMOD as Record<string, string | undefined>)[path];

interface SitemapURL {
  loc: string;
  lastmod?: string;
  changefreq: string;
  priority: number;
}

function buildSitemapURLs(): SitemapURL[] {
  const urls: SitemapURL[] = [];

  urls.push({ loc: APP_URL, lastmod: lastmodOf("/"), changefreq: "weekly", priority: 1.0 });
  urls.push({
    loc: `${APP_URL}/calculadoras`,
    lastmod: lastmodOf("/calculadoras"),
    changefreq: "weekly",
    priority: 0.9,
  });

  for (const cat of CATEGORIES) {
    urls.push({
      loc: `${APP_URL}${cat.path}`,
      lastmod: lastmodOf(cat.path),
      changefreq: "weekly",
      priority: 0.9,
    });
  }

  for (const calc of CALCULATORS) {
    const seo = CALCULATOR_SEO_DATA[calc.id];
    urls.push({
      loc: `${APP_URL}${calc.path}`,
      lastmod: lastmodOf(calc.path),
      changefreq: seo?.changeFreq ?? "monthly",
      priority: seo?.priority ?? 0.7,
    });
  }

  for (const path of ["/sobre", "/privacidade", "/termos-de-uso"]) {
    urls.push({
      loc: `${APP_URL}${path}`,
      lastmod: lastmodOf(path),
      changefreq: "yearly",
      priority: 0.3,
    });
  }

  return urls;
}

function renderSitemapXML(urls: SitemapURL[]): string {
  const items = urls
    .map(
      (u) => `  <url>
    <loc>${u.loc}</loc>${u.lastmod ? `\n    <lastmod>${u.lastmod}</lastmod>` : ""}
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
