"use client";

import {
  Children,
  cloneElement,
  type ReactElement,
  type ReactNode,
  isValidElement,
} from "react";

type ConceptStepProps = {
  title: string;
  children?: ReactNode;
  /** Injected by parent `ConceptSteps` for stagger timing */
  stepIndex?: number;
};

function StepCard({ title, children, stepIndex = 0 }: ConceptStepProps) {
  return (
    <div
      className="motion-fade-in-up rounded-lg border border-zinc-200/90 bg-white p-4 shadow-sm ring-1 ring-zinc-100/80"
      style={{ animationDelay: `${stepIndex * 90}ms` }}
    >
      <div className="flex items-start gap-3">
        <span
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-600 text-sm font-semibold text-white"
          aria-hidden
        >
          {stepIndex + 1}
        </span>
        <div className="min-w-0 flex-1">
          <h3 className="text-base font-semibold text-zinc-900">{title}</h3>
          {children ? (
            <div className="mt-2 text-sm leading-relaxed text-zinc-700 [&_p]:mb-2 [&_p:last-child]:mb-0">
              {children}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export function ConceptStep(props: ConceptStepProps) {
  return <StepCard {...props} />;
}

export function ConceptSteps({ children }: { children: ReactNode }) {
  return (
    <ol className="list-none space-y-4 pl-0">
      {Children.map(children, (child, idx) => {
        if (!isValidElement(child)) return child;
        return (
          <li key={idx} className="pl-0">
            {cloneElement(child as ReactElement<ConceptStepProps>, {
              stepIndex: idx,
            })}
          </li>
        );
      })}
    </ol>
  );
}
