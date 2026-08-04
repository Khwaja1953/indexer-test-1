export function getSiteUrl() {
  const configuredUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://dgcircle.com";
  return configuredUrl.replace(/\/$/, "");
}
