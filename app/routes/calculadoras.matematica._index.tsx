import type { MetaFunction } from "@remix-run/node";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  Breadcrumb,
  BreadcrumbItem,
} from "~/components/ui";
import { RelatedCalculators, FAQ } from "~/components";
import { CalculatorCard } from "~/components/CalculatorCard";
import { APP_NAME, CALCULATORS } from "~/lib/constants";
import type { Calculator } from "~/types";

export const meta: MetaFunction = () => {
  return [
    { title: `Calculadoras Matemáticas - ${APP_NAME}` },
    {
      name: "description",
      content:
        "Calculadoras matemáticas gratuitas para o dia a dia. Porcentagem, regra de três, conversões e muito mais. Resolva cálculos rapidamente.",
    },
    {
      name: "keywords",
      content:
        "calculadora matemática, porcentagem, regra de três, cálculos, matemática básica, operações matemáticas",
    },
    { name: "author", content: "Calculadora Online BR" },
    { property: "og:title", content: `Calculadoras Matemáticas - ${APP_NAME}` },
    {
      property: "og:description",
      content: "Resolva cálculos matemáticos do dia a dia com nossas ferramentas gratuitas.",
    },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary" },
    { name: "twitter:title", content: `Calculadoras Matemáticas - ${APP_NAME}` },
    {
      name: "twitter:description",
      content: "Ferramentas matemáticas gratuitas para resolver cálculos rapidamente.",
    },
  ];
};

export default function MatematicaIndex() {
  const matematicaCalculators = CALCULATORS.filter(
    (calc: Calculator) => calc.category === "matematica"
  );

  return (
    <div className="space-y-8">
      <Breadcrumb>
        <BreadcrumbItem href="/">Início</BreadcrumbItem>
        <BreadcrumbItem href="/calculadoras">Calculadoras</BreadcrumbItem>
        <BreadcrumbItem isLast>Matemática</BreadcrumbItem>
      </Breadcrumb>

      <header className="space-y-4 text-center">
        <div className="mb-4 flex items-center justify-center space-x-3">
          <span className="text-5xl" role="img" aria-label="Matemática">
            🔢
          </span>
          <h1 className="text-3xl font-bold text-text-primary md:text-4xl">
            Calculadoras Matemáticas
          </h1>
        </div>
        <p className="mx-auto max-w-3xl text-lg text-text-secondary-dark">
          Resolva cálculos matemáticos do dia a dia de forma rápida e precisa. Ferramentas
          essenciais para
          <strong className="text-primary-blue-dark"> estudos, trabalho e uso pessoal</strong>.
          Resultados instantâneos e explicações claras.
        </p>
      </header>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {matematicaCalculators.map((calculator: Calculator) => (
          <CalculatorCard key={calculator.id} calculator={calculator} category="matematica" />
        ))}
      </div>

      <section className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <Card className="border-l-4 border-system-info bg-system-info/10">
          <CardHeader>
            <CardTitle as="h2" className="text-xl">
              ⚡ Rapidez e Precisão
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 text-sm text-text-secondary">
              <p>
                <strong className="text-system-info">Instantâneo:</strong> Resultados calculados em
                tempo real
              </p>
              <p>
                <strong className="text-system-info">Preciso:</strong> Algoritmos matemáticos
                validados
              </p>
              <p>
                <strong className="text-system-info">Simples:</strong> Interface intuitiva para
                qualquer usuário
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-primary-blue bg-primary-blue-light">
          <CardHeader>
            <CardTitle as="h2" className="text-xl">
              📚 Uso Educacional
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 text-sm text-text-secondary">
              <p>
                <strong className="text-primary-blue-dark">Estudantes:</strong> Verifique seus
                cálculos e aprenda
              </p>
              <p>
                <strong className="text-primary-blue-dark">Professores:</strong> Use como ferramenta
                de apoio
              </p>
              <p>
                <strong className="text-primary-blue-dark">Profissionais:</strong> Agilize cálculos
                do trabalho
              </p>
            </div>
          </CardContent>
        </Card>
      </section>

      <section className="rounded-lg border-l-4 border-growth-green bg-growth-green-soft p-6 duration-300">
        <h3 className="mb-2 flex items-center text-lg font-semibold text-text-primary-dark">
          🎯 Aplicações Práticas
        </h3>
        <p className="text-sm text-text-secondary-dark">
          Nossas calculadoras matemáticas são ideais para situações do cotidiano:
          <strong className="text-growth-green"> calcular descontos em compras</strong>, resolver
          problemas escolares, fazer conversões de unidades e muito mais. Ferramentas essenciais que
          tornam a matemática mais acessível.
        </p>
      </section>

      <RelatedCalculators category="matematica" />
    </div>
  );
}
