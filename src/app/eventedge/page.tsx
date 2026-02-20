import Link from "next/link";
import { Button, Card, Container, SectionHeading } from "@/components/ui";
import { Divider } from "@/components/dashboard";
import { TerminalGuides } from "./TerminalGuides";

/* ------------------------------------------------------------------ */
/*  Static data for example alerts + API categories                    */
/* ------------------------------------------------------------------ */

const EXAMPLE_ALERTS = [
  {
    badge: "\ud83e\udded",
    type: "SENTIMENT SHIFT",
    asset: "BTC",
    accent: "border-amber-400/30 bg-amber-400/10 text-amber-200",
    body: "Fear & Greed shifted from NEUTRAL (52) \u2192 FEAR (38). Score dropped 14 pts in 6h.",
  },
  {
    badge: "\ud83c\udf0d",
    type: "REGIME CHANGE",
    asset: "BTC",
    accent: "border-violet-400/30 bg-violet-400/10 text-violet-200",
    body: "Market regime: Trend \u2192 Chop. Confidence: HIGH. Funding flat, OI declining, price range-bound.",
  },
  {
    badge: "\ud83d\udcca",
    type: "SUPERCARD FLAG",
    asset: "BTC",
    accent: "border-cyan-400/30 bg-cyan-400/10 text-cyan-200",
    body: "Leverage pillar flagged ELEVATED. Funding OI-weighted: +0.031%, Liquidation ratio: 2.4\u00d7 long-heavy.",
  },
  {
    badge: "\ud83d\udcc8",
    type: "INTEL HUB",
    asset: "ETH",
    accent: "border-emerald-400/30 bg-emerald-400/10 text-emerald-200",
    body: "Whale accumulation detected: 3 wallets moved 12,400 ETH from CEX \u2192 cold storage in the last 2h.",
  },
];

const API_CATEGORIES = [
  {
    label: "Market Data",
    items: ["OHLCV (hourly)", "Funding rates", "Open interest", "Liquidations", "ETF flows"],
  },
  {
    label: "Intelligence",
    items: ["SuperCard pillars", "Regime classifier", "Confluence scores", "Fear & Greed"],
  },
  {
    label: "Alerts",
    items: ["Sentiment shifts", "Regime changes", "Whale movements", "TA scanners", "Fusion bursts"],
  },
  {
    label: "Execution",
    items: ["Paper trading", "SimLab backtests", "Scanner pipeline", "Signal history"],
  },
];

const SECTIONS = [
  { id: "what", label: "What it does" },
  { id: "how", label: "How it works" },
  { id: "alerts", label: "Example alerts" },
  { id: "data", label: "Data infra" },
  { id: "guides", label: "Guides" },
  { id: "cta", label: "Get started" },
];

/* ------------------------------------------------------------------ */
/*  Pipeline step component                                            */
/* ------------------------------------------------------------------ */

function PipelineStep({
  num,
  title,
  desc,
}: {
  num: number;
  title: string;
  desc: string;
}) {
  return (
    <div className="flex gap-4">
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-border2 bg-surface2 text-xs font-mono text-accentCyan">
        {num}
      </div>
      <div>
        <div className="text-sm font-semibold text-fg">{title}</div>
        <div className="mt-1 text-sm text-muted leading-relaxed">{desc}</div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function EventEdgePage() {
  return (
    <main className="min-h-screen">
      <Container>
        {/* Header */}
        <header className="flex items-center justify-between gap-4 py-10">
          <Link className="text-sm text-muted hover:text-fg" href="/">
            &larr; Back to EdgeBlocks
          </Link>
          <div className="flex gap-3">
            <Button href="/dashboard" variant="secondary">
              Dashboard
            </Button>
            <Button href="https://t.me/+b5WT3Sif_klhMGM0" variant="primary">
              Open on Telegram
            </Button>
          </div>
        </header>

        {/* Section-jump nav */}
        <nav className="flex flex-wrap gap-2 pb-8">
          {SECTIONS.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              className="rounded-full border border-border/70 bg-surface/70 px-4 py-1.5 text-xs font-mono text-muted hover:text-fg hover:border-border2 transition backdrop-blur"
            >
              {s.label}
            </a>
          ))}
        </nav>

        {/* Hero */}
        <section className="pb-10">
          <div className="text-xs font-mono text-muted">PRODUCT</div>
          <h1 className="mt-3 text-3xl md:text-5xl font-semibold tracking-tight max-w-3xl text-fg">
            EventEdge Terminal
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-muted leading-relaxed">
            Real-time market intelligence, delivered natively in Telegram. Regime
            detection, sentiment tracking, confluence scoring, and actionable
            alerts&mdash;powered by 30+ live data pipelines running 24/7.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button href="https://t.me/+b5WT3Sif_klhMGM0" variant="primary">
              Try @EventEdgeBot
            </Button>
            <Button href="/dashboard" variant="secondary">
              View live dashboard
            </Button>
          </div>
        </section>

        <Divider />

        {/* What it does */}
        <section id="what" className="scroll-mt-16 py-8">
          <SectionHeading
            eyebrow="CAPABILITIES"
            title="What EventEdge does"
            desc="Three layers working together: collect everything, interpret it, then deliver only what matters."
          />

          <div className="mt-6 grid gap-4 md:grid-cols-3">
            <Card label="COLLECT" title="30+ live data feeds">
              Price, funding, OI, liquidations, ETF flows, on-chain metrics,
              prediction markets, social sentiment&mdash;all normalized into a
              single schema refreshing every 3 minutes.
            </Card>
            <Card label="INTERPRET" title="Confluence &amp; confidence">
              Raw data becomes scored signals. Each alert carries a confidence
              tag derived from multi-source agreement&mdash;not a single
              indicator in isolation.
            </Card>
            <Card label="DELIVER" title="Alerts you can act on">
              Regime changes, sentiment shifts, whale movements, and scanner
              triggers&mdash;formatted as compact messages with context, not
              noise.
            </Card>
          </div>
        </section>

        <Divider />

        {/* How it works */}
        <section id="how" className="scroll-mt-16 py-8">
          <SectionHeading
            eyebrow="ARCHITECTURE"
            title="How it works"
            desc="A five-stage pipeline from raw feeds to user-facing alerts."
          />

          <div className="mt-6 rounded-2xl border border-border bg-surface p-6">
            <div className="space-y-6">
              <PipelineStep
                num={1}
                title="Sources"
                desc="Binance, CoinGecko, Glassnode, Alternative.me, on-chain RPCs, DEX feeds, social APIs. Ingested via EdgeCore shadow jobs on a 3-minute cadence."
              />
              <div className="ml-4 h-6 w-px bg-border2/60" />
              <PipelineStep
                num={2}
                title="Normalization"
                desc="Raw data is cleaned, timestamped, and stored as typed snapshots in PostgreSQL. Every snapshot has a TTL and staleness check."
              />
              <div className="ml-4 h-6 w-px bg-border2/60" />
              <PipelineStep
                num={3}
                title="Confluence scoring"
                desc="Multiple signals are cross-referenced to produce a single confluence score. A regime change only fires when funding, OI, momentum, and sentiment agree."
              />
              <div className="ml-4 h-6 w-px bg-border2/60" />
              <PipelineStep
                num={4}
                title="Alert engine"
                desc="Configurable thresholds, cooldowns, and multi-channel dispatch. Alerts carry confidence tags (LOW / MEDIUM / HIGH) so you can filter by conviction."
              />
              <div className="ml-4 h-6 w-px bg-border2/60" />
              <PipelineStep
                num={5}
                title="Delivery"
                desc="Telegram bot (@EventEdgeBot), the EdgeBlocks dashboard, and a REST API. Same data, same schema, multiple surfaces."
              />
            </div>
          </div>
        </section>

        <Divider />

        {/* Example outputs */}
        <section id="alerts" className="scroll-mt-16 py-8">
          <SectionHeading
            eyebrow="EXAMPLE OUTPUTS"
            title="What alerts look like"
            desc="These are real alert formats from the EventEdge pipeline. Each carries context, confidence, and a clear signal."
          />

          <div className="mt-6 grid gap-3 md:grid-cols-2">
            {EXAMPLE_ALERTS.map((a) => (
              <div
                key={a.type + a.asset}
                className="rounded-xl border border-border/60 bg-surface/80 p-4 backdrop-blur"
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-base">{a.badge}</span>
                  <span
                    className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-[11px] font-mono ${a.accent}`}
                  >
                    {a.type}
                  </span>
                  <span className="text-xs font-mono text-muted">{a.asset}</span>
                </div>
                <div className="text-sm text-muted leading-relaxed font-mono">
                  {a.body}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 rounded-xl border border-border/40 bg-surface2/40 px-4 py-3 text-sm text-muted">
            <span className="font-semibold text-fg">Desk &amp; wrap: </span>
            Every evening, EventEdge generates a structured market wrap&mdash;regime
            summary, key moves, and open positions&mdash;delivered as a single
            Telegram message.
          </div>
        </section>

        <Divider />

        {/* Data infrastructure */}
        <section id="data" className="scroll-mt-16 py-8">
          <SectionHeading
            eyebrow="DATA INFRASTRUCTURE"
            title="Built on real pipelines"
            desc="EventEdge runs on EdgeCore, a production data engine with 36+ active snapshots refreshing every 3&ndash;6 minutes."
          />

          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {API_CATEGORIES.map((cat) => (
              <div
                key={cat.label}
                className="rounded-xl border border-border bg-surface p-4"
              >
                <div className="text-xs font-mono text-accentCyan">
                  {cat.label}
                </div>
                <ul className="mt-3 space-y-1.5">
                  {cat.items.map((item) => (
                    <li
                      key={item}
                      className="text-sm text-muted leading-relaxed"
                    >
                      &bull; {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            <div className="rounded-xl border border-border/60 bg-surface/70 px-4 py-3 text-center backdrop-blur">
              <div className="text-2xl font-semibold text-fg">36+</div>
              <div className="mt-1 text-xs font-mono text-muted">
                Active snapshots
              </div>
            </div>
            <div className="rounded-xl border border-border/60 bg-surface/70 px-4 py-3 text-center backdrop-blur">
              <div className="text-2xl font-semibold text-fg">3 min</div>
              <div className="mt-1 text-xs font-mono text-muted">
                Refresh cadence
              </div>
            </div>
            <div className="rounded-xl border border-border/60 bg-surface/70 px-4 py-3 text-center backdrop-blur">
              <div className="text-2xl font-semibold text-fg">15+</div>
              <div className="mt-1 text-xs font-mono text-muted">
                Alert subsystems
              </div>
            </div>
          </div>
        </section>

        <Divider />

        {/* Terminal Guides */}
        <TerminalGuides />

        <Divider />

        {/* CTA */}
        <section id="cta" className="scroll-mt-16 py-10">
          <div className="rounded-2xl border border-border bg-surface p-8 text-center">
            <div className="text-xs font-mono text-muted">GET STARTED</div>
            <h2 className="mt-3 text-2xl md:text-3xl font-semibold text-fg">
              Try EventEdge now
            </h2>
            <p className="mt-3 mx-auto max-w-lg text-sm text-muted leading-relaxed">
              Open <span className="font-mono text-fg">@EventEdgeBot</span> on
              Telegram, send{" "}
              <code className="rounded bg-surface2 px-1.5 py-0.5 text-xs font-mono text-accentCyan">
                /start
              </code>
              , and you&apos;re live. No sign-up, no API key, no paywall.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Button href="https://t.me/+b5WT3Sif_klhMGM0" variant="primary">
                Open @EventEdgeBot
              </Button>
              <Button href="/dashboard" variant="secondary">
                View dashboard
              </Button>
              <Button href="/" variant="ghost">
                Back to EdgeBlocks &rarr;
              </Button>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-border py-10 text-sm text-muted2">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>&copy; {new Date().getFullYear()} EdgeBlocks</div>
            <div className="flex flex-wrap gap-4">
              <Link className="hover:text-fg" href="/">
                Home
              </Link>
              <Link className="hover:text-fg" href="/dashboard">
                Dashboard
              </Link>
              <Link className="hover:text-fg" href="/roadmap">
                Roadmap
              </Link>
            </div>
          </div>
        </footer>
      </Container>
    </main>
  );
}
