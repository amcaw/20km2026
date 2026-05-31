<script lang="ts">
	import { scaleLinear } from 'd3-scale';
	import SlideShell from './SlideShell.svelte';
	import type { Finisher } from '$lib/data/wrapped';
	import { fmtThousands } from '$lib/data/wrapped';
	import { reveal, Counter } from './useReveal.svelte';

	type Props = { me: Finisher; total: number };
	let { me, total }: Props = $props();

	const draw = new Counter();

	type Stop = { km: number; label: string; pos: number };
	const stops = $derived.by<Stop[]>(() => {
		const raw: { km: number; label: string; pos: number | null }[] = [
			{ km: 5.5, label: '5,5 km', pos: me.pos55 },
			{ km: 10, label: '10 km', pos: me.pos10 },
			{ km: 15, label: '15 km', pos: me.pos15 },
			{ km: 20.04, label: 'Arrivée', pos: me.pos }
		];
		return raw.filter((s): s is Stop => s.pos != null && s.pos > 0);
	});

	const hasTrajectory = $derived(stops.length >= 2);

	const firstPos = $derived(stops.length ? stops[0].pos : me.pos);
	const lastLegGain = $derived(
		stops.length >= 2 ? stops[stops.length - 2].pos - stops[stops.length - 1].pos : 0
	);
	const netGain = $derived(stops.length ? firstPos - stops[stops.length - 1].pos : 0);

	const VB_W = 1000;
	const VB_H = 460;
	const PAD = { top: 48, right: 90, bottom: 56, left: 90 };
	const innerW = VB_W - PAD.left - PAD.right;
	const innerH = VB_H - PAD.top - PAD.bottom;

	const posExtent = $derived.by(() => {
		const ps = stops.map((s) => s.pos);
		let lo = Math.min(...ps);
		let hi = Math.max(...ps);
		const span = Math.max(hi - lo, 1);
		const pad = Math.max(Math.round(span * 0.25), 1);
		lo = Math.max(1, lo - pad);
		hi = Math.min(total, hi + pad);
		return [lo, hi] as [number, number];
	});

	const x = $derived(scaleLinear().domain([5.5, 20.04]).range([0, innerW]));
	const y = $derived(scaleLinear().domain(posExtent).range([0, innerH]));

	const points = $derived(stops.map((s) => ({ ...s, px: x(s.km), py: y(s.pos) })));

	const linePath = $derived.by(() => {
		const p = points;
		if (p.length < 2) return '';
		if (p.length === 2) return `M${p[0].px},${p[0].py} L${p[1].px},${p[1].py}`;
		let d = `M${p[0].px.toFixed(1)},${p[0].py.toFixed(1)}`;
		for (let i = 0; i < p.length - 1; i++) {
			const p0 = p[i - 1] ?? p[i];
			const p1 = p[i];
			const p2 = p[i + 1];
			const p3 = p[i + 2] ?? p2;
			const c1x = p1.px + (p2.px - p0.px) / 6;
			const c1y = p1.py + (p2.py - p0.py) / 6;
			const c2x = p2.px - (p3.px - p1.px) / 6;
			const c2y = p2.py - (p3.py - p1.py) / 6;
			d += ` C${c1x.toFixed(1)},${c1y.toFixed(1)} ${c2x.toFixed(1)},${c2y.toFixed(1)} ${p2.px.toFixed(1)},${p2.py.toFixed(1)}`;
		}
		return d;
	});

	let pathEl = $state<SVGPathElement | null>(null);
	let pathLen = $state(1000);
	$effect(() => {
		if (pathEl) pathLen = pathEl.getTotalLength();
	});
	const dashOffset = $derived(pathLen * (1 - draw.value));
</script>

<SlideShell tone="hot">
	<div use:reveal={{ onReveal: () => draw.run(1) }}>
		<p class="eyebrow">Votre course dans le peloton</p>
		{#if hasTrajectory}
			<h2 class="lede">
				{#if lastLegGain > 20}
					Sur la fin, vous avez doublé
					<strong class="mono">{fmtThousands(lastLegGain)}</strong>
					coureurs. <em>Vous avez fini en force.</em>
				{:else if netGain > 20}
					Du départ à l'arrivée, vous avez remonté
					<strong class="mono">{fmtThousands(netGain)}</strong>
					places. <em>Belle gestion.</em>
				{:else if netGain < -20}
					Vous avez tenu un rythme régulier et laissé filer
					<strong class="mono">{fmtThousands(-netGain)}</strong>
					places sur la fin. <em>Le 20 km use, c'est normal.</em>
				{:else}
					Du début à la fin, vous avez gardé votre place dans le peloton.
					<em>Du métronome.</em>
				{/if}
			</h2>
		{:else}
			<h2 class="lede">
				Pas assez de temps intermédiaires cette année pour retracer votre
				progression dans le peloton.
			</h2>
		{/if}

		{#if hasTrajectory}
			<div class="chart-wrap">
				<svg viewBox="0 0 {VB_W} {VB_H}" class="chart" aria-hidden="true">
					<g transform="translate({PAD.left},{PAD.top})">
						<text x={-70} y={12} class="axis-hint">↑ mieux</text>
						<text x={-70} y={innerH} class="axis-hint">↓</text>

						<path
							bind:this={pathEl}
							d={linePath}
							fill="none"
							stroke="var(--hot)"
							stroke-width="4"
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-dasharray={pathLen}
							stroke-dashoffset={dashOffset}
						/>

						{#each points as p, i (p.km)}
							{@const isFinish = i === points.length - 1}
							<circle
								cx={p.px}
								cy={p.py}
								r={isFinish ? 9 : 6}
								fill={isFinish ? '#ffffff' : 'var(--hot)'}
								stroke={isFinish ? 'var(--hot)' : 'none'}
								stroke-width="3"
								opacity={draw.value}
							/>
							<text
								x={p.px}
								y={p.py - 18}
								text-anchor="middle"
								class="pos-label mono"
								opacity={draw.value}
							>#{fmtThousands(p.pos)}</text>
							<text
								x={p.px}
								y={innerH + 34}
								text-anchor="middle"
								class="km-label mono"
							>{p.label}</text>
						{/each}
					</g>
				</svg>
			</div>
		{/if}
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
	.lede em {
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
		width: 100%;
		max-width: 720px;
	}
	.chart {
		display: block;
		width: 100%;
		height: auto;
	}
	.pos-label {
		font-family: var(--font-mono);
		font-feature-settings: 'tnum' 1;
		font-size: 22px;
		font-weight: 700;
		fill: var(--ink);
	}
	.km-label {
		font-family: var(--font-mono);
		font-feature-settings: 'tnum' 1;
		font-size: 22px;
		fill: var(--ink-3);
	}
	.axis-hint {
		font-family: var(--font-ui);
		font-size: 20px;
		font-weight: 700;
		fill: var(--ink-3);
	}
	.mono {
		font-family: var(--font-mono);
		font-feature-settings: 'tnum' 1;
	}
</style>
