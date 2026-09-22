# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Two audiences, weighted equally:

- **Nintendo fans / casual collectors** who return to the site every couple of hours to open their next gift and grow their Amiibo collection, then browse, filter, and favorite what they own.
- **Portfolio evaluators** (recruiters, clients, other developers) judging the author's frontend craft: interaction quality, motion, accessibility, and code structure.

The product must work as a genuinely engaging little game first; the craft is what the evaluators see.

## Product Purpose

Amiibo Finder simulates the thrill of collecting. Users cannot browse the whole Amiibo catalogue; they earn figures one at a time by opening a mystery gift, then manage the collection they have built. Success means the unlock moment feels rewarding enough to come back for, and the collection feels like something the user owns and is proud of.

## Positioning

Not a catalogue or database viewer: a gacha-style ritual around real Amiibo data. Scarcity (one gift per 2-hour cooldown) plus a celebratory reveal turn a public API into a personal collection.

## Operating Context

- Two routes: `/` Collection (the user's owned Amiibos) and `/unlock` (the gift box).
- Loop: open gift → reveal modal with confetti → wait out the 2-hour cooldown (browser notification when ready) → browse the collection.
- Collection tools: search by name, filter by game series, favorites-only toggle, sort (newest, oldest, name A–Z/Z–A, series, favorites first), favorite toggle per figure.
- User menu: theme toggle, export collection to JSON, import from JSON, clear collection (with confirmation modal).
- Everything persists in localStorage; there are no accounts or backend.
- Visitors arrive on desktop and mobile browsers.

## Capabilities and Constraints

- Stack: React 19 + TypeScript, Vite, React Router 7, vanilla CSS, react-icons, react-confetti. Deployed on Vercel.
- Data: community AmiiboAPI fork (`amiiboapi.org/api/amiibo/?type=figure`, 258 figures), cached locally. Every figure has `image`, `imgwebp`, and `gameSeries`; regional `release` dates may be null. Collections saved before the API switch lack `imgwebp`, so `image` is the fallback.
- Data layer (AmiiboContext, FilterContext, `src/logic/*`, API modules) is owned by a separate workstream; UI consumes its contract: `useUnlockLogic` exposes `error: 'network' | 'server' | 'unknown' | null`, `retry()`, `isCollectionComplete`; `importFromFile` returns `'ok' | 'invalid' | 'read'`.
- UI language: English source copy; Spanish and French translations via react-i18next are in progress on a separate workstream (`i18n` branch). Layouts must tolerate ~30% longer strings.
- Must preserve through any redesign: the mystery gift box metaphor, the real-time 2-hour cooldown with notifications, persistent light/dark theme, and confetti on unlock.

## Brand Commitments

- Name: **Amiibo Finder**.
- Fan-made project, not affiliated with or endorsed by Nintendo. Nintendo logos and trade dress must not be used as the product's own branding; Amiibo figure images come from the API.
- MIT licensed; footer carries the license and disclaimer.

## Evidence on Hand

- Figure imagery and metadata from the API (real, 258 figures).
- `src/assets/gift-closed.png`, `src/assets/gift-open.png`: current gift box art.
- `src/assets/docs/unlock-showcase.gif`, `src/assets/docs/collection-showcase.gif`: README demos of the current UI.
- No user counts, testimonials, or metrics exist; do not invent any.

## Product Principles

1. **The reveal is the product.** The unlock moment gets the most care; everything else supports returning to it.
2. **Your collection, not a catalogue.** Only owned figures are shown; ownership should feel personal and accumulated.
3. **Waiting is part of the game.** The cooldown should read as anticipation, never as an error or a blocker.
4. **Craft is visible.** Motion, states, and details are good enough to be judged by professionals.
5. **Honest states.** Loading, network failure, empty, and complete collections each get a clear, recoverable state.

## Accessibility & Inclusion

Accessibility is an explicit priority for this project. Target WCAG 2.2 AA (assumed standard; not formally specified): full keyboard operation including the gift box and modals, visible focus, sufficient contrast in both themes, and all motion (gift animation, confetti) respecting `prefers-reduced-motion`.
