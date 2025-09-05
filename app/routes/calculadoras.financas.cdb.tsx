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
      title: "Calculadora de CDB 2025 – Simulador com IR e IOF | CalculadoraOnlineBR",
    },
    {
      name: "description",
      content:
        "Simule CDB pós-fixado, prefixado e IPCA+ com cálculo automático de IR regressivo e IOF. Compare rendimentos, taxas reais 2025 e descubra seu montante líquido.",
    },
    {
      name: "keywords",
      content:
        "calculadora CDB, simulador CDB, rendimento CDB, CDB pós-fixado, CDB prefixado, CDB IPCA+, IR regressivo, IOF",
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
      href: "https://www.calculadoraonlinebr.com.br/calculadoras/financas/cdb",
    },
    {
      property: "og:title",
      content: "Calculadora de CDB 2025 – Simulador com IR e IOF",
    },
    {
      property: "og:description",
      content:
        "Simule CDB pós-fixado, prefixado e IPCA+ com cálculo automático de IR regressivo e IOF. Compare rendimentos, taxas reais 2025 e descubra seu montante líquido.",
    },
    {
      property: "og:image",
      content: "https://www.calculadoraonlinebr.com.br/images/calculadora-cdb.webp",
    },
    {
      property: "og:image:alt",
      content:
        "Calculadora de CDB - Simule rendimentos de CDB pós-fixado, prefixado e IPCA+ com IR e IOF",
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
      content: "https://www.calculadoraonlinebr.com.br/calculadoras/financas/cdb",
    },
    { property: "og:site_name", content: APP_NAME },
    { property: "og:locale", content: "pt_BR" },
    { name: "twitter:card", content: "summary_large_image" },
    {
      name: "twitter:title",
      content: "Calculadora de CDB 2025 – Simulador com IR e IOF",
    },
    {
      name: "twitter:description",
      content:
        "Simule CDB pós-fixado, prefixado e IPCA+ com cálculo automático de IR regressivo e IOF. Compare rendimentos e taxas reais 2025.",
    },
    {
      name: "twitter:image",
      content: "https://www.calculadoraonlinebr.com.br/images/calculadora-cdb.webp",
    },
    {
      name: "twitter:image:alt",
      content: "Calculadora de CDB - Simule rendimentos com IR e IOF",
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
  ];
};

type TitleType = "cdi" | "ipca" | "prefixado";
type FixType = "pos" | "pre";

interface CdbResult {
  grossYield: number;
  irTax: number;
  iofTax: number;
  netYield: number;
  finalAmount: number;
  grossRatePct: number;
  netRatePct: number;
  annualizedNetPct: number;
  periodDays: number;
  irRateAppliedPct: number;
  iofRateAppliedPct: number;
  cdiAnnualPct?: number;
  cdbOverCdiPct?: number;
  ipcaAnnualPct?: number;
  realRatePct?: number;
  fixedRatePct?: number;
}

interface ValidationErrors {
  principal?: string;
  days?: string;
  cdi?: string;
  cdbOverCdi?: string;
  ipca?: string;
  realRate?: string;
  fixedRate?: string;
}

export default function CdbCalculator() {
  const defaultIPCA = ECONOMIC_INDICATORS.IPCA.rate.toLocaleString("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  const defaultCDI = ECONOMIC_INDICATORS.CDI.rate.toLocaleString("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  const [titleType, setTitleType] = useState<TitleType>("cdi");
  const [fixType, setFixType] = useState<FixType>("pos");
  const [principal, setPrincipal] = useState("");
  const [days, setDays] = useState("");
  const [cdiAnnualPct, setCdiAnnualPct] = useState(defaultCDI);
  const [cdbOverCdiPct, setCdbOverCdiPct] = useState("101,00");
  const [ipcaAnnualPct, setIpcaAnnualPct] = useState(defaultIPCA);
  const [realRatePct, setRealRatePct] = useState(defaultIPCA);
  const [fixedRatePct, setFixedRatePct] = useState(defaultCDI);
  const [applyIOF, setApplyIOF] = useState(true);
  const [result, setResult] = useState<CdbResult | null>(null);
  const [errors, setErrors] = useState<ValidationErrors>({});
  const resultRef = useRef<HTMLDivElement>(null);

  const { startCalculation, endCalculation } = useAutoCalculatorTracking({
    calculatorType: "cdb",
    category: "financas",
  });
  useFormTracking("cdb");

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

  const validateInputs = (): boolean => {
    const newErrors: ValidationErrors = {};
    let ok = true;
    const p = parseMoney(principal);
    if (p <= 0) {
      newErrors.principal = "Valor inicial obrigatório e maior que 0";
      ok = false;
    }
    const d = parseInt(days, 10);
    if (!days || isNaN(d) || d <= 0) {
      newErrors.days = "Prazo (dias) obrigatório e maior que 0";
      ok = false;
    }
    if (fixType === "pos" && titleType === "cdi") {
      if (parseRate(cdiAnnualPct) <= 0) {
        newErrors.cdi = "CDI anual (%) deve ser > 0";
        ok = false;
      }
      if (parseMoney(cdbOverCdiPct) <= 0) {
        newErrors.cdbOverCdi = "% do CDI deve ser > 0";
        ok = false;
      }
    }
    if (fixType === "pos" && titleType === "ipca") {
      if (parseRate(ipcaAnnualPct) < 0) {
        newErrors.ipca = "IPCA (a.a. %) inválido";
        ok = false;
      }
      if (parseRate(realRatePct) <= 0) {
        newErrors.realRate = "Taxa real (a.a. %) deve ser > 0";
        ok = false;
      }
    }
    if (fixType === "pre" && titleType === "prefixado") {
      if (parseRate(fixedRatePct) <= 0) {
        newErrors.fixedRate = "Taxa prefixada (a.a. %) deve ser > 0";
        ok = false;
      }
    }
    setErrors(newErrors);
    return ok;
  };

  const getAnnualRate = () => {
    if (fixType === "pos" && titleType === "cdi") {
      return parseRate(cdiAnnualPct) * (parseMoney(cdbOverCdiPct) / 100);
    }
    if (fixType === "pos" && titleType === "ipca") {
      return (1 + parseRate(ipcaAnnualPct)) * (1 + parseRate(realRatePct)) - 1;
    }
    if (fixType === "pre" && titleType === "prefixado") {
      return parseRate(fixedRatePct);
    }
    return 0;
  };

  const handleCalculate = () => {
    if (!validateInputs()) return;
    startCalculation("calcular");
    try {
      const p = parseMoney(principal);
      const d = parseInt(days, 10);
      const annualRate = getAnnualRate(); // decimal, e.g. 0.12 for 12% a.a.

      // cálculo diário do fator: (1 + taxa anual)^(1/365) - 1
      const dailyRate = Math.pow(1 + annualRate, 1 / 365) - 1;
      // rendimento bruto para d dias
      const grossYield = p * (Math.pow(1 + dailyRate, d) - 1);

      // IOF se aplicável
      const iofFactor = d < 30 && applyIOF ? getIOFFactor(d) : 0;
      const iofTax = grossYield * iofFactor;
      const iofRateAppliedPct = grossYield ? (iofTax / grossYield) * 100 : 0;

      // IR regressivo sobre rendimento após IOF
      const irRate = getIRRate(d);
      const irTax = (grossYield - iofTax) * irRate;
      const irRateAppliedPct = irRate * 100;

      // rendimento líquido e montante final
      const netYield = grossYield - iofTax - irTax;
      const finalAmount = p + netYield;

      // taxas percentuais
      const grossRatePct = (grossYield / p) * 100;
      const netRatePct = (netYield / p) * 100;
      const annualizedNetPct = d > 0 ? (Math.pow(1 + netYield / p, 365 / d) - 1) * 100 : 0;

      const res: CdbResult = {
        grossYield,
        irTax,
        iofTax,
        netYield,
        finalAmount,
        grossRatePct,
        netRatePct,
        annualizedNetPct,
        periodDays: d,
        irRateAppliedPct,
        iofRateAppliedPct,
        ...(titleType === "cdi" && {
          cdiAnnualPct: parseRate(cdiAnnualPct) * 100,
          cdbOverCdiPct: parseMoney(cdbOverCdiPct),
        }),
        ...(titleType === "ipca" && {
          ipcaAnnualPct: parseRate(ipcaAnnualPct) * 100,
          realRatePct: parseRate(realRatePct) * 100,
        }),
        ...(titleType === "prefixado" && {
          fixedRatePct: parseRate(fixedRatePct) * 100,
        }),
      };

      setResult(res);
      setErrors({});
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
    setDays("");
    setCdiAnnualPct(defaultCDI);
    setCdbOverCdiPct("110,00");
    setIpcaAnnualPct(defaultIPCA);
    setRealRatePct(defaultIPCA);
    setFixedRatePct(defaultCDI);
    setApplyIOF(true);
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
        <BreadcrumbItem isLast>CDB</BreadcrumbItem>
      </Breadcrumb>

      <header className="space-y-4 text-center">
        <h1 className="mb-4 text-3xl font-bold text-text-primary md:text-4xl">
          Calculadora de CDB 2025 – Simulador com IR e IOF
        </h1>
        <p className="mx-auto max-w-3xl text-lg text-text-secondary-dark">
          Calcule a <strong className="text-growth-green">rentabilidade líquida do seu CDB</strong>{" "}
          considerando taxa, prazo e indexador. Compare diferentes tipos de CDB e receba{" "}
          <strong className="text-primary-blue-dark">projeções de rendimento</strong> para apoiar
          suas decisões.
        </p>
        <div className="inline-block rounded-lg bg-growth-green-soft p-4 duration-300">
          <p className="text-sm font-medium text-text-primary">
            🔎 <strong>Cálculo Completo</strong> • 📊 <strong>Comparação de CDBs</strong> • ⚙️{" "}
            <strong>Recomendações Personalizadas</strong>
          </p>
        </div>
      </header>

      <Card>
        <CardHeader>
          <CardTitle as="h2">📋 Configure sua Simulação de CDB</CardTitle>
        </CardHeader>
        <CardContent>
          {/* Tipo de Título centralizado */}
          <div className="mb-6 flex flex-wrap justify-center gap-2">
            <div className="inline-flex overflow-hidden rounded-lg border border-neutral-surface-variant">
              <button
                type="button"
                onClick={() => {
                  setTitleType("cdi");
                  setFixType("pos");
                }}
                className={`min-w-[120px] flex-1 basis-0 py-3 text-center text-base font-medium transition ${
                  titleType === "cdi"
                    ? "bg-primary-blue text-white"
                    : "bg-neutral-surface text-text-secondary hover:bg-primary-blue/10"
                }`}
              >
                CDI
              </button>
              <button
                type="button"
                onClick={() => {
                  setTitleType("ipca");
                  setFixType("pos");
                }}
                className={`min-w-[120px] flex-1 basis-0 py-3 text-center text-base font-medium transition ${
                  titleType === "ipca"
                    ? "bg-primary-blue text-white"
                    : "bg-neutral-surface text-text-secondary hover:bg-primary-blue/10"
                }`}
              >
                IPCA+
              </button>
              <button
                type="button"
                onClick={() => {
                  setTitleType("prefixado");
                  setFixType("pre");
                }}
                className={`min-w-[120px] flex-1 basis-0 py-3 text-center text-base font-medium transition ${
                  titleType === "prefixado"
                    ? "bg-primary-blue text-white"
                    : "bg-neutral-surface text-text-secondary hover:bg-primary-blue/10"
                }`}
              >
                Prefixado
              </button>
            </div>
          </div>

          {/* Valor Inicial, % do índice e Prazo */}
          <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-3">
            <div>
              <MoneyInput
                label="Valor Inicial"
                value={principal}
                onChange={setPrincipal}
                placeholder="1.000,00"
                fullWidth
                className="h-12 text-lg"
              />
              <ErrorMessage error={errors.principal} />
            </div>
            <div className="space-y-4">
              {titleType === "cdi" && (
                <>
                  <RateInput
                    label="% do CDI"
                    value={cdbOverCdiPct}
                    onChange={setCdbOverCdiPct}
                    placeholder="110,00"
                    fullWidth
                    className="h-12 text-lg"
                  />
                  <ErrorMessage error={errors.cdbOverCdi} />
                  <RateInput
                    label="CDI (a.a. %)"
                    value={cdiAnnualPct}
                    onChange={setCdiAnnualPct}
                    placeholder="10,50"
                    fullWidth
                    className="mt-2 h-12 text-lg"
                  />
                  <ErrorMessage error={errors.cdi} />
                </>
              )}
              {titleType === "ipca" && (
                <>
                  <RateInput
                    label="% do IPCA"
                    value={ipcaAnnualPct}
                    onChange={setIpcaAnnualPct}
                    placeholder="4,00"
                    fullWidth
                    className="h-12 text-lg"
                  />
                  <ErrorMessage error={errors.ipca} />
                  <RateInput
                    label="Taxa Real (a.a. %)"
                    value={realRatePct}
                    onChange={setRealRatePct}
                    placeholder="6,00"
                    fullWidth
                    className="mt-2 h-12 text-lg"
                  />
                  <ErrorMessage error={errors.realRate} />
                </>
              )}
              {titleType === "prefixado" && (
                <>
                  <RateInput
                    label="Prefixado (a.a. %)"
                    value={fixedRatePct}
                    onChange={setFixedRatePct}
                    placeholder="12,00"
                    fullWidth
                    className="h-12 text-lg"
                  />
                  <ErrorMessage error={errors.fixedRate} />
                </>
              )}
            </div>
            <div>
              <Input
                type="number"
                label="Prazo (dias)"
                value={days}
                onChange={(e) => setDays(e.target.value)}
                placeholder="90"
                fullWidth
                className="h-12 text-lg"
              />
              <ErrorMessage error={errors.days} />
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
              📊 Resultado da Simulação CDB
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-3">
              <div className="rounded-lg bg-gray-900 p-6 text-center">
                <div className="text-4xl font-bold text-growth-green">
                  {currencyBR(result.finalAmount)}
                </div>
                <div className="text-sm text-text-secondary">Montante Final</div>
              </div>
              <div className="rounded-lg bg-gray-900 p-6 text-center">
                <div className="text-2xl font-bold text-primary-blue-dark">
                  {currencyBR(result.netYield)}
                </div>
                <div className="text-sm text-text-secondary">Rendimento Líquido</div>
              </div>
              <div className="rounded-lg bg-gray-900 p-6 text-center">
                <div className="text-2xl font-bold text-system-warning">
                  {percentBR(result.netRatePct)}%
                </div>
                <div className="text-sm text-text-secondary">Taxa Líquida</div>
              </div>
            </div>

            <div className="mb-6 grid grid-cols-1 gap-6 rounded-lg bg-gray-900 p-4 md:grid-cols-3">
              <div className="text-center">
                <div className="text-sm text-text-secondary">IR Aplicado</div>
                <div className="text-xl font-bold text-text-primary">
                  {percentBR(result.irRateAppliedPct, 1)}%
                </div>
                <div className="text-sm text-text-secondary">{currencyBR(result.irTax)}</div>
              </div>
              <div className="text-center">
                <div className="text-sm text-text-secondary">IOF</div>
                <div className="text-xl font-bold text-text-primary">
                  {currencyBR(result.iofTax)}
                </div>
                <div className="text-sm text-text-secondary">
                  {percentBR(result.iofRateAppliedPct, 2)}% do rendimento
                </div>
              </div>
              <div className="text-center">
                <div className="text-sm text-text-secondary">Prazo</div>
                <div className="text-xl font-bold text-text-primary">{result.periodDays} dias</div>
              </div>
            </div>

            {result.periodDays < 30 && result.iofTax > 0 && (
              <div className="mb-6 rounded border border-system-warning/20 bg-system-warning/10 p-3 text-sm text-system-warning">
                ⚠️ IOF aplicado por prazo inferior a 30 dias. Quanto mais próximo de 30 dias, menor
                o IOF incidente.
              </div>
            )}

            <div className="rounded-lg bg-primary-blue-light p-4">
              <h4 className="mb-2 font-semibold text-primary-blue-dark">Resumo Técnico</h4>
              <ul className="space-y-1 text-sm text-text-secondary">
                <li>
                  Rendimento bruto: <strong>{currencyBR(result.grossYield)}</strong>
                </li>
                <li>
                  Impostos: IR <strong>{currencyBR(result.irTax)}</strong> + IOF{" "}
                  <strong>{currencyBR(result.iofTax)}</strong>
                </li>
                <li>
                  Rentabilidade bruta: <strong>{percentBR(result.grossRatePct, 4)}%</strong>
                </li>
                <li>
                  Rentabilidade líquida: <strong>{percentBR(result.netRatePct, 4)}%</strong>
                </li>
                <li>
                  Anualizada (aprox.):{" "}
                  <strong>{percentBR(result.annualizedNetPct, 2)}% a.a.</strong>
                </li>
              </ul>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Seção: Detalhes dos Tipos de CDB - Guia Completo */}
      <Card className="border-l-4 border-primary-blue bg-gradient-to-r from-primary-blue-light to-growth-green-soft duration-300">
        <CardHeader>
          <CardTitle as="h2" className="text-2xl font-bold text-text-primary">
            🎯 Tipos de CDB – Guia Completo 2025
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-8">
            {/* CDB Pós-fixado (CDI) */}
            <div className="rounded-xl border border-primary-blue/20 bg-gray-900 p-6">
              <h3 className="mb-4 flex items-center text-xl font-bold text-primary-blue-dark">
                💧 CDB Pós-fixado (CDI)
              </h3>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <h4 className="mb-3 font-semibold text-growth-green">🔍 O que é?</h4>
                  <p className="mb-4 text-sm text-text-secondary">
                    Título de renda fixa que rende um percentual do CDI diário, refletindo as
                    variações da taxa básica de juros.
                  </p>

                  <h4 className="mb-3 font-semibold text-system-info">📊 Previsibilidade</h4>
                  <ul className="mb-4 space-y-1 text-sm text-text-secondary">
                    <li>• Segue a oscilação diária do CDI</li>
                    <li>• Ideal para reserva de liquidez</li>
                  </ul>
                </div>

                <div>
                  <h4 className="mb-3 font-semibold text-system-success">✅ Vantagens</h4>
                  <ul className="mb-4 space-y-1 text-sm text-text-secondary">
                    <li>• Liquidez diária (na maioria dos títulos)</li>
                    <li>• Baixa complexidade de comparação</li>
                  </ul>

                  <h4 className="mb-3 font-semibold text-system-warning">⚠️ Limitações</h4>
                  <ul className="space-y-1 text-sm text-text-secondary">
                    <li>• Rendimento pode cair se CDI diminuir</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* CDB Prefixado */}
            <div className="rounded-xl border border-growth-green/20 bg-gray-900 p-6">
              <h3 className="mb-4 flex items-center text-xl font-bold text-growth-green">
                🔒 CDB Prefixado
              </h3>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <h4 className="mb-3 font-semibold text-primary-blue-dark">🔍 O que é?</h4>
                  <p className="mb-4 text-sm text-text-secondary">
                    Investimento que paga uma taxa fixa anual acordada no momento da aplicação,
                    independente de variações futuras de juros.
                  </p>

                  <h4 className="mb-3 font-semibold text-system-info">📊 Previsibilidade</h4>
                  <ul className="mb-4 space-y-1 text-sm text-text-secondary">
                    <li>• Taxa definida no início</li>
                    <li>• Ideal para cenários de juros estáveis ou em queda</li>
                  </ul>
                </div>

                <div>
                  <h4 className="mb-3 font-semibold text-system-success">✅ Vantagens</h4>
                  <ul className="mb-4 space-y-1 text-sm text-text-secondary">
                    <li>• Rendimento garantido se mantido até o vencimento</li>
                  </ul>

                  <h4 className="mb-3 font-semibold text-system-warning">⚠️ Limitações</h4>
                  <ul className="space-y-1 text-sm text-text-secondary">
                    <li>• Perde valor se resgatado antes do vencimento</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* CDB IPCA+ (Híbrido) */}
            <div className="rounded-xl border border-system-warning/20 bg-gray-900 p-6">
              <h3 className="mb-4 flex items-center text-xl font-bold text-system-warning">
                🌡️ CDB IPCA+ (Híbrido)
              </h3>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <h4 className="mb-3 font-semibold text-growth-green">🔍 O que é?</h4>
                  <p className="mb-4 text-sm text-text-secondary">
                    Título híbrido que combina variação do IPCA mais uma taxa fixa contratada,
                    protegendo contra a inflação.
                  </p>

                  <h4 className="mb-3 font-semibold text-system-info">📊 Previsibilidade</h4>
                  <ul className="mb-4 space-y-1 text-sm text-text-secondary">
                    <li>• Garante retorno real acima da inflação</li>
                    <li>• Ideal para objetivos de longo prazo</li>
                  </ul>
                </div>

                <div>
                  <h4 className="mb-3 font-semibold text-system-success">✅ Vantagens</h4>
                  <ul className="mb-4 space-y-1 text-sm text-text-secondary">
                    <li>• Proteção contra erosão inflacionária</li>
                  </ul>

                  <h4 className="mb-3 font-semibold text-system-warning">⚠️ Limitações</h4>
                  <ul className="space-y-1 text-sm text-text-secondary">
                    <li>• Rendimento real só confirmado no vencimento</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Seção: Comparação de Tipos de CDB */}
      <Card className="border border-neutral-surface-variant bg-background-dark-secondary duration-300">
        <CardHeader>
          <CardTitle as="h2" className="text-xl font-bold text-text-primary">
            ⚖️ Tabela Comparativa: Qual CDB Escolher?
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="border-b-2 border-neutral-surface-variant">
                  <th className="p-3 text-left font-semibold">Critério</th>
                  <th className="p-3 text-center font-semibold text-primary-blue-dark">
                    CDB Pós-fixado (CDI)
                  </th>
                  <th className="p-3 text-center font-semibold text-growth-green">CDB Prefixado</th>
                  <th className="p-3 text-center font-semibold text-system-warning">
                    CDB IPCA+ (híbrido)
                  </th>
                </tr>
              </thead>
              <tbody className="space-y-2">
                <tr className="border-b border-neutral-surface-variant">
                  <td className="p-3 font-medium">Previsibilidade</td>
                  <td className="p-3 text-center text-primary-blue-dark">Média (acompanha CDI)</td>
                  <td className="p-3 text-center text-growth-green">Alta (taxa fixa)</td>
                  <td className="p-3 text-center text-system-warning">Alta (IPCA + cupom)</td>
                </tr>
                <tr className="border-b border-neutral-surface-variant">
                  <td className="p-3 font-medium">Facilidade de Comparação</td>
                  <td className="p-3 text-center">⭐⭐⭐⭐⭐</td>
                  <td className="p-3 text-center">⭐⭐⭐⭐</td>
                  <td className="p-3 text-center">⭐⭐⭐</td>
                </tr>
                <tr className="border-b border-neutral-surface-variant">
                  <td className="p-3 font-medium">Liquidez</td>
                  <td className="p-3 text-center text-growth-green">Diária comum</td>
                  <td className="p-3 text-center">No vencimento</td>
                  <td className="p-3 text-center">No vencimento</td>
                </tr>
                <tr className="border-b border-neutral-surface-variant">
                  <td className="p-3 font-medium">Tributação</td>
                  <td className="p-3 text-center">IR regressivo + IOF até 30d</td>
                  <td className="p-3 text-center">IR regressivo + IOF até 30d</td>
                  <td className="p-3 text-center">IR regressivo + IOF até 30d</td>
                </tr>
                <tr className="border-b border-neutral-surface-variant">
                  <td className="p-3 font-medium">Indicada para</td>
                  <td className="p-3 text-center">Reserva de curto/médio prazo</td>
                  <td className="p-3 text-center">Travar taxa em queda de juros</td>
                  <td className="p-3 text-center">Proteção contra inflação</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium">Rendimento esperável</td>
                  <td className="p-3 text-center text-primary-blue-dark">CDI x % contratado</td>
                  <td className="p-3 text-center text-growth-green">Taxa fixa anual</td>
                  <td className="p-3 text-center text-system-warning">IPCA + taxa fixa</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className="rounded-lg border border-primary-blue/20 bg-primary-blue-light p-4">
              <h4 className="mb-2 font-bold text-primary-blue-dark">🎯 Iniciantes</h4>
              <p className="text-sm text-text-secondary">
                Comece com o <strong>CDB Pós-fixado (CDI)</strong> pela liquidez diária e facilidade
                de comparação.
              </p>
            </div>

            <div className="rounded-lg border border-growth-green/20 bg-growth-green-soft p-4">
              <h4 className="mb-2 font-bold text-growth-green">🔒 Taxa Fixa</h4>
              <p className="text-sm text-text-secondary">
                Escolha o <strong>CDB Prefixado</strong> para garantir rendimento em cenários de
                queda de juros.
              </p>
            </div>

            <div className="rounded-lg border border-system-warning/20 bg-system-warning/10 p-4">
              <h4 className="mb-2 font-bold text-system-warning">🌡️ Proteção</h4>
              <p className="text-sm text-text-secondary">
                Prefira o <strong>CDB IPCA+</strong> para manter poder de compra no longo prazo.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <FAQ
        title="Perguntas Frequentes - Calculadora de CDB"
        items={[
          {
            question: "O que é um CDB?",
            answer:
              "CDB (Certificado de Depósito Bancário) é um título de renda fixa emitido por bancos que remunera o investidor com base em uma taxa acordada, prefixada, pós-fixada ao CDI ou híbrida (IPCA+).",
            borderColor: "primary-blue",
          },
          {
            question: "Como funciona a tributação?",
            answer:
              "Os rendimentos do CDB são sujeitos a IR regressivo (15% a 22,5%) e IOF se resgatados em até 30 dias. A alíquota de IR diminui conforme o tempo de aplicação: 22,5% (até 6 meses) a 15% (acima de 2 anos).",
            borderColor: "growth-green",
          },
          {
            question: "Posso resgatar antes do vencimento?",
            answer:
              "Depende da liquidez oferecida: muitos CDBs pós-fixados permitem resgate diário, mas prefixados e IPCA+ costumam liberar apenas no vencimento. Resgates antecipados podem sofrer marcação a mercado.",
            borderColor: "system-info",
          },
          {
            question: "Qual é o prazo ideal para investir?",
            answer:
              "Para liquidez rápida, escolha CDBs com liquidez diária. Para travar taxa, prefira prefixados de médio prazo (1–2 anos). Para proteger contra inflação, opte por IPCA+ no longo prazo (3+ anos).",
            borderColor: "system-warning",
          },
          {
            question: "CDB tem garantia do FGC?",
            answer:
              "Sim. O FGC cobre até R$ 250.000 por CPF e por instituição (limite global de R$ 1 milhão a cada 4 anos), garantindo o valor aplicado e os rendimentos contratados.",
            borderColor: "growth-green",
          },
          {
            question: "Como escolher entre pós-fixado, prefixado e IPCA+?",
            answer:
              "Combine seu objetivo (liquidez, travar taxa ou proteger contra inflação) com o cenário de juros. Pós-fixados são melhores para curto prazo, prefixados em queda de juros, e IPCA+ para metas reais de longo prazo.",
            borderColor: "system-error-dark",
          },
        ]}
        tipSection={{
          title: "Dica Importante sobre CDB",
          content:
            "<strong>Para a melhor escolha:</strong> avalie taxa, prazo e liquidez juntos. CDB Pós-fixado para reserva de emergência, Prefixado para travar rendimento e IPCA+ para proteção inflacionária.",
        }}
        footerText="<strong>Lembre-se:</strong> Diversifique entre bancos e prazos, fique atento ao FGC e alinhe o CDB ao seu objetivo financeiro."
      />

      {/* Footer com informações adicionais */}
      <Card className="border-l-4 border-primary-blue bg-primary-blue-light duration-300">
        <CardHeader>
          <CardTitle as="h2" className="text-lg font-bold text-text-primary">
            📚 Como Usar Esta Calculadora de CDB
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 text-sm text-text-secondary">
            <p>
              Esta <strong className="text-primary-blue-dark">calculadora de CDB</strong> utiliza{" "}
              <strong className="text-growth-green">simulações financeiras</strong> para estimar a
              rentabilidade líquida de diferentes tipos de CDB. Os cálculos consideram CDI, taxas
              prefixadas, IPCA e tributação aplicável.
            </p>
            <p>
              <strong>Métodos disponíveis:</strong> CDB Pós-fixado (CDI), CDB Prefixado e CDB IPCA+
              (híbrido). Cada tipo atende a objetivos e horizontes de investimento distintos.
            </p>
            <p>
              <strong className="text-system-warning">Importante:</strong> Esta ferramenta é para
              fins educacionais e de planejamento pessoal. Para decisões de investimento, consulte
              sempre um <strong>assessor de investimentos ou profissional qualificado</strong> e
              reveja as condições do emissor.
            </p>
            <p className="mt-4 border-t border-primary-blue/20 pt-3 text-xs opacity-75">
              🔎 Foco didático • 💰 Simulações realistas • 🔒 Dados não armazenados • 📱 Compatível
              com todos os dispositivos • 🌙 Suporte a modo escuro
            </p>
          </div>
        </CardContent>
      </Card>

      <RelatedCalculators category="financas" currentCalculatorId="cdb" />
    </div>
  );
}
