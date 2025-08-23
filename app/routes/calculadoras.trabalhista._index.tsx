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
    { title: `Calculadoras Trabalhistas - ${APP_NAME}` },
    {
      name: "description",
      content:
        "★ Calculadoras trabalhistas GRATUITAS para direitos trabalhistas e relações de trabalho. Rescisão trabalhista, férias, 13º salário e muito mais. Ferramentas precisas com base na CLT.",
    },
    {
      name: "keywords",
      content:
        "calculadora trabalhista, rescisão trabalhista, direitos trabalhistas, CLT, demissão sem justa causa, aviso prévio, FGTS, seguro desemprego, férias proporcionais, 13º salário, acordo mútuo, pedido demissão, cálculo trabalhista, direito do trabalho",
    },
    { name: "author", content: "Calculadora Online BR" },
    { property: "og:title", content: `Calculadoras Trabalhistas - ${APP_NAME}` },
    {
      property: "og:description",
      content:
        "Conheça seus direitos trabalhistas com nossas calculadoras especializadas. Grátis e baseado na legislação brasileira.",
    },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary" },
    { name: "twitter:title", content: `Calculadoras Trabalhistas - ${APP_NAME}` },
    {
      name: "twitter:description",
      content:
        "Ferramentas trabalhistas gratuitas para calcular rescisão, direitos e benefícios conforme a CLT.",
    },
  ];
};

export default function TrabalhistaIndex() {
  const trabalhistaCalculators = CALCULATORS.filter(
    (calc: Calculator) => calc.category === "trabalhista"
  );

  return (
    <div className="min-h-screen">
      {/* Breadcrumb Navigation */}
      <div className="border-b border-border-primary bg-surface-light px-6 py-4">
        <div className="mx-auto max-w-7xl">
          <Breadcrumb>
            <BreadcrumbItem href="/">Início</BreadcrumbItem>
            <BreadcrumbItem href="/calculadoras">Calculadoras</BreadcrumbItem>
            <BreadcrumbItem isLast>Trabalhista</BreadcrumbItem>
          </Breadcrumb>
        </div>
      </div>

      {/* Hero Section with Labor Law Theme */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary-blue/5 via-surface to-surface-dark">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary-blue/10 via-transparent to-transparent"></div>
        
        <div className="relative mx-auto max-w-7xl px-6 py-16 lg:px-8">
          <div className="text-center">
            <div className="mb-8 inline-flex items-center rounded-full bg-primary-blue/10 px-4 py-2 text-sm font-medium text-primary-blue-dark ring-1 ring-inset ring-primary-blue/20">
              <span className="mr-2">⚖️</span>
              Ferramentas Baseadas na Legislação Brasileira (CLT)
            </div>
            
            <h1 className="mx-auto max-w-4xl text-4xl font-bold tracking-tight text-text-primary sm:text-5xl lg:text-6xl">
              Calculadoras
              <span className="block bg-gradient-to-r from-primary-blue via-primary-blue-light to-primary-blue bg-clip-text text-transparent">
                Trabalhistas
              </span>
            </h1>
            
            <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-text-secondary-dark sm:text-xl">
              Conheça e calcule seus direitos trabalhistas com base na{" "}
              <strong className="text-primary-blue-dark">legislação brasileira vigente</strong>.
              Ferramentas precisas para rescisão, benefícios e relações de trabalho.
            </p>
            
            {/* Labor-specific Trust Indicators */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4 text-sm text-text-secondary">
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-system-success"></div>
                <span className="font-medium">Baseado na CLT</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-primary-blue"></div>
                <span className="font-medium">Legislação Atualizada</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-finance-gold"></div>
                <span className="font-medium">Validado por Especialistas</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Labor Rights Categories */}
      <section className="bg-surface-dark/30 py-12">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-text-primary sm:text-3xl">
              Tipos de Direitos Trabalhistas
            </h2>
            <p className="mt-2 text-text-secondary">
              Calculadoras organizadas por área de atuação
            </p>
          </div>
          
          <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {/* Resignation */}
            <div className="rounded-2xl bg-gradient-to-br from-system-error/10 to-system-error/5 p-8">
              <div className="flex items-center space-x-3 mb-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-system-error text-white">
                  <span className="text-xl">📋</span>
                </div>
                <h3 className="text-xl font-bold text-text-primary">Rescisão</h3>
              </div>
              <p className="text-sm text-text-secondary mb-4">
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
              <div className="flex items-center space-x-3 mb-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-finance-gold text-white">
                  <span className="text-xl">💰</span>
                </div>
                <h3 className="text-xl font-bold text-text-primary">Benefícios</h3>
              </div>
              <p className="text-sm text-text-secondary mb-4">
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
              <div className="flex items-center space-x-3 mb-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-system-success text-white">
                  <span className="text-xl">💵</span>
                </div>
                <h3 className="text-xl font-bold text-text-primary">Salário</h3>
              </div>
              <p className="text-sm text-text-secondary mb-4">
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
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-text-primary sm:text-4xl">
              Todas as Calculadoras Trabalhistas
            </h2>
            <p className="mt-4 text-lg text-text-secondary-dark">
              Proteja seus direitos com ferramentas baseadas na CLT
            </p>
          </div>
          
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {trabalhistaCalculators.map((calculator) => (
              <CalculatorCard key={calculator.id} calculator={calculator} category="trabalhista" />
            ))}
          </div>
        </div>
      </section>

      {/* Why Know Your Rights */}
      <section className="bg-gradient-to-r from-surface-light to-surface py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-text-primary sm:text-3xl">
              Por que conhecer seus direitos?
            </h2>
          </div>
          
          <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-2xl bg-white/50 p-8 shadow-lg backdrop-blur-sm">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-system-error/20">
                <span className="text-2xl">🛡️</span>
              </div>
              <h3 className="mt-6 text-xl font-semibold text-text-primary">Proteção</h3>
              <p className="mt-4 text-text-secondary">
                Evite prejuízos em rescisões e demissões. Conheça 
                todos os valores que você tem direito a receber.
              </p>
            </div>
            
            <div className="rounded-2xl bg-white/50 p-8 shadow-lg backdrop-blur-sm">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-finance-gold/20">
                <span className="text-2xl">📊</span>
              </div>
              <h3 className="mt-6 text-xl font-semibold text-text-primary">Planejamento</h3>
              <p className="mt-4 text-text-secondary">
                Calcule seus benefícios e direitos antecipadamente 
                para tomar melhores decisões de carreira.
              </p>
            </div>
            
            <div className="rounded-2xl bg-white/50 p-8 shadow-lg backdrop-blur-sm">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-primary-blue/20">
                <span className="text-2xl">🔍</span>
              </div>
              <h3 className="mt-6 text-xl font-semibold text-text-primary">Transparência</h3>
              <p className="mt-4 text-text-secondary">
                Entenda cada valor na sua rescisão trabalhista 
                e tenha clareza sobre seus direitos.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Legal Foundation Section */}
      <section className="bg-gradient-to-r from-primary-blue-dark to-primary-blue py-16">
        <div className="mx-auto max-w-6xl px-6 text-center lg:px-8">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:items-center">
            <div className="text-left lg:text-left">
              <h2 className="text-3xl font-bold text-white sm:text-4xl">
                Baseado na Legislação Brasileira
              </h2>
              <p className="mt-4 text-lg text-primary-blue-light">
                Todas as calculadoras seguem rigorosamente a CLT e legislação trabalhista atualizada
              </p>
            </div>
            
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="rounded-xl bg-white/10 p-6 backdrop-blur-sm">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">📜</span>
                  <div>
                    <h3 className="font-semibold text-white">CLT</h3>
                    <p className="text-sm text-primary-blue-light">Consolidação das Leis</p>
                  </div>
                </div>
              </div>
              <div className="rounded-xl bg-white/10 p-6 backdrop-blur-sm">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">⚖️</span>
                  <div>
                    <h3 className="font-semibold text-white">Atualizado</h3>
                    <p className="text-sm text-primary-blue-light">Legislação 2025</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Important Legal Disclaimer */}
      <section className="bg-system-warning/5 py-12">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <div className="rounded-2xl border border-system-warning/20 bg-system-warning/10 p-8">
            <div className="flex items-start space-x-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-system-warning/20">
                <span className="text-xl">⚠️</span>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-text-primary">
                  Aviso Legal Importante
                </h3>
                <p className="mt-2 text-text-secondary">
                  Nossas calculadoras são ferramentas informativas baseadas na legislação trabalhista brasileira atual.
                  Os resultados <strong className="text-system-warning-dark">não substituem orientação jurídica profissional</strong>. 
                  Para situações específicas ou dúvidas jurídicas complexas, sempre consulte um advogado trabalhista qualificado.
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
