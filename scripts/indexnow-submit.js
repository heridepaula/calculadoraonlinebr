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

const { indexNowService } = require('../build/server/nodejs-eyJydW50aW1lIjoibm9kZWpzIn0/index.js');

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

// Only run if called directly
if (require.main === module) {
  main();
}