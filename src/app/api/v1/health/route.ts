import { NextResponse } from "next/server";
import { proxyJSON } from "@/lib/eventedge";

export async function GET() {
  const fallback = { ok: true, service: "edgeblocks-web", api: "v1", ts: new Date().toISOString() };
  const { json, headers } = await proxyJSON({ path: "/api/v1/health", fallback, cacheControl: "public, s-maxage=10" });
  return NextResponse.json(json, { headers });
}
