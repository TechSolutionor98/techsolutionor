---
name: ui-forms
description: "Form UX: input patterns, validation timing, error and success states, multi-step flows. Use when building forms, signup, checkout, or quote/request flows."
metadata:
  version: 1.0.0
---

# Forms UX

## Structure

- Labels **always visible** above inputs (placeholder ≠ label — placeholders vanish on input).
- One column layout. Two columns only for truly paired fields (first/last name, city/zip).
- Required-by-default; mark *optional* fields instead of spamming asterisks.
- Group with fieldsets + legends (contact info / shipment details); left-align everything.
- Button right-aligned or full-width on mobile; button label is a verb ("Get My Quote", not "Submit").
- Destroy friction: only collect what you truly need. Every field is drop-off.

## Input rules

- Input height ≥ 44px, `text-base` (16px+) on mobile — 16px+ prevents iOS zoom-on-focus.
- Match keyboard to input: `inputMode`, `type="tel"`, `type="email"`, `autocomplete` (name, email, tel, postal-code, country).
- `type="number"` avoids spinners via CSS; better: `inputMode="decimal"` + pattern.
- Selects: keep native `<select>` (best mobile UX), style the wrapper not the control.
- Textareas: `rows` matching expectation + auto-grow if long-form.

## Validation timing (the senior answer)

1. **On blur**: validate that field, show error inline.
2. **On change (after error)**: re-validate live so errors clear as the user fixes them.
3. **On submit**: validate all, focus + scroll to first invalid field, inline errors + `aria-invalid`, error summary on long forms.
4. Never validate on first keystroke. Never show errors before first interaction.

**Error message anatomy**: `role="alert"` or `aria-describedby` linking input → message. Message says *what and how to fix*: "Phone number must be 10 digits" not "Invalid input". Icon + red-600 text, directly under the field.

**Success**: inline confirmation state, then redirect or toast. For quote/lead forms: success screen with what happens next ("We'll respond within 24 hours") — never a silent dead end.

## Multi-step flows

- Progress indicator (Step 2 of 3 + labeled steps), back always available, data persists between steps, validate per-step on "Next", submit only on final step. If steps ≤2 fields each, collapse to single page.

## Checklist

- [ ] Visible labels, one column, no placeholder-as-label
- [ ] `autocomplete` on every personal field
- [ ] Validate on blur → live-clear on change → full on submit
- [ ] Errors actionable, linked via `aria-describedby`, focus moves to first error
- [ ] Submit button disabled-state + loading spinner + cannot double-submit
- [ ] Success state tells the user what happens next
- [ ] Keyboard-only: every field reachable, Enter submits, no focus traps
