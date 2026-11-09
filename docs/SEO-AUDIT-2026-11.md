# Auditoria de SEO e plano de melhoria (novembro de 2026)

**Site**: https://www.calculadoraonlinebr.com.br
**Data**: 2026-11-08
**Método**: checklist do SearchFit SEO (seo-audit, technical-seo, on-page-seo, schema-markup, internal-linking, ai-visibility), aplicado em duas frentes:

1. Crawl do site em produção: as 89 URLs do `sitemap.xml`, com análise do HTML servido pelo SSR (status, `<head>`, H1, imagens, JSON-LD, links internos, contagem de palavras).
2. Leitura do código: `root.tsx`, rotas, `sitemap[.]xml.tsx`, `robots.txt`, `vercel.json`, registries em `app/lib/`.

**Limitações**: a cota anônima da API do PageSpeed Insights estava esgotada, então não há dados de laboratório nem de campo (CrUX) de Core Web Vitals neste relatório. Também não houve acesso ao Google Search Console. Os tempos de resposta vêm de uma única amostra. A contagem de palavras inclui header e footer, então é aproximada.

---

## Resumo executivo

| | |
|---|---|
| **Nota geral (estimada)** | **62/100**: precisa de trabalho significativo |
| Páginas analisadas | 89 (todas retornam 200) |
| Problemas críticos | 4 |
| Avisos | 12 |
| Oportunidades | 9 |

A base é boa: SSR, títulos e descrições únicos, um H1 por página, canonical correto em 85 de 89 páginas, componentes de FAQ, breadcrumb e relacionados em quase todas as rotas. Duas falhas silenciosas, porém, atingem cerca de 60% do site:

- **JSON-LD com dupla codificação** em 56 arquivos de rota: para o Google, 54 calculadoras não têm nenhum dado estruturado válido.
- **`og:image` com 404** em 56 páginas: os compartilhamentos no WhatsApp, Facebook e X saem sem imagem.

As duas correções são mecânicas e de baixo risco, e são as que mais rendem por hora de trabalho.

### Notas por categoria

| Categoria | Nota | Principais problemas |
|---|---|---|
| SEO técnico | 70/100 | redirect 307 no domínio sem www, `lastmod` falso, URLs duplicadas com 200, preload de CSS com 404 |
| On-page | 62/100 | 56 `og:image` quebradas, 37 títulos acima de 60 caracteres, 21 descrições acima de 160 |
| Conteúdo e estrutura | 45/100 | JSON-LD inválido em 54 calculadoras, sem navegação global, 3 links internos quebrados, hubs com pouco conteúdo |
| Performance | ~60/100 (sem medição) | HTML sem cache de CDN, TTFB de 1,7 a 2,3 s em finanças e loterias, fonte Inter pré-carregada sem uso, ~778 KB de JS na página de IMC |
| Mobile e acessibilidade | 80/100 | viewport duplicado em 63 rotas, H1 da home com palavras coladas |

---

## Problemas críticos (corrigir já)

### C1. JSON-LD com dupla codificação em 56 rotas (152 blocos)

**Evidência**: na página `/calculadoras/saude/imc`, 6 dos 7 blocos `<script type="application/ld+json">` contêm uma *string* JSON (`"{\"@context\":...}"`) em vez de um objeto. O Google lê uma string e não encontra nenhum item. Ficam sem schema válido 54 calculadoras: todas as de saúde, matemática, trabalhista, datas e ferramentas, além da maior parte das de finanças.

**Causa**: o descritor `"script:ld+json"` do Remix v2 espera um **objeto** e chama `JSON.stringify` sozinho (documentação oficial: v2.remix.run/docs/route/meta). As rotas passam `JSON.stringify({...})`, então o conteúdo é codificado duas vezes.

```ts
// errado (app/routes/calculadoras.saude.imc.tsx:113 e outras 151 ocorrências)
{ "script:ld+json": JSON.stringify({ "@context": "https://schema.org", ... }) }
// certo (o mesmo padrão das rotas de apostas e de lib/betting-page.ts)
{ "script:ld+json": { "@context": "https://schema.org", ... } }
```

**Correção**: reescrita estrutural com `ast-grep` 0.51. O comando foi testado em modo de simulação (sem `-U`) e encontrou exatamente os 152 blocos:

```bash
ast-grep run -l tsx -p '({ "script:ld+json": JSON.stringify($OBJ) })' --selector pair \
  -r '"script:ld+json": $OBJ' app/routes        # revisar o diff; depois repetir com -U
```

Depois, validar 3 ou 4 páginas no [Rich Results Test](https://search.google.com/test/rich-results) e rodar `npx tsc --noEmit` nos arquivos alterados.

**Impacto esperado**: os breadcrumbs ficam elegíveis no Google e o Bing e os mecanismos de IA passam a entender as entidades. Não espere rich result de FAQ: desde agosto de 2023 o Google só mostra FAQ para sites governamentais e de saúde de alta autoridade. O de HowTo foi descontinuado.

### C2. `og:image` com 404 em 56 páginas (55 imagens)

**Evidência**: as rotas apontam para `/images/calculadora-<slug>.webp` e `/og-images/*.jpg`, mas `public/images/` só tem 4 arquivos (cdb, consorcio, emprestimo-consignado, financiamento-imobiliario). Só funcionam essas 4, a `og-image-1200x630.webp` e a `android-chrome-512x512.webp` (que é um ícone quadrado e não serve como OG).

**Correção** (escolher uma):
- **Rápida**: apontar todas as rotas sem imagem para `/og-image-1200x630.webp`.
- **Recomendada**: estender `scripts/generate-og-image.mjs` para gerar uma imagem 1200×630 por calculadora, a partir de `CALCULATORS` (nome e cor da categoria), em **JPG ou PNG**. É o formato mais seguro para a prévia do WhatsApp, que é o principal canal de compartilhamento no Brasil.
- Em qualquer dos casos, incluir no script de verificação (O8) um HEAD em cada `og:image` para que a regressão não volte a acontecer.

### C3. Links internos quebrados (404) nas páginas de categoria

| Arquivo | Link atual | Correção |
|---|---|---|
| `app/routes/calculadoras.datas._index.tsx:165` | `/calculadoras/datas/idade` | `/calculadoras/datas/idade-exata` |
| `app/routes/calculadoras.datas._index.tsx:475` | `/calculadoras/datas/idade` | `/calculadoras/datas/idade-exata` |
| `app/routes/calculadoras.ferramentas._index.tsx:450` | `/calculadoras/ferramentas/diferenca-entre-datas` | `/calculadoras/datas/diferenca-entre-datas` |

Melhor ainda: gerar esses links a partir de `CALCULATORS` em vez de escrever o caminho à mão.

### C4. Domínio sem www redireciona com 307 (temporário)

**Evidência**: `https://calculadoraonlinebr.com.br/` responde **307** para `https://www.calculadoraonlinebr.com.br/`, e `http://` sem www faz 2 saltos (308 e depois 307).

**Correção**: no painel da Vercel, em Project → Settings → Domains → `calculadoraonlinebr.com.br` → Edit, mudar o redirect para www para **308 Permanent**. Não exige código.

---

## Avisos (corrigir em seguida)

### W1. 37 títulos acima de 60 caracteres e uma canibalização

- Os maiores têm de 84 a 101 caracteres, como `conversor-de-odds` (101), a categoria `datas` (99) e `gestao-de-banca` (96). O Google corta em cerca de 580 px.
- O sufixo ` | CalculadoraOnlineBR` ocupa 22 caracteres. O Google já mostra o nome do site separadamente, a partir do schema `WebSite`, então dá para tirar o sufixo quando o título ficar longo.
- **Canibalização**: `criterio-de-kelly` ("Calculadora de Gestão de Banca (Critério de Kelly)") e `gestao-de-banca` ("Calculadora de Gestão de Banca por Unidades") disputam "gestão de banca". O título da Kelly deve começar por "Critério de Kelly".
- Padrão sugerido: `{Palavra-chave principal} {ano, se relevante}: {benefício curto}`, com no máximo 60 caracteres.

### W2. 21 descrições acima de 160 caracteres

As maiores são `conversor-unidades` (197), `economia-energia-eletrica` (188), `/calculadoras` (181), `numerologia` (179), `calculadora-cientifica` (177) e a home (174). O ideal é entre 140 e 160 caracteres, com a palavra-chave e um CTA.

### W3. 4 páginas sem canonical, `og:url`, `og:image` e robots

São elas: `/calculadoras`, `/sobre`, `/termos-de-uso` e `/privacidade`. No Remix v2, o `meta` da rota filha **substitui** o da rota raiz, então as tags OG do `root.tsx` não chegam a essas páginas. É preciso adicionar canonical (`tagName: "link"`) e as tags OG e Twitter em cada uma.

### W4. `lastmod` do sitemap é sempre a data de hoje

Em `app/routes/sitemap[.]xml.tsx:13`, o valor é `new Date()`, o que dá a mesma data nas 89 URLs. O Google ignora `lastmod` que não é verificável. **Correção**: adicionar `updatedAt` em cada item de `CALCULATORS` ou `CALCULATOR_SEO_DATA` e atualizá-lo quando o conteúdo mudar de fato. Outra opção é derivar a data do `git log` de cada rota no build.

### W5. Linkagem interna fraca: sem navegação global

- O header só tem o logo e o footer só tem Sobre, Privacidade, Termos e Contato. Nenhuma página fora da home linka as 9 categorias.
- 30 calculadoras têm menos de 3 links para outras calculadoras. A de IMC, por exemplo, linka só hidratação e gordura corporal.
- Muitas calculadoras recebem **um único** link interno, vindo da página da categoria: peso-gravidez, desenvolvimento-infantil, lci-lca, preco-medio, emprestimo-consignado, consorcio, renda-fixa-comparativa, mmc-mdc, volume, teorema-pitagoras e outras.

**Correção**:
1. Header com as 9 categorias (menu no mobile).
2. Footer com as 9 categorias e as 10 a 15 calculadoras principais.
3. `RelatedCalculators` com 4 a 6 itens por página, priorizando a mesma categoria e incluindo pelo menos 1 de outra categoria quando houver relação (IMC com hidratação, gordura corporal, peso na gravidez; juros compostos com CDB, Tesouro Direto, primeiro milhão).
4. Links contextuais no texto educativo, com âncora descritiva.

### W6. URLs duplicadas respondem 200

`/calculadoras/saude/imc/` (barra no final) e `/calculadoras/Saude/IMC` (maiúsculas) retornam 200. O canonical evita o pior, mas o crawl é desperdiçado. **Correção**: `"trailingSlash": false` no `vercel.json` (testar em preview) e, se quiser, um 301 para minúsculas no `server.js`.

### W7. HTML sem cache de CDN e TTFB alto em finanças e loterias

- Todas as páginas respondem `Cache-Control: public, max-age=0, must-revalidate` e `x-vercel-cache: MISS`, ou seja, cada visita roda o SSR de novo.
- Amostra de tempo de resposta: mediana de 263 ms, mas `cdb` levou 1,8 s, `juros-simples` e `primeiro-milhao` 1,7 s, e os geradores de loteria de 2,0 a 2,3 s.
- **Correção**: um export `headers` por tipo de rota:
  - calculadoras estáticas: `public, s-maxage=86400, stale-while-revalidate=604800`
  - finanças: `s-maxage=3600`, alinhado ao cache de 1 h dos indicadores
  - loterias: conforme o horário dos sorteios

### W8. Recursos desperdiçados no caminho crítico (`app/root.tsx`)

- **Linhas 38 a 44**: preload de `/assets/root-D_Rv9tYd.css`, com hash fixo de um build antigo, que retorna **404** em todas as páginas. Remover a entrada. O CSS já é injetado por `<Links />`.
- **Linhas 25 a 31**: preload do arquivo woff2 da fonte **Inter**, que o site não usa. O alias `inter` do Tailwind aponta para Manrope (`tailwind.config.ts:41`). Remover, ou pré-carregar o woff2 da Manrope.
- **Linhas 47 a 54 e 274 a 278**: o CSS do Google Fonts é carregado duas vezes, pelo `<link preload>` e pelo script que cria outro `<link>`. Manter só um dos dois.
- O H1 da home tem `animate-slide-up` com atraso de 120 ms e `fill-mode: backwards`, então fica invisível até a animação começar. Se ele for o elemento de LCP, isso atrasa o LCP. Tirar a animação do H1.

### W9. Tipos de schema inválidos ou sem efeito

- `MedicalCalculator` (2 ocorrências) não existe no schema.org. Usar `WebApplication` com `applicationCategory: "HealthApplication"`, ou `MedicalWebPage`.
- `HowTo` (18 ocorrências): o Google descontinuou esse rich result. Não faz mal, mas pode ser simplificado.
- `WebApplication` e `SoftwareApplication` sem `aggregateRating` não geram rich result. **Nunca** invente avaliações: isso viola as diretrizes do Google e pode render ação manual.

### W10. "2026" fixo em 51 títulos

Em 1º de janeiro de 2027, daqui a 54 dias, os títulos ficam desatualizados. **Correção**: uma constante `SEO_YEAR` em `app/lib/constants.ts`. Use o ano só onde o conteúdo depende dele (tabelas de INSS, IRRF e salário mínimo, que mudam em janeiro e também exigem atualização do cálculo). Em calculadoras atemporais (MMC, Pitágoras, UUID), o ano no título não acrescenta nada.

### W11. Páginas-hub com pouco conteúdo

- `/calculadoras`: cerca de 228 palavras
- home: cerca de 402
- `/sobre`: cerca de 406
- categorias: de 427 a 578

As páginas de categoria são as que mais concentram autoridade. Devem ter de 600 a 900 palavras úteis: introdução, como escolher a calculadora, as perguntas mais comuns da categoria (FAQ) e links para todas as calculadoras.

Calculadoras abaixo de 600 palavras: compatibilidade-signos, conversor-unidades, antecipacao-parcelas-nubank, simplificador-funcoes-algebricas, contagem-regressiva, sistemas-equacoes-lineares, inequacoes, calculadora-cientifica e sorteador-online.

### W12. E-E-A-T fraco em temas YMYL (saúde, finanças, trabalhista)

- Não há autor nem revisor, nem `Person`, em nenhuma página, e `Organization` não tem `sameAs`.
- **Correção**:
  - seção "Fontes" com a legislação citada (artigos da CLT, Lei 8.213/91, portarias do INSS e tabelas da Receita Federal)
  - "Última atualização: dd/mm/aaaa" visível na página
  - página Sobre com metodologia, quem mantém o site e como os cálculos são validados
  - "Revisado por" **apenas se houver um profissional real** fazendo a revisão

---

## Oportunidades

1. **Schema `Organization` com `@id`**: um nó único (`https://www.calculadoraonlinebr.com.br/#organization`) com logo e `sameAs` com os perfis reais, referenciado por `publisher` em todas as páginas. Verificar se `@calculadorabr` (o `twitter:site`) existe. Se não existir, remover.
2. **Centralizar o meta**: generalizar `buildBettingPageMeta` (`app/lib/betting-page.ts`) em um `buildCalculatorMeta(id)` que leia de `CALCULATOR_SEO_DATA`. Hoje só as 9 rotas de apostas usam o registry, e as outras 66 escrevem título e descrição à mão, que podem divergir. Isso resolve C1, W1, W2, W3 e W10 de forma permanente.
3. **Novas calculadoras**: hipóteses, a validar no Search Console e no Keyword Planner antes de construir.
   - **Calculadora de 13º salário em página própria (urgente)**: a 1ª parcela vence em 30/11 e a 2ª em 20/12, e a busca tem pico agora. Hoje o tema está dentro de `ferias-decimo-terceiro`. Criar com intenção distinta e linkar as duas páginas entre si para não canibalizar.
   - **Rendimento da poupança**: os dados já são coletados (`market_indicators`).
   - Seguro-desemprego, FGTS, adicional noturno, financiamento de veículo, conversor de moedas, idade gestacional/DPP, TMB/calorias.
4. **Visibilidade em IA (GEO)**:
   - parágrafo de resposta direta no topo de cada calculadora ("O que é X" e a fórmula em 2 ou 3 linhas)
   - tabelas de referência
   - JSON-LD válido (C1)
   - o `robots.txt` já libera os crawlers de IA. O `llms.txt` é opcional e tem impacto não comprovado.
5. **Limpeza do `robots.txt`**: remover `Crawl-delay: 1` (o Google ignora e o Bing obedece, o que só atrasa o crawl) e as linhas `/*` redundantes.
6. **Arquivos mortos**: `public/_redirects` e `public/_headers` usam formato Netlify/Cloudflare e a Vercel os ignora. O `/* /index.html 200` engana quem lê. Remover.
7. **Viewport duplicado em 63 rotas e `keywords` em 76**: o viewport já está no `Layout` do `root.tsx`, então pode sair das rotas. A meta `keywords` é ignorada pelo Google e pode sair também.
8. **Script de regressão de SEO** (`scripts/seo-check.mjs`): busca o sitemap e verifica, em cada URL:
   - título com no máximo 60 caracteres e descrição com no máximo 160
   - canonical presente
   - `og:image` respondendo 200
   - JSON-LD que seja **objeto**
   - H1 único
   - links internos sem 404

   Rodar após cada deploy (preview da Vercel ou GitHub Action). Os problemas C1, C2 e C3 teriam sido detectados.
9. **Peso do JS**: a página de IMC carrega cerca de 778 KB de JS descomprimido em 24 arquivos, e só `vendor-libs` tem 276 KB. Verificar com `npm run build:analyze` se o chart.js (e outras bibliotecas) entra em páginas que não usam gráfico, e usar `lazy()` onde der.
10. **H1 da home** (`app/routes/_index.tsx:175-178`): os `<span>` sem espaço resultam no texto "A calculadoraque resolvetudo…" para leitores de tela e extratores. Adicionar `{" "}` e incluir a palavra-chave ("calculadoras online grátis") no H1 ou num eyebrow logo acima.

---

## O que já está bom

- As 89 URLs do sitemap respondem 200, com conteúdo no HTML do SSR (indexável sem JS).
- Títulos e descrições são **únicos** nas 89 páginas.
- Há exatamente um H1 por página, e todas as `<img>` têm `alt`.
- O canonical aponta para a própria página, como `<link>`, em 85 de 89 páginas, e URLs com `?utm_*` canonicalizam corretamente.
- URLs inexistentes retornam 404 de verdade, e os slugs legados fazem 301 (`/calculadoras/calculadora-imc` vai para `/calculadoras/saude/imc`).
- HTTPS com HSTS, brotli, assets com `immutable`, `lang="pt-BR"`.
- As rotas de apostas, loterias, astrologia (exceto numerologia), consórcio, CDB, média e dias úteis já emitem JSON-LD válido. Servem de modelo.
- FAQ, Breadcrumb e RelatedCalculators estão em 76 a 85 rotas, e o IndexNow está integrado.

---

## Plano de melhoria

Esforço: **P** = até 2 h, **M** = de meio dia a 1 dia, **G** = de 2 a 5 dias.

### Status (2026-11-08)

**Fases 0 e 1 publicadas** (commit `a277061`), com o redirect do domínio sem www em 308 feito pela CLI da Vercel. O crawler em produção não encontrou problemas nas 89 páginas.

**Fase 2 implementada:**

- **2.3 concluído**: `app/lib/page-meta.ts`, com `buildCalculatorMeta`, `buildCategoryMeta` e `buildPageMeta`. As 89 rotas migradas mantêm só o próprio JSON-LD, o que removeu cerca de 6.900 linhas de tags duplicadas e lixo (`next-head-count`, `viewport`, `googlebot` etc.).
- **2.4 concluído**: 13 títulos e 21 descrições reescritos. Agora todos têm no máximo 60 e 160 caracteres, sem duplicatas. A canibalização entre Kelly e gestão de banca foi resolvida.
- **2.5 concluído**: `SEO_YEAR` em `constants.ts`, a atualizar em janeiro.
- **2.6 concluído**: o HTML fica 1 h na CDN, com `stale-while-revalidate`. As loterias mantêm 5 min.
- **2.1 e 2.2 concluídos**: menu de categorias no cabeçalho e rodapé com categorias e calculadoras mais usadas. Os links relacionados passaram a vir de `CALCULATORS`, 6 por página.
- **2.7 concluído**: `Organization` e `WebSite` com `@id` no JSON-LD global. O `sameAs` aguarda os perfis oficiais.

**Fases 3 e 4, em andamento (2026-11-09):**

- **3.1 concluído**: `/calculadoras/trabalhista/decimo-terceiro`, com 1ª e 2ª parcela, 13º proporcional, INSS faixa a faixa e IR com a redução da Lei 15.270/2025 (o §3º do art. 3º-A da Lei 9.250 a estende ao 13º). As tabelas de 2026 ficam em `app/lib/labor/tax-tables.ts`.
- **3.3 parcial**: bloco `SourcesAndUpdate` (fontes legais e data de atualização), usado na página do 13º, e seção "Metodologia" em `/sobre#metodologia`. Falta aplicar o bloco às outras páginas trabalhistas e financeiras.
- **3.4 antecipado**: salário líquido, férias, rescisão, auxílio-doença e aposentadoria agora usam `tax-tables.ts` (tabelas de 2026 e redução da Lei 15.270), com fontes e data de revisão na página. A migração também corrigiu erros de regra: desconto simplificado somado às deduções, INSS/IR sobre abono pecuniário, férias indenizadas e aviso prévio indenizado, 2ª parcela do 13º calculada sobre metade do valor, seguro-desemprego com 3 parcelas e 80% fixo, aviso prévio proporcional que nunca passava de 30 dias, datas da rescisão com um dia a menos, e pontos, idade progressiva e tempo mínimo da aposentadoria. **Falta revisar**: o fator previdenciário do pedágio de 50% (exige a tábua de sobrevida do IBGE) e o limite do auxílio-doença à média dos últimos 12 salários.
- **Correções de SSR encontradas na verificação**: bytes nulos no HTML de 12 páginas em produção (bug do streaming do React 18; agora removidos no `entry.server.tsx` e checados pelo `seo:check`) e erro #231 do React em todas as páginas, causado pelo `onLoad` em string do preload de fontes no `root.tsx`.
- **4.1 concluído**: `npm run seo:check` (`scripts/seo-check.mjs`). Contra o build local: 90 páginas, 0 erros. Contra a produção (só com as Fases 0 e 1): 58 erros de título e descrição, que a Fase 2 corrige.
- **4.4 concluído**: `_redirects` e `_headers` removidos (os redirects já estão no `vercel.json`), `robots.txt` enxuto, sem `Crawl-delay`, e `site.webmanifest` com nome e cores.

**Fases 3 e 4, continuação (2026-11-09, branch `seo/fase-3-conteudo`):**

- **3.2 concluído**: as 8 categorias sem FAQ ganharam introdução, guia "qual calculadora usar" (link para cada calculadora) e FAQ com JSON-LD, a partir de `app/data/category-guides.ts` e do componente `CategoryGuide`. Todas passaram a usar `generateCategoryPageGraph`. `/calculadoras` ganhou introdução, lista de todas as calculadoras e FAQ.
- **3.7 concluído para as páginas mais visitadas** (Vercel Analytics, 30 dias): bloco `DirectAnswer` em antecipação Nubank, MMC e MDC, ascendente, validar CPF e CNPJ, Tesouro Direto, consumo de energia, CDB, LCI/LCA, horas extras e Lotofácil.
- **3.5 concluído**: antecipação Nubank (página mais visitada) reescrita com passo a passo do app, tabela de descontos, comparação com o CDI do dia e FAQ sem afirmações sem fonte; compatibilidade de signos e contagem regressiva ganharam resposta direta.
- **4.2 concluído**: o `manualChunks` do Vite punha todas as bibliotecas em um `vendor-libs` de 269 KB carregado em todas as páginas. Agora só React e Remix ficam em blocos fixos: o JS por página caiu de cerca de 660 KB para 395 KB, e o chart.js (177 KB) só carrega nas páginas com gráfico.
- **Bugs corrigidos na revisão**: o validador de CNPJ recusava o CNPJ alfanumérico (emitido desde julho de 2026); a calculadora de dias úteis tratava a Quarta-feira de Cinzas como feriado e ignorava a segunda de Carnaval; o botão de copiar da compatibilidade de signos lançava `ReferenceError`.
- **3.6 pendente**: novas calculadoras dependem de dados de busca (Search Console ou Keyword Planner) para escolher quais construir.

Detalhe do que foi feito nas Fases 0 e 1:

- **0.2 e 0.3 concluídos**: o preload de CSS com 404 e o da fonte Inter foram removidos, e o Google Fonts agora carrega uma vez só. Os 3 links quebrados foram corrigidos.
- **1.1 e 1.2 concluídos**: os 152 blocos de JSON-LD agora são objetos. Os blocos `MedicalCalculator` (duplicados e com tipo inválido) foram removidos, e `MathematicalConcept` foi trocado por `DefinedTerm`.
- **1.3 concluído**: 85 imagens JPG em `public/og/` (`npm run og:pages`), todas as rotas apontam para a própria imagem e nenhuma referência aponta para arquivo inexistente.
- **1.4 concluído**: `/calculadoras`, `/sobre`, `/termos-de-uso` e `/privacidade` ganharam canonical, tags OG e Twitter e robots.
- **1.5 concluído**: o `lastmod` vem de `app/data/sitemap-lastmod.json` (`npm run sitemap:lastmod`).
- **1.6 concluído**: o loader raiz faz 301 de URLs com maiúsculas ou barra final.
- **0.1 concluído**: o redirect do domínio sem www agora é 308, alterado pela CLI da Vercel.

Depois do deploy: validar páginas no Rich Results Test e no depurador do Facebook, pedir nova indexação no Search Console e acompanhar o relatório "Breadcrumbs".

### Fase 0: configuração (hoje, cerca de 1 h)

| # | Ação | Ref. | Esforço | Impacto |
|---|---|---|---|---|
| 0.1 | Redirect do domínio sem www para 308 no painel da Vercel | C4 | P | Médio |
| 0.2 | Remover o preload de CSS com 404 e o da fonte Inter, e deixar uma única carga do Google Fonts | W8 | P | Médio (LCP) |
| 0.3 | Corrigir os 3 links internos quebrados | C3 | P | Médio |

### Fase 1: correções críticas (semana 1)

| # | Ação | Ref. | Esforço | Impacto |
|---|---|---|---|---|
| 1.1 | Corrigir o JSON-LD com dupla codificação via `ast-grep` e validar no Rich Results Test | C1 | P/M | **Alto** |
| 1.2 | Trocar `MedicalCalculator` por um tipo válido | W9 | P | Baixo |
| 1.3 | `og:image`: fallback imediato para a imagem padrão, depois geração de JPG por calculadora | C2 | P, depois M | **Alto** (CTR social) |
| 1.4 | Canonical, OG e Twitter em `/calculadoras`, `/sobre`, `/termos-de-uso` e `/privacidade` | W3 | P | Médio |
| 1.5 | `lastmod` real no sitemap | W4 | P/M | Médio |
| 1.6 | `trailingSlash: false` e 301 para minúsculas | W6 | P | Baixo/Médio |

### Fase 2: estrutura e on-page (semanas 2 e 3)

| # | Ação | Ref. | Esforço | Impacto |
|---|---|---|---|---|
| 2.1 | Navegação global: header com categorias e footer com categorias e calculadoras principais | W5 | M | **Alto** |
| 2.2 | `RelatedCalculators` com 4 a 6 itens e links contextuais nas 30 páginas fracas | W5 | M | Alto |
| 2.3 | `buildCalculatorMeta(id)` com base em `CALCULATOR_SEO_DATA` e migração das rotas | Op. 2 | G | Alto (manutenção) |
| 2.4 | Reescrever 37 títulos e 21 descrições e resolver a canibalização Kelly × gestão de banca | W1, W2 | M | Alto (CTR) |
| 2.5 | Constante `SEO_YEAR` e decisão de onde manter o ano, **antes de 01/01/2027** | W10 | P | Médio |
| 2.6 | Export `headers` com `s-maxage` e `stale-while-revalidate` por tipo de rota | W7 | M | Médio (TTFB e crawl) |
| 2.7 | `Organization` com `@id` e `sameAs`; limpar viewport e keywords duplicados | Op. 1, 7 | P | Baixo |

### Fase 3: conteúdo e autoridade (semanas 3 a 6)

| # | Ação | Ref. | Esforço | Impacto |
|---|---|---|---|---|
| 3.1 | **Calculadora de 13º salário em página própria**, publicada ainda em novembro | Op. 3 | M | **Alto (sazonal)** |
| 3.2 | Expandir as 9 categorias e `/calculadoras` para 600 a 900 palavras com FAQ | W11 | G | Alto |
| 3.3 | E-E-A-T: fontes legais, data de atualização visível e página Sobre com metodologia | W12 | M | Alto em YMYL |
| 3.4 | Atualizar as tabelas de INSS, IRRF e salário mínimo de 2027 em janeiro (cálculo e texto) | W10 | M | Alto |
| 3.5 | Reforçar as 9 calculadoras com menos de 600 palavras | W11 | M | Médio |
| 3.6 | Novas calculadoras validadas por dados (poupança, seguro-desemprego, FGTS…) | Op. 3 | G | Alto |
| 3.7 | Bloco de resposta direta e tabelas de referência (GEO) | Op. 4 | M | Médio |

### Fase 4: contínuo

| # | Ação | Ref. | Esforço |
|---|---|---|---|
| 4.1 | `scripts/seo-check.mjs` rodando após cada deploy | Op. 8 | M |
| 4.2 | Revisar o bundle (chart.js etc.) e medir CWV no Vercel Speed Insights, que já está instalado | Op. 9 | M |
| 4.3 | Search Console mensal: cobertura, melhorias (Breadcrumbs), consultas com CTR baixo e posição de 4 a 15 | n/a | P/mês |
| 4.4 | Limpeza: `_redirects`, `_headers`, `robots.txt`, `site.webmanifest` (`name` vazio) | Op. 5, 6 | P |

### KPIs para acompanhar

- **Search Console → Melhorias → Breadcrumbs**: de cerca de 27 para mais de 85 páginas válidas após a correção do JSON-LD.
- **Páginas indexadas**: 89 de 89 (Search Console → Páginas).
- **CTR orgânico** por categoria: comparar 28 dias antes e depois da reescrita dos títulos.
- **Impressões e cliques** em "13º salário" em novembro e dezembro.
- **CWV**: 75º percentil com LCP abaixo de 2,5 s, INP abaixo de 200 ms e CLS abaixo de 0,1 (Speed Insights e CrUX).
- **Regressão**: `seo-check` com 0 erros em todo deploy.
