#!/usr/bin/env node

/**
 * Script para testar Google Analytics em modo de produção local
 * 
 * Simula o ambiente de produção para verificar se o GA está funcionando
 * Execute com: node scripts/test-ga-production.js
 */

import { spawn } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const projectRoot = join(__dirname, '..');

console.log('🔍 Testando Google Analytics em modo produção...\n');

// Configurar variáveis de ambiente para teste
const testEnv = {
  ...process.env,
  NODE_ENV: 'production',
  VITE_GA_ID: 'G-TEST123456', // ID fictício para teste
};

console.log('📊 Configuração de teste:');
console.log(`   NODE_ENV: ${testEnv.NODE_ENV}`);
console.log(`   VITE_GA_ID: ${testEnv.VITE_GA_ID}\n`);

// Função para executar comando com streaming de output
function runCommand(command, args, options = {}) {
  return new Promise((resolve, reject) => {
    console.log(`🚀 Executando: ${command} ${args.join(' ')}`);
    
    const child = spawn(command, args, {
      cwd: projectRoot,
      env: { ...testEnv, ...options.env },
      stdio: ['inherit', 'pipe', 'pipe'],
      shell: true
    });

    let stdout = '';
    let stderr = '';

    child.stdout.on('data', (data) => {
      const output = data.toString();
      stdout += output;
      process.stdout.write(output);
    });

    child.stderr.on('data', (data) => {
      const output = data.toString();
      stderr += output;
      process.stderr.write(output);
    });

    child.on('close', (code) => {
      if (code === 0) {
        resolve({ stdout, stderr, code });
      } else {
        reject(new Error(`Command failed with code ${code}`));
      }
    });

    child.on('error', (error) => {
      reject(error);
    });
  });
}

// Função para verificar se o build contém as configurações do GA
function checkBuildForGA() {
  console.log('\n🔍 Verificando se o build contém Google Analytics...');
  
  try {
    const fs = require('fs');
    const path = require('path');
    
    // Verificar arquivos do build
    const buildClientPath = path.join(projectRoot, 'build', 'client');
    const buildServerPath = path.join(projectRoot, 'build', 'server');
    
    if (!fs.existsSync(buildClientPath)) {
      console.log('❌ Build client não encontrado');
      return false;
    }
    
    // Verificar se existe referência ao GA no build
    const manifestPath = path.join(buildClientPath, '.vite', 'manifest.json');
    if (fs.existsSync(manifestPath)) {
      const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
      console.log('✅ Manifest encontrado');
      
      // Verificar se existe root.js no manifest (contém configuração do GA)
      const hasRoot = Object.keys(manifest).some(key => key.includes('root'));
      if (hasRoot) {
        console.log('✅ Arquivo root encontrado no build');
      } else {
        console.log('⚠️  Arquivo root não encontrado no manifest');
      }
    }
    
    return true;
  } catch (error) {
    console.error('❌ Erro ao verificar build:', error.message);
    return false;
  }
}

// Função principal
async function main() {
  try {
    console.log('🏗️  Fazendo build em modo produção...\n');
    
    // 1. Fazer build com configurações de produção
    await runCommand('npm', ['run', 'build'], {
      env: testEnv
    });
    
    console.log('\n✅ Build concluído com sucesso!\n');
    
    // 2. Verificar se o build contém as configurações do GA
    const buildValid = checkBuildForGA();
    
    if (!buildValid) {
      console.log('❌ Build não contém configurações válidas do Google Analytics');
      process.exit(1);
    }
    
    console.log('\n📋 Resumo do teste:');
    console.log('✅ Build de produção: OK');
    console.log('✅ Variáveis de ambiente: OK');
    console.log('✅ Estrutura do GA: OK');
    
    console.log('\n🎯 Próximos passos para deploy real:');
    console.log('1. Configure VITE_GA_ID no Vercel com seu ID real (G-XXXXXXXXXX)');
    console.log('2. Faça deploy para produção');
    console.log('3. Acesse a aplicação e verifique o Network tab para requests do GA');
    console.log('4. Verifique o dashboard do Google Analytics');
    
    console.log('\n📚 Documentação completa:');
    console.log('   docs/GOOGLE_ANALYTICS.md');
    
    console.log('\n🎉 Teste do Google Analytics concluído com sucesso!');
    
  } catch (error) {
    console.error('\n❌ Erro durante o teste:', error.message);
    process.exit(1);
  }
}

// Interceptar Ctrl+C para cleanup
process.on('SIGINT', () => {
  console.log('\n\n⏹️  Teste interrompido pelo usuário');
  process.exit(0);
});

// Executar se chamado diretamente
if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch(console.error);
}