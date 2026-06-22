"use client";

import { useEffect, useState } from "react";

const allLogs = [
"Threat Engine Online",
"Memory Database Loaded",
"MITRE Intelligence Synced",
"AI Agent Alpha Ready",
"AI Agent Beta Ready",
"AI Agent Gamma Ready",
"Risk Scoring Engine Ready",
"Threat Correlation Active",
"Awaiting Threat Submission..."
];

export default function SystemTerminal() {

const [visibleLogs, setVisibleLogs] =
useState<string[]>([]);

useEffect(() => {

let current = 0;

const interval = setInterval(() => {

  if (current >= allLogs.length) {
    clearInterval(interval);
    return;
  }

  setVisibleLogs((prev) => [
    ...prev,
    allLogs[current],
  ]);

  current++;

}, 500);

return () => clearInterval(interval);

}, []);

return (


<div
  className="
  border
  border-cyan-500/20
  rounded-xl
  bg-black/80
  backdrop-blur-md
  p-5
  min-h-[500px]
  overflow-hidden
  relative
"
>

  {/* Header */}

  <div className="flex items-center justify-between mb-5">

    <div className="text-cyan-400 font-bold">
      LIVE TERMINAL
    </div>

    <div className="flex gap-2">

      <div className="w-3 h-3 rounded-full bg-red-500" />

      <div className="w-3 h-3 rounded-full bg-yellow-500" />

      <div className="w-3 h-3 rounded-full bg-green-500" />

    </div>

  </div>

  {/* Terminal Output */}

  <div
    className="
    space-y-3
    font-mono
    text-sm
  "
  >

    {visibleLogs.map((log, index) => (

      <div
        key={index}
        className="
        animate-pulse
      "
      >

        <span className="text-cyan-500">
          [{new Date().toLocaleTimeString()}]
        </span>

        <span className="ml-3 text-zinc-300">
          {log}
        </span>

      </div>

    ))}

    {/* Blinking Cursor */}

    <div className="flex items-center mt-4">

      <span className="text-green-400 mr-2">
        root@sentinelnet:
      </span>

      <span
        className="
        w-3
        h-5
        bg-cyan-400
        animate-pulse
      "
      />

    </div>

  </div>

  {/* Glow */}

  <div
    className="
    absolute
    inset-0
    pointer-events-none
    bg-gradient-to-b
    from-cyan-500/5
    to-transparent
  "
  />

</div>


);
}
