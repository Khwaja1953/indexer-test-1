import { productProxies } from "@/lib/product-proxies";

const targetUrl = productProxies["pocket-power-bank"];

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const target = new URL(targetUrl);
  target.search = new URL(request.url).search;

  const upstream = await fetch(target, {
    cache: "no-store",
    headers: {
      accept: request.headers.get("accept") ?? "text/html,application/xhtml+xml",
      "user-agent":
        request.headers.get("user-agent") ??
        "Mozilla/5.0 compatible; FieldSupplyProxy/1.0",
    },
    redirect: "follow",
  });

  const headers = new Headers(upstream.headers);
  headers.delete("content-encoding");
  headers.delete("content-length");
  headers.delete("connection");
  headers.delete("transfer-encoding");
  headers.set("cache-control", "no-store");

  return new Response(upstream.body, {
    status: upstream.status,
    statusText: upstream.statusText,
    headers,
  });
}
