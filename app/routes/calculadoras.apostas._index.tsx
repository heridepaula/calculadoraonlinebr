import type { MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";
import {
  FAQ,
  RelatedCalculators,
  CategoryHero,
  CategoryStats,
  QuickAccessCard,
  ResponsiveBreadcrumb,
  createCategoryBreadcrumb,
} from "~/components";
import { CalculatorCard } from "~/components/CalculatorCard";
import { BettingDisclaimer } from "~/components/calculators/betting-shared";
import { CALCULATORS } from "~/lib/constants";
import { generateCategoryPageGraph, generateFAQStructuredData } from "~/lib/structured-data";
import type { Calculator } from "~/types";
import { buildCategoryMeta } from "~/lib/page-meta";

const FAQ_ITEMS = [
  {
    question: "O que é gestão de banca nas apostas esportivas?",
    answer:
      "Gestão de banca é o controle do dinheiro separado exclusivamente para apostas. Ela define com antecedência quanto arriscar em cada palpite, geralmente como uma porcentagem da banca, para que uma sequência de derrotas não leve o saldo a zero.",
  },
  {
    question: "Quanto da banca devo apostar por aposta?",
    answer:
      "A referência mais usada é entre 1% e 5% da banca por aposta. O critério de Kelly calcula esse valor com base na sua vantagem sobre a odd: quanto maior o valor esperado, maior a stake sugerida. Se não houver vantagem, a recomendação é não apostar.",
  },
  {
    question: "O que é stake nas apostas?",
    answer:
      "Stake é o valor apostado em um palpite. Ela pode ser fixa (sempre o mesmo valor), percentual (uma porcentagem da banca atual) ou calculada por métodos como o critério de Kelly, que ajusta o tamanho da aposta conforme a vantagem estimada.",
  },
  {
    question: "O que é valor esperado (EV+) em uma aposta?",
    answer:
      "Valor esperado é o lucro ou prejuízo médio por real apostado se a mesma aposta fosse repetida muitas vezes. Uma aposta é EV+ quando a sua probabilidade estimada é maior que a probabilidade implícita da odd (1 ÷ odd). Apostas EV- tendem a gerar prejuízo no longo prazo.",
  },
  {
    question: "As calculadoras garantem lucro?",
    answer:
      "Não. As calculadoras aplicam fórmulas matemáticas sobre os dados que você informa. Se a probabilidade estimada estiver errada, o resultado também estará. Apostas envolvem risco financeiro e são proibidas para menores de 18 anos.",
  },
];

export const meta: MetaFunction = () => [
  ...buildCategoryMeta("apostas"),
  { "script:ld+json": generateCategoryPageGraph("apostas") },
  { "script:ld+json": generateFAQStructuredData(FAQ_ITEMS) },
];

const BANKROLL_METHODS = [
  {
    icon: "📏",
    title: "Stake fixa",
    description:
      "Sempre o mesmo valor por aposta. Simples de seguir, mas não se adapta quando a banca cresce ou diminui.",
  },
  {
    icon: "📊",
    title: "Stake percentual",
    description:
      "Uma porcentagem fixa da banca atual (ex.: 2%). A aposta diminui nas quedas e cresce nas altas.",
  },
  {
    icon: "📐",
    title: "Critério de Kelly",
    description:
      "Calcula a fração ideal da banca a partir da odd e da sua probabilidade estimada. Aposta mais quando a vantagem é maior.",
  },
];

export default function ApostasIndex() {
  const apostasCalculators = CALCULATORS.filter((calc: Calculator) => calc.category === "apostas");

  return (
    <div className="min-h-screen">
      <ResponsiveBreadcrumb items={createCategoryBreadcrumb("apostas")} />

      <CategoryHero
        category="apostas"
        title="Calculadoras de"
        subtitle="Apostas Esportivas"
        description="Faça a **gestão de banca** com matemática: descubra quanto apostar, identifique **apostas de valor (EV+)** e proteja seu saldo com ferramentas gratuitas."
        badge={{ icon: "⚽", text: "Gestão de Banca e Stake Ideal" }}
        trustIndicators={[
          { color: "bg-growth-green", text: "Cálculo Instantâneo" },
          { color: "bg-primary-blue", text: "Sem Cadastro" },
          { color: "bg-system-warning", text: "Jogo Responsável (18+)" },
        ]}
      />

      {/* Acesso rápido */}
      <section className="bg-surface-dark/30 py-8 sm:py-12">
        <div className="mx-auto max-w-7xl px-3 sm:px-6 lg:px-8">
          <div className="mb-8 text-center sm:mb-12">
            <h2 className="text-xl font-bold text-text-primary sm:text-2xl lg:text-3xl">
              🚀 Acesso Rápido
            </h2>
            <p className="mt-2 text-text-secondary">
              Descubra se a aposta tem valor e quanto apostar antes de confirmar o palpite
            </p>
          </div>

          <div className="mx-auto grid max-w-6xl grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 xl:grid-cols-4">
            <QuickAccessCard
              title="Calculadora de Valor Esperado (EV+)"
              description="Veja o EV em reais e em %, a odd justa e a projeção da banca em 100 apostas, com gráficos."
              icon="📈"
              href="/calculadoras/apostas/valor-esperado"
              category="apostas"
              isPopular={true}
              complexity="basic"
            />
            <QuickAccessCard
              title="Calculadora Critério de Kelly"
              description="Informe banca, odd e probabilidade estimada para receber a stake ideal, com Half Kelly e limite de segurança de 10%."
              icon="📐"
              href="/calculadoras/apostas/criterio-de-kelly"
              category="apostas"
              isPopular={true}
              complexity="intermediate"
            />
            <QuickAccessCard
              title="Calculadora de Surebet"
              description="Descubra se as odds de casas diferentes formam uma aposta segura e quanto apostar em cada resultado."
              icon="⚖️"
              href="/calculadoras/apostas/surebet"
              category="apostas"
              complexity="intermediate"
            />
            <QuickAccessCard
              title="Calculadora de Dutching"
              description="Divida o valor entre várias seleções para ter o mesmo lucro qualquer que seja a vencedora."
              icon="🎯"
              href="/calculadoras/apostas/dutching"
              category="apostas"
              complexity="intermediate"
            />
          </div>
        </div>
      </section>

      <CategoryStats
        category="apostas"
        stats={[
          {
            icon: "📐",
            number: String(apostasCalculators.length),
            label: "Calculadoras",
            description: "E novas a caminho",
          },
          {
            icon: "⚡",
            number: "<1s",
            label: "Resultado",
            description: "Resultado em um clique",
          },
          { icon: "🛡️", number: "10%", label: "Limite de stake", description: "Teto de segurança" },
          { icon: "🔞", number: "18+", label: "Responsável", description: "Uso consciente" },
        ]}
      />

      {/* Todas as calculadoras */}
      <section className="py-8 sm:py-12 lg:py-16">
        <div className="mx-auto max-w-7xl px-3 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-text-primary sm:text-3xl lg:text-4xl">
              Todas as Calculadoras de Apostas
            </h2>
            <p className="mt-4 text-base text-text-secondary-dark sm:text-lg">
              Ferramentas matemáticas para decidir o tamanho de cada aposta
            </p>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-4 sm:mt-12 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
            {apostasCalculators.map((calculator: Calculator) => (
              <CalculatorCard key={calculator.id} calculator={calculator} category="apostas" />
            ))}
          </div>
        </div>
      </section>

      {/* Conteúdo educativo */}
      <section className="from-surface-light to-surface bg-gradient-to-r py-8 sm:py-12 lg:py-16">
        <div className="mx-auto max-w-5xl px-3 sm:px-6 lg:px-8">
          <h2 className="text-center text-xl font-bold text-text-primary sm:text-2xl lg:text-3xl">
            O que é gestão de banca?
          </h2>
          <div className="mx-auto mt-4 max-w-3xl space-y-4 text-base leading-relaxed text-text-secondary-dark">
            <p>
              <strong className="text-text-primary">Gestão de banca</strong> é o conjunto de regras
              que define quanto do seu dinheiro reservado para apostas será arriscado em cada
              palpite. Sem ela, poucas derrotas seguidas podem comprometer todo o saldo, mesmo para
              quem escolhe bem as apostas.
            </p>
            <p>
              A base de qualquer método é separar uma{" "}
              <strong className="text-text-primary">banca</strong> (um valor que você pode perder
              sem afetar suas contas) e definir a{" "}
              <strong className="text-text-primary">stake</strong>, que é o valor de cada aposta. Os
              três métodos mais usados são:
            </p>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-6">
            {BANKROLL_METHODS.map((method) => (
              <div
                key={method.title}
                className="rounded-2xl border border-growth-green/20 bg-growth-green/5 p-5 sm:p-6"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-growth-green/20">
                  <span className="text-xl" aria-hidden="true">
                    {method.icon}
                  </span>
                </div>
                <h3 className="mt-4 text-lg font-semibold text-text-primary">{method.title}</h3>
                <p className="mt-2 text-sm text-text-secondary-dark">{method.description}</p>
              </div>
            ))}
          </div>

          <p className="mx-auto mt-8 max-w-3xl text-center text-base text-text-secondary-dark">
            Primeiro, confirme se a aposta tem valor com a{" "}
            <Link
              to="/calculadoras/apostas/valor-esperado"
              className="font-semibold text-growth-green underline underline-offset-4 hover:text-growth-green-dark"
            >
              calculadora de valor esperado (EV+)
            </Link>
            . Depois, defina quanto apostar com a{" "}
            <Link
              to="/calculadoras/apostas/criterio-de-kelly"
              className="font-semibold text-growth-green underline underline-offset-4 hover:text-growth-green-dark"
            >
              calculadora do critério de Kelly
            </Link>
            . E quando casas diferentes discordam nas odds, a{" "}
            <Link
              to="/calculadoras/apostas/surebet"
              className="font-semibold text-growth-green underline underline-offset-4 hover:text-growth-green-dark"
            >
              calculadora de surebet
            </Link>{" "}
            mostra se dá para garantir lucro apostando em todos os resultados. Para apostar em
            vários resultados do mesmo evento com lucro igual, use a{" "}
            <Link
              to="/calculadoras/apostas/dutching"
              className="font-semibold text-growth-green underline underline-offset-4 hover:text-growth-green-dark"
            >
              calculadora de dutching
            </Link>
            .
          </p>
        </div>
      </section>

      <section className="py-8 sm:py-12">
        <div className="mx-auto max-w-5xl px-3 sm:px-6 lg:px-8">
          <FAQ title="Perguntas Frequentes sobre Apostas e Gestão de Banca" items={FAQ_ITEMS} />
        </div>
      </section>

      {/* Conteúdo educativo e jogo responsável */}
      <section className="py-8 sm:py-12">
        <div className="mx-auto max-w-4xl px-3 sm:px-6 lg:px-8">
          <BettingDisclaimer plural />
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-3 py-8 sm:px-6 lg:px-8">
        <RelatedCalculators category="apostas" />
      </div>
    </div>
  );
}
