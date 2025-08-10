import type { LoaderFunction } from "@remix-run/node";

export const loader: LoaderFunction = async () => {
  const baseUrl = "https://calculadoraonline.com.br";
  
  const urls = [
    { loc: baseUrl, priority: "1.0", changefreq: "daily" },
    { loc: `${baseUrl}/calculadora`, priority: "0.9", changefreq: "weekly" },
    { loc: `${baseUrl}/calculadora/saude`, priority: "0.8", changefreq: "weekly" },
    { loc: `${baseUrl}/calculadora/saude/imc`, priority: "0.8", changefreq: "monthly" },
    { loc: `${baseUrl}/calculadora/saude/gordura-corporal`, priority: "0.8", changefreq: "monthly" },
    { loc: `${baseUrl}/calculadora/saude/ciclo-menstrual`, priority: "0.8", changefreq: "monthly" },
    { loc: `${baseUrl}/calculadora/financas`, priority: "0.8", changefreq: "weekly" },
    { loc: `${baseUrl}/calculadora/financas/juros`, priority: "0.8", changefreq: "monthly" },
    { loc: `${baseUrl}/calculadora/financas/juros-compostos`, priority: "0.8", changefreq: "monthly" },
    { loc: `${baseUrl}/calculadora/financas/primeiro-milhao`, priority: "0.8", changefreq: "monthly" },
    { loc: `${baseUrl}/calculadora/matematica`, priority: "0.8", changefreq: "weekly" },
    { loc: `${baseUrl}/calculadora/matematica/porcentagem`, priority: "0.8", changefreq: "monthly" },
    { loc: `${baseUrl}/calculadoras`, priority: "0.7", changefreq: "monthly" },
    { loc: `${baseUrl}/calculadoras/imc`, priority: "0.7", changefreq: "monthly" },
    { loc: `${baseUrl}/calculadoras/juros`, priority: "0.7", changefreq: "monthly" },
    { loc: `${baseUrl}/calculadoras/porcentagem`, priority: "0.7", changefreq: "monthly" },
  ];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(url => `  <url>
    <loc>${url.loc}</loc>
    <priority>${url.priority}</priority>
    <changefreq>${url.changefreq}</changefreq>
    <lastmod>${new Date().toISOString()}</lastmod>
  </url>`).join('\n')}
</urlset>`;

  return new Response(sitemap, {
    status: 200,
    headers: {
      "Content-Type": "application/xml",
      "xml-version": "1.0",
      "encoding": "UTF-8",
    },
  });
};