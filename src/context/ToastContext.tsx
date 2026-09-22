import React, { createContext, useState, useContext, useCallback, useRef } from "react";
import { IoCheckmarkCircle, IoAlertCircle, IoInformationCircle } from "react-icons/io5";
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

const DURATION = 4000;

/**
 * Global toast notifications, rendered as a paper tag at the foot of the screen.
 * The live region stays mounted so screen readers announce every message.
 */
export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [toast, setToast] = useState<Toast | null>(null);
    const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

    const showToast = useCallback((message: string, tone: ToastTone = "info") => {
        if (timer.current) clearTimeout(timer.current);
        setToast({ id: Date.now(), message, tone });
        timer.current = setTimeout(() => setToast(null), DURATION);
    }, []);

    const Icon = toast ? ICONS[toast.tone] : null;

    return (
        <ToastContext.Provider value={{ showToast }}>
            {children}

            <div className="toast-region" role="status" aria-live="polite" aria-atomic="true">
                {toast && Icon && (
                    <div key={toast.id} className={`toast toast--${toast.tone}`}>
                        <Icon className="toast-icon" aria-hidden="true" />
                        <span>{toast.message}</span>
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
