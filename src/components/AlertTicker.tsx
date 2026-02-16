"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

type AlertItem = {
  ts?: string;
  category?: string;
  type?: string;
  asset?: string;
  from?: string;
  to?: string;
  score?: number | null;
  confidence?: string;
  headline?: string;
  message?: string;
  badge?: string;
  cta?: string;
};

function fmtAgo(ts?: string) {
  if (!ts) return "\u2014";
  const t = Date.parse(ts);
  if (!Number.isFinite(t)) return "\u2014";
  const s = Math.max(0, Math.floor((Date.now() - t) / 1000));
  if (s < 60) return `${s}s`;
  const m = Math.floor(s / 60);
  if (m < 60) return `${m}m`;
  const h = Math.floor(m / 60);
  return `${h}h`;
}

export function AlertTicker() {
  const [items, setItems] = useState<AlertItem[]>([]);
  const [ts, setTs] = useState<string | null>(null);
  const [hover, setHover] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const mounted = useRef(true);

  useEffect(() => {
    mounted.current = true;
    const fetchAlerts = async () => {
      try {
        const r = await fetch("/api/v1/alerts/live?limit=30", { cache: "no-store" });
        const j = await r.json();
        if (mounted.current) {
          setItems((j?.items ?? []) as AlertItem[]);
          setTs(j?.source_ts ?? null);
        }
      } catch {
        // keep old
      }
    };
    fetchAlerts();
    const id = setInterval(fetchAlerts, 5000);
    return () => {
      mounted.current = false;
      clearInterval(id);
    };
  }, []);

  const line = useMemo(() => {
    if (!items.length) return [];
    return items.map((it) => {
      const badge = it.badge || (it.type === "SENTIMENT_SHIFT" ? "\ud83e\udded" : "\ud83d\udcca");
      const asset = it.asset || "\u2014";
      const msg =
        it.type === "SENTIMENT_SHIFT"
          ? `${asset} sentiment: ${it.from ?? "\u2014"} \u2192 ${it.to ?? "\u2014"}${typeof it.score === "number" ? ` (${it.score})` : ""}`
          : `${asset} regime: ${it.from ?? "\u2014"} \u2192 ${it.to ?? "\u2014"}${it.confidence ? ` (${String(it.confidence).toUpperCase()})` : ""}`;
      return { badge, msg };
    });
  }, [items]);

  const onClick = () => {
    if (pathname !== "/dashboard") {
      router.push("/dashboard#events");
    } else {
      const el = document.getElementById("events");
      el?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div
      className="ticker sticky top-0 z-50 border-b border-border/40 bg-black/40 backdrop-blur"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div className="mx-auto flex max-w-6xl items-center gap-3 px-4 py-2">
        <div className="flex items-center gap-2 text-xs font-mono text-muted2 shrink-0">
          <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.45)] animate-pulse" />
          <span>LIVE</span>
          <span className="text-muted">&bull;</span>
          <span className="text-muted2">alerts</span>
          <span className="text-muted">&bull;</span>
          <span className="text-muted2">{fmtAgo(ts || undefined)} ago</span>
        </div>

        <div className="relative flex-1 overflow-hidden">
          {!line.length ? (
            <div className="text-xs font-mono text-muted2">Waiting for signals&hellip;</div>
          ) : (
            <div
              className={`ticker-track flex w-max items-center gap-8${hover ? " ticker-paused" : ""}`}
              onClick={onClick}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => { if (e.key === "Enter") onClick(); }}
            >
              {/* duplicate list for seamless loop */}
              {[...line, ...line].map((x, i) => (
                <div key={i} className="flex items-center gap-2 whitespace-nowrap text-xs font-mono text-fg/90">
                  <span>{x.badge}</span>
                  <span>{x.msg}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
