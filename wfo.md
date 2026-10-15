---
name: Executive Hybrid Suite
colors:
  surface: '#f8f9ff'
  surface-dim: '#cbdbf5'
  surface-bright: '#f8f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#eff4ff'
  surface-container: '#e5eeff'
  surface-container-high: '#dce9ff'
  surface-container-highest: '#d3e4fe'
  on-surface: '#0b1c30'
  on-surface-variant: '#454652'
  inverse-surface: '#213145'
  inverse-on-surface: '#eaf1ff'
  outline: '#767683'
  outline-variant: '#c6c5d3'
  surface-tint: '#4957ae'
  primary: '#10207a'
  on-primary: '#ffffff'
  primary-container: '#2b3990'
  on-primary-container: '#9ca9ff'
  inverse-primary: '#bbc3ff'
  secondary: '#904d00'
  on-secondary: '#ffffff'
  secondary-container: '#fe932c'
  on-secondary-container: '#663500'
  tertiary: '#1f2d3f'
  on-tertiary: '#ffffff'
  tertiary-container: '#354356'
  on-tertiary-container: '#a1b0c7'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#dfe0ff'
  primary-fixed-dim: '#bbc3ff'
  on-primary-fixed: '#000e5e'
  on-primary-fixed-variant: '#303e95'
  secondary-fixed: '#ffdcc3'
  secondary-fixed-dim: '#ffb77d'
  on-secondary-fixed: '#2f1500'
  on-secondary-fixed-variant: '#6e3900'
  tertiary-fixed: '#d5e3fc'
  tertiary-fixed-dim: '#b9c7df'
  on-tertiary-fixed: '#0d1c2e'
  on-tertiary-fixed-variant: '#3a485b'
  background: '#f8f9ff'
  on-background: '#0b1c30'
  surface-variant: '#d3e4fe'
typography:
  headline-xl:
    fontFamily: Hanken Grotesk
    fontSize: 40px
    fontWeight: '700'
    lineHeight: 48px
    letterSpacing: -0.02em
  headline-xl-mobile:
    fontFamily: Hanken Grotesk
    fontSize: 30px
    fontWeight: '700'
    lineHeight: 36px
    letterSpacing: -0.01em
  headline-lg:
    fontFamily: Hanken Grotesk
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
    letterSpacing: -0.015em
  headline-lg-mobile:
    fontFamily: Hanken Grotesk
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Hanken Grotesk
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
    letterSpacing: -0.01em
  headline-sm:
    fontFamily: Hanken Grotesk
    fontSize: 18px
    fontWeight: '600'
    lineHeight: 24px
  body-lg:
    fontFamily: Manrope
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-md:
    fontFamily: Manrope
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  body-sm:
    fontFamily: Manrope
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 16px
  label-lg:
    fontFamily: Manrope
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: 0.01em
  label-md:
    fontFamily: Manrope
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.02em
  label-sm:
    fontFamily: Manrope
    fontSize: 10px
    fontWeight: '700'
    lineHeight: 14px
    letterSpacing: 0.04em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  gutter: 1.25rem
  gutter-sm: 0.75rem
  gutter-lg: 1.5rem
  margin: 1.5rem
  margin-mobile: 1rem
  margin-desktop: 2.5rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2.5rem
---

## Brand & Style

This design system translates executive reliability into a crisp, human-centered digital workplace tool. Grounded in the characterful poise of a bespoke corporate briefcase mascot, the design marries structural authority with welcoming hospitality. The audience comprises enterprise leaders, department managers, and hybrid professionals seeking clarity across office schedules, desk bookings, and collaboration windows.

The design movement blends **Corporate Modern** with subtle **Tactile Craft**. Precision typography and rigorous layout hierarchies prevent friction during high-frequency tasks, while warm leather-amber accents and soft ambient depth inject vitality into institutional workflows. The emotional response evokes punctuality, quiet luxury, and the dependable reassurance of arriving prepared for the workday.

## Colors

The palette establishes an unmistakable hierarchy rooted in classic tailoring and executive leather goods:

- **Primary (`#2b3990`)**: Mascot rich navy. Directs core system focus, primary action buttons, active navigation markers, and header highlights. It delivers structural confidence and institutional authority.
- **Secondary (`#d97706`)**: Saddle amber and warm leather. Used strategically for pending hybrid approvals, VIP collaboration highlights, active calendar indicators, and high-impact badges.
- **Tertiary (`#475569`)**: Slate steel. Provides secondary functional support, structured borders, subtle iconography, and tab segment controls.
- **Neutral (`#64748b`)**: Balanced graphite. Drives metadata typography, passive borders, and secondary container fills.

Background surfaces rely on crisp, daylight-tinted whites (`#f8fafc` and `#f1f5f9`), avoiding stark hospital whitewash while keeping contrast crystal clear for data-dense office schedules.

## Typography

Typography establishes an intentional cadence between architectural structure and human-scale clarity:

- **Display & Headlines (`Hanken Grotesk`)**: Delivers crisp, technical geometry with subtle humanist curves. Its tight letter spacing and prominent cap heights lend an authoritative, Swiss-inspired polish to calendar headings, dashboard KPIs, and room status titles.
- **Body & Controls (`Manrope`)**: Provides geometric balance and open counters, ensuring instant legibility across complex multi-user desk charts, time stamps, and meeting logs.
- **Labels & Microcopy**: Rendered in uppercase or bold weights of Manrope with deliberate letter tracking, ensuring badge designations (e.g., "IN OFFICE", "REMOTE", "FOCUS DESK") maintain instant scanability at glance speed.

## Layout & Spacing

The system implements a disciplined 12-column fluid grid on desktop, converting to a 6-column grid on tablet and a single-column layout on mobile devices:

- **Desktop (1024px and above)**: Full calendar views, interactive floor maps, and team presence sidebars sit side-by-side using `gutter-lg` (24px) and page margins of `margin-desktop` (40px). 
- **Tablet (768px - 1023px)**: Sidebars collapse to slide-over drawers; 6-column calendar grids compress using standard `gutter` (20px).
- **Mobile (Below 768px)**: Strict 1-column stack with dynamic safe area margins (`margin-mobile` / 16px). Week grids turn into horizontal paginated date scrollers.

Spacers adhere to strict 4px multiples (`space-xs` through `space-xl`) to preserve clean alignment between data chips, avatar stacks, and timeline cells.

## Elevation & Depth

Visual hierarchy leverages crisp tonal staging combined with soft, tinted ambient shadows inspired by natural executive office lighting:

- **Base Canvas (Level 0)**: Tinted crisp slate (`#f8fafc`). Completely flat to ground the app structure.
- **Surface Panels & Cards (Level 1)**: Pure white (`#ffffff`) surfaces paired with a razor-thin structural outline (`1px solid #e2e8f0`) and subtle ambient dispersion: `0 2px 4px -1px rgba(43, 57, 144, 0.04), 0 4px 6px -2px rgba(43, 57, 144, 0.03)`.
- **Active / Hover State (Level 2)**: Shifted lift applied to interactive room modules, calendar day blocks, and elevated cards: `0 8px 16px -3px rgba(43, 57, 144, 0.08), 0 4px 6px -2px rgba(43, 57, 144, 0.04)`.
- **Modals, Floating Booking Panels & Overlays (Level 3)**: Supported by soft backdrop glass blur (`backdrop-filter: blur(8px)`) and deeper containment: `0 20px 25px -5px rgba(15, 23, 42, 0.12), 0 8px 10px -6px rgba(15, 23, 42, 0.08)`.

## Shapes

The shape vocabulary aligns with the rounded contours of modern leather briefcases and molded hardware:

- **Standard Radius (`8px` / `0.5rem`)**: Applied to standard input fields, list items, calendar day cells, and nested interactive widgets.
- **Container Radius (`16px` / `1rem`)**: Applied to surface cards, modals, floor plans, and primary content shells.
- **Pill Radius (`9999px`)**: Reserved exclusively for team presence tags, status badges, avatar enclosures, and quick-filter toggle chips.

## Components

### Buttons
- **Primary**: Solid rich navy (`#2b3990`) fill with crisp white text, 8px border-radius, and medium font weight. On hover, smooth transition to deeper indigo (`#1e2563`) with slight vertical translation (`-1px`).
- **Accent / Alert**: Warm amber (`#d97706`) button used for urgent approvals, desk reservations expiring soon, and high-priority attendance toggles.
- **Secondary**: Pure white fill with slate border (`#cbd5e1`), navy text, and soft ambient shadow on hover.
- **Ghost**: Unbounded navy or slate text, gaining a faint slate tint (`#f1f5f9`) on interaction.

### Chips & Status Tags
- **In-Office Tag**: Rich navy pill (`#eef2ff` background, `#2b3990` foreground, solid 1px border `#c7d2fe`).
- **Remote / WFH Tag**: Soft slate pill (`#f1f5f9` background, `#475569` foreground).
- **Travel / Meeting Tag**: Amber leather pill (`#fef3c7` background, `#b45309` foreground).
- All chips feature compact dimensions (`label-sm`), 4px left-dot status indicators, and pill-shaped boundaries.

### Input Fields & Selectors
- Standard height of 42px with 8px corner radius.
- Background pure white, enclosed by 1px cool slate border (`#cbd5e1`).
- Focus state reveals an unambiguous 2px solid navy focus ring (`#2b3990`) with a transparent 2px offset.

### Cards & Desk Modules
- Pure white fill framed with subtle 1px border (`#e2e8f0`).
- Divided into clear top metadata (department, zone), central content (desk ID, occupant avatar), and bottom action footer (quick check-in button).

### Checkboxes & Radio Buttons
- 18px square (or circle) with 4px inner rounding.
- Inactive state: 1.5px border (`#94a3b8`) on white. Active state: Solid `#2b3990` fill with bold white checkmark or center pip.

### Specialized Component: Interactive Floor Grid / Day Strip
- Date cells display day initials in `label-sm` above bold numeric day counters in `headline-sm`.
- Active booked days highlight with an amber leather underline bar (3px height) or complete navy fill when selected.