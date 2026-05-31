import { base } from '$app/paths';

export type Finisher = {
	pos: number;
	gender: 'F' | 'M' | 'X';
	bib: number;
	name: string;
	team: string | null;
	country: string | null;
	category: string;
	t55: number | null;
	t10: number | null;
	t15: number | null;
	t: number;
	pos55: number | null;
	pos10: number | null;
	pos15: number | null;
	catRank: number | null;
};

export type Histogram = { domain: [number, number]; binSec: number; counts: number[] };

export type CategoryStats = {
	n: number;
	medianTime: number;
	p10: number;
	p25: number;
	p75: number;
	p90: number;
	fastest: number;
	slowest: number;
	hist: Histogram;
};

export type RankCurve = { size: number; times: number[] };

export type WrappedStats = {
	global: Omit<CategoryStats, 'hist'> & { total: number };
	byCategory: Record<string, CategoryStats>;
	byGender: Record<'F' | 'M', { n: number; medianTime: number; p25: number; p75: number }>;
	byCountry: Record<string, number>;
	countriesCount: number;
	finishHist: {
		domain: [number, number];
		binSec: number;
		women: number[];
		men: number[];
		womenMedian: number | null;
		menMedian: number | null;
	};
	splitCloud: [number, number][];
	genderRankCurve: Record<'F' | 'M', RankCurve>;
};

let _stats: WrappedStats | null = null;

export async function loadStats(): Promise<WrappedStats> {
	if (_stats) return _stats;
	const url = `${base}/data/wrapped/stats.json`;
	const r = await fetch(url);
	if (!r.ok) throw new Error(`${url}: ${r.status}`);
	_stats = (await r.json()) as WrappedStats;
	return _stats;
}

const API_URL =
	'https://results.chronorace.be/api/results/table/search/20260531_20km/LIVE1';

const API_COL = {
	pos: 'sR_Pos',
	bib: 'sI_w500_#NR',
	gender: 'sH_#GENDER',
	name: '#NAME',
	country: 'dI_sC_#NOC',
	t55: 'w500_gkm5,5_Time',
	t10: 'w500_gkm10_Time',
	t15: 'w500_gkm15_Time',
	pos55: 'sR_w700_gkm5,5_Pos',
	pos10: 'sR_w700_gkm10_Pos',
	pos15: 'sR_w700_gkm15_Pos',
	time: 'sR_#TIME',
	catRank: 'gCateg_w700_sR_Rang',
	category: 'gCateg_w700_#CAT'
} as const;

function parseTimeStr(s: string): number | null {
	if (!s || s === '0:00:00' || s === '-') return null;
	const parts = s.split(':').map(Number);
	if (parts.length === 3) return parts[0] * 3600 + parts[1] * 60 + parts[2];
	if (parts.length === 2) return parts[0] * 60 + parts[1];
	return null;
}

function parseIntLoose(s: string): number | null {
	if (!s) return null;
	const n = parseInt(String(s).replace(/[^\d]/g, ''), 10);
	return Number.isFinite(n) ? n : null;
}

function firstBold(html: string): string {
	const m = String(html).match(/<b>(.*?)<\/b>/);
	return m ? m[1].trim() : String(html).replace(/<[^>]+>/g, ' ').trim();
}

function rowToFinisher(row: unknown[], idx: Record<string, number>): Finisher | null {
	const cell = (key: keyof typeof API_COL): string => {
		const i = idx[API_COL[key]];
		const v = i == null ? null : row[i];
		return v == null ? '' : String(v);
	};
	const t = parseTimeStr(firstBold(cell('time')));
	if (t == null) return null;

	const nameHtml = cell('name');
	const name = firstBold(nameHtml);
	const teamMatch = nameHtml.match(/<small>(.*?)<\/small>/);
	const team = teamMatch ? teamMatch[1].replace(/<[^>]+>/g, '').trim() || null : null;
	const flagMatch = cell('country').match(/flags\/(\w+)\.png/);
	const country = flagMatch ? flagMatch[1].toUpperCase() : null;

	const gender = cell('gender');
	return {
		pos: parseIntLoose(cell('pos')) ?? 0,
		gender: gender === 'F' || gender === 'M' || gender === 'X' ? gender : 'X',
		bib: parseIntLoose(cell('bib')) ?? 0,
		name,
		team,
		country,
		category: cell('category'),
		t55: parseTimeStr(cell('t55')),
		t10: parseTimeStr(cell('t10')),
		t15: parseTimeStr(cell('t15')),
		pos55: parseIntLoose(cell('pos55')),
		pos10: parseIntLoose(cell('pos10')),
		pos15: parseIntLoose(cell('pos15')),
		t,
		catRank: parseIntLoose(cell('catRank'))
	};
}

export async function search(query: string): Promise<Finisher[]> {
	const trimmed = query.trim();
	const asBib = /^\d+$/.test(trimmed) ? Number(trimmed) : null;
	const q = norm(query);
	if (asBib == null && q.length < 3) return [];

	const url = `${API_URL}?srch=${encodeURIComponent(trimmed)}&fromRecord=0&pageSize=50`;
	const r = await fetch(url);
	if (!r.ok) throw new Error(`Chronorace API: ${r.status}`);
	const data = (await r.json()) as {
		TableDefinition?: { Columns?: { Name: string }[] };
		Groups?: { SlaveRows?: unknown[][] }[];
	};
	const cols = data.TableDefinition?.Columns ?? [];
	const idx: Record<string, number> = {};
	cols.forEach((c, i) => (idx[c.Name] = i));

	const out: Finisher[] = [];
	for (const g of data.Groups ?? []) {
		for (const row of g.SlaveRows ?? []) {
			const f = rowToFinisher(row, idx);
			if (!f) continue;
			if (!/^[FMX](U20|\d{2})$/.test(f.category)) continue;
			const hit = asBib != null ? f.bib === asBib : norm(f.name) === q;
			if (hit) out.push(f);
		}
	}
	return out;
}

function norm(s: string): string {
	return s
		.normalize('NFD')
		.replace(/\p{Diacritic}/gu, '')
		.toLowerCase()
		.trim()
		.replace(/\s+/g, ' ');
}

export function speedKmh(t: number): number {
	const TOTAL_KM = 20.04;
	return (TOTAL_KM / t) * 3600;
}

export function fasterThanPct(me: Finisher, total: number): number {
	return Math.round(((total - me.pos) / total) * 100);
}

export function genderRank(curve: RankCurve, me: Finisher): { rank: number; size: number } {
	const { size, times } = curve;
	if (!times.length) return { rank: 1, size: 0 };
	let lo = 0;
	let hi = times.length;
	while (lo < hi) {
		const mid = (lo + hi) >> 1;
		if (times[mid] < me.t) lo = mid + 1;
		else hi = mid;
	}
	const rank = Math.round((lo / times.length) * size) + 1;
	return { rank: Math.min(rank, size), size };
}

export function fmtThousands(n: number): string {
	if (Math.abs(n) < 10000) return String(n);
	return String(n).replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}

export function fmtTime(sec: number | null): string {
	if (sec == null) return '—';
	const h = Math.floor(sec / 3600);
	const m = Math.floor((sec % 3600) / 60);
	const s = sec % 60;
	if (h > 0) return `${h}h${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
	return `${m}:${String(s).padStart(2, '0')}`;
}

export function fmtPace(secPerKm: number | null): string {
	if (secPerKm == null || !isFinite(secPerKm) || secPerKm <= 0) return '—';
	const m = Math.floor(secPerKm / 60);
	const s = Math.round(secPerKm % 60);
	const mm = s === 60 ? m + 1 : m;
	const ss = s === 60 ? 0 : s;
	return `${mm}:${String(ss).padStart(2, '0')}`;
}

export function paceFor(t: number, km: number): number {
	return t / km;
}

export function splitProfile(me: Finisher): {
	firstHalfPace: number | null;
	secondHalfPace: number | null;
	deltaSecPerKm: number | null;
	kind: 'negative' | 'positive' | 'even' | 'unknown';
} {
	if (me.t10 == null) {
		return { firstHalfPace: null, secondHalfPace: null, deltaSecPerKm: null, kind: 'unknown' };
	}
	const first = paceFor(me.t10, 10);
	const second = paceFor(me.t - me.t10, 10);
	const delta = second - first;
	let kind: 'negative' | 'positive' | 'even' = 'even';
	if (Math.abs(delta) < 5) kind = 'even';
	else if (delta < 0) kind = 'negative';
	else kind = 'positive';
	return { firstHalfPace: first, secondHalfPace: second, deltaSecPerKm: delta, kind };
}

const AGE_LABEL: Record<string, string> = {
	U20: 'moins de 20 ans',
	'20': '20–29 ans',
	'30': '30–39 ans',
	'40': '40–49 ans',
	'50': '50–59 ans',
	'60': '60–69 ans',
	'70': '70 ans et plus',
	'80': '80 ans et plus'
};
const GENDER_LABEL: Record<string, string> = {
	F: 'femmes',
	M: 'hommes',
	X: 'non-binaires'
};

export function categoryLabel(cat: string): string {
	const m = cat.match(/^([FMX])(U20|\d{2})$/);
	if (!m) return cat;
	const [, g, age] = m;
	return `${GENDER_LABEL[g] ?? g} ${AGE_LABEL[age] ?? age}`;
}
