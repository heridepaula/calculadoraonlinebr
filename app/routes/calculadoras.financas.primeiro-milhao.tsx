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
import { useLoaderData } from "@remix-run/react";
import { marketIndicatorsLoader } from "~/services/market/loader.server";
import { useAutoCalculatorTracking, useFormTracking } from "~/hooks/useAutoCalculatorTracking";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import { Line, Pie } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

export const meta: MetaFunction = () => {
  return [
    {
      title: `Calculadora Primeiro Milhão | ${APP_NAME}`,
    },
    {
      name: "viewport",
      content: "width=device-width, initial-scale=1, viewport-fit=cover",
    },
    {
      rel: "preconnect",
      href: "https://fonts.googleapis.com",
    },
    {
      rel: "preconnect",
      href: "https://fonts.gstatic.com",
      crossOrigin: "anonymous",
    },
    {
      name: "description",
      content:
        "Descubra quanto investir para ter 1 milhão. Simule aportes mensais, rentabilidade e prazo necessário para alcançar independência financeira.",
    },
    { name: "author", content: "CalculadoraOnlineBR" },
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
      tagName: "link",
      rel: "canonical",
      href: "https://www.calculadoraonlinebr.com.br/calculadoras/financas/primeiro-milhao",
    },
    {
      property: "og:title",
      content: "Primeiro Milhão – Simule Tempo e Investimento",
    },
    {
      property: "og:description",
      content:
        "Descubra quanto investir para ter 1 milhão. Simule aportes mensais, rentabilidade e prazo necessário para alcançar independência financeira.",
    },
    {
      property: "og:image",
      content: "https://www.calculadoraonlinebr.com.br/images/calculadora-primeiro-milhao.webp",
    },
    {
      property: "og:image:alt",
      content:
        "Calculadora do Primeiro Milhão - Simule quanto tempo e aportes necessários para se tornar milionário",
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
      content: "https://www.calculadoraonlinebr.com.br/calculadoras/financas/primeiro-milhao",
    },
    { property: "og:site_name", content: APP_NAME },
    { property: "og:locale", content: "pt_BR" },
    { name: "twitter:card", content: "summary_large_image" },
    {
      name: "twitter:title",
      content: "Primeiro Milhão: Calculadora 2026 | CalculadoraOnlineBR",
    },
    {
      name: "twitter:description",
      content:
        "Descubra em quanto tempo você pode se tornar milionário ou quanto investir mensalmente para alcançar seu primeiro milhão. Simulações realistas com juros compostos.",
    },
    {
      name: "twitter:image",
      content: "https://www.calculadoraonlinebr.com.br/images/calculadora-primeiro-milhao.webp",
    },
    {
      name: "twitter:image:alt",
      content: "Calculadora do Primeiro Milhão - Simule seu caminho para R$ 1 milhão",
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
        name: "Calculadora do Primeiro Milhão - Simulador de Independência Financeira 2026",
        description:
          "Descubra quanto tempo leva para se tornar milionário ou quanto investir mensalmente para alcançar seu primeiro milhão. Simulações realistas com estratégias comprovadas.",
        url: "https://www.calculadoraonlinebr.com.br/calculadoras/financas/primeiro-milhao",
        applicationCategory: "FinanceApplication",
        operatingSystem: "Web Browser",
        isAccessibleForFree: true,
        inLanguage: "pt-BR",
        dateModified: "2025-08-25",
        datePublished: "2024-12-01",
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
          "@id": "https://www.calculadoraonlinebr.com.br/calculadoras/financas/primeiro-milhao",
          name: "Calculadora do Primeiro Milhão 2026 - Simulador de Independência Financeira",
          description:
            "Descubra seu caminho para o primeiro milhão com simulações realistas de investimentos. Calcule tempo necessário ou aporte mensal para alcançar a independência financeira.",
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
                name: "Calculadora do Primeiro Milhão",
                item: "https://www.calculadoraonlinebr.com.br/calculadoras/financas/primeiro-milhao",
              },
            ],
          },
        },
        about: {
          "@type": "Thing",
          name: "Primeiro Milhão",
          description:
            "Marco de independência financeira representado por R$ 1 milhão em patrimônio líquido, alcançado através de investimentos sistemáticos",
          category: "Financial Planning",
        },
        featureList: [
          "Cálculo de tempo para primeiro milhão",
          "Cálculo de aporte mensal necessário",
          "Simulação com juros compostos",
          "Metas personalizadas de patrimônio",
          "Análise de inflação e poder de compra real",
          "Progresso anual detalhado",
          "Interface móvel responsiva otimizada",
          "Estratégias comprovadas de investimento",
        ],
        author: {
          "@type": "Organization",
          name: "CalculadoraOnlineBR",
          description: "Especialistas em ferramentas financeiras educacionais",
          expertise: "Educação Financeira e Simuladores de Investimento",
        },
      }),
    },
    {
      "script:ld+json": JSON.stringify({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: [
          {
            "@type": "Question",
            name: "É realmente possível um brasileiro comum chegar ao primeiro milhão?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Sim, absolutamente! Cerca de 315.000 brasileiros já são milionários (0,15% da população). A maioria chegou lá através de disciplina, aportes regulares e juros compostos. Com R$ 500-2.000/mês a 8-12% ao ano, é possível em 15-25 anos!",
            },
          },
          {
            "@type": "Question",
            name: "Quanto tempo leva para juntar o primeiro milhão no Brasil?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Depende de 3 fatores: capital inicial, aporte mensal e taxa de retorno. Exemplos: R$ 1.000/mês a 10% = 22 anos, R$ 2.000/mês a 12% = 15 anos, R$ 3.000/mês a 15% = 11 anos.",
            },
          },
          {
            "@type": "Question",
            name: "Qual a melhor estratégia de investimento para o primeiro milhão?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Diversificação inteligente: 40-60% Renda Fixa (CDB, Tesouro, LCI/LCA), 20-40% Ações (empresas sólidas), 10-20% FIIs (renda passiva). O segredo está na regularidade dos aportes.",
            },
          },
          {
            "@type": "Question",
            name: "Como os juros compostos aceleram o caminho ao milhão?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Juros compostos = 'juros sobre juros'. Exemplo R$ 1.000/mês a 10%: Ano 10 = R$ 204k, Ano 15 = R$ 417k, Ano 20 = R$ 765k, Ano 22 = R$ 1.014k! Nos últimos anos, os juros trabalham mais que você!",
            },
          },
        ],
      }),
    },
  ];
};

type CalculationType = "time" | "monthlyAmount";

interface MonthlyData {
  month: number;
  balance: number;
  monthlyContribution: number;
  monthlyInterest: number;
  totalContributions: number;
  totalInterest: number;
}

interface FirstMillionResult {
  finalAmount: number;
  totalInterest: number;
  initialAmount: number;
  annualRate: number;
  monthlyInvestment: number;
  totalContributions: number;
  timeToGoal?: number; // em meses
  requiredMonthlyAmount?: number;
  goalAmount: number;
  monthlyData: MonthlyData[];
}

interface ValidationErrors {
  principal?: string;
  rate?: string;
  monthlyInvestment?: string;
  targetTimeMonths?: string;
  goalAmount?: string;
}

export async function loader() {
  return marketIndicatorsLoader();
}

export default function FirstMillionCalculator() {
  const { indicators } = useLoaderData<typeof loader>();
  const [principal, setPrincipal] = useState("");
  const [annualRate, setAnnualRate] = useState("");
  const [monthlyInvestment, setMonthlyInvestment] = useState("");
  const [targetTimeMonths, setTargetTimeMonths] = useState("");
  const [goalAmount, setGoalAmount] = useState(1000000);
  const [calculationType, setCalculationType] = useState<CalculationType>("time");
  const [result, setResult] = useState<FirstMillionResult | null>(null);
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [currentPage, setCurrentPage] = useState(1);
  const resultRef = useRef<HTMLDivElement>(null);

  const { startCalculation, endCalculation } = useAutoCalculatorTracking({
    calculatorType: "primeiro-milhao",
    category: "financas",
  });
  useFormTracking("primeiro-milhao");

  // Inicializa a taxa com valor da SELIC na primeira renderização
  useEffect(() => {
    if (!annualRate) {
      const selicRate = indicators.SELIC.rate.toFixed(2).replace(".", ",");
      setAnnualRate(selicRate);
    }
  }, []);

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

  const validateInputs = (): boolean => {
    const newErrors: ValidationErrors = {};
    let ok = true;

    const p = parseMoney(principal);
    if (p <= 0) {
      newErrors.principal = "Capital inicial obrigatório e maior que 0";
      ok = false;
    }

    const r = parseRate(annualRate);
    if (r <= 0) {
      newErrors.rate = "Taxa de juros deve ser maior que 0";
      ok = false;
    }

    const goal = parseMoney(goalAmount);
    if (goal <= p) {
      newErrors.goalAmount = "Meta deve ser maior que capital inicial";
      ok = false;
    }

    if (calculationType === "time") {
      const monthlyAmount = parseMoney(monthlyInvestment);
      if (monthlyAmount <= 0) {
        newErrors.monthlyInvestment = "Aporte mensal obrigatório e maior que 0";
        ok = false;
      }
    } else {
      const timeMonths = parseInt(targetTimeMonths, 10);
      if (!targetTimeMonths || isNaN(timeMonths) || timeMonths <= 0) {
        newErrors.targetTimeMonths = "Tempo obrigatório e maior que 0";
        ok = false;
      }
    }

    setErrors(newErrors);
    return ok;
  };

  // Função para calcular tempo necessário para atingir a meta
  const calculateTimeToGoal = (
    initialAmount: number,
    monthlyAmount: number,
    annualRate: number,
    goalAmount: number
  ): FirstMillionResult | null => {
    const monthlyRate = annualRate / 12;
    let currentBalance = initialAmount;
    let totalContributions = 0;
    let totalInterest = 0;
    let months = 0;
    const monthlyData: MonthlyData[] = [];
    const maxMonths = 600; // 50 anos máximo

    while (currentBalance < goalAmount && months < maxMonths) {
      months++;

      // Calcula juros do mês anterior
      const monthlyInterest = currentBalance * monthlyRate;

      // Adiciona aporte e juros
      currentBalance = currentBalance + monthlyInterest + monthlyAmount;
      totalContributions += monthlyAmount;
      totalInterest += monthlyInterest;

      monthlyData.push({
        month: months,
        balance: currentBalance,
        monthlyContribution: monthlyAmount,
        monthlyInterest,
        totalContributions,
        totalInterest,
      });
    }

    if (months >= maxMonths) return null;

    return {
      finalAmount: currentBalance,
      totalInterest,
      initialAmount,
      annualRate: annualRate * 100,
      monthlyInvestment: monthlyAmount,
      totalContributions,
      timeToGoal: months,
      goalAmount,
      monthlyData,
    };
  };

  // Função para calcular aporte mensal necessário para atingir meta em tempo determinado
  const calculateRequiredMonthlyAmount = (
    initialAmount: number,
    annualRate: number,
    timeMonths: number,
    goalAmount: number
  ): FirstMillionResult | null => {
    const monthlyRate = annualRate / 12;

    // Fórmula para calcular PMT (aporte mensal necessário)
    // FV = PV * (1 + r)^n + PMT * [((1 + r)^n - 1) / r]
    // PMT = (FV - PV * (1 + r)^n) / [((1 + r)^n - 1) / r]

    const futureValueOfPrincipal = initialAmount * Math.pow(1 + monthlyRate, timeMonths);
    const annuityFactor = (Math.pow(1 + monthlyRate, timeMonths) - 1) / monthlyRate;
    const requiredMonthlyAmount = (goalAmount - futureValueOfPrincipal) / annuityFactor;

    if (requiredMonthlyAmount < 0) return null;

    // Gerar dados mês a mês para verificação
    const monthlyData: MonthlyData[] = [];
    let currentBalance = initialAmount;
    let totalContributions = 0;
    let totalInterest = 0;

    for (let month = 1; month <= timeMonths; month++) {
      const monthlyInterest = currentBalance * monthlyRate;
      currentBalance = currentBalance + monthlyInterest + requiredMonthlyAmount;
      totalContributions += requiredMonthlyAmount;
      totalInterest += monthlyInterest;

      monthlyData.push({
        month,
        balance: currentBalance,
        monthlyContribution: requiredMonthlyAmount,
        monthlyInterest,
        totalContributions,
        totalInterest,
      });
    }

    return {
      finalAmount: currentBalance,
      totalInterest,
      initialAmount,
      annualRate: annualRate * 100,
      monthlyInvestment: requiredMonthlyAmount,
      totalContributions,
      requiredMonthlyAmount,
      goalAmount,
      monthlyData,
    };
  };

  const handleCalculate = () => {
    if (!validateInputs()) return;
    startCalculation("calcular");

    try {
      const p = parseMoney(principal);
      const r = parseRate(annualRate);
      const goal = parseMoney(goalAmount);

      let res: FirstMillionResult | null = null;

      if (calculationType === "time") {
        const monthlyAmount = parseMoney(monthlyInvestment);
        res = calculateTimeToGoal(p, monthlyAmount, r, goal);
      } else {
        const timeMonths = parseInt(targetTimeMonths, 10);
        res = calculateRequiredMonthlyAmount(p, r, timeMonths, goal);
      }

      if (!res) {
        setErrors({
          principal:
            "Não é possível atingir a meta com esses parâmetros. Tente ajustar os valores.",
        });
        endCalculation("calcular", { success: false });
        return;
      }

      setResult(res);
      setErrors({});
      setCurrentPage(1);
      setTimeout(() => {
        resultRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 50);
      endCalculation("calcular", { success: true });
    } catch {
      setErrors({ principal: "Erro no cálculo. Verifique os valores inseridos." });
      endCalculation("calcular", { success: false });
    }
  };

  const handleReset = () => {
    setPrincipal("");
    setAnnualRate(indicators.SELIC.rate.toFixed(2).replace(".", ","));
    setMonthlyInvestment("");
    setTargetTimeMonths("");
    setGoalAmount("1.000.000");
    setCalculationType("time");
    setResult(null);
    setErrors({});
    setCurrentPage(1);
  };

  const formatTimeToGoal = (months: number): string => {
    const years = Math.floor(months / 12);
    const remainingMonths = months % 12;

    if (years === 0) return `${months} meses`;
    if (remainingMonths === 0) return `${years} anos`;
    return `${years} anos e ${remainingMonths} meses`;
  };

  const ErrorMessage = ({ error }: { error?: string }) =>
    error ? <div className="mt-1 text-sm text-system-error">{error}</div> : null;

  return (
    <div className="mx-auto max-w-2xl space-y-8 px-4 md:max-w-4xl lg:max-w-6xl">
      <nav aria-label="Navegação estrutural">
        <Breadcrumb>
          <BreadcrumbItem href="/">Início</BreadcrumbItem>
          <BreadcrumbItem href="/calculadoras">Calculadoras</BreadcrumbItem>
          <BreadcrumbItem href="/calculadoras/financas">Finanças</BreadcrumbItem>
          <BreadcrumbItem isLast>Primeiro Milhão</BreadcrumbItem>
        </Breadcrumb>
      </nav>

      <header className="space-y-4 text-center">
        <h1 className="mb-4 text-3xl font-bold text-text-primary md:text-4xl">
          Calculadora do Primeiro Milhão 2026 – Simulador de Independência Financeira
        </h1>
        <p className="mx-auto max-w-3xl text-lg text-text-secondary-dark">
          Descubra{" "}
          <strong className="text-growth-green">
            em quanto tempo você pode se tornar milionário
          </strong>
          ou <strong className="text-primary-blue-dark">quanto investir mensalmente</strong> para
          alcançar seu primeiro milhão com juros compostos.
        </p>
        <div className="inline-block rounded-lg bg-growth-green-soft p-4 duration-300">
          <p className="text-sm font-medium text-text-primary">
            🎯 <strong>Meta Personalizada</strong> • ⏰ <strong>Tempo para Meta</strong> • 💰{" "}
            <strong>Aporte Necessário</strong>
          </p>
        </div>
      </header>

      <main role="main" aria-label="Calculadora do Primeiro Milhão">
        <Card>
          <CardHeader>
            <CardTitle as="h2">📋 Configure sua Simulação do Primeiro Milhão</CardTitle>
          </CardHeader>
          <CardContent>
            {/* Tipo de Cálculo centralizado */}
            <div className="mb-6 flex flex-wrap justify-center gap-2">
              <div className="inline-flex overflow-hidden rounded-lg border border-neutral-surface-variant">
                <button
                  type="button"
                  onClick={() => setCalculationType("time")}
                  className={`min-w-[120px] flex-1 basis-0 py-2 text-center text-sm font-medium transition ${
                    calculationType === "time"
                      ? "bg-primary-blue text-white"
                      : "bg-neutral-surface text-text-secondary hover:bg-primary-blue/10"
                  }`}
                >
                  Tempo
                </button>
                <button
                  type="button"
                  onClick={() => setCalculationType("monthlyAmount")}
                  className={`min-w-[120px] flex-1 basis-0 py-2 text-center text-sm font-medium transition ${
                    calculationType === "monthlyAmount"
                      ? "bg-primary-blue text-white"
                      : "bg-neutral-surface text-text-secondary hover:bg-primary-blue/10"
                  }`}
                >
                  Aporte
                </button>
              </div>
            </div>

            {/* Linha 1: Capital inicial e Meta financeira */}
            <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <MoneyInput
                  label="Capital Inicial"
                  value={principal}
                  onChange={setPrincipal}
                  placeholder="10.000,00"
                  fullWidth
                  className="h-12 text-lg"
                />
                <ErrorMessage error={errors.principal} />
                <div className="mt-1 text-xs text-text-secondary">
                  Valor inicial a ser investido
                </div>
              </div>
              <div>
                <MoneyInput
                  label="Meta Financeira"
                  value={goalAmount}
                  onChange={setGoalAmount}
                  placeholder="1.000.000"
                  fullWidth
                  className="h-12 text-lg"
                />
                <ErrorMessage error={errors.goalAmount} />
                <div className="mt-1 text-xs text-text-secondary">
                  Seu objetivo de patrimônio (padrão: R$ 1 milhão)
                </div>
              </div>
            </div>

            {/* Linha 2: Taxa e Input condicional */}
            <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <RateInput
                  label="Taxa de Juros (% a.a.)"
                  value={annualRate}
                  onChange={setAnnualRate}
                  placeholder={indicators.SELIC.rate.toFixed(2).replace(".", ",")}
                  fullWidth
                  className="h-12 text-lg"
                />
                <ErrorMessage error={errors.rate} />
                <div className="mt-1 text-xs text-text-secondary">
                  Taxa anual esperada dos investimentos
                  <span className="ml-2 text-system-info">
                    (SELIC: {indicators.SELIC.rate.toFixed(2)}% a.a.)
                  </span>
                </div>
              </div>
              <div>
                {calculationType === "time" ? (
                  <>
                    <MoneyInput
                      label="Aporte Mensal"
                      value={monthlyInvestment}
                      onChange={setMonthlyInvestment}
                      placeholder="1.000,00"
                      fullWidth
                      className="h-12 text-lg"
                    />
                    <ErrorMessage error={errors.monthlyInvestment} />
                    <div className="mt-1 text-xs text-text-secondary">
                      Valor investido mensalmente
                    </div>
                  </>
                ) : (
                  <>
                    <Input
                      type="number"
                      label="Tempo Desejado (meses)"
                      value={targetTimeMonths}
                      onChange={(e) => setTargetTimeMonths(e.target.value)}
                      placeholder="240"
                      fullWidth
                      className="h-12 text-lg"
                    />
                    <ErrorMessage error={errors.targetTimeMonths} />
                    <div className="mt-1 text-xs text-text-secondary">
                      Em quantos meses quer atingir a meta
                    </div>
                  </>
                )}
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
          <Card
            ref={resultRef as any}
            className="border-2 border-growth-green bg-growth-green-soft"
          >
            <CardHeader>
              <CardTitle as="h3" className="text-growth-green">
                🎉 Resultado da Simulação do Primeiro Milhão
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mb-6 text-center">
                <div className="mb-2 text-4xl font-bold text-growth-green">
                  {currencyBR(result.finalAmount)}
                </div>
                <div className="text-sm text-text-secondary">Meta Alcançada</div>
              </div>

              {result.timeToGoal && (
                <div className="mb-4 rounded-lg bg-primary-blue-light p-4">
                  <div className="text-center">
                    <div className="mb-2 font-semibold text-primary-blue-dark">
                      ⏰ Tempo Necessário
                    </div>
                    <div className="text-2xl font-bold text-text-primary">
                      {formatTimeToGoal(result.timeToGoal)}
                    </div>
                  </div>
                </div>
              )}

              {result.requiredMonthlyAmount && (
                <div className="mb-4 rounded-lg bg-system-warning/10 p-4">
                  <div className="text-center">
                    <div className="mb-2 font-semibold text-system-warning">
                      💰 Aporte Mensal Necessário
                    </div>
                    <div className="text-2xl font-bold text-text-primary">
                      {currencyBR(result.requiredMonthlyAmount)}
                    </div>
                  </div>
                </div>
              )}

              <div className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-3">
                <div className="rounded-lg bg-gray-900 p-6 text-center">
                  <div className="text-2xl font-bold text-primary-blue-dark">
                    {currencyBR(result.initialAmount)}
                  </div>
                  <div className="text-sm text-text-secondary">Capital Inicial</div>
                </div>
                <div className="rounded-lg bg-gray-900 p-6 text-center">
                  <div className="text-2xl font-bold text-system-info">
                    {currencyBR(result.totalContributions)}
                  </div>
                  <div className="text-sm text-text-secondary">Total de Aportes</div>
                </div>
                <div className="rounded-lg bg-gray-900 p-6 text-center">
                  <div className="text-2xl font-bold text-growth-green">
                    {currencyBR(result.totalInterest)}
                  </div>
                  <div className="text-sm text-text-secondary">Juros Compostos</div>
                </div>
              </div>

              {/* Breakdown detalhado se há aportes mensais */}
              {result.monthlyInvestment > 0 && (
                <div className="mb-6 grid grid-cols-1 gap-4 rounded-lg bg-system-info/10 p-4 md:grid-cols-4">
                  <div className="text-center">
                    <div className="text-sm text-text-secondary">Capital Inicial</div>
                    <div className="text-xl font-bold text-text-primary">
                      {currencyBR(result.initialAmount)}
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm text-text-secondary">Aportes Mensais</div>
                    <div className="text-xl font-bold text-system-info">
                      {currencyBR(result.totalContributions)}
                    </div>
                    <div className="text-xs text-text-secondary">
                      {currencyBR(result.monthlyInvestment)}/mês
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm text-text-secondary">Total Investido</div>
                    <div className="text-xl font-bold text-text-primary">
                      {currencyBR(result.initialAmount + result.totalContributions)}
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm text-text-secondary">Juros Compostos</div>
                    <div className="text-xl font-bold text-growth-green">
                      {currencyBR(result.totalInterest)}
                    </div>
                  </div>
                </div>
              )}

              <div className="mb-6 grid grid-cols-1 gap-6 rounded-lg bg-gray-900 p-4 md:grid-cols-3">
                <div className="text-center">
                  <div className="text-sm text-text-secondary">Taxa Anual</div>
                  <div className="text-xl font-bold text-text-primary">
                    {percentBR(result.annualRate)}%
                  </div>
                  <div className="text-sm text-text-secondary">Taxa de retorno anual</div>
                </div>
                <div className="text-center">
                  <div className="text-sm text-text-secondary">Taxa Mensal</div>
                  <div className="text-xl font-bold text-text-primary">
                    {percentBR(result.annualRate / 12, 3)}%
                  </div>
                  <div className="text-sm text-text-secondary">Taxa equivalente mensal</div>
                </div>
                <div className="text-center">
                  <div className="text-sm text-text-secondary">
                    {result.timeToGoal ? "Tempo Necessário" : "Tempo da Meta"}
                  </div>
                  <div className="text-xl font-bold text-text-primary">
                    {result.timeToGoal
                      ? formatTimeToGoal(result.timeToGoal)
                      : formatTimeToGoal(result.monthlyData.length)}
                  </div>
                  <div className="text-sm text-text-secondary">
                    {result.timeToGoal ? result.timeToGoal : result.monthlyData.length} meses de
                    aplicação
                  </div>
                </div>
              </div>

              <div className="rounded-lg bg-primary-blue-light p-4">
                <h4 className="mb-2 font-semibold text-primary-blue-dark">
                  📊 Resumo da Simulação
                </h4>
                <ul className="space-y-1 text-sm text-text-secondary">
                  <li>
                    Capital inicial: <strong>{currencyBR(result.initialAmount)}</strong>
                  </li>
                  <li>
                    Meta financeira: <strong>{currencyBR(result.goalAmount)}</strong>
                  </li>
                  <li>
                    Taxa de juros: <strong>{percentBR(result.annualRate)}% ao ano</strong>
                  </li>
                  {result.timeToGoal && (
                    <li>
                      Tempo necessário: <strong>{formatTimeToGoal(result.timeToGoal)}</strong>
                    </li>
                  )}
                  {result.requiredMonthlyAmount && (
                    <li>
                      Aporte mensal necessário:{" "}
                      <strong>{currencyBR(result.requiredMonthlyAmount)}</strong>
                    </li>
                  )}
                  <li>
                    Investimento mensal: <strong>{currencyBR(result.monthlyInvestment)}</strong>
                  </li>
                  <li>
                    Total de aportes: <strong>{currencyBR(result.totalContributions)}</strong>
                  </li>
                  <li>
                    Juros compostos: <strong>{currencyBR(result.totalInterest)}</strong>
                  </li>
                  <li>
                    Valor final alcançado: <strong>{currencyBR(result.finalAmount)}</strong>
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Gráficos e Tabela de Evolução */}
        {result && (
          <>
            {/* Gráficos */}
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              {/* Gráfico de Evolução do Patrimônio */}
              <Card>
                <CardHeader>
                  <CardTitle as="h3" className="text-growth-green">
                    📈 Evolução do Patrimônio
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <Line
                      data={{
                        labels: result.monthlyData.map((_, i) => `Mês ${i + 1}`),
                        datasets: [
                          {
                            label: "Patrimônio Total",
                            data: result.monthlyData.map((d) => d.balance),
                            borderColor: "#64B5F6",
                            backgroundColor: "rgba(100, 181, 246, 0.1)",
                            fill: true,
                          },
                          {
                            label: "Capital + Aportes",
                            data: result.monthlyData.map(
                              (d) => result.initialAmount + d.totalContributions
                            ),
                            borderColor: "#FFA726",
                            backgroundColor: "rgba(255, 167, 38, 0.1)",
                            borderDash: [5, 5],
                          },
                        ],
                      }}
                      options={{
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: {
                          legend: {
                            position: "top" as const,
                            labels: {
                              color: "#E5E5E5",
                            },
                          },
                          tooltip: {
                            backgroundColor: "#1A1A1A",
                            titleColor: "#E5E5E5",
                            bodyColor: "#E5E5E5",
                            callbacks: {
                              label: function (context) {
                                return `${context.dataset.label}: ${currencyBR(context.parsed.y)}`;
                              },
                            },
                          },
                        },
                        scales: {
                          y: {
                            ticks: {
                              color: "#A1A1A1",
                              callback: function (value) {
                                return currencyBR(Number(value));
                              },
                            },
                            grid: {
                              color: "#333333",
                            },
                          },
                          x: {
                            ticks: {
                              color: "#A1A1A1",
                            },
                            grid: {
                              color: "#333333",
                            },
                          },
                        },
                      }}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Gráfico de Pizza - Composição Final */}
              <Card>
                <CardHeader>
                  <CardTitle as="h3" className="text-system-warning">
                    🥧 Composição do Patrimônio Final
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <Pie
                      data={{
                        labels: ["Capital Inicial", "Aportes", "Juros Compostos"],
                        datasets: [
                          {
                            data: [
                              result.initialAmount,
                              result.totalContributions,
                              result.totalInterest,
                            ],
                            backgroundColor: [
                              "#64B5F6", // Primary blue
                              "#FFA726", // Orange
                              "#66BB6A", // Green
                            ],
                            borderColor: ["#1976D2", "#F57C00", "#388E3C"],
                            borderWidth: 2,
                          },
                        ],
                      }}
                      options={{
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: {
                          legend: {
                            position: "bottom" as const,
                            labels: {
                              color: "#E5E5E5",
                              padding: 20,
                            },
                          },
                          tooltip: {
                            backgroundColor: "#1A1A1A",
                            titleColor: "#E5E5E5",
                            bodyColor: "#E5E5E5",
                            callbacks: {
                              label: function (context) {
                                const value = context.parsed;
                                const total = result.finalAmount;
                                const percentage = ((value / total) * 100).toFixed(1);
                                return `${context.label}: ${currencyBR(value)} (${percentage}%)`;
                              },
                            },
                          },
                        },
                      }}
                    />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Tabela de Evolução Mensal */}
            <Card>
              <CardHeader>
                <CardTitle as="h3" className="text-primary-blue-dark">
                  📊 Evolução Mensal Detalhada
                </CardTitle>
              </CardHeader>
              <CardContent>
                {(() => {
                  const itemsPerPage = 12;
                  const totalPages = Math.ceil(result.monthlyData.length / itemsPerPage);
                  const startIndex = (currentPage - 1) * itemsPerPage;
                  const endIndex = startIndex + itemsPerPage;
                  const currentItems = result.monthlyData.slice(startIndex, endIndex);

                  return (
                    <>
                      {/* Informação da paginação */}
                      <div className="mb-4 flex items-center justify-between text-sm text-text-secondary">
                        <div>
                          Mostrando meses {startIndex + 1} a{" "}
                          {Math.min(endIndex, result.monthlyData.length)} de{" "}
                          {result.monthlyData.length}
                        </div>
                        <div>
                          Página {currentPage} de {totalPages}
                        </div>
                      </div>

                      <div className="overflow-x-auto">
                        {/* Tabela Desktop - Todas as colunas */}
                        <table className="hidden w-full text-sm md:table">
                          <thead>
                            <tr className="border-b-2 border-neutral-surface-variant">
                              <th className="p-3 text-left font-semibold">Mês</th>
                              <th className="p-3 text-right font-semibold">Patrimônio</th>
                              <th className="p-3 text-right font-semibold">Aporte Mensal</th>
                              <th className="p-3 text-right font-semibold">Juros do Mês</th>
                              <th className="p-3 text-right font-semibold">Total Investido</th>
                              <th className="p-3 text-right font-semibold">Total em Juros</th>
                            </tr>
                          </thead>
                          <tbody>
                            {currentItems.map((data, index) => (
                              <tr
                                key={data.month}
                                className="border-b border-neutral-surface-variant hover:bg-neutral-surface/20"
                              >
                                <td className="p-3 font-medium">{data.month}</td>
                                <td className="p-3 text-right font-bold text-growth-green">
                                  {currencyBR(data.balance)}
                                </td>
                                <td className="p-3 text-right text-system-info">
                                  {currencyBR(data.monthlyContribution)}
                                </td>
                                <td className="p-3 text-right text-primary-blue-dark">
                                  {currencyBR(data.monthlyInterest)}
                                </td>
                                <td className="p-3 text-right">
                                  {currencyBR(result.initialAmount + data.totalContributions)}
                                </td>
                                <td className="p-3 text-right text-growth-green">
                                  {currencyBR(data.totalInterest)}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>

                        {/* Tabela Mobile - Colunas essenciais */}
                        <table className="w-full text-sm md:hidden">
                          <thead>
                            <tr className="border-b-2 border-neutral-surface-variant">
                              <th className="p-2 text-left font-semibold">Mês</th>
                              <th className="p-2 text-right font-semibold">Patrimônio</th>
                              <th className="p-2 text-right font-semibold">Juros</th>
                            </tr>
                          </thead>
                          <tbody>
                            {currentItems.map((data, index) => (
                              <tr
                                key={`mobile-${data.month}`}
                                className="border-b border-neutral-surface-variant hover:bg-neutral-surface/20"
                              >
                                <td className="p-2 font-medium">{data.month}</td>
                                <td className="p-2 text-right font-bold text-growth-green">
                                  {currencyBR(data.balance)}
                                </td>
                                <td className="p-2 text-right text-primary-blue-dark">
                                  {currencyBR(data.monthlyInterest)}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>

                      {/* Controles de paginação */}
                      {totalPages > 1 && (
                        <div className="mt-6 flex items-center justify-center space-x-2">
                          <Button
                            onClick={() => setCurrentPage(1)}
                            disabled={currentPage === 1}
                            variant="outline"
                            className="px-3 py-2 text-sm"
                          >
                            ««
                          </Button>
                          <Button
                            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                            disabled={currentPage === 1}
                            variant="outline"
                            className="px-3 py-2 text-sm"
                          >
                            ‹
                          </Button>

                          {/* Números das páginas */}
                          {(() => {
                            const pages = [];
                            const maxVisiblePages = 5;
                            let startPage = Math.max(1, currentPage - 2);
                            let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

                            if (endPage - startPage < maxVisiblePages - 1) {
                              startPage = Math.max(1, endPage - maxVisiblePages + 1);
                            }

                            for (let i = startPage; i <= endPage; i++) {
                              pages.push(
                                <Button
                                  key={i}
                                  onClick={() => setCurrentPage(i)}
                                  variant={currentPage === i ? "default" : "outline"}
                                  className="px-3 py-2 text-sm"
                                >
                                  {i}
                                </Button>
                              );
                            }
                            return pages;
                          })()}

                          <Button
                            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                            disabled={currentPage === totalPages}
                            variant="outline"
                            className="px-3 py-2 text-sm"
                          >
                            ›
                          </Button>
                          <Button
                            onClick={() => setCurrentPage(totalPages)}
                            disabled={currentPage === totalPages}
                            variant="outline"
                            className="px-3 py-2 text-sm"
                          >
                            »»
                          </Button>
                        </div>
                      )}
                    </>
                  );
                })()}
              </CardContent>
            </Card>
          </>
        )}

        <section aria-labelledby="guia-completo-heading">
          {/* Seção: Primeiro Milhão - Guia Completo */}
          <Card className="border-l-4 border-primary-blue bg-gradient-to-r from-primary-blue-light to-growth-green-soft duration-300">
            <CardHeader>
              <CardTitle
                as="h2"
                id="guia-completo-heading"
                className="text-2xl font-bold text-text-primary"
              >
                🎯 Primeiro Milhão – Guia Completo 2026
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                {/* O que é o Primeiro Milhão */}
                <div className="rounded-xl border border-primary-blue/20 bg-gray-900 p-6">
                  <h3 className="mb-4 flex items-center text-xl font-bold text-primary-blue-dark">
                    🎯 O que é o Primeiro Milhão?
                  </h3>

                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <div>
                      <h4 className="mb-3 font-semibold text-growth-green">🔍 Conceito</h4>
                      <p className="mb-4 text-sm text-text-secondary">
                        O primeiro milhão representa o marco de R$ 1.000.000 em patrimônio líquido,
                        colocando você entre os 0,15% mais ricos do Brasil (cerca de 315.000
                        pessoas).
                      </p>

                      <h4 className="mb-3 font-semibold text-system-info">
                        📊 Por que é Importante
                      </h4>
                      <ul className="mb-4 space-y-1 text-sm text-text-secondary">
                        <li>• Marco de independência financeira</li>
                        <li>• Permite renda passiva significativa</li>
                        <li>• Base para multiplicar riqueza</li>
                      </ul>
                    </div>

                    <div>
                      <h4 className="mb-3 font-semibold text-system-success">✅ Benefícios</h4>
                      <ul className="mb-4 space-y-1 text-text-secondary">
                        <li>• Segurança financeira para emergências</li>
                        <li>• Liberdade para tomar decisões de carreira</li>
                        <li>• Possibilidade de aposentadoria antecipada</li>
                      </ul>

                      <h4 className="mb-3 font-semibold text-system-warning">
                        ⚠️ Realidade no Brasil
                      </h4>
                      <ul className="space-y-1 text-sm text-text-secondary">
                        <li>• Tempo médio: 15-25 anos de investimentos</li>
                        <li>• Aporte mensal típico: R$ 500-2.000</li>
                        <li>• Taxa anual média: 8-12%</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Estratégias para o Primeiro Milhão */}
                <div className="rounded-xl border border-growth-green/20 bg-gray-900 p-6">
                  <h3 className="mb-4 flex items-center text-xl font-bold text-growth-green">
                    🚀 Estratégias Comprovadas para o Primeiro Milhão
                  </h3>

                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <div>
                      <h4 className="mb-3 font-semibold text-primary-blue-dark">
                        📊 Perfil Conservador
                      </h4>
                      <p className="mb-4 text-sm text-text-secondary">
                        Foco em renda fixa e baixo risco. Tempo: 20-25 anos.
                      </p>

                      <h4 className="mb-3 font-semibold text-system-info">📈 Estratégia</h4>
                      <ul className="mb-4 space-y-1 text-sm text-text-secondary">
                        <li>• 70% Renda Fixa (CDB, Tesouro)</li>
                        <li>• 20% Fundos Multimercado</li>
                        <li>• 10% Ações de blue chips</li>
                        <li>• Taxa esperada: 8-10% a.a.</li>
                      </ul>
                    </div>

                    <div>
                      <h4 className="mb-3 font-semibold text-growth-green">
                        🚀 Perfil Moderado/Agressivo
                      </h4>
                      <p className="mb-4 text-sm text-text-secondary">
                        Diversificação inteligente com maior exposição em ações. Tempo: 15-20 anos.
                      </p>

                      <h4 className="mb-3 font-semibold text-system-success">💡 Estratégia</h4>
                      <ul className="space-y-1 text-sm text-text-secondary">
                        <li>• 40% Renda Fixa</li>
                        <li>• 40% Ações e ETFs</li>
                        <li>• 20% FIIs e REITs</li>
                        <li>• Taxa esperada: 12-15% a.a.</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Erros que Impedem o Primeiro Milhão */}
                <div className="rounded-xl border border-system-warning/20 bg-gray-900 p-6">
                  <h3 className="mb-4 flex items-center text-xl font-bold text-system-warning">
                    ❌ Erros que Impedem o Primeiro Milhão
                  </h3>

                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <div>
                      <h4 className="mb-3 font-semibold text-system-error">
                        🚫 Erros Comportamentais
                      </h4>
                      <ul className="mb-4 space-y-1 text-sm text-text-secondary">
                        <li>• Procrastinar o início dos investimentos</li>
                        <li>• Não ter metas claras e prazo definido</li>
                        <li>• Sacar investimentos para gastos supérfluos</li>
                        <li>• Tentar "timing" do mercado constantemente</li>
                      </ul>

                      <h4 className="mb-3 font-semibold text-system-info">💳 Erros Financeiros</h4>
                      <ul className="mb-4 space-y-1 text-sm text-text-secondary">
                        <li>• Viver no cartão de crédito (juros altos)</li>
                        <li>• Não ter reserva de emergência</li>
                        <li>• Focar apenas na casa própria</li>
                      </ul>
                    </div>

                    <div>
                      <h4 className="mb-3 font-semibold text-system-success">✅ Como Corrigir</h4>
                      <ul className="mb-4 space-y-1 text-sm text-text-secondary">
                        <li>• Começar hoje, mesmo com pouco</li>
                        <li>• Automatizar aportes mensais</li>
                        <li>• Educar-se financeiramente</li>
                        <li>• Focar no longo prazo (15+ anos)</li>
                      </ul>

                      <h4 className="mb-3 font-semibold text-growth-green">
                        🎯 Mentalidade Correta
                      </h4>
                      <ul className="space-y-1 text-sm text-text-secondary">
                        <li>• Disciplina &gt; conhecimento técnico</li>
                        <li>• Consistência &gt; valor alto esporádico</li>
                        <li>• Paciência &gt; ganhos rápidos</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        <section aria-labelledby="estrategias-heading">
          {/* Seção: Comparação de Estratégias de Investimento */}
          <Card className="border border-neutral-surface-variant bg-background-dark-secondary duration-300">
            <CardHeader>
              <CardTitle
                as="h2"
                id="estrategias-heading"
                className="text-xl font-bold text-text-primary"
              >
                ⚖️ Comparação: Investimentos que Utilizam Juros Compostos
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse text-sm">
                  <thead>
                    <tr className="border-b-2 border-neutral-surface-variant">
                      <th className="p-3 text-left font-semibold">Critério</th>
                      <th className="p-3 text-center font-semibold text-primary-blue-dark">
                        Renda Fixa
                      </th>
                      <th className="p-3 text-center font-semibold text-growth-green">
                        Fundos de Investimento
                      </th>
                      <th className="p-3 text-center font-semibold text-system-warning">
                        Tesouro Direto
                      </th>
                    </tr>
                  </thead>
                  <tbody className="space-y-2">
                    <tr className="border-b border-neutral-surface-variant">
                      <td className="p-3 font-medium">Previsibilidade</td>
                      <td className="p-3 text-center text-primary-blue-dark">
                        Alta (taxa conhecida)
                      </td>
                      <td className="p-3 text-center text-growth-green">
                        Média (varia com mercado)
                      </td>
                      <td className="p-3 text-center text-system-warning">
                        Alta (governo federal)
                      </td>
                    </tr>
                    <tr className="border-b border-neutral-surface-variant">
                      <td className="p-3 font-medium">Facilidade de Comparação</td>
                      <td className="p-3 text-center">⭐⭐⭐⭐⭐</td>
                      <td className="p-3 text-center">⭐⭐⭐</td>
                      <td className="p-3 text-center">⭐⭐⭐⭐</td>
                    </tr>
                    <tr className="border-b border-neutral-surface-variant">
                      <td className="p-3 font-medium">Liquidez</td>
                      <td className="p-3 text-center text-growth-green">Varia por produto</td>
                      <td className="p-3 text-center">Diária (na maioria)</td>
                      <td className="p-3 text-center">Diária (com desconto)</td>
                    </tr>
                    <tr className="border-b border-neutral-surface-variant">
                      <td className="p-3 font-medium">Valor Mínimo</td>
                      <td className="p-3 text-center">R$ 1.000 a R$ 5.000</td>
                      <td className="p-3 text-center">R$ 100 a R$ 1.000</td>
                      <td className="p-3 text-center">R$ 30 a R$ 100</td>
                    </tr>
                    <tr className="border-b border-neutral-surface-variant">
                      <td className="p-3 font-medium">Indicado para</td>
                      <td className="p-3 text-center">Reserva de emergência</td>
                      <td className="p-3 text-center">Diversificação</td>
                      <td className="p-3 text-center">Iniciantes em investimentos</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-medium">Potencial de Retorno</td>
                      <td className="p-3 text-center text-primary-blue-dark">8-13% ao ano</td>
                      <td className="p-3 text-center text-growth-green">Varia amplamente</td>
                      <td className="p-3 text-center text-system-warning">10-13% ao ano</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
                <div className="rounded-lg border border-primary-blue/20 bg-primary-blue-light p-4">
                  <h4 className="mb-2 font-bold text-primary-blue-dark">🎯 Iniciantes</h4>
                  <p className="text-sm text-text-secondary">
                    Comece com <strong>Tesouro Direto</strong> pelo baixo valor mínimo e garantia do
                    governo federal.
                  </p>
                </div>

                <div className="rounded-lg border border-growth-green/20 bg-growth-green-soft p-4">
                  <h4 className="mb-2 font-bold text-growth-green">💰 Reserva</h4>
                  <p className="text-sm text-text-secondary">
                    Use <strong>Renda Fixa</strong> para reserva de emergência pela previsibilidade
                    e estabilidade.
                  </p>
                </div>

                <div className="rounded-lg border border-system-warning/20 bg-system-warning/10 p-4">
                  <h4 className="mb-2 font-bold text-system-warning">📈 Diversificação</h4>
                  <p className="text-sm text-text-secondary">
                    Explore <strong>Fundos de Investimento</strong> para diversificar e
                    potencializar os juros compostos.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        <section aria-labelledby="faq-heading">
          <FAQ
            id="faq-heading"
            title="Perguntas Frequentes - Calculadora do Primeiro Milhão"
            items={[
              {
                question: "É realmente possível um brasileiro comum chegar ao primeiro milhão?",
                answer:
                  "<strong>Sim, absolutamente!</strong> Cerca de 315.000 brasileiros já são milionários (0,15% da população). A maioria chegou lá através de <strong>disciplina, aportes regulares e juros compostos</strong>. Com R$ 500-2.000/mês a 8-12% ao ano, é possível em 15-25 anos!",
                borderColor: "growth-green",
              },
              {
                question: "Quanto tempo leva para juntar o primeiro milhão no Brasil?",
                answer:
                  "Depende de 3 fatores: <strong>capital inicial, aporte mensal e taxa de retorno</strong>. Exemplos: <strong>R$ 1.000/mês a 10% = 22 anos</strong>, <strong>R$ 2.000/mês a 12% = 15 anos</strong>, <strong>R$ 3.000/mês a 15% = 11 anos</strong>. Use nossa calculadora para seu cenário!",
                borderColor: "primary-blue",
              },
              {
                question: "Qual a melhor estratégia de investimento para o primeiro milhão?",
                answer:
                  "Diversificação inteligente: <strong>40-60% Renda Fixa</strong> (CDB, Tesouro, LCI/LCA), <strong>20-40% Ações</strong> (empresas sólidas), <strong>10-20% FIIs</strong> (renda passiva). O segredo está na <strong>regularidade dos aportes</strong>, não no produto 'milagroso'!",
                borderColor: "system-info",
              },
              {
                question: "Necessito de muito dinheiro para começar a investir?",
                answer:
                  "<strong>Não!</strong> Comece com R$ 30-100/mês. Muitas corretoras têm investimento mínimo baixo. O importante é <strong>começar hoje</strong>! R$ 200/mês por 30 anos a 10% = R$ 450.000. Tempo é mais valioso que valor inicial!",
                borderColor: "system-success",
              },
              {
                question: "Como manter disciplina para investir todo mês?",
                answer:
                  "<strong>Automação é fundamental!</strong> Configure débito automático logo após o salário. Dicas: defina metas claras, acompanhe mensalmente, aumente aportes gradualmente (+10% a cada promoção), mantenha reserva de emergência para não sacar investimentos.",
                borderColor: "growth-green",
              },
              {
                question: "Como os juros compostos aceleram o caminho ao milhão?",
                answer:
                  "Juros compostos = <strong>'juros sobre juros'</strong>. Exemplo R$ 1.000/mês a 10%: Ano 10 = R$ 204k, Ano 15 = R$ 417k, Ano 20 = R$ 765k, <strong>Ano 22 = R$ 1.014k!</strong> Nos últimos anos, os juros trabalham mais que você!",
                borderColor: "primary-blue",
              },
            ]}
            tipSection={{
              title: "Dica de Especialista",
              content:
                "Para <strong>acelerar seu primeiro milhão</strong>, use a regra 50/30/20: 50% gastos essenciais, 30% estilo de vida, 20% investimentos. A cada aumento salarial, direcione 50% para investimentos!",
            }}
            footerText="<strong>Pronto para começar?</strong> Nossa calculadora mostra exatamente quanto tempo você levará para chegar ao primeiro milhão com diferentes cenários de aportes e rentabilidade!"
          />

          {/* Footer com informações adicionais */}
          <Card className="border-l-4 border-primary-blue bg-primary-blue-light duration-300">
            <CardHeader>
              <CardTitle as="h2" className="text-lg font-bold text-text-primary">
                📚 Como Usar Esta Calculadora do Primeiro Milhão
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-sm text-text-secondary">
                <p>
                  Esta{" "}
                  <strong className="text-primary-blue-dark">calculadora do primeiro milhão</strong>{" "}
                  utiliza <strong className="text-growth-green">juros compostos</strong> para
                  mostrar quanto tempo levará para atingir sua meta financeira ou quanto você
                  confiável investir mensalmente.
                </p>
                <p>
                  <strong>Configurações disponíveis:</strong> Capital inicial, meta financeira
                  (padrão R$ 1 milhão), taxa anual esperada e escolha entre calcular tempo
                  necessário ou aporte mensal necessário.
                </p>
                <p>
                  <strong className="text-system-warning">Importante:</strong> Esta ferramenta é
                  para fins educacionais e planejamento financeiro. Para decisões de investimento,
                  consulte sempre um <strong>assessor financeiro qualificado</strong> e considere
                  sua tolerância ao risco.
                </p>
                <p className="mt-4 border-t border-primary-blue/20 pt-3 text-xs opacity-75">
                  🎯 Meta personalizada • ⏰ Tempo para objetivo • 🔒 Dados não armazenados • 📱
                  Compatível com todos os dispositivos • 🌙 Interface otimizada
                </p>
              </div>
            </CardContent>
          </Card>
        </section>
      </main>

      <aside aria-label="Calculadoras relacionadas">
        <RelatedCalculators category="financas" currentCalculatorId="primeiro-milhao" />
      </aside>
    </div>
  );
}
