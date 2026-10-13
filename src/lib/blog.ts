import { getCollection, type CollectionEntry } from 'astro:content';
import type { ImageMetadata } from 'astro';
import authorData from '../data/authors.json';
import { CATEGORIES } from '../content.config';

export type Post = CollectionEntry<'blog'>;
export { CATEGORIES };

/** Published posts, newest first. Same-day posts keep a stable order by title. */
export async function getPosts(): Promise<Post[]> {
  const posts = await getCollection('blog', ({ data }) => import.meta.env.DEV || !data.draft);
  return posts.sort((a, b) => b.data.date.getTime() - a.data.date.getTime() || a.data.title.localeCompare(b.data.title));
}

const avatars = import.meta.glob<ImageMetadata>('../assets/authors/*', { eager: true, import: 'default' });

export function getAuthor(id: string) {
  const a = (authorData as Record<string, { name: string; role: string; avatar: string | null; alt: string }>)[id];
  return { ...a, avatar: a.avatar ? avatars[`../assets/authors/${a.avatar}`] : undefined };
}

/** Framer's mono date format: "FEB 23, 2026" (uppercased in CSS). */
export const formatDate = (d: Date) =>
  d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', timeZone: 'UTC' });

export function readingMinutes(markdown: string) {
  const words = markdown.replace(/!\[[^\]]*\]\([^)]*\)/g, '').split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}
