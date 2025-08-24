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
      title: "Calculadora Consórcio 2025 – Simule Parcelas e Contemplação | CalculadoraOnlineBR",
    },
    {
      name: "description",
      content:
        "Simule parcelas de consórcio de imóveis e veículos. Calcule taxa de administração, valor das parcelas e probabilidade de contemplação. Compare grupos e modalidades.",
    },
    {
      name: "keywords",
      content:
        "calculadora consórcio, simulador consórcio, consórcio imóvel, consórcio veículo, parcelas consórcio, contemplação consórcio, taxa administração",
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
      href: "https://calculadoraonlinebr.com.br/calculadoras/financas/consorcio",
    },
    {
      property: "og:title",
      content: "Calculadora de Consórcio 2025 – Simulador de Parcelas e Contemplação",
    },
    {
      property: "og:description",
      content:
        "Simule parcelas de consórcio de imóveis e veículos. Calcule taxa de administração, valor das parcelas e probabilidade de contemplação. Compare grupos e modalidades.",
    },
    {
      property: "og:image",
      content: "https://www.calculadoraonlinebr.com.br/images/calculadora-consorcio.webp",
    },
    {
      property: "og:image:alt",
      content:
        "Calculadora de Consórcio - Simule parcelas e contemplação de consórcio imóvel e veículo",
    },
    {
      property: "og:image:type",
      content: "image/webp",
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
      content: "https://calculadoraonlinebr.com.br/calculadoras/financas/consorcio",
    },
    { property: "og:site_name", content: APP_NAME },
    { property: "og:locale", content: "pt_BR" },
    { name: "twitter:card", content: "summary_large_image" },
    {
      name: "twitter:title",
      content: "Calculadora de Consórcio 2025 – Simulador de Parcelas e Contemplação",
    },
    {
      name: "twitter:description",
      content:
        "Simule parcelas de consórcio de imóveis e veículos. Calcule taxa de administração, valor das parcelas e probabilidade de contemplação.",
    },
    {
      name: "twitter:image",
      content: "https://calculadoraonlinebr.com.br/og-images/calculadora-consorcio.webp",
    },
    {
      name: "twitter:image:alt",
      content: "Calculadora de Consórcio - Simule parcelas e contemplação",
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
        name: "Calculadora de Consórcio - Simulador de Parcelas e Contemplação 2025",
        description:
          "Simulador gratuito de consórcio para imóveis e veículos. Calcule parcelas, taxa de administração, valor do crédito e probabilidade de contemplação por sorteio.",
        url: "https://calculadoraonlinebr.com.br/calculadoras/financas/consorcio",
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
          "@id": "https://calculadoraonlinebr.com.br/calculadoras/financas/consorcio",
          name: "Calculadora de Consórcio 2025 - Simulador de Parcelas e Contemplação",
          description:
            "Simule parcelas de consórcio de imóveis e veículos. Calcule taxa de administração, valor das parcelas e probabilidade de contemplação por sorteio.",
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
                name: "Calculadora de Consórcio",
                item: "https://calculadoraonlinebr.com.br/calculadoras/financas/consorcio",
              },
            ],
          },
        },
        about: {
          "@type": "FinancialProduct",
          name: "Consórcio de Bens",
          description: "Sistema de aquisição programada de bens por meio de grupo de participantes",
          category: "Financing",
        },
        featureList: [
          "Simulação de parcelas de consórcio",
          "Cálculo de taxa de administração",
          "Valor do crédito disponível",
          "Probabilidade de contemplação por sorteio",
          "Comparação de diferentes grupos",
          "Análise de custo-benefício",
          "Interface móvel responsiva",
          "Resultados em tempo real",
        ],
      }),
    },
  ];
};

type ConsortiumType = "imovel" | "veiculo" | "moto";

interface ConsortiumResult {
  monthlyPayment: number;
  totalPaid: number;
  adminFeeTotal: number;
  creditValue: number;
  fundValue: number;
  contemplationProbability: number;
  averageContemplationMonth: number;
  totalContractMonths: number;
  adminFeeRate: number;
  effectiveRate: number;
  reserveFundTotal: number;
  insuranceTotal: number;
  membershipFee: number;
  adjustedMonthlyPaymentINPC: number;
  projectedAnnualAdjustment: number;
}

interface ValidationErrors {
  creditValue?: string;
  totalMonths?: string;
  adminFeeRate?: string;
  participants?: string;
  reserveFundRate?: string;
  insuranceRate?: string;
  membershipFeeRate?: string;
}

export default function ConsortiumCalculator() {
  const defaultINPC = ECONOMIC_INDICATORS.INPC.rate.toLocaleString("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  const [consortiumType, setConsortiumType] = useState<ConsortiumType>("imovel");
  const [creditValue, setCreditValue] = useState("");
  const [totalMonths, setTotalMonths] = useState("");
  const [adminFeeRate, setAdminFeeRate] = useState("20,00");
  const [participants, setParticipants] = useState("");
  const [reserveFundRate, setReserveFundRate] = useState("2,00");
  const [insuranceRate, setInsuranceRate] = useState("0,00");
  const [membershipFeeRate, setMembershipFeeRate] = useState("0,00");
  const [result, setResult] = useState<ConsortiumResult | null>(null);
  const [errors, setErrors] = useState<ValidationErrors>({});
  const resultRef = useRef<HTMLDivElement>(null);

  const { startCalculation, endCalculation } = useAutoCalculatorTracking({
    calculatorType: "consorcio",
    category: "financas",
  });
  useFormTracking("consorcio");

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

    const credit = parseMoney(creditValue);
    if (credit <= 0) {
      newErrors.creditValue = "Valor do crédito obrigatório e maior que 0";
      ok = false;
    }

    const months = parseInt(totalMonths, 10);
    if (!totalMonths || isNaN(months) || months <= 0 || months > 300) {
      newErrors.totalMonths = "Prazo deve estar entre 1 e 300 meses";
      ok = false;
    }

    const adminRate = parseRate(adminFeeRate);
    if (adminRate <= 0 || adminRate > 0.5) {
      newErrors.adminFeeRate = "Taxa de administração deve estar entre 0,01% e 50%";
      ok = false;
    }

    const participantsNum = parseInt(participants, 10);
    if (!participants || isNaN(participantsNum) || participantsNum < 10 || participantsNum > 1000) {
      newErrors.participants = "Número de participantes deve estar entre 10 e 1000";
      ok = false;
    }

    const reserveRate = parseRate(reserveFundRate);
    if (reserveRate < 0 || reserveRate > 0.1) {
      newErrors.reserveFundRate = "Fundo de reserva deve estar entre 0% e 10%";
      ok = false;
    }

    const insurance = parseRate(insuranceRate);
    if (insurance < 0 || insurance > 0.05) {
      newErrors.insuranceRate = "Seguro deve estar entre 0% e 5%";
      ok = false;
    }

    const membershipRate = parseRate(membershipFeeRate);
    if (membershipRate < 0 || membershipRate > 0.1) {
      newErrors.membershipFeeRate = "Taxa de adesão deve estar entre 0% e 10%";
      ok = false;
    }

    setErrors(newErrors);
    return ok;
  };

  const calculateConsortium = () => {
    const credit = parseMoney(creditValue);
    const months = parseInt(totalMonths, 10);
    const adminRate = parseRate(adminFeeRate);
    const participantsNum = parseInt(participants, 10);
    const reserveRate = parseRate(reserveFundRate);
    const insurance = parseRate(insuranceRate);
    const membershipRate = parseRate(membershipFeeRate);

    // Taxas sobre o valor do crédito
    const adminFeeTotal = credit * adminRate;
    const reserveFundTotal = credit * reserveRate;
    const insuranceTotal = credit * insurance;
    const membershipFee = credit * membershipRate;

    // Valor do fundo total (crédito + todas as taxas)
    const fundValue = credit + adminFeeTotal + reserveFundTotal + insuranceTotal + membershipFee;

    // Parcela mensal base = fundo / número de meses
    const monthlyPayment = fundValue / months;

    // Total pago pelo consorciado
    const totalPaid = monthlyPayment * months;

    // Probabilidade de contemplação por sorteio (aproximada)
    const contemplationProbability = 1 / participantsNum;

    // Mês médio de contemplação (aproximado)
    const averageContemplationMonth = participantsNum / 2;

    // Taxa efetiva anual do consórcio
    const effectiveRate = (totalPaid / credit - 1) * 100;

    // Projeção de ajuste pelo INPC
    const inpcRate = ECONOMIC_INDICATORS.INPC.rate / 100;
    const projectedAnnualAdjustment = inpcRate * 100;
    const adjustedMonthlyPaymentINPC = monthlyPayment * (1 + inpcRate);

    return {
      monthlyPayment,
      totalPaid,
      adminFeeTotal,
      creditValue: credit,
      fundValue,
      contemplationProbability: contemplationProbability * 100,
      averageContemplationMonth,
      totalContractMonths: months,
      adminFeeRate: adminRate * 100,
      effectiveRate,
      reserveFundTotal,
      insuranceTotal,
      membershipFee,
      adjustedMonthlyPaymentINPC,
      projectedAnnualAdjustment,
    };
  };

  const handleCalculate = () => {
    if (!validateInputs()) return;
    startCalculation("calcular");
    try {
      const res = calculateConsortium();
      setResult(res);
      setErrors({});
      setTimeout(() => {
        resultRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 50);
      endCalculation("calcular", { success: true });
    } catch {
      setErrors({ creditValue: "Erro no cálculo. Verifique os valores inseridos." });
      endCalculation("calcular", { success: false });
    }
  };

  const handleReset = () => {
    setCreditValue("");
    setTotalMonths("");
    setAdminFeeRate("20,00");
    setParticipants("");
    setReserveFundRate("2,00");
    setInsuranceRate("0,00");
    setMembershipFeeRate("0,00");
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
        <BreadcrumbItem isLast>Consórcio</BreadcrumbItem>
      </Breadcrumb>

      <header className="space-y-4 text-center">
        <h1 className="mb-4 text-3xl font-bold text-text-primary md:text-4xl">
          Calculadora Consórcio 2025 – Simule Parcelas
        </h1>
        <p className="mx-auto max-w-3xl text-lg text-text-secondary-dark">
          Calcule as <strong className="text-growth-green">parcelas do seu consórcio</strong>{" "}
          considerando valor do crédito, prazo e taxa de administração. Compare diferentes grupos e
          receba <strong className="text-primary-blue-dark">simulações de contemplação</strong> para
          apoiar suas decisões.
        </p>
        <div className="inline-block rounded-lg bg-growth-green-soft p-4 duration-300">
          <p className="text-sm font-medium text-text-primary">
            🔎 <strong>Cálculo Preciso</strong> • 📊 <strong>Comparação de Grupos</strong> • ⚙️{" "}
            <strong>Análise de Contemplação</strong>
          </p>
        </div>
      </header>

      <Card>
        <CardHeader>
          <CardTitle as="h2">📋 Configure sua Simulação de Consórcio</CardTitle>
        </CardHeader>
        <CardContent>
          {/* Tipo de Consórcio centralizado */}
          <div className="mb-6 flex flex-wrap justify-center gap-2">
            <div className="inline-flex overflow-hidden rounded-lg border border-neutral-surface-variant">
              <button
                type="button"
                aria-label="Selecionar consórcio de imóvel"
                onClick={() => setConsortiumType("imovel")}
                className={`min-w-[120px] flex-1 basis-0 py-3 text-center text-base font-medium transition ${
                  consortiumType === "imovel"
                    ? "bg-primary-blue text-white"
                    : "bg-neutral-surface text-text-secondary hover:bg-primary-blue/10"
                }`}
              >
                Imóvel
              </button>
              <button
                type="button"
                aria-label="Selecionar consórcio de veículo"
                onClick={() => setConsortiumType("veiculo")}
                className={`min-w-[120px] flex-1 basis-0 py-3 text-center text-base font-medium transition ${
                  consortiumType === "veiculo"
                    ? "bg-primary-blue text-white"
                    : "bg-neutral-surface text-text-secondary hover:bg-primary-blue/10"
                }`}
              >
                Veículo
              </button>
              <button
                type="button"
                aria-label="Selecionar consórcio de moto"
                onClick={() => setConsortiumType("moto")}
                className={`min-w-[120px] flex-1 basis-0 py-3 text-center text-base font-medium transition ${
                  consortiumType === "moto"
                    ? "bg-primary-blue text-white"
                    : "bg-neutral-surface text-text-secondary hover:bg-primary-blue/10"
                }`}
              >
                Moto
              </button>
            </div>
          </div>

          {/* Valor do Crédito, Taxa de Administração, Prazo e Participantes */}
          <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <MoneyInput
                label="Valor do Crédito"
                value={creditValue}
                onChange={setCreditValue}
                placeholder="200.000,00"
                fullWidth
                className="h-12 text-lg"
              />
              <ErrorMessage error={errors.creditValue} />
            </div>
            <div>
              <Input
                type="number"
                label="Prazo (meses)"
                value={totalMonths}
                onChange={(e) => setTotalMonths(e.target.value)}
                placeholder="120"
                fullWidth
                className="h-12 text-lg"
              />
              <ErrorMessage error={errors.totalMonths} />
            </div>
            <div>
              <RateInput
                label="Taxa de Administração (%)"
                value={adminFeeRate}
                onChange={setAdminFeeRate}
                placeholder="20,00"
                fullWidth
                className="h-12 text-lg"
              />
              <ErrorMessage error={errors.adminFeeRate} />
            </div>
            <div>
              <Input
                type="number"
                label="Número de Participantes"
                value={participants}
                onChange={(e) => setParticipants(e.target.value)}
                placeholder="100"
                fullWidth
                className="h-12 text-lg"
              />
              <ErrorMessage error={errors.participants} />
            </div>
          </div>

          {/* Campos Opcionais */}
          <div className="mb-6 rounded-lg border border-neutral-surface-variant bg-background-dark-secondary p-4">
            <h3 className="mb-4 text-lg font-semibold text-text-primary">
              ⚙️ Configurações Adicionais (Opcional)
            </h3>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <div>
                <RateInput
                  label="Fundo de Reserva (%)"
                  value={reserveFundRate}
                  onChange={setReserveFundRate}
                  placeholder="2,00"
                  fullWidth
                  className="h-12 text-lg"
                />
                <ErrorMessage error={errors.reserveFundRate} />
              </div>
              <div>
                <RateInput
                  label="Seguro (% - Opcional)"
                  value={insuranceRate}
                  onChange={setInsuranceRate}
                  placeholder="0,00"
                  fullWidth
                  className="h-12 text-lg"
                />
                <ErrorMessage error={errors.insuranceRate} />
              </div>
              <div>
                <RateInput
                  label="Taxa de Adesão (% - Opcional)"
                  value={membershipFeeRate}
                  onChange={setMembershipFeeRate}
                  placeholder="0,00"
                  fullWidth
                  className="h-12 text-lg"
                />
                <ErrorMessage error={errors.membershipFeeRate} />
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
              📊 Resultado da Simulação de Consórcio
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
                  {currencyBR(result.totalPaid)}
                </div>
                <div className="text-sm text-text-secondary">Total a Pagar</div>
              </div>
              <div className="rounded-lg bg-gray-900 p-6 text-center">
                <div className="text-2xl font-bold text-system-warning">
                  {percentBR(result.contemplationProbability, 2)}%
                </div>
                <div className="text-sm text-text-secondary">Chance de Contemplação/Mês</div>
              </div>
            </div>

            <div className="mb-6 grid grid-cols-1 gap-6 rounded-lg bg-gray-900 p-4 md:grid-cols-3">
              <div className="text-center">
                <div className="text-sm text-text-secondary">Taxa de Administração</div>
                <div className="text-xl font-bold text-text-primary">
                  {percentBR(result.adminFeeRate, 2)}%
                </div>
                <div className="text-sm text-text-secondary">
                  {currencyBR(result.adminFeeTotal)}
                </div>
              </div>
              <div className="text-center">
                <div className="text-sm text-text-secondary">Valor do Fundo</div>
                <div className="text-xl font-bold text-text-primary">
                  {currencyBR(result.fundValue)}
                </div>
                <div className="text-sm text-text-secondary">Crédito + Taxa Adm</div>
              </div>
              <div className="text-center">
                <div className="text-sm text-text-secondary">Mês Médio de Contemplação</div>
                <div className="text-xl font-bold text-text-primary">
                  {Math.round(result.averageContemplationMonth)}º mês
                </div>
              </div>
            </div>

            {result.totalContractMonths > 120 && (
              <div className="mb-6 rounded border border-system-warning/20 bg-system-warning/10 p-3 text-sm text-system-warning">
                ⚠️ Prazos longos (acima de 10 anos) podem apresentar maior risco de inadimplência do
                grupo. Considere grupos menores e mais consolidados.
              </div>
            )}

            {/* Seção de Projeção INPC */}
            <div className="mb-6 rounded-lg border border-system-info/20 bg-system-info/10 p-4">
              <h4 className="mb-3 font-semibold text-system-info">
                📈 Projeção de Reajuste pelo INPC
              </h4>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="text-center">
                  <div className="text-sm text-text-secondary">Parcela Atual</div>
                  <div className="text-2xl font-bold text-text-primary">
                    {currencyBR(result.monthlyPayment)}
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-sm text-text-secondary">Parcela Projetada (próximo ano)</div>
                  <div className="text-2xl font-bold text-system-info">
                    {currencyBR(result.adjustedMonthlyPaymentINPC)}
                  </div>
                  <div className="text-xs text-text-secondary">
                    Reajuste estimado: +{percentBR(result.projectedAnnualAdjustment, 2)}% (INPC)
                  </div>
                </div>
              </div>
              <p className="mt-3 text-xs text-text-secondary">
                * Projeção baseada no INPC atual ({percentBR(ECONOMIC_INDICATORS.INPC.rate, 2)}%
                a.a.). Reajustes reais podem variar conforme índice oficial no período.
              </p>
            </div>

            <div className="rounded-lg bg-primary-blue-light p-4">
              <h4 className="mb-2 font-semibold text-primary-blue-dark">Resumo Técnico</h4>
              <ul className="space-y-1 text-sm text-text-secondary">
                <li>
                  Valor do crédito: <strong>{currencyBR(result.creditValue)}</strong>
                </li>
                <li>
                  Taxa de administração: <strong>{currencyBR(result.adminFeeTotal)}</strong>
                </li>
                {result.reserveFundTotal > 0 && (
                  <li>
                    Fundo de reserva: <strong>{currencyBR(result.reserveFundTotal)}</strong>
                  </li>
                )}
                {result.insuranceTotal > 0 && (
                  <li>
                    Seguro: <strong>{currencyBR(result.insuranceTotal)}</strong>
                  </li>
                )}
                {result.membershipFee > 0 && (
                  <li>
                    Taxa de adesão: <strong>{currencyBR(result.membershipFee)}</strong>
                  </li>
                )}
                <li>
                  Valor do fundo do grupo: <strong>{currencyBR(result.fundValue)}</strong>
                </li>
                <li>
                  Taxa efetiva do consórcio: <strong>{percentBR(result.effectiveRate, 2)}%</strong>
                </li>
                <li>
                  Prazo total do contrato: <strong>{result.totalContractMonths} meses</strong>
                </li>
              </ul>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Seção: Detalhes dos Tipos de Consórcio - Guia Completo */}
      <Card className="border-l-4 border-primary-blue bg-gradient-to-r from-primary-blue-light to-growth-green-soft duration-300">
        <CardHeader>
          <CardTitle as="h2" className="text-2xl font-bold text-text-primary">
            🎯 Tipos de Consórcio – Guia Completo 2025
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-8">
            {/* Consórcio de Imóveis */}
            <div className="rounded-xl border border-primary-blue/20 bg-gray-900 p-6">
              <h3 className="mb-4 flex items-center text-xl font-bold text-primary-blue-dark">
                🏠 Consórcio de Imóveis
              </h3>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <h4 className="mb-3 font-semibold text-growth-green">🔍 O que é?</h4>
                  <p className="mb-4 text-sm text-text-secondary">
                    Sistema de aquisição programada de imóveis através de grupo organizado, onde os
                    participantes pagam parcelas mensais até serem contemplados.
                  </p>

                  <h4 className="mb-3 font-semibold text-system-info">📊 Funcionamento</h4>
                  <ul className="mb-4 space-y-1 text-sm text-text-secondary">
                    <li>• Contemplação por sorteio mensal</li>
                    <li>• Possibilidade de lance para antecipar</li>
                  </ul>
                </div>

                <div>
                  <h4 className="mb-3 font-semibold text-system-success">✅ Vantagens</h4>
                  <ul className="mb-4 space-y-1 text-sm text-text-secondary">
                    <li>• Valores menores que financiamento</li>
                    <li>• Não há juros sobre o crédito</li>
                  </ul>

                  <h4 className="mb-3 font-semibold text-system-warning">⚠️ Limitações</h4>
                  <ul className="space-y-1 text-sm text-text-secondary">
                    <li>• Não há garantia de quando será contemplado</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Consórcio de Veículos */}
            <div className="rounded-xl border border-growth-green/20 bg-gray-900 p-6">
              <h3 className="mb-4 flex items-center text-xl font-bold text-growth-green">
                🚗 Consórcio de Veículos
              </h3>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <h4 className="mb-3 font-semibold text-primary-blue-dark">🔍 O que é?</h4>
                  <p className="mb-4 text-sm text-text-secondary">
                    Modalidade focada na aquisição de automóveis, caminhões e outros veículos, com
                    prazos menores e valores mais acessíveis.
                  </p>

                  <h4 className="mb-3 font-semibold text-system-info">📊 Características</h4>
                  <ul className="mb-4 space-y-1 text-sm text-text-secondary">
                    <li>• Prazos de 30 a 100 meses</li>
                    <li>• Grupos menores que imóveis</li>
                  </ul>
                </div>

                <div>
                  <h4 className="mb-3 font-semibold text-system-success">✅ Vantagens</h4>
                  <ul className="mb-4 space-y-1 text-sm text-text-secondary">
                    <li>• Contemplação mais rápida</li>
                    <li>• Flexibilidade de marca e modelo</li>
                  </ul>

                  <h4 className="mb-3 font-semibold text-system-warning">⚠️ Limitações</h4>
                  <ul className="space-y-1 text-sm text-text-secondary">
                    <li>• Depreciação do veículo durante o prazo</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Consórcio de Motos */}
            <div className="rounded-xl border border-system-warning/20 bg-gray-900 p-6">
              <h3 className="mb-4 flex items-center text-xl font-bold text-system-warning">
                🏍️ Consórcio de Motos
              </h3>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <h4 className="mb-3 font-semibold text-growth-green">🔍 O que é?</h4>
                  <p className="mb-4 text-sm text-text-secondary">
                    Opção mais acessível para aquisição de motocicletas, com valores menores e
                    prazos reduzidos comparado aos outros consórcios.
                  </p>

                  <h4 className="mb-3 font-semibold text-system-info">📊 Perfil</h4>
                  <ul className="mb-4 space-y-1 text-sm text-text-secondary">
                    <li>• Prazos de 24 a 60 meses</li>
                    <li>• Parcelas mais baixas</li>
                  </ul>
                </div>

                <div>
                  <h4 className="mb-3 font-semibold text-system-success">✅ Vantagens</h4>
                  <ul className="mb-4 space-y-1 text-sm text-text-secondary">
                    <li>• Entrada facilitada no mercado</li>
                    <li>• Contemplação mais ágil</li>
                  </ul>

                  <h4 className="mb-3 font-semibold text-system-warning">⚠️ Limitações</h4>
                  <ul className="space-y-1 text-sm text-text-secondary">
                    <li>• Alta depreciação do bem</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Seção: Componentes do Consórcio */}
      <Card className="border-l-4 border-system-info bg-gradient-to-r from-system-info/10 to-primary-blue-light duration-300">
        <CardHeader>
          <CardTitle as="h2" className="text-2xl font-bold text-text-primary">
            🧾 Componentes dos Custos do Consórcio
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="space-y-4">
              <div className="rounded-lg border border-primary-blue/20 bg-gray-900 p-4">
                <h4 className="mb-2 font-bold text-primary-blue-dark">📊 Taxa de Administração</h4>
                <p className="text-sm text-text-secondary">
                  Principal custo do consórcio, varia de 15% a 35% do valor do crédito. É dividida
                  entre todas as parcelas mensais do grupo.
                </p>
              </div>

              <div className="rounded-lg border border-growth-green/20 bg-gray-900 p-4">
                <h4 className="mb-2 font-bold text-growth-green">🛡️ Fundo de Reserva</h4>
                <p className="text-sm text-text-secondary">
                  Geralmente 1% a 3% do crédito. Protege o grupo contra inadimplência e é devolvido
                  proporcionalmente no encerramento.
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="rounded-lg border border-system-warning/20 bg-gray-900 p-4">
                <h4 className="mb-2 font-bold text-system-warning">🔒 Seguro (Opcional)</h4>
                <p className="text-sm text-text-secondary">
                  Protege contra morte e invalidez permanente. Varia de 0,1% a 2% do crédito
                  conforme idade e tipo de bem.
                </p>
              </div>

              <div className="rounded-lg border border-system-info/20 bg-gray-900 p-4">
                <h4 className="mb-2 font-bold text-system-info">📝 Taxa de Adesão (Opcional)</h4>
                <p className="text-sm text-text-secondary">
                  Cobrada uma única vez na entrada. Varia de 0,5% a 5% do crédito, dependendo da
                  administradora e modalidade.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-6 rounded-lg border border-system-info/30 bg-system-info/5 p-4">
            <h4 className="mb-2 font-bold text-system-info">📈 Reajuste pelo INPC</h4>
            <p className="text-sm text-text-secondary">
              As parcelas do consórcio são reajustadas anualmente pelo INPC (Índice Nacional de
              Preços ao Consumidor), que mede a inflação. Este reajuste mantém o poder de compra das
              parcelas ao longo do tempo. A simulação mostra a projeção baseada no INPC atual.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Seção: Comparação de Tipos de Consórcio */}
      <Card className="border border-neutral-surface-variant bg-background-dark-secondary duration-300">
        <CardHeader>
          <CardTitle as="h2" className="text-xl font-bold text-text-primary">
            ⚖️ Tabela Comparativa: Qual Consórcio Escolher?
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="border-b-2 border-neutral-surface-variant">
                  <th className="p-3 text-left font-semibold">Critério</th>
                  <th className="p-3 text-center font-semibold text-primary-blue-dark">
                    Consórcio de Imóveis
                  </th>
                  <th className="p-3 text-center font-semibold text-growth-green">
                    Consórcio de Veículos
                  </th>
                  <th className="p-3 text-center font-semibold text-system-warning">
                    Consórcio de Motos
                  </th>
                </tr>
              </thead>
              <tbody className="space-y-2">
                <tr className="border-b border-neutral-surface-variant">
                  <td className="p-3 font-medium">Valor Típico</td>
                  <td className="p-3 text-center text-primary-blue-dark">R$ 150k - R$ 800k</td>
                  <td className="p-3 text-center text-growth-green">R$ 30k - R$ 150k</td>
                  <td className="p-3 text-center text-system-warning">R$ 8k - R$ 30k</td>
                </tr>
                <tr className="border-b border-neutral-surface-variant">
                  <td className="p-3 font-medium">Prazo Típico</td>
                  <td className="p-3 text-center">⭐⭐⭐ (100-200 meses)</td>
                  <td className="p-3 text-center">⭐⭐⭐⭐ (60-100 meses)</td>
                  <td className="p-3 text-center">⭐⭐⭐⭐⭐ (30-60 meses)</td>
                </tr>
                <tr className="border-b border-neutral-surface-variant">
                  <td className="p-3 font-medium">Velocidade de Contemplação</td>
                  <td className="p-3 text-center text-system-warning">Mais lenta</td>
                  <td className="p-3 text-center text-primary-blue-dark">Média</td>
                  <td className="p-3 text-center text-growth-green">Mais rápida</td>
                </tr>
                <tr className="border-b border-neutral-surface-variant">
                  <td className="p-3 font-medium">Taxa de Administração</td>
                  <td className="p-3 text-center">15% - 25%</td>
                  <td className="p-3 text-center">18% - 30%</td>
                  <td className="p-3 text-center">20% - 35%</td>
                </tr>
                <tr className="border-b border-neutral-surface-variant">
                  <td className="p-3 font-medium">Indicado para</td>
                  <td className="p-3 text-center">Aquisição de imóvel</td>
                  <td className="p-3 text-center">Troca ou primeiro veículo</td>
                  <td className="p-3 text-center">Mobilidade urbana</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium">Perfil do Investidor</td>
                  <td className="p-3 text-center text-primary-blue-dark">Longo prazo, paciencia</td>
                  <td className="p-3 text-center text-growth-green">Médio prazo, flexível</td>
                  <td className="p-3 text-center text-system-warning">Curto prazo, ágil</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className="rounded-lg border border-primary-blue/20 bg-primary-blue-light p-4">
              <h4 className="mb-2 font-bold text-primary-blue-dark">🎯 Longo Prazo</h4>
              <p className="text-sm text-text-secondary">
                Escolha <strong>Consórcio de Imóveis</strong> se tem paciencia e quer realizar o
                sonho da casa própria.
              </p>
            </div>

            <div className="rounded-lg border border-growth-green/20 bg-growth-green-soft p-4">
              <h4 className="mb-2 font-bold text-growth-green">🚗 Equilibrado</h4>
              <p className="text-sm text-text-secondary">
                Prefira <strong>Consórcio de Veículos</strong> para ter flexibilidade entre prazo e
                contemplação.
              </p>
            </div>

            <div className="rounded-lg border border-system-warning/20 bg-system-warning/10 p-4">
              <h4 className="mb-2 font-bold text-system-warning">🏍️ Rápido</h4>
              <p className="text-sm text-text-secondary">
                Opte por <strong>Consórcio de Motos</strong> para contemplação mais ágil e parcelas
                menores.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <FAQ
        title="Perguntas Frequentes - Calculadora de Consórcio"
        items={[
          {
            question: "O que é um consórcio?",
            answer:
              "Consórcio é um sistema de aquisição programada de bens (imóveis, veículos, motos) por meio de grupo organizado, onde participantes pagam parcelas mensais até serem contemplados por sorteio ou lance.",
            borderColor: "primary-blue",
          },
          {
            question: "Como funciona a contemplação?",
            answer:
              "A contemplação ocorre por sorteio mensal ou lance. No sorteio, todos têm chances iguais. No lance, quem oferece maior valor tem prioridade. A contemplação dá direito ao crédito para aquisição do bem.",
            borderColor: "growth-green",
          },
          {
            question: "Posso sair do consórcio antes de ser contemplado?",
            answer:
              "Sim, mas há regras específicas. Se sair por desistência, recebe os valores pagos corrigidos após o encerramento do grupo, deduzindo taxas. Se for excluído por inadimplência, as regras são mais restritivas.",
            borderColor: "system-info",
          },
          {
            question: "Qual é a taxa de administração do consórcio?",
            answer:
              "A taxa varia conforme o bem e administradora: imóveis (15-25%), veículos (18-30%), motos (20-35%). Esta taxa é cobrada sobre o valor do crédito e divide-se entre todas as parcelas do grupo.",
            borderColor: "system-warning",
          },
          {
            question: "Consórcio tem garantia ou seguro?",
            answer:
              "Consórcios são regulamentados pelo Banco Central e as administradoras devem manter reservas. Não há garantia do FGC, mas existe regulação específica que protege os consorciados em caso de problemas da administradora.",
            borderColor: "growth-green",
          },
          {
            question: "O que é o fundo de reserva e seguro do consórcio?",
            answer:
              "O fundo de reserva (1-3% do crédito) protege contra inadimplência e é devolvido no final. O seguro (opcional, 0,1-2%) cobre morte e invalidez. A taxa de adesão (opcional, 0,5-5%) é paga uma única vez na entrada.",
            borderColor: "system-info",
          },
          {
            question: "Como funciona o reajuste pelo INPC?",
            answer:
              "As parcelas são reajustadas anualmente pelo INPC para manter o poder de compra. Este índice mede a inflação e garante que o valor das parcelas acompanhe o custo de vida. O reajuste é aplicado a todos os participantes.",
            borderColor: "primary-blue",
          },
          {
            question: "Como escolher entre consórcio, financiamento ou poupança?",
            answer:
              "Consórcio é ideal para quem tem disciplina e não tem pressa. Financiamento dá posse imediata mas custa mais. Poupança é mais segura mas pode não acompanhar a inflação do bem desejado.",
            borderColor: "system-error-dark",
          },
        ]}
        tipSection={{
          title: "Dica Importante sobre Consórcio",
          content:
            "<strong>Para a melhor escolha:</strong> avalie sua capacidade de pagamento, urgência na aquisição e tolerância à incerteza. Consórcios são excelentes para planejamento de longo prazo.",
        }}
        footerText="<strong>Lembre-se:</strong> Compare taxas de administração, tamanho do grupo e histórico da administradora antes de aderir ao consórcio."
      />

      {/* Footer com informações adicionais */}
      <Card className="border-l-4 border-primary-blue bg-primary-blue-light duration-300">
        <CardHeader>
          <CardTitle as="h2" className="text-lg font-bold text-text-primary">
            📚 Como Usar Esta Calculadora de Consórcio
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 text-sm text-text-secondary">
            <p>
              Esta <strong className="text-primary-blue-dark">calculadora de consórcio</strong>{" "}
              utiliza <strong className="text-growth-green">simulações financeiras</strong> para
              estimar as parcelas mensais, probabilidade de contemplação e custo total de diferentes
              tipos de consórcio.
            </p>
            <p>
              <strong>Modalidades disponíveis:</strong> Consórcio de Imóveis, Veículos e Motos. Cada
              modalidade tem características próprias de prazo, valor e velocidade de contemplação.
            </p>
            <p>
              <strong className="text-system-warning">Importante:</strong> Esta ferramenta é para
              fins educacionais e de planejamento pessoal. Para decisões de adesão, consulte sempre
              um <strong>especialista em consórcios</strong> e analise as condições da
              administradora escolhida.
            </p>
            <p className="mt-4 border-t border-primary-blue/20 pt-3 text-xs opacity-75">
              🔎 Foco didático • 💰 Simulações realistas • 🔒 Dados não armazenados • 📱 Compatível
              com todos os dispositivos • 🌙 Suporte a modo escuro
            </p>
          </div>
        </CardContent>
      </Card>

      <RelatedCalculators category="financas" currentCalculatorId="consorcio" />
    </div>
  );
}
