# Melhorias de SEO — Fase 1: Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers-extended-cc:subagent-driven-development (recommended) or superpowers-extended-cc:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Spec:** [`docs/superpowers/specs/2026-05-14-melhorias-seo-fase1-design.md`](../specs/2026-05-14-melhorias-seo-fase1-design.md)

**Goal:** Corrigir 3 bugs críticos de SEO (sitemap quebrado, CALCULATOR_SEO_DATA incompleto, aggregateRating fictício) e 5 problemas médios (GA4 não inicializa em produção, og:image inadequada, tracking duplicado Vercel+GA4, mapeamento de categorias incompleto, IndexNow hardcoded).

**Architecture:** Rota Remix `/sitemap.xml` retorna XML dinâmico derivado de `CALCULATORS`/`CATEGORIES`. GA4 vira fonte única para eventos custom — Vercel Analytics fica restrito a pageviews automáticos e Speed Insights. `CALCULATOR_SEO_DATA` (mapa em `app/lib/calculator-seo.ts`) é completado para cobrir 100% das ~66 calculadoras. Schema.org perde `aggregateRating` fictício. Imagem OG 1200×630 gerada via `sharp` a partir de SVG inline.

**Tech Stack:** Remix v2.16.7, TypeScript, Vite, Tailwind, `@vercel/analytics`, `gtag.js` (GA4), `sharp` (a instalar como devDependency).

**Observação sobre testes:** o projeto NÃO tem framework de testes (jest/vitest/playwright). Verificação acontece via `npm run typecheck`, `npm run lint`, e checagem manual no browser (dev server + view-source + DevTools Console). Cada tarefa especifica os comandos exatos.

---

## File Structure

| Arquivo | Responsabilidade | Status |
|---|---|---|
| `app/routes/sitemap[.]xml.tsx` | Loader que retorna XML do sitemap | **Reescrita completa** |
| `app/lib/constants.ts` | Fonte única de `CATEGORIES` + `CALCULATORS` | Adicionar `conversor-unidades` |
| `app/lib/calculator-seo.ts` | Mapa `CALCULATOR_SEO_DATA` + `generateCalculatorMeta` + `og:image` default | Adicionar ~33 entradas + trocar default |
| `app/lib/structured-data.ts` | Geradores JSON-LD (`WebSite`, `SoftwareApplication`, etc.) | Remover `aggregateRating` |
| `app/lib/google-analytics.ts` | GA4 init, `trackEvent`, `trackPageView`, helpers de atribuição | Refatorar `isGAEnabled` para usar `window.__ENV` |
| `app/lib/analytics-provider.tsx` | Context com `trackCalculatorUsed`, `trackFeatureUsed`, etc. | Trocar canal Vercel→GA4, importar `CATEGORIES` |
| `app/lib/analytics.ts` | Helpers `trackCalculatorUsed`, `trackResultCalculated`, etc. (legacy Vercel) | Virar camada de compat (delega a GA4) |
| `app/hooks/useAnalytics.ts` | Hook React que expõe `trackCalculator`, `trackFeature`, etc. | Internamente usar GA4 |
| `app/lib/indexnow.ts` | Cliente IndexNow + `submitMainPages` hardcoded | `submitMainPages` itera `CATEGORIES` |
| `app/root.tsx` | Meta tags globais + `og:image` + injeção de `__ENV` | Injetar `__ENV`, trocar `og:image` |
| `public/og-image-1200x630.webp` | Imagem Open Graph 1200×630 | **Criar** |
| `scripts/generate-og-image.mjs` | Script Node que gera a OG image | **Criar** |
| `package.json` | Adicionar `sharp` (devDep), adicionar script `og:generate` | Modificar |

---

## Tasks

### Task 0: Reescrever sitemap.xml e completar `CALCULATORS`

**Goal:** Substituir o conteúdo errado da rota `/sitemap.xml` (atualmente HTML da Política de Privacidade) por um loader que retorna XML válido com todas as calculadoras, categorias e páginas estáticas. Adicionar `conversor-unidades` ao `CALCULATORS` (omissão atual).

**Files:**
- Modify: `app/lib/constants.ts` — adicionar entrada `conversor-unidades` ao `CALCULATORS`
- Rewrite: `app/routes/sitemap[.]xml.tsx` — substituir conteúdo completo

**Acceptance Criteria:**
- [ ] `CALCULATORS` em `constants.ts` tem entrada para `conversor-unidades` (categoria `ferramentas`, path `/calculadoras/ferramentas/conversor-unidades`).
- [ ] `app/routes/sitemap[.]xml.tsx` NÃO contém JSX da política de privacidade; exporta apenas `loader` retornando `Response` com `Content-Type: application/xml; charset=utf-8`.
- [ ] Resposta inclui 1 URL para `APP_URL` (homepage), 1 para `/calculadoras`, 8 URLs de categorias (`CATEGORIES`), uma URL por entrada de `CALCULATORS`, e 3 páginas estáticas (`/sobre`, `/privacidade`, `/termos-de-uso`).
- [ ] Para cada calculadora, `<priority>` e `<changefreq>` vêm de `CALCULATOR_SEO_DATA[id]` quando existe; senão default `0.7` e `monthly`.
- [ ] `<lastmod>` em formato `YYYY-MM-DD`.
- [ ] `Cache-Control: public, max-age=3600, s-maxage=3600` no header.

**Verify:**
1. `npm run typecheck` → 0 errors.
2. `npm run dev`, visitar `http://localhost:3000/sitemap.xml`, View Source → XML começa com `<?xml version="1.0" encoding="UTF-8"?>` e contém `<urlset xmlns="...">`.
3. Contar `<url>` no output: deve ser `2 + CATEGORIES.length + CALCULATORS.length + 3 = 2 + 8 + 65 + 3 = 78`. Comando rápido no DevTools Console na página `/sitemap.xml`: `document.body.innerText.match(/<url>/g).length` (precisa visualizar a fonte raw via curl — devtools renderiza diferente). Alternativa: `curl http://localhost:3000/sitemap.xml | grep -c "<url>"`.
4. Validar XML no [validator online](https://www.xml-sitemaps.com/validate-xml-sitemap.html) → sem erros.

**Steps:**

- [ ] **Step 1: Adicionar `conversor-unidades` em `app/lib/constants.ts`**

Localizar o fim do array `CALCULATORS` (linha ~570, antes do `];`). Adicionar antes da última entrada (`gerador-quina`) ou em qualquer posição dentro do array — agrupar por categoria é preferível. Adicionar dentro da seção `ferramentas`, após `gerador-cpf` por exemplo:

```ts
  {
    id: "conversor-unidades",
    name: "Conversor de Unidades",
    description:
      "Converta unidades de medida (comprimento, peso, volume, temperatura, área, velocidade) com precisão. Suporte a sistema métrico e imperial",
    category: "ferramentas",
    path: "/calculadoras/ferramentas/conversor-unidades",
  },
```

- [ ] **Step 2: Apagar conteúdo de `app/routes/sitemap[.]xml.tsx` e criar loader XML**

Substituir todo o arquivo por:

```tsx
import type { LoaderFunctionArgs } from "@remix-run/node";
import { APP_URL, CATEGORIES, CALCULATORS } from "~/lib/constants";
import { CALCULATOR_SEO_DATA } from "~/lib/calculator-seo";

interface SitemapURL {
  loc: string;
  lastmod: string;
  changefreq: string;
  priority: number;
}

function buildSitemapURLs(): SitemapURL[] {
  const lastmod = new Date().toISOString().split("T")[0];
  const urls: SitemapURL[] = [];

  urls.push({ loc: APP_URL, lastmod, changefreq: "weekly", priority: 1.0 });
  urls.push({ loc: `${APP_URL}/calculadoras`, lastmod, changefreq: "weekly", priority: 0.9 });

  for (const cat of CATEGORIES) {
    urls.push({
      loc: `${APP_URL}${cat.path}`,
      lastmod,
      changefreq: "weekly",
      priority: 0.9,
    });
  }

  for (const calc of CALCULATORS) {
    const seo = CALCULATOR_SEO_DATA[calc.id];
    urls.push({
      loc: `${APP_URL}${calc.path}`,
      lastmod,
      changefreq: seo?.changeFreq ?? "monthly",
      priority: seo?.priority ?? 0.7,
    });
  }

  for (const path of ["/sobre", "/privacidade", "/termos-de-uso"]) {
    urls.push({ loc: `${APP_URL}${path}`, lastmod, changefreq: "yearly", priority: 0.3 });
  }

  return urls;
}

function renderSitemapXML(urls: SitemapURL[]): string {
  const items = urls
    .map(
      (u) => `  <url>
    <loc>${u.loc}</loc>
    <lastmod>${u.lastmod}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority.toFixed(1)}</priority>
  </url>`,
    )
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${items}
</urlset>`;
}

export const loader = ({ request: _request }: LoaderFunctionArgs) => {
  const urls = buildSitemapURLs();
  const xml = renderSitemapXML(urls);

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
};
```

Importante: NÃO exportar `default` nem `meta`. O Remix usa só `loader` para rotas que retornam Response não-HTML.

- [ ] **Step 3: Validar typecheck e lint**

```bash
npm run typecheck
npm run lint
```

Ambos devem passar sem erro. Se `lint` reclamar do `_request` não usado, manter o prefixo `_` que é convenção aceita pelo ESLint config do projeto (verificar `.eslintrc` se houver dúvida).

- [ ] **Step 4: Testar manualmente**

```bash
npm run dev
```

Em outro terminal:
```bash
curl http://localhost:3000/sitemap.xml | head -20
curl -s http://localhost:3000/sitemap.xml | grep -c "<url>"
```

Esperado: header XML correto, `<urlset>`, e a contagem deve ser `78` (2 + 8 categorias + 65 calculadoras + 3 estáticas). Se a contagem for 77, falta `conversor-unidades` no Step 1.

- [ ] **Step 5: Commit**

```bash
git add app/lib/constants.ts "app/routes/sitemap[.]xml.tsx"
git commit -m "fix(seo): reescreve rota sitemap.xml para XML válido e adiciona conversor-unidades

A rota sitemap[.]xml.tsx continha por engano o HTML da página de
Política de Privacidade — o robots.txt aponta para /sitemap.xml,
então o Google recebia HTML quando solicitava o sitemap.

Loader agora deriva URLs de CALCULATORS + CATEGORIES + páginas
estáticas, com priority/changefreq de CALCULATOR_SEO_DATA quando
disponível. Também adiciona conversor-unidades ao CALCULATORS
(rota existia mas omissa do array).

Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>"
```

```json:metadata
{"files": ["app/lib/constants.ts", "app/routes/sitemap[.]xml.tsx"], "verifyCommand": "npm run typecheck && npm run lint", "acceptanceCriteria": ["conversor-unidades em CALCULATORS", "rota sitemap não tem mais HTML da privacidade", "Response com Content-Type application/xml", "78 <url> no XML", "lastmod em YYYY-MM-DD", "Cache-Control max-age=3600"]}
```

---

### Task 1: Completar `CALCULATOR_SEO_DATA` — astrologia (4 calculadoras)

**Goal:** Adicionar entradas SEO em `CALCULATOR_SEO_DATA` para todas as 4 calculadoras de astrologia. Sem isso, essas páginas caem no meta genérico do `root.tsx`.

**Files:**
- Modify: `app/lib/calculator-seo.ts` — adicionar 4 entradas no objeto `CALCULATOR_SEO_DATA`

**Acceptance Criteria:**
- [ ] `CALCULATOR_SEO_DATA["ascendente-astrologico"]` existe (atenção: ID é `ascendente-astrologico`, NÃO `ascendente`; a chave deve casar com o `id` em `CALCULATORS`).
- [ ] `CALCULATOR_SEO_DATA["signo"]` existe.
- [ ] `CALCULATOR_SEO_DATA["compatibilidade-signos"]` existe.
- [ ] `CALCULATOR_SEO_DATA["numerologia"]` existe.
- [ ] Cada entrada segue o padrão dos existentes: `id`, `title` (com ano "2025"), `description` (começando com "★"), `keywords` (8-15 termos pt-BR), `canonicalUrl`, `priority` (0.7-0.8), `changeFreq` (`monthly`).

**Verify:**
1. `npm run typecheck` → 0 errors.
2. `npm run dev`, visitar `http://localhost:3000/calculadoras/astrologia/signo`, View Source → `<title>` contém "Signo" + "2025" + "CalculadoraOnlineBR" (não é o genérico).
3. Repetir para as outras 3 rotas.

**Steps:**

- [ ] **Step 1: Localizar a seção de "Tool Calculators" em `app/lib/calculator-seo.ts`**

Procurar pelo comentário `// Tool Calculators` (~linha 343). Antes desse comentário, adicionar uma nova seção:

```ts
  // Astrology Calculators
  "ascendente-astrologico": {
    id: "ascendente-astrologico",
    title: "Calculadora de Ascendente Astrológico 2025 - Mapa Astral - CalculadoraOnlineBR",
    description:
      "★ Descubra seu signo ascendente GRATUITAMENTE! Calcule seu ascendente astrológico usando data, hora e local de nascimento. Entenda como você se apresenta ao mundo na astrologia natal.",
    keywords:
      "calculadora ascendente, ascendente astrológico, signo ascendente, mapa astral, astrologia natal, ascendente capricórnio, ascendente leão, calcular ascendente, hora nascimento, astrologia",
    canonicalUrl: "https://www.calculadoraonlinebr.com.br/calculadoras/astrologia/ascendente",
    priority: 0.7,
    changeFreq: "monthly",
  },
  signo: {
    id: "signo",
    title: "Descubra Seu Signo 2025 - Signo do Zodíaco por Data de Nascimento - CalculadoraOnlineBR",
    description:
      "★ Descubra seu signo zodiacal GRATUITAMENTE! Identifique seu signo solar pela data de nascimento e conheça características, elementos e personalidade na astrologia.",
    keywords:
      "calculadora signo, descobrir signo, signo do zodíaco, signo data nascimento, áries, touro, gêmeos, câncer, leão, virgem, libra, escorpião, sagitário, capricórnio, aquário, peixes, signo solar",
    canonicalUrl: "https://www.calculadoraonlinebr.com.br/calculadoras/astrologia/signo",
    priority: 0.7,
    changeFreq: "monthly",
  },
  "compatibilidade-signos": {
    id: "compatibilidade-signos",
    title: "Compatibilidade de Signos 2025 - Teste Astrológico para Amor - CalculadoraOnlineBR",
    description:
      "★ Teste a compatibilidade entre signos GRATUITAMENTE! Análise astrológica completa para amor, amizade e trabalho. Descubra a química entre você e seu par com dicas personalizadas.",
    keywords:
      "compatibilidade signos, teste compatibilidade amor, sinastria, signos compatíveis, sinastria amorosa, compatibilidade astrológica, par perfeito, química signos, relacionamento astrologia",
    canonicalUrl: "https://www.calculadoraonlinebr.com.br/calculadoras/astrologia/compatibilidade-signos",
    priority: 0.7,
    changeFreq: "monthly",
  },
  numerologia: {
    id: "numerologia",
    title: "Calculadora de Numerologia 2025 - Número da Vida e Destino - CalculadoraOnlineBR",
    description:
      "★ Calculadora de numerologia GRATUITA! Descubra seus números da vida, personalidade, destino e alma com interpretações detalhadas baseadas em nome completo e data de nascimento.",
    keywords:
      "calculadora numerologia, numero da vida, numero destino, numerologia cabalística, numerologia nome, numerologia data nascimento, numero pessoal, numero alma, mapa numerológico",
    canonicalUrl: "https://www.calculadoraonlinebr.com.br/calculadoras/astrologia/numerologia",
    priority: 0.7,
    changeFreq: "monthly",
  },
```

- [ ] **Step 2: Verificar typecheck**

```bash
npm run typecheck
```

Erro comum: chave duplicada (se já existe alguma entrada de astrologia parcial). Resolver.

- [ ] **Step 3: Testar manualmente uma rota**

```bash
npm run dev
```

Acessar `http://localhost:3000/calculadoras/astrologia/signo` e via View Source (`Ctrl+U`) buscar por `<title>`. Deve aparecer "Descubra Seu Signo 2025...".

- [ ] **Step 4: Commit**

```bash
git add app/lib/calculator-seo.ts
git commit -m "feat(seo): adiciona CALCULATOR_SEO_DATA para calculadoras de astrologia

4 entradas adicionadas: ascendente-astrologico, signo, compatibilidade-signos, numerologia.
Sem essas entradas, as páginas caíam no meta genérico do root.tsx.

Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>"
```

```json:metadata
{"files": ["app/lib/calculator-seo.ts"], "verifyCommand": "npm run typecheck", "acceptanceCriteria": ["4 entradas astrologia em CALCULATOR_SEO_DATA", "chaves casam com IDs em CALCULATORS", "padrão consistente com entradas existentes"]}
```

---

### Task 2: Completar `CALCULATOR_SEO_DATA` — datas (5 calculadoras) + fix `diferenca-entre-datas`

**Goal:** Adicionar entradas SEO para as 5 calculadoras de datas e corrigir bug existente: `diferenca-entre-datas` está marcado como `// Tool Calculators` com `canonicalUrl` apontando para `/calculadoras/ferramentas/...`, mas o ID e a rota real são da categoria `datas`.

**Files:**
- Modify: `app/lib/calculator-seo.ts` — adicionar 4 entradas + corrigir 1 existente

**Acceptance Criteria:**
- [ ] Entrada existente de `diferenca-entre-datas` tem `canonicalUrl: "https://www.calculadoraonlinebr.com.br/calculadoras/datas/diferenca-entre-datas"` (não mais `/ferramentas/`).
- [ ] `CALCULATOR_SEO_DATA` contém: `contagem-regressiva`, `operacao-datas`, `idade-exata`, `dias-uteis`.
- [ ] Cada entrada segue padrão existente (★ description, keywords pt-BR, etc.).

**Verify:**
1. `npm run typecheck` → 0 errors.
2. `grep -A1 "diferenca-entre-datas:" app/lib/calculator-seo.ts | head -10` mostra `canonicalUrl` com `/datas/` (não `/ferramentas/`).
3. View Source em `http://localhost:3000/calculadoras/datas/idade-exata` mostra title customizado.

**Steps:**

- [ ] **Step 1: Corrigir `diferenca-entre-datas`**

Localizar a entrada existente em `app/lib/calculator-seo.ts` (~linha 357). Substituir:

```ts
  "diferenca-entre-datas": {
    id: "diferenca-entre-datas",
    title: "Calculadora de Diferença entre Datas 2025 - Idade e Dias Úteis - CalculadoraOnlineBR",
    description:
      "★ Calculadora de diferença entre datas GRATUITA! Calcule diferença em anos, meses, dias, horas e minutos. Inclui contagem de dias úteis, feriados e cálculo de idade.",
    keywords:
      "calculadora diferença datas, diferença entre datas, calcular idade, dias entre datas, contagem dias, dias úteis, feriados, tempo decorrido, intervalo tempo, idade",
    canonicalUrl:
      "https://www.calculadoraonlinebr.com.br/calculadoras/ferramentas/diferenca-entre-datas",
    priority: 0.7,
    changeFreq: "monthly",
  },
```

por:

```ts
  "diferenca-entre-datas": {
    id: "diferenca-entre-datas",
    title: "Calculadora de Diferença entre Datas 2025 - Idade e Dias Úteis - CalculadoraOnlineBR",
    description:
      "★ Calculadora de diferença entre datas GRATUITA! Calcule diferença em anos, meses, dias, horas e minutos. Inclui contagem de dias úteis, feriados e cálculo de idade.",
    keywords:
      "calculadora diferença datas, diferença entre datas, calcular idade, dias entre datas, contagem dias, dias úteis, feriados, tempo decorrido, intervalo tempo, idade",
    canonicalUrl:
      "https://www.calculadoraonlinebr.com.br/calculadoras/datas/diferenca-entre-datas",
    priority: 0.7,
    changeFreq: "monthly",
  },
```

(Mudança: `/ferramentas/` → `/datas/` no `canonicalUrl`.)

- [ ] **Step 2: Adicionar nova seção `// Date Calculators` antes da seção `// Tool Calculators`**

Mover a entrada `diferenca-entre-datas` para uma nova seção e adicionar as outras 4:

```ts
  // Date Calculators
  "diferenca-entre-datas": {
    // (entrada já corrigida do Step 1)
  },
  "contagem-regressiva": {
    id: "contagem-regressiva",
    title: "Calculadora de Contagem Regressiva 2025 - Contador Personalizado - CalculadoraOnlineBR",
    description:
      "★ Contagem regressiva GRATUITA para eventos especiais! Contador personalizado em anos, meses, dias, horas, minutos e segundos. Para aniversários, casamentos, viagens e mais.",
    keywords:
      "contagem regressiva, contador regressivo, contador eventos, contagem dias, contador aniversário, contador casamento, tempo até evento, calculadora dias, countdown timer",
    canonicalUrl: "https://www.calculadoraonlinebr.com.br/calculadoras/datas/contagem-regressiva",
    priority: 0.7,
    changeFreq: "monthly",
  },
  "operacao-datas": {
    id: "operacao-datas",
    title: "Calculadora de Operações entre Datas 2025 - Somar e Subtrair Datas - CalculadoraOnlineBR",
    description:
      "★ Some ou subtraia anos, meses e dias de qualquer data GRATUITAMENTE! Descubra datas futuras e passadas com precisão. Útil para prazos, vencimentos e planejamento.",
    keywords:
      "calculadora operação datas, somar datas, subtrair datas, adicionar dias, calcular data futura, data passada, prazos, vencimento data, planejamento datas",
    canonicalUrl: "https://www.calculadoraonlinebr.com.br/calculadoras/datas/operacao-datas",
    priority: 0.7,
    changeFreq: "monthly",
  },
  "idade-exata": {
    id: "idade-exata",
    title: "Calculadora de Idade Exata 2025 - Anos, Meses, Dias e Tempo Real - CalculadoraOnlineBR",
    description:
      "★ Calculadora de idade exata GRATUITA! Calcule sua idade em anos, meses, dias com contador em tempo real. Descubra quantos dias você viveu e quando será seu próximo aniversário.",
    keywords:
      "calculadora idade, idade exata, calcular idade, idade em dias, idade em meses, próximo aniversário, contador idade, idade tempo real, anos meses dias",
    canonicalUrl: "https://www.calculadoraonlinebr.com.br/calculadoras/datas/idade-exata",
    priority: 0.7,
    changeFreq: "monthly",
  },
  "dias-uteis": {
    id: "dias-uteis",
    title: "Calculadora de Dias Úteis 2025 - Feriados Nacionais Incluídos - CalculadoraOnlineBR",
    description:
      "★ Calculadora de dias úteis GRATUITA! Conte dias úteis entre datas considerando feriados nacionais brasileiros, Carnaval, Páscoa e emendas. Calendário 2025 atualizado.",
    keywords:
      "calculadora dias úteis, dias úteis entre datas, feriados nacionais 2025, contar dias úteis, calendário trabalhista, carnaval feriado, páscoa feriado, dias úteis prazo",
    canonicalUrl: "https://www.calculadoraonlinebr.com.br/calculadoras/datas/dias-uteis",
    priority: 0.7,
    changeFreq: "monthly",
  },
```

- [ ] **Step 3: Validar e commit**

```bash
npm run typecheck
git add app/lib/calculator-seo.ts
git commit -m "feat(seo): adiciona CALCULATOR_SEO_DATA para datas e corrige canonical de diferenca-entre-datas

5 entradas de calculadoras de datas (contagem-regressiva, operacao-datas,
idade-exata, dias-uteis) mais correção do canonicalUrl de diferenca-entre-datas
que apontava para /ferramentas/ em vez de /datas/.

Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>"
```

```json:metadata
{"files": ["app/lib/calculator-seo.ts"], "verifyCommand": "npm run typecheck", "acceptanceCriteria": ["diferenca-entre-datas canonical corrigido", "5 calculadoras de datas no map", "padrão consistente"]}
```

---

### Task 3: Completar `CALCULATOR_SEO_DATA` — ferramentas (12 calculadoras novas)

**Goal:** Adicionar entradas para as 12 calculadoras de `ferramentas` que ainda não estão no map (gerador-cpf já existe).

**Files:**
- Modify: `app/lib/calculator-seo.ts` — adicionar 12 entradas

**Acceptance Criteria:**
- [ ] Map contém: `gerador-cnpj`, `validar-cpf`, `validar-cnpj`, `contador-caracteres`, `gerador-cartao-credito`, `gerador-uuid-guid`, `sorteador-online`, `gerador-senha-segura`, `clicks-por-segundo`, `carro-eletrico-combustao`, `economia-energia-eletrica`, `consumo-energia-eletrica`, `conversor-unidades`.
- [ ] Cada entrada segue padrão (título com 2025, description com ★, keywords 8-15 termos).

**Verify:**
1. `npm run typecheck` → 0 errors.
2. `grep -c "category: \"ferramentas\"" app/lib/calculator-seo.ts` → mínimo 13 (incluindo gerador-cpf existente). Como o arquivo não tem campo `category`, melhor: contar entradas com `/calculadoras/ferramentas/` em `canonicalUrl`. `grep -c "/calculadoras/ferramentas/" app/lib/calculator-seo.ts` → 13.
3. View Source em 2 calculadoras random (ex: `/clicks-por-segundo`, `/gerador-uuid-guid`) mostra title customizado.

**Steps:**

- [ ] **Step 1: Adicionar as 13 entradas na seção `// Tool Calculators`**

Localizar `// Tool Calculators` em `app/lib/calculator-seo.ts`. Adicionar APÓS `"gerador-cpf"` (que já existe) e ANTES de qualquer outra seção:

```ts
  "gerador-cnpj": {
    id: "gerador-cnpj",
    title: "Gerador de CNPJ 2025 - Válido para Testes e Desenvolvimento - CalculadoraOnlineBR",
    description:
      "★ Gerador de CNPJ GRATUITO e válido para testes e desenvolvimento! Gere CNPJs com ou sem pontuação, cópia automática. Algoritmo oficial da Receita Federal com validação completa.",
    keywords:
      "gerador CNPJ, CNPJ válido, CNPJ teste, CNPJ desenvolvimento, CNPJ sem pontuação, CNPJ formatado, validador CNPJ, algoritmo CNPJ, dígitos verificadores, Receita Federal",
    canonicalUrl: "https://www.calculadoraonlinebr.com.br/calculadoras/ferramentas/gerador-cnpj",
    priority: 0.8,
    changeFreq: "monthly",
  },
  "validar-cpf": {
    id: "validar-cpf",
    title: "Validador de CPF 2025 - Algoritmo Oficial Receita Federal - CalculadoraOnlineBR",
    description:
      "★ Validador de CPF GRATUITO e instantâneo! Verifique se um CPF é válido com ou sem pontuação usando algoritmo oficial da Receita Federal. Validação matemática completa.",
    keywords:
      "validador CPF, validar CPF, verificar CPF, CPF válido, algoritmo CPF, dígitos verificadores CPF, CPF formatado, CPF sem pontuação, Receita Federal, conferir CPF",
    canonicalUrl: "https://www.calculadoraonlinebr.com.br/calculadoras/ferramentas/validar-cpf",
    priority: 0.8,
    changeFreq: "monthly",
  },
  "validar-cnpj": {
    id: "validar-cnpj",
    title: "Validador de CNPJ 2025 - Algoritmo Oficial Receita Federal - CalculadoraOnlineBR",
    description:
      "★ Validador de CNPJ GRATUITO e instantâneo! Verifique se um CNPJ é válido com ou sem pontuação usando algoritmo oficial da Receita Federal. Validação matemática completa.",
    keywords:
      "validador CNPJ, validar CNPJ, verificar CNPJ, CNPJ válido, algoritmo CNPJ, dígitos verificadores CNPJ, CNPJ formatado, Receita Federal, conferir CNPJ, empresa",
    canonicalUrl: "https://www.calculadoraonlinebr.com.br/calculadoras/ferramentas/validar-cnpj",
    priority: 0.8,
    changeFreq: "monthly",
  },
  "contador-caracteres": {
    id: "contador-caracteres",
    title: "Contador de Caracteres 2025 - Letras, Palavras e Frases - CalculadoraOnlineBR",
    description:
      "★ Contador de caracteres GRATUITO e completo! Conte letras, palavras, frases com análise de frequência por letra. Estatísticas avançadas e filtros personalizáveis.",
    keywords:
      "contador caracteres, contador letras, contador palavras, contador frases, estatística texto, análise texto, frequência letras, contar caracteres, texto online",
    canonicalUrl: "https://www.calculadoraonlinebr.com.br/calculadoras/ferramentas/contador-caracteres",
    priority: 0.7,
    changeFreq: "monthly",
  },
  "gerador-cartao-credito": {
    id: "gerador-cartao-credito",
    title: "Gerador de Cartão de Crédito 2025 - Visa, Mastercard, Amex - CalculadoraOnlineBR",
    description:
      "★ Gerador de cartão de crédito GRATUITO para testes e desenvolvimento! Visa, Mastercard, American Express e outras bandeiras com algoritmo de Luhn validado.",
    keywords:
      "gerador cartão crédito, cartão crédito teste, cartão visa teste, cartão mastercard teste, algoritmo luhn, cartão desenvolvimento, número cartão válido, teste sistema pagamento",
    canonicalUrl: "https://www.calculadoraonlinebr.com.br/calculadoras/ferramentas/gerador-cartao-credito",
    priority: 0.7,
    changeFreq: "monthly",
  },
  "gerador-uuid-guid": {
    id: "gerador-uuid-guid",
    title: "Gerador de UUID/GUID 2025 - Múltiplos Formatos e Versões - CalculadoraOnlineBR",
    description:
      "★ Gerador de UUID/GUID GRATUITO! Múltiplos formatos (JS, SQL, MongoDB, Python, Base64). Versões v1, v4, v5 com geração em lote até 1000 e exportação.",
    keywords:
      "gerador UUID, gerador GUID, UUID v4, UUID v5, GUID online, UUID JavaScript, UUID SQL, MongoDB ObjectId, identificador único, base64 UUID, lote UUID",
    canonicalUrl: "https://www.calculadoraonlinebr.com.br/calculadoras/ferramentas/gerador-uuid-guid",
    priority: 0.7,
    changeFreq: "monthly",
  },
  "sorteador-online": {
    id: "sorteador-online",
    title: "Sorteador Online 2025 - Sorteio Aleatório de Nomes e Itens - CalculadoraOnlineBR",
    description:
      "★ Sorteador online GRATUITO! Sorteie nomes, números, objetos ou qualquer lista com animação. Sem limite, aleatoriedade garantida e histórico completo de sorteios.",
    keywords:
      "sorteador online, sorteio aleatório, sorteio nomes, sortear lista, sorteador grátis, sorteio rifa, sorteio amigo secreto, gerador aleatório, sorteio Instagram",
    canonicalUrl: "https://www.calculadoraonlinebr.com.br/calculadoras/ferramentas/sorteador-online",
    priority: 0.7,
    changeFreq: "monthly",
  },
  "gerador-senha-segura": {
    id: "gerador-senha-segura",
    title: "Gerador de Senhas Seguras 2025 - Análise de Força Inclusa - CalculadoraOnlineBR",
    description:
      "★ Gerador de senhas seguras GRATUITO! Personalize tamanho, caracteres especiais, números e letras. Análise de força e cópia automática para segurança digital máxima.",
    keywords:
      "gerador senha segura, senha forte, senha aleatória, segurança digital, força senha, gerador password, senha online, criar senha, senha complexa, dicas senha",
    canonicalUrl: "https://www.calculadoraonlinebr.com.br/calculadoras/ferramentas/gerador-senha-segura",
    priority: 0.8,
    changeFreq: "monthly",
  },
  "clicks-por-segundo": {
    id: "clicks-por-segundo",
    title: "Teste CPS 2025 - Clicks Por Segundo com Anti-Cheat - CalculadoraOnlineBR",
    description:
      "★ Teste seus clicks por segundo (CPS) GRATUITAMENTE! Análise avançada de padrões, anti-cheat com IA, rankings e classificações. Ferramenta gamificada profissional.",
    keywords:
      "teste CPS, clicks por segundo, click test, CPS test, velocidade clique, click speed, gamer test, anti-cheat clicks, ranking CPS, jitter click, butterfly click",
    canonicalUrl: "https://www.calculadoraonlinebr.com.br/calculadoras/ferramentas/clicks-por-segundo",
    priority: 0.7,
    changeFreq: "monthly",
  },
  "carro-eletrico-combustao": {
    id: "carro-eletrico-combustao",
    title: "Carro Elétrico vs Combustão 2025 - Custo, Economia e Payback - CalculadoraOnlineBR",
    description:
      "★ Compare carros elétricos vs combustão GRATUITAMENTE! Análise de custos completa, payback inteligente, economia por perfil, equivalência em litros e impacto ambiental.",
    keywords:
      "carro elétrico vs combustão, comparar carros, payback carro elétrico, economia carro elétrico, custo carro elétrico, EV vs gasolina, sustentabilidade veículo, BYD, Tesla",
    canonicalUrl: "https://www.calculadoraonlinebr.com.br/calculadoras/ferramentas/carro-eletrico-combustao",
    priority: 0.7,
    changeFreq: "monthly",
  },
  "economia-energia-eletrica": {
    id: "economia-energia-eletrica",
    title: "Calculadora de Economia de Energia Elétrica 2025 - Análise Completa - CalculadoraOnlineBR",
    description:
      "★ Economize até 50% na conta de luz GRATUITAMENTE! Análise de consumo por ambiente, comparação LED, simulação solar e detecção de vampirismo energético.",
    keywords:
      "calculadora economia energia, conta luz mais barata, economizar energia, vampirismo energético, lâmpadas LED economia, energia solar simulação, consumo aparelhos, sustentabilidade",
    canonicalUrl: "https://www.calculadoraonlinebr.com.br/calculadoras/ferramentas/economia-energia-eletrica",
    priority: 0.7,
    changeFreq: "monthly",
  },
  "consumo-energia-eletrica": {
    id: "consumo-energia-eletrica",
    title: "Calculadora de Consumo de Energia Elétrica 2025 - Watts e KWh - CalculadoraOnlineBR",
    description:
      "★ Calcule consumo elétrico de aparelhos GRATUITAMENTE! Biblioteca integrada, selo Procel, detecção de standby. Compare cenários e LED vs incandescente.",
    keywords:
      "calculadora consumo energia, watts kwh, consumo aparelho elétrico, selo procel, conta de luz, calcular kwh, consumo standby, eficiência energética",
    canonicalUrl: "https://www.calculadoraonlinebr.com.br/calculadoras/ferramentas/consumo-energia-eletrica",
    priority: 0.7,
    changeFreq: "monthly",
  },
  "conversor-unidades": {
    id: "conversor-unidades",
    title: "Conversor de Unidades 2025 - Comprimento, Peso, Volume, Temperatura - CalculadoraOnlineBR",
    description:
      "★ Conversor de unidades GRATUITO! Converta comprimento, peso, volume, temperatura, área e velocidade com precisão. Sistema métrico e imperial completos.",
    keywords:
      "conversor unidades, converter medidas, conversor metros pés, conversor kg libras, conversor celsius fahrenheit, conversor volume, sistema métrico imperial, conversor área",
    canonicalUrl: "https://www.calculadoraonlinebr.com.br/calculadoras/ferramentas/conversor-unidades",
    priority: 0.7,
    changeFreq: "monthly",
  },
```

- [ ] **Step 2: Validar typecheck**

```bash
npm run typecheck
```

- [ ] **Step 3: Testar manualmente**

```bash
npm run dev
```

Visitar `http://localhost:3000/calculadoras/ferramentas/clicks-por-segundo` e `http://localhost:3000/calculadoras/ferramentas/conversor-unidades`. View Source mostra titles customizados.

- [ ] **Step 4: Commit**

```bash
git add app/lib/calculator-seo.ts
git commit -m "feat(seo): adiciona CALCULATOR_SEO_DATA para ferramentas (13 calculadoras)

Entradas: gerador-cnpj, validar-cpf, validar-cnpj, contador-caracteres,
gerador-cartao-credito, gerador-uuid-guid, sorteador-online,
gerador-senha-segura, clicks-por-segundo, carro-eletrico-combustao,
economia-energia-eletrica, consumo-energia-eletrica, conversor-unidades.

Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>"
```

```json:metadata
{"files": ["app/lib/calculator-seo.ts"], "verifyCommand": "npm run typecheck", "acceptanceCriteria": ["13 ferramentas em CALCULATOR_SEO_DATA", "padrão consistente"]}
```

---

### Task 4: Completar `CALCULATOR_SEO_DATA` — loterias (3) + matemática (4 novas)

**Goal:** Adicionar entradas para as 3 calculadoras de loterias e 4 calculadoras de matemática que faltam (`calculadora-cientifica`, `sistemas-equacoes-lineares`, `inequacoes`, `simplificador-funcoes-algebricas`).

**Files:**
- Modify: `app/lib/calculator-seo.ts` — adicionar 7 entradas

**Acceptance Criteria:**
- [ ] Map contém: `gerador-mega-sena`, `gerador-lotofacil`, `gerador-quina`.
- [ ] Map contém: `calculadora-cientifica`, `sistemas-equacoes-lineares`, `inequacoes`, `simplificador-funcoes-algebricas`.
- [ ] Cada entrada segue padrão existente.

**Verify:**
1. `npm run typecheck` → 0 errors.
2. View Source em `http://localhost:3000/calculadoras/loterias/gerador-mega-sena` e `http://localhost:3000/calculadoras/matematica/calculadora-cientifica` mostra titles customizados.

**Steps:**

- [ ] **Step 1: Adicionar nova seção `// Lottery Calculators`**

Após a seção de `// Date Calculators` (criada na Task 2) e antes ou depois de `// Tool Calculators`:

```ts
  // Lottery Calculators
  "gerador-mega-sena": {
    id: "gerador-mega-sena",
    title: "Gerador de Mega-Sena 2025 - Números Aleatórios com Estatísticas - CalculadoraOnlineBR",
    description:
      "★ Gerador de Mega-Sena GRATUITO! Gere números aleatórios para seus jogos com estatísticas de frequência, números mais sorteados e estratégias inteligentes.",
    keywords:
      "gerador mega-sena, números mega-sena, jogo mega-sena, sorteio mega-sena, números aleatórios, palpite mega-sena, estatística mega-sena, números frequentes loteria",
    canonicalUrl: "https://www.calculadoraonlinebr.com.br/calculadoras/loterias/gerador-mega-sena",
    priority: 0.7,
    changeFreq: "monthly",
  },
  "gerador-lotofacil": {
    id: "gerador-lotofacil",
    title: "Gerador de Lotofácil 2025 - Estratégias e Combinações - CalculadoraOnlineBR",
    description:
      "★ Gerador de Lotofácil GRATUITO! Gere números aleatórios com estratégias inteligentes, análise de frequência e combinações otimizadas para seus jogos.",
    keywords:
      "gerador lotofácil, números lotofácil, jogo lotofácil, sorteio lotofácil, palpite lotofácil, estratégia lotofácil, números mais sorteados, dezenas lotofácil",
    canonicalUrl: "https://www.calculadoraonlinebr.com.br/calculadoras/loterias/gerador-lotofacil",
    priority: 0.7,
    changeFreq: "monthly",
  },
  "gerador-quina": {
    id: "gerador-quina",
    title: "Gerador de Quina 2025 - Análise de Frequência e Estatísticas - CalculadoraOnlineBR",
    description:
      "★ Gerador de Quina GRATUITO! Gere números aleatórios para seus jogos da Quina com análise de frequência, números mais sorteados e estratégias comprovadas.",
    keywords:
      "gerador quina, números quina, jogo quina, sorteio quina, palpite quina, estratégia quina, números frequentes quina, dezenas quina, palpite loteria",
    canonicalUrl: "https://www.calculadoraonlinebr.com.br/calculadoras/loterias/gerador-quina",
    priority: 0.7,
    changeFreq: "monthly",
  },
```

- [ ] **Step 2: Adicionar 4 entradas de matemática faltantes**

Localizar a seção `// Mathematical Calculators` (já existe). Adicionar no final dela:

```ts
  "calculadora-cientifica": {
    id: "calculadora-cientifica",
    title: "Calculadora Científica Online 2025 - Funções Trigonométricas e Logarítmicas - CalculadoraOnlineBR",
    description:
      "★ Calculadora científica online GRATUITA! Funções trigonométricas (sin, cos, tan), logarítmicas (log, ln), exponenciais e estatísticas. Interface profissional completa.",
    keywords:
      "calculadora científica, calculadora online científica, funções trigonométricas, seno cosseno tangente, logaritmo natural, calculadora avançada, calculadora estudante",
    canonicalUrl: "https://www.calculadoraonlinebr.com.br/calculadoras/matematica/calculadora-cientifica",
    priority: 0.8,
    changeFreq: "monthly",
  },
  "sistemas-equacoes-lineares": {
    id: "sistemas-equacoes-lineares",
    title: "Sistemas de Equações Lineares 2025 - Gauss e Cramer - CalculadoraOnlineBR",
    description:
      "★ Resolva sistemas de equações lineares 2x2 e 3x3 GRATUITAMENTE! Métodos de eliminação de Gauss e regra de Cramer com solução passo a passo para álgebra linear.",
    keywords:
      "sistemas equações lineares, equações lineares 2x2 3x3, método de Gauss, regra de Cramer, álgebra linear, sistema equações resolver, matriz coeficientes, determinante",
    canonicalUrl: "https://www.calculadoraonlinebr.com.br/calculadoras/matematica/sistemas-equacoes-lineares",
    priority: 0.7,
    changeFreq: "monthly",
  },
  inequacoes: {
    id: "inequacoes",
    title: "Calculadora de Inequações 2025 - 1º e 2º Grau com Análise de Sinais - CalculadoraOnlineBR",
    description:
      "★ Resolva inequações de 1º e 2º grau GRATUITAMENTE! Análise de sinais, intervalos de solução, múltiplos operadores e explicação passo a passo completa.",
    keywords:
      "calculadora inequações, inequação primeiro grau, inequação segundo grau, análise de sinais, intervalos solução, desigualdade matemática, ensino médio, álgebra",
    canonicalUrl: "https://www.calculadoraonlinebr.com.br/calculadoras/matematica/inequacoes",
    priority: 0.7,
    changeFreq: "monthly",
  },
  "simplificador-funcoes-algebricas": {
    id: "simplificador-funcoes-algebricas",
    title: "Simplificador de Expressões Algébricas 2025 - Fatoração e Redução - CalculadoraOnlineBR",
    description:
      "★ Simplifique expressões algébricas GRATUITAMENTE! Fatoração automática, redução de termos semelhantes, suporte a múltiplas variáveis com explicação passo a passo.",
    keywords:
      "simplificador expressões algébricas, fatoração algébrica, redução termos semelhantes, álgebra, simplificar polinômio, expressões matemáticas, fatorar online",
    canonicalUrl: "https://www.calculadoraonlinebr.com.br/calculadoras/matematica/simplificador-funcoes-algebricas",
    priority: 0.7,
    changeFreq: "monthly",
  },
```

- [ ] **Step 3: Validar e commit**

```bash
npm run typecheck
git add app/lib/calculator-seo.ts
git commit -m "feat(seo): adiciona CALCULATOR_SEO_DATA para loterias e matemática avançada

3 entradas de loterias (gerador-mega-sena, gerador-lotofacil, gerador-quina)
e 4 de matemática (calculadora-cientifica, sistemas-equacoes-lineares,
inequacoes, simplificador-funcoes-algebricas).

Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>"
```

```json:metadata
{"files": ["app/lib/calculator-seo.ts"], "verifyCommand": "npm run typecheck", "acceptanceCriteria": ["3 loterias no map", "4 matemáticas novas no map"]}
```

---

### Task 5: Completar `CALCULATOR_SEO_DATA` — trabalhista (3) + saúde (1) + finanças (1)

**Goal:** Fechar as últimas lacunas em `CALCULATOR_SEO_DATA`: 3 calculadoras trabalhistas faltando (`ferias-decimo-terceiro`, `horas-extras`, `salario-liquido`), 1 de saúde (`peso-gravidez`) e 1 de finanças (`renda-fixa-comparativa`).

**Files:**
- Modify: `app/lib/calculator-seo.ts` — adicionar 5 entradas

**Acceptance Criteria:**
- [ ] Map contém: `ferias-decimo-terceiro`, `horas-extras`, `salario-liquido`, `peso-gravidez`, `renda-fixa-comparativa`.
- [ ] Após esta task, **TODAS as 66 calculadoras** têm entrada em `CALCULATOR_SEO_DATA`.

**Verify:**
1. `npm run typecheck` → 0 errors.
2. Script de auditoria — rodar no terminal:
   ```bash
   node -e "
   const calcs = require('./app/lib/constants').CALCULATORS;
   const seo = require('./app/lib/calculator-seo').CALCULATOR_SEO_DATA;
   const missing = calcs.filter(c => !seo[c.id]);
   console.log('Total:', calcs.length, 'Com SEO:', calcs.length - missing.length, 'Faltam:', missing.map(c => c.id));
   "
   ```
   (Pode não rodar diretamente devido ao ESM — alternativa via `npm run dev` e testar todas as 66 rotas com curl/View Source.)
3. View Source em `http://localhost:3000/calculadoras/trabalhista/salario-liquido` e `http://localhost:3000/calculadoras/saude/peso-gravidez` mostra titles customizados.

**Steps:**

- [ ] **Step 1: Adicionar entradas de saúde e finanças**

Localizar respectivas seções em `app/lib/calculator-seo.ts`.

Em `// Health Calculators`, adicionar:

```ts
  "peso-gravidez": {
    id: "peso-gravidez",
    title: "Calculadora de Peso na Gravidez 2025 - Tabela OMS e IMC Gestacional - CalculadoraOnlineBR",
    description:
      "★ Monitore o ganho de peso gestacional GRATUITAMENTE! Análise trimestral personalizada segundo OMS com cálculo de IMC pré-gestacional e zonas saudáveis.",
    keywords:
      "calculadora peso gravidez, ganho peso gestacional, IMC gestacional, peso gestante, tabela OMS gravidez, peso ideal gravidez, ganho peso trimestre, gestação saudável",
    canonicalUrl: "https://www.calculadoraonlinebr.com.br/calculadoras/saude/peso-gravidez",
    priority: 0.8,
    changeFreq: "monthly",
  },
```

Em `// Financial Calculators`, adicionar:

```ts
  "renda-fixa-comparativa": {
    id: "renda-fixa-comparativa",
    title: "Calculadora Comparativa de Renda Fixa 2025 - CDB, LCI, LCA, Tesouro - CalculadoraOnlineBR",
    description:
      "★ Compare CDB, LCI, LCA, Tesouro Direto e Poupança lado a lado GRATUITAMENTE! Ranking automático, taxas reais 2025 e análise completa de rendimentos.",
    keywords:
      "calculadora renda fixa comparativa, CDB vs LCI LCA, Tesouro Direto comparação, ranking investimentos, melhor renda fixa, comparar rendimento, poupança vs CDB, juros 2025",
    canonicalUrl: "https://www.calculadoraonlinebr.com.br/calculadoras/financas/renda-fixa-comparativa",
    priority: 0.8,
    changeFreq: "monthly",
  },
```

- [ ] **Step 2: Adicionar entradas trabalhistas na seção `// Labor Calculators`**

```ts
  "salario-liquido": {
    id: "salario-liquido",
    title: "Calculadora de Salário Líquido 2025 - INSS e IRRF Atualizados - CalculadoraOnlineBR",
    description:
      "★ Calcule seu salário líquido GRATUITAMENTE! Tabelas INSS e IRRF 2025 atualizadas. Suporte a CLT, PJ, dependentes e horas extras com cálculo em tempo real.",
    keywords:
      "calculadora salário líquido, INSS 2025, IRRF 2025, salário bruto líquido, descontos folha pagamento, calcular salário, dependentes IRRF, salário CLT, salário PJ",
    canonicalUrl: "https://www.calculadoraonlinebr.com.br/calculadoras/trabalhista/salario-liquido",
    priority: 0.9,
    changeFreq: "monthly",
  },
  "ferias-decimo-terceiro": {
    id: "ferias-decimo-terceiro",
    title: "Calculadora de Férias e 13º Salário 2025 - INSS, IRRF e Abono - CalculadoraOnlineBR",
    description:
      "★ Calcule férias e 13º salário GRATUITAMENTE! Tabelas oficiais 2025. Inclui INSS, IRRF, abono pecuniário, adiantamentos e todas as regras da CLT.",
    keywords:
      "calculadora férias, calculadora 13º salário, décimo terceiro, abono pecuniário, férias proporcionais, gratificação natalina, CLT férias, adiantamento 13º, INSS férias",
    canonicalUrl: "https://www.calculadoraonlinebr.com.br/calculadoras/trabalhista/ferias-decimo-terceiro",
    priority: 0.9,
    changeFreq: "monthly",
  },
  "horas-extras": {
    id: "horas-extras",
    title: "Calculadora de Horas Extras CLT 2025 - Adicional 50%, 100% e Noturno - CalculadoraOnlineBR",
    description:
      "★ Calcule horas extras CLT GRATUITAMENTE! Adicional 50% dia útil, 100% domingo/feriado, 20% noturno conforme CLT Art. 59. Base legal e cálculo preciso.",
    keywords:
      "calculadora horas extras, horas extras CLT, adicional 50% 100%, adicional noturno, art 59 CLT, banco de horas, hora extra domingo feriado, hora extra noturna",
    canonicalUrl: "https://www.calculadoraonlinebr.com.br/calculadoras/trabalhista/horas-extras",
    priority: 0.8,
    changeFreq: "monthly",
  },
```

- [ ] **Step 3: Validar typecheck**

```bash
npm run typecheck
```

- [ ] **Step 4: Auditoria de completude — verificar 100% das calculadoras têm SEO data**

Criar arquivo temporário `scripts/audit-seo-data.mjs` (pode deletar depois):

```js
import { CALCULATORS } from "../app/lib/constants.ts";
import { CALCULATOR_SEO_DATA } from "../app/lib/calculator-seo.ts";

const missing = CALCULATORS.filter((c) => !CALCULATOR_SEO_DATA[c.id]);
console.log(`Total: ${CALCULATORS.length}, Com SEO: ${CALCULATORS.length - missing.length}, Faltam: ${missing.length}`);
if (missing.length > 0) {
  console.log("Missing IDs:", missing.map((c) => c.id).join(", "));
  process.exit(1);
}
```

Como o projeto não tem `tsx` instalado, a forma mais simples é fazer essa auditoria diretamente: rodar `npm run dev`, abrir DevTools no `/` e cole no Console:

```js
fetch('/sitemap.xml').then(r => r.text()).then(xml => {
  const matches = xml.match(/<url>/g);
  console.log('URLs no sitemap:', matches.length);
});
```

Esperado: 78. Se cair em qualquer página da calculadora e abrir DevTools Network, ver que o `<title>` veio do `CALCULATOR_SEO_DATA` (não o genérico).

**Verificação simplificada (não programática mas suficiente):** abrir `app/lib/calculator-seo.ts` e contar manualmente as keys do objeto `CALCULATOR_SEO_DATA` — deve ser ≥66.

- [ ] **Step 5: Commit**

```bash
git add app/lib/calculator-seo.ts
git commit -m "feat(seo): completa CALCULATOR_SEO_DATA com últimas 5 calculadoras

Entradas finais: peso-gravidez (saúde), renda-fixa-comparativa (finanças),
salario-liquido, ferias-decimo-terceiro, horas-extras (trabalhista).

Após este commit, 100% das 66 calculadoras têm meta SEO customizado.
Nenhuma página cai mais no meta genérico do root.tsx.

Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>"
```

```json:metadata
{"files": ["app/lib/calculator-seo.ts"], "verifyCommand": "npm run typecheck", "acceptanceCriteria": ["5 entradas finais", "100% das calculadoras cobertas"]}
```

---

### Task 6: Remover `aggregateRating` fictício de Schema.org

**Goal:** Remover `aggregateRating` hardcoded de `structured-data.ts`. Atualmente declara `ratingValue: "4.8"` e `ratingCount: "250"` para todas calculadoras sem dados reais — viola política do Google e risca manual action.

**Files:**
- Modify: `app/lib/structured-data.ts` — remover 2 blocos `aggregateRating`

**Acceptance Criteria:**
- [ ] `generateWebsiteStructuredData()` não inclui `aggregateRating` nos items da `ItemList`.
- [ ] `generateCalculatorStructuredData()` não inclui `aggregateRating`.
- [ ] Outros campos (`offers`, `applicationCategory`, `author`, `publisher`, `featureList`, `isAccessibleForFree`) preservados.

**Verify:**
1. `npm run typecheck` → 0 errors.
2. `grep -c "aggregateRating" app/lib/structured-data.ts` → 0.
3. `npm run dev`, View Source em uma calculadora (ex: `/calculadoras/saude/imc`), buscar `application/ld+json` → bloco SoftwareApplication NÃO contém `aggregateRating`.

**Steps:**

- [ ] **Step 1: Remover `aggregateRating` em `generateWebsiteStructuredData()`**

Em `app/lib/structured-data.ts`, localizar dentro de `itemListElement.map(...)` (~linha 85). Remover o bloco:

```ts
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: "4.8",
            ratingCount: "250",
            bestRating: "5",
            worstRating: "1",
          },
```

(Deixar virgulas/sintaxe consistentes — verificar typecheck depois.)

- [ ] **Step 2: Remover `aggregateRating` em `generateCalculatorStructuredData()`**

Localizar (~linha 133) e remover:

```ts
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      ratingCount: "250",
      bestRating: "5",
      worstRating: "1",
    },
```

- [ ] **Step 3: Validar**

```bash
npm run typecheck
grep -c "aggregateRating" app/lib/structured-data.ts
```

Segundo deve ser `0`.

- [ ] **Step 4: Commit**

```bash
git add app/lib/structured-data.ts
git commit -m "fix(seo): remove aggregateRating fictício de Schema.org

Declarava ratingValue 4.8 com ratingCount 250 hardcoded para todas
calculadoras sem dados reais — viola política de Review Snippets
do Google e arrisca manual action.

https://developers.google.com/search/docs/appearance/structured-data/review-snippet

Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>"
```

```json:metadata
{"files": ["app/lib/structured-data.ts"], "verifyCommand": "npm run typecheck && ! grep -q aggregateRating app/lib/structured-data.ts", "acceptanceCriteria": ["aggregateRating removido de WebsiteStructuredData", "aggregateRating removido de CalculatorStructuredData", "demais campos preservados"]}
```

---

### Task 7: Gerar imagem Open Graph 1200×630

**Goal:** Criar `public/og-image-1200x630.webp` (1200×630px, WebP, <100KB) com branding "CalculadoraOnlineBR — Calculadoras Online Gratuitas". Instalar `sharp` como devDep e criar script Node que gera o arquivo a partir de SVG.

**Files:**
- Create: `scripts/generate-og-image.mjs`
- Create: `public/og-image-1200x630.webp`
- Modify: `package.json` — adicionar `sharp` em devDependencies e script `og:generate`

**Acceptance Criteria:**
- [ ] `sharp` instalado em `devDependencies` no `package.json`.
- [ ] Script `npm run og:generate` existe e roda sem erro.
- [ ] `public/og-image-1200x630.webp` existe, dimensões 1200×630, formato WebP.
- [ ] Imagem contém logo/marca CalculadoraOnlineBR.

**Verify:**
1. `npm run og:generate` → cria arquivo e imprime "Generated public/og-image-1200x630.webp".
2. `node -e "import('sharp').then(m => m.default('public/og-image-1200x630.webp').metadata().then(console.log))"` → mostra `width: 1200, height: 630, format: 'webp'`.
3. Abrir arquivo no Explorer/Finder/preview e validar visualmente que tem branding.

**Steps:**

- [ ] **Step 1: Instalar `sharp`**

```bash
npm install --save-dev sharp
```

- [ ] **Step 2: Criar `scripts/generate-og-image.mjs`**

```js
// scripts/generate-og-image.mjs
import sharp from "sharp";
import { writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const outputPath = resolve(__dirname, "../public/og-image-1200x630.webp");

const svg = `
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#0f0f23"/>
      <stop offset="100%" stop-color="#1a1a2e"/>
    </linearGradient>
    <linearGradient id="accent" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#64B5F6"/>
      <stop offset="100%" stop-color="#42A5F5"/>
    </linearGradient>
  </defs>

  <!-- Background -->
  <rect width="1200" height="630" fill="url(#bg)"/>

  <!-- Decorative accent bar -->
  <rect x="0" y="0" width="1200" height="8" fill="url(#accent)"/>

  <!-- Calculator icon (simplified) -->
  <g transform="translate(120, 180)">
    <rect x="0" y="0" width="160" height="200" rx="20" fill="#1e293b" stroke="#64B5F6" stroke-width="4"/>
    <rect x="20" y="20" width="120" height="50" rx="6" fill="#0f172a"/>
    <text x="80" y="55" font-family="monospace" font-size="28" fill="#64B5F6" text-anchor="middle" font-weight="700">123</text>
    <g fill="#334155">
      <rect x="20" y="90" width="32" height="32" rx="4"/>
      <rect x="64" y="90" width="32" height="32" rx="4"/>
      <rect x="108" y="90" width="32" height="32" rx="4"/>
      <rect x="20" y="130" width="32" height="32" rx="4"/>
      <rect x="64" y="130" width="32" height="32" rx="4"/>
      <rect x="108" y="130" width="32" height="32" rx="4"/>
    </g>
    <rect x="20" y="170" width="120" height="14" rx="4" fill="#64B5F6"/>
  </g>

  <!-- Title -->
  <text x="340" y="280" font-family="Inter, system-ui, sans-serif" font-size="72" font-weight="800" fill="#ffffff">
    CalculadoraOnlineBR
  </text>

  <!-- Subtitle -->
  <text x="340" y="340" font-family="Inter, system-ui, sans-serif" font-size="34" font-weight="500" fill="#94a3b8">
    Calculadoras Online Gratuitas
  </text>

  <!-- Categories chip row -->
  <g font-family="Inter, system-ui, sans-serif" font-size="22" font-weight="600" fill="#64B5F6">
    <text x="340" y="420">Saúde · Finanças · Matemática · Trabalhista · Datas</text>
  </g>

  <!-- URL -->
  <text x="600" y="570" font-family="Inter, system-ui, sans-serif" font-size="22" font-weight="500" fill="#64748b" text-anchor="middle">
    calculadoraonlinebr.com.br
  </text>
</svg>
`;

const buffer = await sharp(Buffer.from(svg))
  .resize(1200, 630)
  .webp({ quality: 85, effort: 6 })
  .toBuffer();

writeFileSync(outputPath, buffer);
console.log(`Generated ${outputPath} (${(buffer.length / 1024).toFixed(1)} KB)`);
```

- [ ] **Step 3: Adicionar script no `package.json`**

Editar a seção `scripts` para adicionar `"og:generate": "node scripts/generate-og-image.mjs"` antes de `"indexnow:config"`:

```json
    "og:generate": "node scripts/generate-og-image.mjs",
    "indexnow:config": "node scripts/indexnow-submit.js --config",
```

- [ ] **Step 4: Gerar a imagem**

```bash
npm run og:generate
```

Saída esperada: `Generated .../public/og-image-1200x630.webp (XX.X KB)`. Tamanho típico esperado: 20-50KB.

- [ ] **Step 5: Validar dimensões**

```bash
node -e "import('sharp').then(s => s.default('public/og-image-1200x630.webp').metadata().then(m => console.log(m.width, m.height, m.format)))"
```

Esperado: `1200 630 webp`.

- [ ] **Step 6: Commit**

```bash
git add scripts/generate-og-image.mjs public/og-image-1200x630.webp package.json package-lock.json
git commit -m "feat(seo): adiciona imagem Open Graph 1200x630 e script de geração

Imagem WebP gerada a partir de SVG inline via sharp. Atende ao
requisito do Twitter summary_large_image (>=1200x600) que estava
quebrado por apontar para android-chrome-512x512.webp.

Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>"
```

```json:metadata
{"files": ["scripts/generate-og-image.mjs", "public/og-image-1200x630.webp", "package.json"], "verifyCommand": "npm run og:generate", "acceptanceCriteria": ["sharp em devDependencies", "script og:generate funciona", "arquivo 1200x630 webp existe"]}
```

---

### Task 8: Atualizar referências de `og:image` em `root.tsx` e `calculator-seo.ts`

**Goal:** Trocar referência de `android-chrome-512x512.webp` para `og-image-1200x630.webp` em todos os meta tags `og:image` e `twitter:image`, e atualizar `og:image:width`/`height` de 512 para 1200/630.

**Files:**
- Modify: `app/root.tsx` — ~linhas 132-156 (meta tags og:image e twitter:image)
- Modify: `app/lib/calculator-seo.ts` — função `generateCalculatorMeta`, defaults de `og:image` (~linha 437, 453)

**Acceptance Criteria:**
- [ ] `app/root.tsx` aponta `og:image` para `https://www.calculadoraonlinebr.com.br/og-image-1200x630.webp`.
- [ ] `og:image:width` é `1200` e `og:image:height` é `630` em `root.tsx`.
- [ ] `twitter:image` em `root.tsx` aponta para o novo arquivo.
- [ ] Default de `og:image` em `generateCalculatorMeta` (calculator-seo.ts) é `${APP_URL}/og-image-1200x630.webp` em vez de `${APP_URL}/android-chrome-512x512.webp`.
- [ ] `og:image:width` em calculator-seo.ts é `"1200"`, `og:image:height` é `"630"` (ou removidos — não estão sendo enviados como meta separados ali, mas verifique).

**Verify:**
1. `npm run typecheck` → 0 errors.
2. `grep -c "android-chrome-512x512" app/root.tsx app/lib/calculator-seo.ts` → 0 ou só ocorrências NÃO relacionadas a OG (ex: ainda como PWA icon em `links`).
3. `npm run dev`, View Source em homepage → `<meta property="og:image" content=".../og-image-1200x630.webp" />`.
4. Validador Twitter Card: pegar URL de produção depois do deploy e testar em [cards-dev.twitter.com/validator](https://cards-dev.twitter.com/validator).

**Steps:**

- [ ] **Step 1: Atualizar `app/root.tsx`**

Localizar linha ~132:

```tsx
    {
      property: "og:image",
      content: "https://www.calculadoraonlinebr.com.br/android-chrome-512x512.webp",
    },
    { property: "og:image:width", content: "512" },
    { property: "og:image:height", content: "512" },
```

Substituir por:

```tsx
    {
      property: "og:image",
      content: "https://www.calculadoraonlinebr.com.br/og-image-1200x630.webp",
    },
    { property: "og:image:width", content: "1200" },
    { property: "og:image:height", content: "630" },
```

E localizar linha ~155:

```tsx
    {
      name: "twitter:image",
      content: "https://www.calculadoraonlinebr.com.br/android-chrome-512x512.webp",
    },
```

Substituir por:

```tsx
    {
      name: "twitter:image",
      content: "https://www.calculadoraonlinebr.com.br/og-image-1200x630.webp",
    },
```

(NÃO mudar outras referências a `android-chrome-*` que são para PWA icons em `links` — esses devem permanecer.)

- [ ] **Step 2: Atualizar `app/lib/calculator-seo.ts`**

Localizar a função `generateCalculatorMeta` (~linha 411). Encontrar o default da imagem (~linha 437):

```ts
    {
      property: "og:image",
      content: seoData.ogImage || `${APP_URL}/android-chrome-512x512.webp`,
    },
    { property: "og:image:width", content: "512" },
    { property: "og:image:height", content: "512" },
```

Substituir por:

```ts
    {
      property: "og:image",
      content: seoData.ogImage || `${APP_URL}/og-image-1200x630.webp`,
    },
    { property: "og:image:width", content: "1200" },
    { property: "og:image:height", content: "630" },
```

E ~linha 453:

```ts
    {
      name: "twitter:image",
      content: seoData.ogImage || `${APP_URL}/android-chrome-512x512.webp`,
    },
```

Por:

```ts
    {
      name: "twitter:image",
      content: seoData.ogImage || `${APP_URL}/og-image-1200x630.webp`,
    },
```

- [ ] **Step 3: Verificar nenhuma referência OG remanescente**

```bash
grep -n "android-chrome-512x512" app/root.tsx app/lib/calculator-seo.ts
```

Esperado: nenhuma linha listada (todas que sobraram são em `app/root.tsx` para `links` de PWA — verificar manualmente que não são OG). Se a `og:image:alt` em `root.tsx` (~linha 138) menciona o nome do arquivo, deixar — é só o alt text.

- [ ] **Step 4: Validar e commit**

```bash
npm run typecheck
npm run lint
git add app/root.tsx app/lib/calculator-seo.ts
git commit -m "fix(seo): atualiza og:image para usar nova imagem 1200x630

Twitter card summary_large_image exige >=1200x600. Estávamos apontando
para android-chrome-512x512.webp (icon PWA), o que quebrava o preview.

Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>"
```

```json:metadata
{"files": ["app/root.tsx", "app/lib/calculator-seo.ts"], "verifyCommand": "npm run typecheck && npm run lint", "acceptanceCriteria": ["og:image em root.tsx aponta para og-image-1200x630.webp", "og:image:width 1200, height 630", "twitter:image atualizado", "default em calculator-seo atualizado"]}
```

---

### Task 9: Injetar `window.__ENV` em `root.tsx` e corrigir `isGAEnabled`

**Goal:** Tornar `process.env.NODE_ENV` confiável no browser, expondo-o via `window.__ENV` injetado no HTML antes do hydrate. Atualizar `isGAEnabled` em `google-analytics.ts` para usar essa fonte.

**Files:**
- Modify: `app/root.tsx` — adicionar `<script>` injetando `window.__ENV` antes de `<Scripts />`
- Modify: `app/lib/google-analytics.ts` — refatorar `isGAEnabled` e `isGAActive` para usar `window.__ENV`

**Acceptance Criteria:**
- [ ] `app/root.tsx` injeta `window.__ENV` com `NODE_ENV`, `VITE_GA_ID`, `VITE_CLOUDFLARE_TOKEN`, `VITE_ADSENSE_CLIENT` via `<script dangerouslySetInnerHTML>` ANTES de `<Scripts />`.
- [ ] `isGAEnabled()` em `google-analytics.ts` lê `window.__ENV?.NODE_ENV` em vez de `process.env.NODE_ENV` no contexto cliente.
- [ ] `GA_TRACKING_ID` continua sendo derivado de `window.__ENV?.VITE_GA_ID` (já é, mas reconfirmar).
- [ ] Em DevTools de produção, `window.__ENV.NODE_ENV === 'production'` retorna `true`.

**Verify:**
1. `npm run typecheck` → 0 errors.
2. `npm run dev`, abrir DevTools Console em qualquer página, digitar `window.__ENV` → retorna objeto com `NODE_ENV: "development"` (porque rodando dev), `VITE_GA_ID`, etc.
3. Mesmo console: `window.__ENV.NODE_ENV` → string `"development"`.
4. Em produção (após deploy), `window.__ENV.NODE_ENV === 'production'` deve ser `true`.

**Steps:**

- [ ] **Step 1: Adicionar script de injeção em `app/root.tsx`**

Procurar onde `<Meta />` e `<Links />` são renderizados (já existe ~linha 207). Adicionar logo APÓS `<Meta />` e `<Links />` (e antes do `</head>` ou início do `<body>`) — local correto: dentro do `<head>`, logo após o bloco JSON-LD existente (~linha 242). 

Adicionar este bloco:

```tsx
{/* Inject __ENV for client-side feature flags */}
<script
  dangerouslySetInnerHTML={{
    __html: `window.__ENV = ${JSON.stringify(data?.ENV ?? {})};`,
  }}
/>
```

Esse script tem que rodar ANTES de `<Scripts />` (que carrega bundle Remix) para que `window.__ENV` esteja disponível quando o JS principal hidratar. Posição ideal: dentro do `<head>` ou logo no início do `<body>`. Como `<head>` já tem o JSON-LD inline, colocar lá faz sentido.

- [ ] **Step 2: Refatorar `isGAEnabled` em `app/lib/google-analytics.ts`**

Localizar a função (linha 42-49). Substituir:

```ts
export const isGAEnabled = (): boolean => {
  return (
    process.env.NODE_ENV === 'production' &&
    Boolean(GA_TRACKING_ID) &&
    GA_TRACKING_ID.startsWith('G-') &&
    hasAnalyticsConsent()
  );
};
```

Por:

```ts
export const isGAEnabled = (): boolean => {
  if (typeof window === 'undefined') return false;
  const env = (window as any).__ENV;
  const isProduction = env?.NODE_ENV === 'production';
  return (
    isProduction &&
    Boolean(GA_TRACKING_ID) &&
    GA_TRACKING_ID.startsWith('G-') &&
    hasAnalyticsConsent()
  );
};
```

- [ ] **Step 3: Conferir que `GA_TRACKING_ID` usa `window.__ENV`**

Linha 24-26 atual:

```ts
export const GA_TRACKING_ID = typeof window !== 'undefined' 
  ? (window as any).__ENV?.VITE_GA_ID 
  : process.env.VITE_GA_ID;
```

Já lê de `window.__ENV`. OK, sem mudança. Mas atenção: como `GA_TRACKING_ID` é avaliado no tempo de import (top-level), e o script injetado roda DEPOIS de Remix hidratar... pode haver race. Vamos transformar em getter:

```ts
function getGATrackingId(): string | undefined {
  if (typeof window === 'undefined') return process.env.VITE_GA_ID;
  return (window as any).__ENV?.VITE_GA_ID;
}

export const GA_TRACKING_ID = getGATrackingId();
```

Hmm, mas como a constante é exportada, isso ainda é avaliado uma vez no import. Solução melhor: tornar `GA_TRACKING_ID` um getter via Proxy ou função. **Mais simples ainda**: como script injetado roda ANTES do bundle (porque é dentro do `<head>`), no momento que `google-analytics.ts` é importado pelo bundle, `window.__ENV` já existe. Posição do script no head garante isso. Vou deixar como está.

Para reforçar a confiabilidade, em `isGAEnabled` reavaliamos `GA_TRACKING_ID` dinamicamente em vez de usar a constante:

```ts
export const isGAEnabled = (): boolean => {
  if (typeof window === 'undefined') return false;
  const env = (window as any).__ENV;
  const isProduction = env?.NODE_ENV === 'production';
  const gaId = env?.VITE_GA_ID;
  return (
    isProduction &&
    Boolean(gaId) &&
    typeof gaId === 'string' &&
    gaId.startsWith('G-') &&
    hasAnalyticsConsent()
  );
};
```

E `isGAActive` igual mas sem `hasAnalyticsConsent()`:

```ts
export const isGAActive = (): boolean => {
  if (typeof window === 'undefined') return false;
  const gaId = (window as any).__ENV?.VITE_GA_ID;
  return Boolean(window.gtag) && Boolean(gaId);
};
```

- [ ] **Step 4: Validar typecheck**

```bash
npm run typecheck
```

- [ ] **Step 5: Testar manualmente injection**

```bash
npm run dev
```

Abrir `http://localhost:3000`, DevTools Console:

```js
window.__ENV
```

Deve retornar objeto com `NODE_ENV: "development"` (dev mode), `VITE_GA_ID` (se setada no `.env`), etc.

View Source: procurar por `window.__ENV =` no HTML — deve aparecer dentro do `<head>`.

- [ ] **Step 6: Commit**

```bash
git add app/root.tsx app/lib/google-analytics.ts
git commit -m "fix(analytics): injeta window.__ENV no head e corrige isGAEnabled

isGAEnabled testava process.env.NODE_ENV no browser, que retorna
undefined no bundle Vite — GA4 nunca inicializava em produção.
Agora lê de window.__ENV injetado pelo root loader.

Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>"
```

```json:metadata
{"files": ["app/root.tsx", "app/lib/google-analytics.ts"], "verifyCommand": "npm run typecheck", "acceptanceCriteria": ["window.__ENV injetado no head", "isGAEnabled lê de window.__ENV", "isGAActive lê de window.__ENV"]}
```

---

### Task 10: Migrar `analytics-provider.tsx` para GA4 + mapeamento dinâmico de categorias

**Goal:** `analytics-provider.tsx` atualmente dispara eventos via `@vercel/analytics` (`track()`). Migrar para usar `trackEvent` de `google-analytics.ts`. Pageviews automáticos do Vercel `<Analytics />` ficam intactos; pageviews manuais aqui são removidos (evita duplicação com Vercel). Mapeamento de categorias passa a vir de `CATEGORIES` em `constants.ts`.

**Files:**
- Modify: `app/lib/analytics-provider.tsx` — refator completo do componente

**Acceptance Criteria:**
- [ ] Arquivo NÃO importa de `@vercel/analytics`.
- [ ] Importa `trackEvent` de `~/lib/google-analytics`.
- [ ] Importa `CATEGORIES` de `~/lib/constants` e gera `categoryNames` dinamicamente.
- [ ] Não dispara `track("page_view", ...)` no `useEffect` (Vercel já faz isso automaticamente).
- [ ] `trackCalculatorUsed`, `trackCalculatorResult`, `trackFeatureUsed`, `trackError` agora delegam para GA4 via `trackEvent`.
- [ ] Interface pública do hook (`useGlobalAnalytics`) inalterada — componentes que consomem não precisam mudar.

**Verify:**
1. `npm run typecheck` → 0 errors.
2. `grep -c "@vercel/analytics" app/lib/analytics-provider.tsx` → 0.
3. `grep -c "from \"~/lib/google-analytics\"" app/lib/analytics-provider.tsx` → 1 (ou mais).
4. `npm run dev`, abrir uma calculadora, simular evento (clicar botão calcular), DevTools Console deve mostrar log do GA (em dev mode é logado via `console.log('[GA] Event tracked with attribution:', ...)`).

**Steps:**

- [ ] **Step 1: Reescrever `app/lib/analytics-provider.tsx`**

Substituir conteúdo todo por:

```tsx
import React, { createContext, useContext, ReactNode } from "react";
import { useLocation } from "@remix-run/react";
import { trackEvent } from "~/lib/google-analytics";
import { CATEGORIES } from "~/lib/constants";

interface AnalyticsContextType {
  trackEvent: (event: string, properties?: Record<string, any>) => void;
  trackCalculatorUsed: (calculatorType: string, category: string) => void;
  trackCalculatorResult: (calculatorType: string, success: boolean, duration?: number) => void;
  trackFeatureUsed: (feature: string) => void;
  trackError: (error: string, context?: string) => void;
}

const AnalyticsContext = createContext<AnalyticsContextType | null>(null);

export const useGlobalAnalytics = () => {
  const context = useContext(AnalyticsContext);
  if (!context) {
    throw new Error("useGlobalAnalytics must be used within AnalyticsProvider");
  }
  return context;
};

const categoryNames: Record<string, string> = Object.fromEntries(
  CATEGORIES.map((c) => [c.id, c.name]),
);

function extractCalculatorInfo(pathname: string) {
  const pathParts = pathname.split("/");
  if (pathParts[1] === "calculadoras" && pathParts.length >= 4) {
    return {
      category: pathParts[2],
      calculator: pathParts[3],
      isCalculatorPage: true,
    };
  }
  return { category: null, calculator: null, isCalculatorPage: false };
}

interface AnalyticsProviderProps {
  children: ReactNode;
}

export function AnalyticsProvider({ children }: AnalyticsProviderProps) {
  const location = useLocation();

  // Note: page_view tracking is NOT done here.
  // - Vercel Analytics' <Analytics /> in root.tsx fires pageviews automatically.
  // - useGoogleAnalytics() hook handles GA4 manual page_view tracking with debounce.
  // Adding track("page_view") here would duplicate events.

  const trackEventWithContext = (event: string, properties: Record<string, any> = {}) => {
    const { category, calculator } = extractCalculatorInfo(location.pathname);
    trackEvent(event, {
      event_category: "interaction",
      event_label: event,
      custom_parameters: {
        ...properties,
        current_path: location.pathname,
        current_category: category,
        current_calculator: calculator,
        timestamp: new Date().toISOString(),
      },
    });
  };

  const trackCalculatorUsed = (calculatorType: string, category: string) => {
    trackEvent("calculator_used", {
      event_category: "calculator",
      event_label: calculatorType,
      custom_parameters: {
        calculator_type: calculatorType,
        category: category,
        category_name: categoryNames[category] || category,
        path: location.pathname,
        locale: "pt-BR",
      },
    });
  };

  const trackCalculatorResult = (
    calculatorType: string,
    success: boolean,
    duration?: number,
  ) => {
    trackEvent("calculator_result", {
      event_category: "calculator",
      event_label: calculatorType,
      value: duration,
      custom_parameters: {
        calculator_type: calculatorType,
        success: success,
        calculation_time_ms: duration || 0,
        path: location.pathname,
      },
    });
  };

  const trackFeatureUsed = (feature: string) => {
    const { category, calculator } = extractCalculatorInfo(location.pathname);
    trackEvent("feature_used", {
      event_category: "feature",
      event_label: feature,
      custom_parameters: {
        feature_name: feature,
        calculator_type: calculator,
        category: category,
        path: location.pathname,
      },
    });
  };

  const trackErrorEvent = (error: string, context?: string) => {
    const { category, calculator } = extractCalculatorInfo(location.pathname);
    trackEvent("app_error", {
      event_category: "error",
      event_label: context || "unknown",
      custom_parameters: {
        error_message: error,
        error_context: context || "unknown",
        calculator_type: calculator,
        category: category,
        path: location.pathname,
      },
    });
  };

  const contextValue: AnalyticsContextType = {
    trackEvent: trackEventWithContext,
    trackCalculatorUsed,
    trackCalculatorResult,
    trackFeatureUsed,
    trackError: trackErrorEvent,
  };

  return (
    <AnalyticsContext.Provider value={contextValue}>{children}</AnalyticsContext.Provider>
  );
}
```

Mudanças principais:
- Import de `@vercel/analytics` removido.
- Import de `trackEvent` de `google-analytics.ts` e `CATEGORIES` de `constants.ts`.
- `categoryNames` derivado dinamicamente.
- `useEffect` de page_view REMOVIDO (era duplicação).
- Cada função usa `trackEvent` em vez de `track`.

- [ ] **Step 2: Validar typecheck**

```bash
npm run typecheck
```

Se quebrar em algum lugar que consumia `useGlobalAnalytics` esperando funções diferentes, atualizar. A interface foi mantida idêntica.

- [ ] **Step 3: Testar manualmente**

```bash
npm run dev
```

Abrir uma calculadora, clicar em um botão de cálculo. Em DevTools Console (modo dev), aparece log `[GA] Event tracked with attribution: {...}` quando GA está configurado.

Se GA não está configurado em dev (sem `VITE_GA_ID`), os logs não aparecem — mas a função `trackEvent` faz no-op via guard `if (!isGAEnabled()) return;`. Isso é OK.

- [ ] **Step 4: Commit**

```bash
git add app/lib/analytics-provider.tsx
git commit -m "refactor(analytics): migra analytics-provider de Vercel para GA4

GA4 vira fonte única para eventos custom. Vercel Analytics fica
apenas com pageviews automáticos (via <Analytics /> no root.tsx)
e Speed Insights. Pageview manual no provider removido para evitar
duplicação com Vercel.

Mapeamento de categorias agora deriva de CATEGORIES (constants.ts)
em vez de hardcoded — corrige bug de 4/8 categorias mapeadas.

Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>"
```

```json:metadata
{"files": ["app/lib/analytics-provider.tsx"], "verifyCommand": "npm run typecheck", "acceptanceCriteria": ["@vercel/analytics removido", "trackEvent importado de google-analytics", "CATEGORIES importado de constants", "useEffect page_view removido"]}
```

---

### Task 11: Migrar `analytics.ts` (legacy) e `useAnalytics.ts` para GA4

**Goal:** O arquivo `app/lib/analytics.ts` ainda exporta `trackCalculatorUsed`, `trackResultCalculated`, etc. baseados em `@vercel/analytics`. Convertê-lo em camada de compatibilidade que delega para `google-analytics.ts`. Atualizar `app/hooks/useAnalytics.ts` para usar a nova implementação (não precisa mudar muito — só re-checar).

**Files:**
- Modify: `app/lib/analytics.ts` — reescrever funções para delegar a GA4
- Modify: `app/hooks/useAnalytics.ts` — verificar/ajustar (provavelmente nada a mudar se interface for igual)

**Acceptance Criteria:**
- [ ] `app/lib/analytics.ts` NÃO importa de `@vercel/analytics`.
- [ ] Funções `trackCalculatorUsed`, `trackResultCalculated`, `trackCategoryViewed`, `trackFeatureClicked`, `trackError`, `trackUserAction`, `trackBrazilianMarketMetrics` delegam para `trackEvent` de `google-analytics.ts`.
- [ ] Interface pública (export names, signatures) inalterada — `useAnalytics.ts` continua funcionando sem mudanças.
- [ ] `useAnalytics.ts` typecheck passa sem erro.

**Verify:**
1. `npm run typecheck` → 0 errors.
2. `grep -c "@vercel/analytics" app/lib/analytics.ts` → 0.
3. `grep -c "from \"~/lib/google-analytics\"" app/lib/analytics.ts` → 1.

**Steps:**

- [ ] **Step 1: Reescrever `app/lib/analytics.ts`**

Substituir todo o conteúdo por:

```ts
/**
 * Camada de compatibilidade para analytics legado.
 *
 * @deprecated Prefira importar `trackEvent` diretamente de `~/lib/google-analytics`
 * ou usar o hook `useGlobalAnalytics()` do `analytics-provider`.
 *
 * Esta camada existe apenas para manter compatibilidade com chamadas
 * antigas espalhadas pelo código. Internamente delega tudo para GA4.
 */

import { trackEvent } from "~/lib/google-analytics";

export type AnalyticsEvent =
  | "calculator_used"
  | "result_calculated"
  | "category_viewed"
  | "page_view"
  | "error_occurred"
  | "feature_clicked";

export interface CalculatorUsedEvent {
  calculator_type: string;
  category: string;
  user_inputs?: Record<string, any>;
}

export interface ResultCalculatedEvent {
  calculator_type: string;
  calculation_time_ms: number;
  success: boolean;
}

export interface CategoryViewedEvent {
  category_name: string;
  calculators_count: number;
}

export interface FeatureClickedEvent {
  feature_name: string;
  page_location: string;
}

export const trackCalculatorUsed = (data: CalculatorUsedEvent) => {
  trackEvent("calculator_used", {
    event_category: "calculator",
    event_label: data.calculator_type,
    custom_parameters: {
      calculator_type: data.calculator_type,
      category: data.category,
      has_inputs: !!data.user_inputs,
    },
  });
};

export const trackResultCalculated = (data: ResultCalculatedEvent) => {
  trackEvent("result_calculated", {
    event_category: "calculator",
    event_label: data.calculator_type,
    value: data.calculation_time_ms,
    custom_parameters: {
      calculator_type: data.calculator_type,
      duration: data.calculation_time_ms,
      success: data.success,
    },
  });
};

export const trackCategoryViewed = (data: CategoryViewedEvent) => {
  trackEvent("category_viewed", {
    event_category: "navigation",
    event_label: data.category_name,
    value: data.calculators_count,
    custom_parameters: {
      category: data.category_name,
      calculators_count: data.calculators_count,
    },
  });
};

export const trackFeatureClicked = (data: FeatureClickedEvent) => {
  trackEvent("feature_clicked", {
    event_category: "feature",
    event_label: data.feature_name,
    custom_parameters: {
      feature: data.feature_name,
      location: data.page_location,
    },
  });
};

export const trackError = (error: string, context?: string) => {
  trackEvent("error_occurred", {
    event_category: "error",
    event_label: error,
    custom_parameters: {
      error_type: error,
      context: context || "unknown",
    },
  });
};

export const trackUserAction = (action: string, properties?: Record<string, any>) => {
  const safeProperties = properties
    ? Object.fromEntries(
        Object.entries(properties).filter(
          ([_, value]) =>
            typeof value === "string" || typeof value === "number" || typeof value === "boolean",
        ),
      )
    : {};
  trackEvent(action, {
    event_category: "user_action",
    custom_parameters: safeProperties,
  });
};

export const trackBrazilianMarketMetrics = (data: {
  calculator_type: string;
  regulation_type?: "CLT" | "INSS" | "IRRF" | "FGTS";
  currency_used?: boolean;
}) => {
  trackEvent("brazilian_calculator_used", {
    event_category: "brazilian_market",
    event_label: data.calculator_type,
    custom_parameters: {
      calculator: data.calculator_type,
      regulation: data.regulation_type || "none",
      uses_currency: data.currency_used || false,
      locale: "pt-BR",
    },
  });
};
```

- [ ] **Step 2: Verificar `app/hooks/useAnalytics.ts`**

O hook importa de `~/lib/analytics` (interface mantida). Não precisa de mudança. Validar:

```bash
npm run typecheck
```

Se houver erro, é provavelmente em algum tipo de `useAnalytics.ts`. Investigar e ajustar.

- [ ] **Step 3: Commit**

```bash
git add app/lib/analytics.ts
git commit -m "refactor(analytics): converte analytics.ts em camada de compat sobre GA4

Funções legadas (trackCalculatorUsed, trackResultCalculated, etc.)
agora delegam para trackEvent do google-analytics em vez de
@vercel/analytics. Mantém interface pública para não quebrar
chamadas existentes; marcado como @deprecated.

Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>"
```

```json:metadata
{"files": ["app/lib/analytics.ts"], "verifyCommand": "npm run typecheck", "acceptanceCriteria": ["@vercel/analytics removido de analytics.ts", "todas funções legadas delegam para GA4", "interface pública preservada"]}
```

---

### Task 12: Refatorar `IndexNow.submitMainPages` para iterar `CATEGORIES`

**Goal:** Substituir array hardcoded de 4 categorias em `submitMainPages()` por iteração dinâmica sobre `CATEGORIES` (8 categorias).

**Files:**
- Modify: `app/lib/indexnow.ts` — método `submitMainPages` (~linha 213)

**Acceptance Criteria:**
- [ ] `submitMainPages()` retorna lista com homepage, `/calculadoras`, todas as 8 categorias de `CATEGORIES`, e 3 páginas estáticas.
- [ ] Não há mais strings hardcoded como `/calculadoras/saude` literais no método.
- [ ] Total de URLs submetidas: `2 + 8 + 3 = 13`.

**Verify:**
1. `npm run typecheck` → 0 errors.
2. Leitura do código: array contém `...CATEGORIES.map(c => ...)` em vez de strings literais.
3. Manual: `npm run indexnow:main` (se configurado) — output mostra 13 URLs submetidas (mas evitar enviar para produção sem necessidade; só ler o código).

**Steps:**

- [ ] **Step 1: Adicionar import de `CATEGORIES`**

No topo de `app/lib/indexnow.ts`, adicionar (ou ajustar imports existentes):

```ts
import { CATEGORIES } from "~/lib/constants";
```

- [ ] **Step 2: Refatorar `submitMainPages`**

Localizar o método (~linha 213-228). Substituir corpo por:

```ts
  async submitMainPages(): Promise<IndexNowSubmissionResponse> {
    const baseUrl = `https://${this.host}`;
    const urls = [
      baseUrl,
      `${baseUrl}/calculadoras`,
      ...CATEGORIES.map((c) => `${baseUrl}${c.path}`),
      `${baseUrl}/sobre`,
      `${baseUrl}/privacidade`,
      `${baseUrl}/termos-de-uso`,
    ];
    return this.submitUrls(urls);
  }
```

- [ ] **Step 3: Validar e commit**

```bash
npm run typecheck
git add app/lib/indexnow.ts
git commit -m "fix(seo): IndexNow.submitMainPages itera CATEGORIES em vez de hardcoded

Antes enviava só 4 categorias hardcoded (saude, financas, matematica,
trabalhista) ignorando as 4 mais recentes (ferramentas, astrologia,
datas, loterias). Agora deriva de CATEGORIES.

Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>"
```

```json:metadata
{"files": ["app/lib/indexnow.ts"], "verifyCommand": "npm run typecheck", "acceptanceCriteria": ["CATEGORIES importado", "submitMainPages itera dinamicamente", "13 URLs no array final"]}
```

---

### Task 13: Validação final — typecheck, lint, sitemap, Lighthouse

**Goal:** Auditoria final antes do merge. Confirmar que todas as alterações resultam em build limpo e que critérios de aceitação da Fase 1 batem.

**Files:** Nenhum modificado (só validação).

**Acceptance Criteria:**
- [ ] `npm run typecheck` → exit 0.
- [ ] `npm run lint` → exit 0.
- [ ] `npm run build` → completa sem erro.
- [ ] `npm run dev` + `curl /sitemap.xml` → XML válido com 78 `<url>`.
- [ ] View Source em cada uma das 8 categorias (1 calc por categoria) mostra title customizado (não genérico).
- [ ] `grep -c "aggregateRating" app/lib/structured-data.ts` → 0.
- [ ] Lighthouse SEO score ≥ 95 em amostra de 8 calculadoras (uma por categoria) — registrar scores em comentário no PR.

**Verify:** Comandos listados nos Steps abaixo.

**Steps:**

- [ ] **Step 1: TypeCheck + Lint + Build**

```bash
npm run typecheck && npm run lint && npm run build
```

Todos devem passar. Se algum falhar, voltar à task anterior correspondente.

- [ ] **Step 2: Auditoria de sitemap e SEO data**

```bash
npm run dev
```

Em outro terminal:

```bash
# Sitemap completo
curl -s http://localhost:3000/sitemap.xml | head -5
curl -s http://localhost:3000/sitemap.xml | grep -c "<url>"
# Esperado: header XML + contagem >= 78
```

Acessar manualmente cada uma das 8 rotas seguintes em browser e verificar via View Source que `<title>` é customizado (não "CalculadoraOnlineBR - Calculadoras Gratuitas"):

- http://localhost:3000/calculadoras/saude/imc
- http://localhost:3000/calculadoras/financas/juros-compostos
- http://localhost:3000/calculadoras/matematica/porcentagem
- http://localhost:3000/calculadoras/trabalhista/salario-liquido
- http://localhost:3000/calculadoras/ferramentas/gerador-cpf
- http://localhost:3000/calculadoras/astrologia/signo
- http://localhost:3000/calculadoras/datas/idade-exata
- http://localhost:3000/calculadoras/loterias/gerador-mega-sena

Cada uma deve ter título único contendo "2025" e "CalculadoraOnlineBR".

- [ ] **Step 3: Verificar `aggregateRating` removido**

```bash
grep -c "aggregateRating" app/lib/structured-data.ts
# Esperado: 0
```

E em uma calculadora qualquer (`curl`):

```bash
curl -s http://localhost:3000/calculadoras/saude/imc | grep -A2 "SoftwareApplication" | grep -c aggregateRating
# Esperado: 0
```

- [ ] **Step 4: Lighthouse audit (manual)**

Se Chrome instalado: abrir DevTools → Lighthouse tab → marcar "SEO" → "Analyze page load" em cada uma das 8 URLs acima. Registrar scores.

Critério: cada amostra ≥ 95 em SEO.

Alternativa via CLI (se instalado): `npx lighthouse http://localhost:3000/calculadoras/saude/imc --only-categories=seo --quiet`.

Se algum cair abaixo de 95, investigar a página específica (provavelmente algo no `meta` ou JSON-LD).

- [ ] **Step 5: Verificar GA4 inicializa (smoke test)**

```bash
npm run build && npm start
```

Visitar `http://localhost:3000` (produção), DevTools Console:

```js
window.__ENV  // deve ter NODE_ENV: "production"
window.gtag  // deve ser função (não undefined)
```

(Em local pode falhar se `VITE_GA_ID` não estiver em `.env` — OK, validar em deploy preview Vercel.)

- [ ] **Step 6: Pós-deploy — submeter sitemap no Search Console**

Após o merge e deploy em produção:

1. Acessar Google Search Console → propriedade calculadoraonlinebr.com.br.
2. Sidebar → Sitemaps.
3. Adicionar `https://www.calculadoraonlinebr.com.br/sitemap.xml`.
4. Submit.
5. Aguardar status "Success" (geralmente <1h).
6. Acessar Twitter Card Validator [cards-dev.twitter.com/validator](https://cards-dev.twitter.com/validator), testar URL homepage e uma calculadora — preview deve mostrar imagem 1200×630.

Este step é manual e pós-deploy. Documentar conclusão no PR.

- [ ] **Step 7: Não fazer commit dessa task** (é só validação).

```json:metadata
{"files": [], "verifyCommand": "npm run typecheck && npm run lint && npm run build", "acceptanceCriteria": ["typecheck passa", "lint passa", "build passa", "sitemap retorna 78 URLs", "8 calculadoras amostradas com title custom", "aggregateRating removido", "Lighthouse SEO >= 95 em amostra", "GA4 inicializa em produção", "sitemap submetido no GSC após deploy"]}
```

---

## Self-Review

Verificação do plano contra o spec:

**Spec coverage:**
- ✅ Bug crítico #1 (sitemap quebrado) → Task 0
- ✅ Bug crítico #2 (CALCULATOR_SEO_DATA incompleto) → Tasks 1-5
- ✅ Bug crítico #3 (aggregateRating fictício) → Task 6
- ✅ Médio #4 (GA4 não inicializa em produção) → Task 9
- ✅ Médio #5 (og:image inadequada) → Tasks 7-8
- ✅ Médio #6 (tracking duplicado) → Tasks 10-11
- ✅ Médio #7 (mapeamento categorias incompleto) → Task 10
- ✅ Médio #8 (IndexNow hardcoded) → Task 12
- ✅ Baixo #9 (`app/utils/seo.ts` referenciado) → confirmado existente em exploration, não precisa de task.
- ✅ Validação final + Lighthouse → Task 13
- ⚠️ Anexo Fase 2 (auth `/admin`, credenciais Google APIs) → **deliberadamente fora de escopo**, mencionado no spec mas não no plano (Fase 2).
- ⚠️ Achado de segurança `/admin/redirects` desprotegido → mencionado no spec mas **não corrigido** nesta Fase 1 (será na Fase 2 quando se for criar `/admin/seo`).

**Placeholder scan:**
- Sem "TBD"/"TODO" inline.
- "validate manualmente" tem comandos exatos.
- Verificações via `grep` têm padrões específicos.

**Type/method consistency:**
- `trackEvent(eventName, parameters)` — assinatura em `google-analytics.ts` (linha 261): `(eventName: string, parameters: { event_category?, event_label?, value?, custom_parameters? })`. Plano usa esta assinatura consistentemente nas Tasks 10, 11.
- `CATEGORIES` import path: `~/lib/constants` em todos os arquivos. Consistente.
- `CALCULATOR_SEO_DATA` indexado por `calc.id` em Task 0 (sitemap), nas Tasks 1-5 ao popular o map.

**Não-objetivos respeitados:**
- Dashboard `/admin/seo` não implementado.
- Sistema real de reviews não implementado.
- OG dinâmico per-calculadora não implementado (só estático).
- Migração de Vercel para outro provider de Web Vitals não feita.

---

## User-Gate Detection

Nenhuma task carrega user-gate (nenhum match nas regras: ausência de Nouns, Scope ou Proof patterns no brief do usuário). O brief mais próximo seria "revise a implementação de ga e do search console" — "revise" é um Verbo, mas sem Scope/Proof companion. Sem flag de user-gate, sem banner adicional.
