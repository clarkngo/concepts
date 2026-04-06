/**
 * Sequential visual: stages appear in dependency order (concept explanation).
 * Motion only when the user has not requested reduced motion (see globals.css).
 */
export function SparkStageWalkthrough() {
  return (
    <div className="my-8 overflow-x-auto rounded-xl border border-zinc-200 bg-white p-4 shadow-sm">
      <p className="mb-4 text-center text-xs font-medium uppercase tracking-wide text-zinc-500">
        Stages (simplified): each box must finish before the next can start
      </p>
      <div
        className="mx-auto flex max-w-xl flex-col items-center gap-1 md:max-w-none md:flex-row md:flex-wrap md:justify-center md:gap-1"
        role="img"
        aria-label="Four stages in order: read data, narrow maps, shuffle exchange, then write result"
      >
        <StageBox delayMs={0} label="Read" sub="input partitions" />
        <Arrow delayMs={70} />
        <StageBox delayMs={140} label="Narrow" sub="map / filter (pipelined)" />
        <Arrow delayMs={210} />
        <StageBox
          delayMs={280}
          label="Shuffle"
          sub="wide dependency"
          accent
        />
        <Arrow delayMs={350} />
        <StageBox delayMs={420} label="Write" sub="output" />
      </div>
      <p className="mt-4 text-center text-xs text-zinc-500">
        The <strong className="font-medium text-zinc-700">shuffle</strong> is
        usually where Spark ends one stage and begins another—because every
        partition may need data from every other partition.
      </p>
    </div>
  );
}

function StageBox({
  label,
  sub,
  delayMs,
  accent,
}: {
  label: string;
  sub: string;
  delayMs: number;
  accent?: boolean;
}) {
  return (
    <div
      className="motion-fade-in-up w-full max-w-[16rem] rounded-lg border px-3 py-3 text-center md:w-[8.25rem] md:max-w-none md:shrink-0"
      style={{
        animationDelay: `${delayMs}ms`,
        borderColor: accent ? "rgb(191 219 254)" : "rgb(228 228 231)",
        background: accent ? "rgb(239 246 255 / 0.9)" : "rgb(250 250 250)",
      }}
    >
      <p className="text-sm font-semibold text-zinc-900">{label}</p>
      <p className="mt-1 text-[11px] leading-snug text-zinc-600">{sub}</p>
    </div>
  );
}

function Arrow({ delayMs }: { delayMs: number }) {
  return (
    <span
      className="motion-fade-in text-zinc-400 md:px-0.5"
      style={{ animationDelay: `${delayMs}ms` }}
      aria-hidden
    >
      <span className="flex h-6 items-center justify-center md:hidden">↓</span>
      <span className="hidden md:inline">→</span>
    </span>
  );
}
