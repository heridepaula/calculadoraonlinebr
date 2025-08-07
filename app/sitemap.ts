import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://calculadoraonlinebr.com.br';
  const currentDate = new Date().toISOString();

  // Calculator routes
  const calculatorRoutes = [
    '/calculadoras/calculadora-juros-compostos',
    '/calculadoras/calculadora-imc',
    '/calculadoras/calculadora-cdb',
    '/calculadoras/calculadora-tesouro-direto',
    '/calculadoras/calculadora-rescisao',
    '/calculadoras/calculadora-lci-lca',
    '/calculadoras/calculadora-primeiro-milhao',
    '/calculadoras/calculadora-preco-medio',
    '/calculadoras/comparador-renda-fixa',
    '/calculadoras/calculadora-financiamento-imobiliario',
    '/calculadoras/calculadora-emprestimo-consignado',
    '/calculadoras/calculadora-consorcio',
    '/calculadoras/regra-de-tres-simples',
    '/calculadoras/calculadora-bhaskara',
    '/calculadoras/calculadora-mmc-mdc',
    '/calculadoras/calculadora-fracoes',
    '/calculadoras/calculadora-area-perimetro',
    '/calculadoras/calculadora-volume',
    '/calculadoras/calculadora-pitagoras',
    '/calculadoras/calculadora-gordura-corporal',
    '/calculadoras/calculadora-hidratacao',
    '/calculadoras/calculadora-crescimento-infantil',
    '/calculadoras/calculadora-fertilidade',
    '/calculadoras/calculadora-aposentadoria',
    '/calculadoras/calculadora-auxilio-doenca',
    '/calculadoras/calculadora-salario-liquido',
    '/calculadoras/calculadora-ferias-13'
  ];

  const sitemap: MetadataRoute.Sitemap = [
    // Homepage
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 1.0,
    },
    // Calculator pages
    ...calculatorRoutes.map(route => ({
      url: `${baseUrl}${route}`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    })),
    // Static pages
    {
      url: `${baseUrl}/sobre`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/privacidade`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.3,
    },
  ];

  return sitemap;
}