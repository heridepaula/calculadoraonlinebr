import type { MetaFunction } from "@remix-run/node";
import {
  RelatedCalculators,
  CategoryHero,
  CategoryStats,
  QuickAccessCard,
  ResponsiveBreadcrumb,
  createCategoryBreadcrumb,
} from "~/components";
import { CalculatorCard } from "~/components/CalculatorCard";
import { APP_NAME, CALCULATORS } from "~/lib/constants";
import type { Calculator } from "~/types";

export const meta: MetaFunction = () => {
  return [
    { title: `Calculadoras Matemáticas 2026 | ${APP_NAME}` },
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
    { name: "robots", content: "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" },
    { rel: "canonical", href: "https://www.calculadoraonlinebr.com.br/calculadoras/matematica" },
    { property: "og:title", content: "Calculadoras Matemáticas 2026 – Ferramenta Grátis" },
    {
      property: "og:description",
      content: "Resolva cálculos matemáticos do dia a dia com nossas ferramentas gratuitas.",
    },
    { property: "og:type", content: "website" },
    { property: "og:url", content: "https://www.calculadoraonlinebr.com.br/calculadoras/matematica" },
    { property: "og:site_name", content: "CalculadoraOnlineBR" },
    { property: "og:locale", content: "pt_BR" },
    { property: "og:image", content: "https://www.calculadoraonlinebr.com.br/og-image-1200x630.webp" },
    { property: "og:image:width", content: "1200" },
    { property: "og:image:height", content: "630" },
    { property: "og:image:alt", content: "Calculadoras Matemáticas - CalculadoraOnlineBR" },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:site", content: "@calculadorabr" },
    { name: "twitter:title", content: "Calculadoras Matemáticas 2026 – Ferramenta Grátis" },
    {
      name: "twitter:description",
      content: "Ferramentas matemáticas gratuitas para resolver cálculos rapidamente.",
    },
    { name: "twitter:image", content: "https://www.calculadoraonlinebr.com.br/og-image-1200x630.webp" },
    {
      "script:ld+json": {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        name: "Calculadoras Matemáticas",
        description: "Calculadoras matemáticas gratuitas: porcentagem, regra de três, frações, equações e mais",
        url: "https://www.calculadoraonlinebr.com.br/calculadoras/matematica",
        inLanguage: "pt-BR",
        isPartOf: { "@type": "WebSite", name: "CalculadoraOnlineBR", url: "https://www.calculadoraonlinebr.com.br" },
        breadcrumb: {
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Início", item: "https://www.calculadoraonlinebr.com.br" },
            { "@type": "ListItem", position: 2, name: "Matemática", item: "https://www.calculadoraonlinebr.com.br/calculadoras/matematica" },
          ],
        },
      },
    },
  ];
};

export default function MatematicaIndex() {
  const matematicaCalculators = CALCULATORS.filter(
    (calc: Calculator) => calc.category === "matematica"
  );

  return (
    <div className="min-h-screen">
      {/* Responsive Breadcrumb Navigation */}
      <ResponsiveBreadcrumb items={createCategoryBreadcrumb("matematica")} />

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
      <section className="bg-surface-dark/30 py-8 sm:py-12">
        <div className="mx-auto max-w-7xl px-3 sm:px-6 lg:px-8">
          <div className="mb-8 text-center sm:mb-12">
            <h2 className="text-xl font-bold text-text-primary sm:text-2xl lg:text-3xl">
              🚀 Essenciais da Matemática
            </h2>
            <p className="mt-2 text-text-secondary">
              Começar por aqui: as calculadoras mais usadas no dia a dia
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
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
              title="Equação do Segundo Grau"
              description="Resolva equações quadráticas usando a fórmula de Bhaskara com explicações passo a passo."
              icon="x²"
              href="/calculadoras/matematica/equacao-segundo-grau"
              category="matematica"
              isPopular={true}
              complexity="intermediate"
            />
            <QuickAccessCard
              title="MMC e MDC"
              description="Calcule o Mínimo Múltiplo Comum e Máximo Divisor Comum de números inteiros."
              icon="🔢"
              href="/calculadoras/matematica/mmc-mdc"
              category="matematica"
              isPopular={true}
              complexity="basic"
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
      <section className="py-8 sm:py-12">
        <div className="mx-auto max-w-7xl px-3 sm:px-6 lg:px-8">
          <div className="mb-8 text-center sm:mb-12">
            <h2 className="text-xl font-bold text-text-primary sm:text-2xl lg:text-3xl">
              Categorias por Área de Estudo
            </h2>
            <p className="mt-2 text-text-secondary">Organize seus estudos por tema matemático</p>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-4 sm:mt-10 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 lg:gap-8">
            {/* Basic Operations */}
            <div className="group rounded-2xl bg-gradient-to-br from-math-purple/10 to-math-purple/5 p-4 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-math-purple/25 sm:p-6 lg:p-8">
              <div className="mb-4 flex items-center space-x-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-math-purple text-white transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110 sm:h-12 sm:w-12">
                  <span className="text-lg sm:text-xl">%</span>
                </div>
                <h3 className="text-lg font-bold text-text-primary sm:text-xl">
                  Operações Básicas
                </h3>
              </div>
              <p className="mb-3 text-xs text-text-secondary sm:mb-4 sm:text-sm">
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
            <div className="rounded-2xl bg-gradient-to-br from-primary-blue/10 to-primary-blue/5 p-4 sm:p-6 lg:p-8">
              <div className="mb-4 flex items-center space-x-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-blue text-white sm:h-12 sm:w-12">
                  <span className="text-lg sm:text-xl">📐</span>
                </div>
                <h3 className="text-lg font-bold text-text-primary sm:text-xl">Geometria</h3>
              </div>
              <p className="mb-3 text-xs text-text-secondary sm:mb-4 sm:text-sm">
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
            <div className="rounded-2xl bg-gradient-to-br from-system-success/10 to-system-success/5 p-4 sm:p-6 lg:p-8">
              <div className="mb-4 flex items-center space-x-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-system-success text-white sm:h-12 sm:w-12">
                  <span className="text-lg sm:text-xl">🔣</span>
                </div>
                <h3 className="text-lg font-bold text-text-primary sm:text-xl">Álgebra</h3>
              </div>
              <p className="mb-3 text-xs text-text-secondary sm:mb-4 sm:text-sm">
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
      <section className="py-8 sm:py-12 lg:py-16">
        <div className="mx-auto max-w-7xl px-3 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-text-primary sm:text-3xl lg:text-4xl">
              Todas as Calculadoras Matemáticas
            </h2>
            <p className="mt-4 text-lg text-text-secondary-dark">
              Ferramentas completas para resolver qualquer problema matemático
            </p>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-4 sm:mt-12 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
            {matematicaCalculators.map((calculator: Calculator) => (
              <CalculatorCard key={calculator.id} calculator={calculator} category="matematica" />
            ))}
          </div>
        </div>
      </section>

      {/* Educational Benefits */}
      <section className="from-surface-light to-surface bg-gradient-to-r py-8 sm:py-12 lg:py-16">
        <div className="mx-auto max-w-7xl px-3 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-xl font-bold text-text-primary sm:text-2xl lg:text-3xl">
              Para Quem São Essas Ferramentas?
            </h2>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-4 sm:mt-12 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 lg:gap-8">
            <div className="rounded-2xl bg-white/50 p-4 shadow-lg backdrop-blur-sm sm:p-6 lg:p-8">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-math-purple/20 sm:h-14 sm:w-14 lg:h-16 lg:w-16">
                <span className="text-xl sm:text-2xl">🎓</span>
              </div>
              <h3 className="mt-4 text-lg font-semibold text-text-primary sm:mt-6 sm:text-xl">
                Estudantes
              </h3>
              <p className="mt-4 text-text-secondary">
                Verifique seus cálculos, aprenda métodos de resolução e tenha explicações passo a
                passo de cada operação.
              </p>
            </div>

            <div className="rounded-2xl bg-white/50 p-8 shadow-lg backdrop-blur-sm">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-primary-blue/20 sm:h-14 sm:w-14 lg:h-16 lg:w-16">
                <span className="text-xl sm:text-2xl">👨‍🏫</span>
              </div>
              <h3 className="mt-4 text-lg font-semibold text-text-primary sm:mt-6 sm:text-xl">
                Professores
              </h3>
              <p className="mt-4 text-text-secondary">
                Use como ferramenta de apoio em aulas, demonstrações práticas e correção rápida de
                exercícios.
              </p>
            </div>

            <div className="rounded-2xl bg-white/50 p-8 shadow-lg backdrop-blur-sm">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-system-success/20 sm:h-14 sm:w-14 lg:h-16 lg:w-16">
                <span className="text-xl sm:text-2xl">💼</span>
              </div>
              <h3 className="mt-4 text-lg font-semibold text-text-primary sm:mt-6 sm:text-xl">
                Profissionais
              </h3>
              <p className="mt-4 text-text-secondary">
                Agilize cálculos do trabalho, resolva problemas técnicos e faça conversões
                confiáveis de unidades.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Learning Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-math-purple-dark to-math-purple py-8 sm:py-12 lg:py-16">
        <div className="absolute inset-0 opacity-20">
          <div className="via-white/8 h-full w-full bg-gradient-to-tl from-transparent to-transparent"></div>
        </div>

        <div className="relative mx-auto max-w-6xl px-3 text-center sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-4 sm:gap-6 lg:grid-cols-2 lg:items-center lg:gap-8">
            <div className="text-left lg:text-left">
              <h2 className="text-2xl font-bold text-white sm:text-3xl lg:text-4xl">
                🧠 Aprenda Matemática Praticando
              </h2>
              <p className="mt-4 text-lg text-math-purple-light">
                Aprenda matemática na prática com{" "}
                <strong>métodos testados e explicações passo a passo</strong> para estudantes e
                profissionais
              </p>

              <div className="mt-4 flex flex-col gap-3 sm:mt-6 sm:flex-row lg:flex-col xl:flex-row">
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

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
              <div className="group rounded-xl bg-white/10 p-4 backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:bg-white/20 sm:p-6">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl group-hover:animate-bounce">⚡</span>
                  <div>
                    <h3 className="font-semibold text-white">Instantâneo</h3>
                    <p className="text-sm text-math-purple-light">Resultados em Tempo Real</p>
                  </div>
                </div>
              </div>
              <div className="group rounded-xl bg-white/10 p-4 backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:bg-white/20 sm:p-6">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">🎯</span>
                  <div>
                    <h3 className="font-semibold text-white">Confiável</h3>
                    <p className="text-sm text-math-purple-light">Métodos Testados</p>
                  </div>
                </div>
              </div>
              <div className="group rounded-xl bg-white/10 p-4 backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:bg-white/20 sm:p-6">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl group-hover:animate-spin">📚</span>
                  <div>
                    <h3 className="font-semibold text-white">Educativo</h3>
                    <p className="text-sm text-math-purple-light">Explicações Detalhadas</p>
                  </div>
                </div>
              </div>
              <div className="group rounded-xl bg-white/10 p-4 backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:bg-white/20 sm:p-6">
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
      <section className="bg-system-success/5 py-8 sm:py-12">
        <div className="mx-auto max-w-4xl px-3 sm:px-6 lg:px-8">
          <div className="rounded-2xl border border-system-success/20 bg-system-success/10 p-4 sm:p-6 lg:p-8">
            <div className="flex items-start space-x-3 sm:space-x-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-system-success/20 sm:h-10 sm:w-10">
                <span className="text-lg sm:text-xl">🎯</span>
              </div>
              <div>
                <h3 className="text-base font-semibold text-text-primary sm:text-lg">
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
