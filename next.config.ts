import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Otimização de bundle
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },

  // Configurações de imagem para otimização
  images: {
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 31536000, // 1 ano
  },

  // Configurações de compressão
  compress: true,

  // Headers de performance básicos
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
        ],
      },
    ];
  },
};

export default nextConfig;
