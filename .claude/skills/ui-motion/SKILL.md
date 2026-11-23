---
name: ui-motion
description: "Motion design: micro-interactions, scroll reveals, page transitions, framer-motion usage, reduced-motion support. Use when adding animation to UI."
metadata:
  version: 1.0.0
---

# Motion

## Timing & feel

- Micro-interactions: **150–250ms**, `ease-out` for entrances.
- Enter/exit elements: **200–400ms**.
- Page/section transitions: 300–500ms. Nothing user-blocking exceeds ~500ms.
- Move on `transform` and `opacity` only (GPU-friendly, no layout thrash). Animate `width/height/top/left` = jank.
- Springs (framer-motion) for drag/touch; tween for everything else.

## Standard effects

| Effect | Spec |
|---|---|
| Hover lift (card) | `translateY(-2..-4px)` + shadow bump, 200ms |
| Button press | `scale(0.97)`, 100ms |
| Fade-up on scroll | `opacity 0→1` + `translateY(16..24px)→0`, 400ms, `ease-out`, stagger children 60–100ms |
| Reveal variants | `initial={{opacity:0, y:24}} whileInView={{opacity:1, y:0}} viewport={{once:true, margin:"-80px"}}` |
| Drawer/modal | backdrop fade 200ms + panel scale 0.95→1 / slide 16px, 250ms |
| Toast | slide-in from edge + fade, 300ms; exit 200ms |
| Spinner | CSS `animate-spin` only for <2s waits; skeletons beyond that |

## framer-motion discipline (this project uses it)

- `whileInView` + `viewport={{ once: true }}` for reveals — never re-animate content the user already scrolled past.
- `AnimatePresence` with `mode="wait"` for route/step swaps.
- Variants for orchestrated stagger:

```jsx
const container = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } };
const item = { hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } } };
```

- Motion components are client components; keep them leaf-level wrappers so the page can stay server-rendered.
- Don't animate `layout` casually — `layout` prop triggers reflows; reserve for genuine shared-layout moments.

## Rules

1. **Reduced motion is mandatory**:

```jsx
const prefersReduced = useReducedMotion();
<motion.div initial={prefersReduced ? false : { opacity: 0, y: 24 }} ... />
```

Plus global CSS: `@media (prefers-reduced-motion: reduce) { *, ::before, ::after { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; } }`

2. Motion adds meaning (feedback, orientation, continuity) or it's deleted. Decorative floaty logos and autoplay parallax = noise.
3. Max one hero-level animation per page; reveals elsewhere stay subtle.
4. Nothing infinite animates in periphery (distracting), and no flashing >3Hz (accessibility seizure risk).
5. Scroll effects must never delay paint: reveal content at rest if JS fails (progressive: default visible, hide only when JS runs — avoid "blank page if JS dies" via a `.js` class gate).

## Checklist

- [ ] All motion ≤500ms and transform/opacity only
- [ ] `prefers-reduced-motion` honored globally and in framer-motion
- [ ] Reveals use `once: true`, content visible without JS
- [ ] Hover/press feedback on every interactive element
- [ ] Loading states are skeletons for >2s, spinners under
