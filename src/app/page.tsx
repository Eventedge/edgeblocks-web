import "./homepage-v2.css";
import { Container } from "@/components/ui";
import { Navbar } from "@/components/Navbar";
import { ScrollReveal } from "@/components/home/ScrollReveal";

/* ------------------------------------------------------------------ */
/*  Layer section data                                                  */
/* ------------------------------------------------------------------ */

const API_CHIPS = [
  "CoinGlass","Binance","Bybit","Hyperliquid","OKX","Deribit",
  "Polymarket","Kalshi","Dune Analytics","DefiLlama","Nansen",
  "CoinGecko","SoSoValue","DEXTools","CoinStats","DIA Oracle",
  "TwelveData","Finnhub","CoinCap","mempool.space",
];

const PILLARS = [
  { emoji: "\u{1F4C8}", name: "Derivatives", sub: "Funding \u00B7 OI \u00B7 L/S" },
  { emoji: "\u{1F3B0}", name: "Options",     sub: "P/C \u00B7 DVOL \u00B7 Skew" },
  { emoji: "\u{1F3E6}", name: "ETF Flows",   sub: "Inflows \u00B7 Outflows" },
  { emoji: "\u{1F3AF}", name: "Prediction Mkts", sub: "Polymarket \u00B7 Kalshi" },
  { emoji: "\u{1F4A5}", name: "Liquidations", sub: "Cascades \u00B7 Imbalance" },
  { emoji: "\u26D3\uFE0F", name: "On-Chain",  sub: "DEX \u00B7 Stables \u00B7 Whales" },
  { emoji: "\u{1F4B9}", name: "Sentiment",   sub: "Fear/Greed \u00B7 Social" },
  { emoji: "\u{1F30D}", name: "Macro",       sub: "DXY \u00B7 Yields \u00B7 Risk" },
];

type Feat = { emoji: string; name: string; desc: string };

const LAYER1_FEATS: Feat[] = [
  { emoji: "\u{1F4E5}", name: "Ingest & Normalize", desc: "50+ APIs ingested, cleaned, and normalized into one consistent format. Different schemas, same output." },
  { emoji: "\u{1F4BE}", name: "Snapshot Architecture", desc: "Every data point stored as a versioned snapshot. Full historical depth. Fall back to last-known-good when providers fail." },
  { emoji: "\u26A1",     name: "Smart Caching + TTL", desc: "Order books refresh in 30s, funding in 1m, ETF flows in 1h. Each source has the right cadence. No wasted calls." },
];

const LAYER2_FEATS: Feat[] = [
  { emoji: "\u{1F3AF}", name: "Confluence Scoring", desc: "8 weighted pillars. When they agree, you have conviction. When they don\u2019t, you wait. No more single-signal noise." },
  { emoji: "\u{1F4CA}", name: "18 TA Scanners", desc: "RSI, Squeeze, Supertrend, EMA Stack, ADX, BOS/CHoCH \u2014 scanning 170 tokens every 5 minutes for alignment." },
  { emoji: "\u{1F916}", name: "AI Analyst", desc: "Ask anything in natural language. AI reads all 8 pillars and explains the market in plain English. No jargon walls." },
  { emoji: "\u2600\uFE0F", name: "Automated Reports", desc: "Morning Desk at 08:30 UTC, Close Wrap at 22:30 UTC. Bloomberg-style briefs delivered before you open charts." },
  { emoji: "\u{1F4E1}", name: "Telegram-Native", desc: "No app download, no desktop dashboard. Just /start in Telegram. Intelligence finds you where you already are." },
  { emoji: "\u{1F4BC}", name: "Portfolio Tracking", desc: "EdgeFolio tracks your positions across chains. Confluence-weighted portfolio view with rebalancing signals." },
];

const LAYER4_FEATS: Feat[] = [
  { emoji: "\u{1F9EA}", name: "Simulation Lab", desc: "Paper trading across Binance, Bybit, Hyperliquid, Kraken, and Polymarket. Real prices, real fills, zero risk." },
  { emoji: "\u{1F3AF}", name: "Auto-Entry on Signals", desc: "TA scanners trigger paper trades automatically when confluence aligns. SL/TP monitored every 2 minutes." },
  { emoji: "\u{1F4C8}", name: "Track Record", desc: "Full PnL history, win rate, Sharpe ratio, R-multiples. Prove your strategy works before you risk capital." },
  { emoji: "\u{1F514}", name: "Smart Alerts", desc: "Price, confluence, TA scanner, whale, ETF flow, and custom alerts. Deduplication and cooldowns \u2014 no spam." },
  { emoji: "\u{1F4E1}", name: "alertd Service", desc: "Alerts extracted as a platform primitive. Bot, website, and future agents all consume the same signal stream." },
  { emoji: "\u{1F4CA}", name: "Strategy Journal", desc: "Every trade logged with entry reason, exit result, and confluence at time of entry. Learn what works for you." },
];

const LAYER5_FEATS: Feat[] = [
  { emoji: "\u{1F3A8}", name: "Pick Your Features", desc: "Choose from hundreds of EdgeBank features. Derivatives trader? Load up on funding + OI + liquidations. Macro first? DXY + yields + ETF flows." },
  { emoji: "\u{1F527}", name: "Build Your Strategy", desc: "Combine features into custom confluence rules. Set your own weights, thresholds, and triggers. Your edge, your way." },
  { emoji: "\u{1F916}", name: "Deploy as a Bot", desc: "Your strategy runs as a personal Telegram bot. Alerts, reports, and paper trades \u2014 all configured to how you trade." },
  { emoji: "\u{1F9EA}", name: "Paper First, Real Later", desc: "Run every strategy in simulation before going live. See real results on real price action with zero exposure." },
  { emoji: "\u{1F4CA}", name: "EdgeMind Integration", desc: "Wire ML predictions into your strategy. Use probability scores as confirmation or filters on your own setups." },
  { emoji: "\u{1F4C8}", name: "Performance Dashboard", desc: "See how your custom strategy performs over time. Compare against default confluence. Iterate and improve." },
];

const LAYER6_FEATS: Feat[] = [
  { emoji: "\u{1F916}", name: "Personal Agents", desc: "Turn your strategy into an agent that monitors, alerts, and paper trades automatically. Set it and let it run." },
  { emoji: "\u{1F514}", name: "Smart Notifications", desc: "Agents watch your specific conditions \u2014 not generic price alerts, but \u201Cmy confluence on ETH hit 80 with funding spike.\u201D" },
  { emoji: "\u{1F3EA}", name: "Rent Agents", desc: "Browse proven agents from other traders. See their verified track record. Rent the ones that match your style." },
  { emoji: "\u{1F4B0}", name: "Monetize Yours", desc: "Built a strategy that works? Deploy it as a rentable agent. Other traders pay to use it. You earn from your edge." },
  { emoji: "\u{1F512}", name: "Gated & Verified", desc: "Agents run through EdgePipe with strict scopes. Read-only access. Auditable execution. No direct DB or exchange access." },
  { emoji: "\u{1F4CA}", name: "Verified Track Records", desc: "Every agent\u2019s performance tracked by the platform \u2014 not self-reported. Calibrated confidence. Proven results." },
];

const FLOW_NODES = [
  { label: "Signal Detected", border: "var(--hp2-gold)",   color: "var(--hp2-gold2)" },
  { label: "Confluence Check", border: "var(--hp2-blue)",   color: "var(--hp2-blue2)" },
  { label: "Alert Fired",      border: "var(--hp2-purple)", color: "var(--hp2-purple2)" },
  { label: "Paper Trade Opened", border: "var(--hp2-green)", color: "var(--hp2-green2)" },
  { label: "SL/TP Monitored",  border: "var(--hp2-cyan)",  color: "var(--hp2-cyan2)" },
  { label: "Result Logged",    border: "var(--hp2-green)",  color: "var(--hp2-green2)" },
];

const RELEVANCE_ROWS = [
  { label: "ETF Flows",    pct: 92, grad: "linear-gradient(90deg,var(--hp2-green),var(--hp2-green2))",  pctColor: "var(--hp2-green2)" },
  { label: "Funding Rate",  pct: 78, grad: "linear-gradient(90deg,var(--hp2-green),var(--hp2-green2))",  pctColor: "var(--hp2-green2)" },
  { label: "PM Odds",       pct: 65, grad: "linear-gradient(90deg,var(--hp2-blue),var(--hp2-blue2))",    pctColor: "var(--hp2-blue2)" },
  { label: "RSI Div",       pct: 54, grad: "linear-gradient(90deg,var(--hp2-blue),var(--hp2-blue2))",    pctColor: "var(--hp2-blue2)" },
  { label: "Social Sent.",   pct: 31, grad: "linear-gradient(90deg,var(--hp2-red),#ef444480)",           pctColor: "var(--hp2-text4)" },
  { label: "Whale Txs",     pct: 22, grad: "linear-gradient(90deg,var(--hp2-red),#ef444480)",           pctColor: "var(--hp2-text4)" },
];

/* ------------------------------------------------------------------ */
/*  Reusable sub-components (server-side, no "use client")             */
/* ------------------------------------------------------------------ */

function FeatGrid({ feats }: { feats: Feat[] }) {
  return (
    <div className="hp2-feat-grid hp2-reveal">
      {feats.map((f) => (
        <div className="hp2-feat" key={f.name}>
          <span className="hp2-feat-emoji">{f.emoji}</span>
          <div className="hp2-feat-name">{f.name}</div>
          <div className="hp2-feat-desc">{f.desc}</div>
        </div>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Page                                                                */
/* ------------------------------------------------------------------ */

export default function Home() {
  return (
    <main className="hp2-root">
      {/* -------- Existing site nav (untouched) -------- */}
      <Container>
        <div className="relative">
          <Navbar />
        </div>
      </Container>

      {/* -------- ScrollReveal (client island) -------- */}
      <ScrollReveal />

      {/* ============================================ */}
      {/*  HERO                                         */}
      {/* ============================================ */}
      <section className="hp2-hero">
        <div className="hp2-container">
          <div className="hp2-hero-content">
            <h1>
              Find your <span style={{ color: "var(--hp2-gold2)" }}>edge</span>.
            </h1>
            <p className="hp2-hero-pitch">
              EdgeBlocks is a <strong>sandbox for crypto traders</strong> &mdash; we aggregate massive
              data into hundreds of features, interpret them as actionable events, and let you build
              strategies, test them in real market conditions, and refine your edge{" "}
              <strong>without risking a single dollar.</strong>
            </p>

            <div className="hp2-hero-stats">
              <div className="hp2-hero-stat">
                <div className="hp2-hero-stat-n" style={{ color: "var(--hp2-gold2)" }}>50+</div>
                <div className="hp2-hero-stat-l">Data Sources</div>
              </div>
              <div className="hp2-hero-stat">
                <div className="hp2-hero-stat-n" style={{ color: "var(--hp2-blue2)" }}>100s</div>
                <div className="hp2-hero-stat-l">Features</div>
              </div>
              <div className="hp2-hero-stat">
                <div className="hp2-hero-stat-n" style={{ color: "var(--hp2-green2)" }}>8</div>
                <div className="hp2-hero-stat-l">Confluence Pillars</div>
              </div>
              <div className="hp2-hero-stat">
                <div className="hp2-hero-stat-n" style={{ color: "var(--hp2-cyan2)" }}>$0</div>
                <div className="hp2-hero-stat-l">Risk Required</div>
              </div>
            </div>
          </div>
        </div>

        <div className="hp2-scroll-hint">
          <span>Explore the stack</span>
          <div className="hp2-scroll-arrow" />
        </div>
      </section>

      <div className="hp2-divider" />

      {/* ============================================ */}
      {/*  LAYER 1 — DATA INGESTION (EdgeCore)          */}
      {/* ============================================ */}
      <section className="hp2-section hp2-c-gold" id="data">
        <div className="hp2-container">
          <div className="hp2-reveal">
            <div className="hp2-layer-tag">
              <span className="hp2-layer-num">1</span> Data Ingestion Layer
            </div>
            <h2 className="hp2-section-title">
              <span className="hp2-hl">EdgeCore</span> &mdash; The Pipeline
            </h2>
            <p className="hp2-section-sub">
              We connect to <strong>50+ data providers</strong>, normalize everything into a unified
              format, cache it intelligently, and serve it as a single source of truth. You never
              think about APIs. We handle the plumbing.
            </p>
          </div>

          <div className="hp2-api-wall hp2-reveal">
            {API_CHIPS.map((c) => (
              <span className="hp2-api-chip hp2-api-chip-live" key={c}>{c}</span>
            ))}
            <span className="hp2-api-chip">+ 30 more</span>
          </div>

          <FeatGrid feats={LAYER1_FEATS} />
        </div>
      </section>

      <div className="hp2-divider" />

      {/* ============================================ */}
      {/*  LAYER 2 — INTELLIGENCE (EventEdge)           */}
      {/* ============================================ */}
      <section className="hp2-section hp2-c-blue" id="intelligence">
        <div className="hp2-container">
          <div className="hp2-reveal">
            <div className="hp2-layer-tag">
              <span className="hp2-layer-num">2</span> Intelligence Layer
            </div>
            <h2 className="hp2-section-title">
              <span className="hp2-hl">EventEdge</span> &mdash; The Terminal
            </h2>
            <p className="hp2-section-sub">
              A Telegram bot that turns EdgeCore&apos;s raw pipeline into{" "}
              <strong>interpreted intelligence</strong>. Not a dashboard you stare at &mdash; signals
              that come to you, already scored, explained, and actionable.
            </p>
          </div>

          <div className="hp2-pillars hp2-reveal">
            {PILLARS.map((p) => (
              <div className="hp2-pillar" key={p.name}>
                <span className="hp2-pillar-emoji">{p.emoji}</span>
                <div className="hp2-pillar-name">{p.name}</div>
                <div className="hp2-pillar-sub">{p.sub}</div>
              </div>
            ))}
          </div>

          <FeatGrid feats={LAYER2_FEATS} />
        </div>
      </section>

      <div className="hp2-divider" />

      {/* ============================================ */}
      {/*  LAYER 3 — PREDICTION (EdgeMind + EdgeBank)   */}
      {/* ============================================ */}
      <section className="hp2-section hp2-c-purple" id="prediction">
        <div className="hp2-container">
          <div className="hp2-reveal">
            <div className="hp2-layer-tag">
              <span className="hp2-layer-num">3</span> Prediction Layer
            </div>
            <h2 className="hp2-section-title">
              <span className="hp2-hl">EdgeMind</span> + <span className="hp2-hl">EdgeBank</span>
            </h2>
            <p className="hp2-section-sub">
              The platform learns. EdgeBank tracks which features actually predict price moves.
              EdgeMind uses that knowledge to generate <strong>calibrated forecasts</strong> &mdash;
              where 70% confidence means it&apos;s right ~70% of the time.
            </p>
          </div>

          <div className="hp2-split hp2-reveal">
            <div>
              <div className="hp2-feat" style={{ marginBottom: 12 }}>
                <span className="hp2-feat-emoji">{"\u{1F9E0}"}</span>
                <div className="hp2-feat-name">EdgeMind &mdash; ML Predictions</div>
                <div className="hp2-feat-desc">
                  Trained on months of real confluence history. Multi-horizon directional forecasts
                  (4h, 24h, 7d) with probability scores. Not vibes &mdash; math.
                </div>
              </div>
              <div className="hp2-feat">
                <span className="hp2-feat-emoji">{"\u{1F4CA}"}</span>
                <div className="hp2-feat-name">EdgeBank &mdash; Feature Library</div>
                <div className="hp2-feat-desc">
                  Registry of 100s of tracked signals. Each feature scored for relevance per regime,
                  per asset. The system knows what works right now &mdash; not what worked last cycle.
                </div>
              </div>
            </div>

            {/* Mock feature-relevance widget */}
            <div className="hp2-split-visual">
              <div className="hp2-mock-widget">
                <div className="hp2-mw-head">
                  <span className="hp2-mw-dot" style={{ background: "var(--hp2-purple)" }} />
                  Feature Relevance &middot; Current Regime
                </div>
                {RELEVANCE_ROWS.map((r) => (
                  <div className="hp2-mw-row" key={r.label}>
                    <span className="hp2-mw-label">{r.label}</span>
                    <div className="hp2-mw-bar">
                      <div
                        className="hp2-mw-bar-fill"
                        style={{ width: `${r.pct}%`, background: r.grad }}
                      />
                    </div>
                    <span className="hp2-mw-pct" style={{ color: r.pctColor }}>{r.pct}%</span>
                  </div>
                ))}
                <div
                  style={{
                    marginTop: 14,
                    paddingTop: 10,
                    borderTop: "1px solid var(--hp2-border)",
                    fontSize: 10,
                    color: "var(--hp2-text4)",
                  }}
                >
                  Regime:{" "}
                  <span style={{ color: "var(--hp2-green2)" }}>Risk-On Expansion</span>{" "}
                  &middot; Updated: 2m ago
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="hp2-divider" />

      {/* ============================================ */}
      {/*  LAYER 4 — EXECUTION (SimLab + Alerts)        */}
      {/* ============================================ */}
      <section className="hp2-section hp2-c-green" id="execution">
        <div className="hp2-container">
          <div className="hp2-reveal">
            <div className="hp2-layer-tag">
              <span className="hp2-layer-num">4</span> Execution Layer
            </div>
            <h2 className="hp2-section-title">
              <span className="hp2-hl">SimLab</span> + <span className="hp2-hl">Alerts</span>
            </h2>
            <p className="hp2-section-sub">
              See a signal? Act on it. Paper trade across multiple venues, set intelligent alerts,
              and build a real track record &mdash; all before you put real money on the line.
            </p>
          </div>

          <FeatGrid feats={LAYER4_FEATS} />

          <div className="hp2-flow hp2-reveal">
            {FLOW_NODES.map((node, i) => (
              <span key={node.label}>
                {i > 0 && <span className="hp2-flow-arrow">{"\u2192"}</span>}
                <span
                  className="hp2-flow-node"
                  style={{ borderColor: node.border, color: node.color }}
                >
                  {node.label}
                </span>
              </span>
            ))}
          </div>
        </div>
      </section>

      <div className="hp2-divider" />

      {/* ============================================ */}
      {/*  LAYER 5 — CUSTOMIZATION                      */}
      {/* ============================================ */}
      <section className="hp2-section hp2-c-cyan" id="custom">
        <div className="hp2-container">
          <div className="hp2-reveal">
            <div className="hp2-layer-tag">
              <span className="hp2-layer-num">5</span> Customization Layer
            </div>
            <h2 className="hp2-section-title">
              Your <span className="hp2-hl">Own Terminal</span>
            </h2>
            <p className="hp2-section-sub">
              Build your personal trading dashboard. Pick your assets, choose your pillars, set your
              alerts, wire in EdgeMind predictions and EdgeBank features &mdash; then deploy it as{" "}
              <strong>your own Telegram bot</strong> for paper or real trading.
            </p>
          </div>

          <FeatGrid feats={LAYER5_FEATS} />
        </div>
      </section>

      <div className="hp2-divider" />

      {/* ============================================ */}
      {/*  LAYER 6 — AGENTIC                            */}
      {/* ============================================ */}
      <section className="hp2-section hp2-c-pink" id="agents">
        <div className="hp2-container">
          <div className="hp2-reveal">
            <div className="hp2-layer-tag">
              <span className="hp2-layer-num">6</span> Agentic Layer
            </div>
            <h2 className="hp2-section-title">
              Let <span className="hp2-hl">Agents</span> Work for You
            </h2>
            <p className="hp2-section-sub">
              Deploy AI agents that run your strategies 24/7. Rent proven agents from other traders.
              Monetize your own. The platform does the work &mdash; you define the rules.
            </p>
          </div>

          <FeatGrid feats={LAYER6_FEATS} />
        </div>
      </section>

      <div className="hp2-divider" />

      {/* ============================================ */}
      {/*  CTA                                          */}
      {/* ============================================ */}
      <section className="hp2-cta-section" id="beta">
        <div className="hp2-container">
          <h2>
            Ready to find your <span style={{ color: "var(--hp2-gold2)" }}>edge</span>?
          </h2>
          <p>We&apos;re looking for beta testers who actually trade. Limited spots.</p>
          <div className="hp2-cta-row">
            <a className="hp2-btn hp2-btn-primary" href="https://t.me/+b5WT3Sif_klhMGM0">
              {"\u26A1"} Join the Beta
            </a>
            <a className="hp2-btn hp2-btn-secondary" href="/eventedge">
              {"\u{1F4E1}"} Open EventEdge
            </a>
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/*  FOOTER                                       */}
      {/* ============================================ */}
      <footer className="hp2-footer">
        <div className="hp2-container">
          <div className="hp2-foot-logo">
            <span style={{ color: "var(--hp2-blue2)" }}>Edge</span>
            <span style={{ color: "var(--hp2-gold2)" }}>Blocks</span>
          </div>
          <div className="hp2-foot-sub">Find your edge. Test it. Prove it. Trade it.</div>
        </div>
      </footer>
    </main>
  );
}
