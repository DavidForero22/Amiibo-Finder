import { useMemo, useState } from "react";
import { flushSync } from "react-dom";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { IoNotificationsOutline, IoRefresh, IoArrowForward } from "react-icons/io5";
import Room from "../modules/Room";
import { amiiboKey, SHELF_CAPACITY } from "../modules/roomGeometry";
import GiftBox, { type GiftState } from "../modules/GiftBox";
import ModalUnlocked from "../modules/ModalUnlocked";
import { useUnlockLogic } from "../logic/useUnlockLogic";
import { readCachedAmiiboList } from "../logic/utils";
import { useAmiibo } from "../context/AmiiboContext";
import { useNotifications } from "../modules/useNotifications";
import { useToast } from "../context/ToastContext";
import "../styles/unlock.css";


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
    const { t } = useTranslation();
    const { userAmiibos } = useAmiibo();
    const { status: notifyStatus, request: requestNotifications } = useNotifications();
    const { showToast } = useToast();
    const [arrivingKey, setArrivingKey] = useState<string | null>(null);

    // Only favorites go on display, in the order they were unlocked
    const shelfFigures = useMemo(() => userAmiibos.filter((a) => a.isFavorite), [userAmiibos]);
    const catalogTotal = useMemo(
        () => readCachedAmiiboList()?.length ?? null,
        // Re-read after each unlock: the first unlock is what fills the cache
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [userAmiibos.length]
    );

    // A new figure only flies to the shelf if it has a slot there (a favorite that fits)
    const revealKey = unlockedAmiibo ? amiiboKey(unlockedAmiibo) : null;
    const goesOnShelf =
        revealKey !== null &&
        shelfFigures.slice(0, SHELF_CAPACITY).some((a) => amiiboKey(a) === revealKey);

    let giftState: GiftState = "ready";
    if (isCollectionComplete) giftState = "hidden";
    else if (isOpeningAnim) giftState = "opening";
    else if (isLocked) giftState = "waiting";

    /** Close the reveal and, if it has a slot, fly the figure to the shelf. */
    const placeOnShelf = () => {
        if (!revealKey) return;
        if (!goesOnShelf) {
            closeModal();
            return;
        }
        const key = revealKey;
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
        if (result === "granted") showToast(t("unlock.toast.notifyOn"), "success");
        else if (result === "denied") showToast(t("unlock.toast.notifyBlocked"), "error");
    };

    // ---------- Panel copy per state ----------
    let title: string;
    let body: string;
    if (isCollectionComplete) {
        title = t("unlock.complete.title");
        body = t("unlock.complete.body", { count: catalogTotal ?? userAmiibos.length });
    } else if (error) {
        title = t(`unlock.error.${error}.title`);
        body = t(`unlock.error.${error}.body`);
    } else if (isOpeningAnim) {
        title = t("unlock.opening.title");
        body = t("unlock.opening.body");
    } else if (isLocked) {
        title = t("unlock.waiting.title");
        body = t("unlock.waiting.body");
    } else {
        title = t("unlock.ready.title");
        body = t("unlock.ready.body");
    }

    return (
        <div className="stage">
            <div className="stage-room">
                <Room
                    figures={shelfFigures}
                    remainingTime={remainingTime}
                    hiddenKey={revealKey}
                    arrivingKey={arrivingKey}
                    shelfLabel={t("unlock.shelfLabel")}
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
                        <span className="countdown-label">{t("unlock.countdownLabel")}</span>
                        <span className="countdown-digits" aria-hidden="true">
                            {formatTime(remainingTime)}
                        </span>
                        <span className="visually-hidden">
                            {t("unlock.countdownSr", { count: Math.ceil(remainingTime / 60000) })}
                        </span>
                    </div>
                )}

                <div className="stage-actions">
                    {error && (
                        <button type="button" className="btn btn-primary btn-lg" onClick={retry}>
                            <IoRefresh aria-hidden="true" />
                            {t("unlock.actions.retry")}
                        </button>
                    )}

                    {!error && giftState === "ready" && (
                        <button type="button" className="btn btn-primary btn-lg" onClick={handleUnlock}>
                            {t("unlock.actions.open")}
                        </button>
                    )}

                    {!error && giftState === "opening" && (
                        <button type="button" className="btn btn-primary btn-lg" disabled aria-busy="true">
                            {t("unlock.actions.opening")}
                        </button>
                    )}

                    {giftState === "waiting" && notifyStatus === "default" && (
                        <button type="button" className="btn btn-lg" onClick={onNotifyClick}>
                            <IoNotificationsOutline aria-hidden="true" />
                            {t("unlock.actions.notify")}
                        </button>
                    )}

                    {(giftState === "waiting" || giftState === "hidden") && userAmiibos.length > 0 && (
                        <Link to="/" viewTransition className="btn btn-quiet btn-lg">
                            {t("unlock.actions.seeCollection")}
                            <IoArrowForward aria-hidden="true" />
                        </Link>
                    )}
                </div>
            </section>

            <ModalUnlocked amiibo={unlockedAmiibo} goesOnShelf={goesOnShelf} onPlace={placeOnShelf} />
        </div>
    );
};

export default Unlock;
