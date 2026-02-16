import { Button, Chip, Container, SectionHeading } from "@/components/ui";
import { ChartPlaceholder, Divider, Metric, Table } from "@/components/dashboard";

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

const FALLBACK_FG = {
  ts: "—", current: { value: 50, label: "Neutral" }, history: [],
};

export default async function Dashboard() {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "https://edgeblocks.io";

  let kpis = FALLBACK_KPIS;
  let btcCard = FALLBACK_CARD;
  let fg = FALLBACK_FG;

  try {
    const overview = await getJSON<{ ts: string; kpis: KPI[] }>(`${base}/api/v1/market/overview`);
    kpis = overview.kpis || FALLBACK_KPIS;
  } catch { /* use fallback */ }

  try {
    const btc = await getJSON<{ card: typeof FALLBACK_CARD }>(`${base}/api/v1/assets/BTC/card`);
    btcCard = btc.card || FALLBACK_CARD;
  } catch { /* use fallback */ }

  try {
    const fgRes = await getJSON<typeof FALLBACK_FG>(`${base}/api/v1/sentiment/fear-greed`);
    fg = fgRes;
  } catch { /* use fallback */ }

  const supercard = await safeFetchJSON(`${base}/api/v1/edge/supercard?symbol=BTC`);
  const regime = await safeFetchJSON(`${base}/api/v1/edge/regime`);
  const paper = await safeFetchJSON(`${base}/api/v1/paper/summary`);

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

        <div className="flex flex-wrap items-center justify-between gap-4">
          <Chip>API-backed • Bot-native widgets • Refreshes every ~3–6 min</Chip>
          <div className="flex flex-wrap gap-3 text-sm">
            <div className="rounded-xl border border-border bg-surface px-4 py-2 text-muted">
              Symbol: <span className="text-fg font-semibold">BTC</span>
            </div>
            <div className="rounded-xl border border-border bg-surface px-4 py-2 text-muted">
              Window: <span className="text-fg font-semibold">24h</span>
            </div>
          </div>
        </div>

        <Divider />

        <SectionHeading
          eyebrow="KPIs"
          title="Live market tiles"
          desc="Sourced from EdgeCore snapshots via the EventEdge API. Prices, funding, open interest, and liquidations refresh every ~3–6 minutes."
        />

        <section className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {kpis.map((k) => (
            <Metric key={k.key} label={k.label} value={k.value} sub={k.sub} />
          ))}
        </section>

        <Divider />

        <SectionHeading
          eyebrow="BTC CARD"
          title={`The \u201cBTC card\u201d widget (bot parity)`}
          desc="This is the exact widget we'll match to your bot output: price, funding, OI, liquidations, dominance, volume — standardized and embeddable."
        />

        <section className="mt-6 grid gap-4 lg:grid-cols-3">
          <div className="rounded-2xl border border-border bg-surface p-6 lg:col-span-2">
            <div className="text-xs font-mono text-muted">BTC CARD</div>
            <div className="mt-1 text-lg font-semibold">BTC Snapshot</div>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {Object.entries(btcCard).map(([k, v]) => (
                <div key={k} className="rounded-xl border border-border/70 bg-surface2/50 p-4">
                  <div className="text-xs font-mono text-muted">{k}</div>
                  <div className="mt-1 text-base font-semibold">{String(v)}</div>
                </div>
              ))}
            </div>
            <div className="mt-4 text-xs text-muted2 font-mono">
              * Live data from EdgeCore snapshots.
            </div>
          </div>

          <div className="space-y-4">
            <ChartPlaceholder
              title="Funding / OI / Liq (placeholder)"
              note="Next: render small sparklines or lightweight SVG charts (no heavy chart libs)."
            />
            <div className="rounded-2xl border border-border bg-surface p-6">
              <div className="text-xs font-mono text-muted">SENTIMENT</div>
              <div className="mt-1 text-lg font-semibold">Fear & Greed</div>
              <div className="mt-3 flex items-end justify-between">
                <div>
                  <div className="text-3xl font-semibold">{fg.current?.value ?? "—"}</div>
                  <div className="text-sm text-muted">{fg.current?.label ?? "—"}</div>
                </div>
                <div className="text-xs text-muted2 font-mono">ts: {typeof fg.ts === "string" ? fg.ts.slice(0, 19) : "—"}</div>
              </div>
              <div className="mt-4 h-10 rounded-xl border border-border/70 bg-surface2/60" />
              <div className="mt-3 text-xs text-muted2 font-mono">
                * Placeholder sparkline area. Later: mini SVG from history.
              </div>
            </div>
          </div>
        </section>

        <Divider />

        <SectionHeading
          eyebrow="EDGEBLOCKS EXCLUSIVES"
          title="Proprietary intelligence widgets"
          desc="These are EdgeBlocks-native views — not available anywhere else. Powered by EdgeCore analysis pipelines."
        />

        <section className="mt-6 grid gap-4 lg:grid-cols-3">
          {/* BTC SuperCard (Pillars) */}
          <div className="rounded-2xl border border-border bg-surface/70 p-6 backdrop-blur">
            <div className="text-xs font-mono text-accentCyan">SUPERCARD</div>
            <div className="mt-1 text-lg font-semibold">BTC SuperCard</div>
            <div className="mt-1 text-sm text-muted">
              {supercard?.summary?.headline !== "—" ? supercard.summary.headline : "Pillar-based composite view"}
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              <Chip>stance: {supercard?.summary?.stance ?? "—"}</Chip>
              <Chip>confidence: {supercard?.summary?.confidence ?? "—"}</Chip>
              <Chip>{supercard?.version ?? "—"}</Chip>
            </div>
            <div className="mt-4 space-y-2">
              {(supercard?.pillars ?? []).map((p: { key: string; label: string; value: string; status: string; hint: string }) => (
                <div key={p.key} className="flex items-center justify-between rounded-xl border border-border/70 bg-surface2/50 px-4 py-2">
                  <div>
                    <span className="text-sm text-muted">{p.label}</span>
                    <span className="ml-2 text-xs text-muted2">{p.hint}</span>
                  </div>
                  <span className="text-sm font-mono text-muted2">{p.value ?? "—"}</span>
                </div>
              ))}
              {(!supercard?.pillars || supercard.pillars.length === 0) && (
                <div className="rounded-xl border border-border/70 bg-surface2/50 px-4 py-3 text-sm text-muted">
                  SuperCard endpoint not available
                </div>
              )}
            </div>
            <div className="mt-4 text-xs text-muted2 font-mono">
              {supercard?.disclaimer ?? "Placeholder — waiting for API data."}
            </div>
          </div>

          {/* Market Regime */}
          <div className="rounded-2xl border border-border bg-surface/70 p-6 backdrop-blur">
            <div className="text-xs font-mono text-accentGold">REGIME</div>
            <div className="mt-1 text-lg font-semibold">Market Regime</div>
            <div className="mt-1 text-sm text-muted">{regime?.version ?? "Current regime classification"}</div>
            <div className="mt-4 flex flex-col items-center justify-center rounded-xl border border-border/70 bg-surface2/50 py-8">
              <div className="text-3xl font-semibold text-muted2">{regime?.regime?.label ?? "—"}</div>
              <div className="mt-2 text-sm text-muted">confidence: {regime?.regime?.confidence ?? "—"}</div>
            </div>
            <div className="mt-4 space-y-2">
              {(regime?.axes ?? []).map((a: { key: string; label: string; value: string }) => (
                <div key={a.key} className="flex items-center justify-between rounded-xl border border-border/70 bg-surface2/50 px-4 py-2">
                  <span className="text-sm text-muted">{a.label}</span>
                  <span className="text-sm font-mono text-muted2">{a.value ?? "—"}</span>
                </div>
              ))}
            </div>
            <div className="mt-3 space-y-1">
              {(regime?.drivers ?? []).slice(0, 3).map((d: string, i: number) => (
                <div key={i} className="rounded-xl border border-border/70 bg-surface2/50 px-4 py-2 text-sm text-fg">
                  Driver {i + 1}: {d}
                </div>
              ))}
            </div>
            <div className="mt-4 text-xs text-muted2 font-mono">
              {regime?.disclaimer ?? "Placeholder — waiting for API data."}
            </div>
          </div>

          {/* Paper Trader / Strategy Outcomes */}
          <div className="rounded-2xl border border-border bg-surface/70 p-6 backdrop-blur">
            <div className="text-xs font-mono text-accentPurple">PAPER TRADER</div>
            <div className="mt-1 text-lg font-semibold">Strategy Outcomes</div>
            <div className="mt-1 text-sm text-muted">{paper?.version ?? "Paper trading performance snapshot"}</div>
            <div className="mt-4 grid grid-cols-2 gap-2">
              {[
                { label: "Equity (30d)", value: paper?.kpis?.equity_30d ?? "—" },
                { label: "Win rate", value: paper?.kpis?.win_rate ?? "—" },
                { label: "Max drawdown", value: paper?.kpis?.max_drawdown ?? "—" },
                { label: "Active positions", value: paper?.kpis?.active_positions ?? "—" },
              ].map((m) => (
                <div key={m.label} className="rounded-xl border border-border/70 bg-surface2/50 p-3 text-center">
                  <div className="text-xs font-mono text-muted">{m.label}</div>
                  <div className="mt-1 text-base font-semibold text-muted2">{m.value}</div>
                </div>
              ))}
            </div>
            <div className="mt-4 rounded-xl border border-border/70 bg-surface2/50 p-4">
              <div className="text-xs font-mono text-muted">Accounts</div>
              <div className="mt-2 flex gap-3 text-sm">
                <Chip>active: {paper?.accounts?.active ?? 0}</Chip>
                <Chip>tracked: {paper?.accounts?.tracked ?? 0}</Chip>
              </div>
            </div>
            <div className="mt-4 h-24 rounded-xl border border-border/70 bg-surface2/60" />
            <div className="mt-3 text-xs text-muted2 font-mono">
              {paper?.disclaimer ?? "Placeholder — waiting for API data."}
            </div>
          </div>
        </section>

        <Divider />

        <SectionHeading
          eyebrow="TABLES"
          title="Ranked lists & feeds"
          desc="Dense tables backed by cached EdgeCore snapshot endpoints. Sortable columns coming soon."
        />

        <section className="mt-6 grid gap-4 lg:grid-cols-2 pb-14">
          <Table
            title="Top movers (placeholder)"
            columns={["Asset", "24h %", "Vol", "Signal"]}
            rows={[
              ["BTC", "—", "—", "—"],
              ["ETH", "—", "—", "—"],
              ["SOL", "—", "—", "—"],
              ["BASE", "—", "—", "—"],
            ]}
          />

          <Table
            title="Latest alerts feed (placeholder)"
            columns={["Time", "Type", "Asset", "Message"]}
            rows={[
              ["—", "BTC_CARD", "BTC", "Snapshot updated"],
              ["—", "FEAR_GREED", "MKT", "Index refreshed"],
              ["—", "DERIV", "BTC", "Funding/OI refresh"],
              ["—", "LIQ", "BTC", "Liq totals refresh"],
            ]}
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
