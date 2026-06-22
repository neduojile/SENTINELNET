"use client";

import CountUp from "react-countup";
import { Shield, Database, BrainCircuit, AlertTriangle } from "lucide-react";
import { motion } from "framer-motion";

type Props = {
  totalThreats: number;
  highRiskThreats: number;
};

export default function SystemStatus({
  totalThreats,
  highRiskThreats,
}: Props) {
  const cards = [
    {
      title: "AI ENGINE",
      value: "ONLINE",
      icon: BrainCircuit,
      glow: "text-cyan-400",
    },
    {
      title: "THREAT MEMORY",
      value: "ONLINE",
      icon: Database,
      glow: "text-green-400",
    },
    {
      title: "THREATS ANALYZED",
      value: totalThreats,
      icon: Shield,
      glow: "text-white",
    },
    {
      title: "HIGH RISK",
      value: highRiskThreats,
      icon: AlertTriangle,
      glow: "text-red-400",
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {cards.map((card, index) => {
        const Icon = card.icon;

        return (
          <motion.div
            key={card.title}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.15 }}
            className="
              border
              border-cyan-950
              bg-zinc-950/70
              backdrop-blur-sm
              rounded-xl
              p-4
              hover:border-cyan-500
              transition-all
            "
          >
            <div className="flex items-center justify-between mb-4">
              <span className="text-zinc-500 text-xs tracking-widest">
                {card.title}
              </span>

              <Icon className={`w-5 h-5 ${card.glow}`} />
            </div>

            <div className={`font-bold ${card.glow}`}>
              {typeof card.value === "number" ? (
                <CountUp end={card.value} duration={1.5} />
              ) : (
                card.value
              )}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}