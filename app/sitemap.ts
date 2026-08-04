import type { MetadataRoute } from "next";
import products from "@/data/products.json";
import { getSiteUrl } from "@/lib/site-url";
import { isRedirectedProduct } from "@/lib/product-redirects";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = getSiteUrl();
  const indexableProducts = products.filter(
    (product) => !isRedirectedProduct(product.slug),
  );
  const latestProductUpdate = products.reduce((latest, product) => {
    const updatedAt = new Date(product.updatedAt);
    return updatedAt > latest ? updatedAt : latest;
  }, new Date("2026-08-03"));

  return [
    {
      url: siteUrl,
      lastModified: latestProductUpdate,
      changeFrequency: "weekly",
      priority: 1,
    },
    ...indexableProducts.map((product) => ({
      url: `${siteUrl}/products/${product.slug}`,
      lastModified: new Date(product.updatedAt),
      changeFrequency: "monthly" as const,
      priority: 0.8,
      images: [`${siteUrl}${product.image}`],
    })),
  ];
}
