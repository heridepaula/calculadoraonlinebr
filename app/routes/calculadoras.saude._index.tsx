import type { MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";
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
    { title: `Calculadoras de Saúde 2026 | ${APP_NAME}` },
    {
      name: "description",
      content:
        "Calculadoras saúde grátis: IMC, peso ideal, ciclo menstrual e mais. Ferramentas confiáveis baseadas em padrões médicos reconhecidos pela OMS.",
    },
    {
      name: "keywords",
      content:
        "calculadora saúde, IMC, índice massa corporal, peso ideal, saúde online, calculadora médica, bem-estar",
    },
    { name: "author", content: "CalculadoraOnlineBR" },
    { name: "robots", content: "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" },
    { tagName: "link", rel: "canonical", href: "https://www.calculadoraonlinebr.com.br/calculadoras/saude" },
    { property: "og:title", content: "Calculadoras Saúde 2026 – Ferramentas Médicas" },
    {
      property: "og:description",
      content: "Monitore sua saúde com nossas calculadoras médicas gratuitas e confiáveis.",
    },
    { property: "og:type", content: "website" },
    { property: "og:url", content: "https://www.calculadoraonlinebr.com.br/calculadoras/saude" },
    { property: "og:site_name", content: "CalculadoraOnlineBR" },
    { property: "og:locale", content: "pt_BR" },
    { property: "og:image", content: "https://www.calculadoraonlinebr.com.br/og/categoria-saude.jpg" },
    { property: "og:image:width", content: "1200" },
    { property: "og:image:height", content: "630" },
    { property: "og:image:alt", content: "Calculadoras de Saúde - CalculadoraOnlineBR" },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:site", content: "@calculadorabr" },
    { name: "twitter:title", content: "Calculadoras Saúde 2026 – Ferramentas Médicas" },
    {
      name: "twitter:description",
      content: "Ferramentas de saúde gratuitas para monitorar seu bem-estar.",
    },
    { name: "twitter:image", content: "https://www.calculadoraonlinebr.com.br/og/categoria-saude.jpg" },
    {
      "script:ld+json": {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        name: "Calculadoras de Saúde",
        description: "Calculadoras de saúde gratuitas: IMC, gordura corporal, ciclo menstrual e mais",
        url: "https://www.calculadoraonlinebr.com.br/calculadoras/saude",
        inLanguage: "pt-BR",
        isPartOf: { "@type": "WebSite", name: "CalculadoraOnlineBR", url: "https://www.calculadoraonlinebr.com.br" },
        breadcrumb: {
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Início", item: "https://www.calculadoraonlinebr.com.br" },
            { "@type": "ListItem", position: 2, name: "Saúde", item: "https://www.calculadoraonlinebr.com.br/calculadoras/saude" },
          ],
        },
      },
    },
  ];
};

export default function SaudeIndex() {
  const saudeCalculators = CALCULATORS.filter((calc: Calculator) => calc.category === "saude");

  return (
    <div className="min-h-screen">
      {/* Responsive Breadcrumb Navigation */}
      <ResponsiveBreadcrumb items={createCategoryBreadcrumb("saude")} />

      <CategoryHero
        category="saude"
        title="Calculadoras de"
        subtitle="Saúde"
        description="Monitore sua saúde e bem-estar com calculadoras baseadas em **padrões médicos reconhecidos pela OMS**. Ferramentas confiáveis para acompanhar indicadores vitais da sua saúde."
        badge={{
          icon: "🏥",
          text: "Ferramentas de Saúde Baseadas em Padrões Médicos",
        }}
        trustIndicators={[
          { color: "bg-system-success", text: "Baseado na OMS" },
          { color: "bg-health-red", text: "Padrões Médicos" },
          { color: "bg-primary-blue", text: "Baseado em Pesquisas" },
        ]}
      />

      {/* Quick Access - Health Monitoring */}
      <section className="bg-surface-dark/30 py-8 sm:py-12">
        <div className="mx-auto max-w-7xl px-3 sm:px-6 lg:px-8">
          <div className="mb-8 text-center sm:mb-12">
            <h2 className="text-2xl font-bold text-text-primary sm:text-3xl">
              🎯 Monitore Sua Saúde Agora
            </h2>
            <p className="mt-2 text-text-secondary">
              Começe com as ferramentas mais importantes para acompanhar seu bem-estar
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
            <QuickAccessCard
              title="Desenvolvimento Infantil"
              description="Acompanhe o crescimento e desenvolvimento do seu filho com base em padrões médicos reconhecidos."
              icon="👶"
              href="/calculadoras/saude/desenvolvimento-infantil"
              category="saude"
              isPopular={true}
              complexity="basic"
            />
            <QuickAccessCard
              title="Gordura Corporal"
              description="Calcule seu percentual de gordura corporal usando diferentes métodos científicos validados."
              icon="📊"
              href="/calculadoras/saude/gordura-corporal"
              category="saude"
              isPopular={true}
              complexity="intermediate"
            />
            <QuickAccessCard
              title="Calculadora de IMC"
              description="Descubra se seu peso está dentro da faixa ideal usando os padrões da Organização Mundial da Saúde (OMS)."
              icon="⚖️"
              href="/calculadoras/saude/imc"
              category="saude"
              isPopular={true}
              complexity="basic"
            />
          </div>
        </div>
      </section>

      {/* Health Stats Section */}
      <CategoryStats
        category="saude"
        stats={[
          {
            icon: "🏥",
            number: "OMS",
            label: "Padrões",
            description: "Diretrizes oficiais",
          },
          {
            icon: "📊",
            number: "100%",
            label: "Confiável",
            description: "Métodos testados",
          },
          {
            icon: "⚡",
            number: "<3s",
            label: "Rápido",
            description: "Resultados instantâneos",
          },
          {
            icon: "🔒",
            number: "Seguro",
            label: "Privacidade",
            description: "Dados não armazenados",
          },
        ]}
      />

      {/* All Health Calculators */}
      <section className="py-8 sm:py-12 lg:py-16">
        <div className="mx-auto max-w-7xl px-3 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-text-primary sm:text-3xl lg:text-4xl">
              Todas as Calculadoras de Saúde
            </h2>
            <p className="mt-3 text-base text-text-secondary-dark sm:mt-4 sm:text-lg">
              Escolha a ferramenta ideal para monitorar sua saúde
            </p>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-4 sm:mt-12 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
            {saudeCalculators.map((calculator: Calculator) => (
              <CalculatorCard key={calculator.id} calculator={calculator} category="saude" />
            ))}
          </div>
        </div>
      </section>

      {/* Health Benefits & Education Section */}
      <section className="from-surface-light to-surface bg-gradient-to-r py-8 sm:py-12 lg:py-16">
        <div className="mx-auto max-w-7xl px-3 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-xl font-bold text-text-primary sm:text-2xl lg:text-3xl">
              Por que monitorar sua saúde?
            </h2>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-4 sm:mt-12 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 lg:gap-8">
            <div className="rounded-2xl border border-white/[0.05] bg-background-dark-secondary/40 p-4 shadow-lg backdrop-blur-sm sm:p-6 lg:p-8">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-health-red/20 sm:h-16 sm:w-16">
                <span className="text-xl sm:text-2xl">🎯</span>
              </div>
              <h3 className="mt-4 text-lg font-semibold text-text-primary sm:mt-6 sm:text-xl">
                Prevenção
              </h3>
              <p className="mt-3 text-sm text-text-secondary sm:mt-4 sm:text-base">
                Identifique riscos à saúde antes que se tornem problemas sérios. Monitoramento
                preventivo é a chave para uma vida mais saudável.
              </p>
            </div>

            <div className="rounded-2xl border border-white/[0.05] bg-background-dark-secondary/40 p-4 shadow-lg backdrop-blur-sm sm:p-6 lg:p-8">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-system-success/20 sm:h-16 sm:w-16">
                <span className="text-xl sm:text-2xl">📊</span>
              </div>
              <h3 className="mt-4 text-lg font-semibold text-text-primary sm:mt-6 sm:text-xl">
                Controle
              </h3>
              <p className="mt-3 text-sm text-text-secondary sm:mt-4 sm:text-base">
                Acompanhe a evolução dos seus indicadores de saúde ao longo do tempo. Informações
                úteis para melhores decisões.
              </p>
            </div>

            <div className="rounded-2xl border border-white/[0.05] bg-background-dark-secondary/40 p-4 shadow-lg backdrop-blur-sm sm:p-6 lg:p-8">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-primary-blue/20 sm:h-16 sm:w-16">
                <span className="text-xl sm:text-2xl">💪</span>
              </div>
              <h3 className="mt-4 text-lg font-semibold text-text-primary sm:mt-6 sm:text-xl">
                Motivação
              </h3>
              <p className="mt-3 text-sm text-text-secondary sm:mt-4 sm:text-base">
                Visualize o progresso dos seus hábitos saudáveis e mantenha-se motivado para
                continuar cuidando da sua saúde.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Health Journey */}
      <section className="relative overflow-hidden bg-gradient-to-r from-health-red-dark to-health-red py-16">
        <div className="absolute inset-0 opacity-20">
          <div className="h-full w-full bg-gradient-to-br from-transparent via-white/10 to-transparent"></div>
        </div>

        <div className="relative mx-auto max-w-6xl px-3 text-center sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-6 sm:gap-8 lg:grid-cols-2 lg:items-center">
            <div className="text-center sm:text-left lg:text-left">
              <h2 className="text-2xl font-bold text-white sm:text-3xl lg:text-4xl">
                🌟 Sua Jornada de Saúde Começa Aqui
              </h2>
              <p className="mt-3 text-base text-health-red-light sm:mt-4 sm:text-lg">
                Monitore sua saúde com{" "}
                <strong>ferramentas baseadas em padrões médicos reconhecidos</strong> pela
                Organização Mundial da Saúde
              </p>

              <div className="mt-4 flex flex-col gap-3 sm:mt-6 sm:flex-row sm:justify-start lg:flex-col xl:flex-row">
                <Link
                  to="/calculadoras/saude/imc"
                  className="group inline-flex transform items-center justify-center rounded-xl bg-white px-6 py-3 text-base font-semibold text-health-red-dark shadow-lg transition-all duration-300 hover:-translate-y-2 hover:bg-gray-50 hover:shadow-2xl focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-health-red-dark"
                >
                  <span className="mr-2 text-xl group-hover:animate-bounce">⚖️</span>
                  Calcular Meu IMC
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
                </Link>

                <Link
                  to="/calculadoras/saude/hidratacao"
                  className="group inline-flex transform items-center justify-center rounded-xl border-2 border-white px-6 py-3 text-base font-semibold text-white transition-all duration-300 hover:-translate-y-2 hover:bg-white hover:text-health-red-dark hover:shadow-2xl focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-health-red-dark"
                >
                  <span className="mr-2 text-xl group-hover:animate-bounce">💧</span>
                  Hidratação
                </Link>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 sm:gap-3 lg:gap-4">
              <div className="group rounded-lg bg-white/10 p-3 backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:bg-white/20 sm:p-4 lg:p-6">
                <div className="text-center">
                  <span className="mb-2 block text-xl group-hover:animate-spin sm:text-2xl">
                    ⚕️
                  </span>
                  <h3 className="text-xs font-semibold leading-tight text-white sm:text-sm">OMS</h3>
                  <p className="text-xs leading-tight text-health-red-light">Diretrizes</p>
                </div>
              </div>
              <div className="group rounded-lg bg-white/10 p-3 backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:bg-white/20 sm:p-4 lg:p-6">
                <div className="text-center">
                  <span className="mb-2 block text-xl sm:text-2xl">
                    🔬
                  </span>
                  <h3 className="text-xs font-semibold leading-tight text-white sm:text-sm">
                    Científico
                  </h3>
                  <p className="text-xs leading-tight text-health-red-light">Métodos</p>
                </div>
              </div>
              <div className="group rounded-lg bg-white/10 p-3 backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:bg-white/20 sm:p-4 lg:p-6">
                <div className="text-center">
                  <span className="mb-2 block text-xl group-hover:animate-bounce sm:text-2xl">
                    📈
                  </span>
                  <h3 className="text-xs font-semibold leading-tight text-white sm:text-sm">
                    Progresso
                  </h3>
                  <p className="text-xs leading-tight text-health-red-light">Evolução</p>
                </div>
              </div>
              <div className="group rounded-lg bg-white/10 p-3 backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:bg-white/20 sm:p-4 lg:p-6">
                <div className="text-center">
                  <span className="mb-2 block text-xl sm:text-2xl">
                    🔒
                  </span>
                  <h3 className="text-xs font-semibold leading-tight text-white sm:text-sm">
                    Privado
                  </h3>
                  <p className="text-xs leading-tight text-health-red-light">Seguro</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Important Medical Disclaimer */}
      <section className="bg-system-warning/5 py-8 sm:py-12">
        <div className="mx-auto max-w-4xl px-3 sm:px-6 lg:px-8">
          <div className="rounded-2xl border border-system-warning/20 bg-system-warning/10 p-4 sm:p-6 lg:p-8">
            <div className="flex items-start space-x-3 sm:space-x-4">
              <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-system-warning/20 sm:h-10 sm:w-10">
                <span className="text-lg sm:text-xl">⚠️</span>
              </div>
              <div>
                <h3 className="text-base font-semibold text-text-primary sm:text-lg">
                  Aviso Médico Importante
                </h3>
                <p className="mt-2 text-sm text-text-secondary sm:text-base">
                  Nossas calculadoras são ferramentas informativas baseadas em padrões médicos
                  reconhecidos. Os resultados{" "}
                  <strong className="text-system-warning-dark">
                    não substituem consulta médica profissional
                  </strong>
                  . Para avaliações completas e orientações personalizadas, sempre consulte um
                  profissional de saúde qualificado.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <RelatedCalculators category="saude" />
    </div>
  );
}
