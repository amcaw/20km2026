<script lang="ts">
	import SlideShell from './SlideShell.svelte';
	import type { Finisher, WrappedStats } from '$lib/data/wrapped';
	import { fmtThousands } from '$lib/data/wrapped';
	import { reveal, Counter } from './useReveal.svelte';

	type Props = { me: Finisher; stats: WrappedStats };
	let { me, stats }: Props = $props();
	const counter = new Counter();
</script>

<SlideShell tone="hot">
	<div use:reveal={{ onReveal: () => counter.run(stats.global.total) }}>
		<p class="eyebrow">20 km de Bruxelles · édition 2026</p>
		<h1 class="lede">
			<strong class="mono hot">{fmtThousands(Math.round(counter.value))}</strong>
			personnes ont franchi la ligne d'arrivée.<br />
			Et vous en faisiez partie.
		</h1>
		<p class="signature">
			<em>Bravo. Voici votre course, en chiffres.</em>
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
		font-size: clamp(32px, 6vw, 56px);
		line-height: 1.05;
		letter-spacing: -0.025em;
		color: var(--ink);
		text-wrap: balance;
		max-width: 22ch;
	}
	.lede .mono {
		font-family: var(--font-mono);
		font-feature-settings: 'tnum' 1;
		color: var(--hot);
	}
	.signature {
		margin: 0;
		font-family: var(--font-display);
		font-size: clamp(16px, 2vw, 20px);
		color: var(--ink-2);
		max-width: 32ch;
	}
	.signature em {
		font-style: italic;
		color: var(--ink-3);
	}
	.lede .hot {
		color: var(--hot);
	}
</style>
