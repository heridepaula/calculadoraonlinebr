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

const category = {
  id: "datas",
  name: "Datas",
  description: "Calculadoras e ferramentas para trabalhar com datas e tempo",
  icon: "📅",
};

export const meta: MetaFunction = () => {
  return [
    { title: "Calculadoras de Datas Grátis 2025 | Cálculo de Tempo" },
    {
      name: "description",
      content:
        "Calcule diferenças entre datas, períodos e intervalos temporais GRÁTIS! Ferramentas confiáveis para planejamento, dias úteis e cálculos de tempo.",
    },
    {
      name: "keywords",
      content:
        "calculadora data, diferença entre datas, calculadora tempo, dias úteis, idade, período tempo, intervalo datas, planejamento temporal, calculadora gratuita",
    },
    {
      name: "robots",
      content: "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1",
    },
    {
      name: "author",
      content: "CalculadoraOnlineBR",
    },
    {
      name: "viewport",
      content: "width=device-width, initial-scale=1.0",
    },
    {
      property: "og:title",
      content: "Calculadoras de Datas Grátis 2025 | Cálculo de Tempo",
    },
    {
      property: "og:description",
      content: "Calcule diferenças entre datas, períodos e intervalos temporais GRÁTIS! Ferramentas confiáveis para planejamento.",
    },
    {
      property: "og:type",
      content: "website",
    },
    {
      property: "og:url",
      content: "https://www.calculadoraonlinebr.com.br/calculadoras/datas",
    },
    {
      property: "og:image",
      content: "https://www.calculadoraonlinebr.com.br/og-images/datas-calculadoras.jpg",
    },
    {
      property: "og:image:alt",
      content: "Calculadoras de Datas - Interface mostrando diversas ferramentas para cálculos temporais",
    },
    {
      property: "og:site_name",
      content: "CalculadoraOnlineBR",
    },
    {
      property: "og:locale",
      content: "pt_BR",
    },
    {
      name: "twitter:card",
      content: "summary_large_image",
    },
    {
      name: "twitter:title",
      content: "Calculadoras de Datas Grátis 2025 | Cálculo de Tempo",
    },
    {
      name: "twitter:description",
      content: "Calcule diferenças entre datas, períodos e intervalos temporais GRÁTIS! Ferramentas confiáveis para planejamento.",
    },
    {
      name: "twitter:image",
      content: "https://www.calculadoraonlinebr.com.br/og-images/datas-calculadoras.jpg",
    },
    {
      name: "twitter:image:alt",
      content: "Calculadoras de Datas - Interface mostrando diversas ferramentas para cálculos temporais",
    },
    {
      rel: "canonical",
      href: "https://www.calculadoraonlinebr.com.br/calculadoras/datas",
    },
  ];
};

export default function DatasIndex() {
  const datasCalculators = CALCULATORS.filter(
    (calc: Calculator) => calc.category === "datas"
  );

  return (
    <div className="min-h-screen">
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "WebSite",
                "@id": "https://www.calculadoraonlinebr.com.br/#website",
                "url": "https://www.calculadoraonlinebr.com.br/",
                "name": "CalculadoraOnlineBR",
                "description": "Calculadoras online gratuitas para matemática, finanças, saúde e datas",
                "inLanguage": "pt-BR",
                "potentialAction": {
                  "@type": "SearchAction",
                  "target": "https://www.calculadoraonlinebr.com.br/search?q={search_term_string}",
                  "query-input": "required name=search_term_string"
                }
              },
              {
                "@type": "CollectionPage",
                "@id": "https://www.calculadoraonlinebr.com.br/calculadoras/datas#webpage",
                "url": "https://www.calculadoraonlinebr.com.br/calculadoras/datas",
                "name": "Calculadoras de Datas Grátis 2025",
                "description": "Calcule diferenças entre datas, períodos e intervalos temporais GRÁTIS! Ferramentas confiáveis para planejamento, dias úteis e cálculos de tempo.",
                "isPartOf": {
                  "@id": "https://www.calculadoraonlinebr.com.br/#website"
                },
                "inLanguage": "pt-BR",
                "breadcrumb": {
                  "@id": "https://www.calculadoraonlinebr.com.br/calculadoras/datas#breadcrumb"
                },
                "mainEntity": {
                  "@type": "ItemList",
                  "name": "Calculadoras de Datas",
                  "description": "Lista de ferramentas para cálculos temporais e planejamento",
                  "numberOfItems": 1,
                  "itemListElement": [
                    {
                      "@type": "SoftwareApplication",
                      "name": "Calculadora de Diferença entre Datas",
                      "description": "Calcule períodos, intervalos e diferenças entre datas",
                      "url": "https://www.calculadoraonlinebr.com.br/calculadoras/datas/diferenca-entre-datas",
                      "applicationCategory": "UtilitiesApplication",
                      "operatingSystem": "Web",
                      "isAccessibleForFree": true
                    }
                  ]
                }
              },
              {
                "@type": "BreadcrumbList",
                "@id": "https://www.calculadoraonlinebr.com.br/calculadoras/datas#breadcrumb",
                "itemListElement": [
                  {
                    "@type": "ListItem",
                    "position": 1,
                    "name": "Início",
                    "item": "https://www.calculadoraonlinebr.com.br/"
                  },
                  {
                    "@type": "ListItem",
                    "position": 2,
                    "name": "Calculadoras",
                    "item": "https://www.calculadoraonlinebr.com.br/calculadoras"
                  },
                  {
                    "@type": "ListItem",
                    "position": 3,
                    "name": "Datas",
                    "item": "https://www.calculadoraonlinebr.com.br/calculadoras/datas"
                  }
                ]
              }
            ]
          })
        }}
      />

      {/* Breadcrumb Navigation */}
      <div className="border-b border-border-primary bg-surface-light px-6 py-4">
        <div className="mx-auto max-w-7xl">
          <Breadcrumb>
            <BreadcrumbItem href="/">Início</BreadcrumbItem>
            <BreadcrumbItem href="/calculadoras">Calculadoras</BreadcrumbItem>
            <BreadcrumbItem isLast>Datas</BreadcrumbItem>
          </Breadcrumb>
        </div>
      </div>

      <CategoryHero
        category="datas"
        title="Calculadoras"
        subtitle="de Datas"
        description="Ferramentas confiáveis para **cálculos temporais e períodos**. Calcule diferenças entre datas, períodos de trabalho e planeje eventos facilmente."
        badge={{
          icon: "📅",
          text: "Ferramentas Temporais para Planejamento Fácil"
        }}
        trustIndicators={[
          { color: "bg-system-success", text: "Cálculos Confiáveis" },
          { color: "bg-primary-blue", text: "Múltiplos Formatos" },
          { color: "bg-system-info", text: "Planejamento Fácil" }
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
              Comece por aqui: as calculadoras de datas mais populares
            </p>
          </div>
          
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            <QuickAccessCard
              title="Diferença entre Datas"
              description="Calcule períodos, intervalos e diferenças entre duas datas." 
              icon="📅"
              href="/calculadoras/datas/diferenca-entre-datas"
              category="datas"
              isPopular={true}
              complexity="basic"
            />
            <QuickAccessCard
              title="Calculadora de Idade"
              description="Descubra sua idade em anos, meses, dias, horas e minutos."
              icon="🎂"
              href="/calculadoras/datas/idade"
              category="datas"
              isPopular={true}
              complexity="basic"
            />
            <QuickAccessCard
              title="Dias Úteis"
              description="Calcule períodos de trabalho excluindo fins de semana e feriados."
              icon="💼"
              href="/calculadoras/datas/dias-uteis"
              category="datas"
              complexity="basic"
            />
          </div>
        </div>
      </section>

      {/* Date Stats Section */}
      <CategoryStats
        category="datas"
        stats={[
          {
            icon: "📅",
            number: "1+",
            label: "Calculadoras",
            description: "Ferramentas especializadas"
          },
          {
            icon: "📊",
            number: "100%",
            label: "Confiabilidade",
            description: "Cálculos validados"
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

      {/* Date Categories */}
      <section className="py-12">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold text-text-primary sm:text-3xl">
              Calculadoras por Especialidade
            </h2>
            <p className="mt-2 text-text-secondary">
              Explore diferentes tipos de cálculos temporais e de datas
            </p>
          </div>
          
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            {/* Date Calculations */}
            <div className="group rounded-2xl bg-gradient-to-br from-system-info/10 to-system-info/5 p-8 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-system-info/25">
              <div className="flex items-center space-x-3 mb-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-system-info text-white transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
                  <span className="text-xl">📊</span>
                </div>
                <h3 className="text-xl font-bold text-text-primary">Cálculos de Períodos</h3>
              </div>
              <p className="text-sm text-text-secondary mb-4">
                Calcule diferenças e intervalos entre datas facilmente
              </p>
              <div className="space-y-2">
                <div className="text-sm group-hover:translate-x-1 transition-transform duration-300">
                  <span className="text-system-info-dark">•</span> Diferença entre Datas
                </div>
                <div className="text-sm group-hover:translate-x-1 transition-transform duration-300">
                  <span className="text-system-info-dark">•</span> Calculadora de Idade
                </div>
                <div className="text-sm group-hover:translate-x-1 transition-transform duration-300">
                  <span className="text-system-info-dark">•</span> Períodos Específicos
                </div>
              </div>
            </div>

            {/* Business Days */}
            <div className="group rounded-2xl bg-gradient-to-br from-system-success/10 to-system-success/5 p-8 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-system-success/25">
              <div className="flex items-center space-x-3 mb-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-system-success text-white transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
                  <span className="text-xl">💼</span>
                </div>
                <h3 className="text-xl font-bold text-text-primary">Dias Úteis</h3>
              </div>
              <p className="text-sm text-text-secondary mb-4">
                Calcule períodos de trabalho considerando feriados e finais de semana
              </p>
              <div className="space-y-2">
                <div className="text-sm group-hover:translate-x-1 transition-transform duration-300">
                  <span className="text-system-success-dark">•</span> Dias Úteis entre Datas
                </div>
                <div className="text-sm group-hover:translate-x-1 transition-transform duration-300">
                  <span className="text-system-success-dark">•</span> Calendário Comercial
                </div>
                <div className="text-sm group-hover:translate-x-1 transition-transform duration-300">
                  <span className="text-system-success-dark">•</span> Feriados Nacionais
                </div>
              </div>
            </div>

            {/* Planning Tools */}
            <div className="group rounded-2xl bg-gradient-to-br from-primary-blue/10 to-primary-blue/5 p-8 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-primary-blue/25">
              <div className="flex items-center space-x-3 mb-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-blue text-white transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
                  <span className="text-xl">🗓️</span>
                </div>
                <h3 className="text-xl font-bold text-text-primary">Planejamento</h3>
              </div>
              <p className="text-sm text-text-secondary mb-4">
                Ferramentas para organização temporal e planejamento de eventos
              </p>
              <div className="space-y-2">
                <div className="text-sm group-hover:translate-x-1 transition-transform duration-300">
                  <span className="text-primary-blue-dark">•</span> Adicionar/Subtrair Dias
                </div>
                <div className="text-sm group-hover:translate-x-1 transition-transform duration-300">
                  <span className="text-primary-blue-dark">•</span> Planejamento de Projetos
                </div>
                <div className="text-sm group-hover:translate-x-1 transition-transform duration-300">
                  <span className="text-primary-blue-dark">•</span> Marcos Temporais
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* All Date Calculators */}
      {datasCalculators.length > 0 && (
        <section className="py-16">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-text-primary sm:text-4xl">
                Todas as Calculadoras de Datas
              </h2>
              <p className="mt-4 text-lg text-text-secondary-dark">
                Escolha a ferramenta ideal para seus cálculos temporais
              </p>
            </div>
            
            <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {datasCalculators.map((calculator: Calculator) => (
                <CalculatorCard key={calculator.id} calculator={calculator} category="datas" />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Coming Soon Message */}
      {datasCalculators.length === 0 && (
        <section className="py-16">
          <div className="mx-auto max-w-4xl px-6 lg:px-8 text-center">
            <div className="rounded-2xl bg-gradient-to-br from-system-info/10 to-system-info/5 p-12">
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-system-info/20 mb-6">
                <span className="text-3xl">🚧</span>
              </div>
              <h2 className="text-2xl font-bold text-text-primary mb-4">
                Calculadoras em Desenvolvimento
              </h2>
              <p className="text-lg text-text-secondary mb-6">
                Estamos criando ferramentas incríveis de datas para você! Em breve teremos calculadoras de:
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto">
                <div className="bg-background-primary/50 rounded-lg p-4">
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">📅</span>
                    <span className="font-medium">Diferença entre Datas</span>
                  </div>
                </div>
                <div className="bg-background-primary/50 rounded-lg p-4">
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">🎂</span>
                    <span className="font-medium">Calculadora de Idade</span>
                  </div>
                </div>
                <div className="bg-background-primary/50 rounded-lg p-4">
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">💼</span>
                    <span className="font-medium">Dias Úteis</span>
                  </div>
                </div>
                <div className="bg-background-primary/50 rounded-lg p-4">
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">⏰</span>
                    <span className="font-medium">Conversor de Fuso Horário</span>
                  </div>
                </div>
                <div className="bg-background-primary/50 rounded-lg p-4">
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">📆</span>
                    <span className="font-medium">Gerador de Calendário</span>
                  </div>
                </div>
                <div className="bg-background-primary/50 rounded-lg p-4">
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">🗓️</span>
                    <span className="font-medium">Planejamento de Eventos</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Date Education & Benefits */}
      <section className="bg-gradient-to-r from-surface-light to-surface py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-text-primary sm:text-3xl">
              Organização através do Tempo
            </h2>
          </div>
          
          <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div className="text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-system-info/20">
                <span className="text-2xl">📊</span>
              </div>
              <h3 className="mt-4 text-lg font-semibold text-text-primary">Confiabilidade</h3>
              <p className="mt-2 text-sm text-text-secondary">
                Calcule períodos e datas facilmente
              </p>
            </div>
            
            <div className="text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-system-success/20">
                <span className="text-2xl">💼</span>
              </div>
              <h3 className="mt-4 text-lg font-semibold text-text-primary">Produtividade</h3>
              <p className="mt-2 text-sm text-text-secondary">
                Otimize seu tempo e planejamento profissional
              </p>
            </div>
            
            <div className="text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-primary-blue/20">
                <span className="text-2xl">🎯</span>
              </div>
              <h3 className="mt-4 text-lg font-semibold text-text-primary">Planejamento</h3>
              <p className="mt-2 text-sm text-text-secondary">
                Organize eventos e projetos com antecedência
              </p>
            </div>
            
            <div className="text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-finance-gold/20">
                <span className="text-2xl">⚡</span>
              </div>
              <h3 className="mt-4 text-lg font-semibold text-text-primary">Agilidade</h3>
              <p className="mt-2 text-sm text-text-secondary">
                Resultados instantâneos para tomadas de decisão rápidas
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive CTA Section */}
      <section className="bg-gradient-to-r from-system-info-dark to-system-info py-16 relative overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <div className="h-full w-full bg-gradient-to-r from-transparent via-white/5 to-transparent"></div>
        </div>
        
        <div className="relative mx-auto max-w-4xl px-6 text-center lg:px-8">
          <h2 className="text-3xl font-bold text-white sm:text-4xl animate-pulse">
            ⏰ Organize seu Tempo Facilmente
          </h2>
          <p className="mt-4 text-lg text-system-info-light">
            Ferramentas gratuitas para <strong>calcular períodos e datas</strong> de forma fácil
          </p>
          
          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
            <a 
              href="/calculadoras/datas/diferenca-entre-datas"
              className="group inline-flex items-center justify-center rounded-xl bg-white px-8 py-4 text-base font-semibold text-system-info-dark shadow-lg transition-all duration-300 hover:bg-gray-50 hover:shadow-2xl hover:-translate-y-2 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-system-info-dark transform"
              aria-label="Calcular diferença entre datas"
            >
              <span className="mr-2 text-xl group-hover:animate-bounce">📅</span>
              Calcular Diferença entre Datas
              <svg className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </a>
            
            <a 
              href="/calculadoras/datas/idade"
              className="group inline-flex items-center justify-center rounded-xl border-2 border-white px-8 py-4 text-base font-semibold text-white transition-all duration-300 hover:bg-white hover:text-system-info-dark hover:shadow-2xl hover:-translate-y-2 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-system-info-dark transform"
              aria-label="Calcular idade"
            >
              <span className="mr-2 text-xl group-hover:animate-spin">🎂</span>
              Calcular Minha Idade
            </a>
          </div>
          
          {/* Trust indicators */}
          <div className="mt-8 flex items-center justify-center gap-8 text-sm text-system-info-light">
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-white animate-pulse"></div>
              <span>Cálculos Confiáveis</span>
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

      {/* Tips for Date Calculations */}
      <section className="bg-system-info/5 py-12">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <div className="rounded-2xl border border-system-info/20 bg-system-info/10 p-8">
            <div className="flex items-start space-x-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-system-info/20">
                <span className="text-xl">💡</span>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-text-primary">
                  Dica para Cálculos de Datas
                </h3>
                <p className="mt-2 text-text-secondary">
                  Para obter melhores resultados, sempre considere os
                  <strong className="text-system-info-dark"> fusos horários e formatos de data</strong> 
                  corretos. Nossas calculadoras consideram anos bissextos, variações mensais e 
                  ajustes de calendário para melhores resultados nos seus cálculos temporais.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <RelatedCalculators category="datas" />
    </div>
  );
}