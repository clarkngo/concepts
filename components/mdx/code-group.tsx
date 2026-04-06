"use client";

import { useId, useMemo, useState } from "react";

type CodeGroupProps = {
  py?: string;
  python?: string;
  scala?: string;
  sql?: string;
  ts?: string;
  go?: string;
};

export function CodeGroup({ py, python, scala, sql, ts, go }: CodeGroupProps) {
  const baseId = useId();
  const tabs = useMemo(() => {
    const out: { label: string; code: string }[] = [];
    const p = py ?? python;
    if (p) out.push({ label: "Python", code: p });
    if (scala) out.push({ label: "Scala", code: scala });
    if (sql) out.push({ label: "SQL", code: sql });
    if (ts) out.push({ label: "TypeScript", code: ts });
    if (go) out.push({ label: "Go", code: go });
    return out;
  }, [py, python, scala, sql, ts, go]);

  const [i, setI] = useState(0);
  const active = tabs[i] ?? tabs[0];

  if (!active) return null;

  return (
    <div className="my-6 overflow-hidden rounded-lg border border-zinc-200 bg-zinc-950 text-zinc-100">
      <div
        className="flex flex-wrap gap-1 border-b border-zinc-800 bg-zinc-900 px-2 py-1.5"
        role="tablist"
        aria-label="Code samples"
      >
        {tabs.map((tab, idx) => {
          const selected = idx === i;
          return (
            <button
              key={`${baseId}-${tab.label}`}
              type="button"
              role="tab"
              aria-selected={selected}
              className={`rounded-md px-2.5 py-1 text-xs font-medium transition-colors ${
                selected
                  ? "bg-zinc-800 text-white"
                  : "text-zinc-400 hover:bg-zinc-800/60 hover:text-zinc-200"
              }`}
              onClick={() => setI(idx)}
            >
              {tab.label}
            </button>
          );
        })}
      </div>
      <pre className="overflow-x-auto p-4 text-[13px] leading-relaxed">
        <code>{active.code.trimEnd()}</code>
      </pre>
    </div>
  );
}
