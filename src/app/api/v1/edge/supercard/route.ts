import { NextRequest, NextResponse } from "next/server";
import { proxyJSON } from "@/lib/eventedge";

export async function GET(request: NextRequest) {
  const symbol = request.nextUrl.searchParams.get("symbol") || "BTC";
  const fallback = {
    ts: new Date().toISOString(),
    symbol,
    version: "v0.1-placeholder",
    summary: { headline: "—", stance: "—", confidence: "—", notes: ["—"] },
    pillars: [],
    disclaimer: "Fallback — API not reachable.",
  };
  const { json, headers } = await proxyJSON({
    path: `/api/v1/edge/supercard?symbol=${encodeURIComponent(symbol)}`,
    fallback,
    cacheControl: "public, s-maxage=20, stale-while-revalidate=300",
  });
  return NextResponse.json(json, { headers });
}
