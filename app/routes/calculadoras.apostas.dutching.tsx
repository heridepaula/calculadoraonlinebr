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
import { DutchingCalculator, calculateDutching } from "~/components/calculators/DutchingCalculator";
import { APP_NAME, APP_URL } from "~/lib/constants";
import { CALCULATOR_SEO_DATA } from "~/lib/calculator-seo";
import { generateFAQStructuredData } from "~/lib/structured-data";

const SEO = CALCULATOR_SEO_DATA["dutching"];
const PAGE_URL = SEO.canonicalUrl;
const OG_IMAGE = `${APP_URL}/og-image-1200x630.webp`;

// Exemplos calculados pela mesma função da calculadora
const INVESTMENT = 100;
const EXAMPLE_ODDS = [4, 5, 6];
const EXAMPLE = calculateDutching({ investment: INVESTMENT, odds: EXAMPLE_ODDS });
// Cada seleção a mais aumenta a cobertura e reduz o lucro
const SELECTION_ROWS = [
  [5, 6],
  [5, 6, 7],
  [5, 6, 7, 8],
  [5, 6, 7, 8, 10],
].map((odds) => ({ odds, result: calculateDutching({ investment: INVESTMENT, odds }) }));

const brl = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" });
const dec = new Intl.NumberFormat("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
const pct = new Intl.NumberFormat("pt-BR", {
  style: "percent",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});
const signedBrl = (value: number) =>
  `${value > 0.004 ? "+ " : value < -0.004 ? "- " : ""}${brl.format(Math.abs(value))}`;

const FAQ_ITEMS = [
  {
    question: "O que é dutching nas apostas?",
    answer:
      "Dutching é distribuir um valor entre várias seleções do mesmo evento de forma que o lucro seja igual, qualquer que seja a seleção vencedora. A técnica surgiu nas corridas de cavalos e hoje é usada em mercados como placar exato, artilheiro e vencedor de campeonato.",
  },
  {
    question: "Como calcular o dutching?",
    answer:
      "Some as probabilidades implícitas das odds (1 ÷ odd). O retorno é o investimento dividido por essa soma, e a stake de cada seleção é (1 ÷ odd) × retorno. Exemplo: R$ 100 nas odds 4, 5 e 6 dão stakes de R$ 40,54, R$ 32,43 e R$ 27,03, com lucro de R$ 62,16 se qualquer uma vencer.",
  },
  {
    question: "Dutching garante lucro?",
    answer:
      "Não. O lucro só vem se uma das seleções escolhidas vencer. Se o resultado for outro, todo o investimento é perdido. E se a soma das probabilidades implícitas passar de 100%, você tem prejuízo mesmo acertando.",
  },
  {
    question: "Qual a diferença entre dutching e surebet?",
    answer:
      "A conta é a mesma, mas a surebet cobre todos os resultados possíveis, em casas diferentes, e garante lucro. O dutching cobre só as seleções que você escolhe: tem lucro maior quando acerta, mas perde tudo se nenhuma seleção vencer.",
  },
  {
    question: "Quantas seleções usar no dutching?",
    answer:
      "Não há número ideal. Cada seleção a mais aumenta a chance de acerto, mas reduz o lucro, porque parte do investimento vai para ela. Quando a cobertura (soma das probabilidades implícitas) se aproxima de 100%, o lucro tende a zero.",
  },
  {
    question: "O que é a odd equivalente do dutching?",
    answer:
      "É a odd de uma aposta única que pagaria o mesmo retorno. Ela é 1 ÷ cobertura. Nas odds 4, 5 e 6 a odd equivalente é 1,62: o dutching funciona como apostar os R$ 100 inteiros nessa odd, com chance maior de acerto.",
  },
  {
    question: "Quando o dutching vale a pena?",
    answer:
      "Quando você acredita que o resultado estará entre algumas seleções e a chance real de uma delas vencer é maior que a cobertura. Se essa chance for menor, o dutching tem valor esperado negativo, como qualquer aposta ruim.",
  },
  {
    question: "Por que alguns campos de odd são ignorados?",
    answer:
      "A calculadora considera apenas os campos preenchidos com odds válidas (maiores que 1,00). Campos vazios são ignorados, então você pode deixar seleções extras sem preencher sem afetar o resultado.",
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
  { property: "og:title", content: "Calculadora de Dutching – Lucro Igual em Várias Seleções" },
  { property: "og:description", content: SEO.description },
  { property: "og:type", content: "website" },
  { property: "og:url", content: PAGE_URL },
  { property: "og:image", content: OG_IMAGE },
  { property: "og:image:width", content: "1200" },
  { property: "og:image:height", content: "630" },
  { property: "og:image:alt", content: "Calculadora de dutching para apostas esportivas" },
  { property: "og:site_name", content: APP_NAME },
  { property: "og:locale", content: "pt_BR" },
  { name: "twitter:card", content: "summary_large_image" },
  { name: "twitter:title", content: "Calculadora de Dutching – Retornos Iguais" },
  { name: "twitter:description", content: SEO.description },
  { name: "twitter:image", content: OG_IMAGE },
  { tagName: "link", rel: "canonical", href: PAGE_URL },
  {
    "script:ld+json": {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      name: "Calculadora de Dutching",
      url: PAGE_URL,
      description: SEO.description,
      applicationCategory: "FinanceApplication",
      operatingSystem: "Web",
      inLanguage: "pt-BR",
      isAccessibleForFree: true,
      offers: { "@type": "Offer", price: "0", priceCurrency: "BRL" },
      featureList: [
        "Até 10 seleções",
        "Stake de cada seleção para lucro igual",
        "Retorno, lucro líquido e ROI",
        "Cobertura e odd equivalente",
        "Alerta de prejuízo mesmo vencendo",
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
        { "@type": "ListItem", position: 4, name: "Dutching", item: PAGE_URL },
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

export default function DutchingPage() {
  return (
    <div className="mx-auto max-w-2xl space-y-8 px-4 md:max-w-4xl lg:max-w-6xl" lang="pt-BR">
      <Breadcrumb>
        <BreadcrumbItem href="/">Início</BreadcrumbItem>
        <BreadcrumbItem href="/calculadoras">Calculadoras</BreadcrumbItem>
        <BreadcrumbItem href="/calculadoras/apostas">Apostas</BreadcrumbItem>
        <BreadcrumbItem isLast>Dutching</BreadcrumbItem>
      </Breadcrumb>

      <header className="space-y-4 text-center">
        <h1 className="mb-4 text-3xl font-bold text-text-primary md:text-4xl">
          Calculadora de Dutching 2026 – Lucro Igual em Várias Seleções
        </h1>
        <p className="mx-auto max-w-3xl text-lg text-text-secondary-dark">
          Distribua o valor entre <strong className="text-growth-green">várias seleções</strong> do
          mesmo evento e tenha o{" "}
          <strong className="text-primary-blue-dark">
            mesmo lucro qualquer que seja a vencedora
          </strong>
          . Ideal para placar exato, artilheiro e vencedor de campeonato.
        </p>
        <div className="inline-block rounded-lg bg-growth-green-soft p-4 duration-300">
          <p className="text-sm font-medium text-text-primary">
            🎯 <strong>Até 10 Seleções</strong> • 💰 <strong>Lucro Igual</strong> • ⚠️{" "}
            <strong>Alerta de Prejuízo</strong>
          </p>
        </div>
      </header>

      <DutchingCalculator />

      {/* Seção: Dutching - Guia Completo */}
      <Card className="border-l-4 border-primary-blue bg-gradient-to-r from-primary-blue-light to-growth-green-soft duration-300">
        <CardHeader>
          <CardTitle as="h2" className="text-2xl font-bold text-text-primary">
            🎯 Dutching – Guia Completo 2026
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-8">
            {/* Conceito e fórmula */}
            <div className="rounded-xl border border-primary-blue/20 bg-gray-900 p-6">
              <h3 className="mb-4 flex items-center text-xl font-bold text-primary-blue-dark">
                📐 O que é Dutching e Como Calcular
              </h3>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <h4 className="mb-3 font-semibold text-growth-green">🔍 A estratégia</h4>
                  <p className="mb-4 text-sm text-text-secondary">
                    Em vez de apostar em um único resultado, você escolhe vários e divide o valor
                    entre eles na proporção certa: odds mais baixas recebem mais dinheiro, odds mais
                    altas, menos. Assim, o lucro é o mesmo qualquer que seja a vencedora.
                  </p>

                  <h4 className="mb-3 font-semibold text-system-info">📊 Fórmula</h4>
                  <ul className="mb-4 space-y-1 text-sm text-text-secondary">
                    <li>• cobertura = Σ (1 ÷ odd)</li>
                    <li>• retorno = investimento ÷ cobertura</li>
                    <li>• stake de cada seleção = (1 ÷ odd) × retorno</li>
                    <li>• lucro = retorno − investimento</li>
                  </ul>
                </div>

                <div>
                  <h4 className="mb-3 font-semibold text-system-success">
                    ✅ Exemplo: {brl.format(INVESTMENT)} em 3 placares exatos (odds{" "}
                    {EXAMPLE_ODDS.map((o) => dec.format(o)).join(", ")})
                  </h4>
                  <ul className="mb-4 space-y-1 text-sm text-text-secondary">
                    <li>
                      • Cobertura: 1/4 + 1/5 + 1/6 ={" "}
                      <strong className="text-text-primary">
                        {pct.format(EXAMPLE.totalProbability)}
                      </strong>
                    </li>
                    <li>
                      • Stakes:{" "}
                      {EXAMPLE.legs.map((leg) => brl.format(leg.stakeRounded)).join(" + ")}
                    </li>
                    <li>
                      • Se qualquer placar sair: {brl.format(EXAMPLE.totalReturn)} (
                      <strong className="text-growth-green">{signedBrl(EXAMPLE.profit)}</strong>)
                    </li>
                    <li>• Se outro placar sair: {signedBrl(-INVESTMENT)}</li>
                  </ul>

                  <h4 className="mb-3 font-semibold text-system-warning">
                    📝 Odd equivalente: {dec.format(EXAMPLE.equivalentOdds)}
                  </h4>
                  <p className="text-sm text-text-secondary">
                    O dutching funciona como uma aposta única nessa odd, mas com{" "}
                    {pct.format(EXAMPLE.totalProbability)} de chance implícita de acerto.
                  </p>
                </div>
              </div>
            </div>

            {/* Riscos */}
            <div className="rounded-xl border border-system-warning/20 bg-gray-900 p-6">
              <h3 className="mb-4 flex items-center text-xl font-bold text-system-warning">
                ⚠️ Os Riscos do Dutching
              </h3>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <h4 className="mb-3 font-semibold text-system-error">❌ Nenhuma seleção vence</h4>
                  <p className="mb-4 text-sm text-text-secondary">
                    Diferente da surebet, o dutching não cobre todos os resultados. Se o vencedor
                    estiver fora das suas seleções, todo o investimento é perdido.
                  </p>
                </div>

                <div>
                  <h4 className="mb-3 font-semibold text-system-warning">
                    📉 Cobertura acima de 100%
                  </h4>
                  <p className="mb-4 text-sm text-text-secondary">
                    Se a soma das probabilidades implícitas passar de 100%, o retorno fica menor que
                    o investimento: você perde dinheiro mesmo acertando. A calculadora mostra um
                    alerta nesse caso.
                  </p>
                </div>
              </div>
            </div>

            {/* Relação com outras calculadoras */}
            <div className="rounded-xl border border-growth-green/20 bg-gray-900 p-6">
              <h3 className="mb-4 flex items-center text-xl font-bold text-growth-green">
                🔗 Dutching, Surebet e Valor Esperado
              </h3>
              <p className="text-sm text-text-secondary">
                Se você cobrir todos os resultados com odds de casas diferentes e a cobertura ficar
                abaixo de 100%, o dutching vira uma{" "}
                <Link to="/calculadoras/apostas/surebet" className={linkClass}>
                  surebet
                </Link>
                , com lucro garantido. Para saber se a sua combinação vale a pena, compare a chance
                real com a odd equivalente na{" "}
                <Link to="/calculadoras/apostas/valor-esperado" className={linkClass}>
                  calculadora de valor esperado
                </Link>
                .
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Seção: número de seleções */}
      <Card className="border border-neutral-surface-variant bg-background-dark-secondary duration-300">
        <CardHeader>
          <CardTitle as="h2" className="text-xl font-bold text-text-primary">
            ⚖️ Tabela Comparativa: Mais Seleções, Mais Chance, Menos Lucro
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4 text-sm text-text-secondary">
            Investimento de {brl.format(INVESTMENT)}, adicionando uma seleção de cada vez.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="border-b-2 border-neutral-surface-variant">
                  <th className="p-3 text-left font-semibold">Odds escolhidas</th>
                  <th className="p-3 text-center font-semibold text-primary-blue-dark">
                    Cobertura
                  </th>
                  <th className="p-3 text-center font-semibold text-system-warning">
                    Odd equivalente
                  </th>
                  <th className="p-3 text-center font-semibold text-growth-green">
                    Lucro se acertar
                  </th>
                </tr>
              </thead>
              <tbody>
                {SELECTION_ROWS.map(({ odds, result }, index) => (
                  <tr
                    key={odds.join("-")}
                    className={
                      index < SELECTION_ROWS.length - 1
                        ? "border-b border-neutral-surface-variant"
                        : ""
                    }
                  >
                    <td className="p-3 font-medium">
                      {odds.map((o) => dec.format(o)).join(" / ")}
                    </td>
                    <td className="p-3 text-center text-primary-blue-dark">
                      {pct.format(result.totalProbability)}
                    </td>
                    <td className="p-3 text-center text-system-warning">
                      {dec.format(result.equivalentOdds)}
                    </td>
                    <td className="p-3 text-center font-semibold text-growth-green">
                      {signedBrl(result.profit)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className="rounded-lg border border-growth-green/20 bg-growth-green-soft p-4">
              <h3 className="mb-2 font-bold text-growth-green">✅ Cobertura baixa</h3>
              <p className="text-sm text-text-secondary">
                Poucas seleções: <strong>lucro alto</strong> quando acerta, mas chance menor de
                acertar.
              </p>
            </div>

            <div className="rounded-lg border border-system-warning/20 bg-system-warning/10 p-4">
              <h3 className="mb-2 font-bold text-system-warning">⚖️ Cobertura perto de 100%</h3>
              <p className="text-sm text-text-secondary">
                Muitas seleções: <strong>acerta quase sempre</strong>, mas o lucro fica próximo de
                zero.
              </p>
            </div>

            <div className="rounded-lg border border-system-error/20 bg-system-error/10 p-4">
              <h3 className="mb-2 font-bold text-system-error">⛔ Cobertura acima de 100%</h3>
              <p className="text-sm text-text-secondary">
                <strong>Prejuízo mesmo acertando</strong>. Reduza as seleções ou procure odds
                maiores. Veja a diferença em{" "}
                <Link to="/calculadoras/matematica/porcentagem" className={linkClass}>
                  porcentagem
                </Link>
                .
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <FAQ
        title="Perguntas Frequentes - Calculadora de Dutching"
        items={FAQ_ITEMS.map((item, index) => ({
          ...item,
          borderColor: FAQ_BORDER_COLORS[index % FAQ_BORDER_COLORS.length],
        }))}
        tipSection={{
          title: "Dica Importante sobre Dutching",
          content:
            "<strong>Descarte as seleções mais fracas:</strong> se a cobertura estiver alta e o lucro baixo, remova as seleções com odds mais baixas que você considera menos prováveis. O lucro sobe e a chance cai um pouco.",
        }}
        footerText="<strong>Lembre-se:</strong> o lucro só existe se uma das seleções escolhidas vencer; caso contrário, todo o investimento é perdido."
      />

      {/* Footer com informações adicionais */}
      <Card className="border-l-4 border-primary-blue bg-primary-blue-light duration-300">
        <CardHeader>
          <CardTitle as="h2" className="text-lg font-bold text-text-primary">
            📚 Como Usar Esta Calculadora de Dutching
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 text-sm text-text-secondary">
            <p>
              Informe o <strong className="text-primary-blue-dark">valor total</strong> a investir e
              a <strong className="text-primary-blue-dark">odd de cada seleção</strong>. Use{" "}
              <strong>+ Adicionar Seleção</strong> para incluir mais resultados (até 10) e clique em{" "}
              <strong className="text-growth-green">Calcular</strong>.
            </p>
            <p>
              <strong>Funcionalidades:</strong> stake de cada seleção, retorno e lucro iguais para
              qualquer vencedora, ROI, cobertura, odd equivalente e alerta quando a combinação dá
              prejuízo mesmo vencendo.
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
              🎯 Até 10 seleções • 🔒 Dados não armazenados • 📱 Compatível com todos os
              dispositivos • 🔞 Uso exclusivo para maiores de 18 anos
            </p>
          </div>
        </CardContent>
      </Card>

      <RelatedCalculators category="apostas" currentCalculatorId="dutching" />
    </div>
  );
}
