import type { MetaFunction } from "@remix-run/node";
import { APP_NAME } from "~/lib/constants";

export const meta: MetaFunction = () => {
  return [
    { title: `Política Privacidade | ${APP_NAME}` },
    {
      name: "description",
      content:
        "Política privacidade CalculadoraOnlineBR: como protegemos seus dados e garantimos sua privacidade. LGPD e segurança garantida.",
    },
    {
      name: "keywords",
      content: "política de privacidade, proteção de dados, CalculadoraOnlineBR, lgpd",
    },
    { property: "og:title", content: "Política de Privacidade - CalculadoraOnlineBR" },
    {
      property: "og:description",
      content: "Conheça nossa política de privacidade e como protegemos seus dados.",
    },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary" },
    { name: "twitter:title", content: "Política de Privacidade - CalculadoraOnlineBR" },
    { name: "twitter:description", content: "Nossa política de privacidade e proteção de dados." },
  ];
};

export default function Privacidade() {
  const lastUpdated = "31 de agosto de 2025";

  return (
    <div className="mx-auto max-w-4xl space-y-8">
      <section className="py-8 text-center">
        <h1 className="mb-4 text-4xl font-bold text-text-primary md:text-5xl">
          Política de Privacidade
        </h1>
        <p className="text-sm text-text-secondary-dark">Última atualização: {lastUpdated}</p>
      </section>

      <div className="space-y-8">
        <section className="rounded-lg bg-neutral-surface p-6">
          <h2 className="mb-4 text-2xl font-bold text-text-primary-dark">1. Introdução</h2>
          <p className="mb-4 text-text-secondary-dark">
            A CalculadoraOnlineBR está comprometida com a proteção da sua privacidade. Esta política
            descreve como coletamos, usamos e protegemos suas informações quando você utiliza nossos
            serviços.
          </p>
          <p className="text-text-secondary-dark">
            Nossa plataforma foi desenvolvida com foco na privacidade, minimizando a coleta de dados
            pessoais e garantindo que você possa usar nossas calculadoras de forma segura e privada.
          </p>
        </section>

        <section className="rounded-lg bg-neutral-surface p-6">
          <h2 className="mb-4 text-2xl font-bold text-text-primary-dark">2. Dados que Coletamos</h2>

          <h3 className="mb-3 text-lg font-semibold text-text-primary-dark">
            2.1 Dados que NÃO coletamos
          </h3>
          <div className="bg-growth-green-light mb-4 rounded-md p-4">
            <ul className="space-y-2 text-sm text-text-secondary-dark">
              <li>
                • <strong>Não exigimos cadastro ou login</strong>
              </li>
              <li>
                • <strong>Não coletamos informações pessoais</strong> (nome, email, telefone)
              </li>
              <li>
                • <strong>Não armazenamos dados dos cálculos</strong> que você realiza
              </li>
              <li>
                • <strong>Não usamos cookies de rastreamento</strong>
              </li>
              <li>
                • <strong>Não compartilhamos dados</strong> com terceiros para fins comerciais
              </li>
            </ul>
          </div>

          <h3 className="mb-3 text-lg font-semibold text-text-primary-dark">
            2.2 Dados técnicos básicos
          </h3>
          <p className="mb-2 text-text-secondary-dark">
            Para o funcionamento básico da plataforma, podemos coletar automaticamente:
          </p>
          <ul className="space-y-1 pl-4 text-sm text-text-secondary-dark">
            <li>• Endereço IP (para fins de segurança e prevenção de abuso)</li>
            <li>• Tipo de navegador e sistema operacional</li>
            <li>• Páginas visitadas e tempo de permanência</li>
            <li>• Dados de performance para melhorar o serviço</li>
          </ul>
        </section>

        <section className="rounded-lg bg-neutral-surface p-6">
          <h2 className="mb-4 text-2xl font-bold text-text-primary-dark">
            3. Como Usamos os Dados
          </h2>
          <p className="mb-4 text-text-secondary-dark">
            Os poucos dados técnicos que coletamos são utilizados exclusivamente para:
          </p>
          <ul className="space-y-2 pl-4 text-text-secondary-dark">
            <li>
              • <strong>Segurança:</strong> Proteger a plataforma contra ataques e uso indevido
            </li>
            <li>
              • <strong>Performance:</strong> Otimizar a velocidade e funcionamento das calculadoras
            </li>
            <li>
              • <strong>Melhorias:</strong> Entender quais calculadoras são mais utilizadas
            </li>
            <li>
              • <strong>Suporte técnico:</strong> Resolver problemas e bugs reportados
            </li>
          </ul>
        </section>

        <section className="rounded-lg bg-neutral-surface p-6">
          <h2 className="mb-4 text-2xl font-bold text-text-primary-dark">4. Armazenamento Local</h2>
          <p className="mb-4 text-text-secondary-dark">
            Utilizamos apenas o armazenamento local do seu navegador para:
          </p>
          <ul className="space-y-2 pl-4 text-text-secondary-dark">
            <li>
              • <strong>Tema:</strong> Salvar suas preferências de interface em modo escuro
            </li>
            <li>
              • <strong>Configurações:</strong> Lembrar suas preferências de interface
            </li>
          </ul>
          <p className="mt-4 text-sm text-text-secondary-dark">
            Estes dados ficam apenas no seu dispositivo e podem ser removidos a qualquer momento
            através das configurações do seu navegador.
          </p>
        </section>

        <section className="rounded-lg bg-neutral-surface p-6">
          <h2 className="mb-4 text-2xl font-bold text-text-primary-dark">5. Seus Direitos</h2>
          <p className="mb-4 text-text-secondary-dark">
            Em conformidade com a LGPD (Lei Geral de Proteção de Dados), você tem o direito de:
          </p>
          <ul className="space-y-2 pl-4 text-text-secondary-dark">
            <li>• Usar nossa plataforma sem fornecer dados pessoais</li>
            <li>• Limpar dados locais através do seu navegador</li>
            <li>• Solicitar informações sobre quais dados coletamos</li>
            <li>• Solicitar a exclusão de dados técnicos associados ao seu IP</li>
          </ul>
        </section>

        <section className="rounded-lg bg-neutral-surface p-6">
          <h2 className="mb-4 text-2xl font-bold text-text-primary-dark">6. Segurança</h2>
          <p className="mb-4 text-text-secondary-dark">
            Implementamos medidas de segurança técnicas e organizacionais para proteger os dados:
          </p>
          <ul className="space-y-2 pl-4 text-text-secondary-dark">
            <li>• Conexão segura via HTTPS em todo o site</li>
            <li>• Proteção contra ataques DDoS e spam</li>
            <li>• Monitoramento de segurança 24/7</li>
            <li>• Atualizações regulares de segurança</li>
          </ul>
        </section>

        <section className="rounded-lg bg-neutral-surface p-6">
          <h2 className="mb-4 text-2xl font-bold text-text-primary-dark">
            7. Cookies e Tecnologias Similares
          </h2>
          <p className="mb-4 text-text-secondary-dark">
            Nossa plataforma usa minimamente cookies e tecnologias similares:
          </p>
          <ul className="space-y-2 pl-4 text-text-secondary-dark">
            <li>
              • <strong>Cookies essenciais:</strong> Necessários para o funcionamento básico
            </li>
            <li>
              • <strong>Preferências:</strong> Para salvar tema e configurações
            </li>
            <li>
              • <strong>Não usamos:</strong> Cookies de rastreamento, publicidade ou analytics
              invasivos
            </li>
          </ul>
        </section>

        <section className="rounded-lg bg-neutral-surface p-6">
          <h2 className="mb-4 text-2xl font-bold text-text-primary-dark">8. Terceiros</h2>
          <p className="mb-4 text-text-secondary-dark">
            Nossa plataforma pode usar serviços terceirizados mínimos para:
          </p>
          <ul className="space-y-2 pl-4 text-text-secondary-dark">
            <li>
              • <strong>Hospedagem:</strong> Para manter o site disponível
            </li>
            <li>
              • <strong>CDN:</strong> Para melhor velocidade de carregamento
            </li>
            <li>
              • <strong>Monitoramento:</strong> Para detectar problemas técnicos
            </li>
          </ul>
          <p className="mt-4 text-sm text-text-secondary-dark">
            Todos os terceiros seguem padrões rigorosos de privacidade e segurança.
          </p>
        </section>

        <section className="rounded-lg bg-neutral-surface p-6">
          <h2 className="mb-4 text-2xl font-bold text-text-primary-dark">
            9. Alterações nesta Política
          </h2>
          <p className="mb-4 text-text-secondary-dark">
            Podemos atualizar esta política ocasionalmente. Mudanças significativas serão
            comunicadas através:
          </p>
          <ul className="space-y-2 pl-4 text-text-secondary-dark">
            <li>• Aviso destacado no site</li>
            <li>• Atualização da data no topo desta página</li>
            <li>• Histórico de versões disponível quando solicitado</li>
          </ul>
        </section>

        <section className="rounded-lg border-2 border-amber-200 bg-amber-50 p-6">
          <div className="mb-4 flex items-center space-x-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-500">
              <span className="text-xl text-white">⚠️</span>
            </div>
            <h2 className="text-xl font-bold text-amber-900">
              10. Isenção de Responsabilidade sobre Dados
            </h2>
          </div>

          <div className="space-y-3 text-amber-800">
            <p className="font-semibold">
              Importante: As calculadoras não armazenam ou salvam os dados que você insere.
            </p>
            <ul className="ml-4 list-disc space-y-2">
              <li>
                <strong>Processamento Local:</strong> Todos os cálculos são realizados no seu
                navegador, não em nossos servidores.
              </li>
              <li>
                <strong>Sem Backup:</strong> Seus dados não são salvos, enviados ou armazenados de
                forma alguma.
              </li>
              <li>
                <strong>Privacidade Total:</strong> Informações sensíveis (valores financeiros,
                dados pessoais de saúde) permanecem exclusivamente no seu dispositivo.
              </li>
              <li>
                <strong>Responsabilidade do Usuário:</strong> Recomendamos que você faça suas
                próprias anotações se necessitar dos resultados posteriormente.
              </li>
            </ul>
          </div>
        </section>

        <section className="bg-system-info-light rounded-lg p-6 text-center">
          <h2 className="mb-4 text-xl font-bold text-text-primary-dark">
            Nosso Compromisso com sua Privacidade
          </h2>
          <p className="text-text-secondary-dark">
            A CalculadoraOnlineBR foi criada com o princípio de "privacidade por design".
            Acreditamos que você deve poder usar ferramentas úteis sem sacrificar sua privacidade.
          </p>

          <div className="mt-4 text-center">
            <p className="mb-2 text-sm font-medium text-text-primary-dark">
              Dúvidas sobre privacidade? Entre em contato:
            </p>
            <a
              href="mailto:contato@calculadoraonlinebr.com.br?subject=Dúvida sobre Privacidade"
              className="font-medium text-primary-blue hover:text-primary-blue-dark hover:underline"
            >
              contato@calculadoraonlinebr.com.br
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}
