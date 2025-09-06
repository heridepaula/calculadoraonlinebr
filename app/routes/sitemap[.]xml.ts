import type { LoaderFunctionArgs } from "@remix-run/node";
import { CATEGORIES, CALCULATORS, APP_URL } from "~/lib/constants";

interface SitemapRoute {
  url: string;
  changefreq: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority: string;
  lastmod?: string;
}

export async function loader({ request }: LoaderFunctionArgs) {
  const sitemap = generateSitemap();
  
  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'X-Content-Type-Options': 'nosniff',
      'Cache-Control': 'public, max-age=3600, s-maxage=86400', // 1h client, 24h CDN
    },
  });
}

function generateSitemap(): string {
  const currentDate = new Date().toISOString();
  
  // Rotas estáticas principais
  const staticRoutes: SitemapRoute[] = [
    {
      url: '',
      changefreq: 'daily',
      priority: '1.0',
      lastmod: currentDate
    },
    {
      url: '/calculadoras',
      changefreq: 'daily',
      priority: '0.7',
      lastmod: currentDate
    },
    {
      url: '/sobre',
      changefreq: 'monthly',
      priority: '0.6',
      lastmod: currentDate
    },
    {
      url: '/privacidade',
      changefreq: 'yearly',
      priority: '0.3',
      lastmod: currentDate
    },
    {
      url: '/termos-de-uso',
      changefreq: 'yearly',
      priority: '0.3',
      lastmod: currentDate
    }
  ];

  // Páginas de categoria
  const categoryRoutes: SitemapRoute[] = CATEGORIES.map(category => ({
    url: category.path,
    changefreq: 'weekly' as const,
    priority: '0.8',
    lastmod: currentDate
  }));

  // Páginas individuais das calculadoras
  const calculatorRoutes: SitemapRoute[] = CALCULATORS.map(calculator => ({
    url: calculator.path,
    changefreq: 'monthly' as const,
    priority: '0.9',
    lastmod: currentDate
  }));

  const allRoutes = [...staticRoutes, ...categoryRoutes, ...calculatorRoutes];

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allRoutes.map(route => `  <url>
    <loc>${APP_URL}${route.url}</loc>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
    <lastmod>${route.lastmod}</lastmod>
  </url>`).join('\n')}
</urlset>`;
}