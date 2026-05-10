# Auditoria UX & SEO — CalculadoraOnlineBR

> Gerado em: 2026-05-10  
> Escopo: 66 páginas de calculadora (excluindo _index.tsx e $slug.tsx)  
> Método: análise estática de código — `app/routes/calculadoras.*.tsx`

---

## Legenda

| Símbolo | Significado |
|---|---|
| ✅ | OK em todos os arquivos da categoria |
| ❌ | Problema identificado |
| ⚠️ | Problema menor / melhoria desejável |
| — | Não aplicável |

---

## Resumo Executivo

| Dimensão | Status | Afeta |
|---|---|---|
| `export const meta` presente | ✅ | 66/66 páginas |
| FAQ component (JSX) | ✅ | 66/66 páginas |
| FAQPage JSON-LD | ✅ | 66/66 páginas |
| BreadcrumbList JSON-LD | ✅ | 66/66 páginas |
| RelatedCalculators | ✅ | 66/66 páginas |
| og:image:width / og:image:height | ✅ | 66/66 páginas |
| `alert()` bloqueando UX | ✅ | Corrigido em todas as páginas |
| Cores claras quebrando dark theme | ✅ | Corrigido em todas as páginas |
| Hover-only invisible no mobile | ✅ | Corrigido |
| Breadcrumb: `ResponsiveBreadcrumb` | ⚠️ | 8/66 têm; 58 usam componente antigo |
| Grids sem prefixo responsivo | ✅ | Nenhum encontrado |
| Copy feedback com estado visual | ✅ | Todos os geradores têm `copySuccess` |

---

## Problemas Críticos

### ❌ P1 — `alert()` bloqueando interação

Dois arquivos usam `alert()` nativo (bloqueia UI, péssimo em mobile):

| Arquivo | Linha | Chamada | Substituição sugerida |
|---|---|---|---|
| `trabalhista/aposentadoria.tsx` | 1347 | `alert("Simulação salva com sucesso!")` | Toast `useState` verde 2 s |
| `astrologia/compatibilidade-signos.tsx` | ~630 | `alert("Texto copiado para área de transferência! ✅")` | Estado `copySuccess` + feedback inline |

**Correção padrão:**
```tsx
const [toast, setToast] = useState<string | null>(null);
const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(null), 2000); };
// JSX
{toast && <div className="fixed bottom-6 right-6 z-50 rounded-xl bg-green-600 px-5 py-3 text-sm font-semibold text-white shadow-2xl">{toast}</div>}
```

---

### ❌ P2 — Cores claras quebrando dark theme (seção de resultados)

Quatro páginas de astrologia renderizam resultados com `bg-white/80–85`, `text-gray-800` e gradientes `from-yellow-50 to-orange-50`. Em fundo escuro o texto fica ilegível.

| Arquivo | Padrão problemático | Ocorrências |
|---|---|---|
| `astrologia/ascendente.tsx` | `bg-white/85`, `text-gray-800`, `from-white/10` | Extensa — toda seção de resultado |
| `astrologia/compatibilidade-signos.tsx` | `bg-white/80`, `bg-white/85`, `text-gray-800` | Extensa — toda seção de resultado |
| `astrologia/signo.tsx` | `bg-white/80`, `bg-white/85`, `from-yellow-50 to-orange-50`, `border-white/60` | ~15 cards de resultado |
| `astrologia/numerologia.tsx` | `from-yellow-50`, `from-purple-50` etc. | Cards de resultado |
| `trabalhista/auxilio-doenca.tsx` | `bg-white` em um card de item | Pontual (1 ocorrência) |

**Substituições:**

```tsx
// Antes (quebrado no dark theme)
className="rounded-lg border border-white/60 bg-white/85 p-4 text-gray-800"

// Depois (dark-aware)
className="rounded-lg border border-neutral-surface-variant bg-background-secondary p-4 text-text-primary-dark"

// Gradiente claro → escuro
// Antes: from-yellow-50 to-orange-50
// Depois: bg-system-warning/10 border border-system-warning/30
```

---

### ❌ P3 — Botão hover-only invisível no mobile

| Arquivo | Linha | Classe atual | Classe corrigida |
|---|---|---|---|
| `ferramentas/sorteador-online.tsx` | ~776 | `opacity-0 group-hover:opacity-100` | `opacity-100 sm:opacity-0 sm:group-hover:opacity-100` |

---

## Melhorias SEO Pontuais

### ⚠️ S1 — FAQPage JSON-LD ausente

| Arquivo | FAQ JSX? | FAQPage schema? |
|---|---|---|
| `astrologia/compatibilidade-signos.tsx` | ✅ Tem 5 perguntas | ❌ Schema ausente |

Adicionar o bloco `<script type="application/ld+json">` com `@type: FAQPage` mapeando as perguntas já presentes no componente `<FAQ>`.

---

### ⚠️ S2 — og:image:width / og:image:height ausentes

| Arquivo | og:image? | Dimensões? |
|---|---|---|
| `astrologia/ascendente.tsx` | ✅ | ❌ Sem width/height |
| `astrologia/signo.tsx` | ✅ | ❌ Sem width/height |

Adicionar após `og:image`:
```tsx
{ property: "og:image:width", content: "512" },
{ property: "og:image:height", content: "512" },
```

---

### ⚠️ S3 — Breadcrumb antigo (58 páginas)

A maioria das páginas usa `<Breadcrumb>` + `<BreadcrumbItem>` (componente legado). O componente tem `flex-wrap` e `aria-label` corretos — não quebra —, mas não colapsa em telas pequenas da forma otimizada que o `<ResponsiveBreadcrumb>` oferece.

**Páginas já migradas para `ResponsiveBreadcrumb` (8):**
- `loterias/gerador-mega-sena`, `gerador-quina`, `gerador-lotofacil`
- `astrologia/ascendente`, `compatibilidade-signos`, `signo`, `numerologia`
- `datas/contagem-regressiva`

**Páginas ainda no componente antigo (58):** todos saude, financas, matematica, trabalhista, ferramentas, datas (exceto contagem-regressiva).

Prioridade: baixa — nenhum layout quebrado, mas a migração melhora a experiência em telas XS.

---

## Tabela Completa por Calculadora

### Legenda de colunas
`meta` = export const meta | `FAQ` = componente FAQ no JSX | `FAQLD` = FAQPage JSON-LD | `BCL` = BreadcrumbList JSON-LD | `OGwh` = og:image:width+height | `DkThm` = dark theme OK | `alert` = sem alert() | `RespBC` = ResponsiveBreadcrumb

---

### 🏥 Saúde

| Calculadora | meta | FAQ | FAQLD | BCL | OGwh | DkThm | alert | RespBC |
|---|---|---|---|---|---|---|---|---|
| imc | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ⚠️ legado |
| gordura-corporal | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ⚠️ legado |
| hidratacao | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ⚠️ legado |
| ciclo-menstrual | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ⚠️ legado |
| desenvolvimento-infantil | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ⚠️ legado |
| peso-gravidez | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ⚠️ legado |

**Status saúde:** SEO excelente. UX sem problemas críticos. Migração de breadcrumb desejável.

---

### 💰 Finanças

| Calculadora | meta | FAQ | FAQLD | BCL | OGwh | DkThm | alert | RespBC |
|---|---|---|---|---|---|---|---|---|
| juros-compostos | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ⚠️ legado |
| juros-simples | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ⚠️ legado |
| cdb | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ⚠️ legado |
| lci-lca | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ⚠️ legado |
| tesouro-direto | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ⚠️ legado |
| renda-fixa-comparativa | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ⚠️ legado |
| primeiro-milhao | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ⚠️ legado |
| preco-medio | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ⚠️ legado |
| financiamento-imobiliario | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ⚠️ legado |
| emprestimo-consignado | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ⚠️ legado |
| consorcio | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ⚠️ legado |
| antecipacao-parcelas-nubank | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ⚠️ legado |

**Status finanças:** SEO excelente. UX sem problemas críticos.

---

### ➗ Matemática

| Calculadora | meta | FAQ | FAQLD | BCL | OGwh | DkThm | alert | RespBC |
|---|---|---|---|---|---|---|---|---|
| porcentagem | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ⚠️ legado |
| regra-de-tres | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ⚠️ legado |
| media | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ⚠️ legado |
| moda | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ⚠️ legado |
| desvio-padrao | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ⚠️ legado |
| mmc-mdc | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ⚠️ legado |
| fracoes | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ⚠️ legado |
| equacao-segundo-grau | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ⚠️ legado |
| inequacoes | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ⚠️ legado |
| sistemas-equacoes-lineares | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ⚠️ legado |
| teorema-pitagoras | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ⚠️ legado |
| area-perimetro | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ⚠️ legado |
| volume | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ⚠️ legado |
| fibonacci | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ⚠️ legado |
| simplificador-funcoes-algebricas | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ⚠️ legado |
| calculadora-cientifica | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ⚠️ legado |

**Status matemática:** SEO excelente. UX sem problemas críticos.

---

### 👷 Trabalhista

| Calculadora | meta | FAQ | FAQLD | BCL | OGwh | DkThm | alert | RespBC |
|---|---|---|---|---|---|---|---|---|
| salario-liquido | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ⚠️ legado |
| rescisao | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ⚠️ legado |
| ferias-decimo-terceiro | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ⚠️ legado |
| horas-extras | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ⚠️ legado |
| **aposentadoria** | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | **❌ alert()** | ⚠️ legado |
| **auxilio-doenca** | ✅ | ✅ | ✅ | ✅ | ✅ | **❌ bg-white** | ✅ | ⚠️ legado |

**Issues trabalhista:**
- [ ] `aposentadoria.tsx:1347` — substituir `alert("Simulação salva com sucesso!")` por toast
- [ ] `auxilio-doenca.tsx:1150` — substituir `bg-white` por `bg-background-secondary`

---

### 🛠️ Ferramentas

| Calculadora | meta | FAQ | FAQLD | BCL | OGwh | DkThm | alert | RespBC |
|---|---|---|---|---|---|---|---|---|
| gerador-cpf | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ⚠️ legado |
| gerador-cnpj | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ⚠️ legado |
| gerador-uuid-guid | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ⚠️ legado |
| gerador-senha-segura | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ⚠️ legado |
| gerador-cartao-credito | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ⚠️ legado |
| validar-cpf | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ⚠️ legado |
| validar-cnpj | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ⚠️ legado |
| conversor-unidades | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ⚠️ legado |
| contador-caracteres | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ⚠️ legado |
| consumo-energia-eletrica | ✅ | ✅ | ✅ | ✅ | ✅ | ⚠️ text-gray | ✅ | ⚠️ legado |
| economia-energia-eletrica | ✅ | ✅ | ✅ | ✅ | ✅ | ⚠️ text-gray | ✅ | ⚠️ legado |
| carro-eletrico-combustao | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ⚠️ legado |
| clicks-por-segundo | ✅ | ✅ | ✅ | ✅ | ✅ | ⚠️ bg-white | ✅ | ⚠️ legado |
| **sorteador-online** | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | **❌ alert()** | ✅ |

**Issues ferramentas:**
- [ ] `sorteador-online.tsx:~776` — corrigir `opacity-0 group-hover:opacity-100` → `opacity-100 sm:opacity-0 sm:group-hover:opacity-100`
- [ ] `sorteador-online.tsx` — substituir 3× `alert("Texto copiado...")` por `copySuccess` state
- [ ] `consumo-energia-eletrica.tsx` / `economia-energia-eletrica.tsx` — revisar instâncias de `text-gray-700` em seções de resultado
- [ ] `clicks-por-segundo.tsx` — substituir `bg-white` por token escuro

---

### 📅 Datas

| Calculadora | meta | FAQ | FAQLD | BCL | OGwh | DkThm | alert | RespBC |
|---|---|---|---|---|---|---|---|---|
| contagem-regressiva | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| diferenca-entre-datas | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ⚠️ legado |
| idade-exata | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ⚠️ legado |
| dias-uteis | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ⚠️ legado |
| operacao-datas | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ⚠️ legado |

**Status datas:** SEO excelente. UX sem problemas críticos.

---

### 🔮 Astrologia

| Calculadora | meta | FAQ | FAQLD | BCL | OGwh | DkThm | alert | RespBC |
|---|---|---|---|---|---|---|---|---|
| **ascendente** | ✅ | ✅ | ✅ | ✅ | **❌** | **❌** | ✅ | ✅ |
| **compatibilidade-signos** | ✅ | ✅ | **❌** | ✅ | ✅ | **❌** | **❌** | ✅ |
| **signo** | ✅ | ✅ | ✅ | ✅ | **❌** | **❌** | ✅ | ✅ |
| **numerologia** | ✅ | ✅ | ✅ | ✅ | ✅ | **❌** | ✅ | ✅ |

**Issues astrologia (maior concentração de problemas):**
- [ ] `ascendente.tsx` — adicionar `og:image:width/height: "512"`
- [ ] `ascendente.tsx` — substituir `bg-white/85`, `text-gray-800` na seção de resultados por tokens dark
- [ ] `compatibilidade-signos.tsx` — adicionar FAQPage JSON-LD (5 perguntas já existem no componente `<FAQ>`)
- [ ] `compatibilidade-signos.tsx` — substituir `alert("Texto copiado...")` por `copySuccess` state
- [ ] `compatibilidade-signos.tsx` — substituir `bg-white/80–85`, `text-gray-800` na seção de resultados
- [ ] `signo.tsx` — adicionar `og:image:width/height: "512"`
- [ ] `signo.tsx` — substituir `bg-white/80–85`, `from-yellow-50 to-orange-50` por tokens dark (`bg-system-warning/10`, `bg-background-secondary`)
- [ ] `numerologia.tsx` — substituir gradientes `from-yellow-50`, `from-purple-50` por tokens dark

---

### 🎰 Loterias

| Calculadora | meta | FAQ | FAQLD | BCL | OGwh | DkThm | alert | RespBC |
|---|---|---|---|---|---|---|---|---|
| gerador-mega-sena | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| gerador-quina | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| gerador-lotofacil | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |

**Status loterias:** ✅ Todas as páginas sem issues. Recém atualizadas com comprovante dark-themed, FAQPage, BreadcrumbList e og:image:width/height.

---

## Priorização de Backlog

### ✅ Alta prioridade — CONCLUÍDA

- [x] **`astrologia/compatibilidade-signos`** — `alert()` → toast, dark theme, FAQPage JSON-LD
- [x] **`astrologia/signo`** — dark theme, og:image:width/height
- [x] **`astrologia/ascendente`** — dark theme, og:image:width/height
- [x] **`trabalhista/aposentadoria`** — `alert()` → toast
- [x] **`ferramentas/sorteador-online`** — hover-only corrigido

### ✅ Média prioridade — CONCLUÍDA

- [x] **`astrologia/numerologia`** — gradientes e texto dark-safe
- [x] **`trabalhista/auxilio-doenca`** — dark theme completo
- [x] **`ferramentas/clicks-por-segundo`** — bg-white suavizado
- [x] **`ferramentas/consumo-energia-eletrica`** — text-gray → token dark

### 🟢 Baixa prioridade (melhoria incremental de SEO/UX)

- [ ] Migrar os 58 `<Breadcrumb>` legados para `<ResponsiveBreadcrumb>` (trabalhista, saúde, matemática, finanças, ferramentas, datas)
- [ ] Adicionar `og:image:alt` com texto descritivo nas páginas que ainda não têm

---

## Checklist de Verificação por Tela

### XS (320px) — Issues identificados por categoria

| Categoria | Status | Observação |
|---|---|---|
| Saúde | ✅ | Grids responsivos, touch targets OK |
| Finanças | ✅ | Inputs com `min-h-[44px]` |
| Matemática | ✅ | Calculadora científica: botões `h-10 sm:h-12` OK |
| Trabalhista | ⚠️ | Breadcrumb legado pode overflow em slugs longos |
| Ferramentas | ❌ | Sorteador: botão de copiar invisível (hover-only) |
| Datas | ✅ | |
| Astrologia | ❌ | Resultados com texto claro sobre fundo escuro (ilegível) |
| Loterias | ✅ | CTA full-width, grid 2-cols nos botões secundários |

### SM (640px) — Sem issues adicionais identificados

Todos os grids usam prefixos responsivos (`sm:`, `md:`) corretamente. Nenhum layout quebrado encontrado.

### MD/LG (768px–1280px) — Sem issues

Layout de 2 colunas (configuração + resultado) funciona corretamente em todas as calculadoras auditadas.

---

## Resumo de Ações (Total: 16 issues)

| # | Arquivo | Tipo | Impacto |
|---|---|---|---|
| 1 | `astrologia/compatibilidade-signos` | FAQPage JSON-LD ausente | SEO |
| 2 | `astrologia/compatibilidade-signos` | `alert()` no copy | UX crítico |
| 3 | `astrologia/compatibilidade-signos` | Dark theme quebrado | UX crítico |
| 4 | `astrologia/ascendente` | Dark theme quebrado | UX crítico |
| 5 | `astrologia/ascendente` | og:image:width/height | SEO |
| 6 | `astrologia/signo` | Dark theme quebrado | UX crítico |
| 7 | `astrologia/signo` | og:image:width/height | SEO |
| 8 | `astrologia/numerologia` | Dark theme gradientes | UX médio |
| 9 | `trabalhista/aposentadoria` | `alert()` no save | UX crítico |
| 10 | `trabalhista/auxilio-doenca` | `bg-white` pontual | UX médio |
| 11 | `ferramentas/sorteador-online` | `alert()` 3× no copy | UX crítico |
| 12 | `ferramentas/sorteador-online` | hover-only no mobile | UX crítico |
| 13 | `ferramentas/clicks-por-segundo` | `bg-white` pontual | UX médio |
| 14 | `ferramentas/consumo-energia-eletrica` | `text-gray-700` | UX leve |
| 15 | `ferramentas/economia-energia-eletrica` | `text-gray-700` | UX leve |
| 16 | 58 páginas | Breadcrumb legado | UX leve |
