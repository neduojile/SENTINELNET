"use client";

import { useEffect, useState } from "react";

const text =
  "Hello Operator. Welcome to SentinelNet. Threat Genome Engine Ready.";

export default function TypewriterIntro() {
  const [display, setDisplay] = useState("");

  useEffect(() => {
    let index = 0;

    const timer = setInterval(() => {
      setDisplay(text.slice(0, index));

      index++;

      if (index > text.length) {
        clearInterval(timer);
      }
    }, 40);

    return () => clearInterval(timer);
  }, []);

  return (
    <p
      className="
      text-cyan-300
      font-mono
      text-lg
      mb-8
      "
    >
      {display}
    </p>
  );
}