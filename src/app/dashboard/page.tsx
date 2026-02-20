import Link from "next/link";
import { Button, Container } from "@/components/ui";
import { DashboardLive } from "@/components/DashboardLive";

export const dynamic = "force-dynamic";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function safeFetchJSON(url: string): Promise<any> {
  try {
    const res = await fetch(url, { cache: "no-store" });
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

export default async function Dashboard() {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "https://edgeblocks.io";

  const [marketOverview, btcCardData, fearGreed, supercard, regime, paper, simlab, simTrades, alerts] =
    await Promise.all([
      safeFetchJSON(`${base}/api/v1/market/overview`),
      safeFetchJSON(`${base}/api/v1/assets/BTC/card`),
      safeFetchJSON(`${base}/api/v1/sentiment/fear-greed`),
      safeFetchJSON(`${base}/api/v1/edge/supercard?symbol=BTC`),
      safeFetchJSON(`${base}/api/v1/edge/regime`),
      safeFetchJSON(`${base}/api/v1/paper/summary`),
      safeFetchJSON(`${base}/api/v1/simlab/overview?days=30`),
      safeFetchJSON(`${base}/api/v1/simlab/trades/live?limit=30`),
      safeFetchJSON(`${base}/api/v1/alerts/live?limit=50`),
    ]);

  return (
    <main className="min-h-screen">
      <Container>
        <header className="flex items-center justify-between gap-4 py-10">
          <div>
            <div className="text-xs font-mono text-muted">DASHBOARD</div>
            <div className="mt-1 text-2xl font-semibold">EdgeBlocks Intelligence</div>
            <div className="mt-1 text-sm text-muted">Real-time market data powered by EdgeCore snapshots</div>
          </div>
          <div className="flex gap-3">
            <Button href="/" variant="secondary">Home</Button>
            <Button href="https://t.me/+b5WT3Sif_klhMGM0" variant="primary">Open EventEdge</Button>
          </div>
        </header>

        <DashboardLive
          initial={{ marketOverview, btcCardData, fearGreed, supercard, regime, paper, simlab, simTrades, alerts }}
        />

        <footer className="border-t border-border py-10 text-sm text-muted2">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>&copy; {new Date().getFullYear()} EdgeBlocks &bull; Powered by EdgeCore</div>
            <div className="flex gap-4">
              <Link className="hover:text-fg" href="/">Home</Link>
              <Link className="hover:text-fg" href="/eventedge">EventEdge</Link>
              <Link className="hover:text-fg" href="/roadmap">Roadmap</Link>
            </div>
          </div>
        </footer>
      </Container>
    </main>
  );
}
