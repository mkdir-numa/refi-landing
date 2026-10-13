import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
import authors from './data/authors.json';

export const CATEGORIES = {
  'asset-updates': 'Asset Updates',
  resources: 'Resources',
} as const;

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      /** Shown under the title and used as the meta description. */
      description: z.string(),
      date: z.coerce.date(),
      category: z.enum(Object.keys(CATEGORIES) as [keyof typeof CATEGORIES]),
      author: z.enum(Object.keys(authors) as [string, ...string[]]),
      cover: image(),
      coverAlt: z.string(),
      /** Pinned in the nav's "Beyond the product" list. */
      featured: z.object({ label: z.string(), blurb: z.string() }).optional(),
      /** The Framer URL this post was imported from. */
      source: z.string().url().optional(),
      draft: z.boolean().default(false),
    }),
});

export const collections = { blog };
