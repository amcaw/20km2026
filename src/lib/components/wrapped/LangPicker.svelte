<script lang="ts">
	import { lang, LANGS, LANG_LABEL } from '$lib/i18n/lang.svelte';
</script>

<div class="lang-picker" role="group" aria-label="Language">
	{#each LANGS as l (l)}
		<button
			type="button"
			class="lang-btn"
			class:active={lang.value === l}
			aria-pressed={lang.value === l}
			onclick={() => lang.set(l)}
		>
			{LANG_LABEL[l]}
		</button>
	{/each}
</div>

<style>
	.lang-picker {
		display: inline-flex;
		gap: 4px;
		align-self: flex-start;
	}
	.lang-btn {
		font-family: var(--font-ui);
		font-size: 11px;
		font-weight: 700;
		letter-spacing: 0.08em;
		padding: 5px 10px;
		border-radius: 999px;
		border: 1px solid var(--line);
		background: transparent;
		color: var(--ink-3);
		cursor: pointer;
		transition:
			color 120ms ease,
			border-color 120ms ease,
			background-color 120ms ease;
	}
	.lang-btn:hover {
		color: var(--ink);
		border-color: var(--line-2);
	}
	.lang-btn.active {
		color: #0b0d0e;
		background: var(--hot);
		border-color: var(--hot);
	}
	.lang-btn:focus-visible {
		outline: 2px solid var(--hot);
		outline-offset: 2px;
	}
</style>
