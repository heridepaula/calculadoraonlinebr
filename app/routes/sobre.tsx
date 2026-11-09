import type { MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";
import { CALCULATORS, CATEGORIES } from "~/lib/constants";
import { buildPageMeta } from "~/lib/page-meta";

export const meta: MetaFunction = () => {
  return [
    ...buildPageMeta({
      title: "Sobre",
      description:
        "Conheça a CalculadoraOnlineBR: calculadoras grátis de finanças, direitos trabalhistas, saúde e matemática, com metodologia e fontes oficiais citadas.",
      path: "/sobre",
    }),
  ];
};

export default function Sobre() {
  return (
    <div className="mx-auto max-w-4xl space-y-8">
      <section className="py-12 text-center">
        <h1 className="mb-6 text-4xl font-bold text-text-primary md:text-5xl">
          Sobre a CalculadoraOnlineBR
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
        <p className="text-text-secondary-dark">
          São {CALCULATORS.length} calculadoras gratuitas, organizadas em {CATEGORIES.length}{" "}
          categorias:
        </p>

        <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {CATEGORIES.map((category) => {
            const count = CALCULATORS.filter((c) => c.category === category.id).length;
            return (
              <li key={category.id}>
                <Link
                  to={category.path}
                  className="flex h-full gap-3 rounded-lg border border-neutral-surface-variant bg-background-dark-secondary p-4 transition-colors hover:border-primary-blue"
                >
                  <span className="text-3xl" aria-hidden="true">
                    {category.icon}
                  </span>
                  <span>
                    <span className="block font-semibold text-text-primary">
                      {category.name}{" "}
                      <span className="text-sm font-normal text-text-secondary">({count})</span>
                    </span>
                    <span className="mt-1 block text-sm text-text-secondary">
                      {category.description}
                    </span>
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </section>

      <section id="metodologia" className="scroll-mt-24 rounded-lg bg-neutral-surface p-8">
        <h2 className="mb-6 text-2xl font-bold text-text-primary-dark">
          Metodologia: Como Calculamos e Revisamos
        </h2>
        <div className="space-y-4 text-text-secondary-dark">
          <p>
            Cada calculadora parte de uma fonte primária: a lei ou norma que define a regra (CLT,
            leis do 13º salário e do FGTS, legislação do INSS e do Imposto de Renda), as tabelas
            publicadas pela Receita Federal e pelo INSS, os dados do Banco Central e do Tesouro
            Nacional, ou as referências de órgãos de saúde, como a Organização Mundial da Saúde.
          </p>
          <ul className="ml-4 list-disc space-y-2">
            <li>
              <strong className="text-text-primary-dark">Fontes citadas na página:</strong> as
              calculadoras trabalhistas e financeiras mostram a legislação usada no bloco
              &ldquo;Fontes e Atualização&rdquo;, com links para o texto oficial.
            </li>
            <li>
              <strong className="text-text-primary-dark">Tabelas anuais:</strong> INSS, Imposto de
              Renda e salário mínimo mudam todo ano. As tabelas são revisadas em janeiro, ou quando
              uma nova lei muda a regra no meio do ano.
            </li>
            <li>
              <strong className="text-text-primary-dark">Indicadores de mercado:</strong> Selic,
              CDI, IPCA, poupança e títulos do Tesouro Direto são atualizados automaticamente uma
              vez por dia, a partir do Banco Central e do Tesouro Transparente.
            </li>
            <li>
              <strong className="text-text-primary-dark">Conferência dos resultados:</strong> ao
              criar ou atualizar uma calculadora, comparamos os resultados com os exemplos e os
              valores-limite publicados pelos órgãos oficiais, como o teto do INSS e as faixas do
              Imposto de Renda.
            </li>
            <li>
              <strong className="text-text-primary-dark">Data de atualização:</strong> as páginas
              revisadas mostram quando o conteúdo e as tabelas foram conferidos pela última vez.
            </li>
          </ul>
          <p>
            Encontrou um valor diferente do seu holerite, do extrato ou de uma fonte oficial?
            Escreva para{" "}
            <a
              href="mailto:contato@calculadoraonlinebr.com.br"
              className="font-medium text-primary-blue underline hover:text-primary-blue-dark"
            >
              contato@calculadoraonlinebr.com.br
            </a>{" "}
            com o exemplo. As correções são feitas na própria calculadora, e a data de atualização
            da página muda.
          </p>
        </div>
      </section>

      <section className="rounded-lg bg-neutral-surface p-8">
        <h2 className="mb-6 text-2xl font-bold text-text-primary-dark">
          Por que Escolher a CalculadoraOnlineBR?
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
                <h3 className="font-semibold text-text-primary-dark">Resultados Confiáveis</h3>
                <p className="text-sm text-text-secondary-dark">
                  Cálculos baseados na legislação e em tabelas oficiais, com as fontes citadas.
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

      <section className="rounded-lg bg-neutral-surface p-8">
        <h2 className="mb-6 text-2xl font-bold text-text-primary-dark">Entre em Contato</h2>
        <div className="space-y-4">
          <p className="text-text-secondary-dark">
            Tem alguma dúvida, sugestão ou precisa de ajuda com nossas calculadoras? Entre em
            contato conosco!
          </p>

          <div className="flex flex-col space-y-4 sm:flex-row sm:space-x-8 sm:space-y-0">
            <div className="flex items-center space-x-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-blue">
                <span className="text-white" role="img" aria-label="Email">
                  ✉️
                </span>
              </div>
              <div>
                <h3 className="font-semibold text-text-primary-dark">Email</h3>
                <a
                  href="mailto:contato@calculadoraonlinebr.com.br"
                  className="text-primary-blue hover:text-primary-blue-dark hover:underline"
                >
                  contato@calculadoraonlinebr.com.br
                </a>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-growth-green">
                <span className="text-white" role="img" aria-label="Suporte">
                  🤝
                </span>
              </div>
              <div>
                <h3 className="font-semibold text-text-primary-dark">Suporte</h3>
                <p className="text-sm text-text-secondary-dark">Resposta em até 24 horas</p>
              </div>
            </div>
          </div>

          <div className="mt-6 rounded-lg bg-primary-blue-light p-4">
            <p className="text-sm text-text-secondary-dark">
              <strong>Horário de atendimento:</strong> Segunda a sexta, das 9h às 18h (horário de
              Brasília). Responderemos seu email o mais rápido possível!
            </p>
          </div>
        </div>
      </section>

      <section className="rounded-lg border-2 border-amber-200 bg-amber-50 p-8">
        <div className="mb-4 flex items-center space-x-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-amber-500">
            <span className="text-2xl text-white" role="img" aria-label="Aviso">
              ⚠️
            </span>
          </div>
          <h2 className="text-2xl font-bold text-amber-900">
            Importante - Isenção de Responsabilidade
          </h2>
        </div>

        <div className="space-y-4 text-amber-800">
          <p className="font-semibold">
            As calculadoras disponibilizadas neste site são ferramentas de apoio e têm caráter
            educativo e informativo.
          </p>

          <ul className="ml-4 list-disc space-y-2">
            <li>
              <strong>Estimativas e Aproximações:</strong> Os resultados obtidos são estimativas
              baseadas nos dados fornecidos e não devem ser considerados como valores absolutos ou
              definitivos.
            </li>
            <li>
              <strong>Decisões Financeiras:</strong> Para decisões financeiras importantes, consulte
              sempre um profissional qualificado (contador, consultor financeiro, etc.).
            </li>
            <li>
              <strong>Questões de Saúde:</strong> Para questões relacionadas à saúde, procure
              orientação de um profissional médico qualificado.
            </li>
            <li>
              <strong>Responsabilidade Limitada:</strong> Não nos responsabilizamos por perdas,
              danos ou consequências decorrentes do uso das informações e resultados fornecidos
              pelas calculadoras.
            </li>
            <li>
              <strong>Exatidão dos Dados:</strong> A exatidão dos resultados depende da veracidade e
              exatidão dos dados inseridos pelo usuário.
            </li>
          </ul>

          <div className="mt-6 rounded-lg border border-amber-300 bg-amber-100 p-4">
            <p className="text-sm font-medium text-amber-900">
              <strong>Recomendação:</strong> Use nossas ferramentas como ponto de partida para seus
              cálculos e planejamentos, mas sempre busque orientação profissional especializada para
              decisões importantes em sua vida financeira, de saúde ou acadêmica.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
