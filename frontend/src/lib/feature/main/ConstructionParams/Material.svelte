<script context="module" lang="ts">
	let current: HTMLInputElement;
</script>

<script lang="ts">
	import Search from '../../../shared/Search.svelte';
	import { searchCategories, searchMaterials } from '../../../../API/API';
	import Input from '../../../shared/Input.svelte';
	import deleteIcon from '../../../../assets/icons/delete.svg?raw';
	import upIcon from '../../../../assets/icons/up.svg?raw';
	import downIcon from '../../../../assets/icons/down.svg?raw';

	export let moveUp: any;
	export let moveDown: any;
	export let material: any;
	export let remove: any;

	let checkbox: HTMLInputElement;

	function uncheckOthers() {
		if (current && current !== checkbox) {
			current.checked = false;
		}
		current = checkbox;
	}

	function inputClickHandler(e: any) {
		material.isEnergyEfficient = e.target.checked;

		if (material.isEnergyEfficient) {
			uncheckOthers();
		}
	}
</script>

<div class="container">
	<div class="inputs">
		<Search get={searchCategories} bind:selectedItem={material.category}>Категория</Search>
		{#if material.category !== undefined}
			{#key material?.category?.id}
				<Search
					bind:selectedItem={material.material}
					get={async (params) => {
						params.categoryId = material.category.id;
						return await searchMaterials(params);
					}}
				>
					Материал
				</Search>
			{/key}
		{/if}

		<Input bind:value={material.width} type="number">Толщина, м.</Input>
		<Input bind:value={material.material.coefficient_of_thermal_conductivity} type="number">
			Коэффициент теплопроводности
		</Input>
		<label>
			<p>Энергоэффективный слой</p>
			<input
				bind:this={checkbox}
				on:input={inputClickHandler}
				type="checkbox"
				class="custom-checkbox"
			/>
		</label>
	</div>
	<div class="icons">
		<div
			on:click={() => {
				moveUp(material);
			}}
		>
			{@html upIcon}
		</div>
		<div
			on:click={() => {
				remove(material);
			}}
		>
			{@html deleteIcon}
		</div>
		<div
			on:click={() => {
				moveDown(material);
			}}
		>
			{@html downIcon}
		</div>
	</div>
</div>

<style lang="scss">
	.container {
		box-sizing: border-box;

		display: flex;
		flex-direction: row;
		padding: 0px;

		background: #ffffff;
		border: 1px solid rgba(29, 29, 50, 0.1);
		border-radius: 16px;

		.inputs {
			display: flex;
			flex-direction: column;
			align-items: flex-start;
			padding: 24px;
			gap: 8px;
		}
		.icons {
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			padding: 24px 16px;
			gap: 16px;
		}
		label {
			display: flex;
			flex-direction: row;
			align-items: center;
			padding: 8px;
			gap: 8px;
		}
		// .custom-checkbox {
		// 	flex-direction: row;
		// 	padding: 4px 6px;
		// 	gap: 16px;
		// 	max-width: 40%;
		// 	background: #ffffff;
		// 	border: 1px solid rgba(29, 29, 50, 0.1);
		// 	border-radius: 8px;
		// }
	}
	:global(svg) {
		width: 24px;
		height: 24px;
		fill: #1d1d32;
	}
</style>
