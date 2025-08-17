import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { title: "Sobre - Calculadora Online BR" },
    {
      name: "description",
      content:
        "Conheça a Calculadora Online BR, plataforma gratuita com calculadoras de saúde, finanças e matemática com design moderno.",
    },
    {
      name: "keywords",
      content: "sobre, calculadora online br, ferramentas gratuitas, saúde, finanças, matemática",
    },
    { property: "og:title", content: "Sobre - Calculadora Online BR" },
    {
      property: "og:description",
      content: "Plataforma gratuita com calculadoras organizadas para facilitar seu dia a dia.",
    },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary" },
    { name: "twitter:title", content: "Sobre - Calculadora Online BR" },
    { name: "twitter:description", content: "Conheça nossa plataforma de calculadoras gratuitas." },
  ];
};

export default function Sobre() {
  return (
    <div className="mx-auto max-w-4xl space-y-8">
      <section className="py-12 text-center">
        <h1 className="mb-6 text-4xl font-bold text-text-primary md:text-5xl">
          Sobre a Calculadora Online BR
        </h1>
        <p className="mx-auto mb-8 max-w-3xl text-xl text-text-secondary-dark">
          Uma plataforma moderna e gratuita que oferece calculadoras organizadas por categoria para
          facilitar seu dia a dia
        </p>
      </section>

      <section className="rounded-lg bg-neutral-surface p-8">
        <h2 className="mb-6 text-2xl font-bold text-text-primary-dark">Nossa Missão</h2>
        <p className="mb-4 text-text-secondary-dark">
          Democratizar o acesso a ferramentas de cálculo essenciais, oferecendo uma plataforma
          gratuita, moderna e intuitiva que auxilia pessoas em suas decisões financeiras, cuidados
          com a saúde e resolução de problemas matemáticos do cotidiano.
        </p>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-text-primary-dark">O que Oferecemos</h2>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <div className="rounded-lg bg-primary-blue-light p-6">
            <div className="mb-4 text-center">
              <span className="text-4xl" role="img" aria-label="Saúde">
                🏥
              </span>
            </div>
            <h3 className="mb-3 text-xl font-semibold text-text-primary-dark">
              Calculadoras de Saúde
            </h3>
            <ul className="space-y-2 text-sm text-text-secondary-dark">
              <li>• Cálculo de IMC (Índice de Massa Corporal)</li>
              <li>• Percentual de Gordura Corporal</li>
              <li>• Ferramentas para acompanhamento da saúde</li>
            </ul>
          </div>

          <div className="bg-growth-green-light rounded-lg p-6">
            <div className="mb-4 text-center">
              <span className="text-4xl" role="img" aria-label="Finanças">
                💰
              </span>
            </div>
            <h3 className="mb-3 text-xl font-semibold text-text-primary-dark">
              Calculadoras Financeiras
            </h3>
            <ul className="space-y-2 text-sm text-text-secondary-dark">
              <li>• Cálculo de Juros Simples e Compostos</li>
              <li>• Simulador do Primeiro Milhão</li>
              <li>• Planejamento financeiro pessoal</li>
            </ul>
          </div>

          <div className="bg-system-info-light rounded-lg p-6">
            <div className="mb-4 text-center">
              <span className="text-4xl" role="img" aria-label="Matemática">
                🔢
              </span>
            </div>
            <h3 className="mb-3 text-xl font-semibold text-text-primary-dark">
              Calculadoras Matemáticas
            </h3>
            <ul className="space-y-2 text-sm text-text-secondary-dark">
              <li>• Cálculo de Porcentagem</li>
              <li>• Operações matemáticas básicas</li>
              <li>• Ferramentas para estudos e trabalho</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="rounded-lg bg-neutral-surface p-8">
        <h2 className="mb-6 text-2xl font-bold text-text-primary-dark">
          Por que Escolher a Calculadora Online BR?
        </h2>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-blue text-white">
                <span className="text-sm font-bold">✓</span>
              </div>
              <div>
                <h3 className="font-semibold text-text-primary-dark">100% Gratuito</h3>
                <p className="text-sm text-text-secondary-dark">
                  Todas as calculadoras são completamente gratuitas, sem limitações ou taxas
                  ocultas.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-growth-green text-white">
                <span className="text-sm font-bold">✓</span>
              </div>
              <div>
                <h3 className="font-semibold text-text-primary-dark">Interface Moderna</h3>
                <p className="text-sm text-text-secondary-dark">
                  Design responsivo e intuitivo que funciona perfeitamente em qualquer dispositivo.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-system-info text-white">
                <span className="text-sm font-bold">✓</span>
              </div>
              <div>
                <h3 className="font-semibold text-text-primary-dark">Resultados Precisos</h3>
                <p className="text-sm text-text-secondary-dark">
                  Algoritmos confiáveis que garantem cálculos precisos e resultados instantâneos.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-blue text-white">
                <span className="text-sm font-bold">✓</span>
              </div>
              <div>
                <h3 className="font-semibold text-text-primary-dark">Sem Cadastro</h3>
                <p className="text-sm text-text-secondary-dark">
                  Use todas as ferramentas imediatamente, sem necessidade de criar conta ou fornecer
                  dados pessoais.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-growth-green text-white">
                <span className="text-sm font-bold">✓</span>
              </div>
              <div>
                <h3 className="font-semibold text-text-primary-dark">Sempre Disponível</h3>
                <p className="text-sm text-text-secondary-dark">
                  Acesse as calculadoras 24/7, de qualquer lugar e a qualquer momento.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-system-info text-white">
                <span className="text-sm font-bold">✓</span>
              </div>
              <div>
                <h3 className="font-semibold text-text-primary-dark">Modo Escuro</h3>
                <p className="text-sm text-text-secondary-dark">
                  Interface moderna em tema escuro para melhor experiência visual e redução do
                  cansaço ocular.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="rounded-lg bg-primary-blue-light p-8 text-center">
        <h2 className="mb-4 text-2xl font-bold text-text-primary-dark">Nosso Compromisso</h2>
        <p className="mx-auto max-w-2xl text-text-secondary-dark">
          Estamos comprometidos em manter esta plataforma sempre gratuita, atualizada e com novas
          funcionalidades. Nosso objetivo é ser sua ferramenta de referência para cálculos do dia a
          dia, contribuindo para decisões mais informadas em sua vida pessoal e profissional.
        </p>
      </section>
    </div>
  );
}
