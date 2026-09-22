import { useTranslation } from "react-i18next";
import { IoChevronDown } from "react-icons/io5";
import { LANGUAGE_NAMES, SUPPORTED_LANGUAGES, type Language } from "../i18n";
import "../styles/language-switcher.css";

/**
 * Compact language picker for the header. The visible face shows only the
 * language code (EN/ES/FR); a transparent native <select> sits on top, so the
 * control, its keyboard behaviour and the open list (full names, each with its
 * own `lang`) all come from the platform.
 */
const LanguageSwitcher = () => {
	const { t, i18n } = useTranslation();
	const current = (i18n.resolvedLanguage ?? "en") as Language;

	return (
		<div className="lang-switcher">
			<label htmlFor="lang-select" className="visually-hidden">
				{t("language.label")}
			</label>
			<span className="lang-face" aria-hidden="true">
				{current.toUpperCase()}
				<IoChevronDown className="lang-chevron" />
			</span>
			<select
				id="lang-select"
				className="lang-select"
				value={current}
				title={t("language.changeTo")}
				onChange={(e) => i18n.changeLanguage(e.target.value)}
			>
				{SUPPORTED_LANGUAGES.map((lng) => (
					<option key={lng} value={lng} lang={lng}>
						{LANGUAGE_NAMES[lng]}
					</option>
				))}
			</select>
		</div>
	);
};

export default LanguageSwitcher;
