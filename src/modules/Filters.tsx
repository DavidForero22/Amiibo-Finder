import React from "react";
import { useTranslation } from "react-i18next";
import { IoSearch, IoOptionsOutline, IoCloseCircle } from "react-icons/io5";
import type { FilterState } from "../context/FilterContext";
import { usePresence } from "./usePresence";
import "../styles/filters.css";

interface Props {
    isOpen: boolean;
    onToggle: () => void;
    filters: FilterState;
    setFilters: (filters: FilterState) => void;
    availableSeries: string[];
    onReset: () => void;
}

const SORT_OPTIONS: FilterState["sortBy"][] = [
    "date_new",
    "date_old",
    "name_asc",
    "name_desc",
    "series",
    "favorites_first",
];

/**
 * Ledger toolbar: an always-visible search field plus a disclosure with
 * series, sort order and a favorites-only switch.
 */
const Filters: React.FC<Props> = ({
    isOpen,
    onToggle,
    filters,
    setFilters,
    availableSeries,
    onReset,
}) => {
    const { t } = useTranslation();
    // Matches the panel-close animation in filters.css
    const panel = usePresence(isOpen, 220);
    const activeCount =
        (filters.series ? 1 : 0) +
        (filters.sortBy !== "date_new" ? 1 : 0) +
        (filters.showFavoritesOnly ? 1 : 0);
    const isDirty = activeCount > 0 || filters.name !== "";

    return (
        <div className="filters">
            <div className="filters-bar">
                <div className="search-field">
                    <label htmlFor="filter-name" className="visually-hidden">
                        {t("filters.searchLabel")}
                    </label>
                    <IoSearch className="search-icon" aria-hidden="true" />
                    <input
                        id="filter-name"
                        type="search"
                        placeholder={t("filters.searchPlaceholder")}
                        autoComplete="off"
                        value={filters.name}
                        onChange={(e) => setFilters({ ...filters, name: e.target.value })}
                    />
                    {filters.name && (
                        <button
                            type="button"
                            className="search-clear"
                            onClick={() => setFilters({ ...filters, name: "" })}
                            aria-label={t("filters.clearSearch")}
                        >
                            <IoCloseCircle aria-hidden="true" />
                        </button>
                    )}
                </div>

                <button
                    type="button"
                    className="btn filters-toggle"
                    onClick={onToggle}
                    aria-expanded={isOpen}
                    aria-controls="filter-panel"
                >
                    <IoOptionsOutline aria-hidden="true" />
                    {t("filters.toggle")}
                    {activeCount > 0 && (
                        <span className="filters-badge">
                            <span aria-hidden="true">{activeCount}</span>
                            <span className="visually-hidden">{t("filters.activeSr", { count: activeCount })}</span>
                        </span>
                    )}
                </button>

                {isDirty && (
                    <button type="button" className="btn btn-quiet" onClick={onReset}>
                        {t("filters.reset")}
                    </button>
                )}
            </div>

            <div
                id="filter-panel"
                className="filters-panel-wrap"
                data-state={panel.state}
                hidden={!panel.isMounted}
            >
                {/* The clip lets the panel fold its height in and out */}
                <div className="filters-panel-clip">
                    <div className="filters-panel">
                        <div className="field">
                            <label htmlFor="filter-series">{t("filters.series")}</label>
                            <select
                                id="filter-series"
                                value={filters.series}
                                onChange={(e) => setFilters({ ...filters, series: e.target.value })}
                            >
                                <option value="">{t("filters.allSeries")}</option>
                                {availableSeries.map((series) => (
                                    <option key={series} value={series}>
                                        {series}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="field">
                            <label htmlFor="filter-sort">{t("filters.sortBy")}</label>
                            <select
                                id="filter-sort"
                                value={filters.sortBy}
                                onChange={(e) =>
                                    setFilters({ ...filters, sortBy: e.target.value as FilterState["sortBy"] })
                                }
                            >
                                {SORT_OPTIONS.map((value) => (
                                    <option key={value} value={value}>
                                        {t(`filters.sort.${value}`)}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <label className="switch" htmlFor="filter-favorites">
                            <input
                                id="filter-favorites"
                                type="checkbox"
                                role="switch"
                                checked={filters.showFavoritesOnly}
                                onChange={(e) => setFilters({ ...filters, showFavoritesOnly: e.target.checked })}
                            />
                            <span className="switch-track" aria-hidden="true" />
                            {t("filters.favoritesOnly")}
                        </label>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Filters;
