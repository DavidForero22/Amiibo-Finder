import { useMemo } from "react";
import { Link } from "react-router-dom";
import { Trans, useTranslation } from "react-i18next";
import { IoArrowForward } from "react-icons/io5";
import { useAmiibo } from "../context/AmiiboContext";
import { useFilter } from "../context/FilterContext";
import { useFilteredCollection } from "../logic/useFilteredCollection";
import { useUnlockLogic } from "../logic/useUnlockLogic";
import { readCachedAmiiboList } from "../logic/utils";
import Room from "../modules/Room";
import { SHELF_CAPACITY } from "../modules/roomGeometry";
import AmiiboList from "../modules/AmiiboList";
import Filters from "../modules/Filters";
import "../styles/collection.css";

/**
 * Collection page: the room with your best figures on display, then the
 * ledger of everything you own with search, filters and sorting.
 */
const Collection = () => {
    const { t } = useTranslation();
    const { userAmiibos } = useAmiibo();
    const { filters, setFilters, resetFilters, isFilterPanelOpen, toggleFilterPanel } = useFilter();
    const { filteredAmiibos, uniqueSeries } = useFilteredCollection(userAmiibos, filters);
    const { remainingTime, isLocked, isCollectionComplete, formatTime } = useUnlockLogic();

    // Favorites get the shelves first, then the newest arrivals
    const displayFigures = useMemo(() => {
        const newestFirst = [...userAmiibos].reverse();
        return [
            ...newestFirst.filter((a) => a.isFavorite),
            ...newestFirst.filter((a) => !a.isFavorite),
        ];
    }, [userAmiibos]);

    const catalogTotal = useMemo(() => readCachedAmiiboList()?.length ?? null, []);
    const favoritesCount = userAmiibos.filter((a) => a.isFavorite).length;
    const seriesCount = uniqueSeries.length;
    const owned = userAmiibos.length;
    const isEmpty = owned === 0;

    return (
        <div className="collection">
            <div className="collection-top">
                <div className="collection-room">
                    <Room
                        figures={displayFigures}
                        remainingTime={remainingTime}
                        shelfLabel={t("collection.shelfLabel")}
                    />
                </div>

                <section className="collection-intro" aria-labelledby="collection-title">
                    <h1 id="collection-title" className="collection-title">
                        {t("collection.title")}
                    </h1>

                    <p className="collection-lede">
                        {isEmpty
                            ? t("collection.lede.empty")
                            : t("collection.lede.filled")}
                    </p>

                    {!isEmpty && (
                        <p className="collection-tally">
                            <span className="plaque">
                                {catalogTotal !== null
                                    ? t("tally.figuresOf", { count: owned, total: catalogTotal })
                                    : t("tally.figures", { count: owned })}
                            </span>
                            <span className="plaque">{t("tally.series", { count: seriesCount })}</span>
                            <span className="plaque">{t("tally.favorites", { count: favoritesCount })}</span>
                        </p>
                    )}

                    {owned > SHELF_CAPACITY && (
                        <p className="collection-note">
                            {t("collection.shelfNote", { capacity: SHELF_CAPACITY, owned })}
                        </p>
                    )}

                    {!isCollectionComplete && (
                        <div className={`delivery-tag ${isLocked ? "" : "is-ready"}`}>
                            {isLocked ? (
                                <>
                                    <p className="delivery-tag-text">
                                        <Trans
                                            i18nKey="collection.delivery.nextIn"
                                            values={{ time: formatTime(remainingTime) }}
                                            components={{ time: <span className="delivery-tag-time" /> }}
                                        />
                                    </p>
                                    <Link to="/unlock" className="btn btn-quiet">
                                        {t("collection.delivery.goToUnlock")}
                                        <IoArrowForward aria-hidden="true" />
                                    </Link>
                                </>
                            ) : (
                                <>
                                    <p className="delivery-tag-text">{t("collection.delivery.waiting")}</p>
                                    <Link to="/unlock" className="btn btn-primary">
                                        {isEmpty ? t("collection.delivery.openFirst") : t("collection.delivery.openIt")}
                                        <IoArrowForward aria-hidden="true" />
                                    </Link>
                                </>
                            )}
                        </div>
                    )}
                </section>
            </div>

            {!isEmpty && (
                <section className="ledger" aria-labelledby="ledger-title">
                    <div className="ledger-head">
                        <h2 id="ledger-title" className="ledger-title">
                            {t("collection.ledger.title")}
                        </h2>
                        <p className="ledger-count" role="status">
                            {filteredAmiibos.length === owned
                                ? t("collection.ledger.countAll", { count: owned })
                                : t("collection.ledger.countFiltered", { shown: filteredAmiibos.length, total: owned })}
                        </p>
                    </div>

                    <Filters
                        isOpen={isFilterPanelOpen}
                        onToggle={toggleFilterPanel}
                        filters={filters}
                        setFilters={setFilters}
                        availableSeries={uniqueSeries}
                        onReset={resetFilters}
                    />

                    {filteredAmiibos.length > 0 ? (
                        <AmiiboList amiibos={filteredAmiibos} labelledBy="ledger-title" />
                    ) : (
                        <div className="ledger-empty">
                            <p className="ledger-empty-title">{t("collection.ledger.noMatchTitle")}</p>
                            <p>{t("collection.ledger.noMatchBody")}</p>
                            <button type="button" className="btn" onClick={resetFilters}>
                                {t("collection.ledger.resetFilters")}
                            </button>
                        </div>
                    )}
                </section>
            )}
        </div>
    );
};

export default Collection;
