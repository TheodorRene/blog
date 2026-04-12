# agents.md

Instructions for AI agents working on this codebase.

## Project overview

A personal blog at blog.theodorc.no. Static site built with Astro 6, styled with WebTUI CSS and the Gruvbox Dark theme. Conference talk slides (Slidev) are co-located in the repo under `talks/` and built separately.

Dark mode only — no light/dark toggle.

## Tech stack

- **Astro 6** with static output
- **WebTUI** (`@webtui/css`) for terminal-aesthetic styling
- **Gruvbox Dark** theme (`@webtui/theme-gruvbox`) with `data-webtui-theme="gruvbox-dark"` on `<html>`
- **Shiki** for code highlighting with `gruvbox-dark-medium` theme
- **bun** as package manager (not npm/yarn)
- **TypeScript** (strict mode)
- **Slidev** for talk presentation decks

## Key files

| File | Purpose |
|------|---------|
| `astro.config.mjs` | Astro config, site URL, Shiki theme |
| `src/content.config.ts` | Content collection schema (Astro 6 style with `glob()` loader) |
| `src/styles/global.css` | All styling: WebTUI imports, Gruvbox theme, variable aliases, typography rules, code block styling |
| `src/layouts/Base.astro` | Shared layout with nav bar and footer |
| `src/pages/index.astro` | Blog index with terminal-style post listing |
| `src/pages/posts/[slug].astro` | Individual post pages |
| `src/pages/talks/index.astro` | Talks listing page |
| `src/pages/rss.xml.ts` | RSS feed |
| `src/data/talks.json` | Talk metadata |
| `src/content/posts/` | Markdown blog posts |
| `talks/` | Slidev presentation source (each talk in its own subdirectory) |
| `scripts/build-talks.sh` | Builds Slidev decks to `public/talks/[slug]/` |
| `public/img/` | Blog post images |

## Important patterns

### Content collections (Astro 6)

Astro 6 uses `src/content.config.ts` with the `glob()` loader — NOT the older `src/content/config.ts` pattern.

### Draft filtering

Posts with `draft: true` in frontmatter are filtered out in production (`import.meta.env.PROD`) but shown in dev mode. This filtering happens in three places:
- `src/pages/index.astro` (blog index)
- `src/pages/posts/[slug].astro` (page generation)
- `src/pages/rss.xml.ts` (RSS feed)

### CSS variable aliases

WebTUI's Gruvbox theme uses different variable names than some components expect. Compatibility aliases are defined in `src/styles/global.css`:

- `--text` -> `var(--foreground0)`
- `--subtext0` -> `var(--foreground2)`
- `--overlay0` -> `var(--gb-dark-fg4)`
- `--overlay1` -> `var(--gb-dark-gray)`
- `--blue` -> `var(--gb-blue)`
- `--green` -> `var(--gb-green)`

Use these aliases in components, not the raw Gruvbox variable names.

### Code block styling

Code blocks have `background: transparent !important` to override Shiki's inline background color. The border and spacing are handled in `global.css`. Do not add background colors to `pre`, `code`, or `figure` elements inside typography blocks.

### WebTUI quirks

- WebTUI sets `* { margin: 0; padding: 0; }` — all vertical spacing must be added explicitly
- WebTUI typography CSS overrides list markers — custom `::before` and `::marker` rules are needed for non-standard lists (like the post list)
- Use `is-="typography-block"` attribute on containers that need prose styling

### Talks build

Slidev decks don't work in Astro's dev server (route conflict). Use `bun run build && bun run preview` to test talks locally. Each talk has its own `package.json` and dependencies.

## Commands

```bash
bun run dev          # Astro dev server (port 4321)
bun run build        # Full build (talks + blog)
bun run build:blog   # Astro only
bun run build:talks  # Slidev decks only
bun run preview      # Preview production build
```

## Style guidelines

- Keep the terminal aesthetic — compact, monospace-friendly
- All styling goes through `src/styles/global.css`, not inline styles (except in page-specific layouts)
- Gruvbox Dark palette only — no light mode considerations
- Code blocks: transparent background, subtle border, generous padding and line-height
- Blog index uses a terminal-style `ls -la` inspired layout with date, title, and tags
