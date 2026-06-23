"use client";

import { useEffect, useState } from "react";
import CountUp from "react-countup";
import { getStats } from "@/services/stats";

export default function LiveStats() {

  const [stats, setStats] = useState<any>(null);

  useEffect(() => {

    loadStats();

    const interval = setInterval(
      loadStats,
      5000
    );

    return () => clearInterval(interval);

  }, []);

  async function loadStats() {

    try {

      const data = await getStats();

      setStats(data);

    } catch (error) {

      console.log(error);

    }

  }

  if (!stats) {

    return (

      <div className="text-cyan-400 animate-pulse">
        CONNECTING TO THREAT DATABASE...
      </div>

    );

  }

  return (

    <div
      className="
      grid
      grid-cols-1
      sm:grid-cols-2
      lg:grid-cols-4
      gap-5
      mt-12
    "
    >

      {/* THREATS */}

      <div className="relative rounded-2xl border border-cyan-500/20 bg-black/50 backdrop-blur-md p-6">

        <div className="absolute top-0 left-0 h-[2px] w-full bg-cyan-400 animate-pulse" />

        <div className="text-zinc-500 text-xs">
          THREATS ANALYZED
        </div>

        <div className="text-4xl font-black text-cyan-300">

          <CountUp
            end={stats.total_threats}
            duration={2}
          />

        </div>

      </div>

      {/* HIGH RISK */}

      <div className="relative rounded-2xl border border-orange-500/20 bg-black/50 backdrop-blur-md p-6">

        <div className="absolute top-0 left-0 h-[2px] w-full bg-orange-400 animate-pulse" />

        <div className="text-zinc-500 text-xs">
          HIGH RISK THREATS
        </div>

        <div className="text-4xl font-black text-orange-300">

          <CountUp
            end={stats.high_risk_threats}
            duration={2}
          />

        </div>

      </div>

      {/* CRITICAL */}

      <div className="relative rounded-2xl border border-red-500/20 bg-black/50 backdrop-blur-md p-6">

        <div className="absolute top-0 left-0 h-[2px] w-full bg-red-400 animate-pulse" />

        <div className="text-zinc-500 text-xs">
          CRITICAL EVENTS
        </div>

        <div className="text-4xl font-black text-red-300">

          <CountUp
            end={stats.critical_threats}
            duration={2}
          />

        </div>

      </div>

      {/* SCORE */}

      <div className="relative rounded-2xl border border-green-500/20 bg-black/50 backdrop-blur-md p-6">

        <div className="absolute top-0 left-0 h-[2px] w-full bg-green-400 animate-pulse" />

        <div className="text-zinc-500 text-xs">
          INTELLIGENCE SCORE
        </div>

        <div className="text-4xl font-black text-green-300">

          <CountUp
            end={stats.average_intelligence_score}
            decimals={2}
            duration={2}
          />

        </div>

      </div>

    </div>

  );

}