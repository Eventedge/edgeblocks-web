import { Button, Chip, Container, EmptyState, LiveDot, ModuleCard, ModuleIconBadge, SectionHeading, StatusStrip, UpdatedAgo } from "@/components/ui";
import { Sparkline } from "@/components/Sparkline";
import { SimLabLive } from "@/components/SimLabLive";
import { Divider, Metric } from "@/components/dashboard";

export const dynamic = "force-dynamic";

type KPI = { key: string; label: string; value: string; sub?: string };

async function getJSON<T>(url: string): Promise<T> {
  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) throw new Error(`Fetch failed: ${url}`);
  return res.json();
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function safeFetchJSON(url: string): Promise<any> {
  try {
    const res = await fetch(url, { cache: "no-store" });
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

const FALLBACK_KPIS: KPI[] = [
  { key: "btc_price", label: "BTC Price", value: "$—", sub: "wire EventEdge price feed" },
  { key: "funding_oiw", label: "Funding (OI-weighted)", value: "—", sub: "8h / 24h toggle" },
  { key: "open_interest", label: "Open Interest", value: "—", sub: "per exchange + total" },
  { key: "liq_24h", label: "Liquidations (24h)", value: "—", sub: "long/short breakdown" },
];

const FALLBACK_CARD = {
  price: "—", change_24h: "—", dominance: "—", vol_24h: "—",
  funding: "—", open_interest: "—", liquidations_24h: "—",
};

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

export default async function Dashboard() {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "https://edgeblocks.io";

  let kpis = FALLBACK_KPIS;
  let btcCard = FALLBACK_CARD;
  let marketTs: string | null = null;
  try {
    const overview = await getJSON<{ ts: string; kpis: KPI[] }>(`${base}/api/v1/market/overview`);
    kpis = overview.kpis || FALLBACK_KPIS;
    marketTs = overview.ts || null;
  } catch { /* use fallback */ }

  try {
    const btc = await getJSON<{ card: typeof FALLBACK_CARD }>(`${base}/api/v1/assets/BTC/card`);
    btcCard = btc.card || FALLBACK_CARD;
  } catch { /* use fallback */ }

  const fearGreed = await safeFetchJSON(`${base}/api/v1/sentiment/fear-greed`);
  const supercard = await safeFetchJSON(`${base}/api/v1/edge/supercard?symbol=BTC`);
  const regime = await safeFetchJSON(`${base}/api/v1/edge/regime`);
  const paper = await safeFetchJSON(`${base}/api/v1/paper/summary`);

  // SimLab admin live feed
  const simlab = await safeFetchJSON(`${base}/api/v1/simlab/overview?days=30`);
  const simTrades = await safeFetchJSON(`${base}/api/v1/simlab/trades/live?limit=30`);

  const renderTs = new Date().toISOString();

  const fgValue = fearGreed?.current?.value ?? null;
  const fgLabel = fearGreed?.current?.label ?? "—";
  const fgUpdated = fearGreed?.source_ts ?? fearGreed?.ts ?? null;
  const fgHist: Array<{ t: string; v: number }> = Array.isArray(fearGreed?.history) ? fearGreed.history : [];
  const fgVals = fgHist.map((p: { t: string; v: number }) => Number(p.v)).filter((n: number) => Number.isFinite(n));
  const fgPath = sparklinePath(fgVals);

  // Compute latest source_ts across all modules for the status strip
  const allTs = [marketTs, fgUpdated, supercard?.ts, regime?.ts, paper?.ts, simlab?.ts].filter(Boolean) as string[];
  const maxSourceTs = allTs.length ? allTs.sort().pop()! : null;

  return (
    <main className="min-h-screen">
      <Container>
        <header className="flex items-center justify-between gap-4 py-10">
          <div>
            <div className="text-xs font-mono text-muted">DASHBOARD</div>
            <div className="mt-1 text-2xl font-semibold">EdgeBlocks Intelligence</div>
            <div className="mt-1 text-sm text-muted">Real-time market data powered by EdgeCore snapshots</div>
          </div>
          <div className="flex gap-3">
            <Button href="/" variant="secondary">Back to site</Button>
            <Button href="https://app.edgeblocks.io" variant="primary">Enter App</Button>
          </div>
        </header>

        <StatusStrip ts={maxSourceTs} />

        <Divider />

        <SectionHeading
          eyebrow="MARKET DATA"
          title="Live market intelligence"
          desc="Sourced from EdgeCore snapshots via the EventEdge API. Refreshes every ~3–6 minutes."
        />

        <section className="mt-6 grid gap-4 lg:grid-cols-3">
          <ModuleCard
            accent="cyan"
            icon={<ModuleIconBadge icon="market" accent="cyan" />}
            title="Market Tiles"
            subtitle="Price, funding, OI, liquidations"
            right={<div className="flex flex-col items-end gap-1"><LiveDot ts={marketTs} /><UpdatedAgo ts={marketTs} renderTs={renderTs} /></div>}
            className="lg:col-span-2"
          >
            <div className="grid gap-3 sm:grid-cols-2">
              {kpis.map((k) => (
                <Metric key={k.key} label={k.label} value={k.value} sub={k.sub} />
              ))}
            </div>
          </ModuleCard>

          <ModuleCard
            accent="cyan"
            icon={<ModuleIconBadge icon="market" accent="cyan" />}
            title="BTC Snapshot"
            subtitle="Standardized bot-parity card"
            right={<div className="flex flex-col items-end gap-1"><LiveDot ts={marketTs} /><UpdatedAgo ts={marketTs} renderTs={renderTs} /></div>}
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
        </section>

        <section className="mt-4 grid gap-4 lg:grid-cols-3">
          <ModuleCard
            accent="amber"
            icon={<ModuleIconBadge icon="sentiment" accent="amber" />}
            title="Fear & Greed"
            subtitle="Behavioral context (Alternative.me)"
            right={<div className="flex flex-col items-end gap-1"><LiveDot ts={fgUpdated} /><UpdatedAgo ts={fgUpdated} renderTs={renderTs} /></div>}
          >
            <div className="flex items-end justify-between">
              <div>
                <div className="text-3xl font-semibold">{fgValue ?? "—"}</div>
                <div className="text-sm text-muted">{fgLabel}</div>
              </div>
            </div>
            <div className="mt-4 tile rounded-xl border border-border/50 bg-surface2/40 p-3">
              <div className="text-xs font-mono text-muted mb-2">7D HISTORY</div>
              {fgPath ? (
                <svg width="100%" height="44" viewBox="0 0 220 44" preserveAspectRatio="none" role="img" aria-label="Fear and Greed 7-day sparkline">
                  <path d={fgPath} fill="none" stroke="currentColor" strokeWidth="2" opacity="0.8" />
                </svg>
              ) : (
                <div className="h-10 text-sm text-muted flex items-center">No history</div>
              )}
              <div className="mt-1 text-xs text-muted2 font-mono">
                {fgVals.length >= 2 ? `${fgVals[0]} → ${fgVals[fgVals.length - 1]}` : "—"}
              </div>
            </div>
          </ModuleCard>

          <ModuleCard accent="cyan" className="lg:col-span-2">
            <EmptyState
              title="Funding / OI / Liq Charts"
              description="Lightweight SVG sparklines for derivatives data. Wiring to EdgeCore snapshot endpoints."
            />
          </ModuleCard>
        </section>

        <Divider />

        <SectionHeading
          eyebrow="EDGEBLOCKS EXCLUSIVES"
          title="Proprietary intelligence widgets"
          desc="These are EdgeBlocks-native views — not available anywhere else. Powered by EdgeCore analysis pipelines."
        />

        <section className="mt-6 grid gap-4 lg:grid-cols-3">
          {/* BTC SuperCard (Pillars) */}
          <ModuleCard
            accent="violet"
            icon={<ModuleIconBadge icon="supercard" accent="violet" />}
            title={supercard?.summary?.headline ?? "BTC SuperCard"}
            subtitle={`stance: ${supercard?.summary?.stance ?? "\u2014"} \u00b7 confidence: ${supercard?.summary?.confidence ?? "\u2014"}`}
            right={<div className="flex flex-col items-end gap-1"><LiveDot ts={supercard?.ts} /><UpdatedAgo ts={supercard?.ts} renderTs={renderTs} /></div>}
          >
            <div className="space-y-2">
              {(supercard?.pillars ?? []).map((p: { key: string; label: string; value: string; status: string; hint: string }) => (
                <div key={p.key} className="tile flex items-center justify-between gap-2 rounded-xl border border-border/50 bg-surface2/40 px-4 py-2">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-muted">{p.label}</span>
                      <span className={`inline-block rounded-full border px-2 py-0.5 text-[10px] font-mono leading-tight ${
                        p.status === "positive" ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-300" :
                        p.status === "negative" ? "border-rose-500/30 bg-rose-500/10 text-rose-300" :
                        "border-border/60 bg-surface2/40 text-muted2"
                      }`}>{p.status ?? "neutral"}</span>
                    </div>
                    <div className="mt-0.5 text-xs text-muted2">{p.hint}</div>
                  </div>
                  <span className="shrink-0 text-sm font-mono text-fg">{p.value ?? "—"}</span>
                </div>
              ))}
              {(!supercard?.pillars || supercard.pillars.length === 0) && (
                <div className="rounded-xl border border-border/50 bg-surface2/40 px-4 py-3 text-sm text-muted">
                  SuperCard endpoint not available
                </div>
              )}
            </div>
            {supercard?.summary?.notes && supercard.summary.notes.some((n: string) => n && n !== "\u2014") && (
              <div className="mt-3 space-y-1">
                {supercard.summary.notes.filter((n: string) => n && n !== "\u2014").map((n: string, i: number) => (
                  <div key={i} className="text-xs text-muted2">{"\u00b7"} {n}</div>
                ))}
              </div>
            )}
            <details className="mt-4 text-xs text-muted2 font-mono">
              <summary className="cursor-pointer text-muted hover:text-fg">info</summary>
              <div className="mt-1">{supercard?.disclaimer ?? "\u2014"}</div>
            </details>
          </ModuleCard>

          {/* Market Regime */}
          <ModuleCard
            accent="emerald"
            icon={<ModuleIconBadge icon="regime" accent="emerald" />}
            title="Market Regime"
            right={<div className="flex flex-col items-end gap-1"><LiveDot ts={regime?.ts} /><UpdatedAgo ts={regime?.ts} renderTs={renderTs} /></div>}
          >
            <div className="flex flex-col items-center justify-center rounded-xl border border-border/50 bg-surface2/40 py-6">
              <div className="text-3xl font-semibold">{regime?.regime?.label ?? "\u2014"}</div>
              <div className="mt-2"><Chip>confidence: {regime?.regime?.confidence ?? "\u2014"}</Chip></div>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-2">
              {(regime?.axes ?? []).map((a: { key: string; label: string; value: string }) => (
                <div key={a.key} className="tile flex items-center justify-between rounded-xl border border-border/50 bg-surface2/40 px-3 py-2">
                  <span className="text-xs text-muted">{a.label}</span>
                  <span className="text-xs font-mono font-semibold text-fg">{a.value ?? "\u2014"}</span>
                </div>
              ))}
            </div>
            <div className="mt-3 space-y-1">
              {(regime?.drivers ?? []).filter((d: string) => d && d !== "\u2014").slice(0, 3).map((d: string, i: number) => (
                <div key={i} className="tile rounded-xl border border-border/50 bg-surface2/40 px-3 py-2 text-xs text-fg">
                  {d}
                </div>
              ))}
            </div>
            <details className="mt-4 text-xs text-muted2 font-mono">
              <summary className="cursor-pointer text-muted hover:text-fg">info</summary>
              <div className="mt-1">{regime?.disclaimer ?? "\u2014"}</div>
            </details>
          </ModuleCard>

          {/* Paper Trader / Strategy Outcomes */}
          <ModuleCard
            accent="rose"
            icon={<ModuleIconBadge icon="paper" accent="rose" />}
            title="Paper Trader"
            subtitle="Bot simulation outcomes"
            right={<div className="flex flex-col items-end gap-1"><LiveDot ts={paper?.ts} /><UpdatedAgo ts={paper?.ts} renderTs={renderTs} /></div>}
          >
            <div className="grid grid-cols-2 gap-2">
              <div className="tile rounded-xl border border-border/50 bg-surface2/40 p-3 text-center">
                <div className="text-xs font-mono text-muted">Win rate</div>
                <div className="mt-1 text-base font-semibold text-fg">{paper?.kpis?.win_rate ?? "\u2014"}</div>
              </div>
              <div className="tile rounded-xl border border-border/50 bg-surface2/40 p-3 text-center">
                <div className="text-xs font-mono text-muted">Active positions</div>
                <div className="mt-1 text-base font-semibold text-fg">{paper?.kpis?.active_positions ?? "\u2014"}</div>
              </div>
              {paper?.kpis?.equity_30d && paper.kpis.equity_30d !== "\u2014" && (
                <div className="tile rounded-xl border border-border/50 bg-surface2/40 p-3 text-center">
                  <div className="text-xs font-mono text-muted">Equity (30d)</div>
                  <div className="mt-1 text-base font-semibold text-fg">{paper.kpis.equity_30d}</div>
                </div>
              )}
              {paper?.kpis?.max_drawdown && paper.kpis.max_drawdown !== "\u2014" && (
                <div className="tile rounded-xl border border-border/50 bg-surface2/40 p-3 text-center">
                  <div className="text-xs font-mono text-muted">Max drawdown</div>
                  <div className="mt-1 text-base font-semibold text-fg">{paper.kpis.max_drawdown}</div>
                </div>
              )}
            </div>
            <div className="mt-3 tile rounded-xl border border-border/50 bg-surface2/40 p-4">
              <div className="text-xs font-mono text-muted">Accounts</div>
              <div className="mt-2 flex gap-3 text-sm">
                <Chip>active: {paper?.accounts?.active ?? 0}</Chip>
                <Chip>tracked: {paper?.accounts?.tracked ?? 0}</Chip>
              </div>
            </div>

            <div className="mt-3">
              <div className="mb-2 text-xs font-mono text-muted">Equity curve (30d)</div>
              <Sparkline
                ariaLabel="paper-equity-sparkline"
                points={paper?.sample?.equity_curve ?? []}
              />
            </div>

            <details className="mt-4 text-xs text-muted2 font-mono">
              <summary className="cursor-pointer text-muted hover:text-fg">info</summary>
              <div className="mt-1">{paper?.disclaimer ?? "\u2014"}</div>
            </details>
          </ModuleCard>
        </section>

        <Divider />

        {/* SimLab Live Trading */}
        <SectionHeading
          eyebrow="SIMLAB"
          title="SimLab Live Trading"
          desc="Admin paper-trading agent feed: 30D curve + KPIs + live trades across the SimLab accounts."
        />

        <section className="mt-6">
          <SimLabLive initialOverview={simlab} initialTrades={simTrades} />
        </section>

        <Divider />

        <div className="mb-4 text-xs font-mono text-muted2 tracking-widest">COMING SOON</div>
        <section className="grid gap-4 lg:grid-cols-2 pb-14">
          <EmptyState
            title="Top Movers"
            description="Ranked asset table with 24h change, volume, and signal strength. Coming when multi-asset snapshots land."
          />
          <EmptyState
            title="Alert Feed"
            description="Live stream of EdgeCore snapshot events — price updates, funding shifts, liquidation spikes."
          />
        </section>

        <footer className="border-t border-border py-10 text-sm text-muted2">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>EdgeBlocks Intelligence • Powered by EdgeCore</div>
            <div className="flex gap-4">
              <a className="hover:text-fg" href="/proofclaw">ProofClaw</a>
              <a className="hover:text-fg" href="/datasnype">DataSnype</a>
            </div>
          </div>
        </footer>
      </Container>
    </main>
  );
}
