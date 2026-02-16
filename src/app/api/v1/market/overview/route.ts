import { NextResponse } from "next/server";

export async function GET() {
  // Placeholder snapshot. Later: proxy/merge from EventEdge/EdgeCore snapshot tables.
  const data = {
    ts: new Date().toISOString(),
    kpis: [
      { key: "btc_price", label: "BTC Price", value: "$—", sub: "wire EventEdge price feed" },
      { key: "funding_oiw", label: "Funding (OI-weighted)", value: "—", sub: "8h / 24h toggle" },
      { key: "open_interest", label: "Open Interest", value: "—", sub: "per exchange + total" },
      { key: "liq_24h", label: "Liquidations (24h)", value: "—", sub: "long/short breakdown" },
    ],
  };

  return NextResponse.json(data, {
    headers: { "Cache-Control": "public, s-maxage=30, stale-while-revalidate=300" },
  });
}
