import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';

export async function GET(context: APIContext) {
  const posts = (await getCollection('posts', ({ data }) => {
    return data.draft !== true;
  })).sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());

  return rss({
    title: 'theodorc',
    description: "theodorc's blog",
    site: context.site!,
    items: posts.map((post) => ({
      title: post.data.title,
      pubDate: post.data.date,
      description: post.data.description,
      link: `/posts/${post.id}/`,
    })),
  });
}
