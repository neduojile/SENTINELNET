"use client";

type Props = {
  result: any;
};

export default function ThreatSummaryBar({
  result,
}: Props) {

  const risk =
    result.analysis.risk_level;

  const confidence =
    result.analysis.confidence;

  const iocs =
    (result.analysis.iocs?.domains?.length || 0)
    +
    (result.analysis.iocs?.urls?.length || 0)
    +
    (result.analysis.iocs?.emails?.length || 0)
    +
    (result.analysis.iocs?.ips?.length || 0);

  const matches =
    result.memory_match?.matches_found || 0;

  function riskColor() {

    if (risk === "Critical")
      return "text-red-500";

    if (risk === "High")
      return "text-orange-400";

    if (risk === "Medium")
      return "text-yellow-400";

    return "text-green-400";
  }

  return (

    <div
      className="
      grid
      grid-cols-2
      lg:grid-cols-5
      gap-4
      mb-6
    "
    >

      <MetricCard
        title="Risk"
        value={risk}
        color={riskColor()}
      />

      <MetricCard
        title="Confidence"
        value={`${confidence}%`}
      />

      <MetricCard
        title="Category"
        value={result.analysis.threat_category}
      />

      <MetricCard
        title="IOCs"
        value={iocs}
      />

      <MetricCard
        title="Memory"
        value={matches}
      />

    </div>

  );
}

function MetricCard({
  title,
  value,
  color = "text-cyan-300",
}: {
  title: string;
  value: any;
  color?: string;
}) {

  return (

    <div
      className="
      border
      border-cyan-500/20
      bg-cyan-950/10
      rounded-xl
      p-4
      backdrop-blur-md
    "
    >

      <div
        className="
        text-zinc-500
        text-xs
        uppercase
        tracking-[0.2em]
      "
      >
        {title}
      </div>

      <div
        className={`
        mt-2
        text-2xl
        font-black
        ${color}
      `}
      >
        {value}
      </div>

    </div>

  );
}