"use client";

import { useState } from "react";

import useThreatAnalysis from "@/hooks/useThreatAnalysis";

import ThreatRadar from "@/components/investigation/ThreatRadar";
import IntelligenceBrief from "@/components/investigation/IntelligenceBrief";
import IOCPanel from "@/components/investigation/IOCPanel";
import ThreatGraph from "@/components/investigation/ThreatGraph";
import ThreatTimeline from "@/components/investigation/ThreatTimeline";
import InvestigationWorkspace from "@/components/investigation/InvestigationWorkspace";
import OperationsFeed from "@/components/investigation/OperationsFeed";
import SystemTerminal from "@/components/investigation/SystemTerminal";
import MemoryCorrelation from "@/components/investigation/MemoryCorrelation";
import RecommendedActions from "@/components/investigation/RecommendedActions";
import ThreatSummaryBar from "@/components/investigation/ThreatSummaryBar";
import InvestigationPipeline from "@/components/investigation/InvestigationPipeline";
import AnalysisProgress from "@/components/investigation/AnalysisProgress";
import AnalysisOverlay from "@/components/investigation/AnalysisOverlay";
import { TypeAnimation } from "react-type-animation";
import {
 generateThreatReport,
} from "@/lib/reportGenerator";

export default function CommandCenter() {
const [content, setContent] = useState("");

const {
analyze,
loading,
result,
} = useThreatAnalysis();

async function handleAnalyze() {
if (!content.trim()) return;


await analyze(content);

setTimeout(() => {

  window.scrollTo({
    top: 900,
    behavior: "smooth",
  });

}, 500);


}

return (

<main className="min-h-screen text-white relative overflow-hidden">

  <AnalysisOverlay
    loading={loading}
  />

  {/* BACKGROUND */}

  <div className="fixed inset-0 -z-20">

    <img
      src="/assets/landing/eye.jpg"
      alt="background"
      className="
        w-full
        h-full
        object-cover
        opacity-30
        blur-sm
        scale-110
      "
    />

    <div className="absolute inset-0 bg-black/90" />

  </div>

  <div
    className="
      fixed
      inset-0
      -z-10
      cyber-grid
      opacity-40
    "
  />

  {/* HEADER */}

  <div className="border-b border-cyan-500/20 backdrop-blur-md">

    <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">
<div className="flex items-center gap-4">
<img
  src="/assets/sentinelnet-logo.png"
  alt="SentinelNet Logo"
  className="w-20 h-23 object-contain"
/>

  <h1
    className="
      text-4xl
      md:text-6xl
      font-black
      tracking-wide
    "
  >
    SENTINELNET
  </h1>

</div>

      <div
        className="
          text-cyan-400
          tracking-[0.4em]
          text-xs
          md:text-sm
          mt-3
        "
      >
        THREAT GENOME COMMAND CENTER
      </div>

      <p className="text-zinc-400 mt-4">
        Autonomous Threat Intelligence Investigation Workspace
      </p>

      {/* STATUS BAR */}

      <div
        className="
          flex
          flex-wrap
          gap-4
          md:gap-8
          mt-6
          text-xs
        "
      >
        <div className="text-green-400">
          ENGINE ONLINE
        </div>

        <div className="text-cyan-400">
          MEMORY ACTIVE
        </div>

        <div className="text-cyan-400">
          IOC EXTRACTION READY
        </div>

        <div className="text-cyan-400">
          MITRE READY
        </div>

        <div className="text-cyan-400">
          AI AGENTS ONLINE
        </div>
      </div>

    </div>

  </div>

  <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">

    {/* THREAT SUBMISSION + TERMINAL */}

    <div
      className="
        border
        border-cyan-500/20
        bg-cyan-950/10
        rounded-2xl
        p-4
        md:p-6
        mb-8
      "
    >

     <div className="mb-6 flex items-center gap-3">

  <span
    className="
    text-red-500
    animate-pulse
    text-lg
  "
  >
    ●
  </span>

  <TypeAnimation
    sequence={[
      "LIVE ANALYSIS CHANNEL",
      2000,

      "THREAT GENOME ENGINE ACTIVE",
      2000,

      "IOC EXTRACTION ONLINE",
      2000,

      "MEMORY CORRELATION ACTIVE",
      2000,

      "MITRE MAPPING READY",
      2000,
    ]}
    wrapper="span"
    speed={70}
    repeat={Infinity}
    className="
      text-red-400
      text-xs
      tracking-[0.4em]
      font-mono
    "
  />

</div>

      <div
        className="
          grid
          lg:grid-cols-[2fr_1fr]
          gap-6
        "
      >

        {/* LEFT */}

        <div>

          <div className="text-cyan-400 mb-4 font-semibold">
            THREAT SUBMISSION
          </div>

          <div className="text-zinc-500 text-xs mb-3">
            Emails • URLs • Reports • Indicators • IOC Dumps
          </div>

          <textarea
            value={content}
            onChange={(e) =>
              setContent(e.target.value)
            }
            placeholder="Paste email, URL, phishing content, threat report or IOC data..."
            className="
              w-full
              h-64
              bg-black/70
              border
              border-cyan-500/20
              rounded-xl
              p-4
              resize-none
              outline-none
              focus:border-cyan-400
              focus:shadow-[0_0_30px_rgba(0,255,255,0.3)]
              transition-all
            "
          />

          {/* MINI STATS */}

          <div
            className="
              grid
              grid-cols-2
              md:grid-cols-4
              gap-4
              mt-6
            "
          >

            <div className="border border-cyan-500/20 rounded-lg p-4">
              <div className="text-cyan-400 text-xs">
                ENGINE
              </div>
        <div className="text-green-400 font-bold animate-pulse">
  ONLINE
</div>
            </div>

            <div className="border border-cyan-500/20 rounded-lg p-4">
              <div className="text-cyan-400 text-xs">
                MEMORY
              </div>
      <div className="font-bold text-cyan-300">
  {loading ? "SYNCING..." : "ACTIVE"}
</div>
            </div>

            <div className="border border-cyan-500/20 rounded-lg p-4">
              <div className="text-cyan-400 text-xs">
                AGENTS
              </div>
            <div className="font-bold text-cyan-300">
  {loading ? "EXECUTING..." : "4 ONLINE"}
</div>
            </div>

            <div className="border border-cyan-500/20 rounded-lg p-4">
              <div className="text-cyan-400 text-xs">
                RESPONSE
              </div>
             <div className="font-bold text-yellow-300">
  {loading ? "PROCESSING" : "0.18s"}
</div>
            </div>

          </div>

          <button
            onClick={handleAnalyze}
            disabled={loading}
            className="
              mt-6
              px-8
              py-4
              rounded-xl
              border
              border-cyan-400
              bg-gradient-to-r
              from-cyan-500/20
              to-blue-500/20
              hover:scale-[1.02]
              hover:shadow-[0_0_40px_rgba(0,255,255,0.4)]
              transition-all
            "
          >
            {loading
              ? "ANALYZING..."
              : "INITIATE THREAT GENOME ANALYSIS"}
          </button>

        </div>

        {/* RIGHT */}

        <SystemTerminal />

      </div>

    </div>

    {loading && (
  <AnalysisProgress />
)}

 {result && (

      
<>

{/* EXECUTIVE THREAT BANNER */}

<div
  className={`
  mb-6
  rounded-2xl
  p-6
  border
  ${
    result.analysis.risk_level === "Critical"
      ? "border-red-500/40 bg-red-950/20"
      : result.analysis.risk_level === "High"
      ? "border-orange-500/40 bg-orange-950/20"
      : "border-cyan-500/20 bg-cyan-950/10"
  }
`}
>

  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">

    <div>

      <div className="text-zinc-500 text-xs tracking-[0.3em] mb-2">
        EXECUTIVE VERDICT
      </div>

    <div
  className="
  text-3xl
  md:text-6xl
  font-black
  tracking-tight
  bg-gradient-to-r
  from-cyan-300
  to-white
  bg-clip-text
  text-transparent
"
>

        {result.analysis.threat_category}

      </div>

      <div className="mt-3 text-zinc-300 max-w-3xl">

        {result.analysis.summary}

      </div>

    </div>

    <div
      className="
      flex
      flex-col
      items-center
      justify-center
      min-w-[180px]
    "
    >

      <div className="text-zinc-500 text-xs">
        RISK LEVEL
      </div>

      <div
        className="
        text-5xl
        font-black
        text-red-400
      "
      >
        {result.analysis.risk_level}
      </div>

      <div className="text-zinc-500 mt-2">
        {result.analysis.confidence}% Confidence
      </div>

    </div>

  </div>

</div>



 <ThreatSummaryBar
  result={result}
/>
<InvestigationPipeline />

  {/* MAIN ANALYSIS */}

  <div
    className="
    grid
    xl:grid-cols-3
    gap-6
    mb-6
  "
  >

    <ThreatRadar
      riskLevel={result.analysis.risk_level}
      matches={
        result.memory_match?.matches_found || 0
      }
    />

    <IntelligenceBrief
      analysis={result.analysis}
    />

    <MemoryCorrelation
      result={result}
    />

  </div>

  {/* IOC + GRAPH */}

  <div
    className="
    grid
    xl:grid-cols-2
    gap-6
    mb-6
  "
  >

   

    <ThreatGraph
      analysis={result.analysis}
    />

    <div className="mb-6">

  <InvestigationWorkspace
    result={result}
  />

</div>

  </div>

  {/* TIMELINE + OPERATIONS */}

  <div
    className="
    grid
    xl:grid-cols-2
    gap-6
    mb-6
  "
  >

  </div>

  {/* ACTIONS */}

  <div className="mb-6">

   

  </div>

  {/* FINGERPRINT */}

  <div
    className="
    border
    border-cyan-500/20
    rounded-2xl
    p-8
    text-center
    bg-cyan-950/10
  "
  >

    <div className="mb-6 flex justify-end">

  <button
    onClick={() =>
      generateThreatReport(result)
    }
    className="
      px-6
      py-3
      rounded-xl
      border
      border-cyan-400
      bg-cyan-500/10
      hover:bg-cyan-500/20
      transition-all
    "
  >
    EXPORT INTELLIGENCE REPORT
  </button>

</div>

    <div className="text-cyan-400 mb-2">
      THREAT GENOME FINGERPRINT
    </div>

    <div
      className="
      text-2xl
      md:text-5xl
      font-black
      text-cyan-300
      break-all
    "
    >
      {result.analysis.fingerprint}
    </div>

  </div>

      </>

    )}

  </div>

</main>

);
}
