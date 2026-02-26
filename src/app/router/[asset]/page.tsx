"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Container } from "@/components/ui";
import { Navbar } from "@/components/Navbar";
import { RegimeCard } from "@/components/router/RegimeCard";
import { TopFeaturesCard } from "@/components/router/TopFeaturesCard";
import { FamilySnapshotCard } from "@/components/router/FamilySnapshotCard";
import type { RegimeData, TopFeaturesData, FamilySnapshot } from "@/lib/edgecore";

const FAMILIES = ["ta_core", "deriv_core", "macro_core", "pm_core"] as const;

function edgecoreBase(): string {
  const env = process.env.NEXT_PUBLIC_EDGECORE_HTTP_BASE?.trim();
  if (env) return env.endsWith("/") ? env.slice(0, -1) : env;
  return "http://127.0.0.1:18888";
}

async function fetchJSON<T>(path: string): Promise<T | null> {
  try {
    const res = await fetch(`${edgecoreBase()}${path}`, { cache: "no-store" });
    if (!res.ok) return null;
    return (await res.json()) as T;
  } catch {
    return null;
  }
}

export default function AssetRouterPage() {
  const params = useParams();
  const asset = (params.asset as string)?.toUpperCase() ?? "BTC";

  const [regime, setRegime] = useState<RegimeData | null>(null);
  const [topFeatures, setTopFeatures] = useState<TopFeaturesData | null>(null);
  const [familyData, setFamilyData] = useState<Record<string, FamilySnapshot> | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const [r, tf, fd] = await Promise.all([
        fetchJSON<RegimeData>(`/v1/regime/${asset}`),
        fetchJSON<TopFeaturesData>(`/v1/top-features/${asset}?n=15`),
        fetchJSON<Record<string, FamilySnapshot>>(`/v1/features/${asset}`),
      ]);
      setRegime(r);
      setTopFeatures(tf);
      setFamilyData(fd);
      setLoading(false);
    }
    load();
  }, [asset]);

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

        {loading ? (
          <div className="py-20 text-center text-muted2 text-sm font-mono">Loading {asset} data...</div>
        ) : (
          <div className="space-y-6 pb-12">
            <RegimeCard data={regime} asset={asset} />
            <TopFeaturesCard data={topFeatures} asset={asset} />
            <div>
              <div className="text-xs font-mono text-muted2 mb-3">FAMILY SNAPSHOTS</div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {FAMILIES.map((fam) => {
                  const snap = familyData?.[fam] ?? null;
                  return <FamilySnapshotCard key={fam} familyKey={fam} snapshot={snap} />;
                })}
              </div>
            </div>
          </div>
        )}

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
