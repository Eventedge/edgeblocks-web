# HANDOFF — EdgeBlocks Website (S6–S10) — 2026-02-16

## TL;DR
We shipped a live dashboard at https://edgeblocks.io/dashboard and wired it end-to-end to a real API + real snapshot DB data (no more placeholders for market/overview + BTC/ETH cards).

## Live URLs
- Landing: https://edgeblocks.io
- Dashboard: https://edgeblocks.io/dashboard
- ProofClaw: https://edgeblocks.io/proofclaw
- DataSnype: https://edgeblocks.io/datasnype
- Redirect: https://edgeblocks.io/datasnipe -> 301 -> /datasnype
- Website proxy endpoints (should reflect API):
  - https://edgeblocks.io/api/v1/health
  - https://edgeblocks.io/api/v1/market/overview
  - https://edgeblocks.io/api/v1/assets/BTC/card
  - https://edgeblocks.io/api/v1/sentiment/fear-greed

## What shipped
### EDGE-WEB-006
- Added `/dashboard` page (KPI tiles, BTC card widget, Fear & Greed block, tables placeholders)
- Added internal API stubs under `/api/v1/*` with Cache-Control headers
- Added non-blank background polish via CSS grid + noise/glow layers
- Added a "Dashboard" link in landing nav

### EDGE-WEB-007
- Fixed Vercel deploy + smoke checks (redirect + API + dashboard)

### EDGE-WEB-008
- Implemented proxy layer: website API routes proxy to `EVENTEDGE_API_BASE` if set, otherwise safe placeholders
- Added `.env.example` and `docs/API_PROXY.md`

### EDGE-WEB-009B
- Set `EVENTEDGE_API_BASE` on Vercel (production + preview + development)
- Later updated from `https://api.eventedge.io` to `https://api.edgeblocks.io`

### EDGE-WEB-010
- Verified dashboard is live and consuming real API: checks passed

## Current website architecture
- `src/app/dashboard/page.tsx` renders from `/api/v1/market/overview`, `/api/v1/assets/BTC/card`, `/api/v1/sentiment/fear-greed`
- `src/lib/eventedge.ts` `proxyJSON()` handles upstream proxy + fallback + ETag pass-through
- `EVENTEDGE_API_BASE` is set in Vercel env to `https://api.edgeblocks.io`

## Important product direction (next session)
- Remove any "CoinGlass-style" wording from UI/copy (it was a scaffold only).
- Pivot dashboard positioning to EdgeBlocks unique widgets:
  - "BTC SuperCard (Pillars)"
  - "Regime Card"
  - "Paper trading snapshot"
- Keep dense dashboard UX, but brand as proprietary EdgeBlocks intelligence.

## Next ticket suggestions
- EDGE-WEB-011: Remove CoinGlass references + add sections/placeholders for SuperCard/Regime/Paper trading; keep existing live KPI data.
- EE-API-006: Add endpoints returning structured placeholder objects for these unique widgets (then wire later).
