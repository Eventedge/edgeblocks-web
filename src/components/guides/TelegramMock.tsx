export function TelegramMock({
  children,
  botName = "EventEdge",
}: {
  children: React.ReactNode;
  botName?: string;
}) {
  return (
    <div className="rounded-xl border border-border/60 bg-surface2/70 backdrop-blur overflow-hidden">
      {/* Bot header bar */}
      <div className="flex items-center gap-2 border-b border-border/40 bg-surface/50 px-4 py-2.5">
        <span className="relative inline-flex h-2.5 w-2.5">
          <span className="absolute inline-flex h-full w-full rounded-full bg-accentCyan/40" />
          <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-accentCyan" />
        </span>
        <span className="text-xs font-semibold text-fg/90">{botName}</span>
        <span className="text-[10px] font-mono text-muted2">BOT</span>
      </div>
      {/* Message body */}
      <div className="px-4 py-3 text-sm font-mono text-muted leading-relaxed whitespace-pre-wrap">
        {children}
      </div>
    </div>
  );
}
