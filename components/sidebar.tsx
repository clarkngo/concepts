"use client";

import { useEffect, useMemo, useState } from "react";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { getCourse } from "@/lib/course";
import { PROGRESS_KEY, readProgress } from "@/lib/progress";

export function Sidebar() {
  const pathname = usePathname();
  const course = useMemo(() => getCourse(), []);
  const [progress, setProgress] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const sync = () => setProgress(readProgress());
    sync();
    const onStorage = (e: StorageEvent) => {
      if (e.key === PROGRESS_KEY || e.key === null) sync();
    };
    window.addEventListener("storage", onStorage);
    window.addEventListener("concepts-progress", sync);
    return () => {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener("concepts-progress", sync);
    };
  }, []);

  const total = useMemo(
    () => course.chapters.reduce((n, ch) => n + ch.lessons.length, 0),
    [course.chapters],
  );
  const doneCount = useMemo(
    () => course.chapters.reduce((n, ch) => {
      return (
        n +
        ch.lessons.reduce((m, l) => m + (progress[l.slug] ? 1 : 0), 0)
      );
    }, 0),
    [course.chapters, progress],
  );

  const pct = total === 0 ? 0 : Math.round((doneCount / total) * 100);

  return (
    <aside className="sticky top-14 hidden h-[calc(100vh-3.5rem)] w-72 shrink-0 flex-col border-r border-zinc-200/80 bg-zinc-50/90 md:flex">
      <div className="border-b border-zinc-200/80 px-4 py-3">
        <p className="text-xs font-medium uppercase tracking-wide text-zinc-500">
          Progress
        </p>
        <div className="mt-2 flex items-center gap-2">
          <div className="h-2 flex-1 overflow-hidden rounded-full bg-zinc-200">
            <div
              className="h-full rounded-full bg-blue-600 transition-[width] duration-500 ease-out motion-reduce:transition-none"
              style={{ width: `${pct}%` }}
            />
          </div>
          <span className="text-xs tabular-nums text-zinc-600">
            {doneCount}/{total}
          </span>
        </div>
      </div>
      <nav className="flex-1 overflow-y-auto px-2 py-3">
        {course.chapters.map((ch) => (
          <details key={ch.id} open className="group mb-2">
            <summary className="cursor-pointer list-none rounded-md px-2 py-1.5 text-xs font-semibold uppercase tracking-wide text-zinc-500 marker:hidden [&::-webkit-details-marker]:hidden">
              <span className="select-none">{ch.title}</span>
            </summary>
            <ul className="mt-1 space-y-0.5 border-l border-zinc-200 pl-3">
              {ch.lessons.map((lesson) => {
                const href = `/learn/${lesson.slug}/`;
                const active =
                  pathname === href ||
                  pathname?.startsWith(href.replace(/\/$/, ""));
                const done = progress[lesson.slug];
                return (
                  <li key={lesson.slug}>
                    <Link
                      href={href}
                      className={`flex items-start gap-2 rounded-md px-2 py-1.5 text-sm leading-snug transition-[background-color,box-shadow,color,transform] duration-200 ease-out motion-reduce:transition-colors ${
                        active
                          ? "bg-white font-medium text-blue-700 shadow-sm ring-1 ring-zinc-200/80"
                          : "text-zinc-700 hover:bg-zinc-100/80"
                      }`}
                    >
                      <span
                        className={`mt-0.5 inline-flex h-4 w-4 shrink-0 items-center justify-center rounded border border-zinc-300 bg-white text-[10px] text-zinc-500 transition-[color,background-color,border-color] duration-200 ${
                          done ? "border-emerald-300 bg-emerald-50 text-emerald-700 motion-check-pop" : ""
                        }`}
                        aria-hidden
                      >
                        {done ? "✓" : ""}
                      </span>
                      <span>{lesson.title}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </details>
        ))}
      </nav>
    </aside>
  );
}
