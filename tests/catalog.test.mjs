import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const products = JSON.parse(
  await readFile(new URL("../data/products.json", import.meta.url), "utf8"),
);

test("catalog has complete product records", () => {
  assert.ok(products.length >= 1);
  for (const product of products) {
    assert.match(product.slug, /^[a-z0-9]+(?:-[a-z0-9]+)*$/);
    assert.ok(product.name.length > 0);
    assert.ok(product.shortDescription.length > 0);
    assert.ok(product.description.length > 0);
    assert.match(product.image, /^\/products\/[a-z0-9-]+\.svg$/);
    assert.ok(product.price > 0);
    assert.ok(Array.isArray(product.features) && product.features.length >= 3);
    assert.ok(!Number.isNaN(Date.parse(product.updatedAt)));
  }
});

test("every product slug is unique", () => {
  const slugs = products.map((product) => product.slug);
  assert.equal(new Set(slugs).size, slugs.length);
});

test("sitemap source maps indexable product routes", async () => {
  const sitemapSource = await readFile(
    new URL("../app/sitemap.ts", import.meta.url),
    "utf8",
  );
  assert.match(sitemapSource, /isProxiedProduct/);
  assert.match(sitemapSource, /indexableProducts\.map/);
  assert.match(sitemapSource, /\/products\/\$\{product\.slug\}/);
});
