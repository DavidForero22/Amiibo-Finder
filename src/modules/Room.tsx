import React from "react";
import { useTranslation } from "react-i18next";
import type { Amiibo } from "../context/AmiiboContext";
import FigureImage from "./FigureImage";
import "../styles/room.css";

import {
    C, D, H, T, W, VB, iso, pts, toPercent,
    SHELF_Z, SHELF_X0, SHELF_X1, SHELF_DEPTH, SHELF_THICK,
    SLOTS_PER_SHELF, SLOT_STEP, SHELF_CAPACITY, FIGURE_WIDTH_PCT, RUG, amiiboKey,
} from "./roomGeometry";

const COOLDOWN = 2 * 60 * 60 * 1000;

interface RoomProps {
    /** Figures to stand on the shelves, in display order. Extra ones are ignored. */
    figures: Amiibo[];
    /** Remaining cooldown in ms; drives the wall clock. */
    remainingTime: number;
    /** A figure kept off the shelf (e.g. while its reveal dialog is open). */
    hiddenKey?: string | null;
    /** The figure that is flying in; receives the shared view-transition name. */
    arrivingKey?: string | null;
    /** Content placed on the rug (the gift box). */
    floorSlot?: React.ReactNode;
    /** Visible caption for the shelf list, read by assistive tech. */
    shelfLabel: string;
    className?: string;
}

/** Clock arc path for the remaining fraction of the cooldown (12 o'clock, clockwise). */
const clockArc = (cx: number, cy: number, r: number, fraction: number) => {
    if (fraction <= 0) return "";
    if (fraction >= 0.9999) {
        return `M ${cx} ${cy - r} A ${r} ${r} 0 1 1 ${cx - 0.01} ${cy - r} Z`;
    }
    const angle = fraction * Math.PI * 2;
    const ex = cx + r * Math.sin(angle);
    const ey = cy - r * Math.cos(angle);
    const large = fraction > 0.5 ? 1 : 0;
    return `M ${cx} ${cy} L ${cx} ${cy - r} A ${r} ${r} 0 ${large} 1 ${ex.toFixed(2)} ${ey.toFixed(2)} Z`;
};

const pad = (n: number) => n.toString().padStart(2, "0");

/* The hover hop is class-driven so it plays to the end once the cursor leaves */
const startHop = (e: React.MouseEvent<HTMLLIElement>) => e.currentTarget.classList.add("is-hopping");
const endHop = (e: React.AnimationEvent<HTMLLIElement>) => {
    if (e.animationName === "figure-hop") e.currentTarget.classList.remove("is-hopping");
};

/**
 * The collector's room: an isometric scene whose right-wall shelves display the
 * user's figures and whose wall clock shows the time until the next delivery.
 * The drawing is decorative (aria-hidden); the figures are exposed as a list.
 */
const Room: React.FC<RoomProps> = ({
    figures,
    remainingTime,
    hiddenKey = null,
    arrivingKey = null,
    floorSlot,
    shelfLabel,
    className = "",
}) => {
    const { t } = useTranslation();
    const onShelf = figures.slice(0, SHELF_CAPACITY);
    const fraction = Math.min(1, Math.max(0, remainingTime / COOLDOWN));
    const totalMinutes = Math.ceil(remainingTime / 60000);
    const clockText = remainingTime > 0
        ? `${pad(Math.floor(totalMinutes / 60))}:${pad(totalMinutes % 60)}`
        : t("room.clockReady");

    // Plank seams across the floor
    const planks = Array.from({ length: 9 }, (_, i) => 0.4 * (i + 1));

    return (
        <figure className={`room ${className}`}>
            <svg
                className="room-drawing"
                viewBox={`${VB.x} ${VB.y} ${VB.w} ${VB.h}`}
                aria-hidden="true"
                focusable="false"
            >
                <defs>
                    <linearGradient id="room-sky" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0" className="r-sky-top" />
                        <stop offset="1" className="r-sky-bottom" />
                    </linearGradient>
                    <radialGradient id="room-lamp-pool" cx="0.5" cy="0.5" r="0.5">
                        <stop offset="0" stopColor="#ffc978" stopOpacity="0.55" />
                        <stop offset="0.55" stopColor="#ffb347" stopOpacity="0.16" />
                        <stop offset="1" stopColor="#ffb347" stopOpacity="0" />
                    </radialGradient>
                    {/* Lamp light stays inside the room: left wall + floor */}
                    <clipPath id="room-interior">
                        <polygon points={pts([0, 0, 0], [0, D, 0], [0, D, H], [0, 0, H])} />
                        <polygon points={pts([0, 0, 0], [W, 0, 0], [W, D, 0], [0, D, 0])} />
                    </clipPath>
                    {/* The window glass, in the left wall's flat (pre-shear) coordinates */}
                    <clipPath id="room-window">
                        <rect x="100" y="-244" width="130" height="126" />
                    </clipPath>
                </defs>

                {/* ---------- Floor slab ---------- */}
                <polygon className="r-floor-edge" points={pts([W, -T, 0], [W, D, 0], [W, D, -0.28], [W, -T, -0.28])} />
                <polygon className="r-floor-edge r-floor-edge--dark" points={pts([-T, D, 0], [W, D, 0], [W, D, -0.28], [-T, D, -0.28])} />
                <polygon className="r-floor" points={pts([0, 0, 0], [W, 0, 0], [W, D, 0], [0, D, 0])} />
                {planks.map((k) => (
                    <line key={k} className="r-plank" x1={iso(0, k, 0)[0]} y1={iso(0, k, 0)[1]} x2={iso(W, k, 0)[0]} y2={iso(W, k, 0)[1]} />
                ))}
                {planks.map((k, i) => {
                    const x = ((i * 1.37) % 3.2) + 0.4;
                    const [ax, ay] = iso(x, k - 0.4, 0);
                    const [bx, by] = iso(x, k, 0);
                    return <line key={`s${k}`} className="r-plank" x1={ax} y1={ay} x2={bx} y2={by} />;
                })}

                {/* ---------- Left wall (x = 0) ---------- */}
                <polygon className="r-wall-shade" points={pts([0, 0, 0], [0, D, 0], [0, D, H], [0, 0, H])} />
                <polygon className="r-trim" points={pts([0, 0, 0], [0, D, 0], [0, D, 0.14], [0, 0, 0.14])} />
                <polygon className="r-cap" points={pts([-T, -T, H], [-T, D, H], [0, D, H], [0, 0, H])} />
                <polygon className="r-wall-end" points={pts([-T, D, 0], [0, D, 0], [0, D, H], [-T, D, H])} />

                {/* Things hung on the left wall, drawn flat and sheared onto the plane */}
                <g transform={`matrix(${C},-0.5,0,1,${iso(0, D, 0).join(",")})`}>
                    {/* Window */}
                    <rect className="r-window-frame" x="92" y="-252" width="146" height="142" rx="4" />
                    <rect x="100" y="-244" width="130" height="126" fill="url(#room-sky)" />
                    {/* Sun and moon swap by sliding through the pane, clipped to the glass */}
                    <g clipPath="url(#room-window)">
                        <g className="r-day">
                            <circle className="r-sun" cx="198" cy="-214" r="13" />
                            <path className="r-cloud" d="M118 -172 q6 -14 20 -10 q8 -12 22 -4 q14 -2 14 12 z" />
                        </g>
                        <g className="r-night">
                            <path className="r-moon" d="M204 -226 a14 14 0 1 0 12 20 a11 11 0 1 1 -12 -20 z" />
                            <circle className="r-star" cx="126" cy="-226" r="1.6" />
                            <circle className="r-star" cx="150" cy="-200" r="1.2" />
                            <circle className="r-star" cx="176" cy="-232" r="1.4" />
                            <circle className="r-star" cx="132" cy="-150" r="1.1" />
                            <circle className="r-star" cx="214" cy="-160" r="1.3" />
                        </g>
                    </g>
                    <rect className="r-window-frame" x="162" y="-244" width="6" height="126" />
                    <rect className="r-window-frame" x="100" y="-184" width="130" height="6" />
                    <rect className="r-sill" x="84" y="-114" width="162" height="10" rx="2" />

                    {/* Wall clock: the brass sector is the time left until the next gift */}
                    <circle className="r-clock-rim" cx="318" cy="-212" r="44" />
                    <circle className="r-clock-face" cx="318" cy="-212" r="37" />
                    <path className="r-clock-arc" d={clockArc(318, -212, 33, fraction)} />
                    {Array.from({ length: 12 }, (_, i) => {
                        const a = (i / 12) * Math.PI * 2;
                        const r1 = i % 3 === 0 ? 27 : 30;
                        return (
                            <line
                                key={i}
                                className="r-clock-tick"
                                x1={318 + r1 * Math.sin(a)}
                                y1={-212 - r1 * Math.cos(a)}
                                x2={318 + 35 * Math.sin(a)}
                                y2={-212 - 35 * Math.cos(a)}
                            />
                        );
                    })}
                    <circle className="r-clock-pin" cx="318" cy="-212" r="3.5" />
                    <rect className="r-clock-plate" x="284" y="-156" width="68" height="22" rx="3" />
                    <text className="r-clock-text" x="318" y="-140" textAnchor="middle">{clockText}</text>
                </g>

                {/* Lamp light pooling on wall and floor at night */}
                <g className="r-lamp-light" clipPath="url(#room-interior)">
                    <ellipse cx={iso(0, 3.25, 1.7)[0]} cy={iso(0, 3.25, 1.7)[1]} rx="150" ry="170" fill="url(#room-lamp-pool)" />
                    <ellipse cx={iso(0.9, 3.2, 0)[0]} cy={iso(0.9, 3.2, 0)[1]} rx="190" ry="110" fill="url(#room-lamp-pool)" />
                </g>

                {/* ---------- Right wall (y = 0) ---------- */}
                <polygon className="r-wall" points={pts([0, 0, 0], [W, 0, 0], [W, 0, H], [0, 0, H])} />
                <polygon className="r-trim r-trim--lit" points={pts([0, 0, 0], [W, 0, 0], [W, 0, 0.14], [0, 0, 0.14])} />
                <polygon className="r-cap" points={pts([-T, -T, H], [W, -T, H], [W, 0, H], [0, 0, H])} />
                <polygon className="r-wall-end r-wall-end--lit" points={pts([W, -T, 0], [W, 0, 0], [W, 0, H], [W, -T, H])} />
                <line className="r-corner" x1="0" y1="0" x2={iso(0, 0, H)[0]} y2={iso(0, 0, H)[1]} />

                {/* Shelves */}
                {SHELF_Z.map((z) => (
                    <g key={z}>
                        <polygon className="r-shelf-shadow" points={pts([SHELF_X0, 0, z - SHELF_THICK], [SHELF_X1, 0, z - SHELF_THICK], [SHELF_X1, 0, z - 0.3], [SHELF_X0, 0, z - 0.3])} />
                        <polygon className="r-shelf-top" points={pts([SHELF_X0, 0, z], [SHELF_X1, 0, z], [SHELF_X1, SHELF_DEPTH, z], [SHELF_X0, SHELF_DEPTH, z])} />
                        <polygon className="r-shelf-lip" points={pts([SHELF_X0, SHELF_DEPTH, z], [SHELF_X1, SHELF_DEPTH, z], [SHELF_X1, SHELF_DEPTH, z - SHELF_THICK], [SHELF_X0, SHELF_DEPTH, z - SHELF_THICK])} />
                        <polygon className="r-shelf-end" points={pts([SHELF_X1, 0, z], [SHELF_X1, SHELF_DEPTH, z], [SHELF_X1, SHELF_DEPTH, z - SHELF_THICK], [SHELF_X1, 0, z - SHELF_THICK])} />
                    </g>
                ))}

                {/* ---------- Floor furniture ---------- */}
                {/* Rug */}
                <ellipse className="r-rug-edge" cx={iso(RUG.x, RUG.y, 0)[0]} cy={iso(RUG.x, RUG.y, 0)[1]} rx="160" ry="92" />
                <ellipse className="r-rug" cx={iso(RUG.x, RUG.y, 0)[0]} cy={iso(RUG.x, RUG.y, 0)[1]} rx="146" ry="84" />
                <ellipse className="r-rug-ring" cx={iso(RUG.x, RUG.y, 0)[0]} cy={iso(RUG.x, RUG.y, 0)[1]} rx="118" ry="68" />

                {/* Floor lamp, front left */}
                <g className="r-lamp">
                    <ellipse className="r-lamp-base" cx={iso(0.55, 3.35, 0)[0]} cy={iso(0.55, 3.35, 0)[1]} rx="22" ry="12" />
                    <line className="r-lamp-pole" x1={iso(0.55, 3.35, 0)[0]} y1={iso(0.55, 3.35, 0)[1]} x2={iso(0.55, 3.35, 2.05)[0]} y2={iso(0.55, 3.35, 2.05)[1]} />
                    <polygon
                        className="r-lamp-shade"
                        points={(() => {
                            const [cx, cy] = iso(0.55, 3.35, 2.05);
                            return `${cx - 38},${cy + 6} ${cx + 38},${cy + 6} ${cx + 24},${cy - 44} ${cx - 24},${cy - 44}`;
                        })()}
                    />
                    <ellipse className="r-lamp-bulb" cx={iso(0.55, 3.35, 2.05)[0]} cy={iso(0.55, 3.35, 2.05)[1] + 6} rx="38" ry="7" />
                </g>

                {/* Potted plant, front right */}
                <g className="r-plant">
                    {(() => {
                        const [px, py] = iso(3.7, 1.7, 0);
                        return (
                            <>
                                <path className="r-pot" d={`M${px - 22} ${py - 44} L${px + 22} ${py - 44} L${px + 16} ${py} Q${px} ${py + 8} ${px - 16} ${py} Z`} />
                                <ellipse className="r-pot-rim" cx={px} cy={py - 44} rx="22" ry="7" />
                                <path className="r-leaf" d={`M${px} ${py - 46} C${px - 40} ${py - 70} ${px - 46} ${py - 118} ${px - 30} ${py - 140} C${px - 14} ${py - 110} ${px - 6} ${py - 80} ${px} ${py - 46} Z`} />
                                <path className="r-leaf r-leaf--light" d={`M${px} ${py - 46} C${px + 8} ${py - 96} ${px + 30} ${py - 132} ${px + 50} ${py - 138} C${px + 44} ${py - 104} ${px + 26} ${py - 70} ${px} ${py - 46} Z`} />
                                <path className="r-leaf" d={`M${px} ${py - 46} C${px - 4} ${py - 100} ${px + 4} ${py - 150} ${px + 10} ${py - 172} C${px + 20} ${py - 132} ${px + 12} ${py - 88} ${px} ${py - 46} Z`} />
                            </>
                        );
                    })()}
                </g>
            </svg>

            {/* Figures on the shelves (real content, exposed to assistive tech) */}
            <ul className="room-shelf" aria-label={shelfLabel}>
                {onShelf.map((amiibo, i) => {
                    const shelf = Math.floor(i / SLOTS_PER_SHELF);
                    const slot = i % SLOTS_PER_SHELF;
                    const x = SHELF_X0 + 0.42 + slot * SLOT_STEP;
                    const key = amiiboKey(amiibo);
                    const pos = toPercent(x, SHELF_DEPTH * 0.55, SHELF_Z[shelf]);
                    const isHidden = key === hiddenKey;
                    const isArriving = key === arrivingKey;
                    return (
                        <li
                            key={key}
                            className={`room-figure ${isHidden ? "is-hidden" : ""} ${isArriving ? "is-arriving" : ""}`}
                            style={{ ...pos, width: `${FIGURE_WIDTH_PCT}%` }}
                            onMouseEnter={startHop}
                            onAnimationEnd={endHop}
                        >
                            <FigureImage
                                amiibo={amiibo}
                                alt={amiibo.name}
                                style={isArriving ? { viewTransitionName: "arriving-figure" } : undefined}
                            />
                        </li>
                    );
                })}
            </ul>

            {floorSlot}
        </figure>
    );
};

export default Room;
