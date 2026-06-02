# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

A [Slidev](https://sli.dev/) presentation — "The Fundamentals of Agentic Coding" (NDC 2026 Copenhagen). The core artifact is `slides.md`; everything else supports it.

## Commands

```bash
bun dev          # Start dev server at http://localhost:3030
bun run build    # Build to dist/
bun run export   # Export slides to PDF/images
```

## Deployment

This talk is not its own site. It ships as a subpath of the main blog at `/talks/agentic-dev/`.

- The blog's root build runs `scripts/build-talks.sh`, which auto-discovers every `talks/*/` containing a `slides.md` and runs `slidev build --base "/talks/<slug>/"` into the blog's output. No per-talk deploy config (`netlify.toml`, `vercel.json` here) is used by that pipeline.
- To make a talk appear in the blog's `/talks` listing, add an entry to `src/data/talks.json` at the repo root. Without it the talk still builds and is reachable by URL, but nothing links to it.
- Assets referenced from `slides.md` must be git-tracked; Netlify builds from the repo, not your working tree.
- Deploy happens on push to the repo. There is no manual deploy step.

## Structure

- `slides.md` — the entire presentation (single source of truth)
- `pages/` — additional slide files that can be imported into slides.md via `src:` frontmatter
- `components/` — Vue components usable directly in slides via `<ComponentName />`
- `snippets/` — TypeScript/code files that can be embedded in slides via `<<< @/snippets/file.ts`
- `public/images/` — static assets referenced in slides as `/images/filename.png`

## Slidev-specific patterns

Slides are separated by `---` in `slides.md`. Each slide can have YAML frontmatter for layout, transitions, and other options. The theme is set at the top of `slides.md`.

Layouts available: `cover`, `intro`, `section`, `two-cols`, `image-right`, `center`, `quote`, and others from the active theme.

To split slides across files, use `src: ./pages/other-file.md` as a slide separator.
