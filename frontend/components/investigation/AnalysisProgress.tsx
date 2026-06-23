"use client";

export default function AnalysisProgress() {

  const stages = [
    "Threat Ingested",
    "Running AI Analysis",
    "Extracting IOCs",
    "MITRE Correlation",
    "Memory Matching",
    "Generating Verdict",
  ];

  return (

    <div
      className="
      border
      border-cyan-500/20
      bg-cyan-950/10
      rounded-2xl
      p-6
      mb-6
    "
    >

      <div
        className="
        text-cyan-400
        text-xs
        tracking-[0.3em]
        mb-5
      "
      >
        LIVE ANALYSIS
      </div>

      <div className="space-y-4">

        {stages.map((stage) => (

          <div
            key={stage}
            className="
            flex
            items-center
            gap-4
          "
          >

            <div
              className="
              w-3
              h-3
              rounded-full
              bg-cyan-400
              animate-pulse
            "
            />

            <div>{stage}</div>

          </div>

        ))}

      </div>

    </div>

  );
}