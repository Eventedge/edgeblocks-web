import { NextResponse } from "next/server";
import { proxyJSON } from "@/lib/eventedge";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const limit = searchParams.get("limit") ?? "30";
  const fallback = {
    ts: new Date().toISOString(),
    version: "v0.1",
    admin: { tg_id: 0 },
    items: [],
    disclaimer: "Fallback — API not reachable.",
  };
  const { json, headers } = await proxyJSON({
    path: `/api/v1/simlab/trades/live?limit=${limit}`,
    fallback,
    cacheControl: "public, s-maxage=5, stale-while-revalidate=30",
  });
  return NextResponse.json(json, { headers });
}
