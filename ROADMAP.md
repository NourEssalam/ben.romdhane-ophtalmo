# UI Redesign Roadmap

Branch: `ui/foundation`. Presentation only: no changes to content, CMS collections, translations, or `app/(payload)`.
Direction: "the sea of Mahdia on warm stone". Calm, warm, trustworthy.

## Design reference

### Color tokens (light / dark)

| Token       | Light   | Dark    | Use                                                    |
| ----------- | ------- | ------- | ------------------------------------------------------ |
| bg          | #FAF6EE | #15130F | page                                                   |
| sand        | #F3ECDF | #1A1814 | alternate sections, footer                             |
| surface     | #FFFDF8 | #1E1B16 | cards                                                  |
| line        | #E6DCCB | #2E2A23 | borders                                                |
| ink         | #18262F | #EFE8DA | headings                                               |
| text        | #3E4650 | #CFC6B6 | body                                                   |
| muted       | #6B6459 | #A39A8A | labels                                                 |
| brand       | #1E4E6E | #8DB7D2 | buttons, links, icons                                  |
| brand-hover | #163C56 | #B3D0E3 | hover, focus ring                                      |
| on-brand    | #FFFDF8 | #10202B | text on brand                                          |
| accent      | #3E9C9A | #6CC3BE | decorative only (dots, rules, quote glyph), never text |

### Type

- Headings: Newsreader 500, italic for one emphasized phrase → `font-serif`
- Body and UI: Figtree 400/500/600 → `font-sans` (default)
- Arabic: Noto Naskh Arabic 400/500 → `font-arabic`, automatic on `[lang="ar"]` and `[dir="rtl"]`

### Style rules

- Flat surfaces: `surface` background, 1px `line` border. No backdrop blur, no gradient washes.
- Photo overlays: warm brown `rgba(74,52,28,.3–.4)` from the bottom, never black or slate.
- Buttons: pills, 44px tall (52px in the hero). Primary = `brand` with `on-brand` text. Secondary = 1px border, `ink` text.
- Cards: radius 22px. Hover = lift 3px and a soft warm shadow. No scale effects.
- Sections alternate `bg` and `sand`, separated by 1px `line`.
- Section headings: left-aligned serif, not centered.
- Every text pair must pass 4.5:1 contrast.

## Phases

One phase per session. Analyse and report first, then implement. Use only the tokens above, no hard-coded colors.

- [x] **Phase 1: Foundation.** Tokens, fonts, base styles only. No component or section restyling.
  - Report first: where the Tailwind 4 theme lives, how dark mode is switched, how fonts load, which locales exist and how `dir="rtl"` is set.
  - Add the color tokens as CSS variables (light on `:root`, dark under the existing dark selector), exposed through `@theme inline` (`bg-bg`, `text-ink`, `border-line`, `bg-brand`...).
  - Point the existing `brand` / `brand-dark` / `brand-light` tokens at the new values so current classes keep working. Do not rename or remove old tokens yet.
  - Load the three fonts with `next/font/google` and expose them as font utilities.
  - Base layer: body = `bg-bg text-text font-sans`; h1–h3 = `font-serif font-medium text-ink`.
  - Global `:focus-visible` = 2px `brand-hover` outline, 2px offset. Add a `prefers-reduced-motion` rule that disables transitions, animations and smooth scroll.

- [x] **Phase 2: Shared UI.** Button and card class patterns, header (logo, nav, language switcher, dark toggle, mobile menu), footer.
  - Header: `bg` at 92% opacity, 1px `line` bottom border, no blur. Logo in serif with the surname in italic `brand`.
  - Footer: `sand` background, serif practice name.

- [x] **Phase 3: Hero.** Two columns on desktop (text left, photo right), stacked on mobile.
  - Small label with an `accent` rule, large serif headline, intro, two buttons, phone and hours row.
  - Photo with one large rounded corner and a warm overlay. Keep the existing slides and their timing.

- [x] **Phase 4: Services.** Home service cards, then the services pages (sidebar and detail).
  - Cards: photo on top with warm overlay, icon tile, serif title, `accent` bullet dots, "En savoir plus" link.
  - Sidebar active row: `brand` background, `on-brand` text, no tinted shadow.

- [x] **Phase 5: Biography.** Replace the blue, emerald and amber panels with `surface` cards and `brand` icons. Keep the layout and the "Voir plus" toggles.

- [x] **Phase 6: Testimonials.** One large featured quote on `brand` with `on-brand` text and an `accent` quote glyph, smaller quotes as `surface` cards.
  - Arabic reviews: `font-arabic`, `dir="rtl"`, line-height 1.8. Keep the carousel logic and timing.

- [x] **Phase 7: Contact.** Flat `surface` panels, `brand` icons, same information and order.

- [ ] **Phase 8: Polish and cleanup.**
  - Grep for leftover `slate-*`, `backdrop-blur`, old gradients and hard-coded hex values, and replace them.
  - Remove the old `brand-*` aliases and the unused `accent` favicon token if nothing uses them.
  - Check every page in light and dark, in all four locales, at 375px, 768px and 1280px.
