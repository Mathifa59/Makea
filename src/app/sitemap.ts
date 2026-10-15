import type { MetadataRoute } from "next";
import { site } from "@/config/site";

/** Sitio de una sola página: una única URL canónica. */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: site.url,
      changeFrequency: "monthly",
      priority: 1,
      images: [`${site.url}/opengraph-image.jpg`],
    },
  ];
}
