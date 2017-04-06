<template>
	<div class="roastTile">
		<div class="vote">
			<div v-on:click="upvote">up</div>
			{{datum.upvotes}}
			<div v-on:click="downvote">down</div>
		</div>
		{{datum.content}}
	</div>
</template>

<script>
	export default {
		name: 'roast',
		props: ['datum']
	}
</script>

<style scoped>
	.roastTile{
		position: relative;
		border-bottom: 1px solid black;
		min-height: 110px;
		display: flex;
		align-items: center;
	}
	.vote{
		display:flex;
		flex-direction: column;
		justify-content: space-around;
		height:100px;
		width: 50px;
		margin: 0 20px 0 5px;
	}
</style>