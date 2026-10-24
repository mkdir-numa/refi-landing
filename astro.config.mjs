import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  // SITE and BASE_PATH can be set by a host that serves the site from a sub-path; Netlify needs neither.
  site: process.env.SITE ?? 'https://www.refihub.io',
  base: process.env.BASE_PATH ?? '/',
  // Keep Framer's URL shape (/blog/<slug>, no trailing slash) so existing links and rankings carry over.
  trailingSlash: 'never',
  build: { format: 'file' },
  // Keep the imported text byte-for-byte (no automatic curly quotes / dashes).
  markdown: { smartypants: false },
  integrations: [sitemap()],
});
