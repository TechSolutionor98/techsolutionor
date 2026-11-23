---
name: ui-color-palette
description: "Color system design: palettes, accent usage, contrast ratios, dark surfaces. Use when picking colors, fixing contrast, or building light/dark themes."
metadata:
  version: 1.0.0
---

# Color

## Ratio-based palette construction (60-30-10)

- **~60% neutral/base**: background + surfaces + body text. Neutrals should carry a tint of the brand hue (e.g., navy-tinted grays), not pure gray.
- **~30% secondary**: section alternates, imagery, card fills.
- **~10% accent (CTA/CTA-adjacent)**: the *only* loud color. If everything is accent, nothing is.

Build each hue as a 10-step ramp (50→900) by adjusting lightness and slight saturation (saturate the mid tones, desaturate extremes). Test brand-gold ramps carefully — yellows/golds lose text contrast fast.

## Contrast (WCAG 2.2, non-negotiable)

| Element | Minimum |
|---|---|
| Body text on background | 4.5:1 |
| Large text (≥24px / 19px bold) | 3:1 |
| Icons, borders, UI components | 3:1 |
| Text on accent (button) | 4.5:1 |

- Golds/yellows: use **dark text** (navy/near-black) on gold buttons, not white.
- On navy/dark surfaces, use `slate-100/200`-level text, not mid grays.
- Text over images: always put a scrim (gradient or solid overlay ≥40% opacity) under it.

## Applying color like a senior

1. One accent = interactive. Non-interactive decoration must not compete with it.
2. Neutrals do the layout work; accent does the pointing. Links/CTAs/highlights get the accent; cards, wells, and dividers stay neutral.
3. Semantic colors fixed: success (green 600+), warning (amber 500–600 with dark text), error (red 600+), info (blue/sky 600+). Never use brand accent for errors.
4. Depth via surface elevation, not border explosion: raise = lighter/darker surface + soft shadow; avoid stacking 3+ borders.
5. Gradients: max 2 stops, same hue family, ≤10% lightness difference for subtle effects; reserve bold multi-hue gradients for hero moments only.
6. Dark mode: don't invert — build separate dark surfaces. Dark backgrounds get *desaturated, darkened* brand colors (accent lightened one step to keep 4.5:1).
7. Test every color decision at 400% browser zoom squint test: can you still tell primary from secondary?

## Checklist

- [ ] 60-30-10 distribution respected on every page
- [ ] All text pairs pass AA (run the math, don't eyeball)
- [ ] Dark text on gold/yellow CTAs
- [ ] Error/success/warning colors are semantic, not brand-recycled
- [ ] Images behind text have scrims
- [ ] Color is never the *only* signal (pair with icon/label — colorblind safety)
