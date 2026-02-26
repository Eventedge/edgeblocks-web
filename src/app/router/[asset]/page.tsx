import Link from "next/link";
import { Container } from "@/components/ui";
import { Navbar } from "@/components/Navbar";
import { fetchRegime, fetchTopFeatures, fetchFamily } from "@/lib/edgecore";
import { RegimeCard } from "@/components/router/RegimeCard";
import { TopFeaturesCard } from "@/components/router/TopFeaturesCard";
import { FamilySnapshotCard } from "@/components/router/FamilySnapshotCard";

export const dynamic = "force-dynamic";

const FAMILIES = ["ta_core", "deriv_core", "macro_core", "pm_core"] as const;

export default async function AssetRouterPage({
  params,
}: {
  params: Promise<{ asset: string }>;
}) {
  const { asset: rawAsset } = await params;
  const asset = rawAsset.toUpperCase();

  const [regime, topFeatures, familyData] = await Promise.all([
    fetchRegime(asset),
    fetchTopFeatures(asset, 15),
    fetchFamily(asset),
  ]);

  return (
    <main className="min-h-screen">
      <Container>
        <Navbar />

        <header className="pb-8">
          <div className="flex items-center gap-3">
            <Link href="/router" className="text-xs font-mono text-muted hover:text-fg transition">
              &larr; Router
            </Link>
          </div>
          <div className="mt-2 text-xs font-mono text-muted2">ROUTER / {asset}</div>
          <div className="mt-1 text-2xl font-semibold">{asset} Working Features</div>
          <div className="mt-1 text-sm text-muted">
            Full regime + top features + per-family snapshots
          </div>
        </header>

        <div className="space-y-6 pb-12">
          {/* Regime */}
          <RegimeCard data={regime} asset={asset} />

          {/* Top Features */}
          <TopFeaturesCard data={topFeatures} asset={asset} />

          {/* Family Snapshots */}
          <div>
            <div className="text-xs font-mono text-muted2 mb-3">FAMILY SNAPSHOTS</div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {FAMILIES.map((fam) => {
                const snap = familyData?.[fam] ?? null;
                return (
                  <FamilySnapshotCard key={fam} familyKey={fam} snapshot={snap} />
                );
              })}
            </div>
          </div>
        </div>

        <footer className="border-t border-border py-10 text-sm text-muted2">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>&copy; {new Date().getFullYear()} EdgeBlocks &bull; Powered by EdgeCore</div>
            <div className="flex gap-4">
              <Link className="hover:text-fg" href="/">Home</Link>
              <Link className="hover:text-fg" href="/router">Router</Link>
              <Link className="hover:text-fg" href="/dashboard">Dashboard</Link>
            </div>
          </div>
        </footer>
      </Container>
    </main>
  );
}
