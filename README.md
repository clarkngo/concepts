# concepts

Visual-first technical guides, built with **Next.js** (static export) for hosting on **GitHub Pages**.

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). The first track is **Apache Spark** (introduction → DAG).

## Production build

```bash
npm run build
```

Static output is written to `out/`. Preview:

```bash
npx serve out
```

## GitHub Pages

Set `NEXT_PUBLIC_BASE_PATH` to your repository name (e.g. `/concepts`) when building so asset URLs resolve under `https://<user>.github.io/<repo>/`:

```bash
NEXT_PUBLIC_BASE_PATH=/concepts npm run build
```

Deploy the contents of `out/` (for example with GitHub Actions).

## Content

- Course structure: `content/course-metadata.json`
- Lessons: `content/lessons/<chapter>/<lesson>.mdx`

Post-write notes: [docs/POST_WRITE_AND_CHANGELOG.md](docs/POST_WRITE_AND_CHANGELOG.md).
