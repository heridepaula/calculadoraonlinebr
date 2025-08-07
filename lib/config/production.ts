export const productionConfig = {
  // Build optimizations
  build: {
    analyze: process.env.ANALYZE === 'true',
    minify: process.env.NODE_ENV === 'production',
    sourceMaps: process.env.NODE_ENV !== 'production',
  },

  // Performance settings
  performance: {
    prefetch: true,
    preload: true,
    swrCache: true,
  },

  // Cache settings
  cache: {
    static: {
      maxAge: parseInt(process.env.STATIC_CACHE_MAX_AGE || '31536000', 10), // 1 year
    },
    api: {
      maxAge: parseInt(process.env.API_CACHE_MAX_AGE || '300', 10), // 5 minutes
    },
    html: {
      maxAge: parseInt(process.env.HTML_CACHE_MAX_AGE || '3600', 10), // 1 hour
    },
  },

  // Health check settings
  healthCheck: {
    timeout: parseInt(process.env.HEALTH_CHECK_TIMEOUT || '10000', 10),
    memoryWarningThreshold: parseInt(process.env.MEMORY_WARNING_THRESHOLD || '75', 10),
    memoryCriticalThreshold: parseInt(process.env.MEMORY_CRITICAL_THRESHOLD || '90', 10),
  },

  // Analytics
  analytics: {
    gaId: process.env.NEXT_PUBLIC_GA_ID,
    gtagId: process.env.NEXT_PUBLIC_GTAG_ID,
    vercelAnalytics: process.env.VERCEL_ENV === 'production',
  },

  // App metadata
  app: {
    name: process.env.NEXT_PUBLIC_APP_NAME || 'Calculadora Online BR',
    description: process.env.NEXT_PUBLIC_APP_DESCRIPTION || 'Calculadoras online gratuitas',
    url: process.env.NEXT_PUBLIC_APP_URL || 'https://calculadoraonlinebr.com.br',
    version: process.env.npm_package_version || '1.0.0',
  },

  // Feature flags
  features: {
    telemetryDisabled: process.env.NEXT_TELEMETRY_DISABLED === '1',
    serverComponents: true,
    turbopack: process.env.NODE_ENV === 'development',
  },
};

export default productionConfig;