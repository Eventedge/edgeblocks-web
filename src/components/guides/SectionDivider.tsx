export function SectionDivider({
  icon,
  title,
}: {
  icon?: string;
  title: string;
}) {
  return (
    <div className="flex items-center gap-3 py-4">
      {icon && <span className="text-base">{icon}</span>}
      <span className="text-xs font-mono font-semibold tracking-wider text-muted uppercase">
        {title}
      </span>
      <div className="flex-1 h-px bg-gradient-to-r from-border2/80 to-transparent" />
    </div>
  );
}
