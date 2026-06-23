"use client";

import { useEffect, useState } from "react";

export default function LiveClock() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const update = () => {
      const now = new Date();

      setTime(
        now.toLocaleTimeString("en-GB", {
          hour12: false,
        })
      );
    };

    update();

    const timer = setInterval(update, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div
      className="
      fixed
     top-1
right-2
md:top-6
md:right-6
      z-50
      border
      border-cyan-500/10
      bg-black/40
      backdrop-blur-md
      px-4
      py-0
      rounded-xl
      text-cyan-100
      font-mono
      "
    >
      UTC {time}
    </div>
  );
}