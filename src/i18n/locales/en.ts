/**
 * English catalog: the source of truth for keys. `es` and `fr` must match its shape.
 * Figure names and series come from the API and are never translated.
 */
const en = {
	common: {
		appName: "Amiibo Finder",
		skipToContent: "Skip to content",
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
		desc_one: "Your only figure will be removed from this browser. This can't be undone. Export your collection first if you want a backup.",
		desc_other: "All {{count}} figures will be removed from this browser. This can't be undone. Export your collection first if you want a backup.",
		descEmpty: "Your collection is already empty. Deleting will also clear any saved data in this browser.",
		cancel: "Keep my collection",
		confirm: "Delete collection",
	},
	footer: {
		license: "© 2025 Davitroon · MIT License",
		dataFrom: "Figure data from the <api>AmiiboAPI community project<hint> (opens in a new tab)</hint></api>",
		disclaimer: "Fan-made project, not affiliated with or endorsed by Nintendo.",
	},
	room: {
		clockReady: "READY",
	},
	tally: {
		figures_one: "{{count}} figure",
		figures_other: "{{count}} figures",
		figuresOf_one: "{{count}} / {{total}} figures",
		figuresOf_other: "{{count}} / {{total}} figures",
		series_one: "{{count}} series",
		series_other: "{{count}} series",
		favorites_one: "{{count}} favorite",
		favorites_other: "{{count}} favorites",
	},
	reveal: {
		close: "Close and put the figure on the shelf",
		desc: "From {{gameSeries}}, part of the {{amiiboSeries}} series. It's moving into your room.",
		place: "Put it on the shelf",
	},
	unlock: {
		shelfLabel: "Figures on your shelves, newest first",
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
	},
	collection: {
		title: "My Collection",
		shelfLabel: "On display: favorites first, then newest",
		lede: {
			empty: "Your shelves are empty. Your first figure is waiting in the gift box.",
			filled: "Favorites get the best spots on the shelves. Everything you own is listed in the ledger below.",
		},
		shelfNote: "{{capacity}} of your {{owned}} figures fit on the shelves. Mark favorites to choose who's on display.",
		delivery: {
			nextIn: "Next delivery in <time>{{time}}</time>",
			goToUnlock: "Go to Unlock",
			waiting: "A gift is waiting for you.",
			openFirst: "Open your first gift",
			openIt: "Open it",
		},
		ledger: {
			title: "Every figure you own",
			countAll_one: "{{count}} figure",
			countAll_other: "{{count}} figures",
			countFiltered: "Showing {{shown}} of {{total}}",
			noMatchTitle: "No figures match these filters.",
			noMatchBody: "Try another name or series, or turn off Favorites only.",
			resetFilters: "Reset filters",
		},
	},
	filters: {
		searchLabel: "Search your figures by name",
		searchPlaceholder: "Search by name: Mario, Link…",
		clearSearch: "Clear search",
		toggle: "Filters",
		activeSr_one: "{{count}} active",
		activeSr_other: "{{count}} active",
		reset: "Reset",
		series: "Game series",
		allSeries: "All series",
		sortBy: "Sort by",
		sort: {
			date_new: "Newest first",
			date_old: "Oldest first",
			name_asc: "Name, A to Z",
			name_desc: "Name, Z to A",
			series: "Game series",
			favorites_first: "Favorites first",
		},
		favoritesOnly: "Favorites only",
	},
	card: {
		favorite: "Favorite {{name}}",
		addFavorite: "Add to favorites",
		removeFavorite: "Remove from favorites",
		detailsFor: "Details for {{name}}",
		unlocked: "Unlocked",
		amiiboSeries: "Amiibo series",
		region: {
			na: "North America",
			eu: "Europe",
			jp: "Japan",
			au: "Australia",
		},
		notReleased: "Not released",
	},
	notification: {
		body: "🎁 Your gift is ready! Click to unlock a new Amiibo.",
	},
};

export default en;

/** Recursively widens string leaves so other locales can supply their own text. */
type Widen<T> = { [K in keyof T]: T[K] extends string ? string : Widen<T[K]> };
export type Catalog = Widen<typeof en>;
