import React, { createContext, useState, useContext, useCallback, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { IoCheckmarkCircle, IoAlertCircle, IoInformationCircle, IoClose } from "react-icons/io5";
import "../styles/toast.css";

export type ToastTone = "info" | "success" | "error";

interface ToastContextType {
    showToast: (message: string, tone?: ToastTone) => void;
}

interface Toast {
    id: number;
    message: string;
    tone: ToastTone;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

const ICONS = {
    info: IoInformationCircle,
    success: IoCheckmarkCircle,
    error: IoAlertCircle,
};

const MIN_DURATION = 4000;
const MS_PER_CHAR = 70;

/**
 * Global toast notifications, rendered as a paper tag at the foot of the screen.
 *
 * - Screen readers hear each message through a live region that stays mounted;
 *   the visible tag is hidden from them so nothing is read twice.
 * - Time is adjustable (WCAG 2.2.1): the timer pauses while the pointer or
 *   focus is on the tag, longer messages stay longer, errors stay until they
 *   are dismissed, and Escape or the close button dismisses any of them.
 */
export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { t } = useTranslation();
    const [toast, setToast] = useState<Toast | null>(null);
    const [paused, setPaused] = useState(false);

    const showToast = useCallback((message: string, tone: ToastTone = "info") => {
        setPaused(false);
        setToast({ id: Date.now(), message, tone });
    }, []);

    const dismiss = useCallback(() => {
        setPaused(false);
        setToast(null);
    }, []);

    // Auto-dismiss (not for errors); restarts whenever the pause ends
    useEffect(() => {
        if (!toast || paused || toast.tone === "error") return;
        const duration = Math.max(MIN_DURATION, toast.message.length * MS_PER_CHAR);
        const timer = setTimeout(dismiss, duration);
        return () => clearTimeout(timer);
    }, [toast, paused, dismiss]);

    // Escape dismisses, unless a menu or dialog already used the key
    useEffect(() => {
        if (!toast) return;
        const onKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape" && !event.defaultPrevented) dismiss();
        };
        document.addEventListener("keydown", onKeyDown);
        return () => document.removeEventListener("keydown", onKeyDown);
    }, [toast, dismiss]);

    const Icon = toast ? ICONS[toast.tone] : null;

    return (
        <ToastContext.Provider value={{ showToast }}>
            {children}

            <div className="visually-hidden" role="status" aria-live="polite" aria-atomic="true">
                {toast?.message}
            </div>

            <div className="toast-region">
                {toast && Icon && (
                    <div
                        key={toast.id}
                        className={`toast toast--${toast.tone}`}
                        data-paused={paused}
                        onMouseEnter={() => setPaused(true)}
                        onMouseLeave={() => setPaused(false)}
                        onFocus={() => setPaused(true)}
                        onBlur={() => setPaused(false)}
                    >
                        <Icon className="toast-icon" aria-hidden="true" />
                        <span aria-hidden="true">{toast.message}</span>
                        <button
                            type="button"
                            className="toast-close"
                            onClick={dismiss}
                            aria-label={`${t("common.dismiss")}: ${toast.message}`}
                        >
                            <IoClose aria-hidden="true" />
                        </button>
                    </div>
                )}
            </div>
        </ToastContext.Provider>
    );
};

export const useToast = () => {
    const context = useContext(ToastContext);
    if (!context) throw new Error("useToast must be used within a ToastProvider");
    return context;
};
