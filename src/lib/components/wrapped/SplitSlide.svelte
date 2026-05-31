<script lang="ts">
	import { scaleLinear } from 'd3-scale';
	import { ascending, quantile } from 'd3-array';
	import SlideShell from './SlideShell.svelte';
	import type { Finisher, WrappedStats } from '$lib/data/wrapped';
	import { fmtTime, splitProfile } from '$lib/data/wrapped';
	import { reveal, Counter } from './useReveal.svelte';

	type Props = { me: Finisher; stats: WrappedStats };
	let { me, stats }: Props = $props();

	const cloudFade = new Counter();

	const split = $derived(splitProfile(me));

	const VB = 1000;
	const PAD = { top: 24, right: 24, bottom: 90, left: 130 };
	const innerW = VB - PAD.left - PAD.right;
	const innerH = VB - PAD.top - PAD.bottom;

	type Pt = { t10: number; t2nd: number; id: string };
	const scatter = $derived.by<Pt[]>(() => {
		const out: Pt[] = stats.splitCloud.map(([t10, t2nd], i) => ({
			t10,
			t2nd,
			id: `c${i}`
		}));
		if (me.t10 !== null && me.t10 > 0) {
			out.push({ t10: me.t10, t2nd: me.t - me.t10, id: 'me' });
		}
		return out;
	});

	const domain = $derived.by(() => {
		const cloud = stats.splitCloud;
		if (!cloud.length) return [0, 1] as [number, number];
		const xs = cloud.map((p) => p[0]).sort(ascending);
		const ys = cloud.map((p) => p[1]).sort(ascending);
		const lo = Math.min(quantile(xs, 0.01) ?? xs[0], quantile(ys, 0.01) ?? ys[0]);
		const hi = Math.max(quantile(xs, 0.99) ?? xs[xs.length - 1], quantile(ys, 0.99) ?? ys[ys.length - 1]);
		return [lo, hi] as [number, number];
	});
	const x = $derived(scaleLinear().domain(domain).range([0, innerW]).clamp(true));
	const y = $derived(scaleLinear().domain(domain).range([innerH, 0]).clamp(true));

	const xTicks = $derived.by(() => {
		const [lo, hi] = domain;
		const step = Math.max(60, Math.round((hi - lo) / 5 / 60) * 60);
		const out: number[] = [];
		const start = Math.ceil(lo / step) * step;
		for (let t = start; t <= hi; t += step) out.push(t);
		return out;
	});
	const yTicks = $derived(xTicks);

	const myPoint = $derived.by(() => {
		if (me.t10 === null || me.t10 <= 0) return null;
		return { t10: me.t10, t2nd: me.t - me.t10 };
	});

	const diagP1 = $derived({ x: x(domain[0]), y: y(domain[0]) });
	const diagP2 = $derived({ x: x(domain[1]), y: y(domain[1]) });

	const slowerTri = $derived(
		`${x(domain[0])},${y(domain[0])} ${x(domain[1])},${y(domain[1])} ${x(domain[0])},${y(domain[1])}`
	);
	const fasterTri = $derived(
		`${x(domain[0])},${y(domain[0])} ${x(domain[1])},${y(domain[1])} ${x(domain[1])},${y(domain[0])}`
	);
</script>

<SlideShell tone="hot">
	<div use:reveal={{ onReveal: () => cloudFade.run(1) }}>
	<p class="eyebrow">Vos deux moitiés de course</p>
	{#if split.kind === 'unknown'}
		<p class="msg">
			Pas de temps intermédiaire au 10&nbsp;km cette année. Pas d'analyse
			possible.
		</p>
	{:else}
		<h2 class="lede">
			{#if split.kind === 'negative'}
				<em>Negative split</em>&nbsp;:
				<strong class="mono">{Math.abs(Math.round(split.deltaSecPerKm ?? 0))}&nbsp;s/km</strong>
				plus vite sur les 10 derniers&nbsp;km.
				<em
					>Énorme. Vous êtes {me.gender === 'F' ? 'montée' : 'monté'} en puissance.</em
				>
			{:else if split.kind === 'positive'}
				<strong class="mono">{Math.round(split.deltaSecPerKm ?? 0)}&nbsp;s/km</strong>
				de plus sur les 10 derniers&nbsp;km.
				<em>Normal sur 20&nbsp;km. L'important, c'est que vous l'ayez bouclé.</em>
			{:else}
				<em>Aucune dérive</em> entre les deux moitiés.
				<em>Du métronome. Bravo.</em>
			{/if}
		</h2>

		<div class="chart-wrap">
			<svg viewBox="0 0 {VB} {VB}" class="chart" aria-hidden="true">
				<g transform="translate({PAD.left},{PAD.top})">
					<polygon points={slowerTri} fill="rgba(239, 68, 68, 0.08)" />
					<polygon points={fasterTri} fill="rgba(88, 199, 194, 0.1)" />

					<line
						x1={diagP1.x}
						y1={diagP1.y}
						x2={diagP2.x}
						y2={diagP2.y}
						stroke="rgba(200, 194, 184, 0.4)"
						stroke-dasharray="6 5"
						stroke-width="1.5"
					/>

					<g opacity={cloudFade.value}>
						{#each scatter as p (p.id)}
							<circle
								cx={x(p.t10)}
								cy={y(p.t2nd)}
								r="2.4"
								fill="var(--hot)"
								fill-opacity="0.35"
							/>
						{/each}
					</g>

					<line x1={0} y1={innerH} x2={innerW} y2={innerH} stroke="var(--line)" />
					{#each xTicks as t (t)}
						<line
							x1={x(t)}
							y1={innerH}
							x2={x(t)}
							y2={innerH + 6}
							stroke="var(--ink-3)"
						/>
						<text
							x={x(t)}
							y={innerH + 28}
							text-anchor="middle"
							class="axis-label mono"
						>{fmtTime(t)}</text>
					{/each}

					<line x1={0} y1={0} x2={0} y2={innerH} stroke="var(--line)" />
					{#each yTicks as t (t)}
						<line
							x1={-6}
							y1={y(t)}
							x2={0}
							y2={y(t)}
							stroke="var(--ink-3)"
						/>
						<text
							x={-10}
							y={y(t) + 4}
							text-anchor="end"
							class="axis-label mono"
						>{fmtTime(t)}</text>
					{/each}

					<text
						x={x(domain[0]) + 18}
						y={y(domain[1]) + 28}
						class="zone-label slower"
					>↑ 2<tspan baseline-shift="super" font-size="60%">e</tspan> moitié plus lente</text>
					<text
						x={x(domain[1]) - 18}
						y={y(domain[0]) - 18}
						text-anchor="end"
						class="zone-label faster"
					>2<tspan baseline-shift="super" font-size="60%">e</tspan> moitié plus rapide ↓</text>

					{#if myPoint}
						<circle
							cx={x(myPoint.t10)}
							cy={y(myPoint.t2nd)}
							r="18"
							fill="rgba(255, 255, 255, 0.08)"
						/>
						<circle
							cx={x(myPoint.t10)}
							cy={y(myPoint.t2nd)}
							r="10"
							fill="none"
							stroke="var(--hot)"
							stroke-width="3"
						/>
						<circle
							cx={x(myPoint.t10)}
							cy={y(myPoint.t2nd)}
							r="5"
							fill="#ffffff"
						/>
						<text
							x={x(myPoint.t10) + 16}
							y={y(myPoint.t2nd) - 14}
							class="me-label mono"
						>vous</text>
					{/if}

					<text
						x={innerW / 2}
						y={innerH + 76}
						text-anchor="middle"
						class="axis-title"
					>Temps sur le 1<tspan baseline-shift="super" font-size="60%">er</tspan> 10&nbsp;km</text>
					<text
						transform="translate(-110,{innerH / 2}) rotate(-90)"
						text-anchor="middle"
						class="axis-title"
					>Temps sur le 2<tspan baseline-shift="super" font-size="60%">e</tspan> 10&nbsp;km</text>
				</g>
			</svg>
		</div>

		{#if me.t10 !== null && me.t10 > 0}
			<div class="my-splits">
				<span class="split-half">
					<span class="split-key">1<sup>er</sup> 10&nbsp;km</span>
					<span class="split-time mono">{fmtTime(me.t10)}</span>
				</span>
				<span class="split-half split-half-end">
					<span class="split-key">2<sup>e</sup> 10&nbsp;km</span>
					<span class="split-time mono">{fmtTime(me.t - me.t10)}</span>
				</span>
			</div>
		{/if}
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
		font-size: clamp(16px, 2.4vw, 22px);
		line-height: 1.3;
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

	.my-splits {
		--chart-side: min(100%, 800px, calc(100dvh - 300px));
		width: var(--chart-side);
		margin: 0 auto;
		display: flex;
		align-items: baseline;
		justify-content: space-between;
		gap: 12px;
		padding: 0 4px;
		font-family: var(--font-ui);
	}
	.split-half {
		display: inline-flex;
		align-items: baseline;
		gap: 10px;
	}
	.split-half-end {
		text-align: right;
	}
	.split-key {
		font-size: 10px;
		font-weight: 700;
		letter-spacing: 0.14em;
		text-transform: uppercase;
		color: var(--ink-3);
	}
	.split-time {
		font-family: var(--font-mono);
		font-feature-settings: 'tnum' 1;
		font-size: clamp(18px, 2.2vw, 22px);
		font-weight: 700;
		color: var(--hot);
		letter-spacing: -0.01em;
	}

	.chart-wrap {
		--chart-side: min(100%, 800px, calc(100dvh - 300px));
		position: relative;
		width: var(--chart-side);
		height: var(--chart-side);
		margin: 0 auto;
		min-height: 320px;
	}
	.chart {
		display: block;
		width: 100%;
		height: 100%;
	}
	.axis-label {
		font-size: 22px;
		fill: var(--ink-3);
		font-family: var(--font-mono);
		font-feature-settings: 'tnum' 1;
	}
	.axis-title {
		font-size: 22px;
		fill: var(--ink-3);
		font-family: var(--font-ui);
		letter-spacing: 0.04em;
		text-transform: uppercase;
		font-weight: 700;
	}
	.zone-label {
		font-family: var(--font-ui);
		font-size: 22px;
		font-weight: 700;
		letter-spacing: 0.02em;
	}
	.zone-label.slower {
		fill: #ef4444;
	}
	.zone-label.faster {
		fill: var(--hot);
	}
	.me-label {
		font-family: var(--font-mono);
		font-feature-settings: 'tnum' 1;
		font-size: 26px;
		font-weight: 700;
		fill: #ffffff;
	}
	.msg {
		font-family: var(--font-display);
		font-size: clamp(20px, 3vw, 28px);
		color: var(--ink-2);
		line-height: 1.4;
		max-width: 32ch;
	}
	.mono {
		font-family: var(--font-mono);
		font-feature-settings: 'tnum' 1;
	}
</style>
