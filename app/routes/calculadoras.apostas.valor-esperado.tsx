import type { MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";
import { FAQ, RelatedCalculators } from "~/components";
import {
  Breadcrumb,
  BreadcrumbItem,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "~/components/ui";
import {
  ExpectedValueCalculator,
  calculateExpectedValue,
  formatSignedCurrency,
  formatSignedPercent,
} from "~/components/calculators/ExpectedValueCalculator";
import { APP_NAME, APP_URL } from "~/lib/constants";
import { CALCULATOR_SEO_DATA } from "~/lib/calculator-seo";
import { generateFAQStructuredData } from "~/lib/structured-data";

const SEO = CALCULATOR_SEO_DATA["valor-esperado"];
const PAGE_URL = SEO.canonicalUrl;
const OG_IMAGE = `${APP_URL}/og/valor-esperado.jpg`;

// Exemplo único usado em todo o conteúdo educativo, calculado pela mesma função da calculadora
const EXAMPLE = { stake: 100, odds: 2.1, probabilityPercent: 55 } as const;
const EXAMPLE_RESULT = calculateExpectedValue(EXAMPLE);
// Mesma odd com probabilidades diferentes: mostra onde o EV muda de sinal
const PROBABILITY_ROWS = [40, 45, 50, 55, 60].map((probabilityPercent) => ({
  probabilityPercent,
  result: calculateExpectedValue({ ...EXAMPLE, probabilityPercent }),
}));

const brl = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" });
const pct = new Intl.NumberFormat("pt-BR", {
  style: "percent",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});
const dec = new Intl.NumberFormat("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

const FAQ_ITEMS = [
  {
    question: "O que é valor esperado (EV) nas apostas?",
    answer:
      "Valor esperado (Expected Value) é o lucro ou prejuízo médio de uma aposta se ela fosse repetida muitas vezes nas mesmas condições. Um EV de +R$ 5 em uma aposta de R$ 100 significa que, em média, cada aposta desse tipo rende R$ 5 no longo prazo.",
  },
  {
    question: "Como calcular o valor esperado de uma aposta?",
    answer:
      "Use EV = (probabilidade de ganhar × lucro) − (probabilidade de perder × valor apostado). O lucro é o valor apostado × (odd − 1). Exemplo: R$ 100 na odd 2,10 com 55% de chance: (0,55 × 110) − (0,45 × 100) = +R$ 15,50.",
  },
  {
    question: "O que é uma aposta EV+ (odd de valor)?",
    answer:
      "É uma aposta com valor esperado positivo: a odd paga mais do que o risco justifica. Isso acontece quando a sua probabilidade estimada é maior que a probabilidade implícita da odd (1 ÷ odd).",
  },
  {
    question: "Uma aposta EV+ sempre dá lucro?",
    answer:
      "Não. O EV descreve a média no longo prazo. Uma aposta individual pode perder mesmo sendo EV+, e sequências de derrotas são normais. O lucro esperado só aparece depois de muitas apostas e com uma gestão de banca adequada.",
  },
  {
    question: "O que é odd justa?",
    answer:
      "É a odd em que a aposta teria EV zero para a sua probabilidade estimada, calculada por 1 ÷ probabilidade. Se você estima 55% de chance, a odd justa é 1,82: qualquer odd maior que essa tem valor.",
  },
  {
    question: "Qual a diferença entre valor esperado e critério de Kelly?",
    answer:
      "O valor esperado indica se vale a pena apostar. O critério de Kelly indica quanto apostar quando a aposta tem valor, definindo a fração ideal da banca. Na prática, use o EV para filtrar as apostas e o Kelly para dimensionar a stake.",
  },
  {
    question: "Como estimar a probabilidade de um resultado?",
    answer:
      "Com análise própria (estatísticas, desfalques, histórico) ou comparando com odds de casas de referência sem margem. A calculadora é tão boa quanto a estimativa: superestimar a chance transforma apostas ruins em EV+ no papel.",
  },
  {
    question: "O que é probabilidade implícita da odd?",
    answer:
      "É a chance que a própria odd representa, calculada por 1 ÷ odd. A odd 2,10 implica 47,62%. As casas embutem uma margem, então a soma das probabilidades implícitas de um mercado costuma passar de 100%.",
  },
];

export const meta: MetaFunction = () => [
  { title: SEO.title },
  { name: "description", content: SEO.description },
  { name: "keywords", content: SEO.keywords },
  {
    name: "robots",
    content: "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1",
  },
  { name: "author", content: APP_NAME },
  { property: "og:title", content: "Calculadora de Valor Esperado (EV+) para Apostas" },
  { property: "og:description", content: SEO.description },
  { property: "og:type", content: "website" },
  { property: "og:url", content: PAGE_URL },
  { property: "og:image", content: OG_IMAGE },
  { property: "og:image:width", content: "1200" },
  { property: "og:image:height", content: "630" },
  { property: "og:image:alt", content: "Calculadora de valor esperado (EV+) para apostas" },
  { property: "og:site_name", content: APP_NAME },
  { property: "og:locale", content: "pt_BR" },
  { name: "twitter:card", content: "summary_large_image" },
  { name: "twitter:title", content: "Calculadora de Valor Esperado (EV+) – Odd de Valor" },
  { name: "twitter:description", content: SEO.description },
  { name: "twitter:image", content: OG_IMAGE },
  { tagName: "link", rel: "canonical", href: PAGE_URL },
  {
    "script:ld+json": {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      name: "Calculadora de Valor Esperado (EV+)",
      url: PAGE_URL,
      description: SEO.description,
      applicationCategory: "FinanceApplication",
      operatingSystem: "Web",
      inLanguage: "pt-BR",
      isAccessibleForFree: true,
      offers: { "@type": "Offer", price: "0", priceCurrency: "BRL" },
      featureList: [
        "Valor esperado em reais e em porcentagem",
        "Veredito EV+ / EV-",
        "Odd justa e probabilidade implícita",
        "Gráfico de risco vs retorno ponderado",
        "Projeção do saldo em 100 apostas",
      ],
      publisher: { "@type": "Organization", name: APP_NAME, url: APP_URL },
    },
  },
  {
    "script:ld+json": {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Início", item: `${APP_URL}/` },
        { "@type": "ListItem", position: 2, name: "Calculadoras", item: `${APP_URL}/calculadoras` },
        {
          "@type": "ListItem",
          position: 3,
          name: "Apostas",
          item: `${APP_URL}/calculadoras/apostas`,
        },
        { "@type": "ListItem", position: 4, name: "Valor Esperado (EV)", item: PAGE_URL },
      ],
    },
  },
  { "script:ld+json": generateFAQStructuredData(FAQ_ITEMS) },
];

const FAQ_BORDER_COLORS = [
  "primary-blue",
  "growth-green",
  "system-info",
  "system-warning",
  "growth-green",
  "system-error-dark",
  "system-warning",
  "primary-blue",
] as const;

const linkClass = "font-medium text-primary-blue-dark underline hover:text-primary-blue";

export default function ValorEsperadoPage() {
  return (
    <div className="mx-auto max-w-2xl space-y-8 px-4 md:max-w-4xl lg:max-w-6xl" lang="pt-BR">
      <Breadcrumb>
        <BreadcrumbItem href="/">Início</BreadcrumbItem>
        <BreadcrumbItem href="/calculadoras">Calculadoras</BreadcrumbItem>
        <BreadcrumbItem href="/calculadoras/apostas">Apostas</BreadcrumbItem>
        <BreadcrumbItem isLast>Valor Esperado (EV)</BreadcrumbItem>
      </Breadcrumb>

      <header className="space-y-4 text-center">
        <h1 className="mb-4 text-3xl font-bold text-text-primary md:text-4xl">
          Calculadora de Valor Esperado (EV+) 2026 – Odds de Valor
        </h1>
        <p className="mx-auto max-w-3xl text-lg text-text-secondary-dark">
          Descubra se uma aposta <strong className="text-growth-green">vale a pena</strong> antes de
          confirmar. Informe o valor, a odd e a sua probabilidade estimada para ver o{" "}
          <strong className="text-primary-blue-dark">valor esperado em reais e em %</strong>, a odd
          justa e a projeção da banca no longo prazo.
        </p>
        <div className="inline-block rounded-lg bg-growth-green-soft p-4 duration-300">
          <p className="text-sm font-medium text-text-primary">
            📈 <strong>EV em R$ e %</strong> • 🎯 <strong>Odd Justa</strong> • 📊{" "}
            <strong>Gráficos de Projeção</strong>
          </p>
        </div>
      </header>

      <ExpectedValueCalculator />

      {/* Seção: Valor Esperado - Guia Completo */}
      <Card className="border-l-4 border-primary-blue bg-gradient-to-r from-primary-blue-light to-growth-green-soft duration-300">
        <CardHeader>
          <CardTitle as="h2" className="text-2xl font-bold text-text-primary">
            🎯 Valor Esperado nas Apostas – Guia Completo 2026
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-8">
            {/* Fórmula */}
            <div className="rounded-xl border border-primary-blue/20 bg-gray-900 p-6">
              <h3 className="mb-4 flex items-center text-xl font-bold text-primary-blue-dark">
                📐 Fórmula do Valor Esperado com Exemplo
              </h3>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <h4 className="mb-3 font-semibold text-growth-green">🔍 O que é EV</h4>
                  <p className="mb-4 text-sm text-text-secondary">
                    O valor esperado (Expected Value) é o resultado médio de uma aposta se ela fosse
                    repetida infinitas vezes. Ele pondera quanto você ganha pela chance de ganhar e
                    quanto perde pela chance de perder.
                  </p>

                  <h4 className="mb-3 font-semibold text-system-info">📊 Fórmula</h4>
                  <ul className="mb-4 space-y-1 text-sm text-text-secondary">
                    <li>• EV = (P × lucro) − ((1 − P) × stake)</li>
                    <li>• lucro = stake × (odd − 1)</li>
                    <li>• P = probabilidade de vitória</li>
                    <li>• EV % = EV ÷ stake × 100</li>
                  </ul>
                </div>

                <div>
                  <h4 className="mb-3 font-semibold text-system-success">
                    ✅ Exemplo: {brl.format(EXAMPLE.stake)} na odd {dec.format(EXAMPLE.odds)} com{" "}
                    {EXAMPLE.probabilityPercent}%
                  </h4>
                  <ul className="mb-4 space-y-1 text-sm text-text-secondary">
                    <li>• Lucro se vencer: {brl.format(EXAMPLE_RESULT.potentialProfit)}</li>
                    <li>
                      • (0,55 × {dec.format(EXAMPLE_RESULT.potentialProfit)}) − (0,45 ×{" "}
                      {dec.format(EXAMPLE.stake)})
                    </li>
                    <li>
                      • EV ={" "}
                      <strong className="text-text-primary">
                        {formatSignedCurrency(EXAMPLE_RESULT.evMoney)} (
                        {formatSignedPercent(EXAMPLE_RESULT.evPercent)})
                      </strong>
                    </li>
                  </ul>

                  <h4 className="mb-3 font-semibold text-system-warning">
                    📝 Leitura do resultado
                  </h4>
                  <ul className="space-y-1 text-sm text-text-secondary">
                    <li>• EV positivo: aposta de valor (EV+)</li>
                    <li>• EV zero ou negativo: evite a aposta</li>
                    <li>
                      • Em 100 apostas iguais: {formatSignedCurrency(EXAMPLE_RESULT.evMoney * 100)}
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Probabilidade implícita e odd justa */}
            <div className="rounded-xl border border-growth-green/20 bg-gray-900 p-6">
              <h3 className="mb-4 flex items-center text-xl font-bold text-growth-green">
                🎯 Probabilidade Implícita e Odd Justa
              </h3>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <h4 className="mb-3 font-semibold text-primary-blue-dark">
                    📉 Probabilidade implícita
                  </h4>
                  <p className="mb-4 text-sm text-text-secondary">
                    Toda odd representa uma chance: 1 ÷ odd. A odd {dec.format(EXAMPLE.odds)}{" "}
                    implica {pct.format(EXAMPLE_RESULT.impliedProbability)}. Se a sua estimativa for
                    maior que isso, a aposta é EV+.
                  </p>
                </div>

                <div>
                  <h4 className="mb-3 font-semibold text-system-success">⚖️ Odd justa</h4>
                  <p className="mb-4 text-sm text-text-secondary">
                    É a odd que zera o EV para a sua probabilidade: 1 ÷ P. Com 55% de chance, a odd
                    justa é {dec.format(EXAMPLE_RESULT.fairOdds)}. Qualquer odd acima dela tem
                    valor; abaixo, não.
                  </p>
                </div>
              </div>
            </div>

            {/* Longo prazo */}
            <div className="rounded-xl border border-system-warning/20 bg-gray-900 p-6">
              <h3 className="mb-4 flex items-center text-xl font-bold text-system-warning">
                📈 EV no Longo Prazo e Variância
              </h3>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <h4 className="mb-3 font-semibold text-growth-green">
                    🔁 Por que pensar em muitas apostas
                  </h4>
                  <p className="mb-4 text-sm text-text-secondary">
                    Uma aposta isolada ganha ou perde; o EV só aparece na média. O gráfico de
                    projeção mostra o saldo esperado repetindo a mesma aposta, mas o saldo real
                    oscila em torno dessa linha.
                  </p>
                </div>

                <div>
                  <h4 className="mb-3 font-semibold text-system-warning">
                    🛡️ EV e gestão de banca
                  </h4>
                  <p className="mb-4 text-sm text-text-secondary">
                    Mesmo apostas EV+ podem quebrar a banca se a stake for alta demais. Depois de
                    encontrar uma aposta de valor, use a{" "}
                    <Link to="/calculadoras/apostas/criterio-de-kelly" className={linkClass}>
                      calculadora do critério de Kelly
                    </Link>{" "}
                    para definir quanto apostar.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Seção: EV por probabilidade */}
      <Card className="border border-neutral-surface-variant bg-background-dark-secondary duration-300">
        <CardHeader>
          <CardTitle as="h2" className="text-xl font-bold text-text-primary">
            ⚖️ Tabela Comparativa: EV da Odd {dec.format(EXAMPLE.odds)} por Probabilidade
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4 text-sm text-text-secondary">
            Aposta de {brl.format(EXAMPLE.stake)} na odd {dec.format(EXAMPLE.odds)}. A probabilidade
            implícita é {pct.format(EXAMPLE_RESULT.impliedProbability)}: acima dela o EV fica
            positivo.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="border-b-2 border-neutral-surface-variant">
                  <th className="p-3 text-left font-semibold">Probabilidade estimada</th>
                  <th className="p-3 text-center font-semibold text-primary-blue-dark">EV (R$)</th>
                  <th className="p-3 text-center font-semibold text-growth-green">EV (%)</th>
                  <th className="p-3 text-center font-semibold text-system-warning">Veredito</th>
                </tr>
              </thead>
              <tbody>
                {PROBABILITY_ROWS.map(({ probabilityPercent, result }, index) => {
                  const color = result.isPositiveEV ? "text-growth-green" : "text-system-error";
                  return (
                    <tr
                      key={probabilityPercent}
                      className={
                        index < PROBABILITY_ROWS.length - 1
                          ? "border-b border-neutral-surface-variant"
                          : ""
                      }
                    >
                      <td className="p-3 font-medium">{probabilityPercent}%</td>
                      <td className={`p-3 text-center ${color}`}>
                        {formatSignedCurrency(result.evMoney)}
                      </td>
                      <td className={`p-3 text-center ${color}`}>
                        {formatSignedPercent(result.evPercent)}
                      </td>
                      <td className={`p-3 text-center font-semibold ${color}`}>
                        {result.isPositiveEV ? "EV+" : "EV-"}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className="rounded-lg border border-growth-green/20 bg-growth-green-soft p-4">
              <h3 className="mb-2 font-bold text-growth-green">✅ EV Positivo</h3>
              <p className="text-sm text-text-secondary">
                A odd paga mais do que o risco. <strong>Aposta de valor</strong>: lucrativa no longo
                prazo com gestão de banca.
              </p>
            </div>

            <div className="rounded-lg border border-system-warning/20 bg-system-warning/10 p-4">
              <h3 className="mb-2 font-bold text-system-warning">⚖️ EV Zero</h3>
              <p className="text-sm text-text-secondary">
                A odd é exatamente a <strong>odd justa</strong>. Sem vantagem: no longo prazo, o
                resultado tende a empatar.
              </p>
            </div>

            <div className="rounded-lg border border-system-error/20 bg-system-error/10 p-4">
              <h3 className="mb-2 font-bold text-system-error">⛔ EV Negativo</h3>
              <p className="text-sm text-text-secondary">
                A odd paga menos do que o risco. <strong>Evite</strong>: repetida, a aposta leva a
                prejuízo. Calcule a{" "}
                <Link to="/calculadoras/matematica/porcentagem" className={linkClass}>
                  porcentagem
                </Link>{" "}
                que ela custa da banca.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <FAQ
        title="Perguntas Frequentes - Calculadora de Valor Esperado"
        items={FAQ_ITEMS.map((item, index) => ({
          ...item,
          borderColor: FAQ_BORDER_COLORS[index % FAQ_BORDER_COLORS.length],
        }))}
        tipSection={{
          title: "Dica Importante sobre Valor Esperado",
          content:
            "<strong>Compare antes de apostar:</strong> a mesma aposta pode ser EV- em uma casa e EV+ em outra. Pequenas diferenças de odd mudam o valor esperado.",
        }}
        footerText="<strong>Lembre-se:</strong> EV+ indica vantagem no longo prazo, não garantia de ganho em uma aposta isolada."
      />

      {/* Footer com informações adicionais */}
      <Card className="border-l-4 border-primary-blue bg-primary-blue-light duration-300">
        <CardHeader>
          <CardTitle as="h2" className="text-lg font-bold text-text-primary">
            📚 Como Usar Esta Calculadora de Valor Esperado
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 text-sm text-text-secondary">
            <p>
              Informe o <strong className="text-primary-blue-dark">valor da aposta</strong>, a{" "}
              <strong className="text-primary-blue-dark">odd decimal</strong> oferecida e a{" "}
              <strong className="text-primary-blue-dark">probabilidade estimada</strong> de vitória,
              e clique em <strong className="text-growth-green">Calcular</strong>.
            </p>
            <p>
              <strong>Funcionalidades:</strong> valor esperado em reais e em porcentagem, veredito
              EV+ / EV-, odd justa, probabilidade implícita, gráfico de risco vs retorno ponderado e
              projeção do saldo em 100 apostas.
            </p>
            <p>
              <strong className="text-system-warning">Jogo responsável:</strong> apostas são
              proibidas para menores de 18 anos e envolvem risco de perda financeira. Esta
              ferramenta é matemática, não uma recomendação de aposta. Aposte apenas o que pode
              perder e, se precisar de apoio, procure o CVV (188). Conheça também as outras{" "}
              <Link to="/calculadoras/apostas" className={linkClass}>
                calculadoras de apostas
              </Link>
              .
            </p>
            <p className="mt-4 border-t border-primary-blue/20 pt-3 text-xs opacity-75">
              📈 Cálculo instantâneo • 🔒 Dados não armazenados • 📱 Compatível com todos os
              dispositivos • 🔞 Uso exclusivo para maiores de 18 anos
            </p>
          </div>
        </CardContent>
      </Card>

      <RelatedCalculators category="apostas" currentCalculatorId="valor-esperado" />
    </div>
  );
}
