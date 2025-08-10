import type { MetaFunction } from "@remix-run/node";
import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent, Input, Button, Breadcrumb, BreadcrumbItem } from "~/components/ui";
import { APP_NAME } from "~/lib/constants";
import { calculateSimpleInterest, calculateCompoundInterest } from "~/utils/calculations";
import type { InterestCalculation } from "~/types";

export const meta: MetaFunction = () => {
  return [
    { title: `Calculadora de Juros Online - Simples e Compostos - ${APP_NAME}` },
    {
      name: "description",
      content:
        "Calculadora de juros online gratuita para juros simples e compostos. Compare rendimentos de investimentos, simule financiamentos e entenda o poder dos juros compostos. Ferramenta essencial para planejamento financeiro.",
    },
    {
      name: "keywords",
      content: "calculadora juros, juros simples, juros compostos, investimento, financiamento, rendimento, poupança, CDI, tesouro direto, simulação financeira, juros sobre capital",
    },
    { name: "author", content: "Calculadora Online BR" },
    { property: "og:title", content: `Calculadora de Juros - Simples vs Compostos - ${APP_NAME}` },
    { property: "og:description", content: "Compare juros simples e compostos. Simule investimentos e financiamentos com nossa calculadora gratuita e precisa." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary" },
    { name: "twitter:title", content: `Calculadora de Juros Online - ${APP_NAME}` },
    { name: "twitter:description", content: "Calcule juros simples e compostos. Ferramenta gratuita para investidores e planejamento financeiro." },
  ];
};

export default function InterestCalculator() {
  const [principal, setPrincipal] = useState("");
  const [rate, setRate] = useState("");
  const [time, setTime] = useState("");
  const [simpleResult, setSimpleResult] = useState<InterestCalculation | null>(null);
  const [compoundResult, setCompoundResult] = useState<InterestCalculation | null>(null);

  const handleCalculate = () => {
    const principalNum = parseFloat(principal);
    const rateNum = parseFloat(rate);
    const timeNum = parseFloat(time);

    if (principalNum > 0 && rateNum > 0 && timeNum > 0) {
      const simple = calculateSimpleInterest(principalNum, rateNum, timeNum);
      const compound = calculateCompoundInterest(principalNum, rateNum, timeNum);

      setSimpleResult(simple);
      setCompoundResult(compound);
    }
  };

  const handleReset = () => {
    setPrincipal("");
    setRate("");
    setTime("");
    setSimpleResult(null);
    setCompoundResult(null);
  };

  return (
    <div className="mx-auto max-w-4xl space-y-8">
      <Breadcrumb>
        <BreadcrumbItem href="/">Início</BreadcrumbItem>
        <BreadcrumbItem href="/calculadora">Calculadoras</BreadcrumbItem>
        <BreadcrumbItem href="/calculadora/financas">Finanças</BreadcrumbItem>
        <BreadcrumbItem isLast>Juros</BreadcrumbItem>
      </Breadcrumb>

      <header className="text-center space-y-4">
        <h1 className="mb-4 text-3xl font-bold text-text-primary md:text-4xl">
          Calculadora de Juros - Simples e Compostos
        </h1>
        <p className="text-lg text-text-secondary-dark max-w-3xl mx-auto">
          Compare <strong className="text-primary-blue-dark">juros simples e compostos</strong> para investimentos e financiamentos. 
          Descubra o <strong className="text-growth-green">poder dos juros compostos</strong> no seu planejamento financeiro.
        </p>
        <div className="bg-primary-blue-light rounded-lg p-4 inline-block duration-300">
          <p className="text-sm text-text-primary font-medium">
            📈 <strong>Comparação lado a lado</strong> • 💰 <strong>Para investimentos</strong> • ⚙️ <strong>Simulações precisas</strong>
          </p>
        </div>
      </header>

      <Card>
        <CardHeader>
          <CardTitle as="h2">Dados para o Cálculo</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <Input
              type="number"
              label="Valor Principal (R$)"
              value={principal}
              onChange={(e) => setPrincipal(e.target.value)}
              placeholder="Ex: 1000"
              min="0"
              step="0.01"
              required
              fullWidth
            />

            <Input
              type="number"
              label="Taxa de Juros (% ao período)"
              value={rate}
              onChange={(e) => setRate(e.target.value)}
              placeholder="Ex: 5"
              min="0"
              step="0.01"
              required
              fullWidth
            />

            <Input
              type="number"
              label="Tempo (períodos)"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              placeholder="Ex: 12"
              min="0"
              step="1"
              required
              fullWidth
            />
          </div>

          <div className="mt-6 flex justify-center gap-4">
            <Button onClick={handleCalculate} className="px-8">
              Calcular Juros
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

      {(simpleResult || compoundResult) && (
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {simpleResult && (
            <Card className="border-2 border-primary-blue bg-primary-blue-light duration-300">
              <CardHeader>
                <CardTitle as="h3" className="text-primary-blue-dark">
                  Juros Simples
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-text-secondary">Valor inicial:</span>
                    <span className="font-medium text-text-primary">R$ {simpleResult.principal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-secondary">Taxa de juros:</span>
                    <span className="font-medium text-text-primary">{simpleResult.rate}% ao período</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-secondary">Período:</span>
                    <span className="font-medium text-text-primary">{simpleResult.time} períodos</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-secondary">Juros:</span>
                    <span className="font-medium text-primary-blue-dark tabular-nums">
                      R$ {(simpleResult.result - simpleResult.principal).toFixed(2)}
                    </span>
                  </div>
                  <hr className="border-neutral-surface-variant" />
                  <div className="flex justify-between text-lg">
                    <span className="font-semibold text-text-primary">Valor final:</span>
                    <span className="font-bold text-primary-blue-dark tabular-nums">
                      R$ {simpleResult.result.toFixed(2)}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {compoundResult && (
            <Card className="border-2 border-growth-green bg-growth-green-soft duration-300">
              <CardHeader>
                <CardTitle as="h3" className="text-growth-green">
                  Juros Compostos
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-text-secondary">Valor inicial:</span>
                    <span className="font-medium text-text-primary">R$ {compoundResult.principal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-secondary">Taxa de juros:</span>
                    <span className="font-medium text-text-primary">{compoundResult.rate}% ao período</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-secondary">Período:</span>
                    <span className="font-medium text-text-primary">{compoundResult.time} períodos</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-secondary">Juros:</span>
                    <span className="font-medium text-growth-green tabular-nums">
                      R$ {(compoundResult.result - compoundResult.principal).toFixed(2)}
                    </span>
                  </div>
                  <hr className="border-neutral-surface-variant" />
                  <div className="flex justify-between text-lg">
                    <span className="font-semibold text-text-primary">Valor final:</span>
                    <span className="font-bold text-growth-green tabular-nums">
                      R$ {compoundResult.result.toFixed(2)}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      )}

      {simpleResult && compoundResult && (
        <Card className="border-2 border-system-warning bg-system-warning/10 duration-300">
          <CardHeader>
            <CardTitle as="h3" className="text-system-warning">🎯 Comparação dos Resultados</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-center">
              <p className="text-lg">
                <span className="font-semibold text-text-primary">Diferença: </span>
                <span className="font-bold text-system-warning tabular-nums">
                  R$ {(compoundResult.result - simpleResult.result).toFixed(2)}
                </span>
              </p>
              <p className="text-sm text-text-secondary">
                Os juros compostos rendem{" "}
                <strong className="text-growth-green">{((compoundResult.result / simpleResult.result - 1) * 100).toFixed(1)}% a mais</strong> que
                os juros simples neste período
              </p>
              <p className="text-xs text-text-secondary mt-2">
                💡 Quanto maior o tempo e a taxa, maior a vantagem dos juros compostos!
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Seção: O que são Juros */}
      <Card className="bg-growth-green-soft border-l-4 border-growth-green duration-300">
        <CardHeader>
          <CardTitle as="h2" className="text-xl font-bold text-text-primary">
            💹 O que são Juros e Como Funcionam?
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4 text-text-primary">
            <p>
              <strong className="text-growth-green">Juros</strong> é o custo do dinheiro no tempo. 
              É a remuneração paga pelo uso de um capital durante determinado período. 
              Nos <strong>investimentos</strong>, você recebe juros. Nos <strong>empréstimos</strong>, você paga juros.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-2 text-primary-blue-dark">📈 Como Investidor:</h4>
                <ul className="space-y-1 text-sm text-text-secondary">
                  <li>• <strong>Poupança:</strong> Juros baixos mas garantidos</li>
                  <li>• <strong>CDB/CDI:</strong> Juros atrelados à taxa básica</li>
                  <li>• <strong>Tesouro Direto:</strong> Juros do governo</li>
                  <li>• <strong>Fundos de Renda Fixa:</strong> Juros diversificados</li>
                  <li>• <strong>Debêntures:</strong> Juros corporativos</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2 text-system-warning">🏦 Como Devedor:</h4>
                <ul className="space-y-1 text-sm text-text-secondary">
                  <li>• <strong>Empréstimo pessoal:</strong> Juros altos</li>
                  <li>• <strong>Financiamento de veículo:</strong> Juros moderados</li>
                  <li>• <strong>Financiamento imobiliário:</strong> Juros baixos</li>
                  <li>• <strong>Cartão de crédito:</strong> Juros muito altos</li>
                  <li>• <strong>Cheque especial:</strong> Juros extremamente altos</li>
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Seção: Diferença entre Juros Simples e Compostos */}
      <Card className="bg-primary-blue-light border-l-4 border-primary-blue duration-300">
        <CardHeader>
          <CardTitle as="h2" className="text-xl font-bold text-text-primary">
            ⚖️ Juros Simples vs Juros Compostos - Entenda a Diferença
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-background-dark-secondary p-6 rounded-lg border border-neutral-surface-variant">
                <h4 className="mb-4 font-bold text-primary-blue-dark text-lg flex items-center">
                  📉 <span className="ml-2">Juros Simples</span>
                </h4>
                <div className="space-y-3">
                  <div className="bg-primary-blue-light p-3 rounded border border-primary-blue/20">
                    <p className="font-mono text-sm text-primary-blue-dark mb-2"><strong>Fórmula:</strong></p>
                    <p className="font-mono text-primary-blue-dark">J = P × i × t</p>
                    <p className="font-mono text-primary-blue-dark">M = P + J</p>
                  </div>
                  <div className="space-y-2 text-sm text-text-secondary">
                    <p><strong>Características:</strong></p>
                    <ul className="space-y-1 ml-4">
                      <li>• Juros calculados <strong>apenas sobre o capital inicial</strong></li>
                      <li>• <strong>Crescimento linear</strong> (sempre o mesmo valor)</li>
                      <li>• Juros <strong>não são reinvestidos</strong></li>
                      <li>• Mais simples de calcular</li>
                    </ul>
                    <p><strong>Onde é usado:</strong></p>
                    <ul className="space-y-1 ml-4">
                      <li>• Empréstimos de curto prazo</li>
                      <li>• Descontos de duplicatas</li>
                      <li>• Algumas modalidades de financiamento</li>
                    </ul>
                  </div>
                </div>
              </div>
              
              <div className="bg-background-dark-secondary p-6 rounded-lg border border-neutral-surface-variant">
                <h4 className="mb-4 font-bold text-growth-green text-lg flex items-center">
                  📈 <span className="ml-2">Juros Compostos</span>
                </h4>
                <div className="space-y-3">
                  <div className="bg-growth-green-soft p-3 rounded border border-growth-green/20">
                    <p className="font-mono text-sm text-growth-green mb-2"><strong>Fórmula:</strong></p>
                    <p className="font-mono text-growth-green">M = P × (1 + i)^t</p>
                    <p className="font-mono text-growth-green">J = M - P</p>
                  </div>
                  <div className="space-y-2 text-sm text-text-secondary">
                    <p><strong>Características:</strong></p>
                    <ul className="space-y-1 ml-4">
                      <li>• Juros calculados sobre o <strong>montante acumulado</strong></li>
                      <li>• <strong>Crescimento exponencial</strong> (acelera com o tempo)</li>
                      <li>• “<strong>Juros sobre juros</strong>”</li>
                      <li>• Poder de multiplicação da riqueza</li>
                    </ul>
                    <p><strong>Onde é usado:</strong></p>
                    <ul className="space-y-1 ml-4">
                      <li>• Investimentos (poupança, CDB, fundos)</li>
                      <li>• Financiamentos de longo prazo</li>
                      <li>• Cartão de crédito e cheque especial</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Exemplo comparativo */}
            <div className="bg-system-warning/10 p-6 rounded-lg border border-system-warning/20">
              <h5 className="font-bold text-system-warning mb-3 flex items-center">
                📊 <span className="ml-2">Exemplo Comparativo: R$ 1.000 a 10% ao ano por 10 anos</span>
              </h5>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="font-semibold text-primary-blue-dark mb-2">Juros Simples:</p>
                  <p className="text-text-secondary">Cada ano: R$ 100 de juros</p>
                  <p className="text-text-secondary">Após 10 anos: R$ 1.000 + (R$ 100 × 10) = <strong>R$ 2.000</strong></p>
                </div>
                <div>
                  <p className="font-semibold text-growth-green mb-2">Juros Compostos:</p>
                  <p className="text-text-secondary">Cada ano: juros sobre o montante anterior</p>
                  <p className="text-text-secondary">Após 10 anos: R$ 1.000 × (1,10)^10 = <strong>R$ 2.594</strong></p>
                </div>
              </div>
              <p className="mt-3 font-semibold text-growth-green">
                Diferença: R$ 594 a mais com juros compostos! (29,7% de vantagem)
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Seção: Estratégias de Investimento */}
      <Card className="bg-growth-green-soft border-l-4 border-growth-green duration-300">
        <CardHeader>
          <CardTitle as="h2" className="text-xl font-bold text-text-primary">
            🎯 Estratégias para Maximizar seus Rendimentos
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-3 text-growth-green">🚀 Para Investidores</h4>
              <ul className="space-y-2 text-sm text-text-secondary">
                <li><strong>• Começar cedo:</strong> Tempo é o maior aliado dos juros compostos</li>
                <li><strong>• Aportes regulares:</strong> Disciplina de investimento mensal</li>
                <li><strong>• Reinvestir dividendos:</strong> Acelera o crescimento exponencial</li>
                <li><strong>• Buscar taxas melhores:</strong> Cada 1% faz diferença no longo prazo</li>
                <li><strong>• Diversificar:</strong> Reduz riscos mantendo rentabilidade</li>
                <li><strong>• Ser paciente:</strong> Não retirar o dinheiro antes do prazo</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-3 text-system-warning">⚠️ Para Devedores</h4>
              <ul className="space-y-2 text-sm text-text-secondary">
                <li><strong>• Quitar cartão de crédito:</strong> Juros compostos trabalham contra você</li>
                <li><strong>• Evitar parcelamentos longos:</strong> Quanto mais tempo, mais juros</li>
                <li><strong>• Antecipar parcelas:</strong> Economiza juros significativos</li>
                <li><strong>• Renegociar dívidas:</strong> Busque taxas menores</li>
                <li><strong>• Pagar à vista:</strong> Sempre que possível, evite financiar</li>
                <li><strong>• Comparar financiamentos:</strong> Taxas podem variar muito</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Seção: Perguntas Frequentes */}
      <Card className="bg-background-dark-secondary border border-neutral-surface-variant duration-300">
        <CardHeader>
          <CardTitle as="h2" className="text-xl font-bold text-text-primary">
            ❓ Perguntas Frequentes sobre Juros
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div>
              <h4 className="font-semibold mb-2 text-primary-blue-dark">1. Qual a diferença prática entre juros ao mês e ao ano?</h4>
              <p className="text-sm text-text-secondary">
                Juros de 10% ao ano = 0,797% ao mês (aproximadamente). Não é simplesmente 10% ÷ 12 devido ao efeito dos juros compostos. Use nossa calculadora para conversões precisas.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-2 text-primary-blue-dark">2. É melhor investir uma quantia grande de uma vez ou parcelar?</h4>
              <p className="text-sm text-text-secondary">
                Matematicamente, aplicar tudo de uma vez é melhor. Porém, aportes regulares (dollar cost averaging) reduzem o risco de timing e criam disciplina de investimento.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-2 text-primary-blue-dark">3. Como funciona a tributação nos investimentos de renda fixa?</h4>
              <p className="text-sm text-text-secondary">
                Imposto de Renda na fonte: 22,5% (até 180 dias), 20% (181-360 dias), 17,5% (361-720 dias), 15% (acima de 720 dias). Poupança é isenta para pessoa física.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-2 text-primary-blue-dark">4. O que significa taxa pré-fixada vs pós-fixada?</h4>
              <p className="text-sm text-text-secondary">
                <strong>Pré-fixada:</strong> Taxa definida no início (ex: 12% ao ano). <strong>Pós-fixada:</strong> Varia conforme indicador (ex: 100% do CDI). <strong>Híbrida:</strong> Parte fixa + indicador (ex: IPCA + 5%).
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-2 text-primary-blue-dark">5. Quando vale a pena quitar um financiamento antecipadamente?</h4>
              <p className="text-sm text-text-secondary">
                Compare a taxa do financiamento com o rendimento de seus investimentos. Se o financiamento cobra 15% ao ano e seus investimentos rendem 10%, vale mais quitar a dívida.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Seção: Calculadoras Relacionadas */}
      <Card className="bg-background-dark-secondary border border-neutral-surface-variant duration-300">
        <CardHeader>
          <CardTitle as="h2" className="text-xl font-bold text-text-primary">
            🔗 Calculadoras de Juros Especializadas
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-primary-blue-light p-4 rounded-lg border border-primary-blue/20">
              <h3 className="font-bold text-primary-blue-dark mb-2 text-sm">
                📐 Juros Simples Dedicada
              </h3>
              <p className="text-xs text-text-secondary mb-2">
                Calculadora <strong>especializada em juros simples</strong> com 4 modos de cálculo. Ideal para empréstimos de curto prazo e estudos.
              </p>
              <a 
                href="/calculadora/financas/juros-simples" 
                className="text-xs bg-primary-blue text-white px-2 py-1 rounded hover:bg-primary-blue-dark inline-block"
              >
                Calcular →
              </a>
            </div>

            <div className="bg-growth-green-soft p-4 rounded-lg border border-growth-green/20">
              <h3 className="font-bold text-growth-green mb-2 text-sm">
                📈 Juros Compostos Avançada
              </h3>
              <p className="text-xs text-text-secondary mb-2">
                Simulador completo com <strong>aportes mensais, gráficos e tabelas</strong> para investimentos de longo prazo.
              </p>
              <a 
                href="/calculadora/financas/juros-compostos" 
                className="text-xs bg-growth-green text-white px-2 py-1 rounded hover:bg-growth-green-dark inline-block"
              >
                Simular →
              </a>
            </div>

            <div className="bg-system-info/10 p-4 rounded-lg border border-system-info/20">
              <h3 className="font-bold text-system-info mb-2 text-sm">
                💰 LCI e LCA
              </h3>
              <p className="text-xs text-text-secondary mb-2">
                Simulador de investimentos em <strong>LCI e LCA com isenção de IR</strong>. Compare com CDB e Poupança.
              </p>
              <a 
                href="/calculadora/financas/lci-lca" 
                className="text-xs bg-system-info text-white px-2 py-1 rounded hover:bg-system-info-dark inline-block"
              >
                Simular →
              </a>
            </div>
            
            <div className="bg-system-success/10 p-4 rounded-lg border border-system-success/20">
              <h3 className="font-bold text-system-success mb-2 text-sm">
                🥇 Primeiro Milhão
              </h3>
              <p className="text-xs text-text-secondary mb-2">
                Descubra <strong>quando chegará ao primeiro milhão</strong> com diferentes estratégias e aportes mensais.
              </p>
              <a 
                href="/calculadora/financas/primeiro-milhao" 
                className="text-xs bg-system-success text-white px-2 py-1 rounded hover:bg-system-success-dark inline-block"
              >
                Calcular →
              </a>
            </div>
          </div>
          
          <div className="mt-4 text-center">
            <a 
              href="/calculadora/financas" 
              className="inline-flex items-center text-growth-green hover text-sm"
            >
              💰 Ver Todas as Calculadoras Financeiras
            </a>
          </div>
        </CardContent>
      </Card>

      {/* Footer com informações */}
      <Card className="bg-primary-blue-light border-l-4 border-primary-blue duration-300">
        <CardHeader>
          <CardTitle as="h2" className="text-lg font-bold text-text-primary">
            📚 Sobre Esta Calculadora de Juros
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 text-sm text-text-secondary">
            <p>
              Esta calculadora de juros é <strong className="text-primary-blue-dark">gratuita</strong> e permite comparar 
              lado a lado os resultados de juros simples e compostos. Ideal para <strong>planejamento financeiro</strong>, 
              <strong className="text-growth-green">simulações de investimento</strong> e <strong>análise de financiamentos</strong>.
            </p>
            <p>
              <strong className="text-system-warning">Atenção:</strong> Os cálculos são para fins educacionais e de planejamento. 
              Para decisões financeiras importantes, consulte sempre um <strong>planejador financeiro</strong> ou 
              <strong>consultor de investimentos</strong> certificado.
            </p>
            <p className="text-xs opacity-75">
              Cálculos baseados em fórmulas matemáticas padronizadas • Ferramenta educacional gratuita
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
