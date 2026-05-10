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
import { APP_NAME } from "~/lib/constants";
import { useAutoCalculatorTracking, useFormTracking } from "~/hooks/useAutoCalculatorTracking";

export const meta: MetaFunction = () => {
  return [
    {
      title: `Calculadora de Financiamento Imobiliário 2026 | ${APP_NAME}`,
    },
    {
      name: "description",
      content:
        "Simule financiamento imobiliário SAC e PRICE. Calcule parcelas, amortização e juros totais para compra da casa própria.",
    },
    { name: "author", content: "CalculadoraOnlineBR" },
    {
      name: "robots",
      content: "index,follow,max-snippet:-1,max-image-preview:large,max-video-preview:-1",
    },
    {
      rel: "canonical",
      href: "https://www.calculadoraonlinebr.com.br/calculadoras/financas/financiamento-imobiliario",
    },
    {
      property: "og:title",
      content: "Financiamento Imobiliário 2026 – Simulador SAC e PRICE",
    },
    {
      property: "og:description",
      content:
        "Simule financiamento imobiliário SAC e PRICE. Calcule parcelas, amortização e juros totais para compra da casa própria.",
    },
    {
      property: "og:image",
      content: "https://www.calculadoraonlinebr.com.br/images/financiamento-imobiliario.webp",
    },
    {
      property: "og:image:alt",
      content:
        "Calculadora de Financiamento Imobiliário - Simule parcelas SAC e PRICE para compra da casa própria",
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
      content:
        "https://www.calculadoraonlinebr.com.br/calculadoras/financas/financiamento-imobiliario",
    },
    { property: "og:site_name", content: APP_NAME },
    { property: "og:locale", content: "pt_BR" },
    { name: "twitter:card", content: "summary_large_image" },
    {
      name: "twitter:title",
      content: "Calculadora de Financiamento Imobiliário 2026 – Simulador SAC e PRICE",
    },
    {
      name: "twitter:description",
      content:
        "Simule financiamento imobiliário com SAC e PRICE. Descubra parcelas, amortização e juros totais.",
    },
    {
      name: "twitter:image",
      content: "https://www.calculadoraonlinebr.com.br/images/financiamento-imobiliario.webp",
    },
    {
      name: "twitter:image:alt",
      content: "Calculadora de Financiamento Imobiliário - Simule parcelas SAC e PRICE",
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
    { rel: "preconnect", href: "https://fonts.googleapis.com" },
    { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
    { rel: "dns-prefetch", href: "https://www.googletagmanager.com" },
    {
      "script:ld+json": JSON.stringify({
        "@context": "https://schema.org",
        "@type": "WebApplication",
        name: "Calculadora de Financiamento Imobiliário - Simulador SAC e PRICE 2026",
        description:
          "Simulador gratuito de financiamento imobiliário com cálculo SAC e PRICE, parcelas, amortização e juros para compra da casa própria.",
        url: "https://www.calculadoraonlinebr.com.br/calculadoras/financas/financiamento-imobiliario",
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
            "https://www.calculadoraonlinebr.com.br/calculadoras/financas/financiamento-imobiliario",
          name: "Calculadora de Financiamento Imobiliário 2026 - Simulador SAC e PRICE",
          description:
            "Simule financiamento imobiliário com cálculo SAC e PRICE, parcelas, amortização e juros para compra da casa própria.",
          inLanguage: "pt-BR",
          isPartOf: {
            "@type": "WebSite",
            name: "CalculadoraOnlineBR",
            url: "https://www.calculadoraonlinebr.com.br",
            description: "Calculadoras online gratuitas para facilitar seu dia a dia",
            potentialAction: {
              "@type": "SearchAction",
              target: "https://www.calculadoraonlinebr.com.br/search?q={search_term_string}",
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
                name: "Calculadora de Financiamento Imobiliário",
                item: "https://www.calculadoraonlinebr.com.br/calculadoras/financas/financiamento-imobiliario",
              },
            ],
          },
        },
        about: {
          "@type": "FinancialProduct",
          name: "Financiamento Imobiliário",
          description:
            "Crédito imobiliário com garantia hipotecária para aquisição da casa própria",
          category: "Mortgage",
        },
        featureList: [
          "Simulação de financiamento SAC (Sistema de Amortização Constante)",
          "Simulação de financiamento PRICE (Tabela Price)",
          "Cálculo de parcelas mensais",
          "Cálculo de amortização",
          "Total de juros pagos",
          "Interface móvel responsiva",
          "Resultados em tempo real",
        ],
      }),
    },
    {
      "script:ld+json": JSON.stringify({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: [
          {
            "@type": "Question",
            name: "Qual a diferença entre Sistema SAC e Sistema PRICE?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "No SAC, a amortização é constante e as prestações diminuem ao longo do tempo, resultando em menor pagamento de juros totais. No PRICE, as prestações são fixas, facilitando o planejamento financeiro, mas resulta em maior pagamento de juros ao longo do contrato.",
            },
          },
          {
            "@type": "Question",
            name: "Qual o valor mínimo de entrada para financiamento imobiliário?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "O valor mínimo da entrada varia de 20% a 30% do valor do imóvel, dependendo da instituição financeira e do programa de financiamento. Para imóveis usados, algumas instituições exigem entrada maior. Programas como Minha Casa Minha Vida podem ter condições especiais.",
            },
          },
          {
            "@type": "Question",
            name: "Quais são os custos adicionais no financiamento imobiliário?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Além das parcelas, há custos como: avaliação do imóvel, seguro habitacional, registro em cartório, ITBI, taxa de abertura de crédito (TAC), e custos de documentação. Esses valores podem somar entre 3% a 6% do valor do imóvel.",
            },
          },
          {
            "@type": "Question",
            name: "É possível fazer amortização extraordinária do financiamento?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Sim, é possível fazer amortizações extraordinárias utilizando o saldo do FGTS anualmente ou recursos próprios a qualquer momento. Você pode optar por reduzir o valor das parcelas ou diminuir o prazo do financiamento, sendo a segunda opção mais vantajosa financeiramente.",
            },
          },
          {
            "@type": "Question",
            name: "Qual a renda necessária para conseguir financiamento imobiliário?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "A prestação do financiamento não pode comprometer mais de 30% da renda líquida familiar. É necessário comprovar renda estável há pelo menos 2 anos, ter idade entre 18 e 80 anos no final do contrato, não ter nome no SPC/Serasa e atender aos critérios de score de crédito da instituição.",
            },
          },
          {
            "@type": "Question",
            name: "Qual sistema escolher: SAC ou PRICE?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "SAC é melhor se você quer pagar menos juros totais e pode arcar com parcelas maiores no início. PRICE é ideal para quem prefere parcelas fixas e planejamento orçamentário estável. Considere sua capacidade de pagamento atual e futura antes de decidir.",
            },
          },
        ],
      }),
    },
  ];
};

type FinancingType = "sac" | "price";

interface MortgageResult {
  monthlyPayment: number;
  totalAmount: number;
  totalInterest: number;
  firstPayment: number;
  lastPayment: number;
  amortization: number;
  interestFirstMonth: number;
  financingType: FinancingType;
}

interface ValidationErrors {
  propertyValue?: string;
  downPayment?: string;
  months?: string;
  annualRate?: string;
}

export default function MortgageCalculator() {
  const [financingType, setFinancingType] = useState<FinancingType>("sac");
  const [propertyValue, setPropertyValue] = useState("");
  const [downPayment, setDownPayment] = useState("");
  const [months, setMonths] = useState("");
  const [annualRate, setAnnualRate] = useState("10,50");
  const [result, setResult] = useState<MortgageResult | null>(null);
  const [errors, setErrors] = useState<ValidationErrors>({});
  const resultRef = useRef<HTMLDivElement>(null);

  const { startCalculation, endCalculation } = useAutoCalculatorTracking({
    calculatorType: "financiamento-imobiliario",
    category: "financas",
  });
  useFormTracking("financiamento-imobiliario");

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

  const calculateSAC = (principal: number, monthlyRate: number, periods: number) => {
    const amortization = principal / periods;
    const firstInterest = principal * monthlyRate;
    const firstPayment = amortization + firstInterest;
    const lastInterest = amortization * monthlyRate;
    const lastPayment = amortization + lastInterest;
    // Fórmula correta SAC: Total de juros = (principal × taxa × (períodos + 1)) / 2
    const totalInterest = (principal * monthlyRate * (periods + 1)) / 2;
    const totalAmount = principal + totalInterest;

    return {
      monthlyPayment: firstPayment,
      totalAmount,
      totalInterest,
      firstPayment,
      lastPayment,
      amortization,
      interestFirstMonth: firstInterest,
      financingType: "sac" as FinancingType,
    };
  };

  const calculatePRICE = (principal: number, monthlyRate: number, periods: number) => {
    const monthlyPayment =
      (principal * (monthlyRate * Math.pow(1 + monthlyRate, periods))) /
      (Math.pow(1 + monthlyRate, periods) - 1);
    const totalAmount = monthlyPayment * periods;
    const totalInterest = totalAmount - principal;
    const firstInterest = principal * monthlyRate;
    const firstAmortization = monthlyPayment - firstInterest;

    return {
      monthlyPayment,
      totalAmount,
      totalInterest,
      firstPayment: monthlyPayment,
      lastPayment: monthlyPayment,
      amortization: firstAmortization,
      interestFirstMonth: firstInterest,
      financingType: "price" as FinancingType,
    };
  };

  const validateInputs = (): boolean => {
    const newErrors: ValidationErrors = {};
    let ok = true;
    const propValue = parseMoney(propertyValue);
    if (propValue <= 0) {
      newErrors.propertyValue = "Valor do imóvel obrigatório e maior que 0";
      ok = false;
    }
    const downPmt = parseMoney(downPayment);
    if (downPmt < 0) {
      newErrors.downPayment = "Entrada não pode ser negativa";
      ok = false;
    }
    if (downPmt >= propValue) {
      newErrors.downPayment = "Entrada deve ser menor que o valor do imóvel";
      ok = false;
    }
    const m = parseInt(months, 10);
    if (!months || isNaN(m) || m <= 0) {
      newErrors.months = "Prazo (meses) obrigatório e maior que 0";
      ok = false;
    }
    if (parseRate(annualRate) <= 0) {
      newErrors.annualRate = "Taxa anual deve ser > 0";
      ok = false;
    }

    setErrors(newErrors);
    return ok;
  };

  const handleCalculate = () => {
    if (!validateInputs()) return;
    startCalculation("calcular");
    try {
      const propValue = parseMoney(propertyValue);
      const downPmt = parseMoney(downPayment);
      const principal = propValue - downPmt;
      const m = parseInt(months, 10);
      const yearRate = parseRate(annualRate);
      const monthlyRate = Math.pow(1 + yearRate, 1 / 12) - 1;

      let res: MortgageResult;

      if (financingType === "sac") {
        res = calculateSAC(principal, monthlyRate, m);
      } else {
        res = calculatePRICE(principal, monthlyRate, m);
      }

      setResult(res);
      setErrors({});
      setTimeout(() => {
        resultRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 50);
      endCalculation("calcular", { success: true });
    } catch {
      setErrors({ propertyValue: "Erro no cálculo. Verifique os valores inseridos." });
      endCalculation("calcular", { success: false });
    }
  };

  const handleReset = () => {
    setPropertyValue("");
    setDownPayment("");
    setMonths("");
    setAnnualRate("10,50");
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
        <BreadcrumbItem isLast>Financiamento Imobiliário</BreadcrumbItem>
      </Breadcrumb>

      <header className="space-y-4 text-center" role="banner">
        <h1 className="mb-4 text-3xl font-bold text-text-primary md:text-4xl">
          Calculadora de Financiamento Imobiliário 2026 – Simulador SAC e PRICE
        </h1>
        <p className="mx-auto max-w-3xl text-lg text-text-secondary-dark">
          Calcule as{" "}
          <strong className="text-growth-green">parcelas do seu financiamento imobiliário</strong>{" "}
          considerando valor do imóvel, entrada e taxa de juros. Compare sistemas SAC e PRICE e
          receba{" "}
          <strong className="text-primary-blue-dark">simulação completa de amortização</strong> para
          apoiar suas decisões.
        </p>
        <div className="inline-block rounded-lg bg-growth-green-soft p-4 duration-300">
          <p className="text-sm font-medium text-text-primary">
            🔎 <strong>Cálculo Completo</strong> • 📊 <strong>SAC e PRICE</strong> • ⚙️{" "}
            <strong>Simulação Completa</strong>
          </p>
        </div>
      </header>

      <Card>
        <CardHeader>
          <CardTitle as="h2">📋 Configure sua Simulação de Financiamento Imobiliário</CardTitle>
        </CardHeader>
        <CardContent>
          {/* Sistema de Amortização centralizado */}
          <div
            className="mb-6 flex flex-wrap justify-center gap-2"
            role="radiogroup"
            aria-label="Sistema de amortização"
          >
            <div className="inline-flex overflow-hidden rounded-lg border border-neutral-surface-variant">
              <button
                type="button"
                onClick={() => setFinancingType("sac")}
                className={`min-w-[120px] flex-1 basis-0 py-3 text-center text-sm font-medium transition ${
                  financingType === "sac"
                    ? "bg-primary-blue text-white"
                    : "bg-neutral-surface text-text-secondary hover:bg-primary-blue/10"
                }`}
                role="radio"
                aria-checked={financingType === "sac"}
                aria-label="Sistema SAC"
              >
                SAC
              </button>
              <button
                type="button"
                onClick={() => setFinancingType("price")}
                className={`min-w-[120px] flex-1 basis-0 py-3 text-center text-sm font-medium transition ${
                  financingType === "price"
                    ? "bg-primary-blue text-white"
                    : "bg-neutral-surface text-text-secondary hover:bg-primary-blue/10"
                }`}
                role="radio"
                aria-checked={financingType === "price"}
                aria-label="Tabela PRICE"
              >
                PRICE
              </button>
            </div>
          </div>

          {/* Valor do Imóvel e Entrada */}
          <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <MoneyInput
                label="Valor do Imóvel"
                value={propertyValue}
                onChange={setPropertyValue}
                placeholder="300.000,00"
                fullWidth
                className="h-12 text-lg"
              />
              <ErrorMessage error={errors.propertyValue} />
            </div>
            <div>
              <MoneyInput
                label="Valor da Entrada"
                value={downPayment}
                onChange={setDownPayment}
                placeholder="60.000,00"
                fullWidth
                className="h-12 text-lg"
              />
              <ErrorMessage error={errors.downPayment} />
              <div className="mt-1 text-xs text-text-secondary">Valor pago à vista na compra</div>
            </div>
          </div>

          {/* Taxa de Juros e Prazo */}
          <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <RateInput
                label="Taxa de Juros (% a.a.)"
                value={annualRate}
                onChange={setAnnualRate}
                placeholder="10,50"
                fullWidth
                className="h-12 text-lg"
              />
              <ErrorMessage error={errors.annualRate} />
              <div className="mt-1 text-xs text-text-secondary">
                Taxa anual de juros do financiamento
              </div>
            </div>
            <div>
              <Input
                type="number"
                label="Prazo (meses)"
                value={months}
                onChange={(e) => setMonths(e.target.value)}
                placeholder="360"
                fullWidth
                className="h-12 text-lg"
              />
              <ErrorMessage error={errors.months} />
              <div className="mt-1 text-xs text-text-secondary">
                Número de parcelas do financiamento
              </div>
            </div>
          </div>

          {/* Botões */}
          <div className="margin-top-4 flex justify-center space-x-4">
            <Button
              onClick={handleCalculate}
              className="px-8"
              aria-label="Calcular financiamento imobiliário"
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
              📊 Resultado da Simulação de Financiamento Imobiliário
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
                  {currencyBR(result.totalAmount)}
                </div>
                <div className="text-sm text-text-secondary">Valor Total</div>
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
                <div className="text-sm text-text-secondary">
                  {result.financingType === "sac" ? "Primeira Parcela" : "Parcela Fixa"}
                </div>
                <div className="text-xl font-bold text-text-primary">
                  {currencyBR(result.firstPayment)}
                </div>
                <div className="text-sm text-text-secondary">
                  {result.financingType === "sac" ? "Sistema SAC" : "Tabela PRICE"}
                </div>
              </div>
              <div className="text-center">
                <div className="text-sm text-text-secondary">
                  {result.financingType === "sac" ? "Última Parcela" : "Amortização"}
                </div>
                <div className="text-xl font-bold text-text-primary">
                  {result.financingType === "sac"
                    ? currencyBR(result.lastPayment)
                    : currencyBR(result.amortization)}
                </div>
                <div className="text-sm text-text-secondary">
                  {result.financingType === "sac" ? "Valor final" : "Primeira amortização"}
                </div>
              </div>
              <div className="text-center">
                <div className="text-sm text-text-secondary">Juros do Primeiro Mês</div>
                <div className="text-xl font-bold text-text-primary">
                  {currencyBR(result.interestFirstMonth)}
                </div>
                <div className="text-sm text-text-secondary">
                  {result.financingType === "sac"
                    ? "Decresce mensalmente"
                    : "Decresce ao longo do tempo"}
                </div>
              </div>
            </div>

            <div className="rounded-lg bg-primary-blue-light p-4">
              <h4 className="mb-2 font-semibold text-primary-blue-dark">Resumo do Financiamento</h4>
              <ul className="space-y-1 text-sm text-text-secondary">
                <li>
                  Valor financiado:{" "}
                  <strong>{currencyBR(result.totalAmount - result.totalInterest)}</strong>
                </li>
                <li>
                  Sistema utilizado:{" "}
                  <strong>
                    {result.financingType === "sac"
                      ? "SAC (Sistema de Amortização Constante)"
                      : "PRICE (Tabela Price)"}
                  </strong>
                </li>
                <li>
                  Total a pagar: <strong>{currencyBR(result.totalAmount)}</strong>
                </li>
                <li>
                  Total de juros: <strong>{currencyBR(result.totalInterest)}</strong>
                </li>
                <li>
                  {result.financingType === "sac" ? "Amortização mensal:" : "Amortização inicial:"}{" "}
                  <strong>{currencyBR(result.amortization)}</strong>
                </li>
              </ul>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Seção: Sistemas de Financiamento Imobiliário - Guia Completo */}
      <Card className="border-l-4 border-primary-blue bg-gradient-to-r from-primary-blue-light to-growth-green-soft duration-300">
        <CardHeader>
          <CardTitle as="h2" className="text-2xl font-bold text-text-primary">
            🎯 Sistemas de Financiamento Imobiliário – Guia Completo 2026
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-8">
            {/* Sistema SAC */}
            <div className="rounded-xl border border-primary-blue/20 bg-gray-900 p-6">
              <h3
                className="mb-4 flex items-center text-xl font-bold text-primary-blue-dark"
                role="heading"
                aria-level="3"
              >
                📊 Sistema SAC (Amortização Constante)
              </h3>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <h4 className="mb-3 font-semibold text-growth-green">🔍 Características</h4>
                  <p className="mb-4 text-sm text-text-secondary">
                    Sistema onde a amortização é constante e igual durante todo o financiamento. Os
                    juros são calculados sobre o saldo devedor, fazendo com que as parcelas diminuam
                    com o tempo.
                  </p>

                  <h4 className="mb-3 font-semibold text-system-info">📊 Como Funciona</h4>
                  <ul className="mb-4 space-y-1 text-sm text-text-secondary">
                    <li>• Amortização fixa todos os meses</li>
                    <li>• Juros decrescentes</li>
                    <li>• Parcelas decrescentes</li>
                  </ul>
                </div>

                <div>
                  <h4 className="mb-3 font-semibold text-system-success">✅ Vantagens</h4>
                  <ul className="mb-4 space-y-1 text-sm text-text-secondary">
                    <li>• Menor valor total de juros</li>
                    <li>• Parcelas diminuem com o tempo</li>
                    <li>• Amortização mais rápida</li>
                  </ul>

                  <h4 className="mb-3 font-semibold text-system-warning">⚠️ Desvantagens</h4>
                  <ul className="space-y-1 text-sm text-text-secondary">
                    <li>• Parcelas iniciais mais altas</li>
                    <li>• Maior comprometimento de renda inicial</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Sistema PRICE */}
            <div className="rounded-xl border border-growth-green/20 bg-gray-900 p-6">
              <h3
                className="mb-4 flex items-center text-xl font-bold text-growth-green"
                role="heading"
                aria-level="3"
              >
                💰 Sistema PRICE (Tabela Price)
              </h3>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <h4 className="mb-3 font-semibold text-primary-blue-dark">🔍 Características</h4>
                  <p className="mb-4 text-sm text-text-secondary">
                    Sistema onde as parcelas são fixas durante todo o financiamento. A amortização é
                    crescente e os juros decrescentes, mas a parcela permanece igual.
                  </p>

                  <h4 className="mb-3 font-semibold text-system-info">📊 Como Funciona</h4>
                  <ul className="mb-4 space-y-1 text-sm text-text-secondary">
                    <li>• Parcelas fixas todo o período</li>
                    <li>• Amortização crescente</li>
                    <li>• Juros decrescentes</li>
                  </ul>
                </div>

                <div>
                  <h4 className="mb-3 font-semibold text-system-success">✅ Vantagens</h4>
                  <ul className="mb-4 space-y-1 text-sm text-text-secondary">
                    <li>• Parcelas fixas facilitam planejamento</li>
                    <li>• Menor parcela inicial</li>
                    <li>• Maior previsibilidade no orçamento</li>
                  </ul>

                  <h4 className="mb-3 font-semibold text-system-warning">⚠️ Desvantagens</h4>
                  <ul className="space-y-1 text-sm text-text-secondary">
                    <li>• Maior valor total de juros</li>
                    <li>• Amortização mais lenta no início</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Seção: Comparação SAC vs PRICE */}
      <Card className="border border-neutral-surface-variant bg-background-dark-secondary duration-300">
        <CardHeader>
          <CardTitle as="h2" className="text-xl font-bold text-text-primary">
            ⚖️ Tabela Comparativa: SAC vs PRICE - Qual Sistema Escolher?
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div
            className="overflow-x-auto"
            role="region"
            aria-label="Tabela comparativa SAC vs PRICE"
          >
            <table
              className="w-full border-collapse text-sm"
              role="table"
              aria-label="Comparação entre sistemas SAC e PRICE"
            >
              <thead>
                <tr className="border-b-2 border-neutral-surface-variant">
                  <th className="p-3 text-left font-semibold">Critério</th>
                  <th className="p-3 text-center font-semibold text-primary-blue-dark">
                    Sistema SAC
                  </th>
                  <th className="p-3 text-center font-semibold text-growth-green">Sistema PRICE</th>
                </tr>
              </thead>
              <tbody className="space-y-2">
                <tr className="border-b border-neutral-surface-variant">
                  <td className="p-3 font-medium">Parcelas</td>
                  <td className="p-3 text-center text-primary-blue-dark">Decrescentes</td>
                  <td className="p-3 text-center text-growth-green">Fixas</td>
                </tr>
                <tr className="border-b border-neutral-surface-variant">
                  <td className="p-3 font-medium">Amortização</td>
                  <td className="p-3 text-center">Constante</td>
                  <td className="p-3 text-center">Crescente</td>
                </tr>
                <tr className="border-b border-neutral-surface-variant">
                  <td className="p-3 font-medium">Juros</td>
                  <td className="p-3 text-center">Decrescentes</td>
                  <td className="p-3 text-center">Decrescentes</td>
                </tr>
                <tr className="border-b border-neutral-surface-variant">
                  <td className="p-3 font-medium">Valor Total de Juros</td>
                  <td className="p-3 text-center text-growth-green">Menor</td>
                  <td className="p-3 text-center">Maior</td>
                </tr>
                <tr className="border-b border-neutral-surface-variant">
                  <td className="p-3 font-medium">Parcela Inicial</td>
                  <td className="p-3 text-center">Maior</td>
                  <td className="p-3 text-center text-growth-green">Menor</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium">Ideal para</td>
                  <td className="p-3 text-center text-primary-blue-dark">
                    Quem tem renda que pode diminuir
                  </td>
                  <td className="p-3 text-center text-growth-green">
                    Planejamento de orçamento fixo
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="rounded-lg border border-primary-blue/20 bg-primary-blue-light p-4">
              <h4 className="mb-2 font-bold text-primary-blue-dark">📊 Sistema SAC</h4>
              <p className="text-sm text-text-secondary">
                Ideal para quem quer <strong>pagar menos juros</strong> e consegue arcar com
                parcelas maiores no início.
              </p>
            </div>

            <div className="rounded-lg border border-growth-green/20 bg-growth-green-soft p-4">
              <h4 className="mb-2 font-bold text-growth-green">💰 Sistema PRICE</h4>
              <p className="text-sm text-text-secondary">
                Perfeito para <strong>planejamento orçamentário</strong> com parcelas fixas e menor
                valor inicial.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <FAQ
        title="Perguntas Frequentes - Calculadora de Financiamento Imobiliário"
        items={[
          {
            question: "Qual a diferença entre SAC e PRICE?",
            answer:
              "SAC tem parcelas decrescentes e amortização constante, pagando menos juros no total. PRICE tem parcelas fixas, sendo melhor para planejamento orçamentário, mas paga mais juros ao longo do financiamento.",
            borderColor: "primary-blue",
          },
          {
            question: "Quanto posso financiar de um imóvel?",
            answer:
              "Geralmente é possível financiar até 80% do valor do imóvel pelo SFH (Sistema Financeiro de Habitação) ou 90% pelo SFI (Sistema Financeiro Imobiliário), dependendo da sua renda e do banco.",
            borderColor: "growth-green",
          },
          {
            question: "Qual a entrada mínima para financiamento?",
            answer:
              "A entrada mínima é normalmente de 20% do valor do imóvel no SFH, podendo ser reduzida para 10% no SFI. Algumas condições especiais podem permitir entradas menores.",
            borderColor: "system-info",
          },
          {
            question: "Posso quitar antecipadamente o financiamento?",
            answer:
              "Sim, a quitação antecipada é permitida com redução dos juros proporcionalmente. Pode ser total ou parcial, e gera economia significativa no valor total pago.",
            borderColor: "system-warning",
          },
          {
            question: "Como é calculada a prestação do financiamento?",
            answer:
              "No SAC: amortização fixa + juros sobre saldo devedor. No PRICE: parcela fixa calculada para equilibrar amortização crescente e juros decrescentes ao longo do tempo.",
            borderColor: "growth-green",
          },
          {
            question: "Qual sistema escolher: SAC ou PRICE?",
            answer:
              "SAC é melhor se você quer pagar menos juros totais e pode arcar com parcelas maiores no início. PRICE é ideal para quem prefere parcelas fixas e planejamento orçamentário estável.",
            borderColor: "system-error-dark",
          },
        ]}
        tipSection={{
          title: "Dica Importante sobre Financiamento Imobiliário",
          content:
            "<strong>Para a melhor decisão:</strong> compare os dois sistemas de amortização, considere sua capacidade de pagamento atual e futura, e avalie o valor total de juros ao longo do financiamento.",
        }}
        footerText="<strong>Lembre-se:</strong> Financiamento imobiliário é um compromisso de longo prazo. Avalie sua estabilidade financeira e considere cenários de mudança de renda antes de decidir."
      />

      {/* Footer com informações adicionais */}
      <Card className="border-l-4 border-primary-blue bg-primary-blue-light duration-300">
        <CardHeader>
          <CardTitle as="h2" className="text-lg font-bold text-text-primary">
            📚 Como Usar Esta Calculadora de Financiamento Imobiliário
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 text-sm text-text-secondary">
            <p>
              Esta{" "}
              <strong className="text-primary-blue-dark">
                calculadora de financiamento imobiliário
              </strong>{" "}
              utiliza{" "}
              <strong className="text-growth-green">simulações financeiras confiáveis</strong> para
              comparar sistemas SAC e PRICE, calculando parcelas, juros totais e cronograma de
              amortização para diferentes cenários de financiamento.
            </p>
            <p>
              <strong>Sistemas disponíveis:</strong> SAC (Sistema de Amortização Constante) e PRICE
              (Tabela Price). Cada sistema possui características específicas que impactam o valor
              total de juros e a evolução das parcelas ao longo do financiamento.
            </p>
            <p>
              <strong className="text-system-warning">Importante:</strong> Esta ferramenta é para
              fins educacionais e de planejamento pessoal. Para decisões de financiamento, consulte
              sempre as <strong>instituições financeiras autorizadas</strong> e avalie sua
              capacidade de pagamento e estabilidade de renda.
            </p>
            <p className="mt-4 border-t border-primary-blue/20 pt-3 text-xs opacity-75">
              🏠 Simulação imobiliária • 📊 SAC vs PRICE • 🔒 Dados não armazenados • 📱 Compatível
              com todos os dispositivos • 🌙 Interface otimizada
            </p>
          </div>
        </CardContent>
      </Card>

      <RelatedCalculators category="financas" currentCalculatorId="financiamento-imobiliario" />
    </div>
  );
}
