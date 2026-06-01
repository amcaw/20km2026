<script lang="ts">
	import SlideShell from './SlideShell.svelte';
	import type { Finisher } from '$lib/data/wrapped';
	import { fasterThanPct, fmtThousands } from '$lib/data/wrapped';
	import { reveal, Counter } from './useReveal.svelte';

	type Props = { me: Finisher; total: number };
	let { me, total }: Props = $props();
	const pct = $derived(fasterThanPct(me, total));
	const fromLast = $derived(total - me.pos + 1);

	const counter = new Counter();
</script>

<SlideShell tone="ink">
	<div use:reveal={{ onReveal: () => counter.run(me.pos) }}>
		<p class="eyebrow">Au classement, ça donne</p>
		<h2 class="big mono">#{fmtThousands(Math.round(counter.value))}</h2>
		<p class="sub">
			sur <strong class="hot mono">{fmtThousands(total)}</strong> finishers.
			{#if me.pos === 1}
				<em>Personne devant vous. Vous avez gagné.</em>
			{:else if me.pos <= 3}
				<em>Sur le podium. Chapeau.</em>
			{:else if me.pos <= 100}
				<em>Dans le top 100. Costaud.</em>
			{:else if fromLast <= 50}
				<em>Vous avez tenu jusqu'au bout. C'est tout ce qui compte.</em>
			{:else}
				<em
					>Vous avez fini devant <strong class="mono">{pct}%</strong> des
					participants. Solide.</em
				>
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
	.sub strong {
		font-weight: 700;
		color: var(--ink);
	}
	.sub .hot {
		color: var(--hot);
	}
	.sub em {
		display: block;
		margin-top: 8px;
		font-style: italic;
		color: var(--hot);
		font-size: 0.78em;
	}
	.sub em strong {
		color: var(--hot);
	}
	.mono {
		font-family: var(--font-mono);
		font-feature-settings: 'tnum' 1;
	}
</style>
