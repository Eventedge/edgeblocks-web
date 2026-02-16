import { NextResponse } from "next/server";
import { proxyJSON } from "@/lib/eventedge";

export async function GET() {
  const fallback = {
    ts: new Date().toISOString(),
    kpis: [
      { key: "btc_price", label: "BTC Price", value: "$—", sub: "wire EventEdge price feed" },
      { key: "funding_oiw", label: "Funding (OI-weighted)", value: "—", sub: "8h / 24h toggle" },
      { key: "open_interest", label: "Open Interest", value: "—", sub: "per exchange + total" },
      { key: "liq_24h", label: "Liquidations (24h)", value: "—", sub: "long/short breakdown" },
    ],
  };
  const { json, headers } = await proxyJSON({
    path: "/api/v1/market/overview",
    fallback,
    cacheControl: "public, s-maxage=30, stale-while-revalidate=600",
  });
  return NextResponse.json(json, { headers });
}
