import type { LoaderFunctionArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";

export async function loader({ request }: LoaderFunctionArgs) {
  // Redirect old calculadoras route to new calculadora route
  return redirect("/calculadora", 301);
}