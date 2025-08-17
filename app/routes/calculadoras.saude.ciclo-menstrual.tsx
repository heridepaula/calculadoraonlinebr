import type { MetaFunction } from "@remix-run/node";
import { useState, useEffect, useRef } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  Input,
  Button,
  Breadcrumb,
  BreadcrumbItem,
  Select,
} from "~/components/ui";
import { RelatedCalculators, FAQ } from "~/components";
import { APP_NAME } from "~/lib/constants";
import { useAutoCalculatorTracking, useFormTracking } from "~/hooks/useAutoCalculatorTracking";
import {
  calculateMenstrualCycle,
  type MenstrualCycleParams,
  type MenstrualCycleResult,
} from "~/utils/calculations";

// Interface para validação de erros
interface ValidationErrors {
  lastPeriodDate?: string;
  cycleLength?: string;
  periodLength?: string;
  general?: string;
}

export const meta: MetaFunction = () => {
  return [
    { title: `Calculadora de Ciclo Menstrual - Período Fértil e Ovulação Online - ${APP_NAME}` },
    {
      name: "description",
      content:
        "Calculadora de ciclo menstrual gratuita e precisa. Calcule seu período fértil, data de ovulação, próxima menstruação e acompanhe suas fases do ciclo. Calendário menstrual completo com projeções.",
    },
    {
      name: "keywords",
      content:
        "calculadora ciclo menstrual, período fértil, ovulação, calendário menstrual, menstruação, fertilidade, tabelinha, ciclo feminino, saúde da mulher",
    },
    { name: "author", content: "Calculadora Online BR" },
    {
      property: "og:title",
      content: `Calculadora de Ciclo Menstrual - Período Fértil e Ovulação - ${APP_NAME}`,
    },
    {
      property: "og:description",
      content:
        "Calcule gratuitamente seu período fértil e acompanhe seu ciclo menstrual. Ferramenta completa para saúde feminina.",
    },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary" },
    { name: "twitter:title", content: `Calculadora de Ciclo Menstrual Online - ${APP_NAME}` },
    {
      name: "twitter:description",
      content: "Acompanhe seu ciclo menstrual e calcule período fértil com precisão.",
    },
  ];
};

export default function MenstrualCycleCalculator() {
  const [lastPeriodDate, setLastPeriodDate] = useState("");
  const [cycleLength, setCycleLength] = useState("28");
  const [periodLength, setPeriodLength] = useState("5");
  const [cycleType, setCycleType] = useState<"regular" | "irregular">("regular");
  const [goal, setGoal] = useState<"track" | "conceive">("track");
  const [result, setResult] = useState<MenstrualCycleResult | null>(null);
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [isCalculating, setIsCalculating] = useState(false);

  // Global Analytics Tracking
  const { 
    startCalculation, 
    endCalculation, 
    trackFeature, 
    trackButtonClick,
    trackStepsToggle,
    trackInputFocus 
  } = useAutoCalculatorTracking({ 
    calculatorType: "ciclo_menstrual",
    category: "saude"
  });
  
  const { trackInputChange, trackFormSubmission } = useFormTracking("ciclo_menstrual");
  const resultsRef = useRef<HTMLDivElement>(null);

  const formatDate = (date: Date): string => {
    return date.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const formatDateShort = (date: Date): string => {
    return date.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "short",
    });
  };

  const handleCalculate = async () => {
    setIsCalculating(true);
    setErrors({});

    // Validação robusta de campos obrigatórios
    const newErrors: ValidationErrors = {};
    const today = new Date();
    const oneYearAgo = new Date();
    oneYearAgo.setFullYear(today.getFullYear() - 1);

    // Validação da data da última menstruação (OBRIGATÓRIO)
    if (!lastPeriodDate) {
      newErrors.lastPeriodDate = "Por favor, informe a data da última menstruação";
    } else {
      const selectedDate = new Date(lastPeriodDate);
      if (selectedDate > today) {
        newErrors.lastPeriodDate = "A data não pode ser no futuro";
      } else if (selectedDate < oneYearAgo) {
        newErrors.lastPeriodDate = "A data não pode ser anterior a 12 meses";
      }
    }

    // Validação da duração do ciclo (OBRIGATÓRIO)
    const cycleLengthNum = parseInt(cycleLength);
    if (!cycleLength || cycleLength.trim() === "") {
      newErrors.cycleLength = "Por favor, informe a duração do ciclo";
    } else if (isNaN(cycleLengthNum)) {
      newErrors.cycleLength = "Por favor, informe um número válido";
    } else if (cycleLengthNum < 21 || cycleLengthNum > 45) {
      newErrors.cycleLength = "A duração do ciclo deve estar entre 21 e 45 dias";
    }

    // Validação da duração da menstruação (OBRIGATÓRIO)
    const periodLengthNum = parseInt(periodLength);
    if (!periodLength || periodLength.trim() === "") {
      newErrors.periodLength = "Por favor, informe a duração da menstruação";
    } else if (isNaN(periodLengthNum)) {
      newErrors.periodLength = "Por favor, informe um número válido";
    } else if (periodLengthNum < 1 || periodLengthNum > 15) {
      newErrors.periodLength = "A duração da menstruação deve estar entre 1 e 15 dias";
    }

    // Validação lógica: menstruação não pode ser maior que o ciclo
    if (cycleLengthNum > 0 && periodLengthNum > 0 && periodLengthNum >= cycleLengthNum) {
      newErrors.periodLength = "A menstruação não pode durar mais que o ciclo";
    }

    // Se há erros, exibir e parar execução
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setResult(null);
      setIsCalculating(false);
      return;
    }

    // Simular loading para melhor UX
    await new Promise((resolve) => setTimeout(resolve, 800));

    try {
      const lastPeriod = new Date(lastPeriodDate);
      const params: MenstrualCycleParams = {
        lastPeriodDate: lastPeriod,
        cycleLength: cycleLengthNum,
        periodLength: periodLengthNum,
        cycleHistory: cycleType === "irregular" ? [25, 30, 27, 32, 28] : undefined,
      };

      const cycleResult = calculateMenstrualCycle(params);
      setResult(cycleResult);
    } catch (error) {
      setErrors({ general: "Erro ao calcular o ciclo. Tente novamente." });
    } finally {
      setIsCalculating(false);
    }
  };

  const handleReset = () => {
    setLastPeriodDate("");
    setCycleLength("28");
    setPeriodLength("5");
    setCycleType("regular");
    setGoal("track");
    setResult(null);
    setErrors({});
    setIsCalculating(false);
  };

  // Scroll automático para resultados
  useEffect(() => {
    if (result) {
      resultsRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [result]);

  const getPhaseColor = (phase: string) => {
    switch (phase) {
      case "Menstrual":
        return "system-error";
      case "Folicular":
        return "primary-blue";
      case "Ovulação":
        return "growth-green";
      case "Lútea":
        return "system-warning";
      default:
        return "neutral";
    }
  };

  const getPhaseEmoji = (phase: string) => {
    switch (phase) {
      case "Menstrual":
        return "🩸";
      case "Folicular":
        return "🌱";
      case "Ovulação":
        return "🥚";
      case "Lútea":
        return "🌙";
      default:
        return "📅";
    }
  };

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
          Calculadora de Ciclo Menstrual
        </h1>
        <p className="mx-auto max-w-3xl text-lg text-text-secondary-dark">
          Acompanhe seu <strong className="text-system-error-dark">ciclo menstrual</strong>, calcule
          seu <strong className="text-growth-green">período fértil</strong> e saiba quando será sua
          próxima <strong className="text-primary-blue-dark">ovulação</strong>.
        </p>
        <div className="bg-growth-green-light inline-block rounded-lg p-4 duration-300">
          <p className="text-sm font-medium text-text-primary">
            🩸 <strong>Calendário completo</strong> • 🥚 <strong>Período fértil</strong> • 📅{" "}
            <strong>Próximos 6 meses</strong>
          </p>
        </div>
      </header>

      <Card>
        <CardHeader>
          <CardTitle as="h2">Dados do seu Ciclo</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="space-y-6">
              <div className="mx-auto max-w-sm">
                <Input
                  type="date"
                  label="Data da última menstruação"
                  value={lastPeriodDate}
                  onChange={(e) => setLastPeriodDate(e.target.value)}
                  required
                  fullWidth
                />
                <p className="mt-1 text-center text-xs text-text-secondary">
                  Primeiro dia da sua última menstruação
                </p>
              </div>

              <div className="mx-auto grid max-w-2xl grid-cols-1 gap-8 lg:grid-cols-2">
                <div>
                  <h3 className="mb-3 text-center text-sm font-semibold text-text-primary">
                    Seu objetivo:
                  </h3>
                  <div className="flex overflow-hidden rounded-lg border border-neutral-surface-variant">
                    <button
                      type="button"
                      onClick={() => setGoal("track")}
                      className={`flex-1 px-4 py-3 text-sm font-medium ${
                        goal === "track"
                          ? "bg-primary-blue text-white"
                          : "hover:bg-primary-blue/10-dark/10 bg-neutral-surface text-text-secondary"
                      }`}
                    >
                      📅 Acompanhar ciclo
                    </button>
                    <button
                      type="button"
                      onClick={() => setGoal("conceive")}
                      className={`flex-1 px-4 py-3 text-sm font-medium ${
                        goal === "conceive"
                          ? "bg-growth-green text-white"
                          : "hover:bg-growth-green/10-dark/10 bg-neutral-surface text-text-secondary"
                      }`}
                    >
                      👶 Tentando engravidar
                    </button>
                  </div>
                </div>

                <div>
                  <h3 className="mb-3 text-center text-sm font-semibold text-text-primary">
                    Tipo de ciclo:
                  </h3>
                  <div className="flex overflow-hidden rounded-lg border border-neutral-surface-variant">
                    <button
                      type="button"
                      onClick={() => setCycleType("regular")}
                      className={`flex-1 px-4 py-3 text-sm font-medium ${
                        cycleType === "regular"
                          ? "bg-system-info text-white"
                          : "hover:bg-system-info/10:bg-system-info-dark/10 bg-neutral-surface text-text-secondary"
                      }`}
                    >
                      📊 Regular
                    </button>
                    <button
                      type="button"
                      onClick={() => setCycleType("irregular")}
                      className={`flex-1 px-4 py-3 text-sm font-medium ${
                        cycleType === "irregular"
                          ? "bg-system-warning text-white"
                          : "hover:bg-system-warning/10:bg-system-warning-dark/10 bg-neutral-surface text-text-secondary"
                      }`}
                    >
                      📈 Irregular
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="mx-auto grid max-w-lg grid-cols-1 gap-6 md:grid-cols-2">
              <Input
                type="number"
                label="Duração do ciclo (dias)"
                value={cycleLength}
                onChange={(e) => setCycleLength(e.target.value)}
                placeholder="Ex: 28"
                min="21"
                max="45"
                step="1"
                required
                fullWidth
              />

              <Input
                type="number"
                label="Duração da menstruação (dias)"
                value={periodLength}
                onChange={(e) => setPeriodLength(e.target.value)}
                placeholder="Ex: 5"
                min="3"
                max="10"
                step="1"
                required
                fullWidth
              />
            </div>

            <div
              className={`${goal === "conceive" ? "border border-growth-green/20 bg-growth-green/10" : "border border-system-info/20 bg-system-info/10"} rounded-lg p-4`}
            >
              <h3
                className={`font-semibold ${goal === "conceive" ? "text-growth-green" : "text-system-info"} mb-2`}
              >
                {goal === "conceive"
                  ? "👶 Dicas para Engravidar"
                  : "💡 Dicas para usar a calculadora"}
              </h3>
              {goal === "conceive" ? (
                <ul className="space-y-1 text-sm text-text-secondary">
                  <li>
                    • <strong>Melhor momento:</strong> 2-3 dias antes da ovulação até 1 dia após
                  </li>
                  <li>
                    • <strong>Frequência:</strong> Relações a cada 2-3 dias durante período fértil
                  </li>
                  <li>
                    • <strong>Sinais de ovulação:</strong> Observe muco cervical e temperatura basal
                  </li>
                  <li>
                    • <strong>Estilo de vida:</strong> Mantenha alimentação saudável e evite
                    estresse
                  </li>
                  <li>
                    • <strong>Paciência:</strong> Pode levar até 12 meses para casais saudáveis
                  </li>
                </ul>
              ) : (
                <ul className="space-y-1 text-sm text-text-secondary">
                  <li>
                    • <strong>Ciclo regular:</strong> Sempre tem a mesma duração (±2 dias)
                  </li>
                  <li>
                    • <strong>Ciclo irregular:</strong> A duração varia mais de 2 dias entre os
                    meses
                  </li>
                  <li>
                    • <strong>Duração normal:</strong> Ciclo de 21 a 35 dias, menstruação de 3 a 7
                    dias
                  </li>
                  <li>
                    • <strong>Para maior precisão:</strong> Anote suas datas por alguns meses
                  </li>
                </ul>
              )}
            </div>

            <div className="flex justify-center gap-4">
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
          </div>
        </CardContent>
      </Card>

      <div ref={resultsRef}>
        {result && (
          <>
            {/* Resumo atual */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card
                className={`bg-${getPhaseColor(result.currentPhase)}/10${getPhaseColor(result.currentPhase)}-dark/10 border-l-4 border-${getPhaseColor(result.currentPhase)}${getPhaseColor(result.currentPhase)}-dark`}
              >
                <CardHeader>
                  <CardTitle
                    as="h3"
                    className={`text-${getPhaseColor(result.currentPhase)}${getPhaseColor(result.currentPhase)}-dark text-lg`}
                  >
                    {getPhaseEmoji(result.currentPhase)} Fase Atual
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center">
                    <div
                      className={`text-2xl font-bold text-${getPhaseColor(result.currentPhase)}${getPhaseColor(result.currentPhase)}-dark`}
                    >
                      {result.currentPhase}
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-system-error-dark bg-system-error/10">
                <CardHeader>
                  <CardTitle as="h3" className="text-lg text-system-error-dark">
                    🩸 Próxima Menstruação
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-1 text-center">
                    <div className="text-lg font-semibold text-text-primary">
                      {formatDate(result.nextPeriodDate)}
                    </div>
                    <div className="text-sm text-system-error-dark">
                      em {result.daysToNextPeriod} dias
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-growth-green bg-growth-green/10">
                <CardHeader>
                  <CardTitle as="h3" className="text-lg text-growth-green">
                    🥚 Ovulação
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-1 text-center">
                    <div className="text-lg font-semibold text-text-primary">
                      {formatDate(result.ovulationDate)}
                    </div>
                    <div className="text-sm text-growth-green">
                      {result.daysToOvulation === 0 ? "hoje" : `em ${result.daysToOvulation} dias`}
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card
                className={`${goal === "conceive" ? "border-l-4 border-growth-green bg-growth-green/20 ring-2 ring-growth-green/30" : "border-l-4 border-primary-blue bg-primary-blue/10"}`}
              >
                <CardHeader>
                  <CardTitle
                    as="h3"
                    className={`${goal === "conceive" ? "text-growth-green" : "text-primary-blue-dark"} text-lg`}
                  >
                    {goal === "conceive" ? "🎯 Melhor Período para Conceber" : "💕 Período Fértil"}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-1 text-center">
                    <div className="text-sm text-text-primary">
                      <div className="font-semibold">
                        {formatDateShort(result.fertileWindowStart)}
                      </div>
                      <div className="text-xs text-text-secondary">até</div>
                      <div className="font-semibold">
                        {formatDateShort(result.fertileWindowEnd)}
                      </div>
                    </div>
                    {goal === "conceive" && (
                      <div className="mt-1 text-xs font-medium text-growth-green">
                        {result.daysToOvulation <= 6 && result.daysToOvulation >= -1
                          ? "✨ Período ideal!"
                          : "Próximo período em breve"}
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Calendário visual dos próximos ciclos */}
            <Card>
              <CardHeader>
                <CardTitle as="h3">
                  {goal === "conceive"
                    ? "🎯 Próximas Oportunidades de Concepção"
                    : "📅 Próximos 6 Ciclos"}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="py-3 text-left">Ciclo</th>
                        <th className="py-3 text-left">🩸 Menstruação</th>
                        <th className="py-3 text-left">
                          {goal === "conceive" ? "🎯 Melhor Período" : "💕 Período Fértil"}
                        </th>
                        <th className="py-3 text-left">🥚 Ovulação</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="bg-growth-green/5/5 border-b">
                        <td className="py-3 font-semibold">Atual</td>
                        <td className="py-3">{formatDate(new Date(lastPeriodDate))}</td>
                        <td className="py-3">
                          {formatDateShort(result.fertileWindowStart)} -{" "}
                          {formatDateShort(result.fertileWindowEnd)}
                        </td>
                        <td className="py-3">{formatDate(result.ovulationDate)}</td>
                      </tr>
                      {result.nextSixCycles.map((cycle) => (
                        <tr
                          key={cycle.cycleNumber}
                          className="hover:bg-neutral-surface/50:bg-background-dark-secondary/50 border-b"
                        >
                          <td className="py-3 font-medium">{cycle.cycleNumber}</td>
                          <td className="py-3">{formatDate(cycle.periodStart)}</td>
                          <td className="py-3">
                            {formatDateShort(cycle.fertileStart)} -{" "}
                            {formatDateShort(cycle.fertileEnd)}
                          </td>
                          <td className="py-3">{formatDate(cycle.ovulation)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {result.isIrregularCycle && (
                  <div className="mt-4 rounded-lg border border-system-warning/20 bg-system-warning/10 p-3">
                    <p className="text-sm text-system-warning">
                      <strong>⚠️ Ciclo Irregular Detectado:</strong> As datas podem variar. Para
                      maior precisão, acompanhe seu ciclo por alguns meses e consulte um
                      ginecologista.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Fases do ciclo */}
            <Card>
              <CardHeader>
                <CardTitle as="h3">🔄 Fases do seu Ciclo Atual</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
                  <div className="bg-system-error/5/5 rounded-lg border border-system-error/20 p-4">
                    <h4 className="mb-2 flex items-center font-semibold text-system-error-dark">
                      🩸 <span className="ml-2">Menstrual</span>
                    </h4>
                    <p className="mb-2 text-xs text-text-secondary">
                      {formatDateShort(result.cyclePhases.menstrual.start)} -{" "}
                      {formatDateShort(result.cyclePhases.menstrual.end)}
                    </p>
                    <p className="text-xs text-text-secondary">
                      Descamação do endométrio. É normal sentir cólicas e mudanças de humor.
                    </p>
                  </div>

                  <div className="bg-primary-blue/5/5 rounded-lg border border-primary-blue/20 p-4">
                    <h4 className="mb-2 flex items-center font-semibold text-primary-blue-dark">
                      🌱 <span className="ml-2">Folicular</span>
                    </h4>
                    <p className="mb-2 text-xs text-text-secondary">
                      {formatDateShort(result.cyclePhases.follicular.start)} -{" "}
                      {formatDateShort(result.cyclePhases.follicular.end)}
                    </p>
                    <p className="text-xs text-text-secondary">
                      Os folículos se desenvolvem. Energia aumenta e humor melhora.
                    </p>
                  </div>

                  <div className="bg-growth-green/5/5 rounded-lg border border-growth-green/20 p-4">
                    <h4 className="mb-2 flex items-center font-semibold text-growth-green">
                      🥚 <span className="ml-2">Ovulação</span>
                    </h4>
                    <p className="mb-2 text-xs text-text-secondary">
                      {formatDateShort(result.cyclePhases.ovulation.start)} -{" "}
                      {formatDateShort(result.cyclePhases.ovulation.end)}
                    </p>
                    <p className="text-xs text-text-secondary">
                      Período mais fértil. Pode haver aumento da libido e energia.
                    </p>
                  </div>

                  <div className="bg-system-warning/5/5 rounded-lg border border-system-warning/20 p-4">
                    <h4 className="mb-2 flex items-center font-semibold text-system-warning">
                      🌙 <span className="ml-2">Lútea</span>
                    </h4>
                    <p className="mb-2 text-xs text-text-secondary">
                      {formatDateShort(result.cyclePhases.luteal.start)} -{" "}
                      {formatDateShort(result.cyclePhases.luteal.end)}
                    </p>
                    <p className="text-xs text-text-secondary">
                      Preparo para menstruação. Possível TPM e sintomas pré-menstruais.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </>
        )}
      </div>

      {/* Seção específica para quem quer engravidar */}
      {goal === "conceive" && result && (
        <Card className="border-l-4 border-growth-green bg-growth-green-soft duration-300">
          <CardHeader>
            <CardTitle as="h2" className="text-xl font-bold text-text-primary">
              👶 Guia Para Engravidar
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <h4 className="mb-3 flex items-center font-semibold text-growth-green">
                    🎯 <span className="ml-2">Timing Perfeito</span>
                  </h4>
                  <ul className="space-y-2 text-sm text-text-secondary">
                    <li>
                      • <strong>3 dias antes da ovulação:</strong> Maior chance de concepção
                    </li>
                    <li>
                      • <strong>Dia da ovulação:</strong> Momento de pico de fertilidade
                    </li>
                    <li>
                      • <strong>1 dia após ovulação:</strong> Ainda possível engravidar
                    </li>
                    <li>
                      • <strong>Evite pressão:</strong> Sexo prazeroso aumenta as chances
                    </li>
                  </ul>
                </div>

                <div>
                  <h4 className="mb-3 flex items-center font-semibold text-primary-blue-dark">
                    📈 <span className="ml-2">Maximize suas Chances</span>
                  </h4>
                  <ul className="space-y-2 text-sm text-text-secondary">
                    <li>
                      • <strong>Ácido fólico:</strong> Comece a tomar 400mcg por dia
                    </li>
                    <li>
                      • <strong>Peso ideal:</strong> IMC entre 18,5 e 24,9
                    </li>
                    <li>
                      • <strong>Pare de fumar:</strong> Reduz fertilidade em ambos
                    </li>
                    <li>
                      • <strong>Limite álcool:</strong> Máximo 1-2 drinks por semana
                    </li>
                  </ul>
                </div>
              </div>

              <div className="rounded-lg border border-growth-green/20 bg-growth-green/10 p-4">
                <h4 className="mb-2 font-semibold text-growth-green">
                  📊 Suas Próximas Oportunidades
                </h4>
                <div className="text-sm text-text-secondary">
                  <p>
                    <strong>Próxima ovulação:</strong> {formatDate(result.ovulationDate)}
                    {result.daysToOvulation === 0
                      ? " (hoje!)"
                      : ` (em ${result.daysToOvulation} dias)`}
                  </p>
                  <p className="mt-1">
                    <strong>Janela fértil:</strong> {formatDate(result.fertileWindowStart)} até{" "}
                    {formatDate(result.fertileWindowEnd)}
                  </p>
                  {result.daysToOvulation <= 6 && result.daysToOvulation >= -1 && (
                    <p className="mt-2 font-medium text-growth-green">
                      ✨ Você está na janela fértil! Este é o momento ideal para tentar engravidar.
                    </p>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Seção adicional para quem quer engravidar - quando procurar ajuda */}
      {goal === "conceive" && (
        <Card className="border-l-4 border-system-info bg-system-info/10 duration-300">
          <CardHeader>
            <CardTitle as="h2" className="text-xl font-bold text-text-primary">
              🏥 Quando Procurar Ajuda Médica
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div>
                <h4 className="mb-3 flex items-center font-semibold text-system-warning">
                  ⏰ <span className="ml-2">Tempo de Tentativas</span>
                </h4>
                <ul className="space-y-2 text-sm text-text-secondary">
                  <li>
                    • <strong>Mulheres &lt; 35 anos:</strong> Após 12 meses tentando
                  </li>
                  <li>
                    • <strong>Mulheres ≥ 35 anos:</strong> Após 6 meses tentando
                  </li>
                  <li>
                    • <strong>Mulheres ≥ 40 anos:</strong> Procure ajuda imediatamente
                  </li>
                  <li>
                    • <strong>Histórico familiar:</strong> Infertilidade ou menopausa precoce
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="mb-3 flex items-center font-semibold text-system-error-dark">
                  🚩 <span className="ml-2">Sinais de Alerta</span>
                </h4>
                <ul className="space-y-2 text-sm text-text-secondary">
                  <li>• Ciclos muito irregulares (variação &gt; 7 dias)</li>
                  <li>• Ausência de menstruação por &gt; 3 meses</li>
                  <li>• Dor pélvica severa</li>
                  <li>• Histórico de DSTs ou cirurgias pélvicas</li>
                </ul>
              </div>
            </div>

            <div className="mt-4 rounded-lg border border-growth-green/20 bg-growth-green/10 p-4">
              <h4 className="mb-2 font-semibold text-growth-green">💡 Dica Importante</h4>
              <p className="text-sm text-text-secondary">
                Não espere o tempo "recomendado" se você tem preocupações. Um check-up
                pré-concepcional pode identificar e resolver problemas antes mesmo de tentar
                engravidar, aumentando suas chances de sucesso.
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Seção: O que é o ciclo menstrual */}
      <Card className="border-l-4 border-growth-green bg-growth-green-soft duration-300">
        <CardHeader>
          <CardTitle as="h2" className="text-xl font-bold text-text-primary">
            🌸 O que é o Ciclo Menstrual?
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4 text-text-primary">
            <p>
              O <strong className="text-growth-green">ciclo menstrual</strong> é um processo natural
              que ocorre no corpo feminino, preparando-o mensalmente para uma possível gravidez. Ele
              é controlado por hormônios e dura em média 28 dias, mas pode variar de 21 a 35 dias.
            </p>
            <p>
              O ciclo é contado a partir do primeiro dia da menstruação até o dia anterior à próxima
              menstruação. Durante este período, o corpo passa por mudanças hormonais que afetam não
              apenas o sistema reprodutivo, mas também o humor, energia e bem-estar geral.
            </p>
            <p>
              Conhecer seu ciclo é fundamental para a{" "}
              <strong className="text-primary-blue-dark">saúde feminina</strong>, planejamento
              familiar e autoconhecimento corporal.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Seção: Como usar a calculadora */}
      <Card className="border-l-4 border-primary-blue bg-primary-blue-light duration-300">
        <CardHeader>
          <CardTitle as="h2" className="text-xl font-bold text-text-primary">
            🧮 Como Usar a Calculadora de Ciclo Menstrual
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <div className="mt-1 flex h-6 w-6 items-center justify-center rounded-full bg-growth-green text-sm font-bold text-white">
                    1
                  </div>
                  <div>
                    <h3 className="font-semibold text-text-primary">Data da Última Menstruação</h3>
                    <p className="text-sm text-text-secondary">
                      Informe o primeiro dia da sua última menstruação. Esta é a data base para
                      todos os cálculos.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="mt-1 flex h-6 w-6 items-center justify-center rounded-full bg-primary-blue text-sm font-bold text-white">
                    2
                  </div>
                  <div>
                    <h3 className="font-semibold text-text-primary">Duração do Ciclo</h3>
                    <p className="text-sm text-text-secondary">
                      Conte quantos dias passam entre o primeiro dia de uma menstruação até o
                      primeiro dia da próxima.
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <div className="mt-1 flex h-6 w-6 items-center justify-center rounded-full bg-system-warning text-sm font-bold text-white">
                    3
                  </div>
                  <div>
                    <h3 className="font-semibold text-text-primary">Duração da Menstruação</h3>
                    <p className="text-sm text-text-secondary">
                      Quantos dias você fica menstruada, desde o primeiro dia com fluxo até parar
                      completamente.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="mt-1 flex h-6 w-6 items-center justify-center rounded-full bg-system-error text-sm font-bold text-white">
                    4
                  </div>
                  <div>
                    <h3 className="font-semibold text-text-primary">Tipo de Ciclo</h3>
                    <p className="text-sm text-text-secondary">
                      Escolha "regular" se seu ciclo sempre tem a mesma duração, ou "irregular" se
                      varia muito.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Seção: Entendendo o período fértil */}
      <Card className="border-l-4 border-system-info bg-system-info/10 duration-300">
        <CardHeader>
          <CardTitle as="h2" className="text-xl font-bold text-text-primary">
            💕 Entendendo o Período Fértil
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4 text-text-primary">
            <p>
              O <strong className="text-system-info">período fértil</strong> é a fase do ciclo
              menstrual em que a mulher tem maior probabilidade de engravidar. Geralmente dura cerca
              de 6 dias, incluindo o dia da ovulação e os 5 dias que a antecedem.
            </p>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div>
                <h4 className="mb-2 font-semibold text-growth-green">🥚 Ovulação</h4>
                <ul className="space-y-1 text-sm text-text-secondary">
                  <li>• Ocorre aproximadamente 14 dias antes da próxima menstruação</li>
                  <li>• É quando o óvulo é liberado pelo ovário</li>
                  <li>• O óvulo vive cerca de 24 horas após a liberação</li>
                  <li>• É o momento de maior fertilidade</li>
                </ul>
              </div>

              <div>
                <h4 className="mb-2 font-semibold text-primary-blue-dark">📅 Janela Fértil</h4>
                <ul className="space-y-1 text-sm text-text-secondary">
                  <li>• Espermatozoides vivem até 5 dias no corpo feminino</li>
                  <li>• Por isso, relações 5 dias antes da ovulação podem resultar em gravidez</li>
                  <li>• O período mais fértil é de 2 dias antes até o dia da ovulação</li>
                  <li>• Usar múltiplos métodos aumenta a precisão</li>
                </ul>
              </div>
            </div>

            <div className="rounded-lg border border-growth-green/20 bg-growth-green/10 p-4">
              <h4 className="mb-2 font-semibold text-growth-green">🎯 Sinais de Ovulação</h4>
              <ul className="space-y-1 text-sm text-text-secondary">
                <li>
                  • <strong>Muco cervical:</strong> Torna-se claro, elástico, semelhante à clara do
                  ovo
                </li>
                <li>
                  • <strong>Temperatura basal:</strong> Pequeno aumento de 0,2-0,5°C após a ovulação
                </li>
                <li>
                  • <strong>Dor pélvica leve:</strong> Algumas mulheres sentem dor do lado do ovário
                  que ovula
                </li>
                <li>
                  • <strong>Aumento da libido:</strong> Desejo sexual pode aumentar naturalmente
                </li>
                <li>
                  • <strong>Sensibilidade nos seios:</strong> Podem ficar mais sensíveis
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Seção: Limitações e cuidados */}
      <Card className="border-l-4 border-system-warning bg-system-warning/10 duration-300">
        <CardHeader>
          <CardTitle as="h2" className="text-xl font-bold text-text-primary">
            ⚠️ Limitações e Cuidados Importantes
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4 text-text-primary">
            <p className="font-medium text-system-warning">
              <strong>Importante:</strong> Esta calculadora fornece estimativas baseadas em médias
              estatísticas e não substitui acompanhamento médico.
            </p>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div>
                <h4 className="mb-2 font-semibold text-system-warning">
                  ⚠️ A Calculadora PODE ser menos precisa em:
                </h4>
                <ul className="space-y-1 text-sm text-text-secondary">
                  <li>
                    • <strong>Ciclos irregulares:</strong> Variação maior que 4 dias entre ciclos
                  </li>
                  <li>
                    • <strong>Pós-parto:</strong> Ciclo ainda não regularizou
                  </li>
                  <li>
                    • <strong>Amamentação:</strong> Hormônios podem afetar o ciclo
                  </li>
                  <li>
                    • <strong>Uso de anticoncepcionais:</strong> Alteram o padrão natural
                  </li>
                  <li>
                    • <strong>Estresse ou doença:</strong> Podem atrasar a ovulação
                  </li>
                  <li>
                    • <strong>Mudanças de peso:</strong> Alterações hormonais
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="mb-2 font-semibold text-growth-green">
                  ✅ Consulte um Ginecologista se:
                </h4>
                <ul className="space-y-1 text-sm text-text-secondary">
                  <li>• Ciclos menores que 21 dias ou maiores que 35 dias</li>
                  <li>• Ausência de menstruação por mais de 3 meses</li>
                  <li>• Sangramento entre menstruações</li>
                  <li>• Dores muito intensas durante a menstruação</li>
                  <li>
                    • Tentativas de engravidar há mais de 6 meses (mulheres &gt;35) ou 12 meses
                    (mulheres &lt;35)
                  </li>
                  <li>• Qualquer mudança súbita no padrão menstrual</li>
                </ul>
              </div>
            </div>

            <div className="rounded-lg border border-system-info/20 bg-system-info/10 p-4">
              <p className="text-sm">
                <strong className="text-system-info">💡 Para maior precisão:</strong>
                Combine esta calculadora com métodos como{" "}
                <strong>temperatura basal corporal</strong>, <strong>testes de ovulação</strong> e{" "}
                <strong>observação do muco cervical</strong>. Anote seus ciclos por pelo menos 3
                meses para identificar padrões.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Seção: Dicas para saúde menstrual */}
      <Card className="border-l-4 border-growth-green bg-growth-green-soft duration-300">
        <CardHeader>
          <CardTitle as="h2" className="text-xl font-bold text-text-primary">
            🌺 Dicas para uma Saúde Menstrual Ideal
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <h4 className="mb-3 flex items-center font-semibold text-growth-green">
                🥗 <span className="ml-2">Alimentação e Estilo de Vida</span>
              </h4>
              <ul className="space-y-2 text-sm text-text-secondary">
                <li>• Mantenha uma dieta balanceada rica em ferro</li>
                <li>• Beba bastante água durante todo o ciclo</li>
                <li>• Pratique exercícios regulares (adaptados a cada fase)</li>
                <li>• Durma entre 7-9 horas por noite</li>
                <li>• Gerencie o estresse com técnicas de relaxamento</li>
                <li>• Evite excesso de cafeína e álcool</li>
              </ul>
            </div>

            <div>
              <h4 className="mb-3 flex items-center font-semibold text-primary-blue-dark">
                📱 <span className="ml-2">Monitoramento e Cuidados</span>
              </h4>
              <ul className="space-y-2 text-sm text-text-secondary">
                <li>• Mantenha um diário menstrual ou use apps</li>
                <li>• Anote sintomas, humor e energia de cada fase</li>
                <li>• Use produtos menstruais adequados ao seu fluxo</li>
                <li>• Troque absorventes/coletores conforme recomendado</li>
                <li>• Faça exames ginecológicos anuais</li>
                <li>• Converse abertamente sobre saúde menstrual</li>
              </ul>
            </div>

            <div>
              <h4 className="mb-3 flex items-center font-semibold text-system-info">
                💊 <span className="ml-2">Alívio de Sintomas</span>
              </h4>
              <ul className="space-y-2 text-sm text-text-secondary">
                <li>• Use compressas quentes para cólicas</li>
                <li>• Pratique yoga ou alongamento suave</li>
                <li>• Considere suplementos de magnésio (consulte médico)</li>
                <li>• Massagens abdominais podem ajudar</li>
                <li>• Chás de camomila ou erva-doce relaxam</li>
                <li>• Mantenha rotina de autocuidado em cada fase</li>
              </ul>
            </div>

            <div>
              <h4 className="mb-3 flex items-center font-semibold text-system-warning">
                📋 <span className="ml-2">Quando Buscar Ajuda</span>
              </h4>
              <ul className="space-y-2 text-sm text-text-secondary">
                <li>• Dor que interfere nas atividades diárias</li>
                <li>• Fluxo muito intenso (mais de 80ml/ciclo)</li>
                <li>• TPM severa que afeta qualidade de vida</li>
                <li>• Mudanças súbitas no padrão menstrual</li>
                <li>• Dificuldades para engravidar</li>
                <li>• Sintomas incomuns ou preocupantes</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      <FAQ
        title="Perguntas Frequentes - Calculadora de Ciclo Menstrual"
        items={[
          {
            question: "Como calcular meu período fértil de forma precisa?",
            answer:
              "O <strong>período fértil</strong> dura cerca de 6 dias: <strong>5 dias antes da ovulação + dia da ovulação</strong>. A ovulação ocorre aproximadamente 14 dias antes da próxima menstruação. Para ciclo de 28 dias, o período fértil vai do 9º ao 14º dia. Nossa calculadora ajusta conforme <strong>seu ciclo específico</strong> e histórico menstrual.",
            borderColor: "primary-blue",
          },
          {
            question: "Qual a diferença entre ciclo menstrual regular e irregular?",
            answer:
              "<strong>Ciclo regular:</strong> variação de até 2 dias entre os ciclos (ex: sempre 28-30 dias). <strong>Ciclo irregular:</strong> variação superior a 7 dias ou ausência de padrão. Ciclos normais variam de <strong>21 a 35 dias</strong>. Nossa calculadora adapta os cálculos conforme o tipo de ciclo informado.",
            borderColor: "growth-green",
          },
          {
            question: "Como identificar o dia da ovulação no meu ciclo?",
            answer:
              "A <strong>ovulação</strong> acontece cerca de 14 dias antes da próxima menstruação. <strong>Sinais físicos:</strong> muco cervical claro e elástico, leve aumento da temperatura basal (+0,2-0,5°C), dor pélvica leve. <strong>Testes de ovulação</strong> detectam o pico hormonal 24-48h antes da liberação do óvulo.",
            borderColor: "system-info",
          },
          {
            question: "O que é janela fértil e como calcular corretamente?",
            answer:
              "A <strong>janela fértil</strong> é o período com maior probabilidade de gravidez. Inclui os <strong>5 dias antes da ovulação</strong> (espermatozoides vivem até 5 dias) <strong>+ dia da ovulação</strong> (óvulo vive 24h). Para engravidar, o período mais fértil é de <strong>2 dias antes até o dia da ovulação</strong>.",
            borderColor: "system-warning",
          },
          {
            question: "Quais fatores podem alterar meu ciclo menstrual?",
            answer:
              "<strong>Fatores comuns:</strong> estresse, mudanças de peso, exercícios excessivos, doenças, viagens, alterações hormonais. <strong>Medicamentos</strong> como anticoncepcionais, antidepressivos e corticoides também afetam. <strong>Condições médicas:</strong> SOP, distúrbios da tireoide, diabetes podem causar irregularidades.",
            borderColor: "system-error-dark",
          },
          {
            question: "Como usar a calculadora para planejamento familiar?",
            answer:
              "<strong>Para engravidar:</strong> foque nas datas da janela fértil, tenha relações 2-3 dias antes da ovulação. <strong>Para evitar gravidez:</strong> evite relações no período fértil (método não 100% confiável). <strong>Acompanhamento:</strong> anote pelo menos 3 ciclos para maior precisão dos cálculos.",
            borderColor: "primary-blue",
          },
          {
            question: "Posso confiar na calculadora se meu ciclo é irregular?",
            answer:
              "Para <strong>ciclos irregulares</strong>, a calculadora oferece estimativas baseadas na média, mas a precisão é menor. <strong>Recomendamos:</strong> combine com observação do muco cervical, temperatura basal e testes de ovulação. <strong>Consulte um ginecologista</strong> para investigar causas da irregularidade.",
            borderColor: "growth-green",
          },
          {
            question: "Quando devo procurar ajuda médica sobre meu ciclo?",
            answer:
              "<strong>Procure ginecologista se:</strong> ciclos menores que 21 dias ou maiores que 35 dias, ausência de menstruação por >3 meses, sangramento entre ciclos, dores muito intensas. <strong>Para engravidar:</strong> após 6 meses tentando (>35 anos) ou 12 meses (<35 anos). <strong>Mudanças súbitas</strong> no padrão também merecem avaliação.",
            borderColor: "system-info",
          },
        ]}
        tipSection={{
          title: "Dica Importante para Saúde Feminina",
          content:
            "Para <strong>maior precisão</strong> nos cálculos, mantenha um <strong>diário menstrual</strong> por pelo menos 3 meses. Anote data de início/fim da menstruação, sintomas e características do fluxo. Combine nossa calculadora com <strong>métodos naturais</strong> como observação do muco cervical para resultados mais confiáveis.",
        }}
        footerText="<strong>Quer acompanhar seu ciclo completo?</strong> Nossa calculadora oferece projeções para os próximos 6 meses e análise detalhada das fases do ciclo."
      />

      {/* Footer com informações adicionais */}
      <Card className="border-l-4 border-primary-blue bg-primary-blue-light duration-300">
        <CardHeader>
          <CardTitle as="h2" className="text-lg font-bold text-text-primary">
            📚 Sobre Esta Calculadora de Ciclo Menstrual
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 text-sm text-text-secondary">
            <p>
              Esta calculadora de ciclo menstrual é totalmente{" "}
              <strong className="text-primary-blue-dark">gratuita</strong> e foi desenvolvida com
              base em conhecimentos científicos sobre fisiologia feminina. Os cálculos seguem
              padrões médicos reconhecidos para estimativa de ovulação e período fértil.
            </p>
            <p>
              <strong className="text-growth-green">Importante:</strong> Esta ferramenta é apenas
              para fins informativos e educacionais sobre saúde menstrual. Para planejamento
              familiar, tratamento de infertilidade ou questões médicas, sempre consulte um
              ginecologista.
            </p>
            <p className="text-xs opacity-75">
              Última atualização: Dezembro 2024 • Baseado em diretrizes médicas atualizadas •
              Privacidade garantida
            </p>
          </div>
        </CardContent>
      </Card>

      <RelatedCalculators category="saude" currentCalculatorId="ciclo-menstrual" />
    </div>
  );
}
