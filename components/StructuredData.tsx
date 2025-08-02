"use client";

import { usePathname } from 'next/navigation';

interface StructuredDataProps {
  type?: 'website' | 'calculator' | 'tool';
  title?: string;
  description?: string;
  url?: string;
}

const StructuredData: React.FC<StructuredDataProps> = ({ 
  type = 'website', 
  title = 'Calculadora Online BR',
  description = 'Ferramentas de cálculo online gratuitas',
  url
}) => {
  const pathname = usePathname();
  const currentUrl = url || `https://calculadoraonlinebr.com.br${pathname}`;

  const getStructuredData = () => {
    const baseData = {
      "@context": "https://schema.org",
      "@type": type === 'calculator' || type === 'tool' ? "WebApplication" : "WebSite",
      "name": title,
      "description": description,
      "url": currentUrl,
      "publisher": {
        "@type": "Organization",
        "name": "Calculadora Online BR",
        "url": "https://calculadoraonlinebr.com.br",
        "logo": {
          "@type": "ImageObject",
          "url": "https://calculadoraonlinebr.com.br/images/logo-header.webp"
        }
      },
      "inLanguage": "pt-BR",
      "potentialAction": {
        "@type": "SearchAction",
        "target": {
          "@type": "EntryPoint",
          "urlTemplate": "https://calculadoraonlinebr.com.br/?q={search_term_string}"
        },
        "query-input": "required name=search_term_string"
      }
    };

    if (type === 'calculator' || type === 'tool') {
      return {
        ...baseData,
        "@type": "WebApplication",
        "applicationCategory": "UtilitiesApplication",
        "operatingSystem": "Any",
        "browserRequirements": "Modern Web Browser",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "BRL"
        },
        "featureList": [
          "Calculadora gratuita",
          "Interface amigável",
          "Resultados precisos",
          "Acesso instantâneo"
        ]
      };
    }

    return baseData;
  };

  const structuredData = getStructuredData();

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(structuredData, null, 2),
      }}
    />
  );
};

export default StructuredData;