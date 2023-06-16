<script lang="ts">
	import { reportData } from '../../../stores/reportData';
	import { getHeatTransferResult } from '../../../API/API';
	export let materials: any[];
	export let city: any = undefined;
	export let buildingType: any;
	export let avgTempInner: number;
	export let coefficientOfThermalUniformity: any = undefined;

	$: {
		const filteredMaterials = materials.filter(
			(material) =>
				material.category !== undefined &&
				material.material !== undefined &&
				material.coefficient_of_thermal_conductivity !== '' &&
				material.width !== '' &&
				material.width !== 0
		);
		if (
			buildingType?.id !== undefined &&
			city?.id !== undefined &&
			filteredMaterials.length !== 0
		) {
			getHeatTransferResult({
				materials: filteredMaterials,
				cityId: city.id,
				buildingTypeId: buildingType.id,
				innerTemperature: avgTempInner,
				coefficientOfThermalUniformity
			}).then((value) => {
				$reportData = value;
			});
		}
	}
</script>

{#if $reportData?.heatTransferResult !== undefined}
	<div class="container">
		<div class="rescon">
			{#if $reportData?.heatTransferResult}
				<p>
					Конструкция <span class="correct">соответствует</span> требованиям теплопередачи
				</p>
			{:else}
				<p>
					Конструкция <span class="incorrect">не соответствует</span> требованиям теплопередачи
				</p>
				<p>
					Рекомендуемая толщина энергоэффективного слоя: {Math.ceil($reportData.width)}
				</p>
			{/if}
		</div>
		<a href="/report">Смотреть отчёт</a>
	</div>
{/if}

<style>
	.container {
		pointer-events: all;
		display: flex;
		flex-direction: row;
		padding: 32px;
		gap: 64px;
		align-items: center;

		justify-content: space-between;

		position: absolute;
		width: 800px;
		height: 118px;
		left: calc(50% - 800px / 2);
		bottom: 64px;

		background: #fdfdfd;
		border-radius: 16px;
	}
	.correct {
		font-family: 'Inter';
		font-style: normal;
		font-weight: 400;
		font-size: 16px;
		color: #20aa1e;
	}
	.incorrect {
		font-family: 'Inter';
		font-style: normal;
		font-weight: 400;
		font-size: 16px;
		color: #d31414;
	}
	.rescon {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		padding: 0px;
		gap: 16px;
	}

	a {
		position: right;
		align-items: center;
		padding: 12px 22px;
		gap: 16px;

		background: #0000ff;
		border-radius: 8px;
		font-family: 'Inter';

		font-style: normal;
		font-weight: 400;
		font-size: 16px;
		line-height: 19px;

		color: #ffffff;
		border-radius: 8px;
		border: 0px;
	}
</style>
