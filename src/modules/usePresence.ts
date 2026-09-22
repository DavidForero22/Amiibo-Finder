import { useEffect, useState } from "react";

/**
 * Keeps an element mounted for `exitMs` after `open` turns false, so its exit
 * animation can play. `state` is "open" while shown and "closing" on the way out;
 * CSS keys the enter and exit animations off it (`data-state`).
 */
export function usePresence(open: boolean, exitMs: number) {
    const [isMounted, setIsMounted] = useState(open);

    // Mount immediately on open (adjusting state during render, no extra paint)
    if (open && !isMounted) setIsMounted(true);

    useEffect(() => {
        if (open) return;
        const timer = setTimeout(() => setIsMounted(false), exitMs);
        return () => clearTimeout(timer);
    }, [open, exitMs]);

    return {
        isMounted: open || isMounted,
        state: open ? "open" : "closing",
    } as const;
}
