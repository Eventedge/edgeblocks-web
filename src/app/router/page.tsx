import Link from "next/link";
import { Container } from "@/components/ui";
import { Navbar } from "@/components/Navbar";
import { fetchRegime, fetchTopFeatures, fetchHealth } from "@/lib/edgecore";
import { RegimeCard } from "@/components/router/RegimeCard";
import { TopFeaturesCard } from "@/components/router/TopFeaturesCard";

export const dynamic = "force-dynamic";

const TIER0 = ["BTC", "ETH", "SOL", "HYPE"] as const;

export default async function RouterPage() {
  const results = await Promise.all(
    TIER0.map(async (asset) => {
      const [regime, topFeatures] = await Promise.all([
        fetchRegime(asset),
        fetchTopFeatures(asset, 12),
      ]);
      return { asset, regime, topFeatures };
    })
  );

  const health = await fetchHealth();

  return (
    <main className="min-h-screen">
      <Container>
        <Navbar />

        <header className="pb-8">
          <div className="text-xs font-mono text-muted2">ROUTER</div>
          <div className="mt-1 text-2xl font-semibold">Working Features</div>
          <div className="mt-1 text-sm text-muted">
            Regime-aware feature routing — only the features that matter right now.
          </div>
          {health && (
            <div className="mt-3 flex items-center gap-3 text-[11px] font-mono">
              <span className="text-emerald-300">{health.fresh} fresh</span>
              {health.stale > 0 && <span className="text-amber-300">{health.stale} stale</span>}
              {health.dead > 0 && <span className="text-rose-300">{health.dead} dead</span>}
              <span className="text-muted2">{health.total} total keys</span>
            </div>
          )}
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pb-12">
          {results.map(({ asset, regime, topFeatures }) => (
            <Link
              key={asset}
              href={`/router/${asset}`}
              className="block group"
            >
              <div className="module-card rounded-2xl border border-border/40 bg-surface p-5 space-y-4 shadow-[0_2px_16px_rgba(0,0,0,0.25)]">
                <div className="flex items-center justify-between">
                  <span className="text-lg font-semibold">{asset}</span>
                  <span className="text-[11px] font-mono text-muted group-hover:text-fg transition">
                    View details &rarr;
                  </span>
                </div>
                <RegimeCard data={regime} asset={asset} />
                <TopFeaturesCard data={topFeatures} asset={asset} compact />
              </div>
            </Link>
          ))}
        </div>

        <footer className="border-t border-border py-10 text-sm text-muted2">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>&copy; {new Date().getFullYear()} EdgeBlocks &bull; Powered by EdgeCore</div>
            <div className="flex gap-4">
              <Link className="hover:text-fg" href="/">Home</Link>
              <Link className="hover:text-fg" href="/dashboard">Dashboard</Link>
              <Link className="hover:text-fg" href="/eventedge">EventEdge</Link>
            </div>
          </div>
        </footer>
      </Container>
    </main>
  );
}
