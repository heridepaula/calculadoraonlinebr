# Google Analytics 4 - Configuração de Dimensões Customizadas

## 🚀 **RESOLVER DADOS "(NOT SET)" NO GA4**

Este documento orienta como configurar as dimensões customizadas no Google Analytics 4 para resolver os problemas de dados "(not set)" nos relatórios.

---

## 📊 **DIMENSÕES CUSTOMIZADAS IMPLEMENTADAS**

### **Passo 1: Acessar Configuração do GA4**

1. Acesse [Google Analytics](https://analytics.google.com)
2. Selecione a propriedade **CalculadoraOnlineBR**
3. Clique em **Configurar** → **Definições customizadas** → **Dimensões customizadas**

### **Passo 2: Criar Dimensões Customizadas**

Configure as seguintes dimensões para resolver dados "(not set)":

#### **Dimensão 1: user_type**
- **Nome da dimensão:** Tipo de Usuário
- **Âmbito:** Usuário
- **Descrição:** Tipo de usuário (new_visitor, returning_visitor)
- **Nome do parâmetro do evento:** `user_type`

#### **Dimensão 2: traffic_source**
- **Nome da dimensão:** Fonte de Tráfego
- **Âmbito:** Sessão
- **Descrição:** Fonte detectada automaticamente (organic, social, direct, referral)
- **Nome do parâmetro do evento:** `traffic_source`

#### **Dimensão 3: campaign_name**
- **Nome da dimensão:** Nome da Campanha
- **Âmbito:** Sessão
- **Descrição:** Nome da campanha UTM ou "no-campaign"
- **Nome do parâmetro do evento:** `campaign_name`

#### **Dimensão 4: page_category**
- **Nome da dimensão:** Categoria da Página
- **Âmbito:** Evento
- **Descrição:** Categoria da calculadora (matematica, financas, astrologia, etc.)
- **Nome do parâmetro do evento:** `page_category`

#### **Dimensão 5: calculator_type**
- **Nome da dimensão:** Tipo de Calculadora
- **Âmbito:** Evento
- **Descrição:** Nome específico da calculadora
- **Nome do parâmetro do evento:** `calculator_type`

---

## 🔧 **CONFIGURAÇÕES DE ATTRIBUTION**

### **Enhanced Attribution Implementada:**

✅ **First-Party Storage:** Habilitado para preservar dados de atribuição
✅ **UTM Parameters:** Detectados automaticamente
✅ **Referrer Detection:** Fonte automática baseada no referrer
✅ **Campaign Attribution:** Mapeamento completo de campanhas
✅ **Session Persistence:** 90 dias para atribuição

### **Mapping Configurado:**

```javascript
custom_map: {
  dimension1: 'user_type',
  dimension2: 'traffic_source',
  dimension3: 'campaign_name',
  dimension4: 'page_category',
  dimension5: 'calculator_type'
}
```

---

## 📈 **EVENTOS CUSTOMIZADOS CONFIGURADOS**

### **Eventos para Resolver (not set):**

1. **page_view** - Page views com atribuição completa
2. **calculator_interaction** - Uso de calculadoras
3. **scroll** - Profundidade de scroll (25%, 50%, 75%, 100%)
4. **timing_complete** - Tempo na página (30s, 60s, 120s, 300s)
5. **click** - Cliques em links externos
6. **file_download** - Downloads de arquivos
7. **search** - Pesquisas internas

---

## 🎯 **RELATÓRIOS MELHORADOS**

### **Métricas que não mostrarão mais "(not set)":**

✅ **Canal de aquisição padrão:** Organic, Direct, Social, Referral
✅ **Fonte/Meio:** Detectado automaticamente ou via UTM
✅ **Campanha:** UTM campaign ou "no-campaign"
✅ **Categoria de página:** Sempre definida
✅ **Tipo de calculadora:** Sempre definida

### **Relatórios Customizados Sugeridos:**

1. **Funil de Calculadoras:**
   - Dimensão: Categoria da Página + Tipo de Calculadora
   - Métrica: Usuários, Sessões, Eventos

2. **Performance por Fonte:**
   - Dimensão: Fonte de Tráfego + Nome da Campanha
   - Métrica: Conversões, Tempo na página

3. **Engagement por Categoria:**
   - Dimensão: Categoria da Página
   - Métrica: Scroll depth, Tempo na página

---

## ⚡ **TIMELINE DE IMPLEMENTAÇÃO**

- **0-24h:** Implementação técnica ativa
- **24-48h:** Dados começam a ser coletados com dimensões
- **1-2 semanas:** Relatórios mostram redução significativa de "(not set)"
- **1 mês:** Dados históricos completos para análise

---

## 🔍 **VALIDAÇÃO E TESTE**

### **Como Verificar se Está Funcionando:**

1. **DebugView do GA4:**
   - Acesse **Configurar** → **DebugView**
   - Verifique se eventos contêm as dimensões customizadas

2. **Relatórios em Tempo Real:**
   - Verifique se dimensões aparecem nos eventos em tempo real

3. **Google Tag Assistant:**
   - Instale a extensão para verificar parâmetros enviados

### **Comando de Debug (Development):**

```javascript
// Verificar dados de atribuição
console.log({
  traffic_source: getTrafficSource(),
  page_category: getPageCategory(),
  calculator_type: getCalculatorType(),
  utm_campaign: getUTMParameter('utm_campaign'),
  utm_source: getUTMParameter('utm_source'),
  utm_medium: getUTMParameter('utm_medium')
});
```

---

## 📞 **SUPORTE E MONITORAMENTO**

- Monitorar **Search Console** para acompanhar mudanças no tracking
- Verificar **Core Web Vitals** para garantir que não houve impacto na performance
- Acompanhar taxa de "(not set)" semanalmente nos primeiros 30 dias

**RESULTADO ESPERADO:** Redução de 70-90% dos dados "(not set)" nos relatórios de aquisição e comportamento do GA4.