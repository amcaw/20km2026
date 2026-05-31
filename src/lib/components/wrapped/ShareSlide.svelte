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
		paceFor
	} from '$lib/data/wrapped';

	type Props = {
		me: Finisher;
		genderCurve: RankCurve;
		total: number;
		catStats: CategoryStats;
		onRestart: () => void;
	};
	let { me, genderCurve, total, catStats, onRestart }: Props = $props();

	const pct = $derived(fasterThanPct(me, total));
	const myPace = $derived(paceFor(me.t, 20));

	const gRank = $derived(genderRank(genderCurve, me));

	const genderNoun = $derived(
		me.gender === 'F' ? 'Femmes' : me.gender === 'M' ? 'Hommes' : 'Catégorie X'
	);

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
		<div class="p-label">C'est votre course. Partagez-la fièrement.</div>
		<h1 class="p-name">{displayName}</h1>
		<div class="p-meta">
			Dossard #{me.bib} · {me.category}
			{#if me.country}· {me.country}{/if}
			{#if me.team}· {me.team}{/if}
		</div>

		<div class="p-time mono">{fmtTime(me.t)}</div>

		<div class="p-grid">
			<div class="p-stat">
				<div class="p-num mono">
					{fmtThousands(me.pos)}<span class="p-sub">/ {fmtThousands(total)}</span>
				</div>
				<div class="p-lbl">Classement général</div>
			</div>
			{#if me.catRank != null}
				<div class="p-stat">
					<div class="p-num mono">
						{fmtThousands(me.catRank)}<span class="p-sub">/ {fmtThousands(catStats.n)}</span>
					</div>
					<div class="p-lbl">{me.category}</div>
				</div>
			{/if}
			<div class="p-stat">
				<div class="p-num mono">
					{fmtThousands(gRank.rank)}<span class="p-sub">/ {fmtThousands(gRank.size)}</span>
				</div>
				<div class="p-lbl">{genderNoun}</div>
			</div>
			<div class="p-stat">
				<div class="p-num mono">
					{fmtPace(myPace)}<span class="p-sub">/km</span>
				</div>
				<div class="p-lbl">Allure moyenne</div>
			</div>
		</div>

		<div class="p-actions">
			<ShareRow
				shareTitle={`J'ai couru les 20 km de Bruxelles en ${fmtTime(me.t)}, top ${100 - pct}% sur ${fmtThousands(total)} finishers.`}
			/>
			<button type="button" class="restart" onclick={onRestart}>
				Chercher un autre coureur
			</button>
		</div>
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
	.restart {
		font-family: var(--font-ui);
		font-size: 11px;
		font-weight: 700;
		letter-spacing: 0.14em;
		text-transform: uppercase;
		color: var(--ink-3);
		background: transparent;
		border: 0;
		padding: 0;
		cursor: pointer;
		text-align: left;
		transition: color 120ms ease;
	}
	.restart:hover {
		color: var(--ink);
	}

	.mono {
		font-family: var(--font-mono);
		font-feature-settings: 'tnum' 1;
	}
</style>
