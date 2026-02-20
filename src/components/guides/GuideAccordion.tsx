"use client";

import { useState, useCallback } from "react";

export interface GuidePanel {
  id: string;
  icon: string;
  title: string;
  content: React.ReactNode;
}

export function GuideAccordion({ panels }: { panels: GuidePanel[] }) {
  const [open, setOpen] = useState<string>(panels[0]?.id ?? "");

  const scrollToPanel = useCallback(
    (id: string) => {
      setOpen(id);
      // Small delay so the panel opens before we scroll
      setTimeout(() => {
        const el = document.getElementById(`guide-${id}`);
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 50);
    },
    [],
  );

  return (
    <div>
      {/* Sticky mini-nav */}
      <div className="sticky top-0 z-30 -mx-1 mb-4">
        <div className="rounded-xl border border-border/40 bg-bg/85 backdrop-blur-md px-3 py-2.5">
          <div className="flex flex-wrap gap-2">
            {panels.map((p) => (
              <button
                key={p.id}
                type="button"
                onClick={() => scrollToPanel(p.id)}
                className={`rounded-full border px-4 py-1.5 text-xs font-mono transition ${
                  open === p.id
                    ? "border-accentCyan/40 bg-accentCyan/10 text-accentCyan"
                    : "border-border/70 bg-surface/70 text-muted hover:text-fg hover:border-border2"
                }`}
              >
                {p.icon} {p.title}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Accordion panels */}
      <div className="space-y-3">
        {panels.map((p) => {
          const isOpen = open === p.id;
          return (
            <div
              key={p.id}
              id={`guide-${p.id}`}
              className="scroll-mt-28 rounded-2xl border border-border/60 bg-surface/70 backdrop-blur overflow-hidden transition-colors"
            >
              {/* Header */}
              <button
                type="button"
                onClick={() => setOpen(isOpen ? "" : p.id)}
                className="flex w-full items-center gap-3 px-5 py-4 text-left"
              >
                <span className="text-lg">{p.icon}</span>
                <span className="flex-1 text-sm font-semibold text-fg tracking-tight">
                  {p.title}
                </span>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className={`text-muted2 transition-transform duration-200 ${
                    isOpen ? "rotate-180" : ""
                  }`}
                >
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </button>

              {/* Collapsible body */}
              <div
                className={`transition-all duration-200 ease-in-out ${
                  isOpen
                    ? "max-h-[12000px] opacity-100"
                    : "max-h-0 opacity-0 overflow-hidden"
                }`}
              >
                <div className="border-t border-border/30 px-5 pb-6 pt-4">
                  {p.content}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
