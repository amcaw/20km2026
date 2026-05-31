<script lang="ts">
	import { scaleLinear } from 'd3-scale';
	import SlideShell from './SlideShell.svelte';
	import type { Finisher, WrappedStats } from '$lib/data/wrapped';
	import { fmtThousands } from '$lib/data/wrapped';
	import { reveal, Counter } from './useReveal.svelte';

	type Props = { me: Finisher; stats: WrappedStats };
	let { me, stats }: Props = $props();

	const growth = new Counter();

	const COLOR_F = '#9ee0dc';
	const COLOR_M = '#3a8a86';

	const AGE_ORDER = ['U20', '20', '40', '50', '60', '70', '80'] as const;
	const AGE_LABEL: Record<string, string> = {
		U20: '<20',
		'20': '20–39',
		'40': '40–49',
		'50': '50–59',
		'60': '60–69',
		'70': '70–79',
		'80': '80+'
	};

	type Bar = { age: string; f: number; m: number; total: number; isMine: boolean };
	const myAge = $derived(me.category.replace(/^[FMX]/, ''));
	const bars = $derived.by<Bar[]>(() => {
		const out: Bar[] = [];
		for (const age of AGE_ORDER) {
			const f = stats.byCategory[`F${age}`]?.n ?? 0;
			const m = stats.byCategory[`M${age}`]?.n ?? 0;
			if (f + m === 0) continue;
			out.push({ age, f, m, total: f + m, isMine: age === myAge });
		}
		return out;
	});
	const maxTotal = $derived(Math.max(...bars.map((b) => b.total), 1));

	const VB_W = 1000;
	const VB_H = 500;
	const PAD = { top: 40, right: 24, bottom: 64, left: 80 };
	const innerW = VB_W - PAD.left - PAD.right;
	const innerH = VB_H - PAD.top - PAD.bottom;
	const y = $derived(scaleLinear().domain([0, maxTotal]).range([innerH, 0]));
	const colW = $derived(innerW / bars.length);
	const barGap = 0.18;

	const yTicks = $derived.by(() => {
		const step = Math.pow(10, Math.floor(Math.log10(maxTotal / 4)));
		const rounded = Math.ceil(maxTotal / 4 / step) * step;
		const out: number[] = [];
		for (let v = 0; v <= maxTotal; v += rounded) out.push(v);
		return out;
	});

	const totalRunners = $derived(bars.reduce((s, b) => s + b.total, 0));
	const biggest = $derived(
		bars.length ? bars.reduce((a, b) => (b.total > a.total ? b : a)) : null
	);
	const yours = $derived(bars.find((b) => b.isMine) ?? null);
	const yourShare = $derived(
		yours && totalRunners > 0 ? Math.round((yours.total / totalRunners) * 100) : null
	);
</script>

<SlideShell tone="hot">
	<div use:reveal={{ onReveal: () => growth.run(1) }}>
	<p class="eyebrow">Toutes générations confondues</p>
	<h2 class="lede">
		{#if yours && yourShare != null && biggest}
			{#if biggest.age === yours.age}
				Votre tranche d'âge ({AGE_LABEL[yours.age]}&nbsp;ans) est la plus
				nombreuse&nbsp;: <strong class="mono">{yourShare}%</strong> de tous
				les finishers, hommes et femmes confondus.
			{:else}
				Votre tranche d'âge ({AGE_LABEL[yours.age]}&nbsp;ans) représente
				<strong class="mono">{yourShare}%</strong> de tous les finishers.
				La plus nombreuse&nbsp;: <em class="hot">{AGE_LABEL[biggest.age]}&nbsp;ans</em>.
				<em>Toutes les générations étaient là, vous compris.</em>
			{/if}
		{:else}
			Voici toutes les tranches d'âge, hommes et femmes réunis.
		{/if}
	</h2>

	<div class="chart-wrap">
		<svg viewBox="0 0 {VB_W} {VB_H}" class="chart" aria-hidden="true">
			<g transform="translate({PAD.left},{PAD.top})">
				{#each yTicks as v (v)}
					<line
						x1={0}
						y1={y(v)}
						x2={innerW}
						y2={y(v)}
						stroke="var(--line)"
						stroke-dasharray="2 3"
					/>
					<text
						x={-12}
						y={y(v) + 6}
						text-anchor="end"
						class="axis-label mono"
					>{fmtThousands(v)}</text>
				{/each}

				{#each bars as bar, i (bar.age)}
					{@const w = colW * (1 - barGap)}
					{@const cx = i * colW + colW / 2}
					{@const xLeft = cx - w / 2}
					{@const fullMH = (bar.m / maxTotal) * innerH}
					{@const fullFH = (bar.f / maxTotal) * innerH}
					{@const mH = fullMH * growth.value}
					{@const fH = fullFH * growth.value}
					{@const mY = innerH - mH}
					{@const fY = mY - fH}
					<rect
						x={xLeft}
						y={mY}
						width={w}
						height={mH}
						fill={COLOR_M}
						rx="3"
					/>
					<rect
						x={xLeft}
						y={fY}
						width={w}
						height={fH}
						fill={COLOR_F}
						rx="3"
					/>
					<text
						x={cx}
						y={fY - 6}
						text-anchor="middle"
						class="bar-total mono"
						class:bar-total-mine={bar.isMine}
					>{fmtThousands(bar.total)}</text>
					<text
						x={cx}
						y={innerH + 26}
						text-anchor="middle"
						class="bar-label mono"
						class:bar-label-mine={bar.isMine}
					>{AGE_LABEL[bar.age]}</text>
					{#if bar.isMine}
						<rect
							x={xLeft - 4}
							y={fY - 4}
							width={w + 8}
							height={mH + fH + 8}
							rx={5}
							fill="none"
							stroke="#ffffff"
							stroke-width="3"
						/>
					{/if}
				{/each}

				<line x1={0} y1={innerH} x2={innerW} y2={innerH} stroke="var(--line)" />
			</g>
		</svg>

		<div class="legend">
			<span class="legend-item">
				<span class="swatch" style:background={COLOR_F}></span>
				Femmes
			</span>
			<span class="legend-item">
				<span class="swatch" style:background={COLOR_M}></span>
				Hommes
			</span>
			<span class="legend-item">
				<span class="swatch swatch-you"></span>
				Votre classe
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
		max-width: 42ch;
		text-wrap: pretty;
	}
	.lede em.hot {
		font-style: italic;
		color: var(--hot);
		font-weight: 700;
	}
	.lede strong {
		font-weight: 700;
		color: var(--ink);
	}
	.lede .mono {
		font-family: var(--font-mono);
		font-feature-settings: 'tnum' 1;
		color: var(--hot);
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
	.axis-label {
		font-size: 22px;
		fill: var(--ink-3);
	}
	.bar-total {
		font-family: var(--font-mono);
		font-feature-settings: 'tnum' 1;
		font-size: 22px;
		font-weight: 700;
		fill: var(--ink-2);
	}
	.bar-total-mine {
		fill: #ffffff;
	}
	.bar-label {
		font-family: var(--font-mono);
		font-feature-settings: 'tnum' 1;
		font-size: 22px;
		fill: var(--ink-3);
	}
	.bar-label-mine {
		fill: #ffffff;
		font-weight: 700;
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
		background: transparent;
		border: 2px solid #ffffff;
	}
	.mono {
		font-family: var(--font-mono);
		font-feature-settings: 'tnum' 1;
	}
</style>
