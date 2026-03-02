"use client";

import type { RouterPrefs, FamilyGroup, Horizon } from "@/lib/useRouterPrefs";
import {
  FAMILY_GROUPS,
  FAMILY_GROUP_LABELS,
  FAMILY_GROUP_DESCS,
  ROUTER_PREFS_DEFAULTS,
  HORIZONS,
} from "@/lib/useRouterPrefs";

const FAMILY_DOT_COLORS: Record<FamilyGroup, string> = {
  ta: "bg-cyan-400",
  deriv: "bg-violet-400",
  macro: "bg-yellow-400",
  pm: "bg-purple-400",
};

const TOP_N_OPTIONS = [6, 10, 15] as const;

export function CustomizePanel({
  prefs,
  onChange,
  onReset,
  onClose,
  open,
}: {
  prefs: RouterPrefs;
  onChange: (p: RouterPrefs) => void;
  onReset: () => void;
  onClose: () => void;
  open: boolean;
}) {
  function toggleFamily(g: FamilyGroup) {
    onChange({
      ...prefs,
      enabledFamilies: { ...prefs.enabledFamilies, [g]: !prefs.enabledFamilies[g] },
    });
  }

  function setCov(v: number) {
    onChange({ ...prefs, minCoverage: Math.max(0, Math.min(9, v)) });
  }

  function setTopN(v: number) {
    onChange({ ...prefs, topN: v });
  }

  function setHorizon(h: Horizon) {
    onChange({ ...prefs, horizon: h });
  }

  function toggle(key: "showSuppressed" | "showStale") {
    onChange({ ...prefs, [key]: !prefs[key] });
  }

  const isDefault = JSON.stringify(prefs) === JSON.stringify(ROUTER_PREFS_DEFAULTS);

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-40 bg-black/60 backdrop-blur-sm transition-opacity duration-200 ${
          open ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      />

      {/* Drawer */}
      <div
        className={`fixed right-0 top-0 z-50 h-full w-full sm:w-80 border-l border-border/40 bg-surface shadow-2xl overflow-y-auto transition-transform duration-200 ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-border/30 bg-surface px-4 py-3">
          <span className="text-sm font-semibold">Customize Router</span>
          <button
            onClick={onClose}
            className="min-h-[44px] min-w-[44px] flex items-center justify-center -mr-2 text-muted hover:text-fg transition"
            aria-label="Close"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <div className="p-4 space-y-5">
          {/* Families */}
          <section>
            <div className="text-[10px] font-mono text-muted2 uppercase tracking-wider mb-2">
              Families
            </div>
            <div className="space-y-1.5">
              {FAMILY_GROUPS.map((g) => (
                <button
                  key={g}
                  onClick={() => toggleFamily(g)}
                  className={`w-full flex items-center gap-3 rounded-lg border px-3 py-2.5 text-left transition ${
                    prefs.enabledFamilies[g]
                      ? "border-border/60 bg-surface2/50"
                      : "border-border/20 bg-surface/30 opacity-50"
                  }`}
                >
                  <span
                    className={`h-2.5 w-2.5 rounded-full shrink-0 transition ${FAMILY_DOT_COLORS[g]} ${
                      prefs.enabledFamilies[g] ? "" : "opacity-30"
                    }`}
                  />
                  <div className="min-w-0 flex-1">
                    <div className="text-xs font-semibold">{FAMILY_GROUP_LABELS[g]}</div>
                    <div className="text-[10px] text-muted2">{FAMILY_GROUP_DESCS[g]}</div>
                  </div>
                  <span
                    className={`text-[10px] font-mono shrink-0 ${
                      prefs.enabledFamilies[g] ? "text-emerald-300" : "text-muted2"
                    }`}
                  >
                    {prefs.enabledFamilies[g] ? "ON" : "OFF"}
                  </span>
                </button>
              ))}
            </div>
          </section>

          {/* Horizon */}
          <section>
            <div className="text-[10px] font-mono text-muted2 uppercase tracking-wider mb-2">
              Horizon
            </div>
            <div className="flex gap-2">
              {HORIZONS.map((h) => (
                <button
                  key={h}
                  onClick={() => setHorizon(h)}
                  className={`flex-1 rounded-lg border px-3 py-2 text-xs font-mono text-center transition ${
                    prefs.horizon === h
                      ? "border-cyan-500/40 bg-cyan-500/10 text-cyan-300"
                      : "border-border/40 bg-surface2/30 text-muted hover:text-fg"
                  }`}
                >
                  {h}
                </button>
              ))}
            </div>
          </section>

          {/* Min Coverage */}
          <section>
            <div className="text-[10px] font-mono text-muted2 uppercase tracking-wider mb-2">
              Min Coverage
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setCov(prefs.minCoverage - 1)}
                disabled={prefs.minCoverage <= 0}
                className="h-8 w-8 rounded-lg border border-border/40 bg-surface2/40 text-fg flex items-center justify-center text-sm font-mono disabled:opacity-30 disabled:cursor-not-allowed hover:bg-surface2 transition"
              >
                &minus;
              </button>
              <span className="text-lg font-mono font-semibold w-6 text-center tabular-nums">
                {prefs.minCoverage}
              </span>
              <button
                onClick={() => setCov(prefs.minCoverage + 1)}
                disabled={prefs.minCoverage >= 9}
                className="h-8 w-8 rounded-lg border border-border/40 bg-surface2/40 text-fg flex items-center justify-center text-sm font-mono disabled:opacity-30 disabled:cursor-not-allowed hover:bg-surface2 transition"
              >
                +
              </button>
            </div>
            <div className="mt-1 text-[10px] text-muted2">
              {prefs.minCoverage === 0
                ? "Show all assets"
                : `Require \u2265 ${prefs.minCoverage} families`}
            </div>
          </section>

          {/* Top N */}
          <section>
            <div className="text-[10px] font-mono text-muted2 uppercase tracking-wider mb-2">
              Max Features
            </div>
            <div className="flex gap-2">
              {TOP_N_OPTIONS.map((n) => (
                <button
                  key={n}
                  onClick={() => setTopN(n)}
                  className={`flex-1 rounded-lg border px-3 py-2 text-xs font-mono text-center transition ${
                    prefs.topN === n
                      ? "border-cyan-500/40 bg-cyan-500/10 text-cyan-300"
                      : "border-border/40 bg-surface2/30 text-muted hover:text-fg"
                  }`}
                >
                  {n}
                </button>
              ))}
            </div>
          </section>

          {/* Display */}
          <section>
            <div className="text-[10px] font-mono text-muted2 uppercase tracking-wider mb-2">
              Display
            </div>
            <div className="space-y-1.5">
              <button
                onClick={() => toggle("showStale")}
                className="w-full flex items-center justify-between rounded-lg border border-border/30 px-3 py-2.5 text-left hover:bg-surface2/30 transition"
              >
                <span className="text-xs">Show stale assets</span>
                <span
                  className={`text-[10px] font-mono ${
                    prefs.showStale ? "text-emerald-300" : "text-muted2"
                  }`}
                >
                  {prefs.showStale ? "ON" : "OFF"}
                </span>
              </button>
              <button
                onClick={() => toggle("showSuppressed")}
                className="w-full flex items-center justify-between rounded-lg border border-border/30 px-3 py-2.5 text-left hover:bg-surface2/30 transition"
              >
                <span className="text-xs">Show suppressed features</span>
                <span
                  className={`text-[10px] font-mono ${
                    prefs.showSuppressed ? "text-emerald-300" : "text-muted2"
                  }`}
                >
                  {prefs.showSuppressed ? "ON" : "OFF"}
                </span>
              </button>
            </div>
          </section>

          {/* Reset */}
          {!isDefault && (
            <button
              onClick={onReset}
              className="w-full rounded-lg border border-border/40 bg-surface2/30 px-3 py-2.5 text-xs font-mono text-muted hover:text-fg transition"
            >
              Reset to defaults
            </button>
          )}
        </div>
      </div>
    </>
  );
}
