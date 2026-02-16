import Link from "next/link";

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

export function Table({
  title,
  columns,
  rows,
  footerHref,
  footerText,
}: {
  title: string;
  columns: string[];
  rows: (string | number)[][];
  footerHref?: string;
  footerText?: string;
}) {
  return (
    <div className="rounded-2xl border border-border bg-surface p-6 overflow-hidden">
      <div className="flex items-center justify-between gap-4">
        <div>
          <div className="text-xs font-mono text-muted">TABLE</div>
          <div className="mt-1 text-lg font-semibold">{title}</div>
        </div>
        {footerHref && footerText ? (
          <Link className="text-sm text-muted hover:text-fg" href={footerHref}>
            {footerText} →
          </Link>
        ) : null}
      </div>

      <div className="mt-4 overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="text-left text-muted">
              {columns.map((c) => (
                <th key={c} className="py-2 pr-4 font-mono text-xs whitespace-nowrap">
                  {c}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={i} className="border-t border-border/70">
                {r.map((cell, j) => (
                  <td key={j} className="py-3 pr-4 text-fg whitespace-nowrap">
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 text-xs text-muted2 font-mono">
        * Placeholder table. Will be wired to EventEdge API snapshots.
      </div>
    </div>
  );
}

export function ChartPlaceholder({
  title,
  note,
}: {
  title: string;
  note: string;
}) {
  return (
    <div className="rounded-2xl border border-border bg-surface p-6">
      <div className="text-xs font-mono text-muted">CHART</div>
      <div className="mt-1 text-lg font-semibold">{title}</div>
      <div className="mt-4 h-40 rounded-xl border border-border/70 bg-surface2/60" />
      <div className="mt-3 text-xs text-muted2 font-mono">{note}</div>
    </div>
  );
}
