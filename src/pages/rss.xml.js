import rss from '@astrojs/rss';
import { getPosts, CATEGORIES } from '../lib/blog';
import { u } from '../lib/url';

export async function GET(context) {
  const posts = await getPosts();
  return rss({
    title: 'ReFi Hub — reports and articles',
    description: 'Operational updates from live energy assets, investment guides, and analysis from the ReFi Hub team.',
    site: context.site,
    items: posts.map((p) => ({
      title: p.data.title,
      description: p.data.description,
      pubDate: p.data.date,
      link: u(`/blog/${p.id}`),
      categories: [CATEGORIES[p.data.category]],
    })),
  });
}
