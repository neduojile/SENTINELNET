"use client";

import { useEffect, useState } from "react";

const lines = [
  "Initializing Threat Genome Engine...",
  "Connecting Threat Memory...",
  "Loading MITRE Intelligence...",
  "Loading IOC Correlation Engine...",
  "Neural Threat Analysis Ready...",
  "System Online."
];

export default function BootSequence() {
  const [visible, setVisible] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setVisible((prev) => {
        if (prev >= lines.length) return prev;
        return prev + 1;
      });
    }, 800);

    return () => clearInterval(timer);
  }, []);

  return (
    <div
      className="
      mt-10
      max-w-2xl
      mx-auto
      rounded-xl
      border
      border-cyan-500/20
      bg-cyan-500/5
      backdrop-blur-md
      p-4 md:p-6
      text-left
    "
    >
      {lines.slice(0, visible).map((line) => (
        <div
          key={line}
          className="
          text-cyan-400
          font-mono
          text-xs md:text-sm
          mb-2
        "
        >
          {">"} {line}
        </div>
      ))}
    </div>
  );
}