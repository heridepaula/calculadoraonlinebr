import type { MetaFunction } from "@remix-run/node";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  Breadcrumb,
  BreadcrumbItem,
} from "~/components/ui";
import {
  RelatedCalculators,
  FAQ,
  CategoryHero,
  CategoryStats,
  QuickAccessCard,
} from "~/components";
import { CalculatorCard } from "~/components/CalculatorCard";
import { APP_NAME, CALCULATORS } from "~/lib/constants";
import type { Calculator } from "~/types";

export const meta: MetaFunction = () => {
  return [
    { title: "Calculadoras Matemáticas 2025 – Ferramenta Grátis" },
    {
      name: "description",
      content:
        "Calculadoras matemáticas grátis: porcentagem, regra de três, frações, área e muito mais. Resolva cálculos rápido e fácil com explicações.",
    },
    {
      name: "keywords",
      content:
        "calculadora matemática, porcentagem, regra de três, cálculos, matemática básica, operações matemáticas",
    },
    { name: "author", content: "CalculadoraOnlineBR" },
    { property: "og:title", content: "Calculadoras Matemáticas 2025 – Ferramenta Grátis" },
    {
      property: "og:description",
      content: "Resolva cálculos matemáticos do dia a dia com nossas ferramentas gratuitas.",
    },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary" },
    { name: "twitter:title", content: "Calculadoras Matemáticas 2025 – Ferramenta Grátis" },
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
      <div className="border-border-primary bg-surface-light border-b px-6 py-4">
        <div className="mx-auto max-w-7xl">
          <Breadcrumb>
            <BreadcrumbItem href="/">Início</BreadcrumbItem>
            <BreadcrumbItem href="/calculadoras">Calculadoras</BreadcrumbItem>
            <BreadcrumbItem isLast>Matemática</BreadcrumbItem>
          </Breadcrumb>
        </div>
      </div>

      <CategoryHero
        category="matematica"
        title="Calculadoras"
        subtitle="Matemáticas"
        description="Resolva cálculos matemáticos rapidamente com ferramentas essenciais para **estudos, trabalho e uso pessoal**. Resultados instantâneos com explicações passo a passo."
        badge={{
          icon: "🔢",
          text: "Ferramentas Matemáticas para Estudos e Trabalho",
        }}
        trustIndicators={[
          { color: "bg-system-success", text: "Métodos Testados" },
          { color: "bg-math-purple", text: "Explicações Detalhadas" },
          { color: "bg-primary-blue", text: "Ideal para Estudos" },
        ]}
      />

      {/* Quick Access - Math Essentials */}
      <section className="bg-surface-dark/30 py-12">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="text-2xl font-bold text-text-primary sm:text-3xl">
              🚀 Essenciais da Matemática
            </h2>
            <p className="mt-2 text-text-secondary">
              Começar por aqui: as calculadoras mais usadas no dia a dia
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            <QuickAccessCard
              title="Calculadora de Porcentagem"
              description="Calcule descontos, aumentos, diferenças percentuais e muito mais. Ideal para compras e estudos."
              icon="%"
              href="/calculadoras/matematica/porcentagem"
              category="matematica"
              isPopular={true}
              complexity="basic"
            />
            <QuickAccessCard
              title="Regra de Três"
              description="Resolva proporções e regra de três simples e composta com explicações passo a passo."
              icon="🔢"
              href="/calculadoras/matematica/regra-de-tres"
              category="matematica"
              isPopular={true}
              complexity="basic"
            />
            <QuickAccessCard
              title="Frações"
              description="Some, subtraia, multiplique e divida frações com resultados simplificados automaticamente."
              icon="½"
              href="/calculadoras/matematica/fracoes"
              category="matematica"
              complexity="intermediate"
            />
          </div>
        </div>
      </section>

      {/* Math Stats Section */}
      <CategoryStats
        category="matematica"
        stats={[
          {
            icon: "🧠",
            number: "15+",
            label: "Calculadoras",
            description: "Ferramentas completas",
          },
          {
            icon: "⚙️",
            number: "100%",
            label: "Qualidade",
            description: "Métodos testados",
          },
          {
            icon: "📚",
            number: "Passo",
            label: "Detalhado",
            description: "Explicações completas",
          },
          {
            icon: "🎓",
            number: "Edu",
            label: "Educativo",
            description: "Aprenda fazendo",
          },
        ]}
      />

      {/* Math Calculator Categories */}
      <section className="py-12">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="text-2xl font-bold text-text-primary sm:text-3xl">
              Categorias por Área de Estudo
            </h2>
            <p className="mt-2 text-text-secondary">Organize seus estudos por tema matemático</p>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {/* Basic Operations */}
            <div className="group rounded-2xl bg-gradient-to-br from-math-purple/10 to-math-purple/5 p-8 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-math-purple/25">
              <div className="mb-4 flex items-center space-x-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-math-purple text-white transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110">
                  <span className="text-xl">%</span>
                </div>
                <h3 className="text-xl font-bold text-text-primary">Operações Básicas</h3>
              </div>
              <p className="mb-4 text-sm text-text-secondary">
                Cálculos fundamentais para o dia a dia
              </p>
              <div className="space-y-2">
                <div className="text-sm transition-transform duration-300 group-hover:translate-x-1">
                  <span className="text-math-purple-dark">•</span> Porcentagem
                </div>
                <div
                  className="text-sm transition-transform duration-300 group-hover:translate-x-1"
                  style={{ transitionDelay: "0.1s" }}
                >
                  <span className="text-math-purple-dark">•</span> Regra de Três
                </div>
                <div
                  className="text-sm transition-transform duration-300 group-hover:translate-x-1"
                  style={{ transitionDelay: "0.2s" }}
                >
                  <span className="text-math-purple-dark">•</span> Frações
                </div>
              </div>
            </div>

            {/* Geometry */}
            <div className="rounded-2xl bg-gradient-to-br from-primary-blue/10 to-primary-blue/5 p-8">
              <div className="mb-4 flex items-center space-x-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-blue text-white">
                  <span className="text-xl">📐</span>
                </div>
                <h3 className="text-xl font-bold text-text-primary">Geometria</h3>
              </div>
              <p className="mb-4 text-sm text-text-secondary">Cálculos de formas geométricas</p>
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
              <div className="mb-4 flex items-center space-x-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-system-success text-white">
                  <span className="text-xl">🔣</span>
                </div>
                <h3 className="text-xl font-bold text-text-primary">Álgebra</h3>
              </div>
              <p className="mb-4 text-sm text-text-secondary">
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
      <section className="from-surface-light to-surface bg-gradient-to-r py-16">
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
                Verifique seus cálculos, aprenda métodos de resolução e tenha explicações passo a
                passo de cada operação.
              </p>
            </div>

            <div className="rounded-2xl bg-white/50 p-8 shadow-lg backdrop-blur-sm">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-primary-blue/20">
                <span className="text-2xl">👨‍🏫</span>
              </div>
              <h3 className="mt-6 text-xl font-semibold text-text-primary">Professores</h3>
              <p className="mt-4 text-text-secondary">
                Use como ferramenta de apoio em aulas, demonstrações práticas e correção rápida de
                exercícios.
              </p>
            </div>

            <div className="rounded-2xl bg-white/50 p-8 shadow-lg backdrop-blur-sm">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-system-success/20">
                <span className="text-2xl">💼</span>
              </div>
              <h3 className="mt-6 text-xl font-semibold text-text-primary">Profissionais</h3>
              <p className="mt-4 text-text-secondary">
                Agilize cálculos do trabalho, resolva problemas técnicos e faça conversões
                confiáveis de unidades.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Learning Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-math-purple-dark to-math-purple py-16">
        <div className="absolute inset-0 opacity-20">
          <div className="via-white/8 h-full w-full bg-gradient-to-tl from-transparent to-transparent"></div>
        </div>

        <div className="relative mx-auto max-w-6xl px-6 text-center lg:px-8">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:items-center">
            <div className="text-left lg:text-left">
              <h2 className="animate-pulse text-3xl font-bold text-white sm:text-4xl">
                🧠 Aprenda Matemática Praticando
              </h2>
              <p className="mt-4 text-lg text-math-purple-light">
                Aprenda matemática na prática com{" "}
                <strong>métodos testados e explicações passo a passo</strong> para estudantes e
                profissionais
              </p>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
                <a
                  href="/calculadoras/matematica/porcentagem"
                  className="group inline-flex transform items-center justify-center rounded-xl bg-white px-6 py-3 text-base font-semibold text-math-purple-dark shadow-lg transition-all duration-300 hover:-translate-y-2 hover:bg-gray-50 hover:shadow-2xl focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-math-purple-dark"
                >
                  <span className="mr-2 text-xl group-hover:animate-spin">%</span>
                  Calcular Porcentagem
                  <svg
                    className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </a>

                <a
                  href="/calculadoras/matematica/fracoes"
                  className="group inline-flex transform items-center justify-center rounded-xl border-2 border-white px-6 py-3 text-base font-semibold text-white transition-all duration-300 hover:-translate-y-2 hover:bg-white hover:text-math-purple-dark hover:shadow-2xl focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-math-purple-dark"
                >
                  <span className="mr-2 text-xl group-hover:animate-bounce">½</span>
                  Frações
                </a>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="group rounded-xl bg-white/10 p-6 backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:bg-white/20">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl group-hover:animate-bounce">⚡</span>
                  <div>
                    <h3 className="font-semibold text-white">Instantâneo</h3>
                    <p className="text-sm text-math-purple-light">Resultados em Tempo Real</p>
                  </div>
                </div>
              </div>
              <div className="group rounded-xl bg-white/10 p-6 backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:bg-white/20">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl group-hover:animate-pulse">🎯</span>
                  <div>
                    <h3 className="font-semibold text-white">Confiável</h3>
                    <p className="text-sm text-math-purple-light">Métodos Testados</p>
                  </div>
                </div>
              </div>
              <div className="group rounded-xl bg-white/10 p-6 backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:bg-white/20">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl group-hover:animate-spin">📚</span>
                  <div>
                    <h3 className="font-semibold text-white">Educativo</h3>
                    <p className="text-sm text-math-purple-light">Explicações Detalhadas</p>
                  </div>
                </div>
              </div>
              <div className="group rounded-xl bg-white/10 p-6 backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:bg-white/20">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl group-hover:animate-bounce">🎓</span>
                  <div>
                    <h3 className="font-semibold text-white">Para Todos</h3>
                    <p className="text-sm text-math-purple-light">Estudantes e Profissionais</p>
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
                  <strong className="text-system-success-dark">
                    {" "}
                    calcular descontos em compras
                  </strong>
                  , resolver problemas escolares, fazer conversões de unidades e projetos de
                  construção. Ferramentas que tornam a matemática mais acessível e prática.
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
