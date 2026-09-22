import { useMemo } from "react";
import { Link } from "react-router-dom";
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
                        shelfLabel="On display: favorites first, then newest"
                    />
                </div>

                <section className="collection-intro" aria-labelledby="collection-title">
                    <h1 id="collection-title" className="collection-title">
                        My Collection
                    </h1>

                    <p className="collection-lede">
                        {isEmpty
                            ? "Your shelves are empty. Your first figure is waiting in the gift box."
                            : "Favorites get the best spots on the shelves. Everything you own is listed in the ledger below."}
                    </p>

                    {!isEmpty && (
                        <p className="collection-tally">
                            <span className="plaque">
                                {owned}
                                {catalogTotal !== null && <> / {catalogTotal}</>} figures
                            </span>
                            <span className="plaque">{seriesCount} series</span>
                            <span className="plaque">{favoritesCount} favorites</span>
                        </p>
                    )}

                    {owned > SHELF_CAPACITY && (
                        <p className="collection-note">
                            {`${SHELF_CAPACITY} of your ${owned} figures fit on the shelves. Mark favorites to choose who's on display.`}
                        </p>
                    )}

                    {!isCollectionComplete && (
                        <div className={`paper-tag delivery-tag ${isLocked ? "" : "is-ready"}`}>
                            {isLocked ? (
                                <>
                                    <p className="delivery-tag-text">
                                        Next delivery in{" "}
                                        <span className="delivery-tag-time">{formatTime(remainingTime)}</span>
                                    </p>
                                    <Link to="/unlock" className="btn btn-quiet">
                                        Go to Unlock
                                        <IoArrowForward aria-hidden="true" />
                                    </Link>
                                </>
                            ) : (
                                <>
                                    <p className="delivery-tag-text">A gift is waiting for you.</p>
                                    <Link to="/unlock" className="btn btn-primary">
                                        {isEmpty ? "Open your first gift" : "Open it"}
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
                            Every figure you own
                        </h2>
                        <p className="ledger-count" role="status">
                            {filteredAmiibos.length === owned
                                ? `${owned} ${owned === 1 ? "figure" : "figures"}`
                                : `Showing ${filteredAmiibos.length} of ${owned}`}
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
                            <p className="ledger-empty-title">No figures match these filters.</p>
                            <p>Try another name or series, or turn off Favorites only.</p>
                            <button type="button" className="btn" onClick={resetFilters}>
                                Reset filters
                            </button>
                        </div>
                    )}
                </section>
            )}
        </div>
    );
};

export default Collection;
