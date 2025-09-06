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
      title: "Calculadora de Dias Úteis 2025 – Feriados Nacionais e Emendas",
    },
    {
      name: "description",
      content:
        "📅 Calcule dias úteis entre datas com feriados nacionais brasileiros! Inclui Carnaval, Páscoa, emendas e pontos facultativos. Algoritmo preciso 2025.",
    },
    {
      name: "keywords",
      content:
        "calculadora dias úteis, feriados nacionais, dias úteis brasil, carnaval páscoa, emendas feriados, calendário brasileiro",
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
      href: "https://www.calculadoraonlinebr.com.br/calculadoras/datas/dias-uteis",
    },
    {
      property: "og:title",
      content: "Calculadora de Dias Úteis 2025 – Feriados Nacionais e Emendas",
    },
    {
      property: "og:description",
      content:
        "📅 Calcule dias úteis entre datas com feriados nacionais brasileiros! Inclui Carnaval, Páscoa, emendas e pontos facultativos. Algoritmo preciso 2025.",
    },
    {
      property: "og:image",
      content: "https://www.calculadoraonlinebr.com.br/images/calculadora-dias-uteis.webp",
    },
    {
      property: "og:image:alt",
      content:
        "Calculadora de Dias Úteis - Interface mostrando cálculo de dias úteis com feriados brasileiros e emendas",
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
      content: "https://www.calculadoraonlinebr.com.br/calculadoras/datas/dias-uteis",
    },
    { property: "og:site_name", content: APP_NAME },
    { property: "og:locale", content: "pt_BR" },
    { name: "twitter:card", content: "summary_large_image" },
    {
      name: "twitter:title",
      content: "Calculadora de Idade Exata 2025 – Contador em Tempo Real",
    },
    {
      name: "twitter:description",
      content:
        "🎂 Descubra sua idade exata em anos, meses e dias! Contador em tempo real com horas, minutos e segundos. 100% gratuito e preciso.",
    },
    {
      name: "twitter:image",
      content: "https://www.calculadoraonlinebr.com.br/images/calculadora-idade.webp",
    },
    {
      name: "twitter:image:alt",
      content: "Calculadora de Idade - Contador de idade em tempo real",
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
        name: "Calculadora de Idade Exata - Contador em Tempo Real 2025",
        description:
          "Ferramenta gratuita para calcular idade exata em anos, meses e dias. Inclui contador em tempo real com horas, minutos e segundos incrementando automaticamente.",
        url: "https://www.calculadoraonlinebr.com.br/calculadoras/datas/idade-exata",
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
          "@id": "https://www.calculadoraonlinebr.com.br/calculadoras/datas/idade-exata",
          name: "Calculadora de Idade Exata 2025 - Contador em Tempo Real",
          description:
            "Calcule sua idade exata em anos, meses e dias. Inclui contador em tempo real com horas, minutos e segundos incrementando automaticamente.",
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

interface Holiday {
  date: Date;
  name: string;
  type: 'fixed' | 'mobile';
  bridgePossible?: boolean;
}

interface WorkdaysResult {
  totalDays: number;
  workdays: number;
  weekends: number;
  holidays: number;
  bridges: Holiday[];
  holidayList: Holiday[];
  summary: string;
  startDate: string;
  endDate: string;
  year: number;
}

interface ValidationErrors {
  startDate?: string;
  endDate?: string;
  general?: string;
}

export default function WorkdaysCalculator() {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [result, setResult] = useState<WorkdaysResult | null>(null);
  const [errors, setErrors] = useState<ValidationErrors>({});
  const resultRef = useRef<HTMLDivElement>(null);

  const { startCalculation, endCalculation } = useAutoCalculatorTracking({
    calculatorType: "dias-uteis",
    category: "datas",
  });
  useFormTracking("dias-uteis");

  const formatDateBR = (date: Date): string => {
    return new Intl.DateTimeFormat("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }).format(date);
  };

  // Algoritmo de Gauss para calcular a data da Páscoa
  const calculateEaster = (year: number): Date => {
    const a = year % 19;
    const b = year % 4;
    const c = year % 7;
    const k = Math.floor(year / 100);
    const p = Math.floor((13 + 8 * k) / 25);
    const q = Math.floor(k / 4);
    const M = (15 - p + k - q) % 30;
    const N = (4 + k - q) % 7;
    const d = (19 * a + M) % 30;
    const e = (2 * b + 4 * c + 6 * d + N) % 7;

    let day: number;
    let month: number;

    if (d + e < 10) {
      day = d + e + 22;
      month = 2; // March (0-based index)
    } else {
      day = d + e - 9;
      month = 3; // April (0-based index)
    }

    // Exceções especiais
    if (day === 26 && month === 3) {
      day = 19;
    } else if (day === 25 && month === 3 && d === 28 && e === 6 && a > 10) {
      day = 18;
    }

    return new Date(year, month, day);
  };

  // Calcular feriados nacionais brasileiros para um ano
  const getBrazilianHolidays = (year: number): Holiday[] => {
    const easter = calculateEaster(year);
    const holidays: Holiday[] = [];

    // Feriados fixos
    const fixedHolidays = [
      { date: new Date(year, 0, 1), name: "Confraternização Universal", type: 'fixed' as const },
      { date: new Date(year, 3, 21), name: "Tiradentes", type: 'fixed' as const, bridgePossible: true },
      { date: new Date(year, 4, 1), name: "Dia do Trabalhador", type: 'fixed' as const, bridgePossible: true },
      { date: new Date(year, 8, 7), name: "Independência do Brasil", type: 'fixed' as const, bridgePossible: true },
      { date: new Date(year, 9, 12), name: "Nossa Senhora Aparecida", type: 'fixed' as const, bridgePossible: true },
      { date: new Date(year, 10, 2), name: "Finados", type: 'fixed' as const, bridgePossible: true },
      { date: new Date(year, 10, 15), name: "Proclamação da República", type: 'fixed' as const, bridgePossible: true },
      { date: new Date(year, 10, 20), name: "Dia da Consciência Negra", type: 'fixed' as const, bridgePossible: true },
      { date: new Date(year, 11, 25), name: "Natal", type: 'fixed' as const },
    ];

    // Feriados móveis baseados na Páscoa
    const carnival1 = new Date(easter);
    carnival1.setDate(easter.getDate() - 47); // Segunda-feira de Carnaval
    
    const carnival2 = new Date(easter);
    carnival2.setDate(easter.getDate() - 46); // Terça-feira de Carnaval
    
    const goodFriday = new Date(easter);
    goodFriday.setDate(easter.getDate() - 2); // Sexta-feira Santa
    
    const corpusChristi = new Date(easter);
    corpusChristi.setDate(easter.getDate() + 60); // Corpus Christi

    const mobileHolidays = [
      { date: carnival1, name: "Segunda-feira de Carnaval", type: 'mobile' as const },
      { date: carnival2, name: "Terça-feira de Carnaval", type: 'mobile' as const },
      { date: goodFriday, name: "Sexta-feira Santa", type: 'mobile' as const },
      { date: corpusChristi, name: "Corpus Christi", type: 'mobile' as const, bridgePossible: true },
    ];

    return [...fixedHolidays, ...mobileHolidays];
  };

  const isWeekday = (date: Date): boolean => {
    const day = date.getDay();
    return day >= 1 && day <= 5; // Monday to Friday
  };

  const isHoliday = (date: Date, holidays: Holiday[]): boolean => {
    return holidays.some(holiday => 
      holiday.date.getTime() === date.getTime()
    );
  };

  const checkBridge = (holiday: Holiday): boolean => {
    const dayOfWeek = holiday.date.getDay();
    return holiday.bridgePossible && (dayOfWeek === 2 || dayOfWeek === 4); // Tuesday or Thursday
  };

  const calculateWorkdays = (start: Date, end: Date): WorkdaysResult => {
    const diffTime = end.getTime() - start.getTime();
    const totalDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    const year = start.getFullYear();
    const holidays = getBrazilianHolidays(year);
    
    let workdays = 0;
    let weekends = 0;
    let holidayCount = 0;
    const holidaysInPeriod: Holiday[] = [];
    const bridges: Holiday[] = [];

    const current = new Date(start);
    while (current <= end) {
      const isWeekendDay = !isWeekday(current);
      const isHolidayDay = isHoliday(current, holidays);
      
      if (isWeekendDay) {
        weekends++;
      } else if (isHolidayDay) {
        holidayCount++;
        const holiday = holidays.find(h => h.date.getTime() === current.getTime());
        if (holiday) {
          holidaysInPeriod.push(holiday);
          if (checkBridge(holiday)) {
            bridges.push(holiday);
          }
        }
      } else {
        workdays++;
      }
      
      current.setDate(current.getDate() + 1);
    }

    const summary = `${workdays} dias úteis de ${totalDays} dias totais`;

    return {
      totalDays,
      workdays,
      weekends,
      holidays: holidayCount,
      bridges,
      holidayList: holidaysInPeriod,
      summary,
      startDate: formatDateBR(start),
      endDate: formatDateBR(end),
      year
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
      const start = new Date(startDate);
      const end = new Date(endDate);
      const diffTime = end.getTime() - start.getTime();
      const diffDays = diffTime / (1000 * 60 * 60 * 24);

      if (start >= end) {
        newErrors.general = "A data inicial deve ser anterior à data final";
        ok = false;
      }

      if (diffDays > 365) {
        newErrors.general = "O período máximo permitido é de 1 ano";
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
      const start = new Date(startDate);
      const end = new Date(endDate);

      const result = calculateWorkdays(start, end);

      setResult(result);
      setErrors({});
      setTimeout(() => {
        resultRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 50);
      endCalculation(true);
    } catch (error) {
      setErrors({ general: "Erro no cálculo. Verifique as datas inseridas." });
      endCalculation(false, "Erro no cálculo de dias úteis");
    }
  };

  const handleReset = () => {
    setStartDate("");
    setEndDate("");
    setResult(null);
    setErrors({});
  };
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

    // Calculate next birthday
    const nextBirthday = new Date(birthDate);
    nextBirthday.setFullYear(currentDate.getFullYear());
    if (nextBirthday <= currentDate) {
      nextBirthday.setFullYear(currentDate.getFullYear() + 1);
    }
    const daysToNextBirthday = Math.ceil((nextBirthday.getTime() - currentDate.getTime()) / (1000 * 60 * 60 * 24));

    const ageString = `${years} anos, ${months} meses e ${days} dias`;

    return {
      totalDays,
      years,
      months,
      days,
      hours: totalHours % 24,
      minutes: totalMinutes % 60,
      seconds: totalSeconds % 60,
      weekdays,
      weekends,
      totalWeeks,
      ageString,
      birthDate: includeTime ? formatDateTimeBR(birthDate) : formatDateBR(birthDate),
      currentDate: includeTime ? formatDateTimeBR(currentDate) : formatDateBR(currentDate),
      nextBirthday: formatDateBR(nextBirthday),
      daysToNextBirthday,
    };
  };

  const validateInputs = (): boolean => {
    const newErrors: ValidationErrors = {};
    let ok = true;

    if (!birthDate) {
      newErrors.birthDate = "Data de nascimento é obrigatória";
      ok = false;
    }

    if (birthDate) {
      const birth = new Date(includeTime ? `${birthDate}T${birthTime}` : birthDate);
      const now = new Date();

      if (birth > now) {
        newErrors.general = "A data de nascimento não pode ser futura";
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
      const birth = new Date(includeTime ? `${birthDate}T${birthTime}` : birthDate);
      const now = new Date();

      const result = calculateAge(birth, now);

      setResult(result);
      setErrors({});
      setTimeout(() => {
        resultRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 50);
      endCalculation(true);
    } catch (error) {
      setErrors({ general: "Erro no cálculo. Verifique a data de nascimento." });
      endCalculation(false, "Erro no cálculo de idade");
    }
  };

  const handleReset = () => {
    setBirthDate("");
    setIncludeTime(false);
    setBirthTime("00:00");
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
          <BreadcrumbItem isLast>Calculadora de Idade</BreadcrumbItem>
        </Breadcrumb>
      </nav>

      <header className="space-y-4 text-center">
        <h1 className="mb-4 text-3xl font-bold text-text-primary md:text-4xl">
          Calculadora de Idade Exata 2025 – Descubra Anos, Meses e Dias
        </h1>
        <p className="mx-auto max-w-3xl text-lg text-text-secondary-dark">
          Calcule sua <strong className="text-growth-green">idade exata em anos, meses e dias</strong>{" "}
          com precisão. Descubra{" "}
          <strong className="text-primary-blue-dark">quantos dias você viveu</strong> e tenha um
          contador em tempo real com horas, minutos e segundos.
        </p>
        <div className="inline-block rounded-lg bg-growth-green-soft p-4 duration-300">
          <p className="text-sm font-medium text-text-primary">
            🎂 <strong>Idade Exata</strong> • ⏰ <strong>Contador Tempo Real</strong> • 📊{" "}
            <strong>Próximo Aniversário</strong>
          </p>
        </div>
      </header>

      <main className="space-y-8">
        <section aria-labelledby="calculator-section">
          <Card>
            <CardHeader>
              <CardTitle as="h2" id="calculator-section">
                🎂 Configure o Cálculo de Idade
              </CardTitle>
            </CardHeader>
            <CardContent>
              {/* Data de Nascimento */}
              <div className="mb-6 flex justify-center">
                <div className="w-full max-w-md space-y-4">
                  <div>
                    <Input
                      type="date"
                      label="🎂 Data de Nascimento"
                      value={birthDate}
                      onChange={(e) => setBirthDate(e.target.value)}
                      fullWidth
                      className="h-12 text-lg"
                      aria-describedby={errors.birthDate ? "birth-date-error" : undefined}
                      required
                    />
                    <ErrorMessage error={errors.birthDate} />
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
                        🕒 Incluir horário de nascimento
                      </span>
                    </label>
                  </div>

                  {includeTime && (
                    <div>
                      <Input
                        type="time"
                        label="🕒 Horário de Nascimento"
                        value={birthTime}
                        onChange={(e) => setBirthTime(e.target.value)}
                        fullWidth
                        className="h-12 text-lg"
                        aria-label="Horário de nascimento para cálculo preciso"
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
                  🎂 Calcular Minha Idade
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
                Clique para calcular sua idade exata com base na data de nascimento
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

                  <div className={`mb-6 grid grid-cols-1 gap-6 rounded-lg bg-gray-900 p-4 ${includeTime ? 'md:grid-cols-4' : 'md:grid-cols-2'}`}>
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
                    {includeTime && (
                      <>
                        <div className="text-center">
                          <div className="text-sm text-text-secondary">Horas</div>
                          <div className="text-xl font-bold text-system-warning">{result.hours}h</div>
                          <div className="text-xs text-text-secondary">Vividas</div>
                        </div>
                        <div className="text-center">
                          <div className="text-sm text-text-secondary">Minutos</div>
                          <div className="text-xl font-bold text-text-primary">{result.minutes}m</div>
                          <div className="text-xs text-text-secondary">Vividos</div>
                        </div>
                      </>
                    )}
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
        <RelatedCalculators category="datas" currentCalculatorId="diferenca-entre-datas" />
      </aside>
    </div>
  );
}
