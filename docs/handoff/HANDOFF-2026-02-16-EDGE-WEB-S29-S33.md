# EdgeBlocks Web — Session Handoff (2026-02-16 UTC)

## Shipped this session

### EDGE-WEB-029 — /eventedge explainer page (`c838129`)
- New page: `src/app/eventedge/page.tsx` — premium docs-style one-pager
- Sections: Hero, Capabilities (3 cards), How it works (5-stage pipeline), Example alerts (4 formatted blocks), Data infrastructure (4-column API grid + stat counters), CTA (Telegram link)
- Section-jump nav row at top
- Nav + footer links added to home page and dashboard
- Static, 178 B — zero client JS

### EDGE-WEB-030 — /roadmap page + home page enrich (`3a2b781`)
- New page: `src/app/roadmap/page.tsx` — vertical timeline stepper
  - 5 milestones: Q4 2025 (LIVE) -> Q1 2026 (LIVE) -> Q2 2026 (BUILDING) -> Q3-Q4 2026 (PLANNED)
  - Color-coded status dots, 6 guiding principles, "What's live today" callout, CTA
- Home page enriched with 3 new sections:
  - "How it works" — 3-step strip (Collect / Score / Deliver)
  - "Why EdgeBlocks" — 3 differentiators
  - "Roadmap preview" — next 3 milestones with link to /roadmap
- Nav updated: EventEdge + Roadmap links in header + footer

### EDGE-WEB-031 — SuperCard desktop row layout fix (`101a03a`)
- `.pill-row` grid column 1: `minmax(0,1fr)` -> `minmax(10rem,1fr)` — labels never collapse below readable width
- `.clamp-2` CSS utility for hint text (2-line max with ellipsis)
- Value column: explicit `whitespace-nowrap` instead of `nowrap-tight`

### EDGE-WEB-032 — UI polish: dark cards + SuperCard tablet fix (`d5c0eb8`)
- `.pill-row` 3-column grid breakpoint: md (768px) -> lg (1024px) — tablets get stacked layout
- New `.glass-card` CSS utility (surface2 bg, border, backdrop-blur, shadow)
- Applied to Home (How it works, Why EdgeBlocks, What's next) + Roadmap (principles, what's live)

### EDGE-WEB-033 — Micro-polish pass (`a3b5b43`)
- SuperCard pill rows: grid col 1 min `10rem` -> `12rem`, subtle border-right separator on lg+, tighter rhythm (space-y-1.5, CSS padding)
- Exclusives row: `.excl-minh` utility — min-height 420px on lg+ for balanced SuperCard/Regime/Paper row
- Section headings: `mt-2` wrapper for more air after Dividers
- "Updated Xs ago" labels: smaller (9px) + lower opacity (muted2/70)

## Current status
- **Prod:** https://edgeblocks.io (aliased via Vercel)
- **Pages:** `/` `/eventedge` `/roadmap` `/proofclaw` `/datasnype` `/dashboard`
- **Dashboard modules live:** Market Tiles, BTC Snapshot, Fear & Greed, SuperCard, Regime, Paper Trader, SimLab, Alerts, System Events, global AlertTicker
- **Build:** 18 routes, dashboard JS 9.77 kB, all static pages 184 B
- **Branch:** `main` — all feature branches merged and pushed

## Key files modified
```
src/app/eventedge/page.tsx          NEW — EventEdge explainer
src/app/roadmap/page.tsx            NEW — Roadmap timeline
src/app/page.tsx                    Home: nav links + 3 new sections
src/app/dashboard/page.tsx          Footer links
src/app/globals.css                 pill-row, glass-card, excl-minh, clamp-2
src/components/DashboardLive.tsx    Pill-row breakpoints, excl-minh, spacing, ago labels
src/components/ui.tsx               (unchanged this session)
```

## Repos + infra
- **Web:** `/home/eventedge/projects/edgeblocks-web` (Next.js 15, Vercel)
- **API:** `/home/eventedge/projects/eventedge-api` (Python/FastAPI, systemd)
- **Bot:** `/home/eventedge/eventedge-bot` (Python, PTB 13.15, systemd)

## Known issues / next targets
- SuperCard on very narrow laptops (1024-1100px): labels may still feel tight — could bump breakpoint to xl (1280px) if feedback warrants
- Funding/OI/Liq Charts module is still an EmptyState placeholder
- No mobile hamburger nav yet (desktop nav hidden on small screens)
- EventEdge + Roadmap pages are static content — could benefit from live data widgets later
