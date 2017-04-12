<template>
	<div class="feed">
		<div class="list">
			<Roast v-for="(roast,key,i) in roasts" :datum="roast" :key="roast._id" :upvoted="roast.upvoted"></Roast>
		</div>
	</div>
</template>

<script>
import Roast from '@/components/roast'

	export default{
		name: 'Feed',
		props: ['groupId'],
		components: {
			Roast
		},
		data() {
			return {
				amount: 20
			}
		},
		computed: {
			roasts() {
				return this.$store.getters.roasts
			}
		},
		created() {
			this.$socket.emit('joinFeed', this.$store.getters.room,'group',this.$store.getters.group._id)
		}

	}
</script>