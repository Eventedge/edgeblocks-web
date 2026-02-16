# Website API Proxy (EdgeBlocks -> EventEdge)

The website exposes stable endpoints:
- /api/v1/health
- /api/v1/market/overview
- /api/v1/assets/{SYMBOL}/card
- /api/v1/sentiment/fear-greed

If `EVENTEDGE_API_BASE` is set, these routes proxy to the EventEdge API.
If not set (or upstream errors), they return safe placeholder JSON.

Env:
- EVENTEDGE_API_BASE
- EVENTEDGE_API_TOKEN (optional)
