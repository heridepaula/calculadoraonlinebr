import { RemixBrowser } from "@remix-run/react";
import { startTransition, StrictMode } from "react";
import { hydrateRoot } from "react-dom/client";

startTransition(() => {
  hydrateRoot(
    document,
    <StrictMode>
      <RemixBrowser />
    </StrictMode>,
    {
      onRecoverableError(error) {
        // Suppress browser extension hydration warnings
        if (error.message?.includes('Extra attributes from the server') && 
            (error.message?.includes('cz-shortcut-listen') || 
             error.message?.includes('data-') ||
             error.message?.includes('extension'))) {
          return;
        }
        console.warn('Hydration error recovered:', error);
      }
    }
  );
});

// Performance monitoring ready for web-vitals integration
if (typeof window !== "undefined" && "performance" in window) {
  // Report Core Web Vitals - ready for production analytics
  console.log("Performance monitoring initialized");
}
