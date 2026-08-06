# Design system — NDC Oslo × GitHub Copilot Workshop

## NDC identity

The visual system draws on Nordic conference wayfinding — saturated cobalt/ultramarine fields, signal coral accents, icy blue–white text, and near-black backgrounds — without copying the official NDC Oslo brand, fonts, or logo. The original geometric mark shows a triangular route with coral and cobalt stop-dots on a deep blue field.

## Palette

| Token | Dark | Light | Role |
|---|---|---|---|
| `--workshop-primary` | cobalt `oklch(0.55 0.22 255)` | deeper cobalt | CTA, route-line, section numbers |
| `--workshop-accent` | signal coral `oklch(0.72 0.18 30)` | darker coral | Links, resume action, progress |
| `--workshop-bg` | near-black with blue cast `oklch(0.11 0.025 255)` | icy white | Page background |
| `--workshop-surface` | raised dark blue | light cool grey | Cards, signal board, sidebar |
| `--workshop-ink` | icy white | near-black | Body text |
| `--workshop-muted` | cool grey | mid grey | Secondary text |
| `--workshop-success` | green | green | Completion indicators |

Both themes pass WCAG AA for body text and interactive elements. Focus outlines use `--workshop-focus` (icy blue) at 3px with 3px offset.

## Typography

- **Sans:** Archivo Variable via `@fontsource-variable/archivo` (npm)
- **Mono:** JetBrains Mono via `@fontsource/jetbrains-mono` (npm)

Both are freely distributable npm packages with SIL Open Font License.

## Layout

### Two-track structure

1. **Copilot App** — the primary/first track, initial CTA destination
2. **Copilot CLI** — the second track

The landing page is a persuasive/read hybrid with a full-viewport hero, a signal board showing two route stops (App and CLI), route-line SVG notation, and geometric block lab cards below. The Starlight doc shell provides calm, legible lesson pages.

### Signal board

The hero's signal board uses a grid background, terminal fragment, and two surface cards (App and CLI) connected by a route-line SVG — conveying a wayfinding metaphor rather than generic cards.

## Accessibility

- Light/dark theme toggle persists via `localStorage` (`ndc-oslo-theme`)
- `prefers-reduced-motion: reduce` disables all animations and transitions
- Focus-visible outlines on all interactive elements
- Skip-to-content link on the landing page
- `aria-live="polite"` on progress summary
- `aria-label` on signal board and route SVG
- Checkbox tasks get programmatic `aria-label`

## Responsive breakpoints

- `58rem` — single-column hero, simplified lab grid
- `42rem` — stacked sections, mobile-optimized spacing
