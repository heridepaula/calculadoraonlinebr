import type { MetaFunction } from "@remix-run/node";
import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent, Input, Button, Breadcrumb, BreadcrumbItem } from "~/components/ui";
import { APP_NAME } from "~/lib/constants";

export const meta: MetaFunction = () => {
  return [
    { title: `Calculadora de Gordura Corporal - ${APP_NAME}` },
    {
      name: "description",
      content: "Calcule seu percentual de gordura corporal usando métodos científicos como Navy Method e Jackson-Pollock. Avalie sua composição corporal e receba orientações personalizadas.",
    },
    {
      name: "keywords",
      content: "calculadora gordura corporal, percentual gordura, navy method, jackson pollock, composição corporal, massa magra, avaliação física",
    },
    { name: "author", content: "Calculadora Online BR" },
    { property: "og:title", content: `Calculadora de Gordura Corporal - ${APP_NAME}` },
    { property: "og:description", content: "Calcule seu percentual de gordura corporal com métodos científicos precisos. Avalie sua saúde e composição corporal gratuitamente." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary" },
    { name: "twitter:title", content: `Calculadora de Gordura Corporal - ${APP_NAME}` },
    { name: "twitter:description", content: "Avalie sua composição corporal com cálculos precisos de gordura corporal." },
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

  const calculateNavyMethod = (): number => {
    const weightNum = parseFloat(weight);
    const heightNum = parseFloat(height);
    const neckNum = parseFloat(neck);
    const waistNum = parseFloat(waist);
    const hipsNum = parseFloat(hips);

    if (gender === "male") {
      // Fórmula Navy para homens
      const bodyFat = 495 / (1.0324 - 0.19077 * Math.log10(waistNum - neckNum) + 0.15456 * Math.log10(heightNum)) - 450;
      return Math.max(0, Math.min(50, bodyFat));
    } else {
      // Fórmula Navy para mulheres
      const bodyFat = 495 / (1.29579 - 0.35004 * Math.log10(waistNum + hipsNum - neckNum) + 0.22100 * Math.log10(heightNum)) - 450;
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
      const bodyDensity = 1.10938 - (0.0008267 * sumSkinfolds) + (0.0000016 * Math.pow(sumSkinfolds, 2)) - (0.0002574 * ageNum);
      const bodyFat = (495 / bodyDensity) - 450;
      return Math.max(0, Math.min(50, bodyFat));
    } else {
      // Fórmula Jackson-Pollock 3 dobras para mulheres
      const bodyDensity = 1.0994921 - (0.0009929 * sumSkinfolds) + (0.0000023 * Math.pow(sumSkinfolds, 2)) - (0.0001392 * ageNum);
      const bodyFat = (495 / bodyDensity) - 450;
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
      bodyFat = (whr * 64) + (ageNum * 0.2) - 98.42 + 4.15;
    } else {
      bodyFat = (whr * 76) + (ageNum * 0.15) - 76.76 + 4.15;
    }
    
    return Math.max(0, Math.min(50, bodyFat));
  };

  const getBodyFatCategory = (bodyFat: number, gender: Gender): { category: string; color: string } => {
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
          "Mantenha uma dieta rica em gorduras saudáveis"
        ];
      case "Baixo (Fitness)":
        return [
          "Excelente composição corporal para saúde geral",
          "Continue com exercícios regulares e dieta equilibrada",
          "Foque em manutenção da massa muscular",
          "Hidratação adequada e descanso são essenciais"
        ];
      case "Normal":
        return [
          "Percentual saudável para população geral",
          "Exercícios 3-4x por semana são ideais",
          "Dieta balanceada com proteínas adequadas",
          "Monitore periodicamente para manutenção"
        ];
      case "Acima do Normal":
        return [
          "Considere redução gradual através de exercícios",
          "Combine exercícios aeróbicos com musculação",
          "Ajuste na alimentação com déficit calórico moderado",
          "Busque orientação nutricional se necessário"
        ];
      default:
        return [
          "Recomenda-se acompanhamento médico especializado",
          "Programa estruturado de exercícios e nutrição",
          "Mudanças graduais no estilo de vida",
          "Avaliação de possíveis questões metabólicas"
        ];
    }
  };

  const handleCalculate = () => {
    const weightNum = parseFloat(weight);
    
    if (isNaN(weightNum) || weightNum <= 0) {
      alert("Por favor, preencha todos os campos obrigatórios corretamente.");
      return;
    }

    let bodyFatPercentage = 0;

    try {
      switch (method) {
        case "navy":
          if (!neck || !waist || (gender === "female" && !hips)) {
            alert("Por favor, preencha todas as medidas necessárias para o Navy Method.");
            return;
          }
          bodyFatPercentage = calculateNavyMethod();
          break;
        case "jackson-pollock":
          if (!triceps || !suprailiac || !abdominal || !age) {
            alert("Por favor, preencha todas as dobras cutâneas e idade para Jackson-Pollock.");
            return;
          }
          bodyFatPercentage = calculateJacksonPollock();
          break;
        case "waist-hip":
          if (!waist || !hips || !age) {
            alert("Por favor, preencha cintura, quadril e idade.");
            return;
          }
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
    } catch (error) {
      alert("Erro no cálculo. Verifique os valores inseridos.");
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
  };

  return (
    <div className="mx-auto max-w-4xl space-y-8">
      <Breadcrumb>
        <BreadcrumbItem href="/">Início</BreadcrumbItem>
        <BreadcrumbItem href="/calculadora">Calculadoras</BreadcrumbItem>
        <BreadcrumbItem href="/calculadora/saude">Saúde</BreadcrumbItem>
        <BreadcrumbItem isLast>Gordura Corporal</BreadcrumbItem>
      </Breadcrumb>

      <header className="text-center space-y-4">
        <h1 className="mb-4 text-3xl font-bold text-text-primary md:text-4xl">
          🏋️ Calculadora de Gordura Corporal
        </h1>
        <p className="text-lg text-text-secondary-dark max-w-3xl mx-auto">
          Calcule seu <strong className="text-growth-green">percentual de gordura corporal</strong> usando métodos científicos validados. 
          Avalie sua <strong className="text-primary-blue-dark">composição corporal</strong> e receba orientações personalizadas.
        </p>
        <div className="bg-growth-green-soft rounded-lg p-4 inline-block duration-300">
          <p className="text-sm text-text-primary font-medium">
            🔬 <strong>Métodos Científicos</strong> • 📊 <strong>Análise Detalhada</strong> • 🎯 <strong>Recomendações Personalizadas</strong>
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
              />

              <Input
                type="number"
                label="Altura (cm)"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                placeholder="Ex: 175"
                min="1"
                step="0.1"
                required
                fullWidth
              />

              <Input
                type="number"
                label="Idade (anos)"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                placeholder="Ex: 30"
                min="1"
                max="120"
                required
                fullWidth
              />
            </div>

            <div className="max-w-sm mx-auto">
              <h3 className="font-semibold mb-3 text-text-primary text-center text-sm">Sexo:</h3>
              <div className="flex rounded-lg border border-neutral-surface-variant overflow-hidden">
                <button
                  type="button"
                  onClick={() => setGender("male")}
                  className={`flex-1 px-4 py-2 text-sm font-medium ${
                    gender === "male"
                      ? "bg-primary-blue text-white"
                      : "bg-neutral-surface text-text-secondary hover:bg-primary-blue/10-dark/10"
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
                      : "bg-neutral-surface text-text-secondary hover:bg-primary-blue/10-dark/10"
                  }`}
                >
                  👩 Feminino
                </button>
              </div>
            </div>

            <div className="max-w-lg mx-auto">
              <h3 className="font-semibold mb-3 text-text-primary text-center text-sm">Método de Cálculo:</h3>
              <div className="flex rounded-lg border border-neutral-surface-variant overflow-hidden">
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
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <Input
                type="number"
                label="Pescoço (cm)"
                value={neck}
                onChange={(e) => setNeck(e.target.value)}
                placeholder="Ex: 40"
                min="1"
                step="0.1"
                required
                fullWidth
              />
              <Input
                type="number"
                label="Cintura (cm)"
                value={waist}
                onChange={(e) => setWaist(e.target.value)}
                placeholder="Ex: 85"
                min="1"
                step="0.1"
                required
                fullWidth
              />
              {gender === "female" && (
                <Input
                  type="number"
                  label="Quadril (cm)"
                  value={hips}
                  onChange={(e) => setHips(e.target.value)}
                  placeholder="Ex: 100"
                  min="1"
                  step="0.1"
                  required
                  fullWidth
                />
              )}
            </div>
          )}

          {method === "jackson-pollock" && (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <Input
                type="number"
                label="Tríceps (mm)"
                value={triceps}
                onChange={(e) => setTriceps(e.target.value)}
                placeholder="Ex: 15"
                min="1"
                step="0.1"
                required
                fullWidth
              />
              <Input
                type="number"
                label="Suprailíaca (mm)"
                value={suprailiac}
                onChange={(e) => setSuprailiac(e.target.value)}
                placeholder="Ex: 20"
                min="1"
                step="0.1"
                required
                fullWidth
              />
              <Input
                type="number"
                label="Abdominal (mm)"
                value={abdominal}
                onChange={(e) => setAbdominal(e.target.value)}
                placeholder="Ex: 25"
                min="1"
                step="0.1"
                required
                fullWidth
              />
            </div>
          )}

          {method === "waist-hip" && (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <Input
                type="number"
                label="Cintura (cm)"
                value={waist}
                onChange={(e) => setWaist(e.target.value)}
                placeholder="Ex: 85"
                min="1"
                step="0.1"
                required
                fullWidth
              />
              <Input
                type="number"
                label="Quadril (cm)"
                value={hips}
                onChange={(e) => setHips(e.target.value)}
                placeholder="Ex: 100"
                min="1"
                step="0.1"
                required
                fullWidth
              />
            </div>
          )}

          <div className="mt-6 flex justify-center gap-4">
            <Button onClick={handleCalculate} className="px-8">
              Calcular Gordura Corporal
            </Button>
            <Button 
              onClick={handleReset} 
              variant="outline"
              className="px-8 border-system-error text-system-error hover:bg-system-error hover:text-white"
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
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div className="text-center bg-gray-900 p-6 rounded-lg">
                <div className="text-4xl font-bold text-growth-green mb-2">
                  {result.bodyFatPercentage.toFixed(1)}%
                </div>
                <div className="text-sm text-text-secondary">Gordura Corporal</div>
              </div>
              
              <div className="text-center bg-gray-900 p-6 rounded-lg">
                <div className="text-2xl font-bold text-primary-blue-dark mb-2">
                  {result.fatMass.toFixed(1)} kg
                </div>
                <div className="text-sm text-text-secondary">Massa Gorda</div>
              </div>
              
              <div className="text-center bg-gray-900 p-6 rounded-lg">
                <div className="text-2xl font-bold text-system-warning mb-2">
                  {result.leanMass.toFixed(1)} kg
                </div>
                <div className="text-sm text-text-secondary">Massa Magra</div>
              </div>
            </div>

            <div className="bg-gray-900 p-4 rounded-lg mb-6">
              <div className="text-center">
                <div className="font-semibold mb-2 text-text-primary">
                  Classificação
                </div>
                <div className={`text-xl font-bold ${result.categoryColor}${result.categoryColor}`}>
                  {result.category}
                </div>
              </div>
            </div>

            <div className="bg-primary-blue-light p-4 rounded-lg">
              <h4 className="font-semibold text-primary-blue-dark mb-3">
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
      <Card className="bg-gradient-to-r from-primary-blue-light to-growth-green-soft border-l-4 border-primary-blue duration-300">
        <CardHeader>
          <CardTitle as="h2" className="text-2xl font-bold text-text-primary">
            📏 Como Medir Corretamente - Guia Passo a Passo
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-8">
            {/* Navy Method */}
            <div className="bg-gray-900 p-6 rounded-xl border border-primary-blue/20">
              <h3 className="text-xl font-bold text-primary-blue-dark mb-4 flex items-center">
                🏃 Navy Method (Método da Marinha dos EUA)
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-growth-green mb-3">🎯 O que é?</h4>
                  <p className="text-text-secondary text-sm mb-4">
                    Desenvolvido pela Marinha dos EUA, é um dos métodos mais <strong>precisos e práticos</strong> 
                    para medir gordura corporal usando apenas medidas corporais básicas.
                  </p>
                  
                  <h4 className="font-semibold text-system-info mb-3">📊 Precisão</h4>
                  <ul className="text-sm text-text-secondary space-y-1 mb-4">
                    <li>• <strong>Erro padrão:</strong> ±3-4%</li>
                    <li>• <strong>Correlação com DEXA:</strong> 0,85-0,90</li>
                    <li>• <strong>Ideal para:</strong> População geral adulta</li>
                    <li>• <strong>Não recomendado:</strong> Atletas com alta massa muscular</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-semibold text-system-success mb-3">✅ Vantagens</h4>
                  <ul className="text-sm text-text-secondary space-y-1 mb-4">
                    <li>• Não requer equipamento especial</li>
                    <li>• Rápido e fácil de fazer</li>
                    <li>• Validado cientificamente</li>
                    <li>• Reprodutível entre avaliadores</li>
                  </ul>
                  
                  <h4 className="font-semibold text-system-warning mb-3">⚠️ Limitações</h4>
                  <ul className="text-sm text-text-secondary space-y-1">
                    <li>• Menos preciso em atletas</li>
                    <li>• Pode subestimar em obesos</li>
                    <li>• Varia com hidratação</li>
                  </ul>
                </div>
              </div>
              
              <div className="mt-6 bg-primary-blue-light p-4 rounded-lg">
                <h4 className="font-bold text-primary-blue-dark mb-3">📝 Como Medir - Passo a Passo</h4>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h5 className="font-semibold mb-2">👨 Para Homens:</h5>
                    <ol className="text-sm text-text-secondary space-y-2">
                      <li><strong>1. Pescoço:</strong> Meça logo abaixo da maçã de Adão, com a fita paralela ao chão</li>
                      <li><strong>2. Cintura:</strong> No ponto mais estreito, geralmente na altura do umbigo</li>
                      <li><strong>3. Altura:</strong> Em pé, descalço, contra a parede</li>
                    </ol>
                  </div>
                  
                  <div>
                    <h5 className="font-semibold mb-2">👩 Para Mulheres:</h5>
                    <ol className="text-sm text-text-secondary space-y-2">
                      <li><strong>1. Pescoço:</strong> Logo abaixo da laringe, fita paralela ao chão</li>
                      <li><strong>2. Cintura:</strong> No ponto mais estreito do torso</li>
                      <li><strong>3. Quadril:</strong> Na parte mais larga dos quadris</li>
                      <li><strong>4. Altura:</strong> Em pé, descalço, contra a parede</li>
                    </ol>
                  </div>
                </div>
                
                <div className="mt-4 bg-system-success/10 p-3 rounded border border-system-success/20">
                  <p className="text-sm text-system-success">
                    <strong>💡 Dica Profissional:</strong> Meça sempre no mesmo horário do dia (preferencialmente pela manhã) 
                    e use fita métrica inelástica. Não comprima a pele, apenas encoste a fita.
                  </p>
                </div>
              </div>
            </div>

            {/* Jackson-Pollock Method */}
            <div className="bg-gray-900 p-6 rounded-xl border border-growth-green/20">
              <h3 className="text-xl font-bold text-growth-green mb-4 flex items-center">
                📏 Método Jackson-Pollock (Dobras Cutâneas)
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-primary-blue-dark mb-3">🎯 O que é?</h4>
                  <p className="text-text-secondary text-sm mb-4">
                    Método científico que <strong>mede a espessura das dobras cutâneas</strong> em pontos específicos 
                    do corpo para estimar a gordura subcutânea total.
                  </p>
                  
                  <h4 className="font-semibold text-system-info mb-3">📊 Precisão</h4>
                  <ul className="text-sm text-text-secondary space-y-1 mb-4">
                    <li>• <strong>Erro padrão:</strong> ±3-5%</li>
                    <li>• <strong>Correlação com DEXA:</strong> 0,80-0,85</li>
                    <li>• <strong>Versões:</strong> 3, 4 ou 7 dobras</li>
                    <li>• <strong>Ideal para:</strong> Atletas e fisiculturistas</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-semibold text-system-success mb-3">✅ Vantagens</h4>
                  <ul className="text-sm text-text-secondary space-y-1 mb-4">
                    <li>• Muito preciso quando bem executado</li>
                    <li>• Diferencia massa magra de gorda</li>
                    <li>• Amplamente validado</li>
                    <li>• Específico por sexo e idade</li>
                  </ul>
                  
                  <h4 className="font-semibold text-system-warning mb-3">⚠️ Limitações</h4>
                  <ul className="text-sm text-text-secondary space-y-1">
                    <li>• Requer adipômetro (plicômetro)</li>
                    <li>• Precisa de treinamento técnico</li>
                    <li>• Difícil em pessoas obesas</li>
                    <li>• Varia entre avaliadores</li>
                  </ul>
                </div>
              </div>
              
              <div className="mt-6 bg-growth-green-soft p-4 rounded-lg">
                <h4 className="font-bold text-growth-green mb-3">📝 Protocolo de 3 Dobras - Passo a Passo</h4>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h5 className="font-semibold mb-2">👨 Homens (3 dobras):</h5>
                    <ol className="text-sm text-text-secondary space-y-3">
                      <li>
                        <strong>1. Peitoral:</strong> Dobra diagonal entre axila e mamilo, 
                        a 1/3 da distância da axila
                      </li>
                      <li>
                        <strong>2. Abdominal:</strong> Dobra vertical ao lado do umbigo, 
                        aproximadamente 2 cm à direita
                      </li>
                      <li>
                        <strong>3. Coxa:</strong> Dobra vertical na parte frontal da coxa, 
                        no ponto médio entre quadril e joelho
                      </li>
                    </ol>
                  </div>
                  
                  <div>
                    <h5 className="font-semibold mb-2">👩 Mulheres (3 dobras):</h5>
                    <ol className="text-sm text-text-secondary space-y-3">
                      <li>
                        <strong>1. Tríceps:</strong> Dobra vertical na parte posterior do braço, 
                        no ponto médio entre ombro e cotovelo
                      </li>
                      <li>
                        <strong>2. Suprailíaca:</strong> Dobra diagonal logo acima da crista ilíaca, 
                        na linha axilar média
                      </li>
                      <li>
                        <strong>3. Coxa:</strong> Dobra vertical na parte frontal da coxa, 
                        no ponto médio entre quadril e joelho
                      </li>
                    </ol>
                  </div>
                </div>
                
                <div className="mt-4 bg-system-info/10 p-3 rounded border border-system-info/20">
                  <p className="text-sm text-system-info">
                    <strong>🎯 Técnica Correta:</strong> Pinçar a pele com polegar e indicador, 
                    aplicar o adipômetro perpendicular à dobra, aguardar 2 segundos e fazer a leitura. 
                    Repetir 3 vezes em cada ponto.
                  </p>
                </div>
              </div>
            </div>

            {/* Waist-Hip Ratio */}
            <div className="bg-gray-900 p-6 rounded-xl border border-system-warning/20">
              <h3 className="text-xl font-bold text-system-warning mb-4 flex items-center">
                📐 Relação Cintura-Quadril (RCQ)
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-primary-blue-dark mb-3">🎯 O que é?</h4>
                  <p className="text-text-secondary text-sm mb-4">
                    Indica a <strong>distribuição de gordura corporal</strong> e é um excelente 
                    <strong className="text-system-error-dark"> preditor de risco cardiovascular</strong>, 
                    especialmente para gordura abdominal visceral.
                  </p>
                  
                  <h4 className="font-semibold text-system-info mb-3">📊 Interpretação</h4>
                  <div className="space-y-2 text-sm text-text-secondary">
                    <div className="flex justify-between">
                      <span><strong>Homens:</strong></span>
                      <span></span>
                    </div>
                    <div className="ml-4 space-y-1">
                      <div className="flex justify-between">
                        <span>• Baixo risco:</span>
                        <span className="text-growth-green font-medium">&lt; 0,90</span>
                      </div>
                      <div className="flex justify-between">
                        <span>• Risco moderado:</span>
                        <span className="text-system-warning font-medium">0,90 - 0,99</span>
                      </div>
                      <div className="flex justify-between">
                        <span>• Alto risco:</span>
                        <span className="text-system-error-dark font-medium">≥ 1,00</span>
                      </div>
                    </div>
                    <div className="flex justify-between mt-3">
                      <span><strong>Mulheres:</strong></span>
                      <span></span>
                    </div>
                    <div className="ml-4 space-y-1">
                      <div className="flex justify-between">
                        <span>• Baixo risco:</span>
                        <span className="text-growth-green font-medium">&lt; 0,80</span>
                      </div>
                      <div className="flex justify-between">
                        <span>• Risco moderado:</span>
                        <span className="text-system-warning font-medium">0,80 - 0,84</span>
                      </div>
                      <div className="flex justify-between">
                        <span>• Alto risco:</span>
                        <span className="text-system-error-dark font-medium">≥ 0,85</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold text-system-success mb-3">✅ Vantagens</h4>
                  <ul className="text-sm text-text-secondary space-y-1 mb-4">
                    <li>• Extremamente simples de medir</li>
                    <li>• Preditor de risco cardiovascular</li>
                    <li>• Não requer equipamento especial</li>
                    <li>• Validado pela OMS</li>
                  </ul>
                  
                  <h4 className="font-semibold text-system-warning mb-3">⚠️ Limitações</h4>
                  <ul className="text-sm text-text-secondary space-y-1">
                    <li>• Não mede % total de gordura</li>
                    <li>• Menos preciso que outros métodos</li>
                    <li>• Influenciado pela estrutura óssea</li>
                    <li>• Varia com a postura</li>
                  </ul>
                </div>
              </div>
              
              <div className="mt-6 bg-system-warning/10 p-4 rounded-lg border border-system-warning/20">
                <h4 className="font-bold text-system-warning mb-3">📝 Como Medir Corretamente</h4>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h5 className="font-semibold mb-2">📏 Cintura:</h5>
                    <ul className="text-sm text-text-secondary space-y-1">
                      <li>• Ponto mais estreito do torso</li>
                      <li>• Geralmente entre costelas e quadril</li>
                      <li>• Se não houver cintura definida: no umbigo</li>
                      <li>• Fita paralela ao chão</li>
                      <li>• Respiração normal, sem contrair abdome</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h5 className="font-semibold mb-2">📐 Quadril:</h5>
                    <ul className="text-sm text-text-secondary space-y-1">
                      <li>• Parte mais larga dos quadris</li>
                      <li>• Geralmente na altura do trocânter maior</li>
                      <li>• Incluir proeminência dos glúteos</li>
                      <li>• Fita paralela ao chão</li>
                      <li>• Pés juntos, peso distribuído</li>
                    </ul>
                  </div>
                </div>
                
                <div className="mt-4 bg-system-error/10 p-3 rounded border border-system-error/20">
                  <p className="text-sm text-system-error-dark">
                    <strong>⚠️ Importante para a Saúde:</strong> Uma RCQ alta indica acúmulo de gordura abdominal, 
                    associada a maior risco de diabetes, doenças cardíacas e síndrome metabólica. 
                    Consulte um médico se seus valores estão na faixa de alto risco.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Seção: Comparação de Métodos */}
      <Card className="bg-background-dark-secondary border border-neutral-surface-variant duration-300">
        <CardHeader>
          <CardTitle as="h2" className="text-xl font-bold text-text-primary">
            ⚖️ Comparação Entre os Métodos de Medição
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b-2 border-neutral-surface-variant">
                  <th className="text-left p-3 font-semibold">Critério</th>
                  <th className="text-center p-3 font-semibold text-primary-blue-dark">Navy Method</th>
                  <th className="text-center p-3 font-semibold text-growth-green">Jackson-Pollock</th>
                  <th className="text-center p-3 font-semibold text-system-warning">Cintura-Quadril</th>
                </tr>
              </thead>
              <tbody className="space-y-2">
                <tr className="border-b border-neutral-surface-variant">
                  <td className="p-3 font-medium">Precisão</td>
                  <td className="text-center p-3 text-primary-blue-dark">Alta (±3-4%)</td>
                  <td className="text-center p-3 text-growth-green">Muito Alta (±3-5%)</td>
                  <td className="text-center p-3 text-system-warning">Moderada (±5-7%)</td>
                </tr>
                <tr className="border-b border-neutral-surface-variant">
                  <td className="p-3 font-medium">Facilidade</td>
                  <td className="text-center p-3">⭐⭐⭐⭐⭐</td>
                  <td className="text-center p-3">⭐⭐</td>
                  <td className="text-center p-3">⭐⭐⭐⭐⭐</td>
                </tr>
                <tr className="border-b border-neutral-surface-variant">
                  <td className="p-3 font-medium">Equipamento</td>
                  <td className="text-center p-3">Fita métrica</td>
                  <td className="text-center p-3">Adipômetro</td>
                  <td className="text-center p-3">Fita métrica</td>
                </tr>
                <tr className="border-b border-neutral-surface-variant">
                  <td className="p-3 font-medium">Tempo</td>
                  <td className="text-center p-3 text-growth-green">2-3 min</td>
                  <td className="text-center p-3 text-system-warning">5-10 min</td>
                  <td className="text-center p-3 text-growth-green">1 min</td>
                </tr>
                <tr className="border-b border-neutral-surface-variant">
                  <td className="p-3 font-medium">Custo</td>
                  <td className="text-center p-3 text-growth-green">Baixo</td>
                  <td className="text-center p-3 text-system-warning">Médio</td>
                  <td className="text-center p-3 text-growth-green">Baixo</td>
                </tr>
                <tr className="border-b border-neutral-surface-variant">
                  <td className="p-3 font-medium">Ideal para</td>
                  <td className="text-center p-3">População geral</td>
                  <td className="text-center p-3">Atletas/Fitness</td>
                  <td className="text-center p-3">Triagem rápida</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium">Validação</td>
                  <td className="text-center p-3 text-growth-green">Militar/Civil</td>
                  <td className="text-center p-3 text-growth-green">Científica ampla</td>
                  <td className="text-center p-3 text-growth-green">OMS/Médica</td>
                </tr>
              </tbody>
            </table>
          </div>
          
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-primary-blue-light p-4 rounded-lg border border-primary-blue/20">
              <h4 className="font-bold text-primary-blue-dark mb-2">🎯 Recomendação Iniciantes</h4>
              <p className="text-sm text-text-secondary">
                Comece com o <strong>Navy Method</strong>. É preciso, fácil e não precisa de equipamentos caros.
              </p>
            </div>
            
            <div className="bg-growth-green-soft p-4 rounded-lg border border-growth-green/20">
              <h4 className="font-bold text-growth-green mb-2">🏋️ Para Atletas</h4>
              <p className="text-sm text-text-secondary">
                Use <strong>Jackson-Pollock</strong> com avaliador experiente para máxima precisão.
              </p>
            </div>
            
            <div className="bg-system-warning/10 p-4 rounded-lg border border-system-warning/20">
              <h4 className="font-bold text-system-warning mb-2">🏥 Triagem de Saúde</h4>
              <p className="text-sm text-text-secondary">
                A <strong>Relação Cintura-Quadril</strong> é excelente para avaliar risco cardiovascular.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* FAQ Section */}
      <Card className="bg-background-dark-secondary border border-neutral-surface-variant duration-300">
        <CardHeader>
          <CardTitle as="h2" className="text-xl font-bold text-text-primary">
            ❓ Perguntas Frequentes sobre Gordura Corporal
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div>
              <h3 className="font-bold mb-3 text-lg text-growth-green">
                1. Qual é o percentual ideal de gordura corporal?
              </h3>
              <div className="bg-growth-green-soft p-4 rounded-lg border border-growth-green/20">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <h4 className="font-semibold text-primary-blue-dark mb-2">👨 Homens:</h4>
                    <ul className="space-y-1 text-text-secondary">
                      <li>• <strong className="text-system-info">Atletas:</strong> 6-13%</li>
                      <li>• <strong className="text-growth-green">Fitness:</strong> 14-17%</li>
                      <li>• <strong className="text-primary-blue-dark">Aceitável:</strong> 18-24%</li>
                      <li>• <strong className="text-system-warning">Obesidade:</strong> &gt;25%</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-primary-blue-dark mb-2">👩 Mulheres:</h4>
                    <ul className="space-y-1 text-text-secondary">
                      <li>• <strong className="text-system-info">Atletas:</strong> 16-20%</li>
                      <li>• <strong className="text-growth-green">Fitness:</strong> 21-24%</li>
                      <li>• <strong className="text-primary-blue-dark">Aceitável:</strong> 25-31%</li>
                      <li>• <strong className="text-system-warning">Obesidade:</strong> &gt;32%</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-bold mb-3 text-lg text-growth-green">
                2. Com que frequência devo medir minha gordura corporal?
              </h3>
              <p className="text-text-secondary mb-3">
                Para <strong className="text-primary-blue-dark">acompanhar mudanças reais</strong>, 
                meça a cada <strong>4-6 semanas</strong>. A gordura corporal muda lentamente, 
                e variações diárias são normais devido à hidratação, alimentação e outros fatores.
              </p>
              <div className="bg-system-info/10 p-3 rounded border border-system-info/20">
                <p className="text-sm text-system-info">
                  <strong>💡 Dica:</strong> Meça sempre nas mesmas condições: mesmo horário, jejum, 
                  após usar o banheiro e com roupas similares.
                </p>
              </div>
            </div>

            <div>
              <h3 className="font-bold mb-3 text-lg text-growth-green">
                3. Por que diferentes métodos dão resultados diferentes?
              </h3>
              <p className="text-text-secondary mb-3">
                Cada método tem <strong className="text-system-warning">limitações e margens de erro</strong>. 
                Fatores como hidratação, hora do dia, técnica de medição e características individuais 
                influenciam os resultados.
              </p>
              <div className="bg-primary-blue-light p-3 rounded border border-primary-blue/20">
                <p className="text-sm text-primary-blue-dark">
                  <strong>📊 O importante é a tendência:</strong> Use sempre o mesmo método e 
                  acompanhe as mudanças ao longo do tempo, não os valores absolutos.
                </p>
              </div>
            </div>

            <div>
              <h3 className="font-bold mb-3 text-lg text-growth-green">
                4. Posso usar a balança de bioimpedância?
              </h3>
              <p className="text-text-secondary mb-3">
                Balanças de bioimpedância são <strong>convenientes mas menos precisas</strong>. 
                Elas enviam corrente elétrica fraca pelo corpo e calculam a gordura com base na resistência.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-growth-green-soft p-3 rounded">
                  <h5 className="font-semibold text-growth-green mb-1">✅ Vantagens:</h5>
                  <ul className="text-sm text-text-secondary space-y-1">
                    <li>• Muito fácil de usar</li>
                    <li>• Medição rápida (segundos)</li>
                    <li>• Boa para acompanhar tendências</li>
                  </ul>
                </div>
                <div className="bg-system-warning/10 p-3 rounded border border-system-warning/20">
                  <h5 className="font-semibold text-system-warning mb-1">⚠️ Limitações:</h5>
                  <ul className="text-sm text-text-secondary space-y-1">
                    <li>• Afetada pela hidratação</li>
                    <li>• Erro de ±5-8%</li>
                    <li>• Menos precisa em obesos</li>
                  </ul>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-bold mb-3 text-lg text-growth-green">
                5. Como reduzir o percentual de gordura corporal de forma saudável?
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-primary-blue-dark mb-2">🍽️ Nutrição (70% do resultado):</h4>
                  <ul className="text-sm text-text-secondary space-y-1">
                    <li>• Déficit calórico moderado (300-500 kcal/dia)</li>
                    <li>• Proteína adequada (0,8-1,2g/kg de peso)</li>
                    <li>• Alimentos integrais e naturais</li>
                    <li>• Hidratação adequada (35ml/kg de peso)</li>
                    <li>• Evitar dietas extremas</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-growth-green mb-2">🏋️ Exercício (30% do resultado):</h4>
                  <ul className="text-sm text-text-secondary space-y-1">
                    <li>• Musculação 3-4x por semana</li>
                    <li>• Cardio moderado 150-300 min/semana</li>
                    <li>• HIIT 1-2x por semana</li>
                    <li>• Caminhar 8-10mil passos/dia</li>
                    <li>• Descanso adequado entre treinos</li>
                  </ul>
                </div>
              </div>
              <div className="mt-4 bg-system-success/10 p-3 rounded border border-system-success/20">
                <p className="text-sm text-system-success">
                  <strong>⭐ Meta realista:</strong> Perda de 0,5-1% de gordura corporal por mês é 
                  considerada saudável e sustentável. Seja paciente e consistente!
                </p>
              </div>
            </div>

            <div>
              <h3 className="font-bold mb-3 text-lg text-growth-green">
                6. Gordura corporal muito baixa é perigosa?
              </h3>
              <p className="text-text-secondary mb-3">
                Sim! <strong className="text-system-error-dark">Gordura corporal muito baixa</strong> 
                pode causar problemas de saúde, especialmente em mulheres.
              </p>
              <div className="bg-system-error/10 p-4 rounded border border-system-error/20">
                <h5 className="font-semibold text-system-error-dark mb-2">⚠️ Riscos da gordura muito baixa:</h5>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-text-secondary">
                  <div>
                    <p className="font-medium mb-1">👨 Homens (&lt;5%):</p>
                    <ul className="space-y-1">
                      <li>• Queda da testosterona</li>
                      <li>• Fadiga extrema</li>
                      <li>• Perda de massa muscular</li>
                      <li>• Sistema imune comprometido</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-medium mb-1">👩 Mulheres (&lt;12%):</p>
                    <ul className="space-y-1">
                      <li>• Amenorreia (parada menstrual)</li>
                      <li>• Osteoporose precoce</li>
                      <li>• Problemas de fertilidade</li>
                      <li>• Desequilíbrios hormonais</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Footer com informações adicionais */}
      <Card className="bg-primary-blue-light border-l-4 border-primary-blue duration-300">
        <CardHeader>
          <CardTitle as="h2" className="text-lg font-bold text-text-primary">
            📚 Sobre Esta Calculadora de Gordura Corporal
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 text-sm text-text-secondary">
            <p>
              Esta <strong className="text-primary-blue-dark">calculadora de gordura corporal</strong> utiliza 
              <strong className="text-growth-green">métodos científicos validados</strong> para estimar sua composição corporal. 
              Os cálculos são baseados em pesquisas publicadas em revistas científicas internacionais.
            </p>
            <p>
              <strong>Métodos disponíveis:</strong> Navy Method (Marinha dos EUA), Jackson-Pollock 3 dobras, 
              e Relação Cintura-Quadril. Cada método tem suas vantagens e é adequado para diferentes situações e objetivos.
            </p>
            <p>
              <strong className="text-system-warning">Importante:</strong> Esta ferramenta é para fins educacionais e de acompanhamento pessoal. 
              Para avaliações médicas e planos de tratamento, consulte sempre um <strong>médico, nutricionista ou educador físico</strong> qualificado.
            </p>
            <p className="text-xs opacity-75 border-t border-primary-blue/20 pt-3 mt-4">
              🔬 Baseado em estudos científicos • 🎓 Ferramenta educacional gratuita • 🔒 Dados não armazenados • 
              📱 Compatível com todos os dispositivos • 🌙 Suporte a modo escuro
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}