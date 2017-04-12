<template>
	<h3>Profile</h3>
</template>

<script>
	export default {
		name: 'profile',
		created() {
			this.$socket.emit('joinFeed', this.$store.getters.room,'user/wall',this.$route.params.user)
		}
	}
</script>