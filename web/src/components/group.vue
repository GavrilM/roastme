<template>
	<div class="group">
		<Feed :roasts="roasts"></Feed>
	</div>
</template>

<script>
import Feed from '@/components/Feed'

	export default{
		name: 'Group',
		components: {
			Feed
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

<style>
	.group{
		height: inherit;
		overflow-y: scroll;
	}
</style>