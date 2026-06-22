"use client";

const stages = [
  {
    name: "Threat Received",
    status: "complete",
  },
  {
    name: "IOC Extraction",
    status: "complete",
  },
  {
    name: "Memory Correlation",
    status: "complete",
  },
  {
    name: "MITRE Mapping",
    status: "complete",
  },
  {
    name: "Risk Scoring",
    status: "complete",
  },
  {
    name: "Executive Verdict",
    status: "complete",
  },
];

export default function InvestigationPipeline() {

  return (

    <div
      className="
      border
      border-cyan-500/20
      rounded-2xl
      bg-cyan-950/10
      p-6
      mb-6
    "
    >

      <div
        className="
        text-cyan-400
        text-xs
        tracking-[0.3em]
        mb-6
      "
      >
        INVESTIGATION PIPELINE
      </div>

      <div
        className="
        grid
        md:grid-cols-6
        gap-4
      "
      >

        {stages.map((stage) => (

          <div
            key={stage.name}
            className="
            flex
            flex-col
            items-center
            text-center
          "
          >

            <div
              className="
              w-12
              h-12
              rounded-full
              bg-green-500/20
              border
              border-green-500
              flex
              items-center
              justify-center
              text-green-400
              font-bold
              animate-pulse
            "
            >
              ✓
            </div>

            <div
              className="
              mt-3
              text-xs
              text-zinc-300
            "
            >
              {stage.name}
            </div>

          </div>

        ))}

      </div>

    </div>

  );
}