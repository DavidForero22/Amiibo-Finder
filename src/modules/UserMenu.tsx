import { useState, useRef, useEffect } from "react";
import {
	IoEllipsisHorizontalCircleOutline,
	IoDownloadOutline,
	IoCloudUploadOutline,
	IoTrashOutline,
	IoPauseCircleOutline,
	IoCheckmark,
} from "react-icons/io5";
import { useTranslation } from "react-i18next";
import { useAmiibo } from "../context/AmiiboContext";
import { useToast } from "../context/ToastContext";
import { useMotion } from "../context/MotionContext";
import { useDropdown } from "./useDropdown";
import DeleteCollectionModal from "./DeleteModal";

const IMPORT_MESSAGES = {
	ok: { key: "userMenu.toast.imported", tone: "success" },
	invalid: { key: "userMenu.toast.importInvalid", tone: "error" },
	read: { key: "userMenu.toast.importRead", tone: "error" },
} as const;

/**
 * Collection data menu: export, import and delete.
 * Implements the ARIA menu button pattern (arrow keys, Home/End, Escape).
 */
const UserMenu = () => {
	const { t } = useTranslation();
	const { userAmiibos, exportCollection, importFromFile, clearStorage } = useAmiibo();
	const { showToast } = useToast();
	const { reduceMotion, toggleMotion } = useMotion();
	const {
		isOpen, isMounted, state, rootRef, buttonRef, menuRef,
		close, toggle, onButtonKeyDown, onMenuKeyDown,
	} = useDropdown();

	const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
	const fileInputRef = useRef<HTMLInputElement>(null);

	// Once the confirmation is gone, hand focus back to the menu button. Doing it
	// in the handlers is too early: the modal dialog still makes the page inert.
	const wasConfirming = useRef(false);
	useEffect(() => {
		if (showDeleteConfirm) {
			wasConfirming.current = true;
		} else if (wasConfirming.current) {
			wasConfirming.current = false;
			buttonRef.current?.focus();
		}
	}, [showDeleteConfirm, buttonRef]);

	const onExportClick = () => {
		if (userAmiibos.length === 0) {
			showToast(t("userMenu.toast.nothingToExport"), "error");
		} else if (exportCollection()) {
			showToast(t("userMenu.toast.exported"), "success");
		}
		close();
	};

	const onFileSelected = async (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		e.target.value = "";
		if (!file) return;

		const result = await importFromFile(file);
		const message = IMPORT_MESSAGES[result];
		showToast(t(message.key), message.tone);
	};

	const onConfirmDelete = () => {
		clearStorage();
		setShowDeleteConfirm(false);
		showToast(t("userMenu.toast.deleted"));
	};

	return (
		<div className="user-menu" ref={rootRef}>
			<button
				ref={buttonRef}
				type="button"
				className="icon-btn"
				onClick={toggle}
				onKeyDown={onButtonKeyDown}
				aria-label={t("userMenu.label")}
				title={t("userMenu.label")}
				aria-haspopup="menu"
				aria-expanded={isOpen}
				aria-controls={isMounted ? "user-dropdown" : undefined}
			>
				<IoEllipsisHorizontalCircleOutline aria-hidden="true" />
			</button>

			{isMounted && (
				<div
					ref={menuRef}
					id="user-dropdown"
					className="dropdown-menu"
					role="menu"
					aria-label={t("userMenu.label")}
					data-state={state}
					onKeyDown={onMenuKeyDown}
				>
					<button type="button" className="dropdown-item" role="menuitem" tabIndex={-1} onClick={onExportClick}>
						<IoDownloadOutline aria-hidden="true" />
						{t("userMenu.export")}
					</button>

					<button
						type="button"
						className="dropdown-item"
						role="menuitem"
						tabIndex={-1}
						onClick={() => {
							close();
							fileInputRef.current?.click();
						}}
					>
						<IoCloudUploadOutline aria-hidden="true" />
						{t("userMenu.import")}
					</button>

					<div className="dropdown-divider" role="separator" />

					{/* Stays open so the new state is visible */}
					<button
						type="button"
						className="dropdown-item"
						role="menuitemcheckbox"
						aria-checked={reduceMotion}
						tabIndex={-1}
						onClick={toggleMotion}
					>
						<IoPauseCircleOutline aria-hidden="true" />
						{t("userMenu.reduceMotion")}
						<IoCheckmark className="menu-check" aria-hidden="true" />
					</button>

					<div className="dropdown-divider" role="separator" />

					<button
						type="button"
						className="dropdown-item danger"
						role="menuitem"
						tabIndex={-1}
						onClick={() => {
							close(false);
							setShowDeleteConfirm(true);
						}}
					>
						<IoTrashOutline aria-hidden="true" />
						{t("userMenu.delete")}
					</button>
				</div>
			)}

			{/* Kept outside the menu so it survives the menu closing */}
			<input
				type="file"
				ref={fileInputRef}
				hidden
				accept=".json,application/json"
				onChange={onFileSelected}
				tabIndex={-1}
			/>

			{showDeleteConfirm && (
				<DeleteCollectionModal
					count={userAmiibos.length}
					onCancel={() => setShowDeleteConfirm(false)}
					onConfirm={onConfirmDelete}
				/>
			)}
		</div>
	);
};

export default UserMenu;
