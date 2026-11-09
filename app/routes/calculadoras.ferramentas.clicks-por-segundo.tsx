import type { MetaFunction } from "@remix-run/node";
import { useEffect, useRef, useState, useMemo, useCallback } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  Button,
  Breadcrumb,
  BreadcrumbItem,
} from "~/components/ui";
import { RelatedCalculators, FAQ } from "~/components";
import { useAutoCalculatorTracking, useFormTracking } from "~/hooks/useAutoCalculatorTracking";
import { buildCalculatorMeta } from "~/lib/page-meta";

export const meta: MetaFunction = () => {
  return [
    ...buildCalculatorMeta("clicks-por-segundo"),
    {
      "script:ld+json": {
        "@context": "https://schema.org",
        "@type": "WebApplication",
        name: "Teste CPS - Clicks Por Segundo 2026",
        description:
          "Ferramenta avançada para testar velocidade de clique com análise de padrões, rankings e treinamento adaptativo. CPS com gamificação completa.",
        url: "https://www.calculadoraonlinebr.com.br/calculadoras/ferramentas/clicks-por-segundo",
        applicationCategory: "GameApplication",
        operatingSystem: "Web Browser",
        isAccessibleForFree: true,
        inLanguage: "pt-BR",
        dateModified: "2025-01-27",
        datePublished: "2025-01-27",
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
        about: {
          "@type": "Thing",
          name: "Teste CPS",
          description: "Ferramenta para medir velocidade de clique com análise avançada",
          category: "GameApplication",
        },
        featureList: [
          "Teste de velocidade de clique CPS",
          "Análise de padrão de cliques",
          "Rankings e classificações",
          "Treinamento adaptativo",
          "Gamificação completa",
          "Múltiplas durações de teste",
          "Interface responsiva",
          "Histórico de performance",
        ],
      },
    },
    {
      "script:ld+json": {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "@id": "https://www.calculadoraonlinebr.com.br/calculadoras/ferramentas/clicks-por-segundo",
        name: "Teste CPS 2026 - Clicks Por Segundo Avançado",
        description: "Teste sua velocidade de clique com análise de padrões e rankings em tempo real.",
        inLanguage: "pt-BR",
        isPartOf: {
          "@type": "WebSite",
          name: "CalculadoraOnlineBR",
          url: "https://www.calculadoraonlinebr.com.br",
          description: "Calculadoras online gratuitas para facilitar seu dia a dia",
        },
        mainEntity: {
          "@type": "WebApplication",
          name: "Teste CPS - Clicks Por Segundo 2026"
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
              name: "Ferramentas",
              item: "https://www.calculadoraonlinebr.com.br/calculadoras/ferramentas",
            },
            {
              "@type": "ListItem",
              position: 4,
              name: "Teste CPS",
              item: "https://www.calculadoraonlinebr.com.br/calculadoras/ferramentas/clicks-por-segundo",
            },
          ],
        },
      },
    },
    {
      "script:ld+json": {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: [
          {
            "@type": "Question",
            name: "O que é CPS (Clicks Por Segundo)?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "CPS significa Clicks Por Segundo e mede quantos cliques você consegue fazer em um período determinado. É usado para testar velocidade de clique, reflexos e técnicas de clique rápido. Um bom CPS varia de 5-15 dependendo da técnica utilizada.",
            },
          },
          {
            "@type": "Question",
            name: "Como melhorar meu CPS?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Para melhorar seu CPS: pratique técnicas como jitter click (6-12 CPS), butterfly click (12-20 CPS), use mouse gamer adequado, mantenha postura correta e treine regularmente com diferentes durações de teste.",
            },
          },
          {
            "@type": "Question",
            name: "Como funciona a análise de cliques?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "O sistema analisa padrões de clique, intervalos temporais, consistência e detecta automaticamente a técnica utilizada (Regular, Jitter, Butterfly ou Drag Click) para fornecer análise detalhada de performance.",
            },
          },
          {
            "@type": "Question",
            name: "Qual é um bom score de CPS?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Um bom score de CPS varia: Regular Click (3-6 CPS), Jitter Click (6-12 CPS), Butterfly Click (12-20 CPS), Drag Click (15+ CPS). Para iniciantes, 5-7 CPS é excelente. O importante é a consistência.",
            },
          },
          {
            "@type": "Question",
            name: "O teste CPS é gratuito?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Sim, nosso teste CPS é 100% gratuito e não requer cadastro. Oferece análise completa de performance, rankings, múltiplas durações de teste e histórico detalhado.",
            },
          },
        ],
      },
    },
  ];
};

interface ClickData {
  timestamp: number;
  x: number;
  y: number;
}

interface TestResult {
  cps: number;
  totalClicks: number;
  duration: number;
  clickData: ClickData[];
  technique: string;
  consistency: number;
  rank: string;
  percentile: number;
  analysis: {
    averageInterval: number;
    intervalVariance: number;
    peakCPS: number;
    fatigueDetected: boolean;
  };
}

interface TestDuration {
  seconds: number;
  label: string;
  description: string;
}

const TEST_DURATIONS: TestDuration[] = [
  { seconds: 1, label: "1s", description: "Sprint - Velocidade máxima" },
  { seconds: 5, label: "5s", description: "Rápido - Teste padrão" },
  { seconds: 10, label: "10s", description: "Médio - Consistência" },
  { seconds: 30, label: "30s", description: "Longo - Resistência" },
  { seconds: 60, label: "60s", description: "Maratona - Extremo" },
  { seconds: 100, label: "100s", description: "Ultra - Profissional" },
];

const CPS_RANKS = [
  { min: 0, max: 3, name: "Turtle", emoji: "🐢", color: "text-system-error" },
  { min: 3, max: 6, name: "Rabbit", emoji: "🐰", color: "text-system-warning" },
  { min: 6, max: 9, name: "Panther", emoji: "🐆", color: "text-system-info" },
  { min: 9, max: 12, name: "Eagle", emoji: "🦅", color: "text-system-success" },
  { min: 12, max: 15, name: "Lightning", emoji: "⚡", color: "text-primary-blue" },
  { min: 15, max: 20, name: "Sonic", emoji: "💨", color: "text-growth-green" },
  { min: 20, max: Infinity, name: "God", emoji: "👑", color: "text-gold" },
];

export default function CPSTest() {
  const [selectedDuration, setSelectedDuration] = useState<number>(5);
  const [isActive, setIsActive] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  const [clickCount, setClickCount] = useState(0);
  const [clickData, setClickData] = useState<ClickData[]>([]);
  const [testResult, setTestResult] = useState<TestResult | null>(null);
  const [testHistory, setTestHistory] = useState<TestResult[]>([]);
  const [isReady, setIsReady] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [isCountingDown, setIsCountingDown] = useState(false);

  const clickAreaRef = useRef<HTMLDivElement>(null);
  const startTimeRef = useRef<number>(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const countdownRef = useRef<NodeJS.Timeout | null>(null);
  const testEndTimeRef = useRef<number>(0);

  const { startCalculation, endCalculation } = useAutoCalculatorTracking({
    calculatorType: "clicks-por-segundo",
    category: "ferramentas",
  });
  useFormTracking("clicks-por-segundo");

  // Análise de cliques
  const analyzeClicks = useCallback((clicks: ClickData[], duration: number): TestResult => {
    if (clicks.length === 0) {
      return {
        cps: 0,
        totalClicks: 0,
        duration,
        clickData: clicks,
        technique: "None",
        consistency: 0,
        rank: "Turtle",
        percentile: 0,
        analysis: {
          averageInterval: 0,
          intervalVariance: 0,
          peakCPS: 0,
          fatigueDetected: false,
        },
      };
    }

    const totalClicks = clicks.length;
    const cps = totalClicks / duration;

    // Análise de intervalos
    const intervals = clicks.slice(1).map((click, i) => click.timestamp - clicks[i].timestamp);
    const averageInterval = intervals.reduce((sum, interval) => sum + interval, 0) / intervals.length;
    const intervalVariance = intervals.reduce((sum, interval) => sum + Math.pow(interval - averageInterval, 2), 0) / intervals.length;

    // Análise de picos de CPS (janelas de 1 segundo)
    const windowSize = 1000;
    let peakCPS = 0;
    for (let i = 0; i <= duration * 1000 - windowSize; i += 100) {
      const windowClicks = clicks.filter(c => c.timestamp >= i && c.timestamp < i + windowSize);
      const windowCPS = windowClicks.length;
      peakCPS = Math.max(peakCPS, windowCPS);
    }

    // Detecção de fadiga (diminuição de CPS ao longo do tempo)
    const firstHalfCPS = clicks.filter(c => c.timestamp < (duration * 1000) / 2).length / (duration / 2);
    const secondHalfCPS = clicks.filter(c => c.timestamp >= (duration * 1000) / 2).length / (duration / 2);
    const fatigueDetected = firstHalfCPS - secondHalfCPS > 2;

    // Detecção de técnica de clique
    let technique = "Regular";
    if (cps > 15) technique = "God Mode";
    else if (cps > 12) technique = "Drag Click";
    else if (cps > 9) technique = "Butterfly Click";
    else if (cps > 6) technique = "Jitter Click";

    // Consistência (baseada na variância dos intervalos)
    const consistency = Math.max(0, 100 - (intervalVariance / 1000));

    // Ranking
    const rank = CPS_RANKS.find(r => cps >= r.min && cps < r.max)?.name || "Turtle";

    // Percentil (estimativa baseada em distribuição normal)
    const percentile = Math.min(99, Math.max(1, Math.round((cps / 20) * 100)));

    return {
      cps: Math.round(cps * 1000) / 1000, // 3 casas decimais
      totalClicks,
      duration,
      clickData: clicks,
      technique,
      consistency: Math.round(consistency * 10) / 10, // 1 casa decimal
      rank,
      percentile,
      analysis: {
        averageInterval: Math.round(averageInterval * 10) / 10, // 1 casa decimal
        intervalVariance: Math.round(intervalVariance * 10) / 10, // 1 casa decimal
        peakCPS,
        fatigueDetected,
      },
    };
  }, []);

  const startTest = useCallback(() => {
    if (isCountingDown || isActive || testResult) return;

    if (!isReady) {
      setIsReady(true);
      // Iniciar countdown imediatamente após definir como ready
      setTimeout(() => {
        setIsCountingDown(true);
        setCountdown(5);
        setTestResult(null);

        countdownRef.current = setInterval(() => {
          setCountdown(prev => {
            if (prev <= 1) {
              // Iniciar teste após countdown
              setIsCountingDown(false);
              setIsActive(true);
              setClickCount(0);
              setClickData([]);
              const now = Date.now();
              startTimeRef.current = now;
              testEndTimeRef.current = now + (selectedDuration * 1000);
              startCalculation();

              // Timer principal do teste baseado em tempo real
              intervalRef.current = setInterval(() => {
                const now = Date.now();
                const timeRemaining = Math.max(0, Math.ceil((testEndTimeRef.current - now) / 1000));

                setTimeLeft(timeRemaining);

                if (timeRemaining <= 0) {
                  setIsActive(false);
                  if (intervalRef.current) {
                    clearInterval(intervalRef.current);
                    intervalRef.current = null;
                  }
                }
              }, 100); // Atualizar a cada 100ms para mais precisão

              return 0;
            }
            return prev - 1;
          });
        }, 1000);
      }, 0);
      return;
    }

    // Se já está ready, iniciar countdown
    setIsCountingDown(true);
    setCountdown(5);
    setTestResult(null);

    countdownRef.current = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          // Iniciar teste após countdown
          setIsCountingDown(false);
          setIsActive(true);
          setClickCount(0);
          setClickData([]);
          const now = Date.now();
          startTimeRef.current = now;
          testEndTimeRef.current = now + (selectedDuration * 1000);
          startCalculation();

          // Timer principal do teste baseado em tempo real
          intervalRef.current = setInterval(() => {
            const now = Date.now();
            const timeRemaining = Math.max(0, Math.ceil((testEndTimeRef.current - now) / 1000));

            setTimeLeft(timeRemaining);

            if (timeRemaining <= 0) {
              setIsActive(false);
              if (intervalRef.current) {
                clearInterval(intervalRef.current);
                intervalRef.current = null;
              }
            }
          }, 100); // Atualizar a cada 100ms para mais precisão

          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  }, [selectedDuration, startCalculation, isCountingDown, isActive, testResult]);

  const handleClick = useCallback((e: React.MouseEvent) => {
    if (!isActive) return;

    const rect = clickAreaRef.current?.getBoundingClientRect();
    if (!rect) return;

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const timestamp = Date.now() - startTimeRef.current;

    setClickCount(prev => prev + 1);
    setClickData(prev => [...prev, { timestamp, x, y }]);
  }, [isActive]);

  const resetTest = useCallback(() => {
    setIsActive(false);
    setIsReady(false);
    setTimeLeft(0);
    setClickCount(0);
    setClickData([]);
    setTestResult(null);
    setIsCountingDown(false);
    setCountdown(0);

    // Reset das referências de tempo
    startTimeRef.current = 0;
    testEndTimeRef.current = 0;

    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    if (countdownRef.current) {
      clearInterval(countdownRef.current);
      countdownRef.current = null;
    }
  }, []);

  // Finalizar teste quando tempo acabar
  useEffect(() => {
    if (!isActive && timeLeft === 0 && clickData.length > 0 && startTimeRef.current > 0) {
      const actualDuration = selectedDuration; // Usar duração selecionada para análise
      const result = analyzeClicks(clickData, actualDuration);
      setTestResult(result);
      setTestHistory(prev => [result, ...prev.slice(0, 9)]); // Keep last 10 results
      endCalculation(true);
    }
  }, [isActive, timeLeft, clickData, selectedDuration, analyzeClicks, endCalculation]);

  // Cleanup countdowns
  useEffect(() => {
    if (countdown === 0 && countdownRef.current) {
      clearInterval(countdownRef.current);
      countdownRef.current = null;
    }
  }, [countdown]);

  // Cleanup
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      if (countdownRef.current) {
        clearInterval(countdownRef.current);
      }
    };
  }, []);

  // Estado para forçar recálculo do CPS
  const [, setForceUpdate] = useState(0);

  // Atualizar CPS a cada 200ms durante o teste
  useEffect(() => {
    if (isActive) {
      const cpsUpdateInterval = setInterval(() => {
        setForceUpdate(prev => prev + 1);
      }, 200);

      return () => clearInterval(cpsUpdateInterval);
    }
  }, [isActive]);

  const currentCPS = useMemo(() => {
    if (!isActive || clickCount === 0) return 0;
    const now = Date.now();
    const elapsed = (now - startTimeRef.current) / 1000;
    return elapsed > 0 ? Math.round((clickCount / elapsed) * 1000) / 1000 : 0; // 3 casas decimais
  }, [clickCount, isActive, timeLeft]); // Incluir timeLeft para forçar recálculo

  const getRankInfo = (cps: number) => {
    return CPS_RANKS.find(r => cps >= r.min && cps < r.max) || CPS_RANKS[0];
  };

  return (
    <div className="mx-auto max-w-2xl space-y-8 px-3 sm:px-4 md:max-w-4xl lg:max-w-6xl">
      <Breadcrumb>
        <BreadcrumbItem href="/">Início</BreadcrumbItem>
        <BreadcrumbItem href="/calculadoras">Calculadoras</BreadcrumbItem>
        <BreadcrumbItem href="/calculadoras/ferramentas">Ferramentas</BreadcrumbItem>
        <BreadcrumbItem isLast>Teste CPS</BreadcrumbItem>
      </Breadcrumb>

      <header className="space-y-4 text-center">
        <h1 className="mb-4 text-3xl font-bold text-text-primary md:text-4xl">
          Teste CPS 2026 – Clicks Por Segundo Grátis e Avançado
        </h1>
        <p className="mx-auto max-w-3xl text-lg text-text-secondary-dark">
          Teste sua <strong className="text-primary-blue-dark">velocidade de clique</strong> com análise
          avançada de padrões, sistema de{" "}
          <strong className="text-growth-green">rankings dinâmicos</strong> e métricas detalhadas em tempo real.
        </p>
        <div className="inline-block rounded-lg bg-primary-blue-light p-4 duration-300">
          <p className="text-sm font-medium text-text-primary">
            🎯 <strong>Análise de Padrões</strong> • 📊 <strong>Métricas Detalhadas</strong> •{" "}
            🏆 <strong>Rankings & Conquistas</strong>
          </p>
        </div>
      </header>

      {/* Configuração de Duração */}
      <Card>
        <CardHeader>
          <CardTitle as="h2">⚙️ Configuração do Teste</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div>
              <label className="mb-3 block text-sm font-medium text-text-primary">
                Duração do Teste
              </label>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
                {TEST_DURATIONS.map((duration) => (
                  <button
                    key={duration.seconds}
                    onClick={() => setSelectedDuration(duration.seconds)}
                    disabled={isActive}
                    className={`rounded-lg border-2 p-3 text-center transition-all ${
                      selectedDuration === duration.seconds
                        ? "border-primary-blue bg-primary-blue text-white"
                        : "border-neutral-surface-variant bg-neutral-surface text-text-primary hover:border-primary-blue/50"
                    } ${isActive ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
                  >
                    <div className="text-lg font-bold">{duration.label}</div>
                    <div className="text-xs opacity-75">{duration.description}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Área de Teste */}
      <Card className={`${isActive ? "border-primary-blue ring-2 ring-primary-blue/20" : ""}`}>
        <CardHeader>
          <CardTitle as="h2" className="flex items-center justify-between">
            <span>🖱️ Área de Teste</span>
            {isActive && (
              <div className="text-2xl font-bold text-primary-blue">
                {timeLeft}s
              </div>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Click Area */}
            <div
              ref={clickAreaRef}
              onClick={isActive ? handleClick : (!testResult ? startTest : undefined)}
              className={`
                relative mx-auto h-64 w-full max-w-lg select-none rounded-2xl border-4
                transition-all duration-500 sm:h-80 lg:h-96
                ${
                  isActive
                    ? "border-system-success bg-system-success/20 cursor-pointer hover:bg-system-success/30 shadow-lg shadow-system-success/25"
                    : isCountingDown
                    ? "border-system-warning bg-system-warning/20 cursor-wait animate-pulse shadow-lg shadow-system-warning/25"
                    : testResult
                    ? "border-system-error bg-system-error/20 cursor-not-allowed opacity-75"
                    : isReady
                    ? "border-system-success bg-system-success/10 cursor-pointer hover:bg-system-success/20 hover:scale-105"
                    : "border-system-error bg-system-error/10 cursor-pointer hover:bg-system-error/20 hover:scale-105"
                }
              `}
            >
              <div className="absolute inset-0 flex flex-col items-center justify-center space-y-4">
                {!isReady ? (
                  <>
                    <div className="text-6xl animate-bounce">🎯</div>
                    <div className="text-center">
                      <div className="text-xl font-bold text-text-primary">
                        Clique Aqui para Iniciar
                      </div>
                      <div className="text-sm text-text-secondary">
                        Teste de {selectedDuration}s • Clique na área para começar
                      </div>
                    </div>
                  </>
                ) : isCountingDown ? (
                  <>
                    <div className="text-8xl font-bold text-system-warning animate-pulse">
                      {countdown}
                    </div>
                    <div className="text-center">
                      <div className="text-xl font-bold text-system-warning">
                        Preparando...
                      </div>
                      <div className="text-sm text-text-secondary">
                        O teste começará em {countdown}s
                      </div>
                    </div>
                  </>
                ) : isActive ? (
                  <>
                    <div className="text-6xl font-bold text-system-success animate-pulse">
                      ⏱️
                    </div>
                    <div className="text-center">
                      <div className="text-4xl font-bold text-system-success">
                        {clickCount}
                      </div>
                      <div className="text-lg text-text-secondary">
                        CPS: {currentCPS.toFixed(3)} | Tempo: {timeLeft}s
                      </div>
                    </div>
                  </>
                ) : testResult ? (
                  <>
                    <div className="text-6xl">🏆</div>
                    <div className="text-center">
                      <div className="text-xl font-bold text-primary-blue">
                        Teste Finalizado!
                      </div>
                      <div className="text-lg text-text-secondary">
                        {testResult.cps.toFixed(3)} CPS
                      </div>
                      <div className="text-sm text-system-error mt-2">
                        ⚠️ Clique no botão Reset para novo teste
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="text-6xl animate-bounce">🎯</div>
                    <div className="text-center">
                      <div className="text-xl font-bold text-system-success">
                        Clique Aqui para Iniciar
                      </div>
                      <div className="text-sm text-text-secondary">
                        Teste de {selectedDuration}s • Pronto para começar
                      </div>
                    </div>
                  </>
                )}
              </div>

              {/* Click Visual Effects */}
              {isActive && clickData.slice(-10).map((click, index) => (
                <div
                  key={`${click.timestamp}-${index}`}
                  className="absolute pointer-events-none"
                  style={{
                    left: click.x - 15,
                    top: click.y - 15,
                    animation: `clickEffect 0.6s ease-out forwards`,
                    animationDelay: `${index * 50}ms`,
                  }}
                >
                  <div className="relative">
                    <div className="h-8 w-8 rounded-full bg-system-success/70 animate-ping"></div>
                    <div className="absolute inset-0 h-8 w-8 rounded-full bg-system-success border-2 border-white/80 animate-pulse"></div>
                    <div className="absolute inset-2 h-4 w-4 rounded-full bg-white/90"></div>
                  </div>
                </div>
              ))}

              {/* Ripple effect for clicks */}
              {isActive && clickData.slice(-3).map((click, index) => (
                <div
                  key={`ripple-${click.timestamp}-${index}`}
                  className="absolute pointer-events-none"
                  style={{
                    left: click.x - 25,
                    top: click.y - 25,
                    animation: `ripple 0.8s ease-out forwards`,
                  }}
                >
                  <div className="h-12 w-12 rounded-full border-2 border-system-success/50 animate-ping"></div>
                </div>
              ))}
            </div>

            {/* Reset Button */}
            <div className="flex justify-center">
              <Button
                onClick={resetTest}
                variant="outline"
                disabled={isActive || isCountingDown}
                className={`transition-all duration-300 ${
                  testResult
                    ? "border-primary-blue text-primary-blue hover:bg-primary-blue hover:text-white"
                    : "border-system-warning text-system-warning hover:bg-system-warning hover:text-white"
                }`}
              >
                {testResult ? "🔄 Reset para Novo Teste" : "🔄 Reset"}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Resultado do Teste - só mostra quando não está ativo */}
      {testResult && !isActive && !isCountingDown && (
        <Card className="border-2 border-primary-blue bg-primary-blue-soft">
          <CardHeader>
            <CardTitle as="h3" className="text-primary-blue">
              🏆 Resultado do Teste
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {/* Resultado Principal */}
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="rounded-2xl bg-gray-900 p-6 text-center">
                  <div className="mb-2 text-5xl font-bold text-primary-blue">
                    {testResult.cps.toFixed(3)}
                  </div>
                  <div className="text-lg text-text-secondary">CPS (Clicks Por Segundo)</div>
                  <div className="mt-2 text-sm text-text-secondary">
                    {testResult.totalClicks} cliques em {testResult.duration}s
                  </div>
                </div>

                <div className="rounded-2xl bg-gray-900 p-6 text-center">
                  <div className={`mb-2 text-4xl ${getRankInfo(testResult.cps).color}`}>
                    {getRankInfo(testResult.cps).emoji} {getRankInfo(testResult.cps).name}
                  </div>
                  <div className="text-lg text-text-secondary">Classificação</div>
                  <div className="mt-2 text-sm text-text-secondary">
                    Top {100 - testResult.percentile}% dos jogadores
                  </div>
                </div>
              </div>

              {/* Análise Detalhada */}
              <div className="rounded-xl bg-primary-blue-light p-4">
                <h4 className="mb-3 font-semibold text-primary-blue-dark">
                  📊 Análise de Performance
                </h4>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-text-secondary">Técnica detectada:</span>
                      <span className="font-mono text-text-primary">{testResult.technique}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-text-secondary">Consistência:</span>
                      <span className="font-mono text-text-primary">{testResult.consistency.toFixed(1)}%</span>
                    </div>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-text-secondary">CPS Máximo:</span>
                      <span className="font-mono text-text-primary">{testResult.analysis.peakCPS}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-text-secondary">Intervalo médio:</span>
                      <span className="font-mono text-text-primary">{testResult.analysis.averageInterval.toFixed(1)}ms</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Dicas de Melhoria */}
              <div className="rounded-xl bg-system-info/10 p-4">
                <h4 className="mb-3 font-semibold text-system-info">💡 Dicas para Melhorar</h4>
                <div className="grid grid-cols-1 gap-3 text-sm md:grid-cols-2">
                  <div>
                    {testResult.cps < 5 && (
                      <p className="text-text-secondary">
                        • <strong>Pratique clique regular:</strong> Foque na velocidade básica primeiro
                      </p>
                    )}
                    {testResult.cps >= 5 && testResult.cps < 9 && (
                      <p className="text-text-secondary">
                        • <strong>Teste jitter click:</strong> Tensione o braço para cliques mais rápidos
                      </p>
                    )}
                    {testResult.cps >= 9 && testResult.cps < 12 && (
                      <p className="text-text-secondary">
                        • <strong>Aprenda butterfly click:</strong> Use dois dedos alternadamente
                      </p>
                    )}
                  </div>
                  <div>
                    {testResult.consistency < 70 && (
                      <p className="text-text-secondary">
                        • <strong>Melhore consistência:</strong> Pratique com durações mais longas
                      </p>
                    )}
                    {testResult.analysis.fatigueDetected && (
                      <p className="text-text-secondary">
                        • <strong>Trabalhe resistência:</strong> Mantenha velocidade constante
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Histórico de Testes - só mostra quando não está ativo */}
      {testHistory.length > 0 && !isActive && !isCountingDown && (
        <Card>
          <CardHeader>
            <CardTitle as="h3">📈 Histórico de Testes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {testHistory.slice(0, 5).map((result, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between rounded-lg bg-gray-900 p-3"
                >
                  <div className="flex items-center space-x-4">
                    <div className={`text-2xl ${getRankInfo(result.cps).color}`}>
                      {getRankInfo(result.cps).emoji}
                    </div>
                    <div>
                      <div className="font-semibold text-text-primary">
                        {result.cps.toFixed(3)} CPS ({result.totalClicks} cliques)
                      </div>
                      <div className="text-sm text-text-secondary">
                        {result.duration}s • {result.technique} • {result.consistency.toFixed(1)}% consistência
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className={`font-semibold ${getRankInfo(result.cps).color}`}>
                      {result.rank}
                    </div>
                    <div className="text-sm text-text-secondary">
                      Top {100 - result.percentile}%
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Seção educacional */}
      <Card className="border-l-4 border-primary-blue bg-gradient-to-r from-primary-blue-light to-growth-green-soft duration-300">
        <CardHeader>
          <CardTitle as="h2" className="text-2xl font-bold text-text-primary">
            🎯 Como Funciona o Teste CPS Avançado
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-8">
            {/* Técnicas de Clique */}
            <div className="rounded-xl border border-primary-blue/20 bg-gray-900 p-6">
              <h3 className="mb-4 flex items-center text-xl font-bold text-primary-blue-dark">
                🖱️ Técnicas de Clique
              </h3>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <h4 className="mb-3 font-semibold text-system-success">👆 Regular Click</h4>
                  <p className="mb-4 text-sm text-text-secondary">
                    Clique normal usando apenas o dedo indicador. Fácil de aprender e controlar,
                    ideal para iniciantes. CPS típico: 3-6.
                  </p>

                  <h4 className="mb-3 font-semibold text-system-info">⚡ Jitter Click</h4>
                  <p className="mb-4 text-sm text-text-secondary">
                    Tensiona o braço e pulso para vibrar o dedo, criando cliques rápidos.
                    Requer prática. CPS típico: 6-12.
                  </p>
                </div>

                <div>
                  <h4 className="mb-3 font-semibold text-system-warning">🦋 Butterfly Click</h4>
                  <p className="mb-4 text-sm text-text-secondary">
                    Usa dois dedos alternadamente no mesmo botão. Técnica avançada que
                    requer coordenação. CPS típico: 12-20.
                  </p>

                  <h4 className="mb-3 font-semibold text-growth-green">🌪️ Drag Click</h4>
                  <p className="text-sm text-text-secondary">
                    Arrasta o dedo pelo botão do mouse para múltiplos cliques.
                    Técnica muito avançada. CPS típico: 15-30.
                  </p>
                </div>
              </div>
            </div>

            {/* Análise de Performance */}
            <div className="rounded-xl border border-growth-green/20 bg-gray-900 p-6">
              <h3 className="mb-4 flex items-center text-xl font-bold text-growth-green">
                📊 Análise de Performance
              </h3>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <h4 className="mb-3 font-semibold text-primary-blue">⏱️ Métricas de Tempo</h4>
                  <ul className="mb-4 space-y-1 text-sm text-text-secondary">
                    <li>• Análise de intervalos entre cliques</li>
                    <li>• Variância temporal dos cliques</li>
                    <li>• Detecção de picos de velocidade</li>
                    <li>• Consistência ao longo do tempo</li>
                  </ul>
                </div>

                <div>
                  <h4 className="mb-3 font-semibold text-system-info">🎯 Técnicas e Rankings</h4>
                  <ul className="space-y-1 text-sm text-text-secondary">
                    <li>• Identificação automática de técnica</li>
                    <li>• Sistema de classificação por níveis</li>
                    <li>• Percentil comparativo</li>
                    <li>• Análise de fadiga muscular</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Rankings e Classificações */}
            <div className="rounded-xl border border-system-warning/20 bg-gray-900 p-6">
              <h3 className="mb-4 flex items-center text-xl font-bold text-system-warning">
                🏆 Sistema de Rankings
              </h3>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {CPS_RANKS.slice(0, -1).map((rank) => (
                  <div
                    key={rank.name}
                    className="rounded-lg border border-neutral-surface-variant bg-neutral-surface p-3 text-center"
                  >
                    <div className={`text-2xl ${rank.color}`}>{rank.emoji}</div>
                    <div className={`font-semibold ${rank.color}`}>{rank.name}</div>
                    <div className="text-sm text-text-secondary">
                      {rank.min}-{rank.max === Infinity ? "∞" : rank.max} CPS
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <FAQ
        title="Perguntas Frequentes - Teste CPS"
        items={[
          {
            question: "O que é CPS (Clicks Por Segundo)?",
            answer:
              "CPS significa Clicks Por Segundo e mede quantos cliques você consegue fazer em um período determinado. É usado para testar velocidade de clique, reflexos e técnicas de clique rápido. Um CPS de 6-8 é considerado bom para a maioria dos usuários.",
            borderColor: "primary-blue",
          },
          {
            question: "Como melhorar meu CPS?",
            answer:
              "Para melhorar seu CPS: pratique técnicas como jitter click (tensione o braço), butterfly click (dois dedos), use um mouse adequado com botões sensíveis, mantenha postura correta, e treine regularmente com diferentes durações de teste.",
            borderColor: "growth-green",
          },
          {
            question: "Como funciona a análise de técnicas?",
            answer:
              "O sistema analisa automaticamente os padrões de clique para identificar a técnica utilizada: Regular (3-6 CPS), Jitter (6-12 CPS), Butterfly (12-20 CPS) ou Drag Click (15+ CPS). A identificação é baseada na velocidade e consistência dos cliques.",
            borderColor: "system-warning",
          },
          {
            question: "Qual é um bom score de CPS?",
            answer:
              "CPS varia por técnica: Regular (3-6), Jitter (6-12), Butterfly (12-20), Drag (15-30). Para iniciantes, 5-7 CPS é excelente. Profissionais podem atingir 15+ CPS. O importante é consistência, não apenas velocidade máxima.",
            borderColor: "system-info",
          },
          {
            question: "Por que meu CPS diminui em testes longos?",
            answer:
              "Isso é fadiga muscular natural. Músculos se cansam durante atividade intensa prolongada. Para melhorar resistência, pratique com durações mais longas gradualmente e mantenha técnica consistente ao invés de velocidade máxima.",
            borderColor: "system-success",
          },
          {
            question: "As técnicas avançadas prejudicam o mouse?",
            answer:
              "Técnicas como jitter e butterfly podem causar desgaste acelerado do mouse se praticadas excessivamente. Use mouse gamer com switches duráveis, faça pausas regulares e evite força excessiva para preservar o equipamento.",
            borderColor: "system-warning",
          },
        ]}
        tipSection={{
          title: "Dica para Melhor Performance",
          content:
            "<strong>Aquecimento é fundamental:</strong> Antes de testes importantes, faça alguns testes curtos de aquecimento. Mantenha postura correta, use mouse adequado e pratique técnicas progressivamente.",
        }}
        footerText="<strong>Lembre-se:</strong> CPS é mais sobre técnica e consistência do que força bruta. Pratique regularmente e respeite os limites do seu corpo e equipamento."
      />

      {/* Footer com informações adicionais */}
      <Card className="border-l-4 border-primary-blue bg-primary-blue-light duration-300">
        <CardHeader>
          <CardTitle as="h2" className="text-lg font-bold text-text-primary">
            🎮 Como Usar Este Teste CPS
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 text-sm text-text-secondary">
            <p>
              Este <strong className="text-primary-blue-dark">teste CPS avançado</strong> oferece{" "}
              <strong className="text-growth-green">análise completa de performance</strong> com
              detecção de técnicas, métricas detalhadas e rankings em tempo real.
            </p>
            <p>
              <strong>Recursos únicos:</strong> Análise de padrão de cliques, detecção de fadiga,
              classificação automática, histórico de performance e dicas personalizadas de melhoria.
            </p>
            <p>
              <strong className="text-system-info">Ideal para:</strong> Gamers competitivos,
              streamers, desenvolvedores de jogos e qualquer pessoa interessada em{" "}
              <strong>melhorar velocidade e precisão</strong> de clique.
            </p>
            <p className="mt-4 border-t border-primary-blue/20 pt-3 text-xs opacity-75">
              🎯 Análise avançada • 📊 Métricas detalhadas • 🏆 Rankings • 📱 Mobile-friendly • 🌙
              Modo escuro • ⚡ Tempo real
            </p>
          </div>
        </CardContent>
      </Card>

      <RelatedCalculators category="ferramentas" currentCalculatorId="clicks-por-segundo" />

      {/* CSS Animations */}
      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes clickEffect {
            0% {
              transform: scale(1);
              opacity: 1;
            }
            50% {
              transform: scale(1.2);
              opacity: 0.8;
            }
            100% {
              transform: scale(0.8);
              opacity: 0;
            }
          }

          @keyframes ripple {
            0% {
              transform: scale(0);
              opacity: 1;
            }
            100% {
              transform: scale(4);
              opacity: 0;
            }
          }

          @keyframes countdownPulse {
            0%, 100% {
              transform: scale(1);
            }
            50% {
              transform: scale(1.1);
            }
          }
        `
      }} />
    </div>
  );
}