# Changelog

Notable changes to this project are listed here. Use **Bug**, **Feature**, **UX**, and **Refactor** on each entry as described in [docs/POST_WRITE_AND_CHANGELOG.md](docs/POST_WRITE_AND_CHANGELOG.md).

## [Unreleased]

### Added

- **Feature:** Lesson [Associative operations and partitioning](content/lessons/apache-spark/associative-partitioning.mdx) (partition-friendly ops vs subtraction/division and contention).
- **Feature:** Interactive [Apache Spark lesson graph](/learn/apache-spark/graph/) (`@xyflow/react`): pan/zoom, minimap, click-through to lessons; links from sidebar and mobile nav.
- **Feature:** Next.js static site with MDX lessons, course sidebar, progress (local storage), search (⌘K), and Apache Spark track (introduction + DAG lesson).
- **Feature:** Lesson [DAG × Spark: six lenses](content/lessons/apache-spark/dag-deep-dive.mdx) (ELI5 → PM → undergrad → junior → senior → graduate).
- **Feature:** MDX teaching components (`KeyIdea`, `ConceptSteps`/`ConceptStep`, `Compare`, `SparkStageWalkthrough`) and expanded DAG lesson content.
- **Feature:** Lesson [DAGs in the real world](content/lessons/apache-spark/dag-real-world.mdx) (everyday + software examples, contrast with cycles).

### Fixed

- **Bug:** MDX paragraphs render as `<span role="paragraph" className="block">` so body text avoids invalid nested `<p>` and avoids `<div>` inside `<p>` (e.g. labels in `Figure` in `dag-real-world`). Figure diagram labels use `<div>` instead of `<p>`.

### Changed

- **UX:** Subtle motion on search modal, home/lesson entrances, nav links, progress bar, and mark-complete controls; respects `prefers-reduced-motion`.

### Removed

- **Feature:** Cryptography chapter, `CiaThreatSimulator` component, and related CSS (`cia-flow-beam`).
