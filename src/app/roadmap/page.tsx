import Link from "next/link";
import { Button, Container, SectionHeading } from "@/components/ui";
import { Divider } from "@/components/dashboard";

/* ------------------------------------------------------------------ */
/*  Timeline data                                                      */
/* ------------------------------------------------------------------ */

type Milestone = {
  quarter: string;
  title: string;
  items: string[];
  status: "live" | "building" | "planned";
};

const TIMELINE: Milestone[] = [
  {
    quarter: "Q4 2025",
    title: "Foundation",
    status: "live",
    items: [
      "EdgeCore data engine (36+ snapshots, 3-min cadence)",
      "EventEdge Telegram bot with live alerts",
      "BTC SuperCard (6 pillars) + market regime classifier",
      "Fear & Greed integration + sentiment tracking",
      "Paper trading engine + scanner pipeline",
    ],
  },
  {
    quarter: "Q1 2026",
    title: "Platform Core",
    status: "live",
    items: [
      "EdgeBlocks dashboard (edgeblocks.io/dashboard)",
      "REST API layer (api.edgeblocks.io)",
      "SimLab backtesting module",
      "Alert ticker + system events feed",
      "ProofClaw trust layer integration",
    ],
  },
  {
    quarter: "Q2 2026",
    title: "Intelligence + Builder Tools",
    status: "building",
    items: [
      "EdgeMind scoring models (confluence v2)",
      "Multi-asset SuperCards (ETH, SOL)",
      "EdgeBank feature store (versioned artifacts)",
      "Webhook + API alert delivery",
      "Agent pipeline SDK (compose workflows)",
    ],
  },
  {
    quarter: "Q3 2026",
    title: "Marketplace + Expansion",
    status: "planned",
    items: [
      "EdgeDesk: portfolio-aware intelligence layer",
      "Strategy marketplace (share + subscribe)",
      "Nansen-grade on-chain analytics module",
      "EdgeBrain: adaptive signal weighting",
      "Partner API program",
    ],
  },
  {
    quarter: "Q4 2026",
    title: "North Star",
    status: "planned",
    items: [
      "EDGE token launch + platform incentives",
      "Autonomous agent marketplace",
      "Cross-chain expansion (L2s, Solana, Cosmos)",
      "Institutional-grade data feeds",
      "Full modular composability: any block, any surface",
    ],
  },
];

const STATUS_STYLE: Record<string, { dot: string; label: string; text: string }> = {
  live: {
    dot: "bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.5)]",
    label: "LIVE",
    text: "text-emerald-300",
  },
  building: {
    dot: "bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.4)]",
    label: "BUILDING",
    text: "text-amber-300",
  },
  planned: {
    dot: "bg-muted2",
    label: "PLANNED",
    text: "text-muted2",
  },
};

const PRINCIPLES = [
  { title: "Ship what works", desc: "Every feature starts in production before it scales. Real data, real users, real feedback." },
  { title: "Modular by default", desc: "Every layer is a swappable block. Replace the scorer without touching the data engine." },
  { title: "Confidence over conviction", desc: "Alerts carry confidence tags, not predictions. Users decide how much signal to trust." },
  { title: "One database, one flywheel", desc: "All products share a single data foundation. More users = better features = better signals." },
  { title: "Interpretation first", desc: "Raw data is a commodity. We ship decisions: regimes, flags, and scored summaries." },
  { title: "Open surfaces", desc: "Telegram, dashboard, API, agents. Same data schema, any delivery channel." },
];

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function RoadmapPage() {
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
              View Dashboard
            </Button>
            <Button href="https://app.edgeblocks.io" variant="primary">
              Enter App
            </Button>
          </div>
        </header>

        {/* Hero */}
        <section className="pb-10">
          <div className="text-xs font-mono text-muted">ROADMAP</div>
          <h1 className="mt-3 text-3xl md:text-5xl font-semibold tracking-tight max-w-3xl text-fg">
            EdgeBlocks Roadmap
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-muted leading-relaxed">
            From a working data engine to a full modular platform&mdash;built
            incrementally, shipped continuously, validated in production.
          </p>
        </section>

        <Divider />

        {/* Timeline */}
        <section className="py-8">
          <SectionHeading
            eyebrow="TIMELINE"
            title="What we&apos;re building"
            desc="Each phase builds on the last. Nothing ships until it runs on real data with real users."
          />

          {/* Desktop: grid, Mobile: vertical stepper */}
          <div className="mt-8 space-y-0">
            {TIMELINE.map((m, i) => {
              const st = STATUS_STYLE[m.status];
              return (
                <div key={m.quarter} className="relative flex gap-6">
                  {/* Vertical line + dot */}
                  <div className="flex flex-col items-center">
                    <div className={`mt-1.5 h-3 w-3 shrink-0 rounded-full ${st.dot}`} />
                    {i < TIMELINE.length - 1 && (
                      <div className="w-px flex-1 bg-border2/50" />
                    )}
                  </div>

                  {/* Content */}
                  <div className="pb-8">
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-mono text-fg font-semibold">
                        {m.quarter}
                      </span>
                      <span
                        className={`rounded-full border border-border/60 px-2.5 py-0.5 text-[10px] font-mono ${st.text}`}
                      >
                        {st.label}
                      </span>
                    </div>
                    <div className="mt-1 text-lg font-semibold text-fg">
                      {m.title}
                    </div>
                    <ul className="mt-2 space-y-1.5">
                      {m.items.map((item) => (
                        <li
                          key={item}
                          className="text-sm text-muted leading-relaxed"
                        >
                          &bull; {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        <Divider />

        {/* Guiding Principles */}
        <section className="py-8">
          <SectionHeading
            eyebrow="PHILOSOPHY"
            title="Guiding principles"
            desc="These shape every decision we make&mdash;from what to build next to how we ship it."
          />

          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {PRINCIPLES.map((p) => (
              <div
                key={p.title}
                className="rounded-xl border border-border bg-surface p-5"
              >
                <div className="text-sm font-semibold text-fg">{p.title}</div>
                <div className="mt-2 text-sm text-muted leading-relaxed">
                  {p.desc}
                </div>
              </div>
            ))}
          </div>
        </section>

        <Divider />

        {/* What's live today */}
        <section className="py-8">
          <SectionHeading
            eyebrow="LIVE NOW"
            title="What&apos;s live today"
            desc="These modules are running in production right now, powered by real data."
          />

          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { label: "Dashboard", desc: "9 live intelligence modules", href: "/dashboard" },
              { label: "EventEdge Bot", desc: "Telegram alerts + wraps", href: "/eventedge" },
              { label: "SimLab", desc: "Backtesting + paper trading", href: "/dashboard" },
              { label: "REST API", desc: "Public read endpoints", href: "/dashboard" },
            ].map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="group rounded-xl border border-border bg-surface/80 p-4 transition hover:border-border2 hover:bg-surface"
              >
                <div className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  <span className="text-sm font-semibold text-fg group-hover:text-accentCyan transition">
                    {item.label}
                  </span>
                </div>
                <div className="mt-1 text-xs text-muted">{item.desc}</div>
              </Link>
            ))}
          </div>
        </section>

        <Divider />

        {/* CTA */}
        <section className="py-10">
          <div className="rounded-2xl border border-border bg-surface p-8 text-center">
            <div className="text-xs font-mono text-muted">JOIN US</div>
            <h2 className="mt-3 text-2xl md:text-3xl font-semibold text-fg">
              Follow the build
            </h2>
            <p className="mt-3 mx-auto max-w-lg text-sm text-muted leading-relaxed">
              Every module ships incrementally. Check the dashboard for
              what&apos;s live, or try EventEdge on Telegram for real-time
              alerts.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Button href="https://app.edgeblocks.io" variant="primary">
                Enter App
              </Button>
              <Button href="/dashboard" variant="secondary">
                View Dashboard
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
              <Link className="hover:text-fg" href="/eventedge">
                EventEdge
              </Link>
              <Link className="hover:text-fg" href="/proofclaw">
                ProofClaw
              </Link>
              <Link className="hover:text-fg" href="/datasnype">
                DataSnype
              </Link>
              <Link className="hover:text-fg" href="/dashboard">
                Dashboard
              </Link>
            </div>
          </div>
        </footer>
      </Container>
    </main>
  );
}
