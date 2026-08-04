export function getSiteUrl() {
  const configuredUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
  return configuredUrl.replace(/\/$/, "");
}
