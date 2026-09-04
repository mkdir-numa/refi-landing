# ReFi Hub — landing page prototype

A clickable prototype of the repositioned ReFi Hub landing page, built to be shown to the
team. It is a single self-contained HTML file with no build step: open `index.html` in a
browser, or view the published version.

**Live prototype:** https://claude.ai/code/artifact/9b54fbab-1c28-4ac2-9ab2-cda0973ea600

## What this page is for

Public asset listings are closed. Staking is now the only revenue, so the page has one
job: turn ReFi Hub's track record into SOL delegated to the validator via refiSOL. It is a
proof-of-work page, not a marketplace.

Visually it stays inside the existing refihub.io identity rather than introducing a new
one. Same warm off-white ground, the original's own hero photograph, Merriweather for the
hero, Inter for headings, Chivo Mono for labels.

## Structure

| Section | Job |
|---|---|
| Hero | The original headline and one action |
| We turn electricity into USDC | Six live stat cards |
| Live feed | Distributions and charging sessions as they land |
| Six assets. Three countries. One map. | Interactive world map, click a marker for detail |
| refiSOL | The staking pitch, kept short |
| Proof of Work | Backers, community, links to the app, docs and audit |

## Data and the "Data status" toggle

Every figure on the page carries a provenance tag. Click **Data status** in the top bar to
reveal them.

- **real** — pulled from the live asset pages at `app.refihub.io/investments/4..9`. All six
  assets' raised amounts, yields, payment histories and operational notes.
- **verify** — supplied by the team and not yet confirmed: 27 operating assets, +14%
  realized IRR, 22+ months of payments, $39K delivered, 481 MWh produced, $9.2M staked,
  validator uptime, community size.
- **mock** — invented for the prototype: EV charging sessions, the delegation event, and
  all transaction signatures.

All content is driven by one `DATA` block near the top of `index.html`. Wiring real feeds
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

## reference/

- `refihub-tokens.css` — the 23 colour tokens from the published Framer site, with Framer's
  own token IDs kept in comments so a designer can cross-reference them in the editor.
- `refihub-published.css` — the full published CSS from refihub.io. Framer inlines all of
  its CSS into the page HTML rather than serving a stylesheet, so this is the real
  published styling. Useful for looking up exact spacing, radii and type specs.
