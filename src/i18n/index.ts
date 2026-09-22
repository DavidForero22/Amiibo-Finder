import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import en from "./locales/en";
import es from "./locales/es";
import fr from "./locales/fr";

export const SUPPORTED_LANGUAGES = ["en", "es", "fr"] as const;
export type Language = (typeof SUPPORTED_LANGUAGES)[number];

/** Each language named in itself, as shown in the language picker. */
export const LANGUAGE_NAMES: Record<Language, string> = {
	en: "English",
	es: "Español",
	fr: "Français",
};

export const resources = {
	en: { translation: en },
	es: { translation: es },
	fr: { translation: fr },
} as const;

/**
 * i18next setup. The language is picked from the saved choice first, then the
 * browser, and falls back to English. The choice is kept in LocalStorage.
 */
i18n
	.use(LanguageDetector)
	.use(initReactI18next)
	.init({
		resources,
		fallbackLng: "en",
		supportedLngs: SUPPORTED_LANGUAGES,
		nonExplicitSupportedLngs: true, // "es-MX" -> "es"
		load: "languageOnly",
		detection: {
			order: ["localStorage", "navigator"],
			lookupLocalStorage: "amiiboFinderLanguage",
			caches: ["localStorage"],
		},
		interpolation: {
			escapeValue: false, // React already escapes
		},
		react: {
			transKeepBasicHtmlNodesFor: ["strong", "em", "br"],
		},
	});

/** Keeps <html lang> in sync so screen readers and hyphenation use the right language. */
const syncHtmlLang = (lng: string) => {
	document.documentElement.lang = lng;
};
syncHtmlLang(i18n.resolvedLanguage ?? "en");
i18n.on("languageChanged", () => syncHtmlLang(i18n.resolvedLanguage ?? "en"));

export default i18n;
