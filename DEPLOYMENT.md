# Deployment Guide for Vercel

## 🚀 Quick Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/calculadoraonlinebr)

## 📋 Prerequisites

1. Node.js 20+ installed
2. Vercel account
3. GitHub repository connected to Vercel

## 🛠️ Setup Instructions

### 1. Environment Variables

Configure the following environment variables in Vercel Dashboard:

```bash
# Required
NODE_ENV=production
NEXT_PUBLIC_APP_URL=https://your-domain.com

# Optional Analytics
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
NEXT_PUBLIC_GTAG_ID=GT-XXXXXXX

# Build Optimizations
NEXT_TELEMETRY_DISABLED=1
ANALYZE=false

# Health Check Settings (optional)
HEALTH_CHECK_TIMEOUT=10000
MEMORY_WARNING_THRESHOLD=75
MEMORY_CRITICAL_THRESHOLD=90
```

### 2. Domain Configuration

1. Go to Vercel Dashboard > Project > Settings > Domains
2. Add your custom domain: `calculadoraonlinebr.com.br`
3. Configure DNS records as instructed by Vercel

### 3. Build Settings

Vercel will automatically detect Next.js and use optimal settings, but you can customize:

- **Build Command**: `npm run build` (default)
- **Output Directory**: `.next` (default)
- **Install Command**: `npm ci` (recommended)
- **Development Command**: `npm run dev`

### 4. Performance Optimizations

Our configuration includes:

- ✅ **Bundle Splitting**: Separate chunks for MUI, React, Recharts
- ✅ **Image Optimization**: AVIF/WebP formats with optimal caching
- ✅ **Static Asset Caching**: 1-year cache for immutable assets
- ✅ **API Caching**: Smart caching for health checks and APIs
- ✅ **Compression**: Brotli compression enabled
- ✅ **Tree Shaking**: Unused code elimination
- ✅ **SWC Minification**: Fast JavaScript minification

### 5. Health Checks

The application includes multiple health check endpoints:

- **Basic Health**: `/api/health`
- **Detailed Health**: `/api/healthz`
- **Liveness Probe**: `/api/livez`
- **Readiness Probe**: `/api/readyz`

### 6. SEO Optimizations

- **Sitemap**: Automatically generated at `/sitemap.xml`
- **Robots.txt**: SEO-friendly robots file
- **Meta Tags**: Optimized for Google indexing
- **Security Headers**: OWASP-compliant security headers

## 🔧 Local Development

```bash
# Install dependencies
npm ci

# Start development server
npm run dev

# Build for production
npm run build

# Test production build locally
npm run start

# Run type checking
npm run typecheck

# Run linting
npm run lint

# Analyze bundle
npm run build:analyze
```

## 📊 Monitoring

### Vercel Analytics

Automatically enabled in production. View metrics in Vercel Dashboard.

### Custom Health Checks

```bash
# Check application health
curl https://your-domain.com/api/health

# Detailed health status
curl https://your-domain.com/api/healthz
```

## 🚨 Troubleshooting

### Build Failures

1. **TypeScript Errors**: Run `npm run typecheck` locally
2. **Linting Errors**: Run `npm run lint:fix`
3. **Memory Issues**: Check bundle size with `npm run build:analyze`

### Runtime Issues

1. **Check Health Endpoints**: Use `/api/healthz` for detailed diagnostics
2. **Review Vercel Logs**: Check function logs in Vercel Dashboard
3. **Performance**: Use Vercel Analytics and Speed Insights

### Common Issues

- **Large Bundle Size**: Enable package import optimization in `next.config.ts`
- **Slow Loading**: Check image optimization and enable compression
- **High Memory Usage**: Review component re-renders and state management

## 📈 Performance Targets

- **First Contentful Paint**: < 1.8s
- **Largest Contentful Paint**: < 2.5s
- **Cumulative Layout Shift**: < 0.1
- **Time to Interactive**: < 3.8s

## 🔐 Security

- Security headers configured via `next.config.ts`
- CORS properly configured for API routes
- Input validation on all calculator inputs
- No sensitive data logged or exposed

## 📱 Mobile Optimization

- Responsive design for all screen sizes
- Optimized images for mobile devices
- Touch-friendly interfaces
- Progressive Web App features

## 🌍 CDN & Caching

Vercel's Edge Network provides:
- Global CDN distribution
- Edge caching for static assets
- Smart routing for optimal performance
- Automatic HTTPS with certificates

## 📞 Support

For deployment issues:
1. Check [Vercel Documentation](https://vercel.com/docs)
2. Review build logs in Vercel Dashboard
3. Use health check endpoints for diagnostics
4. Contact support with detailed error information