"use client";

import { motion } from "framer-motion";

type Props = {
  riskLevel: string;
  matches: number;
};

export default function ThreatRadar({
  riskLevel,
  matches,
}: Props) {

  const riskConfig = {
    Critical: {
      color: "text-red-400",
      ring: "border-red-500",
    },
    High: {
      color: "text-orange-400",
      ring: "border-orange-500",
    },
    Medium: {
      color: "text-yellow-400",
      ring: "border-yellow-500",
    },
    Low: {
      color: "text-green-400",
      ring: "border-green-500",
    },
  };

  const config =
    riskConfig[
      riskLevel as keyof typeof riskConfig
    ] || riskConfig.Low;

  return (

    <div
      className="
      border
      border-cyan-500/20
      rounded-2xl
      p-6
      bg-cyan-950/10
      backdrop-blur-md
      shadow-[0_0_40px_rgba(0,255,255,0.08)]
    "
    >

      <div className="flex justify-between items-center mb-6">

        <div className="text-cyan-400 text-xs tracking-[0.3em]">
          THREAT RADAR
        </div>

        <div className="text-green-400 text-xs animate-pulse">
          LIVE
        </div>

      </div>

      <div className="flex flex-col items-center">

        <div className="relative w-[260px] h-[260px]">

          {/* OUTER RINGS */}

          <div className="absolute inset-0 rounded-full border border-cyan-500/20" />
          <div className="absolute inset-[20px] rounded-full border border-cyan-500/20" />
          <div className="absolute inset-[40px] rounded-full border border-cyan-500/20" />
          <div className="absolute inset-[60px] rounded-full border border-cyan-500/20" />

          {/* CROSSHAIR */}

          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-cyan-500/20" />
          <div className="absolute top-1/2 left-0 right-0 h-px bg-cyan-500/20" />

          {/* RADAR SWEEP */}

          <motion.div
            animate={{
              rotate: 360,
            }}
            transition={{
              repeat: Infinity,
              duration: 4,
              ease: "linear",
            }}
            className="
              absolute
              left-1/2
              top-1/2
              w-[130px]
              h-[130px]
              origin-top-left
            "
          >
            <div
              className="
              w-full
              h-full
              bg-gradient-to-r
              from-cyan-400/30
              to-transparent
              rounded-tr-full
            "
            />
          </motion.div>

          {/* THREAT DOTS */}

          <motion.div
            animate={{
              scale: [1, 1.6, 1],
              opacity: [1, 0.3, 1],
            }}
            transition={{
              repeat: Infinity,
              duration: 2,
            }}
            className="
              absolute
              top-[50px]
              right-[70px]
              w-3
              h-3
              rounded-full
              bg-red-500
            "
          />

          <motion.div
            animate={{
              scale: [1, 1.4, 1],
            }}
            transition={{
              repeat: Infinity,
              duration: 3,
            }}
            className="
              absolute
              bottom-[70px]
              left-[60px]
              w-3
              h-3
              rounded-full
              bg-yellow-400
            "
          />

          {/* CENTER CORE */}

          <div
            className="
              absolute
              inset-0
              flex
              items-center
              justify-center
            "
          >

            <div
              className="
              w-24
              h-24
              rounded-full
              border
              border-cyan-400
              bg-black/80
              flex
              flex-col
              items-center
              justify-center
              shadow-[0_0_40px_rgba(0,255,255,0.3)]
            "
            >

              <div
                className={`font-black text-lg ${config.color}`}
              >
                {riskLevel}
              </div>

              <div className="text-[10px] text-zinc-500">
                RISK
              </div>

            </div>

          </div>

        </div>

        {/* STATS */}

        <div className="grid grid-cols-2 gap-4 mt-8 w-full">

          <div className="border border-cyan-500/20 rounded-xl p-4 text-center">
            <div className="text-cyan-400 text-xs">
              CAMPAIGNS
            </div>

            <div className="text-3xl font-black">
              {matches}
            </div>
          </div>

          <div className="border border-cyan-500/20 rounded-xl p-4 text-center">
            <div className="text-cyan-400 text-xs">
              STATUS
            </div>

            <div className={config.color}>
              ACTIVE
            </div>
          </div>

        </div>

      </div>

    </div>

  );
}