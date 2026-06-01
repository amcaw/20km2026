/**
 * Centralised UI strings for the wrapped recap, in FR / EN / NL.
 *
 * Dynamic phrases (gender agreement, plurals, interpolated numbers) are
 * functions rather than flat strings, so each language renders them
 * idiomatically — French agrees gender ("allée"/"allé"), English and Dutch
 * usually don't, and the function bodies encode that per language.
 *
 * Components read the active dictionary via `t()` (see `useT`), keyed off
 * the reactive `lang` store.
 */
import { lang, type Lang } from './lang.svelte';

export type Gender = 'F' | 'M' | 'X';

export type Dict = {
	// --- generic / nav ---
	pageTitle: string;
	pageDescription: string;
	loadError: (msg: string) => string;
	navBack: string;
	navToSearch: string;
	navNext: string;
	sourceLine: string;

	// --- search slide ---
	search: {
		eyebrow: string;
		lede: string; // may contain <em> markup
		fieldLabel: string;
		placeholder: string;
		clear: string;
		ctaLoading: string;
		ctaSearching: string;
		cta: string;
		netError: string;
		noMatch: (query: string) => string;
		hintBib: string;
		hintName: string;
		scope: string; // "runners only, not walkers / handisport"
		disambig: string;
		credit: string; // "par Ambroise Carton" byline shown above the legal line
		legalPrefix: string; // "Aucune donnée…" up to the source link
		legalSource: string; // link text "ACN Timing"
	};

	// --- cover ---
	cover: {
		eyebrow: string;
		lede: (n: string) => string; // n already formatted; returns HTML before "Et vous…"
		ledeAfter: string;
		signature: string;
	};

	// --- country ---
	country: {
		eyebrow: string;
		lede: (n: string, demo: string, flag: string, isHome: boolean) => string; // HTML
		ledeFallback: (countries: string) => string;
		sub: (countries: string) => string;
	};

	// --- gender ---
	gender: {
		eyebrow: string;
		lede: (othersN: string, genderNoun: string, g: Gender) => string;
		ledeFallback: (total: string) => string;
		ariaBar: string;
		labelF: string;
		labelM: string;
		sub: (total: string) => string;
		subGap: (gapMin: number) => string;
	};

	// --- age band ---
	ageBand: {
		eyebrow: string;
		lede: (n: string, bandLabel: string, g: Gender) => string;
		ledeFallback: string;
		legendAll: string;
		legendMine: (bandLabel: string) => string;
	};

	// --- category breakdown ---
	catBreakdown: {
		eyebrow: string;
		ledeShare: (n: string, bandLabel: string, pct: number) => string;
		ledeRare: (n: string, bandLabel: string) => string;
		ledeFallback: string;
		legendF: string;
		legendM: string;
		legendMine: string;
	};

	// --- chrono ---
	chrono: {
		eyebrow: string;
		sub: string;
		fastestAllLabel: string;
		fastestCatLabel: string;
		fastestF: string;
		fastestM: string;
	};

	// --- pace ---
	pace: {
		eyebrow: string;
		unit: string;
		intro: string;
		faster: (cat: string) => string;
		slower: (cat: string, g: Gender) => string;
		even: (cat: string) => string;
	};

	// --- rank ---
	rank: {
		eyebrow: string;
		sub: (total: string) => string;
		won: string;
		podium: string;
		top100: string;
		nearLast: string;
		generic: (pct: number) => string;
	};

	// --- finish-time distribution ---
	finishDist: {
		eyebrow: string;
		lede: (total: string) => string;
		you: string;
		legendF: string;
		legendM: string;
		legendYou: string;
	};

	// --- category distribution ---
	catDist: {
		eyebrow: string;
		medianLabel: string;
		legendCat: string;
		legendMedian: (t: string) => string;
		legendYou: (t: string) => string;
		callout: (others: string) => string;
		you: string;
	};

	// --- split ---
	split: {
		eyebrow: string;
		unknown: string;
		negative: (sPerKm: number, g: Gender) => string;
		positive: (sPerKm: number) => string;
		even: string;
		zoneSlower: string;
		zoneFaster: string;
		axisFirst: string;
		axisSecond: string;
		leg1: string;
		leg2: string;
		you: string;
	};

	// --- speed profile ---
	speed: {
		eyebrow: string;
		unit: string; // "km/h" / "km/u"
		decimal: string; // decimal separator for km / speed: "," or "."
		lede: (phrase: string, kmh: string) => string;
		ledeFallback: string;
		phraseFirst: (km: string) => string;
		phraseLast: (km: string) => string;
		phraseBetween: (from: string, to: string) => string;
		legendFast: string;
		legendSlow: string;
	};

	// --- rank progress ---
	rankProgress: {
		eyebrow: string;
		gainedLate: (n: string) => string;
		gainedNet: (n: string) => string;
		lostLate: (n: string) => string;
		held: string;
		fallback: string;
		better: string;
		finishLabel: string;
	};

	// --- share ---
	share: {
		label: string;
		bib: string;
		rankGeneral: string;
		paceAvg: string;
		shareCta: string;
		restart: string;
		noteBefore: string; // up to the acn-timing.com link
		noteSource: string; // link text "acn-timing.com"
		noteAfter: string; // after the link
		shareTitleWon: (t: string) => string;
		shareTitleTop100: (pos: number, t: string, n: string) => string;
		shareTitleGeneric: (t: string, top: number, n: string) => string;
		shareDefault: string;
		shareGroup: string;
		shareOn: (network: string) => string;
		copy: string;
		copied: string;
	};

	// --- category label parts ---
	genderLabel: Record<Gender, string>;
	ageLabel: Record<string, string>; // keys: U20,20,40,50,60,70,80
	// km checkpoint labels for the rank-progress chart
	kmLabel: (km: number) => string;
	finishLabel: string;
};

import { fr } from './fr';
import { en } from './en';
import { nl } from './nl';

const DICTS: Record<Lang, Dict> = { fr, en, nl };

/** The dictionary for the currently-selected language (reactive read). */
export function t(): Dict {
	return DICTS[lang.value];
}
