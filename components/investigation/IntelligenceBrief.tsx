"use client";

type Props = {
  analysis: any;
};

export default function IntelligenceBrief({
  analysis,
}: Props) {

  const score =
    analysis.intelligence_score || 0;

  const confidence =
    analysis.confidence || 0;

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

      <div className="flex items-center justify-between mb-6">

        <div
          className="
          text-cyan-400
          text-xs
          tracking-[0.3em]
        "
        >
          INTELLIGENCE BRIEF
        </div>

        <div
          className="
          px-3
          py-1
          rounded-full
          bg-red-500/10
          border
          border-red-500/20
          text-red-400
          text-xs
        "
        >
          {analysis.risk_level}
        </div>

      </div>

      {/* SCORE */}

      <div className="grid md:grid-cols-2 gap-6 mb-6">

        <div>

          <div
            className="
            text-7xl
            font-black
            text-cyan-300
            leading-none
          "
          >
            {score}
          </div>

          <div className="text-zinc-500 mt-2">
            Intelligence Score
          </div>

        </div>

        <div>

          <div className="text-zinc-400 text-sm mb-2">
            Confidence Level
          </div>

          <div
            className="
            w-full
            h-4
            bg-black/60
            rounded-full
            overflow-hidden
          "
          >

            <div
              className="
              h-full
              bg-gradient-to-r
              from-cyan-500
              to-green-400
            "
              style={{
                width: `${confidence}%`,
              }}
            />

          </div>

          <div className="mt-2 text-cyan-300">
            {confidence}%
          </div>

        </div>

      </div>

      {/* BADGES */}

      <div
        className="
        flex
        flex-wrap
        gap-3
        mb-6
      "
      >

        <div className="px-3 py-2 rounded-lg bg-cyan-500/10 border border-cyan-500/20">
          {analysis.threat_category}
        </div>

        <div className="px-3 py-2 rounded-lg bg-orange-500/10 border border-orange-500/20">
          {analysis.attack_family}
        </div>

        <div className="px-3 py-2 rounded-lg bg-green-500/10 border border-green-500/20">
          {analysis.delivery_vector}
        </div>

      </div>

      {/* SUMMARY */}

      <div
        className="
        border
        border-cyan-500/10
        rounded-xl
        p-4
        mb-6
        bg-black/30
      "
      >

        <div className="text-cyan-400 text-sm mb-3">
          Executive Summary
        </div>

        <p
          className="
          text-zinc-300
          leading-relaxed
        "
        >
          {analysis.summary}
        </p>

      </div>

      {/* DETAILS */}

      <div className="grid md:grid-cols-2 gap-4 mb-6">

        <div
          className="
          border
          border-cyan-500/10
          rounded-xl
          p-4
        "
        >

          <div className="text-zinc-500 text-xs mb-2">
            TARGET PROFILE
          </div>

          <div>
            {analysis.target_profile}
          </div>

        </div>

        <div
          className="
          border
          border-cyan-500/10
          rounded-xl
          p-4
        "
        >

          <div className="text-zinc-500 text-xs mb-2">
            OBJECTIVE
          </div>

          <div>
            {analysis.objective}
          </div>

        </div>

      </div>

      {/* EMAIL VERDICT */}

      {analysis.email_verdict && (

        <div
          className="
          border
          border-red-500/20
          bg-red-500/5
          rounded-xl
          p-4
          mb-6
        "
        >

          <div className="text-red-400 text-sm mb-2">
            EMAIL VERDICT
          </div>

          <div className="font-semibold">
            {analysis.email_verdict}
          </div>

        </div>

      )}

      {/* MITRE */}

      {analysis.mitre_attack && (

        <div
          className="
          border
          border-purple-500/20
          bg-purple-500/5
          rounded-xl
          p-4
          mb-6
        "
        >

          <div className="text-purple-400 text-sm mb-2">
            MITRE ATT&CK
          </div>

          <div>
            {analysis.mitre_attack.technique_id}
          </div>

          <div>
            {analysis.mitre_attack.name}
          </div>

          <div className="text-zinc-500 text-sm">
            {analysis.mitre_attack.tactic}
          </div>

        </div>

      )}

      {/* CONFIDENCE REASON */}

      <div
        className="
        border-t
        border-cyan-500/10
        pt-5
      "
      >

        <div className="text-zinc-500 text-sm mb-2">
          Confidence Assessment
        </div>

        <div className="text-cyan-300">
          {analysis.confidence_reason}
        </div>

      </div>

    </div>

  );
}