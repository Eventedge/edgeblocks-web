/**
 * EdgeCore HTTP API client — typed fetchers for regime, top-features, family snapshots, health.
 *
 * Base URL: NEXT_PUBLIC_EDGECORE_HTTP_BASE (fallback: http://127.0.0.1:18888 for dev).
 * All fetchers return { state, age_s, payload } or null on error.
 */

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

export interface RegimeData {
  label: string;
  confidence: string;
  structure: string;
  volatility: string;
  risk: string;
  scores: Record<string, number>;
  axes: Record<string, string>;
  freshness: { age_s: number; ttl_s: number; state: string };
}

export interface TopFeature {
  id: string;
  family: string;
  title: string;
  value: string;
  raw_value: number | string | null;
  score: number;
  quality: number;
  strength: number;
  reasons: string[];
}

export interface TopFeaturesData {
  asset: string;
  ts: string;
  regime_label: string;
  regime_confidence: string;
  regime_axes: Record<string, string>;
  family_weights: Record<string, number>;
  family_weights_effective: Record<string, number>;
  top_features: TopFeature[];
  suppressed: { id: string; score: number }[];
  inputs: Record<string, {
    age_s: number | null;
    ttl_s: number;
    state: string;
    quality: number;
    conf?: string | null;
  }>;
  coverage: {
    have: number;
    total: number;
    pct: number;
    missing_families: string[];
    stale_families: string[];
  };
}

export interface FamilySnapshot {
  key: string;
  age_s: number;
  ttl_s: number;
  state: string;
  payload: Record<string, unknown>;
}

export interface HealthData {
  total: number;
  fresh: number;
  stale: number;
  dead: number;
  stale_or_dead: { key: string; age_s: number; ttl_s: number; state: string }[];
}

/* ------------------------------------------------------------------ */
/*  Base URL                                                           */
/* ------------------------------------------------------------------ */

function edgecoreBase(): string {
  const env = process.env.NEXT_PUBLIC_EDGECORE_HTTP_BASE?.trim();
  if (env) return env.endsWith("/") ? env.slice(0, -1) : env;
  return "http://127.0.0.1:18888";
}

/* ------------------------------------------------------------------ */
/*  Generic fetcher                                                    */
/* ------------------------------------------------------------------ */

async function fetchJSON<T>(path: string): Promise<T | null> {
  const url = `${edgecoreBase()}${path}`;
  try {
    const res = await fetch(url, { cache: "no-store" });
    if (!res.ok) return null;
    return (await res.json()) as T;
  } catch {
    return null;
  }
}

/* ------------------------------------------------------------------ */
/*  Public API                                                         */
/* ------------------------------------------------------------------ */

export async function fetchRegime(asset: string): Promise<RegimeData | null> {
  return fetchJSON<RegimeData>(`/v1/regime/${asset.toUpperCase()}`);
}

export async function fetchTopFeatures(
  asset: string,
  n = 15,
): Promise<TopFeaturesData | null> {
  return fetchJSON<TopFeaturesData>(`/v1/top-features/${asset.toUpperCase()}?n=${n}`);
}

export async function fetchFamily(
  asset: string,
  family?: string,
): Promise<Record<string, FamilySnapshot> | null> {
  const q = family ? `?family=${family}` : "";
  return fetchJSON<Record<string, FamilySnapshot>>(`/v1/features/${asset.toUpperCase()}${q}`);
}

export async function fetchHealth(): Promise<HealthData | null> {
  return fetchJSON<HealthData>("/v1/health/data");
}
