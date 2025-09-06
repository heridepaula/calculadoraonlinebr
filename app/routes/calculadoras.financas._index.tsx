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
    { title: "Calculadoras Financeiras – Juros e Investimentos" },
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
    { name: "author", content: "Calculadora Online BR" },
    { property: "og:title", content: "Calculadoras Financeiras – Juros e Investimentos" },
    {
      property: "og:description",
      content:
        "Calculadoras financeiras grátis para investimentos e planejamento. Juros compostos, simples, primeiro milhão, CDB e Tesouro Direto em um só lugar.",
    },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary" },
    { name: "twitter:title", content: "Calculadoras Financeiras – Juros e Investimentos" },
    {
      name: "twitter:description",
      content:
        "Calculadoras financeiras grátis para investimentos e planejamento. Juros compostos, simples, primeiro milhão, CDB e Tesouro Direto em um só lugar.",
    },
  ];
};

export default function FinancasIndex() {
  const financasCalculators = CALCULATORS.filter(
    (calc: Calculator) => calc.category === "financas"
  );

  return (
    <div className="min-h-screen">
      {/* Breadcrumb Navigation */}
      <div className="border-b border-border-primary bg-surface-light px-6 py-4">
        <div className="mx-auto max-w-7xl">
          <Breadcrumb>
            <BreadcrumbItem href="/">Início</BreadcrumbItem>
            <BreadcrumbItem href="/calculadoras">Calculadoras</BreadcrumbItem>
            <BreadcrumbItem isLast>Finanças</BreadcrumbItem>
          </Breadcrumb>
        </div>
      </div>

      <CategoryHero
        category="financas"
        title="Calculadoras"
        subtitle="Financeiras"
        description="Planeje seu futuro financeiro com ferramentas especializadas para **investimentos, financiamentos e planejamento**. Tome decisões mais informadas com simulações detalhadas."
        badge={{
          icon: "💰",
          text: "Ferramentas Financeiras para Decisões Inteligentes"
        }}
        trustIndicators={[
          { color: "bg-system-success", text: "Ferramentas Completas" },
          { color: "bg-finance-gold", text: "Simulações Avançadas" },
          { color: "bg-primary-blue", text: "Educação Financeira" }
        ]}
      />

      {/* Quick Access to Most Used Calculators */}
      <section className="bg-surface-dark/30 py-12">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold text-text-primary sm:text-3xl">
              🚀 Acesso Rápido - Mais Usadas
            </h2>
            <p className="mt-2 text-text-secondary">
              Comece por aqui: as calculadoras mais populares para decisões financeiras
            </p>
          </div>
          
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            <QuickAccessCard
              title="Juros Compostos"
              description="Descubra o poder dos juros compostos e simule o crescimento dos seus investimentos ao longo do tempo."
              icon="📈"
              href="/calculadoras/financas/juros-compostos"
              category="financas"
              isPopular={true}
              complexity="basic"
            />
            <QuickAccessCard
              title="Primeiro Milhão"
              description="Calcule quanto tempo e dinheiro você confiável para conquistar seu primeiro milhão de reais."
              icon="🎯"
              href="/calculadoras/financas/primeiro-milhao"
              category="financas"
              isPopular={true}
              complexity="intermediate"
            />
            <QuickAccessCard
              title="Financiamento Imobiliário"
              description="Simule diferentes condições de financiamento e encontre a melhor opção para seu imóvel."
              icon="🏠"
              href="/calculadoras/financas/financiamento-imobiliario"
              category="financas"
              complexity="intermediate"
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
            description: "Ferramentas especializadas"
          },
          {
            icon: "📊",
            number: "100%",
            label: "Qualidade",
            description: "Ferramentas testadas"
          },
          {
            icon: "⚡",
            number: "<1s",
            label: "Velocidade",
            description: "Resultados instantâneos"
          },
          {
            icon: "🎓",
            number: "+FAQ",
            label: "Educativo",
            description: "Conteúdo completo"
          }
        ]}
      />

      {/* Investment vs Other Categories */}
      <section className="py-12">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold text-text-primary sm:text-3xl">
              Calculadoras por Especialidade
            </h2>
            <p className="mt-2 text-text-secondary">
              Organize sua vida financeira por área de atuação
            </p>
          </div>
          
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            {/* Investments */}
            <div className="group rounded-2xl bg-gradient-to-br from-finance-gold/10 to-finance-gold/5 p-8 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-finance-gold/25">
              <div className="flex items-center space-x-3 mb-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-finance-gold text-white transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
                  <span className="text-xl">📈</span>
                </div>
                <h3 className="text-xl font-bold text-text-primary">Investimentos</h3>
              </div>
              <p className="text-sm text-text-secondary mb-4">
                Simuladores para renda fixa, ações e planejamento de longo prazo
              </p>
              <div className="space-y-2">
                {financasCalculators.filter(calc => 
                  ['juros-compostos', 'primeiro-milhao', 'lci-lca', 'cdb', 'preco-medio', 'tesouro-direto', 'renda-fixa-comparativa'].includes(calc.id)
                ).slice(0, 3).map(calc => (
                  <div key={calc.id} className="text-sm group-hover:translate-x-1 transition-transform duration-300">
                    <span className="text-finance-gold-dark">•</span> {calc.name.replace('Calculadora de ', '').replace('Calculadora ', '')}
                  </div>
                ))}
              </div>
            </div>

            {/* Financing */}
            <div className="group rounded-2xl bg-gradient-to-br from-primary-blue/10 to-primary-blue/5 p-8 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-primary-blue/25">
              <div className="flex items-center space-x-3 mb-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-blue text-white transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
                  <span className="text-xl">🏠</span>
                </div>
                <h3 className="text-xl font-bold text-text-primary">Financiamentos</h3>
              </div>
              <p className="text-sm text-text-secondary mb-4">
                Simuladores para financiamentos imobiliários, consórcios e empréstimos
              </p>
              <div className="space-y-2">
                {financasCalculators.filter(calc => 
                  ['financiamento-imobiliario', 'emprestimo-consignado', 'consorcio'].includes(calc.id)
                ).map(calc => (
                  <div key={calc.id} className="text-sm group-hover:translate-x-1 transition-transform duration-300">
                    <span className="text-primary-blue-dark">•</span> {calc.name.replace('Calculadora de ', '').replace('Calculadora ', '')}
                  </div>
                ))}
              </div>
            </div>

            {/* Planning */}
            <div className="group rounded-2xl bg-gradient-to-br from-system-success/10 to-system-success/5 p-8 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-system-success/25">
              <div className="flex items-center space-x-3 mb-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-system-success text-white transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
                  <span className="text-xl">🎯</span>
                </div>
                <h3 className="text-xl font-bold text-text-primary">Planejamento</h3>
              </div>
              <p className="text-sm text-text-secondary mb-4">
                Ferramentas para planejamento financeiro pessoal e familiar
              </p>
              <div className="space-y-2">
                {financasCalculators.filter(calc => 
                  ['juros-simples'].includes(calc.id)
                ).map(calc => (
                  <div key={calc.id} className="text-sm group-hover:translate-x-1 transition-transform duration-300">
                    <span className="text-system-success-dark">•</span> {calc.name.replace('Calculadora de ', '').replace('Calculadora ', '')}
                  </div>
                ))}
                <div className="text-sm group-hover:translate-x-1 transition-transform duration-300">
                  <span className="text-system-success-dark">•</span> Análise de Orçamento
                </div>
                <div className="text-sm group-hover:translate-x-1 transition-transform duration-300">
                  <span className="text-system-success-dark">•</span> Metas Financeiras
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* All Financial Calculators */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-text-primary sm:text-4xl">
              Todas as Calculadoras Financeiras
            </h2>
            <p className="mt-4 text-lg text-text-secondary-dark">
              Escolha a ferramenta ideal para suas necessidades financeiras
            </p>
          </div>
          
          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {financasCalculators.map((calculator: Calculator) => (
              <CalculatorCard key={calculator.id} calculator={calculator} category="financas" />
            ))}
          </div>
        </div>
      </section>

      {/* Financial Education & Benefits */}
      <section className="bg-gradient-to-r from-surface-light to-surface py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-text-primary sm:text-3xl">
              Educação Financeira
            </h2>
          </div>
          
          <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div className="text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-finance-gold/20">
                <span className="text-2xl">📊</span>
              </div>
              <h3 className="mt-4 text-lg font-semibold text-text-primary">Simulações</h3>
              <p className="mt-2 text-sm text-text-secondary">
                Veja cenários diferentes antes de investir ou financiar
              </p>
            </div>
            
            <div className="text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-system-success/20">
                <span className="text-2xl">⚖️</span>
              </div>
              <h3 className="mt-4 text-lg font-semibold text-text-primary">Comparações</h3>
              <p className="mt-2 text-sm text-text-secondary">
                Analise diferentes opções de investimento lado a lado
              </p>
            </div>
            
            <div className="text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-primary-blue/20">
                <span className="text-2xl">🎯</span>
              </div>
              <h3 className="mt-4 text-lg font-semibold text-text-primary">Decisões</h3>
              <p className="mt-2 text-sm text-text-secondary">
                Tome escolhas baseadas em dados concretos e análises
              </p>
            </div>
            
            <div className="text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-finance-gold/20">
                <span className="text-2xl">💡</span>
              </div>
              <h3 className="mt-4 text-lg font-semibold text-text-primary">Aprendizado</h3>
              <p className="mt-2 text-sm text-text-secondary">
                Entenda conceitos financeiros através da prática
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive CTA Section for Financial Success */}
      <section className="bg-gradient-to-r from-finance-gold-dark to-finance-gold py-16 relative overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <div className="h-full w-full bg-gradient-to-r from-transparent via-white/5 to-transparent"></div>
        </div>
        
        <div className="relative mx-auto max-w-4xl px-6 text-center lg:px-8">
          <h2 className="text-3xl font-bold text-white sm:text-4xl animate-pulse">
            🚀 Comece sua Jornada Financeira Agora
          </h2>
          <p className="mt-4 text-lg text-finance-gold-light">
            Ferramentas gratuitas e úteis para <strong>decisões financeiras inteligentes</strong> e planejamento do seu futuro
          </p>
          
          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
            <a 
              href="/calculadoras/financas/juros-compostos"
              className="group inline-flex items-center justify-center rounded-xl bg-white px-8 py-4 text-base font-semibold text-finance-gold-dark shadow-lg transition-all duration-300 hover:bg-gray-50 hover:shadow-2xl hover:-translate-y-2 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-finance-gold-dark transform"
              aria-label="Começar com juros compostos"
            >
              <span className="mr-2 text-xl group-hover:animate-bounce">💰</span>
              Começar com Juros Compostos
              <svg className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </a>
            
            <a 
              href="/calculadoras/financas/primeiro-milhao"
              className="group inline-flex items-center justify-center rounded-xl border-2 border-white px-8 py-4 text-base font-semibold text-white transition-all duration-300 hover:bg-white hover:text-finance-gold-dark hover:shadow-2xl hover:-translate-y-2 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-finance-gold-dark transform"
              aria-label="Simular primeiro milhão"
            >
              <span className="mr-2 text-xl group-hover:animate-spin">🎯</span>
              Meu Primeiro Milhão
            </a>
          </div>
          
          {/* Trust indicators */}
          <div className="mt-8 flex items-center justify-center gap-8 text-sm text-finance-gold-light">
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-white animate-pulse"></div>
              <span>Resultados Instantâneos</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-white animate-pulse" style={{animationDelay: '0.5s'}}></div>
              <span>100% Gratuito</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-white animate-pulse" style={{animationDelay: '1s'}}></div>
              <span>Sem Cadastro</span>
            </div>
          </div>
        </div>
      </section>

      {/* Tips for Financial Success */}
      <section className="bg-system-info/5 py-12">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <div className="rounded-2xl border border-system-info/20 bg-system-info/10 p-8">
            <div className="flex items-start space-x-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-system-info/20">
                <span className="text-xl">💡</span>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-text-primary">
                  Dica para Maximizar Resultados
                </h3>
                <p className="mt-2 text-text-secondary">
                  Use nossas calculadoras para simular diferentes cenários antes de tomar decisões financeiras.
                  <strong className="text-finance-gold-dark"> Compare opções, entenda os juros compostos</strong> 
                  e descubra como pequenas diferenças podem gerar grandes resultados ao longo do tempo.
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
