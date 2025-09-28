/**
 * Google Analytics 4 (GA4) Configuration for Remix
 * 
 * Configuração global do Google Analytics para rastreamento de page views
 * Ativo apenas em produção com ID configurado via variável de ambiente
 */

// Declaração global para gtag
declare global {
  interface Window {
    gtag: (
      command: 'config' | 'event' | 'js',
      targetId: string | Date,
      config?: Record<string, any>
    ) => void;
    dataLayer: any[];
  }
}

/**
 * ID do Google Analytics obtido das variáveis de ambiente
 * Para Remix, usar VITE_GA_ID ou process.env.VITE_GA_ID
 */
export const GA_TRACKING_ID = typeof window !== 'undefined' 
  ? (window as any).__ENV?.VITE_GA_ID 
  : process.env.VITE_GA_ID;

/**
 * Verifica se o usuário deu consentimento para analytics
 */
export const hasAnalyticsConsent = (): boolean => {
  if (typeof window === 'undefined') return false;
  
  const consent = localStorage.getItem('cookie-consent');
  return consent === 'accepted';
};

/**
 * Verifica se o Google Analytics deve ser carregado
 * Ativo apenas em produção com ID válido configurado E com consentimento do usuário
 */
export const isGAEnabled = (): boolean => {
  return (
    process.env.NODE_ENV === 'production' &&
    Boolean(GA_TRACKING_ID) &&
    GA_TRACKING_ID.startsWith('G-') &&
    hasAnalyticsConsent()
  );
};

/**
 * Utilitários para resolver dados (not set) - Attribution Helpers
 */

/**
 * Extrai parâmetro UTM da URL atual
 */
export const getUTMParameter = (paramName: string): string | undefined => {
  if (typeof window === 'undefined') return undefined;

  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(paramName) || undefined;
};

/**
 * Detecta fonte de tráfego automaticamente
 */
export const getTrafficSource = (): string => {
  if (typeof window === 'undefined') return 'server-side';

  const referrer = document.referrer;

  if (!referrer || referrer === '') {
    return 'direct';
  }

  // Social Media
  if (referrer.includes('facebook.com') || referrer.includes('fb.com')) return 'social';
  if (referrer.includes('instagram.com')) return 'social';
  if (referrer.includes('twitter.com') || referrer.includes('t.co')) return 'social';
  if (referrer.includes('linkedin.com')) return 'social';
  if (referrer.includes('youtube.com')) return 'social';
  if (referrer.includes('tiktok.com')) return 'social';
  if (referrer.includes('whatsapp.com') || referrer.includes('wa.me')) return 'social';

  // Search Engines
  if (referrer.includes('google.com') || referrer.includes('google.com.br')) return 'organic';
  if (referrer.includes('bing.com')) return 'organic';
  if (referrer.includes('yahoo.com')) return 'organic';
  if (referrer.includes('duckduckgo.com')) return 'organic';
  if (referrer.includes('yandex.com')) return 'organic';

  // Email
  if (referrer.includes('mail.google.com') || referrer.includes('outlook')) return 'email';

  return 'referral';
};

/**
 * Detecta fonte do referrer para source
 */
export const getReferrerSource = (): string => {
  if (typeof window === 'undefined') return 'server-side';

  const referrer = document.referrer;

  if (!referrer || referrer === '') {
    return 'direct';
  }

  try {
    const url = new URL(referrer);
    return url.hostname.replace('www.', '');
  } catch {
    return 'unknown';
  }
};

/**
 * Detecta categoria da página atual
 */
export const getPageCategory = (): string => {
  if (typeof window === 'undefined') return 'server-side';

  const path = window.location.pathname;

  if (path === '/') return 'homepage';
  if (path.includes('/calculadoras/matematica')) return 'matematica';
  if (path.includes('/calculadoras/financas')) return 'financas';
  if (path.includes('/calculadoras/saude')) return 'saude';
  if (path.includes('/calculadoras/astrologia')) return 'astrologia';
  if (path.includes('/calculadoras/trabalhista')) return 'trabalhista';
  if (path.includes('/calculadoras/ferramentas')) return 'ferramentas';
  if (path.includes('/calculadoras/datas')) return 'datas';
  if (path.includes('/calculadoras')) return 'category-index';

  return 'other';
};

/**
 * Detecta tipo de calculadora específica
 */
export const getCalculatorType = (): string => {
  if (typeof window === 'undefined') return 'server-side';

  const path = window.location.pathname;
  const segments = path.split('/').filter(Boolean);

  if (segments.length >= 3 && segments[0] === 'calculadoras') {
    return segments[2] || 'unknown';
  }

  return 'not-calculator';
};

/**
 * Inicializa o Google Analytics com configuração cookieless
 * Usa apenas first-party storage e configurações GDPR/LGPD compliant
 */
export const initGA = (): void => {
  if (!isGAEnabled() || typeof window === 'undefined') {
    return;
  }

  try {
    // Inicializar dataLayer se não existir
    window.dataLayer = window.dataLayer || [];
    
    // Função gtag
    window.gtag = function gtag(...args: any[]) {
      window.dataLayer.push(args);
    };

    // Configurar timestamp
    window.gtag('js', new Date());

    // Configuração GA4 com atribuição melhorada - primeiro party storage
    window.gtag('config', GA_TRACKING_ID, {
      // Configurações básicas com atribuição
      page_title: document.title,
      page_location: window.location.href,

      // Configurações de privacidade LGPD/GDPR compliant
      anonymize_ip: true,
      allow_google_signals: false,
      allow_ad_personalization_signals: false,

      // Permitir first-party storage para atribuição (resolve "not set")
      storage: 'first_party',
      client_storage: 'first_party',
      cookie_domain: 'auto',
      cookie_update: true,
      cookie_expires: 7776000, // 90 dias para atribuição
      cookie_flags: 'SameSite=Lax;Secure',

      // Enhanced measurement e attribution
      transport_type: 'beacon',
      send_page_view: true,

      // Dimensões customizadas para resolver (not set)
      custom_map: {
        dimension1: 'user_type',
        dimension2: 'traffic_source',
        dimension3: 'campaign_name',
        dimension4: 'page_category',
        dimension5: 'calculator_type'
      },

      // Campaign attribution (resolve source/medium not set)
      campaign_content: getUTMParameter('utm_content'),
      campaign_id: getUTMParameter('utm_id'),
      campaign_medium: getUTMParameter('utm_medium') || getTrafficSource(),
      campaign_name: getUTMParameter('utm_campaign'),
      campaign_source: getUTMParameter('utm_source') || getReferrerSource(),
      campaign_term: getUTMParameter('utm_term')
    });

    console.log('[GA] Google Analytics inicializado (cookieless):', GA_TRACKING_ID);
  } catch (error) {
    console.error('[GA] Erro ao inicializar Google Analytics:', error);
  }
};

/**
 * Rastreia uma page view manualmente
 * @param url - URL da página (opcional, usa location atual se não fornecida)
 * @param title - Título da página (opcional, usa document.title se não fornecido)
 */
export const trackPageView = (url?: string, title?: string): void => {
  if (!isGAEnabled() || typeof window === 'undefined' || !window.gtag) {
    return;
  }

  try {
    const pageUrl = url || window.location.pathname + window.location.search;
    const pageTitle = title || document.title;

    // Enviar page view com dimensões personalizadas
    window.gtag('config', GA_TRACKING_ID, {
      page_path: pageUrl,
      page_title: pageTitle,
      page_location: window.location.origin + pageUrl,

      // Configurações first-party storage para atribuição
      storage: 'first_party',
      client_storage: 'first_party',
      cookie_domain: 'auto',
      cookie_update: true,
      cookie_expires: 7776000,
      transport_type: 'beacon',

      // Dimensões customizadas para resolver (not set)
      page_category: getPageCategory(),
      calculator_type: getCalculatorType(),
      traffic_source: getTrafficSource(),

      // Campaign attribution para resolver source/medium
      campaign_medium: getUTMParameter('utm_medium') || getTrafficSource(),
      campaign_source: getUTMParameter('utm_source') || getReferrerSource(),
      campaign_name: getUTMParameter('utm_campaign'),
      campaign_content: getUTMParameter('utm_content'),
      campaign_term: getUTMParameter('utm_term')
    });

    // Enviar event personalizado com dimensões
    window.gtag('event', 'page_view', {
      page_title: pageTitle,
      page_location: window.location.origin + pageUrl,
      page_path: pageUrl,
      dimension2: getTrafficSource(),
      dimension3: getUTMParameter('utm_campaign') || 'no-campaign',
      dimension4: getPageCategory(),
      dimension5: getCalculatorType()
    });

    if (process.env.NODE_ENV === 'development') {
      console.log('[GA] Page view tracked with attribution:', {
        url: pageUrl,
        title: pageTitle,
        traffic_source: getTrafficSource(),
        page_category: getPageCategory(),
        calculator_type: getCalculatorType(),
        utm_source: getUTMParameter('utm_source'),
        utm_medium: getUTMParameter('utm_medium'),
        utm_campaign: getUTMParameter('utm_campaign')
      });
    }
  } catch (error) {
    console.error('[GA] Erro ao rastrear page view:', error);
  }
};

/**
 * Rastreia um evento personalizado no Google Analytics
 * @param eventName - Nome do evento (ex: 'share', 'download', 'purchase')
 * @param parameters - Parâmetros adicionais do evento
 */
export const trackEvent = (
  eventName: string,
  parameters: {
    event_category?: string;
    event_label?: string;
    value?: number;
    custom_parameters?: Record<string, any>;
  } = {}
): void => {
  if (!isGAEnabled() || typeof window === 'undefined' || !window.gtag) {
    return;
  }

  try {
    const {
      event_category,
      event_label,
      value,
      custom_parameters = {}
    } = parameters;

    window.gtag('event', eventName, {
      event_category,
      event_label,
      value,
      ...custom_parameters,

      // Adicionar dimensões para resolver (not set)
      dimension2: getTrafficSource(),
      dimension3: getUTMParameter('utm_campaign') || 'no-campaign',
      dimension4: getPageCategory(),
      dimension5: getCalculatorType(),

      // Enhanced attribution
      page_category: getPageCategory(),
      calculator_type: getCalculatorType(),
      traffic_source: getTrafficSource(),

      transport_type: 'beacon'
    });

    if (process.env.NODE_ENV === 'development') {
      console.log('[GA] Event tracked with attribution:', {
        eventName,
        parameters,
        traffic_source: getTrafficSource(),
        page_category: getPageCategory(),
        calculator_type: getCalculatorType()
      });
    }
  } catch (error) {
    console.error('[GA] Erro ao rastrear evento:', error);
  }
};

/**
 * Enhanced Events para melhor tracking e resolver (not set)
 */

/**
 * Rastreia uso de calculadora
 */
export const trackCalculatorUsage = (calculatorName: string, action: string, platform?: string): void => {
  trackEvent('calculator_interaction', {
    event_category: 'calculator',
    event_label: calculatorName,
    custom_parameters: {
      calculator_name: calculatorName,
      action: action,
      platform: platform,
      page_category: getPageCategory(),
      calculator_type: getCalculatorType()
    }
  });
};

/**
 * Rastreia scroll depth
 */
export const trackScrollDepth = (percentage: number): void => {
  if (percentage > 0 && percentage % 25 === 0) { // Track 25%, 50%, 75%, 100%
    trackEvent('scroll', {
      event_category: 'engagement',
      event_label: `${percentage}%`,
      value: percentage,
      custom_parameters: {
        scroll_depth: percentage
      }
    });
  }
};

/**
 * Rastreia cliques em links externos
 */
export const trackExternalClick = (url: string): void => {
  trackEvent('click', {
    event_category: 'external_link',
    event_label: url,
    custom_parameters: {
      link_url: url,
      link_domain: new URL(url).hostname
    }
  });
};

/**
 * Rastreia downloads
 */
export const trackDownload = (fileName: string, fileType: string): void => {
  trackEvent('file_download', {
    event_category: 'download',
    event_label: fileName,
    custom_parameters: {
      file_name: fileName,
      file_type: fileType
    }
  });
};

/**
 * Rastreia tempo na página
 */
export const trackTimeOnPage = (seconds: number): void => {
  // Track engagement milestones
  if ([30, 60, 120, 300].includes(seconds)) {
    trackEvent('timing_complete', {
      event_category: 'engagement',
      event_label: `${seconds}s`,
      value: seconds,
      custom_parameters: {
        time_on_page: seconds
      }
    });
  }
};

/**
 * Rastreia pesquisas internas
 */
export const trackInternalSearch = (searchTerm: string, resultsCount: number): void => {
  trackEvent('search', {
    event_category: 'search',
    event_label: searchTerm,
    value: resultsCount,
    custom_parameters: {
      search_term: searchTerm,
      results_count: resultsCount
    }
  });
};

/**
 * Hook personalizado para tracking automático de page views no Remix
 * Deve ser usado em componentes que representam páginas
 */
export const usePageTracking = () => {
  if (typeof window !== 'undefined' && isGAEnabled()) {
    // Rastrear a página atual quando o hook for usado
    trackPageView();
  }
};

/**
 * Gera o script HTML para carregamento assíncrono do Google Analytics
 * @returns string HTML do script ou string vazia se GA não estiver habilitado
 */
export const getGAScript = (): string => {
  if (!isGAEnabled()) {
    return '';
  }

  return `
    <!-- Google Analytics -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}"></script>
    <script>
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', '${GA_TRACKING_ID}', {
        page_title: document.title,
        page_location: window.location.href,
        anonymize_ip: true,
        allow_google_signals: false,
        allow_ad_personalization_signals: false,
        send_page_view: true,
        storage: 'none',
        client_storage: 'none',
        cookie_domain: 'none',
        cookie_update: false,
        cookie_expires: 0,
        transport_type: 'beacon'
      });
    </script>
  `;
};

/**
 * Componente React para inserir o Google Analytics no <head>
 * Para usar com Remix Meta API
 */
export interface GAMetaProps {
  nonce?: string;
}

export const getGAMeta = (props: GAMetaProps = {}) => {
  if (!isGAEnabled()) {
    return [];
  }

  const { nonce } = props;
  const nonceAttr = nonce ? ` nonce="${nonce}"` : '';

  return [
    {
      tagName: 'script',
      attributes: {
        async: true,
        src: `https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`,
        ...(nonce && { nonce })
      }
    },
    {
      tagName: 'script',
      innerHTML: `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', '${GA_TRACKING_ID}', {
          page_title: document.title,
          page_location: window.location.href,
          anonymize_ip: true,
          allow_google_signals: false,
          allow_ad_personalization_signals: false,
          send_page_view: true,
          storage: 'none',
          client_storage: 'none',
          cookie_domain: 'none',
          cookie_update: false,
          cookie_expires: 0,
          transport_type: 'beacon'
        });
      `,
      ...(nonce && { attributes: { nonce } })
    }
  ];
};