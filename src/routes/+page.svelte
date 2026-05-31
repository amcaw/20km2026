<script lang="ts">
	import { onMount } from 'svelte';
	import {
		loadStats,
		type Finisher,
		type WrappedStats
	} from '$lib/data/wrapped';
	import WrappedPips from '$lib/components/wrapped/WrappedPips.svelte';
	import SearchSlide from '$lib/components/wrapped/SearchSlide.svelte';
	import CoverSlide from '$lib/components/wrapped/CoverSlide.svelte';
	import GenderSlide from '$lib/components/wrapped/GenderSlide.svelte';
	import AgeBandSlide from '$lib/components/wrapped/AgeBandSlide.svelte';
	import CategoryBreakdownSlide from '$lib/components/wrapped/CategoryBreakdownSlide.svelte';
	import ChronoSlide from '$lib/components/wrapped/ChronoSlide.svelte';
	import PaceSlide from '$lib/components/wrapped/PaceSlide.svelte';
	import RankSlide from '$lib/components/wrapped/RankSlide.svelte';
	import FinishTimeDistSlide from '$lib/components/wrapped/FinishTimeDistSlide.svelte';
	import CategoryDistributionSlide from '$lib/components/wrapped/CategoryDistributionSlide.svelte';
	import SplitSlide from '$lib/components/wrapped/SplitSlide.svelte';
	import SpeedProfileSlide from '$lib/components/wrapped/SpeedProfileSlide.svelte';
	import RankProgressSlide from '$lib/components/wrapped/RankProgressSlide.svelte';
	import ShareSlide from '$lib/components/wrapped/ShareSlide.svelte';

	let stats = $state<WrappedStats | null>(null);
	let loading = $state(true);
	let errorMsg = $state<string | null>(null);

	let me = $state<Finisher | null>(null);

	const TOTAL_CONTENT_SLIDES = 13;

	let scrollEl = $state<HTMLElement | null>(null);

	let activeSlide = $state(0);

	onMount(async () => {
		try {
			stats = await loadStats();
		} catch (e) {
			errorMsg = e instanceof Error ? e.message : String(e);
		} finally {
			loading = false;
		}
	});

	$effect(() => {
		if (!scrollEl || !me) return;
		const slides = Array.from(
			scrollEl.querySelectorAll<HTMLElement>('[data-slide]')
		);
		const visibility = new Map<number, number>();
		const io = new IntersectionObserver(
			(entries) => {
				for (const e of entries) {
					const idx = Number((e.target as HTMLElement).dataset.slide);
					visibility.set(idx, e.intersectionRatio);
				}
				let bestIdx = activeSlide;
				let bestRatio = 0;
				for (const [idx, ratio] of visibility) {
					if (ratio > bestRatio) {
						bestRatio = ratio;
						bestIdx = idx;
					}
				}
				activeSlide = bestIdx;
			},
			{ root: scrollEl, threshold: [0, 0.25, 0.5, 0.75, 1] }
		);
		for (const s of slides) io.observe(s);
		return () => io.disconnect();
	});

	function handleSelect(f: Finisher) {
		me = f;
		queueMicrotask(() => {
			const next = scrollEl?.querySelector<HTMLElement>('[data-slide="1"]');
			next?.scrollIntoView({ behavior: 'smooth', block: 'start' });
		});
	}

	function restart() {
		me = null;
		scrollEl?.scrollTo({ top: 0, behavior: 'smooth' });
	}

	function gotoSlide(idx: number) {
		if (!scrollEl) return;
		const target = scrollEl.querySelector<HTMLElement>(`[data-slide="${idx}"]`);
		target?.scrollIntoView({ behavior: 'smooth', block: 'start' });
	}

	function tryStep(direction: 1 | -1) {
		if (!me) return;
		const next = activeSlide + direction;
		if (next < 0 || next > TOTAL_CONTENT_SLIDES) return;
		gotoSlide(next);
	}

	function isTypingTarget(el: EventTarget | null): boolean {
		if (!(el instanceof HTMLElement)) return false;
		const tag = el.tagName;
		return (
			tag === 'INPUT' ||
			tag === 'TEXTAREA' ||
			tag === 'SELECT' ||
			el.isContentEditable
		);
	}

	$effect(() => {
		if (!me) return;
		function onKey(e: KeyboardEvent) {
			if (e.metaKey || e.ctrlKey || e.altKey) return;
			if (isTypingTarget(e.target)) return;
			const k = e.key;
			if (k === 'ArrowDown' || k === 'PageDown' || k === ' ' || k === 'Enter') {
				e.preventDefault();
				tryStep(1);
			} else if (k === 'ArrowUp' || k === 'PageUp') {
				e.preventDefault();
				tryStep(-1);
			}
		}
		window.addEventListener('keydown', onKey);
		return () => window.removeEventListener('keydown', onKey);
	});

	const catStats = $derived(
		me && stats ? stats.byCategory[me.category] ?? null : null
	);
</script>

<svelte:head>
	<title>Récap personnel · 20 km de Bruxelles 2026</title>
	<meta
		name="description"
		content="Découvrez votre récap personnel des 20 km de Bruxelles 2026 : chrono, classement, gestion d'effort et comparaisons."
	/>
</svelte:head>

<main class="wrapped" bind:this={scrollEl}>
	{#if errorMsg}
		<section class="status">
			<p class="status-msg">Impossible de charger les résultats : {errorMsg}</p>
		</section>
	{:else}
		<div data-slide="0">
			<SearchSlide {loading} onSelect={handleSelect} />
		</div>

		{#if me && stats && catStats}
			<div data-slide="1">
				<CoverSlide {me} {stats} />
			</div>
			<div data-slide="2">
				<GenderSlide {me} {stats} />
			</div>
			<div data-slide="3">
				<AgeBandSlide {me} {stats} />
			</div>
			<div data-slide="4">
				<CategoryBreakdownSlide {me} {stats} />
			</div>
			<div data-slide="5">
				<ChronoSlide {me} />
			</div>
			<div data-slide="6">
				<PaceSlide {me} {catStats} />
			</div>
			<div data-slide="7">
				<RankSlide {me} total={stats.global.total} />
			</div>
			<div data-slide="8">
				<FinishTimeDistSlide {me} {stats} />
			</div>
			<div data-slide="9">
				<CategoryDistributionSlide {me} {catStats} />
			</div>
			<div data-slide="10">
				<SplitSlide {me} {stats} />
			</div>
			<div data-slide="11">
				<SpeedProfileSlide {me} />
			</div>
			<div data-slide="12">
				<RankProgressSlide {me} total={stats.global.total} />
			</div>
			<div data-slide="13">
				<ShareSlide
					{me}
					genderCurve={stats.genderRankCurve[me.gender === 'F' ? 'F' : 'M']}
					total={stats.global.total}
					{catStats}
					onRestart={restart}
				/>
			</div>
		{/if}
	{/if}
</main>

{#if me && activeSlide >= 1}
	<div class="pips-anchor">
		<WrappedPips current={activeSlide} total={TOTAL_CONTENT_SLIDES} />
	</div>

	<div class="scroll-nav">
		<button
			type="button"
			class="nav-btn"
			aria-label={activeSlide === 1 ? 'Retour à la recherche' : 'Slide précédente'}
			disabled={activeSlide <= 0}
			onclick={() => tryStep(-1)}
		>
			<svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
				<path
					d="M6 15l6-6 6 6"
					fill="none"
					stroke="currentColor"
					stroke-width="2.2"
					stroke-linecap="round"
					stroke-linejoin="round"
				/>
			</svg>
		</button>
		<button
			type="button"
			class="nav-btn"
			aria-label="Slide suivante"
			disabled={activeSlide >= TOTAL_CONTENT_SLIDES}
			onclick={() => tryStep(1)}
		>
			<svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
				<path
					d="M6 9l6 6 6-6"
					fill="none"
					stroke="currentColor"
					stroke-width="2.2"
					stroke-linecap="round"
					stroke-linejoin="round"
				/>
			</svg>
		</button>
	</div>
{/if}

<style>
	.wrapped {
		position: fixed;
		inset: 0;
		overflow-y: auto;
		overscroll-behavior-y: contain;
		scroll-snap-type: y mandatory;
		-webkit-overflow-scrolling: touch;
		background: var(--bg);
		color: var(--ink);
	}
	.wrapped::-webkit-scrollbar {
		display: none;
	}
	.status {
		min-height: 100dvh;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 40px;
	}
	.status-msg {
		font-family: var(--font-ui);
		color: var(--ink-2);
		font-size: 14px;
		text-align: center;
		max-width: 40ch;
	}

	.pips-anchor {
		position: fixed;
		top: max(24px, env(safe-area-inset-top, 24px));
		left: 0;
		right: 0;
		padding: 0 clamp(24px, 5vw, 48px);
		box-sizing: border-box;
		display: flex;
		justify-content: center;
		pointer-events: none;
		z-index: 50;
	}

	.scroll-nav {
		position: fixed;
		right: 16px;
		bottom: max(16px, env(safe-area-inset-bottom, 16px));
		z-index: 50;
		display: flex;
		flex-direction: column;
		gap: 8px;
	}
	.nav-btn {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 40px;
		height: 40px;
		border-radius: 50%;
		background: rgba(21, 24, 26, 0.85);
		border: 1px solid var(--line);
		color: var(--ink-2);
		cursor: pointer;
		backdrop-filter: blur(8px);
		-webkit-backdrop-filter: blur(8px);
		transition:
			background-color 150ms ease,
			border-color 150ms ease,
			color 150ms ease,
			opacity 150ms ease,
			transform 150ms ease;
	}
	.nav-btn:hover:not(:disabled) {
		background: var(--bg-3);
		border-color: var(--line-2);
		color: var(--ink);
	}
	.nav-btn:active:not(:disabled) {
		transform: scale(0.94);
	}
	.nav-btn:focus-visible {
		outline: 2px solid var(--ink);
		outline-offset: 2px;
	}
	.nav-btn:disabled {
		opacity: 0.3;
		cursor: not-allowed;
	}
	@media (min-width: 768px) {
		.scroll-nav {
			right: 24px;
			bottom: max(24px, env(safe-area-inset-bottom, 24px));
		}
		.nav-btn {
			width: 44px;
			height: 44px;
		}
	}
</style>
