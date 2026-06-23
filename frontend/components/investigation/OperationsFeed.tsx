"use client";

type Props = {
  result: any;
};

export default function OperationsFeed({
  result,
}: Props) {

  if (!result) return null;

  const logs = [

    {
      status: "SUCCESS",
      message: "Threat Submission Received",
    },

    {
      status: "INFO",
      message: `Category: ${result.analysis.threat_category}`,
    },

    {
      status: "WARNING",
      message: `Risk Level: ${result.analysis.risk_level}`,
    },

    {
      status: "INFO",
      message: `Confidence: ${result.analysis.confidence}%`,
    },

    {
      status: "SUCCESS",
      message: `IOCs Extracted: ${
        (result.analysis.iocs?.domains?.length || 0) +
        (result.analysis.iocs?.urls?.length || 0) +
        (result.analysis.iocs?.emails?.length || 0) +
        (result.analysis.iocs?.ips?.length || 0)
      }`,
    },

    {
      status: "INFO",
      message: `Fingerprint Generated`,
    },

    {
      status: "SUCCESS",
      message: "Threat Correlation Completed",
    },

    {
      status: "SUCCESS",
      message: "Investigation Finished",
    },

  ];

  function statusColor(status: string) {

    switch (status) {

      case "SUCCESS":
        return "text-green-400";

      case "WARNING":
        return "text-orange-400";

      default:
        return "text-cyan-400";

    }

  }

  return (

    <div
      className="
      border
      border-cyan-500/20
      bg-cyan-950/10
      backdrop-blur-md
      rounded-2xl
      p-6
      shadow-[0_0_40px_rgba(0,255,255,0.08)]
    "
    >

      <div className="flex justify-between items-center mb-6">

        <div
          className="
          text-cyan-400
          text-xs
          tracking-[0.3em]
        "
        >
          OPERATIONS FEED
        </div>

        <div
          className="
          text-green-400
          text-xs
          animate-pulse
        "
        >
          ● LIVE
        </div>

      </div>

      <div
        className="
        max-h-[420px]
        overflow-y-auto
        space-y-4
      "
      >

        {logs.map((log, index) => (

          <div
            key={index}
            className="
            relative
            border-l-2
            border-cyan-500/20
            pl-5
            pb-2
          "
          >

            <div
              className="
              absolute
              -left-[7px]
              top-2
              w-3
              h-3
              rounded-full
              bg-cyan-400
            "
            />

            <div
              className="
              flex
              justify-between
              items-center
              mb-1
            "
            >

              <div
                className={`
                text-xs
                font-semibold
                ${statusColor(log.status)}
              `}
              >
                {log.status}
              </div>

              <div className="text-zinc-500 text-xs">
                {new Date().toLocaleTimeString()}
              </div>

            </div>

            <div className="text-zinc-200">
              {log.message}
            </div>

          </div>

        ))}

      </div>

      <div
        className="
        mt-6
        grid
        grid-cols-3
        gap-3
      "
      >

        <div className="border border-cyan-500/10 rounded-xl p-3 text-center">
          <div className="text-cyan-400 text-xs">
            EVENTS
          </div>

          <div className="text-2xl font-black">
            {logs.length}
          </div>
        </div>

        <div className="border border-green-500/10 rounded-xl p-3 text-center">
          <div className="text-green-400 text-xs">
            STATUS
          </div>

          <div className="text-green-400 font-bold">
            ACTIVE
          </div>
        </div>

        <div className="border border-orange-500/10 rounded-xl p-3 text-center">
          <div className="text-orange-400 text-xs">
            RISK
          </div>

          <div className="font-bold">
            {result.analysis.risk_level}
          </div>
        </div>

      </div>

    </div>

  );
}