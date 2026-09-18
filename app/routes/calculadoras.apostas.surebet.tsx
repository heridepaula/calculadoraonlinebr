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
import { SurebetCalculator, calculateSurebet } from "~/components/calculators/SurebetCalculator";
import { APP_NAME, APP_URL } from "~/lib/constants";
import { CALCULATOR_SEO_DATA } from "~/lib/calculator-seo";
import { generateFAQStructuredData } from "~/lib/structured-data";

const SEO = CALCULATOR_SEO_DATA["surebet"];
const PAGE_URL = SEO.canonicalUrl;
const OG_IMAGE = `${APP_URL}/og-image-1200x630.webp`;

// Exemplos calculados pela mesma função da calculadora, com margens realistas (1% a 3%)
const INVESTMENT = 1000;
const EXAMPLE_2WAY = {
  odds: [2.1, 2.0],
  result: calculateSurebet({ investment: INVESTMENT, odds: [2.1, 2.0] }),
};
const EXAMPLE_3WAY = {
  odds: [2.2, 3.6, 3.9],
  result: calculateSurebet({ investment: INVESTMENT, odds: [2.2, 3.6, 3.9] }),
};
// Mesmo mercado de 2 resultados com odds diferentes: mostra onde a margem cruza 100%
const MARGIN_ROWS = [
  [1.9, 1.9],
  [2.0, 2.0],
  [2.05, 2.0],
  [2.1, 2.0],
  [2.2, 2.0],
].map((odds) => ({ odds, result: calculateSurebet({ investment: INVESTMENT, odds }) }));

const brl = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" });
const dec = new Intl.NumberFormat("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
const pctOf = (margin: number) => `${dec.format(margin * 100)}%`;
const signedBrl = (value: number) =>
  `${value > 0.004 ? "+ " : value < -0.004 ? "- " : ""}${brl.format(Math.abs(value))}`;

const FAQ_ITEMS = [
  {
    question: "O que é surebet?",
    answer:
      "Surebet (aposta segura ou arbitragem) é uma combinação de apostas em todos os resultados possíveis de um evento, em casas diferentes, que garante lucro qualquer que seja o resultado. Ela aparece quando as casas discordam o suficiente nas odds para que a soma das probabilidades implícitas fique abaixo de 100%.",
  },
  {
    question: "Como saber se é uma surebet?",
    answer:
      "Some o inverso de cada odd (1 ÷ odd). Se o total for menor que 1 (100%), existe surebet. Exemplo: odds 2,10 e 2,00 dão 1/2,10 + 1/2,00 = 0,976, ou seja, margem de 97,62% e lucro de cerca de 2,4%.",
  },
  {
    question: "Como calcular quanto apostar em cada resultado?",
    answer:
      "Divida o investimento pela margem para obter o retorno garantido e, depois, divida esse retorno pela odd de cada resultado. Assim todas as apostas devolvem o mesmo valor e o lucro é igual em qualquer cenário.",
  },
  {
    question: "Surebet é legal no Brasil?",
    answer:
      "Sim. Apostar em casas diferentes não é proibido. Porém, as casas podem limitar o valor máximo das apostas ou restringir contas que fazem arbitragem com frequência, conforme os próprios termos de uso.",
  },
  {
    question: "Por que arredondar os valores das stakes?",
    answer:
      "Valores muito quebrados, como R$ 134,57, repetidos com frequência são um sinal típico de arbitragem e podem levar à limitação da conta. Arredondar para reais inteiros reduz esse risco, com uma pequena variação no lucro; a calculadora mostra o lucro mínimo após o arredondamento.",
  },
  {
    question: "Surebet tem risco?",
    answer:
      "O risco matemático é zero se as duas apostas forem aceitas nas odds calculadas. Os riscos práticos são: a odd mudar antes de você confirmar a segunda aposta, uma casa anular a aposta por erro de cotação, regras diferentes entre casas (ex.: prorrogação ou abandono) e limitação de conta.",
  },
  {
    question: "Qual a diferença entre surebet 2 vias e 3 vias?",
    answer:
      "Na surebet de 2 vias o evento tem dois resultados possíveis, como tênis ou Over/Under. Na de 3 vias há três, como o 1X2 do futebol (vitória, empate e derrota). A fórmula é a mesma, somando uma odd a mais.",
  },
  {
    question: "Quanto rende uma surebet?",
    answer:
      "Na maioria dos casos, entre 1% e 3% do valor investido por operação. Margens maiores são raras e costumam indicar erro de cotação, que a casa pode anular.",
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
  { property: "og:title", content: "Calculadora de Surebet (Arbitragem) – 2 e 3 Resultados" },
  { property: "og:description", content: SEO.description },
  { property: "og:type", content: "website" },
  { property: "og:url", content: PAGE_URL },
  { property: "og:image", content: OG_IMAGE },
  { property: "og:image:width", content: "1200" },
  { property: "og:image:height", content: "630" },
  { property: "og:image:alt", content: "Calculadora de surebet para apostas de arbitragem" },
  { property: "og:site_name", content: APP_NAME },
  { property: "og:locale", content: "pt_BR" },
  { name: "twitter:card", content: "summary_large_image" },
  { name: "twitter:title", content: "Calculadora de Surebet – Apostas Seguras" },
  { name: "twitter:description", content: SEO.description },
  { name: "twitter:image", content: OG_IMAGE },
  { tagName: "link", rel: "canonical", href: PAGE_URL },
  {
    "script:ld+json": {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      name: "Calculadora de Surebet (Arbitragem)",
      url: PAGE_URL,
      description: SEO.description,
      applicationCategory: "FinanceApplication",
      operatingSystem: "Web",
      inLanguage: "pt-BR",
      isAccessibleForFree: true,
      offers: { "@type": "Offer", price: "0", priceCurrency: "BRL" },
      featureList: [
        "Surebet de 2 e 3 resultados",
        "Margem de arbitragem e ROI",
        "Stake de cada aposta para lucro igual",
        "Lucro com stakes arredondadas para reais inteiros",
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
        { "@type": "ListItem", position: 4, name: "Surebet", item: PAGE_URL },
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

function ExampleStakes({
  odds,
  result,
}: {
  odds: number[];
  result: ReturnType<typeof calculateSurebet>;
}) {
  return (
    <ul className="mb-4 space-y-1 text-sm text-text-secondary">
      <li>
        • Margem: {odds.map((o) => `1/${dec.format(o)}`).join(" + ")} ={" "}
        <strong className="text-text-primary">{pctOf(result.margin)}</strong>
      </li>
      <li>• Stakes: {result.legs.map((leg) => brl.format(leg.stakeRounded)).join(" + ")}</li>
      <li>
        • Retorno em qualquer resultado: {brl.format(result.totalReturn)} (
        <strong className="text-growth-green">{signedBrl(result.profit)}</strong>)
      </li>
    </ul>
  );
}

export default function SurebetPage() {
  return (
    <div className="mx-auto max-w-2xl space-y-8 px-4 md:max-w-4xl lg:max-w-6xl" lang="pt-BR">
      <Breadcrumb>
        <BreadcrumbItem href="/">Início</BreadcrumbItem>
        <BreadcrumbItem href="/calculadoras">Calculadoras</BreadcrumbItem>
        <BreadcrumbItem href="/calculadoras/apostas">Apostas</BreadcrumbItem>
        <BreadcrumbItem isLast>Surebet</BreadcrumbItem>
      </Breadcrumb>

      <header className="space-y-4 text-center">
        <h1 className="mb-4 text-3xl font-bold text-text-primary md:text-4xl">
          Calculadora de Surebet 2026 – Arbitragem em Apostas Esportivas
        </h1>
        <p className="mx-auto max-w-3xl text-lg text-text-secondary-dark">
          Descubra se as odds de casas diferentes formam uma{" "}
          <strong className="text-growth-green">aposta segura</strong> e quanto apostar em cada
          resultado para garantir o{" "}
          <strong className="text-primary-blue-dark">mesmo lucro em qualquer placar</strong>.
          Funciona para mercados de 2 e 3 resultados.
        </p>
        <div className="inline-block rounded-lg bg-growth-green-soft p-4 duration-300">
          <p className="text-sm font-medium text-text-primary">
            ⚖️ <strong>2 e 3 Vias</strong> • 💰 <strong>Lucro Garantido</strong> • 🎯{" "}
            <strong>Stakes Arredondadas</strong>
          </p>
        </div>
      </header>

      <SurebetCalculator />

      {/* Seção: Surebet - Guia Completo */}
      <Card className="border-l-4 border-primary-blue bg-gradient-to-r from-primary-blue-light to-growth-green-soft duration-300">
        <CardHeader>
          <CardTitle as="h2" className="text-2xl font-bold text-text-primary">
            🎯 Surebet – Guia Completo 2026
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-8">
            {/* Conceito e fórmula */}
            <div className="rounded-xl border border-primary-blue/20 bg-gray-900 p-6">
              <h3 className="mb-4 flex items-center text-xl font-bold text-primary-blue-dark">
                📐 O que é Surebet e Como Calcular
              </h3>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <h4 className="mb-3 font-semibold text-growth-green">🔍 Arbitragem esportiva</h4>
                  <p className="mb-4 text-sm text-text-secondary">
                    Cada casa define suas odds de forma independente. Quando elas discordam o
                    suficiente, apostar em todos os resultados, em casas diferentes, custa menos do
                    que o valor que qualquer resultado devolve. Essa diferença é o lucro da surebet.
                  </p>

                  <h4 className="mb-3 font-semibold text-system-info">📊 Fórmula</h4>
                  <ul className="mb-4 space-y-1 text-sm text-text-secondary">
                    <li>• margem = 1/odd₁ + 1/odd₂ (+ 1/odd₃)</li>
                    <li>• margem abaixo de 100% = surebet</li>
                    <li>• retorno = investimento ÷ margem</li>
                    <li>• stake de cada resultado = retorno ÷ odd</li>
                  </ul>
                </div>

                <div>
                  <h4 className="mb-3 font-semibold text-system-success">
                    ✅ Exemplo de 2 resultados: odds{" "}
                    {EXAMPLE_2WAY.odds.map((o) => dec.format(o)).join(" e ")}
                  </h4>
                  <ExampleStakes {...EXAMPLE_2WAY} />

                  <h4 className="mb-3 font-semibold text-system-warning">
                    ⚽ Exemplo de 3 resultados (1X2): odds{" "}
                    {EXAMPLE_3WAY.odds.map((o) => dec.format(o)).join(", ")}
                  </h4>
                  <ExampleStakes {...EXAMPLE_3WAY} />
                </div>
              </div>
            </div>

            {/* Riscos */}
            <div className="rounded-xl border border-system-warning/20 bg-gray-900 p-6">
              <h3 className="mb-4 flex items-center text-xl font-bold text-system-warning">
                ⚠️ Riscos Práticos da Surebet
              </h3>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <h4 className="mb-3 font-semibold text-growth-green">⏱️ Odds que mudam</h4>
                  <p className="mb-4 text-sm text-text-secondary">
                    Surebets duram minutos. Se a odd cair entre a primeira e a segunda aposta, a
                    arbitragem pode virar prejuízo. Recalcule antes de confirmar a última perna.
                  </p>

                  <h4 className="mb-3 font-semibold text-system-info">📜 Regras diferentes</h4>
                  <p className="mb-4 text-sm text-text-secondary">
                    Casas tratam de forma diferente prorrogação, abandono de partida e desistência
                    no tênis. Confira se o mercado é exatamente o mesmo nas duas casas.
                  </p>
                </div>

                <div>
                  <h4 className="mb-3 font-semibold text-system-error">🚫 Limitação de conta</h4>
                  <p className="mb-4 text-sm text-text-secondary">
                    Casas podem reduzir o valor máximo aceito para contas que fazem arbitragem.
                    Arredondar as stakes e variar os mercados ajuda a não chamar atenção.
                  </p>

                  <h4 className="mb-3 font-semibold text-system-warning">🧾 Odds boas demais</h4>
                  <p className="mb-4 text-sm text-text-secondary">
                    Margens muito abaixo de 97% costumam ser erro de cotação, que a casa pode
                    anular, deixando só a outra aposta de pé.
                  </p>
                </div>
              </div>
            </div>

            {/* Relação com outras calculadoras */}
            <div className="rounded-xl border border-growth-green/20 bg-gray-900 p-6">
              <h3 className="mb-4 flex items-center text-xl font-bold text-growth-green">
                🔗 Surebet, Valor Esperado e Gestão de Banca
              </h3>
              <p className="text-sm text-text-secondary">
                A surebet garante lucro sem depender de previsão, mas rende pouco por operação.
                Quando não há arbitragem, a alternativa é buscar apostas com valor esperado positivo
                na{" "}
                <Link to="/calculadoras/apostas/valor-esperado" className={linkClass}>
                  calculadora de valor esperado (EV+)
                </Link>{" "}
                e definir quanto apostar com o{" "}
                <Link to="/calculadoras/apostas/criterio-de-kelly" className={linkClass}>
                  critério de Kelly
                </Link>
                .
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Seção: margem por odds */}
      <Card className="border border-neutral-surface-variant bg-background-dark-secondary duration-300">
        <CardHeader>
          <CardTitle as="h2" className="text-xl font-bold text-text-primary">
            ⚖️ Tabela Comparativa: Quando as Odds Formam uma Surebet
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4 text-sm text-text-secondary">
            Mercado de 2 resultados com investimento de {brl.format(INVESTMENT)}. Odds de 1,90 nos
            dois lados são o padrão de uma casa com margem; a surebet surge quando outra casa paga
            mais em um dos lados.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="border-b-2 border-neutral-surface-variant">
                  <th className="p-3 text-left font-semibold">Odds (A / B)</th>
                  <th className="p-3 text-center font-semibold text-primary-blue-dark">Margem</th>
                  <th className="p-3 text-center font-semibold text-growth-green">
                    Resultado garantido
                  </th>
                  <th className="p-3 text-center font-semibold text-system-warning">Veredito</th>
                </tr>
              </thead>
              <tbody>
                {MARGIN_ROWS.map(({ odds, result }, index) => {
                  const color = result.isSurebet ? "text-growth-green" : "text-system-error";
                  return (
                    <tr
                      key={odds.join("-")}
                      className={
                        index < MARGIN_ROWS.length - 1
                          ? "border-b border-neutral-surface-variant"
                          : ""
                      }
                    >
                      <td className="p-3 font-medium">
                        {odds.map((o) => dec.format(o)).join(" / ")}
                      </td>
                      <td className="p-3 text-center text-primary-blue-dark">
                        {pctOf(result.margin)}
                      </td>
                      <td className={`p-3 text-center ${color}`}>{signedBrl(result.profit)}</td>
                      <td className={`p-3 text-center font-semibold ${color}`}>
                        {result.isSurebet ? "Surebet" : "Sem surebet"}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className="rounded-lg border border-growth-green/20 bg-growth-green-soft p-4">
              <h3 className="mb-2 font-bold text-growth-green">✅ Margem abaixo de 100%</h3>
              <p className="text-sm text-text-secondary">
                <strong>Surebet</strong>: distribuir o investimento garante lucro em qualquer
                resultado.
              </p>
            </div>

            <div className="rounded-lg border border-system-warning/20 bg-system-warning/10 p-4">
              <h3 className="mb-2 font-bold text-system-warning">⚖️ Margem igual a 100%</h3>
              <p className="text-sm text-text-secondary">
                <strong>Empate</strong>: você recebe de volta exatamente o que apostou, sem lucro
                nem prejuízo.
              </p>
            </div>

            <div className="rounded-lg border border-system-error/20 bg-system-error/10 p-4">
              <h3 className="mb-2 font-bold text-system-error">⛔ Margem acima de 100%</h3>
              <p className="text-sm text-text-secondary">
                <strong>Prejuízo garantido</strong> ao cobrir todos os resultados: é a margem da
                casa. Veja quanto ela custa com a{" "}
                <Link to="/calculadoras/matematica/porcentagem" className={linkClass}>
                  calculadora de porcentagem
                </Link>
                .
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <FAQ
        title="Perguntas Frequentes - Calculadora de Surebet"
        items={FAQ_ITEMS.map((item, index) => ({
          ...item,
          borderColor: FAQ_BORDER_COLORS[index % FAQ_BORDER_COLORS.length],
        }))}
        tipSection={{
          title: "Dica Importante sobre Surebet",
          content:
            "<strong>Aposte primeiro na odd mais instável:</strong> faça a aposta da casa com maior risco de mudar a cotação e, só depois, a outra. Recalcule se a odd mudar antes da confirmação.",
        }}
        footerText="<strong>Lembre-se:</strong> o lucro só é garantido se todas as apostas forem aceitas nas odds calculadas."
      />

      {/* Footer com informações adicionais */}
      <Card className="border-l-4 border-primary-blue bg-primary-blue-light duration-300">
        <CardHeader>
          <CardTitle as="h2" className="text-lg font-bold text-text-primary">
            📚 Como Usar Esta Calculadora de Surebet
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 text-sm text-text-secondary">
            <p>
              Informe o <strong className="text-primary-blue-dark">valor total</strong> que quer
              investir, escolha entre{" "}
              <strong className="text-primary-blue-dark">2 ou 3 resultados</strong>, digite a melhor
              odd de cada resultado (de casas diferentes) e clique em{" "}
              <strong className="text-growth-green">Calcular</strong>.
            </p>
            <p>
              <strong>Funcionalidades:</strong> margem de arbitragem, lucro garantido e ROI, valor a
              apostar em cada resultado, prova de retorno igual em todas as pernas e simulação com
              stakes arredondadas para reais inteiros.
            </p>
            <p>
              <strong className="text-system-warning">Jogo responsável:</strong> apostas são
              proibidas para menores de 18 anos e envolvem risco de perda financeira. Esta
              ferramenta é matemática, não uma recomendação de aposta. Se precisar de apoio, procure
              o CVV (188). Conheça também as outras{" "}
              <Link to="/calculadoras/apostas" className={linkClass}>
                calculadoras de apostas
              </Link>
              .
            </p>
            <p className="mt-4 border-t border-primary-blue/20 pt-3 text-xs opacity-75">
              ⚖️ 2 e 3 resultados • 🔒 Dados não armazenados • 📱 Compatível com todos os
              dispositivos • 🔞 Uso exclusivo para maiores de 18 anos
            </p>
          </div>
        </CardContent>
      </Card>

      <RelatedCalculators category="apostas" currentCalculatorId="surebet" />
    </div>
  );
}
