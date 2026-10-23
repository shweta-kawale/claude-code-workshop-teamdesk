# Unicorn theme

## Summary

Add a rainbow unicorn theme as a fourth mode on the existing theme switcher, beside Auto, Light and Dark. It has a light base with pastel surfaces and rainbow gradients.

## Decisions (from the interview)

- The theme uses the existing switcher button. No new control, no dropdown.
- The cycle is Auto, Light, Dark, Unicorn, then back to Auto.
- Base is light: pastel pink, lilac and mint surfaces.
- Rainbow scope is accents plus decoration: a rainbow gradient on the header and primary buttons, a pastel rainbow gradient page background, and a sparkle icon on the toggle. No animation.

## Behaviour

- Clicking the button advances through the four modes. In Unicorn mode the button shows a sparkle icon and the label "Unicorn".
- The choice is stored in `localStorage` under `theme` with the value `unicorn`.
- The saved mode is applied before first paint by the theme-init script in `routes/__root.tsx`, so there is no flash.
- Auto mode is unchanged. It follows the OS and only ever resolves to light or dark, never unicorn.
- An unknown stored value falls back to `auto`, as today.

## Implementation notes

- `components/theme-toggle.tsx`: add `unicorn` to `ThemeMode`, `NEXT_MODE`, `MODE_LABEL` and `MODE_ICON` (lucide `Sparkles`). When applied, set `data-theme="unicorn"` and add the `unicorn` class to `<html>`. Resolve it to `light` for `color-scheme`, and keep the `light` class so existing light styles still apply.
- `routes/__root.tsx`: update `THEME_INIT_SCRIPT` to accept `unicorn` and apply the same class and attribute as the toggle.
- `styles.css`: add a `.unicorn` block that overrides the colour tokens (`--background`, `--card`, `--primary`, `--accent`, `--border` and their foregrounds) with pastel values, plus a rainbow gradient custom property. Apply the gradient to the header, primary buttons and the page background under `.unicorn` only.
- `hooks/use-resolved-theme.ts`: no change. Unicorn keeps the `light` class, so the toaster and charts render light.

## Out of scope

- Animation and a reduced-motion variant.
- A unicorn illustration or logo.
- Per-user theme stored on the server.
- A dropdown or any other new switcher UI.

## Acceptance criteria

- The button cycles Auto, Light, Dark, Unicorn, Auto, with the correct icon and label each time.
- Reloading in Unicorn mode shows the theme immediately, with no flash of another theme.
- Unicorn shows a rainbow header, rainbow primary buttons, a pastel gradient background and the sparkle icon.
- Body text and buttons keep readable contrast on the pastel surfaces.
- Light, Dark and Auto look the same as before.
- `bun run check` and `bun test` pass.

## Open for review

Exact pastel colour values and gradient stops were not specified. Choose them at build time and check them in the browser.
