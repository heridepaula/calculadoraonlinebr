# Spec — Gerador da Mega-Sena com base de dados, cron e estratégias (paridade com a Lotofácil)

- **Data:** 2026-11-06
- **Status:** implementado em 2026-11-06 (decisões D1–D9 aprovadas como propostas; ajustes na §11)
- **Referência:** implementação da Lotofácil (commits `67c984b` → `d58079d`)

## 1. Objetivo

Levar para a Mega-Sena tudo o que a Lotofácil já tem:

1. Histórico completo dos concursos no MongoDB, com premiação.
2. Cron na Vercel que grava cada sorteio novo.
3. Estatísticas da página calculadas do banco e atualizadas sozinhas após cada sorteio.
4. Página do gerador refeita no padrão novo: estratégia acima da cartela, filtros em chips, **Gerar jogo** como botão principal, **Surpresinha** com estratégia sorteada, histórico com badges e jogo novo com o mínimo de dezenas em comum com o histórico.

A URL e o SEO da página atual (`/calculadoras/loterias/gerador-mega-sena`) não mudam.

## 2. O que muda da Lotofácil para a Mega-Sena

| Item | Lotofácil | Mega-Sena |
|---|---|---|
| Universo | 1–25 | 1–60 |
| Dezenas por jogo | 15 | 6 |
| Faixas de prêmio | 15, 14, 13, 12, 11 | 6 (sena), 5 (quina), 4 (quadra) |
| Sorteios | seg. a sáb. | ter., qui. e sáb. (a confirmar na fase 0) |
| Volante | 5 × 5 | 10 colunas × 6 linhas |
| Concursos (aprox.) | ~3.800 | ~2.900 |
| Fonte do seed | `raw_draws.jsonl` do projeto `lottery` | **não existe** no projeto `lottery` (só tem Lotofácil); ver §4.4 |

Consequências para as estatísticas e os filtros:

- **Quentes, frios e atrasados.** Com 60 dezenas e 6 por sorteio, cada dezena sai em média a cada 10 concursos. Os tamanhos das listas e o critério de "atrasado" mudam (§5.2).
- **Pares.** A faixa comum fica perto de 2–4 de 6. O valor vem do banco, não é fixo no código.
- **Soma.** A média fica perto de 183. As faixas baixa/ideal/alta vêm dos percentis, como na Lotofácil.
- **Primos.** Há 17 primos até 60. O filtro continua útil.
- **Fibonacci.** Há 9 números até 60 (1, 2, 3, 5, 8, 13, 21, 34, 55). O sinal é fraco; proponho **remover** na Mega (§9, decisão D3).
- **Seguidos.** Mais de 2 seguidos é raro. O filtro continua, com o limite vindo do histórico.
- **Novo: linhas do volante.** Limita quantas dezenas caem na mesma linha (01–10, 11–20, …). É um filtro clássico da Mega e substitui o Fibonacci.

## 3. Arquitetura proposta: núcleo genérico de loteria

Hoje motor, estatísticas, componente e coleta são específicos da Lotofácil, mas quase tudo depende só de três números (universo, tamanho do jogo e faixas). Proposta (decisão D1):

```
app/lib/lottery/
  definitions.ts          LotteryDef: id, nome, universo, tamanho do jogo, faixas,
                          layout do volante, coleção Mongo, URLs das fontes, tamanhos hot/cold,
                          filtros disponíveis
  stats.ts                computeStats(def, draws)   ← hoje computeLotofacilStats
  generator.ts            generateGame(def, config, stats, opts) ← hoje lotofacil-generator
app/components/calculators/LotteryGenerator.tsx   ← hoje LotofacilGenerator (recebe def + stats)
app/repositories/lottery.repository.server.ts     ← parametrizado pela coleção
app/services/lottery/
  scrapers.server.ts      Giga Sena / Caixa / loterias-api parametrizados por def
  lotteryService.server.ts fetchLatest(def)        ← hoje fetchLatestLotofacil
  statistics.server.ts    getStats(def) com cache por loteria
app/routes/api.cron.$lottery.ts   ← substitui api.cron.lotofacil.ts (mesma URL para a Lotofácil)
```

- A Lotofácil passa a usar o núcleo **sem mudança visível**. Validação: §8, item R.
- `lotofacil-*.ts` viram reexports finos ou são removidos.
- A Quina pode entrar depois só com uma nova `LotteryDef`.

**Alternativa B:** copiar os arquivos da Lotofácil e trocar as constantes. É mais rápido agora, mas deixa ~1.500 linhas duplicadas, e cada correção futura precisa ser feita duas vezes. **Recomendo A.**

## 4. Dados

### 4.1 Coleção

- `megasena_resultados` no mesmo banco (`MONGODB_DB`, hoje `loterias`), com índice único em `concurso`.
- Documento:
  ```ts
  {
    concurso: number;
    data_sorteio: Date;                // UTC meia-noite
    dezenas: number[];                 // 6 distintas, 1–60, crescente
    acumulou?: boolean;
    premiacoes?: { acertos: 4 | 5 | 6; ganhadores: number; rateio: number }[];
    // opcionais (D5): próximo concurso
    proximo?: { concurso: number; data: Date; estimativa: number };
  }
  ```
- Gravação idempotente por `concurso` (upsert), como `saveLotofacilResult`. Ela só sobrescreve a premiação quando a coleta trouxe uma.

### 4.2 Validação de um resultado

- 6 dezenas distintas, de 1 a 60.
- Concurso inteiro ≥ 1.
- Data válida.
- Ganhadores e rateio ≥ 0.

### 4.3 Fontes (mesma cadeia da Lotofácil)

| Ordem | Fonte | Uso | A verificar na fase 0 |
|---|---|---|---|
| 1 | Giga Sena (HTML, cheerio) | dezenas do último concurso, timeout de 7 s | URL (`/mega-sena`?) e seletores |
| 2 | API da Caixa `servicebus2…/api/megasena` | dezenas + premiação | responde 403 a partir da Vercel, como na Lotofácil |
| 3 | loterias-api `…/api/megasena` | dezenas + premiação (fallback) | formato do payload |

A premiação é anexada ao resultado do Giga Sena pela primeira fonte que a tiver (Caixa e depois loterias-api). Mesma regra de hoje.

### 4.4 Carga inicial (seed/backfill)

Não há arquivo local da Mega-Sena. Opções (decisão D2):

- **(a) Recomendada.** `scripts/seedLottery.ts megasena` baixa o histórico completo da loterias-api numa única chamada (`/api/megasena` devolve todos os concursos), passa pelo adapter e grava com `bulkWrite` em lotes de 500.
- **(b)** Backfill concurso a concurso pela API da Caixa, rodando localmente. São ~2.900 requisições: lento, e a Caixa limita a taxa.
- Nos dois casos, `scripts/backfillLottery.ts megasena` completa os concursos que faltarem.
- A coleção é criada do zero. Não se apaga nada da Lotofácil.

## 5. Estatísticas (dinâmicas)

### 5.1 Comportamento

Igual ao da Lotofácil:

- O loader chama `getStats(megasena)`.
- O cache em memória é válido enquanto o último concurso do banco não muda.
- Se o banco estiver indisponível, a página usa um snapshot embutido (`FALLBACK_STATS` da Mega) e mostra o aviso "dados de referência".

### 5.2 Métricas

| Métrica | Regra para a Mega (proposta) |
|---|---|
| Frequência | contagem e % por dezena, 1–60 |
| Quentes / médias / frias | 15 mais sorteadas / restante / 10 menos sorteadas |
| Atrasadas | atraso atual ≥ 2 × atraso médio esperado (≈ 20 concursos), no máximo 10, da mais atrasada para a menos |
| Pares | faixa que cobre ≥ 75% dos concursos + moda |
| Primos | idem |
| Soma | média, p25–p75 (ideal), p10–p90, p5–p95 |
| Seguidos | maior sequência tolerada em ≥ 75% dos concursos |
| Linhas do volante | máximo de dezenas na mesma linha em ≥ 75% dos concursos (novo) |
| Repetidas do anterior | média |

Os tamanhos (15/10/10) ficam na `LotteryDef`, para poderem ser ajustados sem mexer na lógica.

## 6. Cron

- Rota `GET /api/cron/megasena`, protegida por `Authorization: Bearer $CRON_SECRET` (mesma verificação com `timingSafeEqual`).
  - Resposta: JSON com `source`, `provider`, `avisos`, `created`, `concurso`, `dezenas` e `premiacoes`.
  - Em falha de todas as fontes: 500.
- Na `vercel.json`:
  ```json
  { "path": "/api/cron/megasena", "schedule": "0 1 * * 3,5,0" }
  ```
  - A Mega sorteia por volta das 20h (BRT), então o cron roda às 22h BRT de ter., qui. e sáb.
  - Alternativa: rodar todo dia. É idempotente e recupera sorteios atrasados.
  - **Verificar o limite de crons do plano Vercel** (no Hobby, cada cron roda no máximo uma vez por dia e o horário não é exato).
- A Lotofácil continua em `/api/cron/lotofacil`, com a mesma URL e o mesmo agendamento.

## 7. Página `gerador-mega-sena` (refatoração)

Hoje são 1.415 linhas, com estatísticas fixas no código (`MEGA_SENA_STATS`) e presets de estratégia que se sobrepõem. A meta é ~400 linhas no padrão da Lotofácil:

1. **Loader:** estatísticas do banco.
2. **Meta e SEO:** canonical e JSON-LD mantidos; o FAQ passa a usar números do banco (`buildStatsFaq`).
3. **Gerador** (`LotteryGenerator`, def = Mega-Sena):
   - **Origem dos números:** Equilibrado, Quentes, Frios, Atrasados e Aleatório, mais "Ajustar %".
   - **Soma:** Baixa, Ideal, Alta ou Livre (exclusivas).
   - **Filtros em chips** (tocar liga/desliga; "⚙ Faixas" ajusta o mínimo e o máximo): Pares, Primos, Seguidos e Linhas. Mais os atalhos "↺ Padrão" e "Sem filtros".
   - **Resumo das regras** e % estimado de combinações viáveis; conflitos bloqueiam só o **Gerar jogo**.
   - **Cartela 10 × 6** em que tocar fixa números (até 5, decisão D6).
   - **Botões:** **Gerar jogo** (principal), **Surpresinha** (estratégia sorteada) e Limpar.
   - **Resultado:** bolas, métricas, regras aplicadas, badges da estratégia, "máximo de N dezenas em comum", copiar e imprimir.
   - **Histórico:** localStorage em chave própria (`megasena-history`), até 50 jogos, com badges e tooltip. Cada jogo novo minimiza as dezenas em comum com o histórico.
4. **Card de estatísticas:**
   - Quentes, médias, frias e atrasadas (com o atraso de cada uma).
   - Padrões: pares, soma, primos, seguidos e linhas.
   - Último concurso, com data e dezenas.
5. **FAQ, uso responsável e `RelatedCalculators`:** mantidos.

**Sai:** "gerar 1/5/10 jogos", presets sobrepostos, "jogos da sessão" separados do histórico e o histórico antigo em HTML.

**Histórico antigo do usuário:** os jogos salvos sob a chave antiga são lidos e migrados, sem badges, com o texto da estratégia (decisão D7).

### 7.1 Layout mobile (500 × 844)

Na Lotofácil, estratégia, cartela e botão principal cabem numa tela. Na Mega, a cartela tem 60 números:

- Com 10 colunas e alvos de 44 px de altura, cada número fica com ~42 px de largura a 500 px. A cartela tem ~300 px de altura.
- Estratégia (~380 px) + cartela (~300) + botões (~60) ≈ 740 px, o que cabe na tela.
- Se não couber, o fallback é recolher a "Origem" num chip-resumo (decisão D4).

## 8. Critérios de aceite

**Dados e cron**
- [ ] A coleção `megasena_resultados` tem todos os concursos de 1 até o último, sem buracos (o script de verificação mostra faltando = 0).
- [ ] Todo concurso tem 6 dezenas válidas. Pelo menos 99% têm premiação (nas faixas 6, 5 e 4).
- [ ] `GET /api/cron/megasena`:
  - sem token: 401;
  - com token: 200, `created: false` quando o concurso já existe;
  - com Giga Sena fora do ar: grava via Caixa ou loterias-api e devolve `source: "fallback"`.
- [ ] Depois do cron gravar um concurso novo, a página mostra o novo "último concurso" sem redeploy.

**Gerador**
- [ ] Todo jogo tem 6 dezenas distintas de 1–60 e respeita todas as regras ativas. Teste com 10.000 gerações por semente.
- [ ] Conflitos (por exemplo, pares 5–6 com soma baixa e fixos impossíveis) aparecem antes de gerar e desabilitam só o **Gerar jogo**.
- [ ] A Surpresinha sempre devolve um jogo válido e mostra o badge 🎲.
- [ ] Com 20 jogos no histórico, o jogo novo tem uma soma de interseções menor ou igual à mediana de 100 jogos aleatórios válidos.
- [ ] Os badges mostram o nome no hover, no foco e no toque.

**Página**
- [ ] Mobile (500 × 844): sem rolagem horizontal; alvos ≥ 44 px de altura; contraste AA.
- [ ] Desktop (≥ 1024): estratégia à esquerda e cartela à direita.
- [ ] Canonical, JSON-LD e breadcrumb intactos; o FAQ usa números do banco.
- [ ] ESLint e `tsc` sem erros nos arquivos tocados; `npm run build` OK.

**Regressão da Lotofácil (R)** (se D1 = A)
- [ ] `/api/cron/lotofacil` responde igual a antes.
- [ ] As estatísticas da página da Lotofácil ficam idênticas antes e depois (comparação do JSON de `getStats`).
- [ ] O gerador da Lotofácil se comporta igual. O histórico salvo continua legível.

## 9. Decisões para validar

| # | Decisão | Proposta |
|---|---|---|
| D1 | Núcleo genérico (A) ou cópia adaptada (B) | **A** |
| D2 | Seed: loterias-api numa chamada (a) ou Caixa concurso a concurso (b) | **a**, completando com a Caixa |
| D3 | Remover o Fibonacci da Mega e criar o filtro "linhas do volante" | **Sim** |
| D4 | Cartela 10 × 6 também no mobile | **Sim**; se não couber numa tela, recolher a Origem |
| D5 | Gravar e exibir a estimativa do próximo concurso | **Sim** se a fonte trouxer; senão, fica fora |
| D6 | Máximo de números fixos | **5** (fixar 6 tira a aleatoriedade) |
| D7 | Migrar o histórico antigo do localStorage da Mega | **Sim**, sem badges |
| D8 | Apostas com 7–20 números (bolão/múltipla) | **Fora do escopo** (a Lotofácil também não tem) |
| D9 | Agendamento do cron: ter./qui./sáb. ou diário | **ter./qui./sáb.**, diário se o plano permitir |

## 10. Fases de implementação

0. **Verificação de fontes:** URL e seletores do Giga Sena, payloads da Caixa e da loterias-api para a Mega. Fixtures salvas para os testes do parser.
1. **Núcleo genérico** (D1): extrair `LotteryDef`, estatísticas, motor e repositório. A Lotofácil passa a usá-los. Rodar a regressão R.
2. **Dados da Mega:** definição, scrapers, serviço, seed e backfill. Rodar localmente e conferir a contagem.
3. **Cron:** rota genérica e `vercel.json`. Testar com token localmente e depois no deploy.
4. **Página:** refazer a rota e ajustar o componente para o volante 10 × 6, o filtro de linhas e o snapshot de fallback.
5. **Verificação:** critérios do §8 (build de produção local + Chrome DevTools, mobile e desktop).
6. **Commit e push** (sob pedido) e redeploy. Conferir a primeira execução do cron nos logs da Vercel.

## 11. Implementação: o que mudou em relação ao plano

- **Fase 0:** as três fontes responderam para a Mega-Sena (Giga Sena em `/mega-sena`, com os mesmos seletores da Lotofácil; Caixa e loterias-api em `/megasena`). A Caixa e a loterias-api trazem também o próximo concurso e a estimativa (D5 implementada).
- **Dias de sorteio (D9):** nos últimos 60 concursos houve sorteios em ter., qui. e dom., além de extras. O cron da Mega roda **todo dia** às 22h BRT (`0 1 * * *`), o que é idempotente.
- **Carga:** 3.081 concursos via loterias-api numa chamada, todos com premiação. O backfill confirmou zero faltando.
- **Filtros padrão da Mega:** pares, seguidos e por linha. Primos fica disponível, mas desligado. Pelos dados, a faixa comum de linhas é ≤ 3 (97% dos concursos) e a de seguidos é ≤ 2 (96,9%).
- **Histórico (D7):** a Mega reaproveita a chave antiga `mega-sena-history`, cujo formato é compatível. Não houve migração.
- **Tema:** cores `lot-*` por variáveis CSS (`.theme-lotofacil` rosa, `.theme-megasena` verde).
- **Layout mobile (D4):** uma regra global (`globals.css`: `button { min-height: 48px; padding: 12px 16px }` no mobile) inflava as células da cartela e os badges. Ela foi neutralizada nesses elementos.
  - Os chips de Origem ficaram compactos e cabem numa linha só.
  - A dica "toque para fixar" foi para a linha do título.
  - Resultado: em 500 × 844, a Mega termina em 840 px e a Lotofácil em 804 px.
- **Regressão R:** as estatísticas da Lotofácil (JSON completo) e 94 jogos/configurações gerados com semente fixa ficaram idênticos antes e depois da refatoração.
