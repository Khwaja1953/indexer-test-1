export async function proxyProductRequest(request: Request, targetUrl: string) {
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
    method: "GET",
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

export async function proxyProductHead(request: Request, targetUrl: string) {
  const response = await proxyProductRequest(request, targetUrl);

  return new Response(null, {
    status: response.status,
    statusText: response.statusText,
    headers: response.headers,
  });
}
