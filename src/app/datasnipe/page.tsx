import Link from "next/link"

export default function DataSnype() {
  return (
    <main className="min-h-screen bg-[#06080e] text-[#e8edf5]">
      <div className="mx-auto max-w-5xl px-6 py-12">
        <Link className="text-sm text-[#a0b0c8] hover:text-[#e8edf5]" href="/">
          &larr; Back
        </Link>
        <h1 className="mt-6 text-4xl font-semibold tracking-tight">
          Track record: DataSnype
        </h1>
        <p className="mt-4 text-lg text-[#a0b0c8]">
          Subpage: credibility and what we shipped for 2–3 years, then link out
          to datasnipe.io.
        </p>
        <div className="mt-10 flex gap-3">
          <a
            className="rounded-xl bg-[#34d399] px-5 py-3 text-sm font-semibold text-[#06080e] hover:opacity-90"
            href="https://datasnipe.io"
          >
            Visit datasnipe.io
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
