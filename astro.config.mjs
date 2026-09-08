// @ts-check
import { defineConfig } from 'astro/config';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeSlug from 'rehype-slug';
import rehypeImageSizes from './plugins/rehype-image-sizes.mjs';

export default defineConfig({
  site: 'https://blog.theodorc.no',
  // The build emits directories, so a link without the slash costs a 301 on
  // every navigation. 'always' makes dev fail the same way production does.
  trailingSlash: 'always',
  // ClientRouter used to switch this on for us. Without it, prefetching has to
  // be asked for: hovering a post link fetches the page before the click.
  prefetch: {
    prefetchAll: true,
    defaultStrategy: 'hover',
  },
  image: {
    layout: 'constrained',
    responsiveStyles: true,
  },
  markdown: {
    rehypePlugins: [
      rehypeSlug,
      [
        rehypeAutolinkHeadings,
        {
          behavior: 'append',
          properties: {
            className: ['heading-anchor'],
            ariaLabel: 'Link to section',
          },
          content: {
            type: 'text',
            value: '#',
          },
        },
      ],
      rehypeImageSizes,
    ],
    shikiConfig: {
      theme: 'gruvbox-dark-medium',
    },
  },
});
