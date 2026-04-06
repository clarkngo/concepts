import type { Metadata } from "next";

import { SparkLessonGraphView } from "@/components/spark-lesson-graph-view";

export const metadata: Metadata = {
  title: "Apache Spark lesson graph",
  description:
    "Interactive map of Spark lessons: reading order and branches to deeper topics.",
};

export default function SparkLessonGraphPage() {
  return (
    <div className="motion-fade-in-up mx-auto max-w-5xl px-4 py-8 pb-16 md:px-8">
      <p className="text-xs font-medium uppercase tracking-wide text-zinc-500">
        Apache Spark
      </p>
      <h1 className="mt-2 text-3xl font-bold tracking-tight text-zinc-900">
        Lesson graph
      </h1>
      <p className="mt-2 max-w-2xl text-lg leading-relaxed text-zinc-600">
        Pan and zoom the canvas, use the minimap, or use the corner controls.
        Click a card to open that lesson. Arrows show the main path and the
        split from <strong>Spark and the DAG</strong> to the real-world and
        six-lens lessons.
      </p>
      <div className="mt-8">
        <SparkLessonGraphView />
      </div>
    </div>
  );
}
