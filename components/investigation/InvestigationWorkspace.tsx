"use client";

import { useState } from "react";

import IOCPanel from "./IOCPanel";
import OperationsFeed from "./OperationsFeed";
import ThreatTimeline from "./ThreatTimeline";
import RecommendedActions from "./RecommendedActions";

type Props = {
  result: any;
};

export default function InvestigationWorkspace({
  result,
}: Props) {

  const [tab, setTab] =
    useState("iocs");

  const tabs = [
    "iocs",
    "operations",
    "timeline",
    "actions",
  ];

  return (

    <div
      className="
      border
      border-cyan-500/20
      bg-cyan-950/10
      rounded-2xl
      overflow-hidden
    "
    >

      {/* HEADER */}

      <div
        className="
        border-b
        border-cyan-500/10
        p-4
      "
      >

        <div className="flex flex-wrap gap-3">

          {tabs.map((item) => (

            <button
              key={item}
              onClick={() =>
                setTab(item)
              }
              className={`
                px-4
                py-2
                rounded-lg
                text-sm
                capitalize
                transition-all

                ${
                  tab === item
                    ? "bg-cyan-500/20 border border-cyan-400 text-cyan-300"
                    : "border border-zinc-800 text-zinc-400"
                }
              `}
            >
              {item}
            </button>

          ))}

        </div>

      </div>

      {/* CONTENT */}

      <div className="p-6">

        {tab === "iocs" && (

          <IOCPanel
            iocs={result.analysis.iocs}
          />

        )}

        {tab === "operations" && (

          <OperationsFeed
            result={result}
          />

        )}

        {tab === "timeline" && (

          <ThreatTimeline />

        )}

        {tab === "actions" && (

          <RecommendedActions
            analysis={result.analysis}
          />

        )}

      </div>

    </div>

  );
}