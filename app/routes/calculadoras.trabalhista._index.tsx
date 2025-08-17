import type { MetaFunction } from "@remix-run/node";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  Breadcrumb,
  BreadcrumbItem,
} from "~/components/ui";
import { RelatedCalculators } from "~/components/RelatedCalculators";
import { CalculatorCard } from "~/components/CalculatorCard";
import { APP_NAME, CALCULATORS } from "~/lib/constants";
import type { Calculator } from "~/types";

export const meta: MetaFunction = () => {
  return [
    { title: `Calculadoras Trabalhistas - ${APP_NAME}` },
    {
      name: "description",
      content:
        "★ Calculadoras trabalhistas GRATUITAS para direitos trabalhistas e relações de trabalho. Rescisão trabalhista, férias, 13º salário e muito mais. Ferramentas precisas com base na CLT.",
    },
    {
      name: "keywords",
      content:
        "calculadora trabalhista, rescisão trabalhista, direitos trabalhistas, CLT, demissão sem justa causa, aviso prévio, FGTS, seguro desemprego, férias proporcionais, 13º salário, acordo mútuo, pedido demissão, cálculo trabalhista, direito do trabalho",
    },
    { name: "author", content: "Calculadora Online BR" },
    { property: "og:title", content: `Calculadoras Trabalhistas - ${APP_NAME}` },
    {
      property: "og:description",
      content:
        "Conheça seus direitos trabalhistas com nossas calculadoras especializadas. Grátis e baseado na legislação brasileira.",
    },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary" },
    { name: "twitter:title", content: `Calculadoras Trabalhistas - ${APP_NAME}` },
    {
      name: "twitter:description",
      content:
        "Ferramentas trabalhistas gratuitas para calcular rescisão, direitos e benefícios conforme a CLT.",
    },
  ];
};

export default function TrabalhistaIndex() {
  const trabalhistaCalculators = CALCULATORS.filter(
    (calc: Calculator) => calc.category === "trabalhista"
  );

  return (
    <div className="space-y-8">
      <Breadcrumb>
        <BreadcrumbItem href="/">Início</BreadcrumbItem>
        <BreadcrumbItem href="/calculadoras">Calculadoras</BreadcrumbItem>
        <BreadcrumbItem isLast>Trabalhista</BreadcrumbItem>
      </Breadcrumb>

      <header className="space-y-4 text-center">
        <div className="mb-4 flex items-center justify-center space-x-3">
          <span className="text-5xl" role="img" aria-label="Trabalhista">
            ⚖️
          </span>
          <h1 className="text-3xl font-bold text-text-primary md:text-4xl">
            Calculadoras Trabalhistas
          </h1>
        </div>
        <p className="mx-auto max-w-3xl text-lg text-text-secondary-dark">
          Conheça e calcule seus direitos trabalhistas com base na legislação brasileira.
          Ferramentas para
          <strong className="text-growth-green">
            {" "}
            rescisão, benefícios e relações de trabalho
          </strong>
          que garantem o cumprimento da CLT.
        </p>
      </header>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {trabalhistaCalculators.map((calculator) => (
          <CalculatorCard key={calculator.id} calculator={calculator} />
        ))}
      </div>

      <section className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <Card className="border-l-4 border-primary-blue bg-primary-blue-light">
          <CardHeader>
            <CardTitle as="h2" className="text-xl">
              ⚖️ Por que conhecer seus direitos trabalhistas?
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 text-sm text-text-secondary">
              <p>
                <strong className="text-primary-blue-dark">Proteção:</strong> Evite prejuízos em
                rescisões e demissões
              </p>
              <p>
                <strong className="text-primary-blue-dark">Planejamento:</strong> Calcule seus
                benefícios e direitos antecipadamente
              </p>
              <p>
                <strong className="text-primary-blue-dark">Transparência:</strong> Entenda cada
                valor na sua rescisão trabalhista
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-growth-green bg-growth-green-soft">
          <CardHeader>
            <CardTitle as="h2" className="text-xl">
              📜 Baseado na legislação brasileira
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 text-sm text-text-secondary">
              <p>
                <strong className="text-growth-green">CLT:</strong> Seguimos rigorosamente a
                Consolidação das Leis do Trabalho
              </p>
              <p>
                <strong className="text-growth-green">Atualizado:</strong> Fórmulas baseadas na
                legislação vigente
              </p>
              <p>
                <strong className="text-growth-green">Precisão:</strong> Cálculos validados por
                especialistas trabalhistas
              </p>
            </div>
          </CardContent>
        </Card>
      </section>

      <section className="rounded-lg border-l-4 border-system-warning bg-system-warning/10 p-6 duration-300">
        <h3 className="mb-2 flex items-center text-lg font-semibold text-text-primary-dark">
          ⚠️ Aviso Importante
        </h3>
        <p className="text-sm text-text-secondary-dark">
          Nossas calculadoras são ferramentas informativas baseadas na legislação trabalhista
          brasileira atual. Os resultados{" "}
          <strong>não substituem orientação jurídica profissional</strong>. Para situações
          específicas ou dúvidas jurídicas complexas, sempre consulte um advogado trabalhista
          qualificado.
        </p>
      </section>

      <RelatedCalculators category="trabalhista" />
    </div>
  );
}
