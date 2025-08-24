import type { MetaFunction } from "@remix-run/node";
import { useState, useEffect } from "react";
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
  calculateHydration,
  type HydrationParams,
  type HydrationResult,
} from "~/utils/calculations";

export const meta: MetaFunction = () => {
  return [
    {
      title: `Calculadora de Hidratação e Balanço Hídrico - Necessidade Diária de Água Personalizada - ${APP_NAME}`,
    },
    {
      name: "description",
      content:
        "📊 Calculadora de hidratação online GRATUITA e completa com análise personalizada por peso, idade, atividade física e condições climáticas. Descubra sua necessidade diária de água, cronograma de hidratação, riscos de desidratação e recomendações científicas baseadas no Institute of Medicine.",
    },
    {
      name: "keywords",
      content:
        "calculadora hidratação água diária, balanço hídrico personalizado, necessidade água exercício, hidratação gravidez amamentação, desidratação prevenção, água clima quente altitude, cronograma hidratação, Institute of Medicine água, calculadora água peso corporal, hidratação saúde renal",
    },
    { name: "author", content: "Calculadora Online BR" },
    { name: "robots", content: "index,follow" },
    { name: "googlebot", content: "index,follow" },
    { name: "bingbot", content: "index,follow" },
    {
      property: "og:title",
      content: `Calculadora de Hidratação e Balanço Hídrico - Água Diária Personalizada - ${APP_NAME}`,
    },
    {
      property: "og:description",
      content:
        "A calculadora de hidratação mais completa do Brasil: análise por peso, idade, atividade, clima e condições especiais. Cronograma personalizado e recomendações científicas.",
    },
    { property: "og:type", content: "website" },
    {
      property: "og:url",
      content: "https://calculadoraonlinebr.com.br/calculadoras/saude/hidratacao",
    },
    { property: "og:site_name", content: APP_NAME },
    { property: "og:locale", content: "pt_BR" },
    { name: "twitter:card", content: "summary_large_image" },
    {
      name: "twitter:title",
      content: `Calculadora Hidratação Online - Balanço Hídrico Personalizado - ${APP_NAME}`,
    },
    {
      name: "twitter:description",
      content:
        "Ferramenta completa para calcular hidratação: análise por atividade, clima, gravidez e condições de saúde. Cronograma personalizado e prevenção de desidratação.",
    },
    { name: "twitter:creator", content: "@CalculadoraBR" },
    { name: "format-detection", content: "telephone=no" },
    { name: "mobile-web-app-capable", content: "yes" },
    { name: "apple-mobile-web-app-capable", content: "yes" },
    { name: "apple-mobile-web-app-status-bar-style", content: "default" },
    { name: "theme-color", content: "#DC2626" },
    { httpEquiv: "content-language", content: "pt-br" },
    { name: "geo.region", content: "BR" },
    { name: "geo.country", content: "Brazil" },
    { name: "geo.placename", content: "Brazil" },
    { name: "language", content: "Portuguese" },
    // Structured Data
    {
      name: "application/ld+json",
      content: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "WebApplication",
        name: "Calculadora de Hidratação e Balanço Hídrico",
        description:
          "Calculadora online gratuita para determinar necessidade diária de água personalizada com base em peso, idade, atividade física e condições ambientais.",
        url: "https://calculadoraonlinebr.com.br/calculadoras/saude/hidratacao",
        applicationCategory: "HealthApplication",
        operatingSystem: "Any",
        permissions: "browser",
        isAccessibleForFree: true,
        creator: {
          "@type": "Organization",
          name: "Calculadora Online BR",
        },
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "BRL",
        },
      }),
    },
  ];
};

export default function HidratacaoCalculator() {
  const [params, setParams] = useState<HydrationParams>({
    weight: 70,
    age: 30,
    gender: "male",
    activityLevel: "moderate",
    climate: "temperate",
    altitude: "sea_level",
    pregnancy: false,
    breastfeeding: false,
    healthConditions: [],
    currentIntake: 0,
    startTime: "06:00",
    endTime: "22:00",
  });

  const [result, setResult] = useState<HydrationResult | null>(null);
  const [showAdvanced, setShowAdvanced] = useState(false);

  // Global Analytics Tracking
  const {
    startCalculation,
    endCalculation,
    trackFeature,
    trackButtonClick,
    trackStepsToggle,
    trackInputFocus,
  } = useAutoCalculatorTracking({
    calculatorType: "hidratacao",
    category: "saude",
  });

  const { trackInputChange, trackFormSubmission } = useFormTracking("hidratacao");

  const handleCalculate = () => {
    const calculated = calculateHydration(params);
    setResult(calculated);
  };

  const handleHealthConditionToggle = (condition: string) => {
    const newConditions = params.healthConditions?.includes(condition)
      ? params.healthConditions.filter((c) => c !== condition)
      : [...(params.healthConditions || []), condition];

    setParams({ ...params, healthConditions: newConditions });
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "low":
        return "text-green-600";
      case "moderate":
        return "text-yellow-600";
      case "high":
        return "text-red-600";
      default:
        return "text-gray-600";
    }
  };

  const getRiskBadge = (risk: string) => {
    switch (risk) {
      case "low":
        return "bg-green-100 text-green-800";
      case "moderate":
        return "bg-yellow-100 text-yellow-800";
      case "high":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="mx-auto max-w-2xl space-y-6 px-4 sm:space-y-8 md:max-w-4xl lg:max-w-6xl">
      <Breadcrumb>
        <BreadcrumbItem href="/">Início</BreadcrumbItem>
        <BreadcrumbItem href="/calculadoras">Calculadoras</BreadcrumbItem>
        <BreadcrumbItem href="/calculadoras/saude">Saúde</BreadcrumbItem>
        <BreadcrumbItem isLast>Hidratação</BreadcrumbItem>
      </Breadcrumb>

      <header className="space-y-3 text-center sm:space-y-4">
        <h1 className="mb-3 text-2xl font-bold text-text-primary sm:mb-4 sm:text-3xl lg:text-4xl">
          <span className="hidden sm:inline">Calculadora de Hidratação e Balanço Hídrico</span>
          <span className="sm:hidden">Calculadora de Hidratação</span>
        </h1>
        <p className="mx-auto max-w-3xl px-4 text-sm text-text-secondary-dark sm:text-base lg:text-lg">
          Descubra sua{" "}
          <strong className="text-health-red">necessidade diária personalizada de água</strong> com
          base em peso, idade, atividade física, clima e condições especiais. Recomendações
          científicas da OMS.
        </p>
        <div className="inline-block rounded-lg bg-health-red/10 p-3 duration-300 sm:p-4">
          <p className="text-xs font-medium text-text-primary sm:text-sm">
            💧 <strong>Resultado instantâneo</strong> • 🔬 <strong>Baseado na OMS</strong> • 📱{" "}
            <strong>100% gratuito</strong>
          </p>
        </div>
      </header>

      <Card>
        <CardHeader>
          <CardTitle as="h2">Dados para o Cálculo</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <Input
                type="number"
                label="Peso (kg)"
                value={params.weight}
                onChange={(e) => setParams({ ...params, weight: Number(e.target.value) })}
                placeholder="Ex: 70"
                min="30"
                max="200"
                required
                fullWidth
              />
              <Input
                type="number"
                label="Idade (anos)"
                value={params.age}
                onChange={(e) => setParams({ ...params, age: Number(e.target.value) })}
                placeholder="Ex: 30"
                min="1"
                max="120"
                required
                fullWidth
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Select
                label="Sexo"
                value={params.gender}
                onChange={(value: "male" | "female") => setParams({ ...params, gender: value })}
                options={[
                  { value: "male", label: "Masculino" },
                  { value: "female", label: "Feminino" },
                ]}
                fullWidth
              />
              <Select
                label="Atividade Física"
                value={params.activityLevel}
                onChange={(value: any) => setParams({ ...params, activityLevel: value })}
                options={[
                  { value: "sedentary", label: "Sedentário" },
                  { value: "light", label: "Leve (1-3x/sem)" },
                  { value: "moderate", label: "Moderado (3-5x/sem)" },
                  { value: "intense", label: "Intenso (6-7x/sem)" },
                  { value: "extreme", label: "Extremo (2x/dia)" },
                ]}
                fullWidth
              />
            </div>

            <Select
              label="Condições Climáticas"
              value={params.climate}
              onChange={(value: any) => setParams({ ...params, climate: value })}
              options={[
                { value: "cold", label: "Frio (< 10°C)" },
                { value: "temperate", label: "Temperado (10-25°C)" },
                { value: "hot", label: "Quente (25-35°C)" },
                { value: "very_hot", label: "Muito Quente (> 35°C)" },
              ]}
              fullWidth
            />

            {/* Advanced Options Toggle */}
            <Button
              onClick={() => setShowAdvanced(!showAdvanced)}
              variant="outline"
              className="w-full"
            >
              {showAdvanced ? "Ocultar" : "Mostrar"} Opções Avançadas
            </Button>

            {/* Advanced Options */}
            {showAdvanced && (
              <div className="space-y-6 border-t border-gray-200 pt-4">
                {/* Altitude Selection */}
                <div>
                  <label className="mb-3 block text-sm font-medium text-text-primary">
                    Altitude
                  </label>
                  <div className="grid grid-cols-1 gap-2">
                    {[
                      { value: "sea_level", label: "Nível do mar", sublabel: "0-1000m" },
                      { value: "moderate", label: "Altitude moderada", sublabel: "1000-2500m" },
                      { value: "high", label: "Alta altitude", sublabel: "> 2500m" },
                    ].map((option) => (
                      <button
                        key={option.value}
                        onClick={() => setParams({ ...params, altitude: option.value as any })}
                        className={`flex items-center justify-between rounded-lg border p-3 text-left transition-all ${
                          params.altitude === option.value
                            ? "border-health-red bg-health-red/5 text-health-red"
                            : "border-gray-200 text-text-primary hover:border-gray-300"
                        }`}
                      >
                        <div>
                          <div className="font-medium">{option.label}</div>
                          <div className="text-sm text-text-secondary">{option.sublabel}</div>
                        </div>
                        <div
                          className={`h-4 w-4 rounded-full border-2 ${
                            params.altitude === option.value
                              ? "border-health-red bg-health-red"
                              : "border-gray-300"
                          }`}
                        >
                          {params.altitude === option.value && (
                            <div className="m-0.5 h-2 w-2 rounded-full bg-white"></div>
                          )}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Female Specific Options */}
                {params.gender === "female" && (
                  <div>
                    <label className="mb-3 block text-sm font-medium text-text-primary">
                      Condições Especiais
                    </label>
                    <div className="space-y-2">
                      <button
                        onClick={() => setParams({ ...params, pregnancy: !params.pregnancy })}
                        className={`flex w-full items-center justify-between rounded-lg border p-3 text-left transition-all ${
                          params.pregnancy
                            ? "border-health-red bg-health-red/5 text-health-red"
                            : "border-gray-200 text-text-primary hover:border-gray-300"
                        }`}
                      >
                        <div>
                          <div className="font-medium">Gravidez</div>
                          <div className="text-sm text-text-secondary">+300ml necessários</div>
                        </div>
                        <div
                          className={`flex h-5 w-5 items-center justify-center rounded border-2 ${
                            params.pregnancy ? "border-health-red bg-health-red" : "border-gray-300"
                          }`}
                        >
                          {params.pregnancy && (
                            <svg
                              className="h-3 w-3 text-white"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clipRule="evenodd"
                              />
                            </svg>
                          )}
                        </div>
                      </button>

                      <button
                        onClick={() =>
                          setParams({ ...params, breastfeeding: !params.breastfeeding })
                        }
                        className={`flex w-full items-center justify-between rounded-lg border p-3 text-left transition-all ${
                          params.breastfeeding
                            ? "border-health-red bg-health-red/5 text-health-red"
                            : "border-gray-200 text-text-primary hover:border-gray-300"
                        }`}
                      >
                        <div>
                          <div className="font-medium">Amamentação</div>
                          <div className="text-sm text-text-secondary">+600ml necessários</div>
                        </div>
                        <div
                          className={`flex h-5 w-5 items-center justify-center rounded border-2 ${
                            params.breastfeeding
                              ? "border-health-red bg-health-red"
                              : "border-gray-300"
                          }`}
                        >
                          {params.breastfeeding && (
                            <svg
                              className="h-3 w-3 text-white"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clipRule="evenodd"
                              />
                            </svg>
                          )}
                        </div>
                      </button>
                    </div>
                  </div>
                )}

                {/* Health Conditions */}
                <div>
                  <label className="mb-3 block text-sm font-medium text-text-primary">
                    Condições de Saúde
                  </label>
                  <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                    {[
                      { id: "fever", label: "Febre", adjustment: "+500ml" },
                      { id: "diarrhea", label: "Diarreia", adjustment: "+600ml" },
                      { id: "vomiting", label: "Vômitos", adjustment: "+400ml" },
                      { id: "kidney_stones", label: "Pedra nos rins", adjustment: "+800ml" },
                      { id: "diabetes", label: "Diabetes", adjustment: "+300ml" },
                    ].map((condition) => (
                      <button
                        key={condition.id}
                        onClick={() => handleHealthConditionToggle(condition.id)}
                        className={`flex items-center justify-between rounded-lg border p-3 text-left transition-all ${
                          params.healthConditions?.includes(condition.id)
                            ? "border-health-red bg-health-red/5 text-health-red"
                            : "border-gray-200 text-text-primary hover:border-gray-300"
                        }`}
                      >
                        <div>
                          <div className="font-medium">{condition.label}</div>
                          <div className="text-sm text-text-secondary">{condition.adjustment}</div>
                        </div>
                        <div
                          className={`flex h-5 w-5 items-center justify-center rounded border-2 ${
                            params.healthConditions?.includes(condition.id)
                              ? "border-health-red bg-health-red"
                              : "border-gray-300"
                          }`}
                        >
                          {params.healthConditions?.includes(condition.id) && (
                            <svg
                              className="h-3 w-3 text-white"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clipRule="evenodd"
                              />
                            </svg>
                          )}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Current Water Intake */}
                {/* Horários de Hidratação */}
                <div>
                  <label className="mb-3 block text-sm font-medium text-text-primary">
                    Horário de Hidratação
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="mb-1 block text-xs text-text-secondary">
                        Início do dia
                      </label>
                      <Input
                        type="time"
                        value={params.startTime || "06:00"}
                        onChange={(e) => setParams({ ...params, startTime: e.target.value })}
                        className="w-full"
                      />
                    </div>
                    <div>
                      <label className="mb-1 block text-xs text-text-secondary">Fim do dia</label>
                      <Input
                        type="time"
                        value={params.endTime || "22:00"}
                        onChange={(e) => setParams({ ...params, endTime: e.target.value })}
                        className="w-full"
                      />
                    </div>
                  </div>
                  <p className="mt-1 text-xs text-text-secondary">
                    Define o período ativo para distribuição da hidratação
                  </p>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-text-primary">
                    Ingestão atual de água (ml/dia)
                  </label>
                  <Input
                    type="number"
                    value={params.currentIntake || ""}
                    onChange={(e) =>
                      setParams({ ...params, currentIntake: Number(e.target.value) || 0 })
                    }
                    placeholder="Ex: 2000"
                    min="0"
                    max="10000"
                    className="w-full"
                  />
                  <p className="mt-1 text-xs text-text-secondary">
                    Opcional - para avaliação de risco de desidratação
                  </p>
                </div>
              </div>
            )}

            <div className="flex justify-center gap-4">
              <Button onClick={handleCalculate} className="px-8">
                Calcular
              </Button>
              <Button
                onClick={() =>
                  setParams({
                    weight: 70,
                    age: 30,
                    gender: "male",
                    activityLevel: "moderate",
                    climate: "temperate",
                    altitude: "sea_level",
                    pregnancy: false,
                    breastfeeding: false,
                    healthConditions: [],
                    currentIntake: 0,
                    startTime: "06:00",
                    endTime: "22:00",
                  })
                }
                variant="outline"
                className="border-system-error px-8 text-system-error hover:bg-system-error hover:text-white"
              >
                Limpar
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {result && (
        <>
          <Card className="result-success border-2 border-health-red bg-health-red/5">
            <CardHeader>
              <CardTitle as="h3">Resultado da Hidratação</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 text-center">
                <div className="text-4xl font-bold tabular-nums text-health-red">
                  {result.totalDailyLiters} L
                </div>
                <div className="text-xl font-semibold text-text-primary">
                  Necessidade Diária de Água
                </div>
                <p className="text-text-secondary">
                  {result.totalDaily} ml • {result.perKg} ml/kg • {result.perHour} ml/hora
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Risk Assessment */}
          {params.currentIntake && params.currentIntake > 0 && (
            <Card
              className={`border-l-4 ${
                result.riskLevel === "low"
                  ? "border-green-400 bg-green-50"
                  : result.riskLevel === "moderate"
                    ? "border-yellow-400 bg-yellow-50"
                    : "border-red-400 bg-red-50"
              }`}
            >
              <CardHeader>
                <CardTitle
                  as="h3"
                  className={`flex items-center space-x-2 ${getRiskColor(result.riskLevel)}`}
                >
                  <span className="text-lg">
                    {result.riskLevel === "low"
                      ? "✅"
                      : result.riskLevel === "moderate"
                        ? "⚠️"
                        : "🚨"}
                  </span>
                  <span>
                    Risco de Desidratação:{" "}
                    {result.riskLevel === "low"
                      ? "Baixo"
                      : result.riskLevel === "moderate"
                        ? "Moderado"
                        : "Alto"}
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-text-secondary">
                  Ingestão atual: {params.currentIntake}ml (
                  {Math.round((params.currentIntake / result.totalDaily) * 100)}% do recomendado)
                </p>
              </CardContent>
            </Card>
          )}

          {/* Quick Stats */}
          <Card className="border-l-4 border-system-info bg-system-info/10">
            <CardHeader>
              <CardTitle as="h3" className="text-system-info">
                📊 Conversão Prática
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-system-info">{result.glassesPerDay}</div>
                  <div className="text-sm text-text-secondary">Copos (250ml)</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-system-info">{result.bottlesPerDay}</div>
                  <div className="text-sm text-text-secondary">Garrafas (500ml)</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Breakdown */}
          <Card>
            <CardHeader>
              <CardTitle as="h3">🧮 Detalhamento do Cálculo</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Base (peso corporal):</span>
                  <span className="font-medium">{result.baseWater}ml</span>
                </div>
                {result.activityAdjustment > 0 && (
                  <div className="flex justify-between text-blue-600">
                    <span>Atividade física:</span>
                    <span className="font-medium">+{result.activityAdjustment}ml</span>
                  </div>
                )}
                {result.climateAdjustment !== 0 && (
                  <div
                    className={`flex justify-between ${result.climateAdjustment > 0 ? "text-orange-600" : "text-blue-600"}`}
                  >
                    <span>Clima:</span>
                    <span className="font-medium">
                      {result.climateAdjustment > 0 ? "+" : ""}
                      {result.climateAdjustment}ml
                    </span>
                  </div>
                )}
                {result.altitudeAdjustment > 0 && (
                  <div className="flex justify-between text-purple-600">
                    <span>Altitude:</span>
                    <span className="font-medium">+{result.altitudeAdjustment}ml</span>
                  </div>
                )}
                {result.specialConditionsAdjustment > 0 && (
                  <div className="flex justify-between text-red-600">
                    <span>Condições especiais:</span>
                    <span className="font-medium">+{result.specialConditionsAdjustment}ml</span>
                  </div>
                )}
                <div className="flex justify-between border-t pt-2 font-semibold">
                  <span>Total:</span>
                  <span>{result.totalDaily}ml</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recommendations */}
          {result.recommendations.length > 0 && (
            <Card className="border-l-4 border-blue-400 bg-blue-50">
              <CardHeader>
                <CardTitle as="h3" className="flex items-center text-blue-600">
                  <span className="mr-2 text-lg">💡</span>
                  Recomendações Personalizadas
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-1 text-sm">
                  {result.recommendations.map((rec, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <span className="mt-1 text-blue-600">•</span>
                      <span className="text-text-secondary">{rec}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}
        </>
      )}

      {/* Hydration Schedule */}
      {result && (
        <Card className="border-l-4 border-amber-400 bg-amber-50">
          <CardHeader>
            <CardTitle as="h3" className="text-amber-600">
              ⏰ Cronograma Completo de Hidratação Diária
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p className="text-center text-sm text-text-secondary">
                <strong>
                  Distribua {result.totalDailyLiters}L ao longo do dia seguindo este cronograma
                  personalizado:
                </strong>
              </p>

              <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                {result.hydrationSchedule.map((schedule, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between rounded-lg border bg-white p-3 shadow-sm"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="text-lg font-bold text-amber-600">{schedule.time}</div>
                      <div className="text-sm text-text-secondary">{schedule.description}</div>
                    </div>
                    <div className="rounded bg-amber-100 px-2 py-1 font-semibold text-text-primary">
                      {schedule.amount}ml
                    </div>
                  </div>
                ))}
              </div>

              <div className="rounded-lg border border-blue-200 bg-blue-50 p-4">
                <div className="space-y-2">
                  <h4 className="font-semibold text-blue-600">
                    💡 Dicas Importantes para Hidratação Ideal:
                  </h4>
                  <ul className="space-y-1 text-xs text-text-secondary">
                    <li>
                      • <strong>Ao acordar:</strong> Beba água em temperatura ambiente para
                      reidratação após jejum noturno
                    </li>
                    <li>
                      • <strong>Antes das refeições:</strong> 30-60ml ajudam na digestão e saciedade
                    </li>
                    <li>
                      • <strong>Durante exercícios:</strong> 150-250ml a cada 15-20 minutos de
                      atividade intensa
                    </li>
                    <li>
                      • <strong>Antes de dormir:</strong> Evite grandes quantidades para não
                      interromper o sono
                    </li>
                    <li>
                      • <strong>Clima quente:</strong> Aumente a frequência, não o volume por vez
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Tabela de Necessidades Hídricas */}
      <Card>
        <CardHeader>
          <CardTitle as="h3">Tabela de Necessidades Diárias de Água</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="py-2 text-left">Peso Corporal</th>
                  <th className="py-2 text-left">Necessidade Base</th>
                  <th className="py-2 text-left">Com Exercício</th>
                  <th className="py-2 text-left">Clima Quente</th>
                </tr>
              </thead>
              <tbody className="space-y-2">
                <tr className="border-b">
                  <td className="py-2">50 kg</td>
                  <td className="py-2 font-medium text-health-red">1,75L</td>
                  <td className="py-2">2,0 - 2,4L</td>
                  <td className="py-2">2,0 - 2,25L</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2">60 kg</td>
                  <td className="py-2 font-medium text-health-red">2,1L</td>
                  <td className="py-2">2,4 - 2,8L</td>
                  <td className="py-2">2,4 - 2,7L</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2">70 kg</td>
                  <td className="py-2 font-medium text-health-red">2,45L</td>
                  <td className="py-2">2,8 - 3,3L</td>
                  <td className="py-2">2,8 - 3,15L</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2">80 kg</td>
                  <td className="py-2 font-medium text-health-red">2,8L</td>
                  <td className="py-2">3,2 - 3,8L</td>
                  <td className="py-2">3,2 - 3,6L</td>
                </tr>
                <tr>
                  <td className="py-2">90 kg</td>
                  <td className="py-2 font-medium text-health-red">3,15L</td>
                  <td className="py-2">3,6 - 4,3L</td>
                  <td className="py-2">3,6 - 4,05L</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mt-2 text-xs text-text-secondary">
            * Valores baseados na fórmula OMS: 35ml por kg de peso corporal
          </p>
        </CardContent>
      </Card>

      {/* Seção: O que é Hidratação */}
      <Card className="border-l-4 border-health-red bg-health-red/5 duration-300">
        <CardHeader>
          <CardTitle as="h2" className="text-xl font-bold text-text-primary">
            💧 O que é Hidratação e Por que é Fundamental?
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4 text-text-primary">
            <p>
              A <strong className="text-health-red">hidratação adequada</strong> é essencial para o
              funcionamento ideal do organismo humano. A água representa cerca de 60% do peso
              corporal em adultos e participa de praticamente todos os processos metabólicos.
            </p>
            <p>
              Nossa calculadora utiliza as{" "}
              <strong className="text-health-red">
                diretrizes da Organização Mundial da Saúde (OMS)
              </strong>{" "}
              que recomendam{" "}
              <strong className="rounded bg-background-dark-secondary px-2 py-1 font-mono text-health-red">
                35ml de água por kg de peso corporal
              </strong>{" "}
              como base diária.
            </p>
            <p>
              A necessidade hídrica varia conforme{" "}
              <strong className="text-primary-blue-dark">
                atividade física, clima, altitude, idade, condições de saúde e características
                individuais
              </strong>
              , por isso nossa ferramenta considera todos esses fatores para um cálculo
              personalizado.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Seção: Como Interpretar seu Resultado */}
      <Card className="border-l-4 border-primary-blue bg-primary-blue-light duration-300">
        <CardHeader>
          <CardTitle as="h2" className="text-xl font-bold text-text-primary">
            📊 Como Interpretar sua Necessidade de Hidratação
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <div className="h-4 w-4 rounded bg-green-500"></div>
                  <span className="font-semibold text-text-primary">Hidratação Ideal</span>
                </div>
                <p className="ml-6 text-sm text-text-secondary">
                  Urina amarelo claro, sem sede constante, energia normal, pele elástica.
                </p>
              </div>

              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <div className="h-4 w-4 rounded bg-yellow-500"></div>
                  <span className="font-semibold text-yellow-600">Desidratação Leve</span>
                </div>
                <p className="ml-6 text-sm text-text-secondary">
                  Sede aumentada, urina amarela escura, boca seca, redução da energia.
                </p>
              </div>

              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <div className="h-4 w-4 rounded bg-orange-500"></div>
                  <span className="font-semibold text-orange-600">Desidratação Moderada</span>
                </div>
                <p className="ml-6 text-sm text-text-secondary">
                  Urina muito escura, dor de cabeça, tontura, cansaço extremo.
                </p>
              </div>

              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <div className="h-4 w-4 rounded bg-red-500"></div>
                  <span className="font-semibold text-red-600">Desidratação Severa</span>
                </div>
                <p className="ml-6 text-sm text-text-secondary">
                  Confusão mental, pouca urina, pele sem elasticidade.{" "}
                  <strong>Emergência médica!</strong>
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Seção: Fatores que Influenciam */}
      <Card className="border-l-4 border-system-warning bg-system-warning/10 duration-300">
        <CardHeader>
          <CardTitle as="h2" className="text-xl font-bold text-text-primary">
            🌡️ Fatores que Influenciam sua Necessidade de Água
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4 text-text-primary">
            <p className="font-medium text-system-warning">
              <strong>Importante:</strong> Vários fatores podem alterar significativamente sua
              necessidade hídrica diária.
            </p>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div>
                <h4 className="mb-2 font-semibold text-system-warning">
                  🔥 Aumentam a Necessidade:
                </h4>
                <ul className="space-y-1 text-sm text-text-secondary">
                  <li>
                    • <strong>Exercícios físicos:</strong> +12% a +35% da necessidade base
                  </li>
                  <li>
                    • <strong>Clima quente:</strong> Até 45ml/kg (25% a mais)
                  </li>
                  <li>
                    • <strong>Alta altitude:</strong> +15% a +25% acima de 2.500m
                  </li>
                  <li>
                    • <strong>Febre:</strong> +500ml por dia
                  </li>
                  <li>
                    • <strong>Diarreia/vômitos:</strong> +400ml a +600ml
                  </li>
                  <li>
                    • <strong>Gravidez:</strong> +300ml diários
                  </li>
                  <li>
                    • <strong>Amamentação:</strong> +600ml diários
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="mb-2 font-semibold text-blue-600">❄️ Situações Especiais:</h4>
                <ul className="space-y-1 text-sm text-text-secondary">
                  <li>
                    • <strong>Clima frio:</strong> Redução de 5% da necessidade
                  </li>
                  <li>
                    • <strong>Idosos:</strong> Menor sensação de sede, precisa atenção
                  </li>
                  <li>
                    • <strong>Crianças:</strong> Maior proporção de água corporal
                  </li>
                  <li>
                    • <strong>Atletas:</strong> Podem precisar de 6-8L em dias intensos
                  </li>
                  <li>
                    • <strong>Diabetes:</strong> +300ml para compensar poliúria
                  </li>
                  <li>
                    • <strong>Pedras nos rins:</strong> +800ml para prevenção
                  </li>
                </ul>
              </div>
            </div>

            <div className="rounded-lg border border-system-info/20 bg-system-info/10 p-4">
              <p className="text-sm">
                <strong className="text-system-info">💡 Dica Profissional:</strong>
                Monitore a cor da urina como indicador de hidratação.{" "}
                <strong>Amarelo claro indica hidratação adequada</strong>. Se estiver muito escura,
                aumente gradualmente a ingestão de água.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Seção: Dicas para Manter Hidratação */}
      <Card className="border-l-4 border-growth-green bg-growth-green-soft duration-300">
        <CardHeader>
          <CardTitle as="h2" className="text-xl font-bold text-text-primary">
            💪 Estratégias para Manter Hidratação Ideal
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <h4 className="mb-3 flex items-center font-semibold text-growth-green">
                🚰 <span className="ml-2">Hábitos de Hidratação</span>
              </h4>
              <ul className="space-y-2 text-sm text-text-secondary">
                <li>• Beba água ao acordar para reidratar após jejum</li>
                <li>• Mantenha uma garrafa de água sempre próxima</li>
                <li>• Configure lembretes no celular a cada 2 horas</li>
                <li>• Beba água antes, durante e após exercícios</li>
                <li>• Prefira água em temperatura ambiente</li>
                <li>• Aumente gradualmente se está bebendo pouco</li>
              </ul>
            </div>

            <div>
              <h4 className="mb-3 flex items-center font-semibold text-primary-blue">
                🥤 <span className="ml-2">Alternativas Saudáveis</span>
              </h4>
              <ul className="space-y-2 text-sm text-text-secondary">
                <li>• Água com fatias de limão, pepino ou hortelã</li>
                <li>• Chás naturais sem açúcar (camomila, erva-doce)</li>
                <li>• Água de coco natural (rica em eletrólitos)</li>
                <li>• Sucos naturais diluídos (50% água, 50% suco)</li>
                <li>• Sopas e caldos caseiros</li>
                <li>• Frutas ricas em água (melancia, laranja)</li>
              </ul>
            </div>
          </div>

          <div className="mt-6 rounded-lg border border-yellow-200 bg-yellow-50 p-4">
            <h4 className="mb-2 font-semibold text-yellow-800">⚠️ Evite ou Limite:</h4>
            <div className="grid grid-cols-1 gap-4 text-sm text-text-secondary md:grid-cols-3">
              <div>
                <p>
                  <strong>Bebidas com Cafeína:</strong>
                </p>
                <p className="text-xs">
                  Café, chá preto, refrigerantes - têm efeito diurético leve
                </p>
              </div>
              <div>
                <p>
                  <strong>Bebidas Açucaradas:</strong>
                </p>
                <p className="text-xs">
                  Refrigerantes, sucos industriais - não hidratam eficientemente
                </p>
              </div>
              <div>
                <p>
                  <strong>Bebidas Alcoólicas:</strong>
                </p>
                <p className="text-xs">Aumentam a desidratação por efeito diurético</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Medical Disclaimer */}
      <Card className="border-blue-200 bg-blue-50">
        <CardContent className="p-6">
          <div className="flex items-start space-x-3">
            <span className="text-2xl">⚕️</span>
            <div>
              <h3 className="mb-2 font-semibold text-text-primary">Aviso Médico Importante</h3>
              <p className="text-sm leading-relaxed text-text-secondary">
                Esta calculadora fornece estimativas baseadas em diretrizes científicas reconhecidas
                da <strong>OMS e Institute of Medicine</strong>, mas
                <strong> não substitui orientação médica profissional</strong>. Consulte um médico
                ou nutricionista para avaliação personalizada, especialmente se você tem condições
                de saúde específicas, toma medicamentos diuréticos ou tem histórico de problemas
                renais.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <FAQ
        title="Perguntas Frequentes - Calculadora de Hidratação"
        items={[
          {
            question: "Quanta água devo beber por dia para manter hidratação adequada?",
            answer:
              "A <strong>necessidade diária de água</strong> varia conforme peso, idade, atividade física e clima. A fórmula base da OMS recomenda <strong>35ml por kg de peso corporal</strong>, mas pode chegar a 45ml/kg em climas quentes ou com exercícios intensos. Nossa calculadora personaliza esse cálculo considerando todos os fatores individuais.",
            borderColor: "primary-blue",
          },
          {
            question: "Como calcular minha necessidade diária de hidratação de forma precisa?",
            answer:
              "Para calcular com precisão, considere: <strong>peso corporal × 35ml</strong> como base, depois ajuste conforme <strong>atividade física</strong> (+12% a +35%), <strong>clima quente</strong> (+25%), <strong>altitude elevada</strong> (+15% a +25%) e <strong>condições especiais</strong> como gravidez (+300ml) ou amamentação (+600ml).",
            borderColor: "growth-green",
          },
          {
            question: "A atividade física influencia na quantidade de água necessária?",
            answer:
              "Sim, significativamente. <strong>Exercícios leves</strong> aumentam a necessidade em 12%, <strong>moderados</strong> em 20%, <strong>intensos</strong> em 30% e <strong>extremos</strong> em 35%. Durante atividade física intensa, beba <strong>150-250ml a cada 15-20 minutos</strong> para repor as perdas pelo suor.",
            borderColor: "system-info",
          },
          {
            question: "Qual a diferença entre hidratação para homens e mulheres?",
            answer:
              "Homens geralmente precisam de mais água devido ao <strong>maior peso corporal</strong> e <strong>massa muscular</strong>. Mulheres têm necessidades especiais durante <strong>gravidez</strong> (+300ml/dia), <strong>amamentação</strong> (+600ml/dia) e <strong>ciclo menstrual</strong>. A calculadora ajusta automaticamente conforme o sexo e condições especiais.",
            borderColor: "system-warning",
          },
          {
            question: "Como o clima brasileiro afeta minha necessidade de água?",
            answer:
              "O <strong>clima tropical</strong> brasileiro aumenta a necessidade hídrica. Em temperaturas <strong>acima de 25°C</strong>, aumente 15-25% da necessidade base. Em <strong>clima muito quente</strong> (>35°C), pode ser necessário até 45ml/kg. O <strong>ar condicionado</strong> e <strong>ambientes secos</strong> também aumentam a desidratação.",
            borderColor: "system-error-dark",
          },
          {
            question: "Quais são os sinais de desidratação que devo observar?",
            answer:
              "<strong>Desidratação leve:</strong> sede, urina amarela escura, boca seca. <strong>Moderada:</strong> dor de cabeça, tontura, cansaço extremo. <strong>Severa:</strong> confusão mental, pouca urina, pele sem elasticidade. <strong>Dica:</strong> urina amarelo claro indica hidratação ideal.",
            borderColor: "primary-blue",
          },
          {
            question: "Posso substituir água por outras bebidas para hidratação?",
            answer:
              "<strong>Melhores opções:</strong> água pura, água com limão, chás naturais sem açúcar, água de coco. <strong>Limite:</strong> bebidas com cafeína (têm efeito diurético leve) e <strong>evite:</strong> refrigerantes açucarados e álcool (desidratam). Frutas ricas em água como melancia também ajudam na hidratação.",
            borderColor: "growth-green",
          },
          {
            question: "Como distribuir a ingestão de água ao longo do dia?",
            answer:
              "Distribua uniformemente: <strong>300ml ao acordar</strong>, <strong>200ml antes das refeições</strong>, <strong>pequenos goles frequentes</strong> durante o dia. Use nosso cronograma personalizado que considera seus horários de sono e atividades. Evite grandes volumes próximo ao horário de dormir.",
            borderColor: "system-info",
          },
        ]}
        tipSection={{
          title: "Dica Importante para Hidratação Brasileira",
          content:
            "No <strong>clima tropical brasileiro</strong>, mantenha sempre uma garrafa de água próxima e beba pequenos goles frequentes ao invés de grandes volumes espaçados. Durante o verão ou atividades ao ar livre, <strong>aumente 25% da necessidade calculada</strong> e observe a cor da urina como indicador de hidratação.",
        }}
        footerText="<strong>Precisa calcular sua hidratação ideal?</strong> Nossa calculadora oferece resultados personalizados e científicos baseados nas diretrizes da OMS."
      />

      <RelatedCalculators category="saude" currentCalculatorId="hidratacao" />
    </div>
  );
}
