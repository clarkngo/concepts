"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { getCourse } from "@/lib/course";

export function MobileLessonNav() {
  const pathname = usePathname();
  const course = getCourse();

  return (
    <nav
      className="sticky top-14 z-10 border-b border-zinc-200 bg-zinc-50/95 px-3 py-2 backdrop-blur md:hidden"
      aria-label="Lessons"
    >
      <p className="mb-1 text-[10px] font-semibold uppercase tracking-wide text-zinc-500">
        In this track
      </p>
      <div className="flex gap-2 overflow-x-auto pb-1">
        {course.chapters.flatMap((ch) =>
          ch.lessons.map((lesson) => {
            const href = `/learn/${lesson.slug}/`;
            const active =
              pathname === href ||
              pathname?.replace(/\/$/, "") === href.replace(/\/$/, "");
            return (
              <Link
                key={lesson.slug}
                href={href}
                className={`shrink-0 rounded-full border px-3 py-1 text-xs font-medium transition-[background-color,box-shadow,transform,border-color] duration-200 ease-out active:scale-[0.97] motion-reduce:active:scale-100 ${
                  active
                    ? "border-blue-200 bg-blue-50 text-blue-800 shadow-sm ring-1 ring-blue-100"
                    : "border-zinc-200 bg-white text-zinc-700 hover:bg-zinc-100"
                }`}
              >
                {lesson.title}
              </Link>
            );
          }),
        )}
      </div>
    </nav>
  );
}
