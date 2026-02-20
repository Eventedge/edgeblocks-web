import Link from "next/link";
import { Button, Card, Container, SectionHeading } from "@/components/ui";

export default function DataSnypePage() {
  return (
    <main className="min-h-screen">
      <Container>
        <header className="flex items-center justify-between gap-4 py-10">
          <Link className="text-sm text-muted hover:text-fg" href="/">&larr; Back to EdgeBlocks</Link>
          <div className="flex gap-3">
            <Button href="https://datasnype.io" variant="datasnype">Visit DataSnype</Button>
            <Button href="/dashboard" variant="secondary">Dashboard</Button>
          </div>
        </header>

        <section className="pb-10">
          <SectionHeading
            eyebrow="TRACK RECORD"
            title="DataSnype: years of production on-chain ops"
            desc="Before EdgeBlocks, we built and operated DataSnype—pipelines, bots, and analytics for live on-chain environments. EdgeBlocks is the platform evolution: modular, composable, and built to scale."
          />
        </section>

        <section className="grid gap-4 md:grid-cols-3 pb-10">
          <Card label="OPERATIONS" title="Real production constraints">
            Reliability, rate limits, caching, multi-source validation, and cost controls—learned the hard way in live markets.
          </Card>
          <Card label="DATA" title="From raw feeds to primitives">
            Turning messy on-chain activity into normalized features and reusable building blocks.
          </Card>
          <Card label="EVOLUTION" title="From product &rarr; platform">
            EdgeBlocks generalizes what worked into modular layers that can power many apps, not just one.
          </Card>
        </section>

        <section className="pb-10">
          <div className="rounded-2xl border border-border bg-surface p-6">
            <div className="text-xs font-mono text-muted">WHY IT&apos;S RELEVANT</div>
            <div className="mt-2 text-xl font-semibold">Building on proven infrastructure</div>
            <p className="mt-3 text-sm text-muted leading-relaxed">
              EdgeBlocks isn&apos;t starting from scratch. The data engine, caching layers, and normalization
              pipelines that power the platform were battle-tested inside DataSnype—handling real volume,
              real rate limits, and real market conditions for years before becoming the foundation of
              a modular intelligence stack.
            </p>
          </div>
        </section>

        <section className="pb-14">
          <SectionHeading
            eyebrow="WHAT WE SHIPPED"
            title="Key capabilities built inside DataSnype"
            desc="Each of these became a building block in EdgeBlocks."
          />
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <Card label="COLLECTION" title="Multi-source ingestion">
              On-chain RPCs, DEX APIs, aggregator feeds, and social signals—normalized into a single schema.
            </Card>
            <Card label="PROCESSING" title="Feature engineering">
              Real-time and batch pipelines that transform raw data into scored, validated features.
            </Card>
            <Card label="DELIVERY" title="Alerts &amp; dashboards">
              Production alert systems with configurable thresholds, cooldowns, and multi-channel delivery.
            </Card>
            <Card label="RELIABILITY" title="Uptime under pressure">
              Graceful degradation, fallback sources, and health monitoring across every data path.
            </Card>
          </div>

          <div className="mt-10 flex flex-wrap gap-3">
            <Button href="https://datasnype.io" variant="datasnype">Visit DataSnype</Button>
            <Button href="/" variant="secondary">Back to EdgeBlocks</Button>
          </div>
        </section>
      </Container>
    </main>
  );
}
