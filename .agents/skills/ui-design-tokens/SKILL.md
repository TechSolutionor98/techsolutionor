---
name: ui-design-tokens
description: "Design token architecture: color, typography, spacing, radius, shadow, and motion tokens; Tailwind theme configuration. Use when setting up or extending a theme/design system."
metadata:
  version: 1.0.0
---

# Design Tokens & Theming

## Principles

- Single source of truth: tokens live in one place (Tailwind `@theme` / CSS variables), consumed everywhere.
- Name tokens by **role** (`surface`, `accent`, `border-strong`), not by appearance (`blue-500`) — roles survive rebrands.
- Ship a scale, not single values: `50/100/…/900` for colors, `xs…3xl` for type, `1…12` spacing multiples.

## Token set (minimum viable system)

```css
@theme inline {
  /* Color roles */
  --color-bg: ...;            /* page background */
  --color-surface: ...;       /* cards, raised blocks */
  --color-surface-muted: ...; /* subtle fills, wells */
  --color-fg: ...;            /* primary text */
  --color-fg-muted: ...;      /* secondary text (keep ≥4.5:1 on bg) */
  --color-accent: ...;        /* brand action color */
  --color-accent-hover: ...;
  --color-accent-fg: ...;     /* text/icon on accent */
  --color-border: ...;
  --color-border-strong: ...;
  --color-focus: ...;         /* visible focus ring */

  /* Type */
  --font-display: ...;
  --font-body: ...;
  --text-xs: 0.75rem;   /* 12 */
  --text-sm: 0.875rem;  /* 14 */
  --text-base: 1rem;    /* 16 */
  --text-lg: 1.125rem;  /* 18 */
  --text-xl: 1.25rem;   /* 20 */
  --text-2xl: 1.5rem;   /* 24 */
  --text-3xl: 1.875rem; /* 30 */
  --text-4xl: clamp(2rem, 1.5rem + 2vw, 2.75rem); /* fluid display */

  /* Radius & elevation */
  --radius-sm: 6px; --radius-md: 10px; --radius-lg: 16px; --radius-xl: 24px;
  --shadow-sm: 0 1px 2px rgb(0 0 0 / .06);
  --shadow-md: 0 4px 12px -2px rgb(0 0 0 / .10);
  --shadow-lg: 0 16px 40px -8px rgb(0 0 0 / .18);
}
```

## Rules

1. Components reference tokens (`bg-surface`, `text-fg-muted`) — never raw hex except inside the token definitions.
2. Need a value that doesn't exist? Add the token, don't inline the value. Exceptions: one-off decorative values (gradients, complex shadows) may live with the component.
3. Dark themes: redefine role values under a selector (`.dark`, `@media`), never introduce new role names.
4. Tailwind v4: tokens declared in `@theme` auto-generate utilities. Keep the brand palette as semantic groups (e.g., `brand-navy`, `brand-gold`) plus role aliases on top.
5. Keep the token count small. A system with 300 tokens is a dumping ground, not a system.

## Checklist

- [ ] All colors used in new code come from tokens
- [ ] `accent-fg` contrast on `accent` ≥ 4.5:1
- [ ] Focus token defined and visible on both light and dark surfaces
- [ ] Type scale is fluid at the display end, fixed at the body end
