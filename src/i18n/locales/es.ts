import type { Catalog } from "./en";

/** Spanish catalog. Informal "tú", as the app speaks to a single collector. */
const es: Catalog = {
	common: {
		appName: "Amiibo Finder",
		skipToContent: "Saltar al contenido",
		opensInNewTab: "(se abre en una pestaña nueva)",
	},
	language: {
		label: "Idioma",
		changeTo: "Cambiar idioma",
	},
	header: {
		homeLink: "Amiibo Finder, ir a tu colección",
		navLabel: "Principal",
		nav: {
			collection: "Colección",
			unlock: "Desbloquear",
		},
		notifications: {
			on: "Las notificaciones están activadas",
			turnOn: "Activar avisos de regalos",
			unsupported: "Este navegador no admite notificaciones.",
			howToDisable: "Para desactivar las notificaciones, restablece los permisos de este sitio en tu navegador.",
			blocked: "Las notificaciones están bloqueadas en la configuración de tu navegador.",
			enabled: "Notificaciones activadas. Te avisaremos cuando llegue un regalo.",
		},
		theme: {
			toLight: "Cambiar a modo claro",
			toDark: "Cambiar a modo oscuro",
		},
	},
	userMenu: {
		label: "Datos de la colección",
		export: "Exportar colección",
		import: "Importar colección",
		delete: "Borrar colección",
		toast: {
			nothingToExport: "Aún no hay nada que exportar. Desbloquea una figura primero.",
			exported: "Colección exportada como archivo .json.",
			imported: "Colección importada. Tus estanterías vuelven a estar llenas.",
			importInvalid: "Ese archivo no es una exportación de Amiibo Finder. Elige un archivo .json guardado desde esta web.",
			importRead: "No se pudo leer el archivo. Prueba a elegirlo de nuevo.",
			deleted: "Colección borrada. Tus estanterías están vacías.",
		},
	},
	deleteModal: {
		title: "¿Vaciar todas las estanterías?",
		desc_one: "Se eliminará {{count}} figura de este navegador. No se puede deshacer. Si quieres una copia de seguridad, exporta antes tu colección.",
		desc_other: "Se eliminarán las {{count}} figuras de este navegador. No se puede deshacer. Si quieres una copia de seguridad, exporta antes tu colección.",
		descEmpty: "Tu colección ya está vacía. Al borrarla también se eliminarán los datos guardados en este navegador.",
		cancel: "Conservar mi colección",
		confirm: "Borrar colección",
	},
	footer: {
		license: "© 2025 Davitroon · Licencia MIT",
		dataFrom: "Datos de figuras del <link>proyecto comunitario AmiiboAPI</link>",
		disclaimer: "Proyecto hecho por fans, sin afiliación ni respaldo de Nintendo.",
	},
	room: {
		clockReady: "LISTO",
		shelfLabel: "Figuras en tus estanterías, de la más nueva a la más antigua",
	},
	reveal: {
		close: "Cerrar y poner la figura en la estantería",
		desc: "De <strong>{{gameSeries}}</strong>, parte de la serie {{amiiboSeries}}. Se muda a tu habitación.",
		place: "Ponerla en la estantería",
	},
	unlock: {
		error: {
			network: {
				title: "El envío no ha podido llegar.",
				body: "Comprueba tu conexión a internet y vuelve a intentarlo. Tu espera de dos horas no ha empezado.",
			},
			server: {
				title: "El catálogo de figuras no responde.",
				body: "La base de datos de Amiibo no está disponible ahora mismo. Inténtalo de nuevo en un momento; tu espera no ha empezado.",
			},
			unknown: {
				title: "Algo ha fallado al desenvolver.",
				body: "No se ha perdido nada. Prueba a abrir el regalo de nuevo.",
			},
		},
		complete: {
			title: "Todas las figuras tienen un hogar.",
			body_one: "Has conseguido la única figura. No queda nada por desenvolver.",
			body_other: "Has conseguido las {{count}} figuras. No queda nada por desenvolver.",
		},
		opening: {
			title: "Desenvolviendo…",
			body: "Cuidado con el lazo.",
		},
		waiting: {
			title: "El próximo regalo está en camino.",
			body: "Llega un envío nuevo cada dos horas. El reloj de la pared marca el tiempo.",
		},
		ready: {
			title: "Ha llegado tu envío.",
			body: "Hay una figura nueva esperando dentro de la caja. Ábrela para ver quién se muda contigo.",
		},
		countdownLabel: "Próximo envío en",
		countdownSr_one: "unos {{count}} minuto",
		countdownSr_other: "unos {{count}} minutos",
		actions: {
			retry: "Reintentar",
			open: "Abrir el regalo",
			opening: "Abriendo…",
			notify: "Avísame cuando llegue",
			seeCollection: "Ver tu colección",
		},
		toast: {
			notifyOn: "Te avisaremos cuando llegue el próximo regalo.",
			notifyBlocked: "Las notificaciones están bloqueadas en la configuración de tu navegador.",
		},
		tally: {
			figures_one: "{{count}} figura",
			figures_other: "{{count}} figuras",
			figuresOf_one: "{{count}} / {{total}} figuras",
			figuresOf_other: "{{count}} / {{total}} figuras",
			series_one: "{{count}} serie",
			series_other: "{{count}} series",
		},
	},
	collection: {
		title: "Mi colección",
		filters: {
			show: "Filtros",
			hide: "Ocultar filtros",
			name: "Nombre",
			namePlaceholder: "Mario, Link...",
			series: "Saga",
			allSeries: "Todas las sagas",
			sortBy: "Ordenar por",
			sort: {
				date_new: "Más recientes",
				date_old: "Más antiguos",
				name_asc: "Nombre (A-Z)",
				name_desc: "Nombre (Z-A)",
				series: "Saga",
				favorites_first: "Favoritos",
			},
			favoritesOnly: "Solo favoritos",
			reset: "Restablecer todos los filtros",
			clean: "Limpiar",
		},
		results: "Mostrando <strong>{{shown}}</strong> de {{total}} Amiibos",
		noMatches: "Ningún amiibo coincide con tus filtros.",
		empty: {
			title: "Tu colección está vacía",
			subtitle: "¡Ve a la página Desbloquear para conseguir tu primer Amiibo!",
		},
	},
	card: {
		addFavorite: "Añadir {{name}} a favoritos",
		removeFavorite: "Quitar {{name}} de favoritos",
		seeDetails: "Ver detalles de {{name}}",
		closeDetails: "Cerrar detalles",
		series: "Saga",
		unlocked: "Desbloqueado",
		released: "Lanzamiento",
		notAvailable: "N/D",
		unknown: "Desconocido",
		tapToClose: "Toca para cerrar",
	},
	notification: {
		body: "🎁 ¡Tu regalo está listo! Haz clic para desbloquear un nuevo Amiibo.",
	},
};

export default es;
