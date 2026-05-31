<script lang="ts">
	import SlideShell from './SlideShell.svelte';
	import type { CategoryStats, Finisher } from '$lib/data/wrapped';
	import { fmtPace, paceFor } from '$lib/data/wrapped';
	import { reveal, Counter } from './useReveal.svelte';

	type Props = { me: Finisher; catStats: CategoryStats };
	let { me, catStats }: Props = $props();
	const myPace = $derived(paceFor(me.t, 20));
	const medianPace = $derived(paceFor(catStats.medianTime, 20));

	const counter = new Counter();
	const display = $derived(counter.value > 0 ? fmtPace(counter.value) : '0:00');
</script>

<SlideShell tone="ink">
	<div use:reveal={{ onReveal: () => counter.run(myPace) }}>
	<p class="eyebrow">À l'allure de</p>
	<h2 class="big mono">{display}<span class="unit">/km</span></h2>
	<p class="sub">
		20&nbsp;km tenus à ce rythme.
		{#if myPace < medianPace}
			<em
				>Plus rapide que la moitié des coureurs de votre catégorie
				({me.category}). Joli tempo.</em
			>
		{:else if myPace > medianPace}
			<em
				>La moitié de votre catégorie ({me.category}) a fini plus vite,
				mais vous êtes {me.gender === 'F' ? 'allée' : 'allé'} au bout, et
				c'est l'essentiel.</em
			>
		{:else}
			<em
				>Pile l'allure médiane de votre catégorie ({me.category}). Pile au
				centre.</em
			>
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
	.big {
		margin: 0;
		font-family: var(--font-display);
		font-weight: 800;
		font-size: clamp(96px, 24vw, 240px);
		line-height: 0.92;
		letter-spacing: -0.04em;
		color: var(--ink);
		display: flex;
		align-items: baseline;
		gap: 6px;
	}
	.unit {
		font-size: 0.32em;
		font-weight: 500;
		color: var(--ink-3);
	}
	.sub {
		margin: 0;
		font-family: var(--font-display);
		font-weight: 500;
		font-size: clamp(18px, 2.6vw, 24px);
		line-height: 1.4;
		color: var(--ink-2);
		max-width: 38ch;
	}
	.sub em {
		font-style: italic;
		color: var(--hot);
	}
	.mono {
		font-family: var(--font-mono);
		font-feature-settings: 'tnum' 1;
	}
</style>
