---
name: ui-accessibility
description: "Accessibility: WCAG 2.2 AA, semantic HTML, ARIA, keyboard nav, focus management, color contrast. Use when auditing or ensuring UI is accessible."
metadata:
  version: 1.0.0
---

# Accessibility (WCAG 2.2 AA)

## Semantic HTML (80% of a11y)

- Landmarks: `header`, `nav` (with `aria-label` if multiple), `main` (one per page), `aside`, `footer`. Skip-link to `#main` as the first focusable element.
- Heading order without skips (h1 → h2 → h3); one `h1` per page.
- Interactive = correct element: `<button>` for actions, `<a href>` for navigation. Never `div`/`span` with onClick (if unavoidable: `role="button"`, `tabIndex=0`, Enter+Space handlers — but fix the element instead).
- Images: `alt` describing purpose (decorative → `alt=""`). Icon-only buttons: `aria-label`.
- Form controls: `<label htmlFor>` for every input.

## Keyboard

- Everything operable by keyboard; no `tabindex > 0`.
- Focus visible on every interactive element — `focus-visible:` ring, 2px, ≥3:1 contrast against surroundings, with 2px offset.
- Logical tab order = visual order (DOM order does this for free — don't fight it with positive tabindex or CSS `order`).
- Modals/drawers: focus moves in on open, **trapped** while open, returns to opener on close; Escape closes.
- Skip complex menus with `aria-expanded` on triggers; dropdown items reachable with arrows.
- No keyboard traps; carousels/sliders pause and have prev/next buttons (not drag-only).

## ARIA (only where HTML can't do it)

First rule: don't use ARIA if a native element exists. When needed:
- `aria-expanded` on disclosure triggers, `aria-controls` → panel id.
- `aria-current="page"` on active nav link.
- `aria-live="polite"` for toasts/status updates; `aria-live="assertive"` or `role="alert"` for errors.
- `aria-hidden="true"` + `focusable="false"` on decorative SVGs; decorative wrappers `aria-hidden` but never hide focusable children.
- Loading regions: `role="status"` + visible text ("Loading…"), not just spinners.
- Never put `aria-label` on non-interactive elements as a substitute for visible text.

## Content rules

- Contrast ≥4.5:1 text, ≥3:1 large text & UI components (see color skill).
- Info never conveyed by color alone (errors get icon + text).
- `prefers-reduced-motion` respected everywhere.
- Link text meaningful out of context (no naked "click here").
- Target size ≥24×24 minimum (44 recommended — see responsive skill).
- Don't auto-play audio; videos get captions.
- Language set (`<html lang="en">`); hit areas of page-level error/success announced via `role="status"`.

## Quick audit pass (any component)

1. Unplug the mouse: tab through — can you reach/operate/exit everything? Ring visible?
2. Screen-reader spot check (headings list, landmarks, button names).
3. Contrast check on all text pairs.
4. Zoom to 200% / 400% — no loss of content or overlap.
5. `aria-expanded` states sync with reality.

## Checklist

- [ ] Landmarks + skip link + single h1 + ordered headings
- [ ] All interactive elements natively semantic, focus-visible styled
- [ ] Dialogs trap & restore focus, Escape works
- [ ] Live regions announce async updates/errors
- [ ] AA contrast everywhere, no color-only signals
- [ ] Reduced motion honored
