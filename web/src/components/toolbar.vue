<template>
	<header>
		<div class="left" v-on:click="showNav">
			A Long string of text
		</div>
		<div class="right">
			<span><router-link to="search">Search</router-link></span>
			<span v-on:click="roast">Roast</span>
		</div>
	</header>
</template>

<script>
	export default {
		name: 'toolbar',
		props: ['user', 'groupId'],
		methods: {
			roast() {
				this.$swal({
					title: 'Roast',
					input: 'text',
					showCancelButton: true,
					confirmButtonText: 'Create',
					showLoaderOnConfirm: true,
					preConfirm: (text) => {
					    return new Promise((resolve,reject) => {
					    	this.$socket.emit('roast', {
								content: text,
								createdAt: new Date(),
								author: this.$store.getters.user._id,
								location: {
									where: 'group',
									id: this.$store.getters.group
								}
							}, res => {
								res ? resolve(res) : reject('Failed to post')
							})	
					    })
				  	}
				})
			},
			showNav() {
				this.$emit('showNav')
			}
		}
	}
</script>

<style lang="less" scoped>
	header {
		height: 50px;
		position: fixed;
		border: 1px solid black;
		user-select: none;
		width: 100%;
		div{
			position:absolute;
			top: 50%;
  			transform: translateY(-50%);
		}
		.left{
			border: 1px solid red;
			left: 20px;
			cursor:pointer;
		}
		.right{
			border: 1px solid blue;
			right: 20px;
			span{
				margin-left: 5px;
				cursor:pointer;
			}
		}
	}
</style>