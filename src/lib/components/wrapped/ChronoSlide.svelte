<script lang="ts">
	import SlideShell from './SlideShell.svelte';
	import type { Finisher } from '$lib/data/wrapped';
	import { fmtTime } from '$lib/data/wrapped';
	import { reveal, Counter } from './useReveal.svelte';

	type Props = { me: Finisher };
	let { me }: Props = $props();

	const counter = new Counter();
</script>

<SlideShell tone="hot">
	<div use:reveal={{ onReveal: () => counter.run(me.t) }}>
		<p class="eyebrow">Et vous avez fini en</p>
		<h2 class="big mono">{fmtTime(Math.round(counter.value))}</h2>
		<p class="sub">
			20&nbsp;km dans les jambes. <em>Chapeau pour le chrono.</em>
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
		text-wrap: balance;
		max-width: 24ch;
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
