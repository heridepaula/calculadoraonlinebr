import type { LoaderFunction } from "@remix-run/node";

export const loader: LoaderFunction = async () => {
  const healthCheck = {
    status: "ok",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV || "development",
    version: "1.0.0",
    checks: {
      server: "healthy",
      memory: {
        used: Math.round((process.memoryUsage().heapUsed / 1024 / 1024) * 100) / 100,
        total: Math.round((process.memoryUsage().heapTotal / 1024 / 1024) * 100) / 100,
        unit: "MB"
      }
    }
  };

  return new Response(JSON.stringify(healthCheck, null, 2), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "no-cache, no-store, must-revalidate",
      "Pragma": "no-cache",
      "Expires": "0",
      "X-Robots-Tag": "noindex, nofollow, noarchive, nosnippet",
      "X-Frame-Options": "DENY"
    }
  });
};