/**
 * Intelligent Prefetch Strategy - Long-term Cache Optimization
 *
 * Sistema inteligente de prefetch para recursos críticos
 * Melhora visitas repetidas com cache de longo prazo
 */

/**
 * Recursos para prefetch baseado na navegação do usuário
 */
const PREFETCH_ROUTES = [
  // Rotas mais populares para prefetch
  '/calculadoras',
  '/calculadoras/matematica',
  '/calculadoras/financas',
  '/calculadoras/astrologia',
  '/calculadoras/saude',

  // Calculadoras mais acessadas
  '/calculadoras/matematica/porcentagem',
  '/calculadoras/financas/juros-compostos',
  '/calculadoras/astrologia/signo',
  '/calculadoras/saude/imc'
];

/**
 * Recursos terceiros para cache estendido
 */
const THIRD_PARTY_RESOURCES = [
  'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js',
  'https://scripts.clarity.ms/clarity.js',
  'https://static.cloudflareinsights.com/beacon.min.js',
  'https://www.googletagmanager.com/gtag/js'
];

/**
 * Detecta padrões de navegação do usuário
 */
export interface UserNavPattern {
  category: string;
  timeOnSite: number;
  pagesVisited: number;
  likelyNext: string[];
}

/**
 * Analisa comportamento do usuário para prefetch inteligente
 */
export const analyzeUserBehavior = (): UserNavPattern => {
  if (typeof window === 'undefined') {
    return {
      category: 'unknown',
      timeOnSite: 0,
      pagesVisited: 0,
      likelyNext: []
    };
  }

  const currentPath = window.location.pathname;
  const timeOnSite = getTimeOnSite();
  const pagesVisited = getSessionPageCount();

  // Detecta categoria de interesse
  let category = 'general';
  let likelyNext: string[] = [];

  if (currentPath.includes('/matematica')) {
    category = 'matematica';
    likelyNext = [
      '/calculadoras/matematica/porcentagem',
      '/calculadoras/matematica/regra-de-tres',
      '/calculadoras/matematica/equacao-segundo-grau'
    ];
  } else if (currentPath.includes('/financas')) {
    category = 'financas';
    likelyNext = [
      '/calculadoras/financas/juros-compostos',
      '/calculadoras/financas/tesouro-direto',
      '/calculadoras/financas/cdb'
    ];
  } else if (currentPath.includes('/astrologia')) {
    category = 'astrologia';
    likelyNext = [
      '/calculadoras/astrologia/signo',
      '/calculadoras/astrologia/ascendente',
      '/calculadoras/astrologia/compatibilidade-signos'
    ];
  } else if (currentPath.includes('/saude')) {
    category = 'saude';
    likelyNext = [
      '/calculadoras/saude/imc',
      '/calculadoras/saude/gordura-corporal',
      '/calculadoras/saude/peso-gravidez'
    ];
  }

  return {
    category,
    timeOnSite,
    pagesVisited,
    likelyNext
  };
};

/**
 * Implementa prefetch inteligente baseado no comportamento
 */
export const implementIntelligentPrefetch = (): void => {
  if (typeof window === 'undefined' || !('requestIdleCallback' in window)) {
    return;
  }

  // Aguarda idle time para não impactar performance
  window.requestIdleCallback(() => {
    const userPattern = analyzeUserBehavior();

    // Prefetch baseado na categoria atual
    prefetchCategoryResources(userPattern.category);

    // Prefetch próximas páginas prováveis
    if (userPattern.timeOnSite > 30 || userPattern.pagesVisited > 1) {
      userPattern.likelyNext.forEach(route => prefetchRoute(route));
    }

    // Prefetch recursos terceiros para cache
    if (userPattern.timeOnSite > 60) {
      prefetchThirdPartyResources();
    }
  }, { timeout: 2000 });
};

/**
 * Prefetch de recursos por categoria
 */
const prefetchCategoryResources = (category: string): void => {
  const routes = PREFETCH_ROUTES.filter(route =>
    route.includes(category) || route === '/calculadoras'
  );

  routes.forEach(route => prefetchRoute(route));
};

/**
 * Prefetch de uma rota específica
 */
const prefetchRoute = (route: string): void => {
  const link = document.createElement('link');
  link.rel = 'prefetch';
  link.href = route;
  link.setAttribute('data-prefetch', 'intelligent');

  document.head.appendChild(link);

  console.log('[Prefetch] Route prefetched:', route);
};

/**
 * Prefetch de recursos terceiros para cache
 */
const prefetchThirdPartyResources = (): void => {
  THIRD_PARTY_RESOURCES.forEach(resource => {
    const link = document.createElement('link');
    link.rel = 'prefetch';
    link.href = resource;
    link.setAttribute('data-prefetch', 'third-party');
    link.crossOrigin = 'anonymous';

    document.head.appendChild(link);
  });

  console.log('[Prefetch] Third-party resources prefetched');
};

/**
 * Obtém tempo total no site (em segundos)
 */
const getTimeOnSite = (): number => {
  const startTime = sessionStorage.getItem('site-start-time');

  if (!startTime) {
    sessionStorage.setItem('site-start-time', Date.now().toString());
    return 0;
  }

  return Math.floor((Date.now() - parseInt(startTime)) / 1000);
};

/**
 * Obtém número de páginas visitadas na sessão
 */
const getSessionPageCount = (): number => {
  const count = sessionStorage.getItem('session-page-count');
  const currentCount = count ? parseInt(count) + 1 : 1;

  sessionStorage.setItem('session-page-count', currentCount.toString());
  return currentCount;
};

/**
 * Hook para prefetch automático em componentes
 */
export const usePrefetchOptimization = () => {
  if (typeof window !== 'undefined') {
    // Implementa prefetch após 1 segundo para não impactar LCP
    setTimeout(() => {
      implementIntelligentPrefetch();
    }, 1000);
  }
};

/**
 * Cache headers recommendations para melhor TTL
 */
export const getCacheHeaders = (resourceType: string): Record<string, string> => {
  const headers: Record<string, Record<string, string>> = {
    'static-immutable': {
      'Cache-Control': 'public, max-age=31536000, immutable',
      'Expires': new Date(Date.now() + 31536000 * 1000).toUTCString()
    },
    'static-versioned': {
      'Cache-Control': 'public, max-age=31536000, s-maxage=31536000',
      'Expires': new Date(Date.now() + 31536000 * 1000).toUTCString()
    },
    'dynamic-content': {
      'Cache-Control': 'public, max-age=3600, s-maxage=86400, stale-while-revalidate=86400',
      'Expires': new Date(Date.now() + 3600 * 1000).toUTCString()
    },
    'third-party-extended': {
      'Cache-Control': 'public, max-age=604800, s-maxage=604800, stale-while-revalidate=86400',
      'Expires': new Date(Date.now() + 604800 * 1000).toUTCString()
    }
  };

  return headers[resourceType] || headers['dynamic-content'];
};

/**
 * Verifica suporte para resources hints
 */
export const supportsResourceHints = (): boolean => {
  if (typeof window === 'undefined') return false;

  return (
    'IntersectionObserver' in window &&
    'requestIdleCallback' in window &&
    'serviceWorker' in navigator
  );
};