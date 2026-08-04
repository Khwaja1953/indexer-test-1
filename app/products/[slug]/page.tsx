import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import products from "@/data/products.json";
import {
  focusNotebookExternalUrl,
  focusNotebookSitemapPath,
} from "@/lib/focus-notebook-links";
import { isProxiedProduct } from "@/lib/product-proxies";
import { getSiteUrl } from "@/lib/site-url";

type ProductPageProps = { params: Promise<{ slug: string }> };

const money = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0,
});

export function generateStaticParams() {
  return products
    .filter((product) => !isProxiedProduct(product.slug))
    .map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  if (isProxiedProduct(slug)) notFound();
  const product = products.find((item) => item.slug === slug);
  if (!product) return {};
  const siteUrl = getSiteUrl();
  const productUrl = `${siteUrl}/products/${product.slug}`;
  const productImageUrl = `${siteUrl}${product.image}`;

  return {
    title: product.name,
    description: product.shortDescription,
    alternates: { canonical: productUrl },
    openGraph: {
      type: "website",
      url: productUrl,
      title: product.name,
      description: product.shortDescription,
      siteName: "Field Supply",
      images: [
        {
          url: productImageUrl,
          width: 1200,
          height: 900,
          alt: product.name,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: product.name,
      description: product.shortDescription,
      images: [productImageUrl],
    },
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  if (isProxiedProduct(slug)) notFound();
  const product = products.find((item) => item.slug === slug);
  if (!product) notFound();
  const siteUrl = getSiteUrl();
  const productUrl = `${siteUrl}/products/${product.slug}`;
  const productImageUrl = `${siteUrl}${product.image}`;
  const focusNotebookLinks =
    product.slug === "focus-notebook"
      ? {
          externalUrl: focusNotebookExternalUrl,
          sitemapUrl: `${siteUrl}${focusNotebookSitemapPath}`,
        }
      : null;
  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    image: [productImageUrl],
    description: product.description,
    category: product.category,
    sku: product.slug,
    url: productUrl,
    brand: {
      "@type": "Brand",
      name: "Field Supply",
    },
    offers: {
      "@type": "Offer",
      price: product.price,
      priceCurrency: "INR",
      availability: "https://schema.org/InStock",
      url: productUrl,
    },
    ...(focusNotebookLinks
      ? { sameAs: [focusNotebookLinks.externalUrl, focusNotebookLinks.sitemapUrl] }
      : {}),
  };
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: siteUrl,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: product.name,
        item: productUrl,
      },
    ],
  };

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <header className="site-header">
        <Link className="brand" href="/">
          <span className="brand-mark">FS</span>
          <span>Field Supply</span>
        </Link>
        <Link className="header-link" href="/#catalog">All products ↘</Link>
      </header>

      <article className="product-detail">
        <Link className="back-link" href="/#catalog">← Back to collection</Link>
        <div className="product-detail-grid">
          <div className={`product-detail-visual product-visual--${product.tone}`}>
            <span className="product-number">{product.category}</span>
            <Image
              className="product-image"
              src={product.image}
              alt={product.name}
              width="1200"
              height="900"
              priority
            />
          </div>
          <div className="product-detail-copy">
            <p className="eyebrow">{product.category}</p>
            <h1>{product.name}</h1>
            <p className="detail-price">{money.format(product.price)}</p>
            <p className="detail-description">{product.description}</p>
            <ul className="feature-list">
              {product.features.map((feature) => <li key={feature}>{feature}</li>)}
            </ul>
            <p className="detail-note">
              Demo catalog content — replace this product data with your database or API later.
            </p>
            {focusNotebookLinks ? (
              <div className="detail-links" aria-label="Focus Notebook links">
                <Link href={focusNotebookSitemapPath}>Focus Notebook XML</Link>
                <a href={focusNotebookExternalUrl}>Docker fundamentals</a>
              </div>
            ) : null}
          </div>
        </div>
      </article>
    </main>
  );
}
