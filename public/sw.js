/**
 * Service Worker - Cache Strategy for Long-term Performance
 *
 * Implementa cache inteligente com ciclo de vida longo para recursos terceiros
 * Otimiza Google Ads, Clarity, Cloudflare com cache estendido
 */

const CACHE_VERSION = 'v2.1.0';
const STATIC_CACHE = `calculadora-static-${CACHE_VERSION}`;
const DYNAMIC_CACHE = `calculadora-dynamic-${CACHE_VERSION}`;
const THIRD_PARTY_CACHE = `calculadora-third-party-${CACHE_VERSION}`;

// Recursos estáticos para cache permanente
const STATIC_ASSETS = [
  '/',
  '/calculadoras',
  '/manifest.json',
  '/offline.html'
];

// Recursos terceiros com TTL baixo para cache estendido
const THIRD_PARTY_DOMAINS = [
  'pagead2.googlesyndication.com',
  'scripts.clarity.ms',
  'static.cloudflareinsights.com',
  'fonts.googleapis.com',
  'fonts.gstatic.com',
  'www.googletagmanager.com'
];

// Cache estratégias por tipo de recurso
const CACHE_STRATEGIES = {
  // Recursos estáticos: Cache First com fallback
  static: {
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 dias
    strategy: 'cacheFirst'
  },

  // Recursos terceiros: Cache First com revalidação
  thirdParty: {
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 dias (vs 1h/1dia original)
    strategy: 'staleWhileRevalidate'
  },

  // API calls: Network First com cache fallback
  api: {
    maxAge: 5 * 60 * 1000, // 5 minutos
    strategy: 'networkFirst'
  },

  // Páginas: Network First com cache
  pages: {
    maxAge: 24 * 60 * 60 * 1000, // 24 horas
    strategy: 'networkFirst'
  }
};

/**
 * Install Event - Cache recursos críticos
 */
self.addEventListener('install', (event) => {
  console.log('[SW] Installing service worker...');

  event.waitUntil(
    caches.open(STATIC_CACHE).then((cache) => {
      console.log('[SW] Caching static assets');
      return cache.addAll(STATIC_ASSETS);
    }).then(() => {
      self.skipWaiting();
    })
  );
});

/**
 * Activate Event - Limpa caches antigos
 */
self.addEventListener('activate', (event) => {
  console.log('[SW] Activating service worker...');

  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName.includes('calculadora-') &&
              !cacheName.includes(CACHE_VERSION)) {
            console.log('[SW] Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => {
      self.clients.claim();
    })
  );
});

/**
 * Fetch Event - Implementa estratégias de cache
 */
self.addEventListener('fetch', (event) => {
  const request = event.request;
  const url = new URL(request.url);

  // Ignora requests não-GET e chrome-extension
  if (request.method !== 'GET' || url.protocol === 'chrome-extension:') {
    return;
  }

  // Determina estratégia baseada no tipo de recurso
  const strategy = getStrategy(url, request);

  event.respondWith(
    handleRequest(request, strategy)
  );
});

/**
 * Determina estratégia de cache baseada na URL
 */
function getStrategy(url, request) {
  // Recursos terceiros críticos
  if (THIRD_PARTY_DOMAINS.some(domain => url.hostname.includes(domain))) {
    return {
      ...CACHE_STRATEGIES.thirdParty,
      cacheName: THIRD_PARTY_CACHE,
      type: 'third-party'
    };
  }

  // Assets estáticos (CSS, JS, fontes, imagens)
  if (url.pathname.match(/\.(css|js|woff2?|png|jpg|jpeg|webp|svg|ico)$/)) {
    return {
      ...CACHE_STRATEGIES.static,
      cacheName: STATIC_CACHE,
      type: 'static'
    };
  }

  // API calls
  if (url.pathname.startsWith('/api/')) {
    return {
      ...CACHE_STRATEGIES.api,
      cacheName: DYNAMIC_CACHE,
      type: 'api'
    };
  }

  // Páginas HTML
  return {
    ...CACHE_STRATEGIES.pages,
    cacheName: DYNAMIC_CACHE,
    type: 'pages'
  };
}

/**
 * Manipula request baseado na estratégia
 */
async function handleRequest(request, strategy) {
  const cache = await caches.open(strategy.cacheName);

  switch (strategy.strategy) {
    case 'cacheFirst':
      return cacheFirst(request, cache, strategy);

    case 'networkFirst':
      return networkFirst(request, cache, strategy);

    case 'staleWhileRevalidate':
      return staleWhileRevalidate(request, cache, strategy);

    default:
      return fetch(request);
  }
}

/**
 * Cache First Strategy - Para recursos estáticos
 */
async function cacheFirst(request, cache, strategy) {
  try {
    const cachedResponse = await cache.match(request);

    if (cachedResponse && !isExpired(cachedResponse, strategy.maxAge)) {
      return cachedResponse;
    }

    const networkResponse = await fetch(request);

    if (networkResponse.ok) {
      // Clone response para cache
      const responseClone = networkResponse.clone();
      await cache.put(request, responseClone);
    }

    return networkResponse;
  } catch (error) {
    console.log('[SW] Cache first failed:', error);

    // Fallback para cache mesmo se expirado
    const cachedResponse = await cache.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }

    // Fallback offline
    if (request.destination === 'document') {
      return caches.match('/offline.html');
    }

    throw error;
  }
}

/**
 * Network First Strategy - Para páginas e APIs
 */
async function networkFirst(request, cache, strategy) {
  try {
    const networkResponse = await fetch(request);

    if (networkResponse.ok) {
      const responseClone = networkResponse.clone();
      await cache.put(request, responseClone);
    }

    return networkResponse;
  } catch (error) {
    console.log('[SW] Network first failed, trying cache:', error);

    const cachedResponse = await cache.match(request);
    if (cachedResponse && !isExpired(cachedResponse, strategy.maxAge)) {
      return cachedResponse;
    }

    // Fallback offline para documentos
    if (request.destination === 'document') {
      return caches.match('/offline.html');
    }

    throw error;
  }
}

/**
 * Stale While Revalidate - Para recursos terceiros
 */
async function staleWhileRevalidate(request, cache, strategy) {
  const cachedResponse = await cache.match(request);

  // Retorna cache imediatamente se disponível
  const cachePromise = cachedResponse || fetch(request).then(response => {
    if (response.ok) {
      const responseClone = response.clone();
      cache.put(request, responseClone);
    }
    return response;
  });

  // Revalida em background se cache expirado
  if (cachedResponse && isExpired(cachedResponse, strategy.maxAge)) {
    fetch(request).then(response => {
      if (response.ok) {
        const responseClone = response.clone();
        cache.put(request, responseClone);
      }
    }).catch(() => {
      // Silently fail background revalidation
    });
  }

  return cachePromise;
}

/**
 * Verifica se response está expirado
 */
function isExpired(response, maxAge) {
  const dateHeader = response.headers.get('date');
  if (!dateHeader) return false;

  const responseTime = new Date(dateHeader).getTime();
  const now = Date.now();

  return (now - responseTime) > maxAge;
}

/**
 * Background Sync para cache otimizado
 */
self.addEventListener('sync', (event) => {
  if (event.tag === 'background-cache-cleanup') {
    event.waitUntil(cleanupOldCaches());
  }
});

/**
 * Limpeza automática de caches antigos
 */
async function cleanupOldCaches() {
  const cacheNames = await caches.keys();
  const oldCaches = cacheNames.filter(name =>
    name.includes('calculadora-') && !name.includes(CACHE_VERSION)
  );

  return Promise.all(
    oldCaches.map(cacheName => caches.delete(cacheName))
  );
}

/**
 * Message handler para comunicação com main thread
 */
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }

  if (event.data && event.data.type === 'GET_CACHE_STATUS') {
    getCacheStatus().then(status => {
      event.ports[0].postMessage(status);
    });
  }
});

/**
 * Retorna status do cache para debugging
 */
async function getCacheStatus() {
  const cacheNames = await caches.keys();
  const status = {};

  for (const cacheName of cacheNames) {
    const cache = await caches.open(cacheName);
    const keys = await cache.keys();
    status[cacheName] = keys.length;
  }

  return status;
}