"use client";

import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

const agents = [
  "AGENT ALPHA • Threat Parsing",
  "AGENT BETA • Genome Extraction",
  "AGENT GAMMA • Memory Correlation",
  "AGENT DELTA • Risk Scoring",
];

export default function AgentExecution() {
  return (
    <div className="border border-cyan-900 rounded-xl p-5 bg-zinc-950">
      <div className="text-cyan-400 text-xs tracking-[0.3em] mb-5">
        AI EXECUTION PIPELINE
      </div>

      <div className="space-y-4">
        {agents.map((agent, index) => (
          <motion.div
            key={agent}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              delay: index * 0.5,
            }}
            className="
              flex
              items-center
              justify-between
              border
              border-cyan-950
              rounded-lg
              px-4
              py-3
            "
          >
            <span>{agent}</span>

            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{
                delay: index * 0.5 + 0.4,
              }}
            >
              <CheckCircle2 className="text-green-400" />
            </motion.div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}