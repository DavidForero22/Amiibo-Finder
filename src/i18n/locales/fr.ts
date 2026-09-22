import type { Catalog } from "./en";

/** French catalog. Uses "vous", the usual register for French web interfaces. */
const fr: Catalog = {
	common: {
		appName: "Amiibo Finder",
		skipToContent: "Aller au contenu",
		opensInNewTab: "(s’ouvre dans un nouvel onglet)",
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
		desc_one: "{{count}} figurine sera supprimée de ce navigateur. Cette action est irréversible. Exportez d’abord votre collection si vous voulez une sauvegarde.",
		desc_other: "Les {{count}} figurines seront supprimées de ce navigateur. Cette action est irréversible. Exportez d’abord votre collection si vous voulez une sauvegarde.",
		descEmpty: "Votre collection est déjà vide. La suppression effacera aussi les données enregistrées dans ce navigateur.",
		cancel: "Garder ma collection",
		confirm: "Supprimer la collection",
	},
	footer: {
		license: "© 2025 Davitroon · Licence MIT",
		dataFrom: "Données des figurines issues du <link>projet communautaire AmiiboAPI</link>",
		disclaimer: "Projet de fan, non affilié à Nintendo ni approuvé par Nintendo.",
	},
	room: {
		clockReady: "PRÊT",
		shelfLabel: "Figurines sur vos étagères, les plus récentes d’abord",
	},
	reveal: {
		close: "Fermer et poser la figurine sur l’étagère",
		desc: "De <strong>{{gameSeries}}</strong>, de la série {{amiiboSeries}}. Elle emménage dans votre chambre.",
		place: "La poser sur l’étagère",
	},
	unlock: {
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
		tally: {
			figures_one: "{{count}} figurine",
			figures_other: "{{count}} figurines",
			figuresOf_one: "{{count}} / {{total}} figurines",
			figuresOf_other: "{{count}} / {{total}} figurines",
			series_one: "{{count}} série",
			series_other: "{{count}} séries",
		},
	},
	collection: {
		title: "Ma collection",
		filters: {
			show: "Filtres",
			hide: "Masquer les filtres",
			name: "Nom",
			namePlaceholder: "Mario, Link...",
			series: "Série de jeux",
			allSeries: "Toutes les séries",
			sortBy: "Trier par",
			sort: {
				date_new: "Plus récents",
				date_old: "Plus anciens",
				name_asc: "Nom (A-Z)",
				name_desc: "Nom (Z-A)",
				series: "Série",
				favorites_first: "Favoris",
			},
			favoritesOnly: "Favoris uniquement",
			reset: "Réinitialiser tous les filtres",
			clean: "Effacer",
		},
		results: "<strong>{{shown}}</strong> amiibo(s) affiché(s) sur {{total}}",
		noMatches: "Aucun amiibo ne correspond à vos filtres.",
		empty: {
			title: "Votre collection est vide",
			subtitle: "Rendez-vous sur la page Débloquer pour obtenir votre premier Amiibo !",
		},
	},
	card: {
		addFavorite: "Ajouter {{name}} aux favoris",
		removeFavorite: "Retirer {{name}} des favoris",
		seeDetails: "Voir les détails de {{name}}",
		closeDetails: "Fermer les détails",
		series: "Série",
		unlocked: "Débloqué le",
		released: "Sortie",
		notAvailable: "N/D",
		unknown: "Inconnue",
		tapToClose: "Touchez pour fermer",
	},
	notification: {
		body: "🎁 Votre cadeau est prêt ! Cliquez pour débloquer un nouvel Amiibo.",
	},
};

export default fr;
