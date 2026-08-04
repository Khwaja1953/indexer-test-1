export const productProxies: Record<string, string> = {
  "pocket-power-bank": "https://fusionlabs.space/git-github-for-devops-beginners/",
};

export function isProxiedProduct(slug: string) {
  return slug in productProxies;
}
