<script lang="ts">
	import SlideShell from './SlideShell.svelte';
	import type { Finisher } from '$lib/data/wrapped';
	import { reveal, Counter } from './useReveal.svelte';

	type Props = { me: Finisher };
	let { me }: Props = $props();

	const growth = new Counter();

	function fmtKm(km: number): string {
		return String(km).replace('.', ',').replace(/,0$/, '');
	}

	type Leg = { label: string; from: number; to: number; speed: number };
	const legs = $derived.by<Leg[]>(() => {
		const pts: { km: number; t: number | null }[] = [
			{ km: 0, t: 0 },
			{ km: 5.5, t: me.t55 },
			{ km: 10, t: me.t10 },
			{ km: 15, t: me.t15 },
			{ km: 20, t: me.t }
		];
		const out: Leg[] = [];
		for (let i = 1; i < pts.length; i++) {
			const a = pts[i - 1];
			const b = pts[i];
			if (a.t == null || b.t == null || b.t <= a.t) continue;
			const dKm = b.km - a.km;
			const dH = (b.t - a.t) / 3600;
			out.push({
				label: `${fmtKm(a.km)}–${fmtKm(b.km)}`,
				from: a.km,
				to: b.km,
				speed: dKm / dH
			});
		}
		return out;
	});

	const hasLegs = $derived(legs.length >= 2);

	const fastestIdx = $derived(
		legs.length ? legs.reduce((bi, l, i, arr) => (l.speed > arr[bi].speed ? i : bi), 0) : -1
	);
	const slowestIdx = $derived(
		legs.length ? legs.reduce((bi, l, i, arr) => (l.speed < arr[bi].speed ? i : bi), 0) : -1
	);
	const slowest = $derived(slowestIdx >= 0 ? legs[slowestIdx] : null);

	const speeds = $derived(legs.map((l) => l.speed));
	const sMin = $derived(speeds.length ? Math.min(...speeds) : 0);
	const sMax = $derived(speeds.length ? Math.max(...speeds) : 1);
	const axisLo = $derived(Math.max(0, sMin - (sMax - sMin) * 0.6 - 0.3));
	function barFrac(speed: number): number {
		const span = sMax - axisLo;
		return span > 0 ? (speed - axisLo) / span : 1;
	}

	function fmtSpeed(kmh: number): string {
		return kmh.toFixed(1).replace('.', ',').replace(/,0$/, '');
	}

	const slowestPhrase = $derived.by(() => {
		if (!slowest) return '';
		if (slowest.from === 0) return `sur les ${fmtKm(slowest.to)} premiers km`;
		if (slowestIdx === legs.length - 1)
			return `dans les ${fmtKm(slowest.to - slowest.from)} derniers km`;
		return `entre ${fmtKm(slowest.from)} et ${fmtKm(slowest.to)} km`;
	});
</script>

<SlideShell tone="ink">
	<div use:reveal={{ onReveal: () => growth.run(1) }}>
		<p class="eyebrow">Votre vitesse, kilomètre après kilomètre</p>
		{#if hasLegs && slowest}
			<h2 class="lede">
				Votre passage le plus lent&nbsp;:
				<em class="hot">{slowestPhrase}</em>
				({fmtSpeed(slowest.speed)}&nbsp;km/h).
				<em>Tout le monde a son moment difficile. Vous l'avez surmonté.</em>
			</h2>
		{:else}
			<h2 class="lede">
				Pas assez de temps intermédiaires cette année pour détailler votre
				vitesse par tronçon.
			</h2>
		{/if}

		{#if hasLegs}
			<div class="legs">
				{#each legs as leg, i (leg.label)}
					<div class="leg" class:leg-slow={i === slowestIdx} class:leg-fast={i === fastestIdx}>
						<span class="leg-label mono">{leg.label} km</span>
						<div class="leg-track">
							<div
								class="leg-fill"
								class:fill-slow={i === slowestIdx}
								class:fill-fast={i === fastestIdx}
								style="width: {barFrac(leg.speed) * 100 * growth.value}%"
							></div>
						</div>
						<span class="leg-speed mono">{fmtSpeed(leg.speed)}<span class="unit">km/h</span></span>
					</div>
				{/each}
			</div>

			<p class="legend mono">
				<span class="legend-item"><span class="dot dot-fast"></span> Votre tronçon le plus rapide</span>
				<span class="legend-item"><span class="dot dot-slow"></span> Le plus lent</span>
			</p>
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
	.lede em.hot {
		color: var(--hot);
	}

	.legs {
		display: flex;
		flex-direction: column;
		gap: clamp(10px, 1.8dvh, 18px);
		width: 100%;
		max-width: 640px;
	}
	.leg {
		display: grid;
		grid-template-columns: 88px 1fr auto;
		align-items: center;
		gap: 14px;
	}
	.leg-label {
		font-family: var(--font-mono);
		font-feature-settings: 'tnum' 1;
		font-size: 13px;
		color: var(--ink-3);
		white-space: nowrap;
	}
	.leg-track {
		height: 18px;
		background: var(--bg-2);
		border: 1px solid var(--line);
		border-radius: 999px;
		overflow: hidden;
	}
	.leg-fill {
		height: 100%;
		border-radius: 999px;
		background: rgba(200, 194, 184, 0.5);
		transition: width 900ms cubic-bezier(0.22, 1, 0.36, 1);
	}
	.fill-fast {
		background: var(--hot);
	}
	.fill-slow {
		background: #ef6a5a;
	}
	.leg-speed {
		font-family: var(--font-mono);
		font-feature-settings: 'tnum' 1;
		font-size: clamp(16px, 2.2vw, 20px);
		font-weight: 700;
		color: var(--ink);
		white-space: nowrap;
	}
	.leg-fast .leg-speed {
		color: var(--hot);
	}
	.unit {
		font-size: 0.6em;
		font-weight: 500;
		color: var(--ink-3);
		margin-left: 3px;
	}

	.legend {
		display: flex;
		flex-wrap: wrap;
		gap: 8px 18px;
		margin: 0;
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
	.dot {
		display: inline-block;
		width: 12px;
		height: 12px;
		border-radius: 50%;
	}
	.dot-fast {
		background: var(--hot);
	}
	.dot-slow {
		background: #ef6a5a;
	}
	.mono {
		font-family: var(--font-mono);
		font-feature-settings: 'tnum' 1;
	}
</style>
