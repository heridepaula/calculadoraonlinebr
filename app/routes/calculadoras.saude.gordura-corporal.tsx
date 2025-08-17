import type { MetaFunction } from "@remix-run/node";
import { useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  Input,
  Button,
  Breadcrumb,
  BreadcrumbItem,
} from "~/components/ui";
import { RelatedCalculators, FAQ } from "~/components";
import { APP_NAME } from "~/lib/constants";
import { useAutoCalculatorTracking, useFormTracking } from "~/hooks/useAutoCalculatorTracking";

export const meta: MetaFunction = () => {
  return [
    { title: `Calculadora de Gordura Corporal - ${APP_NAME}` },
    {
      name: "description",
      content:
        "Calcule seu percentual de gordura corporal usando métodos científicos como Navy Method e Jackson-Pollock. Avalie sua composição corporal e receba orientações personalizadas.",
    },
    {
      name: "keywords",
      content:
        "calculadora gordura corporal, percentual gordura, navy method, jackson pollock, composição corporal, massa magra, avaliação física",
    },
    { name: "author", content: "Calculadora Online BR" },
    { property: "og:title", content: `Calculadora de Gordura Corporal - ${APP_NAME}` },
    {
      property: "og:description",
      content:
        "Calcule seu percentual de gordura corporal com métodos científicos precisos. Avalie sua saúde e composição corporal gratuitamente.",
    },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary" },
    { name: "twitter:title", content: `Calculadora de Gordura Corporal - ${APP_NAME}` },
    {
      name: "twitter:description",
      content: "Avalie sua composição corporal com cálculos precisos de gordura corporal.",
    },
  ];
};

interface BodyFatResult {
  bodyFatPercentage: number;
  fatMass: number;
  leanMass: number;
  category: string;
  categoryColor: string;
  recommendations: string[];
}

interface ValidationErrors {
  weight?: string;
  height?: string;
  age?: string;
  neck?: string;
  waist?: string;
  hips?: string;
  triceps?: string;
  suprailiac?: string;
  abdominal?: string;
}

type CalculationMethod = "navy" | "jackson-pollock" | "waist-hip";
type Gender = "male" | "female";

export default function GorduraCorporal() {
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState<Gender>("male");
  const [method, setMethod] = useState<CalculationMethod>("navy");

  // Navy Method measurements
  const [neck, setNeck] = useState("");
  const [waist, setWaist] = useState("");
  const [hips, setHips] = useState("");

  // Jackson-Pollock measurements
  const [triceps, setTriceps] = useState("");
  const [suprailiac, setSuprailiac] = useState("");
  const [abdominal, setAbdominal] = useState("");

  const [result, setResult] = useState<BodyFatResult | null>(null);
  const [errors, setErrors] = useState<ValidationErrors>({});

  // Global Analytics Tracking
  const { 
    startCalculation, 
    endCalculation, 
    trackFeature, 
    trackButtonClick,
    trackStepsToggle,
    trackInputFocus 
  } = useAutoCalculatorTracking({ 
    calculatorType: "gordura_corporal",
    category: "saude"
  });
  
  const { trackInputChange, trackFormSubmission } = useFormTracking("gordura_corporal");

  const calculateNavyMethod = (): number => {
    const weightNum = parseFloat(weight);
    const heightNum = parseFloat(height);
    const neckNum = parseFloat(neck);
    const waistNum = parseFloat(waist);
    const hipsNum = parseFloat(hips);

    if (gender === "male") {
      // Fórmula Navy para homens
      const bodyFat =
        495 /
          (1.0324 - 0.19077 * Math.log10(waistNum - neckNum) + 0.15456 * Math.log10(heightNum)) -
        450;
      return Math.max(0, Math.min(50, bodyFat));
    } else {
      // Fórmula Navy para mulheres
      const bodyFat =
        495 /
          (1.29579 -
            0.35004 * Math.log10(waistNum + hipsNum - neckNum) +
            0.221 * Math.log10(heightNum)) -
        450;
      return Math.max(0, Math.min(50, bodyFat));
    }
  };

  const calculateJacksonPollock = (): number => {
    const ageNum = parseFloat(age);
    const tricepsNum = parseFloat(triceps);
    const suprailiacNum = parseFloat(suprailiac);
    const abdominalNum = parseFloat(abdominal);

    const sumSkinfolds = tricepsNum + suprailiacNum + abdominalNum;

    if (gender === "male") {
      // Fórmula Jackson-Pollock 3 dobras para homens
      const bodyDensity =
        1.10938 -
        0.0008267 * sumSkinfolds +
        0.0000016 * Math.pow(sumSkinfolds, 2) -
        0.0002574 * ageNum;
      const bodyFat = 495 / bodyDensity - 450;
      return Math.max(0, Math.min(50, bodyFat));
    } else {
      // Fórmula Jackson-Pollock 3 dobras para mulheres
      const bodyDensity =
        1.0994921 -
        0.0009929 * sumSkinfolds +
        0.0000023 * Math.pow(sumSkinfolds, 2) -
        0.0001392 * ageNum;
      const bodyFat = 495 / bodyDensity - 450;
      return Math.max(0, Math.min(50, bodyFat));
    }
  };

  const calculateWaistHipRatio = (): number => {
    const waistNum = parseFloat(waist);
    const hipsNum = parseFloat(hips);
    const ageNum = parseFloat(age);

    const whr = waistNum / hipsNum;

    // Estimativa baseada na relação cintura-quadril e idade
    let bodyFat = 0;

    if (gender === "male") {
      bodyFat = whr * 64 + ageNum * 0.2 - 98.42 + 4.15;
    } else {
      bodyFat = whr * 76 + ageNum * 0.15 - 76.76 + 4.15;
    }

    return Math.max(0, Math.min(50, bodyFat));
  };

  const getBodyFatCategory = (
    bodyFat: number,
    gender: Gender
  ): { category: string; color: string } => {
    if (gender === "male") {
      if (bodyFat < 6) return { category: "Muito Baixo (Atlético)", color: "text-system-info" };
      if (bodyFat < 14) return { category: "Baixo (Fitness)", color: "text-growth-green" };
      if (bodyFat < 18) return { category: "Normal", color: "text-primary-blue" };
      if (bodyFat < 25) return { category: "Acima do Normal", color: "text-system-warning" };
      return { category: "Alto", color: "text-system-error" };
    } else {
      if (bodyFat < 16) return { category: "Muito Baixo (Atlético)", color: "text-system-info" };
      if (bodyFat < 21) return { category: "Baixo (Fitness)", color: "text-growth-green" };
      if (bodyFat < 25) return { category: "Normal", color: "text-primary-blue" };
      if (bodyFat < 32) return { category: "Acima do Normal", color: "text-system-warning" };
      return { category: "Alto", color: "text-system-error" };
    }
  };

  const getRecommendations = (bodyFat: number, gender: Gender): string[] => {
    const { category } = getBodyFatCategory(bodyFat, gender);

    switch (category) {
      case "Muito Baixo (Atlético)":
        return [
          "Percentual muito baixo, típico de atletas de elite",
          "Monitore regularmente para evitar deficiências hormonais",
          "Considere orientação nutricional especializada",
          "Mantenha uma dieta rica em gorduras saudáveis",
        ];
      case "Baixo (Fitness)":
        return [
          "Excelente composição corporal para saúde geral",
          "Continue com exercícios regulares e dieta equilibrada",
          "Foque em manutenção da massa muscular",
          "Hidratação adequada e descanso são essenciais",
        ];
      case "Normal":
        return [
          "Percentual saudável para população geral",
          "Exercícios 3-4x por semana são ideais",
          "Dieta balanceada com proteínas adequadas",
          "Monitore periodicamente para manutenção",
        ];
      case "Acima do Normal":
        return [
          "Considere redução gradual através de exercícios",
          "Combine exercícios aeróbicos com musculação",
          "Ajuste na alimentação com déficit calórico moderado",
          "Busque orientação nutricional se necessário",
        ];
      default:
        return [
          "Recomenda-se acompanhamento médico especializado",
          "Programa estruturado de exercícios e nutrição",
          "Mudanças graduais no estilo de vida",
          "Avaliação de possíveis questões metabólicas",
        ];
    }
  };

  const validateInputs = (): boolean => {
    const newErrors: ValidationErrors = {};
    let isValid = true;

    // Validação de campos obrigatórios básicos
    const weightNum = parseFloat(weight);
    if (!weight || isNaN(weightNum) || weightNum <= 0) {
      newErrors.weight = "Peso é obrigatório e deve ser maior que 0";
      isValid = false;
    }

    // Validação específica por método
    switch (method) {
      case "navy":
        if (!neck || parseFloat(neck) <= 0) {
          newErrors.neck = "Medida do pescoço é obrigatória";
          isValid = false;
        }
        if (!waist || parseFloat(waist) <= 0) {
          newErrors.waist = "Medida da cintura é obrigatória";
          isValid = false;
        }
        if (gender === "female" && (!hips || parseFloat(hips) <= 0)) {
          newErrors.hips = "Medida do quadril é obrigatória para mulheres";
          isValid = false;
        }
        if (!height || parseFloat(height) <= 0) {
          newErrors.height = "Altura é obrigatória para o Navy Method";
          isValid = false;
        }
        break;

      case "jackson-pollock":
        if (!triceps || parseFloat(triceps) <= 0) {
          newErrors.triceps = "Dobra do tríceps é obrigatória";
          isValid = false;
        }
        if (!suprailiac || parseFloat(suprailiac) <= 0) {
          newErrors.suprailiac = "Dobra suprailíaca é obrigatória";
          isValid = false;
        }
        if (!abdominal || parseFloat(abdominal) <= 0) {
          newErrors.abdominal = "Dobra abdominal é obrigatória";
          isValid = false;
        }
        if (!age || parseFloat(age) <= 0) {
          newErrors.age = "Idade é obrigatória para Jackson-Pollock";
          isValid = false;
        }
        break;

      case "waist-hip":
        if (!waist || parseFloat(waist) <= 0) {
          newErrors.waist = "Medida da cintura é obrigatória";
          isValid = false;
        }
        if (!hips || parseFloat(hips) <= 0) {
          newErrors.hips = "Medida do quadril é obrigatória";
          isValid = false;
        }
        if (!age || parseFloat(age) <= 0) {
          newErrors.age = "Idade é obrigatória para este método";
          isValid = false;
        }
        break;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleCalculate = () => {
    if (!validateInputs()) {
      return;
    }

    const weightNum = parseFloat(weight);
    let bodyFatPercentage = 0;

    try {
      switch (method) {
        case "navy":
          bodyFatPercentage = calculateNavyMethod();
          break;
        case "jackson-pollock":
          bodyFatPercentage = calculateJacksonPollock();
          break;
        case "waist-hip":
          bodyFatPercentage = calculateWaistHipRatio();
          break;
        default:
          return;
      }

      const fatMass = (bodyFatPercentage / 100) * weightNum;
      const leanMass = weightNum - fatMass;
      const { category, color } = getBodyFatCategory(bodyFatPercentage, gender);
      const recommendations = getRecommendations(bodyFatPercentage, gender);

      setResult({
        bodyFatPercentage,
        fatMass,
        leanMass,
        category,
        categoryColor: color,
        recommendations,
      });

      // Limpar erros se cálculo foi bem-sucedido
      setErrors({});
    } catch (error) {
      setErrors({ weight: "Erro no cálculo. Verifique os valores inseridos." });
    }
  };

  const handleReset = () => {
    setWeight("");
    setHeight("");
    setAge("");
    setNeck("");
    setWaist("");
    setHips("");
    setTriceps("");
    setSuprailiac("");
    setAbdominal("");
    setResult(null);
    setErrors({});
  };

  // Componente de erro inline
  const ErrorMessage = ({ error }: { error?: string }) => {
    if (!error) return null;
    return (
      <div className="mt-1 text-sm text-system-error" role="alert">
        {error}
      </div>
    );
  };

  return (
    <div className="mx-auto max-w-2xl space-y-8 px-4 md:max-w-4xl lg:max-w-6xl">
      <Breadcrumb>
        <BreadcrumbItem href="/">Início</BreadcrumbItem>
        <BreadcrumbItem href="/calculadoras">Calculadoras</BreadcrumbItem>
        <BreadcrumbItem href="/calculadoras/saude">Saúde</BreadcrumbItem>
        <BreadcrumbItem isLast>Gordura Corporal</BreadcrumbItem>
      </Breadcrumb>

      <header className="space-y-4 text-center">
        <h1 className="mb-4 text-3xl font-bold text-text-primary md:text-4xl">
          🏋️ Calculadora de Gordura Corporal
        </h1>
        <p className="mx-auto max-w-3xl text-lg text-text-secondary-dark">
          Calcule seu <strong className="text-growth-green">percentual de gordura corporal</strong>{" "}
          usando métodos científicos validados. Avalie sua{" "}
          <strong className="text-primary-blue-dark">composição corporal</strong> e receba
          orientações personalizadas.
        </p>
        <div className="inline-block rounded-lg bg-growth-green-soft p-4 duration-300">
          <p className="text-sm font-medium text-text-primary">
            🔬 <strong>Métodos Científicos</strong> • 📊 <strong>Análise Detalhada</strong> • 🎯{" "}
            <strong>Recomendações Personalizadas</strong>
          </p>
        </div>
      </header>

      <Card>
        <CardHeader>
          <CardTitle as="h2">Dados Pessoais</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <div>
                <Input
                  type="number"
                  label="Peso (kg) *"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  placeholder="Ex: 70"
                  min="1"
                  step="0.1"
                  required
                  fullWidth
                />
                <ErrorMessage error={errors.weight} />
              </div>

              <div>
                <Input
                  type="number"
                  label={`Altura (cm)${method === "navy" ? " *" : ""}`}
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                  placeholder="Ex: 175"
                  min="1"
                  step="0.1"
                  required={method === "navy"}
                  fullWidth
                />
                <ErrorMessage error={errors.height} />
              </div>

              <div>
                <Input
                  type="number"
                  label={`Idade (anos)${method !== "navy" ? " *" : ""}`}
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  placeholder="Ex: 30"
                  min="1"
                  max="120"
                  required={method !== "navy"}
                  fullWidth
                />
                <ErrorMessage error={errors.age} />
              </div>
            </div>

            <div className="mx-auto max-w-sm">
              <h3 className="mb-3 text-center text-sm font-semibold text-text-primary">Sexo:</h3>
              <div className="flex overflow-hidden rounded-lg border border-neutral-surface-variant">
                <button
                  type="button"
                  onClick={() => setGender("male")}
                  className={`flex-1 px-4 py-2 text-sm font-medium ${
                    gender === "male"
                      ? "bg-primary-blue text-white"
                      : "hover:bg-primary-blue/10-dark/10 bg-neutral-surface text-text-secondary"
                  }`}
                >
                  👨 Masculino
                </button>
                <button
                  type="button"
                  onClick={() => setGender("female")}
                  className={`flex-1 px-4 py-2 text-sm font-medium ${
                    gender === "female"
                      ? "bg-primary-blue text-white"
                      : "hover:bg-primary-blue/10-dark/10 bg-neutral-surface text-text-secondary"
                  }`}
                >
                  👩 Feminino
                </button>
              </div>
            </div>

            <div className="mx-auto max-w-lg">
              <h3 className="mb-3 text-center text-sm font-semibold text-text-primary">
                Método de Cálculo:
              </h3>
              <div className="flex overflow-hidden rounded-lg border border-neutral-surface-variant">
                <button
                  type="button"
                  onClick={() => setMethod("navy")}
                  className={`flex-1 px-3 py-2 text-xs font-medium ${
                    method === "navy"
                      ? "bg-growth-green text-white"
                      : "bg-neutral-surface text-text-secondary hover:bg-growth-green/10"
                  }`}
                >
                  🏃 Navy
                </button>
                <button
                  type="button"
                  onClick={() => setMethod("jackson-pollock")}
                  className={`flex-1 px-3 py-2 text-xs font-medium ${
                    method === "jackson-pollock"
                      ? "bg-growth-green text-white"
                      : "bg-neutral-surface text-text-secondary hover:bg-growth-green/10"
                  }`}
                >
                  📏 Jackson-Pollock
                </button>
                <button
                  type="button"
                  onClick={() => setMethod("waist-hip")}
                  className={`flex-1 px-3 py-2 text-xs font-medium ${
                    method === "waist-hip"
                      ? "bg-growth-green text-white"
                      : "bg-neutral-surface text-text-secondary hover:bg-growth-green/10"
                  }`}
                >
                  📐 Cintura-Quadril
                </button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Medidas específicas por método */}
      <Card>
        <CardHeader>
          <CardTitle as="h2">
            {method === "navy" && "Medidas - Navy Method"}
            {method === "jackson-pollock" && "Dobras Cutâneas - Jackson-Pollock"}
            {method === "waist-hip" && "Medidas - Relação Cintura-Quadril"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {method === "navy" && (
            <div
              className={`grid grid-cols-1 gap-4 ${gender === "female" ? "md:grid-cols-3" : "md:grid-cols-2"}`}
            >
              <div>
                <Input
                  type="number"
                  label="Pescoço (cm) *"
                  value={neck}
                  onChange={(e) => setNeck(e.target.value)}
                  placeholder="Ex: 40"
                  min="1"
                  step="0.1"
                  required
                  fullWidth
                />
                <ErrorMessage error={errors.neck} />
              </div>
              <div>
                <Input
                  type="number"
                  label="Cintura (cm) *"
                  value={waist}
                  onChange={(e) => setWaist(e.target.value)}
                  placeholder="Ex: 85"
                  min="1"
                  step="0.1"
                  required
                  fullWidth
                />
                <ErrorMessage error={errors.waist} />
              </div>
              {gender === "female" && (
                <div>
                  <Input
                    type="number"
                    label="Quadril (cm) *"
                    value={hips}
                    onChange={(e) => setHips(e.target.value)}
                    placeholder="Ex: 100"
                    min="1"
                    step="0.1"
                    required
                    fullWidth
                  />
                  <ErrorMessage error={errors.hips} />
                </div>
              )}
            </div>
          )}

          {method === "jackson-pollock" && (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <div>
                <Input
                  type="number"
                  label="Tríceps (mm) *"
                  value={triceps}
                  onChange={(e) => setTriceps(e.target.value)}
                  placeholder="Ex: 15"
                  min="1"
                  step="0.1"
                  required
                  fullWidth
                />
                <ErrorMessage error={errors.triceps} />
              </div>
              <div>
                <Input
                  type="number"
                  label="Suprailíaca (mm) *"
                  value={suprailiac}
                  onChange={(e) => setSuprailiac(e.target.value)}
                  placeholder="Ex: 20"
                  min="1"
                  step="0.1"
                  required
                  fullWidth
                />
                <ErrorMessage error={errors.suprailiac} />
              </div>
              <div>
                <Input
                  type="number"
                  label="Abdominal (mm) *"
                  value={abdominal}
                  onChange={(e) => setAbdominal(e.target.value)}
                  placeholder="Ex: 25"
                  min="1"
                  step="0.1"
                  required
                  fullWidth
                />
                <ErrorMessage error={errors.abdominal} />
              </div>
            </div>
          )}

          {method === "waist-hip" && (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <Input
                  type="number"
                  label="Cintura (cm) *"
                  value={waist}
                  onChange={(e) => setWaist(e.target.value)}
                  placeholder="Ex: 85"
                  min="1"
                  step="0.1"
                  required
                  fullWidth
                />
                <ErrorMessage error={errors.waist} />
              </div>
              <div>
                <Input
                  type="number"
                  label="Quadril (cm) *"
                  value={hips}
                  onChange={(e) => setHips(e.target.value)}
                  placeholder="Ex: 100"
                  min="1"
                  step="0.1"
                  required
                  fullWidth
                />
                <ErrorMessage error={errors.hips} />
              </div>
            </div>
          )}

          <div className="mt-6 flex justify-center gap-4">
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

      {result && (
        <Card className="border-2 border-growth-green bg-growth-green-soft duration-300">
          <CardHeader>
            <CardTitle as="h3" className="text-growth-green">
              📊 Resultado da Avaliação
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-3">
              <div className="rounded-lg bg-gray-900 p-6 text-center">
                <div className="mb-2 text-4xl font-bold text-growth-green">
                  {result.bodyFatPercentage.toFixed(1)}%
                </div>
                <div className="text-sm text-text-secondary">Gordura Corporal</div>
              </div>

              <div className="rounded-lg bg-gray-900 p-6 text-center">
                <div className="mb-2 text-2xl font-bold text-primary-blue-dark">
                  {result.fatMass.toFixed(1)} kg
                </div>
                <div className="text-sm text-text-secondary">Massa Gorda</div>
              </div>

              <div className="rounded-lg bg-gray-900 p-6 text-center">
                <div className="mb-2 text-2xl font-bold text-system-warning">
                  {result.leanMass.toFixed(1)} kg
                </div>
                <div className="text-sm text-text-secondary">Massa Magra</div>
              </div>
            </div>

            <div className="mb-6 rounded-lg bg-gray-900 p-4">
              <div className="text-center">
                <div className="mb-2 font-semibold text-text-primary">Classificação</div>
                <div className={`text-xl font-bold ${result.categoryColor}${result.categoryColor}`}>
                  {result.category}
                </div>
              </div>
            </div>

            <div className="rounded-lg bg-primary-blue-light p-4">
              <h4 className="mb-3 font-semibold text-primary-blue-dark">
                🎯 Recomendações Personalizadas
              </h4>
              <ul className="space-y-2 text-sm text-text-secondary">
                {result.recommendations.map((rec, index) => (
                  <li key={index}>• {rec}</li>
                ))}
              </ul>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Seção: Como Medir Corretamente - Guia Completo */}
      <Card className="border-l-4 border-primary-blue bg-gradient-to-r from-primary-blue-light to-growth-green-soft duration-300">
        <CardHeader>
          <CardTitle as="h2" className="text-2xl font-bold text-text-primary">
            📏 Como Medir Corretamente - Guia Passo a Passo
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-8">
            {/* Navy Method */}
            <div className="rounded-xl border border-primary-blue/20 bg-gray-900 p-6">
              <h3 className="mb-4 flex items-center text-xl font-bold text-primary-blue-dark">
                🏃 Navy Method (Método da Marinha dos EUA)
              </h3>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <h4 className="mb-3 font-semibold text-growth-green">🎯 O que é?</h4>
                  <p className="mb-4 text-sm text-text-secondary">
                    Desenvolvido pela Marinha dos EUA, é um dos métodos mais{" "}
                    <strong>precisos e práticos</strong>
                    para medir gordura corporal usando apenas medidas corporais básicas.
                  </p>

                  <h4 className="mb-3 font-semibold text-system-info">📊 Precisão</h4>
                  <ul className="mb-4 space-y-1 text-sm text-text-secondary">
                    <li>
                      • <strong>Erro padrão:</strong> ±3-4%
                    </li>
                    <li>
                      • <strong>Correlação com DEXA:</strong> 0,85-0,90
                    </li>
                    <li>
                      • <strong>Ideal para:</strong> População geral adulta
                    </li>
                    <li>
                      • <strong>Não recomendado:</strong> Atletas com alta massa muscular
                    </li>
                  </ul>
                </div>

                <div>
                  <h4 className="mb-3 font-semibold text-system-success">✅ Vantagens</h4>
                  <ul className="mb-4 space-y-1 text-sm text-text-secondary">
                    <li>• Não requer equipamento especial</li>
                    <li>• Rápido e fácil de fazer</li>
                    <li>• Validado cientificamente</li>
                    <li>• Reprodutível entre avaliadores</li>
                  </ul>

                  <h4 className="mb-3 font-semibold text-system-warning">⚠️ Limitações</h4>
                  <ul className="space-y-1 text-sm text-text-secondary">
                    <li>• Menos preciso em atletas</li>
                    <li>• Pode subestimar em obesos</li>
                    <li>• Varia com hidratação</li>
                  </ul>
                </div>
              </div>

              <div className="mt-6 rounded-lg bg-primary-blue-light p-4">
                <h4 className="mb-3 font-bold text-primary-blue-dark">
                  📝 Como Medir - Passo a Passo
                </h4>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div>
                    <h5 className="mb-2 font-semibold">👨 Para Homens:</h5>
                    <ol className="space-y-2 text-sm text-text-secondary">
                      <li>
                        <strong>1. Pescoço:</strong> Meça logo abaixo da maçã de Adão, com a fita
                        paralela ao chão
                      </li>
                      <li>
                        <strong>2. Cintura:</strong> No ponto mais estreito, geralmente na altura do
                        umbigo
                      </li>
                      <li>
                        <strong>3. Altura:</strong> Em pé, descalço, contra a parede
                      </li>
                    </ol>
                  </div>

                  <div>
                    <h5 className="mb-2 font-semibold">👩 Para Mulheres:</h5>
                    <ol className="space-y-2 text-sm text-text-secondary">
                      <li>
                        <strong>1. Pescoço:</strong> Logo abaixo da laringe, fita paralela ao chão
                      </li>
                      <li>
                        <strong>2. Cintura:</strong> No ponto mais estreito do torso
                      </li>
                      <li>
                        <strong>3. Quadril:</strong> Na parte mais larga dos quadris
                      </li>
                      <li>
                        <strong>4. Altura:</strong> Em pé, descalço, contra a parede
                      </li>
                    </ol>
                  </div>
                </div>

                <div className="mt-4 rounded border border-system-success/20 bg-system-success/10 p-3">
                  <p className="text-sm text-system-success">
                    <strong>💡 Dica Profissional:</strong> Meça sempre no mesmo horário do dia
                    (preferencialmente pela manhã) e use fita métrica inelástica. Não comprima a
                    pele, apenas encoste a fita.
                  </p>
                </div>
              </div>
            </div>

            {/* Jackson-Pollock Method */}
            <div className="rounded-xl border border-growth-green/20 bg-gray-900 p-6">
              <h3 className="mb-4 flex items-center text-xl font-bold text-growth-green">
                📏 Método Jackson-Pollock (Dobras Cutâneas)
              </h3>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <h4 className="mb-3 font-semibold text-primary-blue-dark">🎯 O que é?</h4>
                  <p className="mb-4 text-sm text-text-secondary">
                    Método científico que <strong>mede a espessura das dobras cutâneas</strong> em
                    pontos específicos do corpo para estimar a gordura subcutânea total.
                  </p>

                  <h4 className="mb-3 font-semibold text-system-info">📊 Precisão</h4>
                  <ul className="mb-4 space-y-1 text-sm text-text-secondary">
                    <li>
                      • <strong>Erro padrão:</strong> ±3-5%
                    </li>
                    <li>
                      • <strong>Correlação com DEXA:</strong> 0,80-0,85
                    </li>
                    <li>
                      • <strong>Versões:</strong> 3, 4 ou 7 dobras
                    </li>
                    <li>
                      • <strong>Ideal para:</strong> Atletas e fisiculturistas
                    </li>
                  </ul>
                </div>

                <div>
                  <h4 className="mb-3 font-semibold text-system-success">✅ Vantagens</h4>
                  <ul className="mb-4 space-y-1 text-sm text-text-secondary">
                    <li>• Muito preciso quando bem executado</li>
                    <li>• Diferencia massa magra de gorda</li>
                    <li>• Amplamente validado</li>
                    <li>• Específico por sexo e idade</li>
                  </ul>

                  <h4 className="mb-3 font-semibold text-system-warning">⚠️ Limitações</h4>
                  <ul className="space-y-1 text-sm text-text-secondary">
                    <li>• Requer adipômetro (plicômetro)</li>
                    <li>• Precisa de treinamento técnico</li>
                    <li>• Difícil em pessoas obesas</li>
                    <li>• Varia entre avaliadores</li>
                  </ul>
                </div>
              </div>

              <div className="mt-6 rounded-lg bg-growth-green-soft p-4">
                <h4 className="mb-3 font-bold text-growth-green">
                  📝 Protocolo de 3 Dobras - Passo a Passo
                </h4>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div>
                    <h5 className="mb-2 font-semibold">👨 Homens (3 dobras):</h5>
                    <ol className="space-y-3 text-sm text-text-secondary">
                      <li>
                        <strong>1. Peitoral:</strong> Dobra diagonal entre axila e mamilo, a 1/3 da
                        distância da axila
                      </li>
                      <li>
                        <strong>2. Abdominal:</strong> Dobra vertical ao lado do umbigo,
                        aproximadamente 2 cm à direita
                      </li>
                      <li>
                        <strong>3. Coxa:</strong> Dobra vertical na parte frontal da coxa, no ponto
                        médio entre quadril e joelho
                      </li>
                    </ol>
                  </div>

                  <div>
                    <h5 className="mb-2 font-semibold">👩 Mulheres (3 dobras):</h5>
                    <ol className="space-y-3 text-sm text-text-secondary">
                      <li>
                        <strong>1. Tríceps:</strong> Dobra vertical na parte posterior do braço, no
                        ponto médio entre ombro e cotovelo
                      </li>
                      <li>
                        <strong>2. Suprailíaca:</strong> Dobra diagonal logo acima da crista ilíaca,
                        na linha axilar média
                      </li>
                      <li>
                        <strong>3. Coxa:</strong> Dobra vertical na parte frontal da coxa, no ponto
                        médio entre quadril e joelho
                      </li>
                    </ol>
                  </div>
                </div>

                <div className="mt-4 rounded border border-system-info/20 bg-system-info/10 p-3">
                  <p className="text-sm text-system-info">
                    <strong>🎯 Técnica Correta:</strong> Pinçar a pele com polegar e indicador,
                    aplicar o adipômetro perpendicular à dobra, aguardar 2 segundos e fazer a
                    leitura. Repetir 3 vezes em cada ponto.
                  </p>
                </div>
              </div>
            </div>

            {/* Waist-Hip Ratio */}
            <div className="rounded-xl border border-system-warning/20 bg-gray-900 p-6">
              <h3 className="mb-4 flex items-center text-xl font-bold text-system-warning">
                📐 Relação Cintura-Quadril (RCQ)
              </h3>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <h4 className="mb-3 font-semibold text-primary-blue-dark">🎯 O que é?</h4>
                  <p className="mb-4 text-sm text-text-secondary">
                    Indica a <strong>distribuição de gordura corporal</strong> e é um excelente
                    <strong className="text-system-error-dark">
                      {" "}
                      preditor de risco cardiovascular
                    </strong>
                    , especialmente para gordura abdominal visceral.
                  </p>

                  <h4 className="mb-3 font-semibold text-system-info">📊 Interpretação</h4>
                  <div className="space-y-2 text-sm text-text-secondary">
                    <div className="flex justify-between">
                      <span>
                        <strong>Homens:</strong>
                      </span>
                      <span></span>
                    </div>
                    <div className="ml-4 space-y-1">
                      <div className="flex justify-between">
                        <span>• Baixo risco:</span>
                        <span className="font-medium text-growth-green">&lt; 0,90</span>
                      </div>
                      <div className="flex justify-between">
                        <span>• Risco moderado:</span>
                        <span className="font-medium text-system-warning">0,90 - 0,99</span>
                      </div>
                      <div className="flex justify-between">
                        <span>• Alto risco:</span>
                        <span className="font-medium text-system-error-dark">≥ 1,00</span>
                      </div>
                    </div>
                    <div className="mt-3 flex justify-between">
                      <span>
                        <strong>Mulheres:</strong>
                      </span>
                      <span></span>
                    </div>
                    <div className="ml-4 space-y-1">
                      <div className="flex justify-between">
                        <span>• Baixo risco:</span>
                        <span className="font-medium text-growth-green">&lt; 0,80</span>
                      </div>
                      <div className="flex justify-between">
                        <span>• Risco moderado:</span>
                        <span className="font-medium text-system-warning">0,80 - 0,84</span>
                      </div>
                      <div className="flex justify-between">
                        <span>• Alto risco:</span>
                        <span className="font-medium text-system-error-dark">≥ 0,85</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="mb-3 font-semibold text-system-success">✅ Vantagens</h4>
                  <ul className="mb-4 space-y-1 text-sm text-text-secondary">
                    <li>• Extremamente simples de medir</li>
                    <li>• Preditor de risco cardiovascular</li>
                    <li>• Não requer equipamento especial</li>
                    <li>• Validado pela OMS</li>
                  </ul>

                  <h4 className="mb-3 font-semibold text-system-warning">⚠️ Limitações</h4>
                  <ul className="space-y-1 text-sm text-text-secondary">
                    <li>• Não mede % total de gordura</li>
                    <li>• Menos preciso que outros métodos</li>
                    <li>• Influenciado pela estrutura óssea</li>
                    <li>• Varia com a postura</li>
                  </ul>
                </div>
              </div>

              <div className="mt-6 rounded-lg border border-system-warning/20 bg-system-warning/10 p-4">
                <h4 className="mb-3 font-bold text-system-warning">📝 Como Medir Corretamente</h4>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div>
                    <h5 className="mb-2 font-semibold">📏 Cintura:</h5>
                    <ul className="space-y-1 text-sm text-text-secondary">
                      <li>• Ponto mais estreito do torso</li>
                      <li>• Geralmente entre costelas e quadril</li>
                      <li>• Se não houver cintura definida: no umbigo</li>
                      <li>• Fita paralela ao chão</li>
                      <li>• Respiração normal, sem contrair abdome</li>
                    </ul>
                  </div>

                  <div>
                    <h5 className="mb-2 font-semibold">📐 Quadril:</h5>
                    <ul className="space-y-1 text-sm text-text-secondary">
                      <li>• Parte mais larga dos quadris</li>
                      <li>• Geralmente na altura do trocânter maior</li>
                      <li>• Incluir proeminência dos glúteos</li>
                      <li>• Fita paralela ao chão</li>
                      <li>• Pés juntos, peso distribuído</li>
                    </ul>
                  </div>
                </div>

                <div className="mt-4 rounded border border-system-error/20 bg-system-error/10 p-3">
                  <p className="text-sm text-system-error-dark">
                    <strong>⚠️ Importante para a Saúde:</strong> Uma RCQ alta indica acúmulo de
                    gordura abdominal, associada a maior risco de diabetes, doenças cardíacas e
                    síndrome metabólica. Consulte um médico se seus valores estão na faixa de alto
                    risco.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Seção: Comparação de Métodos */}
      <Card className="border border-neutral-surface-variant bg-background-dark-secondary duration-300">
        <CardHeader>
          <CardTitle as="h2" className="text-xl font-bold text-text-primary">
            ⚖️ Comparação Entre os Métodos de Medição
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="border-b-2 border-neutral-surface-variant">
                  <th className="p-3 text-left font-semibold">Critério</th>
                  <th className="p-3 text-center font-semibold text-primary-blue-dark">
                    Navy Method
                  </th>
                  <th className="p-3 text-center font-semibold text-growth-green">
                    Jackson-Pollock
                  </th>
                  <th className="p-3 text-center font-semibold text-system-warning">
                    Cintura-Quadril
                  </th>
                </tr>
              </thead>
              <tbody className="space-y-2">
                <tr className="border-b border-neutral-surface-variant">
                  <td className="p-3 font-medium">Precisão</td>
                  <td className="p-3 text-center text-primary-blue-dark">Alta (±3-4%)</td>
                  <td className="p-3 text-center text-growth-green">Muito Alta (±3-5%)</td>
                  <td className="p-3 text-center text-system-warning">Moderada (±5-7%)</td>
                </tr>
                <tr className="border-b border-neutral-surface-variant">
                  <td className="p-3 font-medium">Facilidade</td>
                  <td className="p-3 text-center">⭐⭐⭐⭐⭐</td>
                  <td className="p-3 text-center">⭐⭐</td>
                  <td className="p-3 text-center">⭐⭐⭐⭐⭐</td>
                </tr>
                <tr className="border-b border-neutral-surface-variant">
                  <td className="p-3 font-medium">Equipamento</td>
                  <td className="p-3 text-center">Fita métrica</td>
                  <td className="p-3 text-center">Adipômetro</td>
                  <td className="p-3 text-center">Fita métrica</td>
                </tr>
                <tr className="border-b border-neutral-surface-variant">
                  <td className="p-3 font-medium">Tempo</td>
                  <td className="p-3 text-center text-growth-green">2-3 min</td>
                  <td className="p-3 text-center text-system-warning">5-10 min</td>
                  <td className="p-3 text-center text-growth-green">1 min</td>
                </tr>
                <tr className="border-b border-neutral-surface-variant">
                  <td className="p-3 font-medium">Custo</td>
                  <td className="p-3 text-center text-growth-green">Baixo</td>
                  <td className="p-3 text-center text-system-warning">Médio</td>
                  <td className="p-3 text-center text-growth-green">Baixo</td>
                </tr>
                <tr className="border-b border-neutral-surface-variant">
                  <td className="p-3 font-medium">Ideal para</td>
                  <td className="p-3 text-center">População geral</td>
                  <td className="p-3 text-center">Atletas/Fitness</td>
                  <td className="p-3 text-center">Triagem rápida</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium">Validação</td>
                  <td className="p-3 text-center text-growth-green">Militar/Civil</td>
                  <td className="p-3 text-center text-growth-green">Científica ampla</td>
                  <td className="p-3 text-center text-growth-green">OMS/Médica</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className="rounded-lg border border-primary-blue/20 bg-primary-blue-light p-4">
              <h4 className="mb-2 font-bold text-primary-blue-dark">🎯 Recomendação Iniciantes</h4>
              <p className="text-sm text-text-secondary">
                Comece com o <strong>Navy Method</strong>. É preciso, fácil e não precisa de
                equipamentos caros.
              </p>
            </div>

            <div className="rounded-lg border border-growth-green/20 bg-growth-green-soft p-4">
              <h4 className="mb-2 font-bold text-growth-green">🏋️ Para Atletas</h4>
              <p className="text-sm text-text-secondary">
                Use <strong>Jackson-Pollock</strong> com avaliador experiente para máxima precisão.
              </p>
            </div>

            <div className="rounded-lg border border-system-warning/20 bg-system-warning/10 p-4">
              <h4 className="mb-2 font-bold text-system-warning">🏥 Triagem de Saúde</h4>
              <p className="text-sm text-text-secondary">
                A <strong>Relação Cintura-Quadril</strong> é excelente para avaliar risco
                cardiovascular.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <FAQ
        title="Perguntas Frequentes - Calculadora de Gordura Corporal"
        items={[
          {
            question: "Qual é o percentual ideal de gordura corporal?",
            answer:
              "<strong>👨 Homens:</strong> Atletas (6-13%), Fitness (14-17%), Aceitável (18-24%), Obesidade (&gt;25%). <strong>👩 Mulheres:</strong> Atletas (16-20%), Fitness (21-24%), Aceitável (25-31%), Obesidade (&gt;32%). <br><br>O ideal varia com idade, genética e objetivos específicos.",
            borderColor: "primary-blue",
          },
          {
            question: "Com que frequência devo medir minha gordura corporal?",
            answer:
              "Para <strong>acompanhar mudanças reais</strong>, meça a cada <strong>4-6 semanas</strong>. A gordura corporal muda lentamente, e variações diárias são normais devido à hidratação, alimentação e outros fatores. <strong>Dica:</strong> Meça sempre nas mesmas condições.",
            borderColor: "growth-green",
          },
          {
            question: "Por que diferentes métodos dão resultados diferentes?",
            answer:
              "Cada método tem <strong>limitações e margens de erro</strong>. Fatores como hidratação, hora do dia, técnica de medição e características individuais influenciam os resultados. <strong>O importante é a tendência:</strong> use sempre o mesmo método e acompanhe as mudanças ao longo do tempo.",
            borderColor: "system-info",
          },
          {
            question: "Posso usar a balança de bioimpedância?",
            answer:
              "Balanças de bioimpedância são <strong>convenientes mas menos precisas</strong> (erro ±5-8%). <strong>Vantagens:</strong> fácil de usar, medição rápida, boa para tendências. <strong>Limitações:</strong> afetada pela hidratação, menos precisa em obesos, varia com exercício recente.",
            borderColor: "system-warning",
          },
          {
            question: "Como reduzir o percentual de gordura corporal de forma saudável?",
            answer:
              "<strong>🍽️ Nutrição (70%):</strong> Déficit calórico moderado (300-500 kcal/dia), proteína adequada (0,8-1,2g/kg), alimentos integrais. <strong>🏋️ Exercício (30%):</strong> Musculação 3-4x/semana, cardio 150-300 min/semana, HIIT 1-2x/semana. <strong>Meta realista:</strong> 0,5-1% de perda por mês.",
            borderColor: "growth-green",
          },
          {
            question: "Gordura corporal muito baixa é perigosa?",
            answer:
              "<strong>Sim!</strong> Gordura muito baixa pode causar: <strong>👨 Homens (&lt;5%):</strong> queda da testosterona, fadiga, perda muscular. <strong>👩 Mulheres (&lt;12%):</strong> amenorreia, osteoporose precoce, problemas de fertilidade, desequilíbrios hormonais. Consulte profissionais de saúde.",
            borderColor: "system-error-dark",
          },
        ]}
        tipSection={{
          title: "Dica Importante sobre Métodos",
          content:
            "<strong>Para máxima precisão:</strong> combine diferentes métodos e acompanhe a <strong>tendência ao longo do tempo</strong>, não valores isolados. Navy Method é ideal para iniciantes, Jackson-Pollock para atletas, e Cintura-Quadril para risco cardiovascular.",
        }}
        footerText="<strong>Lembre-se:</strong> A composição corporal é mais importante que o peso total. Foque em <strong>ganhar massa muscular</strong> e <strong>reduzir gordura</strong> de forma sustentável."
      />

      {/* Footer com informações adicionais */}
      <Card className="border-l-4 border-primary-blue bg-primary-blue-light duration-300">
        <CardHeader>
          <CardTitle as="h2" className="text-lg font-bold text-text-primary">
            📚 Sobre Esta Calculadora de Gordura Corporal
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 text-sm text-text-secondary">
            <p>
              Esta{" "}
              <strong className="text-primary-blue-dark">calculadora de gordura corporal</strong>{" "}
              utiliza
              <strong className="text-growth-green">métodos científicos validados</strong> para
              estimar sua composição corporal. Os cálculos são baseados em pesquisas publicadas em
              revistas científicas internacionais.
            </p>
            <p>
              <strong>Métodos disponíveis:</strong> Navy Method (Marinha dos EUA), Jackson-Pollock 3
              dobras, e Relação Cintura-Quadril. Cada método tem suas vantagens e é adequado para
              diferentes situações e objetivos.
            </p>
            <p>
              <strong className="text-system-warning">Importante:</strong> Esta ferramenta é para
              fins educacionais e de acompanhamento pessoal. Para avaliações médicas e planos de
              tratamento, consulte sempre um{" "}
              <strong>médico, nutricionista ou educador físico</strong> qualificado.
            </p>
            <p className="mt-4 border-t border-primary-blue/20 pt-3 text-xs opacity-75">
              🔬 Baseado em estudos científicos • 🎓 Ferramenta educacional gratuita • 🔒 Dados não
              armazenados • 📱 Compatível com todos os dispositivos • 🌙 Suporte a modo escuro
            </p>
          </div>
        </CardContent>
      </Card>

      <RelatedCalculators category="saude" currentCalculatorId="gordura-corporal" />
    </div>
  );
}
