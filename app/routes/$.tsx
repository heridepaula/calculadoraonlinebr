// Splat route to handle unmatched paths
import type { LoaderFunctionArgs } from "@remix-run/node";

export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  
  // Silently handle browser/development tool requests
  const ignorePaths = [
    '.well-known',
    'devtools', 
    'favicon.ico',
    'robots.txt',
    'sitemap.xml',
    'apple-touch-icon',
    'manifest.json'
  ];
  
  if (ignorePaths.some(path => url.pathname.includes(path))) {
    return new Response(null, { status: 204 });
  }
  
  // For legitimate 404s, return proper error
  throw new Response(`Route "${url.pathname}" not found`, { 
    status: 404,
    statusText: "Not Found" 
  });
}