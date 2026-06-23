"use client";

import Link from "next/link";
import CountUp from "react-countup";
import LiveStats from "@/components/landing/LiveStats";
import BootSequence from "@/components/command-center/BootSequence";
import LiveClock from "@/components/command-center/LiveClock";
import ThreatTicker from "@/components/command-center/ThreatTicker";
import TypewriterIntro from "@/components/command-center/TypewriterIntro";
import CommandLog from "@/components/command-center/CommandLog";
import FinalSection from "@/components/command-center/FinalSection";

export default function Home() {
  return (

  <main className="relative text-white">

  <LiveClock />

  {/* GLOBAL BACKGROUND */}

      <div className="fixed inset-0 -z-10">

        <img
          src="/assets/landing/eye.jpg"
          alt="Background"
          className="
          w-full
          h-full
          object-cover
          opacity-90
          blur-[2px]
          scale-110
          "
        />

        <div className="absolute inset-0 bg-black/90" />

      </div>

      {/* HERO SECTION */}

      <section
  className="
  relative
  min-h-screen
  flex
  items-center
  justify-center
  overflow-hidden
  pt-15
  md:pt-32
"
>
        <div
          className="
          relative
          z-10
          text-center
          max-w-3xl
          px-6
          "
        >
          <p
            className="
            text-cyan-400
            tracking-[0.5em]
            mb-8
            text-sm
            md:text-base
            "
          >
            ARTIFICIAL THREAT INTELLIGENCE
          </p>

          <TypewriterIntro />

         <div className="flex flex-col items-center">

  <img
    src="/assets/sentinelnet-logo.png"
    alt="SentinelNet Logo"
    className="
      w-24
      h-20
      md:w-32
      md:h-32
      mb-6
      object-contain
      drop-shadow-[0_0_25px_rgba(0,255,255,0.5)]
    "
  />

  <h1
    className="
      text-3xl
      sm:text-5xl
      md:text-7xl
      lg:text-9xl
      font-black
      tracking-wide
      drop-shadow-[0_0_30px_rgba(0,255,255,0.3)]
    "
  >
    SENTINELNET
  </h1>

</div>
           <p
            className="
            mt-8
            text-gray-300
            text-base
            sm:text-lg
            md:text-xl
           max-w-xl
md:max-w-3xl
            mx-auto
            "

          >
            Autonomous Threat Detection, IOC Correlation,
            Brand Impersonation Analysis and Real-Time
            Threat Intelligence powered by the
            Threat Genome Engine.
          </p>

         <div className="max-w-3xl mx-auto">
  <BootSequence />
</div>


<LiveStats />

          <div className="mt-14">
           <Link href="/command-center">



  <button
    className="
    px-12
    py-5
    rounded-full
    border
    border-cyan-400
    text-cyan-300
    font-bold
    tracking-widest
    text-lg
    bg-cyan-500/10
    shadow-[0_0_30px_rgba(0,255,255,0.3)]
    hover:scale-105
    transition-all
    duration-300
    "
  >
    ENTER COMMAND CENTER 
  </button>

</Link>
          </div>
        </div>
    </section>

<ThreatTicker />

{/* SECTION 2 */}

   <section className="py-24 md:py-40 px-5 md:px-6">
        <div className="max-w-7xl mx-auto">

        <div
  className="
  grid
  md:grid-cols-2
  gap-20
  items-center

  border
  border-cyan-500/20

  bg-black/40
  backdrop-blur-xl

  rounded-[40px]

 p-6
md:p-16

  shadow-[0_0_80px_rgba(0,255,255,0.08)]
"
>

            <div>
              <p className="text-cyan-400 tracking-widest mb-4">
                THREAT INTELLIGENCE NETWORK
              </p>

<div
  className="
  inline-flex
  items-center
  gap-2

  px-4
  py-2

  rounded-full

  border
  border-green-500/30

  bg-green-500/10

  text-green-400
  text-xs

  mb-6
"
>
  <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
  NETWORK ACTIVE
</div>

             <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-8">
                Connecting Intelligence Across Every Threat
              </h2>

              <p className="text-gray-300 text-lg leading-relaxed">
                SentinelNet correlates indicators,
                connects threat intelligence,
                and builds a persistent memory
                layer capable of identifying
                repeated attack campaigns.
              </p>
            </div>

           <div
  className="
  flex
  justify-center
  relative
"
>
            <img
  src="/assets/landing/handshake.png"
  alt="Network"
  className="
max-w-[240px]
sm:max-w-md
  w-full
  rounded-3xl

  border
  border-cyan-500/20

  shadow-[0_0_60px_rgba(0,255,255,0.25)]

  hover:scale-105

  transition-all
  duration-700
"
/>
            </div>

          </div>

        </div>
      </section>

      {/* SECTION 3 */}

     <section className="py-20 md:py-32 px-5 md:px-6">

        <div className="max-w-7xl
mx-auto
w-full">

         <div
  className="
  grid
  md:grid-cols-2
  gap-20
  items-center

  border
  border-cyan-500/20

  bg-black/40
  backdrop-blur-xl

  rounded-[40px]

  p-10
  md:p-16

  shadow-[0_0_80px_rgba(0,255,255,0.08)]
"
>

            <div className="flex justify-center">

              <img
                src="/assets/landing/ai-core.png"
                alt="AI Core"
                className="
               max-w-[220px]
sm:max-w-sm
                w-full
                drop-shadow-[0_0_60px_rgba(0,255,255,0.4)]
                "
              />

            </div>

            <div>

              <p className="text-cyan-400 tracking-widest mb-4">
                THREAT GENOME ENGINE
              </p>

<div
  className="
  inline-flex
  items-center
  gap-2

  px-4
  py-2

  rounded-full

  border
  border-cyan-500/30

  bg-cyan-500/10

  text-cyan-400
  text-xs

  mb-6
"
>
  <span className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
  AI ENGINE ONLINE
</div>
             <h2 className="text-3xl sm:text-4xl md:text-3xl
md:text-5xl font-bold mb-8">
                Artificial Intelligence Meets Cyber Defense
              </h2>

              <p className="text-gray-300 text-lg leading-relaxed">
                Extract IOCs, generate fingerprints,
                map MITRE ATT&CK techniques,
                correlate historical attacks,
                and build intelligence-driven
                threat profiles.
              </p>

            </div>

          </div>

        </div>

      </section>

      {/* SECTION 4 */}

     <section className="py-20 md:py-32 px-5 md:px-6">

        <div
          className="
          max-w-6xl
          mx-auto
          rounded-3xl
          border
          border-red-500/30
          bg-red-500/5
          backdrop-blur-md
          p-12
          "
        >

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

            <img
              src="/assets/landing/threat-alert.png"
              alt="Threat Alert"
              className="rounded-2xl w-full"
            />

            <div>

              <p className="text-red-400 tracking-widest mb-4">
                LIVE THREAT DETECTION
              </p>

              <h2 className="text-5xl font-bold mb-8">
                Detect. Correlate. Respond.
              </h2>

              <p className="text-gray-300 text-lg leading-relaxed">
                SentinelNet identifies phishing,
                malware campaigns, brand
                impersonation attempts and
                malicious infrastructure in
                real time.
              </p>

            </div>

          </div>

        </div>

     </section>

<CommandLog />

<FinalSection />

</main>
  );
}