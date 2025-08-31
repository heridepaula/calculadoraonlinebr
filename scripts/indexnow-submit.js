#!/usr/bin/env node

/**
 * Simple IndexNow CLI Script
 * Usage: node scripts/indexnow-submit.js [command] [args]
 */

// Configuration
const INDEXNOW_KEY =
  process.env.INDEXNOW_KEY || "d4b3a37c56c70c96d0fc36378e111d16a64e5e8f113a7d28aba467aef6d28cbb";
const INDEXNOW_HOST = process.env.INDEXNOW_HOST || "calculadoraonlinebr.com.br";
const SEARCH_ENGINES = ["https://api.indexnow.org/indexnow", "https://www.bing.com/indexnow"];

const args = process.argv.slice(2);

function showHelp() {
  console.log(`
IndexNow URL Submission Tool

Usage:
  node scripts/indexnow-submit.js [command] [options]

Commands:
  --config                    Show current IndexNow configuration
  --single <url>             Submit a single URL
  --bulk <url1> <url2> ...   Submit multiple URLs
  --all-main-pages           Submit all main pages
  --calculator <path>        Submit calculator URLs
  --help                     Show this help message

Examples:
  node scripts/indexnow-submit.js --config
  node scripts/indexnow-submit.js --single https://www.calculadoraonlinebr.com.br/calculadoras/matematica/equacao-segundo-grau
  node scripts/indexnow-submit.js --bulk https://www.calculadoraonlinebr.com.br/ https://www.calculadoraonlinebr.com.br/calculadoras
  node scripts/indexnow-submit.js --all-main-pages
`);
}

function showConfig() {
  const keyValid = /^[a-fA-F0-9]{8,128}$/.test(INDEXNOW_KEY);

  console.log("🔧 IndexNow Configuration:");
  console.log(
    `   Key: ${INDEXNOW_KEY.substring(0, 8)}...${INDEXNOW_KEY.substring(INDEXNOW_KEY.length - 8)}`
  );
  console.log(`   Host: ${INDEXNOW_HOST}`);
  console.log(`   Key Location: https://${INDEXNOW_HOST}/${INDEXNOW_KEY}.txt`);
  console.log(`   Key Valid: ${keyValid ? "✅" : "❌"}`);
  console.log(`   Search Engines: ${SEARCH_ENGINES.length}`);
  SEARCH_ENGINES.forEach((engine, index) => {
    console.log(`   ${index + 1}. ${engine}`);
  });

  return keyValid;
}

function validateUrl(url) {
  try {
    const urlObj = new URL(url);
    return urlObj.hostname === INDEXNOW_HOST || urlObj.hostname === `www.${INDEXNOW_HOST}`;
  } catch {
    return false;
  }
}

async function submitSingleUrl(url) {
  if (!validateUrl(url)) {
    throw new Error(`URL does not belong to host ${INDEXNOW_HOST}`);
  }

  console.log(`📤 Submitting single URL: ${url}`);

  for (const endpoint of SEARCH_ENGINES) {
    try {
      const submitUrl = `${endpoint}?url=${encodeURIComponent(url)}&key=${INDEXNOW_KEY}`;

      const response = await fetch(submitUrl, {
        method: "GET",
        headers: { "User-Agent": "CalculadoraOnlineBR IndexNow Client/1.0" },
      });

      console.log(`   ${endpoint}: ${response.status} ${response.statusText}`);

      if (response.ok) {
        console.log("✅ Success: URL submitted successfully");
        return true;
      }
    } catch (error) {
      console.log(`   ${endpoint}: Error - ${error.message}`);
    }
  }

  throw new Error("Failed to submit to any search engine");
}

async function submitBulkUrls(urls) {
  const validUrls = urls.filter((url) => validateUrl(url));

  if (validUrls.length === 0) {
    throw new Error("No valid URLs provided");
  }

  console.log(`📤 Submitting ${validUrls.length} URLs:`);
  validUrls.forEach((url, index) => console.log(`   ${index + 1}. ${url}`));

  const payload = {
    host: INDEXNOW_HOST,
    key: INDEXNOW_KEY,
    keyLocation: `https://${INDEXNOW_HOST}/${INDEXNOW_KEY}.txt`,
    urlList: validUrls,
  };

  for (const endpoint of SEARCH_ENGINES) {
    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          "User-Agent": "CalculadoraOnlineBR IndexNow Client/1.0",
        },
        body: JSON.stringify(payload),
      });

      console.log(`   ${endpoint}: ${response.status} ${response.statusText}`);

      if (response.ok) {
        console.log(`✅ Success: ${validUrls.length} URLs submitted successfully`);
        return true;
      }
    } catch (error) {
      console.log(`   ${endpoint}: Error - ${error.message}`);
    }
  }

  throw new Error("Failed to submit to any search engine");
}

async function submitMainPages() {
  const baseUrl = `https://${INDEXNOW_HOST}`;
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

  return submitBulkUrls(urls);
}

async function submitCalculatorUrls(calculatorPath) {
  const baseUrl = `https://${INDEXNOW_HOST}`;
  const urls = [
    `${baseUrl}${calculatorPath}`,
    calculatorPath.includes("/calculadoras/") ? `${baseUrl}/calculadoras` : null,
    calculatorPath.match(/\/calculadoras\/([^/]+)\//)
      ? `${baseUrl}/calculadoras/${calculatorPath.match(/\/calculadoras\/([^/]+)\//)?.[1]}`
      : null,
  ].filter(Boolean);

  return submitBulkUrls(urls);
}

async function main() {
  if (args.length === 0 || args.includes("--help") || args.includes("-h")) {
    showHelp();
    return;
  }

  try {
    if (args.includes("--config")) {
      showConfig();
    } else if (args.includes("--single")) {
      const urlIndex = args.indexOf("--single") + 1;
      if (!args[urlIndex]) {
        throw new Error("URL required for --single command");
      }
      await submitSingleUrl(args[urlIndex]);
    } else if (args.includes("--bulk")) {
      const bulkIndex = args.indexOf("--bulk") + 1;
      const urls = args.slice(bulkIndex);
      if (urls.length === 0) {
        throw new Error("At least one URL required for --bulk command");
      }
      await submitBulkUrls(urls);
    } else if (args.includes("--all-main-pages")) {
      await submitMainPages();
    } else if (args.includes("--calculator")) {
      const pathIndex = args.indexOf("--calculator") + 1;
      if (!args[pathIndex]) {
        throw new Error("Calculator path required for --calculator command");
      }
      await submitCalculatorUrls(args[pathIndex]);
    } else {
      console.error("❌ Unknown command. Use --help for usage information.");
      process.exit(1);
    }
  } catch (error) {
    console.error("❌ Error:", error.message);
    process.exit(1);
  }
}

main();
