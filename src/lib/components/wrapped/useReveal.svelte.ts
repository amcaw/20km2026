export function reveal(
	el: HTMLElement,
	options?: { onReveal?: () => void }
) {
	let revealed = false;
	let opts = options;
	const io = new IntersectionObserver(
		(entries) => {
			for (const e of entries) {
				if (e.isIntersecting && !revealed) {
					revealed = true;
					el.dataset.revealed = 'true';
					opts?.onReveal?.();
					io.disconnect();
				}
			}
		},
		{ threshold: 0.2 }
	);
	io.observe(el);
	return {
		update(newOptions?: { onReveal?: () => void }) {
			opts = newOptions;
			if (revealed) opts?.onReveal?.();
		},
		destroy() {
			io.disconnect();
		}
	};
}

function easeOutCubic(t: number): number {
	const u = 1 - t;
	return 1 - u * u * u;
}

export class Counter {
	value = $state(0);
	#raf: number | null = null;
	#target: number | null = null;

	run(target: number) {
		if (target === this.#target) return;
		this.#target = target;
		if (this.#raf != null) cancelAnimationFrame(this.#raf);

		const start = this.value;
		const startedAt = performance.now();
		const span = Math.abs(target - start);
		const duration = Math.min(1800, Math.max(700, Math.log10(Math.max(10, span)) * 500));

		const step = (now: number) => {
			const t = Math.min(1, (now - startedAt) / duration);
			this.value = start + (target - start) * easeOutCubic(t);
			if (t < 1) {
				this.#raf = requestAnimationFrame(step);
			} else {
				this.#raf = null;
			}
		};
		this.#raf = requestAnimationFrame(step);
	}
}
