"use client";

type Props = {
  analysis: any;
};

export default function RecommendedActions({
  analysis,
}: Props) {

  const risk =
    analysis?.risk_level || "Low";

  const actions = [];

  if (
    risk === "Critical" ||
    risk === "High"
  ) {

    actions.push(
      "Block all malicious domains",
      "Quarantine suspicious emails",
      "Reset affected credentials",
      "Notify security operations center",
      "Initiate incident response process"
    );

  } else {

    actions.push(
      "Monitor indicators",
      "Continue investigation",
      "Hunt related activity",
      "Review user exposure"
    );

  }

  return (

    <div
      className="
      border
      border-orange-500/20
      bg-orange-950/10
      backdrop-blur-md
      rounded-2xl
      p-6
    "
    >

      <div className="flex justify-between mb-6">

        <div
          className="
          text-orange-400
          text-xs
          tracking-[0.3em]
        "
        >
          RECOMMENDED ACTIONS
        </div>

        <div
          className="
          px-3
          py-1
          rounded-full
          border
          border-orange-500/20
          text-orange-300
          text-xs
        "
        >
          {risk}
        </div>

      </div>

      <div className="space-y-3">

        {actions.map((action) => (

          <div
            key={action}
            className="
            border
            border-orange-500/10
            rounded-xl
            p-4
            flex
            gap-3
            items-start
          "
          >

            <div className="text-orange-400">
              ▶
            </div>

            <div>
              {action}
            </div>

          </div>

        ))}

      </div>

    </div>

  );
}