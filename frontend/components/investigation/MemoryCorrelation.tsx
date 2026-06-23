"use client";

type Props = {
  result: any;
};

export default function MemoryCorrelation({
  result,
}: Props) {

  const matches =
    result?.memory_match?.matches_found || 0;

  return (

    <div
      className="
      border
      border-purple-500/20
      bg-purple-950/10
      backdrop-blur-md
      rounded-2xl
      p-6
    "
    >

      <div className="flex justify-between mb-5">

        <div className="text-purple-400 text-xs tracking-[0.3em]">
          THREAT MEMORY
        </div>

        <div className="text-purple-300">
          ACTIVE
        </div>

      </div>

      <div className="text-6xl font-black text-purple-300">
        {matches}
      </div>

      <div className="text-zinc-400 mb-6">
        Historical Campaign Matches
      </div>

      <div className="space-y-3">

        <div className="border border-purple-500/10 rounded-xl p-3">
          Genome Fingerprint Correlation
        </div>

        <div className="border border-purple-500/10 rounded-xl p-3">
          IOC Similarity Analysis
        </div>

        <div className="border border-purple-500/10 rounded-xl p-3">
          Behavioral Pattern Matching
        </div>

      </div>

    </div>

  );
}