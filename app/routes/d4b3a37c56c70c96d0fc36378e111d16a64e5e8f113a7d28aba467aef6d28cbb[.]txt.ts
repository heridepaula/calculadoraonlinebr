/**
 * IndexNow Key Verification File
 * 
 * This route serves the IndexNow key verification file.
 * The key file must be accessible at the root of the domain and contain only the key value.
 * 
 * @see https://www.indexnow.org/documentation
 */

import type { LoaderFunctionArgs } from "@remix-run/node";

export async function loader({ request }: LoaderFunctionArgs) {
  // The IndexNow key - must match the key used in submissions
  const indexNowKey = process.env.INDEXNOW_KEY || 'd4b3a37c56c70c96d0fc36378e111d16a64e5e8f113a7d28aba467aef6d28cbb';
  
  return new Response(indexNowKey, {
    status: 200,
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=86400', // Cache for 24 hours
      'X-Content-Type-Options': 'nosniff',
    },
  });
}