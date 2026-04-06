import type { ReactNode } from "react";

type FigureProps = {
  n?: number;
  caption: string;
  children?: ReactNode;
};

export function Figure({ n, caption, children }: FigureProps) {
  return (
    <figure className="my-8">
      <div className="rounded-lg border border-zinc-200/90 bg-zinc-50/80 p-4 shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
        {children}
      </div>
      <figcaption className="mt-2 text-center text-xs text-zinc-500">
        {n != null ? `Figure ${n}: ` : null}
        {caption}
      </figcaption>
    </figure>
  );
}
