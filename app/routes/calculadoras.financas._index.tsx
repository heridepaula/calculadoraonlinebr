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
    { title: `Calculadoras Financeiras 2026 | ${APP_NAME}` },
    {
      name: "description",
      content:
        "Calculadoras financeiras grátis para investimentos e planejamento. Juros compostos, simples, primeiro milhão, CDB e Tesouro Direto em um só lugar.",
    },
    {
      name: "keywords",
      content:
        "calculadora financeira, juros compostos, juros simples, primeiro milhão, investimento, financiamento, planejamento financeiro, simulação, aportes mensais, matemática financeira, educação financeira, rendimento, poupança, CDI, tesouro direto",
    },
    { name: "author", content: "CalculadoraOnlineBR" },
    { name: "robots", content: "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" },
    { rel: "canonical", href: "https://www.calculadoraonlinebr.com.br/calculadoras/financas" },
    { property: "og:title", content: "Calculadoras Financeiras – Juros e Investimentos" },
    {
      property: "og:description",
      content:
        "Calculadoras financeiras grátis para investimentos e planejamento. Juros compostos, simples, primeiro milhão, CDB e Tesouro Direto em um só lugar.",
    },
    { property: "og:type", content: "website" },
    { property: "og:url", content: "https://www.calculadoraonlinebr.com.br/calculadoras/financas" },
    { property: "og:site_name", content: "CalculadoraOnlineBR" },
    { property: "og:locale", content: "pt_BR" },
    { property: "og:image", content: "https://www.calculadoraonlinebr.com.br/android-chrome-512x512.webp" },
    { property: "og:image:alt", content: "Calculadoras Financeiras - CalculadoraOnlineBR" },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:site", content: "@calculadorabr" },
    { name: "twitter:title", content: "Calculadoras Financeiras – Juros e Investimentos" },
    {
      name: "twitter:description",
      content:
        "Calculadoras financeiras grátis para investimentos e planejamento. Juros compostos, simples, primeiro milhão, CDB e Tesouro Direto em um só lugar.",
    },
    { name: "twitter:image", content: "https://www.calculadoraonlinebr.com.br/android-chrome-512x512.webp" },
    {
      "script:ld+json": {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        name: "Calculadoras Financeiras",
        description: "Calculadoras financeiras gratuitas: juros compostos, tesouro direto, CDB, financiamento imobiliário e mais",
        url: "https://www.calculadoraonlinebr.com.br/calculadoras/financas",
        inLanguage: "pt-BR",
        isPartOf: { "@type": "WebSite", name: "CalculadoraOnlineBR", url: "https://www.calculadoraonlinebr.com.br" },
        breadcrumb: {
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Início", item: "https://www.calculadoraonlinebr.com.br" },
            { "@type": "ListItem", position: 2, name: "Finanças", item: "https://www.calculadoraonlinebr.com.br/calculadoras/financas" },
          ],
        },
      },
    },
  ];
};

export default function FinancasIndex() {
  const financasCalculators = CALCULATORS.filter(
    (calc: Calculator) => calc.category === "financas"
  );

  return (
    <div className="min-h-screen">
      {/* Responsive Breadcrumb Navigation */}
      <ResponsiveBreadcrumb items={createCategoryBreadcrumb("financas")} />

      <CategoryHero
        category="financas"
        title="Calculadoras"
        subtitle="Financeiras"
        description="Planeje seu futuro financeiro com ferramentas especializadas para **investimentos, financiamentos e planejamento**. Tome decisões mais informadas com simulações detalhadas."
        badge={{
          icon: "💰",
          text: "Ferramentas Financeiras para Decisões Inteligentes",
        }}
        trustIndicators={[
          { color: "bg-system-success", text: "Ferramentas Completas" },
          { color: "bg-finance-gold", text: "Simulações Avançadas" },
          { color: "bg-primary-blue", text: "Educação Financeira" },
        ]}
      />

      {/* Quick Access to Most Used Calculators */}
      <section className="bg-surface-dark/30 py-8 sm:py-12">
        <div className="mx-auto max-w-7xl px-3 sm:px-6 lg:px-8">
          <div className="mb-8 text-center sm:mb-12">
            <h2 className="text-2xl font-bold text-text-primary sm:text-3xl">
              🚀 Acesso Rápido - Mais Usadas
            </h2>
            <p className="mt-2 text-text-secondary">
              Comece por aqui: as calculadoras mais populares para decisões financeiras
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
            <QuickAccessCard
              title="Tesouro Direto"
              description="Simule investimentos em títulos públicos e compare rendimentos com diferentes cenários."
              icon="🏛️"
              href="/calculadoras/financas/tesouro-direto"
              category="financas"
              isPopular={true}
              complexity="basic"
            />
            <QuickAccessCard
              title="Financiamento Imobiliário"
              description="Simule diferentes condições de financiamento e encontre a melhor opção para seu imóvel."
              icon="🏠"
              href="/calculadoras/financas/financiamento-imobiliario"
              category="financas"
              isPopular={true}
              complexity="intermediate"
            />
            <QuickAccessCard
              title="CDB"
              description="Compare rendimentos de CDBs com diferentes bancos e prazos de investimento."
              icon="💰"
              href="/calculadoras/financas/cdb"
              category="financas"
              isPopular={true}
              complexity="basic"
            />
          </div>
        </div>
      </section>

      {/* Financial Stats Section */}
      <CategoryStats
        category="financas"
        stats={[
          {
            icon: "💰",
            number: "12+",
            label: "Calculadoras",
            description: "Ferramentas especializadas",
          },
          {
            icon: "📊",
            number: "100%",
            label: "Qualidade",
            description: "Ferramentas testadas",
          },
          {
            icon: "⚡",
            number: "<1s",
            label: "Velocidade",
            description: "Resultados instantâneos",
          },
          {
            icon: "🎓",
            number: "+FAQ",
            label: "Educativo",
            description: "Conteúdo completo",
          },
        ]}
      />

      {/* Investment vs Other Categories */}
      <section className="py-8 sm:py-12">
        <div className="mx-auto max-w-7xl px-3 sm:px-6 lg:px-8">
          <div className="mb-8 text-center sm:mb-12">
            <h2 className="text-xl font-bold text-text-primary sm:text-2xl lg:text-3xl">
              Calculadoras por Especialidade
            </h2>
            <p className="mt-2 text-base text-text-secondary sm:text-lg">
              Organize sua vida financeira por área de atuação
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:gap-6 lg:grid-cols-3 lg:gap-8">
            {/* Investments */}
            <div className="group rounded-2xl bg-gradient-to-br from-finance-gold/10 to-finance-gold/5 p-8 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-finance-gold/25">
              <div className="mb-4 flex items-center space-x-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-finance-gold text-white transition-transform duration-300 group-hover:rotate-3 group-hover:scale-110">
                  <span className="text-xl">📈</span>
                </div>
                <h3 className="text-xl font-bold text-text-primary">Investimentos</h3>
              </div>
              <p className="mb-4 text-sm text-text-secondary">
                Simuladores para renda fixa, ações e planejamento de longo prazo
              </p>
              <div className="space-y-2">
                {financasCalculators
                  .filter((calc) =>
                    [
                      "tesouro-direto",
                      "cdb",
                      "juros-compostos",
                      "primeiro-milhao",
                      "preco-medio",
                      "lci-lca",
                      "renda-fixa-comparativa",
                    ].includes(calc.id)
                  )
                  .slice(0, 3)
                  .map((calc) => (
                    <div
                      key={calc.id}
                      className="text-sm transition-transform duration-300 group-hover:translate-x-1"
                    >
                      <span className="text-finance-gold-dark">•</span>{" "}
                      {calc.name.replace("Calculadora de ", "").replace("Calculadora ", "")}
                    </div>
                  ))}
              </div>
            </div>

            {/* Financing */}
            <div className="group rounded-2xl bg-gradient-to-br from-primary-blue/10 to-primary-blue/5 p-8 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-primary-blue/25">
              <div className="mb-4 flex items-center space-x-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-blue text-white transition-transform duration-300 group-hover:rotate-3 group-hover:scale-110">
                  <span className="text-xl">🏠</span>
                </div>
                <h3 className="text-xl font-bold text-text-primary">Financiamentos</h3>
              </div>
              <p className="mb-4 text-sm text-text-secondary">
                Simuladores para financiamentos imobiliários, consórcios e empréstimos
              </p>
              <div className="space-y-2">
                {financasCalculators
                  .filter((calc) =>
                    ["financiamento-imobiliario", "consorcio", "emprestimo-consignado"].includes(
                      calc.id
                    )
                  )
                  .map((calc) => (
                    <div
                      key={calc.id}
                      className="text-sm transition-transform duration-300 group-hover:translate-x-1"
                    >
                      <span className="text-primary-blue-dark">•</span>{" "}
                      {calc.name.replace("Calculadora de ", "").replace("Calculadora ", "")}
                    </div>
                  ))}
              </div>
            </div>

            {/* Planning */}
            <div className="group rounded-2xl bg-gradient-to-br from-system-success/10 to-system-success/5 p-8 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-system-success/25">
              <div className="mb-4 flex items-center space-x-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-system-success text-white transition-transform duration-300 group-hover:rotate-3 group-hover:scale-110">
                  <span className="text-xl">🎯</span>
                </div>
                <h3 className="text-xl font-bold text-text-primary">Planejamento</h3>
              </div>
              <p className="mb-4 text-sm text-text-secondary">
                Ferramentas para planejamento financeiro pessoal e familiar
              </p>
              <div className="space-y-2">
                {financasCalculators
                  .filter((calc) => ["juros-simples"].includes(calc.id))
                  .map((calc) => (
                    <div
                      key={calc.id}
                      className="text-sm transition-transform duration-300 group-hover:translate-x-1"
                    >
                      <span className="text-system-success-dark">•</span>{" "}
                      {calc.name.replace("Calculadora de ", "").replace("Calculadora ", "")}
                    </div>
                  ))}
                <div className="text-sm transition-transform duration-300 group-hover:translate-x-1">
                  <span className="text-system-success-dark">•</span> Análise de Orçamento
                </div>
                <div className="text-sm transition-transform duration-300 group-hover:translate-x-1">
                  <span className="text-system-success-dark">•</span> Metas Financeiras
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* All Financial Calculators */}
      <section className="py-8 sm:py-12 lg:py-16">
        <div className="mx-auto max-w-7xl px-3 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-text-primary sm:text-3xl lg:text-4xl">
              Todas as Calculadoras Financeiras
            </h2>
            <p className="mt-3 text-base text-text-secondary-dark sm:mt-4 sm:text-lg">
              Escolha a ferramenta ideal para suas necessidades financeiras
            </p>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-4 sm:mt-12 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
            {financasCalculators.map((calculator: Calculator) => (
              <CalculatorCard key={calculator.id} calculator={calculator} category="financas" />
            ))}
          </div>
        </div>
      </section>

      {/* Financial Education & Benefits */}
      <section className="from-surface-light to-surface bg-gradient-to-r py-8 sm:py-12 lg:py-16">
        <div className="mx-auto max-w-7xl px-3 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-xl font-bold text-text-primary sm:text-2xl lg:text-3xl">
              Educação Financeira
            </h2>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-4 sm:mt-12 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4 lg:gap-8">
            <div className="text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-finance-gold/20 sm:h-16 sm:w-16">
                <span className="text-xl sm:text-2xl">📊</span>
              </div>
              <h3 className="mt-3 text-base font-semibold text-text-primary sm:mt-4 sm:text-lg">
                Simulações
              </h3>
              <p className="mt-2 text-xs text-text-secondary sm:text-sm">
                Veja cenários diferentes antes de investir ou financiar
              </p>
            </div>

            <div className="text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-system-success/20 sm:h-16 sm:w-16">
                <span className="text-xl sm:text-2xl">⚖️</span>
              </div>
              <h3 className="mt-3 text-base font-semibold text-text-primary sm:mt-4 sm:text-lg">
                Comparações
              </h3>
              <p className="mt-2 text-xs text-text-secondary sm:text-sm">
                Analise diferentes opções de investimento lado a lado
              </p>
            </div>

            <div className="text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-primary-blue/20 sm:h-16 sm:w-16">
                <span className="text-xl sm:text-2xl">🎯</span>
              </div>
              <h3 className="mt-3 text-base font-semibold text-text-primary sm:mt-4 sm:text-lg">
                Decisões
              </h3>
              <p className="mt-2 text-xs text-text-secondary sm:text-sm">
                Tome escolhas baseadas em dados concretos e análises
              </p>
            </div>

            <div className="text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-finance-gold/20 sm:h-16 sm:w-16">
                <span className="text-xl sm:text-2xl">💡</span>
              </div>
              <h3 className="mt-3 text-base font-semibold text-text-primary sm:mt-4 sm:text-lg">
                Aprendizado
              </h3>
              <p className="mt-2 text-xs text-text-secondary sm:text-sm">
                Entenda conceitos financeiros através da prática
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive CTA Section for Financial Success */}
      <section className="relative overflow-hidden bg-gradient-to-r from-finance-gold-dark to-finance-gold py-16">
        <div className="absolute inset-0 opacity-30">
          <div className="h-full w-full bg-gradient-to-r from-transparent via-white/5 to-transparent"></div>
        </div>

        <div className="relative mx-auto max-w-4xl px-3 text-center sm:px-6 lg:px-8">
          <h2 className="animate-pulse text-2xl font-bold text-white sm:text-3xl lg:text-4xl">
            🚀 Comece sua Jornada Financeira Agora
          </h2>
          <p className="mt-3 text-base text-finance-gold-light sm:mt-4 sm:text-lg">
            Ferramentas gratuitas e úteis para <strong>decisões financeiras inteligentes</strong> e
            planejamento do seu futuro
          </p>

          <div className="mt-6 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:justify-center sm:gap-4">
            <a
              href="/calculadoras/financas/juros-compostos"
              className="group inline-flex transform items-center justify-center rounded-xl bg-white px-8 py-4 text-base font-semibold text-finance-gold-dark shadow-lg transition-all duration-300 hover:-translate-y-2 hover:bg-gray-50 hover:shadow-2xl focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-finance-gold-dark"
              aria-label="Começar com juros compostos"
            >
              <span className="mr-2 text-xl group-hover:animate-bounce">💰</span>
              Começar com Juros Compostos
              <svg
                className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1"
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
              href="/calculadoras/financas/primeiro-milhao"
              className="group inline-flex transform items-center justify-center rounded-xl border-2 border-white px-8 py-4 text-base font-semibold text-white transition-all duration-300 hover:-translate-y-2 hover:bg-white hover:text-finance-gold-dark hover:shadow-2xl focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-finance-gold-dark"
              aria-label="Simular primeiro milhão"
            >
              <span className="mr-2 text-xl group-hover:animate-spin">🎯</span>
              Meu Primeiro Milhão
            </a>
          </div>

          {/* Trust indicators */}
          <div className="mt-8 flex items-center justify-center gap-8 text-sm text-finance-gold-light">
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 animate-pulse rounded-full bg-white"></div>
              <span>Resultados Instantâneos</span>
            </div>
            <div className="flex items-center gap-2">
              <div
                className="h-2 w-2 animate-pulse rounded-full bg-white"
                style={{ animationDelay: "0.5s" }}
              ></div>
              <span>100% Gratuito</span>
            </div>
            <div className="flex items-center gap-2">
              <div
                className="h-2 w-2 animate-pulse rounded-full bg-white"
                style={{ animationDelay: "1s" }}
              ></div>
              <span>Sem Cadastro</span>
            </div>
          </div>
        </div>
      </section>

      {/* Tips for Financial Success */}
      <section className="bg-system-info/5 py-8 sm:py-12">
        <div className="mx-auto max-w-4xl px-3 sm:px-6 lg:px-8">
          <div className="rounded-2xl border border-system-info/20 bg-system-info/10 p-4 sm:p-6 lg:p-8">
            <div className="flex items-start space-x-3 sm:space-x-4">
              <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-system-info/20 sm:h-10 sm:w-10">
                <span className="text-lg sm:text-xl">💡</span>
              </div>
              <div>
                <h3 className="text-base font-semibold text-text-primary sm:text-lg">
                  Dica para Maximizar Resultados
                </h3>
                <p className="mt-2 text-sm text-text-secondary sm:text-base">
                  Use nossas calculadoras para simular diferentes cenários antes de tomar decisões
                  financeiras.
                  <strong className="text-finance-gold-dark">
                    {" "}
                    Compare opções, entenda os juros compostos
                  </strong>
                  e descubra como pequenas diferenças podem gerar grandes resultados ao longo do
                  tempo.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <RelatedCalculators category="financas" />
    </div>
  );
}
