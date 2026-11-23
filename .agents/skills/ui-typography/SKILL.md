---
name: ui-typography
description: "Typography: font pairing, fluid type scales, hierarchy, readability. Use when choosing fonts, setting heading/body styles, or fixing text hierarchy."
metadata:
  version: 1.0.0
---

# Typography

## Pairing strategy

Two families maximum (three only with strong justification): one **display** for headlines, one **body** for everything else. Body font must have at least 400/500/600/700 weights.

Reliable pairings by mood:
- **Corporate/authoritative**: display serif (e.g., Playfair/Lora) + geometric sans body (Inter, Manrope)
- **Modern/logistics-tech**: condensed or grotesk display (Anton, Archivo, Space Grotesk) + neutral sans (Inter, Manrope)
- **Friendly/humanist**: rounded or humanist sans (Nunito, Mulish) both roles, weight contrast does the work
- **Editorial**: serif display + serif body, sans for UI labels

## Type scale (recommended)

| Level | Size | Weight | Line-height | Use |
|---|---|---|---|---|
| Display | `clamp(2.25rem, 1.5rem + 3vw, 4rem)` | 600–800 | 1.05–1.15 | Hero H1 only |
| H2 | `clamp(1.75rem, 1.4rem + 1.5vw, 2.5rem)` | 600–700 | 1.15–1.25 | Section titles |
| H3 | 1.25–1.5rem | 600 | 1.3 | Subsections |
| H4/label | 1–1.125rem | 600 | 1.4 | Card titles, labels |
| Body | 1rem (0.9375–1.125rem ok) | 400 | 1.5–1.6 | Paragraphs |
| Small | 0.875rem | 400–500 | 1.45 | Meta, captions |
| Overline | 0.75rem | 600–700, letterspaced 0.08–0.15em, uppercase | 1.2 | Eyebrow labels |

## Rules

1. **Hierarchy = size + weight + spacing.** If two levels are close in size, differentiate by weight and margin, don't add a 6th size.
2. **Measure**: body text max ~65–75 characters per line (`max-w-prose`, ~65ch). Never full-width paragraphs on desktop.
3. **Paragraph spacing**: `margin-bottom` ≈ 0.75–1em, or use `space-y-*` consistently.
4. **Line-height**: display tight (1.1), body generous (1.6). Never 1.0 body text; never 1.6 display.
5. Never center long body paragraphs — center only display headlines and short supporting lines (≤2 lines).
6. Limit to 2 weights visible per screen region for cleanliness; use color (`text-fg-muted`) for secondary text rather than a 3rd weight.
7. `letter-spacing`: positive for uppercase/overlines (0.05–0.15em), slightly negative (−0.01 to −0.02em) only for very large display text.
8. Uppercase display headlines: bump line-height to ~1.2 and add tracking — ALL CAPS at 1.05 crashes.
9. Use `text-wrap: balance` on headings; `text-wrap: pretty` on paragraphs (progressive enhancement).
10. Fluid sizes via `clamp()` for display/H2; keep body fixed size — fluid body text hurts readability on small screens.

## Checklist

- [ ] Max 2 font families loaded (subset weights; use `next/font` with `display: swap`)
- [ ] Clear visual jump between every adjacent level
- [ ] Body ≤75ch measure, 1.5+ line-height
- [ ] Overlines/labels consistently styled app-wide
- [ ] No `text-xs` (12px) for anything users must read to complete a task
