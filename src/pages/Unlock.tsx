import { useMemo, useState } from "react";
import { flushSync } from "react-dom";
import { Link } from "react-router-dom";
import { IoNotificationsOutline, IoRefresh, IoArrowForward } from "react-icons/io5";
import Room from "../modules/Room";
import { amiiboKey } from "../modules/roomGeometry";
import GiftBox, { type GiftState } from "../modules/GiftBox";
import ModalUnlocked from "../modules/ModalUnlocked";
import { useUnlockLogic } from "../logic/useUnlockLogic";
import { readCachedAmiiboList } from "../logic/utils";
import { useAmiibo } from "../context/AmiiboContext";
import { useNotifications } from "../modules/useNotifications";
import { useToast } from "../context/ToastContext";
import "../styles/unlock.css";

const ERROR_COPY = {
    network: {
        title: "The delivery couldn't reach you.",
        body: "Check your internet connection, then try again. Your two-hour wait hasn't started.",
    },
    server: {
        title: "The figure catalogue isn't answering.",
        body: "The Amiibo database is unavailable right now. Try again in a moment; your wait hasn't started.",
    },
    unknown: {
        title: "Something went wrong while unwrapping.",
        body: "Nothing was lost. Try opening the gift again.",
    },
} as const;

const prefersReducedMotion = () =>
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/**
 * Unlock page: the room with a delivery on the rug, and a status panel that
 * narrates the ritual (ready, unwrapping, waiting, error, complete).
 */
const Unlock = () => {
    const {
        unlockedAmiibo,
        isOpeningAnim,
        remainingTime,
        isLocked,
        isCollectionComplete,
        error,
        handleUnlock,
        retry,
        closeModal,
        formatTime,
    } = useUnlockLogic();
    const { userAmiibos } = useAmiibo();
    const { status: notifyStatus, request: requestNotifications } = useNotifications();
    const { showToast } = useToast();
    const [arrivingKey, setArrivingKey] = useState<string | null>(null);

    // Newest first, so a fresh figure lands on the top shelf
    const shelfFigures = useMemo(() => [...userAmiibos].reverse(), [userAmiibos]);
    const catalogTotal = useMemo(
        () => readCachedAmiiboList()?.length ?? null,
        // Re-read after each unlock: the first unlock is what fills the cache
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [userAmiibos.length]
    );
    const seriesCount = useMemo(
        () => new Set(userAmiibos.map((a) => a.gameSeries)).size,
        [userAmiibos]
    );

    let giftState: GiftState = "ready";
    if (isCollectionComplete) giftState = "hidden";
    else if (isOpeningAnim) giftState = "opening";
    else if (isLocked) giftState = "waiting";

    /** Close the reveal and fly the figure to its shelf slot. */
    const placeOnShelf = () => {
        if (!unlockedAmiibo) return;
        const key = amiiboKey(unlockedAmiibo);
        const finish = () => setTimeout(() => setArrivingKey(null), 900);

        if (!document.startViewTransition || prefersReducedMotion()) {
            closeModal();
            setArrivingKey(key);
            finish();
            return;
        }
        const transition = document.startViewTransition(() => {
            flushSync(() => {
                closeModal();
                setArrivingKey(key);
            });
        });
        transition.finished.finally(finish);
    };

    const onNotifyClick = async () => {
        const result = await requestNotifications();
        if (result === "granted") showToast("We'll let you know when the next gift arrives.", "success");
        else if (result === "denied") showToast("Notifications are blocked in your browser settings.", "error");
    };

    // ---------- Panel copy per state ----------
    let title: string;
    let body: string;
    if (isCollectionComplete) {
        title = "Every figure has a home.";
        body = `You've collected all ${catalogTotal ?? userAmiibos.length} figures. Nothing left to unwrap.`;
    } else if (error) {
        title = ERROR_COPY[error].title;
        body = ERROR_COPY[error].body;
    } else if (isOpeningAnim) {
        title = "Unwrapping…";
        body = "Careful with the ribbon.";
    } else if (isLocked) {
        title = "The next gift is on its way.";
        body = "A new delivery arrives every two hours. The clock on the wall keeps time.";
    } else {
        title = "Your delivery is here.";
        body = "A new figure is waiting inside the box. Open it to see who's moving in.";
    }

    return (
        <div className="stage">
            <div className="stage-room">
                <Room
                    figures={shelfFigures}
                    remainingTime={remainingTime}
                    hiddenKey={unlockedAmiibo ? amiiboKey(unlockedAmiibo) : null}
                    arrivingKey={arrivingKey}
                    shelfLabel="Figures on your shelves, newest first"
                    floorSlot={<GiftBox state={giftState} onOpen={handleUnlock} />}
                />
            </div>

            <section className="stage-panel" aria-labelledby="unlock-title">
                <h1 id="unlock-title" className="stage-title">{title}</h1>

                <p id="delivery-status" className="stage-body" role="status" aria-live="polite">
                    {body}
                </p>

                {giftState === "waiting" && !error && (
                    <div className="countdown">
                        <span className="countdown-label">Next delivery in</span>
                        <span className="countdown-digits" aria-hidden="true">
                            {formatTime(remainingTime)}
                        </span>
                        <span className="visually-hidden">
                            about {Math.ceil(remainingTime / 60000)} minutes
                        </span>
                    </div>
                )}

                <div className="stage-actions">
                    {error && (
                        <button type="button" className="btn btn-primary btn-lg" onClick={retry}>
                            <IoRefresh aria-hidden="true" />
                            Try again
                        </button>
                    )}

                    {!error && giftState === "ready" && (
                        <button type="button" className="btn btn-primary btn-lg" onClick={handleUnlock}>
                            Open the gift
                        </button>
                    )}

                    {!error && giftState === "opening" && (
                        <button type="button" className="btn btn-primary btn-lg" disabled aria-busy="true">
                            Opening…
                        </button>
                    )}

                    {giftState === "waiting" && notifyStatus === "default" && (
                        <button type="button" className="btn btn-lg" onClick={onNotifyClick}>
                            <IoNotificationsOutline aria-hidden="true" />
                            Notify me when it arrives
                        </button>
                    )}

                    {(giftState === "waiting" || giftState === "hidden") && userAmiibos.length > 0 && (
                        <Link to="/" className="btn btn-quiet btn-lg">
                            See your collection
                            <IoArrowForward aria-hidden="true" />
                        </Link>
                    )}
                </div>

                <p className="stage-tally">
                    <span className="plaque">
                        {userAmiibos.length}
                        {catalogTotal !== null && <> / {catalogTotal}</>} figures
                    </span>
                    <span className="plaque">
                        {seriesCount} series
                    </span>
                </p>
            </section>

            <ModalUnlocked amiibo={unlockedAmiibo} onPlace={placeOnShelf} />
        </div>
    );
};

export default Unlock;
