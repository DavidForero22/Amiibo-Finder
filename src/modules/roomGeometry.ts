import type { Amiibo } from "../context/AmiiboContext";

/* ---------------------------------------------------------------------------
 * Isometric geometry shared by the room and the gift box.
 * One room unit = S viewBox px. x runs along the right wall, y along the left
 * wall, z is height. The back corner of the room sits at the origin.
 * ------------------------------------------------------------------------ */
export const S = 100;
export const C = 0.866;
export const W = 4; // room width  (x)
export const D = 4; // room depth  (y)
export const H = 3; // wall height (z)
export const T = 0.16; // wall thickness

export const VB = { x: -385, y: -345, w: 770, h: 800 };

export const iso = (x: number, y: number, z: number): [number, number] => [
    (x - y) * C * S,
    (x + y) * 0.5 * S - z * S,
];

export const pts = (...p: [number, number, number][]) =>
    p.map(([x, y, z]) => iso(x, y, z).map((n) => n.toFixed(1)).join(",")).join(" ");

/** Percent position of an iso point inside the scene box (for HTML overlays). */
export const toPercent = (x: number, y: number, z: number) => {
    const [sx, sy] = iso(x, y, z);
    return {
        left: `${((sx - VB.x) / VB.w) * 100}%`,
        top: `${((sy - VB.y) / VB.h) * 100}%`,
    };
};

/* Shelves on the right wall, top to bottom */
export const SHELF_Z = [2.3, 1.6, 0.9];
export const SHELF_X0 = 0.3;
export const SHELF_X1 = 3.75;
export const SHELF_DEPTH = 0.42;
export const SHELF_THICK = 0.09;
export const SLOTS_PER_SHELF = 5;
export const SLOT_STEP = 0.7;
export const SHELF_CAPACITY = SHELF_Z.length * SLOTS_PER_SHELF;
export const FIGURE_WIDTH_PCT = (60 / VB.w) * 100;

/** Rug center, where the gift gets delivered. */
export const RUG = { x: 2.3, y: 2.3 };
export const RUG_ANCHOR = toPercent(RUG.x, RUG.y, 0);

/** Width of one room unit as a percentage of the scene width. */
export const ROOM_UNIT_PCT = (S / VB.w) * 100;

export const amiiboKey = (a: Amiibo) => a.head + a.tail;
