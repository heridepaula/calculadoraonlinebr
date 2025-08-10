import type { LoaderFunctionArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";

export async function loader({ request }: LoaderFunctionArgs) {
  // Redirect old interest route to new structure
  return redirect("/calculadora/financas/juros", 301);
}