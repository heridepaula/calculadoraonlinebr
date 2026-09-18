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
```

There is no test suite. Validate with `npm run typecheck && npm run lint` before committing. Both currently report many pre-existing errors in older files (≈270 tsc, ≈650 eslint), so check only the files you touched, e.g. `npx eslint <files>` and `npx tsc --noEmit | grep <file>`.

## Architecture

### Routes (`app/routes/`, Remix flat-file convention)

- `calculadoras.<category>._index.tsx` — category landing page
- `calculadoras.<category>.<calculator>.tsx` — one self-contained file per calculator (meta, JSON-LD, form, calculation logic, results, FAQ, educational content). Calculation logic usually lives inside the route file, not in `app/utils/calculations.ts`.
- Categories: `saude`, `financas`, `matematica`, `trabalhista`, `ferramentas`, `astrologia`, `datas`, `loterias`, `apostas`
- `sitemap[.]xml.tsx` — **dynamic** sitemap, generated from `CATEGORIES` + `CALCULATORS` in `constants.ts`, with priority/changefreq from `CALCULATOR_SEO_DATA`. There is no static sitemap file.
- `public/robots.txt` — static; references the sitemap URL.
- `calculadoras.$slug.tsx` — 301 redirects from legacy slugs (e.g. `calculadora-imc`) via its own `ROUTE_REDIRECTS` map. `app/utils/redirects.ts` (`LEGACY_REDIRECTS`) is a separate map, only consumed by `admin.redirects.tsx`.
- `api.*` — resource routes (astrology data, cities, IndexNow, healthz). `$.tsx` is the 404 page.

### Central registries — a new calculator must be wired into these

1. `app/lib/constants.ts` → `CALCULATORS` array (`id`, `name`, `description`, `category`, `path`). Category landing pages render their cards by filtering `CALCULATORS` by category, and the sitemap is built from it — so this entry is what makes the calculator appear in category cards and `sitemap.xml`.
2. `app/lib/calculator-seo.ts` → `CALCULATOR_SEO_DATA[id]` (title, description, keywords, canonical, sitemap priority/changeFreq).
3. `app/lib/structured-data.ts` → JSON-LD generators (`generateCalculatorStructuredData`, `generateCategoryPageGraph`, `generateBreadcrumbStructuredData`, `generateFAQStructuredData`). Category pages use `generateCategoryPageGraph(CategoryPageId)`; add to the `CategoryPageId` union when adding a category.

Canonical links in `meta` must include `tagName: "link"` (`{ tagName: "link", rel: "canonical", href }`); without it Remix renders an invalid `<meta rel="canonical">` that search engines ignore. Do not add a JSON-LD `SearchAction`: the site has no search page.

Adding a category also requires adding its id to the category union types duplicated in `CalculatorCard`, `CategoryHero`, `CategoryStats`, `QuickAccessCard`, `RelatedCalculators` (plus its style maps and `DEFAULT_CALCULATORS` entry) and to `categoryMap` in `ResponsiveBreadcrumb`.

Note: route `meta` functions typically hardcode their title/description/canonical inline rather than calling `generateCalculatorMeta`, so SEO text can diverge between the route and `CALCULATOR_SEO_DATA` — update both.

### Shared building blocks

- `app/components/ui/` — base components exported from `index.ts` (Card, Button, Input, `MoneyInput`, `RateInput`, `SmartInput`, Select, Checkbox, Tabs, Breadcrumb, Chart). Prefer these over native inputs/checkboxes. Money fields use `MoneyInput` and percentage fields use `RateInput` (both emit pt-BR strings like `"1.234,56"`, and show `"0,00"` after being cleared). The shared `Input` generates a random id unless you pass `id` (use `useId()` to avoid SSR hydration mismatches).
- `app/components/` — `FAQ`, `RelatedCalculators`, `ResponsiveBreadcrumb`, `CalculatorCard`, `CategoryHero`, `AdSense`, etc.
- `app/components/calculators/` — only a few shared visualizations (geometry/volume/Pythagoras).
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
