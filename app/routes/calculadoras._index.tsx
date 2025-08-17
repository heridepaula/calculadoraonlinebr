import type { MetaFunction } from "@remix-run/node";
import { CategoryCard } from "~/components/CategoryCard";
import { APP_NAME, CATEGORIES } from "~/lib/constants";
import type { Category } from "~/types";

export const meta: MetaFunction = () => {
  return [
    { title: `Calculadoras Online por Categoria - ${APP_NAME}` },
    {
      name: "description",
      content:
        "Explore nossas calculadoras organizadas por categoria: Saúde, Finanças e Matemática. Ferramentas gratuitas para facilitar seu dia a dia.",
    },
    {
      name: "keywords",
      content:
        "calculadoras online, categorias, saúde, finanças, matemática, ferramentas gratuitas, calcular",
    },
    { name: "author", content: "Calculadora Online BR" },
    { property: "og:title", content: `Calculadoras por Categoria - ${APP_NAME}` },
    {
      property: "og:description",
      content:
        "Acesse calculadoras organizadas por categoria. Saúde, finanças e matemática em um só lugar.",
    },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary" },
    { name: "twitter:title", content: `Calculadoras por Categoria - ${APP_NAME}` },
    {
      name: "twitter:description",
      content: "Explore calculadoras organizadas por categoria para facilitar seus cálculos.",
    },
  ];
};

export default function CalculadoraIndex() {
  return (
    <div className="space-y-8">
      <header className="space-y-4 text-center">
        <h1 className="mb-4 text-3xl font-bold text-text-primary md:text-4xl">
          Calculadoras por Categoria
        </h1>
        <p className="mx-auto max-w-3xl text-lg text-text-secondary-dark">
          Encontre rapidamente a calculadora que você precisa. Organizamos nossas ferramentas por
          categoria para facilitar sua busca e tornar seus cálculos mais eficientes.
        </p>
      </header>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {CATEGORIES.map((category: Category) => (
          <CategoryCard key={category.id} category={category} />
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
            <h3 className="mb-2 font-semibold text-text-primary-dark">Escolha a Categoria</h3>
            <p className="text-sm text-text-secondary-dark">
              Selecione a categoria que melhor se adequa ao seu tipo de cálculo
            </p>
          </div>
          <div className="text-center">
            <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-lg bg-growth-green-dark">
              <span className="font-bold text-white">2</span>
            </div>
            <h3 className="mb-2 font-semibold text-text-primary-dark">Selecione a Calculadora</h3>
            <p className="text-sm text-text-secondary-dark">
              Encontre a ferramenta específica para seu cálculo
            </p>
          </div>
          <div className="text-center">
            <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-lg bg-system-info-dark">
              <span className="font-bold text-white">3</span>
            </div>
            <h3 className="mb-2 font-semibold text-text-primary-dark">Insira os Dados</h3>
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
          <strong className="text-primary-blue-dark">economizar seu tempo</strong> e{" "}
          <strong className="text-growth-green-dark">facilitar a navegação</strong>. Cada categoria
          agrupa ferramentas relacionadas para uma experiência mais intuitiva.
        </p>
      </section>
    </div>
  );
}
