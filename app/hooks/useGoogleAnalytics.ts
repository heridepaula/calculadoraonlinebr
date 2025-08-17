/**
 * Hook personalizado para Google Analytics no Remix
 * 
 * Gerencia tracking automático de page views com integração nativa do Remix
 * Funciona com navegação client-side e server-side rendering
 */

import { useEffect, createContext, useContext, ReactNode } from 'react';
import { useLocation } from '@remix-run/react';
import { trackPageView, isGAEnabled } from '~/lib/google-analytics';

/**
 * Hook principal para tracking automático de page views
 * 
 * Características:
 * - Rastreia mudanças de rota automaticamente
 * - Funciona com navegação client-side do Remix
 * - Respeita configurações de produção
 * - Debounce automático para evitar tracking duplicado
 * 
 * @param options - Configurações opcionais do tracking
 */
export interface UseGoogleAnalyticsOptions {
  /**
   * Desabilitar tracking para esta página específica
   * @default false
   */
  disabled?: boolean;
  
  /**
   * Título customizado para a página (sobrescreve document.title)
   */
  customTitle?: string;
  
  /**
   * Delay em ms antes de fazer o tracking (útil para páginas com loading)
   * @default 100
   */
  delay?: number;
}

export const useGoogleAnalytics = (options: UseGoogleAnalyticsOptions = {}) => {
  const location = useLocation();
  const { disabled = false, customTitle, delay = 100 } = options;

  useEffect(() => {
    // Verificar se deve fazer tracking
    if (disabled || !isGAEnabled()) {
      return;
    }

    // Debounce para evitar tracking duplicado em navegação rápida
    const timeoutId = setTimeout(() => {
      const currentPath = location.pathname + location.search;
      trackPageView(currentPath, customTitle);
    }, delay);

    return () => clearTimeout(timeoutId);
  }, [location.pathname, location.search, disabled, customTitle, delay]);

  return {
    /**
     * Função para tracking manual de page view
     */
    trackPage: (url?: string, title?: string) => {
      if (!disabled && isGAEnabled()) {
        trackPageView(url, title);
      }
    },
    
    /**
     * Status se o GA está ativo
     */
    isEnabled: isGAEnabled() && !disabled,
    
    /**
     * Localização atual
     */
    currentLocation: location
  };
};

/**
 * Hook simplificado que apenas ativa o tracking automático
 * Para usar em páginas que só precisam de tracking básico
 */
export const usePageTracking = (customTitle?: string) => {
  return useGoogleAnalytics({ customTitle });
};

/**
 * Hook para páginas que não devem ser rastreadas
 * Útil para páginas administrativas, de erro, etc.
 */
export const useNoTracking = () => {
  return useGoogleAnalytics({ disabled: true });
};

/**
 * Provider context para Google Analytics (opcional)
 * Para configurações mais avançadas que precisem ser compartilhadas
 */

interface GAContextValue {
  isEnabled: boolean;
  trackPage: (url?: string, title?: string) => void;
}

const GAContext = createContext<GAContextValue | null>(null);

/**
 * Hook para acessar o contexto do Google Analytics
 * Para casos avançados onde o contexto é necessário
 */
export const useGAContext = () => {
  // Por simplicidade, retornamos as funções diretamente
  return {
    isEnabled: isGAEnabled(),
    trackPage: (url?: string, title?: string) => {
      if (isGAEnabled()) {
        trackPageView(url, title);
      }
    }
  };
};

/**
 * Hook utilitário para debugging do GA em desenvolvimento
 * Mostra informações úteis sobre o estado do tracking
 */
export const useGADebug = () => {
  const location = useLocation();
  
  if (process.env.NODE_ENV !== 'development') {
    return null;
  }
  
  return {
    isEnabled: isGAEnabled(),
    currentPath: location.pathname + location.search,
    gaId: process.env.VITE_GA_ID,
    nodeEnv: process.env.NODE_ENV,
    hasGtagFunction: typeof window !== 'undefined' && Boolean(window.gtag),
    hasDataLayer: typeof window !== 'undefined' && Boolean(window.dataLayer)
  };
};