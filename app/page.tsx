import Link from "next/link";

import { getCourse } from "@/lib/course";

export default function HomePage() {
  const course = getCourse();
  const first = course.chapters[0]?.lessons[0];

  return (
    <main className="mx-auto flex w-full max-w-4xl flex-1 flex-col px-4 py-12 md:px-8">
      <div className="motion-fade-in-up">
        <p className="text-xs font-medium uppercase tracking-wide text-zinc-500">
          Course
        </p>
        <h1 className="mt-2 text-4xl font-bold tracking-tight text-zinc-900">
          {course.title}
        </h1>
        <p className="mt-3 max-w-2xl text-lg leading-relaxed text-zinc-600">
          {course.description}
        </p>
      </div>

      <div className="motion-fade-in-up-delayed mt-10 space-y-10">
        {course.chapters.map((ch) => (
          <section key={ch.id}>
            <h2 className="text-sm font-semibold uppercase tracking-wide text-zinc-500">
              {ch.title}
            </h2>
            <ul className="mt-4 divide-y divide-zinc-200 rounded-xl border border-zinc-200 bg-zinc-50/50">
              {ch.lessons.map((lesson) => (
                <li key={lesson.slug}>
                  <Link
                    href={`/learn/${lesson.slug}/`}
                    className="flex flex-col gap-1 px-4 py-4 transition-[background-color,transform] duration-200 ease-out hover:bg-white active:bg-zinc-100/80 md:flex-row md:items-center md:justify-between motion-reduce:transition-colors"
                  >
                    <div>
                      <p className="font-medium text-zinc-900">{lesson.title}</p>
                      {lesson.description ? (
                        <p className="mt-1 text-sm text-zinc-600">
                          {lesson.description}
                        </p>
                      ) : null}
                    </div>
                    {lesson.readMinutes ? (
                      <span className="shrink-0 text-xs text-zinc-500">
                        ~{lesson.readMinutes} min read
                      </span>
                    ) : null}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>

      {first ? (
        <div className="mt-12">
          <Link
            href={`/learn/${first.slug}/`}
            className="inline-flex rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white shadow-sm transition-[background-color,box-shadow,transform] duration-200 ease-out hover:bg-blue-700 hover:shadow active:scale-[0.98] motion-reduce:active:scale-100"
          >
            Start with {first.title}
          </Link>
        </div>
      ) : null}
    </main>
  );
}
