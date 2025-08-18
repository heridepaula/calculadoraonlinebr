import { useEffect } from 'react';

interface AdSenseProps {
  adSlot: string;
  adFormat?: 'auto' | 'fluid' | 'rectangle' | 'vertical' | 'horizontal';
  adStyle?: React.CSSProperties;
  className?: string;
  responsive?: boolean;
}

declare global {
  interface Window {
    adsbygoogle: any[];
  }
}

export const AdSense: React.FC<AdSenseProps> = ({
  adSlot,
  adFormat = 'auto',
  adStyle = { display: 'block' },
  className = '',
  responsive = true,
}) => {
  useEffect(() => {
    try {
      // Only run in production and if AdSense is available
      if (typeof window !== 'undefined' && window.adsbygoogle && process.env.NODE_ENV === 'production') {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      }
    } catch (error) {
      console.error('AdSense error:', error);
    }
  }, []);

  // Don't render ads in development
  if (process.env.NODE_ENV !== 'production') {
    return (
      <div 
        className={`bg-neutral-surface-variant border border-light rounded-lg p-4 text-center ${className}`}
        style={adStyle}
      >
        <div className="text-text-secondary text-sm">
          📢 Anúncio (apenas em produção)
        </div>
      </div>
    );
  }

  return (
    <div className={className}>
      <ins
        className="adsbygoogle"
        style={adStyle}
        data-ad-client="ca-pub-1778632581161801"
        data-ad-slot={adSlot}
        data-ad-format={adFormat}
        data-full-width-responsive={responsive ? 'true' : 'false'}
      />
    </div>
  );
};

// Pre-configured ad components for common placements
export const HeaderAd: React.FC<{ className?: string }> = ({ className }) => (
  <AdSense
    adSlot="1234567890" // Substitua pelo slot real do Google AdSense
    adFormat="horizontal"
    className={`mb-6 ${className}`}
    adStyle={{ display: 'block', height: '90px' }}
  />
);

export const SidebarAd: React.FC<{ className?: string }> = ({ className }) => (
  <AdSense
    adSlot="1234567891" // Substitua pelo slot real do Google AdSense
    adFormat="vertical"
    className={`sticky top-8 ${className}`}
    adStyle={{ display: 'block', width: '300px', height: '250px' }}
  />
);

export const InContentAd: React.FC<{ className?: string }> = ({ className }) => (
  <AdSense
    adSlot="1234567892" // Substitua pelo slot real do Google AdSense
    adFormat="fluid"
    className={`my-8 ${className}`}
    adStyle={{ display: 'block' }}
  />
);

export const FooterAd: React.FC<{ className?: string }> = ({ className }) => (
  <AdSense
    adSlot="1234567893" // Substitua pelo slot real do Google AdSense
    adFormat="horizontal"
    className={`mt-6 ${className}`}
    adStyle={{ display: 'block', height: '90px' }}
  />
);

// Responsive ad component with breakpoint-specific behavior
export const ResponsiveAd: React.FC<{ 
  mobileSlot: string;
  desktopSlot: string;
  className?: string;
}> = ({ mobileSlot, desktopSlot, className }) => {
  return (
    <>
      {/* Mobile Ad */}
      <div className={`block md:hidden ${className}`}>
        <AdSense
          adSlot={mobileSlot}
          adFormat="auto"
          adStyle={{ display: 'block' }}
        />
      </div>
      
      {/* Desktop Ad */}
      <div className={`hidden md:block ${className}`}>
        <AdSense
          adSlot={desktopSlot}
          adFormat="auto"
          adStyle={{ display: 'block' }}
        />
      </div>
    </>
  );
};