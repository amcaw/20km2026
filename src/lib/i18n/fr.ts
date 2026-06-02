import type { Dict } from './index';

export const fr: Dict = {
	pageTitle: 'Récap personnel · 20 km de Bruxelles 2026',
	pageDescription:
		'Découvrez votre récap personnel des 20 km de Bruxelles 2026 : chrono, classement, gestion d’effort et comparaisons.',
	loadError: (msg) => `Impossible de charger les résultats : ${msg}`,
	navBack: 'Slide précédente',
	navToSearch: 'Retour à la recherche',
	navNext: 'Slide suivante',
	sourceLine: 'Source : 20 km de Bruxelles · ACN Timing · 31/05/2026',

	search: {
		eyebrow: '20 km de Bruxelles · récap personnel',
		lede: 'Tapez <em>votre nom</em> ou votre <em>numéro de dossard</em>.',
		fieldLabel: 'Nom du coureur ou numéro de dossard',
		placeholder: 'Prénom NOM ou dossard',
		clear: 'Effacer la recherche',
		ctaLoading: 'Chargement…',
		ctaSearching: 'Recherche…',
		cta: 'Voir mon récap',
		netError:
			'Impossible de joindre le service de résultats pour l’instant. Réessayez dans un moment.',
		noMatch: (q) => `Aucun résultat exact pour « ${q} ».`,
		hintBib: 'Vérifiez votre numéro de dossard.',
		hintName:
			'Vérifiez l’orthographe (prénom puis NOM, comme sur le dossard), ou essayez votre numéro de dossard.',
		scope: 'Coureurs et participants. Les marcheurs ont leur propre classement.',
		scopeBefore: 'Coureurs et participants. Pour les marcheurs, voir leur ',
		scopeWalkers: 'classement dédié',
		scopeAfter: '.',
		disambig: 'Plusieurs coureurs portent ce nom. Choisissez le vôtre :',
		credit: 'Développement et récit par Ambroise Carton pour Décrypte',
		legalPrefix:
			'Aucune donnée n’est conservée. La saisie reste dans votre navigateur. Résultats officiels : ',
		legalSource: 'ACN Timing'
	},

	cover: {
		eyebrow: '20 km de Bruxelles · édition 2026',
		lede: (n, isPara) =>
			isPara
				? `${n} participants au classement handisport ont franchi la ligne d’arrivée.`
				: `${n} personnes ont franchi la ligne d’arrivée.`,
		ledeAfter: 'Et vous en faisiez partie.',
		signature: 'Bravo. Voici votre course, en chiffres.'
	},

	country: {
		eyebrow: 'Au départ de Bruxelles',
		lede: (n, demo, flag, isHome) =>
			`Vous étiez <strong class="mono">1</strong> des <strong class="mono">${n}</strong> <span class="flag">${flag}</span> ${demo}. ` +
			(isHome
				? '<em>Bruxelles jouait à domicile.</em>'
				: '<em>Vous avez fait le déplacement. Respect.</em>'),
		ledeFallback: (c) => `<strong class="mono">${c}</strong> nationalités étaient au départ.`,
		sub: (c) =>
			`<strong class="mono">${c}</strong> nationalités au total sur la ligne de départ.`
	},

	gender: {
		eyebrow: 'Coureurs de votre sexe',
		lede: (othersN, noun, g, isPara) =>
			`Vous n’étiez pas ${g === 'F' ? 'seule' : 'seul'}. ` +
			(isPara
				? `<strong class="hot mono">${othersN}</strong> autres participants, tous âges confondus, ont terminé le parcours avec vous.`
				: `<strong class="hot mono">${othersN}</strong> autres ${noun}, tous âges confondus, ont couru avec vous.`),
		ledeFallback: (total) => `Vous étiez parmi les ${total} finishers.`,
		ariaBar: 'Répartition F / M parmi les finishers',
		labelF: 'Femmes',
		labelM: 'Hommes',
		sub: (total) => `Tous ensemble : <strong class="mono">${total}</strong> personnes.`,
		subGap: (gap) =>
			`Entre le temps médian des hommes et celui des femmes : <strong class="mono">${gap} min</strong> d’écart.`
	},

	ageBand: {
		eyebrow: 'Votre sexe et votre âge',
		lede: (n, band, g, isPara) =>
			`Parmi ${g === 'F' ? 'elles' : 'eux'}, <strong class="mono">${n}</strong> ${isPara ? 'participants' : g === 'F' ? 'coureuses' : 'coureurs'} partageaient aussi votre tranche d’âge ` +
			`(<em class="accent">${band}</em>).`,
		ledeFallback: 'Pas de pairs identifiés dans votre classe d’âge cette année.',
		legendAll: 'Toutes les classes d’âge',
		legendMine: (band) => `Votre classe (${band})`
	},

	catBreakdown: {
		eyebrow: 'Tous sexes et âges confondus',
		ledeShare: (n, band, pct, isPara) =>
			`Vous étiez parmi les <strong class="mono">${n}</strong> ${isPara ? 'participants' : 'coureurs'} ${band}, ` +
			`soit <strong class="mono">${pct}%</strong> de tous les finishers. ` +
			`<em>Toutes les générations étaient là, vous compris.</em>`,
		ledeRare: (n, band, isPara) =>
			`Vous étiez parmi les <strong class="mono">${n}</strong> ${isPara ? 'participants' : 'coureurs'} ${band}. ` +
			`<em>Une tranche rare. Vous tenez la distance.</em>`,
		ledeFallback: 'Voici toutes les tranches d’âge, hommes et femmes réunis.',
		legendF: 'Femmes',
		legendM: 'Hommes',
		legendMine: 'Votre classe'
	},

	chrono: {
		eyebrow: 'Et vous avez fini en',
		sub: '20 km dans les jambes. <em>Chapeau pour le chrono.</em>',
		subPara: '20 km bouclés. <em>Chapeau pour le chrono.</em>',
		fastestAllLabel: 'Plus rapides du jour',
		fastestCatLabel: 'Plus rapides de votre catégorie',
		fastestF: 'femmes',
		fastestM: 'hommes'
	},

	pace: {
		eyebrow: 'À l’allure moyenne de',
		unit: '/km',
		intro: '20 km tenus à ce rythme.',
		faster: (cat) => `Plus rapide que la moitié des ${cat}. Joli tempo.`,
		slower: (cat, g) =>
			`La moitié des ${cat} a fini plus vite, mais vous êtes ${g === 'F' ? 'allée' : 'allé'} au bout, et c’est l’essentiel.`,
		even: (cat) => `Pile l’allure médiane des ${cat}. Pile au centre.`
	},

	rank: {
		eyebrow: 'Au classement, ça donne',
		sub: (total) => `sur <strong class="hot mono">${total}</strong> finishers.`,
		won: 'Personne devant vous. Vous avez gagné.',
		podium: 'Sur le podium. Chapeau.',
		top100: 'Dans le top 100. Costaud.',
		nearLast: 'Vous avez tenu jusqu’au bout. C’est tout ce qui compte.',
		generic: (pct) =>
			`Vous avez fini devant <strong class="mono">${pct}%</strong> des participants. Solide.`
	},

	finishDist: {
		eyebrow: 'Vous dans la distribution',
		lede: (total) =>
			`Chaque barre, c’est le nombre de coureurs pour une minute de chrono. ` +
			`<strong class="mono">${total}</strong> au total, femmes en clair, hommes en foncé. ` +
			`La ligne blanche, c’est vous : <em>plus à gauche, plus rapide.</em>`,
		you: 'vous',
		legendF: 'Femmes',
		legendM: 'Hommes',
		legendYou: 'Vous'
	},

	catDist: {
		eyebrow: 'Et dans votre catégorie',
		medianLabel: 'médiane',
		legendCat: 'Coureurs de votre catégorie',
		legendMedian: (tm) => `Médiane (${tm})`,
		legendYou: (tm) => `Vous (${tm})`,
		callout: (others) =>
			`<strong class="mono">${others}</strong> autres ont fini dans la même minute que vous. Vous étiez en bonne compagnie.`,
		you: 'vous'
	},

	split: {
		eyebrow: 'Vos deux moitiés de course',
		unknown: 'Pas de temps intermédiaire au 10 km cette année. Pas d’analyse possible.',
		negative: (s, g) =>
			`<em>Negative split</em> : <strong class="mono">${s} s/km</strong> plus vite sur les 10 derniers km. ` +
			`<em>Énorme. Vous êtes ${g === 'F' ? 'montée' : 'monté'} en puissance.</em>`,
		positive: (s) =>
			`<strong class="mono">${s} s/km</strong> de plus sur les 10 derniers km. ` +
			`<em>Normal sur 20 km. L’important, c’est que vous l’ayez bouclé.</em>`,
		even: '<em>Aucune dérive</em> entre les deux moitiés. <em>Du métronome. Bravo.</em>',
		zoneSlower: '2e moitié plus lente',
		zoneFaster: '2e moitié plus rapide',
		axisFirst: 'Temps sur le 1er 10 km',
		axisSecond: 'Temps sur le 2e 10 km',
		leg1: '1er 10 km',
		leg2: '2e 10 km',
		you: 'vous'
	},

	speed: {
		eyebrow: 'Votre vitesse, kilomètre après kilomètre',
		unit: 'km/h',
		decimal: ',',
		lede: (phrase, kmh) =>
			`Votre passage le plus lent : <em class="hot">${phrase}</em> (${kmh} km/h). ` +
			`<em>Tout le monde a son moment difficile. Vous l’avez surmonté.</em>`,
		ledeFallback:
			'Pas assez de temps intermédiaires cette année pour détailler votre vitesse par tronçon.',
		phraseFirst: (km) => `sur les ${km} premiers km`,
		phraseLast: (km) => `dans les ${km} derniers km`,
		phraseBetween: (from, to) => `entre ${from} et ${to} km`,
		legendFast: 'Votre tronçon le plus rapide',
		legendSlow: 'Le plus lent'
	},

	rankProgress: {
		eyebrow: 'Votre course dans le peloton',
		gainedLate: (n, isPara) =>
			`Sur la fin, vous avez doublé <strong class="mono">${n}</strong> ${isPara ? 'participants' : 'coureurs'}. <em>Vous avez fini en force.</em>`,
		gainedNet: (n, _isPara) =>
			`Du départ à l’arrivée, vous avez remonté <strong class="mono">${n}</strong> places. <em>Belle gestion.</em>`,
		lostLate: (n, _isPara) =>
			`Vous avez tenu un rythme régulier et laissé filer <strong class="mono">${n}</strong> places sur la fin. <em>Le 20 km use, c’est normal.</em>`,
		held: 'Du début à la fin, vous avez gardé votre place dans le peloton. <em>Du métronome.</em>',
		fallback:
			'Pas assez de temps intermédiaires cette année pour retracer votre progression dans le peloton.',
		better: 'mieux',
		finishLabel: 'Arrivée'
	},

	share: {
		label: 'C’est votre course. Partagez-la fièrement.',
		bib: 'Dossard',
		rankGeneral: 'Classement général',
		paceAvg: 'Allure moyenne',
		shareCta: 'Faites-le savoir',
		restart: 'Chercher quelqu’un d’autre',
		noteBefore: 'Cette page se contente d’afficher les résultats publics des 20 km de Bruxelles, récupérés en direct depuis le site officiel ',
		noteSource: 'acn-timing.com',
		noteAfter: ', seul hébergeur des données des participants. Aucune donnée personnelle n’est stockée par cette page. Les traductions néerlandaise et anglaise ont été réalisées à l’aide de l’intelligence artificielle.',
		shareTitleWon: (tt) => `J’ai gagné les 20 km de Bruxelles en ${tt} !`,
		shareTitleTop100: (pos, tt, n) =>
			`J’ai fini ${pos}e des 20 km de Bruxelles en ${tt}, sur ${n} finishers.`,
		shareTitleGeneric: (tt, top, n) =>
			`J’ai couru les 20 km de Bruxelles en ${tt}, dans le top ${top}% sur ${n} finishers.`,
		shareDefault: 'Mon récap personnel des 20 km de Bruxelles 2026',
		shareGroup: 'Partager',
		shareOn: (net) => `Partager sur ${net}`,
		copy: 'Copier le lien',
		copied: 'Lien copié'
	},

	genderLabel: { F: 'femmes', M: 'hommes', X: 'non-binaires' },
	ageLabel: {
		U20: 'de moins de 20 ans',
		'20': 'de 20 à 39 ans',
		'40': 'de 40 à 49 ans',
		'50': 'de 50 à 59 ans',
		'60': 'de 60 à 69 ans',
		'70': 'de 70 à 79 ans',
		'80': 'de 80 ans et plus'
	},
	kmLabel: (km) => `${String(km).replace('.', ',')} km`,
	finishLabel: 'Arrivée'
};
