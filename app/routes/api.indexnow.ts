/**
 * IndexNow API Route
 * 
 * This API endpoint handles IndexNow URL submissions from the frontend.
 * It provides a server-side interface to submit URLs to search engines.
 */

import type { ActionFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { indexNowService } from "~/lib/indexnow";

interface IndexNowRequest {
  type: 'single' | 'bulk' | 'calculator';
  url?: string;
  urls?: string[];
  calculatorPath?: string;
}

export async function action({ request }: ActionFunctionArgs) {
  // Only allow POST requests
  if (request.method !== 'POST') {
    return json({ success: false, message: 'Method not allowed' }, { status: 405 });
  }

  try {
    const body: IndexNowRequest = await request.json();
    const { type } = body;

    // Validate request type
    if (!['single', 'bulk', 'calculator'].includes(type)) {
      return json({ 
        success: false, 
        message: 'Invalid request type. Must be "single", "bulk", or "calculator"' 
      }, { status: 400 });
    }

    // Handle single URL submission
    if (type === 'single') {
      if (!body.url) {
        return json({ 
          success: false, 
          message: 'URL is required for single submission' 
        }, { status: 400 });
      }

      const result = await indexNowService.submitUrl(body.url);
      return json(result, { status: result.success ? 200 : 400 });
    }

    // Handle bulk URLs submission
    if (type === 'bulk') {
      if (!body.urls || !Array.isArray(body.urls) || body.urls.length === 0) {
        return json({ 
          success: false, 
          message: 'URLs array is required for bulk submission' 
        }, { status: 400 });
      }

      const result = await indexNowService.submitUrls(body.urls);
      return json(result, { status: result.success ? 200 : 400 });
    }

    // Handle calculator URLs submission
    if (type === 'calculator') {
      if (!body.calculatorPath) {
        return json({ 
          success: false, 
          message: 'Calculator path is required for calculator submission' 
        }, { status: 400 });
      }

      const result = await indexNowService.submitCalculatorUrls(body.calculatorPath);
      return json(result, { status: result.success ? 200 : 400 });
    }

  } catch (error) {
    console.error('[IndexNow API] Error processing request:', error);
    
    return json({ 
      success: false, 
      message: 'Internal server error processing IndexNow request' 
    }, { status: 500 });
  }
}

// Also handle GET requests for health check
export async function loader() {
  const config = indexNowService.getConfig();
  
  return json({
    service: 'IndexNow API',
    status: 'operational',
    keyValid: config.keyValid,
    host: config.host,
    searchEngines: config.searchEngines.length,
    endpoints: {
      submit: 'POST /api/indexnow',
      keyFile: `GET /${config.key}.txt`
    }
  });
}