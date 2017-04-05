<template>
	<div class="feed">
		<div class="list">
			<Roast v-for="roast in roasts" :datum="roast" :key="roast._id"></Roast>
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
			this.$socket.emit('joinGroup', this.$store.getters.group)
		}

	}
</script>