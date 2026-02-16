import "./globals.css";
import { AlertTicker } from "@/components/AlertTicker";

export const metadata = {
  title: "EdgeBlocks — Modular crypto intelligence",
  description:
    "EdgeBlocks turns on-chain data into actionable intelligence: modular signals, validation, and execution for traders, builders, and agent ecosystems.",
  metadataBase: new URL("https://edgeblocks.io"),
  openGraph: {
    title: "EdgeBlocks — Modular crypto intelligence",
    description:
      "A modular platform for signals, validation, and execution—built for traders, builders, and agent ecosystems.",
    url: "https://edgeblocks.io",
    siteName: "EdgeBlocks",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "EdgeBlocks — Modular crypto intelligence",
    description:
      "Modular platform for signals, validation, and execution—built for traders, builders, and agent ecosystems.",
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
