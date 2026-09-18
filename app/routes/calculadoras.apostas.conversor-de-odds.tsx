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
  ConversorOddsCalculator,
  convertFromDecimal,
  formatAmerican,
} from "~/components/calculators/ConversorOddsCalculator";
import { CALCULATOR_SEO_DATA } from "~/lib/calculator-seo";
import { buildBettingPageMeta, withFaqColors } from "~/lib/betting-page";

const SEO = CALCULATOR_SEO_DATA["conversor-de-odds"];

// Tabela de referência gerada pela mesma função da calculadora
const COMMON_ODDS = [1.25, 1.5, 1.8, 1.91, 2, 2.5, 3, 4, 5, 11].map(convertFromDecimal);

const dec = new Intl.NumberFormat("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
const pct = new Intl.NumberFormat("pt-BR", {
  style: "percent",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

const FAQ_ITEMS = [
  {
    question: "Como converter odd fracionária em decimal?",
    answer:
      "Divida o numerador pelo denominador e some 1. A odd 3/2 vira 1 + 1,5 = 2,50; a odd 5/1 vira 6,00. A fração mostra o lucro sobre o valor apostado, e a decimal mostra o retorno total.",
  },
  {
    question: "Como converter odd americana em decimal?",
    answer:
      "Se for positiva, divida por 100 e some 1: +150 vira 2,50. Se for negativa, divida 100 pelo valor (sem o sinal) e some 1: -200 vira 1,50.",
  },
  {
    question: "Como transformar odd em probabilidade?",
    answer:
      "Divida 1 pela odd decimal. A odd 2,00 equivale a 50%, e a odd 4,00 a 25%. Essa é a probabilidade implícita, que inclui a margem da casa.",
  },
  {
    question: "O que significa odd americana positiva e negativa?",
    answer:
      "Positiva (+150) indica quanto você lucra apostando R$ 100: é o azarão. Negativa (-200) indica quanto precisa apostar para lucrar R$ 100: é o favorito.",
  },
  {
    question: "Qual formato de odd é usado no Brasil?",
    answer:
      "O decimal, como 2,50. Frações são comuns no Reino Unido, principalmente em corridas de cavalos, e odds americanas nos Estados Unidos.",
  },
  {
    question: "Por que a odd fracionária aparece como aproximada?",
    answer:
      "Algumas odds decimais não viram frações simples. Nesses casos a calculadora mostra a fração mais próxima com denominador até 100, marcada com ≈.",
  },
  {
    question: "O que é odd 1,91 ou -110?",
    answer:
      "É a odd típica de mercados equilibrados, como handicap e total de pontos. Ela implica 52,4% de chance: a diferença para 50% é a margem da casa.",
  },
  {
    question: "Odds diferentes em formatos diferentes pagam valores diferentes?",
    answer:
      "Não. Os formatos são apenas formas de escrever o mesmo pagamento. Uma odd 2,50, 3/2 ou +150 paga o mesmo lucro sobre o mesmo valor apostado.",
  },
];

export const meta: MetaFunction = () =>
  buildBettingPageMeta({
    seo: SEO,
    appName: "Conversor de Odds",
    breadcrumbName: "Conversor de Odds",
    ogTitle: "Conversor de Odds – Decimal, Fracionária, Americana e %",
    twitterTitle: "Conversor de Odds Grátis",
    imageAlt: "Conversor de odds decimais, fracionárias e americanas",
    featureList: [
      "Odd decimal, fracionária e americana",
      "Probabilidade implícita",
      "Lucro por R$ 100 apostados",
      "Tabela de conversão das odds mais comuns",
    ],
    faq: FAQ_ITEMS,
  });

const linkClass = "font-medium text-primary-blue-dark underline hover:text-primary-blue";

export default function ConversorDeOddsPage() {
  return (
    <div className="mx-auto max-w-2xl space-y-8 px-4 md:max-w-4xl lg:max-w-6xl" lang="pt-BR">
      <Breadcrumb>
        <BreadcrumbItem href="/">Início</BreadcrumbItem>
        <BreadcrumbItem href="/calculadoras">Calculadoras</BreadcrumbItem>
        <BreadcrumbItem href="/calculadoras/apostas">Apostas</BreadcrumbItem>
        <BreadcrumbItem isLast>Conversor de Odds</BreadcrumbItem>
      </Breadcrumb>

      <header className="space-y-4 text-center">
        <h1 className="mb-4 text-3xl font-bold text-text-primary md:text-4xl">
          Conversor de Odds 2026 – Decimal, Fracionária, Americana e Probabilidade
        </h1>
        <p className="mx-auto max-w-3xl text-lg text-text-secondary-dark">
          Converta qualquer odd para os outros formatos e veja a{" "}
          <strong className="text-growth-green">probabilidade implícita</strong> e quanto ela{" "}
          <strong className="text-primary-blue-dark">paga em reais</strong>.
        </p>
        <div className="inline-block rounded-lg bg-growth-green-soft p-4 duration-300">
          <p className="text-sm font-medium text-text-primary">
            🔄 <strong>4 Formatos</strong> • 🎯 <strong>Probabilidade Implícita</strong> • 📋{" "}
            <strong>Tabela de Conversão</strong>
          </p>
        </div>
      </header>

      <ConversorOddsCalculator />

      <Card className="border-l-4 border-primary-blue bg-gradient-to-r from-primary-blue-light to-growth-green-soft duration-300">
        <CardHeader>
          <CardTitle as="h2" className="text-2xl font-bold text-text-primary">
            🎯 Formatos de Odds – Guia Completo 2026
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-8">
            <div className="rounded-xl border border-primary-blue/20 bg-gray-900 p-6">
              <h3 className="mb-4 flex items-center text-xl font-bold text-primary-blue-dark">
                📐 Os 3 Formatos de Odds
              </h3>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                <div>
                  <h4 className="mb-3 font-semibold text-growth-green">🇧🇷 Decimal (2,50)</h4>
                  <p className="text-sm text-text-secondary">
                    Retorno total por real apostado, já incluindo o valor da aposta. R$ 10 na odd
                    2,50 devolvem R$ 25.
                  </p>
                </div>
                <div>
                  <h4 className="mb-3 font-semibold text-system-warning">🇬🇧 Fracionária (3/2)</h4>
                  <p className="text-sm text-text-secondary">
                    Lucro sobre o valor apostado: 3/2 paga R$ 3 de lucro a cada R$ 2 apostados, sem
                    contar a aposta.
                  </p>
                </div>
                <div>
                  <h4 className="mb-3 font-semibold text-primary-blue-dark">🇺🇸 Americana (+150)</h4>
                  <p className="text-sm text-text-secondary">
                    Referência de 100: +150 lucra 150 em uma aposta de 100; -200 precisa de 200
                    apostados para lucrar 100.
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-growth-green/20 bg-gray-900 p-6">
              <h3 className="mb-4 flex items-center text-xl font-bold text-growth-green">
                🔗 Da Probabilidade Implícita ao Valor Esperado
              </h3>
              <p className="text-sm text-text-secondary">
                A probabilidade implícita mostra a chance que a casa atribui ao resultado, já com a
                margem dela. Se a sua estimativa for maior, a aposta pode ter valor: confira na{" "}
                <Link to="/calculadoras/apostas/valor-esperado" className={linkClass}>
                  calculadora de valor esperado (EV+)
                </Link>
                . Para combinar várias odds em um bilhete, use a{" "}
                <Link to="/calculadoras/apostas/multipla" className={linkClass}>
                  calculadora de múltiplas
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
            ⚖️ Tabela de Conversão de Odds
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4 text-sm text-text-secondary">
            As odds mais comuns nos quatro formatos. Frações marcadas com ≈ são aproximadas.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="border-b-2 border-neutral-surface-variant">
                  <th className="p-3 text-left font-semibold text-growth-green">Decimal</th>
                  <th className="p-3 text-center font-semibold text-system-warning">Fracionária</th>
                  <th className="p-3 text-center font-semibold text-primary-blue-dark">
                    Americana
                  </th>
                  <th className="p-3 text-center font-semibold">Probabilidade</th>
                </tr>
              </thead>
              <tbody>
                {COMMON_ODDS.map((odd, index) => (
                  <tr
                    key={odd.decimal}
                    className={
                      index < COMMON_ODDS.length - 1
                        ? "border-b border-neutral-surface-variant"
                        : ""
                    }
                  >
                    <td className="p-3 font-medium text-growth-green">{dec.format(odd.decimal)}</td>
                    <td className="p-3 text-center text-system-warning">
                      {odd.fractional.exact ? "" : "≈ "}
                      {odd.fractional.numerator}/{odd.fractional.denominator}
                    </td>
                    <td className="p-3 text-center text-primary-blue-dark">
                      {formatAmerican(odd.american)}
                    </td>
                    <td className="p-3 text-center">{pct.format(odd.impliedProbability)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-sm text-text-secondary">
            Para calcular a diferença entre duas probabilidades, use a{" "}
            <Link to="/calculadoras/matematica/porcentagem" className={linkClass}>
              calculadora de porcentagem
            </Link>
            .
          </p>
        </CardContent>
      </Card>

      <FAQ
        title="Perguntas Frequentes - Conversor de Odds"
        items={withFaqColors(FAQ_ITEMS)}
        tipSection={{
          title: "Dica Importante sobre Odds",
          content:
            "<strong>Pense em probabilidade:</strong> converter a odd em porcentagem é o jeito mais rápido de saber se ela faz sentido para o seu palpite.",
        }}
        footerText="<strong>Lembre-se:</strong> todos os formatos representam o mesmo pagamento; muda apenas a forma de escrever."
      />

      <Card className="border-l-4 border-primary-blue bg-primary-blue-light duration-300">
        <CardHeader>
          <CardTitle as="h2" className="text-lg font-bold text-text-primary">
            📚 Como Usar Este Conversor de Odds
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 text-sm text-text-secondary">
            <p>
              Escolha o <strong className="text-primary-blue-dark">formato</strong> da odd que você
              tem, digite o valor e clique em{" "}
              <strong className="text-growth-green">Calcular</strong> para ver os outros formatos.
            </p>
            <p>
              <strong>Funcionalidades:</strong> conversão entre decimal, fracionária, americana e
              probabilidade, lucro em uma aposta de R$ 100 e tabela das odds mais comuns.
            </p>
            <p className="mt-4 border-t border-primary-blue/20 pt-3 text-xs opacity-75">
              🔄 4 formatos • 🔒 Dados não armazenados • 📱 Compatível com todos os dispositivos •
              🔞 Uso exclusivo para maiores de 18 anos
            </p>
          </div>
        </CardContent>
      </Card>

      <RelatedCalculators category="apostas" currentCalculatorId="conversor-de-odds" />
    </div>
  );
}
