import Link from "next/link"

export default function ProofClaw() {
  return (
    <main className="min-h-screen bg-[#06080e] text-[#e8edf5]">
      <div className="mx-auto max-w-5xl px-6 py-12">
        <Link className="text-sm text-[#a0b0c8] hover:text-[#e8edf5]" href="/">
          &larr; Back
        </Link>
        <h1 className="mt-6 text-4xl font-semibold tracking-tight">
          ProofClaw + EdgeBlocks
        </h1>
        <p className="mt-4 text-lg text-[#a0b0c8]">
          Subpage: explain how ProofClaw enriches EdgeBlocks, then link out to
          proofclaw.io.
        </p>
        <div className="mt-10 flex gap-3">
          <a
            className="rounded-xl bg-[#22d3ee] px-5 py-3 text-sm font-semibold text-[#06080e] hover:opacity-90"
            href="https://proofclaw.io"
          >
            Visit proofclaw.io
          </a>
          <Link
            className="rounded-xl border border-[#243352] px-5 py-3 text-sm hover:bg-[#0e1525]"
            href="/"
          >
            Back to EdgeBlocks
          </Link>
        </div>
      </div>
    </main>
  );
}
