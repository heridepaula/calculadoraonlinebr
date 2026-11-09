# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Free online calculators for Brazilian users (Portuguese content, Brazilian legislation: INSS, IRRF, CLT, etc.), built with **Remix v2.16.7 on Vite** (not React Router v7, despite what README says) and TypeScript strict mode. Deployed to Vercel (`@vercel/remix` preset, `server.js` handler). Production URL: `https://www.calculadoraonlinebr.com.br` (`APP_URL` in `app/lib/constants.ts`).

## Commands

```bash
npm run dev              # Dev server (do NOT run after implementing — see rules below)
npm run build            # Production build (terser, console.log stripped, manual chunks)
npm run build:analyze    # Build with bundle analysis
npm start                # Serve ./build/server/index.js
npm run typecheck        # tsc
npm run lint             # eslint (respects .gitignore)
npm run format           # prettier --write (with prettier-plugin-tailwindcss)
npm run og:generate      # Regenerate OG image (scripts/generate-og-image.mjs)
npm run indexnow:submit  # Submit URLs to IndexNow (see docs/INDEXNOW.md)
npm run og:pages         # Generate per-page OG images public/og/<id>.jpg from CALCULATORS/CATEGORIES (args: ids)
npm run sitemap:lastmod  # Rewrite app/data/sitemap-lastmod.json from git history; commit it with content changes
npm run seo:check        # Crawl sitemap: title/description length, canonical, og:image 200, JSON-LD object, one h1, broken internal links (arg: base URL, default production)
```

There is no test suite. Validate with `npm run typecheck && npm run lint` before committing. Both currently report many pre-existing errors in older files (≈270 tsc, ≈650 eslint), so check only the files you touched, e.g. `npx eslint <files>` and `npx tsc --noEmit | grep <file>`.

## Architecture

### Routes (`app/routes/`, Remix flat-file convention)

- `calculadoras.<category>._index.tsx` — category landing page
- `calculadoras.<category>.<calculator>.tsx` — one self-contained file per calculator (meta, JSON-LD, form, calculation logic, results, FAQ, educational content). Calculation logic usually lives inside the route file, not in `app/utils/calculations.ts`.
- Categories: `saude`, `financas`, `matematica`, `trabalhista`, `ferramentas`, `astrologia`, `datas`, `loterias`, `apostas`
- `sitemap[.]xml.tsx` — **dynamic** sitemap, generated from `CATEGORIES` + `CALCULATORS` in `constants.ts`, with priority/changefreq from `CALCULATOR_SEO_DATA` and `lastmod` from `app/data/sitemap-lastmod.json` (run `npm run sitemap:lastmod` after changing a page's content; never use `new Date()`). There is no static sitemap file.
- `public/robots.txt` — static; references the sitemap URL.
- `calculadoras.$slug.tsx` — 301 redirects from legacy slugs (e.g. `calculadora-imc`) via its own `ROUTE_REDIRECTS` map. `app/utils/redirects.ts` (`LEGACY_REDIRECTS`) is a separate map, only consumed by `admin.redirects.tsx`.
- `api.*` — resource routes (astrology data, cities, IndexNow, healthz). `$.tsx` is the 404 page.

### Central registries — a new calculator must be wired into these

1. `app/lib/constants.ts` → `CALCULATORS` array (`id`, `name`, `description`, `category`, `path`). Category landing pages render their cards by filtering `CALCULATORS` by category, and the sitemap is built from it — so this entry is what makes the calculator appear in category cards and `sitemap.xml`.
2. `app/lib/calculator-seo.ts` → `CALCULATOR_SEO_DATA[id]` (title, description, keywords, canonical, sitemap priority/changeFreq). This is the **single source** of the page's title and description: `title` is the core without the brand (≤ 60 chars; ` | CalculadoraOnlineBR` is appended only when it still fits), `description` ≤ 160 chars, and a year goes in as `${SEO_YEAR}` (`constants.ts`, bumped each January together with the yearly tables). Category pages use `CATEGORY_SEO_DATA[id]`.
3. `app/lib/structured-data.ts` → JSON-LD generators (`generateCalculatorStructuredData`, `generateCategoryPageGraph`, `generateBreadcrumbStructuredData`, `generateFAQStructuredData`). Category pages use `generateCategoryPageGraph(CategoryPageId)`; add to the `CategoryPageId` union when adding a category.

Route `meta` = head tags from `app/lib/page-meta.ts` plus the route's own JSON-LD: `[...buildCalculatorMeta("<id>"), { "script:ld+json": {...} }]` (categories: `buildCategoryMeta`, other pages: `buildPageMeta({ title, description, path })`, betting pages: `buildBettingPageMeta`). The helpers emit title, description, robots, canonical, Open Graph and Twitter; don't add `viewport`, `keywords`, `googlebot` or other head tags by hand (`viewport` is in `root.tsx`).

Canonical links in `meta` must include `tagName: "link"` (`{ tagName: "link", rel: "canonical", href }`); without it Remix renders an invalid `<meta rel="canonical">` that search engines ignore. Do not add a JSON-LD `SearchAction`: the site has no search page.

JSON-LD in `meta`: pass an **object** to `"script:ld+json"`, never `JSON.stringify(...)`. Remix stringifies it itself, so a string gets double-encoded and Google ignores it (this broke 54 pages until Nov 2026). Use only real schema.org types and never invent `aggregateRating`.

`og:image` / `twitter:image`: `${APP_URL}/og/<calculator-id>.jpg` (category pages: `/og/categoria-<id>.jpg`, other pages: `/og/default.jpg`), 1200×630 JPG. For a new calculator, run `npm run og:pages -- <id>` after adding it to `CALCULATORS`. Never point to a file that is not in `public/`.

The root `loader` 301-redirects uppercase and trailing-slash paths to the lowercase path without the slash, so internal links must use that form.

Adding a category also requires adding its id to the category union types duplicated in `CalculatorCard`, `CategoryHero`, `CategoryStats`, `QuickAccessCard`, `RelatedCalculators` (plus `CATEGORY_STYLES`, `CATEGORY_TITLES` and `CATEGORY_TIPS`), to `categoryMap` in `ResponsiveBreadcrumb`, and an entry in `CATEGORY_SEO_DATA`. The header menu and footer (`components/layout/Header.tsx`, `Footer.tsx`) list `CATEGORIES` automatically.

`RelatedCalculators` picks its links from `CALCULATORS` (the next calculators of the same category, wrapping around, plus `CROSS_LINKS`) and detects the current page by URL, so a new calculator gets related links without editing the component.

HTML is cached on the Vercel CDN for 1 h (`headers` in `root.tsx`, `s-maxage=3600, stale-while-revalidate`); a route with more volatile data exports its own `headers` (lotteries: 5 min).

### Indicadores de mercado (SELIC, CDI, IPCA, INPC, TR, poupança, Tesouro Direto)

- Nunca fixe taxas de mercado nas rotas. Cada calculadora de finanças tem `loader` que devolve `indicators` (via `marketIndicatorsLoader` em `services/market/loader.server.ts`, ou `getMarketIndicators`/`getTreasuryBonds` de `services/market/marketData.server.ts`) e usa `useLoaderData`.
- Coleta: `/api/cron/indicadores`, chamado uma vez por dia pelo cron-job.org (os crons da Vercel foram removidos do `vercel.json` no commit `12f18c8`), protegido por `CRON_SECRET`. Fontes: API SGS do Banco Central (séries em `lib/market/indicators.ts` → `SGS_SERIES`) e CSV do Tesouro Transparente (`lib/market/treasury.ts`, atalho por `last_modified`/ETag, arquivo inválido é recusado inteiro).
- Mongo: `market_indicators`, `treasury_bonds` (janela de 365 dias), `treasury_sync`. Primeira carga ou teste manual: `npm run sync:market`.
- Leitura: cache de 1 h por instância; sem banco, cai em `FALLBACK_INDICATORS` com `stale: true`. O endpoint JSON antigo do tesourodireto.com.br responde 410: não volte a usá-lo.
- Nova série: acrescente em `IndicatorId`, `SGS_SERIES`, `RATE_BOUNDS`, `STALE_AFTER_DAYS` e `FALLBACK_INDICATORS`.

### Tabelas trabalhistas (INSS, IRRF, salário mínimo)

- `app/lib/labor/tax-tables.ts` é a fonte única de salário mínimo, INSS, IRRF (com a redução da Lei 15.270/2025), seguro-desemprego e salário-família (`calculateInss`, `calculateIrrf`, `unemploymentInstallment`, `LABOR_TAX_SOURCES`). Todas as calculadoras trabalhistas leem dele, inclusive `utils/calculations.ts`; nunca escreva valores dessas tabelas nas rotas, nem no texto (gere a partir das constantes).
- Em janeiro: atualize as tabelas, `MINIMUM_WAGE`, `UNEMPLOYMENT_BENEFIT`, `FAMILY_ALLOWANCE`, `LABOR_TAX_REVIEWED_AT` e `SEO_YEAR`. Os pontos e a idade progressiva da aposentadoria são calculados pelo ano.
- Regras já tratadas: INSS e IR de férias e 13º calculados separados do salário; abono pecuniário, férias indenizadas + 1/3 e aviso prévio indenizado são isentos; 2ª parcela do 13º desconta INSS/IR do 13º inteiro.
- Páginas de temas sensíveis mostram fontes e data com `SourcesAndUpdate` (`app/components`), que linka `/sobre#metodologia`.

### SSR

- `entry.server.tsx` remove bytes 0x00 do HTML: o streaming do React 18 os insere quando um caractere acentuado ou emoji cai na fronteira do buffer (12 páginas afetadas em nov/2026). `npm run seo:check` acusa se voltar.
- Não passe `onLoad` em string em `links` ou JSX: o React liga como listener na hidratação e lança o erro #231.
- Datas de `<input type="date">` ("AAAA-MM-DD") devem ser lidas como data local (`new Date(a, m - 1, d)`); `new Date("2024-03-01")` é UTC e vira o dia anterior no fuso de Brasília.

### Shared building blocks

- `app/components/ui/` — base components exported from `index.ts` (Card, Button, Input, `MoneyInput`, `RateInput`, `SmartInput`, Select, Checkbox, Tabs, Breadcrumb, Chart). Prefer these over native inputs/checkboxes. Money fields use `MoneyInput` and percentage fields use `RateInput` (both emit pt-BR strings like `"1.234,56"`, and show `"0,00"` after being cleared). The shared `Input` generates a random id unless you pass `id` (use `useId()` to avoid SSR hydration mismatches). Decimal odds use `OddsInput`; parse any of these masked values with `parseMaskedNumber` (`app/lib/utils.ts`). `FieldFeedback` renders a field's error + hint and `HelpTooltip` the "?" help button; for a label with a tooltip, omit `label` and pass `id` to the masked input.
- `app/components/` — `FAQ`, `RelatedCalculators`, `ResponsiveBreadcrumb`, `CalculatorCard`, `CategoryHero`, `AdSense`, etc.
- `app/components/calculators/` — shared geometry visualizations, plus the betting calculators (`KellyCriterionCalculator`, `ExpectedValueCalculator`, `SurebetCalculator`, `DutchingCalculator`, `MultiplaCalculator`, `GestaoBancaCalculator`, `ConversorOddsCalculator`, `HedgeCalculator`, `PoissonCalculator`), which export their pure calculation functions for the route's educational content. New betting calculators reuse `components/calculators/betting-shared.tsx` (formatters, `useCalculatorScroll`, `CalculatorActions`, `MetricBox`, `OptionCards`, `BettingDisclaimer`) and `lib/betting-page.ts` (`buildBettingPageMeta` for meta + JSON-LD, `withFaqColors`). Betting calculator pages follow `calculadoras.apostas.criterio-de-kelly.tsx`: results only after clicking Calcular (scroll to result), Limpar scrolls back to the form.
- Hooks used by calculator pages: `useAutoCalculatorTracking` / `useFormTracking` (analytics), `useIndexNow`, `useSmartValidation`.
- Analytics: GA4 + Cloudflare + Vercel Analytics, wired via `app/lib/analytics-provider.tsx` (docs in `docs/`).
- Charts: `chart.js` + `react-chartjs-2`.
- Server-side data: `app/services/*.server.ts` (Tesouro Direto bonds, scheduler), `app/lib/economic-data.ts`.

### Styling

- **Dark theme only** (`app/lib/theme.server.ts` always returns `"dark"`). Palette in `tailwind.config.ts` and `app/styles/colors.css`: primary blue `#64B5F6`, category colors (health-red, finance-gold, math-purple).
- Mobile-first breakpoints: xs 320, sm 640, md 768, lg 1024, xl 1280. Touch targets ≥ 44px, proper aria labels.
- Watch contrast: text and components on the dark background must stay easy to read (WCAG 2.1 AA). The palette colors (primary-blue, growth-green, finance-gold, etc.) are light, so text placed *on* them must be dark (`text-gray-900`), not white.
- Don't hide radio/checkbox inputs with `sr-only`: `globals.css` makes `.sr-only:focus` visible (skip-link pattern), so the native control appears when clicked. Use `absolute opacity-0` inside a `relative` label instead.
- Some source files start with a UTF-8 BOM and mojibake has been fixed before — preserve UTF-8 encoding when editing Portuguese text.

## Visual Verification

After front-end changes, verify with Playwright MCP (`mcp__playwright__browser_navigate`): screenshots at multiple viewports, input/output clarity, visual hierarchy, contrast/accessibility, button states and form validation. The design docs previously referenced at `/context/design-system-calculator.md` and `/context/calculator-style-guide.md` do not currently exist in the repo. Use `@agent-design-improvement` for new calculator interfaces, major redesigns, or accessibility audits.

## Project Rules (from the owner)

- Implementar interface interativa e educativa e mobile first.
- Adicionar conteúdo SEO otimizado e inovações para se diferenciar das calculadoras concorrentes.
- Analisar as rotas existentes para entender a implementação atual de SEO antes de criar uma nova.
- Criar conteúdo educacional detalhado (ex.: métodos de mensuração) para a calculadora.
- Adicionar meta tags de SEO abrangentes e dados estruturados (JSON-LD).
- Adicionar seções de FAQ otimizadas para SEO.
- Implementar breadcrumb para melhor estrutura de SEO.
- Adicionar links internos entre calculadoras relacionadas (`RelatedCalculators`).
- Ao criar uma calculadora, sempre adicioná-la aos cards da categoria (entrada em `CALCULATORS`) e às configurações de SEO (sitemap via `CALCULATORS`/`CALCULATOR_SEO_DATA`; verificar `public/robots.txt`).
- Cuidar do contraste dos elementos para que textos e componentes sejam fáceis de ler.
- **Não executar `npm run dev`** após a implementação.
- Sempre usar o Context7 para consultar documentação durante as implementações.
