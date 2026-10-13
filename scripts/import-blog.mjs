// One-off import of the Framer blog into src/content/blog.
// Reads the server-rendered HTML of every post listed in refihub.io/sitemap.xml,
// converts the article body to Markdown and downloads every image locally so
// nothing hot-links framerusercontent.com (which dies with the Framer plan).
//
//   npm run import:blog            import everything (overwrites existing .md)
//   npm run import:blog -- <slug>  import one post

import fs from 'node:fs/promises';
import path from 'node:path';
import { parseHTML } from 'linkedom';
import TurndownService from 'turndown';

const SITE = 'https://www.refihub.io';
const ROOT = path.resolve(import.meta.dirname, '..');
const POSTS_DIR = path.join(ROOT, 'src/content/blog');
const IMG_DIR = path.join(ROOT, 'src/assets/blog');
const AUTHOR_IMG_DIR = path.join(ROOT, 'src/assets/authors');

// The four posts Framer pins in the "Beyond the product" nav dropdown, with its blurbs.
const FEATURED = {
  'how-solar-assets-generate-revenue-for-investors': { label: 'How it Works', blurb: 'How solar assets generate revenue and pay investors.' },
  'investor-guide': { label: 'Investor Guide', blurb: 'Everything you need to know before your first investment.' },
  'rebusiness-due-diligence-framework': { label: 'Due Diligence Framework', blurb: "How we validate energy assets before they're listed." },
  'crn-build-and-cashflow-update': { label: 'CRN - Build & Cashflow Update', blurb: 'Built, grid-connected & six payments received on schedule.' },
};

const MONTHS = { jan: 1, feb: 2, mar: 3, apr: 4, may: 5, jun: 6, jul: 7, aug: 8, sep: 9, oct: 10, nov: 11, dec: 12 };

const clean = (s) => (s || '').replace(/\s+/g, ' ').trim();

async function get(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`${res.status} ${url}`);
  return res;
}

const downloaded = new Map();
// Framer image URLs carry resize params; the bare URL returns the original upload.
async function download(src, dir) {
  const u = new URL(src, SITE);
  const file = path.basename(u.pathname);
  const key = `${dir}/${file}`;
  if (!downloaded.has(key)) {
    const out = path.join(dir, file);
    try {
      await fs.access(out);
    } catch {
      const buf = Buffer.from(await (await get(`${u.origin}${u.pathname}`)).arrayBuffer());
      await fs.writeFile(out, buf);
    }
    downloaded.set(key, out);
  }
  return downloaded.get(key);
}

function toDate(s) {
  const m = clean(s).match(/^([A-Za-z]{3})[a-z]* (\d{1,2}), (\d{4})$/);
  if (!m) throw new Error(`Unparseable date "${s}"`);
  return `${m[3]}-${String(MONTHS[m[1].toLowerCase()]).padStart(2, '0')}-${m[2].padStart(2, '0')}`;
}

const yamlStr = (s) => JSON.stringify(s);

function makeTurndown() {
  const td = new TurndownService({ headingStyle: 'atx', bulletListMarker: '-', emDelimiter: '*', codeBlockStyle: 'fenced' });
  td.keep(['table', 'iframe', 'video', 'figure']);
  // Framer wraps list text in <p>; flatten so lists stay tight.
  td.addRule('liParagraph', {
    filter: (n) => n.nodeName === 'P' && n.parentNode?.nodeName === 'LI',
    replacement: (c) => c,
  });
  const inHeading = (n) => { for (let p = n.parentNode; p; p = p.parentNode) if (/^H[1-6]$/.test(p.nodeName)) return true; return false; };
  // <br>s inside headings are Framer spacing, not content.
  td.addRule('headingBreak', {
    filter: (n) => n.nodeName === 'BR' && inHeading(n),
    replacement: () => '',
  });
  // Headings are already bold; a <strong> inside one only produces broken "**" markers.
  td.addRule('headingStrong', {
    filter: (n) => (n.nodeName === 'STRONG' || n.nodeName === 'B') && inHeading(n),
    replacement: (c) => c,
  });
  // "**foo,**bar" can't close in CommonMark (punctuation then a letter); fall back to inline HTML there.
  td.addRule('strongBeforeWord', {
    filter: (n) => (n.nodeName === 'STRONG' || n.nodeName === 'B') && !inHeading(n)
      && /[^\w\s]$/.test(n.textContent) && /^\w/.test(n.nextSibling?.textContent || ''),
    replacement: (c) => `<strong>${c}</strong>`,
  });
  // Framer styles some links as inline code; backticks would make the link literal text.
  td.addRule('codeWithChildren', {
    filter: (n) => n.nodeName === 'CODE' && n.parentNode?.nodeName !== 'PRE' && [...n.childNodes].some((c) => c.nodeType === 1),
    replacement: (c) => c,
  });
  return td;
}

async function importPost(slug, authors) {
  const url = `${SITE}/blog/${slug}`;
  const html = await (await get(url)).text();
  const { document } = parseHTML(html);

  const hero = document.querySelector('[data-framer-name="Hero Section"]');
  if (!hero) throw new Error(`No hero section on ${url}`);
  // Framer renders each text twice (desktop + tablet variants); dedupe consecutive repeats.
  const ps = [...hero.querySelectorAll('p')].map((p) => clean(p.textContent)).filter((t, i, a) => t && t !== a[i - 1]);
  const [category, , dateText] = ps;
  const title = clean(hero.querySelector('h1').textContent);
  const readIdx = ps.indexOf('Read');
  const excerpt = ps[readIdx + 1];
  const authorName = ps[readIdx + 2];
  const authorRole = ps[readIdx + 3];

  const imgs = [...hero.querySelectorAll('img')];
  const avatarImg = imgs.find((i) => /width=200/.test(i.getAttribute('src')));
  const coverImg = imgs.find((i) => i !== avatarImg);

  const postImgDir = path.join(IMG_DIR, slug);
  await fs.mkdir(postImgDir, { recursive: true });
  const coverFile = await download(coverImg.getAttribute('src'), postImgDir);

  const authorId = authorName.toLowerCase().replace(/[^a-z0-9]+/g, '-');
  if (!authors[authorId]) {
    const avatarFile = avatarImg ? await download(avatarImg.getAttribute('src'), AUTHOR_IMG_DIR) : null;
    authors[authorId] = { name: authorName, role: authorRole, avatar: avatarFile && path.basename(avatarFile), alt: avatarImg?.getAttribute('alt') || authorName };
  }

  const content = document.querySelector('[data-framer-name="Content"] [data-framer-component-type="RichTextContainer"]')
    || document.querySelector('[data-framer-name="Content"]');
  for (const img of content.querySelectorAll('img')) {
    const local = await download(img.getAttribute('src'), postImgDir);
    img.setAttribute('src', path.relative(POSTS_DIR, local));
    img.removeAttribute('srcset');
    // Alt text carried over from an old Webflow import.
    if (/__wf_reserved/.test(img.getAttribute('alt') || '')) img.setAttribute('alt', '');
  }
  // A trailing <br> just inside <strong>/<a> breaks the Markdown emphasis or link around it.
  for (const br of content.querySelectorAll('br')) {
    let next = br.nextSibling;
    while (next && next.nodeType === 3 && !next.textContent.trim()) next = next.nextSibling;
    if (!next && /^(STRONG|B|EM|I|A|SPAN)$/.test(br.parentNode.nodeName)) br.remove();
  }
  for (const a of content.querySelectorAll('a[href]')) {
    // Blog links stay on this site; any other refihub.io link keeps its absolute Framer URL.
    const href = a.getAttribute('href');
    a.setAttribute('href', href.startsWith('./')
      ? (href.startsWith('./blog') ? href.slice(1) : `${SITE}${href.slice(1)}`)
      : href.replace(/^https?:\/\/(www\.)?refihub\.io(?=\/blog(\/|$))/, ''));
  }
  // Framer uses empty <br> paragraphs as spacers; they come out as stray hard breaks.
  const body = makeTurndown().turndown(content.innerHTML)
    .replace(/^[ \t]+$/gm, '')
    .replace(/^#{1,6}[ \t]*$/gm, '') // empty headings Framer leaves behind
    .replace(/ {2}$(?=\n\n|\n?$(?![\s\S]))/gm, '')
    .replace(/\n{3,}/g, '\n\n')
    .trim();

  const featured = FEATURED[slug];
  const fm = [
    '---',
    `title: ${yamlStr(title)}`,
    `description: ${yamlStr(excerpt)}`,
    `date: ${toDate(dateText)}`,
    `category: ${category.toLowerCase().includes('asset') ? 'asset-updates' : 'resources'}`,
    `author: ${authorId}`,
    `cover: ${yamlStr(path.relative(POSTS_DIR, coverFile))}`,
    `coverAlt: ${yamlStr(coverImg.getAttribute('alt') || title)}`,
    ...(featured ? [`featured: { label: ${yamlStr(featured.label)}, blurb: ${yamlStr(featured.blurb)} }`] : []),
    `source: ${yamlStr(url)}`,
    '---',
    '',
  ].join('\n');

  await fs.writeFile(path.join(POSTS_DIR, `${slug}.md`), `${fm}${body}\n`);
  return { slug, title, category, date: toDate(dateText), author: authorName };
}

async function main() {
  await fs.mkdir(POSTS_DIR, { recursive: true });
  await fs.mkdir(AUTHOR_IMG_DIR, { recursive: true });

  const only = process.argv[2];
  let slugs;
  if (only) {
    slugs = [only];
  } else {
    const sitemap = await (await get(`${SITE}/sitemap.xml`)).text();
    slugs = [...sitemap.matchAll(/<loc>https:\/\/www\.refihub\.io\/blog\/([^<]+)<\/loc>/g)].map((m) => m[1]);
  }

  const authorsFile = path.join(ROOT, 'src/data/authors.json');
  let authors = {};
  try { authors = JSON.parse(await fs.readFile(authorsFile, 'utf8')); } catch {}

  const results = [];
  for (const slug of slugs) {
    try {
      const r = await importPost(slug, authors);
      results.push(r);
      console.log(`✓ ${r.date}  ${r.category.padEnd(13)}  ${slug}`);
    } catch (e) {
      console.error(`✗ ${slug}: ${e.message}`);
      process.exitCode = 1;
    }
  }

  await fs.mkdir(path.dirname(authorsFile), { recursive: true });
  await fs.writeFile(authorsFile, `${JSON.stringify(authors, null, 2)}\n`);

  // The /blog hero photo.
  await fs.mkdir(path.join(ROOT, 'src/assets'), { recursive: true });
  const blogHtml = await (await get(`${SITE}/blog`)).text();
  const hero = blogHtml.match(/https:\/\/framerusercontent\.com\/images\/Pi6e520j5mkEn8u3vQltvZiAKBY\.[a-z]+/);
  if (hero) await download(hero[0], path.join(ROOT, 'src/assets'));

  console.log(`\n${results.length}/${slugs.length} posts imported, ${downloaded.size} images downloaded.`);
}

main();
