import type { Edge, Node } from "@xyflow/react";

import { getCourse } from "@/lib/course";

/** Reading order: intro → associative partitioning → DAG → two branches. */
export function buildSparkLessonGraph(): { nodes: Node[]; edges: Edge[] } {
  const ch = getCourse().chapters.find((c) => c.id === "apache-spark");
  if (!ch) return { nodes: [], edges: [] };

  const bySlug = (slug: string) => ch.lessons.find((l) => l.slug === slug);

  const intro = bySlug("apache-spark/introduction");
  const assoc = bySlug("apache-spark/associative-partitioning");
  const dag = bySlug("apache-spark/dag");
  const deep = bySlug("apache-spark/dag-deep-dive");
  const real = bySlug("apache-spark/dag-real-world");

  if (!intro || !assoc || !dag || !deep || !real) {
    return { nodes: [], edges: [] };
  }

  const href = (slug: string) => `/learn/${slug}/`;

  const nodes: Node[] = [
    {
      id: "intro",
      type: "sparkLesson",
      position: { x: 230, y: 0 },
      data: {
        variant: "start" as const,
        title: intro.title,
        href: href(intro.slug),
        description: intro.description,
      },
    },
    {
      id: "assoc",
      type: "sparkLesson",
      position: { x: 230, y: 140 },
      data: {
        variant: "stem" as const,
        title: assoc.title,
        href: href(assoc.slug),
        description: assoc.description,
      },
    },
    {
      id: "dag",
      type: "sparkLesson",
      position: { x: 230, y: 290 },
      data: {
        variant: "branch" as const,
        title: dag.title,
        href: href(dag.slug),
        description: dag.description,
      },
    },
    {
      id: "real",
      type: "sparkLesson",
      position: { x: 40, y: 460 },
      data: {
        variant: "leaf" as const,
        title: real.title,
        href: href(real.slug),
        description: real.description,
      },
    },
    {
      id: "deep",
      type: "sparkLesson",
      position: { x: 420, y: 460 },
      data: {
        variant: "leaf" as const,
        title: deep.title,
        href: href(deep.slug),
        description: deep.description,
      },
    },
  ];

  const edges: Edge[] = [
    {
      id: "e-intro-assoc",
      source: "intro",
      target: "assoc",
      type: "smoothstep",
    },
    {
      id: "e-assoc-dag",
      source: "assoc",
      target: "dag",
      type: "smoothstep",
    },
    {
      id: "e-dag-real",
      source: "dag",
      target: "real",
      sourceHandle: "split-left",
      type: "smoothstep",
    },
    {
      id: "e-dag-deep",
      source: "dag",
      target: "deep",
      sourceHandle: "split-right",
      type: "smoothstep",
    },
  ];

  return { nodes, edges };
}
