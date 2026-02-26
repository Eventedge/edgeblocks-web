"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";

/* ------------------------------------------------------------------ */
/*  Nav data                                                           */
/* ------------------------------------------------------------------ */

/** Primary links shown directly in the desktop row. */
const PRIMARY_LINKS = [
  { label: "EventEdge", href: "/eventedge" },
  { label: "Agent", href: "/agent-layer" },
  { label: "Dashboard", href: "/dashboard" },
  { label: "Router", href: "/router" },
];

/** Links tucked inside the "More" dropdown on desktop. */
const MORE_LINKS = [
  { label: "Roadmap", href: "/roadmap" },
  { label: "Dev Report", href: "/dev-report" },
  { label: "ProofClaw", href: "/proofclaw" },
  { label: "DataSnype", href: "/datasnype" },
];

/** Full list for mobile menu. */
const ALL_LINKS = [
  { label: "EventEdge", href: "/eventedge" },
  { label: "Agent Layer", href: "/agent-layer" },
  { label: "Dashboard", href: "/dashboard" },
  { label: "Router", href: "/router" },
  { label: "Roadmap", href: "/roadmap" },
  { label: "Dev Report", href: "/dev-report" },
  { label: "ProofClaw", href: "/proofclaw" },
  { label: "DataSnype", href: "/datasnype" },
];

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export function Navbar() {
  const [moreOpen, setMoreOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const moreRef = useRef<HTMLDivElement>(null);

  // Close "More" dropdown on outside click
  useEffect(() => {
    if (!moreOpen) return;
    function handler(e: MouseEvent) {
      if (moreRef.current && !moreRef.current.contains(e.target as Node)) {
        setMoreOpen(false);
      }
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [moreOpen]);

  return (
    <header className="flex items-center justify-between gap-4 py-8">
      {/* Logo */}
      <Link href="/" className="flex items-center gap-3 shrink-0">
        <Image
          src="/brand/icon.svg"
          alt="EdgeBlocks"
          width={32}
          height={32}
          className="rounded-lg"
        />
        <span className="hidden sm:block text-sm font-semibold text-fg whitespace-nowrap">
          EdgeBlocks
        </span>
      </Link>

      {/* Desktop nav */}
      <nav className="hidden md:flex items-center gap-1 text-sm">
        {/* In-page anchor */}
        <a
          href="#platform"
          className="px-3 py-1.5 rounded-lg text-muted hover:text-fg hover:bg-surface2/60 transition whitespace-nowrap"
        >
          Platform
        </a>

        {PRIMARY_LINKS.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="px-3 py-1.5 rounded-lg text-muted hover:text-fg hover:bg-surface2/60 transition whitespace-nowrap"
          >
            {link.label}
          </Link>
        ))}

        {/* More dropdown */}
        <div className="relative" ref={moreRef}>
          <button
            onClick={() => setMoreOpen((prev) => !prev)}
            className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-muted hover:text-fg hover:bg-surface2/60 transition whitespace-nowrap"
          >
            More
            <svg
              className={`w-3.5 h-3.5 transition-transform ${moreOpen ? "rotate-180" : ""}`}
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                clipRule="evenodd"
              />
            </svg>
          </button>

          {moreOpen && (
            <div className="absolute right-0 top-full mt-1.5 w-44 rounded-xl border border-border bg-surface/95 backdrop-blur-lg shadow-xl py-1.5 z-50">
              {MORE_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMoreOpen(false)}
                  className="block px-4 py-2 text-sm text-muted hover:text-fg hover:bg-surface2/60 transition"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          )}
        </div>
      </nav>

      {/* Right side: CTAs + hamburger */}
      <div className="flex items-center gap-2.5">
        {/* Desktop CTAs */}
        <Link
          href="/eventedge"
          className="hidden md:inline-flex items-center justify-center rounded-xl border border-border bg-surface hover:bg-surface2 px-4 py-2 text-sm font-semibold text-fg transition"
        >
          EventEdge
        </Link>
        <Link
          href="/dashboard"
          className="hidden md:inline-flex items-center justify-center rounded-xl bg-accentGold px-4 py-2 text-sm font-semibold text-ink hover:opacity-90 transition"
        >
          Dashboard
        </Link>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMobileOpen((prev) => !prev)}
          className="md:hidden flex items-center justify-center h-9 w-9 rounded-lg border border-border bg-surface hover:bg-surface2 transition"
          aria-label="Toggle menu"
        >
          {mobileOpen ? (
            <svg className="w-5 h-5 text-fg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-5 h-5 text-fg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile slide-down */}
      {mobileOpen && (
        <div className="absolute left-0 right-0 top-[72px] z-50 md:hidden border-b border-border bg-surface/95 backdrop-blur-lg shadow-xl">
          <div className="mx-auto max-w-6xl px-6 py-4 space-y-1">
            <a
              href="#platform"
              onClick={() => setMobileOpen(false)}
              className="block px-3 py-2.5 rounded-lg text-sm text-muted hover:text-fg hover:bg-surface2/60 transition"
            >
              Platform
            </a>
            {ALL_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="block px-3 py-2.5 rounded-lg text-sm text-muted hover:text-fg hover:bg-surface2/60 transition"
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-3 pb-1 flex gap-2.5">
              <Link
                href="/eventedge"
                onClick={() => setMobileOpen(false)}
                className="flex-1 inline-flex items-center justify-center rounded-xl border border-border bg-surface hover:bg-surface2 px-4 py-2.5 text-sm font-semibold text-fg transition"
              >
                EventEdge
              </Link>
              <Link
                href="/dashboard"
                onClick={() => setMobileOpen(false)}
                className="flex-1 inline-flex items-center justify-center rounded-xl bg-accentGold px-4 py-2.5 text-sm font-semibold text-ink hover:opacity-90 transition"
              >
                Dashboard
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
