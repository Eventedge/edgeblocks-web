const TONE_MAP: Record<string, string> = {
  info: "border-cyan-500/20 bg-cyan-500/5 text-cyan-200",
  warn: "border-amber-500/20 bg-amber-500/5 text-amber-200",
  success: "border-emerald-500/20 bg-emerald-500/5 text-emerald-200",
  purple: "border-violet-500/20 bg-violet-500/5 text-violet-200",
  danger: "border-rose-500/20 bg-rose-500/5 text-rose-200",
};

export function Tip({
  icon = "\ud83d\udca1",
  tone = "info",
  children,
}: {
  icon?: string;
  tone?: "info" | "warn" | "success" | "purple" | "danger";
  children: React.ReactNode;
}) {
  const cls = TONE_MAP[tone] ?? TONE_MAP.info;
  return (
    <div
      className={`flex gap-2.5 rounded-lg border px-4 py-3 text-sm font-mono leading-relaxed ${cls}`}
    >
      <span className="shrink-0 text-base">{icon}</span>
      <div>{children}</div>
    </div>
  );
}
