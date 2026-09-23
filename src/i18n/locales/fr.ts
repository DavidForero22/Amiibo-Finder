import type { Catalog } from "./en";

/**
 * French catalog. Uses "vous", the usual register for French web interfaces,
 * and a narrow no-break space (U+202F) before "?", "!", ";" and ":" so they never wrap alone.
 */
const fr: Catalog = {
	common: {
		appName: "Amiibo Finder",
		skipToContent: "Aller au contenu",
	},
	language: {
		label: "Langue",
		changeTo: "Changer de langue",
	},
	header: {
		homeLink: "Amiibo Finder, aller à votre collection",
		navLabel: "Principale",
		nav: {
			collection: "Collection",
			unlock: "Débloquer",
		},
		notifications: {
			on: "Les notifications sont activées",
			turnOn: "Activer les alertes de cadeau",
			unsupported: "Ce navigateur ne prend pas en charge les notifications.",
			howToDisable: "Pour désactiver les notifications, réinitialisez les autorisations de ce site dans votre navigateur.",
			blocked: "Les notifications sont bloquées dans les paramètres de votre navigateur.",
			enabled: "Notifications activées. Nous vous préviendrons quand un cadeau arrivera.",
		},
		theme: {
			toLight: "Passer en mode clair",
			toDark: "Passer en mode sombre",
		},
	},
	userMenu: {
		label: "Données de la collection",
		export: "Exporter la collection",
		import: "Importer une collection",
		delete: "Supprimer la collection",
		toast: {
			nothingToExport: "Rien à exporter pour l’instant. Débloquez d’abord une figurine.",
			exported: "Collection exportée en fichier .json.",
			imported: "Collection importée. Vos étagères sont de nouveau garnies.",
			importInvalid: "Ce fichier n’est pas un export d’Amiibo Finder. Choisissez un fichier .json enregistré depuis ce site.",
			importRead: "Impossible de lire le fichier. Essayez de le sélectionner à nouveau.",
			deleted: "Collection supprimée. Vos étagères sont vides.",
		},
	},
	deleteModal: {
		title: "Vider toutes les étagères ?",
		desc_one: "Votre unique figurine sera supprimée de ce navigateur. Cette action est irréversible. Exportez d’abord votre collection si vous voulez une sauvegarde.",
		desc_other: "Les {{count}} figurines seront supprimées de ce navigateur. Cette action est irréversible. Exportez d’abord votre collection si vous voulez une sauvegarde.",
		descEmpty: "Votre collection est déjà vide. La suppression effacera aussi les données enregistrées dans ce navigateur.",
		cancel: "Garder ma collection",
		confirm: "Supprimer la collection",
	},
	footer: {
		license: "© 2025 Davitroon · Licence MIT",
		dataFrom: "Données des figurines issues du <api>projet communautaire AmiiboAPI<hint> (s’ouvre dans un nouvel onglet)</hint></api>",
		disclaimer: "Projet de fan, non affilié à Nintendo ni approuvé par Nintendo.",
	},
	room: {
		clockReady: "PRÊT",
	},
	reveal: {
		close: "Fermer et poser la figurine sur l’étagère",
		desc: "De {{gameSeries}}, de la série {{amiiboSeries}}. Elle emménage dans votre chambre.",
		place: "La poser sur l’étagère",
		keep: "L’ajouter à la collection",
		closeKeep: "Fermer et ajouter la figurine à la collection",
	},
	unlock: {
		shelfLabel: "Vos figurines favorites en vitrine",
		error: {
			network: {
				title: "La livraison n’a pas pu vous parvenir.",
				body: "Vérifiez votre connexion internet, puis réessayez. Votre attente de deux heures n’a pas commencé.",
			},
			server: {
				title: "Le catalogue des figurines ne répond pas.",
				body: "La base de données Amiibo est indisponible pour le moment. Réessayez dans un instant ; votre attente n’a pas commencé.",
			},
			unknown: {
				title: "Un problème est survenu pendant le déballage.",
				body: "Rien n’a été perdu. Essayez d’ouvrir le cadeau à nouveau.",
			},
		},
		complete: {
			title: "Chaque figurine a trouvé sa place.",
			body_one: "Vous avez obtenu l’unique figurine. Plus rien à déballer.",
			body_other: "Vous avez obtenu les {{count}} figurines. Plus rien à déballer.",
		},
		opening: {
			title: "Déballage…",
			body: "Attention au ruban.",
		},
		waiting: {
			title: "Le prochain cadeau est en route.",
			body: "Une nouvelle livraison arrive toutes les deux heures. L’horloge murale tient le compte.",
		},
		ready: {
			title: "Votre livraison est arrivée.",
			body: "Une nouvelle figurine attend dans la boîte. Ouvrez-la pour découvrir qui emménage.",
		},
		countdownLabel: "Prochaine livraison dans",
		countdownSr_one: "environ {{count}} minute",
		countdownSr_other: "environ {{count}} minutes",
		actions: {
			retry: "Réessayer",
			open: "Ouvrir le cadeau",
			opening: "Ouverture…",
			notify: "Me prévenir à son arrivée",
			seeCollection: "Voir votre collection",
		},
		toast: {
			notifyOn: "Nous vous préviendrons quand le prochain cadeau arrivera.",
			notifyBlocked: "Les notifications sont bloquées dans les paramètres de votre navigateur.",
		},
	},
	collection: {
		title: "Ma collection",
		shelfLabel: "Vos figurines favorites en vitrine",
		lede: {
			empty: "Vos étagères sont vides. Votre première figurine vous attend dans la boîte cadeau.",
			filled: "Vos favorites sont exposées sur les étagères. Tout ce que vous possédez est listé dans le registre ci-dessous.",
		},
		shelfEmpty: "Marquez des figurines comme favorites pour les exposer sur les étagères.",
		shelfNote: "{{capacity}} de vos {{count}} favorites tiennent sur les étagères. Les premières ont les places.",
		delivery: {
			nextIn: "Prochaine livraison dans <time>{{time}}</time>",
			goToUnlock: "Aller à Débloquer",
			waiting: "Un cadeau vous attend.",
			openFirst: "Ouvrir votre premier cadeau",
			openIt: "L’ouvrir",
		},
		ledger: {
			title: "Toutes vos figurines",
			countAll_one: "{{count}} figurine",
			countAll_other: "{{count}} figurines",
			countFiltered: "{{shown}} sur {{total}} affichées",
			noMatchTitle: "Aucune figurine ne correspond à ces filtres.",
			noMatchBody: "Essayez un autre nom ou une autre série, ou désactivez Favorites uniquement.",
			resetFilters: "Réinitialiser les filtres",
		},
	},
	filters: {
		searchLabel: "Rechercher vos figurines par nom",
		searchPlaceholder: "Rechercher par nom : Mario, Link…",
		clearSearch: "Effacer la recherche",
		toggle: "Filtres",
		activeSr_one: "{{count}} actif",
		activeSr_other: "{{count}} actifs",
		reset: "Réinitialiser",
		series: "Série de jeux",
		allSeries: "Toutes les séries",
		sortBy: "Trier par",
		sort: {
			date_new: "Plus récentes d’abord",
			date_old: "Plus anciennes d’abord",
			name_asc: "Nom, de A à Z",
			name_desc: "Nom, de Z à A",
			series: "Série de jeux",
			favorites_first: "Favorites d’abord",
		},
		favoritesOnly: "Favorites uniquement",
	},
	card: {
		favorite: "Marquer {{name}} comme favorite",
		addFavorite: "Ajouter aux favoris",
		removeFavorite: "Retirer des favoris",
		detailsFor: "Détails de {{name}}",
		unlocked: "Débloquée le",
		amiiboSeries: "Série amiibo",
		region: {
			na: "Amérique du Nord",
			eu: "Europe",
			jp: "Japon",
			au: "Australie",
		},
		notReleased: "Non sortie",
	},
	notification: {
		body: "🎁 Votre cadeau est prêt ! Cliquez pour débloquer un nouvel Amiibo.",
	},
};

export default fr;
