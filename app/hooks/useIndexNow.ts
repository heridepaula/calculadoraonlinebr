/**
 * IndexNow Hook for Automatic URL Submission
 * 
 * This hook provides utilities for automatically submitting URLs to IndexNow
 * when content changes or new pages are created.
 */

import { useCallback, useEffect } from 'react';
import { useLocation } from '@remix-run/react';

interface UseIndexNowOptions {
  /** Whether to automatically submit current page URL on mount */
  autoSubmit?: boolean;
  /** Whether to submit URL when location changes */
  submitOnLocationChange?: boolean;
  /** Delay before submission in milliseconds */
  delay?: number;
  /** Whether IndexNow is enabled (default: only in production) */
  enabled?: boolean;
}

interface IndexNowSubmission {
  url: string;
  timestamp: number;
  success?: boolean;
  error?: string;
}

// In-memory cache to avoid duplicate submissions
const submissionCache = new Map<string, IndexNowSubmission>();
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

export function useIndexNow(options: UseIndexNowOptions = {}) {
  const location = useLocation();
  
  const {
    autoSubmit = false,
    submitOnLocationChange = false,
    delay = 1000,
    enabled = process.env.NODE_ENV === 'production'
  } = options;

  /**
   * Checks if URL was recently submitted to avoid spam
   */
  const wasRecentlySubmitted = useCallback((url: string): boolean => {
    const cached = submissionCache.get(url);
    if (!cached) return false;
    
    const isExpired = Date.now() - cached.timestamp > CACHE_DURATION;
    if (isExpired) {
      submissionCache.delete(url);
      return false;
    }
    
    return true;
  }, []);

  /**
   * Submits a single URL to IndexNow
   */
  const submitUrl = useCallback(async (url?: string): Promise<boolean> => {
    if (!enabled) {
      console.log('[IndexNow] Disabled - not submitting URL');
      return false;
    }

    const targetUrl = url || window.location.href;
    
    // Check if recently submitted
    if (wasRecentlySubmitted(targetUrl)) {
      console.log('[IndexNow] URL recently submitted, skipping:', targetUrl);
      return false;
    }

    try {
      // Call our API endpoint for IndexNow submission
      const response = await fetch('/api/indexnow', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url: targetUrl, type: 'single' }),
      });

      const result = await response.json();
      
      // Cache the submission
      submissionCache.set(targetUrl, {
        url: targetUrl,
        timestamp: Date.now(),
        success: result.success,
        error: result.success ? undefined : result.message
      });

      if (result.success) {
        console.log('[IndexNow] Successfully submitted URL:', targetUrl);
        return true;
      } else {
        console.warn('[IndexNow] Failed to submit URL:', targetUrl, result.message);
        return false;
      }
    } catch (error) {
      console.error('[IndexNow] Error submitting URL:', error);
      
      // Cache the failed submission to avoid retries
      submissionCache.set(targetUrl, {
        url: targetUrl,
        timestamp: Date.now(),
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      });
      
      return false;
    }
  }, [enabled, wasRecentlySubmitted]);

  /**
   * Submits multiple URLs to IndexNow
   */
  const submitUrls = useCallback(async (urls: string[]): Promise<boolean> => {
    if (!enabled) {
      console.log('[IndexNow] Disabled - not submitting URLs');
      return false;
    }

    // Filter out recently submitted URLs
    const urlsToSubmit = urls.filter(url => !wasRecentlySubmitted(url));
    
    if (urlsToSubmit.length === 0) {
      console.log('[IndexNow] All URLs recently submitted, skipping bulk submission');
      return false;
    }

    try {
      const response = await fetch('/api/indexnow', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ urls: urlsToSubmit, type: 'bulk' }),
      });

      const result = await response.json();
      
      // Cache all submissions
      const timestamp = Date.now();
      urlsToSubmit.forEach(url => {
        submissionCache.set(url, {
          url,
          timestamp,
          success: result.success,
          error: result.success ? undefined : result.message
        });
      });

      if (result.success) {
        console.log('[IndexNow] Successfully submitted URLs:', urlsToSubmit);
        return true;
      } else {
        console.warn('[IndexNow] Failed to submit URLs:', result.message);
        return false;
      }
    } catch (error) {
      console.error('[IndexNow] Error submitting URLs:', error);
      return false;
    }
  }, [enabled, wasRecentlySubmitted]);

  /**
   * Submits calculator-related URLs
   */
  const submitCalculatorUrls = useCallback(async (calculatorPath?: string): Promise<boolean> => {
    if (!enabled) return false;
    
    const path = calculatorPath || location.pathname;
    
    try {
      const response = await fetch('/api/indexnow', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ calculatorPath: path, type: 'calculator' }),
      });

      const result = await response.json();
      return result.success;
    } catch (error) {
      console.error('[IndexNow] Error submitting calculator URLs:', error);
      return false;
    }
  }, [enabled, location.pathname]);

  // Auto-submit current page on mount
  useEffect(() => {
    if (autoSubmit && enabled) {
      const timer = setTimeout(() => {
        submitUrl();
      }, delay);

      return () => clearTimeout(timer);
    }
  }, [autoSubmit, enabled, delay, submitUrl]);

  // Submit URL when location changes
  useEffect(() => {
    if (submitOnLocationChange && enabled) {
      const timer = setTimeout(() => {
        submitUrl();
      }, delay);

      return () => clearTimeout(timer);
    }
  }, [location.pathname, submitOnLocationChange, enabled, delay, submitUrl]);

  return {
    submitUrl,
    submitUrls,
    submitCalculatorUrls,
    enabled,
    wasRecentlySubmitted,
    getSubmissionHistory: () => Array.from(submissionCache.values())
  };
}