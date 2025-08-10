import { createContext, useContext, useLayoutEffect } from "react";
import type { ReactNode } from "react";

// Theme types - fixed to dark only
export type ResolvedTheme = "dark";

interface ThemeContextType {
  resolvedTheme: ResolvedTheme;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Use useLayoutEffect on client
const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : () => {};

export function ThemeProvider({ children }: { children: ReactNode }) {
  // Apply dark theme immediately after DOM is available
  useIsomorphicLayoutEffect(() => {
    // Apply dark theme to document
    const root = document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add("dark");

    // Update meta theme-color to dark theme color
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (metaThemeColor) {
      metaThemeColor.setAttribute("content", "#64B5F6");
    }
  }, []);

  return (
    <ThemeContext.Provider value={{ resolvedTheme: "dark" }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}

