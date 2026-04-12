// @ts-check
import { defineConfig } from 'astro/config';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeSlug from 'rehype-slug';

export default defineConfig({
  site: 'https://blog.theodorc.no',
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
    ],
    shikiConfig: {
      theme: 'gruvbox-dark-medium',
    },
  },
});
