import type { MetaFunction } from "@remix-run/node";
import { useEffect, useRef, useState } from "react";
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
import { APP_NAME } from "~/lib/constants";
import { ECONOMIC_INDICATORS } from "~/lib/economic-data";
import { useAutoCalculatorTracking, useFormTracking } from "~/hooks/useAutoCalculatorTracking";

export const meta: MetaFunction = () => {
  return [
    {
      title: "Calculadora de Empréstimo Consignado 2025 – Simulador Completo | CalculadoraOnlineBR",
    },
    {
      name: "description",
      content:
        "Simule empréstimo consignado com cálculo de parcelas, CET, IOF e taxas. Descubra valor líquido, total de juros e compare modalidades para aposentados e servidores.",
    },
    {
      name: "keywords",
      content:
        "calculadora empréstimo consignado, simulador consignado, parcela consignado, CET, IOF, juros consignado, aposentado, servidor público",
    },
    { name: "author", content: "Calculadora Online BR" },
    {
      name: "robots",
      content: "index,follow,max-snippet:-1,max-image-preview:large,max-video-preview:-1",
    },
    {
      name: "googlebot",
      content: "index,follow,max-snippet:-1,max-image-preview:large,max-video-preview:-1",
    },
    { name: "bingbot", content: "index,follow" },
    {
      rel: "canonical",
      href: "https://calculadoraonlinebr.com.br/calculadoras/financas/emprestimo-consignado",
    },
    {
      property: "og:title",
      content: "Calculadora de Empréstimo Consignado 2025 – Simulador Completo",
    },
    {
      property: "og:description",
      content:
        "Simule empréstimo consignado com cálculo de parcelas, CET, IOF e taxas. Descubra valor líquido, total de juros e compare modalidades para aposentados e servidores.",
    },
    {
      property: "og:image",
      content: "https://www.calculadoraonlinebr.com.br/android-chrome-192x192.webp",
    },
    {
      property: "og:image:alt",
      content:
        "Calculadora de Empréstimo Consignado - Simule parcelas, CET e IOF para aposentados e servidores",
    },
    {
      property: "og:image:width",
      content: "1200",
    },
    {
      property: "og:image:height",
      content: "630",
    },
    { property: "og:type", content: "website" },
    {
      property: "og:url",
      content: "https://calculadoraonlinebr.com.br/calculadoras/financas/emprestimo-consignado",
    },
    { property: "og:site_name", content: APP_NAME },
    { property: "og:locale", content: "pt_BR" },
    { name: "twitter:card", content: "summary_large_image" },
    {
      name: "twitter:title",
      content: "Calculadora de Empréstimo Consignado 2025 – Simulador Completo",
    },
    {
      name: "twitter:description",
      content:
        "Simule empréstimo consignado com cálculo de parcelas, CET, IOF e taxas. Descubra valor líquido e total de juros.",
    },
    {
      name: "twitter:image",
      content: "https://www.calculadoraonlinebr.com.br/android-chrome-192x192.webp",
    },
    {
      name: "twitter:image:alt",
      content: "Calculadora de Empréstimo Consignado - Simule parcelas e taxas",
    },
    { name: "twitter:site", content: "@CalculadoraBR" },
    { name: "twitter:creator", content: "@CalculadoraBR" },
    { name: "format-detection", content: "telephone=no" },
    { name: "mobile-web-app-capable", content: "yes" },
    { name: "apple-mobile-web-app-capable", content: "yes" },
    { name: "apple-mobile-web-app-status-bar-style", content: "black-translucent" },
    { name: "theme-color", content: "#64B5F6" },
    { httpEquiv: "content-language", content: "pt-br" },
    { name: "geo.region", content: "BR" },
    { name: "geo.country", content: "Brazil" },
    { name: "next-head-count", content: "32" },
    {
      "script:ld+json": JSON.stringify({
        "@context": "https://schema.org",
        "@type": "WebApplication",
        name: "Calculadora de Empréstimo Consignado - Simulador Completo 2025",
        description:
          "Simulador gratuito de empréstimo consignado com cálculo de parcelas, CET, IOF e taxas para aposentados, pensionistas e servidores públicos.",
        url: "https://calculadoraonlinebr.com.br/calculadoras/financas/emprestimo-consignado",
        applicationCategory: "FinanceApplication",
        operatingSystem: "Web Browser",
        isAccessibleForFree: true,
        inLanguage: "pt-BR",
        dateModified: "2025-01-24",
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "BRL",
        },
        publisher: {
          "@type": "Organization",
          name: "CalculadoraOnlineBR",
          url: "https://calculadoraonlinebr.com.br",
          logo: {
            "@type": "ImageObject",
            url: "https://calculadoraonlinebr.com.br/android-chrome-192x192.webp",
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
          "@id": "https://calculadoraonlinebr.com.br/calculadoras/financas/emprestimo-consignado",
          name: "Calculadora de Empréstimo Consignado 2025 - Simulador Completo",
          description:
            "Simule empréstimo consignado com cálculo de parcelas, CET, IOF e taxas para aposentados, pensionistas e servidores públicos.",
          inLanguage: "pt-BR",
          isPartOf: {
            "@type": "WebSite",
            name: "CalculadoraOnlineBR",
            url: "https://calculadoraonlinebr.com.br",
            description: "Calculadoras online gratuitas para facilitar seu dia a dia",
            potentialAction: {
              "@type": "SearchAction",
              target: "https://calculadoraonlinebr.com.br/search?q={search_term_string}",
              "query-input": "required name=search_term_string",
            },
          },
          breadcrumb: {
            "@type": "BreadcrumbList",
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                name: "Início",
                item: "https://calculadoraonlinebr.com.br",
              },
              {
                "@type": "ListItem",
                position: 2,
                name: "Calculadoras",
                item: "https://calculadoraonlinebr.com.br/calculadoras",
              },
              {
                "@type": "ListItem",
                position: 3,
                name: "Finanças",
                item: "https://calculadoraonlinebr.com.br/calculadoras/financas",
              },
              {
                "@type": "ListItem",
                position: 4,
                name: "Calculadora de Empréstimo Consignado",
                item: "https://calculadoraonlinebr.com.br/calculadoras/financas/emprestimo-consignado",
              },
            ],
          },
        },
        about: {
          "@type": "FinancialProduct",
          name: "Empréstimo Consignado",
          description: "Modalidade de crédito com desconto em folha para aposentados, pensionistas e servidores",
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
      }),
    },
  ];
};

type LoanType = "aposentado" | "servidor" | "pensionista" | "clt";

interface PayrollLoanResult {
  monthlyPayment: number;
  totalAmount: number;
  totalInterest: number;
  liquidValue: number;
  iofAmount: number;
  cetPercentage: number;
  effectiveRate: number;
  marginUsed: number;
}

interface ValidationErrors {
  loanAmount?: string;
  months?: string;
  monthlyRate?: string;
  salary?: string;
}

export default function PayrollLoanCalculator() {
  const [loanType, setLoanType] = useState<LoanType>("aposentado");
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
        return 0.30; // 30%
      default:
        return 0.30;
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
      const monthlyPayment = loan * (rate * Math.pow(1 + rate, m)) / (Math.pow(1 + rate, m) - 1);
      const maxMargin = getMaxMargin(loanType);
      const maxPayment = sal * maxMargin;
      
      if (monthlyPayment > maxPayment) {
        const maxLoanAmount = maxPayment * (Math.pow(1 + rate, m) - 1) / (rate * Math.pow(1 + rate, m));
        newErrors.loanAmount = `Valor excede margem consignável. Máximo: ${currencyBR(maxLoanAmount)} (${percentBR(maxMargin * 100, 0)}% de ${currencyBR(sal)})`;
        ok = false;
      }
    }
    
    setErrors(newErrors);
    return ok;
  };


  const handleCalculate = () => {
    if (!validateInputs()) return;
    startCalculation("calcular");
    try {
      const loan = parseMoney(loanAmount);
      const m = parseInt(months, 10);
      const rate = parseRate(monthlyRate);
      const sal = parseMoney(salary);

      // Cálculo da parcela usando fórmula de amortização
      const monthlyPayment = loan * (rate * Math.pow(1 + rate, m)) / (Math.pow(1 + rate, m) - 1);
      
      // Total a ser pago
      const totalAmount = monthlyPayment * m;
      
      // Total de juros
      const totalInterest = totalAmount - loan;
      
      // IOF sobre o valor do empréstimo (0,38% do valor + 0,0082% por dia, limitado a 30 dias)
      const iofRate = 0.0038; // 0,38%
      const iofDaily = 0.000082; // 0,0082% ao dia
      const daysIOF = Math.min(30, m * 30); // Considera 30 dias por mês, limitado a 30 dias
      const iofAmount = loan * (iofRate + (iofDaily * daysIOF));
      
      // Valor líquido (valor solicitado - IOF)
      const liquidValue = loan - iofAmount;
      
      // CET (Custo Efetivo Total) - taxa equivalente mensal
      const cetPercentage = rate * 100;
      
      // Taxa efetiva anual
      const effectiveRate = (Math.pow(1 + rate, 12) - 1) * 100;
      
      // Margem consignável usada
      const maxMargin = getMaxMargin(loanType);
      const marginUsed = (monthlyPayment / sal) * 100;

      const res: PayrollLoanResult = {
        monthlyPayment,
        totalAmount,
        totalInterest,
        liquidValue,
        iofAmount,
        cetPercentage,
        effectiveRate,
        marginUsed,
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
    <div className="mx-auto max-w-2xl space-y-8 px-4 md:max-w-4xl lg:max-w-6xl">
      <Breadcrumb>
        <BreadcrumbItem href="/">Início</BreadcrumbItem>
        <BreadcrumbItem href="/calculadoras">Calculadoras</BreadcrumbItem>
        <BreadcrumbItem href="/calculadoras/financas">Finanças</BreadcrumbItem>
        <BreadcrumbItem isLast>Empréstimo Consignado</BreadcrumbItem>
      </Breadcrumb>

      <header className="space-y-4 text-center">
        <h1 className="mb-4 text-3xl font-bold text-text-primary md:text-4xl">
          Calculadora de Empréstimo Consignado 2025 – Simulador Completo
        </h1>
        <p className="mx-auto max-w-3xl text-lg text-text-secondary-dark">
          Calcule a <strong className="text-growth-green">parcela do seu empréstimo consignado</strong>{" "}
          considerando valor, prazo e taxa de juros. Compare modalidades e receba{" "}
          <strong className="text-primary-blue-dark">análise de margem consignável</strong> para apoiar
          suas decisões.
        </p>
        <div className="inline-block rounded-lg bg-growth-green-soft p-4 duration-300">
          <p className="text-sm font-medium text-text-primary">
            🔎 <strong>Cálculo Preciso</strong> • 📊 <strong>Análise de CET</strong> • ⚙️{" "}
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
          <div className="mb-6 flex flex-wrap justify-center gap-2">
            <div className="inline-flex overflow-hidden rounded-lg border border-neutral-surface-variant">
              <button
                type="button"
                onClick={() => setLoanType("aposentado")}
                className={`min-w-[100px] flex-1 basis-0 py-3 text-center text-sm font-medium transition ${
                  loanType === "aposentado"
                    ? "bg-primary-blue text-white"
                    : "bg-neutral-surface text-text-secondary hover:bg-primary-blue/10"
                }`}
              >
                Aposentado
              </button>
              <button
                type="button"
                onClick={() => setLoanType("servidor")}
                className={`min-w-[100px] flex-1 basis-0 py-3 text-center text-sm font-medium transition ${
                  loanType === "servidor"
                    ? "bg-primary-blue text-white"
                    : "bg-neutral-surface text-text-secondary hover:bg-primary-blue/10"
                }`}
              >
                Servidor
              </button>
              <button
                type="button"
                onClick={() => setLoanType("pensionista")}
                className={`min-w-[100px] flex-1 basis-0 py-3 text-center text-sm font-medium transition ${
                  loanType === "pensionista"
                    ? "bg-primary-blue text-white"
                    : "bg-neutral-surface text-text-secondary hover:bg-primary-blue/10"
                }`}
              >
                Pensionista
              </button>
              <button
                type="button"
                onClick={() => setLoanType("clt")}
                className={`min-w-[100px] flex-1 basis-0 py-3 text-center text-sm font-medium transition ${
                  loanType === "clt"
                    ? "bg-primary-blue text-white"
                    : "bg-neutral-surface text-text-secondary hover:bg-primary-blue/10"
                }`}
              >
                CLT
              </button>
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
              <div className="mt-1 text-xs text-text-secondary">
                Valor líquido mensal recebido
              </div>
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
            <Button onClick={handleCalculate} className="px-8">
              Calcular
            </Button>
            <Button
              onClick={handleReset}
              variant="outline"
              className="border-system-error px-8 text-system-error hover:bg-system-error hover:text-white"
            >
              Limpar
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Resultado */}
      {result && (
        <Card ref={resultRef as any} className="border-2 border-growth-green bg-growth-green-soft">
          <CardHeader>
            <CardTitle as="h3" className="text-growth-green">
              📊 Resultado da Simulação de Empréstimo Consignado
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-3">
              <div className="rounded-lg bg-gray-900 p-6 text-center">
                <div className="text-4xl font-bold text-growth-green">
                  {currencyBR(result.monthlyPayment)}
                </div>
                <div className="text-sm text-text-secondary">Parcela Mensal</div>
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
                <div className="text-sm text-text-secondary">{percentBR(result.effectiveRate, 2)}% a.a.</div>
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
                <div className={`text-xl font-bold ${
                  result.marginUsed > 35 ? 'text-system-error' : 
                  result.marginUsed > 30 ? 'text-system-warning' : 'text-system-success'
                }`}>
                  {percentBR(result.marginUsed, 1)}%
                </div>
                <div className="text-sm text-text-secondary">Da renda líquida</div>
              </div>
            </div>

            {result.marginUsed > (getMaxMargin(loanType) * 100) && (
              <div className="mb-6 rounded border border-system-error/20 bg-system-error/10 p-3 text-sm text-system-error">
                ⚠️ Margem consignável excedida! O limite é {percentBR(getMaxMargin(loanType) * 100, 0)}% para {loanType === "aposentado" ? "aposentados" : loanType === "pensionista" ? "pensionistas" : loanType === "servidor" ? "servidores" : "trabalhadores CLT"}.
              </div>
            )}

            <div className="rounded-lg bg-primary-blue-light p-4">
              <h4 className="mb-2 font-semibold text-primary-blue-dark">Resumo do Empréstimo</h4>
              <ul className="space-y-1 text-sm text-text-secondary">
                <li>
                  Valor solicitado: <strong>{currencyBR(result.totalAmount - result.totalInterest)}</strong>
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
          </CardContent>
        </Card>
      )}

      {/* Seção: Modalidades de Empréstimo Consignado - Guia Completo */}
      <Card className="border-l-4 border-primary-blue bg-gradient-to-r from-primary-blue-light to-growth-green-soft duration-300">
        <CardHeader>
          <CardTitle as="h2" className="text-2xl font-bold text-text-primary">
            🎯 Modalidades de Empréstimo Consignado – Guia Completo 2025
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-8">
            {/* Aposentados INSS */}
            <div className="rounded-xl border border-primary-blue/20 bg-gray-900 p-6">
              <h3 className="mb-4 flex items-center text-xl font-bold text-primary-blue-dark">
                👴 Aposentados INSS
              </h3>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <h4 className="mb-3 font-semibold text-growth-green">🔍 Características</h4>
                  <p className="mb-4 text-sm text-text-secondary">
                    Empréstimo com desconto automático no benefício do INSS, oferecendo
                    segurança para o banco e melhores condições para o aposentado.
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
              <h3 className="mb-4 flex items-center text-xl font-bold text-growth-green">
                💼 Servidores Públicos
              </h3>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <h4 className="mb-3 font-semibold text-primary-blue-dark">🔍 Características</h4>
                  <p className="mb-4 text-sm text-text-secondary">
                    Empréstimo com desconto direto na folha de pagamento, oferecendo
                    estabilidade e melhores condições devido à segurança do vínculo.
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
              <h3 className="mb-4 flex items-center text-xl font-bold text-system-warning">
                💰 Pensionistas
              </h3>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <h4 className="mb-3 font-semibold text-growth-green">🔍 Características</h4>
                  <p className="mb-4 text-sm text-text-secondary">
                    Empréstimo para beneficiários de pensão por morte do INSS,
                    com desconto direto no benefício recebido.
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
              <h3 className="mb-4 flex items-center text-xl font-bold text-system-info">
                💼 Trabalhadores CLT
              </h3>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <h4 className="mb-3 font-semibold text-growth-green">🔍 Características</h4>
                  <p className="mb-4 text-sm text-text-secondary">
                    Empréstimo para trabalhadores de empresas privadas com desconto
                    autorizado na folha de pagamento da empresa.
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
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="border-b-2 border-neutral-surface-variant">
                  <th className="p-3 text-left font-semibold">Critério</th>
                  <th className="p-3 text-center font-semibold text-primary-blue-dark">
                    Aposentado INSS
                  </th>
                  <th className="p-3 text-center font-semibold text-growth-green">Servidor Público</th>
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
                  <td className="p-3 text-center text-primary-blue-dark">Valor alto, prazo médio</td>
                  <td className="p-3 text-center text-growth-green">Melhor taxa, prazo longo</td>
                  <td className="p-3 text-center text-system-warning">Margem alta, flexibilidade</td>
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
              Esta <strong className="text-primary-blue-dark">calculadora de empréstimo consignado</strong> utiliza{" "}
              <strong className="text-growth-green">simulações financeiras</strong> para estimar
              parcelas, CET, IOF e margem consignável para diferentes modalidades de beneficiários.
            </p>
            <p>
              <strong>Modalidades disponíveis:</strong> Aposentados INSS, Servidores Públicos e
              Pensionistas. Cada categoria possui limites e taxas específicas conforme a legislação.
            </p>
            <p>
              <strong className="text-system-warning">Importante:</strong> Esta ferramenta é para
              fins educacionais e de planejamento pessoal. Para decisões de crédito, consulte
              sempre as <strong>instituições financeiras autorizadas</strong> e avalie sua
              capacidade de pagamento.
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
