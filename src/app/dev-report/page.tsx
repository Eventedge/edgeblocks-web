import Link from "next/link";
import { Button, Container } from "@/components/ui";
import { Divider } from "@/components/dashboard";
import type { Metadata } from "next";

/* ------------------------------------------------------------------ */
/*  Metadata                                                           */
/* ------------------------------------------------------------------ */
export const metadata: Metadata = {
  title: "Sprint Report \u00b7 Feb 2026 | EdgeBlocks",
  description:
    "Monthly development report: platform shipping, ops hardening, dashboards, and agent-layer readiness.",
  openGraph: {
    title: "EdgeBlocks \u2014 Sprint Report \u00b7 Feb 2026",
    description:
      "What shipped, what\u2019s live, and what\u2019s next. From monolith to real platform.",
    url: "https://edgeblocks.io/dev-report",
    images: ["/brand/og.svg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "EdgeBlocks \u2014 Sprint Report \u00b7 Feb 2026",
    description:
      "What shipped, what\u2019s live, and what\u2019s next. From monolith to real platform.",
    images: ["/brand/og.svg"],
  },
};

/* ------------------------------------------------------------------ */
/*  Static data                                                        */
/* ------------------------------------------------------------------ */

const HERO_STATS = [
  { value: "8", label: "Layers Shipped", color: "text-emerald-300" },
  { value: "12+", label: "API Endpoints", color: "text-amber-300" },
  { value: "25+", label: "Data Providers", color: "text-blue-400" },
  { value: "2", label: "Bots Running", color: "text-cyan-300" },
];

type LayerData = {
  num: number;
  icon: string;
  title: string;
  tag: string;
  accent: string;
  goal: React.ReactNode;
  sections: { label: string; labelColor: string; items: React.ReactNode[] }[];
  outcome: string;
};

const LAYERS: LayerData[] = [
  {
    num: 1,
    icon: "\u2699\ufe0f",
    title: "EdgeCore \u2014 Data Plane",
    tag: "Core Architecture Shift",
    accent: "amber",
    goal: (
      <>
        Make everything \u2014 APIs, bot menus, dashboards, alerts, agents \u2014 read from a
        single, reproducible data plane.
      </>
    ),
    sections: [
      {
        label: "Shipped",
        labelColor: "emerald",
        items: [
          <>
            <strong className="text-fg">Snapshot-first architecture</strong> \u2014
            Providers/WebSockets/collectors \u2192 EdgeCore \u2192 stored artifacts \u2192 consumers
            render
          </>,
          <>
            <strong className="text-fg">Central snapshots registry</strong> (single KV-store
            pattern) as backbone for prices, funding/OI/liqs, ETF flows, on-chain, sentiment,
            prediction markets
          </>,
          <>
            <strong className="text-fg">Consistent warming/cached/TTL</strong> behavior across the
            entire platform
          </>,
        ],
      },
    ],
    outcome:
      "UI/menus/website stay stable even when providers fail \u2014 fallback to last-known-good snapshots with clear \u201cwarming\u201d states.",
  },
  {
    num: 2,
    icon: "\ud83d\udd0c",
    title: "eventedge-api + edgeblocks.io Proxy",
    tag: "Public API Surface",
    accent: "blue",
    goal: (
      <>
        A clean public surface that the website (and later agents) can consume without touching bot
        internals.
      </>
    ),
    sections: [
      {
        label: "Shipped",
        labelColor: "emerald",
        items: [
          <>
            <strong className="text-fg">FastAPI service</strong> (systemd + Caddy) deployed behind{" "}
            <code className="rounded bg-cyan-500/10 px-1.5 py-0.5 text-[11px] font-mono text-cyan-300">
              api.edgeblocks.io
            </code>
          </>,
          <>
            <strong className="text-fg">Proxy layer</strong> in website \u2014{" "}
            <code className="rounded bg-cyan-500/10 px-1.5 py-0.5 text-[11px] font-mono text-cyan-300">
              edgeblocks.io/api/v1/*
            </code>{" "}
            forwards to API with safe fallbacks
          </>,
          <>
            <code className="rounded bg-cyan-500/10 px-1.5 py-0.5 text-[11px] font-mono text-cyan-300">
              /api/v1/market/overview
            </code>{" "}
            \u2014 live market summary
          </>,
          <>
            <code className="rounded bg-cyan-500/10 px-1.5 py-0.5 text-[11px] font-mono text-cyan-300">
              /api/v1/assets/&#123;symbol&#125;/card
            </code>{" "}
            \u2014 per-asset intelligence cards
          </>,
          <>
            <code className="rounded bg-cyan-500/10 px-1.5 py-0.5 text-[11px] font-mono text-cyan-300">
              /api/v1/sentiment/fear-greed
            </code>{" "}
            \u2014 real provider + DB cache
          </>,
          <>
            <code className="rounded bg-cyan-500/10 px-1.5 py-0.5 text-[11px] font-mono text-cyan-300">
              /api/v1/edge/supercard
            </code>{" "}
            \u2014 pillars + stance/confidence (EdgeBlocks exclusive)
          </>,
          <>
            <code className="rounded bg-cyan-500/10 px-1.5 py-0.5 text-[11px] font-mono text-cyan-300">
              /api/v1/edge/regime
            </code>{" "}
            \u2014 label + axes + drivers
          </>,
          <>
            <code className="rounded bg-cyan-500/10 px-1.5 py-0.5 text-[11px] font-mono text-cyan-300">
              /api/v1/paper/summary
            </code>{" "}
            \u2014 real paper trading rollups
          </>,
          <>
            <code className="rounded bg-cyan-500/10 px-1.5 py-0.5 text-[11px] font-mono text-cyan-300">
              /api/v1/simlab/overview
            </code>{" "}
            +{" "}
            <code className="rounded bg-cyan-500/10 px-1.5 py-0.5 text-[11px] font-mono text-cyan-300">
              /api/v1/simlab/trades/live
            </code>{" "}
            \u2014 admin performance + live feed
          </>,
        ],
      },
    ],
    outcome:
      "Website dashboard is API-fed, no longer demo-only. This is the foundation for the agentic layer \u2014 agents talk to the API, not to the bot DB.",
  },
  {
    num: 3,
    icon: "\ud83d\udd14",
    title: "alertd \u2014 Alerts as a Service",
    tag: "Signal Plane Extraction",
    accent: "emerald",
    goal: (
      <>
        Decouple alert generation from the monolith and make alerts usable everywhere \u2014 bot,
        web, agents.
      </>
    ),
    sections: [
      {
        label: "Shipped",
        labelColor: "emerald",
        items: [
          <>
            <strong className="text-fg">Alert service extracted</strong> with watchdog-style
            heartbeat expectations
          </>,
          <>
            <strong className="text-fg">Global alert ticker</strong> mounted in{" "}
            <code className="rounded bg-cyan-500/10 px-1.5 py-0.5 text-[11px] font-mono text-cyan-300">
              layout.tsx
            </code>{" "}
            \u2014 visible on all website pages
          </>,
          <>
            <code className="rounded bg-cyan-500/10 px-1.5 py-0.5 text-[11px] font-mono text-cyan-300">
              alerts/live
            </code>{" "}
            endpoint improved to always return STATE items even when no changes occur (ticker never
            looks dead)
          </>,
        ],
      },
    ],
    outcome:
      "Alerts become a platform primitive \u2014 UI, agents, and external consumers can subscribe, display, and react consistently.",
  },
  {
    num: 4,
    icon: "\ud83e\uddea",
    title: "SimLab Separation + Restoration",
    tag: "Dedicated Bot Architecture",
    accent: "violet",
    goal: (
      <>
        Keep SimLab as a dedicated bot/service while maintaining deep-link flow from main bot.
      </>
    ),
    sections: [
      {
        label: "Shipped",
        labelColor: "emerald",
        items: [
          <>
            <strong className="text-fg">Live trading module</strong> on website \u2014 polling,
            animations, filters, new-row badges, KPI flash
          </>,
          <>
            <strong className="text-fg">Restored two-bot separation</strong> after major regression:
            main bot &ldquo;Simulation Lab&rdquo; deep-links to{" "}
            <code className="rounded bg-cyan-500/10 px-1.5 py-0.5 text-[11px] font-mono text-cyan-300">
              @Simlabbot
            </code>
          </>,
          <>
            SimLab{" "}
            <code className="rounded bg-cyan-500/10 px-1.5 py-0.5 text-[11px] font-mono text-cyan-300">
              /start
            </code>{" "}
            goes directly to menu (no extra &ldquo;connected&rdquo; hop)
          </>,
          <>
            Admin flow fixed (
            <code className="rounded bg-cyan-500/10 px-1.5 py-0.5 text-[11px] font-mono text-cyan-300">
              /admin
            </code>{" "}
            message length issue) and restored
          </>,
        ],
      },
    ],
    outcome:
      "Back to intended architecture: two bots, clean navigation, clear boundaries between main terminal and simulation environment.",
  },
  {
    num: 5,
    icon: "\ud83d\udce1",
    title: "Telemetry + Admin Dashboard",
    tag: "Operational Visibility",
    accent: "cyan",
    goal: (
      <>
        Full operational visibility \u2014 services health, data freshness, users/tiers, scanners,
        paper engine, provider usage, backups.
      </>
    ),
    sections: [
      {
        label: "Shipped",
        labelColor: "emerald",
        items: [
          <>
            <strong className="text-fg">Telemetry surfaced</strong> into web-admin direction
            (EdgeBlocks Admin dashboard)
          </>,
          <>
            <strong className="text-fg">Repeatable health checks</strong> (HEALTH-001/002 pattern)
            across bot service, API, proxy, DB, snapshot freshness, and known provider limits
          </>,
          <>Covers CoinGecko, Helius, Bybit WS and all critical integration points</>,
        ],
      },
    ],
    outcome:
      "System truth checklist runs quickly before any risky work \u2014 migrations, refactors, or rollouts are safer.",
  },
  {
    num: 6,
    icon: "\ud83d\udee1\ufe0f",
    title: "Backups \u2014 Hardened + Expanded",
    tag: "Disaster Recovery",
    accent: "rose",
    goal: (
      <>
        Prevent catastrophic &ldquo;source deleted but service still running&rdquo; incidents and
        guarantee restartability.
      </>
    ),
    sections: [
      {
        label: "Incident Recovered",
        labelColor: "rose",
        items: [
          <>
            <strong className="text-fg">Critical incident:</strong> source files deleted on disk
            (bot.py + EdgeCore .py) while services kept running from bytecode
          </>,
          <>
            <strong className="text-fg">Recovered from daily backup archives</strong> \u2014
            critical save that prevented total loss
          </>,
        ],
      },
      {
        label: "Shipped",
        labelColor: "emerald",
        items: [
          <>
            <strong className="text-fg">Full backup audit</strong> \u2014 confirmed bot repo backups
            include bot.py, EdgeCore, services, scripts, env, DB dumps
          </>,
          <>
            <strong className="text-fg">Identified gaps:</strong> website repo, API repo, Caddy
            config, live systemd units
          </>,
          <>
            <strong className="text-fg">Unified backup plan</strong> covering edgeblocks-web,
            eventedge-api, Caddyfile, systemd units, permissions hardening
          </>,
          <>
            <strong className="text-fg">Pre-session + post-session snapshots</strong> baked into
            workflow
          </>,
        ],
      },
    ],
    outcome:
      'Backups are now part of the workflow \u2014 no more "hope it\'s there" moments. Session snapshots prevent regression.',
  },
  {
    num: 7,
    icon: "\ud83c\udf10",
    title: "Website \u2014 Live Dashboard + Brand + Guides",
    tag: "Public Showcase",
    accent: "amber",
    goal: (
      <>
        Publicly show what&apos;s unique \u2014 the interpretation layer, live bot-native widgets,
        and the EdgeBlocks operating system (not just raw data).
      </>
    ),
    sections: [
      {
        label: "Dashboard",
        labelColor: "amber",
        items: [
          <>Module accent colors, LIVE dots, updated-ago timers, header flash on updates</>,
          <>System events feed + SimLab live module with polling/animations</>,
          <>Placeholders removed \u2192 replaced with designed &ldquo;Coming Soon&rdquo; empty states</>,
        ],
      },
      {
        label: "Homepage + Brand",
        labelColor: "amber",
        items: [
          <>Cleaned noisy sections (Trust Layer / Enter App duplicates, &ldquo;one flywheel&rdquo; chip)</>,
          <>Centered hero, simplified CTA labels, stronger calls to action</>,
          <>Replaced ProofClaw section with EventEdge Terminal + Dashboard CTAs</>,
        ],
      },
      {
        label: "EventEdge Guides + Roadmap",
        labelColor: "amber",
        items: [
          <>
            <code className="rounded bg-cyan-500/10 px-1.5 py-0.5 text-[11px] font-mono text-cyan-300">
              /eventedge
            </code>{" "}
            expanded into docs-style guide \u2014 Telegram message mocks, emoji menus, accordion
            navigation
          </>,
          <>
            Modules covered: Overview, Alerts & Settings, Simulation Lab, Macro Desk, Pro Lab, TA
            Lab
          </>,
          <>
            <code className="rounded bg-cyan-500/10 px-1.5 py-0.5 text-[11px] font-mono text-cyan-300">
              /roadmap
            </code>{" "}
            page added with timeline + &ldquo;what&apos;s live&rdquo; indicators
          </>,
        ],
      },
    ],
    outcome:
      'Website now demonstrates the differentiator: interpretation-first intelligence, not "CoinGlass-style raw data." This is HiveMind/HiveBank in action.',
  },
  {
    num: 8,
    icon: "\ud83e\udd16",
    title: "Agentic Layer \u2014 EdgePipe Isolation",
    tag: "What This All Enables",
    accent: "teal",
    goal: (
      <>
        Launch a Super Agent that routes to specialized agents without giving them direct access to
        sensitive infrastructure.
      </>
    ),
    sections: [
      {
        label: "Planned & Ready",
        labelColor: "blue",
        items: [
          <>
            <strong className="text-fg">Super agent orchestrator</strong> + ~5 specialist agents
            (Macro / TA / PM / Sim / Guide)
          </>,
          <>
            Agents run isolated (ProofClaw/OpenClaw side) \u2014 interact only through{" "}
            <strong className="text-fg">EdgePipe</strong>
          </>,
          <>
            <strong className="text-fg">Strict scopes</strong> \u2192 audit logs \u2192 telemetry
            \u2192 no direct DB/exchange access
          </>,
          <>
            Agents consume EdgeCore artifacts via API,{" "}
            <code className="rounded bg-cyan-500/10 px-1.5 py-0.5 text-[11px] font-mono text-cyan-300">
              alerts/live
            </code>{" "}
            stream, curated deliverables store
          </>,
          <>
            <strong className="text-fg">Evaluator rubric</strong> for trust & safety posture on all
            agent outputs
          </>,
        ],
      },
    ],
    outcome:
      "Safe commercialization path: read-only intelligence first, then controlled actions later. Agents never touch raw infra.",
  },
];

type ArchRow = { label: string; nodes: { icon: string; name: string; style: string }[] };
const ARCH_ROWS: ArchRow[] = [
  {
    label: "Agentic Plane (Next)",
    nodes: [
      { icon: "\ud83e\udd16", name: "Super Agent", style: "border-dashed border-border text-muted2" },
      { icon: "\ud83e\udde0", name: "Macro Agent", style: "border-dashed border-border text-muted2" },
      { icon: "\ud83d\udcca", name: "TA Agent", style: "border-dashed border-border text-muted2" },
      { icon: "\ud83c\udfaf", name: "PM Agent", style: "border-dashed border-border text-muted2" },
      { icon: "\ud83e\uddea", name: "Sim Agent", style: "border-dashed border-border text-muted2" },
    ],
  },
  {
    label: "Public Surface (Live)",
    nodes: [
      { icon: "\ud83c\udf10", name: "edgeblocks.io", style: "border-amber-500/40 bg-amber-500/10 text-amber-300" },
      { icon: "\ud83d\udd0c", name: "api.edgeblocks.io", style: "border-blue-500/40 bg-blue-500/10 text-blue-400" },
      { icon: "\ud83d\udd14", name: "alertd", style: "border-emerald-500/40 bg-emerald-500/10 text-emerald-300" },
    ],
  },
  {
    label: "Intelligence Layer (Live)",
    nodes: [
      { icon: "\ud83d\udcca", name: "Confluence Engine", style: "border-cyan-500/40 bg-cyan-500/10 text-cyan-300" },
      { icon: "\ud83d\udcc8", name: "18 TA Scanners", style: "border-cyan-500/40 bg-cyan-500/10 text-cyan-300" },
      { icon: "\ud83c\udfaf", name: "PM3 Indexing", style: "border-cyan-500/40 bg-cyan-500/10 text-cyan-300" },
      { icon: "\ud83e\uddea", name: "SimLab Engine", style: "border-cyan-500/40 bg-cyan-500/10 text-cyan-300" },
    ],
  },
  {
    label: "Data Plane (Live)",
    nodes: [
      { icon: "\u2699\ufe0f", name: "EdgeCore", style: "border-amber-500/40 bg-amber-500/10 text-amber-300" },
      { icon: "\ud83d\udcbe", name: "Snapshots KV", style: "border-blue-500/40 bg-blue-500/10 text-blue-400" },
      { icon: "\ud83d\udc18", name: "PostgreSQL", style: "border-emerald-500/40 bg-emerald-500/10 text-emerald-300" },
    ],
  },
  {
    label: "Providers (25+)",
    nodes: [
      { icon: "", name: "CoinGlass", style: "border-border bg-surface2 text-muted" },
      { icon: "", name: "Binance", style: "border-border bg-surface2 text-muted" },
      { icon: "", name: "Polymarket", style: "border-border bg-surface2 text-muted" },
      { icon: "", name: "Dune", style: "border-border bg-surface2 text-muted" },
      { icon: "", name: "DefiLlama", style: "border-border bg-surface2 text-muted" },
      { icon: "", name: "Nansen", style: "border-border bg-surface2 text-muted" },
      { icon: "", name: "+ 19 more", style: "border-border bg-surface2 text-muted" },
    ],
  },
];

const NEXT_ITEMS = [
  {
    icon: "\ud83e\udd16",
    title: "EdgeNavigator",
    desc: "Super Agent on Virtuals ACP. Macro, TA, PM modes. First commercial agent with strict EdgePipe isolation.",
  },
  {
    icon: "\ud83e\udde0",
    title: "EdgeMind",
    desc: "ML predictions layer. Train on 6+ months of confluence history. Probability scores with calibrated confidence.",
  },
  {
    icon: "\ud83d\udce6",
    title: "Unified Backups",
    desc: "Full coverage: web + API + Caddy + systemd + DB. Pre/post session snapshots automated.",
  },
];

const ACCENT_BORDER: Record<string, string> = {
  amber: "border-amber-500/30",
  blue: "border-blue-500/30",
  emerald: "border-emerald-500/30",
  violet: "border-violet-500/30",
  cyan: "border-cyan-500/30",
  rose: "border-rose-500/30",
  teal: "border-teal-500/30",
};

const ACCENT_GRADIENT: Record<string, string> = {
  amber: "from-amber-400 to-orange-400",
  blue: "from-blue-400 to-violet-400",
  emerald: "from-emerald-400 to-cyan-400",
  violet: "from-violet-400 to-pink-400",
  cyan: "from-cyan-400 to-blue-400",
  rose: "from-rose-400 to-orange-400",
  teal: "from-teal-400 to-emerald-400",
};

const ACCENT_ICON_BG: Record<string, string> = {
  amber: "bg-amber-500/10",
  blue: "bg-blue-500/10",
  emerald: "bg-emerald-500/10",
  violet: "bg-violet-500/10",
  cyan: "bg-cyan-500/10",
  rose: "bg-rose-500/10",
  teal: "bg-teal-500/10",
};

const ACCENT_DOT: Record<string, string> = {
  amber: "bg-amber-400",
  blue: "bg-blue-400",
  emerald: "bg-emerald-400",
  violet: "bg-violet-400",
  cyan: "bg-cyan-400",
  rose: "bg-rose-400",
  teal: "bg-teal-400",
};

const LABEL_DOT: Record<string, string> = {
  emerald: "bg-emerald-400",
  amber: "bg-amber-400",
  blue: "bg-blue-400",
  rose: "bg-rose-400",
};

const LABEL_TEXT: Record<string, string> = {
  emerald: "text-emerald-300",
  amber: "text-amber-300",
  blue: "text-blue-400",
  rose: "text-rose-400",
};

/* ------------------------------------------------------------------ */
/*  Section divider                                                    */
/* ------------------------------------------------------------------ */
function SectionDivider({ emoji, title }: { emoji: string; title: string }) {
  return (
    <div className="flex items-center gap-3 mt-14 mb-5">
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-surface2 text-sm">
        {emoji}
      </div>
      <span className="text-[11px] font-mono font-semibold tracking-widest uppercase text-muted2">
        {title}
      </span>
      <div className="flex-1 h-px bg-gradient-to-r from-border to-transparent" />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Layer card                                                         */
/* ------------------------------------------------------------------ */
function LayerCard({ layer }: { layer: LayerData }) {
  const a = layer.accent;
  return (
    <div
      className={`rounded-xl border ${ACCENT_BORDER[a] ?? "border-border"} bg-surface p-5 relative overflow-hidden mb-3.5 transition hover:border-border2`}
    >
      <div className={`absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r ${ACCENT_GRADIENT[a] ?? "from-amber-400 to-orange-400"}`} />

      {/* Head */}
      <div className="flex items-center gap-3 mb-3.5">
        <div
          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${ACCENT_ICON_BG[a] ?? "bg-amber-500/10"} text-lg`}
        >
          {layer.icon}
        </div>
        <div>
          <div className="font-mono text-sm font-semibold text-fg">
            {layer.num}. {layer.title}
          </div>
          <div className="text-[10.5px] text-muted2">{layer.tag}</div>
        </div>
      </div>

      {/* Goal */}
      <div className="text-xs text-muted leading-relaxed mb-3.5 px-3.5 py-2.5 bg-surface2 rounded-lg border-l-[3px] border-border2">
        <strong className="text-fg">Goal:</strong> {layer.goal}
      </div>

      {/* Shipped sections */}
      {layer.sections.map((sec, si) => (
        <div key={si} className={si > 0 ? "mt-2.5" : ""}>
          <div className="flex items-center gap-1.5 mb-2 font-mono text-[10px] font-semibold tracking-widest uppercase">
            <span className={`h-1.5 w-1.5 rounded-full ${LABEL_DOT[sec.labelColor] ?? "bg-emerald-400"}`} />
            <span className={LABEL_TEXT[sec.labelColor] ?? "text-emerald-300"}>{sec.label}</span>
          </div>
          <ul className="space-y-1">
            {sec.items.map((item, i) => (
              <li key={i} className="flex items-start gap-2 text-xs text-muted leading-relaxed">
                <span className={`mt-1.5 h-1 w-1 shrink-0 rounded-full ${ACCENT_DOT[a] ?? "bg-amber-400"}`} />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}

      {/* Outcome */}
      <div className="mt-3 flex items-start gap-2 text-xs text-emerald-300 leading-relaxed px-3.5 py-2.5 rounded-lg bg-emerald-500/5 border border-emerald-500/15">
        <span className="text-emerald-400 font-bold shrink-0">&rarr;</span>
        {layer.outcome}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */
export default function DevReportPage() {
  return (
    <main className="min-h-screen">
      <Container>
        {/* Header */}
        <header className="flex items-center justify-between gap-4 py-10">
          <Link className="text-sm text-muted hover:text-fg" href="/">
            &larr; Back to EdgeBlocks
          </Link>
          <div className="flex gap-3">
            <Button href="/dashboard" variant="secondary">Dashboard</Button>
            <Button href="/roadmap" variant="secondary">Roadmap</Button>
          </div>
        </header>

        {/* ============================================ */}
        {/* HERO                                         */}
        {/* ============================================ */}
        <section className="pb-12 text-center">
          <div className="inline-flex items-center gap-2 font-mono text-[10px] font-semibold tracking-widest uppercase text-emerald-300 bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 border border-emerald-500/30 px-4 py-1.5 rounded-full mb-6">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            Sprint Report &middot; Feb 2026
          </div>
          <h1 className="text-3xl md:text-5xl font-black tracking-tighter">
            From Monolith to
            <br />
            <span className="text-amber-300">Real</span>{" "}
            <span className="text-blue-400">Platform</span>
          </h1>
          <p className="mt-4 mx-auto max-w-xl text-sm text-muted leading-relaxed">
            Four weeks of architecture transformation. EdgeCore as data plane,{" "}
            <code className="rounded bg-cyan-500/10 px-1.5 py-0.5 text-[11px] font-mono text-cyan-300">
              alertd
            </code>{" "}
            as signal plane, API as public surface, website as showcase &mdash; ready for the{" "}
            <strong className="text-fg">agentic layer</strong>.
          </p>

          {/* Progress chips */}
          <div className="mt-7 flex justify-center gap-1.5 flex-wrap">
            <span className="inline-flex items-center gap-1.5 font-mono text-[10px] font-semibold px-3.5 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-300">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />8 Layers Shipped
            </span>
            <span className="inline-flex items-center gap-1.5 font-mono text-[10px] font-semibold px-3.5 py-1.5 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-300">
              <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />Production Live
            </span>
            <span className="inline-flex items-center gap-1.5 font-mono text-[10px] font-semibold px-3.5 py-1.5 rounded-lg bg-blue-500/10 border border-blue-500/30 text-blue-400">
              <span className="h-1.5 w-1.5 rounded-full bg-blue-400" />Agents Next
            </span>
          </div>

          {/* Stats */}
          <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {HERO_STATS.map((s) => (
              <div key={s.label} className="rounded-xl border border-border bg-surface p-4 text-center">
                <div className={`font-mono text-2xl font-bold ${s.color}`}>{s.value}</div>
                <div className="mt-0.5 text-[10px] font-medium tracking-widest uppercase text-muted2">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </section>

        <Divider />

        {/* ============================================ */}
        {/* LAYERS                                       */}
        {/* ============================================ */}
        <SectionDivider emoji={"\u2699\ufe0f"} title="What We Shipped" />

        {LAYERS.map((layer) => (
          <LayerCard key={layer.num} layer={layer} />
        ))}

        <Divider />

        {/* ============================================ */}
        {/* ARCHITECTURE DIAGRAM                         */}
        {/* ============================================ */}
        <SectionDivider emoji={"\ud83c\udfd7\ufe0f"} title="Platform Architecture \u2014 Now" />

        <div className="rounded-xl border border-border bg-surface p-6">
          <div className="text-center font-mono text-xs font-semibold tracking-widest uppercase text-muted2 mb-5">
            EdgeBlocks Platform Stack
          </div>

          <div className="space-y-2">
            {ARCH_ROWS.map((row, ri) => (
              <div key={row.label}>
                <div className="text-center font-mono text-[9px] tracking-wider uppercase text-muted2 mb-1">
                  {row.label}
                </div>
                <div className="flex justify-center gap-2 flex-wrap">
                  {row.nodes.map((node) => (
                    <span
                      key={node.name}
                      className={`font-mono text-[10.5px] font-medium px-3 py-2 rounded-lg border whitespace-nowrap ${node.style}`}
                    >
                      {node.icon ? `${node.icon} ` : ""}
                      {node.name}
                    </span>
                  ))}
                </div>
                {ri < ARCH_ROWS.length - 1 && (
                  <div className="text-center text-sm text-muted2 my-1.5">
                    {ri === 0 ? "\u2195 EdgePipe (capability gateway)" : "\u2195"}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <Divider />

        {/* ============================================ */}
        {/* WHAT'S NEXT                                  */}
        {/* ============================================ */}
        <SectionDivider emoji={"\ud83d\ude80"} title="What\u2019s Next" />

        <div className="grid gap-2.5 md:grid-cols-3">
          {NEXT_ITEMS.map((item) => (
            <div
              key={item.title}
              className="rounded-xl border border-border bg-surface p-4 border-l-[3px] border-l-blue-500"
            >
              <div className="font-mono text-xs font-semibold text-fg mb-1.5">
                {item.icon} {item.title}
              </div>
              <div className="text-[11.5px] text-muted leading-relaxed">{item.desc}</div>
            </div>
          ))}
        </div>

        {/* ============================================ */}
        {/* TL;DR                                        */}
        {/* ============================================ */}
        <div className="mt-8 rounded-xl border border-amber-500/30 bg-surface p-7 text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-amber-400 to-orange-400" />
          <div className="text-sm text-muted leading-relaxed max-w-2xl mx-auto">
            <strong className="text-amber-300">TL;DR</strong> &mdash; We moved from a monolith bot
            to a <strong className="text-fg">real platform</strong>: EdgeCore as data plane, alertd
            as signal plane, API as public surface, website as showcase, backups + health checks as
            ops discipline &mdash; now ready to add the{" "}
            <strong className="text-blue-400">agentic plane</strong> via EdgePipe with strict
            isolation.
          </div>
        </div>

        {/* Footer */}
        <footer className="border-t border-border py-10 mt-14 text-sm text-muted2">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="text-lg font-extrabold tracking-tight">
              <span className="text-blue-400">Edge</span>
              <span className="text-amber-300">Blocks</span>
            </div>
            <div className="text-[11px] text-muted2 leading-relaxed">
              Sprint Report &middot; Last 4 Weeks &middot; February 2026
              <br />
              Modular Crypto Intelligence
            </div>
            <div className="flex flex-wrap gap-4">
              <Link className="hover:text-fg" href="/">Home</Link>
              <Link className="hover:text-fg" href="/eventedge">EventEdge</Link>
              <Link className="hover:text-fg" href="/dashboard">Dashboard</Link>
              <Link className="hover:text-fg" href="/roadmap">Roadmap</Link>
            </div>
          </div>
        </footer>
      </Container>
    </main>
  );
}
