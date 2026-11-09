import { Link } from "@remix-run/react";
import { FAQ } from "~/components/FAQ";
import { CALCULATORS } from "~/lib/constants";
import { CATEGORY_GUIDES, type CategoryGuide as Guide } from "~/data/category-guides";
import { generateFAQStructuredData } from "~/lib/structured-data";

const FAQ_COLORS = [
  "primary-blue",
  "growth-green",
  "system-info",
  "system-warning",
  "system-success",
] as const;

/** JSON-LD FAQPage do guia da categoria, para usar no `meta` da rota. */
export function categoryFaqStructuredData(categoryId: string) {
  const guide = CATEGORY_GUIDES[categoryId];
  return guide ? generateFAQStructuredData(guide.faq) : null;
}

/**
 * Conteúdo educativo de uma página de categoria: introdução, guia "qual calculadora usar"
 * (com link para cada calculadora) e FAQ. O texto fica em app/data/category-guides.ts.
 */
export function CategoryGuide({ categoryId }: { categoryId: string }) {
  const guide: Guide | undefined = CATEGORY_GUIDES[categoryId];
  if (!guide) return null;

  const chooser = guide.chooser.flatMap((item) => {
    const calculator = CALCULATORS.find((c) => c.id === item.calculatorId);
    return calculator ? [{ ...item, calculator }] : [];
  });

  return (
    <>
      <section className="py-8 sm:py-12">
        <div className="mx-auto max-w-4xl space-y-10 px-3 sm:px-6 lg:px-8">
          <div>
            <h2 className="text-xl font-bold text-text-primary sm:text-2xl lg:text-3xl">
              {guide.introTitle}
            </h2>
            <div className="mt-4 space-y-4 text-base leading-relaxed text-text-secondary-dark">
              {guide.intro.map((paragraph) => (
                <p key={paragraph.slice(0, 40)}>{paragraph}</p>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-xl font-bold text-text-primary sm:text-2xl">
              {guide.chooserTitle}
            </h2>
            <ul className="mt-4 divide-y divide-neutral-surface-variant overflow-hidden rounded-xl border border-neutral-surface-variant bg-background-dark-secondary">
              {chooser.map(({ calculator, when }) => (
                <li key={calculator.id} className="p-4 sm:px-5">
                  <Link
                    to={calculator.path}
                    className="font-semibold text-primary-blue-dark underline underline-offset-4 hover:text-primary-blue"
                  >
                    {calculator.name}
                  </Link>
                  <span className="text-text-secondary">: {when}.</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="py-8 sm:py-12">
        <div className="mx-auto max-w-5xl px-3 sm:px-6 lg:px-8">
          <FAQ
            title={guide.faqTitle}
            items={guide.faq.map((item, index) => ({
              ...item,
              borderColor: FAQ_COLORS[index % FAQ_COLORS.length],
            }))}
          />
        </div>
      </section>
    </>
  );
}

export default CategoryGuide;
