#!/usr/bin/env node

/**
 * Script para adicionar Analytics Global em todas as calculadoras
 * Execute com: node scripts/add-global-analytics.js
 */

import fs from 'fs';
import path from 'path';

const routesDir = path.join(process.cwd(), 'app', 'routes');

// Mapeamento de calculadoras por categoria
const calculatorMappings = {
  'calculadoras.saude.imc.tsx': { type: 'imc', category: 'saude' },
  'calculadoras.saude.gordura-corporal.tsx': { type: 'gordura_corporal', category: 'saude' },
  'calculadoras.saude.ciclo-menstrual.tsx': { type: 'ciclo_menstrual', category: 'saude' },
  'calculadoras.saude.desenvolvimento-infantil.tsx': { type: 'desenvolvimento_infantil', category: 'saude' },
  'calculadoras.saude.hidratacao.tsx': { type: 'hidratacao', category: 'saude' },
  
  'calculadoras.financas.juros-compostos.tsx': { type: 'juros_compostos', category: 'financas' },
  'calculadoras.financas.primeiro-milhao.tsx': { type: 'primeiro_milhao', category: 'financas' },
  'calculadoras.financas.cdb.tsx': { type: 'cdb', category: 'financas' },
  'calculadoras.financas.tesouro-direto.tsx': { type: 'tesouro_direto', category: 'financas' },
  'calculadoras.financas.lci-lca.tsx': { type: 'lci_lca', category: 'financas' },
  'calculadoras.financas.emprestimo-consignado.tsx': { type: 'emprestimo_consignado', category: 'financas' },
  'calculadoras.financas.financiamento-imobiliario.tsx': { type: 'financiamento_imobiliario', category: 'financas' },
  'calculadoras.financas.juros-simples.tsx': { type: 'juros_simples', category: 'financas' },
  'calculadoras.financas.preco-medio.tsx': { type: 'preco_medio', category: 'financas' },
  'calculadoras.financas.consorcio.tsx': { type: 'consorcio', category: 'financas' },
  'calculadoras.financas.renda-fixa-comparativa.tsx': { type: 'renda_fixa_comparativa', category: 'financas' },
  
  'calculadoras.matematica.porcentagem.tsx': { type: 'porcentagem', category: 'matematica' },
  'calculadoras.matematica.regra-de-tres.tsx': { type: 'regra_de_tres', category: 'matematica' },
  'calculadoras.matematica.equacao-segundo-grau.tsx': { type: 'equacao_segundo_grau', category: 'matematica' },
  'calculadoras.matematica.mmc-mdc.tsx': { type: 'mmc_mdc', category: 'matematica' },
  'calculadoras.matematica.area-perimetro.tsx': { type: 'area_perimetro', category: 'matematica' },
  'calculadoras.matematica.volume.tsx': { type: 'volume', category: 'matematica' },
  'calculadoras.matematica.teorema-pitagoras.tsx': { type: 'teorema_pitagoras', category: 'matematica' },
  // fracoes já foi atualizada
  
  'calculadoras.trabalhista.rescisao.tsx': { type: 'rescisao', category: 'trabalhista' },
  'calculadoras.trabalhista.aposentadoria.tsx': { type: 'aposentadoria', category: 'trabalhista' },
  'calculadoras.trabalhista.auxilio-doenca.tsx': { type: 'auxilio_doenca', category: 'trabalhista' },
  'calculadoras.trabalhista.salario-liquido.tsx': { type: 'salario_liquido', category: 'trabalhista' },
  'calculadoras.trabalhista.ferias-decimo-terceiro.tsx': { type: 'ferias_decimo_terceiro', category: 'trabalhista' }
};

// Template do import
const importTemplate = `import { useAutoCalculatorTracking, useFormTracking } from "~/hooks/useAutoCalculatorTracking";`;

// Template do hook usage
const hookTemplate = (type, category) => `
  // Global Analytics Tracking
  const { 
    startCalculation, 
    endCalculation, 
    trackFeature, 
    trackButtonClick,
    trackStepsToggle,
    trackInputFocus 
  } = useAutoCalculatorTracking({ 
    calculatorType: "${type}",
    category: "${category}"
  });
  
  const { trackInputChange, trackFormSubmission } = useFormTracking("${type}");`;

// Template para handleCalculation
const handleCalculationTemplate = `
    // Start tracking calculation
    startCalculation();
    trackFormSubmission();
    
    try {
      // ... existing calculation logic ...
      
      // Track successful calculation
      endCalculation(true);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Erro no cálculo";
      
      // Track failed calculation
      endCalculation(false, errorMessage);
      
      // ... existing error handling ...
    }`;

function addAnalyticsToFile(filePath, calculatorInfo) {
  console.log(`📊 Adicionando Analytics em: ${filePath}`);
  
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // 1. Adicionar import se não existir
    if (!content.includes('useAutoCalculatorTracking')) {
      // Encontrar onde adicionar o import
      const importRegex = /import.*from.*["'][^"']*["'];?\n/g;
      const imports = content.match(importRegex) || [];
      const lastImportIndex = content.lastIndexOf(imports[imports.length - 1]) + imports[imports.length - 1].length;
      
      content = content.slice(0, lastImportIndex) + 
                importTemplate + '\n' + 
                content.slice(lastImportIndex);
    }
    
    // 2. Adicionar hooks após useState declarations
    if (!content.includes('useAutoCalculatorTracking({')) {
      const stateRegex = /const \[.*useState.*\n/g;
      const states = content.match(stateRegex) || [];
      
      if (states.length > 0) {
        const lastStateIndex = content.lastIndexOf(states[states.length - 1]) + states[states.length - 1].length;
        
        content = content.slice(0, lastStateIndex) + 
                  hookTemplate(calculatorInfo.type, calculatorInfo.category) + '\n' + 
                  content.slice(lastStateIndex);
      }
    }
    
    // 3. Salvar arquivo atualizado
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`✅ ${calculatorInfo.type} - Analytics adicionado com sucesso`);
    
  } catch (error) {
    console.error(`❌ Erro ao processar ${filePath}:`, error.message);
  }
}

function main() {
  console.log('🚀 Iniciando adição de Analytics Global...\n');
  
  let processedCount = 0;
  let errorCount = 0;
  
  Object.entries(calculatorMappings).forEach(([fileName, calculatorInfo]) => {
    const filePath = path.join(routesDir, fileName);
    
    if (fs.existsSync(filePath)) {
      addAnalyticsToFile(filePath, calculatorInfo);
      processedCount++;
    } else {
      console.log(`⚠️  Arquivo não encontrado: ${fileName}`);
      errorCount++;
    }
  });
  
  console.log('\n📈 Resumo:');
  console.log(`✅ Processados: ${processedCount} arquivos`);
  console.log(`⚠️  Erros/Não encontrados: ${errorCount} arquivos`);
  console.log('\n🎯 Próximos passos:');
  console.log('1. Revisar os arquivos modificados');
  console.log('2. Adaptar handleCalculation em cada calculadora');
  console.log('3. Testar funcionamento individual');
  console.log('4. Deploy para Vercel para ativar Analytics');
  console.log('\n📊 Analytics Global configurado em toda a aplicação!');
}

main();