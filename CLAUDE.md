# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a modern web application built with **Remix (React Router v7)** and TypeScript, providing free online calculators for health, finance, mathematics, and labor law calculations. The app targets Brazilian users with Portuguese content and follows Brazilian regulations.

## Development Commands

```bash
# Development
npm run dev                    # Start development server (port 3000)

# Building
npm run build                  # Production build with optimizations
npm run build:analyze         # Build with bundle analysis

# Code Quality
npm run lint                   # ESLint validation
npm run typecheck             # TypeScript type checking

# Utility
npm run clean                 # Remove build artifacts
npm start                     # Start production server
```

## Architecture & Structure

### Core Technologies

- **Remix v2.16.7** with Vite for build tooling
- **TypeScript** with strict mode enabled
- **Tailwind CSS** with custom design system (dark theme only)
- **Vercel** deployment target with optimized presets

### Routing System

File-based routing using Remix conventions in `app/routes/`:

- `_index.tsx` - Homepage with category overview
- `calculadoras.[category]._index.tsx` - Category landing pages
- `calculadoras.[category].[calculator].tsx` - Individual calculator pages

Categories: `saude` (health), `financas` (finance), `matematica` (math), `trabalhista` (labor)

### Component Architecture

- `app/components/ui/` - Base UI components (Button, Input, Card, etc.)
- `app/components/forms/` - Form-specific components
- `app/components/layout/` - Layout components (Header, Footer)
- `app/components/` - Calculator-specific components

### Key Files

- `app/lib/constants.ts` - Categories and calculator definitions
- `app/utils/calculations.ts` - Mathematical calculation utilities
- `app/lib/calculator-seo.ts` - SEO optimization helpers
- `app/types/index.ts` - TypeScript type definitions

## Development Guidelines

### Styling System

- **Dark theme only** - uses custom color palette in `tailwind.config.ts`
- **Mobile-first responsive design** with breakpoints: xs(320px), sm(640px), md(768px), lg(1024px), xl(1280px)
- **Accessibility compliant** - minimum 44px touch targets, proper aria labels
- **Color system**: Primary blue (#64B5F6), category-specific colors (health-red, finance-gold, math-purple)

### SEO & Performance

- Dynamic meta tags using Remix meta functions
- Structured data (JSON-LD) for calculator pages
- Core Web Vitals optimization with code splitting
- Compression and terser minification in production

### Calculator Implementation Pattern

Each calculator follows this structure:

1. Form component with masked inputs (currency, percentage)
2. Real-time calculation with validation
3. Results display with charts/visualizations
4. SEO-optimized content and FAQ sections
5. Related calculators suggestions

### Brazilian Market Focus

- Currency formatting in Brazilian Real (R$)
- Tax calculations following Brazilian legislation
- Content in Portuguese with Brazilian terminology
- Regulatory compliance (INSS, IRRF, CLT, etc.)

## Testing & Quality

Run type checking and linting before committing:

```bash
npm run typecheck && npm run lint
```

The build process includes:

- Terser minification with console.log removal
- Manual chunk splitting (react, remix, other vendors)
- Asset optimization and compression
- Source map generation disabled for production

## Deployment

Optimized for Vercel with:

- Vercel preset configuration in `vite.config.ts`
- Static asset optimization
- Edge-friendly build output
- Environment-specific configurations in `vercel.json`
- Implementar interface interativa e educativa e mobile first
- Adicionar conteúdo SEO otimizado
- Implementar inovações para diferenciação para se destacar das calculadoras concorrentes
- Analise as rotas existentes da calculadora para entender a implementação atual de SEO.
- Crie conteúdo educacional detalhado sobre métodos de mensuração para a calculadora.
- Adicione meta tags de SEO abrangentes e dados estruturados para a calculadora.
- Adicione seções de FAQ com perguntas e respostas otimizadas para SEO.
- Implemente a navegação por trilha de navegação para uma melhor estrutura de SEO.
- Adicione links internos entre calculadoras relacionadas.
- Adicione ao sitemap.xml e ao robots.txt

- When implementing, take care with the contrast of elements and ensure that text and components remain easy to read.
- Not run command `npm run dev` after implementation
