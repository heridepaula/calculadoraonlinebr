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
  GestaoBancaCalculator,
  calculateBankroll,
} from "~/components/calculators/GestaoBancaCalculator";
import { CALCULATOR_SEO_DATA } from "~/lib/calculator-seo";
import { buildBettingPageMeta, withFaqColors } from "~/lib/betting-page";

const SEO = CALCULATOR_SEO_DATA["gestao-de-banca"];

// Exemplos calculados pela mesma função da calculadora
const STREAK = 10;
const BANKROLL = 1000;
const UNIT_EXAMPLES = [100, 500, 1000, 5000].map((bankroll) => ({
  bankroll,
  unit: calculateBankroll({ bankroll, unitPercent: 2, losingStreak: 1 }).unit,
}));
const PROFILE_ROWS = [1, 2, 3, 5, 10].map((unitPercent) => ({
  unitPercent,
  result: calculateBankroll({ bankroll: BANKROLL, unitPercent, losingStreak: STREAK }),
}));

const brl = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" });

const FAQ_ITEMS = [
  {
    question: "O que é gestão de banca?",
    answer:
      "É o conjunto de regras que define quanto do dinheiro reservado para apostas será arriscado em cada palpite. O objetivo é sobreviver às sequências de derrotas, que acontecem mesmo com bons palpites, sem zerar a banca.",
  },
  {
    question: "Quanto apostar por jogo?",
    answer:
      "A referência mais usada é entre 1% e 2% da banca por unidade para iniciantes, chegando a 5% em perfis agressivos. Com banca de R$ 1.000 e 2% por unidade, cada unidade vale R$ 20.",
  },
  {
    question: "O que é unidade nas apostas?",
    answer:
      "Unidade é o valor padrão de uma aposta, definido como porcentagem da banca. Palpites de maior confiança podem usar 2 ou 3 unidades, mas nunca valores fora do plano, para que o risco fique sempre sob controle.",
  },
  {
    question: "Qual a diferença entre stake fixa e stake percentual?",
    answer:
      "Na stake fixa você aposta sempre o mesmo valor, calculado sobre a banca inicial. Na stake percentual a aposta é recalculada sobre a banca atual: diminui depois de derrotas e cresce depois de vitórias. A percentual nunca zera a banca, mas desacelera a recuperação.",
  },
  {
    question: "Quantas derrotas seguidas uma banca aguenta?",
    answer:
      "Com stake fixa, 100 ÷ percentual da unidade: 50 derrotas com 2%, 20 com 5% e 10 com 10%. Com stake percentual a banca nunca zera, mas 10 derrotas seguidas com 5% por aposta levam cerca de 40% dela.",
  },
  {
    question: "Sequências de 10 derrotas são comuns?",
    answer:
      "Mais do que parece. Mesmo acertando metade das apostas, em algumas centenas de palpites é provável aparecer uma sequência de 7 a 10 derrotas. Por isso unidades pequenas são recomendadas.",
  },
  {
    question: "Qual a diferença entre gestão por unidades e critério de Kelly?",
    answer:
      "A gestão por unidades usa um percentual fixo definido pelo seu perfil. O critério de Kelly ajusta o tamanho da aposta à vantagem estimada em cada palpite: aposta mais quando a vantagem é maior e zero quando não há valor.",
  },
  {
    question: "Posso aumentar a unidade para recuperar perdas?",
    answer:
      "Não é recomendado. Aumentar as apostas depois de perder (como no Martingale) acelera a quebra da banca. Se sentir vontade de recuperar perdas a qualquer custo, pare e procure ajuda.",
  },
];

export const meta: MetaFunction = () =>
  buildBettingPageMeta({
    seo: SEO,
    appName: "Calculadora de Gestão de Banca por Unidades",
    breadcrumbName: "Gestão de Banca",
    ogTitle: "Calculadora de Gestão de Banca – Unidade e Stake Fixa",
    twitterTitle: "Calculadora de Gestão de Banca – Quanto Apostar",
    imageAlt: "Calculadora de gestão de banca por unidades para apostas",
    featureList: [
      "Valor da unidade por perfil de risco",
      "Stakes de 1, 2 e 3 unidades",
      "Simulação de sequência de derrotas",
      "Comparação entre stake fixa e percentual",
    ],
    faq: FAQ_ITEMS,
  });

const linkClass = "font-medium text-primary-blue-dark underline hover:text-primary-blue";

export default function GestaoDeBancaPage() {
  return (
    <div className="mx-auto max-w-2xl space-y-8 px-4 md:max-w-4xl lg:max-w-6xl" lang="pt-BR">
      <Breadcrumb>
        <BreadcrumbItem href="/">Início</BreadcrumbItem>
        <BreadcrumbItem href="/calculadoras">Calculadoras</BreadcrumbItem>
        <BreadcrumbItem href="/calculadoras/apostas">Apostas</BreadcrumbItem>
        <BreadcrumbItem isLast>Gestão de Banca</BreadcrumbItem>
      </Breadcrumb>

      <header className="space-y-4 text-center">
        <h1 className="mb-4 text-3xl font-bold text-text-primary md:text-4xl">
          Calculadora de Gestão de Banca 2026 – Unidade e Stake por Perfil
        </h1>
        <p className="mx-auto max-w-3xl text-lg text-text-secondary-dark">
          Descubra o <strong className="text-growth-green">valor da sua unidade</strong>, quanto
          apostar conforme a confiança no palpite e{" "}
          <strong className="text-primary-blue-dark">quanto a sua banca aguenta</strong> em uma
          sequência de derrotas.
        </p>
        <div className="inline-block rounded-lg bg-growth-green-soft p-4 duration-300">
          <p className="text-sm font-medium text-text-primary">
            💼 <strong>Valor da Unidade</strong> • 📉 <strong>Simulação de Derrotas</strong> • ⚖️{" "}
            <strong>Fixa x Percentual</strong>
          </p>
        </div>
      </header>

      <GestaoBancaCalculator />

      <Card className="border-l-4 border-primary-blue bg-gradient-to-r from-primary-blue-light to-growth-green-soft duration-300">
        <CardHeader>
          <CardTitle as="h2" className="text-2xl font-bold text-text-primary">
            🎯 Gestão de Banca – Guia Completo 2026
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-8">
            <div className="rounded-xl border border-primary-blue/20 bg-gray-900 p-6">
              <h3 className="mb-4 flex items-center text-xl font-bold text-primary-blue-dark">
                📐 Como Montar sua Gestão de Banca
              </h3>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <h4 className="mb-3 font-semibold text-growth-green">🔍 Passo a passo</h4>
                  <ul className="mb-4 space-y-1 text-sm text-text-secondary">
                    <li>• Separe uma banca que você pode perder sem afetar suas contas</li>
                    <li>• Escolha o tamanho da unidade: 1% a 2% para começar</li>
                    <li>• Aposte 1 a 3 unidades conforme a confiança no palpite</li>
                    <li>• Registre todas as apostas e revise o plano todo mês</li>
                  </ul>
                  <h4 className="mb-3 font-semibold text-system-info">📊 Fórmula</h4>
                  <ul className="mb-4 space-y-1 text-sm text-text-secondary">
                    <li>• unidade = banca × % por unidade</li>
                    <li>• stake = unidade × nível de confiança (1 a 3)</li>
                  </ul>
                </div>
                <div>
                  <h4 className="mb-3 font-semibold text-system-success">
                    ✅ Valor da unidade com 2% da banca
                  </h4>
                  <ul className="mb-4 space-y-1 text-sm text-text-secondary">
                    {UNIT_EXAMPLES.map(({ bankroll, unit }) => (
                      <li key={bankroll}>
                        • Banca de {brl.format(bankroll)}:{" "}
                        <strong className="text-text-primary">{brl.format(unit)}</strong> por
                        unidade
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-system-warning/20 bg-gray-900 p-6">
              <h3 className="mb-4 flex items-center text-xl font-bold text-system-warning">
                ⚖️ Stake Fixa x Stake Percentual
              </h3>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <h4 className="mb-3 font-semibold text-system-error">📏 Stake fixa</h4>
                  <p className="mb-4 text-sm text-text-secondary">
                    Sempre o mesmo valor, calculado sobre a banca inicial. Simples de seguir, mas
                    uma sequência longa de derrotas pode zerar a banca.
                  </p>
                </div>
                <div>
                  <h4 className="mb-3 font-semibold text-primary-blue-dark">📊 Stake percentual</h4>
                  <p className="mb-4 text-sm text-text-secondary">
                    A unidade é recalculada sobre a banca atual: encolhe nas quedas e cresce nas
                    altas. Protege melhor a banca, mas a recuperação é mais lenta.
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-growth-green/20 bg-gray-900 p-6">
              <h3 className="mb-4 flex items-center text-xl font-bold text-growth-green">
                🔗 Unidades, Kelly e Valor Esperado
              </h3>
              <p className="text-sm text-text-secondary">
                A gestão por unidades é o ponto de partida. Quem estima probabilidades pode ir além
                e ajustar a aposta à vantagem de cada palpite com o{" "}
                <Link to="/calculadoras/apostas/criterio-de-kelly" className={linkClass}>
                  critério de Kelly
                </Link>
                , apostando apenas quando a{" "}
                <Link to="/calculadoras/apostas/valor-esperado" className={linkClass}>
                  calculadora de valor esperado
                </Link>{" "}
                indicar EV+.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border border-neutral-surface-variant bg-background-dark-secondary duration-300">
        <CardHeader>
          <CardTitle as="h2" className="text-xl font-bold text-text-primary">
            ⚖️ Tabela Comparativa: Perfil de Risco e Sequência de Derrotas
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4 text-sm text-text-secondary">
            Banca de {brl.format(BANKROLL)} depois de {STREAK} derrotas seguidas.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="border-b-2 border-neutral-surface-variant">
                  <th className="p-3 text-left font-semibold">Unidade</th>
                  <th className="p-3 text-center font-semibold text-growth-green">Valor</th>
                  <th className="p-3 text-center font-semibold text-system-error">
                    Banca (stake fixa)
                  </th>
                  <th className="p-3 text-center font-semibold text-primary-blue-dark">
                    Banca (percentual)
                  </th>
                  <th className="p-3 text-center font-semibold text-system-warning">
                    Derrotas até zerar (fixa)
                  </th>
                </tr>
              </thead>
              <tbody>
                {PROFILE_ROWS.map(({ unitPercent, result }, index) => (
                  <tr
                    key={unitPercent}
                    className={
                      index < PROFILE_ROWS.length - 1
                        ? "border-b border-neutral-surface-variant"
                        : ""
                    }
                  >
                    <td className="p-3 font-medium">{unitPercent}%</td>
                    <td className="p-3 text-center text-growth-green">{brl.format(result.unit)}</td>
                    <td className="p-3 text-center text-system-error">
                      {brl.format(result.fixedFinal)}
                    </td>
                    <td className="p-3 text-center text-primary-blue-dark">
                      {brl.format(result.percentageFinal)}
                    </td>
                    <td className="p-3 text-center text-system-warning">
                      {result.lossesToRuinFixed}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className="rounded-lg border border-growth-green/20 bg-growth-green-soft p-4">
              <h3 className="mb-2 font-bold text-growth-green">✅ 1% a 2%</h3>
              <p className="text-sm text-text-secondary">
                <strong>Conservador</strong>: aguenta longas sequências ruins. Ideal para quem está
                começando.
              </p>
            </div>
            <div className="rounded-lg border border-system-warning/20 bg-system-warning/10 p-4">
              <h3 className="mb-2 font-bold text-system-warning">⚖️ 3% a 5%</h3>
              <p className="text-sm text-text-secondary">
                <strong>Agressivo</strong>: cresce mais rápido, mas 10 derrotas já levam boa parte
                da banca.
              </p>
            </div>
            <div className="rounded-lg border border-system-error/20 bg-system-error/10 p-4">
              <h3 className="mb-2 font-bold text-system-error">⛔ 10% ou mais</h3>
              <p className="text-sm text-text-secondary">
                <strong>Alto risco de quebra</strong>: poucas derrotas zeram a banca. Veja a
                proporção com a{" "}
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
        title="Perguntas Frequentes - Calculadora de Gestão de Banca"
        items={withFaqColors(FAQ_ITEMS)}
        tipSection={{
          title: "Dica Importante sobre Gestão de Banca",
          content:
            "<strong>Defina o plano antes de apostar:</strong> escolha a unidade, o limite de perda do mês e siga as regras mesmo depois de uma sequência ruim. Decidir o tamanho da aposta no calor do jogo é o erro mais comum.",
        }}
        footerText="<strong>Lembre-se:</strong> a banca deve ser um dinheiro que você pode perder sem afetar suas contas."
      />

      <Card className="border-l-4 border-primary-blue bg-primary-blue-light duration-300">
        <CardHeader>
          <CardTitle as="h2" className="text-lg font-bold text-text-primary">
            📚 Como Usar Esta Calculadora de Gestão de Banca
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 text-sm text-text-secondary">
            <p>
              Informe a <strong className="text-primary-blue-dark">banca total</strong>, escolha o{" "}
              <strong className="text-primary-blue-dark">perfil de risco</strong> (ou um percentual
              personalizado), defina quantas derrotas seguidas quer simular e clique em{" "}
              <strong className="text-growth-green">Calcular</strong>.
            </p>
            <p>
              <strong>Funcionalidades:</strong> valor da unidade, stakes de 1 a 3 unidades,
              simulação de derrotas seguidas e gráfico comparando stake fixa e percentual.
            </p>
            <p className="mt-4 border-t border-primary-blue/20 pt-3 text-xs opacity-75">
              💼 Perfis de risco • 🔒 Dados não armazenados • 📱 Compatível com todos os
              dispositivos • 🔞 Uso exclusivo para maiores de 18 anos
            </p>
          </div>
        </CardContent>
      </Card>

      <RelatedCalculators category="apostas" currentCalculatorId="gestao-de-banca" />
    </div>
  );
}
