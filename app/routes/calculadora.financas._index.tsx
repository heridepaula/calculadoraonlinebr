import type { MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";
import { Card, CardHeader, CardTitle, CardContent, Breadcrumb, BreadcrumbItem } from "~/components/ui";
import { APP_NAME, CALCULATORS } from "~/lib/constants";
import type { Calculator } from "~/types";

export const meta: MetaFunction = () => {
  return [
    { title: `Calculadoras Financeiras - ${APP_NAME}` },
    {
      name: "description",
      content: "★ Calculadoras financeiras GRATUITAS para planejamento e investimentos. Juros simples, compostos, primeiro milhão e muito mais. Ferramentas precisas para decisões financeiras inteligentes com conteúdo educativo completo.",
    },
    {
      name: "keywords",
      content: "calculadora financeira, juros compostos, juros simples, primeiro milhão, investimento, financiamento, planejamento financeiro, simulação, aportes mensais, matemática financeira, educação financeira, rendimento, poupança, CDI, tesouro direto",
    },
    { name: "author", content: "Calculadora Online BR" },
    { property: "og:title", content: `Calculadoras Financeiras - ${APP_NAME}` },
    { property: "og:description", content: "Planeje suas finanças com nossas calculadoras especializadas. Grátis e fácil de usar." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary" },
    { name: "twitter:title", content: `Calculadoras Financeiras - ${APP_NAME}` },
    { name: "twitter:description", content: "Ferramentas financeiras gratuitas para planejar investimentos e tomar melhores decisões." },
  ];
};

export default function FinancasIndex() {
  const financasCalculators = CALCULATORS.filter((calc: Calculator) => calc.category === "financas");

  return (
    <div className="space-y-8">
      <Breadcrumb>
        <BreadcrumbItem href="/">Início</BreadcrumbItem>
        <BreadcrumbItem href="/calculadora">Calculadoras</BreadcrumbItem>
        <BreadcrumbItem isLast>Finanças</BreadcrumbItem>
      </Breadcrumb>

      <header className="text-center space-y-4">
        <div className="flex items-center justify-center space-x-3 mb-4">
          <span className="text-5xl" role="img" aria-label="Finanças">💰</span>
          <h1 className="text-3xl font-bold text-text-primary md:text-4xl">
            Calculadoras Financeiras
          </h1>
        </div>
        <p className="mx-auto max-w-3xl text-lg text-text-secondary-dark">
          Planeje seu futuro financeiro com nossas calculadoras especializadas. Ferramentas para 
          <strong className="text-growth-green"> investimentos, financiamentos e planejamento</strong> 
          que ajudam você a tomar decisões mais inteligentes.
        </p>
      </header>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {financasCalculators.map((calculator: Calculator) => (
          <Card key={calculator.id} className="group relative overflow-hidden bg-gradient-to-br from-white via-growth-green-soft/30 to-growth-green-soft/50 transition-all duration-300 hover:shadow-2xl hover:scale-[1.02]">
            {/* Decorative Elements */}
            <div className="absolute -top-4 -right-4 h-24 w-24 rounded-full bg-growth-green/10 transition-all duration-300 group-hover:scale-125 group-hover:bg-growth-green/20:bg-growth-green/30"></div>
            <div className="absolute -bottom-2 -left-2 h-16 w-16 rounded-full bg-primary-blue/10 transition-all duration-300 group-hover:scale-110"></div>
            
            <CardContent className="relative p-6">
              {/* Header Section */}
              <div className="mb-4 flex items-start space-x-4">
                <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-2xl bg-gray-900 shadow-md transition-all duration-300 group-hover:shadow-lg group-hover:scale-110 group-hover:rotate-6">
                  <svg className="h-7 w-7 text-growth-green" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h2 className="text-lg font-bold text-text-primary line-clamp-2">
                    {calculator.name}
                  </h2>
                  <p className="text-sm text-text-secondary mt-1">
                    {calculator.description}
                  </p>
                </div>
              </div>

              {/* Call-to-Action Button - DESTAQUE PRINCIPAL */}
              <div className="mt-6">
                <Link
                  to={calculator.path}
                  className="block w-full"
                >
                  <div className="group/btn relative overflow-hidden rounded-2xl bg-gradient-to-r from-growth-green via-growth-green-success to-growth-green p-4 shadow-xl transition-all duration-300 hover:shadow-2xl hover:shadow-growth-green/30 hover:-translate-y-2 hover:scale-[1.03] active:scale-[0.97]:shadow-growth-green-dark/30">
                    {/* Button Shine Effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 transition-all duration-500 group-hover/btn:opacity-100 group-hover/btn:translate-x-full transform -translate-x-full"></div>
                    
                    {/* Button Content */}
                    <div className="relative flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-800/20 backdrop-blur-sm">
                          <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                        <div>
                          <p className="text-base font-bold text-white">
                            Usar Calculadora
                          </p>
                          <p className="text-xs text-white/90">
                            Planeje suas finanças
                          </p>
                        </div>
                      </div>
                      <svg 
                        className="h-6 w-6 text-white transition-transform duration-300 group-hover/btn:translate-x-1 group-hover/btn:scale-110" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </div>
                  </div>
                </Link>
              </div>

              {/* Status Badges */}
              <div className="mt-4 flex items-center justify-between">
                <span className="inline-flex items-center rounded-full bg-growth-green/10 px-3 py-1 text-xs font-medium text-growth-green">
                  💰 Finanças
                </span>
                <div className="flex space-x-2">
                  <span className="inline-flex items-center rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-700">
                    ✓ Gratuito
                  </span>
                  <span className="inline-flex items-center rounded-full bg-blue-100 px-2 py-1 text-xs font-medium text-blue-700">
                    📊 Precisão
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card className="bg-growth-green-soft border-l-4 border-growth-green">
          <CardHeader>
            <CardTitle as="h2" className="text-xl">
              📊 Planejamento Inteligente
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 text-sm text-text-secondary">
              <p><strong className="text-growth-green">Simulações:</strong> Veja cenários antes de investir ou financiar</p>
              <p><strong className="text-growth-green">Comparações:</strong> Analise diferentes opções de investimento</p>
              <p><strong className="text-growth-green">Decisões:</strong> Tome escolhas baseadas em dados concretos</p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-primary-blue-light border-l-4 border-primary-blue">
          <CardHeader>
            <CardTitle as="h2" className="text-xl">
              💡 Educação Financeira
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 text-sm text-text-secondary">
              <p><strong className="text-primary-blue-dark">Conceitos:</strong> Entenda como funcionam juros e investimentos</p>
              <p><strong className="text-primary-blue-dark">Exemplos:</strong> Aprenda com casos práticos do dia a dia</p>
              <p><strong className="text-primary-blue-dark">Estratégias:</strong> Descubra como maximizar seus rendimentos</p>
            </div>
          </CardContent>
        </Card>
      </section>

      <section className="rounded-lg border-l-4 border-system-info bg-system-info/10 p-6 duration-300">
        <h3 className="mb-2 text-lg font-semibold text-text-primary-dark flex items-center">
          🎯 Maximize seus Resultados
        </h3>
        <p className="text-sm text-text-secondary-dark">
          Use nossas calculadoras para simular diferentes cenários e encontrar as melhores oportunidades. 
          <strong className="text-growth-green"> Compare opções, entenda os juros compostos</strong> 
          e descubra como pequenas diferenças podem gerar grandes resultados ao longo do tempo.
        </p>
      </section>
    </div>
  );
}