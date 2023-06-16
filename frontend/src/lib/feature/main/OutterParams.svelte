<script lang="ts">
	import Input from '$lib/shared/Input.svelte';
	import Range from '$lib/shared/Range.svelte';
	import { searchCity, searchBuildingType } from '../../../API/API';
	import Search from '../../shared/Search.svelte';

	export let city: any;
	export let buildingType: any;
	export let avgTempInner: number;
	export let coefficientOfThermalUniformity: number;
</script>

<div class="container">
	<h1>Параметры окружающей среды</h1>
	<div class="controls">
		<Search get={searchCity} bind:selectedItem={city}>Город</Search>

		<Search get={searchBuildingType} bind:selectedItem={buildingType}>Тип здания</Search>

		<Input bind:value={coefficientOfThermalUniformity} type="number"
			>Коэффициент теплотехнической однородности</Input
		>

		<Range min={0} max={50} bind:value={avgTempInner}>Средняя температура внутреннего воздуха</Range
		>
	</div>
</div>

<style lang="scss">
	.container {
		display: flex;
		flex-direction: column;
		padding: 32px 24px 24px;
		gap: 40px;
		pointer-events: all;

		width: 320px;

		background: #fdfdfd;
		border-radius: 16px;
		.controls {
			display: flex;
			flex-direction: column;
			gap: 24px;
		}
	}
	h1 {
		font-family: 'Inter';
		font-weight: 500;
		font-size: 28px;
		line-height: 34px;
		letter-spacing: -0.02em;

		color: #1d1d32;
	}
</style>
