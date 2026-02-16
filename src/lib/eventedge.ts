export type ProxyOpts = {
  path: string;
  fallback: unknown;
  cacheControl?: string;
};

function base(): string | null {
  const b = process.env.EVENTEDGE_API_BASE?.trim();
  if (!b) return null;
  return b.endsWith("/") ? b.slice(0, -1) : b;
}

export async function proxyJSON({ path, fallback, cacheControl }: ProxyOpts) {
  const b = base();
  if (!b) {
    return {
      json: fallback,
      headers: { "Cache-Control": cacheControl ?? "public, s-maxage=30, stale-while-revalidate=300" },
    };
  }

  const url = `${b}${path.startsWith("/") ? path : `/${path}`}`;
  const headers: Record<string, string> = { Accept: "application/json" };
  const tok = process.env.EVENTEDGE_API_TOKEN?.trim();
  if (tok) headers["Authorization"] = tok.startsWith("Bearer ") ? tok : `Bearer ${tok}`;

  try {
    const res = await fetch(url, { headers, cache: "no-store" });
    if (!res.ok) throw new Error(`upstream ${res.status}`);
    const json = await res.json();

    const outHeaders: Record<string, string> = {
      "Cache-Control": cacheControl ?? "public, s-maxage=20, stale-while-revalidate=300",
    };

    const etag = res.headers.get("etag");
    if (etag) outHeaders["ETag"] = etag;

    return { json, headers: outHeaders };
  } catch {
    return {
      json: fallback,
      headers: { "Cache-Control": cacheControl ?? "public, s-maxage=10, stale-while-revalidate=120" },
    };
  }
}
