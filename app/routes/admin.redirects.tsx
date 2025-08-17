import type { MetaFunction } from "@remix-run/node";
import { LEGACY_REDIRECTS } from "~/utils/redirects";

export const meta: MetaFunction = () => {
  return [{ title: "Redirects - Admin" }, { name: "robots", content: "noindex,nofollow" }];
};

export default function AdminRedirects() {
  const redirectEntries = Object.entries(LEGACY_REDIRECTS);
  const redirectsByCategory = {
    financas: redirectEntries.filter(([_, to]) => to.includes("/financas/")),
    saude: redirectEntries.filter(([_, to]) => to.includes("/saude/")),
    matematica: redirectEntries.filter(([_, to]) => to.includes("/matematica/")),
    trabalhista: redirectEntries.filter(([_, to]) => to.includes("/trabalhista/")),
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-6 text-3xl font-bold">Mapeamento de Redirects</h1>
      <p className="mb-8 text-gray-600">
        Total de redirects configurados: <strong>{redirectEntries.length}</strong>
      </p>

      {Object.entries(redirectsByCategory).map(([category, redirects]) => (
        <div key={category} className="mb-8">
          <h2 className="mb-4 text-2xl font-semibold capitalize">
            {category} ({redirects.length} redirects)
          </h2>
          <div className="rounded-lg bg-gray-50 p-4">
            <div className="grid gap-2">
              {redirects.map(([from, to]) => (
                <div
                  key={from}
                  className="flex items-center justify-between rounded border bg-white p-2"
                >
                  <div className="flex items-center space-x-4">
                    <span className="font-mono text-sm text-red-600">{from}</span>
                    <span className="text-gray-400">→</span>
                    <span className="font-mono text-sm text-green-600">{to}</span>
                  </div>
                  <div className="flex space-x-2">
                    <a
                      href={from}
                      className="text-sm text-blue-600 hover:underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Testar
                    </a>
                    <a
                      href={to}
                      className="text-sm text-green-600 hover:underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Destino
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}

      <div className="mt-12 rounded-lg bg-blue-50 p-4">
        <h3 className="mb-2 text-lg font-semibold">Informações Técnicas</h3>
        <ul className="space-y-1 text-sm">
          <li>• Todos os redirects usam status HTTP 301 (Moved Permanently)</li>
          <li>• URLs antigas estão marcadas como Disallow no robots.txt</li>
          <li>• Estrutura de dados Schema.org incluída nos redirects</li>
          <li>• Preservação de autoridade de domínio e link juice</li>
        </ul>
      </div>
    </div>
  );
}
