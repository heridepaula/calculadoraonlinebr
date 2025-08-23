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
    { title: `Calculadoras Financeiras - ${APP_NAME}` },
    {
      name: "description",
      content:
        "★ Calculadoras financeiras GRATUITAS para planejamento e investimentos. Juros simples, compostos, primeiro milhão e muito mais. Ferramentas precisas para decisões financeiras inteligentes com conteúdo educativo completo.",
    },
    {
      name: "keywords",
      content:
        "calculadora financeira, juros compostos, juros simples, primeiro milhão, investimento, financiamento, planejamento financeiro, simulação, aportes mensais, matemática financeira, educação financeira, rendimento, poupança, CDI, tesouro direto",
    },
    { name: "author", content: "Calculadora Online BR" },
    { property: "og:title", content: `Calculadoras Financeiras - ${APP_NAME}` },
    {
      property: "og:description",
      content:
        "Planeje suas finanças com nossas calculadoras especializadas. Grátis e fácil de usar.",
    },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary" },
    { name: "twitter:title", content: `Calculadoras Financeiras - ${APP_NAME}` },
    {
      name: "twitter:description",
      content:
        "Ferramentas financeiras gratuitas para planejar investimentos e tomar melhores decisões.",
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

      {/* Hero Section with Financial Theme */}
      <section className="relative overflow-hidden bg-gradient-to-br from-finance-gold/5 via-surface to-surface-dark">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-finance-gold/10 via-transparent to-transparent"></div>
        
        <div className="relative mx-auto max-w-7xl px-6 py-16 lg:px-8">
          <div className="text-center">
            <div className="mb-8 inline-flex items-center rounded-full bg-finance-gold/10 px-4 py-2 text-sm font-medium text-finance-gold-dark ring-1 ring-inset ring-finance-gold/20">
              <span className="mr-2">💰</span>
              Ferramentas Financeiras para Decisões Inteligentes
            </div>
            
            <h1 className="mx-auto max-w-4xl text-4xl font-bold tracking-tight text-text-primary sm:text-5xl lg:text-6xl">
              Calculadoras
              <span className="block bg-gradient-to-r from-finance-gold via-finance-gold-light to-finance-gold bg-clip-text text-transparent">
                Financeiras
              </span>
            </h1>
            
            <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-text-secondary-dark sm:text-xl">
              Planeje seu futuro financeiro com ferramentas especializadas para{" "}
              <strong className="text-finance-gold-dark">investimentos, financiamentos e planejamento</strong>.
              Tome decisões inteligentes baseadas em dados precisos.
            </p>
            
            {/* Finance-specific Trust Indicators */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4 text-sm text-text-secondary">
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-system-success"></div>
                <span className="font-medium">Cálculos Precisos</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-finance-gold"></div>
                <span className="font-medium">Simulações Avançadas</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-primary-blue"></div>
                <span className="font-medium">Educação Financeira</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Investment vs Other Categories */}
      <section className="bg-surface-dark/30 py-12">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-text-primary sm:text-3xl">
              Calculadoras por Tipo
            </h2>
            <p className="mt-2 text-text-secondary">
              Escolha a categoria que melhor atende sua necessidade
            </p>
          </div>
          
          <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-3">
            {/* Investments */}
            <div className="rounded-2xl bg-gradient-to-br from-finance-gold/10 to-finance-gold/5 p-8">
              <div className="flex items-center space-x-3 mb-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-finance-gold text-white">
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
                  <div key={calc.id} className="text-sm">
                    <span className="text-finance-gold-dark">•</span> {calc.name.replace('Calculadora de ', '').replace('Calculadora ', '')}
                  </div>
                ))}
              </div>
            </div>

            {/* Financing */}
            <div className="rounded-2xl bg-gradient-to-br from-primary-blue/10 to-primary-blue/5 p-8">
              <div className="flex items-center space-x-3 mb-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-blue text-white">
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
                  <div key={calc.id} className="text-sm">
                    <span className="text-primary-blue-dark">•</span> {calc.name.replace('Calculadora de ', '').replace('Calculadora ', '')}
                  </div>
                ))}
              </div>
            </div>

            {/* Planning */}
            <div className="rounded-2xl bg-gradient-to-br from-system-success/10 to-system-success/5 p-8">
              <div className="flex items-center space-x-3 mb-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-system-success text-white">
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
                  <div key={calc.id} className="text-sm">
                    <span className="text-system-success-dark">•</span> {calc.name.replace('Calculadora de ', '').replace('Calculadora ', '')}
                  </div>
                ))}
                <div className="text-sm">
                  <span className="text-system-success-dark">•</span> Planejamento de Aposentadoria
                </div>
                <div className="text-sm">
                  <span className="text-system-success-dark">•</span> Orçamento Familiar
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

      {/* CTA Section for Financial Success */}
      <section className="bg-gradient-to-r from-finance-gold-dark to-finance-gold py-16">
        <div className="mx-auto max-w-4xl px-6 text-center lg:px-8">
          <h2 className="text-3xl font-bold text-white sm:text-4xl">
            Comece a Planejar seu Futuro Financeiro
          </h2>
          <p className="mt-4 text-lg text-finance-gold-light">
            Use nossas calculadoras para simular investimentos e descobrir o caminho para sua independência financeira
          </p>
          
          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
            <a 
              href="#calculadoras"
              className="inline-flex items-center justify-center rounded-xl bg-white px-8 py-4 text-base font-semibold text-finance-gold-dark shadow-lg transition-all duration-300 hover:bg-gray-50 hover:shadow-xl hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-finance-gold-dark"
              aria-label="Ver todas as calculadoras financeiras"
            >
              📈 Ver Todas as Calculadoras
            </a>
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
