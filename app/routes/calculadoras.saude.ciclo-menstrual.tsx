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
import { Input } from "~/components/ui";
import { RelatedCalculators, FAQ } from "~/components";
import { APP_NAME } from "~/lib/constants";
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
      title: "Calculadora de Ciclo Menstrual 2025 | CalculadoraOnlineBR",
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
      rel: "preload",
      href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap",
      as: "style",
    },
    {
      name: "description",
      content:
        "Calcule ciclo menstrual, período fértil e ovulação. Calendário visual interativo com previsões precisas. Ferramenta gratuita para saúde feminina.",
    },
    { name: "author", content: "CalculadoraOnlineBR - Ferramentas Educacionais" },
    { name: "keywords", content: "ciclo menstrual, período fértil, ovulação, calendário menstrual, saúde feminina" },
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
      href: "https://calculadoraonlinebr.com.br/calculadoras/saude/ciclo-menstrual",
    },
    {
      property: "og:title",
      content: "Calculadora de Ciclo Menstrual 2025 | CalculadoraOnlineBR",
    },
    {
      property: "og:description",
      content:
        "Calcule ciclo menstrual, período fértil e ovulação. Calendário visual interativo com previsões precisas. Ferramenta gratuita para saúde feminina.",
    },
    {
      property: "og:image",
      content: "https://www.calculadoraonlinebr.com.br/images/calculadora-ciclo-menstrual.webp",
    },
    {
      property: "og:image:alt",
      content:
        "Calculadora de Ciclo Menstrual - Acompanhe período fértil, ovulação e próximas menstruações",
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
      content: "https://calculadoraonlinebr.com.br/calculadoras/saude/ciclo-menstrual",
    },
    { property: "og:site_name", content: APP_NAME },
    { property: "og:locale", content: "pt_BR" },
    { name: "twitter:card", content: "summary_large_image" },
    {
      name: "twitter:title",
      content: "Calculadora de Ciclo Menstrual 2025 | CalculadoraOnlineBR",
    },
    {
      name: "twitter:description",
      content:
        "Calcule ciclo menstrual, período fértil e ovulação. Calendário visual interativo com previsões precisas. Ferramenta gratuita para saúde feminina.",
    },
    {
      name: "twitter:image",
      content: "https://www.calculadoraonlinebr.com.br/images/calculadora-ciclo-menstrual.webp",
    },
    {
      name: "twitter:image:alt",
      content: "Calculadora de Ciclo Menstrual - Acompanhe seu ciclo menstrual",
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
        name: "Calculadora de Ciclo Menstrual - Acompanhe Período Fértil 2025",
        description:
          "Calculadora gratuita e precisa de ciclo menstrual. Acompanhe período fértil, ovulação, próximas menstruações e visualize calendário completo do seu ciclo.",
        url: "https://calculadoraonlinebr.com.br/calculadoras/saude/ciclo-menstrual",
        applicationCategory: "HealthApplication",
        operatingSystem: "Web Browser",
        isAccessibleForFree: true,
        inLanguage: "pt-BR",
        dateModified: "2025-08-30",
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
          "@id": "https://calculadoraonlinebr.com.br/calculadoras/saude/ciclo-menstrual",
          name: "Calculadora de Ciclo Menstrual 2025 - Período Fértil e Ovulação",
          description:
            "Acompanhe seu ciclo menstrual com precisão. Calcule período fértil, ovulação, próximas menstruações e visualize calendário completo. Ferramenta confiável para saúde feminina.",
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
                name: "Saúde",
                item: "https://calculadoraonlinebr.com.br/calculadoras/saude",
              },
              {
                "@type": "ListItem",
                position: 4,
                name: "Calculadora de Ciclo Menstrual",
                item: "https://calculadoraonlinebr.com.br/calculadoras/saude/ciclo-menstrual",
              },
            ],
          },
        },
        about: {
          "@type": "MedicalCondition",
          name: "Ciclo Menstrual",
          description:
            "Processo fisiológico mensal do sistema reprodutivo feminino, caracterizado por 4 fases distintas: menstruação (dias 1-5), fase folicular (dias 1-13), ovulação (dia 14) e fase lútea (dias 15-28), com duração média de 28 dias",
          category: "Women's Health",
          medicalCode: {
            "@type": "MedicalCode",
            code: "Z30.02",
            codingSystem: "ICD-10"
          },
        },
        featureList: [
          "Cálculo preciso do período fértil e ovulação baseado em evidências científicas",
          "Previsão confiável de próximas 6 menstruações",
          "Calendário menstrual visual com código de cores por fase",
          "Acompanhamento detalhado das 4 fases do ciclo menstrual",
          "Algoritmo adaptável para ciclos de 21 a 45 dias",
          "Interface responsiva otimizada para dispositivos móveis",
          "Cálculos em tempo real sem armazenamento de dados pessoais",
          "Ferramenta educativa com base em conhecimento médico atualizado",
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
            name: "Como calcular o ciclo menstrual?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "O ciclo menstrual é calculado do primeiro dia da menstruação até o dia anterior ao início da próxima menstruação. A duração média é de 28 dias, mas pode variar entre 21 e 35 dias.",
            },
          },
          {
            "@type": "Question",
            name: "Como saber o período fértil?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "O período fértil ocorre geralmente entre 5 dias antes e 1 dia após a ovulação. A ovulação acontece aproximadamente 14 dias antes da próxima menstruação.",
            },
          },
          {
            "@type": "Question",
            name: "Quando acontece a ovulação?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "A ovulação ocorre aproximadamente no meio do ciclo menstrual, cerca de 14 dias antes do início da próxima menstruação, independentemente da duração total do ciclo.",
            },
          },
          {
            "@type": "Question",
            name: "O que é considerado um ciclo normal?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Um ciclo menstrual normal tem duração entre 21 e 35 dias, com menstruação durando de 3 a 7 dias. Variações ocasionais são normais, mas mudanças significativas devem ser avaliadas por um médico.",
            },
          },
        ],
      }),
    },
  ];
};

interface CycleDay {
  date: Date;
  dayOfCycle: number;
  phase: "menstruation" | "follicular" | "ovulation" | "luteal";
  isFertile: boolean;
  isOvulation: boolean;
  description: string;
}

interface MenstrualCycleResult {
  lastPeriod: Date;
  cycleLength: number;
  periodLength: number;
  nextPeriod: Date;
  ovulationDate: Date;
  fertileStart: Date;
  fertileEnd: Date;
  cycleCalendar: CycleDay[];
  upcomingPeriods: Date[];
}

interface ValidationErrors {
  lastPeriod?: string;
  cycleLength?: string;
  periodLength?: string;
}

export default function MenstrualCycleCalculator() {
  const [lastPeriod, setLastPeriod] = useState("");
  const [cycleLength, setCycleLength] = useState("28");
  const [periodLength, setPeriodLength] = useState("5");
  const [result, setResult] = useState<MenstrualCycleResult | null>(null);
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [currentPage, setCurrentPage] = useState(1);
  const resultRef = useRef<HTMLDivElement>(null);

  const { startCalculation, endCalculation } = useAutoCalculatorTracking({
    calculatorType: "ciclo-menstrual",
    category: "saude",
  });
  useFormTracking("ciclo-menstrual");

  // Função auxiliar para formatar datas
  const formatDate = (date: Date): string => {
    return new Intl.DateTimeFormat("pt-BR").format(date);
  };

  // Função para calcular diferença entre datas em dias
  const daysBetween = (date1: Date, date2: Date): number => {
    const diffTime = Math.abs(date2.getTime() - date1.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  // Função para adicionar dias a uma data
  const addDays = (date: Date, days: number): Date => {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  };

  const parseNumber = (v: string): number => {
    const n = parseInt(v, 10);
    return isNaN(n) ? 0 : n;
  };

  const parseDate = (dateString: string): Date | null => {
    if (!dateString) return null;
    const date = new Date(dateString);
    return isNaN(date.getTime()) ? null : date;
  };

  const validateInputs = (): boolean => {
    const newErrors: ValidationErrors = {};
    let ok = true;
    
    const lastPeriodDate = parseDate(lastPeriod);
    if (!lastPeriodDate) {
      newErrors.lastPeriod = "Data da última menstruação é obrigatória";
      ok = false;
    } else if (lastPeriodDate > new Date()) {
      newErrors.lastPeriod = "Data não pode ser no futuro";
      ok = false;
    }
    
    const cycle = parseNumber(cycleLength);
    if (cycle < 21 || cycle > 45) {
      newErrors.cycleLength = "Ciclo deve ter entre 21 e 45 dias";
      ok = false;
    }
    
    const period = parseNumber(periodLength);
    if (period < 2 || period > 10) {
      newErrors.periodLength = "Menstruação deve durar entre 2 e 10 dias";
      ok = false;
    }
    
    setErrors(newErrors);
    return ok;
  };

  const handleCalculate = () => {
    if (!validateInputs()) return;
    startCalculation("calcular");
    try {
      const lastPeriodDate = parseDate(lastPeriod)!;
      const cycle = parseNumber(cycleLength);
      const period = parseNumber(periodLength);

      // Calcular próxima menstruação
      const nextPeriod = addDays(lastPeriodDate, cycle);
      
      // Calcular ovulação (14 dias antes da próxima menstruação)
      const ovulationDate = addDays(nextPeriod, -14);
      
      // Calcular período fértil (5 dias antes e 1 dia após ovulação)
      const fertileStart = addDays(ovulationDate, -5);
      const fertileEnd = addDays(ovulationDate, 1);

      // Gerar calendário do ciclo
      const cycleCalendar: CycleDay[] = [];
      
      for (let i = 0; i < cycle; i++) {
        const currentDate = addDays(lastPeriodDate, i);
        const dayOfCycle = i + 1;
        
        let phase: CycleDay['phase'];
        let description: string;
        let isFertile = false;
        let isOvulation = false;
        
        if (dayOfCycle <= period) {
          phase = "menstruation";
          description = `Menstruação - Dia ${dayOfCycle}`;
        } else if (dayOfCycle <= 13) {
          phase = "follicular";
          description = "Fase folicular";
        } else if (dayOfCycle === 14) {
          phase = "ovulation";
          description = "Ovulação";
          isOvulation = true;
          isFertile = true;
        } else {
          phase = "luteal";
          description = "Fase lútea";
        }
        
        // Determinar se está no período fértil
        if (currentDate >= fertileStart && currentDate <= fertileEnd) {
          isFertile = true;
          if (!isOvulation) {
            description += " - Período fértil";
          }
        }
        
        cycleCalendar.push({
          date: currentDate,
          dayOfCycle,
          phase,
          isFertile,
          isOvulation,
          description,
        });
      }
      
      // Calcular próximas 6 menstruações
      const upcomingPeriods: Date[] = [];
      for (let i = 1; i <= 6; i++) {
        upcomingPeriods.push(addDays(lastPeriodDate, cycle * i));
      }

      const res: MenstrualCycleResult = {
        lastPeriod: lastPeriodDate,
        cycleLength: cycle,
        periodLength: period,
        nextPeriod,
        ovulationDate,
        fertileStart,
        fertileEnd,
        cycleCalendar,
        upcomingPeriods,
      };

      setResult(res);
      setErrors({});
      setCurrentPage(1);
      setTimeout(() => {
        resultRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 50);
      endCalculation("calcular", { success: true });
    } catch {
      setErrors({ lastPeriod: "Erro no cálculo. Verifique os valores inseridos." });
      endCalculation("calcular", { success: false });
    }
  };

  const handleReset = () => {
    setLastPeriod("");
    setCycleLength("28");
    setPeriodLength("5");
    setResult(null);
    setErrors({});
    setCurrentPage(1);
  };

  const ErrorMessage = ({ error }: { error?: string }) =>
    error ? <div className="mt-1 text-sm text-system-error">{error}</div> : null;

  return (
    <div className="mx-auto max-w-2xl space-y-8 px-4 md:max-w-4xl lg:max-w-6xl">
      <Breadcrumb>
        <BreadcrumbItem href="/">Início</BreadcrumbItem>
        <BreadcrumbItem href="/calculadoras">Calculadoras</BreadcrumbItem>
        <BreadcrumbItem href="/calculadoras/saude">Saúde</BreadcrumbItem>
        <BreadcrumbItem isLast>Ciclo Menstrual</BreadcrumbItem>
      </Breadcrumb>

      <header className="space-y-4 text-center">
        <h1 className="mb-4 text-3xl font-bold text-text-primary md:text-4xl">
          Calculadora de Ciclo Menstrual 2025 – Período Fértil e Ovulação
        </h1>
        <p className="mx-auto max-w-3xl text-lg text-text-secondary-dark">
          Acompanhe seu <strong className="text-health-red">ciclo menstrual</strong> com precisão.
          Calcule <strong className="text-primary-blue-dark">período fértil</strong>, ovulação e
          próximas menstruações com nossa ferramenta confiável.
        </p>
        <div className="inline-block rounded-lg bg-health-red-soft p-4 duration-300">
          <p className="text-sm font-medium text-text-primary">
            📅 <strong>Calendário Menstrual</strong> • 🌱 <strong>Período Fértil</strong> •
            🔴 <strong>Ovulação Precisa</strong>
          </p>
        </div>
      </header>

      <Card>
        <CardHeader>
          <CardTitle as="h2">📋 Configure seu Ciclo Menstrual</CardTitle>
        </CardHeader>
        <CardContent>
          {/* Linha 1: Data da última menstruação */}
          <div className="mb-6">
            <div>
              <Input
                type="date"
                label="Data da Última Menstruação"
                value={lastPeriod}
                onChange={(e) => setLastPeriod(e.target.value)}
                fullWidth
                className="h-12 text-lg"
              />
              <ErrorMessage error={errors.lastPeriod} />
              <div className="mt-1 text-xs text-text-secondary">Data do primeiro dia da sua última menstruação</div>
            </div>
          </div>

          {/* Linha 2: Duração do ciclo e menstruação */}
          <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <Input
                type="number"
                label="Duração do Ciclo (dias)"
                value={cycleLength}
                onChange={(e) => setCycleLength(e.target.value)}
                placeholder="28"
                min="21"
                max="45"
                fullWidth
                className="h-12 text-lg"
              />
              <ErrorMessage error={errors.cycleLength} />
              <div className="mt-1 text-xs text-text-secondary">
                Número de dias do seu ciclo completo (21 a 45 dias)
              </div>
            </div>
            <div>
              <Input
                type="number"
                label="Duração da Menstruação (dias)"
                value={periodLength}
                onChange={(e) => setPeriodLength(e.target.value)}
                placeholder="5"
                min="2"
                max="10"
                fullWidth
                className="h-12 text-lg"
              />
              <ErrorMessage error={errors.periodLength} />
              <div className="mt-1 text-xs text-text-secondary">
                Quantos dias dura sua menstruação (2 a 10 dias)
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
        <Card ref={resultRef as any} className="border-2 border-health-red bg-health-red-soft">
          <CardHeader>
            <CardTitle as="h3" className="text-health-red">
              📊 Resultado do Cálculo do Ciclo Menstrual
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-3">
              <div className="rounded-lg bg-gray-900 p-6 text-center">
                <div className="text-2xl font-bold text-health-red">
                  {formatDate(result.nextPeriod)}
                </div>
                <div className="text-sm text-text-secondary">Próxima Menstruação</div>
              </div>
              <div className="rounded-lg bg-gray-900 p-6 text-center">
                <div className="text-2xl font-bold text-primary-blue-dark">
                  {formatDate(result.ovulationDate)}
                </div>
                <div className="text-sm text-text-secondary">Ovulação</div>
              </div>
              <div className="rounded-lg bg-gray-900 p-6 text-center">
                <div className="text-lg font-bold text-system-success">
                  {formatDate(result.fertileStart)} a {formatDate(result.fertileEnd)}
                </div>
                <div className="text-sm text-text-secondary">Período Fértil</div>
              </div>
            </div>

            <div className="mb-6 grid grid-cols-1 gap-6 rounded-lg bg-gray-900 p-4 md:grid-cols-3">
              <div className="text-center">
                <div className="text-sm text-text-secondary">Ciclo Atual</div>
                <div className="text-xl font-bold text-text-primary">
                  {result.cycleLength} dias
                </div>
                <div className="text-sm text-text-secondary">Duração do ciclo</div>
              </div>
              <div className="text-center">
                <div className="text-sm text-text-secondary">Menstruação</div>
                <div className="text-xl font-bold text-text-primary">
                  {result.periodLength} dias
                </div>
                <div className="text-sm text-text-secondary">Duração menstrual</div>
              </div>
              <div className="text-center">
                <div className="text-sm text-text-secondary">Dias até Próxima</div>
                <div className="text-xl font-bold text-text-primary">
                  {daysBetween(new Date(), result.nextPeriod)} dias
                </div>
                <div className="text-sm text-text-secondary">Próxima menstruação</div>
              </div>
            </div>

            <div className="rounded-lg bg-primary-blue-light p-4">
              <h4 className="mb-2 font-semibold text-primary-blue-dark">Resumo do Ciclo</h4>
              <ul className="space-y-1 text-sm text-text-secondary">
                <li>
                  Última menstruação: <strong>{formatDate(result.lastPeriod)}</strong>
                </li>
                <li>
                  Duração do ciclo: <strong>{result.cycleLength} dias</strong>
                </li>
                <li>
                  Duração da menstruação: <strong>{result.periodLength} dias</strong>
                </li>
                <li>
                  Próxima menstruação: <strong>{formatDate(result.nextPeriod)}</strong>
                </li>
                <li>
                  Ovulação: <strong>{formatDate(result.ovulationDate)}</strong>
                </li>
                <li>
                  Período fértil: <strong>{formatDate(result.fertileStart)} a {formatDate(result.fertileEnd)}</strong>
                </li>
              </ul>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Calendário e Gráficos */}
      {result && (
        <>
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {/* Gráfico do Ciclo Menstrual */}
            <Card>
              <CardHeader>
                <CardTitle as="h3" className="text-health-red">
                  📈 Fases do Ciclo Menstrual
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <Pie
                    data={{
                      labels: ["Menstruação", "Fase Folicular", "Ovulação", "Fase Lútea"],
                      datasets: [
                        {
                          data: [
                            result.periodLength,
                            13 - result.periodLength,
                            1,
                            result.cycleLength - 14,
                          ],
                          backgroundColor: [
                            "#DC2626", // Red for menstruation
                            "#3B82F6", // Blue for follicular
                            "#10B981", // Green for ovulation
                            "#F59E0B", // Orange for luteal
                          ],
                          borderColor: ["#991B1B", "#1D4ED8", "#047857", "#D97706"],
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
                              const total = result.cycleLength;
                              const percentage = ((value / total) * 100).toFixed(1);
                              return `${context.label}: ${value} dias (${percentage}%)`;
                            },
                          },
                        },
                      },
                    }}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Próximas Menstruações */}
            <Card>
              <CardHeader>
                <CardTitle as="h3" className="text-primary-blue-dark">
                  📅 Próximas Menstruações
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {result.upcomingPeriods.map((date, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between rounded-lg bg-gray-900 p-3"
                    >
                      <div className="font-medium text-text-primary">
                        {index === 0 ? "Próxima" : `${index + 1}ª próxima`}
                      </div>
                      <div className="text-health-red font-bold">
                        {formatDate(date)}
                      </div>
                      <div className="text-sm text-text-secondary">
                        {daysBetween(new Date(), date)} dias
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Calendário Menstrual */}
          <Card>
            <CardHeader>
              <CardTitle as="h3" className="text-system-success">
                🗓️ Calendário do Ciclo Atual
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-7 gap-2 text-center text-sm">
                {/* Cabeçalho dos dias da semana */}
                {["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"].map((day) => (
                  <div key={day} className="font-bold p-2 text-text-secondary">
                    {day}
                  </div>
                ))}
                
                {/* Dias do calendário */}
                {result.cycleCalendar.map((day) => (
                  <div
                    key={day.dayOfCycle}
                    className={`p-2 rounded-lg border text-xs ${
                      day.phase === "menstruation"
                        ? "bg-health-red text-white border-health-red"
                        : day.isOvulation
                        ? "bg-system-success text-white border-system-success"
                        : day.isFertile
                        ? "bg-primary-blue text-white border-primary-blue"
                        : "bg-gray-800 text-text-secondary border-gray-700"
                    }`}
                  >
                    <div className="font-bold">{day.dayOfCycle}</div>
                    <div className="text-xs mt-1">{day.description}</div>
                  </div>
                ))}
              </div>
              
              {/* Legenda */}
              <div className="mt-4 grid grid-cols-2 gap-4 md:grid-cols-4">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-health-red rounded"></div>
                  <span className="text-sm">Menstruação</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-system-success rounded"></div>
                  <span className="text-sm">Ovulação</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-primary-blue rounded"></div>
                  <span className="text-sm">Período Fértil</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-gray-800 rounded"></div>
                  <span className="text-sm">Outras fases</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </>
      )}

      {/* Seção: Ciclo Menstrual - Guia Completo */}
      <Card className="border-l-4 border-health-red bg-gradient-to-r from-health-red-soft to-primary-blue-light duration-300">
        <CardHeader>
          <CardTitle as="h2" className="text-2xl font-bold text-text-primary">
            🎯 Ciclo Menstrual – Guia Completo 2025
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-8">
            {/* Fases do Ciclo Menstrual */}
            <div className="rounded-xl border border-health-red/20 bg-gray-900 p-6">
              <h3 className="mb-4 flex items-center text-xl font-bold text-health-red">
                🔄 Fases do Ciclo Menstrual
              </h3>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <h4 className="mb-3 font-semibold text-system-error">🩸 Menstruação (Dias 1-5)</h4>
                  <p className="mb-4 text-sm text-text-secondary">
                    Período em que ocorre o sangramento menstrual. O revestimento uterino é eliminado 
                    quando não há gravidez.
                  </p>

                  <h4 className="mb-3 font-semibold text-primary-blue-dark">🌱 Fase Folicular (Dias 1-13)</h4>
                  <p className="mb-4 text-sm text-text-secondary">
                    Os folículos ovarianos se desenvolvem e os níveis de estrogênio aumentam, 
                    preparando o útero para uma possível gravidez.
                  </p>
                </div>

                <div>
                  <h4 className="mb-3 font-semibold text-system-success">🥚 Ovulação (Dia 14)</h4>
                  <p className="mb-4 text-sm text-text-secondary">
                    Liberação do óvulo maduro do ovário. É o momento de maior fertilidade do ciclo.
                  </p>

                  <h4 className="mb-3 font-semibold text-system-warning">🌙 Fase Lútea (Dias 15-28)</h4>
                  <p className="text-sm text-text-secondary">
                    O corpo se prepara para uma possível gravidez ou para o próximo ciclo menstrual.
                  </p>
                </div>
              </div>
            </div>

            {/* Período Fértil */}
            <div className="rounded-xl border border-system-success/20 bg-gray-900 p-6">
              <h3 className="mb-4 flex items-center text-xl font-bold text-system-success">
                🌱 Entendendo o Período Fértil
              </h3>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <h4 className="mb-3 font-semibold text-primary-blue-dark">📅 Duração</h4>
                  <p className="mb-4 text-sm text-text-secondary">
                    O período fértil dura aproximadamente 6 dias: 5 dias antes da ovulação e 1 dia após.
                  </p>

                  <h4 className="mb-3 font-semibold text-system-info">🎯 Identificação</h4>
                  <ul className="mb-4 space-y-1 text-sm text-text-secondary">
                    <li>• Aumento da temperatura basal</li>
                    <li>• Mudança na consistência do muco cervical</li>
                    <li>• Possível dor pélvica leve</li>
                  </ul>
                </div>

                <div>
                  <h4 className="mb-3 font-semibold text-system-success">💡 Importante Saber</h4>
                  <ul className="mb-4 space-y-1 text-sm text-text-secondary">
                    <li>• Espermatozoides sobrevivem até 5 dias</li>
                    <li>• Óvulo sobrevive 12-24 horas</li>
                    <li>• Ciclos podem variar naturalmente</li>
                  </ul>

                  <h4 className="mb-3 font-semibold text-system-warning">⚠️ Atenção Médica</h4>
                  <p className="text-sm text-text-secondary">
                    <strong>Importante:</strong> Esta calculadora é apenas informativa e educacional. 
                    Para planejamento familiar, contracepção ou questões de saúde reprodutiva, 
                    <strong>sempre consulte um médico ginecologista qualificado</strong>.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <FAQ
        title="Perguntas Frequentes - Calculadora de Ciclo Menstrual"
        items={[
          {
            question: "Como calcular o ciclo menstrual?",
            answer:
              "O ciclo menstrual é calculado do primeiro dia da menstruação até o dia anterior ao início da próxima menstruação. A duração média é de 28 dias, mas pode variar entre 21 e 35 dias.",
            borderColor: "health-red",
          },
          {
            question: "Como saber o período fértil?",
            answer:
              "O período fértil ocorre geralmente entre 5 dias antes e 1 dia após a ovulação. A ovulação acontece aproximadamente 14 dias antes da próxima menstruação.",
            borderColor: "system-success",
          },
          {
            question: "Quando acontece a ovulação?",
            answer:
              "A ovulação ocorre aproximadamente no meio do ciclo menstrual, cerca de 14 dias antes do início da próxima menstruação, independentemente da duração total do ciclo.",
            borderColor: "primary-blue",
          },
          {
            question: "O que é considerado um ciclo normal?",
            answer:
              "Um ciclo menstrual normal tem duração entre 21 e 35 dias, com menstruação durando de 3 a 7 dias. Variações ocasionais são normais, mas mudanças significativas devem ser avaliadas por um médico.",
            borderColor: "system-info",
          },
          {
            question: "A calculadora é confiável para contracepção?",
            answer:
              "Não! Esta calculadora é apenas informativa. Para contracepção ou planejamento familiar, consulte sempre um médico ginecologista para orientação adequada e métodos seguros.",
            borderColor: "system-error-dark",
          },
          {
            question: "Ciclos irregulares afetam o cálculo?",
            answer:
              "Sim. Ciclos muito irregulares podem tornar as previsões menos precisas. Recomenda-se acompanhar vários ciclos e consultar um profissional de saúde para avaliação adequada.",
            borderColor: "system-warning",
          },
        ]}
        tipSection={{
          title: "👩‍⚕️ Dica Médica para Acompanhamento Preciso",
          content:
            "<strong>Recomendação médica:</strong> Mantenha um diário menstrual por pelo menos 3-6 meses, anote sintomas e alterações, faça consultas preventivas anuais com ginecologista. Procure ajuda médica se houver ciclos muito irregulares, dor intensa ou sangramento anormal.",
        }}
        footerText="<strong>⚠️ Aviso Médico Importante:</strong> Esta ferramenta é apenas educacional. Cada mulher tem características únicas e ciclos naturalmente variáveis. Não substitui consulta médica profissional. Para questões de saúde reprodutiva, sempre procure um ginecologista."
      />

      {/* Footer com informações adicionais */}
      <Card className="border-l-4 border-health-red bg-health-red-soft duration-300">
        <CardHeader>
          <CardTitle as="h2" className="text-lg font-bold text-text-primary">
            📚 Como Usar Esta Calculadora de Ciclo Menstrual
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 text-sm text-text-secondary">
            <p>
              Esta{" "}
              <strong className="text-health-red">calculadora de ciclo menstrual</strong>{" "}
              utiliza <strong className="text-system-success">métodos baseados na duração média dos ciclos</strong>{" "}
              para estimar ovulação e período fértil. Os cálculos consideram que a ovulação ocorre 
              14 dias antes da próxima menstruação.
            </p>
            <p>
              <strong>Configurações disponíveis:</strong> Data da última menstruação, duração do ciclo 
              e duração da menstruação. A calculadora gera previsões para os próximos 6 ciclos.
            </p>
            <p>
              <strong className="text-system-error">⚠️ Aviso Médico:</strong> Esta ferramenta é 
              <strong>exclusivamente educacional e informativa</strong>. Não substitui consulta médica profissional. 
              Para planejamento familiar, contracepção, diagnósticos ou questões de saúde reprodutiva, 
              <strong>sempre consulte um médico ginecologista qualificado</strong>. Ciclos irregulares podem 
              indicar condições que requerem avaliação médica.
            </p>
            <p className="mt-4 border-t border-health-red/20 pt-3 text-xs opacity-75">
              📅 Cálculo preciso • 🌱 Período fértil • 🔒 Dados não armazenados • 📱
              Compatível com todos os dispositivos • 🌙 Interface otimizada
            </p>
          </div>
        </CardContent>
      </Card>

      <RelatedCalculators category="saude" currentCalculatorId="ciclo-menstrual" />
    </div>
  );
}