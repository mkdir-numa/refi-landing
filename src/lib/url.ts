// The site can be served from the domain root (Vercel, refihub.io) or from a sub-path
// (GitHub Pages: /refi-landing). Build every internal link with u() so both work.
export const base = import.meta.env.BASE_URL.replace(/\/$/, '');
export const u = (path: string) => base + path;
