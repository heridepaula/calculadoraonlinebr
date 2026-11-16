# Preços de combustíveis da ANP (gasolina e etanol) — spec

Data: 2026-11-15. Substitui a constante manual `FUEL_REFERENCE` de `app/lib/vehicle-sources.ts`.

## Problema

As páginas `equivalencia-km-kwh-km-l` e `custo-misto-phev` mostram o preço médio da gasolina e do etanol
escrito à mão (semana 01 a 07/11/2026: R$ 6,47 e R$ 4,15). O número envelhece toda semana. A ANP já
publicou a semana 08 a 14/11 (R$ 6,48 e R$ 4,25), então a página já está uma semana atrás.

## Fonte (verificada em 2026-11-15)

Planilha semanal da ANP, uma por semana (domingo a sábado), sem autenticação e sem User-Agent de navegador:

`https://www.gov.br/anp/pt-br/assuntos/precos-e-defesa-da-concorrencia/precos/arquivos-lpc/{AAAA}/resumo_semanal_lpc_{AAAA}_{MM}_{DD}-{AAAA}_{MM}_{DD}.xlsx`

- `AAAA_MM_DD` do domingo, depois `-`, `AAAA_MM_DD` do sábado; a pasta `{AAAA}` é o ano do domingo.
- **Só as ~5 últimas semanas existem nesse caminho** (semanas de 11, 18, 25/10, 01 e 08/11 deram 200; de 04/10 para trás, 404).
  Isso basta para "a mais recente", mas **a regra da pasta na virada de ano não foi verificável** (semana de 28/12/2025
  deu 404 nas duas pastas), por isso há o plano B abaixo.
- XLSX com 5 abas (`CAPITAIS`, `MUNICIPIOS`, `ESTADOS`, `REGIOES`, `BRASIL`). Na aba `BRASIL`: A = início da semana
  (serial do Excel), B = fim, C = `BRASIL`, D = produto, E = nº de postos, F = unidade (`R$/l`), G = preço médio
  de revenda.
- Lido nos dois arquivos, e bate com a Síntese em PDF da ANP:

| Semana | Gasolina comum | Etanol hidratado | Postos (gas./etanol) |
|---|---|---|---|
| 01 a 07/11/2026 (serial 46327–46333) | 6,47 | 4,15 (a célula traz `4.1500000000000004`) | 4.582 / 3.916 |
| 08 a 14/11/2026 (serial 46334–46340) | 6,48 | 4,25 | 4.504 / 3.850 |

- Os seriais convertem para domingo e sábado, respectivamente (conferido).
- O arquivo da semana já existe no domingo seguinte ao fim dela.

## Decisões

1. **Fonte única: o XLSX** (o PDF não é usado). O rótulo da fonte passa a ser "ANP: Levantamento de Preços de
   Combustíveis (preços médios semanais)", apontando para a página estável do levantamento.
2. **Leitura com `fflate`** (nova dependência de produção, sem dependências próprias; confirmado no Context7:
   `unzipSync` com `filter` por `name`/`originalSize`) e extrator mínimo de XML. Nada de `xlsx`/SheetJS nem `exceljs`.
   Descompactar só `xl/workbook.xml`, `xl/_rels/workbook.xml.rels`, `xl/sharedStrings.xml` e a aba `BRASIL`, com
   limite de tamanho por entrada (10 MB) e de download (5 MB).
3. **Localizar a aba pelo nome** (`workbook.xml` + `workbook.xml.rels`), não por `sheet5.xml`. **Localizar as linhas
   pelo conteúdo** das colunas C (`BRASIL`) e D (produto), não pelo número da linha.
4. **Descoberta do arquivo:** (a) tentar o nome calculado para a última semana encerrada e até 4 semanas para trás
   (parando na semana já gravada); (b) se nenhuma responder 200 com tipo de planilha, **ler os `href`
   `resumo_semanal_lpc_*.xlsx` da página de listagem** e usar a semana mais nova. User-Agent explícito e genérico
   (`calculadoraonlinebr-sync/1.0`).
5. **"Ainda não publicada" é sucesso.** Se a semana mais nova disponível já é a gravada (ou nenhuma é mais nova),
   retorna `up-to-date` sem erro. Falha de rede, arquivo inválido ou semana divergente é erro.
6. **Armazenamento: um único documento** `fuel_prices` com `_id: "BRASIL"` contendo semana (início/fim, ISO), os
   dois preços, nº de postos, URL do arquivo e `fetchedAt`. A gravação é atômica (um `replaceOne`/`updateOne`),
   então gasolina e etanol nunca vêm de semanas diferentes. Só avança: ignora semana mais antiga que a gravada.
7. **Validação antes de gravar** (tudo ou nada): aba `BRASIL` e as duas linhas encontradas; unidade `R$/l`;
   preços numéricos arredondados a 2 casas (`4.1500000000000004` → `4,15`); faixa gasolina 2–15 e etanol 1,5–12 R$/L;
   mais de 100 postos por produto; início = domingo e fim = sábado, 6 dias de intervalo (conversão do serial em UTC);
   semana lida igual à do nome do arquivo.
8. **Sincronização como etapa de `/api/cron/indicadores`**, independente das demais (`Promise.allSettled`).
   Roda quando `only` está ausente, é `combustiveis` **ou é `indicadores`** (o cron-job.org pode estar com jobs
   separados `?only=indicadores` e `?only=tesouro`; assim o job de indicadores já atualiza os combustíveis, e um job
   dedicado `?only=combustiveis` é opcional). **Falha de combustível só muda o status HTTP em `only=combustiveis`**;
   nos outros casos aparece no corpo (`fuel: { error }`) e no log, sem derrubar o job existente.
9. **Leitura:** `getFuelPrices()` em `marketData.server.ts`, cache de 1 h por instância (padrão dos indicadores).
   Sem banco ou dado com mais de 21 dias → fallback do código (a semana 08 a 14/11 acima) com `stale: true`.
10. **Páginas:** as duas rotas ganham `loader` que **nunca lança** (erro → fallback) e devolve JSON com o mesmo
    `Cache-Control` de `marketIndicatorsLoader`; o `headers` do `root.tsx` continua valendo para o HTML. Uma função
    `buildFaqItems(fuel)` por página alimenta **o `meta` (JSON-LD) e o componente**, para o schema bater com o
    texto visível; no `meta`, `data` pode ser `undefined` e cai no fallback. `FUEL_REFERENCE` sai de
    `vehicle-sources.ts`; `VEHICLE_SOURCES_REVIEWED_AT` continua como data de revisão (`updatedAt`), e a semana da ANP
    vai no `reviewNote`. Os valores padrão dos formulários (PRD) não mudam.
11. **Operação:** `scripts/syncMarket.ts` ganha o passo de combustíveis e um modo só-combustíveis
    (`npm run sync:fuel`), para não reexecutar indicadores/Tesouro. `CLAUDE.md` ganha o bloco de combustíveis na
    seção "Indicadores de mercado".

## Fora do escopo

- Preço por estado ou município (a planilha tem; as páginas usam a média Brasil).
- Diesel, GLP e GNV.
- Tarifa de energia (a ANEEL não publica média em R$/kWh com impostos em formato que eu tenha conseguido ler).
- Mudar o preço padrão do formulário.

## Verificação

1. Script `tsx` que roda o parser sobre os dois XLSX reais e confere os valores e datas da tabela acima, mais
   casos negativos montados em memória (aba ausente, unidade errada, semana divergente, preço fora da faixa,
   zip acima do limite).
2. Teste da busca da última semana e do plano B (listagem) contra a ANP real; `Date` simulada na virada de ano
   para o cálculo do nome do arquivo.
3. `tsc`/`eslint` nos arquivos tocados e `npm run build`.
4. Gravação no banco apontado por `.env.local`: **conferir (sem imprimir a URI) qual banco é** antes de rodar
   `npm run sync:fuel`; uma segunda execução não baixa o XLSX e informa `up-to-date`.
5. HTML das duas páginas servido localmente mostra semana e preços do banco, e o fallback com o banco vazio.
6. **Não verificável localmente:** o acesso da Vercel (IPs de datacenter) ao gov.br. Só se confirma após o deploy,
   chamando a rota do cron em produção; registrar isso no relatório.

## Resultado da implementação (2026-11-15)

Implementado conforme as decisões acima. Verificado:

- `scripts/checkFuelParser.ts`: 25 verificações, incluindo os dois XLSX reais (6,47/4,15 e 6,48/4,25), semanas e
  virada de ano, listagem, defasagem e 9 casos negativos. Todas passam.
- Rede real: banco vazio no domingo 15/11 → semana 08–14/11; já gravada → sem download; semana mais nova que a
  gravada → baixa; plano B pela página de listagem (nomes calculados forçados a falhar) → mesma semana.
- Banco descartável no mesmo cluster (nunca o `calculadoraonlinebr`): 1ª execução grava, 2ª sai em ~1,4 s como
  `up-to-date` sem baixar; leitura por `getFuelPrices`; rota do cron chamada pelo `loader` (401, 400, `only=combustiveis`
  em `up-to-date` e `updated`, `only=indicadores` rodando indicadores + combustíveis); banco removido ao final.
- Páginas servidas localmente: com o banco, texto visível e JSON-LD da FAQ do PHEV mostram os valores do banco
  (testado com 6,99/4,77) e a semana; sem banco, caem no fallback (6,48/4,25).
- Achado: o `remix-serve` local devolve 404 nas rotas de cron (incluindo a de loterias, que já existia); em produção
  elas respondem 401. A lógica do cron foi testada chamando o `loader` direto.

Pendente (só se confirma em produção): o acesso da Vercel ao gov.br e a primeira gravação em `fuel_prices`. Depois
do deploy, chamar `GET /api/cron/indicadores?only=combustiveis` com a credencial do cron e conferir
`fuel.status`. Até lá as páginas usam o fallback (08–14/11/2026).
