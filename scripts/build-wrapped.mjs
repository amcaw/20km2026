#!/usr/bin/env node
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { dirname, resolve, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(HERE, '..');
const CSV_PATH = resolve(ROOT, 'src/lib/assets/data/results_20km_2026.csv');
const OUT_DIR = resolve(ROOT, 'static/data/wrapped');

function parseTime(s) {
	if (!s || s === '0:00:00' || s === '-') return null;
	const parts = s.split(':').map(Number);
	if (parts.length === 3) return parts[0] * 3600 + parts[1] * 60 + parts[2];
	if (parts.length === 2) return parts[0] * 60 + parts[1];
	return null;
}

function parsePos(s) {
	if (!s) return null;
	const n = parseInt(String(s).replace(/[^\d]/g, ''), 10);
	return Number.isFinite(n) ? n : null;
}

console.log('— Loading', CSV_PATH);
const raw = readFileSync(CSV_PATH, 'utf8');
const lines = raw.split(/\r?\n/);
const header = lines[0].split(',');
const col = Object.fromEntries(header.map((h, i) => [h.trim(), i]));

const finishers = [];
let skipped = 0;
for (let i = 1; i < lines.length; i++) {
	if (!lines[i]) continue;
	const cols = lines[i].split(',');
	const finishSec = parseTime(cols[col.Time]);
	if (!finishSec) {
		skipped++;
		continue;
	}
	const cat = cols[col.Category] ?? '';
	if (!/^(F|M|X|FU?20|MU?20)\d{0,2}$|^[FMX]U20$|^[FMX]\d{2}$/.test(cat)) {
	}
	const validCat = /^[FMX](U20|\d{2})$/.test(cat);
	if (!validCat) {
		skipped++;
		continue;
	}
	finishers.push({
		pos: parsePos(cols[col.Pos]),
		gender: cols[col.Gender],
		bib: parsePos(cols[col.Bib]),
		name: cols[col.Name],
		team: cols[col.Team] || null,
		country: cols[col.Country] || null,
		category: cat,
		t55: parseTime(cols[col['Time_5.5k']]),
		t10: parseTime(cols[col.Time_10k]),
		t15: parseTime(cols[col.Time_15k]),
		t: finishSec,
		catRank: parsePos(cols[col.Cat_Rank])
	});
}
console.log(`  Parsed ${finishers.length} finishers (${skipped} skipped — missing time or non-standard category)`);

function quantile(sortedArr, q) {
	if (!sortedArr.length) return null;
	const i = (sortedArr.length - 1) * q;
	const lo = Math.floor(i);
	const hi = Math.ceil(i);
	if (lo === hi) return sortedArr[lo];
	return sortedArr[lo] + (sortedArr[hi] - sortedArr[lo]) * (i - lo);
}

const sortedByTime = [...finishers].sort((a, b) => a.t - b.t);
const times = sortedByTime.map((f) => f.t);

const total = finishers.length;
const globalStats = {
	total,
	medianTime: Math.round(quantile(times, 0.5)),
	p10: Math.round(quantile(times, 0.1)),
	p25: Math.round(quantile(times, 0.25)),
	p75: Math.round(quantile(times, 0.75)),
	p90: Math.round(quantile(times, 0.9)),
	fastest: times[0],
	slowest: times[times.length - 1]
};

const byCategory = new Map();
for (const f of finishers) {
	if (!byCategory.has(f.category)) byCategory.set(f.category, []);
	byCategory.get(f.category).push(f.t);
}
const categoryStats = {};
for (const [cat, arr] of byCategory) {
	const sorted = [...arr].sort((a, b) => a - b);
	categoryStats[cat] = {
		n: sorted.length,
		medianTime: Math.round(quantile(sorted, 0.5)),
		p10: Math.round(quantile(sorted, 0.1)),
		p25: Math.round(quantile(sorted, 0.25)),
		p75: Math.round(quantile(sorted, 0.75)),
		p90: Math.round(quantile(sorted, 0.9)),
		fastest: sorted[0],
		slowest: sorted[sorted.length - 1]
	};
}

const genderStats = {};
for (const g of ['F', 'M']) {
	const arr = finishers.filter((f) => f.gender === g).map((f) => f.t);
	if (!arr.length) continue;
	const sorted = arr.sort((a, b) => a - b);
	genderStats[g] = {
		n: sorted.length,
		medianTime: Math.round(quantile(sorted, 0.5)),
		p25: Math.round(quantile(sorted, 0.25)),
		p75: Math.round(quantile(sorted, 0.75))
	};
}

const byCountry = {};
let countriesTotal = 0;
for (const f of finishers) {
	if (!f.country) continue;
	byCountry[f.country] = (byCountry[f.country] || 0) + 1;
}
countriesTotal = Object.keys(byCountry).length;

const BIN_SEC = 60;

function clampedDomain(sortedTimes) {
	if (!sortedTimes.length) return [0, BIN_SEC];
	const p1 = quantile(sortedTimes, 0.01);
	const p99 = quantile(sortedTimes, 0.99);
	const lo = Math.floor(p1 / BIN_SEC) * BIN_SEC;
	const hi = Math.ceil(p99 / BIN_SEC) * BIN_SEC;
	return [lo, hi === lo ? lo + BIN_SEC : hi];
}

function histogram(times, [lo, hi]) {
	const n = Math.max(1, Math.round((hi - lo) / BIN_SEC));
	const counts = new Array(n).fill(0);
	for (const t of times) {
		if (t < lo || t > hi) continue;
		const i = Math.min(n - 1, Math.floor((t - lo) / BIN_SEC));
		counts[i]++;
	}
	return { lo, hi, binSec: BIN_SEC, counts };
}

const womenTimes = sortedByTime.filter((f) => f.gender === 'F').map((f) => f.t);
const menTimes = sortedByTime.filter((f) => f.gender === 'M').map((f) => f.t);
const finishDomain = clampedDomain(times);
const finishHist = {
	domain: finishDomain,
	binSec: BIN_SEC,
	women: histogram(womenTimes, finishDomain).counts,
	men: histogram(menTimes, finishDomain).counts,
	womenMedian: womenTimes.length ? Math.round(quantile(womenTimes, 0.5)) : null,
	menMedian: menTimes.length ? Math.round(quantile(menTimes, 0.5)) : null
};

for (const [cat, arr] of byCategory) {
	const sorted = [...arr].sort((a, b) => a - b);
	const dom = clampedDomain(sorted);
	categoryStats[cat].hist = { domain: dom, binSec: BIN_SEC, counts: histogram(sorted, dom).counts };
}

const SCATTER_MAX = 4000;
const splitPts = finishers
	.filter((f) => f.t10 != null && f.t10 > 0 && f.t > f.t10)
	.map((f) => [f.t10, f.t - f.t10]);
let splitCloud = splitPts;
if (splitPts.length > SCATTER_MAX) {
	const stride = splitPts.length / SCATTER_MAX;
	splitCloud = [];
	for (let i = 0; i < SCATTER_MAX; i++) splitCloud.push(splitPts[Math.floor(i * stride)]);
}

const RANK_POINTS = 512;
function rankCurve(sortedTimes) {
	const n = sortedTimes.length;
	if (!n) return { size: 0, times: [] };
	if (n <= RANK_POINTS) return { size: n, times: sortedTimes };
	const out = [];
	for (let i = 0; i < RANK_POINTS; i++) {
		out.push(sortedTimes[Math.round((i * (n - 1)) / (RANK_POINTS - 1))]);
	}
	return { size: n, times: out };
}
const genderRankCurve = {
	F: rankCurve(womenTimes),
	M: rankCurve(menTimes)
};

if (!existsSync(OUT_DIR)) mkdirSync(OUT_DIR, { recursive: true });

writeFileSync(
	join(OUT_DIR, 'stats.json'),
	JSON.stringify({
		global: globalStats,
		byCategory: categoryStats,
		byGender: genderStats,
		byCountry,
		countriesCount: countriesTotal,
		finishHist,
		splitCloud,
		genderRankCurve
	})
);
const sSize = (
	readFileSync(join(OUT_DIR, 'stats.json')).length / 1024
).toFixed(0);
console.log(`  Wrote stats.json (${sSize} KB — anonymous aggregates only)`);

console.log('\nGlobal stats:');
console.log(`  Total finishers: ${globalStats.total}`);
function fmt(s) {
	const h = Math.floor(s / 3600);
	const m = Math.floor((s % 3600) / 60);
	const sec = s % 60;
	return (h ? `${h}h` : '') + String(m).padStart(2, '0') + ':' + String(sec).padStart(2, '0');
}
console.log(`  Median: ${fmt(globalStats.medianTime)} | p10: ${fmt(globalStats.p10)} | p90: ${fmt(globalStats.p90)}`);
console.log('\nDone.');
