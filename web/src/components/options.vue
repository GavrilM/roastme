<template>
	<div class="options">
		<div class="lnr lnr-cross-circle" v-on:click="removeGroup" v-show="removable"> Delete group</div>
		<router-link :to="{ name: 'profile', params: { user: this.$store.getters.user.username }}"><button>My Profile</button></router-link>
	</div>
</template>

<script>
	export default {
		name: 'options',
		computed: {
			removable() {
				return this.$route.path === '/' || this.$route.name === 'group' 
						&& this.$store.getters.user._id === this.$store.getters.group.owner
			}
		},
		methods: {
			removeGroup() {
				if(this.$store.getters.allGroups.length <= 1){
					this.$swal("Can't leave your last group", "It's like the Hotel California.", 'error')
					return
				}
				this.$swal({
					title: 'Delete Group?',
					text: "All roasts will disappear. Your group members will get kicked. Everyone will be sad.",
					type: 'warning',
					showCancelButton: true,
					confirmButtonColor: '#3085d6',
					cancelButtonColor: '#d33',
					confirmButtonText: 'Yes, delete it!',
					preConfirm: () => {
						return new Promise((resolve,reject) => {
							resolve(this.$socket.emit('removeGroup', this.$store.getters.group))
						})
					}
				})
				.then(() => {
					this.$socket.emit('joinGroup', this.$store.getters.room, this.$store.getters.allGroups[0]._id)
					this.$emit('shift')
				})
			}
		}
	}
</script>

<style>
	
</style>