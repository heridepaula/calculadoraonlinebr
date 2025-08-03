"use client";

import React, { useEffect } from 'react';

const CriticalResourceLoader: React.FC = () => {
  useEffect(() => {
    // Preload only critical images for above-the-fold content
    const criticalImages = [
      '/images/cards/juros-compostos.webp',
      '/images/cards/lci-lca.webp',
      '/images/cards/calculadora-cdb.webp'
    ];

    // Use requestIdleCallback to load resources when browser is idle
    if ('requestIdleCallback' in window) {
      window.requestIdleCallback(() => {
        criticalImages.forEach(src => {
          const link = document.createElement('link');
          link.rel = 'preload';
          link.as = 'image';
          link.href = src;
          document.head.appendChild(link);
        });
      });
    } else {
      // Fallback for browsers without requestIdleCallback
      setTimeout(() => {
        criticalImages.forEach(src => {
          const img = new Image();
          img.src = src;
        });
      }, 100);
    }
  }, []);

  return null;
};

export default CriticalResourceLoader;