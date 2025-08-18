/**
 * Google AdSense Configuration
 * Configuração otimizada para SEO e performance
 */

export const ADSENSE_CLIENT_ID = "ca-pub-1778632581161801";

// AdSense configuration based on environment
export const isAdSenseEnabled = () => {
  if (typeof window === 'undefined') return false;
  return process.env.NODE_ENV === 'production';
};

// Get AdSense client ID from environment or default
export const getAdSenseClientId = () => {
  if (typeof window !== 'undefined' && window.__ENV?.VITE_ADSENSE_CLIENT) {
    return window.__ENV.VITE_ADSENSE_CLIENT;
  }
  return ADSENSE_CLIENT_ID;
};

// AdSense slot configurations for different page types
export const AD_SLOTS = {
  // Homepage slots
  HOMEPAGE_HERO: "1234567890",
  HOMEPAGE_CATEGORY: "1234567891",
  
  // Calculator page slots
  CALCULATOR_SIDEBAR: "1234567892",
  CALCULATOR_RESULTS: "1234567893",
  CALCULATOR_FOOTER: "1234567894",
  
  // Category page slots
  CATEGORY_HEADER: "1234567895",
  CATEGORY_GRID: "1234567896",
  
  // Mobile-specific slots
  MOBILE_BANNER: "1234567897",
  MOBILE_INTERSTITIAL: "1234567898",
  
  // Content slots
  IN_CONTENT: "1234567899",
  SIDEBAR_RECTANGLE: "1234567900",
} as const;

// Ad placement configurations with SEO considerations
export const AD_PLACEMENTS = {
  // Non-intrusive placements that don't hurt UX
  SAFE_PLACEMENTS: [
    'HOMEPAGE_CATEGORY',
    'CALCULATOR_SIDEBAR',
    'CATEGORY_GRID',
    'SIDEBAR_RECTANGLE'
  ],
  
  // Placements that need careful implementation
  CONTENT_PLACEMENTS: [
    'IN_CONTENT',
    'CALCULATOR_RESULTS',
    'CATEGORY_HEADER'
  ],
  
  // Mobile-optimized placements
  MOBILE_PLACEMENTS: [
    'MOBILE_BANNER',
    'CALCULATOR_FOOTER'
  ]
} as const;

// Performance optimization settings
export const AD_SETTINGS = {
  // Lazy load ads below the fold
  ENABLE_LAZY_LOADING: true,
  
  // Respect user preferences
  RESPECT_REDUCED_MOTION: true,
  
  // Auto ads configuration (use with caution for SEO)
  AUTO_ADS_ENABLED: false,
  
  // Page-level ads configuration
  PAGE_LEVEL_ADS: {
    enabled: true,
    // Only show page-level ads on certain pages
    allowedPages: ['/calculadoras/'],
    excludedPages: ['/sobre', '/privacidade', '/termos-de-uso']
  }
} as const;

// Helper function to check if ads should be shown on current page
export const shouldShowAds = (pathname: string): boolean => {
  if (!isAdSenseEnabled()) return false;
  
  const { PAGE_LEVEL_ADS } = AD_SETTINGS;
  
  // Check if page is explicitly excluded
  if (PAGE_LEVEL_ADS.excludedPages.some(page => pathname.includes(page))) {
    return false;
  }
  
  // Check if page is in allowed pages (if allowedPages is defined)
  if (PAGE_LEVEL_ADS.allowedPages.length > 0) {
    return PAGE_LEVEL_ADS.allowedPages.some(page => pathname.includes(page));
  }
  
  return true;
};

// Helper function to get optimal ad slot for page type
export const getOptimalAdSlot = (pageType: 'homepage' | 'calculator' | 'category', placement: 'header' | 'sidebar' | 'footer' | 'content'): string => {
  const slotMap = {
    homepage: {
      header: AD_SLOTS.HOMEPAGE_HERO,
      sidebar: AD_SLOTS.SIDEBAR_RECTANGLE,
      footer: AD_SLOTS.HOMEPAGE_CATEGORY,
      content: AD_SLOTS.IN_CONTENT
    },
    calculator: {
      header: AD_SLOTS.CALCULATOR_SIDEBAR,
      sidebar: AD_SLOTS.CALCULATOR_SIDEBAR,
      footer: AD_SLOTS.CALCULATOR_FOOTER,
      content: AD_SLOTS.CALCULATOR_RESULTS
    },
    category: {
      header: AD_SLOTS.CATEGORY_HEADER,
      sidebar: AD_SLOTS.SIDEBAR_RECTANGLE,
      footer: AD_SLOTS.CATEGORY_GRID,
      content: AD_SLOTS.IN_CONTENT
    }
  };
  
  return slotMap[pageType]?.[placement] || AD_SLOTS.IN_CONTENT;
};

// SEO-friendly ad loading strategy
export const initializeAdSense = () => {
  if (!isAdSenseEnabled()) return;
  
  // Wait for page to be fully loaded before initializing ads
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      loadAdSenseScript();
    });
  } else {
    loadAdSenseScript();
  }
};

const loadAdSenseScript = () => {
  // Check if script is already loaded
  if (document.querySelector('script[src*="pagead2.googlesyndication.com"]')) {
    return;
  }
  
  const script = document.createElement('script');
  script.async = true;
  script.crossOrigin = 'anonymous';
  script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${getAdSenseClientId()}`;
  
  script.onerror = () => {
    console.warn('Failed to load AdSense script');
  };
  
  document.head.appendChild(script);
};

// Types for TypeScript support
export type AdSlot = keyof typeof AD_SLOTS;
export type PageType = 'homepage' | 'calculator' | 'category';
export type AdPlacement = 'header' | 'sidebar' | 'footer' | 'content';