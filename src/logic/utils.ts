import type { Amiibo } from "../context/AmiiboContext";

const API_URL = "https://amiiboapi.org/api/amiibo/?type=figure";
const CACHE_KEY = "amiiboFinderCatalog.v2";
const LEGACY_CACHE_KEY = "amiiboFinderFullList";
const CACHE_TTL = 24 * 60 * 60 * 1000;

export type ApiErrorCode = "network" | "server" | "unknown";

export class ApiError extends Error {
    code: ApiErrorCode;

    constructor(code: ApiErrorCode, message: string) {
        super(message);
        this.name = "ApiError";
        this.code = code;
    }
}

interface CatalogCache {
    savedAt: number;
    list: Amiibo[];
}

const isAmiibo = (value: unknown): value is Amiibo => {
    if (typeof value !== "object" || value === null) return false;
    const a = value as Record<string, unknown>;
    return (
        typeof a.head === "string" &&
        typeof a.tail === "string" &&
        typeof a.name === "string" &&
        typeof a.image === "string" &&
        typeof a.gameSeries === "string"
    );
};

export const isAmiiboList = (value: unknown): value is Amiibo[] =>
    Array.isArray(value) && value.every(isAmiibo);

/**
 * Returns the cached catalog if present and fresh, without touching the network.
 */
export const readCachedAmiiboList = (): Amiibo[] | null => {
    localStorage.removeItem(LEGACY_CACHE_KEY);
    try {
        const raw = localStorage.getItem(CACHE_KEY);
        if (!raw) return null;
        const cache = JSON.parse(raw) as CatalogCache;
        if (Date.now() - cache.savedAt > CACHE_TTL || !isAmiiboList(cache.list)) {
            return null;
        }
        return cache.list;
    } catch {
        return null;
    }
};

/**
 * Fetches the full figure catalog, using a 24h LocalStorage cache.
 * @throws {ApiError} with code "network" (offline / fetch failed) or "server" (bad status / unexpected payload).
 */
export const getFullAmiiboList = async (): Promise<Amiibo[]> => {
    const cached = readCachedAmiiboList();
    if (cached) return cached;

    let res: Response;
    try {
        res = await fetch(API_URL);
    } catch (error) {
        throw new ApiError("network", String(error));
    }

    if (!res.ok) {
        throw new ApiError("server", `HTTP ${res.status}`);
    }

    let json: unknown;
    try {
        json = await res.json();
    } catch (error) {
        throw new ApiError("server", `Invalid JSON: ${String(error)}`);
    }

    const list = (json as { amiibo?: unknown })?.amiibo;
    if (!isAmiiboList(list)) {
        throw new ApiError("server", "Unexpected response shape");
    }

    try {
        const cache: CatalogCache = { savedAt: Date.now(), list };
        localStorage.setItem(CACHE_KEY, JSON.stringify(cache));
    } catch {
        // Cache is best-effort; quota errors must not break the unlock.
    }
    return list;
};

/**
 * Preloads an image into the browser cache so the modal renders without flicker.
 * Always resolves, even if the image fails to load.
 */
export const preloadImage = (src: string) => {
    return new Promise((resolve) => {
        const img = new Image();
        img.src = src;
        img.onload = resolve;
        img.onerror = resolve;
    });
};

/**
 * Formats a duration in milliseconds as "HH:MM:SS".
 */
export const formatTime = (ms: number) => {
    const totalSeconds = Math.floor(ms / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return `${hours.toString().padStart(2, "0")}:${minutes
        .toString()
        .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
};

/**
 * Triggers a native browser notification if the user has granted permission.
 */
export const triggerBrowserNotification = () => {
    if ("Notification" in window && Notification.permission === "granted") {
        new Notification("Amiibo Finder", {
            body: "🎁 Your gift is ready! Click to unlock a new Amiibo.",
            icon: "/favicon.ico",
        });
    }
};
