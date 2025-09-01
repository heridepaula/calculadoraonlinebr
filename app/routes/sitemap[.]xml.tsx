import type { LoaderFunction } from "@remix-run/node";

export const loader: LoaderFunction = async () => {
  const baseUrl = "https://www.calculadoraonlinebr.com.br";

  const urls = [
    // Main pages
    { loc: baseUrl, priority: "1.0", changefreq: "daily" },
    { loc: `${baseUrl}/calculadoras`, priority: "0.9", changefreq: "weekly" },

    // Category pages
    { loc: `${baseUrl}/calculadoras/saude`, priority: "0.8", changefreq: "weekly" },
    { loc: `${baseUrl}/calculadoras/financas`, priority: "0.8", changefreq: "weekly" },
    { loc: `${baseUrl}/calculadoras/matematica`, priority: "0.8", changefreq: "weekly" },
    { loc: `${baseUrl}/calculadoras/trabalhista`, priority: "0.8", changefreq: "weekly" },

    // Health Calculators
    { loc: `${baseUrl}/calculadoras/saude/imc`, priority: "0.8", changefreq: "monthly" },
    {
      loc: `${baseUrl}/calculadoras/saude/gordura-corporal`,
      priority: "0.8",
      changefreq: "monthly",
    },
    {
      loc: `${baseUrl}/calculadoras/saude/ciclo-menstrual`,
      priority: "0.8",
      changefreq: "monthly",
    },
    {
      loc: `${baseUrl}/calculadoras/saude/desenvolvimento-infantil`,
      priority: "0.8",
      changefreq: "monthly",
    },
    { loc: `${baseUrl}/calculadoras/saude/hidratacao`, priority: "0.8", changefreq: "monthly" },

    // Financial Calculators
    {
      loc: `${baseUrl}/calculadoras/financas/juros-compostos`,
      priority: "0.9",
      changefreq: "monthly",
    },
    {
      loc: `${baseUrl}/calculadoras/financas/primeiro-milhao`,
      priority: "0.9",
      changefreq: "monthly",
    },
    {
      loc: `${baseUrl}/calculadoras/financas/renda-fixa-comparativa`,
      priority: "0.8",
      changefreq: "monthly",
    },
    { loc: `${baseUrl}/calculadoras/financas/consorcio`, priority: "0.8", changefreq: "monthly" },
    { loc: `${baseUrl}/calculadoras/financas/cdb`, priority: "0.8", changefreq: "monthly" },
    {
      loc: `${baseUrl}/calculadoras/financas/tesouro-direto`,
      priority: "0.8",
      changefreq: "monthly",
    },
    {
      loc: `${baseUrl}/calculadoras/financas/antecipacao-parcelas-nubank`,
      priority: "0.8",
      changefreq: "monthly",
    },
    { loc: `${baseUrl}/calculadoras/financas/lci-lca`, priority: "0.8", changefreq: "monthly" },
    {
      loc: `${baseUrl}/calculadoras/financas/emprestimo-consignado`,
      priority: "0.8",
      changefreq: "monthly",
    },
    {
      loc: `${baseUrl}/calculadoras/financas/financiamento-imobiliario`,
      priority: "0.8",
      changefreq: "monthly",
    },
    {
      loc: `${baseUrl}/calculadoras/financas/juros-simples`,
      priority: "0.7",
      changefreq: "monthly",
    },
    { loc: `${baseUrl}/calculadoras/financas/preco-medio`, priority: "0.7", changefreq: "monthly" },

    // Mathematical Calculators
    {
      loc: `${baseUrl}/calculadoras/matematica/porcentagem`,
      priority: "0.8",
      changefreq: "monthly",
    },
    {
      loc: `${baseUrl}/calculadoras/matematica/regra-de-tres`,
      priority: "0.8",
      changefreq: "monthly",
    },
    {
      loc: `${baseUrl}/calculadoras/matematica/equacao-segundo-grau`,
      priority: "0.7",
      changefreq: "monthly",
    },
    { loc: `${baseUrl}/calculadoras/matematica/mmc-mdc`, priority: "0.7", changefreq: "monthly" },
    {
      loc: `${baseUrl}/calculadoras/matematica/area-perimetro`,
      priority: "0.7",
      changefreq: "monthly",
    },
    { loc: `${baseUrl}/calculadoras/matematica/volume`, priority: "0.7", changefreq: "monthly" },
    {
      loc: `${baseUrl}/calculadoras/matematica/teorema-pitagoras`,
      priority: "0.7",
      changefreq: "monthly",
    },
    { loc: `${baseUrl}/calculadoras/matematica/fracoes`, priority: "0.8", changefreq: "monthly" },
    { loc: `${baseUrl}/calculadoras/matematica/moda`, priority: "0.7", changefreq: "monthly" },

    // Labor Law Calculators
    { loc: `${baseUrl}/calculadoras/trabalhista/rescisao`, priority: "0.9", changefreq: "monthly" },
    {
      loc: `${baseUrl}/calculadoras/trabalhista/aposentadoria`,
      priority: "0.9",
      changefreq: "monthly",
    },
    {
      loc: `${baseUrl}/calculadoras/trabalhista/auxilio-doenca`,
      priority: "0.9",
      changefreq: "monthly",
    },
    {
      loc: `${baseUrl}/calculadoras/trabalhista/salario-liquido`,
      priority: "0.9",
      changefreq: "monthly",
    },
    {
      loc: `${baseUrl}/calculadoras/trabalhista/ferias-decimo-terceiro`,
      priority: "0.9",
      changefreq: "monthly",
    },

    // Legal pages
    { loc: `${baseUrl}/sobre`, priority: "0.6", changefreq: "monthly" },
    { loc: `${baseUrl}/privacidade`, priority: "0.5", changefreq: "yearly" },
    { loc: `${baseUrl}/termos-de-uso`, priority: "0.5", changefreq: "yearly" },
  ];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (url) => `  <url>
    <loc>${url.loc}</loc>
    <priority>${url.priority}</priority>
    <changefreq>${url.changefreq}</changefreq>
    <lastmod>${new Date().toISOString()}</lastmod>
  </url>`
  )
  .join("\n")}
</urlset>`;

  return new Response(sitemap, {
    status: 200,
    headers: {
      "Content-Type": "application/xml",
      "xml-version": "1.0",
      encoding: "UTF-8",
    },
  });
};
