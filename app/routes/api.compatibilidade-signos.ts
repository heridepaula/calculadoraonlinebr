import { json } from "@remix-run/node";
import type { LoaderFunctionArgs } from "@remix-run/node";
import compatibilityData from "~/data/astrology/compatibilidade/compatibilidade-signos.json";

export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const signo1 = url.searchParams.get("signo1");
  const signo2 = url.searchParams.get("signo2");

  if (!signo1 || !signo2) {
    return json({ error: "Parâmetros signo1 e signo2 são obrigatórios" }, { status: 400 });
  }

  try {
    // Tentar encontrar a combinação nos dados JSON
    const key1 = `${signo1}-${signo2}`;
    const key2 = `${signo2}-${signo1}`;
    console.log(key1, key2);
    if (compatibilityData[key1 as keyof typeof compatibilityData]) {
      return json(compatibilityData[key1 as keyof typeof compatibilityData]);
    }

    if (compatibilityData[key2 as keyof typeof compatibilityData]) {
      return json(compatibilityData[key2 as keyof typeof compatibilityData]);
    }

    // Se não encontrar a combinação específica, retornar erro
    return json({ error: "Combinação de signos não encontrada" }, { status: 404 });
  } catch (error) {
    return json({ error: "Erro ao buscar dados de compatibilidade" }, { status: 500 });
  }
}
