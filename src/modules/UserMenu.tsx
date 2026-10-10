import { useState, useRef, useEffect } from "react";
import {
	IoEllipsisHorizontalCircleOutline,
	IoDownloadOutline,
	IoCloudUploadOutline,
	IoTrashOutline,
	IoPauseCircleOutline,
	IoCheckmark,
	IoSwapHorizontalOutline,
} from "react-icons/io5";
import { useTranslation } from "react-i18next";
import { useAmiibo, type Amiibo } from "../context/AmiiboContext";
import { useToast } from "../context/ToastContext";
import { useMotion } from "../context/MotionContext";
import { useDropdown } from "./useDropdown";
import ConfirmModal from "./ConfirmModal";

const IMPORT_ERRORS = {
	invalid: "userMenu.toast.importInvalid",
	read: "userMenu.toast.importRead",
} as const;

/**
 * More-options menu: export, import, reduce animations and delete.
 * Implements the ARIA menu button pattern (arrow keys, Home/End, Escape).
 */
const UserMenu = () => {
	const { t } = useTranslation();
	const { userAmiibos, exportCollection, parseImportFile, replaceCollection, clearStorage } = useAmiibo();
	const { showToast } = useToast();
	const { reduceMotion, toggleMotion } = useMotion();
	const {
		isOpen, isMounted, state, rootRef, buttonRef, menuRef,
		close, toggle, onButtonKeyDown, onMenuKeyDown,
	} = useDropdown();

	const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
	// A validated export waiting for the user to confirm replacing the collection
	const [pendingImport, setPendingImport] = useState<Amiibo[] | null>(null);
	const fileInputRef = useRef<HTMLInputElement>(null);

	// Once the confirmation is gone, hand focus back to the menu button. Doing it
	// in the handlers is too early: the modal dialog still makes the page inert.
	const isConfirming = showDeleteConfirm || pendingImport !== null;
	const wasConfirming = useRef(false);
	useEffect(() => {
		if (isConfirming) {
			wasConfirming.current = true;
		} else if (wasConfirming.current) {
			wasConfirming.current = false;
			buttonRef.current?.focus();
		}
	}, [isConfirming, buttonRef]);

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

		const result = await parseImportFile(file);
		if (result.status !== "ok") {
			showToast(t(IMPORT_ERRORS[result.status]), "error");
		} else if (userAmiibos.length === 0) {
			replaceCollection(result.list);
			showToast(t("userMenu.toast.imported"), "success");
		} else {
			// Replacing a collection cannot be undone: ask first (WCAG 3.3.4)
			setPendingImport(result.list);
		}
	};

	const onConfirmImport = () => {
		if (pendingImport) replaceCollection(pendingImport);
		setPendingImport(null);
		showToast(t("userMenu.toast.imported"), "success");
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
				<ConfirmModal
					icon={<IoTrashOutline />}
					title={t("deleteModal.title")}
					desc={
						userAmiibos.length > 0
							? t("deleteModal.desc", { count: userAmiibos.length })
							: t("deleteModal.descEmpty")
					}
					cancelLabel={t("deleteModal.cancel")}
					confirmLabel={t("deleteModal.confirm")}
					onCancel={() => setShowDeleteConfirm(false)}
					onConfirm={onConfirmDelete}
				/>
			)}

			{pendingImport && (
				<ConfirmModal
					icon={<IoSwapHorizontalOutline />}
					title={t("importModal.title")}
					desc={t("importModal.desc", { current: userAmiibos.length, incoming: pendingImport.length })}
					cancelLabel={t("importModal.cancel")}
					confirmLabel={t("importModal.confirm")}
					onCancel={() => setPendingImport(null)}
					onConfirm={onConfirmImport}
				/>
			)}
		</div>
	);
};

export default UserMenu;
