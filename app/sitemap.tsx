import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const url = "https://calculadoraonlinebr.com.br";
  const currentDate = new Date();
  
  return [
    {
      url: `${url}/`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${url}/calculadoras/calculadora-juros-compostos`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${url}/calculadoras/calculadora-imc`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${url}/calculadoras/regra-de-tres-simples`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${url}/calculadoras/calculadora-rescisao`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${url}/sobre`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.3,
    },
    {
      url: `${url}/privacidade`,
      lastModified: currentDate,
      changeFrequency: "yearly",
      priority: 0.1,
    },
  ];
}
