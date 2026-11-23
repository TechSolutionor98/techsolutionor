---
name: ui-design-review
description: "UI design review: audit checklist, severity rubric, and fix priorities for any interface. Use when reviewing, polishing, or QA-ing UI before delivery."
metadata:
  version: 1.0.0
---

# Design Review

Run this on your own output before delivering, and when asked to review/critique existing UI. Review as three passes, then produce a prioritized verdict.

## Pass 1 — Impression (5-second test)

- [ ] Purpose of the page obvious within 5 seconds? Primary action identifiable?
- [ ] One clear focal point per viewport; no competing shouting elements
- [ ] Would this pass as a serious brand's site, or does it read generic/template-y?
- [ ] Anything that looks broken at a glance (overlap, misalignment, orphan elements)?

## Pass 2 — Craft (design detail)

- [ ] **Hierarchy**: distinct levels; supporting copy muted (`text-fg-muted`), not competing
- [ ] **Spacing rhythm**: consistent paddings/margins (no random 22px between 24px systems); section rhythm uniform
- [ ] **Alignment**: everything on the grid; consistent card heights; icons optically aligned with text
- [ ] **Typography**: max 2 families; clear scale jumps; body ≤75ch; no centered long paragraphs
- [ ] **Color**: 60-30-10 respected; accent spent only on interactive/primary; AA contrast everywhere
- [ ] **Imagery**: consistent aspect ratios, no CLS, quality/resolution adequate, scrims under overlay text
- [ ] **Depth**: elevation used consistently (one shadow language), borders vs shadows not mixed randomly
- [ ] **Empty real estate**: awkward gaps, stretched elements, lonely grid orphans

## Pass 3 — Engineering UX

- [ ] Responsive: 360 / 768 / 1024 / 1440 clean; no horizontal scroll; grids collapse sanely
- [ ] States: hover / focus-visible / active / disabled / loading / error / empty all handled
- [ ] A11y: semantic landmarks, keyboard pass, focus rings, contrast, alt text, reduced-motion
- [ ] Forms: labels visible, inline actionable errors, submit feedback, no double-submit
- [ ] Performance: images optimized, no layout shift, interactions <100ms feedback
- [ ] Code: tokens not hex soup; components reusable; no dead CSS/props

## Verdict rubric (apply to every finding)

| Severity | Meaning | Action |
|---|---|---|
| **P0 Blocker** | Broken/unusable: overlap, unreadable contrast, no keyboard access, dead CTA, horizontal scroll | Fix before delivery, non-negotiable |
| **P1 Major** | Undermines trust/conversion: confusing hierarchy, missing states, cramped mobile, generic look | Fix in this pass |
| **P2 Polish** | Would elevate: spacing inconsistencies, motion feel, micro-copy | Fix if time; list explicitly |
| **P3 Nit** | Subjective taste | Mention only |

## Output format

```
## Verdict: PASS | PASS w/ notes | NEEDS REVISION
P0: … (must fix)
P1: … (should fix now)
P2: … (next pass)
Wins: what's genuinely good (keep it)
```

Honesty rule: do not self-grade PASS without completing all three passes. A review that finds nothing is a review that didn't look.
