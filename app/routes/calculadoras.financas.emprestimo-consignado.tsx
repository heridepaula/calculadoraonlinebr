import type { MetaFunction } from "@remix-run/node";
import { useRef, useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  Button,
  Breadcrumb,
  BreadcrumbItem,
} from "~/components/ui";
import { MoneyInput, RateInput, Input } from "~/components/ui";
import { RelatedCalculators, FAQ } from "~/components";
import { useAutoCalculatorTracking, useFormTracking } from "~/hooks/useAutoCalculatorTracking";
import { buildCalculatorMeta } from "~/lib/page-meta";

export const meta: MetaFunction = () => {
  return [
    ...buildCalculatorMeta("emprestimo-consignado"),
    {
      "script:ld+json": {
        "@context": "https://schema.org",
        "@type": "WebApplication",
        name: "Calculadora de Empréstimo Consignado - Simulador Completo 2026",
        description:
          "Simulador gratuito de empréstimo consignado com cálculo de parcelas, CET, IOF e taxas para aposentados, pensionistas e servidores públicos.",
        url: "https://www.calculadoraonlinebr.com.br/calculadoras/financas/emprestimo-consignado",
        applicationCategory: "FinanceApplication",
        operatingSystem: "Web Browser",
        isAccessibleForFree: true,
        inLanguage: "pt-BR",
        dateModified: "2025-08-24",
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "BRL",
        },
        publisher: {
          "@type": "Organization",
          name: "CalculadoraOnlineBR",
          url: "https://www.calculadoraonlinebr.com.br",
          logo: {
            "@type": "ImageObject",
            url: "https://www.calculadoraonlinebr.com.br/android-chrome-192x192.webp",
            width: 180,
            height: 180,
          },
          sameAs: [
            "https://twitter.com/CalculadoraBR",
            "https://www.facebook.com/CalculadoraOnlineBR",
          ],
        },
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id":
            "https://www.calculadoraonlinebr.com.br/calculadoras/financas/emprestimo-consignado",
          name: "Calculadora de Empréstimo Consignado 2026 - Simulador Completo",
          description:
            "Simule empréstimo consignado com cálculo de parcelas, CET, IOF e taxas para aposentados, pensionistas e servidores públicos.",
          inLanguage: "pt-BR",
          isPartOf: {
            "@type": "WebSite",
            name: "CalculadoraOnlineBR",
            url: "https://www.calculadoraonlinebr.com.br",
            description: "Calculadoras online gratuitas para facilitar seu dia a dia",
          },
          breadcrumb: {
            "@type": "BreadcrumbList",
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                name: "Início",
                item: "https://www.calculadoraonlinebr.com.br",
              },
              {
                "@type": "ListItem",
                position: 2,
                name: "Calculadoras",
                item: "https://www.calculadoraonlinebr.com.br/calculadoras",
              },
              {
                "@type": "ListItem",
                position: 3,
                name: "Finanças",
                item: "https://www.calculadoraonlinebr.com.br/calculadoras/financas",
              },
              {
                "@type": "ListItem",
                position: 4,
                name: "Calculadora de Empréstimo Consignado",
                item: "https://www.calculadoraonlinebr.com.br/calculadoras/financas/emprestimo-consignado",
              },
            ],
          },
        },
        about: {
          "@type": "FinancialProduct",
          name: "Empréstimo Consignado",
          description:
            "Modalidade de crédito com desconto em folha para aposentados, pensionistas e servidores",
          category: "Loan",
        },
        featureList: [
          "Simulação de parcelas de empréstimo consignado",
          "Cálculo de CET (Custo Efetivo Total)",
          "Cálculo de IOF",
          "Comparação de modalidades",
          "Análise de margem consignável",
          "Interface móvel responsiva",
          "Resultados em tempo real",
        ],
      },
    },
    {
      "script:ld+json": {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: [
          {
            "@type": "Question",
            name: "O que é empréstimo consignado?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Empréstimo consignado é uma modalidade de crédito onde as parcelas são descontadas diretamente da folha de pagamento ou benefício, oferecendo menores taxas devido à garantia de pagamento.",
            },
          },
          {
            "@type": "Question",
            name: "Qual a margem consignável disponível?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Aposentados e pensionistas podem comprometer até 35% do benefício líquido, enquanto servidores públicos podem usar até 30% do salário líquido para pagamento de consignados.",
            },
          },
          {
            "@type": "Question",
            name: "Como é calculado o IOF?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "O IOF incide sobre o valor do empréstimo: 0,38% fixo + 0,0082% por dia (limitado a 30 dias). É descontado do valor liberado, reduzindo o montante líquido recebido.",
            },
          },
          {
            "@type": "Question",
            name: "Posso quitar antecipadamente?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Sim, a quitação antecipada é permitida com desconto proporcional dos juros. O desconto varia conforme a instituição e pode representar economia significativa.",
            },
          },
          {
            "@type": "Question",
            name: "Qual a diferença entre CET e taxa de juros?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "A taxa de juros é apenas os juros mensais, enquanto o CET (Custo Efetivo Total) inclui todos os custos: juros, IOF, taxas administrativas e seguros, representando o custo real total.",
            },
          },
          {
            "@type": "Question",
            name: "Como escolher entre as modalidades?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Servidores têm as melhores condições (menor taxa, maior prazo). Aposentados e pensionistas têm margem maior (35%). CLT depende da empresa conveniada. Compare sempre o CET total.",
            },
          },
        ],
      },
    },
  ];
};

type LoanType = "aposentado" | "servidor" | "pensionista" | "clt";
type AmortizationSystem = "price" | "sac";

interface AmortizationSchedule {
  month: number;
  payment: number;
  principal: number;
  interest: number;
  balance: number;
}

interface PayrollLoanResult {
  monthlyPayment: number;
  totalAmount: number;
  totalInterest: number;
  liquidValue: number;
  iofAmount: number;
  cetPercentage: number;
  effectiveRate: number;
  marginUsed: number;
  amortizationSystem: AmortizationSystem;
  schedule: AmortizationSchedule[];
  firstPayment: number;
  lastPayment: number;
}

interface ValidationErrors {
  loanAmount?: string;
  months?: string;
  monthlyRate?: string;
  salary?: string;
}

export default function PayrollLoanCalculator() {
  const [loanType, setLoanType] = useState<LoanType>("aposentado");
  const [amortizationSystem, setAmortizationSystem] = useState<AmortizationSystem>("price");
  const [loanAmount, setLoanAmount] = useState("");
  const [months, setMonths] = useState("");
  const [monthlyRate, setMonthlyRate] = useState("2,50");
  const [salary, setSalary] = useState("");
  const [result, setResult] = useState<PayrollLoanResult | null>(null);
  const [errors, setErrors] = useState<ValidationErrors>({});
  const resultRef = useRef<HTMLDivElement>(null);

  const { startCalculation, endCalculation } = useAutoCalculatorTracking({
    calculatorType: "emprestimo-consignado",
    category: "financas",
  });
  useFormTracking("emprestimo-consignado");

  const currencyBR = (v: number) =>
    new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(v);
  const percentBR = (v: number, digits = 2) =>
    new Intl.NumberFormat("pt-BR", {
      minimumFractionDigits: digits,
      maximumFractionDigits: digits,
    }).format(v);

  const parseMoney = (v: string | number): number => {
    const s = String(v ?? "");
    const normalized = s.replace(/\./g, "").replace(",", ".");
    const n = parseFloat(normalized);
    return isNaN(n) ? 0 : n;
  };
  const parseRate = (v: string | number): number => parseMoney(v) / 100;

  const getIOFFactor = (d: number) => (d <= 0 ? 1 : d >= 30 ? 0 : (30 - d) / 30);
  const getIRRate = (d: number) => (d <= 180 ? 0.225 : d <= 360 ? 0.2 : d <= 720 ? 0.175 : 0.15);

  const getMaxMargin = (type: LoanType): number => {
    switch (type) {
      case "aposentado":
      case "pensionista":
        return 0.35; // 35%
      case "servidor":
      case "clt":
        return 0.3; // 30%
      default:
        return 0.3;
    }
  };

  const validateInputs = (): boolean => {
    const newErrors: ValidationErrors = {};
    let ok = true;
    const loan = parseMoney(loanAmount);
    if (loan <= 0) {
      newErrors.loanAmount = "Valor do empréstimo obrigatório e maior que 0";
      ok = false;
    }
    const m = parseInt(months, 10);
    if (!months || isNaN(m) || m <= 0) {
      newErrors.months = "Prazo (meses) obrigatório e maior que 0";
      ok = false;
    }
    if (parseRate(monthlyRate) <= 0) {
      newErrors.monthlyRate = "Taxa mensal deve ser > 0";
      ok = false;
    }
    const sal = parseMoney(salary);
    if (sal <= 0) {
      newErrors.salary = "Salário/benefício obrigatório e maior que 0";
      ok = false;
    }

    // Validação da margem consignável
    if (loan > 0 && sal > 0 && m > 0) {
      const rate = parseRate(monthlyRate);
      const monthlyPayment = (loan * (rate * Math.pow(1 + rate, m))) / (Math.pow(1 + rate, m) - 1);
      const maxMargin = getMaxMargin(loanType);
      const maxPayment = sal * maxMargin;

      if (monthlyPayment > maxPayment) {
        const maxLoanAmount =
          (maxPayment * (Math.pow(1 + rate, m) - 1)) / (rate * Math.pow(1 + rate, m));
        newErrors.loanAmount = `Valor excede margem consignável. Máximo: ${currencyBR(maxLoanAmount)} (${percentBR(maxMargin * 100, 0)}% de ${currencyBR(sal)})`;
        ok = false;
      }
    }

    setErrors(newErrors);
    return ok;
  };

  // Função para calcular com sistema Price (parcelas fixas)
  const calculatePrice = (loan: number, rate: number, months: number) => {
    const monthlyPayment =
      (loan * (rate * Math.pow(1 + rate, months))) / (Math.pow(1 + rate, months) - 1);
    const schedule: AmortizationSchedule[] = [];
    let balance = loan;
    let totalAmount = 0;

    for (let month = 1; month <= months; month++) {
      const interest = balance * rate;
      const principal = monthlyPayment - interest;
      balance -= principal;
      totalAmount += monthlyPayment;

      schedule.push({
        month,
        payment: monthlyPayment,
        principal,
        interest,
        balance: Math.max(0, balance),
      });
    }

    return {
      monthlyPayment,
      totalAmount,
      totalInterest: totalAmount - loan,
      schedule,
      firstPayment: monthlyPayment,
      lastPayment: monthlyPayment,
    };
  };

  // Função para calcular com sistema SAC (amortização constante)
  const calculateSAC = (loan: number, rate: number, months: number) => {
    const principalAmortization = loan / months;
    const schedule: AmortizationSchedule[] = [];
    let balance = loan;
    let totalAmount = 0;

    for (let month = 1; month <= months; month++) {
      const interest = balance * rate;
      const payment = principalAmortization + interest;
      balance -= principalAmortization;
      totalAmount += payment;

      schedule.push({
        month,
        payment,
        principal: principalAmortization,
        interest,
        balance: Math.max(0, balance),
      });
    }

    return {
      monthlyPayment: schedule[0].payment, // Primeira parcela
      totalAmount,
      totalInterest: totalAmount - loan,
      schedule,
      firstPayment: schedule[0].payment,
      lastPayment: schedule[months - 1].payment,
    };
  };

  const handleCalculate = () => {
    if (!validateInputs()) return;
    startCalculation("calcular");
    try {
      const loan = parseMoney(loanAmount);
      const m = parseInt(months, 10);
      const rate = parseRate(monthlyRate);
      const sal = parseMoney(salary);

      // Calcular baseado no sistema de amortização escolhido
      const calculationResult =
        amortizationSystem === "price"
          ? calculatePrice(loan, rate, m)
          : calculateSAC(loan, rate, m);

      // IOF sobre o valor do empréstimo (0,38% do valor + 0,0082% por dia, limitado a 30 dias)
      const iofRate = 0.0038; // 0,38%
      const iofDaily = 0.000082; // 0,0082% ao dia
      const daysIOF = Math.min(30, m * 30); // Considera 30 dias por mês, limitado a 30 dias
      const iofAmount = loan * (iofRate + iofDaily * daysIOF);

      // Valor líquido (valor solicitado - IOF)
      const liquidValue = loan - iofAmount;

      // CET (Custo Efetivo Total) - taxa equivalente mensal
      const cetPercentage = rate * 100;

      // Taxa efetiva anual
      const effectiveRate = (Math.pow(1 + rate, 12) - 1) * 100;

      // Margem consignável usada (baseada na primeira parcela para SAC)
      const marginUsed = (calculationResult.firstPayment / sal) * 100;

      const res: PayrollLoanResult = {
        monthlyPayment: calculationResult.monthlyPayment,
        totalAmount: calculationResult.totalAmount,
        totalInterest: calculationResult.totalInterest,
        liquidValue,
        iofAmount,
        cetPercentage,
        effectiveRate,
        marginUsed,
        amortizationSystem,
        schedule: calculationResult.schedule,
        firstPayment: calculationResult.firstPayment,
        lastPayment: calculationResult.lastPayment,
      };

      setResult(res);
      setErrors({});
      setTimeout(() => {
        resultRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 50);
      endCalculation("calcular", { success: true });
    } catch {
      setErrors({ loanAmount: "Erro no cálculo. Verifique os valores inseridos." });
      endCalculation("calcular", { success: false });
    }
  };

  const handleReset = () => {
    setLoanAmount("");
    setMonths("");
    setMonthlyRate("2,50");
    setSalary("");
    setResult(null);
    setErrors({});
  };

  const ErrorMessage = ({ error }: { error?: string }) =>
    error ? <div className="mt-1 text-sm text-system-error">{error}</div> : null;

  return (
    <div className="mx-auto max-w-2xl space-y-8 px-4 md:max-w-4xl lg:max-w-6xl" lang="pt-BR">
      <Breadcrumb>
        <BreadcrumbItem href="/">Início</BreadcrumbItem>
        <BreadcrumbItem href="/calculadoras">Calculadoras</BreadcrumbItem>
        <BreadcrumbItem href="/calculadoras/financas">Finanças</BreadcrumbItem>
        <BreadcrumbItem isLast>Empréstimo Consignado</BreadcrumbItem>
      </Breadcrumb>

      <header className="space-y-4 text-center" role="banner">
        <h1 className="mb-4 text-3xl font-bold text-text-primary md:text-4xl">
          Calculadora de Empréstimo Consignado 2026 – Simulador Completo
        </h1>
        <p className="mx-auto max-w-3xl text-lg text-text-secondary-dark">
          Calcule a{" "}
          <strong className="text-growth-green">parcela do seu empréstimo consignado</strong>{" "}
          considerando valor, prazo e taxa de juros. Compare modalidades e receba{" "}
          <strong className="text-primary-blue-dark">análise de margem consignável</strong> para
          apoiar suas decisões.
        </p>
        <div className="inline-block rounded-lg bg-growth-green-soft p-4 duration-300">
          <p className="text-sm font-medium text-text-primary">
            🔎 <strong>Cálculo Completo</strong> • 📊 <strong>Análise de CET</strong> • ⚙️{" "}
            <strong>Margem Consignável</strong>
          </p>
        </div>
      </header>

      <Card>
        <CardHeader>
          <CardTitle as="h2">📋 Configure sua Simulação de Empréstimo Consignado</CardTitle>
        </CardHeader>
        <CardContent>
          {/* Tipo de Beneficiário centralizado */}
          <div
            className="mb-6 flex flex-wrap justify-center gap-2"
            role="radiogroup"
            aria-label="Tipo de beneficiário"
          >
            <div className="inline-flex overflow-hidden rounded-lg border border-neutral-surface-variant">
              <button
                type="button"
                onClick={() => setLoanType("aposentado")}
                className={`min-w-[80px] flex-1 basis-0 px-2 py-3 text-center text-xs font-medium transition sm:text-sm ${
                  loanType === "aposentado"
                    ? "bg-primary-blue text-white"
                    : "bg-neutral-surface text-text-secondary hover:bg-primary-blue/10"
                }`}
                role="radio"
                aria-checked={loanType === "aposentado"}
                aria-label="Aposentado INSS"
              >
                Aposentado
              </button>
              <button
                type="button"
                onClick={() => setLoanType("servidor")}
                className={`min-w-[80px] flex-1 basis-0 px-2 py-3 text-center text-xs font-medium transition sm:text-sm ${
                  loanType === "servidor"
                    ? "bg-primary-blue text-white"
                    : "bg-neutral-surface text-text-secondary hover:bg-primary-blue/10"
                }`}
                role="radio"
                aria-checked={loanType === "servidor"}
                aria-label="Servidor público"
              >
                Servidor
              </button>
              <button
                type="button"
                onClick={() => setLoanType("pensionista")}
                className={`min-w-[80px] flex-1 basis-0 px-2 py-3 text-center text-xs font-medium transition sm:text-sm ${
                  loanType === "pensionista"
                    ? "bg-primary-blue text-white"
                    : "bg-neutral-surface text-text-secondary hover:bg-primary-blue/10"
                }`}
                role="radio"
                aria-checked={loanType === "pensionista"}
                aria-label="Pensionista INSS"
              >
                Pensionista
              </button>
              <button
                type="button"
                onClick={() => setLoanType("clt")}
                className={`min-w-[80px] flex-1 basis-0 px-2 py-3 text-center text-xs font-medium transition sm:text-sm ${
                  loanType === "clt"
                    ? "bg-primary-blue text-white"
                    : "bg-neutral-surface text-text-secondary hover:bg-primary-blue/10"
                }`}
                role="radio"
                aria-checked={loanType === "clt"}
                aria-label="Trabalhador CLT"
              >
                CLT
              </button>
            </div>
          </div>

          {/* Sistema de Amortização */}
          <div className="mb-6">
            <label className="mb-3 block text-sm font-medium text-text-primary">
              Sistema de Amortização
            </label>
            <div className="grid grid-cols-2 gap-0 overflow-hidden rounded-lg border border-neutral-surface-variant">
              <button
                type="button"
                onClick={() => setAmortizationSystem("price")}
                className={`px-4 py-3 text-center text-sm font-medium transition ${
                  amortizationSystem === "price"
                    ? "bg-primary-blue text-white"
                    : "bg-neutral-surface text-text-secondary hover:bg-primary-blue/10"
                }`}
                role="radio"
                aria-checked={amortizationSystem === "price"}
                aria-label="Tabela Price - parcelas fixas"
              >
                <div>
                  <div className="font-semibold">Tabela Price</div>
                  <div className="text-xs opacity-80">Parcelas fixas</div>
                </div>
              </button>
              <button
                type="button"
                onClick={() => setAmortizationSystem("sac")}
                className={`px-4 py-3 text-center text-sm font-medium transition ${
                  amortizationSystem === "sac"
                    ? "bg-primary-blue text-white"
                    : "bg-neutral-surface text-text-secondary hover:bg-primary-blue/10"
                }`}
                role="radio"
                aria-checked={amortizationSystem === "sac"}
                aria-label="Sistema SAC - amortização constante"
              >
                <div>
                  <div className="font-semibold">Sistema SAC</div>
                  <div className="text-xs opacity-80">Parcelas decrescentes</div>
                </div>
              </button>
            </div>
            <div className="mt-2 text-xs text-text-secondary">
              {amortizationSystem === "price"
                ? "Price: Parcelas iguais com juros maiores no início"
                : "SAC: Amortização igual com parcelas decrescentes"}
            </div>
          </div>

          {/* Valor do Empréstimo e Salário */}
          <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <MoneyInput
                label="Valor do Empréstimo"
                value={loanAmount}
                onChange={setLoanAmount}
                placeholder="50.000,00"
                fullWidth
                className="h-12 text-lg"
              />
              <ErrorMessage error={errors.loanAmount} />
            </div>
            <div>
              <MoneyInput
                label="Salário/Benefício Líquido"
                value={salary}
                onChange={setSalary}
                placeholder="3.000,00"
                fullWidth
                className="h-12 text-lg"
              />
              <ErrorMessage error={errors.salary} />
              <div className="mt-1 text-xs text-text-secondary">Valor líquido mensal recebido</div>
            </div>
          </div>

          {/* Taxa de Juros e Prazo */}
          <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <RateInput
                label="Taxa de Juros (% a.m.)"
                value={monthlyRate}
                onChange={setMonthlyRate}
                placeholder="2,50"
                fullWidth
                className="h-12 text-lg"
              />
              <ErrorMessage error={errors.monthlyRate} />
              <div className="mt-1 text-xs text-text-secondary">
                Taxa mensal de juros do empréstimo
              </div>
            </div>
            <div>
              <Input
                type="number"
                label="Prazo (meses)"
                value={months}
                onChange={(e) => setMonths(e.target.value)}
                placeholder="84"
                fullWidth
                className="h-12 text-lg"
              />
              <ErrorMessage error={errors.months} />
              <div className="mt-1 text-xs text-text-secondary">
                Número de parcelas do empréstimo
              </div>
            </div>
          </div>

          {/* Botões */}
          <div className="margin-top-4 flex justify-center space-x-4">
            <Button
              onClick={handleCalculate}
              className="px-8"
              aria-label="Calcular empréstimo consignado"
            >
              Calcular
            </Button>
            <Button
              onClick={handleReset}
              variant="outline"
              className="border-system-error px-8 text-system-error hover:bg-system-error hover:text-white"
              aria-label="Limpar formulário"
            >
              Limpar
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Resultado */}
      {result && (
        <Card
          ref={resultRef as any}
          className="border-2 border-growth-green bg-growth-green-soft"
          role="region"
          aria-label="Resultado da simulação"
        >
          <CardHeader>
            <CardTitle as="h2" className="text-growth-green">
              📊 Resultado da Simulação de Empréstimo Consignado
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-3">
              <div className="rounded-lg bg-gray-900 p-6 text-center">
                <div className="text-4xl font-bold text-growth-green">
                  {result.amortizationSystem === "price"
                    ? currencyBR(result.monthlyPayment)
                    : `${currencyBR(result.firstPayment)} → ${currencyBR(result.lastPayment)}`}
                </div>
                <div className="text-sm text-text-secondary">
                  {result.amortizationSystem === "price"
                    ? "Parcela Fixa (Price)"
                    : "1ª → Última Parcela (SAC)"}
                </div>
              </div>
              <div className="rounded-lg bg-gray-900 p-6 text-center">
                <div className="text-2xl font-bold text-primary-blue-dark">
                  {currencyBR(result.liquidValue)}
                </div>
                <div className="text-sm text-text-secondary">Valor Líquido</div>
              </div>
              <div className="rounded-lg bg-gray-900 p-6 text-center">
                <div className="text-2xl font-bold text-system-warning">
                  {currencyBR(result.totalInterest)}
                </div>
                <div className="text-sm text-text-secondary">Total de Juros</div>
              </div>
            </div>

            <div className="mb-6 grid grid-cols-1 gap-6 rounded-lg bg-gray-900 p-4 md:grid-cols-3">
              <div className="text-center">
                <div className="text-sm text-text-secondary">CET (Custo Efetivo Total)</div>
                <div className="text-xl font-bold text-text-primary">
                  {percentBR(result.cetPercentage, 2)}% a.m.
                </div>
                <div className="text-sm text-text-secondary">
                  {percentBR(result.effectiveRate, 2)}% a.a.
                </div>
              </div>
              <div className="text-center">
                <div className="text-sm text-text-secondary">IOF</div>
                <div className="text-xl font-bold text-text-primary">
                  {currencyBR(result.iofAmount)}
                </div>
                <div className="text-sm text-text-secondary">Sobre o valor do empréstimo</div>
              </div>
              <div className="text-center">
                <div className="text-sm text-text-secondary">Margem Usada</div>
                <div
                  className={`text-xl font-bold ${
                    result.marginUsed > 35
                      ? "text-system-error"
                      : result.marginUsed > 30
                        ? "text-system-warning"
                        : "text-system-success"
                  }`}
                >
                  {percentBR(result.marginUsed, 1)}%
                </div>
                <div className="text-sm text-text-secondary">Da renda líquida</div>
              </div>
            </div>

            {result.marginUsed > getMaxMargin(loanType) * 100 && (
              <div className="mb-6 rounded border border-system-error/20 bg-system-error/10 p-3 text-sm text-system-error">
                ⚠️ Margem consignável excedida! O limite é{" "}
                {percentBR(getMaxMargin(loanType) * 100, 0)}% para{" "}
                {loanType === "aposentado"
                  ? "aposentados"
                  : loanType === "pensionista"
                    ? "pensionistas"
                    : loanType === "servidor"
                      ? "servidores"
                      : "trabalhadores CLT"}
                .
              </div>
            )}

            <div className="rounded-lg bg-primary-blue-light p-4">
              <h4 className="mb-2 font-semibold text-primary-blue-dark">Resumo do Empréstimo</h4>
              <ul className="space-y-1 text-sm text-text-secondary">
                <li>
                  Valor solicitado:{" "}
                  <strong>{currencyBR(result.totalAmount - result.totalInterest)}</strong>
                </li>
                <li>
                  Valor líquido (desconta IOF): <strong>{currencyBR(result.liquidValue)}</strong>
                </li>
                <li>
                  Total a pagar: <strong>{currencyBR(result.totalAmount)}</strong>
                </li>
                <li>
                  Total de juros: <strong>{currencyBR(result.totalInterest)}</strong>
                </li>
                <li>
                  IOF: <strong>{currencyBR(result.iofAmount)}</strong>
                </li>
              </ul>
            </div>

            {/* Tabela de Amortização Resumida */}
            <div className="mt-6">
              <h4 className="mb-4 text-lg font-semibold text-text-primary">
                📋 Tabela de Amortização ({result.amortizationSystem === "price" ? "Price" : "SAC"})
              </h4>

              {/* Versão Desktop */}
              <div className="hidden overflow-x-auto rounded-lg border border-neutral-surface-variant sm:block">
                <table className="w-full bg-background-dark-secondary">
                  <thead className="bg-primary-blue/20">
                    <tr>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-text-primary">
                        Parcela
                      </th>
                      <th className="px-4 py-3 text-right text-sm font-semibold text-text-primary">
                        Valor
                      </th>
                      <th className="px-4 py-3 text-right text-sm font-semibold text-text-primary">
                        Juros
                      </th>
                      <th className="px-4 py-3 text-right text-sm font-semibold text-text-primary">
                        Amortização
                      </th>
                      <th className="px-4 py-3 text-right text-sm font-semibold text-text-primary">
                        Saldo
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {result.schedule.slice(0, 6).map((payment) => (
                      <tr
                        key={payment.month}
                        className="border-t border-neutral-surface-variant hover:bg-primary-blue/5"
                      >
                        <td className="px-4 py-2 text-left text-text-primary">{payment.month}ª</td>
                        <td className="px-4 py-2 text-right font-medium text-growth-green">
                          {currencyBR(payment.payment)}
                        </td>
                        <td className="px-4 py-2 text-right text-system-warning">
                          {currencyBR(payment.interest)}
                        </td>
                        <td className="px-4 py-2 text-right text-primary-blue-dark">
                          {currencyBR(payment.principal)}
                        </td>
                        <td className="px-4 py-2 text-right text-text-secondary">
                          {currencyBR(payment.balance)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Versão Mobile */}
              <div className="block space-y-3 sm:hidden">
                {result.schedule.slice(0, 4).map((payment) => (
                  <div
                    key={payment.month}
                    className="rounded-lg border border-neutral-surface-variant bg-background-dark-secondary p-3"
                  >
                    <div className="mb-2 flex items-center justify-between">
                      <span className="font-medium text-text-primary">
                        {payment.month}ª Parcela
                      </span>
                      <span className="text-lg font-bold text-growth-green">
                        {currencyBR(payment.payment)}
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div>
                        <p className="text-text-secondary">Juros</p>
                        <p className="font-medium text-system-warning">
                          {currencyBR(payment.interest)}
                        </p>
                      </div>
                      <div>
                        <p className="text-text-secondary">Amortização</p>
                        <p className="font-medium text-primary-blue-dark">
                          {currencyBR(payment.principal)}
                        </p>
                      </div>
                    </div>
                    <div className="mt-2 border-t border-neutral-surface-variant pt-2">
                      <div className="flex justify-between">
                        <span className="text-xs text-text-secondary">Saldo Devedor</span>
                        <span className="text-xs text-text-secondary">
                          {currencyBR(payment.balance)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {result.schedule.length > 6 && (
                <p className="mt-3 text-center text-sm text-text-secondary">
                  Mostrando primeiras {result.schedule.length > 6 ? "6" : result.schedule.length} de{" "}
                  {result.schedule.length} parcelas
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Seção: Modalidades de Empréstimo Consignado - Guia Completo */}
      <Card className="border-l-4 border-primary-blue bg-gradient-to-r from-primary-blue-light to-growth-green-soft duration-300">
        <CardHeader>
          <CardTitle as="h2" className="text-2xl font-bold text-text-primary">
            🎯 Modalidades de Empréstimo Consignado – Guia Completo 2026
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-8">
            {/* Aposentados INSS */}
            <div className="rounded-xl border border-primary-blue/20 bg-gray-900 p-6">
              <h3
                className="mb-4 flex items-center text-xl font-bold text-primary-blue-dark"
                role="heading"
                aria-level="3"
              >
                👴 Aposentados INSS
              </h3>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <h4 className="mb-3 font-semibold text-growth-green">🔍 Características</h4>
                  <p className="mb-4 text-sm text-text-secondary">
                    Empréstimo com desconto automático no benefício do INSS, oferecendo segurança
                    para o banco e melhores condições para o aposentado.
                  </p>

                  <h4 className="mb-3 font-semibold text-system-info">📊 Limites</h4>
                  <ul className="mb-4 space-y-1 text-sm text-text-secondary">
                    <li>• Margem: até 35% do benefício</li>
                    <li>• Prazo: até 84 meses</li>
                    <li>• Taxa: 1,5% a 3,5% a.m.</li>
                  </ul>
                </div>

                <div>
                  <h4 className="mb-3 font-semibold text-system-success">✅ Vantagens</h4>
                  <ul className="mb-4 space-y-1 text-sm text-text-secondary">
                    <li>• Menores taxas de juros</li>
                    <li>• Sem consulta ao SPC/Serasa</li>
                    <li>• Desconto automático</li>
                  </ul>

                  <h4 className="mb-3 font-semibold text-system-warning">⚠️ Atenção</h4>
                  <ul className="space-y-1 text-sm text-text-secondary">
                    <li>• Compromete a renda mensal</li>
                    <li>• IOF incidente</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Servidores Públicos */}
            <div className="rounded-xl border border-growth-green/20 bg-gray-900 p-6">
              <h3
                className="mb-4 flex items-center text-xl font-bold text-growth-green"
                role="heading"
                aria-level="3"
              >
                💼 Servidores Públicos
              </h3>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <h4 className="mb-3 font-semibold text-primary-blue-dark">🔍 Características</h4>
                  <p className="mb-4 text-sm text-text-secondary">
                    Empréstimo com desconto direto na folha de pagamento, oferecendo estabilidade e
                    melhores condições devido à segurança do vínculo.
                  </p>

                  <h4 className="mb-3 font-semibold text-system-info">📊 Limites</h4>
                  <ul className="mb-4 space-y-1 text-sm text-text-secondary">
                    <li>• Margem: até 30% do salário líquido</li>
                    <li>• Prazo: até 96 meses</li>
                    <li>• Taxa: 1,2% a 3,0% a.m.</li>
                  </ul>
                </div>

                <div>
                  <h4 className="mb-3 font-semibold text-system-success">✅ Vantagens</h4>
                  <ul className="mb-4 space-y-1 text-sm text-text-secondary">
                    <li>• Menores taxas do mercado</li>
                    <li>• Maior prazo disponível</li>
                    <li>• Processo simplificado</li>
                  </ul>

                  <h4 className="mb-3 font-semibold text-system-warning">⚠️ Considerações</h4>
                  <ul className="space-y-1 text-sm text-text-secondary">
                    <li>• Margem menor que aposentados</li>
                    <li>• Depende da estabilidade do cargo</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Pensionistas */}
            <div className="rounded-xl border border-system-warning/20 bg-gray-900 p-6">
              <h3
                className="mb-4 flex items-center text-xl font-bold text-system-warning"
                role="heading"
                aria-level="3"
              >
                💰 Pensionistas
              </h3>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <h4 className="mb-3 font-semibold text-growth-green">🔍 Características</h4>
                  <p className="mb-4 text-sm text-text-secondary">
                    Empréstimo para beneficiários de pensão por morte do INSS, com desconto direto
                    no benefício recebido.
                  </p>

                  <h4 className="mb-3 font-semibold text-system-info">📊 Limites</h4>
                  <ul className="mb-4 space-y-1 text-sm text-text-secondary">
                    <li>• Margem: até 35% do benefício</li>
                    <li>• Prazo: até 84 meses</li>
                    <li>• Taxa: 1,6% a 3,8% a.m.</li>
                  </ul>
                </div>

                <div>
                  <h4 className="mb-3 font-semibold text-system-success">✅ Vantagens</h4>
                  <ul className="mb-4 space-y-1 text-sm text-text-secondary">
                    <li>• Mesma margem dos aposentados</li>
                    <li>• Processo desburocratizado</li>
                    <li>• Taxas competitivas</li>
                  </ul>

                  <h4 className="mb-3 font-semibold text-system-warning">⚠️ Considerações</h4>
                  <ul className="space-y-1 text-sm text-text-secondary">
                    <li>• Pode ter taxas ligeiramente maiores</li>
                    <li>• Depende da continuidade do benefício</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Trabalhadores CLT */}
            <div className="rounded-xl border border-system-info/20 bg-gray-900 p-6">
              <h3
                className="mb-4 flex items-center text-xl font-bold text-system-info"
                role="heading"
                aria-level="3"
              >
                💼 Trabalhadores CLT
              </h3>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <h4 className="mb-3 font-semibold text-growth-green">🔍 Características</h4>
                  <p className="mb-4 text-sm text-text-secondary">
                    Empréstimo para trabalhadores de empresas privadas com desconto autorizado na
                    folha de pagamento da empresa.
                  </p>

                  <h4 className="mb-3 font-semibold text-system-info">📊 Limites</h4>
                  <ul className="mb-4 space-y-1 text-sm text-text-secondary">
                    <li>• Margem: até 30% do salário líquido</li>
                    <li>• Prazo: até 72 meses</li>
                    <li>• Taxa: 2,0% a 4,5% a.m.</li>
                  </ul>
                </div>

                <div>
                  <h4 className="mb-3 font-semibold text-system-success">✅ Vantagens</h4>
                  <ul className="mb-4 space-y-1 text-sm text-text-secondary">
                    <li>• Desconto automático na folha</li>
                    <li>• Sem consulta ao SPC/Serasa</li>
                    <li>• Aprovação rápida</li>
                  </ul>

                  <h4 className="mb-3 font-semibold text-system-warning">⚠️ Considerações</h4>
                  <ul className="space-y-1 text-sm text-text-secondary">
                    <li>• Depende da empresa conveniada</li>
                    <li>• Taxas geralmente mais altas</li>
                    <li>• Prazo menor que servidores</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Seção: Comparação de Modalidades */}
      <Card className="border border-neutral-surface-variant bg-background-dark-secondary duration-300">
        <CardHeader>
          <CardTitle as="h2" className="text-xl font-bold text-text-primary">
            ⚖️ Tabela Comparativa: Qual Modalidade Escolher?
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div
            className="overflow-x-auto"
            role="region"
            aria-label="Tabela comparativa de modalidades"
          >
            <table
              className="w-full border-collapse text-sm"
              role="table"
              aria-label="Comparação entre modalidades de empréstimo consignado"
            >
              <thead>
                <tr className="border-b-2 border-neutral-surface-variant">
                  <th className="p-3 text-left font-semibold">Critério</th>
                  <th className="p-3 text-center font-semibold text-primary-blue-dark">
                    Aposentado INSS
                  </th>
                  <th className="p-3 text-center font-semibold text-growth-green">
                    Servidor Público
                  </th>
                  <th className="p-3 text-center font-semibold text-system-warning">
                    Pensionista INSS
                  </th>
                  <th className="p-3 text-center font-semibold text-system-info">
                    Trabalhador CLT
                  </th>
                </tr>
              </thead>
              <tbody className="space-y-2">
                <tr className="border-b border-neutral-surface-variant">
                  <td className="p-3 font-medium">Margem Consignável</td>
                  <td className="p-3 text-center text-primary-blue-dark">Até 35%</td>
                  <td className="p-3 text-center text-growth-green">Até 30%</td>
                  <td className="p-3 text-center text-system-warning">Até 35%</td>
                  <td className="p-3 text-center text-system-info">Até 30%</td>
                </tr>
                <tr className="border-b border-neutral-surface-variant">
                  <td className="p-3 font-medium">Taxa de Juros</td>
                  <td className="p-3 text-center">1,5% a 3,5% a.m.</td>
                  <td className="p-3 text-center">1,2% a 3,0% a.m.</td>
                  <td className="p-3 text-center">1,6% a 3,8% a.m.</td>
                  <td className="p-3 text-center">2,0% a 4,5% a.m.</td>
                </tr>
                <tr className="border-b border-neutral-surface-variant">
                  <td className="p-3 font-medium">Prazo Máximo</td>
                  <td className="p-3 text-center text-growth-green">84 meses</td>
                  <td className="p-3 text-center">96 meses</td>
                  <td className="p-3 text-center">84 meses</td>
                  <td className="p-3 text-center">72 meses</td>
                </tr>
                <tr className="border-b border-neutral-surface-variant">
                  <td className="p-3 font-medium">Documentação</td>
                  <td className="p-3 text-center">Simples</td>
                  <td className="p-3 text-center">Mínima</td>
                  <td className="p-3 text-center">Simples</td>
                  <td className="p-3 text-center">Média</td>
                </tr>
                <tr className="border-b border-neutral-surface-variant">
                  <td className="p-3 font-medium">Aprovação</td>
                  <td className="p-3 text-center">Rápida</td>
                  <td className="p-3 text-center">Muito rápida</td>
                  <td className="p-3 text-center">Rápida</td>
                  <td className="p-3 text-center">Média</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium">Melhor para</td>
                  <td className="p-3 text-center text-primary-blue-dark">
                    Valor alto, prazo médio
                  </td>
                  <td className="p-3 text-center text-growth-green">Melhor taxa, prazo longo</td>
                  <td className="p-3 text-center text-system-warning">
                    Margem alta, flexibilidade
                  </td>
                  <td className="p-3 text-center text-system-info">Empresa conveniada</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-lg border border-primary-blue/20 bg-primary-blue-light p-4">
              <h4 className="mb-2 font-bold text-primary-blue-dark">👴 Aposentados</h4>
              <p className="text-sm text-text-secondary">
                Ideal para <strong>emergências</strong> com margem de 35% e taxas competitivas.
              </p>
            </div>

            <div className="rounded-lg border border-growth-green/20 bg-growth-green-soft p-4">
              <h4 className="mb-2 font-bold text-growth-green">💼 Servidores</h4>
              <p className="text-sm text-text-secondary">
                Melhores <strong>condições do mercado</strong> com taxas baixas e prazo estendido.
              </p>
            </div>

            <div className="rounded-lg border border-system-warning/20 bg-system-warning/10 p-4">
              <h4 className="mb-2 font-bold text-system-warning">💰 Pensionistas</h4>
              <p className="text-sm text-text-secondary">
                <strong>Flexibilidade</strong> com margem de 35% e processo simplificado.
              </p>
            </div>

            <div className="rounded-lg border border-system-info/20 bg-system-info/10 p-4">
              <h4 className="mb-2 font-bold text-system-info">💼 CLT</h4>
              <p className="text-sm text-text-secondary">
                <strong>Conveniência</strong> com desconto na folha, mas taxas mais altas.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <FAQ
        title="Perguntas Frequentes - Calculadora de Empréstimo Consignado"
        items={[
          {
            question: "O que é empréstimo consignado?",
            answer:
              "Empréstimo consignado é uma modalidade de crédito onde as parcelas são descontadas diretamente da folha de pagamento ou benefício, oferecendo menores taxas devido à garantia de pagamento.",
            borderColor: "primary-blue",
          },
          {
            question: "Qual a margem consignável disponível?",
            answer:
              "Aposentados e pensionistas podem comprometer até 35% do benefício líquido, enquanto servidores públicos podem usar até 30% do salário líquido para pagamento de consignados.",
            borderColor: "growth-green",
          },
          {
            question: "Como é calculado o IOF?",
            answer:
              "O IOF incide sobre o valor do empréstimo: 0,38% fixo + 0,0082% por dia (limitado a 30 dias). É descontado do valor liberado, reduzindo o montante líquido recebido.",
            borderColor: "system-info",
          },
          {
            question: "Posso quitar antecipadamente?",
            answer:
              "Sim, a quitação antecipada é permitida com desconto proporcional dos juros. O desconto varia conforme a instituição e pode representar economia significativa.",
            borderColor: "system-warning",
          },
          {
            question: "Qual a diferença entre CET e taxa de juros?",
            answer:
              "A taxa de juros é apenas os juros mensais, enquanto o CET (Custo Efetivo Total) inclui todos os custos: juros, IOF, taxas administrativas e seguros, representando o custo real total.",
            borderColor: "growth-green",
          },
          {
            question: "Como escolher entre as modalidades?",
            answer:
              "Servidores têm as melhores condições (menor taxa, maior prazo). Aposentados e pensionistas têm margem maior (35%). CLT depende da empresa conveniada. Compare sempre o CET total.",
            borderColor: "system-error-dark",
          },
        ]}
        tipSection={{
          title: "Dica Importante sobre Empréstimo Consignado",
          content:
            "<strong>Para a melhor decisão:</strong> compare sempre o CET (não apenas a taxa de juros), respeite sua margem consignável e negocie condições. Use apenas para necessidades reais.",
        }}
        footerText="<strong>Lembre-se:</strong> Empréstimo consignado compromete sua renda mensal. Avalie sua capacidade de pagamento e considere o prazo total antes de contratar."
      />

      {/* Footer com informações adicionais */}
      <Card className="border-l-4 border-primary-blue bg-primary-blue-light duration-300">
        <CardHeader>
          <CardTitle as="h2" className="text-lg font-bold text-text-primary">
            📚 Como Usar Esta Calculadora de Empréstimo Consignado
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 text-sm text-text-secondary">
            <p>
              Esta{" "}
              <strong className="text-primary-blue-dark">
                calculadora de empréstimo consignado
              </strong>{" "}
              utiliza <strong className="text-growth-green">simulações financeiras</strong> para
              estimar parcelas, CET, IOF e margem consignável para diferentes modalidades de
              beneficiários.
            </p>
            <p>
              <strong>Modalidades disponíveis:</strong> Aposentados INSS, Servidores Públicos e
              Pensionistas. Cada categoria possui limites e taxas específicas conforme a legislação.
            </p>
            <p>
              <strong className="text-system-warning">Importante:</strong> Esta ferramenta é para
              fins educacionais e de planejamento pessoal. Para decisões de crédito, consulte sempre
              as <strong>instituições financeiras autorizadas</strong> e avalie sua capacidade de
              pagamento.
            </p>
            <p className="mt-4 border-t border-primary-blue/20 pt-3 text-xs opacity-75">
              🔎 Foco didático • 💰 Simulações realistas • 🔒 Dados não armazenados • 📱 Compatível
              com todos os dispositivos • 🌙 Suporte a modo escuro
            </p>
          </div>
        </CardContent>
      </Card>

      <RelatedCalculators category="financas" currentCalculatorId="emprestimo-consignado" />
    </div>
  );
}
