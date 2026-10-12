import React, { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { IoClose, IoHeart, IoHeartOutline } from "react-icons/io5";
import type { Amiibo } from "../context/AmiiboContext";
import FigureImage from "./FigureImage";
import "../styles/modal-unlock.css";

interface Props {
    /** The figure just unlocked; the dialog is open while this is set. */
    amiibo: Amiibo | null;
    /** Whether the figure gets a shelf slot (a favorite that fits) or just joins the collection. */
    goesOnShelf: boolean;
    /** Whether the figure is currently a favorite. */
    isFavorite: boolean;
    /** Toggles the favorite status of the figure without closing the reveal. */
    onToggleFavorite: () => void;
    /** Closes the reveal and places the figure on the shelf or in the collection. */
    onPlace: () => void;
    /** The "Aceptar" button: same as closing, then the caller moves on to the home page. */
    onAccept: () => void;
}

/**
 * The reveal. A native modal <dialog> (focus containment, Escape and inert
 * background come from the platform) showing the new figure under a spotlight
 * with its name at poster scale. The heart marks a favorite; "Aceptar" closes
 * the reveal. Every other way of closing places the figure.
 */
const ModalUnlocked: React.FC<Props> = ({ amiibo, goesOnShelf, isFavorite, onToggleFavorite, onPlace, onAccept }) => {
    const { t } = useTranslation();
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
            <button type="button" className="icon-btn dialog-close reveal-close" onClick={onPlace} aria-label={goesOnShelf ? t("reveal.close") : t("reveal.closeKeep")}>
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
                    {t("reveal.desc", { gameSeries: amiibo.gameSeries, amiiboSeries: amiibo.amiiboSeries })}
                </p>
                <div className="reveal-actions">
                    <button
                        type="button"
                        className="reveal-fav"
                        onClick={onToggleFavorite}
                        aria-pressed={isFavorite}
                        aria-label={t("reveal.favorite")}
                        title={isFavorite ? t("reveal.favoriteRemove") : t("reveal.favoriteAdd")}
                    >
                        {isFavorite ? <IoHeart aria-hidden="true" /> : <IoHeartOutline aria-hidden="true" />}
                    </button>
                    <button ref={placeBtnRef} type="button" className="btn btn-primary btn-lg" onClick={onAccept}>
                        {t("reveal.accept")}
                    </button>
                </div>
            </div>
        </dialog>
    );
};

export default ModalUnlocked;
