import { SOCIAL_IMAGE } from "./pages";

interface HeadState {
	title: string;
	description: string;
	/** Absolute canonical URL; omitted for pages that must not be indexed. */
	url?: string;
	/** Open Graph locale, e.g. "en_US". */
	locale: string;
	noindex: boolean;
}

/** Finds a head tag by selector or creates it, then sets the attribute. */
const upsert = (tag: "meta" | "link", selector: string, attrs: Record<string, string>, content: [string, string]) => {
	let el = document.head.querySelector<HTMLElement>(selector);
	if (!el) {
		el = document.createElement(tag);
		Object.entries(attrs).forEach(([k, v]) => el!.setAttribute(k, v));
		document.head.appendChild(el);
	}
	el.setAttribute(content[0], content[1]);
};

const meta = (key: "name" | "property", name: string, value: string) =>
	upsert("meta", `meta[${key}="${name}"]`, { [key]: name }, ["content", value]);

/**
 * Mirrors what scripts/prerender.ts writes into each static page, so client-side
 * navigation and language switches keep the head accurate.
 */
export const applyHead = ({ title, description, url, locale, noindex }: HeadState) => {
	document.title = title;
	meta("name", "description", description);
	meta("property", "og:title", title);
	meta("property", "og:description", description);
	meta("property", "og:locale", locale);
	meta("name", "twitter:title", title);
	meta("name", "twitter:description", description);
	meta("property", "og:image", SOCIAL_IMAGE.url);

	if (url) {
		upsert("link", 'link[rel="canonical"]', { rel: "canonical" }, ["href", url]);
		meta("property", "og:url", url);
	} else {
		document.head.querySelector('link[rel="canonical"]')?.remove();
		document.head.querySelector('meta[property="og:url"]')?.remove();
	}

	const robots = document.head.querySelector('meta[name="robots"]');
	if (noindex) meta("name", "robots", "noindex");
	else robots?.remove();
};
