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

    // Configuração cookieless para GA4 - sem third-party cookies
    window.gtag('config', GA_TRACKING_ID, {
      // Configurações básicas
      page_title: document.title,
      page_location: window.location.href,
      
      // Configurações de privacidade LGPD/GDPR compliant
      anonymize_ip: true,
      allow_google_signals: false,
      allow_ad_personalization_signals: false,
      
      // Configurações cookieless - remove dependência de third-party cookies
      storage: 'none',
      client_storage: 'none',
      cookie_domain: 'none',
      cookie_update: false,
      cookie_expires: 0,
      
      // Usar apenas first-party storage local se necessário
      transport_type: 'beacon',
      send_page_view: true,
      
      // Configurações de performance
      custom_map: {
        dimension1: 'user_type'
      }
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

    window.gtag('config', GA_TRACKING_ID, {
      page_path: pageUrl,
      page_title: pageTitle,
      page_location: window.location.origin + pageUrl,
      // Configurações cookieless
      storage: 'none',
      client_storage: 'none',
      cookie_domain: 'none',
      cookie_update: false,
      cookie_expires: 0,
      transport_type: 'beacon'
    });

    if (process.env.NODE_ENV === 'development') {
      console.log('[GA] Page view tracked:', { url: pageUrl, title: pageTitle });
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
      // Manter configurações cookieless
      transport_type: 'beacon'
    });

    if (process.env.NODE_ENV === 'development') {
      console.log('[GA] Event tracked:', { eventName, parameters });
    }
  } catch (error) {
    console.error('[GA] Erro ao rastrear evento:', error);
  }
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