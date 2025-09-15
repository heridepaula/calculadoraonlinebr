import { useEffect, useState } from "react";

/**
 * Componente para detectar e reportar problemas de carregamento de CSS
 * Monitora se os estilos Tailwind estão sendo aplicados corretamente
 */
export function CSSLoadingDetector() {
  const [cssLoaded, setCSSLoaded] = useState(true);

  useEffect(() => {
    // Verificar se o CSS do Tailwind carregou corretamente
    const checkCSSLoaded = () => {
      try {
        // Criar elemento de teste com classe Tailwind
        const testElement = document.createElement("div");
        testElement.className = "bg-primary-blue text-white opacity-0 absolute -top-full";
        testElement.style.cssText = "position: absolute; top: -9999px; left: -9999px;";

        document.body.appendChild(testElement);

        // Verificar se os estilos foram aplicados
        const computedStyle = window.getComputedStyle(testElement);
        const hasCorrectBackground = computedStyle.backgroundColor !== "rgba(0, 0, 0, 0)" && computedStyle.backgroundColor !== "";
        const hasCorrectColor = computedStyle.color !== "rgba(0, 0, 0, 0)" && computedStyle.color !== "";

        // Limpar elemento de teste
        document.body.removeChild(testElement);

        // Se os estilos não foram aplicados, CSS não carregou
        if (!hasCorrectBackground && !hasCorrectColor) {
          setCSSLoaded(false);

          // Log para debugging
          console.warn("🎨 CSS Loading Issue Detected:", {
            backgroundColor: computedStyle.backgroundColor,
            color: computedStyle.color,
            userAgent: navigator.userAgent,
            timestamp: new Date().toISOString(),
            url: window.location.href
          });

          // Tentar recarregar CSS
          const links = document.querySelectorAll('link[rel="stylesheet"]');
          links.forEach(link => {
            if (link instanceof HTMLLinkElement) {
              const newLink = link.cloneNode(true) as HTMLLinkElement;
              newLink.href = link.href + (link.href.includes('?') ? '&' : '?') + 'v=' + Date.now();
              link.parentNode?.insertBefore(newLink, link.nextSibling);
              setTimeout(() => link.remove(), 100);
            }
          });

          // Recarregar página em último caso após delay
          setTimeout(() => {
            if (!document.querySelector('.bg-primary-blue')) {
              console.warn("🔄 Reloading page due to CSS loading failure");
              window.location.reload();
            }
          }, 2000);
        }
      } catch (error) {
        console.error("Error checking CSS loading:", error);
      }
    };

    // Verificar após DOM carregar completamente
    if (document.readyState === 'complete') {
      setTimeout(checkCSSLoaded, 100);
    } else {
      window.addEventListener('load', () => setTimeout(checkCSSLoaded, 100));
    }
  }, []);

  // Se CSS não carregou, mostrar aviso
  if (!cssLoaded) {
    return (
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          background: '#ff4444',
          color: 'white',
          padding: '8px',
          textAlign: 'center',
          fontSize: '14px',
          zIndex: 9999,
          fontFamily: 'Arial, sans-serif'
        }}
      >
        ⚠️ Problema detectado no carregamento do CSS. Recarregando automaticamente...
      </div>
    );
  }

  return null;
}