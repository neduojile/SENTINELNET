import Link from "next/link";
export default function FinalSection() {
  return (
    <section
      className="
      min-h-screen
      flex
      items-center
      justify-center
      px-6
      "
    >
      <div className="text-center max-w-5xl">

        <p
          className="
          text-cyan-400
          tracking-[0.5em]
          mb-8
          "
        >
          THREAT MEMORY
        </p>

        <h2
          className="
          text-5xl
          md:text-8xl
          font-black
          "
        >
          Every Threat
          <br />
          Leaves A Signature
        </h2>

        <p
          className="
          mt-8
          text-xl
          text-gray-300
          "
        >
          SentinelNet Never Forgets.
        </p>

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
    INITIALIZE COMMAND CENTER 
  </button>

</Link>

      </div>
    </section>
  );
}