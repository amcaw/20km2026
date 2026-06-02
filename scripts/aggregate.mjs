// Shared aggregation: turns an array of finisher records into the anonymous
// stats object shipped as stats.json. Used by both build-wrapped.mjs (the
// runners, from the local CSV) and build-handi.mjs (the para-athletics meet,
// fetched live from the Chronorace API). Keeping it in one place guarantees
// the two pelotons are aggregated identically.

export function quantile(sortedArr, q) {
	if (!sortedArr.length) return null;
	const i = (sortedArr.length - 1) * q;
	const lo = Math.floor(i);
	const hi = Math.ceil(i);
	if (lo === hi) return sortedArr[lo];
	return sortedArr[lo] + (sortedArr[hi] - sortedArr[lo]) * (i - lo);
}

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

const SCATTER_MAX = 4000;
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

export function aggregate(finishers) {
	const sortedByTime = [...finishers].sort((a, b) => a.t - b.t);
	const times = sortedByTime.map((f) => f.t);

	const globalStats = {
		total: finishers.length,
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
	for (const f of finishers) {
		if (!f.country) continue;
		byCountry[f.country] = (byCountry[f.country] || 0) + 1;
	}
	const countriesCount = Object.keys(byCountry).length;

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

	const splitPts = finishers
		.filter((f) => f.t10 != null && f.t10 > 0 && f.t > f.t10)
		.map((f) => [f.t10, f.t - f.t10]);
	let splitCloud = splitPts;
	if (splitPts.length > SCATTER_MAX) {
		const stride = splitPts.length / SCATTER_MAX;
		splitCloud = [];
		for (let i = 0; i < SCATTER_MAX; i++) splitCloud.push(splitPts[Math.floor(i * stride)]);
	}

	const genderRankCurve = {
		F: rankCurve(womenTimes),
		M: rankCurve(menTimes)
	};

	return {
		global: globalStats,
		byCategory: categoryStats,
		byGender: genderStats,
		byCountry,
		countriesCount,
		finishHist,
		splitCloud,
		genderRankCurve
	};
}
