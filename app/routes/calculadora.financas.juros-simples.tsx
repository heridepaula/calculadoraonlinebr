import type { MetaFunction } from "@remix-run/node";
import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent, Input, Button, Breadcrumb, BreadcrumbItem, Select } from "~/components/ui";
import { APP_NAME } from "~/lib/constants";
import { calculateSimpleInterest } from "~/utils/calculations";
import type { InterestCalculation } from "~/types";

export const meta: MetaFunction = () => {
  return [
    { title: `Calculadora de Juros Simples 2025 - Fácil e Precisa - ${APP_NAME}` },
    {
      name: "description",
      content:
        "★ Calculadora de Juros Simples GRATUITA e fácil de usar. Calcule juros, capital, taxa ou tempo com fórmulas detalhadas. Ideal para empréstimos, financiamentos e aplicações de curto prazo. Ferramenta educacional completa com exemplos práticos.",
    },
    {
      name: "keywords",
      content: "calculadora juros simples, como calcular juros simples, fórmula juros simples, juros lineares, empréstimo curto prazo, desconto duplicata, calculadora financeira, matemática financeira, juros sobre capital inicial, cálculo de juros, simulador empréstimo, taxa de juros, capital inicial, tempo aplicação, rendimento linear, juros não compostos",
    },
    { name: "author", content: "Calculadora Online BR" },
    { name: "robots", content: "index, follow" },
    { name: "viewport", content: "width=device-width, initial-scale=1" },
    { name: "language", content: "pt-BR" },
    { name: "geo.region", content: "BR" },
    { name: "geo.country", content: "Brazil" },
    
    // Open Graph tags
    { property: "og:title", content: `Calculadora de Juros Simples - Rápida e Precisa - ${APP_NAME}` },
    { property: "og:description", content: "★ Calcule juros simples facilmente! Ferramenta gratuita com fórmulas detalhadas e exemplos práticos. Ideal para estudantes, profissionais e educação financeira." },
    { property: "og:type", content: "website" },
    { property: "og:url", content: "https://calculadoraonline.com.br/calculadora/financas/juros-simples" },
    { property: "og:site_name", content: APP_NAME },
    { property: "og:locale", content: "pt_BR" },
    
    // Twitter Card tags
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:site", content: "@calculadorabr" },
    { name: "twitter:title", content: `Calculadora de Juros Simples - ${APP_NAME}` },
    { name: "twitter:description", content: "Calcule juros simples com nossa ferramenta gratuita. Fórmulas explicadas passo a passo!" },
    
    // Additional SEO tags
    { name: "application-name", content: APP_NAME },
    { name: "msapplication-TileColor", content: "#3b82f6" },
    { name: "theme-color", content: "#3b82f6" },
    { name: "format-detection", content: "telephone=no" },
  ];
};

type CalculationMode = 'findAmount' | 'findPrincipal' | 'findRate' | 'findTime';

export default function SimpleInterestCalculator() {
  const [mode, setMode] = useState<CalculationMode>('findAmount');
  const [principal, setPrincipal] = useState("");
  const [rate, setRate] = useState("");
  const [time, setTime] = useState("");
  const [targetAmount, setTargetAmount] = useState("");
  const [result, setResult] = useState<InterestCalculation | null>(null);
  const [calculatedValue, setCalculatedValue] = useState<number | null>(null);

  const handleCalculate = () => {
    const principalNum = parseFloat(principal) || 0;
    const rateNum = parseFloat(rate) || 0;
    const timeNum = parseFloat(time) || 0;
    const targetAmountNum = parseFloat(targetAmount) || 0;

    let calculation: InterestCalculation | null = null;
    let calculated: number | null = null;

    switch (mode) {
      case 'findAmount':
        if (principalNum > 0 && rateNum > 0 && timeNum > 0) {
          calculation = calculateSimpleInterest(principalNum, rateNum, timeNum);
        }
        break;
      case 'findPrincipal':
        if (targetAmountNum > 0 && rateNum > 0 && timeNum > 0) {
          // M = P + (P * i * t) = P(1 + i*t)
          // P = M / (1 + i*t)
          calculated = targetAmountNum / (1 + (rateNum/100) * timeNum);
          calculation = calculateSimpleInterest(calculated, rateNum, timeNum);
        }
        break;
      case 'findRate':
        if (principalNum > 0 && targetAmountNum > 0 && timeNum > 0) {
          // M = P(1 + i*t)
          // i = (M/P - 1) / t
          calculated = ((targetAmountNum / principalNum) - 1) / timeNum * 100;
          calculation = calculateSimpleInterest(principalNum, calculated, timeNum);
        }
        break;
      case 'findTime':
        if (principalNum > 0 && targetAmountNum > 0 && rateNum > 0) {
          // M = P(1 + i*t)
          // t = (M/P - 1) / i
          calculated = ((targetAmountNum / principalNum) - 1) / (rateNum/100);
          calculation = calculateSimpleInterest(principalNum, rateNum, calculated);
        }
        break;
    }

    setResult(calculation);
    setCalculatedValue(calculated);
  };

  const handleReset = () => {
    setPrincipal("");
    setRate("");
    setTime("");
    setTargetAmount("");
    setResult(null);
    setCalculatedValue(null);
  };

  const formatCurrency = (value: number) => 
    new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);

  const getModeTitle = () => {
    switch (mode) {
      case 'findAmount': return 'Calcular Montante Final';
      case 'findPrincipal': return 'Calcular Capital Inicial';
      case 'findRate': return 'Calcular Taxa de Juros';
      case 'findTime': return 'Calcular Tempo';
    }
  };

  const getModeDescription = () => {
    switch (mode) {
      case 'findAmount': return 'Descubra quanto você terá ao final do período';
      case 'findPrincipal': return 'Descubra quanto precisa investir inicialmente';
      case 'findRate': return 'Descubra qual taxa de juros está sendo aplicada';
      case 'findTime': return 'Descubra em quanto tempo atingirá o valor desejado';
    }
  };

  return (
    <div className="mx-auto max-w-5xl space-y-8">
      <Breadcrumb>
        <BreadcrumbItem href="/">Início</BreadcrumbItem>
        <BreadcrumbItem href="/calculadora">Calculadoras</BreadcrumbItem>
        <BreadcrumbItem href="/calculadora/financas">Finanças</BreadcrumbItem>
        <BreadcrumbItem isLast>Juros Simples</BreadcrumbItem>
      </Breadcrumb>

      <header className="text-center space-y-4">
        <h1 className="mb-4 text-3xl font-bold text-text-primary md:text-4xl">
          Calculadora de Juros Simples
        </h1>
        <p className="text-lg text-text-secondary-dark max-w-4xl mx-auto">
          Calcule <strong className="text-primary-blue-dark">juros simples</strong> de forma fácil e precisa. 
          Encontre <strong className="text-system-success">capital, taxa, tempo ou montante</strong> com fórmulas detalhadas e exemplos práticos.
        </p>
        <div className="bg-primary-blue-light rounded-lg p-4 inline-block duration-300">
          <p className="text-sm text-text-primary font-medium">
            📐 <strong>Fórmulas explicadas</strong> • 💡 <strong>4 modos de cálculo</strong> • 📚 <strong>Conteúdo educativo</strong>
          </p>
        </div>
      </header>

      {/* Seletor de Modo */}
      <Card className="border-2 border-system-info bg-system-info/5/5 duration-300">
        <CardHeader>
          <CardTitle as="h2" className="text-system-info">
            🎯 O que você quer calcular?
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { value: 'findAmount', label: 'Montante Final', icon: '💰', desc: 'Valor final após juros' },
              { value: 'findPrincipal', label: 'Capital Inicial', icon: '🏦', desc: 'Investimento necessário' },
              { value: 'findRate', label: 'Taxa de Juros', icon: '📈', desc: 'Percentual aplicado' },
              { value: 'findTime', label: 'Tempo', icon: '⏱️', desc: 'Período necessário' },
            ].map((option) => (
              <button
                key={option.value}
                onClick={() => setMode(option.value as CalculationMode)}
                className={`p-4 rounded-lg border-2 transition-all ${
                  mode === option.value
                    ? 'border-system-info bg-system-info-dark text-white'
                    : 'border-neutral-surface-variant bg-background-dark-secondary hover:border-system-info:border-system-info-dark'
                }`}
              >
                <div className="text-2xl mb-2">{option.icon}</div>
                <div className="font-semibold text-sm mb-1">{option.label}</div>
                <div className="text-xs opacity-80">{option.desc}</div>
              </button>
            ))}
          </div>
          <div className="mt-4 text-center">
            <h3 className="text-lg font-bold text-system-info">
              {getModeTitle()}
            </h3>
            <p className="text-sm text-text-secondary">
              {getModeDescription()}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Formulário */}
      <Card>
        <CardHeader>
          <CardTitle as="h2">Dados para o Cálculo</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {mode !== 'findPrincipal' && (
              <Input
                type="number"
                label="Capital Inicial (R$)"
                value={principal}
                onChange={(e) => setPrincipal(e.target.value)}
                placeholder="Ex: 1000"
                min="0"
                step="0.01"
                required={mode !== 'findPrincipal'}
                fullWidth
              />
            )}

            {mode === 'findPrincipal' && (
              <Input
                type="number"
                label="Montante Desejado (R$)"
                value={targetAmount}
                onChange={(e) => setTargetAmount(e.target.value)}
                placeholder="Ex: 1200"
                min="0"
                step="0.01"
                required
                fullWidth
              />
            )}

            {mode !== 'findRate' && (
              <Input
                type="number"
                label="Taxa de Juros (% ao período)"
                value={rate}
                onChange={(e) => setRate(e.target.value)}
                placeholder="Ex: 5"
                min="0"
                step="0.01"
                required={mode !== 'findRate'}
                fullWidth
              />
            )}

            {mode === 'findRate' && (
              <Input
                type="number"
                label="Montante Desejado (R$)"
                value={targetAmount}
                onChange={(e) => setTargetAmount(e.target.value)}
                placeholder="Ex: 1200"
                min="0"
                step="0.01"
                required
                fullWidth
              />
            )}

            {mode !== 'findTime' && (
              <Input
                type="number"
                label="Tempo (períodos)"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                placeholder="Ex: 12"
                min="0"
                step="0.1"
                required={mode !== 'findTime'}
                fullWidth
              />
            )}

            {mode === 'findTime' && (
              <Input
                type="number"
                label="Montante Desejado (R$)"
                value={targetAmount}
                onChange={(e) => setTargetAmount(e.target.value)}
                placeholder="Ex: 1200"
                min="0"
                step="0.01"
                required
                fullWidth
              />
            )}
          </div>

          <div className="mt-6 flex justify-center gap-4">
            <Button onClick={handleCalculate} className="px-8">
              Calcular
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

      {/* Resultado */}
      {result && (
        <Card className="border-2 border-primary-blue bg-primary-blue-light duration-300">
          <CardHeader>
            <CardTitle as="h3" className="text-primary-blue-dark">
              📊 Resultado do Cálculo
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-text-secondary">Capital inicial:</span>
                  <span className="font-medium text-text-primary">
                    {formatCurrency(result.principal)}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-text-secondary">Taxa de juros:</span>
                  <span className="font-medium text-text-primary">
                    {result.rate}% ao período
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-text-secondary">Tempo:</span>
                  <span className="font-medium text-text-primary">
                    {result.time} períodos
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-text-secondary">Juros ganhos:</span>
                  <span className="font-medium text-system-success tabular-nums">
                    {formatCurrency(result.result - result.principal)}
                  </span>
                </div>
                <hr className="border-neutral-surface-variant" />
                <div className="flex justify-between items-center text-lg">
                  <span className="font-semibold text-text-primary">Montante final:</span>
                  <span className="font-bold text-primary-blue-dark tabular-nums">
                    {formatCurrency(result.result)}
                  </span>
                </div>
              </div>

              <div className="bg-gray-900 p-4 rounded-lg">
                <h4 className="font-bold text-primary-blue-dark mb-3">🔢 Fórmula Utilizada</h4>
                <div className="space-y-2 text-sm">
                  <div className="font-mono bg-primary-blue-light p-3 rounded text-center">
                    <div className="font-bold text-primary-blue-dark">J = P × i × t</div>
                    <div className="font-bold text-primary-blue-dark">M = P + J</div>
                  </div>
                  <div className="space-y-1 text-text-secondary">
                    <p><strong>J</strong> = Juros</p>
                    <p><strong>P</strong> = Capital/Principal</p>
                    <p><strong>i</strong> = Taxa de juros</p>
                    <p><strong>t</strong> = Tempo</p>
                    <p><strong>M</strong> = Montante</p>
                  </div>
                  {mode !== 'findAmount' && calculatedValue && (
                    <div className="mt-3 p-3 bg-system-success/10 rounded border border-system-success/20">
                      <p className="font-bold text-system-success">
                        Valor calculado: {
                          mode === 'findPrincipal' ? formatCurrency(calculatedValue) :
                          mode === 'findRate' ? `${calculatedValue.toFixed(2)}%` :
                          `${calculatedValue.toFixed(2)} períodos`
                        }
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Seção: O que são Juros Simples */}
      <Card className="bg-gradient-to-r from-primary-blue-light to-system-info/20 border-l-4 border-primary-blue duration-300">
        <CardHeader>
          <CardTitle as="h2" className="text-2xl font-bold text-text-primary">
            📐 O que são Juros Simples? Conceito Fundamental
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6 text-text-primary">
            <div className="text-lg leading-relaxed">
              <p>
                <strong className="text-primary-blue-dark">Juros simples</strong> são juros calculados 
                <strong className="text-system-success"> apenas sobre o valor inicial</strong> (capital principal), 
                sem considerar os juros já acumulados. É um sistema de <em>crescimento linear</em>, onde o valor dos juros 
                permanece constante a cada período.
              </p>
            </div>

            <div className="bg-gray-900 p-6 rounded-xl border border-primary-blue/20">
              <h3 className="text-xl font-bold text-primary-blue-dark mb-4">🔢 Fórmulas dos Juros Simples</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-primary-blue-light p-4 rounded-lg">
                  <h4 className="font-bold text-primary-blue-dark mb-2">Fórmula Principal</h4>
                  <div className="font-mono text-center text-xl text-primary-blue-dark mb-3">
                    <div><strong>J = P × i × t</strong></div>
                    <div><strong>M = P + J</strong></div>
                  </div>
                  <div className="text-sm space-y-1">
                    <p><strong>J</strong> = Valor dos juros</p>
                    <p><strong>P</strong> = Capital principal (inicial)</p>
                    <p><strong>i</strong> = Taxa de juros (decimal)</p>
                    <p><strong>t</strong> = Período de aplicação</p>
                    <p><strong>M</strong> = Montante final</p>
                  </div>
                </div>

                <div className="bg-system-info/10 p-4 rounded-lg border border-system-info/20">
                  <h4 className="font-bold text-system-info mb-2">Variações da Fórmula</h4>
                  <div className="space-y-2 text-sm font-mono">
                    <div>
                      <strong>Para encontrar P:</strong><br/>
                      P = J ÷ (i × t)
                    </div>
                    <div>
                      <strong>Para encontrar i:</strong><br/>
                      i = J ÷ (P × t)
                    </div>
                    <div>
                      <strong>Para encontrar t:</strong><br/>
                      t = J ÷ (P × i)
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-system-success/10 p-6 rounded-xl border border-system-success/20">
                <h4 className="text-lg font-bold text-system-success mb-3">✅ Vantagens dos Juros Simples</h4>
                <ul className="space-y-2 text-sm">
                  <li>• <strong>Simplicidade:</strong> Fácil de calcular e entender</li>
                  <li>• <strong>Previsibilidade:</strong> Valor dos juros sempre igual</li>
                  <li>• <strong>Transparência:</strong> Cálculo direto sem complicações</li>
                  <li>• <strong>Rapidez:</strong> Ideal para períodos curtos</li>
                  <li>• <strong>Controle:</strong> Fácil planejamento financeiro</li>
                </ul>
              </div>

              <div className="bg-system-warning/10 p-6 rounded-xl border border-system-warning/20">
                <h4 className="text-lg font-bold text-system-warning mb-3">⚠️ Limitações</h4>
                <ul className="space-y-2 text-sm">
                  <li>• <strong>Crescimento linear:</strong> Não aproveita o "efeito multiplicador"</li>
                  <li>• <strong>Menor rendimento:</strong> No longo prazo, rende menos que juros compostos</li>
                  <li>• <strong>Uso limitado:</strong> Pouco usado em investimentos modernos</li>
                  <li>• <strong>Inflação:</strong> Não protege contra perda de poder de compra</li>
                  <li>• <strong>Oportunidade:</strong> Perde o potencial de reinvestimento</li>
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Seção: Onde são Usados */}
      <Card className="bg-background-dark-secondary border-l-4 border-system-info duration-300">
        <CardHeader>
          <CardTitle as="h2" className="text-xl font-bold text-text-primary">
            🏦 Onde os Juros Simples são Aplicados na Prática
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="text-text-primary">
              <p className="text-lg mb-4">
                Embora menos comuns que os juros compostos, os juros simples ainda são utilizados em 
                <strong className="text-system-info"> situações específicas</strong> 
                do mercado financeiro e comercial brasileiro.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-bold text-system-success mb-4">
                  ✅ Principais Aplicações
                </h3>
                <div className="space-y-4">
                  <div className="bg-system-success/10 p-4 rounded-lg border border-system-success/20">
                    <h4 className="font-semibold text-system-success mb-2">📄 Desconto de Duplicatas</h4>
                    <p className="text-sm text-text-secondary">
                      Bancos usam juros simples para calcular o desconto de duplicatas e títulos a receber, 
                      principalmente em operações de curto prazo.
                    </p>
                  </div>
                  
                  <div className="bg-system-success/10 p-4 rounded-lg border border-system-success/20">
                    <h4 className="font-semibold text-system-success mb-2">💼 Empréstimos de Curto Prazo</h4>
                    <p className="text-sm text-text-secondary">
                      Algumas modalidades de empréstimo pessoal e empresarial de curto prazo 
                      utilizam juros simples para facilitar o cálculo.
                    </p>
                  </div>

                  <div className="bg-system-success/10 p-4 rounded-lg border border-system-success/20">
                    <h4 className="font-semibold text-system-success mb-2">🏪 Operações Comerciais</h4>
                    <p className="text-sm text-text-secondary">
                      Descontos para pagamento à vista, multas de atraso simples, 
                      e algumas modalidades de crediário utilizam este sistema.
                    </p>
                  </div>

                  <div className="bg-system-success/10 p-4 rounded-lg border border-system-success/20">
                    <h4 className="font-semibold text-system-success mb-2">📚 Educação Financeira</h4>
                    <p className="text-sm text-text-secondary">
                      Amplamente usado no ensino de matemática financeira básica 
                      por ser mais simples de compreender e calcular.
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-bold text-primary-blue-dark mb-4">
                  📊 Exemplos Práticos Brasileiros
                </h3>
                <div className="space-y-4">
                  <div className="bg-primary-blue-light p-4 rounded-lg">
                    <h4 className="font-semibold text-primary-blue-dark mb-2">💰 Exemplo 1: Desconto de Duplicata</h4>
                    <div className="text-sm space-y-1">
                      <p><strong>Situação:</strong> Empresa quer antecipar R$ 10.000</p>
                      <p><strong>Prazo:</strong> 60 dias</p>
                      <p><strong>Taxa:</strong> 3% ao mês</p>
                      <p><strong>Desconto:</strong> R$ 10.000 × 0,03 × 2 = R$ 600</p>
                      <p className="font-bold text-primary-blue-dark">
                        Valor líquido: R$ 9.400
                      </p>
                    </div>
                  </div>

                  <div className="bg-system-info/10 p-4 rounded-lg border border-system-info/20">
                    <h4 className="font-semibold text-system-info mb-2">🏪 Exemplo 2: Desconto à Vista</h4>
                    <div className="text-sm space-y-1">
                      <p><strong>Produto:</strong> R$ 1.000 em 30 dias</p>
                      <p><strong>Desconto à vista:</strong> 5%</p>
                      <p><strong>Equivale a:</strong> 5% ao mês</p>
                      <p className="font-bold text-system-info">
                        Preço à vista: R$ 950
                      </p>
                    </div>
                  </div>

                  <div className="bg-system-warning/10 p-4 rounded-lg border border-system-warning/20">
                    <h4 className="font-semibold text-system-warning mb-2">⏰ Exemplo 3: Multa de Atraso</h4>
                    <div className="text-sm space-y-1">
                      <p><strong>Conta:</strong> R$ 500</p>
                      <p><strong>Atraso:</strong> 15 dias</p>
                      <p><strong>Multa:</strong> 2% + 1% ao mês</p>
                      <p><strong>Cálculo:</strong> R$ 10 + (R$ 500 × 0,01 × 0,5) = R$ 12,50</p>
                      <p className="font-bold text-system-warning">
                        Total: R$ 512,50
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Seção: Juros Simples vs Compostos */}
      <Card className="bg-gradient-to-r from-primary-blue-light to-growth-green-soft border-l-4 border-system-warning duration-300">
        <CardHeader>
          <CardTitle as="h2" className="text-xl font-bold text-text-primary">
            ⚖️ Juros Simples vs Juros Compostos - Comparação Completa
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="text-text-primary text-lg">
              <p>
                A principal diferença está no <strong className="text-system-warning">método de cálculo</strong>: 
                juros simples incidem apenas sobre o capital inicial, enquanto juros compostos incidem sobre o montante acumulado.
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-sm border border-neutral-surface-variant rounded-lg overflow-hidden">
                <thead className="bg-primary-blue-light">
                  <tr>
                    <th className="p-3 text-left font-bold text-primary-blue-dark">Aspecto</th>
                    <th className="p-3 text-center font-bold text-primary-blue-dark">Juros Simples</th>
                    <th className="p-3 text-center font-bold text-growth-green">Juros Compostos</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-light">
                  <tr>
                    <td className="p-3 font-semibold">Fórmula</td>
                    <td className="p-3 text-center font-mono text-primary-blue-dark">J = P × i × t</td>
                    <td className="p-3 text-center font-mono text-growth-green">M = P × (1 + i)^t</td>
                  </tr>
                  <tr className="bg-neutral-surface/30">
                    <td className="p-3 font-semibold">Base de Cálculo</td>
                    <td className="p-3 text-center">Sempre sobre o capital inicial</td>
                    <td className="p-3 text-center">Sobre o montante acumulado</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-semibold">Crescimento</td>
                    <td className="p-3 text-center text-primary-blue-dark">Linear (constante)</td>
                    <td className="p-3 text-center text-growth-green">Exponencial (acelerando)</td>
                  </tr>
                  <tr className="bg-neutral-surface/30">
                    <td className="p-3 font-semibold">Complexidade</td>
                    <td className="p-3 text-center text-system-success">Simples</td>
                    <td className="p-3 text-center text-system-warning">Mais complexo</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-semibold">Melhor Para</td>
                    <td className="p-3 text-center">Curto prazo</td>
                    <td className="p-3 text-center">Longo prazo</td>
                  </tr>
                  <tr className="bg-neutral-surface/30">
                    <td className="p-3 font-semibold">Uso no Mercado</td>
                    <td className="p-3 text-center">Limitado</td>
                    <td className="p-3 text-center">Predominante</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Exemplo Comparativo Visual */}
            <div className="bg-system-warning/10 p-6 rounded-xl border border-system-warning/20">
              <h4 className="text-lg font-bold text-system-warning mb-4 text-center">
                📊 Exemplo Comparativo: R$ 1.000 a 10% ao ano
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-primary-blue-light p-4 rounded-lg">
                  <h5 className="font-bold text-primary-blue-dark mb-3 text-center">
                    📈 Juros Simples
                  </h5>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Ano 1:</span>
                      <span>R$ 1.000 + R$ 100 = <strong>R$ 1.100</strong></span>
                    </div>
                    <div className="flex justify-between">
                      <span>Ano 2:</span>
                      <span>R$ 1.100 + R$ 100 = <strong>R$ 1.200</strong></span>
                    </div>
                    <div className="flex justify-between">
                      <span>Ano 3:</span>
                      <span>R$ 1.200 + R$ 100 = <strong>R$ 1.300</strong></span>
                    </div>
                    <div className="flex justify-between">
                      <span>Ano 5:</span>
                      <span>R$ 1.400 + R$ 100 = <strong>R$ 1.500</strong></span>
                    </div>
                    <div className="flex justify-between border-t border-primary-blue/30 pt-2">
                      <span>Ano 10:</span>
                      <span className="font-bold text-primary-blue-dark">R$ 2.000</span>
                    </div>
                  </div>
                </div>

                <div className="bg-growth-green-soft p-4 rounded-lg">
                  <h5 className="font-bold text-growth-green mb-3 text-center">
                    📈 Juros Compostos
                  </h5>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Ano 1:</span>
                      <span>R$ 1.000 × 1,10 = <strong>R$ 1.100</strong></span>
                    </div>
                    <div className="flex justify-between">
                      <span>Ano 2:</span>
                      <span>R$ 1.100 × 1,10 = <strong>R$ 1.210</strong></span>
                    </div>
                    <div className="flex justify-between">
                      <span>Ano 3:</span>
                      <span>R$ 1.210 × 1,10 = <strong>R$ 1.331</strong></span>
                    </div>
                    <div className="flex justify-between">
                      <span>Ano 5:</span>
                      <span>R$ 1.464 × 1,10 = <strong>R$ 1.611</strong></span>
                    </div>
                    <div className="flex justify-between border-t border-growth-green/30 pt-2">
                      <span>Ano 10:</span>
                      <span className="font-bold text-growth-green">R$ 2.594</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-4 text-center p-3 bg-system-warning text-white rounded-lg">
                <p className="font-bold text-lg">
                  Diferença após 10 anos: R$ 594 (29,7% a mais com juros compostos!)
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* FAQ */}
      <Card className="bg-background-dark-secondary border border-neutral-surface-variant duration-300">
        <CardHeader>
          <CardTitle as="h2" className="text-xl font-bold text-text-primary">
            ❓ Perguntas Frequentes sobre Juros Simples
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div>
              <h3 className="font-bold mb-3 text-lg text-primary-blue-dark">
                1. Como converter a taxa de juros de percentual para decimal?
              </h3>
              <p className="text-text-secondary mb-3">
                Divida a taxa percentual por 100. Por exemplo: 5% = 5 ÷ 100 = 0,05.
              </p>
              <div className="bg-primary-blue-light p-4 rounded-lg">
                <div className="text-sm space-y-1">
                  <p><strong>Exemplos práticos:</strong></p>
                  <p>• 10% ao ano = 0,10</p>
                  <p>• 2,5% ao mês = 0,025</p>
                  <p>• 0,5% ao dia = 0,005</p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-bold mb-3 text-lg text-primary-blue-dark">
                2. Como lidar com períodos diferentes (anos, meses, dias)?
              </h3>
              <p className="text-text-secondary mb-3">
                A taxa e o tempo devem estar na mesma unidade. Se a taxa é ao mês, o tempo deve ser em meses.
              </p>
              <div className="bg-system-info/10 p-4 rounded-lg border border-system-info/20">
                <div className="text-sm space-y-2">
                  <p><strong>Conversões comuns:</strong></p>
                  <p>• <strong>Taxa anual para mensal:</strong> Taxa ÷ 12</p>
                  <p>• <strong>Taxa mensal para diária:</strong> Taxa ÷ 30</p>
                  <p>• <strong>Dias para meses:</strong> Dias ÷ 30</p>
                  <p>• <strong>Meses para anos:</strong> Meses ÷ 12</p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-bold mb-3 text-lg text-primary-blue-dark">
                3. Quando devo usar juros simples ao invés de compostos?
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-system-success/10 p-4 rounded-lg border border-system-success/20">
                  <h4 className="font-semibold text-system-success mb-2">✅ Use juros simples quando:</h4>
                  <ul className="text-sm space-y-1">
                    <li>• Operações de curto prazo (até 1 ano)</li>
                    <li>• Cálculos rápidos e aproximados</li>
                    <li>• Desconto de duplicatas</li>
                    <li>• Multas e juros de mora simples</li>
                    <li>• Estudos de matemática básica</li>
                  </ul>
                </div>
                <div className="bg-growth-green-soft p-4 rounded-lg border border-growth-green/20">
                  <h4 className="font-semibold text-growth-green mb-2">📈 Use juros compostos quando:</h4>
                  <ul className="text-sm space-y-1">
                    <li>• Investimentos de longo prazo</li>
                    <li>• Poupança, CDBs, fundos</li>
                    <li>• Financiamentos imobiliários</li>
                    <li>• Empréstimos bancários</li>
                    <li>• Planejamento de aposentadoria</li>
                  </ul>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-bold mb-3 text-lg text-primary-blue-dark">
                4. Como calcular o tempo necessário para dobrar o capital?
              </h3>
              <p className="text-text-secondary mb-3">
                Com juros simples, use: <strong>t = 1 ÷ i</strong> (onde i está em decimal).
              </p>
              <div className="bg-system-warning/10 p-4 rounded-lg border border-system-warning/20">
                <div className="text-sm space-y-2">
                  <p><strong>Exemplos:</strong></p>
                  <p>• Com 10% ao ano: t = 1 ÷ 0,10 = 10 anos</p>
                  <p>• Com 5% ao ano: t = 1 ÷ 0,05 = 20 anos</p>
                  <p>• Com 20% ao ano: t = 1 ÷ 0,20 = 5 anos</p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-bold mb-3 text-lg text-primary-blue-dark">
                5. É possível ter juros simples negativos?
              </h3>
              <p className="text-text-secondary mb-3">
                Sim, em situações de deflação ou quando há descontos progressivos baseados no tempo.
              </p>
              <div className="bg-primary-blue-light p-4 rounded-lg">
                <div className="text-sm">
                  <p><strong>Exemplo prático:</strong> Desconto de 2% ao mês para pagamento antecipado.</p>
                  <p>Se você antecipar 3 meses: desconto = 2% × 3 = 6% do valor original.</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Calculadoras Relacionadas */}
      <Card className="bg-background-dark-secondary border border-neutral-surface-variant duration-300">
        <CardHeader>
          <CardTitle as="h2" className="text-xl font-bold text-text-primary">
            🔗 Calculadoras Financeiras Relacionadas
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-growth-green-soft p-4 rounded-lg border border-growth-green/20">
              <h3 className="font-bold text-growth-green mb-2 text-sm">
                📈 Juros Compostos
              </h3>
              <p className="text-xs text-text-secondary mb-2">
                Compare com <strong>juros compostos</strong> e descubra o poder do "juros sobre juros" no longo prazo.
              </p>
              <a 
                href="/calculadora/financas/juros-compostos" 
                className="text-xs bg-growth-green text-white px-2 py-1 rounded hover:bg-growth-green-dark inline-block"
              >
                Calcular →
              </a>
            </div>
            
            <div className="bg-primary-blue-light p-4 rounded-lg border border-primary-blue/20">
              <h3 className="font-bold text-primary-blue-dark mb-2 text-sm">
                ⚖️ Comparação de Juros
              </h3>
              <p className="text-xs text-text-secondary mb-2">
                Veja <strong>lado a lado</strong> como simples e compostos se comportam com o mesmo investimento.
              </p>
              <a 
                href="/calculadora/financas/juros" 
                className="text-xs bg-primary-blue text-white px-2 py-1 rounded hover:bg-primary-blue-dark inline-block"
              >
                Comparar →
              </a>
            </div>
            
            <div className="bg-system-success/10 p-4 rounded-lg border border-system-success/20">
              <h3 className="font-bold text-system-success mb-2 text-sm">
                📊 Calculadora de Porcentagem
              </h3>
              <p className="text-xs text-text-secondary mb-2">
                Calcule <strong>porcentagens, descontos e aumentos</strong> para complementar seus cálculos financeiros.
              </p>
              <a 
                href="/calculadora/matematica/porcentagem" 
                className="text-xs bg-system-success text-white px-2 py-1 rounded hover:bg-system-success-dark inline-block"
              >
                Calcular →
              </a>
            </div>
          </div>
          
          <div className="mt-4 text-center">
            <a 
              href="/calculadora" 
              className="inline-flex items-center text-primary-blue-dark hover text-sm"
            >
              🚀 Ver Todas as Calculadoras Gratuitas
            </a>
          </div>
        </CardContent>
      </Card>

      {/* Footer */}
      <Card className="bg-primary-blue-light border-l-4 border-primary-blue duration-300">
        <CardHeader>
          <CardTitle as="h2" className="text-lg font-bold text-text-primary">
            📚 Sobre Esta Calculadora de Juros Simples
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 text-sm text-text-secondary">
            <p>
              Esta <strong className="text-primary-blue-dark">calculadora de juros simples</strong> é 
              <strong className="text-system-success"> 100% gratuita</strong> e oferece 4 modos de cálculo 
              para encontrar qualquer variável da fórmula de juros simples. Ideal para estudantes, profissionais e educação financeira básica.
            </p>
            <p>
              <strong>Recursos inclusos:</strong> Múltiplos modos de cálculo, fórmulas detalhadas, exemplos práticos, 
              comparação com juros compostos, e conteúdo educacional abrangente sobre matemática financeira.
            </p>
            <p>
              <strong className="text-system-warning">Aviso Legal:</strong> Os cálculos são para fins 
              educacionais e de planejamento. Para decisões financeiras importantes, consulte sempre um 
              <strong> consultor financeiro</strong> ou <strong>contador</strong> qualificado.
            </p>
            <p className="text-xs opacity-75 border-t border-primary-blue/20 pt-3 mt-4">
              ⚖️ Cálculos baseados em fórmulas matemáticas padronizadas • 🎓 Ferramenta educacional gratuita • 
              🔒 Seus dados não são armazenados • 📱 Responsivo para todos os dispositivos • 
              🌙 Modo escuro disponível • 🚀 Interface moderna e intuitiva
            </p>
          </div>
        </CardContent>
      </Card>
      
      {/* Structured Data - JSON-LD for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "Calculadora de Juros Simples",
            description: "Calculadora online gratuita para calcular juros simples com 4 modos de cálculo. Encontre capital, taxa, tempo ou montante facilmente.",
            url: "https://calculadoraonline.com.br/calculadora/financas/juros-simples",
            applicationCategory: "FinanceApplication",
            operatingSystem: "Web",
            browserRequirements: "Requires JavaScript",
            offers: {
              "@type": "Offer",
              price: "0",
              priceCurrency: "BRL"
            },
            featureList: [
              "Cálculo de juros simples",
              "4 modos de cálculo",
              "Fórmulas detalhadas",
              "Exemplos práticos",
              "Comparação com juros compostos",
              "100% gratuito"
            ],
            author: {
              "@type": "Organization",
              name: "Calculadora Online BR"
            },
            publisher: {
              "@type": "Organization",
              name: "Calculadora Online BR"
            }
          })
        }}
      />
    </div>
  );
}