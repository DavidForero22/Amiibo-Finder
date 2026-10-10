import React, { createContext, useContext, useEffect, useState } from "react";

const STORAGE_KEY = "amiiboFinderMotion";
const OS_QUERY = "(prefers-reduced-motion: reduce)";

interface MotionContextType {
    /** True when animations are reduced (user choice, else the OS setting). */
    reduceMotion: boolean;
    toggleMotion: () => void;
}

const MotionContext = createContext<MotionContextType | undefined>(undefined);

/** The user's saved choice, or null when they have not made one. */
const readStored = (): boolean | null => {
    try {
        const value = localStorage.getItem(STORAGE_KEY);
        if (value === "reduce") return true;
        if (value === "full") return false;
    } catch {
        /* storage unavailable */
    }
    return null;
};

/**
 * Motion preference. Starts from the OS setting and lets the user override it
 * in the app. Mirrors the result on <html data-motion="reduce|full"> so the
 * CSS can calm every animation, including the infinite ones (WCAG 2.2.2).
 */
export const MotionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [stored, setStored] = useState<boolean | null>(readStored);
    const [osReduced, setOsReduced] = useState(() => window.matchMedia(OS_QUERY).matches);

    useEffect(() => {
        const query = window.matchMedia(OS_QUERY);
        const onChange = () => setOsReduced(query.matches);
        query.addEventListener("change", onChange);
        return () => query.removeEventListener("change", onChange);
    }, []);

    const reduceMotion = stored ?? osReduced;

    useEffect(() => {
        document.documentElement.dataset.motion = reduceMotion ? "reduce" : "full";
    }, [reduceMotion]);

    const toggleMotion = () => {
        const next = !reduceMotion;
        setStored(next);
        try {
            localStorage.setItem(STORAGE_KEY, next ? "reduce" : "full");
        } catch {
            /* storage unavailable: the choice lasts for this visit */
        }
    };

    return (
        <MotionContext.Provider value={{ reduceMotion, toggleMotion }}>
            {children}
        </MotionContext.Provider>
    );
};

export const useMotion = () => {
    const context = useContext(MotionContext);
    if (!context) throw new Error("useMotion must be used within a MotionProvider");
    return context;
};
