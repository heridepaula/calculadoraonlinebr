# Spec: CNPJ alfanumérico no gerador e no validador

Data: 2026-11-15 · Base legal: IN RFB 2.229/2024 (CNPJ alfanumérico em vigor desde julho/2026)

## 1. Diagnóstico do estado atual

Arquivos: `app/routes/calculadoras.ferramentas.validar-cnpj.tsx` e `app/routes/calculadoras.ferramentas.gerador-cnpj.tsx`. Cada rota tem sua própria cópia da lógica (pesos, DV, formatação), sem módulo compartilhado e sem testes.

### Validador — já aceita letras, com lacunas

| # | Situação | Local |
|---|----------|-------|
| V1 | OK: `charValue = ASCII − 48`, regex `^[A-Z0-9]{12}\d{2}$`, pesos corretos, mensagem de erro específica para DV não numérico | `validar-cnpj.tsx:175-265` |
| V2 | **Bug:** `cleanCnpj` faz `toUpperCase()` *antes* de remover caracteres. `"ß"→"SS"`, `"ı"→"I"`, `"ſ"→"S"` passam a ser letras A–Z válidas. A ordem correta é remover `[^a-zA-Z0-9]` e só então maiúscula | `:175-177` |
| V3 | Sequências inválidas: lista fixa de 10 strings numéricas. Funciona (os 2 últimos são sempre dígitos, então 14 caracteres iguais só existem em dígitos), mas diverge da regra documentada (`/^(.)\1{13}$/`) | `:193-207` |
| V4 | `formatCnpj` com regex sem âncoras (`^…$`) | `:184` |
| V5 | `parseInt` sem radix; funções definidas dentro do componente (recriadas a cada render, impossíveis de testar isoladamente) | `:252-253` |
| V6 | Conteúdo: DirectAnswer já cita alfanumérico, mas FAQ, JSON-LD, bloco "Como funciona" e exemplos ainda falam só em "dígitos"; `dateModified: "2025-09-07"` | `:26-140, 484-600` |

### Gerador — só numérico (precisa da mudança principal)

| # | Situação | Local |
|---|----------|-------|
| G1 | Raiz gerada por `Math.floor(Math.random()*1e8)` → somente `0–9` | `gerador-cnpj.tsx:173-179` |
| G2 | DV usa `parseInt(char)`: com letra retorna `NaN` e quebra a soma. Precisa trocar por `charCodeAt − 48` | `:182-200` |
| G3 | `formatCnpj` com `\d` → não formata CNPJ alfanumérico | `:203-205` |
| G4 | Não há escolha de tipo; texto, FAQ, JSON-LD e guia dizem "14 dígitos numéricos" (`:123, :493, :499, :532, :603, :609`) | vários |
| G5 | `Math.random()` não é CSPRNG; aceitável para dados de teste, mas o novo gerador deve usar `crypto.getRandomValues` no cliente | `:174` |
| G6 | `dateModified: "2025-09-07"` | `:31` |

## 2. Regra de negócio (fonte da verdade)

- Estrutura `XX.XXX.XXX/XXXX-XX`: posições 1–12 (raiz + ordem) aceitam `0–9` e `A–Z`; posições 13–14 (DV) **só** `0–9`.
- Higienização: remover tudo que não seja `[a-zA-Z0-9]` **e depois** converter para maiúsculas (ordem importa, ver V2).
- Valor do caractere: `código ASCII − 48` (`'0'→0 … '9'→9`, `'A'→17 … 'Z'→42`).
- Módulo 11: pesos DV1 `[5,4,3,2,9,8,7,6,5,4,3,2]`, DV2 `[6,5,4,3,2,9,8,7,6,5,4,3,2]` (DV2 inclui DV1). `resto < 2 → 0`, senão `11 − resto`.
- Rejeitar 14 caracteres idênticos.
- CNPJ numérico antigo continua válido: é o caso particular em que nenhuma letra aparece (mesmo algoritmo).
- Validação é só matemática, não confirma existência/situação cadastral (manter o aviso já existente).

Atenção ao colar a implementação de referência da documentação: o regex dela `/^(.))\1{13}$/` tem um parêntese a mais (erro de sintaxe). O correto é `/^(.)\1{13}$/`.

## 3. Design

### 3.1 Módulo compartilhado `app/lib/cnpj.ts` (novo, puro, sem React)

```ts
export const CNPJ_WEIGHTS_DV1: readonly number[]
export const CNPJ_WEIGHTS_DV2: readonly number[]
export function sanitizeCnpj(input: string): string        // remove [^a-zA-Z0-9] e depois toUpperCase
export function cnpjCharValue(char: string): number        // charCodeAt - 48
export function calculateCnpjCheckDigits(base12: string): [number, number]
export function formatCnpj(input: string): string          // âncoras ^$; devolve input se len != 14
export function validateCnpj(input: string): { isValid: boolean; errorMessage?: string }
export function generateCnpj(opts: { alphanumeric: boolean; branch?: string }): string  // 14 chars limpos
```

- `validateCnpj` mantém as mensagens atuais: "CNPJ deve ter 14 caracteres", "Os dois últimos caracteres (dígitos verificadores) devem ser números", "CNPJ com sequência de caracteres iguais é inválido" (trocar "dígitos" por "caracteres"), "Dígitos verificadores não conferem".
- `generateCnpj`: raiz de 8 caracteres sorteados em `[0-9]` (numérico) ou `[0-9A-Z]` (alfanumérico) via `crypto.getRandomValues` com rejeição de viés (36 não divide 256: descartar bytes ≥ 252). Ordem padrão `0001` (matriz). No modo alfanumérico, **garantir ao menos 1 letra na raiz** (senão o resultado seria indistinguível de um numérico). Refazer se os 14 caracteres forem idênticos.
- Ambas as rotas passam a importar de `app/lib/cnpj.ts` e removem as cópias locais.

### 3.2 Validador (`validar-cnpj.tsx`)

- Trocar toda a lógica local por imports de `~/lib/cnpj`.
- Corrige V2–V5 por consequência. Campo continua com `maxLength={18}` e máscara via `formatCnpj` (já aceita letras).
- `inputMode="text"` + `autoCapitalize="characters"` + `autoComplete="off"` + `spellCheck={false}` no input, para o teclado mobile mostrar letras.
- Resultado: mostrar selo "Numérico" ou "Alfanumérico" (alfanumérico = contém ao menos uma letra nas 12 primeiras posições).
- Atualizar textos: título/descrição de FAQ, JSON-LD (`featureList`, `FAQPage`, `dateModified`), bloco "Como funciona" (explicar `ASCII − 48` com a tabela A=17…Z=42 e o exemplo `12.ABC.345/0001-88`), "CNPJs automaticamente inválidos" (caracteres iguais). Nova FAQ: "O que é o CNPJ alfanumérico e quando começa?" e "O validador aceita letras minúsculas?".

### 3.3 Gerador (`gerador-cnpj.tsx`)

- Novo controle de **tipo**: `Numérico` | `Alfanumérico` (radio/`OptionCards`, não esconder input com `sr-only`, ver CLAUDE.md). Padrão: **Alfanumérico**; o usuário pode trocar. Novo campo **Ordem/filial** editável, padrão `0001` (regras na seção 7); `handleReset` volta ao padrão.
- Mantém `withFormatting`, copiar automático e botão Gerar. Resultado mostra o tipo gerado e a decomposição raiz / ordem / DV.
- Aviso existente (CNPJ gerado é matematicamente válido, não existe na Receita, uso em testes) permanece.
- Atualizar textos: "14 dígitos" → "14 caracteres"; guia completo explica os dois formatos; FAQ nova: "O gerador cria CNPJ alfanumérico?"; `featureList`/JSON-LD/`dateModified`.

### 3.4 SEO e registros

- `app/lib/calculator-seo.ts` (`gerador-cnpj` linha 537, `validar-cnpj` linha 560): incluir "CNPJ alfanumérico" em `title`/`description` respeitando limites (título ≤ 60, descrição ≤ 160, `${SEO_YEAR}` onde houver ano) e em `keywords` ("CNPJ alfanumérico", "novo CNPJ com letras", "IN RFB 2.229").
- `app/lib/constants.ts` (descrição dos dois itens em `CALCULATORS`) e `app/data/category-guides.ts` (linhas do `chooser` de ferramentas).
- Depois de editar: `npm run sitemap:lastmod` (commitar o JSON) e, se o título mudar, `npm run og:pages -- gerador-cnpj validar-cnpj`.
- Não criar rota nova. JSON-LD continua como **objeto** (nunca `JSON.stringify`).

## 4. Fora de escopo

- Consulta de CNPJ na Receita / situação cadastral.
- Máscara de CNPJ em outras calculadoras (`lci-lca` só cita o termo).
- Alterar o validador de CPF.

## 5. Critérios de aceite e vetores de teste

Vetores já conferidos por cálculo (DV1, DV2):

| Base (12) | DV | Esperado |
|-----------|----|----------|
| `12ABC3450001` | 88 | `12.ABC.345/0001-88` válido |
| `ZZZZZZZZ0001` | 91 | `ZZ.ZZZ.ZZZ/0001-91` válido |
| `000000000001` | 91 | `00.000.000/0001-91` válido (numérico) |
| `112223330001` | 81 | `11.222.333/0001-81` válido (numérico) |

Casos que devem ser **inválidos**:

- `12ABC3450001-89` (DV errado) · `12ABC34500018A` (DV com letra) · 13 ou 15 caracteres
- `00000000000000`, `11111111111111` (iguais)
- `ß2ABC3450001XX` e entradas com `ß`, `ı`, `ſ` ou acento (não podem virar A–Z)
- `12abc3450001-88` (minúsculas) deve ser **válido** após sanitização

Gerador:

- 1.000 CNPJs alfanuméricos gerados: todos passam em `validateCnpj`, todos têm ≥ 1 letra nas posições 1–8, posições 13–14 numéricas.
- 1.000 numéricos: todos passam, nenhuma letra.
- Formatação `XX.XXX.XXX/XXXX-XX` correta nos dois tipos; cópia com/sem pontuação respeita o toggle.

Qualidade do código:

- `npx eslint` e `npx tsc --noEmit | grep cnpj` sem erros novos nos arquivos tocados.
- Como o projeto não tem suíte de testes, validar `app/lib/cnpj.ts` com um script `node:test` descartável (via `npx tsx`) com os vetores acima, sem adicionar dependência. Opcional: guardar em `scripts/check-cnpj.mjs` se o owner quiser regressão.
- Verificação visual com Playwright em 375 px e 1280 px: toggle de tipo, teclado alfanumérico no campo, contraste do selo (texto escuro sobre cor clara da paleta).
- `npm run seo:check` sem regressões nas duas URLs. Não rodar `npm run dev` depois da implementação (regra do owner).

## 6. Ordem de implementação sugerida

1. Criar `app/lib/cnpj.ts` e validar com os vetores.
2. Migrar o validador (menor risco) e corrigir V2.
3. Migrar o gerador + toggle de tipo.
4. Atualizar textos, FAQ, JSON-LD, SEO data, constants e category-guides.
5. `sitemap:lastmod`, `og:pages` se necessário, lint/tsc dos arquivos tocados, verificação visual.

## 7. Decisões fechadas (owner)

- **Tipo:** o usuário escolhe Numérico ou Alfanumérico; padrão **Alfanumérico**.
- **Ordem/filial:** campo editável, padrão `0001`. Regras do campo:
  - 4 caracteres; no modo numérico aceita só `0–9`, no alfanumérico `0–9A–Z` (minúsculas viram maiúsculas, o resto é descartado com a sanitização do 3.1).
  - Vazio ou incompleto (< 4) → erro "A ordem deve ter 4 caracteres" no clique em Gerar (usar `FieldFeedback`); não preencher silenciosamente.
  - `0000` é rejeitado ("0000 não é uma ordem válida"): a ordem começa em `0001`.
  - Ao trocar de alfanumérico para numérico com letras na ordem, limpar o campo para `0001` e avisar em texto curto.
  - `generateCnpj({ alphanumeric, branch })` valida `branch` e lança erro; a UI valida antes.
  - Reset volta para Alfanumérico + `0001`.
  - Mobile: `inputMode="text"`, `autoCapitalize="characters"`, alvo de toque ≥ 44 px.
- Critérios extras de aceite: ordem `00AB` gera CNPJ válido no modo alfanumérico e é recusada no numérico; ordem `0000` e vazia são recusadas.
