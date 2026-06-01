<script lang="ts">
	import SlideShell from './SlideShell.svelte';
	import ShareRow from '$lib/components/ShareRow.svelte';
	import type { CategoryStats, Finisher, RankCurve } from '$lib/data/wrapped';
	import {
		fasterThanPct,
		fmtPace,
		fmtThousands,
		fmtTime,
		genderRank,
		paceFor,
		COURSE_KM
	} from '$lib/data/wrapped';
	import { t } from '$lib/i18n';

	type Props = {
		me: Finisher;
		genderCurve: RankCurve | null;
		total: number;
		catStats: CategoryStats | null;
		onRestart: () => void;
	};
	let { me, genderCurve, total, catStats, onRestart }: Props = $props();

	const pct = $derived(fasterThanPct(me, total));
	const myPace = $derived(paceFor(me.t, COURSE_KM));

	const shareTitle = $derived.by(() => {
		const tt = fmtTime(me.t);
		const n = fmtThousands(total);
		if (me.pos === 1) return t().share.shareTitleWon(tt);
		if (me.pos <= 100) return t().share.shareTitleTop100(me.pos, tt, n);
		return t().share.shareTitleGeneric(tt, Math.max(1, 100 - pct), n);
	});

	const showGender = $derived((me.gender === 'F' || me.gender === 'M') && genderCurve != null);
	const gRank = $derived(genderCurve ? genderRank(genderCurve, me) : null);

	// Capitalised gender noun for the stat tile label (the dict noun is
	// lower-case; capitalise the first letter for a tile heading).
	const genderNoun = $derived.by(() => {
		const n = me.gender === 'F' ? t().gender.labelF : t().gender.labelM;
		return n.charAt(0).toUpperCase() + n.slice(1);
	});

	function prettyName(raw: string): string {
		if (!raw) return '—';
		const parts = raw.trim().split(/\s+/);
		const last: string[] = [];
		const first: string[] = [];
		for (const p of parts) {
			if (p.length > 1 && p === p.toUpperCase() && /[A-ZÀ-Ý]/.test(p)) last.push(p);
			else first.push(p);
		}
		const titleCase = (w: string) =>
			w
				.split('-')
				.map((s) => (s ? s[0] + s.slice(1).toLowerCase() : s))
				.join('-');
		const lastName = last.map(titleCase).join(' ');
		const firstName = first.join(' ');
		return `${firstName} ${lastName}`.trim() || raw;
	}
	const displayName = $derived(prettyName(me.name));
</script>

<SlideShell tone="hot">
	<section class="personal">
		<div class="p-label">{t().share.label}</div>
		<h1 class="p-name">{displayName}</h1>
		<div class="p-meta">
			{t().share.bib} #{me.bib}{#if me.category} · {me.category}{/if}
			{#if me.country}· {me.country}{/if}
			{#if me.team}· {me.team}{/if}
		</div>

		<div class="p-time mono">{fmtTime(me.t)}</div>

		<div class="p-grid">
			<div class="p-stat">
				<div class="p-num mono">
					{fmtThousands(me.pos)}<span class="p-sub">/ {fmtThousands(total)}</span>
				</div>
				<div class="p-lbl">{t().share.rankGeneral}</div>
			</div>
			{#if me.catRank != null && catStats}
				<div class="p-stat">
					<div class="p-num mono">
						{fmtThousands(me.catRank)}<span class="p-sub">/ {fmtThousands(catStats.n)}</span>
					</div>
					<div class="p-lbl">{me.category}</div>
				</div>
			{/if}
			{#if showGender && gRank}
				<div class="p-stat">
					<div class="p-num mono">
						{fmtThousands(gRank.rank)}<span class="p-sub">/ {fmtThousands(gRank.size)}</span>
					</div>
					<div class="p-lbl">{genderNoun}</div>
				</div>
			{/if}
			<div class="p-stat">
				<div class="p-num mono">
					{fmtPace(myPace)}<span class="p-sub">/km</span>
				</div>
				<div class="p-lbl">{t().share.paceAvg}</div>
			</div>
		</div>

		<div class="p-actions">
			<p class="share-cta">{t().share.shareCta}</p>
			<ShareRow
				{shareTitle}
			/>
			<button type="button" class="restart" onclick={onRestart}>
				{t().share.restart}
			</button>
		</div>

		<p class="data-note">
			{t().share.noteBefore}<a
				class="note-link"
				href="https://www.acn-timing.com/?lng=EN#/events/2159385002573923/ctx/20260531_20km/generic/199034_1/home/LIVE1"
				target="_blank"
				rel="noopener noreferrer"
			>{t().share.noteSource}</a>{t().share.noteAfter}
		</p>
	</section>
</SlideShell>

<style>
	.personal {
		display: flex;
		flex-direction: column;
		gap: clamp(8px, 1.6dvh, 16px);
		padding: clamp(18px, 2.6vw, 32px);
		background: linear-gradient(160deg, var(--bg-2) 0%, var(--bg) 100%);
		border: 1px solid var(--hot);
		border-radius: 18px;
		box-shadow: 0 24px 60px -30px rgba(var(--hot-rgb), 0.5);
		width: 100%;
		max-width: 720px;
		margin: 0 auto;
	}
	.p-label {
		font-family: var(--font-ui);
		font-size: 10px;
		font-weight: 700;
		letter-spacing: 0.18em;
		text-transform: uppercase;
		color: var(--hot);
	}
	.p-name {
		margin: 0;
		font-family: var(--font-display);
		font-weight: 800;
		font-size: clamp(24px, 4.4vw, 40px);
		line-height: 1.02;
		letter-spacing: -0.025em;
		color: var(--ink);
		text-wrap: balance;
	}
	.p-meta {
		font-family: var(--font-ui);
		font-size: 12px;
		color: var(--ink-3);
		letter-spacing: 0.04em;
	}

	.p-time {
		font-family: var(--font-mono);
		font-feature-settings: 'tnum' 1;
		font-size: clamp(40px, 7.5vw, 72px);
		font-weight: 800;
		line-height: 1;
		letter-spacing: -0.03em;
		color: var(--ink);
		margin-top: clamp(2px, 0.8dvh, 8px);
	}

	.p-grid {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 8px;
	}
	@media (min-width: 640px) {
		.p-grid {
			grid-template-columns: repeat(4, 1fr);
		}
	}
	.p-stat {
		display: flex;
		flex-direction: column;
		gap: 2px;
		padding: 10px 12px;
		background: var(--bg);
		border: 1px solid var(--line);
		border-radius: 8px;
	}
	.p-num {
		font-family: var(--font-mono);
		font-feature-settings: 'tnum' 1;
		font-size: clamp(16px, 2.2vw, 22px);
		font-weight: 700;
		color: var(--ink);
		line-height: 1.05;
		letter-spacing: -0.01em;
	}
	.p-sub {
		font-size: 0.55em;
		font-weight: 500;
		color: var(--ink-3);
		margin-left: 4px;
	}
	.p-lbl {
		font-family: var(--font-ui);
		font-size: 9px;
		font-weight: 700;
		letter-spacing: 0.12em;
		text-transform: uppercase;
		color: var(--ink-3);
	}

	.p-actions {
		display: flex;
		flex-direction: column;
		gap: 10px;
		margin-top: clamp(4px, 1dvh, 10px);
	}
	.share-cta {
		margin: 0;
		font-family: var(--font-ui);
		font-size: 10px;
		font-weight: 700;
		letter-spacing: 0.18em;
		text-transform: uppercase;
		color: var(--ink-3);
	}
	.data-note {
		margin: clamp(10px, 1.6dvh, 16px) 0 0;
		padding-top: clamp(10px, 1.6dvh, 16px);
		border-top: 1px solid var(--line);
		font-family: var(--font-ui);
		font-size: 11px;
		line-height: 1.5;
		color: var(--ink-4);
		letter-spacing: 0.01em;
	}
	.note-link {
		color: var(--ink-3);
		text-decoration: underline;
		text-underline-offset: 2px;
		transition: color 120ms ease;
	}
	.note-link:hover {
		color: var(--hot);
	}
	.restart {
		align-self: flex-start;
		font-family: var(--font-ui);
		font-size: 12px;
		font-weight: 700;
		letter-spacing: 0.1em;
		text-transform: uppercase;
		color: var(--ink-2);
		background: var(--bg-3);
		border: 1px solid var(--line);
		border-radius: 999px;
		padding: 10px 18px;
		cursor: pointer;
		transition:
			background-color 120ms ease,
			border-color 120ms ease,
			color 120ms ease,
			transform 120ms ease;
	}
	.restart:hover {
		color: var(--ink);
		border-color: var(--hot);
		background: rgba(var(--hot-rgb), 0.1);
	}
	.restart:active {
		transform: scale(0.97);
	}
	.restart:focus-visible {
		outline: 2px solid var(--hot);
		outline-offset: 2px;
	}

	.mono {
		font-family: var(--font-mono);
		font-feature-settings: 'tnum' 1;
	}
</style>
