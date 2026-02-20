export interface MenuItem {
  emoji: string;
  label: string;
  desc?: string;
}

export function MenuGrid({
  items,
  columns = 2,
}: {
  items: MenuItem[];
  columns?: 1 | 2 | 3;
}) {
  const colCls =
    columns === 3
      ? "sm:grid-cols-3"
      : columns === 2
      ? "sm:grid-cols-2"
      : "";
  return (
    <div className={`grid gap-2 ${colCls}`}>
      {items.map((item) => (
        <div
          key={item.label}
          className="flex items-start gap-2.5 rounded-lg border border-border/40 bg-surface/60 px-3 py-2.5 backdrop-blur"
        >
          <span className="shrink-0 text-base">{item.emoji}</span>
          <div className="min-w-0">
            <div className="text-xs font-semibold text-fg/90">{item.label}</div>
            {item.desc && (
              <div className="mt-0.5 text-[11px] text-muted2 leading-snug">
                {item.desc}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
