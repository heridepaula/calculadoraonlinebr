# Google Analytics 4 (GA4) - Configuração Global

Este documento explica como o Google Analytics foi implementado na aplicação Remix para rastreamento global de page views.

## 📊 Visão Geral

O Google Analytics foi configurado para funcionar **apenas em produção** com rastreamento automático de navegação entre páginas. A implementação segue as melhores práticas de privacidade e performance.

## 🔧 Configuração

### Variável de Ambiente

Configure a variável de ambiente no Vercel ou em seu provedor de hosting:

```bash
VITE_GA_ID=G-XXXXXXXXXX
```

⚠️ **Importante**: Use `VITE_GA_ID` (não `NEXT_PUBLIC_GA_ID`) pois esta é uma aplicação Remix com Vite.

### Estrutura dos Arquivos

```
app/
├── lib/
│   └── google-analytics.ts      # Utilitários core do GA
├── hooks/
│   └── useGoogleAnalytics.ts    # Hooks React para tracking
└── root.tsx                     # Integração global no layout
```

## 🚀 Como Funciona

### 1. Detecção Automática

O sistema verifica automaticamente:
- ✅ `NODE_ENV === 'production'`
- ✅ `VITE_GA_ID` está configurado
- ✅ ID do GA começa com 'G-' (formato GA4)

### 2. Carregamento Condicional

O script do GA é carregado apenas quando todas as condições são atendidas:

```typescript
// root.tsx - Carregamento condicional
{data?.ENV?.VITE_GA_ID && data?.ENV?.NODE_ENV === 'production' && (
  <script async src={`https://www.googletagmanager.com/gtag/js?id=${data.ENV.VITE_GA_ID}`} />
)}
```

### 3. Tracking Automático

O hook `useGoogleAnalytics()` no componente `App` rastreia automaticamente:
- 📄 **Page views** em mudanças de rota
- 🔄 **Navegação client-side** do Remix
- ⚡ **Debounce** para evitar tracking duplicado

## 🛡️ Privacidade e LGPD

A configuração inclui proteções para compliance com LGPD:

```javascript
gtag('config', 'G-XXXXXXXXXX', {
  anonymize_ip: true,                    // Anonimizar IPs
  allow_google_signals: false,          // Desabilitar Google Signals
  allow_ad_personalization_signals: false, // Sem personalização de anúncios
  send_page_view: true                   // Apenas page views
});
```

## 🎯 O Que É Rastreado

### ✅ Dados Coletados
- **Page views** automáticos
- **Título da página** (`document.title`)
- **URL da página** (pathname + search)
- **Origem da página** (domain)

### ❌ Dados NÃO Coletados
- Eventos de calculadoras (conforme solicitado)
- Cliques em botões
- Preenchimento de formulários
- Dados pessoais identificáveis
- Informações de anúncios

## 📱 Implementação por Página

### Automatic Tracking (Padrão)

Todas as páginas são automaticamente rastreadas via `useGoogleAnalytics()` no componente raiz.

### Custom Title (Opcional)

Para páginas com títulos customizados:

```typescript
// Em qualquer página/componente
import { usePageTracking } from '~/hooks/useGoogleAnalytics';

export default function MinhaCalculadora() {
  usePageTracking('Calculadora de IMC - Calculadora Online BR');
  
  return <div>Conteúdo da página</div>;
}
```

### Disable Tracking (Opcional)

Para páginas administrativas ou de erro:

```typescript
import { useNoTracking } from '~/hooks/useGoogleAnalytics';

export default function PaginaAdmin() {
  useNoTracking(); // Esta página não será rastreada
  
  return <div>Conteúdo administrativo</div>;
}
```

## 🔍 Debug e Desenvolvimento

### Console Logs

Em desenvolvimento, o sistema mostra logs úteis:

```javascript
console.log('[GA] Google Analytics inicializado:', 'G-XXXXXXXXXX');
console.log('[GA] Page view tracked:', { url: '/calculadoras/imc', title: 'Calculadora IMC' });
```

### Debug Hook

Use o hook de debug em desenvolvimento:

```typescript
import { useGADebug } from '~/hooks/useGoogleAnalytics';

const debug = useGADebug();
console.log('GA Debug Info:', debug);
// Saída:
// {
//   isEnabled: false,
//   currentPath: '/calculadoras/imc',
//   gaId: undefined,
//   nodeEnv: 'development',
//   hasGtagFunction: false,
//   hasDataLayer: false
// }
```

## 🚀 Deploy e Verificação

### 1. Configurar Variável de Ambiente

No Vercel:
```bash
vercel env add VITE_GA_ID
# Digite: G-XXXXXXXXXX
```

### 2. Deploy para Produção

```bash
npm run build
vercel --prod
```

### 3. Verificar Funcionamento

1. Acesse a aplicação em produção
2. Abra o DevTools → Network
3. Procure por requests para `googletagmanager.com`
4. Navegue entre páginas e verifique novos requests

### 4. Verificar no GA Dashboard

1. Acesse [Google Analytics](https://analytics.google.com)
2. Selecione sua propriedade
3. Vá em **Relatórios** → **Tempo real**
4. Navegue pela aplicação e veja os dados em tempo real

## 📊 Relatórios Importantes

### Page Views por Página

**Relatórios** → **Engajamento** → **Páginas e telas**
- Ver quais calculadoras são mais acessadas
- Analisar tempo na página
- Identificar páginas com alta taxa de rejeição

### Origens de Tráfego

**Relatórios** → **Aquisição** → **Visão geral de aquisição**
- Como os usuários chegam ao site
- Tráfego orgânico vs direto vs referência

### Dados Demográficos

**Relatórios** → **Dados demográficos** → **Visão geral de dados demográficos**
- Localização dos usuários (foco no Brasil)
- Dispositivos utilizados (mobile vs desktop)

## 🔧 Troubleshooting

### GA Não Está Funcionando

1. **Verificar variável de ambiente**:
   ```bash
   echo $VITE_GA_ID
   ```

2. **Verificar se está em produção**:
   ```bash
   echo $NODE_ENV
   ```

3. **Verificar console do navegador**:
   - Procure por logs `[GA]`
   - Verifique erros de carregamento

4. **Verificar Network tab**:
   - Deve haver requests para `googletagmanager.com`
   - Requests para `/g/collect` indicam eventos sendo enviados

### Dados Não Aparecem no Dashboard

- **Delay normal**: Dados podem demorar até 24h para aparecer
- **Tempo real**: Use relatórios em tempo real para verificação imediata
- **Filtros**: Verifique se não há filtros ativos no GA

## 🚀 Performance

### Otimizações Implementadas

1. **DNS Prefetch**: `<link rel="dns-prefetch" href="https://www.googletagmanager.com" />`
2. **Script Async**: Carregamento não-bloqueante
3. **Carregamento Condicional**: Apenas em produção
4. **Debounce**: Evita tracking duplicado em navegação rápida

### Impact Score

- **Bundle Size**: +0KB (script externo)
- **Performance Score**: Impacto mínimo (<1%)
- **Time to Interactive**: Sem impacto (loading assíncrono)

## 📚 Referências

- [Google Analytics 4 Documentation](https://developers.google.com/analytics/devguides/collection/ga4)
- [Remix SSR and Client Hydration](https://remix.run/docs/en/main/guides/ssr)
- [LGPD Compliance](https://www.gov.br/cidadania/pt-br/acesso-a-informacao/lgpd)
- [Vite Environment Variables](https://vitejs.dev/guide/env-and-mode.html)