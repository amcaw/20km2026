<script lang="ts">
	import Icon from '$lib/components/Icon.svelte';

	const SITE_URL = 'https://amcaw.github.io/20km2026/';

	type Props = {
		shareUrl?: string;
		shareTitle?: string;
	};

	let {
		shareUrl,
		shareTitle = 'Mon récap personnel des 20 km de Bruxelles 2026'
	}: Props = $props();

	function resolvedUrl(): string {
		return shareUrl ?? SITE_URL;
	}

	function open(href: string) {
		window.open(href, '_blank', 'noopener,noreferrer,width=640,height=620');
	}

	let copied = $state(false);
	let copyTimer: ReturnType<typeof setTimeout> | null = null;

	function shareX() {
		const u = encodeURIComponent(resolvedUrl());
		const t = encodeURIComponent(shareTitle);
		open(`https://twitter.com/intent/tweet?url=${u}&text=${t}`);
	}
	function shareFacebook() {
		const u = encodeURIComponent(resolvedUrl());
		open(`https://www.facebook.com/sharer/sharer.php?u=${u}`);
	}
	function shareWhatsApp() {
		const t = encodeURIComponent(`${shareTitle} ${resolvedUrl()}`);
		open(`https://wa.me/?text=${t}`);
	}
	function shareBlueSky() {
		const t = encodeURIComponent(`${shareTitle} ${resolvedUrl()}`);
		open(`https://bsky.app/intent/compose?text=${t}`);
	}
	function shareMail() {
		const subject = encodeURIComponent(shareTitle);
		const body = encodeURIComponent(`${shareTitle}\n\n${resolvedUrl()}`);
		window.location.href = `mailto:?subject=${subject}&body=${body}`;
	}
	async function copyLink() {
		try {
			await navigator.clipboard.writeText(resolvedUrl());
			copied = true;
			if (copyTimer) clearTimeout(copyTimer);
			copyTimer = setTimeout(() => (copied = false), 1800);
		} catch {
			const ta = document.createElement('textarea');
			ta.value = resolvedUrl();
			ta.style.position = 'fixed';
			ta.style.opacity = '0';
			document.body.appendChild(ta);
			ta.select();
			try {
				document.execCommand('copy');
				copied = true;
				if (copyTimer) clearTimeout(copyTimer);
				copyTimer = setTimeout(() => (copied = false), 1800);
			} finally {
				document.body.removeChild(ta);
			}
		}
	}

	type ShareItem = {
		key: 'x' | 'facebook' | 'whatsapp' | 'bsky' | 'mail';
		label: string;
		onclick: () => void | Promise<void>;
	};
	const SHARE_ITEMS: ShareItem[] = [
		{ key: 'x', label: 'X', onclick: shareX },
		{ key: 'facebook', label: 'Facebook', onclick: shareFacebook },
		{ key: 'whatsapp', label: 'WhatsApp', onclick: shareWhatsApp },
		{ key: 'bsky', label: 'Bluesky', onclick: shareBlueSky },
		{ key: 'mail', label: 'E-mail', onclick: shareMail }
	];
</script>

<div class="share-row" role="group" aria-label="Partager">
	{#each SHARE_ITEMS as item (item.key)}
		<button
			type="button"
			class="share-chip"
			onclick={item.onclick}
			aria-label="Partager sur {item.label}"
			title="Partager sur {item.label}"
		>
			{#if item.key === 'x'}
				<svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor" aria-hidden="true">
					<path
						d="M18.244 2H21.5l-7.51 8.58L23 22h-6.84l-5.36-7-6.13 7H1.41l8.04-9.18L1 2h7l4.84 6.4L18.244 2Zm-1.2 18h1.78L7.04 4H5.18l11.864 16Z"
					/>
				</svg>
			{:else if item.key === 'facebook'}
				<svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor" aria-hidden="true">
					<path
						d="M13.5 22v-8.5h2.86l.43-3.32H13.5V8.06c0-.96.27-1.62 1.65-1.62h1.76V3.46c-.31-.04-1.34-.13-2.55-.13-2.52 0-4.25 1.54-4.25 4.37v2.44H7.25v3.32h2.86V22h3.39Z"
					/>
				</svg>
			{:else if item.key === 'whatsapp'}
				<svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor" aria-hidden="true">
					<path
						d="M19.05 4.91A9.83 9.83 0 0 0 12.04 2C6.59 2 2.16 6.43 2.15 11.88c0 1.74.46 3.44 1.32 4.94L2 22l5.32-1.4a9.92 9.92 0 0 0 4.72 1.2h.01c5.46 0 9.89-4.43 9.9-9.88a9.84 9.84 0 0 0-2.9-7Zm-7 15.16h-.01a8.21 8.21 0 0 1-4.18-1.15l-.3-.18-3.16.83.84-3.08-.2-.32a8.18 8.18 0 0 1-1.26-4.36c0-4.54 3.7-8.23 8.24-8.23 2.2 0 4.27.86 5.83 2.42a8.18 8.18 0 0 1 2.41 5.83c0 4.54-3.7 8.24-8.21 8.24Zm4.52-6.16c-.25-.12-1.46-.72-1.69-.81-.23-.08-.39-.12-.55.12-.16.25-.63.81-.78.97-.14.16-.29.18-.54.06-.25-.13-1.05-.39-2-1.23-.74-.66-1.24-1.47-1.39-1.72-.14-.25-.02-.38.11-.5.11-.11.25-.29.37-.43.13-.14.16-.25.25-.41.08-.16.04-.31-.02-.43-.06-.12-.55-1.33-.76-1.83-.2-.48-.4-.41-.55-.42l-.47-.01c-.16 0-.43.06-.65.31-.22.25-.85.83-.85 2.03 0 1.2.87 2.36.99 2.52.13.16 1.71 2.62 4.15 3.67.58.25 1.03.4 1.39.51.58.18 1.11.16 1.53.1.47-.07 1.46-.6 1.66-1.18.21-.58.21-1.07.14-1.18-.06-.11-.22-.16-.47-.29Z"
					/>
				</svg>
			{:else if item.key === 'bsky'}
				<svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor" aria-hidden="true">
					<path
						d="M5.55 4.27c2.74 2.06 5.69 6.23 6.77 8.47 1.08-2.24 4.03-6.41 6.77-8.47 1.98-1.49 5.18-2.64 5.18.99 0 .73-.42 6.1-.66 6.97-.86 3.04-3.97 3.81-6.74 3.34 4.84.82 6.07 3.55 3.41 6.27-5.06 5.17-7.27-1.3-7.84-2.96-.1-.3-.15-.45-.16-.32-.01-.13-.06.01-.16.32-.57 1.66-2.78 8.13-7.84 2.96-2.66-2.72-1.43-5.45 3.41-6.27-2.77.47-5.88-.3-6.74-3.34-.24-.87-.66-6.24-.66-6.97 0-3.63 3.2-2.48 5.18-.99Z"
					/>
				</svg>
			{:else if item.key === 'mail'}
				<Icon name="mail" size={14} strokeWidth={1.8} />
			{/if}
		</button>
	{/each}
	<button
		type="button"
		class="share-chip share-chip-copy"
		onclick={copyLink}
		aria-label={copied ? 'Lien copié' : 'Copier le lien'}
		title={copied ? 'Lien copié' : 'Copier le lien'}
	>
		{#if copied}
			<Icon name="check" size={14} strokeWidth={2} />
		{:else}
			<Icon name="copy" size={14} strokeWidth={1.8} />
		{/if}
	</button>
</div>

<style>
	.share-row {
		display: flex;
		align-items: center;
		gap: 8px;
		flex-wrap: wrap;
	}

	.share-chip {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 32px;
		height: 32px;
		border-radius: 50%;
		background: transparent;
		border: 1px solid var(--line);
		color: var(--hot);
		cursor: pointer;
		transition:
			background-color 150ms ease,
			border-color 150ms ease,
			color 150ms ease,
			transform 120ms ease;
	}
	.share-chip:hover {
		background: rgba(var(--hot-rgb), 0.12);
		border-color: var(--hot);
	}
	.share-chip:active {
		transform: scale(0.94);
	}
	.share-chip:focus-visible {
		outline: 2px solid var(--hot);
		outline-offset: 2px;
	}

	@media (min-width: 768px) {
		.share-chip {
			width: 36px;
			height: 36px;
		}
	}
</style>
