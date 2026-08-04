import { productProxies } from "@/lib/product-proxies";
import { proxyProductHead, proxyProductRequest } from "@/lib/proxy-product";

const targetUrl = productProxies["canvas-carryall"];

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  return proxyProductRequest(request, targetUrl);
}

export async function HEAD(request: Request) {
  return proxyProductHead(request, targetUrl);
}
