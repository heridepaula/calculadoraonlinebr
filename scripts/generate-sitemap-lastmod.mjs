// Gera app/data/sitemap-lastmod.json: a data (AAAA-MM-DD) da última alteração de cada
// URL do sitemap, a partir do git log do arquivo de rota correspondente.
// Arquivo com alteração ainda não commitada recebe a data de hoje.
//
// Rodar localmente depois de alterar o conteúdo de uma página e commitar o JSON junto:
//   npm run sitemap:lastmod
// Não roda no build: a Vercel clona o repositório raso e o git log não seria confiável.
// Requer Node >= 22.18 (importa o .ts direto, com type stripping nativo).
import { execFileSync } from "node:child_process";
import process from "node:process";
import { existsSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { CALCULATORS, CATEGORIES } from "../app/lib/constants.ts";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const outFile = resolve(root, "app/data/sitemap-lastmod.json");
// Data local (o toISOString usaria UTC e já viraria o dia à noite no Brasil)
const today = new Date().toLocaleDateString("sv-SE");

const git = (...args) => execFileSync("git", args, { cwd: root, encoding: "utf8" }).trim();

if (git("rev-parse", "--is-shallow-repository") === "true") {
  console.error("Repositório raso: o git log não tem o histórico completo. Nada foi alterado.");
  process.exit(1);
}

const dirty = new Set(
  git("status", "--porcelain")
    .split("\n")
    .filter(Boolean)
    .map((line) => line.slice(3).replace(/^"|"$/g, "").replace(/\\/g, "/")),
);

/** Data da última alteração de um arquivo (hoje, se houver mudança não commitada). */
function fileDate(relPath) {
  if (!existsSync(resolve(root, relPath))) return null;
  if (dirty.has(relPath)) return today;
  const iso = git("log", "-1", "--format=%cs", "--", relPath);
  return iso || null;
}

const latest = (...dates) => dates.filter(Boolean).sort().at(-1) ?? null;

/** "/calculadoras/saude/imc" -> "app/routes/calculadoras.saude.imc.tsx" */
const routeFile = (path, index = false) =>
  `app/routes/${path.replace(/^\//, "").split("/").join(".")}${index ? "._index" : ""}.tsx`;

const constantsDate = fileDate("app/lib/constants.ts");
const lastmod = {};

for (const calc of CALCULATORS) {
  lastmod[calc.path] = fileDate(routeFile(calc.path));
}

for (const cat of CATEGORIES) {
  const children = CALCULATORS.filter((c) => c.category === cat.id).map((c) => lastmod[c.path]);
  lastmod[cat.path] = latest(fileDate(routeFile(cat.path, true)), ...children);
}

// Home e /calculadoras listam calculadoras a partir de constants.ts
lastmod["/"] = latest(fileDate("app/routes/_index.tsx"), constantsDate);
lastmod["/calculadoras"] = latest(fileDate("app/routes/calculadoras._index.tsx"), constantsDate);

for (const page of ["sobre", "privacidade", "termos-de-uso"]) {
  lastmod[`/${page}`] = fileDate(`app/routes/${page}.tsx`);
}

const missing = Object.entries(lastmod).filter(([, d]) => !d).map(([p]) => p);
const sorted = Object.fromEntries(
  Object.entries(lastmod)
    .filter(([, d]) => d)
    .sort(([a], [b]) => a.localeCompare(b)),
);

writeFileSync(outFile, `${JSON.stringify(sorted, null, 2)}\n`);
console.log(`${Object.keys(sorted).length} datas gravadas em app/data/sitemap-lastmod.json`);
if (missing.length) console.warn(`Sem arquivo de rota (sem lastmod): ${missing.join(", ")}`);
