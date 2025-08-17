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
    { title: `Calculadoras de Saúde - ${APP_NAME}` },
    {
      name: "description",
      content:
        "Calculadoras de saúde gratuitas para cuidar do seu bem-estar. IMC, peso ideal e muito mais. Ferramentas confiáveis baseadas em padrões médicos.",
    },
    {
      name: "keywords",
      content:
        "calculadora saúde, IMC, índice massa corporal, peso ideal, saúde online, calculadora médica, bem-estar",
    },
    { name: "author", content: "Calculadora Online BR" },
    { property: "og:title", content: `Calculadoras de Saúde - ${APP_NAME}` },
    {
      property: "og:description",
      content: "Monitore sua saúde com nossas calculadoras médicas gratuitas e confiáveis.",
    },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary" },
    { name: "twitter:title", content: `Calculadoras de Saúde - ${APP_NAME}` },
    {
      name: "twitter:description",
      content: "Ferramentas de saúde gratuitas para monitorar seu bem-estar.",
    },
  ];
};

export default function SaudeIndex() {
  const saudeCalculators = CALCULATORS.filter((calc: Calculator) => calc.category === "saude");

  return (
    <div className="space-y-8">
      <Breadcrumb>
        <BreadcrumbItem href="/">Início</BreadcrumbItem>
        <BreadcrumbItem href="/calculadoras">Calculadoras</BreadcrumbItem>
        <BreadcrumbItem isLast>Saúde</BreadcrumbItem>
      </Breadcrumb>

      <header className="space-y-4 text-center">
        <div className="mb-4 flex items-center justify-center space-x-3">
          <span className="text-5xl" role="img" aria-label="Saúde">
            🏥
          </span>
          <h1 className="text-3xl font-bold text-text-primary md:text-4xl">
            Calculadoras de Saúde
          </h1>
        </div>
        <p className="mx-auto max-w-3xl text-lg text-text-secondary-dark">
          Monitore sua saúde e bem-estar com nossas calculadoras baseadas em{" "}
          <strong className="text-primary-blue-dark">padrões médicos reconhecidos</strong>.
          Ferramentas confiáveis para acompanhar indicadores importantes da sua saúde.
        </p>
      </header>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {saudeCalculators.map((calculator: Calculator) => (
          <CalculatorCard key={calculator.id} calculator={calculator} category="saude" />
        ))}
      </div>

      <section className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <Card className="border-l-4 border-primary-blue bg-primary-blue-light">
          <CardHeader>
            <CardTitle as="h2" className="text-xl">
              🎯 Por que monitorar sua saúde?
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 text-sm text-text-secondary">
              <p>
                <strong className="text-primary-blue-dark">Prevenção:</strong> Identifique riscos
                antes que se tornem problemas
              </p>
              <p>
                <strong className="text-primary-blue-dark">Controle:</strong> Acompanhe a evolução
                de indicadores importantes
              </p>
              <p>
                <strong className="text-primary-blue-dark">Motivação:</strong> Veja o progresso dos
                seus hábitos saudáveis
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-growth-green bg-growth-green-soft">
          <CardHeader>
            <CardTitle as="h2" className="text-xl">
              ⚕️ Baseado em padrões médicos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 text-sm text-text-secondary">
              <p>
                <strong className="text-growth-green">OMS:</strong> Seguimos diretrizes da
                Organização Mundial da Saúde
              </p>
              <p>
                <strong className="text-growth-green">Precisão:</strong> Fórmulas validadas
                cientificamente
              </p>
              <p>
                <strong className="text-growth-green">Confiabilidade:</strong> Resultados em que
                você pode confiar
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
          Nossas calculadoras são ferramentas informativas baseadas em padrões médicos reconhecidos.
          Os resultados <strong>não substituem consulta médica profissional</strong>. Sempre
          consulte um profissional de saúde para avaliações completas e orientações personalizadas.
        </p>
      </section>

      <RelatedCalculators category="saude" />
    </div>
  );
}
