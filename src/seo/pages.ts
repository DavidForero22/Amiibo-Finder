/**
 * Single source of truth for per-page SEO. Used at build time (scripts/prerender.ts
 * writes each route's own HTML) and at run time (BaseLayout keeps the head in step
 * with the route and language).
 */

/** Production origin. Canonical, Open Graph and sitemap URLs are built from it. */
export const SITE_URL = "https://amiibofinder.vercel.app";

export const SOCIAL_IMAGE = {
	url: `${SITE_URL}/social_thumbnail.webp`,
	width: 1200,
	height: 630,
	type: "image/webp",
} as const;

export type PageKey = "home" | "unlock" | "notFound";

/** Indexable routes; the 404 has no URL of its own. */
export const PAGE_PATHS = {
	home: "/",
	unlock: "/unlock",
} as const;

/** Maps a pathname (with or without trailing slash) to its page key. */
export const pageKeyFor = (pathname: string): PageKey => {
	const clean = pathname.length > 1 ? pathname.replace(/\/+$/, "") : pathname;
	if (clean === PAGE_PATHS.home) return "home";
	if (clean === PAGE_PATHS.unlock) return "unlock";
	return "notFound";
};

/** Absolute canonical URL for an indexable page. */
export const canonicalFor = (key: "home" | "unlock") =>
	key === "home" ? `${SITE_URL}/` : `${SITE_URL}${PAGE_PATHS[key]}`;
