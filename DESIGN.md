---
name: Amiibo Finder
description: A collector's den you fill one gift at a time; an isometric room with walnut shelves, brass plaques and paper tags.
colors:
  ground: "#e3e7ec"
  surface: "#f5f7f9"
  surface-raised: "#ffffff"
  ink: "#14191f"
  ink-soft: "#3b4652"
  line: "#bcc4cd"
  line-strong: "#8d98a4"
  wall: "#1f5a48"
  wall-shade: "#17473a"
  wall-trim: "#d9bd8e"
  wall-cap: "#e8d6b3"
  floor: "#c78a50"
  floor-grain: "#ad733f"
  floor-edge: "#7e5129"
  walnut: "#6b4028"
  walnut-deep: "#4a2a19"
  brass: "#d4a03a"
  brass-light: "#f0c768"
  brass-deep: "#9c7121"
  paper: "#faf7ef"
  sky-top: "#7fb5e6"
  sky-bottom: "#cfe4f5"
  cobalt: "#2344d6"
  cobalt-hover: "#1b36b0"
  cobalt-soft: "#dfe5ff"
  on-cobalt: "#ffffff"
  gift-wrap: "#2d4ce0"
  danger: "#b3261e"
  danger-soft: "#fbe3e1"
  success: "#1f6b4f"
  paper-ink: "#1d1a14"
  reveal-ink: "#f6f1e4"
typography:
  display:
    fontFamily: "Anybody, Atkinson Hyperlegible Next, system-ui, sans-serif"
    fontSize: "clamp(3rem, 7.5vw, 6rem)"
    fontWeight: 850
    lineHeight: 0.92
    letterSpacing: "-0.04em"
    fontVariation: "'wdth' 120"
  headline:
    fontFamily: "Anybody, Atkinson Hyperlegible Next, system-ui, sans-serif"
    fontSize: "clamp(2.25rem, 4.6vw, 4rem)"
    fontWeight: 800
    lineHeight: 1.05
    letterSpacing: "-0.03em"
    fontVariation: "'wdth' 112"
  headline-section:
    fontFamily: "Anybody, Atkinson Hyperlegible Next, system-ui, sans-serif"
    fontSize: "clamp(1.75rem, 3.2vw, 2.5rem)"
    fontWeight: 800
    lineHeight: 1.05
    letterSpacing: "-0.02em"
    fontVariation: "'wdth' 112"
  title:
    fontFamily: "Anybody, Atkinson Hyperlegible Next, system-ui, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 800
    lineHeight: 1.15
    letterSpacing: "-0.01em"
    fontVariation: "'wdth' 105"
  lede:
    fontFamily: "Atkinson Hyperlegible Next, system-ui, -apple-system, Segoe UI, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 400
    lineHeight: 1.55
  body:
    fontFamily: "Atkinson Hyperlegible Next, system-ui, -apple-system, Segoe UI, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.55
  label:
    fontFamily: "Atkinson Hyperlegible Next, system-ui, -apple-system, Segoe UI, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 700
    lineHeight: 1.3
  numeral:
    fontFamily: "Atkinson Hyperlegible Mono, ui-monospace, Cascadia Mono, monospace"
    fontSize: "0.8125rem"
    fontWeight: 700
    lineHeight: 1.2
    fontFeature: "tnum"
  numeral-clock:
    fontFamily: "Atkinson Hyperlegible Mono, ui-monospace, Cascadia Mono, monospace"
    fontSize: "clamp(2rem, 4vw, 2.75rem)"
    fontWeight: 700
    lineHeight: 1
    letterSpacing: "0.04em"
    fontFeature: "tnum"
rounded:
  s: "6px"
  m: "10px"
  l: "16px"
  pill: "999px"
spacing:
  xs: "8px"
  sm: "12px"
  md: "16px"
  lg: "20px"
  gutter: "clamp(16px, 4vw, 40px)"
  page-max: "1360px"
components:
  button:
    backgroundColor: "{colors.surface-raised}"
    textColor: "{colors.ink}"
    typography: "{typography.label}"
    rounded: "{rounded.m}"
    padding: "0.6em 1.15em"
    height: "44px"
  button-primary:
    backgroundColor: "{colors.cobalt}"
    textColor: "{colors.on-cobalt}"
    rounded: "{rounded.m}"
    padding: "0.6em 1.15em"
    height: "44px"
  button-primary-hover:
    backgroundColor: "{colors.cobalt-hover}"
  button-primary-large:
    backgroundColor: "{colors.cobalt}"
    textColor: "{colors.on-cobalt}"
    rounded: "{rounded.m}"
    padding: "0.75em 1.5em"
    height: "52px"
  button-quiet-hover:
    backgroundColor: "{colors.surface}"
  button-danger:
    backgroundColor: "{colors.danger}"
    textColor: "{colors.surface-raised}"
    rounded: "{rounded.m}"
    height: "44px"
  button-reveal:
    backgroundColor: "{colors.brass-light}"
    rounded: "{rounded.m}"
    height: "52px"
  icon-button:
    textColor: "{colors.ink}"
    rounded: "{rounded.m}"
    size: "44px"
  icon-button-hover:
    backgroundColor: "{colors.surface}"
  plaque:
    backgroundColor: "{colors.walnut-deep}"
    textColor: "{colors.brass-light}"
    typography: "{typography.numeral}"
    rounded: "{rounded.s}"
    padding: "0.35em 0.75em"
  nameplate:
    backgroundColor: "{colors.walnut-deep}"
    textColor: "{colors.brass-light}"
    padding: "0.22em 44px 0.26em"
  paper-tag:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.paper-ink}"
    rounded: "{rounded.m}"
    padding: "14px 16px 14px 48px"
  countdown:
    backgroundColor: "{colors.walnut-deep}"
    textColor: "{colors.brass-light}"
    typography: "{typography.numeral-clock}"
    rounded: "{rounded.m}"
    padding: "14px 18px 12px"
  dialog:
    backgroundColor: "{colors.surface-raised}"
    textColor: "{colors.ink}"
    rounded: "{rounded.l}"
    width: "min(560px, calc(100vw - 32px))"
  dialog-reveal:
    backgroundColor: "{colors.wall}"
    textColor: "{colors.reveal-ink}"
    typography: "{typography.display}"
    rounded: "{rounded.l}"
    width: "min(1040px, calc(100vw - 32px))"
  ledger-tile-box:
    backgroundColor: "{colors.wall}"
    rounded: "{rounded.m}"
    padding: "18px 18px 14%"
  input-search:
    backgroundColor: "{colors.surface-raised}"
    textColor: "{colors.ink}"
    rounded: "{rounded.m}"
    padding: "0 44px"
    height: "44px"
  switch-track:
    backgroundColor: "{colors.line-strong}"
    rounded: "{rounded.pill}"
    width: "44px"
    height: "26px"
  switch-track-on:
    backgroundColor: "{colors.cobalt}"
  toast:
    backgroundColor: "{colors.surface-raised}"
    textColor: "{colors.ink}"
    typography: "{typography.label}"
    padding: "12px 18px 12px 30px"
  nav-link:
    textColor: "{colors.ink-soft}"
    typography: "{typography.label}"
    rounded: "{rounded.m}"
    padding: "0 14px"
    height: "44px"
---

# Design System: Amiibo Finder

## Overview

**Creative North Star: "The Collector's Den"**

The collection is a room you fill. An isometric SVG den (bottle-green painted walls, oak parquet, walnut shelves with brass lips, a cobalt rug) is the hero of both routes, drawn at roughly 60% of the viewport width with owned figures standing on its shelves. Every piece of interface chrome borrows the room's materials: counters are walnut plates edged in brass, notices hang as paper tags with punched, brass-ringed holes, the page title is an engraved nameplate with two slotted screws. The gift is cobalt wrap with a brass ribbon, set on the rug as the primary button.

Day and night are the same room under different light. Day is a cool concrete-grey ground with daylight through the window; night is a dark slate ground with one warm floor lamp casting a pool of light (the lamp is the only glow in the system). Outside the room the page is quiet and legible: Atkinson Hyperlegible for everything you read, Anybody's variable width for the voice of headings, Atkinson Mono for anything that counts.

The collection ledger below the room is the operational part: familiar controls, a dense tile grid, scanability first. The one authored moment is the reveal: a native dialog that is itself a wall of the room, the figure under a brass spotlight, the name at poster scale, then "Put it on the shelf" flies the figure into its slot with a View Transition. The system rejects childish toy pastels, Nintendo trade dress, dark neon gamer styling and the sober admin dashboard.

**Key Characteristics:**
- An isometric room is the hero surface on both routes; figures live on its shelves.
- UI chrome is made of room materials: walnut, brass, paper, bottle-green, cobalt.
- Cobalt is the one action color; brass is ornament and trim.
- Anybody carries hierarchy through width (105 to 120) and heavy weight, not size alone.
- Numbers that count are set in Atkinson Mono with tabular figures.
- Soft, two-layer ambient shadows; no hard offsets, no neon glows.
- Motion is quick ease-out at rest; the reveal and the fly-to-shelf are the only choreographed sequence.

## Colors

A cool neutral page frames a warm, material palette (green paint, oak, walnut, brass, paper) with a single saturated cobalt for action. Every color is a CSS custom property on `:root`, redefined on `body.dark-mode`; frontmatter values are the day theme, night values are in the sidecar.

### Primary
- **Gift Cobalt** (`cobalt`): the only action color. Primary buttons, links, the focus ring, the switch's on state, the search caret and focus halo, the filters toggle when expanded, and in the room the rug. Night lifts it to a periwinkle (#8397ff) with dark ink on top (`on-cobalt` #0b1030) so filled buttons keep contrast.
- **Cobalt Pressed** (`cobalt-hover`): hover fill of primary buttons.
- **Cobalt Wash** (`cobalt-soft`): the pressed-in background of an expanded toggle button.
- **Wrap Cobalt** (`gift-wrap`): the gift box's lit face; the box is shaded with two deeper cobalts (#1c34a8 right face, #4a68f5 lid top) and the same hues appear in the confetti.

### Secondary
- **Ribbon Brass** (`brass`): trim everywhere. Shelf lips, plaque and nameplate borders, the active nav underline, the rug edge, the ribbon, punched-hole rings, the filter count badge, the clock rim.
- **Polished Brass** (`brass-light`): engraved text on walnut (plaques, nameplate, countdown), the favorite heart when pressed, the favorite tile's inner edge, the text selection, the ribbon's lit top, the reveal button fill.
- **Aged Brass** (`brass-deep`): shaded brass (shelf ends, screw slots, ribbon shade, countdown inset rim).

### Tertiary
- **Bottle Green** (`wall`, `wall-shade`): the room's painted walls, the ledger tile's back wall and the reveal dialog's wall. Never used as flat UI chrome outside those three.
- **Walnut** (`walnut`, `walnut-deep`): shelves and floor strips; `walnut-deep` is the plate every plaque, the nameplate and the countdown are cut from.
- **Oak Parquet** (`floor`, `floor-grain`, `floor-edge`): the room floor only.
- **Cream Trim** (`wall-trim`, `wall-cap`): wall caps, window frame, sill, lamp shade.
- **Paper Stock** (`paper`, `paper-ink`): the paper tag body and its own dark ink.
- **Sky** (`sky-top`, `sky-bottom`): the window gradient; night turns it to deep navy with a moon and stars.

### Neutral
- **Concrete Ground** (`ground`): the page background; night is dark slate (#0f1519). Also the color of every punched hole, so the hole reads as cut through to the page.
- **Surface** (`surface`) and **Raised Surface** (`surface-raised`): the filters panel, hover fills, dialogs, inputs, dropdowns, toasts.
- **Ink** (`ink`) and **Soft Ink** (`ink-soft`): text and secondary text (series names, ledes, labels at rest).
- **Line** (`line`) and **Strong Line** (`line-strong`): dividers and control borders; strong line is the default button and input border and the switch's off track.
- **Status** (`danger`, `danger-soft`, `success`): destructive actions, the clear-collection menu item, error and success toast icons.

### Named Rules
**The Room Materials Rule.** Interface chrome is built only from the room's materials: walnut, brass, paper, bottle green and cobalt, over the neutral ground. A new surface gets a material it already has, never a new hue.

**The Cobalt Acts Rule.** Cobalt means "you can press this". Brass is trim and engraving, never the fill of an action on the page. The one exception is the reveal dialog, where the wall is green and the action button becomes polished brass.

**The Lamp, Not Neon Rule.** Night is the same room lit by one warm floor lamp (a screen-blended pool driven by `--lamp-glow`). No cool, saturated or outer glows anywhere else.

## Typography

**Display Font:** Anybody (variable width 50 to 150, weight 100 to 900), falling back to Atkinson Hyperlegible Next
**Body Font:** Atkinson Hyperlegible Next (400, 700), falling back to system-ui
**Label/Mono Font:** Atkinson Hyperlegible Mono (400, 700), falling back to ui-monospace

**Character:** Anybody set wide and heavy gives headings a stamped, engraved presence that suits brass plates and gift labels; Atkinson Hyperlegible keeps reading effortless and matches the accessibility priority. The mono is the clock and counter voice.

### Hierarchy
- **Display** (850, clamp(3rem, 7.5vw, 6rem), 0.92, width 120): the figure's name in the reveal dialog. One per screen, only there.
- **Headline** (800, clamp(2.25rem, 4.6vw, 4rem), 1.05, width 112): the Unlock status headline, which changes with state ("Your delivery is here.").
- **Headline Section** (800, clamp(1.75rem, 3.2vw, 2.5rem), width 112): the ledger title and the collection nameplate (850 weight on walnut).
- **Title** (800, 1.0625rem, 1.15, width 105): figure names on ledger tiles; the dialog confirm title uses 1.75rem at width 110.
- **Lede** (400, 1.125rem, 1.55): panel and intro copy, capped at 34 to 38ch in soft ink.
- **Body** (400, 1rem, 1.55): default text; `text-wrap: pretty` on paragraphs, `balance` on headings.
- **Label** (700, 0.875rem): buttons (at 1rem), nav links, field labels, disclosure summaries, toast text.
- **Numeral** (Mono 700, 0.8125rem, tabular): plaques, ledger count, delivery time, filter badge; **Numeral Clock** (Mono 700, clamp(2rem, 4vw, 2.75rem), tracking 0.04em) is the countdown.

### Named Rules
**The Width Is the Voice Rule.** Anybody's hierarchy steps through width as much as size: 105 for tile names, 110 to 112 for headlines and nameplates, 120 for the brand name and the reveal name. Always 800 or heavier, always negative tracking.

**The Mono Counts Rule.** Any number that counts or ticks (figure tallies, series counts, countdowns, the wall clock) is Atkinson Mono with tabular figures, so digits never jitter.

## Layout

A single centered column capped at 1360px (`page-max`) with a fluid gutter (clamp(16px, 4vw, 40px)). Both routes open with the same two-column stage: the room on the left at `1.55fr` (max 820px wide, aspect 770 by 800) and a panel on the right at `1fr` (max 30 to 32rem), vertically centered, gap clamp(24px, 4vw, 56px). Below 880px the stage stacks, room first, and panel buttons stretch to fill.

The Collection route follows the stage with the ledger, separated by clamp(40px, 7vw, 88px) and opened by a 2px ink rule. The ledger grid is `auto-fill, minmax(176px, 1fr)` with tiles on a three-row subgrid so boxes, names and details align across a row; below 480px it is exactly two columns. Controls sit in a wrapping toolbar (search grows from 280px, filters panel fields from 200px).

The header is sticky (min 68px), translucent ground with blur; under 640px the nav wraps to its own full-width row with equal-width links. Spacing steps observed throughout: 8, 12, 16, 20px, with section spacing in clamps. Every interactive target is at least 44px tall.

## Elevation & Depth

Depth comes from the room's own geometry first: isometric faces lit by material shade (`wall` vs `wall-shade`, brightness filters on trim and edges), contact shadows under figures, and drop shadows on figure images. UI surfaces use a hybrid: flat plates for engraved elements (plaques, nameplate, countdown use `shadow-1` at most) and soft two-layer ambient shadows for anything floating.

### Shadow Vocabulary
- **Rest** (`--shadow-1`: `0 1px 2px rgb(20 25 31 / 0.10), 0 2px 6px rgb(20 25 31 / 0.08)`): tiles, plaques set on the page, switch thumb, detail tags.
- **Float** (`--shadow-2`: `0 6px 14px rgb(20 25 31 / 0.12), 0 18px 40px rgb(20 25 31 / 0.14)`): dialogs, dropdown menu, toasts. Night deepens both to black at higher alpha.
- **Cobalt Lift** (`0 2px 4px rgb(20 25 31 / 0.18), 0 8px 20px rgb(35 68 214 / 0.28)`): primary buttons only.
- **Tag Hang** (`drop-shadow(0 1px 1px rgb(0 0 0 / 0.16)) drop-shadow(0 6px 10px rgb(0 0 0 / 0.14))`): paper tags, as a filter so the chamfered silhouette casts the shadow.
- **Brass Inset** (`inset 0 0 0 1.5px` to `2.5px` brass): tile edges, countdown rim, punched-hole rings. Edges are drawn inside the shape, not with outer strokes.

### Named Rules
**The Soft Hang Rule.** Shadows are soft, blurred and stacked in two layers. No hard offset shadows.

## Shapes

Gently rounded rectangles on a three-step scale: 6px (`s`) for plaques, focus rings and small controls, 10px (`m`) for buttons, inputs, tiles and panels, 16px (`l`) for dialogs and empty states; pills (999px) for the switch, badge and scrollbar thumb. Two silhouettes are signatures of the world: the **luggage tag** (left end chamfered 22px by `clip-path`, right corners rounded 10px, a 13px brass-ringed hole in the chamfer) and the **punched hole** (a circle filled with `ground` and ringed in brass) that marks anything made of paper. Borders are 1.5px on controls and plaques, 3px on the nameplate. The isometric room follows a 30-degree projection (x and y axes at cos 30°, one unit = 100 viewBox px).

## Components

### Buttons
Solid, legible and tactile: a 1px press on `:active`, color changes on hover, no scale-ups.
- **Shape:** gently rounded (10px), 1.5px border, min height 44px (52px at the large size used on Unlock), padding 0.6em 1.15em, bold label, 1.15em inline SVG icon with 0.5em gap.
- **Default:** raised surface fill, strong-line border; hover darkens the border to ink.
- **Primary:** cobalt fill, white ink, Cobalt Lift shadow; hover to cobalt-hover.
- **Quiet:** transparent until hover, then surface fill with a line border. Used for secondary navigation actions ("Back to collection").
- **Danger:** danger fill, white ink by day, near-black ink by night.
- **Reveal:** inside the reveal dialog the primary button is polished brass with dark ink, hover #ffd887.
- **Toggle:** an expanded toggle (Filters) takes the cobalt wash with a cobalt border and shows a brass pill badge with the active filter count.

### Icon Buttons
44px square, transparent, 22px icons (react-icons Ionicons 5 outlines, rendered as inline SVG). Hover or `aria-expanded` gives a surface fill with a line border; an "on" state (notifications enabled) turns the icon cobalt.

### Plaque
A flat walnut plate edged in brass: 1.5px brass border, 6px radius, polished-brass mono text at 0.8125rem bold with tabular figures. Used in rows (8px gap) for tallies: "8 / 258 figures", "11 series", "5 favorites".

### Nameplate
The Collection page title as an engraved plate: walnut-deep with a 3px brass border (8px radius), Anybody 850 at width 112 in polished brass, never wrapping, with two slotted brass screws (14px circles, a diagonal brass-deep slot) inset 10px from each end.

### Countdown
The Unlock panel's clock plate: walnut-deep, 10px radius, a 2px aged-brass inset rim plus rest shadow, a small bold label and large mono digits. The wall clock in the room mirrors it: a brass rim, a cream face, a polished-brass sector for the time left, and a walnut plate beneath reading the time or "READY".

### Paper Tag
A luggage tag in paper stock (`paper`), chamfered left end, 13px brass-ringed punched hole, hung with a drop-shadow filter and set at a slight tilt (-0.6deg) when it is a notice. Paper stays paper in both themes, so the tag rescopes its own ink, surface and line variables to warm darks. Used for the Collection "Next delivery" notice with its action.

### Dialogs
Native `<dialog>` opened with `showModal()`, so focus trap, Escape and inert background come from the platform. 16px radius, raised surface, Float shadow, a 62% near-black backdrop with 3px blur, a 320ms rise-and-fade entry, a 44px icon close button top right. Body scroll locks while any dialog is open. The confirm dialog (460px) carries a 48px danger-wash circle icon, a 1.75rem title and right-aligned actions that stack full width under 480px.

### Reveal Dialog (signature)
The dialog becomes a wall of the room: a bottle-green gradient with a walnut floor strip along the bottom 20%, a 3px brass ring. Left, the figure rises (900ms settle) under a warm brass spotlight onto a soft plinth shadow; right, the name wipes in left to right at Display size in cream (`reveal-ink`), a walnut description plate with brass text, and the brass "Put it on the shelf" button. Focus rings inside switch to polished brass. Under 760px it stacks with the floor strip under the figure. On "Put it on the shelf" the figure (view-transition-name `arriving-figure`) flies to its shelf slot over 720ms (`cubic-bezier(0.5, 0, 0.2, 1)`) while the page cross-fades in 360ms, then lands with a 700ms settle bounce. With reduced motion, or without View Transitions support, the dialog simply closes and the figure appears. Confetti on unlock uses the room's colors (brass, cobalt wrap, bottle green, paper) and is skipped entirely under reduced motion.

### Gift Box
An isometric SVG box on the rug that is the primary button on Unlock. Ready: a 3.4s idle hop with a squash and a bow wiggle, paused and lifted 3% on hover or focus. Opening: the lid pops off (700ms) and pale gold rays rise from inside. Waiting: an empty spot on the rug outlined by a marching dashed brass ring.

### Ledger Tile
A small display box per figure: bottle-green back wall lit from above, a walnut floor strip in the bottom 16%, a 1.5px brass inset edge (2.5px polished brass when a favorite), the figure standing on the strip with a drop shadow and rising 4px on hover. A 40px round favorite button sits top right on a dark translucent disc and turns polished brass with a 420ms pop when pressed (`aria-pressed`). Below: the name (Title), the series (soft ink), then a Details disclosure whose content is a small raised card with a punched hole at the top.

### Inputs / Fields
44px tall, 1.5px strong-line border, 10px radius, raised surface. Hover darkens the border to soft ink; focus replaces the outline with a cobalt border and a 3px cobalt halo at 30%. Search has a leading 20px icon and a 36px clear button; selects draw their chevron with gradients. Field labels are bold 0.875rem above the control.

### Switch
44 by 26px pill track (strong line off, cobalt on) with a 20px white thumb on the rest shadow, sliding 18px on the settle curve. The native checkbox stays in the DOM visually hidden; its focus ring is drawn on the track.

### Navigation
Bold soft-ink links, 44px tall, 10px radius; hover gives ink and a surface fill; the active route turns ink with a 3px brass underline that scales in from the center. The brand is an isometric cobalt gift mark (34px) that tips -6deg on hover beside the Anybody wordmark at width 120. The user menu is a raised dropdown (230px min, Float shadow) with 44px items, a divider, and a danger-tinted clear item.

### Toast
A tag on a string at bottom center: raised surface, bold text, a punched hole on the left, a colored status icon (cobalt info, success, danger error), rising in with a slight -2deg swing on the settle curve and fading out after about 4s.

## Do's and Don'ts

### Do:
- **Do** take every new surface's material from the room: walnut plates edged in brass for counts, paper tags for notices, bottle green only for walls and display boxes.
- **Do** keep cobalt for actions and the 3px cobalt focus ring (3px offset); switch the ring to polished brass (#f0c768) on green or walnut surfaces.
- **Do** set every count and time in Atkinson Hyperlegible Mono with tabular figures.
- **Do** keep controls at least 44px tall and use native elements (`<dialog>`, `<details>`, checkbox inputs) for their built-in keyboard behavior.
- **Do** use `--ease-out` with 160ms for state changes and 320ms for entrances; reserve `--ease-settle` for things that land (figures, switch thumb, toasts, favorite pop).
- **Do** give every animation a reduced-motion path: the global 1ms override, no confetti, and a direct close instead of the fly-to-shelf.
- **Do** redefine a token on `body.dark-mode` instead of branching components by theme.

### Don't:
- **Don't** introduce hues outside the room's materials, or childish toy pastels.
- **Don't** use Nintendo logos or trade dress as the product's own branding; figure images come from the API.
- **Don't** add neon, cool or saturated glows; the night lamp is the only light source.
- **Don't** use hard offset shadows; shadows are soft and stacked.
- **Don't** add kicker or eyebrow labels above headings.
- **Don't** fill a page-level action with brass; brass is trim and engraving.
- **Don't** let paper tags follow the dark theme; paper stays paper stock with its own dark ink.
