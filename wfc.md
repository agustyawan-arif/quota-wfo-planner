---
name: Work From Cafe Planner
colors:
  surface: '#fff8f3'
  surface-dim: '#e3d8cb'
  surface-bright: '#fff8f3'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#fdf2e4'
  surface-container: '#f7ecde'
  surface-container-high: '#f2e7d9'
  surface-container-highest: '#ece1d3'
  on-surface: '#201b12'
  on-surface-variant: '#4f443f'
  inverse-surface: '#353026'
  inverse-on-surface: '#faefe1'
  outline: '#82746e'
  outline-variant: '#d3c3bc'
  surface-tint: '#755849'
  primary: '#200e04'
  on-primary: '#ffffff'
  primary-container: '#382216'
  on-primary-container: '#a88777'
  inverse-primary: '#e4bfad'
  secondary: '#855230'
  on-secondary: '#ffffff'
  secondary-container: '#febb90'
  on-secondary-container: '#794827'
  tertiary: '#071600'
  on-tertiary: '#ffffff'
  tertiary-container: '#142d00'
  on-tertiary-container: '#709a4b'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#ffdbca'
  primary-fixed-dim: '#e4bfad'
  on-primary-fixed: '#2b170b'
  on-primary-fixed-variant: '#5b4133'
  secondary-fixed: '#ffdbc7'
  secondary-fixed-dim: '#fbb88e'
  on-secondary-fixed: '#311300'
  on-secondary-fixed-variant: '#693b1b'
  tertiary-fixed: '#c2f198'
  tertiary-fixed-dim: '#a6d47e'
  on-tertiary-fixed: '#0c2000'
  on-tertiary-fixed-variant: '#2b5008'
  background: '#fff8f3'
  on-background: '#201b12'
  surface-variant: '#ece1d3'
typography:
  display-lg:
    fontFamily: EB Garamond
    fontSize: 48px
    fontWeight: '600'
    lineHeight: 56px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: EB Garamond
    fontSize: 36px
    fontWeight: '500'
    lineHeight: 44px
    letterSpacing: -0.01em
  headline-lg-mobile:
    fontFamily: EB Garamond
    fontSize: 28px
    fontWeight: '500'
    lineHeight: 34px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: EB Garamond
    fontSize: 28px
    fontWeight: '500'
    lineHeight: 36px
  headline-sm:
    fontFamily: EB Garamond
    fontSize: 22px
    fontWeight: '600'
    lineHeight: 28px
  title-md:
    fontFamily: Manrope
    fontSize: 18px
    fontWeight: '600'
    lineHeight: 24px
    letterSpacing: -0.01em
  title-sm:
    fontFamily: Manrope
    fontSize: 15px
    fontWeight: '600'
    lineHeight: 20px
  body-lg:
    fontFamily: Manrope
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 26px
  body-md:
    fontFamily: Manrope
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 22px
  body-sm:
    fontFamily: Manrope
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 18px
  label-md:
    fontFamily: Manrope
    fontSize: 13px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.02em
  label-sm:
    fontFamily: Manrope
    fontSize: 11px
    fontWeight: '700'
    lineHeight: 14px
    letterSpacing: 0.04em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  gutter: 1.25rem
  gutter-mobile: 0.75rem
  margin: 2rem
  margin-mobile: 1rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2.5rem
---

## Brand & Style

This design system channels the sensory ambiance of an artisanal third-wave coffee house into a focused digital environment. It merges classical literary warmth with contemporary productivity ergonomics, evoking the quiet focus of a sunlit corner table, the aroma of fresh extraction, and the tactile presence of linen notebook pages.

### Design Principles
- **Atmospheric Warmth:** Surfaces reject clinical cold grays in favor of milk, crema, and parchment undertones. High-contrast elements lean into deep espresso roasts rather than harsh, pure blacks.
- **Literary Poise with Functional Utility:** Expressive classical serif headlines lend editorial dignity and slow-crafted character, grounded by a clean, geometric sans-serif core for data-dense productivity tables, filters, and status toggles.
- **Tactile Softness:** Interfaces mimic physical paper cards, leather coasters, and subtle debossed details without descending into heavy skeuomorphism.

## Colors

The color palette creates a layered, aromatic visual hierarchy rooted in the roast profiles and botanical touches of a craft cafe.

- **Primary (`#382216` - Dark Roast Espresso):** The primary anchor used for definitive structural lines, dominant typography, primary CTA containers, and prominent icons.
- **Secondary (`#8C5835` - Hazelnut & Caramel):** Mid-tone warmth utilized for secondary actions, interactive focus rings, active tab indicators, and contextual badges.
- **Tertiary (`#4F772D` - Matcha Green):** An organic botanical accent used for positive status states, verified venue markers, power outlet availability indicators, and quiet confirmations.
- **Accent Soft Terracotta (`#C86D51`):** Reserved for alert tags, urgent booking notices, low availability indicators, and subtle warm notifications.
- **Neutral Palette:**
  - `Canvas / Base Crema`: `#FFF9F2` provides a soft, unbleached foundation that reduces eye strain during extended work sessions.
  - `Surface Warm Latte`: `#EFE4D6` serves as card backgrounds, input containers, and structural dividers.
  - `Muted Steamed Milk`: `#F6ECE1` forms alternating row backgrounds and secondary elevation states.

## Typography

The type scale balances the romantic, bookish heritage of `EB Garamond` with the clean, highly legible precision of `Manrope`.

- **EB Garamond (Editorial & Titles):** Used exclusively for structural headers, venue names, empty-state reflections, and curated editorial recommendations. Never set below 20px, and avoid using heavy bold weights to maintain optical grace.
- **Manrope (Workhorse Productivity & Interface):** Handles all dashboard data, filter chips, time pickers, seat availability numbers, maps, and micro-labels. Its open counters and geometric rhythm maintain legibility under harsh glare or small mobile screens.
- **Rhythm & Line Height:** Paragraphs in `body-lg` are afforded generous line-heights (`26px`) to foster a calm, unhurried reading cadence reminiscent of physical publication layouts.

## Layout & Spacing

This design system uses a relaxed, fluid grid structure structured on an 8px baseline, paired with 4px micro-adjustments for compact badges and table data.

### Breakpoints & Layout Adaptations
- **Mobile (< 768px):** 4-column layout with a compressed outer margin of `1rem` and gutter of `0.75rem`. Cards default to full-width stacked configurations. Action panels and time-slot selectors anchor to the bottom viewport.
- **Tablet (768px - 1023px):** 8-column layout with `1.5rem` margins. Venue listings and filter sidebars adopt a split 3:5 column ratio.
- **Desktop (>= 1024px):** 12-column layout capped at an inner container max-width of `1280px`. Gutter remains `1.25rem` with generous `2rem` external margins, allowing whitespace to frame content without visual crowding.

### Rhythm
Components favor internal breathing room (`space-lg` padding on interactive cards) over dense edge-to-edge content. Vertical margins between logical sections use `space-xl` to maintain an unhurried, mindful cadence.

## Elevation & Depth

Visual hierarchy avoids synthetic, neutral gray drop-shadows. Instead, elevation relies on ambient, warm-tinted shadows derived from roasted bean pigments, combined with tonal latte layering.

### Surface Tiers
- **Base Canvas (`#FFF9F2`):** The ground level representing raw warm paper.
- **Surface Level 1 (`#FFFFFF` or `#FDFBF7`):** Raised working cards, venue directory tiles, and calendar slots.
- **Surface Level 2 (`#EFE4D6`):** Secondary nested wells, search filters, and table header rows.

### Shadow Characteristics
- **Resting Elevation (`elevation-1`):** `0px 2px 8px -1px rgba(56, 34, 22, 0.06), 0px 1px 3px 0px rgba(56, 34, 22, 0.04)`. A gentle warm bleed framing interactive surfaces.
- **Interactive / Hover Elevation (`elevation-2`):** `0px 8px 20px -3px rgba(56, 34, 22, 0.10), 0px 3px 6px -1px rgba(56, 34, 22, 0.05)`. Applies a slight vertical rise (`translateY(-2px)`) when focusing on a cafe listing.
- **Overlay & Popovers (`elevation-3`):** `0px 16px 36px -4px rgba(56, 34, 22, 0.14), 0px 4px 12px -2px rgba(56, 34, 22, 0.06)`. Used for seat reservation sheets, modals, and dropdown menus.
- **Outlines:** Paired with soft hairline borders using `rgba(56, 34, 22, 0.08)` to ground floating elements against cream backgrounds.

## Shapes

The shape vocabulary uses the `Soft` (level 1) standard, prioritizing subtle, tailored radii over bubbly or organic shapes.

- **Base Radii (`0.25rem`):** Applied to compact tags, table cells, micro-badges, and inputs.
- **Large Radii (`rounded-lg` / `0.5rem`):** Standard for main interactive cards, modal dialogue frames, and seat-map containers.
- **Extra Large Radii (`rounded-xl` / `0.75rem`):** Reserved for primary hero showcases, floating command pallets, and mobile action bottom-sheets.
- **Full Pill Radii:** Exclusively reserved for status chips, filter tags, and circular icon buttons (e.g., bookmarking, WiFi speed indicator).

## Components

### Buttons
- **Primary:** Background in Dark Roast (`#382216`), text in Crema (`#FFF9F2`), radius `0.25rem`. Hover shifts to `#4E3120` with `elevation-1`. Active state compresses slightly.
- **Secondary:** Border `1px solid #8C5835`, background transparent, text `#8C5835`. On hover, fills with a tinted wash of `rgba(140, 88, 53, 0.08)`.
- **Ghost:** Text `#382216`, no border, hover background `rgba(56, 34, 22, 0.05)`.

### Chips & Filter Tags
- **Filter Chip:** Pill-shaped (`rounded-full`), height `32px`, typography `label-md`. Unselected state uses `#EFE4D6` background with `#382216` text. Selected state inverts to `#382216` with `#FFF9F2` text.
- **Amenity Badges (WiFi, Outlets, Noise Level):** Compact rounded indicators (`rounded-sm`), styled with subtle matcha accents (`#4F772D`) when verified, or soft terracotta (`#C86D51`) when power outlets are scarce.

### Cards
- **Cafe Listing Card:** Built on surface `#FFFFFF` or `#FDFBF7`, framed with a `1px solid rgba(56, 34, 22, 0.08)` border and `rounded-lg`. Padding strictly set to `space-lg`. Imagery features warm duotone overlays or natural cafe photography with gentle rounded inner corners.
- **Nested Detail Cards:** Contained within `#EFE4D6` background with no border, creating clean tonal separation without competing shadows.

### Input Fields
- **Search & Text Inputs:** Height `44px`, background `#FFFFFF`, border `1px solid rgba(56, 34, 22, 0.18)`, border-radius `0.25rem`. Text styled in `body-md` (`#382216`), placeholder in `rgba(56, 34, 22, 0.45)`. Focus state features a solid `2px` focus ring in Hazelnut (`#8C5835`) with zero border color bleeding.

### Checkboxes & Radio Buttons
- **Checkboxes:** Size `18px`, `rounded-sm` (2px), border `1.5px solid #8C5835`. Selected state fills with Dark Roast (`#382216`) with an inset cream checkmark.
- **Radio Buttons:** Concentric circle styling. Selected state features an inner `#382216` pip framed by an unbleached `#FFF9F2` buffer ring.

### Domain-Specific Components
- **Noise Meter:** A horizontal segment bar representing cafe sound level (Quiet Study, Gentle Hum, Lively Bustle) using progressive earthy tones from Matcha Green to Hazelnut.
- **Outlet Availability Matrix:** Compact grid icon depicting accessible desk power ports, utilizing `#4F772D` for high-density seating areas.