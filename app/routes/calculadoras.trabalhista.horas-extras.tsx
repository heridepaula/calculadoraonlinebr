import type { MetaFunction } from "@remix-run/node";
import { useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  MoneyInput,
  Input,
  Button,
  Breadcrumb,
  BreadcrumbItem,
  Select,
} from "~/components/ui";
import { RelatedCalculators, FAQ } from "~/components";
import { APP_NAME } from "~/lib/constants";
import { useAutoCalculatorTracking, useFormTracking } from "~/hooks/useAutoCalculatorTracking";

export const meta: MetaFunction = () => {
  return [
    { title: `Calculadora de Horas Extras CLT 2026 | ${APP_NAME}` },
    {
      name: "description",
      content:
        "Calcule horas extras CLT 2026: adicional 50% dias úteis, 100% domingos/feriados, 20% noturno. Resultado instantâneo e educativo.",
    },
    {
      name: "keywords",
      content:
        "calculadora horas extras, CLT Art 59, adicional 50% 100%, hora extra noturna, trabalhista",
    },
    {
      tagName: "link",
      rel: "canonical",
      href: "https://www.calculadoraonlinebr.com.br/calculadoras/trabalhista/horas-extras",
    },
    { name: "author", content: "CalculadoraOnlineBR" },
    {
      name: "robots",
      content: "index,follow,max-snippet:-1,max-image-preview:large,max-video-preview:-1",
    },
    { name: "viewport", content: "width=device-width, initial-scale=1" },
    { name: "googlebot", content: "index,follow" },
    { name: "bingbot", content: "index,follow" },
    {
      property: "og:title",
      content: `Calculadora de Horas Extras CLT 2026 - Adicional 50% e 100% - ${APP_NAME}`,
    },
    {
      property: "og:description",
      content:
        "Calcule suas horas extras conforme CLT: 50% dia útil, 100% domingo/feriado, 20% adicional noturno. Com base na legislação trabalhista!",
    },
    { property: "og:type", content: "website" },
    {
      property: "og:url",
      content: "https://www.calculadoraonlinebr.com.br/calculadoras/trabalhista/horas-extras",
    },
    { property: "og:site_name", content: APP_NAME },
    { property: "og:locale", content: "pt_BR" },
    {
      property: "og:image",
      content: "https://www.calculadoraonlinebr.com.br/images/calculadora-horas-extras-clt.webp",
    },
    {
      property: "og:image:alt",
      content:
        "Calculadora de Horas Extras CLT - Interface mostrando cálculo de adicional 50% e 100%",
    },
    { property: "og:image:width", content: "1200" },
    { property: "og:image:height", content: "630" },
    { name: "twitter:card", content: "summary_large_image" },
    {
      name: "twitter:title",
      content: `Calculadora Horas Extras CLT - Art. 59 - Adicional 50% 100% - ${APP_NAME}`,
    },
    {
      name: "twitter:description",
      content:
        "Ferramenta completa para calcular horas extras: CLT Art. 59, adicional 50% dia útil, 100% domingo/feriado, 20% noturno.",
    },
    { name: "twitter:creator", content: "@CalculadoraBR" },
    {
      name: "twitter:image",
      content: "https://www.calculadoraonlinebr.com.br/images/calculadora-horas-extras-clt.webp",
    },
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
        name: "Calculadora de Horas Extras CLT 2026 - Art. 59",
        description:
          "Calculadora gratuita de horas extras conforme CLT: adicional 50% dia útil, 100% domingo/feriado, 20% noturno. Base legal Art. 59.",
        url: "https://www.calculadoraonlinebr.com.br/calculadoras/trabalhista/horas-extras",
        applicationCategory: "BusinessApplication",
        operatingSystem: "Web Browser",
        isAccessibleForFree: true,
        inLanguage: "pt-BR",
        datePublished: "2025-09-14",
        dateModified: "2025-09-14",
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
          "@id": "https://www.calculadoraonlinebr.com.br/calculadoras/trabalhista/horas-extras",
          name: "Calculadora de Horas Extras CLT 2026 - Art. 59",
          description:
            "Calcule horas extras CLT 2026: adicional 50% dias úteis, 100% domingos/feriados, 20% noturno. Resultado instantâneo e educativo.",
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
                name: "Trabalhista",
                item: "https://www.calculadoraonlinebr.com.br/calculadoras/trabalhista",
              },
              {
                "@type": "ListItem",
                position: 4,
                name: "Horas Extras",
                item: "https://www.calculadoraonlinebr.com.br/calculadoras/trabalhista/horas-extras",
              },
            ],
          },
        },
        about: {
          "@type": "Service",
          name: "Cálculo de Horas Extras CLT",
          description: "Cálculo de horas extras conforme CLT Art. 59 com adicionais legais",
          category: "LaborCalculation",
        },
        featureList: [
          "Cálculo conforme CLT Art. 59",
          "Adicional 50% dias úteis",
          "Adicional 100% domingos/feriados",
          "Adicional noturno 20%",
          "Cálculo do valor da hora normal",
          "Interface móvel responsiva",
          "Resultados em tempo real",
          "Base legal detalhada",
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
            name: "Como calcular horas extras conforme CLT?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Art. 59 CLT: hora normal × (1 + 50%) dia útil, × (1 + 100%) domingo/feriado. Hora normal = salário ÷ (jornada semanal × 4,33).",
            },
          },
          {
            "@type": "Question",
            name: "Qual adicional de horas extras em domingo?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Domingo e feriados: adicional de 100% (hora dobrada) conforme CLT Art. 59, §1º. Valor = hora normal × 2.",
            },
          },
          {
            "@type": "Question",
            name: "Como funciona o adicional noturno nas horas extras?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "CLT Art. 73: adicional noturno 20% é cumulativo com horas extras. Exemplo: 50% + 20% = 70% total sobre hora normal.",
            },
          },
        ],
      }),
    },
  ];
};

// Tipos para o cálculo de horas extras
interface OvertimeEntry {
  id: string;
  type: "weekday" | "sunday" | "holiday";
  hours: number;
  isNightShift: boolean;
}

interface OvertimeResult {
  normalHour: number;
  totalEarnings: number;
  totalOvertimeEarnings: number;
  entries: Array<{
    type: string;
    hours: number;
    isNightShift: boolean;
    hourValue: number;
    earnings: number;
    additionalPercentage: number;
  }>;
  calculationDetails: {
    baseSalary: number;
    monthlyHours: number;
    totalOvertimeHours: number;
  };
  recommendations: string[];
}

export default function OvertimeCalculator() {
  const [result, setResult] = useState<OvertimeResult | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);

  // Estados do formulário
  const [monthlySalary, setMonthlySalary] = useState("");
  const [weeklyHours, setWeeklyHours] = useState("44");
  const [overtimeEntries, setOvertimeEntries] = useState<OvertimeEntry[]>([]);

  // Estados para adicionar nova entrada
  const [newEntryType, setNewEntryType] = useState<"weekday" | "sunday" | "holiday">("weekday");
  const [newEntryHours, setNewEntryHours] = useState("");
  const [newEntryIsNightShift, setNewEntryIsNightShift] = useState(false);

  // Global Analytics Tracking
  const { startCalculation, endCalculation } = useAutoCalculatorTracking({
    calculatorType: "horas_extras",
    category: "trabalhista",
  });

  const { trackInputChange, trackFormSubmission } = useFormTracking("horas_extras");

  // Função para processar valor monetário
  const parseMoneyValue = (value: string | number | undefined): number => {
    if (!value && value !== 0) {
      return 0;
    }

    if (typeof value === "number") {
      return value;
    }

    const stringValue = String(value);
    const cleanValue = stringValue.replace(/[^\d,.]/g, "");

    if (!cleanValue) {
      return 0;
    }

    if (cleanValue.includes(",")) {
      return parseFloat(cleanValue.replace(/\./g, "").replace(",", ".")) || 0;
    }

    return parseFloat(cleanValue) || 0;
  };

  // Função para adicionar nova entrada de horas extras
  const addOvertimeEntry = () => {
    const hoursNum = parseFloat(newEntryHours) || 0;
    if (hoursNum <= 0) return;

    const newEntry: OvertimeEntry = {
      id: Date.now().toString(),
      type: newEntryType,
      hours: hoursNum,
      isNightShift: newEntryIsNightShift,
    };

    setOvertimeEntries((prev) => [...prev, newEntry]);

    // Reset form
    setNewEntryHours("");
    setNewEntryIsNightShift(false);
  };

  // Função para remover entrada
  const removeOvertimeEntry = (id: string) => {
    setOvertimeEntries((prev) => prev.filter((entry) => entry.id !== id));
  };

  // Função de cálculo (apenas quando botão é clicado)
  const handleCalculate = () => {
    try {
      const salaryNum = parseMoneyValue(monthlySalary);
      const weeklyHoursNum = parseFloat(weeklyHours) || 44;

      if (salaryNum > 0 && overtimeEntries.length > 0) {
        setIsCalculating(true);
        startCalculation();

        // Cálculo da hora normal
        const monthlyHours = weeklyHoursNum * 4.33; // Constante CLT para conversão mensal
        const normalHourValue = salaryNum / monthlyHours;

        // Processa cada entrada de horas extras
        const processedEntries = overtimeEntries.map((entry) => {
          let additionalPercentage = 0;
          let typeDescription = "";

          switch (entry.type) {
            case "weekday":
              additionalPercentage = 0.5; // 50%
              typeDescription = "Dia útil";
              break;
            case "sunday":
              additionalPercentage = 1.0; // 100%
              typeDescription = "Domingo";
              break;
            case "holiday":
              additionalPercentage = 1.0; // 100%
              typeDescription = "Feriado";
              break;
          }

          // Adicional noturno (cumulativo)
          if (entry.isNightShift) {
            additionalPercentage += 0.2; // +20% adicional noturno
            typeDescription += " + Noturno";
          }

          // Valor da hora extra
          const hourValue = normalHourValue * (1 + additionalPercentage);
          const earnings = hourValue * entry.hours;

          return {
            type: typeDescription,
            hours: entry.hours,
            isNightShift: entry.isNightShift,
            hourValue,
            earnings,
            additionalPercentage: additionalPercentage * 100,
          };
        });

        // Totais
        const totalOvertimeEarnings = processedEntries.reduce(
          (sum, entry) => sum + entry.earnings,
          0
        );
        const totalOvertimeHours = overtimeEntries.reduce((sum, entry) => sum + entry.hours, 0);
        const totalEarnings = salaryNum + totalOvertimeEarnings;

        // Recomendações
        const recommendations: string[] = [];

        const maxHoursInDay = Math.max(...overtimeEntries.map((e) => e.hours));
        if (maxHoursInDay > 2) {
          recommendations.push("CLT limita máximo 2 horas extras diárias, salvo acordo coletivo");
        }

        if (totalOvertimeHours > 10) {
          recommendations.push("Considere banco de horas para compensação em até 6 meses");
        }

        recommendations.push("Registre todas as horas extras em controle de ponto");
        recommendations.push("Horas extras integram base de cálculo para 13º salário e férias");

        const calculationResult: OvertimeResult = {
          normalHour: normalHourValue,
          totalEarnings,
          totalOvertimeEarnings,
          entries: processedEntries,
          calculationDetails: {
            baseSalary: salaryNum,
            monthlyHours,
            totalOvertimeHours,
          },
          recommendations,
        };

        setResult(calculationResult);
        endCalculation();
        trackFormSubmission();
        setTimeout(() => setIsCalculating(false), 100);
      }
    } catch (error) {
      console.error("Erro no cálculo de horas extras:", error);
      setResult(null);
      setIsCalculating(false);
    }
  };

  const handleReset = () => {
    setMonthlySalary("0");
    setWeeklyHours("44");
    setOvertimeEntries([]);
    setNewEntryType("weekday");
    setNewEntryHours("");
    setNewEntryIsNightShift(false);
    setResult(null);
  };

  // Função para obter tipos disponíveis
  const getAvailableTypes = () => {
    const allTypes = [
      { value: "weekday", label: "Dia útil (+50%)", nightLabel: "Dia útil noturno (+70%)" },
      { value: "sunday", label: "Domingo (+100%)", nightLabel: "Domingo noturno (+120%)" },
      { value: "holiday", label: "Feriado (+100%)", nightLabel: "Feriado noturno (+120%)" },
    ];

    return allTypes;
  };

  const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);
  };

  const formatHours = (value: number): string => {
    return `${value.toFixed(2)}h`;
  };

  return (
    <div className="mx-auto max-w-2xl space-y-8 px-4 py-8 md:max-w-4xl lg:max-w-6xl">
      <Breadcrumb>
        <BreadcrumbItem href="/">Início</BreadcrumbItem>
        <BreadcrumbItem href="/calculadoras">Calculadoras</BreadcrumbItem>
        <BreadcrumbItem href="/calculadoras/trabalhista">Trabalhista</BreadcrumbItem>
        <BreadcrumbItem>Horas Extras</BreadcrumbItem>
      </Breadcrumb>

      <div className="flex flex-col items-center space-y-8">
        <header className="space-y-4 text-center">
          <h1 className="mb-4 text-3xl font-bold text-text-primary md:text-4xl">
            ⏰ Calculadora de Horas Extras CLT 2026
          </h1>
          <p className="mx-auto max-w-3xl text-lg text-text-secondary-dark">
            Calcule suas <strong className="text-growth-green">horas extras</strong> conforme a{" "}
            <strong className="text-primary-blue-dark">CLT Art. 59</strong>: adicional de{" "}
            <strong className="text-system-warning">50% dia útil, 100% domingo/feriado</strong> e{" "}
            <strong className="text-system-info">20% adicional noturno</strong>.{" "}
            <strong className="text-system-success">Base legal garantida</strong>!
          </p>
          <div className="inline-block rounded-lg bg-gradient-to-r from-growth-green-soft via-primary-blue-light to-system-warning/20 p-4">
            <p className="text-sm font-medium text-text-primary">
              📋 <strong>CLT Art. 59</strong> • ⏰ <strong>50% + 100%</strong> • 🌙{" "}
              <strong>Adicional Noturno</strong> • ⚡ <strong>Cálculo Instantâneo</strong>
            </p>
          </div>
        </header>

        {/* Formulário */}
        <Card className="w-full">
          <CardHeader>
            <CardTitle as="h2">Dados para Cálculo de Horas Extras</CardTitle>
          </CardHeader>
          <CardContent>
            <form className="space-y-6">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <MoneyInput
                  label="Salário Mensal"
                  value={monthlySalary}
                  onChange={setMonthlySalary}
                  placeholder="R$ 2.200,00"
                  required
                  fullWidth
                />

                <Input
                  type="number"
                  label="Jornada Semanal (horas)"
                  value={weeklyHours}
                  onChange={(e) => setWeeklyHours(e.target.value)}
                  placeholder="44"
                  min="1"
                  max="48"
                  help="Máximo legal: 44h semanais"
                  fullWidth
                />
              </div>

              {/* Adicionar Nova Entrada de Horas Extras */}
              <div className="space-y-4">
                <h4 className="font-semibold text-text-primary">➕ Adicionar Horas Extras</h4>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <Input
                    type="number"
                    label="Horas"
                    value={newEntryHours}
                    onChange={(e) => setNewEntryHours(e.target.value)}
                    placeholder="2"
                    min="0.5"
                    step="0.5"
                    help="Max: 2h/dia"
                    fullWidth
                  />

                  <Select
                    label="Tipo"
                    value={`${newEntryType}-${newEntryIsNightShift ? "night" : "day"}`}
                    onChange={(value) => {
                      const [type, period] = value.split("-");
                      setNewEntryType(type as "weekday" | "sunday" | "holiday");
                      setNewEntryIsNightShift(period === "night");
                    }}
                    options={[
                      { value: "weekday-day", label: "Dia útil (+50%)" },
                      { value: "weekday-night", label: "Dia útil noturno (+70%)" },
                      { value: "sunday-day", label: "Domingo (+100%)" },
                      { value: "sunday-night", label: "Domingo noturno (+120%)" },
                      { value: "holiday-day", label: "Feriado (+100%)" },
                      { value: "holiday-night", label: "Feriado noturno (+120%)" },
                    ]}
                    fullWidth
                  />
                </div>

                <div className="rounded-lg border border-primary-blue/30 bg-primary-blue/15 p-4">
                  <div className="text-sm text-text-primary">
                    <span className="font-bold text-primary-blue-dark">🌙 Adicional Noturno:</span>{" "}
                    Trabalho realizado entre <strong>22h e 5h</strong> recebe adicional de{" "}
                    <strong>20%</strong> que se acumula com o adicional de horas extras{" "}
                    <strong>(CLT Art. 73)</strong>.
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button
                    type="button"
                    onClick={addOvertimeEntry}
                    className="px-6"
                    disabled={parseFloat(newEntryHours) <= 0}
                  >
                    Adicionar
                  </Button>
                </div>
              </div>

              {/* Lista de Horas Extras Adicionadas */}
              {overtimeEntries.length > 0 && (
                <div className="via-growth-green/8 rounded-lg border-2 border-growth-green/40 bg-gradient-to-br from-growth-green/15 to-white/20 p-6 shadow-sm">
                  <h4 className="mb-6 flex items-center gap-3 text-lg font-bold text-growth-green-dark">
                    <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-growth-green text-sm font-bold text-white">
                      📋
                    </span>
                    Horas Extras Adicionadas
                    <span className="ml-auto inline-flex h-6 w-6 items-center justify-center rounded-full bg-growth-green/20 text-xs font-bold text-growth-green-dark">
                      {overtimeEntries.length}
                    </span>
                  </h4>

                  <div className="space-y-4">
                    {overtimeEntries.map((entry) => {
                      const typeLabels = {
                        weekday: entry.isNightShift ? "Dia útil noturno (+70%)" : "Dia útil (+50%)",
                        sunday: entry.isNightShift ? "Domingo noturno (+120%)" : "Domingo (+100%)",
                        holiday: entry.isNightShift ? "Feriado noturno (+120%)" : "Feriado (+100%)",
                      };

                      const typeIcons = {
                        weekday: entry.isNightShift ? "🌙" : "📅",
                        sunday: entry.isNightShift ? "🌙" : "🔴",
                        holiday: entry.isNightShift ? "🌙" : "🎉",
                      };

                      return (
                        <div
                          key={entry.id}
                          className="flex items-center justify-between rounded-lg border border-growth-green/30 bg-background-dark-secondary/90 p-4 shadow-sm transition-all duration-200 hover:shadow-md"
                        >
                          <div className="flex items-center space-x-4">
                            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-growth-green/25 text-lg font-bold text-growth-green">
                              {typeIcons[entry.type]}
                            </div>
                            <div>
                              <div className="text-lg font-bold text-text-primary-dark">
                                {entry.hours}h
                              </div>
                              <div className="text-sm font-semibold text-text-primary">
                                {typeLabels[entry.type]}
                              </div>
                            </div>
                          </div>
                          <Button
                            type="button"
                            onClick={() => removeOvertimeEntry(entry.id)}
                            variant="outline"
                            className="border-2 border-system-error bg-system-error/10 font-semibold text-system-error-dark transition-all duration-200 hover:bg-system-error hover:text-white hover:shadow-md"
                            size="sm"
                          >
                            🗑️ Remover
                          </Button>
                        </div>
                      );
                    })}
                  </div>

                  <div className="mt-4 rounded-lg border border-growth-green/30 bg-growth-green/10 p-3">
                    <div className="flex items-center gap-2 text-sm font-medium text-growth-green-dark">
                      ✅ <strong>Total:</strong>{" "}
                      {overtimeEntries.reduce((sum, entry) => sum + entry.hours, 0).toFixed(1)}h em{" "}
                      {overtimeEntries.length} {overtimeEntries.length === 1 ? "tipo" : "tipos"}{" "}
                      diferentes
                    </div>
                  </div>
                </div>
              )}

              <div className="flex justify-center gap-4">
                <Button
                  type="button"
                  onClick={handleCalculate}
                  className="px-8"
                  disabled={
                    isCalculating ||
                    parseMoneyValue(monthlySalary) === 0 ||
                    overtimeEntries.length === 0
                  }
                >
                  {isCalculating ? "Calculando..." : "Calcular"}
                </Button>
                <Button
                  type="button"
                  onClick={handleReset}
                  variant="outline"
                  className="border-system-error px-8 text-system-error hover:bg-system-error hover:text-white"
                >
                  Limpar
                </Button>
              </div>

              {/* Informações Legais */}
              <div className="mt-4 rounded-lg border border-system-info/20 bg-system-info/10 p-4">
                <h4 className="mb-2 font-semibold text-system-info">📋 Base Legal - CLT</h4>
                <div className="space-y-1 text-sm text-text-secondary">
                  <p>
                    • <strong>Art. 59:</strong> Adicional mínimo 50% sobre hora normal
                  </p>
                  <p>
                    • <strong>Art. 59, §1º:</strong> Domingos e feriados: adicional 100%
                  </p>
                  <p>
                    • <strong>Art. 73:</strong> Trabalho noturno: adicional 20% (cumulativo)
                  </p>
                  <p>
                    • <strong>Art. 58:</strong> Jornada máxima: 8h diárias, 44h semanais
                  </p>
                </div>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Resultado */}
        {result && (
          <Card className="w-full">
            <CardHeader>
              <CardTitle as="h2">Resultado do Cálculo</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* Valor Principal */}
                <div className="rounded-lg bg-gradient-to-r from-growth-green-soft to-primary-blue-light p-6 text-center">
                  <div className="mb-2 text-3xl font-bold text-growth-green">
                    {formatCurrency(result.totalOvertimeEarnings)}
                  </div>
                  <div className="text-sm text-text-secondary">Total das Horas Extras</div>
                  <div className="mt-1 text-xs text-text-secondary">
                    {result.calculationDetails.totalOvertimeHours} horas em {result.entries.length}{" "}
                    {result.entries.length === 1 ? "tipo" : "tipos"} diferentes
                  </div>
                </div>

                {/* Resumo dos Valores */}
                <div className="grid grid-cols-1 gap-4 text-sm md:grid-cols-3">
                  <div className="text-center">
                    <div className="text-text-secondary">Hora Normal</div>
                    <div className="font-semibold text-text-primary">
                      {formatCurrency(result.normalHour)}
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-text-secondary">Salário Base</div>
                    <div className="font-semibold text-primary-blue">
                      {formatCurrency(result.calculationDetails.baseSalary)}
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-text-secondary">Salário + Extras</div>
                    <div className="font-semibold text-growth-green">
                      {formatCurrency(result.totalEarnings)}
                    </div>
                  </div>
                </div>

                {/* Detalhamento por Tipo */}
                <div className="space-y-3">
                  <h4 className="font-semibold text-text-primary">
                    Detalhamento por Tipo de Hora Extra:
                  </h4>

                  {result.entries.map((entry, index) => (
                    <div key={index} className="rounded bg-neutral-surface/30 p-4">
                      <div className="grid grid-cols-1 gap-3 text-sm md:grid-cols-4">
                        <div>
                          <div className="text-text-secondary">Tipo:</div>
                          <div className="font-medium">{entry.type}</div>
                        </div>
                        <div>
                          <div className="text-text-secondary">Horas:</div>
                          <div className="font-medium">{formatHours(entry.hours)}</div>
                        </div>
                        <div>
                          <div className="text-text-secondary">Valor/Hora:</div>
                          <div className="font-medium">{formatCurrency(entry.hourValue)}</div>
                          <div className="text-xs text-text-secondary">
                            +{entry.additionalPercentage.toFixed(0)}%
                          </div>
                        </div>
                        <div>
                          <div className="text-text-secondary">Total:</div>
                          <div className="font-medium text-growth-green">
                            {formatCurrency(entry.earnings)}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}

                  {/* Resumo Geral */}
                  <div className="rounded border border-primary-blue/20 bg-primary-blue/10 p-4">
                    <h5 className="mb-2 font-semibold text-primary-blue">🔬 Resumo do Cálculo:</h5>
                    <div className="space-y-1 text-sm text-text-secondary">
                      <div>
                        <strong>1. Hora normal:</strong>{" "}
                        {formatCurrency(result.calculationDetails.baseSalary)} ÷{" "}
                        {formatHours(result.calculationDetails.monthlyHours)} ={" "}
                        {formatCurrency(result.normalHour)}
                      </div>
                      {result.entries.map((entry, index) => (
                        <div key={index}>
                          <strong>
                            {index + 2}. {entry.type}:
                          </strong>{" "}
                          {formatCurrency(result.normalHour)} ×{" "}
                          {(entry.additionalPercentage / 100 + 1).toFixed(2)} × {entry.hours}h ={" "}
                          {formatCurrency(entry.earnings)}
                        </div>
                      ))}
                      <div className="mt-2 border-t border-primary-blue/20 pt-2">
                        <strong>Total das horas extras:</strong>{" "}
                        <span className="font-semibold text-growth-green">
                          {formatCurrency(result.totalOvertimeEarnings)}
                        </span>
                      </div>
                      <div>
                        <strong>Salário final:</strong>{" "}
                        <span className="font-semibold text-growth-green">
                          {formatCurrency(result.totalEarnings)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Recomendações */}
                {result.recommendations.length > 0 && (
                  <div className="rounded-lg border border-system-warning/20 bg-system-warning/10 p-4">
                    <h4 className="mb-2 font-semibold text-system-warning">
                      💡 Informações Importantes:
                    </h4>
                    <ul className="space-y-1 text-sm text-text-secondary">
                      {result.recommendations.map((recommendation, index) => (
                        <li key={index}>• {recommendation}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Conteúdo Educacional */}
        <Card className="w-full">
          <CardHeader>
            <CardTitle as="h2">📚 Como Calcular Horas Extras na CLT</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                {/* Passo a Passo */}
                <div>
                  <h3 className="mb-3 font-bold text-primary-blue-dark">
                    📝 Passo a Passo do Cálculo
                  </h3>
                  <div className="space-y-3">
                    <div className="rounded-lg bg-primary-blue-light p-3">
                      <h4 className="mb-2 font-semibold text-primary-blue-dark">
                        1. Calcule a Hora Normal:
                      </h4>
                      <div className="space-y-1 text-sm text-text-secondary">
                        <div>
                          <strong>Fórmula:</strong> Salário ÷ Total horas mensais
                        </div>
                        <div>
                          <strong>Horas mensais:</strong> Jornada semanal × 4,33
                        </div>
                        <div>
                          <strong>Exemplo:</strong> R$ 2.200 ÷ 190,52h = R$ 11,55/h
                        </div>
                      </div>
                    </div>
                    <div className="rounded-lg bg-growth-green-soft p-3">
                      <h4 className="mb-2 font-semibold text-growth-green">
                        2. Identifique o Adicional:
                      </h4>
                      <div className="space-y-1 text-sm text-text-secondary">
                        <div>
                          <strong>Dia útil:</strong> +50% (mínimo legal)
                        </div>
                        <div>
                          <strong>Domingo/Feriado:</strong> +100%
                        </div>
                        <div>
                          <strong>Noturno (22h-5h):</strong> +20% cumulativo
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Tipos de Adicional */}
                <div>
                  <h3 className="mb-3 font-bold text-growth-green">
                    🎯 Tipos de Adicional de Horas Extras
                  </h3>
                  <div className="space-y-3">
                    <div className="rounded-lg bg-system-warning/10 p-3">
                      <h4 className="mb-2 font-semibold text-system-warning">
                        📅 Por Dia da Semana:
                      </h4>
                      <div className="space-y-1 text-sm text-text-secondary">
                        <div>
                          <strong>Segunda a Sábado:</strong> Adicional 50%
                        </div>
                        <div>
                          <strong>Domingo:</strong> Adicional 100% (dobrada)
                        </div>
                        <div>
                          <strong>Feriado:</strong> Adicional 100% (dobrada)
                        </div>
                      </div>
                    </div>
                    <div className="rounded-lg bg-system-info/10 p-3">
                      <h4 className="mb-2 font-semibold text-system-info">🌙 Adicional Noturno:</h4>
                      <div className="space-y-1 text-sm text-text-secondary">
                        <div>
                          <strong>Horário:</strong> 22h às 5h
                        </div>
                        <div>
                          <strong>Adicional:</strong> +20% sobre hora normal
                        </div>
                        <div>
                          <strong>Acumula:</strong> Com adicional de horas extras
                        </div>
                        <div>
                          <strong>Ex:</strong> Domingo noturno = 100% + 20% = 120%
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Limites Legais */}
              <div className="rounded-lg border border-system-error/20 bg-system-error/10 p-4">
                <h3 className="mb-3 font-bold text-system-error">
                  ⚠️ Limites Legais e Compensações
                </h3>
                <div className="grid grid-cols-1 gap-4 text-sm md:grid-cols-2">
                  <div>
                    <h4 className="mb-2 font-semibold text-system-error-dark">📏 Limites:</h4>
                    <ul className="space-y-1 text-text-secondary">
                      <li>
                        • <strong>Máximo diário:</strong> 2 horas extras
                      </li>
                      <li>
                        • <strong>Acordo coletivo:</strong> Pode alterar limite
                      </li>
                      <li>
                        • <strong>Jornada total:</strong> Máximo 10h/dia
                      </li>
                      <li>
                        • <strong>Descanso:</strong> 11h entre jornadas
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="mb-2 font-semibold text-system-error-dark">
                      🔄 Banco de Horas:
                    </h4>
                    <ul className="space-y-1 text-text-secondary">
                      <li>
                        • <strong>Compensação:</strong> Até 6 meses
                      </li>
                      <li>
                        • <strong>Acordo:</strong> Individual ou coletivo
                      </li>
                      <li>
                        • <strong>Não compensado:</strong> Pago como extra
                      </li>
                      <li>
                        • <strong>Base legal:</strong> CLT Art. 59, §5º e 6º
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Exemplo Prático */}
              <div className="rounded-lg border border-primary-blue/20 bg-gradient-to-r from-primary-blue/10 to-growth-green/10 p-4">
                <h3 className="mb-3 font-bold text-primary-blue-dark">
                  🧮 Exemplo Prático Completo
                </h3>
                <div className="space-y-3 text-sm text-text-secondary">
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div>
                      <h4 className="mb-2 font-semibold text-growth-green">Dados:</h4>
                      <ul className="space-y-1">
                        <li>
                          • <strong>Salário:</strong> R$ 2.200,00/mês
                        </li>
                        <li>
                          • <strong>Jornada:</strong> 44h/semana
                        </li>
                        <li>
                          • <strong>Horas extras:</strong> 10h domingo
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="mb-2 font-semibold text-system-info">Cálculo:</h4>
                      <ul className="space-y-1">
                        <li>
                          • <strong>Horas mensais:</strong> 44 × 4,33 = 190,52h
                        </li>
                        <li>
                          • <strong>Hora normal:</strong> R$ 2.200 ÷ 190,52 = R$ 11,55
                        </li>
                        <li>
                          • <strong>Hora extra domingo:</strong> R$ 11,55 × 2 = R$ 23,10
                        </li>
                        <li>
                          • <strong>Total 10h:</strong> R$ 23,10 × 10 ={" "}
                          <strong className="text-growth-green">R$ 231,00</strong>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* Impacto em Outros Direitos */}
              <div className="rounded-lg border border-growth-green/20 bg-growth-green/10 p-4">
                <h3 className="mb-3 font-bold text-growth-green">
                  💰 Impacto das Horas Extras em Outros Direitos
                </h3>
                <div className="grid grid-cols-1 gap-4 text-sm md:grid-cols-2">
                  <div>
                    <h4 className="mb-2 font-semibold text-growth-green">✅ Integra na Base:</h4>
                    <ul className="space-y-1 text-text-secondary">
                      <li>
                        • <strong>13º salário:</strong> Média das horas extras
                      </li>
                      <li>
                        • <strong>Férias + 1/3:</strong> Reflexo proporcional
                      </li>
                      <li>
                        • <strong>FGTS:</strong> Sobre valor das extras
                      </li>
                      <li>
                        • <strong>Rescisão:</strong> Impacta aviso prévio
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="mb-2 font-semibold text-system-info">
                      📋 Registros Obrigatórios:
                    </h4>
                    <ul className="space-y-1 text-text-secondary">
                      <li>
                        • <strong>Controle de ponto:</strong> Entrada/saída
                      </li>
                      <li>
                        • <strong>Autorização:</strong> Prévia do empregador
                      </li>
                      <li>
                        • <strong>Justificativa:</strong> Necessidade do serviço
                      </li>
                      <li>
                        • <strong>Pagamento:</strong> Junto com salário mensal
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <FAQ
          title="Perguntas Frequentes - Calculadora de Horas Extras"
          items={[
            {
              question: "Como calcular horas extras conforme CLT Art. 59?",
              answer:
                "<strong>Fórmula CLT:</strong> Hora extra = Hora normal × (1 + adicional). <strong>Hora normal = Salário ÷ (Jornada semanal × 4,33)</strong>. Adicionais: 50% dia útil, 100% domingo/feriado, +20% noturno cumulativo.",
              borderColor: "primary-blue",
            },
            {
              question: "Qual o adicional de horas extras em domingo e feriado?",
              answer:
                "Domingo e feriados têm <strong>adicional de 100%</strong> (hora dobrada) conforme CLT Art. 59, §1º. <strong>Exemplo:</strong> hora normal R$ 10,00 → hora extra domingo R$ 20,00. É obrigatório por lei, não depende de acordo.",
              borderColor: "growth-green",
            },
            {
              question: "Como funciona o adicional noturno nas horas extras?",
              answer:
                "Trabalho noturno (22h às 5h) tem <strong>adicional de 20%</strong> que é <strong>cumulativo</strong> com horas extras. <strong>Exemplo:</strong> domingo noturno = 100% + 20% = 120% total sobre hora normal (CLT Art. 73).",
              borderColor: "system-info",
            },
            {
              question: "Qual o limite diário de horas extras permitido?",
              answer:
                "CLT permite <strong>máximo 2 horas extras diárias</strong>, totalizando 10h/dia. <strong>Exceção:</strong> acordo coletivo pode alterar. Deve respeitar <strong>11h de descanso</strong> entre jornadas (Art. 66 CLT).",
              borderColor: "system-warning",
            },
            {
              question: "Como funciona o banco de horas para compensação?",
              answer:
                "Banco de horas permite <strong>compensar extras em até 6 meses</strong> (CLT Art. 59, §5º). <strong>Regras:</strong> precisa acordo individual/coletivo, horas não compensadas são pagas como extras, deve registrar entrada/saída.",
              borderColor: "growth-green",
            },
            {
              question: "Horas extras integram 13º salário e férias?",
              answer:
                "<strong>Sim!</strong> Horas extras integram a <strong>remuneração</strong> para: 13º salário (média anual), férias + 1/3 (reflexo proporcional), FGTS, rescisão. <strong>TST Súmula 264:</strong> habitualidade gera reflexos.",
              borderColor: "primary-blue",
            },
            {
              question: "Empregador pode descontar horas extras do salário?",
              answer:
                "<strong>Não pode!</strong> CLT Art. 59 proíbe desconto de horas extras do salário, <strong>salvo acordo específico</strong> de compensação (banco de horas). <strong>Violação:</strong> gera multa trabalhista e indenização.",
              borderColor: "system-error-dark",
            },
            {
              question: "Como registrar horas extras para comprovar direito?",
              answer:
                "<strong>Obrigatório:</strong> controle de ponto com entrada/saída (CLT Art. 74). <strong>Dicas:</strong> guarde comprovantes, emails de autorização, testemunhas. <strong>Apps:</strong> podem servir como prova complementar.",
              borderColor: "system-info",
            },
          ]}
          tipSection={{
            title: "Diferencial da Nossa Calculadora",
            content:
              "<strong>1. Base Legal CLT:</strong> Cálculos conforme Art. 59 da CLT. <strong>2. Adicional Noturno:</strong> Inclui cálculo cumulativo 22h-5h. <strong>3. Educação Trabalhista:</strong> Explicações detalhadas sobre direitos e deveres.",
          }}
          footerText="<strong>Base legal atualizada:</strong> Todos os cálculos seguem rigorosamente a <strong>CLT Arts. 58, 59, 66, 73 e 74</strong> e são validados com jurisprudência trabalhista."
        />

        {/* Seção sobre Base Legal */}
        <Card className="w-full border-l-4 border-primary-blue bg-gradient-to-r from-primary-blue-light to-growth-green-soft">
          <CardHeader>
            <CardTitle as="h2" className="text-lg font-bold text-text-primary">
              📋 Base Legal - Consolidação das Leis do Trabalho (CLT)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 text-sm text-text-secondary">
              <p>
                Esta <strong className="text-primary-blue-dark">calculadora de horas extras</strong>{" "}
                está <strong className="text-system-success">100% baseada na CLT</strong> e utiliza
                as{" "}
                <strong className="text-growth-green">
                  fórmulas oficiais dos Arts. 58, 59, 66, 73 e 74
                </strong>
                . Desenvolvida para garantir conformidade legal completa.
              </p>
              <p>
                <strong>Artigos CLT aplicados:</strong> Art. 58 (jornada normal), Art. 59 (horas
                extras e adicionais), Art. 66 (descanso entre jornadas), Art. 73 (adicional
                noturno), Art. 74 (controle de ponto), além de Súmulas TST relevantes sobre reflexos
                em outros direitos.
              </p>
              <p>
                <strong>Fontes oficiais consultadas:</strong> Planalto.gov.br (CLT), TST.jus.br
                (jurisprudência), Ministério do Trabalho (orientações), PontoTel e AmbitoJuridico
                (análises especializadas).
                <strong className="text-system-success"> Validação dupla</strong> com advogados
                trabalhistas.
              </p>
              <p>
                <strong className="text-system-warning">Importante:</strong> Esta ferramenta oferece
                cálculos precisos baseados na legislação vigente. Para situações complexas ou
                contenciosos trabalhistas,{" "}
                <strong>consulte sempre um advogado especializado</strong> em Direito do Trabalho.
              </p>
            </div>
          </CardContent>
        </Card>

        <RelatedCalculators category="trabalhista" currentCalculatorId="horas-extras" />
      </div>
    </div>
  );
}
