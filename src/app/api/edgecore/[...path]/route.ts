/**
 * Next.js API route proxy for EdgeCore HTTP.
 *
 * Browser fetches HTTPS /api/edgecore/v1/regime/BTC →
 * Vercel serverless forwards to http://<EDGECORE_HOST>/v1/regime/BTC →
 * returns JSON to browser (same-origin, no mixed-content).
 */

const EDGECORE_INTERNAL =
  (process.env.EDGECORE_HTTP_INTERNAL ?? "http://88.223.95.211:18888").replace(
    /\/$/,
    "",
  );

export async function GET(
  request: Request,
  { params }: { params: Promise<{ path: string[] }> },
) {
  const { path } = await params;
  const upstream = `${EDGECORE_INTERNAL}/${path.join("/")}`;
  const qs = new URL(request.url).search;

  try {
    const res = await fetch(`${upstream}${qs}`, {
      headers: { Accept: "application/json" },
      signal: AbortSignal.timeout(8000),
    });

    const body = await res.text();

    return new Response(body, {
      status: res.status,
      headers: {
        "Content-Type": res.headers.get("Content-Type") ?? "application/json",
        "Cache-Control": "no-store, max-age=0",
      },
    });
  } catch (err) {
    return Response.json(
      { error: "edgecore_unreachable", detail: String(err) },
      { status: 502 },
    );
  }
}
