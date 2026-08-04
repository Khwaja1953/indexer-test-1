export const productProxies: Record<string, string> = {
  "canvas-carryall": "https://fusionlabs.space/networking-fundamentals-for-devops/",
  "everyday-bottle": "https://fusionlabs.space/git-github-for-devops-beginners/",
  "pocket-power-bank": "https://fusionlabs.space/git-github-for-devops-beginners/",
};

export function isProxiedProduct(slug: string) {
  return slug in productProxies;
}
