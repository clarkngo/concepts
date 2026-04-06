import courseMetadata from "@/content/course-metadata.json";

export type LessonMeta = {
  slug: string;
  title: string;
  description?: string;
  readMinutes?: number;
};

export type ChapterMeta = {
  id: string;
  title: string;
  lessons: LessonMeta[];
};

export function getCourse() {
  return courseMetadata as {
    title: string;
    description: string;
    chapters: ChapterMeta[];
  };
}

export function getAllLessonSlugs(): string[][] {
  const slugs: string[][] = [];
  for (const ch of getCourse().chapters) {
    for (const lesson of ch.lessons) {
      slugs.push(lesson.slug.split("/").filter(Boolean));
    }
  }
  return slugs;
}

export function findLesson(slugParts: string[]): LessonMeta | undefined {
  const slug = slugParts.join("/");
  for (const ch of getCourse().chapters) {
    const hit = ch.lessons.find((l) => l.slug === slug);
    if (hit) return hit;
  }
  return undefined;
}

export function getLessonPath(slugParts: string[]): string {
  return `${slugParts.join("/")}.mdx`;
}
