#!/usr/bin/env node
// Builds stats-handi.json for the para-athletics meet (LIVE2 context), the
// separate ranking at https://www.acn-timing.com/.../199034_2/.../LIVE2.
// Fetches anonymous aggregates live from the Chronorace API — no names are
// stored, only the same anonymous stats shape as the runners' stats.json.
import { writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { dirname, resolve, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { aggregate } from './aggregate.mjs';

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(HERE, '..');
const OUT_DIR = resolve(ROOT, 'static/data/wrapped');
const API = 'https://results.chronorace.be/api/results/table/search/20260531_20km/LIVE2';

const COL = {
	pos: 'sR_Pos',
	bib: 'sI_w500_#NR',
	gender: 'sH_#GENDER',
	name: '#NAME',
	country: 'dI_sC_#NOC',
	t55: 'w500_gkm5,5_Time',
	t10: 'w500_gkm10_Time',
	t15: 'w500_gkm15_Time',
	time: 'sR_#TIME',
	category: 'gCateg_w700_#CAT'
};

function parseTime(s) {
	if (!s || s === '0:00:00' || s === '-') return null;
	const p = String(s).split(':').map(Number);
	if (p.length === 3) return p[0] * 3600 + p[1] * 60 + p[2];
	if (p.length === 2) return p[0] * 60 + p[1];
	return null;
}
function bold(html) {
	const m = String(html).match(/<b>(.*?)<\/b>/);
	return m ? m[1].trim() : String(html ?? '').replace(/<[^>]+>/g, ' ').trim();
}

async function fetchAll() {
	const out = [];
	let offset = 0;
	const PAGE = 500;
	let total = Infinity;
	while (out.length < total) {
		const url = `${API}?srch=&fromRecord=${offset}&pageSize=${PAGE}`;
		const r = await fetch(url, { headers: { Origin: 'https://amcaw.github.io' } });
		if (!r.ok) throw new Error(`${url}: ${r.status}`);
		const d = await r.json();
		total = d.Count ?? out.length;
		const cols = (d.TableDefinition?.Columns ?? []).map((c) => c.Name);
		const idx = Object.fromEntries(cols.map((c, i) => [c, i]));
		let added = 0;
		for (const g of d.Groups ?? []) {
			for (const row of g.SlaveRows ?? []) {
				const cell = (k) => {
					const i = idx[COL[k]];
					const v = i == null ? null : row[i];
					return v == null ? '' : String(v);
				};
				const t = parseTime(bold(cell('time')));
				if (t == null) continue;
				const cat = cell('category');
				if (!/^[FMX](U20|\d{2})$/.test(cat)) continue;
				const flag = cell('country').match(/flags\/(\w+)\.png/);
				const gender = cell('gender');
				out.push({
					gender: gender === 'F' || gender === 'M' ? gender : 'X',
					country: flag ? flag[1].toUpperCase() : null,
					category: cat,
					t55: parseTime(cell('t55')),
					t10: parseTime(cell('t10')),
					t15: parseTime(cell('t15')),
					t
				});
				added++;
			}
		}
		if (added === 0) break;
		offset += PAGE;
	}
	return out;
}

function fmt(s) {
	const h = Math.floor(s / 3600);
	const m = Math.floor((s % 3600) / 60);
	const sec = s % 60;
	return (h ? `${h}h` : '') + String(m).padStart(2, '0') + ':' + String(sec).padStart(2, '0');
}

console.log('— Fetching para-athletics meet (LIVE2) from Chronorace…');
const finishers = await fetchAll();
console.log(`  ${finishers.length} finishers with a valid time & category`);

const stats = aggregate(finishers);

if (!existsSync(OUT_DIR)) mkdirSync(OUT_DIR, { recursive: true });
writeFileSync(join(OUT_DIR, 'stats-handi.json'), JSON.stringify(stats));
console.log(`  Wrote stats-handi.json (anonymous aggregates only)`);
console.log(`  Total: ${stats.global.total} | Median: ${fmt(stats.global.medianTime)}`);
console.log('Done.');
