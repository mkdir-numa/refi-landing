import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  // GitHub Pages builds set SITE and BASE_PATH (see .github/workflows/deploy.yml).
  site: process.env.SITE ?? 'https://www.refihub.io',
  base: process.env.BASE_PATH ?? '/',
  // Keep Framer's URL shape (/blog/<slug>, no trailing slash) so existing links and rankings carry over.
  trailingSlash: 'never',
  build: { format: 'file' },
  // Keep the imported text byte-for-byte (no automatic curly quotes / dashes).
  markdown: { smartypants: false },
  integrations: [sitemap()],
});
