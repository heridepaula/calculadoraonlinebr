import type { MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";
import { CategoryCard } from "~/components/CategoryCard";
import { APP_NAME, CATEGORIES } from "~/lib/constants";
import type { Category } from "~/types";

export const meta: MetaFunction = () => {
  return [
    { title: `Calculadoras Online Gratuitas - IMC, Juros Compostos, Rescisão | ${APP_NAME}` },
    {
      name: "description",
      content:
        "🧮 Mais de 30 calculadoras online gratuitas: IMC, juros compostos, porcentagem, rescisão trabalhista e mais. Interface moderna, resultados instantâneos, sem cadastro. Mobile otimizado!",
    },
    {
      name: "keywords",
      content:
        "calculadora online gratis, IMC calculadora, juros compostos, porcentagem, rescisao trabalhista, calculadora financeira, calculadora saude, matematica, tesouro direto, aposentadoria INSS",
    },
    { name: "author", content: "CalculadoraOnlineBR" },
    { name: "robots", content: "index, follow" },
    { name: "googlebot", content: "index, follow" },
    { name: "viewport", content: "width=device-width, initial-scale=1.0" },
    {
      property: "og:title",
      content: `Calculadoras Online Gratuitas - Mais de 30 Ferramentas | ${APP_NAME}`,
    },
    {
      property: "og:description",
      content:
        "Calculadoras online gratuitas para saúde, finanças, matemática e direitos trabalhistas. Interface moderna, resultados confiáveis, sem cadastro necessário.",
    },
    { property: "og:type", content: "website" },
    { property: "og:locale", content: "pt_BR" },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: `Calculadoras Online Gratuitas - ${APP_NAME}` },
    {
      name: "twitter:description",
      content:
        "Mais de 30 calculadoras gratuitas: IMC, juros compostos, rescisão trabalhista e muito mais. Use sem cadastro!",
    },
    // Structured Data for SEO
    {
      name: "application-name",
      content: APP_NAME,
    },
    {
      name: "apple-mobile-web-app-title",
      content: APP_NAME,
    },
  ];
};

export default function Index() {
  return (
    <div className="min-h-screen">
      {/* Hero Section with Strategic White Space */}
      <section className="from-surface-light via-surface to-surface-dark relative overflow-hidden bg-gradient-to-br">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary-blue/5 via-transparent to-transparent"></div>

        <div className="relative mx-auto max-w-7xl px-6 py-16 sm:py-24 lg:px-8">
          <div className="text-center">
            {/* Clear Visual Hierarchy */}
            <div className="mb-8 inline-flex items-center rounded-full bg-primary-blue/10 px-4 py-2 text-sm font-medium text-primary-blue-dark ring-1 ring-inset ring-primary-blue/20">
              <span className="mr-2">🆕</span>
              Mais de 30 calculadoras gratuitas disponíveis
            </div>

            <h1 className="mx-auto max-w-4xl text-4xl font-bold tracking-tight text-text-primary sm:text-6xl lg:text-7xl">
              Calculadoras
              <span className="block bg-gradient-to-r from-primary-blue via-primary-blue-light to-primary-blue bg-clip-text text-transparent">
                Online Gratuitas
              </span>
            </h1>

            <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-text-secondary-dark sm:text-xl">
              <strong className="text-text-primary">
                IMC, Juros Compostos, Porcentagem, Rescisão Trabalhista
              </strong>{" "}
              e muito mais. Interface moderna, resultados confiáveis e sem cadastro necessário.
            </p>

            {/* Trust Indicators */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4 text-sm text-text-secondary">
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-system-success"></div>
                <span className="font-medium">100% Gratuito</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-primary-blue"></div>
                <span className="font-medium">Sem Cadastro</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-finance-gold"></div>
                <span className="font-medium">Resultados Instantâneos</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-health-red"></div>
                <span className="font-medium">Mobile Otimizado</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Calculators Quick Access */}
      <section className="bg-surface-dark/50 relative py-12">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-text-primary sm:text-3xl">
              Calculadoras Mais Populares
            </h2>
            <p className="mt-2 text-text-secondary">
              Acesse rapidamente as calculadoras mais utilizadas
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Link
              to="/calculadoras/financas/tesouro-direto"
              className="group rounded-2xl bg-gradient-to-br from-finance-gold/10 to-finance-gold/5 p-6 transition-all duration-300 hover:from-finance-gold/20 hover:to-finance-gold/10 hover:shadow-lg"
            >
              <div className="flex items-center space-x-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-finance-gold text-white">
                  <span className="text-xl">🏛️</span>
                </div>
                <div>
                  <h3 className="font-semibold text-text-primary group-hover:text-finance-gold-dark">
                    Tesouro Direto
                  </h3>
                  <p className="text-xs text-text-secondary">Títulos Públicos</p>
                </div>
              </div>
            </Link>

            <Link
              to="/calculadoras/financas/financiamento-imobiliario"
              className="group rounded-2xl bg-gradient-to-br from-primary-blue/10 to-primary-blue/5 p-6 transition-all duration-300 hover:from-primary-blue/20 hover:to-primary-blue/10 hover:shadow-lg"
            >
              <div className="flex items-center space-x-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-blue text-white">
                  <span className="text-xl">🏠</span>
                </div>
                <div>
                  <h3 className="font-semibold text-text-primary group-hover:text-primary-blue-dark">
                    Financiamento
                  </h3>
                  <p className="text-xs text-text-secondary">Imobiliário</p>
                </div>
              </div>
            </Link>

            <Link
              to="/calculadoras/financas/cdb"
              className="group rounded-2xl bg-gradient-to-br from-system-success/10 to-system-success/5 p-6 transition-all duration-300 hover:from-system-success/20 hover:to-system-success/10 hover:shadow-lg"
            >
              <div className="flex items-center space-x-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-system-success text-white">
                  <span className="text-xl">💰</span>
                </div>
                <div>
                  <h3 className="font-semibold text-text-primary group-hover:text-system-success-dark">
                    CDB
                  </h3>
                  <p className="text-xs text-text-secondary">Certificado de Depósito</p>
                </div>
              </div>
            </Link>

            <Link
              to="/calculadoras/financas/juros-compostos"
              className="group rounded-2xl bg-gradient-to-br from-math-purple/10 to-math-purple/5 p-6 transition-all duration-300 hover:from-math-purple/20 hover:to-math-purple/10 hover:shadow-lg"
            >
              <div className="flex items-center space-x-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-math-purple text-white">
                  <span className="text-xl">📈</span>
                </div>
                <div>
                  <h3 className="font-semibold text-text-primary group-hover:text-math-purple-dark">
                    Juros Compostos
                  </h3>
                  <p className="text-xs text-text-secondary">Investimentos</p>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Top Calculators by Category */}
      <section className="bg-surface-dark/30 py-12">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-text-primary sm:text-3xl">
              Destaques por Categoria
            </h2>
            <p className="mt-2 text-text-secondary">
              As calculadoras mais procuradas em cada área
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {/* Saúde */}
            <div className="rounded-2xl bg-gradient-to-br from-health-red/5 to-health-red/10 p-6">
              <div className="mb-4 flex items-center space-x-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-health-red text-white">
                  <span className="text-lg">🏥</span>
                </div>
                <h3 className="text-xl font-bold text-text-primary">Saúde</h3>
              </div>
              <div className="space-y-3">
                <Link
                  to="/calculadoras/saude/desenvolvimento-infantil"
                  className="block rounded-lg bg-gradient-to-r from-yellow-500/20 to-yellow-400/20 p-3 transition-colors hover:from-yellow-500/30 hover:to-yellow-400/30 border border-yellow-500/30"
                >
                  <div className="flex items-center space-x-2">
                    <span className="text-lg">🥇</span>
                    <span className="text-sm font-medium text-text-primary">Desenvolvimento Infantil</span>
                    <span className="ml-auto text-xs font-semibold text-yellow-600">#1</span>
                  </div>
                </Link>
                <Link
                  to="/calculadoras/saude/gordura-corporal"
                  className="block rounded-lg bg-gradient-to-r from-gray-400/20 to-gray-300/20 p-3 transition-colors hover:from-gray-400/30 hover:to-gray-300/30 border border-gray-400/30"
                >
                  <div className="flex items-center space-x-2">
                    <span className="text-lg">🥈</span>
                    <span className="text-sm font-medium text-text-primary">Gordura Corporal</span>
                    <span className="ml-auto text-xs font-semibold text-gray-600">#2</span>
                  </div>
                </Link>
                <Link
                  to="/calculadoras/saude/imc"
                  className="block rounded-lg bg-gradient-to-r from-amber-600/20 to-amber-500/20 p-3 transition-colors hover:from-amber-600/30 hover:to-amber-500/30 border border-amber-600/30"
                >
                  <div className="flex items-center space-x-2">
                    <span className="text-lg">🥉</span>
                    <span className="text-sm font-medium text-text-primary">IMC</span>
                    <span className="ml-auto text-xs font-semibold text-amber-700">#3</span>
                  </div>
                </Link>
              </div>
            </div>

            {/* Trabalhista */}
            <div className="rounded-2xl bg-gradient-to-br from-primary-blue/5 to-primary-blue/10 p-6">
              <div className="mb-4 flex items-center space-x-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-blue text-white">
                  <span className="text-lg">⚖️</span>
                </div>
                <h3 className="text-xl font-bold text-text-primary">Trabalhista</h3>
              </div>
              <div className="space-y-3">
                <Link
                  to="/calculadoras/trabalhista/aposentadoria"
                  className="block rounded-lg bg-gradient-to-r from-yellow-500/20 to-yellow-400/20 p-3 transition-colors hover:from-yellow-500/30 hover:to-yellow-400/30 border border-yellow-500/30"
                >
                  <div className="flex items-center space-x-2">
                    <span className="text-lg">🥇</span>
                    <span className="text-sm font-medium text-text-primary">Aposentadoria</span>
                    <span className="ml-auto text-xs font-semibold text-yellow-600">#1</span>
                  </div>
                </Link>
                <Link
                  to="/calculadoras/trabalhista/rescisao"
                  className="block rounded-lg bg-gradient-to-r from-gray-400/20 to-gray-300/20 p-3 transition-colors hover:from-gray-400/30 hover:to-gray-300/30 border border-gray-400/30"
                >
                  <div className="flex items-center space-x-2">
                    <span className="text-lg">🥈</span>
                    <span className="text-sm font-medium text-text-primary">Rescisão</span>
                    <span className="ml-auto text-xs font-semibold text-gray-600">#2</span>
                  </div>
                </Link>
                <Link
                  to="/calculadoras/trabalhista/auxilio-doenca"
                  className="block rounded-lg bg-gradient-to-r from-amber-600/20 to-amber-500/20 p-3 transition-colors hover:from-amber-600/30 hover:to-amber-500/30 border border-amber-600/30"
                >
                  <div className="flex items-center space-x-2">
                    <span className="text-lg">🥉</span>
                    <span className="text-sm font-medium text-text-primary">Auxílio-Doença</span>
                    <span className="ml-auto text-xs font-semibold text-amber-700">#3</span>
                  </div>
                </Link>
              </div>
            </div>

            {/* Matemática */}
            <div className="rounded-2xl bg-gradient-to-br from-math-purple/5 to-math-purple/10 p-6">
              <div className="mb-4 flex items-center space-x-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-math-purple text-white">
                  <span className="text-lg">🔢</span>
                </div>
                <h3 className="text-xl font-bold text-text-primary">Matemática</h3>
              </div>
              <div className="space-y-3">
                <Link
                  to="/calculadoras/matematica/porcentagem"
                  className="block rounded-lg bg-gradient-to-r from-yellow-500/20 to-yellow-400/20 p-3 transition-colors hover:from-yellow-500/30 hover:to-yellow-400/30 border border-yellow-500/30"
                >
                  <div className="flex items-center space-x-2">
                    <span className="text-lg">🥇</span>
                    <span className="text-sm font-medium text-text-primary">Porcentagem</span>
                    <span className="ml-auto text-xs font-semibold text-yellow-600">#1</span>
                  </div>
                </Link>
                <Link
                  to="/calculadoras/matematica/equacao-segundo-grau"
                  className="block rounded-lg bg-gradient-to-r from-gray-400/20 to-gray-300/20 p-3 transition-colors hover:from-gray-400/30 hover:to-gray-300/30 border border-gray-400/30"
                >
                  <div className="flex items-center space-x-2">
                    <span className="text-lg">🥈</span>
                    <span className="text-sm font-medium text-text-primary">Equação 2º Grau</span>
                    <span className="ml-auto text-xs font-semibold text-gray-600">#2</span>
                  </div>
                </Link>
                <Link
                  to="/calculadoras/matematica/mmc-mdc"
                  className="block rounded-lg bg-gradient-to-r from-amber-600/20 to-amber-500/20 p-3 transition-colors hover:from-amber-600/30 hover:to-amber-500/30 border border-amber-600/30"
                >
                  <div className="flex items-center space-x-2">
                    <span className="text-lg">🥉</span>
                    <span className="text-sm font-medium text-text-primary">MMC e MDC</span>
                    <span className="ml-auto text-xs font-semibold text-amber-700">#3</span>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Categories with Improved Layout */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-text-primary sm:text-4xl">
              Todas as Categorias
            </h2>
            <p className="mt-4 text-lg text-text-secondary-dark">
              Encontre a calculadora perfeita para suas necessidades
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {CATEGORIES.map((category: Category) => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </div>
        </div>
      </section>

      {/* Value Proposition with Better Visual Hierarchy */}
      <section className="from-surface-light to-surface bg-gradient-to-r py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-text-primary sm:text-3xl">
              Por que escolher nossas calculadoras?
            </h2>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <div className="text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-system-success/20">
                <span className="text-2xl">✅</span>
              </div>
              <h3 className="mt-4 text-lg font-semibold text-text-primary">100% Gratuito</h3>
              <p className="mt-2 text-sm text-text-secondary">
                Todas as calculadoras são gratuitas. Sem pegadinhas, sem taxas ocultas.
              </p>
            </div>

            <div className="text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-primary-blue/20">
                <span className="text-2xl">⚡</span>
              </div>
              <h3 className="mt-4 text-lg font-semibold text-text-primary">
                Resultados Instantâneos
              </h3>
              <p className="mt-2 text-sm text-text-secondary">
                Cálculos em tempo real. Digite e veja o resultado imediatamente.
              </p>
            </div>

            <div className="text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-math-purple/20">
                <span className="text-2xl">📱</span>
              </div>
              <h3 className="mt-4 text-lg font-semibold text-text-primary">Mobile First</h3>
              <p className="mt-2 text-sm text-text-secondary">
                Interface otimizada para celulares e tablets. Use em qualquer lugar.
              </p>
            </div>

            <div className="text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-finance-gold/20">
                <span className="text-2xl">🔒</span>
              </div>
              <h3 className="mt-4 text-lg font-semibold text-text-primary">Sem Cadastro</h3>
              <p className="mt-2 text-sm text-text-secondary">
                Use todas as funcionalidades sem criar conta ou fornecer dados.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section with Improved Accessibility */}
      <section className="bg-gradient-to-r from-primary-blue-dark to-primary-blue py-16">
        <div className="mx-auto max-w-4xl px-6 text-center lg:px-8">
          <h2 className="text-3xl font-bold text-white sm:text-4xl">
            Comece a calcular agora mesmo
          </h2>
          <p className="mt-4 text-lg text-primary-blue-light">
            Escolha uma categoria e descubra como nossas calculadoras podem facilitar sua vida
          </p>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Link
              to="/calculadoras/saude"
              className="inline-flex items-center justify-center rounded-xl bg-white px-8 py-4 text-base font-semibold text-primary-blue-dark shadow-lg transition-all duration-300 hover:-translate-y-1 hover:bg-gray-50 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-primary-blue-dark"
              aria-label="Explorar calculadoras de saúde"
            >
              🏥 Calculadoras de Saúde
            </Link>
            <Link
              to="/calculadoras/financas"
              className="inline-flex items-center justify-center rounded-xl bg-finance-gold px-8 py-4 text-base font-semibold text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:bg-finance-gold-dark hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-primary-blue-dark"
              aria-label="Explorar calculadoras financeiras"
            >
              💰 Calculadoras Financeiras
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
