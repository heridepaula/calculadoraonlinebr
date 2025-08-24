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
import { GrowthChart } from "~/components/GrowthChart";
import { APP_NAME } from "~/lib/constants";
import { useAutoCalculatorTracking, useFormTracking } from "~/hooks/useAutoCalculatorTracking";
import {
  calculateChildDevelopment,
  calculateChildPercentiles,
  type ChildDevelopmentParams,
  type ChildDevelopmentResult,
  type ChildPercentilesParams,
  type ChildPercentilesResult,
  type DevelopmentMilestone,
} from "~/utils/calculations";

// Interface para validação de erros
interface ValidationErrors {
  birthDate?: string;
  gender?: string;
  weight?: string;
  height?: string;
  headCircumference?: string;
  motherHeight?: string;
  fatherHeight?: string;
  general?: string;
}

export const meta: MetaFunction = () => {
  return [
    {
      title: `Calculadora de Desenvolvimento Infantil com Percentis WHO/CDC - Gráficos Interativos 0-5 Anos - ${APP_NAME}`,
    },
    {
      name: "description",
      content:
        "Calculadora completa de desenvolvimento infantil com percentis WHO/CDC, gráficos interativos de crescimento, previsão de altura adulta e marcos de desenvolvimento. Baseada em padrões médicos internacionais para crianças de 0 a 5 anos. Suporte completo a prematuros com idade corrigida.",
    },
    {
      name: "keywords",
      content:
        "calculadora desenvolvimento infantil, percentis WHO CDC, gráficos crescimento interativos, marcos do bebê, previsão altura adulta, percentil peso altura, curvas crescimento, desenvolvimento motor bebê, linguagem infantil, marcos cognitivos, crescimento bebê, prematuros idade corrigida, consulta pediatra, desenvolvimento social bebê, marcos 0-5 anos, acompanhamento pediátrico, perímetro cefálico, desenvolvimento neuropsicomotor, estimulação precoce",
    },
    { name: "author", content: "Calculadora Online BR" },
    { name: "robots", content: "index,follow" },
    { name: "googlebot", content: "index,follow" },
    { name: "bingbot", content: "index,follow" },
    {
      property: "og:title",
      content: `Calculadora de Desenvolvimento Infantil - Acompanhe Marcos do Bebê - ${APP_NAME}`,
    },
    {
      property: "og:description",
      content:
        "Monitore gratuitamente o desenvolvimento do seu bebê com 25+ marcos interativos, cronograma pediátrico personalizado e suporte completo a prematuros. Baseado em diretrizes médicas.",
    },
    { property: "og:type", content: "website" },
    {
      property: "og:url",
      content: "https://calculadoraonlinebr.com.br/calculadoras/saude/desenvolvimento-infantil",
    },
    { property: "og:site_name", content: APP_NAME },
    { property: "og:locale", content: "pt_BR" },
    { name: "twitter:card", content: "summary_large_image" },
    {
      name: "twitter:title",
      content: `Calculadora Desenvolvimento Infantil Online - Marcos 0-36 Meses - ${APP_NAME}`,
    },
    {
      name: "twitter:description",
      content:
        "Ferramenta completa para pais: marcos interativos, cronograma médico, idade corrigida para prematuros e análise por categorias de desenvolvimento.",
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
        name: "Calculadora de Desenvolvimento Infantil",
        description:
          "Ferramenta online gratuita para acompanhar marcos de desenvolvimento de bebês de 0 a 36 meses, com suporte a prematuros e cronograma pediátrico personalizado.",
        url: "https://calculadoraonlinebr.com.br/calculadoras/saude/desenvolvimento-infantil",
        mainEntity: {
          "@type": "MedicalCalculator",
          name: "Calculadora de Marcos de Desenvolvimento Infantil",
          description:
            "Calculadora interativa que monitora marcos de desenvolvimento motor, cognitivo, linguagem e social em bebês e crianças de 0 a 36 meses.",
          medicalSpecialty: "Pediatria",
          mainEntityOfPage: {
            "@type": "WebPage",
            "@id": "https://calculadoraonlinebr.com.br/calculadoras/saude/desenvolvimento-infantil",
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
              name: "Desenvolvimento Infantil",
            },
          ],
        },
        publisher: {
          "@type": "Organization",
          name: "Calculadora Online BR",
          url: "https://calculadoraonlinebr.com.br",
        },
        inLanguage: "pt-BR",
        isAccessibleForFree: true,
        hasPart: [
          {
            "@type": "MedicalTest",
            name: "Marcos de Desenvolvimento Motor",
          },
          {
            "@type": "MedicalTest",
            name: "Marcos de Desenvolvimento Cognitivo",
          },
          {
            "@type": "MedicalTest",
            name: "Marcos de Desenvolvimento da Linguagem",
          },
          {
            "@type": "MedicalTest",
            name: "Marcos de Desenvolvimento Social",
          },
        ],
      }),
    },
  ];
};

export default function ChildDevelopmentCalculator() {
  // Estados básicos
  const [birthDate, setBirthDate] = useState("");
  const [gender, setGender] = useState<"male" | "female">("male");
  const [isPremature, setIsPremature] = useState(false);
  const [gestationalWeeks, setGestationalWeeks] = useState("40");

  // Estados para percentis
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [headCircumference, setHeadCircumference] = useState("");
  const [motherHeight, setMotherHeight] = useState("");
  const [fatherHeight, setFatherHeight] = useState("");

  // Estados de resultado e validação
  const [result, setResult] = useState<ChildDevelopmentResult | null>(null);
  const [percentilesResult, setPercentilesResult] = useState<ChildPercentilesResult | null>(null);
  const [completedMilestones, setCompletedMilestones] = useState<Set<string>>(new Set());
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [isCalculating, setIsCalculating] = useState(false);

  // Global Analytics Tracking
  const {
    startCalculation,
    endCalculation,
    trackFeature,
    trackButtonClick,
    trackStepsToggle,
    trackInputFocus,
  } = useAutoCalculatorTracking({
    calculatorType: "desenvolvimento_infantil",
    category: "saude",
  });

  const { trackInputChange, trackFormSubmission } = useFormTracking("desenvolvimento_infantil");
  const resultsRef = useRef<HTMLDivElement>(null);

  const formatDate = (date: Date): string => {
    return date.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const formatAge = (months: number): string => {
    const years = Math.floor(months / 12);
    const remainingMonths = months % 12;

    if (years === 0) {
      return `${months} ${months === 1 ? "mês" : "meses"}`;
    } else if (remainingMonths === 0) {
      return `${years} ${years === 1 ? "ano" : "anos"}`;
    } else {
      return `${years} ${years === 1 ? "ano" : "anos"} e ${remainingMonths} ${remainingMonths === 1 ? "mês" : "meses"}`;
    }
  };

  const handleCalculate = async () => {
    setIsCalculating(true);
    setErrors({});

    // Validação robusta de campos obrigatórios
    const newErrors: ValidationErrors = {};
    const today = new Date();
    const fiveYearsAgo = new Date();
    fiveYearsAgo.setFullYear(today.getFullYear() - 5);

    // Validação da data de nascimento (OBRIGATÓRIO)
    if (!birthDate) {
      newErrors.birthDate = "Por favor, informe a data de nascimento";
    } else {
      const birth = new Date(birthDate);
      if (birth > today) {
        newErrors.birthDate = "A data não pode ser no futuro";
      } else if (birth < fiveYearsAgo) {
        newErrors.birthDate = "Esta calculadora é para crianças de 0 a 5 anos";
      }
    }

    // Validação do peso (OBRIGATÓRIO para percentis)
    if (!weight || weight.trim() === "") {
      newErrors.weight = "Por favor, informe o peso atual da criança";
    } else {
      const weightNum = parseFloat(weight);
      if (isNaN(weightNum) || weightNum <= 0) {
        newErrors.weight = "Por favor, informe um peso válido";
      } else if (weightNum < 0.5 || weightNum > 50) {
        newErrors.weight = "Peso deve estar entre 0,5kg e 50kg";
      }
    }

    // Validação da altura (OBRIGATÓRIO para percentis)
    if (!height || height.trim() === "") {
      newErrors.height = "Por favor, informe a altura atual da criança";
    } else {
      const heightNum = parseFloat(height);
      if (isNaN(heightNum) || heightNum <= 0) {
        newErrors.height = "Por favor, informe uma altura válida";
      } else if (heightNum < 30 || heightNum > 150) {
        newErrors.height = "Altura deve estar entre 30cm e 150cm";
      }
    }

    // Validação da circunferência da cabeça (OBRIGATÓRIO para crianças até 2 anos)
    const birth = new Date(birthDate);
    const ageInMonths = birthDate
      ? Math.floor((today.getTime() - birth.getTime()) / (1000 * 60 * 60 * 24 * 30.44))
      : 0;

    if (ageInMonths <= 24) {
      if (!headCircumference || headCircumference.trim() === "") {
        newErrors.headCircumference = "Circunferência da cabeça é obrigatória até 2 anos";
      } else {
        const headNum = parseFloat(headCircumference);
        if (isNaN(headNum) || headNum <= 0) {
          newErrors.headCircumference = "Por favor, informe uma circunferência válida";
        } else if (headNum < 25 || headNum > 60) {
          newErrors.headCircumference = "Circunferência deve estar entre 25cm e 60cm";
        }
      }
    }

    // Validação da altura dos pais (OPCIONAL, mas se preenchida deve ser válida)
    if (motherHeight && motherHeight.trim() !== "") {
      const motherNum = parseFloat(motherHeight);
      if (isNaN(motherNum) || motherNum < 120 || motherNum > 220) {
        newErrors.motherHeight = "Altura da mãe deve estar entre 120cm e 220cm";
      }
    }

    if (fatherHeight && fatherHeight.trim() !== "") {
      const fatherNum = parseFloat(fatherHeight);
      if (isNaN(fatherNum) || fatherNum < 120 || fatherNum > 220) {
        newErrors.fatherHeight = "Altura do pai deve estar entre 120cm e 220cm";
      }
    }

    // Se há erros, exibir e parar execução
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setResult(null);
      setPercentilesResult(null);
      setIsCalculating(false);
      return;
    }

    // Simular loading para melhor UX
    await new Promise((resolve) => setTimeout(resolve, 800));

    try {
      const gestationalWeeksNum = parseInt(gestationalWeeks);

      // Calcular marcos de desenvolvimento
      const params: ChildDevelopmentParams = {
        birthDate: birth,
        isPremature,
        gestationalWeeks: gestationalWeeksNum,
      };
      const developmentResult = calculateChildDevelopment(params);
      setResult(developmentResult);

      // Calcular percentis
      const percentilesParams: ChildPercentilesParams = {
        birthDate: birth,
        gender,
        weight: parseFloat(weight),
        height: parseFloat(height),
        headCircumference: headCircumference ? parseFloat(headCircumference) : undefined,
        motherHeight: motherHeight ? parseFloat(motherHeight) : undefined,
        fatherHeight: fatherHeight ? parseFloat(fatherHeight) : undefined,
        isPremature,
        gestationalWeeks: gestationalWeeksNum,
      };
      const percentilesCalc = calculateChildPercentiles(percentilesParams);
      setPercentilesResult(percentilesCalc);
    } catch (error) {
      setErrors({ general: "Erro ao calcular o desenvolvimento. Tente novamente." });
    } finally {
      setIsCalculating(false);
    }
  };

  const handleReset = () => {
    setBirthDate("");
    setGender("male");
    setIsPremature(false);
    setGestationalWeeks("40");
    setWeight("");
    setHeight("");
    setHeadCircumference("");
    setMotherHeight("");
    setFatherHeight("");
    setResult(null);
    setPercentilesResult(null);
    setCompletedMilestones(new Set());
    setErrors({});
    setIsCalculating(false);
  };

  // Scroll automático para resultados
  useEffect(() => {
    if (result && percentilesResult) {
      resultsRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [result, percentilesResult]);

  const toggleMilestone = (milestoneId: string) => {
    const newCompletedMilestones = new Set(completedMilestones);
    if (newCompletedMilestones.has(milestoneId)) {
      newCompletedMilestones.delete(milestoneId);
    } else {
      newCompletedMilestones.add(milestoneId);
    }
    setCompletedMilestones(newCompletedMilestones);
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "motor":
        return "primary-blue";
      case "cognitive":
        return "growth-green";
      case "language":
        return "system-info";
      case "social":
        return "system-warning";
      case "physical":
        return "system-error";
      default:
        return "neutral";
    }
  };

  const getCategoryEmoji = (category: string) => {
    switch (category) {
      case "motor":
        return "🏃";
      case "cognitive":
        return "🧠";
      case "language":
        return "💬";
      case "social":
        return "👥";
      case "physical":
        return "📏";
      default:
        return "📋";
    }
  };

  const getCategoryName = (category: string) => {
    switch (category) {
      case "motor":
        return "Motor";
      case "cognitive":
        return "Cognitivo";
      case "language":
        return "Linguagem";
      case "social":
        return "Social";
      case "physical":
        return "Físico";
      default:
        return "Outros";
    }
  };

  const getDevelopmentStatus = (score: number) => {
    if (score >= 90) return { status: "Excelente", color: "growth-green", emoji: "🌟" };
    if (score >= 75) return { status: "Bom", color: "primary-blue", emoji: "✅" };
    if (score >= 60) return { status: "Atenção", color: "system-warning", emoji: "⚠️" };
    return { status: "Consulte Pediatra", color: "system-error", emoji: "🏥" };
  };

  return (
    <div className="mx-auto max-w-full px-4 sm:max-w-2xl md:max-w-4xl lg:max-w-6xl">
      <Breadcrumb>
        <BreadcrumbItem href="/">Início</BreadcrumbItem>
        <BreadcrumbItem href="/calculadoras">Calculadoras</BreadcrumbItem>
        <BreadcrumbItem href="/calculadoras/saude">Saúde</BreadcrumbItem>
        <BreadcrumbItem isLast>Desenvolvimento Infantil</BreadcrumbItem>
      </Breadcrumb>

      <div className="flex flex-col items-center space-y-6 sm:space-y-8">
        <header className="space-y-3 text-center sm:space-y-4">
          <h1 className="mb-3 text-2xl font-bold text-text-primary sm:mb-4 sm:text-3xl lg:text-4xl">
            <span className="hidden sm:inline">Calculadora de Desenvolvimento Infantil 👶</span>
            <span className="sm:hidden">Desenvolvimento Infantil 👶</span>
          </h1>
          <p className="mx-auto max-w-3xl px-4 text-sm text-text-secondary-dark sm:text-base lg:text-lg">
            Acompanhe o{" "}
            <strong className="text-primary-blue-dark">crescimento e desenvolvimento</strong> do seu
            bebê com nossa calculadora baseada em{" "}
            <strong className="text-growth-green">padrões médicos internacionais WHO/CDC</strong>.
            Avalie percentis de peso, altura e marcos de desenvolvimento.
          </p>
          <div className="inline-block rounded-lg bg-primary-blue-light p-3 duration-300 sm:p-4">
            <p className="text-xs font-medium text-text-primary sm:text-sm">
              ⚡ <strong>Percentis WHO/CDC</strong> • 🔬 <strong>Marcos de desenvolvimento</strong>{" "}
              • 📱 <strong>100% gratuito</strong>
            </p>
          </div>
        </header>

        <Card className="w-full max-w-full sm:max-w-2xl md:max-w-4xl lg:max-w-6xl">
          <CardHeader>
            <CardTitle as="h2">Dados para o Cálculo</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {/* Data de nascimento e sexo */}
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <Input
                    type="date"
                    label="Data de nascimento"
                    value={birthDate}
                    onChange={(e) => setBirthDate(e.target.value)}
                    required
                    fullWidth
                    className={errors.birthDate ? "border-system-error" : ""}
                    aria-describedby="birth-date-help"
                    aria-invalid={!!errors.birthDate}
                  />
                  <div id="birth-date-help" className="mt-1 text-xs text-text-secondary">
                    Data de nascimento da criança
                  </div>
                  {errors.birthDate && (
                    <div role="alert" className="mt-1 text-sm text-system-error">
                      {errors.birthDate}
                    </div>
                  )}
                </div>

                <div>
                  <Select
                    label="Sexo"
                    value={gender}
                    onChange={(value) => setGender(value as "male" | "female")}
                    options={[
                      { value: "male", label: "👦 Menino" },
                      { value: "female", label: "👧 Menina" },
                    ]}
                    fullWidth
                  />
                  <div className="mt-1 text-xs text-text-secondary">
                    Necessário para cálculos de percentil
                  </div>
                </div>
              </div>

              {/* Medidas atuais - seção principal */}
              <Card className="border-2 border-dashed border-primary-blue bg-primary-blue-light">
                <CardContent className="pt-6">
                  <h3 className="mb-4 text-center text-lg font-semibold text-text-primary">
                    📏 Medidas Atuais da Criança
                  </h3>

                  <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                    <div>
                      <Input
                        type="number"
                        label="Peso (kg)"
                        value={weight}
                        onChange={(e) => setWeight(e.target.value)}
                        placeholder="Ex: 10.5"
                        step="0.1"
                        min="0.5"
                        max="50"
                        required
                        fullWidth
                        className={errors.weight ? "border-system-error" : ""}
                        aria-describedby="weight-help"
                        aria-invalid={!!errors.weight}
                      />
                      <div id="weight-help" className="mt-1 text-xs text-text-secondary">
                        Peso atual em quilogramas
                      </div>
                      {errors.weight && (
                        <div role="alert" className="mt-1 text-sm text-system-error">
                          {errors.weight}
                        </div>
                      )}
                    </div>

                    <div>
                      <Input
                        type="number"
                        label="Altura (cm)"
                        value={height}
                        onChange={(e) => setHeight(e.target.value)}
                        placeholder="Ex: 75"
                        step="0.5"
                        min="30"
                        max="150"
                        required
                        fullWidth
                        className={errors.height ? "border-system-error" : ""}
                        aria-describedby="height-help"
                        aria-invalid={!!errors.height}
                      />
                      <div id="height-help" className="mt-1 text-xs text-text-secondary">
                        Altura atual em centímetros
                      </div>
                      {errors.height && (
                        <div role="alert" className="mt-1 text-sm text-system-error">
                          {errors.height}
                        </div>
                      )}
                    </div>

                    <div>
                      <Input
                        type="number"
                        label="Perímetro Cefálico (cm)"
                        value={headCircumference}
                        onChange={(e) => setHeadCircumference(e.target.value)}
                        placeholder="Ex: 45"
                        step="0.5"
                        min="25"
                        max="60"
                        fullWidth
                        className={errors.headCircumference ? "border-system-error" : ""}
                        aria-describedby="head-help"
                        aria-invalid={!!errors.headCircumference}
                      />
                      <div id="head-help" className="mt-1 text-xs text-text-secondary">
                        Obrigatório até 2 anos
                      </div>
                      {errors.headCircumference && (
                        <div role="alert" className="mt-1 text-sm text-system-error">
                          {errors.headCircumference}
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Altura dos pais para previsão */}
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <Input
                    type="number"
                    label="Altura da Mãe (cm)"
                    value={motherHeight}
                    onChange={(e) => setMotherHeight(e.target.value)}
                    placeholder="Ex: 165"
                    step="1"
                    min="120"
                    max="220"
                    fullWidth
                    className={errors.motherHeight ? "border-system-error" : ""}
                    aria-describedby="mother-height-help"
                    aria-invalid={!!errors.motherHeight}
                  />
                  <div id="mother-height-help" className="mt-1 text-xs text-text-secondary">
                    Opcional - para previsão de altura adulta
                  </div>
                  {errors.motherHeight && (
                    <div role="alert" className="mt-1 text-sm text-system-error">
                      {errors.motherHeight}
                    </div>
                  )}
                </div>

                <div>
                  <Input
                    type="number"
                    label="Altura do Pai (cm)"
                    value={fatherHeight}
                    onChange={(e) => setFatherHeight(e.target.value)}
                    placeholder="Ex: 180"
                    step="1"
                    min="120"
                    max="220"
                    fullWidth
                    className={errors.fatherHeight ? "border-system-error" : ""}
                    aria-describedby="father-height-help"
                    aria-invalid={!!errors.fatherHeight}
                  />
                  <div id="father-height-help" className="mt-1 text-xs text-text-secondary">
                    Opcional - para previsão de altura adulta
                  </div>
                  {errors.fatherHeight && (
                    <div role="alert" className="mt-1 text-sm text-system-error">
                      {errors.fatherHeight}
                    </div>
                  )}
                </div>
              </div>

              {/* Dados de prematuridade */}
              <div className="mx-auto max-w-lg">
                <h3 className="mb-3 text-center text-sm font-semibold text-text-primary">
                  Criança prematura?
                </h3>
                <div className="flex overflow-hidden rounded-lg border border-neutral-surface-variant">
                  <button
                    type="button"
                    onClick={() => setIsPremature(false)}
                    className={`flex-1 px-4 py-3 text-sm font-medium transition-all duration-200 ${
                      !isPremature
                        ? "bg-blue-500 text-white shadow-md"
                        : "bg-neutral-surface text-text-secondary hover:bg-primary-blue/10"
                    }`}
                  >
                    👶 Não (≥ 37 semanas)
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsPremature(true)}
                    className={`flex-1 px-4 py-3 text-sm font-medium transition-all duration-200 ${
                      isPremature
                        ? "bg-orange-500 text-white shadow-md"
                        : "bg-neutral-surface text-text-secondary hover:bg-system-warning/10"
                    }`}
                  >
                    🍼 Sim (&lt; 37 semanas)
                  </button>
                </div>
              </div>

              {isPremature && (
                <div className="mx-auto max-w-xs">
                  <Input
                    type="number"
                    label="Semanas de gestação"
                    value={gestationalWeeks}
                    onChange={(e) => setGestationalWeeks(e.target.value)}
                    placeholder="Ex: 34"
                    min="24"
                    max="42"
                    step="1"
                    required
                    fullWidth
                  />
                  <p className="mt-1 text-center text-xs text-text-secondary">
                    Semanas de gestação ao nascer
                  </p>
                </div>
              )}

              <div className="rounded-lg border border-system-info/20 bg-system-info/10 p-4">
                <h3 className="mb-2 font-semibold text-system-info">💡 Como usar a calculadora</h3>
                <ul className="space-y-1 text-sm text-text-secondary">
                  <li>
                    • <strong>Percentis WHO/CDC:</strong> Compare crescimento com padrões mundiais
                  </li>
                  <li>
                    • <strong>Marcos interativos:</strong> Marque os marcos que a criança já
                    alcançou
                  </li>
                  <li>
                    • <strong>Previsão de altura:</strong> Altura adulta estimada pelos pais
                  </li>
                  <li>
                    • <strong>Gráficos visuais:</strong> Curvas de crescimento personalizadas
                  </li>
                  <li>
                    • <strong>Idade corrigida:</strong> Ajustes automáticos para prematuros
                  </li>
                </ul>
              </div>

              {errors.general && (
                <div
                  role="alert"
                  className="mx-auto max-w-md rounded-lg border border-system-error bg-system-error/10 p-4 text-center text-sm text-system-error"
                >
                  {errors.general}
                </div>
              )}

              <div className="flex flex-col justify-center gap-4 sm:flex-row">
                <Button
                  onClick={handleCalculate}
                  disabled={isCalculating}
                  className="w-full bg-primary-blue px-8 py-3 text-white transition-all duration-200 hover:bg-primary-blue-dark disabled:opacity-50 sm:w-auto"
                >
                  {isCalculating ? "Calculando..." : "Calcular"}
                </Button>
                <Button
                  onClick={handleReset}
                  variant="outline"
                  disabled={isCalculating}
                  className="border-system-error px-8 text-system-error hover:bg-system-error hover:text-white"
                >
                  Limpar
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {result && percentilesResult && (
          <div className="w-full max-w-full space-y-6 sm:max-w-2xl md:max-w-4xl lg:max-w-6xl">
            {/* Resultados Principais */}
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
              <Card className="border-l-4 border-primary-blue bg-primary-blue/10 lg:col-span-1">
                <CardHeader>
                  <CardTitle as="h3" className="text-primary-blue">
                    📊 Peso
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-center">
                    <div className="text-2xl font-bold text-primary-blue">
                      P{percentilesResult.weightPercentile}
                    </div>
                    <p className="text-sm text-text-secondary">{percentilesResult.weightStatus}</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-growth-green bg-growth-green/10 lg:col-span-1">
                <CardHeader>
                  <CardTitle as="h3" className="text-growth-green">
                    📏 Altura
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-center">
                    <div className="text-2xl font-bold text-growth-green">
                      P{percentilesResult.heightPercentile}
                    </div>
                    <p className="text-sm text-text-secondary">{percentilesResult.heightStatus}</p>
                  </div>
                </CardContent>
              </Card>

              {percentilesResult.headCircumferencePercentile && (
                <Card className="border-l-4 border-system-info bg-system-info/10 lg:col-span-1">
                  <CardHeader>
                    <CardTitle as="h3" className="text-system-info">
                      🧠 Perímetro Cefálico
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-center">
                      <div className="text-2xl font-bold text-system-info">
                        P{percentilesResult.headCircumferencePercentile}
                      </div>
                      <p className="text-sm text-text-secondary">
                        {percentilesResult.headCircumferenceStatus}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Previsão de Altura Adulta */}
            {percentilesResult.adultHeightPrediction && (
              <Card className="w-full max-w-full border-l-4 border-math-purple bg-math-purple-light sm:max-w-2xl md:max-w-4xl lg:max-w-6xl">
                <CardHeader>
                  <CardTitle as="h3" className="text-center text-math-purple">
                    🎯 Previsão de Altura Adulta
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4 text-center">
                    <div className="text-3xl font-bold text-math-purple">
                      {percentilesResult.adultHeightPrediction.target.toFixed(0)} cm
                    </div>
                    <p className="text-sm text-text-secondary">
                      Faixa prevista: {percentilesResult.adultHeightPrediction.range.min.toFixed(0)}{" "}
                      - {percentilesResult.adultHeightPrediction.range.max.toFixed(0)} cm
                    </p>
                    <p className="text-xs text-text-secondary">
                      {percentilesResult.adultHeightPrediction.method}
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Seção de Gráficos de Crescimento */}
            <Card className="w-full max-w-full sm:max-w-2xl md:max-w-4xl lg:max-w-6xl">
              <CardHeader>
                <CardTitle as="h2" className="text-xl font-bold text-text-primary">
                  📈 Curvas de Crescimento WHO/CDC
                </CardTitle>
                <p className="text-sm text-text-secondary">
                  Gráficos baseados nos padrões internacionais de crescimento
                </p>
              </CardHeader>
              <CardContent>
                <div className="space-y-8">
                  {/* Gráfico de Peso */}
                  <div>
                    <GrowthChart
                      title="Peso por Idade"
                      chartData={percentilesResult.chartData.weightChart}
                      childPosition={percentilesResult.chartData.childPosition.weight}
                      unit="Peso (kg)"
                      color="#3b82f6"
                      height={350}
                    />
                    <div className="mt-3 text-center">
                      <p className="text-sm text-text-secondary">
                        <strong>Peso atual:</strong> {weight}kg |
                        <strong className="mx-2">Percentil:</strong> P
                        {percentilesResult.weightPercentile} |
                        <strong className="mx-2">Status:</strong> {percentilesResult.weightStatus}
                      </p>
                    </div>
                  </div>

                  {/* Gráfico de Altura */}
                  <div>
                    <GrowthChart
                      title="Altura por Idade"
                      chartData={percentilesResult.chartData.heightChart}
                      childPosition={percentilesResult.chartData.childPosition.height}
                      unit="Altura (cm)"
                      color="#8b5cf6"
                      height={350}
                    />
                    <div className="mt-3 text-center">
                      <p className="text-sm text-text-secondary">
                        <strong>Altura atual:</strong> {height}cm |
                        <strong className="mx-2">Percentil:</strong> P
                        {percentilesResult.heightPercentile} |
                        <strong className="mx-2">Status:</strong> {percentilesResult.heightStatus}
                      </p>
                    </div>
                  </div>

                  {/* Gráfico de Perímetro Cefálico */}
                  {percentilesResult.chartData.headCircumferenceChart &&
                    percentilesResult.chartData.childPosition.headCircumference && (
                      <div>
                        <GrowthChart
                          title="Perímetro Cefálico por Idade"
                          chartData={percentilesResult.chartData.headCircumferenceChart}
                          childPosition={
                            percentilesResult.chartData.childPosition.headCircumference
                          }
                          unit="Perímetro (cm)"
                          color="#ec4899"
                          height={350}
                        />
                        <div className="mt-3 text-center">
                          <p className="text-sm text-text-secondary">
                            <strong>Perímetro atual:</strong> {headCircumference}cm |
                            <strong className="mx-2">Percentil:</strong> P
                            {percentilesResult.headCircumferencePercentile} |
                            <strong className="mx-2">Status:</strong>{" "}
                            {percentilesResult.headCircumferenceStatus}
                          </p>
                        </div>
                      </div>
                    )}
                </div>
              </CardContent>
            </Card>

            {/* Status Nutricional */}
            <Card className="w-full max-w-full border-l-4 border-growth-green bg-growth-green/10 sm:max-w-2xl md:max-w-4xl lg:max-w-6xl">
              <CardHeader>
                <CardTitle as="h3" className="text-center text-growth-green">
                  🍎 Status Nutricional
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 text-center">
                  <div className="text-2xl font-bold text-growth-green">
                    {percentilesResult.nutritionalStatus.classification}
                  </div>
                  {percentilesResult.nutritionalStatus.bmi && (
                    <p className="text-sm text-text-secondary">
                      IMC: {percentilesResult.nutritionalStatus.bmi}
                    </p>
                  )}
                  <p className="text-sm text-text-secondary">
                    <strong>Recomendação:</strong>{" "}
                    {percentilesResult.nutritionalStatus.recommendation}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Marcos de Desenvolvimento */}
        {result && (
          <div className="w-full max-w-full space-y-6 sm:max-w-2xl md:max-w-4xl lg:max-w-6xl">
            {/* Resumo da idade e desenvolvimento */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card className="border-l-4 border-primary-blue bg-primary-blue/10">
                <CardHeader>
                  <CardTitle as="h3" className="text-lg text-primary-blue-dark">
                    👶 Idade Atual
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-1 text-center">
                    <div className="text-lg font-semibold text-text-primary">
                      {formatAge(result.ageInMonths)}
                    </div>
                    <div className="text-sm text-text-secondary">{result.ageInWeeks} semanas</div>
                    {result.correctedAge !== undefined && (
                      <div className="text-xs text-system-warning">
                        Idade corrigida: {formatAge(result.correctedAge)}
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              <Card
                className={`bg-${getDevelopmentStatus(result.developmentScore).color}/10${getDevelopmentStatus(result.developmentScore).color}-dark/10 border-l-4 border-${getDevelopmentStatus(result.developmentScore).color}${getDevelopmentStatus(result.developmentScore).color}-dark`}
              >
                <CardHeader>
                  <CardTitle
                    as="h3"
                    className={`text-${getDevelopmentStatus(result.developmentScore).color}${getDevelopmentStatus(result.developmentScore).color}-dark text-lg`}
                  >
                    {getDevelopmentStatus(result.developmentScore).emoji} Score Desenvolvimento
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-1 text-center">
                    <div
                      className={`text-2xl font-bold text-${getDevelopmentStatus(result.developmentScore).color}${getDevelopmentStatus(result.developmentScore).color}-dark`}
                    >
                      {result.developmentScore}%
                    </div>
                    <div
                      className={`text-sm text-${getDevelopmentStatus(result.developmentScore).color}${getDevelopmentStatus(result.developmentScore).color}-dark font-medium`}
                    >
                      {getDevelopmentStatus(result.developmentScore).status}
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-growth-green bg-growth-green/10">
                <CardHeader>
                  <CardTitle as="h3" className="text-lg text-growth-green">
                    🎯 Marcos Atuais
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-1 text-center">
                    <div className="text-2xl font-bold text-text-primary">
                      {result.currentMilestones.length}
                    </div>
                    <div className="text-sm text-growth-green">marcos para sua idade</div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-system-info bg-system-info/10">
                <CardHeader>
                  <CardTitle as="h3" className="text-lg text-system-info">
                    🏥 Próxima Consulta
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-1 text-center">
                    <div className="text-sm font-semibold text-text-primary">
                      {formatDate(result.nextCheckupDate)}
                    </div>
                    <div className="text-xs text-system-info">consulta pediátrica</div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Progresso por categoria */}
            <Card>
              <CardHeader>
                <CardTitle as="h3">📊 Progresso por Área de Desenvolvimento</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
                  {Object.entries(result.categories).map(([key, category]) => (
                    <div
                      key={key}
                      className={`rounded-lg border p-4 border-${getCategoryColor(key)}/20${getCategoryColor(key)}-dark/20 bg-${getCategoryColor(key)}/5${getCategoryColor(key)}-dark/5`}
                    >
                      <div className="mb-2 flex items-center justify-between">
                        <h4
                          className={`font-semibold text-${getCategoryColor(key)}${getCategoryColor(key)}-dark flex items-center`}
                        >
                          {getCategoryEmoji(key)}{" "}
                          <span className="ml-2">{getCategoryName(key)}</span>
                        </h4>
                        <span
                          className={`text-lg font-bold text-${getCategoryColor(key)}${getCategoryColor(key)}-dark`}
                        >
                          {category.percentage}%
                        </span>
                      </div>
                      <div className="text-xs text-text-secondary">
                        {category.achieved}/{category.total} marcos
                      </div>
                      <div className="mt-2 h-2 rounded-full bg-light">
                        <div
                          className={`h-2 rounded-full bg-${getCategoryColor(key)}${getCategoryColor(key)}-dark transition-all duration-300`}
                          style={{ width: `${category.percentage}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Marcos atuais - Interativos */}
            {result.currentMilestones.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle as="h3">
                    🎯 Marcos para sua Idade ({formatAge(result.correctedAge || result.ageInMonths)}
                    )
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {result.currentMilestones.map((milestone) => (
                      <div
                        key={milestone.id}
                        className={`cursor-pointer rounded-lg border-2 p-4 transition-all duration-200 ${
                          completedMilestones.has(milestone.id)
                            ? `border-growth-green bg-growth-green/10`
                            : `bg-background border-light hover:border-${getCategoryColor(milestone.category)}/50 ${getCategoryColor(milestone.category)}-dark/50`
                        }`}
                        onClick={() => toggleMilestone(milestone.id)}
                      >
                        <div className="flex items-start space-x-3">
                          <div
                            className={`mt-1 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full border-2 ${
                              completedMilestones.has(milestone.id)
                                ? "border-growth-green bg-growth-green"
                                : "border-neutral-surface-variant"
                            }`}
                          >
                            {completedMilestones.has(milestone.id) && (
                              <span className="text-xs text-white">✓</span>
                            )}
                          </div>
                          <div className="flex-1">
                            <div className="mb-1 flex items-center space-x-2">
                              <h4 className="font-semibold text-text-primary">{milestone.title}</h4>
                              <span
                                className={`rounded px-2 py-1 text-xs font-medium text-${getCategoryColor(milestone.category)}${getCategoryColor(milestone.category)}-dark bg-${getCategoryColor(milestone.category)}/10${getCategoryColor(milestone.category)}-dark/10`}
                              >
                                {getCategoryEmoji(milestone.category)}{" "}
                                {getCategoryName(milestone.category)}
                              </span>
                              {milestone.priority === "high" && (
                                <span className="rounded bg-system-error/10 px-2 py-1 text-xs font-medium text-system-error-dark">
                                  🚨 Importante
                                </span>
                              )}
                            </div>
                            <p className="text-sm text-text-secondary">{milestone.description}</p>
                            <p className="mt-1 text-xs text-text-secondary">
                              Idade esperada: {formatAge(milestone.expectedAgeMonths)}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 text-center">
                    <p className="text-sm text-text-secondary">
                      💡 <strong>Dica:</strong> Clique nos marcos para marcar como alcançados
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Próximos marcos */}
            {result.upcomingMilestones.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle as="h3">⏳ Próximos Marcos de Desenvolvimento</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    {result.upcomingMilestones.map((milestone) => (
                      <div
                        key={milestone.id}
                        className="bg-background rounded-lg border border-neutral-surface-variant p-4"
                      >
                        <div className="mb-2 flex items-center space-x-2">
                          <h4 className="font-semibold text-text-primary">{milestone.title}</h4>
                          <span
                            className={`rounded px-2 py-1 text-xs font-medium text-${getCategoryColor(milestone.category)}${getCategoryColor(milestone.category)}-dark bg-${getCategoryColor(milestone.category)}/10${getCategoryColor(milestone.category)}-dark/10`}
                          >
                            {getCategoryEmoji(milestone.category)}{" "}
                            {getCategoryName(milestone.category)}
                          </span>
                        </div>
                        <p className="mb-2 text-sm text-text-secondary">{milestone.description}</p>
                        <p className="text-xs text-system-info">
                          📅 Previsto para: {formatAge(milestone.expectedAgeMonths)}
                        </p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Marcos em atraso - se houver */}
            {result.overdueMilestones.length > 0 && (
              <Card className="border-l-4 border-system-warning bg-system-warning/10">
                <CardHeader>
                  <CardTitle as="h3" className="text-system-warning">
                    ⚠️ Marcos que Merecem Atenção
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {result.overdueMilestones.map((milestone) => (
                      <div
                        key={milestone.id}
                        className="bg-system-warning/5/5 rounded-lg border border-system-warning/20 p-4"
                      >
                        <div className="mb-2 flex items-center space-x-2">
                          <h4 className="font-semibold text-text-primary">{milestone.title}</h4>
                          <span
                            className={`rounded px-2 py-1 text-xs font-medium text-${getCategoryColor(milestone.category)}${getCategoryColor(milestone.category)}-dark bg-${getCategoryColor(milestone.category)}/10${getCategoryColor(milestone.category)}-dark/10`}
                          >
                            {getCategoryEmoji(milestone.category)}{" "}
                            {getCategoryName(milestone.category)}
                          </span>
                        </div>
                        <p className="mb-2 text-sm text-text-secondary">{milestone.description}</p>
                        <p className="text-xs text-system-warning">
                          Era esperado aos: {formatAge(milestone.expectedAgeMonths)}
                        </p>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 rounded-lg border border-system-info/20 bg-system-info/10 p-3">
                    <p className="text-sm text-system-info">
                      <strong>💡 Importante:</strong> Cada bebê se desenvolve em seu próprio ritmo.
                      Se você tem preocupações, consulte seu pediatra para uma avaliação
                      individualizada.
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        )}

        {/* Seção: Entendendo Percentis de Crescimento */}
        <Card className="border-l-4 border-math-purple bg-math-purple-light duration-300">
          <CardHeader>
            <CardTitle as="h2" className="text-xl font-bold text-text-primary">
              📊 Entendendo os Percentis de Crescimento WHO/CDC
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <p className="text-text-primary">
                Os <strong className="text-math-purple">percentis de crescimento</strong> são a
                ferramenta mais importante para avaliar se uma criança está crescendo adequadamente.
                Nossa calculadora utiliza os padrões oficiais da{" "}
                <strong>Organização Mundial da Saúde (WHO)</strong> e{" "}
                <strong>Centers for Disease Control (CDC)</strong>.
              </p>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="rounded-lg border border-system-info/20 bg-system-info/10 p-4">
                  <h4 className="mb-3 flex items-center font-semibold text-system-info">
                    🌍 <span className="ml-2">Padrões WHO (0-24 meses)</span>
                  </h4>
                  <ul className="space-y-2 text-sm text-text-secondary">
                    <li>
                      • <strong>Base de dados:</strong> Estudo multicêntrico com 8.440 crianças
                    </li>
                    <li>
                      • <strong>Países:</strong> Brasil, Ghana, Índia, Noruega, Omã e EUA
                    </li>
                    <li>
                      • <strong>Critérios:</strong> Crianças saudáveis, amamentadas, sem restrições
                    </li>
                    <li>
                      • <strong>Diferencial:</strong> Representa o potencial de crescimento ótimo
                    </li>
                    <li>
                      • <strong>Atualização:</strong> Última revisão em 2006
                    </li>
                  </ul>
                  <div className="mt-3 rounded bg-system-info/10 p-2 text-xs text-system-info">
                    <strong>Por que WHO?</strong> Padrão-ouro internacional que considera a
                    diversidade genética e mostra como as crianças DEVEM crescer em condições
                    ideais.
                  </div>
                </div>

                <div className="rounded-lg border border-growth-green/20 bg-growth-green-soft p-4">
                  <h4 className="mb-3 flex items-center font-semibold text-growth-green">
                    🇺🇸 <span className="ml-2">Referências CDC (2-5 anos)</span>
                  </h4>
                  <ul className="space-y-2 text-sm text-text-secondary">
                    <li>
                      • <strong>Base de dados:</strong> National Health and Nutrition Examination
                      Survey
                    </li>
                    <li>
                      • <strong>População:</strong> Crianças americanas representativas
                    </li>
                    <li>
                      • <strong>Método:</strong> Suavização LMS (Lambda-Mu-Sigma)
                    </li>
                    <li>
                      • <strong>Aplicação:</strong> Pré-escolares e escolares
                    </li>
                    <li>
                      • <strong>Complemento:</strong> Continuidade após padrões WHO
                    </li>
                  </ul>
                  <div className="mt-3 rounded bg-growth-green/10 p-2 text-xs text-growth-green">
                    <strong>Transição:</strong> Aos 24 meses mudamos para CDC mantendo continuidade
                    nas avaliações de crescimento.
                  </div>
                </div>
              </div>

              <div className="rounded-lg border border-system-warning/20 bg-system-warning/10 p-4">
                <h4 className="mb-3 font-semibold text-system-warning">
                  🎯 Como Interpretar os Percentis
                </h4>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-system-error">P3</div>
                    <div className="text-sm text-text-secondary">
                      Apenas 3% das crianças estão abaixo
                    </div>
                    <div className="mt-1 text-xs text-system-error">⚠️ Merece atenção médica</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-growth-green">P50</div>
                    <div className="text-sm text-text-secondary">
                      Mediana - 50% acima, 50% abaixo
                    </div>
                    <div className="mt-1 text-xs text-growth-green">✅ Valor típico/esperado</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-system-error">P97</div>
                    <div className="text-sm text-text-secondary">
                      Apenas 3% das crianças estão acima
                    </div>
                    <div className="mt-1 text-xs text-system-error">
                      ⚠️ Pode necessitar avaliação
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-lg border border-math-purple/20 bg-math-purple-light p-4">
                <h4 className="mb-3 font-semibold text-math-purple">
                  📈 Fórmula de Previsão de Altura Adulta
                </h4>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div>
                    <h5 className="font-medium text-text-primary">Para Meninos:</h5>
                    <div className="mt-1 rounded border border-neutral-surface-variant bg-background-dark-secondary p-2 font-mono text-sm text-text-secondary">
                      (Altura Mãe + Altura Pai + 13cm) ÷ 2
                    </div>
                    <div className="mt-1 text-xs text-math-purple">
                      Margem de erro: ±8,5cm (95% das crianças)
                    </div>
                  </div>
                  <div>
                    <h5 className="font-medium text-text-primary">Para Meninas:</h5>
                    <div className="mt-1 rounded border border-neutral-surface-variant bg-background-dark-secondary p-2 font-mono text-sm text-text-secondary">
                      (Altura Mãe + Altura Pai - 13cm) ÷ 2
                    </div>
                    <div className="mt-1 text-xs text-math-purple">
                      Considera diferenças hormonais entre sexos
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-lg border border-system-info/20 bg-system-info/10 p-4">
                <h4 className="mb-2 font-semibold text-system-info">
                  🧮 Algoritmo de Interpolação
                </h4>
                <p className="mb-3 text-sm text-text-secondary">
                  Nossa calculadora usa <strong>interpolação linear avançada</strong> para calcular
                  percentis precisos em qualquer idade:
                </p>
                <div className="grid grid-cols-1 gap-3 text-xs text-system-info md:grid-cols-2">
                  <div>
                    <strong>1. Localização:</strong> Encontra os dois pontos de dados mais próximos
                    da idade da criança
                  </div>
                  <div>
                    <strong>2. Interpolação:</strong> Calcula valores intermediários
                    proporcionalmente
                  </div>
                  <div>
                    <strong>3. Percentil:</strong> Determina onde a medida da criança se posiciona
                  </div>
                  <div>
                    <strong>4. Validação:</strong> Aplica limites de 1-99% para resultados realistas
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Seção: Métodos de Avaliação do Desenvolvimento Infantil */}
        <Card className="border-l-4 border-system-info bg-system-info/10 duration-300">
          <CardHeader>
            <CardTitle as="h2" className="text-xl font-bold text-text-primary">
              🔬 Métodos Científicos de Avaliação do Desenvolvimento Infantil
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <p className="text-text-primary">
                Nossa calculadora combina diferentes{" "}
                <strong className="text-system-info">métodos científicos reconhecidos</strong> para
                oferecer uma avaliação abrangente do desenvolvimento infantil. Entenda cada método
                utilizado:
              </p>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="bg-primary-blue/5/5 rounded-lg border border-primary-blue/20 p-4">
                  <h4 className="mb-3 flex items-center font-semibold text-primary-blue-dark">
                    📋 <span className="ml-2">Escala de Marcos Desenvolvimentais</span>
                  </h4>
                  <ul className="space-y-2 text-sm text-text-secondary">
                    <li>
                      • <strong>Baseado em:</strong> Academia Americana de Pediatria (AAP)
                    </li>
                    <li>
                      • <strong>Referência:</strong> Sociedade Brasileira de Pediatria (SBP)
                    </li>
                    <li>
                      • <strong>Metodologia:</strong> Marcos padronizados por idade
                    </li>
                    <li>
                      • <strong>Precisão:</strong> 95% de confiabilidade para população geral
                    </li>
                    <li>
                      • <strong>Categorias:</strong> Motor, Cognitivo, Linguagem, Social
                    </li>
                  </ul>
                  <div className="mt-3 rounded bg-primary-blue/10 p-2 text-xs text-primary-blue-dark">
                    <strong>Vantagens:</strong> Padronização internacional, fácil aplicação,
                    monitoramento longitudinal
                  </div>
                </div>

                <div className="bg-growth-green/5/5 rounded-lg border border-growth-green/20 p-4">
                  <h4 className="mb-3 flex items-center font-semibold text-growth-green">
                    ⏱️ <span className="ml-2">Idade Corrigida para Prematuros</span>
                  </h4>
                  <ul className="space-y-2 text-sm text-text-secondary">
                    <li>
                      • <strong>Cálculo:</strong> Semanas de prematuridade descontadas
                    </li>
                    <li>
                      • <strong>Aplicação:</strong> Bebês nascidos &lt; 37 semanas
                    </li>
                    <li>
                      • <strong>Período:</strong> Até 24 meses de idade cronológica
                    </li>
                    <li>
                      • <strong>Precisão:</strong> Ajuste baseado em evidências científicas
                    </li>
                    <li>
                      • <strong>Importância:</strong> Expectativas realistas de desenvolvimento
                    </li>
                  </ul>
                  <div className="mt-3 rounded bg-growth-green/10 p-2 text-xs text-growth-green">
                    <strong>Exemplo:</strong> Bebê de 6 meses nascido com 32 semanas usa idade
                    corrigida de 4 meses
                  </div>
                </div>

                <div className="bg-system-warning/5/5 rounded-lg border border-system-warning/20 p-4">
                  <h4 className="mb-3 flex items-center font-semibold text-system-warning">
                    📊 <span className="ml-2">Sistema de Pontuação Ponderada</span>
                  </h4>
                  <ul className="space-y-2 text-sm text-text-secondary">
                    <li>
                      • <strong>Prioridade Alta:</strong> Marcos críticos (peso 3x)
                    </li>
                    <li>
                      • <strong>Prioridade Média:</strong> Marcos importantes (peso 2x)
                    </li>
                    <li>
                      • <strong>Prioridade Baixa:</strong> Marcos complementares (peso 1x)
                    </li>
                    <li>
                      • <strong>Tolerância:</strong> Variação por categoria de prioridade
                    </li>
                    <li>
                      • <strong>Score Final:</strong> Percentual ponderado de desenvolvimento
                    </li>
                  </ul>
                  <div className="mt-3 rounded bg-system-warning/10 p-2 text-xs text-system-warning">
                    <strong>Benefício:</strong> Identifica rapidamente marcos que necessitam atenção
                    especial
                  </div>
                </div>

                <div className="bg-system-info/5/5 rounded-lg border border-system-info/20 p-4">
                  <h4 className="mb-3 flex items-center font-semibold text-system-info">
                    🎯 <span className="ml-2">Análise Multidimensional</span>
                  </h4>
                  <ul className="space-y-2 text-sm text-text-secondary">
                    <li>
                      • <strong>4 Domínios:</strong> Análise separada por área
                    </li>
                    <li>
                      • <strong>Progresso Individual:</strong> Percentual por categoria
                    </li>
                    <li>
                      • <strong>Identificação Precoce:</strong> Atrasos específicos
                    </li>
                    <li>
                      • <strong>Intervenção Dirigida:</strong> Foco nas áreas necessárias
                    </li>
                    <li>
                      • <strong>Acompanhamento:</strong> Evolução temporal do progresso
                    </li>
                  </ul>
                  <div className="mt-3 rounded bg-system-info/10 p-2 text-xs text-system-info">
                    <strong>Diferencial:</strong> Visão holística e específica simultaneamente
                  </div>
                </div>
              </div>

              <div className="rounded-lg border border-growth-green/20 bg-growth-green/10 p-4">
                <h4 className="mb-2 font-semibold text-growth-green">
                  🏆 Por que Nossa Metodologia se Destaca?
                </h4>
                <div className="grid grid-cols-1 gap-4 text-sm text-text-secondary md:grid-cols-3">
                  <div>
                    <strong className="text-growth-green">1. Precisão Científica</strong>
                    <p>
                      Baseada nas diretrizes mais atuais da pediatria mundial, com marcos validados
                      por pesquisas longitudinais.
                    </p>
                  </div>
                  <div>
                    <strong className="text-growth-green">2. Personalização Total</strong>
                    <p>
                      Considera prematuridade, prioridades de marcos e oferece análise
                      individualizada por área de desenvolvimento.
                    </p>
                  </div>
                  <div>
                    <strong className="text-growth-green">3. Interatividade Única</strong>
                    <p>
                      Interface que permite acompanhamento dinâmico, marcação de conquistas e
                      visualização do progresso em tempo real.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Seção: O que é desenvolvimento infantil */}
        <Card className="border-l-4 border-growth-green bg-growth-green-soft duration-300">
          <CardHeader>
            <CardTitle as="h2" className="text-xl font-bold text-text-primary">
              🌱 O que é Desenvolvimento Infantil?
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 text-text-primary">
              <p>
                O <strong className="text-growth-green">desenvolvimento infantil</strong> é o
                processo contínuo de mudanças físicas, cognitivas, emocionais e sociais que ocorrem
                nos primeiros anos de vida. É fundamental acompanhar os marcos de desenvolvimento
                para identificar precocemente qualquer necessidade de intervenção.
              </p>
              <p>
                Os marcos são habilidades que a maioria das crianças desenvolve em idades
                específicas. Eles servem como{" "}
                <strong className="text-primary-blue-dark">guias gerais</strong>, mas é importante
                lembrar que cada criança é única e pode alcançar esses marcos em momentos
                diferentes.
              </p>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <h4 className="mb-2 font-semibold text-growth-green">
                    🧠 Áreas de Desenvolvimento
                  </h4>
                  <ul className="space-y-1 text-sm text-text-secondary">
                    <li>
                      • <strong>Motor:</strong> Movimentos e coordenação física
                    </li>
                    <li>
                      • <strong>Cognitivo:</strong> Pensamento, aprendizado e resolução de problemas
                    </li>
                    <li>
                      • <strong>Linguagem:</strong> Comunicação e compreensão
                    </li>
                    <li>
                      • <strong>Social:</strong> Interação e relacionamentos
                    </li>
                  </ul>
                </div>

                <div>
                  <h4 className="mb-2 font-semibold text-primary-blue-dark">
                    📅 Importância do Acompanhamento
                  </h4>
                  <ul className="space-y-1 text-sm text-text-secondary">
                    <li>• Identificação precoce de atrasos</li>
                    <li>• Orientação para estímulos adequados</li>
                    <li>• Tranquilidade para os pais</li>
                    <li>• Cronograma de consultas pediátricas</li>
                  </ul>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Seção: Inovações diferenciais */}
        <Card className="border-l-4 border-primary-blue bg-primary-blue-light duration-300">
          <CardHeader>
            <CardTitle as="h2" className="text-xl font-bold text-text-primary">
              🚀 Recursos Exclusivos da Nossa Calculadora
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div>
                <h4 className="mb-3 flex items-center font-semibold text-primary-blue-dark">
                  ✅ <span className="ml-2">Marcos Interativos</span>
                </h4>
                <ul className="space-y-2 text-sm text-text-secondary">
                  <li>
                    • <strong>Check-list dinâmico:</strong> Marque marcos alcançados em tempo real
                  </li>
                  <li>
                    • <strong>Progresso visual:</strong> Acompanhe o desenvolvimento por categorias
                  </li>
                  <li>
                    • <strong>Priorização:</strong> Marcos críticos destacados
                  </li>
                  <li>
                    • <strong>Histórico:</strong> Registre quando cada marco foi atingido
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="mb-3 flex items-center font-semibold text-growth-green">
                  👶 <span className="ml-2">Suporte a Prematuros</span>
                </h4>
                <ul className="space-y-2 text-sm text-text-secondary">
                  <li>
                    • <strong>Idade corrigida:</strong> Cálculo automático para prematuros
                  </li>
                  <li>
                    • <strong>Marcos ajustados:</strong> Expectativas realistas baseadas na idade
                    corrigida
                  </li>
                  <li>
                    • <strong>Acompanhamento especializado:</strong> Cronograma específico de
                    consultas
                  </li>
                  <li>
                    • <strong>Tolerância personalizada:</strong> Consideração da prematuridade nos
                    prazos
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="mb-3 flex items-center font-semibold text-system-info">
                  📊 <span className="ml-2">Analytics Avançados</span>
                </h4>
                <ul className="space-y-2 text-sm text-text-secondary">
                  <li>
                    • <strong>Score de desenvolvimento:</strong> Avaliação percentual geral
                  </li>
                  <li>
                    • <strong>Análise por categoria:</strong> Progresso detalhado por área
                  </li>
                  <li>
                    • <strong>Alertas inteligentes:</strong> Identificação de marcos em atraso
                  </li>
                  <li>
                    • <strong>Tendências:</strong> Visualização do progresso ao longo do tempo
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="mb-3 flex items-center font-semibold text-system-warning">
                  🏥 <span className="ml-2">Cronograma Médico</span>
                </h4>
                <ul className="space-y-2 text-sm text-text-secondary">
                  <li>
                    • <strong>Consultas automáticas:</strong> Sugestão de datas por faixa etária
                  </li>
                  <li>
                    • <strong>Lembretes importantes:</strong> Vacinas e exames por idade
                  </li>
                  <li>
                    • <strong>Preparação:</strong> O que esperar em cada consulta
                  </li>
                  <li>
                    • <strong>Perguntas sugeridas:</strong> Para discutir com o pediatra
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Seção: Como estimular o desenvolvimento */}
        <Card className="border-l-4 border-system-info bg-system-info/10 duration-300">
          <CardHeader>
            <CardTitle as="h2" className="text-xl font-bold text-text-primary">
              🎯 Como Estimular o Desenvolvimento do Bebê
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div>
                <h4 className="mb-3 flex items-center font-semibold text-primary-blue-dark">
                  🏃 <span className="ml-2">Desenvolvimento Motor</span>
                </h4>
                <ul className="space-y-2 text-sm text-text-secondary">
                  <li>
                    • <strong>Tummy time:</strong> Tempo de barriga para baixo supervisionado
                  </li>
                  <li>
                    • <strong>Brinquedos texturizados:</strong> Diferentes materiais para explorar
                  </li>
                  <li>
                    • <strong>Espaço seguro:</strong> Ambiente livre para movimentação
                  </li>
                  <li>
                    • <strong>Brincadeiras físicas:</strong> Puxar para sentar, rolar
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="mb-3 flex items-center font-semibold text-growth-green">
                  🧠 <span className="ml-2">Desenvolvimento Cognitivo</span>
                </h4>
                <ul className="space-y-2 text-sm text-text-secondary">
                  <li>
                    • <strong>Contraste visual:</strong> Livros e brinquedos com alto contraste
                  </li>
                  <li>
                    • <strong>Causa e efeito:</strong> Brinquedos que respondem a ações
                  </li>
                  <li>
                    • <strong>Música e sons:</strong> Diferentes estímulos sonoros
                  </li>
                  <li>
                    • <strong>Esconde-esconde:</strong> Jogos de permanência do objeto
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="mb-3 flex items-center font-semibold text-system-info">
                  💬 <span className="ml-2">Desenvolvimento da Linguagem</span>
                </h4>
                <ul className="space-y-2 text-sm text-text-secondary">
                  <li>
                    • <strong>Conversar sempre:</strong> Narrar atividades do dia a dia
                  </li>
                  <li>
                    • <strong>Leitura diária:</strong> Livros adequados para a idade
                  </li>
                  <li>
                    • <strong>Canções e rimas:</strong> Musicas infantis e parlendas
                  </li>
                  <li>
                    • <strong>Responder aos balbucios:</strong> Manter "conversas" com o bebê
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="mb-3 flex items-center font-semibold text-system-warning">
                  👥 <span className="ml-2">Desenvolvimento Social</span>
                </h4>
                <ul className="space-y-2 text-sm text-text-secondary">
                  <li>
                    • <strong>Contato visual:</strong> Olhar nos olhos durante atividades
                  </li>
                  <li>
                    • <strong>Expressões faciais:</strong> Sorrir e fazer caretas
                  </li>
                  <li>
                    • <strong>Rotinas sociais:</strong> Cumprimentos, despedidas
                  </li>
                  <li>
                    • <strong>Interação com outros:</strong> Socialização supervisionada
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-6 rounded-lg border border-growth-green/20 bg-growth-green/10 p-4">
              <h4 className="mb-2 font-semibold text-growth-green">💡 Dica Importante</h4>
              <p className="text-sm text-text-secondary">
                <strong>O melhor estímulo é o amor e a atenção!</strong> Brincadeiras simples,
                carinho e interação são mais importantes que brinquedos caros. Respeite o ritmo do
                seu bebê e celebre cada pequena conquista.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Seção: Quando procurar ajuda */}
        <Card className="border-l-4 border-system-warning bg-system-warning/10 duration-300">
          <CardHeader>
            <CardTitle as="h2" className="text-xl font-bold text-text-primary">
              🏥 Quando Procurar Ajuda Profissional
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div>
                <h4 className="mb-3 flex items-center font-semibold text-system-error-dark">
                  🚨 <span className="ml-2">Sinais de Alerta por Idade</span>
                </h4>
                <div className="space-y-3">
                  <div>
                    <h5 className="font-medium text-text-primary">2 meses:</h5>
                    <ul className="ml-4 text-sm text-text-secondary">
                      <li>• Não sorri socialmente</li>
                      <li>• Não acompanha objetos com os olhos</li>
                      <li>• Não levanta a cabeça</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-medium text-text-primary">6 meses:</h5>
                    <ul className="ml-4 text-sm text-text-secondary">
                      <li>• Não rola</li>
                      <li>• Não emite sons</li>
                      <li>• Muito mole ou rígido</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-medium text-text-primary">12 meses:</h5>
                    <ul className="ml-4 text-sm text-text-secondary">
                      <li>• Não aponta ou acena</li>
                      <li>• Não fala "mamá" ou "papá"</li>
                      <li>• Não fica em pé com apoio</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="mb-3 flex items-center font-semibold text-system-info">
                  👨‍⚕️ <span className="ml-2">Profissionais Especializados</span>
                </h4>
                <ul className="space-y-2 text-sm text-text-secondary">
                  <li>
                    • <strong>Pediatra:</strong> Primeira avaliação e encaminhamentos
                  </li>
                  <li>
                    • <strong>Neuropediatra:</strong> Desenvolvimento neurológico
                  </li>
                  <li>
                    • <strong>Fisioterapeuta:</strong> Desenvolvimento motor
                  </li>
                  <li>
                    • <strong>Fonoaudiólogo:</strong> Linguagem e comunicação
                  </li>
                  <li>
                    • <strong>Terapeuta Ocupacional:</strong> Habilidades funcionais
                  </li>
                  <li>
                    • <strong>Psicólogo infantil:</strong> Desenvolvimento socioemocional
                  </li>
                </ul>

                <div className="mt-4 rounded-lg border border-growth-green/20 bg-growth-green/10 p-3">
                  <h5 className="mb-1 font-semibold text-growth-green">✅ Lembre-se</h5>
                  <p className="text-xs text-text-secondary">
                    A <strong>intervenção precoce</strong> é fundamental. Não hesite em procurar
                    ajuda se tiver dúvidas. É melhor uma avaliação desnecessária do que perder uma
                    oportunidade de ajudar seu bebê.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <FAQ
          title="Perguntas Frequentes - Desenvolvimento e Percentis Infantis"
          items={[
            {
              question: "O que significam os percentis de crescimento P3, P50 e P97?",
              answer:
                "<strong>P3:</strong> Apenas 3% das crianças estão abaixo deste valor - pode necessitar atenção médica. <strong>P50 (mediana):</strong> Valor típico onde 50% das crianças estão acima e 50% abaixo. <strong>P97:</strong> Apenas 3% das crianças estão acima - geralmente normal, mas pode necessitar avaliação se houver mudança brusca no padrão de crescimento.",
              borderColor: "system-info",
            },
            {
              question: "Qual a diferença entre padrões WHO e CDC na nossa calculadora?",
              answer:
                "<strong>WHO (0-24 meses):</strong> Padrão internacional baseado em crianças amamentadas de 6 países, incluindo o Brasil. Representa como as crianças DEVEM crescer em condições ótimas. <strong>CDC (2-5 anos):</strong> Referência americana que complementa os dados WHO. Fazemos a transição automaticamente aos 24 meses mantendo continuidade.",
              borderColor: "primary-blue",
            },
            {
              question: "Como a previsão de altura adulta é calculada?",
              answer:
                "Usamos a <strong>fórmula da altura média dos pais</strong>: Para meninos = (altura mãe + altura pai + 13cm) ÷ 2. Para meninas = (altura mãe + altura pai - 13cm) ÷ 2. A margem de erro é de ±8,5cm para 95% das crianças. Esta é uma <strong>estimativa</strong> - outros fatores como nutrição e saúde também influenciam.",
              borderColor: "growth-green",
            },
            {
              question: "Quando devo me preocupar com atrasos no desenvolvimento?",
              answer:
                "Marcos de <strong>alta prioridade</strong> com atraso superior a 2 meses merecem atenção. Para marcos de média prioridade, a tolerância é de 3-4 meses. Sempre consulte um pediatra se tiver dúvidas ou se múltiplos marcos estiverem atrasados. <strong>Intervenção precoce</strong> é fundamental.",
              borderColor: "primary-blue",
            },
            {
              question: "Como funciona o cálculo da idade corrigida para prematuros?",
              answer:
                "Subtraímos as semanas de prematuridade da idade atual. <strong>Exemplo:</strong> bebê de 10 meses nascido com 32 semanas (8 semanas antes das 40) tem idade corrigida de 8 meses. Usamos essa idade para avaliar marcos e percentis até os <strong>24 meses</strong>. Isso garante expectativas realistas.",
              borderColor: "growth-green",
            },
            {
              question: "Meu filho está no P10 de peso. Isso é motivo de preocupação?",
              answer:
                "Não necessariamente! <strong>P10 significa que 90% das crianças pesam mais</strong>, mas se seu filho sempre esteve nesta faixa e está crescendo consistentemente, pode ser seu padrão normal. O importante é a <strong>consistência do crescimento</strong>, não apenas o valor absoluto. Consulte o pediatra se houver quedas bruscas nos percentis.",
              borderColor: "system-warning",
            },
            {
              question: "Posso usar a calculadora para crianças com deficiência?",
              answer:
                "A calculadora oferece uma <strong>referência geral</strong>, mas crianças com deficiências podem ter padrões únicos de desenvolvimento. Recomendamos usar como <strong>complemento ao acompanhamento especializado</strong>, não como substituto. Consulte sempre profissionais especializados.",
              borderColor: "system-info",
            },
            {
              question: "Por que o perímetro cefálico só é medido até 24 meses?",
              answer:
                "O <strong>perímetro cefálico</strong> é crítico nos primeiros 2 anos quando o cérebro cresce mais rapidamente (80% do tamanho adulto). Após 24 meses, o crescimento desacelera significativamente e outras medidas se tornam mais relevantes. Monitoramento precoce ajuda detectar problemas neurológicos.",
              borderColor: "system-error-dark",
            },
            {
              question: "A calculadora substitui consultas pediátricas?",
              answer:
                "<strong>Definitivamente não!</strong> Nossa ferramenta é complementar. Use-a para se preparar para consultas, fazer perguntas direcionadas e acompanhar progresso entre consultas. O pediatra sempre deve ser consultado para <strong>avaliação completa e profissional</strong>.",
              borderColor: "growth-green",
            },
            {
              question: "Como os gráficos interativos ajudam no acompanhamento?",
              answer:
                "Os <strong>gráficos mostram visualmente</strong> onde sua criança se posiciona em relação aos padrões mundiais. Você pode ver as curvas de percentis (P3, P15, P50, P85, P97) e a posição exata do seu filho. Isso facilita entender se o crescimento está acelerado, típico ou necessita atenção.",
              borderColor: "system-success",
            },
          ]}
          tipSection={{
            title: "Dica para Pais de Primeira Viagem",
            content:
              "<strong>Relaxe e observe!</strong> Cada bebê é único. Use nossa calculadora como uma <strong>bússola, não um cronômetro</strong>. O mais importante é o amor, a interação e o acompanhamento médico regular. Desenvolvimento saudável acontece no ritmo certo para cada criança.",
          }}
          footerText="<strong>Tem outras dúvidas?</strong> Nossa calculadora oferece explicações detalhadas para cada marco e categoria de desenvolvimento."
        />

        {/* Footer informativo */}
        <Card className="border-l-4 border-primary-blue bg-primary-blue-light duration-300">
          <CardHeader>
            <CardTitle as="h2" className="text-lg font-bold text-text-primary">
              📚 Sobre Esta Calculadora de Desenvolvimento Infantil
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 text-sm text-text-secondary">
              <p>
                Esta calculadora de desenvolvimento infantil é{" "}
                <strong className="text-primary-blue-dark">gratuita</strong> e foi desenvolvida com
                base em diretrizes pediátricas reconhecidas internacionalmente. Os marcos incluem
                referências da Academia Americana de Pediatria (AAP) e Sociedade Brasileira de
                Pediatria (SBP).
              </p>
              <p>
                <strong className="text-growth-green">Diferencial único:</strong> Nossa calculadora
                oferece recursos exclusivos como marcos interativos, suporte completo a prematuros,
                cronograma médico personalizado e análise visual do progresso por categorias.
              </p>
              <p>
                <strong className="text-system-warning">Importante:</strong> Esta ferramenta é
                apenas para fins educacionais e informativos. Não substitui consultas médicas
                regulares. Sempre discuta o desenvolvimento do seu bebê com um pediatra qualificado.
              </p>
              <p className="text-xs opacity-75">
                Última atualização: Dezembro 2024 • Baseado em diretrizes pediátricas atualizadas •
                Dados processados localmente para privacidade
              </p>
            </div>
          </CardContent>
        </Card>

        <RelatedCalculators category="saude" currentCalculatorId="desenvolvimento-infantil" />
      </div>
    </div>
  );
}
