"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { Chip, LiveDot, ModuleCard, PnlChip } from "@/components/ui";
import { Sparkline } from "@/components/Sparkline";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Overview = any;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Trades = any;

function useInterval(cb: () => void, ms: number) {
  const ref = useRef(cb);
  useEffect(() => {
    ref.current = cb;
  }, [cb]);
  useEffect(() => {
    const id = setInterval(() => ref.current(), ms);
    return () => clearInterval(id);
  }, [ms]);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function numish(x: any): number {
  if (typeof x === "number") return x;
  const n = Number(x);
  return Number.isFinite(n) ? n : 0;
}

function flash(el: HTMLElement | null) {
  if (!el) return;
  el.classList.remove("kpi-flash");
  // force reflow
  // eslint-disable-next-line @typescript-eslint/no-unused-expressions
  el.offsetHeight;
  el.classList.add("kpi-flash");
}

export function SimLabLive({
  initialOverview,
  initialTrades,
}: {
  initialOverview: Overview;
  initialTrades: Trades;
}) {
  const [overview, setOverview] = useState<Overview>(initialOverview);
  const [trades, setTrades] = useState<Trades>(initialTrades);
  const [filter, setFilter] = useState<"all" | "wins" | "losses">("all");
  const [limit, setLimit] = useState<10 | 30 | 50>(30);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const prevKpis = useRef<any>(initialOverview?.kpis ?? {});
  const kpiRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const seen = useRef<Set<string>>(new Set());
  const newUntil = useRef<Map<string, number>>(new Map());

  // seed seen set from initial trades
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    for (const it of (initialTrades?.items ?? []) as any[]) {
      const key = `${it?.t}|${it?.account}|${it?.symbol}|${it?.side}|${it?.pnl_usdt}|${it?.price}`;
      seen.current.add(key);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const fetchOverview = async () => {
    try {
      const r = await fetch(`/api/v1/simlab/overview?days=30`, { cache: "no-store" });
      const j = await r.json();
      setOverview(j);
      const prev = prevKpis.current || {};
      const next = j?.kpis || {};
      const keys = ["pnl_30d_usdt", "win_rate", "trades_30d", "open_positions", "max_drawdown"];
      for (const k of keys) {
        if (String(prev?.[k]) !== String(next?.[k])) {
          flash(kpiRefs.current[k] || null);
        }
      }
      prevKpis.current = next;
    } catch {
      // keep previous
    }
  };

  const fetchTrades = async () => {
    try {
      const r = await fetch(`/api/v1/simlab/trades/live?limit=${limit}`, { cache: "no-store" });
      const j = await r.json();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const items = (j?.items ?? []) as any[];

      const now = Date.now();
      for (const it of items) {
        const key = `${it?.t}|${it?.account}|${it?.symbol}|${it?.side}|${it?.pnl_usdt}|${it?.price}`;
        if (!seen.current.has(key)) {
          seen.current.add(key);
          newUntil.current.set(key, now + 2000);
        }
      }
      // garbage-collect old marks
      for (const [k, exp] of newUntil.current.entries()) {
        if (exp < now) newUntil.current.delete(k);
      }

      setTrades(j);
    } catch {
      // keep previous
    }
  };

  useInterval(fetchTrades, 5000);
  useInterval(fetchOverview, 7000);

  useEffect(() => {
    fetchTrades();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [limit]);

  const ts = overview?.ts ?? null;
  const total = overview?.admin?.accounts?.total ?? 0;
  const active = overview?.admin?.accounts?.active ?? 0;

  const items = useMemo(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const arr = (trades?.items ?? []) as any[];
    let out = arr;
    if (filter !== "all") {
      out = out.filter((it) => {
        const p = numish(it?.pnl_usdt);
        return filter === "wins" ? p > 0 : p < 0;
      });
    }
    return out.slice(0, limit);
  }, [trades, filter, limit]);

  const now = Date.now();

  return (
    <ModuleCard
      accent="violet"
      title="SimLab — Live Feed"
      subtitle={`accounts: ${total} \u00b7 active: ${active}`}
      right={<LiveDot ts={ts} />}
    >
      {/* heartbeat bar */}
      <div className="relative mb-4 h-[6px] overflow-hidden rounded-full border border-border/50 bg-surface2/30">
        <div className="heartbeat absolute inset-y-0 left-0 w-1/3 rounded-full bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      </div>

      <div className="grid gap-3 md:grid-cols-5">
        {([
          ["pnl_30d_usdt", "PnL (30d)", overview?.kpis?.pnl_30d_usdt ?? "\u2014"],
          ["win_rate", "Win rate", overview?.kpis?.win_rate ?? "\u2014"],
          ["trades_30d", "Trades (30d)", overview?.kpis?.trades_30d ?? 0],
          ["open_positions", "Open positions", overview?.kpis?.open_positions ?? 0],
          ["max_drawdown", "Max DD", overview?.kpis?.max_drawdown ?? "\u2014"],
        ] as [string, string, string | number][]).map(([key, label, val]) => (
          <div
            key={key}
            ref={(el) => {
              kpiRefs.current[key] = el;
            }}
            className="tile kpi-tile rounded-xl border border-border/50 bg-surface2/40 p-4"
          >
            <div className="text-xs font-mono text-muted">{label}</div>
            <div className="mt-1 text-lg font-semibold">{val}</div>
          </div>
        ))}
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-2">
        <div>
          <div className="mb-2 text-xs font-mono text-muted">30D curve</div>
          <Sparkline ariaLabel="simlab-curve-sparkline" points={overview?.curve ?? []} />
        </div>

        <div>
          <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
            <div className="text-xs font-mono text-muted">Live trades</div>
            <div className="flex flex-wrap gap-2">
              <Chip
                className={filter === "all" ? "border-violet-400/35 bg-violet-400/10 text-violet-200" : ""}
                onClick={() => setFilter("all")}
                role="button"
              >
                All
              </Chip>
              <Chip
                className={filter === "wins" ? "border-emerald-400/35 bg-emerald-400/10 text-emerald-200" : ""}
                onClick={() => setFilter("wins")}
                role="button"
              >
                Wins
              </Chip>
              <Chip
                className={filter === "losses" ? "border-rose-400/35 bg-rose-400/10 text-rose-200" : ""}
                onClick={() => setFilter("losses")}
                role="button"
              >
                Losses
              </Chip>

              <div className="mx-1 h-5 w-px bg-border/60" />

              {([10, 30, 50] as const).map((n) => (
                <Chip
                  key={n}
                  className={limit === n ? "border-cyan-400/35 bg-cyan-400/10 text-cyan-200" : ""}
                  onClick={() => setLimit(n)}
                  role="button"
                >
                  {n}
                </Chip>
              ))}
            </div>
          </div>

          <div className="rounded-xl border border-border/50 bg-surface2/35 overflow-hidden">
            <div className="grid grid-cols-6 gap-2 px-4 py-2 text-[11px] font-mono text-muted2 border-b border-border/40">
              <div className="col-span-2">time</div>
              <div>symbol</div>
              <div>side</div>
              <div className="col-span-2">pnl</div>
            </div>
            <div className="max-h-[280px] overflow-auto">
              {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
              {items.map((it: any, idx: number) => {
                const t = String(it?.t ?? "").slice(11, 19);
                const sym = it?.symbol ?? "\u2014";
                const side = String(it?.side ?? "\u2014").toUpperCase();
                const pnl = numish(it?.pnl_usdt);
                const key = `${it?.t}|${it?.account}|${it?.symbol}|${it?.side}|${it?.pnl_usdt}|${it?.price}`;
                const isNew = (newUntil.current.get(key) ?? 0) > now;
                return (
                  <div
                    key={idx}
                    className={`trade-row grid grid-cols-6 gap-2 px-4 py-2 text-sm border-b border-border/30 last:border-b-0 ${isNew ? "trade-new" : ""}`}
                  >
                    <div className="col-span-2 font-mono text-muted2 flex items-center gap-2">
                      {t || "\u2014"}
                      {isNew && (
                        <span className="new-badge inline-flex items-center rounded-full border border-cyan-400/35 bg-cyan-400/10 px-2 py-[2px] text-[10px] font-mono text-cyan-200">
                          NEW
                        </span>
                      )}
                    </div>
                    <div className="font-mono">{sym}</div>
                    <div className="font-mono text-muted">{side}</div>
                    <div className="col-span-2">
                      <PnlChip v={pnl} />
                    </div>
                  </div>
                );
              })}
              {!items.length && (
                <div className="px-4 py-6 text-xs font-mono text-muted2">Listening&hellip;</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </ModuleCard>
  );
}
