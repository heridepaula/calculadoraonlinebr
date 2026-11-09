import type { MetaDescriptor } from "@remix-run/node";
import { APP_NAME, APP_URL, CALCULATORS } from "~/lib/constants";
import { CALCULATOR_SEO_DATA, CATEGORY_SEO_DATA } from "~/lib/calculator-seo";

/** Sufixo de marca anexado ao título quando ainda cabe no limite exibido pelo Google. */
const BRAND_SUFFIX = ` | ${APP_NAME}`;
const MAX_TITLE_LENGTH = 60;

/**
 * Título final: o núcleo com " | CalculadoraOnlineBR" quando o total cabe em 60
 * caracteres; senão só o núcleo (o Google já mostra o nome do site à parte).
 */
export function withBrand(coreTitle: string): string {
  return coreTitle.length + BRAND_SUFFIX.length <= MAX_TITLE_LENGTH
    ? `${coreTitle}${BRAND_SUFFIX}`
    : coreTitle;
}

export interface PageMetaInput {
  /** Título sem a marca; ela é anexada por `withBrand` quando cabe. */
  title: string;
  description: string;
  /** Caminho canônico, ex.: "/calculadoras/saude/imc" */
  path: string;
  /** URL absoluta da imagem Open Graph (1200x630). */
  image?: string;
  imageAlt?: string;
  ogTitle?: string;
  ogDescription?: string;
  twitterTitle?: string;
}

/**
 * Tags de <head> de uma página: title, description, robots, canonical, Open Graph e
 * Twitter. O JSON-LD fica a cargo de cada rota (como objeto em "script:ld+json").
 */
export function buildPageMeta({
  title,
  description,
  path,
  image = `${APP_URL}/og/default.jpg`,
  imageAlt,
  ogTitle,
  ogDescription,
  twitterTitle,
}: PageMetaInput): MetaDescriptor[] {
  const url = path === "/" ? APP_URL : `${APP_URL}${path}`;
  const socialTitle = ogTitle ?? title;
  const socialDescription = ogDescription ?? description;

  return [
    { title: withBrand(title) },
    { name: "description", content: description },
    {
      name: "robots",
      content: "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1",
    },
    { tagName: "link", rel: "canonical", href: url },
    { property: "og:type", content: "website" },
    { property: "og:url", content: url },
    { property: "og:title", content: socialTitle },
    { property: "og:description", content: socialDescription },
    { property: "og:image", content: image },
    { property: "og:image:width", content: "1200" },
    { property: "og:image:height", content: "630" },
    { property: "og:image:alt", content: imageAlt ?? socialTitle },
    { property: "og:site_name", content: APP_NAME },
    { property: "og:locale", content: "pt_BR" },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: twitterTitle ?? socialTitle },
    { name: "twitter:description", content: socialDescription },
    { name: "twitter:image", content: image },
    { name: "twitter:image:alt", content: imageAlt ?? socialTitle },
  ];
}

type MetaOverrides = Pick<PageMetaInput, "ogTitle" | "twitterTitle" | "imageAlt">;

/** Meta de uma calculadora a partir de CALCULATOR_SEO_DATA e CALCULATORS. */
export function buildCalculatorMeta(id: string, overrides: MetaOverrides = {}): MetaDescriptor[] {
  const seo = CALCULATOR_SEO_DATA[id];
  const calculator = CALCULATORS.find((c) => c.id === id);
  if (!seo || !calculator) {
    throw new Error(`buildCalculatorMeta: calculadora "${id}" sem entrada em CALCULATORS/CALCULATOR_SEO_DATA`);
  }

  return buildPageMeta({
    title: seo.title,
    description: seo.description,
    path: calculator.path,
    image: seo.ogImage ?? `${APP_URL}/og/${id}.jpg`,
    imageAlt: calculator.name,
    ogTitle: seo.ogTitle,
    ogDescription: seo.ogDescription,
    ...overrides,
  });
}

/** Meta de uma página de categoria a partir de CATEGORY_SEO_DATA. */
export function buildCategoryMeta(categoryId: string): MetaDescriptor[] {
  const seo = CATEGORY_SEO_DATA[categoryId];
  if (!seo) throw new Error(`buildCategoryMeta: categoria "${categoryId}" sem entrada em CATEGORY_SEO_DATA`);

  return buildPageMeta({
    title: seo.title,
    description: seo.description,
    path: `/calculadoras/${categoryId}`,
    image: `${APP_URL}/og/categoria-${categoryId}.jpg`,
  });
}
