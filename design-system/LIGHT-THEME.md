# Design system – light theme (Academic Aurora)

This document summarizes the **light theme** design decisions and references used to keep the site feeling professional, trustworthy, and human-generated.

## References

- **[UI/UX Pro Max](https://github.com/nextlevelbuilder/ui-ux-pro-max-skill)** – patterns and color intelligence applied to the light theme:
  - **Soft UI Evolution** (style #19): subtle depth, improved shadows (softer than flat, clearer than neumorphism), 200–300ms transitions, border-radius 8–12px, WCAG AA+.
  - **Accessible & Ethical** (style #8): high contrast, clear focus states, keyboard navigation, `prefers-reduced-motion` respected.
  - **Education / Consulting palettes** (e.g. Legal #42, Consulting #73): authority navy, trust blue, warm CTA (amber/gold).

## Light theme roles

| Role            | Use |
|-----------------|-----|
| **Primary**     | Links, CTAs, selected state (#2563EB). |
| **Nav**         | Deep blue bar (#1E40AF), white text, amber active (#F59E0B). |
| **Submenu**     | Soft blue tint (#EFF6FF), hover #DBEAFE, active #2563EB. |
| **Cards**       | White (#FFFFFF), soft multi-layer shadow, 250ms hover. |
| **Footer**      | Dark slate (#1E293B), muted text (#CBD5E1). |
| **Brand name**  | College #1e3a8a, Care #7c3aed (unchanged in both themes). |

## Implementation notes

- **Shadows (light):** Default card uses `0 2px 4px rgba(0,0,0,0.04), 0 4px 12px rgba(0,0,0,0.06)`. Hover uses `0 4px 8px rgba(0,0,0,0.06), 0 8px 24px rgba(37,99,235,0.12)`.
- **Transitions:** 250ms ease for cards, buttons, and interactive elements (Soft UI Evolution).
- **Reduced motion:** `@media (prefers-reduced-motion: reduce)` shortens transitions/animations to near-instant.
- **Focus:** Visible focus ring (outline) for keyboard users; primary blue in light, cyan in dark.

## Pre-delivery checklist (from UI/UX Pro Max)

- [ ] No emojis as icons (use SVG, e.g. Heroicons/Lucide/Feather).
- [ ] `cursor: pointer` on all clickable elements.
- [ ] Hover states with smooth transitions (150–300ms).
- [ ] Light mode: text contrast ≥ 4.5:1.
- [ ] Focus states visible for keyboard navigation.
- [ ] `prefers-reduced-motion` respected.
- [ ] Responsive: 375px, 768px, 1024px, 1440px.

## Reference layout (Scholar’s Key–style hero)

The light theme hero follows a two-column, trust-focused layout:

- **Left column:** Headline (“Navigate Your Future. Uncover Your Path.”), subtitle, primary CTA (amber “Book a Free Session”), secondary CTA (outline “Explore Our Services”), college search, and social proof (advisor avatars + names).
- **Right column:** Subtle geometric/radial pattern, tilted concern cards (e.g. “Drowning in SOP drafts?”, “Confused about college choice?”), and a **graduate image** (diverse students/graduates) for an emotional, user-friendly touch.
- **Typography:** H1 bold (700), subtitle regular, clear hierarchy; sans-serif (Inter/Poppins).
- **Golden/amber accent** is used for the primary CTA and active nav in light theme to match the reference and keep a premium, trustworthy feel.

To use your own hero image of graduates, add `public/hero-graduates.jpg` and in `HeroSection.jsx` set the hero image `src` to `` `${import.meta.env.BASE_URL}hero-graduates.jpg` `` (with fallback to the current URL if needed).

