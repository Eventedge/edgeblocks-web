import Link from "next/link";
import { Button, Card, Container, SectionHeading } from "@/components/ui";

export default function ProofClawPage() {
  return (
    <main className="min-h-screen">
      <Container>
        <header className="flex items-center justify-between gap-4 py-10">
          <Link className="text-sm text-muted hover:text-fg" href="/">&larr; Back to EdgeBlocks</Link>
          <div className="flex gap-3">
            <Button href="https://proofclaw.io" variant="proof">Visit ProofClaw</Button>
            <Button href="/dashboard" variant="secondary">Dashboard</Button>
          </div>
        </header>

        <section className="pb-10">
          <SectionHeading
            eyebrow="INTEGRATION"
            title="ProofClaw enriches EdgeBlocks with verifiable trust"
            desc="EdgeBlocks powers intelligence and execution. ProofClaw adds the missing trust layer: badges, evidence, and policy-driven verification so partners and users can rely on agent outputs."
          />
        </section>

        <section className="grid gap-4 md:grid-cols-3 pb-10">
          <Card label="WHERE IT SITS" title="Before + after execution">
            ProofClaw can gate actions before a tool runs, and it can produce trust artifacts after results are generated.
          </Card>
          <Card label="WHAT IT PRODUCES" title="Badges + evidence">
            Turn work into shareable trust cards: what ran, under what policy, with what guarantees and controls.
          </Card>
          <Card label="WHY IT MATTERS" title="Partner-grade onboarding">
            Faster partnerships, safer distribution, and clearer accountability for agent systems and automations.
          </Card>
        </section>

        <section className="pb-10">
          <div className="rounded-2xl border border-border bg-surface p-6">
            <div className="text-xs font-mono text-muted">FLOW</div>
            <div className="mt-2 text-xl font-semibold">A simple integration model</div>
            <ol className="mt-4 list-decimal pl-5 text-sm text-muted space-y-2 leading-relaxed">
              <li>EdgeBlocks prepares inputs (features, signals, context).</li>
              <li>An agent or workflow executes actions (alerts, reports, automations).</li>
              <li>ProofClaw enforces policy + produces verification evidence.</li>
              <li>Outputs ship with a trust artifact (badge/trust card) for users and partners.</li>
            </ol>
          </div>
        </section>

        <section className="pb-14">
          <SectionHeading
            eyebrow="USE CASES"
            title="What this unlocks"
            desc="Trust artifacts make it easier to distribute agents, sell outcomes, and integrate with partner ecosystems."
          />
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <Card label="PARTNERS" title="Trust center + shareable proofs">
              Publish a trust page for your automations and agent packs so partners can embed, verify, and adopt faster.
            </Card>
            <Card label="PRODUCT" title="Safer automations at scale">
              Prevent risky tools/actions without approval, and attach verifiable context to every output.
            </Card>
            <Card label="ECOSYSTEM" title="Verified agent marketplace">
              Rank and distribute agents with transparent trust signals, not just marketing claims.
            </Card>
            <Card label="GROWTH" title="Higher conversion">
              Trust badges increase confidence—especially for teams adopting agents inside real workflows.
            </Card>
          </div>

          <div className="mt-10 flex flex-wrap gap-3">
            <Button href="https://proofclaw.io" variant="proof">Visit ProofClaw</Button>
            <Button href="/" variant="secondary">Back to EdgeBlocks</Button>
          </div>
        </section>
      </Container>
    </main>
  );
}
