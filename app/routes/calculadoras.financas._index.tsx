import type { MetaFunction } from "@remix-run/node";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  Breadcrumb,
  BreadcrumbItem,
} from "~/components/ui";
import { RelatedCalculators } from "~/components/RelatedCalculators";
import { CalculatorCard } from "~/components/CalculatorCard";
import { APP_NAME, CALCULATORS } from "~/lib/constants";
import type { Calculator } from "~/types";

export const meta: MetaFunction = () => {
  return [
    { title: `Calculadoras Financeiras - ${APP_NAME}` },
    {
      name: "description",
      content:
        "★ Calculadoras financeiras GRATUITAS para planejamento e investimentos. Juros simples, compostos, primeiro milhão e muito mais. Ferramentas precisas para decisões financeiras inteligentes com conteúdo educativo completo.",
    },
    {
      name: "keywords",
      content:
        "calculadora financeira, juros compostos, juros simples, primeiro milhão, investimento, financiamento, planejamento financeiro, simulação, aportes mensais, matemática financeira, educação financeira, rendimento, poupança, CDI, tesouro direto",
    },
    { name: "author", content: "Calculadora Online BR" },
    { property: "og:title", content: `Calculadoras Financeiras - ${APP_NAME}` },
    {
      property: "og:description",
      content:
        "Planeje suas finanças com nossas calculadoras especializadas. Grátis e fácil de usar.",
    },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary" },
    { name: "twitter:title", content: `Calculadoras Financeiras - ${APP_NAME}` },
    {
      name: "twitter:description",
      content:
        "Ferramentas financeiras gratuitas para planejar investimentos e tomar melhores decisões.",
    },
  ];
};

export default function FinancasIndex() {
  const financasCalculators = CALCULATORS.filter(
    (calc: Calculator) => calc.category === "financas"
  );

  return (
    <div className="space-y-8">
      <Breadcrumb>
        <BreadcrumbItem href="/">Início</BreadcrumbItem>
        <BreadcrumbItem href="/calculadoras">Calculadoras</BreadcrumbItem>
        <BreadcrumbItem isLast>Finanças</BreadcrumbItem>
      </Breadcrumb>

      <header className="space-y-4 text-center">
        <div className="mb-4 flex items-center justify-center space-x-3">
          <span className="text-5xl" role="img" aria-label="Finanças">
            💰
          </span>
          <h1 className="text-3xl font-bold text-text-primary md:text-4xl">
            Calculadoras Financeiras
          </h1>
        </div>
        <p className="mx-auto max-w-3xl text-lg text-text-secondary-dark">
          Planeje seu futuro financeiro com nossas calculadoras especializadas. Ferramentas para
          <strong className="text-growth-green">
            {" "}
            investimentos, financiamentos e planejamento
          </strong>
          que ajudam você a tomar decisões mais inteligentes.
        </p>
      </header>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {financasCalculators.map((calculator: Calculator) => (
          <CalculatorCard key={calculator.id} calculator={calculator} category="financas" />
        ))}
      </div>

      <section className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <Card className="border-l-4 border-growth-green bg-growth-green-soft">
          <CardHeader>
            <CardTitle as="h2" className="text-xl">
              📊 Planejamento Inteligente
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 text-sm text-text-secondary">
              <p>
                <strong className="text-growth-green">Simulações:</strong> Veja cenários antes de
                investir ou financiar
              </p>
              <p>
                <strong className="text-growth-green">Comparações:</strong> Analise diferentes
                opções de investimento
              </p>
              <p>
                <strong className="text-growth-green">Decisões:</strong> Tome escolhas baseadas em
                dados concretos
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-primary-blue bg-primary-blue-light">
          <CardHeader>
            <CardTitle as="h2" className="text-xl">
              💡 Educação Financeira
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 text-sm text-text-secondary">
              <p>
                <strong className="text-primary-blue-dark">Conceitos:</strong> Entenda como
                funcionam juros e investimentos
              </p>
              <p>
                <strong className="text-primary-blue-dark">Exemplos:</strong> Aprenda com casos
                práticos do dia a dia
              </p>
              <p>
                <strong className="text-primary-blue-dark">Estratégias:</strong> Descubra como
                maximizar seus rendimentos
              </p>
            </div>
          </CardContent>
        </Card>
      </section>

      <section className="rounded-lg border-l-4 border-system-info bg-system-info/10 p-6 duration-300">
        <h3 className="mb-2 flex items-center text-lg font-semibold text-text-primary-dark">
          🎯 Maximize seus Resultados
        </h3>
        <p className="text-sm text-text-secondary-dark">
          Use nossas calculadoras para simular diferentes cenários e encontrar as melhores
          oportunidades.
          <strong className="text-growth-green"> Compare opções, entenda os juros compostos</strong>
          e descubra como pequenas diferenças podem gerar grandes resultados ao longo do tempo.
        </p>
      </section>

      <RelatedCalculators category="financas" />
    </div>
  );
}
