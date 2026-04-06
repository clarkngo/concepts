"use client";

import { useEffect, useState } from "react";

import { readProgress, setLessonDone } from "@/lib/progress";

type Props = { slug: string };

export function MarkComplete({ slug }: Props) {
  // Must match SSR + first client paint: localStorage is unavailable on the server.
  const [done, setDone] = useState(false);

  useEffect(() => {
    // Read localStorage only after mount so the first paint matches SSR (hydration).
    // https://nextjs.org/docs/messages/react-hydration-error
    // eslint-disable-next-line react-hooks/set-state-in-effect -- sync from localStorage after mount; not derivable from props
    setDone(!!readProgress()[slug]);
  }, [slug]);

  return (
    <div className="mt-12 flex items-center justify-between gap-4 border-t border-zinc-200 pt-8">
      <p
        className={`text-sm transition-colors duration-300 ease-out ${
          done ? "text-emerald-800" : "text-zinc-600"
        }`}
      >
        {done ? "Marked complete." : "Finished this lesson?"}
      </p>
      <button
        type="button"
        onClick={() => {
          const next = !done;
          setLessonDone(slug, next);
          setDone(next);
        }}
        className={`rounded-lg px-4 py-2 text-sm font-medium transition-[background-color,box-shadow,color,transform,border-color] duration-200 ease-out active:scale-[0.98] motion-reduce:active:scale-100 ${
          done
            ? "border border-zinc-200 bg-white text-zinc-800 hover:bg-zinc-50"
            : "bg-blue-600 text-white shadow-sm hover:bg-blue-700 hover:shadow"
        }`}
      >
        {done ? "Undo complete" : "Mark complete"}
      </button>
    </div>
  );
}
