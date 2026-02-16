import { NextResponse } from "next/server";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ symbol: string }> }
) {
  const { symbol: rawSymbol } = await params;
  const symbol = (rawSymbol || "BTC").toUpperCase();

  // Placeholder. Later: hydrate from EventEdge "BTC card" snapshot + derived metrics.
  const data = {
    ts: new Date().toISOString(),
    symbol,
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

  return NextResponse.json(data, {
    headers: { "Cache-Control": "public, s-maxage=20, stale-while-revalidate=300" },
  });
}
