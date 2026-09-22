import { useCallback, useSyncExternalStore } from "react";

export type NotificationStatus = "unsupported" | "default" | "granted" | "denied";

const listeners = new Set<() => void>();

const readStatus = (): NotificationStatus =>
    "Notification" in window ? Notification.permission : "unsupported";

const subscribe = (listener: () => void) => {
    listeners.add(listener);
    return () => listeners.delete(listener);
};

/**
 * UI-side wrapper around the browser Notification permission. A tiny shared
 * store keeps the header toggle and the unlock page prompt in sync.
 */
export const useNotifications = () => {
    const status = useSyncExternalStore(subscribe, readStatus);

    const request = useCallback(async (): Promise<NotificationStatus> => {
        if (!("Notification" in window)) return "unsupported";
        if (Notification.permission === "default") {
            await Notification.requestPermission();
        }
        listeners.forEach((l) => l());
        return readStatus();
    }, []);

    return { status, request };
};
