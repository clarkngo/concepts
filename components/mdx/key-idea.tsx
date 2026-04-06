import type { ReactNode } from "react";

type KeyIdeaProps = {
  title?: string;
  children: ReactNode;
};

export function KeyIdea({ title = "Key idea", children }: KeyIdeaProps) {
  return (
    <aside
      className="motion-fade-in my-8 rounded-xl border border-blue-200/80 bg-gradient-to-br from-blue-50/90 to-white px-5 py-4 shadow-sm"
      aria-label={title}
    >
      <div className="text-xs font-semibold uppercase tracking-wide text-blue-700">
        {title}
      </div>
      <div className="mt-2 text-sm leading-relaxed text-zinc-800 [&_p]:mb-3 [&_p:last-child]:mb-0">
        {children}
      </div>
    </aside>
  );
}
