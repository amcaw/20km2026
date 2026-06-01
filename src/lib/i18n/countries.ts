import type { Lang } from './lang.svelte';

type CountryEntry = {
	flag: string;
	fr: { name: string; demo: string };
	en: { name: string; demo: string };
	nl: { name: string; demo: string };
};

export const COUNTRIES: Record<string, CountryEntry> = {
	AFG: {
		flag: '🇦🇫',
		fr: { name: 'Afghanistan', demo: 'Afghans' },
		en: { name: 'Afghanistan', demo: 'Afghans' },
		nl: { name: 'Afghanistan', demo: 'Afghanen' }
	},
	AGO: {
		flag: '🇦🇴',
		fr: { name: 'Angola', demo: 'Angolais' },
		en: { name: 'Angola', demo: 'Angolans' },
		nl: { name: 'Angola', demo: 'Angolezen' }
	},
	ALB: {
		flag: '🇦🇱',
		fr: { name: 'Albanie', demo: 'Albanais' },
		en: { name: 'Albania', demo: 'Albanians' },
		nl: { name: 'Albanië', demo: 'Albanezen' }
	},
	ARG: {
		flag: '🇦🇷',
		fr: { name: 'Argentine', demo: 'Argentins' },
		en: { name: 'Argentina', demo: 'Argentinians' },
		nl: { name: 'Argentinië', demo: 'Argentijnen' }
	},
	ARM: {
		flag: '🇦🇲',
		fr: { name: 'Arménie', demo: 'Arméniens' },
		en: { name: 'Armenia', demo: 'Armenians' },
		nl: { name: 'Armenië', demo: 'Armeniërs' }
	},
	AUS: {
		flag: '🇦🇺',
		fr: { name: 'Australie', demo: 'Australiens' },
		en: { name: 'Australia', demo: 'Australians' },
		nl: { name: 'Australië', demo: 'Australiërs' }
	},
	AUT: {
		flag: '🇦🇹',
		fr: { name: 'Autriche', demo: 'Autrichiens' },
		en: { name: 'Austria', demo: 'Austrians' },
		nl: { name: 'Oostenrijk', demo: 'Oostenrijkers' }
	},
	AZE: {
		flag: '🇦🇿',
		fr: { name: 'Azerbaïdjan', demo: 'Azerbaïdjanais' },
		en: { name: 'Azerbaijan', demo: 'Azerbaijanis' },
		nl: { name: 'Azerbeidzjan', demo: 'Azerbeidzjanen' }
	},
	BDI: {
		flag: '🇧🇮',
		fr: { name: 'Burundi', demo: 'Burundais' },
		en: { name: 'Burundi', demo: 'Burundians' },
		nl: { name: 'Burundi', demo: 'Burundezen' }
	},
	BEL: {
		flag: '🇧🇪',
		fr: { name: 'Belgique', demo: 'Belges' },
		en: { name: 'Belgium', demo: 'Belgians' },
		nl: { name: 'België', demo: 'Belgen' }
	},
	BEN: {
		flag: '🇧🇯',
		fr: { name: 'Bénin', demo: 'Béninois' },
		en: { name: 'Benin', demo: 'Beninese' },
		nl: { name: 'Benin', demo: 'Beniners' }
	},
	BFA: {
		flag: '🇧🇫',
		fr: { name: 'Burkina Faso', demo: 'Burkinabés' },
		en: { name: 'Burkina Faso', demo: 'Burkinabè' },
		nl: { name: 'Burkina Faso', demo: 'Burkinezen' }
	},
	BGD: {
		flag: '🇧🇩',
		fr: { name: 'Bangladesh', demo: 'Bangladais' },
		en: { name: 'Bangladesh', demo: 'Bangladeshis' },
		nl: { name: 'Bangladesh', demo: 'Bengalezen' }
	},
	BGR: {
		flag: '🇧🇬',
		fr: { name: 'Bulgarie', demo: 'Bulgares' },
		en: { name: 'Bulgaria', demo: 'Bulgarians' },
		nl: { name: 'Bulgarije', demo: 'Bulgaren' }
	},
	BIH: {
		flag: '🇧🇦',
		fr: { name: 'Bosnie-Herzégovine', demo: 'Bosniens' },
		en: { name: 'Bosnia and Herzegovina', demo: 'Bosnians' },
		nl: { name: 'Bosnië en Herzegovina', demo: 'Bosniërs' }
	},
	BLR: {
		flag: '🇧🇾',
		fr: { name: 'Biélorussie', demo: 'Biélorusses' },
		en: { name: 'Belarus', demo: 'Belarusians' },
		nl: { name: 'Wit-Rusland', demo: 'Wit-Russen' }
	},
	BOL: {
		flag: '🇧🇴',
		fr: { name: 'Bolivie', demo: 'Boliviens' },
		en: { name: 'Bolivia', demo: 'Bolivians' },
		nl: { name: 'Bolivia', demo: 'Bolivianen' }
	},
	BRA: {
		flag: '🇧🇷',
		fr: { name: 'Brésil', demo: 'Brésiliens' },
		en: { name: 'Brazil', demo: 'Brazilians' },
		nl: { name: 'Brazilië', demo: 'Brazilianen' }
	},
	BTN: {
		flag: '🇧🇹',
		fr: { name: 'Bhoutan', demo: 'Bhoutanais' },
		en: { name: 'Bhutan', demo: 'Bhutanese' },
		nl: { name: 'Bhutan', demo: 'Bhutanen' }
	},
	CAN: {
		flag: '🇨🇦',
		fr: { name: 'Canada', demo: 'Canadiens' },
		en: { name: 'Canada', demo: 'Canadians' },
		nl: { name: 'Canada', demo: 'Canadezen' }
	},
	CHE: {
		flag: '🇨🇭',
		fr: { name: 'Suisse', demo: 'Suisses' },
		en: { name: 'Switzerland', demo: 'Swiss' },
		nl: { name: 'Zwitserland', demo: 'Zwitsers' }
	},
	CHL: {
		flag: '🇨🇱',
		fr: { name: 'Chili', demo: 'Chiliens' },
		en: { name: 'Chile', demo: 'Chileans' },
		nl: { name: 'Chili', demo: 'Chilenen' }
	},
	CHN: {
		flag: '🇨🇳',
		fr: { name: 'Chine', demo: 'Chinois' },
		en: { name: 'China', demo: 'Chinese' },
		nl: { name: 'China', demo: 'Chinezen' }
	},
	CIV: {
		flag: '🇨🇮',
		fr: { name: "Côte d'Ivoire", demo: 'Ivoiriens' },
		en: { name: "Côte d'Ivoire", demo: 'Ivorians' },
		nl: { name: 'Ivoorkust', demo: 'Ivorianen' }
	},
	CMR: {
		flag: '🇨🇲',
		fr: { name: 'Cameroun', demo: 'Camerounais' },
		en: { name: 'Cameroon', demo: 'Cameroonians' },
		nl: { name: 'Kameroen', demo: 'Kameroezen' }
	},
	COG: {
		flag: '🇨🇬',
		fr: { name: 'Congo', demo: 'Congolais' },
		en: { name: 'Congo', demo: 'Congolese' },
		nl: { name: 'Congo', demo: 'Congolezen' }
	},
	COL: {
		flag: '🇨🇴',
		fr: { name: 'Colombie', demo: 'Colombiens' },
		en: { name: 'Colombia', demo: 'Colombians' },
		nl: { name: 'Colombia', demo: 'Colombianen' }
	},
	CRI: {
		flag: '🇨🇷',
		fr: { name: 'Costa Rica', demo: 'Costaricains' },
		en: { name: 'Costa Rica', demo: 'Costa Ricans' },
		nl: { name: 'Costa Rica', demo: 'Costa Ricanen' }
	},
	CUB: {
		flag: '🇨🇺',
		fr: { name: 'Cuba', demo: 'Cubains' },
		en: { name: 'Cuba', demo: 'Cubans' },
		nl: { name: 'Cuba', demo: 'Cubanen' }
	},
	CYP: {
		flag: '🇨🇾',
		fr: { name: 'Chypre', demo: 'Chypriotes' },
		en: { name: 'Cyprus', demo: 'Cypriots' },
		nl: { name: 'Cyprus', demo: 'Cyprioten' }
	},
	CZE: {
		flag: '🇨🇿',
		fr: { name: 'Tchéquie', demo: 'Tchèques' },
		en: { name: 'Czechia', demo: 'Czechs' },
		nl: { name: 'Tsjechië', demo: 'Tsjechen' }
	},
	DEU: {
		flag: '🇩🇪',
		fr: { name: 'Allemagne', demo: 'Allemands' },
		en: { name: 'Germany', demo: 'Germans' },
		nl: { name: 'Duitsland', demo: 'Duitsers' }
	},
	DJI: {
		flag: '🇩🇯',
		fr: { name: 'Djibouti', demo: 'Djiboutiens' },
		en: { name: 'Djibouti', demo: 'Djiboutians' },
		nl: { name: 'Djibouti', demo: 'Djiboutianen' }
	},
	DNK: {
		flag: '🇩🇰',
		fr: { name: 'Danemark', demo: 'Danois' },
		en: { name: 'Denmark', demo: 'Danes' },
		nl: { name: 'Denemarken', demo: 'Denen' }
	},
	DOM: {
		flag: '🇩🇴',
		fr: { name: 'Rép. dominicaine', demo: 'Dominicains' },
		en: { name: 'Dominican Republic', demo: 'Dominicans' },
		nl: { name: 'Dominicaanse Republiek', demo: 'Dominicanen' }
	},
	DZA: {
		flag: '🇩🇿',
		fr: { name: 'Algérie', demo: 'Algériens' },
		en: { name: 'Algeria', demo: 'Algerians' },
		nl: { name: 'Algerije', demo: 'Algerijnen' }
	},
	ECU: {
		flag: '🇪🇨',
		fr: { name: 'Équateur', demo: 'Équatoriens' },
		en: { name: 'Ecuador', demo: 'Ecuadorians' },
		nl: { name: 'Ecuador', demo: 'Ecuadoranen' }
	},
	EGY: {
		flag: '🇪🇬',
		fr: { name: 'Égypte', demo: 'Égyptiens' },
		en: { name: 'Egypt', demo: 'Egyptians' },
		nl: { name: 'Egypte', demo: 'Egyptenaren' }
	},
	ERI: {
		flag: '🇪🇷',
		fr: { name: 'Érythrée', demo: 'Érythréens' },
		en: { name: 'Eritrea', demo: 'Eritreans' },
		nl: { name: 'Eritrea', demo: 'Eritreeërs' }
	},
	ESP: {
		flag: '🇪🇸',
		fr: { name: 'Espagne', demo: 'Espagnols' },
		en: { name: 'Spain', demo: 'Spaniards' },
		nl: { name: 'Spanje', demo: 'Spanjaarden' }
	},
	EST: {
		flag: '🇪🇪',
		fr: { name: 'Estonie', demo: 'Estoniens' },
		en: { name: 'Estonia', demo: 'Estonians' },
		nl: { name: 'Estland', demo: 'Esten' }
	},
	ETH: {
		flag: '🇪🇹',
		fr: { name: 'Éthiopie', demo: 'Éthiopiens' },
		en: { name: 'Ethiopia', demo: 'Ethiopians' },
		nl: { name: 'Ethiopië', demo: 'Ethiopiërs' }
	},
	FIN: {
		flag: '🇫🇮',
		fr: { name: 'Finlande', demo: 'Finlandais' },
		en: { name: 'Finland', demo: 'Finns' },
		nl: { name: 'Finland', demo: 'Finnen' }
	},
	FRA: {
		flag: '🇫🇷',
		fr: { name: 'France', demo: 'Français' },
		en: { name: 'France', demo: 'French' },
		nl: { name: 'Frankrijk', demo: 'Fransen' }
	},
	GBR: {
		flag: '🇬🇧',
		fr: { name: 'Royaume-Uni', demo: 'Britanniques' },
		en: { name: 'United Kingdom', demo: 'Britons' },
		nl: { name: 'Verenigd Koninkrijk', demo: 'Britten' }
	},
	GEO: {
		flag: '🇬🇪',
		fr: { name: 'Géorgie', demo: 'Géorgiens' },
		en: { name: 'Georgia', demo: 'Georgians' },
		nl: { name: 'Georgië', demo: 'Georgiërs' }
	},
	GHA: {
		flag: '🇬🇭',
		fr: { name: 'Ghana', demo: 'Ghanéens' },
		en: { name: 'Ghana', demo: 'Ghanaians' },
		nl: { name: 'Ghana', demo: 'Ghanezen' }
	},
	GIN: {
		flag: '🇬🇳',
		fr: { name: 'Guinée', demo: 'Guinéens' },
		en: { name: 'Guinea', demo: 'Guineans' },
		nl: { name: 'Guinee', demo: 'Guineeërs' }
	},
	GMB: {
		flag: '🇬🇲',
		fr: { name: 'Gambie', demo: 'Gambiens' },
		en: { name: 'Gambia', demo: 'Gambians' },
		nl: { name: 'Gambia', demo: 'Gambianen' }
	},
	GNB: {
		flag: '🇬🇼',
		fr: { name: 'Guinée-Bissau', demo: 'Bissaoguinéens' },
		en: { name: 'Guinea-Bissau', demo: 'Bissau-Guineans' },
		nl: { name: 'Guinee-Bissau', demo: 'Guinee-Bissauers' }
	},
	GRC: {
		flag: '🇬🇷',
		fr: { name: 'Grèce', demo: 'Grecs' },
		en: { name: 'Greece', demo: 'Greeks' },
		nl: { name: 'Griekenland', demo: 'Grieken' }
	},
	GTM: {
		flag: '🇬🇹',
		fr: { name: 'Guatemala', demo: 'Guatémaltèques' },
		en: { name: 'Guatemala', demo: 'Guatemalans' },
		nl: { name: 'Guatemala', demo: 'Guatemalanen' }
	},
	HND: {
		flag: '🇭🇳',
		fr: { name: 'Honduras', demo: 'Honduriens' },
		en: { name: 'Honduras', demo: 'Hondurans' },
		nl: { name: 'Honduras', demo: 'Hondurezen' }
	},
	HRV: {
		flag: '🇭🇷',
		fr: { name: 'Croatie', demo: 'Croates' },
		en: { name: 'Croatia', demo: 'Croats' },
		nl: { name: 'Kroatië', demo: 'Kroaten' }
	},
	HUN: {
		flag: '🇭🇺',
		fr: { name: 'Hongrie', demo: 'Hongrois' },
		en: { name: 'Hungary', demo: 'Hungarians' },
		nl: { name: 'Hongarije', demo: 'Hongaren' }
	},
	IDN: {
		flag: '🇮🇩',
		fr: { name: 'Indonésie', demo: 'Indonésiens' },
		en: { name: 'Indonesia', demo: 'Indonesians' },
		nl: { name: 'Indonesië', demo: 'Indonesiërs' }
	},
	IND: {
		flag: '🇮🇳',
		fr: { name: 'Inde', demo: 'Indiens' },
		en: { name: 'India', demo: 'Indians' },
		nl: { name: 'India', demo: 'Indiërs' }
	},
	IRL: {
		flag: '🇮🇪',
		fr: { name: 'Irlande', demo: 'Irlandais' },
		en: { name: 'Ireland', demo: 'Irish' },
		nl: { name: 'Ierland', demo: 'Ieren' }
	},
	IRN: {
		flag: '🇮🇷',
		fr: { name: 'Iran', demo: 'Iraniens' },
		en: { name: 'Iran', demo: 'Iranians' },
		nl: { name: 'Iran', demo: 'Iraniërs' }
	},
	IRQ: {
		flag: '🇮🇶',
		fr: { name: 'Irak', demo: 'Irakiens' },
		en: { name: 'Iraq', demo: 'Iraqis' },
		nl: { name: 'Irak', demo: 'Irakezen' }
	},
	ISL: {
		flag: '🇮🇸',
		fr: { name: 'Islande', demo: 'Islandais' },
		en: { name: 'Iceland', demo: 'Icelanders' },
		nl: { name: 'IJsland', demo: 'IJslanders' }
	},
	ISR: {
		flag: '🇮🇱',
		fr: { name: 'Israël', demo: 'Israéliens' },
		en: { name: 'Israel', demo: 'Israelis' },
		nl: { name: 'Israël', demo: 'Israëliërs' }
	},
	ITA: {
		flag: '🇮🇹',
		fr: { name: 'Italie', demo: 'Italiens' },
		en: { name: 'Italy', demo: 'Italians' },
		nl: { name: 'Italië', demo: 'Italianen' }
	},
	JAM: {
		flag: '🇯🇲',
		fr: { name: 'Jamaïque', demo: 'Jamaïcains' },
		en: { name: 'Jamaica', demo: 'Jamaicans' },
		nl: { name: 'Jamaica', demo: 'Jamaicanen' }
	},
	JOR: {
		flag: '🇯🇴',
		fr: { name: 'Jordanie', demo: 'Jordaniens' },
		en: { name: 'Jordan', demo: 'Jordanians' },
		nl: { name: 'Jordanië', demo: 'Jordaniërs' }
	},
	JPN: {
		flag: '🇯🇵',
		fr: { name: 'Japon', demo: 'Japonais' },
		en: { name: 'Japan', demo: 'Japanese' },
		nl: { name: 'Japan', demo: 'Japanners' }
	},
	KAZ: {
		flag: '🇰🇿',
		fr: { name: 'Kazakhstan', demo: 'Kazakhs' },
		en: { name: 'Kazakhstan', demo: 'Kazakhs' },
		nl: { name: 'Kazachstan', demo: 'Kazachen' }
	},
	KOR: {
		flag: '🇰🇷',
		fr: { name: 'Corée du Sud', demo: 'Coréens' },
		en: { name: 'South Korea', demo: 'South Koreans' },
		nl: { name: 'Zuid-Korea', demo: 'Zuid-Koreanen' }
	},
	LAO: {
		flag: '🇱🇦',
		fr: { name: 'Laos', demo: 'Laotiens' },
		en: { name: 'Laos', demo: 'Laotians' },
		nl: { name: 'Laos', demo: 'Laotianen' }
	},
	LBN: {
		flag: '🇱🇧',
		fr: { name: 'Liban', demo: 'Libanais' },
		en: { name: 'Lebanon', demo: 'Lebanese' },
		nl: { name: 'Libanon', demo: 'Libanezen' }
	},
	LBY: {
		flag: '🇱🇾',
		fr: { name: 'Libye', demo: 'Libyens' },
		en: { name: 'Libya', demo: 'Libyans' },
		nl: { name: 'Libië', demo: 'Libiërs' }
	},
	LTU: {
		flag: '🇱🇹',
		fr: { name: 'Lituanie', demo: 'Lituaniens' },
		en: { name: 'Lithuania', demo: 'Lithuanians' },
		nl: { name: 'Litouwen', demo: 'Litouwers' }
	},
	LUX: {
		flag: '🇱🇺',
		fr: { name: 'Luxembourg', demo: 'Luxembourgeois' },
		en: { name: 'Luxembourg', demo: 'Luxembourgers' },
		nl: { name: 'Luxemburg', demo: 'Luxemburgers' }
	},
	LVA: {
		flag: '🇱🇻',
		fr: { name: 'Lettonie', demo: 'Lettons' },
		en: { name: 'Latvia', demo: 'Latvians' },
		nl: { name: 'Letland', demo: 'Letten' }
	},
	MAR: {
		flag: '🇲🇦',
		fr: { name: 'Maroc', demo: 'Marocains' },
		en: { name: 'Morocco', demo: 'Moroccans' },
		nl: { name: 'Marokko', demo: 'Marokkanen' }
	},
	MCO: {
		flag: '🇲🇨',
		fr: { name: 'Monaco', demo: 'Monégasques' },
		en: { name: 'Monaco', demo: 'Monégasques' },
		nl: { name: 'Monaco', demo: 'Monegasken' }
	},
	MDA: {
		flag: '🇲🇩',
		fr: { name: 'Moldavie', demo: 'Moldaves' },
		en: { name: 'Moldova', demo: 'Moldovans' },
		nl: { name: 'Moldavië', demo: 'Moldaviërs' }
	},
	MDG: {
		flag: '🇲🇬',
		fr: { name: 'Madagascar', demo: 'Malgaches' },
		en: { name: 'Madagascar', demo: 'Malagasy' },
		nl: { name: 'Madagaskar', demo: 'Malagassiërs' }
	},
	MEX: {
		flag: '🇲🇽',
		fr: { name: 'Mexique', demo: 'Mexicains' },
		en: { name: 'Mexico', demo: 'Mexicans' },
		nl: { name: 'Mexico', demo: 'Mexicanen' }
	},
	MKD: {
		flag: '🇲🇰',
		fr: { name: 'Macédoine du Nord', demo: 'Macédoniens' },
		en: { name: 'North Macedonia', demo: 'Macedonians' },
		nl: { name: 'Noord-Macedonië', demo: 'Macedoniërs' }
	},
	MLI: {
		flag: '🇲🇱',
		fr: { name: 'Mali', demo: 'Maliens' },
		en: { name: 'Mali', demo: 'Malians' },
		nl: { name: 'Mali', demo: 'Malinezen' }
	},
	MLT: {
		flag: '🇲🇹',
		fr: { name: 'Malte', demo: 'Maltais' },
		en: { name: 'Malta', demo: 'Maltese' },
		nl: { name: 'Malta', demo: 'Maltezen' }
	},
	MMR: {
		flag: '🇲🇲',
		fr: { name: 'Birmanie', demo: 'Birmans' },
		en: { name: 'Myanmar', demo: 'Burmese' },
		nl: { name: 'Myanmar', demo: 'Birmanen' }
	},
	MNE: {
		flag: '🇲🇪',
		fr: { name: 'Monténégro', demo: 'Monténégrins' },
		en: { name: 'Montenegro', demo: 'Montenegrins' },
		nl: { name: 'Montenegro', demo: 'Montenegrijnen' }
	},
	MNG: {
		flag: '🇲🇳',
		fr: { name: 'Mongolie', demo: 'Mongols' },
		en: { name: 'Mongolia', demo: 'Mongolians' },
		nl: { name: 'Mongolië', demo: 'Mongolen' }
	},
	MOZ: {
		flag: '🇲🇿',
		fr: { name: 'Mozambique', demo: 'Mozambicains' },
		en: { name: 'Mozambique', demo: 'Mozambicans' },
		nl: { name: 'Mozambique', demo: 'Mozambikanen' }
	},
	MRT: {
		flag: '🇲🇷',
		fr: { name: 'Mauritanie', demo: 'Mauritaniens' },
		en: { name: 'Mauritania', demo: 'Mauritanians' },
		nl: { name: 'Mauritanië', demo: 'Mauritaniërs' }
	},
	MUS: {
		flag: '🇲🇺',
		fr: { name: 'Maurice', demo: 'Mauriciens' },
		en: { name: 'Mauritius', demo: 'Mauritians' },
		nl: { name: 'Mauritius', demo: 'Mauritianen' }
	},
	MWI: {
		flag: '🇲🇼',
		fr: { name: 'Malawi', demo: 'Malawites' },
		en: { name: 'Malawi', demo: 'Malawians' },
		nl: { name: 'Malawi', demo: 'Malawiërs' }
	},
	MYS: {
		flag: '🇲🇾',
		fr: { name: 'Malaisie', demo: 'Malaisiens' },
		en: { name: 'Malaysia', demo: 'Malaysians' },
		nl: { name: 'Maleisië', demo: 'Maleisiërs' }
	},
	NAM: {
		flag: '🇳🇦',
		fr: { name: 'Namibie', demo: 'Namibiens' },
		en: { name: 'Namibia', demo: 'Namibians' },
		nl: { name: 'Namibië', demo: 'Namibiërs' }
	},
	NER: {
		flag: '🇳🇪',
		fr: { name: 'Niger', demo: 'Nigériens' },
		en: { name: 'Niger', demo: 'Nigeriens' },
		nl: { name: 'Niger', demo: 'Nigerezen' }
	},
	NGA: {
		flag: '🇳🇬',
		fr: { name: 'Nigeria', demo: 'Nigérians' },
		en: { name: 'Nigeria', demo: 'Nigerians' },
		nl: { name: 'Nigeria', demo: 'Nigerianen' }
	},
	NLD: {
		flag: '🇳🇱',
		fr: { name: 'Pays-Bas', demo: 'Néerlandais' },
		en: { name: 'Netherlands', demo: 'Dutch' },
		nl: { name: 'Nederland', demo: 'Nederlanders' }
	},
	NOR: {
		flag: '🇳🇴',
		fr: { name: 'Norvège', demo: 'Norvégiens' },
		en: { name: 'Norway', demo: 'Norwegians' },
		nl: { name: 'Noorwegen', demo: 'Noren' }
	},
	NPL: {
		flag: '🇳🇵',
		fr: { name: 'Népal', demo: 'Népalais' },
		en: { name: 'Nepal', demo: 'Nepalis' },
		nl: { name: 'Nepal', demo: 'Nepalezen' }
	},
	NZL: {
		flag: '🇳🇿',
		fr: { name: 'Nouvelle-Zélande', demo: 'Néo-Zélandais' },
		en: { name: 'New Zealand', demo: 'New Zealanders' },
		nl: { name: 'Nieuw-Zeeland', demo: 'Nieuw-Zeelanders' }
	},
	PAK: {
		flag: '🇵🇰',
		fr: { name: 'Pakistan', demo: 'Pakistanais' },
		en: { name: 'Pakistan', demo: 'Pakistanis' },
		nl: { name: 'Pakistan', demo: 'Pakistanen' }
	},
	PAN: {
		flag: '🇵🇦',
		fr: { name: 'Panama', demo: 'Panaméens' },
		en: { name: 'Panama', demo: 'Panamanians' },
		nl: { name: 'Panama', demo: 'Panamezen' }
	},
	PER: {
		flag: '🇵🇪',
		fr: { name: 'Pérou', demo: 'Péruviens' },
		en: { name: 'Peru', demo: 'Peruvians' },
		nl: { name: 'Peru', demo: 'Peruanen' }
	},
	PHL: {
		flag: '🇵🇭',
		fr: { name: 'Philippines', demo: 'Philippins' },
		en: { name: 'Philippines', demo: 'Filipinos' },
		nl: { name: 'Filipijnen', demo: 'Filipino\'s' }
	},
	POL: {
		flag: '🇵🇱',
		fr: { name: 'Pologne', demo: 'Polonais' },
		en: { name: 'Poland', demo: 'Poles' },
		nl: { name: 'Polen', demo: 'Polen' }
	},
	PRT: {
		flag: '🇵🇹',
		fr: { name: 'Portugal', demo: 'Portugais' },
		en: { name: 'Portugal', demo: 'Portuguese' },
		nl: { name: 'Portugal', demo: 'Portugezen' }
	},
	PRY: {
		flag: '🇵🇾',
		fr: { name: 'Paraguay', demo: 'Paraguayens' },
		en: { name: 'Paraguay', demo: 'Paraguayans' },
		nl: { name: 'Paraguay', demo: 'Paraguayanen' }
	},
	PSE: {
		flag: '🇵🇸',
		fr: { name: 'Palestine', demo: 'Palestiniens' },
		en: { name: 'Palestine', demo: 'Palestinians' },
		nl: { name: 'Palestina', demo: 'Palestijnen' }
	},
	ROU: {
		flag: '🇷🇴',
		fr: { name: 'Roumanie', demo: 'Roumains' },
		en: { name: 'Romania', demo: 'Romanians' },
		nl: { name: 'Roemenië', demo: 'Roemenen' }
	},
	RUS: {
		flag: '🇷🇺',
		fr: { name: 'Russie', demo: 'Russes' },
		en: { name: 'Russia', demo: 'Russians' },
		nl: { name: 'Rusland', demo: 'Russen' }
	},
	RWA: {
		flag: '🇷🇼',
		fr: { name: 'Rwanda', demo: 'Rwandais' },
		en: { name: 'Rwanda', demo: 'Rwandans' },
		nl: { name: 'Rwanda', demo: 'Rwandezen' }
	},
	SCG: {
		flag: '🇷🇸',
		fr: { name: 'Serbie-Monténégro', demo: 'Serbo-Monténégrins' },
		en: { name: 'Serbia and Montenegro', demo: 'Serbs and Montenegrins' },
		nl: { name: 'Servië en Montenegro', demo: 'Serviërs en Montenegrijnen' }
	},
	SDN: {
		flag: '🇸🇩',
		fr: { name: 'Soudan', demo: 'Soudanais' },
		en: { name: 'Sudan', demo: 'Sudanese' },
		nl: { name: 'Soedan', demo: 'Soedanezen' }
	},
	SEN: {
		flag: '🇸🇳',
		fr: { name: 'Sénégal', demo: 'Sénégalais' },
		en: { name: 'Senegal', demo: 'Senegalese' },
		nl: { name: 'Senegal', demo: 'Senegalezen' }
	},
	SGP: {
		flag: '🇸🇬',
		fr: { name: 'Singapour', demo: 'Singapouriens' },
		en: { name: 'Singapore', demo: 'Singaporeans' },
		nl: { name: 'Singapore', demo: 'Singaporezen' }
	},
	SLE: {
		flag: '🇸🇱',
		fr: { name: 'Sierra Leone', demo: 'Sierra-Léonais' },
		en: { name: 'Sierra Leone', demo: 'Sierra Leoneans' },
		nl: { name: 'Sierra Leone', demo: 'Sierraleoners' }
	},
	SLV: {
		flag: '🇸🇻',
		fr: { name: 'Salvador', demo: 'Salvadoriens' },
		en: { name: 'El Salvador', demo: 'Salvadorans' },
		nl: { name: 'El Salvador', demo: 'Salvadoranen' }
	},
	SOM: {
		flag: '🇸🇴',
		fr: { name: 'Somalie', demo: 'Somaliens' },
		en: { name: 'Somalia', demo: 'Somalis' },
		nl: { name: 'Somalië', demo: 'Somaliërs' }
	},
	SVK: {
		flag: '🇸🇰',
		fr: { name: 'Slovaquie', demo: 'Slovaques' },
		en: { name: 'Slovakia', demo: 'Slovaks' },
		nl: { name: 'Slowakije', demo: 'Slowaken' }
	},
	SVN: {
		flag: '🇸🇮',
		fr: { name: 'Slovénie', demo: 'Slovènes' },
		en: { name: 'Slovenia', demo: 'Slovenians' },
		nl: { name: 'Slovenië', demo: 'Slovenen' }
	},
	SWE: {
		flag: '🇸🇪',
		fr: { name: 'Suède', demo: 'Suédois' },
		en: { name: 'Sweden', demo: 'Swedes' },
		nl: { name: 'Zweden', demo: 'Zweden' }
	},
	SYR: {
		flag: '🇸🇾',
		fr: { name: 'Syrie', demo: 'Syriens' },
		en: { name: 'Syria', demo: 'Syrians' },
		nl: { name: 'Syrië', demo: 'Syriërs' }
	},
	TGO: {
		flag: '🇹🇬',
		fr: { name: 'Togo', demo: 'Togolais' },
		en: { name: 'Togo', demo: 'Togolese' },
		nl: { name: 'Togo', demo: 'Togolezen' }
	},
	THA: {
		flag: '🇹🇭',
		fr: { name: 'Thaïlande', demo: 'Thaïlandais' },
		en: { name: 'Thailand', demo: 'Thais' },
		nl: { name: 'Thailand', demo: 'Thai' }
	},
	TUN: {
		flag: '🇹🇳',
		fr: { name: 'Tunisie', demo: 'Tunisiens' },
		en: { name: 'Tunisia', demo: 'Tunisians' },
		nl: { name: 'Tunesië', demo: 'Tunesiërs' }
	},
	TUR: {
		flag: '🇹🇷',
		fr: { name: 'Turquie', demo: 'Turcs' },
		en: { name: 'Turkey', demo: 'Turks' },
		nl: { name: 'Turkije', demo: 'Turken' }
	},
	TWN: {
		flag: '🇹🇼',
		fr: { name: 'Taïwan', demo: 'Taïwanais' },
		en: { name: 'Taiwan', demo: 'Taiwanese' },
		nl: { name: 'Taiwan', demo: 'Taiwanezen' }
	},
	UGA: {
		flag: '🇺🇬',
		fr: { name: 'Ouganda', demo: 'Ougandais' },
		en: { name: 'Uganda', demo: 'Ugandans' },
		nl: { name: 'Oeganda', demo: 'Oegandezen' }
	},
	UKR: {
		flag: '🇺🇦',
		fr: { name: 'Ukraine', demo: 'Ukrainiens' },
		en: { name: 'Ukraine', demo: 'Ukrainians' },
		nl: { name: 'Oekraïne', demo: 'Oekraïners' }
	},
	URY: {
		flag: '🇺🇾',
		fr: { name: 'Uruguay', demo: 'Uruguayens' },
		en: { name: 'Uruguay', demo: 'Uruguayans' },
		nl: { name: 'Uruguay', demo: 'Uruguayanen' }
	},
	USA: {
		flag: '🇺🇸',
		fr: { name: 'États-Unis', demo: 'Américains' },
		en: { name: 'United States', demo: 'Americans' },
		nl: { name: 'Verenigde Staten', demo: 'Amerikanen' }
	},
	UZB: {
		flag: '🇺🇿',
		fr: { name: 'Ouzbékistan', demo: 'Ouzbeks' },
		en: { name: 'Uzbekistan', demo: 'Uzbeks' },
		nl: { name: 'Oezbekistan', demo: 'Oezbeken' }
	},
	VEN: {
		flag: '🇻🇪',
		fr: { name: 'Venezuela', demo: 'Vénézuéliens' },
		en: { name: 'Venezuela', demo: 'Venezuelans' },
		nl: { name: 'Venezuela', demo: 'Venezolanen' }
	},
	VNM: {
		flag: '🇻🇳',
		fr: { name: 'Vietnam', demo: 'Vietnamiens' },
		en: { name: 'Vietnam', demo: 'Vietnamese' },
		nl: { name: 'Vietnam', demo: 'Vietnamezen' }
	},
	VUT: {
		flag: '🇻🇺',
		fr: { name: 'Vanuatu', demo: 'Vanuatuans' },
		en: { name: 'Vanuatu', demo: 'Ni-Vanuatu' },
		nl: { name: 'Vanuatu', demo: 'Vanuatuanen' }
	},
	XKX: {
		flag: '🇽🇰',
		fr: { name: 'Kosovo', demo: 'Kosovars' },
		en: { name: 'Kosovo', demo: 'Kosovars' },
		nl: { name: 'Kosovo', demo: 'Kosovaren' }
	},
	YEM: {
		flag: '🇾🇪',
		fr: { name: 'Yémen', demo: 'Yéménites' },
		en: { name: 'Yemen', demo: 'Yemenis' },
		nl: { name: 'Jemen', demo: 'Jemenieten' }
	},
	ZAF: {
		flag: '🇿🇦',
		fr: { name: 'Afrique du Sud', demo: 'Sud-Africains' },
		en: { name: 'South Africa', demo: 'South Africans' },
		nl: { name: 'Zuid-Afrika', demo: 'Zuid-Afrikanen' }
	},
	ZWE: {
		flag: '🇿🇼',
		fr: { name: 'Zimbabwe', demo: 'Zimbabwéens' },
		en: { name: 'Zimbabwe', demo: 'Zimbabweans' },
		nl: { name: 'Zimbabwe', demo: 'Zimbabwanen' }
	}
};

/** Country name + demonym in the given language, with a graceful fallback. */
export function countryInfo(
	code: string | null,
	lang: Lang
): { flag: string; name: string; demo: string } | null {
	if (!code) return null;
	const e = COUNTRIES[code];
	if (!e) return { flag: '🏳️', name: code, demo: code };
	return { flag: e.flag, name: e[lang].name, demo: e[lang].demo };
}
