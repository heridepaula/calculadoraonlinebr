import type { MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";
import { Card, CardHeader, CardTitle, CardContent, Breadcrumb, BreadcrumbItem } from "~/components/ui";
import { APP_NAME, CALCULATORS } from "~/lib/constants";
import type { Calculator } from "~/types";

export const meta: MetaFunction = () => {
  return [
    { title: `Calculadoras de Saúde - ${APP_NAME}` },
    {
      name: "description",
      content: "Calculadoras de saúde gratuitas para cuidar do seu bem-estar. IMC, peso ideal e muito mais. Ferramentas confiáveis baseadas em padrões médicos.",
    },
    {
      name: "keywords",
      content: "calculadora saúde, IMC, índice massa corporal, peso ideal, saúde online, calculadora médica, bem-estar",
    },
    { name: "author", content: "Calculadora Online BR" },
    { property: "og:title", content: `Calculadoras de Saúde - ${APP_NAME}` },
    { property: "og:description", content: "Monitore sua saúde com nossas calculadoras médicas gratuitas e confiáveis." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary" },
    { name: "twitter:title", content: `Calculadoras de Saúde - ${APP_NAME}` },
    { name: "twitter:description", content: "Ferramentas de saúde gratuitas para monitorar seu bem-estar." },
  ];
};

export default function SaudeIndex() {
  const saudeCalculators = CALCULATORS.filter((calc: Calculator) => calc.category === "saude");

  return (
    <div className="space-y-8">
      <Breadcrumb>
        <BreadcrumbItem href="/">Início</BreadcrumbItem>
        <BreadcrumbItem href="/calculadora">Calculadoras</BreadcrumbItem>
        <BreadcrumbItem isLast>Saúde</BreadcrumbItem>
      </Breadcrumb>

      <header className="text-center space-y-4">
        <div className="flex items-center justify-center space-x-3 mb-4">
          <span className="text-5xl" role="img" aria-label="Saúde">🏥</span>
          <h1 className="text-3xl font-bold text-text-primary md:text-4xl">
            Calculadoras de Saúde
          </h1>
        </div>
        <p className="mx-auto max-w-3xl text-lg text-text-secondary-dark">
          Monitore sua saúde e bem-estar com nossas calculadoras baseadas em <strong className="text-primary-blue-dark">padrões médicos reconhecidos</strong>. 
          Ferramentas confiáveis para acompanhar indicadores importantes da sua saúde.
        </p>
      </header>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {saudeCalculators.map((calculator: Calculator) => (
          <Card key={calculator.id} className="group relative overflow-hidden bg-gradient-to-br from-white via-primary-blue-light/30 to-primary-blue-light/50 transition-all duration-300 hover:shadow-2xl hover:scale-[1.02]">
            {/* Decorative Elements */}
            <div className="absolute -top-4 -right-4 h-24 w-24 rounded-full bg-primary-blue/10 transition-all duration-300 group-hover:scale-125 group-hover:bg-primary-blue/20:bg-primary-blue/30"></div>
            <div className="absolute -bottom-2 -left-2 h-16 w-16 rounded-full bg-growth-green/10 transition-all duration-300 group-hover:scale-110"></div>
            
            <CardContent className="relative p-6">
              {/* Header Section */}
              <div className="mb-4 flex items-start space-x-4">
                <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-2xl bg-gray-900 shadow-md transition-all duration-300 group-hover:shadow-lg group-hover:scale-110 group-hover:rotate-6">
                  <svg className="h-7 w-7 text-primary-blue-dark" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
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
                  <div className="group/btn relative overflow-hidden rounded-2xl bg-gradient-to-r from-primary-blue via-primary-blue-action to-primary-blue p-4 shadow-xl transition-all duration-300 hover:shadow-2xl hover:shadow-primary-blue/30 hover:-translate-y-2 hover:scale-[1.03] active:scale-[0.97]:shadow-primary-blue-dark/30">
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
                            Resultado em segundos
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
                <span className="inline-flex items-center rounded-full bg-primary-blue/10 px-3 py-1 text-xs font-medium text-primary-blue">
                  🏥 Saúde
                </span>
                <div className="flex space-x-2">
                  <span className="inline-flex items-center rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-700">
                    ✓ Gratuito
                  </span>
                  <span className="inline-flex items-center rounded-full bg-blue-100 px-2 py-1 text-xs font-medium text-blue-700">
                    ⚡ Instantâneo
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card className="bg-primary-blue-light border-l-4 border-primary-blue">
          <CardHeader>
            <CardTitle as="h2" className="text-xl">
              🎯 Por que monitorar sua saúde?
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 text-sm text-text-secondary">
              <p><strong className="text-primary-blue-dark">Prevenção:</strong> Identifique riscos antes que se tornem problemas</p>
              <p><strong className="text-primary-blue-dark">Controle:</strong> Acompanhe a evolução de indicadores importantes</p>
              <p><strong className="text-primary-blue-dark">Motivação:</strong> Veja o progresso dos seus hábitos saudáveis</p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-growth-green-soft border-l-4 border-growth-green">
          <CardHeader>
            <CardTitle as="h2" className="text-xl">
              ⚕️ Baseado em padrões médicos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 text-sm text-text-secondary">
              <p><strong className="text-growth-green">OMS:</strong> Seguimos diretrizes da Organização Mundial da Saúde</p>
              <p><strong className="text-growth-green">Precisão:</strong> Fórmulas validadas cientificamente</p>
              <p><strong className="text-growth-green">Confiabilidade:</strong> Resultados em que você pode confiar</p>
            </div>
          </CardContent>
        </Card>
      </section>

      <section className="rounded-lg border-l-4 border-system-warning bg-system-warning/10 p-6 duration-300">
        <h3 className="mb-2 text-lg font-semibold text-text-primary-dark flex items-center">
          ⚠️ Aviso Importante
        </h3>
        <p className="text-sm text-text-secondary-dark">
          Nossas calculadoras são ferramentas informativas baseadas em padrões médicos reconhecidos. 
          Os resultados <strong>não substituem consulta médica profissional</strong>. 
          Sempre consulte um profissional de saúde para avaliações completas e orientações personalizadas.
        </p>
      </section>
    </div>
  );
}