import type { ReactNode } from "react";

type CompareProps = {
  leftTitle: string;
  rightTitle: string;
  left: ReactNode;
  right: ReactNode;
};

export function Compare({ leftTitle, rightTitle, left, right }: CompareProps) {
  return (
    <div className="motion-fade-in-up my-8 grid gap-4 md:grid-cols-2">
      <div className="rounded-xl border border-zinc-200 bg-zinc-50/50 p-4">
        <div className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
          {leftTitle}
        </div>
        <div className="mt-2 text-sm leading-relaxed text-zinc-800 [&_p]:mb-2 [&_p:last-child]:mb-0">
          {left}
        </div>
      </div>
      <div className="rounded-xl border border-blue-200/80 bg-blue-50/40 p-4">
        <div className="text-xs font-semibold uppercase tracking-wide text-blue-800">
          {rightTitle}
        </div>
        <div className="mt-2 text-sm leading-relaxed text-zinc-800 [&_p]:mb-2 [&_p:last-child]:mb-0">
          {right}
        </div>
      </div>
    </div>
  );
}
