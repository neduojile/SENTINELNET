"use client";

const logs = [
  "[INFO] Threat Memory Active",
  "[INFO] IOC Correlation Online",
  "[INFO] MITRE Intelligence Loaded",
  "[INFO] Brand Analysis Active",
  "[INFO] Threat Fingerprint Generated",
  "[INFO] Neural Threat Engine Ready",
];

export default function CommandLog() {
  return (
    <div
      className="
      max-w-4xl
      mx-auto
      border
      border-cyan-500/20
      bg-cyan-500/5
      backdrop-blur-md
      rounded-2xl
      p-6
      mt-16
      "
    >
      <h3 className="text-cyan-400 mb-4 font-bold">
        LIVE COMMAND LOG
      </h3>

      {logs.map((log) => (
        <div
          key={log}
          className="
          text-green-400
          font-mono
          text-sm
          mb-2
          "
        >
          {log}
        </div>
      ))}
    </div>
  );
}