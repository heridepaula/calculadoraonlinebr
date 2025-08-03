"use client";

import { useCallback } from 'react';
import { trackEvent, trackCalculatorUsage } from '@/components/Analytics';

export const useAnalytics = () => {
  // Track calculation events
  const trackCalculation = useCallback((calculatorName: string, inputData?: Record<string, any>) => {
    trackCalculatorUsage(calculatorName, 'calculate');
    
    // Track additional data if provided
    if (inputData) {
      trackEvent('calculation_completed', {
        calculator: calculatorName,
        ...inputData,
      });
    }
  }, []);

  // Track form interactions
  const trackFormInteraction = useCallback((calculatorName: string, field: string, action: string) => {
    trackEvent('form_interaction', {
      calculator: calculatorName,
      field: field,
      action: action, // 'focus', 'blur', 'change'
    });
  }, []);

  // Track errors
  const trackError = useCallback((calculatorName: string, errorType: string, errorMessage?: string) => {
    trackEvent('calculator_error', {
      calculator: calculatorName,
      error_type: errorType,
      error_message: errorMessage,
    });
  }, []);

  // Track clear/reset actions
  const trackClear = useCallback((calculatorName: string) => {
    trackEvent('form_reset', {
      calculator: calculatorName,
    });
  }, []);

  // Track result sharing or copying
  const trackResultAction = useCallback((calculatorName: string, action: string) => {
    trackEvent('result_action', {
      calculator: calculatorName,
      action: action, // 'share', 'copy', 'download'
    });
  }, []);

  // Track scroll to results
  const trackResultView = useCallback((calculatorName: string) => {
    trackEvent('result_viewed', {
      calculator: calculatorName,
    });
  }, []);

  // Track performance metrics
  const trackPerformance = useCallback((calculatorName: string, calculationTime: number) => {
    trackEvent('calculation_performance', {
      calculator: calculatorName,
      calculation_time_ms: calculationTime,
    });
  }, []);

  return {
    trackCalculation,
    trackFormInteraction,
    trackError,
    trackClear,
    trackResultAction,
    trackResultView,
    trackPerformance,
  };
};

export default useAnalytics;