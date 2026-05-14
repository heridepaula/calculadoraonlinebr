# Melhorias de SEO — Fase 1: Correção + Consolidação de Analytics

**Data:** 2026-05-14
**Autor:** Heride Paula (com assistência IA)
**Status:** Design aprovado, aguardando plano de implementação

## Contexto

Auditoria do projeto identificou três bugs críticos e cinco problemas médios de SEO, mais um achado de segurança (rota `/admin` desprotegida) — Vercel Analytics, GA4 e Cloudflare rodam em paralelo com responsabilidades sobrepostas. Esta Fase 1 corrige os bugs e consolida o tracking para que a Fase 2 (dashboard administrativo de métricas SEO consumindo GA4 Data API e Search Console API) possa ser construída sobre dados confiáveis.

A Fase 2 não está em escopo aqui — é brainstormada em sessão futura. Esta spec inclui apenas um anexo arquitetural de preparação.

## Problemas a resolver

### Críticos

1. **Sitemap quebrado.** `app/routes/sitemap[.]xml.tsx` contém o conteúdo da página de Política de Privacidade em vez de gerar XML. O `robots.txt` aponta para `/sitemap.xml`, então o Google recebe HTML quando solicita o sitemap. Resultado: descoberta de URLs depende só de crawl natural, sem a "trilha" do sitemap.

2. **`CALCULATOR_SEO_DATA` incompleto.** Existem ~66 calculadoras em `app/routes/calculadoras.*.tsx`, mas o map em `app/lib/calculator-seo.ts` cobre só ~33. Calculadoras sem entrada caem no `meta` genérico de `root.tsx`, ou seja, todas com o mesmo `<title>` "CalculadoraOnlineBR - Calculadoras Gratuitas" e a mesma description — concorrendo entre si no SERP.

3. **`aggregateRating` fictício em Schema.org.** `app/lib/structured-data.ts` declara `ratingValue: "4.8"` e `ratingCount: "250"` hardcoded em `SoftwareApplication` para todas calculadoras. Viola a [política de Review snippets](https://developers.google.com/search/docs/appearance/structured-data/review-snippet) — risco de manual action e remoção de rich snippets.

### Médios

4. **GA4 pode nunca inicializar em produção.** `isGAEnabled()` em `app/lib/google-analytics.ts:43` checa `process.env.NODE_ENV === 'production'` no contexto do browser. No bundle Vite/Remix, `process.env.NODE_ENV` pode resolver para `undefined` no cliente — GA4 não inicializa e nenhum evento custom é registrado.

5. **`og:image` inadequada para Twitter card.** `root.tsx:133` e `calculator-seo.ts:437` apontam para `android-chrome-512x512.webp` (512×512). O `twitter:card: "summary_large_image"` declarado exige ≥1200×600. Cards do Twitter aparecem quebrados ou sem preview.

6. **Tracking duplicado e fragmentado.** `analytics-provider.tsx` dispara eventos via `@vercel/analytics` (`track()`), enquanto `google-analytics.ts` dispara via `gtag`. Mesmas ações (`calculator_used`, `feature_used`) saem por dois canais com schemas diferentes — relatórios de Vercel Dashboard e GA4 nunca batem.

7. **Mapeamento de categorias incompleto.** `analytics-provider.tsx:45-50` mapeia 4 das 8 categorias existentes (saúde, finanças, matemática, trabalhista). Categorias adicionadas depois — ferramentas, astrologia, datas, loterias — ficam como `undefined` nos eventos.

8. **IndexNow.submitMainPages hardcoded.** `app/lib/indexnow.ts:213-228` envia só 4 categorias para indexação, ignorando as 4 mais recentes.

### Baixos

9. `app/utils/seo.ts` referenciado por `calculator-seo.ts` precisa ser validado (importa `generateStructuredData`, conferir que existe).

## Decisões arquiteturais

### Sitemap dinâmico via Remix route

A rota `app/routes/sitemap[.]xml.tsx` será reescrita para retornar `Response` com `Content-Type: application/xml; charset=utf-8` e cache de 1h (`Cache-Control: public, max-age=3600`). Sem componente default. URLs derivadas de `CATEGORIES` e `CALCULATORS` em `app/lib/constants.ts` para evitar drift.

**Priority/changefreq:** quando a calculadora tiver entrada em `CALCULATOR_SEO_DATA`, usa o `priority` e `changeFreq` dela; senão, default `priority: 0.7, changeFreq: "monthly"`.

**lastmod:** `new Date().toISOString().split("T")[0]` (formato `YYYY-MM-DD`) avaliado no momento da requisição. Combinado com `Cache-Control: max-age=3600`, atualiza no máximo uma vez por hora — suficiente para SEO.

**Páginas estáticas incluídas:** `/`, `/sobre`, `/privacidade`, `/termos-de-uso`, `/calculadoras`. As 8 páginas-índice de categoria também entram.

### Search Console: confirmado verificado via DNS

Verificação já feita no nível de domínio via TXT no DNS. Não há ação no código. Spec documenta como achado para auditoria futura.

### GA4 como fonte única para eventos custom

**Vercel Analytics fica responsável apenas por:**
- Pageviews automáticos (componente `<Analytics />` no `root.tsx` já dispara — não chamamos `track()` manualmente para isso).
- Speed Insights (`<SpeedInsights />` — não toco).

**GA4 fica responsável por:**
- Pageviews manuais via `trackPageView()` (com debounce em `useGoogleAnalytics`).
- Todos os eventos custom (`calculator_used`, `calculator_result`, `feature_used`, `error_occurred`, etc.).

**Cloudflare Analytics fica como está** (são pageviews-only privacy-friendly, fonte secundária para sanity check).

Isto significa que `app/lib/analytics-provider.tsx` deixa de chamar `track()` do Vercel para eventos custom. Os hooks que componentes usam (`useAnalytics`, `useGlobalAnalytics`) mantêm a mesma assinatura pública, mas internamente chamam GA4. Componentes não precisam mudar.

### Imagem OG estática

`public/og-image-1200x630.webp` única para o site, com a marca "CalculadoraOnlineBR". OG dinâmico per-calculadora via `@vercel/og` fica como backlog (não Fase 1).

### `aggregateRating` removido sem substituto

Remove e ponto. Sistema real de avaliação dos usuários é projeto separado de produto, não cabe em Fase 1.

## Mudanças por arquivo

### `app/routes/sitemap[.]xml.tsx` — reescrita completa

Estrutura:

```ts
import type { LoaderFunctionArgs } from "@remix-run/node";
import { APP_URL, CATEGORIES, CALCULATORS } from "~/lib/constants";
import { CALCULATOR_SEO_DATA } from "~/lib/calculator-seo";

export const loader = ({ request }: LoaderFunctionArgs) => {
  const lastmod = new Date().toISOString().split("T")[0];
  const urls: Array<{ loc: string; priority: number; changefreq: string; lastmod: string }> = [];

  // Homepage
  urls.push({ loc: APP_URL, priority: 1.0, changefreq: "weekly", lastmod });
  urls.push({ loc: `${APP_URL}/calculadoras`, priority: 0.9, changefreq: "weekly", lastmod });

  // Categories
  for (const cat of CATEGORIES) {
    urls.push({ loc: `${APP_URL}${cat.path}`, priority: 0.9, changefreq: "weekly", lastmod });
  }

  // Calculators
  for (const calc of CALCULATORS) {
    const seo = CALCULATOR_SEO_DATA[calc.id];
    urls.push({
      loc: `${APP_URL}${calc.path}`,
      priority: seo?.priority ?? 0.7,
      changefreq: seo?.changeFreq ?? "monthly",
      lastmod,
    });
  }

  // Static pages
  for (const path of ["/sobre", "/privacidade", "/termos-de-uso"]) {
    urls.push({ loc: `${APP_URL}${path}`, priority: 0.3, changefreq: "yearly", lastmod });
  }

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(u => `  <url>
    <loc>${u.loc}</loc>
    <lastmod>${u.lastmod}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority.toFixed(1)}</priority>
  </url>`).join("\n")}
</urlset>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
};
```

Não exportar `default` nem `meta` — rota é XML pura.

### `app/lib/calculator-seo.ts` — completar `CALCULATOR_SEO_DATA`

Adicionar entradas para as ~33 calculadoras faltantes (lista exata gerada no plano cruzando rotas com map). Categorias afetadas: astrologia (4), datas (5, incluindo mover `diferenca-entre-datas` da seção `ferramentas` errada), ferramentas (~12), loterias (3), matemática (4 novas), trabalhista (3), saúde (1), finanças (1: `renda-fixa-comparativa`).

Padrão a seguir (consistente com entradas existentes):
- `title`: "Calculadora de X 2025 - <benefício/feature> - CalculadoraOnlineBR" (mantém ano "2025" como nas demais — atualização anual é manutenção separada).
- `description`: começa com "★" e foca em benefício único + "GRATUITA".
- `keywords`: 8-15 termos pt-BR, mix de cauda longa.
- `priority`: 0.9 para calculadoras-âncora, 0.7-0.8 para demais.
- `canonicalUrl`: `https://www.calculadoraonlinebr.com.br${calc.path}`.
- `changeFreq`: "monthly" default.

Também corrigir bug existente: entrada `diferenca-entre-datas` está com `canonicalUrl` em `/ferramentas/` mas a rota real é `/datas/diferenca-entre-datas`.

### `app/lib/structured-data.ts` — remover `aggregateRating`

Remover blocos:
- `generateWebsiteStructuredData()`: linha 86-90 (`aggregateRating` em items da `ItemList`).
- `generateCalculatorStructuredData()`: linha 133-139.

Manter `offers`, `applicationCategory`, `author`, `publisher`, `featureList`, `isAccessibleForFree`.

### `app/lib/google-analytics.ts` — corrigir `isGAEnabled`

Substituir o teste de `process.env.NODE_ENV` por consulta a `window.__ENV` (injetado pelo `root.tsx` loader):

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

E garantir que `root.tsx` injeta `__ENV` no HTML antes do hidrate:

```tsx
<script
  dangerouslySetInnerHTML={{
    __html: `window.__ENV = ${JSON.stringify(data.ENV)};`,
  }}
/>
```

(Verificar se já existe — `data.ENV` está exposto no loader, mas a injeção pode estar faltando.)

### `app/lib/analytics-provider.tsx` — refatorar para GA4

Remover importação de `@vercel/analytics`. Substituir `track(...)` por chamadas a `trackEvent(...)` de `google-analytics.ts`. Manter pageview automático do `<Analytics />` mountado no `root.tsx` (não chamar `track("page_view", ...)` aqui — duplica com o que o Vercel já faz nativamente).

Mapeamento de categorias dinâmico:

```ts
import { CATEGORIES } from "~/lib/constants";
const categoryNames: Record<string, string> = Object.fromEntries(
  CATEGORIES.map(c => [c.id, c.name])
);
```

A interface pública (`useGlobalAnalytics()`, `trackCalculatorUsed`, etc.) fica idêntica — só a implementação interna troca de canal. Nenhum componente consumidor precisa mudar.

### `app/lib/analytics.ts` — virar camada de compat

Manter as exports para retro-compatibilidade, mas redirecionar internamente para `google-analytics.ts`. Adicionar comentário `@deprecated` em cada função sugerindo usar `trackEvent` direto.

### `app/lib/indexnow.ts` — `submitMainPages` dinâmica

```ts
async submitMainPages(): Promise<IndexNowSubmissionResponse> {
  const baseUrl = `https://${this.host}`;
  const urls = [
    baseUrl,
    `${baseUrl}/calculadoras`,
    ...CATEGORIES.map(c => `${baseUrl}${c.path}`),
    `${baseUrl}/sobre`,
    `${baseUrl}/privacidade`,
    `${baseUrl}/termos-de-uso`,
  ];
  return this.submitUrls(urls);
}
```

### `app/root.tsx` — `og:image` 1200×630

Atualizar todas as referências `og:image` (linha 133) e `twitter:image` (linha 156) para `/og-image-1200x630.webp`. Atualizar `og:image:width` para 1200 e `og:image:height` para 630.

### `app/lib/calculator-seo.ts` — `og:image` default

Trocar default em `generateCalculatorMeta()` (linha 437, 453) de `android-chrome-512x512.webp` para `og-image-1200x630.webp`. Manter possibilidade de override por calculadora via `seoData.ogImage`.

### `public/og-image-1200x630.webp` — criar

Imagem 1200×630 pixels, formato WebP otimizado (<50KB), conteúdo: logo CalculadoraOnlineBR + texto "Calculadoras Online Gratuitas — Saúde, Finanças, Matemática". Pode ser criada via Figma, Canva, ou ferramenta automatizada. **Esta tarefa é entregue como ativo do projeto** — não é gerada por código.

## Anexo: preparação para Fase 2 (dashboard)

Não implementado nesta fase. Serve para alinhar decisões.

### Auth do `/admin`

**Achado de segurança:** `app/routes/admin.redirects.tsx` está completamente desprotegido — qualquer visitante acessa. `meta robots: noindex,nofollow` impede listagem em SERP mas não bloqueia acesso direto. Na Fase 2, antes de criar `/admin/seo`, precisamos:

- Implementar `requireAdmin()` server-side em `app/lib/auth.server.ts` (a criar): valida header `Authorization: Bearer <ADMIN_TOKEN>` ou cookie de sessão. Token em env var.
- Aplicar a `admin.redirects.tsx` também (corrige a brecha existente).

### Credenciais Google APIs

Service Account JSON é o caminho recomendado para chamadas server-to-server em loaders Remix. Passos para o usuário verificar no Google Cloud Console:

1. Acessar [console.cloud.google.com](https://console.cloud.google.com) → projeto associado ao GA4.
2. **APIs & Services → Library** → habilitar:
   - "Google Analytics Data API"
   - "Google Search Console API"
3. **APIs & Services → Credentials**:
   - Se já existe Service Account (`*@*.iam.gserviceaccount.com`): baixar nova JSON key.
   - Se não: criar Service Account → "Generate JSON key".
4. **GA4 admin**: dar role "Viewer" ao email da Service Account na propriedade GA4.
5. **Search Console**: Settings → Users and permissions → adicionar email da Service Account como "Restricted".
6. **Vercel**: configurar env var `GOOGLE_SERVICE_ACCOUNT_JSON_BASE64` com o conteúdo do JSON em base64.

### Stack proposta (Fase 2)

- Loader server-side em `/admin/seo` consulta `@google-analytics/data` (GA4 Data API) e `googleapis` (Search Console).
- Cache: Vercel KV ou cache em memória do loader com TTL 1h (APIs têm quotas).
- UI: tabelas + gráficos (`recharts` já no projeto via `Chart.tsx`).
- Sugestões automáticas: regras simples client-side cruzando queries com impressões/CTR/posição (ex: "impressões > 500 e CTR < 2% → revisar title").

## Critérios de aceitação (Fase 1)

- [ ] `/sitemap.xml` retorna XML válido com Content-Type `application/xml` e todas ~66 calculadoras + 8 categorias + páginas estáticas.
- [ ] Validador externo ([xml-sitemaps.com/validate](https://www.xml-sitemaps.com/validate-xml-sitemap.html)) aceita o sitemap sem warnings.
- [ ] Sitemap submetido manualmente em Search Console → Sitemaps após deploy.
- [ ] Toda calculadora em `app/routes/calculadoras.*.tsx` tem entrada em `CALCULATOR_SEO_DATA` e retorna `<title>` único.
- [ ] `view-source` em qualquer calculadora não mostra `aggregateRating` em nenhum bloco JSON-LD.
- [ ] `og:image` aponta para `/og-image-1200x630.webp` em todas as páginas; arquivo existe e tem dimensões 1200×630.
- [ ] `window.gtag` definido em produção (validável via DevTools console em qualquer página da produção).
- [ ] Eventos custom aparecem em GA4 Realtime (testar: usar uma calculadora em produção, observar evento `calculator_used` em GA4).
- [ ] Eventos custom NÃO aparecem mais no Vercel Analytics Dashboard como eventos manuais (só pageviews automáticos).
- [ ] `analytics-provider.tsx` importa `CATEGORIES` de `constants.ts` e não tem mapa hardcoded.
- [ ] `IndexNow.submitMainPages()` inclui todas as 8 categorias.
- [ ] `npm run typecheck` passa.
- [ ] `npm run lint` passa.
- [ ] Lighthouse SEO score ≥ 95 em amostra de 8 calculadoras (uma por categoria), medido antes do refactor e depois do deploy — registrar comparação no PR.

## Não-objetivos (explícitos)

- Implementar dashboard `/admin/seo` (Fase 2).
- Sistema real de avaliação dos usuários (replacement do `aggregateRating`).
- OG image dinâmico per-calculadora via `@vercel/og`.
- Reescrever conteúdo SEO das calculadoras (FAQs, headings, internal linking) — backlog separado mencionado como Abordagem C, descartada.
- Migrar de Vercel Analytics para outro provider de Web Vitals.
- Internacionalização (hreflang) — site é pt-BR only.

## Riscos e mitigação

| Risco | Probabilidade | Mitigação |
|---|---|---|
| `__ENV` não injetado antes do JS bundle hidratar | Média | Validar no `root.tsx` que o script está antes de `<Scripts />`. Testar em produção via DevTools. |
| Search Console rejeitar novo sitemap por demora | Baixa | É comum levar dias para reindexar — não é problema, só esperar. |
| Remover `aggregateRating` derrubar rich snippets existentes temporariamente | Alta | Aceitável — é correção. Sem isso, risco maior de manual action. |
| Lighthouse SEO score cair em alguma calculadora | Baixa | Critério de aceitação cobre. Validar antes do merge. |
| Tracking custom desaparecer em produção pós-refactor | Média | Testar em preview deploy do Vercel antes de merge em main. GA4 Realtime View confirma em <1min. |
