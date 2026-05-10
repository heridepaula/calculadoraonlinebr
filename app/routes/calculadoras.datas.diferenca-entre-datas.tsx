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
  Input,
} from "~/components/ui";
import { RelatedCalculators, FAQ } from "~/components";
import { APP_NAME } from "~/lib/constants";
import { useAutoCalculatorTracking, useFormTracking } from "~/hooks/useAutoCalculatorTracking";

export const meta: MetaFunction = () => {
  return [
    {
      title: `Calculadora de Diferença entre Datas | ${APP_NAME}`,
    },
    {
      name: "description",
      content:
        "Calcule diferenças entre datas em anos, meses e dias. Descubra sua idade exata, dias úteis e intervalos temporais com nossa calculadora grátis.",
    },
    {
      name: "keywords",
      content:
        "calculadora diferença datas, calcular idade, dias úteis, intervalo entre datas, contador dias online",
    },
    { name: "viewport", content: "width=device-width, initial-scale=1" },
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
      rel: "canonical",
      href: "https://www.calculadoraonlinebr.com.br/calculadoras/datas/diferenca-entre-datas",
    },
    {
      property: "og:title",
      content: "Diferença entre Datas – Calcular Idade e Intervalos",
    },
    {
      property: "og:description",
      content:
        "Calcule diferenças entre datas em anos, meses e dias. Descubra sua idade exata, dias úteis e intervalos temporais com nossa calculadora grátis.",
    },
    {
      property: "og:image",
      content: "https://www.calculadoraonlinebr.com.br/images/calculadora-diferenca-datas.webp",
    },
    {
      property: "og:image:alt",
      content:
        "Calculadora de Diferença entre Datas - Calcule intervalos em anos, meses, dias e horas",
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
      content: "https://www.calculadoraonlinebr.com.br/calculadoras/datas/diferenca-entre-datas",
    },
    { property: "og:site_name", content: APP_NAME },
    { property: "og:locale", content: "pt_BR" },
    { name: "twitter:card", content: "summary_large_image" },
    {
      name: "twitter:title",
      content: "Calculadora de Diferença entre Datas 2026 – Calcule Intervalos",
    },
    {
      name: "twitter:description",
      content:
        "Calcule a diferença entre duas datas em anos, meses, dias, horas e minutos. Inclui contagem de dias úteis e idade exata.",
    },
    {
      name: "twitter:image",
      content: "https://www.calculadoraonlinebr.com.br/images/calculadora-diferenca-datas.webp",
    },
    {
      name: "twitter:image:alt",
      content: "Calculadora de Diferença entre Datas - Calcule intervalos",
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
        name: "Calculadora de Diferença entre Datas - Calculador de Intervalos 2026",
        description:
          "Ferramenta gratuita para calcular diferenças entre datas em anos, meses, dias, horas e minutos. Inclui contagem de dias úteis, feriados e idade.",
        url: "https://www.calculadoraonlinebr.com.br/calculadoras/datas/diferenca-entre-datas",
        applicationCategory: "UtilitiesApplication",
        operatingSystem: "Web Browser",
        isAccessibleForFree: true,
        inLanguage: "pt-BR",
        dateModified: "2025-09-02",
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
          "@id": "https://www.calculadoraonlinebr.com.br/calculadoras/datas/diferenca-entre-datas",
          name: "Calculadora de Diferença entre Datas 2026 - Calcule Intervalos",
          description:
            "Calcule a diferença entre duas datas em anos, meses, dias, horas e minutos. Inclui contagem de dias úteis, feriados e idade.",
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
                name: "Datas",
                item: "https://www.calculadoraonlinebr.com.br/calculadoras/datas",
              },
              {
                "@type": "ListItem",
                position: 4,
                name: "Diferença entre Datas",
                item: "https://www.calculadoraonlinebr.com.br/calculadoras/datas/diferenca-entre-datas",
              },
            ],
          },
        },
        about: {
          "@type": "Thing",
          name: "Cálculo de Diferença entre Datas",
          description: "Ferramenta para calcular intervalos entre duas datas quaisquer",
          category: "DateCalculation",
        },
        featureList: [
          "Cálculo de diferença em anos, meses e dias",
          "Contagem de dias úteis",
          "Cálculo de idade exata",
          "Contador de horas e minutos",
          "Consideração de anos bissextos",
          "Interface móvel responsiva",
          "Resultados instantâneos",
          "Múltiplos formatos de exibição",
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
            name: "Como calcular idade exata?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "A calculadora determina a idade considerando anos bissextos e diferentes números de dias por mês. Use data de nascimento como inicial e data atual (ou qualquer data desejada) como final para obter anos, meses e dias.",
            },
          },
          {
            "@type": "Question",
            name: "Por que incluir horário no cálculo?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Incluir horários é útil para cálculos médicos, legais ou quando horas e minutos são importantes. Por exemplo, para determinar quando uma pessoa completará uma determinada idade ou para prazos contratuais específicos.",
            },
          },
          {
            "@type": "Question",
            name: "O que são dias úteis e como são calculados?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Dias úteis são de segunda a sexta-feira, excluindo finais de semana. A calculadora separa automaticamente dias úteis dos finais de semana, útil para cronogramas de trabalho e prazos comerciais que não contam sábados e domingos.",
            },
          },
          {
            "@type": "Question",
            name: "A calculadora considera anos bissextos?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Sim, automaticamente. Anos bissextos (como 2020, 2024) têm 366 dias devido ao 29 de fevereiro adicional. Nossa calculadora ajusta os cálculos automaticamente, garantindo resultados corretos mesmo em períodos que incluem anos bissextos.",
            },
          },
        ],
      }),
    },
  ];
};

interface DateDifferenceResult {
  totalDays: number;
  years: number;
  months: number;
  days: number;
  hours: number;
  minutes: number;
  weekdays: number;
  weekends: number;
  totalWeeks: number;
  ageString: string;
  fromDate: string;
  toDate: string;
}

interface ValidationErrors {
  startDate?: string;
  endDate?: string;
  general?: string;
}

export default function DateDifferenceCalculator() {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [includeTime, setIncludeTime] = useState(false);
  const [startTime, setStartTime] = useState("00:00");
  const [endTime, setEndTime] = useState("00:00");
  const [result, setResult] = useState<DateDifferenceResult | null>(null);
  const [errors, setErrors] = useState<ValidationErrors>({});
  const resultRef = useRef<HTMLDivElement>(null);

  const { startCalculation, endCalculation } = useAutoCalculatorTracking({
    calculatorType: "diferenca-entre-datas",
    category: "datas",
  });
  useFormTracking("diferenca-entre-datas");

  const formatDateBR = (date: Date): string => {
    return new Intl.DateTimeFormat("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }).format(date);
  };

  const formatDateTimeBR = (date: Date): string => {
    return new Intl.DateTimeFormat("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  const isWeekday = (date: Date): boolean => {
    const day = date.getDay();
    return day >= 1 && day <= 5; // Monday to Friday
  };

  const countWeekdays = (start: Date, end: Date): number => {
    let count = 0;
    const current = new Date(start);
    while (current <= end) {
      if (isWeekday(current)) count++;
      current.setDate(current.getDate() + 1);
    }
    return count;
  };

  const calculateDateDifference = (start: Date, end: Date): DateDifferenceResult => {
    const diffTime = end.getTime() - start.getTime();
    const totalDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    const totalHours = Math.floor(diffTime / (1000 * 60 * 60));
    const totalMinutes = Math.floor(diffTime / (1000 * 60));

    const weekdays = countWeekdays(start, end);
    const weekends = totalDays - weekdays;
    const totalWeeks = Math.floor(totalDays / 7);

    // Calculate years, months, days
    let years = 0;
    let months = 0;
    let days = 0;

    let current = new Date(start);

    // Calculate years, months, days more accurately
    let tempStart = new Date(start);
    let tempEnd = new Date(end);

    // Calculate years
    years = tempEnd.getFullYear() - tempStart.getFullYear();
    if (
      tempEnd.getMonth() < tempStart.getMonth() ||
      (tempEnd.getMonth() === tempStart.getMonth() && tempEnd.getDate() < tempStart.getDate())
    ) {
      years--;
    }

    // Adjust start date by years calculated
    tempStart.setFullYear(tempStart.getFullYear() + years);

    // Calculate months
    months = tempEnd.getMonth() - tempStart.getMonth();
    if (tempEnd.getDate() < tempStart.getDate()) {
      months--;
    }
    if (months < 0) {
      months += 12;
      years--;
    }

    // Adjust start date by months calculated
    tempStart.setMonth(tempStart.getMonth() + months);

    // Calculate remaining days
    if (tempStart <= tempEnd) {
      days = Math.ceil((tempEnd.getTime() - tempStart.getTime()) / (1000 * 60 * 60 * 24));
    }

    const ageString = `${years} anos, ${months} meses e ${days} dias`;

    return {
      totalDays,
      years,
      months,
      days,
      hours: totalHours % 24,
      minutes: totalMinutes % 60,
      weekdays,
      weekends,
      totalWeeks,
      ageString,
      fromDate: formatDateTimeBR(start),
      toDate: formatDateTimeBR(end),
    };
  };

  const validateInputs = (): boolean => {
    const newErrors: ValidationErrors = {};
    let ok = true;

    if (!startDate) {
      newErrors.startDate = "Data inicial é obrigatória";
      ok = false;
    }

    if (!endDate) {
      newErrors.endDate = "Data final é obrigatória";
      ok = false;
    }

    if (startDate && endDate) {
      const start = new Date(includeTime ? `${startDate}T${startTime}` : startDate);
      const end = new Date(includeTime ? `${endDate}T${endTime}` : endDate);

      if (start >= end) {
        newErrors.general = "A data inicial deve ser anterior à data final";
        ok = false;
      }
    }

    setErrors(newErrors);
    return ok;
  };

  const handleCalculate = () => {
    if (!validateInputs()) return;
    startCalculation();
    try {
      const start = new Date(includeTime ? `${startDate}T${startTime}` : startDate);
      const end = new Date(includeTime ? `${endDate}T${endTime}` : endDate);

      const result = calculateDateDifference(start, end);

      setResult(result);
      setErrors({});
      setTimeout(() => {
        resultRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 50);
      endCalculation(true);
    } catch (error) {
      setErrors({ general: "Erro no cálculo. Verifique as datas inseridas." });
      endCalculation(false, "Erro no cálculo de datas");
    }
  };

  const handleReset = () => {
    setStartDate("");
    setEndDate("");
    setIncludeTime(false);
    setStartTime("00:00");
    setEndTime("00:00");
    setResult(null);
    setErrors({});
  };

  const ErrorMessage = ({ error }: { error?: string }) =>
    error ? <div className="mt-1 text-sm text-system-error">{error}</div> : null;

  return (
    <div className="mx-auto max-w-2xl space-y-8 px-4 md:max-w-4xl lg:max-w-6xl" lang="pt-BR">
      <nav aria-label="Navegação estrutural">
        <Breadcrumb>
          <BreadcrumbItem href="/">Início</BreadcrumbItem>
          <BreadcrumbItem href="/calculadoras">Calculadoras</BreadcrumbItem>
          <BreadcrumbItem href="/calculadoras/datas">Datas</BreadcrumbItem>
          <BreadcrumbItem isLast>Diferença entre Datas</BreadcrumbItem>
        </Breadcrumb>
      </nav>

      <header className="space-y-4 text-center">
        <h1 className="mb-4 text-3xl font-bold text-text-primary md:text-4xl">
          Calculadora de Diferença entre Datas 2026 – Calcule Intervalos
        </h1>
        <p className="mx-auto max-w-3xl text-lg text-text-secondary-dark">
          Calcule a <strong className="text-growth-green">diferença exata entre duas datas</strong>{" "}
          em anos, meses, dias, horas e minutos. Descubra{" "}
          <strong className="text-primary-blue-dark">idade, dias úteis</strong> e intervalos
          personalizados para seus projetos.
        </p>
        <div className="inline-block rounded-lg bg-growth-green-soft p-4 duration-300">
          <p className="text-sm font-medium text-text-primary">
            📅 <strong>Cálculo Completo</strong> • 🕒 <strong>Inclui Horários</strong> • 📊{" "}
            <strong>Dias Úteis e Finais de Semana</strong>
          </p>
        </div>
      </header>

      <main className="space-y-8">
        <section aria-labelledby="calculator-section">
          <Card>
            <CardHeader>
              <CardTitle as="h2" id="calculator-section">
                📅 Configure o Cálculo de Diferença
              </CardTitle>
            </CardHeader>
            <CardContent>
              {/* Opção de incluir horário */}
              <div className="mb-6 flex justify-center">
                <label className="flex cursor-pointer items-center space-x-3">
                  <input
                    type="checkbox"
                    checked={includeTime}
                    onChange={(e) => setIncludeTime(e.target.checked)}
                    className="h-5 w-5 rounded border-neutral-surface-variant bg-neutral-surface text-primary-blue focus:ring-2 focus:ring-primary-blue"
                  />
                  <span className="text-sm font-medium text-text-primary">
                    🕒 Incluir horário no cálculo
                  </span>
                </label>
              </div>

              {/* Datas */}
              <div className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="space-y-4">
                  <div>
                    <Input
                      type="date"
                      label="📅 Data Inicial"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      fullWidth
                      className="h-12 text-lg"
                      aria-describedby={errors.startDate ? "start-date-error" : undefined}
                      required
                    />
                    {errors.startDate && (
                      <div id="start-date-error" className="mt-1 text-sm text-system-error">
                        {errors.startDate}
                      </div>
                    )}
                  </div>
                  {includeTime && (
                    <div>
                      <Input
                        type="time"
                        label="🕒 Horário Inicial"
                        value={startTime}
                        onChange={(e) => setStartTime(e.target.value)}
                        fullWidth
                        className="h-12 text-lg"
                        aria-label="Horário inicial para cálculo"
                      />
                    </div>
                  )}
                </div>

                <div className="space-y-4">
                  <div>
                    <Input
                      type="date"
                      label="📅 Data Final"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                      fullWidth
                      className="h-12 text-lg"
                      aria-describedby={errors.endDate ? "end-date-error" : undefined}
                      required
                    />
                    {errors.endDate && (
                      <div id="end-date-error" className="mt-1 text-sm text-system-error">
                        {errors.endDate}
                      </div>
                    )}
                  </div>
                  {includeTime && (
                    <div>
                      <Input
                        type="time"
                        label="🕒 Horário Final"
                        value={endTime}
                        onChange={(e) => setEndTime(e.target.value)}
                        fullWidth
                        className="h-12 text-lg"
                        aria-label="Horário final para cálculo"
                      />
                    </div>
                  )}
                </div>
              </div>

              {errors.general && (
                <div className="mb-4 text-center">
                  <ErrorMessage error={errors.general} />
                </div>
              )}

              {/* Botões */}
              <div className="margin-top-4 flex justify-center space-x-4">
                <Button
                  onClick={handleCalculate}
                  className="px-8"
                  aria-describedby="calculator-description"
                  type="button"
                >
                  Calcular Diferença
                </Button>
                <Button
                  onClick={handleReset}
                  variant="outline"
                  className="border-system-error px-8 text-system-error hover:bg-system-error hover:text-white"
                  aria-label="Limpar todos os campos do formulário"
                  type="button"
                >
                  Limpar
                </Button>
              </div>
              <p id="calculator-description" className="sr-only">
                Clique para calcular a diferença entre as datas inseridas
              </p>
            </CardContent>
          </Card>
        </section>

        {/* Resultado */}
        {result && (
          <section aria-labelledby="results-section" className="mt-8">
            <div ref={resultRef}>
              <Card className="border-2 border-growth-green bg-growth-green-soft">
                <CardHeader>
                  <CardTitle as="h2" id="results-section" className="text-growth-green">
                    📊 Resultado do Cálculo de Diferença
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-3">
                    <div className="rounded-lg bg-gray-900 p-6 text-center">
                      <div className="text-4xl font-bold text-growth-green">
                        {result.totalDays.toLocaleString("pt-BR")}
                      </div>
                      <div className="text-sm text-text-secondary">Dias Totais</div>
                    </div>
                    <div className="rounded-lg bg-gray-900 p-6 text-center">
                      <div className="text-2xl font-bold text-primary-blue-dark">
                        {result.ageString}
                      </div>
                      <div className="text-sm text-text-secondary">Idade/Diferença</div>
                    </div>
                    <div className="rounded-lg bg-gray-900 p-6 text-center">
                      <div className="text-2xl font-bold text-system-warning">
                        {result.totalWeeks.toLocaleString("pt-BR")}
                      </div>
                      <div className="text-sm text-text-secondary">Semanas Completas</div>
                    </div>
                  </div>

                  <div className="mb-6 grid grid-cols-1 gap-6 rounded-lg bg-gray-900 p-4 md:grid-cols-4">
                    <div className="text-center">
                      <div className="text-sm text-text-secondary">Dias Úteis</div>
                      <div className="text-xl font-bold text-growth-green">
                        {result.weekdays.toLocaleString("pt-BR")}
                      </div>
                      <div className="text-xs text-text-secondary">Segunda a Sexta</div>
                    </div>
                    <div className="text-center">
                      <div className="text-sm text-text-secondary">Finais de Semana</div>
                      <div className="text-xl font-bold text-system-info">
                        {result.weekends.toLocaleString("pt-BR")}
                      </div>
                      <div className="text-xs text-text-secondary">Sábados e Domingos</div>
                    </div>
                    <div className="text-center">
                      <div className="text-sm text-text-secondary">Horas</div>
                      <div className="text-xl font-bold text-system-warning">{result.hours}h</div>
                      <div className="text-xs text-text-secondary">Restantes</div>
                    </div>
                    <div className="text-center">
                      <div className="text-sm text-text-secondary">Minutos</div>
                      <div className="text-xl font-bold text-text-primary">{result.minutes}m</div>
                      <div className="text-xs text-text-secondary">Restantes</div>
                    </div>
                  </div>

                  <div className="rounded-lg bg-primary-blue-light p-4">
                    <h4 className="mb-2 font-semibold text-primary-blue-dark">Resumo do Período</h4>
                    <ul className="space-y-1 text-sm text-text-secondary">
                      <li>
                        <strong>Período:</strong> {result.fromDate} até {result.toDate}
                      </li>
                      <li>
                        <strong>Total de anos:</strong> {result.years} anos completos
                      </li>
                      <li>
                        <strong>Total de meses:</strong> {result.months} meses adicionais
                      </li>
                      <li>
                        <strong>Total de dias:</strong> {result.days} dias adicionais
                      </li>
                      <li>
                        <strong>Proporção dias úteis:</strong>{" "}
                        <strong>{((result.weekdays / result.totalDays) * 100).toFixed(1)}%</strong>
                      </li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>
        )}

        <section aria-labelledby="practical-applications" className="mt-12">
          <Card className="border-l-4 border-primary-blue bg-gradient-to-r from-primary-blue-light to-growth-green-soft duration-300">
            <CardHeader>
              <CardTitle
                as="h2"
                id="practical-applications"
                className="text-2xl font-bold text-text-primary"
              >
                🎯 Aplicações Práticas – Guia Completo 2026
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                {/* Cálculo de Idade */}
                <div className="rounded-xl border border-primary-blue/20 bg-gray-900 p-6">
                  <h3 className="mb-4 flex items-center text-xl font-bold text-primary-blue-dark">
                    🎂 Cálculo de Idade Exata
                  </h3>

                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <div>
                      <h4 className="mb-3 font-semibold text-growth-green">🔍 O que calcula?</h4>
                      <p className="mb-4 text-sm text-text-secondary">
                        Determina a idade de uma pessoa considerando anos bissextos, meses com
                        diferentes números de dias e horário específico se necessário.
                      </p>

                      <h4 className="mb-3 font-semibold text-system-info">📊 Detalhes</h4>
                      <ul className="mb-4 space-y-1 text-sm text-text-secondary">
                        <li>• Considera anos bissextos automaticamente</li>
                        <li>• Calcula meses e dias restantes após anos completos</li>
                      </ul>
                    </div>

                    <div>
                      <h4 className="mb-3 font-semibold text-system-success">✅ Usos Práticos</h4>
                      <ul className="mb-4 space-y-1 text-sm text-text-secondary">
                        <li>• Documentos legais e contratos</li>
                        <li>• Aposentadoria e benefícios sociais</li>
                        <li>• Seguros e planos de saúde</li>
                      </ul>

                      <h4 className="mb-3 font-semibold text-system-warning">💡 Dica</h4>
                      <ul className="space-y-1 text-sm text-text-secondary">
                        <li>• Inclua horário para cálculos detalhados</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Planejamento de Projetos */}
                <div className="rounded-xl border border-growth-green/20 bg-gray-900 p-6">
                  <h3 className="mb-4 flex items-center text-xl font-bold text-growth-green">
                    📋 Planejamento de Projetos
                  </h3>

                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <div>
                      <h4 className="mb-3 font-semibold text-primary-blue-dark">
                        🔍 O que calcula?
                      </h4>
                      <p className="mb-4 text-sm text-text-secondary">
                        Calcula duração de projetos, prazos de entrega e tempo disponível
                        considerando apenas dias úteis ou incluindo finais de semana.
                      </p>

                      <h4 className="mb-3 font-semibold text-system-info">📊 Análise Detalhada</h4>
                      <ul className="mb-4 space-y-1 text-sm text-text-secondary">
                        <li>• Separação entre dias úteis e finais de semana</li>
                        <li>• Contagem de semanas completas</li>
                      </ul>
                    </div>

                    <div>
                      <h4 className="mb-3 font-semibold text-system-success">✅ Benefícios</h4>
                      <ul className="mb-4 space-y-1 text-sm text-text-secondary">
                        <li>• Planejamento detalhado de cronogramas</li>
                        <li>• Cálculo realista de horas de trabalho</li>
                      </ul>

                      <h4 className="mb-3 font-semibold text-system-warning">💼 Aplicações</h4>
                      <ul className="space-y-1 text-sm text-text-secondary">
                        <li>• Gestão de projetos corporativos</li>
                        <li>• Contratos com prazos específicos</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Cálculos Financeiros e Legais */}
                <div className="rounded-xl border border-system-warning/20 bg-gray-900 p-6">
                  <h3 className="mb-4 flex items-center text-xl font-bold text-system-warning">
                    ⚖️ Cálculos Financeiros e Legais
                  </h3>

                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <div>
                      <h4 className="mb-3 font-semibold text-growth-green">🔍 O que calcula?</h4>
                      <p className="mb-4 text-sm text-text-secondary">
                        Períodos de investimento, carência de benefícios, prazo para prescrição,
                        tempo de contribuição e vencimento de contratos.
                      </p>

                      <h4 className="mb-3 font-semibold text-system-info">📊 Importância Legal</h4>
                      <ul className="mb-4 space-y-1 text-sm text-text-secondary">
                        <li>• Cálculos para processos judiciais</li>
                        <li>• Prazos trabalhistas e previdenciários</li>
                      </ul>
                    </div>

                    <div>
                      <h4 className="mb-3 font-semibold text-system-success">✅ Vantagens</h4>
                      <ul className="mb-4 space-y-1 text-sm text-text-secondary">
                        <li>• Evita erros em cálculos manuais</li>
                        <li>• Confiabilidade em documentos oficiais</li>
                      </ul>

                      <h4 className="mb-3 font-semibold text-system-warning">⚖️ Exemplos</h4>
                      <ul className="space-y-1 text-sm text-text-secondary">
                        <li>• Tempo de relacionamento para união estável</li>
                        <li>• Período de carência INSS</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        <section aria-labelledby="calculation-methods" className="mt-10">
          <Card className="border border-neutral-surface-variant bg-background-dark-secondary duration-300">
            <CardHeader>
              <CardTitle
                as="h2"
                id="calculation-methods"
                className="text-xl font-bold text-text-primary"
              >
                📊 Métodos de Cálculo: Entenda as Diferenças
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse text-sm">
                  <thead>
                    <tr className="border-b-2 border-neutral-surface-variant">
                      <th className="p-3 text-left font-semibold">Método</th>
                      <th className="p-3 text-center font-semibold text-primary-blue-dark">
                        Apenas Datas
                      </th>
                      <th className="p-3 text-center font-semibold text-growth-green">
                        Com Horário
                      </th>
                      <th className="p-3 text-center font-semibold text-system-warning">
                        Dias Úteis
                      </th>
                    </tr>
                  </thead>
                  <tbody className="space-y-2">
                    <tr className="border-b border-neutral-surface-variant">
                      <td className="p-3 font-medium">Detalhamento</td>
                      <td className="p-3 text-center text-primary-blue-dark">Por dia completo</td>
                      <td className="p-3 text-center text-growth-green">Por hora/minuto</td>
                      <td className="p-3 text-center text-system-warning">Exclui fins de semana</td>
                    </tr>
                    <tr className="border-b border-neutral-surface-variant">
                      <td className="p-3 font-medium">Complexidade</td>
                      <td className="p-3 text-center">⭐⭐</td>
                      <td className="p-3 text-center">⭐⭐⭐⭐</td>
                      <td className="p-3 text-center">⭐⭐⭐</td>
                    </tr>
                    <tr className="border-b border-neutral-surface-variant">
                      <td className="p-3 font-medium">Uso Comum</td>
                      <td className="p-3 text-center text-growth-green">Cálculos gerais</td>
                      <td className="p-3 text-center">Eventos específicos</td>
                      <td className="p-3 text-center">Projetos corporativos</td>
                    </tr>
                    <tr className="border-b border-neutral-surface-variant">
                      <td className="p-3 font-medium">Anos Bissextos</td>
                      <td className="p-3 text-center">Considerado automaticamente</td>
                      <td className="p-3 text-center">Considerado automaticamente</td>
                      <td className="p-3 text-center">Considerado automaticamente</td>
                    </tr>
                    <tr className="border-b border-neutral-surface-variant">
                      <td className="p-3 font-medium">Ideal para</td>
                      <td className="p-3 text-center">Idade, contratos gerais</td>
                      <td className="p-3 text-center">Eventos, prazos específicos</td>
                      <td className="p-3 text-center">Cronogramas de trabalho</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-medium">Informações Extras</td>
                      <td className="p-3 text-center text-primary-blue-dark">Semanas totais</td>
                      <td className="p-3 text-center text-growth-green">Horas e minutos</td>
                      <td className="p-3 text-center text-system-warning">
                        Separação úteis/finais de semana
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
                <div className="rounded-lg border border-primary-blue/20 bg-primary-blue-light p-4">
                  <h4 className="mb-2 font-bold text-primary-blue-dark">📅 Uso Geral</h4>
                  <p className="text-sm text-text-secondary">
                    Use o <strong>cálculo apenas com datas</strong> para idade, prazos contratuais e
                    cálculos do dia a dia.
                  </p>
                </div>

                <div className="rounded-lg border border-growth-green/20 bg-growth-green-soft p-4">
                  <h4 className="mb-2 font-bold text-growth-green">🕐 Máximo Detalhamento</h4>
                  <p className="text-sm text-text-secondary">
                    Inclua <strong>horário</strong> para eventos específicos, nascimentos exatos e
                    cálculos médicos ou legais.
                  </p>
                </div>

                <div className="rounded-lg border border-system-warning/20 bg-system-warning/10 p-4">
                  <h4 className="mb-2 font-bold text-system-warning">💼 Trabalho</h4>
                  <p className="text-sm text-text-secondary">
                    Use <strong>dias úteis</strong> para cronogramas profissionais, prazos
                    comerciais e gestão de projetos.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        <section aria-labelledby="faq-section" className="mt-10">
          <FAQ
            title="Perguntas Frequentes - Calculadora de Diferença entre Datas"
            items={[
              {
                question: "Como calcular idade exata?",
                answer:
                  "A calculadora determina a idade confiável considerando anos bissextos e diferentes números de dias por mês. Use data de nascimento como inicial e data atual (ou qualquer data desejada) como final para obter anos, meses e dias exatos.",
                borderColor: "primary-blue",
              },
              {
                question: "Por que incluir horário no cálculo?",
                answer:
                  "Incluir horários é útil para cálculos médicos, legais ou quando horas e minutos são importantes. Por exemplo, para determinar quando uma pessoa completará uma determinada idade ou para prazos contratuais específicos.",
                borderColor: "growth-green",
              },
              {
                question: "O que são dias úteis e como são calculados?",
                answer:
                  "Dias úteis são de segunda a sexta-feira, excluindo finais de semana. A calculadora separa automaticamente dias úteis dos finais de semana, útil para cronogramas de trabalho e prazos comerciais que não contam sábados e domingos.",
                borderColor: "system-info",
              },
              {
                question: "A calculadora considera anos bissextos?",
                answer:
                  "Sim, automaticamente. Anos bissextos (como 2020, 2024) têm 366 dias devido ao 29 de fevereiro adicional. Nossa calculadora ajusta os cálculos automaticamente, garantindo resultados corretos mesmo em períodos que incluem anos bissextos.",
                borderColor: "system-warning",
              },
              {
                question: "Como usar para planejamento de projetos?",
                answer:
                  "Para projetos, defina data de início e prazo final desejado. A calculadora mostrará dias totais, dias úteis (para cronograma de trabalho) e semanas completas. Isso ajuda a planejar entregas realistas considerando apenas dias de trabalho.",
                borderColor: "growth-green",
              },
              {
                question: "Posso calcular diferenças para datas futuras?",
                answer:
                  "Sim! Use qualquer combinação de datas passadas, presentes ou futuras. É útil para contar tempo até eventos futuros, prazos de vencimento, aposentadoria, ou qualquer marco que você queira acompanhar.",
                borderColor: "system-error-dark",
              },
            ]}
            tipSection={{
              title: "Dica Importante sobre Cálculos de Data",
              content:
                "<strong>Para melhor resultado:</strong> inclua horários quando necessário, especialmente para cálculos legais ou médicos. Para projetos corporativos, use a contagem de dias úteis para cronogramas realistas.",
            }}
            footerText="<strong>Lembre-se:</strong> Diferentes contextos requerem diferentes níveis de detalhe. Use apenas datas para cálculos gerais, inclua horário para máximo detalhamento, e considere dias úteis para planejamento profissional."
          />
        </section>

        <section aria-labelledby="usage-guide" className="mt-10">
          <Card className="border-l-4 border-primary-blue bg-primary-blue-light duration-300">
            <CardHeader>
              <CardTitle as="h2" id="usage-guide" className="text-lg font-bold text-text-primary">
                📚 Como Usar Esta Calculadora de Diferença entre Datas
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-sm text-text-secondary">
                <p>
                  Esta{" "}
                  <strong className="text-primary-blue-dark">
                    calculadora de diferença entre datas
                  </strong>{" "}
                  utiliza <strong className="text-growth-green">algoritmos confiáveis</strong> para
                  calcular intervalos exatos entre duas datas. Os cálculos consideram anos
                  bissextos, diferentes durações de meses e opcionalmente horários específicos.
                </p>
                <p>
                  <strong>Métodos disponíveis:</strong> Cálculo simples por datas, cálculo com
                  horários detalhados e separação entre dias úteis e finais de semana. Cada método
                  atende a necessidades específicas de planejamento e análise temporal.
                </p>
                <p>
                  <strong className="text-system-warning">Importante:</strong> Esta ferramenta é
                  para fins educacionais, planejamento pessoal e profissional. Para documentos
                  legais oficiais, consulte sempre um <strong>profissional qualificado</strong> e
                  verifique regulamentações específicas.
                </p>
                <p className="mt-4 border-t border-primary-blue/20 pt-3 text-xs opacity-75">
                  📅 Cálculos confiáveis • 🕒 Suporte a horários • 🔒 Dados não armazenados • 📱
                  Compatível com todos os dispositivos • 🌙 Suporte a modo escuro
                </p>
              </div>
            </CardContent>
          </Card>
        </section>
      </main>

      <aside aria-label="Calculadoras relacionadas" className="mt-12">
        <RelatedCalculators category="datas" currentCalculatorId="diferenca-entre-datas" />
      </aside>
    </div>
  );
}
