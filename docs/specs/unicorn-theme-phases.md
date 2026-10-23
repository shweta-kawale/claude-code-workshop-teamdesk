# Unicorn theme: phase tracker

Spec: [unicorn-theme.md](unicorn-theme.md). Plan: [unicorn-theme-plan.md](unicorn-theme-plan.md).

Work the phases in order. Tick each task as it lands, and only start the next phase once the exit check passes.

| Phase | Name | Est. | Status |
| --- | --- | --- | --- |
| 1 | Toggle mode plumbing | 5 min | Done |
| 2 | Persistence and no-flash init | 3 min | Done |
| 3 | Palette and tokens | 6 min | Done |
| 4 | Rainbow decoration | 5 min | Done |
| 5 | Verify and finish | 6 min | Not started |

## Phase 1: Toggle mode plumbing

Files: `apps/web/src/components/theme-toggle.tsx`

- [x] Add `unicorn` to `ThemeMode`
- [x] Update `NEXT_MODE`: Dark to Unicorn, Unicorn to Auto
- [x] Add `unicorn` to `MODE_LABEL` ("Unicorn") and `MODE_ICON` (`Sparkles`)
- [x] Accept `unicorn` in `getInitialMode`
- [x] In `applyThemeMode`: resolve to `light` for `color-scheme`, keep the `light` class, add the `unicorn` class, set `data-theme="unicorn"`
- [x] Remove the `unicorn` class when switching to another mode
- [x] Update the button `aria-label` for four modes

Exit check: the button cycles Auto, Light, Dark, Unicorn, Auto with the right icon and label, and `<html>` classes and `data-theme` are correct in each mode.

## Phase 2: Persistence and no-flash init

Files: `apps/web/src/routes/__root.tsx`

- [x] Update `THEME_INIT_SCRIPT` to accept `unicorn`
- [x] Apply the same class and `data-theme` as the toggle
- [x] Confirm an unknown stored value falls back to `auto`
- [x] Confirm Auto only resolves to light or dark
- [x] Confirm `hooks/use-resolved-theme.ts` needs no change

Exit check: reloading in Unicorn mode keeps it with no flash, and Auto, Light and Dark behave as before.

## Phase 3: Palette and tokens

Files: `apps/web/src/styles.css`

- [x] Add a `.unicorn` block overriding `--background`, `--card`, `--primary`, `--accent`, `--border`, their foregrounds and `--ring`
- [x] Choose pastel pink, lilac and mint values
- [x] Define the rainbow gradient custom property
- [x] Define a softer pastel gradient for the page background
- [x] Check contrast (WCAG AA) for body text, muted text and primary button text

Exit check: Unicorn shows readable pastel surfaces on Home, About and Notes. No gradients applied yet.

## Phase 4: Rainbow decoration

Files: `apps/web/src/styles.css`

- [x] Apply the rainbow gradient to the sticky header, under `.unicorn` only
- [x] Apply the rainbow gradient to primary buttons, under `.unicorn` only
- [x] Apply the pastel gradient to the page background, under `.unicorn` only
- [x] Keep header text dark or add a soft overlay
- [x] Confirm no rule leaks into Light or Dark

Exit check: rainbow header, rainbow primary buttons and pastel gradient background in Unicorn, with Light and Dark unchanged.

## Phase 5: Verify and finish

- [ ] `bun run check` passes
- [ ] `bun test` passes
- [ ] Cycle all four modes in the browser
- [ ] Reload in Unicorn mode and confirm there is no flash
- [ ] Toaster and any chart render sensibly in Unicorn
- [ ] Light, Dark and Auto look the same as before
- [ ] Deploy only if requested

Exit check: every acceptance criterion in the spec passes.

## Open items

- Exact pastel values and gradient stops are chosen at build time (Phase 3) and checked in the browser.
