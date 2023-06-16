<script lang="ts">
	export let value: string | number = '';
	export let isFocused = false;
	export let placeholder: string | undefined = undefined;

	export let type: string;

	function onFocus() {
		isFocused = true;
	}
	function onBlur() {
		isFocused = false;
	}
</script>

<div class="container">
	{#if $$slots}
		<p><slot /></p>
	{/if}
	{#if type === 'number'}
		<input {placeholder} bind:value on:focus={onFocus} on:blur={onBlur} type="number" />
	{:else}
		<input {placeholder} bind:value on:focus={onFocus} on:blur={onBlur} type="text" />
	{/if}
</div>

<style lang="scss">
	.container {
		width: 100%;
		p {
			display: flex;
			flex-direction: row;
			align-items: flex-start;
			padding: 0px 8px;
			margin: 4px 0px;
		}
		input {
			display: flex;

			box-sizing: border-box;
			flex-direction: row;
			justify-content: space-between;
			padding: 10px 16px 10px 16px;
			gap: 16px;

			width: 100%;
			height: 40px;

			background: #ffffff;
			border: 1px solid rgba(29, 29, 50, 0.1);
			border-radius: 8px;

			&:focus {
				outline: none;
			}

			&::placeholder {
				color: #1d1d32;
			}
		}
	}
</style>
