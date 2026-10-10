import { useEffect, useId, useRef } from "react";
import type { ReactNode } from "react";
import "../styles/modal-delete.css";

interface Props {
    title: string;
    desc: string;
    /** Decorative icon in the header badge. */
    icon: ReactNode;
    /** The safe choice; it also receives the initial focus. */
    cancelLabel: string;
    /** The destructive choice. */
    confirmLabel: string;
    onCancel: () => void;
    onConfirm: () => void;
}

/**
 * Confirmation before an action that cannot be undone (delete or replace the
 * collection; WCAG 3.3.4). Native modal <dialog> with the alertdialog role;
 * focus starts on the safe choice and Escape or a backdrop click cancels.
 */
const ConfirmModal = ({ title, desc, icon, cancelLabel, confirmLabel, onCancel, onConfirm }: Props) => {
    const titleId = useId();
    const descId = useId();
    const dialogRef = useRef<HTMLDialogElement>(null);
    const cancelRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        const dialog = dialogRef.current;
        if (dialog && !dialog.open) {
            dialog.showModal();
            cancelRef.current?.focus();
        }
    }, []);

    return (
        <dialog
            ref={dialogRef}
            className="dialog confirm"
            role="alertdialog"
            aria-labelledby={titleId}
            aria-describedby={descId}
            onCancel={(e) => {
                e.preventDefault();
                onCancel();
            }}
            onClick={(e) => {
                if (e.target === e.currentTarget) onCancel();
            }}
        >
            <div className="confirm-body">
                <span className="confirm-icon" aria-hidden="true">
                    {icon}
                </span>
                <h2 id={titleId} className="confirm-title">
                    {title}
                </h2>
                <p id={descId} className="confirm-desc">
                    {desc}
                </p>
                <div className="confirm-actions">
                    <button ref={cancelRef} type="button" className="btn" onClick={onCancel}>
                        {cancelLabel}
                    </button>
                    <button type="button" className="btn btn-danger" onClick={onConfirm}>
                        {confirmLabel}
                    </button>
                </div>
            </div>
        </dialog>
    );
};

export default ConfirmModal;
