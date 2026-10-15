---
name: Haunted Quota
colors:
  surface: '#1a0d26'
  surface-dim: '#1a0d26'
  surface-bright: '#42334e'
  surface-container-lowest: '#150821'
  surface-container-low: '#23162f'
  surface-container: '#271a33'
  surface-container-high: '#32243e'
  surface-container-highest: '#3d2f4a'
  on-surface: '#f0dbfe'
  on-surface-variant: '#e0c0b1'
  inverse-surface: '#f0dbfe'
  inverse-on-surface: '#392b45'
  outline: '#a78b7d'
  outline-variant: '#584237'
  surface-tint: '#ffb690'
  primary: '#ffb690'
  on-primary: '#552100'
  primary-container: '#f97316'
  on-primary-container: '#582200'
  inverse-primary: '#9d4300'
  secondary: '#44e2cd'
  on-secondary: '#003731'
  secondary-container: '#03c6b2'
  on-secondary-container: '#004d44'
  tertiary: '#f9bd22'
  on-tertiary: '#402d00'
  tertiary-container: '#c49200'
  on-tertiary-container: '#422f00'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#ffdbca'
  primary-fixed-dim: '#ffb690'
  on-primary-fixed: '#341100'
  on-primary-fixed-variant: '#783200'
  secondary-fixed: '#62fae3'
  secondary-fixed-dim: '#3cddc7'
  on-secondary-fixed: '#00201c'
  on-secondary-fixed-variant: '#005047'
  tertiary-fixed: '#ffdf9f'
  tertiary-fixed-dim: '#f9bd22'
  on-tertiary-fixed: '#261a00'
  on-tertiary-fixed-variant: '#5c4300'
  background: '#1a0d26'
  on-background: '#f0dbfe'
  surface-variant: '#3d2f4a'
typography:
  headline-xl:
    fontFamily: Rubik
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
  headline-xl-mobile:
    fontFamily: Rubik
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
  headline-lg:
    fontFamily: Rubik
    fontSize: 36px
    fontWeight: '600'
    lineHeight: 44px
  headline-lg-mobile:
    fontFamily: Rubik
    fontSize: 26px
    fontWeight: '600'
    lineHeight: 34px
  headline-md:
    fontFamily: Rubik
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  headline-sm:
    fontFamily: Rubik
    fontSize: 18px
    fontWeight: '600'
    lineHeight: 24px
  body-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 26px
  body-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 22px
  body-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 18px
  label-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
  label-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
  label-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 10px
    fontWeight: '700'
    lineHeight: 14px
    letterSpacing: 0.05em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  gutter: 1rem
  gutter-md: 1.5rem
  margin: 1rem
  margin-md: 2rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2.5rem
---

## Brand & Style

This design system channels an eerie, midnight-office productivity atmosphere. Designed for teams driving pipeline, sprint deadlines, and sales quotas under moonlight, it blends high-utility productivity workflows with a playful, haunted aesthetic.

### Aesthetic Foundation
- **Haunted Office Metaphor:** Traditional enterprise surfaces are replaced with deep twilight velvet, candlelit glows, and ectoplasmic accents. Task lists feel like spellbooks, progress bars burn like jack-o'-lanterns, and target milestones radiate ghostly energy.
- **Approachably Playful & Dark:** Balancing intense focus with seasonal levity. It resists pure gothic dread in favor of an inviting, whimsical graveyard shift—warm amber lanterns cutting through midnight purple mist.
- **Visual Tenets:** High-contrast legibility, soft tactile containers, and subtle eerie phosphorescence that clarifies metric density rather than distracting from it.

## Colors

The palette draws directly from haunted folklore set within a modern digital workspace. Deep violet and shadowy obsidian anchor the interface, illuminated by rich pumpkin flame, spectral cyan, and candlelit warmth.

### Roles & Semantic Mapping
- **Primary (`#F97316` - Pumpkin Flame):** High-energy actions, primary buttons, pipeline velocity indicators, critical callouts, and active navigational nodes. Supported by `#EA580C` for hover and pressed states.
- **Secondary (`#2DD4BF` - Ghost Cyan):** Ethereal status highlights, completed quota states, ghosted milestones, and secondary interactive accents. Supported by `#4ADE80` (Ecto Green) for positive velocity and closed-won states.
- **Tertiary (`#FBBF24` - Candlelight Gold):** Warnings, target pacing markers, pending alerts, streak flame counters, and illuminated priority chips.
- **Neutral Base (`#1E112A` - Midnight Crypt):** Deep violet-tinted charcoal serving as the core container background. Paired with `#0F0914` for the subterranean canvas background and `#2D1B4E` for elevated card surfaces and hover borders.
- **Text & Foreground:** Neutral high-contrast text relies on soft eerie mist (`#F3F0F7`) for primary body and headers, with muted spectral lavender (`#A79BB7`) for metadata, hints, and disabled labels.

## Typography

The typographic hierarchy pairs **Rubik** for display and headlines with **Plus Jakarta Sans** for interface readability and body density.

- **Rubik (Headlines & Big Numbers):** The soft, friendly geometric corners of Rubik echo the warm curves of carved pumpkins and potion vials. Used boldly across dashboard metrics, goal sums, and view headers to inject personality without sacrificing fast scanning.
- **Plus Jakarta Sans (Body, Forms, Data Tables):** Provides crystalline clarity across complex deal sizes, pipeline timelines, and dense settings. Its open apertures and clean geometric construction maintain high legibility against saturated dark backgrounds.
- **Metrics & Figures:** Numeric quota tables should utilize tabular numbers (`tnum`) across `label-lg` and `body-md` to maintain vertical decimal alignment in revenue ledgers.

## Layout & Spacing

A structured 12-column responsive fluid grid provides disciplined structure to the playful aesthetic.

### Layout Behavior
- **Desktop (1024px+):** 12-column grid with `gutter-md` (24px) gutters and `margin-md` (32px) margins. Quota dashboards arrange overview cards into 3- or 4-column widgets, with primary pacing dials spanning 8 columns.
- **Tablet (768px - 1023px):** 8-column grid with `gutter` (16px) gutters. Complex deal matrices collapse from side-by-side into stacked vertical split-views.
- **Mobile (<768px):** 4-column grid with `margin` (16px) margins. Interactive cards collapse into unified single-column feeds with horizontal snap-scroll rails for secondary pipeline stages.

### Spacing Discipline
Consistent 4px/8px-based spacing rhythm. Component interiors favor `space-md` (16px) for standard cards and `space-xs` to `space-sm` for stacked list metadata, ensuring density without visual suffocation.

## Elevation & Depth

Visual hierarchy leverages **Tonal Layering** accompanied by **Subtle Ambient Phosphorescence**. Because the background is an abyssal obsidian purple (`#0F0914`), elevation relies on light-emitting surfaces rather than heavy drop-shadows.

### Layering Hierarchy
1. **Canvas (Ground 0):** `#0F0914` — Deep void background for the overarching app shell.
2. **Container (Level 1):** `#1E112A` with a soft 1px perimeter border of `#2D1B4E`. Used for cards, kanban backdrops, and navigation panels.
3. **Elevated Surface (Level 2):** `#2D1B4E` with an outer diffused glow: `0 8px 24px rgba(15, 9, 20, 0.6)`. Used for active drawers, tooltips, and floating quota widgets.
4. **Spectral Focal (Level 3 - Modals & Overlays):** `#241538` overlaying an eerie blurred backdrop (`backdrop-blur(12px) rgba(15, 9, 20, 0.75)`), accented by a subtle perimeter halo: `box-shadow: 0 0 32px rgba(249, 115, 22, 0.15)`.

Ghost cyan and pumpkin orange accents never cast heavy black shadows; they project low-opacity ambient color washes (`rgba(249, 115, 22, 0.2)` or `rgba(45, 212, 191, 0.2)`) that feel bioluminescent.

## Shapes

With a roundedness level of `2`, the system reinforces an organic, friendly curvature. Sharp edges are banished to keep the spooky theme whimsical and hospitable.

- **Standard Base (`rounded` / 8px):** Applied to inputs, buttons, table cell selections, and dropdown triggers.
- **Containers (`rounded-lg` / 16px):** Standard quota cards, pipeline lanes, and slide-out side sheets.
- **Hero Containers (`rounded-xl` / 24px):** Milestone celebratory banners, progress gauges, and onboarding wizard modals.
- **Capsule / Pill:** Tags, numeric pill badges, streak indicators, and ghost avatar counters use full radius rounding.

## Components

### Buttons
- **Primary (Pumpkin Flame):** Solid `#F97316` fill, `#0F0914` bold text (`label-lg`), `rounded` (8px). Hover state transitions to `#EA580C` with a soft flame halo (`0 0 16px rgba(249, 115, 22, 0.35)`).
- **Secondary (Ecto Line):** Ghost outline style using 1.5px border of `#2DD4BF`, transparent background, `#2DD4BF` text. On hover: fills with `rgba(45, 212, 191, 0.1)`.
- **Ghost Action:** Transparent background with `#F3F0F7` text; subtle `#2D1B4E` background fill on hover.

### Quota Cards & Target Panels
- Built on `#1E112A` with a 1px border of `#2D1B4E` and `rounded-lg` (16px).
- Internal header uses `headline-sm` in `#F3F0F7`.
- Metric numbers are rendered in bold `Rubik` (`headline-lg`), tinted `#F97316` for revenue, `#2DD4BF` for completed tasks, and `#FBBF24` for deals approaching quota expiry.

### Chips & Badges
- **Status Chips:** `rounded-full`, padding `space-xs` vertical and `space-sm` horizontal.
  - *Haunted/Overdue:* Deep crimson background (`rgba(239, 68, 68, 0.2)`) with bright coral text.
  - *In Pacing/Active:* Candlelit amber (`rgba(251, 191, 36, 0.15)`) with `#FBBF24` text.
  - *Exceeded/Spellbound:* Ecto teal (`rgba(45, 212, 191, 0.15)`) with `#2DD4BF` text.

### Inputs & Form Controls
- **Input Fields:** `#150C1D` field surface, 1px border of `#2D1B4E`, `body-md` typography. On focus: border shifts cleanly to `#F97316` with a faint orange aura.
- **Checkboxes & Radios:** `rounded` (6px) box with `#2D1B4E` outline. When checked, fills with `#F97316` displaying an eerie obsidian checkmark.

### Progress Meters & Jack-o'-Lantern Rails
- **Quota Trackers:** 8px track height in `#2D1B4E` with `rounded-full` caps. The progress indicator uses a gradient transitioning from `#EA580C` to `#FBBF24`. At 100% completion, the rail pulses with ghost cyan (`#2DD4BF`).

### Specialized Component: "Tombstone Milestone" Cards
- Miniature progress cards featuring arched top geometry (`rounded-t-2xl rounded-b-md`), displaying deal values, owner witch/warlock avatars, and glowing status runes that track weekly quota pacing.