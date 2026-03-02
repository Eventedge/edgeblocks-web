"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Container } from "@/components/ui";
import { Navbar } from "@/components/Navbar";
import { RegimeCard } from "@/components/router/RegimeCard";
import { TopFeaturesCard } from "@/components/router/TopFeaturesCard";
import { FamilySnapshotCard } from "@/components/router/FamilySnapshotCard";
import { CustomizePanel } from "@/components/router/CustomizePanel";
import type { RegimeData, TopFeaturesData, FamilySnapshot } from "@/lib/edgecore";
import {
  useRouterPrefs,
  isRouterFamilyEnabled,
  isSnapshotFamilyEnabled,
  countActiveFilters,
} from "@/lib/useRouterPrefs";

const FAMILIES = ["ta_core", "deriv_core", "macro_core", "pm_core"] as const;

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

function unwrapFamilies(raw: any): Record<string, FamilySnapshot> | null {
  if (!raw?.ok || !Array.isArray(raw.items)) return null;
  const out: Record<string, FamilySnapshot> = {};
  for (const item of raw.items) {
    const famKey = `${item.family}_core`;
    out[famKey] = {
      key: item.key,
      age_s: item.age_s,
      ttl_s: item.ttl_s,
      state: item.state,
      payload: item.payload ?? {},
    };
  }
  return out;
}
/* eslint-enable @typescript-eslint/no-explicit-any */

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

export default function AssetRouterPage() {
  const params = useParams();
  const asset = (params.asset as string)?.toUpperCase() ?? "BTC";

  const [regime, setRegime] = useState<RegimeData | null>(null);
  const [topFeatures, setTopFeatures] = useState<TopFeaturesData | null>(null);
  const [familyData, setFamilyData] = useState<Record<string, FamilySnapshot> | null>(null);
  const [loading, setLoading] = useState(true);
  const [customizeOpen, setCustomizeOpen] = useState(false);
  const [prefs, setPrefs, resetPrefs] = useRouterPrefs();

  useEffect(() => {
    async function load() {
      const h = prefs.horizon;
      const [regimeRaw, tfRaw, fdRaw] = await Promise.all([
        fetchRaw(`/v1/regime/${asset}`),
        fetchRaw(`/v1/top-features/${asset}?n=15&h=${h}`),
        fetchRaw(`/v1/features/${asset}`),
      ]);
      setRegime(unwrapRegime(regimeRaw));
      setTopFeatures(unwrapTopFeatures(tfRaw));
      setFamilyData(unwrapFamilies(fdRaw));
      setLoading(false);
    }
    load();
  }, [asset, prefs.horizon]);

  /* ---- Filtering ---- */

  const filteredTopFeatures: TopFeaturesData | null = topFeatures
    ? {
        ...topFeatures,
        top_features: topFeatures.top_features.filter((f) =>
          isRouterFamilyEnabled(f.family, prefs),
        ),
      }
    : null;

  const enabledFamilies = FAMILIES.filter((fam) => isSnapshotFamilyEnabled(fam, prefs));

  const activeFilters = countActiveFilters(prefs);

  return (
    <main className="min-h-screen overflow-x-hidden">
      <Container>
        <Navbar />

        <header className="pb-4 sm:pb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Link
                href="/router"
                className="text-xs font-mono text-muted hover:text-fg transition min-h-[44px] flex items-center"
              >
                &larr; Router
              </Link>
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
          <div className="text-xs font-mono text-muted2">ROUTER / {asset}</div>
          <div className="mt-1 text-xl sm:text-2xl font-semibold flex items-center gap-2">
            {asset} Working Features
            <span className="text-xs font-mono text-muted2 bg-surface2/50 border border-border/30 rounded px-1.5 py-0.5">
              {prefs.horizon}
            </span>
          </div>
          <div className="mt-1 text-xs sm:text-sm text-muted">
            Full regime + top features + per-family snapshots
          </div>
        </header>

        {loading ? (
          <div className="py-20 text-center text-muted2 text-sm font-mono">Loading {asset} data...</div>
        ) : (
          <div className="space-y-4 sm:space-y-6 pb-8 sm:pb-12">
            <RegimeCard data={regime} asset={asset} />

            {filteredTopFeatures && filteredTopFeatures.top_features.length > 0 ? (
              <TopFeaturesCard data={filteredTopFeatures} asset={asset} limit={prefs.topN} />
            ) : (
              <div className="rounded-xl border border-border/40 bg-surface/60 p-3 sm:p-4">
                <div className="text-xs font-mono text-muted2">TOP FEATURES</div>
                <div className="mt-2 text-sm text-muted">
                  {topFeatures
                    ? "No features match your filters"
                    : `No feature data for ${asset}`}
                </div>
              </div>
            )}

            {/* Suppressed features (opt-in via Customize) */}
            {prefs.showSuppressed && topFeatures?.suppressed && topFeatures.suppressed.length > 0 && (
              <div>
                <div className="text-xs font-mono text-muted2 mb-2 sm:mb-3">SUPPRESSED FEATURES</div>
                <div className="rounded-xl border border-border/40 bg-surface/60 p-3 sm:p-4">
                  <div className="space-y-0">
                    {topFeatures.suppressed.map((s) => (
                      <div
                        key={s.id}
                        className="flex items-center justify-between py-1 border-b border-border/20 last:border-0"
                      >
                        <span className="text-[11px] sm:text-[12px] text-muted">
                          {s.id.replace(/_/g, " ")}
                        </span>
                        <span className="text-[10px] sm:text-[11px] font-mono text-muted2 tabular-nums">
                          {s.score.toFixed(3)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Family snapshots (filtered by prefs) */}
            {enabledFamilies.length > 0 && (
              <div>
                <div className="text-xs font-mono text-muted2 mb-2 sm:mb-3">FAMILY SNAPSHOTS</div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                  {enabledFamilies.map((fam) => {
                    const snap = familyData?.[fam] ?? null;
                    return <FamilySnapshotCard key={fam} familyKey={fam} snapshot={snap} />;
                  })}
                </div>
              </div>
            )}
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
              <Link className="hover:text-fg" href="/router">Router</Link>
              <Link className="hover:text-fg" href="/dashboard">Dashboard</Link>
            </div>
          </div>
        </footer>
      </Container>
    </main>
  );
}
