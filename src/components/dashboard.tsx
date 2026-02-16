export function Divider() {
  return (
    <div className="relative my-10">
      <div className="h-px w-full bg-gradient-to-r from-transparent via-border2 to-transparent opacity-70" />
      <div className="absolute inset-0 h-px w-full bg-gradient-to-r from-transparent via-accentCyan to-transparent opacity-20 blur-sm" />
    </div>
  );
}

export function Metric({
  label,
  value,
  sub,
}: {
  label: string;
  value: string;
  sub?: string;
}) {
  return (
    <div className="rounded-2xl border border-border bg-surface/70 p-4 backdrop-blur">
      <div className="text-xs font-mono text-muted">{label}</div>
      <div className="mt-1 text-xl font-semibold tracking-tight">{value}</div>
      {sub ? <div className="mt-1 text-sm text-muted">{sub}</div> : null}
    </div>
  );
}
