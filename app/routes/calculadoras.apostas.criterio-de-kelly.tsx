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
  KellyCriterionCalculator,
  KELLY_FRACTION_OPTIONS,
  MAX_STAKE_FRACTION,
  calculateKelly,
} from "~/components/calculators/KellyCriterionCalculator";
import { APP_NAME, APP_URL } from "~/lib/constants";
import { CALCULATOR_SEO_DATA } from "~/lib/calculator-seo";
import { generateFAQStructuredData } from "~/lib/structured-data";

const SEO = CALCULATOR_SEO_DATA["criterio-de-kelly"];
const PAGE_URL = SEO.canonicalUrl;
const OG_IMAGE = `${APP_URL}/og-image-1200x630.webp`;

// Exemplo único usado em todo o conteúdo educativo, calculado pela mesma função da calculadora
const EXAMPLE = { bankroll: 1000, odds: 2.1, probabilityPercent: 55 } as const;
const EXAMPLE_FULL = calculateKelly({ ...EXAMPLE, fraction: 1 });
const EXAMPLE_ROWS = KELLY_FRACTION_OPTIONS.map((option) => ({
  ...option,
  result: calculateKelly({ ...EXAMPLE, fraction: option.value }),
}));
const BANKROLL_EXAMPLES = [100, 500, 1000].map((bankroll) => ({
  bankroll,
  result: calculateKelly({ ...EXAMPLE, bankroll, fraction: 0.5 }),
}));

const brl = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" });
const pct = new Intl.NumberFormat("pt-BR", {
  style: "percent",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});
const odd = new Intl.NumberFormat("pt-BR", { minimumFractionDigits: 2 });

const FAQ_ITEMS = [
  {
    question: "Quanto devo apostar por aposta?",
    answer:
      "Depende da sua vantagem sobre a odd. O critério de Kelly calcula a porcentagem ideal da banca a partir da odd e da probabilidade que você estima. Se a aposta não tiver valor esperado positivo, a stake sugerida é zero: não aposte.",
  },
  {
    question: "O que é o critério de Kelly?",
    answer:
      "É uma fórmula criada em 1956 por John L. Kelly Jr., pesquisador da Bell Labs, que define a fração da banca que maximiza o crescimento do capital no longo prazo. Nas apostas esportivas, ela indica o tamanho da stake com base na odd e na sua probabilidade estimada.",
  },
  {
    question: "Qual a fórmula de Kelly para apostas?",
    answer:
      "f* = (b × p − q) ÷ b, onde b é a odd decimal menos 1, p é a probabilidade de acerto em decimal e q é a probabilidade de erro (1 − p). O resultado é a fração da banca a apostar.",
  },
  {
    question: "Qual a diferença entre Kelly Full, Half Kelly e Quarter Kelly?",
    answer:
      "Kelly Full aposta 100% da fração calculada e é o mais agressivo. Half Kelly aposta metade e reduz muito a oscilação da banca, abrindo mão de pouco crescimento. Quarter Kelly aposta um quarto e é indicado para quem tem menos confiança na própria estimativa.",
  },
  {
    question: "Por que a calculadora limita a stake a 10% da banca?",
    answer:
      "Porque o Kelly pressupõe que a sua probabilidade estimada está correta. Na prática, erros de estimativa são comuns e, com stakes altas, poucas derrotas seguidas causam grandes perdas. O teto de 10% é uma trava de segurança contra esse risco.",
  },
  {
    question: "O critério de Kelly funciona se eu errar a probabilidade?",
    answer:
      "Não da forma esperada. Superestimar a probabilidade faz o Kelly sugerir apostas maiores do que deveriam ser, o que aumenta o risco de quebra. Por isso é comum usar Half ou Quarter Kelly como margem de segurança.",
  },
  {
    question: "Qual a diferença entre critério de Kelly e Martingale?",
    answer:
      "O Kelly ajusta a aposta à vantagem e nunca arrisca toda a banca. O Martingale dobra a aposta após cada derrota para recuperar perdas, o que exige banca ilimitada e pode zerar o saldo em uma sequência negativa. O Kelly é um método de gestão de risco; o Martingale é de alto risco.",
  },
  {
    question: "O que é probabilidade implícita da odd?",
    answer:
      "É a chance de acerto que a própria odd representa, calculada por 1 ÷ odd. Uma odd de 2,00 implica 50%. Se a sua probabilidade estimada for maior que a implícita, a aposta tem valor esperado positivo (EV+).",
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
  { property: "og:title", content: "Calculadora de Gestão de Banca (Critério de Kelly)" },
  { property: "og:description", content: SEO.description },
  { property: "og:type", content: "website" },
  { property: "og:url", content: PAGE_URL },
  { property: "og:image", content: OG_IMAGE },
  { property: "og:image:width", content: "1200" },
  { property: "og:image:height", content: "630" },
  { property: "og:image:alt", content: "Calculadora de gestão de banca pelo critério de Kelly" },
  { property: "og:site_name", content: APP_NAME },
  { property: "og:locale", content: "pt_BR" },
  { name: "twitter:card", content: "summary_large_image" },
  { name: "twitter:title", content: "Calculadora Critério de Kelly – Quanto Apostar" },
  { name: "twitter:description", content: SEO.description },
  { name: "twitter:image", content: OG_IMAGE },
  { tagName: "link", rel: "canonical", href: PAGE_URL },
  {
    "script:ld+json": {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      name: "Calculadora de Gestão de Banca (Critério de Kelly)",
      url: PAGE_URL,
      description: SEO.description,
      applicationCategory: "FinanceApplication",
      operatingSystem: "Web",
      inLanguage: "pt-BR",
      isAccessibleForFree: true,
      offers: { "@type": "Offer", price: "0", priceCurrency: "BRL" },
      featureList: [
        "Stake ideal pelo critério de Kelly",
        "Kelly Full, Half Kelly e Quarter Kelly",
        "Alerta de valor esperado (EV+ / EV-)",
        "Limite de segurança de 10% da banca",
        "Probabilidade implícita da odd",
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
        { "@type": "ListItem", position: 3, name: "Apostas", item: `${APP_URL}/calculadoras/apostas` },
        { "@type": "ListItem", position: 4, name: "Critério de Kelly", item: PAGE_URL },
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

export default function CriterioDeKellyPage() {
  return (
    <div className="mx-auto max-w-2xl space-y-8 px-4 md:max-w-4xl lg:max-w-6xl" lang="pt-BR">
      <Breadcrumb>
        <BreadcrumbItem href="/">Início</BreadcrumbItem>
        <BreadcrumbItem href="/calculadoras">Calculadoras</BreadcrumbItem>
        <BreadcrumbItem href="/calculadoras/apostas">Apostas</BreadcrumbItem>
        <BreadcrumbItem isLast>Critério de Kelly</BreadcrumbItem>
      </Breadcrumb>

      <header className="space-y-4 text-center">
        <h1 className="mb-4 text-3xl font-bold text-text-primary md:text-4xl">
          Calculadora de Gestão de Banca 2026 – Critério de Kelly
        </h1>
        <p className="mx-auto max-w-3xl text-lg text-text-secondary-dark">
          Descubra <strong className="text-growth-green">quanto apostar</strong> em cada palpite.
          Informe sua banca, a odd e a probabilidade estimada para receber a{" "}
          <strong className="text-primary-blue-dark">stake ideal</strong>, o valor esperado (EV+) e
          um limite de segurança para proteger seu saldo.
        </p>
        <div className="inline-block rounded-lg bg-growth-green-soft p-4 duration-300">
          <p className="text-sm font-medium text-text-primary">
            📐 <strong>Stake Ideal</strong> • ⚖️ <strong>Half Kelly</strong> • 🛡️{" "}
            <strong>Limite de 10%</strong>
          </p>
        </div>
      </header>

      <KellyCriterionCalculator />

      {/* Seção: Critério de Kelly - Guia Completo */}
      <Card className="border-l-4 border-primary-blue bg-gradient-to-r from-primary-blue-light to-growth-green-soft duration-300">
        <CardHeader>
          <CardTitle as="h2" className="text-2xl font-bold text-text-primary">
            🎯 Critério de Kelly – Guia Completo 2026
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-8">
            {/* Fórmula */}
            <div className="rounded-xl border border-primary-blue/20 bg-gray-900 p-6">
              <h3 className="mb-4 flex items-center text-xl font-bold text-primary-blue-dark">
                📐 Fórmula de Kelly com Exemplo Prático
              </h3>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <h4 className="mb-3 font-semibold text-growth-green">🔍 O que é</h4>
                  <p className="mb-4 text-sm text-text-secondary">
                    Criado em 1956 por John L. Kelly Jr., pesquisador da Bell Labs, o critério de
                    Kelly define a fração da banca que maximiza o crescimento do capital no longo
                    prazo. Nas apostas, ele indica o tamanho da stake a partir da odd e da sua
                    probabilidade estimada.
                  </p>

                  <h4 className="mb-3 font-semibold text-system-info">📊 Fórmula</h4>
                  <ul className="mb-4 space-y-1 text-sm text-text-secondary">
                    <li>• f* = (b × p − q) ÷ b</li>
                    <li>• b = odd − 1 (lucro por real apostado)</li>
                    <li>• p = probabilidade de acerto</li>
                    <li>• q = 1 − p (probabilidade de erro)</li>
                  </ul>
                </div>

                <div>
                  <h4 className="mb-3 font-semibold text-system-success">
                    ✅ Exemplo: odd {odd.format(EXAMPLE.odds)} e {EXAMPLE.probabilityPercent}%
                  </h4>
                  <ul className="mb-4 space-y-1 text-sm text-text-secondary">
                    <li>• b = {odd.format(EXAMPLE.odds - 1)}, p = 0,55 e q = 0,45</li>
                    <li>• f* = (1,10 × 0,55 − 0,45) ÷ 1,10</li>
                    <li>
                      • f* ={" "}
                      <strong className="text-text-primary">
                        {pct.format(EXAMPLE_FULL.fullKelly)}
                      </strong>{" "}
                      da banca (Kelly Full)
                    </li>
                  </ul>

                  <h4 className="mb-3 font-semibold text-system-warning">📝 Leitura do resultado</h4>
                  <ul className="space-y-1 text-sm text-text-secondary">
                    <li>
                      • Probabilidade implícita da odd:{" "}
                      {pct.format(EXAMPLE_FULL.impliedProbability)}
                    </li>
                    <li>
                      • Valor esperado: +{pct.format(EXAMPLE_FULL.expectedValuePerUnit)} por real
                    </li>
                    <li>• Resultado positivo = aposta de valor (EV+)</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Quanto apostar */}
            <div className="rounded-xl border border-growth-green/20 bg-gray-900 p-6">
              <h3 className="mb-4 flex items-center text-xl font-bold text-growth-green">
                💰 Quanto Apostar com Banca de R$ 100, R$ 500 e R$ 1.000
              </h3>
              <p className="mb-4 text-sm text-text-secondary">
                Como o Kelly trabalha com porcentagem, a stake acompanha o tamanho da banca. Para a
                mesma aposta do exemplo (odd {odd.format(EXAMPLE.odds)}, 55%) usando Half Kelly:
              </p>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                {BANKROLL_EXAMPLES.map(({ bankroll, result }) => (
                  <div key={bankroll} className="rounded-lg bg-growth-green-soft p-4 text-center">
                    <div className="text-sm text-text-secondary">
                      Banca de {brl.format(bankroll)}
                    </div>
                    <div className="mt-1 text-2xl font-bold text-growth-green">
                      {brl.format(result.stake)}
                    </div>
                    <div className="text-xs text-gray-400">
                      {pct.format(result.suggestedFraction)} da banca
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* EV e limite */}
            <div className="rounded-xl border border-system-warning/20 bg-gray-900 p-6">
              <h3 className="mb-4 flex items-center text-xl font-bold text-system-warning">
                🛡️ Aposta de Valor e Limite de Segurança
              </h3>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <h4 className="mb-3 font-semibold text-growth-green">
                    📈 Aposta de valor (EV+) e probabilidade implícita
                  </h4>
                  <p className="mb-4 text-sm text-text-secondary">
                    Toda odd carrega uma probabilidade implícita, calculada por 1 ÷ odd. A aposta
                    só tem valor quando a sua probabilidade estimada é maior que essa. Caso
                    contrário, o Kelly dá zero ou negativo e a calculadora exibe o alerta{" "}
                    <strong className="text-system-error">“NÃO APOSTE”</strong>.
                  </p>
                </div>

                <div>
                  <h4 className="mb-3 font-semibold text-system-warning">
                    🔒 Por que limitar a {Math.round(MAX_STAKE_FRACTION * 100)}% da banca?
                  </h4>
                  <p className="mb-4 text-sm text-text-secondary">
                    O Kelly assume que a sua probabilidade está correta, mas estimativas costumam
                    ser otimistas. Com stakes altas, poucas derrotas derrubam a banca: quem perde
                    50% precisa de 100% de lucro para voltar ao ponto inicial. Por isso a
                    calculadora nunca sugere mais que {Math.round(MAX_STAKE_FRACTION * 100)}%.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Seção: Kelly Full x Half x Quarter */}
      <Card className="border border-neutral-surface-variant bg-background-dark-secondary duration-300">
        <CardHeader>
          <CardTitle as="h2" className="text-xl font-bold text-text-primary">
            ⚖️ Tabela Comparativa: Kelly Full, Half Kelly e Quarter Kelly
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4 text-sm text-text-secondary">
            Mesma aposta do exemplo (odd {odd.format(EXAMPLE.odds)}, probabilidade de 55%) com
            banca de {brl.format(EXAMPLE.bankroll)}:
          </p>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="border-b-2 border-neutral-surface-variant">
                  <th className="p-3 text-left font-semibold">Ajuste de risco</th>
                  <th className="p-3 text-center font-semibold text-primary-blue-dark">
                    % da banca
                  </th>
                  <th className="p-3 text-center font-semibold text-growth-green">Stake</th>
                  <th className="p-3 text-center font-semibold text-system-warning">Perfil</th>
                </tr>
              </thead>
              <tbody>
                {EXAMPLE_ROWS.map((row, index) => (
                  <tr
                    key={row.value}
                    className={
                      index < EXAMPLE_ROWS.length - 1 ? "border-b border-neutral-surface-variant" : ""
                    }
                  >
                    <td className="p-3 font-medium">{row.label}</td>
                    <td className="p-3 text-center text-primary-blue-dark">
                      {pct.format(row.result.suggestedFraction)}
                      {row.result.isCapped && (
                        <span className="block text-xs text-system-warning">
                          limitado (Kelly: {pct.format(row.result.adjustedKelly)})
                        </span>
                      )}
                    </td>
                    <td className="p-3 text-center font-semibold text-growth-green">
                      {brl.format(row.result.stake)}
                    </td>
                    <td className="p-3 text-center">{row.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className="rounded-lg border border-primary-blue/20 bg-primary-blue-light p-4">
              <h3 className="mb-2 font-bold text-primary-blue-dark">📏 Stake Fixa</h3>
              <p className="text-sm text-text-secondary">
                Mesmo valor em toda aposta. <strong>Risco baixo</strong>, mas não se adapta ao
                tamanho da banca. Veja a porcentagem que ela representa na{" "}
                <Link to="/calculadoras/matematica/porcentagem" className={linkClass}>
                  calculadora de porcentagem
                </Link>
                .
              </p>
            </div>

            <div className="rounded-lg border border-growth-green/20 bg-growth-green-soft p-4">
              <h3 className="mb-2 font-bold text-growth-green">📐 Critério de Kelly</h3>
              <p className="text-sm text-text-secondary">
                Stake proporcional à vantagem sobre a odd. <strong>Risco moderado</strong>, menor
                com Half Kelly. Usa a mesma lógica dos{" "}
                <Link to="/calculadoras/financas/juros-compostos" className={linkClass}>
                  juros compostos
                </Link>
                .
              </p>
            </div>

            <div className="rounded-lg border border-system-warning/20 bg-system-warning/10 p-4">
              <h3 className="mb-2 font-bold text-system-warning">🎲 Martingale</h3>
              <p className="text-sm text-text-secondary">
                Dobra a aposta após cada derrota. <strong>Risco muito alto</strong>: uma sequência
                negativa pode zerar a banca antes da recuperação.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <FAQ
        title="Perguntas Frequentes - Calculadora Critério de Kelly"
        items={FAQ_ITEMS.map((item, index) => ({
          ...item,
          borderColor: FAQ_BORDER_COLORS[index % FAQ_BORDER_COLORS.length],
        }))}
        tipSection={{
          title: "Dica Importante sobre Gestão de Banca",
          content:
            "<strong>Seja conservador na probabilidade:</strong> o Kelly é tão bom quanto a sua estimativa. Na dúvida, use Half ou Quarter Kelly e registre suas apostas para comparar suas previsões com os resultados reais.",
        }}
        footerText="<strong>Lembre-se:</strong> se a calculadora indicar EV-, não aposte. Nenhuma fórmula transforma uma aposta sem valor em lucro."
      />

      {/* Footer com informações adicionais */}
      <Card className="border-l-4 border-primary-blue bg-primary-blue-light duration-300">
        <CardHeader>
          <CardTitle as="h2" className="text-lg font-bold text-text-primary">
            📚 Como Usar Esta Calculadora de Gestão de Banca
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 text-sm text-text-secondary">
            <p>
              Informe a <strong className="text-primary-blue-dark">banca atual</strong>, a{" "}
              <strong className="text-primary-blue-dark">odd decimal</strong> oferecida e a{" "}
              <strong className="text-primary-blue-dark">probabilidade estimada</strong> de acerto.
              Em seguida, escolha o ajuste de risco:{" "}
              <strong className="text-growth-green">Half Kelly</strong> é o recomendado para a
              maioria dos apostadores.
            </p>
            <p>
              <strong>Funcionalidades:</strong> stake ideal em reais e em porcentagem, Kelly Full,
              Half e Quarter, alerta de valor esperado (EV+ / EV-), probabilidade implícita da odd
              e limite de segurança de 10% da banca.
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
              📐 Cálculo instantâneo • 🔒 Dados não armazenados • 📱 Compatível com todos os
              dispositivos • 🔞 Uso exclusivo para maiores de 18 anos
            </p>
          </div>
        </CardContent>
      </Card>

      <RelatedCalculators category="apostas" currentCalculatorId="criterio-de-kelly" />
    </div>
  );
}
