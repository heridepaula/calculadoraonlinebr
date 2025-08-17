import { useEffect, useRef, useCallback } from "react";
import { useLocation } from "@remix-run/react";
import { useGlobalAnalytics } from "~/lib/analytics-provider";

interface CalculatorTrackingOptions {
  calculatorType: string;
  category?: string;
  autoTrackResults?: boolean;
}

/**
 * Hook que detecta automaticamente o uso de calculadoras e faz tracking
 * Deve ser usado em todas as páginas de calculadora
 */
export function useAutoCalculatorTracking(options: CalculatorTrackingOptions) {
  const { trackCalculatorUsed, trackCalculatorResult, trackFeatureUsed } = useGlobalAnalytics();
  const location = useLocation();
  const hasTrackedUsage = useRef(false);
  const calculationStartTime = useRef<number | null>(null);

  // Auto-detect category from URL if not provided
  const category = options.category || location.pathname.split("/")[2] || "unknown";

  // Track calculator page load (once per session)
  useEffect(() => {
    if (!hasTrackedUsage.current) {
      trackCalculatorUsed(options.calculatorType, category);
      hasTrackedUsage.current = true;
    }
  }, [options.calculatorType, category, trackCalculatorUsed]);

  // Functions to manually track calculation lifecycle
  const startCalculation = useCallback(() => {
    calculationStartTime.current = performance.now();
  }, []);

  const endCalculation = useCallback((success: boolean, error?: string) => {
    const duration = calculationStartTime.current 
      ? performance.now() - calculationStartTime.current 
      : 0;

    trackCalculatorResult(options.calculatorType, success, duration);

    if (!success && error) {
      // Track error with more context
      trackCalculatorResult(options.calculatorType, false, duration);
    }

    calculationStartTime.current = null;
  }, [options.calculatorType, trackCalculatorResult]);

  // Track feature usage
  const trackFeature = useCallback((featureName: string) => {
    trackFeatureUsed(`${options.calculatorType}_${featureName}`);
  }, [options.calculatorType, trackFeatureUsed]);

  // Auto-tracking para elementos comuns
  const trackButtonClick = useCallback((buttonName: string) => {
    trackFeature(`button_${buttonName}`);
  }, [trackFeature]);

  const trackTabChange = useCallback((tabName: string) => {
    trackFeature(`tab_${tabName}`);
  }, [trackFeature]);

  const trackStepsToggle = useCallback((shown: boolean) => {
    trackFeature(shown ? "show_steps" : "hide_steps");
  }, [trackFeature]);

  const trackInputFocus = useCallback((inputName: string) => {
    trackFeature(`input_${inputName}_focused`);
  }, [trackFeature]);

  return {
    // Manual tracking functions
    startCalculation,
    endCalculation,
    trackFeature,
    
    // Common UI element tracking
    trackButtonClick,
    trackTabChange,
    trackStepsToggle,
    trackInputFocus,
    
    // Utility info
    calculatorType: options.calculatorType,
    category
  };
}

/**
 * Hook para tracking automatizado de formulários de calculadora
 * Detecta mudanças em inputs e submissões automaticamente
 */
export function useFormTracking(calculatorType: string) {
  const { trackFeatureUsed } = useGlobalAnalytics();
  const formInteractionTracked = useRef(false);

  const trackFormInteraction = useCallback(() => {
    if (!formInteractionTracked.current) {
      trackFeatureUsed(`${calculatorType}_form_interaction`);
      formInteractionTracked.current = true;
    }
  }, [calculatorType, trackFeatureUsed]);

  const trackInputChange = useCallback((inputName: string) => {
    trackFormInteraction();
    // Optional: track specific input if needed for analysis
  }, [trackFormInteraction]);

  const trackFormSubmission = useCallback(() => {
    trackFeatureUsed(`${calculatorType}_form_submitted`);
  }, [calculatorType, trackFeatureUsed]);

  return {
    trackInputChange,
    trackFormSubmission,
    trackFormInteraction
  };
}

/**
 * Hook para tracking de performance da página
 */
export function usePerformanceTracking(calculatorType: string) {
  const { trackEvent } = useGlobalAnalytics();

  useEffect(() => {
    // Track page load performance
    if (typeof window !== "undefined" && "performance" in window) {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        
        entries.forEach((entry) => {
          if (entry.entryType === "navigation") {
            const navEntry = entry as PerformanceNavigationTiming;
            
            trackEvent("page_performance", {
              calculator_type: calculatorType,
              load_time: navEntry.loadEventEnd - navEntry.loadEventStart,
              dom_content_loaded: navEntry.domContentLoadedEventEnd - navEntry.domContentLoadedEventStart,
              first_paint: navEntry.responseEnd - navEntry.requestStart,
              page_type: "calculator"
            });
          }
        });
      });

      observer.observe({ entryTypes: ["navigation"] });

      return () => observer.disconnect();
    }
  }, [calculatorType, trackEvent]);
}