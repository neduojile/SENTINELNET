"use client";

export default function ThreatTicker() {
  return (
    <div
      className="
      w-full
      overflow-hidden
      border-y
      border-cyan-500/20
      bg-black/40
      py-3
      "
    >
      <div
        className="
        whitespace-nowrap
        animate-[marquee_25s_linear_infinite]
        text-cyan-400
        font-mono
        "
      >
        PHISHING DETECTED • IOC MATCH FOUND •
        MITRE T1566 IDENTIFIED • THREAT MEMORY
        UPDATED • BRAND IMPERSONATION ALERT •
        PHISHING DETECTED • IOC MATCH FOUND •
        MITRE T1566 IDENTIFIED •
      </div>
    </div>
  );
}