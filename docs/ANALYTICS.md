# 📊 Vercel Analytics - Configuração e Uso

Este documento explica como o Vercel Analytics está configurado na aplicação **Calculadora Online BR** e como utilizá-lo corretamente.

## 🚀 Configuração Implementada

### Pacotes Instalados
```bash
npm install @vercel/analytics @vercel/speed-insights
```

### Configuração no Root
```typescript
// app/root.tsx
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";

// Componentes adicionados no App
<Analytics />
<SpeedInsights />
```

## 📈 Funcionalidades Implementadas

### 1. Analytics Básico (`@vercel/analytics`)
- **Page Views**: Rastreamento automático de visualizações de página
- **Custom Events**: Eventos personalizados para ações específicas
- **User Behavior**: Análise de comportamento sem dados pessoais

### 2. Speed Insights (`@vercel/speed-insights`)
- **Core Web Vitals**: Métricas de performance em tempo real
- **Loading Times**: Tempos de carregamento por página
- **Performance Monitoring**: Monitoramento contínuo

## 🎯 Eventos Personalizados

### Hook useAnalytics
```typescript
import { useAnalytics } from "~/hooks/useAnalytics";

const { trackCalculator, trackResult, trackFeature, trackError } = useAnalytics();
```

### Eventos Disponíveis

#### 1. Calculator Usage
```typescript
trackCalculator({
  calculator_type: "fracoes",
  user_inputs: { operation: "add", hasValidInputs: true }
});
```

#### 2. Result Tracking
```typescript
trackResult({
  calculator_type: "fracoes",
  calculation_time_ms: 250,
  success: true
});
```

#### 3. Feature Interactions
```typescript
trackFeature("show_calculation_steps");
```

#### 4. Error Tracking
```typescript
trackError("Invalid fraction format");
```

## 📊 Métricas Brasileiras

### Brazilian Market Tracking
```typescript
trackBrazilianCalculator({
  calculator_type: "salario_liquido",
  regulation_type: "CLT",
  currency_used: true
});
```

### Categorias Monitoradas
- **Saúde**: IMC, Gordura Corporal, etc.
- **Finanças**: Juros, CDB, Tesouro Direto
- **Matemática**: Frações, Porcentagem, Geometria
- **Trabalhista**: CLT, INSS, IRRF, FGTS

## 🔒 Privacy & Compliance

### Dados NÃO Coletados
- ❌ Informações pessoais
- ❌ Valores específicos dos cálculos
- ❌ Dados sensíveis dos usuários
- ❌ IPs ou identificadores únicos

### Dados Coletados (Anonimizados)
- ✅ Tipo de calculadora utilizada
- ✅ Tempo de cálculo
- ✅ Categoria acessada
- ✅ Sucesso/erro nas operações
- ✅ Métricas de performance

### LGPD Compliance
- Coleta apenas dados necessários para melhorar UX
- Não armazena informações pessoais
- Foco em métricas agregadas e anônimas

## 📈 Dashboard do Vercel

### Acesso
1. Entre no [Vercel Dashboard](https://vercel.com/dashboard)
2. Selecione o projeto "calculadora-online-br"
3. Vá para a aba "Analytics"

### Métricas Disponíveis
- **Page Views**: Páginas mais visitadas
- **Top Events**: Eventos personalizados mais frequentes
- **Performance**: Core Web Vitals e tempos de carregamento
- **Devices**: Distribuição mobile vs desktop
- **Locations**: Países e regiões (foco no Brasil)

## 🛠️ Implementação em Novas Calculadoras

### Passo 1: Importar o Hook
```typescript
import { useAnalytics } from "~/hooks/useAnalytics";
```

### Passo 2: Usar no Componente
```typescript
export default function MinhaCalculadora() {
  const { trackCalculator, trackResult } = useAnalytics();
  
  const handleCalculate = async () => {
    const startTime = performance.now();
    
    try {
      // Track uso da calculadora
      trackCalculator({
        calculator_type: "minha_calculadora",
        user_inputs: { hasInputs: true }
      });
      
      // Fazer cálculo...
      const result = calculateSomething();
      
      // Track resultado
      trackResult({
        calculator_type: "minha_calculadora",
        calculation_time_ms: performance.now() - startTime,
        success: true
      });
      
    } catch (error) {
      trackResult({
        calculator_type: "minha_calculadora",
        calculation_time_ms: performance.now() - startTime,
        success: false
      });
    }
  };
}
```

### Passo 3: Track Features Específicas
```typescript
// Quando usuário clica em funcionalidades específicas
<Button onClick={() => {
  trackFeature("export_results");
  handleExport();
}}>
  Exportar Resultado
</Button>
```

## 🎯 Objetivos do Analytics

### Métricas de Sucesso
1. **Engagement**: Tempo na página, interações
2. **Conversão**: Uso efetivo das calculadoras
3. **Performance**: Core Web Vitals acima de 90
4. **Experiência**: Redução de erros e abandono

### Otimizações Baseadas em Dados
- Identificar calculadoras mais populares
- Melhorar performance das páginas lentas
- Reduzir erros baseado em tracking
- Otimizar fluxos com maior abandono

## 🔄 Atualizações Futuras

### Roadmap Analytics
- [ ] A/B Testing com Vercel
- [ ] Heatmaps para UX insights
- [ ] Conversion Funnels
- [ ] Real User Monitoring (RUM)

### Integrações Possíveis
- [ ] Google Analytics 4 (complementar)
- [ ] Hotjar para behavior analysis
- [ ] Sentry para error monitoring
- [ ] LogRocket para session replay

---

**Lembre-se**: O Vercel Analytics funciona automaticamente em produção. Em desenvolvimento local, os eventos são logados no console para debugging.