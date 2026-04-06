"use client";

import { useCallback, useEffect, useMemo, useState } from "react";

import { useRouter } from "next/navigation";

import { getCourse } from "@/lib/course";

type Item = { title: string; href: string; chapter: string };

export function SearchButton() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");

  const items = useMemo(() => {
    const out: Item[] = [];
    for (const ch of getCourse().chapters) {
      for (const l of ch.lessons) {
        out.push({
          title: l.title,
          href: `/learn/${l.slug}/`,
          chapter: ch.title,
        });
      }
    }
    return out;
  }, []);

  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return items.slice(0, 8);
    return items.filter(
      (i) =>
        i.title.toLowerCase().includes(s) ||
        i.chapter.toLowerCase().includes(s),
    );
  }, [items, q]);

  const onKey = useCallback(
    (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((v) => !v);
      }
      if (e.key === "Escape") setOpen(false);
    },
    [],
  );

  useEffect(() => {
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onKey]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-2 rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-1.5 text-xs font-medium text-zinc-600 shadow-sm transition-[box-shadow,transform,background-color,color] duration-200 ease-out hover:bg-zinc-100 hover:shadow active:scale-[0.98] motion-reduce:active:scale-100"
      >
        Search
        <kbd className="hidden rounded border border-zinc-200 bg-white px-1.5 py-0.5 font-mono text-[10px] text-zinc-500 sm:inline">
          ⌘K
        </kbd>
      </button>

      {open ? (
        <div
          className="motion-dialog-backdrop fixed inset-0 z-50 flex items-start justify-center bg-black/30 p-4 pt-[12vh]"
          role="dialog"
          aria-modal="true"
          aria-label="Search lessons"
          onClick={() => setOpen(false)}
        >
          <div
            className="motion-dialog-panel w-full max-w-lg overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="border-b border-zinc-100 px-3 py-2">
              <input
                autoFocus
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search lessons…"
                className="w-full rounded-md border border-zinc-200 px-3 py-2 text-sm outline-none ring-blue-600 focus:ring-2"
              />
            </div>
            <ul className="max-h-72 overflow-y-auto py-1 text-sm">
              {filtered.map((i) => (
                <li key={i.href}>
                  <button
                    type="button"
                    className="flex w-full flex-col items-start gap-0.5 px-3 py-2 text-left transition-colors duration-150 ease-out hover:bg-zinc-50 active:bg-zinc-100/80"
                    onClick={() => {
                      setOpen(false);
                      router.push(i.href);
                    }}
                  >
                    <span className="font-medium text-zinc-900">{i.title}</span>
                    <span className="text-xs text-zinc-500">{i.chapter}</span>
                  </button>
                </li>
              ))}
              {filtered.length === 0 ? (
                <li className="px-3 py-4 text-center text-sm text-zinc-500">
                  No matches.
                </li>
              ) : null}
            </ul>
          </div>
        </div>
      ) : null}
    </>
  );
}
