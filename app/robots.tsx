import type { MetadataRoute } from 'next'
 
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/private/', 
          '/admin/', 
          '/_next/',
          '/api/',
          '*.json$',
        ],
      },
      {
        userAgent: 'Googlebot',
        allow: [
          '/',
          '/calculadoras/',
          '/sitemap.xml',
        ],
        crawlDelay: 1,
      },
      {
        userAgent: 'Bingbot',
        allow: [
          '/',
          '/calculadoras/',
          '/sitemap.xml',
        ],
        crawlDelay: 2,
      },
      {
        userAgent: 'Applebot',
        allow: '/',
        crawlDelay: 3,
      }
    ],
    sitemap: 'https://calculadoraonlinebr.com.br/sitemap.xml',
    host: 'https://calculadoraonlinebr.com.br',
  }
}