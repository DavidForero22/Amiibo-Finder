import { useTranslation } from "react-i18next";
import { LANGUAGE_NAMES, SUPPORTED_LANGUAGES, type Language } from "../i18n";
import "../styles/language-switcher.css";

/**
 * Language picker for the header. A native <select> keeps keyboard and
 * screen-reader behaviour for free; each option is named in its own language
 * and carries its `lang` so it is pronounced correctly.
 */
const LanguageSwitcher = () => {
	const { t, i18n } = useTranslation();
	const current = (i18n.resolvedLanguage ?? "en") as Language;

	return (
		<div className="lang-switcher">
			<label htmlFor="lang-select" className="visually-hidden">
				{t("language.label")}
			</label>
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
