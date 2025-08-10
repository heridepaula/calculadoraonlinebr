import type { MetaFunction } from "@remix-run/node";
import { Link, Outlet } from "@remix-run/react";
import { Card, CardHeader, CardTitle, CardContent } from "~/components/ui";
import { APP_NAME, CALCULATORS } from "~/lib/constants";
import type { Calculator } from "~/types";

export const meta: MetaFunction = () => {
  return [
    { title: `Todas as Calculadoras - ${APP_NAME}` },
    {
      name: "description",
      content: "Acesse todas as nossas calculadoras online gratuitas em um só lugar",
    },
  ];
};

export default function Calculadoras() {
  return (
    <div className="space-y-8">
      {/* Renderizar rota filha (calculadora específica) se existir */}
      <Outlet />
    </div>
  );
}
