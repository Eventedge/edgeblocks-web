import { NextResponse } from "next/server";
import { proxyJSON } from "@/lib/eventedge";

export async function GET(_req: Request, ctx: { params: Promise<{ symbol: string }> }) {
  const { symbol } = await ctx.params;
  const sym = (symbol || "BTC").toUpperCase();

  const fallback = {
    ts: new Date().toISOString(),
    symbol: sym,
    card: {
      price: "—",
      change_24h: "—",
      dominance: "—",
      vol_24h: "—",
      funding: "—",
      open_interest: "—",
      liquidations_24h: "—",
    },
  };

  const { json, headers } = await proxyJSON({
    path: `/api/v1/assets/${encodeURIComponent(sym)}/card`,
    fallback,
    cacheControl: "public, s-maxage=20, stale-while-revalidate=600",
  });

  return NextResponse.json(json, { headers });
}
