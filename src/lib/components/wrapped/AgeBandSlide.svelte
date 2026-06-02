<script lang="ts">
	import SlideShell from './SlideShell.svelte';
	import type { Finisher, WrappedStats } from '$lib/data/wrapped';
	import { fmtThousands } from '$lib/data/wrapped';
	import { reveal, Counter } from './useReveal.svelte';
	import { t } from '$lib/i18n';

	type Props = { me: Finisher; stats: WrappedStats };
	let { me, stats }: Props = $props();
	const counter = new Counter();

	const AGE_ORDER = ['U20', '20', '40', '50', '60', '70', '80'];
	const AGE_LABEL: Record<string, string> = {
		U20: '< 20 ans',
		'20': '20–39 ans',
		'40': '40–49 ans',
		'50': '50–59 ans',
		'60': '60–69 ans',
		'70': '70–79 ans',
		'80': '80 ans et plus'
	};
	// Compact labels for the x-axis ticks (no "ans" — it overflows on mobile).
	const AGE_AXIS: Record<string, string> = {
		U20: '<20',
		'20': '20–39',
		'40': '40–49',
		'50': '50–59',
		'60': '60–69',
		'70': '70–79',
		'80': '80+'
	};

	type Bar = { key: string; label: string; axisLabel: string; n: number; isMine: boolean };

	const myGender = $derived(me.gender);
	const myAgeKey = $derived(me.category.replace(/^[FMX]/, ''));
	const bars = $derived.by<Bar[]>(() => {
		return AGE_ORDER.map((age) => {
			const cat = `${myGender}${age}`;
			const stat = stats.byCategory[cat];
			return {
				key: age,
				label: AGE_LABEL[age] ?? age,
				axisLabel: AGE_AXIS[age] ?? age,
				n: stat?.n ?? 0,
				isMine: age === myAgeKey
			};
		}).filter((b) => b.n > 0);
	});
	const maxN = $derived(Math.max(...bars.map((b) => b.n), 1));
	const yours = $derived(bars.find((b) => b.isMine) ?? null);

	const yourCount = $derived(yours?.n ?? 0);

	const growth = new Counter();
	function onReveal() {
		if (yourCount > 0) counter.run(yourCount);
		growth.run(1);
	}
</script>

<SlideShell tone="hot">
	<div use:reveal={{ onReveal }}>
	<p class="eyebrow">{t().ageBand.eyebrow}</p>
	<h2 class="lede">
		{#if yours}
			{@html t().ageBand.lede(
				fmtThousands(Math.round(counter.value)),
				t().ageLabel[yours.key] ?? yours.label,
				me.gender,
				me.meet === 'handi'
			)}
		{:else}
			{t().ageBand.ledeFallback}
		{/if}
	</h2>

	<div class="chart-wrap">
		<svg viewBox="0 0 1000 280" preserveAspectRatio="none" class="chart" aria-hidden="true">
			{#each bars as bar, i (bar.key)}
				{@const w = 1000 / bars.length}
				{@const fullH = (bar.n / maxN) * 220}
				{@const h = fullH * growth.value}
				<rect
					x={i * w + w * 0.08}
					y={240 - h}
					width={w * 0.84}
					height={h}
					rx="3"
					fill={bar.isMine ? 'var(--hot)' : 'rgba(200,194,184,0.45)'}
				/>
			{/each}
			<line x1={0} x2={1000} y1={240} y2={240} stroke="var(--line)" stroke-width="1" />
		</svg>

		<div class="annotations" aria-hidden="true">
			{#each bars as bar, i (bar.key)}
				{@const pct = ((i + 0.5) / bars.length) * 100}
				<span
					class="ann-n mono"
					class:ann-mine={bar.isMine}
					style="left: {pct}%; bottom: calc({(bar.n / maxN) * 78 * growth.value}% + 28px); opacity: {growth.value}"
				>{fmtThousands(bar.n)}</span>
				<span
					class="ann-label mono"
					class:ann-mine={bar.isMine}
					style="left: {pct}%"
				>{bar.axisLabel}</span>
			{/each}
		</div>
	</div>

	<p class="legend mono">
		<span class="legend-item">
			<span class="swatch swatch-bar"></span> {t().ageBand.legendAll}
		</span>
		<span class="legend-item">
			<span class="swatch swatch-mine"></span> {t().ageBand.legendMine(yours?.label ?? '')}
		</span>
	</p>
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
		font-weight: 700;
		font-size: clamp(26px, 4.4vw, 40px);
		line-height: 1.15;
		letter-spacing: -0.02em;
		color: var(--ink);
		text-wrap: balance;
		max-width: 22ch;
	}
	.lede :global(em) {
		font-style: italic;
	}
	.lede :global(em.accent) {
		color: var(--hot);
		font-style: normal;
	}
	.lede :global(strong) {
		font-weight: 800;
	}
	.lede :global(.mono) {
		font-family: var(--font-mono);
		font-feature-settings: 'tnum' 1;
		color: var(--hot);
	}

	.chart-wrap {
		position: relative;
		width: 100%;
	}
	.chart {
		display: block;
		width: 100%;
		height: clamp(200px, 32dvh, 300px);
	}
	.annotations {
		position: absolute;
		inset: 0;
		pointer-events: none;
	}
	.ann-n {
		position: absolute;
		transform: translateX(-50%);
		font-family: var(--font-mono);
		font-feature-settings: 'tnum' 1;
		font-size: clamp(11px, 1.4vw, 14px);
		color: var(--ink-2);
		white-space: nowrap;
	}
	.ann-label {
		position: absolute;
		bottom: -2px;
		transform: translateX(-50%);
		font-family: var(--font-mono);
		font-feature-settings: 'tnum' 1;
		font-size: clamp(10px, 1.2vw, 12px);
		color: var(--ink-3);
		letter-spacing: 0.02em;
		white-space: nowrap;
	}
	.ann-mine {
		color: var(--hot);
		font-weight: 700;
	}

	.legend {
		display: flex;
		flex-wrap: wrap;
		gap: 8px 18px;
		margin: 24px 0 0;
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
	.swatch-mine {
		background: var(--hot);
	}
	.mono {
		font-family: var(--font-mono);
		font-feature-settings: 'tnum' 1;
	}
</style>
