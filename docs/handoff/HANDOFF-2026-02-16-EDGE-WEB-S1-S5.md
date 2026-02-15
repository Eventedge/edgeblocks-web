# HANDOFF — EdgeBlocks Website (Vercel + Namecheap DNS) — 2026-02-16

## TL;DR
EdgeBlocks marketing site is live on **https://edgeblocks.io** with subpages for **ProofClaw** and **DataSnype**. Deployments are **Vercel CLI-only** (API token). DNS remains on **Namecheap nameservers** by design. Next work: use uploaded HTML one-pagers as design references and add richer branded background/sections (grid/noise/glow/dividers) while keeping performance tight.

---

## Live URLs
- Landing: https://edgeblocks.io
- ProofClaw: https://edgeblocks.io/proofclaw
- DataSnype: https://edgeblocks.io/datasnype
- Redirect: https://edgeblocks.io/datasnipe → **308** → /datasnype
- Vercel project: https://vercel.com/eventedges-projects/edgeblocks-web/settings
- GitHub repo: https://github.com/Eventedge/edgeblocks-web

---

## Non-negotiables / Workflow Rules
- **One prompt at a time.**
- **Claude CLI does everything**: edits, tests, commits, deploys.
- Use **Vercel via API token / CLI** (deploys are CLI-only for now).
- **DNS changes only on Namecheap**, keep Namecheap nameservers. Vercel "nameserver" warning is cosmetic.

---

## What shipped (by ticket)
### EDGE-WEB-SESSION-001 — Scaffold + initial deploy
- Created new GitHub repo: `Eventedge/edgeblocks-web`
- Next.js scaffold: **Next 15.1.12**, Tailwind, App Router, TypeScript
- Pages: `/` (landing), `/proofclaw`, `/datasnipe`
- Vercel deploy: `https://edgeblocks-web.vercel.app`
- Note: installed Node 20.20.0 via nvm (create-next-app requires Node >= 20)

### EDGE-WEB-002 — Custom domain + DNS
- Attached **edgeblocks.io** + **www.edgeblocks.io** to the Vercel project
- Updated Namecheap DNS (A + CNAME), confirmed propagated; **SSL issued**
- Nameservers remain Namecheap; Vercel warning accepted

### EDGE-WEB-003 — UI polish + real copy + metadata
- Added shared components: `Container`, `Button`, `Card`, `Chip`, `SectionHeading` in `src/components/ui.tsx`
- Theme: CSS variable tokens + dark glow gradient background in `src/app/globals.css`
- Metadata: title/description + OG/Twitter card tags in `src/app/layout.tsx`
- Landing: hero + metric chips + platform section (EdgeCore/EdgeMind/Apps) + ProofClaw/DataSnype callouts
- ProofClaw page: integration flow, 3 capability cards, 4 use-case cards, CTAs
- DataSnype page: track record narrative, evolution cards, relevance section, mapping to EdgeBlocks
- Build: clean lint/build; first load ~109 kB
- Deployed + aliased to https://edgeblocks.io

### EDGE-WEB-004 — Rename DataSnype + route change + redirect
- Replaced `datasnipe` → `datasnype` everywhere
- New route: `/datasnype`
- Permanent redirect: `/datasnipe` → `/datasnype` (in `next.config.ts`)
- Updated internal links + outbound links to https://datasnype.io
- Confirmed zero leftover refs in `src/`
- Deployed to production

### EDGE-WEB-005 — Redirect verification
- Verified via curl (using `--resolve` to bypass server DNS cache):
  - `/datasnipe` returns **308** + `Location: /datasnype`
  - Final destination: `https://edgeblocks.io/datasnype` → **200**
  - 1 redirect followed
  - Full HTML content confirmed

---

## Current repo structure (key files)
```
src/app/page.tsx           — landing
src/app/proofclaw/page.tsx — ProofClaw subpage
src/app/datasnype/page.tsx — DataSnype subpage
src/components/ui.tsx      — shared UI components (Container, Button, Card, Chip, SectionHeading)
src/app/globals.css        — theme tokens + glow background
src/app/layout.tsx         — metadata + OG tags
next.config.ts             — redirect /datasnipe → /datasnype
tailwind.config.ts         — color token mapping to CSS vars
```

---

## Quick verification commands
### Redirect check
```bash
curl -sSI --resolve edgeblocks.io:443:76.76.21.21 https://edgeblocks.io/datasnipe
curl -sSIL -L -o /dev/null -w "final_url=%{url_effective}\nhttp_code=%{http_code}\nredirects=%{num_redirects}\n" --resolve edgeblocks.io:443:76.76.21.21 https://edgeblocks.io/datasnipe
```

### Build sanity
```bash
source /home/eventedge/.nvm/nvm.sh && nvm use 20
npm run lint
npm run build
```

### Deploy
```bash
source /home/eventedge/.nvm/nvm.sh && nvm use 20
VERCEL_TOKEN=<token> vercel --prod --yes
```

---

## What's next (priority)

1. **Use uploaded HTML one-pagers as design references:**
   - Extract layout motifs (hero patterns, section rails, gradient dividers, card styles)
   - Apply to site: add non-blank branded background depth:
     - subtle grid/noise overlay
     - section-based glow blobs
     - divider rails / gradients
     - optional "flywheel" visual (lightweight SVG)

2. **Keep perf tight** (no heavy deps; no huge images).

3. **Copy polish pass** to align with one-pagers + investor pack language.

---

## Environment / ops notes
- **Node**: 20.20.0 via nvm (`source /home/eventedge/.nvm/nvm.sh && nvm use 20`)
- **Vercel CLI**: 50.17.1 (installed globally under nvm node 20)
- **Vercel GitHub integration** is NOT enabled; deploys are CLI-only.
- **Namecheap nameservers** remain (intentional). DNS is confirmed good on public resolvers (Google 8.8.8.8, Cloudflare 1.1.1.1). Server local DNS may not resolve `edgeblocks.io` — use `--resolve` flag with curl.
- **Vercel project ID**: `prj_dEDhgXxs2wYVnPftCgpsAQJSplVH`
- **Vercel team ID**: `team_cG9vmZN4r7LbZUhkgOIrn64u`
- **Git identity** (repo-local): `Eventedge <Eventedge@users.noreply.github.com>`
