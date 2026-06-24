"use client";

type Props = {
  iocs: any;
};

export default function IOCPanel({
  iocs,
}: Props) {

  const domains = iocs?.domains || [];
  const urls = iocs?.urls || [];
  const emails = iocs?.emails || [];
  const ips = iocs?.ips || [];

  const total =
    domains.length +
    urls.length +
    emails.length +
    ips.length;

  function Section({
    title,
    items,
    color,
  }: {
    title: string;
    items: string[];
    color: string;
  }) {

    if (!items.length) return null;

    return (

      <div className="mb-5">

        <div
          className={`
          text-xs
          tracking-[0.3em]
          mb-3
          ${color}
        `}
        >
          {title} ({items.length})
        </div>

        <div className="space-y-2">

          {items.map((item, index) => (

            <div
              key={index}
              className="
              bg-black/50
              border
              border-cyan-500/10
              rounded-lg
              p-3
              font-mono
              text-sm
              break-all
            "
            >
              {item}
            </div>

          ))}

        </div>

      </div>

    );
  }

  return (

    <div
      className="
      border
      border-cyan-500/20
      bg-cyan-950/10
      backdrop-blur-md
      rounded-2xl
      p-6
      shadow-[0_0_40px_rgba(0,255,255,0.08)]
    "
    >

      <div className="flex justify-between items-center mb-6">

        <div
          className="
          text-cyan-400
          text-xs
          tracking-[0.3em]
        "
        >
          IOC EXTRACTION
        </div>

        <div
          className="
          px-3
          py-1
          rounded-full
          border
          border-cyan-500/20
          text-cyan-300
          text-xs
        "
        >
          {total} ARTIFACTS
        </div>

      </div>

      <div
        className="
        grid
        grid-cols-2
        gap-3
        mb-6
      "
      >

        <div className="rounded-xl border border-cyan-500/10 p-3">
          <div className="text-cyan-400 text-xs">
            DOMAINS
          </div>

          <div className="text-2xl font-bold">
            {domains.length}
          </div>
        </div>

        <div className="rounded-xl border border-cyan-500/10 p-3">
          <div className="text-green-400 text-xs">
            URLS
          </div>

          <div className="text-2xl font-bold">
            {urls.length}
          </div>
        </div>

        <div className="rounded-xl border border-cyan-500/10 p-3">
          <div className="text-yellow-400 text-xs">
            EMAILS
          </div>

          <div className="text-2xl font-bold">
            {emails.length}
          </div>
        </div>

        <div className="rounded-xl border border-cyan-500/10 p-3">
          <div className="text-red-400 text-xs">
            IPS
          </div>

          <div className="text-2xl font-bold">
            {ips.length}
          </div>
        </div>

      </div>

      <div
        className="
        max-h-[500px]
        overflow-y-auto
        pr-2
      "
      >

        <Section
          title="DOMAINS"
          items={domains}
          color="text-cyan-400"
        />

        <Section
          title="URLS"
          items={urls}
          color="text-green-400"
        />

        <Section
          title="EMAILS"
          items={emails}
          color="text-yellow-400"
        />

        <Section
          title="IPS"
          items={ips}
          color="text-red-400"
        />

        {total === 0 && (

          <div
            className="
            text-center
            text-zinc-500
            py-10
          "
          >
            No Indicators Extracted
          </div>

        )}

      </div>

    </div>

  );
}