import type { MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";
import { DirectAnswer, FAQ, RelatedCalculators, SourcesAndUpdate } from "~/components";
import {
  Breadcrumb,
  BreadcrumbItem,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "~/components/ui";
import { EvEquivalenceCalculator } from "~/components/calculators/EvEquivalenceCalculator";
import { APP_NAME, APP_URL } from "~/lib/constants";
import { CALCULATOR_SEO_DATA } from "~/lib/calculator-seo";
import { calculateEVEquivalence } from "~/lib/ev-equivalence";
import {
  FUEL_REFERENCE,
  VEHICLE_SOURCES,
  VEHICLE_SOURCES_REVIEWED_AT,
} from "~/lib/vehicle-sources";
import { generateFAQStructuredData } from "~/lib/structured-data";
import { buildCalculatorMeta } from "~/lib/page-meta";

const SEO = CALCULATOR_SEO_DATA["equivalencia-km-kwh-km-l"];
const PAGE_URL = SEO.canonicalUrl;

// Exemplo único usado em todo o conteúdo educativo, calculado pela mesma função da calculadora
const EXAMPLE = {
  unitMode: "km/kWh",
  evEfficiency: 5.5,
  energyCost: 0.9,
  fuelPrice: 6,
  referenceKmPerLiter: 12,
} as const;
const EXAMPLE_RESULT = calculateEVEquivalence(EXAMPLE);
const EXAMPLE_KWH_100 = 100 / EXAMPLE.evEfficiency;

// Tarifa em que o elétrico passa a custar o mesmo que o carro a combustão de referência
const BREAK_EVEN_TARIFF = (EXAMPLE.fuelPrice * EXAMPLE.evEfficiency) / EXAMPLE.referenceKmPerLiter;

const TARIFF_SCENARIOS = [
  { label: "Carregamento em casa (tarifa residencial)", energyCost: 0.9 },
  { label: "Eletroposto público em corrente alternada (AC)", energyCost: 1.5 },
  { label: "Eletroposto rápido em corrente contínua (DC)", energyCost: 2.1 },
  { label: "Eletroposto rápido premium", energyCost: 2.8 },
].map((scenario) => ({
  ...scenario,
  result: calculateEVEquivalence({ ...EXAMPLE, energyCost: scenario.energyCost }),
}));

const brl = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" });
const num1 = new Intl.NumberFormat("pt-BR", { minimumFractionDigits: 1, maximumFractionDigits: 1 });
const num2 = new Intl.NumberFormat("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

const FAQ_ITEMS = [
  {
    question: "Como funciona o cálculo de km/L equivalente em um carro elétrico?",
    answer: `O km/L equivalente compara o custo por quilômetro. Primeiro divide-se a tarifa de energia (R$/kWh) pelo consumo do elétrico (km/kWh) para obter o custo por km. Depois divide-se o preço do litro do combustível por esse custo. Exemplo: ${num1.format(EXAMPLE.evEfficiency)} km/kWh com energia a ${brl.format(EXAMPLE.energyCost)}/kWh custa ${brl.format(EXAMPLE_RESULT.costPerKmEV)} por km, o que equivale a ${num1.format(EXAMPLE_RESULT.equivalentKmPerLiter)} km/L com combustível a ${brl.format(EXAMPLE.fuelPrice)}/L.`,
  },
  {
    question: "Como converter kWh/100 km para km/kWh?",
    answer: `Divida 100 pelo consumo em kWh/100 km. Por exemplo, um carro que gasta ${num2.format(EXAMPLE_KWH_100)} kWh a cada 100 km faz 100 ÷ ${num2.format(EXAMPLE_KWH_100)} = ${num1.format(EXAMPLE.evEfficiency)} km/kWh. A conta inversa é a mesma: 100 ÷ km/kWh = kWh/100 km. A calculadora faz essa conversão sozinha ao trocar a unidade.`,
  },
  {
    question:
      "Carregar o carro elétrico em casa é sempre mais barato do que abastecer com combustível?",
    answer: `Quase sempre, mas não necessariamente. Em casa a energia costuma ser a opção mais barata. Já em eletropostos rápidos a tarifa pode subir tanto que o custo por km se aproxima do de um carro a combustão. No exemplo da calculadora (${num1.format(EXAMPLE.evEfficiency)} km/kWh, gasolina a ${brl.format(EXAMPLE.fuelPrice)}/L e carro a combustão de ${EXAMPLE.referenceKmPerLiter} km/L), o elétrico só deixa de compensar com tarifa acima de ${brl.format(BREAK_EVEN_TARIFF)}/kWh.`,
  },
  {
    question: "Como comparar o carro elétrico com um carro a etanol?",
    answer:
      "Informe o preço do litro do etanol no campo de combustível e o rendimento do carro com etanol no campo de consumo a combustão. O mesmo carro faz menos km/L com etanol do que com gasolina, então informe o rendimento dele com etanol (a tabela do PBE Veicular, do Inmetro, traz os dois). O etanol é mais barato por litro, mas rende menos, por isso a vantagem de custo do elétrico costuma diminuir.",
  },
  {
    question: "Qual é um bom consumo para um carro elétrico em km/kWh?",
    answer:
      "Depende do modelo e do uso. Velocidade alta na estrada, ar-condicionado ligado e carro mais pesado reduzem o km/kWh. O mais fiel é a média do painel do carro. A tabela do PBE Veicular, do Inmetro, informa o consumo energético dos elétricos em MJ/km, e como 1 kWh equivale a 3,6 MJ, dividir 3,6 por esse valor dá uma estimativa em km/kWh.",
  },
  {
    question: "Qual tarifa de energia devo usar no cálculo?",
    answer:
      "Em casa, use o valor do kWh que aparece na sua conta de luz, com impostos (ICMS, PIS/Cofins) e bandeira tarifária. Em eletropostos, use o preço por kWh mostrado no aplicativo da rede. Quem carrega nos dois lugares pode calcular separadamente e comparar os resultados.",
  },
  {
    question: "O km/L equivalente considera perdas no carregamento?",
    answer:
      "Só se você já considerar as perdas no consumo informado. Parte da energia que sai da tomada se perde no carregador e na bateria, então o consumo medido na tomada é maior que o mostrado pelo painel. Por isso, prefira o consumo medido pela energia que entrou na tomada (como o wallbox ou medidor mostram) em vez do valor teórico do motor.",
  },
  {
    question: "Essa comparação inclui IPVA, manutenção e seguro?",
    answer:
      "Não. A equivalência em km/L compara apenas o custo de energia por quilômetro rodado. Para incluir preço do carro, manutenção, IPVA, seguro e payback, use a calculadora de carro elétrico vs combustão.",
  },
];

export const meta: MetaFunction = () => [
  ...buildCalculatorMeta("equivalencia-km-kwh-km-l"),
  {
    "script:ld+json": {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      name: "Calculadora de Equivalência EV: km/kWh para km/L",
      url: PAGE_URL,
      description: SEO.description,
      applicationCategory: "UtilitiesApplication",
      operatingSystem: "Web",
      inLanguage: "pt-BR",
      isAccessibleForFree: true,
      offers: { "@type": "Offer", price: "0", priceCurrency: "BRL" },
      featureList: [
        "Conversão de km/kWh e kWh/100 km em km/L equivalentes",
        "Custo por quilômetro rodado no elétrico",
        "Custo para rodar 100 km no elétrico e na combustão",
        "Economia percentual contra um carro a combustão de referência",
        "Resumo pronto para copiar e compartilhar",
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
          name: "Ferramentas",
          item: `${APP_URL}/calculadoras/ferramentas`,
        },
        { "@type": "ListItem", position: 4, name: "Equivalência km/kWh para km/L", item: PAGE_URL },
      ],
    },
  },
  { "script:ld+json": generateFAQStructuredData(FAQ_ITEMS) },
];

const FAQ_BORDER_COLORS = [
  "primary-blue",
  "growth-green",
  "system-warning",
  "system-info",
  "growth-green",
  "system-error-dark",
  "primary-blue",
  "system-info",
] as const;

const linkClass = "font-medium text-primary-blue-dark underline hover:text-primary-blue";

export default function EquivalenciaKmKwhKmLPage() {
  return (
    <div className="mx-auto max-w-2xl space-y-8 px-4 md:max-w-4xl lg:max-w-6xl" lang="pt-BR">
      <Breadcrumb>
        <BreadcrumbItem href="/">Início</BreadcrumbItem>
        <BreadcrumbItem href="/calculadoras">Calculadoras</BreadcrumbItem>
        <BreadcrumbItem href="/calculadoras/ferramentas">Ferramentas</BreadcrumbItem>
        <BreadcrumbItem isLast>Equivalência km/kWh para km/L</BreadcrumbItem>
      </Breadcrumb>

      <header className="space-y-4 text-center">
        <h1 className="mb-4 text-3xl font-bold text-text-primary md:text-4xl">
          Calculadora de Equivalência EV: Converta km/kWh em km/L
        </h1>
        <p className="mx-auto max-w-3xl text-lg text-text-secondary-dark">
          Descubra{" "}
          <strong className="text-growth-green">quantos km/L o seu carro elétrico faz</strong> em
          custo. Informe o consumo, a tarifa de energia e o preço do combustível para ver o{" "}
          <strong className="text-primary-blue-dark">rendimento equivalente</strong>, o custo por
          quilômetro e a economia contra um carro a combustão.
        </p>
        <div className="inline-block rounded-lg bg-growth-green-soft p-4 duration-300">
          <p className="text-sm font-medium text-text-primary">
            ⚡ <strong>km/kWh → km/L</strong> • 💰 <strong>Custo por km</strong> • 📊{" "}
            <strong>Comparativo de 100 km</strong>
          </p>
        </div>
      </header>

      <DirectAnswer title="Como converter km/kWh em km/L">
        <p>
          km/L equivalente = preço do litro ÷ (tarifa do kWh ÷ km/kWh). Primeiro calcule o custo por
          quilômetro do elétrico dividindo a tarifa de energia pelo consumo em km/kWh; depois divida
          o preço do litro do combustível por esse custo. Se o consumo vier em kWh/100 km, converta
          antes com 100 ÷ kWh/100 km.
        </p>
        <p>
          Exemplo: {num1.format(EXAMPLE.evEfficiency)} km/kWh com energia a{" "}
          {brl.format(EXAMPLE.energyCost)}/kWh custa {brl.format(EXAMPLE_RESULT.costPerKmEV)} por
          km, o que equivale a {num1.format(EXAMPLE_RESULT.equivalentKmPerLiter)} km/L com gasolina
          a {brl.format(EXAMPLE.fuelPrice)}/L.
        </p>
      </DirectAnswer>

      <EvEquivalenceCalculator />

      {/* Seção: Guia completo */}
      <Card className="border-l-4 border-primary-blue bg-gradient-to-r from-primary-blue-light to-growth-green-soft duration-300">
        <CardHeader>
          <CardTitle as="h2" className="text-2xl font-bold text-text-primary">
            ⚡ Equivalência km/kWh em km/L – Guia Completo
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-8">
            <div className="rounded-xl border border-primary-blue/20 bg-gray-900 p-6">
              <h3 className="mb-4 flex items-center text-xl font-bold text-primary-blue-dark">
                📐 Fórmulas com Exemplo Prático
              </h3>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <h4 className="mb-3 font-semibold text-growth-green">🔍 O que é</h4>
                  <p className="mb-4 text-sm text-text-secondary">
                    Elétricos medem o consumo em km/kWh e carros a combustão em km/L, então a
                    comparação direta não é possível. A equivalência resolve isso pelo dinheiro:
                    descobre quantos km/L um carro a combustão precisaria fazer para gastar o mesmo
                    por quilômetro que o elétrico.
                  </p>

                  <h4 className="mb-3 font-semibold text-system-info">📊 Fórmulas</h4>
                  <ul className="mb-4 space-y-1 text-sm text-text-secondary">
                    <li>• km/kWh = 100 ÷ kWh/100 km</li>
                    <li>• Custo por km (EV) = tarifa ÷ km/kWh</li>
                    <li>• km/L equivalente = preço do litro ÷ custo por km</li>
                    <li>• Economia = 1 − (custo EV ÷ custo da combustão)</li>
                  </ul>
                </div>

                <div>
                  <h4 className="mb-3 font-semibold text-system-success">
                    ✅ Exemplo: {num1.format(EXAMPLE.evEfficiency)} km/kWh,{" "}
                    {brl.format(EXAMPLE.energyCost)}/kWh e {brl.format(EXAMPLE.fuelPrice)}/L
                  </h4>
                  <ul className="mb-4 space-y-1 text-sm text-text-secondary">
                    <li>
                      • Custo por km = {num2.format(EXAMPLE.energyCost)} ÷{" "}
                      {num1.format(EXAMPLE.evEfficiency)} ={" "}
                      <strong className="text-text-primary">
                        {brl.format(EXAMPLE_RESULT.costPerKmEV)}
                      </strong>
                    </li>
                    <li>
                      • km/L equivalente = {num2.format(EXAMPLE.fuelPrice)} ÷{" "}
                      {EXAMPLE_RESULT.costPerKmEV.toFixed(4).replace(".", ",")} ={" "}
                      <strong className="text-text-primary">
                        {num1.format(EXAMPLE_RESULT.equivalentKmPerLiter)} km/L
                      </strong>
                    </li>
                    <li>
                      • Em 100 km: {brl.format(EXAMPLE_RESULT.costPer100KmEV)} no elétrico contra{" "}
                      {brl.format(EXAMPLE_RESULT.costPer100KmRef)} em um carro de{" "}
                      {EXAMPLE.referenceKmPerLiter} km/L
                    </li>
                  </ul>

                  <h4 className="mb-3 font-semibold text-system-warning">
                    📝 Leitura do resultado
                  </h4>
                  <ul className="space-y-1 text-sm text-text-secondary">
                    <li>
                      • Economia de {num1.format(EXAMPLE_RESULT.savingsPercentage)}% por trajeto
                    </li>
                    <li>• Quanto maior o km/L equivalente, mais vantajoso é o elétrico</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-growth-green/20 bg-gray-900 p-6">
              <h3 className="mb-4 flex items-center text-xl font-bold text-growth-green">
                🔁 Como Converter kWh/100 km em km/kWh
              </h3>
              <p className="mb-4 text-sm text-text-secondary">
                Fabricantes europeus e americanos costumam informar o consumo em kWh/100 km. Para
                usar a fórmula, divida 100 pelo consumo. Três exemplos:
              </p>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                {[14, 18, 22].map((kwh100) => (
                  <div key={kwh100} className="rounded-lg bg-growth-green-soft p-4 text-center">
                    <div className="text-sm text-text-secondary">{kwh100} kWh/100 km</div>
                    <div className="mt-1 text-2xl font-bold text-growth-green">
                      {num2.format(100 / kwh100)} km/kWh
                    </div>
                    <div className="text-xs text-gray-400">
                      equivale a{" "}
                      {num1.format(
                        calculateEVEquivalence({
                          ...EXAMPLE,
                          unitMode: "kWh/100km",
                          evEfficiency: kwh100,
                        }).equivalentKmPerLiter
                      )}{" "}
                      km/L (exemplo)
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Seção: tabela por tarifa */}
      <Card className="border border-neutral-surface-variant bg-background-dark-secondary duration-300">
        <CardHeader>
          <CardTitle as="h2" className="text-xl font-bold text-text-primary">
            🔌 Quanto a Tarifa Muda o km/L Equivalente
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4 text-sm text-text-secondary">
            Mesmo carro do exemplo ({num1.format(EXAMPLE.evEfficiency)} km/kWh) com gasolina a{" "}
            {brl.format(EXAMPLE.fuelPrice)}/L e comparação com um carro de{" "}
            {EXAMPLE.referenceKmPerLiter} km/L. As tarifas são valores ilustrativos; use a do seu
            caso na calculadora. Como referência, na semana de {FUEL_REFERENCE.week} a ANP registrou
            a gasolina comum a {brl.format(FUEL_REFERENCE.gasoline)}/L e o etanol a{" "}
            {brl.format(FUEL_REFERENCE.ethanol)}/L, em média no Brasil.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="border-b-2 border-neutral-surface-variant">
                  <th className="p-3 text-left font-semibold">Onde carrega</th>
                  <th className="p-3 text-center font-semibold text-primary-blue-dark">Tarifa</th>
                  <th className="p-3 text-center font-semibold text-growth-green">km/L equiv.</th>
                  <th className="p-3 text-center font-semibold text-system-warning">100 km</th>
                  <th className="p-3 text-center font-semibold">Economia</th>
                </tr>
              </thead>
              <tbody>
                {TARIFF_SCENARIOS.map((row, index) => (
                  <tr
                    key={row.energyCost}
                    className={
                      index < TARIFF_SCENARIOS.length - 1
                        ? "border-b border-neutral-surface-variant"
                        : ""
                    }
                  >
                    <td className="p-3 font-medium">{row.label}</td>
                    <td className="p-3 text-center text-primary-blue-dark">
                      {brl.format(row.energyCost)}/kWh
                    </td>
                    <td className="p-3 text-center font-semibold text-growth-green">
                      {num1.format(row.result.equivalentKmPerLiter)} km/L
                    </td>
                    <td className="p-3 text-center">{brl.format(row.result.costPer100KmEV)}</td>
                    <td className="p-3 text-center">
                      {num1.format(row.result.savingsPercentage)}%
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="rounded-lg border border-growth-green/20 bg-growth-green-soft p-4">
              <h3 className="mb-2 font-bold text-growth-green">⚖️ Tarifa de equilíbrio</h3>
              <p className="text-sm text-text-secondary">
                No exemplo, o elétrico custa o mesmo que o carro a combustão quando o kWh chega a{" "}
                <strong>{brl.format(BREAK_EVEN_TARIFF)}</strong>. Abaixo disso, o elétrico sai mais
                barato por quilômetro. Descubra quanto cada aparelho e carregamento pesam na conta
                com a{" "}
                <Link to="/calculadoras/ferramentas/consumo-energia-eletrica" className={linkClass}>
                  calculadora de consumo de energia elétrica
                </Link>
                .
              </p>
            </div>
            <div className="rounded-lg border border-primary-blue/20 bg-primary-blue-light p-4">
              <h3 className="mb-2 font-bold text-primary-blue-dark">🚗 Vai além do combustível?</h3>
              <p className="text-sm text-text-secondary">
                Esta página compara só o custo de energia por km. Para somar preço do carro,
                manutenção, IPVA e calcular o payback, use a{" "}
                <Link to="/calculadoras/ferramentas/carro-eletrico-combustao" className={linkClass}>
                  calculadora de carro elétrico vs combustão
                </Link>
                . Para ver a economia como porcentagem, use a{" "}
                <Link to="/calculadoras/matematica/porcentagem" className={linkClass}>
                  calculadora de porcentagem
                </Link>
                .
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <FAQ
        title="Perguntas Frequentes - Equivalência km/kWh em km/L"
        items={FAQ_ITEMS.map((item, index) => ({
          ...item,
          borderColor: FAQ_BORDER_COLORS[index % FAQ_BORDER_COLORS.length],
        }))}
        tipSection={{
          title: "Dica para um resultado mais fiel",
          content:
            "<strong>Use o consumo real:</strong> o valor do painel do carro em uso misto é mais realista que o do catálogo. Calcule também com a tarifa do eletroposto que você mais usa, não só a de casa.",
        }}
        footerText="<strong>Lembre-se:</strong> o km/L equivalente compara custo de energia, não consumo físico. Ele varia sempre que a tarifa ou o preço do combustível mudarem."
      />

      <Card className="border-l-4 border-primary-blue bg-primary-blue-light duration-300">
        <CardHeader>
          <CardTitle as="h2" className="text-lg font-bold text-text-primary">
            📚 Como Usar Esta Calculadora de Equivalência EV
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 text-sm text-text-secondary">
            <p>
              Escolha a unidade do consumo (
              <strong className="text-primary-blue-dark">km/kWh</strong> ou{" "}
              <strong className="text-primary-blue-dark">kWh/100 km</strong>), informe a{" "}
              <strong className="text-primary-blue-dark">tarifa de energia</strong> e o{" "}
              <strong className="text-primary-blue-dark">preço do combustível</strong> e clique em{" "}
              <strong className="text-growth-green">Calcular</strong>. O consumo do carro a
              combustão é opcional e serve para o comparativo de 100 km.
            </p>
            <p>
              <strong>Funcionalidades:</strong> km/L equivalente, custo por km, custo de 100 km no
              elétrico e na combustão, economia percentual e resumo pronto para copiar.
            </p>
            <p className="mt-4 border-t border-primary-blue/20 pt-3 text-xs opacity-75">
              ⚡ Cálculo instantâneo • 🔒 Dados não armazenados • 📱 Compatível com todos os
              dispositivos
            </p>
          </div>
        </CardContent>
      </Card>

      <SourcesAndUpdate
        updatedAt={VEHICLE_SOURCES_REVIEWED_AT}
        reviewNote={`Preços de combustíveis conferidos na Síntese Semanal da ANP (${FUEL_REFERENCE.week})`}
        sourcesIntro="Os dados de referência vêm das fontes oficiais abaixo"
        sources={VEHICLE_SOURCES}
      />

      <RelatedCalculators
        category="ferramentas"
        currentCalculatorId="equivalencia-km-kwh-km-l"
        maxItems={3}
      />
    </div>
  );
}
