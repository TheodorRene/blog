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
