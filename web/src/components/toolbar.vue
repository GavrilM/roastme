<template>
	<header>
		<div class="left">
			<img src="../assets/logo.png">
			<div class="title">{{title}}</div>
		</div>
		<div class="right">
			<span class="lnr lnr-cog" v-on:click="shift"></span>
			<router-link :to="{name: 'search'}"><span class="lnr lnr-magnifier"></span></router-link>
			<span v-on:click="roast" class="lnr lnr-pencil"></span>
		</div>
	</header>
</template>

<script>
	export default {
		name: 'toolbar',
		props: ['user', 'groupId'],
		computed: {
			title(){
				if(this.$route.path === '/')
					return 'Roast Wars'
				switch(this.$route.name){
					case 'group': return this.$store.getters.group.name || 'Roast Wars'
									break;
					case 'profile': return 'Profile'
									break;
					case 'settings': return 'Settings'
									break;
					case 'search': return 'Search'
									break;
				}
			}
		},
		methods: {
			roast() {
				let location, title
				if(this.$route.params.user){
					title = `Roast ${this.$store.getters.profile.displayName}`
					location = {
						where: 'user',
						id: this.$store.getters.profile.username 
					}
				}
				else{
					title = `Send roast to ${this.$store.getters.group.name}`
					location = {
						where: 'group',
						id: this.$store.getters.group._id
					}
				}
					
				this.$swal({
					title,
					input: 'text',
					html: '<input type="checkbox" id="anon"/><label>Anonymous?</label>',
					showCancelButton: true,
					confirmButtonText: 'Create',
					showLoaderOnConfirm: true,
					preConfirm: (text) => {
						return new Promise((resolve,reject) => {
					    	this.$socket.emit('roast',this.$store.getters.room,{
								content: text,
								createdAt: new Date(),
								anonymous: document.getElementById("anon").checked,
								author: {
									username: this.$store.getters.user.username,
									displayName: this.$store.getters.user.displayName,
								},
								location
							}, res => {
								res ? resolve(res) : reject('Failed to post')
							})	
					    })
				  	}
				})
			},
			shift() {
				this.$emit('shift')
			}
		}
	}
</script>

<style lang="less" scoped>
	header {
		height: 50px;
		position: fixed;
		border-bottom: 1px solid #d3d3d3;
		user-select: none;
		width: 100%;
		z-index: 1000;
		div{
			position:absolute;
			top: 50%;
  			transform: translateY(-50%);
		}
		.left{
			height: 100%;
			left: 20px;
			cursor:pointer;
			width: 90%;
			text-align: left;
		}
		.right{
			right: 20px;
			span{
				margin-left: 20px;
				cursor:pointer;
				font-weight: 900;
				font-size: 1.5em;
			}
			a{
				color: black;
				text-decoration: none;
			}
		}
	}
	img{
		height: 90%;
	}
	.title{
		font-size: 1.7em;
		font-weight: 700;
		font-family: 'Poppins', sans-serif;
		width: 100%;
		margin-left: 50px;
		text-align: center;
	}
</style>