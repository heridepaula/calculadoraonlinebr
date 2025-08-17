/**
 * Hook React para Cloudflare Web Analytics no Remix
 * 
 * Fornece integração limpa e otimizada do Cloudflare Analytics
 * com carregamento lazy, error handling e debugging.
 */

import { useEffect, useState } from 'react';
import { 
  initCloudflareAnalytics, 
  isCloudflareEnabled, 
  validateCloudflareAnalytics,
  getCloudflareDebugInfo 
} from '~/lib/cloudflare-analytics';

/**
 * Opções para configuração do hook
 */
export interface UseCloudflareAnalyticsOptions {
  /**
   * Desabilitar carregamento para esta instância
   * @default false
   */
  disabled?: boolean;
  
  /**
   * Delay em ms antes de carregar o script
   * Útil para otimização de performance
   * @default 100
   */
  delay?: number;
  
  /**
   * Tentar novamente em caso de falha
   * @default true
   */
  retryOnFailure?: boolean;
  
  /**
   * Callback chamado quando carregamento for bem-sucedido
   */
  onLoaded?: () => void;
  
  /**
   * Callback chamado em caso de erro
   */
  onError?: (error: Error) => void;
}

/**
 * Estado do Cloudflare Analytics
 */
export interface CloudflareAnalyticsState {
  isEnabled: boolean;
  isLoaded: boolean;
  isLoading: boolean;
  error: Error | null;
  debugInfo?: any;
}

/**
 * Hook principal para Cloudflare Web Analytics
 * 
 * Características:
 * - Carregamento automático em produção
 * - Error handling robusto
 * - Debug info em desenvolvimento
 * - Performance otimizada com delay
 * - Validação automática
 * 
 * @param options Configurações do hook
 * @returns Estado e funções de controle
 */
export const useCloudflareAnalytics = (
  options: UseCloudflareAnalyticsOptions = {}
) => {
  const {
    disabled = false,
    delay = 100,
    retryOnFailure = true,
    onLoaded,
    onError
  } = options;

  const [state, setState] = useState<CloudflareAnalyticsState>({
    isEnabled: isCloudflareEnabled() && !disabled,
    isLoaded: false,
    isLoading: false,
    error: null,
    debugInfo: process.env.NODE_ENV === 'development' ? getCloudflareDebugInfo() : undefined
  });

  useEffect(() => {
    // Não carregar se desabilitado ou não habilitado
    if (disabled || !isCloudflareEnabled()) {
      return;
    }

    let timeoutId: NodeJS.Timeout;
    let retryTimeoutId: NodeJS.Timeout;

    const loadAnalytics = async () => {
      setState(prev => ({ ...prev, isLoading: true, error: null }));

      try {
        // Inicializar Cloudflare Analytics
        initCloudflareAnalytics();

        // Aguardar um pouco para verificar se carregou
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Validar se foi carregado corretamente
        const isValid = validateCloudflareAnalytics();

        if (isValid) {
          setState(prev => ({ 
            ...prev, 
            isLoaded: true, 
            isLoading: false,
            debugInfo: process.env.NODE_ENV === 'development' ? getCloudflareDebugInfo() : undefined
          }));
          
          onLoaded?.();
        } else {
          throw new Error('Cloudflare Analytics não foi carregado corretamente');
        }

      } catch (error) {
        const errorObj = error instanceof Error ? error : new Error(String(error));
        
        setState(prev => ({ 
          ...prev, 
          isLoading: false, 
          error: errorObj,
          debugInfo: process.env.NODE_ENV === 'development' ? getCloudflareDebugInfo() : undefined
        }));

        onError?.(errorObj);

        // Retry em caso de falha (apenas uma vez)
        if (retryOnFailure) {
          retryTimeoutId = setTimeout(() => {
            loadAnalytics();
          }, 5000);
        }
      }
    };

    // Carregar com delay para otimização
    timeoutId = setTimeout(loadAnalytics, delay);

    return () => {
      clearTimeout(timeoutId);
      clearTimeout(retryTimeoutId);
    };
  }, [disabled, delay, retryOnFailure, onLoaded, onError]);

  return {
    ...state,
    
    /**
     * Força recarregamento do Cloudflare Analytics
     */
    reload: () => {
      setState(prev => ({ ...prev, isLoaded: false, error: null }));
      initCloudflareAnalytics();
    },
    
    /**
     * Valida se está funcionando corretamente
     */
    validate: validateCloudflareAnalytics
  };
};

/**
 * Hook simplificado que apenas carrega o Cloudflare Analytics
 * Para casos onde só é necessário o carregamento básico
 */
export const useCloudflareAnalyticsSimple = () => {
  return useCloudflareAnalytics({ delay: 50 });
};

/**
 * Hook para debugging do Cloudflare Analytics
 * Apenas em desenvolvimento
 */
export const useCloudflareDebug = () => {
  const [debugInfo, setDebugInfo] = useState<any>(null);

  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      const updateDebugInfo = () => {
        setDebugInfo(getCloudflareDebugInfo());
      };

      updateDebugInfo();
      
      // Atualizar debug info a cada 2 segundos
      const interval = setInterval(updateDebugInfo, 2000);
      
      return () => clearInterval(interval);
    }
  }, []);

  return debugInfo;
};

/**
 * Hook para monitoramento de performance do Cloudflare
 * Mede tempo de carregamento e success rate
 */
export const useCloudflarePerformance = () => {
  const [metrics, setMetrics] = useState({
    loadTime: 0,
    loadSuccess: false,
    retryCount: 0
  });

  const startTime = Date.now();

  const analytics = useCloudflareAnalytics({
    onLoaded: () => {
      setMetrics(prev => ({
        ...prev,
        loadTime: Date.now() - startTime,
        loadSuccess: true
      }));
    },
    onError: () => {
      setMetrics(prev => ({
        ...prev,
        retryCount: prev.retryCount + 1,
        loadSuccess: false
      }));
    }
  });

  return {
    ...analytics,
    metrics
  };
};