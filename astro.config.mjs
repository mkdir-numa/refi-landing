import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://www.refihub.io',
  // Keep Framer's URL shape (/blog/<slug>, no trailing slash) so existing links and rankings carry over.
  trailingSlash: 'never',
  build: { format: 'file' },
  // Keep the imported text byte-for-byte (no automatic curly quotes / dashes).
  markdown: { smartypants: false },
  integrations: [sitemap()],
});
