import { NextResponse } from "next/server";
import { proxyJSON } from "@/lib/eventedge";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const days = searchParams.get("days") ?? "30";
  const fallback = {
    ts: new Date().toISOString(),
    version: "v0.1",
    admin: { tg_id: 0, accounts: { total: 0, active: 0 } },
    kpis: { pnl_30d_usdt: "—", win_rate: "—", trades_30d: 0, open_positions: 0, max_drawdown: "—" },
    curve: [],
    per_account: [],
    disclaimer: "Fallback — API not reachable.",
  };
  const { json, headers } = await proxyJSON({
    path: `/api/v1/simlab/overview?days=${days}`,
    fallback,
    cacheControl: "public, s-maxage=10, stale-while-revalidate=60",
  });
  return NextResponse.json(json, { headers });
}
