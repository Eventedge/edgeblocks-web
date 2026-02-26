"use client";

import type { RegimeData } from "@/lib/edgecore";

const AXIS_COLORS: Record<string, string> = {
  TRENDING: "text-emerald-300",
  CHOP: "text-amber-300",
  HIGH_VOL: "text-rose-300",
  LOW_VOL: "text-cyan-300",
  RISK_ON: "text-emerald-300",
  RISK_OFF: "text-rose-300",
  NEUTRAL: "text-muted",
  UP: "text-emerald-300",
  DOWN: "text-rose-300",
};

function AxisPill({ label, value }: { label: string; value: string }) {
  const color = AXIS_COLORS[value] ?? "text-muted";
  return (
    <div className="flex flex-col items-center gap-1">
      <span className="text-[10px] font-mono uppercase text-muted2">{label}</span>
      <span className={`text-xs font-semibold ${color}`}>{value}</span>
    </div>
  );
}

function FreshnessBar({ age_s, ttl_s, state }: { age_s: number; ttl_s: number; state: string }) {
  const pct = Math.min(100, (age_s / (ttl_s * 2)) * 100);
  const color =
    state === "FRESH" ? "bg-emerald-400" : state === "STALE" ? "bg-amber-400" : "bg-rose-400";
  const age =
    age_s < 60 ? `${Math.round(age_s)}s` : age_s < 3600 ? `${Math.round(age_s / 60)}m` : `${(age_s / 3600).toFixed(1)}h`;

  return (
    <div className="flex items-center gap-2 text-[11px] font-mono">
      <span className={state === "FRESH" ? "text-emerald-300" : state === "STALE" ? "text-amber-300" : "text-rose-300"}>
        {state}
      </span>
      <div className="flex-1 h-1 rounded-full bg-surface2 overflow-hidden">
        <div className={`h-full rounded-full ${color}`} style={{ width: `${pct}%` }} />
      </div>
      <span className="text-muted2">{age}</span>
    </div>
  );
}

export function RegimeCard({ data, asset }: { data: RegimeData | null; asset: string }) {
  if (!data) {
    return (
      <div className="rounded-xl border border-border/40 bg-surface/60 p-4">
        <div className="text-xs font-mono text-muted2">REGIME</div>
        <div className="mt-2 text-sm text-muted">No regime data for {asset}</div>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-border/40 bg-surface/60 p-4">
      <div className="flex items-center justify-between">
        <div className="text-xs font-mono text-muted2">REGIME</div>
        <span className="text-[10px] font-mono text-muted2">conf: {data.confidence}</span>
      </div>
      <div className="mt-2 text-lg font-semibold tracking-tight">{data.label}</div>
      <div className="mt-3 grid grid-cols-4 gap-2">
        <AxisPill label="Dir" value={data.axes?.direction ?? data.scores?.direction_label ?? "?"} />
        <AxisPill label="Struct" value={data.structure} />
        <AxisPill label="Vol" value={data.volatility} />
        <AxisPill label="Risk" value={data.risk} />
      </div>
      {data.freshness && (
        <div className="mt-3">
          <FreshnessBar {...data.freshness} />
        </div>
      )}
    </div>
  );
}
