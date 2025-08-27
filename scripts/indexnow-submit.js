#!/usr/bin/env node

/**
 * IndexNow CLI Submission Script
 * 
 * This script allows manual submission of URLs to IndexNow from the command line.
 * It's useful for batch submissions and CI/CD integration.
 * 
 * Usage:
 *   node scripts/indexnow-submit.js --single https://example.com/page
 *   node scripts/indexnow-submit.js --bulk url1 url2 url3
 *   node scripts/indexnow-submit.js --all-main-pages
 *   node scripts/indexnow-submit.js --calculator /calculadoras/matematica/equacao-segundo-grau
 */

import { createRequire } from 'module';
const require = createRequire(import.meta.url);

// Try to import the built server module, fallback to direct implementation if not available
let indexNowService;

try {
  const serverModule = await import('../build/server/nodejs-eyJydW50aW1lIjoibm9kZWpzIn0/index.js');
  indexNowService = serverModule.indexNowService;
} catch (error) {
  console.warn('⚠️  Built server module not found. Using direct implementation...');
  
  // Fallback implementation for development
  class IndexNowServiceCLI {
    constructor() {
      this.key = process.env.INDEXNOW_KEY || 'd4b3a37c56c70c96d0fc36378e111d16a64e5e8f113a7d28aba467aef6d28cbb';
      this.host = process.env.INDEXNOW_HOST || 'calculadoraonlinebr.com.br';
      this.keyLocation = process.env.INDEXNOW_KEY_LOCATION || `https://${this.host}/${this.key}.txt`;
      this.searchEngines = [
        'https://api.indexnow.org/indexnow',
        'https://www.bing.com/indexnow'
      ];
    }

    validateKey(key) {
      const hexPattern = /^[a-fA-F0-9]{8,128}$/;
      return hexPattern.test(key);
    }

    validateUrl(url) {
      try {
        const urlObj = new URL(url);
        return urlObj.hostname === this.host || urlObj.hostname === `www.${this.host}`;
      } catch {
        return false;
      }
    }

    async submitUrl(url) {
      if (!this.validateKey(this.key)) {
        return { success: false, status: 400, message: 'Invalid IndexNow key format' };
      }

      if (!this.validateUrl(url)) {
        return { success: false, status: 400, message: `URL does not belong to host ${this.host}` };
      }

      const results = [];
      
      for (const endpoint of this.searchEngines) {
        try {
          const submitUrl = `${endpoint}?url=${encodeURIComponent(url)}&key=${this.key}`;
          
          const response = await fetch(submitUrl, {
            method: 'GET',
            headers: { 'User-Agent': 'CalculadoraOnlineBR IndexNow Client/1.0' }
          });

          results.push({
            success: response.ok,
            status: response.status,
            message: response.ok ? 'URL submitted successfully' : `HTTP ${response.status}: ${response.statusText}`,
            submittedUrls: [url]
          });
        } catch (error) {
          results.push({
            success: false,
            status: 500,
            message: `Network error: ${error.message}`
          });
        }
      }

      const successfulResult = results.find(r => r.success);
      return successfulResult || results[results.length - 1];
    }

    async submitUrls(urls) {
      if (!this.validateKey(this.key)) {
        return { success: false, status: 400, message: 'Invalid IndexNow key format' };
      }

      const validUrls = urls.filter(url => this.validateUrl(url));
      
      if (validUrls.length === 0) {
        return { success: false, status: 400, message: 'No valid URLs provided' };
      }

      if (validUrls.length > 10000) {
        return { success: false, status: 400, message: 'Maximum 10,000 URLs allowed per request' };
      }

      const payload = {
        host: this.host,
        key: this.key,
        keyLocation: this.keyLocation,
        urlList: validUrls
      };

      const results = [];
      
      for (const endpoint of this.searchEngines) {
        try {
          const response = await fetch(endpoint, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json; charset=utf-8',
              'User-Agent': 'CalculadoraOnlineBR IndexNow Client/1.0'
            },
            body: JSON.stringify(payload)
          });

          results.push({
            success: response.ok,
            status: response.status,
            message: response.ok ? `${validUrls.length} URLs submitted successfully` : `HTTP ${response.status}: ${response.statusText}`,
            submittedUrls: validUrls
          });
        } catch (error) {
          results.push({
            success: false,
            status: 500,
            message: `Network error: ${error.message}`
          });
        }
      }

      const successfulResult = results.find(r => r.success);
      return successfulResult || results[results.length - 1];
    }

    async submitCalculatorUrls(calculatorPath) {
      const baseUrl = `https://${this.host}`;
      const urls = [
        `${baseUrl}${calculatorPath}`,
        calculatorPath.includes('/calculadoras/') ? `${baseUrl}/calculadoras` : null,
        calculatorPath.match(/\/calculadoras\/([^/]+)\//) ? 
          `${baseUrl}/calculadoras/${calculatorPath.match(/\/calculadoras\/([^/]+)\//)?.[1]}` : null
      ].filter(Boolean);

      return this.submitUrls(urls);
    }

    async submitMainPages() {
      const baseUrl = `https://${this.host}`;
      const urls = [
        baseUrl,
        `${baseUrl}/calculadoras`,
        `${baseUrl}/calculadoras/saude`,
        `${baseUrl}/calculadoras/financas`,
        `${baseUrl}/calculadoras/matematica`,
        `${baseUrl}/calculadoras/trabalhista`,
        `${baseUrl}/sobre`,
        `${baseUrl}/privacidade`,
        `${baseUrl}/termos-de-uso`,
      ];

      return this.submitUrls(urls);
    }

    getConfig() {
      return {
        key: this.key,
        host: this.host,
        keyLocation: this.keyLocation,
        searchEngines: this.searchEngines,
        keyValid: this.validateKey(this.key)
      };
    }
  }
  
  indexNowService = new IndexNowServiceCLI();
}

const args = process.argv.slice(2);

async function main() {
  if (args.length === 0 || args.includes('--help') || args.includes('-h')) {
    console.log(`
IndexNow URL Submission Tool

Usage:
  node scripts/indexnow-submit.js [command] [options]

Commands:
  --single <url>              Submit a single URL
  --bulk <url1> <url2> ...    Submit multiple URLs
  --calculator <path>         Submit calculator and related URLs
  --all-main-pages           Submit all main pages
  --config                   Show current IndexNow configuration
  --help, -h                 Show this help message

Examples:
  node scripts/indexnow-submit.js --single https://calculadoraonlinebr.com.br/calculadoras/matematica/equacao-segundo-grau
  node scripts/indexnow-submit.js --bulk https://calculadoraonlinebr.com.br/ https://calculadoraonlinebr.com.br/calculadoras
  node scripts/indexnow-submit.js --calculator /calculadoras/matematica/equacao-segundo-grau
  node scripts/indexnow-submit.js --all-main-pages
  node scripts/indexnow-submit.js --config
`);
    process.exit(0);
  }

  try {
    // Show configuration
    if (args.includes('--config')) {
      const config = indexNowService.getConfig();
      console.log('🔧 IndexNow Configuration:');
      console.log(`   Key: ${config.key.substring(0, 8)}...${config.key.substring(config.key.length - 8)}`);
      console.log(`   Host: ${config.host}`);
      console.log(`   Key Location: ${config.keyLocation}`);
      console.log(`   Key Valid: ${config.keyValid ? '✅' : '❌'}`);
      console.log(`   Search Engines: ${config.searchEngines.length}`);
      config.searchEngines.forEach((engine, index) => {
        console.log(`   ${index + 1}. ${engine}`);
      });
      process.exit(0);
    }

    // Submit single URL
    if (args.includes('--single')) {
      const urlIndex = args.indexOf('--single') + 1;
      if (!args[urlIndex]) {
        console.error('❌ Error: URL required for --single command');
        process.exit(1);
      }

      const url = args[urlIndex];
      console.log(`📤 Submitting single URL: ${url}`);
      
      const result = await indexNowService.submitUrl(url);
      
      if (result.success) {
        console.log('✅ Success:', result.message);
      } else {
        console.error('❌ Error:', result.message);
        process.exit(1);
      }
    }

    // Submit multiple URLs
    else if (args.includes('--bulk')) {
      const bulkIndex = args.indexOf('--bulk') + 1;
      const urls = args.slice(bulkIndex);
      
      if (urls.length === 0) {
        console.error('❌ Error: At least one URL required for --bulk command');
        process.exit(1);
      }

      console.log(`📤 Submitting ${urls.length} URLs:`);
      urls.forEach((url, index) => console.log(`   ${index + 1}. ${url}`));
      
      const result = await indexNowService.submitUrls(urls);
      
      if (result.success) {
        console.log('✅ Success:', result.message);
      } else {
        console.error('❌ Error:', result.message);
        process.exit(1);
      }
    }

    // Submit calculator URLs
    else if (args.includes('--calculator')) {
      const pathIndex = args.indexOf('--calculator') + 1;
      if (!args[pathIndex]) {
        console.error('❌ Error: Calculator path required for --calculator command');
        process.exit(1);
      }

      const calculatorPath = args[pathIndex];
      console.log(`📤 Submitting calculator URLs for: ${calculatorPath}`);
      
      const result = await indexNowService.submitCalculatorUrls(calculatorPath);
      
      if (result.success) {
        console.log('✅ Success:', result.message);
        if (result.submittedUrls) {
          console.log('   Submitted URLs:');
          result.submittedUrls.forEach((url, index) => {
            console.log(`   ${index + 1}. ${url}`);
          });
        }
      } else {
        console.error('❌ Error:', result.message);
        process.exit(1);
      }
    }

    // Submit all main pages
    else if (args.includes('--all-main-pages')) {
      console.log('📤 Submitting all main pages...');
      
      const result = await indexNowService.submitMainPages();
      
      if (result.success) {
        console.log('✅ Success:', result.message);
        if (result.submittedUrls) {
          console.log('   Submitted URLs:');
          result.submittedUrls.forEach((url, index) => {
            console.log(`   ${index + 1}. ${url}`);
          });
        }
      } else {
        console.error('❌ Error:', result.message);
        process.exit(1);
      }
    }

    else {
      console.error('❌ Error: Unknown command. Use --help for usage information.');
      process.exit(1);
    }

  } catch (error) {
    console.error('❌ Fatal error:', error.message);
    process.exit(1);
  }
}

// Only run if called directly (ESM equivalent)
if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch(error => {
    console.error('❌ Fatal error:', error.message);
    process.exit(1);
  });
}