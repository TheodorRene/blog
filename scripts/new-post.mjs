import fs from 'node:fs/promises';
import path from 'node:path';

const POSTS_DIR = new URL('../src/content/posts/', import.meta.url);

function slugify(value) {
  return value
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function formatOffset(date) {
  const offsetMinutes = -date.getTimezoneOffset();
  const sign = offsetMinutes >= 0 ? '+' : '-';
  const hours = String(Math.floor(Math.abs(offsetMinutes) / 60)).padStart(2, '0');
  const minutes = String(Math.abs(offsetMinutes) % 60).padStart(2, '0');
  return `${sign}${hours}:${minutes}`;
}

function formatDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');
  return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}${formatOffset(date)}`;
}

function buildTemplate(title, date) {
  return `---
title: ${JSON.stringify(title)}
date: ${JSON.stringify(date)}
description: ""
tags: []
draft: true
---

`;
}

async function main() {
  const title = Bun.argv.slice(2).join(' ').trim();

  if (!title) {
    console.error('Usage: bun run new-post "Post title"');
    process.exit(1);
  }

  const slug = slugify(title);

  if (!slug) {
    console.error('Could not create a valid slug from that title.');
    process.exit(1);
  }

  const filePath = new URL(`${slug}.md`, POSTS_DIR);

  try {
    await fs.access(filePath);
    console.error(`Post already exists: src/content/posts/${slug}.md`);
    process.exit(1);
  } catch {
    // File does not exist yet.
  }

  await fs.mkdir(POSTS_DIR, { recursive: true });
  await fs.writeFile(filePath, buildTemplate(title, formatDate(new Date())), 'utf8');

  console.log(`Created src/content/posts/${path.basename(filePath.pathname)}`);
}

await main();
