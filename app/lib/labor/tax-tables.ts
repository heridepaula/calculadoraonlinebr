/**
 * Tabelas trabalhistas e tributárias vigentes (INSS, IRRF e salário mínimo).
 *
 * Fonte única para as calculadoras trabalhistas. Atualize em janeiro, junto com
 * `SEO_YEAR` (constants.ts), e confira as fontes de `LABOR_TAX_SOURCES`.
 */

export const LABOR_TAX_YEAR = 2026;
/** Data da última conferência das tabelas com as fontes oficiais. */
export const LABOR_TAX_REVIEWED_AT = "2026-11-09";

/** Salário mínimo nacional vigente. */
export const MINIMUM_WAGE = 1621;

// ---------------------------------------------------------------------------
// INSS: empregado, doméstico e avulso (Portaria Interministerial MPS/MF nº 13/2026)
// ---------------------------------------------------------------------------

export interface InssBracket {
  /** Limite superior da faixa, em R$ */
  upTo: number;
  rate: number;
}

export const INSS_BRACKETS: readonly InssBracket[] = [
  { upTo: 1621.0, rate: 0.075 },
  { upTo: 2902.84, rate: 0.09 },
  { upTo: 4354.27, rate: 0.12 },
  { upTo: 8475.55, rate: 0.14 },
];

export const INSS_CEILING = INSS_BRACKETS[INSS_BRACKETS.length - 1].upTo;

export interface InssBracketResult {
  from: number;
  upTo: number;
  rate: number;
  /** Parte da base que caiu nesta faixa */
  taxedAmount: number;
  contribution: number;
}

export interface InssResult {
  /** Base efetivamente tributada (limitada ao teto) */
  base: number;
  contribution: number;
  /** Alíquota efetiva sobre a base informada */
  effectiveRate: number;
  brackets: InssBracketResult[];
  isCapped: boolean;
}

export const roundCents = (value: number) => Math.round((value + Number.EPSILON) * 100) / 100;

/** Contribuição progressiva: cada alíquota incide só sobre a parte da base dentro da faixa. */
export function calculateInss(grossBase: number): InssResult {
  const base = Math.min(Math.max(grossBase, 0), INSS_CEILING);
  let from = 0;
  let total = 0;
  const brackets: InssBracketResult[] = [];

  for (const bracket of INSS_BRACKETS) {
    const taxedAmount = Math.max(0, Math.min(base, bracket.upTo) - from);
    // O total soma os valores sem arredondar; cada faixa é arredondada só para exibição
    total += taxedAmount * bracket.rate;
    brackets.push({
      from,
      upTo: bracket.upTo,
      rate: bracket.rate,
      taxedAmount: roundCents(taxedAmount),
      contribution: roundCents(taxedAmount * bracket.rate),
    });
    from = bracket.upTo;
  }

  const contribution = roundCents(total);
  return {
    base: roundCents(base),
    contribution,
    effectiveRate: grossBase > 0 ? contribution / grossBase : 0,
    brackets,
    isCapped: grossBase > INSS_CEILING,
  };
}

// ---------------------------------------------------------------------------
// IRRF mensal (Lei nº 15.191/2025) e redução da Lei nº 15.270/2025
// ---------------------------------------------------------------------------

export interface IrrfBracket {
  /** Limite superior da base de cálculo, em R$ */
  upTo: number;
  rate: number;
  /** Parcela a deduzir, em R$ */
  deduction: number;
}

export const IRRF_BRACKETS: readonly IrrfBracket[] = [
  { upTo: 2428.8, rate: 0, deduction: 0 },
  { upTo: 2826.65, rate: 0.075, deduction: 182.16 },
  { upTo: 3751.05, rate: 0.15, deduction: 394.16 },
  { upTo: 4664.68, rate: 0.225, deduction: 675.49 },
  { upTo: Infinity, rate: 0.275, deduction: 908.73 },
];

export const IRRF_DEPENDENT_DEDUCTION = 189.59;
/** Desconto simplificado mensal: substitui as deduções legais quando é maior que elas. */
export const IRRF_SIMPLIFIED_DISCOUNT = 607.2;

/**
 * Redução do art. 3º-A da Lei 9.250/1995 (incluído pela Lei 15.270/2025): zera o imposto
 * para rendimentos tributáveis de até R$ 5.000 e diminui linearmente até R$ 7.350.
 * O §3º manda aplicá-la também ao 13º salário (tributação exclusiva na fonte).
 */
export const IRRF_REDUCTION = {
  fullUpTo: 5000,
  maxReduction: 312.89,
  phaseOutUpTo: 7350,
  constant: 978.62,
  factor: 0.133145,
} as const;

export interface IrrfInput {
  /** Rendimento tributável bruto (usado na redução da Lei 15.270) */
  taxableIncome: number;
  /** INSS descontado do mesmo rendimento */
  inss: number;
  dependents: number;
  /** Pensão alimentícia judicial e outras deduções legais */
  otherDeductions?: number;
}

export interface IrrfResult {
  /** Base de cálculo após deduções */
  base: number;
  deductionMethod: "legal" | "simplified";
  /** Deduções usadas (legais ou desconto simplificado) */
  deductions: number;
  rate: number;
  bracketDeduction: number;
  /** Imposto pela tabela progressiva, antes da redução */
  taxBeforeReduction: number;
  /** Redução da Lei 15.270 efetivamente aplicada */
  reduction: number;
  tax: number;
}

/** Redução da Lei 15.270 para um rendimento tributável, limitada ao imposto calculado. */
export function irrfReduction(taxableIncome: number, taxBeforeReduction: number): number {
  const { fullUpTo, maxReduction, phaseOutUpTo, constant, factor } = IRRF_REDUCTION;
  let reduction = 0;
  if (taxableIncome <= fullUpTo) reduction = maxReduction;
  else if (taxableIncome <= phaseOutUpTo) reduction = constant - factor * taxableIncome;
  return roundCents(Math.min(Math.max(reduction, 0), taxBeforeReduction));
}

export function calculateIrrf({
  taxableIncome,
  inss,
  dependents,
  otherDeductions = 0,
}: IrrfInput): IrrfResult {
  const legalDeductions = inss + dependents * IRRF_DEPENDENT_DEDUCTION + otherDeductions;
  const useSimplified = IRRF_SIMPLIFIED_DISCOUNT > legalDeductions;
  const deductions = useSimplified ? IRRF_SIMPLIFIED_DISCOUNT : legalDeductions;
  const base = Math.max(0, taxableIncome - deductions);

  const bracket =
    IRRF_BRACKETS.find((b) => base <= b.upTo) ?? IRRF_BRACKETS[IRRF_BRACKETS.length - 1];
  const taxBeforeReduction = roundCents(Math.max(0, base * bracket.rate - bracket.deduction));
  const reduction = irrfReduction(taxableIncome, taxBeforeReduction);

  return {
    base: roundCents(base),
    deductionMethod: useSimplified ? "simplified" : "legal",
    deductions: roundCents(deductions),
    rate: bracket.rate,
    bracketDeduction: bracket.deduction,
    taxBeforeReduction,
    reduction,
    tax: roundCents(taxBeforeReduction - reduction),
  };
}

/** Salário-família (Portaria Interministerial MPS/MF nº 13/2026): cota por filho até 14 anos. */
export const FAMILY_ALLOWANCE = { perChild: 67.54, salaryLimit: 1980.38 } as const;

// ---------------------------------------------------------------------------
// Seguro-desemprego (Lei 7.998/1990; faixas corrigidas pelo INPC em janeiro)
// ---------------------------------------------------------------------------

export const UNEMPLOYMENT_BENEFIT = {
  /** Até esta média salarial, a parcela é 80% da média */
  firstBandUpTo: 2222.17,
  firstBandRate: 0.8,
  /** Até esta média, a parcela é o valor da 1ª faixa + 50% do que exceder */
  secondBandUpTo: 3703.99,
  secondBandRate: 0.5,
  ceiling: 2518.65,
  floor: MINIMUM_WAGE,
} as const;

/** Valor da parcela a partir da média dos três últimos salários. */
export function unemploymentInstallment(averageSalary: number): number {
  const { firstBandUpTo, firstBandRate, secondBandUpTo, secondBandRate, ceiling, floor } =
    UNEMPLOYMENT_BENEFIT;
  let value: number;
  if (averageSalary <= firstBandUpTo) value = averageSalary * firstBandRate;
  else if (averageSalary <= secondBandUpTo) {
    // A tabela oficial usa a parcela fixa já arredondada (R$ 1.777,74 em 2026)
    value =
      roundCents(firstBandUpTo * firstBandRate) + (averageSalary - firstBandUpTo) * secondBandRate;
  } else value = ceiling;
  return roundCents(Math.min(Math.max(value, floor), ceiling));
}

/**
 * Número de parcelas na 1ª solicitação (Lei 13.134/2015): exige 12 meses trabalhados nos
 * últimos 18; 4 parcelas de 12 a 23 meses e 5 a partir de 24.
 */
export function unemploymentInstallmentsFirstRequest(monthsWorked: number): number {
  if (monthsWorked < 12) return 0;
  return monthsWorked >= 24 ? 5 : 4;
}

// ---------------------------------------------------------------------------
// Fontes (exibidas nas páginas para transparência / E-E-A-T)
// ---------------------------------------------------------------------------

export interface LegalSource {
  label: string;
  href: string;
}

export const LABOR_TAX_SOURCES = {
  inss: {
    label: "Portaria Interministerial MPS/MF nº 13/2026 (tabela do INSS)",
    href: "https://www.gov.br/inss/pt-br/direitos-e-deveres/inscricao-e-contribuicao/tabela-de-contribuicao-mensal",
  },
  irrf: {
    label: "Receita Federal: tabelas do IRRF 2026",
    href: "https://www.gov.br/receitafederal/pt-br/assuntos/meu-imposto-de-renda/tabelas/2026",
  },
  lei15270: {
    label: "Lei nº 15.270/2025 (redução do IR até R$ 5.000)",
    href: "https://www.planalto.gov.br/ccivil_03/_ato2023-2026/2025/lei/l15270.htm",
  },
  lei4090: {
    label: "Lei nº 4.090/1962 (institui o 13º salário)",
    href: "https://www.planalto.gov.br/ccivil_03/leis/l4090.htm",
  },
  lei4749: {
    label: "Lei nº 4.749/1965 (prazos das parcelas do 13º)",
    href: "https://www.planalto.gov.br/ccivil_03/leis/l4749.htm",
  },
  seguroDesemprego: {
    label: "Lei nº 7.998/1990 e Lei nº 13.134/2015 (seguro-desemprego)",
    href: "https://www.planalto.gov.br/ccivil_03/leis/l7998.htm",
  },
  lei8213: {
    label: "Lei nº 8.213/1991 (planos de benefícios da Previdência Social)",
    href: "https://www.planalto.gov.br/ccivil_03/leis/l8213cons.htm",
  },
  ec103: {
    label: "Emenda Constitucional nº 103/2019 (Reforma da Previdência)",
    href: "https://www.planalto.gov.br/ccivil_03/constituicao/emendas/emc/emc103.htm",
  },
  clt: {
    label: "Consolidação das Leis do Trabalho (CLT)",
    href: "https://www.planalto.gov.br/ccivil_03/decreto-lei/del5452.htm",
  },
  decreto57155: {
    label: "Decreto nº 57.155/1965 (regulamenta o 13º e as médias)",
    href: "https://www.planalto.gov.br/ccivil_03/decreto/antigos/d57155.htm",
  },
} satisfies Record<string, LegalSource>;
