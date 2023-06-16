<script lang="ts">
	import Button from '../../../shared/Button.svelte';
	import Material from './Material.svelte';
	import addIcon from '../../../../assets/icons/add.svg?raw';
	import { crossfade } from 'svelte/transition';
	import { flip } from 'svelte/animate';
	import { quintOut } from 'svelte/easing';
	const [send, receive] = crossfade({
		duration: (d) => Math.sqrt(d * 200),

		fallback(node, params) {
			const style = getComputedStyle(node);
			const transform = style.transform === 'none' ? '' : style.transform;

			return {
				duration: 600,
				easing: quintOut,
				css: (t) => `
     			transform: ${transform} scale(${t});
     			opacity: ${t}
    			`
			};
		}
	});

	export let materials: any[];

	function add() {
		materials = [
			...materials,
			{
				category: undefined,
				material: { coefficient_of_thermal_conductivity: 0, id: 0 },
				width: 0.1
			}
		];
	}

	function remove(item: any) {
		const index = materials.indexOf(item);
		if (index > -1) {
			materials.splice(index, 1);
		}
		materials = materials;
	}

	function moveUp(material: any) {
		const index = materials.indexOf(material);
		if (index - 1 >= 0) {
			swap(index - 1, index);
		}
	}

	function moveDown(material: any) {
		const index = materials.indexOf(material);
		if (index + 1 < materials.length) {
			swap(index, index + 1);
		}
	}
	function swap(index0: number, index1: number) {
		[materials[index0], materials[index1]] = [materials[index1], materials[index0]];
	}
</script>

<div class="container">
	<div class="header-container"><h1>Параметры конструкции</h1></div>
	<div class="list-and-button">
		<div class="wrapper">
			<div class="list">
				{#each materials as material (material)}
					<div in:receive={{ key: material }} out:send={{ key: material }} animate:flip>
						<Material bind:material {remove} {moveUp} {moveDown} />
					</div>
				{/each}
			</div>
		</div>
		<Button icon={addIcon} on:click={add}>Добавить слой</Button>
	</div>
</div>

<style lang="scss">
	.container {
		display: flex;
		flex-direction: column;
		height: 100%;
		padding: 40px 0px 24px;
		gap: 24px;
		pointer-events: all;

		background: #fdfdfd;
		border-radius: 24px;

		.header-container {
			padding: 0px 32px;
			h1 {
				font-family: 'Inter';
				font-weight: 500;
				font-size: 28px;
				line-height: 34px;
				letter-spacing: -0.02em;

				color: #1d1d32;
			}
		}

		.list-and-button {
			align-items: center;
			height: 100%;
			display: flex;
			flex-direction: column;
			padding: 0px;
			gap: 32px;

			.wrapper {
				height: 100%;
				width: 100%;
				position: relative;

				border-bottom: 1px solid rgba(29, 29, 50, 0.1);
				border-top: 1px solid rgba(29, 29, 50, 0.1);

				.list {
					display: flex;
					flex-direction: column;
					padding: 12px 24px;
					gap: 32px;
					overflow: auto;

					position: absolute;
					top: 0;
					left: 0;
					bottom: 0;
					right: 0;
				}
			}
		}
	}
</style>
