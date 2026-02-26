"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Container } from "@/components/ui";
import { Navbar } from "@/components/Navbar";
import { RegimeCard } from "@/components/router/RegimeCard";
import { TopFeaturesCard } from "@/components/router/TopFeaturesCard";
import type { RegimeData, TopFeaturesData, HealthData } from "@/lib/edgecore";

const TIER0 = ["BTC", "ETH", "SOL", "HYPE"] as const;

function edgecoreBase(): string {
  // In production, use same-origin proxy to avoid mixed-content blocking
  if (typeof window !== "undefined" && window.location.protocol === "https:") {
    return "/api/edgecore";
  }
  const env = process.env.NEXT_PUBLIC_EDGECORE_HTTP_BASE?.trim();
  if (env) return env.endsWith("/") ? env.slice(0, -1) : env;
  return "http://127.0.0.1:18888";
}

/* eslint-disable @typescript-eslint/no-explicit-any */
async function fetchRaw(path: string): Promise<any | null> {
  try {
    const res = await fetch(`${edgecoreBase()}${path}`, { cache: "no-store" });
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}

/** Unwrap EdgeCore envelope: {ok, state, age_s, ttl_s, payload} → component data */
function unwrapRegime(raw: any): RegimeData | null {
  if (!raw?.ok || !raw.payload) return null;
  const p = raw.payload;
  return {
    ...p,
    freshness: { age_s: raw.age_s, ttl_s: raw.ttl_s, state: raw.state },
  } as RegimeData;
}

function unwrapTopFeatures(raw: any): TopFeaturesData | null {
  if (!raw?.ok || !raw.payload) return null;
  return raw.payload as TopFeaturesData;
}

function unwrapHealth(raw: any): HealthData | null {
  if (!raw?.ok) return null;
  const c = raw.counts ?? {};
  return {
    total: raw.total ?? 0,
    fresh: c.FRESH ?? 0,
    stale: c.STALE ?? 0,
    dead: c.DEAD ?? 0,
    stale_or_dead: raw.stale_or_dead ?? [],
  };
}
/* eslint-enable @typescript-eslint/no-explicit-any */

interface AssetData {
  asset: string;
  regime: RegimeData | null;
  topFeatures: TopFeaturesData | null;
}

export default function RouterPage() {
  const [results, setResults] = useState<AssetData[]>([]);
  const [health, setHealth] = useState<HealthData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const [healthRaw, ...assetResults] = await Promise.all([
        fetchRaw("/v1/health/data"),
        ...TIER0.map(async (asset) => {
          const [regimeRaw, tfRaw] = await Promise.all([
            fetchRaw(`/v1/regime/${asset}`),
            fetchRaw(`/v1/top-features/${asset}?n=12`),
          ]);
          return {
            asset,
            regime: unwrapRegime(regimeRaw),
            topFeatures: unwrapTopFeatures(tfRaw),
          } as AssetData;
        }),
      ]);
      setHealth(unwrapHealth(healthRaw));
      setResults(assetResults);
      setLoading(false);
    }
    load();
  }, []);

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

        {loading ? (
          <div className="py-20 text-center text-muted2 text-sm font-mono">Loading router data...</div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pb-12">
            {results.map(({ asset, regime, topFeatures }) => (
              <Link key={asset} href={`/router/${asset}`} className="block group">
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
        )}

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
