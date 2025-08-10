import type { MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";
import { Card, CardHeader, CardTitle, CardContent } from "~/components/ui";
import { APP_NAME, CATEGORIES } from "~/lib/constants";
import type { Category } from "~/types";

export const meta: MetaFunction = () => {
  return [
    { title: `Calculadoras Online por Categoria - ${APP_NAME}` },
    {
      name: "description",
      content: "Explore nossas calculadoras organizadas por categoria: Saúde, Finanças e Matemática. Ferramentas gratuitas para facilitar seu dia a dia.",
    },
    {
      name: "keywords",
      content: "calculadoras online, categorias, saúde, finanças, matemática, ferramentas gratuitas, calcular",
    },
    { name: "author", content: "Calculadora Online BR" },
    { property: "og:title", content: `Calculadoras por Categoria - ${APP_NAME}` },
    { property: "og:description", content: "Acesse calculadoras organizadas por categoria. Saúde, finanças e matemática em um só lugar." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary" },
    { name: "twitter:title", content: `Calculadoras por Categoria - ${APP_NAME}` },
    { name: "twitter:description", content: "Explore calculadoras organizadas por categoria para facilitar seus cálculos." },
  ];
};

export default function CalculadoraIndex() {
  return (
    <div className="space-y-8">
      <header className="text-center space-y-4">
        <h1 className="mb-4 text-3xl font-bold text-text-primary md:text-4xl">
          Calculadoras por Categoria
        </h1>
        <p className="mx-auto max-w-3xl text-lg text-text-secondary-dark">
          Encontre rapidamente a calculadora que você precisa. Organizamos nossas ferramentas por categoria 
          para facilitar sua busca e tornar seus cálculos mais eficientes.
        </p>
      </header>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {CATEGORIES.map((category: Category) => (
          <Card key={category.id} className="group relative overflow-hidden transition-all duration-300 hover:shadow-2xl hover:scale-[1.02]">
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-primary-blue-dark/10"></div>
            
            <CardContent className="relative p-6">
              {/* Header Section */}
              <div className="mb-4 flex items-center space-x-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary-blue-light transition-all duration-300 group-hover:bg-primary-blue-dark group-hover:rotate-6 group-hover:scale-110">
                  <span className="text-3xl transition-all duration-300 group-hover:scale-110" role="img" aria-label={category.name}>
                    {category.icon}
                  </span>
                </div>
                <div>
                  <h2 className="text-xl font-bold text-text-primary-dark">
                    {category.name}
                  </h2>
                  <p className="text-xs font-medium text-primary-blue-dark uppercase tracking-wider">
                    Categoria
                  </p>
                </div>
              </div>

              {/* Description */}
              <p className="mb-6 text-sm text-text-secondary-dark leading-relaxed">
                {category.description}
              </p>

              {/* Prominent Call-to-Action Button */}
              <Link
                to={category.path}
                className="block w-full"
              >
                <div className="group/btn relative overflow-hidden rounded-xl bg-gradient-to-r from-primary-blue-dark to-primary-blue p-4 text-center shadow-lg transition-all duration-300 hover:shadow-xl hover:shadow-primary-blue-dark/25 hover:-translate-y-1 hover:scale-[1.02] active:scale-[0.98]">
                  {/* Button background animation */}
                  <div className="absolute inset-0 bg-gradient-to-r from-primary-blue to-primary-blue-dark opacity-0 transition-opacity duration-300 group-hover/btn:opacity-100"></div>
                  
                  <div className="relative flex items-center justify-center space-x-2">
                    <span className="font-bold text-white">
                      Explorar Calculadoras
                    </span>
                    <svg 
                      className="h-5 w-5 text-white transition-transform duration-300 group-hover/btn:translate-x-1 group-hover/btn:scale-110" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </div>
                </div>
              </Link>

              {/* Feature Badges */}
              <div className="mt-4 flex justify-center space-x-2">
                <span className="inline-flex items-center rounded-full bg-system-success/20 px-2 py-1 text-xs font-medium text-system-success">
                  ✓ Gratuito
                </span>
                <span className="inline-flex items-center rounded-full bg-primary-blue-dark/20 px-2 py-1 text-xs font-medium text-primary-blue-dark">
                  ⚡ Rápido
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <section className="rounded-lg bg-primary-blue-light p-8 duration-300">
        <h2 className="mb-4 text-2xl font-bold text-text-primary-dark">
          Como usar nossas calculadoras
        </h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <div className="text-center">
            <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-lg bg-primary-blue-dark">
              <span className="font-bold text-white">1</span>
            </div>
            <h3 className="mb-2 font-semibold text-text-primary-dark">
              Escolha a Categoria
            </h3>
            <p className="text-sm text-text-secondary-dark">
              Selecione a categoria que melhor se adequa ao seu tipo de cálculo
            </p>
          </div>
          <div className="text-center">
            <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-lg bg-growth-green-dark">
              <span className="font-bold text-white">2</span>
            </div>
            <h3 className="mb-2 font-semibold text-text-primary-dark">
              Selecione a Calculadora
            </h3>
            <p className="text-sm text-text-secondary-dark">
              Encontre a ferramenta específica para seu cálculo
            </p>
          </div>
          <div className="text-center">
            <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-lg bg-system-info-dark">
              <span className="font-bold text-white">3</span>
            </div>
            <h3 className="mb-2 font-semibold text-text-primary-dark">
              Insira os Dados
            </h3>
            <p className="text-sm text-text-secondary-dark">
              Preencha os campos e obtenha seu resultado instantaneamente
            </p>
          </div>
        </div>
      </section>

      <section className="rounded-lg border-l-4 border-growth-green bg-growth-green-soft p-6 duration-300">
        <h3 className="mb-2 text-lg font-semibold text-text-primary-dark">
          💡 Organização Inteligente
        </h3>
        <p className="text-sm text-text-secondary-dark">
          Nossa organização por categorias foi pensada para{" "}
          <strong className="text-primary-blue-dark">
            economizar seu tempo
          </strong>{" "}
          e{" "}
          <strong className="text-growth-green-dark">
            facilitar a navegação
          </strong>
          . Cada categoria agrupa ferramentas relacionadas para uma experiência mais intuitiva.
        </p>
      </section>
    </div>
  );
}