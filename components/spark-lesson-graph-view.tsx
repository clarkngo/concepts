"use client";

import "@xyflow/react/dist/style.css";

import {
  Background,
  Controls,
  Handle,
  MiniMap,
  type NodeProps,
  Position,
  ReactFlow,
  type ReactFlowInstance,
  useEdgesState,
  useNodesState,
} from "@xyflow/react";
import Link from "next/link";
import { useCallback, useMemo } from "react";

import { buildSparkLessonGraph } from "@/lib/spark-lesson-graph";

type LessonData = {
  title: string;
  href: string;
  description?: string;
  variant: "start" | "stem" | "branch" | "leaf";
};

function SparkLessonNode({ data }: NodeProps) {
  const d = data as LessonData;
  return (
    <div className="w-[min(100vw-2rem,200px)] rounded-xl border-2 border-zinc-200 bg-white px-3 py-2.5 shadow-md ring-1 ring-zinc-100">
      {d.variant !== "start" ? (
        <Handle
          type="target"
          position={Position.Top}
          className="!h-2.5 !w-2.5 !border-2 !border-white !bg-blue-500"
        />
      ) : null}

      <Link
        href={d.href}
        className="block text-sm font-semibold leading-snug text-zinc-900 hover:text-blue-700"
      >
        {d.title}
      </Link>
      {d.description ? (
        <p className="mt-1 line-clamp-3 text-[11px] leading-relaxed text-zinc-600">
          {d.description}
        </p>
      ) : null}

      {d.variant === "start" || d.variant === "stem" ? (
        <Handle
          type="source"
          position={Position.Bottom}
          className="!h-2.5 !w-2.5 !border-2 !border-white !bg-blue-500"
        />
      ) : null}

      {d.variant === "branch" ? (
        <>
          <Handle
            id="split-left"
            type="source"
            position={Position.Bottom}
            style={{ left: "32%" }}
            className="!h-2.5 !w-2.5 !border-2 !border-white !bg-blue-500"
          />
          <Handle
            id="split-right"
            type="source"
            position={Position.Bottom}
            style={{ left: "68%" }}
            className="!h-2.5 !w-2.5 !border-2 !border-white !bg-blue-500"
          />
        </>
      ) : null}
    </div>
  );
}

const nodeTypes = { sparkLesson: SparkLessonNode };

const defaultEdgeOptions = {
  type: "smoothstep" as const,
  style: { stroke: "#94a3b8", strokeWidth: 2 },
};

export function SparkLessonGraphView() {
  const { nodes: initialNodes, edges: initialEdges } = useMemo(
    () => buildSparkLessonGraph(),
    [],
  );

  const [nodes, , onNodesChange] = useNodesState(initialNodes);
  const [edges, , onEdgesChange] = useEdgesState(initialEdges);

  const onInit = useCallback((instance: ReactFlowInstance) => {
    window.requestAnimationFrame(() => {
      instance.fitView({ padding: 0.2, maxZoom: 1.25, minZoom: 0.5 });
    });
  }, []);

  if (initialNodes.length === 0) {
    return (
      <p className="rounded-lg border border-zinc-200 bg-zinc-50 px-4 py-6 text-center text-sm text-zinc-600">
        No Apache Spark lessons found in course metadata.
      </p>
    );
  }

  return (
    <div className="h-[min(78vh,720px)] w-full min-h-[520px] rounded-xl border border-zinc-200 bg-zinc-50/50">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        nodeTypes={nodeTypes}
        onInit={onInit}
        nodesDraggable={false}
        nodesConnectable={false}
        elementsSelectable={true}
        panOnScroll
        zoomOnScroll
        zoomOnPinch
        minZoom={0.35}
        maxZoom={1.5}
        defaultEdgeOptions={defaultEdgeOptions}
        proOptions={{ hideAttribution: true }}
        className="rounded-xl"
      >
        <Background gap={20} color="#e4e4e7" />
        <Controls showInteractive={false} className="!border-zinc-200 !shadow-sm" />
        <MiniMap
          className="!border !border-zinc-200 !bg-white/90"
          nodeStrokeWidth={2}
          zoomable
          pannable
        />
      </ReactFlow>
    </div>
  );
}
