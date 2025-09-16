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
      title: `Somar dias em datas | ${APP_NAME}`,
    },
    {
      name: "description",
      content:
        "➕➖ Some ou subtraia anos, meses e dias de qualquer data! Calcule datas futuras e passadas com precisão. Ferramenta gratuita e fácil de usar.",
    },
    { name: "viewport", content: "width=device-width, initial-scale=1" },
    { name: "author", content: "CalculadoraOnlineBR" },
    {
      name: "robots",
      content: "index,follow,max-snippet:-1,max-image-preview:large,max-video-preview:-1",
    },
    {
      rel: "canonical",
      href: "https://www.calculadoraonlinebr.com.br/calculadoras/datas/operacao-datas",
    },
    {
      property: "og:title",
      content: "Operações entre Datas Online Grátis | CalculadoraOnlineBR",
    },
    {
      property: "og:description",
      content:
        "➕➖ Some ou subtraia anos, meses e dias de qualquer data! Calcule datas futuras e passadas com precisão. Ferramenta gratuita e fácil de usar.",
    },
    {
      property: "og:image",
      content: "https://www.calculadoraonlinebr.com.br/images/calculadora-operacao-datas.webp",
    },
    {
      property: "og:image:alt",
      content:
        "Interface da calculadora de operações entre datas mostrando botões para somar e subtrair tempo com campos para anos, meses e dias",
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
      content: "https://www.calculadoraonlinebr.com.br/calculadoras/datas/operacao-datas",
    },
    { property: "og:site_name", content: APP_NAME },
    { property: "og:locale", content: "pt_BR" },
    { name: "twitter:card", content: "summary_large_image" },
    {
      name: "twitter:title",
      content: "Operações entre Datas Online - Somar e Subtrair Tempo",
    },
    {
      name: "twitter:description",
      content:
        "➕➖ Some ou subtraia anos, meses e dias! Calcule datas futuras e passadas com precisão. 100% gratuito e sem cadastro.",
    },
    {
      name: "twitter:image",
      content: "https://www.calculadoraonlinebr.com.br/images/calculadora-operacao-datas.webp",
    },
    {
      name: "twitter:image:alt",
      content:
        "Calculadora de operações entre datas com interface intuitiva para somar e subtrair tempo",
    },
    { name: "twitter:site", content: "@CalculadoraBR" },
    { name: "twitter:creator", content: "@CalculadoraBR" },
    { name: "theme-color", content: "#64B5F6" },
    { httpEquiv: "content-language", content: "pt-br" },
    {
      "script:ld+json": JSON.stringify({
        "@context": "https://schema.org",
        "@type": "WebApplication",
        name: "Calculadora de Operações entre Datas Online",
        alternateName: "Calculadora Somar e Subtrair Datas",
        description:
          "Ferramenta online gratuita para operações matemáticas com datas. Some ou subtraia anos, meses e dias de qualquer data para calcular datas futuras e passadas com precisão.",
        url: "https://www.calculadoraonlinebr.com.br/calculadoras/datas/operacao-datas",
        applicationCategory: "UtilitiesApplication",
        operatingSystem: "Web Browser",
        isAccessibleForFree: true,
        inLanguage: "pt-BR",
        dateCreated: "2025-09-06",
        dateModified: "2025-09-06",
        author: {
          "@type": "Organization",
          name: "CalculadoraOnlineBR",
          url: "https://www.calculadoraonlinebr.com.br",
        },
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "BRL",
          availability: "https://schema.org/InStock",
          validFrom: "2025-09-06",
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
          "@id": "https://www.calculadoraonlinebr.com.br/calculadoras/datas/operacao-datas",
          name: "Calculadora de Operações entre Datas 2025 - Somar e Subtrair Tempo",
          description:
            "Some ou subtraia anos, meses e dias de qualquer data. Descubra datas futuras e passadas com nossa calculadora online grátis.",
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
                name: "Operações entre Datas",
                item: "https://www.calculadoraonlinebr.com.br/calculadoras/datas/operacao-datas",
              },
            ],
          },
        },
        about: {
          "@type": "Thing",
          name: "Operações entre Datas",
          description:
            "Ferramenta para somar e subtrair tempo (anos, meses, dias) em qualquer data",
          category: "DateCalculation",
        },
        featureList: [
          "Soma de anos, meses e dias a qualquer data",
          "Subtração de anos, meses e dias de qualquer data",
          "Cálculo preciso de datas futuras e passadas",
          "Operações com horários específicos opcionais",
          "Interface responsiva para todos os dispositivos",
          "Resultados instantâneos e precisos",
          "100% gratuito sem necessidade de cadastro",
          "Botões intuitivos para seleção de operação",
          "Validação automática de dados inseridos",
          "Formatação brasileira de datas",
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

interface DateOperationResult {
  resultDate: Date;
  originalDate: Date;
  operation: "add" | "subtract";
  yearsChanged: number;
  monthsChanged: number;
  daysChanged: number;
  formattedResult: string;
  formattedOriginal: string;
  summary: string;
}

interface ValidationErrors {
  baseDate?: string;
  years?: string;
  months?: string;
  days?: string;
  general?: string;
}

export default function DateOperationCalculator() {
  const [baseDate, setBaseDate] = useState("");
  const [operation, setOperation] = useState<"add" | "subtract">("add");
  const [years, setYears] = useState("");
  const [months, setMonths] = useState("");
  const [days, setDays] = useState("");
  const [includeTime, setIncludeTime] = useState(false);
  const [baseTime, setBaseTime] = useState("00:00");
  const [result, setResult] = useState<DateOperationResult | null>(null);
  const [errors, setErrors] = useState<ValidationErrors>({});
  const resultRef = useRef<HTMLDivElement>(null);

  const { startCalculation, endCalculation } = useAutoCalculatorTracking({
    calculatorType: "operacao-datas",
    category: "datas",
  });
  useFormTracking("operacao-datas");

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

  const calculateDateOperation = (
    baseDate: Date,
    operation: "add" | "subtract",
    years: number,
    months: number,
    days: number
  ): DateOperationResult => {
    const resultDate = new Date(baseDate);

    // Apply operation
    if (operation === "add") {
      resultDate.setFullYear(resultDate.getFullYear() + years);
      resultDate.setMonth(resultDate.getMonth() + months);
      resultDate.setDate(resultDate.getDate() + days);
    } else {
      resultDate.setFullYear(resultDate.getFullYear() - years);
      resultDate.setMonth(resultDate.getMonth() - months);
      resultDate.setDate(resultDate.getDate() - days);
    }

    const operationText = operation === "add" ? "somados" : "subtraídos";
    const parts = [];
    if (years > 0) parts.push(`${years} ano${years !== 1 ? "s" : ""}`);
    if (months > 0) parts.push(`${months} ${months === 1 ? "mês" : "meses"}`);
    if (days > 0) parts.push(`${days} dia${days !== 1 ? "s" : ""}`);

    const timeText = parts.length > 0 ? parts.join(", ") : "nenhum tempo";
    const summary = `${timeText} ${operationText}`;

    return {
      resultDate,
      originalDate: baseDate,
      operation,
      yearsChanged: years,
      monthsChanged: months,
      daysChanged: days,
      formattedResult: includeTime ? formatDateTimeBR(resultDate) : formatDateBR(resultDate),
      formattedOriginal: includeTime ? formatDateTimeBR(baseDate) : formatDateBR(baseDate),
      summary,
    };
  };

  const validateInputs = (): boolean => {
    const newErrors: ValidationErrors = {};
    let ok = true;

    if (!baseDate) {
      newErrors.baseDate = "Data base é obrigatória";
      ok = false;
    }

    const yearsNum = parseInt(years) || 0;
    const monthsNum = parseInt(months) || 0;
    const daysNum = parseInt(days) || 0;

    if (yearsNum === 0 && monthsNum === 0 && daysNum === 0) {
      newErrors.general = "Informe pelo menos um valor para anos, meses ou dias";
      ok = false;
    }

    if (yearsNum < 0) {
      newErrors.years = "Valor deve ser positivo";
      ok = false;
    }

    if (monthsNum < 0) {
      newErrors.months = "Valor deve ser positivo";
      ok = false;
    }

    if (daysNum < 0) {
      newErrors.days = "Valor deve ser positivo";
      ok = false;
    }

    setErrors(newErrors);
    return ok;
  };

  const handleCalculate = () => {
    if (!validateInputs()) return;
    startCalculation();
    try {
      const base = new Date(includeTime ? `${baseDate}T${baseTime}` : baseDate);
      const yearsNum = parseInt(years) || 0;
      const monthsNum = parseInt(months) || 0;
      const daysNum = parseInt(days) || 0;

      const result = calculateDateOperation(base, operation, yearsNum, monthsNum, daysNum);

      setResult(result);
      setErrors({});
      setTimeout(() => {
        resultRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 50);
      endCalculation(true);
    } catch (error) {
      setErrors({ general: "Erro no cálculo. Verifique os dados inseridos." });
      endCalculation(false, "Erro no cálculo de operação de datas");
    }
  };

  const handleReset = () => {
    setBaseDate("");
    setOperation("add");
    setYears("");
    setMonths("");
    setDays("");
    setIncludeTime(false);
    setBaseTime("00:00");
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
          <BreadcrumbItem isLast>Operações entre Datas</BreadcrumbItem>
        </Breadcrumb>
      </nav>

      <header className="space-y-4 text-center">
        <h1 className="mb-4 text-3xl font-bold text-text-primary md:text-4xl">
          Operações entre Datas Online Grátis
        </h1>
        <p className="mx-auto max-w-3xl text-lg text-text-secondary-dark">
          <strong className="text-growth-green">Some ou subtraia anos, meses e dias</strong> de
          qualquer data. Descubra{" "}
          <strong className="text-primary-blue-dark">datas futuras ou passadas</strong> com precisão
          para planejamento e organização.
        </p>
        <div className="inline-block rounded-lg bg-growth-green-soft p-4 duration-300">
          <p className="text-sm font-medium text-text-primary">
            ➕ <strong>Somar Tempo</strong> • ➖ <strong>Subtrair Tempo</strong> • 📅{" "}
            <strong>Datas Futuras e Passadas</strong>
          </p>
        </div>
      </header>

      <main className="space-y-8">
        <section aria-labelledby="calculator-section">
          <Card>
            <CardHeader>
              <CardTitle as="h2" id="calculator-section">
                🧮 Configure a Operação entre Datas
              </CardTitle>
            </CardHeader>
            <CardContent>
              {/* Escolha da Operação */}
              <div className="mb-6 flex justify-center">
                <div className="flex space-x-4">
                  <Button
                    onClick={() => setOperation("add")}
                    variant={operation === "add" ? "default" : "outline"}
                    className={`px-6 py-3 ${
                      operation === "add"
                        ? "border-growth-green bg-growth-green text-white hover:bg-growth-green-dark"
                        : "border-growth-green text-growth-green hover:bg-growth-green hover:text-white"
                    }`}
                    type="button"
                  >
                    ➕ <strong>Somar</strong>
                  </Button>
                  <Button
                    onClick={() => setOperation("subtract")}
                    variant={operation === "subtract" ? "default" : "outline"}
                    className={`px-6 py-3 ${
                      operation === "subtract"
                        ? "border-system-error bg-system-error text-white hover:bg-system-error-dark"
                        : "border-system-error text-system-error hover:bg-system-error hover:text-white"
                    }`}
                    type="button"
                  >
                    ➖ <strong>Subtrair</strong>
                  </Button>
                </div>
              </div>

              {/* Data Base */}
              <div className="mb-6">
                <div className="space-y-4">
                  <div>
                    <Input
                      type="date"
                      label="📅 Data Base"
                      value={baseDate}
                      onChange={(e) => setBaseDate(e.target.value)}
                      fullWidth
                      className="h-12 text-lg"
                      aria-describedby={errors.baseDate ? "base-date-error" : undefined}
                      required
                    />
                    <ErrorMessage error={errors.baseDate} />
                  </div>

                  {/* Opção de incluir horário */}
                  <div className="flex justify-center">
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

                  {includeTime && (
                    <div>
                      <Input
                        type="time"
                        label="🕒 Horário"
                        value={baseTime}
                        onChange={(e) => setBaseTime(e.target.value)}
                        fullWidth
                        className="h-12 text-lg"
                        aria-label="Horário para a data base"
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* Tempo a Ser Operado */}
              <div className="mb-6">
                <h3 className="mb-4 text-center text-lg font-semibold text-text-primary">
                  {operation === "add" ? "⏱️ Tempo para Somar" : "⏱️ Tempo para Subtrair"}
                </h3>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                  <div>
                    <Input
                      type="number"
                      label="📅 Anos"
                      value={years}
                      onChange={(e) => setYears(e.target.value)}
                      fullWidth
                      className="h-12 text-lg"
                      placeholder="0"
                      min="0"
                      aria-describedby={errors.years ? "years-error" : undefined}
                    />
                    <ErrorMessage error={errors.years} />
                  </div>
                  <div>
                    <Input
                      type="number"
                      label="🗓️ Meses"
                      value={months}
                      onChange={(e) => setMonths(e.target.value)}
                      fullWidth
                      className="h-12 text-lg"
                      placeholder="0"
                      min="0"
                      aria-describedby={errors.months ? "months-error" : undefined}
                    />
                    <ErrorMessage error={errors.months} />
                  </div>
                  <div>
                    <Input
                      type="number"
                      label="⏰ Dias"
                      value={days}
                      onChange={(e) => setDays(e.target.value)}
                      fullWidth
                      className="h-12 text-lg"
                      placeholder="0"
                      min="0"
                      aria-describedby={errors.days ? "days-error" : undefined}
                    />
                    <ErrorMessage error={errors.days} />
                  </div>
                </div>
              </div>

              {errors.general && (
                <div className="mb-4 text-center">
                  <ErrorMessage error={errors.general} />
                </div>
              )}

              {/* Botões */}
              <div className="mt-6 flex justify-center space-x-4">
                <Button
                  onClick={handleCalculate}
                  className="px-8"
                  aria-describedby="calculator-description"
                  type="button"
                >
                  {operation === "add" ? "➕ Somar Tempo" : "➖ Subtrair Tempo"}
                </Button>
                <Button
                  onClick={handleReset}
                  variant="outline"
                  className="border-system-error px-8 text-system-error hover:bg-system-error hover:text-white"
                  aria-label="Limpar todos os campos do formulário"
                  type="button"
                >
                  🔄 Limpar
                </Button>
              </div>
              <p id="calculator-description" className="sr-only">
                Clique para calcular a operação entre datas
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
                    🎯 Resultado da Operação entre Datas
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="mb-6 text-center">
                    <div className="rounded-xl bg-gray-900 p-8">
                      <div className="mb-4 text-6xl font-bold text-growth-green">📅</div>
                      <div className="mb-2 text-3xl font-bold text-text-primary">
                        {result.formattedResult}
                      </div>
                      <div className="mb-4 text-lg text-text-secondary">
                        {result.operation === "add"
                          ? "Data Resultante (Somado)"
                          : "Data Resultante (Subtraído)"}
                      </div>
                      <div className="inline-block rounded-lg bg-primary-blue-light px-4 py-2">
                        <p className="text-sm font-medium text-primary-blue-dark">
                          {result.summary}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div className="rounded-lg bg-gray-900 p-6 text-center">
                      <div className="mb-2 text-2xl font-bold text-system-info">
                        📅 Data Original
                      </div>
                      <div className="text-xl text-text-primary">{result.formattedOriginal}</div>
                    </div>
                    <div className="rounded-lg bg-gray-900 p-6 text-center">
                      <div className="mb-2 text-2xl font-bold text-growth-green">🎯 Nova Data</div>
                      <div className="text-xl text-text-primary">{result.formattedResult}</div>
                    </div>
                  </div>

                  <div className="rounded-lg bg-system-info/10 p-6">
                    <h4 className="mb-3 text-center font-semibold text-system-info">
                      📋 Detalhes da Operação
                    </h4>
                    <div className="grid grid-cols-1 gap-4 text-center md:grid-cols-3">
                      {result.yearsChanged > 0 && (
                        <div className="rounded-lg bg-gray-900 p-4">
                          <div className="text-2xl font-bold text-system-warning">
                            {result.yearsChanged}
                          </div>
                          <div className="text-sm text-text-secondary">
                            Ano{result.yearsChanged !== 1 ? "s" : ""}{" "}
                            {result.operation === "add" ? "Somado" : "Subtraído"}
                            {result.yearsChanged !== 1 ? "s" : ""}
                          </div>
                        </div>
                      )}
                      {result.monthsChanged > 0 && (
                        <div className="rounded-lg bg-gray-900 p-4">
                          <div className="text-2xl font-bold text-primary-blue">
                            {result.monthsChanged}
                          </div>
                          <div className="text-sm text-text-secondary">
                            {result.monthsChanged === 1 ? "Mês" : "Meses"}{" "}
                            {result.operation === "add" ? "Somado" : "Subtraído"}
                            {result.monthsChanged !== 1 ? "s" : ""}
                          </div>
                        </div>
                      )}
                      {result.daysChanged > 0 && (
                        <div className="rounded-lg bg-gray-900 p-4">
                          <div className="text-2xl font-bold text-text-primary">
                            {result.daysChanged}
                          </div>
                          <div className="text-sm text-text-secondary">
                            Dia{result.daysChanged !== 1 ? "s" : ""}{" "}
                            {result.operation === "add" ? "Somado" : "Subtraído"}
                            {result.daysChanged !== 1 ? "s" : ""}
                          </div>
                        </div>
                      )}
                    </div>
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
                🎯 Aplicações Práticas – Guia Completo 2025
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
        <RelatedCalculators category="datas" currentCalculatorId="operacao-datas" />
      </aside>
    </div>
  );
}
