import { Button, Card, Chip, Container, SectionHeading } from "@/components/ui";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Container>
        {/* Top nav */}
        <header className="flex items-center justify-between gap-4 py-10">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-accentGold via-accentCyan to-accentPurple opacity-90" />
            <div>
              <div className="text-xs font-mono text-muted">EDGEBLOCKS</div>
              <div className="text-lg font-semibold">Modular crypto intelligence</div>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-6 text-sm text-muted">
            <a className="hover:text-fg" href="#platform">Platform</a>
            <a className="hover:text-fg" href="/proofclaw">ProofClaw</a>
            <a className="hover:text-fg" href="/datasnipe">Track record</a>
          </nav>

          <div className="flex items-center gap-3">
            <Button href="/proofclaw" variant="secondary">Trust layer</Button>
            <Button href="https://app.edgeblocks.io" variant="primary">Enter App</Button>
          </div>
        </header>

        {/* Hero */}
        <section className="pt-4 pb-10">
          <Chip>ONE DATABASE &bull; ONE FLYWHEEL &bull; ONE TOKEN</Chip>

          <h1 className="mt-6 text-4xl md:text-6xl font-semibold tracking-tight max-w-4xl">
            Turn on-chain noise into signal—fast, modular, and composable.
          </h1>

          <p className="mt-5 max-w-2xl text-lg text-muted leading-relaxed">
            EdgeBlocks is a modular platform for collecting, normalizing, and scoring crypto data—powering alerts,
            dashboards, and agent workflows with a single intelligence layer.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Button href="https://app.edgeblocks.io" variant="primary">
              Enter App (app.edgeblocks.io)
            </Button>
            <Button href="#platform" variant="secondary">
              Explore the platform
            </Button>
            <Button href="/proofclaw" variant="ghost">
              How ProofClaw enriches EdgeBlocks &rarr;
            </Button>
          </div>

          {/* Metric chips */}
          <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-2xl border border-border bg-surface/70 p-4 backdrop-blur">
              <div className="text-xs font-mono text-muted">FOCUS</div>
              <div className="mt-1 font-semibold">Signals</div>
              <div className="mt-1 text-sm text-muted">Regime-aware scoring &amp; validation.</div>
            </div>
            <div className="rounded-2xl border border-border bg-surface/70 p-4 backdrop-blur">
              <div className="text-xs font-mono text-muted">OUTPUTS</div>
              <div className="mt-1 font-semibold">Alerts</div>
              <div className="mt-1 text-sm text-muted">Fast, explainable triggers.</div>
            </div>
            <div className="rounded-2xl border border-border bg-surface/70 p-4 backdrop-blur">
              <div className="text-xs font-mono text-muted">SURFACE</div>
              <div className="mt-1 font-semibold">Apps + agents</div>
              <div className="mt-1 text-sm text-muted">Composable workflows.</div>
            </div>
            <div className="rounded-2xl border border-border bg-surface/70 p-4 backdrop-blur">
              <div className="text-xs font-mono text-muted">PRINCIPLE</div>
              <div className="mt-1 font-semibold">Modular by design</div>
              <div className="mt-1 text-sm text-muted">Swap blocks without rewrites.</div>
            </div>
          </div>
        </section>

        {/* Platform */}
        <section id="platform" className="py-10">
          <SectionHeading
            eyebrow="PLATFORM"
            title="A modular stack for crypto intelligence"
            desc="EdgeBlocks is built as a set of composable layers—data → features → intelligence → outputs—so each part can evolve without breaking the rest."
          />

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            <Card label="DATA ENGINE" title="EdgeCore + EdgeBank">
              Collection, normalization, caching, and a feature store that turns raw feeds into consistent primitives you can reuse everywhere.
            </Card>
            <Card label="INTELLIGENCE" title="EdgeMind">
              Validation and scoring that learns what matters—signals, compatibility, and confidence—so users get decisions, not dashboards.
            </Card>
            <Card label="EXECUTION" title="EdgeBlocks Apps">
              Alerts, dashboards, agents, and workflows—built on the same blocks so outputs stay consistent across surfaces.
            </Card>
          </div>
        </section>

        {/* ProofClaw light mention */}
        <section className="py-10">
          <div className="rounded-2xl border border-border bg-surface p-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div className="max-w-2xl">
                <div className="text-xs font-mono text-muted">TRUST LAYER</div>
                <div className="mt-2 text-xl font-semibold">ProofClaw</div>
                <div className="mt-2 text-sm text-muted leading-relaxed">
                  ProofClaw adds verifiable trust to the ecosystem—badges, evidence, and partner-friendly &ldquo;trust artifacts&rdquo;
                  for agents and outputs that run on EdgeBlocks.
                </div>
              </div>
              <div className="flex flex-wrap gap-3">
                <Button href="/proofclaw" variant="secondary">Learn how it works</Button>
                <Button href="https://proofclaw.io" variant="proof">Visit ProofClaw</Button>
              </div>
            </div>
          </div>
        </section>

        {/* DataSnype light mention */}
        <section className="pb-14">
          <div className="rounded-2xl border border-border bg-surface p-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div className="max-w-2xl">
                <div className="text-xs font-mono text-muted">TRACK RECORD</div>
                <div className="mt-2 text-xl font-semibold">DataSnype (2–3 years)</div>
                <div className="mt-2 text-sm text-muted leading-relaxed">
                  We&apos;ve been collecting and operating on-chain data in production for years. EdgeBlocks is the next step:
                  from pipelines and bots &rarr; to a modular intelligence platform.
                </div>
              </div>
              <div className="flex flex-wrap gap-3">
                <Button href="/datasnipe" variant="secondary">What we built</Button>
                <Button href="https://datasnipe.io" variant="datasnipe">Visit DataSnype</Button>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-border py-10 text-sm text-muted2">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>&copy; {new Date().getFullYear()} EdgeBlocks</div>
            <div className="flex flex-wrap gap-4">
              <a className="hover:text-fg" href="/proofclaw">ProofClaw</a>
              <a className="hover:text-fg" href="/datasnipe">DataSnype</a>
              <a className="hover:text-fg" href="https://app.edgeblocks.io">Enter App</a>
            </div>
          </div>
        </footer>
      </Container>
    </main>
  );
}
