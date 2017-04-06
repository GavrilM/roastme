<template>
	<nav>
		<div class="nav-item" v-on:click="makeGroup">
			Create Group
		</div>
		<div class="nav-item" v-on:click="logout">Logout</div>
		<div class="nav-list"></div>
		<div class="nav-item"></div>
		<div class="nav-list"></div>
	</nav>
	
</template>

<script>
	export default {
		name: 'navigation',
		props: [
			'open'
		],
		methods: {
			makeGroup() {
				this.$swal({
					title: 'Create a new group',
					input: 'text',
					showCancelButton: true,
					confirmButtonText: 'Create',
					showLoaderOnConfirm: true,
				  	preConfirm: (text) => {
					    return new Promise((resolve,reject) => {
					    	this.$socket.emit('createGroup', {
								name: text,
								createdAt: new Date(),
							}, res => {
								res ? resolve(res) : reject(`Failed to create ${text}`)
							})	
					    })
				  	},
				    allowOutsideClick: false
				}).then(res => {
					this.$swal({
						type: 'success',
						title: 'Ok!',
						html: 'Result: ' + res
					})
				}).catch(err => {

				})
			},
			logout() {
				this.$http.post('api/users/signout')
				.then(res => {
					this.$router.push({ name:'landing' })
				})
				.catch(err => {
					console.log(err)
				})
			}
		}
	}
</script>

<style lang="less" scoped>
	nav{
		user-select: none;
		height: 100%;
	}
	.nav-item{
		height: 40px;
		display:flex;
		align-items: center;
	}
	.visible{
		color:red
	}

</style>