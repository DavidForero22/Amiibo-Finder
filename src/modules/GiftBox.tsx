import React from "react";
import { RUG_ANCHOR, ROOM_UNIT_PCT } from "./roomGeometry";

/* Isometric projection shared with the room (1 unit = 100 viewBox px) */
const C = 0.866;
const iso = (x: number, y: number, z: number) => [(x - y) * C * 100, (x + y) * 50 - z * 100];
const pts = (...p: [number, number, number][]) =>
    p.map(([x, y, z]) => iso(x, y, z).map((n) => n.toFixed(1)).join(",")).join(" ");

const B = 0.5; // box half-size
const H = 0.74; // box height
const L = 0.56; // lid half-size
const ZB = H - 0.04; // lid bottom
const ZT = H + 0.18; // lid top
const R = 0.075; // ribbon half-width

const VIEW = { x: -110, y: -215, w: 220, h: 275 };
const box = {
    left: RUG_ANCHOR.left,
    top: RUG_ANCHOR.top,
    width: `${(VIEW.w / 100) * ROOM_UNIT_PCT}%`,
    transform: `translate(-50%, ${(VIEW.y / VIEW.h) * 100}%)`,
};

export type GiftState = "ready" | "opening" | "waiting" | "hidden";

interface GiftBoxProps {
    state: GiftState;
    onOpen: () => void;
}

const GiftDrawing: React.FC = () => {
    const [tx, ty] = iso(0, 0, ZT);
    return (
        <svg viewBox={`${VIEW.x} ${VIEW.y} ${VIEW.w} ${VIEW.h}`} aria-hidden="true" focusable="false">
            <ellipse className="gift-shadow" cx="0" cy="4" rx="96" ry="44" />

            {/* Light escaping the box while it opens */}
            <g className="gift-rays">
                <polygon points={`${tx - 30},${ty + 20} ${tx - 95},${ty - 150} ${tx - 55},${ty - 165}`} />
                <polygon points={`${tx - 8},${ty + 16} ${tx - 18},${ty - 190} ${tx + 22},${ty - 190}`} />
                <polygon points={`${tx + 30},${ty + 20} ${tx + 60},${ty - 165} ${tx + 98},${ty - 148}`} />
            </g>

            {/* Body */}
            <polygon className="gift-face-left" points={pts([-B, B, 0], [B, B, 0], [B, B, H], [-B, B, H])} />
            <polygon className="gift-face-right" points={pts([B, -B, 0], [B, B, 0], [B, B, H], [B, -B, H])} />
            <polygon className="gift-ribbon" points={pts([-R, B, 0], [R, B, 0], [R, B, H], [-R, B, H])} />
            <polygon className="gift-ribbon gift-ribbon--shade" points={pts([B, -R, 0], [B, R, 0], [B, R, H], [B, -R, H])} />
            <polygon className="gift-inside" points={pts([-B, -B, H], [B, -B, H], [B, B, H], [-B, B, H])} />

            {/* Lid */}
            <g className="gift-lid">
                <polygon className="gift-face-left" points={pts([-L, L, ZB], [L, L, ZB], [L, L, ZT], [-L, L, ZT])} />
                <polygon className="gift-face-right" points={pts([L, -L, ZB], [L, L, ZB], [L, L, ZT], [L, -L, ZT])} />
                <polygon className="gift-face-top" points={pts([-L, -L, ZT], [L, -L, ZT], [L, L, ZT], [-L, L, ZT])} />
                <polygon className="gift-ribbon" points={pts([-R, L, ZB], [R, L, ZB], [R, L, ZT], [-R, L, ZT])} />
                <polygon className="gift-ribbon gift-ribbon--shade" points={pts([L, -R, ZB], [L, R, ZB], [L, R, ZT], [L, -R, ZT])} />
                <polygon className="gift-ribbon gift-ribbon--top" points={pts([-L, -R, ZT], [L, -R, ZT], [L, R, ZT], [-L, R, ZT])} />
                <polygon className="gift-ribbon gift-ribbon--top" points={pts([-R, -L, ZT], [R, -L, ZT], [R, L, ZT], [-R, L, ZT])} />
                <g className="gift-bow" transform={`translate(${tx} ${ty})`}>
                    <path d="M0 -6 C -34 -44, -58 -6, -30 4 C -18 8, -6 2, 0 -6 Z" />
                    <path d="M0 -6 C 34 -44, 58 -6, 30 4 C 18 8, 6 2, 0 -6 Z" />
                    <path className="gift-bow-tail" d="M-4 -2 L -20 26 L -10 24 L -4 30 Z" />
                    <path className="gift-bow-tail" d="M4 -2 L 22 24 L 12 23 L 6 30 Z" />
                    <ellipse className="gift-knot" cx="0" cy="-5" rx="9" ry="7" />
                </g>
            </g>
        </svg>
    );
};

/**
 * The mystery gift sitting on the rug. It is the page's primary action while a
 * delivery is ready; during the cooldown only the empty delivery spot remains.
 */
const GiftBox: React.FC<GiftBoxProps> = ({ state, onOpen }) => {
    if (state === "hidden") return null;

    if (state === "waiting") {
        return (
            <div className="gift-spot" style={box} aria-hidden="true">
                <svg viewBox={`${VIEW.x} ${VIEW.y} ${VIEW.w} ${VIEW.h}`}>
                    <polygon className="gift-spot-outline" points={pts([-B, -B, 0], [B, -B, 0], [B, B, 0], [-B, B, 0])} />
                </svg>
            </div>
        );
    }

    const isOpening = state === "opening";

    // A large pointer target only: the labelled "Open the gift" button in the
    // status panel is the keyboard and screen-reader control for the same action.
    return (
        <button
            type="button"
            className={`gift ${isOpening ? "is-opening" : "is-ready"}`}
            style={box}
            onClick={onOpen}
            disabled={isOpening}
            tabIndex={-1}
            aria-hidden="true"
        >
            <GiftDrawing />
        </button>
    );
};

export default GiftBox;
