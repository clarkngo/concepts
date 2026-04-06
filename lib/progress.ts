export const PROGRESS_KEY = "concepts:lesson-progress";

export function readProgress(): Record<string, boolean> {
  if (typeof window === "undefined") return {};
  try {
    const raw = window.localStorage.getItem(PROGRESS_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw) as unknown;
    if (!parsed || typeof parsed !== "object") return {};
    return parsed as Record<string, boolean>;
  } catch {
    return {};
  }
}

export function writeProgress(map: Record<string, boolean>): void {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(PROGRESS_KEY, JSON.stringify(map));
  window.dispatchEvent(new Event("concepts-progress"));
}

export function setLessonDone(slug: string, done: boolean): void {
  const next = { ...readProgress(), [slug]: done };
  writeProgress(next);
}
