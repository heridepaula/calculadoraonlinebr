/**
 * Legacy Analytics Compatibility Layer
 *
 * Funções legadas que antes despachavam para @vercel/analytics agora delegam
 * para o GA4 via trackEvent. Mantida a interface pública (tipos e nomes) para
 * não quebrar callers existentes (useAnalytics, componentes legados).
 *
 * Para novos call-sites, importe `trackEvent` diretamente de `~/lib/google-analytics`.
 */

import { trackEvent } from "~/lib/google-analytics";

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

export const trackCalculatorUsed = (data: CalculatorUsedEvent) => {
  trackEvent("calculator_used", {
    event_category: "calculator",
    event_label: data.calculator_type,
    custom_parameters: {
      calculator: data.calculator_type,
      category: data.category,
      has_inputs: !!data.user_inputs,
    },
  });
};

export const trackResultCalculated = (data: ResultCalculatedEvent) => {
  trackEvent("result_calculated", {
    event_category: "calculator",
    event_label: data.calculator_type,
    value: data.calculation_time_ms,
    custom_parameters: {
      calculator: data.calculator_type,
      duration: data.calculation_time_ms,
      success: data.success,
    },
  });
};

export const trackCategoryViewed = (data: CategoryViewedEvent) => {
  trackEvent("category_viewed", {
    event_category: "navigation",
    event_label: data.category_name,
    value: data.calculators_count,
    custom_parameters: {
      category: data.category_name,
      calculators: data.calculators_count,
    },
  });
};

export const trackFeatureClicked = (data: FeatureClickedEvent) => {
  trackEvent("feature_clicked", {
    event_category: "feature",
    event_label: data.feature_name,
    custom_parameters: {
      feature: data.feature_name,
      location: data.page_location,
    },
  });
};

export const trackError = (error: string, context?: string) => {
  trackEvent("error_occurred", {
    event_category: "error",
    event_label: context || "unknown",
    custom_parameters: {
      error_type: error,
      context: context || "unknown",
    },
  });
};

export const trackUserAction = (action: string, properties?: Record<string, any>) => {
  const safeProperties = properties
    ? Object.fromEntries(
        Object.entries(properties).filter(
          ([_, value]) =>
            typeof value === "string" || typeof value === "number" || typeof value === "boolean",
        ),
      )
    : {};

  trackEvent(action, {
    event_category: "user_action",
    event_label: action,
    custom_parameters: safeProperties,
  });
};

export const trackBrazilianMarketMetrics = (data: {
  calculator_type: string;
  regulation_type?: "CLT" | "INSS" | "IRRF" | "FGTS";
  currency_used?: boolean;
}) => {
  trackEvent("brazilian_calculator_used", {
    event_category: "calculator",
    event_label: data.calculator_type,
    custom_parameters: {
      calculator: data.calculator_type,
      regulation: data.regulation_type || "none",
      uses_currency: data.currency_used || false,
      locale: "pt-BR",
    },
  });
};
