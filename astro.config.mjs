// @ts-check
import { defineConfig } from 'astro/config';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeSlug from 'rehype-slug';
import rehypeImageSizes from './plugins/rehype-image-sizes.mjs';

export default defineConfig({
  site: 'https://blog.theodorc.no',
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
