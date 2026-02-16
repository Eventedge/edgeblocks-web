# HANDOFF — EdgeBlocks Web (S15–S16) — 2026-02-16

## Live
- Landing: https://edgeblocks.io
- Dashboard: https://edgeblocks.io/dashboard
- ProofClaw: https://edgeblocks.io/proofclaw
- DataSnype: https://edgeblocks.io/datasnype

## Shipped
### EDGE-WEB-015 — Exclusives UI polish
- SuperCard:
  - Headline prominent + stance/confidence inline
  - Per-pillar status badge (positive/neutral/negative) with color coding
  - Notes rendered inline (filtered "—" entries)
  - Disclaimers collapsed into `<details>` info toggle
- Regime:
  - Confidence shown as Chip
  - Axes in compact 2-col grid
  - Drivers filtered (no "—" rows shown)
  - Disclaimer collapsed
- Paper:
  - Win rate + active positions always shown prominently
  - Equity (30d) and max drawdown hidden when "—"
  - Removed empty placeholder chart div
  - Disclaimer collapsed
- No new deps; API calls unchanged.

### EDGE-WEB-016 — "Live" design pass
- New UI components (src/components/ui.tsx):
  - `LiveDot` — pulsing green dot + LIVE label + formatted timestamp
  - `ModuleCard` — color-accented wrapper with top gradient stripe + tinted border
- Module accent mapping:
  - Market Tiles / BTC Snapshot: cyan
  - Fear & Greed: amber
  - SuperCard: violet
  - Regime: emerald
  - Paper Trader: rose
- Layout consolidated (market data in one grid row, removed redundant section headings)
- Font smoothing (antialiased + optimizeLegibility) in globals.css
- No new deps; API calls unchanged.

## Current data wiring
| Widget | Source | Status |
|---|---|---|
| Market KPIs | EdgeCore snapshots | Real |
| BTC Snapshot | EdgeCore snapshots | Real |
| Fear & Greed | Alternative.me (DB cached) | Real |
| SuperCard | Live snapshots + F&G | v0.2-live |
| Regime | Heuristic classifier | v0.2-live |
| Paper Trader | Bot paper tables + equity snapshots | v0.3-live |

## Vercel deploy
- Token used this session: `vcp_3MvZ3s...` (provided by user)
- Deployed via `vercel --prod --token <TOKEN> --yes`
- Previous token had expired; auth file at `~/.local/share/com.vercel.cli/auth.json` was empty

## Next recommended tickets
- EDGE-WEB-017: Render paper equity_curve as sparkline SVG in Paper Trader module (like Fear & Greed widget)
- EDGE-WEB-018: Show equity_30d and max_drawdown in Paper module (values now available from API v0.3-live)
- Optional: responsive tweaks, more timestamp displays from API ts fields
