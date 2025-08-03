"use client";

import { GoogleAnalytics } from "@next/third-parties/google";
import { Analytics as VercelAnalytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { useEffect } from "react";

interface AnalyticsProps {
  gaId?: string;
}

// Função para configurar consent mode do Google Analytics
const configureGAConsent = () => {
  if (typeof window !== 'undefined' && window.gtag) {
    // Configuração padrão de consent (sem cookies até o usuário consentir)
    window.gtag!('consent', 'default', {
      'analytics_storage': 'denied',
      'ad_storage': 'denied',
      'ad_user_data': 'denied',
      'ad_personalization': 'denied',
      'wait_for_update': 500,
    });

    // Verificar se já existe consentimento salvo
    const consent = localStorage.getItem('analytics_consent');
    if (consent === 'granted') {
      window.gtag!('consent', 'update', {
        'analytics_storage': 'granted',
      });
    }
  }
};

// Função para eventos customizados
export const trackEvent = (eventName: string, parameters?: Record<string, any>) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag!('event', eventName, {
      custom_parameter: true,
      ...parameters,
    });
  }
};

// Função para track de calculadora usada
export const trackCalculatorUsage = (calculatorName: string, action: string = 'calculate') => {
  trackEvent('calculator_usage', {
    calculator_name: calculatorName,
    action: action,
    timestamp: new Date().toISOString(),
  });
};

// Função para aceitar consent
export const acceptAnalyticsConsent = () => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('analytics_consent', 'granted');
    if (window.gtag) {
      window.gtag!('consent', 'update', {
        'analytics_storage': 'granted',
      });
    }
  }
};

const Analytics: React.FC<AnalyticsProps> = ({ gaId }) => {
  useEffect(() => {
    // Configurar consent mode quando o componente montar
    configureGAConsent();

    // Track de page view para SPA navigation
    const handleRouteChange = () => {
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag!('config', gaId || '', {
          page_path: window.location.pathname,
        });
      }
    };

    // Escutar mudanças de rota (para Next.js App Router)
    window.addEventListener('popstate', handleRouteChange);
    
    return () => {
      window.removeEventListener('popstate', handleRouteChange);
    };
  }, [gaId]);

  const isProduction = process.env.NODE_ENV === "production";

  if (!isProduction || !gaId) {
    return (
      <>
        <VercelAnalytics />
        <SpeedInsights />
      </>
    );
  }

  return (
    <>
      <GoogleAnalytics 
        gaId={gaId}
        dataLayerName="dataLayer"
      />
      <VercelAnalytics />
      <SpeedInsights />
    </>
  );
};

export default Analytics;

// Declaração de tipos para gtag (extendendo tipos existentes)
declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
  }
}