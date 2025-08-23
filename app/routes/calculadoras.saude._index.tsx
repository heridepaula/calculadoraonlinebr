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
    { title: `Calculadoras de Saúde - ${APP_NAME}` },
    {
      name: "description",
      content:
        "Calculadoras de saúde gratuitas para cuidar do seu bem-estar. IMC, peso ideal e muito mais. Ferramentas confiáveis baseadas em padrões médicos.",
    },
    {
      name: "keywords",
      content:
        "calculadora saúde, IMC, índice massa corporal, peso ideal, saúde online, calculadora médica, bem-estar",
    },
    { name: "author", content: "Calculadora Online BR" },
    { property: "og:title", content: `Calculadoras de Saúde - ${APP_NAME}` },
    {
      property: "og:description",
      content: "Monitore sua saúde com nossas calculadoras médicas gratuitas e confiáveis.",
    },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary" },
    { name: "twitter:title", content: `Calculadoras de Saúde - ${APP_NAME}` },
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
      <div className="border-b border-border-primary bg-surface-light px-6 py-4">
        <div className="mx-auto max-w-7xl">
          <Breadcrumb>
            <BreadcrumbItem href="/">Início</BreadcrumbItem>
            <BreadcrumbItem href="/calculadoras">Calculadoras</BreadcrumbItem>
            <BreadcrumbItem isLast>Saúde</BreadcrumbItem>
          </Breadcrumb>
        </div>
      </div>

      {/* Hero Section with Category-Specific Branding */}
      <section className="relative overflow-hidden bg-gradient-to-br from-health-red/5 via-surface to-surface-dark">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-health-red/10 via-transparent to-transparent"></div>
        
        <div className="relative mx-auto max-w-7xl px-6 py-16 lg:px-8">
          <div className="text-center">
            <div className="mb-8 inline-flex items-center rounded-full bg-health-red/10 px-4 py-2 text-sm font-medium text-health-red-dark ring-1 ring-inset ring-health-red/20">
              <span className="mr-2">🏥</span>
              Ferramentas de Saúde Baseadas em Padrões Médicos
            </div>
            
            <h1 className="mx-auto max-w-4xl text-4xl font-bold tracking-tight text-text-primary sm:text-5xl lg:text-6xl">
              Calculadoras de
              <span className="block bg-gradient-to-r from-health-red via-health-red-light to-health-red bg-clip-text text-transparent">
                Saúde
              </span>
            </h1>
            
            <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-text-secondary-dark sm:text-xl">
              Monitore sua saúde e bem-estar com calculadoras baseadas em{" "}
              <strong className="text-health-red-dark">padrões médicos reconhecidos pela OMS</strong>.
              Ferramentas confiáveis para acompanhar indicadores vitais da sua saúde.
            </p>
            
            {/* Health-specific Trust Indicators */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4 text-sm text-text-secondary">
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-system-success"></div>
                <span className="font-medium">Baseado na OMS</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-health-red"></div>
                <span className="font-medium">Padrões Médicos</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-primary-blue"></div>
                <span className="font-medium">Cientificamente Validado</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured/Popular Health Calculators */}
      <section className="bg-surface-dark/30 py-12">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-text-primary sm:text-3xl">
              Calculadoras Mais Usadas
            </h2>
            <p className="mt-2 text-text-secondary">
              Ferramentas essenciais para monitoramento da saúde
            </p>
          </div>
          
          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {saudeCalculators.slice(0, 3).map((calculator: Calculator) => (
              <div key={calculator.id} className="group relative">
                <div className="absolute -inset-1 rounded-xl bg-gradient-to-r from-health-red to-health-red-light opacity-20 blur transition duration-300 group-hover:opacity-40"></div>
                <CalculatorCard calculator={calculator} category="saude" />
              </div>
            ))}
          </div>
        </div>
      </section>

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
      <section className="bg-gradient-to-r from-surface-light to-surface py-16">
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
                Acompanhe a evolução dos seus indicadores de saúde ao longo do tempo. 
                Dados precisos para melhores decisões.
              </p>
            </div>
            
            <div className="rounded-2xl bg-white/50 p-8 shadow-lg backdrop-blur-sm">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-primary-blue/20">
                <span className="text-2xl">💪</span>
              </div>
              <h3 className="mt-6 text-xl font-semibold text-text-primary">Motivação</h3>
              <p className="mt-4 text-text-secondary">
                Visualize o progresso dos seus hábitos saudáveis e mantenha-se motivado 
                para continuar cuidando da sua saúde.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Medical Standards & Credibility */}
      <section className="bg-gradient-to-r from-health-red-dark to-health-red py-16">
        <div className="mx-auto max-w-6xl px-6 text-center lg:px-8">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:items-center">
            <div className="text-left lg:text-left">
              <h2 className="text-3xl font-bold text-white sm:text-4xl">
                Baseado em Padrões Médicos Internacionais
              </h2>
              <p className="mt-4 text-lg text-health-red-light">
                Todas as nossas calculadoras seguem diretrizes da OMS e protocolos médicos reconhecidos mundialmente
              </p>
            </div>
            
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="rounded-xl bg-white/10 p-6 backdrop-blur-sm">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">⚕️</span>
                  <div>
                    <h3 className="font-semibold text-white">OMS</h3>
                    <p className="text-sm text-health-red-light">Diretrizes Oficiais</p>
                  </div>
                </div>
              </div>
              <div className="rounded-xl bg-white/10 p-6 backdrop-blur-sm">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">🔬</span>
                  <div>
                    <h3 className="font-semibold text-white">Validação</h3>
                    <p className="text-sm text-health-red-light">Métodos Científicos</p>
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
                <h3 className="text-lg font-semibold text-text-primary">
                  Aviso Médico Importante
                </h3>
                <p className="mt-2 text-text-secondary">
                  Nossas calculadoras são ferramentas informativas baseadas em padrões médicos reconhecidos.
                  Os resultados <strong className="text-system-warning-dark">não substituem consulta médica profissional</strong>. 
                  Para avaliações completas e orientações personalizadas, sempre consulte um profissional de saúde qualificado.
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
