import type { ComponentPropsWithoutRef } from "react";

/**
 * MDX emits `<p>` for body text. Using real `<p>` can nest invalidly inside other
 * `<p>` or inside phrasing-only parents. A block `<span role="paragraph">` is
 * valid inside `<p>` (phrasing content) and avoids `<div>`-inside-`<p>` errors.
 */
export function MdxParagraph({
  children,
  className,
  ...props
}: ComponentPropsWithoutRef<"p">) {
  return (
    <span
      role="paragraph"
      className={[
        "my-4 block leading-relaxed first:mt-0 last:mb-0",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...(props as ComponentPropsWithoutRef<"span">)}
    >
      {children}
    </span>
  );
}
