import type { Dict } from './index';

export const en: Dict = {
	pageTitle: 'Your recap · 20 km of Brussels 2026',
	pageDescription:
		'Discover your personal recap of the 20 km of Brussels 2026: finish time, ranking, pacing and comparisons.',
	loadError: (msg) => `Couldn’t load the results: ${msg}`,
	navBack: 'Previous slide',
	navToSearch: 'Back to search',
	navNext: 'Next slide',
	sourceLine: 'Source: 20 km of Brussels · ACN Timing · 31/05/2026',

	search: {
		eyebrow: '20 km of Brussels · your recap',
		lede: 'Enter <em>your name</em> or your <em>bib number</em>.',
		fieldLabel: 'Runner’s name or bib number',
		placeholder: 'First name LAST or bib',
		clear: 'Clear search',
		ctaLoading: 'Loading…',
		ctaSearching: 'Searching…',
		cta: 'See my recap',
		netError: 'Couldn’t reach the results service right now. Please try again in a moment.',
		noMatch: (q) => `No exact match for “${q}”.`,
		hintBib: 'Double-check your bib number.',
		hintName:
			'Check the spelling (first name then LAST NAME, as on your bib), or try your bib number.',
		disambig: 'Several runners share this name. Pick yours:',
		legalPrefix:
			'No data is stored. Your input stays in your browser. Official results: ',
		legalSource: 'ACN Timing'
	},

	cover: {
		eyebrow: '20 km of Brussels · 2026 edition',
		lede: (n) => `${n} people crossed the finish line.`,
		ledeAfter: 'And you were one of them.',
		signature: 'Well done. Here’s your race, in numbers.'
	},

	country: {
		eyebrow: 'On the Brussels start line',
		lede: (n, demo, flag, isHome) =>
			`You were <strong class="mono">1</strong> of <strong class="mono">${n}</strong> <span class="flag">${flag}</span> ${demo}. ` +
			(isHome
				? '<em>Brussels was playing at home.</em>'
				: '<em>You made the trip. Respect.</em>'),
		ledeFallback: (c) => `<strong class="mono">${c}</strong> nationalities were on the start line.`,
		sub: (c) => `<strong class="mono">${c}</strong> nationalities in total on the start line.`
	},

	gender: {
		eyebrow: 'Runners of your gender',
		lede: (othersN, noun) =>
			`You weren’t alone. ` +
			`<strong class="hot mono">${othersN}</strong> other ${noun}, of every age, ran with you.`,
		ledeFallback: (total) => `You were among the ${total} finishers.`,
		ariaBar: 'Women / men split among finishers',
		labelF: 'Women',
		labelM: 'Men',
		sub: (total) => `All together: <strong class="mono">${total}</strong> people.`,
		subGap: (gap) =>
			`Between the men’s and women’s median times: <strong class="mono">${gap} min</strong> apart.`
	},

	ageBand: {
		eyebrow: 'Your gender and age',
		lede: (n, band) =>
			`Among them, <strong class="mono">${n}</strong> also shared your age group ` +
			`(<em class="accent">${band}</em>).`,
		ledeFallback: 'No peers identified in your age group this year.',
		legendAll: 'All age groups',
		legendMine: (band) => `Your group (${band})`
	},

	catBreakdown: {
		eyebrow: 'All genders and ages combined',
		ledeShare: (n, band, pct) =>
			`You were among the <strong class="mono">${n}</strong> runners ${band}, ` +
			`that’s <strong class="mono">${pct}%</strong> of all finishers. ` +
			`<em>Every generation was there, you included.</em>`,
		ledeRare: (n, band) =>
			`You were among the <strong class="mono">${n}</strong> runners ${band}. ` +
			`<em>A rare group. You go the distance.</em>`,
		ledeFallback: 'Here are all the age groups, women and men combined.',
		legendF: 'Women',
		legendM: 'Men',
		legendMine: 'Your group'
	},

	chrono: {
		eyebrow: 'And you finished in',
		sub: '20 km in the legs. <em>Hats off for that time.</em>',
		fastestAllLabel: 'Fastest of the day',
		fastestCatLabel: 'Fastest in your category',
		fastestF: 'women',
		fastestM: 'men'
	},

	pace: {
		eyebrow: 'At an average pace of',
		unit: '/km',
		intro: '20 km held at that pace.',
		faster: (cat) => `Faster than half of the ${cat}. Nice tempo.`,
		slower: (cat) =>
			`Half of the ${cat} finished faster, but you went the distance, and that’s what counts.`,
		even: (cat) => `Right on the median pace of the ${cat}. Dead centre.`
	},

	rank: {
		eyebrow: 'In the overall ranking',
		sub: (total) => `out of <strong class="hot mono">${total}</strong> finishers.`,
		won: 'Nobody ahead of you. You won.',
		podium: 'On the podium. Hats off.',
		top100: 'In the top 100. Strong.',
		nearLast: 'You made it to the end. That’s all that matters.',
		generic: (pct) =>
			`You finished ahead of <strong class="mono">${pct}%</strong> of the field. Solid.`
	},

	finishDist: {
		eyebrow: 'You in the distribution',
		lede: (total) =>
			`Each bar is the number of runners for one minute of finish time. ` +
			`<strong class="mono">${total}</strong> in total, women in light, men in dark. ` +
			`The white line is you: <em>further left, faster.</em>`,
		you: 'you',
		legendF: 'Women',
		legendM: 'Men',
		legendYou: 'You'
	},

	catDist: {
		eyebrow: 'And within your category',
		medianLabel: 'median',
		legendCat: 'Runners in your category',
		legendMedian: (tm) => `Median (${tm})`,
		legendYou: (tm) => `You (${tm})`,
		callout: (others) =>
			`<strong class="mono">${others}</strong> others finished in the same minute as you. You were in good company.`,
		you: 'you'
	},

	split: {
		eyebrow: 'Your two race halves',
		unknown: 'No 10 km split this year. No analysis possible.',
		negative: (s) =>
			`<em>Negative split</em>: <strong class="mono">${s} s/km</strong> faster over the last 10 km. ` +
			`<em>Huge. You stepped it up.</em>`,
		positive: (s) =>
			`<strong class="mono">${s} s/km</strong> slower over the last 10 km. ` +
			`<em>Normal over 20 km. What matters is you finished it.</em>`,
		even: '<em>No drift</em> between the two halves. <em>Metronome. Bravo.</em>',
		zoneSlower: '2nd half slower',
		zoneFaster: '2nd half faster',
		axisFirst: 'Time on the 1st 10 km',
		axisSecond: 'Time on the 2nd 10 km',
		leg1: '1st 10 km',
		leg2: '2nd 10 km',
		you: 'you'
	},

	speed: {
		eyebrow: 'Your speed, kilometre by kilometre',
		unit: 'km/h',
		decimal: '.',
		lede: (phrase, kmh) =>
			`Your slowest stretch: <em class="hot">${phrase}</em> (${kmh} km/h). ` +
			`<em>Everyone has their rough patch. You got through yours.</em>`,
		ledeFallback: 'Not enough splits this year to break down your speed by section.',
		phraseFirst: (km) => `over the first ${km} km`,
		phraseLast: (km) => `over the last ${km} km`,
		phraseBetween: (from, to) => `between ${from} and ${to} km`,
		legendFast: 'Your fastest section',
		legendSlow: 'The slowest'
	},

	rankProgress: {
		eyebrow: 'Your race through the field',
		gainedLate: (n) =>
			`On the finish, you passed <strong class="mono">${n}</strong> runners. <em>You finished strong.</em>`,
		gainedNet: (n) =>
			`From start to finish, you climbed <strong class="mono">${n}</strong> places. <em>Smartly run.</em>`,
		lostLate: (n) =>
			`You kept a steady pace and slipped <strong class="mono">${n}</strong> places near the end. <em>The 20 km wears you down, it’s normal.</em>`,
		held: 'From start to finish, you held your place in the field. <em>Metronome.</em>',
		fallback: 'Not enough splits this year to trace your progress through the field.',
		better: 'better',
		finishLabel: 'Finish'
	},

	share: {
		label: 'This is your race. Share it with pride.',
		bib: 'Bib',
		rankGeneral: 'Overall ranking',
		paceAvg: 'Average pace',
		shareCta: 'Spread the word',
		restart: 'Search for someone else',
		shareTitleWon: (tt) => `I won the 20 km of Brussels in ${tt}!`,
		shareTitleTop100: (pos, tt, n) =>
			`I finished ${ordinal(pos)} in the 20 km of Brussels in ${tt}, out of ${n} finishers.`,
		shareTitleGeneric: (tt, top, n) =>
			`I ran the 20 km of Brussels in ${tt}, in the top ${top}% out of ${n} finishers.`,
		shareDefault: 'My personal recap of the 20 km of Brussels 2026',
		shareGroup: 'Share',
		shareOn: (net) => `Share on ${net}`,
		copy: 'Copy link',
		copied: 'Link copied'
	},

	genderLabel: { F: 'women', M: 'men', X: 'non-binary' },
	ageLabel: {
		U20: 'under 20',
		'20': 'aged 20 to 39',
		'40': 'aged 40 to 49',
		'50': 'aged 50 to 59',
		'60': 'aged 60 to 69',
		'70': 'aged 70 to 79',
		'80': 'aged 80 and over'
	},
	kmLabel: (km) => `${String(km).replace('.', '.')} km`,
	finishLabel: 'Finish'
};

function ordinal(n: number): string {
	const s = ['th', 'st', 'nd', 'rd'];
	const v = n % 100;
	return n + (s[(v - 20) % 10] ?? s[v] ?? s[0]);
}
