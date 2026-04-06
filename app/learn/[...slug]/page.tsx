import { notFound } from "next/navigation";
import remarkGfm from "remark-gfm";
import { MDXRemote } from "next-mdx-remote/rsc";

import { MarkComplete } from "@/components/mark-complete";
import { findLesson, getAllLessonSlugs } from "@/lib/course";
import { loadLessonSource } from "@/lib/get-lesson";
import { getMdxComponents } from "@/lib/mdx-components";

type PageProps = {
  params: Promise<{ slug: string[] }>;
};

export async function generateStaticParams() {
  return getAllLessonSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const lesson = findLesson(slug);
  if (!lesson) return {};
  const { data } = await loadLessonSource(slug);
  const title =
    typeof data.title === "string" ? data.title : lesson.title;
  return {
    title: `${title} · Concepts`,
    description:
      typeof data.description === "string"
        ? data.description
        : lesson.description,
  };
}

export default async function LessonPage({ params }: PageProps) {
  const { slug } = await params;
  const lesson = findLesson(slug);
  if (!lesson) notFound();

  const { content, data } = await loadLessonSource(slug);
  const title = typeof data.title === "string" ? data.title : lesson.title;
  const description =
    typeof data.description === "string"
      ? data.description
      : lesson.description;

  return (
    <article className="motion-fade-in-up mx-auto max-w-3xl px-4 py-8 pb-16 md:px-8">
      <p className="text-xs font-medium uppercase tracking-wide text-zinc-500">
        Lesson
      </p>
      <h1 className="mt-2 text-3xl font-bold tracking-tight text-zinc-900">
        {title}
      </h1>
      {description ? (
        <p className="mt-2 text-lg leading-relaxed text-zinc-600">
          {description}
        </p>
      ) : null}

      <div className="prose prose-zinc mt-8 max-w-none prose-headings:scroll-mt-24 prose-headings:font-semibold [&_[role=paragraph]]:leading-relaxed prose-pre:bg-zinc-950 prose-pre:text-zinc-100 prose-code:before:content-none prose-code:after:content-none">
        <MDXRemote
          source={content}
          options={{
            mdxOptions: { remarkPlugins: [remarkGfm] },
          }}
          components={getMdxComponents()}
        />
      </div>

      <MarkComplete key={lesson.slug} slug={lesson.slug} />
    </article>
  );
}
