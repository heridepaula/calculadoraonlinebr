// Verificação de regressão de SEO: lê o sitemap e confere cada página.
//
// Uso: npm run seo:check                         (produção)
//      npm run seo:check -- http://localhost:3000 (build local: npm run build && npm start)
//
// Em cada URL do sitemap confere: status 200, título <= 60 e descrição <= 160 caracteres,
// canonical apontando para a própria página, og:image respondendo 200, JSON-LD como objeto
// (string = dupla codificação), um único <h1>, links internos sem 404 e HTML sem bytes nulos.
// URLs absolutas do site (canonical, og:image, sitemap) são buscadas no servidor informado.
// Sai com código 1 quando encontra erro, para rodar em CI ou depois do deploy.
import process from "node:process";

const SITE = "https://www.calculadoraonlinebr.com.br";
const base = (process.argv[2] ?? SITE).replace(/\/$/, "");
const CONCURRENCY = 6;
const MAX_TITLE = 60;
const MAX_DESCRIPTION = 160;

/** Troca a origem de produção pela do servidor testado. */
const local = (url) => (url.startsWith(SITE) ? base + url.slice(SITE.length) : url);
const pathOf = (url) => new URL(url, SITE).pathname;

const decode = (s) =>
  s
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#x27;|&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(Number(n)));

const attr = (tag, name) => {
  const m = tag.match(new RegExp(`\\s${name}\\s*=\\s*("([^"]*)"|'([^']*)')`, "i"));
  return m ? decode(m[2] ?? m[3]) : undefined;
};

const tags = (html, name) => html.match(new RegExp(`<${name}\\b[^>]*>`, "gi")) ?? [];

async function pool(items, worker) {
  const results = new Array(items.length);
  let next = 0;
  await Promise.all(
    Array.from({ length: Math.min(CONCURRENCY, items.length) }, async () => {
      while (next < items.length) {
        const i = next++;
        results[i] = await worker(items[i]);
      }
    })
  );
  return results;
}

const statusCache = new Map();
/** Status final de uma URL (segue redirects); GET porque alguns servidores não aceitam HEAD. */
function statusOf(url) {
  if (!statusCache.has(url)) {
    statusCache.set(
      url,
      fetch(url, { redirect: "follow" })
        .then(async (res) => {
          await res.arrayBuffer();
          return res.status;
        })
        .catch(() => 0)
    );
  }
  return statusCache.get(url);
}

function checkPage(url, html) {
  const errors = [];
  const warnings = [];
  const internalLinks = new Set();

  // Bytes 0x00 no HTML (bug do streaming do React 18, ver entry.server.tsx)
  const nullBytes = html.split("\u0000").length - 1;
  if (nullBytes > 0) errors.push(`${nullBytes} bytes nulos (0x00) no HTML`);

  const title = decode(html.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1]?.trim() ?? "");
  if (!title) errors.push("sem <title>");
  else if (title.length > MAX_TITLE)
    errors.push(`título com ${title.length} caracteres: "${title}"`);

  const metas = tags(html, "meta");
  const metaContent = (key, value) =>
    metas.map((t) => (attr(t, key) === value ? attr(t, "content") : undefined)).find(Boolean);

  const description = metaContent("name", "description");
  if (!description) errors.push("sem meta description");
  else if (description.length > MAX_DESCRIPTION) {
    errors.push(`descrição com ${description.length} caracteres`);
  }

  const canonicals = tags(html, "link").filter((t) => attr(t, "rel") === "canonical");
  if (canonicals.length !== 1) errors.push(`${canonicals.length} links canonical`);
  else if (pathOf(attr(canonicals[0], "href")) !== pathOf(url)) {
    errors.push(`canonical aponta para ${attr(canonicals[0], "href")}`);
  }
  if (metas.some((t) => attr(t, "rel") === "canonical")) {
    errors.push('canonical em <meta> (falta tagName: "link")');
  }

  const ogImage = metaContent("property", "og:image");
  if (!ogImage) errors.push("sem og:image");

  const h1Count = (html.match(/<h1\b/gi) ?? []).length;
  if (h1Count !== 1) errors.push(`${h1Count} elementos <h1>`);

  const jsonLd = [
    ...html.matchAll(/<script[^>]*application\/ld\+json[^>]*>([\s\S]*?)<\/script>/gi),
  ];
  if (jsonLd.length === 0) warnings.push("sem JSON-LD");
  jsonLd.forEach(([, body], i) => {
    try {
      const data = JSON.parse(body);
      if (typeof data !== "object" || data === null) {
        errors.push(`JSON-LD #${i + 1} é ${typeof data} (dupla codificação)`);
      }
    } catch {
      errors.push(`JSON-LD #${i + 1} inválido`);
    }
  });

  for (const a of tags(html, "a")) {
    const href = attr(a, "href");
    if (!href || href.startsWith("#") || /^(mailto|tel|javascript):/i.test(href)) continue;
    const absolute = new URL(href, SITE);
    if (absolute.origin !== SITE) continue;
    if (
      /[A-Z]/.test(absolute.pathname) ||
      (absolute.pathname.length > 1 && absolute.pathname.endsWith("/"))
    ) {
      warnings.push(`link interno fora do padrão (gera 301): ${absolute.pathname}`);
    }
    internalLinks.add(absolute.origin + absolute.pathname);
  }

  return { errors, warnings, ogImage, internalLinks };
}

async function main() {
  const sitemapRes = await fetch(`${base}/sitemap.xml`);
  if (!sitemapRes.ok) throw new Error(`sitemap.xml respondeu ${sitemapRes.status}`);
  const urls = [...(await sitemapRes.text()).matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) =>
    m[1].trim()
  );
  console.log(`Verificando ${urls.length} páginas em ${base}...\n`);

  const pages = await pool(urls, async (url) => {
    try {
      const res = await fetch(local(url), { redirect: "manual" });
      if (res.status !== 200) {
        return { url, errors: [`status ${res.status}`], warnings: [], internalLinks: new Set() };
      }
      return { url, ...checkPage(url, await res.text()) };
    } catch (error) {
      return {
        url,
        errors: [`falha ao buscar: ${error.message}`],
        warnings: [],
        internalLinks: new Set(),
      };
    }
  });

  // og:image e links internos: cada URL é buscada uma vez só
  await pool(
    pages.filter((p) => p.ogImage),
    async (page) => {
      const status = await statusOf(local(page.ogImage));
      if (status !== 200) page.errors.push(`og:image ${page.ogImage} respondeu ${status}`);
    }
  );
  const known = new Set(urls.map(pathOf));
  await pool(pages, async (page) => {
    for (const link of page.internalLinks) {
      if (known.has(pathOf(link))) continue;
      const status = await statusOf(local(link));
      if (status >= 400 || status === 0)
        page.errors.push(`link quebrado (${status}): ${pathOf(link)}`);
    }
  });

  let errorCount = 0;
  let warningCount = 0;
  for (const page of pages) {
    const warnings = [...new Set(page.warnings)];
    if (page.errors.length === 0 && warnings.length === 0) continue;
    console.log(pathOf(page.url));
    page.errors.forEach((e) => console.log(`  ✖ ${e}`));
    warnings.forEach((w) => console.log(`  ⚠ ${w}`));
    errorCount += page.errors.length;
    warningCount += warnings.length;
  }

  console.log(`\n${pages.length} páginas, ${errorCount} erros, ${warningCount} avisos.`);
  process.exitCode = errorCount > 0 ? 1 : 0;
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
