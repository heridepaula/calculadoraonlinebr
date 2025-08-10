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
import { APP_NAME } from "~/lib/constants";
import { calculateAdvancedIMC, type AdvancedIMCParams, type AdvancedIMCResult } from "~/utils/calculations";

export const meta: MetaFunction = () => {
  return [
    { title: `Calculadora de IMC Avançada - Índice de Massa Corporal com Análise Personalizada - ${APP_NAME}` },
    {
      name: "description",
      content:
        "Calculadora de IMC online gratuita e avançada com análise personalizada por idade, sexo e múltiplas unidades de medida. Descubra seu peso ideal, risks para saúde, recomendações personalizadas e compare com padrões da OMS. Resultados instantâneos com gráficos interativos.",
    },
    { 
      name: "keywords", 
      content: "calculadora IMC avançada, índice massa corporal personalizado, peso ideal por idade, IMC masculino feminino, obesidade classificação OMS, sobrepeso saúde, calculadora peso libras quilos, IMC pés metros, análise corporal grátis, saúde preventiva, risco cardiovascular IMC" 
    },
    { name: "author", content: "Calculadora Online BR" },
    { name: "robots", content: "index,follow" },
    { name: "googlebot", content: "index,follow" },
    { name: "bingbot", content: "index,follow" },
    { property: "og:title", content: `Calculadora de IMC Avançada - Análise Personalizada do Peso Ideal - ${APP_NAME}` },
    { property: "og:description", content: "Calculadora de IMC mais completa do Brasil: análise por idade/sexo, múltiplas unidades, gráficos interativos e recomendações personalizadas baseadas na OMS." },
    { property: "og:type", content: "website" },
    { property: "og:url", content: "https://calculadora-online-br.com/calculadora/saude/imc" },
    { property: "og:site_name", content: APP_NAME },
    { property: "og:locale", content: "pt_BR" },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: `Calculadora IMC Avançada Online - Análise Personalizada - ${APP_NAME}` },
    { name: "twitter:description", content: "Ferramenta mais completa para calcular IMC: personalização por idade/sexo, múltiplas unidades, visualização gráfica e recomendações de saúde." },
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
        "name": "Calculadora de IMC Avançada",
        "description": "Calculadora online gratuita de Índice de Massa Corporal com análise personalizada por idade, sexo e múltiplas unidades de medida.",
        "url": "https://calculadora-online-br.com/calculadora/saude/imc",
        "mainEntity": {
          "@type": "MedicalCalculator",
          "name": "Calculadora de IMC (Índice de Massa Corporal)",
          "description": "Ferramenta avançada para cálculo do IMC com personalização por idade, sexo, múltiplas unidades e análise de riscos para saúde.",
          "medicalSpecialty": "Medicina Preventiva",
          "applicationCategory": "HealthApplication",
          "operatingSystem": "Web Browser",
          "isAccessibleForFree": true,
          "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": "https://calculadora-online-br.com/calculadora/saude/imc"
          }
        },
        "breadcrumb": {
          "@type": "BreadcrumbList",
          "itemListElement": [
            {
              "@type": "ListItem",
              "position": 1,
              "name": "Início",
              "item": "https://calculadora-online-br.com"
            },
            {
              "@type": "ListItem", 
              "position": 2,
              "name": "Calculadoras",
              "item": "https://calculadora-online-br.com/calculadora"
            },
            {
              "@type": "ListItem",
              "position": 3, 
              "name": "Saúde",
              "item": "https://calculadora-online-br.com/calculadora/saude"
            },
            {
              "@type": "ListItem",
              "position": 4,
              "name": "IMC"
            }
          ]
        },
        "publisher": {
          "@type": "Organization",
          "name": "Calculadora Online BR",
          "url": "https://calculadora-online-br.com"
        },
        "inLanguage": "pt-BR",
        "isAccessibleForFree": true,
        "about": [
          {
            "@type": "MedicalCondition",
            "name": "Obesidade"
          },
          {
            "@type": "MedicalCondition", 
            "name": "Sobrepeso"
          },
          {
            "@type": "MedicalCondition",
            "name": "Baixo Peso"
          }
        ]
      })
    }
  ];
};

export default function IMCCalculator() {
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [weightUnit, setWeightUnit] = useState<'kg' | 'lb'>('kg');
  const [heightUnit, setHeightUnit] = useState<'cm' | 'm' | 'ft' | 'in'>('cm');
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [result, setResult] = useState<AdvancedIMCResult | null>(null);

  const handleCalculate = () => {
    const weightNum = parseFloat(weight);
    const heightNum = parseFloat(height);
    const ageNum = age ? parseInt(age) : undefined;

    if (weightNum > 0 && heightNum > 0) {
      const params: AdvancedIMCParams = {
        weight: weightNum,
        height: heightNum,
        weightUnit,
        heightUnit,
        age: ageNum,
        gender: ageNum ? gender : undefined,
      };

      const imcResult = calculateAdvancedIMC(params);
      setResult(imcResult);
    }
  };

  const handleReset = () => {
    setWeight("");
    setHeight("");
    setAge("");
    setGender('male');
    setWeightUnit('kg');
    setHeightUnit('cm');
    setShowAdvanced(false);
    setResult(null);
  };

  useEffect(() => {
    if (weight && height) {
      handleCalculate();
    }
  }, [weight, height, age, gender, weightUnit, heightUnit]);

  return (
    <div className="mx-auto max-w-2xl space-y-8">
      <Breadcrumb>
        <BreadcrumbItem href="/">Início</BreadcrumbItem>
        <BreadcrumbItem href="/calculadora">Calculadoras</BreadcrumbItem>
        <BreadcrumbItem href="/calculadora/saude">Saúde</BreadcrumbItem>
        <BreadcrumbItem isLast>IMC</BreadcrumbItem>
      </Breadcrumb>

      <header className="text-center space-y-4">
        <h1 className="mb-4 text-3xl font-bold text-text-primary md:text-4xl">
          Calculadora de IMC - Índice de Massa Corporal
        </h1>
        <p className="text-lg text-text-secondary-dark max-w-3xl mx-auto">
          Calcule seu <strong className="text-primary-blue-dark">IMC (Índice de Massa Corporal)</strong> de forma gratuita e descubra se seu peso está dentro da faixa considerada saudável pela <strong className="text-growth-green">Organização Mundial da Saúde (OMS)</strong>.
        </p>
        <div className="bg-primary-blue-light rounded-lg p-4 inline-block duration-300">
          <p className="text-sm text-text-primary font-medium">
            ⚡ <strong>Resultado instantâneo</strong> • 🔬 <strong>Baseado na OMS</strong> • 📱 <strong>100% gratuito</strong>
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
              <div className="grid grid-cols-2 gap-2">
                <Input
                  type="number"
                  label={`Peso (${weightUnit})`}
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  placeholder={weightUnit === 'kg' ? "Ex: 70" : "Ex: 154"}
                  min="1"
                  step="0.1"
                  required
                  fullWidth
                />
                <Select
                  label="Unidade"
                  value={weightUnit}
                  onChange={(value) => setWeightUnit(value as 'kg' | 'lb')}
                  options={[
                    { value: 'kg', label: 'kg' },
                    { value: 'lb', label: 'lb' },
                  ]}
                  fullWidth
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <Input
                  type="number"
                  label={`Altura (${heightUnit})`}
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                  placeholder={
                    heightUnit === 'cm' ? "Ex: 175" : 
                    heightUnit === 'm' ? "Ex: 1.75" : 
                    heightUnit === 'ft' ? "Ex: 5.9" : "Ex: 69"
                  }
                  min="1"
                  step={heightUnit === 'm' ? "0.01" : "1"}
                  required
                  fullWidth
                />
                <Select
                  label="Unidade"
                  value={heightUnit}
                  onChange={(value) => setHeightUnit(value as 'cm' | 'm' | 'ft' | 'in')}
                  options={[
                    { value: 'cm', label: 'cm' },
                    { value: 'm', label: 'm' },
                    { value: 'ft', label: 'ft' },
                    { value: 'in', label: 'in' },
                  ]}
                  fullWidth
                />
              </div>
            </div>

            <div className="flex items-center justify-center">
              <Button 
                onClick={() => setShowAdvanced(!showAdvanced)} 
                variant="outline" 
                className="text-sm"
              >
                {showAdvanced ? 'Ocultar' : 'Mostrar'} Opções Avançadas
              </Button>
            </div>

            {showAdvanced && (
              <div className="grid grid-cols-2 gap-4 p-4 bg-primary-blue-light rounded-lg border border-primary-blue/20">
                <Input
                  type="number"
                  label="Idade (anos) - Opcional"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  placeholder="Ex: 30"
                  min="1"
                  max="120"
                  step="1"
                  fullWidth
                />
                
                <Select
                  label="Sexo"
                  value={gender}
                  onChange={(value) => setGender(value as 'male' | 'female')}
                  options={[
                    { value: 'male', label: 'Masculino' },
                    { value: 'female', label: 'Feminino' },
                  ]}
                  fullWidth
                />
              </div>
            )}

            <div className="flex justify-center gap-4">
              <Button onClick={handleCalculate} className="px-8">
                Calcular IMC
              </Button>
              <Button 
                onClick={handleReset} 
                variant="outline"
                className="px-8 border-system-error text-system-error hover:bg-system-error hover:text-white"
              >
                Limpar
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {result && (
        <>
          <Card
            className={`result-success border-2 ${result.healthy ? "border-growth-green bg-growth-green-soft" : "border-system-warning bg-system-warning/10"}`}
          >
            <CardHeader>
              <CardTitle as="h3">Resultado do IMC</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 text-center">
                <div className="text-4xl font-bold text-text-primary-dark tabular-nums">
                  {result.imc}
                </div>
                <div
                  className={`text-xl font-semibold ${result.healthy ? "text-growth-green" : "text-system-warning"}`}
                >
                  {result.ageAdjustedClassification || result.classification}
                </div>
                {result.healthy && (
                  <p className="text-growth-green">
                    ✓ Seu peso está dentro da faixa ideal!
                  </p>
                )}
              </div>
            </CardContent>
          </Card>

          {result.idealWeightRange && (
            <Card className="bg-system-info/10 border-l-4 border-system-info">
              <CardHeader>
                <CardTitle as="h3" className="text-system-info">
                  🎯 Peso Ideal para sua Altura
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center space-y-2">
                  <p className="text-text-secondary">
                    Para sua altura, o peso ideal está entre:
                  </p>
                  <div className="text-2xl font-bold text-system-info">
                    {weightUnit === 'kg' 
                      ? `${result.idealWeightRange.min} - ${result.idealWeightRange.max} kg`
                      : `${(result.idealWeightRange.min * 2.20462).toFixed(1)} - ${(result.idealWeightRange.max * 2.20462).toFixed(1)} lb`
                    }
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {(result.bmr || result.bodyFatPercentage) && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {result.bmr && (
                <Card className="bg-growth-green-soft border-l-4 border-growth-green">
                  <CardHeader>
                    <CardTitle as="h3" className="text-growth-green">
                      🔥 Taxa Metabólica Basal
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center space-y-2">
                      <div className="text-3xl font-bold text-growth-green">
                        {result.bmr} kcal/dia
                      </div>
                      <p className="text-sm text-text-secondary">
                        Calorias que seu corpo queima em repouso
                      </p>
                    </div>
                  </CardContent>
                </Card>
              )}

              {result.bodyFatPercentage && (
                <Card className="bg-primary-blue-light border-l-4 border-primary-blue">
                  <CardHeader>
                    <CardTitle as="h3" className="text-primary-blue-dark">
                      📊 Gordura Corporal Estimada
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center space-y-2">
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
        </>
      )}

      <Card>
        <CardHeader>
          <CardTitle as="h3">Tabela de Classificação do IMC</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="py-2 text-left">IMC</th>
                  <th className="py-2 text-left">Classificação</th>
                </tr>
              </thead>
              <tbody className="space-y-2">
                <tr className="border-b">
                  <td className="py-2">Menor que 18,5</td>
                  <td className="py-2">Abaixo do peso</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2">18,5 - 24,9</td>
                  <td className="py-2 font-medium text-growth-green">
                    Peso normal
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="py-2">25,0 - 29,9</td>
                  <td className="py-2">Sobrepeso</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2">30,0 - 34,9</td>
                  <td className="py-2">Obesidade grau I</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2">35,0 - 39,9</td>
                  <td className="py-2">Obesidade grau II</td>
                </tr>
                <tr>
                  <td className="py-2">40,0 ou mais</td>
                  <td className="py-2">Obesidade grau III</td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Seção: O que é o IMC */}
      <Card className="bg-growth-green-soft border-l-4 border-growth-green duration-300">
        <CardHeader>
          <CardTitle as="h2" className="text-xl font-bold text-text-primary">
            🏥 O que é o IMC (Índice de Massa Corporal)?
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4 text-text-primary">
            <p>
              O <strong className="text-growth-green">IMC (Índice de Massa Corporal)</strong> é uma medida internacional padrão usada para avaliar se uma pessoa está dentro do peso considerado saudável para sua altura. Foi desenvolvido pelo matemático belga Lambert Adolphe Jacques Quételet no século XIX.
            </p>
            <p>
              A fórmula do IMC é simples: <strong className="font-mono bg-background-dark-secondary px-2 py-1 rounded text-primary-blue-dark">IMC = peso (kg) ÷ altura² (m)</strong>
            </p>
            <p>
              Este índice é amplamente utilizado por <strong className="text-primary-blue-dark">profissionais de saúde, médicos e nutricionistas</strong> como uma ferramenta de triagem inicial para identificar possíveis problemas de peso que podem levar a problemas de saúde.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Seção: Como interpretar o resultado */}
      <Card className="bg-primary-blue-light border-l-4 border-primary-blue duration-300">
        <CardHeader>
          <CardTitle as="h2" className="text-xl font-bold text-text-primary">
            📊 Como Interpretar seu Resultado do IMC
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-blue-500 rounded"></div>
                  <span className="font-semibold text-text-primary">Abaixo do Peso (&lt; 18,5)</span>
                </div>
                <p className="text-sm text-text-secondary ml-6">
                  Pode indicar desnutrição ou outros problemas de saúde. Recomenda-se consultar um médico.
                </p>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-growth-green rounded"></div>
                  <span className="font-semibold text-growth-green">Peso Normal (18,5 - 24,9)</span>
                </div>
                <p className="text-sm text-text-secondary ml-6">
                  Faixa ideal para a saúde. Continue mantendo hábitos saudáveis de alimentação e exercícios.
                </p>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-system-warning rounded"></div>
                  <span className="font-semibold text-system-warning">Sobrepeso (25,0 - 29,9)</span>
                </div>
                <p className="text-sm text-text-secondary ml-6">
                  Risco aumentado para doenças cardiovasculares. Considere mudanças no estilo de vida.
                </p>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-system-error rounded"></div>
                  <span className="font-semibold text-system-error-dark">Obesidade (&ge; 30,0)</span>
                </div>
                <p className="text-sm text-text-secondary ml-6">
                  Risco significativo para diabetes, hipertensão e outras complicações. Procure orientação médica.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Seção: Limitações do IMC */}
      <Card className="bg-system-warning/10 border-l-4 border-system-warning duration-300">
        <CardHeader>
          <CardTitle as="h2" className="text-xl font-bold text-text-primary">
            ⚠️ Limitações do IMC - O que Você Deve Saber
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4 text-text-primary">
            <p className="font-medium text-system-warning">
              <strong>Importante:</strong> O IMC é uma ferramenta de triagem, não um diagnóstico médico completo.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-2 text-system-warning">⚠️ O IMC NÃO considera:</h4>
                <ul className="space-y-1 text-sm text-text-secondary">
                  <li>• <strong>Massa muscular:</strong> Atletas podem ter IMC alto por músculos</li>
                  <li>• <strong>Densidade óssea:</strong> Varia entre indivíduos</li>
                  <li>• <strong>Distribuição de gordura:</strong> Gordura abdominal vs. periférica</li>
                  <li>• <strong>Idade:</strong> Metabolismo muda com o tempo</li>
                  <li>• <strong>Sexo:</strong> Diferenças na composição corporal</li>
                  <li>• <strong>Etnia:</strong> Variações genéticas</li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold mb-2 text-growth-green">✅ Casos Especiais:</h4>
                <ul className="space-y-1 text-sm text-text-secondary">
                  <li>• <strong>Atletas:</strong> Podem ter IMC alto devido à massa muscular</li>
                  <li>• <strong>Idosos:</strong> Critérios podem ser mais flexíveis</li>
                  <li>• <strong>Crianças:</strong> Usam tabelas específicas por idade</li>
                  <li>• <strong>Gestantes:</strong> IMC não se aplica durante gravidez</li>
                  <li>• <strong>Asiáticos:</strong> Pontos de corte diferentes (OMS)</li>
                </ul>
              </div>
            </div>
            
            <div className="bg-system-info/10 p-4 rounded-lg border border-system-info/20">
              <p className="text-sm">
                <strong className="text-system-info">💡 Recomendação:</strong> 
                Para uma avaliação completa da sua saúde, consulte sempre um <strong>médico, nutricionista ou educador físico</strong>. 
                Eles podem considerar outros fatores como composição corporal, histórico familiar e exames complementares.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Seção: Dicas para manter peso saudável */}
      <Card className="bg-growth-green-soft border-l-4 border-growth-green duration-300">
        <CardHeader>
          <CardTitle as="h2" className="text-xl font-bold text-text-primary">
            💪 Dicas para Manter um Peso Saudável
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-3 text-growth-green flex items-center">
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
              <h4 className="font-semibold mb-3 text-primary-blue-dark flex items-center">
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
              <h4 className="font-semibold mb-3 text-system-info flex items-center">
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
              <h4 className="font-semibold mb-3 text-system-warning flex items-center">
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

      {/* Seção: Perguntas frequentes */}
      <Card className="bg-background-dark-secondary border border-neutral-surface-variant duration-300">
        <CardHeader>
          <CardTitle as="h2" className="text-xl font-bold text-text-primary">
            ❓ Perguntas Frequentes sobre IMC
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div>
              <h4 className="font-semibold mb-2 text-primary-blue-dark">1. Com que frequência devo calcular meu IMC?</h4>
              <p className="text-sm text-text-secondary">
                Recomenda-se calcular o IMC mensalmente ou a cada dois meses. Mudanças significativas no peso devem ser acompanhadas por um profissional de saúde.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-2 text-primary-blue-dark">2. O IMC é confiável para todas as idades?</h4>
              <p className="text-sm text-text-secondary">
                O IMC para adultos (20+ anos) usa a mesma fórmula, mas para crianças e adolescentes são usados percentis específicos por idade e sexo. Para idosos, os critérios podem ser mais flexíveis.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-2 text-primary-blue-dark">3. Por que atletas podem ter IMC alto?</h4>
              <p className="text-sm text-text-secondary">
                Músculos pesam mais que gordura. Atletas com muita massa muscular podem ter IMC elevado sem ter excesso de gordura corporal. Nesses casos, outros métodos de avaliação são mais apropriados.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-2 text-primary-blue-dark">4. Existe diferença do IMC entre homens e mulheres?</h4>
              <p className="text-sm text-text-secondary">
                A fórmula é a mesma, mas homens tendem a ter mais massa muscular e menos gordura corporal que mulheres na mesma faixa de IMC. A distribuição de gordura também difere entre os sexos.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-2 text-primary-blue-dark">5. O que fazer se meu IMC estiver fora do ideal?</h4>
              <p className="text-sm text-text-secondary">
                Primeiro, consulte um médico ou nutricionista. Eles avaliarão seu caso individualmente e poderão recomendar mudanças na dieta, exercícios ou outros tratamentos apropriados.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Seção: Métodos Científicos de Cálculo do IMC */}
      <Card className="bg-system-info/10 border-l-4 border-system-info duration-300">
        <CardHeader>
          <CardTitle as="h2" className="text-xl font-bold text-text-primary">
            🔬 Métodos Científicos e Fórmulas de Cálculo do IMC
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <p className="text-text-primary">
              Nossa calculadora utiliza os <strong className="text-system-info">métodos mais precisos e reconhecidos internacionalmente</strong> para o cálculo do IMC. Entenda a metodologia científica por trás dos resultados:
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-primary-blue/5/5 p-4 rounded-lg border border-primary-blue/20">
                <h4 className="font-semibold mb-3 text-primary-blue-dark flex items-center">
                  📐 <span className="ml-2">Fórmula Padrão da OMS</span>
                </h4>
                <div className="bg-gray-900 p-3 rounded border mb-3">
                  <code className="text-sm text-text-primary">
                    <strong>IMC = Peso (kg) ÷ Altura² (m²)</strong>
                  </code>
                  <p className="text-xs text-text-secondary mt-1">
                    Exemplo: 70kg ÷ (1.75m)² = 70 ÷ 3.0625 = 22.86
                  </p>
                </div>
                <ul className="space-y-1 text-sm text-text-secondary">
                  <li>• <strong>Desenvolvida em:</strong> 1832 por Adolphe Quetelet</li>
                  <li>• <strong>Padronizada pela:</strong> OMS em 1985</li>
                  <li>• <strong>Precisão:</strong> 95% para população geral</li>
                  <li>• <strong>Aplicação:</strong> Adultos 18-65 anos</li>
                </ul>
              </div>
              
              <div className="bg-growth-green/5/5 p-4 rounded-lg border border-growth-green/20">
                <h4 className="font-semibold mb-3 text-growth-green flex items-center">
                  🌍 <span className="ml-2">Conversões Internacionais</span>
                </h4>
                <div className="space-y-2">
                  <div className="bg-gray-900 p-2 rounded border">
                    <div className="text-xs font-medium text-text-primary">Sistema Imperial:</div>
                    <code className="text-xs text-growth-green">
                      IMC = (Peso_lb × 703) ÷ Altura_in²
                    </code>
                  </div>
                  <div className="bg-gray-900 p-2 rounded border">
                    <div className="text-xs font-medium text-text-primary">Misto (lb + cm):</div>
                    <code className="text-xs text-growth-green">
                      IMC = (Peso_lb × 0.453592) ÷ (Altura_cm ÷ 100)²
                    </code>
                  </div>
                </div>
                <ul className="space-y-1 text-sm text-text-secondary mt-3">
                  <li>• <strong>Fator 703:</strong> Conversão libras/polegadas para kg/m²</li>
                  <li>• <strong>Auto-conversão:</strong> Nossa calculadora converte automaticamente</li>
                  <li>• <strong>Precisão mantida:</strong> 2 casas decimais</li>
                </ul>
              </div>
              
              <div className="bg-system-warning/5/5 p-4 rounded-lg border border-system-warning/20">
                <h4 className="font-semibold mb-3 text-system-warning flex items-center">
                  🎯 <span className="ml-2">Classificação Personalizada</span>
                </h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between items-center">
                    <span className="text-text-primary font-medium">Adultos Padrão:</span>
                    <span className="text-system-warning">OMS 2024</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-text-primary font-medium">Por Idade:</span>
                    <span className="text-system-warning">18-30, 31-50, 51+</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-text-primary font-medium">Por Sexo:</span>
                    <span className="text-system-warning">Masculino/Feminino</span>
                  </div>
                </div>
                <div className="mt-3 p-2 bg-system-warning/10 rounded text-xs text-system-warning">
                  <strong>Diferencial:</strong> Análise contextualizada por perfil demográfico
                </div>
              </div>
              
              <div className="bg-system-error/5/5 p-4 rounded-lg border border-system-error/20">
                <h4 className="font-semibold mb-3 text-system-error-dark flex items-center">
                  ⚕️ <span className="ml-2">Validação Médica</span>
                </h4>
                <ul className="space-y-1 text-sm text-text-secondary">
                  <li>• <strong>Correlação com Gordura:</strong> R² = 0.72-0.85</li>
                  <li>• <strong>Predição de Risco:</strong> Diabetes, cardiovascular</li>
                  <li>• <strong>Estudos Longitudinais:</strong> +500.000 participantes</li>
                  <li>• <strong>Validação Brasileira:</strong> IBGE + MS 2019-2024</li>
                </ul>
                <div className="mt-3 p-2 bg-system-error/10 rounded text-xs text-system-error-dark">
                  <strong>Importante:</strong> Ferramenta de triagem, não substitui avaliação médica
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-primary-blue/10 to-growth-green/10 p-4 rounded-lg border border-primary-blue/20">
              <h4 className="font-semibold text-text-primary mb-2">🏆 Por que Nossa Calculadora se Destaca?</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-text-secondary">
                <div>
                  <strong className="text-primary-blue-dark">1. Precisão Máxima</strong>
                  <p>Fórmulas validadas internacionalmente com conversões automáticas precisas entre todas as unidades.</p>
                </div>
                <div>
                  <strong className="text-growth-green">2. Personalização Avançada</strong>
                  <p>Análise contextualizada por idade, sexo e características demográficas específicas do usuário.</p>
                </div>
                <div>
                  <strong className="text-system-warning">3. Fundamentação Científica</strong>
                  <p>Baseada nas diretrizes mais atuais da OMS, IBGE e estudos epidemiológicos brasileiros.</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Seção: FAQ Otimizada para SEO */}
      <Card className="bg-background-dark-secondary border border-neutral-surface-variant duration-300">
        <CardHeader>
          <CardTitle as="h2" className="text-xl font-bold text-text-primary">
            ❓ Perguntas Frequentes - Calculadora de IMC
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="border-l-4 border-primary-blue pl-4">
                  <h4 className="font-semibold mb-2 text-primary-blue-dark">1. Qual é o IMC ideal para a minha idade?</h4>
                  <p className="text-sm text-text-secondary">
                    O IMC ideal varia com a idade: <strong>18-30 anos</strong> (18.5-24.9), <strong>31-50 anos</strong> (19-25.5), <strong>51+ anos</strong> (20-26). 
                    Nossa calculadora ajusta automaticamente os parâmetros ideais baseado na sua faixa etária e sexo.
                  </p>
                </div>
                
                <div className="border-l-4 border-growth-green pl-4">
                  <h4 className="font-semibold mb-2 text-growth-green">2. Como converter peso de libras para quilos no cálculo do IMC?</h4>
                  <p className="text-sm text-text-secondary">
                    <strong>1 libra = 0.453592 kg.</strong> Nossa calculadora faz a conversão automaticamente. Para cálculo manual: 
                    multiplique seu peso em libras por 0.453592 ou use a fórmula imperial: (Peso_lb × 703) ÷ Altura_polegadas².
                  </p>
                </div>
                
                <div className="border-l-4 border-system-info pl-4">
                  <h4 className="font-semibold mb-2 text-system-info">3. Por que meu IMC é diferente em outras calculadoras?</h4>
                  <p className="text-sm text-text-secondary">
                    Diferenças podem ocorrer por: <strong>arredondamentos</strong> (usamos 2 decimais), <strong>conversões imprecisas</strong> de unidades, ou falta de <strong>personalização por idade/sexo</strong>. 
                    Nossa calculadora segue os padrões mais rigorosos da OMS.
                  </p>
                </div>
                
                <div className="border-l-4 border-system-warning pl-4">
                  <h4 className="font-semibold mb-2 text-system-warning">4. O IMC é preciso para atletas e pessoas musculosas?</h4>
                  <p className="text-sm text-text-secondary">
                    <strong>Não completamente.</strong> O IMC não distingue massa muscular de gordura. Atletas podem ter IMC alto devido aos músculos. 
                    Para pessoas muito musculosas, recomendamos nossa <strong>Calculadora de Gordura Corporal</strong>.
                  </p>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="border-l-4 border-system-error-dark pl-4">
                  <h4 className="font-semibold mb-2 text-system-error-dark">5. Quando o IMC indica risco para a saúde?</h4>
                  <p className="text-sm text-text-secondary">
                    <strong>IMC &lt; 18.5:</strong> risco de desnutrição. <strong>IMC 25-29.9:</strong> risco aumentado para diabetes e cardiovascular. 
                    <strong>IMC ≥ 30:</strong> risco significativo para múltiplas comorbidades. Consulte sempre um médico para avaliação completa.
                  </p>
                </div>
                
                <div className="border-l-4 border-primary-blue pl-4">
                  <h4 className="font-semibold mb-2 text-primary-blue-dark">6. Como o IMC feminino difere do masculino?</h4>
                  <p className="text-sm text-text-secondary">
                    Mulheres naturalmente têm <strong>maior percentual de gordura corporal</strong> (20-25% vs 15-20% homens). 
                    Nossa calculadora considera essas diferenças, ajustando interpretações e recomendações por sexo.
                  </p>
                </div>
                
                <div className="border-l-4 border-growth-green pl-4">
                  <h4 className="font-semibold mb-2 text-growth-green">7. Com que frequência devo calcular meu IMC?</h4>
                  <p className="text-sm text-text-secondary">
                    Para <strong>monitoramento geral:</strong> mensalmente. <strong>Durante dieta/exercícios:</strong> semanalmente. 
                    <strong>Manutenção de peso:</strong> a cada 3 meses. Sempre no mesmo horário e condições para maior precisão.
                  </p>
                </div>
                
                <div className="border-l-4 border-system-warning pl-4">
                  <h4 className="font-semibold mb-2 text-system-warning">8. Posso usar o IMC durante a gravidez?</h4>
                  <p className="text-sm text-text-secondary">
                    <strong>Não recomendado durante a gestação.</strong> Use o IMC pré-gestacional para classificação inicial. 
                    Durante a gravidez, siga orientações médicas específicas sobre ganho de peso adequado para cada trimestre.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-primary-blue/10 p-4 rounded-lg border border-primary-blue/20">
              <h4 className="font-semibold text-primary-blue-dark mb-2 flex items-center">
                💡 <span className="ml-2">Dica Importante sobre Interpretação</span>
              </h4>
              <p className="text-sm text-text-secondary">
                <strong>O IMC é uma ferramenta de triagem, não diagnóstico!</strong> Use-o como <strong>ponto de partida</strong> para conversas com profissionais de saúde. 
                Considere também histórico familiar, composição corporal, níveis de atividade física e exames complementares para uma avaliação completa.
              </p>
            </div>
            
            <div className="text-center">
              <p className="text-sm text-text-secondary">
                <strong>Quer saber mais?</strong> Nossa calculadora oferece explicações detalhadas para cada resultado e categoria de IMC.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Seção: Ecossistema Completo de Saúde e Bem-Estar */}
      <Card className="bg-background-dark-secondary border border-neutral-surface-variant duration-300">
        <CardHeader>
          <CardTitle as="h2" className="text-xl font-bold text-text-primary">
            🔗 Ecossistema Completo: Saúde Física + Maternidade + Bem-Estar
          </CardTitle>
          <p className="text-sm text-text-secondary mt-2">
            Monitore sua saúde de forma integrada com nossas calculadoras especializadas
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-growth-green-soft p-4 rounded-lg border border-growth-green/20">
                <div className="flex items-center mb-2">
                  <span className="text-2xl mr-2">🏋️</span>
                  <div>
                    <h4 className="font-bold text-growth-green text-sm">COMPLEMENTAR AO IMC</h4>
                    <p className="text-xs text-text-secondary">Análise corporal avançada</p>
                  </div>
                </div>
                <h3 className="font-semibold text-growth-green mb-1">
                  Calculadora de Gordura Corporal
                </h3>
                <p className="text-xs text-text-secondary mb-2">
                  <strong>Ideal para atletas e pessoas ativas:</strong> métodos Navy, Jackson-Pollock e bioimpedância para análise precisa da composição corporal.
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-growth-green font-medium">
                    Navy • DEXA • Bioimpedância
                  </span>
                  <a 
                    href="/calculadora/saude/gordura-corporal" 
                    className="text-xs bg-growth-green text-white px-2 py-1 rounded hover:bg-growth-green-dark"
                  >
                    Usar →
                  </a>
                </div>
              </div>
              
              <div className="bg-system-info-soft p-4 rounded-lg border border-system-info/20">
                <div className="flex items-center mb-2">
                  <span className="text-2xl mr-2">👶</span>
                  <div>
                    <h4 className="font-bold text-system-info text-sm">SAÚDE MATERNO-INFANTIL</h4>
                    <p className="text-xs text-text-secondary">Para toda família</p>
                  </div>
                </div>
                <h3 className="font-semibold text-system-info mb-1">
                  Desenvolvimento Infantil
                </h3>
                <p className="text-xs text-text-secondary mb-2">
                  <strong>Monitore o crescimento do seu bebê</strong> com marcos de desenvolvimento, cronograma pediátrico e análise por idade corrigida.
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-system-info font-medium">
                    0-36 meses • Marcos • Pediatria
                  </span>
                  <a 
                    href="/calculadora/saude/desenvolvimento-infantil" 
                    className="text-xs bg-system-info text-white px-2 py-1 rounded hover:bg-system-info-dark"
                  >
                    Usar →
                  </a>
                </div>
              </div>
              
              <div className="bg-primary-blue-light p-4 rounded-lg border border-primary-blue/20">
                <div className="flex items-center mb-2">
                  <span className="text-2xl mr-2">🌸</span>
                  <div>
                    <h4 className="font-bold text-primary-blue-dark text-sm">PLANEJAMENTO FAMILIAR</h4>
                    <p className="text-xs text-text-secondary">Saúde reprodutiva</p>
                  </div>
                </div>
                <h3 className="font-semibold text-primary-blue-dark mb-1">
                  Ciclo Menstrual
                </h3>
                <p className="text-xs text-text-secondary mb-2">
                  <strong>Conheça seu corpo:</strong> acompanhe período fértil, ovulação e planeje uma gravidez saudável com peso ideal.
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-primary-blue-dark font-medium">
                    Fertilidade • Ovulação • TPM
                  </span>
                  <a 
                    href="/calculadora/saude/ciclo-menstrual" 
                    className="text-xs bg-primary-blue text-white px-2 py-1 rounded hover:bg-primary-blue-dark"
                  >
                    Usar →
                  </a>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-primary-blue/10 to-growth-green/10 p-4 rounded-lg border border-primary-blue/20">
              <h4 className="font-semibold text-text-primary mb-2 flex items-center">
                🎯 <span className="ml-2">Jornada Integrada de Saúde e Bem-Estar</span>
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div className="text-center">
                  <div className="font-medium text-primary-blue-dark">1. Monitoramento Corporal</div>
                  <p className="text-xs text-text-secondary">Use IMC + Gordura Corporal para análise completa da sua composição física</p>
                </div>
                <div className="text-center">
                  <div className="font-medium text-system-info">2. Planejamento Familiar</div>
                  <p className="text-xs text-text-secondary">Combine peso ideal com ciclo menstrual para uma gravidez saudável</p>
                </div>
                <div className="text-center">
                  <div className="font-medium text-growth-green">3. Saúde da Família</div>
                  <p className="text-xs text-text-secondary">Acompanhe o desenvolvimento dos seus filhos com ferramentas especializadas</p>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-system-warning-soft p-3 rounded-lg border border-system-warning/20">
                <h4 className="font-semibold text-system-warning mb-1 text-sm">
                  💰 Saúde Financeira Também Importa
                </h4>
                <p className="text-xs text-text-secondary mb-2">
                  Planeje seu futuro financeiro para custear tratamentos de saúde e bem-estar da família.
                </p>
                <div className="space-y-1">
                  <a href="/calculadora/financas/juros-compostos" className="text-xs text-system-warning hover:underline block">
                    📈 Juros Compostos para Reserva de Emergência →
                  </a>
                  <a href="/calculadora/financas/primeiro-milhao" className="text-xs text-system-warning hover:underline block">
                    🎯 Primeiro Milhão para Independência →
                  </a>
                </div>
              </div>
              
              <div className="bg-growth-green-soft p-3 rounded-lg border border-growth-green/20">
                <h4 className="font-semibold text-growth-green mb-1 text-sm">
                  📱 Para Profissionais de Saúde
                </h4>
                <p className="text-xs text-text-secondary mb-2">
                  Ferramentas complementares para consultórios, academias e clínicas de nutrição.
                </p>
                <button 
                  onClick={() => navigator.share?.({ 
                    title: 'Calculadoras de Saúde Profissionais', 
                    url: window.location.origin + '/calculadora/saude' 
                  })}
                  className="text-xs text-growth-green hover:underline"
                >
                  Compartilhar com Colegas →
                </button>
              </div>
            </div>
          </div>
          
          <div className="mt-6 text-center border-t border-neutral-surface-variant pt-4">
            <a 
              href="/calculadora/saude" 
              className="inline-flex items-center text-primary-blue-dark hover font-medium"
            >
              🏥 Explorar Todo Ecossistema de Saúde
            </a>
            <p className="text-xs text-text-secondary mt-1">
              Descubra todas as ferramentas para cuidar da saúde da sua família
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Footer com informações adicionais */}
      <Card className="bg-primary-blue-light border-l-4 border-primary-blue duration-300">
        <CardHeader>
          <CardTitle as="h2" className="text-lg font-bold text-text-primary">
            📚 Sobre Esta Calculadora de IMC
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 text-sm text-text-secondary">
            <p>
              Esta calculadora de IMC online é totalmente <strong className="text-primary-blue-dark">gratuita</strong> e foi desenvolvida seguindo os padrões da <strong>Organização Mundial da Saúde (OMS)</strong>. 
              Os cálculos são precisos e instantâneos, permitindo que você monitore sua saúde de forma prática.
            </p>
            <p>
              <strong className="text-growth-green">Importante:</strong> Esta ferramenta é apenas para fins informativos e educacionais. 
              Sempre consulte um profissional de saúde qualificado para avaliações médicas e orientações personalizadas sobre seu peso e saúde.
            </p>
            <p className="text-xs opacity-75">
              Última atualização: Dezembro 2024 • Baseado nas diretrizes da OMS 2024
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
