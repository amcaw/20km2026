<script lang="ts">
	import SlideShell from './SlideShell.svelte';
	import type { Finisher, WrappedStats } from '$lib/data/wrapped';
	import { fmtThousands } from '$lib/data/wrapped';
	import { reveal, Counter } from './useReveal.svelte';
	import { t } from '$lib/i18n';
	import { lang } from '$lib/i18n/lang.svelte';
	import { countryInfo } from '$lib/i18n/countries';

	type Props = { me: Finisher; stats: WrappedStats };
	let { me, stats }: Props = $props();
	const counter = new Counter();

	const mine = $derived(countryInfo(me.country, lang.value));
	const myCount = $derived(me.country ? stats.byCountry[me.country] ?? 0 : 0);
	const isBel = $derived(me.country === 'BEL');

	const topCountries = $derived(
		Object.entries(stats.byCountry)
			.sort((a, b) => b[1] - a[1])
			.slice(0, 6)
			.map(([code, n]) => ({ code, n, ...countryInfo(code, lang.value)! }))
	);

	// Flipped on reveal; each flag row reads its own staggered delay off of
	// it for a cascade-in (fade + slide from the left), one after another.
	let rowsIn = $state(false);
	function onReveal() {
		counter.run(myCount);
		rowsIn = true;
	}
</script>

<SlideShell tone="hot">
	<div use:reveal={{ onReveal }}>
		<p class="eyebrow">{t().country.eyebrow}</p>
		{#if mine && myCount > 0}
			<h2 class="lede">
				{@html t().country.lede(
					fmtThousands(Math.round(counter.value)),
					mine.demo,
					mine.flag,
					isBel
				)}
			</h2>
		{:else}
			<h2 class="lede">
				{@html t().country.ledeFallback(fmtThousands(stats.countriesCount))}
			</h2>
		{/if}

		<div class="flags">
			{#each topCountries as c, i (c.code)}
				<div
					class="flag-row"
					class:flag-row-mine={c.code === me.country}
					class:flag-row-in={rowsIn}
					style="transition-delay: {120 + i * 90}ms"
				>
					<span class="flag-emoji">{c.flag}</span>
					<span class="flag-name">{c.name}</span>
					<span class="flag-n mono">{fmtThousands(c.n)}</span>
				</div>
			{/each}
		</div>

		<p class="sub">
			{@html t().country.sub(fmtThousands(stats.countriesCount))}
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
		font-size: clamp(26px, 4.6vw, 44px);
		line-height: 1.12;
		letter-spacing: -0.02em;
		color: var(--ink);
		text-wrap: balance;
		max-width: 20ch;
	}
	.lede :global(.mono) {
		font-family: var(--font-mono);
		font-feature-settings: 'tnum' 1;
		color: var(--hot);
	}
	.lede :global(em) {
		font-style: italic;
		color: var(--ink-2);
		font-weight: 500;
		font-size: 0.62em;
		display: block;
		margin-top: 8px;
	}
	.lede :global(.flag) {
		font-style: normal;
	}

	.flags {
		display: flex;
		flex-direction: column;
		gap: 6px;
		width: 100%;
		max-width: 420px;
	}
	.flag-row {
		display: grid;
		grid-template-columns: 28px 1fr auto;
		align-items: center;
		gap: 12px;
		padding: 8px 12px;
		border: 1px solid var(--line);
		border-radius: 8px;
		background: var(--bg-2);
		font-family: var(--font-ui);
		font-size: 13px;
		color: var(--ink-2);
		/* Hidden until reveal; .flag-row-in cascades each row in (the
		   per-row delay is set inline by index). */
		opacity: 0;
		transform: translateX(-14px);
		transition:
			opacity 420ms cubic-bezier(0.22, 1, 0.36, 1),
			transform 420ms cubic-bezier(0.22, 1, 0.36, 1);
	}
	.flag-row-in {
		opacity: 1;
		transform: translateX(0);
	}
	@media (prefers-reduced-motion: reduce) {
		.flag-row {
			opacity: 1;
			transform: none;
			transition: none;
		}
	}
	.flag-row-mine {
		border-color: var(--hot);
		background: rgba(var(--hot-rgb), 0.08);
		color: var(--ink);
	}
	.flag-emoji {
		font-size: 18px;
	}
	.flag-n {
		font-family: var(--font-mono);
		font-feature-settings: 'tnum' 1;
		font-weight: 700;
		color: var(--ink);
	}

	.sub {
		margin: 0;
		font-family: var(--font-ui);
		font-size: 13px;
		color: var(--ink-3);
	}
	.sub :global(strong) {
		color: var(--ink-2);
		font-weight: 700;
	}
	.mono {
		font-family: var(--font-mono);
		font-feature-settings: 'tnum' 1;
	}
</style>
