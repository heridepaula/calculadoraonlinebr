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
    { title: `Calculadoras Trabalhistas 2025 | ${APP_NAME}` },
    {
      name: "description",
      content:
        "Calculadoras trabalhistas grátis: rescisão, férias, 13º salário, auxílio-doença e aposentadoria. Ferramentas baseadas na CLT atualizada 2025.",
    },
    {
      name: "keywords",
      content:
        "calculadora trabalhista, rescisão trabalhista, direitos trabalhistas, CLT, demissão sem justa causa, aviso prévio, FGTS, seguro desemprego, férias proporcionais, 13º salário, acordo mútuo, pedido demissão, cálculo trabalhista, direito do trabalho",
    },
    { name: "author", content: "CalculadoraOnlineBR" },
    { name: "robots", content: "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" },
    { rel: "canonical", href: "https://www.calculadoraonlinebr.com.br/calculadoras/trabalhista" },
    { property: "og:title", content: "Calculadoras Trabalhistas 2025 – Direitos CLT" },
    {
      property: "og:description",
      content:
        "Conheça seus direitos trabalhistas com nossas calculadoras especializadas. Grátis e baseado na legislação brasileira.",
    },
    { property: "og:type", content: "website" },
    { property: "og:url", content: "https://www.calculadoraonlinebr.com.br/calculadoras/trabalhista" },
    { property: "og:site_name", content: "CalculadoraOnlineBR" },
    { property: "og:locale", content: "pt_BR" },
    { property: "og:image", content: "https://www.calculadoraonlinebr.com.br/android-chrome-512x512.webp" },
    { property: "og:image:alt", content: "Calculadoras Trabalhistas - CalculadoraOnlineBR" },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:site", content: "@calculadorabr" },
    { name: "twitter:title", content: "Calculadoras Trabalhistas 2025 – Direitos CLT" },
    {
      name: "twitter:description",
      content:
        "Ferramentas trabalhistas gratuitas para calcular rescisão, direitos e benefícios conforme a CLT.",
    },
    { name: "twitter:image", content: "https://www.calculadoraonlinebr.com.br/android-chrome-512x512.webp" },
    {
      "script:ld+json": {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        name: "Calculadoras Trabalhistas",
        description: "Calculadoras trabalhistas gratuitas: rescisão, aposentadoria, auxílio-doença e mais conforme a CLT",
        url: "https://www.calculadoraonlinebr.com.br/calculadoras/trabalhista",
        inLanguage: "pt-BR",
        isPartOf: { "@type": "WebSite", name: "CalculadoraOnlineBR", url: "https://www.calculadoraonlinebr.com.br" },
        breadcrumb: {
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Início", item: "https://www.calculadoraonlinebr.com.br" },
            { "@type": "ListItem", position: 2, name: "Trabalhista", item: "https://www.calculadoraonlinebr.com.br/calculadoras/trabalhista" },
          ],
        },
      },
    },
  ];
};

export default function TrabalhistaIndex() {
  const trabalhistaCalculators = CALCULATORS.filter(
    (calc: Calculator) => calc.category === "trabalhista"
  );

  return (
    <div className="min-h-screen">
      {/* Responsive Breadcrumb Navigation */}
      <ResponsiveBreadcrumb items={createCategoryBreadcrumb("trabalhista")} />

      <CategoryHero
        category="trabalhista"
        title="Calculadoras"
        subtitle="Trabalhistas"
        description="Conheça e calcule seus direitos trabalhistas com base na **legislação brasileira vigente**. Ferramentas úteis para rescisão, benefícios e relações de trabalho."
        badge={{
          icon: "⚖️",
          text: "Ferramentas Baseadas na Legislação Brasileira (CLT)",
        }}
        trustIndicators={[
          { color: "bg-system-success", text: "Baseado na CLT" },
          { color: "bg-primary-blue", text: "Legislação Atualizada" },
          { color: "bg-finance-gold", text: "Baseado em Especialistas" },
        ]}
      />

      {/* Quick Access - Labor Rights */}
      <section className="bg-surface-dark/30 py-8 sm:py-12">
        <div className="mx-auto max-w-7xl px-3 sm:px-6 lg:px-8">
          <div className="mb-8 text-center sm:mb-12">
            <h2 className="text-2xl font-bold text-text-primary sm:text-3xl">
              ⚖️ Proteja Seus Direitos Agora
            </h2>
            <p className="mt-2 text-text-secondary">
              Começe aqui: as calculadoras mais importantes para trabalhadores brasileiros
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
            <QuickAccessCard
              title="Aposentadoria"
              description="Calcule sua aposentadoria por tempo de contribuição e benefícios previdenciários."
              icon="🏛️"
              href="/calculadoras/trabalhista/aposentadoria"
              category="trabalhista"
              isPopular={true}
              complexity="intermediate"
            />
            <QuickAccessCard
              title="Rescisão Trabalhista"
              description="Calcule todos os valores da sua rescisão: FGTS, seguro desemprego, férias e 13º salário conforme a CLT."
              icon="📋"
              href="/calculadoras/trabalhista/rescisao"
              category="trabalhista"
              isPopular={true}
              complexity="intermediate"
            />
            <QuickAccessCard
              title="Auxílio-Doença"
              description="Calcule o valor do auxílio-doença baseado no salário de contribuição e tempo de afastamento."
              icon="🏥"
              href="/calculadoras/trabalhista/auxilio-doenca"
              category="trabalhista"
              isPopular={true}
              complexity="basic"
            />
          </div>
        </div>
      </section>

      {/* Labor Stats Section */}
      <CategoryStats
        category="trabalhista"
        stats={[
          {
            icon: "⚖️",
            number: "CLT",
            label: "Baseado",
            description: "Legislação brasileira",
          },
          {
            icon: "📅",
            number: "2025",
            label: "Atualizado",
            description: "Valores e tabelas",
          },
          {
            icon: "🛡️",
            number: "100%",
            label: "Proteção",
            description: "Direitos garantidos",
          },
          {
            icon: "🎯",
            number: "Útil",
            label: "Ferramenta",
            description: "Resultados detalhados",
          },
        ]}
      />

      {/* Labor Rights Categories */}
      <section className="py-8 sm:py-12">
        <div className="mx-auto max-w-7xl px-3 sm:px-6 lg:px-8">
          <div className="mb-8 text-center sm:mb-12">
            <h2 className="text-xl font-bold text-text-primary sm:text-2xl lg:text-3xl">
              Áreas dos Direitos Trabalhistas
            </h2>
            <p className="mt-2 text-base text-text-secondary sm:text-lg">
              Calculadoras organizadas por tipo de situação trabalhista
            </p>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-4 sm:mt-10 sm:gap-6 lg:grid-cols-3 lg:gap-8">
            {/* Resignation */}
            <div className="rounded-2xl bg-gradient-to-br from-system-error/10 to-system-error/5 p-8">
              <div className="mb-4 flex items-center space-x-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-system-error text-white">
                  <span className="text-xl">📋</span>
                </div>
                <h3 className="text-xl font-bold text-text-primary">Rescisão</h3>
              </div>
              <p className="mb-4 text-sm text-text-secondary">
                Cálculos completos para diferentes tipos de rescisão
              </p>
              <div className="space-y-2">
                <div className="text-sm">
                  <span className="text-system-error-dark">•</span> Demissão sem Justa Causa
                </div>
                <div className="text-sm">
                  <span className="text-system-error-dark">•</span> Pedido de Demissão
                </div>
                <div className="text-sm">
                  <span className="text-system-error-dark">•</span> Acordo Mútuo
                </div>
              </div>
            </div>

            {/* Benefits */}
            <div className="rounded-2xl bg-gradient-to-br from-finance-gold/10 to-finance-gold/5 p-8">
              <div className="mb-4 flex items-center space-x-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-finance-gold text-white">
                  <span className="text-xl">💰</span>
                </div>
                <h3 className="text-xl font-bold text-text-primary">Benefícios</h3>
              </div>
              <p className="mb-4 text-sm text-text-secondary">
                Simuladores para benefícios trabalhistas e previdenciários
              </p>
              <div className="space-y-2">
                <div className="text-sm">
                  <span className="text-finance-gold-dark">•</span> Férias e 13º Salário
                </div>
                <div className="text-sm">
                  <span className="text-finance-gold-dark">•</span> Auxílio-Doença
                </div>
                <div className="text-sm">
                  <span className="text-finance-gold-dark">•</span> Aposentadoria
                </div>
              </div>
            </div>

            {/* Salary */}
            <div className="rounded-2xl bg-gradient-to-br from-system-success/10 to-system-success/5 p-8">
              <div className="mb-4 flex items-center space-x-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-system-success text-white">
                  <span className="text-xl">💵</span>
                </div>
                <h3 className="text-xl font-bold text-text-primary">Salário</h3>
              </div>
              <p className="mb-4 text-sm text-text-secondary">
                Cálculos de salário líquido e descontos
              </p>
              <div className="space-y-2">
                <div className="text-sm">
                  <span className="text-system-success-dark">•</span> Salário Líquido
                </div>
                <div className="text-sm">
                  <span className="text-system-success-dark">•</span> Descontos INSS
                </div>
                <div className="text-sm">
                  <span className="text-system-success-dark">•</span> Imposto de Renda
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* All Labor Calculators */}
      <section className="py-8 sm:py-12 lg:py-16">
        <div className="mx-auto max-w-7xl px-3 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-text-primary sm:text-3xl lg:text-4xl">
              Todas as Calculadoras Trabalhistas
            </h2>
            <p className="mt-3 text-base text-text-secondary-dark sm:mt-4 sm:text-lg">
              Proteja seus direitos com ferramentas baseadas na CLT
            </p>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-4 sm:mt-12 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
            {trabalhistaCalculators.map((calculator) => (
              <CalculatorCard key={calculator.id} calculator={calculator} category="trabalhista" />
            ))}
          </div>
        </div>
      </section>

      {/* Why Know Your Rights */}
      <section className="from-surface-light to-surface bg-gradient-to-r py-8 sm:py-12 lg:py-16">
        <div className="mx-auto max-w-7xl px-3 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-xl font-bold text-text-primary sm:text-2xl lg:text-3xl">
              Por que conhecer seus direitos?
            </h2>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-4 sm:mt-12 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 lg:gap-8">
            <div className="rounded-2xl bg-white/50 p-4 shadow-lg backdrop-blur-sm sm:p-6 lg:p-8">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-system-error/20 sm:h-16 sm:w-16">
                <span className="text-xl sm:text-2xl">🛡️</span>
              </div>
              <h3 className="mt-4 text-lg font-semibold text-text-primary sm:mt-6 sm:text-xl">
                Proteção
              </h3>
              <p className="mt-3 text-sm text-text-secondary sm:mt-4 sm:text-base">
                Evite prejuízos em rescisões e demissões. Conheça todos os valores que você tem
                direito a receber.
              </p>
            </div>

            <div className="rounded-2xl bg-white/50 p-4 shadow-lg backdrop-blur-sm sm:p-6 lg:p-8">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-finance-gold/20 sm:h-16 sm:w-16">
                <span className="text-xl sm:text-2xl">📊</span>
              </div>
              <h3 className="mt-4 text-lg font-semibold text-text-primary sm:mt-6 sm:text-xl">
                Planejamento
              </h3>
              <p className="mt-3 text-sm text-text-secondary sm:mt-4 sm:text-base">
                Calcule seus benefícios e direitos antecipadamente para tomar melhores decisões de
                carreira.
              </p>
            </div>

            <div className="rounded-2xl bg-white/50 p-4 shadow-lg backdrop-blur-sm sm:p-6 lg:p-8">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-primary-blue/20 sm:h-16 sm:w-16">
                <span className="text-xl sm:text-2xl">🔍</span>
              </div>
              <h3 className="mt-4 text-lg font-semibold text-text-primary sm:mt-6 sm:text-xl">
                Transparência
              </h3>
              <p className="mt-3 text-sm text-text-secondary sm:mt-4 sm:text-base">
                Entenda cada valor na sua rescisão trabalhista e tenha clareza sobre seus direitos.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Worker Rights Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-primary-blue-dark to-primary-blue py-16">
        <div className="absolute inset-0 opacity-20">
          <div className="via-white/6 h-full w-full bg-gradient-to-bl from-transparent to-transparent"></div>
        </div>

        <div className="relative mx-auto max-w-6xl px-3 text-center sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-6 sm:gap-8 lg:grid-cols-2 lg:items-center">
            <div className="text-center sm:text-left lg:text-left">
              <h2 className="animate-pulse text-2xl font-bold text-white sm:text-3xl lg:text-4xl">
                🛡️ Conheça Seus Direitos
              </h2>
              <p className="mt-3 text-base text-primary-blue-light sm:mt-4 sm:text-lg">
                Proteja seus direitos trabalhistas com <strong>ferramentas baseadas na CLT</strong>{" "}
                e legislação brasileira atualizada
              </p>

              <div className="mt-4 flex flex-col gap-3 sm:mt-6 sm:flex-row sm:justify-start lg:flex-col xl:flex-row">
                <a
                  href="/calculadoras/trabalhista/rescisao"
                  className="group inline-flex transform items-center justify-center rounded-xl bg-white px-6 py-3 text-base font-semibold text-primary-blue-dark shadow-lg transition-all duration-300 hover:-translate-y-2 hover:bg-gray-50 hover:shadow-2xl focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-primary-blue-dark"
                >
                  <span className="mr-2 text-xl group-hover:animate-bounce">📋</span>
                  Calcular Rescisão
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
                  href="/calculadoras/trabalhista/salario-liquido"
                  className="group inline-flex transform items-center justify-center rounded-xl border-2 border-white px-6 py-3 text-base font-semibold text-white transition-all duration-300 hover:-translate-y-2 hover:bg-white hover:text-primary-blue-dark hover:shadow-2xl focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-primary-blue-dark"
                >
                  <span className="mr-2 text-xl group-hover:animate-spin">💵</span>
                  Salário Líquido
                </a>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 sm:gap-3 lg:gap-4">
              <div className="group rounded-lg bg-white/10 p-3 backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:bg-white/20 sm:p-4 lg:p-6">
                <div className="text-center">
                  <span className="mb-2 block text-xl group-hover:animate-pulse sm:text-2xl">
                    📜
                  </span>
                  <h3 className="text-xs font-semibold leading-tight text-white sm:text-sm">CLT</h3>
                  <p className="text-xs leading-tight text-primary-blue-light">Leis</p>
                </div>
              </div>
              <div className="group rounded-lg bg-white/10 p-3 backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:bg-white/20 sm:p-4 lg:p-6">
                <div className="text-center">
                  <span className="mb-2 block text-xl group-hover:animate-bounce sm:text-2xl">
                    ⚖️
                  </span>
                  <h3 className="text-xs font-semibold leading-tight text-white sm:text-sm">
                    Atualizado
                  </h3>
                  <p className="text-xs leading-tight text-primary-blue-light">2025</p>
                </div>
              </div>
              <div className="group rounded-lg bg-white/10 p-3 backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:bg-white/20 sm:p-4 lg:p-6">
                <div className="text-center">
                  <span className="mb-2 block text-xl group-hover:animate-spin sm:text-2xl">
                    🛡️
                  </span>
                  <h3 className="text-xs font-semibold leading-tight text-white sm:text-sm">
                    Proteção
                  </h3>
                  <p className="text-xs leading-tight text-primary-blue-light">Direitos</p>
                </div>
              </div>
              <div className="group rounded-lg bg-white/10 p-3 backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:bg-white/20 sm:p-4 lg:p-6">
                <div className="text-center">
                  <span className="mb-2 block text-xl group-hover:animate-pulse sm:text-2xl">
                    🎯
                  </span>
                  <h3 className="text-xs font-semibold leading-tight text-white sm:text-sm">
                    Detalhado
                  </h3>
                  <p className="text-xs leading-tight text-primary-blue-light">Completo</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Important Legal Disclaimer */}
      <section className="bg-system-warning/5 py-8 sm:py-12">
        <div className="mx-auto max-w-4xl px-3 sm:px-6 lg:px-8">
          <div className="rounded-2xl border border-system-warning/20 bg-system-warning/10 p-4 sm:p-6 lg:p-8">
            <div className="flex items-start space-x-3 sm:space-x-4">
              <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-system-warning/20 sm:h-10 sm:w-10">
                <span className="text-lg sm:text-xl">⚠️</span>
              </div>
              <div>
                <h3 className="text-base font-semibold text-text-primary sm:text-lg">
                  Aviso Legal Importante
                </h3>
                <p className="mt-2 text-sm text-text-secondary sm:text-base">
                  Nossas calculadoras são ferramentas informativas baseadas na legislação
                  trabalhista brasileira atual. Os resultados{" "}
                  <strong className="text-system-warning-dark">
                    não substituem orientação jurídica profissional
                  </strong>
                  . Para situações específicas ou dúvidas jurídicas complexas, sempre consulte um
                  advogado trabalhista qualificado.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <RelatedCalculators category="trabalhista" />
    </div>
  );
}
