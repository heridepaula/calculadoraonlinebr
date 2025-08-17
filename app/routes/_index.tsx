import type { MetaFunction } from "@remix-run/node";
import { CategoryCard } from "~/components/CategoryCard";
import { APP_NAME, CATEGORIES } from "~/lib/constants";
import type { Category } from "~/types";

export const meta: MetaFunction = () => {
  return [
    { title: `Calculadora Online Gratuita - IMC, Juros, Porcentagem | ${APP_NAME}` },
    {
      name: "description",
      content:
        "🧮 Calculadora online gratuita para IMC, juros compostos, porcentagem e mais. Interface moderna, resultados precisos e sem cadastro. Use agora!",
    },
    {
      name: "keywords",
      content:
        "calculadora online, calculadora gratis, IMC calculadora, juros compostos, porcentagem, calculadora financeira, calculadora saude, matematica",
    },
    { name: "author", content: "Calculadora Online BR" },
    { property: "og:title", content: `Calculadora Online Gratuita - ${APP_NAME}` },
    {
      property: "og:description",
      content:
        "Calculadoras online gratuitas para IMC, juros, porcentagem e muito mais. Interface moderna e resultados precisos.",
    },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary" },
    { name: "twitter:title", content: `Calculadora Online Gratuita - ${APP_NAME}` },
    {
      name: "twitter:description",
      content:
        "Calculadoras gratuitas para IMC, juros compostos, porcentagem e mais. Use sem cadastro!",
    },
  ];
};

export default function Index() {
  return (
    <div className="space-y-8">
      <header className="space-y-4 text-center">
        <h1 className="mb-4 text-3xl font-bold text-text-primary md:text-4xl">
          Calculadoras Online Gratuitas
        </h1>
        <p className="mx-auto max-w-3xl text-lg text-text-secondary-dark">
          <strong>Calculadora IMC, Juros Compostos, Porcentagem</strong> e muito mais. Interface
          moderna, resultados precisos e sem cadastro.
        </p>
      </header>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {CATEGORIES.map((category: Category) => (
          <CategoryCard key={category.id} category={category} />
        ))}
      </div>

      <section className="text-center">
        <p className="text-sm text-text-secondary-dark">
          ✅ <strong>Gratuito e sem cadastro</strong> • ⚡ <strong>Resultados instantâneos</strong>{" "}
          • 📱 <strong>Funciona no celular</strong>
        </p>
      </section>
    </div>
  );
}
