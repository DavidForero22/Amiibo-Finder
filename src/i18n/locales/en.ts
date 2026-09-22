/**
 * English catalog: the source of truth for keys. `es` and `fr` must match its shape.
 * Figure names and series come from the API and are never translated.
 */
const en = {
	common: {
		appName: "Amiibo Finder",
		skipToContent: "Skip to content",
		opensInNewTab: "(opens in a new tab)",
	},
	language: {
		label: "Language",
		changeTo: "Change language",
	},
	header: {
		homeLink: "Amiibo Finder, go to your collection",
		navLabel: "Main",
		nav: {
			collection: "Collection",
			unlock: "Unlock",
		},
		notifications: {
			on: "Notifications are on",
			turnOn: "Turn on gift notifications",
			unsupported: "This browser doesn't support notifications.",
			howToDisable: "To turn notifications off, reset this site's permissions in your browser.",
			blocked: "Notifications are blocked in your browser settings.",
			enabled: "Notifications on. We'll tell you when a gift arrives.",
		},
		theme: {
			toLight: "Switch to light mode",
			toDark: "Switch to dark mode",
		},
	},
	userMenu: {
		label: "Collection data",
		export: "Export collection",
		import: "Import collection",
		delete: "Delete collection",
		toast: {
			nothingToExport: "Nothing to export yet. Unlock a figure first.",
			exported: "Collection exported as a .json file.",
			imported: "Collection imported. Your shelves are restocked.",
			importInvalid: "That file isn't an Amiibo Finder export. Choose a .json file saved from this site.",
			importRead: "The file couldn't be read. Try choosing it again.",
			deleted: "Collection deleted. Your shelves are empty.",
		},
	},
	deleteModal: {
		title: "Empty every shelf?",
		desc_one: "{{count}} figure will be removed from this browser. This can't be undone. Export your collection first if you want a backup.",
		desc_other: "All {{count}} figures will be removed from this browser. This can't be undone. Export your collection first if you want a backup.",
		descEmpty: "Your collection is already empty. Deleting will also clear any saved data in this browser.",
		cancel: "Keep my collection",
		confirm: "Delete collection",
	},
	footer: {
		license: "© 2025 Davitroon · MIT License",
		dataFrom: "Figure data from the <link>AmiiboAPI community project</link>",
		disclaimer: "Fan-made project, not affiliated with or endorsed by Nintendo.",
	},
	room: {
		clockReady: "READY",
		shelfLabel: "Figures on your shelves, newest first",
	},
	reveal: {
		close: "Close and put the figure on the shelf",
		desc: "From <strong>{{gameSeries}}</strong>, part of the {{amiiboSeries}} series. It's moving into your room.",
		place: "Put it on the shelf",
	},
	unlock: {
		error: {
			network: {
				title: "The delivery couldn't reach you.",
				body: "Check your internet connection, then try again. Your two-hour wait hasn't started.",
			},
			server: {
				title: "The figure catalogue isn't answering.",
				body: "The Amiibo database is unavailable right now. Try again in a moment; your wait hasn't started.",
			},
			unknown: {
				title: "Something went wrong while unwrapping.",
				body: "Nothing was lost. Try opening the gift again.",
			},
		},
		complete: {
			title: "Every figure has a home.",
			body_one: "You've collected the only figure. Nothing left to unwrap.",
			body_other: "You've collected all {{count}} figures. Nothing left to unwrap.",
		},
		opening: {
			title: "Unwrapping…",
			body: "Careful with the ribbon.",
		},
		waiting: {
			title: "The next gift is on its way.",
			body: "A new delivery arrives every two hours. The clock on the wall keeps time.",
		},
		ready: {
			title: "Your delivery is here.",
			body: "A new figure is waiting inside the box. Open it to see who's moving in.",
		},
		countdownLabel: "Next delivery in",
		countdownSr_one: "about {{count}} minute",
		countdownSr_other: "about {{count}} minutes",
		actions: {
			retry: "Try again",
			open: "Open the gift",
			opening: "Opening…",
			notify: "Notify me when it arrives",
			seeCollection: "See your collection",
		},
		toast: {
			notifyOn: "We'll let you know when the next gift arrives.",
			notifyBlocked: "Notifications are blocked in your browser settings.",
		},
		tally: {
			figures_one: "{{count}} figure",
			figures_other: "{{count}} figures",
			figuresOf_one: "{{count}} / {{total}} figures",
			figuresOf_other: "{{count}} / {{total}} figures",
			series_one: "{{count}} series",
			series_other: "{{count}} series",
		},
	},
	collection: {
		title: "My Collection",
		filters: {
			show: "Filters",
			hide: "Hide Filters",
			name: "Name",
			namePlaceholder: "Mario, Link...",
			series: "Game Series",
			allSeries: "All Series",
			sortBy: "Sort By",
			sort: {
				date_new: "Newest",
				date_old: "Oldest",
				name_asc: "Name (A-Z)",
				name_desc: "Name (Z-A)",
				series: "Series",
				favorites_first: "Favorites",
			},
			favoritesOnly: "Favorites Only",
			reset: "Reset all filters",
			clean: "Clean",
		},
		results: "Showing <strong>{{shown}}</strong> of {{total}} Amiibos",
		noMatches: "No amiibos found matching your filters.",
		empty: {
			title: "Your collection is empty",
			subtitle: "Go to the Unlock page to get your first Amiibo!",
		},
	},
	card: {
		addFavorite: "Add {{name}} to favorites",
		removeFavorite: "Remove {{name}} from favorites",
		seeDetails: "See details for {{name}}",
		closeDetails: "Close details",
		series: "Series",
		unlocked: "Unlocked",
		released: "Released",
		notAvailable: "N/A",
		unknown: "Unknown",
		tapToClose: "Tap to close",
	},
	notification: {
		body: "🎁 Your gift is ready! Click to unlock a new Amiibo.",
	},
};

export default en;

/** Recursively widens string leaves so other locales can supply their own text. */
type Widen<T> = { [K in keyof T]: T[K] extends string ? string : Widen<T[K]> };
export type Catalog = Widen<typeof en>;
