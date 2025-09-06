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
      content: "Calculadora de Dias Úteis 2025 – Feriados e Emendas Brasil",
    },
    {
      name: "twitter:description",
      content:
        "📅 Calcule dias úteis com feriados nacionais! Carnaval, Páscoa, emendas automáticas. Algoritmo Gauss preciso 2025.",
    },
    {
      name: "twitter:image",
      content: "https://www.calculadoraonlinebr.com.br/images/calculadora-dias-uteis.webp",
    },
    {
      name: "twitter:image:alt",
      content: "Calculadora de dias úteis com feriados brasileiros",
    },
    { name: "twitter:site", content: "@CalculadoraBR" },
    { name: "twitter:creator", content: "@CalculadoraBR" },
    { name: "theme-color", content: "#64B5F6" },
    { httpEquiv: "content-language", content: "pt-br" },
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

  const ErrorMessage = ({ error }: { error?: string }) =>
    error ? <div className="mt-1 text-sm text-system-error">{error}</div> : null;

  return (
    <div className="mx-auto max-w-2xl space-y-8 px-4 md:max-w-4xl lg:max-w-6xl" lang="pt-BR">
      <nav aria-label="Navegação estrutural">
        <Breadcrumb>
          <BreadcrumbItem href="/">Início</BreadcrumbItem>
          <BreadcrumbItem href="/calculadoras">Calculadoras</BreadcrumbItem>
          <BreadcrumbItem href="/calculadoras/datas">Datas</BreadcrumbItem>
          <BreadcrumbItem isLast>Calculadora de Dias Úteis</BreadcrumbItem>
        </Breadcrumb>
      </nav>

      <header className="space-y-4 text-center">
        <h1 className="mb-4 text-3xl font-bold text-text-primary md:text-4xl">
          Calculadora de Dias Úteis 2025 – Feriados Nacionais e Emendas
        </h1>
        <p className="mx-auto max-w-3xl text-lg text-text-secondary-dark">
          Calcule <strong className="text-growth-green">dias úteis entre datas</strong> considerando{" "}
          <strong className="text-primary-blue-dark">feriados nacionais brasileiros</strong>, Carnaval, Páscoa e possíveis emendas com precisão.
        </p>
        <div className="inline-block rounded-lg bg-growth-green-soft p-4 duration-300">
          <p className="text-sm font-medium text-text-primary">
            📊 <strong>Dias Úteis</strong> • 🇧🇷 <strong>Feriados Brasil</strong> • 🔗{" "}
            <strong>Detecção de Emendas</strong>
          </p>
        </div>
      </header>

      <main className="space-y-8">
        <section aria-labelledby="calculator-section">
          <Card>
            <CardHeader>
              <CardTitle as="h2" id="calculator-section">
                📅 Configure o Período para Cálculo
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <Input
                    type="date"
                    label="📅 Data Inicial"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    fullWidth
                    className="h-12 text-lg"
                    required
                  />
                  <ErrorMessage error={errors.startDate} />
                </div>
                
                <div>
                  <Input
                    type="date"
                    label="📅 Data Final"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    fullWidth
                    className="h-12 text-lg"
                    required
                  />
                  <ErrorMessage error={errors.endDate} />
                </div>
              </div>

              {errors.general && (
                <div className="mb-4 text-center">
                  <ErrorMessage error={errors.general} />
                </div>
              )}

              <div className="text-center mb-4">
                <p className="text-sm text-text-secondary">
                  ⚠️ Período máximo: 1 ano | Inclui feriados nacionais e emendas automáticas
                </p>
              </div>

              <div className="flex justify-center space-x-4">
                <Button
                  onClick={handleCalculate}
                  className="px-8"
                  type="button"
                >
                  📊 Calcular Dias Úteis
                </Button>
                <Button
                  onClick={handleReset}
                  variant="outline"
                  className="border-system-error px-8 text-system-error hover:bg-system-error hover:text-white"
                  type="button"
                >
                  🔄 Limpar
                </Button>
              </div>
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
                    📊 Resultado - Dias Úteis no Brasil
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="mb-6 grid grid-cols-2 gap-6 md:grid-cols-4">
                    <div className="rounded-lg bg-gray-900 p-6 text-center">
                      <div className="text-4xl font-bold text-growth-green">
                        {result.workdays}
                      </div>
                      <div className="text-sm text-text-secondary">Dias Úteis</div>
                    </div>
                    <div className="rounded-lg bg-gray-900 p-6 text-center">
                      <div className="text-2xl font-bold text-system-info">
                        {result.weekends}
                      </div>
                      <div className="text-sm text-text-secondary">Finais de Semana</div>
                    </div>
                    <div className="rounded-lg bg-gray-900 p-6 text-center">
                      <div className="text-2xl font-bold text-system-error">
                        {result.holidays}
                      </div>
                      <div className="text-sm text-text-secondary">Feriados</div>
                    </div>
                    <div className="rounded-lg bg-gray-900 p-6 text-center">
                      <div className="text-2xl font-bold text-system-warning">
                        {result.bridges.length}
                      </div>
                      <div className="text-sm text-text-secondary">Emendas Possíveis</div>
                    </div>
                  </div>

                  <div className="rounded-lg bg-primary-blue-light p-4 mb-4">
                    <h4 className="mb-2 font-semibold text-primary-blue-dark">📋 Resumo</h4>
                    <p className="text-sm text-text-secondary">
                      <strong>Período:</strong> {result.startDate} até {result.endDate} ({result.year})
                    </p>
                    <p className="text-sm text-text-secondary">
                      <strong>Total:</strong> {result.summary}
                    </p>
                  </div>

                  {result.holidayList.length > 0 && (
                    <div className="rounded-lg bg-system-error/10 p-4 mb-4">
                      <h4 className="mb-2 font-semibold text-system-error">🎊 Feriados no Período</h4>
                      <div className="space-y-1">
                        {result.holidayList.map((holiday, index) => (
                          <p key={index} className="text-sm text-text-secondary">
                            <strong>{formatDateBR(holiday.date)}</strong> - {holiday.name} 
                            {holiday.type === 'mobile' && <span className="text-system-info"> (móvel)</span>}
                          </p>
                        ))}
                      </div>
                    </div>
                  )}

                  {result.bridges.length > 0 && (
                    <div className="rounded-lg bg-system-warning/10 p-4">
                      <h4 className="mb-2 font-semibold text-system-warning">🌉 Possíveis Emendas</h4>
                      <div className="space-y-1">
                        {result.bridges.map((bridge, index) => (
                          <p key={index} className="text-sm text-text-secondary">
                            <strong>{formatDateBR(bridge.date)}</strong> - {bridge.name} 
                            <span className="text-system-warning"> (cai na {bridge.date.getDay() === 2 ? 'terça' : 'quinta'})</span>
                          </p>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </section>
        )}
      </main>

      <aside aria-label="Calculadoras relacionadas" className="mt-12">
        <RelatedCalculators category="datas" currentCalculatorId="dias-uteis" />
      </aside>
    </div>
  );
}