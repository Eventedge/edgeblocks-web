"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Container } from "@/components/ui";
import { Navbar } from "@/components/Navbar";
import { RegimeCard } from "@/components/router/RegimeCard";
import { TopFeaturesCard } from "@/components/router/TopFeaturesCard";
import { CustomizePanel } from "@/components/router/CustomizePanel";
import type { RegimeData, TopFeaturesData, HealthData } from "@/lib/edgecore";
import {
  useRouterPrefs,
  isRouterFamilyEnabled,
  countActiveFilters,
} from "@/lib/useRouterPrefs";

const TIER0 = ["BTC", "ETH", "SOL", "HYPE"] as const;

function edgecoreBase(): string {
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

function SlidersIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="4" y1="21" x2="4" y2="14" />
      <line x1="4" y1="10" x2="4" y2="3" />
      <line x1="12" y1="21" x2="12" y2="12" />
      <line x1="12" y1="8" x2="12" y2="3" />
      <line x1="20" y1="21" x2="20" y2="16" />
      <line x1="20" y1="12" x2="20" y2="3" />
      <line x1="1" y1="14" x2="7" y2="14" />
      <line x1="9" y1="8" x2="15" y2="8" />
      <line x1="17" y1="16" x2="23" y2="16" />
    </svg>
  );
}

export default function RouterPage() {
  const [results, setResults] = useState<AssetData[]>([]);
  const [health, setHealth] = useState<HealthData | null>(null);
  const [loading, setLoading] = useState(true);
  const [customizeOpen, setCustomizeOpen] = useState(false);
  const [prefs, setPrefs, resetPrefs] = useRouterPrefs();

  useEffect(() => {
    async function load() {
      const h = prefs.horizon;
      const [healthRaw, ...assetResults] = await Promise.all([
        fetchRaw("/v1/health/data"),
        ...TIER0.map(async (asset) => {
          const [regimeRaw, tfRaw] = await Promise.all([
            fetchRaw(`/v1/regime/${asset}`),
            fetchRaw(`/v1/top-features/${asset}?n=15&h=${h}`),
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
  }, [prefs.horizon]);

  /* ---- Filtering ---- */

  const visibleResults = results.filter(({ regime, topFeatures }) => {
    if (prefs.minCoverage > 0 && topFeatures?.coverage) {
      if (topFeatures.coverage.have < prefs.minCoverage) return false;
    }
    if (!prefs.showStale && regime?.freshness) {
      if (regime.freshness.state === "STALE" || regime.freshness.state === "DEAD") return false;
    }
    return true;
  });

  function filterFeatures(data: TopFeaturesData | null): TopFeaturesData | null {
    if (!data) return null;
    const filtered = data.top_features.filter((f) =>
      isRouterFamilyEnabled(f.family, prefs),
    );
    return { ...data, top_features: filtered };
  }

  const activeFilters = countActiveFilters(prefs);
  const hiddenCount = results.length - visibleResults.length;

  return (
    <main className="min-h-screen overflow-x-hidden">
      <Container>
        <Navbar />

        <header className="pb-4 sm:pb-8">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-xs font-mono text-muted2">ROUTER</div>
              <div className="mt-1 text-xl sm:text-2xl font-semibold flex items-center gap-2">
                Working Features
                <span className="text-xs font-mono text-muted2 bg-surface2/50 border border-border/30 rounded px-1.5 py-0.5">
                  {prefs.horizon}
                </span>
              </div>
            </div>
            <button
              onClick={() => setCustomizeOpen(true)}
              className="flex items-center gap-1.5 rounded-lg border border-border/40 bg-surface2/30 px-3 py-2 text-[11px] font-mono text-muted hover:text-fg hover:bg-surface2/50 transition min-h-[44px]"
            >
              <SlidersIcon />
              Customize
              {activeFilters > 0 && (
                <span className="rounded-full bg-cyan-500/20 text-cyan-300 px-1.5 text-[9px] font-semibold">
                  {activeFilters}
                </span>
              )}
            </button>
          </div>
          <div className="mt-1 text-xs sm:text-sm text-muted">
            Regime-aware feature routing — only the features that matter right now.
          </div>
          {health && (
            <div className="mt-2 sm:mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] font-mono">
              <span className="text-emerald-300">{health.fresh} fresh</span>
              {health.stale > 0 && <span className="text-amber-300">{health.stale} stale</span>}
              {health.dead > 0 && <span className="text-rose-300">{health.dead} dead</span>}
              <span className="text-muted2">{health.total} total keys</span>
            </div>
          )}
          {hiddenCount > 0 && (
            <div className="mt-1 text-[11px] font-mono text-muted2">
              {hiddenCount} asset{hiddenCount > 1 ? "s" : ""} hidden by filters
            </div>
          )}
        </header>

        {loading ? (
          <div className="py-20 text-center text-muted2 text-sm font-mono">Loading router data...</div>
        ) : visibleResults.length === 0 ? (
          <div className="py-20 text-center space-y-2">
            <div className="text-sm text-muted">No assets match your filters.</div>
            <button
              onClick={() => setCustomizeOpen(true)}
              className="text-[11px] font-mono text-muted2 hover:text-fg underline transition"
            >
              Adjust filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-6 pb-8 sm:pb-12">
            {visibleResults.map(({ asset, regime, topFeatures }) => {
              const filtered = filterFeatures(topFeatures);
              const hasFeatures = filtered && filtered.top_features.length > 0;
              return (
                <Link key={asset} href={`/router/${asset}`} className="block group">
                  <div className="module-card rounded-2xl border border-border/40 bg-surface p-3 sm:p-5 space-y-3 sm:space-y-4 shadow-[0_2px_16px_rgba(0,0,0,0.25)]">
                    <div className="flex items-center justify-between">
                      <span className="text-base sm:text-lg font-semibold">{asset}</span>
                      <span className="text-[11px] font-mono text-muted group-hover:text-fg transition">
                        View details &rarr;
                      </span>
                    </div>
                    <RegimeCard data={regime} asset={asset} />
                    {hasFeatures ? (
                      <TopFeaturesCard data={filtered} asset={asset} compact />
                    ) : (
                      <div className="rounded-xl border border-border/40 bg-surface/60 p-3 text-[11px] font-mono text-muted2">
                        No features match your filters
                      </div>
                    )}
                  </div>
                </Link>
              );
            })}
          </div>
        )}

        <CustomizePanel
          prefs={prefs}
          onChange={setPrefs}
          onReset={resetPrefs}
          onClose={() => setCustomizeOpen(false)}
          open={customizeOpen}
        />

        <footer className="border-t border-border py-6 sm:py-10 text-sm text-muted2">
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
