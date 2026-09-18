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
  PoissonCalculator,
  calculatePoisson,
  fairOdds,
  poissonProbability,
} from "~/components/calculators/PoissonCalculator";
import { CALCULATOR_SEO_DATA } from "~/lib/calculator-seo";
import { buildBettingPageMeta, withFaqColors } from "~/lib/betting-page";

const SEO = CALCULATOR_SEO_DATA["poisson"];

// Exemplo calculado pelas mesmas funções da calculadora
const EXAMPLE = { homeGoals: 1.6, awayGoals: 1.1 };
const RESULT = calculatePoisson(EXAMPLE);
const GOAL_ROWS = [0, 1, 2, 3, 4].map((goals) => ({
  goals,
  home: poissonProbability(goals, EXAMPLE.homeGoals),
  away: poissonProbability(goals, EXAMPLE.awayGoals),
}));
const MARKET_ROWS = [
  { label: "Vitória do mandante", probability: RESULT.homeWin },
  { label: "Empate", probability: RESULT.draw },
  { label: "Vitória do visitante", probability: RESULT.awayWin },
  { label: "Mais de 2,5 gols", probability: RESULT.over[1].probability },
  { label: "Ambos marcam", probability: RESULT.bothTeamsScore },
];

const dec = new Intl.NumberFormat("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
const pct = new Intl.NumberFormat("pt-BR", {
  style: "percent",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

const FAQ_ITEMS = [
  {
    question: "O que é a distribuição de Poisson no futebol?",
    answer:
      "É um modelo estatístico que estima a chance de um time marcar 0, 1, 2 ou mais gols a partir da média de gols esperada. Combinando as distribuições dos dois times, obtém-se a probabilidade de cada placar e de mercados como 1X2, mais/menos gols e ambos marcam.",
  },
  {
    question: "Como calcular a probabilidade de um placar?",
    answer:
      "Calcule a chance de cada time marcar o número de gols do placar com a fórmula de Poisson e multiplique as duas. Com 1,60 e 1,10 gols esperados, o placar 1 x 1 tem cerca de 11,8% de chance.",
  },
  {
    question: "De onde tirar os gols esperados de cada time?",
    answer:
      "O mais comum é usar o xG (gols esperados) ou a média de gols marcados nos últimos jogos: em casa para o mandante e fora para o visitante. Para refinar, ajuste pela média de gols sofridos pelo adversário.",
  },
  {
    question: "O que é odd justa?",
    answer:
      "É a odd sem a margem da casa, calculada por 1 ÷ probabilidade. Se o modelo dá 50% para um resultado, a odd justa é 2,00. Se a casa oferece mais que isso, a aposta pode ter valor esperado positivo.",
  },
  {
    question: "O modelo de Poisson acerta o placar?",
    answer:
      "Não. Ele estima probabilidades, não prevê resultados. Mesmo o placar mais provável costuma ter só 10% a 15% de chance. O modelo é útil para comparar com as odds do mercado, não para garantir acertos.",
  },
  {
    question: "Quais as limitações do modelo de Poisson?",
    answer:
      "Ele supõe que os gols dos dois times são independentes e que a média não muda durante o jogo. Na prática, costuma subestimar um pouco os empates e não considera expulsões, desfalques ou motivação. Use-o como ponto de partida.",
  },
  {
    question: "Como usar o Poisson para achar apostas de valor?",
    answer:
      "Compare a odd justa do modelo com a odd da casa. Se a odd da casa for maior, informe a probabilidade do modelo na calculadora de valor esperado para ver o EV e, se for positivo, use o critério de Kelly para definir o tamanho da aposta.",
  },
  {
    question: "Posso usar o Poisson em outros esportes?",
    answer:
      "Funciona melhor em esportes de placares baixos, como futebol e hóquei. Em basquete ou vôlei, os pontos seguem outros padrões e o modelo não é adequado.",
  },
];

export const meta: MetaFunction = () =>
  buildBettingPageMeta({
    seo: SEO,
    appName: "Calculadora de Poisson para Futebol",
    breadcrumbName: "Poisson (Placar)",
    ogTitle: "Calculadora de Poisson – Probabilidade de Placar no Futebol",
    twitterTitle: "Calculadora de Poisson para Futebol",
    imageAlt: "Calculadora de Poisson com probabilidade de placares de futebol",
    featureList: [
      "Probabilidade de 1X2 e odd justa",
      "Mais/menos gols e ambos marcam",
      "Placares mais prováveis",
      "Matriz de placares de 0 a 5 gols",
    ],
    faq: FAQ_ITEMS,
  });

const linkClass = "font-medium text-primary-blue-dark underline hover:text-primary-blue";

export default function PoissonPage() {
  return (
    <div className="mx-auto max-w-2xl space-y-8 px-4 md:max-w-4xl lg:max-w-6xl" lang="pt-BR">
      <Breadcrumb>
        <BreadcrumbItem href="/">Início</BreadcrumbItem>
        <BreadcrumbItem href="/calculadoras">Calculadoras</BreadcrumbItem>
        <BreadcrumbItem href="/calculadoras/apostas">Apostas</BreadcrumbItem>
        <BreadcrumbItem isLast>Poisson (Placar)</BreadcrumbItem>
      </Breadcrumb>

      <header className="space-y-4 text-center">
        <h1 className="mb-4 text-3xl font-bold text-text-primary md:text-4xl">
          Calculadora de Poisson 2026 – Probabilidade de Placar no Futebol
        </h1>
        <p className="mx-auto max-w-3xl text-lg text-text-secondary-dark">
          Informe os gols esperados de cada time e veja a{" "}
          <strong className="text-growth-green">probabilidade de cada placar</strong>, do 1X2, de
          mais/menos gols e de ambos marcam, com as{" "}
          <strong className="text-primary-blue-dark">odds justas</strong> para comparar com o
          mercado.
        </p>
        <div className="inline-block rounded-lg bg-growth-green-soft p-4 duration-300">
          <p className="text-sm font-medium text-text-primary">
            ⚽ <strong>Placar Exato</strong> • 📊 <strong>1X2 e Gols</strong> • 🎯{" "}
            <strong>Odds Justas</strong>
          </p>
        </div>
      </header>

      <PoissonCalculator />

      <Card className="border-l-4 border-primary-blue bg-gradient-to-r from-primary-blue-light to-growth-green-soft duration-300">
        <CardHeader>
          <CardTitle as="h2" className="text-2xl font-bold text-text-primary">
            🎯 Distribuição de Poisson no Futebol – Guia Completo 2026
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-8">
            <div className="rounded-xl border border-primary-blue/20 bg-gray-900 p-6">
              <h3 className="mb-4 flex items-center text-xl font-bold text-primary-blue-dark">
                📐 Como o Modelo Funciona
              </h3>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <h4 className="mb-3 font-semibold text-growth-green">🔍 A ideia</h4>
                  <p className="mb-4 text-sm text-text-secondary">
                    Gols são eventos raros e relativamente independentes, o que se encaixa na
                    distribuição de Poisson. Com a média de gols esperada de cada time (λ), a
                    fórmula dá a chance de ele marcar 0, 1, 2 ou mais gols.
                  </p>
                  <h4 className="mb-3 font-semibold text-system-info">📊 Fórmulas</h4>
                  <ul className="mb-4 space-y-1 text-sm text-text-secondary">
                    <li>• P(k gols) = e^(−λ) × λ^k ÷ k!</li>
                    <li>• P(placar) = P(gols mandante) × P(gols visitante)</li>
                    <li>• odd justa = 1 ÷ probabilidade</li>
                  </ul>
                </div>
                <div>
                  <h4 className="mb-3 font-semibold text-system-success">
                    ✅ Exemplo: {dec.format(EXAMPLE.homeGoals)} x {dec.format(EXAMPLE.awayGoals)}{" "}
                    gols esperados
                  </h4>
                  <ul className="mb-4 space-y-1 text-sm text-text-secondary">
                    {RESULT.topScores.slice(0, 3).map((score) => (
                      <li key={`${score.home}-${score.away}`}>
                        • Placar {score.home} x {score.away}:{" "}
                        <strong className="text-text-primary">
                          {pct.format(score.probability)}
                        </strong>{" "}
                        (odd justa {dec.format(fairOdds(score.probability))})
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-system-warning/20 bg-gray-900 p-6">
              <h3 className="mb-4 flex items-center text-xl font-bold text-system-warning">
                ⚠️ Limitações do Modelo
              </h3>
              <p className="text-sm text-text-secondary">
                O Poisson trata os gols dos dois times como independentes e com média constante. Por
                isso costuma subestimar um pouco os empates e ignora fatores como expulsões,
                desfalques e motivação. O resultado é uma estimativa estatística, não uma previsão.
              </p>
            </div>

            <div className="rounded-xl border border-growth-green/20 bg-gray-900 p-6">
              <h3 className="mb-4 flex items-center text-xl font-bold text-growth-green">
                🔗 Do Poisson à Aposta de Valor
              </h3>
              <p className="text-sm text-text-secondary">
                A probabilidade do modelo é a &quot;probabilidade estimada&quot; que as outras
                calculadoras pedem. Informe-a na{" "}
                <Link to="/calculadoras/apostas/valor-esperado" className={linkClass}>
                  calculadora de valor esperado (EV+)
                </Link>{" "}
                para saber se a odd da casa tem valor e, se tiver, defina o tamanho da aposta com o{" "}
                <Link to="/calculadoras/apostas/criterio-de-kelly" className={linkClass}>
                  critério de Kelly
                </Link>
                . Para vários placares ao mesmo tempo, use o{" "}
                <Link to="/calculadoras/apostas/dutching" className={linkClass}>
                  dutching
                </Link>
                .
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border border-neutral-surface-variant bg-background-dark-secondary duration-300">
        <CardHeader>
          <CardTitle as="h2" className="text-xl font-bold text-text-primary">
            ⚖️ Tabela Comparativa: Exemplo com {dec.format(EXAMPLE.homeGoals)} x{" "}
            {dec.format(EXAMPLE.awayGoals)} Gols Esperados
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-sm">
                <caption className="mb-2 text-left text-sm text-text-secondary">
                  Chance de cada time marcar exatamente N gols
                </caption>
                <thead>
                  <tr className="border-b-2 border-neutral-surface-variant">
                    <th className="p-3 text-left font-semibold">Gols</th>
                    <th className="p-3 text-center font-semibold text-system-warning">Mandante</th>
                    <th className="p-3 text-center font-semibold text-primary-blue-dark">
                      Visitante
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {GOAL_ROWS.map(({ goals, home, away }, index) => (
                    <tr
                      key={goals}
                      className={
                        index < GOAL_ROWS.length - 1
                          ? "border-b border-neutral-surface-variant"
                          : ""
                      }
                    >
                      <td className="p-3 font-medium">{goals}</td>
                      <td className="p-3 text-center text-system-warning">{pct.format(home)}</td>
                      <td className="p-3 text-center text-primary-blue-dark">{pct.format(away)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-sm">
                <caption className="mb-2 text-left text-sm text-text-secondary">
                  Mercados do jogo e odds justas
                </caption>
                <thead>
                  <tr className="border-b-2 border-neutral-surface-variant">
                    <th className="p-3 text-left font-semibold">Mercado</th>
                    <th className="p-3 text-center font-semibold text-growth-green">
                      Probabilidade
                    </th>
                    <th className="p-3 text-center font-semibold text-system-warning">Odd justa</th>
                  </tr>
                </thead>
                <tbody>
                  {MARKET_ROWS.map(({ label, probability }, index) => (
                    <tr
                      key={label}
                      className={
                        index < MARKET_ROWS.length - 1
                          ? "border-b border-neutral-surface-variant"
                          : ""
                      }
                    >
                      <td className="p-3 font-medium">{label}</td>
                      <td className="p-3 text-center text-growth-green">
                        {pct.format(probability)}
                      </td>
                      <td className="p-3 text-center text-system-warning">
                        {dec.format(fairOdds(probability))}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className="mt-4 text-sm text-text-secondary">
            Para comparar probabilidades com as odds de outros formatos, use o{" "}
            <Link to="/calculadoras/apostas/conversor-de-odds" className={linkClass}>
              conversor de odds
            </Link>
            .
          </p>
        </CardContent>
      </Card>

      <FAQ
        title="Perguntas Frequentes - Calculadora de Poisson"
        items={withFaqColors(FAQ_ITEMS)}
        tipSection={{
          title: "Dica Importante sobre o Modelo de Poisson",
          content:
            "<strong>A qualidade da entrada define o resultado:</strong> gols esperados mal estimados geram probabilidades erradas. Prefira xG de várias partidas a médias de poucos jogos.",
        }}
        footerText="<strong>Lembre-se:</strong> o modelo estima chances; nenhum placar é garantido."
      />

      <Card className="border-l-4 border-primary-blue bg-primary-blue-light duration-300">
        <CardHeader>
          <CardTitle as="h2" className="text-lg font-bold text-text-primary">
            📚 Como Usar Esta Calculadora de Poisson
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 text-sm text-text-secondary">
            <p>
              Informe os <strong className="text-primary-blue-dark">gols esperados</strong> do
              mandante e do visitante (xG ou média de gols) e clique em{" "}
              <strong className="text-growth-green">Calcular</strong>.
            </p>
            <p>
              <strong>Funcionalidades:</strong> probabilidade e odd justa de 1X2, mais/menos gols e
              ambos marcam, placares mais prováveis e matriz de placares de 0 a 5 gols.
            </p>
            <p className="mt-4 border-t border-primary-blue/20 pt-3 text-xs opacity-75">
              ⚽ Modelo de Poisson • 🔒 Dados não armazenados • 📱 Compatível com todos os
              dispositivos • 🔞 Uso exclusivo para maiores de 18 anos
            </p>
          </div>
        </CardContent>
      </Card>

      <RelatedCalculators category="apostas" currentCalculatorId="poisson" />
    </div>
  );
}
