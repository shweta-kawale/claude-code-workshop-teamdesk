# Unicorn theme: implementation plan

Spec: [unicorn-theme.md](unicorn-theme.md). Target: about 25 minutes in total.

## Phase 1: Toggle mode plumbing (about 5 minutes)

Make `unicorn` a real mode in the switcher, with no visual change yet.

- `apps/web/src/components/theme-toggle.tsx`: add `unicorn` to `ThemeMode`, `NEXT_MODE` (Dark goes to Unicorn, Unicorn goes to Auto), `MODE_LABEL` and `MODE_ICON` (`Sparkles`). Accept it in `getInitialMode`.
- In `applyThemeMode`, resolve unicorn to `light` for `color-scheme`, add the `unicorn` class beside `light`, and set `data-theme="unicorn"`. Make sure switching away removes the `unicorn` class.
- Update the button's `aria-label` so it still makes sense with four modes.

Done when: the button cycles Auto, Light, Dark, Unicorn, Auto with the right icon and label, and the `<html>` classes and `data-theme` are correct in each mode.

## Phase 2: Persistence and no-flash init (about 3 minutes)

- `apps/web/src/routes/__root.tsx`: update `THEME_INIT_SCRIPT` to accept `unicorn` and apply the same class and `data-theme` as the toggle.
- Confirm an unknown stored value still falls back to `auto`, and that Auto never resolves to unicorn.
- Confirm `hooks/use-resolved-theme.ts` needs no change (unicorn keeps the `light` class).

Done when: reloading in Unicorn mode keeps it, the `<html>` attributes are set before first paint, and Auto, Light and Dark behave as before.

## Phase 3: Palette and tokens (about 6 minutes)

- `apps/web/src/styles.css`: add a `.unicorn` block overriding `--background`, `--card`, `--primary`, `--accent`, `--border`, their foregrounds and `--ring` with pastel pink, lilac and mint values.
- Define the rainbow gradient custom property, plus a softer pastel variant for the page background.
- Check contrast for body text, muted text and primary button text against the new surfaces (aim for WCAG AA).

Done when: Unicorn mode shows pastel surfaces with readable text on Home, About and Notes. No gradients applied yet.

## Phase 4: Rainbow decoration (about 5 minutes)

- Under `.unicorn` only, apply the rainbow gradient to the sticky header and to primary buttons.
- Apply the pastel gradient to the page background.
- Keep header text dark or add a soft overlay so links stay legible.
- Scope every rule under `.unicorn` so nothing leaks into Light or Dark.

Done when: Unicorn mode shows the rainbow header, rainbow primary buttons and pastel gradient background, and Light and Dark look unchanged.

## Phase 5: Verify and finish (about 6 minutes)

- Run `bun run check` and `bun test`, and fix anything they report.
- Load the app in the browser. Cycle all four modes, reload in Unicorn mode to confirm there is no flash, and check the toaster and any chart render sensibly.
- Compare Light, Dark and Auto against how they looked before.
- Deploy only if you ask for it.

Done when: every acceptance criterion in the spec passes.

## Risks

- A gradient on the header can hurt link and text contrast. Keep text dark or add a soft overlay.
- A `.unicorn` background rule that is too broad could leak into Light. Scope everything under `.unicorn`.
- Forgetting to remove the `unicorn` class when cycling away would leave stale styles. Cover it in Phase 1.
