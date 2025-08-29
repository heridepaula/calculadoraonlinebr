import { useState, useEffect } from "react";
import { Button } from "./ui";

interface CookieConsentProps {
  onAccept?: () => void;
  onDecline?: () => void;
}

export function CookieConsent({ onAccept, onDecline }: CookieConsentProps) {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    // Verificar se já foi feita uma escolha
    const hasConsent = localStorage.getItem('cookie-consent');
    if (!hasConsent) {
      setShowBanner(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookie-consent', 'accepted');
    setShowBanner(false);
    onAccept?.();
  };

  const handleDecline = () => {
    localStorage.setItem('cookie-consent', 'declined');
    setShowBanner(false);
    onDecline?.();
  };

  if (!showBanner) {
    return null;
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-gray-900/95 backdrop-blur-sm border-t border-gray-700 p-4 shadow-lg">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <div className="flex-1">
          <p className="text-sm text-gray-200">
            🍪 <strong>Este site usa cookies essenciais</strong> para funcionalidade básica e analytics anônimos. 
            Não usamos cookies de rastreamento ou publicidade. Seus dados são processados conforme nossa{" "}
            <a 
              href="/privacidade" 
              className="text-primary-blue-dark underline hover:text-primary-blue"
              target="_blank"
              rel="noopener noreferrer"
            >
              Política de Privacidade
            </a>.
          </p>
        </div>
        <div className="flex gap-3">
          <Button 
            variant="outline" 
            size="sm"
            onClick={handleDecline}
            className="bg-transparent border-gray-600 text-gray-300 hover:bg-gray-800"
          >
            Apenas Essenciais
          </Button>
          <Button 
            size="sm"
            onClick={handleAccept}
            className="bg-primary-blue-dark hover:bg-primary-blue text-white"
          >
            Aceitar Todos
          </Button>
        </div>
      </div>
    </div>
  );
}

// Hook para verificar o status do consentimento
export function useCookieConsent() {
  const [hasConsent, setHasConsent] = useState<boolean | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const consent = localStorage.getItem('cookie-consent');
      setHasConsent(consent === 'accepted');
    }
  }, []);

  return hasConsent;
}

// Função para verificar se deve carregar analytics
export function shouldLoadAnalytics(): boolean {
  if (typeof window === 'undefined') return false;
  
  const consent = localStorage.getItem('cookie-consent');
  return consent === 'accepted';
}