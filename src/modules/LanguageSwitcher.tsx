import { useTranslation } from "react-i18next";
import { IoChevronDown, IoCheckmark } from "react-icons/io5";
import { LANGUAGE_NAMES, SUPPORTED_LANGUAGES, type Language } from "../i18n";
import { useDropdown } from "./useDropdown";
import "../styles/language-switcher.css";

/**
 * Compact language picker for the header. The face shows only the language
 * code (EN/ES/FR); it opens a radio menu with each language named in itself
 * (each item carries its own `lang`). Same keyboard model as the data menu.
 */
const LanguageSwitcher = () => {
	const { t, i18n } = useTranslation();
	const current = (i18n.resolvedLanguage ?? "en") as Language;
	const {
		isOpen, isMounted, state, rootRef, buttonRef, menuRef,
		close, toggle, onButtonKeyDown, onMenuKeyDown,
	} = useDropdown();

	const choose = (lng: Language) => {
		if (lng !== current) i18n.changeLanguage(lng);
		close();
	};

	return (
		<div className="lang-switcher" ref={rootRef}>
			<button
				ref={buttonRef}
				type="button"
				className="lang-face"
				onClick={toggle}
				onKeyDown={onButtonKeyDown}
				aria-label={`${t("language.label")}: ${LANGUAGE_NAMES[current]}`}
				title={t("language.changeTo")}
				aria-haspopup="menu"
				aria-expanded={isOpen}
				aria-controls={isMounted ? "lang-menu" : undefined}
			>
				<span aria-hidden="true">{current.toUpperCase()}</span>
				<IoChevronDown className="lang-chevron" aria-hidden="true" />
			</button>

			{isMounted && (
				<div
					ref={menuRef}
					id="lang-menu"
					className="dropdown-menu lang-menu"
					role="menu"
					aria-label={t("language.label")}
					data-state={state}
					onKeyDown={onMenuKeyDown}
				>
					{SUPPORTED_LANGUAGES.map((lng) => (
						<button
							key={lng}
							type="button"
							className="dropdown-item"
							role="menuitemradio"
							aria-checked={lng === current}
							tabIndex={-1}
							lang={lng}
							onClick={() => choose(lng)}
						>
							<IoCheckmark className="lang-check" aria-hidden="true" />
							{LANGUAGE_NAMES[lng]}
							<span className="lang-code" aria-hidden="true">{lng.toUpperCase()}</span>
						</button>
					))}
				</div>
			)}
		</div>
	);
};

export default LanguageSwitcher;
