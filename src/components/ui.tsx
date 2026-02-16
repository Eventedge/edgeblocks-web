import Link from "next/link";

export function Container({ children }: { children: React.ReactNode }) {
  return <div className="mx-auto max-w-6xl px-6">{children}</div>;
}

export function Chip({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`inline-flex items-center gap-2 rounded-full border border-border/70 bg-surface/70 px-4 py-2 text-xs font-mono text-muted backdrop-blur ${className}`}>
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

const ACCENT_MAP: Record<string, { border: string; gradient: string }> = {
  cyan: { border: "border-cyan-500/20", gradient: "from-cyan-400/15 via-transparent" },
  violet: { border: "border-violet-500/20", gradient: "from-violet-400/15 via-transparent" },
  amber: { border: "border-amber-500/20", gradient: "from-amber-400/15 via-transparent" },
  emerald: { border: "border-emerald-500/20", gradient: "from-emerald-400/15 via-transparent" },
  rose: { border: "border-rose-500/20", gradient: "from-rose-400/15 via-transparent" },
};

export function ModuleCard({
  accent = "cyan",
  title,
  subtitle,
  right,
  children,
  className = "",
}: {
  accent?: "cyan" | "violet" | "amber" | "emerald" | "rose";
  title?: string;
  subtitle?: string;
  right?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}) {
  const a = ACCENT_MAP[accent] ?? ACCENT_MAP.cyan;
  return (
    <div className={`module-card scanline rounded-2xl border ${a.border} bg-surface overflow-hidden ${className}`}>
      <div className={`h-px w-full bg-gradient-to-r ${a.gradient} to-transparent`} />
      {(title || subtitle || right) && (
        <div className="flex items-start justify-between gap-4 px-6 pt-5 pb-3">
          <div>
            {title && <div className="text-lg font-semibold tracking-tight">{title}</div>}
            {subtitle && <div className="mt-0.5 text-sm text-muted">{subtitle}</div>}
          </div>
          {right && <div className="shrink-0 pt-1">{right}</div>}
        </div>
      )}
      <div className={title || subtitle || right ? "px-6 pb-6" : "p-6"}>{children}</div>
    </div>
  );
}
