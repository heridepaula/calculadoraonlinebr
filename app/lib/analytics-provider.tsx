import { createContext, useContext, ReactNode } from "react";
import { useLocation } from "@remix-run/react";
import { trackEvent } from "~/lib/google-analytics";
import { CATEGORIES } from "~/lib/constants";

interface AnalyticsContextType {
  trackEvent: (event: string, properties?: Record<string, any>) => void;
  trackCalculatorUsed: (calculatorType: string, category: string) => void;
  trackCalculatorResult: (calculatorType: string, success: boolean, duration?: number) => void;
  trackFeatureUsed: (feature: string) => void;
  trackError: (error: string, context?: string) => void;
}

const AnalyticsContext = createContext<AnalyticsContextType | null>(null);

export const useGlobalAnalytics = () => {
  const context = useContext(AnalyticsContext);
  if (!context) {
    throw new Error("useGlobalAnalytics must be used within AnalyticsProvider");
  }
  return context;
};

const categoryNames: Record<string, string> = Object.fromEntries(
  CATEGORIES.map((c) => [c.id, c.name]),
);

function extractCalculatorInfo(pathname: string) {
  const pathParts = pathname.split("/");
  if (pathParts[1] === "calculadoras" && pathParts.length >= 4) {
    return {
      category: pathParts[2],
      calculator: pathParts[3],
      isCalculatorPage: true,
    };
  }
  return { category: null, calculator: null, isCalculatorPage: false };
}

interface AnalyticsProviderProps {
  children: ReactNode;
}

export function AnalyticsProvider({ children }: AnalyticsProviderProps) {
  const location = useLocation();

  // page_view tracking is NOT done here.
  // - Vercel Analytics' <Analytics /> in root.tsx fires pageviews automatically.
  // - useGoogleAnalytics() hook handles GA4 manual page_view tracking.
  // Adding track("page_view") here would duplicate events.

  const trackEventWithContext = (event: string, properties: Record<string, any> = {}) => {
    const { category, calculator } = extractCalculatorInfo(location.pathname);
    trackEvent(event, {
      event_category: "interaction",
      event_label: event,
      custom_parameters: {
        ...properties,
        current_path: location.pathname,
        current_category: category,
        current_calculator: calculator,
        timestamp: new Date().toISOString(),
      },
    });
  };

  const trackCalculatorUsed = (calculatorType: string, category: string) => {
    trackEvent("calculator_used", {
      event_category: "calculator",
      event_label: calculatorType,
      custom_parameters: {
        calculator_type: calculatorType,
        category: category,
        category_name: categoryNames[category] || category,
        path: location.pathname,
        locale: "pt-BR",
      },
    });
  };

  const trackCalculatorResult = (
    calculatorType: string,
    success: boolean,
    duration?: number,
  ) => {
    trackEvent("calculator_result", {
      event_category: "calculator",
      event_label: calculatorType,
      value: duration,
      custom_parameters: {
        calculator_type: calculatorType,
        success: success,
        calculation_time_ms: duration || 0,
        path: location.pathname,
      },
    });
  };

  const trackFeatureUsed = (feature: string) => {
    const { category, calculator } = extractCalculatorInfo(location.pathname);
    trackEvent("feature_used", {
      event_category: "feature",
      event_label: feature,
      custom_parameters: {
        feature_name: feature,
        calculator_type: calculator,
        category: category,
        path: location.pathname,
      },
    });
  };

  const trackErrorEvent = (error: string, context?: string) => {
    const { category, calculator } = extractCalculatorInfo(location.pathname);
    trackEvent("app_error", {
      event_category: "error",
      event_label: context || "unknown",
      custom_parameters: {
        error_message: error,
        error_context: context || "unknown",
        calculator_type: calculator,
        category: category,
        path: location.pathname,
      },
    });
  };

  const contextValue: AnalyticsContextType = {
    trackEvent: trackEventWithContext,
    trackCalculatorUsed,
    trackCalculatorResult,
    trackFeatureUsed,
    trackError: trackErrorEvent,
  };

  return (
    <AnalyticsContext.Provider value={contextValue}>{children}</AnalyticsContext.Provider>
  );
}
