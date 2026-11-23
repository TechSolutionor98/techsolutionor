---
name: ui-layout-composition
description: "Layout and composition: grids, hero patterns, section structure, visual hierarchy, white space. Use when structuring pages or fixing layout/hierarchy problems."
metadata:
  version: 1.0.0
---

# Layout & Composition

## Page rhythm

- Consistent container: `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8` (or project equivalent). Same width for every section.
- Section vertical padding on a rhythm: `py-16 md:py-24` standard, `py-24 md:py-32` for hero/major moments. Don't invent a third value per page.
- Alternate section backgrounds (bg ↔ surface-muted) to segment; white space between sections is cheaper and cleaner than divider lines.
- Section header pattern: overline (optional) + H2 + 1–2 line supporting copy, left-aligned by default; centered only for symmetric/heroic sections.

## Grid patterns that work

- **Feature cards**: 1 → 2 → 3/4 columns (`grid-cols-1 sm:grid-cols-2 lg:grid-cols-3`).
- **Stat bands**: 2 → 4 equal columns with big numbers (Anton/display, 3xl–5xl) + small caption.
- **Split sections**: `lg:grid-cols-2` with `items-center`, image and text alternating sides; image `aspect-[4/3]` or `[16/10]`, `object-cover`.
- **Logo/proof strips**: single row, grayscale logos, `opacity-70 hover:opacity-100`.
- **FAQ**: single column, max-w-3xl centered, accordion.
- **CTA closers**: full-width band in brand navy with accent button — the last push.

## Hero patterns (pick one, commit)

1. **Split hero**: left copy (overline + display H1 + 1–2 sentence value prop + primary/secondary CTA + trust markers), right image or visual. The workhorse for B2B.
2. **Centered overlay hero**: full-bleed image/video with dark scrim, centered display H1 + CTA. Emotional, simpler.
3. **Product/feature hero**: headline + inline product shot or UI mock, benefit bullets around it.

Hero rules: H1 states the value proposition in customer language, not the company name. One primary CTA (accent) + at most one secondary (ghost/outline). Trust markers (stats, logos, ratings) within the first viewport.

## Hierarchy rules

1. **F-pattern / Z-pattern**: most important content top-left (LTR). Primary CTA above the fold.
2. One focal point per viewport. Two competing heroes = zero heroes.
3. Group related things (proximity); separate unrelated things (space). Space > borders > backgrounds, in that order, for grouping.
4. Align everything to the grid — misaligned edges read as "broken" even to non-designers.
5. Visual weight: size → color(accent) → contrast → position. Spend weight on the primary action only.
6. Empty states, not empty sections: if a section has no real content, cut it — never pad with filler cards.
7. Mobile: stack in priority order (headline → CTA → image → secondary content). Test at 360px.

## Checklist

- [ ] One container width, one section padding rhythm across the page
- [ ] Every section has a job; hierarchy obvious within 5 seconds
- [ ] Primary CTA visible in first viewport and visually dominant
- [ ] Images have consistent aspect ratios and don't cause layout shift
- [ ] No orphan cards (1 lonely item on the last grid row — rebalance columns)
- [ ] Page ends with a clear next step (CTA band / contact / related links)
