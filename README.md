# Field Supply — Next.js product catalog

A responsive one-page product catalog with separate, statically generated product routes. The same dummy data powers the catalog, product pages, metadata, and XML sitemap.

## Included routes

- `/` — product listing page
- `/products/[slug]` — one page per product
- `/sitemap.xml` — homepage and every product URL
- `/robots.txt` — crawler rules and sitemap location
- `/api/health` — container/deployment health check

## Run locally

```bash
cp .env.example .env.local
npm ci
npm run dev
```

Open `http://localhost:3000`. Change `NEXT_PUBLIC_SITE_URL` in `.env.local` to the final public domain before a production build so sitemap URLs use the real domain.

## Validate locally

```bash
npm run lint
npm run typecheck
npm test
npm run build
```

## Product data

Edit `data/products.json`. Each new record automatically creates a product page through `generateStaticParams()` and a matching entry in `sitemap.xml`.

## One-time EC2 preparation

1. Launch an Ubuntu 22.04/24.04 or Amazon Linux EC2 instance.
2. Attach an Elastic IP or stable DNS name.
3. Configure its security group:
   - TCP 22 from your administrative/GitLab Runner IP range only.
   - TCP 80 from `0.0.0.0/0` and `::/0` for the website.
   - TCP 443 as well when you add HTTPS.
4. Copy `deploy/ec2-bootstrap.sh` to the instance and run it once:

```bash
chmod +x ec2-bootstrap.sh
./ec2-bootstrap.sh
```

5. Log out and back in, then confirm `docker ps` works without `sudo`.

## Required GitLab CI/CD variables

Add these under **GitLab project → Settings → CI/CD → Variables**:

| Variable | Example | Notes |
| --- | --- | --- |
| `SITE_URL` | `https://shop.example.com` | Public URL used in sitemap and deployment environment. |
| `EC2_HOST` | `ec2-xx.compute.amazonaws.com` | EC2 public DNS or Elastic IP. |
| `EC2_USER` | `ubuntu` | Use `ec2-user` for Amazon Linux. |
| `EC2_SSH_PRIVATE_KEY` | File variable | Private key dedicated to CI deployment; mark protected. |
| `EC2_KNOWN_HOSTS` | File variable | Generate with `ssh-keyscan -H <EC2_HOST>` from a trusted machine and verify the fingerprint. |

GitLab supplies `CI_REGISTRY`, `CI_REGISTRY_IMAGE`, `CI_REGISTRY_USER`, and `CI_REGISTRY_PASSWORD` automatically when the project container registry is enabled.

## Pipeline flow

1. `lint` checks ESLint and TypeScript.
2. `test` validates the product data and sitemap mapping.
3. `build_app` creates the production Next.js build.
4. `publish_image` builds the multi-stage Docker image and pushes immutable commit and `latest` tags to the GitLab Container Registry.
5. `deploy_ec2` connects to EC2, pulls the immutable image, replaces the old container, maps port 80, and verifies `/api/health`.

The publish and deploy jobs run only for the default branch. Merge-request branches still run lint, tests, and the production build.

## Submit to Google

After DNS points to EC2 and the deployment is live, open:

```text
https://your-domain.example/sitemap.xml
```

Submit that exact URL in Google Search Console. The sitemap helps discovery but does not guarantee indexing.
