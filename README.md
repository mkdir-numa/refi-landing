# ReFi Hub — landing page prototype

The repositioned ReFi Hub site: the landing page plus every report and article migrated
out of Framer. It is an [Astro](https://astro.build) site that builds to plain static HTML.

```bash
npm install
npm run dev        # http://localhost:4321
npm run build      # static site in dist/
npm run preview    # serve dist/ locally
```

The landing page is `src/pages/index.astro`. It matches the single-file prototype
`index.html` (October 2026 copy pass). Its CSS lives in `src/styles/global.css` and `landing.css`,
asset photos in `public/assets/`, operator logos in `public/logos/`, and the hero photo in
`public/hero-solar.jpg`. `index.html` is kept as the self-contained version for sharing as an
artifact. Edit the Astro page first, then copy changes across.

The copy follows the staking site's voice: short declarative lines, proof from third parties
(Stakewiz, validators.app, the asset pages), costs and risks named plainly, sentence case, no em
dashes, no italic titles. Stake buttons point to the staking site
(https://mkdir-numa.github.io/reeefisol/ for now; swap in the final domain before launch).

**Live prototype:** https://claude.ai/code/artifact/9b54fbab-1c28-4ac2-9ab2-cda0973ea600

## What this page is for

Public asset listings are closed. Staking is now the only revenue, so the page has one
job: turn ReFi Hub's track record into SOL delegated to the validator via refiSOL. It is a
proof-of-work page, not a marketplace.

Visually it stays inside the refihub.io family and follows `docs/style-guide.md` (October
2026): warm paper, ink bands, the original hero photograph, Merriweather for the hero,
Inter 400 headings, Geist numbers with units in Chivo Mono, and the Daylight palette (sun,
copper, grid). The dotted Sunfield and Daylight sweep artwork is drawn by
`src/scripts/energy.js`. The visual specimen is `docs/style-guide/specimen.html`.

## Structure

| Section | Job |
|---|---|
| We turn clean energy into USDC. | Hero: what we do and how it pays, one button (Check the numbers) |
| Impact investing on Solana DeFi. | Staked SOL as the lead number, five stat tiles, and the two assets that are behind |
| Six assets. Three countries. | Interactive world map with asset detail, operator logo strip |
| Stake SOL. Fund coral reefs. | refiSOL in one line, validator data from Stakewiz |
| Every asset, reported on. | The four latest posts from `/blog` |
| Building on Solana since 2021. | Backers, community, links to the app, docs and audit |

## Data and the "Data status" toggle

Every figure on the page carries a provenance tag. Click **Data status** in the top bar to
reveal them.

- **real** — pulled from the live asset pages at `app.refihub.io/investments/4..9`. All six
  assets' raised amounts, yields, payment histories and operational notes, plus $52.7K paid
  to investors across 65 payments (every listed repayment, summed on 22 Oct 2026).
- **verify** — supplied by the team and not yet confirmed: 27 operating assets, +14%
  realized IRR, 22+ months of payments, $39K delivered, 481 MWh produced, $9.2M staked,
  validator uptime, community size.
- **mock** — invented for the prototype: EV charging sessions, the delegation event, and
  all transaction signatures.

All landing-page figures live in one `DATA` object at the top of `src/pages/index.astro` and are rendered on the server, so they show without JavaScript. Wiring real feeds
later means replacing that block with a fetch; nothing else needs to change.

### Asset reference

| id | Asset | Operator | Country | Raised | Yield | Payments |
|----|-------|----------|---------|--------|-------|----------|
| 4 | Exodos 1 | IPE Assets | Brazil | $32,499.93 | 14.72% | 22, Oct 2024 to Aug 2026 |
| 5 | CRN | Tab Energia | Brazil | $100,000 | 11.29% | 8, Aug 2025 to Mar 2026 |
| 6 | EV Charging Stations | VOX | Brazil (Rio) | $49,999.20 | 9.3% | 7, Oct 2025 to Apr 2026 |
| 7 | Surya | DeCharge | India | $149,999.99 | 12.8% | 7, Jan to Aug 2026 |
| 8 | FLP | PivotGreen | Singapore | $59,000 | 13.98% | monthly, pays until 2049 |
| 9 | FLP II | PivotGreen | Singapore | $100,000 | 21.38% | 5, Apr to Aug 2026 |

Tickets sum to $491,499.

## Honesty constraints

The brief requires that nothing on the page implies a flawless payment record. The page
must never carry "zero missed distributions" or any equivalent claim. The real record
already tells this story, and the map panels carry it:

- Exodos 1 skipped April 2026 and settled it inside a $1,000 payment in May.
- CRN stopped after March 2026 while its power purchase agreement transferred to GEDISA,
  completing 27 April. The plant is generating again; payments are pending, not lost.
- Surya skipped July 2026 because the payout cycle moved to calendar months.
- VOX has not paid since April 2026 and is the weakest asset.

## Open before launch

- Realized IRR reads 14% here, taken from the Framer canvas. The original brief said 12.5%.
- Validator uptime (98%) and commission need confirming.
- The Solidproof audit link is still a placeholder.
- Marker coordinates are city level. The asset listings only give country.

## Reports and articles (`/blog`)

The 22 posts from refihub.io/blog live in `src/content/blog/`, one Markdown file per post,
at the same URLs as on Framer (`/blog/<slug>`), so links and search rankings carry over.
Styling copies the Framer blog as published (measured at 1440px): `src/styles/blog.css`.

| Path | What it is |
|---|---|
| `src/content/blog/*.md` | One post each. The frontmatter holds the metadata. |
| `src/assets/blog/<slug>/` | That post's cover and inline images, optimised at build time |
| `src/data/authors.json` + `src/assets/authors/` | Author names, roles and avatars |
| `src/content.config.ts` | Frontmatter schema. The build fails on a missing field or unknown category. |
| `src/pages/blog/index.astro` | `/blog`: hero, category tabs (`?c=asset-updates`), card grid |
| `src/pages/blog/[slug].astro` | Article: header, cover, table of contents, share, related posts |
| `src/components/PostCard.astro` | The card, also used for the four latest posts on the homepage |
| `src/components/Reveal.astro` | Framer-style fade-up on scroll and word-by-word headlines. Respects reduced motion. |

### Publishing a new post

1. Put the cover image in `src/assets/blog/<slug>/`.
2. Create `src/content/blog/<slug>.md`:

   ```markdown
   ---
   title: "Project Surya — March Operating & Distribution Report"
   description: "One or two sentences. Shown under the title and used for search and social previews."
   date: 2026-03-23
   category: asset-updates        # or: resources
   author: jeremy                 # a key in src/data/authors.json
   cover: "../../assets/blog/<slug>/cover.webp"
   coverAlt: "What the photo shows"
   ---
   #### Overview

   Body in Markdown…
   ```

3. `npm run build`. The sitemap, RSS feed (`/rss.xml`), homepage cards and related posts
   all update themselves. Add `draft: true` to keep a post out of the build.

### Re-importing from Framer

`npm run import:blog` pulls every post in refihub.io's sitemap again and overwrites the
Markdown (`npm run import:blog -- <slug>` does one post). After that,
`npm run verify:blog` checks every post's text word for word against the live page. Both
only work while the Framer site is still up.

## Hosting

`dist/` is static. On Vercel, `vercel.json` sets clean URLs, so `/blog/<slug>` is served
without `.html` or a trailing slash. Cloudflare Pages does the same by default.

## reference/

- `refihub-tokens.css` — the 23 colour tokens from the published Framer site, with Framer's
  own token IDs kept in comments so a designer can cross-reference them in the editor.
- `refihub-published.css` — the full published CSS from refihub.io. Framer inlines all of
  its CSS into the page HTML rather than serving a stylesheet, so this is the real
  published styling. Useful for looking up exact spacing, radii and type specs.
