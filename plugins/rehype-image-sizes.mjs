/**
 * Astro's `constrained` layout emits `sizes="(min-width: 1600px) 1600px, 100vw"`
 * for markdown images. The prose column is capped at 80ch, around 780px, so
 * `100vw` makes a wide viewport pick a much larger candidate from the srcset
 * than it can ever display.
 *
 * User rehype plugins run before Astro's image pass, so there is no srcset to
 * react to yet. Instead this sets `sizes` on the source image, which
 * `rehype-images` forwards into `getImage()` and Astro keeps in place of its
 * own default.
 */
const COLUMN = '800px';

export default function rehypeImageSizes() {
  return (tree) => visit(tree);
}

function visit(node) {
  if (node.type === 'element' && node.tagName === 'img' && isAssetImage(node.properties?.src)) {
    node.properties.sizes = `(max-width: ${COLUMN}) 100vw, ${COLUMN}`;
  }

  for (const child of node.children ?? []) {
    visit(child);
  }
}

/** Relative paths are the ones astro:assets processes. `/img/...` and remote URLs are served as-is. */
function isAssetImage(src) {
  return typeof src === 'string' && !src.startsWith('/') && !/^[a-z]+:/i.test(src);
}
