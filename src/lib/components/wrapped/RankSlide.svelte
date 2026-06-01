<script lang="ts">
	import SlideShell from './SlideShell.svelte';
	import type { Finisher } from '$lib/data/wrapped';
	import { fasterThanPct, fmtThousands } from '$lib/data/wrapped';
	import { reveal, Counter } from './useReveal.svelte';
	import { t } from '$lib/i18n';

	type Props = { me: Finisher; total: number };
	let { me, total }: Props = $props();
	const pct = $derived(fasterThanPct(me, total));
	const fromLast = $derived(total - me.pos + 1);

	const counter = new Counter();
</script>

<SlideShell tone="ink">
	<div use:reveal={{ onReveal: () => counter.run(me.pos) }}>
		<p class="eyebrow">{t().rank.eyebrow}</p>
		<h2 class="big mono">#{fmtThousands(Math.round(counter.value))}</h2>
		<p class="sub">
			{@html t().rank.sub(fmtThousands(total))}
			{#if me.pos === 1}
				<em>{t().rank.won}</em>
			{:else if me.pos <= 3}
				<em>{t().rank.podium}</em>
			{:else if me.pos <= 100}
				<em>{t().rank.top100}</em>
			{:else if fromLast <= 50}
				<em>{t().rank.nearLast}</em>
			{:else}
				<em>{@html t().rank.generic(pct)}</em>
			{/if}
		</p>
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
	}
	.sub :global(strong) {
		font-weight: 700;
		color: var(--ink);
	}
	.sub :global(.hot) {
		color: var(--hot);
	}
	.sub em {
		display: block;
		margin-top: 8px;
		font-style: italic;
		color: var(--hot);
		font-size: 0.78em;
	}
	.sub em :global(strong) {
		color: var(--hot);
	}
	.mono {
		font-family: var(--font-mono);
		font-feature-settings: 'tnum' 1;
	}
</style>
