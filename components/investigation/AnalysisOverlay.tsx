"use client";

import { useEffect, useState } from "react";

type Props = {
  loading: boolean;
};

const stages = [
  "Threat Submission Received",
  "Extracting Indicators of Compromise",
  "Running Threat Genome Correlation",
  "Querying Threat Memory Database",
  "Mapping MITRE ATT&CK Techniques",
  "Generating Executive Intelligence Brief",
];

export default function AnalysisOverlay({
  loading,
}: Props) {

  const [completed, setCompleted] =
    useState<number>(0);

  useEffect(() => {

    if (!loading) {
      setCompleted(0);
      return;
    }

    let current = 0;

    const interval = setInterval(() => {

      current++;

      setCompleted(current);

      if (current >= stages.length) {
        clearInterval(interval);
      }

    }, 1200);

    return () => clearInterval(interval);

  }, [loading]);

  if (!loading) return null;

  return (

    <div
      className="
      fixed
      inset-0
      z-[999]
      bg-black/95
      backdrop-blur-md
      flex
      items-center
      justify-center
    "
    >

      <div className="w-full max-w-3xl px-8">

        <div
          className="
          text-center
          text-cyan-400
          tracking-[0.5em]
          text-xs
          mb-6
        "
        >
          SENTINELNET THREAT GENOME ENGINE
        </div>

        <div
          className="
          text-center
          text-5xl
          font-black
          mb-10
        "
        >
          INVESTIGATION IN PROGRESS
        </div>

        <div
          className="
          h-2
          rounded-full
          overflow-hidden
          bg-zinc-900
          mb-10
        "
        >

          <div
            className="
            h-full
            bg-cyan-400
            animate-pulse
            w-full
          "
          />

        </div>

        <div className="space-y-4">

          {stages.map((stage, index) => {

            const done =
              index < completed;

            const active =
              index === completed;

            return (

              <div
                key={stage}
                className="
                flex
                items-center
                gap-3
              "
              >

                {done ? (

                  <div
                    className="
                    w-7
                    h-7
                    rounded-full
                    bg-green-500/20
                    border
                    border-green-500
                    flex
                    items-center
                    justify-center
                    text-green-400
                    animate-bounce
                  "
                  >
                    ✓
                  </div>

                ) : active ? (

                  <div
                    className="
                    w-7
                    h-7
                    rounded-full
                    border
                    border-cyan-400
                    animate-spin
                  "
                  />

                ) : (

                  <div
                    className="
                    w-7
                    h-7
                    rounded-full
                    border
                    border-zinc-700
                  "
                  />

                )}

                <div
                  className={`
                  ${
                    done
                      ? "text-green-400"
                      : active
                      ? "text-cyan-400 animate-pulse"
                      : "text-zinc-500"
                  }
                `}
                >
                  {stage}
                </div>

              </div>

            );

          })}

        </div>

      </div>

    </div>

  );
}