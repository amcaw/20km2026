<script lang="ts">
	import SlideShell from './SlideShell.svelte';
	import type { Finisher, WrappedStats } from '$lib/data/wrapped';
	import { fmtTime } from '$lib/data/wrapped';
	import { reveal, Counter } from './useReveal.svelte';
	import { t } from '$lib/i18n';

	type Props = { me: Finisher; stats: WrappedStats };
	let { me, stats }: Props = $props();

	const counter = new Counter();

	const COLOR_F = '#9ee0dc';
	const COLOR_M = '#3a8a86';

	const myAge = $derived(me.category.replace(/^[FMX]/, ''));

	function overallFastest(gender: 'F' | 'M'): number | null {
		let best: number | null = null;
		for (const [cat, s] of Object.entries(stats.byCategory)) {
			if (cat[0] !== gender || s.fastest == null) continue;
			if (best == null || s.fastest < best) best = s.fastest;
		}
		return best;
	}
	const fFastestAll = $derived(overallFastest('F'));
	const mFastestAll = $derived(overallFastest('M'));
	const fFastestCat = $derived(stats.byCategory[`F${myAge}`]?.fastest ?? null);
	const mFastestCat = $derived(stats.byCategory[`M${myAge}`]?.fastest ?? null);
</script>

<SlideShell tone="hot">
	<div use:reveal={{ onReveal: () => counter.run(me.t) }}>
		<p class="eyebrow">{t().chrono.eyebrow}</p>
		<h2 class="big mono">{fmtTime(Math.round(counter.value))}</h2>
		<p class="sub">
			{@html me.meet === 'handi' ? t().chrono.subPara : t().chrono.sub}
		</p>

		<div class="fastest-block">
			{#if fFastestAll != null || mFastestAll != null}
				<div class="fastest">
					<span class="fastest-label">{t().chrono.fastestAllLabel}</span>
					<span class="fastest-vals">
						{#if fFastestAll != null}
							<span class="fastest-val">
								<span class="swatch" style:background={COLOR_F}></span>
								<span class="fastest-who">{t().chrono.fastestF}</span>
								<span class="fastest-time mono">{fmtTime(fFastestAll)}</span>
							</span>
						{/if}
						{#if mFastestAll != null}
							<span class="fastest-val">
								<span class="swatch" style:background={COLOR_M}></span>
								<span class="fastest-who">{t().chrono.fastestM}</span>
								<span class="fastest-time mono">{fmtTime(mFastestAll)}</span>
							</span>
						{/if}
					</span>
				</div>
			{/if}
			{#if fFastestCat != null || mFastestCat != null}
				<div class="fastest">
					<span class="fastest-label">{t().chrono.fastestCatLabel}</span>
					<span class="fastest-vals">
						{#if fFastestCat != null}
							<span class="fastest-val">
								<span class="swatch" style:background={COLOR_F}></span>
								<span class="fastest-who">{t().chrono.fastestF}</span>
								<span class="fastest-time mono">{fmtTime(fFastestCat)}</span>
							</span>
						{/if}
						{#if mFastestCat != null}
							<span class="fastest-val">
								<span class="swatch" style:background={COLOR_M}></span>
								<span class="fastest-who">{t().chrono.fastestM}</span>
								<span class="fastest-time mono">{fmtTime(mFastestCat)}</span>
							</span>
						{/if}
					</span>
				</div>
			{/if}
		</div>
	</div>
</SlideShell>

<style>
	.eyebrow {
		margin: 0 0 clamp(12px, 2dvh, 24px);
		font-family: var(--font-ui);
		font-size: 11px;
		font-weight: 700;
		letter-spacing: 0.18em;
		text-transform: uppercase;
		color: var(--ink-3);
	}
	.big {
		margin: 0;
		font-family: var(--font-display);
		font-weight: 800;
		font-size: clamp(80px, 22vw, 220px);
		line-height: 0.92;
		letter-spacing: -0.03em;
		color: var(--ink);
	}
	.sub {
		margin: clamp(12px, 2dvh, 24px) 0 0;
		font-family: var(--font-display);
		font-weight: 500;
		font-size: clamp(20px, 3.4vw, 32px);
		line-height: 1.3;
		color: var(--ink-2);
		text-wrap: balance;
		max-width: 24ch;
	}
	.sub :global(em) {
		font-style: italic;
		color: var(--hot);
	}
	.fastest-block {
		display: flex;
		flex-direction: column;
		gap: 10px;
		margin: clamp(16px, 2.4dvh, 28px) 0 0;
		padding-top: clamp(12px, 1.8dvh, 18px);
		border-top: 1px solid var(--line);
		max-width: 420px;
	}
	.fastest {
		display: flex;
		flex-wrap: wrap;
		align-items: baseline;
		gap: 6px 20px;
	}
	.fastest-label {
		font-family: var(--font-ui);
		font-size: 10px;
		font-weight: 700;
		letter-spacing: 0.12em;
		text-transform: uppercase;
		color: var(--ink-3);
	}
	.fastest-vals {
		display: inline-flex;
		flex-wrap: wrap;
		gap: 8px 18px;
	}
	.fastest-val {
		display: inline-flex;
		align-items: center;
		gap: 6px;
	}
	.swatch {
		display: inline-block;
		width: 10px;
		height: 10px;
		border-radius: 3px;
	}
	.fastest-who {
		font-family: var(--font-ui);
		font-size: 12px;
		color: var(--ink-3);
	}
	.fastest-time {
		font-family: var(--font-mono);
		font-feature-settings: 'tnum' 1;
		font-size: 15px;
		font-weight: 700;
		color: var(--ink);
	}
	.mono {
		font-family: var(--font-mono);
		font-feature-settings: 'tnum' 1;
	}
</style>
