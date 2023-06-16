<script lang="ts">
	export let icon: string;
</script>

<button on:click>
	<slot />
	{@html icon}
</button>

<style lang="scss">
	button {
		display: flex;
		flex-direction: row;
		align-items: center;
		padding: 12px 16px 12px 22px;
		gap: 16px;
        outline: none;
        border: 1px solid rgba(29, 29, 50, 0.1);

		width: fit-content;

		background: #ffffff;
		border-radius: 8px;

		font-family: 'Inter';
		font-weight: 400;
		font-size: 16px;
		line-height: 19px;

		color: #1d1d32;

		:global(svg) {
			width: 20px;
			height: 20px;
			fill: #1d1d32;
		}
	}
</style>
