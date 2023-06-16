<script lang="ts">
	import { T } from '@threlte/core';
	import { OrbitControls } from '@threlte/extras';
	import { Float } from '@threlte/extras';

	export let materials: any[];

	const gap = 0.01;

	function calcXStart(materials: any[], index: number): number {
		let startX = 0;
		let summWidth = 0;
		for (let i = 0; i < materials.length; i++) {
			if (index <= i) {
				startX += materials[i].width + gap;
			}
			summWidth += materials[i].width;
		}
		return startX - (summWidth + gap * (materials.length - 1)) / 2;
	}

	function random(seed: number) {
		const x = Math.sin(seed + 7982) * 10000;
		return x - Math.floor(x);
	}

	function randomColor(id: number) {
		const [r, g, b] = rgb(Math.round(random(id) * 360), 100, 50);
		console.log(`rgb(${r}, ${g}, ${b})`);
		return `rgb(${r}, ${g}, ${b})`;
	}

	function rgb(h: number, s: number, l: number) {
		s /= 100;
		l /= 100;
		const k = (n: number) => (n + h / 30) % 12;
		const a = s * Math.min(l, 1 - l);
		const f = (n: number) => l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
		return [~~(255 * f(0)), ~~(255 * f(8)), ~~(255 * f(4))];
	}
</script>

<T.PerspectiveCamera makeDefault position.y={0} position.z={10}>
	<OrbitControls enablePan={false} />
</T.PerspectiveCamera>

<T.DirectionalLight position={[10, 10, 10]} />
<T.AmbientLight />

<Float floatIntensity={1} floatingRange={[-0.2, 0.2]} rotation={[0, 0.5, 0]}>
	{#each materials as material, index}
		<T.Mesh position.y={0} position.x={calcXStart(materials, index) - material.width / 2}>
			<T.BoxGeometry args={[material.width, 1, 1]} />
			<T.MeshStandardMaterial color={randomColor(material.material.id)} />
		</T.Mesh>
	{/each}
</Float>
