import React, { Component, ErrorInfo, ReactNode } from "react";
import { track } from "@vercel/analytics";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class GlobalErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Track error to Vercel Analytics
    track("react_error_boundary", {
      error_message: error.message,
      error_stack: error.stack?.slice(0, 500) || "no_stack", // Limit stack trace
      component_stack: errorInfo.componentStack?.slice(0, 500) || "no_component_stack",
      error_name: error.name,
      path: typeof window !== "undefined" ? window.location.pathname : "unknown",
      timestamp: new Date().toISOString()
    });

    // Also log to console in development
    if (process.env.NODE_ENV === "development") {
      console.error("Error caught by boundary:", error, errorInfo);
    }
  }

  render() {
    if (this.state.hasError) {
      // Custom fallback UI
      if (this.props.fallback) {
        return this.props.fallback;
      }

      // Default fallback UI
      return (
        <div className="min-h-screen flex items-center justify-center bg-background-dark">
          <div className="max-w-md w-full mx-4">
            <div className="bg-card-bg rounded-lg p-8 border border-light text-center">
              <div className="text-6xl mb-4">⚠️</div>
              <h1 className="text-xl font-bold text-text-primary mb-4">
                Oops! Algo deu errado
              </h1>
              <p className="text-text-secondary mb-6">
                Ocorreu um erro inesperado. Nossa equipe foi notificada e está trabalhando para resolver.
              </p>
              <button
                onClick={() => {
                  this.setState({ hasError: false });
                  window.location.reload();
                }}
                className="bg-primary-blue hover:bg-primary-blue-dark text-white px-6 py-3 rounded-lg font-medium transition-colors"
              >
                Tentar Novamente
              </button>
              <div className="mt-4">
                <a
                  href="/"
                  className="text-primary-blue hover:underline text-sm"
                >
                  Voltar para a página inicial
                </a>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

// Hook para reportar erros manualmente
export const useErrorReporting = () => {
  const reportError = (error: Error | string, context?: string) => {
    const errorMessage = typeof error === "string" ? error : error.message;
    const errorStack = typeof error === "string" ? undefined : error.stack;

    track("manual_error_report", {
      error_message: errorMessage,
      error_stack: errorStack?.slice(0, 500) || "no_stack",
      context: context || "manual_report",
      path: typeof window !== "undefined" ? window.location.pathname : "unknown",
      timestamp: new Date().toISOString()
    });
  };

  return { reportError };
};