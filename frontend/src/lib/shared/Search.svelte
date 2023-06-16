<script lang="ts">
	import Input from './Input.svelte';
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';
	import { clickOutside } from 'svelte-use-click-outside';

	export let selectedItem: any = undefined;
	export let get: (params: any) => any;

	let data: any = [];
	let value = '';
	let active = false;
	let isFocused: boolean;
	let placeholder = 'Не выбрано';

	const chunkLength = 10;

	function clickOutsideHandler() {
		if (!isFocused) active = false;
	}

	async function addRows(value: string, clean: boolean) {
		const newRows = await get({
			search: value,
			offset: clean ? 0 : data.length,
			limit: chunkLength
		});
		if (clean) {
			data = newRows;
		} else {
			data = [...data, ...newRows];
		}
	}

	onMount(() => {
		addRows(value, true);
	});

	$: {
		if (browser) {
			addRows(value, true);
		}
	}

	$: {
		if (isFocused) active = true;
	}
</script>

<div class="container">
	<Input bind:value bind:isFocused bind:placeholder type="text">
		<slot />
	</Input>
	{#if active}
		<div
			class="dropdown"
			use:clickOutside={clickOutsideHandler}
			on:click={() => {
				active = true;
			}}
		>
			{#each data as item}
				<div
					on:click={() => {
						selectedItem = item;
						placeholder = item.name;
						value = '';
					}}
				>
					{item.name}
				</div>
			{/each}
			<div>
				<button
					on:click={() => {
						addRows(value, false);
					}}
				>
					Ещё
				</button>
			</div>
		</div>
	{/if}
</div>

<style lang="scss">
	.container {
		width: 100%;
		position: relative;

		.dropdown {
			z-index: 1;

			display: flex;
			flex-direction: column;
			padding: 10px 22px;
			gap: 16px;
			isolation: isolate;
			overflow-y: overlay;

			position: absolute;

			width: 100%;
			left: 0px;
			top: 72px;
			max-height: 256px;

			background: #ffffff;
			border: 1px solid rgba(29, 29, 50, 0.1);
			border-radius: 8px;
			button {
				display: flex;
				flex-direction: row;
				align-items: center;
				justify-content: center;
				padding: 6px 12px;
				gap: 16px;
				outline: none;
				border: 1px solid rgba(29, 29, 50, 0.1);

				width: 100%;

				background: #ffffff;
				border-radius: 8px;

				font-family: 'Inter';
				font-style: normal;
				font-weight: 400;
				font-size: 14px;
				line-height: 17px;

				color: #1d1d32;

				:global(svg) {
					width: 20px;
					height: 20px;
					fill: #1d1d32;
				}
			}
		}
	}
</style>
