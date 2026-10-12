import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import type { Plugin } from "vite";
import en from "../src/i18n/locales/en";
import { PAGE_PATHS, SITE_URL, SOCIAL_IMAGE, canonicalFor, type PageKey } from "../src/seo/pages";

/**
 * Prerender: gives every route its own static HTML (title, description,
 * canonical, Open Graph and a readable snapshot of the page), so crawlers and
 * link previews get real content without running the app. React replaces the
 * snapshot when it mounts. Pages are written in English, the default language;
 * the app switches to the visitor's language at run time.
 *
 * Output: index.html (/), unlock.html (/unlock, served clean by the host) and
 * 404.html (the host's real 404, which still boots the app on the bad URL).
 */

const escapeHtml = (s: string) =>
	s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

const SEO_BLOCK = /<!--seo:start-->[\s\S]*?<!--seo:end-->/;
const ROOT_BLOCK = /<!--root:start-->[\s\S]*?<!--root:end-->/;

const text = (key: PageKey) => {
	const t = en.seo[key];
	return { title: t.title, description: t.description };
};

/** The head tags for one page. */
const headFor = (key: PageKey): string => {
	const { title, description } = text(key);
	const indexable = key !== "notFound";
	const url = indexable ? canonicalFor(key) : null;
	const tags = [
		`<title>${escapeHtml(title)}</title>`,
		`<meta name="description" content="${escapeHtml(description)}" />`,
		indexable ? `<link rel="canonical" href="${url}" />` : `<meta name="robots" content="noindex" />`,
		`<meta property="og:type" content="website" />`,
		`<meta property="og:site_name" content="${en.common.appName}" />`,
		`<meta property="og:locale" content="en_US" />`,
		`<meta property="og:locale:alternate" content="es_ES" />`,
		`<meta property="og:title" content="${escapeHtml(title)}" />`,
		`<meta property="og:description" content="${escapeHtml(description)}" />`,
		url ? `<meta property="og:url" content="${url}" />` : "",
		`<meta property="og:image" content="${SOCIAL_IMAGE.url}" />`,
		`<meta property="og:image:type" content="${SOCIAL_IMAGE.type}" />`,
		`<meta property="og:image:width" content="${SOCIAL_IMAGE.width}" />`,
		`<meta property="og:image:height" content="${SOCIAL_IMAGE.height}" />`,
		`<meta property="og:image:alt" content="${escapeHtml(en.common.appName)}" />`,
		`<meta name="twitter:card" content="summary_large_image" />`,
		`<meta name="twitter:title" content="${escapeHtml(title)}" />`,
		`<meta name="twitter:description" content="${escapeHtml(description)}" />`,
		`<meta name="twitter:image" content="${SOCIAL_IMAGE.url}" />`,
	];

	if (key === "home") {
		const ld = {
			"@context": "https://schema.org",
			"@type": "WebApplication",
			name: en.common.appName,
			url: `${SITE_URL}/`,
			description,
			applicationCategory: "GameApplication",
			operatingSystem: "Any",
			browserRequirements: "Requires JavaScript",
			offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
		};
		tags.push(`<script type="application/ld+json">${JSON.stringify(ld).replace(/</g, "\u003c")}</script>`);
	}

	return tags.filter(Boolean).join("\n    ");
};

/** A readable snapshot of the page, shown until the app mounts. */
const rootFor = (key: PageKey): string => {
	const nav = `<p><a href="${PAGE_PATHS.home}">${escapeHtml(en.header.nav.collection)}</a> · <a href="${PAGE_PATHS.unlock}">${escapeHtml(en.header.nav.unlock)}</a></p>`;
	const body: Record<PageKey, { heading: string; lede: string }> = {
		home: { heading: en.collection.title, lede: en.seo.home.description },
		unlock: { heading: en.seo.unlock.title.replace(/ · .*$/, ""), lede: en.seo.unlock.description },
		notFound: { heading: en.seo.notFound.heading, lede: en.seo.notFound.description },
	};
	const { heading, lede } = body[key];
	return `<main style="max-width:44rem;margin:0 auto;padding:2rem 1.25rem;font-family:system-ui,sans-serif;line-height:1.5">
      <h1>${escapeHtml(heading)}</h1>
      <p>${escapeHtml(lede)}</p>
      ${nav}
    </main>`;
};

const fill = (html: string, key: PageKey) =>
	html
		.replace(SEO_BLOCK, () => `<!--seo:start-->\n    ${headFor(key)}\n    <!--seo:end-->`)
		.replace(ROOT_BLOCK, () => `<!--root:start--><div id="root">${rootFor(key)}</div><!--root:end-->`);

export default function prerender(): Plugin {
	let outDir = "dist";

	return {
		name: "amiibo-prerender",
		configResolved(config) {
			outDir = join(config.root, config.build.outDir);
		},
		// Dev server and build both get the home page's head and snapshot
		transformIndexHtml: {
			order: "pre",
			handler: (html) => fill(html, "home"),
		},
		// After the build: the other routes, cut from the built home page
		closeBundle() {
			const built = readFileSync(join(outDir, "index.html"), "utf8");
			writeFileSync(join(outDir, "unlock.html"), fill(built, "unlock"));
			mkdirSync(outDir, { recursive: true });
			writeFileSync(join(outDir, "404.html"), fill(built, "notFound"));
		},
	};
}
