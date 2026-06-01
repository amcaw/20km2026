import type { Dict } from './index';

export const nl: Dict = {
	pageTitle: 'Jouw recap · 20 km van Brussel 2026',
	pageDescription:
		'Ontdek jouw persoonlijke recap van de 20 km van Brussel 2026: eindtijd, klassement, tempobeheer en vergelijkingen.',
	loadError: (msg) => `Kon de resultaten niet laden: ${msg}`,
	navBack: 'Vorige slide',
	navToSearch: 'Terug naar zoeken',
	navNext: 'Volgende slide',

	search: {
		eyebrow: '20 km van Brussel · jouw recap',
		lede: 'Typ <em>je naam</em> of je <em>borstnummer</em>.',
		fieldLabel: 'Naam van de loper of borstnummer',
		placeholder: 'Voornaam NAAM of nummer',
		clear: 'Zoekopdracht wissen',
		ctaLoading: 'Laden…',
		ctaSearching: 'Zoeken…',
		cta: 'Toon mijn recap',
		netError: 'Kan de resultatenservice momenteel niet bereiken. Probeer het zo opnieuw.',
		noMatch: (q) => `Geen exacte match voor “${q}”.`,
		hintBib: 'Controleer je borstnummer.',
		hintName:
			'Controleer de spelling (voornaam dan ACHTERNAAM, zoals op je borstnummer), of probeer je borstnummer.',
		disambig: 'Meerdere lopers dragen deze naam. Kies de jouwe:',
		legalPrefix:
			'Er worden geen gegevens bewaard. Je invoer blijft in je browser. Officiële resultaten: ',
		legalSource: 'ACN Timing'
	},

	cover: {
		eyebrow: '20 km van Brussel · editie 2026',
		lede: (n) => `${n} mensen kwamen over de finish.`,
		ledeAfter: 'En jij was erbij.',
		signature: 'Proficiat. Hier is jouw race, in cijfers.'
	},

	country: {
		eyebrow: 'Aan de start in Brussel',
		lede: (n, demo, flag, isHome) =>
			`Je was <strong class="mono">1</strong> van de <strong class="mono">${n}</strong> <span class="flag">${flag}</span> ${demo}. ` +
			(isHome
				? '<em>Brussel speelde thuis.</em>'
				: '<em>Je kwam van ver. Respect.</em>'),
		ledeFallback: (c) => `<strong class="mono">${c}</strong> nationaliteiten stonden aan de start.`,
		sub: (c) => `<strong class="mono">${c}</strong> nationaliteiten in totaal aan de start.`
	},

	gender: {
		eyebrow: 'Lopers van jouw geslacht',
		lede: (othersN, noun) =>
			`Je was niet alleen. ` +
			`<strong class="hot mono">${othersN}</strong> andere ${noun}, van alle leeftijden, liepen met je mee.`,
		ledeFallback: (total) => `Je was een van de ${total} finishers.`,
		ariaBar: 'Verdeling vrouwen / mannen onder de finishers',
		labelF: 'Vrouwen',
		labelM: 'Mannen',
		sub: (total) => `Allemaal samen: <strong class="mono">${total}</strong> mensen.`,
		subGap: (gap) =>
			`Tussen de mediane tijd van mannen en vrouwen: <strong class="mono">${gap} min</strong> verschil.`
	},

	ageBand: {
		eyebrow: 'Jouw geslacht en leeftijd',
		lede: (n, band) =>
			`Onder hen deelden <strong class="mono">${n}</strong> ook jouw leeftijdsgroep ` +
			`(<em class="accent">${band}</em>).`,
		ledeFallback: 'Geen leeftijdsgenoten gevonden in jouw categorie dit jaar.',
		legendAll: 'Alle leeftijdsgroepen',
		legendMine: (band) => `Jouw groep (${band})`
	},

	catBreakdown: {
		eyebrow: 'Alle geslachten en leeftijden samen',
		ledeShare: (n, band, pct) =>
			`Je was een van de <strong class="mono">${n}</strong> lopers ${band}, ` +
			`oftewel <strong class="mono">${pct}%</strong> van alle finishers. ` +
			`<em>Elke generatie was er, jij inclusief.</em>`,
		ledeRare: (n, band) =>
			`Je was een van de <strong class="mono">${n}</strong> lopers ${band}. ` +
			`<em>Een zeldzame groep. Jij houdt vol.</em>`,
		ledeFallback: 'Hier zijn alle leeftijdsgroepen, vrouwen en mannen samen.',
		legendF: 'Vrouwen',
		legendM: 'Mannen',
		legendMine: 'Jouw groep'
	},

	chrono: {
		eyebrow: 'En je finishte in',
		sub: '20 km in de benen. <em>Petje af voor die tijd.</em>',
		fastestAllLabel: 'Snelste van de dag',
		fastestCatLabel: 'Snelste in jouw categorie',
		fastestF: 'vrouwen',
		fastestM: 'mannen'
	},

	pace: {
		eyebrow: 'Aan een tempo van',
		unit: '/km',
		intro: '20 km volgehouden op dit tempo.',
		faster: (cat) => `Sneller dan de helft van de ${cat}. Mooi tempo.`,
		slower: (cat) =>
			`De helft van de ${cat} finishte sneller, maar jij ging tot het einde, en dat telt.`,
		even: (cat) => `Precies de mediane tijd van de ${cat}. Recht in het midden.`
	},

	rank: {
		eyebrow: 'In het klassement',
		sub: (total) => `op <strong class="hot mono">${total}</strong> finishers.`,
		won: 'Niemand voor je. Je hebt gewonnen.',
		podium: 'Op het podium. Petje af.',
		top100: 'In de top 100. Sterk.',
		nearLast: 'Je hebt het tot het einde volgehouden. Dat is wat telt.',
		generic: (pct) =>
			`Je finishte voor <strong class="mono">${pct}%</strong> van het deelnemersveld. Solide.`
	},

	finishDist: {
		eyebrow: 'Jij in de verdeling',
		lede: (total) =>
			`Elke balk is het aantal lopers voor één minuut eindtijd. ` +
			`<strong class="mono">${total}</strong> in totaal, vrouwen in het licht, mannen in het donker. ` +
			`De witte lijn ben jij: <em>meer naar links, sneller.</em>`,
		you: 'jij',
		legendF: 'Vrouwen',
		legendM: 'Mannen',
		legendYou: 'Jij'
	},

	catDist: {
		eyebrow: 'En binnen jouw categorie',
		medianLabel: 'mediaan',
		legendCat: 'Lopers in jouw categorie',
		legendMedian: (tm) => `Mediaan (${tm})`,
		legendYou: (tm) => `Jij (${tm})`,
		callout: (others) =>
			`<strong class="mono">${others}</strong> anderen finishten in dezelfde minuut als jij. Je was in goed gezelschap.`,
		you: 'jij'
	},

	split: {
		eyebrow: 'Jouw twee racehelften',
		unknown: 'Geen tussentijd op 10 km dit jaar. Geen analyse mogelijk.',
		negative: (s) =>
			`<em>Negatieve split</em>: <strong class="mono">${s} s/km</strong> sneller over de laatste 10 km. ` +
			`<em>Enorm. Je schakelde een tandje bij.</em>`,
		positive: (s) =>
			`<strong class="mono">${s} s/km</strong> trager over de laatste 10 km. ` +
			`<em>Normaal over 20 km. Wat telt is dat je het afmaakte.</em>`,
		even: '<em>Geen verschil</em> tussen de twee helften. <em>Metronoom. Bravo.</em>',
		zoneSlower: '2e helft trager',
		zoneFaster: '2e helft sneller',
		axisFirst: 'Tijd op de 1e 10 km',
		axisSecond: 'Tijd op de 2e 10 km',
		leg1: '1e 10 km',
		leg2: '2e 10 km',
		you: 'jij'
	},

	speed: {
		eyebrow: 'Jouw snelheid, kilometer na kilometer',
		unit: 'km/u',
		decimal: ',',
		lede: (phrase, kmh) =>
			`Jouw traagste stuk: <em class="hot">${phrase}</em> (${kmh} km/u). ` +
			`<em>Iedereen heeft zijn zware moment. Jij kwam erdoorheen.</em>`,
		ledeFallback: 'Niet genoeg tussentijden dit jaar om je snelheid per stuk uit te splitsen.',
		phraseFirst: (km) => `op de eerste ${km} km`,
		phraseLast: (km) => `op de laatste ${km} km`,
		phraseBetween: (from, to) => `tussen ${from} en ${to} km`,
		legendFast: 'Jouw snelste stuk',
		legendSlow: 'Het traagste'
	},

	rankProgress: {
		eyebrow: 'Jouw race door het veld',
		gainedLate: (n) =>
			`Op het einde haalde je <strong class="mono">${n}</strong> lopers in. <em>Je finishte sterk.</em>`,
		gainedNet: (n) =>
			`Van start tot finish klom je <strong class="mono">${n}</strong> plaatsen. <em>Slim gelopen.</em>`,
		lostLate: (n) =>
			`Je hield een gelijkmatig tempo aan en verloor <strong class="mono">${n}</strong> plaatsen op het einde. <em>De 20 km vreet aan je, dat is normaal.</em>`,
		held: 'Van start tot finish hield je je plaats in het veld. <em>Metronoom.</em>',
		fallback: 'Niet genoeg tussentijden dit jaar om je voortgang door het veld te tonen.',
		better: 'beter',
		finishLabel: 'Finish'
	},

	share: {
		label: 'Dit is jouw race. Deel ze met trots.',
		bib: 'Borstnummer',
		rankGeneral: 'Algemeen klassement',
		paceAvg: 'Gemiddeld tempo',
		shareCta: 'Laat het weten',
		restart: 'Iemand anders zoeken',
		shareTitleWon: (tt) => `Ik won de 20 km van Brussel in ${tt}!`,
		shareTitleTop100: (pos, tt, n) =>
			`Ik finishte ${pos}e in de 20 km van Brussel in ${tt}, op ${n} finishers.`,
		shareTitleGeneric: (tt, top, n) =>
			`Ik liep de 20 km van Brussel in ${tt}, in de top ${top}% op ${n} finishers.`,
		shareDefault: 'Mijn persoonlijke recap van de 20 km van Brussel 2026',
		shareGroup: 'Delen',
		shareOn: (net) => `Delen op ${net}`,
		copy: 'Link kopiëren',
		copied: 'Link gekopieerd'
	},

	genderLabel: { F: 'vrouwen', M: 'mannen', X: 'non-binair' },
	ageLabel: {
		U20: 'jonger dan 20',
		'20': 'van 20 tot 39 jaar',
		'40': 'van 40 tot 49 jaar',
		'50': 'van 50 tot 59 jaar',
		'60': 'van 60 tot 69 jaar',
		'70': 'van 70 tot 79 jaar',
		'80': 'van 80 jaar en ouder'
	},
	kmLabel: (km) => `${String(km).replace('.', ',')} km`,
	finishLabel: 'Finish'
};
