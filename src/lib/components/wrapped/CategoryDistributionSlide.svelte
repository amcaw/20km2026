<script lang="ts">
	import SlideShell from './SlideShell.svelte';
	import type { CategoryStats, Finisher } from '$lib/data/wrapped';
	import { categoryLabel, fmtTime, fmtTimeShort } from '$lib/data/wrapped';
	import { fmtThousands } from '$lib/data/wrapped';
	import { reveal, Counter } from './useReveal.svelte';
	import { t } from '$lib/i18n';

	type Props = { me: Finisher; catStats: CategoryStats };
	let { me, catStats }: Props = $props();
	const growth = new Counter();

	type Hist = {
		bins: { x0: number; x1: number; count: number }[];
		xMin: number;
		xMax: number;
		yMax: number;
		myBinIndex: number;
	};

	const hist = $derived.by<Hist>(() => {
		const { domain, binSec, counts } = catStats.hist;
		const [xMin, xMax] = domain;
		const binCount = Math.max(1, counts.length);
		const yMax = Math.max(...counts, 1);
		const bins = counts.map((count, i) => ({
			x0: xMin + i * binSec,
			x1: xMin + (i + 1) * binSec,
			count
		}));
		const myT = Math.max(xMin, Math.min(xMax, me.t));
		const myBinIndex = Math.min(binCount - 1, Math.floor((myT - xMin) / binSec));
		return { bins, xMin, xMax, yMax, myBinIndex };
	});

	function xOf(sec: number): number {
		return ((sec - hist.xMin) / (hist.xMax - hist.xMin)) * 1000;
	}
	function barHeight(count: number): number {
		return (count / hist.yMax) * 220;
	}

	const ticks = $derived.by(() => {
		const span = hist.xMax - hist.xMin;
		const step = Math.max(60, Math.round(span / 5 / 60) * 60);
		const out: number[] = [];
		for (let t = hist.xMin; t <= hist.xMax + 1; t += step) out.push(t);
		return out;
	});

	const myBin = $derived(hist.bins[hist.myBinIndex]);
</script>

<SlideShell tone="hot">
	<div use:reveal={{ onReveal: () => growth.run(1) }}>
	<p class="eyebrow">{t().catDist.eyebrow}</p>
	<p class="cat-label">{categoryLabel(me.category)} ({me.category})</p>

	{#if me.catRank != null}
		<h2 class="rank-headline mono">
			#{me.catRank}<span class="rank-sub">/ {catStats.n}</span>
		</h2>
	{/if}

	<div class="chart-wrap">
		<svg viewBox="0 0 1000 280" preserveAspectRatio="none" class="chart" aria-hidden="true">
			{#each hist.bins as bin, i (i)}
				{@const w = 1000 / hist.bins.length}
				{@const h = barHeight(bin.count) * growth.value}
				<rect
					x={i * w}
					y={240 - h}
					width={Math.max(0.5, w - 0.4)}
					height={h}
					fill={i === hist.myBinIndex ? 'var(--hot)' : 'rgba(200,194,184,0.45)'}
				/>
			{/each}

			<line
				x1={xOf(catStats.medianTime)}
				x2={xOf(catStats.medianTime)}
				y1={10}
				y2={240}
				stroke="var(--ink-3)"
				stroke-width="1.5"
				stroke-dasharray="4 4"
			/>
			<text
				x={xOf(catStats.medianTime)}
				y={6}
				text-anchor="middle"
				class="median-label"
				dominant-baseline="hanging">{t().catDist.medianLabel}</text>

			<line
				x1={xOf(me.t)}
				x2={xOf(me.t)}
				y1={10}
				y2={240}
				stroke="#ffffff"
				stroke-width="3"
			/>

			<line x1={0} x2={1000} y1={240} y2={240} stroke="var(--line)" stroke-width="1" />
		</svg>

		<div class="axis">
			{#each ticks as t (t)}
				<span
					class="tick"
					class:tick-edge={t === ticks[0] || t === ticks[ticks.length - 1]}
					style="left: {(xOf(t) / 1000) * 100}%"
				>
					{fmtTimeShort(t)}
				</span>
			{/each}
			<span class="you-pill mono" style="left: {(xOf(me.t) / 1000) * 100}%">{t().catDist.you}</span>
		</div>
	</div>

	<p class="legend mono">
		<span class="legend-item">
			<span class="swatch swatch-bar"></span> {t().catDist.legendCat}
		</span>
		<span class="legend-item">
			<span class="swatch swatch-median"></span> {t().catDist.legendMedian(fmtTime(catStats.medianTime))}
		</span>
		<span class="legend-item">
			<span class="swatch swatch-you"></span> {t().catDist.legendYou(fmtTime(me.t))}
		</span>
	</p>

	{#if myBin && myBin.count > 1}
		<p class="callout">
			{@html t().catDist.callout(fmtThousands(myBin.count - 1))}
		</p>
	{/if}
	</div>
</SlideShell>

<style>
	.eyebrow {
		margin: 0;
		font-family: var(--font-ui);
		font-size: 11px;
		font-weight: 700;
		letter-spacing: 0.18em;
		text-transform: uppercase;
		color: var(--ink-3);
	}
	.cat-label {
		margin: 0;
		font-family: var(--font-ui);
		font-size: 13px;
		color: var(--ink-3);
	}
	.rank-headline {
		margin: 0;
		font-family: var(--font-mono);
		font-feature-settings: 'tnum' 1;
		font-size: clamp(56px, 11vw, 120px);
		font-weight: 800;
		line-height: 1;
		letter-spacing: -0.03em;
		color: var(--hot);
		display: flex;
		align-items: baseline;
		gap: 8px;
	}
	.rank-sub {
		font-size: 0.32em;
		font-weight: 500;
		color: var(--ink-3);
		letter-spacing: 0;
	}

	.chart-wrap {
		position: relative;
		width: 100%;
	}
	.chart {
		display: block;
		width: 100%;
		height: clamp(180px, 30dvh, 280px);
	}
	.median-label {
		font-family: var(--font-ui);
		font-size: 18px;
		font-weight: 700;
		letter-spacing: 0.08em;
		text-transform: uppercase;
		fill: var(--ink-3);
	}

	.axis {
		position: relative;
		height: 40px;
		margin-top: 4px;
	}
	.tick {
		position: absolute;
		top: 22px;
		transform: translateX(-50%);
		font-family: var(--font-mono);
		font-feature-settings: 'tnum' 1;
		font-size: 11px;
		color: var(--ink-3);
		white-space: nowrap;
	}
	.tick-edge:first-child {
		transform: translateX(0);
	}
	.tick-edge:last-child {
		transform: translateX(-100%);
	}
	.you-pill {
		position: absolute;
		top: -25px;
		transform: translateX(-50%);
		z-index: 1;
		padding: 2px 8px;
		border-radius: 4px;
		background: #ffffff;
		color: #0b0d0e;
		font-size: 11px;
		font-weight: 800;
		letter-spacing: 0.02em;
		white-space: nowrap;
	}

	.legend {
		display: flex;
		flex-wrap: wrap;
		gap: 8px 18px;
		margin: 0;
		font-family: var(--font-ui);
		font-size: 11px;
		color: var(--ink-3);
		letter-spacing: 0.04em;
	}
	.legend-item {
		display: inline-flex;
		align-items: center;
		gap: 6px;
	}
	.swatch {
		display: inline-block;
		width: 12px;
		height: 12px;
		border-radius: 2px;
	}
	.swatch-bar {
		background: rgba(200, 194, 184, 0.45);
	}
	.swatch-median {
		background: var(--ink-3);
		height: 2px;
		margin: 0 0 4px 0;
	}
	.swatch-you {
		background: #ffffff;
		width: 4px;
		height: 12px;
	}

	.callout {
		margin: 0;
		font-family: var(--font-display);
		font-weight: 500;
		font-size: clamp(16px, 2.4vw, 22px);
		line-height: 1.4;
		color: var(--ink-2);
		max-width: 48ch;
	}
	.callout :global(strong) {
		font-weight: 700;
		color: var(--ink);
	}
	.mono {
		font-family: var(--font-mono);
		font-feature-settings: 'tnum' 1;
	}
</style>
