"use client";

export default function ThreatTimeline() {

  const events = [
    "Threat Submitted",
    "IOC Extraction Complete",
    "Genome Analysis Complete",
    "Threat Correlation Complete",
    "Risk Scoring Complete",
    "Investigation Completed",
  ];

  return (
    <div className="border border-cyan-900 rounded-xl p-6 bg-zinc-950">

      <div className="text-cyan-400 text-xs tracking-[0.3em] mb-4">
        INVESTIGATION TIMELINE
      </div>

      <div className="space-y-4">

        {events.map((event, index) => (

          <div
            key={event}
            className="
              border-l-2
              border-green-500
              pl-4
              py-2
            "
          >

            <div className="text-green-400 text-xs">
              STAGE {index + 1}
            </div>

            <div>
              {event}
            </div>

          </div>

        ))}

      </div>

    </div>
  );
}