<script lang="ts" module>
	type Node = ['path' | 'circle' | 'rect' | 'line' | 'polyline', Record<string, string | number>];

	export type IconName =
		| 'sun'
		| 'cloud'
		| 'cloud-sun'
		| 'cloud-rain'
		| 'cloud-drizzle'
		| 'wind'
		| 'droplet'
		| 'thermometer'
		| 'mail'
		| 'copy'
		| 'check'
		| 'chevron-down';

	export const ICONS: Record<IconName, Node[]> = {
		sun: [
			['circle', { cx: 12, cy: 12, r: 4 }],
			['path', { d: 'M12 2v2' }],
			['path', { d: 'M12 20v2' }],
			['path', { d: 'm4.93 4.93 1.41 1.41' }],
			['path', { d: 'm17.66 17.66 1.41 1.41' }],
			['path', { d: 'M2 12h2' }],
			['path', { d: 'M20 12h2' }],
			['path', { d: 'm6.34 17.66-1.41 1.41' }],
			['path', { d: 'm19.07 4.93-1.41 1.41' }]
		],
		cloud: [['path', { d: 'M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z' }]],
		'cloud-sun': [
			['path', { d: 'M12 2v2' }],
			['path', { d: 'm4.93 4.93 1.41 1.41' }],
			['path', { d: 'M20 12h2' }],
			['path', { d: 'm19.07 4.93-1.41 1.41' }],
			['path', { d: 'M15.947 12.65a4 4 0 0 0-5.925-4.128' }],
			['path', { d: 'M13 22H7a5 5 0 1 1 4.9-6H13a3 3 0 0 1 0 6Z' }]
		],
		'cloud-rain': [
			['path', { d: 'M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242' }],
			['path', { d: 'M16 14v6' }],
			['path', { d: 'M8 14v6' }],
			['path', { d: 'M12 16v6' }]
		],
		'cloud-drizzle': [
			['path', { d: 'M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242' }],
			['path', { d: 'M8 19v1' }],
			['path', { d: 'M8 14v1' }],
			['path', { d: 'M16 19v1' }],
			['path', { d: 'M16 14v1' }],
			['path', { d: 'M12 21v1' }],
			['path', { d: 'M12 16v1' }]
		],
		wind: [
			['path', { d: 'M12.8 19.6A2 2 0 1 0 14 16H2' }],
			['path', { d: 'M17.5 8a2.5 2.5 0 1 1 2 4H2' }],
			['path', { d: 'M9.8 4.4A2 2 0 1 1 11 8H2' }]
		],
		droplet: [
			[
				'path',
				{
					d: 'M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z'
				}
			]
		],
		thermometer: [['path', { d: 'M14 4v10.54a4 4 0 1 1-4 0V4a2 2 0 0 1 4 0Z' }]],
		mail: [
			['path', { d: 'm22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7' }],
			['rect', { x: 2, y: 4, width: 20, height: 16, rx: 2 }]
		],
		copy: [
			['rect', { width: 14, height: 14, x: 8, y: 8, rx: 2, ry: 2 }],
			['path', { d: 'M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2' }]
		],
		check: [['path', { d: 'M20 6 9 17l-5-5' }]],
		'chevron-down': [['path', { d: 'm6 9 6 6 6-6' }]]
	};
</script>

<script lang="ts">
	type Props = {
		name: IconName;
		size?: number;
		strokeWidth?: number;
	};

	let { name, size = 20, strokeWidth = 1.8 }: Props = $props();

	const nodes = $derived(ICONS[name]);
</script>

<svg
	xmlns="http://www.w3.org/2000/svg"
	width={size}
	height={size}
	viewBox="0 0 24 24"
	fill="none"
	stroke="currentColor"
	stroke-width={strokeWidth}
	stroke-linecap="round"
	stroke-linejoin="round"
	aria-hidden="true"
>
	{#each nodes as node (node)}
		{#if node[0] === 'path'}
			<path d={node[1].d as string} />
		{:else if node[0] === 'circle'}
			<circle
				cx={node[1].cx}
				cy={node[1].cy}
				r={node[1].r}
			/>
		{:else if node[0] === 'rect'}
			<rect
				x={node[1].x}
				y={node[1].y}
				width={node[1].width}
				height={node[1].height}
				rx={node[1].rx}
				ry={node[1].ry ?? node[1].rx}
			/>
		{:else if node[0] === 'line'}
			<line
				x1={node[1].x1}
				y1={node[1].y1}
				x2={node[1].x2}
				y2={node[1].y2}
			/>
		{:else if node[0] === 'polyline'}
			<polyline points={node[1].points as string} />
		{/if}
	{/each}
</svg>
