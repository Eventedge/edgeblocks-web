import { NextResponse } from "next/server";

export async function GET() {
  // Placeholder. Later: pull from provider or EventEdge snapshot table.
  const data = {
    ts: new Date().toISOString(),
    current: { value: 50, label: "Neutral" },
    history: [
      { t: "D-6", v: 46 },
      { t: "D-5", v: 52 },
      { t: "D-4", v: 58 },
      { t: "D-3", v: 55 },
      { t: "D-2", v: 49 },
      { t: "D-1", v: 51 },
      { t: "Now", v: 50 },
    ],
  };

  return NextResponse.json(data, {
    headers: { "Cache-Control": "public, s-maxage=60, stale-while-revalidate=600" },
  });
}
