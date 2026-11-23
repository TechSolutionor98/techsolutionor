---
name: ui-component-craft
description: "Component design: reusable, variant-driven React components, buttons, cards, badges, modals, disclosure patterns. Use when building or refactoring UI components."
metadata:
  version: 1.0.0
---

# Component Craft

## Anatomy of a good component

- **One responsibility**, named after what it is (`ServiceCard`, `QuoteForm`), not how it looks (`BlueBox`).
- **Props as API**: content in, layout variants via `variant`/`size` props; no `style` prop passthrough dumping.
- **Composable**: `Card`, `CardHeader`, `CardBody` beats `Card title body footerImage` mega-props.
- **No business logic in presentational components** — data fetching/submission lives in containers, hooks, or server components.

## Variant pattern (Tailwind + CVA-style maps)

```jsx
const buttonVariants = {
  base: "inline-flex items-center justify-center gap-2 font-semibold rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none",
  variant: {
    primary: "bg-accent text-accent-fg hover:bg-accent-hover",
    secondary: "bg-transparent border-2 border-current hover:bg-black/5",
    ghost: "hover:bg-black/5",
  },
  size: { sm: "h-9 px-3 text-sm", md: "h-11 px-5", lg: "h-13 px-7 text-lg" },
};
```

Every interactive element gets: hover, focus-visible, active, disabled states. Use `focus-visible` (not `focus`) so mouse clicks don't leave rings.

## Component recipes (standards)

**Button** — real `<button>` (or `<Link>` styled as button). Min height 44px touch. Icon buttons get `aria-label`. Never `div onClick`.

**Card** — `rounded-xl border border-border bg-surface shadow-sm p-6`; hover elevation only if clickable (whole card then `<Link>`/`<a>`, `group` for inner hover effects). Equal heights via `h-full` + `flex flex-col` in grid children.

**Badge/Tag** — small pill, `text-xs font-semibold uppercase tracking-wide px-2.5 py-1 rounded-full`, tinted background (accent/10 + accent/700 text).

**Modal/Dialog** — overlay `fixed inset-0 z-50 bg-black/60 backdrop-blur-sm`, panel `max-w-lg w-full rounded-2xl`; Escape closes, click-outside closes, focus trapped inside, focus returns to opener, `aria-modal="true"`, body scroll locked. Prefer Radix/headless primitives if available.

**Tabs** — `role="tablist"`, `aria-selected`, arrow-key navigation; active tab styled with underline or pill, not color-only.

**Accordion (FAQ)** — use `<details>`/`<summary>` for zero-JS, or controlled disclosure with `aria-expanded` + `aria-controls`; chevron rotates 180°.

**Toast** — bottom-right (bottom-center mobile), auto-dismiss 4–6s, never blocks CTAs, has close button, `role="status"` (or `role="alert"` for errors).

**Skeleton loader** — mimic final layout with `animate-pulse bg-surface-muted rounded`; never spinners for content-sized areas.

## Data display

- Lists of cards → grid with `h-full` children; image, title, 2-line clamped excerpt (`line-clamp-2`), meta row.
- Tables on mobile → cards or horizontal scroll with sticky first column.
- Long content → paginate or "load more"; show result counts.

## Rules

1. Extract a component at the 2nd–3rd repetition, not the 1st.
2. Colocate variants with the component; shared variants promoted to a lib file.
3. Props must not leak styling internals (`topDividerAndGoldLeftBorder` ❌ → `variant="featured"` ✅).
4. Every component works with: no data (empty state), loading, error, and full content.
5. Never break text out of a card — `break-words`, `min-w-0` on flex children.

## Checklist

- [ ] Semantic element for the job (button/link/dialog/nav)
- [ ] All interactive states styled, focus-visible always
- [ ] Works empty, loading, error, full
- [ ] Consistent radius/shadow/padding with the rest of the app
- [ ] No hardcoded colors — tokens only
