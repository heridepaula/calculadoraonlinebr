import type { LoaderFunction } from "@remix-run/node";
import { redirect } from "@remix-run/node";

export const loader: LoaderFunction = async () => {
  return redirect("/calculadoras/trabalhista/salario-liquido", { status: 301 });
};

export default function RedirectRoute() {
  return null;
}