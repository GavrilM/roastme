<template>
	<div class="feed">
		<div class="list">
			<Roast v-for="roast in roasts" :datum="roast" :key="roast._id"></Roast>
		</div>
		{{avail}}
	</div>
</template>

<script>
import Vue from 'vue'
import Roast from '@/components/roast'

	export default{
		name: 'Feed',
		props: ['groupId'],
		components: {
			Roast
		},
		data() {
			return {
				roasts: [],
				amount: 20
			}
		},
		computed: {
			avail() {
				if(this.groupId == 'loading')
					return 'Loading...'
				else
					this.$socket.emit('roasts', {groupId: this.groupId},res => {
						this.roasts = res
					})
				return '...thats it'

			}
		},
		mounted() {
			
		}

	}
</script>