import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { title: "Termos de Uso - Calculadora Online BR" },
    {
      name: "description",
      content:
        "Termos de uso da Calculadora Online BR. Entenda os termos para uso das nossas calculadoras gratuitas.",
    },
    { name: "keywords", content: "termos de uso, calculadora online br, condições de uso, acordo" },
    { property: "og:title", content: "Termos de Uso - Calculadora Online BR" },
    { property: "og:description", content: "Termos e condições de uso da nossa plataforma." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary" },
    { name: "twitter:title", content: "Termos de Uso - Calculadora Online BR" },
    { name: "twitter:description", content: "Conheça nossos termos de uso e condições." },
  ];
};

export default function TermosDeUso() {
  const lastUpdated = "09 de agosto de 2025";

  return (
    <div className="mx-auto max-w-4xl space-y-8">
      <section className="py-8 text-center">
        <h1 className="mb-4 text-4xl font-bold text-text-primary md:text-5xl">Termos de Uso</h1>
        <p className="text-sm text-text-secondary-dark">Última atualização: {lastUpdated}</p>
      </section>

      <div className="space-y-8">
        <section className="rounded-lg bg-neutral-surface p-6">
          <h2 className="mb-4 text-2xl font-bold text-text-primary-dark">
            1. Aceitação dos Termos
          </h2>
          <p className="mb-4 text-text-secondary-dark">
            Ao acessar e usar a Calculadora Online BR, você concorda em cumprir e estar vinculado a
            estes Termos de Uso. Se você não concordar com qualquer parte destes termos, não deve
            usar nossos serviços.
          </p>
          <p className="text-text-secondary-dark">
            Estes termos se aplicam a todos os visitantes, usuários e outras pessoas que acessam ou
            usam o serviço.
          </p>
        </section>

        <section className="rounded-lg bg-neutral-surface p-6">
          <h2 className="mb-4 text-2xl font-bold text-text-primary-dark">
            2. Descrição do Serviço
          </h2>
          <p className="mb-4 text-text-secondary-dark">
            A Calculadora Online BR é uma plataforma gratuita que oferece:
          </p>
          <ul className="mb-4 space-y-2 pl-4 text-text-secondary-dark">
            <li>• Calculadoras de saúde (IMC, gordura corporal, etc.)</li>
            <li>• Calculadoras financeiras (juros, investimentos, etc.)</li>
            <li>• Calculadoras matemáticas (porcentagem, operações básicas)</li>
            <li>• Interface web responsiva e acessível</li>
          </ul>
          <p className="text-text-secondary-dark">
            Nossos serviços são fornecidos gratuitamente, sem necessidade de cadastro ou pagamento.
          </p>
        </section>

        <section className="rounded-lg bg-neutral-surface p-6">
          <h2 className="mb-4 text-2xl font-bold text-text-primary-dark">3. Uso Permitido</h2>
          <p className="mb-4 text-text-secondary-dark">Você pode usar nossos serviços para:</p>
          <ul className="mb-4 space-y-2 pl-4 text-text-secondary-dark">
            <li>• Realizar cálculos pessoais e profissionais</li>
            <li>• Fins educacionais e informativos</li>
            <li>• Planejamento financeiro pessoal</li>
            <li>• Monitoramento de saúde pessoal</li>
            <li>• Pesquisa acadêmica ou profissional</li>
          </ul>
          <div className="bg-growth-green-light rounded-md p-4">
            <p className="text-sm text-text-secondary-dark">
              <strong>Importante:</strong> Nossas calculadoras são ferramentas de apoio. Para
              decisões importantes de saúde ou financeiras, sempre consulte profissionais
              qualificados.
            </p>
          </div>
        </section>

        <section className="rounded-lg bg-neutral-surface p-6">
          <h2 className="mb-4 text-2xl font-bold text-text-primary-dark">4. Uso Proibido</h2>
          <p className="mb-4 text-text-secondary-dark">Você NÃO pode usar nossos serviços para:</p>
          <ul className="mb-4 space-y-2 pl-4 text-text-secondary-dark">
            <li>• Atividades ilegais ou fraudulentas</li>
            <li>• Spam, phishing ou outras práticas maliciosas</li>
            <li>• Sobrecarregar nossos servidores (ataques DDoS)</li>
            <li>• Tentar hackear, quebrar ou comprometer a segurança</li>
            <li>• Copiar, redistribuir ou criar obras derivadas sem autorização</li>
            <li>• Uso automatizado excessivo (bots sem autorização)</li>
            <li>• Violar direitos de propriedade intelectual</li>
          </ul>
        </section>

        <section className="rounded-lg bg-neutral-surface p-6">
          <h2 className="mb-4 text-2xl font-bold text-text-primary-dark">
            5. Precisão dos Cálculos
          </h2>
          <div className="bg-system-warning-light mb-4 rounded-md p-4">
            <h3 className="mb-2 font-semibold text-text-primary-dark">
              Isenção de Responsabilidade
            </h3>
            <p className="text-sm text-text-secondary-dark">
              Embora nos esforcemos para fornecer cálculos precisos, não garantimos 100% de precisão
              em todos os casos.
            </p>
          </div>
          <ul className="mb-4 space-y-2 pl-4 text-text-secondary-dark">
            <li>• Os resultados são baseados nas fórmulas matemáticas padrão</li>
            <li>• Podem existir arredondamentos em cálculos complexos</li>
            <li>• Diferentes metodologias podem produzir resultados ligeiramente diferentes</li>
            <li>• Para decisões críticas, sempre verifique com fontes adicionais</li>
          </ul>
        </section>

        <section className="rounded-lg bg-neutral-surface p-6">
          <h2 className="mb-4 text-2xl font-bold text-text-primary-dark">
            6. Responsabilidades do Usuário
          </h2>
          <p className="mb-4 text-text-secondary-dark">Como usuário, você é responsável por:</p>
          <ul className="space-y-2 pl-4 text-text-secondary-dark">
            <li>• Inserir dados corretos nas calculadoras</li>
            <li>• Interpretar os resultados adequadamente</li>
            <li>• Buscar orientação profissional quando necessário</li>
            <li>• Usar as ferramentas de forma ética e legal</li>
            <li>• Manter a segurança do seu dispositivo e conexão</li>
            <li>• Reportar bugs ou problemas que encontrar</li>
          </ul>
        </section>

        <section className="rounded-lg bg-neutral-surface p-6">
          <h2 className="mb-4 text-2xl font-bold text-text-primary-dark">
            7. Propriedade Intelectual
          </h2>
          <p className="mb-4 text-text-secondary-dark">
            Todo o conteúdo da Calculadora Online BR, incluindo:
          </p>
          <ul className="mb-4 space-y-2 pl-4 text-text-secondary-dark">
            <li>• Design e interface do usuário</li>
            <li>• Código-fonte e algoritmos</li>
            <li>• Textos, imagens e elementos visuais</li>
            <li>• Marca e logotipo</li>
          </ul>
          <p className="text-text-secondary-dark">
            São protegidos por direitos autorais e outras leis de propriedade intelectual. O uso é
            permitido apenas conforme especificado nestes termos.
          </p>
        </section>

        <section className="rounded-lg bg-neutral-surface p-6">
          <h2 className="mb-4 text-2xl font-bold text-text-primary-dark">
            8. Disponibilidade do Serviço
          </h2>
          <p className="mb-4 text-text-secondary-dark">
            Nos esforçamos para manter nossos serviços disponíveis 24/7, mas:
          </p>
          <ul className="mb-4 space-y-2 pl-4 text-text-secondary-dark">
            <li>• Pode haver interrupções para manutenção programada</li>
            <li>• Problemas técnicos podem causar indisponibilidade temporária</li>
            <li>• Não garantimos 100% de uptime</li>
            <li>• Reservamos o direito de modificar ou descontinuar funcionalidades</li>
          </ul>
          <p className="text-text-secondary-dark">
            Faremos o possível para notificar sobre manutenções programadas.
          </p>
        </section>

        <section className="rounded-lg bg-neutral-surface p-6">
          <h2 className="mb-4 text-2xl font-bold text-text-primary-dark">
            9. Limitação de Responsabilidade
          </h2>
          <div className="bg-system-warning-light mb-4 rounded-md p-4">
            <p className="text-sm font-semibold text-text-primary-dark">
              IMPORTANTE: Limitações Legais
            </p>
          </div>
          <p className="mb-4 text-text-secondary-dark">
            A Calculadora Online BR não se responsabiliza por:
          </p>
          <ul className="space-y-2 pl-4 text-text-secondary-dark">
            <li>• Decisões tomadas com base nos resultados das calculadoras</li>
            <li>• Perdas financeiras decorrentes do uso das ferramentas</li>
            <li>• Problemas de saúde relacionados aos cálculos de IMC ou similares</li>
            <li>• Interrupções no serviço ou perda de dados</li>
            <li>• Danos diretos, indiretos ou consequenciais</li>
            <li>• Uso inadequado ou interpretação incorreta dos resultados</li>
          </ul>
        </section>

        <section className="rounded-lg bg-neutral-surface p-6">
          <h2 className="mb-4 text-2xl font-bold text-text-primary-dark">
            10. Modificações dos Termos
          </h2>
          <p className="mb-4 text-text-secondary-dark">
            Reservamos o direito de modificar estes Termos de Uso a qualquer momento:
          </p>
          <ul className="mb-4 space-y-2 pl-4 text-text-secondary-dark">
            <li>• Mudanças significativas serão notificadas no site</li>
            <li>• A data de atualização será sempre indicada no topo</li>
            <li>• O uso continuado após mudanças constitui aceitação</li>
            <li>• Recomendamos revisar periodicamente estes termos</li>
          </ul>
        </section>

        <section className="rounded-lg bg-neutral-surface p-6">
          <h2 className="mb-4 text-2xl font-bold text-text-primary-dark">11. Lei Aplicável</h2>
          <p className="mb-4 text-text-secondary-dark">
            Estes Termos de Uso são regidos pelas leis brasileiras:
          </p>
          <ul className="space-y-2 pl-4 text-text-secondary-dark">
            <li>• Código Civil Brasileiro</li>
            <li>• Marco Civil da Internet (Lei 12.965/2014)</li>
            <li>• Lei Geral de Proteção de Dados (LGPD)</li>
            <li>• Código de Defesa do Consumidor</li>
          </ul>
        </section>

        <section className="rounded-lg bg-neutral-surface p-6">
          <h2 className="mb-4 text-2xl font-bold text-text-primary-dark">12. Contato</h2>
          <p className="mb-4 text-text-secondary-dark">Para questões sobre estes Termos de Uso:</p>
          <div className="rounded-md bg-gray-900 p-4">
            <p className="mb-2 text-sm text-text-secondary-dark">
              <strong>Email:</strong> termos@calculadoraonline.com.br
            </p>
            <p className="mb-2 text-sm text-text-secondary-dark">
              <strong>Assunto:</strong> "Termos de Uso - [Sua dúvida]"
            </p>
            <p className="text-sm text-text-secondary-dark">
              <strong>Resposta:</strong> Em até 72 horas úteis
            </p>
          </div>
        </section>

        <section className="rounded-lg bg-primary-blue-light p-6 text-center">
          <h2 className="mb-4 text-xl font-bold text-text-primary-dark">
            Compromisso com a Transparência
          </h2>
          <p className="text-text-secondary-dark">
            Nossos termos foram escritos para serem claros e compreensíveis. Se você tiver dúvidas
            sobre qualquer ponto, não hesite em entrar em contato conosco.
          </p>
        </section>
      </div>
    </div>
  );
}
