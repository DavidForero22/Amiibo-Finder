import React from "react";
import { IoSearch, IoOptionsOutline, IoCloseCircle } from "react-icons/io5";
import type { FilterState } from "../context/FilterContext";
import "../styles/filters.css";

interface Props {
    isOpen: boolean;
    onToggle: () => void;
    filters: FilterState;
    setFilters: (filters: FilterState) => void;
    availableSeries: string[];
    onReset: () => void;
}

const SORT_OPTIONS: { value: FilterState["sortBy"]; label: string }[] = [
    { value: "date_new", label: "Newest first" },
    { value: "date_old", label: "Oldest first" },
    { value: "name_asc", label: "Name, A to Z" },
    { value: "name_desc", label: "Name, Z to A" },
    { value: "series", label: "Game series" },
    { value: "favorites_first", label: "Favorites first" },
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
                        Search your figures by name
                    </label>
                    <IoSearch className="search-icon" aria-hidden="true" />
                    <input
                        id="filter-name"
                        type="search"
                        placeholder="Search by name: Mario, Link…"
                        autoComplete="off"
                        value={filters.name}
                        onChange={(e) => setFilters({ ...filters, name: e.target.value })}
                    />
                    {filters.name && (
                        <button
                            type="button"
                            className="search-clear"
                            onClick={() => setFilters({ ...filters, name: "" })}
                            aria-label="Clear search"
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
                    Filters
                    {activeCount > 0 && (
                        <span className="filters-badge">
                            {activeCount}
                            <span className="visually-hidden"> active</span>
                        </span>
                    )}
                </button>

                {isDirty && (
                    <button type="button" className="btn btn-quiet" onClick={onReset}>
                        Reset
                    </button>
                )}
            </div>

            <div id="filter-panel" className="filters-panel" hidden={!isOpen}>
                <div className="field">
                    <label htmlFor="filter-series">Game series</label>
                    <select
                        id="filter-series"
                        value={filters.series}
                        onChange={(e) => setFilters({ ...filters, series: e.target.value })}
                    >
                        <option value="">All series</option>
                        {availableSeries.map((series) => (
                            <option key={series} value={series}>
                                {series}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="field">
                    <label htmlFor="filter-sort">Sort by</label>
                    <select
                        id="filter-sort"
                        value={filters.sortBy}
                        onChange={(e) =>
                            setFilters({ ...filters, sortBy: e.target.value as FilterState["sortBy"] })
                        }
                    >
                        {SORT_OPTIONS.map((o) => (
                            <option key={o.value} value={o.value}>
                                {o.label}
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
                    Favorites only
                </label>
            </div>
        </div>
    );
};

export default Filters;
