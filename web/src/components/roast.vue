<template>
	<div class="roastTile">
		{{datum.content}}
	</div>
</template>

<script>
	export default {
		name: 'roast',
		props: ['datum']
	}
</script>

<style>
	.roastTile{
		border: 1px solid black;
		min-height: 70px;
		width: 90%;
		display: flex;
		align-items: center;
	}
</style>