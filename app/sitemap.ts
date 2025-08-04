import { MetadataRoute } from 'next';
import { CALCULATORS } from '@/lib/data/calculators';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://calculadoraonlinebr.com.br';
  
  // Base pages
  const routes = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/sobre`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    },
    {
      url: `${baseUrl}/privacidade`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.3,
    },
  ];

  // Add calculator pages with enhanced SEO metadata
  const calculatorRoutes = CALCULATORS.map((calculator) => ({
    url: `${baseUrl}${calculator.path}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.9, // Higher priority for calculator pages
  }));

  return [...routes, ...calculatorRoutes];
}