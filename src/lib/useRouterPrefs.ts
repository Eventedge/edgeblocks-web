"use client";

import { useState, useEffect, useCallback } from "react";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

export type FamilyGroup = "ta" | "deriv" | "macro" | "pm";

export const FAMILY_GROUPS: FamilyGroup[] = ["ta", "deriv", "macro", "pm"];

/** Maps high-level family groups to router feature families (TopFeature.family) */
export const FAMILY_GROUP_ROUTER_MAP: Record<FamilyGroup, string[]> = {
  ta: ["momentum", "trend", "volatility"],
  deriv: ["funding", "oi", "liq", "crowding"],
  macro: ["macro"],
  pm: ["pm"],
};

/** Maps high-level family groups to snapshot keys (FamilySnapshotCard.familyKey) */
export const FAMILY_SNAPSHOT_MAP: Record<FamilyGroup, string> = {
  ta: "ta_core",
  deriv: "deriv_core",
  macro: "macro_core",
  pm: "pm_core",
};

export const FAMILY_GROUP_LABELS: Record<FamilyGroup, string> = {
  ta: "Technical Analysis",
  deriv: "Derivatives",
  macro: "Macro",
  pm: "Prediction Markets",
};

export const FAMILY_GROUP_DESCS: Record<FamilyGroup, string> = {
  ta: "Momentum, trend, volatility",
  deriv: "Funding, OI, liquidations, crowding",
  macro: "ETF flows, fear & greed, TVL",
  pm: "Polymarket, Kalshi probabilities",
};

export type Horizon = "4h" | "12h" | "24h";

export const HORIZONS: Horizon[] = ["4h", "12h", "24h"];

export interface RouterPrefs {
  enabledFamilies: Record<FamilyGroup, boolean>;
  minCoverage: number;
  topN: number;
  showSuppressed: boolean;
  showStale: boolean;
  horizon: Horizon;
}

export const ROUTER_PREFS_DEFAULTS: RouterPrefs = {
  enabledFamilies: { ta: true, deriv: true, macro: true, pm: true },
  minCoverage: 0,
  topN: 15,
  showSuppressed: false,
  showStale: true,
  horizon: "24h",
};

/* ------------------------------------------------------------------ */
/*  localStorage persistence (SSR-safe)                                */
/* ------------------------------------------------------------------ */

const STORAGE_KEY = "edgeblocks.router.prefs.v1";

function read(): RouterPrefs {
  if (typeof window === "undefined") return ROUTER_PREFS_DEFAULTS;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return ROUTER_PREFS_DEFAULTS;
    const p = JSON.parse(raw);
    return {
      ...ROUTER_PREFS_DEFAULTS,
      ...p,
      enabledFamilies: {
        ...ROUTER_PREFS_DEFAULTS.enabledFamilies,
        ...p.enabledFamilies,
      },
    };
  } catch {
    return ROUTER_PREFS_DEFAULTS;
  }
}

function write(prefs: RouterPrefs): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs));
  } catch {
    /* quota exceeded */
  }
}

/* ------------------------------------------------------------------ */
/*  Hook                                                               */
/* ------------------------------------------------------------------ */

export function useRouterPrefs(): [RouterPrefs, (p: RouterPrefs) => void, () => void] {
  const [prefs, setState] = useState<RouterPrefs>(ROUTER_PREFS_DEFAULTS);

  useEffect(() => {
    setState(read());
  }, []);

  const set = useCallback((p: RouterPrefs) => {
    setState(p);
    write(p);
  }, []);

  const reset = useCallback(() => {
    setState(ROUTER_PREFS_DEFAULTS);
    write(ROUTER_PREFS_DEFAULTS);
  }, []);

  return [prefs, set, reset];
}

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

/** Is a TopFeature.family (e.g. "momentum") enabled by prefs? */
export function isRouterFamilyEnabled(family: string, prefs: RouterPrefs): boolean {
  for (const [group, families] of Object.entries(FAMILY_GROUP_ROUTER_MAP)) {
    if (families.includes(family)) return prefs.enabledFamilies[group as FamilyGroup];
  }
  return true;
}

/** Is a snapshot key (e.g. "ta_core") enabled by prefs? */
export function isSnapshotFamilyEnabled(key: string, prefs: RouterPrefs): boolean {
  for (const [group, sk] of Object.entries(FAMILY_SNAPSHOT_MAP)) {
    if (sk === key) return prefs.enabledFamilies[group as FamilyGroup];
  }
  return true;
}

/** Count how many prefs differ from defaults (for badge on Customize button) */
export function countActiveFilters(prefs: RouterPrefs): number {
  const d = ROUTER_PREFS_DEFAULTS;
  return [
    prefs.enabledFamilies.ta !== d.enabledFamilies.ta,
    prefs.enabledFamilies.deriv !== d.enabledFamilies.deriv,
    prefs.enabledFamilies.macro !== d.enabledFamilies.macro,
    prefs.enabledFamilies.pm !== d.enabledFamilies.pm,
    prefs.minCoverage !== d.minCoverage,
    prefs.topN !== d.topN,
    prefs.showSuppressed !== d.showSuppressed,
    prefs.showStale !== d.showStale,
    prefs.horizon !== d.horizon,
  ].filter(Boolean).length;
}
