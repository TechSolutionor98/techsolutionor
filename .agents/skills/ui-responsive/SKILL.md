---
name: ui-responsive
description: "Responsive design: breakpoints, mobile patterns, fluid type/spacing, touch targets. Use when making layouts work across devices or auditing mobile UX."
metadata:
  version: 1.0.0
---

# Responsive

## Breakpoints (mobile-first, min-width)

`sm 640 · md 768 · lg 1024 · xl 1280 · 2xl 1536` — design mobile-first, add complexity upward. Verify at **360, 768, 1024, 1440** minimum.

## Core techniques

- **Fluid type/spacing** where it matters: `clamp()` for display sizes; `px-4 sm:px-6 lg:px-8`; `py-16 md:py-24`.
- **Grid progression** as content demands: `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4`. Cards get `h-full` + `flex flex-col` so rows stay even.
- **Hide/transform, don't shrink**: nav → hamburger drawer below `lg`; stat rows → 2x2 grid; tables → cards or scroll; multi-col features → accordion or stacked.
- **Images**: `next/image` (or `<img loading="lazy" decoding="async">`), explicit `width/height` or `aspect-*` + `object-cover` to kill CLS; `sizes` prop with real breakpoints; hero image `priority`.

## Mobile-specific standards

1. **Zero horizontal scroll at 320px.** Long words/URLs: `break-words`; flex children: `min-w-0`; wide tables: `overflow-x-auto` wrapper.
2. **Touch targets ≥44×44px** with ≥8px gaps; nav links in mobile menu get full-width tap rows.
3. Body text ≥16px; inputs 16px+ (iOS zoom prevention).
4. Sticky mobile CTA bar or floating WhatsApp/call button is fine — max one, must not cover content or footer (add matching bottom padding).
5. Hero on mobile: headline + CTA above the fold; image can fall below copy. Stack in priority order, not desktop DOM order dumped vertically.
6. Modals on mobile: bottom sheets (rounded-t, drag handle) or near-fullscreen; ensure they fit without internal scrolling where possible.
7. Test hover effects don't hide touch affordances — mobile users get visible defaults, not hover-only reveals.
8. Forms: single column, correct keyboards (`inputMode`), `autocomplete`, big submit button full-width.

## Checklist

- [ ] No horizontal scroll at 320/360px
- [ ] Every grid/tab layout has a sane stacked fallback
- [ ] All touch targets ≥44px, primary CTA thumb-reachable
- [ ] Images sized/aspect-locked, no CLS, lazy below fold
- [ ] Nav usable one-handed; modals fit mobile viewport
- [ ] Checked at 360, 768, 1024, 1440 widths
