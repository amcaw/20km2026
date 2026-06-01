<script lang="ts">
	import SlideShell from './SlideShell.svelte';
	import type { Finisher, WrappedStats } from '$lib/data/wrapped';
	import { fmtThousands } from '$lib/data/wrapped';
	import { reveal, Counter } from './useReveal.svelte';
	import { t } from '$lib/i18n';

	type Props = { me: Finisher; stats: WrappedStats };
	let { me, stats }: Props = $props();

	const counter = new Counter();

	type Bar = { key: 'F' | 'M'; label: string; n: number };
	const bars = $derived.by<Bar[]>(() => {
		const tally: Record<'F' | 'M', number> = { F: 0, M: 0 };
		for (const [cat, s] of Object.entries(stats.byCategory)) {
			const g = cat[0] as 'F' | 'M' | 'X';
			if (g === 'F' || g === 'M') tally[g] += s.n;
		}
		return [
			{ key: 'F', label: t().gender.labelF, n: tally.F },
			{ key: 'M', label: t().gender.labelM, n: tally.M }
		];
	});
	const total = $derived(bars.reduce((s, b) => s + b.n, 0));
	const yours = $derived(bars.find((b) => b.key === me.gender) ?? null);

	const yourCount = $derived(yours?.n ?? 0);

	const medianGapMin = $derived.by(() => {
		const f = stats.byGender?.F?.medianTime;
		const m = stats.byGender?.M?.medianTime;
		if (f == null || m == null) return null;
		return Math.round(Math.abs(f - m) / 60);
	});

	let chartRevealed = $state(false);
	function onReveal() {
		if (yourCount > 0) counter.run(yourCount);
		chartRevealed = true;
	}
</script>

<SlideShell tone="hot">
	<div use:reveal={{ onReveal }}>
	<p class="eyebrow">{t().gender.eyebrow}</p>
	<h2 class="lede">
		{#if yours}
			{@html t().gender.lede(
				fmtThousands(Math.round(counter.value) - 1),
				yours.label.toLowerCase(),
				me.gender
			)}
		{:else}
			{@html t().gender.ledeFallback(fmtThousands(total))}
		{/if}
	</h2>

	<div class="bar" role="img" aria-label={t().gender.ariaBar}>
		{#each bars as bar (bar.key)}
			{@const w = (bar.n / total) * 100}
			{@const isMine = bar.key === me.gender}
			<div
				class="bar-seg"
				class:bar-seg-mine={isMine}
				style="width: {chartRevealed ? w : 0}%"
				title="{bar.label}: {fmtThousands(bar.n)}"
			>
				<span class="bar-seg-label mono">{bar.label}</span>
				<span class="bar-seg-n mono">{fmtThousands(bar.n)}</span>
				<span class="bar-seg-pct mono">{Math.round(w)}%</span>
			</div>
		{/each}
	</div>

	<p class="sub">
		{@html t().gender.sub(fmtThousands(total))}
		{#if medianGapMin != null && medianGapMin > 0}
			{@html t().gender.subGap(medianGapMin)}
		{/if}
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
		font-size: clamp(28px, 4.6vw, 44px);
		line-height: 1.1;
		letter-spacing: -0.02em;
		color: var(--ink);
		text-wrap: balance;
		max-width: 22ch;
	}
	.lede :global(.hot) {
		color: var(--hot);
	}
	.lede :global(.mono) {
		font-family: var(--font-mono);
		font-feature-settings: 'tnum' 1;
	}

	.bar {
		display: flex;
		width: 100%;
		height: clamp(72px, 12dvh, 96px);
		border: 1px solid var(--line);
		border-radius: 12px;
		overflow: hidden;
		background: var(--bg-2);
	}
	.bar-seg {
		display: flex;
		flex-direction: column;
		justify-content: center;
		gap: 4px;
		padding: 0 clamp(12px, 2vw, 20px);
		background: rgba(200, 194, 184, 0.18);
		color: var(--ink-2);
		min-width: 0;
		transition: width 900ms cubic-bezier(0.22, 1, 0.36, 1);
	}
	.bar-seg + .bar-seg {
		border-left: 1px solid var(--line);
	}
	.bar-seg-mine {
		background: var(--hot);
		color: #0b0d0e;
		box-shadow: inset 0 0 28px -6px rgba(0, 0, 0, 0.25);
	}
	.bar-seg-label {
		font-family: var(--font-ui);
		font-size: 11px;
		font-weight: 700;
		letter-spacing: 0.14em;
		text-transform: uppercase;
		opacity: 0.85;
	}
	.bar-seg-n {
		font-family: var(--font-mono);
		font-feature-settings: 'tnum' 1;
		font-size: clamp(18px, 2.6vw, 24px);
		font-weight: 700;
		letter-spacing: -0.01em;
	}
	.bar-seg-pct {
		font-family: var(--font-mono);
		font-feature-settings: 'tnum' 1;
		font-size: 11px;
		opacity: 0.7;
	}

	.sub {
		margin: 0;
		font-family: var(--font-ui);
		font-size: 13px;
		color: var(--ink-3);
	}
	.sub :global(strong) {
		color: var(--ink);
		font-weight: 700;
	}
	.sub :global(.mono) {
		font-family: var(--font-mono);
		font-feature-settings: 'tnum' 1;
	}
	.mono {
		font-family: var(--font-mono);
		font-feature-settings: 'tnum' 1;
	}
</style>
