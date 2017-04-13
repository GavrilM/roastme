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