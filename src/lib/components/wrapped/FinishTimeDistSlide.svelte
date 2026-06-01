<script lang="ts">
	import { scaleLinear } from 'd3-scale';
	import SlideShell from './SlideShell.svelte';
	import type { Finisher, WrappedStats } from '$lib/data/wrapped';
	import { fmtThousands, fmtTime } from '$lib/data/wrapped';
	import { reveal, Counter } from './useReveal.svelte';
	import { t } from '$lib/i18n';

	type Props = { me: Finisher; stats: WrappedStats };
	let { me, stats }: Props = $props();
	const growth = new Counter();

	const COLOR_F = '#9ee0dc';
	const COLOR_M = '#3a8a86';

	const hist = $derived(stats.finishHist);
	const xDomain = $derived(hist.domain as [number, number]);
	const womenBins = $derived(hist.women);
	const menBins = $derived(hist.men);
	const yMax = $derived(Math.max(...womenBins, ...menBins, 1));

	const VB_W = 1000;
	const VB_H = 500;
	const PAD = { top: 40, right: 24, bottom: 64, left: 24 };
	const innerW = VB_W - PAD.left - PAD.right;
	const innerH = VB_H - PAD.top - PAD.bottom;

	const x = $derived(scaleLinear().domain(xDomain).range([0, innerW]));
	const y = $derived(scaleLinear().domain([0, yMax]).range([innerH, 0]));

	const xTicks = $derived.by(() => {
		const [lo, hi] = xDomain;
		const step = Math.max(60, Math.round((hi - lo) / 5 / 60) * 60);
		const out: number[] = [];
		const start = Math.ceil(lo / step) * step;
		for (let t = start; t <= hi; t += step) out.push(t);
		return out;
	});

	const womenMedian = $derived(hist.womenMedian);
	const menMedian = $derived(hist.menMedian);

	const myX = $derived(x(Math.max(xDomain[0], Math.min(xDomain[1], me.t))));
</script>

<SlideShell tone="hot">
	<div use:reveal={{ onReveal: () => growth.run(1) }}>
	<p class="eyebrow">{t().finishDist.eyebrow}</p>
	<h2 class="lede">
		{@html t().finishDist.lede(fmtThousands(stats.global.total))}
	</h2>

	<div class="chart-wrap">
		<svg viewBox="0 0 {VB_W} {VB_H}" class="chart" aria-hidden="true">
			<g transform="translate({PAD.left},{PAD.top})">
				{#each womenBins as count, i (i)}
					{@const w = innerW / womenBins.length}
					{@const h = (count / yMax) * innerH * growth.value}
					{#if count > 0}
						<rect
							x={i * w}
							y={innerH - h}
							width={Math.max(0.5, w - 0.5)}
							height={h}
							fill={COLOR_F}
							fill-opacity="0.85"
						/>
					{/if}
				{/each}

				{#each menBins as count, i (i)}
					{@const w = innerW / menBins.length}
					{@const h = (count / yMax) * innerH * growth.value}
					{#if count > 0}
						<rect
							x={i * w}
							y={innerH - h}
							width={Math.max(0.5, w - 0.5)}
							height={h}
							fill={COLOR_M}
							fill-opacity="0.7"
						/>
					{/if}
				{/each}

				{#if womenMedian != null}
					<line
						x1={x(womenMedian)}
						x2={x(womenMedian)}
						y1={0}
						y2={innerH}
						stroke={COLOR_F}
						stroke-width="1.5"
						stroke-dasharray="6 4"
					/>
					<text
						x={x(womenMedian)}
						y={-8}
						text-anchor="middle"
						class="median-label"
						fill={COLOR_F}
					>F · {fmtTime(womenMedian)}</text>
				{/if}
				{#if menMedian != null}
					<line
						x1={x(menMedian)}
						x2={x(menMedian)}
						y1={0}
						y2={innerH}
						stroke={COLOR_M}
						stroke-width="1.5"
						stroke-dasharray="6 4"
					/>
					<text
						x={x(menMedian)}
						y={-26}
						text-anchor="middle"
						class="median-label"
						fill={COLOR_M}
					>M · {fmtTime(menMedian)}</text>
				{/if}

				<line
					x1={myX}
					x2={myX}
					y1={0}
					y2={innerH}
					stroke="#ffffff"
					stroke-width="3"
				/>
				<rect
					x={myX - 36}
					y={innerH + 12}
					width={72}
					height={26}
					rx={4}
					fill="#ffffff"
				/>
				<text
					x={myX}
					y={innerH + 30}
					text-anchor="middle"
					class="me-label mono"
				>{t().finishDist.you}</text>

				<line x1={0} y1={innerH} x2={innerW} y2={innerH} stroke="var(--line)" />
				{#each xTicks as t (t)}
					<text
						x={x(t)}
						y={innerH + 56}
						text-anchor="middle"
						class="axis-label mono"
					>{fmtTime(t)}</text>
				{/each}
			</g>
		</svg>

		<div class="legend">
			<span class="legend-item">
				<span class="swatch swatch-f" style:background={COLOR_F}></span>
				{t().finishDist.legendF}
			</span>
			<span class="legend-item">
				<span class="swatch swatch-m" style:background={COLOR_M}></span>
				{t().finishDist.legendM}
			</span>
			<span class="legend-item">
				<span class="swatch swatch-you"></span>
				{t().finishDist.legendYou}
			</span>
		</div>
	</div>
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
	.lede {
		margin: 0;
		font-family: var(--font-display);
		font-weight: 500;
		font-size: clamp(20px, 3vw, 28px);
		line-height: 1.35;
		color: var(--ink-2);
		max-width: 38ch;
		text-wrap: pretty;
	}
	.lede :global(em) {
		font-style: italic;
		color: var(--hot);
	}
	.lede :global(strong) {
		font-weight: 700;
		color: var(--ink);
	}
	.lede :global(.mono) {
		font-family: var(--font-mono);
		font-feature-settings: 'tnum' 1;
	}

	.chart-wrap {
		display: flex;
		flex-direction: column;
		gap: 14px;
		width: 100%;
		max-width: 720px;
	}
	.chart {
		display: block;
		width: 100%;
		height: auto;
	}
	.median-label {
		font-family: var(--font-mono);
		font-feature-settings: 'tnum' 1;
		font-size: 18px;
		font-weight: 700;
		letter-spacing: 0.04em;
	}
	.me-label {
		font-family: var(--font-mono);
		font-feature-settings: 'tnum' 1;
		font-size: 18px;
		font-weight: 800;
		fill: #0b0d0e;
	}
	.axis-label {
		font-size: 22px;
		fill: var(--ink-3);
	}

	.legend {
		display: flex;
		flex-wrap: wrap;
		gap: 8px 18px;
		font-family: var(--font-ui);
		font-size: 12px;
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
		width: 14px;
		height: 14px;
		border-radius: 3px;
	}
	.swatch-you {
		background: #ffffff;
		width: 4px;
		height: 14px;
	}
	.mono {
		font-family: var(--font-mono);
		font-feature-settings: 'tnum' 1;
	}
</style>
