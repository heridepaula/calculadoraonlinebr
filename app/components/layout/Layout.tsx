import { ReactNode } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { SkipLink } from "../ui/SkipLink";

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      <SkipLink />
      <Header />
      <main
        id="main-content"
        className="mx-auto w-full max-w-7xl flex-1 px-4 py-6 sm:px-6 sm:py-8 lg:px-8"
        role="main"
        aria-label="Conteúdo principal"
      >
        {children}
      </main>
      <Footer />
    </div>
  );
};
