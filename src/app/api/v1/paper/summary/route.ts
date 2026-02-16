import { NextResponse } from "next/server";
import { proxyJSON } from "@/lib/eventedge";

export async function GET() {
  const fallback = {
    ts: new Date().toISOString(),
    version: "v0.1-placeholder",
    accounts: { active: 0, tracked: 0 },
    kpis: { equity_30d: "—", win_rate: "—", max_drawdown: "—", active_positions: "—" },
    sample: { name: "—", equity_curve: [] },
    disclaimer: "Fallback — API not reachable.",
  };
  const { json, headers } = await proxyJSON({
    path: "/api/v1/paper/summary",
    fallback,
    cacheControl: "public, s-maxage=15, stale-while-revalidate=120",
  });
  return NextResponse.json(json, { headers });
}
