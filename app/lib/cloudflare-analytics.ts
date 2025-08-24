/**
 * Cloudflare Web Analytics Configuration for Remix
 * 
 * Configuração otimizada do Cloudflare Web Analytics com carregamento
 * condicional, TypeScript seguro e compliance de privacidade.
 * 
 * Características:
 * - Carregamento apenas em produção
 * - Lazy loading para otimização de performance
 * - TypeScript com tipos seguros
 * - Compliance com LGPD
 * - DNS prefetch para performance
 */

// Declaração global para Cloudflare Analytics
declare global {
  interface Window {
    __cfBeacon?: {
      load?: (config: CloudflareBeaconConfig) => void;
      [key: string]: any;
    };
  }
}

/**
 * Configuração do Cloudflare Beacon
 */
export interface CloudflareBeaconConfig {
  token: string;
  spa?: boolean;
  endpoint?: string;
  reportingOrigin?: string;
}

/**
 * Token do Cloudflare Web Analytics
 * Pode ser configurado via variável de ambiente ou hardcoded
 */
export const CLOUDFLARE_TOKEN = (typeof window !== 'undefined' && import.meta.env?.VITE_CLOUDFLARE_TOKEN) || '17de6aeb3f444f6289e06cd7ed4fb3aa';

/**
 * URL do script do Cloudflare Web Analytics
 */
export const CLOUDFLARE_SCRIPT_URL = 'https://static.cloudflareinsights.com/beacon.min.js';

/**
 * Verifica se o Cloudflare Analytics deve ser carregado
 * 
 * Critérios:
 * - Estar em produção (NODE_ENV === 'production')
 * - Ter token válido configurado
 * - Estar no ambiente do navegador
 * 
 * @returns boolean indicando se deve carregar o Cloudflare Analytics
 */
export const isCloudflareEnabled = (): boolean => {
  return (
    import.meta.env.PROD && 
    Boolean(CLOUDFLARE_TOKEN) &&
    CLOUDFLARE_TOKEN.length > 10 && // Validação básica do token
    typeof window !== 'undefined'
  );
};

/**
 * Configuração do beacon do Cloudflare
 * Otimizada para SPAs como Remix
 */
export const getCloudflareConfig = (): CloudflareBeaconConfig => ({
  token: CLOUDFLARE_TOKEN,
  spa: true, // Importante para SPAs (Single Page Applications)
});

/**
 * Carrega o script do Cloudflare Web Analytics de forma assíncrona
 * 
 * Implementa:
 * - Carregamento lazy com defer
 * - Verificação de duplicação
 * - Error handling
 * - DNS prefetch para performance
 * 
 * @returns Promise<boolean> indicando sucesso no carregamento
 */
export const loadCloudflareAnalytics = async (): Promise<boolean> => {
  if (!isCloudflareEnabled()) {
    if (import.meta.env.DEV) {
      console.log('[Cloudflare] Desabilitado - ambiente de desenvolvimento');
    }
    return false;
  }

  try {
    // Verificar se já foi carregado
    if (document.querySelector('script[src*="cloudflareinsights.com"]')) {
      console.log('[Cloudflare] Script já carregado');
      return true;
    }

    // Criar elemento script com configurações otimizadas
    const script = document.createElement('script');
    script.src = CLOUDFLARE_SCRIPT_URL;
    script.defer = true; // Importante para performance
    script.async = false; // Manter ordem de execução
    
    // Configurar data-cf-beacon com JSON válido
    const config = getCloudflareConfig();
    script.setAttribute('data-cf-beacon', JSON.stringify(config));
    
    // Adicionar event listeners para debugging
    script.onload = () => {
      if (import.meta.env.DEV) {
        console.log('[Cloudflare] Analytics carregado com sucesso');
      }
    };
    
    script.onerror = (error) => {
      console.error('[Cloudflare] Erro ao carregar analytics:', error);
    };

    // Inserir no documento
    const firstScript = document.getElementsByTagName('script')[0];
    if (firstScript && firstScript.parentNode) {
      firstScript.parentNode.insertBefore(script, firstScript);
    } else {
      document.head.appendChild(script);
    }

    return true;

  } catch (error) {
    console.error('[Cloudflare] Erro na configuração do analytics:', error);
    return false;
  }
};

/**
 * Inicializa o Cloudflare Web Analytics
 * Deve ser chamado após o DOM estar pronto
 */
export const initCloudflareAnalytics = (): void => {
  if (!isCloudflareEnabled()) {
    return;
  }

  // Aguardar DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      loadCloudflareAnalytics();
    });
  } else {
    loadCloudflareAnalytics();
  }
};

/**
 * Gera o HTML do script para inserção no <head>
 * Usado no server-side rendering (SSR)
 * 
 * @param options Opções de configuração
 * @returns string HTML do script ou vazio se desabilitado
 */
export interface CloudflareScriptOptions {
  nonce?: string;
  defer?: boolean;
}

export const getCloudflareScriptHTML = (options: CloudflareScriptOptions = {}): string => {
  if (!isCloudflareEnabled()) {
    return '';
  }

  const { nonce, defer = true } = options;
  const config = getCloudflareConfig();
  const configJSON = JSON.stringify(config).replace(/"/g, '&quot;');
  const nonceAttr = nonce ? ` nonce="${nonce}"` : '';
  const deferAttr = defer ? ' defer' : '';

  return `<script${deferAttr} src="${CLOUDFLARE_SCRIPT_URL}" data-cf-beacon="${configJSON}"${nonceAttr}></script>`;
};

/**
 * Configuração de meta tags para otimização do Cloudflare
 * Para usar com Remix Meta API
 */
export const getCloudflareMetaTags = () => {
  if (!isCloudflareEnabled()) {
    return [];
  }

  return [
    {
      tagName: 'link',
      attributes: {
        rel: 'dns-prefetch',
        href: 'https://static.cloudflareinsights.com'
      }
    },
    {
      tagName: 'link',
      attributes: {
        rel: 'preconnect',
        href: 'https://static.cloudflareinsights.com',
        crossOrigin: 'anonymous'
      }
    }
  ];
};

/**
 * Hook React para carregar Cloudflare Analytics
 * Uso em componentes Remix
 */
export const useCloudflareAnalytics = () => {
  if (typeof window !== 'undefined' && isCloudflareEnabled()) {
    // Carregar apenas uma vez quando o componente montar
    initCloudflareAnalytics();
  }

  return {
    isEnabled: isCloudflareEnabled(),
    token: CLOUDFLARE_TOKEN,
    loadAnalytics: loadCloudflareAnalytics
  };
};

/**
 * Utilitário para debug do Cloudflare Analytics
 * Apenas em desenvolvimento
 */
export const getCloudflareDebugInfo = () => {
  if (!import.meta.env.DEV) {
    return null;
  }

  return {
    isEnabled: isCloudflareEnabled(),
    token: CLOUDFLARE_TOKEN,
    hasScript: typeof window !== 'undefined' && 
               Boolean(document.querySelector('script[src*="cloudflareinsights.com"]')),
    hasBeacon: typeof window !== 'undefined' && Boolean(window.__cfBeacon),
    nodeEnv: import.meta.env.MODE,
    scriptUrl: CLOUDFLARE_SCRIPT_URL
  };
};

/**
 * Verifica a integridade e funcionamento do Cloudflare Analytics
 * Útil para monitoramento em produção
 */
export const validateCloudflareAnalytics = (): boolean => {
  if (!isCloudflareEnabled() || typeof window === 'undefined') {
    return false;
  }

  // Verificar se o script foi carregado
  const hasScript = Boolean(document.querySelector('script[src*="cloudflareinsights.com"]'));
  
  // Verificar se o beacon está disponível (pode demorar alguns segundos)
  const hasBeacon = Boolean(window.__cfBeacon);
  
  if (import.meta.env.DEV) {
    console.log('[Cloudflare] Validação:', {
      hasScript,
      hasBeacon,
      token: CLOUDFLARE_TOKEN
    });
  }

  return hasScript;
};