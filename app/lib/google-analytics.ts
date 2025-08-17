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
 * Verifica se o Google Analytics deve ser carregado
 * Ativo apenas em produção com ID válido configurado
 */
export const isGAEnabled = (): boolean => {
  return (
    process.env.NODE_ENV === 'production' && 
    Boolean(GA_TRACKING_ID) &&
    GA_TRACKING_ID.startsWith('G-')
  );
};

/**
 * Inicializa o Google Analytics
 * Carrega o script do GA4 e configura o tracking ID
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

    // Configurar GA com políticas de privacidade para LGPD
    window.gtag('config', GA_TRACKING_ID, {
      // Configurações básicas
      page_title: document.title,
      page_location: window.location.href,
      
      // Configurações de privacidade (LGPD compliance)
      anonymize_ip: true,
      allow_google_signals: false,
      allow_ad_personalization_signals: false,
      
      // Configurações de performance
      send_page_view: true,
      custom_map: {
        dimension1: 'user_type'
      }
    });

    console.log('[GA] Google Analytics inicializado:', GA_TRACKING_ID);
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
    });

    if (process.env.NODE_ENV === 'development') {
      console.log('[GA] Page view tracked:', { url: pageUrl, title: pageTitle });
    }
  } catch (error) {
    console.error('[GA] Erro ao rastrear page view:', error);
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
        send_page_view: true
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
          send_page_view: true
        });
      `,
      ...(nonce && { attributes: { nonce } })
    }
  ];
};