import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json(
    { ok: true, service: "edgeblocks-web", api: "v1", ts: new Date().toISOString() },
    { headers: { "Cache-Control": "public, max-age=10" } }
  );
}
