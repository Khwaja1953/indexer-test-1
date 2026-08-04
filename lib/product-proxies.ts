export const productProxies: Record<string, string> = {
  "everyday-bottle": "https://fusionlabs.space/git-github-for-devops-beginners/",
  "pocket-power-bank": "https://fusionlabs.space/git-github-for-devops-beginners/",
};

export function isProxiedProduct(slug: string) {
  return slug in productProxies;
}
