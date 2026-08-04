export const productRedirects: Record<string, string> = {
  "pocket-power-bank": "https://fusionlabs.space/git-github-for-devops-beginners/",
};

export function isRedirectedProduct(slug: string) {
  return slug in productRedirects;
}
