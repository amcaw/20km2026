<script lang="ts">
	import SlideShell from './SlideShell.svelte';
	import type { Finisher, WrappedStats } from '$lib/data/wrapped';
	import { fmtThousands } from '$lib/data/wrapped';
	import { reveal, Counter } from './useReveal.svelte';

	type Props = { me: Finisher; stats: WrappedStats };
	let { me, stats }: Props = $props();
	const counter = new Counter();

	const COUNTRY: Record<string, { flag: string; fr: string; demo: string }> = {
		AFG: { flag: '🇦🇫', fr: 'Afghanistan', demo: 'Afghans' },
		AGO: { flag: '🇦🇴', fr: 'Angola', demo: 'Angolais' },
		ALB: { flag: '🇦🇱', fr: 'Albanie', demo: 'Albanais' },
		ARG: { flag: '🇦🇷', fr: 'Argentine', demo: 'Argentins' },
		ARM: { flag: '🇦🇲', fr: 'Arménie', demo: 'Arméniens' },
		AUS: { flag: '🇦🇺', fr: 'Australie', demo: 'Australiens' },
		AUT: { flag: '🇦🇹', fr: 'Autriche', demo: 'Autrichiens' },
		AZE: { flag: '🇦🇿', fr: 'Azerbaïdjan', demo: 'Azerbaïdjanais' },
		BDI: { flag: '🇧🇮', fr: 'Burundi', demo: 'Burundais' },
		BEL: { flag: '🇧🇪', fr: 'Belgique', demo: 'Belges' },
		BEN: { flag: '🇧🇯', fr: 'Bénin', demo: 'Béninois' },
		BFA: { flag: '🇧🇫', fr: 'Burkina Faso', demo: 'Burkinabés' },
		BGD: { flag: '🇧🇩', fr: 'Bangladesh', demo: 'Bangladais' },
		BGR: { flag: '🇧🇬', fr: 'Bulgarie', demo: 'Bulgares' },
		BIH: { flag: '🇧🇦', fr: 'Bosnie-Herzégovine', demo: 'Bosniens' },
		BLR: { flag: '🇧🇾', fr: 'Biélorussie', demo: 'Biélorusses' },
		BOL: { flag: '🇧🇴', fr: 'Bolivie', demo: 'Boliviens' },
		BRA: { flag: '🇧🇷', fr: 'Brésil', demo: 'Brésiliens' },
		BTN: { flag: '🇧🇹', fr: 'Bhoutan', demo: 'Bhoutanais' },
		CAN: { flag: '🇨🇦', fr: 'Canada', demo: 'Canadiens' },
		CHE: { flag: '🇨🇭', fr: 'Suisse', demo: 'Suisses' },
		CHL: { flag: '🇨🇱', fr: 'Chili', demo: 'Chiliens' },
		CHN: { flag: '🇨🇳', fr: 'Chine', demo: 'Chinois' },
		CIV: { flag: '🇨🇮', fr: "Côte d'Ivoire", demo: 'Ivoiriens' },
		CMR: { flag: '🇨🇲', fr: 'Cameroun', demo: 'Camerounais' },
		COG: { flag: '🇨🇬', fr: 'Congo', demo: 'Congolais' },
		COL: { flag: '🇨🇴', fr: 'Colombie', demo: 'Colombiens' },
		CRI: { flag: '🇨🇷', fr: 'Costa Rica', demo: 'Costaricains' },
		CUB: { flag: '🇨🇺', fr: 'Cuba', demo: 'Cubains' },
		CYP: { flag: '🇨🇾', fr: 'Chypre', demo: 'Chypriotes' },
		CZE: { flag: '🇨🇿', fr: 'Tchéquie', demo: 'Tchèques' },
		DEU: { flag: '🇩🇪', fr: 'Allemagne', demo: 'Allemands' },
		DJI: { flag: '🇩🇯', fr: 'Djibouti', demo: 'Djiboutiens' },
		DNK: { flag: '🇩🇰', fr: 'Danemark', demo: 'Danois' },
		DOM: { flag: '🇩🇴', fr: 'Rép. dominicaine', demo: 'Dominicains' },
		DZA: { flag: '🇩🇿', fr: 'Algérie', demo: 'Algériens' },
		ECU: { flag: '🇪🇨', fr: 'Équateur', demo: 'Équatoriens' },
		EGY: { flag: '🇪🇬', fr: 'Égypte', demo: 'Égyptiens' },
		ERI: { flag: '🇪🇷', fr: 'Érythrée', demo: 'Érythréens' },
		ESP: { flag: '🇪🇸', fr: 'Espagne', demo: 'Espagnols' },
		EST: { flag: '🇪🇪', fr: 'Estonie', demo: 'Estoniens' },
		ETH: { flag: '🇪🇹', fr: 'Éthiopie', demo: 'Éthiopiens' },
		FIN: { flag: '🇫🇮', fr: 'Finlande', demo: 'Finlandais' },
		FRA: { flag: '🇫🇷', fr: 'France', demo: 'Français' },
		GBR: { flag: '🇬🇧', fr: 'Royaume-Uni', demo: 'Britanniques' },
		GEO: { flag: '🇬🇪', fr: 'Géorgie', demo: 'Géorgiens' },
		GHA: { flag: '🇬🇭', fr: 'Ghana', demo: 'Ghanéens' },
		GIN: { flag: '🇬🇳', fr: 'Guinée', demo: 'Guinéens' },
		GMB: { flag: '🇬🇲', fr: 'Gambie', demo: 'Gambiens' },
		GNB: { flag: '🇬🇼', fr: 'Guinée-Bissau', demo: 'Bissaoguinéens' },
		GRC: { flag: '🇬🇷', fr: 'Grèce', demo: 'Grecs' },
		GTM: { flag: '🇬🇹', fr: 'Guatemala', demo: 'Guatémaltèques' },
		HND: { flag: '🇭🇳', fr: 'Honduras', demo: 'Honduriens' },
		HRV: { flag: '🇭🇷', fr: 'Croatie', demo: 'Croates' },
		HUN: { flag: '🇭🇺', fr: 'Hongrie', demo: 'Hongrois' },
		IDN: { flag: '🇮🇩', fr: 'Indonésie', demo: 'Indonésiens' },
		IND: { flag: '🇮🇳', fr: 'Inde', demo: 'Indiens' },
		IRL: { flag: '🇮🇪', fr: 'Irlande', demo: 'Irlandais' },
		IRN: { flag: '🇮🇷', fr: 'Iran', demo: 'Iraniens' },
		IRQ: { flag: '🇮🇶', fr: 'Irak', demo: 'Irakiens' },
		ISL: { flag: '🇮🇸', fr: 'Islande', demo: 'Islandais' },
		ISR: { flag: '🇮🇱', fr: 'Israël', demo: 'Israéliens' },
		ITA: { flag: '🇮🇹', fr: 'Italie', demo: 'Italiens' },
		JAM: { flag: '🇯🇲', fr: 'Jamaïque', demo: 'Jamaïcains' },
		JOR: { flag: '🇯🇴', fr: 'Jordanie', demo: 'Jordaniens' },
		JPN: { flag: '🇯🇵', fr: 'Japon', demo: 'Japonais' },
		KAZ: { flag: '🇰🇿', fr: 'Kazakhstan', demo: 'Kazakhs' },
		KOR: { flag: '🇰🇷', fr: 'Corée du Sud', demo: 'Coréens' },
		LAO: { flag: '🇱🇦', fr: 'Laos', demo: 'Laotiens' },
		LBN: { flag: '🇱🇧', fr: 'Liban', demo: 'Libanais' },
		LBY: { flag: '🇱🇾', fr: 'Libye', demo: 'Libyens' },
		LTU: { flag: '🇱🇹', fr: 'Lituanie', demo: 'Lituaniens' },
		LUX: { flag: '🇱🇺', fr: 'Luxembourg', demo: 'Luxembourgeois' },
		LVA: { flag: '🇱🇻', fr: 'Lettonie', demo: 'Lettons' },
		MAR: { flag: '🇲🇦', fr: 'Maroc', demo: 'Marocains' },
		MCO: { flag: '🇲🇨', fr: 'Monaco', demo: 'Monégasques' },
		MDA: { flag: '🇲🇩', fr: 'Moldavie', demo: 'Moldaves' },
		MDG: { flag: '🇲🇬', fr: 'Madagascar', demo: 'Malgaches' },
		MEX: { flag: '🇲🇽', fr: 'Mexique', demo: 'Mexicains' },
		MKD: { flag: '🇲🇰', fr: 'Macédoine du Nord', demo: 'Macédoniens' },
		MLI: { flag: '🇲🇱', fr: 'Mali', demo: 'Maliens' },
		MLT: { flag: '🇲🇹', fr: 'Malte', demo: 'Maltais' },
		MMR: { flag: '🇲🇲', fr: 'Birmanie', demo: 'Birmans' },
		MNE: { flag: '🇲🇪', fr: 'Monténégro', demo: 'Monténégrins' },
		MNG: { flag: '🇲🇳', fr: 'Mongolie', demo: 'Mongols' },
		MOZ: { flag: '🇲🇿', fr: 'Mozambique', demo: 'Mozambicains' },
		MRT: { flag: '🇲🇷', fr: 'Mauritanie', demo: 'Mauritaniens' },
		MUS: { flag: '🇲🇺', fr: 'Maurice', demo: 'Mauriciens' },
		MWI: { flag: '🇲🇼', fr: 'Malawi', demo: 'Malawites' },
		MYS: { flag: '🇲🇾', fr: 'Malaisie', demo: 'Malaisiens' },
		NAM: { flag: '🇳🇦', fr: 'Namibie', demo: 'Namibiens' },
		NER: { flag: '🇳🇪', fr: 'Niger', demo: 'Nigériens' },
		NGA: { flag: '🇳🇬', fr: 'Nigeria', demo: 'Nigérians' },
		NLD: { flag: '🇳🇱', fr: 'Pays-Bas', demo: 'Néerlandais' },
		NOR: { flag: '🇳🇴', fr: 'Norvège', demo: 'Norvégiens' },
		NPL: { flag: '🇳🇵', fr: 'Népal', demo: 'Népalais' },
		NZL: { flag: '🇳🇿', fr: 'Nouvelle-Zélande', demo: 'Néo-Zélandais' },
		PAK: { flag: '🇵🇰', fr: 'Pakistan', demo: 'Pakistanais' },
		PAN: { flag: '🇵🇦', fr: 'Panama', demo: 'Panaméens' },
		PER: { flag: '🇵🇪', fr: 'Pérou', demo: 'Péruviens' },
		PHL: { flag: '🇵🇭', fr: 'Philippines', demo: 'Philippins' },
		POL: { flag: '🇵🇱', fr: 'Pologne', demo: 'Polonais' },
		PRT: { flag: '🇵🇹', fr: 'Portugal', demo: 'Portugais' },
		PRY: { flag: '🇵🇾', fr: 'Paraguay', demo: 'Paraguayens' },
		PSE: { flag: '🇵🇸', fr: 'Palestine', demo: 'Palestiniens' },
		ROU: { flag: '🇷🇴', fr: 'Roumanie', demo: 'Roumains' },
		RUS: { flag: '🇷🇺', fr: 'Russie', demo: 'Russes' },
		RWA: { flag: '🇷🇼', fr: 'Rwanda', demo: 'Rwandais' },
		SCG: { flag: '🇷🇸', fr: 'Serbie-Monténégro', demo: 'Serbo-Monténégrins' },
		SDN: { flag: '🇸🇩', fr: 'Soudan', demo: 'Soudanais' },
		SEN: { flag: '🇸🇳', fr: 'Sénégal', demo: 'Sénégalais' },
		SGP: { flag: '🇸🇬', fr: 'Singapour', demo: 'Singapouriens' },
		SLE: { flag: '🇸🇱', fr: 'Sierra Leone', demo: 'Sierra-Léonais' },
		SLV: { flag: '🇸🇻', fr: 'Salvador', demo: 'Salvadoriens' },
		SOM: { flag: '🇸🇴', fr: 'Somalie', demo: 'Somaliens' },
		SVK: { flag: '🇸🇰', fr: 'Slovaquie', demo: 'Slovaques' },
		SVN: { flag: '🇸🇮', fr: 'Slovénie', demo: 'Slovènes' },
		SWE: { flag: '🇸🇪', fr: 'Suède', demo: 'Suédois' },
		SYR: { flag: '🇸🇾', fr: 'Syrie', demo: 'Syriens' },
		TGO: { flag: '🇹🇬', fr: 'Togo', demo: 'Togolais' },
		THA: { flag: '🇹🇭', fr: 'Thaïlande', demo: 'Thaïlandais' },
		TUN: { flag: '🇹🇳', fr: 'Tunisie', demo: 'Tunisiens' },
		TUR: { flag: '🇹🇷', fr: 'Turquie', demo: 'Turcs' },
		TWN: { flag: '🇹🇼', fr: 'Taïwan', demo: 'Taïwanais' },
		UGA: { flag: '🇺🇬', fr: 'Ouganda', demo: 'Ougandais' },
		UKR: { flag: '🇺🇦', fr: 'Ukraine', demo: 'Ukrainiens' },
		URY: { flag: '🇺🇾', fr: 'Uruguay', demo: 'Uruguayens' },
		USA: { flag: '🇺🇸', fr: 'États-Unis', demo: 'Américains' },
		UZB: { flag: '🇺🇿', fr: 'Ouzbékistan', demo: 'Ouzbeks' },
		VEN: { flag: '🇻🇪', fr: 'Venezuela', demo: 'Vénézuéliens' },
		VNM: { flag: '🇻🇳', fr: 'Vietnam', demo: 'Vietnamiens' },
		VUT: { flag: '🇻🇺', fr: 'Vanuatu', demo: 'Vanuatuans' },
		XKX: { flag: '🇽🇰', fr: 'Kosovo', demo: 'Kosovars' },
		YEM: { flag: '🇾🇪', fr: 'Yémen', demo: 'Yéménites' },
		ZAF: { flag: '🇿🇦', fr: 'Afrique du Sud', demo: 'Sud-Africains' },
		ZWE: { flag: '🇿🇼', fr: 'Zimbabwe', demo: 'Zimbabwéens' },
	};

	function info(code: string | null) {
		if (!code) return null;
		return COUNTRY[code] ?? { flag: '🏳️', fr: code, demo: `coureurs (${code})` };
	}

	const mine = $derived(info(me.country));
	const myCount = $derived(me.country ? stats.byCountry[me.country] ?? 0 : 0);
	const isBel = $derived(me.country === 'BEL');

	const topCountries = $derived(
		Object.entries(stats.byCountry)
			.sort((a, b) => b[1] - a[1])
			.slice(0, 6)
			.map(([code, n]) => ({ code, n, ...info(code)! }))
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
		<p class="eyebrow">Au départ de Bruxelles</p>
		{#if mine && myCount > 0}
			<h2 class="lede">
				Vous étiez <strong class="mono">1</strong> des
				<strong class="mono">{fmtThousands(Math.round(counter.value))}</strong>
				<span class="flag">{mine.flag}</span> {mine.demo}.
				{#if isBel}
					<em>Bruxelles jouait à domicile.</em>
				{:else}
					<em>Vous avez fait le déplacement. Respect.</em>
				{/if}
			</h2>
		{:else}
			<h2 class="lede">
				<strong class="mono">{fmtThousands(stats.countriesCount)}</strong>
				nationalités étaient au départ.
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
					<span class="flag-name">{c.fr}</span>
					<span class="flag-n mono">{fmtThousands(c.n)}</span>
				</div>
			{/each}
		</div>

		<p class="sub">
			<strong class="mono">{fmtThousands(stats.countriesCount)}</strong>
			nationalités au total sur la ligne de départ.
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
	.lede .mono {
		font-family: var(--font-mono);
		font-feature-settings: 'tnum' 1;
		color: var(--hot);
	}
	.lede em {
		font-style: italic;
		color: var(--ink-2);
		font-weight: 500;
		font-size: 0.62em;
		display: block;
		margin-top: 8px;
	}
	.flag {
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
	.sub strong {
		color: var(--ink-2);
		font-weight: 700;
	}
	.mono {
		font-family: var(--font-mono);
		font-feature-settings: 'tnum' 1;
	}
</style>
