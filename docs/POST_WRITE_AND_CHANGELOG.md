# Post-write: lessons learned and changelog

Use this after shipping content (lessons), fixes, or UX changes so the project stays explainable and the history stays searchable.

## When to do it

| Trigger | Do this |
|--------|---------|
| Lesson or chapter merged | Add or update **lessons learned** for that unit (see below). |
| User-visible change (site behavior, content structure) | Add a **changelog** entry under the right category. |
| Internal-only cleanup | Changelog under **Refactor** only if it affects maintainability or future contributors; otherwise optional. |

**Cadence:** At minimum, batch updates before a release or a teaching milestone. Do not let more than a few changes accumulate without a changelog line if they affect readers or the public site.

---

## Lessons learned (per lesson or chapter)

**Purpose:** Capture what actually worked, what confused people, and what you would do differently—separate from the polished lesson text.

**Where:** `docs/lessons-learned/` as one file per chapter or per course unit, e.g. `docs/lessons-learned/software-architecture.md`. Use a single file if the course is small.

**After writing or updating a lesson, append a short entry:**

```markdown
## YYYY-MM-DD — &lt;lesson slug or title&gt;

- **What worked:** …
- **What was hard / confusing:** …
- **Changes for next time:** …
- **Links:** PRs, issues, or discussion (optional)
```

**Rules:**

- Be specific; avoid generic notes (“improve diagrams”) unless tied to an example.
- If nothing notable happened, skip the date or write one line: “No new notes.”
- Do not duplicate the lesson body; this is meta, not a second draft.

---

## Changelog

**Purpose:** A single, chronological record of what changed for **bugs**, **features**, **UX**, and **refactors** so deploys and GitHub Pages updates stay understandable.

**Where:** `CHANGELOG.md` at the repository root (same folder as `README.md`).

**Format:** Follow [Keep a Changelog](https://keepachangelog.com/) principles: newest first, version or date sections, bullet entries.

**Categories (use these labels in entries):**

| Label | Use when |
|-------|----------|
| **Bug** | Incorrect content, broken links, build failures, regressions, accessibility defects. |
| **Feature** | New lessons, new pages, CMD+K, new MDX components, paywall blocks, metadata-driven nav. |
| **UX** | Copy, layout, typography, spacing, motion, keyboard/search, progress UI—user-facing but not a “new capability” in the product sense. |
| **Refactor** | Code or content structure changes without intended user-visible behavior change; tooling and CI updates. |

**Entry style:**

- One bullet per logical change; link issues/PRs when helpful.
- Start with the category in bold, then a short imperative or past-tense description.

Example:

```markdown
## [Unreleased]

### Added
- **Feature:** Lesson hub with featured cards and tags (`#42`).

### Fixed
- **Bug:** Sidebar scroll position reset on mark-complete on mobile (`#45`).

### Changed
- **UX:** Increased body line-height and figure caption contrast for readability.

### Changed (internal)
- **Refactor:** Consolidated MDX components under `components/mdx/` (`#41`).
```

If you prefer to keep **UX** and **Feature** under `Added` / `Changed` only, add the **Bug** / **Feature** / **UX** / **Refactor** prefix inside each bullet so filters and search stay consistent.

**Versioning (optional for early stage):**

- Use **`[Unreleased]`** during active work; move items under a dated or numbered release when you tag or deploy to GitHub Pages.
- For a static course site, **date-based sections** (e.g. `## 2026-04-05`) are fine instead of semver.

---

## Quick checklist before you close a task

- [ ] **Lessons learned:** Entry added or consciously skipped for content work.
- [ ] **CHANGELOG:** User-facing or contributor-facing change noted under the right category.
- [ ] Links and file paths in this repo still match where you put notes and `CHANGELOG.md`.
