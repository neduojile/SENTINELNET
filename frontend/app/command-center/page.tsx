"use client";

import { useState } from "react";

import useThreatAnalysis from "../../hooks/useThreatAnalysis";
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
  downloadThreatReport,
} from "@/lib/reportGenerator";
import {
  uploadEvidence
} from "@/services/evidence";


import {
 uploadPdfTo0G,
} from "@/lib/zgStorage";

export default function CommandCenter() {
const [content, setContent] = useState("");

const [
  evidence,
  setEvidence
] = useState<any>(null);



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

async function handleEvidenceUpload() {

  console.log("STEP 1");

  if (!result) {
    alert("No result found");
    return;
  }

  try {

    console.log("STEP 2");

    const report =
      generateThreatReport(
        result
      );

    console.log(
      "STEP 3",
      report
    );

    const pdfFile =
      new File(
        [report.blob],
        `${report.reportId}.pdf`,
        {
          type:
            "application/pdf",
        }
      );

    console.log(
      "STEP 4",
      pdfFile
    );

    const response =
      await uploadEvidence(
        pdfFile
      );

    console.log(
      "STEP 5",
      response
    );

    setEvidence(
      response
    );

    alert(
      "Evidence Uploaded Successfully"
    );

  } catch (err) {

    console.error(
      "UPLOAD ERROR",
      err
    );

    alert(
      "Upload Failed"
    );

  }

}

async function handleStoreOn0G() {

  if (!result) return;

  try {

    const report =
      generateThreatReport(
        result
      );

    const pdfFile =
      new File(
        [report.blob],
        `${report.reportId}.pdf`,
        {
          type:
            "application/pdf",
        }
      );

  const tx =
  await uploadPdfTo0G(
    pdfFile
  );

    setEvidence(tx);

    alert(
      "Stored on 0G successfully"
    );

  } catch (error) {

    console.error(error);

    alert(
      "0G upload failed"
    );

  }

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

 {/* EVIDENCE & FINGERPRINT */}

<div
  className="
    border
    border-cyan-500/20
    rounded-3xl
    p-8
    bg-cyan-950/10
    backdrop-blur-md
  "
>

  <div className="flex justify-end mb-8">

    <button
      onClick={handleEvidenceUpload}
      className="
        px-6
        py-3
        rounded-xl
        border
        border-cyan-400
        bg-cyan-500/10
        hover:bg-cyan-500/20
        hover:shadow-[0_0_25px_rgba(0,255,255,0.4)]
        transition-all
      "
    >
      EXPORT & STORE EVIDENCE
    </button>

  </div>

  {/* FINGERPRINT */}

  <div className="text-center mb-10">

    <div className="text-cyan-400 text-sm tracking-[0.3em] mb-3">
      THREAT GENOME FINGERPRINT
    </div>

    <div
      className="
        text-lg
        md:text-3xl
        font-black
        text-cyan-300
        break-all
      "
    >
      {result.analysis.fingerprint}
    </div>

  </div>

  {/* EVIDENCE VAULT */}

  {evidence && (

    <div
      className="
        border
        border-green-500/30
        rounded-3xl
        p-8
        bg-gradient-to-br
        from-green-950/20
        to-black/50
        mb-8
      "
    >

      <div
        className="
          flex
          justify-between
          items-center
          mb-8
        "
      >

        <div>

          <div className="text-xs text-zinc-500 tracking-[0.3em]">
            BLOCKCHAIN EVIDENCE VAULT
          </div>

          <h2
            className="
              text-3xl
              font-black
              text-green-400
              mt-2
            "
          >
            VERIFIED EVIDENCE
          </h2>

        </div>

        <div
          className="
            px-4
            py-2
            rounded-full
            bg-green-500/20
            text-green-400
            font-bold
          "
        >
          VERIFIED
        </div>

      </div>

      {/* METRICS */}

      <div
        className="
          grid
          md:grid-cols-4
          gap-4
          mb-8
        "
      >

        <div className="border border-cyan-500/20 rounded-xl p-4">
          <div className="text-zinc-500 text-xs">
            STORAGE
          </div>
          <div className="text-cyan-300 font-bold">
            0G NETWORK
          </div>
        </div>

        <div className="border border-cyan-500/20 rounded-xl p-4">
          <div className="text-zinc-500 text-xs">
            STATUS
          </div>
          <div className="text-green-400 font-bold">
            VERIFIED
          </div>
        </div>

        <div className="border border-cyan-500/20 rounded-xl p-4">
          <div className="text-zinc-500 text-xs">
            REPORT
          </div>
          <div className="text-cyan-300 font-bold">
            ACTIVE
          </div>
        </div>

        <div className="border border-cyan-500/20 rounded-xl p-4">
          <div className="text-zinc-500 text-xs">
            TIMESTAMP
          </div>
          <div className="text-white font-bold">
            {new Date().toLocaleTimeString()}
          </div>
        </div>

      </div>

      {/* ROOT HASH */}

      <div className="mb-6">

        <div className="text-zinc-500 text-xs mb-2">
          ROOT HASH
        </div>

        <div
          className="
            bg-black/60
            border
            border-cyan-500/20
            rounded-xl
            p-4
            font-mono
            text-xs
            break-all
            text-cyan-300
          "
        >
          {evidence.rootHash}
        </div>

      </div>

      {/* TX HASH */}

      <div>

        <div className="text-zinc-500 text-xs mb-2">
          TRANSACTION HASH
        </div>

        <div
          className="
            bg-black/60
            border
            border-cyan-500/20
            rounded-xl
            p-4
            font-mono
            text-xs
            break-all
            text-cyan-300
          "
        >
          {evidence.txHash || "Pending Confirmation"}
        </div>

      </div>

      <div className="mt-6">

  <div className="text-zinc-500 text-xs mb-2">
    STORAGE LAYER
  </div>

  <div className="text-green-400 font-bold">
    0G DECENTRALIZED STORAGE
  </div>

</div>

<div className="mt-4">

  <div className="text-zinc-500 text-xs mb-2">
    INTEGRITY STATUS
  </div>

  <div className="text-green-400 font-bold">
    CRYPTOGRAPHICALLY VERIFIED
  </div>

</div>

<div className="mt-4">

  <div className="text-zinc-500 text-xs mb-2">
    EVIDENCE CLASSIFICATION
  </div>

  <div className="text-cyan-300 font-bold">
    IMMUTABLE FORENSIC RECORD
  </div>

</div>

    </div>

  )}

  {/* INVESTIGATION CHAIN */}

  <div
    className="
      border
      border-cyan-500/20
      rounded-3xl
      p-8
      bg-cyan-950/5
      mb-8
    "
  >

    <h3
      className="
        text-cyan-300
        text-2xl
        font-bold
        text-center
        mb-8
      "
    >
      INVESTIGATION CHAIN
    </h3>

    <div
      className="
        flex
        flex-wrap
        justify-center
        items-center
        gap-4
      "
    >

      <div className="text-center">
        <div className="text-green-400 text-3xl">✓</div>
        <div>Threat Submitted</div>
      </div>

      <div className="text-cyan-400 text-2xl">→</div>

      <div className="text-center">
        <div className="text-green-400 text-3xl">✓</div>
        <div>AI Analysis</div>
      </div>

      <div className="text-cyan-400 text-2xl">→</div>

      <div className="text-center">
        <div className="text-green-400 text-3xl">✓</div>
        <div>Report Generated</div>
      </div>

      <div className="text-cyan-400 text-2xl">→</div>

      <div className="text-center">
        <div className="text-green-400 text-3xl">✓</div>
        <div>Stored On 0G</div>
      </div>

      <div className="text-cyan-400 text-2xl">→</div>

      <div className="text-center">
        <div className="text-green-400 text-3xl">✓</div>
        <div>Evidence Verified</div>
      </div>

    </div>

  </div>


      <div
  className="
    mb-6
    p-5
    rounded-2xl
    border
    border-green-500/30
    bg-green-500/10
    text-center
  "
>

  <div className="text-green-400 text-xl font-bold">
    ✓ FORENSIC EVIDENCE SECURED ON 0G NETWORK
  </div>

  <div className="text-zinc-400 mt-2">
    Report fingerprinted, hashed and stored on decentralized infrastructure.
  </div>

</div>



 {/* DOWNLOAD */}

<button
  onClick={() =>
    downloadThreatReport(result)
  }
  className="
    w-full
    py-4
    rounded-2xl
    border
    border-cyan-400
    bg-gradient-to-r
    from-cyan-500/10
    to-blue-500/10
    hover:from-cyan-500/20
    hover:to-blue-500/20
    hover:shadow-[0_0_40px_rgba(0,255,255,0.3)]
    transition-all
    text-lg
    font-bold
  "
>
  DOWNLOAD VERIFIED INTELLIGENCE REPORT
</button>

</div>

</>

)}

</div>

</main>

);
}

