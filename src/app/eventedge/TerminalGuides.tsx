import { SectionHeading } from "@/components/ui";
import {
  GuideAccordion,
  SectionDivider,
  TelegramMock,
  Tip,
  MenuGrid,
  DetailCard,
  Li,
} from "@/components/guides";
import type { GuidePanel } from "@/components/guides";

/* ------------------------------------------------------------------ */
/*  Shared helper                                                      */
/* ------------------------------------------------------------------ */

function StatsRow({ items }: { items: { value: string; label: string }[] }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
      {items.map((item) => (
        <div
          key={item.label}
          className="rounded-xl border border-border/60 bg-surface/60 px-4 py-3 text-center backdrop-blur"
        >
          <div className="text-xl font-semibold font-mono text-fg">
            {item.value}
          </div>
          <div className="mt-1 text-[10px] font-mono text-muted2 uppercase tracking-wider">
            {item.label}
          </div>
        </div>
      ))}
    </div>
  );
}

/* ================================================================== */
/*  1. OVERVIEW GUIDE                                                  */
/* ================================================================== */

function OverviewContent() {
  return (
    <div className="space-y-6">
      <StatsRow
        items={[
          { value: "50+", label: "Data Sources" },
          { value: "10", label: "Modules" },
          { value: "4", label: "Paper Engines" },
          { value: "24/7", label: "Live Alerts" },
        ]}
      />

      {/* ── Home Screen ── */}
      <SectionDivider icon="🏠" title="Home Screen" />

      <MenuGrid
        columns={3}
        items={[
          { emoji: "🌐", label: "Macro Desk", desc: "Assets & prices" },
          { emoji: "🔬", label: "Pro Lab", desc: "Deep analysis" },
          { emoji: "📈", label: "TA Lab", desc: "Technicals" },
          { emoji: "🧪", label: "Sim Lab", desc: "Paper trading" },
          { emoji: "💼", label: "EdgeFolio", desc: "Portfolio" },
          { emoji: "🧠", label: "EdgeMind", desc: "ML signals" },
          { emoji: "🕵️", label: "Investigator", desc: "Forensics" },
          { emoji: "🤖", label: "AI Tools", desc: "Claude analysis" },
          { emoji: "🔔", label: "Alerts", desc: "Notifications" },
          { emoji: "⚙️", label: "Settings", desc: "Customize" },
        ]}
      />

      <Tip icon="💡" tone="warn">
        <strong className="text-amber-200">Start here:</strong> Type{" "}
        <code className="rounded bg-surface2 px-1.5 py-0.5 text-[11px] text-accentCyan">
          /start
        </code>{" "}
        to open this menu. Everything branches from Home — tap any module to
        explore, and every screen has a{" "}
        <strong className="text-amber-200">« Home</strong> button to get back.
      </Tip>

      {/* ── Quick Commands ── */}
      <SectionDivider icon="⌨️" title="Quick Commands" />

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {[
          { cmd: "/btc", desc: "BTC asset card" },
          { cmd: "/eth", desc: "ETH asset card" },
          { cmd: "/sol", desc: "SOL asset card" },
          { cmd: "/pro", desc: "Pro Lab menu" },
          { cmd: "/edgemind", desc: "ML intelligence" },
          { cmd: "/investigate", desc: "Blockchain forensics" },
          { cmd: "/folio", desc: "Portfolio tracker" },
          { cmd: "/alert", desc: "Set price alert" },
        ].map((c) => (
          <div
            key={c.cmd}
            className="flex items-center gap-2 rounded-lg bg-surface2/60 px-3 py-2"
          >
            <code className="text-[11px] font-mono text-accentCyan font-medium">
              {c.cmd}
            </code>
            <span className="text-[10px] text-muted2">{c.desc}</span>
          </div>
        ))}
      </div>

      {/* ── Full Module Map ── */}
      <SectionDivider icon="🗺️" title="What's Inside — Full Module Map" />

      <div className="grid gap-3 md:grid-cols-2">
        <DetailCard
          icon="🌐"
          title="Macro Desk"
          tag="Asset cards, prices & overview"
          accent="cyan"
        >
          <ul className="space-y-1">
            <Li accent="cyan">₿ BTC / ⟠ ETH / ◎ SOL / HYPE / BNB cards</Li>
            <Li accent="cyan">🎯 Master Confluence per asset (0-100)</Li>
            <Li accent="cyan">🌐 Market Radar — cross-asset overview</Li>
            <Li accent="cyan">📰 AI Digest — Claude-generated recap</Li>
            <Li accent="cyan">📰 News feed — real-time crypto headlines</Li>
          </ul>
        </DetailCard>

        <DetailCard
          icon="🔬"
          title="Pro Lab"
          tag="Advanced market intelligence"
          accent="violet"
        >
          <ul className="space-y-1">
            <Li accent="violet">
              📊 Derivs & Flow — Funding, OI, crowding, liqs, ETF, options, max
              pain, basis
            </Li>
            <Li accent="violet">
              🔗 On-Chain — DEX, stables, whales, bridges, L2, lending, smart
              wallets
            </Li>
            <Li accent="violet">
              🎰 Sentiment & PM — Polymarket, Kalshi, Fear/Greed
            </Li>
            <Li accent="violet">
              🧠 Intel Hub — All-in-one intelligence center
            </Li>
          </ul>
        </DetailCard>

        <DetailCard
          icon="📈"
          title="TA Lab"
          tag="Technical analysis suite"
          accent="amber"
        >
          <ul className="space-y-1">
            <Li accent="amber">
              🎯 Master / Macro / Expansion confluence cards
            </Li>
            <Li accent="amber">
              📊 Macro TA — trend stack, anchors, snapshot
            </Li>
            <Li accent="amber">
              🔧 Expansion — VWAP, gap watch, breakout, ADX
            </Li>
            <Li accent="amber">
              📡 Scanners — RSI, EMA squeeze, divergences, supertrend, TTM,
              Donchian, BOS, RVOL, Chandelier
            </Li>
          </ul>
        </DetailCard>

        <DetailCard
          icon="🧪"
          title="Simulation Lab"
          tag="Paper trade & practice — zero risk"
          accent="emerald"
        >
          <ul className="space-y-1">
            <Li accent="emerald">
              ⚡ Futures — multi-account, multi-venue (Binance, Bybit, OKX,
              Hyperliquid)
            </Li>
            <Li accent="emerald">📉 Options — Deribit paper with Greeks</Li>
            <Li accent="emerald">
              🔮 Predictions — Polymarket & Kalshi paper
            </Li>
            <Li accent="emerald">💼 Portfolio — forward-test rebalancing</Li>
            <Li accent="emerald">🧪 Experiment Lab — training arena</Li>
            <Li accent="emerald">
              🛡️ Risk Lab — position sizing & guardrails
            </Li>
            <Li accent="emerald">
              📓 Journal — entries, mood, tags, analytics
            </Li>
          </ul>
        </DetailCard>

        <DetailCard
          icon="🧠"
          title="EdgeMind"
          tag="ML-powered signal intelligence"
          accent="cyan"
        >
          <ul className="space-y-1">
            <Li accent="cyan">
              🧠 Summary — top 3 signals, confidence tier
            </Li>
            <Li accent="cyan">🎯 What to Trust — best signals now</Li>
            <Li accent="cyan">
              📍 Regime Now — trend/range + vol detection
            </Li>
            <Li accent="cyan">
              🏆 What&apos;s Working — best for THIS regime
            </Li>
            <Li accent="cyan">📊 Horizon Compare — 4h vs 12h vs 24h</Li>
            <Li accent="cyan">🔗 Compatibility — signal pair analysis</Li>
          </ul>
        </DetailCard>

        <DetailCard
          icon="💼"
          title="EdgeFolio"
          tag="Portfolio intelligence"
          accent="emerald"
        >
          <ul className="space-y-1">
            <Li accent="emerald">
              💰 Portfolio Snapshot — holdings, value, 24h change
            </Li>
            <Li accent="emerald">
              📈 PnL — unrealized gains/losses from entry
            </Li>
            <Li accent="emerald">
              🛡 Risk — concentration, exposure, corr analysis
            </Li>
            <Li accent="emerald">
              🎯 Portfolio Confluence — per-holding signals
            </Li>
            <Li accent="emerald">
              Multi-chain: ETH, SOL, BTC, BSC, Base
            </Li>
          </ul>
        </DetailCard>

        <DetailCard
          icon="🕵️"
          title="Investigator & AI Tools"
          tag="Forensics + Claude-powered analysis"
          accent="rose"
          wide
        >
          <ul className="space-y-1 sm:columns-2 sm:gap-x-6">
            <Li accent="rose">
              🕵️ Paste any tx hash or wallet address
            </Li>
            <Li accent="rose">
              Auto-detects chain, runs multi-engine analysis
            </Li>
            <Li accent="rose">
              Risk scoring, pattern detection, flow tracing
            </Li>
            <Li accent="rose">🤖 AI Analyst — ask any market question</Li>
            <Li accent="rose">📊 AI Summary — market overview via Claude</Li>
            <Li accent="rose">💡 AI Scan — trade idea generation</Li>
          </ul>
        </DetailCard>
      </div>

      <Tip icon="🧭" tone="info">
        <strong className="text-cyan-200">Navigation pattern:</strong> Home →
        Module → Sub-feature → Detail card. You can also jump directly with
        commands like{" "}
        <code className="rounded bg-surface2 px-1.5 py-0.5 text-[11px] text-accentCyan">
          /btc
        </code>
        ,{" "}
        <code className="rounded bg-surface2 px-1.5 py-0.5 text-[11px] text-accentCyan">
          /pro
        </code>
        , or{" "}
        <code className="rounded bg-surface2 px-1.5 py-0.5 text-[11px] text-accentCyan">
          /edgemind
        </code>{" "}
        from anywhere.
      </Tip>

      {/* ── 8 Confluence Pillars ── */}
      <SectionDivider icon="🎯" title="The 8 Confluence Pillars" />

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
        {[
          {
            emoji: "📈",
            name: "Derivatives",
            desc: "Funding, OI, L/S ratio",
            color: "border-l-blue-500",
          },
          {
            emoji: "🎯",
            name: "Options",
            desc: "P/C, DVOL, max pain",
            color: "border-l-violet-500",
          },
          {
            emoji: "🏛️",
            name: "ETF Flows",
            desc: "BTC/ETH institutional",
            color: "border-l-emerald-500",
          },
          {
            emoji: "🎰",
            name: "Prediction",
            desc: "Polymarket, Kalshi",
            color: "border-l-amber-500",
          },
          {
            emoji: "💥",
            name: "Liquidations",
            desc: "Cascade detection",
            color: "border-l-rose-500",
          },
          {
            emoji: "⛓️",
            name: "On-Chain",
            desc: "DEX, stables, whales",
            color: "border-l-cyan-500",
          },
          {
            emoji: "💬",
            name: "Sentiment",
            desc: "Fear/greed, social",
            color: "border-l-pink-500",
          },
          {
            emoji: "🌐",
            name: "Macro",
            desc: "DXY, yields, SPX",
            color: "border-l-slate-500",
          },
        ].map((p) => (
          <div
            key={p.name}
            className={`rounded-lg border-l-[3px] ${p.color} bg-surface/60 px-3 py-3 text-center`}
          >
            <span className="text-xl block mb-1">{p.emoji}</span>
            <div className="text-[11px] font-mono font-semibold text-fg">
              {p.name}
            </div>
            <div className="text-[10px] text-muted2 mt-0.5">{p.desc}</div>
          </div>
        ))}
      </div>

      <Tip icon="🧮" tone="info">
        <strong className="text-cyan-200">Confluence Score (0-100):</strong> All
        8 pillars fuse into one number. Each asset card shows the breakdown + a
        &quot;What Changed&quot; section so you always know{" "}
        <em>which pillar shifted</em> and why.
      </Tip>

      {/* ── Access Tiers ── */}
      <SectionDivider icon="🏆" title="Access Tiers" />

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
        {[
          {
            emoji: "🌱",
            name: "Explorer",
            color: "text-emerald-400",
            info: "Asset cards, Macro Desk, Radar, News, Alerts, EdgeFolio, Investigator",
          },
          {
            emoji: "🔬",
            name: "Tester",
            color: "text-blue-400",
            info: "Pro Lab, Intel Hub, TA Lab, Sim Lab, EdgeMind, AI Tools",
          },
          {
            emoji: "⚡",
            name: "Power",
            color: "text-violet-400",
            info: "Options paper, Risk Lab, EdgeMind features, modules, compatibility",
          },
          {
            emoji: "👑",
            name: "Admin",
            color: "text-amber-400",
            info: "Full access, EdgeMind Health, system diagnostics, all features",
          },
        ].map((t) => (
          <div
            key={t.name}
            className="rounded-lg border border-border/50 bg-surface2/50 px-3 py-3.5 text-center"
          >
            <span className="text-xl block mb-1">{t.emoji}</span>
            <div className={`text-[11px] font-mono font-semibold ${t.color}`}>
              {t.name}
            </div>
            <div className="text-[10px] text-muted2 mt-1 leading-snug">
              {t.info}
            </div>
          </div>
        ))}
      </div>

      {/* ── Getting Started ── */}
      <SectionDivider icon="🚀" title="Getting Started — 3 Steps" />

      <div className="grid gap-3 sm:grid-cols-3">
        <div className="rounded-xl border border-cyan-500/20 bg-surface/60 p-4 text-center">
          <div className="text-2xl mb-2">1️⃣</div>
          <div className="text-xs font-semibold font-mono text-fg mb-2">
            Open an Asset Card
          </div>
          <div className="text-[11px] text-muted2 leading-relaxed">
            Type{" "}
            <code className="rounded bg-surface2 px-1.5 py-0.5 text-[10px] text-accentCyan">
              /btc
            </code>{" "}
            — see price, confluence score, signal breakdown, and &quot;What
            Changed&quot; in one view.
          </div>
        </div>
        <div className="rounded-xl border border-violet-500/20 bg-surface/60 p-4 text-center">
          <div className="text-2xl mb-2">2️⃣</div>
          <div className="text-xs font-semibold font-mono text-fg mb-2">
            Explore Pro Lab
          </div>
          <div className="text-[11px] text-muted2 leading-relaxed">
            Type{" "}
            <code className="rounded bg-surface2 px-1.5 py-0.5 text-[10px] text-accentCyan">
              /pro
            </code>{" "}
            — dive into derivatives, on-chain data, Intel Hub, and TA scanners.
          </div>
        </div>
        <div className="rounded-xl border border-emerald-500/20 bg-surface/60 p-4 text-center">
          <div className="text-2xl mb-2">3️⃣</div>
          <div className="text-xs font-semibold font-mono text-fg mb-2">
            Paper Trade or Track
          </div>
          <div className="text-[11px] text-muted2 leading-relaxed">
            Open{" "}
            <strong className="text-emerald-300">Sim Lab</strong> to practice
            with zero risk, or{" "}
            <strong className="text-emerald-300">EdgeFolio</strong> to track
            your real wallets.
          </div>
        </div>
      </div>
    </div>
  );
}

/* ================================================================== */
/*  2. ALERTS & SETTINGS GUIDE                                         */
/* ================================================================== */

function AlertsContent() {
  return (
    <div className="space-y-6">
      <StatsRow
        items={[
          { value: "6", label: "Alert Systems" },
          { value: "18+", label: "TA Scanners" },
          { value: "6", label: "Templates" },
          { value: "80+", label: "Menu Toggles" },
        ]}
      />

      {/* ── Alerts Hub ── */}
      <SectionDivider icon="🔔" title="Alerts Hub — Central Control" />

      <MenuGrid
        columns={3}
        items={[
          { emoji: "📊", label: "TA Lab", desc: "Scanner patterns" },
          { emoji: "🧠", label: "Fusion", desc: "Multi-scanner" },
          { emoji: "🌐", label: "Intel Hub", desc: "News, whales, DEX" },
          { emoji: "👛", label: "Smart Wallet", desc: "Wallet activity" },
          { emoji: "⚡", label: "Super Card", desc: "Posture + perms" },
          { emoji: "📈", label: "Market", desc: "Legacy signals" },
        ]}
      />

      <TelegramMock>
        <span className="font-semibold text-fg">🔔 ALERTS HUB</span>
        {"\n"}━━━━━━━━━━━━━━━━━━━━━━━━━━━{"\n"}Manage all your alert
        subscriptions{"\n\n"}━━━ Alert Systems ━━━{"\n"}📊{" "}
        <span className="font-semibold text-fg">TA Lab Alerts</span>:{" "}
        <span className="text-emerald-300">🟢 ON</span>
        {"\n"}   Scanner pattern alerts{"\n\n"}🧠{" "}
        <span className="font-semibold text-fg">Fusion Alerts</span>:{" "}
        <span className="text-emerald-300">🟢 ON</span>
        {"\n"}   Multi-scanner confluence{"\n\n"}🌐{" "}
        <span className="font-semibold text-fg">Intel Hub Alerts</span>:{" "}
        <span className="text-rose-300">🔴 OFF</span>
        {"\n"}   News, sentiment, whales{"\n\n"}👛{" "}
        <span className="font-semibold text-fg">Smart Wallet Alerts</span>:{" "}
        <span className="text-emerald-300">🟢 ON</span>
        {"\n"}   CEX deposits, new entries{"\n\n"}⚡{" "}
        <span className="font-semibold text-fg">Super Card Alerts</span>:{" "}
        <span className="text-emerald-300">🟢 ON</span>
        {"\n"}   Posture & permission changes{"\n\n"}📈{" "}
        <span className="font-semibold text-fg">Market Alerts</span>:{" "}
        <span className="text-emerald-300">🟢 3</span>
        {"\n"}   Asset signal alerts
      </TelegramMock>

      {/* ── TA Scanner Alerts ── */}
      <SectionDivider icon="📊" title="1 · TA Scanner Alerts — Per-Scanner Configuration" />

      <DetailCard
        icon="📊"
        title="18 Configurable Scanners"
        tag="Each scanner has independent ON/OFF + per-scanner timeframe selection"
        accent="rose"
        wide
      >
        <ul className="space-y-1 sm:columns-2 sm:gap-x-6">
          <Li accent="rose">📈 RSI Divergences (4H/1D)</Li>
          <Li accent="rose">🧨 Extreme Divs @ RSI 30/70</Li>
          <Li accent="rose">🔄 Supertrend flips (4H)</Li>
          <Li accent="rose">🎯 Trend Confluence (4H/1D)</Li>
          <Li accent="rose">✖️ MACD crosses (4H)</Li>
          <Li accent="rose">⚡ RSI Extremes (4H)</Li>
          <Li accent="rose">🔥 EMA Squeeze (4H)</Li>
          <Li accent="rose">📊 EMA Stack (4H/1D)</Li>
          <Li accent="rose">💪 ADX Regime (4H)</Li>
          <Li accent="rose">🧱 EMA200 Flip (4H/1D)</Li>
          <Li accent="rose">🧨 TTM Squeeze (4H/1D)</Li>
          <Li accent="rose">📦 Donchian breakout (1D)</Li>
          <Li accent="rose">🧱 BOS (4H)</Li>
          <Li accent="rose">📣 RVOL breakout (4H)</Li>
          <Li accent="rose">🪝 Chandelier Exit (4H/1D)</Li>
          <Li accent="rose">💸 Funding extremes (4H)</Li>
          <Li accent="rose">🧲 OI Flow (4H)</Li>
          <Li accent="rose">
            ⚖️ Basis / 🥊 L/S / 🧾 VWAP / 🪤 Sweeps
          </Li>
        </ul>
      </DetailCard>

      <div className="grid gap-3 md:grid-cols-2">
        <DetailCard
          icon="📋"
          title="6 Alert Templates"
          tag="One-tap preset configurations"
          accent="amber"
        >
          <ul className="space-y-1.5">
            <Li accent="amber">
              <strong className="text-fg text-[11px]">🌊 Swing Trader</strong>{" "}
              — 4H/1D: Trend Conf, EMA200, Supertrend, Donchian, EMA Stack
            </Li>
            <Li accent="amber">
              <strong className="text-fg text-[11px]">⚡ Scalper</strong> —
              1H/4H: RSI Extremes, EMA Squeeze, TTM, MACD, RVOL
            </Li>
            <Li accent="amber">
              <strong className="text-fg text-[11px]">
                📉 Mean Reverter
              </strong>{" "}
              — Fade extremes: RSI Div, RSI Extremes, Funding, Basis, Sweeps
            </Li>
            <Li accent="amber">
              <strong className="text-fg text-[11px]">🚀 Momentum</strong> —
              Catch breakouts: Supertrend, BOS, Donchian, ADX, Chandelier
            </Li>
            <Li accent="amber">
              <strong className="text-fg text-[11px]">💰 Derivatives</strong>{" "}
              — Positioning: Funding, OI Flow, Basis, L/S Ratio, Sweeps
            </Li>
            <Li accent="amber">
              <strong className="text-fg text-[11px]">🔥 All Signals</strong>{" "}
              — Everything on 4H (high alert volume)
            </Li>
          </ul>
        </DetailCard>

        <DetailCard
          icon="⚙️"
          title="Alert Controls"
          tag="Fine-tune alert behavior"
          accent="amber"
        >
          <ul className="space-y-1.5">
            <Li accent="amber">
              <strong className="text-fg text-[11px]">🔕 Cooldowns</strong> —
              Control alert frequency (normal / quiet / aggressive)
            </Li>
            <Li accent="amber">
              <strong className="text-fg text-[11px]">Per-scanner TF</strong> —
              Each scanner picks its own timeframes (15m/1h/4h/1d)
            </Li>
            <Li accent="amber">
              <strong className="text-fg text-[11px]">Universe</strong> —
              Binance USDT-M, Vol ≥ $5M filter
            </Li>
            <Li accent="amber">
              <strong className="text-fg text-[11px]">Master toggle</strong> —
              🟢 Enable / 🔴 Disable all with one tap
            </Li>
          </ul>
        </DetailCard>
      </div>

      {/* ── Fusion Alerts ── */}
      <SectionDivider icon="🧠" title="2 · Fusion Alerts — Multi-Scanner Confluence" />

      <DetailCard
        icon="🧠"
        title="Consolidate Scanner Noise Into Movement Signals"
        tag="Only fires when N+ scanners agree within a time window"
        accent="violet"
        wide
      >
        <ul className="space-y-1.5 sm:columns-2 sm:gap-x-6">
          <Li accent="violet">
            <strong className="text-fg text-[11px]">Min Scanners</strong> —
            Threshold: 3+ unique scanners must fire (adjustable)
          </Li>
          <Li accent="violet">
            <strong className="text-fg text-[11px]">Window</strong> — 30-minute
            aggregation period (adjustable)
          </Li>
          <Li accent="violet">
            <strong className="text-fg text-[11px]">Cooldown</strong> —
            60-minute cooldown between fusions (adjustable)
          </Li>
          <Li accent="violet">
            <strong className="text-fg text-[11px]">Direction Filter</strong> —
            ↔️ Both / 🟢 Bullish only / 🔴 Bearish only
          </Li>
          <Li accent="violet">
            <strong className="text-fg text-[11px]">Mode</strong> — Complement
            (fusion + raw) or Replace (fusion only = quieter)
          </Li>
          <Li accent="violet">
            <strong className="text-fg text-[11px]">Multi-TF Only</strong> —
            Only fire when multiple timeframes agree
          </Li>
          <Li accent="violet">
            <strong className="text-fg text-[11px]">Trend Required</strong> —
            Must include trend scanner in fusion
          </Li>
          <Li accent="violet">
            <strong className="text-fg text-[11px]">📡 View Radar</strong> —
            See current fusion state live
          </Li>
        </ul>
      </DetailCard>

      {/* ── Intel Hub Alerts ── */}
      <SectionDivider icon="🌐" title="3 · Intel Hub Alerts — 12 Categories, 24 Alert Types" />

      <div className="grid gap-3 md:grid-cols-2">
        <DetailCard
          icon="📰"
          title="News & Sentiment"
          tag="4 alert types"
          accent="cyan"
        >
          <ul className="space-y-1">
            <Li accent="cyan">📰 High-impact news & news clusters</Li>
            <Li accent="cyan">
              🧭 Sentiment shift & sentiment conflict
            </Li>
          </ul>
        </DetailCard>

        <DetailCard
          icon="⛽"
          title="On-Chain Activity"
          tag="6 alert types"
          accent="cyan"
        >
          <ul className="space-y-1">
            <Li accent="cyan">⛽ Gas spike / gas calm</Li>
            <Li accent="cyan">
              💧 Liquidity regime shift / stablecoin spike
            </Li>
            <Li accent="cyan">🐋 Whale inflow & outflow spikes</Li>
          </ul>
        </DetailCard>

        <DetailCard
          icon="🚀"
          title="Launch & DEX"
          tag="6 alert types"
          accent="cyan"
        >
          <ul className="space-y-1">
            <Li accent="cyan">🚀 Launch high-liq / high-risk</Li>
            <Li accent="cyan">🎰 Pumpfun graduating / migrated</Li>
            <Li accent="cyan">🦎 DEX trending qualified / new pool</Li>
          </ul>
        </DetailCard>

        <DetailCard
          icon="📊"
          title="TA, Confluence & Movers"
          tag="8 alert types"
          accent="cyan"
        >
          <ul className="space-y-1">
            <Li accent="cyan">📊 TA squeeze on / trend flip</Li>
            <Li accent="cyan">
              ⚡ Super TA: tier change, consensus, divergence
            </Li>
            <Li accent="cyan">🧠 Intel posture shift</Li>
            <Li accent="cyan">📈 Significant mover / mover reversal</Li>
          </ul>
        </DetailCard>
      </div>

      <Tip icon="🎚" tone="info">
        <strong className="text-cyan-200">Intel controls:</strong> Filter by
        watched assets (default: BTC, ETH, SOL), minimum severity
        (LOW/MED/HIGH), cooldown multiplier (0.5× = more alerts, 2× = fewer),
        and quiet hours with timezone support.
      </Tip>

      {/* ── Smart Wallet Alerts ── */}
      <SectionDivider icon="👛" title="4 · Smart Wallet Alerts — 9 Alert Types" />

      <DetailCard
        icon="👛"
        title="Real-Time Wallet Activity Monitoring"
        tag="Each type has independent toggle + adjustable USD/count threshold"
        accent="emerald"
        wide
      >
        <ul className="space-y-1.5 sm:columns-2 sm:gap-x-6">
          <Li accent="emerald">
            <strong className="text-fg text-[11px]">💰 Large Transfer</strong>{" "}
            — Wallet sends $50k+ out (threshold adjustable)
          </Li>
          <Li accent="emerald">
            <strong className="text-fg text-[11px]">🟢 Big Buy</strong> — Smart
            wallet buys $25k+ of a token
          </Li>
          <Li accent="emerald">
            <strong className="text-fg text-[11px]">🆕 New Token Entry</strong>{" "}
            — First-time token purchase ($5k+ min)
          </Li>
          <Li accent="emerald">
            <strong className="text-fg text-[11px]">🔴 CEX Deposit</strong> —
            Transfer to exchange ($10k+ = bearish signal)
          </Li>
          <Li accent="emerald">
            <strong className="text-fg text-[11px]">🟢 CEX Withdrawal</strong>{" "}
            — Withdrawal from exchange ($10k+ = bullish)
          </Li>
          <Li accent="emerald">
            <strong className="text-fg text-[11px]">
              🔥 Consensus Spike
            </strong>{" "}
            — 3+ wallets buy same token
          </Li>
          <Li accent="emerald">
            <strong className="text-fg text-[11px]">🩸 Consensus Sell</strong>{" "}
            — 3+ wallets sell same token
          </Li>
          <Li accent="emerald">
            <strong className="text-fg text-[11px]">
              ⭐ Wallet Promoted
            </strong>{" "}
            — Candidate promoted to verified
          </Li>
          <Li accent="emerald">
            <strong className="text-fg text-[11px]">📊 Z-Score Spike</strong>{" "}
            — CEX flow z-score exceeds threshold (z &gt; 2)
          </Li>
        </ul>
      </DetailCard>

      {/* ── Super Card Alerts ── */}
      <SectionDivider icon="⚡" title="5 · Super Card Alerts — 8 Alert Types" />

      <DetailCard
        icon="⚡"
        title="Market Posture & Regime Shift Notifications"
        tag="Fires when the Super Card's global state changes — high-signal, low-noise"
        accent="amber"
        wide
      >
        <ul className="space-y-1.5 sm:columns-2 sm:gap-x-6">
          <Li accent="amber">
            <strong className="text-fg text-[11px]">🔄 Posture Flip</strong> —
            Global posture changes (e.g. risk-on → risk-off). CD: 60m
          </Li>
          <Li accent="amber">
            <strong className="text-fg text-[11px]">🚨 Stress Mode</strong> —
            Market enters stress (stand down / scalp only). CD: 30m
          </Li>
          <Li accent="amber">
            <strong className="text-fg text-[11px]">
              📊 Alt Budget Change
            </strong>{" "}
            — Alt allocation shifts ≥15%. CD: 6h
          </Li>
          <Li accent="amber">
            <strong className="text-fg text-[11px]">
              ⚠️ Execution Warning
            </strong>{" "}
            — Thin liquidity / off-hours / holiday. CD: 6h
          </Li>
          <Li accent="amber">
            <strong className="text-fg text-[11px]">
              📅 Event Risk Spike
            </strong>{" "}
            — Risk level increases (LOW→MED→HIGH). CD: 12h
          </Li>
          <Li accent="amber">
            <strong className="text-fg text-[11px]">
              🔓 Permission Change
            </strong>{" "}
            — Asset trade permission flips (OK↔BLOCKED). CD: 2h
          </Li>
          <Li accent="amber">
            <strong className="text-fg text-[11px]">
              ⭐ Top Setup Alert
            </strong>{" "}
            — High-conviction setup enters watchlist. CD: 2h
          </Li>
          <Li accent="amber">
            <strong className="text-fg text-[11px]">
              🎯 Key Level Proximity
            </strong>{" "}
            — Price near important support/resistance. CD: 30m
          </Li>
        </ul>
      </DetailCard>

      <Tip icon="👁️" tone="warn">
        <strong className="text-amber-200">Watched assets:</strong> Permission
        Change and Top Setup alerts only fire for your watched assets (default:
        BTC, ETH, SOL). The Super Card compares current vs previous state on
        each scheduler cycle — only genuine{" "}
        <strong className="text-amber-200">changes</strong> trigger alerts.
      </Tip>

      {/* ── Settings ── */}
      <SectionDivider icon="⚙️" title="Terminal Settings — Menu Layout System" />

      <TelegramMock>
        <span className="font-semibold text-fg">🧱 MENU LAYOUT</span>
        {"\n"}━━━━━━━━━━━━━━━━━━━━━{"\n"}Toggle sections ON/OFF to build your
        dashboard.{"\n"}Disabled items are hidden from menus.{"\n\n"}
        {"  "}
        <span className="font-semibold text-fg">Main Desks</span>: 9/9 enabled
        {"\n"}
        {"  "}
        <span className="font-semibold text-fg">Macro Desk Items</span>: 3/3
        enabled{"\n"}
        {"  "}
        <span className="font-semibold text-fg">Alert Channels</span>: 5/6
        enabled{"\n"}
        {"  "}
        <span className="font-semibold text-fg">
          Pro Lab — Derivs, Onchain & Intel
        </span>
        : 38/42 enabled{"\n"}
        {"  "}
        <span className="font-semibold text-fg">TA Lab</span>: 6/6 enabled
      </TelegramMock>

      <DetailCard
        icon="🧱"
        title="How Menu Layout Works"
        tag="Per-button toggle system with tier-aware defaults"
        accent="cyan"
        wide
      >
        <ul className="space-y-1.5 sm:columns-2 sm:gap-x-6">
          <Li accent="cyan">
            <strong className="text-fg text-[11px]">80+ toggleable items</strong>{" "}
            — Every button in every menu has a unique registry ID
          </Li>
          <Li accent="cyan">
            <strong className="text-fg text-[11px]">Tier-aware defaults</strong>{" "}
            — Each item has default ON/OFF per tier. Explorers see fewer items
          </Li>
          <Li accent="cyan">
            <strong className="text-fg text-[11px]">Persistent storage</strong>{" "}
            — Preferences saved to DB, cached 5 minutes in memory
          </Li>
          <Li accent="cyan">
            <strong className="text-fg text-[11px]">✅ All ON / 🚫 All OFF</strong>{" "}
            — Bulk enable or disable every item at once
          </Li>
          <Li accent="cyan">
            <strong className="text-fg text-[11px]">🔄 Reset Defaults</strong>{" "}
            — Wipe back to tier-appropriate defaults
          </Li>
          <Li accent="cyan">
            <strong className="text-fg text-[11px]">Requires ⚡ Power</strong>{" "}
            — Explorers and Testers use default layouts
          </Li>
        </ul>
      </DetailCard>

      {/* ── Bottom tips ── */}
      <Tip icon="💡" tone="success">
        <strong className="text-emerald-200">Quick start:</strong> Go to 🔔{" "}
        <strong className="text-emerald-200">Alerts Hub</strong> → 📊{" "}
        <strong className="text-emerald-200">TA Lab</strong> → tap{" "}
        <strong className="text-emerald-200">📋 Templates</strong> → choose a
        preset like{" "}
        <strong className="text-emerald-200">🌊 Swing Trader</strong>. All
        scanners + timeframes are configured in one tap. Then enable{" "}
        <strong className="text-emerald-200">🧠 Fusion</strong> to consolidate
        noise.
      </Tip>

      <Tip icon="🧱" tone="purple">
        <strong className="text-violet-200">Declutter your terminal:</strong> Go
        to ⚙️ <strong className="text-violet-200">Settings</strong> → 🧱{" "}
        <strong className="text-violet-200">Menu Layout</strong> → drill into
        any group → toggle OFF tools you don&apos;t use. Buttons will disappear
        from menus. Use <strong className="text-violet-200">🔄 Reset</strong>{" "}
        anytime to restore defaults.
      </Tip>

      <Tip icon="⚡" tone="danger">
        <strong className="text-rose-200">Alert priority:</strong>{" "}
        <strong className="text-rose-200">Super Card alerts</strong> are the
        highest-signal (posture flips, stress mode).{" "}
        <strong className="text-rose-200">Fusion</strong> filters TA noise into
        confluence.{" "}
        <strong className="text-rose-200">Smart Wallet</strong> catches on-chain
        alpha. Use the noise hierarchy: Super Card → Fusion → TA Scanners.
      </Tip>
    </div>
  );
}

/* ================================================================== */
/*  3. SIMULATION LAB GUIDE                                            */
/* ================================================================== */

function SimLabContent() {
  return (
    <div className="space-y-6">
      <StatsRow
        items={[
          { value: "4", label: "Simulators" },
          { value: "6", label: "XLab Modes" },
          { value: "3", label: "Tools" },
        ]}
      />

      {/* ── Main Menu ── */}
      <SectionDivider icon="🎮" title="Simulation Lab Main Menu" />

      <MenuGrid
        columns={3}
        items={[
          { emoji: "⚡", label: "Futures", desc: "Multi-account perps" },
          { emoji: "📉", label: "Options", desc: "Deribit sim" },
          { emoji: "🔮", label: "Predictions", desc: "PM3 paper" },
          { emoji: "💼", label: "Portfolio", desc: "Spot allocations" },
          { emoji: "🧪", label: "Experiment", desc: "Training arena" },
          { emoji: "🛡️", label: "Risk Lab", desc: "Position sizing" },
          { emoji: "📓", label: "Journal", desc: "Log & review" },
        ]}
      />

      <Tip icon="🔒" tone="warn">
        <strong className="text-amber-200">Access tiers:</strong> Futures,
        Predictions, Portfolio, and Experiment Lab require{" "}
        <strong className="text-amber-200">🔬 Tester</strong>. Options and Risk
        Lab require <strong className="text-amber-200">⚡ Power</strong>.
        Journal is open to all including{" "}
        <strong className="text-amber-200">🌱 Explorers</strong>.
      </Tip>

      {/* ── Futures ── */}
      <SectionDivider icon="⚡" title="1 · Futures Strategy Tester V3.0" />

      <TelegramMock>
        <span className="font-semibold text-fg">
          🧪 STRATEGY TESTER V3.0
        </span>
        {"\n"}━━━━━━━━━━━━━━━━━━━━━{"\n"}📁 Alpha Momentum —{" "}
        <span className="text-emerald-300">🟢 RUNNING</span>
        {"\n"}🟡 Binance Futures (perp){"\n\n"}💰 Cash: $9,847.32{"\n"}📊
        Equity: $10,214.50 (Start: $10,000){"\n"}📈 PnL:{" "}
        <span className="text-emerald-300">+214.50 (+2.1%)</span>
        {"\n"}📍 Positions: 2/3{"\n\n"}📉 Trades: 18 | Win: 61%{"\n"}⚖️ Avg R:{" "}
        <span className="text-emerald-300">+0.84</span> | PF: 2.13{"\n\n"}⚡
        Strategies: RSI Reversal, TTM | 🎯2 | 🔧1
      </TelegramMock>

      <div className="grid gap-3 md:grid-cols-2">
        <DetailCard
          icon="📁"
          title="Multi-Account System"
          tag="Up to 5 independent test accounts"
          accent="amber"
        >
          <ul className="space-y-1">
            <Li accent="amber">
              Each account has its own balance, strategies, and settings
            </Li>
            <Li accent="amber">
              Account selector: ► active, 🟢 running, ⚪ paused
            </Li>
            <Li accent="amber">
              Independent equity tracking with 15-min snapshots
            </Li>
            <Li accent="amber">
              Multi-venue: Binance, Bybit, Hyperliquid, Kraken
            </Li>
          </ul>
        </DetailCard>

        <DetailCard
          icon="⚡"
          title="Strategy Engine"
          tag="3 strategy types per account"
          accent="amber"
        >
          <ul className="space-y-1.5">
            <Li accent="amber">
              <strong className="text-fg text-[11px]">
                ⚡ Preset Strategies
              </strong>{" "}
              — 8+ built-in (RSI Reversal, TTM Squeeze, EMA Cross, Supertrend…)
            </Li>
            <Li accent="amber">
              <strong className="text-fg text-[11px]">🎯 Hardcode</strong> —
              Manual entries: set asset, direction, entry, stop, TP
            </Li>
            <Li accent="amber">
              <strong className="text-fg text-[11px]">🔧 Custom</strong> —
              Build your own strategy from indicator combos
            </Li>
            <Li accent="amber">
              Multiple TP levels, trailing stops, 1% risk-based sizing default
            </Li>
          </ul>
        </DetailCard>

        <DetailCard
          icon="📊"
          title="Analytics & Performance"
          tag="Comprehensive trade tracking"
          accent="rose"
        >
          <ul className="space-y-1.5">
            <Li accent="rose">
              <strong className="text-fg text-[11px]">📈 Positions</strong> —
              Open positions with live PnL, unrealized R
            </Li>
            <Li accent="rose">
              <strong className="text-fg text-[11px]">🧾 History</strong> —
              Complete trade log with R-multiples
            </Li>
            <Li accent="rose">
              <strong className="text-fg text-[11px]">📉 Stats</strong> — Win
              rate, profit factor, avg R, expectancy
            </Li>
            <Li accent="rose">
              <strong className="text-fg text-[11px]">📊 Analytics</strong> —
              Equity curve, drawdown, sparkline charts
            </Li>
            <Li accent="rose">
              <strong className="text-fg text-[11px]">🏆 Leaderboard</strong>{" "}
              — Compare performance across users
            </Li>
          </ul>
        </DetailCard>

        <DetailCard
          icon="⚙️"
          title="Account Controls"
          tag="Full configuration per account"
          accent="rose"
        >
          <ul className="space-y-1.5">
            <Li accent="rose">
              <strong className="text-fg text-[11px]">▶️/⏸</strong> —
              Start/pause auto-engine per account
            </Li>
            <Li accent="rose">
              <strong className="text-fg text-[11px]">⚙️ Settings</strong> —
              Max positions, leverage, risk %, venue selection
            </Li>
            <Li accent="rose">
              <strong className="text-fg text-[11px]">🛡️ Risk</strong> — Risk
              rules tied to this account
            </Li>
            <Li accent="rose">
              <strong className="text-fg text-[11px]">🧭 Intel</strong> —
              Signal intelligence feeding the engine
            </Li>
            <Li accent="rose">
              <strong className="text-fg text-[11px]">🔄 Reset</strong> — Wipe
              account back to starting balance
            </Li>
          </ul>
        </DetailCard>
      </div>

      {/* ── Options ── */}
      <SectionDivider icon="📉" title="2 · Options Paper Trader" />

      <DetailCard
        icon="📉"
        title="Deribit Options Simulator"
        tag="Paper trade BTC & ETH options with real chain data"
        accent="violet"
        wide
      >
        <ul className="space-y-1.5 sm:columns-2 sm:gap-x-6">
          <Li accent="violet">
            <strong className="text-fg text-[11px]">
              ₿ BTC Chain / Ξ ETH Chain
            </strong>{" "}
            — Browse real Deribit options chain by expiry, select strikes, buy/sell calls & puts
          </Li>
          <Li accent="violet">
            <strong className="text-fg text-[11px]">📈 Positions</strong> —
            Open options with live Greeks (delta, gamma, theta, vega) and mark-to-market PnL
          </Li>
          <Li accent="violet">
            <strong className="text-fg text-[11px]">🎯 What-If</strong> —
            Scenario analysis: &quot;What happens if BTC moves ±10%?&quot;
          </Li>
          <Li accent="violet">
            <strong className="text-fg text-[11px]">📊 Analytics</strong> —
            Premium captured, Greeks exposure, theta decay P&L
          </Li>
          <Li accent="violet">
            Requires ⚡ Power tier — full Deribit data pipeline
          </Li>
        </ul>
      </DetailCard>

      {/* ── Predictions ── */}
      <SectionDivider icon="🔮" title="3 · Predictions Paper Trader" />

      <DetailCard
        icon="🔮"
        title="PM3 Paper Trading"
        tag="Paper trade Polymarket & Kalshi prediction markets"
        accent="cyan"
        wide
      >
        <ul className="space-y-1 sm:columns-2 sm:gap-x-6">
          <Li accent="cyan">
            Access from PM 3.0 Terminal → 🧪 Paper button
          </Li>
          <Li accent="cyan">
            Buy/sell shares on any indexed prediction market
          </Li>
          <Li accent="cyan">
            Track positions with live odds updates from both venues
          </Li>
          <Li accent="cyan">
            Portfolio PnL: cash balance + position mark-to-market
          </Li>
          <Li accent="cyan">
            Resolution: markets auto-settle when resolved
          </Li>
          <Li accent="cyan">
            Separate $10,000 starting balance from futures accounts
          </Li>
        </ul>
      </DetailCard>

      {/* ── Portfolio ── */}
      <SectionDivider icon="💼" title="4 · Portfolio Sim" />

      <div className="grid gap-3 md:grid-cols-2">
        <DetailCard
          icon="🏗"
          title="Build & Import"
          tag="Two ways to start"
          accent="emerald"
        >
          <ul className="space-y-1.5">
            <Li accent="emerald">
              <strong className="text-fg text-[11px]">
                📥 Import EdgeFolio
              </strong>{" "}
              — Pull your real portfolio allocations into the sim
            </Li>
            <Li accent="emerald">
              <strong className="text-fg text-[11px]">🏗 Build New</strong> —
              Start fresh, pick assets and weights manually
            </Li>
            <Li accent="emerald">
              Forward simulation mode: tracks from today with live prices
            </Li>
          </ul>
        </DetailCard>

        <DetailCard
          icon="📊"
          title="Portfolio Tools"
          tag="Monitor & manage"
          accent="emerald"
        >
          <ul className="space-y-1.5">
            <Li accent="emerald">
              <strong className="text-fg text-[11px]">📊 Holdings</strong> —
              Each asset with qty, value, weight %, PnL
            </Li>
            <Li accent="emerald">
              <strong className="text-fg text-[11px]">🧠 Rules</strong> —
              Allocation rules (max position %, rebalance thresholds)
            </Li>
            <Li accent="emerald">
              <strong className="text-fg text-[11px]">📈 What-If</strong> —
              Scenario: &quot;What if BTC 2x and ETH −30%?&quot;
            </Li>
            <Li accent="emerald">
              <strong className="text-fg text-[11px]">⚖️ Rebalance</strong> —
              Auto-rebalance to target weights
            </Li>
            <Li accent="emerald">
              <strong className="text-fg text-[11px]">
                📊 Analytics / 📜 History
              </strong>{" "}
              — Performance + transaction log
            </Li>
          </ul>
        </DetailCard>
      </div>

      {/* ── Experiment Lab ── */}
      <SectionDivider icon="🧪" title="5 · Experiment Lab — Training Arena" />

      <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 mb-4">
        {[
          { emoji: "🧭", name: "Regime" },
          { emoji: "🎯", name: "Execution" },
          { emoji: "🛡", name: "Risk" },
          { emoji: "🧱", name: "Builder" },
          { emoji: "🧨", name: "Stress" },
          { emoji: "🪞", name: "Mirror" },
        ].map((m) => (
          <div
            key={m.name}
            className="rounded-lg border border-amber-500/20 bg-amber-500/5 px-2 py-2 text-center"
          >
            <span className="text-base block">{m.emoji}</span>
            <span className="text-[10px] font-mono font-medium text-amber-200">
              {m.name}
            </span>
          </div>
        ))}
      </div>

      <div className="grid gap-3 md:grid-cols-2">
        <DetailCard
          icon="🧭"
          title="Regime Training"
          tag="Read market conditions correctly"
          accent="amber"
        >
          <ul className="space-y-1">
            <Li accent="amber">
              Practice classifying: trending, ranging, breakout, breakdown
            </Li>
            <Li accent="amber">
              Timed sessions with scoring — build regime-reading skill
            </Li>
          </ul>
        </DetailCard>

        <DetailCard
          icon="🎯"
          title="Execution Training"
          tag="Practice entry/exit precision"
          accent="amber"
        >
          <ul className="space-y-1">
            <Li accent="amber">
              Paper trade specific setups with strict timing
            </Li>
            <Li accent="amber">
              Score based on fill quality, slippage, and R-capture
            </Li>
          </ul>
        </DetailCard>

        <DetailCard
          icon="🛡"
          title="Risk Training"
          tag="Practice risk discipline"
          accent="rose"
        >
          <ul className="space-y-1">
            <Li accent="rose">
              Scenarios that test stop management and position sizing
            </Li>
            <Li accent="rose">
              Scored on drawdown control and risk rule adherence
            </Li>
          </ul>
        </DetailCard>

        <DetailCard
          icon="🧨"
          title="Stress Testing"
          tag="Survive adverse conditions"
          accent="rose"
        >
          <ul className="space-y-1">
            <Li accent="rose">
              Trade through simulated flash crashes and vol spikes
            </Li>
            <Li accent="rose">
              Tests emotional resilience and plan adherence
            </Li>
          </ul>
        </DetailCard>
      </div>

      <Tip icon="🏆" tone="danger">
        <strong className="text-rose-200">Progress tracking:</strong> All
        experiment sessions log to{" "}
        <strong className="text-rose-200">📊 My Results</strong> with PnL
        scoring and win streaks. Active sessions show 🔴 indicators. Multiple
        modes can run simultaneously.
      </Tip>

      {/* ── Risk Lab ── */}
      <SectionDivider icon="🛡️" title="6 · Risk Lab — Position Sizing & Guardrails" />

      <DetailCard
        icon="🛡️"
        title="Risk Lab"
        tag="3 modes: Spot, Perps, Options — full position sizing suite"
        accent="violet"
        wide
      >
        <ul className="space-y-1.5 sm:columns-2 sm:gap-x-6">
          <Li accent="violet">
            <strong className="text-fg text-[11px]">
              📏 Position Size Calculator
            </strong>{" "}
            — Input entry + stop + risk $ → get units, notional, margin
          </Li>
          <Li accent="violet">
            <strong className="text-fg text-[11px]">🧰 Risk Presets</strong> —
            Save named risk profiles (conservative, aggressive, scalper)
          </Li>
          <Li accent="violet">
            <strong className="text-fg text-[11px]">🛑 Guardrails</strong> —
            Loss limits, max drawdown, daily loss caps
          </Li>
          <Li accent="violet">
            <strong className="text-fg text-[11px]">🧪 Apply to Paper</strong>{" "}
            — Push risk profile directly to a paper trading account
          </Li>
          <Li accent="violet">
            <strong className="text-fg text-[11px]">Mode toggle</strong> —
            💰 Spot / 📊 Perps / 📈 Options context
          </Li>
          <Li accent="violet">Requires ⚡ Power tier</Li>
        </ul>
      </DetailCard>

      {/* ── Journal ── */}
      <SectionDivider icon="📓" title="7 · Trade Journal" />

      <div className="grid gap-3 md:grid-cols-2">
        <DetailCard
          icon="➕"
          title="Entry Types"
          tag="4 entry types + 2 quick modes"
          accent="emerald"
        >
          <ul className="space-y-1.5">
            <Li accent="emerald">
              <strong className="text-fg text-[11px]">📈 Trade</strong> —
              Completed trade with side, symbol, PnL in R-multiples and USD
            </Li>
            <Li accent="emerald">
              <strong className="text-fg text-[11px]">💡 Idea</strong> — Trade
              setup for later review
            </Li>
            <Li accent="emerald">
              <strong className="text-fg text-[11px]">📝 Note</strong> —
              General market observation
            </Li>
            <Li accent="emerald">
              <strong className="text-fg text-[11px]">🔍 Post-mortem</strong>{" "}
              — Deep trade review: what worked, what didn&apos;t
            </Li>
            <Li accent="emerald">
              <strong className="text-fg text-[11px]">
                ⚡ Quick Win / ❌ Quick Loss
              </strong>{" "}
              — One-tap logging for fast entries
            </Li>
          </ul>
        </DetailCard>

        <DetailCard
          icon="📊"
          title="Journal Tools"
          tag="Review, search, export"
          accent="emerald"
        >
          <ul className="space-y-1.5">
            <Li accent="emerald">
              <strong className="text-fg text-[11px]">⚙️ Auto-Log</strong> —
              Automatically log paper trades to journal
            </Li>
            <Li accent="emerald">
              <strong className="text-fg text-[11px]">📅 Calendar</strong> —
              Calendar view of journal entries
            </Li>
            <Li accent="emerald">
              <strong className="text-fg text-[11px]">📊 Stats</strong> — Win
              rate, total R, win/loss streaks
            </Li>
            <Li accent="emerald">
              <strong className="text-fg text-[11px]">🔎 Search</strong> —
              Find entries by symbol, note, or date
            </Li>
            <Li accent="emerald">
              <strong className="text-fg text-[11px]">⬇️ Export</strong> —
              Export journal data for external analysis
            </Li>
            <Li accent="emerald">
              Available to all tiers including 🌱 Explorer
            </Li>
          </ul>
        </DetailCard>
      </div>

      {/* ── Bottom tips ── */}
      <Tip icon="💡" tone="success">
        <strong className="text-emerald-200">Recommended workflow:</strong>{" "}
        Start with <strong className="text-emerald-200">⚡ Futures</strong> —
        create an account, enable 1-2 preset strategies, let the engine
        auto-trade. Review daily via{" "}
        <strong className="text-emerald-200">📊 Analytics</strong>. Log
        interesting trades in the{" "}
        <strong className="text-emerald-200">📓 Journal</strong>. Use{" "}
        <strong className="text-emerald-200">🧪 Experiment Lab</strong> when you
        want to deliberately practice a weakness.
      </Tip>

      <Tip icon="🔗" tone="info">
        <strong className="text-cyan-200">Cross-module links:</strong> Futures
        strategies are powered by{" "}
        <strong className="text-cyan-200">TA Lab scanners</strong>. Risk Lab
        presets feed directly into paper accounts. The Journal can{" "}
        <strong className="text-cyan-200">auto-log</strong> paper trades from
        any simulator. Portfolio Sim can{" "}
        <strong className="text-cyan-200">import from EdgeFolio</strong>.
      </Tip>

      <Tip icon="📊" tone="purple">
        <strong className="text-violet-200">R-multiples everywhere:</strong> All
        performance tracking uses{" "}
        <strong className="text-violet-200">R-multiples</strong> (risk units)
        rather than just USD. A +2R trade means you made 2× your risk. This
        normalizes performance across different position sizes and assets.
      </Tip>
    </div>
  );
}

/* ================================================================== */
/*  EXPORTED SECTION                                                   */
/* ================================================================== */

export function TerminalGuides() {
  const panels: GuidePanel[] = [
    {
      id: "overview",
      icon: "📚",
      title: "Overview",
      content: <OverviewContent />,
    },
    {
      id: "alerts",
      icon: "🔔",
      title: "Alerts & Settings",
      content: <AlertsContent />,
    },
    {
      id: "simlab",
      icon: "🧪",
      title: "Simulation Lab",
      content: <SimLabContent />,
    },
  ];

  return (
    <section id="guides" className="scroll-mt-16 py-8">
      <SectionHeading
        eyebrow="TERMINAL GUIDES"
        title="Learn the terminal"
        desc="Interactive guides for every module — exactly how it looks in Telegram."
      />
      <div className="mt-6">
        <GuideAccordion panels={panels} />
      </div>
    </section>
  );
}
