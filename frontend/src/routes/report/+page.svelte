<script lang="ts">
	import { each } from 'svelte/internal';
	import { reportData } from '../../stores/reportData';
	console.log($reportData);
</script>

<svelte:head>
	<title>Отчёт</title>
</svelte:head>

<main>
	<h1>Отчёт</h1>

	<h2>1. Введение:</h2>

	<p>Расчет произведен в соответствии с требованиями следующих нормативных документов:</p>
	<p>СП 50.13330.2012 Тепловая защита зданий.</p>
	<p>СП 131.13330.2020 Строительная климатология.</p>
	<p>СП 23-101-2004 Проектирование тепловой защиты зданий</p>
	<h2>2. Исходные данные:</h2>
	<p>Район строительства: {$reportData.cityName}</p>
	<!-- <p>Относительная влажность воздуха: φ<sub>в</sub>=55%</p> -->
	<p>Тип здания или помещения: {$reportData.buildingTypeName}</p>
	<!-- <p>
		Вид ограждающей конструкции: Перекрытия над холодными подвалами, сообщающимися с наружным
		воздухом
	</p> -->
	<p>
		Расчетная средняя температура внутреннего воздуха здания: t<sub>в</sub
		>={$reportData.innerTemperature}°C
	</p>
	<h2>3. Расчет:</h2>
	<p>
		Согласно таблицы 1 СП 50.13330.2012 при температуре внутреннего воздуха здания t<sub>int</sub
		>={$reportData.innerTemperature}°C <!-- и относительной влажности воздуха φ<sub>int</sub>=55% влажностный режим помещения
		устанавливается, как нормальный.-->
	</p>
	<p>
		Определим базовое значение требуемого сопротивления теплопередаче Ro<sup>тр</sup> исходя из нормативных
		требований к приведенному сопротивлению теплопередаче(п. 5.2) СП 50.13330.2012) согласно формуле:
	</p>
	<p class="center"><i>Ro<sup>тр</sup>=a·ГСОП+b </i></p>
	<p>
		где <i>а</i> и <i>b</i>- коэффициенты, значения которых следует приниматься по данным таблицы 3
		СП 50.13330.2012 для соответствующих групп зданий.
	</p>
	<p>
		Так для ограждающей конструкции вида- перекрытия над холодными подвалами, сообщающимися с
		наружным воздухом и типа здания - {$reportData.buildingTypeName} <i>а</i>={$reportData.a};<i
			>b</i
		>={$reportData.b}
	</p>
	<p>
		Определим градусо-сутки отопительного периода ГСОП, <sup>0</sup>С·сут по формуле (5.2) СП
		50.13330.2012
	</p>
	<p class="center">ГСОП=(t<sub>в</sub>-t<sub>от</sub>)z<sub>от</sub></p>
	<p>где t<sub>в</sub>-расчетная средняя температура внутреннего воздуха здания,°C</p>
	<p class="center">t<sub>в</sub>={$reportData.innerTemperature}°C</p>
	<p>
		t<sub>от</sub>-средняя температура наружного воздуха,°C принимаемые по таблице 1
		СП131.13330.2020 для периода со средней суточной температурой наружного воздуха не более 8 °С
		для типа здания - {$reportData.buildingTypeName}
	</p>
	<p class="center">t<sub>ов</sub>={$reportData.avgTemp} °С</p>
	<p>
		z<sub>от</sub>-продолжительность, сут, отопительного периода принимаемые по таблице 1
		СП131.13330.2020 для периода со средней суточной температурой наружного воздуха не более 8 °С
		для типа здания - {$reportData.buildingTypeName}
	</p>
	<p class="center">z<sub>от</sub>={$reportData.warmDays} сут.</p>
	<p>Тогда</p>
	<p class="center">
		ГСОП=({$reportData.innerTemperature}-({$reportData.avgTemp})){$reportData.warmDays}={$reportData.GSOP}
		°С·сут
	</p>
	<p>
		По формуле в таблице 3 СП 50.13330.2012 определяем базовое значение требуемого сопротивления
		теплопередачи Ro<sup>тр</sup> (м<sup>2</sup>·°С/Вт).
	</p>
	<p class="center">
		Ro<sup>тр</sup
		>={$reportData.a}·{$reportData.GSOP}+{$reportData.b}={$reportData.requiredResistance}м<sup
			>2</sup
		>°С/Вт
	</p>

	<!-- <p>
		Поскольку населенный пункт {$reportData.cityName} относится к зоне влажности - сухой, при этом влажностный режим
		помещения - нормальный, то в соответствии с таблицей 2 СП50.13330.2012 теплотехнические
		характеристики материалов ограждающих конструкций будут приняты, как для условий эксплуатации A.
	</p> -->
	<p>Схема конструкции ограждающей конструкции показана на рисунке:</p>

	{#each $reportData.materials as material, index}
		<p>
			{1 + index}. {material.material.name}, толщина δ<sub>{1 + index}</sub>={material.width}м,
			коэффициент теплопроводности λ<sub>А{1 + index}</sub>={material.material
				.coefficient_of_thermal_conductivity}Вт/(м°С)
		</p>
	{/each}

	<p>
		Условное сопротивление теплопередаче R<sub>0</sub><sup>усл</sup>, (м<sup>2</sup>°С/Вт) определим
		по формуле E.6 СП 50.13330.2012:
	</p>
	<p class="center">
		R<sub>0</sub><sup>усл</sup>=1/α<sub>int</sub>+δ<sub>n</sub>/λ<sub>n</sub>+1/α<sub>ext</sub>
	</p>
	<p>
		где α<sub>int</sub> - коэффициент теплоотдачи внутренней поверхности ограждающих конструкций,
		Вт/(м<sup>2</sup>°С), принимаемый по таблице 4 СП 50.13330.2012
	</p>
	<p class="center">α<sub>int</sub>={$reportData.innerHeatTransferCoef} Вт/(м<sup>2</sup>°С)</p>
	<p>
		α<sub>ext</sub> - коэффициент теплоотдачи наружной поверхности ограждающей конструкций для условий
		холодного периода, принимаемый по таблице 6 СП 50.13330.2012
	</p>
	<p class="center">
		α<sub>ext</sub>={$reportData.outerHeatTransferCoef} -согласно п.3 таблицы 6 СП 50.13330.2012 для
		перекрытий над холодными подвалами, сообщающимися с наружным воздухом.
	</p>
	<p class="center">
		R<sub>0</sub><sup>усл</sup>=1/{$reportData.innerHeatTransferCoef}

		{#each $reportData.materials as material}
			+ {material.width}/{material.material.coefficient_of_thermal_conductivity}
		{/each}

		+1/{$reportData.outerHeatTransferCoef}
	</p>
	<p class="center">
		R<sub>0</sub><sup>усл</sup>={$reportData.conditionalResistance}м<sup>2</sup>°С/Вт
	</p>
	<p>
		Приведенное сопротивление теплопередаче R<sub>0</sub><sup>пр</sup>, (м<sup>2</sup>°С/Вт)
		определим по формуле 11 СП 23-101-2004:
	</p>
	<p class="center">R<sub>0</sub><sup>пр</sup>=R<sub>0</sub><sup>усл</sup> ·<i>r</i></p>
	<p>
		<i>r</i>-коэффициент теплотехнической однородности ограждающей конструкции, учитывающий влияние
		стыков, откосов проемов, обрамляющих ребер, гибких связей и других теплопроводных включений
	</p>
	<p class="center"><i>r</i>={$reportData.coefficientOfThermalUniformity}</p>
	<p>Тогда</p>
	<p class="center">
		R<sub>0</sub><sup>пр</sup
		>={$reportData.conditionalResistance}·{$reportData.coefficientOfThermalUniformity}={$reportData.calculatedResistance}м<sup
			>2</sup
		>·°С/Вт
	</p>
	<p>
		Вывод: величина приведённого сопротивления теплопередаче R<sub>0</sub><sup>пр</sup>

		{#if $reportData.heatTransferResult}
			больше или равна
		{:else}
			меньше
		{/if}

		требуемого R<sub>0</sub><sup>норм</sup> ({$reportData.calculatedResistance}
		{#if $reportData.heatTransferResult}
			{' >= '}
		{:else}
			{' < '}
		{/if}

		{$reportData.requiredResistance}) следовательно представленная ограждающая конструкция

		{#if !$reportData.heatTransferResult}
			не
		{/if}

		соответствует требованиям по теплопередаче
	</p>
</main>

<style lang="scss">
	main {
		padding: 64px;
		margin: 0 auto;
		max-width: 920px;

		h1 {
			margin: 64px 0 32px 0;
		}
		h2 {
			margin: 32px 0 16px;
		}
		p {
			margin: 8px 0;
			&.center {
				text-align: center;
				margin: 32px 0 32px;
			}
		}
	}
</style>
