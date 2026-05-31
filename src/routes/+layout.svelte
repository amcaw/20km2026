<script lang="ts">
	import '$lib/tokens.css';

	let { children } = $props();
</script>

<svelte:head>
	<title>Récap personnel · 20 km de Bruxelles 2026</title>
</svelte:head>

{@render children()}
