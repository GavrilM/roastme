<template>
	<div class="feed">
		<div class="list">
			<Roast v-for="(roast,key,i) in roasts" :datum="roast" :key="roast._id"></Roast>
		</div>
	</div>
</template>

<script>
import Roast from '@/components/roast'

	export default{
		name: 'Feed',
		props: ['roasts'],
		components: {
			Roast
		}
	}
</script>

<style>
	.floating > .list{
		box-shadow: -10px 0 30px 5px rgba(0,0,0,.25);
		transition: box-shadow 200ms ease;
	}
</style>