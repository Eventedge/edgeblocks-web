"use client";

import { useState } from "react";
import type { TopFeaturesData } from "@/lib/edgecore";

const FAMILY_COLORS: Record<string, string> = {
  momentum: "border-cyan-500/30 bg-cyan-500/10 text-cyan-300",
  trend: "border-emerald-500/30 bg-emerald-500/10 text-emerald-300",
  volatility: "border-amber-500/30 bg-amber-500/10 text-amber-300",
  funding: "border-violet-500/30 bg-violet-500/10 text-violet-300",
  oi: "border-blue-500/30 bg-blue-500/10 text-blue-300",
  liq: "border-rose-500/30 bg-rose-500/10 text-rose-300",
  crowding: "border-orange-500/30 bg-orange-500/10 text-orange-300",
  pm: "border-purple-500/30 bg-purple-500/10 text-purple-300",
  macro: "border-yellow-500/30 bg-yellow-500/10 text-yellow-300",
};

function FamilyBadge({ family }: { family: string }) {
  const cls = FAMILY_COLORS[family] ?? "border-border bg-surface2 text-muted";
  return (
    <span className={`inline-block rounded-md border px-1.5 py-0.5 text-[10px] font-mono shrink-0 ${cls}`}>
      {family}
    </span>
  );
}

function QualityDot({ q }: { q: number }) {
  const color = q >= 0.7 ? "bg-emerald-400" : q >= 0.4 ? "bg-amber-400" : "bg-rose-400";
  return <span className={`inline-block h-1.5 w-1.5 rounded-full shrink-0 ${color}`} title={`q=${q.toFixed(2)}`} />;
}

function ScoreBar({ score, maxScore }: { score: number; maxScore: number }) {
  const pct = maxScore > 0 ? Math.min(100, (score / maxScore) * 100) : 0;
  return (
    <div className="h-1 w-10 sm:w-16 rounded-full bg-surface2 overflow-hidden shrink-0">
      <div className="h-full rounded-full bg-accentCyan/70" style={{ width: `${pct}%` }} />
    </div>
  );
}

function InputQualityBars({ inputs }: { inputs: TopFeaturesData["inputs"] }) {
  const sources = ["regime", "ta_core", "deriv_core", "pm_core", "macro_core"];
  return (
    <div className="grid grid-cols-5 gap-1">
      {sources.map((src) => {
        const info = inputs[src];
        if (!info) return <div key={src} />;
        const q = info.quality ?? 0;
        const state = info.state ?? "?";
        const color = state === "FRESH" ? "bg-emerald-400" : state === "STALE" ? "bg-amber-400" : state === "DEAD" ? "bg-rose-400" : "bg-zinc-600";
        const pct = Math.min(100, q * 100);
        const label = src.replace("_core", "").replace("_", " ");
        return (
          <div key={src} className="flex flex-col items-center gap-0.5">
            <div className="h-1 w-full rounded-full bg-surface2 overflow-hidden">
              <div className={`h-full rounded-full ${color}`} style={{ width: `${pct}%` }} />
            </div>
            <span className="text-[8px] sm:text-[9px] font-mono text-muted2 capitalize">{label}</span>
          </div>
        );
      })}
    </div>
  );
}

export function TopFeaturesCard({
  data,
  asset,
  compact = false,
}: {
  data: TopFeaturesData | null;
  asset: string;
  compact?: boolean;
}) {
  const [showWhy, setShowWhy] = useState(false);

  if (!data) {
    return (
      <div className="rounded-xl border border-border/40 bg-surface/60 p-3 sm:p-4">
        <div className="text-xs font-mono text-muted2">TOP FEATURES</div>
        <div className="mt-2 text-sm text-muted">No feature data for {asset}</div>
      </div>
    );
  }

  const features = compact ? data.top_features.slice(0, 6) : data.top_features;
  const maxScore = features.length > 0 ? features[0].score : 1;
  const cov = data.coverage;

  return (
    <div className="rounded-xl border border-border/40 bg-surface/60 p-3 sm:p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono text-muted2">TOP FEATURES</span>
          <span className="text-[10px] font-mono text-muted2">
            {cov.have}/{cov.total} families
          </span>
        </div>
        <button
          onClick={(e) => { e.preventDefault(); e.stopPropagation(); setShowWhy(!showWhy); }}
          className="text-[11px] font-mono text-muted hover:text-fg transition min-h-[44px] min-w-[44px] flex items-center justify-center -mr-2"
        >
          {showWhy ? "Hide" : "Why?"}
        </button>
      </div>

      {showWhy && (
        <div className="mt-2 sm:mt-3 rounded-lg border border-border/30 bg-surface2/40 p-2.5 sm:p-3 space-y-2">
          <div className="text-[10px] sm:text-[11px] font-mono text-muted2">
            Regime: <span className="text-fg">{data.regime_label}</span>{" "}
            <span className="text-muted2">(conf: {data.regime_confidence})</span>
          </div>
          <div className="text-[10px] sm:text-[11px] font-mono text-muted2">Input Quality</div>
          <InputQualityBars inputs={data.inputs} />
          {cov.missing_families.length > 0 && (
            <div className="text-[10px] font-mono text-rose-300/80">
              Missing: {cov.missing_families.join(", ")}
            </div>
          )}
          {Object.keys(data.family_weights_effective).length > 0 && (
            <div className="text-[9px] sm:text-[10px] font-mono text-muted2 break-words">
              Weights: {Object.entries(data.family_weights_effective)
                .map(([f, w]) => `${f}=${w.toFixed(2)}`)
                .join("  ")}
            </div>
          )}
        </div>
      )}

      <div className="mt-2 sm:mt-3 space-y-0">
        {features.map((f, i) => (
          <div
            key={f.id}
            className="flex flex-wrap sm:flex-nowrap items-center gap-x-2 gap-y-0.5 py-1.5 sm:py-1 border-b border-border/20 last:border-0 min-h-[44px] sm:min-h-0"
          >
            {/* Row 1 on mobile: rank + quality + title */}
            <span className="w-5 text-right text-[11px] font-mono text-muted2 shrink-0">{i + 1}</span>
            <QualityDot q={f.quality} />
            <span className="flex-1 text-[12px] sm:text-[13px] text-fg min-w-0 break-words sm:truncate leading-snug">
              {f.title}
            </span>
            {/* Value + score bar + badge — wraps to second line on mobile */}
            <span className="text-[11px] sm:text-[12px] font-mono text-muted tabular-nums whitespace-nowrap shrink-0">
              {f.value}
            </span>
            <ScoreBar score={f.score} maxScore={maxScore} />
            <FamilyBadge family={f.family} />
          </div>
        ))}
      </div>

      {compact && data.top_features.length > 6 && (
        <div className="mt-2 text-center text-[11px] font-mono text-muted2">
          +{data.top_features.length - 6} more
        </div>
      )}
    </div>
  );
}
