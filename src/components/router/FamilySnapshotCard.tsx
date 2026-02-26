"use client";

import type { FamilySnapshot } from "@/lib/edgecore";

const FAMILY_LABELS: Record<string, string> = {
  ta_core: "Technical Analysis",
  deriv_core: "Derivatives",
  macro_core: "Macro",
  pm_core: "Prediction Markets",
};

const FAMILY_ACCENTS: Record<string, string> = {
  ta_core: "border-cyan-500/20",
  deriv_core: "border-violet-500/20",
  macro_core: "border-yellow-500/20",
  pm_core: "border-purple-500/20",
};

const SKIP_KEYS = new Set([
  "asset", "artifact_id", "ts", "confidence", "coverage",
  "missing_sources", "_available",
]);

function formatValue(key: string, v: unknown): string {
  if (v === null || v === undefined) return "n/a";
  if (typeof v === "number") {
    if (key.includes("pct") || key.includes("change") || key.includes("slope") || key.startsWith("r_")) {
      return `${v >= 0 ? "+" : ""}${v.toFixed(2)}%`;
    }
    if (key.includes("_m") && !key.includes("_mo")) return `$${v.toFixed(0)}M`;
    if (key.includes("_usd")) return `$${(v / 1e9).toFixed(1)}B`;
    if (Math.abs(v) < 0.01 && v !== 0) return v.toFixed(4);
    if (Math.abs(v) < 10) return v.toFixed(2);
    return v.toFixed(0);
  }
  return String(v);
}

function StateIndicator({ state }: { state: string }) {
  const color =
    state === "FRESH" ? "bg-emerald-400" : state === "STALE" ? "bg-amber-400" : state === "DEAD" ? "bg-rose-400" : "bg-zinc-500";
  return (
    <span className="flex items-center gap-1.5 text-[10px] font-mono text-muted2">
      <span className={`inline-block h-1.5 w-1.5 rounded-full ${color}`} />
      {state}
    </span>
  );
}

export function FamilySnapshotCard({
  familyKey,
  snapshot,
}: {
  familyKey: string;
  snapshot: FamilySnapshot | null;
}) {
  const label = FAMILY_LABELS[familyKey] ?? familyKey;
  const accent = FAMILY_ACCENTS[familyKey] ?? "border-border/40";

  if (!snapshot) {
    return (
      <div className={`rounded-xl border ${accent} bg-surface/60 p-4`}>
        <div className="text-xs font-mono text-muted2">{label.toUpperCase()}</div>
        <div className="mt-2 text-sm text-muted">No data</div>
      </div>
    );
  }

  const age =
    snapshot.age_s < 60 ? `${Math.round(snapshot.age_s)}s` :
    snapshot.age_s < 3600 ? `${Math.round(snapshot.age_s / 60)}m` :
    `${(snapshot.age_s / 3600).toFixed(1)}h`;

  const entries = Object.entries(snapshot.payload).filter(
    ([k]) => !SKIP_KEYS.has(k) && !k.startsWith("_")
  );

  return (
    <div className={`rounded-xl border ${accent} bg-surface/60 p-4`}>
      <div className="flex items-center justify-between">
        <div className="text-xs font-mono text-muted2">{label.toUpperCase()}</div>
        <div className="flex items-center gap-2">
          <StateIndicator state={snapshot.state} />
          <span className="text-[10px] font-mono text-muted2">{age}</span>
        </div>
      </div>
      <div className="mt-3 space-y-0.5">
        {entries.map(([k, v]) => (
          <div key={k} className="flex items-center justify-between py-0.5">
            <span className="text-[12px] text-muted truncate mr-2">
              {k.replace(/_/g, " ")}
            </span>
            <span className="text-[12px] font-mono text-fg tabular-nums whitespace-nowrap">
              {formatValue(k, v)}
            </span>
          </div>
        ))}
        {entries.length === 0 && (
          <div className="text-[11px] text-muted2">Empty payload</div>
        )}
      </div>
    </div>
  );
}
