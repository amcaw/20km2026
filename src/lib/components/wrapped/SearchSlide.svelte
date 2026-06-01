<script lang="ts">
	import SlideShell from './SlideShell.svelte';
	import type { Finisher } from '$lib/data/wrapped';
	import { search, fmtTime } from '$lib/data/wrapped';

	type Props = {
		loading: boolean;
		onSelect: (f: Finisher) => void;
	};
	let { loading, onSelect }: Props = $props();

	let query = $state('');
	let inputEl = $state<HTMLInputElement | null>(null);
	let attempted = $state(false);
	let searching = $state(false);
	let netError = $state(false);
	let matches = $state<Finisher[]>([]);
	let disambiguating = $state(false);

	const isBib = $derived(/^\d+$/.test(query.trim()));
	const canSubmit = $derived(isBib ? query.trim().length >= 1 : query.trim().length >= 3);

	async function submit(e?: SubmitEvent) {
		e?.preventDefault();
		if (searching) return;
		attempted = true;
		disambiguating = false;
		netError = false;
		searching = true;
		try {
			const found = await search(query);
			matches = found;
			if (found.length === 1) onSelect(found[0]);
			else if (found.length > 1) disambiguating = true;
		} catch {
			matches = [];
			netError = true;
		} finally {
			searching = false;
		}
	}

	function pick(f: Finisher) {
		onSelect(f);
	}

	function clear() {
		query = '';
		attempted = false;
		netError = false;
		disambiguating = false;
		matches = [];
		inputEl?.focus();
	}
</script>

<SlideShell tone="hot">
	<div class="head">
		<span class="eyebrow">20 km de Bruxelles · récap personnel</span>
		<h1 class="lede">
			Tapez <em>votre nom</em> ou votre <em>numéro de dossard</em>.
		</h1>
	</div>

	<form class="form" onsubmit={submit}>
		<label class="field">
			<span class="field-label">Nom du coureur ou numéro de dossard</span>
			<div class="field-wrap">
				<input
					bind:this={inputEl}
					class="field-input"
					type="text"
					inputmode="text"
					bind:value={query}
					placeholder="Prénom NOM ou dossard"
					autocomplete="off"
					autocapitalize="words"
					spellcheck="false"
					disabled={loading || searching}
				/>
				{#if query.length > 0}
					<button
						type="button"
						class="clear-btn"
						aria-label="Effacer la recherche"
						onclick={clear}
					>
						<svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
							<path
								d="M6 6l12 12M18 6L6 18"
								fill="none"
								stroke="currentColor"
								stroke-width="2.2"
								stroke-linecap="round"
							/>
						</svg>
					</button>
				{/if}
			</div>
		</label>
		<button type="submit" class="cta" disabled={loading || searching || !canSubmit}>
			{loading ? 'Chargement…' : searching ? 'Recherche…' : 'Voir mon récap'}
		</button>
	</form>

	{#if netError}
		<p class="msg err">
			Impossible de joindre le service de résultats pour l'instant.
			Réessayez dans un moment.
		</p>
	{:else if attempted && !searching && matches.length === 0}
		<p class="msg err">
			Aucun résultat exact pour
			<span class="quote">«&nbsp;{query.trim()}&nbsp;»</span>.
			{#if isBib}
				Vérifiez votre numéro de dossard.
			{:else}
				Vérifiez l'orthographe (prénom puis NOM, comme sur le dossard),
				ou essayez votre numéro de dossard.
			{/if}
		</p>
	{/if}

	{#if disambiguating}
		<div class="disambig">
			<p class="msg">
				Plusieurs coureurs portent ce nom. Choisissez le vôtre :
			</p>
			<ul class="picker">
				{#each matches as f (f.bib)}
					<button type="button" class="picker-btn" onclick={() => pick(f)}>
						<span class="picker-bib mono">#{f.bib}</span>
						<span class="picker-cat">{f.category}</span>
						<span class="picker-time mono">{fmtTime(f.t)}</span>
					</button>
				{/each}
			</ul>
		</div>
	{/if}

	<p class="legal">
		Aucune donnée n'est conservée. La saisie reste dans votre navigateur.
		Résultats officiels&nbsp;:
		<a
			class="source-link"
			href="https://www.acn-timing.com/?lng=EN#/events/2159385002573923/ctx/20260531_20km/generic/199034_1/home/LIVE1"
			target="_blank"
			rel="noopener noreferrer"
		>ACN&nbsp;Timing</a>.
	</p>
</SlideShell>

<style>
	.head {
		display: flex;
		flex-direction: column;
		gap: 12px;
	}
	.eyebrow {
		font-family: var(--font-ui);
		font-size: 10px;
		font-weight: 700;
		letter-spacing: 0.18em;
		text-transform: uppercase;
		color: var(--ink-3);
	}
	.lede {
		margin: 0;
		font-family: var(--font-display);
		font-weight: 700;
		font-size: clamp(32px, 6vw, 56px);
		line-height: 1.05;
		letter-spacing: -0.025em;
		color: var(--ink);
		text-wrap: balance;
		max-width: 18ch;
	}
	.lede em {
		font-style: italic;
		color: var(--hot);
	}

	.form {
		display: flex;
		flex-direction: column;
		gap: 12px;
		max-width: 520px;
	}
	.field {
		display: flex;
		flex-direction: column;
		gap: 6px;
	}
	.field-label {
		font-family: var(--font-ui);
		font-size: 10px;
		font-weight: 700;
		letter-spacing: 0.12em;
		text-transform: uppercase;
		color: var(--ink-3);
	}
	.field-wrap {
		position: relative;
		display: flex;
	}
	.field-input {
		flex: 1;
		width: 100%;
		min-width: 0;
		box-sizing: border-box;
		padding: 14px 48px 14px 16px;
		font-family: var(--font-display);
		font-weight: 600;
		font-size: clamp(15px, 4.2vw, 22px);
		letter-spacing: -0.01em;
		text-overflow: ellipsis;
		color: var(--ink);
		background: var(--bg-2);
		border: 1px solid var(--line);
		border-radius: 10px;
		outline: none;
		transition: border-color 120ms ease;
	}
	.field-input:focus {
		border-color: var(--hot);
	}
	.field-input::placeholder {
		color: var(--ink-4);
	}
	.clear-btn {
		position: absolute;
		top: 50%;
		right: 10px;
		transform: translateY(-50%);
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 28px;
		height: 28px;
		padding: 0;
		border: 0;
		border-radius: 50%;
		background: var(--bg-3);
		color: var(--ink-3);
		cursor: pointer;
		transition:
			background-color 120ms ease,
			color 120ms ease;
	}
	.clear-btn:hover {
		background: var(--line-2);
		color: var(--ink);
	}
	.clear-btn:focus-visible {
		outline: 2px solid var(--hot);
		outline-offset: 2px;
	}
	.cta {
		padding: 14px 20px;
		font-family: var(--font-ui);
		font-weight: 700;
		font-size: 14px;
		letter-spacing: 0.04em;
		text-transform: uppercase;
		color: #0b0d0e;
		background: var(--hot);
		border: 0;
		border-radius: 999px;
		cursor: pointer;
		align-self: flex-start;
		transition: opacity 120ms ease, transform 120ms ease;
	}
	.cta:hover:not(:disabled) {
		transform: translateY(-1px);
	}
	.cta:disabled {
		opacity: 0.4;
		cursor: not-allowed;
	}

	.msg {
		margin: 0;
		font-family: var(--font-ui);
		font-size: 14px;
		line-height: 1.55;
		color: var(--ink-2);
	}
	.msg.err {
		color: var(--ink);
	}
	.quote {
		color: var(--hot);
		font-weight: 700;
	}

	.disambig {
		display: flex;
		flex-direction: column;
		gap: 10px;
	}
	.picker {
		list-style: none;
		margin: 0;
		padding: 0;
		display: flex;
		flex-direction: column;
		gap: 6px;
	}
	.picker-btn {
		display: grid;
		grid-template-columns: auto 1fr auto;
		align-items: baseline;
		gap: 14px;
		padding: 12px 16px;
		background: var(--bg-2);
		border: 1px solid var(--line);
		border-radius: 10px;
		color: var(--ink);
		cursor: pointer;
		font-family: var(--font-ui);
		font-size: 14px;
		text-align: left;
		transition: border-color 120ms ease;
	}
	.picker-btn:hover {
		border-color: var(--hot);
	}
	.picker-bib {
		font-weight: 700;
		color: var(--hot);
	}
	.picker-time {
		font-weight: 600;
		font-size: 16px;
	}
	.mono {
		font-family: var(--font-mono);
		font-feature-settings: 'tnum' 1;
	}

	.legal {
		margin: 0;
		font-family: var(--font-ui);
		font-size: 11px;
		color: var(--ink-4);
		letter-spacing: 0.02em;
	}
	.source-link {
		color: var(--ink-3);
		text-decoration: underline;
		text-underline-offset: 2px;
		transition: color 120ms ease;
	}
	.source-link:hover {
		color: var(--hot);
	}
</style>
