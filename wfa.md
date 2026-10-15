---
name: Coastal Nomad Horizon
colors:
  surface: '#faf8ff'
  surface-dim: '#d2d9f4'
  surface-bright: '#faf8ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f2f3ff'
  surface-container: '#eaedff'
  surface-container-high: '#e2e7ff'
  surface-container-highest: '#dae2fd'
  on-surface: '#131b2e'
  on-surface-variant: '#3e4850'
  inverse-surface: '#283044'
  inverse-on-surface: '#eef0ff'
  outline: '#6e7881'
  outline-variant: '#bec8d2'
  surface-tint: '#006591'
  primary: '#006591'
  on-primary: '#ffffff'
  primary-container: '#0ea5e9'
  on-primary-container: '#003751'
  inverse-primary: '#89ceff'
  secondary: '#a73a00'
  on-secondary: '#ffffff'
  secondary-container: '#fd651e'
  on-secondary-container: '#571a00'
  tertiary: '#855300'
  on-tertiary: '#ffffff'
  tertiary-container: '#d88a00'
  on-tertiary-container: '#4a2c00'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#c9e6ff'
  primary-fixed-dim: '#89ceff'
  on-primary-fixed: '#001e2f'
  on-primary-fixed-variant: '#004c6e'
  secondary-fixed: '#ffdbce'
  secondary-fixed-dim: '#ffb599'
  on-secondary-fixed: '#370e00'
  on-secondary-fixed-variant: '#7f2b00'
  tertiary-fixed: '#ffddb8'
  tertiary-fixed-dim: '#ffb95f'
  on-tertiary-fixed: '#2a1700'
  on-tertiary-fixed-variant: '#653e00'
  background: '#faf8ff'
  on-background: '#131b2e'
  surface-variant: '#dae2fd'
typography:
  display:
    fontFamily: Bodoni Moda
    fontSize: 3.5rem
    fontWeight: '600'
    lineHeight: '1.15'
    letterSpacing: -0.02em
  display-mobile:
    fontFamily: Bodoni Moda
    fontSize: 2.25rem
    fontWeight: '600'
    lineHeight: '1.2'
    letterSpacing: -0.01em
  headline-lg:
    fontFamily: Bodoni Moda
    fontSize: 2.25rem
    fontWeight: '600'
    lineHeight: '1.25'
    letterSpacing: -0.015em
  headline-lg-mobile:
    fontFamily: Bodoni Moda
    fontSize: 1.75rem
    fontWeight: '600'
    lineHeight: '1.3'
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Bodoni Moda
    fontSize: 1.5rem
    fontWeight: '500'
    lineHeight: '1.35'
    letterSpacing: -0.01em
  headline-sm:
    fontFamily: Bodoni Moda
    fontSize: 1.25rem
    fontWeight: '500'
    lineHeight: '1.4'
  body-lg:
    fontFamily: Manrope
    fontSize: 1.125rem
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Manrope
    fontSize: 1rem
    fontWeight: '400'
    lineHeight: '1.5'
  body-sm:
    fontFamily: Manrope
    fontSize: 0.875rem
    fontWeight: '400'
    lineHeight: '1.5'
  label-lg:
    fontFamily: Manrope
    fontSize: 0.875rem
    fontWeight: '600'
    lineHeight: '1.25'
    letterSpacing: 0.02em
  label-md:
    fontFamily: Manrope
    fontSize: 0.75rem
    fontWeight: '600'
    lineHeight: '1.25'
    letterSpacing: 0.04em
  label-sm:
    fontFamily: Manrope
    fontSize: 0.6875rem
    fontWeight: '700'
    lineHeight: '1.2'
    letterSpacing: 0.06em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  gutter: 1.5rem
  gutter-mobile: 1rem
  margin: 3rem
  margin-tablet: 2rem
  margin-mobile: 1rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2.5rem
---

## Brand & Style

This design system captures the intersection of high-tier remote mobility and coastal leisure. Geared toward high-performing hybrid professionals, digital nomads, and flexible enterprise teams, the aesthetic blends the refined discipline of executive productivity with the liberating ease of an oceanfront cabana.

The visual direction merges **Minimalism** with an **Editorial Warmth** flair:
- Generous breathing room inspired by expansive sea horizons.
- Crisp, airy typography pairing the high-contrast elegance of Bodoni Moda for headlines with the clean, highly legible utility of Manrope for dense calendar structures and quota metrics.
- Sun-drenched accents and translucent sand-tinted cards create an uplifting, breezy atmosphere without sacrificing the clarity needed for complex scheduling, travel-compliance logs, and work-allocation dials.

## Colors

The color palette reflects coastal daylight, deep water, sunlit sands, and vibrant citrus heat:

- **Primary (`#0EA5E9`)**: The vibrant sky/ocean teal core. Used for interactive states, progress rings, primary actions, and navigational markers.
- **Secondary (`#EA580C`)**: Sun-baked terracotta/coral. Deployed for quota thresholds, alert highlights, current day indicators, and time-off milestones.
- **Tertiary (`#F59E0B`)**: Warm amber sunbeam. Used for warning signals, pending approvals, nomad travel mode status badges, and streak counts.
- **Neutral (`#0F172A`)**: Deep abyss slate. Provides high-contrast, razor-sharp legibility for typography, structural borders, and dark icon fills.
- **Surfaces & Canvases**: Soft sand cream (`#F8FAFC` base tinted with subtle `#FEFCE8` warmth). Surfaces use subtle white-sand card backings (`#FFFFFF`) with oceanic micro-tints to maintain a radiant, sun-washed ambiance.

## Typography

The type system balances evocative editorial prestige with strict interface utility:

- **Bodoni Moda** provides editorial contrast for high-impact metrics, dates, and narrative section titles, infusing an elevated resort-like look.
- **Manrope** anchors analytical density. Its geometric build, open counters, and sturdy x-height provide immediate clarity within quota meters, timesheets, destination filters, and compliance alerts.
- Use `display` sparingly for executive hero dashboards and quota completion celebrations.
- Render all date tags, category overlines, and metric unit labels in `label-md` or `label-sm` with upper-case tracking to punctuate layout rhythm.

## Layout & Spacing

The layout philosophy uses a flexible, rhythmic 12-column fluid grid that adapts dynamically across viewing modes:

- **Desktop (>= 1280px)**: 12-column grid with `3rem` margins and `1.5rem` gutters. Accommodates side-by-side calendar planners, remote work allowance meters, and interactive map split views.
- **Tablet (768px - 1279px)**: 8-column layout with `2rem` margins and `1.5rem` gutters. Multi-column cards collapse into balanced pairs; navigation switches to an executive top drawer.
- **Mobile (< 768px)**: 4-column layout with `1rem` margins and `1rem` gutters. Quota widgets, horizon sliders, and day lists transition into linear vertical flows.

Vertical spacing follows an 8px base rhythm. Outer layouts utilize generous whitespace (`space-xl` and above) to emulate seaside open air, while interior component controls maintain compact, highly focused clusters using `space-xs` and `space-sm`.

## Elevation & Depth

Visual hierarchy is maintained through soft, sun-washed ambient shadows and low-contrast surface outlines, preventing interface clutter while keeping elements floating effortlessly over the soft sand background:

- **Level 0 (Flat)**: Pure flush surfaces (`#FFFFFF` or tinted cream `#FEFCE8`), bounded by subtle sand borders (`rgba(15, 23, 42, 0.06)`).
- **Level 1 (Card Rest)**: Cards and dashboard panels cast an ultra-soft ocean breeze shadow: `0 4px 20px -2px rgba(14, 165, 233, 0.06), 0 2px 6px -1px rgba(15, 23, 42, 0.04)`.
- **Level 2 (Active / Hover / Dropdown)**: Hovered planner cards, date pickers, and context menus elevate: `0 12px 32px -4px rgba(14, 165, 233, 0.12), 0 4px 12px -2px rgba(15, 23, 42, 0.06)`.
- **Level 3 (Modal / Floating Utility Dock)**: Island summary bars and floating bottom quota trackers use an ocean-glow projection: `0 20px 40px -8px rgba(14, 165, 233, 0.18), 0 8px 16px -4px rgba(15, 23, 42, 0.08)`.
- **Glass Accents**: Sticky navigation headers and calendar floating controls employ `backdrop-filter: blur(12px)` over `rgba(255, 255, 255, 0.85)` with a faint oceanic border (`rgba(14, 165, 233, 0.12)`).

## Shapes

With roundedness level 2:
- Standard interactive elements (buttons, inputs, select fields) feature a refined `0.5rem` (`8px`) radius.
- Structural cards, analytical containers, and interactive calendar modules use `rounded-lg` at `1rem` (`16px`).
- Deep modal overlays, quick-action island sheets, and highlighted destination cards utilize `rounded-xl` at `1.5rem` (`24px`).
- Chips, quota pill indicators, status dots, and avatar rings feature a fully circular profile (`9999px`) to echo organic pebble and droplet silhouettes.

## Components

### Buttons
- **Primary**: Solid `#0EA5E9` background, white Manrope semi-bold label, `0.5rem` radius. Gentle glow on hover with `rgba(14, 165, 233, 0.25)` shadow expansion.
- **Secondary / Resort Coral**: Solid `#EA580C` background, white label; reserved for quota commitments, "Book Workations", or urgent schedule locks.
- **Outlined / Surface**: Translucent white fill, `1px` border of `rgba(15, 23, 42, 0.12)`, text `#0F172A`. Hover shifts border to `#0EA5E9` with faint `#0EA5E9` micro-fill (`5%` opacity).

### Chips & Badges
- **Status Pills**: Pill-shaped (`rounded-full`), `space-xs` vertical and `space-sm` horizontal padding.
- **Beach / Remote Days**: `#0EA5E9` tint background (`10%` fill) with `#0284C7` text.
- **Office Quota Met**: `#F0FDF4` fill with `#15803D` text.
- **Approaching Limit / Warning**: `#FEFCE8` fill with `#B45309` text.

### Inputs & Date Controls
- Text inputs and date range pickers feature crisp `0.5rem` borders using `rgba(15, 23, 42, 0.14)` over white surfaces.
- Focus state activates a dual-ring transition: an inner border of `#0EA5E9` and an ambient outer ring of `rgba(14, 165, 233, 0.2)`.

### Cards & Quota Tiles
- Designed as floating white-sand modules. Header areas feature Bodoni Moda subtitles paired with Manrope body values.
- Progress dials display an ocean gradient stroke transitioning from `#0EA5E9` to `#38BDF8`, counterbalanced by sunny coral `#EA580C` ticks for minimum physical office requirements.

### Checkboxes & Radio Controls
- Rounded squares (`4px` radius) for checkboxes, true circles for radio buttons.
- Inactive: `1.5px` stroke in `rgba(15, 23, 42, 0.25)`.
- Active: Solid `#0EA5E9` fill with a pure white check icon or center pip, accompanied by a subtle teal focus shadow.

### Domain-Specific Components
- **Quota Horizon Meter**: Horizontal segmented bar displaying remote vs. in-office allocations; each segment uses distinct tropical tonal fills (Office: Slate, Nomad Beach: Cyan, Travel Transition: Amber).
- **Timezone Island Dock**: Fixed bottom-center pill dock showing synchronized office home time versus local seaside time with warm ambient backdrops.