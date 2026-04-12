import fs from 'node:fs/promises';
import path from 'node:path';
import matter from 'gray-matter';
import { Resvg } from '@resvg/resvg-js';

const POSTS_DIR = new URL('../src/content/posts/', import.meta.url);
const OUTPUT_DIR = new URL('../public/og/', import.meta.url);
const POSTS_OUTPUT_DIR = new URL('../public/og/posts/', import.meta.url);

const WIDTH = 1200;
const HEIGHT = 630;
const BACKGROUND = '#282828';
const PANEL = '#1d2021';
const BORDER = '#7c6f64';
const TEXT = '#ebdbb2';
const SUBTEXT = '#a89984';
const GREEN = '#b8bb26';
const BLUE = '#83a598';
const YELLOW = '#fabd2f';

function escapeXml(value) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&apos;');
}

function chunkWords(text, maxChars) {
  const words = text.trim().split(/\s+/).filter(Boolean);
  const lines = [];
  let current = '';

  for (const word of words) {
    const next = current ? `${current} ${word}` : word;
    if (next.length <= maxChars || current.length === 0) {
      current = next;
      continue;
    }

    lines.push(current);
    current = word;
  }

  if (current) {
    lines.push(current);
  }

  return lines;
}

function wrapTitle(title) {
  const compact = title.replace(/\s+/g, ' ').trim();

  for (const limit of [22, 26, 30]) {
    const lines = chunkWords(compact, limit);
    if (lines.length <= 4) {
      return lines;
    }
  }

  return chunkWords(compact, 34).slice(0, 4);
}

function formatDate(dateString) {
  return new Date(dateString).toISOString().slice(0, 10);
}

function renderSvg({ eyebrow, title, meta, footer }) {
  const lines = wrapTitle(title);
  const fontSize = lines.length >= 4 ? 56 : lines.length === 3 ? 64 : 72;
  const lineHeight = Math.round(fontSize * 1.15);
  const startY = 206;

  const titleMarkup = lines
    .map(
      (line, index) =>
        `<text x="96" y="${startY + index * lineHeight}" font-size="${fontSize}" font-weight="700" fill="${TEXT}">${escapeXml(line)}</text>`,
    )
    .join('');

  return `
    <svg width="${WIDTH}" height="${HEIGHT}" viewBox="0 0 ${WIDTH} ${HEIGHT}" xmlns="http://www.w3.org/2000/svg">
      <rect width="${WIDTH}" height="${HEIGHT}" fill="${BACKGROUND}" />
      <rect x="48" y="48" width="1104" height="534" rx="8" fill="${PANEL}" stroke="${BORDER}" stroke-width="2" />
      <rect x="48" y="48" width="1104" height="36" rx="8" fill="${BORDER}" fill-opacity="0.18" />
      <circle cx="76" cy="66" r="6" fill="${GREEN}" />
      <circle cx="98" cy="66" r="6" fill="${YELLOW}" />
      <circle cx="120" cy="66" r="6" fill="${BLUE}" />
      <text x="96" y="132" font-size="28" font-weight="700" fill="${GREEN}">${escapeXml(eyebrow)}</text>
      ${titleMarkup}
      <text x="96" y="498" font-size="28" fill="${SUBTEXT}">${escapeXml(meta)}</text>
      <line x1="96" y1="528" x2="1104" y2="528" stroke="${BORDER}" stroke-width="2" stroke-opacity="0.45" />
      <text x="96" y="564" font-size="24" fill="${BLUE}">${escapeXml(footer)}</text>
    </svg>
  `;
}

function pngFromSvg(svg) {
  const resvg = new Resvg(svg, {
    fitTo: {
      mode: 'width',
      value: WIDTH,
    },
  });

  return resvg.render().asPng();
}

async function listMarkdownFiles(dirUrl) {
  const entries = await fs.readdir(dirUrl, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const entryUrl = new URL(entry.name, dirUrl);
    if (entry.isDirectory()) {
      files.push(...(await listMarkdownFiles(new URL(`${entry.name}/`, dirUrl))));
      continue;
    }

    if (entry.isFile() && entry.name.endsWith('.md')) {
      files.push(entryUrl);
    }
  }

  return files;
}

async function readPosts() {
  const files = await listMarkdownFiles(POSTS_DIR);
  const posts = [];

  for (const fileUrl of files) {
    const source = await fs.readFile(fileUrl, 'utf8');
    const { data } = matter(source);
    const relativePath = path.relative(new URL('../src/content/posts/', import.meta.url).pathname, fileUrl.pathname);
    const slug = relativePath.replace(/\.md$/, '').replaceAll(path.sep, '/');

    posts.push({
      slug,
      title: data.title ?? slug,
      description: data.description ?? '',
      date: data.date,
      tags: Array.isArray(data.tags) ? data.tags : [],
      draft: data.draft === true,
    });
  }

  return posts.sort((a, b) => String(b.date).localeCompare(String(a.date)));
}

async function writePng(fileUrl, svg) {
  await fs.mkdir(new URL('.', fileUrl), { recursive: true });
  await fs.writeFile(fileUrl, pngFromSvg(svg));
}

async function main() {
  await fs.mkdir(OUTPUT_DIR, { recursive: true });
  await fs.mkdir(POSTS_OUTPUT_DIR, { recursive: true });

  const posts = await readPosts();

  await writePng(
    new URL('default.png', OUTPUT_DIR),
    renderSvg({
      eyebrow: 'blog.theodorc.no',
      title: 'Terminal-flavored blog posts and conference talks',
      meta: 'Astro 6 • WebTUI • Gruvbox Dark',
      footer: 'theodorc',
    }),
  );

  for (const post of posts) {
    if (post.draft) {
      continue;
    }

    const meta = [formatDate(post.date), post.tags.slice(0, 3).join(' • ')].filter(Boolean).join('   ');
    await writePng(
      new URL(`${post.slug}.png`, POSTS_OUTPUT_DIR),
      renderSvg({
        eyebrow: 'blog.theodorc.no',
        title: post.title,
        meta,
        footer: post.description || 'theodorc',
      }),
    );
  }
}

await main();
