import { NextResponse } from "next/server";
import { proxyJSON } from "@/lib/eventedge";

export async function GET() {
  const fallback = {
    ts: new Date().toISOString(),
    version: "v0.1-placeholder",
    regime: { label: "—", confidence: "—", since: null },
    axes: [],
    drivers: ["—", "—", "—"],
    disclaimer: "Fallback — API not reachable.",
  };
  const { json, headers } = await proxyJSON({
    path: "/api/v1/edge/regime",
    fallback,
    cacheControl: "public, s-maxage=20, stale-while-revalidate=300",
  });
  return NextResponse.json(json, { headers });
}
