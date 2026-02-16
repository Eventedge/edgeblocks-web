import { NextResponse } from "next/server";
import { proxyJSON } from "@/lib/eventedge";

export async function GET() {
  const fallback = {
    ts: new Date().toISOString(),
    current: { value: 50, label: "Neutral" },
    history: [
      { t: "D-6", v: 46 }, { t: "D-5", v: 52 }, { t: "D-4", v: 58 },
      { t: "D-3", v: 55 }, { t: "D-2", v: 49 }, { t: "D-1", v: 51 }, { t: "Now", v: 50 },
    ],
  };

  const { json, headers } = await proxyJSON({
    path: "/api/v1/sentiment/fear-greed",
    fallback,
    cacheControl: "public, s-maxage=60, stale-while-revalidate=1200",
  });

  return NextResponse.json(json, { headers });
}
