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
  calculateAdvancedIMC,
  type AdvancedIMCParams,
  type AdvancedIMCResult,
} from "~/utils/calculations";

// Tipos para as melhorias do IMC
interface IMCRange {
  range: string;
  classification: string;
  color: string;
  icon: string;
  description: string;
  bgColor: string;
  textColor: string;
  borderColor: string;
  min: number;
  max: number;
}

// Definição das faixas de IMC com cores e ícones otimizadas para contraste
const imcRanges: IMCRange[] = [
  {
    range: "< 18,5",
    classification: "Abaixo do peso",
    color: "blue",
    icon: "⬇️",
    description: "Pode indicar desnutrição",
    bgColor: "bg-blue-100",
    textColor: "text-blue-900",
    borderColor: "border-blue-400",
    min: 0,
    max: 18.5,
  },
  {
    range: "18,5 - 24,9",
    classification: "Peso normal",
    color: "green",
    icon: "✅",
    description: "Faixa ideal para a saúde",
    bgColor: "bg-green-100",
    textColor: "text-green-900",
    borderColor: "border-green-400",
    min: 18.5,
    max: 25,
  },
  {
    range: "25,0 - 29,9",
    classification: "Sobrepeso",
    color: "yellow",
    icon: "⚠️",
    description: "Acima do peso ideal",
    bgColor: "bg-yellow-100",
    textColor: "text-yellow-900",
    borderColor: "border-yellow-500",
    min: 25,
    max: 30,
  },
  {
    range: "30,0 - 34,9",
    classification: "Obesidade grau I",
    color: "orange",
    icon: "🔶",
    description: "Obesidade moderada",
    bgColor: "bg-orange-100",
    textColor: "text-orange-900",
    borderColor: "border-orange-400",
    min: 30,
    max: 35,
  },
  {
    range: "35,0 - 39,9",
    classification: "Obesidade grau II",
    color: "red",
    icon: "🔴",
    description: "Obesidade severa",
    bgColor: "bg-red-100",
    textColor: "text-red-900",
    borderColor: "border-red-400",
    min: 35,
    max: 40,
  },
  {
    range: "40,0 ou mais",
    classification: "Obesidade grau III",
    color: "red",
    icon: "🔥",
    description: "Obesidade mórbida",
    bgColor: "bg-red-200",
    textColor: "text-red-950",
    borderColor: "border-red-500",
    min: 40,
    max: 100,
  },
];

// Funções auxiliares para o IMC
const getPosition = (imc: number): number => {
  // Lógica para calcular posição na escala (0-100%)
  if (imc < 18.5) return (imc / 18.5) * 15;
  if (imc < 25) return 15 + ((imc - 18.5) / 6.5) * 25;
  if (imc < 30) return 40 + ((imc - 25) / 5) * 25;
  if (imc < 35) return 65 + ((imc - 30) / 5) * 20;
  if (imc < 40) return 85 + ((imc - 35) / 5) * 10;
  return Math.min(95 + ((imc - 40) / 10) * 5, 100);
};

const getCurrentRange = (imc: number): number => {
  // Lógica para identificar faixa atual
  if (imc < 18.5) return 0;
  if (imc < 25) return 1;
  if (imc < 30) return 2;
  if (imc < 35) return 3;
  if (imc < 40) return 4;
  return 5;
};

const getPersonalizedRecommendation = (imc: number): string => {
  if (imc < 18.5) {
    return "Considere consultar um nutricionista para ganho de peso saudável. Aumente a ingestão calórica com alimentos nutritivos.";
  } else if (imc < 25) {
    return "Parabéns! Seu peso está na faixa ideal. Continue mantendo hábitos saudáveis de alimentação e exercícios.";
  } else if (imc < 30) {
    return "Pequenos ajustes na dieta e atividade física podem ajudar. Considere 150 minutos de exercício moderado por semana.";
  } else if (imc < 35) {
    return "Recomendamos buscar orientação médica. Um plano estruturado de alimentação e exercícios pode ser muito eficaz.";
  } else {
    return "É importante consultar um médico para avaliação completa e plano de tratamento personalizado.";
  }
};

// Componente da Barra Indicadora de IMC
const IMCScale = ({ userIMC }: { userIMC?: number }) => {
  return (
    <div className="relative h-12 w-full overflow-hidden rounded-lg bg-gradient-to-r from-blue-200 via-green-200 via-orange-200 via-yellow-200 to-red-200 shadow-inner">
      {/* Marcações de divisão das zonas */}
      <div className="absolute inset-0 flex">
        <div className="w-[15%] border-r border-white/30"></div>
        <div className="w-[25%] border-r border-white/30"></div>
        <div className="w-[25%] border-r border-white/30"></div>
        <div className="w-[20%] border-r border-white/30"></div>
        <div className="w-[10%] border-r border-white/30"></div>
        <div className="w-[5%]"></div>
      </div>

      {/* Indicador do IMC do usuário */}
      {userIMC && (
        <div
          className="absolute top-0 z-10 h-full w-1 bg-gray-800 shadow-lg transition-all duration-500"
          style={{ left: `${getPosition(userIMC)}%` }}
        >
          <div className="absolute -left-2 -top-2 h-4 w-4 animate-pulse rounded-full bg-gray-800 shadow-md"></div>
          <div className="absolute -bottom-8 -left-4 rounded bg-white px-2 py-1 text-xs font-bold text-gray-800 shadow-md">
            {userIMC.toFixed(1)}
          </div>
        </div>
      )}
    </div>
  );
};

export const meta: MetaFunction = () => {
  return [
    {
      title: `Calculadora de IMC - Índice de Massa Corporal com Análise Personalizada - ${APP_NAME}`,
    },
    {
      name: "description",
      content:
        "Calculadora de IMC online gratuita com análise personalizada por idade, sexo e múltiplas unidades de medida. Descubra seu peso ideal, risks para saúde, recomendações personalizadas e compare com padrões da OMS. Resultados instantâneos com gráficos interativos.",
    },
    {
      name: "keywords",
      content:
        "calculadora IMC, índice massa corporal personalizado, peso ideal por idade, IMC masculino feminino, obesidade classificação OMS, sobrepeso saúde, calculadora peso libras quilos, IMC pés metros, análise corporal grátis, saúde preventiva, risco cardiovascular IMC",
    },
    { name: "author", content: "Calculadora Online BR" },
    { name: "robots", content: "index,follow" },
    { name: "googlebot", content: "index,follow" },
    { name: "bingbot", content: "index,follow" },
    {
      property: "og:title",
      content: `Calculadora de IMC - Análise Personalizada do Peso Ideal - ${APP_NAME}`,
    },
    {
      property: "og:description",
      content:
        "Calculadora de IMC mais completa do Brasil: análise por idade/sexo, múltiplas unidades, gráficos interativos e recomendações personalizadas baseadas na OMS.",
    },
    { property: "og:type", content: "website" },
    {
      property: "og:url",
      content: "https://www.calculadoraonlinebr.com.br/calculadoras/saude/imc",
    },
    { property: "og:site_name", content: APP_NAME },
    { property: "og:locale", content: "pt_BR" },
    { name: "twitter:card", content: "summary_large_image" },
    {
      name: "twitter:title",
      content: `Calculadora IMC Online - Análise Personalizada - ${APP_NAME}`,
    },
    {
      name: "twitter:description",
      content:
        "Ferramenta mais completa para calcular IMC: personalização por idade/sexo, múltiplas unidades, visualização gráfica e recomendações de saúde.",
    },
    { name: "twitter:creator", content: "@CalculadoraBR" },
    { name: "format-detection", content: "telephone=no" },
    { name: "mobile-web-app-capable", content: "yes" },
    { name: "apple-mobile-web-app-capable", content: "yes" },
    { name: "apple-mobile-web-app-status-bar-style", content: "default" },
    { name: "theme-color", content: "#3B82F6" },
    { httpEquiv: "content-language", content: "pt-br" },
    { name: "geo.region", content: "BR" },
    { name: "geo.country", content: "Brazil" },
    {
      "script:ld+json": JSON.stringify({
        "@context": "https://schema.org",
        "@type": "MedicalWebPage",
        name: "Calculadora de IMC",
        description:
          "Calculadora online gratuita de Índice de Massa Corporal com análise personalizada por idade, sexo e múltiplas unidades de medida.",
        url: "https://www.calculadoraonlinebr.com.br/calculadoras/saude/imc",
        mainEntity: {
          "@type": "MedicalCalculator",
          name: "Calculadora de IMC (Índice de Massa Corporal)",
          description:
            "Ferramenta para cálculo do IMC com personalização por idade, sexo, múltiplas unidades e análise de riscos para saúde.",
          medicalSpecialty: "Medicina Preventiva",
          applicationCategory: "HealthApplication",
          operatingSystem: "Web Browser",
          isAccessibleForFree: true,
          mainEntityOfPage: {
            "@type": "WebPage",
            "@id": "https://www.calculadoraonlinebr.com.br/calculadoras/saude/imc",
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
              name: "Saúde",
              item: "https://www.calculadoraonlinebr.com.br/calculadoras/saude",
            },
            {
              "@type": "ListItem",
              position: 4,
              name: "IMC",
            },
          ],
        },
        publisher: {
          "@type": "Organization",
          name: "Calculadora Online BR",
          url: "https://www.calculadoraonlinebr.com.br",
        },
        inLanguage: "pt-BR",
        isAccessibleForFree: true,
        about: [
          {
            "@type": "MedicalCondition",
            name: "Obesidade",
          },
          {
            "@type": "MedicalCondition",
            name: "Sobrepeso",
          },
          {
            "@type": "MedicalCondition",
            name: "Baixo Peso",
          },
        ],
      }),
    },
  ];
};

export default function IMCCalculator() {
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState<"male" | "female">("male");
  const [result, setResult] = useState<AdvancedIMCResult | null>(null);
  const [errors, setErrors] = useState<{ weight?: string; height?: string; age?: string }>({});

  // Global Analytics Tracking
  const {
    startCalculation,
    endCalculation,
    trackFeature,
    trackButtonClick,
    trackStepsToggle,
    trackInputFocus,
  } = useAutoCalculatorTracking({
    calculatorType: "imc",
    category: "saude",
  });

  const { trackInputChange, trackFormSubmission } = useFormTracking("imc");

  const handleCalculate = () => {
    const weightNum = parseFloat(weight);
    const heightNum = parseFloat(height);
    const ageNum = age ? parseInt(age) : undefined;

    // Reset errors
    setErrors({});

    // Validation
    const newErrors: { weight?: string; height?: string; age?: string } = {};

    if (!weight || isNaN(weightNum) || weightNum <= 0) {
      newErrors.weight = "Por favor, insira um peso válido";
    } else if (weightNum < 20 || weightNum > 300) {
      newErrors.weight = "Peso deve estar entre 20kg e 300kg";
    }

    if (!height || isNaN(heightNum) || heightNum <= 0) {
      newErrors.height = "Por favor, insira uma altura válida";
    } else if (heightNum < 50 || heightNum > 250) {
      newErrors.height = "Altura deve estar entre 50cm e 250cm";
    }

    if (age && (isNaN(ageNum!) || ageNum! < 1 || ageNum! > 120)) {
      newErrors.age = "Idade deve estar entre 1 e 120 anos";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setResult(null);
      return;
    }

    // If validation passes, calculate IMC
    const params: AdvancedIMCParams = {
      weight: weightNum,
      height: heightNum / 100, // Convert cm to meters
      weightUnit: "kg",
      heightUnit: "m",
      age: ageNum,
      gender: ageNum ? gender : undefined,
    };

    const imcResult = calculateAdvancedIMC(params);
    setResult(imcResult);
  };

  const handleReset = () => {
    setWeight("");
    setHeight("");
    setAge("");
    setGender("male");
    setResult(null);
    setErrors({});
  };

  return (
    <div className="mx-auto max-w-full px-4 sm:max-w-2xl md:max-w-4xl lg:max-w-6xl">
      <Breadcrumb>
        <BreadcrumbItem href="/">Início</BreadcrumbItem>
        <BreadcrumbItem href="/calculadoras">Calculadoras</BreadcrumbItem>
        <BreadcrumbItem href="/calculadoras/saude">Saúde</BreadcrumbItem>
        <BreadcrumbItem isLast>IMC</BreadcrumbItem>
      </Breadcrumb>

      <div className="flex flex-col items-center space-y-6 sm:space-y-8">
        <header className="space-y-3 text-center sm:space-y-4">
          <h1 className="mb-3 text-2xl font-bold text-text-primary sm:mb-4 sm:text-3xl lg:text-4xl">
            <span className="hidden sm:inline">Calculadora de IMC - Índice de Massa Corporal</span>
            <span className="sm:hidden">Calculadora de IMC</span>
          </h1>
          <p className="mx-auto max-w-3xl px-4 text-sm text-text-secondary-dark sm:text-base lg:text-lg">
            Calcule seu{" "}
            <strong className="text-primary-blue-dark">IMC (Índice de Massa Corporal)</strong> de
            forma gratuita e descubra se seu peso está dentro da faixa considerada saudável pela{" "}
            <strong className="text-growth-green">Organização Mundial da Saúde (OMS)</strong>.
          </p>
          <div className="inline-block rounded-lg bg-primary-blue-light p-3 duration-300 sm:p-4">
            <p className="text-xs font-medium text-text-primary sm:text-sm">
              ⚡ <strong>Resultado instantâneo</strong> • 🔬 <strong>Baseado na OMS</strong> • 📱{" "}
              <strong>100% gratuito</strong>
            </p>
          </div>
        </header>

        <Card className="w-full max-w-full sm:max-w-2xl md:max-w-4xl lg:max-w-6xl">
          <CardHeader>
            <CardTitle as="h2">Dados para o Cálculo</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
                <div>
                  <Input
                    type="number"
                    label="Peso (kg)"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    placeholder="Ex: 70"
                    min="1"
                    step="0.1"
                    required
                    fullWidth
                    className={errors.weight ? "border-red-500" : ""}
                  />
                  {errors.weight && <p className="mt-1 text-sm text-red-500">{errors.weight}</p>}
                </div>
                <div>
                  <Input
                    type="number"
                    label="Altura (cm)"
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
                    placeholder="Ex: 175"
                    min="1"
                    step="1"
                    required
                    fullWidth
                    className={errors.height ? "border-red-500" : ""}
                  />
                  {errors.height && <p className="mt-1 text-sm text-red-500">{errors.height}</p>}
                </div>
                <div>
                  <Input
                    type="number"
                    label="Idade (anos)"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    placeholder="Ex: 30"
                    min="1"
                    max="120"
                    step="1"
                    fullWidth
                    className={errors.age ? "border-red-500" : ""}
                  />
                  {errors.age && <p className="mt-1 text-sm text-red-500">{errors.age}</p>}
                </div>
                <Select
                  label="Sexo"
                  value={gender}
                  onChange={(value) => setGender(value as "male" | "female")}
                  options={[
                    { value: "male", label: "Masculino" },
                    { value: "female", label: "Feminino" },
                  ]}
                  fullWidth
                />
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

        {result && (
          <div className="w-full space-y-6">
            <div
              className={`grid grid-cols-1 gap-6 ${result.bmr ? "lg:grid-cols-3" : "lg:mx-auto lg:max-w-4xl lg:grid-cols-2 lg:justify-center"}`}
            >
              <Card
                className={`result-success border-2 lg:col-span-1 ${result.healthy ? "border-growth-green bg-growth-green-soft" : "border-system-warning bg-system-warning/10"}`}
              >
                <CardHeader>
                  <CardTitle as="h3">Resultado do IMC</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4 text-center">
                    <div className="text-4xl font-bold tabular-nums text-text-primary-dark">
                      {result.imc}
                    </div>
                    <div
                      className={`text-xl font-semibold ${result.healthy ? "text-growth-green" : "text-system-warning"}`}
                    >
                      {result.ageAdjustedClassification || result.classification}
                    </div>
                    {result.healthy && (
                      <p className="text-growth-green">✓ Seu peso está dentro da faixa ideal!</p>
                    )}
                  </div>
                </CardContent>
              </Card>

              {result.idealWeightRange && (
                <Card className="border-l-4 border-system-info bg-system-info/10 lg:col-span-1">
                  <CardHeader>
                    <CardTitle as="h3" className="text-system-info">
                      🎯 Peso Ideal
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-center">
                      <p className="text-sm text-text-secondary">Para sua altura:</p>
                      <div className="text-2xl font-bold text-system-info">
                        {`${result.idealWeightRange.min} - ${result.idealWeightRange.max} kg`}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {result.bmr && (
                <Card className="border-l-4 border-growth-green bg-growth-green-soft lg:col-span-1">
                  <CardHeader>
                    <CardTitle as="h3" className="text-growth-green">
                      🔥 Taxa Metabólica
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-center">
                      <div className="text-2xl font-bold text-growth-green">
                        {result.bmr} kcal/dia
                      </div>
                      <p className="text-sm text-text-secondary">Calorias em repouso</p>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>

            {result.bodyFatPercentage && (
              <Card className="w-full max-w-full border-l-4 border-primary-blue bg-primary-blue-light sm:max-w-2xl md:max-w-4xl lg:max-w-6xl">
                <CardHeader>
                  <CardTitle as="h3" className="text-center text-primary-blue-dark">
                    📊 Gordura Corporal Estimada
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-center">
                    <div className="text-3xl font-bold text-primary-blue-dark">
                      {result.bodyFatPercentage}%
                    </div>
                    <p className="text-sm text-text-secondary">
                      Estimativa baseada no IMC, idade e sexo
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        )}

        <Card className="w-full max-w-full sm:max-w-2xl md:max-w-4xl lg:max-w-6xl">
          <CardHeader>
            <CardTitle as="h3" className="flex items-center gap-2">
              📊 Classificação do IMC
              {result && (
                <span className="rounded-full bg-primary-blue-light px-3 py-1 text-sm font-medium">
                  Seu IMC: {parseFloat(result.imc).toFixed(1)}
                </span>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {/* Barra indicadora visual */}
            <div className="mb-8">
              <IMCScale userIMC={result ? parseFloat(result.imc) : undefined} />
              <div className="mt-3 flex justify-between px-2 text-xs text-gray-600">
                <span className="font-medium text-blue-600">Abaixo</span>
                <span className="font-medium text-green-600">Normal</span>
                <span className="font-medium text-yellow-600">Sobrepeso</span>
                <span className="font-medium text-red-600">Obesidade</span>
              </div>
            </div>

            {/* Tabela com destaque */}
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b-2 border-gray-200">
                    <th className="py-3 text-left font-semibold text-text-primary">IMC</th>
                    <th className="py-3 text-left font-semibold text-text-primary">
                      Classificação
                    </th>
                    <th className="py-3 text-left font-semibold text-text-primary">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {imcRanges.map((range, index) => {
                    const currentRangeIndex = result ? getCurrentRange(parseFloat(result.imc)) : -1;
                    const isCurrentRange = currentRangeIndex === index;

                    return (
                      <tr
                        key={index}
                        className={`border-b transition-all duration-300 hover:bg-gray-50 ${
                          isCurrentRange
                            ? `${range.bgColor} ${range.borderColor} scale-[1.01] transform border-l-4 shadow-md`
                            : ""
                        } `}
                      >
                        <td
                          className={`px-3 py-4 font-medium ${isCurrentRange ? range.textColor : "text-text-primary"}`}
                        >
                          {range.range}
                        </td>
                        <td
                          className={`px-3 py-4 ${isCurrentRange ? range.textColor : "text-text-primary"}`}
                        >
                          <div className="flex items-center gap-2">
                            <span className="text-lg">{range.icon}</span>
                            <span className={isCurrentRange ? "font-semibold" : "font-medium"}>
                              {range.classification}
                            </span>
                            {isCurrentRange && (
                              <span className="ml-auto animate-pulse rounded-full border bg-white px-2 py-1 text-xs shadow-sm">
                                ← Você está aqui
                              </span>
                            )}
                          </div>
                        </td>
                        <td
                          className={`px-3 py-4 text-sm font-medium ${isCurrentRange ? range.textColor : "text-text-secondary"}`}
                        >
                          {range.description}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Recomendações personalizadas */}
            {result && (
              <div className="mt-6 rounded-lg border border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50 p-4 shadow-sm">
                <h4 className="mb-2 flex items-center gap-2 font-semibold text-blue-800">
                  💡 Recomendação Personalizada
                </h4>
                <p className="text-sm leading-relaxed text-blue-700">
                  {getPersonalizedRecommendation(parseFloat(result.imc))}
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Seção: O que é o IMC */}
        <Card className="w-full max-w-full border-l-4 border-growth-green bg-growth-green-soft duration-300 sm:max-w-2xl md:max-w-4xl lg:max-w-6xl">
          <CardHeader>
            <CardTitle as="h2" className="text-xl font-bold text-text-primary">
              🏥 O que é o IMC (Índice de Massa Corporal)?
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 text-text-primary">
              <p>
                O <strong className="text-growth-green">IMC (Índice de Massa Corporal)</strong> é
                uma medida internacional padrão usada para avaliar se uma pessoa está dentro do peso
                considerado saudável para sua altura. Foi desenvolvido pelo matemático belga Lambert
                Adolphe Jacques Quételet no século XIX.
              </p>
              <p>
                A fórmula do IMC é simples:{" "}
                <strong className="rounded bg-background-dark-secondary px-2 py-1 font-mono text-primary-blue-dark">
                  IMC = peso (kg) ÷ altura² (m)
                </strong>
              </p>
              <p>
                Este índice é amplamente utilizado por{" "}
                <strong className="text-primary-blue-dark">
                  profissionais de saúde, médicos e nutricionistas
                </strong>{" "}
                como uma ferramenta de triagem inicial para identificar possíveis problemas de peso
                que podem levar a problemas de saúde.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Seção: Como interpretar o resultado */}
        <Card className="w-full max-w-full border-l-4 border-primary-blue bg-primary-blue-light duration-300 sm:max-w-2xl md:max-w-4xl lg:max-w-6xl">
          <CardHeader>
            <CardTitle as="h2" className="text-xl font-bold text-text-primary">
              📊 Como Interpretar seu Resultado do IMC
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <div className="h-4 w-4 rounded bg-blue-500"></div>
                    <span className="font-semibold text-text-primary">
                      Abaixo do Peso (&lt; 18,5)
                    </span>
                  </div>
                  <p className="ml-6 text-sm text-text-secondary">
                    Pode indicar desnutrição ou outros problemas de saúde. Recomenda-se consultar um
                    médico.
                  </p>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <div className="h-4 w-4 rounded bg-growth-green"></div>
                    <span className="font-semibold text-growth-green">
                      Peso Normal (18,5 - 24,9)
                    </span>
                  </div>
                  <p className="ml-6 text-sm text-text-secondary">
                    Faixa ideal para a saúde. Continue mantendo hábitos saudáveis de alimentação e
                    exercícios.
                  </p>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <div className="h-4 w-4 rounded bg-system-warning"></div>
                    <span className="font-semibold text-system-warning">
                      Sobrepeso (25,0 - 29,9)
                    </span>
                  </div>
                  <p className="ml-6 text-sm text-text-secondary">
                    Risco aumentado para doenças cardiovasculares. Considere mudanças no estilo de
                    vida.
                  </p>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <div className="h-4 w-4 rounded bg-system-error"></div>
                    <span className="font-semibold text-system-error-dark">
                      Obesidade (&ge; 30,0)
                    </span>
                  </div>
                  <p className="ml-6 text-sm text-text-secondary">
                    Risco significativo para diabetes, hipertensão e outras complicações. Procure
                    orientação médica.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Seção: Limitações do IMC */}
        <Card className="w-full max-w-full border-l-4 border-system-warning bg-system-warning/10 duration-300 sm:max-w-2xl md:max-w-4xl lg:max-w-6xl">
          <CardHeader>
            <CardTitle as="h2" className="text-xl font-bold text-text-primary">
              ⚠️ Limitações do IMC - O que Você Deve Saber
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 text-text-primary">
              <p className="font-medium text-system-warning">
                <strong>Importante:</strong> O IMC é uma ferramenta de triagem, não um diagnóstico
                médico completo.
              </p>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <h4 className="mb-2 font-semibold text-system-warning">
                    ⚠️ O IMC NÃO considera:
                  </h4>
                  <ul className="space-y-1 text-sm text-text-secondary">
                    <li>
                      • <strong>Massa muscular:</strong> Atletas podem ter IMC alto por músculos
                    </li>
                    <li>
                      • <strong>Densidade óssea:</strong> Varia entre indivíduos
                    </li>
                    <li>
                      • <strong>Distribuição de gordura:</strong> Gordura abdominal vs. periférica
                    </li>
                    <li>
                      • <strong>Idade:</strong> Metabolismo muda com o tempo
                    </li>
                    <li>
                      • <strong>Sexo:</strong> Diferenças na composição corporal
                    </li>
                    <li>
                      • <strong>Etnia:</strong> Variações genéticas
                    </li>
                  </ul>
                </div>

                <div>
                  <h4 className="mb-2 font-semibold text-growth-green">✅ Casos Especiais:</h4>
                  <ul className="space-y-1 text-sm text-text-secondary">
                    <li>
                      • <strong>Atletas:</strong> Podem ter IMC alto devido à massa muscular
                    </li>
                    <li>
                      • <strong>Idosos:</strong> Critérios podem ser mais flexíveis
                    </li>
                    <li>
                      • <strong>Crianças:</strong> Usam tabelas específicas por idade
                    </li>
                    <li>
                      • <strong>Gestantes:</strong> IMC não se aplica durante gravidez
                    </li>
                    <li>
                      • <strong>Asiáticos:</strong> Pontos de corte diferentes (OMS)
                    </li>
                  </ul>
                </div>
              </div>

              <div className="rounded-lg border border-system-info/20 bg-system-info/10 p-4">
                <p className="text-sm">
                  <strong className="text-system-info">💡 Recomendação:</strong>
                  Para uma avaliação completa da sua saúde, consulte sempre um{" "}
                  <strong>médico, nutricionista ou educador físico</strong>. Eles podem considerar
                  outros fatores como composição corporal, histórico familiar e exames
                  complementares.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Seção: Dicas para manter peso saudável */}
        <Card className="w-full max-w-full border-l-4 border-growth-green bg-growth-green-soft duration-300 sm:max-w-2xl md:max-w-4xl lg:max-w-6xl">
          <CardHeader>
            <CardTitle as="h2" className="text-xl font-bold text-text-primary">
              💪 Dicas para Manter um Peso Saudável
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div>
                <h4 className="mb-3 flex items-center font-semibold text-growth-green">
                  🥗 <span className="ml-2">Alimentação Equilibrada</span>
                </h4>
                <ul className="space-y-2 text-sm text-text-secondary">
                  <li>• Consuma mais frutas, verduras e legumes</li>
                  <li>• Prefira grãos integrais aos refinados</li>
                  <li>• Inclua proteínas magras na dieta</li>
                  <li>• Beba pelo menos 2 litros de água por dia</li>
                  <li>• Evite alimentos ultraprocessados</li>
                  <li>• Controle o tamanho das porções</li>
                </ul>
              </div>

              <div>
                <h4 className="mb-3 flex items-center font-semibold text-primary-blue-dark">
                  🏃‍♂️ <span className="ml-2">Atividade Física Regular</span>
                </h4>
                <ul className="space-y-2 text-sm text-text-secondary">
                  <li>• Pratique 150min de exercício moderado/semana</li>
                  <li>• Inclua exercícios de força 2x por semana</li>
                  <li>• Comece devagar e aumente gradualmente</li>
                  <li>• Encontre atividades que você goste</li>
                  <li>• Use as escadas em vez do elevador</li>
                  <li>• Caminhe sempre que possível</li>
                </ul>
              </div>

              <div>
                <h4 className="mb-3 flex items-center font-semibold text-system-info">
                  😴 <span className="ml-2">Estilo de Vida Saudável</span>
                </h4>
                <ul className="space-y-2 text-sm text-text-secondary">
                  <li>• Durma de 7-9 horas por noite</li>
                  <li>• Gerencie o estresse com técnicas de relaxamento</li>
                  <li>• Evite fumar e limite o álcool</li>
                  <li>• Faça check-ups médicos regulares</li>
                  <li>• Mantenha uma rotina consistente</li>
                  <li>• Busque apoio social quando necessário</li>
                </ul>
              </div>

              <div>
                <h4 className="mb-3 flex items-center font-semibold text-system-warning">
                  📋 <span className="ml-2">Monitoramento</span>
                </h4>
                <ul className="space-y-2 text-sm text-text-secondary">
                  <li>• Monitore seu peso regularmente</li>
                  <li>• Acompanhe sua composição corporal</li>
                  <li>• Meça a circunferência da cintura</li>
                  <li>• Mantenha um diário alimentar</li>
                  <li>• Registre suas atividades físicas</li>
                  <li>• Celebre pequenas conquistas</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Seção: Métodos Científicos de Cálculo do IMC */}
        <Card className="w-full max-w-full border-l-4 border-system-info bg-system-info/10 duration-300 sm:max-w-2xl md:max-w-4xl lg:max-w-6xl">
          <CardHeader>
            <CardTitle as="h2" className="text-xl font-bold text-text-primary">
              🔬 Métodos Científicos e Fórmulas de Cálculo do IMC
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <p className="text-text-primary">
                Nossa calculadora utiliza os{" "}
                <strong className="text-system-info">
                  métodos mais precisos e reconhecidos internacionalmente
                </strong>{" "}
                para o cálculo do IMC. Entenda a metodologia científica por trás dos resultados:
              </p>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="bg-primary-blue/5/5 rounded-lg border border-primary-blue/20 p-4">
                  <h4 className="mb-3 flex items-center font-semibold text-primary-blue-dark">
                    📐 <span className="ml-2">Fórmula Padrão da OMS</span>
                  </h4>
                  <div className="mb-3 rounded border bg-gray-900 p-3">
                    <code className="text-sm text-text-primary">
                      <strong>IMC = Peso (kg) ÷ Altura² (m²)</strong>
                    </code>
                    <p className="mt-1 text-xs text-text-secondary">
                      Exemplo: 70kg ÷ (1.75m)² = 70 ÷ 3.0625 = 22.86
                    </p>
                  </div>
                  <ul className="space-y-1 text-sm text-text-secondary">
                    <li>
                      • <strong>Desenvolvida em:</strong> 1832 por Adolphe Quetelet
                    </li>
                    <li>
                      • <strong>Padronizada pela:</strong> OMS em 1985
                    </li>
                    <li>
                      • <strong>Precisão:</strong> 95% para população geral
                    </li>
                    <li>
                      • <strong>Aplicação:</strong> Adultos 18-65 anos
                    </li>
                  </ul>
                </div>

                <div className="bg-growth-green/5/5 rounded-lg border border-growth-green/20 p-4">
                  <h4 className="mb-3 flex items-center font-semibold text-growth-green">
                    🌍 <span className="ml-2">Conversões Internacionais</span>
                  </h4>
                  <div className="space-y-2">
                    <div className="rounded border bg-gray-900 p-2">
                      <div className="text-xs font-medium text-text-primary">Sistema Imperial:</div>
                      <code className="text-xs text-growth-green">
                        IMC = (Peso_lb × 703) ÷ Altura_in²
                      </code>
                    </div>
                    <div className="rounded border bg-gray-900 p-2">
                      <div className="text-xs font-medium text-text-primary">Misto (lb + cm):</div>
                      <code className="text-xs text-growth-green">
                        IMC = (Peso_lb × 0.453592) ÷ (Altura_cm ÷ 100)²
                      </code>
                    </div>
                  </div>
                  <ul className="mt-3 space-y-1 text-sm text-text-secondary">
                    <li>
                      • <strong>Fator 703:</strong> Conversão libras/polegadas para kg/m²
                    </li>
                    <li>
                      • <strong>Auto-conversão:</strong> Nossa calculadora converte automaticamente
                    </li>
                    <li>
                      • <strong>Precisão mantida:</strong> 2 casas decimais
                    </li>
                  </ul>
                </div>

                <div className="bg-system-warning/5/5 rounded-lg border border-system-warning/20 p-4">
                  <h4 className="mb-3 flex items-center font-semibold text-system-warning">
                    🎯 <span className="ml-2">Classificação Personalizada</span>
                  </h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-text-primary">Adultos Padrão:</span>
                      <span className="text-system-warning">OMS 2024</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-text-primary">Por Idade:</span>
                      <span className="text-system-warning">18-30, 31-50, 51+</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-text-primary">Por Sexo:</span>
                      <span className="text-system-warning">Masculino/Feminino</span>
                    </div>
                  </div>
                  <div className="mt-3 rounded bg-system-warning/10 p-2 text-xs text-system-warning">
                    <strong>Diferencial:</strong> Análise contextualizada por perfil demográfico
                  </div>
                </div>

                <div className="bg-system-error/5/5 rounded-lg border border-system-error/20 p-4">
                  <h4 className="mb-3 flex items-center font-semibold text-system-error-dark">
                    ⚕️ <span className="ml-2">Validação Médica</span>
                  </h4>
                  <ul className="space-y-1 text-sm text-text-secondary">
                    <li>
                      • <strong>Correlação com Gordura:</strong> R² = 0.72-0.85
                    </li>
                    <li>
                      • <strong>Predição de Risco:</strong> Diabetes, cardiovascular
                    </li>
                    <li>
                      • <strong>Estudos Longitudinais:</strong> +500.000 participantes
                    </li>
                    <li>
                      • <strong>Validação Brasileira:</strong> IBGE + MS 2019-2024
                    </li>
                  </ul>
                  <div className="mt-3 rounded bg-system-error/10 p-2 text-xs text-system-error-dark">
                    <strong>Importante:</strong> Ferramenta de triagem, não substitui avaliação
                    médica
                  </div>
                </div>
              </div>

              <div className="rounded-lg border border-primary-blue/20 bg-gradient-to-r from-primary-blue/10 to-growth-green/10 p-4">
                <h4 className="mb-2 font-semibold text-text-primary">
                  🏆 Por que Nossa Calculadora se Destaca?
                </h4>
                <div className="grid grid-cols-1 gap-4 text-sm text-text-secondary md:grid-cols-3">
                  <div>
                    <strong className="text-primary-blue-dark">1. Precisão Máxima</strong>
                    <p>
                      Fórmulas validadas internacionalmente com conversões automáticas precisas
                      entre todas as unidades.
                    </p>
                  </div>
                  <div>
                    <strong className="text-growth-green">2. Personalização</strong>
                    <p>
                      Análise contextualizada por idade, sexo e características demográficas
                      específicas do usuário.
                    </p>
                  </div>
                  <div>
                    <strong className="text-system-warning">3. Fundamentação Científica</strong>
                    <p>
                      Baseada nas diretrizes mais atuais da OMS, IBGE e estudos epidemiológicos
                      brasileiros.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Seção: Ecossistema Completo de Saúde e Bem-Estar */}
        <Card className="w-full max-w-full border border-neutral-surface-variant bg-background-dark-secondary duration-300 sm:max-w-2xl md:max-w-4xl lg:max-w-6xl">
          <CardHeader>
            <CardTitle as="h2" className="text-xl font-bold text-text-primary">
              🔗 Ecossistema Completo: Saúde Física + Maternidade + Bem-Estar
            </CardTitle>
            <p className="mt-2 text-sm text-text-secondary">
              Monitore sua saúde de forma integrada com nossas calculadoras especializadas
            </p>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                <div className="rounded-lg border border-growth-green/20 bg-growth-green-soft p-4">
                  <div className="mb-2 flex items-center">
                    <span className="mr-2 text-2xl">🏋️</span>
                    <div>
                      <h4 className="text-sm font-bold text-growth-green">COMPLEMENTAR AO IMC</h4>
                      <p className="text-xs text-text-secondary">Análise corporal</p>
                    </div>
                  </div>
                  <h3 className="mb-1 font-semibold text-growth-green">
                    Calculadora de Gordura Corporal
                  </h3>
                  <p className="mb-2 text-xs text-text-secondary">
                    <strong>Ideal para atletas e pessoas ativas:</strong> métodos Navy,
                    Jackson-Pollock e bioimpedância para análise precisa da composição corporal.
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium text-growth-green">
                      Navy • DEXA • Bioimpedância
                    </span>
                    <a
                      href="/calculadoras/saude/gordura-corporal"
                      className="rounded bg-growth-green px-2 py-1 text-xs text-white hover:bg-growth-green-dark"
                    >
                      Usar →
                    </a>
                  </div>
                </div>

                <div className="bg-system-info-soft rounded-lg border border-system-info/20 p-4">
                  <div className="mb-2 flex items-center">
                    <span className="mr-2 text-2xl">👶</span>
                    <div>
                      <h4 className="text-sm font-bold text-system-info">SAÚDE MATERNO-INFANTIL</h4>
                      <p className="text-xs text-text-secondary">Para toda família</p>
                    </div>
                  </div>
                  <h3 className="mb-1 font-semibold text-system-info">Desenvolvimento Infantil</h3>
                  <p className="mb-2 text-xs text-text-secondary">
                    <strong>Monitore o crescimento do seu bebê</strong> com marcos de
                    desenvolvimento, cronograma pediátrico e análise por idade corrigida.
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium text-system-info">
                      0-36 meses • Marcos • Pediatria
                    </span>
                    <a
                      href="/calculadoras/saude/desenvolvimento-infantil"
                      className="rounded bg-system-info px-2 py-1 text-xs text-white hover:bg-system-info-dark"
                    >
                      Usar →
                    </a>
                  </div>
                </div>

                <div className="rounded-lg border border-primary-blue/20 bg-primary-blue-light p-4">
                  <div className="mb-2 flex items-center">
                    <span className="mr-2 text-2xl">🌸</span>
                    <div>
                      <h4 className="text-sm font-bold text-primary-blue-dark">
                        PLANEJAMENTO FAMILIAR
                      </h4>
                      <p className="text-xs text-text-secondary">Saúde reprodutiva</p>
                    </div>
                  </div>
                  <h3 className="mb-1 font-semibold text-primary-blue-dark">Ciclo Menstrual</h3>
                  <p className="mb-2 text-xs text-text-secondary">
                    <strong>Conheça seu corpo:</strong> acompanhe período fértil, ovulação e planeje
                    uma gravidez saudável com peso ideal.
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium text-primary-blue-dark">
                      Fertilidade • Ovulação • TPM
                    </span>
                    <a
                      href="/calculadoras/saude/ciclo-menstrual"
                      className="rounded bg-primary-blue px-2 py-1 text-xs text-white hover:bg-primary-blue-dark"
                    >
                      Usar →
                    </a>
                  </div>
                </div>
              </div>

              <div className="rounded-lg border border-primary-blue/20 bg-gradient-to-r from-primary-blue/10 to-growth-green/10 p-4">
                <h4 className="mb-2 flex items-center font-semibold text-text-primary">
                  🎯 <span className="ml-2">Jornada Integrada de Saúde e Bem-Estar</span>
                </h4>
                <div className="grid grid-cols-1 gap-4 text-sm md:grid-cols-3">
                  <div className="text-center">
                    <div className="font-medium text-primary-blue-dark">
                      1. Monitoramento Corporal
                    </div>
                    <p className="text-xs text-text-secondary">
                      Use IMC + Gordura Corporal para análise completa da sua composição física
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="font-medium text-system-info">2. Planejamento Familiar</div>
                    <p className="text-xs text-text-secondary">
                      Combine peso ideal com ciclo menstrual para uma gravidez saudável
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="font-medium text-growth-green">3. Saúde da Família</div>
                    <p className="text-xs text-text-secondary">
                      Acompanhe o desenvolvimento dos seus filhos com ferramentas especializadas
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="bg-system-warning-soft rounded-lg border border-system-warning/20 p-3">
                  <h4 className="mb-1 text-sm font-semibold text-system-warning">
                    💰 Saúde Financeira Também Importa
                  </h4>
                  <p className="mb-2 text-xs text-text-secondary">
                    Planeje seu futuro financeiro para custear tratamentos de saúde e bem-estar da
                    família.
                  </p>
                  <div className="space-y-1">
                    <a
                      href="/calculadoras/financas/juros-compostos"
                      className="block text-xs text-system-warning hover:underline"
                    >
                      📈 Juros Compostos para Reserva de Emergência →
                    </a>
                    <a
                      href="/calculadoras/financas/primeiro-milhao"
                      className="block text-xs text-system-warning hover:underline"
                    >
                      🎯 Primeiro Milhão para Independência →
                    </a>
                  </div>
                </div>

                <div className="rounded-lg border border-growth-green/20 bg-growth-green-soft p-3">
                  <h4 className="mb-1 text-sm font-semibold text-growth-green">
                    📱 Para Profissionais de Saúde
                  </h4>
                  <p className="mb-2 text-xs text-text-secondary">
                    Ferramentas complementares para consultórios, academias e clínicas de nutrição.
                  </p>
                  <button
                    onClick={() =>
                      navigator.share?.({
                        title: "Calculadoras de Saúde Profissionais",
                        url: window.location.origin + "/calculadoras/saude",
                      })
                    }
                    className="text-xs text-growth-green hover:underline"
                  >
                    Compartilhar com Colegas →
                  </button>
                </div>
              </div>
            </div>

            <div className="mt-6 border-t border-neutral-surface-variant pt-4 text-center">
              <a
                href="/calculadoras/saude"
                className="hover inline-flex items-center font-medium text-primary-blue-dark"
              >
                🏥 Explorar Todo Ecossistema de Saúde
              </a>
              <p className="mt-1 text-xs text-text-secondary">
                Descubra todas as ferramentas para cuidar da saúde da sua família
              </p>
            </div>
          </CardContent>
        </Card>

        <FAQ
          title="Perguntas Frequentes - Calculadora de IMC"
          items={[
            {
              question: "Qual é o IMC ideal para a minha idade?",
              answer:
                "O IMC ideal varia com a idade: <strong>18-30 anos</strong> (18.5-24.9), <strong>31-50 anos</strong> (19-25.5), <strong>51+ anos</strong> (20-26). Nossa calculadora ajusta automaticamente os parâmetros ideais baseado na sua faixa etária e sexo.",
              borderColor: "primary-blue",
            },
            {
              question: "Como converter peso de libras para quilos no cálculo do IMC?",
              answer:
                "<strong>1 libra = 0.453592 kg.</strong> Nossa calculadora faz a conversão automaticamente. Para cálculo manual: multiplique seu peso em libras por 0.453592 ou use a fórmula imperial: (Peso_lb × 703) ÷ Altura_polegadas².",
              borderColor: "growth-green",
            },
            {
              question: "Por que meu IMC é diferente em outras calculadoras?",
              answer:
                "Diferenças podem ocorrer por: <strong>arredondamentos</strong> (usamos 2 decimais), <strong>conversões imprecisas</strong> de unidades, ou falta de <strong>personalização por idade/sexo</strong>. Nossa calculadora segue os padrões mais rigorosos da OMS.",
              borderColor: "system-info",
            },
            {
              question: "O IMC é preciso para atletas e pessoas musculosas?",
              answer:
                "<strong>Não completamente.</strong> O IMC não distingue massa muscular de gordura. Atletas podem ter IMC alto devido aos músculos. Para pessoas muito musculosas, recomendamos nossa <strong>Calculadora de Gordura Corporal</strong>.",
              borderColor: "system-warning",
            },
            {
              question: "Quando o IMC indica risco para a saúde?",
              answer:
                "<strong>IMC &lt; 18.5:</strong> risco de desnutrição. <strong>IMC 25-29.9:</strong> risco aumentado para diabetes e cardiovascular. <strong>IMC ≥ 30:</strong> risco significativo para múltiplas comorbidades. Consulte sempre um médico para avaliação completa.",
              borderColor: "system-error-dark",
            },
            {
              question: "Como o IMC feminino difere do masculino?",
              answer:
                "Mulheres naturalmente têm <strong>maior percentual de gordura corporal</strong> (20-25% vs 15-20% homens). Nossa calculadora considera essas diferenças, ajustando interpretações e recomendações por sexo.",
              borderColor: "primary-blue",
            },
            {
              question: "Com que frequência devo calcular meu IMC?",
              answer:
                "Para <strong>monitoramento geral:</strong> mensalmente. <strong>Durante dieta/exercícios:</strong> semanalmente. <strong>Manutenção de peso:</strong> a cada 3 meses. Sempre no mesmo horário e condições para maior precisão.",
              borderColor: "growth-green",
            },
            {
              question: "Posso usar o IMC durante a gravidez?",
              answer:
                "<strong>Não recomendado durante a gestação.</strong> Use o IMC pré-gestacional para classificação inicial. Durante a gravidez, siga orientações médicas específicas sobre ganho de peso adequado para cada trimestre.",
              borderColor: "system-warning",
            },
          ]}
          tipSection={{
            title: "Dica Importante sobre Interpretação",
            content:
              "<strong>O IMC é uma ferramenta de triagem, não diagnóstico!</strong> Use-o como <strong>ponto de partida</strong> para conversas com profissionais de saúde. Considere também histórico familiar, composição corporal, níveis de atividade física e exames complementares para uma avaliação completa.",
          }}
          footerText="<strong>Quer saber mais?</strong> Nossa calculadora oferece explicações detalhadas para cada resultado e categoria de IMC."
        />

        {/* Footer com informações adicionais */}
        <Card className="w-full max-w-full border-l-4 border-primary-blue bg-primary-blue-light duration-300 sm:max-w-2xl md:max-w-4xl lg:max-w-6xl">
          <CardHeader>
            <CardTitle as="h2" className="text-lg font-bold text-text-primary">
              📚 Sobre Esta Calculadora de IMC
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 text-sm text-text-secondary">
              <p>
                Esta calculadora de IMC online é totalmente{" "}
                <strong className="text-primary-blue-dark">gratuita</strong> e foi desenvolvida
                seguindo os padrões da <strong>Organização Mundial da Saúde (OMS)</strong>. Os
                cálculos são precisos e instantâneos, permitindo que você monitore sua saúde de
                forma prática.
              </p>
              <p>
                <strong className="text-growth-green">Importante:</strong> Esta ferramenta é apenas
                para fins informativos e educacionais. Sempre consulte um profissional de saúde
                qualificado para avaliações médicas e orientações personalizadas sobre seu peso e
                saúde.
              </p>
              <p className="text-xs opacity-75">
                Última atualização: Dezembro 2024 • Baseado nas diretrizes da OMS 2024
              </p>
            </div>
          </CardContent>
        </Card>

        <RelatedCalculators category="saude" currentCalculatorId="imc" />
      </div>
    </div>
  );
}
