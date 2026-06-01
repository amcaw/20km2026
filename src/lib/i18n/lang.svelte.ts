import { browser } from '$app/environment';

export type Lang = 'fr' | 'en' | 'nl';
export const LANGS: Lang[] = ['fr', 'en', 'nl'];
export const LANG_LABEL: Record<Lang, string> = { fr: 'FR', en: 'EN', nl: 'NL' };

const STORAGE_KEY = '20km2026.lang';

function initial(): Lang {
	if (!browser) return 'fr';
	const saved = localStorage.getItem(STORAGE_KEY);
	if (saved === 'fr' || saved === 'en' || saved === 'nl') return saved;
	return 'fr';
}

// Reactive current language. Components read `lang.value`; the picker sets it.
class LangStore {
	value = $state<Lang>(initial());

	set(l: Lang) {
		this.value = l;
		if (browser) localStorage.setItem(STORAGE_KEY, l);
	}
}

export const lang = new LangStore();
