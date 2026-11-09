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
import { useAutoCalculatorTracking, useFormTracking } from "~/hooks/useAutoCalculatorTracking";
import { buildCalculatorMeta } from "~/lib/page-meta";

export const meta: MetaFunction = () => {
  return [
    ...buildCalculatorMeta("dias-uteis"),
  ];
};

interface Holiday {
  date: Date;
  name: string;
  type: "fixed" | "mobile";
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

  const getWeekdayName = (date: Date): string => {
    return new Intl.DateTimeFormat("pt-BR", {
      weekday: "long",
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
      { date: new Date(year, 0, 1), name: "Confraternização Universal", type: "fixed" as const },
      {
        date: new Date(year, 3, 21),
        name: "Tiradentes",
        type: "fixed" as const,
        bridgePossible: true,
      },
      {
        date: new Date(year, 4, 1),
        name: "Dia do Trabalhador",
        type: "fixed" as const,
        bridgePossible: true,
      },
      {
        date: new Date(year, 8, 7),
        name: "Independência do Brasil",
        type: "fixed" as const,
        bridgePossible: true,
      },
      {
        date: new Date(year, 9, 12),
        name: "Nossa Senhora Aparecida",
        type: "fixed" as const,
        bridgePossible: true,
      },
      {
        date: new Date(year, 10, 2),
        name: "Finados",
        type: "fixed" as const,
        bridgePossible: true,
      },
      {
        date: new Date(year, 10, 15),
        name: "Proclamação da República",
        type: "fixed" as const,
        bridgePossible: true,
      },
      {
        date: new Date(year, 10, 20),
        name: "Dia da Consciência Negra",
        type: "fixed" as const,
        bridgePossible: true,
      },
      { date: new Date(year, 11, 25), name: "Natal", type: "fixed" as const },
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
      { date: carnival1, name: "Segunda-feira de Carnaval", type: "mobile" as const },
      { date: carnival2, name: "Terça-feira de Carnaval", type: "mobile" as const },
      { date: goodFriday, name: "Sexta-feira Santa", type: "mobile" as const },
      {
        date: corpusChristi,
        name: "Corpus Christi",
        type: "mobile" as const,
        bridgePossible: true,
      },
    ];

    return [...fixedHolidays, ...mobileHolidays];
  };

  const isWeekday = (date: Date): boolean => {
    const day = date.getDay();
    return day >= 1 && day <= 5; // Monday to Friday
  };

  const isHoliday = (date: Date, holidays: Holiday[]): boolean => {
    return holidays.some(
      (holiday) =>
        holiday.date.getFullYear() === date.getFullYear() &&
        holiday.date.getMonth() === date.getMonth() &&
        holiday.date.getDate() === date.getDate()
    );
  };

  const checkBridge = (holiday: Holiday): boolean => {
    const dayOfWeek = holiday.date.getDay();
    return holiday.bridgePossible && (dayOfWeek === 2 || dayOfWeek === 4); // Tuesday or Thursday
  };

  const calculateWorkdays = (start: Date, end: Date): WorkdaysResult => {
    const diffTime = end.getTime() - start.getTime();
    const totalDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    // Get holidays for all years that the period spans
    const startYear = start.getFullYear();
    const endYear = end.getFullYear();
    let holidays: Holiday[] = [];

    for (let year = startYear; year <= endYear; year++) {
      holidays = [...holidays, ...getBrazilianHolidays(year)];
    }

    let workdays = 0;
    let weekends = 0;
    let holidayCount = 0;
    const holidaysInPeriod: Holiday[] = [];
    const bridges: Holiday[] = [];

    const current = new Date(start);
    while (current <= end) {
      const isWeekendDay = !isWeekday(current);
      const isHolidayDay = isHoliday(current, holidays);

      // Always add holidays to the list, regardless of weekday
      if (isHolidayDay) {
        const holiday = holidays.find(
          (h) =>
            h.date.getFullYear() === current.getFullYear() &&
            h.date.getMonth() === current.getMonth() &&
            h.date.getDate() === current.getDate()
        );
        if (holiday && !holidaysInPeriod.find((h) => h.date.getTime() === holiday.date.getTime())) {
          holidaysInPeriod.push(holiday);
          if (checkBridge(holiday)) {
            bridges.push(holiday);
          }
        }
      }

      // Count for workdays calculation
      if (isWeekendDay) {
        weekends++;
      } else if (isHolidayDay) {
        holidayCount++;
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
      year: startYear,
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
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: "Calculadora de Dias Úteis 2026",
            description:
              "Calcule dias úteis entre datas com feriados nacionais brasileiros! Inclui Carnaval, Páscoa, emendas e pontes. Algoritmo Gauss preciso 2026.",
            url: "https://www.calculadoraonlinebr.com.br/calculadoras/datas/dias-uteis",
            inLanguage: "pt-BR",
            isPartOf: {
              "@type": "WebSite",
              name: "CalculadoraOnlineBR",
              url: "https://www.calculadoraonlinebr.com.br",
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
                  name: "Calculadora de Dias Úteis",
                  item: "https://www.calculadoraonlinebr.com.br/calculadoras/datas/dias-uteis",
                },
              ],
            },
            mainEntity: {
              "@type": "SoftwareApplication",
              name: "Calculadora de Dias Úteis",
              description:
                "Ferramenta online para calcular dias úteis considerando feriados nacionais brasileiros",
              applicationCategory: "BusinessApplication",
              operatingSystem: "Web Browser",
              offers: {
                "@type": "Offer",
                price: "0",
                priceCurrency: "BRL",
              },
              featureList: [
                "Cálculo de dias úteis entre datas",
                "Feriados nacionais brasileiros",
                "Algoritmo de Gauss para Páscoa",
                "Detecção automática de emendas",
                "Calendário 2026 atualizado",
              ],
            },
          }),
        }}
      />

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
          Calculadora de Dias Úteis 2026 – Feriados Nacionais e Emendas
        </h1>
        <p className="mx-auto max-w-3xl text-lg text-text-secondary-dark">
          Calcule <strong className="text-growth-green">dias úteis entre datas</strong> considerando{" "}
          <strong className="text-primary-blue-dark">feriados nacionais brasileiros</strong>,
          Carnaval, Páscoa e possíveis emendas com precisão.
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

              <div className="mb-4 text-center">
                <p className="text-sm text-text-secondary">
                  ⚠️ Período máximo: 1 ano | Inclui feriados nacionais e emendas automáticas
                </p>
              </div>

              <div className="flex justify-center space-x-4">
                <Button onClick={handleCalculate} className="px-8" type="button">
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
                      <div className="text-4xl font-bold text-growth-green">{result.workdays}</div>
                      <div className="text-sm text-text-secondary">Dias Úteis</div>
                    </div>
                    <div className="rounded-lg bg-gray-900 p-6 text-center">
                      <div className="text-2xl font-bold text-system-info">{result.weekends}</div>
                      <div className="text-sm text-text-secondary">Finais de Semana</div>
                    </div>
                    <div className="rounded-lg bg-gray-900 p-6 text-center">
                      <div className="text-2xl font-bold text-system-error">{result.holidays}</div>
                      <div className="text-sm text-text-secondary">Feriados</div>
                    </div>
                    <div className="rounded-lg bg-gray-900 p-6 text-center">
                      <div className="text-2xl font-bold text-system-warning">
                        {result.bridges.length}
                      </div>
                      <div className="text-sm text-text-secondary">Emendas Possíveis</div>
                    </div>
                  </div>

                  <div className="mb-4 rounded-lg bg-primary-blue-light p-4">
                    <h4 className="mb-2 font-semibold text-primary-blue-dark">📋 Resumo</h4>
                    <p className="text-sm text-text-secondary">
                      <strong>Período:</strong> {result.startDate} até {result.endDate} (
                      {result.year})
                    </p>
                    <p className="text-sm text-text-secondary">
                      <strong>Total:</strong> {result.summary}
                    </p>
                  </div>

                  {result.holidayList.length > 0 && (
                    <div className="mb-4 rounded-lg bg-system-error/10 p-4">
                      <h4 className="mb-2 font-semibold text-system-error">
                        🎊 Feriados no Período
                      </h4>
                      <div className="space-y-1">
                        {result.holidayList.map((holiday, index) => {
                          const isWeekend =
                            holiday.date.getDay() === 0 || holiday.date.getDay() === 6;
                          return (
                            <p key={index} className="text-sm text-text-secondary">
                              <strong>{formatDateBR(holiday.date)}</strong> (
                              {getWeekdayName(holiday.date)}) - {holiday.name}
                              {holiday.type === "mobile" && (
                                <span className="text-system-info"> (móvel)</span>
                              )}
                              {isWeekend && (
                                <span className="text-neutral-400"> (final de semana)</span>
                              )}
                            </p>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {result.bridges.length > 0 && (
                    <div className="rounded-lg bg-system-warning/10 p-4">
                      <h4 className="mb-2 font-semibold text-system-warning">
                        🌉 Possíveis Emendas
                      </h4>
                      <div className="space-y-1">
                        {result.bridges.map((bridge, index) => (
                          <p key={index} className="text-sm text-text-secondary">
                            <strong>{formatDateBR(bridge.date)}</strong> (
                            {getWeekdayName(bridge.date)}) - {bridge.name}
                            <span className="text-system-warning"> (emenda possível)</span>
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

      {/* Seção: Como Funciona o Cálculo de Dias Úteis */}
      <Card className="border-l-4 border-primary-blue bg-gradient-to-r from-primary-blue-light to-growth-green-soft duration-300">
        <CardHeader>
          <CardTitle as="h2" className="text-2xl font-bold text-text-primary">
            🎯 Como Funciona o Cálculo de Dias Úteis no Brasil
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-8">
            {/* Algoritmo de Cálculo */}
            <div className="rounded-xl border border-primary-blue/20 bg-gray-900 p-6">
              <h3 className="mb-4 flex items-center text-xl font-bold text-primary-blue-dark">
                ⚙️ Algoritmo de Cálculo Preciso
              </h3>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <h4 className="mb-3 font-semibold text-growth-green">🔍 Método de Contagem</h4>
                  <ul className="mb-4 space-y-2 text-sm text-text-secondary">
                    <li>• Conta apenas segunda a sexta-feira como dias úteis</li>
                    <li>• Exclui automaticamente sábados e domingos</li>
                    <li>• Remove feriados nacionais que caem em dias úteis</li>
                    <li>• Considera feriados móveis calculados pelo Algoritmo de Gauss</li>
                  </ul>

                  <h4 className="mb-3 font-semibold text-system-info">
                    📊 Algoritmo de Gauss para Páscoa
                  </h4>
                  <p className="mb-4 text-sm text-text-secondary">
                    Utilizamos o algoritmo matemático de Carl Friedrich Gauss para calcular com
                    precisão a data da Páscoa e todos os feriados móveis derivados.
                  </p>
                </div>

                <div>
                  <h4 className="mb-3 font-semibold text-system-success">✅ Feriados Incluídos</h4>
                  <div className="mb-4 space-y-1 text-sm text-text-secondary">
                    <p>
                      <strong>Fixos:</strong> Confraternização, Tiradentes, Trabalhador,
                      Independência, etc.
                    </p>
                    <p>
                      <strong>Móveis:</strong> Carnaval, Sexta-feira Santa, Corpus Christi
                    </p>
                    <p>
                      <strong>Recentes:</strong> Dia da Consciência Negra (2024+)
                    </p>
                  </div>

                  <h4 className="mb-3 font-semibold text-system-warning">🌉 Detecção de Emendas</h4>
                  <p className="text-sm text-text-secondary">
                    Identifica automaticamente feriados que caem em terças ou quintas-feiras,
                    criando oportunidades para emendas (pontes) de 4 dias consecutivos.
                  </p>
                </div>
              </div>
            </div>

            {/* Tipos de Feriados */}
            <div className="rounded-xl border border-growth-green/20 bg-gray-900 p-6">
              <h3 className="mb-4 flex items-center text-xl font-bold text-growth-green">
                🗓️ Tipos de Feriados Brasileiros
              </h3>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                <div>
                  <h4 className="mb-3 font-semibold text-primary-blue-dark">📅 Feriados Fixos</h4>
                  <ul className="mb-4 space-y-1 text-sm text-text-secondary">
                    <li>• Confraternização Universal (1/1)</li>
                    <li>• Tiradentes (21/4)</li>
                    <li>• Dia do Trabalhador (1/5)</li>
                    <li>• Independência do Brasil (7/9)</li>
                    <li>• Nossa Senhora Aparecida (12/10)</li>
                    <li>• Finados (2/11)</li>
                    <li>• Proclamação da República (15/11)</li>
                    <li>• Consciência Negra (20/11)</li>
                    <li>• Natal (25/12)</li>
                  </ul>
                </div>

                <div>
                  <h4 className="mb-3 font-semibold text-system-warning">🌙 Feriados Móveis</h4>
                  <ul className="mb-4 space-y-1 text-sm text-text-secondary">
                    <li>• Segunda-feira de Carnaval</li>
                    <li>• Terça-feira de Carnaval</li>
                    <li>• Sexta-feira Santa</li>
                    <li>• Corpus Christi</li>
                  </ul>
                  <p className="text-xs text-neutral-400">
                    Baseados no cálculo da Páscoa pelo Algoritmo de Gauss
                  </p>
                </div>

                <div>
                  <h4 className="mb-3 font-semibold text-system-info">🔗 Emendas Possíveis</h4>
                  <p className="mb-2 text-sm text-text-secondary">Feriados que caem em:</p>
                  <ul className="mb-4 space-y-1 text-sm text-text-secondary">
                    <li>
                      • <strong>Terça-feira:</strong> Emenda de 4 dias
                    </li>
                    <li>
                      • <strong>Quinta-feira:</strong> Emenda de 4 dias
                    </li>
                  </ul>
                  <p className="text-xs text-neutral-400">Criando fins de semana prolongados</p>
                </div>
              </div>
            </div>

            {/* Aplicações Práticas */}
            <div className="rounded-xl border border-system-warning/20 bg-gray-900 p-6">
              <h3 className="mb-4 flex items-center text-xl font-bold text-system-warning">
                💼 Aplicações Práticas do Cálculo
              </h3>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <h4 className="mb-3 font-semibold text-growth-green">🏢 Empresarial</h4>
                  <ul className="mb-4 space-y-1 text-sm text-text-secondary">
                    <li>• Planejamento de projetos e entregas</li>
                    <li>• Cálculo de prazos contratuais</li>
                    <li>• Gestão de cronogramas de trabalho</li>
                    <li>• Previsão de dias produtivos</li>
                  </ul>

                  <h4 className="mb-3 font-semibold text-system-info">💰 Financeiro</h4>
                  <ul className="space-y-1 text-sm text-text-secondary">
                    <li>• Cálculo de juros em dias úteis</li>
                    <li>• Prazos de vencimento de títulos</li>
                    <li>• Compensação bancária</li>
                  </ul>
                </div>

                <div>
                  <h4 className="mb-3 font-semibold text-primary-blue-dark">⚖️ Jurídico</h4>
                  <ul className="mb-4 space-y-1 text-sm text-text-secondary">
                    <li>• Contagem de prazos processuais</li>
                    <li>• Recursos e manifestações</li>
                    <li>• Cumprimento de decisões</li>
                  </ul>

                  <h4 className="mb-3 font-semibold text-system-success">👥 Pessoal</h4>
                  <ul className="space-y-1 text-sm text-text-secondary">
                    <li>• Planejamento de férias e viagens</li>
                    <li>• Organização de eventos</li>
                    <li>• Controle de compromissos</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tabela de Feriados 2026 */}
      <Card className="border border-neutral-surface-variant bg-background-dark-secondary duration-300">
        <CardHeader>
          <CardTitle as="h2" className="text-xl font-bold text-text-primary">
            📋 Calendário de Feriados Nacionais 2026
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="border-b-2 border-neutral-surface-variant">
                  <th className="p-3 text-left font-semibold">Data</th>
                  <th className="p-3 text-left font-semibold">Dia da Semana</th>
                  <th className="p-3 text-left font-semibold">Feriado</th>
                  <th className="p-3 text-center font-semibold">Tipo</th>
                  <th className="p-3 text-center font-semibold">Emenda</th>
                </tr>
              </thead>
              <tbody className="space-y-2">
                <tr className="border-b border-neutral-surface-variant">
                  <td className="p-3 font-medium">01/01</td>
                  <td className="p-3">Quarta-feira</td>
                  <td className="p-3">Confraternização Universal</td>
                  <td className="p-3 text-center text-primary-blue-dark">Fixo</td>
                  <td className="p-3 text-center">-</td>
                </tr>
                <tr className="border-b border-neutral-surface-variant">
                  <td className="p-3 font-medium">03/03</td>
                  <td className="p-3">Segunda-feira</td>
                  <td className="p-3">Segunda-feira de Carnaval</td>
                  <td className="p-3 text-center text-system-warning">Móvel</td>
                  <td className="p-3 text-center">-</td>
                </tr>
                <tr className="border-b border-neutral-surface-variant">
                  <td className="p-3 font-medium">04/03</td>
                  <td className="p-3">Terça-feira</td>
                  <td className="p-3">Terça-feira de Carnaval</td>
                  <td className="p-3 text-center text-system-warning">Móvel</td>
                  <td className="p-3 text-center text-system-warning">✓</td>
                </tr>
                <tr className="border-b border-neutral-surface-variant">
                  <td className="p-3 font-medium">18/04</td>
                  <td className="p-3">Sexta-feira</td>
                  <td className="p-3">Sexta-feira Santa</td>
                  <td className="p-3 text-center text-system-warning">Móvel</td>
                  <td className="p-3 text-center">-</td>
                </tr>
                <tr className="border-b border-neutral-surface-variant">
                  <td className="p-3 font-medium">21/04</td>
                  <td className="p-3">Segunda-feira</td>
                  <td className="p-3">Tiradentes</td>
                  <td className="p-3 text-center text-primary-blue-dark">Fixo</td>
                  <td className="p-3 text-center">-</td>
                </tr>
                <tr className="border-b border-neutral-surface-variant">
                  <td className="p-3 font-medium">01/05</td>
                  <td className="p-3">Quinta-feira</td>
                  <td className="p-3">Dia do Trabalhador</td>
                  <td className="p-3 text-center text-primary-blue-dark">Fixo</td>
                  <td className="p-3 text-center text-system-warning">✓</td>
                </tr>
                <tr className="border-b border-neutral-surface-variant">
                  <td className="p-3 font-medium">19/06</td>
                  <td className="p-3">Quinta-feira</td>
                  <td className="p-3">Corpus Christi</td>
                  <td className="p-3 text-center text-system-warning">Móvel</td>
                  <td className="p-3 text-center text-system-warning">✓</td>
                </tr>
                <tr className="border-b border-neutral-surface-variant">
                  <td className="p-3 font-medium">07/09</td>
                  <td className="p-3">Domingo</td>
                  <td className="p-3">Independência do Brasil</td>
                  <td className="p-3 text-center text-primary-blue-dark">Fixo</td>
                  <td className="p-3 text-center text-neutral-400">FDS</td>
                </tr>
                <tr className="border-b border-neutral-surface-variant">
                  <td className="p-3 font-medium">12/10</td>
                  <td className="p-3">Domingo</td>
                  <td className="p-3">Nossa Senhora Aparecida</td>
                  <td className="p-3 text-center text-primary-blue-dark">Fixo</td>
                  <td className="p-3 text-center text-neutral-400">FDS</td>
                </tr>
                <tr className="border-b border-neutral-surface-variant">
                  <td className="p-3 font-medium">02/11</td>
                  <td className="p-3">Domingo</td>
                  <td className="p-3">Finados</td>
                  <td className="p-3 text-center text-primary-blue-dark">Fixo</td>
                  <td className="p-3 text-center text-neutral-400">FDS</td>
                </tr>
                <tr className="border-b border-neutral-surface-variant">
                  <td className="p-3 font-medium">15/11</td>
                  <td className="p-3">Sábado</td>
                  <td className="p-3">Proclamação da República</td>
                  <td className="p-3 text-center text-primary-blue-dark">Fixo</td>
                  <td className="p-3 text-center text-neutral-400">FDS</td>
                </tr>
                <tr className="border-b border-neutral-surface-variant">
                  <td className="p-3 font-medium">20/11</td>
                  <td className="p-3">Quinta-feira</td>
                  <td className="p-3">Dia da Consciência Negra</td>
                  <td className="p-3 text-center text-primary-blue-dark">Fixo</td>
                  <td className="p-3 text-center text-system-warning">✓</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium">25/12</td>
                  <td className="p-3">Quinta-feira</td>
                  <td className="p-3">Natal</td>
                  <td className="p-3 text-center text-primary-blue-dark">Fixo</td>
                  <td className="p-3 text-center text-system-warning">✓</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className="rounded-lg border border-primary-blue/20 bg-primary-blue-light p-4">
              <h4 className="mb-2 font-bold text-primary-blue-dark">📅 Feriados Fixos</h4>
              <p className="text-sm text-text-secondary">
                Data sempre a mesma, mas o dia da semana varia a cada ano.
              </p>
            </div>

            <div className="rounded-lg border border-system-warning/20 bg-system-warning/10 p-4">
              <h4 className="mb-2 font-bold text-system-warning">🌙 Feriados Móveis</h4>
              <p className="text-sm text-text-secondary">
                Calculados a partir da Páscoa usando o Algoritmo de Gauss.
              </p>
            </div>

            <div className="rounded-lg border border-growth-green/20 bg-growth-green-soft p-4">
              <h4 className="mb-2 font-bold text-growth-green">🌉 Emendas 2026</h4>
              <p className="text-sm text-text-secondary">
                <strong>6 oportunidades</strong> de emendas com fins de semana prolongados.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* FAQ Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: "O que são dias úteis?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Dias úteis são os dias da semana em que normalmente se trabalha, ou seja, de segunda a sexta-feira, excluindo feriados nacionais. No Brasil, não contamos sábados, domingos nem feriados oficiais.",
                },
              },
              {
                "@type": "Question",
                name: "Como é calculada a Páscoa?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Utilizamos o Algoritmo de Gauss, uma fórmula matemática que calcula com precisão a data da Páscoa para qualquer ano. A partir desta data, derivamos outros feriados móveis como Carnaval, Sexta-feira Santa e Corpus Christi.",
                },
              },
              {
                "@type": "Question",
                name: "Quais feriados são incluídos no cálculo?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Incluímos todos os feriados nacionais brasileiros: Confraternização Universal, Carnaval, Sexta-feira Santa, Tiradentes, Dia do Trabalhador, Corpus Christi, Independência, Nossa Senhora Aparecida, Finados, Proclamação da República, Consciência Negra e Natal.",
                },
              },
              {
                "@type": "Question",
                name: "O que são emendas de feriados?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Emendas são oportunidades de fins de semana prolongados quando um feriado cai em terça ou quinta-feira, permitindo 'fazer a ponte' com o fim de semana para criar um período de 4 dias consecutivos de descanso.",
                },
              },
              {
                "@type": "Question",
                name: "Por que alguns feriados não afetam os dias úteis?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Feriados que caem em sábados ou domingos já são fins de semana, então não reduzem o número de dias úteis. Nossa calculadora mostra todos os feriados do período, indicando quais caem em fins de semana.",
                },
              },
              {
                "@type": "Question",
                name: "A calculadora considera feriados estaduais ou municipais?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Não, nossa calculadora considera apenas feriados nacionais brasileiros. Para cálculos que incluem feriados regionais, consulte o calendário oficial do seu estado ou município.",
                },
              },
            ],
          }),
        }}
      />

      <FAQ
        title="Perguntas Frequentes - Calculadora de Dias Úteis"
        items={[
          {
            question: "O que são dias úteis?",
            answer:
              "Dias úteis são os dias da semana em que normalmente se trabalha, ou seja, de segunda a sexta-feira, excluindo feriados nacionais. No Brasil, não contamos sábados, domingos nem feriados oficiais.",
            borderColor: "primary-blue",
          },
          {
            question: "Como é calculada a Páscoa?",
            answer:
              "Utilizamos o Algoritmo de Gauss, uma fórmula matemática que calcula com precisão a data da Páscoa para qualquer ano. A partir desta data, derivamos outros feriados móveis como Carnaval, Sexta-feira Santa e Corpus Christi.",
            borderColor: "growth-green",
          },
          {
            question: "Quais feriados são incluídos no cálculo?",
            answer:
              "Incluímos todos os feriados nacionais brasileiros: Confraternização Universal, Carnaval, Sexta-feira Santa, Tiradentes, Dia do Trabalhador, Corpus Christi, Independência, Nossa Senhora Aparecida, Finados, Proclamação da República, Consciência Negra e Natal.",
            borderColor: "system-info",
          },
          {
            question: "O que são emendas de feriados?",
            answer:
              "Emendas são oportunidades de fins de semana prolongados quando um feriado cai em terça ou quinta-feira, permitindo 'fazer a ponte' com o fim de semana para criar um período de 4 dias consecutivos de descanso.",
            borderColor: "system-warning",
          },
          {
            question: "Por que alguns feriados não afetam os dias úteis?",
            answer:
              "Feriados que caem em sábados ou domingos já são fins de semana, então não reduzem o número de dias úteis. Nossa calculadora mostra todos os feriados do período, indicando quais caem em fins de semana.",
            borderColor: "growth-green",
          },
          {
            question: "A calculadora considera feriados estaduais ou municipais?",
            answer:
              "Não, nossa calculadora considera apenas feriados nacionais brasileiros. Para cálculos que incluem feriados regionais, consulte o calendário oficial do seu estado ou município.",
            borderColor: "system-error-dark",
          },
        ]}
        tipSection={{
          title: "Dica Estratégica",
          content:
            "<strong>Para planejamento eficiente:</strong> Use esta calculadora ao definir prazos de projetos, cronogramas de entrega e planejamento de férias. Considere sempre as emendas de feriados para otimizar seu calendário.",
        }}
        footerText="<strong>Importante:</strong> Para cálculos jurídicos ou contratuais, sempre consulte a legislação específica e considere feriados locais que possam afetar prazos."
      />

      {/* Footer com informações da ferramenta */}
      <Card className="border-l-4 border-primary-blue bg-primary-blue-light duration-300">
        <CardHeader>
          <CardTitle as="h2" className="text-lg font-bold text-text-primary">
            📚 Como Usar Esta Calculadora de Dias Úteis
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 text-sm text-text-secondary">
            <p>
              Esta <strong className="text-primary-blue-dark">calculadora de dias úteis</strong>{" "}
              utiliza <strong className="text-growth-green">algoritmos matemáticos precisos</strong>{" "}
              para calcular dias úteis considerando todos os feriados nacionais brasileiros e
              possíveis emendas.
            </p>
            <p>
              <strong>Algoritmos utilizados:</strong> Algoritmo de Gauss para cálculo da Páscoa,
              detecção automática de emendas e contagem precisa de dias úteis conforme calendário
              brasileiro oficial.
            </p>
            <p>
              <strong className="text-system-warning">Importante:</strong> Esta ferramenta considera
              apenas feriados nacionais. Para cálculos jurídicos ou que exigem feriados regionais,
              consulte sempre
              <strong> calendários oficiais locais</strong> e legislação específica.
            </p>
            <p className="mt-4 border-t border-primary-blue/20 pt-3 text-xs opacity-75">
              🔎 Algoritmo de Gauss • 🇧🇷 Feriados Brasileiros • 🌉 Detecção de Emendas • 📱
              Mobile-First • 🌙 Modo Escuro • 🔒 Dados Não Armazenados
            </p>
          </div>
        </CardContent>
      </Card>

      <aside aria-label="Calculadoras relacionadas" className="mt-12">
        <RelatedCalculators category="datas" currentCalculatorId="dias-uteis" />
      </aside>
    </div>
  );
}
