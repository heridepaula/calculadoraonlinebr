# Indicadores de mercado reais (SELIC, CDI, IPCA, INPC, TR, Poupança) e Tesouro Direto

Data: 2026-11-07 · Status: proposta

## 1. Diagnóstico

### 1.1 De onde vêm os indicadores hoje

Todos os valores estão fixos no código. A fonte central é `app/lib/economic-data.ts` (`ECONOMIC_INDICATORS`, "Janeiro 2025"), mas várias rotas têm números próprios.

| Indicador | No código | Real (BCB, 06/11/2026) |
|---|---|---|
| SELIC meta | 12,25% (`economic-data.ts`), 14,25% (`renda-fixa-comparativa`) | 13,75% (SGS 432) |
| CDI | 12,25% | ≈13,65% (SGS 12 anualizado / 4389) |
| IPCA 12 meses | 4,87% | 4,58% (SGS 13522, set/2026) |
| INPC 12 meses | 4,42% | calcular a partir de SGS 188 (mensal) |
| Poupança | 8,59% a.a. (estimado) | 0,6703% a.m. (SGS 195) |
| TR | não existe | 0,1695% a.m. (SGS 226) |

### 1.2 Uso por calculadora

| Rota (`app/routes/calculadoras.financas.*`) | Indicador | Problema |
|---|---|---|
| `cdb.tsx:194-198` | IPCA, CDI (valor inicial) | fixo |
| `consorcio.tsx:290,413,735` | INPC (valor inicial + projeção) | fixo |
| `juros-compostos.tsx:270,328,583,1316` | SELIC (comparativo) | fixo; texto do FAQ/JSON-LD diz "12,25%" |
| `juros-simples.tsx:329,553` | SELIC (comparativo) | fixo |
| `lci-lca.tsx:447,584,1100,1320` | "CDI" | usa **SELIC** como CDI |
| `primeiro-milhao.tsx:339,548,674,682` | SELIC (valor inicial) | fixo |
| `renda-fixa-comparativa.tsx:382-449,554,592,671,722,736` | CDI, Tesouro Selic 14,25, Tesouro IPCA+ 11,0 | usa SELIC como CDI; taxas do Tesouro fixas e divergentes entre si (11,0 vs 11,5) |
| `tesouro-direto.tsx:47,371-393,444,768` | lista de títulos, SELIC, IPCA, taxa de compra 10,5, cupom 10,0 | ver 1.3 |
| `financiamento-imobiliario.tsx:281` | taxa 10,50% a.a. | fixo (candidato: TR + taxa média BCB, opcional) |
| `emprestimo-consignado.tsx:293` | 2,50% a.m. | teto do INSS é definido pelo CNPS, não há API: manter em config |
| `antecipacao-parcelas-nubank`, `preco-medio`, taxas de consórcio | taxas de produto | não são indicadores de mercado: manter |

### 1.3 Por que o Tesouro Direto parou

- `app/services/treasuryBonds.server.ts` busca `tesourodireto.com.br/json/br/com/b3/tesourodireto/service/api/treasurybondsinfo.json`. Hoje responde **HTTP 410 Gone**. As URLs "alternativas" respondem 404.
- Com a falha, a página cai em `getDefaultBonds()` (dados de setembro de 2025): prefixados a ~12% e IPCA+ a ~6%. Os reais estão em 13,6–15,3% e 7,4–8,0%.
- O cache é em memória e `scheduler.server.ts` usa `setTimeout`. Na Vercel (serverless) nenhum dos dois persiste: cada instância fria tenta a URL morta de novo, a cada requisição.

### 1.4 O que o koinos tem (`D:\workspace\koinos`)

- **Tesouro:** sim. Usa o dataset aberto do **Tesouro Transparente** (CKAN `package_show` → CSV "Taxas dos Títulos Ofertados pelo Tesouro Direto"), com:
  - URL do CSV lida do catálogo (`adapters/tesouro-transparente.ts`), host validado, `redirect: "error"`;
  - atalho por `last_modified` e GET condicional por ETag (304 sem corpo);
  - parser puro que valida o cabeçalho, as colunas e a faixa da taxa, e recusa o arquivo se mais de 1% das linhas for inválida (`domain/treasury-rates.ts`, com testes);
  - upsert idempotente por `(tipo, vencimento, data-base)` e estado de sync no Mongo (`server/treasury-service.ts`);
  - cron diário na Vercel (`/api/cron/daily`, `0 22 * * 1-5`).
  - Limitação: só acompanha **um** título (NTN-B 2035).
- **SELIC / CDI / IPCA:** **não**. O koinos não consulta o BCB.

Fonte verificada hoje: o CSV tem 14,6 MB, baixa em ~3 s, `last_modified` de hoje às 10:23 e data-base de 06/11/2026 (D-1). Ele traz **todos** os títulos (Selic, Prefixado, Prefixado com Juros, IPCA+, IPCA+ com Juros, IGPM+, Renda+, Educa+). Não traz preço de compra ao vivo nem valor mínimo. O mínimo é calculado pela regra do Tesouro: 1% do PU, com piso de R$ 30.

## 2. Decisões

1. **Tesouro:** portar o adapter e o parser do koinos e generalizar o parser para todos os títulos com vencimento futuro. Guardar só a última data-base de cada título, mais uma janela de histórico (365 dias) para a mediana e para gráficos futuros, em vez do histórico de 20 anos.
2. **Indicadores:** API SGS do Banco Central (`api.bcb.gov.br/dados/serie/bcdata.sgs.{n}/dados/ultimos/{k}?formato=json`), sem chave.
   - SELIC meta: 432 · SELIC over a.a.: 1178 · CDI: 4389, com fallback para a série 12 (diária) anualizada `(1+d)^252−1` (a 4389 respondeu 304 sem corpo no teste)
   - IPCA 12m: 13522 · INPC: 188 (acumular os 12 últimos meses) · TR: 226 · Poupança: 195
   - Opcional: Focus (Olinda `ExpectativasMercadoTop5Anuais`), para mostrar a expectativa de IPCA do ano.
3. **Persistência:** o MongoDB que já existe (`app/lib/mongodb.server.ts`).
4. **Agendamento:** Vercel Cron, no mesmo padrão de `api.cron.$lottery.ts` (`CRON_SECRET`, `timingSafeEqual`). O `scheduler.server.ts` sai.
5. **Leitura:** um serviço server-side com cache em memória de 1 h e fallback em camadas: Mongo → último valor conhecido → constantes de fallback. A página nunca quebra e nunca mostra um valor velho sem avisar.
6. **Valores no app:** vêm do `loader` de cada rota. Os componentes recebem por `useLoaderData`, e o `meta` (título/FAQ com "SELIC atual") lê de `data`.

## 3. Modelo de dados (Mongo)

```ts
// market_indicators: um documento por indicador (valor vigente)
{ _id: "SELIC_META" | "SELIC" | "CDI" | "IPCA_12M" | "INPC_12M" | "TR_MES" | "POUPANCA_MES",
  value: number,            // em %
  unit: "a.a." | "a.m." | "12m",
  referenceDate: Date,      // data do dado na fonte
  source: "BCB/SGS",
  series: number[],         // códigos SGS usados
  fetchedAt: Date }

// market_indicator_history: { _id: `${id}|${aaaa-mm-dd}`, id, date, value }  (upsert)

// treasury_bonds: { _id: `${kind}|${maturity}|${baseDate}`, kind, type, maturity, baseDate,
//                   buyRate, sellRate, buyPrice, sellPrice }
//   índices: { baseDate: -1 }, { kind: 1, maturity: 1, baseDate: -1 }
// treasury_sync:  { _id: "tesouro-transparente", lastModified, etag, lastBaseDate, checkedAt, lastError }
```

## 4. Tarefas

### T1. Módulo puro de indicadores (`app/lib/market/indicators.ts`)
- Parse da resposta SGS (`[{data:"dd/mm/aaaa", valor:"13.75"}]`), validação de faixa por indicador, conversões (diária→anual, mensal→12m acumulado, a.a.→a.m.).
- Tipo `MarketIndicators` e as constantes `FALLBACK_INDICATORS`, que substituem `ECONOMIC_INDICATORS` e passam a ser só o último recurso.
- `calculateSavingsRate` corrigida: poupança vem da SGS 195; a regra 70% da SELIC + TR fica só como fallback.

### T2. Módulo puro do Tesouro (`app/lib/market/treasury.ts`)
- Portar `parseTreasuryPackage`, `parseBrDate`, `parseTreasuryCsv` e `midRate` do koinos.
- Generalizar `parseTreasuryCsv`: recebe `minBaseDate` em vez de uma lista fixa de títulos e devolve todos os tipos conhecidos (mapeamento nome → `ProcessedBond["type"]`, substituindo `detectBondType`).
- Função `latestBonds(rows, today)`: última data-base de cada título com vencimento > hoje, mínimo = `max(30, 1% do PU)`.

### T3. Adapters de rede (`app/services/market/*.server.ts`)
- `bcb.server.ts`: fetch com timeout de 15 s, uma requisição por série, `Promise.allSettled` (uma série que falha não derruba as outras).
- `tesouroTransparente.server.ts`: catálogo + CSV com ETag (código do koinos sem `server-only`/Next).

### T4. Repositórios (`app/repositories/market.repository.server.ts`)
- `saveIndicators`, `getIndicators`, `upsertTreasuryRows` (bulkWrite, `ordered:false`), `getLatestBonds`, `get/setTreasurySync`.
- Criar os índices em `ensureIndexes()`, chamado pelo cron.

### T5. Sync + cron
- `app/services/market/sync.server.ts`: `syncIndicators()` e `syncTreasury()` (lógica do `runSync` do koinos: atalho por `last_modified`, 304 por ETag, recusa arquivo mais velho que o gravado, o estado só avança depois das linhas).
- `app/routes/api.cron.indicadores.ts`: as duas etapas isoladas por try/catch. A resposta traz só contagens e status.
- `vercel.json` → `crons`: `{ "path": "/api/cron/indicadores", "schedule": "0 14 * * *" }` (11h BRT, depois da publicação do CSV às ~10h30). Um segundo horário (`0 22 * * 1-5`) é opcional, para pegar a SELIC no dia do Copom.
- Script `scripts/syncMarket.ts` (`tsx`) para a primeira carga e para testes manuais: `npm run sync:market`.

### T6. Serviço de leitura (`app/services/market/marketData.server.ts`)
- `getMarketIndicators()` e `getTreasuryBonds()`: cache em memória de 1 h por instância, fallback Mongo → constantes, com flag `stale` (dado com mais de 10 dias, ou fallback).
- Remover `treasuryBonds.server.ts` (fetch morto, `getDefaultBonds`, cache em memória) e `scheduler.server.ts`.

### T7. Usar os dados nas rotas
Para cada rota da tabela 1.2:
- `loader` que chama `getMarketIndicators()` (e `getTreasuryBonds()` no Tesouro), com `Cache-Control: public, s-maxage=3600, stale-while-revalidate=86400`.
- Trocar `ECONOMIC_INDICATORS.X.rate` pelo valor do loader. Valores iniciais de `useState` vêm do loader (sem diferença de hidratação, porque o SSR já usa o mesmo valor).
- Correções de conteúdo: `lci-lca` e `renda-fixa-comparativa` passam a usar **CDI**, não SELIC. Em `renda-fixa-comparativa`, Tesouro Selic = SELIC + spread do título e Tesouro IPCA+ = taxa real do título mais longo ofertado. Os textos "12,25%" em FAQ, meta e JSON-LD de `juros-compostos` e `juros-simples` passam a ser gerados a partir do valor.
- `tesouro-direto`: lista de títulos vinda do Mongo; taxa de compra e cupom iniciais vêm do título selecionado.
- Componente `IndicatorBadge` ("SELIC 13,75% a.a. · BCB · atualizado em 06/11/2026"), com aviso em amarelo quando `stale`. Contraste AA.

### T8. Limpeza e documentação
- `economic-data.ts` fica só com o fallback e as faixas de mercado (`MARKET_RANGES`); o hook `useEconomicData` sai.
- CLAUDE.md: seção "Indicadores de mercado" (coleções, cron, como acrescentar uma série).
- `.env.example`: confirmar `MONGODB_URI` e `CRON_SECRET` (já usados pelas loterias).

### T9. Verificação
- `npx tsc --noEmit` e `npx eslint` nos arquivos tocados.
- `npm run sync:market` contra o Mongo de dev: conferir as contagens e os valores (SELIC 13,75; IPCA 4,58; ~30 títulos não-Educa/Renda+).
- Rodar o sync de novo: deve responder `not-modified` (idempotência).
- Simular falha (URL inválida): a página continua com o último valor e o badge mostra "desatualizado".
- Playwright: `tesouro-direto`, `cdb`, `renda-fixa-comparativa` e `juros-compostos` em 375 px e 1280 px.

## 5. Ordem e esforço

T1–T2 (puros) → T3–T4 → T5 (cron + primeira carga) → T6 → T7, rota a rota (tesouro-direto primeiro, por estar quebrado) → T8 → T9.
Estimativa: ~1 dia para T1–T6; T7 cerca de 30–60 min por rota.

## 6. Riscos

- **Mudança no CSV do Tesouro:** o parser recusa o arquivo inteiro e os dados anteriores continuam valendo. O `lastError` fica em `treasury_sync`.
- **SGS fora do ar ou 304 sem corpo (visto na 4389):** fallback de série (CDI via SGS 12) e o último valor gravado.
- **Atraso D-1 do Tesouro:** o CSV não é preço ao vivo. A página deve dizer "taxas de fechamento de dd/mm".
- **Limite de cron no plano Hobby da Vercel (1×/dia por cron):** o plano já respeita esse limite.
