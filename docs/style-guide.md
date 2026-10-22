# ReFi Hub website style guide

Draft for review, 22 October 2026. Nothing on the site has changed yet. This guide is the plan for the next design pass on the Astro site in this repo.

**See it, don't just read it.** The specimen page shows every rule below, with the motif sketches animated. To open it, run the `landing-static` preview (or `python3 -m http.server 4178` in this folder) and go to http://localhost:4178/docs/style-guide/specimen.html. You can also open the file directly in a browser. The toggle at the top switches between the two accent sets.

Decisions for you are marked **Decision**. Each one has a recommendation, but the call is yours.

---

## 1. Where we are

### The landing site today

The copy is close to final and the structure is right: hero, record, map, refiSOL, reports, since 2021, footer. The page already uses the right four typefaces. It still feels basic, for these reasons:

| What | Today | Why it reads as basic |
|---|---|---|
| Section headings | Inter **700** at 30 to 50px | Bold sans headings are the generic startup look. refihub.io and the staking site both set headings in Inter **400** with tight tracking. Weight is doing work that size should do. |
| Section openings | Every section opens with heading, grey lede, grid | There are no kickers (the `.eyebrow` style exists but is never used), no numbering and no change of pace. Six sections all start the same way. |
| Type sizes | 24 different font sizes, from 9px to 36px, plus fluid ones | No scale. Mono labels range from 9 to 11px with tracking from .06em to .16em. 9 and 9.5px labels are too small to read on a phone. |
| Containers | 1180px, 1320px (map) and 1440px (reports) on one page | The left edge of the content jumps between sections, which looks unplanned. |
| Radii | 2, 3, 8, 9, 14, 16, 18, 64 and 100px | Nine radii. Two plus the pill are enough. |
| Blacks | `#000` footer, `#151412` refiSOL band, `#141313` text | Three near-blacks that almost match look like a mistake. |
| Colour | One accent: teal `#68CCC5` | Teal reads as water, which belongs to the staking site. Nothing in the palette says sunlight, power or charging. |
| Stat cards | Six identical white cards with shadows | Uniform tiles with no hierarchy. On a phone they stack into a very long column. They stay hidden until scrolled into view, so the page shows blank areas while you scroll. |
| Reports | Four tall Framer cards (560px), two columns on tablet, one on phone | The tallest section on the page, and mostly images. |
| Phone nav | The links disappear below 940px and there is no menu | Phone visitors only get the Stake button. |
| Contrast | Faint grey `#A29B95` on paper is 2.6:1. Muted `#767676` on sand is 3.9:1 | Both fail the 4.5:1 minimum for small text (stat sub-lines, map legend). |
| Artwork | A dotted world map, and nothing else | The map already uses dots. It is the seed of a motif that the rest of the page never picks up. |

### Why the staking site works

The staking site uses the same four typefaces, yet it looks designed. The difference is discipline:

1. **One job per typeface.** Merriweather 300 appears only for the one emotional line per page (hero, timeline numerals, the giant total, the footer tagline). Inter 400 with tight tracking (-.04em) does every section heading, so headings feel calm and editorial. Geist at weight 330 sets every number, with its stylistic alternates switched on. Chivo Mono, uppercase, 12px, .08em tracking, in an accent colour, sets the kickers.
2. **Contrast from size, not weight.** Almost nothing is bold. A 76px light number next to 15px body text gives all the hierarchy the page needs.
3. **Restraint with colour.** The page is mostly paper and ink. Each element gets one accent at most: a kicker, a step rule or a status dot.
4. **Generous, regular rhythm.** Sections sit 64 to 112px apart, with one container (1160px) and one card radius (18px).
5. **Numbers as heroes.** "190.8K SOL" is the largest thing in its band, with a "Live from Stakewiz" dot beside it. The proof carries the design.
6. **A consistent motif.** One dotted drawing language runs through the hero art, card art, map, section backgrounds and timeline. It is drawn in code, so it stays sharp and can react to the pointer.
7. **Dark ink bands.** Light sections are broken up by `#0f0e0c` bands at the proof moments (total staked, delegation programs). The page has a pulse: light, light, dark, light.
8. **Ledger layouts.** Rows of "title, explanation, big number" read like an infrastructure memo, not a marketing page.

### The brief for ReFi Hub

ReFi Hub should feel like a sibling of the staking site: same paper, same ink, same typefaces, same restraint. It is a different business, though. ReFi Hub finances solar plants and EV chargers, so its own identity comes from **sunlight, power lines and meters**, where the staking site has reefs, polyps and plankton.

The family thread is shared on purpose: paper `#FBFAF9`, ink bands `#0f0e0c`, the four typefaces, 18px cards and the golden pulse. The difference comes from three things:

- **Colour.** Sun and grid tones, not sea and coral.
- **Motif geometry.** Square dots on a grid, straight runs and cable sags, where the reef has round dots and organic curves.
- **Numbers.** Readouts styled like meters, with units in mono. ReFi Hub's signature is the metered number. The staking site's is the serif statement.

---

## 2. Typography

Same four families as refihub.io and the staking site. All are on Google Fonts. Load only the weights below.

| Family | Role | Weights |
|---|---|---|
| **Merriweather** | Hero headline and one statement line per page | 300 |
| **Inter** | Section headings, body, buttons | 400, 500 (600 only for the logo wordmark fallback) |
| **Geist** | Every number: readouts, stat values, table figures | 200, 300, 400 |
| **Chivo Mono** | Kickers, labels, units, dates, sources | 400, 500 |

Drop Inter 300 and 700 from the font request. Nothing should be set in Inter 700.

### Scale

Base 16px. Sizes step on a ratio of about 1.25 and grow fluidly between phone and desktop.

| Token | Use | Family and weight | Size | Line height | Tracking |
|---|---|---|---|---|---|
| `--t-display` | Hero h1 | Merriweather 300 | clamp(40px, 6vw, 76px) | 1.06 | -.015em |
| `--t-statement` | One quote or tagline per page, footer tagline | Merriweather 300 | clamp(26px, 3vw, 36px) | 1.2 | -.01em |
| `--t-h2` | Section headings | Inter 400 | clamp(32px, 4.2vw, 56px) | 1.06 | -.04em |
| `--t-h3` | Card titles, ledger row titles, panel names | Inter 400 | clamp(20px, 2vw, 26px) | 1.2 | -.02em |
| `--t-h4` | Small card titles, list titles | Inter 500 | 17px | 1.35 | -.01em |
| `--t-lead` | Text under a heading | Inter 400 | clamp(18px, 1.6vw, 21px) | 1.5 | -.005em |
| `--t-body` | Paragraphs | Inter 400 | 16px | 1.6 | 0 |
| `--t-small` | Card text, notes | Inter 400 | 14px | 1.55 | 0 |
| `--t-fine` | Data sources, disclaimers | Inter 400 | 13px | 1.5 | 0 |
| `--t-kicker` | Above each section heading | Chivo Mono 400, uppercase | 12px | 1.3 | .08em |
| `--t-label` | Stat labels, table heads, legends, dates | Chivo Mono 400, uppercase | 11px | 1.4 | .08em |

### Numbers

| Token | Use | Family and weight | Size | Tracking |
|---|---|---|---|---|
| `--n-xl` | One statement number per page (for example total raised) | Geist 200 | clamp(72px, 10vw, 136px) | -.045em |
| `--n-l` | The lead number in a band (staked SOL) | Geist 300 | clamp(52px, 5.4vw, 76px) | -.045em |
| `--n-m` | Meter tiles | Geist 300 | clamp(36px, 4vw, 52px) | -.03em |
| `--n-s` | Key-value pairs in panels and tables | Geist 400 | 22px | -.015em |

Rules for numbers:

- Always turn on `font-variant-numeric: tabular-nums` and Geist's alternates: `font-feature-settings: "ss03","cv03","cv04","cv09","cv11"`, as the staking site does.
- Units sit after the number in **Chivo Mono at 0.32em**, muted, uppercase where they are letters: `142.7` `K SOL`, `481` `MWH`, `21.38` `%`. This "meter readout" is ReFi Hub's typographic signature.
- Currency symbols stay in Geist, at the same size: `$39K`.
- Each number carries a source line in `--t-fine` or `--t-label`: "Stakewiz, 13 Oct 2026", with a status dot when it is live.

### Rules

- Sentence case everywhere, including buttons. Mono labels are the only uppercase text.
- No italics in headings. No bold inside headings.
- Bold inside body text is Inter 500, used once per paragraph at most.
- Keep paragraphs to about 62 characters wide (`max-width: 62ch`) and leads to about 56.
- Use `text-wrap: balance` on headings and `text-wrap: pretty` on leads.
- Never set text smaller than 11px. Never track lowercase text wider than 0.

---

## 3. Colour

### Neutrals (carry over unchanged)

These come from the refihub.io tokens (`reference/refihub-tokens.css`) and match the staking site. They are the family thread.

| Token | Hex | Use |
|---|---|---|
| `--paper` | `#FBFAF9` | Page background |
| `--sand` | `#F2ECE8` | Alternate band (map section) |
| `--card` | `#FFFFFF` | Cards, panels |
| `--rule` | `#EDEDED` | Hairlines on paper |
| `--rule-cool` | `#E2E8F0` | Card borders |
| `--text` | `#222222` | Body text (15:1 on paper) |
| `--heading` | `#0F0E0C` | Headings and numbers |
| `--muted` | `#6A645E` | Leads, secondary text (5.6:1 on paper, 5.0:1 on sand). Replaces `#767676` |
| `--label` | `#78716C` | Mono labels (4.6:1 on paper). Replaces the faint `#A29B95` for any text |
| `--ink` | `#0F0E0C` | Dark bands and the footer. One black for everything |
| `--ink-2` | `#1A1917` | Cards and tiles on ink |
| `--ink-rule` | `#2A2825` | Hairlines on ink |
| `--on-ink` | `#E9E5DF` | Text on ink |
| `--on-ink-muted` | `#A8A29E` | Secondary text on ink (7.6:1) |

`#A29B95` can stay for non-text use only, such as land dots on the map.

### Energy accents

The staking site's accents are sea, coral, leaf and sun. ReFi Hub keeps **sun** as the shared thread (the golden pulse appears on both sites) and adds its own set.

**Decision: which accent set?** Both pass contrast. The specimen page toggles between them.

**Set A, Daylight (recommended).** Solar-led and warm. It sits naturally on the warm paper, it is clearly not the staking site's sea and coral, and copper gives the "behind on payments" state a colour that belongs to the palette.

| Token | Hex | Use |
|---|---|---|
| `--sun-100` | `#FAEFD6` | Tint band, solar badge background |
| `--sun-300` | `#F5C76A` | Kickers and highlights on ink (12:1) |
| `--sun-500` | `#E9A93A` | Pulses, solar dots, rules, fills. Not for text on paper |
| `--sun-700` | `#8A5A00` | Kickers and text accents on paper (5.7:1) |
| `--copper-100` | `#F7E3D7` | Behind-on-payments tint |
| `--copper-500` | `#C4673A` | Behind-on-payments dots, cable highlights |
| `--copper-700` | `#8F3F1C` | Behind-on-payments text (7.0:1) |
| `--grid-100` | `#E7ECF4` | EV tint, cool band |
| `--grid-500` | `#7489AD` | Motif dots, EV markers |
| `--grid-700` | `#415371` | refihub.io's own slate. EV text, secondary accent (7.5:1) |
| `--grid-900` | `#1C2638` | Deep panels, alternative dark band |

**Set B, Current.** EV-led and cooler. Slate grid becomes the main accent, with an electric "volt" green for charge. More tech, less warm. The risk is that volt green sits close to crypto-brand green.

| Token | Hex | Use |
|---|---|---|
| `--volt-100` | `#EEF6D2` | Charge tint |
| `--volt-300` | `#C9E66B` | Kickers and pulses on ink (13.8:1) |
| `--volt-500` | `#A3C93A` | Pulses, charge fills. Not for text on paper |
| `--volt-700` | `#3D5A14` | Text accents on paper (7.5:1) |
| plus `--grid-*` and `--sun-*` as in set A | | Kickers use `--grid-700` on paper |

### Status colours (both sets)

| State | Text | Tint | Shape |
|---|---|---|---|
| Paying | `#2E6B47` | `#E2F0E6` | Filled dot |
| Behind on payments | `#8A4F16` | `#F6E6D6` | Filled dot, plus the word "Behind" |
| Live data | `--sun-500` dot with a soft ring | | Pulsing dot, static under reduced motion |
| Data status tags (real, verify, mock) | Keep the current green, slate and amber | | Team-only toggle |

Status is never shown by colour alone. Every status has a word ("Paying", "Behind on payments"), and asset types also differ by shape (solar is a circle, EV charging is a square).

### The Stake button: a doorway colour

Every "Stake SOL" button leads to the staking site. It should wear the **staking site's** colours so the button itself says where it goes:

- On paper: `#0D3A42` (sea-900) background, white text.
- On ink: `#8FD3C8` (mint) background, `#0D3A42` text (7.2:1).

That makes it the only sea-coloured thing on ReFi Hub. The refiSOL band is the one place where the staking site's palette may appear, because it is the doorway between the two sites.

### Proportions

Roughly 85% paper, sand and white, 10% ink, 5% accent. On a light section, use at most two accent colours. If a section already has a photo, it gets no accent fills.

---

## 4. Spacing and grid

### Tokens

A 4px base with a short scale. Use only these values for gaps, padding and margins.

| Token | px | Typical use |
|---|---|---|
| `--s-1` | 4 | Icon to label |
| `--s-2` | 8 | Label to value |
| `--s-3` | 12 | Button groups, chip gaps |
| `--s-4` | 16 | Card grid gap, kicker to heading |
| `--s-5` | 24 | Heading to lead, inside cards on phone |
| `--s-6` | 32 | Card padding on desktop |
| `--s-7` | 48 | Head to content on phone |
| `--s-8` | 64 | Head to content on desktop, between sub-blocks |
| `--s-9` | 96 | |
| `--s-10` | 128 | |

### Section rhythm

| Token | Value | Use |
|---|---|---|
| `--section` | clamp(64px, 9vw, 120px) top and bottom | Every main section |
| `--section-tight` | clamp(48px, 6vw, 72px) | Logo strips, notices, the operator strip |
| `--head-gap` | clamp(32px, 4vw, 56px) | Section head to its content |

A section head is: kicker, then 16px, then h2, then 24px, then lead. The head is never wider than 720px.

Bands alternate so that no two neighbouring sections share a background, and an ink band appears about every third section. For the landing page that gives: hero (photo), record (paper), map (sand), refiSOL (ink), reports (paper), since 2021 (sand), footer (ink).

### Containers

| Token | Value | Use |
|---|---|---|
| `--maxw` | 1200px | **The one container.** Every section, including map and reports |
| `--narrow` | 720px | Text-only blocks, FAQ, notices |
| `--gutter` | clamp(16px, 4vw, 40px) | Left and right padding inside the container |

The blog pages keep their own 1440px Framer layout for now. Line them up with 1200px in the same pass if possible, so the site has one edge.

### Grid

- 12 columns, 24px column gap on desktop and 16px on phone.
- Common splits: 6/6, 7/5 (copy beside a readout or art), 5/7 (head beside a list), 4/8 (a lead number beside a grid of tiles).
- Card grids: 3 across on desktop, 2 at 860px, 1 at 520px. Gap 16px.
- Split layouts (copy beside art) use a gap of clamp(32px, 6vw, 72px) and collapse to one column at 860px, with art above copy.
- Breakpoints: 1040, 860 and 520px (the same as the staking site).

### Radii

| Token | Value | Use |
|---|---|---|
| `--r` | 18px | Cards, panels, images, map plate |
| `--r-sm` | 10px | Inputs, small chips, thumbnails |
| `--r-lg` | 28px | The closing CTA card only |
| pill | 999px | Buttons, badges |

---

## 5. Components

Each component is shown in the specimen.

### Buttons

Pill shape, Inter 500 15px, padding 14px 26px, minimum 44px tall. On hover: lift 1px and a slightly lighter background. No shadows.

| Variant | Light page | On ink | Use |
|---|---|---|---|
| Primary | `--ink` background, white text | White background, ink text | The main action in a section |
| Ghost | Transparent, 1px border at 25% ink | Transparent, 1px border at 28% white | Secondary action |
| Stake | sea-900 `#0D3A42`, white text | Mint `#8FD3C8`, sea-900 text | Only for Stake SOL |
| Link | Mono 12px uppercase, underline in `--sun-500` | Same, underline in `--sun-300` | "Open the asset page", "All reports" |

At most two buttons side by side. An arrow (→) only on links that leave the page.

### Kicker

Chivo Mono 12px, uppercase, .08em, in `--sun-700` on paper or `--sun-300` on ink. It is **numbered** with a short rule:

`01 ── The record`

The number is the section's position on the page, and the rule is a 24px hairline in the same colour. Numbered kickers make the page read like a report or a site survey, and the staking site does not number its kickers, which sets the two apart. On the blog, the kicker becomes the category ("Asset updates").

### Meter tile (replaces the stat card)

A number styled as a readout, not a floating card.

- Label on top: `--t-label`, `--label` colour.
- Value: `--n-m` Geist 300, with the unit in mono at 0.32em.
- Sub-line: `--t-small`, `--muted`, one line where possible.
- Source: `--t-fine` with a status dot.
- Tiles sit in a **hairline grid**: a 1px gap over a `--rule` background, inside one 18px-radius frame, like the validator metrics in the current refiSOL band. One frame, no shadows, no gaps between boxes.
- On a phone: two columns of tiles at 520px and below, never one long stack.

### Lead number

One per band, at most. `--n-l` or `--n-xl` Geist, with a kicker above, one line of explanation and a source line. It always sits at the left of its band, beside the content it summarises (the staking site's "190.8K SOL beside the logo grid").

### Cards

White, 1px `--rule-cool` border, 18px radius, padding clamp(22px, 3vw, 32px). No shadow at rest. Linked cards: border darkens to `--heading` on hover and the card lifts 2px. Card title in `--t-h3`, text in `--t-small` muted, link line in mono at the bottom.

On ink: `--ink-2` background, `--ink-rule` border.

### Ledger rows

For any list of three to six facts with a number each (backers, why ReFi Hub, terms):

`Title (--t-h3) | Explanation (--t-body, muted, max 52ch) | Number (--n-m), right-aligned`

Each row has a 1px `--rule` top border and clamp(24px, 3vw, 40px) of vertical padding. On a phone, the number moves above the title.

### Lists

- Bullets are 6px **squares** in `--sun-500` (round dots belong to the reef).
- Numbered steps use Geist 200 numerals at 48px in alternating accent colours (sun, copper, grid), with a 1px vertical rule joining them. This is the staking timeline with meter numerals in place of serif ones.
- Definition lists (asset panel): mono label above a Geist value, two columns.

### Badges and source lines

- Status badge: pill, Chivo Mono 11px uppercase, tint background, text colour from the status table, plus a 6px dot.
- Source line: "● Live from Stakewiz · 13 Oct 2026" in `--t-fine`. The dot is `--sun-500` with a 3px soft ring when live, grey when saved.

### Bands

| Band | Background | Use |
|---|---|---|
| Paper | `--paper` | Default |
| Sand | `--sand` | Every other section |
| Ink | `--ink` | Proof moments: the refiSOL band, a lead-number strip. At most two per page, plus the footer |
| Sun tint | `--sun-100` | Rare. One notice or callout per page at most |

Ink bands may carry a motif canvas behind the content, at low opacity.

### Notice

For the honest note ("Two assets are behind"): a single line in `--t-small`, a 6px copper dot, a 1px `--rule` top border, max 68ch. Calm, not an alert box.

### Nav

68px tall, paper at 86% opacity with blur, hairline appears on scroll (like the staking site). Links in Inter 400 15px muted, dark on hover or when current. Stake button on the right. **Below 860px: a "Menu" button that opens the links in a full-width sheet.** The Data status toggle stays team-only.

### Footer

`--ink` background (the same black as the bands). Logo, then the tagline "Energy finance starts here." in `--t-statement` Merriweather 300, then the columns, with mono column headings (`--t-label`) and Inter 400 links.

---

## 6. Layout patterns for the landing page

Each pattern is drawn in the specimen with the real copy.

### Hero: "Solar and EV charging, paid in USDC."

**Decision: photo or motif?**

- **Hero A, photo with a readout strip (recommended).** Keep the solar photo, which the team chose to keep from refihub.io. Add a kicker ("ReFi Hub ── Since 2021"), keep the Merriweather h1, and run a **readout strip** along the bottom of the hero: three meter readouts on a thin ink bar (for example "6 assets", "3 countries", "$491,499 raised"). The photo sets the scene and the readouts give proof before the first scroll.
- **Hero B, paper with motif.** Like the staking site: Merriweather h1 and lead on paper at left, the animated energy motif at right, meter tiles under both. The photo moves into the map panel. This is closer to the staking site, so it's more family and less difference.

### 01 Record: "We turn electricity into USDC."

A 4/8 split. Left: kicker, h2, lead, then **one lead number** ($491,499 raised across six assets, or the paid-to-investors figure once confirmed). Right: the other stats as a **hairline meter grid**, 3 by 2 on desktop and 2 by 3 on phone. Below: the honest note as a **notice** with a copper dot. No count-up hiding: the numbers are visible from the start, and the count-up only runs if the tile is on screen at load.

### 02 Assets: "Six assets. Three countries."

Keep the map plate and the side panel. They are the best part of the page. Changes:

- Same 1200px container as everything else.
- Map dots drawn in the motif style: square land dots, solar assets as sun-coloured circles, EV assets as grid-coloured squares, assets behind on payments in copper with the word in the panel.
- Legend and country labels at 11px, in `--label`.
- Panel values use `--n-s`, labels `--t-label`.
- The operator logo strip becomes a `--section-tight` row with a mono label at left and logos at 28px height, one line on desktop.

### 03 refiSOL: "Stake SOL. Fund coral reefs."

The ink band and the doorway to the staking site. A 7/5 split: copy and the two buttons on the left (Stake in mint), and on the right a **lead number** (142.7K SOL staked) above a 2 by 2 hairline meter grid on `--ink-2`. Behind it, the "Grid lines" motif in its dark version, with pulses flowing towards the validator node, at about 40% opacity and masked away from the text. This is the only band where the staking site's mint appears.

### 04 Reports: "Every asset, reported on."

Replace the four tall cards with a **featured and list** layout. Left (7 columns): the latest report as a large card with its cover image (16:10), date and category in mono, and the title in `--t-h3`. Right (5 columns): the next three as compact ledger rows (date in mono, then the title, with a 1px top rule). "All reports" as a link button in the head. Roughly half the height of today's section.

### 05 Since 2021: "Building since 2021."

On sand. Backers and the community as **ledger rows** (name, role, a number where there is one, such as "1,500 members"). Then the three link cards (app, docs, audit) in a 3-column grid, with the mono link line at the bottom of each card.

### Closing (optional)

If a final call to action is wanted above the footer: one `--r-lg` ink card holding a statement line in Merriweather and the Stake button, with the "Sunfield" motif in one corner.

---

## 7. Artwork and motif

The staking site's stipple is **organic**: round dots, polyps, fronds, plankton drifting upwards, a coral-pink and gold palette. ReFi Hub's version must feel like the same printing technique applied to **infrastructure**.

### What makes it ReFi Hub's and not the reef's

| | Staking site (reef) | ReFi Hub (energy) |
|---|---|---|
| Dot shape | Round | **Square**, aligned to a grid |
| Geometry | Curves, fronds, petals | Straight runs, right angles, rows of cells, cable sags |
| Movement | Drift, sway, breathe | **Travel and fill**: pulses along a line, a sweep across a field, a meter filling |
| Rhythm | Irregular, natural | Regular, periodic, like a clock or a meter |
| Colour | Sea lines, coral and gold accents | Grid-slate dots, sun or volt pulses, copper for faults |
| Pointer | Polyps open, dots scatter | Dots light up near the pointer, like a panel catching light |
| Meaning | Corals planted | Electricity produced, carried and paid out |

### Three directions

**Decision: which direction leads?** All three are animated in the specimen, light and dark.

1. **Sunfield.** A halftone sun: square dots in a disc, larger towards the centre, with dotted rays. Below it, rows of solar panels drawn as dot cells, with a band of light sliding across them as the sun "breathes". Best for the hero (option B), the closing card and small spots. It is the most literal and the most immediately "solar".
2. **Grid lines (recommended as the lead).** The business model as a drawing: six asset nodes (solar as dot panels, EV chargers as dot bars that fill like a battery) joined by dotted power lines with a gentle sag, all running to one payout node. Golden pulses travel from each asset to the node, and the node flashes when a pulse arrives. It tells "electricity becomes USDC" without words, it can later be driven by real data (one pulse per payment, the six real assets), and it is the clearest sibling of the staking site's "Current" expression while looking nothing like coral. Use it in the refiSOL band, in the record section, and as hero art for option B.
3. **Daylight sweep.** A field of square dots, like an LED panel or a solar array seen from above. A soft diagonal band of light sweeps across every few seconds, and the dots in it grow and turn gold. It is a background texture, ReFi Hub's version of "plankton". Use it behind a whole section (record, or since 2021) at low contrast, with cards in frosted white on top.

Recommendation: **Grid lines** as the lead motif, **Daylight sweep** as the section background, and **Sunfield** kept for one or two small spots. That mirrors how the staking site uses reef, plankton and plate.

### Building it

- One script, `src/scripts/energy.js` (or a small Astro component), mounted as `<canvas data-energy="lines" aria-hidden="true">`, with the options the staking script already uses: `data-dark`, `data-seed`, and a palette that follows the accent set.
- Reuse the staking script's engineering: device-pixel-ratio scaling, a ResizeObserver redraw, an IntersectionObserver that stops drawing when the canvas is off screen, and a pause when the tab is hidden.
- The same seed always draws the same picture, so a variation we like can be locked in.
- The existing world map should share the same square-dot drawing code.

---

## 8. Motion

| Thing | Duration | Easing |
|---|---|---|
| Hover and press (buttons, cards, links) | 150 to 200ms | ease-out |
| Section content fade-up on scroll | 600ms, 14px rise, 80ms stagger | cubic-bezier(.2,.7,.2,1) |
| Headline word-by-word rise | Hero only | as above |
| Number count-up | 900ms, once, only when on screen at load or scrolled to | ease-out cubic |
| Motif loops | Pulse cycle 3 to 6s, sweep cycle 8 to 12s | linear or sine |
| Live dot | 2.6s fade | sine |

Rules:

- Content is never hidden waiting for an animation. If JavaScript is off or slow, everything is visible. Fade-ups start from 0.0 opacity only once the script has run (`.js` class), and nothing waits more than 600ms.
- One moving thing per screen. Do not animate a motif and a count-up in the same viewport at the same time.
- Motifs run only while visible, pause in background tabs, and keep to about 60 frames a second without dropping frames on a mid-range phone. Use at most about 4,000 dots per canvas on desktop and half that on phone.
- No parallax, no scroll-jacking, no autoplay video.

### Reduced motion

When the visitor has asked for reduced motion (`prefers-reduced-motion: reduce`):

- Motifs draw **one still frame**, chosen to look complete (pulses part-way along the lines, the sweep in the middle).
- No fade-ups or word rises. Content simply appears.
- Count-ups show the final number at once.
- Live dots stop pulsing.
- Smooth scrolling is off.

---

## 9. Accessibility

- **Contrast**: body text 4.5:1 or more, large text (24px and up) and interface edges 3:1 or more. Every text pairing in section 3 has been checked. The specimen lists the ratios.
- **Small text**: nothing under 11px. Mono labels are 11px or 12px.
- **Targets**: buttons and map pins at least 44 by 44px, including on the operator logos.
- **Focus**: a 2px ring in `--grid-700` on paper and `--sun-300` on ink, 3px offset, on every interactive element.
- **Status**: always a word and a shape as well as a colour.
- **Artwork**: every canvas is `aria-hidden="true"` and purely decorative. Any meaning it carries (six assets, three countries) is also in the text.
- **Headings**: one h1 per page, h2 per section, no skipped levels. Kickers are not headings (they are a `<p>`).
- **Numbers**: write units out for screen readers where they are ambiguous, for example `aria-label="142.7 thousand SOL"` on a readout.
- **Phone**: the nav has a menu, nothing scrolls sideways, and the map panel follows the map rather than sitting beside it.

---

## 10. Do and don't

| Do | Don't |
|---|---|
| Set section headings in Inter 400 with -.04em tracking | Set anything in Inter 700, or bold a heading |
| Open every section with a numbered mono kicker | Stack heading, grey lede and grid in the same way six times |
| Use the scale tokens for every size | Invent an in-between size (13.5px, 15.5px, 9.5px) |
| Make one number the hero of each band, with its source | Show six numbers at equal weight with no hierarchy |
| Put units in mono after Geist numbers | Set units in the same font and size as the number |
| Keep one container (1200px) and one card radius (18px) | Let sections change width, or mix radii |
| Use one black, `#0F0E0C`, for bands and the footer | Mix `#000`, `#151412` and `#141313` |
| Draw the motif in square dots on a grid | Use round, organic, drifting dots (that is the reef) |
| Keep sun gold as the pulse colour shared with the staking site | Bring sea or coral onto ReFi Hub pages, except the Stake button and the refiSOL band |
| Name a problem plainly in a calm notice | Use red alert boxes or warning icons for assets that are behind |
| Show status with a word, a shape and a colour | Rely on colour alone |
| Let photos carry the real-world proof | Put accent fills or motifs on top of photos |
| Keep content visible without JavaScript | Hide cards until they scroll into view |
| Give the phone a menu | Hide the nav links with no way to reach them |

---

## 11. Suggested order of work

When this guide is approved, apply it to the site in this order. Each step is safe to ship on its own.

1. **Tokens.** Add the colour, type, spacing and radius tokens to `src/styles/global.css`. Swap the three blacks for one, and the faint and muted greys for the new ones.
2. **Type.** Section headings to Inter 400, the scale tokens, kickers on every section, units in mono.
3. **Containers and rhythm.** One 1200px container, section padding and head gaps from the tokens, alternate bands.
4. **Components.** Meter grid for the record, ledger rows for since 2021, buttons and the Stake doorway colour, the phone menu.
5. **Layouts.** Record split, reports featured and list, refiSOL lead number.
6. **Motif.** Build the chosen direction as `energy.js`, put it in the refiSOL band first, then the hero or record section.
7. **Blog.** Line the blog up with the same container, kicker and type tokens.
