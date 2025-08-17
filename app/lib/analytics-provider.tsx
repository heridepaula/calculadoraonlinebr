import React, { createContext, useContext, useEffect, ReactNode } from "react";
import { useLocation, useNavigate } from "@remix-run/react";
import { track } from "@vercel/analytics";

// Analytics Context
interface AnalyticsContextType {
  trackEvent: (event: string, properties?: Record<string, any>) => void;
  trackCalculatorUsed: (calculatorType: string, category: string) => void;
  trackCalculatorResult: (calculatorType: string, success: boolean, duration?: number) => void;
  trackFeatureUsed: (feature: string) => void;
  trackError: (error: string, context?: string) => void;
}

const AnalyticsContext = createContext<AnalyticsContextType | null>(null);

// Hook para usar o Analytics Context
export const useGlobalAnalytics = () => {
  const context = useContext(AnalyticsContext);
  if (!context) {
    throw new Error("useGlobalAnalytics must be used within AnalyticsProvider");
  }
  return context;
};

// Utilitários para extrair informações da URL
const extractCalculatorInfo = (pathname: string) => {
  const pathParts = pathname.split("/");
  
  if (pathParts[1] === "calculadoras" && pathParts.length >= 4) {
    return {
      category: pathParts[2],
      calculator: pathParts[3],
      isCalculatorPage: true
    };
  }
  
  return {
    category: null,
    calculator: null,
    isCalculatorPage: false
  };
};

// Mapeamento de categorias
const categoryNames: Record<string, string> = {
  saude: "Saúde",
  financas: "Finanças", 
  matematica: "Matemática",
  trabalhista: "Trabalhista"
};

interface AnalyticsProviderProps {
  children: ReactNode;
}

export function AnalyticsProvider({ children }: AnalyticsProviderProps) {
  const location = useLocation();
  
  // Tracking automático de page views
  useEffect(() => {
    const { category, calculator, isCalculatorPage } = extractCalculatorInfo(location.pathname);
    
    // Track page view
    track("page_view", {
      path: location.pathname,
      category: category || "other",
      calculator: calculator || null,
      is_calculator: isCalculatorPage,
      timestamp: new Date().toISOString()
    });
    
    // Track específico para páginas de calculadora
    if (isCalculatorPage && category && calculator) {
      track("calculator_page_viewed", {
        calculator_type: calculator,
        category: category,
        category_name: categoryNames[category] || category,
        full_path: location.pathname
      });
    }
    
    // Track páginas de categoria
    if (location.pathname.startsWith("/calculadoras/") && location.pathname.split("/").length === 3) {
      track("category_page_viewed", {
        category: category,
        category_name: categoryNames[category || ""] || category,
        path: location.pathname
      });
    }
  }, [location.pathname]);

  // Funções de tracking centralizadas
  const trackEvent = (event: string, properties: Record<string, any> = {}) => {
    const { category, calculator } = extractCalculatorInfo(location.pathname);
    
    track(event, {
      ...properties,
      current_path: location.pathname,
      current_category: category,
      current_calculator: calculator,
      timestamp: new Date().toISOString()
    });
  };

  const trackCalculatorUsed = (calculatorType: string, category: string) => {
    track("calculator_used", {
      calculator_type: calculatorType,
      category: category,
      category_name: categoryNames[category] || category,
      path: location.pathname,
      locale: "pt-BR"
    });
  };

  const trackCalculatorResult = (calculatorType: string, success: boolean, duration?: number) => {
    track("calculator_result", {
      calculator_type: calculatorType,
      success: success,
      calculation_time_ms: duration || 0,
      path: location.pathname,
      timestamp: new Date().toISOString()
    });
  };

  const trackFeatureUsed = (feature: string) => {
    const { category, calculator } = extractCalculatorInfo(location.pathname);
    
    track("feature_used", {
      feature_name: feature,
      calculator_type: calculator,
      category: category,
      path: location.pathname
    });
  };

  const trackError = (error: string, context?: string) => {
    const { category, calculator } = extractCalculatorInfo(location.pathname);
    
    track("error_occurred", {
      error_message: error,
      error_context: context || "unknown",
      calculator_type: calculator,
      category: category,
      path: location.pathname,
      timestamp: new Date().toISOString()
    });
  };

  const contextValue: AnalyticsContextType = {
    trackEvent,
    trackCalculatorUsed,
    trackCalculatorResult,
    trackFeatureUsed,
    trackError
  };

  return (
    <AnalyticsContext.Provider value={contextValue}>
      {children}
    </AnalyticsContext.Provider>
  );
}