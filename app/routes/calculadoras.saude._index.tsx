import type { MetaFunction } from "@remix-run/node";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  Breadcrumb,
  BreadcrumbItem,
} from "~/components/ui";
import { RelatedCalculators, CategoryHero, CategoryStats, QuickAccessCard } from "~/components";
import { CalculatorCard } from "~/components/CalculatorCard";
import { APP_NAME, CALCULATORS } from "~/lib/constants";
import type { Calculator } from "~/types";

export const meta: MetaFunction = () => {
  return [
    { title: "Calculadoras Saúde 2025 – Ferramentas Médicas" },
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
    { property: "og:title", content: "Calculadoras Saúde 2025 – Ferramentas Médicas" },
    {
      property: "og:description",
      content: "Monitore sua saúde com nossas calculadoras médicas gratuitas e confiáveis.",
    },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary" },
    { name: "twitter:title", content: "Calculadoras Saúde 2025 – Ferramentas Médicas" },
    {
      name: "twitter:description",
      content: "Ferramentas de saúde gratuitas para monitorar seu bem-estar.",
    },
  ];
};

export default function SaudeIndex() {
  const saudeCalculators = CALCULATORS.filter((calc: Calculator) => calc.category === "saude");

  return (
    <div className="min-h-screen">
      {/* Breadcrumb Navigation */}
      <div className="border-border-primary bg-surface-light border-b px-6 py-4">
        <div className="mx-auto max-w-7xl">
          <Breadcrumb>
            <BreadcrumbItem href="/">Início</BreadcrumbItem>
            <BreadcrumbItem href="/calculadoras">Calculadoras</BreadcrumbItem>
            <BreadcrumbItem isLast>Saúde</BreadcrumbItem>
          </Breadcrumb>
        </div>
      </div>

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
      <section className="bg-surface-dark/30 py-12">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="text-2xl font-bold text-text-primary sm:text-3xl">
              🎯 Monitore Sua Saúde Agora
            </h2>
            <p className="mt-2 text-text-secondary">
              Começe com as ferramentas mais importantes para acompanhar seu bem-estar
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            <QuickAccessCard
              title="Calculadora de IMC"
              description="Descubra se seu peso está dentro da faixa ideal usando os padrões da Organização Mundial da Saúde (OMS)."
              icon="⚖️"
              href="/calculadoras/saude/imc"
              category="saude"
              isPopular={true}
              complexity="basic"
            />
            <QuickAccessCard
              title="Hidratação Diária"
              description="Calcule a quantidade ideal de água que você deve beber por dia baseado no seu peso e atividade."
              icon="💧"
              href="/calculadoras/saude/hidratacao"
              category="saude"
              complexity="basic"
            />
            <QuickAccessCard
              title="Taxa Metabólica"
              description="Descubra quantas calorias seu corpo queima em repouso e planeje melhor sua alimentação."
              icon="🔥"
              href="/calculadoras/saude/metabolismo"
              category="saude"
              complexity="intermediate"
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
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-text-primary sm:text-4xl">
              Todas as Calculadoras de Saúde
            </h2>
            <p className="mt-4 text-lg text-text-secondary-dark">
              Escolha a ferramenta ideal para monitorar sua saúde
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {saudeCalculators.map((calculator: Calculator) => (
              <CalculatorCard key={calculator.id} calculator={calculator} category="saude" />
            ))}
          </div>
        </div>
      </section>

      {/* Health Benefits & Education Section */}
      <section className="from-surface-light to-surface bg-gradient-to-r py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-text-primary sm:text-3xl">
              Por que monitorar sua saúde?
            </h2>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-2xl bg-white/50 p-8 shadow-lg backdrop-blur-sm">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-health-red/20">
                <span className="text-2xl">🎯</span>
              </div>
              <h3 className="mt-6 text-xl font-semibold text-text-primary">Prevenção</h3>
              <p className="mt-4 text-text-secondary">
                Identifique riscos à saúde antes que se tornem problemas sérios. Monitoramento
                preventivo é a chave para uma vida mais saudável.
              </p>
            </div>

            <div className="rounded-2xl bg-white/50 p-8 shadow-lg backdrop-blur-sm">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-system-success/20">
                <span className="text-2xl">📊</span>
              </div>
              <h3 className="mt-6 text-xl font-semibold text-text-primary">Controle</h3>
              <p className="mt-4 text-text-secondary">
                Acompanhe a evolução dos seus indicadores de saúde ao longo do tempo. Informações
                úteis para melhores decisões.
              </p>
            </div>

            <div className="rounded-2xl bg-white/50 p-8 shadow-lg backdrop-blur-sm">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-primary-blue/20">
                <span className="text-2xl">💪</span>
              </div>
              <h3 className="mt-6 text-xl font-semibold text-text-primary">Motivação</h3>
              <p className="mt-4 text-text-secondary">
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

        <div className="relative mx-auto max-w-6xl px-6 text-center lg:px-8">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:items-center">
            <div className="text-left lg:text-left">
              <h2 className="animate-pulse text-3xl font-bold text-white sm:text-4xl">
                🌟 Sua Jornada de Saúde Começa Aqui
              </h2>
              <p className="mt-4 text-lg text-health-red-light">
                Monitore sua saúde com{" "}
                <strong>ferramentas baseadas em padrões médicos reconhecidos</strong> pela
                Organização Mundial da Saúde
              </p>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
                <a
                  href="/calculadoras/saude/imc"
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
                </a>

                <a
                  href="/calculadoras/saude/hidratacao"
                  className="group inline-flex transform items-center justify-center rounded-xl border-2 border-white px-6 py-3 text-base font-semibold text-white transition-all duration-300 hover:-translate-y-2 hover:bg-white hover:text-health-red-dark hover:shadow-2xl focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-health-red-dark"
                >
                  <span className="mr-2 text-xl group-hover:animate-bounce">💧</span>
                  Hidratação
                </a>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="group rounded-xl bg-white/10 p-6 backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:bg-white/20">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl group-hover:animate-spin">⚕️</span>
                  <div>
                    <h3 className="font-semibold text-white">OMS</h3>
                    <p className="text-sm text-health-red-light">Diretrizes Oficiais</p>
                  </div>
                </div>
              </div>
              <div className="group rounded-xl bg-white/10 p-6 backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:bg-white/20">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl group-hover:animate-pulse">🔬</span>
                  <div>
                    <h3 className="font-semibold text-white">Baseado</h3>
                    <p className="text-sm text-health-red-light">Métodos Científicos</p>
                  </div>
                </div>
              </div>
              <div className="group rounded-xl bg-white/10 p-6 backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:bg-white/20">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl group-hover:animate-bounce">📈</span>
                  <div>
                    <h3 className="font-semibold text-white">Progresso</h3>
                    <p className="text-sm text-health-red-light">Acompanhe Evolução</p>
                  </div>
                </div>
              </div>
              <div className="group rounded-xl bg-white/10 p-6 backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:bg-white/20">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl group-hover:animate-pulse">🔒</span>
                  <div>
                    <h3 className="font-semibold text-white">Privado</h3>
                    <p className="text-sm text-health-red-light">100% Seguro</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Important Medical Disclaimer */}
      <section className="bg-system-warning/5 py-12">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <div className="rounded-2xl border border-system-warning/20 bg-system-warning/10 p-8">
            <div className="flex items-start space-x-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-system-warning/20">
                <span className="text-xl">⚠️</span>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-text-primary">Aviso Médico Importante</h3>
                <p className="mt-2 text-text-secondary">
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
