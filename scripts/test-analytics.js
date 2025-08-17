#!/usr/bin/env node

/**
 * Script para testar o Vercel Analytics em ambiente de desenvolvimento
 * Execute com: node scripts/test-analytics.js
 */

import { track } from '@vercel/analytics';

console.log('🧪 Testando Vercel Analytics...\n');

// Teste 1: Event básico
console.log('1. Testando evento básico...');
track('test_event', {
  test_property: 'test_value',
  timestamp: new Date().toISOString()
});

// Teste 2: Calculator event
console.log('2. Testando evento de calculadora...');
track('calculator_used', {
  calculator: 'test',
  category: 'matematica',
  has_inputs: true
});

// Teste 3: Result event
console.log('3. Testando evento de resultado...');
track('result_calculated', {
  calculator: 'test',
  duration: 150,
  success: true
});

// Teste 4: Feature event
console.log('4. Testando evento de feature...');
track('feature_clicked', {
  feature: 'test_feature',
  location: '/test'
});

// Teste 5: Brazilian market event
console.log('5. Testando evento específico do mercado brasileiro...');
track('brazilian_calculator_used', {
  calculator: 'test_calculadora',
  regulation: 'CLT',
  uses_currency: true,
  locale: 'pt-BR'
});

console.log('\n✅ Testes concluídos!');
console.log('📊 Verifique o Vercel Dashboard para ver os eventos');
console.log('🔗 https://vercel.com/dashboard > Analytics > Custom Events');

if (process.env.NODE_ENV === 'development') {
  console.log('\n⚠️  Nota: Em desenvolvimento, os eventos podem não aparecer imediatamente');
  console.log('   Os eventos funcionam melhor em produção no Vercel');
}