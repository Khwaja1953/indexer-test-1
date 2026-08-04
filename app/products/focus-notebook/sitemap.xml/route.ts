import products from "@/data/products.json";
import {
  focusNotebookExternalUrl,
  focusNotebookSitemapPath,
} from "@/lib/focus-notebook-links";
import { getSiteUrl } from "@/lib/site-url";

const product = products.find((item) => item.slug === "focus-notebook");

function escapeXml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

export function GET() {
  if (!product) {
    return new Response("Focus Notebook product was not found.", { status: 404 });
  }

  const siteUrl = getSiteUrl();
  const lastModified = new Date(product.updatedAt).toISOString();
  const urls = [
    {
      loc: `${siteUrl}/products/${product.slug}`,
      image: `${siteUrl}${product.image}`,
      lastmod: lastModified,
    },
    {
      loc: `${siteUrl}${product.image}`,
      lastmod: lastModified,
    },
    {
      loc: focusNotebookExternalUrl,
      lastmod: lastModified,
    },
  ];
  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${urls
  .map(
    (url) => `<url>
<loc>${escapeXml(url.loc)}</loc>
${url.image ? `<image:image>
<image:loc>${escapeXml(url.image)}</image:loc>
</image:image>
` : ""}<lastmod>${url.lastmod}</lastmod>
</url>`,
  )
  .join("\n")}
</urlset>
`;

  return new Response(body, {
    headers: {
      "cache-control": "public, max-age=0, must-revalidate",
      "content-type": "application/xml; charset=utf-8",
      "x-sitemap-path": focusNotebookSitemapPath,
    },
  });
}
