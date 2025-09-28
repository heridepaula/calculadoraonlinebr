/**
 * Critical CSS Manager - Inline Above-the-fold styles for LCP optimization
 *
 * Injeta CSS crítico inline para melhorar LCP eliminando render-blocking
 * Aplica apenas estilos essenciais above-the-fold
 */

import fs from 'fs';
import path from 'path';

/**
 * CSS Crítico inline para ser injetado no <head>
 * Contém apenas estilos essenciais above-the-fold
 */
export const getCriticalCSS = (): string => {
  // Em produção, lê o arquivo CSS crítico
  if (process.env.NODE_ENV === 'production') {
    try {
      const criticalCSSPath = path.join(process.cwd(), 'app/styles/critical.css');
      const criticalCSS = fs.readFileSync(criticalCSSPath, 'utf-8');

      // Minificar CSS crítico removendo comentários e espaços
      return criticalCSS
        .replace(/\/\*[\s\S]*?\*\//g, '') // Remove comentários
        .replace(/\s+/g, ' ') // Reduz espaços múltiplos
        .replace(/;\s*}/g, '}') // Remove ponto e vírgula antes de fechar
        .replace(/:\s*/g, ':') // Remove espaços após dois pontos
        .replace(/,\s*/g, ',') // Remove espaços após vírgulas
        .trim();
    } catch (error) {
      console.warn('[Critical CSS] Erro ao carregar CSS crítico:', error);
      return getFallbackCriticalCSS();
    }
  }

  // Em desenvolvimento, retorna versão inline reduzida
  return getFallbackCriticalCSS();
};

/**
 * CSS crítico fallback para desenvolvimento ou erro
 */
const getFallbackCriticalCSS = (): string => {
  return `
    :root{--bg-primary:#0f0f23;--bg-secondary:#1a1a2e;--text-primary:#fff;--text-secondary:#e2e8f0;--primary-blue:#64B5F6}
    *,*::before,*::after{box-sizing:border-box}
    *{margin:0}
    html,body{background-color:var(--bg-primary);color:var(--text-primary);font-family:Inter,ui-sans-serif,system-ui,-apple-system,sans-serif;line-height:1.5;-webkit-font-smoothing:antialiased}
    h1{font-size:2.25rem;font-weight:700;line-height:1.2;margin-bottom:1rem}
    h2{font-size:1.875rem;font-weight:600;line-height:1.3;margin-bottom:0.75rem}
    p{color:var(--text-secondary);line-height:1.6;margin-bottom:1rem}
    .container{max-width:1200px;margin:0 auto;padding:0 1rem}
    .card{background-color:var(--bg-secondary);border-radius:0.75rem;padding:1.5rem;box-shadow:0 4px 6px -1px rgba(0,0,0,0.3)}
    .btn-primary{background-color:var(--primary-blue);color:#fff;padding:0.75rem 1.5rem;border-radius:0.5rem;font-weight:600;text-decoration:none;display:inline-block;border:none;cursor:pointer}
    .grid{display:grid;gap:1rem}
    .text-center{text-align:center}
    .font-bold{font-weight:700}
    @media(max-width:767px){h1{font-size:1.875rem}.container{padding:0 0.75rem}}
  `.replace(/\s+/g, ' ').trim();
};

/**
 * Gera o HTML do CSS crítico para injeção no <head>
 */
export const getCriticalCSSHTML = (): string => {
  const criticalCSS = getCriticalCSS();

  return `<style id="critical-css" data-optimized="lcp">${criticalCSS}</style>`;
};

/**
 * Atributos para defer do CSS não-crítico
 * Carrega CSS completo após critical CSS
 */
export const getNonCriticalCSSAttributes = () => ({
  rel: 'preload',
  as: 'style',
  onLoad: "this.onload=null;this.rel='stylesheet'",
  // Fallback para navegadores sem suporte a preload
  media: 'print',
  'data-defer': 'true'
});

/**
 * Script para carregar CSS não-crítico após load
 * Evita render-blocking do CSS completo
 */
export const getDeferredCSSScript = (): string => {
  return `
    <script data-defer-css>
      (function(){
        function loadDeferredCSS(){
          var links=document.querySelectorAll('link[data-defer="true"]');
          for(var i=0;i<links.length;i++){
            var link=links[i];
            link.media='all';
            link.rel='stylesheet';
          }
        }
        if(document.readyState==='complete'){
          loadDeferredCSS();
        }else{
          window.addEventListener('load',loadDeferredCSS);
        }
      })();
    </script>
  `.replace(/\s+/g, ' ').trim();
};

/**
 * Meta tags para otimização de performance
 */
export const getPerformanceMeta = () => [
  // Resource Hints
  { name: 'dns-prefetch', content: 'https://fonts.googleapis.com' },
  { name: 'dns-prefetch', content: 'https://fonts.gstatic.com' },

  // Critical Resource Hints
  { name: 'preload', content: '/assets/root-D_Rv9tYd.css', as: 'style' },

  // Performance Optimization
  { name: 'performance-hint', content: 'critical-css-inlined' },
  { name: 'render-optimization', content: 'lcp-optimized' }
];

/**
 * Verifica se o CSS crítico deve ser usado
 */
export const shouldUseCriticalCSS = (): boolean => {
  // Sempre usar CSS crítico para melhorar LCP
  return true;
};