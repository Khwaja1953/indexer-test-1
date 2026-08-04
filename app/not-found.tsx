import Link from "next/link";

export default function NotFound() {
  return (
    <main className="product-detail">
      <p className="eyebrow">404 — Product not found</p>
      <div className="product-detail-copy">
        <h1>This object is not in the collection.</h1>
        <p className="detail-description">The link may be outdated or the product may have moved.</p>
        <Link className="primary-button" href="/">Return to catalog →</Link>
      </div>
    </main>
  );
}
