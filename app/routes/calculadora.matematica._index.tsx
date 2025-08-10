import type { MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";
import { Card, CardHeader, CardTitle, CardContent, Breadcrumb, BreadcrumbItem } from "~/components/ui";
import { APP_NAME, CALCULATORS } from "~/lib/constants";
import type { Calculator } from "~/types";

export const meta: MetaFunction = () => {
  return [
    { title: `Calculadoras Matemáticas - ${APP_NAME}` },
    {
      name: "description",
      content: "Calculadoras matemáticas gratuitas para o dia a dia. Porcentagem, regra de três, conversões e muito mais. Resolva cálculos rapidamente.",
    },
    {
      name: "keywords",
      content: "calculadora matemática, porcentagem, regra de três, cálculos, matemática básica, operações matemáticas",
    },
    { name: "author", content: "Calculadora Online BR" },
    { property: "og:title", content: `Calculadoras Matemáticas - ${APP_NAME}` },
    { property: "og:description", content: "Resolva cálculos matemáticos do dia a dia com nossas ferramentas gratuitas." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary" },
    { name: "twitter:title", content: `Calculadoras Matemáticas - ${APP_NAME}` },
    { name: "twitter:description", content: "Ferramentas matemáticas gratuitas para resolver cálculos rapidamente." },
  ];
};

export default function MatematicaIndex() {
  const matematicaCalculators = CALCULATORS.filter((calc: Calculator) => calc.category === "matematica");

  return (
    <div className="space-y-8">
      <Breadcrumb>
        <BreadcrumbItem href="/">Início</BreadcrumbItem>
        <BreadcrumbItem href="/calculadora">Calculadoras</BreadcrumbItem>
        <BreadcrumbItem isLast>Matemática</BreadcrumbItem>
      </Breadcrumb>

      <header className="text-center space-y-4">
        <div className="flex items-center justify-center space-x-3 mb-4">
          <span className="text-5xl" role="img" aria-label="Matemática">🔢</span>
          <h1 className="text-3xl font-bold text-text-primary md:text-4xl">
            Calculadoras Matemáticas
          </h1>
        </div>
        <p className="mx-auto max-w-3xl text-lg text-text-secondary-dark">
          Resolva cálculos matemáticos do dia a dia de forma rápida e precisa. Ferramentas essenciais para 
          <strong className="text-primary-blue-dark"> estudos, trabalho e uso pessoal</strong>. 
          Resultados instantâneos e explicações claras.
        </p>
      </header>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {matematicaCalculators.map((calculator: Calculator) => (
          <Card key={calculator.id} className="group relative overflow-hidden bg-gradient-to-br from-white via-system-info/10 to-system-info/20 transition-all duration-300 hover:shadow-2xl hover:scale-[1.02]">
            {/* Decorative Elements */}
            <div className="absolute -top-4 -right-4 h-24 w-24 rounded-full bg-system-info/10 transition-all duration-300 group-hover:scale-125 group-hover:bg-system-info/20:bg-system-info/30"></div>
            <div className="absolute -bottom-2 -left-2 h-16 w-16 rounded-full bg-growth-green/10 transition-all duration-300 group-hover:scale-110"></div>
            
            <CardContent className="relative p-6">
              {/* Header Section */}
              <div className="mb-4 flex items-start space-x-4">
                <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-2xl bg-gray-900 shadow-md transition-all duration-300 group-hover:shadow-lg group-hover:scale-110 group-hover:rotate-6">
                  <svg className="h-7 w-7 text-system-info" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
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
                  <div className="group/btn relative overflow-hidden rounded-2xl bg-gradient-to-r from-system-info via-system-info to-system-info/90 p-4 shadow-xl transition-all duration-300 hover:shadow-2xl hover:shadow-system-info/30 hover:-translate-y-2 hover:scale-[1.03] active:scale-[0.97]:shadow-system-info-dark/30">
                    {/* Button Shine Effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 transition-all duration-500 group-hover/btn:opacity-100 group-hover/btn:translate-x-full transform -translate-x-full"></div>
                    
                    {/* Button Content */}
                    <div className="relative flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-800/20 backdrop-blur-sm">
                          <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                          </svg>
                        </div>
                        <div>
                          <p className="text-base font-bold text-white">
                            Usar Calculadora
                          </p>
                          <p className="text-xs text-white/90">
                            Resolva rapidamente
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
                <span className="inline-flex items-center rounded-full bg-system-info/10 px-3 py-1 text-xs font-medium text-system-info">
                  🔢 Matemática
                </span>
                <div className="flex space-x-2">
                  <span className="inline-flex items-center rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-700">
                    ✓ Gratuito
                  </span>
                  <span className="inline-flex items-center rounded-full bg-purple-100 px-2 py-1 text-xs font-medium text-purple-700">
                    🧮 Preciso
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card className="bg-system-info/10 border-l-4 border-system-info">
          <CardHeader>
            <CardTitle as="h2" className="text-xl">
              ⚡ Rapidez e Precisão
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 text-sm text-text-secondary">
              <p><strong className="text-system-info">Instantâneo:</strong> Resultados calculados em tempo real</p>
              <p><strong className="text-system-info">Preciso:</strong> Algoritmos matemáticos validados</p>
              <p><strong className="text-system-info">Simples:</strong> Interface intuitiva para qualquer usuário</p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-primary-blue-light border-l-4 border-primary-blue">
          <CardHeader>
            <CardTitle as="h2" className="text-xl">
              📚 Uso Educacional
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 text-sm text-text-secondary">
              <p><strong className="text-primary-blue-dark">Estudantes:</strong> Verifique seus cálculos e aprenda</p>
              <p><strong className="text-primary-blue-dark">Professores:</strong> Use como ferramenta de apoio</p>
              <p><strong className="text-primary-blue-dark">Profissionais:</strong> Agilize cálculos do trabalho</p>
            </div>
          </CardContent>
        </Card>
      </section>

      <section className="rounded-lg border-l-4 border-growth-green bg-growth-green-soft p-6 duration-300">
        <h3 className="mb-2 text-lg font-semibold text-text-primary-dark flex items-center">
          🎯 Aplicações Práticas
        </h3>
        <p className="text-sm text-text-secondary-dark">
          Nossas calculadoras matemáticas são ideais para situações do cotidiano: 
          <strong className="text-growth-green"> calcular descontos em compras</strong>, 
          resolver problemas escolares, fazer conversões de unidades e muito mais. 
          Ferramentas essenciais que tornam a matemática mais acessível.
        </p>
      </section>
    </div>
  );
}