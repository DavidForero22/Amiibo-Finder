import { useState, useEffect, useRef } from "react";
import {
	IoEllipsisHorizontalCircleOutline,
	IoDownloadOutline,
	IoCloudUploadOutline,
	IoTrashOutline,
} from "react-icons/io5";
import { useAmiibo } from "../context/AmiiboContext";
import { useToast } from "../context/ToastContext";
import DeleteCollectionModal from "./DeleteModal";

const IMPORT_MESSAGES = {
	ok: { text: "Collection imported. Your shelves are restocked.", tone: "success" },
	invalid: { text: "That file isn't an Amiibo Finder export. Choose a .json file saved from this site.", tone: "error" },
	read: { text: "The file couldn't be read. Try choosing it again.", tone: "error" },
} as const;

/**
 * Collection data menu: export, import and delete.
 * Implements the ARIA menu button pattern (arrow keys, Home/End, Escape).
 */
const UserMenu = () => {
	const { userAmiibos, exportCollection, importFromFile, clearStorage } = useAmiibo();
	const { showToast } = useToast();

	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

	const fileInputRef = useRef<HTMLInputElement>(null);
	const menuButtonRef = useRef<HTMLButtonElement>(null);
	const menuRef = useRef<HTMLDivElement>(null);

	const items = () =>
		Array.from(menuRef.current?.querySelectorAll<HTMLButtonElement>('[role="menuitem"]') ?? []);

	const closeMenu = (restoreFocus = true) => {
		setIsMenuOpen(false);
		if (restoreFocus) menuButtonRef.current?.focus();
	};

	// Focus the first item when the menu opens
	useEffect(() => {
		if (isMenuOpen) items()[0]?.focus();
	}, [isMenuOpen]);

	// Close on outside click
	useEffect(() => {
		if (!isMenuOpen) return;
		const onPointerDown = (event: PointerEvent) => {
			if (!(event.target as HTMLElement).closest(".user-menu")) setIsMenuOpen(false);
		};
		document.addEventListener("pointerdown", onPointerDown);
		return () => document.removeEventListener("pointerdown", onPointerDown);
	}, [isMenuOpen]);

	const onMenuKeyDown = (e: React.KeyboardEvent) => {
		const list = items();
		const index = list.indexOf(document.activeElement as HTMLButtonElement);
		switch (e.key) {
			case "ArrowDown":
				e.preventDefault();
				list[(index + 1) % list.length]?.focus();
				break;
			case "ArrowUp":
				e.preventDefault();
				list[(index - 1 + list.length) % list.length]?.focus();
				break;
			case "Home":
				e.preventDefault();
				list[0]?.focus();
				break;
			case "End":
				e.preventDefault();
				list[list.length - 1]?.focus();
				break;
			case "Escape":
				e.preventDefault();
				closeMenu();
				break;
			case "Tab":
				setIsMenuOpen(false);
				break;
		}
	};

	const onExportClick = () => {
		if (userAmiibos.length === 0) {
			showToast("Nothing to export yet. Unlock a figure first.", "error");
		} else if (exportCollection()) {
			showToast("Collection exported as a .json file.", "success");
		}
		closeMenu();
	};

	const onFileSelected = async (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		e.target.value = "";
		if (!file) return;

		const result = await importFromFile(file);
		const message = IMPORT_MESSAGES[result];
		showToast(message.text, message.tone);
	};

	const onConfirmDelete = () => {
		clearStorage();
		setShowDeleteConfirm(false);
		showToast("Collection deleted. Your shelves are empty.");
		menuButtonRef.current?.focus();
	};

	return (
		<div className="user-menu">
			<button
				ref={menuButtonRef}
				type="button"
				className="icon-btn"
				onClick={() => setIsMenuOpen((open) => !open)}
				onKeyDown={(e) => {
					if (e.key === "ArrowDown" && !isMenuOpen) {
						e.preventDefault();
						setIsMenuOpen(true);
					}
				}}
				aria-label="Collection data"
				title="Collection data"
				aria-haspopup="menu"
				aria-expanded={isMenuOpen}
				aria-controls={isMenuOpen ? "user-dropdown" : undefined}
			>
				<IoEllipsisHorizontalCircleOutline aria-hidden="true" />
			</button>

			{isMenuOpen && (
				<div
					ref={menuRef}
					id="user-dropdown"
					className="dropdown-menu"
					role="menu"
					aria-label="Collection data"
					onKeyDown={onMenuKeyDown}
				>
					<button type="button" className="dropdown-item" role="menuitem" tabIndex={-1} onClick={onExportClick}>
						<IoDownloadOutline aria-hidden="true" />
						Export collection
					</button>

					<button
						type="button"
						className="dropdown-item"
						role="menuitem"
						tabIndex={-1}
						onClick={() => {
							closeMenu();
							fileInputRef.current?.click();
						}}
					>
						<IoCloudUploadOutline aria-hidden="true" />
						Import collection
					</button>

					<div className="dropdown-divider" role="separator" />

					<button
						type="button"
						className="dropdown-item danger"
						role="menuitem"
						tabIndex={-1}
						onClick={() => {
							setIsMenuOpen(false);
							setShowDeleteConfirm(true);
						}}
					>
						<IoTrashOutline aria-hidden="true" />
						Delete collection
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
					onCancel={() => {
						setShowDeleteConfirm(false);
						menuButtonRef.current?.focus();
					}}
					onConfirm={onConfirmDelete}
				/>
			)}
		</div>
	);
};

export default UserMenu;
