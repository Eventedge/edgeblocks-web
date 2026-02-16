"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  Chip,
  EmptyState,
  LiveDot,
  ModuleCard,
  ModuleIconBadge,
  SectionHeading,
  StatusStrip,
} from "@/components/ui";
import { Sparkline } from "@/components/Sparkline";
import { SimLabLive } from "@/components/SimLabLive";
import { Divider, Metric } from "@/components/dashboard";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Any = any;

type KPI = { key: string; label: string; value: string; sub?: string };

type SystemEvent = {
  id: number;
  time: string;
  type: string;
  typeLabel: string;
  message: string;
};

export type DashboardInitial = {
  marketOverview: Any;
  btcCardData: Any;
  fearGreed: Any;
  supercard: Any;
  regime: Any;
  paper: Any;
  simlab: Any;
  simTrades: Any;
};

/* ------------------------------------------------------------------ */
/*  Constants                                                          */
/* ------------------------------------------------------------------ */

const FALLBACK_KPIS: KPI[] = [
  { key: "btc_price", label: "BTC Price", value: "$\u2014", sub: "wire EventEdge price feed" },
  { key: "funding_oiw", label: "Funding (OI-weighted)", value: "\u2014", sub: "8h / 24h toggle" },
  { key: "open_interest", label: "Open Interest", value: "\u2014", sub: "per exchange + total" },
  { key: "liq_24h", label: "Liquidations (24h)", value: "\u2014", sub: "long/short breakdown" },
];

const FALLBACK_CARD: Record<string, string> = {
  price: "\u2014",
  change_24h: "\u2014",
  dominance: "\u2014",
  vol_24h: "\u2014",
  funding: "\u2014",
  open_interest: "\u2014",
  liquidations_24h: "\u2014",
};

const EVENT_STYLE: Record<string, string> = {
  MARKET_UPDATE: "border-cyan-400/30 bg-cyan-400/10 text-cyan-200",
  FNG_REFRESH: "border-amber-400/30 bg-amber-400/10 text-amber-200",
  SUPERCARD_UPDATE: "border-violet-400/30 bg-violet-400/10 text-violet-200",
  REGIME_UPDATE: "border-emerald-400/30 bg-emerald-400/10 text-emerald-200",
  PAPER_UPDATE: "border-rose-400/30 bg-rose-400/10 text-rose-200",
  SIMLAB_TRADE: "border-violet-400/30 bg-violet-400/10 text-violet-200",
};

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

function sparklinePath(values: number[], w = 220, h = 44, pad = 4): string {
  if (!values || values.length < 2) return "";
  const min = Math.min(...values);
  const max = Math.max(...values);
  const span = max - min || 1;
  const innerW = w - pad * 2;
  const innerH = h - pad * 2;
  return values
    .map((v, i) => {
      const x = pad + (innerW * i) / (values.length - 1);
      const y = pad + innerH - ((v - min) / span) * innerH;
      return `${i === 0 ? "M" : "L"} ${x.toFixed(2)} ${y.toFixed(2)}`;
    })
    .join(" ");
}

function agoLabel(ts: string | null | undefined, now: number): string {
  if (!ts) return "";
  const diff = Math.max(0, Math.floor((now - new Date(ts).getTime()) / 1000));
  if (diff < 60) return `${diff}s ago`;
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  return `${Math.floor(diff / 3600)}h ago`;
}

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

async function fetchJSON(url: string): Promise<Any> {
  try {
    const res = await fetch(url, { cache: "no-store" });
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

function flashEl(el: HTMLElement | null) {
  if (!el) return;
  el.classList.remove("header-flash");
  // eslint-disable-next-line @typescript-eslint/no-unused-expressions
  el.offsetHeight;
  el.classList.add("header-flash");
  setTimeout(() => el.classList.remove("header-flash"), 700);
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export function DashboardLive({ initial }: { initial: DashboardInitial }) {
  /* --- module data ------------------------------------------------ */
  const [market, setMarket] = useState<Any>(initial.marketOverview);
  const [btc, setBtc] = useState<Any>(initial.btcCardData);
  const [fg, setFg] = useState<Any>(initial.fearGreed);
  const [sc, setSc] = useState<Any>(initial.supercard);
  const [reg, setReg] = useState<Any>(initial.regime);
  const [pap, setPap] = useState<Any>(initial.paper);

  /* --- system events ---------------------------------------------- */
  const evtId = useRef(0);
  const [events, setEvents] = useState<SystemEvent[]>([]);

  function addEvent(type: string, typeLabel: string, message: string) {
    evtId.current += 1;
    setEvents((prev) =>
      [
        {
          id: evtId.current,
          time: new Date().toLocaleTimeString("en-GB"),
          type,
          typeLabel,
          message,
        },
        ...prev,
      ].slice(0, 30),
    );
  }

  /* --- flash refs ------------------------------------------------- */
  const marketRef = useRef<HTMLDivElement>(null);
  const btcRef = useRef<HTMLDivElement>(null);
  const fgRef = useRef<HTMLDivElement>(null);
  const scRef = useRef<HTMLDivElement>(null);
  const regRef = useRef<HTMLDivElement>(null);
  const papRef = useRef<HTMLDivElement>(null);

  /* --- previous ts for change detection --------------------------- */
  const prevMarketTs = useRef(initial.marketOverview?.ts ?? null);
  const prevBtcJson = useRef(JSON.stringify(initial.btcCardData?.card));
  const prevFgTs = useRef(initial.fearGreed?.source_ts ?? initial.fearGreed?.ts ?? null);
  const prevScTs = useRef(initial.supercard?.ts ?? null);
  const prevRegTs = useRef(initial.regime?.ts ?? null);
  const prevRegLabel = useRef<string | null>(initial.regime?.regime?.label ?? null);
  const prevPapTs = useRef(initial.paper?.ts ?? null);

  /* --- tick for "ago" labels -------------------------------------- */
  const [now, setNow] = useState(Date.now());
  useInterval(() => setNow(Date.now()), 1000);

  /* --- polling ---------------------------------------------------- */
  useInterval(async () => {
    const data = await fetchJSON("/api/v1/market/overview");
    if (!data) return;
    const ts = data.ts ?? null;
    if (ts && ts !== prevMarketTs.current) {
      prevMarketTs.current = ts;
      setMarket(data);
      flashEl(marketRef.current);
      addEvent("MARKET_UPDATE", "MKT", "Market tiles refreshed");
    }
  }, 15_000);

  useInterval(async () => {
    const data = await fetchJSON("/api/v1/assets/BTC/card");
    if (!data) return;
    const json = JSON.stringify(data.card);
    if (json !== prevBtcJson.current) {
      prevBtcJson.current = json;
      setBtc(data);
      flashEl(btcRef.current);
    }
  }, 15_000);

  useInterval(async () => {
    const data = await fetchJSON("/api/v1/sentiment/fear-greed");
    if (!data) return;
    const ts = data.source_ts ?? data.ts ?? null;
    if (ts && ts !== prevFgTs.current) {
      prevFgTs.current = ts;
      setFg(data);
      flashEl(fgRef.current);
      const v = data.current?.value ?? "\u2014";
      const l = data.current?.label ?? "";
      addEvent("FNG_REFRESH", "F&G", `Fear & Greed: ${v} (${l})`);
    }
  }, 30_000);

  useInterval(async () => {
    const data = await fetchJSON("/api/v1/edge/supercard?symbol=BTC");
    if (!data) return;
    const ts = data.ts ?? null;
    if (ts && ts !== prevScTs.current) {
      prevScTs.current = ts;
      setSc(data);
      flashEl(scRef.current);
      addEvent("SUPERCARD_UPDATE", "CARD", `SuperCard: stance ${data.summary?.stance ?? "\u2014"}`);
    }
  }, 20_000);

  useInterval(async () => {
    const data = await fetchJSON("/api/v1/edge/regime");
    if (!data) return;
    const ts = data.ts ?? null;
    if (ts && ts !== prevRegTs.current) {
      prevRegTs.current = ts;
      const oldLabel = prevRegLabel.current;
      const newLabel = data.regime?.label ?? "\u2014";
      prevRegLabel.current = newLabel;
      setReg(data);
      flashEl(regRef.current);
      const msg =
        oldLabel && oldLabel !== newLabel
          ? `Regime: ${oldLabel} \u2192 ${newLabel}`
          : `Regime: ${newLabel}`;
      addEvent("REGIME_UPDATE", "REG", msg);
    }
  }, 20_000);

  useInterval(async () => {
    const data = await fetchJSON("/api/v1/paper/summary");
    if (!data) return;
    const ts = data.ts ?? null;
    if (ts && ts !== prevPapTs.current) {
      prevPapTs.current = ts;
      setPap(data);
      flashEl(papRef.current);
      addEvent("PAPER_UPDATE", "PAPER", `Paper trader: ${data.kpis?.active_positions ?? "\u2014"} active positions`);
    }
  }, 30_000);

  /* SimLab event callback */
  const handleSimLabEvent = (type: string, message: string) => {
    addEvent(type, "SIM", message);
  };

  /* --- derived data ----------------------------------------------- */
  const kpis: KPI[] = market?.kpis || FALLBACK_KPIS;
  const marketTs: string | null = market?.ts ?? null;
  const btcCard: Record<string, string> = btc?.card || FALLBACK_CARD;

  const fgValue = fg?.current?.value ?? null;
  const fgLabel = fg?.current?.label ?? "\u2014";
  const fgUpdated: string | null = fg?.source_ts ?? fg?.ts ?? null;
  const fgHist: Array<{ t: string; v: number }> = Array.isArray(fg?.history) ? fg.history : [];
  const fgVals = fgHist
    .map((p: { t: string; v: number }) => Number(p.v))
    .filter((n: number) => Number.isFinite(n));
  const fgPath = sparklinePath(fgVals);

  const allTs = [marketTs, fgUpdated, sc?.ts, reg?.ts, pap?.ts].filter(Boolean) as string[];
  const maxSourceTs = allTs.length ? [...allTs].sort().pop()! : null;

  /* helper: right slot for module headers */
  function liveRight(ts: string | null | undefined) {
    return (
      <div className="flex flex-col items-end gap-1">
        <LiveDot ts={ts} />
        {ts && <span className="text-[10px] font-mono text-muted2">{agoLabel(ts, now)}</span>}
      </div>
    );
  }

  /* ================================================================ */
  /*  Render                                                           */
  /* ================================================================ */

  return (
    <>
      {/* ---- Status Strip ---- */}
      <StatusStrip ts={maxSourceTs} />

      <Divider />

      {/* ---- MARKET DATA ---- */}
      <SectionHeading
        eyebrow="MARKET DATA"
        title="Live market intelligence"
        desc="Sourced from EdgeCore snapshots via the EventEdge API. Auto-refreshes every 15–30 s."
      />

      <section className="mt-6 grid gap-4 lg:grid-cols-3">
        <div ref={marketRef} className="lg:col-span-2">
          <ModuleCard
            accent="cyan"
            icon={<ModuleIconBadge icon="market" accent="cyan" />}
            title="Market Tiles"
            subtitle="Price, funding, OI, liquidations"
            right={liveRight(marketTs)}
          >
            <div className="grid gap-3 sm:grid-cols-2">
              {kpis.map((k) => (
                <Metric key={k.key} label={k.label} value={k.value} sub={k.sub} />
              ))}
            </div>
          </ModuleCard>
        </div>

        <div ref={btcRef}>
          <ModuleCard
            accent="cyan"
            icon={<ModuleIconBadge icon="market" accent="cyan" />}
            title="BTC Snapshot"
            subtitle="Standardized bot-parity card"
            right={liveRight(marketTs)}
          >
            <div className="grid gap-3 sm:grid-cols-2">
              {Object.entries(btcCard).map(([k, v]) => (
                <div key={k} className="tile rounded-xl border border-border/50 bg-surface2/40 p-3">
                  <div className="text-xs font-mono text-muted">{k}</div>
                  <div className="mt-1 text-base font-semibold">{String(v)}</div>
                </div>
              ))}
            </div>
          </ModuleCard>
        </div>
      </section>

      <section className="mt-4 grid gap-4 lg:grid-cols-3">
        <div ref={fgRef}>
          <ModuleCard
            accent="amber"
            icon={<ModuleIconBadge icon="sentiment" accent="amber" />}
            title="Fear & Greed"
            subtitle="Behavioral context (Alternative.me)"
            right={liveRight(fgUpdated)}
          >
            <div className="flex items-end justify-between">
              <div>
                <div className="text-3xl font-semibold">{fgValue ?? "\u2014"}</div>
                <div className="text-sm text-muted">{fgLabel}</div>
              </div>
            </div>
            <div className="mt-4 tile rounded-xl border border-border/50 bg-surface2/40 p-3">
              <div className="text-xs font-mono text-muted mb-2">7D HISTORY</div>
              {fgPath ? (
                <svg
                  width="100%"
                  height="44"
                  viewBox="0 0 220 44"
                  preserveAspectRatio="none"
                  role="img"
                  aria-label="Fear and Greed 7-day sparkline"
                >
                  <path d={fgPath} fill="none" stroke="currentColor" strokeWidth="2" opacity="0.8" />
                </svg>
              ) : (
                <div className="h-10 text-sm text-muted flex items-center">No history</div>
              )}
              <div className="mt-1 text-xs text-muted2 font-mono">
                {fgVals.length >= 2 ? `${fgVals[0]} \u2192 ${fgVals[fgVals.length - 1]}` : "\u2014"}
              </div>
            </div>
          </ModuleCard>
        </div>

        <ModuleCard accent="cyan" className="lg:col-span-2">
          <EmptyState
            title="Funding / OI / Liq Charts"
            description="Lightweight SVG sparklines for derivatives data. Wiring to EdgeCore snapshot endpoints."
          />
        </ModuleCard>
      </section>

      <Divider />

      {/* ---- EDGEBLOCKS EXCLUSIVES ---- */}
      <SectionHeading
        eyebrow="EDGEBLOCKS EXCLUSIVES"
        title="Proprietary intelligence widgets"
        desc="EdgeBlocks-native views powered by EdgeCore analysis pipelines."
      />

      <section className="mt-6 grid gap-4 lg:grid-cols-3">
        {/* SuperCard */}
        <div ref={scRef}>
          <ModuleCard
            accent="violet"
            icon={<ModuleIconBadge icon="supercard" accent="violet" />}
            title={sc?.summary?.headline ?? "BTC SuperCard"}
            subtitle={`stance: ${sc?.summary?.stance ?? "\u2014"} \u00b7 confidence: ${sc?.summary?.confidence ?? "\u2014"}`}
            right={liveRight(sc?.ts)}
          >
            <div className="space-y-2">
              {(sc?.pillars ?? []).map(
                (p: { key: string; label: string; value: string; status: string; hint: string }) => (
                  <div
                    key={p.key}
                    className="tile flex items-center justify-between gap-2 rounded-xl border border-border/50 bg-surface2/40 px-4 py-2"
                  >
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-muted">{p.label}</span>
                        <span
                          className={`inline-block rounded-full border px-2 py-0.5 text-[10px] font-mono leading-tight ${
                            p.status === "positive"
                              ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-300"
                              : p.status === "negative"
                                ? "border-rose-500/30 bg-rose-500/10 text-rose-300"
                                : "border-border/60 bg-surface2/40 text-muted2"
                          }`}
                        >
                          {p.status ?? "neutral"}
                        </span>
                      </div>
                      <div className="mt-0.5 text-xs text-muted2">{p.hint}</div>
                    </div>
                    <span className="shrink-0 text-sm font-mono text-fg">{p.value ?? "\u2014"}</span>
                  </div>
                ),
              )}
              {(!sc?.pillars || sc.pillars.length === 0) && (
                <div className="rounded-xl border border-border/50 bg-surface2/40 px-4 py-3 text-sm text-muted">
                  SuperCard endpoint not available
                </div>
              )}
            </div>
            {sc?.summary?.notes &&
              sc.summary.notes.some((n: string) => n && n !== "\u2014") && (
                <div className="mt-3 space-y-1">
                  {sc.summary.notes
                    .filter((n: string) => n && n !== "\u2014")
                    .map((n: string, i: number) => (
                      <div key={i} className="text-xs text-muted2">
                        {"\u00b7"} {n}
                      </div>
                    ))}
                </div>
              )}
            <details className="mt-4 text-xs text-muted2 font-mono">
              <summary className="cursor-pointer text-muted hover:text-fg">info</summary>
              <div className="mt-1">{sc?.disclaimer ?? "\u2014"}</div>
            </details>
          </ModuleCard>
        </div>

        {/* Regime */}
        <div ref={regRef}>
          <ModuleCard
            accent="emerald"
            icon={<ModuleIconBadge icon="regime" accent="emerald" />}
            title="Market Regime"
            right={liveRight(reg?.ts)}
          >
            <div className="flex flex-col items-center justify-center rounded-xl border border-border/50 bg-surface2/40 py-6">
              <div className="text-3xl font-semibold">{reg?.regime?.label ?? "\u2014"}</div>
              <div className="mt-2">
                <Chip>confidence: {reg?.regime?.confidence ?? "\u2014"}</Chip>
              </div>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-2">
              {(reg?.axes ?? []).map((a: { key: string; label: string; value: string }) => (
                <div
                  key={a.key}
                  className="tile flex items-center justify-between rounded-xl border border-border/50 bg-surface2/40 px-3 py-2"
                >
                  <span className="text-xs text-muted">{a.label}</span>
                  <span className="text-xs font-mono font-semibold text-fg">{a.value ?? "\u2014"}</span>
                </div>
              ))}
            </div>
            <div className="mt-3 space-y-1">
              {(reg?.drivers ?? [])
                .filter((d: string) => d && d !== "\u2014")
                .slice(0, 3)
                .map((d: string, i: number) => (
                  <div
                    key={i}
                    className="tile rounded-xl border border-border/50 bg-surface2/40 px-3 py-2 text-xs text-fg"
                  >
                    {d}
                  </div>
                ))}
            </div>
            <details className="mt-4 text-xs text-muted2 font-mono">
              <summary className="cursor-pointer text-muted hover:text-fg">info</summary>
              <div className="mt-1">{reg?.disclaimer ?? "\u2014"}</div>
            </details>
          </ModuleCard>
        </div>

        {/* Paper Trader */}
        <div ref={papRef}>
          <ModuleCard
            accent="rose"
            icon={<ModuleIconBadge icon="paper" accent="rose" />}
            title="Paper Trader"
            subtitle="Bot simulation outcomes"
            right={liveRight(pap?.ts)}
          >
            <div className="grid grid-cols-2 gap-2">
              <div className="tile rounded-xl border border-border/50 bg-surface2/40 p-3 text-center">
                <div className="text-xs font-mono text-muted">Win rate</div>
                <div className="mt-1 text-base font-semibold text-fg">{pap?.kpis?.win_rate ?? "\u2014"}</div>
              </div>
              <div className="tile rounded-xl border border-border/50 bg-surface2/40 p-3 text-center">
                <div className="text-xs font-mono text-muted">Active positions</div>
                <div className="mt-1 text-base font-semibold text-fg">
                  {pap?.kpis?.active_positions ?? "\u2014"}
                </div>
              </div>
              {pap?.kpis?.equity_30d && pap.kpis.equity_30d !== "\u2014" && (
                <div className="tile rounded-xl border border-border/50 bg-surface2/40 p-3 text-center">
                  <div className="text-xs font-mono text-muted">Equity (30d)</div>
                  <div className="mt-1 text-base font-semibold text-fg">{pap.kpis.equity_30d}</div>
                </div>
              )}
              {pap?.kpis?.max_drawdown && pap.kpis.max_drawdown !== "\u2014" && (
                <div className="tile rounded-xl border border-border/50 bg-surface2/40 p-3 text-center">
                  <div className="text-xs font-mono text-muted">Max drawdown</div>
                  <div className="mt-1 text-base font-semibold text-fg">{pap.kpis.max_drawdown}</div>
                </div>
              )}
            </div>
            <div className="mt-3 tile rounded-xl border border-border/50 bg-surface2/40 p-4">
              <div className="text-xs font-mono text-muted">Accounts</div>
              <div className="mt-2 flex gap-3 text-sm">
                <Chip>active: {pap?.accounts?.active ?? 0}</Chip>
                <Chip>tracked: {pap?.accounts?.tracked ?? 0}</Chip>
              </div>
            </div>
            <div className="mt-3">
              <div className="mb-2 text-xs font-mono text-muted">Equity curve (30d)</div>
              <Sparkline ariaLabel="paper-equity-sparkline" points={pap?.sample?.equity_curve ?? []} />
            </div>
            <details className="mt-4 text-xs text-muted2 font-mono">
              <summary className="cursor-pointer text-muted hover:text-fg">info</summary>
              <div className="mt-1">{pap?.disclaimer ?? "\u2014"}</div>
            </details>
          </ModuleCard>
        </div>
      </section>

      <Divider />

      {/* ---- SIMLAB ---- */}
      <SectionHeading
        eyebrow="SIMLAB"
        title="SimLab Live Trading"
        desc="Admin paper-trading agent feed: 30D curve + KPIs + live trades across the SimLab accounts."
      />

      <section className="mt-6">
        <SimLabLive
          initialOverview={initial.simlab}
          initialTrades={initial.simTrades}
          onEvent={handleSimLabEvent}
        />
      </section>

      <Divider />

      {/* ---- SYSTEM EVENTS FEED ---- */}
      <section id="events" className="pb-14 scroll-mt-16">
        <ModuleCard
          accent="cyan"
          icon={<ModuleIconBadge icon="events" accent="cyan" />}
          title="System Events"
          subtitle="Live module update log"
          right={<LiveDot label={`${events.length} events`} />}
        >
          <div className="rounded-xl border border-border/50 bg-surface2/35 overflow-hidden">
            <div className="max-h-[300px] overflow-auto">
              {events.map((e) => (
                <div
                  key={e.id}
                  className="event-row flex items-center gap-3 px-4 py-2.5 border-b border-border/30 last:border-b-0"
                >
                  <span className="shrink-0 text-[11px] font-mono text-muted2 w-[60px]">{e.time}</span>
                  <span
                    className={`shrink-0 inline-flex items-center rounded-full border px-2 py-0.5 text-[10px] font-mono leading-tight ${
                      EVENT_STYLE[e.type] ?? "border-border/60 bg-surface2/40 text-muted2"
                    }`}
                  >
                    {e.typeLabel}
                  </span>
                  <span className="text-sm text-muted truncate">{e.message}</span>
                </div>
              ))}
              {events.length === 0 && (
                <div className="px-4 py-8 text-center text-xs font-mono text-muted2">
                  Listening for module updates&hellip;
                </div>
              )}
            </div>
          </div>
        </ModuleCard>
      </section>
    </>
  );
}
