"use client";

import { motion } from "framer-motion";

export default function EyeCore() {
  return (
    <div className="relative flex items-center justify-center">

      {/* Outer Pulse */}

      <motion.div
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
        }}
        className="
          absolute
          h-[320px]
          w-[320px]
          rounded-full
          border
          border-cyan-500/20
        "
      />

      {/* Second Pulse */}

      <motion.div
        animate={{
          scale: [1, 1.25, 1],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
        }}
        className="
          absolute
          h-[400px]
          w-[400px]
          rounded-full
          border
          border-cyan-400/10
        "
      />

      {/* Eye Image */}

      <motion.img
        src="/assets/landing/eye.jpg"
        alt="Sentinel Eye"
        animate={{
          scale: [1, 1.03, 1],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
        }}
        className="
          relative
          w-[260px]
          md:w-[340px]
          drop-shadow-[0_0_40px_rgba(0,255,255,0.35)]
        "
      />

      {/* Scan Line */}

      <motion.div
        animate={{
          y: [-140, 140, -140],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "linear",
        }}
        className="
          absolute
          h-[2px]
          w-[320px]
          bg-cyan-400
          blur-sm
        "
      />

    </div>
  );
}