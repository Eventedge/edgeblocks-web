import { Button, Chip, Container, SectionHeading } from "@/components/ui";
import { ChartPlaceholder, Divider, Metric, Table } from "@/components/dashboard";

export const dynamic = "force-dynamic";

type KPI = { key: string; label: string; value: string; sub?: string };

async function getJSON<T>(url: string): Promise<T> {
  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) throw new Error(`Fetch failed: ${url}`);
  return res.json();
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

  return (
    <main className="min-h-screen">
      <Container>
        <header className="flex items-center justify-between gap-4 py-10">
          <div>
            <div className="text-xs font-mono text-muted">DASHBOARD</div>
            <div className="mt-1 text-2xl font-semibold">Market Overview</div>
          </div>
          <div className="flex gap-3">
            <Button href="/" variant="secondary">Back to site</Button>
            <Button href="https://app.edgeblocks.io" variant="primary">Enter App</Button>
          </div>
        </header>

        <div className="flex flex-wrap items-center justify-between gap-4">
          <Chip>CoinGlass-style layout • EdgeBlocks widgets • API-backed</Chip>
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
          title="Fast tiles, updated from snapshots"
          desc="These tiles are wired to internal API stubs today. Next: connect each endpoint to EventEdge/EdgeCore snapshot tables and caching."
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
              * Placeholder values; will be hydrated by EventEdge API.
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
          eyebrow="TABLES"
          title="Ranked lists & feeds (CoinGlass-style)"
          desc="These are the main UX wins: dense tables, sortable later, backed by cached snapshot endpoints."
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
            <div>Dashboard prototype • Next: wire to EventEdge API</div>
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
