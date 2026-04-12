// @ts-check
import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://blog.theodorc.no',
  markdown: {
    shikiConfig: {
      theme: 'gruvbox-dark-medium',
    },
  },
});
