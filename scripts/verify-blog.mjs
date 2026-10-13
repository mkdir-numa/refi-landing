import fs from 'node:fs/promises';
import { parseHTML } from 'linkedom';
const norm = (s) => s.replace(/\s+/g, '');
const slugs = (await fs.readdir('dist/blog')).map((f) => f.replace('.html', ''));
let bad = 0;
for (const slug of slugs) {
  const live = parseHTML(await (await fetch(`https://www.refihub.io/blog/${slug}`)).text()).document;
  const ours = parseHTML(await fs.readFile(`dist/blog/${slug}.html`, 'utf8')).document;
  const a = norm(live.querySelector('[data-framer-name="Content"]').textContent);
  const b = norm(ours.querySelector('.prose').textContent);
  const nums = (s) => (s.match(/[$€R]?\d[\d,.]*%?/g) || []).join(' ');
  const same = a === b, numsSame = nums(a) === nums(b);
  if (!same) {
    bad++;
    let i = 0; while (a[i] === b[i]) i++;
    console.log(`✗ ${slug} (numbers ${numsSame ? 'identical' : 'DIFFER'}) @${i}\n   live: …${a.slice(i - 40, i + 60)}\n   ours: …${b.slice(i - 40, i + 60)}`);
  } else console.log(`✓ ${slug}`);
}
console.log(`\n${slugs.length - bad}/${slugs.length} identical`);
