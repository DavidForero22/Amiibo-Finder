import { useEffect, useRef } from "react";
import { IoTrashOutline } from "react-icons/io5";
import "../styles/modal-delete.css";

interface Props {
    /** How many figures would be lost; named in the warning. */
    count: number;
    onCancel: () => void;
    onConfirm: () => void;
}

/**
 * Confirmation for deleting the whole collection. Native modal <dialog> with the
 * alertdialog role; focus starts on the safe choice (Cancel).
 */
const DeleteModal = ({ count, onCancel, onConfirm }: Props) => {
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
            aria-labelledby="delete-title"
            aria-describedby="delete-desc"
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
                    <IoTrashOutline />
                </span>
                <h2 id="delete-title" className="confirm-title">
                    Empty every shelf?
                </h2>
                <p id="delete-desc" className="confirm-desc">
                    {count > 0
                        ? `All ${count} ${count === 1 ? "figure" : "figures"} will be removed from this browser. This can't be undone. Export your collection first if you want a backup.`
                        : "Your collection is already empty. Deleting will also clear any saved data in this browser."}
                </p>
                <div className="confirm-actions">
                    <button ref={cancelRef} type="button" className="btn" onClick={onCancel}>
                        Keep my collection
                    </button>
                    <button type="button" className="btn btn-danger" onClick={onConfirm}>
                        Delete collection
                    </button>
                </div>
            </div>
        </dialog>
    );
};

export default DeleteModal;
