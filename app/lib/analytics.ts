/**
 * Vercel Analytics Configuration
 * Configuração do Analytics da Vercel para Calculadora Online BR
 */

import { track } from "@vercel/analytics";

// Types for analytics events
export type AnalyticsEvent = 
  | "calculator_used"
  | "result_calculated"
  | "category_viewed"
  | "page_view"
  | "error_occurred"
  | "feature_clicked";

export interface CalculatorUsedEvent {
  calculator_type: string;
  category: string;
  user_inputs?: Record<string, any>;
}

export interface ResultCalculatedEvent {
  calculator_type: string;
  calculation_time_ms: number;
  success: boolean;
}

export interface CategoryViewedEvent {
  category_name: string;
  calculators_count: number;
}

export interface FeatureClickedEvent {
  feature_name: string;
  page_location: string;
}

/**
 * Track calculator usage
 */
export const trackCalculatorUsed = (data: CalculatorUsedEvent) => {
  track("calculator_used", {
    calculator: data.calculator_type,
    category: data.category,
    // Don't track sensitive user inputs for privacy
    has_inputs: !!data.user_inputs,
  });
};

/**
 * Track calculation results
 */
export const trackResultCalculated = (data: ResultCalculatedEvent) => {
  track("result_calculated", {
    calculator: data.calculator_type,
    duration: data.calculation_time_ms,
    success: data.success,
  });
};

/**
 * Track category page views
 */
export const trackCategoryViewed = (data: CategoryViewedEvent) => {
  track("category_viewed", {
    category: data.category_name,
    calculators: data.calculators_count,
  });
};

/**
 * Track feature interactions
 */
export const trackFeatureClicked = (data: FeatureClickedEvent) => {
  track("feature_clicked", {
    feature: data.feature_name,
    location: data.page_location,
  });
};

/**
 * Track errors for debugging
 */
export const trackError = (error: string, context?: string) => {
  track("error_occurred", {
    error_type: error,
    context: context || "unknown",
  });
};

/**
 * Privacy-compliant user action tracking
 * Tracks user actions without collecting personal data
 */
export const trackUserAction = (action: string, properties?: Record<string, any>) => {
  // Filter out any potentially sensitive data
  const safeProperties = properties ? 
    Object.fromEntries(
      Object.entries(properties).filter(([_, value]) => 
        typeof value === "string" || 
        typeof value === "number" || 
        typeof value === "boolean"
      )
    ) : {};

  track(action, safeProperties);
};

/**
 * Brazilian market specific tracking
 */
export const trackBrazilianMarketMetrics = (data: {
  calculator_type: string;
  regulation_type?: "CLT" | "INSS" | "IRRF" | "FGTS";
  currency_used?: boolean;
}) => {
  track("brazilian_calculator_used", {
    calculator: data.calculator_type,
    regulation: data.regulation_type || "none",
    uses_currency: data.currency_used || false,
    locale: "pt-BR",
  });
};