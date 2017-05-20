<template>
	<nav>
		<div class="nav-item" v-on:click="makeGroup">
			<span class="lnr lnr-plus-circle"></span>Create Group
		</div>
		<ul class="nav-list">
			<li v-for="group in allGroups" :class="active(group)" class="item" v-on:click="switchGroup(group._id)">{{group.name}}</li>
		</ul>
		<div class="nav-item"></div>
		<ul class="nav-list"></ul>
		<div class="nav-item" v-on:click="logout">
			<span class="lnr lnr-exit"></span>Logout
		</div>
	</nav>
	
</template>

<script>
	export default {
		name: 'navigation',
		computed: {
			allGroups(){
				return this.$store.getters.allGroups
			}
		},
		methods: {
			switchGroup(groupId){
				this.$router.push('/')
				this.$socket.emit('joinFeed', this.$store.getters.room,'group',groupId)
				this.$emit('menu')
			},
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
								createdAt: new Date()
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
					this.$emit('menu')
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
			},
			active(group){
				return { active: group._id === this.$store.getters.group._id }
			},
			closeMenu() {
				this.$emit('menu')
			}
		}
	}
</script>

<style lang="less" scoped>
	nav{
		user-select: none;
		height: 100%;
		color:white;
		font-family: 'Poppins', sans-serif;
		background-color: #7c3635;
		border-top: 1px solid #d3d3d3;
		overflow-y: scroll;
		*{
			cursor: pointer;
		}

		.lnr{
			margin: 0 5px;
		}
	}
	.nav-item{
		height: 40px;
		display:flex;
		align-items: center;
	}
	.item {
		width: 100%;
		padding: 10px 0;
		background-color: #7c3635;
		transition: background-color 200ms;
		&:hover{
			background-color: #440B09;
		}
	}

	.active{
		background-color: #d75339 !important;
	}

</style>