import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Suprimir avisos do Turbopack vs Webpack
  onDemandEntries: {
    // Reduz avisos de configuração
    maxInactiveAge: 25 * 1000,
    pagesBufferLength: 2,
  },
  
  // Otimização de bundle
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },

  // Otimizações modernas do Next.js 15 - Melhoradas para performance JS
  experimental: {
    // Otimizações de CSS e JS
    optimizeCss: process.env.NODE_ENV === "production",
  },

  // Configuração do Turbopack (novo formato estável)
  turbopack: {
    rules: {
      '*.svg': {
        loaders: ['@svgr/webpack'],
        as: '*.js',
      },
    },
  },

  // Webpack optimizations for better JS performance
  webpack: (config, { isServer }) => {
    // Optimize bundle splitting
    if (!isServer) {
      config.optimization.splitChunks = {
        chunks: 'all',
        cacheGroups: {
          default: false,
          vendors: false,
          // MUI bundle
          mui: {
            name: 'mui',
            test: /[\\/]node_modules[\\/]@mui[\\/]/,
            chunks: 'all',
            priority: 10,
          },
          // React bundle
          react: {
            name: 'react',
            test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
            chunks: 'all',
            priority: 20,
          },
          // Recharts bundle (heavy library)
          recharts: {
            name: 'recharts',
            test: /[\\/]node_modules[\\/]recharts[\\/]/,
            chunks: 'all',
            priority: 15,
          },
          // Common vendor libraries
          vendor: {
            name: 'vendor',
            test: /[\\/]node_modules[\\/]/,
            chunks: 'all',
            priority: 5,
          },
        },
      };
    }

    // Keep original aliases without problematic MUI override

    return config;
  },

  // Bundle analyzer
  ...(process.env.ANALYZE === 'true' && {
    bundleAnalyzer: {
      enabled: true,
    },
  }),

  // Melhorias específicas para SEO no Next.js 15
  trailingSlash: false,
  poweredByHeader: false,

  // Configurações de imagem para otimização mobile
  images: {
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 31536000, // 1 ano
    deviceSizes: [360, 414, 640, 750, 828, 1080, 1200, 1920], // Adicionados tamanhos mobile
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    dangerouslyAllowSVG: false,
    // A qualidade é controlada através do componente Image, não aqui
  },

  // Configurações de compressão
  compress: true,

  // Headers de performance otimizados para mobile
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/images/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/_next/static/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
