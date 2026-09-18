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
import { HedgeCalculator, calculateHedge } from "~/components/calculators/HedgeCalculator";
import { CALCULATOR_SEO_DATA } from "~/lib/calculator-seo";
import { buildBettingPageMeta, withFaqColors } from "~/lib/betting-page";

const SEO = CALCULATOR_SEO_DATA["hedge"];

// Exemplos calculados pela mesma função da calculadora
const BASE = { stake: 100, originalOdds: 3 };
const EQUAL = calculateHedge({ ...BASE, hedgeOdds: 1.8, mode: "igual" });
const RECOVER = calculateHedge({ ...BASE, hedgeOdds: 1.8, mode: "recuperar" });
const HEDGE_ROWS = [1.3, 1.5, 1.8, 2.2, 3].map((hedgeOdds) => ({
  hedgeOdds,
  result: calculateHedge({ ...BASE, hedgeOdds, mode: "igual" }),
}));

const brl = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" });
const dec = new Intl.NumberFormat("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
const signedBrl = (value: number) =>
  `${value > 0.004 ? "+ " : value < -0.004 ? "- " : ""}${brl.format(Math.abs(value))}`;

const FAQ_ITEMS = [
  {
    question: "O que é hedge nas apostas?",
    answer:
      "Hedge é uma aposta no resultado contrário de uma aposta que você já fez, para garantir lucro ou limitar a perda. É comum quando a odd do seu palpite caiu e a do resultado oposto subiu, ou antes do último jogo de uma múltipla.",
  },
  {
    question: "Como calcular o valor do hedge?",
    answer:
      "Para lucro igual nos dois cenários, divida o retorno da aposta original (valor × odd) pela odd atual do resultado contrário. Exemplo: R$ 100 na odd 3,00 com odd contrária de 1,80 pedem R$ 166,67 de proteção, garantindo R$ 33,33 em qualquer resultado.",
  },
  {
    question: "Qual a diferença entre hedge e cash out?",
    answer:
      "O cash out é a casa comprando a sua aposta antes do fim, por um valor que ela define com margem. O hedge é você mesmo apostando no resultado contrário, muitas vezes em outra casa com odd melhor. Compare os dois antes de decidir.",
  },
  {
    question: "Hedge sempre dá lucro?",
    answer:
      "Não. Só há lucro garantido se a odd contrária estiver alta o suficiente. Na aposta de R$ 100 a 3,00, a odd contrária precisa passar de 1,50; abaixo disso o hedge trava um prejuízo, que ainda pode ser menor do que perder a aposta inteira.",
  },
  {
    question: "O que é o modo recuperar a aposta?",
    answer:
      "Em vez de igualar o lucro, você aposta apenas o suficiente para zerar a perda se a aposta original falhar. Se ela vencer, você fica com um lucro maior do que no hedge de lucro igual.",
  },
  {
    question: "Como fazer hedge no futebol, com 3 resultados?",
    answer:
      "Aposte na dupla chance que cobre os outros dois resultados. Se você apostou na vitória do mandante, a proteção é a dupla chance empate ou visitante (X2), e a odd dela é a que vai na calculadora.",
  },
  {
    question: "Vale a pena fazer hedge em múltipla?",
    answer:
      "É uma das situações mais comuns: com todas as seleções certas até o último jogo, apostar contra ele garante parte do prêmio. Use o retorno potencial da múltipla como aposta original (valor apostado × odd combinada).",
  },
  {
    question: "Hedge é o mesmo que surebet?",
    answer:
      "A conta é parecida, mas a surebet é montada desde o início com odds de casas diferentes. O hedge acontece depois, aproveitando uma mudança de odd em uma aposta já feita.",
  },
];

export const meta: MetaFunction = () =>
  buildBettingPageMeta({
    seo: SEO,
    appName: "Calculadora de Hedge e Cash Out",
    breadcrumbName: "Hedge / Cash Out",
    ogTitle: "Calculadora de Hedge – Proteja sua Aposta e Compare com o Cash Out",
    twitterTitle: "Calculadora de Hedge e Cash Out",
    imageAlt: "Calculadora de hedge para proteger apostas esportivas",
    featureList: [
      "Hedge de lucro igual",
      "Hedge para recuperar a aposta",
      "Comparação com e sem hedge",
      "Comparação com o cash out oferecido",
    ],
    faq: FAQ_ITEMS,
  });

const linkClass = "font-medium text-primary-blue-dark underline hover:text-primary-blue";

export default function HedgePage() {
  return (
    <div className="mx-auto max-w-2xl space-y-8 px-4 md:max-w-4xl lg:max-w-6xl" lang="pt-BR">
      <Breadcrumb>
        <BreadcrumbItem href="/">Início</BreadcrumbItem>
        <BreadcrumbItem href="/calculadoras">Calculadoras</BreadcrumbItem>
        <BreadcrumbItem href="/calculadoras/apostas">Apostas</BreadcrumbItem>
        <BreadcrumbItem isLast>Hedge / Cash Out</BreadcrumbItem>
      </Breadcrumb>

      <header className="space-y-4 text-center">
        <h1 className="mb-4 text-3xl font-bold text-text-primary md:text-4xl">
          Calculadora de Hedge 2026 – Proteja sua Aposta e Compare com o Cash Out
        </h1>
        <p className="mx-auto max-w-3xl text-lg text-text-secondary-dark">
          Descubra quanto apostar no resultado contrário para{" "}
          <strong className="text-growth-green">garantir lucro</strong> ou{" "}
          <strong className="text-primary-blue-dark">recuperar o valor apostado</strong>, e veja se
          o cash out da casa vale mais.
        </p>
        <div className="inline-block rounded-lg bg-growth-green-soft p-4 duration-300">
          <p className="text-sm font-medium text-text-primary">
            🛡️ <strong>Lucro Igual</strong> • ♻️ <strong>Recuperar a Aposta</strong> • 💰{" "}
            <strong>Cash Out x Hedge</strong>
          </p>
        </div>
      </header>

      <HedgeCalculator />

      <Card className="border-l-4 border-primary-blue bg-gradient-to-r from-primary-blue-light to-growth-green-soft duration-300">
        <CardHeader>
          <CardTitle as="h2" className="text-2xl font-bold text-text-primary">
            🎯 Hedge nas Apostas – Guia Completo 2026
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-8">
            <div className="rounded-xl border border-primary-blue/20 bg-gray-900 p-6">
              <h3 className="mb-4 flex items-center text-xl font-bold text-primary-blue-dark">
                📐 Como Calcular o Hedge
              </h3>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <h4 className="mb-3 font-semibold text-growth-green">
                    ✅ Lucro igual: {brl.format(BASE.stake)} a {dec.format(BASE.originalOdds)}, odd
                    contrária 1,80
                  </h4>
                  <ul className="mb-4 space-y-1 text-sm text-text-secondary">
                    <li>• proteção = retorno original ÷ odd contrária</li>
                    <li>
                      • {brl.format(BASE.stake * BASE.originalOdds)} ÷ 1,80 ={" "}
                      <strong className="text-text-primary">{brl.format(EQUAL.hedgeStake)}</strong>
                    </li>
                    <li>
                      • Lucro em qualquer resultado:{" "}
                      <strong className="text-growth-green">
                        {signedBrl(EQUAL.guaranteedProfit)}
                      </strong>
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="mb-3 font-semibold text-system-info">♻️ Recuperar a aposta</h4>
                  <ul className="mb-4 space-y-1 text-sm text-text-secondary">
                    <li>• proteção = valor apostado ÷ (odd contrária − 1)</li>
                    <li>
                      • {brl.format(BASE.stake)} ÷ 0,80 ={" "}
                      <strong className="text-text-primary">
                        {brl.format(RECOVER.hedgeStake)}
                      </strong>
                    </li>
                    <li>
                      • Se a original vencer: {signedBrl(RECOVER.profitIfOriginalWins)}; se perder:{" "}
                      {signedBrl(RECOVER.profitIfHedgeWins)}
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-system-warning/20 bg-gray-900 p-6">
              <h3 className="mb-4 flex items-center text-xl font-bold text-system-warning">
                💰 Hedge x Cash Out
              </h3>
              <p className="text-sm text-text-secondary">
                O cash out é prático, mas a casa embute margem no valor oferecido. Fazer o hedge
                você mesmo, de preferência na casa com a melhor odd contrária, costuma render mais.
                Informe o cash out na calculadora para comparar os dois na hora.
              </p>
            </div>

            <div className="rounded-xl border border-growth-green/20 bg-gray-900 p-6">
              <h3 className="mb-4 flex items-center text-xl font-bold text-growth-green">
                🔗 Hedge, Múltiplas e Surebet
              </h3>
              <p className="text-sm text-text-secondary">
                O hedge é muito usado no último jogo de uma{" "}
                <Link to="/calculadoras/apostas/multipla" className={linkClass}>
                  aposta múltipla
                </Link>
                : use o retorno potencial dela como aposta original. Quando as odds de casas
                diferentes já permitem lucro desde o início, a operação é uma{" "}
                <Link to="/calculadoras/apostas/surebet" className={linkClass}>
                  surebet
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
            ⚖️ Tabela Comparativa: Odd Contrária e Lucro Garantido
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4 text-sm text-text-secondary">
            Aposta original de {brl.format(BASE.stake)} na odd {dec.format(BASE.originalOdds)}, com
            hedge de lucro igual.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="border-b-2 border-neutral-surface-variant">
                  <th className="p-3 text-left font-semibold">Odd contrária</th>
                  <th className="p-3 text-center font-semibold text-primary-blue-dark">
                    Aposta de proteção
                  </th>
                  <th className="p-3 text-center font-semibold text-growth-green">
                    Resultado garantido
                  </th>
                </tr>
              </thead>
              <tbody>
                {HEDGE_ROWS.map(({ hedgeOdds, result }, index) => {
                  const color =
                    result.guaranteedProfit > 0.004
                      ? "text-growth-green"
                      : result.guaranteedProfit < -0.004
                        ? "text-system-error"
                        : "text-text-primary";
                  return (
                    <tr
                      key={hedgeOdds}
                      className={
                        index < HEDGE_ROWS.length - 1
                          ? "border-b border-neutral-surface-variant"
                          : ""
                      }
                    >
                      <td className="p-3 font-medium">{dec.format(hedgeOdds)}</td>
                      <td className="p-3 text-center text-primary-blue-dark">
                        {brl.format(result.hedgeStake)}
                      </td>
                      <td className={`p-3 text-center font-semibold ${color}`}>
                        {signedBrl(result.guaranteedProfit)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className="rounded-lg border border-growth-green/20 bg-growth-green-soft p-4">
              <h3 className="mb-2 font-bold text-growth-green">✅ Odd contrária alta</h3>
              <p className="text-sm text-text-secondary">
                <strong>Lucro garantido</strong> em qualquer resultado.
              </p>
            </div>
            <div className="rounded-lg border border-system-warning/20 bg-system-warning/10 p-4">
              <h3 className="mb-2 font-bold text-system-warning">⚖️ Ponto de equilíbrio</h3>
              <p className="text-sm text-text-secondary">
                O hedge <strong>empata</strong>: você recupera o valor apostado.
              </p>
            </div>
            <div className="rounded-lg border border-system-error/20 bg-system-error/10 p-4">
              <h3 className="mb-2 font-bold text-system-error">⛔ Odd contrária baixa</h3>
              <p className="text-sm text-text-secondary">
                O hedge <strong>trava um prejuízo</strong>, menor que perder tudo. Veja a proporção
                com a{" "}
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
        title="Perguntas Frequentes - Calculadora de Hedge"
        items={withFaqColors(FAQ_ITEMS)}
        tipSection={{
          title: "Dica Importante sobre Hedge",
          content:
            "<strong>Compare antes de aceitar o cash out:</strong> a casa oferece um valor com margem embutida. Com a melhor odd contrária do mercado, o hedge costuma garantir mais.",
        }}
        footerText="<strong>Lembre-se:</strong> odds mudam rápido durante o jogo; recalcule antes de confirmar a aposta de proteção."
      />

      <Card className="border-l-4 border-primary-blue bg-primary-blue-light duration-300">
        <CardHeader>
          <CardTitle as="h2" className="text-lg font-bold text-text-primary">
            📚 Como Usar Esta Calculadora de Hedge
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 text-sm text-text-secondary">
            <p>
              Informe o <strong className="text-primary-blue-dark">valor e a odd</strong> da aposta
              que você já fez, a <strong className="text-primary-blue-dark">odd atual</strong> do
              resultado contrário, escolha o objetivo e clique em{" "}
              <strong className="text-growth-green">Calcular</strong>. Informe o cash out oferecido
              para compará-lo com o hedge.
            </p>
            <p>
              <strong>Funcionalidades:</strong> aposta de proteção, lucro em cada cenário, tabela
              com e sem hedge e comparação com o cash out.
            </p>
            <p className="mt-4 border-t border-primary-blue/20 pt-3 text-xs opacity-75">
              🛡️ Hedge e cash out • 🔒 Dados não armazenados • 📱 Compatível com todos os
              dispositivos • 🔞 Uso exclusivo para maiores de 18 anos
            </p>
          </div>
        </CardContent>
      </Card>

      <RelatedCalculators category="apostas" currentCalculatorId="hedge" />
    </div>
  );
}
