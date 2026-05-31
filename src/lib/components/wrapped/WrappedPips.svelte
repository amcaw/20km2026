<script lang="ts">
	type Props = {
		current: number;
		total: number;
	};
	let { current, total }: Props = $props();
</script>

<div
	class="pips"
	role="progressbar"
	aria-valuemin={1}
	aria-valuemax={total}
	aria-valuenow={current}
>
	{#each Array.from({ length: total }, (_, i) => i + 1) as step (step)}
		{@const state = step < current ? 'done' : step === current ? 'now' : 'idle'}
		<span class="pip {state}" aria-hidden="true"></span>
	{/each}
</div>

<style>
	.pips {
		display: flex;
		align-items: center;
		gap: 6px;
		width: 100%;
	}
	.pip {
		flex: 1 1 0;
		min-width: 0;
		height: 3px;
		border-radius: 2px;
		background: var(--line);
		transition:
			background-color 320ms ease,
			box-shadow 320ms ease,
			opacity 320ms ease;
	}
	.pip.idle {
		background: var(--line);
		opacity: 0.55;
	}
	.pip.done {
		background: var(--hot);
		opacity: 0.6;
	}
	.pip.now {
		background: var(--hot);
		box-shadow: 0 0 12px -2px rgba(var(--hot-rgb), 0.55);
	}
</style>
