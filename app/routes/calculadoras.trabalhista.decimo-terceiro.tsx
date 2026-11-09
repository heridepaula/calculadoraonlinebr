import type { MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";
import { FAQ, RelatedCalculators, SourcesAndUpdate } from "~/components";
import {
  Breadcrumb,
  BreadcrumbItem,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "~/components/ui";
import {
  DecimoTerceiroCalculator,
  calculateDecimoTerceiro,
} from "~/components/calculators/DecimoTerceiroCalculator";
import { APP_NAME, APP_URL } from "~/lib/constants";
import { CALCULATOR_SEO_DATA } from "~/lib/calculator-seo";
import {
  INSS_BRACKETS,
  INSS_CEILING,
  IRRF_BRACKETS,
  IRRF_DEPENDENT_DEDUCTION,
  IRRF_REDUCTION,
  IRRF_SIMPLIFIED_DISCOUNT,
  LABOR_TAX_REVIEWED_AT,
  LABOR_TAX_SOURCES,
  LABOR_TAX_YEAR,
  MINIMUM_WAGE,
  calculateInss,
} from "~/lib/labor/tax-tables";
import { generateFAQStructuredData } from "~/lib/structured-data";
import { buildCalculatorMeta } from "~/lib/page-meta";

const SEO = CALCULATOR_SEO_DATA["decimo-terceiro"];
const PAGE_URL = SEO.canonicalUrl;
const YEAR = LABOR_TAX_YEAR;

const brl = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" });
const pct = new Intl.NumberFormat("pt-BR", { style: "percent", maximumFractionDigits: 2 });

// Exemplos calculados pela mesma função da calculadora
const FULL_YEAR_EXAMPLE = calculateDecimoTerceiro({
  salary: 3000,
  variableAverage: 0,
  months: 12,
  dependents: 0,
});
const PROPORTIONAL_EXAMPLE = calculateDecimoTerceiro({
  salary: 3000,
  variableAverage: 0,
  months: 5,
  dependents: 0,
});
const REDUCTION_EXAMPLE = calculateDecimoTerceiro({
  salary: 6000,
  variableAverage: 0,
  months: 12,
  dependents: 0,
});
const REFERENCE_SALARIES = [MINIMUM_WAGE, 2000, 3000, 4000, 5000, 6000, 8000, 10000];
const REFERENCE_ROWS = REFERENCE_SALARIES.map((salary) => ({
  salary,
  result: calculateDecimoTerceiro({ salary, variableAverage: 0, months: 12, dependents: 0 }),
}));
const INSS_MAX = calculateInss(INSS_CEILING).contribution;

// Dia da semana dos prazos legais no ano das tabelas (o texto acompanha a troca de ano)
const WEEKDAYS = [
  "domingo",
  "segunda-feira",
  "terça-feira",
  "quarta-feira",
  "quinta-feira",
  "sexta-feira",
  "sábado",
];
const weekdayOf = (month: number, day: number) =>
  new Date(Date.UTC(YEAR, month - 1, day)).getUTCDay();
const FIRST_DEADLINE_WEEKDAY = weekdayOf(11, 30);
const SECOND_DEADLINE_WEEKDAY = weekdayOf(12, 20);
/** Último dia útil até 20/12: domingo e sábado recuam para sexta-feira. */
const SECOND_DEADLINE_BUSINESS_DAY =
  SECOND_DEADLINE_WEEKDAY === 0 ? 18 : SECOND_DEADLINE_WEEKDAY === 6 ? 19 : 20;

const firstDeadlineText =
  FIRST_DEADLINE_WEEKDAY === 0 || FIRST_DEADLINE_WEEKDAY === 6
    ? `Em ${YEAR}, o dia 30 cai num ${WEEKDAYS[FIRST_DEADLINE_WEEKDAY]}, então a empresa deve pagar antes, no último dia útil de novembro.`
    : `Em ${YEAR}, a data cai numa ${WEEKDAYS[FIRST_DEADLINE_WEEKDAY]}.`;
const secondDeadlineText =
  SECOND_DEADLINE_BUSINESS_DAY === 20
    ? `Em ${YEAR}, a data cai numa ${WEEKDAYS[SECOND_DEADLINE_WEEKDAY]}.`
    : `Em ${YEAR}, o dia 20 cai num ${WEEKDAYS[SECOND_DEADLINE_WEEKDAY]}, então a empresa deve pagar antes, até sexta-feira, ${SECOND_DEADLINE_BUSINESS_DAY} de dezembro.`;

const FAQ_ITEMS = [
  {
    question: "Como calcular o 13º salário?",
    answer:
      "Divida o salário bruto por 12 e multiplique pelos meses trabalhados no ano. Conta como mês inteiro aquele em que você trabalhou 15 dias ou mais. Quem recebe horas extras, comissões ou adicionais soma a média dessas verbas ao salário antes da conta.",
  },
  {
    question: `Quando é paga a 1ª parcela do 13º em ${YEAR}?`,
    answer: `Até 30 de novembro. ${firstDeadlineText} A 1ª parcela é metade do 13º bruto e não tem desconto de INSS nem de Imposto de Renda. Ela também pode ser paga antes, entre fevereiro e novembro, ou junto com as férias, se você pediu em janeiro.`,
  },
  {
    question: `Quando é paga a 2ª parcela do 13º em ${YEAR}?`,
    answer: `Até 20 de dezembro. ${secondDeadlineText} É na 2ª parcela que entram os descontos de INSS e de Imposto de Renda calculados sobre o 13º inteiro.`,
  },
  {
    question: "Por que a 2ª parcela do 13º é menor que a 1ª?",
    answer:
      "Porque o INSS e o Imposto de Renda são calculados sobre o valor total do 13º, mas descontados de uma vez só na 2ª parcela. A 1ª parcela é um adiantamento sem descontos.",
  },
  {
    question: "A isenção do Imposto de Renda até R$ 5 mil vale para o 13º?",
    answer:
      "Sim. A Lei 15.270/2025 manda aplicar a redução do IR também ao 13º salário. Com 13º bruto de até R$ 5.000, o imposto fica zerado. Entre R$ 5.000,01 e R$ 7.350, a redução diminui aos poucos. Acima de R$ 7.350 vale a tabela normal.",
  },
  {
    question: "O 13º é somado ao salário de dezembro para calcular o IR?",
    answer:
      "Não. O 13º tem tributação exclusiva na fonte: o INSS e o IR são calculados só sobre ele, com as mesmas tabelas do mês, sem juntar com o salário. Por isso o desconto costuma ser menor do que muita gente espera.",
  },
  {
    question: "Quem trabalhou menos de um ano recebe 13º?",
    answer:
      "Sim, de forma proporcional: 1/12 do salário por mês trabalhado. Quem foi contratado em agosto e trabalhou ao menos 15 dias no mês, por exemplo, recebe 5/12 do salário em dezembro.",
  },
  {
    question: "Quem não tem direito ao 13º salário?",
    answer:
      "Estagiários, autônomos, MEI e prestadores de serviço PJ não têm 13º, a menos que o contrato preveja. Quem é demitido por justa causa perde o 13º proporcional daquele ano. Aposentados e pensionistas do INSS recebem um abono anual que segue regras próprias.",
  },
  {
    question: "Faltas e afastamentos diminuem o 13º?",
    answer:
      "Faltas injustificadas podem diminuir, porque o mês com menos de 15 dias trabalhados não conta. Licença-maternidade conta normalmente. No afastamento por doença, a empresa paga os primeiros 15 dias e o INSS paga a parte do período em que você recebeu o benefício.",
  },
];

export const meta: MetaFunction = () => [
  ...buildCalculatorMeta("decimo-terceiro"),
  {
    "script:ld+json": {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      name: `Calculadora de 13º Salário ${YEAR}`,
      url: PAGE_URL,
      description: SEO.description,
      applicationCategory: "FinanceApplication",
      operatingSystem: "Web",
      inLanguage: "pt-BR",
      isAccessibleForFree: true,
      dateModified: LABOR_TAX_REVIEWED_AT,
      offers: { "@type": "Offer", price: "0", priceCurrency: "BRL" },
      featureList: [
        "13º salário líquido e bruto",
        "Valor da 1ª e da 2ª parcela",
        "13º proporcional aos meses trabalhados",
        `Tabelas de INSS e IRRF de ${YEAR}`,
        "Redução do IR da Lei 15.270/2025",
      ],
      publisher: { "@type": "Organization", name: APP_NAME, url: APP_URL },
    },
  },
  {
    "script:ld+json": {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Início", item: `${APP_URL}/` },
        { "@type": "ListItem", position: 2, name: "Calculadoras", item: `${APP_URL}/calculadoras` },
        {
          "@type": "ListItem",
          position: 3,
          name: "Trabalhista",
          item: `${APP_URL}/calculadoras/trabalhista`,
        },
        { "@type": "ListItem", position: 4, name: "13º Salário", item: PAGE_URL },
      ],
    },
  },
  { "script:ld+json": generateFAQStructuredData(FAQ_ITEMS) },
];

const FAQ_BORDER_COLORS = [
  "primary-blue",
  "growth-green",
  "system-info",
  "system-warning",
  "growth-green",
  "system-error-dark",
  "system-warning",
  "primary-blue",
  "system-info",
] as const;

const linkClass = "font-medium text-primary-blue-dark underline hover:text-primary-blue";

const formatRange = (from: number, upTo: number) =>
  upTo === Infinity ? `acima de ${brl.format(from)}` : `${brl.format(from)} a ${brl.format(upTo)}`;

export default function DecimoTerceiroPage() {
  return (
    <div className="mx-auto max-w-2xl space-y-8 px-4 md:max-w-4xl lg:max-w-6xl" lang="pt-BR">
      <Breadcrumb>
        <BreadcrumbItem href="/">Início</BreadcrumbItem>
        <BreadcrumbItem href="/calculadoras">Calculadoras</BreadcrumbItem>
        <BreadcrumbItem href="/calculadoras/trabalhista">Trabalhista</BreadcrumbItem>
        <BreadcrumbItem isLast>13º Salário</BreadcrumbItem>
      </Breadcrumb>

      <header className="space-y-4 text-center">
        <h1 className="mb-4 text-3xl font-bold text-text-primary md:text-4xl">
          Calculadora de 13º Salário {YEAR}
        </h1>
        <p className="mx-auto max-w-3xl text-lg text-text-secondary-dark">
          Descubra quanto você vai receber de{" "}
          <strong className="text-growth-green">13º salário líquido</strong> e o valor de cada
          parcela. O cálculo usa as tabelas de INSS e IRRF de {YEAR}, inclusive a{" "}
          <strong className="text-primary-blue-dark">isenção de IR até R$ 5 mil</strong>.
        </p>
        <div className="inline-block rounded-lg bg-growth-green-soft p-4">
          <p className="text-sm font-medium text-text-primary">
            📅 <strong>1ª parcela até 30/11</strong> • 📅 <strong>2ª parcela até 20/12</strong> • 🧾{" "}
            <strong>INSS e IR {YEAR}</strong>
          </p>
        </div>
      </header>

      {/* Resposta direta (o que é e a fórmula) */}
      <section
        aria-labelledby="resposta-direta"
        className="rounded-lg border-l-4 border-primary-blue bg-background-dark-secondary p-5"
      >
        <h2 id="resposta-direta" className="mb-2 text-lg font-semibold text-text-primary">
          O que é o 13º salário e como ele é calculado
        </h2>
        <p className="text-sm leading-relaxed text-text-secondary">
          O 13º salário, ou gratificação natalina, é um salário extra pago todo fim de ano a quem
          trabalha com carteira assinada. O valor é{" "}
          <strong className="text-text-primary">1/12 da remuneração por mês trabalhado</strong>:
          quem trabalhou o ano inteiro recebe um salário completo. O pagamento é feito em duas
          parcelas: a 1ª até 30 de novembro, sem descontos, e a 2ª até 20 de dezembro, com os
          descontos de INSS e Imposto de Renda.
        </p>
      </section>

      <DecimoTerceiroCalculator />

      {/* Guia completo */}
      <Card className="border-l-4 border-primary-blue bg-gradient-to-r from-primary-blue-light to-growth-green-soft">
        <CardHeader>
          <CardTitle as="h2" className="text-2xl font-bold text-text-primary">
            🎯 Como Calcular o 13º Salário: Guia Completo {YEAR}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-8">
            <div className="rounded-xl border border-primary-blue/20 bg-gray-900 p-6">
              <h3 className="mb-4 text-xl font-bold text-primary-blue-dark">
                📐 Passo a passo com exemplo
              </h3>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <h4 className="mb-3 font-semibold text-growth-green">1. Valor bruto</h4>
                  <p className="mb-4 text-sm text-text-secondary">
                    Some ao salário a média mensal de horas extras, comissões e adicionais (noturno,
                    insalubridade, periculosidade). Divida por 12 e multiplique pelos meses
                    trabalhados. Com salário de R$ 3.000 o ano inteiro, o 13º bruto é{" "}
                    <strong className="text-text-primary">
                      {brl.format(FULL_YEAR_EXAMPLE.gross)}
                    </strong>
                    .
                  </p>
                  <h4 className="mb-3 font-semibold text-system-info">2. 1ª parcela</h4>
                  <p className="text-sm text-text-secondary">
                    Metade do bruto, sem descontos:{" "}
                    <strong className="text-text-primary">
                      {brl.format(FULL_YEAR_EXAMPLE.firstInstallment)}
                    </strong>{" "}
                    até 30 de novembro.
                  </p>
                </div>
                <div>
                  <h4 className="mb-3 font-semibold text-system-error">3. Descontos</h4>
                  <p className="mb-4 text-sm text-text-secondary">
                    O INSS incide sobre o 13º inteiro, faixa a faixa:{" "}
                    <strong className="text-text-primary">
                      {brl.format(FULL_YEAR_EXAMPLE.inss.contribution)}
                    </strong>
                    . O Imposto de Renda, neste exemplo, é zero: a base fica dentro da faixa de
                    isenção.
                  </p>
                  <h4 className="mb-3 font-semibold text-system-success">4. 2ª parcela</h4>
                  <p className="text-sm text-text-secondary">
                    A outra metade menos os descontos:{" "}
                    <strong className="text-text-primary">
                      {brl.format(FULL_YEAR_EXAMPLE.secondInstallment)}
                    </strong>
                    . O total líquido é{" "}
                    <strong className="text-growth-green">
                      {brl.format(FULL_YEAR_EXAMPLE.net)}
                    </strong>
                    .
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-growth-green/20 bg-gray-900 p-6">
              <h3 className="mb-4 text-xl font-bold text-growth-green">
                🗓️ 13º proporcional: quem trabalhou menos de 12 meses
              </h3>
              <p className="mb-4 text-sm text-text-secondary">
                Cada mês com 15 dias ou mais de trabalho vale 1/12 do salário. Quem foi contratado
                no início de agosto tem 5 meses no ano (agosto a dezembro). Com salário de R$ 3.000,
                o 13º proporcional é{" "}
                <strong className="text-text-primary">
                  {brl.format(PROPORTIONAL_EXAMPLE.gross)}
                </strong>{" "}
                bruto e{" "}
                <strong className="text-growth-green">
                  {brl.format(PROPORTIONAL_EXAMPLE.net)}
                </strong>{" "}
                líquido. Para contar os dias de um período, use a{" "}
                <Link to="/calculadoras/datas/diferenca-entre-datas" className={linkClass}>
                  calculadora de diferença entre datas
                </Link>
                .
              </p>
              <p className="text-sm text-text-secondary">
                Na demissão sem justa causa, o 13º proporcional entra nas verbas rescisórias, junto
                com o aviso prévio indenizado, que conta como mais um mês. Para simular tudo de uma
                vez, use a{" "}
                <Link to="/calculadoras/trabalhista/rescisao" className={linkClass}>
                  calculadora de rescisão
                </Link>
                .
              </p>
            </div>

            <div className="rounded-xl border border-system-warning/20 bg-gray-900 p-6">
              <h3 className="mb-4 text-xl font-bold text-system-warning">
                🆕 Isenção de IR até R$ 5 mil no 13º
              </h3>
              <p className="mb-4 text-sm text-text-secondary">
                Desde janeiro de 2026, a Lei 15.270/2025 dá uma redução no Imposto de Renda de quem
                ganha até {brl.format(IRRF_REDUCTION.phaseOutUpTo)} por mês, e o mesmo vale para o
                13º. Com 13º bruto de até {brl.format(IRRF_REDUCTION.fullUpTo)}, o IR é zerado.
                Entre {brl.format(IRRF_REDUCTION.fullUpTo + 0.01)} e{" "}
                {brl.format(IRRF_REDUCTION.phaseOutUpTo)}, a redução é de R${" "}
                {IRRF_REDUCTION.constant.toLocaleString("pt-BR")} menos{" "}
                {IRRF_REDUCTION.factor.toLocaleString("pt-BR", { maximumFractionDigits: 6 })} × o
                valor bruto.
              </p>
              <p className="text-sm text-text-secondary">
                Exemplo: com 13º de R$ 6.000, o imposto pela tabela seria de{" "}
                {brl.format(REDUCTION_EXAMPLE.irrf.taxBeforeReduction)}. A redução de{" "}
                {brl.format(REDUCTION_EXAMPLE.irrf.reduction)} faz o IR cair para{" "}
                <strong className="text-text-primary">
                  {brl.format(REDUCTION_EXAMPLE.irrf.tax)}
                </strong>
                .
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tabela de referência */}
      <Card className="border border-neutral-surface-variant bg-background-dark-secondary">
        <CardHeader>
          <CardTitle as="h2" className="text-xl font-bold text-text-primary">
            📊 Tabela do 13º Salário Líquido {YEAR} por Faixa de Salário
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4 text-sm text-text-secondary">
            Valores para 12 meses trabalhados, sem dependentes e sem horas extras:
          </p>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[560px] border-collapse text-sm">
              <thead>
                <tr className="border-b-2 border-neutral-surface-variant">
                  <th className="p-3 text-left font-semibold">Salário bruto</th>
                  <th className="p-3 text-right font-semibold text-primary-blue-dark">
                    1ª parcela
                  </th>
                  <th className="p-3 text-right font-semibold text-system-error">INSS</th>
                  <th className="p-3 text-right font-semibold text-system-warning">IR</th>
                  <th className="p-3 text-right font-semibold text-growth-green">2ª parcela</th>
                  <th className="p-3 text-right font-semibold">Líquido</th>
                </tr>
              </thead>
              <tbody>
                {REFERENCE_ROWS.map(({ salary, result }) => (
                  <tr key={salary} className="border-b border-neutral-surface-variant">
                    <td className="p-3 font-medium">
                      {brl.format(salary)}
                      {salary === MINIMUM_WAGE && (
                        <span className="block text-xs text-gray-400">salário mínimo</span>
                      )}
                    </td>
                    <td className="p-3 text-right">{brl.format(result.firstInstallment)}</td>
                    <td className="p-3 text-right">{brl.format(result.inss.contribution)}</td>
                    <td className="p-3 text-right">{brl.format(result.irrf.tax)}</td>
                    <td className="p-3 text-right">{brl.format(result.secondInstallment)}</td>
                    <td className="p-3 text-right font-semibold text-growth-green">
                      {brl.format(result.net)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Tabelas oficiais */}
      <Card className="border border-neutral-surface-variant bg-background-dark-secondary">
        <CardHeader>
          <CardTitle as="h2" className="text-xl font-bold text-text-primary">
            🧾 Tabelas de INSS e IRRF {YEAR} Usadas no 13º
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <div>
              <h3 className="mb-3 font-semibold text-system-error">INSS (empregado CLT)</h3>
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-neutral-surface-variant text-left text-text-secondary">
                    <th className="py-2 font-medium">Faixa de salário</th>
                    <th className="py-2 text-right font-medium">Alíquota</th>
                  </tr>
                </thead>
                <tbody>
                  {INSS_BRACKETS.map((bracket, i) => (
                    <tr key={bracket.upTo} className="border-b border-neutral-surface-variant/50">
                      <td className="py-2">
                        {formatRange(i === 0 ? 0 : INSS_BRACKETS[i - 1].upTo + 0.01, bracket.upTo)}
                      </td>
                      <td className="py-2 text-right">{pct.format(bracket.rate)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <p className="mt-2 text-xs text-gray-400">
                Teto de {brl.format(INSS_CEILING)}: o desconto máximo é de {brl.format(INSS_MAX)}.
              </p>
            </div>
            <div>
              <h3 className="mb-3 font-semibold text-system-warning">IRRF mensal</h3>
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-neutral-surface-variant text-left text-text-secondary">
                    <th className="py-2 font-medium">Base de cálculo</th>
                    <th className="py-2 text-right font-medium">Alíquota</th>
                    <th className="py-2 text-right font-medium">Deduzir</th>
                  </tr>
                </thead>
                <tbody>
                  {IRRF_BRACKETS.map((bracket, i) => (
                    <tr key={bracket.upTo} className="border-b border-neutral-surface-variant/50">
                      <td className="py-2">
                        {i === 0
                          ? `até ${brl.format(bracket.upTo)}`
                          : formatRange(IRRF_BRACKETS[i - 1].upTo + 0.01, bracket.upTo)}
                      </td>
                      <td className="py-2 text-right">
                        {bracket.rate === 0 ? "Isento" : pct.format(bracket.rate)}
                      </td>
                      <td className="py-2 text-right">
                        {bracket.deduction ? brl.format(bracket.deduction) : "—"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <p className="mt-2 text-xs text-gray-400">
                Dedução por dependente: {brl.format(IRRF_DEPENDENT_DEDUCTION)}. Desconto
                simplificado: {brl.format(IRRF_SIMPLIFIED_DISCOUNT)}, usado quando é maior que as
                deduções.
              </p>
            </div>
          </div>
          <p className="mt-6 text-sm text-text-secondary">
            Para ver o desconto no salário de todo mês, use a{" "}
            <Link to="/calculadoras/trabalhista/salario-liquido" className={linkClass}>
              calculadora de salário líquido
            </Link>
            . Se vai tirar férias e quer adiantar a 1ª parcela do 13º, simule na{" "}
            <Link to="/calculadoras/trabalhista/ferias-decimo-terceiro" className={linkClass}>
              calculadora de férias
            </Link>
            .
          </p>
        </CardContent>
      </Card>

      <FAQ
        title="Perguntas Frequentes sobre o 13º Salário"
        items={FAQ_ITEMS.map((item, index) => ({
          ...item,
          borderColor: FAQ_BORDER_COLORS[index % FAQ_BORDER_COLORS.length],
        }))}
        tipSection={{
          title: "Dica para planejar o 13º",
          content:
            "<strong>Confira o holerite de dezembro:</strong> a 2ª parcela deve mostrar o 13º bruto inteiro, o desconto da 1ª parcela já paga, o INSS e o IR. Se o valor não bater com esta simulação, peça ao RH o cálculo das médias de horas extras e comissões.",
        }}
        footerText="<strong>Lembre-se:</strong> o FGTS de 8% sobre o 13º é depositado pela empresa e não sai do seu bolso."
      />

      <SourcesAndUpdate
        updatedAt={LABOR_TAX_REVIEWED_AT}
        reviewNote={`Tabelas de INSS e IRRF de ${YEAR} conferidas com as fontes oficiais`}
        sources={[
          LABOR_TAX_SOURCES.lei4090,
          LABOR_TAX_SOURCES.lei4749,
          LABOR_TAX_SOURCES.decreto57155,
          LABOR_TAX_SOURCES.inss,
          LABOR_TAX_SOURCES.irrf,
          LABOR_TAX_SOURCES.lei15270,
        ]}
      />

      <Card className="border-l-4 border-primary-blue bg-primary-blue-light">
        <CardHeader>
          <CardTitle as="h2" className="text-lg font-bold text-text-primary">
            📚 Como Usar Esta Calculadora de 13º Salário
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 text-sm text-text-secondary">
            <p>
              Informe o <strong className="text-primary-blue-dark">salário bruto</strong>, a{" "}
              <strong className="text-primary-blue-dark">média de variáveis</strong> (se houver), os{" "}
              <strong className="text-primary-blue-dark">meses trabalhados</strong> no ano e os
              dependentes no Imposto de Renda. Clique em Calcular para ver o valor líquido, as duas
              parcelas e o detalhamento do INSS e do IR.
            </p>
            <p>
              <strong>Funcionalidades:</strong> 13º integral e proporcional, 1ª e 2ª parcela, INSS
              faixa a faixa, IR com desconto simplificado e redução da Lei 15.270/2025, e FGTS
              depositado pela empresa. Conheça também as outras{" "}
              <Link to="/calculadoras/trabalhista" className={linkClass}>
                calculadoras trabalhistas
              </Link>
              .
            </p>
            <p className="mt-4 border-t border-primary-blue/20 pt-3 text-xs opacity-75">
              🧾 Tabelas {YEAR} • 🔒 Dados não armazenados • 📱 Compatível com todos os dispositivos
            </p>
          </div>
        </CardContent>
      </Card>

      <RelatedCalculators category="trabalhista" currentCalculatorId="decimo-terceiro" />
    </div>
  );
}
