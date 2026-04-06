import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";

import { getLessonPath } from "@/lib/course";

export type LessonFile = {
  content: string;
  data: Record<string, unknown>;
};

export async function loadLessonSource(slugParts: string[]): Promise<LessonFile> {
  const rel = getLessonPath(slugParts);
  const full = path.join(process.cwd(), "content", "lessons", rel);
  const raw = await fs.readFile(full, "utf8");
  const { content, data } = matter(raw);
  return { content, data };
}
