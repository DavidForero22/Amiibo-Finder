import "i18next";
import type en from "./locales/en";

/** Typed keys: t("unknown.key") is a compile error. */
declare module "i18next" {
	interface CustomTypeOptions {
		defaultNS: "translation";
		resources: {
			translation: typeof en;
		};
	}
}
