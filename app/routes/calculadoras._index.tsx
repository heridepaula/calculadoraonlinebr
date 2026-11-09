import type { MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";
import { FAQ } from "~/components";
import { CategoryCard } from "~/components/CategoryCard";
import { ALL_CALCULATORS_GUIDE } from "~/data/category-guides";
import { APP_URL, CALCULATORS, CATEGORIES } from "~/lib/constants";
import { generateFAQStructuredData } from "~/lib/structured-data";
import type { Category } from "~/types";
import { buildPageMeta } from "~/lib/page-meta";

const PAGE_URL = `${APP_URL}/calculadoras`;

export const meta: MetaFunction = () => [
  ...buildPageMeta({
    title: "Calculadoras Online por Categoria",
    description:
      "Todas as calculadoras online grátis por categoria: saúde, finanças, matemática, trabalhista, datas, ferramentas, astrologia, loterias e apostas.",
    path: "/calculadoras",
  }),
  {
    "script:ld+json": {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      "@id": `${PAGE_URL}#webpage`,
      url: PAGE_URL,
      name: "Calculadoras Online por Categoria",
      inLanguage: "pt-BR",
      isPartOf: { "@id": `${APP_URL}/#website` },
      hasPart: CATEGORIES.map((category) => ({
        "@type": "CollectionPage",
        name: category.name,
        url: `${APP_URL}${category.path}`,
      })),
    },
  },
  {
    "script:ld+json": {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Início", item: `${APP_URL}/` },
        { "@type": "ListItem", position: 2, name: "Calculadoras", item: PAGE_URL },
      ],
    },
  },
  { "script:ld+json": generateFAQStructuredData([...ALL_CALCULATORS_GUIDE.faq]) },
];

const FAQ_COLORS = [
  "primary-blue",
  "growth-green",
  "system-info",
  "system-warning",
  "system-success",
] as const;

export default function CalculadoraIndex() {
  return (
    <div className="space-y-10">
      <header className="space-y-4 text-center">
        <h1 className="mb-4 text-3xl font-bold text-text-primary md:text-4xl">
          Calculadoras por Categoria
        </h1>
        <p className="mx-auto max-w-3xl text-lg text-text-secondary-dark">
          Encontre rapidamente a calculadora de que você precisa. São {CALCULATORS.length}{" "}
          ferramentas gratuitas, organizadas em {CATEGORIES.length} categorias.
        </p>
      </header>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {CATEGORIES.map((category: Category) => (
          <CategoryCard key={category.id} category={category} />
        ))}
      </div>

      <section className="mx-auto max-w-4xl">
        <h2 className="text-2xl font-bold text-text-primary">{ALL_CALCULATORS_GUIDE.introTitle}</h2>
        <div className="mt-4 space-y-4 text-base leading-relaxed text-text-secondary-dark">
          {ALL_CALCULATORS_GUIDE.intro.map((paragraph) => (
            <p key={paragraph.slice(0, 40)}>{paragraph}</p>
          ))}
        </div>
      </section>

      <section aria-labelledby="todas-as-calculadoras">
        <h2 id="todas-as-calculadoras" className="text-2xl font-bold text-text-primary">
          Lista de Todas as Calculadoras
        </h2>
        <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {CATEGORIES.map((category) => (
            <div
              key={category.id}
              className="rounded-xl border border-neutral-surface-variant bg-background-dark-secondary p-5"
            >
              <h3 className="text-lg font-semibold text-text-primary">
                <Link to={category.path} className="hover:text-primary-blue">
                  <span aria-hidden="true">{category.icon}</span> {category.name}
                </Link>
              </h3>
              <ul className="mt-3 space-y-1 text-sm">
                {CALCULATORS.filter((c) => c.category === category.id).map((calculator) => (
                  <li key={calculator.id}>
                    <Link
                      to={calculator.path}
                      className="inline-flex min-h-[32px] items-center p-0 text-text-secondary-dark hover:text-primary-blue hover:underline"
                    >
                      {calculator.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

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
              Preencha os campos e clique em Calcular para ver o resultado
            </p>
          </div>
        </div>
      </section>

      <FAQ
        title={ALL_CALCULATORS_GUIDE.faqTitle}
        items={ALL_CALCULATORS_GUIDE.faq.map((item, index) => ({
          ...item,
          borderColor: FAQ_COLORS[index % FAQ_COLORS.length],
        }))}
      />
    </div>
  );
}
