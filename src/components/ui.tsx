import Link from "next/link";

export function Container({ children }: { children: React.ReactNode }) {
  return <div className="mx-auto max-w-6xl px-6">{children}</div>;
}

export function Chip({
  children,
  className = "",
  onClick,
  role,
}: {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  role?: string;
}) {
  return (
    <div
      className={`inline-flex items-center gap-2 rounded-full border border-border/70 bg-surface/70 px-4 py-2 text-xs font-mono text-muted backdrop-blur ${onClick ? "cursor-pointer select-none" : ""} ${className}`}
      onClick={onClick}
      role={role}
    >
      {children}
    </div>
  );
}

export function PnlChip({ v }: { v: number }) {
  const cls =
    v > 0
      ? "border-emerald-400/30 bg-emerald-400/10 text-emerald-200"
      : v < 0
      ? "border-rose-400/30 bg-rose-400/10 text-rose-200"
      : "border-border bg-surface2 text-muted";
  const sign = v > 0 ? "+" : "";
  return <Chip className={cls}>{sign}{v.toFixed(2)} USDT</Chip>;
}

export function Button({
  href,
  children,
  variant = "primary",
}: {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost" | "proof" | "datasnype";
}) {
  const cls =
    variant === "primary"
      ? "bg-accentGold text-ink hover:opacity-90"
      : variant === "proof"
      ? "bg-accentCyan text-ink hover:opacity-90"
      : variant === "datasnype"
      ? "bg-accentGreen text-ink hover:opacity-90"
      : variant === "secondary"
      ? "border border-border bg-surface hover:bg-surface2 text-fg"
      : "text-muted hover:text-fg";

  const common =
    "inline-flex items-center justify-center rounded-xl px-5 py-3 text-sm font-semibold transition";
  const isExternal = href.startsWith("http");

  return isExternal ? (
    <a className={`${common} ${cls}`} href={href} target="_blank" rel="noreferrer">
      {children}
    </a>
  ) : (
    <Link className={`${common} ${cls}`} href={href}>
      {children}
    </Link>
  );
}

export function Card({
  label,
  title,
  children,
}: {
  label: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-border bg-surface p-6 shadow-[0_0_0_1px_rgba(255,255,255,0.02)]">
      <div className="text-xs font-mono text-muted">{label}</div>
      <div className="mt-2 text-xl font-semibold">{title}</div>
      <div className="mt-2 text-sm text-muted leading-relaxed">{children}</div>
    </div>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  desc,
}: {
  eyebrow: string;
  title: string;
  desc: string;
}) {
  return (
    <div className="max-w-3xl">
      <div className="text-xs font-mono text-muted">{eyebrow}</div>
      <h2 className="mt-2 text-2xl md:text-3xl font-semibold tracking-tight">{title}</h2>
      <p className="mt-3 text-sm md:text-base text-muted leading-relaxed">{desc}</p>
    </div>
  );
}

export function LiveDot({ label = "LIVE", ts }: { label?: string; ts?: string | null }) {
  const date = ts ? String(ts).slice(0, 16).replace("T", " ") : null;
  return (
    <div className="flex items-center gap-2 text-[11px] font-mono text-muted2">
      <span className="relative inline-flex h-2 w-2">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400/60" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-300" />
      </span>
      <span className="text-muted">{label}</span>
      {date ? <span className="opacity-70">{date}Z</span> : null}
    </div>
  );
}

export function UpdatedAgo({ ts, renderTs }: { ts?: string | null; renderTs: string }) {
  if (!ts) return null;
  const diff = Math.max(0, Math.floor((new Date(renderTs).getTime() - new Date(ts).getTime()) / 1000));
  let ago: string;
  if (diff < 60) ago = `${diff}s ago`;
  else if (diff < 3600) ago = `${Math.floor(diff / 60)}m ago`;
  else ago = `${Math.floor(diff / 3600)}h ago`;
  return <span className="text-[10px] font-mono text-muted2">{ago}</span>;
}

export function StatusStrip({ ts }: { ts: string | null }) {
  const date = ts ? String(ts).slice(0, 19).replace("T", " ") + "Z" : null;
  return (
    <div className="flex flex-wrap items-center gap-3 rounded-xl border border-border/30 bg-surface/50 px-4 py-2.5 backdrop-blur text-xs font-mono">
      <div className="flex items-center gap-2">
        <span className="relative inline-flex h-1.5 w-1.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400/60" />
          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-300" />
        </span>
        <span className="text-emerald-300/90">API OK</span>
      </div>
      <div className="h-3.5 w-px bg-border/40" />
      <span className="text-muted2">
        Last refresh: <span className="text-muted">{date ?? "\u2014"}</span>
      </span>
      <div className="ml-auto flex gap-2">
        <span className="rounded-md border border-border/40 bg-surface2/40 px-2.5 py-1 text-fg/80 font-semibold">BTC</span>
        <span className="rounded-md border border-border/40 bg-surface2/40 px-2.5 py-1 text-muted">24h</span>
      </div>
    </div>
  );
}

const MODULE_ICONS: Record<string, React.ReactNode> = {
  market: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
      <polyline points="16 7 22 7 22 13" />
    </svg>
  ),
  sentiment: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <path d="M12 6v6l4 2" />
    </svg>
  ),
  supercard: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  ),
  regime: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
      <path d="M2 12h20" />
    </svg>
  ),
  paper: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
    </svg>
  ),
  simlab: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="3" width="20" height="14" rx="2" />
      <line x1="8" y1="21" x2="16" y2="21" />
      <line x1="12" y1="17" x2="12" y2="21" />
    </svg>
  ),
};

export function ModuleIconBadge({
  icon,
  accent = "cyan",
}: {
  icon: keyof typeof MODULE_ICONS | (string & {});
  accent?: string;
}) {
  const accentColor: Record<string, string> = {
    cyan: "border-cyan-500/25 bg-cyan-500/10 text-cyan-300",
    violet: "border-violet-500/25 bg-violet-500/10 text-violet-300",
    amber: "border-amber-500/25 bg-amber-500/10 text-amber-300",
    emerald: "border-emerald-500/25 bg-emerald-500/10 text-emerald-300",
    rose: "border-rose-500/25 bg-rose-500/10 text-rose-300",
  };
  const cls = accentColor[accent] ?? accentColor.cyan;
  return (
    <div className={`inline-flex items-center justify-center rounded-lg border p-1.5 ${cls}`}>
      {MODULE_ICONS[icon] ?? MODULE_ICONS.market}
    </div>
  );
}

export function EmptyState({
  title,
  description,
  ctaHref,
  ctaLabel,
}: {
  title: string;
  description: string;
  ctaHref?: string;
  ctaLabel?: string;
}) {
  return (
    <div className="empty-shimmer relative rounded-2xl border border-dashed border-border2/60 bg-surface/40 backdrop-blur p-8 text-center overflow-hidden">
      <div className="relative z-10">
        <svg
          className="mx-auto mb-3 text-muted2/60"
          width="32"
          height="32"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="3" y="3" width="18" height="18" rx="4" />
          <path d="M9 12h6M12 9v6" />
        </svg>
        <div className="text-sm font-semibold text-muted">{title}</div>
        <div className="mt-1 text-xs text-muted2 max-w-xs mx-auto leading-relaxed">{description}</div>
        {ctaHref && ctaLabel && (
          <a
            href={ctaHref}
            className="mt-3 inline-flex items-center gap-1 text-xs font-mono text-muted hover:text-fg transition"
          >
            {ctaLabel} &rarr;
          </a>
        )}
      </div>
    </div>
  );
}

const ACCENT_MAP: Record<string, { border: string; gradient: string }> = {
  cyan: { border: "border-cyan-500/20", gradient: "from-cyan-400/15 via-transparent" },
  violet: { border: "border-violet-500/20", gradient: "from-violet-400/15 via-transparent" },
  amber: { border: "border-amber-500/20", gradient: "from-amber-400/15 via-transparent" },
  emerald: { border: "border-emerald-500/20", gradient: "from-emerald-400/15 via-transparent" },
  rose: { border: "border-rose-500/20", gradient: "from-rose-400/15 via-transparent" },
};

export function ModuleCard({
  accent = "cyan",
  icon,
  title,
  subtitle,
  right,
  children,
  className = "",
}: {
  accent?: "cyan" | "violet" | "amber" | "emerald" | "rose";
  icon?: React.ReactNode;
  title?: string;
  subtitle?: string;
  right?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}) {
  const a = ACCENT_MAP[accent] ?? ACCENT_MAP.cyan;
  const hasHeader = !!(title || subtitle || right || icon);
  return (
    <div className={`module-card scanline rounded-2xl border ${a.border} bg-surface shadow-[0_2px_16px_rgba(0,0,0,0.25)] overflow-hidden ${className}`}>
      <div className={`h-px w-full bg-gradient-to-r ${a.gradient} to-transparent`} />
      {hasHeader && (
        <div className="module-header flex items-start justify-between gap-4 px-6 pt-5 pb-3">
          <div className="flex items-start gap-3">
            {icon && <div className="shrink-0 mt-0.5">{icon}</div>}
            <div>
              {title && <div className="text-[15px] font-semibold tracking-tight text-fg">{title}</div>}
              {subtitle && <div className="mt-0.5 text-[13px] text-muted2">{subtitle}</div>}
            </div>
          </div>
          {right && <div className="shrink-0 pt-0.5">{right}</div>}
        </div>
      )}
      <div className={hasHeader ? "px-6 pb-6" : "p-6"}>{children}</div>
    </div>
  );
}
