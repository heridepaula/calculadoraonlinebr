import { useCallback } from "react";
import { useLocation } from "@remix-run/react";
import { 
  trackCalculatorUsed, 
  trackResultCalculated, 
  trackCategoryViewed, 
  trackFeatureClicked,
  trackBrazilianMarketMetrics,
  trackError,
  type CalculatorUsedEvent,
  type ResultCalculatedEvent,
  type CategoryViewedEvent,
  type FeatureClickedEvent 
} from "~/lib/analytics";

/**
 * Custom hook for Vercel Analytics integration
 * Provides easy-to-use tracking functions for the calculator app
 */
export function useAnalytics() {
  const location = useLocation();

  const trackCalculator = useCallback((data: Omit<CalculatorUsedEvent, "category">) => {
    // Extract category from current path
    const pathParts = location.pathname.split("/");
    const category = pathParts[2] || "unknown"; // /calculadoras/[category]/[calculator]
    
    trackCalculatorUsed({
      ...data,
      category,
    });
  }, [location.pathname]);

  const trackResult = useCallback((data: ResultCalculatedEvent) => {
    trackResultCalculated(data);
  }, []);

  const trackCategory = useCallback((data: CategoryViewedEvent) => {
    trackCategoryViewed(data);
  }, []);

  const trackFeature = useCallback((featureName: string) => {
    trackFeatureClicked({
      feature_name: featureName,
      page_location: location.pathname,
    });
  }, [location.pathname]);

  const trackBrazilianCalculator = useCallback((data: Parameters<typeof trackBrazilianMarketMetrics>[0]) => {
    trackBrazilianMarketMetrics(data);
  }, []);

  const trackAppError = useCallback((error: string) => {
    trackError(error, location.pathname);
  }, [location.pathname]);

  return {
    trackCalculator,
    trackResult,
    trackCategory,
    trackFeature,
    trackBrazilianCalculator,
    trackError: trackAppError,
  };
}