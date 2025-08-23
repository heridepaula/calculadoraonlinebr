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
    <div className="min-h-screen">
      {/* Breadcrumb Navigation */}
      <div className="border-b border-border-primary bg-surface-light px-6 py-4">
        <div className="mx-auto max-w-7xl">
          <Breadcrumb>
            <BreadcrumbItem href="/">Início</BreadcrumbItem>
            <BreadcrumbItem href="/calculadoras">Calculadoras</BreadcrumbItem>
            <BreadcrumbItem isLast>Matemática</BreadcrumbItem>
          </Breadcrumb>
        </div>
      </div>

      {/* Hero Section with Math Theme */}
      <section className="relative overflow-hidden bg-gradient-to-br from-math-purple/5 via-surface to-surface-dark">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-math-purple/10 via-transparent to-transparent"></div>
        
        <div className="relative mx-auto max-w-7xl px-6 py-16 lg:px-8">
          <div className="text-center">
            <div className="mb-8 inline-flex items-center rounded-full bg-math-purple/10 px-4 py-2 text-sm font-medium text-math-purple-dark ring-1 ring-inset ring-math-purple/20">
              <span className="mr-2">🔢</span>
              Ferramentas Matemáticas para Estudos e Trabalho
            </div>
            
            <h1 className="mx-auto max-w-4xl text-4xl font-bold tracking-tight text-text-primary sm:text-5xl lg:text-6xl">
              Calculadoras
              <span className="block bg-gradient-to-r from-math-purple via-math-purple-light to-math-purple bg-clip-text text-transparent">
                Matemáticas
              </span>
            </h1>
            
            <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-text-secondary-dark sm:text-xl">
              Resolva cálculos matemáticos rapidamente com ferramentas essenciais para{" "}
              <strong className="text-math-purple-dark">estudos, trabalho e uso pessoal</strong>.
              Resultados instantâneos com explicações passo a passo.
            </p>
            
            {/* Math-specific Trust Indicators */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4 text-sm text-text-secondary">
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-system-success"></div>
                <span className="font-medium">Algoritmos Validados</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-math-purple"></div>
                <span className="font-medium">Explicações Detalhadas</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-primary-blue"></div>
                <span className="font-medium">Ideal para Estudos</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Math Calculator Categories */}
      <section className="bg-surface-dark/30 py-12">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-text-primary sm:text-3xl">
              Tipos de Cálculos
            </h2>
            <p className="mt-2 text-text-secondary">
              Ferramentas organizadas por área de aplicação
            </p>
          </div>
          
          <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {/* Basic Operations */}
            <div className="rounded-2xl bg-gradient-to-br from-math-purple/10 to-math-purple/5 p-8">
              <div className="flex items-center space-x-3 mb-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-math-purple text-white">
                  <span className="text-xl">%</span>
                </div>
                <h3 className="text-xl font-bold text-text-primary">Operações Básicas</h3>
              </div>
              <p className="text-sm text-text-secondary mb-4">
                Cálculos fundamentais para o dia a dia
              </p>
              <div className="space-y-2">
                <div className="text-sm">
                  <span className="text-math-purple-dark">•</span> Porcentagem
                </div>
                <div className="text-sm">
                  <span className="text-math-purple-dark">•</span> Regra de Três
                </div>
                <div className="text-sm">
                  <span className="text-math-purple-dark">•</span> Frações
                </div>
              </div>
            </div>

            {/* Geometry */}
            <div className="rounded-2xl bg-gradient-to-br from-primary-blue/10 to-primary-blue/5 p-8">
              <div className="flex items-center space-x-3 mb-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-blue text-white">
                  <span className="text-xl">📐</span>
                </div>
                <h3 className="text-xl font-bold text-text-primary">Geometria</h3>
              </div>
              <p className="text-sm text-text-secondary mb-4">
                Cálculos de formas geométricas
              </p>
              <div className="space-y-2">
                <div className="text-sm">
                  <span className="text-primary-blue-dark">•</span> Área e Perímetro
                </div>
                <div className="text-sm">
                  <span className="text-primary-blue-dark">•</span> Volume
                </div>
                <div className="text-sm">
                  <span className="text-primary-blue-dark">•</span> Teorema de Pitágoras
                </div>
              </div>
            </div>

            {/* Algebra */}
            <div className="rounded-2xl bg-gradient-to-br from-system-success/10 to-system-success/5 p-8">
              <div className="flex items-center space-x-3 mb-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-system-success text-white">
                  <span className="text-xl">🔣</span>
                </div>
                <h3 className="text-xl font-bold text-text-primary">Álgebra</h3>
              </div>
              <p className="text-sm text-text-secondary mb-4">
                Resolução de equações e problemas algébricos
              </p>
              <div className="space-y-2">
                <div className="text-sm">
                  <span className="text-system-success-dark">•</span> Equação 2º Grau
                </div>
                <div className="text-sm">
                  <span className="text-system-success-dark">•</span> MMC e MDC
                </div>
                <div className="text-sm">
                  <span className="text-system-success-dark">•</span> Sistemas Lineares
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* All Math Calculators */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-text-primary sm:text-4xl">
              Todas as Calculadoras Matemáticas
            </h2>
            <p className="mt-4 text-lg text-text-secondary-dark">
              Ferramentas completas para resolver qualquer problema matemático
            </p>
          </div>
          
          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {matematicaCalculators.map((calculator: Calculator) => (
              <CalculatorCard key={calculator.id} calculator={calculator} category="matematica" />
            ))}
          </div>
        </div>
      </section>

      {/* Educational Benefits */}
      <section className="bg-gradient-to-r from-surface-light to-surface py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-text-primary sm:text-3xl">
              Para Quem São Essas Ferramentas?
            </h2>
          </div>
          
          <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-2xl bg-white/50 p-8 shadow-lg backdrop-blur-sm">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-math-purple/20">
                <span className="text-2xl">🎓</span>
              </div>
              <h3 className="mt-6 text-xl font-semibold text-text-primary">Estudantes</h3>
              <p className="mt-4 text-text-secondary">
                Verifique seus cálculos, aprenda métodos de resolução e tenha 
                explicações passo a passo de cada operação.
              </p>
            </div>
            
            <div className="rounded-2xl bg-white/50 p-8 shadow-lg backdrop-blur-sm">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-primary-blue/20">
                <span className="text-2xl">👨‍🏫</span>
              </div>
              <h3 className="mt-6 text-xl font-semibold text-text-primary">Professores</h3>
              <p className="mt-4 text-text-secondary">
                Use como ferramenta de apoio em aulas, demonstrações 
                práticas e correção rápida de exercícios.
              </p>
            </div>
            
            <div className="rounded-2xl bg-white/50 p-8 shadow-lg backdrop-blur-sm">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-system-success/20">
                <span className="text-2xl">💼</span>
              </div>
              <h3 className="mt-6 text-xl font-semibold text-text-primary">Profissionais</h3>
              <p className="mt-4 text-text-secondary">
                Agilize cálculos do trabalho, resolva problemas técnicos 
                e faça conversões precisas de unidades.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Speed & Accuracy Section */}
      <section className="bg-gradient-to-r from-math-purple-dark to-math-purple py-16">
        <div className="mx-auto max-w-6xl px-6 text-center lg:px-8">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:items-center">
            <div className="text-left lg:text-left">
              <h2 className="text-3xl font-bold text-white sm:text-4xl">
                Rapidez e Precisão em Cada Cálculo
              </h2>
              <p className="mt-4 text-lg text-math-purple-light">
                Algoritmos matemáticos validados que garantem resultados instantâneos e confiáveis
              </p>
            </div>
            
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="rounded-xl bg-white/10 p-6 backdrop-blur-sm">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">⚡</span>
                  <div>
                    <h3 className="font-semibold text-white">Instantâneo</h3>
                    <p className="text-sm text-math-purple-light">Resultados em Tempo Real</p>
                  </div>
                </div>
              </div>
              <div className="rounded-xl bg-white/10 p-6 backdrop-blur-sm">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">🎯</span>
                  <div>
                    <h3 className="font-semibold text-white">Preciso</h3>
                    <p className="text-sm text-math-purple-light">Algoritmos Validados</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Practical Applications */}
      <section className="bg-system-success/5 py-12">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <div className="rounded-2xl border border-system-success/20 bg-system-success/10 p-8">
            <div className="flex items-start space-x-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-system-success/20">
                <span className="text-xl">🎯</span>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-text-primary">
                  Aplicações Práticas do Dia a Dia
                </h3>
                <p className="mt-2 text-text-secondary">
                  Nossas calculadoras matemáticas são ideais para situações cotidianas:
                  <strong className="text-system-success-dark"> calcular descontos em compras</strong>, 
                  resolver problemas escolares, fazer conversões de unidades e projetos de construção.
                  Ferramentas que tornam a matemática mais acessível e prática.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <RelatedCalculators category="matematica" />
    </div>
  );
}
