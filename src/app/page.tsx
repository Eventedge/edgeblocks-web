import Link from "next/link"

export default function Home() {
  return (
    <main className="min-h-screen bg-[#06080e] text-[#e8edf5]">
      <div className="mx-auto max-w-6xl px-6 py-10">
        <header className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-[#f5c842] via-[#22d3ee] to-[#a78bfa] opacity-90" />
            <div>
              <div className="text-xs font-mono text-[#a0b0c8]">EDGEBLOCKS</div>
              <div className="text-lg font-semibold">Modular crypto intelligence</div>
            </div>
          </div>
          <nav className="hidden md:flex items-center gap-6 text-sm text-[#a0b0c8]">
            <Link className="hover:text-[#e8edf5]" href="/proofclaw">ProofClaw</Link>
            <Link className="hover:text-[#e8edf5]" href="/datasnipe">Track record</Link>
          </nav>
          <a
            className="rounded-xl bg-[#f5c842] px-4 py-2 text-sm font-semibold text-[#06080e] hover:opacity-90"
            href="#enter-app"
          >
            Enter App
          </a>
        </header>

        <section className="mt-14">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#1a2540] bg-[#0a0f1a] px-4 py-2 text-xs font-mono text-[#a0b0c8]">
            ONE DATABASE &bull; ONE FLYWHEEL &bull; ONE TOKEN
          </div>
          <h1 className="mt-6 text-4xl md:text-6xl font-semibold tracking-tight">
            EdgeBlocks turns on-chain data into actionable intelligence.
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-[#a0b0c8]">
            Modular platform for signals, validation, and execution—built for traders, builders, and agent ecosystems.
          </p>
        </section>

        <section className="mt-14 grid gap-4 md:grid-cols-3">
          {[
            {t:"Data Engine", d:"Collection, normalization, feature store."},
            {t:"Intelligence Layer", d:"Validation, scoring, regime-aware signals."},
            {t:"Execution Surface", d:"Apps + agents: alerts, dashboards, workflows."},
          ].map((c) => (
            <div key={c.t} className="rounded-2xl border border-[#1a2540] bg-[#0a0f1a] p-6">
              <div className="text-xs font-mono text-[#a0b0c8]">MODULE</div>
              <div className="mt-2 text-xl font-semibold">{c.t}</div>
              <div className="mt-2 text-sm text-[#a0b0c8]">{c.d}</div>
            </div>
          ))}
        </section>

        <section className="mt-14 rounded-2xl border border-[#1a2540] bg-[#0a0f1a] p-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <div className="text-xs font-mono text-[#a0b0c8]">TRUST LAYER</div>
              <div className="mt-2 text-xl font-semibold">ProofClaw</div>
              <div className="mt-2 text-sm text-[#a0b0c8]">
                Mentioned lightly here. Deep dive on the subpage + link to proofclaw.io.
              </div>
            </div>
            <div className="flex gap-3">
              <Link className="rounded-xl border border-[#243352] px-4 py-2 text-sm hover:bg-[#0e1525]" href="/proofclaw">
                Learn how it works
              </Link>
              <a className="rounded-xl bg-[#22d3ee] px-4 py-2 text-sm font-semibold text-[#06080e] hover:opacity-90" href="https://proofclaw.io">
                proofclaw.io
              </a>
            </div>
          </div>
        </section>

        <section className="mt-6 rounded-2xl border border-[#1a2540] bg-[#0a0f1a] p-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <div className="text-xs font-mono text-[#a0b0c8]">TRACK RECORD</div>
              <div className="mt-2 text-xl font-semibold">DataSnype</div>
              <div className="mt-2 text-sm text-[#a0b0c8]">
                2–3 years of production on-chain data work. Full details on the subpage + link to datasnipe.io.
              </div>
            </div>
            <div className="flex gap-3">
              <Link className="rounded-xl border border-[#243352] px-4 py-2 text-sm hover:bg-[#0e1525]" href="/datasnipe">
                What we built
              </Link>
              <a className="rounded-xl bg-[#34d399] px-4 py-2 text-sm font-semibold text-[#06080e] hover:opacity-90" href="https://datasnipe.io">
                datasnipe.io
              </a>
            </div>
          </div>
        </section>

        <section id="enter-app" className="mt-14 rounded-2xl border border-[#1a2540] bg-[#0a0f1a] p-6">
          <div className="text-xs font-mono text-[#a0b0c8]">APP</div>
          <div className="mt-2 text-xl font-semibold">app.edgeblocks.io</div>
          <div className="mt-2 text-sm text-[#a0b0c8]">
            App button wiring will be set once the app subdomain is ready.
          </div>
        </section>

        <footer className="mt-16 border-t border-[#1a2540] py-10 text-sm text-[#607590]">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>&copy; {new Date().getFullYear()} EdgeBlocks</div>
            <div className="flex gap-4">
              <Link className="hover:text-[#e8edf5]" href="/proofclaw">ProofClaw</Link>
              <Link className="hover:text-[#e8edf5]" href="/datasnipe">DataSnype</Link>
            </div>
          </div>
        </footer>
      </div>
    </main>
  )
}
