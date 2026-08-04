import type { Metadata } from "next";
import { getSiteUrl } from "@/lib/site-url";
import "./globals.css";

const siteUrl = getSiteUrl();

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Field Supply — Useful objects for everyday life",
    template: "%s — Field Supply",
  },
  description:
    "A curated catalog of dependable objects for work, travel, and everyday life.",
  keywords: [
    "Field Supply",
    "everyday tools",
    "desk essentials",
    "travel accessories",
    "product catalog",
  ],
  applicationName: "Field Supply",
  authors: [{ name: "Field Supply" }],
  creator: "Field Supply",
  publisher: "Field Supply",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName: "Field Supply",
    title: "Field Supply — Useful objects for everyday life",
    description:
      "A curated catalog of dependable objects for work, travel, and everyday life.",
    locale: "en_US",
  },
  twitter: {
    card: "summary",
    title: "Field Supply — Useful objects for everyday life",
    description:
      "A curated catalog of dependable objects for work, travel, and everyday life.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: { icon: "/favicon.svg" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
