# blog.theodorc.no

Personal blog built with [Astro](https://astro.build) and [WebTUI](https://webtui.dev), styled with the Gruvbox Dark theme. Conference talk slides (Slidev) are co-located in the repo and built alongside the blog.

## Stack

- **Astro 6** — static site generator
- **WebTUI + Gruvbox Dark** — terminal-aesthetic CSS framework
- **Shiki** — syntax highlighting (`gruvbox-dark-medium` theme)
- **Slidev** — presentation decks for talks
- **bun** — package manager and runtime
- **Netlify** — hosting (static deploy)

## Structure

```
/                    Blog index (terminal-style post listing)
/posts/[slug]        Individual blog post
/talks               Talks listing page
/talks/[slug]/       Slidev presentation deck (static)
/rss.xml             RSS feed
```

## Development

```bash
bun install
bun run dev          # Start Astro dev server on localhost:4321
```

Note: Slidev talks are not served by the Astro dev server. To test talks locally, run a full build and use preview mode (see below).

## Building

```bash
bun run build        # Build talks + Astro site -> dist/
bun run build:blog   # Build Astro site only
bun run build:talks  # Build Slidev decks only -> public/talks/
bun run preview      # Preview the production build on localhost:4321
```

The build process:

1. `build:talks` runs `scripts/build-talks.sh`, which builds each Slidev deck under `talks/` and outputs to `public/talks/[slug]/`
2. `build:blog` runs `astro build`, which copies `public/` (including built talks) into `dist/`

## Content

### Blog posts

Markdown files in `src/content/posts/`. Frontmatter:

```yaml
---
title: "Post Title"
date: "2024-06-12T00:00:00+02:00"
description: "Short description"
tags: ["tag1", "tag2"]
draft: true  # optional -- hidden from index and RSS in production
---
```

### Talks

Talk metadata lives in `src/data/talks.json`. Slidev source decks live in `talks/[slug]/`, each with their own `package.json` and `slides.md`.

## Deploy

Deployed to Netlify. Config is in `netlify.toml` — runs `bun run build` and publishes `dist/`.
