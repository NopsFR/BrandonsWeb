# Brandon — webcomic site

A foundation for Brandon's webcomic site. No comic content exists yet — the
site is fully structured so real pages, art, and copy can be dropped in
without touching the layout.

## Stack

React + TypeScript + Vite + Tailwind CSS v4, React Router (`HashRouter`, so it
works on GitHub Pages with no server-side rewrites).

## Adding a comic

1. Drop images under `public/comics/<slug>/`:
   ```
   public/comics/my-chapter/cover.webp
   public/comics/my-chapter/001.webp
   public/comics/my-chapter/002.webp
   ```
2. Add an entry to the `comics` array in [src/data/comics.ts](src/data/comics.ts):
   ```ts
   {
     id: "my-chapter",
     slug: "my-chapter",
     title: "Chapter One",
     chapter: 1,
     series: "Main Series",
     description: "A short synopsis.",
     date: "2026-01-15",
     cover: "/comics/my-chapter/cover.webp",
     pages: [
       { id: "1", image: "/comics/my-chapter/001.webp", alt: "Page 1", pageNumber: 1, width: 1200, height: 1800 },
       { id: "2", image: "/comics/my-chapter/002.webp", alt: "Page 2", pageNumber: 2, width: 1200, height: 1800 },
     ],
     status: "ongoing",
     published: true,
   }
   ```

`width`/`height` should be the source image's actual pixel dimensions — the
reader uses them to reserve layout space before each lazy-loaded page image
arrives, so the page doesn't jump around while scrolling.

That's it — Home, Comics, Archive, and the reader at `/comics/my-chapter` all
read from this array automatically.

Social links live in [src/data/socials.ts](src/data/socials.ts) (add a `url`
to make one appear) and About-page content lives in
[src/data/about.ts](src/data/about.ts).

## Fonts & colors

Everything is a CSS variable in [src/index.css](src/index.css) under
`@theme` — swap `--font-display`, `--font-body`, or any `--color-*` value and
the whole site follows.

## Local development

Requires [Node.js](https://nodejs.org) 20+.

```bash
npm install
npm run dev
```

```bash
npm run build    # production build, output in dist/
npm run preview  # preview the production build locally
```

## Deploying to GitHub Pages (free hosting)

A workflow at `.github/workflows/deploy.yml` builds and deploys the site to
GitHub Pages automatically on every push to `main`. One-time setup:

1. Push this repo to GitHub.
2. In the repo, go to **Settings → Pages** and set **Source** to
   **GitHub Actions**.
3. Push to `main` (or run the workflow manually from the **Actions** tab).

The site will be live at `https://<your-username>.github.io/<repo-name>/`.
No manual configuration of the base path is needed — the build reads the
repo name automatically from the GitHub Actions environment.
