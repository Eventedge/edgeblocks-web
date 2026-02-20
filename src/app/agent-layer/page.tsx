import Link from "next/link";
import { Button, Container } from "@/components/ui";
import { Divider } from "@/components/dashboard";
import type { Metadata } from "next";

/* ------------------------------------------------------------------ */
/*  Metadata                                                           */
/* ------------------------------------------------------------------ */
export const metadata: Metadata = {
  title: "EdgeNavigator — AI Super Agent on Virtuals ACP | EdgeBlocks",
  description:
    "Rent a verified AI Super Agent for real crypto intelligence. Macro, TA, Prediction Markets, or Full Synthesis — action-ready cards, not vague chatbot text.",
  openGraph: {
    title: "EdgeNavigator — AI Super Agent on Virtuals ACP",
    description:
      "Rent a verified AI Super Agent for real crypto intelligence via the Virtuals Agent Commerce Protocol.",
    url: "https://edgeblocks.io/agent-layer",
  },
};

/* ------------------------------------------------------------------ */
/*  Static data                                                        */
/* ------------------------------------------------------------------ */

const MODES = [
  { emoji: "\ud83c\udf0d", name: "Macro", desc: "Regime + pillars + risk windows", highlight: true },
  { emoji: "\ud83d\udcca", name: "TA", desc: "Setups, triggers, targets", highlight: true },
  { emoji: "\ud83c\udfaf", name: "Prediction", desc: "PM movers + divergence", highlight: true },
  { emoji: "\ud83d\udcda", name: "Tutor", desc: "Learn the tools + signals", highlight: false },
  { emoji: "\u26a1", name: "Full Synth", desc: "Macro + TA + PM combined", highlight: true },
];

const HERO_STATS = [
  { value: "5", label: "Agent Modes", color: "text-amber-300" },
  { value: "25+", label: "Data Sources", color: "text-blue-400" },
  { value: "8", label: "Confluence Pillars", color: "text-emerald-300" },
  { value: "ACP", label: "Fair Pricing", color: "text-cyan-300" },
];

const DELIVERABLES = [
  {
    emoji: "\ud83d\udd50",
    name: "As-of Timestamp",
    tag: "Data freshness you can trust",
    accent: "emerald",
    items: [
      "Every card shows exact data age (e.g. \"2m fresh\")",
      "Stale data flagged automatically \u2014 no silent failures",
      "Source attribution (which API, which endpoint)",
    ],
  },
  {
    emoji: "\ud83d\udcca",
    name: "Confidence Score",
    tag: "How strong the setup is",
    accent: "blue",
    items: [
      "0\u2013100% confidence based on pillar agreement",
      "Pillar breakdown \u2014 see which signals agree",
      "Historical calibration (70% confidence \u2248 70% hit rate)",
    ],
  },
  {
    emoji: "\u26a1",
    name: "What Changed",
    tag: "Skip the noise, see the delta",
    accent: "amber",
    items: [
      "Highlights only what shifted since last report",
      "No rereading the whole brief \u2014 jump to what matters",
      "Color-coded urgency (new, escalated, resolved)",
    ],
  },
  {
    emoji: "\ud83c\udfaf",
    name: "Next Actions",
    tag: 'Clear "do this / avoid that" steps',
    accent: "amber",
    items: [
      "\u2705 Do this \u2014 specific entries, levels, targets",
      "\u26a0\ufe0f Watch this \u2014 risk events, invalidation points",
      "\u274c Avoid this \u2014 crowded trades, weak setups",
    ],
  },
];

const TIER_ROWS = [
  { param: "Model Tier", options: ["Cheap", "Mid", "Premium"], colors: ["text-emerald-300", "text-blue-400", "text-amber-300"], impact: "Reasoning depth + accuracy" },
  { param: "Freshness", options: "15m \u2192 5m \u2192 2m \u2192 Real-time", impact: "Data recency on each card" },
  { param: "Report Depth", options: "Short board \u2192 Standard \u2192 Deep report", impact: "Number of pillars + analysis depth" },
  { param: "Frequency", options: "One-off \u2192 Daily digest \u2192 4H recurring", impact: "Billing cadence" },
  { param: "Scope", options: "Single asset \u2192 Multi-asset \u2192 Full market", impact: "How many assets analyzed" },
];

const TRUST_BADGES = [
  { emoji: "\ud83d\udee1\ufe0f", name: "ProofClaw Verified", desc: "Identity + policy controls. Agent is who it says it is.", bg: "bg-emerald-500/10" },
  { emoji: "\ud83e\uddf1", name: "Closed-Gate Architecture", desc: "No random endpoints. No unsafe access. Scoped data only.", bg: "bg-blue-500/10" },
  { emoji: "\ud83d\udc41\ufe0f", name: "Read-Only by Default", desc: "Interprets your real signal pipeline. Never writes or trades.", bg: "bg-cyan-500/10" },
  { emoji: "\ud83e\uddfe", name: "Auditable Execution", desc: "Every job has a traceable path. Full transparency on what ran.", bg: "bg-violet-500/10" },
];

const PIPELINE_NODES = [
  { label: "EdgeCore Ingestion", style: "border-blue-500/40 bg-blue-500/10 text-blue-400" },
  { label: "25+ API Rollups", style: "border-cyan-500/40 bg-cyan-500/10 text-cyan-300" },
  { label: "TA Scanners", style: "border-emerald-500/40 bg-emerald-500/10 text-emerald-300" },
  { label: "Confluence Scoring", style: "border-amber-500/40 bg-amber-500/10 text-amber-300" },
  { label: "PM3 Indexing", style: "border-blue-500/40 bg-blue-500/10 text-blue-400" },
  { label: "AI Synthesis", style: "border-cyan-500/40 bg-cyan-500/10 text-cyan-300" },
  { label: "\ud83d\udce8 Card Output", style: "border-amber-500/40 bg-amber-500/10 text-amber-300" },
];

const ACCENT_DOT: Record<string, string> = {
  emerald: "bg-emerald-400",
  blue: "bg-blue-400",
  amber: "bg-amber-400",
  violet: "bg-violet-400",
  cyan: "bg-cyan-400",
};

/* ------------------------------------------------------------------ */
/*  Section divider with icon                                          */
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
/*  Telegram mock card                                                 */
/* ------------------------------------------------------------------ */
function TgMock({
  subtitle,
  children,
  wide = false,
  buttons,
}: {
  subtitle: string;
  children: React.ReactNode;
  wide?: boolean;
  buttons?: { label: string; primary?: boolean }[];
}) {
  return (
    <div className={`rounded-xl border border-border bg-surface overflow-hidden ${wide ? "md:col-span-2" : ""}`}>
      {/* Header bar */}
      <div className="flex items-center gap-3 border-b border-border bg-surface2 px-4 py-2.5">
        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-amber-400 to-orange-500 text-[11px] font-bold text-black">
          EN
        </div>
        <div>
          <div className="text-xs font-mono font-semibold text-amber-300">EdgeNavigator</div>
          <div className="text-[10px] text-muted2">{subtitle}</div>
        </div>
      </div>
      {/* Body */}
      <div className="px-4 py-3 font-mono text-[11.5px] leading-[1.65] text-muted whitespace-pre-line">
        {children}
      </div>
      {/* Buttons */}
      {buttons && buttons.length > 0 && (
        <div className="flex flex-wrap gap-1.5 px-4 pb-3">
          {buttons.map((b) => (
            <span
              key={b.label}
              className={`font-mono text-[10px] font-medium px-3 py-1.5 rounded-md border ${
                b.primary
                  ? "border-amber-500/50 text-amber-300 bg-amber-500/5"
                  : "border-border bg-surface2 text-muted2"
              }`}
            >
              {b.label}
            </span>
          ))}
        </div>
      )}
      {/* Timestamp */}
      <div className="text-right text-[10px] text-muted2 px-4 pb-2.5">{"\u2713"} Read</div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Highlight spans                                                    */
/* ------------------------------------------------------------------ */
function G({ children }: { children: React.ReactNode }) {
  return <span className="text-amber-300 font-semibold">{children}</span>;
}
function B({ children }: { children: React.ReactNode }) {
  return <span className="text-blue-400 font-semibold">{children}</span>;
}
function Gr({ children }: { children: React.ReactNode }) {
  return <span className="text-emerald-300 font-semibold">{children}</span>;
}
function R({ children }: { children: React.ReactNode }) {
  return <span className="text-red-400 font-semibold">{children}</span>;
}
function C({ children }: { children: React.ReactNode }) {
  return <span className="text-cyan-300 font-semibold">{children}</span>;
}
function W({ children }: { children: React.ReactNode }) {
  return <span className="text-fg font-semibold">{children}</span>;
}
function D({ children }: { children: React.ReactNode }) {
  return <span className="text-muted2">{children}</span>;
}

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */
export default function AgentLayerPage() {
  return (
    <main className="min-h-screen">
      <Container>
        {/* Header */}
        <header className="flex items-center justify-between gap-4 py-10">
          <Link className="text-sm text-muted hover:text-fg" href="/">
            &larr; Back to EdgeBlocks
          </Link>
          <div className="flex gap-3">
            <Button href="/eventedge" variant="secondary">EventEdge</Button>
            <Button href="/dashboard" variant="secondary">Dashboard</Button>
          </div>
        </header>

        {/* ============================================ */}
        {/* HERO                                         */}
        {/* ============================================ */}
        <section className="pb-12 text-center">
          <div className="inline-flex items-center gap-2 font-mono text-[10px] font-semibold tracking-widest uppercase text-amber-300 bg-gradient-to-r from-amber-500/10 to-blue-500/10 border border-amber-500/30 px-4 py-1.5 rounded-full mb-6">
            <span className="h-1.5 w-1.5 rounded-full bg-amber-400 animate-pulse" />
            Live on Virtuals ACP
          </div>
          <h1 className="text-4xl md:text-6xl font-black tracking-tighter">
            <span className="text-amber-300">Edge</span>
            <span className="text-blue-400">Navigator</span>
          </h1>
          <p className="mt-4 mx-auto max-w-xl text-base text-muted leading-relaxed">
            Rent a <strong className="text-fg">verified AI Super Agent</strong> for real crypto
            intelligence &mdash; Macro, TA, Prediction Markets, or Full Synthesis. Action-ready
            cards, not vague chatbot text.
          </p>

          <div className="mt-9 flex justify-center gap-10 flex-wrap">
            {HERO_STATS.map((s) => (
              <div key={s.label} className="text-center">
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
        {/* MODES                                        */}
        {/* ============================================ */}
        <SectionDivider emoji={"\ud83e\udde0"} title="Rentable Modes" />

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5">
          {MODES.map((m) => (
            <div
              key={m.name}
              className={`relative rounded-xl border p-4 text-center transition hover:-translate-y-0.5 ${
                m.highlight
                  ? "border-amber-500/50 bg-gradient-to-br from-surface to-amber-950/10"
                  : "border-border bg-surface"
              }`}
            >
              {m.highlight && (
                <div className="absolute top-0 left-0 right-0 h-0.5 rounded-t-xl bg-gradient-to-r from-amber-400 to-orange-500" />
              )}
              <span className="text-2xl">{m.emoji}</span>
              <div className="mt-1.5 font-mono text-[11px] font-semibold text-fg">{m.name}</div>
              <div className="mt-0.5 text-[10px] text-muted2 leading-snug">{m.desc}</div>
            </div>
          ))}
        </div>

        <Divider />

        {/* ============================================ */}
        {/* EXAMPLE OUTPUTS                              */}
        {/* ============================================ */}
        <section id="outputs" className="scroll-mt-16">
          <SectionDivider emoji={"\ud83d\udce8"} title="Example Outputs \u2014 What You Actually Get" />

          <div className="grid gap-3 md:grid-cols-2">
            {/* Macro Brief */}
            <TgMock subtitle="Macro Brief \u00b7 Full Synthesis">
              <G>{"\ud83c\udf0d"} MACRO BRIEF &bull; BTC</G>{"\n"}
              <D>{"\ud83d\udcca"} Data: 8 pillars | {"\ud83e\uddf2"} 2m fresh</D>{"\n"}
              {"\n"}
              <W>{"\u2501\u2501\u2501"} {"\ud83d\udd25"} REGIME {"\u2501\u2501\u2501"}</W>{"\n"}
              {"Posture: "}<Gr>RISK-ON</Gr>{" (7/10)\n"}
              {"Trend: Expansion \u00b7 14d streak\n"}
              {"DXY: Weakening \u2192 "}<Gr>Tailwind</Gr>{"\n"}
              {"\n"}
              <W>{"\u2501\u2501\u2501"} {"\ud83d\udcca"} PILLARS {"\u2501\u2501\u2501"}</W>{"\n"}
              {"Derivatives: "}<Gr>+2.1</Gr>{" \u00b7 Funding neutral, OI rising\n"}
              {"Options:     "}<Gr>+1.8</Gr>{" \u00b7 Puts fading, DVOL \u2193\n"}
              {"ETF Flows:   "}<Gr>+3.2</Gr>{" \u00b7 $410M net inflow\n"}
              {"Liquidations:"}<B> 0.0</B>{" \u00b7 Clean both sides\n"}
              {"On-chain:    "}<Gr>+1.4</Gr>{" \u00b7 Stables inflow rising\n"}
              {"\n"}
              <W>{"\u2501\u2501\u2501"} {"\u26a1"} WHAT CHANGED {"\u2501\u2501\u2501"}</W>{"\n"}
              {"\u2022 ETF inflows accelerated (was $180M \u2192 $410M)\n"}
              {"\u2022 Options skew flipped bullish overnight\n"}
              {"\u2022 Whale cohort net buying for 3d straight\n"}
              {"\n"}
              <W>{"\u2501\u2501\u2501"} {"\ud83c\udfaf"} NEXT ACTIONS {"\u2501\u2501\u2501"}</W>{"\n"}
              {"\u2705 Bias: "}<Gr>Long BTC</Gr>{" \u00b7 Confidence: "}<G>82%</G>{"\n"}
              {"\u2705 Add on dips to $94K\u2013$95K zone\n"}
              {"\u26a0\ufe0f Watch: FOMC minutes Wed 14:00 UTC\n"}
              {"\u274c Avoid: Short until ETF flows reverse\n"}
              {"\n"}
              <D>{"\ud83d\udd50"} 14:32:18 UTC \u00b7 Model: Premium</D>
            </TgMock>

            {/* TA Setups */}
            <TgMock subtitle="TA Mode \u00b7 Top Setups Board">
              <G>{"\ud83d\udcca"} TA SETUPS &bull; Top 3</G>{"\n"}
              <D>{"\ud83d\udcca"} Data: 18 scanners | {"\ud83e\uddf2"} 5m fresh</D>{"\n"}
              {"\n"}
              <W>{"\u2501\u2501\u2501"} #1 {"\ud83d\udfe2"} ETH Long {"\u2501\u2501\u2501"}</W>{"\n"}
              {"Trigger: Break above "}<C>$3,285</C>{" (4H close)\n"}
              {"Stop: $3,140 (-4.4%)\n"}
              {"TP1: $3,520 (+7.2%) \u00b7 TP2: $3,780\n"}
              {"Scanners: Trend Conf \u2705 Supertrend \u2705 BOS \u2705\n"}
              {"Confluence: "}<Gr>6/7</Gr>{" \u00b7 Confidence: "}<G>78%</G>{"\n"}
              {"\n"}
              <W>{"\u2501\u2501\u2501"} #2 {"\ud83d\udfe2"} SOL Long {"\u2501\u2501\u2501"}</W>{"\n"}
              {"Trigger: Reclaim "}<C>$178</C>{" with RVOL > 2\u00d7\n"}
              {"Stop: $168 \u00b7 TP1: $198 \u00b7 TP2: $215\n"}
              {"Scanners: TTM Squeeze \u2705 ADX \u2705 EMA Stack \u2705\n"}
              {"Confluence: "}<Gr>5/7</Gr>{" \u00b7 Confidence: "}<G>71%</G>{"\n"}
              {"\n"}
              <W>{"\u2501\u2501\u2501"} #3 {"\ud83d\udd34"} DOGE Short {"\u2501\u2501\u2501"}</W>{"\n"}
              {"Trigger: Lose "}<C>$0.235</C>{" support\n"}
              {"Stop: $0.252 \u00b7 TP1: $0.205\n"}
              {"Scanners: RSI Div \u2705 Chandelier \u2705\n"}
              {"Confluence: "}<R>4/7</R>{" \u00b7 Confidence: "}<G>64%</G>{"\n"}
              {"\n"}
              <W>{"\u2501\u2501\u2501"} {"\u26a0\ufe0f"} INVALIDATION {"\u2501\u2501\u2501"}</W>{"\n"}
              {"ETH: Invalidated if BTC loses $93K\n"}
              {"SOL: Invalidated if funding goes >0.05%\n"}
              {"\n"}
              <D>{"\ud83d\udd50"} 14:32:18 UTC \u00b7 Model: Premium</D>
            </TgMock>

            {/* PM Movers — full width */}
            <TgMock
              subtitle="Prediction Markets Mode \u00b7 Divergence Report"
              wide
              buttons={[
                { label: "\ud83d\udccb Full Report", primary: true },
                { label: "\ud83d\udd04 Refresh" },
                { label: "\u2699\ufe0f Settings" },
              ]}
            >
              <G>{"\ud83c\udfaf"} PM MOVERS & DIVERGENCE</G>{"\n"}
              <D>{"\ud83d\udcca"} Data: Polymarket + Kalshi | {"\ud83e\uddf2"} 10m fresh</D>{"\n"}
              {"\n"}
              <W>{"\u2501\u2501\u2501"} {"\ud83d\udd25"} TOP MOVERS (24H) {"\u2501\u2501\u2501"}</W>{"\n"}
              {"\ud83d\udcc8 \"BTC $120K by June\"       "}<Gr>42% {"\u2192"} 58%</Gr>{"  (+16pp) \u00b7 $4.2M vol\n"}
              {"\ud83d\udcc8 \"ETH ETF staking approved\" "}<Gr>31% {"\u2192"} 44%</Gr>{"  (+13pp) \u00b7 $1.8M vol\n"}
              {"\ud83d\udcc9 \"Fed cut in March\"         "}<R>67% {"\u2192"} 48%</R>{"  (-19pp) \u00b7 $8.1M vol\n"}
              {"\ud83d\udcc9 \"SOL ETF approved Q1\"      "}<R>55% {"\u2192"} 41%</R>{"  (-14pp) \u00b7 $2.3M vol\n"}
              {"\n"}
              <W>{"\u2501\u2501\u2501"} {"\u26a1"} DIVERGENCE SIGNALS {"\u2501\u2501\u2501"}</W>{"\n"}
              {"\ud83d\udd00 BTC spot rallying but \"BTC $120K\" was 42% \u2192 pricing gap closing fast\n"}
              {"\ud83d\udd00 Fed cut odds crashing but DXY still weakening \u2192 conflict, watch closely\n"}
              {"\ud83d\udd00 SOL ETF fading but SOL price holding \u2192 market disagrees with PM\n"}
              {"\n"}
              <W>{"\u2501\u2501\u2501"} {"\ud83c\udfaf"} WHAT TO DO {"\u2501\u2501\u2501"}</W>{"\n"}
              {"\u2705 BTC $120K conviction aligning with spot \u2014 no trade needed, confirms long bias\n"}
              {"\u26a0\ufe0f Fed cut repricing could hit risk assets if DXY reverses \u2014 hedge window\n"}
              {"\u2705 SOL ETF fade = buying opportunity if SOL holds $175+ (market > prediction)\n"}
              {"\n"}
              <D>{"\ud83d\udd50"} 14:32:18 UTC \u00b7 Model: Mid</D>
            </TgMock>
          </div>
        </section>

        <Divider />

        {/* ============================================ */}
        {/* DELIVERABLES                                 */}
        {/* ============================================ */}
        <SectionDivider emoji={"\u2705"} title="Structured Deliverables" />

        <div className="grid gap-3 md:grid-cols-2">
          {DELIVERABLES.map((d) => (
            <div
              key={d.name}
              className="rounded-xl border border-border bg-surface p-5 relative overflow-hidden"
            >
              <div className={`absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r ${
                d.accent === "emerald" ? "from-emerald-400 to-cyan-400"
                : d.accent === "blue" ? "from-blue-400 to-violet-400"
                : "from-amber-400 to-orange-400"
              }`} />
              <div className="flex items-center gap-2.5 mb-3">
                <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${
                  d.accent === "emerald" ? "bg-emerald-500/10"
                  : d.accent === "blue" ? "bg-blue-500/10"
                  : "bg-amber-500/10"
                } text-base`}>
                  {d.emoji}
                </div>
                <div>
                  <div className="font-mono text-[13px] font-semibold text-fg">{d.name}</div>
                  <div className="text-[10px] text-muted2">{d.tag}</div>
                </div>
              </div>
              <ul className="space-y-1.5">
                {d.items.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-xs text-muted leading-relaxed">
                    <span className={`mt-1.5 h-1 w-1 shrink-0 rounded-full ${ACCENT_DOT[d.accent] ?? "bg-amber-400"}`} />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <Divider />

        {/* ============================================ */}
        {/* ACP PRICING                                  */}
        {/* ============================================ */}
        <SectionDivider emoji={"\ud83d\udcb0"} title="Fair Pricing via ACP Negotiation" />

        <div className="rounded-xl border border-amber-500/30 bg-surface p-5 relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-amber-400 to-orange-400" />
          <div className="flex items-center gap-2.5 mb-3">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-amber-500/10 text-base">
              {"\ud83e\udd1d"}
            </div>
            <div className="font-mono text-[13px] font-semibold text-fg">
              You don&apos;t pay for &ldquo;AI chat time.&rdquo; You pay for defined deliverables.
            </div>
          </div>
          <p className="text-xs text-muted leading-relaxed mb-4">
            With the Virtuals Agent Commerce Protocol, you negotiate exactly what you need &mdash;
            model quality, data freshness, report depth, and frequency. One-off jobs or recurring
            briefs. You set the terms.
          </p>

          <div className="overflow-x-auto">
            <table className="w-full font-mono text-[11.5px]">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-2.5 px-3 text-[10px] font-semibold tracking-widest uppercase text-muted2">
                    Parameter
                  </th>
                  <th className="text-left py-2.5 px-3 text-[10px] font-semibold tracking-widest uppercase text-muted2">
                    Options
                  </th>
                  <th className="text-left py-2.5 px-3 text-[10px] font-semibold tracking-widest uppercase text-muted2">
                    Impact
                  </th>
                </tr>
              </thead>
              <tbody>
                {TIER_ROWS.map((row) => (
                  <tr key={row.param} className="border-b border-border/40 hover:bg-surface2/40">
                    <td className="py-2.5 px-3 font-semibold text-fg">{row.param}</td>
                    <td className="py-2.5 px-3 text-muted">
                      {Array.isArray(row.options)
                        ? row.options.map((opt, i) => (
                            <span key={opt}>
                              {i > 0 && " \u2192 "}
                              <span className={row.colors?.[i] ?? "text-muted"}>{opt}</span>
                            </span>
                          ))
                        : row.options}
                    </td>
                    <td className="py-2.5 px-3 text-muted">{row.impact}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <Divider />

        {/* ============================================ */}
        {/* TRUST BADGES                                 */}
        {/* ============================================ */}
        <SectionDivider emoji={"\ud83d\udd12"} title="Built on Trust + Closed Gates" />

        <div className="grid gap-2.5 sm:grid-cols-2 lg:grid-cols-4">
          {TRUST_BADGES.map((b) => (
            <div key={b.name} className="flex items-start gap-3 rounded-xl border border-border bg-surface p-4">
              <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${b.bg} text-lg`}>
                {b.emoji}
              </div>
              <div>
                <div className="font-mono text-[11px] font-semibold text-fg">{b.name}</div>
                <div className="mt-0.5 text-[10px] text-muted2 leading-snug">{b.desc}</div>
              </div>
            </div>
          ))}
        </div>

        <Divider />

        {/* ============================================ */}
        {/* PIPELINE                                     */}
        {/* ============================================ */}
        <SectionDivider emoji={"\u2699\ufe0f"} title="Powered by a Real Pipeline (Not Prompts)" />

        <div className="rounded-xl border border-cyan-500/30 bg-surface p-5 relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-400" />
          <div className="flex items-center gap-2.5 mb-4">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-cyan-500/10 text-base">
              {"\ud83d\udd27"}
            </div>
            <div>
              <div className="font-mono text-[13px] font-semibold text-fg">
                EventEdge Engine {"\u2192"} EdgeNavigator Output
              </div>
              <div className="text-[10px] text-muted2">
                Research-quality output, delivered fast, in trading-native format
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center flex-wrap gap-1.5 py-5">
            {PIPELINE_NODES.map((node, i) => (
              <span key={node.label} className="contents">
                <span className={`font-mono text-[10.5px] font-medium px-3 py-2 rounded-lg border whitespace-nowrap ${node.style}`}>
                  {node.label}
                </span>
                {i < PIPELINE_NODES.length - 1 && (
                  <span className="text-muted2 text-sm">{"\u2192"}</span>
                )}
              </span>
            ))}
          </div>

          <ul className="mt-3 space-y-1.5">
            {[
              "EdgeCore ingestion + normalization across 25+ providers",
              "18 TA scanners feeding confluence scoring engine",
              "Prediction market indexing (Polymarket + Kalshi)",
              "Alert dispatch via alertd for recurring briefs",
              "Telemetry + monitoring via EdgeBlocks Admin",
            ].map((item) => (
              <li key={item} className="flex items-start gap-2 text-xs text-muted leading-relaxed">
                <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-cyan-400" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <Divider />

        {/* ============================================ */}
        {/* COMPARISON                                   */}
        {/* ============================================ */}
        <SectionDivider emoji={"\ud83d\udc8e"} title="Why EdgeNavigator, Not Another AI Bot" />

        <div className="grid gap-3 md:grid-cols-2">
          {/* Typical bots */}
          <div className="rounded-xl border border-border bg-surface p-5 relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-violet-400 to-pink-400" />
            <div className="flex items-center gap-2.5 mb-3">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-violet-500/10 text-base">
                {"\ud83e\udd16"}
              </div>
              <div>
                <div className="font-mono text-[13px] font-semibold text-fg">Typical AI Trading Bots</div>
                <div className="text-[10px] text-muted2">What you usually get</div>
              </div>
            </div>
            <ul className="space-y-1.5">
              {[
                "Generic ChatGPT wrapper with no live data",
                "\"BTC looks bullish\" with zero specifics",
                "No timestamps, no data freshness, no source",
                "Hallucinated price levels and made-up statistics",
                "Pay for chat time, not for output quality",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2 text-xs text-muted leading-relaxed">
                  <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-violet-400" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* EdgeNavigator */}
          <div className="rounded-xl border border-amber-500/30 bg-surface p-5 relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-amber-400 to-orange-400" />
            <div className="flex items-center gap-2.5 mb-3">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-amber-500/10 text-base">
                {"\u26a1"}
              </div>
              <div>
                <div className="font-mono text-[13px] font-semibold text-fg">EdgeNavigator</div>
                <div className="text-[10px] text-muted2">What you actually need</div>
              </div>
            </div>
            <ul className="space-y-1.5">
              {[
                "Connected to 25+ live APIs, 2-minute fresh data",
                "Specific entries, stops, targets with confidence scores",
                "Every card timestamped with source + cache age",
                "Real data, verified pipeline, zero hallucination",
                "Pay for defined deliverables via ACP negotiation",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2 text-xs text-muted leading-relaxed">
                  <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-amber-400" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* ============================================ */}
        {/* CTAs                                         */}
        {/* ============================================ */}
        <div className="mt-12 flex flex-wrap justify-center gap-3">
          <Button href="https://app.virtuals.io" variant="primary">
            Rent EdgeNavigator on ACP
          </Button>
          <a
            href="#outputs"
            className="inline-flex items-center justify-center rounded-xl border border-blue-500 px-5 py-3 text-sm font-semibold text-blue-400 transition hover:bg-blue-500/10"
          >
            See Example Outputs
          </a>
          <Button href="/eventedge" variant="ghost">
            Explore EventEdge Pipeline &rarr;
          </Button>
        </div>

        {/* Footer */}
        <footer className="border-t border-border py-10 mt-14 text-sm text-muted2">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="text-lg font-extrabold tracking-tight">
              <span className="text-blue-400">Edge</span>
              <span className="text-amber-300">Blocks</span>
            </div>
            <div className="text-[11px] text-muted2 leading-relaxed">
              EdgeNavigator &mdash; Verified AI Super Agent on Virtuals ACP<br />
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
