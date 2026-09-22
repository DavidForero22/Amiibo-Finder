import React, { useEffect, useRef } from "react";
import { IoClose } from "react-icons/io5";
import type { Amiibo } from "../context/AmiiboContext";
import FigureImage from "./FigureImage";
import "../styles/modal-unlock.css";

interface Props {
    /** The figure just unlocked; the dialog is open while this is set. */
    amiibo: Amiibo | null;
    /** Closes the reveal and places the figure on the shelf. */
    onPlace: () => void;
}

/**
 * The reveal. A native modal <dialog> (focus containment, Escape and inert
 * background come from the platform) showing the new figure under a spotlight
 * with its name at poster scale. Every way of closing puts the figure on the shelf.
 */
const ModalUnlocked: React.FC<Props> = ({ amiibo, onPlace }) => {
    const dialogRef = useRef<HTMLDialogElement>(null);
    const placeBtnRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        const dialog = dialogRef.current;
        if (amiibo && dialog && !dialog.open) {
            dialog.showModal();
            placeBtnRef.current?.focus();
        }
    }, [amiibo]);

    if (!amiibo) return null;

    return (
        <dialog
            ref={dialogRef}
            className="dialog reveal"
            aria-labelledby="reveal-name"
            aria-describedby="reveal-desc"
            onCancel={(e) => {
                e.preventDefault();
                onPlace();
            }}
            onClick={(e) => {
                // Click on the backdrop (the dialog element itself) closes
                if (e.target === e.currentTarget) onPlace();
            }}
        >
            <button type="button" className="icon-btn dialog-close reveal-close" onClick={onPlace} aria-label="Close and put the figure on the shelf">
                <IoClose aria-hidden="true" />
            </button>

            <div className="reveal-stage" aria-hidden="true">
                <div className="reveal-spot" />
                <FigureImage
                    amiibo={amiibo}
                    alt=""
                    loading="eager"
                    className="reveal-figure"
                    style={{ viewTransitionName: "arriving-figure" }}
                />
                <div className="reveal-plinth" />
            </div>

            <div className="reveal-copy">
                <h2 id="reveal-name" className="reveal-name">
                    {amiibo.name}
                </h2>
                <p id="reveal-desc" className="reveal-desc">
                    {`From ${amiibo.gameSeries}, part of the ${amiibo.amiiboSeries} series. It's moving into your room.`}
                </p>
                <button ref={placeBtnRef} type="button" className="btn btn-primary btn-lg" onClick={onPlace}>
                    Put it on the shelf
                </button>
            </div>
        </dialog>
    );
};

export default ModalUnlocked;
