import type { MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";
import { DirectAnswer, FAQ, RelatedCalculators } from "~/components";
import {
  Breadcrumb,
  BreadcrumbItem,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "~/components/ui";
import { PhevTripCostCalculator } from "~/components/calculators/PhevTripCostCalculator";
import { APP_NAME, APP_URL } from "~/lib/constants";
import { CALCULATOR_SEO_DATA } from "~/lib/calculator-seo";
import { calculatePhevTripCost } from "~/lib/phev-trip-cost";
import { generateFAQStructuredData } from "~/lib/structured-data";
import { buildCalculatorMeta } from "~/lib/page-meta";

const SEO = CALCULATOR_SEO_DATA["custo-misto-phev"];
const PAGE_URL = SEO.canonicalUrl;

// Carro e preços do exemplo, usados em todo o conteúdo educativo e calculados pela mesma função
const CAR = {
  evBatteryRangeKm: 50,
  evEfficiencyKmPerKwh: 5,
  hybridEfficiencyKmPerLiter: 16,
  energyCostPerKwh: 0.9,
  fuelPricePerLiter: 6,
} as const;
const EXAMPLE = calculatePhevTripCost({ ...CAR, totalDistanceKm: 120 });
const EXAMPLE_NO_CHARGE = calculatePhevTripCost({
  ...CAR,
  evBatteryRangeKm: 0,
  totalDistanceKm: 120,
});
const TRIP_SAVING = EXAMPLE_NO_CHARGE.totalCost - EXAMPLE.totalCost;

// Custo por km de cada modo e a tarifa em que a recarga deixa de compensar
const EV_COST_PER_KM = CAR.energyCostPerKwh / CAR.evEfficiencyKmPerKwh;
const HYBRID_COST_PER_KM = CAR.fuelPricePerLiter / CAR.hybridEfficiencyKmPerLiter;
const BREAK_EVEN_TARIFF = HYBRID_COST_PER_KM * CAR.evEfficiencyKmPerKwh;

const TRIP_SCENARIOS = [30, 50, 120, 300].map((totalDistanceKm) => ({
  totalDistanceKm,
  result: calculatePhevTripCost({ ...CAR, totalDistanceKm }),
}));

const brl = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" });
const num1 = new Intl.NumberFormat("pt-BR", { minimumFractionDigits: 1, maximumFractionDigits: 1 });
const num0 = new Intl.NumberFormat("pt-BR", { maximumFractionDigits: 0 });

const FAQ_ITEMS = [
  {
    question: "Como calcular o consumo real de um carro híbrido plug-in (PHEV)?",
    answer: `Divida o trajeto em duas partes: os km rodados com a bateria e os km rodados com o motor a combustão. Some o gasto de cada parte (km ÷ km/kWh × tarifa e km ÷ km/L × preço do litro) e divida pelo total de km. Exemplo: em 120 km com 50 km de autonomia elétrica, o custo é ${brl.format(EXAMPLE.totalCost)}, ou ${brl.format(EXAMPLE.costPerKm)} por km, o que equivale a ${num1.format(EXAMPLE.equivalentKmPerLiter)} km/L.`,
  },
  {
    question: "Vale a pena recarregar a bateria do PHEV na viagem ou rodar no modo híbrido?",
    answer: `Depende da tarifa. Com o carro do exemplo, rodar na bateria custa ${brl.format(EV_COST_PER_KM)} por km contra ${brl.format(HYBRID_COST_PER_KM)} por km no modo híbrido. A recarga só deixa de compensar se o kWh passar de cerca de ${brl.format(BREAK_EVEN_TARIFF)}, algo raro em casa, mas possível em eletropostos rápidos. Nos 120 km do exemplo, sair com a bateria carregada economiza ${brl.format(TRIP_SAVING)} por viagem.`,
  },
  {
    question: "O que acontece quando a bateria do híbrido plug-in acaba durante o trajeto?",
    answer:
      "O carro continua rodando normalmente: o motor a combustão assume e passa a funcionar como um híbrido comum, às vezes recarregando um pouco a bateria. Você não fica parado, mas o custo por km sobe, porque cada km passa a ser pago em combustível. A calculadora representa isso na parte do trajeto que passa da autonomia elétrica.",
  },
  {
    question: "Qual autonomia elétrica devo informar?",
    answer:
      "Informe quanto a bateria cobre no momento em que você sai, conforme o painel. Se ela estiver vazia, use 0. O valor de catálogo costuma ser otimista: velocidade alta, ar-condicionado e subidas reduzem a autonomia real.",
  },
  {
    question: "Qual consumo devo informar no modo híbrido?",
    answer:
      "Use a média que o painel mostra rodando com a bateria descarregada, em km/L. Ela costuma ser diferente da média anunciada pelo fabricante, que mistura bateria e combustão. Quanto mais próximo do seu uso real, mais fiel o custo do trecho feito no posto.",
  },
  {
    question: "A calculadora considera manutenção, IPVA e a compra do carro?",
    answer:
      "Não. Ela compara apenas o custo de energia e combustível do trajeto. Para somar preço do carro, manutenção, IPVA e payback, use a calculadora de carro elétrico vs combustão.",
  },
];

export const meta: MetaFunction = () => [
  ...buildCalculatorMeta("custo-misto-phev"),
  {
    "script:ld+json": {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      name: "Calculadora de Custo de Viagem para Híbrido Plug-in (PHEV)",
      url: PAGE_URL,
      description: SEO.description,
      applicationCategory: "UtilitiesApplication",
      operatingSystem: "Web",
      inLanguage: "pt-BR",
      isAccessibleForFree: true,
      offers: { "@type": "Offer", price: "0", priceCurrency: "BRL" },
      featureList: [
        "Custo total do trajeto de um híbrido plug-in",
        "Custo por quilômetro rodado",
        "Divisão do gasto entre tomada e posto",
        "Divisão do trajeto entre modo elétrico e híbrido",
        "Rendimento equivalente ponderado em km/L",
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
        {
          "@type": "ListItem",
          position: 4,
          name: "Custo de Híbrido Plug-in (PHEV)",
          item: PAGE_URL,
        },
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
] as const;

const linkClass = "font-medium text-primary-blue-dark underline hover:text-primary-blue";

export default function CustoMistoPhevPage() {
  return (
    <div className="mx-auto max-w-2xl space-y-8 px-4 md:max-w-4xl lg:max-w-6xl" lang="pt-BR">
      <Breadcrumb>
        <BreadcrumbItem href="/">Início</BreadcrumbItem>
        <BreadcrumbItem href="/calculadoras">Calculadoras</BreadcrumbItem>
        <BreadcrumbItem href="/calculadoras/ferramentas">Ferramentas</BreadcrumbItem>
        <BreadcrumbItem isLast>Custo de Híbrido Plug-in (PHEV)</BreadcrumbItem>
      </Breadcrumb>

      <header className="space-y-4 text-center">
        <h1 className="mb-4 text-3xl font-bold text-text-primary md:text-4xl">
          Calculadora de Custo PHEV: Gasto de Carros Híbridos Plug-in
        </h1>
        <p className="mx-auto max-w-3xl text-lg text-text-secondary-dark">
          Descubra <strong className="text-growth-green">quanto custa cada viagem</strong> com um
          híbrido plug-in. Informe o trajeto e a autonomia da bateria para ver o gasto na{" "}
          <strong className="text-primary-blue-dark">tomada e no posto</strong> e a média em km/L
          combinada.
        </p>
        <div className="inline-block rounded-lg bg-growth-green-soft p-4 duration-300">
          <p className="text-sm font-medium text-text-primary">
            🔌 <strong>Tomada vs. posto</strong> • 🛣️ <strong>km EV vs. híbrido</strong> • 📊{" "}
            <strong>km/L ponderado</strong>
          </p>
        </div>
      </header>

      <DirectAnswer title="Como calcular o custo de um trajeto com PHEV">
        <p>
          O híbrido plug-in usa a bateria primeiro e, quando ela acaba, o motor a combustão. Custo
          do trajeto = (km no modo elétrico ÷ km/kWh × tarifa) + (km restantes ÷ km/L × preço do
          litro). Dividindo o total pela distância, você tem o custo por km.
        </p>
        <p>
          Exemplo: em 120 km, com 50 km de bateria, o carro gasta {brl.format(EXAMPLE.costEV)} na
          tomada e {brl.format(EXAMPLE.costFuel)} no posto: {brl.format(EXAMPLE.totalCost)} no
          total, equivalente a {num1.format(EXAMPLE.equivalentKmPerLiter)} km/L.
        </p>
      </DirectAnswer>

      <PhevTripCostCalculator />

      {/* Seção: guia completo */}
      <Card className="border-l-4 border-primary-blue bg-gradient-to-r from-primary-blue-light to-growth-green-soft duration-300">
        <CardHeader>
          <CardTitle as="h2" className="text-2xl font-bold text-text-primary">
            🔋 Custo do Híbrido Plug-in – Guia Completo
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
                  <h4 className="mb-3 font-semibold text-growth-green">🔍 O que é um PHEV</h4>
                  <p className="mb-4 text-sm text-text-secondary">
                    O híbrido plug-in tem bateria maior que a de um híbrido comum e pode ser
                    carregado na tomada. Em trajetos curtos, roda só na bateria; em trajetos longos,
                    combina bateria e combustão. Por isso o custo por km muda a cada viagem.
                  </p>

                  <h4 className="mb-3 font-semibold text-system-info">📊 Fórmulas</h4>
                  <ul className="mb-4 space-y-1 text-sm text-text-secondary">
                    <li>• km EV = menor valor entre distância e autonomia elétrica</li>
                    <li>• km híbrido = distância − km EV</li>
                    <li>• custo tomada = km EV ÷ km/kWh × tarifa</li>
                    <li>• custo posto = km híbrido ÷ km/L × preço do litro</li>
                    <li>• km/L ponderado = preço do litro ÷ custo por km</li>
                  </ul>
                </div>

                <div>
                  <h4 className="mb-3 font-semibold text-system-success">
                    ✅ Exemplo: 120 km, 50 km de bateria
                  </h4>
                  <ul className="mb-4 space-y-1 text-sm text-text-secondary">
                    <li>
                      • Tomada: 50 ÷ {num1.format(CAR.evEfficiencyKmPerKwh)} ×{" "}
                      {brl.format(CAR.energyCostPerKwh)} ={" "}
                      <strong className="text-text-primary">{brl.format(EXAMPLE.costEV)}</strong>
                    </li>
                    <li>
                      • Posto: 70 ÷ {num1.format(CAR.hybridEfficiencyKmPerLiter)} ×{" "}
                      {brl.format(CAR.fuelPricePerLiter)} ={" "}
                      <strong className="text-text-primary">{brl.format(EXAMPLE.costFuel)}</strong>
                    </li>
                    <li>
                      • Total:{" "}
                      <strong className="text-text-primary">{brl.format(EXAMPLE.totalCost)}</strong>{" "}
                      ({brl.format(EXAMPLE.costPerKm)}/km)
                    </li>
                  </ul>

                  <h4 className="mb-3 font-semibold text-system-warning">
                    📝 Leitura do resultado
                  </h4>
                  <ul className="space-y-1 text-sm text-text-secondary">
                    <li>• Km/L ponderado: {num1.format(EXAMPLE.equivalentKmPerLiter)} km/L</li>
                    <li>
                      • {num0.format(EXAMPLE.evCostPercentage)}% do gasto na tomada em{" "}
                      {num0.format(EXAMPLE.evDistancePercentage)}% do trajeto
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Seção: tabela por distância */}
      <Card className="border border-neutral-surface-variant bg-background-dark-secondary duration-300">
        <CardHeader>
          <CardTitle as="h2" className="text-xl font-bold text-text-primary">
            🛣️ Quanto o Tamanho do Trajeto Muda o km/L
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4 text-sm text-text-secondary">
            Mesmo carro do exemplo ({CAR.evBatteryRangeKm} km de bateria, {CAR.evEfficiencyKmPerKwh}{" "}
            km/kWh, {CAR.hybridEfficiencyKmPerLiter} km/L no híbrido), energia a{" "}
            {brl.format(CAR.energyCostPerKwh)}/kWh e combustível a{" "}
            {brl.format(CAR.fuelPricePerLiter)}/L:
          </p>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="border-b-2 border-neutral-surface-variant">
                  <th className="p-3 text-left font-semibold">Trajeto</th>
                  <th className="p-3 text-center font-semibold text-growth-green">km EV</th>
                  <th className="p-3 text-center font-semibold text-system-warning">km híbrido</th>
                  <th className="p-3 text-center font-semibold">Custo total</th>
                  <th className="p-3 text-center font-semibold text-primary-blue-dark">R$/km</th>
                  <th className="p-3 text-center font-semibold text-primary-blue-dark">km/L</th>
                </tr>
              </thead>
              <tbody>
                {TRIP_SCENARIOS.map(({ totalDistanceKm, result }, index) => (
                  <tr
                    key={totalDistanceKm}
                    className={
                      index < TRIP_SCENARIOS.length - 1
                        ? "border-b border-neutral-surface-variant"
                        : ""
                    }
                  >
                    <td className="p-3 font-medium">{num0.format(totalDistanceKm)} km</td>
                    <td className="p-3 text-center">{num0.format(result.evDistanceKm)}</td>
                    <td className="p-3 text-center">{num0.format(result.hybridDistanceKm)}</td>
                    <td className="p-3 text-center">{brl.format(result.totalCost)}</td>
                    <td className="p-3 text-center">{brl.format(result.costPerKm)}</td>
                    <td className="p-3 text-center font-semibold text-growth-green">
                      {num1.format(result.equivalentKmPerLiter)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="rounded-lg border border-growth-green/20 bg-growth-green-soft p-4">
              <h3 className="mb-2 font-bold text-growth-green">🔌 Vale recarregar?</h3>
              <p className="text-sm text-text-secondary">
                Nos 120 km do exemplo, sair com a bateria carregada custa{" "}
                <strong>{brl.format(EXAMPLE.totalCost)}</strong> contra{" "}
                <strong>{brl.format(EXAMPLE_NO_CHARGE.totalCost)}</strong> com ela vazia. A recarga
                compensa até o kWh chegar a {brl.format(BREAK_EVEN_TARIFF)}. Veja o peso de cada
                aparelho e do carregador na conta com a{" "}
                <Link to="/calculadoras/ferramentas/consumo-energia-eletrica" className={linkClass}>
                  calculadora de consumo de energia elétrica
                </Link>
                .
              </p>
            </div>
            <div className="rounded-lg border border-primary-blue/20 bg-primary-blue-light p-4">
              <h3 className="mb-2 font-bold text-primary-blue-dark">
                🚗 Compare com outros carros
              </h3>
              <p className="text-sm text-text-secondary">
                Para converter o consumo de um elétrico puro em km/L, use a{" "}
                <Link to="/calculadoras/ferramentas/equivalencia-km-kwh-km-l" className={linkClass}>
                  calculadora de equivalência km/kWh para km/L
                </Link>
                . Para somar compra, manutenção e IPVA, veja o{" "}
                <Link to="/calculadoras/ferramentas/carro-eletrico-combustao" className={linkClass}>
                  comparativo carro elétrico vs combustão
                </Link>
                .
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <FAQ
        title="Perguntas Frequentes - Custo do Híbrido Plug-in (PHEV)"
        items={FAQ_ITEMS.map((item, index) => ({
          ...item,
          borderColor: FAQ_BORDER_COLORS[index % FAQ_BORDER_COLORS.length],
        }))}
        tipSection={{
          title: "Dica para gastar menos com um PHEV",
          content:
            "<strong>Carregue antes de sair:</strong> no exemplo, cada km na bateria custa menos da metade de um km no modo híbrido. Em trajetos de até a autonomia elétrica, o gasto vem só da tomada.",
        }}
        footerText="<strong>Lembre-se:</strong> o resultado depende da autonomia que a bateria tem na hora da saída e dos preços do dia. Use valores reais do painel do carro."
      />

      <Card className="border-l-4 border-primary-blue bg-primary-blue-light duration-300">
        <CardHeader>
          <CardTitle as="h2" className="text-lg font-bold text-text-primary">
            📚 Como Usar Esta Calculadora de PHEV
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 text-sm text-text-secondary">
            <p>
              Informe a <strong className="text-primary-blue-dark">distância do trajeto</strong> e a{" "}
              <strong className="text-primary-blue-dark">autonomia elétrica atual</strong>, os
              consumos nos dois modos, a tarifa de energia e o preço do combustível, e clique em{" "}
              <strong className="text-growth-green">Calcular</strong>. Com a bateria vazia, use 0 km
              de autonomia.
            </p>
            <p>
              <strong>Funcionalidades:</strong> custo total e por km, divisão do gasto entre tomada
              e posto, divisão do trajeto entre elétrico e híbrido, km/L equivalente e resumo pronto
              para copiar.
            </p>
            <p className="mt-4 border-t border-primary-blue/20 pt-3 text-xs opacity-75">
              🔋 Cálculo instantâneo • 🔒 Dados não armazenados • 📱 Compatível com todos os
              dispositivos
            </p>
          </div>
        </CardContent>
      </Card>

      <RelatedCalculators
        category="ferramentas"
        currentCalculatorId="custo-misto-phev"
        maxItems={3}
      />
    </div>
  );
}
