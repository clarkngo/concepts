import type { MDXComponents } from "mdx/types";

import { CodeGroup } from "@/components/mdx/code-group";
import { Compare } from "@/components/mdx/compare";
import { ConceptStep, ConceptSteps } from "@/components/mdx/concept-steps";
import { Figure } from "@/components/mdx/figure";
import { KeyIdea } from "@/components/mdx/key-idea";
import { MdxParagraph } from "@/components/mdx/mdx-paragraph";
import { SparkStageWalkthrough } from "@/components/mdx/spark-stage-walkthrough";

export function getMdxComponents(): MDXComponents {
  return {
    p: MdxParagraph,
    Figure,
    CodeGroup,
    KeyIdea,
    ConceptSteps,
    ConceptStep,
    Compare,
    SparkStageWalkthrough,
  };
}
