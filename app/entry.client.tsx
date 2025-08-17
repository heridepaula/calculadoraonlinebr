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
        if (error.message?.includes("Extra attributes from the server")) {
          return;
        }
        console.warn("Hydration error recovered:", error);
      },
    }
  );
});
