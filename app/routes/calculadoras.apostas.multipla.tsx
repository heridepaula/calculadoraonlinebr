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
  MultiplaCalculator,
  accumulatedMargin,
  calculateMultipla,
} from "~/components/calculators/MultiplaCalculator";
import { CALCULATOR_SEO_DATA } from "~/lib/calculator-seo";
import { buildBettingPageMeta, withFaqColors } from "~/lib/betting-page";

const SEO = CALCULATOR_SEO_DATA["multipla"];

// Exemplos calculados pelas mesmas funções da calculadora
const STAKE = 10;
const EXAMPLE_ODDS = [1.8, 2.1, 1.5];
const EXAMPLE = calculateMultipla({ stake: STAKE, odds: EXAMPLE_ODDS });
const MARGIN_PER_SELECTION = 0.05;
const MARGIN_ROWS = [1, 2, 3, 5, 8, 10].map((selections) => {
  const result = calculateMultipla({ stake: STAKE, odds: Array(selections).fill(1.9) });
  return { selections, result, margin: accumulatedMargin(selections, MARGIN_PER_SELECTION) };
});

const brl = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" });
const dec = new Intl.NumberFormat("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
const pct = new Intl.NumberFormat("pt-BR", {
  style: "percent",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});
const pct1 = new Intl.NumberFormat("pt-BR", { style: "percent", maximumFractionDigits: 1 });

const FAQ_ITEMS = [
  {
    question: "Como calcular uma aposta múltipla?",
    answer:
      "Multiplique as odds de todas as seleções para obter a odd combinada e, depois, multiplique pelo valor apostado. Exemplo: odds 1,80, 2,10 e 1,50 dão odd combinada de 5,67; com R$ 10, o retorno é de R$ 56,70.",
  },
  {
    question: "O que acontece se uma seleção da múltipla perder?",
    answer:
      "A múltipla inteira é perdida. Para receber, todas as seleções precisam vencer. É por isso que o retorno é alto: a chance de acertar tudo é baixa.",
  },
  {
    question: "Qual a chance de acertar uma múltipla?",
    answer:
      "A chance implícita é 1 ÷ odd combinada. Uma múltipla com odd combinada de 10,00 tem cerca de 10% de chance implícita, ou 1 em 10. Como cada odd embute a margem da casa, a chance real costuma ser ainda menor.",
  },
  {
    question: "Por que a múltipla é mais vantajosa para a casa?",
    answer:
      "Cada seleção tem uma margem da casa, e na múltipla essas margens se multiplicam. Com 5% de margem por seleção, uma múltipla de 5 jogos tem cerca de 21,6% de margem acumulada, contra 4,8% de uma aposta simples.",
  },
  {
    question: "Quantos jogos colocar na múltipla?",
    answer:
      "Quanto mais seleções, maior o retorno e menor a chance de acerto, com margem acumulada crescente. Múltiplas curtas, de 2 ou 3 seleções, perdem menos para a margem da casa.",
  },
  {
    question: "Múltipla e acumulada são a mesma coisa?",
    answer:
      "Sim. Múltipla, acumulada, combinada e parlay são nomes para a mesma aposta: várias seleções em um único bilhete, pago só se todas vencerem.",
  },
  {
    question: "Posso colocar jogos do mesmo evento na múltipla?",
    answer:
      "Depende da casa. Seleções relacionadas (ex.: vitória do time e mais de 2,5 gols no mesmo jogo) costumam ir para o mercado de criar aposta, com odd própria, porque os resultados não são independentes.",
  },
  {
    question: "A calculadora considera campos vazios?",
    answer:
      "Não. Apenas as odds válidas (maiores que 1,00) entram na conta; campos vazios são ignorados. São necessárias pelo menos 2 odds.",
  },
];

export const meta: MetaFunction = () =>
  buildBettingPageMeta({
    seo: SEO,
    appName: "Calculadora de Apostas Múltiplas",
    breadcrumbName: "Apostas Múltiplas",
    ogTitle: "Calculadora de Apostas Múltiplas (Acumuladas)",
    twitterTitle: "Calculadora de Múltipla – Odd Combinada e Retorno",
    imageAlt: "Calculadora de apostas múltiplas e acumuladas",
    featureList: [
      "Até 20 seleções",
      "Odd combinada e retorno potencial",
      "Chance implícita de acertar tudo",
      "Tabela de odd acumulada por seleção",
    ],
    faq: FAQ_ITEMS,
  });

const linkClass = "font-medium text-primary-blue-dark underline hover:text-primary-blue";

export default function MultiplaPage() {
  return (
    <div className="mx-auto max-w-2xl space-y-8 px-4 md:max-w-4xl lg:max-w-6xl" lang="pt-BR">
      <Breadcrumb>
        <BreadcrumbItem href="/">Início</BreadcrumbItem>
        <BreadcrumbItem href="/calculadoras">Calculadoras</BreadcrumbItem>
        <BreadcrumbItem href="/calculadoras/apostas">Apostas</BreadcrumbItem>
        <BreadcrumbItem isLast>Apostas Múltiplas</BreadcrumbItem>
      </Breadcrumb>

      <header className="space-y-4 text-center">
        <h1 className="mb-4 text-3xl font-bold text-text-primary md:text-4xl">
          Calculadora de Apostas Múltiplas 2026 – Odd Combinada e Retorno
        </h1>
        <p className="mx-auto max-w-3xl text-lg text-text-secondary-dark">
          Some até 20 seleções e veja a <strong className="text-growth-green">odd combinada</strong>
          , o <strong className="text-primary-blue-dark">retorno potencial</strong> e a chance real
          de acertar a sua acumulada antes de fazer o bilhete.
        </p>
        <div className="inline-block rounded-lg bg-growth-green-soft p-4 duration-300">
          <p className="text-sm font-medium text-text-primary">
            🎟️ <strong>Até 20 Seleções</strong> • 📈 <strong>Odd Combinada</strong> • 🎯{" "}
            <strong>Chance de Acerto</strong>
          </p>
        </div>
      </header>

      <MultiplaCalculator />

      <Card className="border-l-4 border-primary-blue bg-gradient-to-r from-primary-blue-light to-growth-green-soft duration-300">
        <CardHeader>
          <CardTitle as="h2" className="text-2xl font-bold text-text-primary">
            🎯 Apostas Múltiplas – Guia Completo 2026
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-8">
            <div className="rounded-xl border border-primary-blue/20 bg-gray-900 p-6">
              <h3 className="mb-4 flex items-center text-xl font-bold text-primary-blue-dark">
                📐 Como Calcular uma Múltipla
              </h3>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <h4 className="mb-3 font-semibold text-growth-green">🔍 O que é</h4>
                  <p className="mb-4 text-sm text-text-secondary">
                    A múltipla (ou acumulada) junta várias seleções em um único bilhete. As odds se
                    multiplicam, o que gera retornos altos, mas o bilhete só é pago se todas as
                    seleções vencerem.
                  </p>
                  <h4 className="mb-3 font-semibold text-system-info">📊 Fórmula</h4>
                  <ul className="mb-4 space-y-1 text-sm text-text-secondary">
                    <li>• odd combinada = odd₁ × odd₂ × … × oddₙ</li>
                    <li>• retorno = valor apostado × odd combinada</li>
                    <li>• chance implícita = 1 ÷ odd combinada</li>
                  </ul>
                </div>
                <div>
                  <h4 className="mb-3 font-semibold text-system-success">
                    ✅ Exemplo: {brl.format(STAKE)} em 3 jogos (odds{" "}
                    {EXAMPLE_ODDS.map((o) => dec.format(o)).join(", ")})
                  </h4>
                  <ul className="mb-4 space-y-1 text-sm text-text-secondary">
                    <li>
                      • Odd combinada: {EXAMPLE_ODDS.map((o) => dec.format(o)).join(" × ")} ={" "}
                      <strong className="text-text-primary">
                        {dec.format(EXAMPLE.combinedOdds)}
                      </strong>
                    </li>
                    <li>
                      • Retorno se acertar tudo:{" "}
                      <strong className="text-growth-green">
                        {brl.format(EXAMPLE.potentialReturn)}
                      </strong>
                    </li>
                    <li>• Chance implícita: {pct.format(EXAMPLE.impliedProbability)}</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-system-warning/20 bg-gray-900 p-6">
              <h3 className="mb-4 flex items-center text-xl font-bold text-system-warning">
                ⚠️ A Margem da Casa se Multiplica
              </h3>
              <p className="text-sm text-text-secondary">
                Cada odd embute uma margem da casa, normalmente entre 4% e 8%. Na múltipla, essas
                margens também se multiplicam: quanto mais seleções, maior a vantagem da casa sobre
                o bilhete. Por isso múltiplas longas pagam muito, mas raramente são boas apostas no
                longo prazo. Para avaliar cada seleção, use a{" "}
                <Link to="/calculadoras/apostas/valor-esperado" className={linkClass}>
                  calculadora de valor esperado (EV+)
                </Link>
                .
              </p>
            </div>

            <div className="rounded-xl border border-growth-green/20 bg-gray-900 p-6">
              <h3 className="mb-4 flex items-center text-xl font-bold text-growth-green">
                🔗 Múltipla, Dutching e Gestão de Banca
              </h3>
              <p className="text-sm text-text-secondary">
                A múltipla exige que todas as seleções vençam; o{" "}
                <Link to="/calculadoras/apostas/dutching" className={linkClass}>
                  dutching
                </Link>{" "}
                faz o oposto e paga se qualquer uma vencer. Como a chance de acerto de múltiplas é
                baixa, aposte valores pequenos em relação à banca e defina o tamanho das apostas com
                o{" "}
                <Link to="/calculadoras/apostas/criterio-de-kelly" className={linkClass}>
                  critério de Kelly
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
            ⚖️ Tabela Comparativa: Número de Seleções e Margem Acumulada
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4 text-sm text-text-secondary">
            Todas as seleções com odd 1,90 e aposta de {brl.format(STAKE)}. A margem acumulada
            considera {pct1.format(MARGIN_PER_SELECTION)} de margem da casa em cada seleção.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="border-b-2 border-neutral-surface-variant">
                  <th className="p-3 text-left font-semibold">Seleções</th>
                  <th className="p-3 text-center font-semibold text-system-warning">
                    Odd combinada
                  </th>
                  <th className="p-3 text-center font-semibold text-growth-green">Retorno</th>
                  <th className="p-3 text-center font-semibold text-primary-blue-dark">
                    Chance implícita
                  </th>
                  <th className="p-3 text-center font-semibold text-system-error">
                    Margem acumulada
                  </th>
                </tr>
              </thead>
              <tbody>
                {MARGIN_ROWS.map(({ selections, result, margin }, index) => (
                  <tr
                    key={selections}
                    className={
                      index < MARGIN_ROWS.length - 1
                        ? "border-b border-neutral-surface-variant"
                        : ""
                    }
                  >
                    <td className="p-3 font-medium">{selections}</td>
                    <td className="p-3 text-center text-system-warning">
                      {dec.format(result.combinedOdds)}
                    </td>
                    <td className="p-3 text-center text-growth-green">
                      {brl.format(result.potentialReturn)}
                    </td>
                    <td className="p-3 text-center text-primary-blue-dark">
                      {pct.format(result.impliedProbability)}
                    </td>
                    <td className="p-3 text-center text-system-error">{pct1.format(margin)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className="rounded-lg border border-growth-green/20 bg-growth-green-soft p-4">
              <h3 className="mb-2 font-bold text-growth-green">✅ 2 a 3 seleções</h3>
              <p className="text-sm text-text-secondary">
                Retorno maior que a simples, com <strong>margem ainda moderada</strong>.
              </p>
            </div>
            <div className="rounded-lg border border-system-warning/20 bg-system-warning/10 p-4">
              <h3 className="mb-2 font-bold text-system-warning">⚖️ 4 a 6 seleções</h3>
              <p className="text-sm text-text-secondary">
                Retorno alto, mas a <strong>chance de acerto cai rápido</strong>.
              </p>
            </div>
            <div className="rounded-lg border border-system-error/20 bg-system-error/10 p-4">
              <h3 className="mb-2 font-bold text-system-error">⛔ 7 ou mais seleções</h3>
              <p className="text-sm text-text-secondary">
                <strong>Loteria</strong>: a margem acumulada passa de 30%. Veja o impacto com a{" "}
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
        title="Perguntas Frequentes - Calculadora de Apostas Múltiplas"
        items={withFaqColors(FAQ_ITEMS)}
        tipSection={{
          title: "Dica Importante sobre Múltiplas",
          content:
            "<strong>Prefira múltiplas curtas:</strong> cada seleção extra aumenta a margem da casa. Se for montar uma acumulada, escolha apenas seleções em que você realmente vê valor.",
        }}
        footerText="<strong>Lembre-se:</strong> na múltipla, uma única seleção errada faz o bilhete inteiro perder."
      />

      <Card className="border-l-4 border-primary-blue bg-primary-blue-light duration-300">
        <CardHeader>
          <CardTitle as="h2" className="text-lg font-bold text-text-primary">
            📚 Como Usar Esta Calculadora de Apostas Múltiplas
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 text-sm text-text-secondary">
            <p>
              Informe o <strong className="text-primary-blue-dark">valor da aposta</strong> e a{" "}
              <strong className="text-primary-blue-dark">odd de cada seleção</strong>. Use{" "}
              <strong>+ Adicionar Seleção</strong> para montar bilhetes de até 20 jogos e clique em{" "}
              <strong className="text-growth-green">Calcular</strong>.
            </p>
            <p>
              <strong>Funcionalidades:</strong> odd combinada, retorno potencial, lucro, chance
              implícita de acertar tudo e tabela mostrando como a odd se acumula a cada seleção.
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
              🎟️ Até 20 seleções • 🔒 Dados não armazenados • 📱 Compatível com todos os
              dispositivos • 🔞 Uso exclusivo para maiores de 18 anos
            </p>
          </div>
        </CardContent>
      </Card>

      <RelatedCalculators category="apostas" currentCalculatorId="multipla" />
    </div>
  );
}
