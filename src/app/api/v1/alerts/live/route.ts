import { NextResponse } from "next/server";
import { proxyJSON } from "@/lib/eventedge";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const limit = searchParams.get("limit") ?? "30";
  const fallback = {
    ok: true,
    version: "v0.1-live",
    source_ts: new Date().toISOString(),
    items: [],
  };
  const { json, headers } = await proxyJSON({
    path: `/api/v1/alerts/live?limit=${limit}`,
    fallback,
    cacheControl: "public, s-maxage=5, stale-while-revalidate=30",
  });
  return NextResponse.json(json, { headers });
}
