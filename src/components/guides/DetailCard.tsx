const ACCENT_MAP: Record<string, { border: string; gradient: string; dot: string }> = {
  cyan: { border: "border-cyan-500/20", gradient: "from-cyan-500/15", dot: "bg-cyan-500" },
  violet: { border: "border-violet-500/20", gradient: "from-violet-500/15", dot: "bg-violet-500" },
  amber: { border: "border-amber-500/20", gradient: "from-amber-500/15", dot: "bg-amber-500" },
  emerald: { border: "border-emerald-500/20", gradient: "from-emerald-500/15", dot: "bg-emerald-500" },
  rose: { border: "border-rose-500/20", gradient: "from-rose-500/15", dot: "bg-rose-500" },
};

export function DetailCard({
  icon,
  title,
  tag,
  accent = "cyan",
  wide,
  children,
}: {
  icon: string;
  title: string;
  tag?: string;
  accent?: "cyan" | "violet" | "amber" | "emerald" | "rose";
  wide?: boolean;
  children: React.ReactNode;
}) {
  const a = ACCENT_MAP[accent] ?? ACCENT_MAP.cyan;
  return (
    <div
      className={`rounded-xl border ${a.border} bg-surface/70 p-4 relative overflow-hidden backdrop-blur ${
        wide ? "col-span-full" : ""
      }`}
    >
      <div
        className={`absolute top-0 inset-x-0 h-0.5 bg-gradient-to-r ${a.gradient} to-transparent`}
      />
      <div className="flex items-center gap-2.5 mb-3">
        <span className="text-base">{icon}</span>
        <div>
          <div className="text-xs font-semibold font-mono text-fg">{title}</div>
          {tag && (
            <div className="text-[10px] text-muted2 mt-0.5">{tag}</div>
          )}
        </div>
      </div>
      <div className="text-xs text-muted leading-relaxed">{children}</div>
    </div>
  );
}

export function Li({
  accent = "cyan",
  children,
}: {
  accent?: "cyan" | "violet" | "amber" | "emerald" | "rose";
  children: React.ReactNode;
}) {
  const a = ACCENT_MAP[accent] ?? ACCENT_MAP.cyan;
  return (
    <li className="flex items-start gap-2 py-0.5">
      <span
        className={`inline-block w-1 h-1 rounded-full mt-1.5 shrink-0 ${a.dot}`}
      />
      <span>{children}</span>
    </li>
  );
}
