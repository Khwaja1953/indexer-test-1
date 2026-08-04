import Link from "next/link";
import products from "@/data/products.json";
import { getSiteUrl } from "@/lib/site-url";

const money = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0,
});

export default function Home() {
  const siteUrl = getSiteUrl();
  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Field Supply product catalog",
    itemListElement: products.map((product, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: `${siteUrl}/products/${product.slug}`,
      name: product.name,
    })),
  };
  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Field Supply",
    url: siteUrl,
    description:
      "A curated catalog of dependable objects for work, travel, and everyday life.",
  };

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }}
      />
      <header className="site-header">
        <Link className="brand" href="/" aria-label="Field Supply home">
          <span className="brand-mark">FS</span>
          <span>Field Supply</span>
        </Link>
        <a className="header-link" href="#catalog">
          Browse catalog <span aria-hidden="true">↘</span>
        </a>
      </header>

      <section className="hero" aria-labelledby="hero-heading">
        <div className="hero-copy">
          <p className="eyebrow">Everyday tools, thoughtfully selected</p>
          <h1 id="hero-heading">Useful things for better work and quieter days.</h1>
          <p className="hero-description">
            A small collection of dependable objects for your desk, your bag,
            and the moments between meetings.
          </p>
          <a className="primary-button" href="#catalog">
            Explore all products <span aria-hidden="true">↓</span>
          </a>
        </div>

        <div className="hero-card" aria-label="Catalog overview">
          <div className="hero-orbit hero-orbit-one" />
          <div className="hero-orbit hero-orbit-two" />
          <span className="hero-symbol">✦</span>
          <p>Curated collection</p>
          <strong>{String(products.length).padStart(2, "0")}</strong>
          <span>products available</span>
        </div>
      </section>

      <section className="catalog" id="catalog" aria-labelledby="catalog-heading">
        <div className="section-heading">
          <div>
            <p className="eyebrow">The collection</p>
            <h2 id="catalog-heading">Made to earn its place.</h2>
          </div>
          <p>
            Each object balances function, durability, and an understated
            design that works anywhere.
          </p>
          <Link className="xml-link" href="/sitemap.xml">
            Product XML
          </Link>
        </div>

        <div className="product-grid">
          {products.map((product, index) => (
            <article className="product-card" key={product.slug}>
              <Link
                className={`product-visual product-visual--${product.tone}`}
                href={`/products/${product.slug}`}
                aria-label={`View ${product.name}`}
              >
                <span className="product-number">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="product-icon" aria-hidden="true">
                  {product.symbol}
                </span>
                <span className="view-hint">View product ↗</span>
              </Link>
              <div className="product-card-copy">
                <div>
                  <p>{product.category}</p>
                  <h3>
                    <Link href={`/products/${product.slug}`}>{product.name}</Link>
                  </h3>
                </div>
                <strong>{money.format(product.price)}</strong>
              </div>
              <p className="product-summary">{product.shortDescription}</p>
            </article>
          ))}
        </div>
      </section>

      <footer>
        <div>
          <span className="brand-mark">FS</span>
          <p>Objects that make the everyday feel considered.</p>
        </div>
        <div className="footer-meta">
          <Link href="/sitemap.xml">Sitemap</Link>
          <span>© {new Date().getFullYear()} Field Supply</span>
        </div>
      </footer>
    </main>
  );
}
