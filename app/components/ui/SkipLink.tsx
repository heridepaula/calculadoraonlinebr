export const SkipLink = () => {
  return (
    <a
      href="#main-content"
      className="sr-only rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
    >
      Pular para o conteúdo principal
    </a>
  );
};
