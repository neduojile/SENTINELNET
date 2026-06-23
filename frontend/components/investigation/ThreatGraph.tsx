"use client";

import ReactFlow, {
  Background,
  Controls,
  MiniMap,
} from "reactflow";

import "reactflow/dist/style.css";

type Props = {
  analysis: any;
};

export default function ThreatGraph({
  analysis,
}: Props) {

  const nodes = [

    {
      id: "1",
      position: { x: 300, y: 150 },
      data: {
        label: "THREAT GENOME",
      },
      style: {
        background: "#00ffff22",
        color: "#00ffff",
        border: "2px solid #00ffff",
        padding: 12,
        borderRadius: 12,
        fontWeight: "bold",
      },
    },

    {
      id: "2",
      position: { x: 40, y: 150 },
      data: {
        label: analysis.attack_family,
      },
      style: {
        background: "#ff660022",
        color: "#ff9933",
        border: "1px solid #ff6600",
      },
    },

    {
      id: "3",
      position: { x: 560, y: 150 },
      data: {
        label: analysis.target_profile,
      },
      style: {
        background: "#22ff9922",
        color: "#66ffcc",
        border: "1px solid #22ff99",
      },
    },

    {
      id: "4",
      position: { x: 300, y: 20 },
      data: {
        label: analysis.delivery_vector,
      },
      style: {
        background: "#0099ff22",
        color: "#66ccff",
        border: "1px solid #0099ff",
      },
    },

    {
      id: "5",
      position: { x: 300, y: 300 },
      data: {
        label: analysis.objective,
      },
      style: {
        background: "#ff333322",
        color: "#ff6666",
        border: "1px solid #ff3333",
      },
    },

    {
      id: "6",
      position: { x: 150, y: 40 },
      data: {
        label: analysis.risk_level,
      },
      style: {
        background: "#ffff0022",
        color: "#ffff99",
        border: "1px solid #ffff00",
      },
    },

    {
      id: "7",
      position: { x: 450, y: 40 },
      data: {
        label: `${analysis.confidence}%`,
      },
      style: {
        background: "#cc66ff22",
        color: "#e0b3ff",
        border: "1px solid #cc66ff",
      },
    },

  ];

  const edges = [

    {
      id: "e1",
      source: "1",
      target: "2",
      animated: true,
      style: { stroke: "#00ffff" },
    },

    {
      id: "e2",
      source: "1",
      target: "3",
      animated: true,
      style: { stroke: "#00ffff" },
    },

    {
      id: "e3",
      source: "1",
      target: "4",
      animated: true,
      style: { stroke: "#00ffff" },
    },

    {
      id: "e4",
      source: "1",
      target: "5",
      animated: true,
      style: { stroke: "#00ffff" },
    },

    {
      id: "e5",
      source: "1",
      target: "6",
      animated: true,
      style: { stroke: "#ffaa00" },
    },

    {
      id: "e6",
      source: "1",
      target: "7",
      animated: true,
      style: { stroke: "#cc66ff" },
    },

  ];

  return (

    <div
      className="
      border
      border-cyan-500/20
      rounded-2xl
      overflow-hidden
      bg-black/70
      backdrop-blur-md
      h-[650px]
    "
    >

      <div
        className="
        border-b
        border-cyan-500/20
        px-6
        py-4
      "
      >

        <div className="text-cyan-400 tracking-[0.3em] text-xs">
          THREAT RELATIONSHIP GRAPH
        </div>

      </div>

      <ReactFlow
        nodes={nodes}
        edges={edges}
        fitView
      >

        <Background color="#00ffff" gap={24} />

        <MiniMap />

        <Controls />

      </ReactFlow>

    </div>

  );
}