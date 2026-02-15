import Link from "next/link";

export function Container({ children }: { children: React.ReactNode }) {
  return <div className="mx-auto max-w-6xl px-6">{children}</div>;
}

export function Chip({ children }: { children: React.ReactNode }) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-surface/70 px-4 py-2 text-xs font-mono text-muted backdrop-blur">
      {children}
    </div>
  );
}

export function Button({
  href,
  children,
  variant = "primary",
}: {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost" | "proof" | "datasnipe";
}) {
  const cls =
    variant === "primary"
      ? "bg-accentGold text-ink hover:opacity-90"
      : variant === "proof"
      ? "bg-accentCyan text-ink hover:opacity-90"
      : variant === "datasnipe"
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
