import "./globals.css";
import { AlertTicker } from "@/components/AlertTicker";

export const metadata = {
  title: "EdgeBlocks — Modular crypto intelligence",
  description:
    "EdgeBlocks turns on-chain data into actionable intelligence: modular signals, validation, and execution for traders, builders, and agent ecosystems.",
  metadataBase: new URL("https://edgeblocks.io"),
  icons: {
    icon: [
      { url: "/brand/favicon-32.svg", sizes: "32x32", type: "image/svg+xml" },
      { url: "/brand/favicon-192.svg", sizes: "192x192", type: "image/svg+xml" },
    ],
    apple: [{ url: "/brand/apple-icon.svg", sizes: "180x180", type: "image/svg+xml" }],
  },
  openGraph: {
    title: "EdgeBlocks — Modular crypto intelligence",
    description:
      "A modular platform for signals, validation, and execution—built for traders, builders, and agent ecosystems.",
    url: "https://edgeblocks.io",
    siteName: "EdgeBlocks",
    type: "website",
    images: [{ url: "/brand/og.svg", width: 1200, height: 630, alt: "EdgeBlocks" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "EdgeBlocks — Modular crypto intelligence",
    description:
      "Modular platform for signals, validation, and execution—built for traders, builders, and agent ecosystems.",
    images: ["/brand/og.svg"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AlertTicker />
        {children}
      </body>
    </html>
  );
}
