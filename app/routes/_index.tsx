import type { MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";
import { CATEGORIES } from "~/lib/constants";
import type { Category } from "~/types";

export const meta: MetaFunction = () => {
  return [
    { title: "Calculadora Online BR - Início" },
    { name: "description", content: "Calculadoras online gratuitas organizadas por categoria: Saúde, Finanças e Matemática. Interface moderna e resultados precisos." },
    { name: "keywords", content: "calculadora online, saúde, finanças, matemática, IMC, juros, porcentagem, grátis" },
    { name: "author", content: "Calculadora Online BR" },
    { property: "og:title", content: "Calculadora Online BR - Ferramentas Gratuitas" },
    { property: "og:description", content: "Acesse calculadoras organizadas por categoria. Saúde, finanças e matemática em um só lugar." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary" },
    { name: "twitter:title", content: "Calculadora Online BR" },
    { name: "twitter:description", content: "Calculadoras gratuitas organizadas por categoria para facilitar seu dia a dia." },
  ];
};

export default function Index() {
  return (
    <div className="space-y-8">
      <section className="py-12 text-center">
        <h1 className="mb-4 text-4xl font-bold text-text-primary-dark md:text-5xl">
          Calculadora Online BR
        </h1>
        <p className="mx-auto mb-8 max-w-2xl text-xl text-text-secondary-dark">
          Calculadoras online gratuitas com design moderno e interface intuitiva
        </p>
      </section>

      <section>
        <h2 className="mb-6 text-2xl font-bold text-text-primary-dark">
          Explore por Categoria
        </h2>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {CATEGORIES.map((category: Category) => (
            <div
              key={category.id}
              className="card-primary rounded-lg border border-neutral-surface-variant bg-background-dark-secondary p-8 transition-all duration-300 hover:scale-105"
            >
              <div className="mb-4 text-center">
                <span className="text-4xl mb-3 block" role="img" aria-label={category.name}>
                  {category.icon}
                </span>
                <h3 className="text-xl font-semibold text-text-primary-dark">
                  {category.name}
                </h3>
              </div>
              <p className="mb-6 text-center text-text-secondary-dark">
                {category.description}
              </p>
              <div className="text-center">
                <Link
                  to={category.path}
                  className="btn-primary inline-block flex min-h-[44px] items-center justify-center rounded-md bg-primary-blue-dark px-6 py-3 text-sm font-medium text-white transition-all duration-200 hover:bg-primary-blue"
                >
                  Ver Calculadoras
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-lg bg-neutral-surface-dark p-8">
        <div className="text-center">
          <h2 className="mb-4 text-2xl font-bold text-text-primary-dark">
            Por que usar nossas calculadoras?
          </h2>
          <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
            <div className="text-center">
              <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-lg bg-primary-blue-dark transition-all duration-200 hover:scale-110">
                <span className="font-bold text-white">⚡</span>
              </div>
              <h3 className="mb-2 font-semibold text-text-primary-dark">
                Rápido e Preciso
              </h3>
              <p className="text-sm text-text-secondary-dark">
                Resultados instantâneos com alta precisão matemática
              </p>
            </div>
            <div className="text-center">
              <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-lg bg-growth-green-dark transition-all duration-200 hover:scale-110">
                <span className="font-bold text-white">🔓</span>
              </div>
              <h3 className="mb-2 font-semibold text-text-primary-dark">
                100% Gratuito
              </h3>
              <p className="text-sm text-text-secondary-dark">
                Todas as calculadoras promovem crescimento financeiro gratuito
              </p>
            </div>
            <div className="text-center">
              <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-lg bg-system-info-dark transition-all duration-200 hover:scale-110">
                <span className="font-bold text-white">📱</span>
              </div>
              <h3 className="mb-2 font-semibold text-text-primary-dark">
                Confiança Mobile
              </h3>
              <p className="text-sm text-text-secondary-dark">
                Interface otimizada para todos os dispositivos
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
