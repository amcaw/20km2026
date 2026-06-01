<script lang="ts">
	import type { Snippet } from 'svelte';
	import { reveal } from './useReveal.svelte';
	import { t } from '$lib/i18n';

	type Props = {
		tone?: 'ink' | 'hot';
		source?: boolean;
		children: Snippet;
	};
	let { tone = 'ink', source = true, children }: Props = $props();
</script>

<section class="slide tone-{tone}" aria-roledescription="slide">
	<div class="grid-bg" aria-hidden="true"></div>
	<div class="content" use:reveal>
		{@render children()}
	</div>
	{#if source}
		<a
			class="source-line"
			href="https://www.acn-timing.com/?lng=EN#/events/2159385002573923/ctx/20260531_20km/generic/199034_1/home/LIVE1"
			target="_blank"
			rel="noopener noreferrer"
		>{t().sourceLine}</a>
	{/if}
</section>

<style>
	.slide {
		position: relative;
		scroll-snap-align: start;
		scroll-snap-stop: always;
		min-height: 100dvh;
		width: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		padding: clamp(40px, 8dvh, 96px) clamp(24px, 6vw, 80px);
		background: var(--bg);
		color: var(--ink);
		box-sizing: border-box;
		overflow: hidden;
		isolation: isolate;
	}
	.content {
		position: relative;
		flex: 1;
		display: flex;
		flex-direction: column;
		justify-content: center;
		gap: clamp(16px, 3dvh, 40px);
		max-width: 720px;
		width: 100%;
		margin: 0 auto;
		opacity: 0;
		transform: translateY(16px);
		transition:
			opacity 600ms cubic-bezier(0.22, 1, 0.36, 1),
			transform 600ms cubic-bezier(0.22, 1, 0.36, 1);
	}
	:global(.content[data-revealed='true']) {
		opacity: 1;
		transform: translateY(0);
	}
	@media (prefers-reduced-motion: reduce) {
		.content {
			opacity: 1;
			transform: none;
			transition: none;
		}
	}
	.grid-bg {
		position: absolute;
		inset: 0;
		z-index: -1;
		background:
			radial-gradient(circle at 20% 10%, rgba(88, 199, 194, 0.1) 0%, transparent 55%),
			radial-gradient(circle at 80% 90%, rgba(88, 199, 194, 0.06) 0%, transparent 55%),
			linear-gradient(var(--line) 1px, transparent 1px) 0 0 / 22px 22px,
			linear-gradient(90deg, var(--line) 1px, transparent 1px) 0 0 / 22px 22px;
		-webkit-mask-image: radial-gradient(circle at 50% 50%, #000 40%, transparent 85%);
		mask-image: radial-gradient(circle at 50% 50%, #000 40%, transparent 85%);
		opacity: 0.55;
		pointer-events: none;
	}
	.tone-hot .grid-bg {
		background:
			radial-gradient(circle at 50% 50%, rgba(88, 199, 194, 0.22) 0%, transparent 60%),
			linear-gradient(var(--line) 1px, transparent 1px) 0 0 / 22px 22px,
			linear-gradient(90deg, var(--line) 1px, transparent 1px) 0 0 / 22px 22px;
	}

	.source-line {
		position: absolute;
		left: 0;
		right: 0;
		bottom: clamp(12px, 2.4dvh, 24px);
		margin: 0;
		padding: 0 clamp(24px, 6vw, 80px);
		text-align: center;
		font-family: var(--font-ui);
		font-size: 10px;
		letter-spacing: 0.04em;
		color: var(--ink-4);
		text-decoration: none;
		transition: color 120ms ease;
	}
	.source-line:hover {
		color: var(--ink-2);
		text-decoration: underline;
		text-underline-offset: 2px;
	}
	.source-line:focus-visible {
		outline: 2px solid var(--hot);
		outline-offset: 2px;
		border-radius: 4px;
	}
</style>
