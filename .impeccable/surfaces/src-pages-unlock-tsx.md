---
version: 1
slug: "src-pages-unlock-tsx"
primary_target: "src/pages/Unlock.tsx"
related_targets: ["src/pages/Collection.tsx","src/layouts/BaseLayout.tsx"]
---

## Scope

Whole app shell: `/unlock` (gift ritual) and `/` (collection), plus header, footer, dialogs, toasts. Mode: Experience for the room and reveal; the Ledger (collection list) behaves as Operate: scanability and familiar controls win there.

## Audience & job

Nintendo fans returning every ~2h to open a gift and admire a growing shelf; portfolio reviewers judging craft. Success = the ritual: wait, open, watch the figure join the room.

## Constraints

Keep gift box, 2h cooldown + notifications, light/dark, confetti. English copy. Avoid: childish/toy pastel, Nintendo trade dress, dark neon gamer, sober dashboard.

## Direction contract

THESIS: The collection is a room you fill. It refuses the category default of a loot-box banner over a card grid; figures stand on shelves in a lived-in isometric den.

OWN-WORLD: SVG isometric collector's den. Bottle-green painted walls, oak parquet, walnut shelves with brass lips, cobalt gift wrap with brass ribbon. Day: cool concrete-grey ground, daylight window. Night: lamp-lit room, dark slate ground, warm lamp pool (no neon). UI = brass-edged plaques and paper tags with punched holes. Type: Anybody (variable-width display), Atkinson Hyperlegible Next (body), Atkinson Hyperlegible Mono (clock digits).

STORY: Visitor sees their shelves, learns a delivery arrives every two hours, opens the gift, and watches the figure take its place on the shelf.

FIRST VIEWPORT: Unlock: room at hero scale (~60% width) with the gift box on the rug as the primary button and a wall clock carrying the countdown; right column: nameplate headline plus counter plaques (Figures n/total, Next delivery, Series). Collection: same room, shelves stocked with favorites then newest; the Ledger below with search, series, sort and favorites controls.

FORM: minihompy room (challenger cyworld-minihompy-room, user-chosen alternate), seed key 699203f5. Signature interaction: reveal dialog sets the name at poster scale, then "Put it on the shelf" flies the figure into its slot (View Transitions, soft settle); reduced motion cross-fades.

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance

## Unresolved

Catalog total comes from the cached catalog (null until first fetch); favorites are keyed by `head` in the data layer (owned by the API workstream).
