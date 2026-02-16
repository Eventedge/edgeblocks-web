import React from "react";

type Point = { t?: string; v?: number };

function clamp(n: number, a: number, b: number) {
  return Math.max(a, Math.min(b, n));
}

export function Sparkline({
  points,
  height = 72,
  pad = 8,
  showLabels = true,
  ariaLabel = "sparkline",
}: {
  points: Point[];
  height?: number;
  pad?: number;
  showLabels?: boolean;
  ariaLabel?: string;
}) {
  const clean = (points || [])
    .map((p) => ({ t: p.t, v: typeof p.v === "number" ? p.v : Number(p.v) }))
    .filter((p) => Number.isFinite(p.v));

  if (!clean.length) {
    return (
      <div className="rounded-xl border border-border/70 bg-surface2/40 p-4 text-xs font-mono text-muted2">
        No curve yet
      </div>
    );
  }

  const w = 240; // internal viewbox width
  const h = height;
  const xs = clean.map((_, i) => i);
  const vs = clean.map((p) => p.v as number);
  const vMin = Math.min(...vs);
  const vMax = Math.max(...vs);
  const vRange = vMax - vMin || 1;

  const xScale = (i: number) => pad + (i * (w - pad * 2)) / Math.max(1, xs.length - 1);
  const yScale = (v: number) => pad + (h - pad * 2) * (1 - (v - vMin) / vRange);

  const d = clean
    .map((p, i) => {
      const x = xScale(i);
      const y = yScale(p.v as number);
      return `${i === 0 ? "M" : "L"} ${x.toFixed(2)} ${y.toFixed(2)}`;
    })
    .join(" ");

  const last = clean[clean.length - 1];
  const lastX = xScale(clean.length - 1);
  const lastY = yScale(last.v as number);

  const first = clean[0];
  const firstLabel = first.t ? String(first.t).slice(5, 10) : "";
  const lastLabel = last.t ? String(last.t).slice(5, 10) : "";

  return (
    <div className="rounded-xl border border-border/70 bg-surface2/40 p-4">
      <svg
        role="img"
        aria-label={ariaLabel}
        viewBox={`0 0 ${w} ${h}`}
        className="h-[72px] w-full"
        preserveAspectRatio="none"
      >
        <path d={d} fill="none" stroke="currentColor" strokeWidth="2" className="text-muted" />
        {/* last point pulse */}
        <circle cx={lastX} cy={lastY} r="2.5" className="fill-fg" />
        <circle cx={lastX} cy={lastY} r="7" className="fill-fg/10 animate-ping" />
      </svg>

      {showLabels && (
        <div className="mt-2 flex items-center justify-between text-[11px] font-mono text-muted2">
          <span>{firstLabel}</span>
          <span className="opacity-80">
            {clamp(vMin, -1e12, 1e12).toFixed(0)} → {clamp(vMax, -1e12, 1e12).toFixed(0)}
          </span>
          <span>{lastLabel}</span>
        </div>
      )}
    </div>
  );
}
