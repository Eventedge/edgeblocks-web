# HANDOFF — EdgeBlocks Website (S11–S14) — 2026-02-16

## Live URLs
- Landing: https://edgeblocks.io
- Dashboard: https://edgeblocks.io/dashboard
- ProofClaw: https://edgeblocks.io/proofclaw
- DataSnype: https://edgeblocks.io/datasnype

## What shipped
### EDGE-WEB-011 — Dashboard positioning + exclusives section
- Removed CoinGlass wording / "CoinGlass-style" references
- Renamed header to **EdgeBlocks Intelligence** + added subtitle framing bot-native widgets
- Added **EdgeBlocks Exclusives** section (3 blocks):
  - BTC SuperCard (Pillars)
  - Market Regime
  - Paper Trader snapshot
- All blocks implemented with safe fallbacks (no crashes on null)

### EDGE-WEB-012 — Landing differentiation + live preview
- Added "We don't just show data — we interpret it" section with 3 cards:
  - **WIDGETS** (bot-native cards)
  - **HIVEMIND** (rollups & logic layer)
  - **HIVEBANK** (feature store)
- Added **Live Preview** strip using real API via website proxy (ISR 30s):
  - BTC price, OI-weighted funding, Open Interest
- Added CTAs: **Open Dashboard** + **Enter App**

### EDGE-WEB-013 — Wire dashboard exclusives to API endpoints
- SuperCard/Regime/Paper Trader widgets now fetch from website proxy routes:
  - /api/v1/edge/supercard?symbol=BTC
  - /api/v1/edge/regime
  - /api/v1/paper/summary
- Added 3 proxy routes on the website to upstream API (api.edgeblocks.io)
- Fixed null access bug in SuperCard rendering when endpoint unavailable
- Verified the dashboard renders API-driven placeholder schemas cleanly

### EDGE-WEB-014 — Fear & Greed widget polish
- Fear & Greed now shows **real value + label** (e.g. 12 — Extreme Fear)
- Shows updated date from **source_ts**
- Added pure **SVG sparkline** (7 points) — no libs
- Removed all placeholder references

## Current dashboard data wiring
- Real market data: /api/v1/market/overview + /api/v1/assets/{symbol}/card
- Real fear&greed: /api/v1/sentiment/fear-greed (Alternative.me, cached in DB)
- EdgeBlocks exclusives: wired to placeholder schemas (ready to be backed by bot sources)

## Website proxy routes (all under src/app/api/v1/)
- health/route.ts
- market/overview/route.ts
- assets/[symbol]/card/route.ts
- sentiment/fear-greed/route.ts
- edge/supercard/route.ts (new)
- edge/regime/route.ts (new)
- paper/summary/route.ts (new)

## Next recommended tickets
- EE-API-008: Start wiring ONE proprietary pillar into /edge/supercard from internal bot outputs/rollups (no recipe leakage)
- EE-API-009: Paper trader real rollups endpoint (summary + tiny equity curve)
- EDGE-WEB-015: Make SuperCard "feel real" (status colors, compact layout, tooltips) once values are real
