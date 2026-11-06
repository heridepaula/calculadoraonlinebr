import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/{**,.client,.server}/**/*.{js,jsx,ts,tsx}"],
  corePlugins: {
    preflight: true,
  },
  theme: {
    screens: {
      xs: "320px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
    extend: {
      fontFamily: {
        sans: [
          "Manrope",
          "ui-sans-serif",
          "system-ui",
          "sans-serif",
          "Apple Color Emoji",
          "Segoe UI Emoji",
          "Segoe UI Symbol",
          "Noto Color Emoji",
        ],
        display: [
          "Instrument Serif",
          "Georgia",
          "ui-serif",
          "serif",
        ],
        mono: [
          "JetBrains Mono",
          "ui-monospace",
          "monospace",
        ],
        // Keep "inter" alias for legacy callers (now resolves to Manrope)
        inter: ["Manrope", "sans-serif"],
      },
      colors: {
        // Cor da loteria atual (variáveis em colors.css: .theme-lotofacil, .theme-megasena)
        lot: {
          50: "rgb(var(--lot-50) / <alpha-value>)",
          100: "rgb(var(--lot-100) / <alpha-value>)",
          200: "rgb(var(--lot-200) / <alpha-value>)",
          300: "rgb(var(--lot-300) / <alpha-value>)",
          400: "rgb(var(--lot-400) / <alpha-value>)",
          500: "rgb(var(--lot-500) / <alpha-value>)",
          600: "rgb(var(--lot-600) / <alpha-value>)",
          700: "rgb(var(--lot-700) / <alpha-value>)",
          800: "rgb(var(--lot-800) / <alpha-value>)",
          900: "rgb(var(--lot-900) / <alpha-value>)",
        },
        // Dark Theme Only - Financial & Growth Palette
        "primary-blue": "#64B5F6",
        "primary-blue-light": "#1A2332",
        "primary-blue-dark": "#64B5F6",
        "growth-green": "#81C784",
        "growth-green-soft": "#1B2A1F",
        "growth-green-dark": "#66BB6A",
        "neutral-surface": "#1E1E1E",
        "neutral-surface-variant": "#242424",
        "neutral-surface-dark": "#2C2C2C",
        "card-bg": "#404040",
        "background-dark": "#121212",
        "background-dark-secondary": "#1E1E1E",
        "text-primary": "#FFFFFF",
        "text-secondary": "#B3B3B3",
        "text-primary-dark": "#FFFFFF",
        "text-secondary-dark": "#B3B3B3",
        "system-error": "#EF5350",
        "system-error-dark": "#EF5350",
        "system-warning": "#FFB74D",
        "system-warning-dark": "#FFB74D",
        "system-success": "#66BB6A",
        "system-success-dark": "#66BB6A",
        "system-info": "#42A5F5",
        "system-info-dark": "#42A5F5",
        light: "rgba(255, 255, 255, 0.1)",
        // Category-specific colors
        "health-red": "#E57373",
        "health-red-dark": "#F44336",
        "health-red-light": "#2A1515",
        "finance-gold": "#FFD54F",
        "finance-gold-dark": "#FFC107",
        "finance-gold-light": "#2A2315",
        "math-purple": "#BA68C8",
        "math-purple-dark": "#9C27B0",
        "math-purple-light": "#251A2A",
      },
      spacing: {
        "18": "4.5rem",
        "88": "22rem",
      },
      minHeight: {
        "44": "44px",
        "36": "36px",
        "52": "52px",
      },
      minWidth: {
        "44": "44px",
        "36": "36px",
      },
      fontSize: {
        "2xs": ["0.625rem", { lineHeight: "0.75rem" }],
      },
      animation: {
        "fade-in": "fadeIn 0.3s ease-in-out",
        "slide-up": "slideUp 0.3s ease-out",
        "feed-in": "feedIn 0.5s cubic-bezier(0.22, 1, 0.36, 1) both",
        "ball-pop": "ballPop 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) both",
        "feed-flash": "feedFlash 2.4s ease-out both",
        "feed-out": "feedOut 0.45s ease-in both",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { transform: "translateY(10px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        // Feed de jogos (fila): o novo entra por baixo, dezenas "estouram", brilho se apaga; o mais antigo sai por cima.
        feedIn: {
          "0%": { transform: "translateY(16px) scale(0.97)", opacity: "0" },
          "100%": { transform: "translateY(0) scale(1)", opacity: "1" },
        },
        ballPop: {
          "0%": { transform: "scale(0)", opacity: "0" },
          "70%": { transform: "scale(1.18)", opacity: "1" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
        feedFlash: {
          "0%": { boxShadow: "0 0 0 2px rgb(var(--lot-500) / 0.9), 0 0 24px rgb(var(--lot-500) / 0.45)" },
          "100%": { boxShadow: "0 0 0 1px rgb(var(--lot-500) / 0), 0 0 0 rgb(var(--lot-500) / 0)" },
        },
        feedOut: {
          "0%": { transform: "translateY(0)", opacity: "1" },
          "100%": { transform: "translateY(-14px) scale(0.96)", opacity: "0" },
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
