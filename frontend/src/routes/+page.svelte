<script lang="ts">
	import ConstructionParams from '$lib/feature/main/ConstructionParams/ConstructionParams.svelte';
	import OutterParams from '$lib/feature/main/OutterParams.svelte';
	import Result from '$lib/feature/main/Result.svelte';
	import Scene from '$lib/feature/main/Scene.svelte';
	import { Canvas } from '@threlte/core';

	let materials: any = [
		{
			category: undefined,
			material: { coefficient_of_thermal_conductivity: 0, id: 0 },
			width: 0.1,
			isEnergyEfficient: false
		}
	];
	let city: any = undefined;
	let buildingType: any = undefined;
	let avgTempInner = 20;
	let coefficientOfThermalUniformity = 0.98;
</script>

<svelte:head>
	<title>Теплотехнический расчёт</title>
</svelte:head>

<div class="canvas"><Canvas><Scene {materials} /></Canvas></div>

<div class="container">
	<OutterParams bind:city bind:buildingType bind:avgTempInner bind:coefficientOfThermalUniformity />
	<ConstructionParams bind:materials />
	<Result {city} {buildingType} {avgTempInner} {coefficientOfThermalUniformity} {materials} />
</div>

<style>
	:global(canvas) {
		width: 100% !important;
		height: 100% !important;
	}
	.container {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: flex-start;
		height: 100%;
		padding: 64px;
		pointer-events: none;

		position: relative;
	}
	.canvas {
		background: var(--bg-1);
		top: 0;
		left: 0;
		position: absolute;
		width: 100%;
		height: 100%;
	}
</style>
