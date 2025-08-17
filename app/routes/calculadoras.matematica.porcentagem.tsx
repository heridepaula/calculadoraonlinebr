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
import { calculatePercentage, calculatePercentageOf } from "~/utils/calculations";
import { useAutoCalculatorTracking, useFormTracking } from "~/hooks/useAutoCalculatorTracking";

export const meta: MetaFunction = () => {
  return [
    { title: `Calculadora de Porcentagem Online Gratuita - Fácil e Precisa - ${APP_NAME}` },
    {
      name: "description",
      content:
        "Calculadora de porcentagem online gratuita e precisa. Calcule descontos, aumentos, juros e percentuais facilmente. Descubra quanto é X% de um valor ou que porcentagem representa um número. Resultados instantâneos!",
    },
    {
      name: "keywords",
      content:
        "calculadora porcentagem, calcular porcentagem, desconto, aumento, percentual, porcentagem online, cálculo percentual, matemática, regra de três, porcentagem de um valor",
    },
    { name: "author", content: "Calculadora Online BR" },
    {
      property: "og:title",
      content: `Calculadora de Porcentagem - Descontos e Aumentos - ${APP_NAME}`,
    },
    {
      property: "og:description",
      content:
        "Calcule porcentagens, descontos e aumentos de forma rápida e gratuita. Ferramenta essencial para compras, negócios e estudos.",
    },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary" },
    { name: "twitter:title", content: `Calculadora de Porcentagem Online Gratuita - ${APP_NAME}` },
    {
      name: "twitter:description",
      content:
        "Calcule porcentagens, descontos e aumentos facilmente. Resultados precisos e instantâneos.",
    },
  ];
};

export default function PercentageCalculator() {
  const [value, setValue] = useState("");
  const [percentage, setPercentage] = useState("");
  const [part, setPart] = useState("");
  const [total, setTotal] = useState("");
  const [result1, setResult1] = useState<number | null>(null);
  const [result2, setResult2] = useState<number | null>(null);
  const [errors1, setErrors1] = useState<{ value?: string; percentage?: string }>({});
  const [errors2, setErrors2] = useState<{ part?: string; total?: string }>({});

  // Global Analytics Tracking
  const { 
    startCalculation, 
    endCalculation, 
    trackFeature, 
    trackButtonClick,
    trackStepsToggle,
    trackInputFocus 
  } = useAutoCalculatorTracking({ 
    calculatorType: "porcentagem",
    category: "matematica"
  });
  
  const { trackInputChange, trackFormSubmission } = useFormTracking("porcentagem");

  const handleCalculatePercentage = () => {
    const valueNum = parseFloat(value);
    const percentageNum = parseFloat(percentage);

    // Reset errors
    setErrors1({});

    // Validation
    const newErrors: { value?: string; percentage?: string } = {};

    if (!value || isNaN(valueNum)) {
      newErrors.value = "Por favor, insira um valor válido";
    }

    if (!percentage || isNaN(percentageNum)) {
      newErrors.percentage = "Por favor, insira uma porcentagem válida";
    } else if (percentageNum < 0) {
      newErrors.percentage = "A porcentagem não pode ser negativa";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors1(newErrors);
      setResult1(null);
      return;
    }

    // If validation passes, calculate
    const calc = calculatePercentage(valueNum, percentageNum);
    setResult1(calc.result);
  };

  const handleCalculatePercentageOf = () => {
    const partNum = parseFloat(part);
    const totalNum = parseFloat(total);

    // Reset errors
    setErrors2({});

    // Validation
    const newErrors: { part?: string; total?: string } = {};

    if (!part || isNaN(partNum)) {
      newErrors.part = "Por favor, insira um valor parcial válido";
    }

    if (!total || isNaN(totalNum)) {
      newErrors.total = "Por favor, insira um valor total válido";
    } else if (totalNum === 0) {
      newErrors.total = "O valor total não pode ser zero";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors2(newErrors);
      setResult2(null);
      return;
    }

    // If validation passes, calculate
    const result = calculatePercentageOf(partNum, totalNum);
    setResult2(result);
  };

  const handleReset = () => {
    setValue("");
    setPercentage("");
    setPart("");
    setTotal("");
    setResult1(null);
    setResult2(null);
    setErrors1({});
    setErrors2({});
  };

  return (
    <div className="mx-auto max-w-2xl space-y-8 px-4 md:max-w-4xl lg:max-w-6xl">
      <Breadcrumb>
        <BreadcrumbItem href="/">Início</BreadcrumbItem>
        <BreadcrumbItem href="/calculadoras">Calculadoras</BreadcrumbItem>
        <BreadcrumbItem href="/calculadoras/matematica">Matemática</BreadcrumbItem>
        <BreadcrumbItem isLast>Porcentagem</BreadcrumbItem>
      </Breadcrumb>

      <div className="flex flex-col items-center space-y-8">
        <header className="space-y-4 text-center">
          <h1 className="mb-4 text-3xl font-bold text-text-primary md:text-4xl">
            Calculadora de Porcentagem Online
          </h1>
          <p className="mx-auto max-w-3xl text-lg text-text-secondary-dark">
            Calcule{" "}
            <strong className="text-primary-blue-dark">porcentagens, descontos e aumentos</strong>{" "}
            de forma rápida e precisa. Ferramenta essencial para{" "}
            <strong className="text-growth-green">compras, negócios e estudos</strong>.
          </p>
          <div className="inline-block rounded-lg bg-primary-blue-light p-4 duration-300">
            <p className="text-sm font-medium text-text-primary">
              ⚡ <strong>Cálculo instantâneo</strong> • 📋 <strong>Múltiplas funções</strong> • 💰{" "}
              <strong>Ideal para finanças</strong>
            </p>
          </div>
        </header>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle as="h2">Calcular X% de um valor</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-3">
                  <p className="text-sm font-medium text-text-primary">
                    Quanto é <strong>X%</strong> de um valor?
                  </p>
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    <div>
                      <Input
                        type="number"
                        label="Porcentagem (%)"
                        value={percentage}
                        onChange={(e) => setPercentage(e.target.value)}
                        placeholder="Ex: 20"
                        step="0.01"
                        fullWidth
                        className={errors1.percentage ? "border-red-500" : ""}
                      />
                      {errors1.percentage && (
                        <p className="mt-1 text-sm text-red-500">{errors1.percentage}</p>
                      )}
                    </div>
                    <div>
                      <Input
                        type="number"
                        label="Valor total"
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                        placeholder="Ex: 100"
                        step="0.01"
                        fullWidth
                        className={errors1.value ? "border-red-500" : ""}
                      />
                      {errors1.value && (
                        <p className="mt-1 text-sm text-red-500">{errors1.value}</p>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex justify-center">
                  <Button onClick={handleCalculatePercentage} className="px-8">
                    Calcular
                  </Button>
                </div>

                {result1 !== null && (
                  <div className="rounded-lg border-l-4 border-primary-blue bg-primary-blue-light p-4 text-center duration-300">
                    <p className="mb-1 text-sm text-text-secondary">Resultado:</p>
                    <p className="text-2xl font-bold tabular-nums text-primary-blue-dark">
                      {result1}
                    </p>
                    {percentage && value && (
                      <p className="mt-1 text-sm text-text-secondary">
                        {percentage}% de {value} = {result1}
                      </p>
                    )}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle as="h2">Que % um valor representa</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-3">
                  <p className="text-sm font-medium text-text-primary">
                    Que <strong>porcentagem</strong> um valor representa?
                  </p>
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    <div>
                      <Input
                        type="number"
                        label="Valor parcial"
                        value={part}
                        onChange={(e) => setPart(e.target.value)}
                        placeholder="Ex: 25"
                        step="0.01"
                        fullWidth
                        className={errors2.part ? "border-red-500" : ""}
                      />
                      {errors2.part && <p className="mt-1 text-sm text-red-500">{errors2.part}</p>}
                    </div>
                    <div>
                      <Input
                        type="number"
                        label="Valor total"
                        value={total}
                        onChange={(e) => setTotal(e.target.value)}
                        placeholder="Ex: 100"
                        step="0.01"
                        fullWidth
                        className={errors2.total ? "border-red-500" : ""}
                      />
                      {errors2.total && (
                        <p className="mt-1 text-sm text-red-500">{errors2.total}</p>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex justify-center">
                  <Button onClick={handleCalculatePercentageOf} className="px-8">
                    Calcular
                  </Button>
                </div>

                {result2 !== null && (
                  <div className="rounded-lg border-l-4 border-growth-green bg-growth-green-soft p-4 text-center duration-300">
                    <p className="mb-1 text-sm text-text-secondary">Resultado:</p>
                    <p className="text-2xl font-bold tabular-nums text-growth-green">{result2}%</p>
                    {part && total && (
                      <p className="mt-1 text-sm text-text-secondary">
                        {part} é {result2}% de {total}
                      </p>
                    )}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="text-center">
          <Button
            onClick={handleReset}
            variant="outline"
            className="border-system-error px-8 text-system-error hover:bg-system-error hover:text-white"
          >
            Limpar Todos os Campos
          </Button>
        </div>

        {/* Seção: O que é Porcentagem */}
        <Card className="border-l-4 border-growth-green bg-growth-green-soft duration-300">
          <CardHeader>
            <CardTitle as="h2" className="text-xl font-bold text-text-primary">
              📊 O que é Porcentagem e Como Calcular?
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 text-text-primary">
              <p>
                <strong className="text-growth-green">Porcentagem</strong> (símbolo: %) é uma forma
                de expressar uma proporção ou fração de um total como um número entre 0 e 100. A
                palavra "por cento" significa literalmente "por cem" ou "a cada cem".
              </p>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <h4 className="mb-2 font-semibold text-primary-blue-dark">
                    🔢 Fórmulas Básicas:
                  </h4>
                  <div className="space-y-2 rounded-lg bg-background-dark-secondary p-4 text-sm">
                    <p>
                      <strong>Calcular X% de um valor:</strong>
                    </p>
                    <p className="font-mono text-primary-blue-dark">
                      Resultado = (Valor × Porcentagem) ÷ 100
                    </p>
                    <p>
                      <strong>Descobrir que % é um valor:</strong>
                    </p>
                    <p className="font-mono text-primary-blue-dark">
                      Porcentagem = (Parte ÷ Total) × 100
                    </p>
                  </div>
                </div>
                <div>
                  <h4 className="mb-2 font-semibold text-growth-green">🎯 Aplicações Práticas:</h4>
                  <ul className="space-y-1 text-sm text-text-secondary">
                    <li>
                      • <strong>Descontos em compras</strong>
                    </li>
                    <li>
                      • <strong>Cálculo de impostos e taxas</strong>
                    </li>
                    <li>
                      • <strong>Aumentos salariais</strong>
                    </li>
                    <li>
                      • <strong>Rendimentos de investimentos</strong>
                    </li>
                    <li>
                      • <strong>Notas e aproveitamento escolar</strong>
                    </li>
                    <li>
                      • <strong>Estatísticas e pesquisas</strong>
                    </li>
                    <li>
                      • <strong>Crescimento empresarial</strong>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Seção: Exemplos Práticos Detalhados */}
        <Card className="border-l-4 border-primary-blue bg-primary-blue-light duration-300">
          <CardHeader>
            <CardTitle as="h2" className="text-xl font-bold text-text-primary">
              💼 Exemplos Práticos de Cálculos de Porcentagem
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              <div className="space-y-4">
                <div className="rounded-lg border border-neutral-surface-variant bg-background-dark-secondary p-4">
                  <h4 className="mb-2 flex items-center font-semibold text-growth-green">
                    💰 <span className="ml-2">Desconto em Compras</span>
                  </h4>
                  <div className="space-y-2 text-sm text-text-secondary">
                    <p>
                      <strong>Situação:</strong> Produto de R$ 250,00 com 30% de desconto
                    </p>
                    <p>
                      <strong>Cálculo:</strong> 30% de 250 = (30 × 250) ÷ 100 = 75
                    </p>
                    <p>
                      <strong>Desconto:</strong> R$ 75,00
                    </p>
                    <p className="font-semibold text-growth-green">
                      <strong>Preço final:</strong> R$ 175,00
                    </p>
                  </div>
                </div>

                <div className="rounded-lg border border-neutral-surface-variant bg-background-dark-secondary p-4">
                  <h4 className="mb-2 flex items-center font-semibold text-primary-blue-dark">
                    📈 <span className="ml-2">Aumento Salarial</span>
                  </h4>
                  <div className="space-y-2 text-sm text-text-secondary">
                    <p>
                      <strong>Situação:</strong> Salário de R$ 3.000 com aumento de 12%
                    </p>
                    <p>
                      <strong>Cálculo:</strong> 12% de 3000 = (12 × 3000) ÷ 100 = 360
                    </p>
                    <p>
                      <strong>Aumento:</strong> R$ 360,00
                    </p>
                    <p className="font-semibold text-primary-blue-dark">
                      <strong>Novo salário:</strong> R$ 3.360,00
                    </p>
                  </div>
                </div>

                <div className="rounded-lg border border-neutral-surface-variant bg-background-dark-secondary p-4">
                  <h4 className="mb-2 flex items-center font-semibold text-system-info">
                    📊 <span className="ml-2">Aproveitamento Escolar</span>
                  </h4>
                  <div className="space-y-2 text-sm text-text-secondary">
                    <p>
                      <strong>Situação:</strong> Acertou 42 questões de 50 em uma prova
                    </p>
                    <p>
                      <strong>Cálculo:</strong> (42 ÷ 50) × 100 = 84%
                    </p>
                    <p className="font-semibold text-system-info">
                      <strong>Aproveitamento:</strong> 84%
                    </p>
                    <p>
                      <strong>Resultado:</strong> Aprovado com ótima nota!
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="rounded-lg border border-neutral-surface-variant bg-background-dark-secondary p-4">
                  <h4 className="mb-2 flex items-center font-semibold text-system-warning">
                    🏦 <span className="ml-2">Juros e Impostos</span>
                  </h4>
                  <div className="space-y-2 text-sm text-text-secondary">
                    <p>
                      <strong>Situação:</strong> Compra de R$ 1.500 com 8% de juros
                    </p>
                    <p>
                      <strong>Cálculo:</strong> 8% de 1500 = (8 × 1500) ÷ 100 = 120
                    </p>
                    <p>
                      <strong>Juros:</strong> R$ 120,00
                    </p>
                    <p className="font-semibold text-system-warning">
                      <strong>Valor total:</strong> R$ 1.620,00
                    </p>
                  </div>
                </div>

                <div className="rounded-lg border border-neutral-surface-variant bg-background-dark-secondary p-4">
                  <h4 className="mb-2 flex items-center font-semibold text-growth-green">
                    💹 <span className="ml-2">Rendimento de Investimento</span>
                  </h4>
                  <div className="space-y-2 text-sm text-text-secondary">
                    <p>
                      <strong>Situação:</strong> Investimento de R$ 5.000 rendeu R$ 650
                    </p>
                    <p>
                      <strong>Cálculo:</strong> (650 ÷ 5000) × 100 = 13%
                    </p>
                    <p className="font-semibold text-growth-green">
                      <strong>Rentabilidade:</strong> 13%
                    </p>
                    <p>
                      <strong>Resultado:</strong> Excelente retorno sobre investimento!
                    </p>
                  </div>
                </div>

                <div className="rounded-lg border border-neutral-surface-variant bg-background-dark-secondary p-4">
                  <h4 className="mb-2 flex items-center font-semibold text-system-error-dark">
                    📋 <span className="ml-2">Meta de Vendas</span>
                  </h4>
                  <div className="space-y-2 text-sm text-text-secondary">
                    <p>
                      <strong>Situação:</strong> Vendeu R$ 18.000 de meta R$ 20.000
                    </p>
                    <p>
                      <strong>Cálculo:</strong> (18000 ÷ 20000) × 100 = 90%
                    </p>
                    <p className="font-semibold text-system-error-dark">
                      <strong>Meta atingida:</strong> 90%
                    </p>
                    <p>
                      <strong>Faltam:</strong> R$ 2.000 (10%) para atingir 100%
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Seção: Dicas e Truques */}
        <Card className="border-l-4 border-growth-green bg-growth-green-soft duration-300">
          <CardHeader>
            <CardTitle as="h2" className="text-xl font-bold text-text-primary">
              💡 Dicas Rápidas para Cálculos de Porcentagem
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div>
                <h4 className="mb-3 font-semibold text-growth-green">⚡ Métodos Rápidos</h4>
                <ul className="space-y-2 text-sm text-text-secondary">
                  <li>
                    <strong>10%:</strong> Divida por 10 (move a vírgula uma casa)
                  </li>
                  <li>
                    <strong>5%:</strong> Calcule 10% e divida por 2
                  </li>
                  <li>
                    <strong>20%:</strong> Calcule 10% e multiplique por 2
                  </li>
                  <li>
                    <strong>25%:</strong> Divida por 4 (1/4 do valor)
                  </li>
                  <li>
                    <strong>50%:</strong> Divida por 2 (metade do valor)
                  </li>
                  <li>
                    <strong>75%:</strong> Calcule 50% + 25%
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="mb-3 font-semibold text-primary-blue-dark">🎯 Situações Comuns</h4>
                <ul className="space-y-2 text-sm text-text-secondary">
                  <li>
                    <strong>Gorjeta 10%:</strong> R$ 50,00 → R$ 5,00
                  </li>
                  <li>
                    <strong>Desconto 20%:</strong> R$ 100,00 → R$ 20,00 off
                  </li>
                  <li>
                    <strong>Imposto 15%:</strong> R$ 200,00 → + R$ 30,00
                  </li>
                  <li>
                    <strong>Comissão 5%:</strong> R$ 1.000,00 → R$ 50,00
                  </li>
                  <li>
                    <strong>Aumento 12%:</strong> R$ 2.500,00 → + R$ 300,00
                  </li>
                  <li>
                    <strong>Juros 3%:</strong> R$ 10.000,00 → + R$ 300,00
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Seção: Perguntas Frequentes */}
        <Card className="border border-neutral-surface-variant bg-background-dark-secondary duration-300">
          <CardHeader>
            <CardTitle as="h2" className="text-xl font-bold text-text-primary">
              ❓ Perguntas Frequentes sobre Cálculos de Porcentagem
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div>
                <h4 className="mb-2 font-semibold text-primary-blue-dark">
                  1. Como calcular desconto de 30% em R$ 150,00?
                </h4>
                <p className="text-sm text-text-secondary">
                  Fórmula: 30% de 150 = (30 × 150) ÷ 100 = 45. Desconto: R$ 45,00. Preço final: R$
                  105,00.
                </p>
              </div>

              <div>
                <h4 className="mb-2 font-semibold text-primary-blue-dark">
                  2. Se gastei R$ 80 de R$ 400, que porcentagem gastei?
                </h4>
                <p className="text-sm text-text-secondary">
                  Fórmula: (80 ÷ 400) × 100 = 20%. Você gastou 20% do total disponível.
                </p>
              </div>

              <div>
                <h4 className="mb-2 font-semibold text-primary-blue-dark">
                  3. Como calcular aumento percentual entre dois valores?
                </h4>
                <p className="text-sm text-text-secondary">
                  Fórmula: [(Valor Final - Valor Inicial) ÷ Valor Inicial] × 100. Ex: De R$ 100 para
                  R$ 120 = [(120-100) ÷ 100] × 100 = 20% de aumento.
                </p>
              </div>

              <div>
                <h4 className="mb-2 font-semibold text-primary-blue-dark">
                  4. Qual a diferença entre porcentagem e pontos percentuais?
                </h4>
                <p className="text-sm text-text-secondary">
                  Porcentagem é proporcional (de 20% para 25% = aumento de 25%). Pontos percentuais
                  é a diferença absoluta (de 20% para 25% = aumento de 5 pontos percentuais).
                </p>
              </div>

              <div>
                <h4 className="mb-2 font-semibold text-primary-blue-dark">
                  5. Como usar porcentagem em investimentos?
                </h4>
                <p className="text-sm text-text-secondary">
                  Para calcular retorno: (Valor Final - Investimento Inicial) ÷ Investimento Inicial
                  × 100. Ex: Investiu R$ 1.000, resgatou R$ 1.100 = 10% de rentabilidade.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <FAQ
          title="Perguntas Frequentes - Calculadora de Porcentagem"
          items={[
            {
              question: "Como calcular porcentagem de um valor de forma simples?",
              answer:
                "Para calcular <strong>X% de um valor</strong>, multiplique o valor por X e divida por 100. Exemplo: 25% de R$ 200 = (200 × 25) ÷ 100 = <strong>R$ 50</strong>. Nossa calculadora faz isso automaticamente!",
              borderColor: "primary-blue",
            },
            {
              question: "Qual a diferença entre desconto e acréscimo percentual?",
              answer:
                "<strong>Desconto:</strong> Subtrai o percentual do valor original (R$ 100 - 20% = R$ 80). <strong>Acréscimo:</strong> Adiciona o percentual ao valor original (R$ 100 + 20% = R$ 120). Use nossa calculadora para ambos!",
              borderColor: "growth-green",
            },
            {
              question: "Como calcular que porcentagem um valor representa de outro?",
              answer:
                "Divida o <strong>valor menor pelo maior</strong> e multiplique por 100. Exemplo: 30 é que % de 120? (30 ÷ 120) × 100 = <strong>25%</strong>. Perfeito para análises financeiras e estatísticas!",
              borderColor: "system-info",
            },
            {
              question: "Como calcular variação percentual entre dois valores?",
              answer:
                "Fórmula: <strong>[(Valor Final - Valor Inicial) ÷ Valor Inicial] × 100</strong>. Se aumentou de R$ 100 para R$ 130: [(130-100) ÷ 100] × 100 = <strong>+30%</strong>. Se diminuiu, o resultado será negativo.",
              borderColor: "system-warning",
            },
            {
              question: "Posso usar para calcular descontos em compras?",
              answer:
                "<strong>Claro!</strong> Digite o preço original e a porcentagem de desconto. A calculadora mostra o <strong>valor do desconto</strong> e o <strong>preço final</strong>. Exemplo: Produto R$ 500 com 30% de desconto = R$ 150 de economia, pague R$ 350!",
              borderColor: "growth-green",
            },
            {
              question: "Como calcular porcentagem de aumento salarial ou lucro?",
              answer:
                "Para <strong>aumento</strong>: Digite salário atual e percentual de aumento. Para <strong>lucro sobre investimento</strong>: Use [(Valor Final - Investimento) ÷ Investimento] × 100. Nossa calculadora é perfeita para planejamento financeiro!",
              borderColor: "primary-blue",
            },
            {
              question: "Qual a diferença entre porcentagem e pontos percentuais?",
              answer:
                "<strong>Porcentagem:</strong> Proporção relativa (de 10% para 15% = aumento de 50%). <strong>Pontos percentuais:</strong> Diferença absoluta (de 10% para 15% = 5 pontos percentuais). Importante para juros e taxas!",
              borderColor: "system-info",
            },
            {
              question: "A calculadora funciona para qualquer tipo de porcentagem?",
              answer:
                "<strong>Sim!</strong> Funciona para descontos, acréscimos, comissões, impostos, juros, rendimentos, gorjetas, análises estatísticas e qualquer cálculo percentual. <strong>Interface simples e resultados precisos</strong> para todas as situações!",
              borderColor: "system-success",
            },
          ]}
          tipSection={{
            title: "Dica de Especialista",
            content:
              "Para <strong>verificar seus cálculos</strong>, lembre-se: se aplicar um desconto de X% e depois um acréscimo de X%, o valor final será menor que o original! Exemplo: R$ 100 - 20% + 20% = R$ 96 (não R$ 100).",
          }}
          footerText="<strong>Precisa de mais cálculos?</strong> Nossa calculadora de porcentagem é <strong>100% gratuita</strong> e oferece resultados instantâneos para todas suas necessidades do dia a dia!"
        />

        {/* Footer com informações */}
        <Card className="border-l-4 border-primary-blue bg-primary-blue-light duration-300">
          <CardHeader>
            <CardTitle as="h2" className="text-lg font-bold text-text-primary">
              📚 Sobre Esta Calculadora de Porcentagem
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 text-sm text-text-secondary">
              <p>
                Esta calculadora de porcentagem online é{" "}
                <strong className="text-primary-blue-dark">100% gratuita</strong> e foi desenvolvida
                para facilitar cálculos do dia a dia. É perfeita para{" "}
                <strong>compras, negócios, estudos e finanças pessoais</strong>.
              </p>
              <p>
                Use nossa ferramenta para calcular{" "}
                <strong className="text-growth-green">descontos em compras</strong>,
                <strong className="text-primary-blue-dark">aumentos salariais</strong>,
                <strong className="text-system-info">rendimentos de investimentos</strong> e muito
                mais!
              </p>
              <p className="text-xs opacity-75">
                Calculadora desenvolvida com precisão matemática • Resultados instantâneos •
                Interface intuitiva
              </p>
            </div>
          </CardContent>
        </Card>

        <RelatedCalculators category="matematica" currentCalculatorId="porcentagem" />
      </div>
    </div>
  );
}
