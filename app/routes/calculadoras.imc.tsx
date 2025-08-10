import type { LoaderFunctionArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";

export async function loader({ request }: LoaderFunctionArgs) {
  // Redirect old IMC route to new structure
  return redirect("/calculadora/saude/imc", 301);
}