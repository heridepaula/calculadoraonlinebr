/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_APP_URL || 'https://calculadoraonlinebr.com.br',
  generateRobotsTxt: true,
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/_next/', '/admin/']
      },
      {
        userAgent: 'GPTBot',
        disallow: '/'
      }
    ],
    additionalSitemaps: [
      `${process.env.NEXT_PUBLIC_APP_URL || 'https://calculadoraonlinebr.com.br'}/sitemap.xml`
    ]
  },
  changefreq: 'weekly',
  priority: 0.7,
  sitemapSize: 7000,
  generateIndexSitemap: false,
  transform: async (config, path) => {
    // Custom priority for different page types
    let priority = config.priority;
    let changefreq = config.changefreq;

    if (path === '/') {
      priority = 1.0;
      changefreq = 'daily';
    } else if (path.includes('/calculadoras/')) {
      priority = 0.9;
      changefreq = 'weekly';
    } else if (path.includes('/sobre') || path.includes('/privacidade')) {
      priority = 0.3;
      changefreq = 'monthly';
    }

    return {
      loc: path,
      changefreq,
      priority,
      lastmod: new Date().toISOString(),
    };
  },
  additionalPaths: async (config) => {
    const calculatorPaths = [
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

    return calculatorPaths.map(path => ({
      loc: path,
      changefreq: 'weekly',
      priority: 0.9,
      lastmod: new Date().toISOString()
    }));
  }
};