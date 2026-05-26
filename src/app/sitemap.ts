export const dynamic = "force-static";

import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://ozinfra.com";

  const routes = [
    { path: "", priority: 1, changeFrequency: "monthly" as const },
    { path: "/about", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/services", priority: 0.9, changeFrequency: "monthly" as const },
    { path: "/contact", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/privacy", priority: 0.3, changeFrequency: "yearly" as const },
    { path: "/terms", priority: 0.3, changeFrequency: "yearly" as const },
    { path: "/compliance", priority: 0.3, changeFrequency: "yearly" as const },
    { path: "/disclaimer", priority: 0.3, changeFrequency: "yearly" as const },
    { path: "/sla", priority: 0.3, changeFrequency: "yearly" as const },
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route.path}`,
    lastModified: new Date(),
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
