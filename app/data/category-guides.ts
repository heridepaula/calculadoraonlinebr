/**
 * Conteúdo educativo das páginas de categoria: introdução, guia "qual calculadora usar" e FAQ.
 * O FAQ também vira JSON-LD (FAQPage). Os ids de `chooser` precisam existir em CALCULATORS;
 * o componente CategoryGuide ignora ids inexistentes.
 */

export interface CategoryGuide {
  /** Título da seção de introdução (H2) */
  introTitle: string;
  intro: string[];
  chooserTitle: string;
  chooser: Array<{ calculatorId: string; when: string }>;
  faqTitle: string;
  faq: Array<{ question: string; answer: string }>;
}

export const CATEGORY_GUIDES: Record<string, CategoryGuide> = {
  saude: {
    introTitle: "Para que servem as calculadoras de saúde",
    intro: [
      "As calculadoras de saúde transformam medidas simples, como peso, altura, idade e circunferências, em indicadores usados por médicos e nutricionistas: índice de massa corporal (IMC), percentual de gordura, necessidade de água, ganho de peso na gestação e marcos de desenvolvimento infantil.",
      "Os cálculos seguem referências publicadas, como as faixas de IMC da Organização Mundial da Saúde e as recomendações de ganho de peso do Institute of Medicine para gestantes. Eles servem para acompanhar a evolução e preparar perguntas para a consulta, não para fechar um diagnóstico: o mesmo IMC pode significar coisas diferentes para um atleta e para um sedentário.",
    ],
    chooserTitle: "Qual calculadora de saúde usar",
    chooser: [
      {
        calculatorId: "imc",
        when: "para saber se o peso está adequado à altura pelas faixas da OMS",
      },
      {
        calculatorId: "gordura-corporal",
        when: "quando o IMC não basta e você quer estimar a composição do corpo com medidas de fita",
      },
      {
        calculatorId: "hidratacao",
        when: "para estimar quanta água beber por dia conforme peso, atividade e clima",
      },
      {
        calculatorId: "peso-gravidez",
        when: "para acompanhar se o ganho de peso na gestação está dentro do esperado",
      },
      {
        calculatorId: "ciclo-menstrual",
        when: "para prever a próxima menstruação e o período fértil",
      },
      {
        calculatorId: "desenvolvimento-infantil",
        when: "para conferir marcos de desenvolvimento esperados para a idade da criança",
      },
    ],
    faqTitle: "Perguntas Frequentes sobre as Calculadoras de Saúde",
    faq: [
      {
        question: "Qual é o IMC ideal para adultos?",
        answer:
          "Pela Organização Mundial da Saúde, o IMC entre 18,5 e 24,9 é considerado peso normal para adultos. Abaixo de 18,5 é baixo peso, de 25 a 29,9 é sobrepeso e a partir de 30 é obesidade. Para crianças, adolescentes e gestantes, as referências são outras.",
      },
      {
        question: "O IMC serve para quem faz musculação?",
        answer:
          "Com limitações. O IMC não diferencia músculo de gordura, então pessoas musculosas podem aparecer com sobrepeso sem excesso de gordura. Nesses casos, a calculadora de gordura corporal e a medida da cintura dão uma visão mais fiel.",
      },
      {
        question: "Quanta água devo beber por dia?",
        answer:
          "Uma referência comum é de 30 a 35 ml por quilo de peso por dia para adultos saudáveis, mas a necessidade aumenta com exercício, calor, gestação e amamentação. Pessoas com doenças renais ou cardíacas devem seguir a orientação médica.",
      },
      {
        question: "Quanto peso é normal ganhar na gravidez?",
        answer:
          "Depende do IMC antes da gestação. Pelas recomendações do Institute of Medicine, quem começa com peso normal costuma ganhar entre 11,5 e 16 kg; com sobrepeso, entre 7 e 11,5 kg; e com obesidade, entre 5 e 9 kg. O pré-natal define a meta de cada gestante.",
      },
      {
        question: "As calculadoras de saúde substituem a consulta médica?",
        answer:
          "Não. Elas dão estimativas a partir dos dados informados e ajudam a acompanhar a evolução, mas não consideram exames, histórico e sintomas. Use os resultados como ponto de partida para conversar com um profissional de saúde.",
      },
    ],
  },

  financas: {
    introTitle: "Como as calculadoras financeiras ajudam a decidir",
    intro: [
      "Comparar investimentos, simular um financiamento ou planejar a aposentadoria exige juros compostos, imposto de renda regressivo e indicadores que mudam todo dia. As calculadoras financeiras fazem essas contas com as taxas atuais da Selic, do CDI, do IPCA e da poupança, atualizadas diariamente a partir do Banco Central e do Tesouro Nacional.",
      "Para investimentos, compare sempre o rendimento líquido, depois do imposto de renda e das taxas, e não a taxa bruta anunciada. Para crédito, olhe o custo efetivo total e o valor final pago, não só a parcela. Os resultados são simulações: o rendimento real depende das taxas futuras e das condições de cada contrato.",
    ],
    chooserTitle: "Qual calculadora financeira usar",
    chooser: [
      {
        calculatorId: "juros-compostos",
        when: "para ver quanto um valor rende com aportes mensais ao longo do tempo",
      },
      {
        calculatorId: "juros-simples",
        when: "para contas de juros sem capitalização, como multas e acordos simples",
      },
      {
        calculatorId: "cdb",
        when: "para calcular o rendimento líquido de um CDB em % do CDI, já com IR",
      },
      { calculatorId: "lci-lca", when: "para simular LCI e LCA, isentas de IR para pessoa física" },
      {
        calculatorId: "tesouro-direto",
        when: "para simular títulos do Tesouro Selic, IPCA+ e Prefixado",
      },
      {
        calculatorId: "renda-fixa-comparativa",
        when: "para comparar CDB, LCI/LCA, Tesouro e poupança lado a lado",
      },
      {
        calculatorId: "primeiro-milhao",
        when: "para descobrir quanto investir por mês até chegar a R$ 1 milhão",
      },
      {
        calculatorId: "preco-medio",
        when: "para calcular o preço médio de ações e FIIs após várias compras",
      },
      {
        calculatorId: "financiamento-imobiliario",
        when: "para comparar SAC e Price no financiamento da casa própria",
      },
      {
        calculatorId: "emprestimo-consignado",
        when: "para simular parcelas e margem consignável do empréstimo",
      },
      {
        calculatorId: "consorcio",
        when: "para comparar o custo do consórcio com o de um financiamento",
      },
      {
        calculatorId: "antecipacao-parcelas-nubank",
        when: "para ver o desconto ao antecipar parcelas de uma compra",
      },
    ],
    faqTitle: "Perguntas Frequentes sobre as Calculadoras Financeiras",
    faq: [
      {
        question: "Qual a diferença entre juros simples e juros compostos?",
        answer:
          "Nos juros simples, o rendimento é calculado sempre sobre o valor inicial. Nos juros compostos, os juros de cada período entram na base do período seguinte, os famosos juros sobre juros. Investimentos e financiamentos no Brasil usam juros compostos.",
      },
      {
        question: "CDB ou poupança: qual rende mais?",
        answer:
          "Na maioria dos cenários, um CDB que paga 100% do CDI rende mais que a poupança mesmo depois do imposto de renda, principalmente com a Selic alta. A poupança é isenta de IR, mas rende 0,5% ao mês mais TR quando a Selic está acima de 8,5% ao ano. A calculadora comparativa de renda fixa mostra a diferença em reais.",
      },
      {
        question: "Como funciona o imposto de renda na renda fixa?",
        answer:
          "CDB e Tesouro Direto seguem a tabela regressiva sobre o lucro: 22,5% até 180 dias, 20% de 181 a 360 dias, 17,5% de 361 a 720 dias e 15% acima de 720 dias. LCI, LCA e poupança são isentas para pessoa física.",
      },
      {
        question: "SAC ou Price: qual é melhor no financiamento?",
        answer:
          "No SAC, as parcelas começam maiores e caem com o tempo, e o total de juros pago é menor. Na Price, as parcelas são fixas e começam menores, mas o total de juros é maior. Se a primeira parcela do SAC cabe no orçamento, ele costuma sair mais barato.",
      },
      {
        question: "De onde vêm as taxas usadas nas calculadoras?",
        answer:
          "Selic, CDI, IPCA e TR vêm do Sistema Gerenciador de Séries do Banco Central, e as taxas dos títulos públicos vêm do Tesouro Transparente. Os dados são atualizados automaticamente uma vez por dia.",
      },
    ],
  },

  matematica: {
    introTitle: "Calculadoras de matemática que mostram o passo a passo",
    intro: [
      "As calculadoras de matemática resolvem desde a porcentagem do dia a dia até equações, sistemas lineares e estatística, e mostram o caminho até o resultado. Isso ajuda a conferir a lição de casa, estudar para provas como o ENEM e entender a fórmula em vez de só copiar a resposta.",
      "Use a calculadora para verificar uma conta que você já fez à mão: se os resultados forem diferentes, compare o passo a passo e encontre onde está a diferença. Para situações práticas, como descontos, receitas e medidas de reforma, porcentagem, regra de três, área e volume resolvem a maior parte dos casos.",
    ],
    chooserTitle: "Qual calculadora de matemática usar",
    chooser: [
      {
        calculatorId: "porcentagem",
        when: "para descontos, aumentos, variação percentual e quanto X é de Y",
      },
      {
        calculatorId: "regra-de-tres",
        when: "para grandezas proporcionais, como receitas, consumo e velocidade",
      },
      {
        calculatorId: "fracoes",
        when: "para somar, subtrair, multiplicar, dividir e simplificar frações",
      },
      {
        calculatorId: "mmc-mdc",
        when: "para mínimo múltiplo comum e máximo divisor comum com fatoração",
      },
      {
        calculatorId: "equacao-segundo-grau",
        when: "para resolver ax² + bx + c = 0 pela fórmula de Bhaskara",
      },
      {
        calculatorId: "sistemas-equacoes-lineares",
        when: "para sistemas de 2 ou 3 equações com 2 ou 3 incógnitas",
      },
      {
        calculatorId: "inequacoes",
        when: "para inequações de 1º e 2º grau com o conjunto solução",
      },
      {
        calculatorId: "simplificador-funcoes-algebricas",
        when: "para simplificar e fatorar expressões algébricas",
      },
      {
        calculatorId: "area-perimetro",
        when: "para área e perímetro de quadrados, retângulos, círculos e triângulos",
      },
      {
        calculatorId: "volume",
        when: "para volume de cubos, cilindros, esferas e caixas, inclusive em litros",
      },
      {
        calculatorId: "teorema-pitagoras",
        when: "para achar o lado que falta de um triângulo retângulo",
      },
      {
        calculatorId: "media",
        when: "para média aritmética, ponderada e mediana de uma lista de números",
      },
      {
        calculatorId: "moda",
        when: "para descobrir o valor que mais se repete em um conjunto de dados",
      },
      {
        calculatorId: "desvio-padrao",
        when: "para medir a dispersão dos dados em relação à média",
      },
      {
        calculatorId: "calculadora-cientifica",
        when: "para potências, raízes, logaritmos e trigonometria",
      },
      { calculatorId: "fibonacci", when: "para gerar a sequência de Fibonacci e a razão áurea" },
    ],
    faqTitle: "Perguntas Frequentes sobre as Calculadoras de Matemática",
    faq: [
      {
        question: "Como calcular porcentagem de um valor?",
        answer:
          "Multiplique o valor pela porcentagem e divida por 100. Por exemplo, 15% de R$ 200 é 200 × 15 ÷ 100 = R$ 30. Para aplicar um desconto de 15%, multiplique por 0,85; para um aumento de 15%, multiplique por 1,15.",
      },
      {
        question: "Quando usar a regra de três?",
        answer:
          "Quando duas grandezas variam na mesma proporção (diretamente proporcionais, como quantidade e preço) ou em proporção inversa (como velocidade e tempo de viagem). Monte a proporção com três valores conhecidos e calcule o quarto.",
      },
      {
        question: "O que é o delta na fórmula de Bhaskara?",
        answer:
          "O delta (Δ = b² − 4ac) indica quantas raízes reais a equação do 2º grau tem: duas raízes diferentes se Δ > 0, uma raiz dupla se Δ = 0 e nenhuma raiz real se Δ < 0.",
      },
      {
        question: "Qual a diferença entre média, moda e mediana?",
        answer:
          "A média é a soma dos valores dividida pela quantidade. A mediana é o valor do meio quando os dados estão em ordem. A moda é o valor que mais se repete. Com valores muito extremos, a mediana representa melhor o conjunto do que a média.",
      },
      {
        question: "As calculadoras mostram a resolução completa?",
        answer:
          "Sim, a maioria mostra o passo a passo: fatoração no MMC e MDC, cálculo do delta em Bhaskara, escalonamento nos sistemas e a fórmula usada em área, volume e estatística. Assim dá para conferir e aprender o método.",
      },
    ],
  },

  trabalhista: {
    introTitle: "Direitos trabalhistas calculados com a legislação atual",
    intro: [
      "As calculadoras trabalhistas mostram quanto você deve receber de salário líquido, férias, 13º salário, horas extras e verbas de rescisão, e estimam benefícios do INSS como auxílio por incapacidade e aposentadoria. Os cálculos seguem a CLT, as leis do 13º salário e as tabelas de INSS e Imposto de Renda do ano, incluindo a isenção de IR para quem ganha até R$ 5 mil, em vigor desde janeiro de 2026.",
      "Antes de calcular, tenha em mãos o salário bruto, a data de admissão, as médias de horas extras e comissões e o número de dependentes para o IR. Se o valor do seu holerite for diferente da simulação, confira com o departamento pessoal quais verbas e descontos entraram no cálculo; em caso de divergência na rescisão, procure o sindicato ou um advogado trabalhista.",
    ],
    chooserTitle: "Qual calculadora trabalhista usar",
    chooser: [
      {
        calculatorId: "salario-liquido",
        when: "para saber quanto sobra do salário depois do INSS e do IR",
      },
      {
        calculatorId: "decimo-terceiro",
        when: "para o valor da 1ª e da 2ª parcela do 13º, integral ou proporcional",
      },
      {
        calculatorId: "ferias-decimo-terceiro",
        when: "para férias com 1/3, abono pecuniário e adiantamento do 13º",
      },
      {
        calculatorId: "rescisao-trabalhista",
        when: "para as verbas de demissão, pedido de demissão ou acordo, com FGTS e seguro-desemprego",
      },
      {
        calculatorId: "horas-extras",
        when: "para o valor das horas extras a 50% e 100% e do adicional noturno",
      },
      {
        calculatorId: "auxilio-doenca",
        when: "para estimar o auxílio por incapacidade temporária do INSS",
      },
      {
        calculatorId: "aposentadoria",
        when: "para comparar as regras de aposentadoria e de transição do INSS",
      },
    ],
    faqTitle: "Perguntas Frequentes sobre Direitos Trabalhistas",
    faq: [
      {
        question: "Quanto é descontado de INSS do salário?",
        answer:
          "O INSS é progressivo: em 2026, as alíquotas vão de 7,5% a 14%, cada uma aplicada só sobre a parte do salário dentro da faixa. O desconto máximo é de R$ 988,09 por mês, para salários a partir do teto de R$ 8.475,55.",
      },
      {
        question: "Quem ganha até R$ 5 mil paga Imposto de Renda?",
        answer:
          "Desde janeiro de 2026, não. A Lei 15.270/2025 criou uma redução que zera o IR retido na fonte para rendimentos de até R$ 5.000 por mês. Entre R$ 5.000,01 e R$ 7.350 o imposto é reduzido aos poucos, e acima disso vale a tabela normal. A regra vale também para o 13º.",
      },
      {
        question: "Quais verbas recebo na demissão sem justa causa?",
        answer:
          "Saldo de salário, aviso prévio (trabalhado ou indenizado, com 3 dias a mais por ano completo), férias vencidas e proporcionais com 1/3, 13º proporcional, saque do FGTS com multa de 40% e, se cumprir os requisitos, seguro-desemprego.",
      },
      {
        question: "Quando são pagas as parcelas do 13º salário?",
        answer:
          "A 1ª parcela, sem descontos, deve ser paga até 30 de novembro. A 2ª parcela, com os descontos de INSS e IR sobre o valor total, até 20 de dezembro. Quando a data cai em fim de semana, o pagamento deve ser antecipado.",
      },
      {
        question: "Posso vender parte das férias?",
        answer:
          "Sim. O abono pecuniário permite converter até 1/3 das férias (10 dias, em férias de 30) em dinheiro, desde que o pedido seja feito até 15 dias antes do fim do período aquisitivo. O abono e o 1/3 sobre ele não têm desconto de INSS nem de IR.",
      },
    ],
  },

  ferramentas: {
    introTitle: "Ferramentas online para o trabalho e o dia a dia",
    intro: [
      "Esta categoria reúne utilitários que resolvem tarefas rápidas sem instalar nada: gerar e validar CPF e CNPJ para testes de sistemas, criar senhas fortes e identificadores únicos, contar caracteres de um texto, sortear nomes e números, converter unidades e estimar o consumo de energia de aparelhos e carros.",
      "Os geradores de CPF, CNPJ e cartão criam números matematicamente válidos, mas fictícios, e servem só para testar formulários e softwares. Usar esses números para cadastros reais ou para se passar por outra pessoa é crime. As ferramentas rodam no seu navegador e não guardam o que você digita.",
    ],
    chooserTitle: "Qual ferramenta usar",
    chooser: [
      {
        calculatorId: "gerador-cpf",
        when: "para gerar CPFs válidos e fictícios para testar sistemas",
      },
      {
        calculatorId: "validar-cpf",
        when: "para conferir se um CPF tem dígitos verificadores corretos",
      },
      { calculatorId: "gerador-cnpj", when: "para gerar CNPJs válidos e fictícios para testes" },
      { calculatorId: "validar-cnpj", when: "para conferir os dígitos verificadores de um CNPJ" },
      {
        calculatorId: "gerador-cartao-credito",
        when: "para números de cartão de teste que passam no algoritmo de Luhn",
      },
      { calculatorId: "gerador-senha-segura", when: "para criar senhas fortes e aleatórias" },
      {
        calculatorId: "gerador-uuid-guid",
        when: "para gerar identificadores únicos UUID v4 para bancos de dados e APIs",
      },
      {
        calculatorId: "contador-caracteres",
        when: "para contar caracteres, palavras e linhas de um texto",
      },
      {
        calculatorId: "sorteador-online",
        when: "para sortear nomes ou números de forma aleatória",
      },
      {
        calculatorId: "conversor-unidades",
        when: "para converter comprimento, peso, temperatura, área e volume",
      },
      {
        calculatorId: "consumo-energia-eletrica",
        when: "para saber quanto cada aparelho gasta na conta de luz",
      },
      {
        calculatorId: "economia-energia-eletrica",
        when: "para estimar a economia ao trocar aparelhos ou mudar hábitos",
      },
      {
        calculatorId: "carro-eletrico-combustao",
        when: "para comparar o custo de um carro elétrico com um a combustão",
      },
      {
        calculatorId: "clicks-por-segundo",
        when: "para testar quantos cliques por segundo você consegue dar",
      },
    ],
    faqTitle: "Perguntas Frequentes sobre as Ferramentas Online",
    faq: [
      {
        question: "É legal usar um gerador de CPF?",
        answer:
          "Sim, para testar sistemas, formulários e bancos de dados. Os números gerados são válidos matematicamente, mas não pertencem a ninguém. Usá-los para abrir contas, fazer compras ou se passar por outra pessoa é crime de falsidade ideológica.",
      },
      {
        question: "Como o validador sabe se um CPF é válido?",
        answer:
          "Os dois últimos dígitos do CPF são calculados a partir dos nove primeiros por uma regra de módulo 11. O validador refaz essa conta e compara. Um CPF válido nesse teste não significa que ele exista ou esteja regular na Receita Federal.",
      },
      {
        question: "O que torna uma senha segura?",
        answer:
          "Comprimento e aleatoriedade. Senhas com 12 caracteres ou mais, misturando letras maiúsculas e minúsculas, números e símbolos, sem palavras do dicionário nem dados pessoais, são muito difíceis de quebrar. Use uma senha diferente em cada serviço.",
      },
      {
        question: "Como calcular o consumo de um aparelho em kWh?",
        answer:
          "Multiplique a potência em watts pelas horas de uso por dia e pelos dias do mês, e divida por 1.000. Um aparelho de 1.000 W ligado 1 hora por dia gasta 30 kWh por mês. Multiplique pelo valor do kWh da sua distribuidora para saber o custo.",
      },
      {
        question: "Os dados que digito ficam salvos?",
        answer:
          "Não. As ferramentas funcionam no seu navegador: textos, senhas e números gerados não são enviados nem armazenados pelo site.",
      },
    ],
  },

  astrologia: {
    introTitle: "Astrologia e numerologia calculadas a partir dos seus dados",
    intro: [
      "As calculadoras de astrologia descobrem o signo solar pela data de nascimento, o ascendente a partir da hora e da cidade, a compatibilidade entre signos e os números da numerologia pelo nome e pela data. O ascendente depende da hora exata e do local de nascimento, porque muda a cada duas horas, em média.",
      "Astrologia e numerologia são práticas culturais e de autoconhecimento, sem comprovação científica. Use os resultados como entretenimento e reflexão, e não para tomar decisões importantes de saúde, dinheiro ou relacionamento.",
    ],
    chooserTitle: "Qual calculadora de astrologia usar",
    chooser: [
      { calculatorId: "signo", when: "para descobrir o signo solar pela data de nascimento" },
      {
        calculatorId: "ascendente-astrologico",
        when: "para calcular o ascendente com data, hora e cidade de nascimento",
      },
      {
        calculatorId: "compatibilidade-signos",
        when: "para ver a combinação entre dois signos no amor e na amizade",
      },
      {
        calculatorId: "numerologia",
        when: "para calcular o número do destino e da expressão pelo nome e data",
      },
    ],
    faqTitle: "Perguntas Frequentes sobre Astrologia",
    faq: [
      {
        question: "Qual a diferença entre signo solar e ascendente?",
        answer:
          "O signo solar é definido pela posição do Sol no dia do nascimento e depende só da data. O ascendente é o signo que surgia no horizonte leste no momento exato do nascimento, por isso exige a hora e a cidade.",
      },
      {
        question: "Por que preciso da hora exata para calcular o ascendente?",
        answer:
          "Porque o ascendente muda, em média, a cada duas horas. Uma diferença de poucos minutos perto da troca pode mudar o resultado. A hora costuma estar na certidão de nascimento.",
      },
      {
        question: "Quem nasce na troca de signo, no dia 20 ou 21, tem qual signo?",
        answer:
          "Depende do ano e do horário, porque a entrada do Sol em cada signo varia em até um dia entre os anos. A calculadora de signo considera a data informada; para quem nasceu exatamente na data de transição, vale conferir com a hora de nascimento.",
      },
      {
        question: "Como a numerologia calcula o número do destino?",
        answer:
          "Somam-se todos os algarismos da data de nascimento e reduz-se o resultado a um só dígito, somando os algarismos de novo. Os números 11, 22 e 33 costumam ser mantidos como números mestres.",
      },
      {
        question: "A astrologia tem base científica?",
        answer:
          "Não. Estudos controlados não encontraram relação entre signos e personalidade ou destino. As calculadoras seguem as regras da tradição astrológica e numerológica e devem ser usadas como entretenimento.",
      },
    ],
  },

  datas: {
    introTitle: "Cálculos com datas sem erro de calendário",
    intro: [
      "Contar dias entre duas datas parece simples, mas meses de tamanhos diferentes, anos bissextos e feriados móveis como Carnaval, Páscoa e Corpus Christi tornam a conta manual fácil de errar. As calculadoras de datas resolvem prazos, idades, contagens regressivas e dias úteis considerando o calendário completo.",
      "Para prazos legais e contratuais, confira se a contagem é em dias corridos ou em dias úteis e se o primeiro dia entra ou não na conta. Feriados estaduais e municipais variam por cidade e podem não estar incluídos, então vale conferir o calendário local.",
    ],
    chooserTitle: "Qual calculadora de datas usar",
    chooser: [
      {
        calculatorId: "diferenca-entre-datas",
        when: "para saber quantos dias, meses e anos há entre duas datas",
      },
      {
        calculatorId: "dias-uteis",
        when: "para contar dias úteis, descontando fins de semana e feriados nacionais",
      },
      {
        calculatorId: "operacao-datas",
        when: "para somar ou subtrair dias, meses ou anos de uma data",
      },
      { calculatorId: "idade-exata", when: "para a idade exata em anos, meses e dias" },
      { calculatorId: "contagem-regressiva", when: "para saber quanto falta até um evento" },
    ],
    faqTitle: "Perguntas Frequentes sobre Cálculos com Datas",
    faq: [
      {
        question: "Como contar os dias entre duas datas?",
        answer:
          "Subtraia a data inicial da final considerando o número real de dias de cada mês e os anos bissextos. Por convenção, a contagem não inclui o dia inicial; se o seu prazo inclui os dois extremos, some 1 ao resultado.",
      },
      {
        question: "Quais feriados entram na conta de dias úteis?",
        answer:
          "Os feriados nacionais (Confraternização Universal, Tiradentes, Dia do Trabalho, Independência, Nossa Senhora Aparecida, Finados, Proclamação da República, Dia da Consciência Negra, Natal e Sexta-feira Santa) e também a segunda e a terça de Carnaval e o Corpus Christi, que são ponto facultativo na maior parte do país. As datas móveis são calculadas a partir da Páscoa de cada ano.",
      },
      {
        question: "Como a data da Páscoa é calculada?",
        answer:
          "A Páscoa cai no primeiro domingo depois da primeira lua cheia que ocorre a partir de 21 de março. A calculadora usa o algoritmo de Gauss para encontrar essa data e, a partir dela, a terça de Carnaval (47 dias antes), a Sexta-feira Santa (2 dias antes) e o Corpus Christi (60 dias depois).",
      },
      {
        question: "Ano bissexto muda o cálculo da idade?",
        answer:
          "Muda na contagem de dias. Quem nasceu em 29 de fevereiro completa anos, em anos comuns, em 28 de fevereiro ou 1º de março, conforme a convenção usada. A calculadora de idade exata considera os anos bissextos ao contar os dias vividos.",
      },
      {
        question: "Prazo em dias corridos ou em dias úteis: qual a diferença?",
        answer:
          "Dias corridos contam todos os dias do calendário. Dias úteis excluem sábados, domingos e feriados. Prazos processuais do Código de Processo Civil, por exemplo, contam em dias úteis, enquanto muitos prazos de contratos contam em dias corridos.",
      },
    ],
  },

  loterias: {
    introTitle: "Geradores de jogos e as chances reais de cada loteria",
    intro: [
      "Os geradores de loteria montam jogos da Mega-Sena, da Lotofácil e da Quina com números aleatórios ou com estratégias como equilíbrio entre pares e ímpares, distribuição pelas faixas do volante e frequência nos últimos sorteios. Eles também mostram os resultados recentes e as probabilidades de cada faixa de prêmio.",
      "Nenhuma estratégia aumenta a chance de ganhar: cada sorteio é independente e todas as combinações têm a mesma probabilidade. As estratégias servem para fugir de jogos muito comuns, como sequências e datas, o que reduz a chance de dividir o prêmio se você acertar. Jogue com responsabilidade e só o que cabe no orçamento.",
    ],
    chooserTitle: "Qual gerador de loteria usar",
    chooser: [
      {
        calculatorId: "gerador-mega-sena",
        when: "para jogos da Mega-Sena (dezenas de 1 a 60) e os últimos resultados",
      },
      {
        calculatorId: "gerador-lotofacil",
        when: "para jogos da Lotofácil (dezenas de 1 a 25), a loteria com mais chance de prêmio",
      },
      {
        calculatorId: "gerador-quina",
        when: "para jogos da Quina (dezenas de 1 a 80) e os últimos resultados",
      },
    ],
    faqTitle: "Perguntas Frequentes sobre Loterias",
    faq: [
      {
        question: "Qual a chance de ganhar na Mega-Sena com um jogo simples?",
        answer:
          "Com 6 números, a chance de acertar a sena é de 1 em 50.063.860. Jogar mais números aumenta a chance na mesma proporção do preço: um jogo de 7 números equivale a 7 jogos de 6 e custa 7 vezes mais.",
      },
      {
        question: "Qual loteria tem a maior chance de ganhar?",
        answer:
          "A Lotofácil. Com 15 números, a chance de acertar os 15 é de 1 em 3.268.760, e há prêmios a partir de 11 acertos, o que torna algum prêmio bem mais provável do que nas outras loterias.",
      },
      {
        question: "Números que saem mais vezes têm mais chance de sair de novo?",
        answer:
          "Não. Os sorteios são independentes e as bolas não têm memória: cada combinação tem exatamente a mesma probabilidade em todos os concursos. A frequência passada só mostra o que já aconteceu.",
      },
      {
        question: "Então para que servem as estratégias do gerador?",
        answer:
          "Para montar jogos menos parecidos com os da maioria. Muita gente escolhe datas de aniversário (números até 31) e sequências; evitar esses padrões não aumenta a chance de acertar, mas diminui a chance de dividir o prêmio com outros ganhadores.",
      },
      {
        question: "Onde apostar e conferir os resultados oficiais?",
        answer:
          "As apostas são feitas nas lotéricas, no site e no aplicativo Loterias Caixa. Os resultados oficiais são publicados pela Caixa após cada sorteio; os geradores do site mostram os últimos concursos, mas a conferência válida é a da Caixa.",
      },
    ],
  },
};

/** Conteúdo da página /calculadoras (todas as categorias). */
export const ALL_CALCULATORS_GUIDE = {
  introTitle: "Calculadoras online grátis para o dia a dia",
  intro: [
    "A CalculadoraOnlineBR reúne calculadoras gratuitas organizadas em nove categorias: saúde, finanças, matemática, direitos trabalhistas, ferramentas, datas, astrologia, loterias e apostas. Todas funcionam no navegador, no celular ou no computador, sem cadastro e sem instalar nada.",
    "As calculadoras trabalhistas e financeiras usam as tabelas e taxas oficiais em vigor, como INSS, Imposto de Renda, Selic, CDI e IPCA, e citam a legislação usada no cálculo. As de matemática mostram o passo a passo para quem está estudando. Em cada página há um guia explicando a fórmula, exemplos e perguntas frequentes.",
  ],
  faqTitle: "Perguntas Frequentes sobre a CalculadoraOnlineBR",
  faq: [
    {
      question: "As calculadoras são gratuitas?",
      answer:
        "Sim. Todas as calculadoras são gratuitas, sem limite de uso e sem cadastro. O site é mantido por anúncios.",
    },
    {
      question: "Os valores das calculadoras trabalhistas estão atualizados?",
      answer:
        "Sim. As tabelas de INSS, Imposto de Renda, salário mínimo e seguro-desemprego são revisadas todo mês de janeiro e quando uma nova lei muda a regra. Cada calculadora trabalhista mostra a data da última revisão e as fontes oficiais.",
    },
    {
      question: "Os dados que eu digito ficam salvos?",
      answer:
        "Não. Os cálculos são feitos no seu navegador e os valores informados, como salário ou peso, não são armazenados.",
    },
    {
      question: "Posso usar as calculadoras no celular?",
      answer:
        "Sim. O site foi feito primeiro para celular, com campos grandes e teclado numérico, e funciona em qualquer navegador moderno.",
    },
    {
      question: "Encontrei um resultado errado. Como aviso?",
      answer:
        "Escreva para contato@calculadoraonlinebr.com.br com o exemplo usado e o valor esperado. As correções são feitas na própria calculadora.",
    },
  ],
} as const;
