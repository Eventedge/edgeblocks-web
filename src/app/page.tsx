import Link from "next/link";
import { Button, Card, Container, SectionHeading } from "@/components/ui";
import { Divider, Metric } from "@/components/dashboard";
import { Navbar } from "@/components/Navbar";

type KPI = { key: string; label: string; value: string; sub?: string };

async function getJSON<T>(path: string, revalidateSeconds: number): Promise<T | null> {
  try {
    const res = await fetch(path, { next: { revalidate: revalidateSeconds } });
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

export default async function Home() {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "https://edgeblocks.io";
  const overview = await getJSON<{ ts: string; kpis: KPI[]; global?: Record<string, string> }>(
    `${base}/api/v1/market/overview`,
    30
  );
  const kpiMap = new Map((overview?.kpis || []).map((k) => [k.key, k]));
  const kBtc = kpiMap.get("btc_price");
  const kFunding = kpiMap.get("funding_oiw");
  const kOi = kpiMap.get("open_interest");
  return (
    <main className="min-h-screen">
      <Container>
        {/* Top nav */}
        <div className="relative">
          <Navbar />
        </div>

        {/* Hero */}
        <section className="pt-4 pb-10 text-center">
          <h1 className="mx-auto text-4xl md:text-6xl font-semibold tracking-tight max-w-4xl">
            Turn on-chain noise into signal&mdash;fast, modular, and composable.
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-lg text-muted leading-relaxed">
            EdgeBlocks is a modular platform for collecting, normalizing, and scoring crypto data&mdash;powering alerts,
            dashboards, and agent workflows with a single intelligence layer.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button href="https://t.me/EventEdgeBot" variant="primary">
              Open EventEdge
            </Button>
            <Button href="/eventedge" variant="secondary">
              Terminal Guides
            </Button>
            <Button href="/dashboard" variant="ghost">
              Live Dashboard &rarr;
            </Button>
          </div>

          {/* Metric chips */}
          <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-2xl border border-border bg-surface/70 p-4 backdrop-blur">
              <div className="text-xs font-mono text-muted">FOCUS</div>
              <div className="mt-1 font-semibold">Signals</div>
              <div className="mt-1 text-sm text-muted">Regime-aware scoring &amp; validation.</div>
            </div>
            <div className="rounded-2xl border border-border bg-surface/70 p-4 backdrop-blur">
              <div className="text-xs font-mono text-muted">OUTPUTS</div>
              <div className="mt-1 font-semibold">Alerts</div>
              <div className="mt-1 text-sm text-muted">Fast, explainable triggers.</div>
            </div>
            <div className="rounded-2xl border border-border bg-surface/70 p-4 backdrop-blur">
              <div className="text-xs font-mono text-muted">SURFACE</div>
              <div className="mt-1 font-semibold">Apps + agents</div>
              <div className="mt-1 text-sm text-muted">Composable workflows.</div>
            </div>
            <div className="rounded-2xl border border-border bg-surface/70 p-4 backdrop-blur">
              <div className="text-xs font-mono text-muted">PRINCIPLE</div>
              <div className="mt-1 font-semibold">Modular by design</div>
              <div className="mt-1 text-sm text-muted">Swap blocks without rewrites.</div>
            </div>
          </div>
        </section>

        {/* Platform */}
        <section id="platform" className="py-8">
          <SectionHeading
            eyebrow="PLATFORM"
            title="A modular stack for crypto intelligence"
            desc="EdgeBlocks is built as a set of composable layers—data → features → intelligence → outputs—so each part can evolve without breaking the rest."
          />

          <div className="equal-grid mt-6 grid gap-4 md:grid-cols-3 items-stretch">
            <Card label="DATA ENGINE" title="EdgeCore + EdgeBank">
              Collection, normalization, caching, and a feature store that turns raw feeds into consistent primitives you can reuse everywhere.
            </Card>
            <Card label="INTELLIGENCE" title="EdgeMind">
              Validation and scoring that learns what matters—signals, compatibility, and confidence—so users get decisions, not dashboards.
            </Card>
            <Card label="EXECUTION" title="EdgeBlocks Apps">
              Alerts, dashboards, agents, and workflows—built on the same blocks so outputs stay consistent across surfaces.
            </Card>
          </div>
        </section>

        {/* Product CTAs */}
        <section className="py-8">
          <SectionHeading
            eyebrow="GET STARTED"
            title="Explore the platform"
            desc="EventEdge is the live Telegram terminal. The dashboard gives you a real-time web view of the same intelligence layer."
          />

          <div className="equal-grid mt-6 grid gap-4 lg:grid-cols-2 items-stretch">
            <div className="flex flex-col rounded-2xl border border-border bg-surface p-6">
              <div className="text-xs font-mono text-muted">TELEGRAM TERMINAL</div>
              <div className="mt-2 text-xl font-semibold text-fg">EventEdge</div>
              <div className="mt-2 text-sm text-muted leading-relaxed">
                Real-time market intelligence delivered natively in Telegram. Regime detection, confluence scoring,
                paper trading, and 50+ interactive tools&mdash;all in one bot.
              </div>
              <div className="mt-auto pt-4 flex flex-wrap gap-3">
                <Button href="https://t.me/EventEdgeBot" variant="primary">Open on Telegram</Button>
                <Button href="/eventedge" variant="secondary">Terminal Guides</Button>
              </div>
            </div>

            <div className="flex flex-col rounded-2xl border border-border bg-surface p-6">
              <div className="text-xs font-mono text-muted">WEB DASHBOARD</div>
              <div className="mt-2 text-xl font-semibold text-fg">Live Dashboard</div>
              <div className="mt-2 text-sm text-muted leading-relaxed">
                Same data, same schema&mdash;rendered on the web. BTC price, funding rates, open interest,
                regime classification, and real-time snapshots from EdgeCore.
              </div>
              <div className="mt-auto pt-4 flex flex-wrap gap-3">
                <Button href="/dashboard" variant="primary">Open Dashboard</Button>
                <Button href="/roadmap" variant="secondary">View Roadmap</Button>
              </div>
            </div>
          </div>
        </section>

        <Divider />

        <SectionHeading
          eyebrow="DIFFERENTIATION"
          title="We don't just show data — we interpret it"
          desc="EdgeBlocks turns raw market signals into bot-native widgets: pillars, regimes, and supercards, powered by HiveMind rollups and HiveBank features."
        />

        <div className="equal-grid mt-6 grid gap-4 lg:grid-cols-3 items-stretch">
          <div className="flex flex-col rounded-2xl border border-border bg-surface p-6">
            <div className="text-xs font-mono text-muted">WIDGETS</div>
            <div className="mt-1 text-lg font-semibold text-fg">Bot-native cards</div>
            <ul className="mt-3 space-y-2 text-sm text-muted leading-relaxed">
              <li>&bull; BTC SuperCard with pillars & flags</li>
              <li>&bull; Regime cards (risk-on/off, trend, chop)</li>
              <li>&bull; Actionable summaries (without noise)</li>
            </ul>
          </div>

          <div className="flex flex-col rounded-2xl border border-border bg-surface p-6">
            <div className="text-xs font-mono text-muted">HIVEMIND</div>
            <div className="mt-1 text-lg font-semibold text-fg">Rollups & logic layer</div>
            <ul className="mt-3 space-y-2 text-sm text-muted leading-relaxed">
              <li>&bull; Multi-source rollups (price, leverage, flow)</li>
              <li>&bull; Consistent scoring + confidence signals</li>
              <li>&bull; &ldquo;Interpretation first&rdquo; outputs</li>
            </ul>
          </div>

          <div className="flex flex-col rounded-2xl border border-border bg-surface p-6">
            <div className="text-xs font-mono text-muted">HIVEBANK</div>
            <div className="mt-1 text-lg font-semibold text-fg">Feature store</div>
            <ul className="mt-3 space-y-2 text-sm text-muted leading-relaxed">
              <li>&bull; Versioned features powering widgets</li>
              <li>&bull; Reproducible snapshots + history</li>
              <li>&bull; Foundation for EdgeMind models</li>
            </ul>
          </div>
        </div>

        <section className="mt-6 rounded-2xl border border-border bg-surface p-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <div className="text-xs font-mono text-muted">LIVE PREVIEW</div>
              <div className="mt-1 text-lg font-semibold text-fg">Real-time snapshots from our stack</div>
              <div className="mt-2 max-w-xl text-sm text-muted leading-relaxed">
                These values are served by our API and refreshed by EdgeCore shadow jobs every few minutes.
              </div>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button href="/dashboard" variant="primary">Open Dashboard</Button>
              <Button href="/eventedge" variant="secondary">EventEdge</Button>
            </div>
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-3">
            <Metric label="BTC Price" value={kBtc?.value ?? "—"} sub={kBtc?.sub ?? "—"} />
            <Metric label="Funding (OI-weighted)" value={kFunding?.value ?? "—"} sub={kFunding?.sub ?? "—"} />
            <Metric label="Open Interest" value={kOi?.value ?? "—"} sub={kOi?.sub ?? "—"} />
          </div>

          <div className="mt-4 text-xs text-muted2 font-mono">
            * Preview is intentionally minimal — the full interpretation layer lives in the dashboard.
          </div>
        </section>

        <Divider />

        {/* How it works */}
        <section className="py-8">
          <SectionHeading
            eyebrow="HOW IT WORKS"
            title="Three steps from noise to signal"
            desc="EdgeBlocks runs a continuous pipeline that turns raw market data into scored, explainable intelligence."
          />

          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {[
              {
                num: "01",
                title: "Collect",
                desc: "30+ data feeds ingested every 3 minutes\u2014price, funding, OI, on-chain, sentiment, prediction markets.",
              },
              {
                num: "02",
                title: "Score",
                desc: "Multi-source confluence scoring. Signals only fire when multiple inputs agree. Every output carries a confidence tag.",
              },
              {
                num: "03",
                title: "Deliver",
                desc: "Alerts, dashboards, and API endpoints. Same data schema across Telegram, web, and programmatic access.",
              },
            ].map((step) => (
              <div
                key={step.num}
                className="glass-card p-5"
              >
                <div className="text-2xl font-mono font-semibold text-accentCyan/60">
                  {step.num}
                </div>
                <div className="mt-2 text-sm font-semibold text-fg">
                  {step.title}
                </div>
                <div className="mt-2 text-sm text-muted leading-relaxed">
                  {step.desc}
                </div>
              </div>
            ))}
          </div>
        </section>

        <Divider />

        {/* Why EdgeBlocks */}
        <section className="py-8">
          <SectionHeading
            eyebrow="WHY EDGEBLOCKS"
            title="What makes this different"
            desc="Most tools show data. We interpret it."
          />

          <div className="mt-6 grid gap-3 md:grid-cols-3">
            {[
              {
                title: "Confluence, not indicators",
                desc: "Signals require multi-source agreement. A regime change only fires when funding, OI, momentum, and sentiment align.",
              },
              {
                title: "Confidence-tagged outputs",
                desc: "Every alert carries LOW / MEDIUM / HIGH confidence so you can filter by conviction instead of guessing.",
              },
              {
                title: "Built on real operations",
                desc: "Years of production on-chain ops (DataSnype) \u2192 a modular platform. Not a demo\u2014a working system.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="glass-card p-5"
              >
                <div className="text-sm font-semibold text-fg">
                  {item.title}
                </div>
                <div className="mt-2 text-sm text-muted leading-relaxed">
                  {item.desc}
                </div>
              </div>
            ))}
          </div>
        </section>

        <Divider />

        {/* Roadmap preview */}
        <section className="py-8">
          <SectionHeading
            eyebrow="ROADMAP"
            title="What&apos;s next"
            desc="Building incrementally, shipping continuously."
          />

          <div className="mt-6 grid gap-3 md:grid-cols-3">
            {[
              {
                quarter: "Q2 2026",
                title: "Intelligence + Builder Tools",
                highlights: "EdgeMind scoring, multi-asset SuperCards, agent SDK",
                status: "building" as const,
              },
              {
                quarter: "Q3 2026",
                title: "Marketplace + Expansion",
                highlights: "EdgeDesk, strategy marketplace, on-chain analytics",
                status: "planned" as const,
              },
              {
                quarter: "Q4 2026",
                title: "North Star",
                highlights: "EDGE token, autonomous agents, cross-chain",
                status: "planned" as const,
              },
            ].map((m) => (
              <div
                key={m.quarter}
                className="glass-card p-5"
              >
                <div className="flex items-center gap-2">
                  <span
                    className={`h-1.5 w-1.5 rounded-full ${
                      m.status === "building"
                        ? "bg-amber-400 shadow-[0_0_6px_rgba(251,191,36,0.4)]"
                        : "bg-muted2"
                    }`}
                  />
                  <span className="text-xs font-mono text-muted">
                    {m.quarter}
                  </span>
                </div>
                <div className="mt-2 text-sm font-semibold text-fg">
                  {m.title}
                </div>
                <div className="mt-1 text-sm text-muted leading-relaxed">
                  {m.highlights}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4">
            <Link
              href="/roadmap"
              className="text-sm font-mono text-muted hover:text-fg transition"
            >
              View full roadmap &rarr;
            </Link>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-border py-10 mt-10 text-sm text-muted2">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>&copy; {new Date().getFullYear()} EdgeBlocks</div>
            <div className="flex flex-wrap gap-4">
              <a className="hover:text-fg" href="/eventedge">EventEdge</a>
              <a className="hover:text-fg" href="/roadmap">Roadmap</a>
              <a className="hover:text-fg" href="/proofclaw">ProofClaw</a>
              <a className="hover:text-fg" href="/datasnype">DataSnype</a>
              <a className="hover:text-fg" href="/dashboard">Dashboard</a>
            </div>
          </div>
        </footer>
      </Container>
    </main>
  );
}
