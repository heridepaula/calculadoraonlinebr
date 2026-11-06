# Spec — Gerador da Quina com base de dados, cron e estratégias (paridade com Lotofácil e Mega-Sena)

- **Data:** 2026-11-06
- **Status:** implementado em 2026-11-06 (decisões D1–D8 aprovadas como propostas; resultados na §11)
- **Referências:**
  - spec da Mega-Sena (`2026-11-06-mega-sena-gerador-design.md`)
  - núcleo genérico `app/lib/lottery/*`
  - commits `69fff1f` e `b3dba02`

## 1. Objetivo

Levar para a Quina tudo o que a Lotofácil e a Mega-Sena já têm, reaproveitando o núcleo genérico:

- histórico completo no MongoDB, com premiação;
- cron que grava cada sorteio novo;
- estatísticas da página calculadas do banco e atualizadas sozinhas;
- página do gerador refeita no padrão atual:
  - estratégia acima da cartela, filtros em chips;
  - **Gerar jogo** como botão principal e **Surpresinha** com estratégia sorteada;
  - histórico com badges e jogo novo com o mínimo de dezenas em comum;
  - faixa com o próximo concurso;
  - card do último resultado com premiação.

A URL e o SEO (`/calculadoras/loterias/gerador-quina`) não mudam.

Como o núcleo já é genérico, o trabalho é sobretudo **configuração mais a página**. Há dois pontos novos: as faixas de prêmio mudaram com o tempo (§4.2) e a cartela é maior (§7.1).

## 2. Verificação das fontes (fase 0, já feita)

| Fonte | URL | Resultado em 2026-11-06 |
|---|---|---|
| Giga Sena | `https://www.gigasena.com.br/quina` | 200; mesmos seletores (`li.gs-game_ball`, `#gs-game_s`, `#gs-game_d`) → concurso 7160, 05/11/2026, 05-18-29-33-63 |
| API da Caixa | `…/portaldeloterias/api/quina` | 200; 4 faixas (5, 4, 3 e 2 acertos), próximo concurso 7161 em 06/11/2026, estimativa R$ 1,3 milhão |
| loterias-api | `…/api/quina` (histórico) e `/latest` | 200; **7.160 concursos** numa chamada (3,7 s), todos com 5 dezenas |

Os sorteios recentes acontecem de segunda a sábado e há concursos extras.

## 3. O que muda em relação às outras loterias

| Item | Lotofácil | Mega-Sena | **Quina** |
|---|---|---|---|
| Universo | 1–25 | 1–60 | **1–80** |
| Dezenas por jogo | 15 | 6 | **5** |
| Faixas | 15…11 | 6, 5, 4 | **5 (quina), 4 (quadra), 3 (terno), 2 (duque)** |
| Volante | 5 × 5 | 10 × 6 | **10 × 8** |
| Concursos | ~3.800 | ~3.080 | **~7.160** |
| Intervalo médio entre saídas de uma dezena | ~1,7 | 10 | **16** |

Consequências:

- **Atrasadas:** atraso ≥ 32 concursos (2× o intervalo médio); no máximo 10.
- **Quentes e frias:** listas de 20 e 12 dezenas.
- **Primos:** 22 primos até 80. O filtro continua disponível, desligado por padrão, como na Mega-Sena.
- **Fibonacci:** 9 números até 80; sinal fraco, então **fica fora**, como na Mega-Sena.
- **Seguidos:** com 5 de 80, jogos sem nenhum par seguido são a maioria. O limite "comum" sai do histórico (provavelmente ≤ 1 ou ≤ 2).
- **Linhas do volante:** 8 linhas de 10 dezenas. O limite comum sai do histórico.
- **Máximo de números fixos:** 4 (fixar os 5 tira a aleatoriedade).
- **Filtros oferecidos:** pares, primos, seguidos e por linha. **Ligados por padrão:** pares, seguidos e por linha.

## 4. Dados

### 4.1 Coleção e definição

- Coleção `quina_resultados` (mesmo banco, índice único em `concurso`) e mesmo formato de documento das outras loterias.
- Nova entrada `QUINA` em `app/lib/lottery/definitions.ts`. `LotteryId` passa a incluir `"quina"`.
- **Chave do histórico:** a mesma da página antiga, `quina-history`. O formato é compatível (`numbers`, `strategy`, `date`, `statistics.pairs/odds/sum`), então os jogos salvos continuam aparecendo.
- **Tema:** roxo, cor tradicional da Quina, em `.theme-quina`. A escala é deslocada para que o texto branco sobre `lot-600` tenha contraste AA, como foi feito no verde da Mega-Sena.

### 4.2 Faixas de prêmio que mudaram (ponto novo)

| Concursos | Faixas | Quantidade |
|---|---|---|
| 1–3676 (até dez/2014) | 5, 4 e 3 acertos | 3.676 |
| 3677 em diante | 5, 4, 3 e 2 acertos (duque) | 3.484 |

Hoje `mapPremiacoes` só grava a premiação se **todas** as faixas da definição vierem. Com isso, metade do histórico da Quina ficaria sem premiação.

**Proposta (D2):** a definição passa a declarar o número mínimo de faixas obrigatórias (`requiredTiers`: Quina = 3; nas outras, todas). As faixas ausentes no fim da lista (o duque nos concursos antigos) são simplesmente omitidas. A Lotofácil e a Mega-Sena continuam iguais, e o teste de regressão confirma isso.

### 4.3 Carga inicial

- `npx tsx scripts/seedLottery.ts quina`: uma chamada à loterias-api, `bulkWrite` em lotes de 500 (~15 lotes).
- `npx tsx scripts/backfillLottery.ts quina --check` deve terminar com faltando = 0.

## 5. Estatísticas

São as mesmas métricas e o mesmo cache por loteria, calculados por `computeStats(QUINA, …)`. Também há um snapshot de fallback, gerado depois da carga.

## 6. Cron

- Usa a rota existente `GET /api/cron/quina`. Basta incluir a Quina em `isLotteryId`; a rota não muda.
- Na `vercel.json`: `{ "path": "/api/cron/quina", "schedule": "30 1 * * *" }`, ou seja, todo dia às 22h30 (horário de Brasília). É idempotente e trata sorteios em qualquer dia e os extras.
- Com isso o projeto fica com **3 crons**. **Verificar se o plano da Vercel comporta 3 crons diários** (decisão D5).

## 7. Página `gerador-quina` (refatoração)

Hoje são 1.418 linhas, com estatísticas fixas no código (`QUINA_STATS`) e presets que se sobrepõem. A página nova segue a da Mega-Sena:

- loader com as estatísticas do banco;
- `NextDrawBanner`;
- `LotteryGenerator` com a definição da Quina;
- `LatestResultCard` com as faixas Quina, Quadra, Terno e Duque;
- card de estatísticas;
- FAQ dinâmico mais as chances da Quina: quina 1 em 24.040.016, quadra 1 em 64.106, terno 1 em 866 e duque 1 em 36;
- `RelatedCalculators`.

O meta, o canonical e o breadcrumb ficam como estão.

**Proposta (D3), para não ter uma terceira cópia de ~350 linhas:** extrair o card de estatísticas e as listas quentes, frias e atrasadas para `LotteryStatsCard`, usado pela Mega-Sena e pela Quina. A Lotofácil pode migrar depois, porque tem a seção de Fibonacci. A página da Quina fica com cerca de 150 linhas, a maior parte meta e JSON-LD.

### 7.1 Cartela 10 × 8 no mobile (ponto novo)

- Na Mega-Sena (6 linhas), o botão **Gerar jogo** termina a 840 px de uma tela de 844 px.
- A Quina tem 2 linhas a mais (+96 px), então o botão ficaria fora da primeira tela.

Opções (decisão D4):

| Opção | Efeito |
|---|---|
| **(a) Recomendada.** Barra fixa no rodapé do celular com **Gerar jogo** e **Surpresinha**, que aparece só enquanto os botões originais estão fora da tela | Mantém alvos de 44 px e vale para as três loterias sem mudar o layout atual |
| (b) Células de 36 px de altura só na Quina | Cabe numa tela, mas fica abaixo da regra de 44 px do projeto (acima do mínimo de 24 px da WCAG 2.5.8) |
| (c) Aceitar rolar até o botão | Mais simples, mas é o oposto do que foi pedido para a Lotofácil |

## 8. Critérios de aceite

**Dados e cron**
- [ ] `quina_resultados` tem os concursos de 1 até o último, sem buracos.
- [ ] A premiação cobre 100% dos concursos: 3 faixas até o 3676 e 4 faixas a partir do 3677.
- [ ] `GET /api/cron/quina` responde 401 sem token. Com token, responde 200 e `created: false` para um concurso que já existe.
- [ ] Com o Giga Sena fora do ar, o cron grava via Caixa ou loterias-api.
- [ ] O próximo concurso e a estimativa aparecem na página sem redeploy.

**Gerador**
- [ ] 10.000 jogos com 5 dezenas distintas de 1 a 80, dentro das regras ativas.
- [ ] 2.000 Surpresinhas sem falha.
- [ ] Os conflitos são detectados (por exemplo, 5 fixos ou 3 fixos na mesma linha com limite 2).
- [ ] Com 20 jogos no histórico, nenhum jogo escolhido fica acima da mediana de interseção.

**Página**
- [ ] Mobile (500 × 844): sem rolagem horizontal, alvos ≥ 44 px, e a opção escolhida em D4 funciona.
- [ ] Desktop: estratégia à esquerda e cartela à direita.
- [ ] Canonical, JSON-LD e breadcrumb intactos; o FAQ usa números do banco.
- [ ] ESLint e `tsc` sem erros nos arquivos tocados; o build passa.

**Regressão**
- [ ] As estatísticas e os jogos gerados com semente fixa da Lotofácil e da Mega-Sena ficam idênticos antes e depois.
- [ ] A Lotofácil e a Mega-Sena continuam com o mesmo layout e a mesma premiação exibida.

## 9. Decisões para validar

| # | Decisão | Proposta |
|---|---|---|
| D1 | Configuração da Quina | 20 quentes, 12 frias, atrasada com atraso ≥ 32 (máx. 10), até 4 fixos; filtros pares/primos/seguidos/por linha; padrão pares/seguidos/por linha; sem Fibonacci |
| D2 | Concursos antigos sem duque | Premiação com faixas mínimas por loteria (`requiredTiers`: Quina = 3) |
| D3 | Card de estatísticas compartilhado | Sim: `LotteryStatsCard` para Mega-Sena e Quina |
| D4 | Cartela 10 × 8 no celular | (a) barra fixa com Gerar jogo/Surpresinha quando os botões saem da tela |
| D5 | Cron da Quina diário às 22h30 (3 crons no total) | Sim, conferindo o limite do plano da Vercel |
| D6 | Tema | Roxo (`.theme-quina`), com contraste AA |
| D7 | Histórico antigo | Reaproveitar a chave `quina-history` |
| D8 | Apostas com 6–15 números | Fora do escopo, como nas outras loterias |

## 10. Fases

1. **Núcleo:** `QUINA` na definição, `requiredTiers`, faixas nomeadas no `LatestResultCard`, tema roxo. Regressão da Lotofácil e da Mega-Sena.
2. **Dados:** seed, backfill e conferência da premiação por época. Snapshot de fallback.
3. **Cron:** entrada na `vercel.json` e teste local com token.
4. **Página:** `LotteryStatsCard` (D3), rota nova da Quina, barra fixa (D4).
5. **Verificação:** critérios do §8 (build de produção + Chrome DevTools, mobile e desktop).
6. **Commit e push** (sob pedido). Conferir a primeira execução do cron nos logs da Vercel.

## 11. Implementação: resultados

- **Plano gratuito (Hobby) da Vercel:** até 100 cron jobs por projeto, cada um no máximo 1 vez por dia, e o horário pode variar dentro da hora agendada. Os 3 crons (Lotofácil `30 23 * * 1-6`, Mega-Sena `0 1 * * *`, Quina `30 1 * * *`) são diários e cabem no plano. Fonte: <https://vercel.com/docs/cron-jobs/usage-and-pricing>.
- **Carga:** 7.160 concursos, faltando = 0. Premiação: 3.676 concursos antigos com 3 faixas e 3.484 a partir do 3677 com 4 faixas (`requiredTiers` = 3).
- **Estatísticas iniciais:**
  - Pares 2–4 (79,5% dos concursos), primos 0–2, seguidos ≤ 1 (76,7%) e no máximo 2 por linha (90%).
  - Soma ideal 167–237; aceitação padrão ≈ 28%.
  - 9 dezenas atrasadas.
- **Motor:** 10.000 jogos e 2.000 Surpresinhas sem falha. Conflitos detectados: 5 fixos, linha, seguidos e pares. Nenhum dos jogos escolhidos ficou acima da mediana de interseção.
- **Cron local:** `quina` 200 com faixas [5, 4, 3, 2] e próximo concurso 7161; 401 sem token; 404 para loteria desconhecida.
- **Regressão:** as estatísticas e os jogos com semente fixa da Lotofácil e da Mega-Sena ficaram idênticos (98 itens cada).
- **D3:** `LotteryStatsCard` passou a ser usado pela Mega-Sena (195 linhas) e pela Quina (186 linhas).
- **D4:** a barra fixa aparece só no celular, enquanto os botões estão abaixo da tela. Na Quina (500 × 844) ela aparece; na Mega-Sena e na Lotofácil não, porque os botões já ficam visíveis.
- **Correção encontrada:**
  - `bg-background-primary` e `bg-background-secondary` não existem no Tailwind deste projeto: renderizam transparente.
  - Na barra fixa foram usados `bg-background-dark` e `bg-neutral-surface`.
  - Os chips antigos continuam usando a classe inexistente, mas lá o fundo transparente não atrapalha.
